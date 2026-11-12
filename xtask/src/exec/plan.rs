use std::collections::{BTreeMap, BTreeSet};
use std::fmt::Write as _;
use std::path::{Path, PathBuf};

use spirv::{BuiltIn, Capability, Dim, ExecutionMode, ExecutionModel, ImageFormat};

use super::data::{fill_random, fill_values, Rng, Value};
use super::glsl;
use super::harness::{self, Attachment, ShaderKind, MAX_ATTACHMENTS, PATCH_VERTICES};
use super::mesh;
use super::rays::{self, Geometry, RayPipeline, ShaderRef};
use super::reflect::{
    AddressBuffer, ImageType, Layout, Reflection, ResourceKind, Scalar, ScalarKind, Slot, Varying,
};
use super::requirements::{self, Need, Requirement};

pub const FRAMEBUFFER: u32 = 32;
pub const VERTEX_COUNT: u32 = 12;
const TEXEL_BUFFER_TEXELS: u32 = 64;
const RAY_COUNT: u32 = rays::LAUNCH_SIZE * rays::LAUNCH_SIZE;
const MAX_BUFFER_BYTES: u32 = 1 << 22;
const DATA_DIR: &str = "{DATA}";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Draw {
    Dispatch,
    Rect,
    Array {
        topology: &'static str,
        patch_vertices: Option<u32>,
    },
    Rays,
    Mesh,
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
    pub stage: ShaderKind,
    pub entry: String,
    pub needs: BTreeSet<Need>,
    pub files: Vec<(String, Vec<u8>)>,
    pub declarations: String,
    pub bindings: String,
    pub targets: Vec<Target>,
    pub harness: Vec<(ShaderKind, String)>,
    pub attachments: Vec<Attachment>,
    pub framebuffer: u32,
    pub placeholder: bool,
    pub draw: Draw,
    pub rays: Option<RayPipeline>,
    pub harness_env: Option<&'static str>,
    pub mesh_nv: bool,
    pub notes: Vec<String>,
    pub addresses: Vec<(String, u32)>,
}

#[derive(Debug, Clone, Copy)]
pub struct ScriptPaths<'a> {
    pub tested: &'a Path,
    pub harness: &'a [(ShaderKind, PathBuf)],
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
        return Err(Refusal::Binding(
            "arrayed images (Amber images have a single layer)".into(),
        ));
    }
    if image.multisampled {
        return Err(Refusal::Binding(
            "multisampled images (Amber cannot fill them with data)".into(),
        ));
    }
    if image.depth && image.sampled != 2 {
        return Err(Refusal::Binding(
            "depth-comparison images (Amber has no comparison samplers for them)".into(),
        ));
    }
    match image.dim {
        Dim::Dim1D => Ok(("DIM_1D WIDTH 8".into(), 8)),
        Dim::Dim2D => Ok(("DIM_2D WIDTH 8 HEIGHT 8".into(), 64)),
        Dim::Dim3D => Ok(("DIM_3D WIDTH 4 HEIGHT 4 DEPTH 4".into(), 64)),
        Dim::DimCube => Err(Refusal::Binding(
            "cube images (Amber has no cube image views)".into(),
        )),
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

fn address_offsets(reflection: &Reflection, buffer: AddressBuffer) -> Vec<u32> {
    reflection
        .addresses
        .iter()
        .filter(|field| field.buffer == buffer)
        .map(|field| field.offset)
        .collect()
}

fn outside_addresses(slot: &Slot, offsets: &[u32]) -> bool {
    let end = slot.offset.saturating_add(slot.scalar.bytes());
    offsets
        .iter()
        .all(|offset| end <= *offset || slot.offset >= offset.saturating_add(8))
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

pub fn requirements(reflection: &Reflection) -> Result<BTreeSet<Need>, Refusal> {
    if let Some(unknown) = reflection.unknown_capabilities.first() {
        let name = match unknown {
            5120 => "AbortKHR".to_string(),
            5447 => "CooperativeMatrixDecodeVectorNV".to_string(),
            6032 => "RayTracingOpacityMicromapExecutionModeKHR".to_string(),
            other => format!("capability {other}"),
        };
        return Err(Refusal::Capability(format!(
            "{name} (newer than the harness's SPIR-V tables; Amber cannot enable it)"
        )));
    }
    let mut needs = BTreeSet::new();
    for capability in &reflection.capabilities {
        match requirements::capability(*capability) {
            Requirement::Needs(list) => needs.extend(list.iter().copied()),
            Requirement::Unsupported(reason) => {
                return Err(Refusal::Capability(format!("{capability:?} ({reason})")));
            }
        }
    }
    if needs.iter().any(|need| {
        matches!(need, Need::Feature(name) if name.starts_with("SubgroupSupportedOperations"))
    }) {
        if let Some(stage) = requirements::subgroup_stage(reflection.model) {
            needs.insert(Need::Feature(stage));
        }
    }
    for extension in &reflection.extensions {
        if !requirements::extension(extension) {
            return Err(Refusal::Capability(format!("extension {extension}")));
        }
    }
    Ok(needs)
}

fn stage_of(model: ExecutionModel) -> Result<ShaderKind, Refusal> {
    Ok(match model {
        ExecutionModel::GLCompute => ShaderKind::Compute,
        ExecutionModel::Fragment => ShaderKind::Fragment,
        ExecutionModel::Vertex => ShaderKind::Vertex,
        ExecutionModel::Geometry => ShaderKind::Geometry,
        ExecutionModel::TessellationControl => ShaderKind::TessControl,
        ExecutionModel::TessellationEvaluation => ShaderKind::TessEval,
        ExecutionModel::RayGenerationKHR => ShaderKind::RayGeneration,
        ExecutionModel::MissKHR => ShaderKind::Miss,
        ExecutionModel::ClosestHitKHR => ShaderKind::ClosestHit,
        ExecutionModel::AnyHitKHR => ShaderKind::AnyHit,
        ExecutionModel::IntersectionKHR => ShaderKind::Intersection,
        ExecutionModel::CallableKHR => ShaderKind::Callable,
        ExecutionModel::MeshEXT | ExecutionModel::MeshNV => ShaderKind::Mesh,
        ExecutionModel::TaskEXT | ExecutionModel::TaskNV => ShaderKind::Task,
        other => return Err(Refusal::Stage(format!("{other:?}"))),
    })
}

fn geometry_topology(reflection: &Reflection) -> Result<&'static str, Refusal> {
    let topologies = [
        (ExecutionMode::InputPoints, "POINT_LIST"),
        (ExecutionMode::InputLines, "LINE_LIST"),
        (
            ExecutionMode::InputLinesAdjacency,
            "LINE_LIST_WITH_ADJACENCY",
        ),
        (ExecutionMode::Triangles, "TRIANGLE_LIST"),
        (
            ExecutionMode::InputTrianglesAdjacency,
            "TRIANGLE_LIST_WITH_ADJACENCY",
        ),
    ];
    topologies
        .iter()
        .find(|(mode, _)| reflection.has_mode(*mode))
        .map(|(_, topology)| *topology)
        .ok_or_else(|| Refusal::Binding("geometry shader without an input primitive".into()))
}

fn position_values(rng: &mut Rng) -> String {
    let mut data = String::new();
    for _ in 0..VERTEX_COUNT {
        let x = Value::random(scalar(ScalarKind::Float, 32), rng).as_f64() / 2.0;
        let y = Value::random(scalar(ScalarKind::Float, 32), rng).as_f64() / 2.0;
        let z = 0.5 + Value::random(scalar(ScalarKind::Float, 32), rng).as_f64() / 8.0;
        let _ = write!(data, "{x:?} {y:?} {z:?} 1.0 ");
    }
    data
}

impl Plan {
    pub fn new(reflection: &Reflection, inputs: &Inputs) -> Result<Self, Refusal> {
        let stage = stage_of(reflection.model)?;
        let mut needs = requirements(reflection)?;
        if let Some(problem) = reflection.problems.first() {
            return Err(Refusal::Binding(problem.clone()));
        }
        if stage.is_ray_tracing()
            && !reflection.capabilities.contains(&Capability::RayTracingKHR)
            && !reflection.capabilities.contains(&Capability::RayTracingNV)
        {
            return Err(Refusal::Capability(format!(
                "{stage:?} without a ray tracing capability"
            )));
        }
        let mut plan = Self {
            stage,
            entry: reflection.entry.clone(),
            needs: BTreeSet::new(),
            files: Vec::new(),
            declarations: String::new(),
            bindings: String::new(),
            targets: Vec::new(),
            harness: Vec::new(),
            attachments: Vec::new(),
            framebuffer: inputs.framebuffer.unwrap_or(FRAMEBUFFER),
            placeholder: false,
            draw: Draw::Dispatch,
            rays: None,
            harness_env: None,
            mesh_nv: false,
            notes: Vec::new(),
            addresses: Vec::new(),
        };
        let mut rng = Rng::from_text(&inputs.seed);
        let invocations = reflection
            .local_size
            .iter()
            .fold(1u32, |acc, size| acc.saturating_mul(*size))
            .min(4096);
        let mut sampler_declared = false;
        let mut writes = false;
        let mut scene: Option<Geometry> = None;

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
            let addresses = |index: usize| {
                address_offsets(
                    reflection,
                    AddressBuffer::Resource {
                        set: resource.set,
                        binding: resource.binding,
                        element: resource
                            .count
                            .map(|_| u32::try_from(index).unwrap_or(u32::MAX)),
                    },
                )
            };
            match &resource.kind {
                ResourceKind::UniformBuffer(layout) => {
                    if layout.has_runtime_array() {
                        return Err(Refusal::Binding(
                            "uniform buffer with a runtime array".into(),
                        ));
                    }
                    for (index, name) in names.iter().enumerate() {
                        let mut bytes = buffer_bytes(layout, 0, values, &mut rng);
                        plan.clear_addresses(name, &mut bytes, &addresses(index))?;
                        plan.add_buffer(name, bytes);
                    }
                    let _ = writeln!(plan.bindings, "  BIND {bind} {list} AS uniform {location}");
                }
                ResourceKind::StorageBuffer { layout, writable } => {
                    let length = runtime_length(layout, invocations);
                    for (index, name) in names.iter().enumerate() {
                        let mut bytes = buffer_bytes(layout, length, values, &mut rng);
                        let offsets = addresses(index);
                        plan.clear_addresses(name, &mut bytes, &offsets)?;
                        plan.add_buffer(name, bytes);
                        if *writable {
                            writes = true;
                            let mut slots = Vec::new();
                            layout.slots(0, length, &mut slots);
                            slots.retain(|slot| outside_addresses(slot, &offsets));
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
                ResourceKind::UniformTexelBuffer(image) => {
                    if image.scalar.width != 32 {
                        return Err(Refusal::Binding(
                            "texel buffers with non-32-bit texels".into(),
                        ));
                    }
                    let info = sampled_format(image);
                    for name in &names {
                        let data = image_values(&info, TEXEL_BUFFER_TEXELS, &mut rng);
                        let _ = writeln!(
                            plan.declarations,
                            "BUFFER {name} DATA_TYPE {} DATA\n{data}\nEND",
                            info.name
                        );
                    }
                    let _ = writeln!(
                        plan.bindings,
                        "  BIND {bind} {list} AS uniform_texel_buffer {location}"
                    );
                }
                ResourceKind::StorageTexelBuffer(image) => {
                    let info = storage_format(image.format).ok_or_else(|| {
                        Refusal::Binding(format!("storage texel buffer format {:?}", image.format))
                    })?;
                    for (index, name) in names.iter().enumerate() {
                        let data = image_values(&info, TEXEL_BUFFER_TEXELS, &mut rng);
                        let _ = writeln!(
                            plan.declarations,
                            "BUFFER {name} DATA_TYPE {} DATA\n{data}\nEND",
                            info.name
                        );
                        plan.add_target(
                            label("storage texel buffer", index),
                            name,
                            texel_slots(&info, TEXEL_BUFFER_TEXELS),
                        );
                    }
                    writes = true;
                    let _ = writeln!(
                        plan.bindings,
                        "  BIND {bind} {list} AS storage_texel_buffer {location}"
                    );
                }
                ResourceKind::AccelerationStructure => {
                    if resource.count.is_some() {
                        return Err(Refusal::Binding("arrays of acceleration structures".into()));
                    }
                    scene = Some(Geometry::Triangles);
                    let _ = writeln!(
                        plan.bindings,
                        "  BIND ACCELERATION_STRUCTURE {} {location}",
                        rays::SCENE_TLAS
                    );
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
            plan.clear_addresses(
                "push",
                &mut bytes,
                &address_offsets(reflection, AddressBuffer::PushConstants),
            )?;
            plan.add_buffer("push", bytes);
            plan.bindings
                .push_str("  BIND BUFFER push AS push_constant\n");
        }

        match stage {
            ShaderKind::Compute => {}
            ShaderKind::RayGeneration
            | ShaderKind::Miss
            | ShaderKind::ClosestHit
            | ShaderKind::AnyHit
            | ShaderKind::Intersection
            | ShaderKind::Callable => {
                let set = reflection
                    .resources
                    .iter()
                    .map(|r| r.set + 1)
                    .max()
                    .unwrap_or(0);
                let record = plan.add_shader_record(reflection, &mut rng)?;
                let generated = rays::harness(stage, reflection, set, record, &mut rng)
                    .map_err(Refusal::Binding)?;
                plan.draw = Draw::Rays;
                plan.harness = generated.shaders;
                plan.rays = Some(generated.pipeline);
                plan.harness_env = Some(ShaderKind::RayGeneration.target_env());
                scene = Some(generated.geometry);
                if let Some(output) = generated.output {
                    let layout = glsl::array_of(&output, RAY_COUNT);
                    let size = round_up(layout.size(0).max(4), 4);
                    plan.add_buffer("rglsl_out", vec![0; usize::try_from(size).unwrap_or(4)]);
                    let _ = writeln!(
                        plan.bindings,
                        "  BIND ACCELERATION_STRUCTURE {} DESCRIPTOR_SET {set} BINDING 0\n  BIND BUFFER rglsl_out AS storage DESCRIPTOR_SET {set} BINDING 1",
                        rays::SCENE_TLAS
                    );
                    let mut slots = Vec::new();
                    layout.slots(0, 0, &mut slots);
                    plan.add_target("ray payloads".into(), "rglsl_out", slots);
                }
            }
            ShaderKind::Mesh if reflection.model == ExecutionModel::MeshNV => {
                plan.draw = Draw::Mesh;
                plan.harness_env = Some(ShaderKind::Mesh.target_env());
                plan.mesh_nv = true;
                plan.finish_with_fragment(&reflection.outputs);
            }
            ShaderKind::Task if reflection.model == ExecutionModel::TaskNV => {
                plan.draw = Draw::Mesh;
                plan.harness_env = Some(ShaderKind::Task.target_env());
                plan.mesh_nv = true;
                plan.harness
                    .push((ShaderKind::Mesh, mesh::MESH_FOR_TASK_NV.to_string()));
                plan.finish_with_fragment(&mesh::mesh_for_task_outputs());
            }
            ShaderKind::Mesh => {
                plan.draw = Draw::Mesh;
                plan.harness_env = Some(ShaderKind::Mesh.target_env());
                if reflection
                    .output_builtins
                    .contains(&BuiltIn::PrimitiveShadingRateKHR)
                {
                    needs.insert(requirements::PRIMITIVE_SHADING_RATE);
                    needs.insert(requirements::PRIMITIVE_SHADING_RATE_MESH);
                }
                if let Some(payload) = &reflection.task_payload {
                    let payload = payload
                        .as_ref()
                        .map_err(|e| Refusal::Binding(format!("task payload: {e}")))?;
                    plan.harness.push((
                        ShaderKind::Task,
                        mesh::task_for_mesh(Some(payload), &mut rng).map_err(Refusal::Binding)?,
                    ));
                    needs.insert(requirements::TASK_SHADER);
                }
                plan.finish_with_fragment(&reflection.outputs);
            }
            ShaderKind::Task => {
                plan.draw = Draw::Mesh;
                plan.harness_env = Some(ShaderKind::Task.target_env());
                needs.insert(requirements::TASK_SHADER);
                plan.harness
                    .push((ShaderKind::Mesh, mesh::MESH_FOR_TASK.to_string()));
                plan.finish_with_fragment(&mesh::mesh_for_task_outputs());
            }
            ShaderKind::Fragment => {
                if writes {
                    needs.insert(Need::Feature("fragmentStoresAndAtomics"));
                }
                for builtin in [BuiltIn::ClipDistance, BuiltIn::CullDistance] {
                    if reflection.input_builtins.contains(&builtin) {
                        return Err(Refusal::Binding(format!("{builtin:?} fragment input")));
                    }
                }
                plan.draw = Draw::Rect;
                plan.harness = vec![(
                    ShaderKind::Vertex,
                    harness::vertex_for_fragment(&reflection.inputs).map_err(Refusal::Binding)?,
                )];
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
            ShaderKind::Vertex => {
                if writes {
                    needs.insert(Need::Feature("vertexPipelineStoresAndAtomics"));
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
                plan.draw = Draw::Array {
                    topology: "TRIANGLE_LIST",
                    patch_vertices: None,
                };
                plan.finish_with_fragment(&reflection.outputs);
            }
            ShaderKind::Geometry => {
                if writes {
                    needs.insert(Need::Feature("vertexPipelineStoresAndAtomics"));
                }
                plan.draw = Draw::Array {
                    topology: geometry_topology(reflection)?,
                    patch_vertices: None,
                };
                plan.start_with_vertex(&reflection.inputs, &mut rng)?;
                plan.finish_with_fragment(&reflection.outputs);
            }
            ShaderKind::TessControl => {
                if writes {
                    needs.insert(Need::Feature("vertexPipelineStoresAndAtomics"));
                }
                plan.draw = Draw::Array {
                    topology: "PATCH_LIST",
                    patch_vertices: Some(PATCH_VERTICES),
                };
                plan.start_with_vertex(&reflection.inputs, &mut rng)?;
                let vertices = reflection
                    .mode(ExecutionMode::OutputVertices)
                    .and_then(|v| v.first().copied())
                    .unwrap_or(PATCH_VERTICES);
                let (source, forwarded) =
                    harness::evaluation_for_control(&reflection.outputs, vertices)
                        .map_err(Refusal::Binding)?;
                plan.harness.push((ShaderKind::TessEval, source));
                plan.finish_with_fragment(&forwarded);
            }
            ShaderKind::TessEval => {
                if writes {
                    needs.insert(Need::Feature("vertexPipelineStoresAndAtomics"));
                }
                plan.draw = Draw::Array {
                    topology: "PATCH_LIST",
                    patch_vertices: Some(PATCH_VERTICES),
                };
                plan.start_with_vertex(&[], &mut rng)?;
                plan.harness.push((
                    ShaderKind::TessControl,
                    harness::control_for_evaluation(&reflection.inputs)
                        .map_err(Refusal::Binding)?,
                ));
                plan.finish_with_fragment(&reflection.outputs);
            }
        }
        if !plan.addresses.is_empty() && scene.is_none() {
            scene = Some(Geometry::Triangles);
        }
        if let Some(geometry) = scene {
            plan.declarations.push_str(
                &geometry.declarations(rays::Api::of(reflection), rays::motion(reflection)),
            );
        }
        for (name, offset) in &plan.addresses {
            let _ = writeln!(
                plan.declarations,
                "ACCELERATION_STRUCTURE ADDRESS {} BUFFER {name} OFFSET {offset}",
                rays::SCENE_TLAS
            );
        }
        plan.add_attachment_targets();
        plan.needs = needs;
        Ok(plan)
    }

    fn add_shader_record(
        &mut self,
        reflection: &Reflection,
        rng: &mut Rng,
    ) -> Result<Option<String>, Refusal> {
        let Some(record) = &reflection.shader_record else {
            return Ok(None);
        };
        let layout = record
            .as_ref()
            .map_err(|e| Refusal::Binding(format!("shader record buffer: {e}")))?;
        if layout.has_runtime_array() {
            return Err(Refusal::Binding(
                "shader record buffer with a runtime array".into(),
            ));
        }
        let mut bytes = fill_random(layout, 0, rng);
        let size = round_up(u32::try_from(bytes.len()).unwrap_or(0).max(4), 4);
        bytes.resize(usize::try_from(size).unwrap_or(4), 0);
        self.clear_addresses(
            "rglsl_record",
            &mut bytes,
            &address_offsets(reflection, AddressBuffer::ShaderRecord),
        )?;
        self.add_buffer("rglsl_record", bytes);
        Ok(Some("rglsl_record".into()))
    }

    fn clear_addresses(
        &mut self,
        name: &str,
        bytes: &mut [u8],
        offsets: &[u32],
    ) -> Result<(), Refusal> {
        for offset in offsets {
            let field = usize::try_from(*offset)
                .ok()
                .and_then(|start| Some(start..start.checked_add(8)?))
                .and_then(|range| bytes.get_mut(range))
                .ok_or_else(|| {
                    Refusal::Binding(format!(
                        "acceleration structure address at offset {offset} outside buffer {name}"
                    ))
                })?;
            field.fill(0);
            self.addresses.push((name.to_string(), *offset));
        }
        Ok(())
    }

    fn start_with_vertex(&mut self, inputs: &[Varying], rng: &mut Rng) -> Result<(), Refusal> {
        let data = position_values(rng);
        let _ = writeln!(
            self.declarations,
            "BUFFER vb0 DATA_TYPE vec4<float> DATA\n{data}\nEND"
        );
        self.bindings.push_str("  VERTEX_DATA vb0 LOCATION 0\n");
        self.harness.push((
            ShaderKind::Vertex,
            harness::vertex_for_fragment(inputs).map_err(Refusal::Binding)?,
        ));
        Ok(())
    }

    fn finish_with_fragment(&mut self, outputs: &[Varying]) {
        let (source, attachments, ignored) = harness::fragment_for(outputs, self.mesh_nv);
        self.harness.push((ShaderKind::Fragment, source));
        self.attachments = attachments;
        self.notes.extend(ignored);
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
        for need in &self.needs {
            let _ = writeln!(out, "{}", need.line());
        }
        out.push_str("SET ENGINE_DATA fence_timeout_ms 10000\n");
        let _ = writeln!(
            out,
            "SHADER {} tested SPIRV-BIN FILE {}",
            self.stage.amber(),
            paths.tested.display()
        );
        let mut graphics = vec![(self.stage, "tested".to_string())];
        for (index, (kind, path)) in paths.harness.iter().enumerate() {
            let name = format!("harness{index}");
            let _ = writeln!(
                out,
                "SHADER {} {name} SPIRV-BIN FILE {}",
                kind.amber(),
                path.display()
            );
            graphics.push((*kind, name));
        }
        graphics.sort();
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
        let attach = |name: &str| {
            if name == "tested" {
                format!("  ATTACH tested{entry}\n")
            } else {
                format!("  ATTACH {name}\n")
            }
        };
        let size = self.framebuffer;
        match self.draw {
            Draw::Dispatch => {
                let _ = writeln!(out, "PIPELINE compute main\n  ATTACH tested{entry}");
                out.push_str(&self.bindings);
                out.push_str("END\n");
            }
            Draw::Rays => {
                out.push_str("PIPELINE raytracing main\n");
                if let Some(rays) = &self.rays {
                    out.push_str(&rays.script(&|shader| match shader {
                        ShaderRef::Tested => "tested".to_string(),
                        ShaderRef::Harness(index) => format!("harness{index}"),
                    }));
                }
                out.push_str(&self.bindings);
                out.push_str("END\n");
            }
            Draw::Rect | Draw::Array { .. } | Draw::Mesh => {
                out.push_str("PIPELINE graphics main\n");
                for (_, name) in &graphics {
                    out.push_str(&attach(name));
                }
                if let Draw::Array {
                    patch_vertices: Some(count),
                    ..
                } = self.draw
                {
                    let _ = writeln!(out, "  PATCH_CONTROL_POINTS {count}");
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
        match self.draw {
            Draw::Dispatch => out.push_str("RUN main 1 1 1\n"),
            Draw::Rect => {
                let _ = writeln!(
                    out,
                    "CLEAR_COLOR main 0 0 0 0\nCLEAR main\nRUN main DRAW_RECT POS 0 0 SIZE {size} {size}"
                );
            }
            Draw::Array { topology, .. } => {
                let _ = writeln!(
                    out,
                    "CLEAR_COLOR main 0 0 0 0\nCLEAR main\nRUN main DRAW_ARRAY AS {topology} START_IDX 0 COUNT {VERTEX_COUNT}"
                );
            }
            Draw::Rays => {
                if let Some(rays) = &self.rays {
                    out.push_str(&rays.run());
                }
            }
            Draw::Mesh => {
                out.push_str(
                    "CLEAR_COLOR main 0 0 0 0\nCLEAR main\nRUN main DRAW_MESH_TASKS 1 1 1\n",
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
    use crate::exec::reflect::{
        AddressField, DataType, Interpolation, RayVariable, Resource, Varying, VaryingType,
    };
    use anyhow::Context;

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
            local_size: [4, 1, 1],
            capabilities: [spirv::Capability::Shader].into_iter().collect(),
            ..Reflection::new(model)
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

    fn planned(module: &Reflection, inputs: &Inputs) -> anyhow::Result<Plan> {
        Plan::new(module, inputs).map_err(|refusal| anyhow::anyhow!("{refusal:?}"))
    }

    fn paths() -> (PathBuf, PathBuf, PathBuf) {
        (
            PathBuf::from("/w/tested.spv"),
            PathBuf::from("/w/dump.spv"),
            PathBuf::from("/w/data"),
        )
    }

    #[test]
    fn compute_script_binds_every_resource() -> anyhow::Result<()> {
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
        let plan = planned(&module, &inputs)?;
        assert_eq!(plan.files.len(), 3);
        assert_eq!(plan.files[0].1.len(), 64 * 4);
        assert_eq!(plan.targets.len(), 1);
        assert_eq!(plan.targets[0].dump, "dump:0:0");
        assert_eq!(plan.targets[0].buffer, "r0_0");
        assert_eq!(plan.targets[0].slots.len(), 64);
        let (tested, dump, data) = paths();
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness: &[],
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

        let again = planned(&module, &inputs)?;
        assert_eq!(again.files, plan.files);
        Ok(())
    }

    #[test]
    fn fragment_script_renders_and_dumps_attachments() -> anyhow::Result<()> {
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
            patch: false,
            per_primitive: false,
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
            patch: false,
            per_primitive: false,
        }];
        let plan = planned(&module, &Inputs::default())?;
        assert_eq!(plan.harness.len(), 1);
        assert!(plan.harness[0]
            .1
            .contains("layout(location = 1) out vec2 v1;"));
        assert_eq!(plan.targets.len(), 1);
        assert_eq!(
            plan.targets[0].slots.len(),
            (FRAMEBUFFER * FRAMEBUFFER * 3) as usize
        );
        assert_eq!(plan.targets[0].slots[3].offset, 16);
        let (tested, dump, data) = paths();
        let harness = [(ShaderKind::Vertex, PathBuf::from("/w/harness.spv"))];
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness: &harness,
            dump: &dump,
            data: &data,
        });
        assert!(script.contains("SHADER vertex harness0 SPIRV-BIN FILE /w/harness.spv\n"));
        assert!(script.contains("BUFFER fb0 FORMAT R32G32B32A32_SFLOAT\n"));
        assert!(script.contains("  BIND BUFFER fb0 AS color LOCATION 0\n"));
        assert!(script.contains("  BIND BUFFER fb0 AS storage DESCRIPTOR_SET 0 BINDING 0\n"));
        assert!(script.ends_with("RUN main DRAW_RECT POS 0 0 SIZE 32 32\n"));
        Ok(())
    }

    #[test]
    fn refuses_what_it_cannot_bind() -> anyhow::Result<()> {
        let mut module = reflection(ExecutionModel::GLCompute);
        module.capabilities.insert(spirv::Capability::Int64ImageEXT);
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
            Plan::new(&module, &Inputs::default()).err(),
            Some(Refusal::Binding("arrays of descriptors".into()))
        );
        assert!(matches!(
            Plan::new(&reflection(ExecutionModel::Kernel), &Inputs::default()),
            Err(Refusal::Stage(_))
        ));
        assert!(matches!(
            Plan::new(&reflection(ExecutionModel::MissKHR), &Inputs::default()),
            Err(Refusal::Capability(_))
        ));
        assert!(matches!(
            Plan::new(&reflection(ExecutionModel::Geometry), &Inputs::default()),
            Err(Refusal::Binding(_))
        ));
        let mut module = reflection(ExecutionModel::GLCompute);
        module.capabilities.insert(spirv::Capability::Float64);
        assert!(planned(&module, &Inputs::default())?
            .needs
            .contains(&Need::Feature("shaderFloat64")));
        Ok(())
    }

    #[test]
    fn descriptor_arrays_bind_one_buffer_per_element() -> anyhow::Result<()> {
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
        let plan = planned(&module, &Inputs::default())?;
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
        Ok(())
    }

    #[test]
    fn given_values_override_random_data() -> anyhow::Result<()> {
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
        let plan = planned(&module, &inputs)?;
        let bytes = &plan.files[0].1;
        assert_eq!(&bytes[0..4], &0f32.to_le_bytes());
        assert_eq!(&bytes[4..8], &1f32.to_le_bytes());
        Ok(())
    }

    fn shaders(plan: &Plan) -> Vec<ShaderKind> {
        plan.harness.iter().map(|(kind, _)| *kind).collect()
    }

    fn harness_paths(plan: &Plan) -> Vec<(ShaderKind, PathBuf)> {
        plan.harness
            .iter()
            .map(|(kind, _)| (*kind, PathBuf::from(format!("h.{}.spv", kind.extension()))))
            .collect()
    }

    #[test]
    fn geometry_and_tessellation_get_generated_stages() -> anyhow::Result<()> {
        let mut module = reflection(ExecutionModel::Geometry);
        module
            .modes
            .insert(ExecutionMode::InputLinesAdjacency as u32, Vec::new());
        let plan = planned(&module, &Inputs::default())?;
        assert_eq!(shaders(&plan), [ShaderKind::Vertex, ShaderKind::Fragment]);
        let (tested, dump, data) = paths();
        let harness = harness_paths(&plan);
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness: &harness,
            dump: &dump,
            data: &data,
        });
        assert!(script.contains("SHADER geometry tested SPIRV-BIN FILE /w/tested.spv\n"));
        assert!(script.contains("  ATTACH harness0\n  ATTACH tested\n  ATTACH harness1\n"));
        assert!(script.contains("  VERTEX_DATA vb0 LOCATION 0\n"));
        assert!(script.contains("DRAW_ARRAY AS LINE_LIST_WITH_ADJACENCY START_IDX 0 COUNT 12"));

        let mut module = reflection(ExecutionModel::TessellationEvaluation);
        module.capabilities.insert(spirv::Capability::Tessellation);
        let plan = planned(&module, &Inputs::default())?;
        assert_eq!(
            shaders(&plan),
            [
                ShaderKind::Vertex,
                ShaderKind::TessControl,
                ShaderKind::Fragment
            ]
        );
        assert!(plan.needs.contains(&Need::Feature("tessellationShader")));
        let harness = harness_paths(&plan);
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness: &harness,
            dump: &dump,
            data: &data,
        });
        assert!(script.contains("  PATCH_CONTROL_POINTS 3\n"));
        assert!(script.contains("  ATTACH harness0\n  ATTACH harness1\n  ATTACH tested\n"));
        assert!(script.contains("DRAW_ARRAY AS PATCH_LIST"));

        let plan = planned(
            &reflection(ExecutionModel::TessellationControl),
            &Inputs::default(),
        )?;
        assert_eq!(
            shaders(&plan),
            [
                ShaderKind::Vertex,
                ShaderKind::TessEval,
                ShaderKind::Fragment
            ]
        );
        Ok(())
    }

    #[test]
    fn ray_generation_runs_in_a_ray_tracing_pipeline() -> anyhow::Result<()> {
        let mut module = reflection(ExecutionModel::RayGenerationKHR);
        module.capabilities.insert(spirv::Capability::RayTracingKHR);
        module.resources.push(Resource {
            set: 0,
            binding: 1,
            count: None,
            kind: ResourceKind::AccelerationStructure,
        });
        let plan = planned(&module, &Inputs::default())?;
        assert_eq!(
            shaders(&plan),
            [
                ShaderKind::Miss,
                ShaderKind::ClosestHit,
                ShaderKind::Callable
            ]
        );
        let (tested, dump, data) = paths();
        let harness = harness_paths(&plan);
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness: &harness,
            dump: &dump,
            data: &data,
        });
        assert!(
            script.contains("DEVICE_FEATURE RayTracingPipelineFeaturesKHR.rayTracingPipeline\n")
        );
        assert!(script.contains("PIPELINE raytracing main\n  SHADER_GROUP g_raygen tested\n"));
        assert!(script.contains("  BIND ACCELERATION_STRUCTURE tlas DESCRIPTOR_SET 0 BINDING 1\n"));
        assert!(script.contains("ACCELERATION_STRUCTURE TOP_LEVEL tlas\n"));
        assert!(script.ends_with(
            "RUN main RAYGEN sbt_raygen MISS sbt_miss HIT sbt_hit CALL sbt_call 4 4 1\n"
        ));

        module.shader_record = Some(Ok(Layout::Struct {
            members: vec![(0, Layout::Scalar(U32)), (4, Layout::Scalar(F32))],
        }));
        let plan = planned(&module, &Inputs::default())?;
        let record = plan
            .files
            .iter()
            .find(|(name, _)| name == "rglsl_record.bin")
            .context("no shader record file")?;
        assert_eq!(record.1.len(), 8);
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness: &harness,
            dump: &dump,
            data: &data,
        });
        assert!(script.contains("    g_raygen SHADER_RECORD rglsl_record\n"));

        module.shader_record = Some(Ok(Layout::Struct {
            members: vec![
                (0, Layout::Scalar(U32)),
                (
                    8,
                    Layout::Vector {
                        scalar: U32,
                        count: 2,
                    },
                ),
            ],
        }));
        module.addresses = vec![AddressField {
            buffer: AddressBuffer::ShaderRecord,
            offset: 8,
        }];
        let plan = planned(&module, &Inputs::default())?;
        let record = plan
            .files
            .iter()
            .find(|(name, _)| name == "rglsl_record.bin")
            .context("no shader record file")?;
        assert_eq!(record.1.len(), 16);
        assert_eq!(record.1[8..16], [0; 8]);
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness: &harness,
            dump: &dump,
            data: &data,
        });
        assert!(script.contains("    g_raygen SHADER_RECORD rglsl_record\n"));
        assert!(script
            .contains("END\nACCELERATION_STRUCTURE ADDRESS tlas BUFFER rglsl_record OFFSET 8\n"));
        Ok(())
    }

    #[test]
    fn addresses_in_push_constants_and_buffers_hold_the_scene() -> anyhow::Result<()> {
        let address = Layout::Vector {
            scalar: U32,
            count: 2,
        };
        let mut module = reflection(ExecutionModel::GLCompute);
        module.capabilities.insert(spirv::Capability::RayQueryKHR);
        module.push_constants = Some(Layout::Struct {
            members: vec![(0, address.clone())],
        });
        module.resources.push(Resource {
            set: 0,
            binding: 2,
            count: Some(2),
            kind: ResourceKind::StorageBuffer {
                layout: Layout::Struct {
                    members: vec![(0, Layout::Scalar(U32)), (8, address)],
                },
                writable: true,
            },
        });
        module.addresses = vec![
            AddressField {
                buffer: AddressBuffer::PushConstants,
                offset: 0,
            },
            AddressField {
                buffer: AddressBuffer::Resource {
                    set: 0,
                    binding: 2,
                    element: Some(1),
                },
                offset: 8,
            },
        ];
        let plan = planned(&module, &Inputs::default())?;
        let file = |name: &str| {
            plan.files
                .iter()
                .find(|(file, _)| file == name)
                .map(|(_, bytes)| bytes.clone())
                .with_context(|| format!("no file {name}"))
        };
        assert_eq!(file("push.bin")?[0..8], [0; 8]);
        assert_eq!(file("r0_2_1.bin")?[8..16], [0; 8]);
        assert_ne!(file("r0_2_0.bin")?[8..16], [0; 8]);
        let slots = |buffer: &str| {
            plan.targets
                .iter()
                .find(|target| target.buffer == buffer)
                .map(|target| {
                    target
                        .slots
                        .iter()
                        .map(|slot| slot.offset)
                        .collect::<Vec<_>>()
                })
                .with_context(|| format!("no target for {buffer}"))
        };
        assert_eq!(slots("r0_2_0")?, [0, 8, 12]);
        assert_eq!(slots("r0_2_1")?, [0]);
        let (tested, dump, data) = paths();
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness: &[],
            dump: &dump,
            data: &data,
        });
        assert!(script.contains(
            "ACCELERATION_STRUCTURE TOP_LEVEL tlas\n  BOTTOM_LEVEL_INSTANCE blas\n  END\nEND\n\
             ACCELERATION_STRUCTURE ADDRESS tlas BUFFER r0_2_1 OFFSET 8\n\
             ACCELERATION_STRUCTURE ADDRESS tlas BUFFER push OFFSET 0\nPIPELINE compute main\n"
        ));
        assert!(!script.contains("BIND ACCELERATION_STRUCTURE"));

        module.addresses[0].offset = 4;
        assert_eq!(
            Plan::new(&module, &Inputs::default()).err(),
            Some(Refusal::Binding(
                "acceleration structure address at offset 4 outside buffer push".into()
            ))
        );
        Ok(())
    }

    #[test]
    fn hit_stages_run_behind_a_generated_ray_generation_shader() -> anyhow::Result<()> {
        let mut module = reflection(ExecutionModel::ClosestHitKHR);
        module.capabilities.insert(spirv::Capability::RayTracingKHR);
        module.resources.push(Resource {
            set: 0,
            binding: 0,
            count: None,
            kind: ResourceKind::AccelerationStructure,
        });
        module.ray_variables.push(RayVariable {
            class: spirv::StorageClass::IncomingRayPayloadKHR,
            location: 1,
            ty: Ok(DataType::Vector {
                scalar: F32,
                count: 4,
            }),
        });
        let plan = planned(&module, &Inputs::default())?;
        assert_eq!(plan.harness_env, Some("vulkan1.2"));
        assert_eq!(plan.harness[0].0, ShaderKind::RayGeneration);
        assert!(plan.harness[0]
            .1
            .contains("layout(set = 1, binding = 1, std430) buffer RglslOut"));
        assert_eq!(plan.targets.len(), 1);
        assert_eq!(plan.targets[0].buffer, "rglsl_out");
        assert_eq!(plan.targets[0].slots.len(), 64);
        assert_eq!(plan.targets[0].slots[4].offset, 16);
        assert!(plan
            .bindings
            .contains("  BIND ACCELERATION_STRUCTURE tlas DESCRIPTOR_SET 1 BINDING 0\n  BIND BUFFER rglsl_out AS storage DESCRIPTOR_SET 1 BINDING 1\n"));
        let (tested, dump, data) = paths();
        let harness = harness_paths(&plan);
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness: &harness,
            dump: &dump,
            data: &data,
        });
        assert!(script.contains("SHADER closest_hit tested SPIRV-BIN FILE /w/tested.spv\n"));
        assert!(script.contains("  SHADER_GROUP g_hit tested\n"));
        assert!(script.contains("BUFFER rglsl_out DATA_TYPE uint8 SIZE 256 FILE BINARY"));
        Ok(())
    }

    #[test]
    fn ray_queries_bind_the_scene_in_any_stage() -> anyhow::Result<()> {
        let mut module = reflection(ExecutionModel::Fragment);
        module.capabilities.insert(spirv::Capability::RayQueryKHR);
        module.resources.push(Resource {
            set: 0,
            binding: 2,
            count: None,
            kind: ResourceKind::AccelerationStructure,
        });
        let plan = planned(&module, &Inputs::default())?;
        assert!(plan
            .needs
            .contains(&Need::Feature("RayQueryFeaturesKHR.rayQuery")));
        assert!(plan
            .declarations
            .contains("ACCELERATION_STRUCTURE BOTTOM_LEVEL blas\n  GEOMETRY TRIANGLES\n"));
        assert!(plan
            .bindings
            .contains("  BIND ACCELERATION_STRUCTURE tlas DESCRIPTOR_SET 0 BINDING 2\n"));
        assert_eq!(plan.draw, Draw::Rect);
        Ok(())
    }

    #[test]
    fn mesh_shaders_draw_mesh_tasks() -> anyhow::Result<()> {
        let mut module = reflection(ExecutionModel::MeshEXT);
        module
            .capabilities
            .insert(spirv::Capability::MeshShadingEXT);
        module.outputs = vec![Varying {
            location: 0,
            component: 0,
            ty: VaryingType::Simple {
                scalar: F32,
                count: 4,
            },
            array: None,
            interpolation: Interpolation::Smooth,
            centroid: false,
            sample: false,
            patch: false,
            per_primitive: true,
        }];
        module.task_payload = Some(Ok(DataType::Scalar(U32)));
        let plan = planned(&module, &Inputs::default())?;
        assert_eq!(shaders(&plan), [ShaderKind::Task, ShaderKind::Fragment]);
        assert!(plan.harness[1]
            .1
            .contains("layout(location = 0) perprimitiveEXT in vec4 v0;"));
        assert!(plan.needs.contains(&requirements::TASK_SHADER));
        assert!(plan.needs.contains(&requirements::MESH_SHADER));
        let (tested, dump, data) = paths();
        let harness = harness_paths(&plan);
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness: &harness,
            dump: &dump,
            data: &data,
        });
        assert!(script.contains("SHADER mesh tested SPIRV-BIN FILE /w/tested.spv\n"));
        assert!(script.contains("  ATTACH harness0\n  ATTACH tested\n  ATTACH harness1\n"));
        assert!(script.ends_with("RUN main DRAW_MESH_TASKS 1 1 1\n"));

        let mut module = reflection(ExecutionModel::TaskEXT);
        module
            .capabilities
            .insert(spirv::Capability::MeshShadingEXT);
        let plan = planned(&module, &Inputs::default())?;
        assert_eq!(shaders(&plan), [ShaderKind::Mesh, ShaderKind::Fragment]);
        assert_eq!(plan.attachments.len(), 2);
        assert_eq!(plan.draw, Draw::Mesh);
        Ok(())
    }

    #[test]
    fn nv_mesh_and_task_shaders_get_nv_partner_stages() -> anyhow::Result<()> {
        let mut module = reflection(ExecutionModel::MeshNV);
        module.capabilities.insert(spirv::Capability::MeshShadingNV);
        module.outputs = vec![Varying {
            location: 2,
            component: 0,
            ty: VaryingType::Simple {
                scalar: U32,
                count: 1,
            },
            array: None,
            interpolation: Interpolation::Flat,
            centroid: false,
            sample: false,
            patch: false,
            per_primitive: true,
        }];
        let plan = planned(&module, &Inputs::default())?;
        assert_eq!(shaders(&plan), [ShaderKind::Fragment]);
        assert!(plan.harness[0]
            .1
            .contains("layout(location = 2) flat perprimitiveNV in uint v2;"));
        assert!(plan.needs.contains(&requirements::MESH_SHADER_NV));
        assert!(!plan.needs.contains(&requirements::MESH_SHADER));
        assert_eq!(plan.draw, Draw::Mesh);

        let mut module = reflection(ExecutionModel::TaskNV);
        module.capabilities.insert(spirv::Capability::MeshShadingNV);
        let plan = planned(&module, &Inputs::default())?;
        assert_eq!(shaders(&plan), [ShaderKind::Mesh, ShaderKind::Fragment]);
        assert!(plan.harness[0].1.contains("GL_NV_mesh_shader"));
        assert!(plan.harness[0].1.contains("gl_PrimitiveCountNV = 1u;"));
        assert!(!plan.needs.contains(&requirements::TASK_SHADER));
        Ok(())
    }

    #[test]
    fn texel_buffers_are_bound_and_dumped() -> anyhow::Result<()> {
        let image = ImageType {
            dim: Dim::DimBuffer,
            depth: false,
            arrayed: false,
            multisampled: false,
            sampled: 2,
            format: ImageFormat::R32ui,
            scalar: U32,
        };
        let mut module = reflection(ExecutionModel::GLCompute);
        module.resources.push(Resource {
            set: 0,
            binding: 0,
            count: None,
            kind: ResourceKind::UniformTexelBuffer(ImageType {
                sampled: 1,
                ..image
            }),
        });
        module.resources.push(Resource {
            set: 0,
            binding: 1,
            count: None,
            kind: ResourceKind::StorageTexelBuffer(image),
        });
        let plan = planned(&module, &Inputs::default())?;
        assert!(plan
            .declarations
            .contains("BUFFER r0_0 DATA_TYPE R32G32B32A32_UINT DATA\n"));
        assert!(plan
            .declarations
            .contains("BUFFER r0_1 DATA_TYPE R32_UINT DATA\n"));
        assert!(plan
            .bindings
            .contains("  BIND BUFFER r0_0 AS uniform_texel_buffer DESCRIPTOR_SET 0 BINDING 0\n"));
        assert!(plan
            .bindings
            .contains("  BIND BUFFER r0_1 AS storage_texel_buffer DESCRIPTOR_SET 0 BINDING 1\n"));
        assert_eq!(plan.targets.len(), 1);
        assert_eq!(plan.targets[0].slots.len(), 64);

        let mut module = reflection(ExecutionModel::GLCompute);
        module.resources.push(Resource {
            set: 0,
            binding: 0,
            count: None,
            kind: ResourceKind::SampledImage(ImageType {
                dim: Dim::DimCube,
                sampled: 1,
                ..image
            }),
        });
        let Err(Refusal::Binding(reason)) = Plan::new(&module, &Inputs::default()) else {
            panic!("cube images are refused");
        };
        assert!(reason.contains("Amber"));
        Ok(())
    }
}
