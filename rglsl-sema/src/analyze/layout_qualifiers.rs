use rglsl_ast::Span;

use super::Analyzer;
use crate::builtins::Stage;
use crate::diagnostic::DiagnosticKind;
use crate::scope::{Qualifiers, Storage};

const PUSH_CONSTANT_BANK: &str = "GL_NV_push_constant_bank";

const BANK_END: i64 = 0xF;

impl Analyzer<'_> {
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
