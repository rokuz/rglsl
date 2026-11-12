use alloc::{string::String, vec, vec::Vec};

use rglsl_ast::ast::{Expression as AstExpression, ExpressionKind, Initializer, Spanned};
use rglsl_sema::types::{SpecializedSize, Type as GlslType};

use super::function::FunctionLowerer;
use super::{internal, unsupported, GlobalRef, Lowerer, Result};
use crate::{Arena, Expression, Handle, Literal, Override, Scalar, Span, Statement, TypeInner};

const LOCAL_SIZE_IDS: [&str; 3] = ["local_size_x_id", "local_size_y_id", "local_size_z_id"];

pub(super) fn local_size_index(name: &str) -> Option<usize> {
    LOCAL_SIZE_IDS
        .iter()
        .position(|candidate| *candidate == name)
}

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

fn operands(expression: &Expression) -> Option<Vec<Handle<Expression>>> {
    Some(match *expression {
        Expression::Literal(_)
        | Expression::Constant(_)
        | Expression::Override(_)
        | Expression::ZeroValue(_)
        | Expression::CooperativeMatrixLength { .. } => Vec::new(),
        Expression::Compose { ref components, .. } => components.clone(),
        Expression::Splat { value, .. } | Expression::Replicate { value, .. } => vec![value],
        Expression::Swizzle { vector, .. } => vec![vector],
        Expression::AccessIndex { base, .. } => vec![base],
        Expression::Unary { expr, .. } | Expression::As { expr, .. } => vec![expr],
        Expression::Binary { left, right, .. } => vec![left, right],
        Expression::Select {
            condition,
            accept,
            reject,
        } => vec![condition, accept, reject],
        _ => return None,
    })
}

fn remap(
    expression: &Expression,
    map: &[Option<Handle<Expression>>],
    span: Span,
) -> Result<Expression> {
    let get = |handle: Handle<Expression>| -> Result<Handle<Expression>> {
        map.get(handle.index())
            .copied()
            .flatten()
            .ok_or_else(|| internal(span))
    };
    Ok(match *expression {
        Expression::Compose { ty, ref components } => Expression::Compose {
            ty,
            components: components
                .iter()
                .map(|&component| get(component))
                .collect::<Result<Vec<_>>>()?,
        },
        Expression::Splat { size, value } => Expression::Splat {
            size,
            value: get(value)?,
        },
        Expression::Replicate { ty, value } => Expression::Replicate {
            ty,
            value: get(value)?,
        },
        Expression::Swizzle {
            size,
            vector,
            pattern,
        } => Expression::Swizzle {
            size,
            vector: get(vector)?,
            pattern,
        },
        Expression::AccessIndex { base, index } => Expression::AccessIndex {
            base: get(base)?,
            index,
        },
        Expression::Unary { op, expr } => Expression::Unary {
            op,
            expr: get(expr)?,
        },
        Expression::As {
            expr,
            kind,
            convert,
        } => Expression::As {
            expr: get(expr)?,
            kind,
            convert,
        },
        Expression::Binary { op, left, right } => Expression::Binary {
            op,
            left: get(left)?,
            right: get(right)?,
        },
        Expression::Select {
            condition,
            accept,
            reject,
        } => Expression::Select {
            condition: get(condition)?,
            accept: get(accept)?,
            reject: get(reject)?,
        },
        ref other => other.clone(),
    })
}

#[derive(Clone, Copy)]
enum Specialized<'e> {
    Expression(&'e AstExpression),
    Initializer(&'e Spanned<Initializer>, &'e GlslType),
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
        super::function::lowerer_on_heap!(self, |cx| cx.specialized_size(size, span))
    }

    fn specialization_of(
        &mut self,
        source: Specialized<'_>,
        name: Option<String>,
        span: Span,
    ) -> Result<Handle<Override>> {
        super::function::lowerer_on_heap!(self, |cx| cx.specialization_of(source, name, span))
    }

    pub(super) fn specialization(
        &mut self,
        expression: &AstExpression,
        name: Option<String>,
        span: Span,
    ) -> Result<Handle<Override>> {
        super::function::lowerer_on_heap!(self, |cx| cx.specialization(expression, name, span))
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
            Initializer::List(_) => {
                self.specialization_of(Specialized::Initializer(initializer, ty), name, span)
            }
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
            for operand in operands(expression).ok_or_else(|| not_specializable(span))? {
                *needed
                    .get_mut(operand.index())
                    .ok_or_else(|| internal(span))? = true;
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
        if id.is_none() {
            if let Some(slot) = self.work_group_size_placeholders.get_mut(index) {
                *slot = Some(handle);
            }
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

impl<'b, 'a> super::function::LowererCx<'b, 'a> {
    pub(super) async fn specialization(
        self,
        expression: &'b AstExpression,
        name: Option<String>,
        span: Span,
    ) -> Result<Handle<Override>> {
        {
            let frame =
                self.clone()
                    .specialization_of(Specialized::Expression(expression), name, span);
            let result = self.nest(frame).await;
            result
        }
    }

    async fn specialization_of(
        self,
        source: Specialized<'_>,
        name: Option<String>,
        span: Span,
    ) -> Result<Handle<Override>> {
        let (value, ty, expressions, statements, has_locals) = self.try_with(|this| {
            let mut scratch = FunctionLowerer::new(this);
            scratch.specializing = true;
            let (value, ty) = match source {
                Specialized::Expression(expression) => scratch.typed(expression)?,
                Specialized::Initializer(initializer, ty) => {
                    (scratch.initializer(initializer, ty)?, ty.clone())
                }
            };
            scratch.flush();
            Ok((
                value,
                ty,
                core::mem::take(&mut scratch.expressions),
                core::mem::take(&mut scratch.block),
                !scratch.locals.is_empty(),
            ))
        })?;
        if has_locals
            || statements
                .iter()
                .any(|statement| !matches!(*statement, Statement::Emit(_)))
        {
            return Err(not_specializable(span));
        }
        let root = self.with(|this| this.global_tree(&expressions, value, span))??;
        if let Expression::Override(handle) =
            self.with(|this| this.module.global_expressions[root].clone())?
        {
            return Ok(handle);
        }
        let ir = {
            let frame = self.clone().ir_type(ty.clone(), span);
            let result = self.nest(frame).await;
            result
        }?;
        self.with(|this| {
            this.module.overrides.append(
                Override {
                    name,
                    id: None,
                    ty: ir,
                    init: Some(root),
                },
                span,
            )
        })
    }

    pub(super) async fn specialized_size(
        self,
        size: SpecializedSize,
        span: Span,
    ) -> Result<Handle<Override>> {
        match size {
            SpecializedSize::Constant { symbol, .. } => match {
                let frame = self.clone().global_ref(symbol, span);
                let result = self.nest(frame).await;
                result
            }? {
                GlobalRef::Override(handle) => Ok(handle),
                _ => Err(internal(span)),
            },
            SpecializedSize::Expression(node) => {
                if let Some(handle) =
                    self.with(|this| this.specialized_sizes.get(&node).copied())?
                {
                    return Ok(handle);
                }
                if self.with(|this| this.size_expressions.is_empty())? {
                    self.with(|this| {
                        this.size_expressions = rglsl_ast::expressions(this.unit)
                            .into_iter()
                            .map(|expression| (expression.id, expression))
                            .collect()
                    })?;
                }
                let expression = self.with(|this| {
                    this.size_expressions
                        .get(&node)
                        .copied()
                        .ok_or_else(|| internal(span))
                })??;
                let handle = {
                    let frame = self.clone().specialization(expression, None, span);
                    let result = self.nest(frame).await;
                    result
                }?;
                self.with(|this| this.specialized_sizes.insert(node, handle))?;
                Ok(handle)
            }
        }
    }
}
