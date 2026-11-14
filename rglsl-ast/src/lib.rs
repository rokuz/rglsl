#![no_std]
#![forbid(unsafe_code)]
#![warn(
    clippy::alloc_instead_of_core,
    clippy::std_instead_of_alloc,
    clippy::std_instead_of_core,
    clippy::missing_const_for_fn
)]
#![cfg_attr(
    not(test),
    warn(
        clippy::dbg_macro,
        clippy::expect_used,
        clippy::indexing_slicing,
        clippy::panic,
        clippy::print_stderr,
        clippy::print_stdout,
        clippy::todo,
        clippy::unwrap_used
    )
)]

extern crate alloc;

#[cfg(test)]
extern crate std;

pub mod ast;
mod chain;
mod deep;
mod error;
pub mod extensions;
pub mod keywords;
mod lexer;
pub mod opaque;
mod parser;
mod printer;
pub mod scalar;
mod span;
mod walk;

#[cfg(test)]
mod tests;

pub use ast::TranslationUnit;
pub use chain::{Chain, Spine, placeholder};
pub use error::{ParseError, ParseErrorKind};
pub use parser::{NON_UNIFORM, parse, parse_prefix};
pub use printer::print;
pub use rglsl_types::stack::Stalled;
pub use scalar::{NumericFeatures, Scalar};
pub use span::{LineColumn, Span, line_column};
pub use walk::{expressions, statement_expressions};
