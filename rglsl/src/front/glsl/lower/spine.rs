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

impl FunctionLowerer<'_, '_> {
    pub(super) fn access_chain(&mut self, expression: &AstExpression) -> Result<Chain> {
        let mut links = Vec::new();
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
                } => self.subscript_chain(chain, base, index, at)?,
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

    pub(super) fn binary_chain(
        &mut self,
        expression: &AstExpression,
    ) -> Result<Handle<Expression>> {
        let spine = self.lowered_spine(expression)?;
        let mut left = self.typed(spine.head)?;
        let mut links = spine.links.into_iter().rev().peekable();
        while let Some(node) = links.next() {
            let value = self.binary_link(node, left)?;
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
            ref right,
            ..
        } = node.kind
        else {
            return Err(internal(at));
        };
        let value = if matches!(operator, AstBinary::LogicalAnd | AstBinary::LogicalOr)
            && !self.pure(right)
        {
            self.short_circuit(operator, left.0, right, at)?
        } else {
            let right = self.typed(right)?;
            self.binary_typed(operator, left, right, at)?
        };
        if self.info(node)?.non_uniform {
            self.mark_operation(value);
        }
        Ok(value)
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
            return self.increment(inner, operator == AstUnary::Increment, false, at);
        }
        let (value, ty) = match operand {
            Some(typed) => typed,
            None => self.typed(inner)?,
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
            let place = self.place(target)?;
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
                None => self.typed(value)?,
            };
            let result = match (super::expression::compound(operator), old) {
                (None, _) => typed.0,
                (Some(binary), Some(old)) => {
                    self.compound_assignment(binary, (target, &place, old), value, typed, at)?
                }
                (Some(_), None) => return Err(internal(at)),
            };
            self.store(&place, result, at)?;
            inner = Some(result);
        }
        inner.ok_or_else(|| internal(self.at(expression.span)))
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

    pub(super) fn conditional_chain(
        &mut self,
        expression: &AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let spine = self.lowered_spine(expression)?;
        let modes = self.conditional_modes(&spine.links, spine.head)?;
        let first = modes
            .first()
            .copied()
            .ok_or_else(|| internal(self.at(expression.span)))?;
        let run = modes.iter().take_while(|mode| **mode == first).count();
        let links = spine
            .links
            .get(..run)
            .ok_or_else(|| internal(self.at(expression.span)))?;
        let tail = spine.links.get(run).copied().unwrap_or(spine.head);
        match (first, links) {
            (Mode::Select, _) => self.select_chain(links, tail).map(Some),
            (_, &[node]) => self.single_conditional(node, first, tail),
            _ => self.flat_conditionals(links, first == Mode::Local, tail),
        }
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

    fn select_chain(
        &mut self,
        links: &[&AstExpression],
        tail: &AstExpression,
    ) -> Result<Handle<Expression>> {
        let mut parts = Vec::with_capacity(links.len());
        for &node in links {
            let (condition, then_expression) = self.conditional_parts(node)?;
            let condition = self.rvalue(condition)?;
            let accept = self.rvalue(then_expression)?;
            parts.push((node, condition, accept));
        }
        let mut reject = self.rvalue(tail)?;
        while let Some((node, condition, accept)) = parts.pop() {
            let at = self.at(node.span);
            let value = self.add(
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
        let condition = self.rvalue(condition)?;
        if mode == Mode::Effect {
            return self.conditional_effect(condition, [then_expression, tail], at);
        }
        let ty = &self.info(node)?.ty;
        self.conditional_local(ty, condition, [then_expression, tail], at)
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

    fn branch(
        &mut self,
        expression: &AstExpression,
        result: Option<Handle<LocalVariable>>,
        at: Span,
    ) -> Result<()> {
        match result {
            Some(local) => self.stored(expression, local, at),
            None => self.effect(expression),
        }
    }

    fn flat_conditionals(
        &mut self,
        links: &[&AstExpression],
        valued: bool,
        tail: &AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let outer = links
            .first()
            .map(|node| self.at(node.span))
            .ok_or_else(|| internal(self.at(tail.span)))?;
        let none = u32::try_from(links.len()).map_err(|_| internal(outer))?;
        let taken = self.local(&GlslType::UINT, None, outer)?;
        self.set_taken(taken, none, outer)?;
        let mut results = Vec::with_capacity(links.len());
        for &node in links {
            results.push(if valued {
                let ty = &self.info(node)?.ty;
                Some(self.local(ty, None, self.at(node.span))?)
            } else {
                None
            });
        }
        for (level, (&node, &result)) in (0u32..).zip(links.iter().zip(&results)) {
            let at = self.at(node.span);
            let last = level.checked_add(1) == Some(none);
            let (condition, then_expression) = self.conditional_parts(node)?;
            let chosen = |this: &mut Self| -> Result<()> {
                let condition = this.rvalue(condition)?;
                let accept = this.nested(|this| {
                    this.branch(then_expression, result, at)?;
                    this.set_taken(taken, level, at)
                })?;
                let reject = if last {
                    this.nested(|this| this.branch(tail, result, at))?
                } else {
                    Block::new()
                };
                this.push(
                    Statement::If {
                        condition,
                        accept,
                        reject,
                        control: SelectionControl::None,
                    },
                    at,
                );
                Ok(())
            };
            if level == 0 {
                chosen(self)?;
            } else {
                let pending = self.taken_is(taken, none, at)?;
                let accept = self.nested(chosen)?;
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
            let reject = self.nested(|this| {
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
}
