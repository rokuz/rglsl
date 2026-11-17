use rglsl::ShaderStage;

use crate::{OptLevel, TargetGpu};

#[derive(Debug, Clone, PartialEq, Eq, thiserror::Error)]
pub enum OptError {
    #[error("unknown optimizer pass `{name}` (known passes: {known})")]
    UnknownPass { name: String, known: String },
    #[error("internal error: no optimizer preset for {0:?}")]
    MissingPreset(OptLevel),
    #[error("internal error: no optimizer profile for the target GPU {0:?}")]
    MissingProfile(TargetGpu),
    #[error("internal error: optimizer pass `{pass}` failed: {message}")]
    Pass { pass: &'static str, message: String },
    #[error(
        "internal error: optimizer pass `{pass}` produced invalid IR in the {stage:?} stage: {message}"
    )]
    InvalidIr {
        pass: &'static str,
        stage: ShaderStage,
        message: String,
    },
    #[error(
        "internal error: the optimized module of the {stage:?} stage cannot be compacted: {message}"
    )]
    Compact { stage: ShaderStage, message: String },
    #[error("internal error: the optimized module of the {stage:?} stage is invalid: {message}")]
    Invalid { stage: ShaderStage, message: String },
}

pub(crate) fn chain(error: &dyn core::error::Error) -> String {
    let mut text = error.to_string();
    let mut source = error.source();
    while let Some(inner) = source {
        text.push_str(": ");
        text.push_str(&inner.to_string());
        source = inner.source();
    }
    text
}
