use alloc::vec::Vec;

use rglsl_ast::ast::Expression as AstExpression;

use super::function::FunctionLowerer;
use super::{internal, Result};
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

    fn hit_object_trace(
        &mut self,
        arguments: &[AstExpression],
        motion: bool,
        at: Span,
    ) -> Result<(HitObjectTrace, Option<ReorderHint>)> {
        let (payload, operands) = arguments.split_last().ok_or_else(|| internal(at))?;
        let operands: Vec<_> = self.ray_operands(operands)?;
        let (fixed, rest) = operands.split_at_checked(10).ok_or_else(|| internal(at))?;
        let &[acceleration_structure, flags, cull_mask, sbt_offset, sbt_stride, miss_index, origin, tmin, direction, tmax] =
            fixed
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
        match *self.ray_operands(arguments)?.as_slice() {
            [] => Ok(None),
            [hint, bits] => Ok(Some(ReorderHint { hint, bits })),
            _ => Err(internal(at)),
        }
    }

    pub(super) fn hit_object_call(
        &mut self,
        name: &str,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Option<Handle<Expression>>>> {
        if let Some(value) = match name {
            "fetchMicroTriangleVertexPositionNV" => Some(MicroTriangleVertexValue::Position),
            "fetchMicroTriangleVertexBarycentricNV" => Some(MicroTriangleVertexValue::Barycentric),
            _ => None,
        } {
            let [acceleration_structure, instance_id, geometry_index, primitive_index, barycentric] =
                *self.ray_operands(arguments)?.as_slice()
            else {
                return Err(internal(at));
            };
            let result = self.add(
                Expression::FetchMicroTriangleVertex {
                    acceleration_structure,
                    instance_id,
                    geometry_index,
                    primitive_index,
                    barycentric,
                    value,
                },
                at,
            )?;
            return Ok(Some(Some(result)));
        }
        let Some((stem, kind)) = split_kind(name) else {
            return Ok(None);
        };
        if !stem.starts_with("hitObject") && stem != "reorderThread" {
            return Ok(None);
        }
        if stem == "reorderThread" {
            if let [ref hint, ref bits] = *arguments {
                let hint = self.rvalue(hint)?;
                let bits = self.rvalue(bits)?;
                self.push(Statement::ReorderThread { kind, hint, bits }, at);
                return Ok(Some(None));
            }
        }
        let (object, rest) = arguments.split_first().ok_or_else(|| internal(at))?;
        let object = self.ray_query_pointer(object)?;
        if let Some(value) = hit_object_value(stem) {
            self.generate_value_type(value);
            let result = self.add(Expression::HitObjectGet { object, value }, at)?;
            if let [ref output] = *rest {
                let place = self.place(output)?;
                self.store(&place, result, at)?;
                return Ok(Some(None));
            }
            return Ok(Some(Some(result)));
        }
        let fun = match stem {
            "hitObjectTraceRay" | "hitObjectTraceRayMotion" => {
                let (trace, hint) =
                    self.hit_object_trace(rest, stem == "hitObjectTraceRayMotion", at)?;
                if hint.is_some() {
                    return Err(internal(at));
                }
                HitObjectFunction::TraceRay(trace)
            }
            "hitObjectTraceReorderExecute" | "hitObjectTraceMotionReorderExecute" => {
                let (trace, hint) =
                    self.hit_object_trace(rest, stem == "hitObjectTraceMotionReorderExecute", at)?;
                HitObjectFunction::TraceReorderExecute { trace, hint }
            }
            "hitObjectRecordHit"
            | "hitObjectRecordHitMotion"
            | "hitObjectRecordHitWithIndex"
            | "hitObjectRecordHitWithIndexMotion" => {
                let with_index = stem.starts_with("hitObjectRecordHitWithIndex");
                let motion = stem.ends_with("Motion");
                let (attributes, operands) = rest.split_last().ok_or_else(|| internal(at))?;
                let operands = self.ray_operands(operands)?;
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
                    [acceleration_structure, instance_id, primitive_id, geometry_index, hit_kind, index] => {
                        (
                            acceleration_structure,
                            instance_id,
                            primitive_id,
                            geometry_index,
                            hit_kind,
                            HitObjectSbtRecord::Index(index),
                        )
                    }
                    [acceleration_structure, instance_id, primitive_id, geometry_index, hit_kind, offset, stride] => {
                        (
                            acceleration_structure,
                            instance_id,
                            primitive_id,
                            geometry_index,
                            hit_kind,
                            HitObjectSbtRecord::OffsetStride { offset, stride },
                        )
                    }
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
            "hitObjectRecordMiss" | "hitObjectRecordMissMotion" => {
                let operands = self.ray_operands(rest)?;
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
            "hitObjectRecordEmpty" => HitObjectFunction::RecordEmpty,
            "hitObjectRecordFromQuery" => {
                let [ref query, ref sbt_record_index, ref attributes, ref hit_kind @ ..] = *rest
                else {
                    return Err(internal(at));
                };
                let query = self.ray_query_pointer(query)?;
                let sbt_record_index = self.rvalue(sbt_record_index)?;
                let attributes = self.located(attributes, ATTRIBUTES, at)?;
                let hit_kind = match *hit_kind {
                    [] => None,
                    [ref hit_kind] => Some(self.rvalue(hit_kind)?),
                    _ => return Err(internal(at)),
                };
                HitObjectFunction::RecordFromQuery {
                    query,
                    sbt_record_index,
                    attributes,
                    hit_kind,
                }
            }
            "hitObjectExecuteShader" => {
                let [ref payload] = *rest else {
                    return Err(internal(at));
                };
                HitObjectFunction::ExecuteShader {
                    payload: self.located(payload, PAYLOADS, at)?,
                }
            }
            "hitObjectReorderExecute" => {
                let (payload, hint) = rest.split_last().ok_or_else(|| internal(at))?;
                let hint = self.hint(hint, at)?;
                HitObjectFunction::ReorderExecute {
                    payload: self.located(payload, PAYLOADS, at)?,
                    hint,
                }
            }
            "hitObjectGetAttributes" => {
                let [ref attributes] = *rest else {
                    return Err(internal(at));
                };
                HitObjectFunction::GetAttributes {
                    attributes: self.located(attributes, ATTRIBUTES, at)?,
                }
            }
            "hitObjectSetShaderBindingTableRecordIndex" => {
                let [ref index] = *rest else {
                    return Err(internal(at));
                };
                HitObjectFunction::SetShaderBindingTableRecordIndex {
                    index: self.rvalue(index)?,
                }
            }
            "reorderThread" => HitObjectFunction::ReorderThread {
                hint: self.hint(rest, at)?,
            },
            _ => return Ok(None),
        };
        self.push(Statement::HitObject { object, fun }, at);
        Ok(Some(None))
    }
}
