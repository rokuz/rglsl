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

#[cfg(any(test, feature = "std"))]
extern crate std;

mod diagnostic;
mod directive;
mod expand;
mod expr;
#[cfg(feature = "std")]
mod fs;
mod include;
mod lexer;
mod options;
mod output;
mod predefined;
mod preprocessor;
mod source_map;
mod token;
mod version;

#[cfg(test)]
mod tests;

pub use diagnostic::{Diagnostic, DiagnosticKind, Location, Phase, Redefinition, Severity};
#[cfg(feature = "std")]
pub use fs::FileSystemIncluder;
pub use include::{
    FileId, IncludeError, IncludeKind, IncludedFile, Includer, MemoryIncluder, NoIncluder,
};
pub use options::{Define, Limits, Options, Stage};
pub use preprocessor::{preprocess, Preprocessed};
pub use source_map::{LineEntry, PresumedSource, SourceMap};
pub use version::{find_version, Profile, Version, VersionDirective};
