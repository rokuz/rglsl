use rglsl_ast::ast::{
    CaseLabel, Condition, DeclarationKind, Expression, ExpressionKind, ForStatement, JumpStatement,
    Statement, StatementKind,
};
use rglsl_ast::Span;

use super::{Analyzer, SwitchContext};
use crate::builtins::Stage;
use crate::constant::Constant;
use crate::diagnostic::DiagnosticKind;
use crate::scope::{Lookup, Origin, Qualifiers, SymbolKind};
use crate::types::Type;

impl Analyzer<'_> {
    pub(crate) fn statement(&mut self, statement: &Statement) {
        match &statement.kind {
            StatementKind::Compound(compound) => {
                self.nesting += 1;
                self.scoped(|analyzer| {
                    for statement in &compound.statements {
                        analyzer.statement(statement);
                    }
                });
                self.nesting -= 1;
            }
            StatementKind::Declaration(declaration) => self.declaration(declaration),
            StatementKind::Expression(expression) => {
                if let Some(expression) = expression {
                    if !self.names_struct(expression) {
                        self.expression(expression);
                    }
                }
            }
            StatementKind::Selection {
                condition,
                then_branch,
                else_branch,
            } => {
                self.boolean_condition(statement.span, condition);
                self.nesting += 1;
                self.scoped(|analyzer| analyzer.statement(then_branch));
                if let Some(else_branch) = else_branch {
                    self.scoped(|analyzer| analyzer.statement(else_branch));
                }
                self.nesting -= 1;
            }
            StatementKind::Switch {
                selector,
                statements,
            } => self.switch(statement.span, selector, statements),
            StatementKind::CaseLabel(label) => self.case_label(statement.span, label),
            StatementKind::While { condition, body } => {
                self.scopes.push();
                self.condition(condition);
                self.loop_body(body);
                self.scopes.pop();
            }
            StatementKind::DoWhile { body, condition } => {
                self.scopes.push();
                self.loop_body(body);
                self.scopes.pop();
                let end = statement.span.end;
                self.boolean_condition(Span::new(end.saturating_sub(1), end), condition);
            }
            StatementKind::For(statement) => self.for_statement(statement),
            StatementKind::Jump(jump) => self.jump(statement.span, jump),
        }
    }

    fn names_struct(&self, expression: &Expression) -> bool {
        let ExpressionKind::Variable(name) = &expression.kind else {
            return false;
        };
        let Some(Lookup::Symbol(id)) = self.lookup(name) else {
            return false;
        };
        matches!(
            self.symbol(id).map(|symbol| &symbol.kind),
            Some(SymbolKind::Struct(_))
        )
    }

    fn unscoped(&mut self, statement: &Statement) {
        match &statement.kind {
            StatementKind::Compound(compound) => {
                for statement in &compound.statements {
                    self.statement(statement);
                }
            }
            _ => self.statement(statement),
        }
    }

    fn loop_body(&mut self, body: &Statement) {
        self.loop_depth += 1;
        self.nesting += 1;
        self.unscoped(body);
        self.nesting -= 1;
        self.loop_depth -= 1;
    }

    fn for_statement(&mut self, statement: &ForStatement) {
        self.scopes.push();
        self.statement(&statement.init);
        if let Some(condition) = &statement.condition {
            self.condition(condition);
        }
        if let Some(increment) = &statement.increment {
            self.expression(increment);
        }
        self.loop_body(&statement.body);
        self.scopes.pop();
    }

    fn boolean_condition(&mut self, span: Span, condition: &Expression) {
        let operand = self.value_expression(condition);
        if !operand.ty.is_error() && !operand.ty.is_bool() {
            self.error(
                span,
                DiagnosticKind::ConditionNotBool(self.show(&operand.ty)),
            );
        }
    }

    fn condition(&mut self, condition: &Condition) {
        match condition {
            Condition::Expression(expression) => {
                self.boolean_condition(expression.span, expression);
            }
            Condition::Declaration(declaration) => {
                let qualifiers = match &declaration.ty.qualifier {
                    Some(qualifier) => self.qualifiers(qualifier),
                    None => Qualifiers::default(),
                };
                let ty = self.type_specifier(&declaration.ty.specifier);
                let operand =
                    self.initializer(declaration.name.span, &declaration.initializer, &ty);
                if !ty.is_error() && !ty.is_bool() {
                    self.error(
                        declaration.name.span,
                        DiagnosticKind::ConditionNotBool(self.show(&ty)),
                    );
                } else if !operand.ty.is_error() && !self.converts(&operand.ty, &ty) {
                    self.error(
                        declaration.name.span,
                        DiagnosticKind::CannotConvert {
                            from: self.show(&operand.ty),
                            to: self.show(&ty),
                        },
                    );
                }
                let name = &declaration.name;
                let id =
                    self.add_variable(&name.node, name.span, ty, qualifiers, Origin::Local, None);
                self.declarations.insert(declaration.id, id);
                if self.scopes.declare(&name.node, id).is_err() {
                    self.error(name.span, DiagnosticKind::Redeclaration(name.node.clone()));
                }
            }
        }
    }

    fn switch(&mut self, span: Span, selector: &Expression, statements: &[Statement]) {
        let operand = self.value_expression(selector);
        if !operand.ty.is_error() && !operand.ty.is_scalar_integer() {
            self.error(
                span,
                DiagnosticKind::SwitchSelectorNotInteger(self.show(&operand.ty)),
            );
        }
        self.nesting += 1;
        self.switches.push(SwitchContext {
            labels: alloc::vec::Vec::new(),
            has_default: false,
            nesting: self.nesting,
        });
        self.scoped(|analyzer| {
            let mut labelled = false;
            for statement in statements {
                let generates_code = match &statement.kind {
                    StatementKind::CaseLabel(_) => {
                        labelled = true;
                        false
                    }
                    StatementKind::Expression(None) => false,
                    StatementKind::Declaration(declaration) => match &declaration.kind {
                        DeclarationKind::InitDeclaratorList(list) => list
                            .declarators
                            .iter()
                            .any(|declarator| declarator.initializer.is_some()),
                        _ => false,
                    },
                    _ => true,
                };
                if generates_code && !labelled {
                    labelled = true;
                    analyzer.error(statement.span, DiagnosticKind::StatementBeforeCase);
                }
                analyzer.statement(statement);
            }
        });
        self.switches.pop();
        self.nesting -= 1;
    }

    fn case_label(&mut self, span: Span, label: &CaseLabel) {
        let value = match label {
            CaseLabel::Default => None,
            CaseLabel::Case(expression) => {
                let operand = self.value_expression(expression);
                if operand.ty.is_error() {
                    return;
                }
                if !operand.constant || operand.specialization || !operand.ty.is_scalar_integer() {
                    self.error(expression.span, DiagnosticKind::InvalidCaseLabel);
                    return;
                }
                match operand.value.as_ref().and_then(Constant::scalar_i64) {
                    Some(value) => Some(value),
                    None => return,
                }
            }
        };
        let nesting = self.nesting;
        let Some(context) = self.switches.last_mut() else {
            self.error(span, DiagnosticKind::CaseOutsideSwitch);
            return;
        };
        if context.nesting != nesting {
            self.error(span, DiagnosticKind::CaseOutsideSwitch);
            return;
        }
        let duplicate = match value {
            Some(value) => {
                let seen = context.labels.contains(&value);
                context.labels.push(value);
                seen
            }
            None => core::mem::replace(&mut context.has_default, true),
        };
        if duplicate {
            self.error(span, DiagnosticKind::DuplicateCaseLabel);
        }
    }

    fn jump(&mut self, span: Span, jump: &JumpStatement) {
        match jump {
            JumpStatement::Continue => {
                if self.loop_depth == 0 {
                    self.error(span, DiagnosticKind::ContinueOutsideLoop);
                }
            }
            JumpStatement::Break => {
                if self.loop_depth == 0 && self.switches.is_empty() {
                    self.error(span, DiagnosticKind::BreakOutsideLoop);
                }
            }
            JumpStatement::Discard => {
                if self.options.stage != Stage::Fragment {
                    self.error(span, DiagnosticKind::DiscardOutsideFragment);
                }
            }
            JumpStatement::Return(value) => self.return_statement(span, value.as_ref()),
        }
    }

    fn return_statement(&mut self, span: Span, value: Option<&Expression>) {
        let operand = value.map(|value| (span, self.expression(value)));
        let Some(expected) = self
            .function
            .as_ref()
            .map(|function| function.return_type.clone())
        else {
            return;
        };
        match operand {
            None => {
                if !expected.is_void() && !expected.is_error() {
                    self.error(
                        span,
                        DiagnosticKind::MissingReturnValue(self.show(&expected)),
                    );
                }
            }
            Some((value_span, operand)) => {
                if let Some(function) = &mut self.function {
                    function.returns_value = true;
                }
                if !operand.ty.is_error() {
                    self.assignment_small_check(value_span, &operand.ty, "return");
                }
                if expected.is_void() {
                    self.error(value_span, DiagnosticKind::VoidReturnWithValue);
                } else if !operand.ty.is_error()
                    && !expected.is_error()
                    && !self.converts(&operand.ty, &expected)
                {
                    self.error(
                        value_span,
                        DiagnosticKind::ReturnTypeMismatch {
                            from: self.show(&operand.ty),
                            to: self.show(&expected),
                        },
                    );
                } else if let Some(value) = value {
                    self.record_conversion(value, &operand.ty, &expected);
                }
            }
        }
    }

    pub(crate) fn record_conversion(&mut self, expression: &Expression, from: &Type, to: &Type) {
        if from == to || from.is_error() || to.is_error() {
            return;
        }
        if let Some(info) = self.expressions.get_mut(&expression.id) {
            info.conversion = Some(to.clone());
        }
    }
}
