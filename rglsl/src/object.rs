use alloc::{boxed::Box, string::String, vec::Vec};
use rglsl_types::rglo::Rglo;

#[cfg(feature = "deserialize")]
use serde::Deserialize;
#[cfg(feature = "serialize")]
use serde::Serialize;

use crate::{
    ConservativeDepth, Function, GeometryInputPrimitive, GeometryOutputPrimitive, GlobalVariable,
    Handle, MeshOutputTopology, Module, Override, RayTracingFeatures, ShaderStage, ShaderStageMask,
    TessellationPrimitive, TessellationSpacing, TessellationVertexOrder,
};

pub const FORMAT_VERSION: u32 = 41;

#[derive(Debug, Clone, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
pub struct ObjectModule {
    pub format_version: u32,
    pub name: Option<String>,
    pub entry_point: Option<String>,
    pub processes: Vec<String>,
    pub target: ObjectTarget,
    pub unit: Box<CompiledUnit>,
}

#[derive(Debug, Clone, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
pub enum ObjectTarget {
    Stage(ShaderStage),
    Library(Library),
}

#[derive(Debug, Clone, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
pub struct Library {
    pub stages: ShaderStageMask,
    pub variants: Vec<LibraryVariant>,
    pub rejections: Vec<StageRejection>,
}

#[derive(Debug, Clone, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
pub struct LibraryVariant {
    pub stages: ShaderStageMask,
    pub unit: Box<CompiledUnit>,
}

#[derive(Debug, Clone, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
pub struct CompiledUnit {
    pub glsl_version: u32,
    pub extensions: Vec<String>,
    pub module: Box<Module>,
    pub functions: Vec<FunctionSymbol>,
    pub globals: Vec<GlobalSymbol>,
    pub layout: StageLayout,
    pub work_group_size_constant: bool,
    pub work_group_size_placeholders: [Option<Handle<Override>>; 3],
    #[cfg_attr(any(feature = "serialize", feature = "deserialize"), serde(skip))]
    #[rglo(skip)]
    pub specialized: Option<Box<CompiledUnit>>,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "core::ops::Not::not")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    #[rglo(skip_if = core::ops::Not::not)]
    pub deferred_bias: bool,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Vec::is_empty"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    #[rglo(skip_if = Vec::is_empty)]
    pub dead_calls: Vec<DeadCall>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
pub struct DeadCall {
    pub caller: Option<Handle<Function>>,
    pub callee: Handle<Function>,
}

impl CompiledUnit {
    pub fn new(module: Module) -> Self {
        Self {
            glsl_version: 0,
            extensions: Vec::new(),
            module: Box::new(module),
            functions: Vec::new(),
            globals: Vec::new(),
            layout: StageLayout::default(),
            work_group_size_constant: false,
            work_group_size_placeholders: [None; 3],
            specialized: None,
            deferred_bias: false,
            dead_calls: Vec::new(),
        }
    }

    pub const fn has_entry_point(&self) -> bool {
        !self.module.entry_points.is_empty()
    }

    fn for_library_stage(&self, stage: ShaderStage) -> Self {
        self.clone().into_library_stage(stage)
    }

    fn into_library_stage(mut self, stage: ShaderStage) -> Self {
        if stage != ShaderStage::Geometry {
            self.layout.streams.clear();
            self.layout.multi_stream = false;
        }
        self.module.ray_tracing = ray_tracing_for(stage, self.module.ray_tracing);
        if self.deferred_bias && stage != ShaderStage::Fragment {
            drop_bias(&mut self.module);
        }
        self.deferred_bias = false;
        if let Some(ref mut specialized) = self.specialized {
            specialized.module.ray_tracing = ray_tracing_for(stage, specialized.module.ray_tracing);
            if specialized.deferred_bias && stage != ShaderStage::Fragment {
                drop_bias(&mut specialized.module);
            }
            specialized.deferred_bias = false;
        }
        self
    }
}

impl ObjectModule {
    pub fn new(target: ObjectTarget, unit: CompiledUnit) -> Self {
        Self {
            format_version: FORMAT_VERSION,
            name: None,
            entry_point: None,
            processes: Vec::new(),
            target,
            unit: Box::new(unit),
        }
    }

    pub const fn stage(&self) -> Option<ShaderStage> {
        match self.target {
            ObjectTarget::Stage(stage) => Some(stage),
            ObjectTarget::Library(_) => None,
        }
    }

    pub const fn library(&self) -> Option<&Library> {
        match self.target {
            ObjectTarget::Stage(_) => None,
            ObjectTarget::Library(ref library) => Some(library),
        }
    }

    pub fn supports(&self, stage: ShaderStage) -> bool {
        match self.target {
            ObjectTarget::Stage(own) => own == stage,
            ObjectTarget::Library(ref library) => {
                library.stages.has(stage)
                    || library
                        .variants
                        .iter()
                        .any(|variant| variant.stages.has(stage))
            }
        }
    }

    pub fn for_stage(&self, stage: ShaderStage) -> Result<ObjectModule, StageRejection> {
        let library = match self.target {
            ObjectTarget::Stage(own) if own == stage => return Ok(self.clone()),
            ObjectTarget::Stage(own) => {
                return Err(StageRejection {
                    stage,
                    file: None,
                    line: None,
                    message: alloc::format!("the module is a {} shader", own.name()),
                });
            }
            ObjectTarget::Library(ref library) => library,
        };
        let found = if library.stages.has(stage) {
            Some((library.stages, &self.unit))
        } else {
            library
                .variants
                .iter()
                .find(|variant| variant.stages.has(stage))
                .map(|variant| (variant.stages, &variant.unit))
        };
        match found {
            Some((stages, unit)) => Ok(ObjectModule {
                format_version: self.format_version,
                name: self.name.clone(),
                entry_point: self.entry_point.clone(),
                processes: self.processes.clone(),
                target: ObjectTarget::Library(Library {
                    stages,
                    variants: Vec::new(),
                    rejections: Vec::new(),
                }),
                unit: Box::new(unit.for_library_stage(stage)),
            }),
            None => Err(library
                .rejections
                .iter()
                .find(|rejection| rejection.stage == stage)
                .cloned()
                .unwrap_or_else(|| StageRejection {
                    stage,
                    file: None,
                    line: None,
                    message: String::from("the library is not compiled for this stage"),
                })),
        }
    }

    pub fn into_stage(self, stage: ShaderStage) -> Result<ObjectModule, StageRejection> {
        let ObjectModule {
            format_version,
            name,
            entry_point,
            processes,
            target,
            unit,
        } = self;
        let library = match target {
            ObjectTarget::Stage(own) if own == stage => {
                return Ok(ObjectModule {
                    format_version,
                    name,
                    entry_point,
                    processes,
                    target: ObjectTarget::Stage(own),
                    unit,
                });
            }
            ObjectTarget::Stage(own) => {
                return Err(StageRejection {
                    stage,
                    file: None,
                    line: None,
                    message: alloc::format!("the module is a {} shader", own.name()),
                });
            }
            ObjectTarget::Library(library) => library,
        };
        let Library {
            stages,
            variants,
            rejections,
        } = library;
        let found = if stages.has(stage) {
            Some((stages, unit))
        } else {
            variants
                .into_iter()
                .find(|variant| variant.stages.has(stage))
                .map(|variant| (variant.stages, variant.unit))
        };
        match found {
            Some((stages, unit)) => Ok(ObjectModule {
                format_version,
                name,
                entry_point,
                processes,
                target: ObjectTarget::Library(Library {
                    stages,
                    variants: Vec::new(),
                    rejections: Vec::new(),
                }),
                unit: Box::new(unit.into_library_stage(stage)),
            }),
            None => Err(rejections
                .into_iter()
                .find(|rejection| rejection.stage == stage)
                .unwrap_or_else(|| StageRejection {
                    stage,
                    file: None,
                    line: None,
                    message: String::from("the library is not compiled for this stage"),
                })),
        }
    }

    pub const fn library_mut(&mut self) -> Option<&mut Library> {
        match self.target {
            ObjectTarget::Stage(_) => None,
            ObjectTarget::Library(ref mut library) => Some(library),
        }
    }

    pub const fn is_library(&self) -> bool {
        matches!(self.target, ObjectTarget::Library(_))
    }

    pub const fn has_entry_point(&self) -> bool {
        self.unit.has_entry_point()
    }

    pub fn units(&self) -> impl Iterator<Item = &CompiledUnit> {
        core::iter::once(&*self.unit).chain(
            self.library()
                .into_iter()
                .flat_map(|library| library.variants.iter().map(|variant| &*variant.unit)),
        )
    }
}

fn drop_bias(module: &mut Module) {
    for (_, function) in module.functions.iter_mut() {
        for (_, expression) in function.expressions.iter_mut() {
            if let crate::Expression::ImageSample { ref mut level, .. } = *expression
                && matches!(*level, crate::SampleLevel::Bias(_))
            {
                *level = crate::SampleLevel::Zero;
            }
        }
    }
}

pub const fn ray_tracing_for(
    stage: ShaderStage,
    features: RayTracingFeatures,
) -> RayTracingFeatures {
    let pipeline = RayTracingFeatures::CULL_MASK.union(RayTracingFeatures::POSITION_FETCH);
    if !stage.ray_tracing() {
        features.difference(
            pipeline
                .union(RayTracingFeatures::NV)
                .union(RayTracingFeatures::PAYLOAD_LOCATIONS),
        )
    } else if matches!(stage, ShaderStage::RayGeneration | ShaderStage::Callable) {
        features.difference(pipeline)
    } else {
        features
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
pub struct StageRejection {
    pub stage: ShaderStage,
    pub file: Option<String>,
    pub line: Option<u32>,
    pub message: String,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
pub enum ParameterQualifier {
    In,
    ConstIn,
    Out,
    Inout,
}

#[derive(Debug, Clone, PartialEq, Eq, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
pub struct FunctionSymbol {
    pub function: Handle<Function>,
    pub name: String,
    pub signature: String,
    pub result: String,
    pub qualifiers: Vec<ParameterQualifier>,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    #[rglo(skip_if = Option::is_none)]
    pub invalid: Option<String>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, PartialOrd, Ord, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
pub enum SymbolKind {
    Variable,
    Block,
    BuiltIn,
    Local,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, PartialOrd, Ord, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
pub enum PathStep {
    Element,
    Member(u32),
}

#[derive(Debug, Clone, PartialEq, Eq, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
pub struct GlobalSymbol {
    pub global: Handle<GlobalVariable>,
    pub name: String,
    pub kind: SymbolKind,
    pub instance: Option<String>,
    pub implicit_sizes: Vec<Vec<PathStep>>,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "core::ops::Not::not")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    #[rglo(skip_if = core::ops::Not::not)]
    pub on_use: bool,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    #[rglo(skip_if = Option::is_none)]
    pub initializer: Option<Handle<crate::Expression>>,
}

#[derive(Debug, Clone, Default, PartialEq, Eq, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
pub struct StageLayout {
    pub local_size: [Option<u32>; 3],
    pub local_size_ids: [Option<u32>; 3],
    pub depth: Option<ConservativeDepth>,
    pub early_fragment_tests: bool,
    pub xfb_strides: Vec<(u32, u32)>,
    pub input_primitive: Option<GeometryInputPrimitive>,
    pub output_primitive: Option<GeometryOutputPrimitive>,
    pub vertices: Option<u32>,
    pub primitives: Option<u32>,
    pub invocations: Option<u32>,
    pub tessellation_primitive: Option<TessellationPrimitive>,
    pub spacing: Option<TessellationSpacing>,
    pub vertex_order: Option<TessellationVertexOrder>,
    pub point_mode: bool,
    pub mesh_topology: Option<MeshOutputTopology>,
    pub transform_feedback: bool,
    pub tile_shading_rate: [Option<u32>; 3],
    pub non_coherent_tile_read: bool,
    pub post_depth_coverage: bool,
    pub non_coherent_color_attachment_read: bool,
    pub non_coherent_depth_attachment_read: bool,
    pub non_coherent_stencil_attachment_read: bool,
    pub multi_stream: bool,
    pub streams: Vec<(Handle<GlobalVariable>, u32)>,
    pub passthrough: Vec<Handle<GlobalVariable>>,
}
