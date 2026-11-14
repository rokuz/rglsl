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

impl crate::TypeInner {
    /// Returns true if a variable of this type is a handle.
    pub const fn is_handle(&self) -> bool {
        matches!(
            *self,
            Self::Image { .. }
                | Self::SampledImage { .. }
                | Self::Sampler { .. }
                | Self::AccelerationStructure { .. }
                | Self::Tensor { .. }
        )
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
            crate::Statement::Emit(_)
            | crate::Statement::Block(_)
            | crate::Statement::If { .. }
            | crate::Statement::Switch { .. }
            | crate::Statement::Loop { .. }
            | crate::Statement::Demote
            | crate::Statement::BeginInvocationInterlock
            | crate::Statement::EndInvocationInterlock
            | crate::Statement::EmitVertex { .. }
            | crate::Statement::EndPrimitive { .. }
            | crate::Statement::ControlBarrier(_)
            | crate::Statement::MemoryBarrier(_)
            | crate::Statement::ScopedBarrier { .. }
            | crate::Statement::SplitBarrier { .. }
            | crate::Statement::Store { .. }
            | crate::Statement::ImageStore { .. }
            | crate::Statement::Atomic { .. }
            | crate::Statement::AtomicLoad { .. }
            | crate::Statement::AtomicStore { .. }
            | crate::Statement::ImageAtomic { .. }
            | crate::Statement::Call { .. }
            | crate::Statement::RayQuery { .. }
            | crate::Statement::HitObject { .. }
            | crate::Statement::ReorderThread { .. }
            | crate::Statement::MeshFunction(_)
            | crate::Statement::SubgroupBallot { .. }
            | crate::Statement::SubgroupGather { .. }
            | crate::Statement::SubgroupCollectiveOperation { .. }
            | crate::Statement::SubgroupFunction { .. }
            | crate::Statement::CooperativeStore { .. }
            | crate::Statement::DebugPrintf { .. }
            | crate::Statement::Assume { .. }
            | crate::Statement::CooperativeVector(_)
            | crate::Statement::CooperativeMatrix { .. }
            | crate::Statement::Abort { .. }
            | crate::Statement::TensorWrite { .. }
            | crate::Statement::SpirvInstruction { .. } => false,
        }
    }
}
