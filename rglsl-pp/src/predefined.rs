use alloc::format;
use alloc::string::String;

use crate::options::Options;
use crate::version::{Profile, Version};

const DESKTOP: [&str; 152] = [
    "GL_ARB_texture_rectangle",
    "GL_ARB_shading_language_420pack",
    "GL_ARB_texture_gather",
    "GL_ARB_gpu_shader5",
    "GL_ARB_separate_shader_objects",
    "GL_ARB_compute_shader",
    "GL_ARB_tessellation_shader",
    "GL_ARB_enhanced_layouts",
    "GL_ARB_texture_cube_map_array",
    "GL_ARB_texture_multisample",
    "GL_ARB_shader_texture_lod",
    "GL_ARB_explicit_attrib_location",
    "GL_ARB_explicit_uniform_location",
    "GL_ARB_shader_image_load_store",
    "GL_ARB_shader_atomic_counters",
    "GL_ARB_shader_draw_parameters",
    "GL_ARB_shader_group_vote",
    "GL_ARB_derivative_control",
    "GL_ARB_shader_texture_image_samples",
    "GL_ARB_viewport_array",
    "GL_ARB_gpu_shader_int64",
    "GL_ARB_gpu_shader_fp64",
    "GL_ARB_shader_ballot",
    "GL_ARB_sparse_texture2",
    "GL_ARB_sparse_texture_clamp",
    "GL_ARB_shader_stencil_export",
    "GL_ARB_sample_shading",
    "GL_ARB_shader_image_size",
    "GL_ARB_shading_language_packing",
    "GL_ARB_cull_distance",
    "GL_ARB_post_depth_coverage",
    "GL_ARB_fragment_shader_interlock",
    "GL_ARB_uniform_buffer_object",
    "GL_ARB_shader_bit_encoding",
    "GL_ARB_shader_storage_buffer_object",
    "GL_ARB_texture_query_lod",
    "GL_ARB_vertex_attrib_64bit",
    "GL_NV_gpu_shader5",
    "GL_ARB_draw_instanced",
    "GL_ARB_fragment_coord_conventions",
    "GL_ARB_conservative_depth",
    "GL_EXT_shader_non_constant_global_initializers",
    "GL_EXT_shader_image_load_formatted",
    "GL_EXT_post_depth_coverage",
    "GL_EXT_control_flow_attributes",
    "GL_EXT_nonuniform_qualifier",
    "GL_EXT_shader_16bit_storage",
    "GL_EXT_shader_8bit_storage",
    "GL_EXT_samplerless_texture_functions",
    "GL_EXT_scalar_block_layout",
    "GL_EXT_fragment_invocation_density",
    "GL_EXT_buffer_reference",
    "GL_EXT_buffer_reference2",
    "GL_EXT_buffer_reference_uvec2",
    "GL_EXT_demote_to_helper_invocation",
    "GL_EXT_debug_printf",
    "GL_EXT_fragment_shading_rate",
    "GL_EXT_shared_memory_block",
    "GL_EXT_shader_integer_mix",
    "GL_EXT_spec_constant_composites",
    "GL_EXT_abort",
    "GL_EXT_split_barrier",
    "GL_EXT_cooperative_matrix_maintenance1",
    "GL_KHR_shader_subgroup_basic",
    "GL_KHR_shader_subgroup_vote",
    "GL_KHR_shader_subgroup_arithmetic",
    "GL_KHR_shader_subgroup_ballot",
    "GL_KHR_shader_subgroup_shuffle",
    "GL_KHR_shader_subgroup_shuffle_relative",
    "GL_KHR_shader_subgroup_clustered",
    "GL_KHR_shader_subgroup_quad",
    "GL_KHR_cooperative_matrix",
    "GL_EXT_shader_image_int64",
    "GL_EXT_shader_atomic_int64",
    "GL_EXT_shader_realtime_clock",
    "GL_EXT_ray_tracing",
    "GL_EXT_ray_query",
    "GL_EXT_ray_flags_primitive_culling",
    "GL_EXT_ray_cull_mask",
    "GL_EXT_ray_tracing_position_fetch",
    "GL_EXT_spirv_intrinsics",
    "GL_EXT_mesh_shader",
    "GL_AMD_shader_ballot",
    "GL_AMD_shader_trinary_minmax",
    "GL_AMD_shader_explicit_vertex_parameter",
    "GL_AMD_gcn_shader",
    "GL_AMD_gpu_shader_half_float",
    "GL_AMD_texture_gather_bias_lod",
    "GL_AMD_gpu_shader_int16",
    "GL_AMD_shader_image_load_store_lod",
    "GL_AMD_shader_fragment_mask",
    "GL_INTEL_shader_integer_functions2",
    "GL_NV_sample_mask_override_coverage",
    "GL_NV_geometry_shader_passthrough",
    "GL_NV_viewport_array2",
    "GL_NV_shader_atomic_int64",
    "GL_NV_conservative_raster_underestimation",
    "GL_NV_shader_subgroup_partitioned",
    "GL_NV_shading_rate_image",
    "GL_NV_ray_tracing",
    "GL_NV_ray_tracing_motion_blur",
    "GL_NV_fragment_shader_barycentric",
    "GL_KHR_compute_shader_derivatives",
    "GL_NV_compute_shader_derivatives",
    "GL_NV_shader_texture_footprint",
    "GL_NV_mesh_shader",
    "GL_NV_cooperative_matrix",
    "GL_NV_integer_cooperative_matrix",
    "GL_NV_shader_invocation_reorder",
    "GL_NV_cooperative_matrix2",
    "GL_NV_cooperative_matrix_decode_vector",
    "GL_NV_desktop_lowp_mediump",
    "GL_NV_explicit_typecast",
    "GL_QCOM_image_processing",
    "GL_QCOM_image_processing2",
    "GL_QCOM_image_processing3",
    "GL_QCOM_tile_shading",
    "GL_QCOM_cooperative_matrix_conversion",
    "GL_QCOM_multiple_wait_queues",
    "GL_EXT_shader_explicit_arithmetic_types",
    "GL_EXT_shader_explicit_arithmetic_types_int8",
    "GL_EXT_shader_explicit_arithmetic_types_int16",
    "GL_EXT_shader_explicit_arithmetic_types_int32",
    "GL_EXT_shader_explicit_arithmetic_types_int64",
    "GL_EXT_shader_explicit_arithmetic_types_float16",
    "GL_EXT_shader_explicit_arithmetic_types_float32",
    "GL_EXT_shader_explicit_arithmetic_types_float64",
    "GL_EXT_shader_subgroup_extended_types_int8",
    "GL_EXT_shader_subgroup_extended_types_int16",
    "GL_EXT_shader_subgroup_extended_types_int64",
    "GL_EXT_shader_subgroup_extended_types_float16",
    "GL_EXT_shader_atomic_float",
    "GL_EXT_shader_atomic_float2",
    "GL_EXT_fragment_shader_barycentric",
    "GL_EXT_shader_quad_control",
    "GL_EXT_texture_array",
    "GL_EXT_control_flow_attributes2",
    "GL_EXT_function_control_attributes",
    "GL_EXT_integer_dot_product",
    "GL_EXT_bfloat16",
    "GL_EXT_float_e5m2",
    "GL_EXT_float_e4m3",
    "GL_EXT_uniform_buffer_unsized_array",
    "GL_EXT_shader_64bit_indexing",
    "GL_EXT_float_e2m1",
    "GL_EXT_float_e3m2",
    "GL_EXT_float_e2m3",
    "GL_EXT_float_ue8m0",
    "GL_EXT_float_mxint8",
    "GL_EXT_shader_invocation_reorder",
    "GL_EXT_descriptor_heap",
    "GL_EXT_structured_descriptor_heap",
];

const ES: [&str; 2] = ["GL_ES", "GL_FRAGMENT_PRECISION_HIGH"];

fn define(preamble: &mut String, name: &str, value: &str) {
    preamble.push_str("#define ");
    preamble.push_str(name);
    preamble.push(' ');
    preamble.push_str(value);
    preamble.push('\n');
}

pub(crate) fn preamble(version: &Version, options: &Options) -> String {
    let mut preamble = String::new();
    let number = version.number;
    let es = version.profile == Some(Profile::Es);
    if es {
        for name in ES {
            define(&mut preamble, name, "1");
        }
    } else {
        for name in DESKTOP {
            define(&mut preamble, name, "1");
        }
        if number >= 150 {
            define(&mut preamble, "GL_core_profile", "1");
            if version.profile == Some(Profile::Compatibility) {
                define(&mut preamble, "GL_compatibility_profile", "1");
            }
        }
        if number >= 140 {
            define(&mut preamble, "GL_EXT_null_initializer", "1");
            define(&mut preamble, "GL_EXT_subgroup_uniform_control_flow", "1");
            define(&mut preamble, "GL_EXT_maximal_reconvergence", "1");
        }
        if number >= 130 {
            define(&mut preamble, "GL_FRAGMENT_PRECISION_HIGH", "1");
        }
        if number >= 460 {
            for name in [
                "GL_ARM_tensors",
                "GL_ARM_tensors_bfloat16",
                "GL_ARM_tensors_float_e5m2",
                "GL_ARM_tensors_float_e4m3",
            ] {
                define(&mut preamble, name, "1");
            }
        }
    }
    if (!es && number >= 460) || (es && number >= 320) {
        define(&mut preamble, "GL_EXT_nontemporal_keyword", "1");
    }
    if (!es && number >= 140) || (es && number >= 310) {
        for name in [
            "GL_EXT_device_group",
            "GL_EXT_multiview",
            "GL_NV_shader_sm_builtins",
        ] {
            define(&mut preamble, name, "1");
        }
    }
    if (!es && number >= 130) || (es && number >= 300) {
        define(&mut preamble, "GL_EXT_texture_offset_non_const", "1");
    }
    if number >= 300 {
        define(&mut preamble, "GL_OVR_multiview", "1");
        define(&mut preamble, "GL_OVR_multiview2", "1");
    }
    if (!es && number >= 140) || (es && number >= 300) {
        define(&mut preamble, "GL_EXT_optional_input_attachment_index", "1");
    }
    for name in [
        "GL_GOOGLE_cpp_style_line_directive",
        "GL_GOOGLE_include_directive",
        "GL_KHR_blend_equation_advanced",
        "GL_EXT_terminate_invocation",
    ] {
        define(&mut preamble, name, "1");
    }
    if let Some(vulkan) = options.vulkan_client_version {
        define(&mut preamble, "VULKAN", &format!("{vulkan}"));
    }
    if options.gl_spirv {
        define(&mut preamble, "GL_SPIRV", "100");
    }
    if !es {
        if let Some(stage) = options.stage {
            define(&mut preamble, stage.macro_name(), "1");
        }
    }
    for user in &options.defines {
        preamble.push_str("#define ");
        preamble.push_str(&user.name);
        if let Some(value) = &user.value {
            preamble.push(' ');
            preamble.push_str(value);
        }
        preamble.push('\n');
    }
    preamble
}
