use alloc::string::String;
use alloc::vec::Vec;

use rglsl_types::ShaderStage;

pub(crate) const fn macro_name(stage: ShaderStage) -> &'static str {
    match stage {
        ShaderStage::Vertex => "GL_VERTEX_SHADER",
        ShaderStage::TessControl => "GL_TESSELLATION_CONTROL_SHADER",
        ShaderStage::TessEvaluation => "GL_TESSELLATION_EVALUATION_SHADER",
        ShaderStage::Geometry => "GL_GEOMETRY_SHADER",
        ShaderStage::Fragment => "GL_FRAGMENT_SHADER",
        ShaderStage::Compute => "GL_COMPUTE_SHADER",
        ShaderStage::RayGeneration => "GL_RAY_GENERATION_SHADER_EXT",
        ShaderStage::Intersection => "GL_INTERSECTION_SHADER_EXT",
        ShaderStage::AnyHit => "GL_ANY_HIT_SHADER_EXT",
        ShaderStage::ClosestHit => "GL_CLOSEST_HIT_SHADER_EXT",
        ShaderStage::Miss => "GL_MISS_SHADER_EXT",
        ShaderStage::Callable => "GL_CALLABLE_SHADER_EXT",
        ShaderStage::Task => "GL_TASK_SHADER_EXT",
        ShaderStage::Mesh => "GL_MESH_SHADER_EXT",
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Define {
    pub name: String,
    pub value: Option<String>,
}

impl Define {
    pub fn new(name: impl Into<String>, value: Option<&str>) -> Self {
        Self {
            name: name.into(),
            value: value.map(String::from),
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Limits {
    pub max_if_nesting: usize,
    pub max_macro_expansion_depth: usize,
    pub max_tokens: usize,
    pub max_output_bytes: usize,
}

impl Default for Limits {
    fn default() -> Self {
        Self {
            max_if_nesting: 65,
            max_macro_expansion_depth: 200,
            max_tokens: 1 << 23,
            max_output_bytes: 1 << 26,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Options {
    pub defines: Vec<Define>,
    pub vulkan_client_version: Option<u32>,
    pub stage: Option<ShaderStage>,
    pub source_name: Option<String>,
    pub default_version: u32,
    pub limits: Limits,
    pub listing: bool,
    pub preamble: Option<String>,
}

impl Default for Options {
    fn default() -> Self {
        Self {
            defines: Vec::new(),
            vulkan_client_version: Some(100),
            stage: None,
            source_name: None,
            default_version: 100,
            limits: Limits::default(),
            listing: false,
            preamble: None,
        }
    }
}
