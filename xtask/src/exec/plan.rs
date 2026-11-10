use std::collections::{BTreeMap, BTreeSet};
use std::fmt::Write as _;
use std::path::Path;

use spirv::{BuiltIn, Dim, ExecutionModel, ImageFormat};

use super::data::{fill_random, fill_values, Rng, Value};
use super::harness::{self, Attachment, MAX_ATTACHMENTS};
use super::reflect::{ImageType, Layout, Reflection, ResourceKind, Scalar, ScalarKind, Slot};
use super::requirements::{self, Requirement};

pub const FRAMEBUFFER: u32 = 32;
pub const VERTEX_COUNT: u32 = 12;
const MAX_BUFFER_BYTES: u32 = 1 << 22;
const DATA_DIR: &str = "{DATA}";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Stage {
    Compute,
    Fragment,
    Vertex,
}

impl Stage {
    const fn amber(self) -> &'static str {
        match self {
            Self::Compute => "compute",
            Self::Fragment => "fragment",
            Self::Vertex => "vertex",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Refusal {
    Stage(String),
    Capability(String),
    Binding(String),
}

#[derive(Debug, Clone, Default)]
pub struct Inputs {
    pub seed: String,
    pub values: BTreeMap<(u32, u32), Vec<Value>>,
    pub framebuffer: Option<u32>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Target {
    pub name: String,
    pub buffer: String,
    pub dump: String,
    pub slots: Vec<Slot>,
}

#[derive(Debug, Clone)]
pub struct Plan {
    pub stage: Stage,
    pub entry: String,
    pub features: BTreeSet<&'static str>,
    pub files: Vec<(String, Vec<u8>)>,
    pub declarations: String,
    pub bindings: String,
    pub targets: Vec<Target>,
    pub harness: Option<String>,
    pub attachments: Vec<Attachment>,
    pub framebuffer: u32,
    pub placeholder: bool,
    pub notes: Vec<String>,
}

#[derive(Debug, Clone, Copy)]
pub struct ScriptPaths<'a> {
    pub tested: &'a Path,
    pub harness: Option<&'a Path>,
    pub dump: &'a Path,
    pub data: &'a Path,
}

struct ImageFormatInfo {
    name: &'static str,
    scalar: Scalar,
    components: u32,
}

const fn scalar(kind: ScalarKind, width: u32) -> Scalar {
    Scalar { kind, width }
}

fn storage_format(format: ImageFormat) -> Option<ImageFormatInfo> {
    use ScalarKind::{Float, Sint, Uint};
    let (name, scalar, components) = match format {
        ImageFormat::Rgba32f => ("R32G32B32A32_SFLOAT", scalar(Float, 32), 4),
        ImageFormat::Rg32f => ("R32G32_SFLOAT", scalar(Float, 32), 2),
        ImageFormat::R32f => ("R32_SFLOAT", scalar(Float, 32), 1),
        ImageFormat::Rgba16f => ("R16G16B16A16_SFLOAT", scalar(Float, 16), 4),
        ImageFormat::Rg16f => ("R16G16_SFLOAT", scalar(Float, 16), 2),
        ImageFormat::R16f => ("R16_SFLOAT", scalar(Float, 16), 1),
        ImageFormat::Rgba32i => ("R32G32B32A32_SINT", scalar(Sint, 32), 4),
        ImageFormat::Rg32i => ("R32G32_SINT", scalar(Sint, 32), 2),
        ImageFormat::R32i => ("R32_SINT", scalar(Sint, 32), 1),
        ImageFormat::Rgba32ui => ("R32G32B32A32_UINT", scalar(Uint, 32), 4),
        ImageFormat::Rg32ui => ("R32G32_UINT", scalar(Uint, 32), 2),
        ImageFormat::R32ui => ("R32_UINT", scalar(Uint, 32), 1),
        ImageFormat::Rgba8 => ("R8G8B8A8_UNORM", scalar(Uint, 8), 4),
        ImageFormat::Rgba8ui => ("R8G8B8A8_UINT", scalar(Uint, 8), 4),
        ImageFormat::Rgba8i => ("R8G8B8A8_SINT", scalar(Sint, 8), 4),
        _ => return None,
    };
    Some(ImageFormatInfo {
        name,
        scalar,
        components,
    })
}

fn sampled_format(image: &ImageType) -> ImageFormatInfo {
    let (name, kind) = match image.scalar.kind {
        ScalarKind::Sint => ("R32G32B32A32_SINT", ScalarKind::Sint),
        ScalarKind::Uint | ScalarKind::Bool => ("R32G32B32A32_UINT", ScalarKind::Uint),
        ScalarKind::Float => ("R32G32B32A32_SFLOAT", ScalarKind::Float),
    };
    ImageFormatInfo {
        name,
        scalar: scalar(kind, 32),
        components: 4,
    }
}

fn image_extent(image: &ImageType) -> Result<(String, u32), Refusal> {
    if image.arrayed {
        return Err(Refusal::Binding("arrayed images".into()));
    }
    if image.multisampled {
        return Err(Refusal::Binding("multisampled images".into()));
    }
    if image.depth && image.sampled != 2 {
        return Err(Refusal::Binding("depth-comparison images".into()));
    }
    match image.dim {
        Dim::Dim1D => Ok(("DIM_1D WIDTH 8".into(), 8)),
        Dim::Dim2D => Ok(("DIM_2D WIDTH 8 HEIGHT 8".into(), 64)),
        Dim::Dim3D => Ok(("DIM_3D WIDTH 4 HEIGHT 4 DEPTH 4".into(), 64)),
        Dim::DimCube => Err(Refusal::Binding("cube images".into())),
        Dim::DimRect => Err(Refusal::Binding("rectangle images".into())),
        other => Err(Refusal::Binding(format!("{other:?} images"))),
    }
}

fn image_values(info: &ImageFormatInfo, texels: u32, rng: &mut Rng) -> String {
    let mut out = String::new();
    for texel in 0..texels {
        for _ in 0..info.components {
            let value = if info.scalar.width == 8 && info.name.ends_with("UNORM") {
                Value::Int(i64::try_from(rng.below(256)).unwrap_or(0))
            } else {
                Value::random(info.scalar, rng)
            };
            match value {
                Value::Float(v) => {
                    let _ = write!(out, "{v:?} ");
                }
                Value::Int(v) => {
                    let _ = write!(out, "{v} ");
                }
            }
        }
        if texel % 8 == 7 {
            out.push('\n');
        }
    }
    out
}

fn texel_slots(info: &ImageFormatInfo, texels: u32) -> Vec<Slot> {
    let size = info.scalar.bytes();
    let stride = size * info.components;
    let mut slots = Vec::new();
    for texel in 0..texels {
        for component in 0..info.components {
            slots.push(Slot {
                offset: texel * stride + component * size,
                scalar: info.scalar,
            });
        }
    }
    slots
}

fn round_up(value: u32, multiple: u32) -> u32 {
    value.div_ceil(multiple) * multiple
}

fn runtime_length(layout: &Layout, invocations: u32) -> u32 {
    let mut length = invocations.saturating_mul(2).max(64);
    let stride = layout.runtime_stride().max(1);
    while length > 1 && stride.saturating_mul(length) > MAX_BUFFER_BYTES {
        length /= 2;
    }
    length
}

fn buffer_bytes(
    layout: &Layout,
    length: u32,
    values: Option<&Vec<Value>>,
    rng: &mut Rng,
) -> Vec<u8> {
    let mut bytes = match values {
        Some(values) => fill_values(layout, length, values),
        None => fill_random(layout, length, rng),
    };
    let size = round_up(u32::try_from(bytes.len()).unwrap_or(0).max(16), 16);
    bytes.resize(usize::try_from(size).unwrap_or(16), 0);
    bytes
}

fn requirements(reflection: &Reflection) -> Result<BTreeSet<&'static str>, Refusal> {
    let mut features = BTreeSet::new();
    for capability in &reflection.capabilities {
        match requirements::capability(*capability) {
            Requirement::None => {}
            Requirement::Feature(feature) => {
                features.insert(feature);
            }
            Requirement::Unsupported(reason) => {
                return Err(Refusal::Capability(format!("{capability:?} ({reason})")));
            }
        }
    }
    if features
        .iter()
        .any(|f| f.starts_with("SubgroupSupportedOperations"))
    {
        if let Some(stage) = requirements::subgroup_stage(reflection.model) {
            features.insert(stage);
        }
    }
    for extension in &reflection.extensions {
        if !requirements::extension(extension) {
            return Err(Refusal::Capability(format!("extension {extension}")));
        }
    }
    Ok(features)
}

impl Plan {
    pub fn new(reflection: &Reflection, inputs: &Inputs) -> Result<Self, Refusal> {
        let stage = match reflection.model {
            ExecutionModel::GLCompute => Stage::Compute,
            ExecutionModel::Fragment => Stage::Fragment,
            ExecutionModel::Vertex => Stage::Vertex,
            other => return Err(Refusal::Stage(format!("{other:?}"))),
        };
        if let Some(problem) = reflection.problems.first() {
            return Err(Refusal::Binding(problem.clone()));
        }
        let mut features = requirements(reflection)?;
        let mut plan = Self {
            stage,
            entry: reflection.entry.clone(),
            features: BTreeSet::new(),
            files: Vec::new(),
            declarations: String::new(),
            bindings: String::new(),
            targets: Vec::new(),
            harness: None,
            attachments: Vec::new(),
            framebuffer: inputs.framebuffer.unwrap_or(FRAMEBUFFER),
            placeholder: false,
            notes: Vec::new(),
        };
        let mut rng = Rng::from_text(&inputs.seed);
        let invocations = reflection
            .local_size
            .iter()
            .fold(1u32, |acc, size| acc.saturating_mul(*size))
            .min(4096);
        let mut sampler_declared = false;
        let mut writes = false;

        for resource in &reflection.resources {
            let base = format!("r{}_{}", resource.set, resource.binding);
            let names: Vec<String> = match resource.count {
                None => vec![base],
                Some(count) => (0..count).map(|i| format!("{base}_{i}")).collect(),
            };
            let list = names.join(" ");
            let bind = if resource.count.is_some() {
                "BUFFER_ARRAY"
            } else {
                "BUFFER"
            };
            let location = format!(
                "DESCRIPTOR_SET {} BINDING {}",
                resource.set, resource.binding
            );
            let label = |kind: &str, index: usize| match resource.count {
                None => format!("{kind} set {} binding {}", resource.set, resource.binding),
                Some(_) => format!(
                    "{kind} set {} binding {} element {index}",
                    resource.set, resource.binding
                ),
            };
            let values = inputs.values.get(&(resource.set, resource.binding));
            match &resource.kind {
                ResourceKind::UniformBuffer(layout) => {
                    if layout.has_runtime_array() {
                        return Err(Refusal::Binding(
                            "uniform buffer with a runtime array".into(),
                        ));
                    }
                    for name in &names {
                        let bytes = buffer_bytes(layout, 0, values, &mut rng);
                        plan.add_buffer(name, bytes);
                    }
                    let _ = writeln!(plan.bindings, "  BIND {bind} {list} AS uniform {location}");
                }
                ResourceKind::StorageBuffer { layout, writable } => {
                    let length = runtime_length(layout, invocations);
                    for (index, name) in names.iter().enumerate() {
                        let bytes = buffer_bytes(layout, length, values, &mut rng);
                        plan.add_buffer(name, bytes);
                        if *writable {
                            writes = true;
                            let mut slots = Vec::new();
                            layout.slots(0, length, &mut slots);
                            plan.add_target(label("storage buffer", index), name, slots);
                        }
                    }
                    let _ = writeln!(plan.bindings, "  BIND {bind} {list} AS storage {location}");
                }
                ResourceKind::StorageImage(image) => {
                    let info = storage_format(image.format).ok_or_else(|| {
                        Refusal::Binding(format!("storage image format {:?}", image.format))
                    })?;
                    let (extent, texels) = image_extent(image)?;
                    for (index, name) in names.iter().enumerate() {
                        let data = image_values(&info, texels, &mut rng);
                        let _ = writeln!(
                            plan.declarations,
                            "IMAGE {name} FORMAT {} {extent} DATA\n{data}\nEND",
                            info.name
                        );
                        plan.add_target(
                            label("storage image", index),
                            name,
                            texel_slots(&info, texels),
                        );
                    }
                    writes = true;
                    let _ = writeln!(
                        plan.bindings,
                        "  BIND {bind} {list} AS storage_image {location}"
                    );
                }
                ResourceKind::SampledImage(image) | ResourceKind::CombinedImageSampler(image) => {
                    if image.scalar.width != 32 {
                        return Err(Refusal::Binding("images with non-32-bit texels".into()));
                    }
                    let info = sampled_format(image);
                    let (extent, texels) = image_extent(image)?;
                    for name in &names {
                        let data = image_values(&info, texels, &mut rng);
                        let _ = writeln!(
                            plan.declarations,
                            "IMAGE {name} FORMAT {} {extent} DATA\n{data}\nEND",
                            info.name
                        );
                    }
                    if matches!(resource.kind, ResourceKind::SampledImage(_)) {
                        let _ = writeln!(
                            plan.bindings,
                            "  BIND {bind} {list} AS sampled_image {location}"
                        );
                    } else {
                        plan.declare_sampler(&mut sampler_declared);
                        let _ = writeln!(
                            plan.bindings,
                            "  BIND {bind} {list} AS combined_image_sampler SAMPLER smp {location}"
                        );
                    }
                }
                ResourceKind::Sampler => {
                    plan.declare_sampler(&mut sampler_declared);
                    match resource.count {
                        None => {
                            let _ = writeln!(plan.bindings, "  BIND SAMPLER smp {location}");
                        }
                        Some(count) => {
                            let samplers: Vec<&str> = (0..count).map(|_| "smp").collect();
                            let _ = writeln!(
                                plan.bindings,
                                "  BIND SAMPLER_ARRAY {} {location}",
                                samplers.join(" ")
                            );
                        }
                    }
                }
                ResourceKind::UniformTexelBuffer(_) | ResourceKind::StorageTexelBuffer(_) => {
                    return Err(Refusal::Binding("texel buffers".into()));
                }
                ResourceKind::Unsupported(reason) => return Err(Refusal::Binding(reason.clone())),
            }
        }

        if let Some(layout) = &reflection.push_constants {
            let values = inputs.values.get(&(u32::MAX, 0));
            let mut bytes = match values {
                Some(values) => fill_values(layout, 0, values),
                None => fill_random(layout, 0, &mut rng),
            };
            let size = round_up(u32::try_from(bytes.len()).unwrap_or(0).max(4), 4);
            bytes.resize(usize::try_from(size).unwrap_or(4), 0);
            plan.add_buffer("push", bytes);
            plan.bindings
                .push_str("  BIND BUFFER push AS push_constant\n");
        }

        match stage {
            Stage::Compute => {}
            Stage::Fragment => {
                if writes {
                    features.insert("fragmentStoresAndAtomics");
                }
                for builtin in [BuiltIn::ClipDistance, BuiltIn::CullDistance] {
                    if reflection.input_builtins.contains(&builtin) {
                        return Err(Refusal::Binding(format!("{builtin:?} fragment input")));
                    }
                }
                plan.harness = Some(
                    harness::vertex_for_fragment(&reflection.inputs).map_err(Refusal::Binding)?,
                );
                for output in &reflection.outputs {
                    let (scalar, count) = harness::simple_32(output).map_err(Refusal::Binding)?;
                    for location in output.location..output.location + output.array.unwrap_or(1) {
                        if location >= MAX_ATTACHMENTS {
                            return Err(Refusal::Binding(format!("output location {location}")));
                        }
                        plan.attachments.push(Attachment {
                            location,
                            kind: scalar.kind,
                            components: count,
                        });
                    }
                }
                if plan.attachments.is_empty() {
                    plan.placeholder = true;
                }
            }
            Stage::Vertex => {
                if writes {
                    features.insert("vertexPipelineStoresAndAtomics");
                }
                for input in &reflection.inputs {
                    if input.array.is_some() {
                        return Err(Refusal::Binding(format!(
                            "location {}: array vertex input",
                            input.location
                        )));
                    }
                    let (scalar, count) = harness::simple_32(input).map_err(Refusal::Binding)?;
                    plan.add_vertex_input(input.location, scalar, count, &mut rng);
                }
                if reflection.inputs.is_empty() {
                    plan.add_vertex_input(0, scalar(ScalarKind::Float, 32), 4, &mut rng);
                }
                let (source, attachments, ignored) =
                    harness::fragment_for_vertex(&reflection.outputs);
                plan.harness = Some(source);
                plan.attachments = attachments;
                plan.notes.extend(ignored);
            }
        }
        plan.add_attachment_targets();
        plan.features = features;
        Ok(plan)
    }

    fn add_buffer(&mut self, name: &str, bytes: Vec<u8>) {
        let file = format!("{name}.bin");
        let _ = writeln!(
            self.declarations,
            "BUFFER {name} DATA_TYPE uint8 SIZE {} FILE BINARY {DATA_DIR}/{file}",
            bytes.len()
        );
        self.files.push((file, bytes));
    }

    fn declare_sampler(&mut self, declared: &mut bool) {
        if !*declared {
            self.declarations.push_str("SAMPLER smp\n");
            *declared = true;
        }
    }

    fn add_vertex_input(&mut self, location: u32, scalar: Scalar, count: u32, rng: &mut Rng) {
        let base = match scalar.kind {
            ScalarKind::Float => "float",
            ScalarKind::Sint => "int32",
            ScalarKind::Uint | ScalarKind::Bool => "uint32",
        };
        let ty = if count == 1 {
            base.to_string()
        } else {
            format!("vec{count}<{base}>")
        };
        let mut data = String::new();
        for _ in 0..VERTEX_COUNT * count {
            match Value::random(scalar, rng) {
                Value::Float(v) => {
                    let _ = write!(data, "{:?} ", v / 2.0);
                }
                Value::Int(v) => {
                    let _ = write!(data, "{v} ");
                }
            }
        }
        let _ = writeln!(
            self.declarations,
            "BUFFER vb{location} DATA_TYPE {ty} DATA\n{data}\nEND"
        );
        let _ = writeln!(
            self.bindings,
            "  VERTEX_DATA vb{location} LOCATION {location}"
        );
    }

    fn add_attachment_targets(&mut self) {
        let pixels = self.framebuffer * self.framebuffer;
        for attachment in self.attachments.clone() {
            let stride = attachment.texel_components() * 4;
            let scalar = Scalar {
                kind: attachment.kind,
                width: 32,
            };
            let mut slots = Vec::new();
            for pixel in 0..pixels {
                for component in 0..attachment.components.min(4) {
                    slots.push(Slot {
                        offset: pixel * stride + component * 4,
                        scalar,
                    });
                }
            }
            self.add_target(
                format!("color attachment {}", attachment.location),
                &format!("fb{}", attachment.location),
                slots,
            );
        }
    }

    fn add_target(&mut self, name: String, buffer: &str, slots: Vec<Slot>) {
        let index = self.targets.len();
        self.targets.push(Target {
            name,
            buffer: buffer.to_string(),
            dump: format!("dump:0:{index}"),
            slots,
        });
    }

    pub fn dumps(&self) -> Vec<&str> {
        self.targets.iter().map(|t| t.dump.as_str()).collect()
    }

    pub fn script(&self, paths: ScriptPaths) -> String {
        let mut out = String::from("#!amber\n");
        for feature in &self.features {
            let _ = writeln!(out, "DEVICE_FEATURE {feature}");
        }
        out.push_str("SET ENGINE_DATA fence_timeout_ms 10000\n");
        let _ = writeln!(
            out,
            "SHADER {} tested SPIRV-BIN FILE {}",
            self.stage.amber(),
            paths.tested.display()
        );
        if let (Some(harness), true) = (paths.harness, self.stage != Stage::Compute) {
            let kind = if self.stage == Stage::Fragment {
                "vertex"
            } else {
                "fragment"
            };
            let _ = writeln!(
                out,
                "SHADER {kind} harness SPIRV-BIN FILE {}",
                harness.display()
            );
        }
        if !self.targets.is_empty() {
            let _ = writeln!(
                out,
                "SHADER compute dumper SPIRV-BIN FILE {}",
                paths.dump.display()
            );
        }
        out.push_str(
            &self
                .declarations
                .replace(DATA_DIR, &paths.data.display().to_string()),
        );
        for attachment in &self.attachments {
            let _ = writeln!(
                out,
                "BUFFER fb{} FORMAT {}",
                attachment.location,
                attachment.format()
            );
        }
        if self.placeholder {
            out.push_str("BUFFER fbnone FORMAT R8G8B8A8_UNORM\n");
        }
        let entry = if self.entry == "main" {
            String::new()
        } else {
            format!(" ENTRY_POINT {}", self.entry)
        };
        let size = self.framebuffer;
        match self.stage {
            Stage::Compute => {
                let _ = writeln!(out, "PIPELINE compute main\n  ATTACH tested{entry}");
                out.push_str(&self.bindings);
                out.push_str("END\n");
            }
            Stage::Fragment | Stage::Vertex => {
                out.push_str("PIPELINE graphics main\n");
                if self.stage == Stage::Fragment {
                    let _ = writeln!(out, "  ATTACH harness\n  ATTACH tested{entry}");
                } else {
                    let _ = writeln!(out, "  ATTACH tested{entry}\n  ATTACH harness");
                }
                let _ = writeln!(out, "  FRAMEBUFFER_SIZE {size} {size}");
                for attachment in &self.attachments {
                    let _ = writeln!(
                        out,
                        "  BIND BUFFER fb{0} AS color LOCATION {0}",
                        attachment.location
                    );
                }
                if self.placeholder {
                    out.push_str("  BIND BUFFER fbnone AS color LOCATION 0\n");
                }
                out.push_str(&self.bindings);
                out.push_str("END\n");
            }
        }
        if !self.targets.is_empty() {
            out.push_str("PIPELINE compute dump\n  ATTACH dumper\n");
            for (index, target) in self.targets.iter().enumerate() {
                let _ = writeln!(
                    out,
                    "  BIND BUFFER {} AS storage DESCRIPTOR_SET 0 BINDING {index}",
                    target.buffer
                );
            }
            out.push_str("END\n");
        }
        match self.stage {
            Stage::Compute => out.push_str("RUN main 1 1 1\n"),
            Stage::Fragment => {
                let _ = writeln!(
                    out,
                    "CLEAR_COLOR main 0 0 0 0\nCLEAR main\nRUN main DRAW_RECT POS 0 0 SIZE {size} {size}"
                );
            }
            Stage::Vertex => {
                let _ = writeln!(
                    out,
                    "CLEAR_COLOR main 0 0 0 0\nCLEAR main\nRUN main DRAW_ARRAY AS TRIANGLE_LIST START_IDX 0 COUNT {VERTEX_COUNT}"
                );
            }
        }
        out
    }
}

#[cfg(test)]
mod tests {
    use std::path::PathBuf;

    use super::*;
    use crate::exec::reflect::{Interpolation, Resource, Varying, VaryingType};

    const F32: Scalar = Scalar {
        kind: ScalarKind::Float,
        width: 32,
    };
    const U32: Scalar = Scalar {
        kind: ScalarKind::Uint,
        width: 32,
    };

    fn reflection(model: ExecutionModel) -> Reflection {
        Reflection {
            model,
            entry: "main".into(),
            local_size: [4, 1, 1],
            resources: Vec::new(),
            push_constants: None,
            inputs: Vec::new(),
            outputs: Vec::new(),
            input_builtins: BTreeSet::new(),
            output_builtins: BTreeSet::new(),
            capabilities: [spirv::Capability::Shader].into_iter().collect(),
            extensions: BTreeSet::new(),
            problems: Vec::new(),
        }
    }

    fn runtime_array_buffer() -> Layout {
        Layout::Struct {
            members: vec![(
                0,
                Layout::Array {
                    element: Box::new(Layout::Scalar(U32)),
                    length: None,
                    stride: 4,
                },
            )],
        }
    }

    fn paths() -> (PathBuf, PathBuf, PathBuf) {
        (
            PathBuf::from("/w/tested.spv"),
            PathBuf::from("/w/dump.spv"),
            PathBuf::from("/w/data"),
        )
    }

    #[test]
    fn compute_script_binds_every_resource() {
        let mut module = reflection(ExecutionModel::GLCompute);
        module.resources = vec![
            Resource {
                set: 0,
                binding: 0,
                count: None,
                kind: ResourceKind::StorageBuffer {
                    layout: runtime_array_buffer(),
                    writable: true,
                },
            },
            Resource {
                set: 1,
                binding: 2,
                count: None,
                kind: ResourceKind::UniformBuffer(Layout::Struct {
                    members: vec![(
                        0,
                        Layout::Vector {
                            scalar: F32,
                            count: 4,
                        },
                    )],
                }),
            },
        ];
        module.push_constants = Some(Layout::Struct {
            members: vec![(0, Layout::Scalar(U32))],
        });
        let inputs = Inputs {
            seed: "a.comp".into(),
            ..Inputs::default()
        };
        let plan = Plan::new(&module, &inputs).unwrap();
        assert_eq!(plan.files.len(), 3);
        assert_eq!(plan.files[0].1.len(), 64 * 4);
        assert_eq!(plan.targets.len(), 1);
        assert_eq!(plan.targets[0].dump, "dump:0:0");
        assert_eq!(plan.targets[0].buffer, "r0_0");
        assert_eq!(plan.targets[0].slots.len(), 64);
        let (tested, dump, data) = paths();
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness: None,
            dump: &dump,
            data: &data,
        });
        assert!(script.contains("SHADER compute tested SPIRV-BIN FILE /w/tested.spv\n"));
        assert!(
            script.contains("BUFFER r0_0 DATA_TYPE uint8 SIZE 256 FILE BINARY /w/data/r0_0.bin\n")
        );
        assert!(script.contains("  BIND BUFFER r0_0 AS storage DESCRIPTOR_SET 0 BINDING 0\n"));
        assert!(script.contains("  BIND BUFFER r1_2 AS uniform DESCRIPTOR_SET 1 BINDING 2\n"));
        assert!(script.contains("  BIND BUFFER push AS push_constant\n"));
        assert!(script.contains("PIPELINE compute dump\n  ATTACH dumper\n  BIND BUFFER r0_0 AS storage DESCRIPTOR_SET 0 BINDING 0\nEND\n"));
        assert!(script.ends_with("END\nRUN main 1 1 1\n"));

        let again = Plan::new(&module, &inputs).unwrap();
        assert_eq!(again.files, plan.files);
    }

    #[test]
    fn fragment_script_renders_and_dumps_attachments() {
        let mut module = reflection(ExecutionModel::Fragment);
        module.inputs = vec![Varying {
            location: 1,
            component: 0,
            ty: VaryingType::Simple {
                scalar: F32,
                count: 2,
            },
            array: None,
            interpolation: Interpolation::Smooth,
            centroid: false,
            sample: false,
        }];
        module.outputs = vec![Varying {
            location: 0,
            component: 0,
            ty: VaryingType::Simple {
                scalar: F32,
                count: 3,
            },
            array: None,
            interpolation: Interpolation::Smooth,
            centroid: false,
            sample: false,
        }];
        let plan = Plan::new(&module, &Inputs::default()).unwrap();
        assert!(plan
            .harness
            .as_deref()
            .unwrap()
            .contains("layout(location = 1) out vec2 v1;"));
        assert_eq!(plan.targets.len(), 1);
        assert_eq!(
            plan.targets[0].slots.len(),
            (FRAMEBUFFER * FRAMEBUFFER * 3) as usize
        );
        assert_eq!(plan.targets[0].slots[3].offset, 16);
        let (tested, dump, data) = paths();
        let harness = PathBuf::from("/w/harness.spv");
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness: Some(&harness),
            dump: &dump,
            data: &data,
        });
        assert!(script.contains("SHADER vertex harness SPIRV-BIN FILE /w/harness.spv\n"));
        assert!(script.contains("BUFFER fb0 FORMAT R32G32B32A32_SFLOAT\n"));
        assert!(script.contains("  BIND BUFFER fb0 AS color LOCATION 0\n"));
        assert!(script.contains("  BIND BUFFER fb0 AS storage DESCRIPTOR_SET 0 BINDING 0\n"));
        assert!(script.ends_with("RUN main DRAW_RECT POS 0 0 SIZE 32 32\n"));
    }

    #[test]
    fn refuses_what_it_cannot_bind() {
        let mut module = reflection(ExecutionModel::GLCompute);
        module.capabilities.insert(spirv::Capability::RayQueryKHR);
        assert!(matches!(
            Plan::new(&module, &Inputs::default()),
            Err(Refusal::Capability(_))
        ));
        let mut module = reflection(ExecutionModel::GLCompute);
        module.resources.push(Resource {
            set: 0,
            binding: 0,
            count: None,
            kind: ResourceKind::Unsupported("arrays of descriptors".into()),
        });
        assert_eq!(
            Plan::new(&module, &Inputs::default()).unwrap_err(),
            Refusal::Binding("arrays of descriptors".into())
        );
        assert!(matches!(
            Plan::new(&reflection(ExecutionModel::Geometry), &Inputs::default()),
            Err(Refusal::Stage(_))
        ));
        let mut module = reflection(ExecutionModel::GLCompute);
        module.capabilities.insert(spirv::Capability::Float64);
        assert!(Plan::new(&module, &Inputs::default())
            .unwrap()
            .features
            .contains("shaderFloat64"));
    }

    #[test]
    fn descriptor_arrays_bind_one_buffer_per_element() {
        let mut module = reflection(ExecutionModel::GLCompute);
        module.resources.push(Resource {
            set: 0,
            binding: 3,
            count: Some(2),
            kind: ResourceKind::StorageBuffer {
                layout: runtime_array_buffer(),
                writable: true,
            },
        });
        let plan = Plan::new(&module, &Inputs::default()).unwrap();
        assert_eq!(plan.files.len(), 2);
        assert_eq!(plan.targets.len(), 2);
        assert_eq!(plan.targets[1].buffer, "r0_3_1");
        assert_eq!(plan.targets[1].dump, "dump:0:1");
        assert_eq!(
            plan.targets[1].name,
            "storage buffer set 0 binding 3 element 1"
        );
        assert!(plan
            .bindings
            .contains("  BIND BUFFER_ARRAY r0_3_0 r0_3_1 AS storage DESCRIPTOR_SET 0 BINDING 3\n"));
        assert_ne!(plan.files[0].1, plan.files[1].1);
    }

    #[test]
    fn given_values_override_random_data() {
        let mut module = reflection(ExecutionModel::Fragment);
        module.resources.push(Resource {
            set: 0,
            binding: 0,
            count: None,
            kind: ResourceKind::UniformBuffer(Layout::Struct {
                members: vec![(
                    0,
                    Layout::Vector {
                        scalar: F32,
                        count: 2,
                    },
                )],
            }),
        });
        let mut inputs = Inputs::default();
        inputs
            .values
            .insert((0, 0), vec![Value::Float(0.0), Value::Float(1.0)]);
        let plan = Plan::new(&module, &inputs).unwrap();
        let bytes = &plan.files[0].1;
        assert_eq!(&bytes[0..4], &0f32.to_le_bytes());
        assert_eq!(&bytes[4..8], &1f32.to_le_bytes());
    }
}
