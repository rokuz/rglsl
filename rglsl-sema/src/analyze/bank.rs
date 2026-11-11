use super::Analyzer;
use crate::diagnostic::DiagnosticKind;
use crate::scope::Qualifiers;

const PUSH_CONSTANT_BANK: &str = "GL_NV_push_constant_bank";

const BANK_END: i64 = 0xF;

impl Analyzer<'_> {
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
}
