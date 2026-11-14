use spirv::{Capability as C, Word};

use super::{Error, Writer, grammar};

#[derive(Clone, Copy, Debug)]
pub(super) struct Feature {
    pub what: &'static str,
    pub capabilities: &'static [C],
    pub numbered_capabilities: &'static [Word],
    pub extensions: &'static [&'static str],
    pub core_since: Option<(u8, u8)>,
    pub min_version: Option<(u8, u8)>,
}

impl Feature {
    const NONE: Self = Self {
        what: "",
        capabilities: &[],
        numbered_capabilities: &[],
        extensions: &[],
        core_since: None,
        min_version: None,
    };
}

impl Writer {
    pub(super) fn require(&mut self, feature: &Feature) -> Result<(), Error> {
        if let Some((major, minor)) = feature.min_version
            && self.lang_version() < (major, minor)
        {
            return Err(Error::SpirvVersionTooLow(major, minor));
        }
        for &capability in feature.capabilities {
            self.require_any(feature.what, &[capability])?;
        }
        self.use_feature(feature);
        Ok(())
    }

    pub(super) fn try_require(&mut self, feature: &Feature) -> bool {
        let available = self.require_all(feature.capabilities).is_ok();
        if available {
            self.use_feature(feature);
        }
        available
    }

    pub(super) fn use_feature(&mut self, feature: &Feature) {
        for &capability in feature.capabilities {
            self.capabilities_used.insert(capability);
        }
        for &capability in feature.numbered_capabilities {
            self.raw_capabilities.insert(capability);
        }
        if feature
            .core_since
            .is_none_or(|version| self.lang_version() < version)
        {
            for &extension in feature.extensions {
                self.extensions_used.insert(extension);
            }
        }
    }
}

pub(super) const AMD_GCN_SHADER_SET: &str = "SPV_AMD_gcn_shader";
pub(super) const AMD_SHADER_BALLOT_SET: &str = "SPV_AMD_shader_ballot";
pub(super) const AMD_SHADER_EXPLICIT_VERTEX_PARAMETER_SET: &str =
    "SPV_AMD_shader_explicit_vertex_parameter";
pub(super) const AMD_SHADER_TRINARY_MINMAX_SET: &str = "SPV_AMD_shader_trinary_minmax";
pub(super) const KHR_STORAGE_BUFFER_STORAGE_CLASS: &str = "SPV_KHR_storage_buffer_storage_class";

macro_rules! features {
    ($($name:ident { $($field:ident: $value:expr),* $(,)? })*) => {
        $(pub(super) const $name: Feature = Feature { $($field: $value,)* ..Feature::NONE };)*
    };
}

features! {
    VULKAN_MEMORY_MODEL {
        capabilities: &[C::VulkanMemoryModel],
        extensions: &["SPV_KHR_vulkan_memory_model"],
        core_since: Some((1, 5)),
    }
    PHYSICAL_STORAGE_BUFFER {
        capabilities: &[C::PhysicalStorageBufferAddresses],
        extensions: &["SPV_KHR_physical_storage_buffer"],
        core_since: Some((1, 5)),
    }
    STORAGE_BUFFER_STORAGE_CLASS {
        extensions: &[KHR_STORAGE_BUFFER_STORAGE_CLASS],
        core_since: Some((1, 3)),
    }
    STORAGE_16BIT {
        extensions: &["SPV_KHR_16bit_storage"],
        core_since: Some((1, 3)),
    }
    STORAGE_8BIT {
        extensions: &["SPV_KHR_8bit_storage"],
        core_since: Some((1, 5)),
    }
    FLOAT16_WITH_STORAGE {
        what: "16 bit floating-point",
        capabilities: &[C::Float16],
        extensions: &["SPV_KHR_16bit_storage"],
    }
    INT16_WITH_STORAGE {
        what: "16 bit integer",
        capabilities: &[C::Int16],
        extensions: &["SPV_KHR_16bit_storage"],
    }
    BFLOAT16_TYPE {
        capabilities: &[C::BFloat16TypeKHR],
        extensions: &["SPV_KHR_bfloat16"],
    }
    FLOAT8_TYPE {
        capabilities: &[C::Float8EXT],
        extensions: &["SPV_EXT_float8"],
    }
    FLOAT4_TYPE {
        numbered_capabilities: &[grammar::capability::Float4EXT],
        extensions: &["SPV_EXT_ocp_microscaling_types"],
    }
    FLOAT6_TYPE {
        numbered_capabilities: &[grammar::capability::Float6EXT],
        extensions: &["SPV_EXT_ocp_microscaling_types"],
    }
    FLOAT8_UNSIGNED_E8M0_TYPE {
        numbered_capabilities: &[grammar::capability::Float8UnsignedE8M0EXT],
        extensions: &["SPV_EXT_ocp_microscaling_types"],
    }
    MXINT8_TYPE {
        numbered_capabilities: &[grammar::capability::MXInt8EXT],
        extensions: &["SPV_EXT_ocp_microscaling_types"],
    }
    BITCAST_EXTRACT {
        numbered_capabilities: &[grammar::capability::BitcastExtractEXT],
        extensions: &["SPV_EXT_ocp_microscaling_types"],
    }
    LONG_VECTOR {
        what: "long vector",
        capabilities: &[C::LongVectorEXT],
        extensions: &["SPV_EXT_long_vector"],
    }
    IMAGE_INT64 {
        what: "64-bit integer storage image format",
        capabilities: &[C::Int64ImageEXT],
        extensions: &["SPV_EXT_shader_image_int64"],
    }
    REPLICATED_COMPOSITES {
        what: "replicated composites",
        capabilities: &[C::ReplicatedCompositesEXT],
        extensions: &["SPV_EXT_replicated_composites"],
    }
    DESCRIPTOR_INDEXING {
        extensions: &["SPV_EXT_descriptor_indexing"],
        core_since: Some((1, 5)),
    }
    DESCRIPTOR_HEAP {
        what: "descriptor heaps",
        capabilities: &[C::UntypedPointersKHR, C::DescriptorHeapEXT],
        extensions: &["SPV_EXT_descriptor_heap", "SPV_KHR_untyped_pointers"],
    }
    NON_UNIFORM_DESCRIPTOR_HEAP {
        what: "NonUniform",
        capabilities: &[C::DescriptorHeapEXT],
        extensions: &["SPV_EXT_descriptor_heap"],
    }
    PUSH_CONSTANT_BANKS {
        what: "push constant banks",
        capabilities: &[C::PushConstantBanksNV],
        extensions: &["SPV_NV_push_constant_bank"],
    }
    NON_SEMANTIC_INFO {
        extensions: &["SPV_KHR_non_semantic_info"],
    }
    RELAXED_EXTENDED_INSTRUCTION {
        extensions: &["SPV_KHR_relaxed_extended_instruction"],
    }
    ABORT {
        capabilities: &[C::Int8],
        numbered_capabilities: &[
            grammar::capability::AbortKHR,
            grammar::capability::ConstantDataKHR,
        ],
        extensions: &["SPV_KHR_abort", "SPV_KHR_constant_data"],
    }
    EXPECT_ASSUME {
        what: "expect and assume",
        capabilities: &[C::ExpectAssumeKHR],
        extensions: &["SPV_KHR_expect_assume"],
    }
    SHADER_CLOCK {
        what: "clock reads",
        capabilities: &[C::ShaderClockKHR],
        extensions: &["SPV_KHR_shader_clock"],
    }
    INTEGER_FUNCTIONS_2 {
        what: "integer functions 2",
        capabilities: &[C::IntegerFunctions2INTEL],
        extensions: &["SPV_INTEL_shader_integer_functions2"],
    }
    DOT_PRODUCT_INPUT_4X8_BIT_PACKED {
        what: "integer dot product",
        capabilities: &[C::DotProduct, C::DotProductInput4x8BitPacked],
        extensions: &["SPV_KHR_integer_dot_product"],
        core_since: Some((1, 6)),
    }
    DOT_PRODUCT_INPUT_4X8_BIT {
        what: "integer dot product",
        capabilities: &[C::DotProduct, C::DotProductInput4x8Bit],
        extensions: &["SPV_KHR_integer_dot_product"],
        core_since: Some((1, 6)),
    }
    DOT_PRODUCT_INPUT_ALL {
        what: "integer dot product",
        capabilities: &[C::DotProduct, C::DotProductInputAll],
        extensions: &["SPV_KHR_integer_dot_product"],
        core_since: Some((1, 6)),
    }
    AMD_GPU_SHADER_HALF_FLOAT {
        extensions: &["SPV_AMD_gpu_shader_half_float"],
    }
    AMD_SHADER_EXPLICIT_VERTEX_PARAMETER {
        extensions: &[AMD_SHADER_EXPLICIT_VERTEX_PARAMETER_SET],
    }
    AMD_FRAGMENT_MASK {
        what: "fragment mask",
        capabilities: &[C::FragmentMaskAMD],
        extensions: &["SPV_AMD_shader_fragment_mask"],
    }
    AMD_SHADER_BALLOT {
        what: "group operation",
        capabilities: &[C::Groups],
        extensions: &[AMD_SHADER_BALLOT_SET],
    }
    AMD_TEXTURE_GATHER_BIAS_LOD {
        what: "gather with a level of detail or bias",
        capabilities: &[C::ImageGatherBiasLodAMD],
        extensions: &["SPV_AMD_texture_gather_bias_lod"],
    }
    AMD_STORAGE_IMAGE_LOD {
        what: "storage image access with a level of detail",
        capabilities: &[C::ImageReadWriteLodAMD],
        extensions: &["SPV_AMD_shader_image_load_store_lod"],
    }
    AMD_EARLY_AND_LATE_FRAGMENT_TESTS {
        extensions: &["SPV_AMD_shader_early_and_late_fragment_tests"],
    }

    ATOMIC_FLOAT16_ADD {
        what: "floating-point atomics",
        capabilities: &[C::AtomicFloat16AddEXT],
        extensions: &["SPV_EXT_shader_atomic_float_add", "SPV_EXT_shader_atomic_float16_add"],
    }
    ATOMIC_FLOAT32_ADD {
        what: "floating-point atomics",
        capabilities: &[C::AtomicFloat32AddEXT],
        extensions: &["SPV_EXT_shader_atomic_float_add"],
    }
    ATOMIC_FLOAT64_ADD {
        what: "floating-point atomics",
        capabilities: &[C::AtomicFloat64AddEXT],
        extensions: &["SPV_EXT_shader_atomic_float_add"],
    }
    ATOMIC_FLOAT16_MIN_MAX {
        what: "floating-point atomics",
        capabilities: &[C::AtomicFloat16MinMaxEXT],
        extensions: &["SPV_EXT_shader_atomic_float_min_max"],
    }
    ATOMIC_FLOAT32_MIN_MAX {
        what: "floating-point atomics",
        capabilities: &[C::AtomicFloat32MinMaxEXT],
        extensions: &["SPV_EXT_shader_atomic_float_min_max"],
    }
    ATOMIC_FLOAT64_MIN_MAX {
        what: "floating-point atomics",
        capabilities: &[C::AtomicFloat64MinMaxEXT],
        extensions: &["SPV_EXT_shader_atomic_float_min_max"],
    }
    ATOMIC_FLOAT16_VECTOR {
        what: "half-precision vector atomics",
        capabilities: &[C::AtomicFloat16VectorNV],
        extensions: &["SPV_NV_shader_atomic_fp16_vector"],
    }
    SPLIT_BARRIER {
        what: "split barriers",
        capabilities: &[C::SplitBarrierINTEL],
        extensions: &["SPV_EXT_split_barrier"],
    }

    SHADER_BALLOT {
        what: "shader ballot",
        capabilities: &[C::SubgroupBallotKHR],
        extensions: &["SPV_KHR_shader_ballot"],
    }
    SUBGROUP_VOTE {
        what: "subgroup vote",
        capabilities: &[C::SubgroupVoteKHR],
        extensions: &["SPV_KHR_subgroup_vote"],
    }
    SUBGROUP_ROTATE {
        what: "subgroup rotate",
        capabilities: &[C::GroupNonUniformRotateKHR],
        extensions: &["SPV_KHR_subgroup_rotate"],
    }
    SUBGROUP_PARTITIONED {
        what: "partitioned subgroup operation",
        capabilities: &[C::GroupNonUniformPartitionedNV],
        extensions: &["SPV_NV_shader_subgroup_partitioned"],
    }
    QUAD_CONTROL {
        what: "quad control",
        capabilities: &[C::QuadControlKHR],
        extensions: &["SPV_KHR_quad_control"],
    }
    SUBGROUP_UNIFORM_CONTROL_FLOW {
        extensions: &["SPV_KHR_subgroup_uniform_control_flow"],
    }
    MAXIMAL_RECONVERGENCE {
        extensions: &["SPV_KHR_maximal_reconvergence"],
    }

    DEMOTE_TO_HELPER_INVOCATION {
        what: "demote to helper invocation",
        capabilities: &[C::DemoteToHelperInvocation],
        extensions: &["SPV_EXT_demote_to_helper_invocation"],
    }
    POST_DEPTH_COVERAGE {
        what: "post_depth_coverage",
        capabilities: &[C::SampleMaskPostDepthCoverage],
        extensions: &["SPV_KHR_post_depth_coverage"],
    }
    TILE_IMAGE_COLOR_READ {
        what: "tile image reads",
        capabilities: &[C::TileImageColorReadAccessEXT],
        extensions: &["SPV_EXT_shader_tile_image"],
    }
    TILE_IMAGE_DEPTH_READ {
        what: "tile image reads",
        capabilities: &[C::TileImageDepthReadAccessEXT],
        extensions: &["SPV_EXT_shader_tile_image"],
    }
    TILE_IMAGE_STENCIL_READ {
        what: "tile image reads",
        capabilities: &[C::TileImageStencilReadAccessEXT],
        extensions: &["SPV_EXT_shader_tile_image"],
    }
    PIXEL_INTERLOCK {
        what: "fragment shader interlock",
        capabilities: &[C::FragmentShaderPixelInterlockEXT],
        extensions: &["SPV_EXT_fragment_shader_interlock"],
    }
    SAMPLE_INTERLOCK {
        what: "fragment shader interlock",
        capabilities: &[C::FragmentShaderSampleInterlockEXT],
        extensions: &["SPV_EXT_fragment_shader_interlock"],
    }
    SHADING_RATE_INTERLOCK {
        what: "fragment shader interlock",
        capabilities: &[C::FragmentShaderShadingRateInterlockEXT],
        extensions: &["SPV_EXT_fragment_shader_interlock"],
    }
    DERIVATIVE_GROUP_QUADS_KHR {
        what: "compute shader derivatives",
        capabilities: &[C::ComputeDerivativeGroupQuadsKHR],
        extensions: &["SPV_KHR_compute_shader_derivatives"],
    }
    DERIVATIVE_GROUP_LINEAR_KHR {
        what: "compute shader derivatives",
        capabilities: &[C::ComputeDerivativeGroupLinearKHR],
        extensions: &["SPV_KHR_compute_shader_derivatives"],
    }
    DERIVATIVE_GROUP_QUADS_NV {
        what: "compute shader derivatives",
        capabilities: &[C::ComputeDerivativeGroupQuadsKHR],
        extensions: &["SPV_NV_compute_shader_derivatives"],
    }
    DERIVATIVE_GROUP_LINEAR_NV {
        what: "compute shader derivatives",
        capabilities: &[C::ComputeDerivativeGroupLinearKHR],
        extensions: &["SPV_NV_compute_shader_derivatives"],
    }
    SHADER_64BIT_INDEXING {
        what: "64-bit indexing",
        capabilities: &[C::Shader64BitIndexingEXT],
        extensions: &["SPV_EXT_shader_64bit_indexing"],
    }
    MESH_SHADING_NV {
        what: "NV mesh shaders",
        capabilities: &[C::MeshShadingNV],
        extensions: &["SPV_NV_mesh_shader"],
    }
    MESH_SHADING_EXT {
        what: "mesh shaders",
        capabilities: &[C::MeshShadingEXT],
        extensions: &["SPV_EXT_mesh_shader"],
        min_version: Some((1, 4)),
    }
    GEOMETRY_SHADER_PASSTHROUGH {
        what: "geometry shader passthrough",
        capabilities: &[C::GeometryShaderPassthroughNV],
        extensions: &["SPV_NV_geometry_shader_passthrough"],
    }
    SHADER_VIEWPORT_INDEX_LAYER {
        what: "`gl_Layer` or `gl_ViewportIndex` before rasterization",
        capabilities: &[C::ShaderViewportIndexLayerEXT],
        extensions: &["SPV_EXT_shader_viewport_index_layer"],
    }
    TILE_SHADING {
        what: "tile shading",
        capabilities: &[C::TileShadingQCOM],
        extensions: &["SPV_QCOM_tile_shading"],
    }

    MULTIVIEW {
        what: "`view_index` built-in",
        capabilities: &[C::MultiView],
        extensions: &["SPV_KHR_multiview"],
        core_since: Some((1, 3)),
    }
    DRAW_PARAMETERS {
        what: "draw parameter built-ins",
        capabilities: &[C::DrawParameters],
        extensions: &["SPV_KHR_shader_draw_parameters"],
        core_since: Some((1, 3)),
    }
    DEVICE_GROUP {
        what: "`gl_DeviceIndex`",
        capabilities: &[C::DeviceGroup],
        extensions: &["SPV_KHR_device_group"],
        core_since: Some((1, 3)),
    }
    VIEWPORT_MASK {
        what: "`gl_ViewportMask` or `viewport_relative`",
        capabilities: &[C::ShaderViewportMaskNV],
        extensions: &["SPV_NV_viewport_array2"],
    }
    STEREO_VIEW {
        what: "stereo view rendering",
        capabilities: &[C::ShaderStereoViewNV],
        extensions: &["SPV_NV_stereo_view_rendering"],
    }
    PER_VIEW_ATTRIBUTES {
        what: "per-view attribute built-ins",
        capabilities: &[C::PerViewAttributesNV],
        extensions: &["SPV_NVX_multiview_per_view_attributes"],
    }
    SAMPLE_MASK_OVERRIDE_COVERAGE {
        what: "`override_coverage`",
        capabilities: &[C::SampleMaskOverrideCoverageNV],
        extensions: &["SPV_NV_sample_mask_override_coverage"],
    }
    FRAGMENT_SHADING_RATE {
        what: "shading rate built-ins",
        capabilities: &[C::FragmentShadingRateKHR],
        extensions: &["SPV_KHR_fragment_shading_rate"],
    }
    FRAGMENT_DENSITY_EXT {
        what: "fragment density built-ins",
        capabilities: &[C::FragmentDensityEXT],
        extensions: &["SPV_EXT_fragment_invocation_density"],
    }
    FRAGMENT_DENSITY_NV {
        what: "fragment density built-ins",
        capabilities: &[C::FragmentDensityEXT],
        extensions: &["SPV_NV_shading_rate"],
    }
    FRAGMENT_FULLY_COVERED {
        what: "`gl_FragFullyCoveredNV`",
        capabilities: &[C::FragmentFullyCoveredEXT],
        extensions: &["SPV_EXT_fragment_fully_covered"],
    }
    STENCIL_EXPORT {
        what: "`gl_FragStencilRefARB`",
        capabilities: &[C::StencilExportEXT],
        extensions: &["SPV_EXT_shader_stencil_export"],
    }
    BARYCENTRICS_KHR {
        what: "fragment shader barycentrics",
        capabilities: &[C::FragmentBarycentricKHR],
        extensions: &["SPV_KHR_fragment_shader_barycentric"],
    }
    BARYCENTRICS_NV {
        what: "fragment shader barycentrics",
        capabilities: &[C::FragmentBarycentricKHR],
        extensions: &["SPV_NV_fragment_shader_barycentric"],
    }
    SHADER_SM_BUILTINS {
        what: "shader SM built-ins",
        capabilities: &[C::ShaderSMBuiltinsNV],
        extensions: &["SPV_NV_shader_sm_builtins"],
    }
    CORE_BUILTINS_ARM {
        what: "shader core built-ins",
        capabilities: &[C::CoreBuiltinsARM],
        extensions: &["SPV_ARM_core_builtins"],
    }

    RAY_QUERY {
        what: "ray queries",
        capabilities: &[C::RayQueryKHR],
        extensions: &["SPV_KHR_ray_query"],
    }
    RAY_TRACING_KHR {
        what: "ray tracing pipelines",
        capabilities: &[C::RayTracingKHR],
        extensions: &["SPV_KHR_ray_tracing"],
    }
    RAY_TRACING_NV {
        what: "ray tracing pipelines",
        capabilities: &[C::RayTracingNV],
        extensions: &["SPV_NV_ray_tracing"],
    }
    RAY_CULL_MASK {
        what: "ray cull mask",
        capabilities: &[C::RayCullMaskKHR],
        extensions: &["SPV_KHR_ray_cull_mask"],
    }
    RAY_TRACING_POSITION_FETCH {
        what: "ray tracing position fetch",
        capabilities: &[C::RayTracingPositionFetchKHR],
        extensions: &["SPV_KHR_ray_tracing_position_fetch"],
    }
    RAY_QUERY_POSITION_FETCH {
        what: "ray query vertex positions",
        capabilities: &[C::RayQueryPositionFetchKHR],
        extensions: &["SPV_KHR_ray_tracing_position_fetch"],
    }
    RAY_TRACING_MOTION_BLUR {
        what: "ray tracing motion blur",
        capabilities: &[C::RayTracingMotionBlurNV],
        extensions: &["SPV_NV_ray_tracing_motion_blur"],
    }
    OPACITY_MICROMAP {
        what: "opacity micromaps",
        capabilities: &[C::RayTracingOpacityMicromapEXT],
        extensions: &["SPV_EXT_opacity_micromap"],
    }
    OPACITY_MICROMAP_EXECUTION_MODE {
        numbered_capabilities: &[grammar::capability::RayTracingOpacityMicromapExecutionModeKHR],
        extensions: &["SPV_KHR_opacity_micromap"],
    }
    DISPLACEMENT_MICROMAP {
        what: "displacement micromaps",
        capabilities: &[C::RayTracingDisplacementMicromapNV],
        extensions: &["SPV_NV_displacement_micromap"],
    }
    DISPLACEMENT_MICROMAP_FETCH {
        what: "displacement micromap fetches",
        capabilities: &[C::DisplacementMicromapNV],
        extensions: &["SPV_NV_displacement_micromap"],
    }
    HIT_OBJECT_NV {
        what: "hit objects",
        capabilities: &[C::ShaderInvocationReorderNV],
        extensions: &["SPV_NV_shader_invocation_reorder"],
    }
    HIT_OBJECT_EXT {
        what: "hit objects",
        capabilities: &[C::ShaderInvocationReorderEXT],
        extensions: &["SPV_EXT_shader_invocation_reorder"],
    }
    CLUSTER_ACCELERATION_STRUCTURE {
        what: "cluster acceleration structures",
        capabilities: &[C::RayTracingClusterAccelerationStructureNV],
        extensions: &["SPV_NV_cluster_acceleration_structure"],
    }
    SPHERE_GEOMETRY {
        what: "sphere geometry",
        capabilities: &[C::RayTracingSpheresGeometryNV],
        extensions: &["SPV_NV_linear_swept_spheres"],
    }
    LSS_GEOMETRY {
        what: "linear swept sphere geometry",
        capabilities: &[C::RayTracingLinearSweptSpheresGeometryNV],
        extensions: &["SPV_NV_linear_swept_spheres"],
    }

    IMAGE_FOOTPRINT {
        what: "texture footprints",
        capabilities: &[C::ImageFootprintNV],
        extensions: &["SPV_NV_shader_image_footprint"],
    }
    IMAGE_GATHER_LINEAR_QCOM {
        numbered_capabilities: &[grammar::capability::ImageGatherLinearQCOM],
        extensions: &["SPV_QCOM_image_processing3"],
    }
    IMAGE_GATHER_EXTENDED_MODES_QCOM {
        numbered_capabilities: &[grammar::capability::ImageGatherExtendedModesQCOM],
        extensions: &["SPV_QCOM_image_processing3"],
    }
    TEXTURE_SAMPLE_WEIGHTED_QCOM {
        what: "image processing",
        capabilities: &[C::TextureSampleWeightedQCOM],
        extensions: &["SPV_QCOM_image_processing"],
    }
    TEXTURE_BOX_FILTER_QCOM {
        what: "image processing",
        capabilities: &[C::TextureBoxFilterQCOM],
        extensions: &["SPV_QCOM_image_processing"],
    }
    TEXTURE_BLOCK_MATCH_QCOM {
        what: "image processing",
        capabilities: &[C::TextureBlockMatchQCOM],
        extensions: &["SPV_QCOM_image_processing"],
    }
    TEXTURE_BLOCK_MATCH_2_QCOM {
        what: "image processing",
        capabilities: &[C::TextureBlockMatch2QCOM],
        extensions: &["SPV_QCOM_image_processing2"],
    }
    COOPERATIVE_MATRIX_CONVERSION_QCOM {
        what: "cooperative matrix conversion",
        capabilities: &[C::CooperativeMatrixConversionQCOM],
        extensions: &["SPV_QCOM_cooperative_matrix_conversion"],
    }

    COOPERATIVE_MATRIX_KHR {
        what: "cooperative matrix",
        capabilities: &[C::CooperativeMatrixKHR],
        extensions: &["SPV_KHR_cooperative_matrix"],
    }
    COOPERATIVE_MATRIX_NV {
        what: "cooperative matrix",
        capabilities: &[C::CooperativeMatrixNV],
        extensions: &["SPV_NV_cooperative_matrix"],
    }
    COOPERATIVE_MATRIX_LAYOUTS_ARM {
        what: "blocked interleaved cooperative matrix layouts",
        capabilities: &[C::CooperativeMatrixLayoutsARM],
        extensions: &["SPV_ARM_cooperative_matrix_layouts"],
    }
    COOPERATIVE_MATRIX_CONVERSIONS_EXT {
        numbered_capabilities: &[grammar::capability::CooperativeMatrixConversionsEXT],
        extensions: &["SPV_EXT_cooperative_matrix_maintenance1"],
    }
    COOPERATIVE_MATRIX_CONVERSIONS_NV {
        what: "cooperative matrix conversions",
        capabilities: &[C::CooperativeMatrixConversionsNV],
        extensions: &["SPV_NV_cooperative_matrix2"],
    }
    COOPERATIVE_MATRIX_REDUCTIONS_EXT {
        what: "cooperative matrix operation",
        capabilities: &[C::CooperativeMatrixReductionsNV],
        extensions: &["SPV_EXT_cooperative_matrix_maintenance1"],
    }
    COOPERATIVE_MATRIX_REDUCTIONS_NV {
        what: "cooperative matrix operation",
        capabilities: &[C::CooperativeMatrixReductionsNV],
        extensions: &["SPV_NV_cooperative_matrix2"],
    }
    COOPERATIVE_MATRIX_PER_ELEMENT_EXT {
        what: "cooperative matrix operation",
        capabilities: &[C::CooperativeMatrixPerElementOperationsNV],
        extensions: &["SPV_EXT_cooperative_matrix_maintenance1"],
    }
    COOPERATIVE_MATRIX_PER_ELEMENT_NV {
        what: "cooperative matrix operation",
        capabilities: &[C::CooperativeMatrixPerElementOperationsNV],
        extensions: &["SPV_NV_cooperative_matrix2"],
    }
    COOPERATIVE_MATRIX_GET_COORDINATE {
        numbered_capabilities: &[grammar::capability::CooperativeMatrixGetCoordinateEXT],
        extensions: &["SPV_EXT_cooperative_matrix_maintenance1"],
    }
    COOPERATIVE_MATRIX_TENSOR_ADDRESSING {
        what: "cooperative matrix tensor addressing",
        capabilities: &[C::CooperativeMatrixTensorAddressingNV],
        extensions: &["SPV_NV_cooperative_matrix2"],
    }
    COOPERATIVE_MATRIX_DECODE_VECTOR {
        numbered_capabilities: &[grammar::capability::CooperativeMatrixDecodeVectorNV],
        extensions: &["SPV_NV_cooperative_matrix_decode_vector"],
    }
    TENSOR_ADDRESSING {
        what: "tensor addressing",
        capabilities: &[C::TensorAddressingNV],
        extensions: &["SPV_NV_tensor_addressing"],
    }
    COOPERATIVE_VECTOR {
        what: "cooperative vector",
        capabilities: &[C::CooperativeVectorNV],
        extensions: &["SPV_NV_cooperative_vector"],
    }
    COOPERATIVE_VECTOR_TRAINING {
        what: "cooperative vector training",
        capabilities: &[C::CooperativeVectorTrainingNV],
        extensions: &["SPV_NV_cooperative_vector"],
    }
    TENSORS_ARM {
        what: "tensors",
        capabilities: &[C::TensorsARM],
        extensions: &["SPV_ARM_tensors"],
    }
}
