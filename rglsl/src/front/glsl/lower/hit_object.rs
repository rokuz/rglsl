use alloc::vec::Vec;

use rglsl_ast::ast::Expression as AstExpression;

use super::function::FunctionLowerer;
use super::{Result, internal};
use crate::{
    Expression, Handle, HitObjectFunction, HitObjectKind, HitObjectSbtRecord, HitObjectTrace,
    HitObjectValue, MicroTriangleVertexValue, PredeclaredType, ReorderHint, Span, Statement,
    VectorSize,
};

const PAYLOADS: usize = 0;
const ATTRIBUTES: usize = 2;

fn split_kind(name: &str) -> Option<(&str, HitObjectKind)> {
    name.strip_suffix("NV")
        .map(|stem| (stem, HitObjectKind::Nv))
        .or_else(|| {
            name.strip_suffix("EXT")
                .map(|stem| (stem, HitObjectKind::Ext))
        })
}

fn hit_object_value(stem: &str) -> Option<HitObjectValue> {
    use HitObjectValue as Hv;
    Some(match stem {
        "hitObjectIsEmpty" => Hv::IsEmpty,
        "hitObjectIsHit" => Hv::IsHit,
        "hitObjectIsMiss" => Hv::IsMiss,
        "hitObjectGetRayTMin" => Hv::RayTMin,
        "hitObjectGetRayTMax" => Hv::RayTMax,
        "hitObjectGetRayFlags" => Hv::RayFlags,
        "hitObjectGetWorldRayOrigin" => Hv::WorldRayOrigin,
        "hitObjectGetWorldRayDirection" => Hv::WorldRayDirection,
        "hitObjectGetObjectRayOrigin" => Hv::ObjectRayOrigin,
        "hitObjectGetObjectRayDirection" => Hv::ObjectRayDirection,
        "hitObjectGetObjectToWorld" => Hv::ObjectToWorld,
        "hitObjectGetWorldToObject" => Hv::WorldToObject,
        "hitObjectGetInstanceCustomIndex" => Hv::InstanceCustomIndex,
        "hitObjectGetInstanceId" => Hv::InstanceId,
        "hitObjectGetGeometryIndex" => Hv::GeometryIndex,
        "hitObjectGetPrimitiveIndex" => Hv::PrimitiveIndex,
        "hitObjectGetHitKind" => Hv::HitKind,
        "hitObjectGetCurrentTime" => Hv::CurrentTime,
        "hitObjectGetShaderBindingTableRecordIndex" => Hv::ShaderBindingTableRecordIndex,
        "hitObjectGetShaderRecordBufferHandle" => Hv::ShaderRecordBufferHandle,
        "hitObjectGetClusterId" => Hv::ClusterId,
        "hitObjectGetSpherePosition" => Hv::SpherePosition,
        "hitObjectGetSphereRadius" => Hv::SphereRadius,
        "hitObjectIsSphereHit" => Hv::IsSphereHit,
        "hitObjectIsLSSHit" => Hv::IsLssHit,
        "hitObjectGetLSSPositions" => Hv::LssPositions,
        "hitObjectGetLSSRadii" => Hv::LssRadii,
        "hitObjectGetIntersectionTriangleVertexPositions" => Hv::TriangleVertexPositions,
        _ => return None,
    })
}

#[derive(Clone, Copy, PartialEq, Eq)]
enum HitObjectCall {
    TraceRay,
    TraceReorderExecute,
    RecordHit,
    RecordMiss,
    RecordEmpty,
    RecordFromQuery,
    ExecuteShader,
    ReorderExecute,
    GetAttributes,
    SetShaderBindingTableRecordIndex,
    ReorderThread,
}

fn hit_object_call(stem: &str) -> Option<HitObjectCall> {
    Some(match stem {
        "hitObjectTraceRay" | "hitObjectTraceRayMotion" => HitObjectCall::TraceRay,
        "hitObjectTraceReorderExecute" | "hitObjectTraceMotionReorderExecute" => {
            HitObjectCall::TraceReorderExecute
        }
        "hitObjectRecordHit"
        | "hitObjectRecordHitMotion"
        | "hitObjectRecordHitWithIndex"
        | "hitObjectRecordHitWithIndexMotion" => HitObjectCall::RecordHit,
        "hitObjectRecordMiss" | "hitObjectRecordMissMotion" => HitObjectCall::RecordMiss,
        "hitObjectRecordEmpty" => HitObjectCall::RecordEmpty,
        "hitObjectRecordFromQuery" => HitObjectCall::RecordFromQuery,
        "hitObjectExecuteShader" => HitObjectCall::ExecuteShader,
        "hitObjectReorderExecute" => HitObjectCall::ReorderExecute,
        "hitObjectGetAttributes" => HitObjectCall::GetAttributes,
        "hitObjectSetShaderBindingTableRecordIndex" => {
            HitObjectCall::SetShaderBindingTableRecordIndex
        }
        "reorderThread" => HitObjectCall::ReorderThread,
        _ => return None,
    })
}

fn micro_triangle_value(name: &str) -> Option<MicroTriangleVertexValue> {
    match name {
        "fetchMicroTriangleVertexPositionNV" => Some(MicroTriangleVertexValue::Position),
        "fetchMicroTriangleVertexBarycentricNV" => Some(MicroTriangleVertexValue::Barycentric),
        _ => None,
    }
}

pub(super) fn is_hit_object_call(name: &str) -> bool {
    micro_triangle_value(name).is_some()
        || split_kind(name).is_some_and(|(stem, _)| {
            hit_object_value(stem).is_some() || hit_object_call(stem).is_some()
        })
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

    pub(super) async fn hit_object_call(
        self,
        name: &'b str,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Option<Option<Handle<Expression>>>> {
        if let Some(value) = micro_triangle_value(name) {
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
            return Ok(Some(Some(result)));
        }
        let Some((stem, kind)) = split_kind(name) else {
            return Ok(None);
        };
        let value = hit_object_value(stem);
        let call = hit_object_call(stem);
        if value.is_none() && call.is_none() {
            return Ok(None);
        }
        if call == Some(HitObjectCall::ReorderThread)
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
            return Ok(Some(None));
        }
        let (object, rest) = arguments.split_first().ok_or_else(|| internal(at))?;
        let object = {
            let frame = self.clone().ray_query_pointer(object);
            self.nest(frame).await
        }?;
        if let Some(value) = value {
            self.with(|this| this.generate_value_type(value))?;
            let result =
                self.with(|this| this.add(Expression::HitObjectGet { object, value }, at))??;
            if let [ref output] = *rest {
                let place = {
                    let frame = self.clone().place(output);
                    self.nest(frame).await
                }?;
                self.with(|this| this.store(&place, result, at))??;
                return Ok(Some(None));
            }
            return Ok(Some(Some(result)));
        }
        let fun = match call {
            Some(HitObjectCall::TraceRay) => {
                let (trace, hint) = {
                    let frame =
                        self.clone()
                            .hit_object_trace(rest, stem == "hitObjectTraceRayMotion", at);
                    self.nest(frame).await
                }?;
                if hint.is_some() {
                    return Err(internal(at));
                }
                HitObjectFunction::TraceRay(trace)
            }
            Some(HitObjectCall::TraceReorderExecute) => {
                let (trace, hint) = {
                    let frame = self.clone().hit_object_trace(
                        rest,
                        stem == "hitObjectTraceMotionReorderExecute",
                        at,
                    );
                    self.nest(frame).await
                }?;
                HitObjectFunction::TraceReorderExecute { trace, hint }
            }
            Some(HitObjectCall::RecordHit) => {
                let with_index = stem.starts_with("hitObjectRecordHitWithIndex");
                let motion = stem.ends_with("Motion");
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
            Some(HitObjectCall::RecordMiss) => {
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
            Some(HitObjectCall::RecordEmpty) => HitObjectFunction::RecordEmpty,
            Some(HitObjectCall::RecordFromQuery) => {
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
            Some(HitObjectCall::ExecuteShader) => {
                let [ref payload] = *rest else {
                    return Err(internal(at));
                };
                HitObjectFunction::ExecuteShader {
                    payload: self.with(|this| this.located(payload, PAYLOADS, at))??,
                }
            }
            Some(HitObjectCall::ReorderExecute) => {
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
            Some(HitObjectCall::GetAttributes) => {
                let [ref attributes] = *rest else {
                    return Err(internal(at));
                };
                HitObjectFunction::GetAttributes {
                    attributes: self.with(|this| this.located(attributes, ATTRIBUTES, at))??,
                }
            }
            Some(HitObjectCall::SetShaderBindingTableRecordIndex) => {
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
            Some(HitObjectCall::ReorderThread) => HitObjectFunction::ReorderThread {
                hint: {
                    let frame = self.clone().hint(rest, at);
                    self.nest(frame).await
                }?,
            },
            None => return Err(internal(at)),
        };
        self.with(|this| this.push(Statement::HitObject { object, fun }, at))?;
        Ok(Some(None))
    }
}
