#![forbid(unsafe_code)]

pub mod amber;
pub mod barrier;
pub mod basic;
pub mod build;
pub mod constants;
pub mod context;
pub mod donate;
pub mod error;
pub mod fuzzer;
pub mod generate;
pub mod identity;
pub mod injection;
pub mod job;
pub mod jump;
pub mod macros;
pub mod opaque;
pub mod outline;
pub mod output_write;
pub mod pipeline;
pub mod random;
pub mod reduce;
pub mod rename;
pub mod rewrite;
pub mod scope;
pub mod split_loop;
pub mod statements;
pub mod strip;
pub mod structify;
pub mod structs;
pub mod switchify;
pub mod transformation;
pub mod vectorize;
pub mod wrap;

pub use donate::Donor;
pub use error::Error;
pub use generate::{
    analyze_shader, generate_family, generate_variant, generate_variant_with_donors,
    prepare_reference, transform_shader, Family, FamilyOptions, GeneratorOptions,
};
pub use job::{Shader, ShaderJob, STAGE_EXTENSIONS};
pub use macros::{emit, expand_macros, parse_shader};
pub use pipeline::PipelineInfo;
pub use random::Random;
pub use rglsl_ast::{ast, parse, print, ParseError, ParseErrorKind, TranslationUnit};
pub use transformation::{EnabledTransformations, Probabilities, Transformation};
