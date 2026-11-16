use alloc::vec::Vec;

use rglsl_ast::Span;
use rglsl_ast::ast::Identifier;
use rglsl_types::ShaderStage;
use rglsl_types::builtin::BuiltIn;

use super::Analyzer;
use crate::builtins::variables::{self, BuiltinVariable, VariableFlags};
use crate::diagnostic::DiagnosticKind;
use crate::scope::SymbolId;
use crate::types::{Type, TypeKind};

impl Analyzer<'_> {
    pub(crate) fn builtin_variable_extensions(
        &mut self,
        span: Span,
        id: SymbolId,
        name: &str,
    ) -> bool {
        let rows: Vec<&'static BuiltinVariable> = variables::named(name).collect();
        let version = self.builtins.version();
        let passed = self.require_stage_extensions(span, name, |stage| {
            variables::requirement(&rows, version, stage)
        });
        if self.stage_check(span, |stage| {
            variables::vulkan_forbidden(&rows, version, stage).map(|reason| {
                DiagnosticKind::NotSupportedInVulkan {
                    subject: alloc::format!("`{name}` in a {} shader", stage.name()),
                    reason,
                }
            })
        }) {
            return false;
        }
        let own = self.builtins.variable(id);
        if let Some(primitive) = own
            .and_then(BuiltinVariable::builtin)
            .and_then(output_primitive)
            && self.stage_is(ShaderStage::Mesh)
            && self.stage_layout.output_primitive() != Some(primitive)
        {
            self.error(
                span,
                DiagnosticKind::InvalidQualifier {
                    qualifier: "output primitive",
                    reason: "cannot be used (output primitive type mismatch)",
                },
            );
        }
        passed || !own.is_some_and(|row| row.has(VariableFlags::GATE))
    }

    pub(crate) fn builtin_member_extensions(&mut self, field: &Identifier, base: &Type) {
        let TypeKind::Block(id) = base.kind else {
            return;
        };
        let Some(row) = self
            .types
            .block(id)
            .filter(|block| block.member(&field.node).is_some())
            .and_then(|block| variables::member(&block.name, &field.node))
        else {
            return;
        };
        if !row.requires_one_of.is_empty() {
            self.require_extensions(field.span, row.requires_one_of, &field.node);
        }
    }
}

const fn output_primitive(builtin: BuiltIn) -> Option<&'static str> {
    match builtin {
        BuiltIn::PointIndex => Some("points"),
        BuiltIn::LineIndices => Some("lines"),
        BuiltIn::TriangleIndices => Some("triangles"),
        _ => None,
    }
}
