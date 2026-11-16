use alloc::boxed::Box;

use rglsl_types::extension::Extension;
use rglsl_types::stack::recurse;

use rglsl_ast::Span;
use rglsl_ast::ast::{
    Attribute, CaseLabel, CompoundStatement, Condition, DeclarationKind, Expression,
    ExpressionKind, ForStatement, JumpStatement, Statement, StatementKind,
};

use super::{Analyzer, Operand, SwitchContext};
use crate::constant::Constant;
use crate::diagnostic::DiagnosticKind;
use crate::scope::{Lookup, Origin, Qualifiers, SymbolKind};
use crate::types::Type;
use rglsl_types::ShaderStage;

impl Analyzer<'_> {
    fn attribute_value(&mut self, attribute: &Attribute, statement: &Statement, operand: &Operand) {
        let value = operand
            .value
            .as_ref()
            .filter(|_| operand.ty == Type::INT && operand.constant && !operand.specialization)
            .and_then(Constant::scalar_i64);
        let reason = match (attribute.name.node.as_str(), value) {
            ("dependency_length" | "multiple_wait_queuesQCOM", Some(value)) if value <= 0 => {
                Some("must be positive")
            }
            ("iteration_multiple", Some(0)) => Some("must be greater than or equal to 1"),
            _ => None,
        };
        if let Some(reason) = reason {
            self.error(
                statement.span,
                DiagnosticKind::InvalidAttribute {
                    attribute: attribute.name.node.clone(),
                    reason,
                },
            );
        }
    }

    fn boolean_condition_with(&mut self, span: Span, operand: &Operand) {
        if !operand.ty.is_error() && !operand.ty.is_bool() {
            self.error(
                span,
                DiagnosticKind::ConditionNotBool(self.show(&operand.ty)),
            );
        }
    }

    fn switch_selector(&mut self, span: Span, operand: &Operand) {
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
        self.scopes.push();
    }

    fn names_struct(&self, expression: &Expression) -> bool {
        let ExpressionKind::Variable(name) = &expression.kind else {
            return false;
        };
        let Some(Lookup::Symbol(id)) = self.lookup_quiet(name) else {
            return false;
        };
        matches!(
            self.symbol(id).map(|symbol| &symbol.kind),
            Some(SymbolKind::Struct(_) | SymbolKind::Reference(_))
        )
    }

    fn boolean_condition(&mut self, span: Span, condition: &Expression) {
        let operand = self.expression(condition);
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
                let qualifiers = match &declaration.kind.ty.node.qualifier {
                    Some(qualifier) => self.qualifiers(qualifier),
                    None => Qualifiers::default(),
                };
                let ty = self.type_specifier(&declaration.kind.ty.node.specifier);
                let operand = self.initializer(
                    declaration.kind.name.span,
                    &declaration.kind.initializer,
                    &ty,
                );
                if !ty.is_error() && !ty.is_bool() {
                    self.error(
                        declaration.kind.name.span,
                        DiagnosticKind::ConditionNotBool(self.show(&ty)),
                    );
                } else if !operand.ty.is_error() && !self.converts(&operand.ty, &ty) {
                    self.error(
                        declaration.kind.name.span,
                        DiagnosticKind::CannotConvert {
                            from: self.show(&operand.ty),
                            to: self.show(&ty),
                        },
                    );
                }
                let name = &declaration.kind.name;
                let id =
                    self.add_variable(&name.node, name.span, ty, qualifiers, Origin::Local, None);
                self.declarations.insert(declaration.id, id);
                if self.scopes.declare(&name.node, id).is_err() {
                    self.error(name.span, DiagnosticKind::Redeclaration(name.node.clone()));
                }
            }
        }
    }

    fn case_label(&mut self, span: Span, label: &CaseLabel) {
        let value = match label {
            CaseLabel::Default => None,
            CaseLabel::Case(expression) => {
                let operand = self.expression(expression);
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
                self.stage_check(span, |stage| {
                    (stage != ShaderStage::Fragment)
                        .then_some(DiagnosticKind::DiscardOutsideFragment)
                });
            }
            JumpStatement::Return(value) => self.return_statement(span, value.as_ref()),
            JumpStatement::Demote => self.demote(span),
            JumpStatement::TerminateInvocation => self.terminate_invocation(span),
            JumpStatement::TerminateRay => self.ray_jump(span, "terminateRayEXT"),
            JumpStatement::IgnoreIntersection => self.ray_jump(span, "ignoreIntersectionEXT"),
        }
    }

    fn return_statement(&mut self, span: Span, value: Option<&Expression>) {
        let operand = value.map(|value| (span, self.expression(value)));
        if self.in_main() {
            self.stage_layout.returned_from_main = true;
        }
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
            info.conversion = Some(Box::new(to.clone()));
        }
    }
}

fn generates_code(statement: &Statement) -> bool {
    match &statement.kind {
        StatementKind::CaseLabel(_) | StatementKind::Expression(None) => false,
        StatementKind::Declaration(declaration) => match &declaration.kind {
            DeclarationKind::InitDeclaratorList(list) => list
                .declarators
                .iter()
                .any(|declarator| declarator.kind.initializer.is_some()),
            _ => false,
        },
        _ => true,
    }
}

impl Analyzer<'_> {
    pub(crate) fn statements(&mut self, statements: &[Statement]) {
        for statement in statements {
            self.statement(statement);
        }
    }

    fn compound(&mut self, compound: &CompoundStatement) {
        self.nesting += 1;
        self.scopes.push();
        self.statements(&compound.statements);
        self.scopes.pop();
        self.nesting -= 1;
    }

    pub(crate) fn statement(&mut self, statement: &Statement) {
        recurse(|| match &statement.kind {
            StatementKind::Compound(compound) => {
                self.compound(compound);
            }
            StatementKind::Declaration(declaration) => {
                self.declaration(declaration);
            }
            StatementKind::Expression(expression) => {
                if let Some(expression) = expression
                    && !self.names_struct(expression)
                {
                    self.expression(expression);
                }
            }
            StatementKind::Selection {
                condition,
                then_branch,
                else_branch,
            } => {
                let operand = self.expression(condition);
                self.boolean_condition_with(statement.span, &operand);
                self.nesting += 1;
                self.stage_layout.selections += 1;
                self.scopes.push();
                self.statement(then_branch);
                self.scopes.pop();
                if let Some(else_branch) = else_branch {
                    self.scopes.push();
                    self.statement(else_branch);
                    self.scopes.pop();
                }
                self.stage_layout.selections -= 1;
                self.nesting -= 1;
            }
            StatementKind::Switch {
                selector,
                statements,
            } => {
                self.switch(statement.span, selector, statements);
            }
            StatementKind::CaseLabel(label) => {
                self.case_label(statement.span, label);
            }
            StatementKind::While { condition, body } => {
                self.loop_limitation(statement.span, "while");
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
                let operand = self.expression(condition);
                self.loop_limitation(statement.span, "do-while");
                self.boolean_condition_with(Span::new(end.saturating_sub(1), end), &operand);
            }
            StatementKind::For(for_statement) => {
                self.for_statement(for_statement);
                self.inductive_loop_check(statement.span, for_statement);
            }
            StatementKind::Jump(jump) => self.jump(statement.span, jump),
            StatementKind::Attributed {
                attributes,
                statement,
            } => {
                self.attributed(attributes, statement);
            }
        });
    }

    fn attributed(&mut self, attributes: &[Attribute], statement: &Statement) {
        let selection = matches!(
            statement.kind,
            StatementKind::Selection { .. } | StatementKind::Switch { .. }
        );
        let extensions: &'static [Extension] = if selection {
            &[Extension::ExtControlFlowAttributes]
        } else {
            &[
                Extension::ExtControlFlowAttributes,
                Extension::ExtControlFlowAttributes2,
                Extension::QcomMultipleWaitQueues,
            ]
        };
        self.require_extensions(statement.span, extensions, "attribute");
        for attribute in attributes {
            let Some(argument) = &attribute.argument else {
                continue;
            };
            let operand = self.expression(argument);
            if !selection {
                self.attribute_value(attribute, statement, &operand);
            }
        }
        self.statement(statement);
    }

    fn unscoped(&mut self, statement: &Statement) {
        match &statement.kind {
            StatementKind::Compound(compound) => {
                self.statements(&compound.statements);
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

    fn switch(&mut self, span: Span, selector: &Expression, statements: &[Statement]) {
        let operand = self.expression(selector);
        self.switch_selector(span, &operand);
        let mut labelled = false;
        for statement in statements {
            if matches!(statement.kind, StatementKind::CaseLabel(_)) {
                labelled = true;
            } else if generates_code(statement) && !labelled {
                labelled = true;
                self.error(statement.span, DiagnosticKind::StatementBeforeCase);
            }
            self.statement(statement);
        }
        self.scopes.pop();
        self.switches.pop();
        self.nesting -= 1;
    }
}
