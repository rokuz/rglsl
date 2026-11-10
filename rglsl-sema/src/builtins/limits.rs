macro_rules! resource_limits {
    ($($field:ident : $name:literal = $value:expr,)*) => {
        #[derive(Debug, Clone, Copy, PartialEq, Eq)]
        pub struct ResourceLimits {
            $(pub $field: i32,)*
            pub max_compute_work_group_count: [i32; 3],
            pub max_compute_work_group_size: [i32; 3],
            pub max_mesh_work_group_size_nv: [i32; 3],
            pub max_task_work_group_size_nv: [i32; 3],
            pub max_mesh_output_vertices_ext: i32,
            pub max_mesh_output_primitives_ext: i32,
            pub max_mesh_work_group_size_ext: [i32; 3],
            pub max_task_work_group_size_ext: [i32; 3],
        }

        impl Default for ResourceLimits {
            fn default() -> Self {
                Self {
                    $($field: $value,)*
                    max_compute_work_group_count: [65535, 65535, 65535],
                    max_compute_work_group_size: [1024, 1024, 64],
                    max_mesh_work_group_size_nv: [32, 1, 1],
                    max_task_work_group_size_nv: [32, 1, 1],
                    max_mesh_output_vertices_ext: 256,
                    max_mesh_output_primitives_ext: 256,
                    max_mesh_work_group_size_ext: [128, 128, 128],
                    max_task_work_group_size_ext: [128, 128, 128],
                }
            }
        }

        impl ResourceLimits {
            pub fn integer_constants(&self) -> alloc::vec::Vec<(&'static str, i32)> {
                alloc::vec![$(($name, self.$field),)*]
            }
        }
    };
}

resource_limits! {
    max_vertex_uniform_vectors: "gl_MaxVertexUniformVectors" = 128,
    max_fragment_uniform_vectors: "gl_MaxFragmentUniformVectors" = 16,
    max_varying_vectors: "gl_MaxVaryingVectors" = 8,
    max_vertex_attribs: "gl_MaxVertexAttribs" = 64,
    max_vertex_texture_image_units: "gl_MaxVertexTextureImageUnits" = 32,
    max_combined_texture_image_units: "gl_MaxCombinedTextureImageUnits" = 80,
    max_texture_image_units: "gl_MaxTextureImageUnits" = 32,
    max_draw_buffers: "gl_MaxDrawBuffers" = 32,
    max_lights: "gl_MaxLights" = 32,
    max_clip_planes: "gl_MaxClipPlanes" = 6,
    max_texture_units: "gl_MaxTextureUnits" = 32,
    max_texture_coords: "gl_MaxTextureCoords" = 32,
    max_vertex_uniform_components: "gl_MaxVertexUniformComponents" = 4096,
    max_fragment_uniform_components: "gl_MaxFragmentUniformComponents" = 4096,
    max_clip_distances: "gl_MaxClipDistances" = 8,
    max_varying_components: "gl_MaxVaryingComponents" = 60,
    min_program_texel_offset: "gl_MinProgramTexelOffset" = -8,
    max_program_texel_offset: "gl_MaxProgramTexelOffset" = 7,
    max_geometry_input_components: "gl_MaxGeometryInputComponents" = 64,
    max_geometry_output_components: "gl_MaxGeometryOutputComponents" = 128,
    max_geometry_texture_image_units: "gl_MaxGeometryTextureImageUnits" = 16,
    max_geometry_output_vertices: "gl_MaxGeometryOutputVertices" = 256,
    max_geometry_total_output_components: "gl_MaxGeometryTotalOutputComponents" = 1024,
    max_geometry_uniform_components: "gl_MaxGeometryUniformComponents" = 1024,
    max_geometry_varying_components: "gl_MaxGeometryVaryingComponents" = 64,
    max_vertex_output_components: "gl_MaxVertexOutputComponents" = 64,
    max_fragment_input_components: "gl_MaxFragmentInputComponents" = 128,
    max_tess_control_input_components: "gl_MaxTessControlInputComponents" = 128,
    max_tess_control_output_components: "gl_MaxTessControlOutputComponents" = 128,
    max_tess_control_texture_image_units: "gl_MaxTessControlTextureImageUnits" = 16,
    max_tess_control_uniform_components: "gl_MaxTessControlUniformComponents" = 1024,
    max_tess_control_total_output_components: "gl_MaxTessControlTotalOutputComponents" = 4096,
    max_tess_evaluation_input_components: "gl_MaxTessEvaluationInputComponents" = 128,
    max_tess_evaluation_output_components: "gl_MaxTessEvaluationOutputComponents" = 128,
    max_tess_evaluation_texture_image_units: "gl_MaxTessEvaluationTextureImageUnits" = 16,
    max_tess_evaluation_uniform_components: "gl_MaxTessEvaluationUniformComponents" = 1024,
    max_tess_patch_components: "gl_MaxTessPatchComponents" = 120,
    max_tess_gen_level: "gl_MaxTessGenLevel" = 64,
    max_patch_vertices: "gl_MaxPatchVertices" = 32,
    max_viewports: "gl_MaxViewports" = 16,
    max_combined_image_units_and_fragment_outputs: "gl_MaxCombinedImageUnitsAndFragmentOutputs" = 8,
    max_image_samples: "gl_MaxImageSamples" = 0,
    max_tess_control_image_uniforms: "gl_MaxTessControlImageUniforms" = 0,
    max_tess_evaluation_image_uniforms: "gl_MaxTessEvaluationImageUniforms" = 0,
    max_geometry_image_uniforms: "gl_MaxGeometryImageUniforms" = 0,
    max_transform_feedback_buffers: "gl_MaxTransformFeedbackBuffers" = 4,
    max_transform_feedback_interleaved_components: "gl_MaxTransformFeedbackInterleavedComponents" = 64,
    max_compute_uniform_components: "gl_MaxComputeUniformComponents" = 1024,
    max_compute_texture_image_units: "gl_MaxComputeTextureImageUnits" = 16,
    max_image_units: "gl_MaxImageUnits" = 8,
    max_combined_shader_output_resources: "gl_MaxCombinedShaderOutputResources" = 8,
    max_vertex_image_uniforms: "gl_MaxVertexImageUniforms" = 0,
    max_fragment_image_uniforms: "gl_MaxFragmentImageUniforms" = 8,
    max_combined_image_uniforms: "gl_MaxCombinedImageUniforms" = 8,
    max_compute_image_uniforms: "gl_MaxComputeImageUniforms" = 8,
    max_compute_atomic_counters: "gl_MaxComputeAtomicCounters" = 8,
    max_compute_atomic_counter_buffers: "gl_MaxComputeAtomicCounterBuffers" = 1,
    max_vertex_atomic_counters: "gl_MaxVertexAtomicCounters" = 0,
    max_fragment_atomic_counters: "gl_MaxFragmentAtomicCounters" = 8,
    max_combined_atomic_counters: "gl_MaxCombinedAtomicCounters" = 8,
    max_atomic_counter_bindings: "gl_MaxAtomicCounterBindings" = 1,
    max_vertex_atomic_counter_buffers: "gl_MaxVertexAtomicCounterBuffers" = 0,
    max_fragment_atomic_counter_buffers: "gl_MaxFragmentAtomicCounterBuffers" = 1,
    max_combined_atomic_counter_buffers: "gl_MaxCombinedAtomicCounterBuffers" = 1,
    max_atomic_counter_buffer_size: "gl_MaxAtomicCounterBufferSize" = 16384,
    max_tess_control_atomic_counters: "gl_MaxTessControlAtomicCounters" = 0,
    max_tess_evaluation_atomic_counters: "gl_MaxTessEvaluationAtomicCounters" = 0,
    max_geometry_atomic_counters: "gl_MaxGeometryAtomicCounters" = 0,
    max_tess_control_atomic_counter_buffers: "gl_MaxTessControlAtomicCounterBuffers" = 0,
    max_tess_evaluation_atomic_counter_buffers: "gl_MaxTessEvaluationAtomicCounterBuffers" = 0,
    max_geometry_atomic_counter_buffers: "gl_MaxGeometryAtomicCounterBuffers" = 0,
    max_cull_distances: "gl_MaxCullDistances" = 8,
    max_combined_clip_and_cull_distances: "gl_MaxCombinedClipAndCullDistances" = 8,
    max_samples: "gl_MaxSamples" = 4,
    max_mesh_output_vertices_nv: "gl_MaxMeshOutputVerticesNV" = 256,
    max_mesh_output_primitives_nv: "gl_MaxMeshOutputPrimitivesNV" = 512,
    max_mesh_view_count_nv: "gl_MaxMeshViewCountNV" = 4,
}
