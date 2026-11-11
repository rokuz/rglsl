/*!
The backend: exports shader [`Module`](super::Module)s as SPIR-V.
*/

use alloc::string::String;

#[cfg(spv_out)]
pub mod pipeline_constants;
#[cfg(spv_out)]
pub mod spv;

pub use nt::TaskDispatchLimits;

/// Specifies the values of pipeline-overridable constants in the shader module.
///
/// If an `@id` attribute was specified on the declaration,
/// the key must be the pipeline constant ID as a decimal ASCII number; if not,
/// the key must be the constant's identifier name.
///
/// The value may represent any of WGSL's concrete scalar types.
pub type PipelineConstants = hashbrown::HashMap<String, f64>;

impl crate::TypeInner {
    /// Returns true if a variable of this type is a handle.
    pub const fn is_handle(&self) -> bool {
        match *self {
            Self::Image { .. }
            | Self::SampledImage { .. }
            | Self::Sampler { .. }
            | Self::AccelerationStructure { .. }
            | Self::Tensor { .. } => true,
            _ => false,
        }
    }
}

impl crate::Statement {
    /// Returns true if the statement directly terminates the current block.
    ///
    /// Used to decide whether case blocks require a explicit `break`.
    pub const fn is_terminator(&self) -> bool {
        match *self {
            crate::Statement::Break
            | crate::Statement::Continue
            | crate::Statement::Return { .. }
            | crate::Statement::Kill => true,
            crate::Statement::RayPipelineFunction(ref function) => function.is_terminator(),
            _ => false,
        }
    }
}
