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
use crate::{Expression, Handle};

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

    fn conditional_mode(&self, node: &AstExpression, reject: &AstExpression) -> Result<Mode> {
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
        } else if (ty.is_scalar() || ty.is_vector())
            && self.pure(reject)
            && self.pure(then_expression)
            && !self.nested_conditional(reject)?
            && !self.nested_conditional(then_expression)?
        {
            Mode::Select
        } else {
            Mode::Local
        })
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
            let ExpressionKind::Assignment { ref target, .. } = node.kind else {
                return Err(internal(at));
            };
            let place = self.place_child(target)?;
            pending.push(Pending { node, place });
        }
        let mut inner = None;
        while let Some(Pending { node, place }) = pending.pop() {
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
            let result = match super::expression::compound(operator) {
                None => typed.0,
                Some(binary) => {
                    let old = self.compound_old(target, &place, at)?;
                    (self.compound_assignment(binary, (target, &place, old), value, typed, at))?
                }
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
        let tail = self.else_part(expression)?;
        let mode = self.conditional_mode(expression, tail)?;
        if mode == Mode::Select {
            return recurse(|| self.select(expression, tail)).map(Some);
        }
        recurse(|| self.single_conditional(expression, mode, tail))
    }

    fn else_part<'e>(&self, node: &'e AstExpression) -> Result<&'e AstExpression> {
        match node.kind {
            ExpressionKind::Conditional {
                ref else_expression,
                ..
            } => Ok(else_expression),
            _ => Err(internal(self.at(node.span))),
        }
    }

    fn select(&mut self, node: &AstExpression, tail: &AstExpression) -> Result<Handle<Expression>> {
        let (condition, then_expression) = self.conditional_parts(node)?;
        let condition = recurse(|| self.rvalue(condition))?;
        let accept = recurse(|| self.rvalue(then_expression))?;
        let reject = recurse(|| self.rvalue(tail))?;
        self.add(
            Expression::Select {
                condition,
                accept,
                reject,
            },
            self.at(node.span),
        )
    }

    fn nested_conditional(&self, expression: &AstExpression) -> Result<bool> {
        let mut node = expression;
        while let ExpressionKind::Parenthesized(ref inner) = node.kind {
            node = inner;
        }
        Ok(matches!(node.kind, ExpressionKind::Conditional { .. })
            && !self.folds(node)?
            && self.constant_choice(node).is_none())
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
}
