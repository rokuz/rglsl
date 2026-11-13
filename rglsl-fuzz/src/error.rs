use core::fmt;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Error {
    Json(String),
    Parse { shader: String, message: String },
    Unsupported(String),
    Generation(String),
    Stalled,
}

impl From<rglsl_ast::Stalled> for Error {
    fn from(_: rglsl_ast::Stalled) -> Self {
        Self::Stalled
    }
}

impl From<fmt::Error> for Error {
    fn from(_: fmt::Error) -> Self {
        Self::Stalled
    }
}

impl fmt::Display for Error {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Json(message) => write!(formatter, "invalid shader job JSON: {message}"),
            Self::Parse { shader, message } => write!(formatter, "{shader}: {message}"),
            Self::Unsupported(message) => write!(formatter, "unsupported: {message}"),
            Self::Generation(message) => write!(formatter, "generation failed: {message}"),
            Self::Stalled => formatter.write_str("a syntax tree walk stopped before it finished"),
        }
    }
}

impl std::error::Error for Error {}
