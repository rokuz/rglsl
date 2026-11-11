use std::fmt;

use rglsl::ShaderStage;

#[derive(Debug, Clone, PartialEq, Eq, thiserror::Error)]
pub enum LinkError {
    #[error("object module format version {found} is not supported (expected {expected})")]
    Format { found: u32, expected: u32 },
    #[error("Missing entry point: Each stage requires one entry point")]
    MissingEntryPoint,
    #[error("can't handle multiple entry points per stage")]
    MultipleEntryPoints,
    #[error("stages must match when linking into a single stage: {0:?} and {1:?}")]
    StageMismatch(ShaderStage, ShaderStage),
    #[error("No function definition (body) found: {0}")]
    MissingDefinition(String),
    #[error("Multiple function bodies in multiple compilation units for the same signature in the same stage: {0}")]
    DuplicateDefinition(String),
    #[error("function `{0}` is declared with a different return type or parameter qualifiers than its definition")]
    SignatureMismatch(String),
    #[error("Recursion detected: {0}")]
    Recursion(String),
    #[error("global `{name}`: {what} must match across modules")]
    GlobalMismatch { name: String, what: &'static str },
    #[error(
        "Implicit size of unsized array doesn't match same symbol among multiple shaders: `{0}`"
    )]
    ImplicitSize(String),
    #[error("Not all array sizes match across all geometry shaders in the program: `{0}`")]
    GeometryInputSize(String),
    #[error("Only one push_constant block is allowed per stage")]
    PushConstants,
    #[error("specialization constant {0} is declared differently in two modules")]
    SpecializationConstant(u32),
    #[error("structure `{0}` is defined differently in two modules")]
    StructMismatch(String),
    #[error("Contradictory {0}")]
    Contradictory(&'static str),
    #[error("{0}")]
    MissingLayout(&'static str),
    #[error("{stages}: {what} of `{name}` must match between stages")]
    CrossStage {
        stages: String,
        name: String,
        what: &'static str,
    },
    #[error(
        "library {library} cannot be linked into a {stage_name} shader: {message}{at}",
        stage_name = .stage.name(),
        at = line_suffix(*.line)
    )]
    LibraryStage {
        library: String,
        stage: ShaderStage,
        line: Option<u32>,
        message: String,
    },
    #[error("not implemented: {0}")]
    Unsupported(String),
    #[error("the linked module is not valid: {0}")]
    Validation(String),
    #[error("internal linker error: {0}")]
    Internal(String),
}

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct LinkErrors {
    pub errors: Vec<LinkError>,
}

impl LinkErrors {
    pub fn iter(&self) -> impl Iterator<Item = &LinkError> {
        self.errors.iter()
    }
}

impl From<Vec<LinkError>> for LinkErrors {
    fn from(errors: Vec<LinkError>) -> Self {
        Self { errors }
    }
}

impl From<LinkError> for LinkErrors {
    fn from(error: LinkError) -> Self {
        Self {
            errors: vec![error],
        }
    }
}

impl fmt::Display for LinkErrors {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        for (index, error) in self.errors.iter().enumerate() {
            if index > 0 {
                writeln!(formatter)?;
            }
            write!(formatter, "{error}")?;
        }
        Ok(())
    }
}

impl std::error::Error for LinkErrors {}

pub(crate) fn internal(error: impl fmt::Display) -> LinkError {
    LinkError::Internal(error.to_string())
}

fn line_suffix(line: Option<u32>) -> String {
    line.map_or_else(String::new, |line| format!(" (line {line})"))
}
