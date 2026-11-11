use alloc::vec::Vec;

use rglsl_ast::ast::{
    Attribute, CaseLabel, Condition, Declaration, DeclarationKind, ForStatement, JumpStatement,
    Statement, StatementKind,
};
use rglsl_sema::constant::Value;
use rglsl_sema::types::{Scalar as GlslScalar, Type as GlslType};

use super::constant::shape;
use super::function::{FunctionLowerer, Local};
use super::{internal, semantic, unsupported, GlobalRef, Result};
use crate::{
    Block, Expression, LoopControl, LoopDependency, SelectionControl, Statement as IrStatement,
    SwitchCase, SwitchValue, UnaryOperator,
};

fn selection_control(attributes: &[Attribute]) -> SelectionControl {
    let mut flatten = false;
    let mut dont_flatten = false;
    for attribute in attributes
        .iter()
        .filter(|attribute| attribute.argument.is_none())
    {
        match attribute.name.node.as_str() {
            "flatten" => flatten = true,
            "branch" | "dont_flatten" => dont_flatten = true,
            _ => {}
        }
    }
    if flatten {
        SelectionControl::Flatten
    } else if dont_flatten {
        SelectionControl::DontFlatten
    } else {
        SelectionControl::None
    }
}

impl FunctionLowerer<'_, '_> {
    pub(super) fn statements(&mut self, statements: &[Statement]) -> Result<()> {
        super::function::on_heap!(self, |cx| cx.statements(statements))
    }

    fn unreachable_declaration(&mut self, statement: &Statement) -> Result<()> {
        match statement.kind {
            StatementKind::Declaration(ref declaration) => {
                self.local_declaration(declaration, false)
            }
            _ => Ok(()),
        }
    }

    fn jump(&mut self, jump: &JumpStatement, at: crate::Span) -> Result<()> {
        let statement =
            match *jump {
                JumpStatement::Break => IrStatement::Break,
                JumpStatement::Continue => IrStatement::Continue,
                JumpStatement::Discard => IrStatement::Kill,
                JumpStatement::Demote => IrStatement::Demote,
                JumpStatement::TerminateRay => {
                    IrStatement::RayPipelineFunction(crate::RayPipelineFunction::TerminateRay {
                        nv: false,
                    })
                }
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
                control: SelectionControl::None,
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

    fn local_declaration(&mut self, declaration: &Declaration, reachable: bool) -> Result<()> {
        let at = self.at(declaration.span);
        match declaration.kind {
            DeclarationKind::InitDeclaratorList(ref list) => {
                for declarator in &list.declarators {
                    let at = self.at(declarator.span);
                    let Some(&symbol) = self.lw.analysis.declarations.get(&declarator.id) else {
                        continue;
                    };
                    let variable = self.lw.variable(symbol).ok_or_else(|| internal(at))?;
                    if variable.qualifiers.specialization {
                        if let Some(initializer) = declarator.initializer.as_ref() {
                            let name = Some(declarator.name.node.clone());
                            let ty = variable.ty.clone();
                            let handle =
                                self.lw
                                    .specialized_initializer(initializer, &ty, name, at)?;
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
                    if let Some(initializer) = declarator.initializer.as_ref().filter(|_| reachable)
                    {
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
            DeclarationKind::QualifiedIdentifiers { ref qualifier, .. }
                if qualifier.qualifiers.iter().all(|single| {
                    matches!(single.node, rglsl_ast::ast::SingleTypeQualifier::Precise)
                }) =>
            {
                Ok(())
            }
            DeclarationKind::Block { .. }
            | DeclarationKind::Qualifier(_)
            | DeclarationKind::QualifiedIdentifiers { .. } => {
                Err(unsupported("this declaration inside a function", at))
            }
        }
    }
}

#[allow(clippy::await_holding_refcell_ref)]
impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    pub(super) async fn statements(self, statements: &'b [Statement]) -> Result<()> {
        let mut this = self.lowerer();
        for statement in statements {
            if this.terminated() {
                this.unreachable_declaration(statement)?;
            } else {
                {
                    let frame = self.clone().statement(statement);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
            }
        }
        Ok(())
    }

    async fn statement(self, statement: &'b Statement) -> Result<()> {
        let mut this = self.lowerer();
        let at = this.at(statement.span);
        match statement.kind {
            StatementKind::Compound(ref compound) => {
                let frame = self.clone().statements(&compound.statements);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            StatementKind::Declaration(ref declaration) => {
                this.local_declaration(declaration, true)
            }
            StatementKind::Expression(Some(ref expression)) => {
                let frame = self.clone().effect(expression);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            StatementKind::Expression(None) => Ok(()),
            StatementKind::Selection {
                ref condition,
                ref then_branch,
                ref else_branch,
            } => {
                let frame = self.clone().selection(
                    condition,
                    then_branch,
                    else_branch.as_deref(),
                    SelectionControl::None,
                    at,
                );
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            StatementKind::Switch {
                ref selector,
                ref statements,
            } => {
                let frame = self
                    .clone()
                    .switch(selector, statements, SelectionControl::None, at);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            StatementKind::CaseLabel(_) => Err(semantic("a case label outside a switch", at)),
            StatementKind::While { .. } | StatementKind::DoWhile { .. } | StatementKind::For(_) => {
                let frame = self.clone().iteration(statement, LoopControl::default());
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            StatementKind::Attributed {
                ref attributes,
                ref statement,
            } => {
                let frame = self.clone().attributed(attributes, statement);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            StatementKind::Jump(ref jump) => this.jump(jump, at),
        }
    }

    async fn attributed(self, attributes: &'b [Attribute], statement: &'b Statement) -> Result<()> {
        let this = self.lowerer();
        match statement.kind {
            StatementKind::While { .. } | StatementKind::DoWhile { .. } | StatementKind::For(_) => {
                let control = this.loop_control(attributes);
                {
                    let frame = self.clone().iteration(statement, control);
                    drop(this);
                    let result = self.nest(frame).await;
                    result
                }
            }
            StatementKind::Selection {
                ref condition,
                ref then_branch,
                ref else_branch,
            } => {
                let frame = self.clone().selection(
                    condition,
                    then_branch,
                    else_branch.as_deref(),
                    selection_control(attributes),
                    this.at(statement.span),
                );
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            StatementKind::Switch {
                ref selector,
                ref statements,
            } => {
                let frame = self.clone().switch(
                    selector,
                    statements,
                    selection_control(attributes),
                    this.at(statement.span),
                );
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            _ => {
                let frame = self.clone().statement(statement);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
        }
    }

    async fn selection(
        self,
        condition: &'b rglsl_ast::ast::Expression,
        then_branch: &'b Statement,
        else_branch: Option<&'b Statement>,
        control: SelectionControl,
        at: crate::Span,
    ) -> Result<()> {
        let mut this = self.lowerer();
        let condition = {
            let frame = self.clone().rvalue(condition);
            drop(this);
            let result = self.nest(frame).await;
            this = self.lowerer();
            result
        }?;
        let accept = {
            drop(this);
            let result = self
                .clone()
                .block(self.nest(self.clone().statement(then_branch)))
                .await;
            this = self.lowerer();
            result
        }?;
        let reject = match else_branch {
            Some(branch) => {
                drop(this);
                let result = self
                    .clone()
                    .block(self.nest(self.clone().statement(branch)))
                    .await;
                this = self.lowerer();
                result
            }?,
            None => Block::new(),
        };
        this.push(
            IrStatement::If {
                condition,
                accept,
                reject,
                control,
            },
            at,
        );
        Ok(())
    }

    async fn iteration(self, statement: &'b Statement, control: LoopControl) -> Result<()> {
        let this = self.lowerer();
        let at = this.at(statement.span);
        match statement.kind {
            StatementKind::While {
                ref condition,
                ref body,
            } => {
                let frame = self.clone().while_loop(condition, body, control, at);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            StatementKind::DoWhile {
                ref body,
                ref condition,
            } => {
                let frame = self.clone().do_while_loop(body, condition, control, at);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            StatementKind::For(ref for_statement) => {
                let frame = self.clone().for_loop(for_statement, control, at);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            _ => Err(internal(at)),
        }
    }

    async fn while_loop(
        self,
        condition: &'b Condition,
        body: &'b Statement,
        control: LoopControl,
        at: crate::Span,
    ) -> Result<()> {
        let mut this = self.lowerer();
        let cx = self.clone();
        let frame = async move {
            {
                let mut this = cx.lowerer();
                let condition = this.condition(condition)?;
                this.break_unless(condition, at)?;
            }
            cx.nest(cx.clone().statement(body)).await
        };
        let body = {
            drop(this);
            let result = self.clone().block(self.nest(frame)).await;
            this = self.lowerer();
            result
        }?;
        this.push(
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

    async fn do_while_loop(
        self,
        body: &'b Statement,
        condition: &'b rglsl_ast::ast::Expression,
        control: LoopControl,
        at: crate::Span,
    ) -> Result<()> {
        let mut this = self.lowerer();
        let body = {
            drop(this);
            let result = self
                .clone()
                .block(self.nest(self.clone().statement(body)))
                .await;
            this = self.lowerer();
            result
        }?;
        let cx = self.clone();
        let frame = async move {
            let value = cx.nest(cx.clone().rvalue(condition)).await?;
            cx.lowerer().add(
                Expression::Unary {
                    op: UnaryOperator::LogicalNot,
                    expr: value,
                },
                at,
            )
        };
        let (continuing, break_if) = {
            drop(this);
            let result = self.clone().block_with(self.nest(frame)).await;
            this = self.lowerer();
            result
        }?;
        let break_if = Some(break_if);
        this.push(
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

    async fn for_loop(
        self,
        statement: &'b ForStatement,
        control: LoopControl,
        at: crate::Span,
    ) -> Result<()> {
        let mut this = self.lowerer();
        {
            let frame = self.clone().statement(&statement.init);
            drop(this);
            let result = self.nest(frame).await;
            this = self.lowerer();
            result
        }?;
        let cx = self.clone();
        let frame = async move {
            if let Some(ref condition) = statement.condition {
                let mut this = cx.lowerer();
                let condition = this.condition(condition)?;
                this.break_unless(condition, at)?;
            }
            cx.nest(cx.clone().statement(&statement.body)).await
        };
        let body = {
            drop(this);
            let result = self.clone().block(self.nest(frame)).await;
            this = self.lowerer();
            result
        }?;
        let cx = self.clone();
        let frame = async move {
            match statement.increment {
                Some(ref increment) => cx.nest(cx.clone().effect(increment)).await,
                None => Ok(()),
            }
        };
        let continuing = {
            drop(this);
            let result = self.clone().block(self.nest(frame)).await;
            this = self.lowerer();
            result
        }?;
        this.push(
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

    async fn switch(
        self,
        selector: &'b rglsl_ast::ast::Expression,
        statements: &'b [Statement],
        control: SelectionControl,
        at: crate::Span,
    ) -> Result<()> {
        let mut this = self.lowerer();
        if statements.is_empty() {
            return {
                let frame = self.clone().effect(selector);
                drop(this);
                let result = self.nest(frame).await;
                result
            };
        }
        let (value, ty) = {
            let frame = self.clone().typed(selector);
            drop(this);
            let result = self.nest(frame).await;
            this = self.lowerer();
            result
        }?;
        let unsigned = ty == GlslType::scalar(GlslScalar::Uint);
        let mut groups: Vec<(Vec<SwitchValue>, Vec<&Statement>)> = Vec::new();
        for statement in statements {
            match statement.kind {
                StatementKind::CaseLabel(ref label) => {
                    let case = match *label {
                        CaseLabel::Default => SwitchValue::Default,
                        CaseLabel::Case(ref expression) => {
                            let label_at = this.at(expression.span);
                            let constant = this
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
                let cx = self.clone();
                let statements = body.clone();
                let frame = async move {
                    for statement in statements {
                        let terminated = cx.lowerer().terminated();
                        if terminated {
                            cx.lowerer().unreachable_declaration(statement)?;
                        } else {
                            cx.nest(cx.clone().statement(statement)).await?;
                        }
                    }
                    Ok(())
                };
                let mut block = {
                    drop(this);
                    let result = self.clone().block(self.nest(frame)).await;
                    this = self.lowerer();
                    result
                }?;
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
        this.push(
            IrStatement::Switch {
                selector: value,
                cases,
                control,
            },
            at,
        );
        Ok(())
    }
}
