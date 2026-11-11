use alloc::{string::String, vec::Vec};

#[cfg(feature = "deserialize")]
use serde::Deserialize;
#[cfg(feature = "serialize")]
use serde::Serialize;

use crate::{
    ConservativeDepth, Function, GeometryInputPrimitive, GeometryOutputPrimitive, GlobalVariable,
    Handle, MeshOutputTopology, Module, ShaderStage, TessellationPrimitive, TessellationSpacing,
    TessellationVertexOrder,
};

pub const FORMAT_VERSION: u32 = 1;

#[derive(Debug, Clone)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
pub struct ObjectModule {
    pub format_version: u32,
    pub stage: Option<ShaderStage>,
    pub glsl_version: u32,
    pub extensions: Vec<String>,
    pub module: Module,
    pub functions: Vec<FunctionSymbol>,
    pub globals: Vec<GlobalSymbol>,
    pub layout: StageLayout,
}

impl ObjectModule {
    pub fn new(stage: Option<ShaderStage>, module: Module) -> Self {
        Self {
            format_version: FORMAT_VERSION,
            stage,
            glsl_version: 0,
            extensions: Vec::new(),
            module,
            functions: Vec::new(),
            globals: Vec::new(),
            layout: StageLayout::default(),
        }
    }

    pub const fn is_library(&self) -> bool {
        self.stage.is_none()
    }

    pub fn has_entry_point(&self) -> bool {
        !self.module.entry_points.is_empty()
    }

    pub fn function_symbol(&self, function: Handle<Function>) -> Option<&FunctionSymbol> {
        self.functions
            .iter()
            .find(|symbol| symbol.function == function)
    }

    pub fn global_symbol(&self, global: Handle<GlobalVariable>) -> Option<&GlobalSymbol> {
        self.globals.iter().find(|symbol| symbol.global == global)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
pub enum ParameterQualifier {
    In,
    ConstIn,
    Out,
    Inout,
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
pub struct FunctionSymbol {
    pub function: Handle<Function>,
    pub name: String,
    pub signature: String,
    pub result: String,
    pub qualifiers: Vec<ParameterQualifier>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, PartialOrd, Ord)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
pub enum SymbolKind {
    Variable,
    Block,
    BuiltIn,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, PartialOrd, Ord)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
pub enum PathStep {
    Element,
    Member(u32),
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
pub struct GlobalSymbol {
    pub global: Handle<GlobalVariable>,
    pub name: String,
    pub kind: SymbolKind,
    pub instance: Option<String>,
    pub implicit_sizes: Vec<Vec<PathStep>>,
    pub automatic_location: bool,
    pub automatic_binding: Option<Option<u32>>,
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
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
}
