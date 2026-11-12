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
    AddressSpace, BinaryOperator, Expression, Handle, Literal, NonUniform, RelationalFunction,
    Span, Statement, SwizzleComponent, UnaryOperator,
};

#[derive(Clone, Debug)]
pub(super) struct Place {
    pub pointer: Handle<Expression>,
    pub swizzle: Option<Vec<u32>>,
    pub boolean: bool,
    pub non_uniform: bool,
    pub spilled: bool,
}

impl Place {
    const fn pointer(pointer: Handle<Expression>, boolean: bool) -> Self {
        Self {
            pointer,
            swizzle: None,
            boolean,
            non_uniform: false,
            spilled: false,
        }
    }

    fn child(&self, pointer: Handle<Expression>, boolean: bool) -> Self {
        Self {
            spilled: self.spilled,
            ..Self::pointer(pointer, boolean)
        }
    }
}

#[derive(Clone)]
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

pub(super) fn pattern(indices: &[u32]) -> [SwizzleComponent; 4] {
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

pub(super) const fn compound(operator: AssignmentOperator) -> Option<AstBinary> {
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
    pub(super) fn typed(
        &mut self,
        expression: &AstExpression,
    ) -> Result<(Handle<Expression>, GlslType)> {
        super::function::on_heap!(self, |cx| cx.typed(expression))
    }

    pub(super) fn rvalue(&mut self, expression: &AstExpression) -> Result<Handle<Expression>> {
        super::function::on_heap!(self, |cx| cx.rvalue(expression))
    }

    fn relayout(
        &mut self,
        value: Handle<Expression>,
        from: Handle<crate::Type>,
        to: Handle<crate::Type>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        super::function::on_heap!(self, |cx| cx.relayout(value, from, to, at))
    }

    pub(super) fn initializer(
        &mut self,
        initializer: &Spanned<Initializer>,
        ty: &GlslType,
    ) -> Result<Handle<Expression>> {
        super::function::on_heap!(self, |cx| cx.initializer(initializer, ty.clone()))
    }

    fn equality(
        &mut self,
        left: Handle<Expression>,
        right: Handle<Expression>,
        ty: &GlslType,
        equal: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        super::function::on_heap!(self, |cx| cx.equality(left, right, ty.clone(), equal, at))
    }

    fn convert_booleans(
        &mut self,
        value: Handle<Expression>,
        integer: Handle<crate::Type>,
        to_bool: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        super::function::on_heap!(self, |cx| cx.convert_booleans(value, integer, to_bool, at))
    }

    pub(super) fn constant(
        &mut self,
        ty: &GlslType,
        values: &[Value],
        at: Span,
    ) -> Result<Handle<Expression>> {
        super::function::on_heap!(self, |cx| cx.constant(ty.clone(), values, at))
    }

    pub(super) fn heap_pointee(&self, pointer: Handle<Expression>) -> Option<Handle<crate::Type>> {
        let module = &self.lw.module;
        let mut steps = Vec::new();
        let mut current = pointer;
        let root = loop {
            match self.expressions[current] {
                Expression::GlobalVariable(handle) => {
                    let global = &module.global_variables[handle];
                    break match global.space {
                        AddressSpace::DescriptorHeap(_) => Some(global.ty),
                        _ => None,
                    };
                }
                Expression::HeapOffset { pointer, .. } => current = pointer,
                Expression::AccessIndex { base, index } => {
                    steps.push(Some(index));
                    current = base;
                }
                Expression::Access { base, .. } => {
                    steps.push(None);
                    current = base;
                }
                _ => break None,
            }
        };
        let element = |ty: Handle<crate::Type>| match module.types[ty].inner {
            crate::TypeInner::Array { base, .. } => Some(base),
            _ => None,
        };
        steps
            .into_iter()
            .rev()
            .try_fold(root?, |ty, step| match step {
                Some(index) => match module.types[ty].inner {
                    crate::TypeInner::Struct { ref members, .. } => usize::try_from(index)
                        .ok()
                        .and_then(|index| members.get(index))
                        .map(|member| member.ty),
                    _ => element(ty),
                },
                None => element(ty),
            })
    }

    pub(super) fn buffer_pointee(
        &self,
        pointer: Handle<Expression>,
    ) -> Option<Handle<crate::Type>> {
        let module = &self.lw.module;
        let mut steps = Vec::new();
        let mut current = pointer;
        let root = loop {
            match self.expressions[current] {
                Expression::GlobalVariable(handle) => {
                    let global = &module.global_variables[handle];
                    break match global.space {
                        AddressSpace::Uniform
                        | AddressSpace::Storage { .. }
                        | AddressSpace::Immediate => Some(global.ty),
                        _ => None,
                    };
                }
                Expression::AccessIndex { base, index } => {
                    steps.push(Some(index));
                    current = base;
                }
                Expression::Access { base, .. } => {
                    steps.push(None);
                    current = base;
                }
                Expression::BufferPointer { descriptor } => {
                    break self.heap_pointee(descriptor).and_then(|descriptor| {
                        match module.types[descriptor].inner {
                            crate::TypeInner::BufferDescriptor { base, .. } => Some(base),
                            _ => None,
                        }
                    });
                }
                Expression::PhysicalPointer { value, .. }
                    if !self.physical_bases.contains_key(&current) =>
                {
                    current = value;
                }
                _ => break self.physical_bases.get(&current).copied(),
            }
        };
        let element = |ty: Handle<crate::Type>| match module.types[ty].inner {
            crate::TypeInner::Array { base, .. } | crate::TypeInner::BindingArray { base, .. } => {
                Some(base)
            }
            _ => None,
        };
        steps
            .into_iter()
            .rev()
            .try_fold(root?, |ty, step| match step {
                Some(index) => match module.types[ty].inner {
                    crate::TypeInner::Struct { ref members, .. } => usize::try_from(index)
                        .ok()
                        .and_then(|index| members.get(index))
                        .map(|member| member.ty),
                    _ => element(ty),
                },
                None => element(ty),
            })
    }

    pub(super) fn info(&self, expression: &AstExpression) -> Result<&'a ExpressionInfo> {
        let analysis = self.lw.analysis;
        analysis
            .expression(expression.id)
            .ok_or_else(|| internal(self.at(expression.span)))
    }

    pub(super) fn typed_value(
        &mut self,
        expression: &AstExpression,
        value: Option<Handle<Expression>>,
    ) -> Result<(Handle<Expression>, GlslType)> {
        let at = self.at(expression.span);
        let info = self.info(expression)?;
        let value = value.ok_or_else(|| semantic("a `void` value is used", at))?;
        match info.conversion {
            Some(ref target) if *target != info.ty => {
                let converted = self.convert(value, &info.ty, target, at)?;
                if self
                    .lw
                    .analysis
                    .relaxed_precision
                    .conversions
                    .contains(&expression.id)
                {
                    self.mark_precision(converted, crate::Precision::RELAXED);
                }
                Ok((converted, target.clone()))
            }
            _ => Ok((value, info.ty.clone())),
        }
    }

    pub(super) fn literal(&mut self, literal: Literal, at: Span) -> Result<Handle<Expression>> {
        self.add(Expression::Literal(literal), at)
    }

    pub(super) fn flagged(
        &mut self,
        expression: &AstExpression,
        value: Option<Handle<Expression>>,
    ) -> Result<Option<Handle<Expression>>> {
        let analysis = self.lw.analysis;
        let mut flags = crate::Precision::empty();
        if analysis.no_contraction.contains(&expression.id) {
            flags |= crate::Precision::NO_CONTRACTION;
        }
        let relaxed = analysis.relaxed_precision.results.contains(&expression.id);
        if relaxed {
            flags |= crate::Precision::RELAXED;
        }
        if flags.is_empty() {
            return Ok(value);
        }
        let operation = match expression.kind {
            ExpressionKind::Postfix { .. }
            | ExpressionKind::Unary {
                operator: AstUnary::Increment | AstUnary::Decrement,
                ..
            } => self.stepped.take(),
            ExpressionKind::Assignment {
                operator: AssignmentOperator::Assign,
                ..
            }
            | ExpressionKind::Conditional { .. }
            | ExpressionKind::Sequence(_)
            | ExpressionKind::Parenthesized(_) => None,
            _ => value,
        };
        if let Some(operation) = operation {
            let columnwise = matches!(
                expression.kind,
                ExpressionKind::Binary { .. }
                    | ExpressionKind::Unary { .. }
                    | ExpressionKind::Assignment { .. }
            );
            if columnwise {
                self.mark_column_precision(operation, flags);
            }
            let flags = if columnwise
                && matches!(self.expressions[operation], Expression::Compose { .. })
            {
                flags - crate::Precision::NO_CONTRACTION
            } else {
                flags
            };
            self.mark_precision(operation, flags);
            if relaxed {
                if let Expression::Swizzle { vector, .. } = self.expressions[operation] {
                    if matches!(self.expressions[vector], Expression::Load { .. }) {
                        self.mark_precision(vector, crate::Precision::RELAXED);
                    }
                }
            }
        }
        Ok(value)
    }

    pub(super) fn folded_value(
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
        } else if info.is_constant && !info.ty.contains_reference(&self.lw.analysis.types) {
            if let Some(ref value) = info.value {
                return self.constant(&info.ty, &value.values, at).map(Some);
            }
        }
        Ok(None)
    }

    fn chain_loaded(
        &mut self,
        expression: &AstExpression,
        chain: Chain,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let value = match chain {
            Chain::Place(place) => self.load(&place, at)?,
            Chain::Value(value) => value,
        };
        if self.info(expression)?.ty.is_reference() {
            self.unqualify(value, at)
        } else {
            Ok(value)
        }
    }

    fn mark_column_precision(&mut self, value: Handle<Expression>, flags: crate::Precision) {
        let Expression::Compose { ref components, .. } = self.expressions[value] else {
            return;
        };
        let columns: Vec<Handle<Expression>> = components
            .iter()
            .copied()
            .filter(|&part| {
                matches!(
                    self.expressions[part],
                    Expression::Binary { .. } | Expression::Unary { .. }
                )
            })
            .collect();
        for column in columns {
            self.mark_precision(column, flags);
        }
    }

    pub(super) fn mark_operation(&mut self, value: Handle<Expression>) {
        match self.expressions[value] {
            Expression::Binary { .. }
            | Expression::Unary { .. }
            | Expression::Relational { .. } => {
                self.mark(value, NonUniform::VALUE);
            }
            Expression::Compose { ref components, .. } => {
                let parts: Vec<Handle<Expression>> = components
                    .iter()
                    .copied()
                    .filter(|&part| matches!(self.expressions[part], Expression::Binary { .. }))
                    .collect();
                for part in parts {
                    self.mark(part, NonUniform::VALUE);
                }
                self.mark(value, NonUniform::VALUE);
            }
            _ => {}
        }
    }

    pub(super) fn as_kind(
        &mut self,
        value: Handle<Expression>,
        target: crate::Scalar,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let expression = Expression::As {
            expr: value,
            kind: target.kind,
            convert: Some(target.width),
        };
        if self.lw.folds_conversions_to(target) {
            self.add(expression, at)
        } else {
            Ok(self.unemitted(expression, at))
        }
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

    fn wide_index(&self, base_ty: &GlslType, index: &AstExpression) -> Result<bool> {
        let scalar = self.info(index)?.ty.scalar_type();
        Ok(!base_ty.is_vector()
            && (scalar.is_some_and(|scalar| scalar.bits() == 64)
                || (self.lw.analysis.promote_uint32_indices && scalar == Some(GlslScalar::Uint))))
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

    pub(super) fn chain_marked(
        &mut self,
        expression: &AstExpression,
        chain: Chain,
    ) -> Result<Chain> {
        let non_uniform = self.info(expression)?.non_uniform;
        Ok(match chain {
            Chain::Place(mut place) => {
                place.non_uniform = non_uniform && !place.spilled;
                Chain::Place(place)
            }
            Chain::Value(value) => {
                if non_uniform {
                    self.mark_value(value);
                }
                Chain::Value(value)
            }
        })
    }

    pub(super) fn mark_value(&mut self, value: Handle<Expression>) {
        let decorated = match self.expressions[value] {
            Expression::Literal(_)
            | Expression::Constant(_)
            | Expression::Override(_)
            | Expression::ZeroValue(_)
            | Expression::GlobalVariable(_)
            | Expression::LocalVariable(_) => false,
            Expression::AccessIndex { base, .. } => self.is_binding_array(base),
            _ => true,
        };
        if decorated {
            self.mark(value, NonUniform::VALUE);
        }
    }

    fn is_binding_array(&self, base: Handle<Expression>) -> bool {
        let Expression::GlobalVariable(global) = self.expressions[base] else {
            return false;
        };
        let ty = self.lw.module.global_variables[global].ty;
        matches!(
            self.lw.module.types[ty].inner,
            crate::TypeInner::BindingArray { .. }
        )
    }

    fn inherit_access(
        &mut self,
        pointer: Handle<Expression>,
        base: Handle<Expression>,
        index: bool,
    ) {
        let own = if index {
            NonUniform::ACCESS
        } else {
            NonUniform::empty()
        };
        let flags = (self.marked(base) & NonUniform::ACCESS) | own;
        self.mark(pointer, flags);
    }

    fn subscript_access(
        &mut self,
        chain: Chain,
        base: &AstExpression,
        index: &AstExpression,
        index_value: Option<Handle<Expression>>,
        constant: Option<u32>,
        at: Span,
    ) -> Result<Chain> {
        let base_ty = &self.info(base)?.ty;
        let index_non_uniform = self.info(index)?.non_uniform;
        let binding_array = base_ty.is_array() && base_ty.is_opaque();
        match chain {
            Chain::Place(place) => {
                if let Some(ref components) = place.swizzle {
                    let component =
                        constant.and_then(|c| components.get(usize::try_from(c).ok()?).copied());
                    return match component {
                        Some(component) => {
                            let pointer = self.add(
                                Expression::AccessIndex {
                                    base: place.pointer,
                                    index: component,
                                },
                                at,
                            )?;
                            self.inherit_access(pointer, place.pointer, false);
                            Ok(Chain::Place(place.child(pointer, place.boolean)))
                        }
                        None => {
                            let vector = self.load(&place, at)?;
                            let index = index_value.ok_or_else(|| internal(at))?;
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
                let (pointer, dynamic) = match constant {
                    Some(index) => (
                        self.add(
                            Expression::AccessIndex {
                                base: place.pointer,
                                index,
                            },
                            at,
                        )?,
                        false,
                    ),
                    None => {
                        let index = index_value.ok_or_else(|| internal(at))?;
                        (
                            self.add(
                                Expression::Access {
                                    base: place.pointer,
                                    index,
                                },
                                at,
                            )?,
                            true,
                        )
                    }
                };
                self.inherit_access(pointer, place.pointer, dynamic && index_non_uniform);
                Ok(Chain::Place(place.child(pointer, place.boolean)))
            }
            Chain::Value(value) => match constant {
                Some(index) => Ok(Chain::Value(
                    self.add(Expression::AccessIndex { base: value, index }, at)?,
                )),
                None => {
                    let index = index_value.ok_or_else(|| internal(at))?;
                    if base_ty.is_vector() || binding_array {
                        let access = self.add(Expression::Access { base: value, index }, at)?;
                        if binding_array && index_non_uniform {
                            self.mark(access, NonUniform::ACCESS);
                        }
                        Ok(Chain::Value(access))
                    } else {
                        let pointer = self.spill(value, base_ty, at)?;
                        let pointer = self.add(
                            Expression::Access {
                                base: pointer,
                                index,
                            },
                            at,
                        )?;
                        Ok(Chain::Place(Place {
                            spilled: true,
                            ..Place::pointer(pointer, false)
                        }))
                    }
                }
            },
        }
    }

    pub(super) fn field_chain(
        &mut self,
        chain: Chain,
        base: &AstExpression,
        field: &rglsl_ast::ast::Identifier,
        at: Span,
    ) -> Result<Chain> {
        let base_ty = &self.info(base)?.ty;
        match base_ty.kind {
            TypeKind::Scalar(_) | TypeKind::Vector { .. } if !base_ty.is_array() => {
                self.swizzle_chain(chain, base_ty.is_scalar(), field, at)
            }
            TypeKind::Reference(block) if !base_ty.is_array() => {
                let index = self
                    .lw
                    .analysis
                    .types
                    .block(block)
                    .and_then(|b| b.member(&field.node))
                    .and_then(|(index, _)| u32::try_from(index).ok())
                    .ok_or_else(|| internal(at))?;
                self.reference_member(chain, block, index, at)
            }
            TypeKind::Struct(_) | TypeKind::Block(_) if !base_ty.is_array() => {
                let (block, index, flags) = self.member_info(base_ty, field, at)?;
                self.member_access(chain, block, index, flags, at)
            }
            _ => Err(internal(at)),
        }
    }

    fn swizzle_chain(
        &mut self,
        chain: Chain,
        scalar_base: bool,
        field: &rglsl_ast::ast::Identifier,
        at: Span,
    ) -> Result<Chain> {
        let indices = swizzle_indices(&field.node);
        match chain {
            Chain::Place(place) => {
                let composed: Vec<u32> = match place.swizzle {
                    Some(ref outer) => indices
                        .iter()
                        .map(|index| outer.get(usize::try_from(*index).ok()?).copied())
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
                        self.inherit_access(pointer, place.pointer, false);
                        Ok(Chain::Place(place.child(pointer, place.boolean)))
                    }
                    _ => Ok(Chain::Place(Place {
                        pointer: place.pointer,
                        swizzle: Some(composed),
                        boolean: place.boolean,
                        non_uniform: false,
                        spilled: place.spilled,
                    })),
                }
            }
            Chain::Value(value) => self.swizzle_value(value, &indices, scalar_base, at),
        }
    }

    fn member_info(
        &self,
        base_ty: &GlslType,
        field: &rglsl_ast::ast::Identifier,
        at: Span,
    ) -> Result<(Option<rglsl_sema::types::BlockId>, u32, [bool; 2])> {
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
        let nested_boolean = match base_ty.kind {
            TypeKind::Struct(id) => analysis
                .types
                .structure(id)
                .and_then(|s| s.members.get(usize::try_from(index).ok()?))
                .is_some_and(|member| {
                    matches!(
                        member.ty.kind,
                        TypeKind::Scalar(rglsl_sema::types::Scalar::Bool)
                            | TypeKind::Vector {
                                scalar: rglsl_sema::types::Scalar::Bool,
                                ..
                            }
                    )
                }),
            _ => false,
        };
        let boolean = block.is_some_and(|block| self.lw.block_bools.contains(&(block, index)));
        Ok((block, index, [boolean, nested_boolean]))
    }

    fn member_access(
        &mut self,
        chain: Chain,
        block: Option<rglsl_sema::types::BlockId>,
        index: u32,
        [boolean, nested_boolean]: [bool; 2],
        at: Span,
    ) -> Result<Chain> {
        let index = block
            .and_then(|block| self.lw.member_indices.get(&(block, index)))
            .copied()
            .unwrap_or(index);
        match chain {
            Chain::Place(place) => {
                let base_pointer = self.buffer_pointer(place.pointer, at)?;
                let pointer = self.add(
                    Expression::AccessIndex {
                        base: base_pointer,
                        index,
                    },
                    at,
                )?;
                self.inherit_access(pointer, base_pointer, false);
                let boolean = boolean || (nested_boolean && self.buffer_pointee(pointer).is_some());
                Ok(Chain::Place(place.child(pointer, boolean)))
            }
            Chain::Value(value) => Ok(Chain::Value(
                self.add(Expression::AccessIndex { base: value, index }, at)?,
            )),
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

    fn buffer_pointer(
        &mut self,
        pointer: Handle<Expression>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let descriptor = self.heap_pointee(pointer).is_some_and(|ty| {
            matches!(
                self.lw.module.types[ty].inner,
                crate::TypeInner::BufferDescriptor { .. }
            )
        });
        if !descriptor {
            return Ok(pointer);
        }
        let buffer = self.add(
            Expression::BufferPointer {
                descriptor: pointer,
            },
            at,
        )?;
        self.inherit_access(buffer, pointer, false);
        Ok(buffer)
    }

    fn laid_out_place(&self, place: &Place) -> Option<(Handle<crate::Type>, Handle<crate::Type>)> {
        if place.swizzle.is_some() {
            return None;
        }
        let laid = self.buffer_pointee(place.pointer)?;
        let plain = self.lw.relayout.get(&laid).copied()?;
        Some((laid, plain))
    }

    pub(super) fn load(&mut self, place: &Place, at: Span) -> Result<Handle<Expression>> {
        let mut value = self.add(
            Expression::Load {
                pointer: place.pointer,
            },
            at,
        )?;
        if place.non_uniform {
            self.mark(value, NonUniform::VALUE);
        }
        if let Some((laid, plain)) = self.laid_out_place(place) {
            value = self.relayout(value, laid, plain, at)?;
        }
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
            if place.non_uniform {
                self.mark(value, NonUniform::VALUE);
            }
        }
        if place.boolean {
            value = match self.boolean_array(place) {
                Some(ty) => self.convert_booleans(value, ty, true, at)?,
                None => self.as_kind(value, crate::Scalar::BOOL, at)?,
            };
        }
        Ok(value)
    }

    fn boolean_array(&self, place: &Place) -> Option<Handle<crate::Type>> {
        if place.swizzle.is_some() {
            return None;
        }
        let laid = self.buffer_pointee(place.pointer)?;
        let ty = self.lw.relayout.get(&laid).copied().unwrap_or(laid);
        matches!(
            self.lw.module.types[ty].inner,
            crate::TypeInner::Array { .. }
        )
        .then_some(ty)
    }

    pub(super) fn store(
        &mut self,
        place: &Place,
        value: Handle<Expression>,
        at: Span,
    ) -> Result<()> {
        let mut value = if place.boolean {
            match self.boolean_array(place) {
                Some(ty) => self.convert_booleans(value, ty, false, at)?,
                None => self.as_kind(value, crate::Scalar::U32, at)?,
            }
        } else {
            value
        };
        if let Some((laid, plain)) = self.laid_out_place(place) {
            value = self.relayout(value, plain, laid, at)?;
        }
        if place.swizzle.is_none() {
            value = self.store_qualified(place.pointer, value, at)?;
        }
        if let Some(ref components) = place.swizzle {
            if let Some(pattern) = self.full_physical_swizzle(place.pointer, components) {
                let size = vector_size(u8::try_from(components.len()).unwrap_or(0))
                    .ok_or_else(|| internal(at))?;
                let previous = self.add(
                    Expression::Load {
                        pointer: place.pointer,
                    },
                    at,
                )?;
                self.unemitted(
                    Expression::Swizzle {
                        size,
                        vector: previous,
                        pattern: [
                            SwizzleComponent::X,
                            SwizzleComponent::Y,
                            SwizzleComponent::Z,
                            SwizzleComponent::W,
                        ],
                    },
                    at,
                );
                let value = self.unemitted(
                    Expression::Swizzle {
                        size,
                        vector: value,
                        pattern,
                    },
                    at,
                );
                self.push(
                    Statement::Store {
                        pointer: place.pointer,
                        value,
                    },
                    at,
                );
                return Ok(());
            }
        }
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
                    self.inherit_access(pointer, place.pointer, false);
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

    pub(super) fn replicate(
        &mut self,
        value: Handle<Expression>,
        like: &GlslType,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let ty = self.lw.ir_type(like, at)?;
        match self.lw.module.types[ty].inner {
            crate::TypeInner::Vector { size, .. } => {
                self.add(Expression::Splat { size, value }, at)
            }
            crate::TypeInner::LongVector { .. } | crate::TypeInner::CooperativeMatrix { .. } => {
                self.add(Expression::Replicate { ty, value }, at)
            }
            crate::TypeInner::Scalar(_) => Ok(value),
            _ => Err(internal(at)),
        }
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
            TypeKind::LongVector { .. }
            | TypeKind::CooperativeVector { .. }
            | TypeKind::CooperativeMatrix(_) => self.replicate(value, ty, at),
            TypeKind::Matrix { columns, rows, .. } => {
                let column = self.splat(value, rows, at)?;
                let components = (0..columns).map(|_| column).collect();
                let ty = self.lw.ir_type(ty, at)?;
                self.add(Expression::Compose { ty, components }, at)
            }
            _ => Ok(value),
        }
    }

    fn relax_load(&mut self, place: &AstExpression, load: Handle<Expression>) {
        if self
            .lw
            .analysis
            .relaxed_precision
            .results
            .contains(&super::prepass::strip(place).id)
        {
            self.mark_precision(load, crate::Precision::RELAXED);
        }
    }

    pub(super) fn unary_typed(
        &mut self,
        operator: AstUnary,
        at: Span,
        value: Handle<Expression>,
        ty: GlslType,
    ) -> Result<Handle<Expression>> {
        match operator {
            AstUnary::Plus => Ok(value),
            AstUnary::Minus => {
                let base = ty.base_scalar().ok_or_else(|| internal(at))?;
                match ty.kind {
                    TypeKind::Matrix { columns, .. } => {
                        let mut components = Vec::with_capacity(usize::from(columns));
                        for index in 0..u32::from(columns) {
                            let column =
                                self.add(Expression::AccessIndex { base: value, index }, at)?;
                            components.push(self.add(
                                Expression::Unary {
                                    op: UnaryOperator::Negate,
                                    expr: column,
                                },
                                at,
                            )?);
                        }
                        let ty = self.lw.ir_type(&ty, at)?;
                        self.add(Expression::Compose { ty, components }, at)
                    }
                    _ if base.is_unsigned() => {
                        let zero = Literal::zero(scalar(base)).ok_or_else(|| internal(at))?;
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
        let mut pending = Vec::from([(expression, false)]);
        while let Some((node, expanded)) = pending.pop() {
            if self.purity.borrow().contains_key(&node.id) {
                continue;
            }
            let Some(children) = self.pure_children(node) else {
                self.purity.borrow_mut().insert(node.id, false);
                continue;
            };
            if expanded {
                let purity = self.purity.borrow();
                let pure = children
                    .iter()
                    .all(|child| purity.get(&child.id).copied().unwrap_or(false));
                drop(purity);
                self.purity.borrow_mut().insert(node.id, pure);
                continue;
            }
            pending.push((node, true));
            pending.extend(children.into_iter().map(|child| (child, false)));
        }
        self.purity
            .borrow()
            .get(&expression.id)
            .copied()
            .unwrap_or(false)
    }

    fn pure_children<'e>(&self, expression: &'e AstExpression) -> Option<Vec<&'e AstExpression>> {
        Some(match expression.kind {
            ExpressionKind::Variable(_)
            | ExpressionKind::Number(_)
            | ExpressionKind::Bool(_)
            | ExpressionKind::String(_) => Vec::new(),
            ExpressionKind::Parenthesized(ref inner)
            | ExpressionKind::FieldSelection {
                base: ref inner, ..
            } => Vec::from([&**inner]),
            ExpressionKind::Subscript {
                ref base,
                ref index,
            } => {
                self.constant_index(index)?;
                Vec::from([&**base])
            }
            ExpressionKind::FunctionCall(ref call) => {
                match self.lw.analysis.calls.get(&expression.id) {
                    Some(&Callee::Constructor(_)) => call.arguments.iter().collect(),
                    Some(&Callee::Length) => match call.function.node {
                        rglsl_ast::ast::FunctionIdentifier::Method { ref object, .. } => {
                            Vec::from([&**object])
                        }
                        _ => return None,
                    },
                    _ => return None,
                }
            }
            ExpressionKind::Unary {
                operator: AstUnary::Increment | AstUnary::Decrement,
                ..
            }
            | ExpressionKind::Postfix { .. }
            | ExpressionKind::Assignment { .. } => return None,
            ExpressionKind::Unary { ref operand, .. } => Vec::from([&**operand]),
            ExpressionKind::Binary {
                ref left,
                ref right,
                ..
            } => Vec::from([&**left, &**right]),
            ExpressionKind::Conditional {
                ref condition,
                ref then_expression,
                ref else_expression,
            } => Vec::from([&**condition, &**then_expression, &**else_expression]),
            ExpressionKind::Sequence(ref list) => list.iter().collect(),
        })
    }

    pub(super) fn compound_old(
        &mut self,
        target: &AstExpression,
        place: &Place,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let old = self.load(place, at)?;
        if !self.info(target)?.ty.is_reference() {
            self.relax_load(target, old);
        }
        Ok(old)
    }

    pub(super) fn compound_assignment(
        &mut self,
        operator: AstBinary,
        (target, place, old): (&AstExpression, &Place, Handle<Expression>),
        value: &AstExpression,
        (right, right_ty): (Handle<Expression>, GlslType),
        at: Span,
    ) -> Result<Handle<Expression>> {
        let target_ty = &self.info(target)?.ty;
        if target_ty.is_reference() {
            return self.reference_offset(
                (old, target_ty),
                (right, &right_ty),
                operator == AstBinary::Subtract,
                at,
            );
        }
        let value_info = self.info(value)?;
        let value_non_uniform = value_info.non_uniform
            && value_info
                .conversion
                .as_ref()
                .is_none_or(|target| *target == value_info.ty);
        let result = self.binary(operator, (old, target_ty), (right, &right_ty), at)?;
        if place.non_uniform || value_non_uniform {
            self.mark_operation(result);
        }
        Ok(result)
    }

    pub(super) fn binary_typed(
        &mut self,
        operator: AstBinary,
        (left, left_ty): (Handle<Expression>, GlslType),
        (right, right_ty): (Handle<Expression>, GlslType),
        at: Span,
    ) -> Result<Handle<Expression>> {
        match (left_ty.is_reference(), right_ty.is_reference()) {
            (true, true) => return self.reference_difference((left, &left_ty), right, at),
            (true, false) => {
                return self.reference_offset(
                    (left, &left_ty),
                    (right, &right_ty),
                    operator == AstBinary::Subtract,
                    at,
                )
            }
            (false, true) => {
                return self.reference_offset((right, &right_ty), (left, &left_ty), false, at)
            }
            (false, false) => {}
        }
        self.binary(operator, (left, &left_ty), (right, &right_ty), at)
    }

    fn matrix_over_scalar(
        &mut self,
        matrix: Handle<Expression>,
        divisor: Handle<Expression>,
        divisor_ty: &GlslType,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let base = divisor_ty.base_scalar().ok_or_else(|| internal(at))?;
        let one = Literal::one(scalar(base)).ok_or_else(|| internal(at))?;
        let one = self.literal(one, at)?;
        let reciprocal = self.unemitted(
            Expression::Binary {
                op: BinaryOperator::Divide,
                left: one,
                right: divisor,
            },
            at,
        );
        self.add(
            Expression::Binary {
                op: BinaryOperator::Multiply,
                left: matrix,
                right: reciprocal,
            },
            at,
        )
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
                } else if left_ty.sized_vector_length().is_some() && right_ty.is_scalar() {
                    right = self.replicate(right, &left_ty.with_scalar(GlslScalar::Uint), at)?;
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
        if left_matrix && right_ty.is_scalar() && op == BinaryOperator::Divide {
            return self.matrix_over_scalar(left, right, right_ty, at);
        }
        if left_matrix || right_matrix {
            if op == BinaryOperator::Multiply {
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
        let long = |ty: &GlslType| {
            matches!(
                ty.kind,
                TypeKind::LongVector { .. } | TypeKind::CooperativeVector { .. }
            )
        };
        let float_scalar = |ty: &GlslType| ty.is_scalar() && ty.is_numeric() && !ty.is_integer();
        if long(left_ty) && right_ty.is_scalar() {
            if op != BinaryOperator::Multiply || !float_scalar(right_ty) {
                right = self.replicate(right, left_ty, at)?;
            }
        } else if long(right_ty) && left_ty.is_scalar() {
            if op != BinaryOperator::Multiply || !float_scalar(left_ty) {
                left = self.replicate(left, right_ty, at)?;
            }
        } else if op != BinaryOperator::Multiply {
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
}

impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    pub(super) async fn typed(
        self,
        expression: &'b AstExpression,
    ) -> Result<(Handle<Expression>, GlslType)> {
        let value = {
            let frame = self.clone().value(expression);
            let result = self.nest(frame).await;
            result
        }?;
        self.with(|this| this.typed_value(expression, value))?
    }

    pub(super) async fn rvalue(self, expression: &'b AstExpression) -> Result<Handle<Expression>> {
        {
            let frame = self.clone().typed(expression);
            let result = self.nest(frame).await;
            result
        }
        .map(|(value, _)| value)
    }

    pub(super) async fn effect(self, expression: &'b AstExpression) -> Result<()> {
        {
            let frame = self.clone().value(expression);
            let result = self.nest(frame).await;
            result
        }
        .map(|_| ())
    }

    pub(super) async fn constant(
        self,
        ty: GlslType,
        values: &'b [Value],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let ty = &ty;
        let analysis = self.with(|this| this.lw.analysis)?;
        match shape(ty, values, &analysis.types).ok_or_else(|| internal(at))? {
            Shape::Literal(value) => self.with(|this| this.literal(literal(value), at))?,
            Shape::Compose(parts) => {
                let mut components = Vec::with_capacity(parts.len());
                for (part, start, size) in parts {
                    let end = start.checked_add(size).ok_or_else(|| internal(at))?;
                    let slice = values.get(start..end).ok_or_else(|| internal(at))?;
                    components.push({
                        let frame = self.clone().constant(part, slice, at);
                        let result = self.nest(frame).await;
                        result
                    }?);
                }
                let ty = self.with(|this| this.lw.ir_type(ty, at))??;
                self.with(|this| this.add(Expression::Compose { ty, components }, at))?
            }
        }
    }

    pub(super) async fn value(
        self,
        expression: &'b AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        self.with(|this| this.stepped = None)?;
        let value = {
            let frame = self.clone().unmarked_value(expression);
            let result = self.nest(frame).await;
            result
        }?;
        self.with(|this| this.flagged(expression, value))?
    }

    async fn unmarked_value(
        self,
        expression: &'b AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        match self.with(|this| this.folded_value(expression))?? {
            Some(value) => Ok(Some(value)),
            None => {
                let frame = self.clone().computed_value(expression);
                let result = self.nest(frame).await;
                result
            }
        }
    }

    async fn computed_value(
        self,
        expression: &'b AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let at = self.with(|this| this.at(expression.span))?;
        match expression.kind {
            ExpressionKind::Variable(_)
            | ExpressionKind::Subscript { .. }
            | ExpressionKind::FieldSelection { .. } => {
                let frame = self.clone().chain_value(expression, at);
                let result = self.nest(frame).await;
                result
            }
            .map(Some),
            ExpressionKind::Number(_) | ExpressionKind::Bool(_) => Err(internal(at)),
            ExpressionKind::String(_) => Ok(None),
            ExpressionKind::Parenthesized(ref inner) => {
                let frame = self.clone().value_converted(inner);
                let result = self.nest(frame).await;
                result
            }
            ExpressionKind::FunctionCall(ref call) => {
                let frame = self.clone().call(expression, call);
                let result = self.nest(frame).await;
                result
            }
            ExpressionKind::Postfix {
                ref operand,
                operator,
            } => {
                let frame = self.clone().increment(
                    operand,
                    operator == PostfixOperator::Increment,
                    true,
                    at,
                );
                let result = self.nest(frame).await;
                result
            }
            .map(Some),
            ExpressionKind::Unary { .. } => {
                let frame = self.clone().unary_chain(expression);
                let result = self.nest(frame).await;
                result
            }
            .map(Some),
            ExpressionKind::Binary { .. } => {
                let frame = self.clone().binary_chain(expression);
                let result = self.nest(frame).await;
                result
            }
            .map(Some),
            ExpressionKind::Conditional { .. } => {
                let frame = self.clone().conditional_chain(expression);
                let result = self.nest(frame).await;
                result
            }
            ExpressionKind::Assignment { .. } => {
                let frame = self.clone().assignment_chain(expression);
                let result = self.nest(frame).await;
                result
            }
            .map(Some),
            ExpressionKind::Sequence(ref expressions) => {
                let frame = self.clone().sequence(expressions, at);
                let result = self.nest(frame).await;
                result
            }
        }
    }

    async fn chain_value(
        self,
        expression: &'b AstExpression,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let chain = {
            let frame = self.clone().chain(expression);
            let result = self.nest(frame).await;
            result
        }?;
        self.with(|this| this.chain_loaded(expression, chain, at))?
    }

    async fn sequence(
        self,
        expressions: &'b [AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let Some((final_expression, leading)) = expressions.split_last() else {
            return Err(internal(at));
        };
        for expression in leading {
            {
                let frame = self.clone().value_converted(expression);
                let result = self.nest(frame).await;
                result
            }?;
        }
        {
            let frame = self.clone().sequence_result(final_expression);
            let result = self.nest(frame).await;
            result
        }
    }

    async fn sequence_result(
        self,
        expression: &'b AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let inner = super::prepass::strip(expression);
        let info = self.with(|this| this.info(expression))??;
        let lvalue = matches!(
            inner.kind,
            ExpressionKind::Variable(_)
                | ExpressionKind::Subscript { .. }
                | ExpressionKind::FieldSelection { .. }
        );
        if !lvalue || info.is_constant || info.is_specialization || info.conversion.is_some() {
            return {
                let frame = self.clone().value_converted(expression);
                let result = self.nest(frame).await;
                result
            };
        }
        match {
            let frame = self.clone().chain(inner);
            let result = self.nest(frame).await;
            result
        }? {
            Chain::Place(mut place) => {
                place.non_uniform = false;
                let at = self.with(|this| this.at(expression.span))?;
                self.with(|this| this.load(&place, at).map(Some))?
            }
            Chain::Value(value) => Ok(Some(value)),
        }
    }

    async fn value_converted(
        self,
        expression: &'b AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let info = self.with(|this| this.info(expression))??;
        if info.ty.is_void() || info.ty.is_string() {
            return {
                let frame = self.clone().value(expression);
                let result = self.nest(frame).await;
                result
            };
        }
        {
            let frame = self.clone().rvalue(expression);
            let result = self.nest(frame).await;
            result
        }
        .map(Some)
    }

    pub(super) async fn place(self, expression: &'b AstExpression) -> Result<Place> {
        let chain = match {
            let frame = self.clone().dynamic_swizzle_component(expression);
            let result = self.nest(frame).await;
            result
        }? {
            Some(chain) => chain,
            None => {
                let frame = self.clone().chain(expression);
                let result = self.nest(frame).await;
                result
            }?,
        };
        match chain {
            Chain::Place(place) => Ok(place),
            Chain::Value(_) => Err(semantic(
                "the expression is not an l-value",
                self.with(|this| this.at(expression.span))?,
            )),
        }
    }

    async fn dynamic_swizzle_component(
        self,
        expression: &'b AstExpression,
    ) -> Result<Option<Chain>> {
        let ExpressionKind::Subscript {
            ref base,
            ref index,
        } = super::prepass::strip(expression).kind
        else {
            return Ok(None);
        };
        let ExpressionKind::FieldSelection {
            base: ref swizzled, ..
        } = super::prepass::strip(base).kind
        else {
            return Ok(None);
        };
        let swizzled_ty = &self.with(|this| this.info(swizzled))??.ty;
        let is_swizzle = !swizzled_ty.is_array()
            && matches!(
                swizzled_ty.kind,
                TypeKind::Scalar(_) | TypeKind::Vector { .. }
            );
        if !is_swizzle
            || !self.with(|this| this.info(base))??.ty.is_vector()
            || self.with(|this| this.constant_index(index).is_some())?
        {
            return Ok(None);
        }
        let at = self.with(|this| this.at(expression.span))?;
        let place = match {
            let frame = self.clone().chain(base);
            let result = self.nest(frame).await;
            result
        }? {
            Chain::Place(place) => place,
            value @ Chain::Value(_) => return Ok(Some(value)),
        };
        let Some(ref components) = place.swizzle else {
            return Err(internal(at));
        };
        let size = u8::try_from(components.len())
            .ok()
            .and_then(vector_size)
            .ok_or_else(|| internal(at))?;
        let mut selectors = Vec::with_capacity(components.len());
        for &component in components {
            selectors.push(self.with(|this| this.literal(Literal::U32(component), at))??);
        }
        let ty = self.with(|this| {
            this.lw.insert_type(crate::TypeInner::Vector {
                size,
                scalar: crate::Scalar::U32,
            })
        })?;
        let selectors = self.with(|this| {
            this.add(
                Expression::Compose {
                    ty,
                    components: selectors,
                },
                at,
            )
        })??;
        let selector = {
            let frame = self.clone().rvalue(index);
            let result = self.nest(frame).await;
            result
        }?;
        let component = self.with(|this| {
            this.add(
                Expression::Access {
                    base: selectors,
                    index: selector,
                },
                at,
            )
        })??;
        let pointer = self.with(|this| {
            this.add(
                Expression::Access {
                    base: place.pointer,
                    index: component,
                },
                at,
            )
        })??;
        let index_non_uniform = self.with(|this| this.info(index))??.non_uniform;
        let non_uniform = self.with(|this| this.info(expression))??.non_uniform;
        self.with(|this| this.inherit_access(pointer, place.pointer, index_non_uniform))?;
        let mut child = place.child(pointer, place.boolean);
        child.non_uniform = non_uniform && !child.spilled;
        Ok(Some(Chain::Place(child)))
    }

    async fn variable_chain(self, expression: &'b AstExpression) -> Result<Chain> {
        let at = self.with(|this| this.at(expression.span))?;
        let analysis = self.with(|this| this.lw.analysis)?;
        let symbol = *analysis
            .references
            .get(&expression.id)
            .ok_or_else(|| internal(at))?;
        if let Some(local) = self.with(|this| this.variables.get(&symbol).copied())? {
            return Ok(match local {
                Local::Variable(handle) => Chain::Place(Place::pointer(
                    self.with(|this| this.add(Expression::LocalVariable(handle), at))??,
                    false,
                )),
                Local::Pointer(index) => Chain::Place(Place::pointer(
                    self.with(|this| this.add(Expression::FunctionArgument(index), at))??,
                    false,
                )),
                Local::Value(index) => Chain::Value(
                    self.with(|this| this.add(Expression::FunctionArgument(index), at))??,
                ),
                Local::Constant => {
                    let variable =
                        self.with(|this| this.lw.variable(symbol).ok_or_else(|| internal(at)))??;
                    let value = variable.value.as_ref().ok_or_else(|| internal(at))?;
                    Chain::Value({
                        let frame = self
                            .clone()
                            .constant(variable.ty.clone(), &value.values, at);
                        let result = self.nest(frame).await;
                        result
                    }?)
                }
            });
        }
        if let Some(&rglsl_sema::scope::SymbolKind::BlockMember { instance, index }) =
            self.with(|this| this.lw.symbol(symbol).map(|symbol| &symbol.kind))?
        {
            if !self.with(|this| this.lw.is_builtin_symbol(symbol))? {
                let block = self.with(|this| {
                    this.lw
                        .variable(instance)
                        .and_then(|variable| match variable.ty.kind {
                            TypeKind::Block(id) => Some(id),
                            _ => None,
                        })
                        .ok_or_else(|| internal(at))
                })??;
                let GlobalRef::Variable(global) =
                    self.with(|this| this.lw.global_ref(instance, at))??
                else {
                    return Err(internal(at));
                };
                let base = self.with(|this| this.add(Expression::GlobalVariable(global), at))??;
                let pointer =
                    self.with(|this| this.add(Expression::AccessIndex { base, index }, at))??;
                let boolean = self.with(|this| this.lw.block_bools.contains(&(block, index)))?;
                return Ok(Chain::Place(Place::pointer(pointer, boolean)));
            }
        }
        if let Some((global, index)) = self.with(|this| this.lw.per_vertex_member(symbol))? {
            let base = self.with(|this| this.add(Expression::GlobalVariable(global), at))??;
            let pointer =
                self.with(|this| this.add(Expression::AccessIndex { base, index }, at))??;
            return Ok(Chain::Place(Place::pointer(pointer, false)));
        }
        if let Some(chain) = self.with(|this| this.ray_builtin_chain(symbol, at))?? {
            return Ok(chain);
        }
        let global = self.with(|this| this.lw.global_ref(symbol, at))??;
        if let GlobalRef::Variable(handle) = global {
            if let Some(crate::Binding::BuiltIn(crate::BuiltIn::ShaderBallot(
                crate::ShaderBallot::Mask(_),
            ))) = self.with(|this| this.lw.module.global_variables[handle].io.clone())?
            {
                let pointer =
                    self.with(|this| this.add(Expression::GlobalVariable(handle), at))??;
                let mask = self.with(|this| this.add(Expression::Load { pointer }, at))??;
                return Ok(Chain::Value(
                    self.with(|this| this.ballot_to_u64(mask, at))??,
                ));
            }
        }
        let handle_space = matches!(global, GlobalRef::Variable(handle)
            if self.with(|this| this.lw.module.global_variables[handle].space)? == AddressSpace::Handle);
        let expression = self.with(|this| this.lw.global_expression(global))?;
        let mut value = self.with(|this| this.add(expression, at))??;
        if let GlobalRef::Variable(handle) = global {
            if let Some(offset) = self.with(|this| this.lw.heap_offset_value(handle))? {
                let offset = {
                    let frame = self.clone().rvalue(offset);
                    let result = self.nest(frame).await;
                    result
                }?;
                value = self.with(|this| {
                    this.add(
                        Expression::HeapOffset {
                            pointer: value,
                            offset,
                        },
                        at,
                    )
                })??;
            }
        }
        Ok(match global {
            GlobalRef::Variable(_) if !handle_space => Chain::Place(Place::pointer(value, false)),
            _ => Chain::Value(value),
        })
    }

    async fn index_operand(
        self,
        index: &'b AstExpression,
        wide: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        if !wide {
            return {
                let frame = self.clone().rvalue(index);
                let result = self.nest(frame).await;
                result
            };
        }
        let info = self.with(|this| this.info(index))??;
        let narrow = info.ty.scalar_type() == Some(GlslScalar::Uint);
        let constant = info
            .value
            .as_ref()
            .filter(|_| info.is_constant && !info.is_specialization)
            .and_then(|value| value.scalar_i64());
        if let Some(value) = constant {
            return self.with(|this| this.literal(Literal::I64(value), at))?;
        }
        let value = {
            let frame = self.clone().rvalue(index);
            let result = self.nest(frame).await;
            result
        }?;
        if !narrow {
            return Ok(value);
        }
        self.with(|this| {
            this.add(
                Expression::As {
                    expr: value,
                    kind: crate::ScalarKind::Uint,
                    convert: Some(8),
                },
                at,
            )
        })?
    }

    pub(super) async fn chain(self, expression: &'b AstExpression) -> Result<Chain> {
        {
            let frame = self.clone().access_chain(expression);
            let result = self.nest(frame).await;
            result
        }
    }

    pub(super) async fn chain_head(self, expression: &'b AstExpression) -> Result<Chain> {
        match expression.kind {
            ExpressionKind::Parenthesized(ref inner) => {
                let frame = self.clone().chain(inner);
                let result = self.nest(frame).await;
                result
            }
            ExpressionKind::Variable(_) => {
                let frame = self.clone().variable_chain(expression);
                let result = self.nest(frame).await;
                result
            }
            _ => {
                let frame = self.clone().rvalue(expression);
                let result = self.nest(frame).await;
                result
            }
            .map(Chain::Value),
        }
    }

    pub(super) async fn subscript_chain(
        self,
        chain: Chain,
        base: &'b AstExpression,
        index: &'b AstExpression,
        at: Span,
    ) -> Result<Chain> {
        let base_ty = &self.with(|this| this.info(base))??.ty;
        if base_ty.is_reference() {
            return {
                let frame = self
                    .clone()
                    .reference_subscript_chain(chain, base, index, at);
                let result = self.nest(frame).await;
                result
            };
        }
        let wide = self.with(|this| this.wide_index(base_ty, index))??;
        let constant = if wide {
            None
        } else {
            self.with(|this| this.constant_index(index))?
        };
        let index_value = {
            let frame = self
                .clone()
                .subscript_index(chain.clone(), index, wide, constant, at);
            let result = self.nest(frame).await;
            result
        }?;
        self.with(|this| this.subscript_access(chain, base, index, index_value, constant, at))?
    }

    async fn subscript_index(
        self,
        chain: Chain,
        index: &'b AstExpression,
        wide: bool,
        constant: Option<u32>,
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        match chain {
            Chain::Place(Place {
                swizzle: Some(ref components),
                ..
            }) => {
                let component =
                    constant.and_then(|c| components.get(usize::try_from(c).ok()?).copied());
                match component {
                    Some(_) => Ok(None),
                    None => {
                        let frame = self.clone().rvalue(index);
                        let result = self.nest(frame).await;
                        result
                    }
                    .map(Some),
                }
            }
            _ if constant.is_some() => Ok(None),
            _ => {
                let frame = self.clone().index_operand(index, wide, at);
                let result = self.nest(frame).await;
                result
            }
            .map(Some),
        }
    }

    async fn reference_subscript_chain(
        self,
        chain: Chain,
        base: &'b AstExpression,
        index: &'b AstExpression,
        at: Span,
    ) -> Result<Chain> {
        let base_ty = &self.with(|this| this.info(base))??.ty;
        let reference = match chain {
            Chain::Place(place) => self.with(|this| this.load(&place, at))??,
            Chain::Value(value) => value,
        };
        let index = {
            let frame = self.clone().typed(index);
            let result = self.nest(frame).await;
            result
        }?;
        self.with(|this| {
            this.reference_offset((reference, base_ty), (index.0, &index.1), false, at)
                .map(Chain::Value)
        })?
    }

    async fn relayout(
        self,
        value: Handle<Expression>,
        from: Handle<crate::Type>,
        to: Handle<crate::Type>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        if from == to {
            return Ok(value);
        }
        let (from_inner, to_inner) = self.with(|this| {
            (
                this.lw.module.types[from].inner.clone(),
                this.lw.module.types[to].inner.clone(),
            )
        })?;
        let parts: Vec<(Handle<crate::Type>, Handle<crate::Type>)> = match (&from_inner, &to_inner)
        {
            (
                &crate::TypeInner::Struct {
                    members: ref from_members,
                    ..
                },
                &crate::TypeInner::Struct {
                    members: ref to_members,
                    ..
                },
            ) if from_members.len() == to_members.len() => from_members
                .iter()
                .zip(to_members)
                .map(|(from, to)| (from.ty, to.ty))
                .collect(),
            (
                &crate::TypeInner::Array {
                    base: from_base,
                    size: crate::ArraySize::Constant(from_size),
                    ..
                },
                &crate::TypeInner::Array {
                    base: to_base,
                    size: crate::ArraySize::Constant(to_size),
                    ..
                },
            ) if from_size == to_size => {
                (0..from_size.get()).map(|_| (from_base, to_base)).collect()
            }
            (
                &(crate::TypeInner::Scalar(from_scalar)
                | crate::TypeInner::Vector {
                    scalar: from_scalar,
                    ..
                }),
                &(crate::TypeInner::Scalar(to_scalar)
                | crate::TypeInner::Vector {
                    scalar: to_scalar, ..
                }),
            ) if from_scalar != to_scalar => {
                return self.with(|this| this.as_kind(value, to_scalar, at))?;
            }
            _ => return Err(internal(at)),
        };
        let mut components = Vec::with_capacity(parts.len());
        for (index, (from, to)) in (0_u32..).zip(parts) {
            let part =
                self.with(|this| this.add(Expression::AccessIndex { base: value, index }, at))??;
            components.push({
                let frame = self.clone().relayout(part, from, to, at);
                let result = self.nest(frame).await;
                result
            }?);
        }
        self.with(|this| this.add(Expression::Compose { ty: to, components }, at))?
    }

    async fn convert_booleans(
        self,
        value: Handle<Expression>,
        integer: Handle<crate::Type>,
        to_bool: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        match self.with(|this| this.lw.module.types[integer].inner.clone())? {
            crate::TypeInner::Array {
                base,
                size: crate::ArraySize::Constant(count),
                ..
            } => {
                let target = if to_bool {
                    {
                        let frame = self.clone().boolean_twin(integer, at);
                        let result = self.nest(frame).await;
                        result
                    }?
                } else {
                    integer
                };
                let mut components = Vec::new();
                for index in 0..count.get() {
                    let part = self.with(|this| {
                        this.add(Expression::AccessIndex { base: value, index }, at)
                    })??;
                    components.push({
                        let frame = self.clone().convert_booleans(part, base, to_bool, at);
                        let result = self.nest(frame).await;
                        result
                    }?);
                }
                self.with(|this| {
                    this.add(
                        Expression::Compose {
                            ty: target,
                            components,
                        },
                        at,
                    )
                })?
            }
            crate::TypeInner::Array { .. } => Err(internal(at)),
            _ if to_bool => self.with(|this| this.as_kind(value, crate::Scalar::BOOL, at))?,
            _ => self.with(|this| this.as_kind(value, crate::Scalar::U32, at))?,
        }
    }

    async fn boolean_twin(self, ty: Handle<crate::Type>, at: Span) -> Result<Handle<crate::Type>> {
        let scalar = crate::Scalar::BOOL;
        let inner = match self.with(|this| this.lw.module.types[ty].inner.clone())? {
            crate::TypeInner::Scalar(_) => crate::TypeInner::Scalar(scalar),
            crate::TypeInner::Vector { size, .. } => crate::TypeInner::Vector { size, scalar },
            crate::TypeInner::Array { base, size, .. } => {
                let element = {
                    let frame = self.clone().boolean_twin(base, at);
                    let result = self.nest(frame).await;
                    result
                }?;
                let stride = self.try_with(|lowerer| {
                    lowerer
                        .lw
                        .layouter
                        .update(lowerer.lw.module.to_ctx())
                        .map_err(|_| internal(at))?;
                    Ok(lowerer.lw.layouter[element].to_stride())
                })?;
                crate::TypeInner::Array {
                    base: element,
                    size,
                    stride,
                }
            }
            _ => return Err(internal(at)),
        };
        self.with(|this| this.lw.insert_type(inner))
    }

    pub(super) async fn increment(
        self,
        operand: &'b AstExpression,
        increment: bool,
        postfix: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let ty = self.with(|this| this.info(operand))??.ty.clone();
        let place = {
            let frame = self.clone().place(operand);
            let result = self.nest(frame).await;
            result
        }?;
        let old = self.with(|this| this.load(&place, at))??;
        self.with(|this| this.relax_load(operand, old))?;
        let base = ty.base_scalar().ok_or_else(|| internal(at))?;
        let one = Literal::one(scalar(base)).ok_or_else(|| internal(at))?;
        let one = self.with(|this| this.filled(&ty, one, at))??;
        let op = if increment {
            BinaryOperator::Add
        } else {
            BinaryOperator::Subtract
        };
        let new = self.with(|this| {
            this.add(
                Expression::Binary {
                    op,
                    left: old,
                    right: one,
                },
                at,
            )
        })??;
        if place.non_uniform {
            self.with(|this| this.mark_operation(new))?;
        }
        self.with(|this| this.stepped = Some(new))?;
        self.with(|this| this.store(&place, new, at))??;
        Ok(if postfix { old } else { new })
    }

    pub(super) async fn conditional_effect(
        self,
        condition: Handle<Expression>,
        [accept, reject]: [&'b AstExpression; 2],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let accept = {
            let result = self
                .clone()
                .block(self.nest(self.clone().effect(accept)))
                .await;
            result
        }?;
        let reject = {
            let result = self
                .clone()
                .block(self.nest(self.clone().effect(reject)))
                .await;
            result
        }?;
        self.with(|this| {
            this.push(
                Statement::If {
                    condition,
                    accept,
                    reject,
                    control: crate::SelectionControl::None,
                },
                at,
            )
        })?;
        Ok(None)
    }

    pub(super) async fn conditional_local(
        self,
        ty: &'b GlslType,
        condition: Handle<Expression>,
        [accept, reject]: [&'b AstExpression; 2],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let local = self.with(|this| this.local(ty, None, at))??;
        let accept = {
            let result = self
                .clone()
                .block(self.nest(self.clone().stored(accept, local, at)))
                .await;
            result
        }?;
        let reject = {
            let result = self
                .clone()
                .block(self.nest(self.clone().stored(reject, local, at)))
                .await;
            result
        }?;
        self.with(|this| {
            this.push(
                Statement::If {
                    condition,
                    accept,
                    reject,
                    control: crate::SelectionControl::None,
                },
                at,
            )
        })?;
        let pointer = self.with(|this| this.local_pointer(local, at))??;
        self.with(|this| this.add(Expression::Load { pointer }, at).map(Some))?
    }

    pub(super) async fn stored(
        self,
        expression: &'b AstExpression,
        local: Handle<crate::LocalVariable>,
        at: Span,
    ) -> Result<()> {
        let value = {
            let frame = self.clone().rvalue(expression);
            let result = self.nest(frame).await;
            result
        }?;
        let pointer = self.with(|this| this.local_pointer(local, at))??;
        self.with(|this| this.push(Statement::Store { pointer, value }, at))?;
        Ok(())
    }

    pub(super) async fn short_circuit(
        self,
        operator: AstBinary,
        left: Handle<Expression>,
        right: &'b AstExpression,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let local = self.with(|this| this.local(&GlslType::BOOL, None, at))??;
        let pointer = self.with(|this| this.local_pointer(local, at))??;
        self.with(|this| {
            this.push(
                Statement::Store {
                    pointer,
                    value: left,
                },
                at,
            )
        })?;
        let rest = {
            let result = self
                .clone()
                .block(self.nest(self.clone().stored(right, local, at)))
                .await;
            result
        }?;
        let (accept, reject) = if operator == AstBinary::LogicalAnd {
            (rest, crate::Block::new())
        } else {
            (crate::Block::new(), rest)
        };
        self.with(|this| {
            this.push(
                Statement::If {
                    condition: left,
                    accept,
                    reject,
                    control: crate::SelectionControl::None,
                },
                at,
            )
        })?;
        let pointer = self.with(|this| this.local_pointer(local, at))??;
        self.with(|this| this.add(Expression::Load { pointer }, at))?
    }

    async fn equality(
        self,
        left: Handle<Expression>,
        right: Handle<Expression>,
        ty: GlslType,
        equal: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let ty = &ty;
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
                    return self
                        .with(|this| this.add(Expression::Binary { op, left, right }, at))?;
                }
                TypeKind::Vector { .. } => {
                    let argument =
                        self.with(|this| this.add(Expression::Binary { op, left, right }, at))??;
                    return self.with(|this| {
                        this.add(
                            Expression::Relational {
                                fun: reduce,
                                argument,
                            },
                            at,
                        )
                    })?;
                }
                TypeKind::Matrix { columns, .. } => {
                    let column = ty.column_type().ok_or_else(|| internal(at))?;
                    (0..columns).map(|_| column.clone()).collect()
                }
                TypeKind::Struct(id) => self
                    .with(|this| {
                        this.lw
                            .analysis
                            .types
                            .structure(id)
                            .ok_or_else(|| internal(at))
                    })??
                    .members
                    .iter()
                    .map(|member| member.ty.clone())
                    .collect(),
                _ => return Err(internal(at)),
            }
        };
        let mut result = None;
        for (index, part) in (0_u32..).zip(&parts) {
            let l =
                self.with(|this| this.add(Expression::AccessIndex { base: left, index }, at))??;
            let r =
                self.with(|this| this.add(Expression::AccessIndex { base: right, index }, at))??;
            let compared = {
                let frame = self.clone().equality(l, r, part.clone(), equal, at);
                let result = self.nest(frame).await;
                result
            }?;
            result = Some(match result {
                None => compared,
                Some(previous) => self.with(|this| {
                    this.add(
                        Expression::Binary {
                            op: combine,
                            left: previous,
                            right: compared,
                        },
                        at,
                    )
                })??,
            });
        }
        result.ok_or_else(|| internal(at))
    }

    pub(super) async fn initializer(
        self,
        initializer: &'b Spanned<Initializer>,
        ty: GlslType,
    ) -> Result<Handle<Expression>> {
        let ty = &ty;
        let at = self.with(|this| this.at(initializer.span))?;
        match initializer.node {
            Initializer::Expression(ref expression) => {
                let (value, from) = {
                    let frame = self.clone().typed(expression);
                    let result = self.nest(frame).await;
                    result
                }?;
                if from.array.len() == ty.array.len() && from.kind == ty.kind {
                    return Ok(value);
                }
                self.with(|this| this.convert(value, &from, ty, at))?
            }
            Initializer::List(ref items) if items.is_empty() => {
                let ty = self.with(|this| this.lw.ir_type(ty, at))??;
                self.with(|this| this.add(Expression::ZeroValue(ty), at))?
            }
            Initializer::List(ref items) => {
                let elements: Vec<GlslType> =
                    if let Some(element) = ty.element_type().filter(|_| ty.is_array()) {
                        items.iter().map(|_| element.clone()).collect()
                    } else {
                        match ty.kind {
                            TypeKind::Struct(id) => self
                                .with(|this| {
                                    this.lw
                                        .analysis
                                        .types
                                        .structure(id)
                                        .ok_or_else(|| internal(at))
                                })??
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
                    components.push({
                        let frame = self.clone().initializer(item, element.clone());
                        let result = self.nest(frame).await;
                        result
                    }?);
                }
                let ty = self.with(|this| this.lw.ir_type(ty, at))??;
                self.with(|this| this.add(Expression::Compose { ty, components }, at))?
            }
        }
    }
}
