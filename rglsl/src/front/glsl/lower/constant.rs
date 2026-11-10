use alloc::vec::Vec;

use rglsl_sema::constant::Value;
use rglsl_sema::types::{Type as GlslType, TypeKind};

use super::{internal, Lowerer, Result};
use crate::{Expression, Handle, Literal, Span};

pub(super) const fn literal(value: Value) -> Literal {
    match value {
        Value::Bool(value) => Literal::Bool(value),
        Value::Int(value) => Literal::I32(value),
        Value::Uint(value) => Literal::U32(value),
        Value::Float(value) => Literal::F32(value as f32),
        Value::Double(value) => Literal::F64(value),
    }
}

pub(super) enum Shape {
    Literal(Value),
    Compose(Vec<(GlslType, usize, usize)>),
}

pub(super) fn shape(
    ty: &GlslType,
    values: &[Value],
    registry: &rglsl_sema::TypeRegistry,
) -> Option<Shape> {
    if let Some(element) = ty.element_type().filter(|_| ty.is_array()) {
        let size = usize::try_from(element.flattened_size(registry)?).ok()?;
        let count = usize::try_from(ty.length()?).ok()?;
        let parts = (0..count)
            .map(|index| Some((element.clone(), index.checked_mul(size)?, size)))
            .collect::<Option<Vec<_>>>()?;
        return Some(Shape::Compose(parts));
    }
    match ty.kind {
        TypeKind::Scalar(_) => values.first().copied().map(Shape::Literal),
        TypeKind::Vector { scalar, size } => Some(Shape::Compose(
            (0..usize::from(size))
                .map(|index| (GlslType::scalar(scalar), index, 1))
                .collect(),
        )),
        TypeKind::Matrix {
            scalar,
            columns,
            rows,
        } => Some(Shape::Compose(
            (0..usize::from(columns))
                .map(|index| {
                    (
                        GlslType::vector(scalar, rows),
                        index * usize::from(rows),
                        usize::from(rows),
                    )
                })
                .collect(),
        )),
        TypeKind::Struct(id) => {
            let structure = registry.structure(id)?;
            let mut offset = 0_usize;
            let mut parts = Vec::with_capacity(structure.members.len());
            for member in &structure.members {
                let size = usize::try_from(member.ty.flattened_size(registry)?).ok()?;
                parts.push((member.ty.clone(), offset, size));
                offset = offset.checked_add(size)?;
            }
            Some(Shape::Compose(parts))
        }
        _ => None,
    }
}

impl Lowerer<'_> {
    pub(super) fn global_constant(
        &mut self,
        ty: &GlslType,
        values: &[Value],
        span: Span,
    ) -> Result<Handle<Expression>> {
        let analysis = self.analysis;
        match shape(ty, values, &analysis.types).ok_or_else(|| internal(span))? {
            Shape::Literal(value) => Ok(self
                .module
                .global_expressions
                .append(Expression::Literal(literal(value)), span)),
            Shape::Compose(parts) => {
                let mut components = Vec::with_capacity(parts.len());
                for (part, start, size) in parts {
                    let end = start.checked_add(size).ok_or_else(|| internal(span))?;
                    let slice = values.get(start..end).ok_or_else(|| internal(span))?;
                    components.push(self.global_constant(&part, slice, span)?);
                }
                let ir = self.ir_type(ty, span)?;
                Ok(self
                    .module
                    .global_expressions
                    .append(Expression::Compose { ty: ir, components }, span))
            }
        }
    }
}
