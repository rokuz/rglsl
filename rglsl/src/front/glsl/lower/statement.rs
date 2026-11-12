use alloc::vec::Vec;

use rglsl_ast::ast::{
    Attribute, CaseLabel, Condition, Declaration, DeclarationKind, ForStatement, JumpStatement,
    Statement, StatementKind,
};
use rglsl_sema::constant::Value;
use rglsl_sema::types::{Scalar as GlslScalar, Type as GlslType};

use super::constant::shape;
use super::function::{ends_in_jump, FunctionLowerer, Local};
use super::{internal, semantic, unsupported, GlobalRef, Result};
use crate::{
    Block, Expression, Literal, LoopControl, LoopDependency, SelectionControl,
    Statement as IrStatement, SwitchCase, SwitchValue, UnaryOperator,
};

const fn switch_value(value: Value, unsigned: bool) -> Option<SwitchValue> {
    match (value, unsigned) {
        (Value::Int(value), false) => Some(SwitchValue::I32(value)),
        (Value::Int(value), true) => Some(SwitchValue::U32(value.cast_unsigned())),
        (Value::Uint(value), true) => Some(SwitchValue::U32(value)),
        (Value::Uint(value), false) => Some(SwitchValue::I32(value.cast_signed())),
        _ => None,
    }
}

type CaseGroup<'b> = (Vec<SwitchValue>, Vec<&'b Statement>);

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
        self.count_jump(&statement);
        self.push(statement, at);
        Ok(())
    }

    pub(super) fn constant_condition(
        &self,
        condition: &rglsl_ast::ast::Expression,
    ) -> Option<bool> {
        let info = self.lw.analysis.expression(condition.id)?;
        if !info.is_constant || info.is_specialization {
            return None;
        }
        match *info.value.as_ref()?.values.as_slice() {
            [Value::Bool(value)] => Some(value),
            _ => None,
        }
    }

    fn constant_loop_condition(&self, condition: &Condition) -> Option<bool> {
        match *condition {
            Condition::Expression(ref expression) => self.constant_condition(expression),
            Condition::Declaration(_) => None,
        }
    }

    fn constant_selector(
        &self,
        selector: &rglsl_ast::ast::Expression,
    ) -> Option<(Value, GlslType)> {
        let info = self.lw.analysis.expression(selector.id)?;
        if !info.is_constant || info.is_specialization {
            return None;
        }
        Some((info.value.as_ref()?.first()?, info.ty.clone()))
    }

    fn strip_trailing_break(&mut self, block: &mut Block) -> bool {
        if !matches!(block.last(), Some(&IrStatement::Break)) {
            return false;
        }
        let length = block.len();
        let span = block
            .span_at(length.saturating_sub(1))
            .map(|(_, span)| *span);
        block.cull(length.saturating_sub(1)..);
        if let Some(span) = span.filter(|span| span.is_defined()) {
            if self.lw.debug.is_some() {
                let marker = crate::Range::from_index_range(0..0, &self.expressions);
                block.push(IrStatement::Emit(marker), span);
            }
        }
        true
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
        if self.is_true(condition) {
            return Ok(());
        }
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

    fn is_true(&self, condition: crate::Handle<Expression>) -> bool {
        matches!(
            self.expressions[condition],
            Expression::Literal(Literal::Bool(true))
        )
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
                self.bind_variable(symbol, Local::Variable(local));
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
                        self.bind_variable(symbol, Local::Constant);
                        if self.lw.debug.is_some() {
                            if let Some(ref value) = variable.value {
                                let ir = self.lw.ir_type(&variable.ty, at)?;
                                let init =
                                    self.lw.global_constant(&variable.ty, &value.values, at)?;
                                self.lw.module.constants.append(
                                    crate::Constant {
                                        name: Some(declarator.name.node.clone()),
                                        ty: ir,
                                        init,
                                    },
                                    at,
                                );
                            }
                        }
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
                    self.bind_variable(symbol, Local::Variable(local));
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

impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    pub(super) async fn statements(self, statements: &'b [Statement]) -> Result<()> {
        for statement in statements {
            if self.with(|this| this.terminated())? {
                self.with(|this| this.unreachable_declaration(statement))??;
            } else {
                {
                    let frame = self.clone().statement(statement);
                    let result = self.nest(frame).await;
                    result
                }?;
            }
        }
        Ok(())
    }

    async fn statement(self, statement: &'b Statement) -> Result<()> {
        let at = self.with(|this| this.at(statement.span))?;
        match statement.kind {
            StatementKind::Compound(ref compound) => {
                self.with(|this| {
                    if let Some(first) = compound.statements.first() {
                        this.lw.debug_scope(
                            statement.span.start,
                            statement.span.end,
                            statement_anchor(first),
                        );
                    }
                })?;
                let frame = self.clone().statements(&compound.statements);
                let result = self.nest(frame).await;
                result
            }
            StatementKind::Declaration(ref declaration) => {
                self.with(|this| this.local_declaration(declaration, true))?
            }
            StatementKind::Expression(Some(ref expression)) => {
                let frame = self.clone().effect(expression);
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
                let result = self.nest(frame).await;
                result
            }
            StatementKind::CaseLabel(_) => Err(semantic("a case label outside a switch", at)),
            StatementKind::While { .. } | StatementKind::DoWhile { .. } | StatementKind::For(_) => {
                let frame = self.clone().iteration(statement, LoopControl::default());
                let result = self.nest(frame).await;
                result
            }
            StatementKind::Attributed {
                ref attributes,
                ref statement,
            } => {
                let frame = self.clone().attributed(attributes, statement);
                let result = self.nest(frame).await;
                result
            }
            StatementKind::Jump(ref jump) => self.with(|this| this.jump(jump, at))?,
        }
    }

    async fn loop_body(self, body: &'b Statement) -> Result<()> {
        match body.kind {
            StatementKind::Compound(ref compound) => {
                let frame = self.clone().statements(&compound.statements);
                let result = self.nest(frame).await;
                result
            }
            _ => {
                let frame = self.clone().statement(body);
                let result = self.nest(frame).await;
                result
            }
        }
    }

    async fn attributed(self, attributes: &'b [Attribute], statement: &'b Statement) -> Result<()> {
        match statement.kind {
            StatementKind::While { .. } | StatementKind::DoWhile { .. } | StatementKind::For(_) => {
                let control = self.with(|this| this.loop_control(attributes))?;
                {
                    let frame = self.clone().iteration(statement, control);
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
                    self.with(|this| this.at(statement.span))?,
                );
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
                    self.with(|this| this.at(statement.span))?,
                );
                let result = self.nest(frame).await;
                result
            }
            _ => {
                let frame = self.clone().statement(statement);
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
        if let Some(taken) = self.with(|this| this.constant_condition(condition))? {
            let branch = if taken {
                Some(then_branch)
            } else {
                else_branch
            };
            if let Some(branch) = branch {
                let frame = self.clone().statement(branch);
                let result = self.nest(frame).await;
                result?;
            }
            return Ok(());
        }
        let condition = {
            let frame = self.clone().rvalue(condition);
            let result = self.nest(frame).await;
            result
        }?;
        let accept = {
            let result = self
                .clone()
                .block(self.nest(self.clone().statement(then_branch)))
                .await;
            result
        }?;
        let reject = match else_branch {
            Some(branch) => {
                let result = self
                    .clone()
                    .block(self.nest(self.clone().statement(branch)))
                    .await;
                result
            }?,
            None => Block::new(),
        };
        self.with(|this| {
            this.push(
                IrStatement::If {
                    condition,
                    accept,
                    reject,
                    control,
                },
                at,
            )
        })?;
        Ok(())
    }

    async fn iteration(self, statement: &'b Statement, control: LoopControl) -> Result<()> {
        let at = self.with(|this| this.at(statement.span))?;
        self.with(|this| {
            let anchor = match statement.kind {
                StatementKind::DoWhile { ref condition, .. } => condition.span.start,
                _ => statement.span.start,
            };
            this.lw
                .debug_scope(statement.span.start, statement.span.end, anchor);
        })?;
        match statement.kind {
            StatementKind::While {
                ref condition,
                ref body,
            } => {
                let frame = self.clone().while_loop(condition, body, control, at);
                let result = self.nest(frame).await;
                result
            }
            StatementKind::DoWhile {
                ref body,
                ref condition,
            } => {
                let frame = self.clone().do_while_loop(body, condition, control, at);
                let result = self.nest(frame).await;
                result
            }
            StatementKind::For(ref for_statement) => {
                let frame = self.clone().for_loop(for_statement, control, at);
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
        let constant = self.with(|this| this.constant_loop_condition(condition))?;
        if constant == Some(false) {
            return Ok(());
        }
        self.with(|this| this.enter_jump_target(true))?;
        let cx = self.clone();
        let frame = async move {
            if constant.is_none() {
                let condition = cx.with(|this| this.condition(condition))??;
                cx.with(|this| this.break_unless(condition, at))??;
            }
            cx.nest(cx.clone().loop_body(body)).await
        };
        let body = {
            let result = self.clone().block(self.nest(frame)).await;
            result
        }?;
        self.with(|this| this.leave_jump_target(at))??;
        self.with(|this| {
            this.push(
                IrStatement::Loop {
                    body,
                    continuing: Block::new(),
                    break_if: None,
                    control,
                },
                at,
            )
        })?;
        Ok(())
    }

    async fn do_while_loop(
        self,
        body: &'b Statement,
        condition: &'b rglsl_ast::ast::Expression,
        control: LoopControl,
        at: crate::Span,
    ) -> Result<()> {
        let constant = self.with(|this| this.constant_condition(condition))?;
        self.with(|this| this.enter_jump_target(true))?;
        let mut body = {
            let result = self
                .clone()
                .block(self.nest(self.clone().statement(body)))
                .await;
            result
        }?;
        let target = self.with(|this| this.leave_jump_target(at))??;
        if constant == Some(false) && target.continues == 0 {
            if target.breaks == 0 {
                self.with(|this| this.splice(body))?;
                return Ok(());
            }
            if !ends_in_jump(&body) {
                body.push(IrStatement::Break, at);
            }
            self.with(|this| {
                this.push(
                    IrStatement::Loop {
                        body,
                        continuing: Block::new(),
                        break_if: None,
                        control,
                    },
                    at,
                )
            })?;
            return Ok(());
        }
        let cx = self.clone();
        let frame = async move {
            if constant == Some(true) {
                return Ok(None);
            }
            let value = cx.nest(cx.clone().rvalue(condition)).await?;
            cx.try_with(|lowerer| {
                if lowerer.is_true(value) {
                    return Ok(None);
                }
                lowerer
                    .add(
                        Expression::Unary {
                            op: UnaryOperator::LogicalNot,
                            expr: value,
                        },
                        at,
                    )
                    .map(Some)
            })
        };
        let (continuing, break_if) = {
            let result = self.clone().block_with(self.nest(frame)).await;
            result
        }?;
        self.with(|this| {
            this.push(
                IrStatement::Loop {
                    body,
                    continuing,
                    break_if,
                    control,
                },
                at,
            )
        })?;
        Ok(())
    }

    async fn for_loop(
        self,
        statement: &'b ForStatement,
        control: LoopControl,
        at: crate::Span,
    ) -> Result<()> {
        {
            let frame = self.clone().statement(&statement.init);
            let result = self.nest(frame).await;
            result
        }?;
        let constant = match statement.condition {
            Some(ref condition) => self.with(|this| this.constant_loop_condition(condition))?,
            None => Some(true),
        };
        if constant == Some(false) {
            return Ok(());
        }
        self.with(|this| this.enter_jump_target(true))?;
        let cx = self.clone();
        let frame = async move {
            if let (Some(condition), None) = (statement.condition.as_ref(), constant) {
                let condition = cx.with(|this| this.condition(condition))??;
                cx.with(|this| this.break_unless(condition, at))??;
            }
            cx.nest(cx.clone().loop_body(&statement.body)).await
        };
        let body = {
            let result = self.clone().block(self.nest(frame)).await;
            result
        }?;
        self.with(|this| this.leave_jump_target(at))??;
        let cx = self.clone();
        let frame = async move {
            match statement.increment {
                Some(ref increment) => cx.nest(cx.clone().effect(increment)).await,
                None => Ok(()),
            }
        };
        let continuing = {
            let result = self.clone().block(self.nest(frame)).await;
            result
        }?;
        self.with(|this| {
            this.push(
                IrStatement::Loop {
                    body,
                    continuing,
                    break_if: None,
                    control,
                },
                at,
            )
        })?;
        Ok(())
    }

    async fn switch(
        self,
        selector: &'b rglsl_ast::ast::Expression,
        statements: &'b [Statement],
        control: SelectionControl,
        at: crate::Span,
    ) -> Result<()> {
        if statements.is_empty() {
            return {
                let frame = self.clone().effect(selector);
                let result = self.nest(frame).await;
                result
            };
        }
        let constant = self.with(|this| this.constant_selector(selector))?;
        let (value, ty) = match constant {
            Some((_, ref ty)) => (None, ty.clone()),
            None => {
                let (value, ty) = {
                    let frame = self.clone().typed(selector);
                    let result = self.nest(frame).await;
                    result
                }?;
                (Some(value), ty)
            }
        };
        let unsigned = ty == GlslType::scalar(GlslScalar::Uint);
        let mut groups: Vec<CaseGroup<'b>> = Vec::new();
        for statement in statements {
            match statement.kind {
                StatementKind::CaseLabel(ref label) => {
                    let case = match *label {
                        CaseLabel::Default => SwitchValue::Default,
                        CaseLabel::Case(ref expression) => {
                            let label_at = self.with(|this| this.at(expression.span))?;
                            let constant = self.with(|this| {
                                this.lw
                                    .analysis
                                    .expression(expression.id)
                                    .and_then(|info| info.value.as_ref())
                                    .and_then(|value| value.first())
                                    .ok_or_else(|| internal(label_at))
                            })??;
                            switch_value(constant, unsigned).ok_or_else(|| internal(label_at))?
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
        if let Some((selected, _)) = constant {
            let selected = switch_value(selected, unsigned).ok_or_else(|| internal(at))?;
            let frame = self
                .clone()
                .constant_switch(selector, groups, selected, control, at);
            let result = self.nest(frame).await;
            return result;
        }
        let value = value.ok_or_else(|| internal(at))?;
        self.with(|this| this.enter_jump_target(false))?;
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
                let mut block = {
                    let frame = self.clone().case_statements(body.clone());
                    let result = self.clone().block(self.nest(frame)).await;
                    result
                }?;
                let fall_through = if self.with(|this| this.strip_trailing_break(&mut block))? {
                    false
                } else {
                    match block.last() {
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
                    }
                };
                cases.push(SwitchCase {
                    value: label,
                    body: block,
                    fall_through,
                });
            }
        }
        self.with(|this| this.leave_jump_target(at))??;
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
        self.with(|this| {
            this.push(
                IrStatement::Switch {
                    selector: value,
                    cases,
                    control,
                },
                at,
            )
        })?;
        Ok(())
    }

    async fn case_statements(self, statements: Vec<&'b Statement>) -> Result<()> {
        for statement in statements {
            if self.with(|this| this.terminated())? {
                self.try_with(|this| this.unreachable_declaration(statement))?;
            } else {
                let frame = self.clone().statement(statement);
                let result = self.nest(frame).await;
                result?;
            }
        }
        Ok(())
    }

    async fn constant_switch(
        self,
        selector: &'b rglsl_ast::ast::Expression,
        groups: Vec<CaseGroup<'b>>,
        selected: SwitchValue,
        control: SelectionControl,
        at: crate::Span,
    ) -> Result<()> {
        let chosen = groups
            .iter()
            .position(|&(ref labels, _)| labels.contains(&selected))
            .or_else(|| {
                groups
                    .iter()
                    .position(|&(ref labels, _)| labels.contains(&SwitchValue::Default))
            });
        let skipped = groups
            .get(..chosen.unwrap_or(groups.len()))
            .unwrap_or_default();
        for statement in skipped.iter().flat_map(|&(_, ref body)| body.iter()) {
            self.try_with(|this| this.unreachable_declaration(statement))?;
        }
        let Some(chosen) = chosen else {
            return Ok(());
        };
        let statements: Vec<&'b Statement> = groups
            .get(chosen..)
            .unwrap_or_default()
            .iter()
            .flat_map(|&(_, ref body)| body.iter().copied())
            .collect();
        self.with(|this| this.enter_jump_target(false))?;
        let mut block = {
            let frame = self.clone().case_statements(statements);
            let result = self.clone().block(self.nest(frame)).await;
            result
        }?;
        let mut target = self.with(|this| this.leave_jump_target(at))??;
        if self.with(|this| this.strip_trailing_break(&mut block))? {
            target.breaks = target.breaks.saturating_sub(1);
        }
        if target.breaks == 0 {
            self.with(|this| this.splice(block))?;
            return Ok(());
        }
        let selector = {
            let frame = self.clone().rvalue(selector);
            let result = self.nest(frame).await;
            result
        }?;
        self.with(|this| {
            this.push(
                IrStatement::Switch {
                    selector,
                    cases: alloc::vec![SwitchCase {
                        value: SwitchValue::Default,
                        body: block,
                        fall_through: false,
                    }],
                    control,
                },
                at,
            )
        })?;
        Ok(())
    }
}

fn statement_anchor(statement: &Statement) -> u32 {
    match statement.kind {
        StatementKind::Declaration(ref declaration) => match declaration.kind {
            DeclarationKind::InitDeclaratorList(ref list) => list
                .declarators
                .first()
                .map_or(statement.span.start, |declarator| {
                    declarator.name.span.start
                }),
            _ => statement.span.start,
        },
        _ => statement.span.start,
    }
}
