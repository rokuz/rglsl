use alloc::vec::Vec;

use rglsl_ast::ast::Expression as AstExpression;
use rglsl_types::stack::recurse;

use rglsl_sema::builtins::kind::{
    HitObject, HitObjectFlavor, HitObjectValue as Value, MicroTriangleValue,
};

use super::function::FunctionLowerer;
use super::{Result, internal};
use crate::{
    Expression, Handle, HitObjectFunction, HitObjectSbtRecord, HitObjectTrace, HitObjectValue,
    MicroTriangleVertexValue, PredeclaredType, ReorderHint, Span, Statement, VectorSize,
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

const fn hit_object_flavor(flavor: HitObjectFlavor) -> crate::HitObjectFlavor {
    match flavor {
        HitObjectFlavor::Nv => crate::HitObjectFlavor::Nv,
        HitObjectFlavor::Ext => crate::HitObjectFlavor::Ext,
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
    ) -> Result<crate::RayTracingData> {
        self.ray_data(expression, set, false, at)
    }

    fn hit_object_trace(
        &mut self,
        arguments: &[AstExpression],
        motion: bool,
        at: Span,
    ) -> Result<(HitObjectTrace, Option<ReorderHint>)> {
        let (payload, operands) = arguments.split_last().ok_or_else(|| internal(at))?;
        let operands: Vec<_> = recurse(|| self.ray_operands(operands))?;
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
        let payload = self.located(payload, PAYLOADS, at)?;
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

    fn hint(&mut self, arguments: &[AstExpression], at: Span) -> Result<Option<ReorderHint>> {
        match *{ recurse(|| self.ray_operands(arguments)) }?.as_slice() {
            [] => Ok(None),
            [hint, bits] => Ok(Some(ReorderHint { hint, bits })),
            _ => Err(internal(at)),
        }
    }

    pub(super) fn micro_triangle(
        &mut self,
        value: MicroTriangleValue,
        arguments: &[AstExpression],
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
            ] = *{ recurse(|| self.ray_operands(arguments)) }?.as_slice()
            else {
                return Err(internal(at));
            };
            let result = (self.add(
                Expression::FetchMicroTriangleVertex {
                    acceleration_structure,
                    instance_id,
                    geometry_index,
                    primitive_index,
                    barycentric,
                    value,
                },
                at,
            ))?;
            Ok(Some(result))
        }
    }

    pub(super) fn hit_object_call(
        &mut self,
        flavor: HitObjectFlavor,
        call: HitObject,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        if call == HitObject::ReorderThread
            && let [ref hint, ref bits] = *arguments
        {
            let hint = recurse(|| self.rvalue(hint))?;
            let bits = recurse(|| self.rvalue(bits))?;
            self.push(
                Statement::ReorderThread {
                    flavor: hit_object_flavor(flavor),
                    hint,
                    bits,
                },
                at,
            );
            return Ok(None);
        }
        let (object, rest) = arguments.split_first().ok_or_else(|| internal(at))?;
        let object = recurse(|| self.ray_query_pointer(object))?;
        if let HitObject::Value(value) = call {
            let value = hit_object_value(value);
            self.generate_value_type(value);
            let result = self.add(Expression::HitObjectGet { object, value }, at)?;
            if let [ref output] = *rest {
                let place = recurse(|| self.place(output))?;
                self.store(&place, result, at)?;
                return Ok(None);
            }
            return Ok(Some(result));
        }
        let fun = match call {
            HitObject::TraceRay { motion } => {
                let (trace, hint) = recurse(|| self.hit_object_trace(rest, motion, at))?;
                if hint.is_some() {
                    return Err(internal(at));
                }
                HitObjectFunction::TraceRay(trace)
            }
            HitObject::TraceReorderExecute { motion } => {
                let (trace, hint) = recurse(|| self.hit_object_trace(rest, motion, at))?;
                HitObjectFunction::TraceReorderExecute { trace, hint }
            }
            HitObject::RecordHit { with_index, motion } => {
                let (attributes, operands) = rest.split_last().ok_or_else(|| internal(at))?;
                let operands = recurse(|| self.ray_operands(operands))?;
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
                let attributes = self.located(attributes, ATTRIBUTES, at)?;
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
                let operands = recurse(|| self.ray_operands(rest))?;
                let (flags, operands) = match flavor {
                    HitObjectFlavor::Nv => (None, operands.as_slice()),
                    HitObjectFlavor::Ext => {
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
                let query = recurse(|| self.ray_query_pointer(query))?;
                let sbt_record_index = recurse(|| self.rvalue(sbt_record_index))?;
                let attributes = self.located(attributes, ATTRIBUTES, at)?;
                let hit_kind = match *hit_kind {
                    [] => None,
                    [ref hit_kind] => Some(recurse(|| self.rvalue(hit_kind))?),
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
                    payload: self.located(payload, PAYLOADS, at)?,
                }
            }
            HitObject::ReorderExecute => {
                let (payload, hint) = rest.split_last().ok_or_else(|| internal(at))?;
                let hint = recurse(|| self.hint(hint, at))?;
                HitObjectFunction::ReorderExecute {
                    payload: self.located(payload, PAYLOADS, at)?,
                    hint,
                }
            }
            HitObject::GetAttributes => {
                let [ref attributes] = *rest else {
                    return Err(internal(at));
                };
                HitObjectFunction::GetAttributes {
                    attributes: self.located(attributes, ATTRIBUTES, at)?,
                }
            }
            HitObject::SetShaderBindingTableRecordIndex => {
                let [ref index] = *rest else {
                    return Err(internal(at));
                };
                HitObjectFunction::SetShaderBindingTableRecordIndex {
                    index: { recurse(|| self.rvalue(index)) }?,
                }
            }
            HitObject::ReorderThread => HitObjectFunction::ReorderThread {
                hint: { recurse(|| self.hint(rest, at)) }?,
            },
            HitObject::Value(_) => return Err(internal(at)),
        };
        self.push(Statement::HitObject { object, fun }, at);
        Ok(None)
    }
}
