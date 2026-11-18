use alloc::{string::String, vec, vec::Vec};

use rglsl_ast::ast::{Expression as AstExpression, ExpressionKind, Initializer, Spanned};
use rglsl_sema::types::{SpecializedSize, Type as GlslType};
use rglsl_types::stack::recurse;

use super::{GlobalRef, Lowerer, Result, internal, unsupported};
use crate::{Arena, Expression, Handle, Literal, Override, Scalar, Span, Statement, TypeInner};

pub(super) fn is_direct(expression: &AstExpression) -> bool {
    let mut expression = expression;
    loop {
        match expression.kind {
            ExpressionKind::Variable(_) => return true,
            ExpressionKind::Parenthesized(ref inner) => expression = inner,
            _ => return false,
        }
    }
}

const fn specializable(expression: &Expression) -> bool {
    match *expression {
        Expression::Literal(_)
        | Expression::Constant(_)
        | Expression::Override(_)
        | Expression::ZeroValue(_)
        | Expression::CooperativeMatrixLength { .. }
        | Expression::Compose { .. }
        | Expression::Splat { .. }
        | Expression::Replicate { .. }
        | Expression::Swizzle { .. }
        | Expression::AccessIndex { .. }
        | Expression::Unary { .. }
        | Expression::As { .. }
        | Expression::Binary { .. }
        | Expression::Select { .. } => true,
        Expression::Access { .. }
        | Expression::Undef(_)
        | Expression::FunctionArgument(_)
        | Expression::GlobalVariable(_)
        | Expression::LocalVariable(_)
        | Expression::Load { .. }
        | Expression::ImageSample { .. }
        | Expression::ImageLoad { .. }
        | Expression::ImageQuery { .. }
        | Expression::Derivative { .. }
        | Expression::Relational { .. }
        | Expression::Math { .. }
        | Expression::CallResult(_)
        | Expression::AtomicResult { .. }
        | Expression::ArrayLength(_)
        | Expression::WideArrayLength(_)
        | Expression::PhysicalPointer { .. }
        | Expression::PhysicalAddress { .. }
        | Expression::BufferPointer { .. }
        | Expression::HeapOffset { .. }
        | Expression::RayQueryProceedResult
        | Expression::RayQueryGet { .. }
        | Expression::ReportIntersectionResult
        | Expression::AccelerationStructureFromAddress { .. }
        | Expression::HitObjectGet { .. }
        | Expression::FetchMicroTriangleVertex { .. }
        | Expression::SubgroupBallotResult
        | Expression::SubgroupOperationResult { .. }
        | Expression::SpirvInstructionResult { .. }
        | Expression::CooperativeLoad { .. }
        | Expression::CooperativeMultiplyAdd { .. }
        | Expression::Expect { .. }
        | Expression::ImageSparseResident { .. }
        | Expression::IsHelperInvocation
        | Expression::ReadClock { .. }
        | Expression::InterpolateAt { .. }
        | Expression::FragmentFetch { .. }
        | Expression::ImageFootprint { .. }
        | Expression::AttachmentRead { .. }
        | Expression::CooperativeVectorLoad { .. }
        | Expression::CooperativeVectorMatMul { .. }
        | Expression::Convert { .. }
        | Expression::CooperativeMatrixResult { .. }
        | Expression::TensorCreate { .. }
        | Expression::ImageProcessing { .. }
        | Expression::ArrayConversion { .. }
        | Expression::Bitcast { .. }
        | Expression::TensorSet { .. }
        | Expression::TensorRead { .. }
        | Expression::TensorQuerySize { .. } => false,
    }
}

fn remap(
    expression: &Expression,
    map: &[Option<Handle<Expression>>],
    span: Span,
) -> Result<Expression> {
    let mut remapped = expression.clone();
    let mut complete = true;
    remapped.for_each_operand_mut(
        |operand| match map.get(operand.index()).copied().flatten() {
            Some(mapped) => *operand = mapped,
            None => complete = false,
        },
    );
    if complete {
        Ok(remapped)
    } else {
        Err(internal(span))
    }
}

#[derive(Clone)]
enum Specialized<'e> {
    Expression(&'e AstExpression),
    Initializer(&'e Spanned<Initializer>, GlslType),
}

fn not_specializable(span: Span) -> super::Error {
    unsupported(
        "this operation in a specialization-constant expression",
        span,
    )
}

impl<'a> Lowerer<'a> {
    pub(super) fn specialized_size(
        &mut self,
        size: SpecializedSize,
        span: Span,
    ) -> Result<Handle<Override>> {
        super::function::FunctionLowerer::new(self).specialized_size(size, span)
    }

    fn specialization_of(
        &mut self,
        source: Specialized<'_>,
        name: Option<String>,
        span: Span,
    ) -> Result<Handle<Override>> {
        super::function::FunctionLowerer::new(self).specialization_of(source, name, span)
    }

    pub(super) fn specialization(
        &mut self,
        expression: &AstExpression,
        name: Option<String>,
        span: Span,
    ) -> Result<Handle<Override>> {
        super::function::FunctionLowerer::new(self).specialization(expression, name, span)
    }

    pub(super) fn specialized_initializer(
        &mut self,
        initializer: &Spanned<Initializer>,
        ty: &GlslType,
        name: Option<String>,
        span: Span,
    ) -> Result<Handle<Override>> {
        match initializer.node {
            Initializer::Expression(ref expression) => self.specialization(expression, name, span),
            Initializer::List(_) => self.specialization_of(
                Specialized::Initializer(initializer, ty.clone()),
                name,
                span,
            ),
        }
    }

    fn global_tree(
        &mut self,
        source: &Arena<Expression>,
        root: Handle<Expression>,
        span: Span,
    ) -> Result<Handle<Expression>> {
        let mut needed = vec![false; source.len()];
        *needed.get_mut(root.index()).ok_or_else(|| internal(span))? = true;
        for (handle, expression) in source.iter().rev() {
            if !needed.get(handle.index()).copied().unwrap_or(false) {
                continue;
            }
            if !specializable(expression) {
                return Err(not_specializable(span));
            }
            let mut complete = true;
            expression.for_each_operand(|operand| match needed.get_mut(operand.index()) {
                Some(slot) => *slot = true,
                None => complete = false,
            });
            if !complete {
                return Err(internal(span));
            }
        }
        let mut map: Vec<Option<Handle<Expression>>> = vec![None; source.len()];
        for (handle, expression) in source.iter() {
            if !needed.get(handle.index()).copied().unwrap_or(false) {
                continue;
            }
            let at = source.get_span(handle);
            let mapped = remap(expression, &map, at)?;
            let new = self.module.global_expressions.append(mapped, at);
            if let Some(slot) = map.get_mut(handle.index()) {
                *slot = Some(new);
            }
        }
        map.get(root.index())
            .copied()
            .flatten()
            .ok_or_else(|| internal(span))
    }

    fn local_size_override(
        &mut self,
        index: usize,
        span: Span,
    ) -> Result<Option<Handle<Override>>> {
        let id = self.local_size_ids.get(index).copied().flatten();
        if id.is_none() && !self.specialize_work_group_size {
            return Ok(None);
        }
        if let Some(handle) = self.local_size_overrides.get(index).copied().flatten() {
            return Ok(Some(handle));
        }
        let default = self
            .work_group_size_defaults()
            .get(index)
            .copied()
            .unwrap_or(1);
        let ty = self.insert_type(TypeInner::Scalar(Scalar::U32));
        let init = self
            .module
            .global_expressions
            .append(Expression::Literal(Literal::U32(default)), span);
        let handle = self.module.overrides.append(
            Override {
                name: None,
                id,
                ty,
                init: Some(init),
            },
            span,
        );
        if let Some(slot) = self.local_size_overrides.get_mut(index) {
            *slot = Some(handle);
        }
        if id.is_none()
            && let Some(slot) = self.work_group_size_placeholders.get_mut(index)
        {
            *slot = Some(handle);
        }
        Ok(Some(handle))
    }

    pub(super) fn work_group_size_defaults(&self) -> [u32; 3] {
        self.builtin_name("gl_WorkGroupSize");
        let mut sizes = [1_u32; 3];
        let values = self
            .analysis
            .builtins
            .variables()
            .find(|&(name, _)| name == "gl_WorkGroupSize")
            .and_then(|(_, symbol)| self.variable(symbol))
            .and_then(|variable| variable.value.as_ref());
        if let Some(values) = values {
            for (slot, value) in sizes.iter_mut().zip(&values.values) {
                if let rglsl_sema::constant::Value::Uint(value) = *value {
                    *slot = value;
                }
            }
        }
        sizes
    }

    pub(super) fn is_work_group_size(&self, symbol: rglsl_sema::SymbolId) -> bool {
        self.builtin_name("gl_WorkGroupSize");
        self.analysis
            .builtins
            .variables()
            .any(|(name, id)| id == symbol && name == "gl_WorkGroupSize")
    }

    pub(super) fn has_local_size_ids(&self) -> bool {
        self.specialize_work_group_size || self.local_size_ids.iter().any(Option::is_some)
    }

    pub(super) fn workgroup_size_overrides(
        &mut self,
        span: Span,
    ) -> Result<Option<[Option<Handle<Expression>>; 3]>> {
        if !self.has_local_size_ids() {
            return Ok(None);
        }
        let mut result = [None; 3];
        for (index, slot) in result.iter_mut().enumerate() {
            if let Some(handle) = self.local_size_override(index, span)? {
                *slot = Some(
                    self.module
                        .global_expressions
                        .append(Expression::Override(handle), span),
                );
            }
        }
        Ok(Some(result))
    }

    pub(super) fn work_group_size_override(&mut self, span: Span) -> Result<Handle<Override>> {
        if let Some(handle) = self.work_group_size {
            return Ok(handle);
        }
        let defaults = self.work_group_size_defaults();
        let mut components = Vec::with_capacity(3);
        for (index, default) in defaults.into_iter().enumerate() {
            let expression = match self.local_size_override(index, span)? {
                Some(handle) => Expression::Override(handle),
                None => Expression::Literal(Literal::U32(default)),
            };
            components.push(self.module.global_expressions.append(expression, span));
        }
        let ty = self.insert_type(TypeInner::Vector {
            size: crate::VectorSize::Tri,
            scalar: Scalar::U32,
        });
        let init = self
            .module
            .global_expressions
            .append(Expression::Compose { ty, components }, span);
        let handle = self.module.overrides.append(
            Override {
                name: Some(String::from("gl_WorkGroupSize")),
                id: None,
                ty,
                init: Some(init),
            },
            span,
        );
        self.work_group_size = Some(handle);
        Ok(handle)
    }
}

impl super::function::FunctionLowerer<'_, '_> {
    pub(super) fn specialization(
        &mut self,
        expression: &AstExpression,
        name: Option<String>,
        span: Span,
    ) -> Result<Handle<Override>> {
        recurse(|| self.specialization_of(Specialized::Expression(expression), name, span))
    }

    pub(super) fn specialized_initializer(
        &mut self,
        initializer: &Spanned<Initializer>,
        ty: GlslType,
        name: Option<String>,
        span: Span,
    ) -> Result<Handle<Override>> {
        match initializer.node {
            Initializer::Expression(ref expression) => {
                recurse(|| self.specialization(expression, name, span))
            }
            Initializer::List(_) => recurse(|| {
                self.specialization_of(Specialized::Initializer(initializer, ty), name, span)
            }),
        }
    }

    fn specialization_of(
        &mut self,
        source: Specialized<'_>,
        name: Option<String>,
        span: Span,
    ) -> Result<Handle<Override>> {
        let outer = self.enter_scratch();
        let typed = match source {
            Specialized::Expression(expression) => self.typed(expression),
            Specialized::Initializer(initializer, ty) => {
                self.initializer(initializer, &ty).map(|value| (value, ty))
            }
        };
        let scratch = self.leave_scratch(outer);
        let (value, ty) = typed?;
        let (expressions, statements, has_locals) = (
            scratch.expressions,
            scratch.block,
            !scratch.locals.is_empty(),
        );
        if has_locals
            || statements
                .iter()
                .any(|statement| !matches!(*statement, Statement::Emit(_)))
        {
            return Err(not_specializable(span));
        }
        let root = self.lw.global_tree(&expressions, value, span)?;
        if let Expression::Override(handle) = self.lw.module.global_expressions[root].clone() {
            return Ok(handle);
        }
        let ir = recurse(|| self.ir_type(&ty, span))?;
        Ok(self.lw.module.overrides.append(
            Override {
                name,
                id: None,
                ty: ir,
                init: Some(root),
            },
            span,
        ))
    }

    pub(super) fn specialized_size(
        &mut self,
        size: SpecializedSize,
        span: Span,
    ) -> Result<Handle<Override>> {
        match size {
            SpecializedSize::Constant { symbol, .. } => {
                match recurse(|| self.global_ref(symbol, span))? {
                    GlobalRef::Override(handle) => Ok(handle),
                    _ => Err(internal(span)),
                }
            }
            SpecializedSize::Expression(node) => {
                if let Some(handle) = self.lw.specialized_sizes.get(&node).copied() {
                    return Ok(handle);
                }
                if self.lw.size_expressions.is_empty() {
                    self.lw.size_expressions = rglsl_ast::expressions(self.lw.unit)
                        .into_iter()
                        .map(|expression| (expression.id, expression))
                        .collect();
                }
                let expression = self
                    .lw
                    .size_expressions
                    .get(&node)
                    .copied()
                    .ok_or_else(|| internal(span))?;
                let handle = recurse(|| self.specialization(expression, None, span))?;
                self.lw.specialized_sizes.insert(node, handle);
                Ok(handle)
            }
        }
    }
}
