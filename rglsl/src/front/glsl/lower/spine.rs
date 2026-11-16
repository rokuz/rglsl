use alloc::vec::Vec;

use rglsl_ast::ast::{
    BinaryOperator as AstBinary, Expression as AstExpression, ExpressionKind,
    UnaryOperator as AstUnary,
};
use rglsl_ast::{Spine, SpineLinks};
use rglsl_sema::ExpressionInfo;
use rglsl_sema::types::Type as GlslType;
use rglsl_types::stack::recurse;

use super::expression::{Chain, Place};
use super::function::FunctionLowerer;
use super::specialization::is_direct;
use super::{Result, internal};
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
    pub(super) fn folds(&self, expression: &AstExpression) -> Result<bool> {
        let info = self.info(expression)?;
        Ok(if info.is_specialization {
            !self.specializing && !is_direct(expression)
        } else {
            self.is_folded_constant(info)
        })
    }

    pub(super) fn is_folded_constant(&self, info: &ExpressionInfo) -> bool {
        info.is_constant
            && info.value.is_some()
            && !info.ty.contains_reference(&self.lw.analysis.types)
    }

    fn lowered_binary_spine<'e>(&self, expression: &'e AstExpression) -> Result<Spine<'e>> {
        let mut links = SpineLinks::new();
        let mut current = expression;
        loop {
            if !links.is_empty() && self.folds(current)? {
                break;
            }
            match current.kind {
                ExpressionKind::Binary { ref left, .. } => {
                    links.push(current);
                    current = left;
                }
                ExpressionKind::Parenthesized(ref inner) => {
                    let info = self.info(inner)?;
                    if info.ty.is_void() || info.ty.is_string() {
                        break;
                    }
                    links.push(current);
                    current = inner;
                }
                _ => break,
            }
        }
        Ok(Spine {
            links,
            head: current,
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
        if let Some(position) = cut
            && let Some(&head) = spine.links.get(position)
        {
            spine.head = head;
            spine.links.truncate(position);
        }
        Ok(spine)
    }

    pub(super) fn passed_on(
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

    fn conditional_spine<'e>(&self, expression: &'e AstExpression) -> Result<Spine<'e>> {
        let mut links = SpineLinks::new();
        let mut head = expression;
        while let ExpressionKind::Conditional {
            ref else_expression,
            ..
        } = head.kind
        {
            if !links.is_empty() && (self.folds(head)? || self.constant_choice(head).is_some()) {
                break;
            }
            links.push(head);
            head = else_expression;
        }
        Ok(Spine { links, head })
    }

    fn constant_choice<'e>(&self, node: &'e AstExpression) -> Option<&'e AstExpression> {
        let ExpressionKind::Conditional {
            ref condition,
            ref then_expression,
            ref else_expression,
        } = node.kind
        else {
            return None;
        };
        self.constant_condition(condition).map(|taken| {
            if taken {
                &**then_expression
            } else {
                &**else_expression
            }
        })
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

impl FunctionLowerer<'_, '_> {
    fn flat_conditionals(
        &mut self,
        links: &[&AstExpression],
        valued: bool,
        tail: &AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let outer_span = links.first().map_or(tail.span, |node| node.span);
        let outer = self.at(outer_span);
        if links.is_empty() {
            return Err(internal(outer));
        }
        let none = u32::try_from(links.len()).map_err(|_| internal(outer))?;
        let taken = self.local(&GlslType::UINT, None, outer)?;
        self.set_taken(taken, none, outer)?;
        let mut results = Vec::with_capacity(links.len());
        for &node in links {
            results.push(if valued {
                let ty = &self.info(node)?.ty;
                let at = self.at(node.span);
                Some(self.local(ty, None, at)?)
            } else {
                None
            });
        }
        for (level, (&node, &result)) in (0u32..).zip(links.iter().zip(&results)) {
            let at = self.at(node.span);
            let last = level.checked_add(1) == Some(none);
            let (condition, then_expression) = self.conditional_parts(node)?;
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
                let chosen = recurse(|| self.flat_level(chosen));
                chosen?;
            } else {
                let pending = self.taken_is(taken, none, at)?;
                let accept = self.block(|this| this.flat_level(chosen));
                let accept = accept?;
                self.push(
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
            let at = self.at(inner.span);
            let skip = self.taken_is(taken, level, at)?;
            let reject = self.block(|this| {
                let pointer = this.local_pointer(inner_result, at)?;
                let loaded = this.add(Expression::Load { pointer }, at)?;
                let (value, _) = this.typed_value(inner, Some(loaded))?;
                let pointer = this.local_pointer(result, at)?;
                this.push(Statement::Store { pointer, value }, at);
                Ok(())
            })?;
            self.push(
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
        let pointer = self.local_pointer(result, outer)?;
        self.add(Expression::Load { pointer }, outer).map(Some)
    }

    fn flat_level(&mut self, level: FlatLevel<'_>) -> Result<()> {
        let FlatLevel {
            condition,
            then_expression,
            tail,
            result,
            taken,
            level,
            at,
        } = level;
        let condition = recurse(|| self.rvalue(condition))?;
        let accept = self.block(|this| {
            recurse(|| this.branch(then_expression, result, at))?;
            this.set_taken(taken, level, at)
        })?;
        let reject = match tail {
            Some(tail) => self.block(|this| this.branch(tail, result, at))?,
            None => Block::new(),
        };
        self.push(
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
    pub(super) fn access_chain(&mut self, expression: &AstExpression) -> Result<Chain> {
        let mut links = SpineLinks::new();
        let mut current = expression;
        while let ExpressionKind::Subscript { ref base, .. }
        | ExpressionKind::FieldSelection { ref base, .. } = current.kind
        {
            links.push(current);
            current = base;
        }
        let head = self.chain_head(current)?;
        let mut chain = self.chain_marked(current, head)?;
        for node in links.into_iter().rev() {
            let at = self.at(node.span);
            let linked = match node.kind {
                ExpressionKind::Subscript {
                    ref base,
                    ref index,
                } => recurse(|| self.subscript_chain(chain, base, index, at))?,
                ExpressionKind::FieldSelection {
                    ref base,
                    ref field,
                } => self.field_chain(chain, base, field, at)?,
                _ => return Err(internal(at)),
            };
            chain = self.chain_marked(node, linked)?;
        }
        Ok(chain)
    }

    pub(super) fn binary_chain(
        &mut self,
        expression: &AstExpression,
    ) -> Result<Handle<Expression>> {
        let spine = self.lowered_binary_spine(expression)?;
        let mut left = self.typed_child(spine.head)?;
        let mut links = spine.links.into_iter().rev().peekable();
        while let Some(node) = links.next() {
            let value = match node.kind {
                ExpressionKind::Parenthesized(_) => left.0,
                _ => self.binary_link(node, left)?,
            };
            if links.peek().is_none() {
                return Ok(value);
            }
            left = self.passed_on(node, Some(value))?;
        }
        Err(internal(self.at(expression.span)))
    }

    fn binary_link(&mut self, node: &AstExpression, left: Typed) -> Result<Handle<Expression>> {
        let at = self.at(node.span);
        let ExpressionKind::Binary {
            operator,
            left: ref left_operand,
            ref right,
        } = node.kind
        else {
            return Err(internal(at));
        };
        let logical = matches!(operator, AstBinary::LogicalAnd | AstBinary::LogicalOr);
        if let Some(constant) = logical
            .then(|| Ok(self.constant_condition(left_operand)))
            .transpose()?
            .flatten()
        {
            if constant == (operator == AstBinary::LogicalOr) {
                return Ok(left.0);
            }
            return self.rvalue(right);
        }
        if logical && !self.pure(right) {
            let value = recurse(|| self.short_circuit(operator, left.0, right, at))?;
            return self.marked_operation(node, value);
        }
        let right = self.typed_child(right)?;
        self.binary_node(node, operator, left, right, at)
    }

    pub(super) fn unary_chain(&mut self, expression: &AstExpression) -> Result<Handle<Expression>> {
        let spine = self.lowered_spine(expression)?;
        let mut operand: Option<Typed> = None;
        let mut links = spine.links.into_iter().rev().peekable();
        while let Some(node) = links.next() {
            let value = self.unary_link(node, operand.take())?;
            if links.peek().is_none() {
                return Ok(value);
            }
            operand = Some(self.passed_on(node, Some(value))?);
        }
        Err(internal(self.at(expression.span)))
    }

    fn unary_link(
        &mut self,
        node: &AstExpression,
        operand: Option<Typed>,
    ) -> Result<Handle<Expression>> {
        let at = self.at(node.span);
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
            return recurse(|| self.increment(inner, operator == AstUnary::Increment, false, at));
        }
        let (value, ty) = match operand {
            Some(typed) => typed,
            None => self.typed_child(inner)?,
        };
        let value = self.unary_typed(operator, at, value, ty)?;
        if self.info(node)?.non_uniform {
            self.mark_value(value);
        }
        Ok(value)
    }

    pub(super) fn assignment_chain(
        &mut self,
        expression: &AstExpression,
    ) -> Result<Handle<Expression>> {
        let spine = Spine::of(expression);
        let mut pending = Vec::with_capacity(spine.links.len());
        for node in spine.links {
            let at = self.at(node.span);
            let ExpressionKind::Assignment {
                operator,
                ref target,
                ..
            } = node.kind
            else {
                return Err(internal(at));
            };
            let place = self.place_child(target)?;
            let old = match super::expression::compound(operator) {
                Some(_) => Some(self.compound_old(target, &place, at)?),
                None => None,
            };
            pending.push(Pending { node, place, old });
        }
        let mut inner = None;
        while let Some(Pending { node, place, old }) = pending.pop() {
            let at = self.at(node.span);
            let ExpressionKind::Assignment {
                operator,
                ref target,
                ref value,
            } = node.kind
            else {
                return Err(internal(at));
            };
            let typed = match inner.take() {
                Some(result) => self.passed_on(value, Some(result))?,
                None => self.typed_child(value)?,
            };
            let result = match (super::expression::compound(operator), old) {
                (None, _) => typed.0,
                (Some(binary), Some(old)) => {
                    (self.compound_assignment(binary, (target, &place, old), value, typed, at))?
                }
                (Some(_), None) => return Err(internal(at)),
            };
            self.store(&place, result, at)?;
            inner = Some(result);
        }
        let at = self.at(expression.span);
        inner.ok_or_else(|| internal(at))
    }

    pub(super) fn conditional_chain(
        &mut self,
        expression: &AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        if let Some(chosen) = self.constant_choice(expression) {
            if self.info(expression)?.ty.is_void() {
                let result = recurse(|| self.effect(chosen));
                return result.map(|()| None);
            }
            let result = recurse(|| self.rvalue(chosen));
            return result.map(Some);
        }
        let spine = self.conditional_spine(expression)?;
        let modes = self.conditional_modes(&spine.links, spine.head)?;
        let first = modes
            .first()
            .copied()
            .ok_or(internal(self.at(expression.span)))?;
        let run = modes.iter().take_while(|mode| **mode == first).count();
        let links = spine
            .links
            .get(..run)
            .ok_or(internal(self.at(expression.span)))?;
        let tail = spine.links.get(run).copied().unwrap_or(spine.head);
        match (first, links) {
            (Mode::Select, _) => recurse(|| self.select_chain(links, tail)).map(Some),
            (_, &[node]) => recurse(|| self.single_conditional(node, first, tail)),
            _ => recurse(|| self.flat_conditionals(links, first == Mode::Local, tail)),
        }
    }

    fn select_chain(
        &mut self,
        links: &[&AstExpression],
        tail: &AstExpression,
    ) -> Result<Handle<Expression>> {
        let mut parts = Vec::with_capacity(links.len());
        for &node in links {
            let (condition, then_expression) = self.conditional_parts(node)?;
            let condition = recurse(|| self.rvalue(condition))?;
            let accept = recurse(|| self.rvalue(then_expression))?;
            parts.push((node, condition, accept));
        }
        let mut reject = recurse(|| self.rvalue(tail))?;
        while let Some((node, condition, accept)) = parts.pop() {
            let at = self.at(node.span);
            let value = (self.add(
                Expression::Select {
                    condition,
                    accept,
                    reject,
                },
                at,
            ))?;
            if parts.is_empty() {
                return Ok(value);
            }
            reject = self.passed_on(node, Some(value))?.0;
        }
        Err(internal(self.at(tail.span)))
    }

    fn single_conditional(
        &mut self,
        node: &AstExpression,
        mode: Mode,
        tail: &AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let at = self.at(node.span);
        let (condition, then_expression) = self.conditional_parts(node)?;
        let condition = recurse(|| self.rvalue(condition))?;
        if mode == Mode::Effect {
            return recurse(|| self.conditional_effect(condition, [then_expression, tail], at));
        }
        let ty = &self.info(node)?.ty;
        recurse(|| self.conditional_local(ty, condition, [then_expression, tail], at))
    }

    fn branch(
        &mut self,
        expression: &AstExpression,
        result: Option<Handle<LocalVariable>>,
        at: Span,
    ) -> Result<()> {
        match result {
            Some(local) => recurse(|| self.stored(expression, local, at)),
            None => recurse(|| self.effect(expression)),
        }
    }
}
