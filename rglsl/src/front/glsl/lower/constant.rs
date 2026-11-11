use alloc::vec::Vec;

use rglsl_sema::constant::Value;
use rglsl_sema::types::{ArraySize, Type as GlslType, TypeKind};

use super::{internal, Lowerer, Result};
use crate::{Expression, Handle, Literal, Span};

pub(super) fn literal(value: Value) -> Literal {
    match value {
        Value::Bool(value) => Literal::Bool(value),
        Value::Int(value) => Literal::I32(value),
        Value::Uint(value) => Literal::U32(value),
        Value::Float(value) => Literal::F32(value as f32),
        Value::Double(value) => Literal::F64(value),
        Value::Int16(value) => Literal::I16(value),
        Value::Uint16(value) => Literal::U16(value),
        Value::Int64(value) => Literal::I64(value),
        Value::Uint64(value) => Literal::U64(value),
        Value::Float16(value) => Literal::F16(half::f16::from_f64(value)),
        Value::Int8(value) => Literal::I8(value),
        Value::Uint8(value) => Literal::U8(value),
        Value::BFloat16(value) => Literal::BF16(crate::proc::small_float::bf16_from_f64(value)),
        Value::FloatE4M3(value) => Literal::FE4M3(crate::proc::small_float::fe4m3_from_f64(value)),
        Value::FloatE5M2(value) => Literal::FE5M2(crate::proc::small_float::fe5m2_from_f64(value)),
        Value::FloatE2M1(value) => Literal::FE2M1(crate::proc::small_float::fe2m1_from_f64(value)),
        Value::FloatE3M2(value) => Literal::FE3M2(crate::proc::small_float::fe3m2_from_f64(value)),
        Value::FloatE2M3(value) => Literal::FE2M3(crate::proc::small_float::fe2m3_from_f64(value)),
        Value::FloatUE8M0(value) => {
            Literal::FUE8M0(crate::proc::small_float::fue8m0_from_f64(value))
        }
        Value::FloatMXINT8(value) => {
            Literal::FMXINT8(crate::proc::small_float::fmxint8_from_f64(value))
        }
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
        TypeKind::LongVector {
            scalar,
            size: ArraySize::Sized(size),
        }
        | TypeKind::CooperativeVector {
            scalar,
            size: ArraySize::Sized(size),
        } => Some(Shape::Compose(
            (0..usize::try_from(size).ok()?)
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
        super::function::lowerer_on_heap!(self, |cx| cx.global_constant(
            ty.clone(),
            values.to_vec(),
            span
        ))
    }
}

#[allow(clippy::await_holding_refcell_ref)]
impl<'b, 'a> super::function::LowererCx<'b, 'a> {
    pub(super) async fn global_constant(
        self,
        ty: GlslType,
        values: Vec<Value>,
        span: Span,
    ) -> Result<Handle<Expression>> {
        let values = values.as_slice();
        let ty = &ty;
        let mut this = self.lowerer();
        let analysis = this.analysis;
        match shape(ty, values, &analysis.types).ok_or_else(|| internal(span))? {
            Shape::Literal(value) => Ok(this
                .module
                .global_expressions
                .append(Expression::Literal(literal(value)), span)),
            Shape::Compose(parts) => {
                let mut components = Vec::with_capacity(parts.len());
                for (part, start, size) in parts {
                    let end = start.checked_add(size).ok_or_else(|| internal(span))?;
                    let slice = values.get(start..end).ok_or_else(|| internal(span))?;
                    components.push({
                        let frame =
                            self.clone()
                                .global_constant(part.clone(), slice.to_vec(), span);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?);
                }
                let ir = {
                    let frame = self.clone().ir_type(ty.clone(), span);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                Ok(this
                    .module
                    .global_expressions
                    .append(Expression::Compose { ty: ir, components }, span))
            }
        }
    }
}
