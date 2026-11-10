use alloc::vec::Vec;

use rglsl_ast::ast::{
    AssignmentOperator, BinaryOperator as AstBinary, Expression as AstExpression, ExpressionKind,
    Initializer, PostfixOperator, Spanned, UnaryOperator as AstUnary,
};
use rglsl_sema::constant::Value;
use rglsl_sema::types::{Scalar as GlslScalar, Type as GlslType, TypeKind};
use rglsl_sema::{Callee, ExpressionInfo};

use super::constant::{literal, shape, Shape};
use super::function::{FunctionLowerer, Local};
use super::specialization::is_direct;
use super::types::{scalar, vector_size};
use super::{internal, semantic, unsupported, GlobalRef, Result};
use crate::{
    AddressSpace, BinaryOperator, Expression, Handle, Literal, RelationalFunction, Span, Statement,
    SwizzleComponent, UnaryOperator,
};

#[derive(Clone, Debug)]
pub(super) struct Place {
    pub pointer: Handle<Expression>,
    pub swizzle: Option<Vec<u32>>,
    pub boolean: bool,
}

impl Place {
    const fn pointer(pointer: Handle<Expression>, boolean: bool) -> Self {
        Self {
            pointer,
            swizzle: None,
            boolean,
        }
    }
}

pub(super) enum Chain {
    Place(Place),
    Value(Handle<Expression>),
}

pub(super) fn swizzle_indices(name: &str) -> Vec<u32> {
    const SETS: [&str; 3] = ["xyzw", "rgba", "stpq"];
    let mut indices: Vec<u32> = name
        .chars()
        .filter_map(|character| {
            SETS.iter()
                .find_map(|set| set.find(character))
                .and_then(|index| u32::try_from(index).ok())
        })
        .collect();
    if indices.is_empty() {
        indices.push(0);
    }
    indices
}

fn pattern(indices: &[u32]) -> [SwizzleComponent; 4] {
    let mut pattern = [SwizzleComponent::X; 4];
    for (slot, index) in pattern.iter_mut().zip(indices) {
        *slot = match *index {
            1 => SwizzleComponent::Y,
            2 => SwizzleComponent::Z,
            3 => SwizzleComponent::W,
            _ => SwizzleComponent::X,
        };
    }
    pattern
}

const fn compound(operator: AssignmentOperator) -> Option<AstBinary> {
    Some(match operator {
        AssignmentOperator::Assign => return None,
        AssignmentOperator::Multiply => AstBinary::Multiply,
        AssignmentOperator::Divide => AstBinary::Divide,
        AssignmentOperator::Modulo => AstBinary::Modulo,
        AssignmentOperator::Add => AstBinary::Add,
        AssignmentOperator::Subtract => AstBinary::Subtract,
        AssignmentOperator::ShiftLeft => AstBinary::ShiftLeft,
        AssignmentOperator::ShiftRight => AstBinary::ShiftRight,
        AssignmentOperator::BitAnd => AstBinary::BitAnd,
        AssignmentOperator::BitXor => AstBinary::BitXor,
        AssignmentOperator::BitOr => AstBinary::BitOr,
    })
}

impl<'a> FunctionLowerer<'_, 'a> {
    pub(super) fn info(&self, expression: &AstExpression) -> Result<&'a ExpressionInfo> {
        let analysis = self.lw.analysis;
        analysis
            .expression(expression.id)
            .ok_or_else(|| internal(self.at(expression.span)))
    }

    pub(super) fn typed(
        &mut self,
        expression: &AstExpression,
    ) -> Result<(Handle<Expression>, GlslType)> {
        let at = self.at(expression.span);
        let info = self.info(expression)?;
        let value = self
            .value(expression)?
            .ok_or_else(|| semantic("a `void` value is used", at))?;
        match info.conversion {
            Some(ref target) if *target != info.ty => {
                let converted = self.convert(value, &info.ty, target, at)?;
                Ok((converted, target.clone()))
            }
            _ => Ok((value, info.ty.clone())),
        }
    }

    pub(super) fn rvalue(&mut self, expression: &AstExpression) -> Result<Handle<Expression>> {
        self.typed(expression).map(|(value, _)| value)
    }

    pub(super) fn effect(&mut self, expression: &AstExpression) -> Result<()> {
        self.value(expression).map(|_| ())
    }

    pub(super) fn literal(&mut self, literal: Literal, at: Span) -> Result<Handle<Expression>> {
        self.add(Expression::Literal(literal), at)
    }

    pub(super) fn constant(
        &mut self,
        ty: &GlslType,
        values: &[Value],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let analysis = self.lw.analysis;
        match shape(ty, values, &analysis.types).ok_or_else(|| internal(at))? {
            Shape::Literal(value) => self.literal(literal(value), at),
            Shape::Compose(parts) => {
                let mut components = Vec::with_capacity(parts.len());
                for (part, start, size) in parts {
                    let end = start.checked_add(size).ok_or_else(|| internal(at))?;
                    let slice = values.get(start..end).ok_or_else(|| internal(at))?;
                    components.push(self.constant(&part, slice, at)?);
                }
                let ty = self.lw.ir_type(ty, at)?;
                self.add(Expression::Compose { ty, components }, at)
            }
        }
    }

    pub(super) fn value(
        &mut self,
        expression: &AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let at = self.at(expression.span);
        let info = self.info(expression)?;
        if info.is_specialization {
            if !self.specializing && !is_direct(expression) {
                let handle = self.lw.specialization(expression, None, at)?;
                return self.add(Expression::Override(handle), at).map(Some);
            }
        } else if info.is_constant {
            if let Some(ref value) = info.value {
                return self.constant(&info.ty, &value.values, at).map(Some);
            }
        }
        let value = match expression.kind {
            ExpressionKind::Variable(_)
            | ExpressionKind::Subscript { .. }
            | ExpressionKind::FieldSelection { .. } => match self.chain(expression)? {
                Chain::Place(place) => self.load(&place, at)?,
                Chain::Value(value) => value,
            },
            ExpressionKind::Number(_) | ExpressionKind::Bool(_) => return Err(internal(at)),
            ExpressionKind::Parenthesized(ref inner) => return self.value_converted(inner),
            ExpressionKind::FunctionCall(ref call) => return self.call(expression, call),
            ExpressionKind::Postfix {
                ref operand,
                operator,
            } => self.increment(operand, operator == PostfixOperator::Increment, true, at)?,
            ExpressionKind::Unary {
                operator,
                ref operand,
            } => match operator {
                AstUnary::Increment => self.increment(operand, true, false, at)?,
                AstUnary::Decrement => self.increment(operand, false, false, at)?,
                _ => self.unary(operator, operand, at)?,
            },
            ExpressionKind::Binary {
                operator,
                ref left,
                ref right,
            } => self.binary_expression(operator, left, right, at)?,
            ExpressionKind::Conditional {
                ref condition,
                ref then_expression,
                ref else_expression,
            } => {
                return self.conditional(&info.ty, condition, then_expression, else_expression, at)
            }
            ExpressionKind::Assignment {
                operator,
                ref target,
                ref value,
            } => self.assignment(operator, target, value, at)?,
            ExpressionKind::Sequence(ref expressions) => {
                let mut last = None;
                for expression in expressions {
                    last = self.value_converted(expression)?;
                }
                return Ok(last);
            }
        };
        Ok(Some(value))
    }

    fn value_converted(
        &mut self,
        expression: &AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let info = self.info(expression)?;
        if info.ty.is_void() {
            return self.value(expression);
        }
        self.rvalue(expression).map(Some)
    }

    pub(super) fn as_kind(
        &mut self,
        value: Handle<Expression>,
        target: crate::Scalar,
        at: Span,
    ) -> Result<Handle<Expression>> {
        self.add(
            Expression::As {
                expr: value,
                kind: target.kind,
                convert: Some(target.width),
            },
            at,
        )
    }

    pub(super) fn convert(
        &mut self,
        value: Handle<Expression>,
        from: &GlslType,
        to: &GlslType,
        at: Span,
    ) -> Result<Handle<Expression>> {
        if from == to {
            return Ok(value);
        }
        if from.is_array() || to.is_array() || !from.same_shape(to) {
            return Err(internal(at));
        }
        let (Some(source), Some(target)) = (from.base_scalar(), to.base_scalar()) else {
            return Err(internal(at));
        };
        if source == target {
            return Ok(value);
        }
        let target_scalar = scalar(target);
        match to.kind {
            TypeKind::Matrix { columns, .. } => {
                let mut components = Vec::with_capacity(usize::from(columns));
                for index in 0..u32::from(columns) {
                    let column = self.add(Expression::AccessIndex { base: value, index }, at)?;
                    components.push(self.as_kind(column, target_scalar, at)?);
                }
                let ty = self.lw.ir_type(to, at)?;
                self.add(Expression::Compose { ty, components }, at)
            }
            _ => self.as_kind(value, target_scalar, at),
        }
    }

    pub(super) fn place(&mut self, expression: &AstExpression) -> Result<Place> {
        match self.chain(expression)? {
            Chain::Place(place) => Ok(place),
            Chain::Value(_) => Err(semantic(
                "the expression is not an l-value",
                self.at(expression.span),
            )),
        }
    }

    fn variable_chain(&mut self, expression: &AstExpression) -> Result<Chain> {
        let at = self.at(expression.span);
        let analysis = self.lw.analysis;
        let symbol = *analysis
            .references
            .get(&expression.id)
            .ok_or_else(|| internal(at))?;
        if let Some(local) = self.variables.get(&symbol).copied() {
            return Ok(match local {
                Local::Variable(handle) => Chain::Place(Place::pointer(
                    self.add(Expression::LocalVariable(handle), at)?,
                    false,
                )),
                Local::Pointer(index) => Chain::Place(Place::pointer(
                    self.add(Expression::FunctionArgument(index), at)?,
                    false,
                )),
                Local::Value(index) => {
                    Chain::Value(self.add(Expression::FunctionArgument(index), at)?)
                }
            });
        }
        if let Some(&rglsl_sema::scope::SymbolKind::BlockMember { instance, index }) =
            self.lw.symbol(symbol).map(|symbol| &symbol.kind)
        {
            if !self.lw.is_builtin_symbol(symbol) {
                let block = self
                    .lw
                    .variable(instance)
                    .and_then(|variable| match variable.ty.kind {
                        TypeKind::Block(id) => Some(id),
                        _ => None,
                    })
                    .ok_or_else(|| internal(at))?;
                let GlobalRef::Variable(global) = self.lw.global_ref(instance, at)? else {
                    return Err(internal(at));
                };
                let base = self.add(Expression::GlobalVariable(global), at)?;
                let pointer = self.add(Expression::AccessIndex { base, index }, at)?;
                let boolean = self.lw.block_bools.contains(&(block, index));
                return Ok(Chain::Place(Place::pointer(pointer, boolean)));
            }
        }
        if let Some((global, index)) = self.lw.per_vertex_member(symbol) {
            let base = self.add(Expression::GlobalVariable(global), at)?;
            let pointer = self.add(Expression::AccessIndex { base, index }, at)?;
            return Ok(Chain::Place(Place::pointer(pointer, false)));
        }
        let global = self.lw.global_ref(symbol, at)?;
        let handle_space = matches!(global, GlobalRef::Variable(handle)
            if self.lw.module.global_variables[handle].space == AddressSpace::Handle);
        let expression = self.lw.global_expression(global);
        let value = self.add(expression, at)?;
        Ok(match global {
            GlobalRef::Variable(_) if !handle_space => Chain::Place(Place::pointer(value, false)),
            _ => Chain::Value(value),
        })
    }

    pub(super) fn constant_index(&self, expression: &AstExpression) -> Option<u32> {
        let info = self.lw.analysis.expression(expression.id)?;
        if !info.is_constant || info.is_specialization {
            return None;
        }
        let value = info.value.as_ref()?.scalar_i64()?;
        u32::try_from(value).ok()
    }

    pub(super) fn spill(
        &mut self,
        value: Handle<Expression>,
        ty: &GlslType,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let local = self.local(ty, None, at)?;
        let pointer = self.local_pointer(local, at)?;
        self.push(Statement::Store { pointer, value }, at);
        self.local_pointer(local, at)
    }

    pub(super) fn chain(&mut self, expression: &AstExpression) -> Result<Chain> {
        let at = self.at(expression.span);
        match expression.kind {
            ExpressionKind::Parenthesized(ref inner) => self.chain(inner),
            ExpressionKind::Variable(_) => self.variable_chain(expression),
            ExpressionKind::Subscript {
                ref base,
                ref index,
            } => {
                let base_ty = self.info(base)?.ty.clone();
                let constant = self.constant_index(index);
                let chain = self.chain(base)?;
                let binding_array = base_ty.is_array() && base_ty.is_opaque();
                match chain {
                    Chain::Place(place) => {
                        if let Some(ref components) = place.swizzle {
                            let component = constant
                                .and_then(|c| components.get(usize::try_from(c).ok()?).copied());
                            return match component {
                                Some(component) => {
                                    let pointer = self.add(
                                        Expression::AccessIndex {
                                            base: place.pointer,
                                            index: component,
                                        },
                                        at,
                                    )?;
                                    Ok(Chain::Place(Place::pointer(pointer, place.boolean)))
                                }
                                None => {
                                    let vector = self.load(&place, at)?;
                                    let index = self.rvalue(index)?;
                                    Ok(Chain::Value(self.add(
                                        Expression::Access {
                                            base: vector,
                                            index,
                                        },
                                        at,
                                    )?))
                                }
                            };
                        }
                        let pointer = match constant {
                            Some(index) => self.add(
                                Expression::AccessIndex {
                                    base: place.pointer,
                                    index,
                                },
                                at,
                            )?,
                            None => {
                                let index = self.rvalue(index)?;
                                self.add(
                                    Expression::Access {
                                        base: place.pointer,
                                        index,
                                    },
                                    at,
                                )?
                            }
                        };
                        Ok(Chain::Place(Place::pointer(pointer, place.boolean)))
                    }
                    Chain::Value(value) => match constant {
                        Some(index) => Ok(Chain::Value(
                            self.add(Expression::AccessIndex { base: value, index }, at)?,
                        )),
                        None => {
                            let index = self.rvalue(index)?;
                            if base_ty.is_vector() || binding_array {
                                Ok(Chain::Value(
                                    self.add(Expression::Access { base: value, index }, at)?,
                                ))
                            } else {
                                let pointer = self.spill(value, &base_ty, at)?;
                                let pointer = self.add(
                                    Expression::Access {
                                        base: pointer,
                                        index,
                                    },
                                    at,
                                )?;
                                Ok(Chain::Place(Place::pointer(pointer, false)))
                            }
                        }
                    },
                }
            }
            ExpressionKind::FieldSelection {
                ref base,
                ref field,
            } => {
                let base_ty = self.info(base)?.ty.clone();
                match base_ty.kind {
                    TypeKind::Scalar(_) | TypeKind::Vector { .. } if !base_ty.is_array() => {
                        let indices = swizzle_indices(&field.node);
                        let scalar_base = base_ty.is_scalar();
                        match self.chain(base)? {
                            Chain::Place(place) => {
                                let composed: Vec<u32> = match place.swizzle {
                                    Some(ref outer) => indices
                                        .iter()
                                        .map(|index| {
                                            outer.get(usize::try_from(*index).ok()?).copied()
                                        })
                                        .collect::<Option<Vec<_>>>()
                                        .ok_or_else(|| internal(at))?,
                                    None => indices,
                                };
                                if scalar_base {
                                    if composed.len() == 1 {
                                        return Ok(Chain::Place(place));
                                    }
                                    let value = self.load(&place, at)?;
                                    return self.swizzle_value(value, &composed, true, at);
                                }
                                match *composed.as_slice() {
                                    [single] => {
                                        let pointer = self.add(
                                            Expression::AccessIndex {
                                                base: place.pointer,
                                                index: single,
                                            },
                                            at,
                                        )?;
                                        Ok(Chain::Place(Place::pointer(pointer, place.boolean)))
                                    }
                                    _ => Ok(Chain::Place(Place {
                                        pointer: place.pointer,
                                        swizzle: Some(composed),
                                        boolean: place.boolean,
                                    })),
                                }
                            }
                            Chain::Value(value) => {
                                self.swizzle_value(value, &indices, scalar_base, at)
                            }
                        }
                    }
                    TypeKind::Struct(_) | TypeKind::Block(_) if !base_ty.is_array() => {
                        let analysis = self.lw.analysis;
                        let (index, block) = match base_ty.kind {
                            TypeKind::Struct(id) => (
                                analysis
                                    .types
                                    .structure(id)
                                    .and_then(|s| s.member(&field.node))
                                    .map(|(index, _)| index),
                                None,
                            ),
                            TypeKind::Block(id) => (
                                analysis
                                    .types
                                    .block(id)
                                    .and_then(|b| b.member(&field.node))
                                    .map(|(index, _)| index),
                                Some(id),
                            ),
                            _ => (None, None),
                        };
                        let index = index
                            .and_then(|index| u32::try_from(index).ok())
                            .ok_or_else(|| internal(at))?;
                        let boolean = block
                            .is_some_and(|block| self.lw.block_bools.contains(&(block, index)));
                        match self.chain(base)? {
                            Chain::Place(place) => {
                                let pointer = self.add(
                                    Expression::AccessIndex {
                                        base: place.pointer,
                                        index,
                                    },
                                    at,
                                )?;
                                Ok(Chain::Place(Place::pointer(pointer, boolean)))
                            }
                            Chain::Value(value) => Ok(Chain::Value(
                                self.add(Expression::AccessIndex { base: value, index }, at)?,
                            )),
                        }
                    }
                    _ => Err(internal(at)),
                }
            }
            _ => Ok(Chain::Value(self.rvalue(expression)?)),
        }
    }

    fn swizzle_value(
        &mut self,
        value: Handle<Expression>,
        indices: &[u32],
        scalar_base: bool,
        at: Span,
    ) -> Result<Chain> {
        if scalar_base {
            return match vector_size(u8::try_from(indices.len()).unwrap_or(0)) {
                Some(size) => Ok(Chain::Value(
                    self.add(Expression::Splat { size, value }, at)?,
                )),
                None => Ok(Chain::Value(value)),
            };
        }
        match *indices {
            [single] => Ok(Chain::Value(self.add(
                Expression::AccessIndex {
                    base: value,
                    index: single,
                },
                at,
            )?)),
            _ => {
                let size = vector_size(u8::try_from(indices.len()).unwrap_or(0))
                    .ok_or_else(|| internal(at))?;
                Ok(Chain::Value(self.add(
                    Expression::Swizzle {
                        size,
                        vector: value,
                        pattern: pattern(indices),
                    },
                    at,
                )?))
            }
        }
    }

    pub(super) fn load(&mut self, place: &Place, at: Span) -> Result<Handle<Expression>> {
        let mut value = self.add(
            Expression::Load {
                pointer: place.pointer,
            },
            at,
        )?;
        if let Some(ref components) = place.swizzle {
            let size = vector_size(u8::try_from(components.len()).unwrap_or(0))
                .ok_or_else(|| internal(at))?;
            value = self.add(
                Expression::Swizzle {
                    size,
                    vector: value,
                    pattern: pattern(components),
                },
                at,
            )?;
        }
        if place.boolean {
            value = self.as_kind(value, crate::Scalar::BOOL, at)?;
        }
        Ok(value)
    }

    pub(super) fn store(
        &mut self,
        place: &Place,
        value: Handle<Expression>,
        at: Span,
    ) -> Result<()> {
        let value = if place.boolean {
            self.as_kind(value, crate::Scalar::U32, at)?
        } else {
            value
        };
        match place.swizzle {
            Some(ref components) => {
                for (position, component) in (0_u32..).zip(components) {
                    let pointer = self.add(
                        Expression::AccessIndex {
                            base: place.pointer,
                            index: *component,
                        },
                        at,
                    )?;
                    let part = self.add(
                        Expression::AccessIndex {
                            base: value,
                            index: position,
                        },
                        at,
                    )?;
                    self.push(
                        Statement::Store {
                            pointer,
                            value: part,
                        },
                        at,
                    );
                }
            }
            None => self.push(
                Statement::Store {
                    pointer: place.pointer,
                    value,
                },
                at,
            ),
        }
        Ok(())
    }

    pub(super) fn splat(
        &mut self,
        value: Handle<Expression>,
        size: u8,
        at: Span,
    ) -> Result<Handle<Expression>> {
        match vector_size(size) {
            Some(size) => self.add(Expression::Splat { size, value }, at),
            None => Ok(value),
        }
    }

    pub(super) fn filled(
        &mut self,
        ty: &GlslType,
        one: Literal,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let value = self.literal(one, at)?;
        match ty.kind {
            TypeKind::Vector { size, .. } => self.splat(value, size, at),
            TypeKind::Matrix { columns, rows, .. } => {
                let column = self.splat(value, rows, at)?;
                let components = (0..columns).map(|_| column).collect();
                let ty = self.lw.ir_type(ty, at)?;
                self.add(Expression::Compose { ty, components }, at)
            }
            _ => Ok(value),
        }
    }

    fn increment(
        &mut self,
        operand: &AstExpression,
        increment: bool,
        postfix: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let ty = self.info(operand)?.ty.clone();
        let place = self.place(operand)?;
        let old = self.load(&place, at)?;
        let base = ty.base_scalar().ok_or_else(|| internal(at))?;
        let one = Literal::one(scalar(base)).ok_or_else(|| internal(at))?;
        let one = self.filled(&ty, one, at)?;
        let op = if increment {
            BinaryOperator::Add
        } else {
            BinaryOperator::Subtract
        };
        let new = self.add(
            Expression::Binary {
                op,
                left: old,
                right: one,
            },
            at,
        )?;
        self.store(&place, new, at)?;
        Ok(if postfix { old } else { new })
    }

    fn unary(
        &mut self,
        operator: AstUnary,
        operand: &AstExpression,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let (value, ty) = self.typed(operand)?;
        match operator {
            AstUnary::Plus => Ok(value),
            AstUnary::Minus => {
                let base = ty.base_scalar().ok_or_else(|| internal(at))?;
                match ty.kind {
                    TypeKind::Matrix { .. } => {
                        let minus = Literal::minus_one(scalar(base)).ok_or_else(|| internal(at))?;
                        let minus = self.literal(minus, at)?;
                        self.add(
                            Expression::Binary {
                                op: BinaryOperator::Multiply,
                                left: minus,
                                right: value,
                            },
                            at,
                        )
                    }
                    _ if base == GlslScalar::Uint => {
                        let zero = Literal::zero(crate::Scalar::U32).ok_or_else(|| internal(at))?;
                        let zero = self.filled(&ty, zero, at)?;
                        self.add(
                            Expression::Binary {
                                op: BinaryOperator::Subtract,
                                left: zero,
                                right: value,
                            },
                            at,
                        )
                    }
                    _ => self.add(
                        Expression::Unary {
                            op: UnaryOperator::Negate,
                            expr: value,
                        },
                        at,
                    ),
                }
            }
            AstUnary::LogicalNot => self.add(
                Expression::Unary {
                    op: UnaryOperator::LogicalNot,
                    expr: value,
                },
                at,
            ),
            AstUnary::BitNot => self.add(
                Expression::Unary {
                    op: UnaryOperator::BitwiseNot,
                    expr: value,
                },
                at,
            ),
            AstUnary::Increment | AstUnary::Decrement => Err(internal(at)),
        }
    }

    pub(super) fn pure(&self, expression: &AstExpression) -> bool {
        match expression.kind {
            ExpressionKind::Variable(_) | ExpressionKind::Number(_) | ExpressionKind::Bool(_) => {
                true
            }
            ExpressionKind::Parenthesized(ref inner) => self.pure(inner),
            ExpressionKind::Subscript {
                ref base,
                ref index,
            } => self.constant_index(index).is_some() && self.pure(base),
            ExpressionKind::FieldSelection { ref base, .. } => self.pure(base),
            ExpressionKind::FunctionCall(ref call) => {
                match self.lw.analysis.calls.get(&expression.id) {
                    Some(&Callee::Constructor(_)) => call.arguments.iter().all(|a| self.pure(a)),
                    Some(&Callee::Length) => match call.function.node {
                        rglsl_ast::ast::FunctionIdentifier::Method { ref object, .. } => {
                            self.pure(object)
                        }
                        _ => false,
                    },
                    _ => false,
                }
            }
            ExpressionKind::Unary {
                operator,
                ref operand,
            } => {
                !matches!(operator, AstUnary::Increment | AstUnary::Decrement) && self.pure(operand)
            }
            ExpressionKind::Binary {
                ref left,
                ref right,
                ..
            } => self.pure(left) && self.pure(right),
            ExpressionKind::Conditional {
                ref condition,
                ref then_expression,
                ref else_expression,
            } => self.pure(condition) && self.pure(then_expression) && self.pure(else_expression),
            ExpressionKind::Postfix { .. } | ExpressionKind::Assignment { .. } => false,
            ExpressionKind::Sequence(ref list) => list.iter().all(|e| self.pure(e)),
        }
    }

    fn conditional(
        &mut self,
        ty: &GlslType,
        condition: &AstExpression,
        accept: &AstExpression,
        reject: &AstExpression,
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let condition = self.rvalue(condition)?;
        if ty.is_void() {
            let accept = self.nested(|this| this.effect(accept))?;
            let reject = self.nested(|this| this.effect(reject))?;
            self.push(
                Statement::If {
                    condition,
                    accept,
                    reject,
                },
                at,
            );
            return Ok(None);
        }
        if (ty.is_scalar() || ty.is_vector()) && self.pure(accept) && self.pure(reject) {
            let accept = self.rvalue(accept)?;
            let reject = self.rvalue(reject)?;
            return self
                .add(
                    Expression::Select {
                        condition,
                        accept,
                        reject,
                    },
                    at,
                )
                .map(Some);
        }
        let local = self.local(ty, None, at)?;
        let accept = self.nested(|this| {
            let value = this.rvalue(accept)?;
            let pointer = this.local_pointer(local, at)?;
            this.push(Statement::Store { pointer, value }, at);
            Ok(())
        })?;
        let reject = self.nested(|this| {
            let value = this.rvalue(reject)?;
            let pointer = this.local_pointer(local, at)?;
            this.push(Statement::Store { pointer, value }, at);
            Ok(())
        })?;
        self.push(
            Statement::If {
                condition,
                accept,
                reject,
            },
            at,
        );
        let pointer = self.local_pointer(local, at)?;
        self.add(Expression::Load { pointer }, at).map(Some)
    }

    fn assignment(
        &mut self,
        operator: AssignmentOperator,
        target: &AstExpression,
        value: &AstExpression,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let target_ty = self.info(target)?.ty.clone();
        let place = self.place(target)?;
        let result = match compound(operator) {
            None => self.rvalue(value)?,
            Some(operator) => {
                let old = self.load(&place, at)?;
                let (right, right_ty) = self.typed(value)?;
                self.binary(operator, (old, &target_ty), (right, &right_ty), at)?
            }
        };
        self.store(&place, result, at)?;
        Ok(result)
    }

    fn binary_expression(
        &mut self,
        operator: AstBinary,
        left: &AstExpression,
        right: &AstExpression,
        at: Span,
    ) -> Result<Handle<Expression>> {
        if matches!(operator, AstBinary::LogicalAnd | AstBinary::LogicalOr) && !self.pure(right) {
            let left = self.rvalue(left)?;
            let local = self.local(&GlslType::BOOL, None, at)?;
            let pointer = self.local_pointer(local, at)?;
            self.push(
                Statement::Store {
                    pointer,
                    value: left,
                },
                at,
            );
            let rest = self.nested(|this| {
                let value = this.rvalue(right)?;
                let pointer = this.local_pointer(local, at)?;
                this.push(Statement::Store { pointer, value }, at);
                Ok(())
            })?;
            let (accept, reject) = if operator == AstBinary::LogicalAnd {
                (rest, crate::Block::new())
            } else {
                (crate::Block::new(), rest)
            };
            self.push(
                Statement::If {
                    condition: left,
                    accept,
                    reject,
                },
                at,
            );
            let pointer = self.local_pointer(local, at)?;
            return self.add(Expression::Load { pointer }, at);
        }
        let (left, left_ty) = self.typed(left)?;
        let (right, right_ty) = self.typed(right)?;
        self.binary(operator, (left, &left_ty), (right, &right_ty), at)
    }

    fn equality(
        &mut self,
        left: Handle<Expression>,
        right: Handle<Expression>,
        ty: &GlslType,
        equal: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let (op, combine, reduce) = if equal {
            (
                BinaryOperator::Equal,
                BinaryOperator::LogicalAnd,
                RelationalFunction::All,
            )
        } else {
            (
                BinaryOperator::NotEqual,
                BinaryOperator::LogicalOr,
                RelationalFunction::Any,
            )
        };
        let parts: Vec<GlslType> = if ty.is_array() {
            let element = ty.element_type().ok_or_else(|| internal(at))?;
            let length = ty
                .length()
                .ok_or_else(|| unsupported("comparing runtime-sized arrays", at))?;
            (0..length).map(|_| element.clone()).collect()
        } else {
            match ty.kind {
                TypeKind::Scalar(_) => {
                    return self.add(Expression::Binary { op, left, right }, at);
                }
                TypeKind::Vector { .. } => {
                    let argument = self.add(Expression::Binary { op, left, right }, at)?;
                    return self.add(
                        Expression::Relational {
                            fun: reduce,
                            argument,
                        },
                        at,
                    );
                }
                TypeKind::Matrix { columns, .. } => {
                    let column = ty.column_type().ok_or_else(|| internal(at))?;
                    (0..columns).map(|_| column.clone()).collect()
                }
                TypeKind::Struct(id) => self
                    .lw
                    .analysis
                    .types
                    .structure(id)
                    .ok_or_else(|| internal(at))?
                    .members
                    .iter()
                    .map(|member| member.ty.clone())
                    .collect(),
                _ => return Err(internal(at)),
            }
        };
        let mut result = None;
        for (index, part) in (0_u32..).zip(&parts) {
            let l = self.add(Expression::AccessIndex { base: left, index }, at)?;
            let r = self.add(Expression::AccessIndex { base: right, index }, at)?;
            let compared = self.equality(l, r, part, equal, at)?;
            result = Some(match result {
                None => compared,
                Some(previous) => self.add(
                    Expression::Binary {
                        op: combine,
                        left: previous,
                        right: compared,
                    },
                    at,
                )?,
            });
        }
        result.ok_or_else(|| internal(at))
    }

    fn columns(
        &mut self,
        op: BinaryOperator,
        matrix_ty: &GlslType,
        left: (Handle<Expression>, bool),
        right: (Handle<Expression>, bool),
        at: Span,
    ) -> Result<Handle<Expression>> {
        let TypeKind::Matrix { columns, rows, .. } = matrix_ty.kind else {
            return Err(internal(at));
        };
        let mut components = Vec::with_capacity(usize::from(columns));
        let operand = |this: &mut Self, (value, is_matrix): (Handle<Expression>, bool), index| {
            if is_matrix {
                this.add(Expression::AccessIndex { base: value, index }, at)
            } else {
                this.splat(value, rows, at)
            }
        };
        for index in 0..u32::from(columns) {
            let l = operand(self, left, index)?;
            let r = operand(self, right, index)?;
            components.push(self.add(
                Expression::Binary {
                    op,
                    left: l,
                    right: r,
                },
                at,
            )?);
        }
        let ty = self.lw.ir_type(matrix_ty, at)?;
        self.add(Expression::Compose { ty, components }, at)
    }

    pub(super) fn binary(
        &mut self,
        operator: AstBinary,
        (left, left_ty): (Handle<Expression>, &GlslType),
        (right, right_ty): (Handle<Expression>, &GlslType),
        at: Span,
    ) -> Result<Handle<Expression>> {
        let op = match operator {
            AstBinary::Equal | AstBinary::NotEqual => {
                return self.equality(left, right, left_ty, operator == AstBinary::Equal, at);
            }
            AstBinary::LogicalXor => BinaryOperator::NotEqual,
            AstBinary::LogicalAnd => BinaryOperator::LogicalAnd,
            AstBinary::LogicalOr => BinaryOperator::LogicalOr,
            AstBinary::Less => BinaryOperator::Less,
            AstBinary::Greater => BinaryOperator::Greater,
            AstBinary::LessEqual => BinaryOperator::LessEqual,
            AstBinary::GreaterEqual => BinaryOperator::GreaterEqual,
            AstBinary::ShiftLeft | AstBinary::ShiftRight => {
                let op = if operator == AstBinary::ShiftLeft {
                    BinaryOperator::ShiftLeft
                } else {
                    BinaryOperator::ShiftRight
                };
                let mut right = right;
                if right_ty.base_scalar() != Some(GlslScalar::Uint) {
                    right = self.as_kind(right, crate::Scalar::U32, at)?;
                }
                if let (TypeKind::Vector { size, .. }, true) = (left_ty.kind, right_ty.is_scalar())
                {
                    right = self.splat(right, size, at)?;
                }
                return self.add(Expression::Binary { op, left, right }, at);
            }
            AstBinary::Multiply => BinaryOperator::Multiply,
            AstBinary::Divide => BinaryOperator::Divide,
            AstBinary::Modulo => BinaryOperator::Modulo,
            AstBinary::Add => BinaryOperator::Add,
            AstBinary::Subtract => BinaryOperator::Subtract,
            AstBinary::BitAnd => BinaryOperator::And,
            AstBinary::BitXor => BinaryOperator::ExclusiveOr,
            AstBinary::BitOr => BinaryOperator::InclusiveOr,
        };
        let left_matrix = left_ty.is_matrix();
        let right_matrix = right_ty.is_matrix();
        if left_matrix || right_matrix {
            let linear = op == BinaryOperator::Multiply
                && !(left_ty.is_scalar() || right_ty.is_scalar())
                || op == BinaryOperator::Multiply && (left_ty.is_scalar() || right_ty.is_scalar());
            if linear || (left_matrix && right_matrix && op != BinaryOperator::Divide) {
                return self.add(Expression::Binary { op, left, right }, at);
            }
            let matrix_ty = if left_matrix { left_ty } else { right_ty };
            return self.columns(
                op,
                matrix_ty,
                (left, left_matrix),
                (right, right_matrix),
                at,
            );
        }
        let (mut left, mut right) = (left, right);
        if op != BinaryOperator::Multiply {
            match (left_ty.kind, right_ty.kind) {
                (TypeKind::Vector { size, .. }, TypeKind::Scalar(_)) => {
                    right = self.splat(right, size, at)?;
                }
                (TypeKind::Scalar(_), TypeKind::Vector { size, .. }) => {
                    left = self.splat(left, size, at)?;
                }
                _ => {}
            }
        }
        self.add(Expression::Binary { op, left, right }, at)
    }

    pub(super) fn initializer(
        &mut self,
        initializer: &Spanned<Initializer>,
        ty: &GlslType,
    ) -> Result<Handle<Expression>> {
        let at = self.at(initializer.span);
        match initializer.node {
            Initializer::Expression(ref expression) => {
                let (value, from) = self.typed(expression)?;
                if from.array.len() == ty.array.len() && from.kind == ty.kind {
                    return Ok(value);
                }
                self.convert(value, &from, ty, at)
            }
            Initializer::List(ref items) => {
                let elements: Vec<GlslType> =
                    if let Some(element) = ty.element_type().filter(|_| ty.is_array()) {
                        items.iter().map(|_| element.clone()).collect()
                    } else {
                        match ty.kind {
                            TypeKind::Struct(id) => self
                                .lw
                                .analysis
                                .types
                                .structure(id)
                                .ok_or_else(|| internal(at))?
                                .members
                                .iter()
                                .map(|member| member.ty.clone())
                                .collect(),
                            TypeKind::Vector { .. } | TypeKind::Matrix { .. } => {
                                let element = ty.element_type().ok_or_else(|| internal(at))?;
                                items.iter().map(|_| element.clone()).collect()
                            }
                            _ => return Err(internal(at)),
                        }
                    };
                let mut components = Vec::with_capacity(items.len());
                for (item, element) in items.iter().zip(&elements) {
                    components.push(self.initializer(item, element)?);
                }
                let ty = self.lw.ir_type(ty, at)?;
                self.add(Expression::Compose { ty, components }, at)
            }
        }
    }
}
