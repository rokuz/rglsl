use spirv::{Capability, ExecutionModel};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Need {
    Feature(&'static str),
    Extension(&'static str),
}

impl Need {
    pub const fn name(self) -> &'static str {
        match self {
            Self::Feature(name) | Self::Extension(name) => name,
        }
    }

    pub fn line(self) -> String {
        match self {
            Self::Feature(name) => format!("DEVICE_FEATURE {name}"),
            Self::Extension(name) => format!("DEVICE_EXTENSION {name}"),
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Requirement {
    Needs(&'static [Need]),
    Unsupported(&'static str),
}

const NONE: Requirement = Requirement::Needs(&[]);

macro_rules! needs {
    ($($need:expr),* $(,)?) => {
        Requirement::Needs(&[$($need),*])
    };
}

use Need::{Extension as E, Feature as F};

pub const RAY_TRACING: [Need; 3] = [
    F("RayTracingPipelineFeaturesKHR.rayTracingPipeline"),
    F("AccelerationStructureFeaturesKHR.accelerationStructure"),
    F("BufferDeviceAddressFeatures.bufferDeviceAddress"),
];

pub fn capability(capability: Capability) -> Requirement {
    use Capability as C;
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
        | C::AtomicStorage => NONE,
        C::Float64 => needs![F("shaderFloat64")],
        C::Int64 => needs![F("shaderInt64")],
        C::Int16 => needs![F("shaderInt16")],
        C::Float16 => needs![F("Float16Int8Features.shaderFloat16")],
        C::Int8 => needs![F("Float16Int8Features.shaderInt8")],
        C::StorageBuffer16BitAccess => needs![F("Storage16BitFeatures.storageBuffer16BitAccess")],
        C::UniformAndStorageBuffer16BitAccess => {
            needs![F("Storage16BitFeatures.uniformAndStorageBuffer16BitAccess")]
        }
        C::StoragePushConstant16 => needs![F("Storage16BitFeatures.storagePushConstant16")],
        C::StorageInputOutput16 => needs![F("Storage16BitFeatures.storageInputOutput16")],
        C::StorageBuffer8BitAccess => needs![F("Storage8BitFeatures.storageBuffer8BitAccess")],
        C::UniformAndStorageBuffer8BitAccess => {
            needs![F("Storage8BitFeatures.uniformAndStorageBuffer8BitAccess")]
        }
        C::StoragePushConstant8 => needs![F("Storage8BitFeatures.storagePushConstant8")],
        C::Geometry => needs![F("geometryShader")],
        C::Tessellation => needs![F("tessellationShader")],
        C::GeometryPointSize | C::TessellationPointSize => {
            needs![F("shaderTessellationAndGeometryPointSize")]
        }
        C::ImageCubeArray | C::SampledCubeArray => needs![F("imageCubeArray")],
        C::SampleRateShading => needs![F("sampleRateShading")],
        C::ClipDistance => needs![F("shaderClipDistance")],
        C::CullDistance => needs![F("shaderCullDistance")],
        C::ImageGatherExtended => needs![F("shaderImageGatherExtended")],
        C::StorageImageMultisample | C::ImageMSArray => {
            needs![F("shaderStorageImageMultisample")]
        }
        C::StorageImageReadWithoutFormat => needs![F("shaderStorageImageReadWithoutFormat")],
        C::StorageImageWriteWithoutFormat => needs![F("shaderStorageImageWriteWithoutFormat")],
        C::MultiViewport => needs![F("multiViewport")],
        C::MinLod => needs![F("shaderResourceMinLod")],
        C::SparseResidency => needs![F("shaderResourceResidency")],
        C::VariablePointers => needs![F("VariablePointerFeatures.variablePointers")],
        C::VariablePointersStorageBuffer => {
            needs![F("VariablePointerFeatures.variablePointersStorageBuffer")]
        }
        C::VulkanMemoryModel => needs![F("VulkanMemoryModelFeatures.vulkanMemoryModel")],
        C::VulkanMemoryModelDeviceScope => {
            needs![F("VulkanMemoryModelFeatures.vulkanMemoryModelDeviceScope")]
        }
        C::GroupNonUniform => needs![F("SubgroupSupportedOperations.basic")],
        C::GroupNonUniformVote => needs![F("SubgroupSupportedOperations.vote")],
        C::GroupNonUniformArithmetic => needs![F("SubgroupSupportedOperations.arithmetic")],
        C::GroupNonUniformBallot => needs![F("SubgroupSupportedOperations.ballot")],
        C::GroupNonUniformShuffle => needs![F("SubgroupSupportedOperations.shuffle")],
        C::GroupNonUniformShuffleRelative => {
            needs![F("SubgroupSupportedOperations.shuffleRelative")]
        }
        C::GroupNonUniformClustered => needs![F("SubgroupSupportedOperations.clustered")],
        C::GroupNonUniformQuad => needs![F("SubgroupSupportedOperations.quad")],
        C::DrawParameters => needs![E("VK_KHR_shader_draw_parameters")],
        C::CooperativeMatrixKHR => needs![F("CooperativeMatrixFeaturesKHR.cooperativeMatrix")],
        C::LongVectorEXT => needs![F("ShaderLongVectorFeaturesEXT.longVector")],
        C::RayTracingKHR => Requirement::Needs(&RAY_TRACING),
        C::DemoteToHelperInvocation => Requirement::Unsupported(
            "demote to helper invocation (Amber cannot enable shaderDemoteToHelperInvocation)",
        ),
        C::PhysicalStorageBufferAddresses => Requirement::Unsupported(
            "buffer device address (Amber cannot store a buffer's address in another buffer)",
        ),
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
        | C::StorageTexelBufferArrayNonUniformIndexing => Requirement::Unsupported(
            "descriptor indexing (Amber cannot enable the descriptor indexing features)",
        ),
        C::Int64Atomics | C::Int64ImageEXT => {
            Requirement::Unsupported("64-bit atomics (Amber cannot enable them)")
        }
        C::AtomicFloat32AddEXT
        | C::AtomicFloat64AddEXT
        | C::AtomicFloat16AddEXT
        | C::AtomicFloat32MinMaxEXT
        | C::AtomicFloat64MinMaxEXT
        | C::AtomicFloat16MinMaxEXT => {
            Requirement::Unsupported("floating-point atomics (Amber cannot enable them)")
        }
        C::SubgroupBallotKHR | C::SubgroupVoteKHR => {
            Requirement::Unsupported("pre-1.1 subgroup extensions")
        }
        C::MultiView => Requirement::Unsupported("multiview (Amber renders one view)"),
        C::InputAttachment => {
            Requirement::Unsupported("input attachments (Amber cannot bind them)")
        }
        C::RayTraversalPrimitiveCullingKHR => Requirement::Unsupported(
            "ray traversal primitive culling (Amber cannot enable rayTraversalPrimitiveCulling)",
        ),
        C::RayQueryKHR => {
            Requirement::Unsupported("ray queries (Amber cannot enable the rayQuery feature)")
        }
        C::MeshShadingEXT | C::MeshShadingNV => {
            Requirement::Unsupported("mesh shading (Amber has no mesh pipelines)")
        }
        C::CooperativeMatrixNV => {
            Requirement::Unsupported("NV cooperative matrices (Amber cannot enable them)")
        }
        _ => Requirement::Unsupported("a capability the harness does not enable"),
    }
}

pub fn subgroup_stage(model: ExecutionModel) -> Option<&'static str> {
    match model {
        ExecutionModel::GLCompute => Some("SubgroupSupportedStages.compute"),
        ExecutionModel::Fragment => Some("SubgroupSupportedStages.fragment"),
        ExecutionModel::Vertex => Some("SubgroupSupportedStages.vertex"),
        ExecutionModel::Geometry => Some("SubgroupSupportedStages.geometry"),
        ExecutionModel::TessellationControl => Some("SubgroupSupportedStages.tessellationControl"),
        ExecutionModel::TessellationEvaluation => {
            Some("SubgroupSupportedStages.tessellationEvaluation")
        }
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
            | "SPV_KHR_ray_tracing"
            | "SPV_KHR_cooperative_matrix"
            | "SPV_EXT_long_vector"
            | "SPV_EXT_demote_to_helper_invocation"
            | "SPV_GOOGLE_user_type"
            | "SPV_GOOGLE_hlsl_functionality1"
            | "SPV_GOOGLE_decorate_string"
    )
}

pub fn probes() -> Vec<Need> {
    let mut needs: Vec<Need> = Vec::new();
    for value in 0..u32::from(u16::MAX) {
        let Some(capability) = Capability::from_u32(value) else {
            continue;
        };
        if let Requirement::Needs(list) = self::capability(capability) {
            needs.extend_from_slice(list);
        }
    }
    for model in [
        ExecutionModel::GLCompute,
        ExecutionModel::Fragment,
        ExecutionModel::Vertex,
        ExecutionModel::Geometry,
        ExecutionModel::TessellationControl,
        ExecutionModel::TessellationEvaluation,
    ] {
        if let Some(stage) = subgroup_stage(model) {
            needs.push(F(stage));
        }
    }
    needs.extend([
        F("fragmentStoresAndAtomics"),
        F("vertexPipelineStoresAndAtomics"),
    ]);
    needs.sort();
    needs.dedup();
    needs
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn maps_capabilities() {
        assert_eq!(capability(Capability::Shader), Requirement::Needs(&[]));
        assert_eq!(
            capability(Capability::Float64),
            Requirement::Needs(&[Need::Feature("shaderFloat64")])
        );
        assert_eq!(
            capability(Capability::DrawParameters),
            Requirement::Needs(&[Need::Extension("VK_KHR_shader_draw_parameters")])
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

    #[test]
    fn probes_cover_every_feature_once() {
        let probes = probes();
        assert!(probes.contains(&Need::Feature("geometryShader")));
        assert!(probes.contains(&Need::Feature("SubgroupSupportedStages.geometry")));
        assert!(probes.contains(&Need::Extension("VK_KHR_shader_draw_parameters")));
        let mut sorted = probes.clone();
        sorted.dedup();
        assert_eq!(sorted.len(), probes.len());
        assert_eq!(
            Need::Extension("VK_X").line(),
            "DEVICE_EXTENSION VK_X".to_string()
        );
    }
}
