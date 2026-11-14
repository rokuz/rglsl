use alloc::vec::Vec;

use rglsl_ast::ast::Expression as AstExpression;

use rglsl_sema::builtins::kind::{
    HitObject, HitObjectFlavor, HitObjectValue as Value, MicroTriangleValue,
};

use super::function::FunctionLowerer;
use super::{Result, internal};
use crate::{
    Expression, Handle, HitObjectFunction, HitObjectKind, HitObjectSbtRecord, HitObjectTrace,
    HitObjectValue, MicroTriangleVertexValue, PredeclaredType, ReorderHint, Span, Statement,
    VectorSize,
};

const PAYLOADS: usize = 0;
const ATTRIBUTES: usize = 2;

const fn hit_object_value(value: Value) -> HitObjectValue {
    match value {
        Value::IsEmpty => HitObjectValue::IsEmpty,
        Value::IsHit => HitObjectValue::IsHit,
        Value::IsMiss => HitObjectValue::IsMiss,
        Value::RayTMin => HitObjectValue::RayTMin,
        Value::RayTMax => HitObjectValue::RayTMax,
        Value::RayFlags => HitObjectValue::RayFlags,
        Value::WorldRayOrigin => HitObjectValue::WorldRayOrigin,
        Value::WorldRayDirection => HitObjectValue::WorldRayDirection,
        Value::ObjectRayOrigin => HitObjectValue::ObjectRayOrigin,
        Value::ObjectRayDirection => HitObjectValue::ObjectRayDirection,
        Value::ObjectToWorld => HitObjectValue::ObjectToWorld,
        Value::WorldToObject => HitObjectValue::WorldToObject,
        Value::InstanceCustomIndex => HitObjectValue::InstanceCustomIndex,
        Value::InstanceId => HitObjectValue::InstanceId,
        Value::GeometryIndex => HitObjectValue::GeometryIndex,
        Value::PrimitiveIndex => HitObjectValue::PrimitiveIndex,
        Value::HitKind => HitObjectValue::HitKind,
        Value::CurrentTime => HitObjectValue::CurrentTime,
        Value::ShaderBindingTableRecordIndex => HitObjectValue::ShaderBindingTableRecordIndex,
        Value::ShaderRecordBufferHandle => HitObjectValue::ShaderRecordBufferHandle,
        Value::ClusterId => HitObjectValue::ClusterId,
        Value::SpherePosition => HitObjectValue::SpherePosition,
        Value::SphereRadius => HitObjectValue::SphereRadius,
        Value::LssPositions => HitObjectValue::LssPositions,
        Value::LssRadii => HitObjectValue::LssRadii,
        Value::IsSphereHit => HitObjectValue::IsSphereHit,
        Value::IsLssHit => HitObjectValue::IsLssHit,
        Value::TriangleVertexPositions => HitObjectValue::TriangleVertexPositions,
    }
}

const fn hit_object_kind(flavor: HitObjectFlavor) -> HitObjectKind {
    match flavor {
        HitObjectFlavor::Nv => HitObjectKind::Nv,
        HitObjectFlavor::Ext => HitObjectKind::Ext,
    }
}

const fn micro_triangle_value(value: MicroTriangleValue) -> MicroTriangleVertexValue {
    match value {
        MicroTriangleValue::Position => MicroTriangleVertexValue::Position,
        MicroTriangleValue::Barycentric => MicroTriangleVertexValue::Barycentric,
    }
}

impl FunctionLowerer<'_, '_> {
    pub(super) fn generate_value_type(&mut self, value: HitObjectValue) {
        match value {
            HitObjectValue::LssPositions => {
                self.generate_lss_array(Some(VectorSize::Tri));
            }
            HitObjectValue::LssRadii => {
                self.generate_lss_array(None);
            }
            HitObjectValue::TriangleVertexPositions => {
                self.lw.module.generate_vertex_return_type();
            }
            _ => {}
        }
    }

    pub(super) fn generate_lss_array(&mut self, size: Option<VectorSize>) {
        self.lw
            .module
            .generate_predeclared_type(PredeclaredType::F32Array {
                size,
                length: crate::proc::LSS_ARRAY_LENGTH,
            });
    }

    fn located(
        &mut self,
        expression: &AstExpression,
        set: usize,
        at: Span,
    ) -> Result<Handle<Expression>> {
        match self.ray_data(expression, set, false, at)? {
            crate::RayTracingData::Pointer(pointer) => Ok(pointer),
            crate::RayTracingData::Location(_) => Err(internal(at)),
        }
    }
}

impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    async fn hit_object_trace(
        self,
        arguments: &'b [AstExpression],
        motion: bool,
        at: Span,
    ) -> Result<(HitObjectTrace, Option<ReorderHint>)> {
        let (payload, operands) = arguments.split_last().ok_or_else(|| internal(at))?;
        let operands: Vec<_> = {
            let frame = self.clone().ray_operands(operands);
            self.nest(frame).await
        }?;
        let (fixed, rest) = operands.split_at_checked(10).ok_or_else(|| internal(at))?;
        let &[
            acceleration_structure,
            flags,
            cull_mask,
            sbt_offset,
            sbt_stride,
            miss_index,
            origin,
            tmin,
            direction,
            tmax,
        ] = fixed
        else {
            return Err(internal(at));
        };
        let (time, rest) = if motion {
            let (time, rest) = rest.split_first().ok_or_else(|| internal(at))?;
            (Some(*time), rest)
        } else {
            (None, rest)
        };
        let hint = match *rest {
            [] => None,
            [hint, bits] => Some(ReorderHint { hint, bits }),
            _ => return Err(internal(at)),
        };
        let payload = self.with(|this| this.located(payload, PAYLOADS, at))??;
        Ok((
            HitObjectTrace {
                acceleration_structure,
                flags,
                cull_mask,
                sbt_offset,
                sbt_stride,
                miss_index,
                origin,
                tmin,
                direction,
                tmax,
                time,
                payload,
            },
            hint,
        ))
    }

    async fn hint(self, arguments: &'b [AstExpression], at: Span) -> Result<Option<ReorderHint>> {
        match *{
            let frame = self.clone().ray_operands(arguments);
            self.nest(frame).await
        }?
        .as_slice()
        {
            [] => Ok(None),
            [hint, bits] => Ok(Some(ReorderHint { hint, bits })),
            _ => Err(internal(at)),
        }
    }

    pub(super) async fn micro_triangle(
        self,
        value: MicroTriangleValue,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let value = micro_triangle_value(value);
        {
            let [
                acceleration_structure,
                instance_id,
                geometry_index,
                primitive_index,
                barycentric,
            ] = *{
                let frame = self.clone().ray_operands(arguments);
                self.nest(frame).await
            }?
            .as_slice()
            else {
                return Err(internal(at));
            };
            let result = self.with(|this| {
                this.add(
                    Expression::FetchMicroTriangleVertex {
                        acceleration_structure,
                        instance_id,
                        geometry_index,
                        primitive_index,
                        barycentric,
                        value,
                    },
                    at,
                )
            })??;
            Ok(Some(result))
        }
    }

    pub(super) async fn hit_object_call(
        self,
        flavor: HitObjectFlavor,
        call: HitObject,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let kind = hit_object_kind(flavor);
        if call == HitObject::ReorderThread
            && let [ref hint, ref bits] = *arguments
        {
            let hint = {
                let frame = self.clone().rvalue(hint);
                self.nest(frame).await
            }?;
            let bits = {
                let frame = self.clone().rvalue(bits);
                self.nest(frame).await
            }?;
            self.with(|this| this.push(Statement::ReorderThread { kind, hint, bits }, at))?;
            return Ok(None);
        }
        let (object, rest) = arguments.split_first().ok_or_else(|| internal(at))?;
        let object = {
            let frame = self.clone().ray_query_pointer(object);
            self.nest(frame).await
        }?;
        if let HitObject::Value(value) = call {
            let value = hit_object_value(value);
            self.with(|this| this.generate_value_type(value))?;
            let result =
                self.with(|this| this.add(Expression::HitObjectGet { object, value }, at))??;
            if let [ref output] = *rest {
                let place = {
                    let frame = self.clone().place(output);
                    self.nest(frame).await
                }?;
                self.with(|this| this.store(&place, result, at))??;
                return Ok(None);
            }
            return Ok(Some(result));
        }
        let fun = match call {
            HitObject::TraceRay { motion } => {
                let (trace, hint) = {
                    let frame = self.clone().hit_object_trace(rest, motion, at);
                    self.nest(frame).await
                }?;
                if hint.is_some() {
                    return Err(internal(at));
                }
                HitObjectFunction::TraceRay(trace)
            }
            HitObject::TraceReorderExecute { motion } => {
                let (trace, hint) = {
                    let frame = self.clone().hit_object_trace(rest, motion, at);
                    self.nest(frame).await
                }?;
                HitObjectFunction::TraceReorderExecute { trace, hint }
            }
            HitObject::RecordHit { with_index, motion } => {
                let (attributes, operands) = rest.split_last().ok_or_else(|| internal(at))?;
                let operands = {
                    let frame = self.clone().ray_operands(operands);
                    self.nest(frame).await
                }?;
                let (head, tail) = operands
                    .split_at_checked(if with_index { 6 } else { 7 })
                    .ok_or_else(|| internal(at))?;
                let (
                    acceleration_structure,
                    instance_id,
                    primitive_id,
                    geometry_index,
                    hit_kind,
                    sbt_record,
                ) = match *head {
                    [
                        acceleration_structure,
                        instance_id,
                        primitive_id,
                        geometry_index,
                        hit_kind,
                        index,
                    ] => (
                        acceleration_structure,
                        instance_id,
                        primitive_id,
                        geometry_index,
                        hit_kind,
                        HitObjectSbtRecord::Index(index),
                    ),
                    [
                        acceleration_structure,
                        instance_id,
                        primitive_id,
                        geometry_index,
                        hit_kind,
                        offset,
                        stride,
                    ] => (
                        acceleration_structure,
                        instance_id,
                        primitive_id,
                        geometry_index,
                        hit_kind,
                        HitObjectSbtRecord::OffsetStride { offset, stride },
                    ),
                    _ => return Err(internal(at)),
                };
                let (origin, tmin, direction, tmax, time) = match (tail, motion) {
                    (&[origin, tmin, direction, tmax], false) => {
                        (origin, tmin, direction, tmax, None)
                    }
                    (&[origin, tmin, direction, tmax, time], true) => {
                        (origin, tmin, direction, tmax, Some(time))
                    }
                    _ => return Err(internal(at)),
                };
                let attributes = self.with(|this| this.located(attributes, ATTRIBUTES, at))??;
                HitObjectFunction::RecordHit {
                    acceleration_structure,
                    instance_id,
                    primitive_id,
                    geometry_index,
                    hit_kind,
                    sbt_record,
                    origin,
                    tmin,
                    direction,
                    tmax,
                    time,
                    attributes,
                }
            }
            HitObject::RecordMiss => {
                let operands = {
                    let frame = self.clone().ray_operands(rest);
                    self.nest(frame).await
                }?;
                let (flags, operands) = match kind {
                    HitObjectKind::Nv => (None, operands.as_slice()),
                    HitObjectKind::Ext => {
                        let (flags, operands) =
                            operands.split_first().ok_or_else(|| internal(at))?;
                        (Some(*flags), operands)
                    }
                };
                let (miss_index, origin, tmin, direction, tmax, time) = match *operands {
                    [miss_index, origin, tmin, direction, tmax] => {
                        (miss_index, origin, tmin, direction, tmax, None)
                    }
                    [miss_index, origin, tmin, direction, tmax, time] => {
                        (miss_index, origin, tmin, direction, tmax, Some(time))
                    }
                    _ => return Err(internal(at)),
                };
                HitObjectFunction::RecordMiss {
                    flags,
                    miss_index,
                    origin,
                    tmin,
                    direction,
                    tmax,
                    time,
                }
            }
            HitObject::RecordEmpty => HitObjectFunction::RecordEmpty,
            HitObject::RecordFromQuery => {
                let [
                    ref query,
                    ref sbt_record_index,
                    ref attributes,
                    ref hit_kind @ ..,
                ] = *rest
                else {
                    return Err(internal(at));
                };
                let query = {
                    let frame = self.clone().ray_query_pointer(query);
                    self.nest(frame).await
                }?;
                let sbt_record_index = {
                    let frame = self.clone().rvalue(sbt_record_index);
                    self.nest(frame).await
                }?;
                let attributes = self.with(|this| this.located(attributes, ATTRIBUTES, at))??;
                let hit_kind = match *hit_kind {
                    [] => None,
                    [ref hit_kind] => Some({
                        let frame = self.clone().rvalue(hit_kind);
                        self.nest(frame).await
                    }?),
                    _ => return Err(internal(at)),
                };
                HitObjectFunction::RecordFromQuery {
                    query,
                    sbt_record_index,
                    attributes,
                    hit_kind,
                }
            }
            HitObject::ExecuteShader => {
                let [ref payload] = *rest else {
                    return Err(internal(at));
                };
                HitObjectFunction::ExecuteShader {
                    payload: self.with(|this| this.located(payload, PAYLOADS, at))??,
                }
            }
            HitObject::ReorderExecute => {
                let (payload, hint) = rest.split_last().ok_or_else(|| internal(at))?;
                let hint = {
                    let frame = self.clone().hint(hint, at);
                    self.nest(frame).await
                }?;
                HitObjectFunction::ReorderExecute {
                    payload: self.with(|this| this.located(payload, PAYLOADS, at))??,
                    hint,
                }
            }
            HitObject::GetAttributes => {
                let [ref attributes] = *rest else {
                    return Err(internal(at));
                };
                HitObjectFunction::GetAttributes {
                    attributes: self.with(|this| this.located(attributes, ATTRIBUTES, at))??,
                }
            }
            HitObject::SetShaderBindingTableRecordIndex => {
                let [ref index] = *rest else {
                    return Err(internal(at));
                };
                HitObjectFunction::SetShaderBindingTableRecordIndex {
                    index: {
                        let frame = self.clone().rvalue(index);
                        self.nest(frame).await
                    }?,
                }
            }
            HitObject::ReorderThread => HitObjectFunction::ReorderThread {
                hint: {
                    let frame = self.clone().hint(rest, at);
                    self.nest(frame).await
                }?,
            },
            HitObject::Value(_) => return Err(internal(at)),
        };
        self.with(|this| this.push(Statement::HitObject { object, fun }, at))?;
        Ok(None)
    }
}
