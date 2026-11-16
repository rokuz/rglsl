use alloc::vec::Vec;
use rglsl_sema::scope::QualifierFlags;
use rglsl_types::stack::recurse;

use rglsl_ast::ast::{
    AssignmentOperator, Attribute, CaseLabel, Condition, Declaration, DeclarationKind,
    Expression as AstExpression, ExpressionKind, ForStatement, JumpStatement, Statement,
    StatementKind,
};
use rglsl_sema::constant::Value;
use rglsl_sema::types::{Scalar as GlslScalar, Type as GlslType};

use super::constant::shape;
use super::function::{FunctionLowerer, Local, ends_in_jump};
use super::{GlobalRef, Result, internal, semantic, unsupported};
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

struct PreparedDeclarator<'d> {
    local: crate::Handle<crate::LocalVariable>,
    ir: crate::Handle<crate::Type>,
    ty: GlslType,
    initializer: &'d rglsl_ast::ast::Spanned<rglsl_ast::ast::Initializer>,
    at: crate::Span,
}

impl FunctionLowerer<'_, '_> {
    fn inverts_y(&self) -> bool {
        self.lw.options.invert_y
            && self.lw.stage_map(|stage| {
                matches!(
                    stage,
                    crate::ShaderStage::Vertex
                        | crate::ShaderStage::Geometry
                        | crate::ShaderStage::TessEvaluation
                )
            })
    }

    fn is_position(&self, place: &super::expression::Place) -> bool {
        if place.swizzle.is_some() {
            return false;
        }
        let module = &self.lw.module;
        let position = |binding: Option<&crate::Binding>| {
            matches!(
                binding,
                Some(&crate::Binding::BuiltIn(crate::BuiltIn::Position { .. }))
            )
        };
        match self.expressions[place.pointer] {
            Expression::GlobalVariable(global) => {
                position(module.global_variables[global].io.as_ref())
            }
            Expression::AccessIndex { base, index } => {
                let Expression::GlobalVariable(global) = self.expressions[base] else {
                    return false;
                };
                match module.types[module.global_variables[global].ty].inner {
                    crate::TypeInner::Struct { ref members, .. } => members
                        .get(usize::try_from(index).unwrap_or(usize::MAX))
                        .is_some_and(|member| position(member.binding.as_ref())),
                    _ => false,
                }
            }
            _ => false,
        }
    }

    fn negated_y(
        &mut self,
        value: crate::Handle<Expression>,
        at: crate::Span,
    ) -> Result<crate::Handle<Expression>> {
        let mut components = Vec::with_capacity(4);
        for index in 0..4 {
            let component = self.add(Expression::AccessIndex { base: value, index }, at)?;
            components.push(if index == 1 {
                self.add(
                    Expression::Unary {
                        op: UnaryOperator::Negate,
                        expr: component,
                    },
                    at,
                )?
            } else {
                component
            });
        }
        let ty = self.lw.module.types.insert(
            crate::Type {
                name: None,
                inner: crate::TypeInner::Vector {
                    size: crate::VectorSize::Quad,
                    scalar: crate::Scalar::F32,
                },
            },
            at,
        );
        self.add(Expression::Compose { ty, components }, at)
    }

    fn discard_terminates(&self) -> bool {
        self.lw.options.discard_is_terminate
            && self
                .lw
                .options
                .spirv_version
                .is_some_and(|version| version >= (1, 6))
    }

    fn emit_jump(
        &mut self,
        jump: &JumpStatement,
        value: Option<crate::Handle<Expression>>,
        at: crate::Span,
    ) -> Result<()> {
        let statement = match *jump {
            JumpStatement::Break => IrStatement::Break,
            JumpStatement::Continue => IrStatement::Continue,
            JumpStatement::Discard if self.discard_terminates() => IrStatement::TerminateInvocation,
            JumpStatement::Discard => IrStatement::Kill,
            JumpStatement::TerminateInvocation => IrStatement::TerminateInvocation,
            JumpStatement::Demote => IrStatement::Demote,
            JumpStatement::TerminateRay => {
                IrStatement::RayPipelineFunction(crate::RayPipelineFunction::TerminateRay {
                    flavor: crate::RayTracingFlavor::Khr,
                })
            }
            JumpStatement::IgnoreIntersection => {
                IrStatement::RayPipelineFunction(crate::RayPipelineFunction::IgnoreIntersection {
                    flavor: crate::RayTracingFlavor::Khr,
                })
            }
            JumpStatement::Return(None) => IrStatement::Return { value: None },
            JumpStatement::Return(Some(_)) => IrStatement::Return {
                value: Some(value.ok_or_else(|| internal(at))?),
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
        if let Some(span) = span.filter(|span| span.is_defined())
            && self.lw.debug.is_some()
        {
            let marker = crate::Range::from_index_range(0..0, &self.expressions);
            block.push(IrStatement::Emit(marker), span);
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

    fn store_local_initializer(
        &mut self,
        local: crate::Handle<crate::LocalVariable>,
        ir: crate::Handle<crate::Type>,
        value: crate::Handle<Expression>,
        at: crate::Span,
    ) -> Result<()> {
        let value = self.requalify_to(value, ir, at)?;
        let pointer = self.local_pointer(local, at)?;
        self.push(IrStatement::Store { pointer, value }, at);
        Ok(())
    }

    fn check_local_declaration(&self, declaration: &Declaration) -> Result<()> {
        let at = self.at(declaration.span);
        match declaration.kind {
            DeclarationKind::InitDeclaratorList(_)
            | DeclarationKind::Precision { .. }
            | DeclarationKind::FunctionPrototype(_)
            | DeclarationKind::SpirvInstruction { .. }
            | DeclarationKind::SpirvExecutionMode(_) => Ok(()),
            DeclarationKind::QualifiedIdentifiers { ref qualifier, .. }
                if qualifier.node.qualifiers.iter().all(|single| {
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

    fn jump(&mut self, jump: &JumpStatement, at: crate::Span) -> Result<()> {
        let value = match *jump {
            JumpStatement::Return(Some(ref value)) => Some(self.rvalue(value)?),
            _ => None,
        };
        self.emit_jump(jump, value, at)
    }

    fn condition(&mut self, condition: &Condition) -> Result<crate::Handle<Expression>> {
        match *condition {
            Condition::Expression(ref expression) => self.rvalue(expression),
            Condition::Declaration(ref declaration) => {
                let at = self.at(declaration.span);
                let analysis = self.lw.analysis;
                let symbol = *analysis
                    .declarations
                    .get(&declaration.id)
                    .ok_or_else(|| internal(at))?;
                let ty = self
                    .lw
                    .variable(symbol)
                    .map(|variable| variable.ty.clone())
                    .ok_or_else(|| internal(at))?;
                self.prepare(&ty, at)?;
                let name = Some(declaration.kind.name.node.clone());
                let local = self.local(&ty, name, at)?;
                self.bind_variable(symbol, Local::Variable(local));
                let value = self.initializer(&declaration.kind.initializer, &ty)?;
                {
                    let pointer = self.local_pointer(local, at)?;
                    self.push(IrStatement::Store { pointer, value }, at);
                    let pointer = self.local_pointer(local, at)?;
                    self.add(Expression::Load { pointer }, at)
                }
            }
        }
    }

    fn unreachable_declaration(&mut self, statement: &Statement) -> Result<()> {
        let StatementKind::Declaration(ref declaration) = statement.kind else {
            return Ok(());
        };
        self.check_local_declaration(declaration)?;
        for declarator in declarators(declaration) {
            self.prepare_local_declarator(declarator, false)?;
        }
        Ok(())
    }

    fn prepare_local_declarator<'d>(
        &mut self,
        declarator: &'d rglsl_ast::ast::Node<rglsl_ast::ast::InitDeclarator>,
        reachable: bool,
    ) -> Result<Option<PreparedDeclarator<'d>>> {
        let at = self.at(declarator.span);
        let analysis = self.lw.analysis;
        let Some(&symbol) = analysis.declarations.get(&declarator.id) else {
            return Ok(None);
        };
        let variable = self.lw.variable(symbol).ok_or_else(|| internal(at))?;
        if variable
            .qualifiers
            .flags
            .contains(QualifierFlags::SPECIALIZATION)
            && let Some(initializer) = declarator.kind.initializer.as_ref()
        {
            let name = Some(declarator.kind.name.node.clone());
            let handle = recurse(|| {
                self.specialized_initializer(initializer, variable.ty.clone(), name, at)
            })?;
            self.lw.globals.insert(symbol, GlobalRef::Override(handle));
            return Ok(None);
        }
        if variable.qualifiers.flags.contains(QualifierFlags::CONSTANT)
            && variable
                .value
                .as_ref()
                .is_some_and(|value| shape(&variable.ty, &value.values, &analysis.types).is_some())
        {
            self.bind_variable(symbol, Local::Constant);
            if self.lw.debug.is_some()
                && let Some(ref value) = variable.value
            {
                let ir = self.ir_type(&variable.ty, at)?;
                let init = recurse(|| self.global_constant(&variable.ty, &value.values, at))?;
                self.lw.module.constants.append(
                    crate::Constant {
                        name: Some(declarator.kind.name.node.clone()),
                        ty: ir,
                        init,
                    },
                    at,
                );
            }
            return Ok(None);
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
                .insert(symbol, (declarator.kind.name.node.clone(), at));
            return Ok(None);
        }
        let ir = recurse(|| self.variable_ir_type(&ty, &variable.qualifiers, at))?;
        let local = self.local_typed(ir, Some(declarator.kind.name.node.clone()), at);
        self.bind_variable(symbol, Local::Variable(local));
        let Some(initializer) = declarator.kind.initializer.as_ref().filter(|_| reachable) else {
            return Ok(None);
        };
        Ok(Some(PreparedDeclarator {
            local,
            ir,
            ty,
            initializer,
            at,
        }))
    }

    fn position_assignment(
        &mut self,
        expression: &AstExpression,
        target: &AstExpression,
        value: &AstExpression,
    ) -> Result<()> {
        let at = self.at(expression.span);
        let place = self.place_child(target)?;
        let (mut value, _) = self.typed_child(value)?;
        if self.is_position(&place) {
            value = self.negated_y(value, at)?;
        }
        self.store(&place, value, at)
    }

    fn local_declaration(&mut self, declaration: &Declaration) -> Result<()> {
        self.check_local_declaration(declaration)?;
        for declarator in declarators(declaration) {
            let Some(prepared) = self.prepare_local_declarator(declarator, true)? else {
                continue;
            };
            let value = recurse(|| self.initializer(prepared.initializer, &prepared.ty))?;
            self.store_local_initializer(prepared.local, prepared.ir, value, prepared.at)?;
        }
        Ok(())
    }

    pub(super) fn statements(&mut self, statements: &[Statement]) -> Result<()> {
        for statement in statements {
            if self.terminated() {
                self.unreachable_declaration(statement)?;
            } else {
                self.statement(statement)?;
            }
        }
        Ok(())
    }

    fn statement(&mut self, statement: &Statement) -> Result<()> {
        let at = self.at(statement.span);
        match statement.kind {
            StatementKind::Compound(ref compound) => {
                if let Some(first) = compound.statements.first() {
                    self.lw.debug_scope(
                        statement.span.start,
                        statement.span.end,
                        statement_anchor(first),
                    );
                }
                recurse(|| self.statements(&compound.statements))
            }
            StatementKind::Declaration(ref declaration) => self.local_declaration(declaration),
            StatementKind::Expression(Some(ref expression)) => match expression.kind {
                ExpressionKind::Assignment {
                    operator: AssignmentOperator::Assign,
                    ref target,
                    ref value,
                } if self.inverts_y() => self.position_assignment(expression, target, value),
                _ => self.effect(expression),
            },
            StatementKind::Expression(None) => Ok(()),
            StatementKind::Selection {
                ref condition,
                ref then_branch,
                ref else_branch,
            } => recurse(|| {
                self.selection(
                    condition,
                    then_branch,
                    else_branch.as_deref(),
                    SelectionControl::None,
                    at,
                )
            }),
            StatementKind::Switch {
                ref selector,
                ref statements,
            } => recurse(|| self.switch(selector, statements, SelectionControl::None, at)),
            StatementKind::CaseLabel(_) => Err(semantic("a case label outside a switch", at)),
            StatementKind::While { .. } | StatementKind::DoWhile { .. } | StatementKind::For(_) => {
                recurse(|| self.iteration(statement, LoopControl::default()))
            }
            StatementKind::Attributed {
                ref attributes,
                ref statement,
            } => recurse(|| self.attributed(attributes, statement)),
            StatementKind::Jump(ref jump) => self.jump(jump, at),
        }
    }

    fn loop_body(&mut self, body: &Statement) -> Result<()> {
        match body.kind {
            StatementKind::Compound(ref compound) => {
                recurse(|| self.statements(&compound.statements))
            }
            _ => recurse(|| self.statement(body)),
        }
    }

    fn attributed(&mut self, attributes: &[Attribute], statement: &Statement) -> Result<()> {
        match statement.kind {
            StatementKind::While { .. } | StatementKind::DoWhile { .. } | StatementKind::For(_) => {
                let control = self.loop_control(attributes);
                recurse(|| self.iteration(statement, control))
            }
            StatementKind::Selection {
                ref condition,
                ref then_branch,
                ref else_branch,
            } => recurse(|| {
                self.selection(
                    condition,
                    then_branch,
                    else_branch.as_deref(),
                    selection_control(attributes),
                    self.at(statement.span),
                )
            }),
            StatementKind::Switch {
                ref selector,
                ref statements,
            } => recurse(|| {
                self.switch(
                    selector,
                    statements,
                    selection_control(attributes),
                    self.at(statement.span),
                )
            }),
            _ => recurse(|| self.statement(statement)),
        }
    }

    fn selection(
        &mut self,
        condition: &rglsl_ast::ast::Expression,
        then_branch: &Statement,
        else_branch: Option<&Statement>,
        control: SelectionControl,
        at: crate::Span,
    ) -> Result<()> {
        if let Some(taken) = self.constant_condition(condition) {
            let branch = if taken {
                Some(then_branch)
            } else {
                else_branch
            };
            if let Some(branch) = branch {
                let result = recurse(|| self.statement(branch));
                result?;
            }
            return Ok(());
        }
        let condition = recurse(|| self.rvalue(condition))?;
        let accept = self.block(|this| this.statement(then_branch))?;
        let reject = match else_branch {
            Some(branch) => self.block(|this| this.statement(branch))?,
            None => Block::new(),
        };
        self.push(
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

    fn iteration(&mut self, statement: &Statement, control: LoopControl) -> Result<()> {
        let at = self.at(statement.span);
        {
            let anchor = match statement.kind {
                StatementKind::DoWhile { ref condition, .. } => condition.span.start,
                _ => statement.span.start,
            };
            self.lw
                .debug_scope(statement.span.start, statement.span.end, anchor);
        }
        match statement.kind {
            StatementKind::While {
                ref condition,
                ref body,
            } => recurse(|| self.while_loop(condition, body, control, at)),
            StatementKind::DoWhile {
                ref body,
                ref condition,
            } => recurse(|| self.do_while_loop(body, condition, control, at)),
            StatementKind::For(ref for_statement) => {
                recurse(|| self.for_loop(for_statement, control, at))
            }
            _ => Err(internal(at)),
        }
    }

    fn while_loop(
        &mut self,
        condition: &Condition,
        body: &Statement,
        control: LoopControl,
        at: crate::Span,
    ) -> Result<()> {
        let constant = self.constant_loop_condition(condition);
        if constant == Some(false) {
            return Ok(());
        }
        self.enter_jump_target(true);
        let body = self.block(|this| {
            if constant.is_none() {
                let condition = this.condition(condition)?;
                this.break_unless(condition, at)?;
            }
            recurse(|| this.loop_body(body))
        })?;
        self.leave_jump_target(at)?;
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

    fn do_while_loop(
        &mut self,
        body: &Statement,
        condition: &rglsl_ast::ast::Expression,
        control: LoopControl,
        at: crate::Span,
    ) -> Result<()> {
        let constant = self.constant_condition(condition);
        self.enter_jump_target(true);
        let mut body = self.block(|this| this.statement(body))?;
        let mut target = self.leave_jump_target(at)?;
        if constant == Some(false) && target.continues == 0 {
            if self.strip_trailing_break(&mut body) {
                target.breaks = target.breaks.saturating_sub(1);
            }
            if target.breaks == 0 {
                self.splice(body);
                return Ok(());
            }
            if !ends_in_jump(&body) {
                body.push(IrStatement::Break, at);
            }
            self.push(
                IrStatement::Loop {
                    body,
                    continuing: Block::new(),
                    break_if: None,
                    control,
                },
                at,
            );
            return Ok(());
        }
        let (continuing, break_if) = self.block_with(|this| {
            if constant == Some(true) {
                return Ok(None);
            }
            let value = recurse(|| this.rvalue(condition))?;
            if this.is_true(value) {
                return Ok(None);
            }
            this.add(
                Expression::Unary {
                    op: UnaryOperator::LogicalNot,
                    expr: value,
                },
                at,
            )
            .map(Some)
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

    fn for_loop(
        &mut self,
        statement: &ForStatement,
        control: LoopControl,
        at: crate::Span,
    ) -> Result<()> {
        recurse(|| self.statement(&statement.init))?;
        let constant = match statement.condition {
            Some(ref condition) => self.constant_loop_condition(condition),
            None => Some(true),
        };
        if constant == Some(false) {
            return Ok(());
        }
        self.enter_jump_target(true);
        let body = self.block(|this| {
            if let (Some(condition), None) = (statement.condition.as_ref(), constant) {
                let condition = this.condition(condition)?;
                this.break_unless(condition, at)?;
            }
            recurse(|| this.loop_body(&statement.body))
        })?;
        self.leave_jump_target(at)?;
        let continuing = self.block(|this| match statement.increment {
            Some(ref increment) => recurse(|| this.effect(increment)),
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

    fn switch(
        &mut self,
        selector: &rglsl_ast::ast::Expression,
        statements: &[Statement],
        control: SelectionControl,
        at: crate::Span,
    ) -> Result<()> {
        if statements.is_empty() {
            return recurse(|| self.effect(selector));
        }
        let constant = self.constant_selector(selector);
        let (value, ty) = match constant {
            Some((_, ref ty)) => (None, ty.clone()),
            None => {
                let (value, ty) = recurse(|| self.typed(selector))?;
                (Some(value), ty)
            }
        };
        let unsigned = ty == GlslType::scalar(GlslScalar::Uint);
        let mut groups: Vec<CaseGroup<'_>> = Vec::new();
        for statement in statements {
            match statement.kind {
                StatementKind::CaseLabel(ref label) => {
                    let case = match *label {
                        CaseLabel::Default => SwitchValue::Default,
                        CaseLabel::Case(ref expression) => {
                            let label_at = self.at(expression.span);
                            let constant = (self
                                .lw
                                .analysis
                                .expression(expression.id)
                                .and_then(|info| info.value.as_ref())
                                .and_then(|value| value.first())
                                .ok_or_else(|| internal(label_at)))?;
                            switch_value(constant, unsigned).ok_or_else(|| internal(label_at))?
                        }
                    };
                    match groups.last_mut() {
                        Some(&mut (ref mut labels, ref body)) if body.is_empty() => {
                            labels.push(case);
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
            let result = recurse(|| self.constant_switch(selector, groups, selected, control, at));
            return result;
        }
        let value = value.ok_or_else(|| internal(at))?;
        self.enter_jump_target(false);
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
                let mut block = self.block(|this| this.case_statements(body.clone()))?;
                let fall_through = if self.strip_trailing_break(&mut block) {
                    false
                } else {
                    !ends_in_jump(&block)
                };
                cases.push(SwitchCase {
                    value: label,
                    body: block,
                    fall_through,
                });
            }
        }
        self.leave_jump_target(at)?;
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
                control,
            },
            at,
        );
        Ok(())
    }

    fn case_statements(&mut self, statements: Vec<&Statement>) -> Result<()> {
        for statement in statements {
            if self.terminated() {
                self.unreachable_declaration(statement)?;
            } else {
                let result = recurse(|| self.statement(statement));
                result?;
            }
        }
        Ok(())
    }

    fn constant_switch(
        &mut self,
        selector: &rglsl_ast::ast::Expression,
        groups: Vec<CaseGroup<'_>>,
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
            self.unreachable_declaration(statement)?;
        }
        let Some(chosen) = chosen else {
            return Ok(());
        };
        let statements: Vec<&Statement> = groups
            .get(chosen..)
            .unwrap_or_default()
            .iter()
            .flat_map(|&(_, ref body)| body.iter().copied())
            .collect();
        self.enter_jump_target(false);
        let mut block = self.block(|this| this.case_statements(statements))?;
        let mut target = self.leave_jump_target(at)?;
        if self.strip_trailing_break(&mut block) {
            target.breaks = target.breaks.saturating_sub(1);
        }
        if target.breaks == 0 {
            self.splice(block);
            return Ok(());
        }
        let selector = recurse(|| self.rvalue(selector))?;
        self.push(
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
        );
        Ok(())
    }
}

fn declarators(
    declaration: &Declaration,
) -> &[rglsl_ast::ast::Node<rglsl_ast::ast::InitDeclarator>] {
    match declaration.kind {
        DeclarationKind::InitDeclaratorList(ref list) => &list.declarators,
        _ => &[],
    }
}

fn statement_anchor(statement: &Statement) -> u32 {
    match statement.kind {
        StatementKind::Declaration(ref declaration) => match declaration.kind {
            DeclarationKind::InitDeclaratorList(ref list) => list
                .declarators
                .first()
                .map_or(statement.span.start, |declarator| {
                    declarator.kind.name.span.start
                }),
            _ => statement.span.start,
        },
        _ => statement.span.start,
    }
}
