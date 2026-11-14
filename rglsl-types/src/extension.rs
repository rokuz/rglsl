use crate::{ShaderStage, ShaderStageMask};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Predefined {
    Never,
    Always,
    Since(u32),
}

impl Predefined {
    pub const fn at(self, version: u32) -> bool {
        match self {
            Self::Never => false,
            Self::Always => true,
            Self::Since(first) => version >= first,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Vulkan {
    Supported,
    Unsupported(&'static str),
    WithoutSpirv,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct Info {
    pub predefined: Predefined,
    pub implies: &'static [Extension],
    pub minimum_spirv: Option<(u8, u8)>,
    pub vulkan: Vulkan,
    pub stages: ShaderStageMask,
    pub conflicts: &'static [Extension],
    pub preprocessor: bool,
    pub string_literals: bool,
    pub keywords: &'static [&'static str],
}

impl Info {
    const DEFAULT: Self = Self {
        predefined: Predefined::Never,
        implies: &[],
        minimum_spirv: None,
        vulkan: Vulkan::Supported,
        stages: ShaderStageMask::all(),
        conflicts: &[],
        preprocessor: false,
        string_literals: false,
        keywords: &[],
    };

    pub const fn allowed_in(&self, stage: ShaderStage) -> bool {
        self.stages.has(stage)
    }
}

macro_rules! extensions {
    ($($variant:ident $name:literal { $($field:ident: $value:expr),* $(,)? })*) => {
        #[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
        #[repr(u8)]
        pub enum Extension {
            $($variant,)*
        }

        impl Extension {
            pub const COUNT: usize = [$($name),*].len();

            pub const ALL: [Self; Self::COUNT] = [$(Self::$variant),*];

            const NAMES: [&'static str; Self::COUNT] = [$($name),*];

            pub const fn name(self) -> &'static str {
                match self {
                    $(Self::$variant => $name,)*
                }
            }

            pub const fn info(self) -> &'static Info {
                use Extension::*;
                use Predefined::*;
                use Vulkan::*;
                match self {
                    $(Self::$variant => const { &Info { $($field: $value,)* ..Info::DEFAULT } },)*
                }
            }
        }
    };
}

extensions! {
    Gl3dlArrayObjects "GL_3DL_array_objects" {}
    AmdGcnShader "GL_AMD_gcn_shader" { predefined: Always }
    AmdGpuShaderHalfFloat "GL_AMD_gpu_shader_half_float" { predefined: Always }
    AmdGpuShaderHalfFloatFetch "GL_AMD_gpu_shader_half_float_fetch" {
        vulkan: Unsupported("SPIR-V for Vulkan has no 16-bit float images"),
        keywords: &[
            "f16sampler1D",
            "f16sampler2D",
            "f16sampler3D",
            "f16sampler2DRect",
            "f16samplerCube",
            "f16sampler1DArray",
            "f16sampler2DArray",
            "f16samplerCubeArray",
            "f16samplerBuffer",
            "f16sampler2DMS",
            "f16sampler2DMSArray",
            "f16sampler1DShadow",
            "f16sampler2DShadow",
            "f16sampler2DRectShadow",
            "f16samplerCubeShadow",
            "f16sampler1DArrayShadow",
            "f16sampler2DArrayShadow",
            "f16samplerCubeArrayShadow",
            "f16image1D",
            "f16image2D",
            "f16image3D",
            "f16image2DRect",
            "f16imageCube",
            "f16image1DArray",
            "f16image2DArray",
            "f16imageCubeArray",
            "f16imageBuffer",
            "f16image2DMS",
            "f16image2DMSArray",
            "f16texture1D",
            "f16texture2D",
            "f16texture3D",
            "f16texture2DRect",
            "f16textureCube",
            "f16texture1DArray",
            "f16texture2DArray",
            "f16textureCubeArray",
            "f16textureBuffer",
            "f16texture2DMS",
            "f16texture2DMSArray",
            "f16subpassInput",
            "f16subpassInputMS",
        ],
    }
    AmdGpuShaderInt16 "GL_AMD_gpu_shader_int16" { predefined: Always }
    AmdShaderBallot "GL_AMD_shader_ballot" { predefined: Always }
    AmdShaderEarlyAndLateFragmentTests "GL_AMD_shader_early_and_late_fragment_tests" {}
    AmdShaderExplicitVertexParameter "GL_AMD_shader_explicit_vertex_parameter" {
        predefined: Always,
        keywords: &["__explicitInterpAMD"],
    }
    AmdShaderFragmentMask "GL_AMD_shader_fragment_mask" { predefined: Always }
    AmdShaderImageLoadStoreLod "GL_AMD_shader_image_load_store_lod" { predefined: Always }
    AmdShaderTrinaryMinmax "GL_AMD_shader_trinary_minmax" { predefined: Always }
    AmdTextureGatherBiasLod "GL_AMD_texture_gather_bias_lod" { predefined: Always }
    AndroidExtensionPackEs31a "GL_ANDROID_extension_pack_es31a" {}
    ArbBindlessTexture "GL_ARB_bindless_texture" { vulkan: WithoutSpirv }
    ArbComputeShader "GL_ARB_compute_shader" { predefined: Always }
    ArbConservativeDepth "GL_ARB_conservative_depth" { predefined: Always }
    ArbCullDistance "GL_ARB_cull_distance" { predefined: Always }
    ArbDerivativeControl "GL_ARB_derivative_control" { predefined: Always }
    ArbDrawInstanced "GL_ARB_draw_instanced" { predefined: Always }
    ArbEnhancedLayouts "GL_ARB_enhanced_layouts" { predefined: Always }
    ArbExplicitAttribLocation "GL_ARB_explicit_attrib_location" { predefined: Always }
    ArbExplicitUniformLocation "GL_ARB_explicit_uniform_location" { predefined: Always }
    ArbFragmentCoordConventions "GL_ARB_fragment_coord_conventions" { predefined: Always }
    ArbFragmentShaderInterlock "GL_ARB_fragment_shader_interlock" { predefined: Always }
    ArbGpuShader5 "GL_ARB_gpu_shader5" { predefined: Always }
    ArbGpuShaderFp64 "GL_ARB_gpu_shader_fp64" { predefined: Always }
    ArbGpuShaderInt64 "GL_ARB_gpu_shader_int64" { predefined: Always }
    ArbPostDepthCoverage "GL_ARB_post_depth_coverage" { predefined: Always }
    ArbSampleShading "GL_ARB_sample_shading" { predefined: Always }
    ArbSeparateShaderObjects "GL_ARB_separate_shader_objects" { predefined: Always }
    ArbShaderAtomicCounterOps "GL_ARB_shader_atomic_counter_ops" {}
    ArbShaderAtomicCounters "GL_ARB_shader_atomic_counters" { predefined: Always }
    ArbShaderBallot "GL_ARB_shader_ballot" { predefined: Always }
    ArbShaderBitEncoding "GL_ARB_shader_bit_encoding" { predefined: Always }
    ArbShaderClock "GL_ARB_shader_clock" {}
    ArbShaderDrawParameters "GL_ARB_shader_draw_parameters" { predefined: Always }
    ArbShaderGroupVote "GL_ARB_shader_group_vote" { predefined: Always }
    ArbShaderImageLoadStore "GL_ARB_shader_image_load_store" { predefined: Always }
    ArbShaderImageSize "GL_ARB_shader_image_size" { predefined: Always }
    ArbShaderStencilExport "GL_ARB_shader_stencil_export" { predefined: Always }
    ArbShaderStorageBufferObject "GL_ARB_shader_storage_buffer_object" { predefined: Always }
    ArbShaderTextureImageSamples "GL_ARB_shader_texture_image_samples" { predefined: Always }
    ArbShaderTextureLod "GL_ARB_shader_texture_lod" { predefined: Always }
    ArbShaderViewportLayerArray "GL_ARB_shader_viewport_layer_array" {}
    ArbShadingLanguage420pack "GL_ARB_shading_language_420pack" {
        predefined: Always,
        preprocessor: true,
    }
    ArbShadingLanguageInclude "GL_ARB_shading_language_include" {
        implies: &[GoogleCppStyleLineDirective],
        preprocessor: true,
    }
    ArbShadingLanguagePacking "GL_ARB_shading_language_packing" { predefined: Always }
    ArbSparseTexture2 "GL_ARB_sparse_texture2" { predefined: Always }
    ArbSparseTextureClamp "GL_ARB_sparse_texture_clamp" { predefined: Always }
    ArbTessellationShader "GL_ARB_tessellation_shader" { predefined: Always }
    ArbTextureCubeMapArray "GL_ARB_texture_cube_map_array" { predefined: Always }
    ArbTextureGather "GL_ARB_texture_gather" { predefined: Always }
    ArbTextureMultisample "GL_ARB_texture_multisample" { predefined: Always }
    ArbTextureQueryLod "GL_ARB_texture_query_lod" { predefined: Always }
    ArbTextureRectangle "GL_ARB_texture_rectangle" { predefined: Always }
    ArbUniformBufferObject "GL_ARB_uniform_buffer_object" { predefined: Always }
    ArbVertexAttrib64bit "GL_ARB_vertex_attrib_64bit" { predefined: Always }
    ArbViewportArray "GL_ARB_viewport_array" { predefined: Always }
    ArmShaderCoreBuiltins "GL_ARM_shader_core_builtins" {}
    ArmTensors "GL_ARM_tensors" { predefined: Since(460) }
    ArmTensorsBfloat16 "GL_ARM_tensors_bfloat16" { predefined: Since(460) }
    ArmTensorsFloatE4m3 "GL_ARM_tensors_float_e4m3" { predefined: Since(460) }
    ArmTensorsFloatE5m2 "GL_ARM_tensors_float_e5m2" { predefined: Since(460) }
    ExtYuvTarget "GL_EXT_YUV_target" { keywords: &["__samplerExternal2DY2YEXT"] }
    ExtAbort "GL_EXT_abort" {
        predefined: Always,
        preprocessor: true,
        string_literals: true,
    }
    ExtBfloat16 "GL_EXT_bfloat16" { predefined: Always }
    ExtBlendFuncExtended "GL_EXT_blend_func_extended" {}
    ExtBufferReference "GL_EXT_buffer_reference" { predefined: Always }
    ExtBufferReference2 "GL_EXT_buffer_reference2" {
        predefined: Always,
        implies: &[ExtBufferReference],
    }
    ExtBufferReferenceUvec2 "GL_EXT_buffer_reference_uvec2" {
        predefined: Always,
        implies: &[ExtBufferReference],
    }
    ExtClipCullDistance "GL_EXT_clip_cull_distance" {}
    ExtConservativeDepth "GL_EXT_conservative_depth" {}
    ExtControlFlowAttributes "GL_EXT_control_flow_attributes" { predefined: Always }
    ExtControlFlowAttributes2 "GL_EXT_control_flow_attributes2" { predefined: Always }
    ExtCooperativeMatrixMaintenance1 "GL_EXT_cooperative_matrix_maintenance1" {
        predefined: Always,
        minimum_spirv: Some((1, 3)),
    }
    ExtDebugPrintf "GL_EXT_debug_printf" {
        predefined: Always,
        preprocessor: true,
        string_literals: true,
    }
    ExtDemoteToHelperInvocation "GL_EXT_demote_to_helper_invocation" {
        predefined: Always,
        keywords: &["demote"],
    }
    ExtDescriptorHeap "GL_EXT_descriptor_heap" { predefined: Always }
    ExtDeviceGroup "GL_EXT_device_group" { predefined: Always }
    ExtDrawInstanced "GL_EXT_draw_instanced" {}
    ExtExpectAssume "GL_EXT_expect_assume" {}
    ExtFloatE2m1 "GL_EXT_float_e2m1" { predefined: Always }
    ExtFloatE2m3 "GL_EXT_float_e2m3" { predefined: Always }
    ExtFloatE3m2 "GL_EXT_float_e3m2" { predefined: Always }
    ExtFloatE4m3 "GL_EXT_float_e4m3" { predefined: Always }
    ExtFloatE5m2 "GL_EXT_float_e5m2" { predefined: Always }
    ExtFloatMxint8 "GL_EXT_float_mxint8" { predefined: Always }
    ExtFloatUe8m0 "GL_EXT_float_ue8m0" { predefined: Always }
    ExtFragDepth "GL_EXT_frag_depth" {}
    ExtFragmentInvocationDensity "GL_EXT_fragment_invocation_density" { predefined: Always }
    ExtFragmentShaderBarycentric "GL_EXT_fragment_shader_barycentric" { predefined: Always }
    ExtFragmentShadingRate "GL_EXT_fragment_shading_rate" { predefined: Always }
    ExtFunctionControlAttributes "GL_EXT_function_control_attributes" {
        predefined: Always,
        keywords: &["inline", "noinline"],
    }
    ExtGeometryPointSize "GL_EXT_geometry_point_size" {}
    ExtGeometryShader "GL_EXT_geometry_shader" { implies: &[ExtShaderIoBlocks] }
    ExtGpuShader5 "GL_EXT_gpu_shader5" {}
    ExtIntegerDotProduct "GL_EXT_integer_dot_product" { predefined: Always }
    ExtLongVector "GL_EXT_long_vector" {}
    ExtMaximalReconvergence "GL_EXT_maximal_reconvergence" { predefined: Always }
    ExtMeshShader "GL_EXT_mesh_shader" {
        predefined: Always,
        minimum_spirv: Some((1, 4)),
        stages: ShaderStageMask::MESH_LIKE.union(ShaderStageMask::FRAGMENT),
        conflicts: &[NvMeshShader],
    }
    ExtMultiview "GL_EXT_multiview" { predefined: Always }
    ExtNontemporalKeyword "GL_EXT_nontemporal_keyword" { predefined: Since(460) }
    ExtNonuniformQualifier "GL_EXT_nonuniform_qualifier" { predefined: Always }
    ExtNullInitializer "GL_EXT_null_initializer" { predefined: Always }
    ExtOpacityMicromap "GL_EXT_opacity_micromap" {}
    ExtOpacityMicromapRayQueryMode "GL_EXT_opacity_micromap_ray_query_mode" {}
    ExtOptionalInputAttachmentIndex "GL_EXT_optional_input_attachment_index" { predefined: Always }
    ExtPostDepthCoverage "GL_EXT_post_depth_coverage" { predefined: Always }
    ExtPrimitiveBoundingBox "GL_EXT_primitive_bounding_box" {}
    ExtRayCullMask "GL_EXT_ray_cull_mask" { predefined: Always }
    ExtRayFlagsPrimitiveCulling "GL_EXT_ray_flags_primitive_culling" { predefined: Always }
    ExtRayQuery "GL_EXT_ray_query" { predefined: Always, keywords: &["rayQueryEXT"] }
    ExtRayTracing "GL_EXT_ray_tracing" {
        predefined: Always,
        minimum_spirv: Some((1, 4)),
        keywords: &[
            "terminateRayEXT",
            "ignoreIntersectionEXT",
            "shadercallcoherent",
            "rayPayloadEXT",
            "rayPayloadInEXT",
            "hitAttributeEXT",
            "callableDataEXT",
            "callableDataInEXT",
            "accelerationStructureEXT",
        ],
    }
    ExtRayTracingPositionFetch "GL_EXT_ray_tracing_position_fetch" { predefined: Always }
    ExtSamplerlessTextureFunctions "GL_EXT_samplerless_texture_functions" { predefined: Always }
    ExtScalarBlockLayout "GL_EXT_scalar_block_layout" { predefined: Always }
    ExtShader16bitStorage "GL_EXT_shader_16bit_storage" { predefined: Always }
    ExtShader64bitIndexing "GL_EXT_shader_64bit_indexing" { predefined: Always }
    ExtShader8bitStorage "GL_EXT_shader_8bit_storage" { predefined: Always }
    ExtShaderAtomicFloat "GL_EXT_shader_atomic_float" { predefined: Always }
    ExtShaderAtomicFloat2 "GL_EXT_shader_atomic_float2" { predefined: Always }
    ExtShaderAtomicInt64 "GL_EXT_shader_atomic_int64" { predefined: Always }
    ExtShaderExplicitArithmeticTypes "GL_EXT_shader_explicit_arithmetic_types" {
        predefined: Always,
    }
    ExtShaderExplicitArithmeticTypesFloat16 "GL_EXT_shader_explicit_arithmetic_types_float16" {
        predefined: Always,
    }
    ExtShaderExplicitArithmeticTypesFloat32 "GL_EXT_shader_explicit_arithmetic_types_float32" {
        predefined: Always,
    }
    ExtShaderExplicitArithmeticTypesFloat64 "GL_EXT_shader_explicit_arithmetic_types_float64" {
        predefined: Always,
    }
    ExtShaderExplicitArithmeticTypesInt16 "GL_EXT_shader_explicit_arithmetic_types_int16" {
        predefined: Always,
    }
    ExtShaderExplicitArithmeticTypesInt32 "GL_EXT_shader_explicit_arithmetic_types_int32" {
        predefined: Always,
    }
    ExtShaderExplicitArithmeticTypesInt64 "GL_EXT_shader_explicit_arithmetic_types_int64" {
        predefined: Always,
    }
    ExtShaderExplicitArithmeticTypesInt8 "GL_EXT_shader_explicit_arithmetic_types_int8" {
        predefined: Always,
    }
    ExtShaderImageInt64 "GL_EXT_shader_image_int64" {
        predefined: Always,
        keywords: &["i64image2DRect", "u64image2DRect"],
    }
    ExtShaderImageLoadFormatted "GL_EXT_shader_image_load_formatted" { predefined: Always }
    ExtShaderImplicitConversions "GL_EXT_shader_implicit_conversions" {}
    ExtShaderIntegerMix "GL_EXT_shader_integer_mix" { predefined: Always }
    ExtShaderInvocationReorder "GL_EXT_shader_invocation_reorder" {
        predefined: Always,
        keywords: &["hitObjectEXT", "hitObjectAttributeEXT"],
    }
    ExtShaderIoBlocks "GL_EXT_shader_io_blocks" {}
    ExtShaderNonConstantGlobalInitializers "GL_EXT_shader_non_constant_global_initializers" {
        predefined: Always,
    }
    ExtShaderQuadControl "GL_EXT_shader_quad_control" { predefined: Always }
    ExtShaderRealtimeClock "GL_EXT_shader_realtime_clock" { predefined: Always }
    ExtShaderSubgroupExtendedTypesFloat16 "GL_EXT_shader_subgroup_extended_types_float16" {
        predefined: Always,
        implies: &[ExtShaderExplicitArithmeticTypesFloat16],
    }
    ExtShaderSubgroupExtendedTypesInt16 "GL_EXT_shader_subgroup_extended_types_int16" {
        predefined: Always,
        implies: &[ExtShaderExplicitArithmeticTypesInt16],
    }
    ExtShaderSubgroupExtendedTypesInt64 "GL_EXT_shader_subgroup_extended_types_int64" {
        predefined: Always,
        implies: &[ExtShaderExplicitArithmeticTypesInt64],
    }
    ExtShaderSubgroupExtendedTypesInt8 "GL_EXT_shader_subgroup_extended_types_int8" {
        predefined: Always,
        implies: &[ExtShaderExplicitArithmeticTypesInt8],
    }
    ExtShaderTextureLod "GL_EXT_shader_texture_lod" {}
    ExtShaderTileImage "GL_EXT_shader_tile_image" {}
    ExtShadowSamplers "GL_EXT_shadow_samplers" {}
    ExtSharedMemoryBlock "GL_EXT_shared_memory_block" { predefined: Always }
    ExtSpecConstantComposites "GL_EXT_spec_constant_composites" { predefined: Always }
    ExtSpirvIntrinsics "GL_EXT_spirv_intrinsics" {
        predefined: Always,
        preprocessor: true,
        string_literals: true,
        keywords: &[
            "spirv_instruction",
            "spirv_execution_mode",
            "spirv_execution_mode_id",
            "spirv_decorate",
            "spirv_decorate_id",
            "spirv_decorate_string",
            "spirv_type",
            "spirv_storage_class",
            "spirv_by_reference",
            "spirv_literal",
        ],
    }
    ExtSplitBarrier "GL_EXT_split_barrier" { predefined: Always }
    ExtStructuredDescriptorHeap "GL_EXT_structured_descriptor_heap" { predefined: Always }
    ExtSubgroupUniformControlFlow "GL_EXT_subgroup_uniform_control_flow" { predefined: Always }
    ExtTerminateInvocation "GL_EXT_terminate_invocation" {
        predefined: Always,
        keywords: &["terminateInvocation"],
    }
    ExtTessellationPointSize "GL_EXT_tessellation_point_size" {}
    ExtTessellationShader "GL_EXT_tessellation_shader" { implies: &[ExtShaderIoBlocks] }
    ExtTextureArray "GL_EXT_texture_array" { predefined: Always }
    ExtTextureBuffer "GL_EXT_texture_buffer" {}
    ExtTextureCubeMapArray "GL_EXT_texture_cube_map_array" {}
    ExtTextureOffsetNonConst "GL_EXT_texture_offset_non_const" { predefined: Always }
    ExtTextureShadowLod "GL_EXT_texture_shadow_lod" {}
    ExtUniformBufferUnsizedArray "GL_EXT_uniform_buffer_unsized_array" { predefined: Always }
    GoogleCppStyleLineDirective "GL_GOOGLE_cpp_style_line_directive" {
        predefined: Always,
        preprocessor: true,
    }
    GoogleIncludeDirective "GL_GOOGLE_include_directive" {
        predefined: Always,
        implies: &[GoogleCppStyleLineDirective],
        preprocessor: true,
    }
    IntelShaderIntegerFunctions2 "GL_INTEL_shader_integer_functions2" { predefined: Always }
    KhrBlendEquationAdvanced "GL_KHR_blend_equation_advanced" { predefined: Always }
    KhrComputeShaderDerivatives "GL_KHR_compute_shader_derivatives" { predefined: Always }
    KhrCooperativeMatrix "GL_KHR_cooperative_matrix" { predefined: Always }
    KhrMemoryScopeSemantics "GL_KHR_memory_scope_semantics" {
        keywords: &[
            "devicecoherent",
            "queuefamilycoherent",
            "workgroupcoherent",
            "subgroupcoherent",
            "nonprivate",
        ],
    }
    KhrShaderSubgroupArithmetic "GL_KHR_shader_subgroup_arithmetic" {
        predefined: Always,
        implies: &[KhrShaderSubgroupBasic],
    }
    KhrShaderSubgroupBallot "GL_KHR_shader_subgroup_ballot" {
        predefined: Always,
        implies: &[KhrShaderSubgroupBasic],
    }
    KhrShaderSubgroupBasic "GL_KHR_shader_subgroup_basic" { predefined: Always }
    KhrShaderSubgroupClustered "GL_KHR_shader_subgroup_clustered" {
        predefined: Always,
        implies: &[KhrShaderSubgroupBasic],
    }
    KhrShaderSubgroupQuad "GL_KHR_shader_subgroup_quad" {
        predefined: Always,
        implies: &[KhrShaderSubgroupBasic],
    }
    KhrShaderSubgroupRotate "GL_KHR_shader_subgroup_rotate" {}
    KhrShaderSubgroupShuffle "GL_KHR_shader_subgroup_shuffle" {
        predefined: Always,
        implies: &[KhrShaderSubgroupBasic],
    }
    KhrShaderSubgroupShuffleRelative "GL_KHR_shader_subgroup_shuffle_relative" {
        predefined: Always,
        implies: &[KhrShaderSubgroupBasic],
    }
    KhrShaderSubgroupVote "GL_KHR_shader_subgroup_vote" {
        predefined: Always,
        implies: &[KhrShaderSubgroupBasic],
    }
    NvxMultiviewPerViewAttributes "GL_NVX_multiview_per_view_attributes" {}
    NvClusterAccelerationStructure "GL_NV_cluster_acceleration_structure" {}
    NvComputeShaderDerivatives "GL_NV_compute_shader_derivatives" { predefined: Always }
    NvConservativeRasterUnderestimation "GL_NV_conservative_raster_underestimation" {
        predefined: Always,
    }
    NvCooperativeMatrix "GL_NV_cooperative_matrix" { predefined: Always }
    NvCooperativeMatrix2 "GL_NV_cooperative_matrix2" {
        predefined: Always,
        implies: &[KhrCooperativeMatrix],
        minimum_spirv: Some((1, 6)),
        keywords: &["__function"],
    }
    NvCooperativeMatrixDecodeVector "GL_NV_cooperative_matrix_decode_vector" {
        predefined: Always,
        minimum_spirv: Some((1, 6)),
    }
    NvCooperativeVector "GL_NV_cooperative_vector" {}
    NvDesktopLowpMediump "GL_NV_desktop_lowp_mediump" { predefined: Always }
    NvDisplacementMicromap "GL_NV_displacement_micromap" {}
    NvExplicitTypecast "GL_NV_explicit_typecast" { predefined: Always }
    NvFragmentShaderBarycentric "GL_NV_fragment_shader_barycentric" { predefined: Always }
    NvGeometryShaderPassthrough "GL_NV_geometry_shader_passthrough" { predefined: Always }
    NvGpuShader5 "GL_NV_gpu_shader5" { predefined: Always }
    NvIntegerCooperativeMatrix "GL_NV_integer_cooperative_matrix" {
        predefined: Always,
        implies: &[NvCooperativeMatrix],
    }
    NvLinearSweptSpheres "GL_NV_linear_swept_spheres" {}
    NvMeshShader "GL_NV_mesh_shader" {
        predefined: Always,
        stages: ShaderStageMask::MESH_LIKE.union(ShaderStageMask::FRAGMENT),
        conflicts: &[ExtMeshShader],
    }
    NvPushConstantBank "GL_NV_push_constant_bank" {}
    NvRayTracing "GL_NV_ray_tracing" {
        predefined: Always,
        keywords: &[
            "rayPayloadNV",
            "rayPayloadInNV",
            "hitAttributeNV",
            "callableDataNV",
            "callableDataInNV",
            "accelerationStructureNV",
        ],
    }
    NvRayTracingMotionBlur "GL_NV_ray_tracing_motion_blur" {
        predefined: Always,
        minimum_spirv: Some((1, 4)),
    }
    NvSampleMaskOverrideCoverage "GL_NV_sample_mask_override_coverage" { predefined: Always }
    NvShaderAtomicFp16Vector "GL_NV_shader_atomic_fp16_vector" {}
    NvShaderAtomicInt64 "GL_NV_shader_atomic_int64" { predefined: Always }
    NvShaderInvocationReorder "GL_NV_shader_invocation_reorder" {
        predefined: Always,
        keywords: &["hitObjectNV", "hitObjectAttributeNV"],
    }
    NvShaderNoperspectiveInterpolation "GL_NV_shader_noperspective_interpolation" {}
    NvShaderSmBuiltins "GL_NV_shader_sm_builtins" { predefined: Always }
    NvShaderSubgroupPartitioned "GL_NV_shader_subgroup_partitioned" {
        predefined: Always,
        implies: &[KhrShaderSubgroupBasic],
    }
    NvShaderTextureFootprint "GL_NV_shader_texture_footprint" { predefined: Always }
    NvShadingRateImage "GL_NV_shading_rate_image" { predefined: Always }
    NvStereoViewRendering "GL_NV_stereo_view_rendering" {}
    NvViewportArray2 "GL_NV_viewport_array2" { predefined: Always }
    OesEglImageExternal "GL_OES_EGL_image_external" { keywords: &["samplerExternalOES"] }
    OesEglImageExternalEssl3 "GL_OES_EGL_image_external_essl3" {}
    OesGeometryPointSize "GL_OES_geometry_point_size" {}
    OesGeometryShader "GL_OES_geometry_shader" { implies: &[OesShaderIoBlocks] }
    OesGpuShader5 "GL_OES_gpu_shader5" {}
    OesPrimitiveBoundingBox "GL_OES_primitive_bounding_box" {}
    OesSampleVariables "GL_OES_sample_variables" {}
    OesShaderImageAtomic "GL_OES_shader_image_atomic" {}
    OesShaderIoBlocks "GL_OES_shader_io_blocks" {}
    OesShaderMultisampleInterpolation "GL_OES_shader_multisample_interpolation" {}
    OesStandardDerivatives "GL_OES_standard_derivatives" {}
    OesTessellationPointSize "GL_OES_tessellation_point_size" {}
    OesTessellationShader "GL_OES_tessellation_shader" { implies: &[OesShaderIoBlocks] }
    OesTexture3d "GL_OES_texture_3D" {}
    OesTextureBuffer "GL_OES_texture_buffer" {}
    OesTextureCubeMapArray "GL_OES_texture_cube_map_array" {}
    OesTextureStorageMultisample2dArray "GL_OES_texture_storage_multisample_2d_array" {}
    OvrMultiview "GL_OVR_multiview" { predefined: Always }
    OvrMultiview2 "GL_OVR_multiview2" { predefined: Always }
    QcomCooperativeMatrixConversion "GL_QCOM_cooperative_matrix_conversion" { predefined: Always }
    QcomImageProcessing "GL_QCOM_image_processing" { predefined: Always }
    QcomImageProcessing2 "GL_QCOM_image_processing2" { predefined: Always }
    QcomImageProcessing3 "GL_QCOM_image_processing3" { predefined: Always }
    QcomMultipleWaitQueues "GL_QCOM_multiple_wait_queues" { predefined: Always }
    QcomTileShading "GL_QCOM_tile_shading" { predefined: Always }
}

const _: () = assert!(
    names_sorted(&Extension::NAMES),
    "extension rows must be sorted by name"
);

const fn precedes(left: &[u8], right: &[u8]) -> bool {
    let (mut left, mut right) = (left, right);
    loop {
        match (left, right) {
            ([first, left_rest @ ..], [second, right_rest @ ..]) => {
                if *first != *second {
                    return *first < *second;
                }
                left = left_rest;
                right = right_rest;
            }
            ([], [_, ..]) => return true,
            _ => return false,
        }
    }
}

const fn names_sorted(names: &[&str]) -> bool {
    let mut rest = names;
    while let [first, tail @ ..] = rest {
        if let [second, ..] = tail
            && !precedes(first.as_bytes(), second.as_bytes())
        {
            return false;
        }
        rest = tail;
    }
    true
}

const fn keyword_count() -> usize {
    let mut count = 0;
    let mut rest = Extension::ALL.as_slice();
    while let [extension, tail @ ..] = rest {
        count += extension.info().keywords.len();
        rest = tail;
    }
    count
}

const fn keyword_table() -> [(&'static str, Extension); keyword_count()] {
    let mut table = [("", Extension::Gl3dlArrayObjects); keyword_count()];
    let mut slots = table.as_mut_slice();
    let mut rest = Extension::ALL.as_slice();
    while let [extension, tail @ ..] = rest {
        let mut words = extension.info().keywords;
        while let [word, others @ ..] = words {
            if let [slot, free @ ..] = slots {
                *slot = (word, *extension);
                slots = free;
            }
            words = others;
        }
        rest = tail;
    }
    table
}

#[derive(Clone, Copy)]
enum Flag {
    Preprocessor,
    StringLiterals,
}

const fn extensions_with(flag: Flag) -> ExtensionSet {
    let mut set = ExtensionSet::EMPTY;
    let mut rest = Extension::ALL.as_slice();
    while let [extension, tail @ ..] = rest {
        let info = extension.info();
        let marked = match flag {
            Flag::Preprocessor => info.preprocessor,
            Flag::StringLiterals => info.string_literals,
        };
        if marked {
            set = set.with(*extension);
        }
        rest = tail;
    }
    set
}

impl Extension {
    pub const KEYWORDS: [(&'static str, Self); keyword_count()] = keyword_table();

    pub const PREPROCESSOR: ExtensionSet = extensions_with(Flag::Preprocessor);

    pub const STRING_LITERALS: ExtensionSet = extensions_with(Flag::StringLiterals);

    pub fn from_name(name: &str) -> Option<Self> {
        Self::NAMES
            .binary_search(&name)
            .ok()
            .and_then(|index| Self::ALL.get(index).copied())
    }

    pub fn of_keyword(word: &str) -> Option<Self> {
        Self::KEYWORDS
            .iter()
            .find(|&&(keyword, _)| keyword == word)
            .map(|&(_, extension)| extension)
    }

    pub fn predefined_at(version: u32) -> impl Iterator<Item = Self> {
        Self::ALL
            .into_iter()
            .filter(move |extension| extension.info().predefined.at(version))
    }

    pub fn with_implied(self) -> ExtensionSet {
        let mut set = ExtensionSet::EMPTY.with(self);
        let mut grown = true;
        while grown {
            grown = false;
            for extension in set.iter() {
                for &implied in extension.info().implies {
                    if !set.contains(implied) {
                        set.set(implied, true);
                        grown = true;
                    }
                }
            }
        }
        set
    }
}

impl core::fmt::Display for Extension {
    fn fmt(&self, formatter: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        formatter.write_str(self.name())
    }
}

const WORDS: usize = Extension::COUNT.div_ceil(64);

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Hash)]
pub struct ExtensionSet {
    words: [u64; WORDS],
}

impl ExtensionSet {
    pub const EMPTY: Self = Self { words: [0; WORDS] };

    pub const ALL: Self = Self::of(&Extension::ALL);

    const fn split(extension: Extension) -> (usize, u64) {
        let index = extension as usize;
        (index / 64, 1 << (index % 64))
    }

    pub const fn of(extensions: &[Extension]) -> Self {
        let mut set = Self::EMPTY;
        let mut rest = extensions;
        while let [extension, tail @ ..] = rest {
            set = set.with(*extension);
            rest = tail;
        }
        set
    }

    pub const fn with(self, extension: Extension) -> Self {
        let (word, bit) = Self::split(extension);
        let mut words = self.words;
        if let Some((_, rest)) = words.split_at_mut_checked(word)
            && let [slot, ..] = rest
        {
            *slot |= bit;
        }
        Self { words }
    }

    pub const fn contains(&self, extension: Extension) -> bool {
        let (word, bit) = Self::split(extension);
        match self.words.split_at_checked(word) {
            Some((_, [slot, ..])) => *slot & bit != 0,
            _ => false,
        }
    }

    pub fn contains_any(&self, extensions: &[Extension]) -> bool {
        extensions.iter().any(|&extension| self.contains(extension))
    }

    pub fn set(&mut self, extension: Extension, on: bool) {
        let (word, bit) = Self::split(extension);
        if let Some(slot) = self.words.get_mut(word) {
            if on {
                *slot |= bit;
            } else {
                *slot &= !bit;
            }
        }
    }

    pub const fn is_empty(&self) -> bool {
        let mut rest = self.words.as_slice();
        while let [word, tail @ ..] = rest {
            if *word != 0 {
                return false;
            }
            rest = tail;
        }
        true
    }

    pub fn intersection(self, other: Self) -> Self {
        let mut words = self.words;
        for (word, other) in words.iter_mut().zip(other.words) {
            *word &= other;
        }
        Self { words }
    }

    pub fn iter(self) -> impl Iterator<Item = Extension> {
        Extension::ALL
            .into_iter()
            .filter(move |extension| self.contains(*extension))
    }
}

#[cfg(test)]
mod tests {
    use alloc::vec::Vec;

    use super::{Extension, ExtensionSet, Info, Predefined};

    #[test]
    fn every_name_finds_its_extension() {
        for (index, extension) in Extension::ALL.into_iter().enumerate() {
            assert_eq!(extension as usize, index);
            assert_eq!(Extension::from_name(extension.name()), Some(extension));
        }
        assert_eq!(Extension::from_name("GL_EXT_ABORT"), None);
        assert_eq!(Extension::COUNT, 233);
    }

    #[test]
    fn conflicts_are_mutual_and_implications_end() {
        for extension in Extension::ALL {
            let info: &Info = extension.info();
            for other in info.conflicts {
                assert!(other.info().conflicts.contains(&extension), "{extension:?}");
            }
            let mut pending: Vec<Extension> = info.implies.to_vec();
            let mut seen = ExtensionSet::EMPTY;
            while let Some(next) = pending.pop() {
                assert_ne!(next, extension, "{extension:?} implies itself");
                if !seen.contains(next) {
                    seen.set(next, true);
                    pending.extend_from_slice(next.info().implies);
                }
            }
        }
    }

    #[test]
    fn the_preprocessor_tracks_string_literal_extensions() {
        assert_eq!(
            Extension::STRING_LITERALS.intersection(Extension::PREPROCESSOR),
            Extension::STRING_LITERALS
        );
    }

    #[test]
    fn keywords_belong_to_one_extension() {
        let mut words: Vec<&str> = Extension::KEYWORDS.iter().map(|&(word, _)| word).collect();
        words.sort_unstable();
        let count = words.len();
        words.dedup();
        assert_eq!(words.len(), count);
        assert_eq!(
            Extension::of_keyword("demote"),
            Some(Extension::ExtDemoteToHelperInvocation)
        );
        assert_eq!(Extension::of_keyword("float"), None);
    }

    #[test]
    fn sets_hold_every_extension() {
        let mut set = ExtensionSet::EMPTY;
        for extension in Extension::ALL {
            assert!(!set.contains(extension));
            set.set(extension, true);
            assert!(set.contains(extension));
        }
        assert_eq!(set, ExtensionSet::ALL);
        assert_eq!(set.iter().count(), Extension::COUNT);
        set.set(Extension::ExtAbort, false);
        assert!(!set.contains(Extension::ExtAbort));
        assert_eq!(
            ExtensionSet::EMPTY
                .with(Extension::ExtAbort)
                .iter()
                .collect::<Vec<_>>(),
            [Extension::ExtAbort]
        );
        assert!(Extension::PREPROCESSOR.contains(Extension::ExtSpirvIntrinsics));
        assert!(ExtensionSet::EMPTY.is_empty());
        assert!(set.contains_any(&[Extension::ExtAbort, Extension::ExtBfloat16]));
        assert!(!ExtensionSet::EMPTY.contains_any(&[Extension::ExtBfloat16]));
        assert!(!Extension::STRING_LITERALS.is_empty());
        assert_eq!(
            Extension::ArmTensors.info().predefined,
            Predefined::Since(460)
        );
        assert!(Extension::predefined_at(450).all(|extension| extension != Extension::ArmTensors));
        assert!(Extension::predefined_at(460).any(|extension| extension == Extension::ArmTensors));
    }
}
