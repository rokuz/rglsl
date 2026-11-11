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
        let value = self.value(expression)?;
        self.typed_value(expression, value)
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
        self.stepped = None;
        let value = self.unmarked_value(expression)?;
        self.flagged(expression, value)
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

    fn unmarked_value(&mut self, expression: &AstExpression) -> Result<Option<Handle<Expression>>> {
        match self.folded_value(expression)? {
            Some(value) => Ok(Some(value)),
            None => self.computed_value(expression),
        }
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

    fn computed_value(&mut self, expression: &AstExpression) -> Result<Option<Handle<Expression>>> {
        let at = self.at(expression.span);
        match expression.kind {
            ExpressionKind::Variable(_)
            | ExpressionKind::Subscript { .. }
            | ExpressionKind::FieldSelection { .. } => self.chain_value(expression, at).map(Some),
            ExpressionKind::Number(_) | ExpressionKind::Bool(_) => Err(internal(at)),
            ExpressionKind::String(_) => Ok(None),
            ExpressionKind::Parenthesized(ref inner) => self.value_converted(inner),
            ExpressionKind::FunctionCall(ref call) => self.call(expression, call),
            ExpressionKind::Postfix {
                ref operand,
                operator,
            } => self
                .increment(operand, operator == PostfixOperator::Increment, true, at)
                .map(Some),
            ExpressionKind::Unary { .. } => self.unary_chain(expression).map(Some),
            ExpressionKind::Binary { .. } => self.binary_chain(expression).map(Some),
            ExpressionKind::Conditional { .. } => self.conditional_chain(expression),
            ExpressionKind::Assignment { .. } => self.assignment_chain(expression).map(Some),
            ExpressionKind::Sequence(ref expressions) => self.sequence(expressions, at),
        }
    }

    fn chain_value(&mut self, expression: &AstExpression, at: Span) -> Result<Handle<Expression>> {
        let chain = self.chain(expression)?;
        self.chain_loaded(expression, chain, at)
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

    fn sequence(
        &mut self,
        expressions: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let Some((final_expression, leading)) = expressions.split_last() else {
            return Err(internal(at));
        };
        for expression in leading {
            self.value_converted(expression)?;
        }
        self.sequence_result(final_expression)
    }

    fn sequence_result(
        &mut self,
        expression: &AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let inner = super::prepass::strip(expression);
        let info = self.info(expression)?;
        let lvalue = matches!(
            inner.kind,
            ExpressionKind::Variable(_)
                | ExpressionKind::Subscript { .. }
                | ExpressionKind::FieldSelection { .. }
        );
        if !lvalue || info.is_constant || info.is_specialization || info.conversion.is_some() {
            return self.value_converted(expression);
        }
        match self.chain(inner)? {
            Chain::Place(mut place) => {
                place.non_uniform = false;
                let at = self.at(expression.span);
                self.load(&place, at).map(Some)
            }
            Chain::Value(value) => Ok(Some(value)),
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

    fn value_converted(
        &mut self,
        expression: &AstExpression,
    ) -> Result<Option<Handle<Expression>>> {
        let info = self.info(expression)?;
        if info.ty.is_void() || info.ty.is_string() {
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
                Local::Constant => {
                    let variable = self.lw.variable(symbol).ok_or_else(|| internal(at))?;
                    let value = variable.value.as_ref().ok_or_else(|| internal(at))?;
                    Chain::Value(self.constant(&variable.ty, &value.values, at)?)
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
        if let Some(chain) = self.ray_builtin_chain(symbol, at)? {
            return Ok(chain);
        }
        let global = self.lw.global_ref(symbol, at)?;
        if let GlobalRef::Variable(handle) = global {
            if let Some(crate::Binding::BuiltIn(crate::BuiltIn::ShaderBallot(
                crate::ShaderBallot::Mask(_),
            ))) = self.lw.module.global_variables[handle].io
            {
                let pointer = self.add(Expression::GlobalVariable(handle), at)?;
                let mask = self.add(Expression::Load { pointer }, at)?;
                return Ok(Chain::Value(self.ballot_to_u64(mask, at)?));
            }
        }
        let handle_space = matches!(global, GlobalRef::Variable(handle)
            if self.lw.module.global_variables[handle].space == AddressSpace::Handle);
        let expression = self.lw.global_expression(global);
        let mut value = self.add(expression, at)?;
        if let GlobalRef::Variable(handle) = global {
            if let Some(offset) = self.lw.heap_offset_value(handle) {
                let offset = self.rvalue(offset)?;
                value = self.add(
                    Expression::HeapOffset {
                        pointer: value,
                        offset,
                    },
                    at,
                )?;
            }
        }
        Ok(match global {
            GlobalRef::Variable(_) if !handle_space => Chain::Place(Place::pointer(value, false)),
            _ => Chain::Value(value),
        })
    }

    fn wide_index(&self, base_ty: &GlslType, index: &AstExpression) -> Result<bool> {
        let scalar = self.info(index)?.ty.scalar_type();
        Ok(!base_ty.is_vector()
            && (scalar.is_some_and(|scalar| scalar.bits() == 64)
                || (self.lw.analysis.promote_uint32_indices && scalar == Some(GlslScalar::Uint))))
    }

    fn index_operand(
        &mut self,
        index: &AstExpression,
        wide: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        if !wide {
            return self.rvalue(index);
        }
        let info = self.info(index)?;
        let narrow = info.ty.scalar_type() == Some(GlslScalar::Uint);
        let constant = info
            .value
            .as_ref()
            .filter(|_| info.is_constant && !info.is_specialization)
            .and_then(|value| value.scalar_i64());
        if let Some(value) = constant {
            return self.literal(Literal::I64(value), at);
        }
        let value = self.rvalue(index)?;
        if !narrow {
            return Ok(value);
        }
        self.add(
            Expression::As {
                expr: value,
                kind: crate::ScalarKind::Uint,
                convert: Some(8),
            },
            at,
        )
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
        self.access_chain(expression)
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

    pub(super) fn chain_head(&mut self, expression: &AstExpression) -> Result<Chain> {
        match expression.kind {
            ExpressionKind::Parenthesized(ref inner) => self.chain(inner),
            ExpressionKind::Variable(_) => self.variable_chain(expression),
            _ => self.rvalue(expression).map(Chain::Value),
        }
    }

    pub(super) fn subscript_chain(
        &mut self,
        chain: Chain,
        base: &AstExpression,
        index: &AstExpression,
        at: Span,
    ) -> Result<Chain> {
        let base_ty = &self.info(base)?.ty;
        if base_ty.is_reference() {
            return self.reference_subscript_chain(chain, base, index, at);
        }
        let wide = self.wide_index(base_ty, index)?;
        let constant = if wide {
            None
        } else {
            self.constant_index(index)
        };
        let index_value = self.subscript_index(&chain, index, wide, constant, at)?;
        self.subscript_access(chain, base, index, index_value, constant, at)
    }

    fn subscript_index(
        &mut self,
        chain: &Chain,
        index: &AstExpression,
        wide: bool,
        constant: Option<u32>,
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        match *chain {
            Chain::Place(Place {
                swizzle: Some(ref components),
                ..
            }) => {
                let component =
                    constant.and_then(|c| components.get(usize::try_from(c).ok()?).copied());
                match component {
                    Some(_) => Ok(None),
                    None => self.rvalue(index).map(Some),
                }
            }
            _ if constant.is_some() => Ok(None),
            _ => self.index_operand(index, wide, at).map(Some),
        }
    }

    fn reference_subscript_chain(
        &mut self,
        chain: Chain,
        base: &AstExpression,
        index: &AstExpression,
        at: Span,
    ) -> Result<Chain> {
        let base_ty = &self.info(base)?.ty;
        let reference = match chain {
            Chain::Place(place) => self.load(&place, at)?,
            Chain::Value(value) => value,
        };
        let index = self.typed(index)?;
        self.reference_offset((reference, base_ty), (index.0, &index.1), false, at)
            .map(Chain::Value)
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

    pub(super) fn heap_pointee(&self, pointer: Handle<Expression>) -> Option<Handle<crate::Type>> {
        let module = &self.lw.module;
        let element = |ty: Handle<crate::Type>| match module.types[ty].inner {
            crate::TypeInner::Array { base, .. } => Some(base),
            _ => None,
        };
        match self.expressions[pointer] {
            Expression::GlobalVariable(handle) => {
                let global = &module.global_variables[handle];
                match global.space {
                    AddressSpace::DescriptorHeap(_) => Some(global.ty),
                    _ => None,
                }
            }
            Expression::HeapOffset { pointer, .. } => self.heap_pointee(pointer),
            Expression::AccessIndex { base, index } => {
                let ty = self.heap_pointee(base)?;
                match module.types[ty].inner {
                    crate::TypeInner::Struct { ref members, .. } => usize::try_from(index)
                        .ok()
                        .and_then(|index| members.get(index))
                        .map(|member| member.ty),
                    _ => element(ty),
                }
            }
            Expression::Access { base, .. } => element(self.heap_pointee(base)?),
            _ => None,
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

    pub(super) fn buffer_pointee(
        &self,
        pointer: Handle<Expression>,
    ) -> Option<Handle<crate::Type>> {
        let module = &self.lw.module;
        let element = |ty: Handle<crate::Type>| match module.types[ty].inner {
            crate::TypeInner::Array { base, .. } | crate::TypeInner::BindingArray { base, .. } => {
                Some(base)
            }
            _ => None,
        };
        match self.expressions[pointer] {
            Expression::GlobalVariable(handle) => {
                let global = &module.global_variables[handle];
                match global.space {
                    AddressSpace::Uniform
                    | AddressSpace::Storage { .. }
                    | AddressSpace::Immediate => Some(global.ty),
                    _ => None,
                }
            }
            Expression::AccessIndex { base, index } => {
                let ty = self.buffer_pointee(base)?;
                match module.types[ty].inner {
                    crate::TypeInner::Struct { ref members, .. } => usize::try_from(index)
                        .ok()
                        .and_then(|index| members.get(index))
                        .map(|member| member.ty),
                    _ => element(ty),
                }
            }
            Expression::Access { base, .. } => element(self.buffer_pointee(base)?),
            Expression::BufferPointer { descriptor } => {
                match module.types[self.heap_pointee(descriptor)?].inner {
                    crate::TypeInner::BufferDescriptor { base, .. } => Some(base),
                    _ => None,
                }
            }
            Expression::PhysicalPointer { value, .. }
                if !self.physical_bases.contains_key(&pointer) =>
            {
                self.buffer_pointee(value)
            }
            _ => self.physical_bases.get(&pointer).copied(),
        }
    }

    fn relayout(
        &mut self,
        value: Handle<Expression>,
        from: Handle<crate::Type>,
        to: Handle<crate::Type>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        if from == to {
            return Ok(value);
        }
        let types = &self.lw.module.types;
        let parts: Vec<(Handle<crate::Type>, Handle<crate::Type>)> =
            match (&types[from].inner, &types[to].inner) {
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
                    return self.as_kind(value, to_scalar, at);
                }
                _ => return Err(internal(at)),
            };
        let mut components = Vec::with_capacity(parts.len());
        for (index, (from, to)) in (0_u32..).zip(parts) {
            let part = self.add(Expression::AccessIndex { base: value, index }, at)?;
            components.push(self.relayout(part, from, to, at)?);
        }
        self.add(Expression::Compose { ty: to, components }, at)
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

    fn convert_booleans(
        &mut self,
        value: Handle<Expression>,
        integer: Handle<crate::Type>,
        to_bool: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        match self.lw.module.types[integer].inner {
            crate::TypeInner::Array {
                base,
                size: crate::ArraySize::Constant(count),
                ..
            } => {
                let target = if to_bool {
                    self.boolean_twin(integer, at)?
                } else {
                    integer
                };
                let mut components = Vec::new();
                for index in 0..count.get() {
                    let part = self.add(Expression::AccessIndex { base: value, index }, at)?;
                    components.push(self.convert_booleans(part, base, to_bool, at)?);
                }
                self.add(
                    Expression::Compose {
                        ty: target,
                        components,
                    },
                    at,
                )
            }
            crate::TypeInner::Array { .. } => Err(internal(at)),
            _ if to_bool => self.as_kind(value, crate::Scalar::BOOL, at),
            _ => self.as_kind(value, crate::Scalar::U32, at),
        }
    }

    fn boolean_twin(&mut self, ty: Handle<crate::Type>, at: Span) -> Result<Handle<crate::Type>> {
        let scalar = crate::Scalar::BOOL;
        let inner = match self.lw.module.types[ty].inner {
            crate::TypeInner::Scalar(_) => crate::TypeInner::Scalar(scalar),
            crate::TypeInner::Vector { size, .. } => crate::TypeInner::Vector { size, scalar },
            crate::TypeInner::Array { base, size, .. } => {
                let element = self.boolean_twin(base, at)?;
                self.lw
                    .layouter
                    .update(self.lw.module.to_ctx())
                    .map_err(|_| internal(at))?;
                let stride = self.lw.layouter[element].to_stride();
                crate::TypeInner::Array {
                    base: element,
                    size,
                    stride,
                }
            }
            _ => return Err(internal(at)),
        };
        Ok(self.lw.insert_type(inner))
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

    pub(super) fn increment(
        &mut self,
        operand: &AstExpression,
        increment: bool,
        postfix: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let ty = self.info(operand)?.ty.clone();
        let place = self.place(operand)?;
        let old = self.load(&place, at)?;
        self.relax_load(operand, old);
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
        if place.non_uniform {
            self.mark_operation(new);
        }
        self.stepped = Some(new);
        self.store(&place, new, at)?;
        Ok(if postfix { old } else { new })
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
        let mut pending = Vec::from([expression]);
        while let Some(expression) = pending.pop() {
            match expression.kind {
                ExpressionKind::Variable(_)
                | ExpressionKind::Number(_)
                | ExpressionKind::Bool(_)
                | ExpressionKind::String(_) => {}
                ExpressionKind::Parenthesized(ref inner)
                | ExpressionKind::FieldSelection {
                    base: ref inner, ..
                } => pending.push(inner),
                ExpressionKind::Subscript {
                    ref base,
                    ref index,
                } => {
                    if self.constant_index(index).is_none() {
                        return false;
                    }
                    pending.push(base);
                }
                ExpressionKind::FunctionCall(ref call) => {
                    match self.lw.analysis.calls.get(&expression.id) {
                        Some(&Callee::Constructor(_)) => pending.extend(call.arguments.iter()),
                        Some(&Callee::Length) => match call.function.node {
                            rglsl_ast::ast::FunctionIdentifier::Method { ref object, .. } => {
                                pending.push(object);
                            }
                            _ => return false,
                        },
                        _ => return false,
                    }
                }
                ExpressionKind::Unary {
                    operator: AstUnary::Increment | AstUnary::Decrement,
                    ..
                }
                | ExpressionKind::Postfix { .. }
                | ExpressionKind::Assignment { .. } => return false,
                ExpressionKind::Unary { ref operand, .. } => pending.push(operand),
                ExpressionKind::Binary {
                    ref left,
                    ref right,
                    ..
                } => {
                    pending.push(right);
                    pending.push(left);
                }
                ExpressionKind::Conditional {
                    ref condition,
                    ref then_expression,
                    ref else_expression,
                } => {
                    pending.push(else_expression);
                    pending.push(then_expression);
                    pending.push(condition);
                }
                ExpressionKind::Sequence(ref list) => pending.extend(list.iter()),
            }
        }
        true
    }

    pub(super) fn conditional_effect(
        &mut self,
        condition: Handle<Expression>,
        [accept, reject]: [&AstExpression; 2],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let accept = self.nested(|this| this.effect(accept))?;
        let reject = self.nested(|this| this.effect(reject))?;
        self.push(
            Statement::If {
                condition,
                accept,
                reject,
                control: crate::SelectionControl::None,
            },
            at,
        );
        Ok(None)
    }

    pub(super) fn conditional_local(
        &mut self,
        ty: &GlslType,
        condition: Handle<Expression>,
        [accept, reject]: [&AstExpression; 2],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let local = self.local(ty, None, at)?;
        let accept = self.nested(|this| this.stored(accept, local, at))?;
        let reject = self.nested(|this| this.stored(reject, local, at))?;
        self.push(
            Statement::If {
                condition,
                accept,
                reject,
                control: crate::SelectionControl::None,
            },
            at,
        );
        let pointer = self.local_pointer(local, at)?;
        self.add(Expression::Load { pointer }, at).map(Some)
    }

    pub(super) fn stored(
        &mut self,
        expression: &AstExpression,
        local: Handle<crate::LocalVariable>,
        at: Span,
    ) -> Result<()> {
        let value = self.rvalue(expression)?;
        let pointer = self.local_pointer(local, at)?;
        self.push(Statement::Store { pointer, value }, at);
        Ok(())
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

    pub(super) fn short_circuit(
        &mut self,
        operator: AstBinary,
        left: Handle<Expression>,
        right: &AstExpression,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let local = self.local(&GlslType::BOOL, None, at)?;
        let pointer = self.local_pointer(local, at)?;
        self.push(
            Statement::Store {
                pointer,
                value: left,
            },
            at,
        );
        let rest = self.nested(|this| this.stored(right, local, at))?;
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
                control: crate::SelectionControl::None,
            },
            at,
        );
        let pointer = self.local_pointer(local, at)?;
        self.add(Expression::Load { pointer }, at)
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
            Initializer::List(ref items) if items.is_empty() => {
                let ty = self.lw.ir_type(ty, at)?;
                self.add(Expression::ZeroValue(ty), at)
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
