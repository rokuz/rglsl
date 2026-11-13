use alloc::string::String;

use rglsl_ast::Span;

use super::declaration::IMAGE_FORMATS;
use super::Analyzer;
use crate::diagnostic::DiagnosticKind;
use crate::scope::{LayoutEntry, LayoutValue, Qualifiers};
use rglsl_types::ShaderStage;

const ALL: &[ShaderStage] = &ShaderStage::ALL;

const PRE_RASTERIZATION: &[ShaderStage] = &[
    ShaderStage::Vertex,
    ShaderStage::TessControl,
    ShaderStage::TessEvaluation,
    ShaderStage::Geometry,
];

const COMPUTE_LIKE: &[ShaderStage] = &[ShaderStage::Compute, ShaderStage::Task, ShaderStage::Mesh];

const RAY_TRACING: &[ShaderStage] = &[
    ShaderStage::RayGeneration,
    ShaderStage::Intersection,
    ShaderStage::AnyHit,
    ShaderStage::ClosestHit,
    ShaderStage::Miss,
    ShaderStage::Callable,
];

const FRAGMENT: &[ShaderStage] = &[ShaderStage::Fragment];

const PACKINGS_AND_MATRICES: [&str; 7] = [
    "column_major",
    "row_major",
    "packed",
    "shared",
    "std140",
    "std430",
    "scalar",
];

const OTHER_FORMATS: [&str; 6] = [
    "size1x8", "size1x16", "size1x32", "size2x32", "size4x32", "none",
];

const ANY_STAGE_FLAGS: [&str; 10] = [
    "descriptor_heap",
    "push_constant",
    "buffer_reference",
    "buffer_type",
    "bindless_sampler",
    "bindless_image",
    "bound_sampler",
    "bound_image",
    "primitive_culling",
    "quad_derivatives",
];

const FRAGMENT_FLAGS: [&str; 26] = [
    "origin_upper_left",
    "pixel_center_integer",
    "early_fragment_tests",
    "early_and_late_fragment_tests_amd",
    "post_depth_coverage",
    "non_coherent_color_attachment_readext",
    "non_coherent_depth_attachment_readext",
    "non_coherent_stencil_attachment_readext",
    "depth_any",
    "depth_greater",
    "depth_less",
    "depth_unchanged",
    "stencil_ref_unchanged_front_amd",
    "stencil_ref_greater_front_amd",
    "stencil_ref_less_front_amd",
    "stencil_ref_unchanged_back_amd",
    "stencil_ref_greater_back_amd",
    "stencil_ref_less_back_amd",
    "pixel_interlock_ordered",
    "pixel_interlock_unordered",
    "sample_interlock_ordered",
    "sample_interlock_unordered",
    "shading_rate_interlock_ordered",
    "shading_rate_interlock_unordered",
    "override_coverage",
    "full_quads",
];

const ANY_STAGE_VALUES: [&str; 18] = [
    "offset",
    "align",
    "location",
    "set",
    "binding",
    "constant_id",
    "component",
    "xfb_buffer",
    "xfb_offset",
    "xfb_stride",
    "input_attachment_index",
    "num_views",
    "buffer_reference_align",
    "bank",
    "member_offset",
    "descriptor_stride",
    "descriptor_size",
    "heap_offset",
];

fn flag_stages(name: &str) -> Option<&'static [ShaderStage]> {
    if PACKINGS_AND_MATRICES.contains(&name)
        || IMAGE_FORMATS.contains(&name)
        || OTHER_FORMATS.contains(&name)
        || ANY_STAGE_FLAGS.contains(&name)
    {
        return Some(ALL);
    }
    if FRAGMENT_FLAGS.contains(&name) || name.starts_with("blend_support") {
        return Some(FRAGMENT);
    }
    Some(match name {
        "triangles" => &[
            ShaderStage::Geometry,
            ShaderStage::TessEvaluation,
            ShaderStage::Mesh,
        ],
        "points" | "lines" => &[ShaderStage::Geometry, ShaderStage::Mesh],
        "line_strip"
        | "lines_adjacency"
        | "triangles_adjacency"
        | "triangle_strip"
        | "passthrough" => &[ShaderStage::Geometry],
        "quads"
        | "isolines"
        | "equal_spacing"
        | "fractional_even_spacing"
        | "fractional_odd_spacing"
        | "cw"
        | "ccw"
        | "point_mode" => &[ShaderStage::TessEvaluation],
        "non_coherent_attachment_readqcom" => FRAGMENT,
        "tile_attachmentqcom" => &[ShaderStage::Fragment, ShaderStage::Compute],
        "viewport_relative" => PRE_RASTERIZATION,
        "shaderrecordnv"
        | "shaderrecordext"
        | "hitobjectshaderrecordnv"
        | "hitobjectshaderrecordext" => RAY_TRACING,
        "derivative_group_quadsnv"
        | "derivative_group_linearnv"
        | "derivative_group_quadskhr"
        | "derivative_group_linearkhr" => COMPUTE_LIKE,
        _ => return None,
    })
}

fn value_stages(name: &str) -> Option<&'static [ShaderStage]> {
    if ANY_STAGE_VALUES.contains(&name) {
        return Some(ALL);
    }
    Some(match name {
        "secondary_view_offset" => PRE_RASTERIZATION,
        "vertices" => &[ShaderStage::TessControl],
        "invocations" | "stream" => &[ShaderStage::Geometry],
        "max_vertices" => &[ShaderStage::Geometry, ShaderStage::Mesh],
        "max_primitives" => &[ShaderStage::Mesh],
        "index" => FRAGMENT,
        "local_size_x" | "local_size_y" | "local_size_z" | "local_size_x_id"
        | "local_size_y_id" | "local_size_z_id" | "shading_rate_xqcom" | "shading_rate_yqcom"
        | "shading_rate_zqcom" => COMPUTE_LIKE,
        _ => return None,
    })
}

pub fn layout_stages(name: &str) -> Option<&'static [ShaderStage]> {
    flag_stages(name)
        .or_else(|| value_stages(name))
        .filter(|stages| stages.len() < ALL.len())
}

fn literal_name(name: &str) -> &str {
    if name.starts_with("local_size_") {
        "local_size"
    } else if name.starts_with("shading_rate_") {
        "shading_rate_*QCOM"
    } else {
        name
    }
}

fn takes_any_value(name: &str) -> bool {
    matches!(name, "heap_offset" | "descriptor_stride")
}

impl Analyzer<'_> {
    pub(crate) fn layout_identifiers(&mut self, qualifiers: &Qualifiers) {
        for entry in &qualifiers.layout {
            self.layout_identifier(entry);
        }
    }

    fn layout_identifier(&mut self, entry: &LayoutEntry) {
        let name = entry.name.as_str();
        match entry.value {
            LayoutValue::Flag => {
                let stages = flag_stages(name);
                self.stage_check(entry.span, |stage| {
                    (!stages.is_some_and(|stages| stages.contains(&stage)))
                        .then(|| DiagnosticKind::UnrecognizedLayout(String::from(name)))
                });
            }
            LayoutValue::Constant(value) if value < 0 => {}
            LayoutValue::Constant(_) | LayoutValue::Invalid => {
                let stages = value_stages(name);
                self.stage_check(entry.span, |stage| {
                    (!stages.is_some_and(|stages| stages.contains(&stage)))
                        .then(|| DiagnosticKind::UnknownLayoutWithValue(String::from(name)))
                });
            }
        }
    }

    pub(crate) fn literal_layout_value(&mut self, name: &str, span: Span) {
        if takes_any_value(name) {
            return;
        }
        let Some(stages) = value_stages(name) else {
            return;
        };
        self.stage_check(span, |stage| {
            stages
                .contains(&stage)
                .then(|| DiagnosticKind::LayoutValueNotLiteral(String::from(literal_name(name))))
        });
    }
}
