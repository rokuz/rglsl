macro_rules! resource_limits {
    ($($field:ident : $config:literal = $value:expr,)*) => {
        #[derive(Debug, Clone, Copy, PartialEq, Eq)]
        pub struct ResourceLimits {
            $(pub $field: i32,)*
        }

        impl Default for ResourceLimits {
            fn default() -> Self {
                Self {
                    $($field: $value,)*
                }
            }
        }

        impl ResourceLimits {
            pub const fn zeroed() -> Self {
                Self {
                    $($field: 0,)*
                }
            }

            pub fn entries(&self) -> alloc::vec::Vec<(&'static str, i32)> {
                alloc::vec![$(($config, self.$field),)*]
            }

            pub fn set(&mut self, name: &str, value: i32) -> bool {
                match name {
                    $($config => self.$field = value,)*
                    _ => return false,
                }
                true
            }
        }
    };
}

resource_limits! {
    max_lights: "MaxLights" = 32,
    max_clip_planes: "MaxClipPlanes" = 6,
    max_texture_units: "MaxTextureUnits" = 32,
    max_texture_coords: "MaxTextureCoords" = 32,
    max_vertex_attribs: "MaxVertexAttribs" = 64,
    max_vertex_uniform_components: "MaxVertexUniformComponents" = 4096,
    max_varying_floats: "MaxVaryingFloats" = 64,
    max_vertex_texture_image_units: "MaxVertexTextureImageUnits" = 32,
    max_combined_texture_image_units: "MaxCombinedTextureImageUnits" = 80,
    max_texture_image_units: "MaxTextureImageUnits" = 32,
    max_fragment_uniform_components: "MaxFragmentUniformComponents" = 4096,
    max_draw_buffers: "MaxDrawBuffers" = 32,
    max_vertex_uniform_vectors: "MaxVertexUniformVectors" = 128,
    max_varying_vectors: "MaxVaryingVectors" = 8,
    max_fragment_uniform_vectors: "MaxFragmentUniformVectors" = 16,
    max_vertex_output_vectors: "MaxVertexOutputVectors" = 16,
    max_fragment_input_vectors: "MaxFragmentInputVectors" = 15,
    min_program_texel_offset: "MinProgramTexelOffset" = -8,
    max_program_texel_offset: "MaxProgramTexelOffset" = 7,
    max_clip_distances: "MaxClipDistances" = 8,
    max_compute_work_group_count_x: "MaxComputeWorkGroupCountX" = 65535,
    max_compute_work_group_count_y: "MaxComputeWorkGroupCountY" = 65535,
    max_compute_work_group_count_z: "MaxComputeWorkGroupCountZ" = 65535,
    max_compute_work_group_size_x: "MaxComputeWorkGroupSizeX" = 1024,
    max_compute_work_group_size_y: "MaxComputeWorkGroupSizeY" = 1024,
    max_compute_work_group_size_z: "MaxComputeWorkGroupSizeZ" = 64,
    max_compute_uniform_components: "MaxComputeUniformComponents" = 1024,
    max_compute_texture_image_units: "MaxComputeTextureImageUnits" = 16,
    max_compute_image_uniforms: "MaxComputeImageUniforms" = 8,
    max_compute_atomic_counters: "MaxComputeAtomicCounters" = 8,
    max_compute_atomic_counter_buffers: "MaxComputeAtomicCounterBuffers" = 1,
    max_varying_components: "MaxVaryingComponents" = 60,
    max_vertex_output_components: "MaxVertexOutputComponents" = 64,
    max_geometry_input_components: "MaxGeometryInputComponents" = 64,
    max_geometry_output_components: "MaxGeometryOutputComponents" = 128,
    max_fragment_input_components: "MaxFragmentInputComponents" = 128,
    max_image_units: "MaxImageUnits" = 8,
    max_combined_image_units_and_fragment_outputs: "MaxCombinedImageUnitsAndFragmentOutputs" = 8,
    max_combined_shader_output_resources: "MaxCombinedShaderOutputResources" = 8,
    max_image_samples: "MaxImageSamples" = 0,
    max_vertex_image_uniforms: "MaxVertexImageUniforms" = 0,
    max_tess_control_image_uniforms: "MaxTessControlImageUniforms" = 0,
    max_tess_evaluation_image_uniforms: "MaxTessEvaluationImageUniforms" = 0,
    max_geometry_image_uniforms: "MaxGeometryImageUniforms" = 0,
    max_fragment_image_uniforms: "MaxFragmentImageUniforms" = 8,
    max_combined_image_uniforms: "MaxCombinedImageUniforms" = 8,
    max_geometry_texture_image_units: "MaxGeometryTextureImageUnits" = 16,
    max_geometry_output_vertices: "MaxGeometryOutputVertices" = 256,
    max_geometry_total_output_components: "MaxGeometryTotalOutputComponents" = 1024,
    max_geometry_uniform_components: "MaxGeometryUniformComponents" = 1024,
    max_geometry_varying_components: "MaxGeometryVaryingComponents" = 64,
    max_tess_control_input_components: "MaxTessControlInputComponents" = 128,
    max_tess_control_output_components: "MaxTessControlOutputComponents" = 128,
    max_tess_control_texture_image_units: "MaxTessControlTextureImageUnits" = 16,
    max_tess_control_uniform_components: "MaxTessControlUniformComponents" = 1024,
    max_tess_control_total_output_components: "MaxTessControlTotalOutputComponents" = 4096,
    max_tess_evaluation_input_components: "MaxTessEvaluationInputComponents" = 128,
    max_tess_evaluation_output_components: "MaxTessEvaluationOutputComponents" = 128,
    max_tess_evaluation_texture_image_units: "MaxTessEvaluationTextureImageUnits" = 16,
    max_tess_evaluation_uniform_components: "MaxTessEvaluationUniformComponents" = 1024,
    max_tess_patch_components: "MaxTessPatchComponents" = 120,
    max_patch_vertices: "MaxPatchVertices" = 32,
    max_tess_gen_level: "MaxTessGenLevel" = 64,
    max_viewports: "MaxViewports" = 16,
    max_vertex_atomic_counters: "MaxVertexAtomicCounters" = 0,
    max_tess_control_atomic_counters: "MaxTessControlAtomicCounters" = 0,
    max_tess_evaluation_atomic_counters: "MaxTessEvaluationAtomicCounters" = 0,
    max_geometry_atomic_counters: "MaxGeometryAtomicCounters" = 0,
    max_fragment_atomic_counters: "MaxFragmentAtomicCounters" = 8,
    max_combined_atomic_counters: "MaxCombinedAtomicCounters" = 8,
    max_atomic_counter_bindings: "MaxAtomicCounterBindings" = 1,
    max_vertex_atomic_counter_buffers: "MaxVertexAtomicCounterBuffers" = 0,
    max_tess_control_atomic_counter_buffers: "MaxTessControlAtomicCounterBuffers" = 0,
    max_tess_evaluation_atomic_counter_buffers: "MaxTessEvaluationAtomicCounterBuffers" = 0,
    max_geometry_atomic_counter_buffers: "MaxGeometryAtomicCounterBuffers" = 0,
    max_fragment_atomic_counter_buffers: "MaxFragmentAtomicCounterBuffers" = 1,
    max_combined_atomic_counter_buffers: "MaxCombinedAtomicCounterBuffers" = 1,
    max_atomic_counter_buffer_size: "MaxAtomicCounterBufferSize" = 16384,
    max_transform_feedback_buffers: "MaxTransformFeedbackBuffers" = 4,
    max_transform_feedback_interleaved_components: "MaxTransformFeedbackInterleavedComponents" = 64,
    max_cull_distances: "MaxCullDistances" = 8,
    max_combined_clip_and_cull_distances: "MaxCombinedClipAndCullDistances" = 8,
    max_samples: "MaxSamples" = 4,
    max_mesh_output_vertices_nv: "MaxMeshOutputVerticesNV" = 256,
    max_mesh_output_primitives_nv: "MaxMeshOutputPrimitivesNV" = 512,
    max_mesh_work_group_size_x_nv: "MaxMeshWorkGroupSizeX_NV" = 32,
    max_mesh_work_group_size_y_nv: "MaxMeshWorkGroupSizeY_NV" = 1,
    max_mesh_work_group_size_z_nv: "MaxMeshWorkGroupSizeZ_NV" = 1,
    max_task_work_group_size_x_nv: "MaxTaskWorkGroupSizeX_NV" = 32,
    max_task_work_group_size_y_nv: "MaxTaskWorkGroupSizeY_NV" = 1,
    max_task_work_group_size_z_nv: "MaxTaskWorkGroupSizeZ_NV" = 1,
    max_mesh_view_count_nv: "MaxMeshViewCountNV" = 4,
    max_mesh_output_vertices_ext: "MaxMeshOutputVerticesEXT" = 256,
    max_mesh_output_primitives_ext: "MaxMeshOutputPrimitivesEXT" = 256,
    max_mesh_work_group_size_x_ext: "MaxMeshWorkGroupSizeX_EXT" = 128,
    max_mesh_work_group_size_y_ext: "MaxMeshWorkGroupSizeY_EXT" = 128,
    max_mesh_work_group_size_z_ext: "MaxMeshWorkGroupSizeZ_EXT" = 128,
    max_task_work_group_size_x_ext: "MaxTaskWorkGroupSizeX_EXT" = 128,
    max_task_work_group_size_y_ext: "MaxTaskWorkGroupSizeY_EXT" = 128,
    max_task_work_group_size_z_ext: "MaxTaskWorkGroupSizeZ_EXT" = 128,
    max_mesh_view_count_ext: "MaxMeshViewCountEXT" = 4,
    max_dual_source_draw_buffers_ext: "MaxDualSourceDrawBuffersEXT" = 1,
    non_inductive_for_loops: "nonInductiveForLoops" = 1,
    while_loops: "whileLoops" = 1,
    do_while_loops: "doWhileLoops" = 1,
    general_uniform_indexing: "generalUniformIndexing" = 1,
    general_attribute_matrix_vector_indexing: "generalAttributeMatrixVectorIndexing" = 1,
    general_varying_indexing: "generalVaryingIndexing" = 1,
    general_sampler_indexing: "generalSamplerIndexing" = 1,
    general_variable_indexing: "generalVariableIndexing" = 1,
    general_constant_matrix_vector_indexing: "generalConstantMatrixVectorIndexing" = 1,
}

impl ResourceLimits {
    pub const fn max_compute_work_group_count(&self) -> [i32; 3] {
        [
            self.max_compute_work_group_count_x,
            self.max_compute_work_group_count_y,
            self.max_compute_work_group_count_z,
        ]
    }

    pub const fn max_compute_work_group_size(&self) -> [i32; 3] {
        [
            self.max_compute_work_group_size_x,
            self.max_compute_work_group_size_y,
            self.max_compute_work_group_size_z,
        ]
    }

    pub const fn max_mesh_work_group_size_nv(&self) -> [i32; 3] {
        [
            self.max_mesh_work_group_size_x_nv,
            self.max_mesh_work_group_size_y_nv,
            self.max_mesh_work_group_size_z_nv,
        ]
    }

    pub const fn max_task_work_group_size_nv(&self) -> [i32; 3] {
        [
            self.max_task_work_group_size_x_nv,
            self.max_task_work_group_size_y_nv,
            self.max_task_work_group_size_z_nv,
        ]
    }

    pub const fn max_mesh_work_group_size_ext(&self) -> [i32; 3] {
        [
            self.max_mesh_work_group_size_x_ext,
            self.max_mesh_work_group_size_y_ext,
            self.max_mesh_work_group_size_z_ext,
        ]
    }

    pub const fn max_task_work_group_size_ext(&self) -> [i32; 3] {
        [
            self.max_task_work_group_size_x_ext,
            self.max_task_work_group_size_y_ext,
            self.max_task_work_group_size_z_ext,
        ]
    }

    pub const fn index_limits(&self) -> bool {
        self.general_uniform_indexing == 0
            || self.general_attribute_matrix_vector_indexing == 0
            || self.general_varying_indexing == 0
            || self.general_sampler_indexing == 0
            || self.general_variable_indexing == 0
            || self.general_constant_matrix_vector_indexing == 0
    }

    pub fn configuration(&self) -> alloc::string::String {
        let mut text = alloc::string::String::new();
        for (name, value) in self.entries() {
            text.push_str(&alloc::format!("{name} {value}\n"));
        }
        text
    }
}
