/*!
A Vulkan GLSL to SPIR-V compiler: a hard fork of naga.

# Example

The following example compiles a GLSL fragment shader to SPIR-V.

```
let glsl_source = "
#version 450
layout(location = 0) out vec4 color;
void main() {
    color = vec4(1.0);
}
";

// Parse the source into a Module.
let frontend = rglsl::front::glsl::Frontend::default();
let options = rglsl::front::glsl::Options::from(rglsl::ShaderStage::Fragment);
let module: rglsl::Module = frontend
    .parse(&options, glsl_source)
    .map_err(|errors| format!("{errors:?}"))?;

// Validate the module.
let module_info: rglsl::valid::ModuleInfo =
    rglsl::valid::Validator::new(rglsl::valid::ValidationFlags::all())
    .validate(&module)?;

// Translate the module.
let words: Vec<u32> = rglsl::back::spv::write_vec(
    &module,
    &module_info,
    &rglsl::back::spv::Options::default(),
    None,
)?;

// A SPIR-V module starts with the magic number.
assert_eq!(words[0], 0x0723_0203);

# Ok::<(), Box<dyn core::error::Error>>(())
```
*/

#![expect(
    clippy::needless_borrowed_reference,
    reason = "clippy::pattern_type_mismatch asks for these patterns"
)]
#![warn(
    trivial_casts,
    trivial_numeric_casts,
    unused_extern_crates,
    unused_qualifications,
    clippy::large_stack_frames,
    clippy::match_wildcard_for_single_variants,
    clippy::missing_const_for_fn,
    clippy::pattern_type_mismatch,
    clippy::rest_pat_in_fully_bound_structs,
    clippy::std_instead_of_alloc,
    clippy::std_instead_of_core,
    clippy::alloc_instead_of_core
)]
#![deny(clippy::exit)]
#![cfg_attr(
    not(test),
    warn(
        clippy::dbg_macro,
        clippy::panic,
        clippy::print_stderr,
        clippy::print_stdout,
        clippy::todo
    )
)]
#![no_std]
#![forbid(unsafe_code)]

#[cfg(any(test, feature = "arbitrary"))]
extern crate std;

extern crate alloc;

mod arena;
pub mod back;
pub(crate) mod common;
pub mod compact;
pub mod error;
pub mod front;
pub mod ir;
mod non_max_u32;
pub mod object;
pub mod proc;
mod span;
pub mod valid;

use alloc::string::String;

pub use crate::arena::{Arena, Handle, Range, UniqueArena};
pub use crate::span::{SourceLocation, Span, SpanContext, WithSpan};

pub use rglsl_types::{FastHashMap, FastHashSet, FastIndexMap, FastIndexSet};

// TODO: Eliminate this re-export and migrate uses of `crate::Foo` to `use crate::ir; ir::Foo`.
pub use ir::*;

/// Width of a boolean type, in bytes.
pub const BOOL_WIDTH: Bytes = 1;

/// Map of expressions that have associated variable names
pub(crate) type NamedExpressions = FastIndexMap<Handle<Expression>, String>;

#[cfg(test)]
type TestResult<T = ()> = Result<T, alloc::boxed::Box<dyn core::error::Error>>;

pub type NonUniformExpressions = FastIndexMap<Handle<Expression>, NonUniform>;

pub type PrecisionExpressions = FastIndexMap<Handle<Expression>, Precision>;
