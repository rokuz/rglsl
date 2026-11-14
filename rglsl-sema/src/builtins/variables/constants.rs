use rglsl_types::extension::Extension::{self, *};

use super::BuiltinVariable;
use super::ConstantValue::*;
use super::VariableKind::Constant;
use crate::builtins::{ALL_STAGE_BITS, COMPUTE, MESH, TASK};

pub(crate) const TENSOR_OPERAND_NONTEMPORAL: u32 = 0x1;
pub(crate) const TENSOR_OPERAND_OUT_OF_BOUNDS_VALUE: u32 = 0x2;

const MESH_STAGES: u16 = MESH | TASK;
const OTHER_STAGES: u16 = ALL_STAGE_BITS & !MESH_STAGES;
const MESH_ANY: &[Extension] = &[NvMeshShader, ExtMeshShader];
const MEMORY_SCOPE_SEMANTICS: &[Extension] = &[KhrMemoryScopeSemantics];

pub(super) const CONSTANTS: &[BuiltinVariable] = variables! {
    "gl_MaxLights": Constant(Limit(|limits| limits.max_lights)) => int
    "gl_MaxClipPlanes": Constant(Limit(|limits| limits.max_clip_planes)) => int
    "gl_MaxTextureUnits": Constant(Limit(|limits| limits.max_texture_units)) => int
    "gl_MaxTextureCoords": Constant(Limit(|limits| limits.max_texture_coords)) => int
    "gl_MaxVertexAttribs": Constant(Limit(|limits| limits.max_vertex_attribs)) => int
    "gl_MaxVertexUniformComponents": Constant(Limit(|limits| limits.max_vertex_uniform_components)) => int
    "gl_MaxVertexTextureImageUnits": Constant(Limit(|limits| limits.max_vertex_texture_image_units)) => int
    "gl_MaxCombinedTextureImageUnits": Constant(Limit(|limits| limits.max_combined_texture_image_units)) => int
    "gl_MaxTextureImageUnits": Constant(Limit(|limits| limits.max_texture_image_units)) => int
    "gl_MaxFragmentUniformComponents": Constant(Limit(|limits| limits.max_fragment_uniform_components)) => int
    "gl_MaxDrawBuffers": Constant(Limit(|limits| limits.max_draw_buffers)) => int
    "gl_MaxVertexUniformVectors": Constant(Limit(|limits| limits.max_vertex_uniform_vectors)) => int
    "gl_MaxVaryingVectors": Constant(Limit(|limits| limits.max_varying_vectors)) => int
    "gl_MaxFragmentUniformVectors": Constant(Limit(|limits| limits.max_fragment_uniform_vectors)) => int
    "gl_MinProgramTexelOffset": Constant(Limit(|limits| limits.min_program_texel_offset)) => int
    "gl_MaxProgramTexelOffset": Constant(Limit(|limits| limits.max_program_texel_offset)) => int
    "gl_MaxClipDistances": Constant(Limit(|limits| limits.max_clip_distances)) => int
    "gl_MaxComputeUniformComponents": Constant(Limit(|limits| limits.max_compute_uniform_components)) => int
    "gl_MaxComputeTextureImageUnits": Constant(Limit(|limits| limits.max_compute_texture_image_units)) => int
    "gl_MaxComputeImageUniforms": Constant(Limit(|limits| limits.max_compute_image_uniforms)) => int
    "gl_MaxComputeAtomicCounters": Constant(Limit(|limits| limits.max_compute_atomic_counters)) => int
    "gl_MaxComputeAtomicCounterBuffers": Constant(Limit(|limits| limits.max_compute_atomic_counter_buffers)) => int
    "gl_MaxVaryingComponents": Constant(Limit(|limits| limits.max_varying_components)) => int
    "gl_MaxVertexOutputComponents": Constant(Limit(|limits| limits.max_vertex_output_components)) => int
    "gl_MaxGeometryInputComponents": Constant(Limit(|limits| limits.max_geometry_input_components)) => int
    "gl_MaxGeometryOutputComponents": Constant(Limit(|limits| limits.max_geometry_output_components)) => int
    "gl_MaxFragmentInputComponents": Constant(Limit(|limits| limits.max_fragment_input_components)) => int
    "gl_MaxImageUnits": Constant(Limit(|limits| limits.max_image_units)) => int
    "gl_MaxCombinedImageUnitsAndFragmentOutputs": Constant(Limit(|limits| limits.max_combined_image_units_and_fragment_outputs)) => int
    "gl_MaxCombinedShaderOutputResources": Constant(Limit(|limits| limits.max_combined_shader_output_resources)) => int
    "gl_MaxImageSamples": Constant(Limit(|limits| limits.max_image_samples)) => int
    "gl_MaxVertexImageUniforms": Constant(Limit(|limits| limits.max_vertex_image_uniforms)) => int
    "gl_MaxTessControlImageUniforms": Constant(Limit(|limits| limits.max_tess_control_image_uniforms)) => int
    "gl_MaxTessEvaluationImageUniforms": Constant(Limit(|limits| limits.max_tess_evaluation_image_uniforms)) => int
    "gl_MaxGeometryImageUniforms": Constant(Limit(|limits| limits.max_geometry_image_uniforms)) => int
    "gl_MaxFragmentImageUniforms": Constant(Limit(|limits| limits.max_fragment_image_uniforms)) => int
    "gl_MaxCombinedImageUniforms": Constant(Limit(|limits| limits.max_combined_image_uniforms)) => int
    "gl_MaxGeometryTextureImageUnits": Constant(Limit(|limits| limits.max_geometry_texture_image_units)) => int
    "gl_MaxGeometryOutputVertices": Constant(Limit(|limits| limits.max_geometry_output_vertices)) => int
    "gl_MaxGeometryTotalOutputComponents": Constant(Limit(|limits| limits.max_geometry_total_output_components)) => int
    "gl_MaxGeometryUniformComponents": Constant(Limit(|limits| limits.max_geometry_uniform_components)) => int
    "gl_MaxGeometryVaryingComponents": Constant(Limit(|limits| limits.max_geometry_varying_components)) => int
    "gl_MaxTessControlInputComponents": Constant(Limit(|limits| limits.max_tess_control_input_components)) => int
    "gl_MaxTessControlOutputComponents": Constant(Limit(|limits| limits.max_tess_control_output_components)) => int
    "gl_MaxTessControlTextureImageUnits": Constant(Limit(|limits| limits.max_tess_control_texture_image_units)) => int
    "gl_MaxTessControlUniformComponents": Constant(Limit(|limits| limits.max_tess_control_uniform_components)) => int
    "gl_MaxTessControlTotalOutputComponents": Constant(Limit(|limits| limits.max_tess_control_total_output_components)) => int
    "gl_MaxTessEvaluationInputComponents": Constant(Limit(|limits| limits.max_tess_evaluation_input_components)) => int
    "gl_MaxTessEvaluationOutputComponents": Constant(Limit(|limits| limits.max_tess_evaluation_output_components)) => int
    "gl_MaxTessEvaluationTextureImageUnits": Constant(Limit(|limits| limits.max_tess_evaluation_texture_image_units)) => int
    "gl_MaxTessEvaluationUniformComponents": Constant(Limit(|limits| limits.max_tess_evaluation_uniform_components)) => int
    "gl_MaxTessPatchComponents": Constant(Limit(|limits| limits.max_tess_patch_components)) => int
    "gl_MaxPatchVertices": Constant(Limit(|limits| limits.max_patch_vertices)) => int
    "gl_MaxTessGenLevel": Constant(Limit(|limits| limits.max_tess_gen_level)) => int
    "gl_MaxViewports": Constant(Limit(|limits| limits.max_viewports)) => int
    "gl_MaxVertexAtomicCounters": Constant(Limit(|limits| limits.max_vertex_atomic_counters)) => int
    "gl_MaxTessControlAtomicCounters": Constant(Limit(|limits| limits.max_tess_control_atomic_counters)) => int
    "gl_MaxTessEvaluationAtomicCounters": Constant(Limit(|limits| limits.max_tess_evaluation_atomic_counters)) => int
    "gl_MaxGeometryAtomicCounters": Constant(Limit(|limits| limits.max_geometry_atomic_counters)) => int
    "gl_MaxFragmentAtomicCounters": Constant(Limit(|limits| limits.max_fragment_atomic_counters)) => int
    "gl_MaxCombinedAtomicCounters": Constant(Limit(|limits| limits.max_combined_atomic_counters)) => int
    "gl_MaxAtomicCounterBindings": Constant(Limit(|limits| limits.max_atomic_counter_bindings)) => int
    "gl_MaxVertexAtomicCounterBuffers": Constant(Limit(|limits| limits.max_vertex_atomic_counter_buffers)) => int
    "gl_MaxTessControlAtomicCounterBuffers": Constant(Limit(|limits| limits.max_tess_control_atomic_counter_buffers)) => int
    "gl_MaxTessEvaluationAtomicCounterBuffers": Constant(Limit(|limits| limits.max_tess_evaluation_atomic_counter_buffers)) => int
    "gl_MaxGeometryAtomicCounterBuffers": Constant(Limit(|limits| limits.max_geometry_atomic_counter_buffers)) => int
    "gl_MaxFragmentAtomicCounterBuffers": Constant(Limit(|limits| limits.max_fragment_atomic_counter_buffers)) => int
    "gl_MaxCombinedAtomicCounterBuffers": Constant(Limit(|limits| limits.max_combined_atomic_counter_buffers)) => int
    "gl_MaxAtomicCounterBufferSize": Constant(Limit(|limits| limits.max_atomic_counter_buffer_size)) => int
    "gl_MaxTransformFeedbackBuffers": Constant(Limit(|limits| limits.max_transform_feedback_buffers)) => int
    "gl_MaxTransformFeedbackInterleavedComponents": Constant(Limit(|limits| limits.max_transform_feedback_interleaved_components)) => int
    "gl_MaxCullDistances": Constant(Limit(|limits| limits.max_cull_distances)) => int
    "gl_MaxCombinedClipAndCullDistances": Constant(Limit(|limits| limits.max_combined_clip_and_cull_distances)) => int
    "gl_MaxSamples": Constant(Limit(|limits| limits.max_samples)) => int
    "gl_MaxMeshOutputVerticesNV": Constant(Limit(|limits| limits.max_mesh_output_vertices_nv)) => int {
        stages: MESH_STAGES,
        requires_one_of: &[NvMeshShader],
    }
    "gl_MaxMeshOutputVerticesNV": Constant(Limit(|limits| limits.max_mesh_output_vertices_nv)) => int { stages: OTHER_STAGES }
    "gl_MaxMeshOutputPrimitivesNV": Constant(Limit(|limits| limits.max_mesh_output_primitives_nv)) => int {
        stages: MESH_STAGES,
        requires_one_of: &[NvMeshShader],
    }
    "gl_MaxMeshOutputPrimitivesNV": Constant(Limit(|limits| limits.max_mesh_output_primitives_nv)) => int { stages: OTHER_STAGES }
    "gl_MaxMeshViewCountNV": Constant(Limit(|limits| limits.max_mesh_view_count_nv)) => int {
        stages: MESH_STAGES,
        requires_one_of: &[NvMeshShader],
    }
    "gl_MaxMeshViewCountNV": Constant(Limit(|limits| limits.max_mesh_view_count_nv)) => int { stages: OTHER_STAGES }
    "gl_ScopeDevice": Constant(Int(1)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_ScopeWorkgroup": Constant(Int(2)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_ScopeSubgroup": Constant(Int(3)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_ScopeInvocation": Constant(Int(4)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_ScopeQueueFamily": Constant(Int(5)) => int
    "gl_ScopeShaderCallEXT": Constant(Int(6)) => int
    "gl_SemanticsRelaxed": Constant(Int(0x0)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_SemanticsAcquire": Constant(Int(0x2)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_SemanticsRelease": Constant(Int(0x4)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_SemanticsAcquireRelease": Constant(Int(0x8)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_SemanticsMakeAvailable": Constant(Int(0x2000)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_SemanticsMakeVisible": Constant(Int(0x4000)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_SemanticsVolatile": Constant(Int(0x8000)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_StorageSemanticsNone": Constant(Int(0x0)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_StorageSemanticsBuffer": Constant(Int(0x40)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_StorageSemanticsShared": Constant(Int(0x100)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_StorageSemanticsImage": Constant(Int(0x800)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_StorageSemanticsOutput": Constant(Int(0x1000)) => int { requires_one_of: MEMORY_SCOPE_SEMANTICS }
    "gl_MatrixUseA": Constant(Int(0)) => int
    "gl_MatrixUseB": Constant(Int(1)) => int
    "gl_MatrixUseAccumulator": Constant(Int(2)) => int
    "gl_MatrixOperandsSaturatingAccumulation": Constant(Int(0x10)) => int
    "gl_CooperativeMatrixLayoutRowMajor": Constant(Int(0)) => int
    "gl_CooperativeMatrixLayoutColumnMajor": Constant(Int(1)) => int
    "gl_CooperativeMatrixLayoutRowBlockedInterleavedARM": Constant(Int(4202)) => int
    "gl_CooperativeMatrixLayoutColumnBlockedInterleavedARM": Constant(Int(4203)) => int
    "gl_CooperativeMatrixReduceRowNV": Constant(Int(0x1)) => int
    "gl_CooperativeMatrixReduceColumnNV": Constant(Int(0x2)) => int
    "gl_CooperativeMatrixReduceRowAndColumnNV": Constant(Int(0x3)) => int
    "gl_CooperativeMatrixReduce2x2NV": Constant(Int(0x4)) => int
    "gl_CooperativeMatrixReduceRowEXT": Constant(Int(0x1)) => int
    "gl_CooperativeMatrixReduceColumnEXT": Constant(Int(0x2)) => int
    "gl_CooperativeMatrixReduceRowAndColumnEXT": Constant(Int(0x3)) => int
    "gl_CooperativeMatrixReduce2x2EXT": Constant(Int(0x4)) => int
    "gl_CooperativeMatrixClampModeUndefinedNV": Constant(Int(0x0)) => int
    "gl_CooperativeMatrixClampModeConstantNV": Constant(Int(0x1)) => int
    "gl_CooperativeMatrixClampModeClampToEdgeNV": Constant(Int(0x2)) => int
    "gl_CooperativeMatrixClampModeRepeatNV": Constant(Int(0x3)) => int
    "gl_CooperativeMatrixClampModeMirrorRepeatNV": Constant(Int(0x4)) => int
    "gl_CooperativeVectorMatrixLayoutRowMajorNV": Constant(Int(0)) => int
    "gl_CooperativeVectorMatrixLayoutColumnMajorNV": Constant(Int(1)) => int
    "gl_CooperativeVectorMatrixLayoutInferencingOptimalNV": Constant(Int(2)) => int
    "gl_CooperativeVectorMatrixLayoutTrainingOptimalNV": Constant(Int(3)) => int
    "gl_ComponentTypeFloat16NV": Constant(Int(0)) => int
    "gl_ComponentTypeFloat32NV": Constant(Int(1)) => int
    "gl_ComponentTypeFloat64NV": Constant(Int(2)) => int
    "gl_ComponentTypeSignedInt8NV": Constant(Int(3)) => int
    "gl_ComponentTypeSignedInt16NV": Constant(Int(4)) => int
    "gl_ComponentTypeSignedInt32NV": Constant(Int(5)) => int
    "gl_ComponentTypeSignedInt64NV": Constant(Int(6)) => int
    "gl_ComponentTypeUnsignedInt8NV": Constant(Int(7)) => int
    "gl_ComponentTypeUnsignedInt16NV": Constant(Int(8)) => int
    "gl_ComponentTypeUnsignedInt32NV": Constant(Int(9)) => int
    "gl_ComponentTypeUnsignedInt64NV": Constant(Int(10)) => int
    "gl_ComponentTypeSignedInt8PackedNV": Constant(Int(1_000_491_000)) => int
    "gl_ComponentTypeUnsignedInt8PackedNV": Constant(Int(1_000_491_001)) => int
    "gl_ComponentTypeFloatE4M3NV": Constant(Int(1_000_491_002)) => int
    "gl_ComponentTypeFloatE5M2NV": Constant(Int(1_000_491_003)) => int
    "gl_ShadingRateFlag2VerticalPixelsEXT": Constant(Int(1)) => int { requires_one_of: &[ExtFragmentShadingRate] }
    "gl_ShadingRateFlag4VerticalPixelsEXT": Constant(Int(2)) => int { requires_one_of: &[ExtFragmentShadingRate] }
    "gl_ShadingRateFlag2HorizontalPixelsEXT": Constant(Int(4)) => int { requires_one_of: &[ExtFragmentShadingRate] }
    "gl_ShadingRateFlag4HorizontalPixelsEXT": Constant(Int(8)) => int { requires_one_of: &[ExtFragmentShadingRate] }
    "gl_TensorOperandsNonTemporalARM": Constant(Uint(TENSOR_OPERAND_NONTEMPORAL)) => uint
    "gl_TensorOperandsOutOfBoundsValueARM": Constant(Uint(TENSOR_OPERAND_OUT_OF_BOUNDS_VALUE)) => uint
    "gl_MaxComputeWorkGroupCount": Constant(Limits(|limits| limits.max_compute_work_group_count())) => ivec3
    "gl_MaxComputeWorkGroupSize": Constant(Limits(|limits| limits.max_compute_work_group_size())) => ivec3
    "gl_MaxMeshWorkGroupSizeNV": Constant(Limits(|limits| limits.max_mesh_work_group_size_nv())) => ivec3 {
        stages: MESH_STAGES,
        requires_one_of: &[NvMeshShader],
    }
    "gl_MaxMeshWorkGroupSizeNV": Constant(Limits(|limits| limits.max_mesh_work_group_size_nv())) => ivec3 {
        stages: OTHER_STAGES,
    }
    "gl_MaxTaskWorkGroupSizeNV": Constant(Limits(|limits| limits.max_task_work_group_size_nv())) => ivec3 {
        stages: MESH_STAGES,
        requires_one_of: &[NvMeshShader],
    }
    "gl_MaxTaskWorkGroupSizeNV": Constant(Limits(|limits| limits.max_task_work_group_size_nv())) => ivec3 {
        stages: OTHER_STAGES,
    }
    "gl_WorkGroupSize": Constant(LocalSize) => uvec3 { stages: COMPUTE }
    "gl_WorkGroupSize": Constant(LocalSize) => uvec3 {
        stages: MESH_STAGES,
        requires_one_of: MESH_ANY,
    }
};
