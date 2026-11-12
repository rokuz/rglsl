use rglsl_ast::Span;

use super::Analyzer;
use crate::builtins::Stage;
use crate::diagnostic::DiagnosticKind;
use crate::scope::{Qualifiers, Storage};
use crate::types::{Member, Scalar, Type, TypeRegistry};

const CAPTURED_BITS: u32 = 32;

fn narrowest_bits(types: &TypeRegistry, ty: &Type) -> Option<u32> {
    Scalar::ALL
        .into_iter()
        .filter(|&scalar| ty.contains_scalar(types, scalar))
        .map(Scalar::bits)
        .filter(|&bits| bits < CAPTURED_BITS)
        .min()
}

impl Analyzer<'_> {
    fn narrow_capture(&mut self, span: Span, bits: Option<u32>) {
        let Some(bits) = bits else {
            return;
        };
        let captures = self.stage_map(|stage| {
            matches!(
                stage,
                Stage::Vertex | Stage::TessEvaluation | Stage::Geometry
            )
        });
        if captures {
            self.target_limit(span, DiagnosticKind::NarrowTransformFeedback(bits));
        }
    }

    pub(crate) fn xfb_variable_check(&mut self, span: Span, qualifiers: &Qualifiers, ty: &Type) {
        if qualifiers.storage == Storage::Out && qualifiers.has_layout("xfb_offset") {
            let bits = narrowest_bits(&self.types, ty);
            self.narrow_capture(span, bits);
        }
    }

    pub(crate) fn xfb_block_check<'m>(
        &mut self,
        block: Span,
        qualifiers: &Qualifiers,
        members: impl IntoIterator<Item = (Span, &'m Member)>,
    ) {
        if qualifiers.storage != Storage::Out {
            return;
        }
        let whole = qualifiers.has_layout("xfb_offset");
        let mut found: Option<(Span, u32)> = None;
        for (span, member) in members {
            if !whole && !member.qualifiers.has_layout("xfb_offset") {
                continue;
            }
            if let Some(bits) = narrowest_bits(&self.types, &member.ty) {
                found = Some(match found {
                    Some((first, narrowest)) => (first, narrowest.min(bits)),
                    None => (if whole { block } else { span }, bits),
                });
            }
        }
        if let Some((span, bits)) = found {
            self.narrow_capture(span, Some(bits));
        }
    }
}
