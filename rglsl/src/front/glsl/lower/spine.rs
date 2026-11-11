use alloc::vec::Vec;

use rglsl_ast::ast::{
    BinaryOperator as AstBinary, Expression as AstExpression, ExpressionKind,
    UnaryOperator as AstUnary,
};
use rglsl_ast::Spine;
use rglsl_sema::types::Type as GlslType;

use super::expression::{Chain, Place};
use super::function::FunctionLowerer;
use super::specialization::is_direct;
use super::{internal, Result};
use crate::{
    BinaryOperator, Block, Expression, Handle, Literal, LocalVariable, SelectionControl, Span,
    Statement,
};

type Typed = (Handle<Expression>, GlslType);

#[derive(Clone, Copy, PartialEq, Eq)]
enum Mode {
    Effect,
    Select,
    Local,
}

struct Pending<'e> {
    node: &'e AstExpression,
    place: Place,
    old: Option<Handle<Expression>>,
}

struct FlatLevel<'b> {
    condition: &'b AstExpression,
    then_expression: &'b AstExpression,
    tail: Option<&'b AstExpression>,
    result: Option<Handle<LocalVariable>>,
    taken: Handle<LocalVariable>,
    level: u32,
    at: Span,
}

impl FunctionLowerer<'_, '_> {
    fn folds(&self, expression: &AstExpression) -> Result<bool> {
        let info = self.info(expression)?;
        Ok(if info.is_specialization {
            !self.specializing && !is_direct(expression)
        } else {
            info.is_constant
                && info.value.is_some()
                && !info.ty.contains_reference(&self.lw.analysis.types)
        })
    }

    fn lowered_spine<'e>(&self, expression: &'e AstExpression) -> Result<Spine<'e>> {
        let mut spine = Spine::of(expression);
        let mut cut = None;
        for (position, node) in spine.links.iter().enumerate().skip(1) {
            if self.folds(node)? {
                cut = Some(position);
                break;
            }
        }
        if let Some(position) = cut {
            if let Some(&head) = spine.links.get(position) {
                spine.head = head;
                spine.links.truncate(position);
            }
        }
        Ok(spine)
    }

    fn passed_on(
        &mut self,
        expression: &AstExpression,
        value: Option<Handle<Expression>>,
    ) -> Result<Typed> {
        let flagged = self.flagged(expression, value)?;
        self.typed_value(expression, flagged)
    }

    fn conditional_mode(&self, node: &AstExpression, pure_reject: bool) -> Result<Mode> {
        let ty = &self.info(node)?.ty;
        let ExpressionKind::Conditional {
            ref then_expression,
            ..
        } = node.kind
        else {
            return Err(internal(self.at(node.span)));
        };
        Ok(if ty.is_void() {
            Mode::Effect
        } else if (ty.is_scalar() || ty.is_vector()) && pure_reject && self.pure(then_expression) {
            Mode::Select
        } else {
            Mode::Local
        })
    }

    fn conditional_modes(
        &self,
        links: &[&AstExpression],
        head: &AstExpression,
    ) -> Result<Vec<Mode>> {
        let mut modes = Vec::with_capacity(links.len());
        let mut rest = self.pure(head);
        for node in links.iter().rev() {
            modes.push(self.conditional_mode(node, rest)?);
            if let ExpressionKind::Conditional {
                ref condition,
                ref then_expression,
                ..
            } = node.kind
            {
                rest = rest && self.pure(condition) && self.pure(then_expression);
            }
        }
        modes.reverse();
        Ok(modes)
    }

    fn conditional_parts<'e>(
        &self,
        node: &'e AstExpression,
    ) -> Result<(&'e AstExpression, &'e AstExpression)> {
        match node.kind {
            ExpressionKind::Conditional {
                ref condition,
                ref then_expression,
                ..
            } => Ok((condition, then_expression)),
            _ => Err(internal(self.at(node.span))),
        }
    }

    fn taken_is(
        &mut self,
        taken: Handle<LocalVariable>,
        level: u32,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let pointer = self.local_pointer(taken, at)?;
        let current = self.add(Expression::Load { pointer }, at)?;
        let level = self.literal(Literal::U32(level), at)?;
        self.add(
            Expression::Binary {
                op: BinaryOperator::Equal,
                left: current,
                right: level,
            },
            at,
        )
    }

    fn set_taken(&mut self, taken: Handle<LocalVariable>, level: u32, at: Span) -> Result<()> {
        let pointer = self.local_pointer(taken, at)?;
        let value = self.literal(Literal::U32(level), at)?;
        self.push(Statement::Store { pointer, value }, at);
        Ok(())
    }
}

#[allow(clippy::await_holding_refcell_ref)]
impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    async fn flat_conditionals(
        self,
        links: Vec<&'b AstExpression>,
        valued: bool,
        tail: &'b AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let links = links.as_slice();
        let mut this = self.lowerer();
        let outer = links
            .first()
            .map(|node| this.at(node.span))
            .ok_or_else(|| internal(this.at(tail.span)))?;
        let none = u32::try_from(links.len()).map_err(|_| internal(outer))?;
        let taken = this.local(&GlslType::UINT, None, outer)?;
        this.set_taken(taken, none, outer)?;
        let mut results = Vec::with_capacity(links.len());
        for &node in links {
            results.push(if valued {
                let ty = &this.info(node)?.ty;
                let at = this.at(node.span);
                Some(this.local(ty, None, at)?)
            } else {
                None
            });
        }
        for (level, (&node, &result)) in (0u32..).zip(links.iter().zip(&results)) {
            let at = this.at(node.span);
            let last = level.checked_add(1) == Some(none);
            let (condition, then_expression) = this.conditional_parts(node)?;
            let chosen = FlatLevel {
                condition,
                then_expression,
                tail: last.then_some(tail),
                result,
                taken,
                level,
                at,
            };
            if level == 0 {
                drop(this);
                let chosen = self.nest(self.clone().flat_level(chosen)).await;
                this = self.lowerer();
                chosen?;
            } else {
                let pending = this.taken_is(taken, none, at)?;
                drop(this);
                let accept = self
                    .clone()
                    .block(self.nest(self.clone().flat_level(chosen)))
                    .await;
                this = self.lowerer();
                let accept = accept?;
                this.push(
                    Statement::If {
                        condition: pending,
                        accept,
                        reject: Block::new(),
                        control: SelectionControl::None,
                    },
                    at,
                );
            }
        }
        if !valued {
            return Ok(None);
        }
        let ascents: Vec<_> = (0u32..)
            .zip(links.windows(2).zip(results.windows(2)))
            .collect();
        for (level, pair) in ascents.into_iter().rev() {
            let (&[_, inner], &[Some(result), Some(inner_result)]) = pair else {
                return Err(internal(outer));
            };
            let at = this.at(inner.span);
            let skip = this.taken_is(taken, level, at)?;
            let reject = this.nested(|this| {
                let pointer = this.local_pointer(inner_result, at)?;
                let loaded = this.add(Expression::Load { pointer }, at)?;
                let (value, _) = this.typed_value(inner, Some(loaded))?;
                let pointer = this.local_pointer(result, at)?;
                this.push(Statement::Store { pointer, value }, at);
                Ok(())
            })?;
            this.push(
                Statement::If {
                    condition: skip,
                    accept: Block::new(),
                    reject,
                    control: SelectionControl::None,
                },
                at,
            );
        }
        let result = results
            .first()
            .copied()
            .flatten()
            .ok_or_else(|| internal(outer))?;
        let pointer = this.local_pointer(result, outer)?;
        this.add(Expression::Load { pointer }, outer).map(Some)
    }

    async fn flat_level(self, level: FlatLevel<'b>) -> Result<()> {
        let FlatLevel {
            condition,
            then_expression,
            tail,
            result,
            taken,
            level,
            at,
        } = level;
        let condition = self.nest(self.clone().rvalue(condition)).await?;
        let cx = self.clone();
        let accepted = async move {
            cx.nest(cx.clone().branch(then_expression, result, at))
                .await?;
            cx.lowerer().set_taken(taken, level, at)
        };
        let accept = self.clone().block(self.nest(accepted)).await?;
        let reject = match tail {
            Some(tail) => {
                self.clone()
                    .block(self.nest(self.clone().branch(tail, result, at)))
                    .await?
            }
            None => Block::new(),
        };
        self.lowerer().push(
            Statement::If {
                condition,
                accept,
                reject,
                control: SelectionControl::None,
            },
            at,
        );
        Ok(())
    }
    pub(super) async fn access_chain(self, expression: &'b AstExpression) -> Result<Chain> {
        let mut this = self.lowerer();
        let mut links = Vec::new();
        let mut current = expression;
        while let ExpressionKind::Subscript { ref base, .. }
        | ExpressionKind::FieldSelection { ref base, .. } = current.kind
        {
            links.push(current);
            current = base;
        }
        let head = {
            let frame = self.clone().chain_head(current);
            drop(this);
            let result = self.nest(frame).await;
            this = self.lowerer();
            result
        }?;
        let mut chain = this.chain_marked(current, head)?;
        for node in links.into_iter().rev() {
            let at = this.at(node.span);
            let linked = match node.kind {
                ExpressionKind::Subscript {
                    ref base,
                    ref index,
                } => {
                    let frame = self.clone().subscript_chain(chain, base, index, at);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?,
                ExpressionKind::FieldSelection {
                    ref base,
                    ref field,
                } => this.field_chain(chain, base, field, at)?,
                _ => return Err(internal(at)),
            };
            chain = this.chain_marked(node, linked)?;
        }
        Ok(chain)
    }

    pub(super) async fn binary_chain(
        self,
        expression: &'b AstExpression,
    ) -> Result<Handle<Expression>> {
        let mut this = self.lowerer();
        let spine = this.lowered_spine(expression)?;
        let mut left = {
            let frame = self.clone().typed(spine.head);
            drop(this);
            let result = self.nest(frame).await;
            this = self.lowerer();
            result
        }?;
        let mut links = spine.links.into_iter().rev().peekable();
        while let Some(node) = links.next() {
            let value = {
                let frame = self.clone().binary_link(node, left);
                drop(this);
                let result = self.nest(frame).await;
                this = self.lowerer();
                result
            }?;
            if links.peek().is_none() {
                return Ok(value);
            }
            left = this.passed_on(node, Some(value))?;
        }
        Err(internal(this.at(expression.span)))
    }

    async fn binary_link(self, node: &'b AstExpression, left: Typed) -> Result<Handle<Expression>> {
        let mut this = self.lowerer();
        let at = this.at(node.span);
        let ExpressionKind::Binary {
            operator,
            ref right,
            ..
        } = node.kind
        else {
            return Err(internal(at));
        };
        let value = if matches!(operator, AstBinary::LogicalAnd | AstBinary::LogicalOr)
            && !this.pure(right)
        {
            {
                let frame = self.clone().short_circuit(operator, left.0, right, at);
                drop(this);
                let result = self.nest(frame).await;
                this = self.lowerer();
                result
            }?
        } else {
            let right = {
                let frame = self.clone().typed(right);
                drop(this);
                let result = self.nest(frame).await;
                this = self.lowerer();
                result
            }?;
            this.binary_typed(operator, left, right, at)?
        };
        if this.info(node)?.non_uniform {
            this.mark_operation(value);
        }
        Ok(value)
    }

    pub(super) async fn unary_chain(
        self,
        expression: &'b AstExpression,
    ) -> Result<Handle<Expression>> {
        let mut this = self.lowerer();
        let spine = this.lowered_spine(expression)?;
        let mut operand: Option<Typed> = None;
        let mut links = spine.links.into_iter().rev().peekable();
        while let Some(node) = links.next() {
            let value = {
                let frame = self.clone().unary_link(node, operand.take());
                drop(this);
                let result = self.nest(frame).await;
                this = self.lowerer();
                result
            }?;
            if links.peek().is_none() {
                return Ok(value);
            }
            operand = Some(this.passed_on(node, Some(value))?);
        }
        Err(internal(this.at(expression.span)))
    }

    async fn unary_link(
        self,
        node: &'b AstExpression,
        operand: Option<Typed>,
    ) -> Result<Handle<Expression>> {
        let mut this = self.lowerer();
        let at = this.at(node.span);
        let ExpressionKind::Unary {
            operator,
            operand: ref inner,
        } = node.kind
        else {
            return Err(internal(at));
        };
        if let AstUnary::Increment | AstUnary::Decrement = operator {
            if operand.is_some() {
                return Err(internal(at));
            }
            return {
                let frame =
                    self.clone()
                        .increment(inner, operator == AstUnary::Increment, false, at);
                drop(this);
                let result = self.nest(frame).await;
                result
            };
        }
        let (value, ty) = match operand {
            Some(typed) => typed,
            None => {
                let frame = self.clone().typed(inner);
                drop(this);
                let result = self.nest(frame).await;
                this = self.lowerer();
                result
            }?,
        };
        let value = this.unary_typed(operator, at, value, ty)?;
        if this.info(node)?.non_uniform {
            this.mark_value(value);
        }
        Ok(value)
    }

    pub(super) async fn assignment_chain(
        self,
        expression: &'b AstExpression,
    ) -> Result<Handle<Expression>> {
        let mut this = self.lowerer();
        let spine = Spine::of(expression);
        let mut pending = Vec::with_capacity(spine.links.len());
        for node in spine.links {
            let at = this.at(node.span);
            let ExpressionKind::Assignment {
                operator,
                ref target,
                ..
            } = node.kind
            else {
                return Err(internal(at));
            };
            let place = {
                let frame = self.clone().place(target);
                drop(this);
                let result = self.nest(frame).await;
                this = self.lowerer();
                result
            }?;
            let old = match super::expression::compound(operator) {
                Some(_) => Some(this.compound_old(target, &place, at)?),
                None => None,
            };
            pending.push(Pending { node, place, old });
        }
        let mut inner = None;
        while let Some(Pending { node, place, old }) = pending.pop() {
            let at = this.at(node.span);
            let ExpressionKind::Assignment {
                operator,
                ref target,
                ref value,
            } = node.kind
            else {
                return Err(internal(at));
            };
            let typed = match inner.take() {
                Some(result) => this.passed_on(value, Some(result))?,
                None => {
                    let frame = self.clone().typed(value);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?,
            };
            let result = match (super::expression::compound(operator), old) {
                (None, _) => typed.0,
                (Some(binary), Some(old)) => {
                    this.compound_assignment(binary, (target, &place, old), value, typed, at)?
                }
                (Some(_), None) => return Err(internal(at)),
            };
            this.store(&place, result, at)?;
            inner = Some(result);
        }
        inner.ok_or_else(|| internal(this.at(expression.span)))
    }

    pub(super) async fn conditional_chain(
        self,
        expression: &'b AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let this = self.lowerer();
        let spine = this.lowered_spine(expression)?;
        let modes = this.conditional_modes(&spine.links, spine.head)?;
        let first = modes
            .first()
            .copied()
            .ok_or_else(|| internal(this.at(expression.span)))?;
        let run = modes.iter().take_while(|mode| **mode == first).count();
        let links = spine
            .links
            .get(..run)
            .ok_or_else(|| internal(this.at(expression.span)))?;
        let tail = spine.links.get(run).copied().unwrap_or(spine.head);
        match (first, links) {
            (Mode::Select, _) => {
                let frame = self.clone().select_chain(links.to_vec(), tail);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            .map(Some),
            (_, &[node]) => {
                let frame = self.clone().single_conditional(node, first, tail);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            _ => {
                let frame =
                    self.clone()
                        .flat_conditionals(links.to_vec(), first == Mode::Local, tail);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
        }
    }

    async fn select_chain(
        self,
        links: Vec<&'b AstExpression>,
        tail: &'b AstExpression,
    ) -> Result<Handle<Expression>> {
        let links = links.as_slice();
        let mut this = self.lowerer();
        let mut parts = Vec::with_capacity(links.len());
        for &node in links {
            let (condition, then_expression) = this.conditional_parts(node)?;
            let condition = {
                let frame = self.clone().rvalue(condition);
                drop(this);
                let result = self.nest(frame).await;
                this = self.lowerer();
                result
            }?;
            let accept = {
                let frame = self.clone().rvalue(then_expression);
                drop(this);
                let result = self.nest(frame).await;
                this = self.lowerer();
                result
            }?;
            parts.push((node, condition, accept));
        }
        let mut reject = {
            let frame = self.clone().rvalue(tail);
            drop(this);
            let result = self.nest(frame).await;
            this = self.lowerer();
            result
        }?;
        while let Some((node, condition, accept)) = parts.pop() {
            let at = this.at(node.span);
            let value = this.add(
                Expression::Select {
                    condition,
                    accept,
                    reject,
                },
                at,
            )?;
            if parts.is_empty() {
                return Ok(value);
            }
            reject = this.passed_on(node, Some(value))?.0;
        }
        Err(internal(this.at(tail.span)))
    }

    async fn single_conditional(
        self,
        node: &'b AstExpression,
        mode: Mode,
        tail: &'b AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let mut this = self.lowerer();
        let at = this.at(node.span);
        let (condition, then_expression) = this.conditional_parts(node)?;
        let condition = {
            let frame = self.clone().rvalue(condition);
            drop(this);
            let result = self.nest(frame).await;
            this = self.lowerer();
            result
        }?;
        if mode == Mode::Effect {
            return {
                let frame = self
                    .clone()
                    .conditional_effect(condition, [then_expression, tail], at);
                drop(this);
                let result = self.nest(frame).await;
                result
            };
        }
        let ty = &this.info(node)?.ty;
        {
            let frame = self
                .clone()
                .conditional_local(ty, condition, [then_expression, tail], at);
            drop(this);
            let result = self.nest(frame).await;
            result
        }
    }

    async fn branch(
        self,
        expression: &'b AstExpression,
        result: Option<Handle<LocalVariable>>,
        at: Span,
    ) -> Result<()> {
        let this = self.lowerer();
        match result {
            Some(local) => {
                let frame = self.clone().stored(expression, local, at);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            None => {
                let frame = self.clone().effect(expression);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
        }
    }
}
