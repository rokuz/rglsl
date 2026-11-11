use alloc::vec::Vec;

use rglsl_ast::ast::{
    Attribute, CaseLabel, Condition, Declaration, DeclarationKind, ForStatement, Initializer,
    JumpStatement, Statement, StatementKind,
};
use rglsl_sema::constant::Value;
use rglsl_sema::types::{Scalar as GlslScalar, Type as GlslType};

use super::constant::shape;
use super::function::{FunctionLowerer, Local};
use super::{internal, semantic, unsupported, GlobalRef, Result};
use crate::{
    Block, Expression, LoopControl, LoopDependency, Statement as IrStatement, SwitchCase,
    SwitchValue, UnaryOperator,
};

impl FunctionLowerer<'_, '_> {
    pub(super) fn statements(&mut self, statements: &[Statement]) -> Result<()> {
        for statement in statements {
            if self.terminated() {
                break;
            }
            self.statement(statement)?;
        }
        Ok(())
    }

    fn statement(&mut self, statement: &Statement) -> Result<()> {
        let at = self.at(statement.span);
        match statement.kind {
            StatementKind::Compound(ref compound) => self.statements(&compound.statements),
            StatementKind::Declaration(ref declaration) => self.local_declaration(declaration),
            StatementKind::Expression(Some(ref expression)) => self.effect(expression),
            StatementKind::Expression(None) => Ok(()),
            StatementKind::Selection {
                ref condition,
                ref then_branch,
                ref else_branch,
            } => {
                let condition = self.rvalue(condition)?;
                let accept = self.nested(|this| this.statement(then_branch))?;
                let reject = match *else_branch {
                    Some(ref branch) => self.nested(|this| this.statement(branch))?,
                    None => Block::new(),
                };
                self.push(
                    IrStatement::If {
                        condition,
                        accept,
                        reject,
                    },
                    at,
                );
                Ok(())
            }
            StatementKind::Switch {
                ref selector,
                ref statements,
            } => self.switch(selector, statements, at),
            StatementKind::CaseLabel(_) => Err(semantic("a case label outside a switch", at)),
            StatementKind::While { .. } | StatementKind::DoWhile { .. } | StatementKind::For(_) => {
                self.iteration(statement, LoopControl::default())
            }
            StatementKind::Attributed {
                ref attributes,
                ref statement,
            } => match statement.kind {
                StatementKind::While { .. }
                | StatementKind::DoWhile { .. }
                | StatementKind::For(_) => {
                    let control = self.loop_control(attributes);
                    self.iteration(statement, control)
                }
                _ => self.statement(statement),
            },
            StatementKind::Jump(ref jump) => {
                let statement =
                    match *jump {
                        JumpStatement::Break => IrStatement::Break,
                        JumpStatement::Continue => IrStatement::Continue,
                        JumpStatement::Discard => IrStatement::Kill,
                        JumpStatement::TerminateRay => IrStatement::RayPipelineFunction(
                            crate::RayPipelineFunction::TerminateRay { nv: false },
                        ),
                        JumpStatement::IgnoreIntersection => IrStatement::RayPipelineFunction(
                            crate::RayPipelineFunction::IgnoreIntersection { nv: false },
                        ),
                        JumpStatement::Return(None) => IrStatement::Return { value: None },
                        JumpStatement::Return(Some(ref value)) => IrStatement::Return {
                            value: Some(self.rvalue(value)?),
                        },
                    };
                self.push(statement, at);
                Ok(())
            }
        }
    }

    fn loop_control(&self, attributes: &[Attribute]) -> LoopControl {
        let mut control = LoopControl::default();
        for attribute in attributes {
            let argument = attribute.argument.as_ref().map(|argument| {
                self.lw
                    .analysis
                    .expression(argument.id)
                    .filter(|info| {
                        info.ty == GlslType::INT && info.is_constant && !info.is_specialization
                    })
                    .and_then(|info| info.value.as_ref())
                    .and_then(rglsl_sema::constant::Constant::scalar_i64)
                    .and_then(|value| i32::try_from(value).ok())
            });
            let unsigned = |value: i32| u32::from_ne_bytes(value.to_ne_bytes());
            match (attribute.name.node.as_str(), argument) {
                ("unroll", None) => {
                    control.unroll = true;
                    control.dont_unroll = false;
                }
                ("loop" | "dont_unroll", None) => {
                    control.unroll = false;
                    control.dont_unroll = true;
                    control.peel_count = None;
                    control.partial_count = None;
                }
                ("dependency_infinite", None) => {
                    control.dependency = Some(LoopDependency::Infinite);
                }
                ("dependency_length", Some(Some(value))) if value > 0 => {
                    control.dependency = Some(LoopDependency::Length(unsigned(value)));
                }
                ("min_iterations", Some(Some(value))) => {
                    control.min_iterations = Some(unsigned(value)).filter(|value| *value > 0);
                }
                ("max_iterations", Some(Some(value))) => {
                    control.max_iterations =
                        Some(unsigned(value)).filter(|value| *value != u32::MAX);
                }
                ("iteration_multiple", Some(Some(value))) if value != 0 => {
                    control.iteration_multiple = Some(unsigned(value)).filter(|value| *value > 1);
                }
                ("peel_count", Some(Some(value))) => {
                    control.peel_count = Some(unsigned(value)).filter(|value| *value > 0);
                    control.dont_unroll = false;
                }
                ("partial_count", Some(Some(value))) => {
                    control.partial_count = Some(unsigned(value)).filter(|value| *value > 0);
                    control.dont_unroll = false;
                }
                ("multiple_wait_queuesQCOM", None) => control.multiple_wait_queues = Some(0),
                ("multiple_wait_queuesQCOM", Some(Some(value))) if value > 0 => {
                    control.multiple_wait_queues = Some(unsigned(value));
                }
                _ => {}
            }
        }
        control
    }

    fn iteration(&mut self, statement: &Statement, control: LoopControl) -> Result<()> {
        let at = self.at(statement.span);
        match statement.kind {
            StatementKind::While {
                ref condition,
                ref body,
            } => {
                let body = self.nested(|this| {
                    let condition = this.condition(condition)?;
                    this.break_unless(condition, at)?;
                    this.statement(body)
                })?;
                self.push(
                    IrStatement::Loop {
                        body,
                        continuing: Block::new(),
                        break_if: None,
                        control,
                    },
                    at,
                );
                Ok(())
            }
            StatementKind::DoWhile {
                ref body,
                ref condition,
            } => {
                let body = self.nested(|this| this.statement(body))?;
                let mut break_if = None;
                let continuing = self.nested(|this| {
                    let value = this.rvalue(condition)?;
                    break_if = Some(this.add(
                        Expression::Unary {
                            op: UnaryOperator::LogicalNot,
                            expr: value,
                        },
                        at,
                    )?);
                    Ok(())
                })?;
                self.push(
                    IrStatement::Loop {
                        body,
                        continuing,
                        break_if,
                        control,
                    },
                    at,
                );
                Ok(())
            }
            StatementKind::For(ref for_statement) => self.for_loop(for_statement, control, at),
            _ => Err(internal(at)),
        }
    }

    fn break_unless(
        &mut self,
        condition: crate::Handle<Expression>,
        at: crate::Span,
    ) -> Result<()> {
        let negated = self.add(
            Expression::Unary {
                op: UnaryOperator::LogicalNot,
                expr: condition,
            },
            at,
        )?;
        let mut accept = Block::new();
        accept.push(IrStatement::Break, at);
        self.push(
            IrStatement::If {
                condition: negated,
                accept,
                reject: Block::new(),
            },
            at,
        );
        Ok(())
    }

    fn condition(&mut self, condition: &Condition) -> Result<crate::Handle<Expression>> {
        match *condition {
            Condition::Expression(ref expression) => self.rvalue(expression),
            Condition::Declaration(ref declaration) => {
                let at = self.at(declaration.span);
                let symbol = *self
                    .lw
                    .analysis
                    .declarations
                    .get(&declaration.id)
                    .ok_or_else(|| internal(at))?;
                let ty = self
                    .lw
                    .variable(symbol)
                    .map(|variable| variable.ty.clone())
                    .ok_or_else(|| internal(at))?;
                let local = self.local(&ty, Some(declaration.name.node.clone()), at)?;
                self.variables.insert(symbol, Local::Variable(local));
                let value = self.initializer(&declaration.initializer, &ty)?;
                let pointer = self.local_pointer(local, at)?;
                self.push(IrStatement::Store { pointer, value }, at);
                let pointer = self.local_pointer(local, at)?;
                self.add(Expression::Load { pointer }, at)
            }
        }
    }

    fn for_loop(
        &mut self,
        statement: &ForStatement,
        control: LoopControl,
        at: crate::Span,
    ) -> Result<()> {
        self.statement(&statement.init)?;
        let body = self.nested(|this| {
            if let Some(ref condition) = statement.condition {
                let condition = this.condition(condition)?;
                this.break_unless(condition, at)?;
            }
            this.statement(&statement.body)
        })?;
        let continuing = self.nested(|this| match statement.increment {
            Some(ref increment) => this.effect(increment),
            None => Ok(()),
        })?;
        self.push(
            IrStatement::Loop {
                body,
                continuing,
                break_if: None,
                control,
            },
            at,
        );
        Ok(())
    }

    fn local_declaration(&mut self, declaration: &Declaration) -> Result<()> {
        let at = self.at(declaration.span);
        match declaration.kind {
            DeclarationKind::InitDeclaratorList(ref list) => {
                for declarator in &list.declarators {
                    let at = self.at(declarator.span);
                    let Some(&symbol) = self.lw.analysis.declarations.get(&declarator.id) else {
                        continue;
                    };
                    let variable = self.lw.variable(symbol).ok_or_else(|| internal(at))?;
                    if variable.qualifiers.precise {
                        return Err(unsupported("`precise`", at));
                    }
                    if variable.qualifiers.specialization {
                        if let Some(&Initializer::Expression(ref expression)) = declarator
                            .initializer
                            .as_ref()
                            .map(|initializer| &initializer.node)
                        {
                            let name = Some(declarator.name.node.clone());
                            let handle = self.lw.specialization(expression, name, at)?;
                            self.lw.globals.insert(symbol, GlobalRef::Override(handle));
                            continue;
                        }
                    }
                    if variable.qualifiers.constant
                        && variable.value.as_ref().is_some_and(|value| {
                            shape(&variable.ty, &value.values, &self.lw.analysis.types).is_some()
                        })
                    {
                        self.variables.insert(symbol, Local::Constant);
                        continue;
                    }
                    let ty = variable.ty.clone();
                    if ty
                        .as_opaque()
                        .is_some_and(rglsl_sema::types::Opaque::is_private_object)
                        || ty
                            .element_type()
                            .and_then(|element| element.as_opaque())
                            .is_some_and(rglsl_sema::types::Opaque::is_private_object)
                    {
                        self.lw
                            .deferred_private
                            .insert(symbol, (declarator.name.node.clone(), at));
                        continue;
                    }
                    let ir = self.lw.variable_ir_type(&ty, &variable.qualifiers, at)?;
                    let local = self.local_typed(ir, Some(declarator.name.node.clone()), at);
                    self.variables.insert(symbol, Local::Variable(local));
                    if let Some(ref initializer) = declarator.initializer {
                        let value = self.initializer(initializer, &ty)?;
                        let value = self.requalify_to(value, ir, at)?;
                        let pointer = self.local_pointer(local, at)?;
                        self.push(IrStatement::Store { pointer, value }, at);
                    }
                }
                Ok(())
            }
            DeclarationKind::Precision { .. }
            | DeclarationKind::FunctionPrototype(_)
            | DeclarationKind::SpirvInstruction { .. }
            | DeclarationKind::SpirvExecutionMode(_) => Ok(()),
            DeclarationKind::Block { .. }
            | DeclarationKind::Qualifier(_)
            | DeclarationKind::QualifiedIdentifiers { .. } => {
                Err(unsupported("this declaration inside a function", at))
            }
        }
    }

    fn switch(
        &mut self,
        selector: &rglsl_ast::ast::Expression,
        statements: &[Statement],
        at: crate::Span,
    ) -> Result<()> {
        let (value, ty) = self.typed(selector)?;
        let unsigned = ty == GlslType::scalar(GlslScalar::Uint);
        let mut groups: Vec<(Vec<SwitchValue>, Vec<&Statement>)> = Vec::new();
        for statement in statements {
            match statement.kind {
                StatementKind::CaseLabel(ref label) => {
                    let case = match *label {
                        CaseLabel::Default => SwitchValue::Default,
                        CaseLabel::Case(ref expression) => {
                            let label_at = self.at(expression.span);
                            let constant = self
                                .lw
                                .analysis
                                .expression(expression.id)
                                .and_then(|info| info.value.as_ref())
                                .and_then(|value| value.first())
                                .ok_or_else(|| internal(label_at))?;
                            match (constant, unsigned) {
                                (Value::Int(value), false) => SwitchValue::I32(value),
                                (Value::Int(value), true) => {
                                    SwitchValue::U32(value.cast_unsigned())
                                }
                                (Value::Uint(value), true) => SwitchValue::U32(value),
                                (Value::Uint(value), false) => {
                                    SwitchValue::I32(value.cast_signed())
                                }
                                _ => return Err(internal(label_at)),
                            }
                        }
                    };
                    match groups.last_mut() {
                        Some(&mut (ref mut labels, ref body)) if body.is_empty() => {
                            labels.push(case)
                        }
                        _ => groups.push((alloc::vec![case], Vec::new())),
                    }
                }
                _ => {
                    if let Some(&mut (_, ref mut body)) = groups.last_mut() {
                        body.push(statement);
                    }
                }
            }
        }
        let mut cases = Vec::new();
        for (labels, body) in groups {
            let count = labels.len();
            for (index, label) in labels.into_iter().enumerate() {
                if index + 1 < count {
                    cases.push(SwitchCase {
                        value: label,
                        body: Block::new(),
                        fall_through: true,
                    });
                    continue;
                }
                let mut block = self.nested(|this| {
                    for statement in &body {
                        if this.terminated() {
                            break;
                        }
                        this.statement(statement)?;
                    }
                    Ok(())
                })?;
                let fall_through = match block.last() {
                    Some(&IrStatement::Break) => {
                        let length = block.len();
                        block.cull(length.saturating_sub(1)..);
                        false
                    }
                    Some(
                        &(IrStatement::Return { .. }
                        | IrStatement::Continue
                        | IrStatement::Kill
                        | IrStatement::Abort { .. }),
                    ) => false,
                    Some(&IrStatement::RayPipelineFunction(ref function))
                        if function.is_terminator() =>
                    {
                        false
                    }
                    _ => true,
                };
                cases.push(SwitchCase {
                    value: label,
                    body: block,
                    fall_through,
                });
            }
        }
        if let Some(last) = cases.last_mut() {
            last.fall_through = false;
        }
        if !cases.iter().any(|case| case.value == SwitchValue::Default) {
            cases.push(SwitchCase {
                value: SwitchValue::Default,
                body: Block::new(),
                fall_through: false,
            });
        }
        self.push(
            IrStatement::Switch {
                selector: value,
                cases,
            },
            at,
        );
        Ok(())
    }
}
