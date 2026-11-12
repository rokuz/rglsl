use rglsl_ast::Span;

use super::Analyzer;
use crate::builtins::Stage;
use crate::diagnostic::DiagnosticKind;
use crate::scope::{Qualifiers, Storage};

const PUSH_CONSTANT_BANK: &str = "GL_NV_push_constant_bank";

const BANK_END: i64 = 0xF;

const BINDLESS_TEXTURE: &[&str] = &["GL_ARB_bindless_texture"];

const MULTIVIEW: &[&str] = &["GL_OVR_multiview", "GL_OVR_multiview2"];

const BLEND_EQUATIONS: [&str; 16] = [
    "blend_support_multiply",
    "blend_support_screen",
    "blend_support_overlay",
    "blend_support_darken",
    "blend_support_lighten",
    "blend_support_colordodge",
    "blend_support_colorburn",
    "blend_support_hardlight",
    "blend_support_softlight",
    "blend_support_difference",
    "blend_support_exclusion",
    "blend_support_hsl_hue",
    "blend_support_hsl_saturation",
    "blend_support_hsl_color",
    "blend_support_hsl_luminosity",
    "blend_support_all_equations",
];

type StageFilter = fn(Stage) -> bool;

struct LayoutExtension {
    feature: &'static str,
    stages: Option<StageFilter>,
    extensions: &'static [&'static str],
}

const fn compute_like(stage: Stage) -> bool {
    matches!(stage, Stage::Compute | Stage::Task | Stage::Mesh)
}

const fn mesh_or_task(stage: Stage) -> bool {
    matches!(stage, Stage::Task | Stage::Mesh)
}

const fn mesh(stage: Stage) -> bool {
    matches!(stage, Stage::Mesh)
}

const fn fragment(stage: Stage) -> bool {
    matches!(stage, Stage::Fragment)
}

fn layout_extension(name: &str) -> Option<LayoutExtension> {
    let (feature, stages, extensions): (_, Option<StageFilter>, &'static [&'static str]) =
        match name {
            "scalar" => ("scalar block layout", None, &["GL_EXT_scalar_block_layout"]),
            "bindless_sampler" => ("bindless_sampler", None, BINDLESS_TEXTURE),
            "bindless_image" => ("bindless_image", None, BINDLESS_TEXTURE),
            "bound_sampler" => ("bound_sampler", None, BINDLESS_TEXTURE),
            "bound_image" => ("bound_image", None, BINDLESS_TEXTURE),
            "num_views" => ("num_views", None, MULTIVIEW),
            "derivative_group_quadsnv" | "derivative_group_linearnv" => (
                "compute shader derivatives",
                Some(compute_like),
                &["GL_NV_compute_shader_derivatives"],
            ),
            "derivative_group_quadskhr" | "derivative_group_linearkhr" => (
                "compute shader derivatives",
                Some(compute_like),
                &["GL_KHR_compute_shader_derivatives"],
            ),
            "shaderrecordnv" => (
                "shader record NV",
                Some(Stage::ray_tracing),
                &["GL_NV_ray_tracing"],
            ),
            "shaderrecordext" => (
                "shader record EXT",
                Some(Stage::ray_tracing),
                &["GL_EXT_ray_tracing"],
            ),
            "hitobjectshaderrecordnv" => (
                "hitobject shader record NV",
                Some(Stage::ray_tracing),
                &["GL_NV_shader_invocation_reorder"],
            ),
            "hitobjectshaderrecordext" => (
                "hitobject shader record EXT",
                Some(Stage::ray_tracing),
                &["GL_EXT_shader_invocation_reorder"],
            ),
            "max_vertices" => ("max_vertices", Some(mesh), &super::mesh::MESH_ANY),
            "max_primitives" => ("max_primitives", Some(mesh), &super::mesh::MESH_ANY),
            _ if name.starts_with("local_size_") => (
                "gl_WorkGroupSize",
                Some(mesh_or_task),
                &super::mesh::MESH_ANY,
            ),
            _ if BLEND_EQUATIONS.contains(&name) => (
                "blend equation",
                Some(fragment),
                &["GL_KHR_blend_equation_advanced"],
            ),
            _ => return None,
        };
    Some(LayoutExtension {
        feature,
        stages,
        extensions,
    })
}

impl Analyzer<'_> {
    pub(crate) fn layout_extension_check(&mut self, qualifiers: &Qualifiers) {
        for entry in &qualifiers.layout {
            let name = entry.name.to_ascii_lowercase();
            if name.starts_with("blend_support") && !BLEND_EQUATIONS.contains(&name.as_str()) {
                self.stage_check(entry.span, |stage| {
                    fragment(stage).then_some(DiagnosticKind::InvalidQualifier {
                        qualifier: "blend_support",
                        reason: "unknown blend equation",
                    })
                });
            }
            let Some(required) = layout_extension(&name) else {
                continue;
            };
            match required.stages {
                None => {
                    self.require_extensions(entry.span, required.extensions, required.feature);
                }
                Some(applies) => {
                    self.require_stage_extensions(entry.span, required.feature, |stage| {
                        applies(stage).then_some(required.extensions)
                    });
                }
            }
        }
    }

    pub(crate) fn stage_extension_check(&mut self, end: Span) {
        if self.is_library() || !self.main_defined {
            return;
        }
        for (stage, feature) in [(Stage::Task, "task shaders"), (Stage::Mesh, "mesh shaders")] {
            self.require_stage_extensions(end, feature, |known| {
                (known == stage).then_some(&super::mesh::MESH_ANY[..])
            });
        }
    }

    pub(crate) fn removed_packing_check(&mut self, qualifiers: &Qualifiers) {
        if self.options.relaxed_uniforms {
            return;
        }
        for entry in &qualifiers.layout {
            let qualifier = match entry.name.to_ascii_lowercase().as_str() {
                "shared" => "shared",
                "packed" => "packed",
                _ => continue,
            };
            self.error(
                entry.span,
                DiagnosticKind::InvalidQualifier {
                    qualifier,
                    reason: "not allowed when generating SPIR-V",
                },
            );
        }
    }

    pub(crate) fn push_constant_bank_layout_check(&mut self, qualifiers: &Qualifiers) {
        for entry in &qualifiers.layout {
            let (qualifier, valid, reason) = match entry.name.as_str() {
                "bank" => (
                    "bank",
                    entry.value.is_none_or(|value| value < BANK_END),
                    "bank out of range",
                ),
                "member_offset" => ("member_offset", true, ""),
                _ => continue,
            };
            self.require_extension(entry.span, PUSH_CONSTANT_BANK, qualifier);
            if entry.has_value && entry.value.is_none() {
                self.error(
                    entry.span,
                    DiagnosticKind::InvalidQualifier {
                        qualifier,
                        reason: "needs a literal integer",
                    },
                );
            } else if !valid {
                self.error(
                    entry.span,
                    DiagnosticKind::InvalidQualifier { qualifier, reason },
                );
            }
        }
    }

    pub(crate) fn xfb_limit_check(&mut self, qualifiers: &Qualifiers) {
        let limits = self.options.limits;
        for entry in &qualifiers.layout {
            let Some(value) = entry.value else {
                continue;
            };
            let error = match entry.name.as_str() {
                "xfb_buffer" if value >= i64::from(limits.max_transform_feedback_buffers) => {
                    DiagnosticKind::ResourceLimit {
                        qualifier: "xfb_buffer",
                        reason: "buffer is too large",
                        limit: "gl_MaxTransformFeedbackBuffers",
                        value: limits.max_transform_feedback_buffers,
                    }
                }
                "xfb_stride"
                    if value
                        > 4 * i64::from(limits.max_transform_feedback_interleaved_components) =>
                {
                    DiagnosticKind::ResourceLimit {
                        qualifier: "xfb_stride",
                        reason: "1/4 stride is too large",
                        limit: "gl_MaxTransformFeedbackInterleavedComponents",
                        value: limits.max_transform_feedback_interleaved_components,
                    }
                }
                _ => continue,
            };
            self.error(entry.span, error);
        }
    }

    pub(crate) fn fragment_location_limit_check(&mut self, span: Span, qualifiers: &Qualifiers) {
        if qualifiers.storage != Storage::Out {
            return;
        }
        let Some(location) = qualifiers
            .layout_entry("location")
            .and_then(|entry| entry.value)
            .and_then(|value| u32::try_from(value).ok())
        else {
            return;
        };
        let max = self.options.limits.max_draw_buffers.cast_unsigned();
        if location < max {
            return;
        }
        self.stage_check(span, |stage| {
            (stage == Stage::Fragment).then_some(DiagnosticKind::InvalidQualifier {
                qualifier: "location",
                reason: "too large for fragment output",
            })
        });
    }
}
