use alloc::vec::Vec;

use spirv::Op;

use crate::arena::Handle;
use crate::back::spv::{Block, BlockContext, Error, Instruction, Writer};
use crate::{HitObjectFunction, HitObjectKind, HitObjectValue, ReorderHint};

const fn pick(kind: HitObjectKind, nv: Op, ext: Op) -> Op {
    match kind {
        HitObjectKind::Nv => nv,
        HitObjectKind::Ext => ext,
    }
}

impl Writer {
    fn require_motion_blur(&mut self) -> Result<(), Error> {
        self.require_any(
            "ray tracing motion blur",
            &[spirv::Capability::RayTracingMotionBlurNV],
        )?;
        self.use_extension("SPV_NV_ray_tracing_motion_blur");
        Ok(())
    }

    pub(in super::super) fn require_micromap_fetch(&mut self) -> Result<(), Error> {
        self.require_any(
            "displacement micromap fetches",
            &[spirv::Capability::DisplacementMicromapNV],
        )?;
        self.use_extension("SPV_NV_displacement_micromap");
        Ok(())
    }
}

impl BlockContext<'_> {
    fn hit_object_kind(&self, object: Handle<crate::Expression>) -> Result<HitObjectKind, Error> {
        let inner = self.fun_info[object]
            .ty
            .inner_with(&self.ir_module.types)
            .pointer_base_type()
            .map(|base| base.inner_with(&self.ir_module.types).clone());
        match inner {
            Some(crate::TypeInner::HitObject { kind }) => Ok(kind),
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
            Some(hint) => self.ids(&hint.operands()),
            None => Ok(Vec::new()),
        }
    }

    fn trace_ids(&mut self, trace: &crate::HitObjectTrace) -> Result<Vec<spirv::Word>, Error> {
        let mut operands = alloc::vec![self.get_handle_id(trace.acceleration_structure)?];
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
        .chain(core::iter::once(trace.payload))
        .collect();
        operands.extend(self.ids(&rest)?);
        Ok(operands)
    }

    pub(in super::super) fn write_hit_object_function(
        &mut self,
        object: Handle<crate::Expression>,
        function: &HitObjectFunction,
        block: &mut Block,
    ) -> Result<(), Error> {
        let kind = self.hit_object_kind(object)?;
        self.writer.require_ray_tracing()?;
        self.writer.require_hit_objects(kind)?;
        let mut operands = alloc::vec![self.cached.get(object)?];
        let op = match *function {
            HitObjectFunction::TraceRay(ref trace) => {
                operands.extend(self.trace_ids(trace)?);
                if trace.time.is_some() {
                    self.writer.require_motion_blur()?;
                    pick(
                        kind,
                        Op::HitObjectTraceRayMotionNV,
                        Op::HitObjectTraceRayMotionEXT,
                    )
                } else {
                    pick(kind, Op::HitObjectTraceRayNV, Op::HitObjectTraceRayEXT)
                }
            }
            HitObjectFunction::TraceReorderExecute { ref trace, hint } => {
                operands.extend(self.trace_ids(trace)?);
                operands.extend(self.hint_ids(hint)?);
                if trace.time.is_some() {
                    self.writer.require_motion_blur()?;
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
                operands.push(self.get_handle_id(acceleration_structure)?);
                let rest: Vec<_> = [instance_id, primitive_id, geometry_index, hit_kind]
                    .into_iter()
                    .chain(sbt_record.operands())
                    .chain([origin, tmin, direction, tmax])
                    .chain(time)
                    .chain(core::iter::once(attributes))
                    .collect();
                operands.extend(self.ids(&rest)?);
                if time.is_some() {
                    self.writer.require_motion_blur()?;
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
                    self.writer.require_motion_blur()?;
                    pick(
                        kind,
                        Op::HitObjectRecordMissMotionNV,
                        Op::HitObjectRecordMissMotionEXT,
                    )
                } else {
                    pick(kind, Op::HitObjectRecordMissNV, Op::HitObjectRecordMissEXT)
                }
            }
            HitObjectFunction::RecordEmpty => pick(
                kind,
                Op::HitObjectRecordEmptyNV,
                Op::HitObjectRecordEmptyEXT,
            ),
            HitObjectFunction::RecordFromQuery {
                query,
                sbt_record_index,
                attributes,
                hit_kind,
            } => {
                self.writer.require_ray_queries()?;
                let rest: Vec<_> = [query, sbt_record_index, attributes]
                    .into_iter()
                    .chain(hit_kind)
                    .collect();
                operands.extend(self.ids(&rest)?);
                Op::HitObjectRecordFromQueryEXT
            }
            HitObjectFunction::ExecuteShader { payload } => {
                operands.push(self.cached.get(payload)?);
                pick(
                    kind,
                    Op::HitObjectExecuteShaderNV,
                    Op::HitObjectExecuteShaderEXT,
                )
            }
            HitObjectFunction::ReorderExecute { payload, hint } => {
                operands.push(self.cached.get(payload)?);
                operands.extend(self.hint_ids(hint)?);
                Op::HitObjectReorderExecuteShaderEXT
            }
            HitObjectFunction::GetAttributes { attributes } => {
                operands.push(self.cached.get(attributes)?);
                pick(
                    kind,
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
                    kind,
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
        kind: HitObjectKind,
        hint: Handle<crate::Expression>,
        bits: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        self.writer.require_ray_tracing()?;
        self.writer.require_hit_objects(kind)?;
        let operands = self.ids(&[hint, bits])?;
        let op = pick(
            kind,
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
        let kind = self.hit_object_kind(object)?;
        self.writer.require_ray_tracing()?;
        self.writer.require_hit_objects(kind)?;
        let op = match value {
            Hv::IsEmpty => pick(kind, Op::HitObjectIsEmptyNV, Op::HitObjectIsEmptyEXT),
            Hv::IsHit => pick(kind, Op::HitObjectIsHitNV, Op::HitObjectIsHitEXT),
            Hv::IsMiss => pick(kind, Op::HitObjectIsMissNV, Op::HitObjectIsMissEXT),
            Hv::RayTMin => pick(kind, Op::HitObjectGetRayTMinNV, Op::HitObjectGetRayTMinEXT),
            Hv::RayTMax => pick(kind, Op::HitObjectGetRayTMaxNV, Op::HitObjectGetRayTMaxEXT),
            Hv::RayFlags => Op::HitObjectGetRayFlagsEXT,
            Hv::WorldRayOrigin => pick(
                kind,
                Op::HitObjectGetWorldRayOriginNV,
                Op::HitObjectGetWorldRayOriginEXT,
            ),
            Hv::WorldRayDirection => pick(
                kind,
                Op::HitObjectGetWorldRayDirectionNV,
                Op::HitObjectGetWorldRayDirectionEXT,
            ),
            Hv::ObjectRayOrigin => pick(
                kind,
                Op::HitObjectGetObjectRayOriginNV,
                Op::HitObjectGetObjectRayOriginEXT,
            ),
            Hv::ObjectRayDirection => pick(
                kind,
                Op::HitObjectGetObjectRayDirectionNV,
                Op::HitObjectGetObjectRayDirectionEXT,
            ),
            Hv::ObjectToWorld => pick(
                kind,
                Op::HitObjectGetObjectToWorldNV,
                Op::HitObjectGetObjectToWorldEXT,
            ),
            Hv::WorldToObject => pick(
                kind,
                Op::HitObjectGetWorldToObjectNV,
                Op::HitObjectGetWorldToObjectEXT,
            ),
            Hv::InstanceCustomIndex => pick(
                kind,
                Op::HitObjectGetInstanceCustomIndexNV,
                Op::HitObjectGetInstanceCustomIndexEXT,
            ),
            Hv::InstanceId => pick(
                kind,
                Op::HitObjectGetInstanceIdNV,
                Op::HitObjectGetInstanceIdEXT,
            ),
            Hv::GeometryIndex => pick(
                kind,
                Op::HitObjectGetGeometryIndexNV,
                Op::HitObjectGetGeometryIndexEXT,
            ),
            Hv::PrimitiveIndex => pick(
                kind,
                Op::HitObjectGetPrimitiveIndexNV,
                Op::HitObjectGetPrimitiveIndexEXT,
            ),
            Hv::HitKind => pick(kind, Op::HitObjectGetHitKindNV, Op::HitObjectGetHitKindEXT),
            Hv::CurrentTime => {
                self.writer.require_motion_blur()?;
                pick(
                    kind,
                    Op::HitObjectGetCurrentTimeNV,
                    Op::HitObjectGetCurrentTimeEXT,
                )
            }
            Hv::ShaderBindingTableRecordIndex => pick(
                kind,
                Op::HitObjectGetShaderBindingTableRecordIndexNV,
                Op::HitObjectGetShaderBindingTableRecordIndexEXT,
            ),
            Hv::ShaderRecordBufferHandle => pick(
                kind,
                Op::HitObjectGetShaderRecordBufferHandleNV,
                Op::HitObjectGetShaderRecordBufferHandleEXT,
            ),
            Hv::ClusterId => {
                self.writer.require_cluster_acceleration_structure()?;
                Op::HitObjectGetClusterIdNV
            }
            Hv::SpherePosition | Hv::SphereRadius | Hv::IsSphereHit => {
                self.writer.require_sphere_geometry()?;
                match value {
                    Hv::SpherePosition => Op::HitObjectGetSpherePositionNV,
                    Hv::SphereRadius => Op::HitObjectGetSphereRadiusNV,
                    _ => Op::HitObjectIsSphereHitNV,
                }
            }
            Hv::LssPositions | Hv::LssRadii | Hv::IsLssHit => {
                self.writer.require_lss_geometry()?;
                match value {
                    Hv::LssPositions => Op::HitObjectGetLSSPositionsNV,
                    Hv::LssRadii => Op::HitObjectGetLSSRadiiNV,
                    _ => Op::HitObjectIsLSSHitNV,
                }
            }
            Hv::TriangleVertexPositions => {
                self.writer.require_any(
                    "hit object vertex positions",
                    &[spirv::Capability::RayTracingPositionFetchKHR],
                )?;
                self.writer
                    .use_extension("SPV_KHR_ray_tracing_position_fetch");
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

    #[allow(clippy::too_many_arguments)]
    pub(in super::super) fn write_fetch_micro_triangle_vertex(
        &mut self,
        acceleration_structure: Handle<crate::Expression>,
        instance_id: Handle<crate::Expression>,
        geometry_index: Handle<crate::Expression>,
        primitive_index: Handle<crate::Expression>,
        barycentric: Handle<crate::Expression>,
        value: crate::MicroTriangleVertexValue,
        result_type_id: spirv::Word,
        block: &mut Block,
    ) -> Result<spirv::Word, Error> {
        self.writer.require_micromap_fetch()?;
        let mut operands = alloc::vec![self.get_handle_id(acceleration_structure)?];
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
