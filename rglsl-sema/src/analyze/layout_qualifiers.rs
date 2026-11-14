use rglsl_ast::Span;
use rglsl_types::ShaderStage;
use rglsl_types::extension::Extension;

use super::Analyzer;
use crate::diagnostic::DiagnosticKind;
use crate::layout_id::{LOCAL_SIZE_EXT, LayoutId};
use crate::scope::{LayoutValue, Qualifiers, Storage};

const BANK_END: i64 = 0xF;

impl Analyzer<'_> {
    pub(crate) fn layout_extension_check(&mut self, qualifiers: &Qualifiers) {
        for entry in &qualifiers.layout {
            let name = entry.name.as_str();
            if entry.id.is_none() && name.starts_with("blend_support") {
                self.stage_check(entry.span, |stage| {
                    (stage == ShaderStage::Fragment).then_some(DiagnosticKind::InvalidQualifier {
                        qualifier: "blend_support",
                        reason: "unknown blend equation",
                    })
                });
            }
            let required = entry
                .id
                .and_then(|id| id.info().extension)
                .or_else(|| name.starts_with("local_size_").then_some(LOCAL_SIZE_EXT));
            let Some(required) = required else {
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
            let Some(id @ (LayoutId::Shared | LayoutId::Packed)) = entry.id else {
                continue;
            };
            self.error(
                entry.span,
                DiagnosticKind::InvalidQualifier {
                    qualifier: id.name(),
                    reason: "not allowed when generating SPIR-V",
                },
            );
        }
    }

    pub(crate) fn push_constant_bank_layout_check(&mut self, qualifiers: &Qualifiers) {
        for entry in &qualifiers.layout {
            let (id, valid, reason) = match entry.id {
                Some(id @ LayoutId::Bank) => (
                    id,
                    entry.value.constant().is_none_or(|value| value < BANK_END),
                    "bank out of range",
                ),
                Some(id @ LayoutId::MemberOffset) => (id, true, ""),
                _ => continue,
            };
            let qualifier = id.name();
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
            let error = match entry.id {
                Some(LayoutId::XfbBuffer)
                    if value >= i64::from(limits.max_transform_feedback_buffers) =>
                {
                    DiagnosticKind::ResourceLimit {
                        qualifier: "xfb_buffer",
                        reason: "buffer is too large",
                        limit: "gl_MaxTransformFeedbackBuffers",
                        value: limits.max_transform_feedback_buffers,
                    }
                }
                Some(LayoutId::XfbStride)
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
            .layout_entry(LayoutId::Location)
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
