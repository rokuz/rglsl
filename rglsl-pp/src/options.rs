use alloc::string::String;
use alloc::vec::Vec;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Stage {
    Vertex,
    TessControl,
    TessEvaluation,
    Geometry,
    Fragment,
    Compute,
    RayGeneration,
    Intersection,
    AnyHit,
    ClosestHit,
    Miss,
    Callable,
    Task,
    Mesh,
}

impl Stage {
    pub fn from_extension(extension: &str) -> Option<Self> {
        Some(match extension {
            "vert" => Self::Vertex,
            "tesc" => Self::TessControl,
            "tese" => Self::TessEvaluation,
            "geom" => Self::Geometry,
            "frag" => Self::Fragment,
            "comp" => Self::Compute,
            "rgen" => Self::RayGeneration,
            "rint" => Self::Intersection,
            "rahit" => Self::AnyHit,
            "rchit" => Self::ClosestHit,
            "rmiss" => Self::Miss,
            "rcall" => Self::Callable,
            "task" => Self::Task,
            "mesh" => Self::Mesh,
            _ => return None,
        })
    }

    pub(crate) const fn macro_name(self) -> &'static str {
        match self {
            Self::Vertex => "GL_VERTEX_SHADER",
            Self::TessControl => "GL_TESSELLATION_CONTROL_SHADER",
            Self::TessEvaluation => "GL_TESSELLATION_EVALUATION_SHADER",
            Self::Geometry => "GL_GEOMETRY_SHADER",
            Self::Fragment => "GL_FRAGMENT_SHADER",
            Self::Compute => "GL_COMPUTE_SHADER",
            Self::RayGeneration => "GL_RAY_GENERATION_SHADER_EXT",
            Self::Intersection => "GL_INTERSECTION_SHADER_EXT",
            Self::AnyHit => "GL_ANY_HIT_SHADER_EXT",
            Self::ClosestHit => "GL_CLOSEST_HIT_SHADER_EXT",
            Self::Miss => "GL_MISS_SHADER_EXT",
            Self::Callable => "GL_CALLABLE_SHADER_EXT",
            Self::Task => "GL_TASK_SHADER_EXT",
            Self::Mesh => "GL_MESH_SHADER_EXT",
        }
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
    pub max_include_depth: usize,
    pub max_expression_depth: usize,
    pub max_tokens: usize,
    pub max_output_bytes: usize,
}

impl Default for Limits {
    fn default() -> Self {
        Self {
            max_if_nesting: 65,
            max_macro_expansion_depth: 200,
            max_include_depth: 64,
            max_expression_depth: 256,
            max_tokens: 1 << 23,
            max_output_bytes: 1 << 26,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Options {
    pub defines: Vec<Define>,
    pub vulkan_client_version: Option<u32>,
    pub gl_spirv: bool,
    pub stage: Option<Stage>,
    pub source_name: Option<String>,
    pub default_version: u32,
    pub limits: Limits,
}

impl Default for Options {
    fn default() -> Self {
        Self {
            defines: Vec::new(),
            vulkan_client_version: Some(100),
            gl_spirv: false,
            stage: None,
            source_name: None,
            default_version: 100,
            limits: Limits::default(),
        }
    }
}
