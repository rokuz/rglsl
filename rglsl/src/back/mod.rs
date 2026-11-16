/*!
The backend: exports shader [`Module`](super::Module)s as SPIR-V.
*/

use alloc::string::String;

pub mod pipeline_constants;
pub mod spv;

/// Specifies the values of pipeline-overridable constants in the shader module.
///
/// If an `@id` attribute was specified on the declaration,
/// the key must be the pipeline constant ID as a decimal ASCII number; if not,
/// the key must be the constant's identifier name.
///
/// The value may represent any of WGSL's concrete scalar types.
pub type PipelineConstants = hashbrown::HashMap<String, f64>;
