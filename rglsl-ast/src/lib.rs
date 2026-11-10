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
mod error;
pub mod keywords;
mod lexer;
mod parser;
mod printer;
mod span;

#[cfg(test)]
mod tests;

pub use ast::TranslationUnit;
pub use error::{ParseError, ParseErrorKind};
pub use parser::{parse, MAX_EXPRESSION_HEIGHT, MAX_NESTING_DEPTH};
pub use printer::print;
pub use span::{line_column, LineColumn, Span};
