use core::fmt;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Error {
    Json(String),
    Parse { shader: String, message: String },
    Unsupported(String),
    Generation(String),
}

impl fmt::Display for Error {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Json(message) => write!(formatter, "invalid shader job JSON: {message}"),
            Self::Parse { shader, message } => write!(formatter, "{shader}: {message}"),
            Self::Unsupported(message) => write!(formatter, "unsupported: {message}"),
            Self::Generation(message) => write!(formatter, "generation failed: {message}"),
        }
    }
}

impl std::error::Error for Error {}
