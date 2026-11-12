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

pub mod analyze;
pub mod builtins;
pub mod constant;
pub mod diagnostic;
pub mod layout;
pub mod scope;
pub mod spirv;
pub mod types;

#[cfg(test)]
mod tests;

pub use analyze::{
    analyze, analyze_library, analyze_with_builtins, layout_stages, Analysis, Callee,
    CooperativeCall, DerivativeGroup, ExpressionInfo, FragmentLayout, Interlock, MatrixCall,
    Options, QcomConversion, StageDiagnostic, TensorArmCall, TensorCall,
};
pub use builtins::{
    BuiltinFunctionId, Builtins, ResourceLimits, Stage, StageTables, ALL_STAGE_BITS,
};
pub use diagnostic::{Diagnostic, DiagnosticKind};
pub use rglsl_ast::extensions;
pub use scope::{FunctionControl, FunctionId, SymbolId};
pub use types::{NumericFeatures, Type, TypeKind, TypeRegistry};
