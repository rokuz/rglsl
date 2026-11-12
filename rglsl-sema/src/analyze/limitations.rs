use alloc::vec::Vec;

use rglsl_ast::ast::{
    AssignmentOperator, BinaryOperator, Condition, DeclarationKind, Expression, ExpressionKind,
    ForStatement, Initializer, PostfixOperator, Statement, StatementKind, UnaryOperator,
};
use rglsl_ast::Span;

use super::{Analyzer, Callee, Operand};
use crate::builtins::Stage;
use crate::diagnostic::DiagnosticKind;
use crate::scope::{Direction, Origin, Storage, SymbolId, SymbolKind};
use crate::types::{Type, TypeKind};

const BAD_INIT: &str =
    "the init-declaration must have the form \"type-specifier loop-index = constant-expression\"";
const BAD_TYPE: &str = "the loop index must be a scalar `int` or `float`";
const BAD_CONDITION: &str =
    "the condition must have the form \"loop-index <comparison-op> constant-expression\"";
const BAD_TERMINAL: &str = "the loop expression must have the form \"loop-index++\", \"loop-index--\", \"loop-index += constant-expression\" or \"loop-index -= constant-expression\"";
const MODIFIED: &str = "the loop index is modified in the body";

#[derive(Debug, Clone, Default)]
pub(crate) struct IndexLimitation {
    pub symbols: Vec<(Span, SymbolId)>,
    pub call: Option<Span>,
}

fn unparenthesized(mut expression: &Expression) -> &Expression {
    while let ExpressionKind::Parenthesized(inner) = &expression.kind {
        expression = inner;
    }
    expression
}

impl Analyzer<'_> {
    pub(crate) fn patch_vertices_limit(&mut self) {
        if self.options.limits.max_patch_vertices > 0 {
            return;
        }
        self.stage_check(Span::new(0, 0), |stage| {
            matches!(stage, Stage::TessControl | Stage::TessEvaluation)
                .then_some(DiagnosticKind::BuiltinArraySize("gl_in"))
        });
    }

    pub(crate) fn loop_limitation(&mut self, span: Span, kind: &'static str) {
        if self.options.limits.while_loops == 0 {
            self.error(span, DiagnosticKind::LoopNotAvailable(kind));
        }
    }

    fn folded(&self, expression: &Expression) -> bool {
        self.expressions
            .get(&expression.id)
            .is_some_and(|info| info.value.is_some() && !info.is_specialization)
    }

    fn converted(&self, expression: &Expression) -> bool {
        self.expressions
            .get(&expression.id)
            .is_some_and(|info| info.conversion.is_some())
    }

    fn names_symbol(&self, expression: &Expression, id: SymbolId) -> bool {
        let expression = unparenthesized(expression);
        matches!(expression.kind, ExpressionKind::Variable(_))
            && self.references.get(&expression.id) == Some(&id)
    }

    fn loop_index(&self, init: &Statement) -> Result<SymbolId, &'static str> {
        let StatementKind::Declaration(declaration) = &init.kind else {
            return Err(BAD_INIT);
        };
        let DeclarationKind::InitDeclaratorList(list) = &declaration.kind else {
            return Err(BAD_INIT);
        };
        let [declarator] = list.declarators.as_slice() else {
            return Err(BAD_INIT);
        };
        let Some(initializer) = &declarator.initializer else {
            return Err(BAD_INIT);
        };
        let Some(&id) = self.declarations.get(&declarator.id) else {
            return Err(BAD_INIT);
        };
        let Some(variable) = self.symbol(id).and_then(|symbol| symbol.variable()) else {
            return Err(BAD_INIT);
        };
        if variable.qualifiers.constant {
            return Err(BAD_INIT);
        }
        if variable.ty != Type::INT && variable.ty != Type::FLOAT {
            return Err(BAD_TYPE);
        }
        match &initializer.node {
            Initializer::Expression(value) if self.folded(value) => Ok(id),
            _ => Err(BAD_INIT),
        }
    }

    fn loop_condition(&self, condition: Option<&Condition>, id: SymbolId) -> bool {
        let Some(Condition::Expression(condition)) = condition else {
            return false;
        };
        let ExpressionKind::Binary {
            operator,
            left,
            right,
        } = &unparenthesized(condition).kind
        else {
            return false;
        };
        matches!(
            operator,
            BinaryOperator::Less
                | BinaryOperator::Greater
                | BinaryOperator::LessEqual
                | BinaryOperator::GreaterEqual
                | BinaryOperator::Equal
                | BinaryOperator::NotEqual
        ) && self.names_symbol(left, id)
            && !self.converted(unparenthesized(left))
            && self.folded(right)
    }

    fn loop_terminal(&self, terminal: Option<&Expression>, id: SymbolId) -> bool {
        let Some(terminal) = terminal else {
            return false;
        };
        match &unparenthesized(terminal).kind {
            ExpressionKind::Postfix {
                operand,
                operator: PostfixOperator::Increment | PostfixOperator::Decrement,
            } => self.names_symbol(operand, id),
            ExpressionKind::Assignment {
                operator: AssignmentOperator::Add | AssignmentOperator::Subtract,
                target,
                value,
            } => self.names_symbol(target, id) && self.folded(value),
            _ => false,
        }
    }

    fn modifies(&self, expression: &Expression, id: SymbolId) -> bool {
        match &expression.kind {
            ExpressionKind::Assignment { target, .. } => self.names_symbol(target, id),
            ExpressionKind::Postfix { operand, .. }
            | ExpressionKind::Unary {
                operator: UnaryOperator::Increment | UnaryOperator::Decrement,
                operand,
            } => self.names_symbol(operand, id),
            ExpressionKind::FunctionCall(call) => {
                let Some(Callee::Function(function)) = self.calls.get(&expression.id) else {
                    return false;
                };
                let Some(function) = self.function(*function) else {
                    return false;
                };
                call.arguments
                    .iter()
                    .zip(&function.parameters)
                    .any(|(argument, parameter)| {
                        matches!(parameter.direction, Direction::Out | Direction::Inout)
                            && self.names_symbol(argument, id)
                    })
            }
            _ => false,
        }
    }

    pub(crate) fn inductive_loop_check(&mut self, span: Span, statement: &ForStatement) {
        if self.options.limits.non_inductive_for_loops != 0 {
            return;
        }
        let id = match self.loop_index(&statement.init) {
            Ok(id) => id,
            Err(reason) => {
                self.error(span, DiagnosticKind::InductiveLoop(reason));
                return;
            }
        };
        self.inductive_loops.insert(id);
        if !self.loop_condition(statement.condition.as_ref(), id) {
            self.error(span, DiagnosticKind::InductiveLoop(BAD_CONDITION));
            return;
        }
        if !self.loop_terminal(statement.increment.as_ref(), id) {
            self.error(span, DiagnosticKind::InductiveLoop(BAD_TERMINAL));
            return;
        }
        let modified = rglsl_ast::statement_expressions(&statement.body)
            .into_iter()
            .rfind(|expression| self.modifies(expression, id))
            .map(|expression| expression.span);
        if let Some(at) = modified {
            self.error(at, DiagnosticKind::InductiveLoop(MODIFIED));
        }
    }

    fn base_storage(&self, base: &Expression, operand: &Operand) -> (Storage, bool) {
        let temporary = (Storage::None, false);
        match &unparenthesized(base).kind {
            ExpressionKind::Variable(_) => {
                let origin =
                    operand
                        .root
                        .and_then(|id| self.symbol(id))
                        .map(|symbol| match &symbol.kind {
                            SymbolKind::Variable(variable) => variable.origin,
                            _ => Origin::Global,
                        });
                (
                    operand.storage,
                    matches!(origin, Some(Origin::Global | Origin::BuiltIn)),
                )
            }
            ExpressionKind::FieldSelection { base: inner, .. } => {
                let block = self
                    .expressions
                    .get(&unparenthesized(inner).id)
                    .is_some_and(|info| {
                        !info.ty.is_array() && matches!(info.ty.kind, TypeKind::Block(_))
                    });
                if block {
                    (operand.storage, true)
                } else {
                    temporary
                }
            }
            _ => temporary,
        }
    }

    fn limited_base(&self, base: &Expression, operand: &Operand) -> bool {
        let limits = &self.options.limits;
        let (storage, interface) = self.base_storage(base, operand);
        let input = interface && storage == Storage::In;
        let output = interface && storage == Storage::Out;
        let uniform = matches!(storage, Storage::Uniform | Storage::Buffer);
        let constant = operand.constant;
        let folded = constant && operand.value.is_some() && !operand.specialization;
        let vertex = self.stage() == Stage::Vertex;
        let vector_or_matrix = !operand.ty.is_array()
            && matches!(
                operand.ty.kind,
                TypeKind::Vector { .. } | TypeKind::Matrix { .. }
            );
        (limits.general_sampler_indexing == 0 && matches!(operand.ty.kind, TypeKind::Opaque(_)))
            || (limits.general_uniform_indexing == 0 && uniform && !vertex)
            || (limits.general_attribute_matrix_vector_indexing == 0
                && input
                && vertex
                && vector_or_matrix)
            || (limits.general_constant_matrix_vector_indexing == 0 && folded)
            || (limits.general_variable_indexing == 0 && !uniform && !input && !output && !constant)
            || (limits.general_varying_indexing == 0 && (input || output))
    }

    pub(crate) fn index_limitation(
        &mut self,
        base: &Expression,
        operand: &Operand,
        index: &Expression,
    ) {
        if !self.options.limits.index_limits() || !self.limited_base(base, operand) {
            return;
        }
        let mut limitation = IndexLimitation::default();
        let mut pending = alloc::vec![index];
        while let Some(expression) = pending.pop() {
            if self.folded(expression) {
                continue;
            }
            match &expression.kind {
                ExpressionKind::Variable(_) => {
                    if let Some(&id) = self.references.get(&expression.id) {
                        limitation.symbols.push((expression.span, id));
                    }
                }
                ExpressionKind::FunctionCall(_)
                    if matches!(self.calls.get(&expression.id), Some(Callee::Function(_))) =>
                {
                    limitation.call = Some(expression.span);
                }
                _ => {}
            }
            pending.extend(expression.kind.children());
        }
        self.index_limitations.push(limitation);
    }

    pub(crate) fn finish_index_limitations(&mut self) {
        for limitation in core::mem::take(&mut self.index_limitations) {
            let symbol = limitation
                .symbols
                .iter()
                .filter(|&&(_, id)| !self.inductive_loops.contains(&id))
                .map(|&(span, _)| span)
                .next_back();
            if let Some(at) = limitation.call.or(symbol) {
                self.error(at, DiagnosticKind::NonConstantIndex);
            }
        }
    }
}
