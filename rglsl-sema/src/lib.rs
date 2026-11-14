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

macro_rules! index_id {
    ($name:ident) => {
        #[derive(Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
        pub struct $name(core::num::NonZeroU32);

        impl $name {
            pub(crate) const fn new(index: u32) -> Option<Self> {
                match index.checked_add(1) {
                    Some(raw) => match core::num::NonZeroU32::new(raw) {
                        Some(raw) => Some(Self(raw)),
                        None => None,
                    },
                    None => None,
                }
            }

            pub const fn index(self) -> u32 {
                self.0.get() - 1
            }
        }

        impl core::fmt::Debug for $name {
            fn fmt(&self, formatter: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
                formatter
                    .debug_tuple(stringify!($name))
                    .field(&self.index())
                    .finish()
            }
        }
    };
}

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
    Analysis, Callee, CooperativeCall, DerivativeGroup, ExpressionInfo, FragmentLayout, Interlock,
    MatrixCall, Options, QcomConversion, StageDiagnostic, TensorArmCall, TensorCall, analyze,
    analyze_library, analyze_with_builtins, analyze_with_tables, layout_stages,
};
pub use builtins::{
    BuiltinFunctionId, BuiltinTables, Builtins, FreshTables, ResourceLimits, StageTables,
};
pub use diagnostic::{Diagnostic, DiagnosticKind};
pub use rglsl_ast::extensions;
pub use scope::{FunctionControl, FunctionId, SymbolId};
pub use types::{NumericFeatures, Type, TypeKind, TypeRegistry};
