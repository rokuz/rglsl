use alloc::string::String;
use alloc::vec::Vec;

use crate::ast::ExtensionBehavior;

pub const KNOWN: [&str; 233] = [
    "GL_3DL_array_objects",
    "GL_AMD_gcn_shader",
    "GL_AMD_gpu_shader_half_float",
    "GL_AMD_gpu_shader_half_float_fetch",
    "GL_AMD_gpu_shader_int16",
    "GL_AMD_shader_ballot",
    "GL_AMD_shader_early_and_late_fragment_tests",
    "GL_AMD_shader_explicit_vertex_parameter",
    "GL_AMD_shader_fragment_mask",
    "GL_AMD_shader_image_load_store_lod",
    "GL_AMD_shader_trinary_minmax",
    "GL_AMD_texture_gather_bias_lod",
    "GL_ANDROID_extension_pack_es31a",
    "GL_ARB_bindless_texture",
    "GL_ARB_compute_shader",
    "GL_ARB_conservative_depth",
    "GL_ARB_cull_distance",
    "GL_ARB_derivative_control",
    "GL_ARB_draw_instanced",
    "GL_ARB_enhanced_layouts",
    "GL_ARB_explicit_attrib_location",
    "GL_ARB_explicit_uniform_location",
    "GL_ARB_fragment_coord_conventions",
    "GL_ARB_fragment_shader_interlock",
    "GL_ARB_gpu_shader5",
    "GL_ARB_gpu_shader_fp64",
    "GL_ARB_gpu_shader_int64",
    "GL_ARB_post_depth_coverage",
    "GL_ARB_sample_shading",
    "GL_ARB_separate_shader_objects",
    "GL_ARB_shader_atomic_counter_ops",
    "GL_ARB_shader_atomic_counters",
    "GL_ARB_shader_ballot",
    "GL_ARB_shader_bit_encoding",
    "GL_ARB_shader_clock",
    "GL_ARB_shader_draw_parameters",
    "GL_ARB_shader_group_vote",
    "GL_ARB_shader_image_load_store",
    "GL_ARB_shader_image_size",
    "GL_ARB_shader_stencil_export",
    "GL_ARB_shader_storage_buffer_object",
    "GL_ARB_shader_texture_image_samples",
    "GL_ARB_shader_texture_lod",
    "GL_ARB_shader_viewport_layer_array",
    "GL_ARB_shading_language_420pack",
    "GL_ARB_shading_language_include",
    "GL_ARB_shading_language_packing",
    "GL_ARB_sparse_texture2",
    "GL_ARB_sparse_texture_clamp",
    "GL_ARB_tessellation_shader",
    "GL_ARB_texture_cube_map_array",
    "GL_ARB_texture_gather",
    "GL_ARB_texture_multisample",
    "GL_ARB_texture_query_lod",
    "GL_ARB_texture_rectangle",
    "GL_ARB_uniform_buffer_object",
    "GL_ARB_vertex_attrib_64bit",
    "GL_ARB_viewport_array",
    "GL_ARM_shader_core_builtins",
    "GL_ARM_tensors",
    "GL_ARM_tensors_bfloat16",
    "GL_ARM_tensors_float_e4m3",
    "GL_ARM_tensors_float_e5m2",
    "GL_EXT_YUV_target",
    "GL_EXT_abort",
    "GL_EXT_bfloat16",
    "GL_EXT_blend_func_extended",
    "GL_EXT_buffer_reference",
    "GL_EXT_buffer_reference2",
    "GL_EXT_buffer_reference_uvec2",
    "GL_EXT_clip_cull_distance",
    "GL_EXT_conservative_depth",
    "GL_EXT_control_flow_attributes",
    "GL_EXT_control_flow_attributes2",
    "GL_EXT_cooperative_matrix_maintenance1",
    "GL_EXT_debug_printf",
    "GL_EXT_demote_to_helper_invocation",
    "GL_EXT_descriptor_heap",
    "GL_EXT_device_group",
    "GL_EXT_draw_instanced",
    "GL_EXT_expect_assume",
    "GL_EXT_float_e2m1",
    "GL_EXT_float_e2m3",
    "GL_EXT_float_e3m2",
    "GL_EXT_float_e4m3",
    "GL_EXT_float_e5m2",
    "GL_EXT_float_mxint8",
    "GL_EXT_float_ue8m0",
    "GL_EXT_frag_depth",
    "GL_EXT_fragment_invocation_density",
    "GL_EXT_fragment_shader_barycentric",
    "GL_EXT_fragment_shading_rate",
    "GL_EXT_function_control_attributes",
    "GL_EXT_geometry_point_size",
    "GL_EXT_geometry_shader",
    "GL_EXT_gpu_shader5",
    "GL_EXT_integer_dot_product",
    "GL_EXT_long_vector",
    "GL_EXT_maximal_reconvergence",
    "GL_EXT_mesh_shader",
    "GL_EXT_multiview",
    "GL_EXT_nontemporal_keyword",
    "GL_EXT_nonuniform_qualifier",
    "GL_EXT_null_initializer",
    "GL_EXT_opacity_micromap",
    "GL_EXT_opacity_micromap_ray_query_mode",
    "GL_EXT_optional_input_attachment_index",
    "GL_EXT_post_depth_coverage",
    "GL_EXT_primitive_bounding_box",
    "GL_EXT_ray_cull_mask",
    "GL_EXT_ray_flags_primitive_culling",
    "GL_EXT_ray_query",
    "GL_EXT_ray_tracing",
    "GL_EXT_ray_tracing_position_fetch",
    "GL_EXT_samplerless_texture_functions",
    "GL_EXT_scalar_block_layout",
    "GL_EXT_shader_16bit_storage",
    "GL_EXT_shader_64bit_indexing",
    "GL_EXT_shader_8bit_storage",
    "GL_EXT_shader_atomic_float",
    "GL_EXT_shader_atomic_float2",
    "GL_EXT_shader_atomic_int64",
    "GL_EXT_shader_explicit_arithmetic_types",
    "GL_EXT_shader_explicit_arithmetic_types_float16",
    "GL_EXT_shader_explicit_arithmetic_types_float32",
    "GL_EXT_shader_explicit_arithmetic_types_float64",
    "GL_EXT_shader_explicit_arithmetic_types_int16",
    "GL_EXT_shader_explicit_arithmetic_types_int32",
    "GL_EXT_shader_explicit_arithmetic_types_int64",
    "GL_EXT_shader_explicit_arithmetic_types_int8",
    "GL_EXT_shader_image_int64",
    "GL_EXT_shader_image_load_formatted",
    "GL_EXT_shader_implicit_conversions",
    "GL_EXT_shader_integer_mix",
    "GL_EXT_shader_invocation_reorder",
    "GL_EXT_shader_io_blocks",
    "GL_EXT_shader_non_constant_global_initializers",
    "GL_EXT_shader_quad_control",
    "GL_EXT_shader_realtime_clock",
    "GL_EXT_shader_subgroup_extended_types_float16",
    "GL_EXT_shader_subgroup_extended_types_int16",
    "GL_EXT_shader_subgroup_extended_types_int64",
    "GL_EXT_shader_subgroup_extended_types_int8",
    "GL_EXT_shader_texture_lod",
    "GL_EXT_shader_tile_image",
    "GL_EXT_shadow_samplers",
    "GL_EXT_shared_memory_block",
    "GL_EXT_spec_constant_composites",
    "GL_EXT_spirv_intrinsics",
    "GL_EXT_split_barrier",
    "GL_EXT_structured_descriptor_heap",
    "GL_EXT_subgroup_uniform_control_flow",
    "GL_EXT_terminate_invocation",
    "GL_EXT_tessellation_point_size",
    "GL_EXT_tessellation_shader",
    "GL_EXT_texture_array",
    "GL_EXT_texture_buffer",
    "GL_EXT_texture_cube_map_array",
    "GL_EXT_texture_offset_non_const",
    "GL_EXT_texture_shadow_lod",
    "GL_EXT_uniform_buffer_unsized_array",
    "GL_GOOGLE_cpp_style_line_directive",
    "GL_GOOGLE_include_directive",
    "GL_INTEL_shader_integer_functions2",
    "GL_KHR_blend_equation_advanced",
    "GL_KHR_compute_shader_derivatives",
    "GL_KHR_cooperative_matrix",
    "GL_KHR_memory_scope_semantics",
    "GL_KHR_shader_subgroup_arithmetic",
    "GL_KHR_shader_subgroup_ballot",
    "GL_KHR_shader_subgroup_basic",
    "GL_KHR_shader_subgroup_clustered",
    "GL_KHR_shader_subgroup_quad",
    "GL_KHR_shader_subgroup_rotate",
    "GL_KHR_shader_subgroup_shuffle",
    "GL_KHR_shader_subgroup_shuffle_relative",
    "GL_KHR_shader_subgroup_vote",
    "GL_NVX_multiview_per_view_attributes",
    "GL_NV_cluster_acceleration_structure",
    "GL_NV_compute_shader_derivatives",
    "GL_NV_conservative_raster_underestimation",
    "GL_NV_cooperative_matrix",
    "GL_NV_cooperative_matrix2",
    "GL_NV_cooperative_matrix_decode_vector",
    "GL_NV_cooperative_vector",
    "GL_NV_desktop_lowp_mediump",
    "GL_NV_displacement_micromap",
    "GL_NV_explicit_typecast",
    "GL_NV_fragment_shader_barycentric",
    "GL_NV_geometry_shader_passthrough",
    "GL_NV_gpu_shader5",
    "GL_NV_integer_cooperative_matrix",
    "GL_NV_linear_swept_spheres",
    "GL_NV_mesh_shader",
    "GL_NV_push_constant_bank",
    "GL_NV_ray_tracing",
    "GL_NV_ray_tracing_motion_blur",
    "GL_NV_sample_mask_override_coverage",
    "GL_NV_shader_atomic_fp16_vector",
    "GL_NV_shader_atomic_int64",
    "GL_NV_shader_invocation_reorder",
    "GL_NV_shader_noperspective_interpolation",
    "GL_NV_shader_sm_builtins",
    "GL_NV_shader_subgroup_partitioned",
    "GL_NV_shader_texture_footprint",
    "GL_NV_shading_rate_image",
    "GL_NV_stereo_view_rendering",
    "GL_NV_viewport_array2",
    "GL_OES_EGL_image_external",
    "GL_OES_EGL_image_external_essl3",
    "GL_OES_geometry_point_size",
    "GL_OES_geometry_shader",
    "GL_OES_gpu_shader5",
    "GL_OES_primitive_bounding_box",
    "GL_OES_sample_variables",
    "GL_OES_shader_image_atomic",
    "GL_OES_shader_io_blocks",
    "GL_OES_shader_multisample_interpolation",
    "GL_OES_standard_derivatives",
    "GL_OES_tessellation_point_size",
    "GL_OES_tessellation_shader",
    "GL_OES_texture_3D",
    "GL_OES_texture_buffer",
    "GL_OES_texture_cube_map_array",
    "GL_OES_texture_storage_multisample_2d_array",
    "GL_OVR_multiview",
    "GL_OVR_multiview2",
    "GL_QCOM_cooperative_matrix_conversion",
    "GL_QCOM_image_processing",
    "GL_QCOM_image_processing2",
    "GL_QCOM_image_processing3",
    "GL_QCOM_multiple_wait_queues",
    "GL_QCOM_tile_shading",
];

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
#[repr(u8)]
pub enum Extension {
    Gl3dlArrayObjects,
    AmdGcnShader,
    AmdGpuShaderHalfFloat,
    AmdGpuShaderHalfFloatFetch,
    AmdGpuShaderInt16,
    AmdShaderBallot,
    AmdShaderEarlyAndLateFragmentTests,
    AmdShaderExplicitVertexParameter,
    AmdShaderFragmentMask,
    AmdShaderImageLoadStoreLod,
    AmdShaderTrinaryMinmax,
    AmdTextureGatherBiasLod,
    AndroidExtensionPackEs31a,
    ArbBindlessTexture,
    ArbComputeShader,
    ArbConservativeDepth,
    ArbCullDistance,
    ArbDerivativeControl,
    ArbDrawInstanced,
    ArbEnhancedLayouts,
    ArbExplicitAttribLocation,
    ArbExplicitUniformLocation,
    ArbFragmentCoordConventions,
    ArbFragmentShaderInterlock,
    ArbGpuShader5,
    ArbGpuShaderFp64,
    ArbGpuShaderInt64,
    ArbPostDepthCoverage,
    ArbSampleShading,
    ArbSeparateShaderObjects,
    ArbShaderAtomicCounterOps,
    ArbShaderAtomicCounters,
    ArbShaderBallot,
    ArbShaderBitEncoding,
    ArbShaderClock,
    ArbShaderDrawParameters,
    ArbShaderGroupVote,
    ArbShaderImageLoadStore,
    ArbShaderImageSize,
    ArbShaderStencilExport,
    ArbShaderStorageBufferObject,
    ArbShaderTextureImageSamples,
    ArbShaderTextureLod,
    ArbShaderViewportLayerArray,
    ArbShadingLanguage420pack,
    ArbShadingLanguageInclude,
    ArbShadingLanguagePacking,
    ArbSparseTexture2,
    ArbSparseTextureClamp,
    ArbTessellationShader,
    ArbTextureCubeMapArray,
    ArbTextureGather,
    ArbTextureMultisample,
    ArbTextureQueryLod,
    ArbTextureRectangle,
    ArbUniformBufferObject,
    ArbVertexAttrib64bit,
    ArbViewportArray,
    ArmShaderCoreBuiltins,
    ArmTensors,
    ArmTensorsBfloat16,
    ArmTensorsFloatE4m3,
    ArmTensorsFloatE5m2,
    ExtYuvTarget,
    ExtAbort,
    ExtBfloat16,
    ExtBlendFuncExtended,
    ExtBufferReference,
    ExtBufferReference2,
    ExtBufferReferenceUvec2,
    ExtClipCullDistance,
    ExtConservativeDepth,
    ExtControlFlowAttributes,
    ExtControlFlowAttributes2,
    ExtCooperativeMatrixMaintenance1,
    ExtDebugPrintf,
    ExtDemoteToHelperInvocation,
    ExtDescriptorHeap,
    ExtDeviceGroup,
    ExtDrawInstanced,
    ExtExpectAssume,
    ExtFloatE2m1,
    ExtFloatE2m3,
    ExtFloatE3m2,
    ExtFloatE4m3,
    ExtFloatE5m2,
    ExtFloatMxint8,
    ExtFloatUe8m0,
    ExtFragDepth,
    ExtFragmentInvocationDensity,
    ExtFragmentShaderBarycentric,
    ExtFragmentShadingRate,
    ExtFunctionControlAttributes,
    ExtGeometryPointSize,
    ExtGeometryShader,
    ExtGpuShader5,
    ExtIntegerDotProduct,
    ExtLongVector,
    ExtMaximalReconvergence,
    ExtMeshShader,
    ExtMultiview,
    ExtNontemporalKeyword,
    ExtNonuniformQualifier,
    ExtNullInitializer,
    ExtOpacityMicromap,
    ExtOpacityMicromapRayQueryMode,
    ExtOptionalInputAttachmentIndex,
    ExtPostDepthCoverage,
    ExtPrimitiveBoundingBox,
    ExtRayCullMask,
    ExtRayFlagsPrimitiveCulling,
    ExtRayQuery,
    ExtRayTracing,
    ExtRayTracingPositionFetch,
    ExtSamplerlessTextureFunctions,
    ExtScalarBlockLayout,
    ExtShader16bitStorage,
    ExtShader64bitIndexing,
    ExtShader8bitStorage,
    ExtShaderAtomicFloat,
    ExtShaderAtomicFloat2,
    ExtShaderAtomicInt64,
    ExtShaderExplicitArithmeticTypes,
    ExtShaderExplicitArithmeticTypesFloat16,
    ExtShaderExplicitArithmeticTypesFloat32,
    ExtShaderExplicitArithmeticTypesFloat64,
    ExtShaderExplicitArithmeticTypesInt16,
    ExtShaderExplicitArithmeticTypesInt32,
    ExtShaderExplicitArithmeticTypesInt64,
    ExtShaderExplicitArithmeticTypesInt8,
    ExtShaderImageInt64,
    ExtShaderImageLoadFormatted,
    ExtShaderImplicitConversions,
    ExtShaderIntegerMix,
    ExtShaderInvocationReorder,
    ExtShaderIoBlocks,
    ExtShaderNonConstantGlobalInitializers,
    ExtShaderQuadControl,
    ExtShaderRealtimeClock,
    ExtShaderSubgroupExtendedTypesFloat16,
    ExtShaderSubgroupExtendedTypesInt16,
    ExtShaderSubgroupExtendedTypesInt64,
    ExtShaderSubgroupExtendedTypesInt8,
    ExtShaderTextureLod,
    ExtShaderTileImage,
    ExtShadowSamplers,
    ExtSharedMemoryBlock,
    ExtSpecConstantComposites,
    ExtSpirvIntrinsics,
    ExtSplitBarrier,
    ExtStructuredDescriptorHeap,
    ExtSubgroupUniformControlFlow,
    ExtTerminateInvocation,
    ExtTessellationPointSize,
    ExtTessellationShader,
    ExtTextureArray,
    ExtTextureBuffer,
    ExtTextureCubeMapArray,
    ExtTextureOffsetNonConst,
    ExtTextureShadowLod,
    ExtUniformBufferUnsizedArray,
    GoogleCppStyleLineDirective,
    GoogleIncludeDirective,
    IntelShaderIntegerFunctions2,
    KhrBlendEquationAdvanced,
    KhrComputeShaderDerivatives,
    KhrCooperativeMatrix,
    KhrMemoryScopeSemantics,
    KhrShaderSubgroupArithmetic,
    KhrShaderSubgroupBallot,
    KhrShaderSubgroupBasic,
    KhrShaderSubgroupClustered,
    KhrShaderSubgroupQuad,
    KhrShaderSubgroupRotate,
    KhrShaderSubgroupShuffle,
    KhrShaderSubgroupShuffleRelative,
    KhrShaderSubgroupVote,
    NvxMultiviewPerViewAttributes,
    NvClusterAccelerationStructure,
    NvComputeShaderDerivatives,
    NvConservativeRasterUnderestimation,
    NvCooperativeMatrix,
    NvCooperativeMatrix2,
    NvCooperativeMatrixDecodeVector,
    NvCooperativeVector,
    NvDesktopLowpMediump,
    NvDisplacementMicromap,
    NvExplicitTypecast,
    NvFragmentShaderBarycentric,
    NvGeometryShaderPassthrough,
    NvGpuShader5,
    NvIntegerCooperativeMatrix,
    NvLinearSweptSpheres,
    NvMeshShader,
    NvPushConstantBank,
    NvRayTracing,
    NvRayTracingMotionBlur,
    NvSampleMaskOverrideCoverage,
    NvShaderAtomicFp16Vector,
    NvShaderAtomicInt64,
    NvShaderInvocationReorder,
    NvShaderNoperspectiveInterpolation,
    NvShaderSmBuiltins,
    NvShaderSubgroupPartitioned,
    NvShaderTextureFootprint,
    NvShadingRateImage,
    NvStereoViewRendering,
    NvViewportArray2,
    OesEglImageExternal,
    OesEglImageExternalEssl3,
    OesGeometryPointSize,
    OesGeometryShader,
    OesGpuShader5,
    OesPrimitiveBoundingBox,
    OesSampleVariables,
    OesShaderImageAtomic,
    OesShaderIoBlocks,
    OesShaderMultisampleInterpolation,
    OesStandardDerivatives,
    OesTessellationPointSize,
    OesTessellationShader,
    OesTexture3d,
    OesTextureBuffer,
    OesTextureCubeMapArray,
    OesTextureStorageMultisample2dArray,
    OvrMultiview,
    OvrMultiview2,
    QcomCooperativeMatrixConversion,
    QcomImageProcessing,
    QcomImageProcessing2,
    QcomImageProcessing3,
    QcomMultipleWaitQueues,
    QcomTileShading,
}

impl Extension {
    pub const ALL: [Self; 233] = [
        Self::Gl3dlArrayObjects,
        Self::AmdGcnShader,
        Self::AmdGpuShaderHalfFloat,
        Self::AmdGpuShaderHalfFloatFetch,
        Self::AmdGpuShaderInt16,
        Self::AmdShaderBallot,
        Self::AmdShaderEarlyAndLateFragmentTests,
        Self::AmdShaderExplicitVertexParameter,
        Self::AmdShaderFragmentMask,
        Self::AmdShaderImageLoadStoreLod,
        Self::AmdShaderTrinaryMinmax,
        Self::AmdTextureGatherBiasLod,
        Self::AndroidExtensionPackEs31a,
        Self::ArbBindlessTexture,
        Self::ArbComputeShader,
        Self::ArbConservativeDepth,
        Self::ArbCullDistance,
        Self::ArbDerivativeControl,
        Self::ArbDrawInstanced,
        Self::ArbEnhancedLayouts,
        Self::ArbExplicitAttribLocation,
        Self::ArbExplicitUniformLocation,
        Self::ArbFragmentCoordConventions,
        Self::ArbFragmentShaderInterlock,
        Self::ArbGpuShader5,
        Self::ArbGpuShaderFp64,
        Self::ArbGpuShaderInt64,
        Self::ArbPostDepthCoverage,
        Self::ArbSampleShading,
        Self::ArbSeparateShaderObjects,
        Self::ArbShaderAtomicCounterOps,
        Self::ArbShaderAtomicCounters,
        Self::ArbShaderBallot,
        Self::ArbShaderBitEncoding,
        Self::ArbShaderClock,
        Self::ArbShaderDrawParameters,
        Self::ArbShaderGroupVote,
        Self::ArbShaderImageLoadStore,
        Self::ArbShaderImageSize,
        Self::ArbShaderStencilExport,
        Self::ArbShaderStorageBufferObject,
        Self::ArbShaderTextureImageSamples,
        Self::ArbShaderTextureLod,
        Self::ArbShaderViewportLayerArray,
        Self::ArbShadingLanguage420pack,
        Self::ArbShadingLanguageInclude,
        Self::ArbShadingLanguagePacking,
        Self::ArbSparseTexture2,
        Self::ArbSparseTextureClamp,
        Self::ArbTessellationShader,
        Self::ArbTextureCubeMapArray,
        Self::ArbTextureGather,
        Self::ArbTextureMultisample,
        Self::ArbTextureQueryLod,
        Self::ArbTextureRectangle,
        Self::ArbUniformBufferObject,
        Self::ArbVertexAttrib64bit,
        Self::ArbViewportArray,
        Self::ArmShaderCoreBuiltins,
        Self::ArmTensors,
        Self::ArmTensorsBfloat16,
        Self::ArmTensorsFloatE4m3,
        Self::ArmTensorsFloatE5m2,
        Self::ExtYuvTarget,
        Self::ExtAbort,
        Self::ExtBfloat16,
        Self::ExtBlendFuncExtended,
        Self::ExtBufferReference,
        Self::ExtBufferReference2,
        Self::ExtBufferReferenceUvec2,
        Self::ExtClipCullDistance,
        Self::ExtConservativeDepth,
        Self::ExtControlFlowAttributes,
        Self::ExtControlFlowAttributes2,
        Self::ExtCooperativeMatrixMaintenance1,
        Self::ExtDebugPrintf,
        Self::ExtDemoteToHelperInvocation,
        Self::ExtDescriptorHeap,
        Self::ExtDeviceGroup,
        Self::ExtDrawInstanced,
        Self::ExtExpectAssume,
        Self::ExtFloatE2m1,
        Self::ExtFloatE2m3,
        Self::ExtFloatE3m2,
        Self::ExtFloatE4m3,
        Self::ExtFloatE5m2,
        Self::ExtFloatMxint8,
        Self::ExtFloatUe8m0,
        Self::ExtFragDepth,
        Self::ExtFragmentInvocationDensity,
        Self::ExtFragmentShaderBarycentric,
        Self::ExtFragmentShadingRate,
        Self::ExtFunctionControlAttributes,
        Self::ExtGeometryPointSize,
        Self::ExtGeometryShader,
        Self::ExtGpuShader5,
        Self::ExtIntegerDotProduct,
        Self::ExtLongVector,
        Self::ExtMaximalReconvergence,
        Self::ExtMeshShader,
        Self::ExtMultiview,
        Self::ExtNontemporalKeyword,
        Self::ExtNonuniformQualifier,
        Self::ExtNullInitializer,
        Self::ExtOpacityMicromap,
        Self::ExtOpacityMicromapRayQueryMode,
        Self::ExtOptionalInputAttachmentIndex,
        Self::ExtPostDepthCoverage,
        Self::ExtPrimitiveBoundingBox,
        Self::ExtRayCullMask,
        Self::ExtRayFlagsPrimitiveCulling,
        Self::ExtRayQuery,
        Self::ExtRayTracing,
        Self::ExtRayTracingPositionFetch,
        Self::ExtSamplerlessTextureFunctions,
        Self::ExtScalarBlockLayout,
        Self::ExtShader16bitStorage,
        Self::ExtShader64bitIndexing,
        Self::ExtShader8bitStorage,
        Self::ExtShaderAtomicFloat,
        Self::ExtShaderAtomicFloat2,
        Self::ExtShaderAtomicInt64,
        Self::ExtShaderExplicitArithmeticTypes,
        Self::ExtShaderExplicitArithmeticTypesFloat16,
        Self::ExtShaderExplicitArithmeticTypesFloat32,
        Self::ExtShaderExplicitArithmeticTypesFloat64,
        Self::ExtShaderExplicitArithmeticTypesInt16,
        Self::ExtShaderExplicitArithmeticTypesInt32,
        Self::ExtShaderExplicitArithmeticTypesInt64,
        Self::ExtShaderExplicitArithmeticTypesInt8,
        Self::ExtShaderImageInt64,
        Self::ExtShaderImageLoadFormatted,
        Self::ExtShaderImplicitConversions,
        Self::ExtShaderIntegerMix,
        Self::ExtShaderInvocationReorder,
        Self::ExtShaderIoBlocks,
        Self::ExtShaderNonConstantGlobalInitializers,
        Self::ExtShaderQuadControl,
        Self::ExtShaderRealtimeClock,
        Self::ExtShaderSubgroupExtendedTypesFloat16,
        Self::ExtShaderSubgroupExtendedTypesInt16,
        Self::ExtShaderSubgroupExtendedTypesInt64,
        Self::ExtShaderSubgroupExtendedTypesInt8,
        Self::ExtShaderTextureLod,
        Self::ExtShaderTileImage,
        Self::ExtShadowSamplers,
        Self::ExtSharedMemoryBlock,
        Self::ExtSpecConstantComposites,
        Self::ExtSpirvIntrinsics,
        Self::ExtSplitBarrier,
        Self::ExtStructuredDescriptorHeap,
        Self::ExtSubgroupUniformControlFlow,
        Self::ExtTerminateInvocation,
        Self::ExtTessellationPointSize,
        Self::ExtTessellationShader,
        Self::ExtTextureArray,
        Self::ExtTextureBuffer,
        Self::ExtTextureCubeMapArray,
        Self::ExtTextureOffsetNonConst,
        Self::ExtTextureShadowLod,
        Self::ExtUniformBufferUnsizedArray,
        Self::GoogleCppStyleLineDirective,
        Self::GoogleIncludeDirective,
        Self::IntelShaderIntegerFunctions2,
        Self::KhrBlendEquationAdvanced,
        Self::KhrComputeShaderDerivatives,
        Self::KhrCooperativeMatrix,
        Self::KhrMemoryScopeSemantics,
        Self::KhrShaderSubgroupArithmetic,
        Self::KhrShaderSubgroupBallot,
        Self::KhrShaderSubgroupBasic,
        Self::KhrShaderSubgroupClustered,
        Self::KhrShaderSubgroupQuad,
        Self::KhrShaderSubgroupRotate,
        Self::KhrShaderSubgroupShuffle,
        Self::KhrShaderSubgroupShuffleRelative,
        Self::KhrShaderSubgroupVote,
        Self::NvxMultiviewPerViewAttributes,
        Self::NvClusterAccelerationStructure,
        Self::NvComputeShaderDerivatives,
        Self::NvConservativeRasterUnderestimation,
        Self::NvCooperativeMatrix,
        Self::NvCooperativeMatrix2,
        Self::NvCooperativeMatrixDecodeVector,
        Self::NvCooperativeVector,
        Self::NvDesktopLowpMediump,
        Self::NvDisplacementMicromap,
        Self::NvExplicitTypecast,
        Self::NvFragmentShaderBarycentric,
        Self::NvGeometryShaderPassthrough,
        Self::NvGpuShader5,
        Self::NvIntegerCooperativeMatrix,
        Self::NvLinearSweptSpheres,
        Self::NvMeshShader,
        Self::NvPushConstantBank,
        Self::NvRayTracing,
        Self::NvRayTracingMotionBlur,
        Self::NvSampleMaskOverrideCoverage,
        Self::NvShaderAtomicFp16Vector,
        Self::NvShaderAtomicInt64,
        Self::NvShaderInvocationReorder,
        Self::NvShaderNoperspectiveInterpolation,
        Self::NvShaderSmBuiltins,
        Self::NvShaderSubgroupPartitioned,
        Self::NvShaderTextureFootprint,
        Self::NvShadingRateImage,
        Self::NvStereoViewRendering,
        Self::NvViewportArray2,
        Self::OesEglImageExternal,
        Self::OesEglImageExternalEssl3,
        Self::OesGeometryPointSize,
        Self::OesGeometryShader,
        Self::OesGpuShader5,
        Self::OesPrimitiveBoundingBox,
        Self::OesSampleVariables,
        Self::OesShaderImageAtomic,
        Self::OesShaderIoBlocks,
        Self::OesShaderMultisampleInterpolation,
        Self::OesStandardDerivatives,
        Self::OesTessellationPointSize,
        Self::OesTessellationShader,
        Self::OesTexture3d,
        Self::OesTextureBuffer,
        Self::OesTextureCubeMapArray,
        Self::OesTextureStorageMultisample2dArray,
        Self::OvrMultiview,
        Self::OvrMultiview2,
        Self::QcomCooperativeMatrixConversion,
        Self::QcomImageProcessing,
        Self::QcomImageProcessing2,
        Self::QcomImageProcessing3,
        Self::QcomMultipleWaitQueues,
        Self::QcomTileShading,
    ];

    pub fn from_name(name: &str) -> Option<Self> {
        KNOWN
            .binary_search(&name)
            .ok()
            .and_then(|index| Self::ALL.get(index).copied())
    }

    pub const fn name(self) -> &'static str {
        match self {
            Self::Gl3dlArrayObjects => "GL_3DL_array_objects",
            Self::AmdGcnShader => "GL_AMD_gcn_shader",
            Self::AmdGpuShaderHalfFloat => "GL_AMD_gpu_shader_half_float",
            Self::AmdGpuShaderHalfFloatFetch => "GL_AMD_gpu_shader_half_float_fetch",
            Self::AmdGpuShaderInt16 => "GL_AMD_gpu_shader_int16",
            Self::AmdShaderBallot => "GL_AMD_shader_ballot",
            Self::AmdShaderEarlyAndLateFragmentTests => {
                "GL_AMD_shader_early_and_late_fragment_tests"
            }
            Self::AmdShaderExplicitVertexParameter => "GL_AMD_shader_explicit_vertex_parameter",
            Self::AmdShaderFragmentMask => "GL_AMD_shader_fragment_mask",
            Self::AmdShaderImageLoadStoreLod => "GL_AMD_shader_image_load_store_lod",
            Self::AmdShaderTrinaryMinmax => "GL_AMD_shader_trinary_minmax",
            Self::AmdTextureGatherBiasLod => "GL_AMD_texture_gather_bias_lod",
            Self::AndroidExtensionPackEs31a => "GL_ANDROID_extension_pack_es31a",
            Self::ArbBindlessTexture => "GL_ARB_bindless_texture",
            Self::ArbComputeShader => "GL_ARB_compute_shader",
            Self::ArbConservativeDepth => "GL_ARB_conservative_depth",
            Self::ArbCullDistance => "GL_ARB_cull_distance",
            Self::ArbDerivativeControl => "GL_ARB_derivative_control",
            Self::ArbDrawInstanced => "GL_ARB_draw_instanced",
            Self::ArbEnhancedLayouts => "GL_ARB_enhanced_layouts",
            Self::ArbExplicitAttribLocation => "GL_ARB_explicit_attrib_location",
            Self::ArbExplicitUniformLocation => "GL_ARB_explicit_uniform_location",
            Self::ArbFragmentCoordConventions => "GL_ARB_fragment_coord_conventions",
            Self::ArbFragmentShaderInterlock => "GL_ARB_fragment_shader_interlock",
            Self::ArbGpuShader5 => "GL_ARB_gpu_shader5",
            Self::ArbGpuShaderFp64 => "GL_ARB_gpu_shader_fp64",
            Self::ArbGpuShaderInt64 => "GL_ARB_gpu_shader_int64",
            Self::ArbPostDepthCoverage => "GL_ARB_post_depth_coverage",
            Self::ArbSampleShading => "GL_ARB_sample_shading",
            Self::ArbSeparateShaderObjects => "GL_ARB_separate_shader_objects",
            Self::ArbShaderAtomicCounterOps => "GL_ARB_shader_atomic_counter_ops",
            Self::ArbShaderAtomicCounters => "GL_ARB_shader_atomic_counters",
            Self::ArbShaderBallot => "GL_ARB_shader_ballot",
            Self::ArbShaderBitEncoding => "GL_ARB_shader_bit_encoding",
            Self::ArbShaderClock => "GL_ARB_shader_clock",
            Self::ArbShaderDrawParameters => "GL_ARB_shader_draw_parameters",
            Self::ArbShaderGroupVote => "GL_ARB_shader_group_vote",
            Self::ArbShaderImageLoadStore => "GL_ARB_shader_image_load_store",
            Self::ArbShaderImageSize => "GL_ARB_shader_image_size",
            Self::ArbShaderStencilExport => "GL_ARB_shader_stencil_export",
            Self::ArbShaderStorageBufferObject => "GL_ARB_shader_storage_buffer_object",
            Self::ArbShaderTextureImageSamples => "GL_ARB_shader_texture_image_samples",
            Self::ArbShaderTextureLod => "GL_ARB_shader_texture_lod",
            Self::ArbShaderViewportLayerArray => "GL_ARB_shader_viewport_layer_array",
            Self::ArbShadingLanguage420pack => "GL_ARB_shading_language_420pack",
            Self::ArbShadingLanguageInclude => "GL_ARB_shading_language_include",
            Self::ArbShadingLanguagePacking => "GL_ARB_shading_language_packing",
            Self::ArbSparseTexture2 => "GL_ARB_sparse_texture2",
            Self::ArbSparseTextureClamp => "GL_ARB_sparse_texture_clamp",
            Self::ArbTessellationShader => "GL_ARB_tessellation_shader",
            Self::ArbTextureCubeMapArray => "GL_ARB_texture_cube_map_array",
            Self::ArbTextureGather => "GL_ARB_texture_gather",
            Self::ArbTextureMultisample => "GL_ARB_texture_multisample",
            Self::ArbTextureQueryLod => "GL_ARB_texture_query_lod",
            Self::ArbTextureRectangle => "GL_ARB_texture_rectangle",
            Self::ArbUniformBufferObject => "GL_ARB_uniform_buffer_object",
            Self::ArbVertexAttrib64bit => "GL_ARB_vertex_attrib_64bit",
            Self::ArbViewportArray => "GL_ARB_viewport_array",
            Self::ArmShaderCoreBuiltins => "GL_ARM_shader_core_builtins",
            Self::ArmTensors => "GL_ARM_tensors",
            Self::ArmTensorsBfloat16 => "GL_ARM_tensors_bfloat16",
            Self::ArmTensorsFloatE4m3 => "GL_ARM_tensors_float_e4m3",
            Self::ArmTensorsFloatE5m2 => "GL_ARM_tensors_float_e5m2",
            Self::ExtYuvTarget => "GL_EXT_YUV_target",
            Self::ExtAbort => "GL_EXT_abort",
            Self::ExtBfloat16 => "GL_EXT_bfloat16",
            Self::ExtBlendFuncExtended => "GL_EXT_blend_func_extended",
            Self::ExtBufferReference => "GL_EXT_buffer_reference",
            Self::ExtBufferReference2 => "GL_EXT_buffer_reference2",
            Self::ExtBufferReferenceUvec2 => "GL_EXT_buffer_reference_uvec2",
            Self::ExtClipCullDistance => "GL_EXT_clip_cull_distance",
            Self::ExtConservativeDepth => "GL_EXT_conservative_depth",
            Self::ExtControlFlowAttributes => "GL_EXT_control_flow_attributes",
            Self::ExtControlFlowAttributes2 => "GL_EXT_control_flow_attributes2",
            Self::ExtCooperativeMatrixMaintenance1 => "GL_EXT_cooperative_matrix_maintenance1",
            Self::ExtDebugPrintf => "GL_EXT_debug_printf",
            Self::ExtDemoteToHelperInvocation => "GL_EXT_demote_to_helper_invocation",
            Self::ExtDescriptorHeap => "GL_EXT_descriptor_heap",
            Self::ExtDeviceGroup => "GL_EXT_device_group",
            Self::ExtDrawInstanced => "GL_EXT_draw_instanced",
            Self::ExtExpectAssume => "GL_EXT_expect_assume",
            Self::ExtFloatE2m1 => "GL_EXT_float_e2m1",
            Self::ExtFloatE2m3 => "GL_EXT_float_e2m3",
            Self::ExtFloatE3m2 => "GL_EXT_float_e3m2",
            Self::ExtFloatE4m3 => "GL_EXT_float_e4m3",
            Self::ExtFloatE5m2 => "GL_EXT_float_e5m2",
            Self::ExtFloatMxint8 => "GL_EXT_float_mxint8",
            Self::ExtFloatUe8m0 => "GL_EXT_float_ue8m0",
            Self::ExtFragDepth => "GL_EXT_frag_depth",
            Self::ExtFragmentInvocationDensity => "GL_EXT_fragment_invocation_density",
            Self::ExtFragmentShaderBarycentric => "GL_EXT_fragment_shader_barycentric",
            Self::ExtFragmentShadingRate => "GL_EXT_fragment_shading_rate",
            Self::ExtFunctionControlAttributes => "GL_EXT_function_control_attributes",
            Self::ExtGeometryPointSize => "GL_EXT_geometry_point_size",
            Self::ExtGeometryShader => "GL_EXT_geometry_shader",
            Self::ExtGpuShader5 => "GL_EXT_gpu_shader5",
            Self::ExtIntegerDotProduct => "GL_EXT_integer_dot_product",
            Self::ExtLongVector => "GL_EXT_long_vector",
            Self::ExtMaximalReconvergence => "GL_EXT_maximal_reconvergence",
            Self::ExtMeshShader => "GL_EXT_mesh_shader",
            Self::ExtMultiview => "GL_EXT_multiview",
            Self::ExtNontemporalKeyword => "GL_EXT_nontemporal_keyword",
            Self::ExtNonuniformQualifier => "GL_EXT_nonuniform_qualifier",
            Self::ExtNullInitializer => "GL_EXT_null_initializer",
            Self::ExtOpacityMicromap => "GL_EXT_opacity_micromap",
            Self::ExtOpacityMicromapRayQueryMode => "GL_EXT_opacity_micromap_ray_query_mode",
            Self::ExtOptionalInputAttachmentIndex => "GL_EXT_optional_input_attachment_index",
            Self::ExtPostDepthCoverage => "GL_EXT_post_depth_coverage",
            Self::ExtPrimitiveBoundingBox => "GL_EXT_primitive_bounding_box",
            Self::ExtRayCullMask => "GL_EXT_ray_cull_mask",
            Self::ExtRayFlagsPrimitiveCulling => "GL_EXT_ray_flags_primitive_culling",
            Self::ExtRayQuery => "GL_EXT_ray_query",
            Self::ExtRayTracing => "GL_EXT_ray_tracing",
            Self::ExtRayTracingPositionFetch => "GL_EXT_ray_tracing_position_fetch",
            Self::ExtSamplerlessTextureFunctions => "GL_EXT_samplerless_texture_functions",
            Self::ExtScalarBlockLayout => "GL_EXT_scalar_block_layout",
            Self::ExtShader16bitStorage => "GL_EXT_shader_16bit_storage",
            Self::ExtShader64bitIndexing => "GL_EXT_shader_64bit_indexing",
            Self::ExtShader8bitStorage => "GL_EXT_shader_8bit_storage",
            Self::ExtShaderAtomicFloat => "GL_EXT_shader_atomic_float",
            Self::ExtShaderAtomicFloat2 => "GL_EXT_shader_atomic_float2",
            Self::ExtShaderAtomicInt64 => "GL_EXT_shader_atomic_int64",
            Self::ExtShaderExplicitArithmeticTypes => "GL_EXT_shader_explicit_arithmetic_types",
            Self::ExtShaderExplicitArithmeticTypesFloat16 => {
                "GL_EXT_shader_explicit_arithmetic_types_float16"
            }
            Self::ExtShaderExplicitArithmeticTypesFloat32 => {
                "GL_EXT_shader_explicit_arithmetic_types_float32"
            }
            Self::ExtShaderExplicitArithmeticTypesFloat64 => {
                "GL_EXT_shader_explicit_arithmetic_types_float64"
            }
            Self::ExtShaderExplicitArithmeticTypesInt16 => {
                "GL_EXT_shader_explicit_arithmetic_types_int16"
            }
            Self::ExtShaderExplicitArithmeticTypesInt32 => {
                "GL_EXT_shader_explicit_arithmetic_types_int32"
            }
            Self::ExtShaderExplicitArithmeticTypesInt64 => {
                "GL_EXT_shader_explicit_arithmetic_types_int64"
            }
            Self::ExtShaderExplicitArithmeticTypesInt8 => {
                "GL_EXT_shader_explicit_arithmetic_types_int8"
            }
            Self::ExtShaderImageInt64 => "GL_EXT_shader_image_int64",
            Self::ExtShaderImageLoadFormatted => "GL_EXT_shader_image_load_formatted",
            Self::ExtShaderImplicitConversions => "GL_EXT_shader_implicit_conversions",
            Self::ExtShaderIntegerMix => "GL_EXT_shader_integer_mix",
            Self::ExtShaderInvocationReorder => "GL_EXT_shader_invocation_reorder",
            Self::ExtShaderIoBlocks => "GL_EXT_shader_io_blocks",
            Self::ExtShaderNonConstantGlobalInitializers => {
                "GL_EXT_shader_non_constant_global_initializers"
            }
            Self::ExtShaderQuadControl => "GL_EXT_shader_quad_control",
            Self::ExtShaderRealtimeClock => "GL_EXT_shader_realtime_clock",
            Self::ExtShaderSubgroupExtendedTypesFloat16 => {
                "GL_EXT_shader_subgroup_extended_types_float16"
            }
            Self::ExtShaderSubgroupExtendedTypesInt16 => {
                "GL_EXT_shader_subgroup_extended_types_int16"
            }
            Self::ExtShaderSubgroupExtendedTypesInt64 => {
                "GL_EXT_shader_subgroup_extended_types_int64"
            }
            Self::ExtShaderSubgroupExtendedTypesInt8 => {
                "GL_EXT_shader_subgroup_extended_types_int8"
            }
            Self::ExtShaderTextureLod => "GL_EXT_shader_texture_lod",
            Self::ExtShaderTileImage => "GL_EXT_shader_tile_image",
            Self::ExtShadowSamplers => "GL_EXT_shadow_samplers",
            Self::ExtSharedMemoryBlock => "GL_EXT_shared_memory_block",
            Self::ExtSpecConstantComposites => "GL_EXT_spec_constant_composites",
            Self::ExtSpirvIntrinsics => "GL_EXT_spirv_intrinsics",
            Self::ExtSplitBarrier => "GL_EXT_split_barrier",
            Self::ExtStructuredDescriptorHeap => "GL_EXT_structured_descriptor_heap",
            Self::ExtSubgroupUniformControlFlow => "GL_EXT_subgroup_uniform_control_flow",
            Self::ExtTerminateInvocation => "GL_EXT_terminate_invocation",
            Self::ExtTessellationPointSize => "GL_EXT_tessellation_point_size",
            Self::ExtTessellationShader => "GL_EXT_tessellation_shader",
            Self::ExtTextureArray => "GL_EXT_texture_array",
            Self::ExtTextureBuffer => "GL_EXT_texture_buffer",
            Self::ExtTextureCubeMapArray => "GL_EXT_texture_cube_map_array",
            Self::ExtTextureOffsetNonConst => "GL_EXT_texture_offset_non_const",
            Self::ExtTextureShadowLod => "GL_EXT_texture_shadow_lod",
            Self::ExtUniformBufferUnsizedArray => "GL_EXT_uniform_buffer_unsized_array",
            Self::GoogleCppStyleLineDirective => "GL_GOOGLE_cpp_style_line_directive",
            Self::GoogleIncludeDirective => "GL_GOOGLE_include_directive",
            Self::IntelShaderIntegerFunctions2 => "GL_INTEL_shader_integer_functions2",
            Self::KhrBlendEquationAdvanced => "GL_KHR_blend_equation_advanced",
            Self::KhrComputeShaderDerivatives => "GL_KHR_compute_shader_derivatives",
            Self::KhrCooperativeMatrix => "GL_KHR_cooperative_matrix",
            Self::KhrMemoryScopeSemantics => "GL_KHR_memory_scope_semantics",
            Self::KhrShaderSubgroupArithmetic => "GL_KHR_shader_subgroup_arithmetic",
            Self::KhrShaderSubgroupBallot => "GL_KHR_shader_subgroup_ballot",
            Self::KhrShaderSubgroupBasic => "GL_KHR_shader_subgroup_basic",
            Self::KhrShaderSubgroupClustered => "GL_KHR_shader_subgroup_clustered",
            Self::KhrShaderSubgroupQuad => "GL_KHR_shader_subgroup_quad",
            Self::KhrShaderSubgroupRotate => "GL_KHR_shader_subgroup_rotate",
            Self::KhrShaderSubgroupShuffle => "GL_KHR_shader_subgroup_shuffle",
            Self::KhrShaderSubgroupShuffleRelative => "GL_KHR_shader_subgroup_shuffle_relative",
            Self::KhrShaderSubgroupVote => "GL_KHR_shader_subgroup_vote",
            Self::NvxMultiviewPerViewAttributes => "GL_NVX_multiview_per_view_attributes",
            Self::NvClusterAccelerationStructure => "GL_NV_cluster_acceleration_structure",
            Self::NvComputeShaderDerivatives => "GL_NV_compute_shader_derivatives",
            Self::NvConservativeRasterUnderestimation => {
                "GL_NV_conservative_raster_underestimation"
            }
            Self::NvCooperativeMatrix => "GL_NV_cooperative_matrix",
            Self::NvCooperativeMatrix2 => "GL_NV_cooperative_matrix2",
            Self::NvCooperativeMatrixDecodeVector => "GL_NV_cooperative_matrix_decode_vector",
            Self::NvCooperativeVector => "GL_NV_cooperative_vector",
            Self::NvDesktopLowpMediump => "GL_NV_desktop_lowp_mediump",
            Self::NvDisplacementMicromap => "GL_NV_displacement_micromap",
            Self::NvExplicitTypecast => "GL_NV_explicit_typecast",
            Self::NvFragmentShaderBarycentric => "GL_NV_fragment_shader_barycentric",
            Self::NvGeometryShaderPassthrough => "GL_NV_geometry_shader_passthrough",
            Self::NvGpuShader5 => "GL_NV_gpu_shader5",
            Self::NvIntegerCooperativeMatrix => "GL_NV_integer_cooperative_matrix",
            Self::NvLinearSweptSpheres => "GL_NV_linear_swept_spheres",
            Self::NvMeshShader => "GL_NV_mesh_shader",
            Self::NvPushConstantBank => "GL_NV_push_constant_bank",
            Self::NvRayTracing => "GL_NV_ray_tracing",
            Self::NvRayTracingMotionBlur => "GL_NV_ray_tracing_motion_blur",
            Self::NvSampleMaskOverrideCoverage => "GL_NV_sample_mask_override_coverage",
            Self::NvShaderAtomicFp16Vector => "GL_NV_shader_atomic_fp16_vector",
            Self::NvShaderAtomicInt64 => "GL_NV_shader_atomic_int64",
            Self::NvShaderInvocationReorder => "GL_NV_shader_invocation_reorder",
            Self::NvShaderNoperspectiveInterpolation => "GL_NV_shader_noperspective_interpolation",
            Self::NvShaderSmBuiltins => "GL_NV_shader_sm_builtins",
            Self::NvShaderSubgroupPartitioned => "GL_NV_shader_subgroup_partitioned",
            Self::NvShaderTextureFootprint => "GL_NV_shader_texture_footprint",
            Self::NvShadingRateImage => "GL_NV_shading_rate_image",
            Self::NvStereoViewRendering => "GL_NV_stereo_view_rendering",
            Self::NvViewportArray2 => "GL_NV_viewport_array2",
            Self::OesEglImageExternal => "GL_OES_EGL_image_external",
            Self::OesEglImageExternalEssl3 => "GL_OES_EGL_image_external_essl3",
            Self::OesGeometryPointSize => "GL_OES_geometry_point_size",
            Self::OesGeometryShader => "GL_OES_geometry_shader",
            Self::OesGpuShader5 => "GL_OES_gpu_shader5",
            Self::OesPrimitiveBoundingBox => "GL_OES_primitive_bounding_box",
            Self::OesSampleVariables => "GL_OES_sample_variables",
            Self::OesShaderImageAtomic => "GL_OES_shader_image_atomic",
            Self::OesShaderIoBlocks => "GL_OES_shader_io_blocks",
            Self::OesShaderMultisampleInterpolation => "GL_OES_shader_multisample_interpolation",
            Self::OesStandardDerivatives => "GL_OES_standard_derivatives",
            Self::OesTessellationPointSize => "GL_OES_tessellation_point_size",
            Self::OesTessellationShader => "GL_OES_tessellation_shader",
            Self::OesTexture3d => "GL_OES_texture_3D",
            Self::OesTextureBuffer => "GL_OES_texture_buffer",
            Self::OesTextureCubeMapArray => "GL_OES_texture_cube_map_array",
            Self::OesTextureStorageMultisample2dArray => {
                "GL_OES_texture_storage_multisample_2d_array"
            }
            Self::OvrMultiview => "GL_OVR_multiview",
            Self::OvrMultiview2 => "GL_OVR_multiview2",
            Self::QcomCooperativeMatrixConversion => "GL_QCOM_cooperative_matrix_conversion",
            Self::QcomImageProcessing => "GL_QCOM_image_processing",
            Self::QcomImageProcessing2 => "GL_QCOM_image_processing2",
            Self::QcomImageProcessing3 => "GL_QCOM_image_processing3",
            Self::QcomMultipleWaitQueues => "GL_QCOM_multiple_wait_queues",
            Self::QcomTileShading => "GL_QCOM_tile_shading",
        }
    }
}

const EXTENSION_COUNT: usize = KNOWN.len();

pub const ALL: &str = "all";

pub mod names {
    pub const ARB_GPU_SHADER_FP64: &str = "GL_ARB_gpu_shader_fp64";
    pub const ARB_GPU_SHADER_INT64: &str = "GL_ARB_gpu_shader_int64";
    pub const AMD_GPU_SHADER_HALF_FLOAT: &str = "GL_AMD_gpu_shader_half_float";
    pub const AMD_GPU_SHADER_INT16: &str = "GL_AMD_gpu_shader_int16";
    pub const NV_GPU_SHADER5: &str = "GL_NV_gpu_shader5";
    pub const EXPLICIT_ARITHMETIC_TYPES: &str = "GL_EXT_shader_explicit_arithmetic_types";
    pub const EXPLICIT_INT8: &str = "GL_EXT_shader_explicit_arithmetic_types_int8";
    pub const EXPLICIT_INT16: &str = "GL_EXT_shader_explicit_arithmetic_types_int16";
    pub const EXPLICIT_INT32: &str = "GL_EXT_shader_explicit_arithmetic_types_int32";
    pub const EXPLICIT_INT64: &str = "GL_EXT_shader_explicit_arithmetic_types_int64";
    pub const EXPLICIT_FLOAT16: &str = "GL_EXT_shader_explicit_arithmetic_types_float16";
    pub const EXPLICIT_FLOAT32: &str = "GL_EXT_shader_explicit_arithmetic_types_float32";
    pub const EXPLICIT_FLOAT64: &str = "GL_EXT_shader_explicit_arithmetic_types_float64";
    pub const STORAGE_16BIT: &str = "GL_EXT_shader_16bit_storage";
    pub const STORAGE_8BIT: &str = "GL_EXT_shader_8bit_storage";
    pub const MESH_SHADER_EXT: &str = "GL_EXT_mesh_shader";
    pub const MESH_SHADER_NV: &str = "GL_NV_mesh_shader";
    pub const BINDLESS_TEXTURE: &str = "GL_ARB_bindless_texture";
    pub const HALF_FLOAT_FETCH: &str = "GL_AMD_gpu_shader_half_float_fetch";
    pub const BUFFER_REFERENCE: &str = "GL_EXT_buffer_reference";
    pub const BUFFER_REFERENCE2: &str = "GL_EXT_buffer_reference2";
    pub const BUFFER_REFERENCE_UVEC2: &str = "GL_EXT_buffer_reference_uvec2";
    pub const RAY_TRACING_NV: &str = "GL_NV_ray_tracing";
    pub const RAY_TRACING_EXT: &str = "GL_EXT_ray_tracing";
    pub const RAY_QUERY: &str = "GL_EXT_ray_query";
    pub const DISPLACEMENT_MICROMAP: &str = "GL_NV_displacement_micromap";
    pub const NV_SHADER_INVOCATION_REORDER: &str = "GL_NV_shader_invocation_reorder";
    pub const EXT_SHADER_INVOCATION_REORDER: &str = "GL_EXT_shader_invocation_reorder";
    pub const KHR_COOPERATIVE_MATRIX: &str = "GL_KHR_cooperative_matrix";
    pub const NV_COOPERATIVE_MATRIX: &str = "GL_NV_cooperative_matrix";
    pub const NV_INTEGER_COOPERATIVE_MATRIX: &str = "GL_NV_integer_cooperative_matrix";
    pub const NV_COOPERATIVE_MATRIX2: &str = "GL_NV_cooperative_matrix2";
    pub const NV_COOPERATIVE_VECTOR: &str = "GL_NV_cooperative_vector";
    pub const EXT_LONG_VECTOR: &str = "GL_EXT_long_vector";
}

use names::{
    AMD_GPU_SHADER_HALF_FLOAT, AMD_GPU_SHADER_INT16, ARB_GPU_SHADER_FP64, ARB_GPU_SHADER_INT64,
    EXPLICIT_ARITHMETIC_TYPES, EXPLICIT_FLOAT16, EXPLICIT_FLOAT32, EXPLICIT_FLOAT64, EXPLICIT_INT8,
    EXPLICIT_INT16, EXPLICIT_INT32, EXPLICIT_INT64, NV_GPU_SHADER5, STORAGE_8BIT, STORAGE_16BIT,
};

pub const EXPLICIT_ARITHMETIC: [&str; 8] = [
    EXPLICIT_ARITHMETIC_TYPES,
    EXPLICIT_INT8,
    EXPLICIT_INT16,
    EXPLICIT_INT32,
    EXPLICIT_INT64,
    EXPLICIT_FLOAT16,
    EXPLICIT_FLOAT32,
    EXPLICIT_FLOAT64,
];

pub const EXPLICIT_ARITHMETIC_EXTENSIONS: [Extension; 8] = [
    Extension::ExtShaderExplicitArithmeticTypes,
    Extension::ExtShaderExplicitArithmeticTypesInt8,
    Extension::ExtShaderExplicitArithmeticTypesInt16,
    Extension::ExtShaderExplicitArithmeticTypesInt32,
    Extension::ExtShaderExplicitArithmeticTypesInt64,
    Extension::ExtShaderExplicitArithmeticTypesFloat16,
    Extension::ExtShaderExplicitArithmeticTypesFloat32,
    Extension::ExtShaderExplicitArithmeticTypesFloat64,
];

const INT64_TYPES: &[&str] = &[
    ARB_GPU_SHADER_INT64,
    EXPLICIT_ARITHMETIC_TYPES,
    NV_GPU_SHADER5,
    EXPLICIT_INT64,
];
const INT8_TYPES: &[&str] = &[
    EXPLICIT_ARITHMETIC_TYPES,
    STORAGE_8BIT,
    NV_GPU_SHADER5,
    EXPLICIT_INT8,
];
const INT16_TYPES: &[&str] = &[
    AMD_GPU_SHADER_INT16,
    STORAGE_16BIT,
    EXPLICIT_ARITHMETIC_TYPES,
    NV_GPU_SHADER5,
    EXPLICIT_INT16,
];
const INT32_TYPES: &[&str] = &[EXPLICIT_ARITHMETIC_TYPES, NV_GPU_SHADER5, EXPLICIT_INT32];
const FLOAT32_TYPES: &[&str] = &[EXPLICIT_ARITHMETIC_TYPES, NV_GPU_SHADER5, EXPLICIT_FLOAT32];
const FLOAT32_MATRICES: &[&str] = &[EXPLICIT_ARITHMETIC_TYPES, EXPLICIT_FLOAT32];
const FLOAT64_TYPES: &[&str] = &[EXPLICIT_ARITHMETIC_TYPES, EXPLICIT_FLOAT64];
const FLOAT16_TYPES: &[&str] = &[
    AMD_GPU_SHADER_HALF_FLOAT,
    STORAGE_16BIT,
    EXPLICIT_ARITHMETIC_TYPES,
    NV_GPU_SHADER5,
    EXPLICIT_FLOAT16,
];
const FLOAT16_MATRICES: &[&str] = &[
    AMD_GPU_SHADER_HALF_FLOAT,
    EXPLICIT_ARITHMETIC_TYPES,
    EXPLICIT_FLOAT16,
];

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Feature {
    Int64Type,
    Int8Type,
    Int16Type,
    Int32Type,
    Float32Type,
    Float32Matrix,
    Float64Type,
    Float64Matrix,
    Float16Type,
    Float16Matrix,
    Int64Literal,
    Int16Literal,
    Float16Literal,
    Float16Arithmetic,
    Int16Arithmetic,
    Int8Arithmetic,
    AccelerationStructureNv,
    AccelerationStructureExt,
    RayQueryType,
    HitObjectNvType,
    HitObjectExtType,
    CooperativeMatrixType,
    CooperativeMatrixNvType,
    IntegerCooperativeMatrixNvType,
    TensorType,
    TensorArmType,
    CooperativeVectorType,
    LongVectorType,
    BFloat16Type,
    FloatE4M3Type,
    FloatE5M2Type,
    FloatE2M1Type,
    FloatE3M2Type,
    FloatE2M3Type,
    FloatUE8M0Type,
    FloatMXINT8Type,
    Int64ImageType,
    TileImageType,
}

impl Feature {
    pub const fn extensions(self) -> &'static [&'static str] {
        match self {
            Self::Int64Type | Self::Int64Literal => INT64_TYPES,
            Self::Int8Type => INT8_TYPES,
            Self::Int16Type => INT16_TYPES,
            Self::Int32Type => INT32_TYPES,
            Self::Float32Type => FLOAT32_TYPES,
            Self::Float32Matrix => FLOAT32_MATRICES,
            Self::Float64Type | Self::Float64Matrix => FLOAT64_TYPES,
            Self::Float16Type => FLOAT16_TYPES,
            Self::Float16Matrix => FLOAT16_MATRICES,
            Self::Int16Literal => &[
                AMD_GPU_SHADER_INT16,
                EXPLICIT_ARITHMETIC_TYPES,
                EXPLICIT_INT16,
            ],
            Self::Float16Literal => &[
                AMD_GPU_SHADER_HALF_FLOAT,
                EXPLICIT_ARITHMETIC_TYPES,
                EXPLICIT_FLOAT16,
            ],
            Self::Float16Arithmetic => &[
                AMD_GPU_SHADER_HALF_FLOAT,
                EXPLICIT_ARITHMETIC_TYPES,
                NV_GPU_SHADER5,
                EXPLICIT_FLOAT16,
            ],
            Self::Int16Arithmetic => &[
                AMD_GPU_SHADER_INT16,
                EXPLICIT_ARITHMETIC_TYPES,
                NV_GPU_SHADER5,
                EXPLICIT_INT16,
            ],
            Self::Int8Arithmetic => &[EXPLICIT_ARITHMETIC_TYPES, NV_GPU_SHADER5, EXPLICIT_INT8],
            Self::AccelerationStructureNv => &[names::RAY_TRACING_NV],
            Self::AccelerationStructureExt => &[
                names::RAY_TRACING_EXT,
                names::RAY_QUERY,
                names::DISPLACEMENT_MICROMAP,
            ],
            Self::RayQueryType => &[names::RAY_QUERY],
            Self::HitObjectNvType => &[names::NV_SHADER_INVOCATION_REORDER],
            Self::HitObjectExtType => &[names::EXT_SHADER_INVOCATION_REORDER],
            Self::CooperativeMatrixType => &[names::KHR_COOPERATIVE_MATRIX],
            Self::CooperativeMatrixNvType => &[names::NV_COOPERATIVE_MATRIX],
            Self::IntegerCooperativeMatrixNvType => &[names::NV_INTEGER_COOPERATIVE_MATRIX],
            Self::TensorType => &[names::NV_COOPERATIVE_MATRIX2],
            Self::TensorArmType => &["GL_ARM_tensors"],
            Self::CooperativeVectorType => &[names::NV_COOPERATIVE_VECTOR],
            Self::LongVectorType => &[names::EXT_LONG_VECTOR],
            Self::BFloat16Type => &["GL_EXT_bfloat16"],
            Self::FloatE4M3Type => &["GL_EXT_float_e4m3"],
            Self::FloatE5M2Type => &["GL_EXT_float_e5m2"],
            Self::FloatE2M1Type => &["GL_EXT_float_e2m1"],
            Self::FloatE3M2Type => &["GL_EXT_float_e3m2"],
            Self::FloatE2M3Type => &["GL_EXT_float_e2m3"],
            Self::FloatUE8M0Type => &["GL_EXT_float_ue8m0"],
            Self::FloatMXINT8Type => &["GL_EXT_float_mxint8"],
            Self::Int64ImageType => &["GL_EXT_shader_image_int64"],
            Self::TileImageType => &["GL_EXT_shader_tile_image"],
        }
    }

    pub fn of_type_keyword(word: &str) -> Option<Self> {
        let matrix = |stem: &str| {
            word.strip_prefix(stem).is_some_and(|shape| {
                matches!(
                    shape,
                    "2" | "3"
                        | "4"
                        | "2x2"
                        | "2x3"
                        | "2x4"
                        | "3x2"
                        | "3x3"
                        | "3x4"
                        | "4x2"
                        | "4x3"
                        | "4x4"
                )
            })
        };
        let vector = |stem: &str| {
            word.strip_prefix(stem)
                .is_some_and(|size| matches!(size, "2" | "3" | "4"))
        };
        let family = |scalars: [&str; 2], stems: [&str; 2]| {
            scalars.contains(&word) || stems.iter().any(|stem| vector(stem))
        };
        Some(if word == "accelerationStructureNV" {
            Self::AccelerationStructureNv
        } else if word == "accelerationStructureEXT" {
            Self::AccelerationStructureExt
        } else if word == "rayQueryEXT" {
            Self::RayQueryType
        } else if word == "hitObjectNV" {
            Self::HitObjectNvType
        } else if word == "hitObjectEXT" {
            Self::HitObjectExtType
        } else if matches!(word, "attachmentEXT" | "iattachmentEXT" | "uattachmentEXT") {
            Self::TileImageType
        } else if word.starts_with("i64image") || word.starts_with("u64image") {
            Self::Int64ImageType
        } else if word == "coopmat" {
            Self::CooperativeMatrixType
        } else if word == "fcoopmatNV" {
            Self::CooperativeMatrixNvType
        } else if word == "icoopmatNV" || word == "ucoopmatNV" {
            Self::IntegerCooperativeMatrixNvType
        } else if word == "tensorLayoutNV" || word == "tensorViewNV" {
            Self::TensorType
        } else if word == "tensorARM" {
            Self::TensorArmType
        } else if word == "coopvecNV" {
            Self::CooperativeVectorType
        } else if word == "vector" {
            Self::LongVectorType
        } else if word == "bfloat16_t" || vector("bf16vec") {
            Self::BFloat16Type
        } else if word == "floate4m3_t" || vector("fe4m3vec") {
            Self::FloatE4M3Type
        } else if word == "floate5m2_t" || vector("fe5m2vec") {
            Self::FloatE5M2Type
        } else if word == "floate2m1_t" || vector("fe2m1vec") {
            Self::FloatE2M1Type
        } else if word == "floate3m2_t" || vector("fe3m2vec") {
            Self::FloatE3M2Type
        } else if word == "floate2m3_t" || vector("fe2m3vec") {
            Self::FloatE2M3Type
        } else if word == "floatue8m0_t" || vector("fue8m0vec") {
            Self::FloatUE8M0Type
        } else if word == "floatmxint8_t" || vector("fmxint8vec") {
            Self::FloatMXINT8Type
        } else if family(["int64_t", "uint64_t"], ["i64vec", "u64vec"]) {
            Self::Int64Type
        } else if family(["int8_t", "uint8_t"], ["i8vec", "u8vec"]) {
            Self::Int8Type
        } else if family(["int16_t", "uint16_t"], ["i16vec", "u16vec"]) {
            Self::Int16Type
        } else if family(["int32_t", "uint32_t"], ["i32vec", "u32vec"]) {
            Self::Int32Type
        } else if word == "float32_t" || vector("f32vec") {
            Self::Float32Type
        } else if matrix("f32mat") {
            Self::Float32Matrix
        } else if word == "float64_t" || vector("f64vec") {
            Self::Float64Type
        } else if matrix("f64mat") {
            Self::Float64Matrix
        } else if word == "float16_t" || vector("f16vec") {
            Self::Float16Type
        } else if matrix("f16mat") {
            Self::Float16Matrix
        } else {
            return None;
        })
    }
}

pub fn is_known(name: &str) -> bool {
    KNOWN.binary_search(&name).is_ok()
}

pub fn implied(name: &str) -> Option<&'static str> {
    Some(match name {
        "GL_EXT_geometry_shader" | "GL_EXT_tessellation_shader" => "GL_EXT_shader_io_blocks",
        "GL_OES_geometry_shader" | "GL_OES_tessellation_shader" => "GL_OES_shader_io_blocks",
        "GL_GOOGLE_include_directive" | "GL_ARB_shading_language_include" => {
            "GL_GOOGLE_cpp_style_line_directive"
        }
        "GL_KHR_shader_subgroup_vote"
        | "GL_KHR_shader_subgroup_arithmetic"
        | "GL_KHR_shader_subgroup_ballot"
        | "GL_KHR_shader_subgroup_shuffle"
        | "GL_KHR_shader_subgroup_shuffle_relative"
        | "GL_KHR_shader_subgroup_clustered"
        | "GL_KHR_shader_subgroup_quad"
        | "GL_NV_shader_subgroup_partitioned" => "GL_KHR_shader_subgroup_basic",
        "GL_EXT_buffer_reference2" | "GL_EXT_buffer_reference_uvec2" => "GL_EXT_buffer_reference",
        "GL_NV_integer_cooperative_matrix" => "GL_NV_cooperative_matrix",
        "GL_NV_cooperative_matrix2" => "GL_KHR_cooperative_matrix",
        "GL_EXT_shader_subgroup_extended_types_int8" => EXPLICIT_INT8,
        "GL_EXT_shader_subgroup_extended_types_int16" => EXPLICIT_INT16,
        "GL_EXT_shader_subgroup_extended_types_int64" => EXPLICIT_INT64,
        "GL_EXT_shader_subgroup_extended_types_float16" => EXPLICIT_FLOAT16,
        _ => return None,
    })
}

pub fn minimum_spirv(name: &str) -> Option<(u8, u8)> {
    Some(match name {
        "GL_EXT_ray_tracing" | "GL_NV_ray_tracing_motion_blur" | "GL_EXT_mesh_shader" => (1, 4),
        "GL_NV_cooperative_matrix2" | "GL_NV_cooperative_matrix_decode_vector" => (1, 6),
        "GL_EXT_cooperative_matrix_maintenance1" => (1, 3),
        _ => return None,
    })
}

pub fn unsupported_with_spirv(name: &str) -> bool {
    name == names::BINDLESS_TEXTURE
}

pub fn unsupported_in_vulkan(name: &str) -> Option<&'static str> {
    (name == names::HALF_FLOAT_FETCH).then_some("SPIR-V for Vulkan has no 16-bit float images")
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ExtensionIssue {
    UnknownRequired(String),
    Unknown(String),
    AllEnabled(ExtensionBehavior),
}

impl ExtensionIssue {
    pub const fn is_error(&self) -> bool {
        matches!(self, Self::UnknownRequired(_) | Self::AllEnabled(_))
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Request {
    Enabled,
    Warned(&'static str),
    Missing,
}

const REQUESTED_WORDS: usize = EXTENSION_COUNT.div_ceil(64);

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ExtensionState {
    behaviors: [ExtensionBehavior; EXTENSION_COUNT],
    requested: [u64; REQUESTED_WORDS],
}

impl Default for ExtensionState {
    fn default() -> Self {
        Self::new()
    }
}

impl ExtensionState {
    pub const fn new() -> Self {
        Self {
            behaviors: [ExtensionBehavior::Disable; EXTENSION_COUNT],
            requested: [0; REQUESTED_WORDS],
        }
    }

    fn set(&mut self, extension: Extension, behavior: ExtensionBehavior) {
        if let Some(slot) = self.behaviors.get_mut(extension as usize) {
            *slot = behavior;
        }
    }

    fn mark_requested(&mut self, extension: Extension) {
        let index = extension as usize;
        if let Some(word) = self.requested.get_mut(index / 64) {
            *word |= 1 << (index % 64);
        }
    }

    pub fn extension_behavior(&self, extension: Extension) -> ExtensionBehavior {
        self.behaviors
            .get(extension as usize)
            .copied()
            .unwrap_or(ExtensionBehavior::Disable)
    }

    pub fn is_extension_requested(&self, extension: Extension) -> bool {
        let index = extension as usize;
        self.requested
            .get(index / 64)
            .is_some_and(|word| word & (1 << (index % 64)) != 0)
    }

    pub fn apply(&mut self, name: &str, behavior: ExtensionBehavior) -> Vec<ExtensionIssue> {
        let mut issues = Vec::new();
        self.apply_one(name, behavior, &mut issues);
        let mut next = implied(name);
        let mut steps = 0;
        while let Some(current) = next {
            self.apply_one(current, behavior, &mut issues);
            next = implied(current);
            steps += 1;
            if steps > KNOWN.len() {
                break;
            }
        }
        issues
    }

    fn apply_one(
        &mut self,
        name: &str,
        behavior: ExtensionBehavior,
        issues: &mut Vec<ExtensionIssue>,
    ) {
        if name == ALL {
            if matches!(
                behavior,
                ExtensionBehavior::Require | ExtensionBehavior::Enable
            ) {
                issues.push(ExtensionIssue::AllEnabled(behavior));
            } else {
                self.behaviors = [behavior; EXTENSION_COUNT];
            }
            return;
        }
        match Extension::from_name(name) {
            Some(extension) => {
                self.set(extension, behavior);
                if behavior != ExtensionBehavior::Disable {
                    self.mark_requested(extension);
                }
            }
            None if behavior == ExtensionBehavior::Require => {
                issues.push(ExtensionIssue::UnknownRequired(String::from(name)));
            }
            None => issues.push(ExtensionIssue::Unknown(String::from(name))),
        }
    }

    pub fn behavior(&self, name: &str) -> ExtensionBehavior {
        Extension::from_name(name).map_or(ExtensionBehavior::Disable, |extension| {
            self.extension_behavior(extension)
        })
    }

    pub fn requested(&self) -> impl Iterator<Item = &'static str> + '_ {
        Extension::ALL
            .into_iter()
            .filter(|&extension| self.is_extension_requested(extension))
            .map(Extension::name)
    }

    pub fn is_requested(&self, name: &str) -> bool {
        Extension::from_name(name).is_some_and(|extension| self.is_extension_requested(extension))
    }

    pub fn is_extension_on(&self, extension: Extension) -> bool {
        self.extension_behavior(extension) != ExtensionBehavior::Disable
    }

    pub fn any_extension_on(&self, extensions: &[Extension]) -> bool {
        extensions
            .iter()
            .any(|&extension| self.is_extension_on(extension))
    }

    pub fn is_on(&self, name: &str) -> bool {
        self.behavior(name) != ExtensionBehavior::Disable
    }

    pub fn any_on(&self, names: &[&str]) -> bool {
        names.iter().any(|name| self.is_on(name))
    }

    pub fn request(&self, names: &[&'static str]) -> Request {
        let enabled = names.iter().any(|name| {
            matches!(
                self.behavior(name),
                ExtensionBehavior::Enable | ExtensionBehavior::Require
            )
        });
        if enabled {
            return Request::Enabled;
        }
        names
            .iter()
            .find(|name| self.behavior(name) == ExtensionBehavior::Warn)
            .map_or(Request::Missing, |name| Request::Warned(name))
    }

    pub fn enabled(&self) -> impl Iterator<Item = &'static str> + '_ {
        Extension::ALL
            .into_iter()
            .filter(|&extension| self.extension_behavior(extension) != ExtensionBehavior::Disable)
            .map(Extension::name)
    }

    pub fn keyword_enabled(&self, word: &str) -> bool {
        match Feature::of_type_keyword(word) {
            None => true,
            Some(Feature::Float64Type) => {
                self.any_on(Feature::Float64Type.extensions())
                    || (self.is_on(NV_GPU_SHADER5) && self.is_on(ARB_GPU_SHADER_FP64))
            }
            Some(feature) => self.any_on(feature.extensions()),
        }
    }

    pub fn explicit_arithmetic(&self) -> bool {
        self.any_extension_on(&EXPLICIT_ARITHMETIC_EXTENSIONS)
    }
}
