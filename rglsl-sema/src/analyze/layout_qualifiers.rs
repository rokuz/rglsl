use rglsl_ast::Span;
use rglsl_types::extension::Extension;

use super::Analyzer;
use crate::diagnostic::DiagnosticKind;
use crate::scope::{LayoutValue, Qualifiers, Storage};
use rglsl_types::{ShaderStage, ShaderStageMask};

const BANK_END: i64 = 0xF;

const BINDLESS_TEXTURE: &[Extension] = &[Extension::ArbBindlessTexture];

const MULTIVIEW: &[Extension] = &[Extension::OvrMultiview, Extension::OvrMultiview2];

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

struct LayoutExtension {
    feature: &'static str,
    stages: ShaderStageMask,
    extensions: &'static [Extension],
}

fn layout_extension(name: &str) -> Option<LayoutExtension> {
    let all = ShaderStageMask::all();
    let (feature, stages, extensions): (_, ShaderStageMask, &'static [Extension]) = match name {
        "scalar" => (
            "scalar block layout",
            all,
            &[Extension::ExtScalarBlockLayout],
        ),
        "bindless_sampler" => ("bindless_sampler", all, BINDLESS_TEXTURE),
        "bindless_image" => ("bindless_image", all, BINDLESS_TEXTURE),
        "bound_sampler" => ("bound_sampler", all, BINDLESS_TEXTURE),
        "bound_image" => ("bound_image", all, BINDLESS_TEXTURE),
        "num_views" => ("num_views", all, MULTIVIEW),
        "derivative_group_quadsnv" | "derivative_group_linearnv" => (
            "compute shader derivatives",
            ShaderStageMask::COMPUTE_LIKE,
            &[Extension::NvComputeShaderDerivatives],
        ),
        "derivative_group_quadskhr" | "derivative_group_linearkhr" => (
            "compute shader derivatives",
            ShaderStageMask::COMPUTE_LIKE,
            &[Extension::KhrComputeShaderDerivatives],
        ),
        "shaderrecordnv" => (
            "shader record NV",
            ShaderStageMask::RAY_TRACING,
            &[Extension::NvRayTracing],
        ),
        "shaderrecordext" => (
            "shader record EXT",
            ShaderStageMask::RAY_TRACING,
            &[Extension::ExtRayTracing],
        ),
        "hitobjectshaderrecordnv" => (
            "hitobject shader record NV",
            ShaderStageMask::RAY_TRACING,
            &[Extension::NvShaderInvocationReorder],
        ),
        "hitobjectshaderrecordext" => (
            "hitobject shader record EXT",
            ShaderStageMask::RAY_TRACING,
            &[Extension::ExtShaderInvocationReorder],
        ),
        "max_vertices" => (
            "max_vertices",
            ShaderStageMask::MESH,
            &super::mesh::MESH_ANY,
        ),
        "max_primitives" => (
            "max_primitives",
            ShaderStageMask::MESH,
            &super::mesh::MESH_ANY,
        ),
        _ if name.starts_with("local_size_") => (
            "gl_WorkGroupSize",
            ShaderStageMask::MESH_LIKE,
            &super::mesh::MESH_ANY,
        ),
        _ if BLEND_EQUATIONS.contains(&name) => (
            "blend equation",
            ShaderStageMask::FRAGMENT,
            &[Extension::KhrBlendEquationAdvanced],
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
            let name = entry.name.as_str();
            if name.starts_with("blend_support") && !BLEND_EQUATIONS.contains(&name) {
                self.stage_check(entry.span, |stage| {
                    (stage == ShaderStage::Fragment).then_some(DiagnosticKind::InvalidQualifier {
                        qualifier: "blend_support",
                        reason: "unknown blend equation",
                    })
                });
            }
            let Some(required) = layout_extension(name) else {
                continue;
            };
            if required.stages.is_all() {
                self.require_extensions(entry.span, required.extensions, required.feature);
            } else {
                self.require_stage_extensions(entry.span, required.feature, |stage| {
                    required.stages.has(stage).then_some(required.extensions)
                });
            }
        }
    }

    pub(crate) fn stage_extension_check(&mut self, end: Span) {
        if self.is_library() || !self.main_defined {
            return;
        }
        for (stage, feature) in [
            (ShaderStage::Task, "task shaders"),
            (ShaderStage::Mesh, "mesh shaders"),
        ] {
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
            let qualifier = match entry.name.as_str() {
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
                    entry.value.constant().is_none_or(|value| value < BANK_END),
                    "bank out of range",
                ),
                "member_offset" => ("member_offset", true, ""),
                _ => continue,
            };
            self.require_extension(entry.span, Extension::NvPushConstantBank, qualifier);
            if entry.value == LayoutValue::Invalid {
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
            let Some(value) = entry.value.constant() else {
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
            .and_then(|entry| entry.value.constant())
            .and_then(|value| u32::try_from(value).ok())
        else {
            return;
        };
        let max = self.options.limits.max_draw_buffers.cast_unsigned();
        if location < max {
            return;
        }
        self.stage_check(span, |stage| {
            (stage == ShaderStage::Fragment).then_some(DiagnosticKind::InvalidQualifier {
                qualifier: "location",
                reason: "too large for fragment output",
            })
        });
    }
}
