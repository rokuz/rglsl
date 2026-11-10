use alloc::collections::{BTreeMap, BTreeSet};
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
}

use names::{
    AMD_GPU_SHADER_HALF_FLOAT, AMD_GPU_SHADER_INT16, ARB_GPU_SHADER_FP64, ARB_GPU_SHADER_INT64,
    EXPLICIT_ARITHMETIC_TYPES, EXPLICIT_FLOAT16, EXPLICIT_FLOAT32, EXPLICIT_FLOAT64,
    EXPLICIT_INT16, EXPLICIT_INT32, EXPLICIT_INT64, EXPLICIT_INT8, NV_GPU_SHADER5, STORAGE_16BIT,
    STORAGE_8BIT,
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
        Some(if family(["int64_t", "uint64_t"], ["i64vec", "u64vec"]) {
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

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct ExtensionState {
    behaviors: BTreeMap<&'static str, ExtensionBehavior>,
    requested: BTreeSet<&'static str>,
}

impl ExtensionState {
    pub const fn new() -> Self {
        Self {
            behaviors: BTreeMap::new(),
            requested: BTreeSet::new(),
        }
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
                for known in KNOWN {
                    self.behaviors.insert(known, behavior);
                }
            }
            return;
        }
        match KNOWN.binary_search(&name) {
            Ok(index) => {
                if let Some(known) = KNOWN.get(index) {
                    self.behaviors.insert(known, behavior);
                    if behavior != ExtensionBehavior::Disable {
                        self.requested.insert(known);
                    }
                }
            }
            Err(_) if behavior == ExtensionBehavior::Require => {
                issues.push(ExtensionIssue::UnknownRequired(String::from(name)));
            }
            Err(_) => issues.push(ExtensionIssue::Unknown(String::from(name))),
        }
    }

    pub fn behavior(&self, name: &str) -> ExtensionBehavior {
        self.behaviors
            .get(name)
            .copied()
            .unwrap_or(ExtensionBehavior::Disable)
    }

    pub fn is_requested(&self, name: &str) -> bool {
        self.requested.contains(name)
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
        self.behaviors
            .iter()
            .filter(|(_, behavior)| **behavior != ExtensionBehavior::Disable)
            .map(|(name, _)| *name)
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
        self.any_on(&EXPLICIT_ARITHMETIC)
    }
}
