use spirv::{Capability, ExecutionModel};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Requirement {
    None,
    Feature(&'static str),
    Unsupported(&'static str),
}

pub fn capability(capability: Capability) -> Requirement {
    use Capability as C;
    use Requirement::{Feature, None, Unsupported};
    match capability {
        C::Matrix
        | C::Shader
        | C::Sampled1D
        | C::Image1D
        | C::SampledBuffer
        | C::ImageBuffer
        | C::ImageQuery
        | C::DerivativeControl
        | C::InterpolationFunction
        | C::StorageImageArrayDynamicIndexing
        | C::SampledImageArrayDynamicIndexing
        | C::UniformBufferArrayDynamicIndexing
        | C::StorageBufferArrayDynamicIndexing
        | C::StorageImageExtendedFormats
        | C::AtomicStorage => None,
        C::Float64 => Feature("shaderFloat64"),
        C::Int64 => Feature("shaderInt64"),
        C::Int16 => Feature("shaderInt16"),
        C::Float16 => Feature("Float16Int8Features.shaderFloat16"),
        C::Int8 => Feature("Float16Int8Features.shaderInt8"),
        C::StorageBuffer16BitAccess => Feature("Storage16BitFeatures.storageBuffer16BitAccess"),
        C::UniformAndStorageBuffer16BitAccess => {
            Feature("Storage16BitFeatures.uniformAndStorageBuffer16BitAccess")
        }
        C::StoragePushConstant16 => Feature("Storage16BitFeatures.storagePushConstant16"),
        C::StorageInputOutput16 => Feature("Storage16BitFeatures.storageInputOutput16"),
        C::StorageBuffer8BitAccess => Feature("Storage8BitFeatures.storageBuffer8BitAccess"),
        C::UniformAndStorageBuffer8BitAccess => {
            Feature("Storage8BitFeatures.uniformAndStorageBuffer8BitAccess")
        }
        C::StoragePushConstant8 => Feature("Storage8BitFeatures.storagePushConstant8"),
        C::Geometry => Feature("geometryShader"),
        C::Tessellation => Feature("tessellationShader"),
        C::GeometryPointSize | C::TessellationPointSize => {
            Feature("shaderTessellationAndGeometryPointSize")
        }
        C::ImageCubeArray | C::SampledCubeArray => Feature("imageCubeArray"),
        C::SampleRateShading => Feature("sampleRateShading"),
        C::ClipDistance => Feature("shaderClipDistance"),
        C::CullDistance => Feature("shaderCullDistance"),
        C::ImageGatherExtended => Feature("shaderImageGatherExtended"),
        C::StorageImageMultisample | C::ImageMSArray => Feature("shaderStorageImageMultisample"),
        C::StorageImageReadWithoutFormat => Feature("shaderStorageImageReadWithoutFormat"),
        C::StorageImageWriteWithoutFormat => Feature("shaderStorageImageWriteWithoutFormat"),
        C::MultiViewport => Feature("multiViewport"),
        C::MinLod => Feature("shaderResourceMinLod"),
        C::SparseResidency => Feature("shaderResourceResidency"),
        C::VariablePointers => Feature("VariablePointerFeatures.variablePointers"),
        C::VariablePointersStorageBuffer => {
            Feature("VariablePointerFeatures.variablePointersStorageBuffer")
        }
        C::VulkanMemoryModel => Feature("VulkanMemoryModelFeatures.vulkanMemoryModel"),
        C::VulkanMemoryModelDeviceScope => {
            Feature("VulkanMemoryModelFeatures.vulkanMemoryModelDeviceScope")
        }
        C::GroupNonUniform => Feature("SubgroupSupportedOperations.basic"),
        C::GroupNonUniformVote => Feature("SubgroupSupportedOperations.vote"),
        C::GroupNonUniformArithmetic => Feature("SubgroupSupportedOperations.arithmetic"),
        C::GroupNonUniformBallot => Feature("SubgroupSupportedOperations.ballot"),
        C::GroupNonUniformShuffle => Feature("SubgroupSupportedOperations.shuffle"),
        C::GroupNonUniformShuffleRelative => Feature("SubgroupSupportedOperations.shuffleRelative"),
        C::GroupNonUniformClustered => Feature("SubgroupSupportedOperations.clustered"),
        C::GroupNonUniformQuad => Feature("SubgroupSupportedOperations.quad"),
        C::DrawParameters => Unsupported("shader draw parameters"),
        C::DemoteToHelperInvocation => Unsupported("demote to helper invocation"),
        C::PhysicalStorageBufferAddresses => Unsupported("buffer device address"),
        C::RuntimeDescriptorArray
        | C::ShaderNonUniform
        | C::InputAttachmentArrayDynamicIndexing
        | C::UniformTexelBufferArrayDynamicIndexing
        | C::StorageTexelBufferArrayDynamicIndexing
        | C::UniformBufferArrayNonUniformIndexing
        | C::SampledImageArrayNonUniformIndexing
        | C::StorageBufferArrayNonUniformIndexing
        | C::StorageImageArrayNonUniformIndexing
        | C::InputAttachmentArrayNonUniformIndexing
        | C::UniformTexelBufferArrayNonUniformIndexing
        | C::StorageTexelBufferArrayNonUniformIndexing => Unsupported("descriptor indexing"),
        C::Int64Atomics | C::Int64ImageEXT => Unsupported("64-bit atomics"),
        C::AtomicFloat32AddEXT
        | C::AtomicFloat64AddEXT
        | C::AtomicFloat16AddEXT
        | C::AtomicFloat32MinMaxEXT
        | C::AtomicFloat64MinMaxEXT
        | C::AtomicFloat16MinMaxEXT => Unsupported("floating-point atomics"),
        C::SubgroupBallotKHR | C::SubgroupVoteKHR => Unsupported("pre-1.1 subgroup extensions"),
        C::MultiView => Unsupported("multiview"),
        C::InputAttachment => Unsupported("input attachments"),
        C::RayQueryKHR | C::RayTracingKHR | C::RayTraversalPrimitiveCullingKHR => {
            Unsupported("ray tracing")
        }
        C::MeshShadingEXT | C::MeshShadingNV => Unsupported("mesh shading"),
        C::CooperativeMatrixKHR | C::CooperativeMatrixNV => Unsupported("cooperative matrices"),
        _ => Unsupported("a capability the harness does not enable"),
    }
}

pub fn subgroup_stage(model: ExecutionModel) -> Option<&'static str> {
    match model {
        ExecutionModel::GLCompute => Some("SubgroupSupportedStages.compute"),
        ExecutionModel::Fragment => Some("SubgroupSupportedStages.fragment"),
        ExecutionModel::Vertex => Some("SubgroupSupportedStages.vertex"),
        _ => None,
    }
}

pub fn extension(name: &str) -> bool {
    matches!(
        name,
        "SPV_KHR_storage_buffer_storage_class"
            | "SPV_KHR_variable_pointers"
            | "SPV_KHR_16bit_storage"
            | "SPV_KHR_8bit_storage"
            | "SPV_KHR_vulkan_memory_model"
            | "SPV_KHR_non_semantic_info"
            | "SPV_KHR_terminate_invocation"
            | "SPV_KHR_shader_draw_parameters"
            | "SPV_KHR_physical_storage_buffer"
            | "SPV_KHR_float_controls"
            | "SPV_KHR_no_integer_wrap_decoration"
            | "SPV_EXT_demote_to_helper_invocation"
            | "SPV_GOOGLE_user_type"
            | "SPV_GOOGLE_hlsl_functionality1"
            | "SPV_GOOGLE_decorate_string"
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn maps_capabilities() {
        assert_eq!(capability(Capability::Shader), Requirement::None);
        assert_eq!(
            capability(Capability::Float64),
            Requirement::Feature("shaderFloat64")
        );
        assert!(matches!(
            capability(Capability::RayQueryKHR),
            Requirement::Unsupported(_)
        ));
        assert!(matches!(
            capability(Capability::GroupNonUniformPartitionedNV),
            Requirement::Unsupported(_)
        ));
        assert!(extension("SPV_KHR_16bit_storage"));
        assert!(!extension("SPV_EXT_shader_atomic_float_add"));
    }
}
