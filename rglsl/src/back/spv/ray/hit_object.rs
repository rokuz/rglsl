use alloc::vec::Vec;

use spirv::Op;

use crate::arena::Handle;
use crate::back::spv::{Block, BlockContext, Error, Instruction, feature};
use crate::{HitObjectFlavor, HitObjectFunction, HitObjectValue, ReorderHint};

const fn pick(flavor: HitObjectFlavor, nv: Op, ext: Op) -> Op {
    match flavor {
        HitObjectFlavor::Nv => nv,
        HitObjectFlavor::Ext => ext,
    }
}

pub(in super::super) struct MicroTriangleVertexQuery {
    pub(in super::super) acceleration_structure: Handle<crate::Expression>,
    pub(in super::super) instance_id: Handle<crate::Expression>,
    pub(in super::super) geometry_index: Handle<crate::Expression>,
    pub(in super::super) primitive_index: Handle<crate::Expression>,
    pub(in super::super) barycentric: Handle<crate::Expression>,
}

impl BlockContext<'_> {
    fn hit_object_flavor(
        &self,
        object: Handle<crate::Expression>,
    ) -> Result<HitObjectFlavor, Error> {
        let inner = self.fun_info[object]
            .ty
            .inner_with(&self.ir_module.types)
            .pointer_base_type()
            .map(|base| base.inner_with(&self.ir_module.types).clone());
        match inner {
            Some(crate::TypeInner::HitObject { flavor }) => Ok(flavor),
            _ => Err(Error::Validation(
                "a hit object operand is not a hit object",
            )),
        }
    }

    fn ids(&mut self, handles: &[Handle<crate::Expression>]) -> Result<Vec<spirv::Word>, Error> {
        handles
            .iter()
            .map(|&handle| self.cached.get(handle))
            .collect()
    }

    fn hint_ids(&mut self, hint: Option<ReorderHint>) -> Result<Vec<spirv::Word>, Error> {
        match hint {
            Some(hint) => self.ids(&[hint.hint, hint.bits]),
            None => Ok(Vec::new()),
        }
    }

    fn trace_ids(
        &mut self,
        trace: &crate::HitObjectTrace,
        block: &mut Block,
    ) -> Result<Vec<spirv::Word>, Error> {
        let mut operands = alloc::vec![self.get_handle_id(trace.acceleration_structure, block)?];
        let rest: Vec<_> = [
            trace.flags,
            trace.cull_mask,
            trace.sbt_offset,
            trace.sbt_stride,
            trace.miss_index,
            trace.origin,
            trace.tmin,
            trace.direction,
            trace.tmax,
        ]
        .into_iter()
        .chain(trace.time)
        .collect();
        operands.extend(self.ids(&rest)?);
        operands.push(self.ray_tracing_data_id(trace.payload)?);
        Ok(operands)
    }

    pub(in super::super) fn write_hit_object_function(
        &mut self,
        object: Handle<crate::Expression>,
        function: &HitObjectFunction,
        block: &mut Block,
    ) -> Result<(), Error> {
        let flavor = self.hit_object_flavor(object)?;
        self.writer.require_ray_tracing()?;
        self.writer.require_hit_objects(flavor)?;
        let mut operands = alloc::vec![self.cached.get(object)?];
        let op = match *function {
            HitObjectFunction::TraceRay(ref trace) => {
                operands.extend(self.trace_ids(trace, block)?);
                if trace.time.is_some() {
                    self.writer.require(&feature::RAY_TRACING_MOTION_BLUR)?;
                    pick(
                        flavor,
                        Op::HitObjectTraceRayMotionNV,
                        Op::HitObjectTraceRayMotionEXT,
                    )
                } else {
                    pick(flavor, Op::HitObjectTraceRayNV, Op::HitObjectTraceRayEXT)
                }
            }
            HitObjectFunction::TraceReorderExecute { ref trace, hint } => {
                operands.extend(self.trace_ids(trace, block)?);
                operands.extend(self.hint_ids(hint)?);
                if trace.time.is_some() {
                    self.writer.require(&feature::RAY_TRACING_MOTION_BLUR)?;
                    Op::HitObjectTraceMotionReorderExecuteEXT
                } else {
                    Op::HitObjectTraceReorderExecuteEXT
                }
            }
            HitObjectFunction::RecordHit {
                acceleration_structure,
                instance_id,
                primitive_id,
                geometry_index,
                hit_kind,
                ref sbt_record,
                origin,
                tmin,
                direction,
                tmax,
                time,
                attributes,
            } => {
                operands.push(self.get_handle_id(acceleration_structure, block)?);
                let mut rest = Vec::from([instance_id, primitive_id, geometry_index, hit_kind]);
                sbt_record.for_each_operand(|operand| rest.push(operand));
                rest.extend([origin, tmin, direction, tmax]);
                rest.extend(time);
                operands.extend(self.ids(&rest)?);
                operands.push(self.ray_tracing_data_id(attributes)?);
                if time.is_some() {
                    self.writer.require(&feature::RAY_TRACING_MOTION_BLUR)?;
                }
                match (sbt_record, time) {
                    (&crate::HitObjectSbtRecord::OffsetStride { .. }, None) => {
                        Op::HitObjectRecordHitNV
                    }
                    (&crate::HitObjectSbtRecord::OffsetStride { .. }, Some(_)) => {
                        Op::HitObjectRecordHitMotionNV
                    }
                    (&crate::HitObjectSbtRecord::Index(_), None) => {
                        Op::HitObjectRecordHitWithIndexNV
                    }
                    (&crate::HitObjectSbtRecord::Index(_), Some(_)) => {
                        Op::HitObjectRecordHitWithIndexMotionNV
                    }
                }
            }
            HitObjectFunction::RecordMiss {
                flags,
                miss_index,
                origin,
                tmin,
                direction,
                tmax,
                time,
            } => {
                let rest: Vec<_> = flags
                    .into_iter()
                    .chain([miss_index, origin, tmin, direction, tmax])
                    .chain(time)
                    .collect();
                operands.extend(self.ids(&rest)?);
                if time.is_some() {
                    self.writer.require(&feature::RAY_TRACING_MOTION_BLUR)?;
                    pick(
                        flavor,
                        Op::HitObjectRecordMissMotionNV,
                        Op::HitObjectRecordMissMotionEXT,
                    )
                } else {
                    pick(
                        flavor,
                        Op::HitObjectRecordMissNV,
                        Op::HitObjectRecordMissEXT,
                    )
                }
            }
            HitObjectFunction::RecordEmpty => pick(
                flavor,
                Op::HitObjectRecordEmptyNV,
                Op::HitObjectRecordEmptyEXT,
            ),
            HitObjectFunction::RecordFromQuery {
                query,
                sbt_record_index,
                attributes,
                hit_kind,
            } => {
                self.writer.require(&feature::RAY_QUERY)?;
                operands.extend(self.ids(&[query, sbt_record_index])?);
                operands.push(self.ray_tracing_data_id(attributes)?);
                if let Some(hit_kind) = hit_kind {
                    operands.push(self.cached.get(hit_kind)?);
                }
                Op::HitObjectRecordFromQueryEXT
            }
            HitObjectFunction::ExecuteShader { payload } => {
                operands.push(self.ray_tracing_data_id(payload)?);
                pick(
                    flavor,
                    Op::HitObjectExecuteShaderNV,
                    Op::HitObjectExecuteShaderEXT,
                )
            }
            HitObjectFunction::ReorderExecute { payload, hint } => {
                operands.push(self.ray_tracing_data_id(payload)?);
                operands.extend(self.hint_ids(hint)?);
                Op::HitObjectReorderExecuteShaderEXT
            }
            HitObjectFunction::GetAttributes { attributes } => {
                operands.push(self.ray_tracing_data_id(attributes)?);
                pick(
                    flavor,
                    Op::HitObjectGetAttributesNV,
                    Op::HitObjectGetAttributesEXT,
                )
            }
            HitObjectFunction::SetShaderBindingTableRecordIndex { index } => {
                operands.push(self.cached.get(index)?);
                Op::HitObjectSetShaderBindingTableRecordIndexEXT
            }
            HitObjectFunction::ReorderThread { hint } => {
                operands.extend(self.hint_ids(hint)?);
                pick(
                    flavor,
                    Op::ReorderThreadWithHitObjectNV,
                    Op::ReorderThreadWithHitObjectEXT,
                )
            }
        };
        block.body.push(Instruction::ray(op, None, &operands));
        Ok(())
    }

    pub(in super::super) fn write_reorder_thread(
        &mut self,
        flavor: HitObjectFlavor,
        hint: Handle<crate::Expression>,
        bits: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        self.writer.require_ray_tracing()?;
        self.writer.require_hit_objects(flavor)?;
        let operands = self.ids(&[hint, bits])?;
        let op = pick(
            flavor,
            Op::ReorderThreadWithHintNV,
            Op::ReorderThreadWithHintEXT,
        );
        block.body.push(Instruction::ray(op, None, &operands));
        Ok(())
    }

    pub(in super::super) fn write_hit_object_get(
        &mut self,
        object: Handle<crate::Expression>,
        value: HitObjectValue,
        result_type_id: spirv::Word,
        block: &mut Block,
    ) -> Result<spirv::Word, Error> {
        use HitObjectValue as Hv;
        let flavor = self.hit_object_flavor(object)?;
        self.writer.require_ray_tracing()?;
        self.writer.require_hit_objects(flavor)?;
        let op = match value {
            Hv::IsEmpty => pick(flavor, Op::HitObjectIsEmptyNV, Op::HitObjectIsEmptyEXT),
            Hv::IsHit => pick(flavor, Op::HitObjectIsHitNV, Op::HitObjectIsHitEXT),
            Hv::IsMiss => pick(flavor, Op::HitObjectIsMissNV, Op::HitObjectIsMissEXT),
            Hv::RayTMin => pick(
                flavor,
                Op::HitObjectGetRayTMinNV,
                Op::HitObjectGetRayTMinEXT,
            ),
            Hv::RayTMax => pick(
                flavor,
                Op::HitObjectGetRayTMaxNV,
                Op::HitObjectGetRayTMaxEXT,
            ),
            Hv::RayFlags => Op::HitObjectGetRayFlagsEXT,
            Hv::WorldRayOrigin => pick(
                flavor,
                Op::HitObjectGetWorldRayOriginNV,
                Op::HitObjectGetWorldRayOriginEXT,
            ),
            Hv::WorldRayDirection => pick(
                flavor,
                Op::HitObjectGetWorldRayDirectionNV,
                Op::HitObjectGetWorldRayDirectionEXT,
            ),
            Hv::ObjectRayOrigin => pick(
                flavor,
                Op::HitObjectGetObjectRayOriginNV,
                Op::HitObjectGetObjectRayOriginEXT,
            ),
            Hv::ObjectRayDirection => pick(
                flavor,
                Op::HitObjectGetObjectRayDirectionNV,
                Op::HitObjectGetObjectRayDirectionEXT,
            ),
            Hv::ObjectToWorld => pick(
                flavor,
                Op::HitObjectGetObjectToWorldNV,
                Op::HitObjectGetObjectToWorldEXT,
            ),
            Hv::WorldToObject => pick(
                flavor,
                Op::HitObjectGetWorldToObjectNV,
                Op::HitObjectGetWorldToObjectEXT,
            ),
            Hv::InstanceCustomIndex => pick(
                flavor,
                Op::HitObjectGetInstanceCustomIndexNV,
                Op::HitObjectGetInstanceCustomIndexEXT,
            ),
            Hv::InstanceId => pick(
                flavor,
                Op::HitObjectGetInstanceIdNV,
                Op::HitObjectGetInstanceIdEXT,
            ),
            Hv::GeometryIndex => pick(
                flavor,
                Op::HitObjectGetGeometryIndexNV,
                Op::HitObjectGetGeometryIndexEXT,
            ),
            Hv::PrimitiveIndex => pick(
                flavor,
                Op::HitObjectGetPrimitiveIndexNV,
                Op::HitObjectGetPrimitiveIndexEXT,
            ),
            Hv::HitKind => pick(
                flavor,
                Op::HitObjectGetHitKindNV,
                Op::HitObjectGetHitKindEXT,
            ),
            Hv::CurrentTime => {
                self.writer.require(&feature::RAY_TRACING_MOTION_BLUR)?;
                pick(
                    flavor,
                    Op::HitObjectGetCurrentTimeNV,
                    Op::HitObjectGetCurrentTimeEXT,
                )
            }
            Hv::ShaderBindingTableRecordIndex => pick(
                flavor,
                Op::HitObjectGetShaderBindingTableRecordIndexNV,
                Op::HitObjectGetShaderBindingTableRecordIndexEXT,
            ),
            Hv::ShaderRecordBufferHandle => pick(
                flavor,
                Op::HitObjectGetShaderRecordBufferHandleNV,
                Op::HitObjectGetShaderRecordBufferHandleEXT,
            ),
            Hv::ClusterId => {
                self.writer
                    .require(&feature::CLUSTER_ACCELERATION_STRUCTURE)?;
                Op::HitObjectGetClusterIdNV
            }
            Hv::SpherePosition => {
                self.writer.require(&feature::SPHERE_GEOMETRY)?;
                Op::HitObjectGetSpherePositionNV
            }
            Hv::SphereRadius => {
                self.writer.require(&feature::SPHERE_GEOMETRY)?;
                Op::HitObjectGetSphereRadiusNV
            }
            Hv::IsSphereHit => {
                self.writer.require(&feature::SPHERE_GEOMETRY)?;
                Op::HitObjectIsSphereHitNV
            }
            Hv::LssPositions => {
                self.writer.require(&feature::LSS_GEOMETRY)?;
                Op::HitObjectGetLSSPositionsNV
            }
            Hv::LssRadii => {
                self.writer.require(&feature::LSS_GEOMETRY)?;
                Op::HitObjectGetLSSRadiiNV
            }
            Hv::IsLssHit => {
                self.writer.require(&feature::LSS_GEOMETRY)?;
                Op::HitObjectIsLSSHitNV
            }
            Hv::TriangleVertexPositions => {
                self.writer.require(&feature::RAY_TRACING_POSITION_FETCH)?;
                Op::HitObjectGetIntersectionTriangleVertexPositionsEXT
            }
        };
        let object_id = self.cached.get(object)?;
        let id = self.gen_id();
        block.body.push(Instruction::ray(
            op,
            Some((result_type_id, id)),
            &[object_id],
        ));
        Ok(id)
    }

    pub(in super::super) fn write_fetch_micro_triangle_vertex(
        &mut self,
        params: MicroTriangleVertexQuery,
        value: crate::MicroTriangleVertexValue,
        result_type_id: spirv::Word,
        block: &mut Block,
    ) -> Result<spirv::Word, Error> {
        let MicroTriangleVertexQuery {
            acceleration_structure,
            instance_id,
            geometry_index,
            primitive_index,
            barycentric,
        } = params;
        self.writer.require(&feature::DISPLACEMENT_MICROMAP_FETCH)?;
        let mut operands = alloc::vec![self.get_handle_id(acceleration_structure, block)?];
        operands.extend(self.ids(&[instance_id, geometry_index, primitive_index, barycentric])?);
        let op = match value {
            crate::MicroTriangleVertexValue::Position => Op::FetchMicroTriangleVertexPositionNV,
            crate::MicroTriangleVertexValue::Barycentric => {
                Op::FetchMicroTriangleVertexBarycentricNV
            }
        };
        let id = self.gen_id();
        block
            .body
            .push(Instruction::ray(op, Some((result_type_id, id)), &operands));
        Ok(id)
    }
}
