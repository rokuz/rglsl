#![forbid(unsafe_code)]

pub mod basic;
pub mod build;
pub mod constants;
pub mod error;
pub mod fuzzer;
pub mod generate;
pub mod identity;
pub mod job;
pub mod macros;
pub mod opaque;
pub mod pipeline;
pub mod random;
pub mod rewrite;
pub mod scope;

pub use error::Error;
pub use generate::{
    analyze_shader, generate_family, generate_variant, prepare_reference, Family, FamilyOptions,
    GeneratorOptions,
};
pub use job::{Shader, ShaderJob, STAGE_EXTENSIONS};
pub use macros::{emit, expand_macros, parse_shader};
pub use pipeline::PipelineInfo;
pub use random::Random;
pub use rglsl_ast::{ast, parse, print, ParseError, ParseErrorKind, TranslationUnit};
