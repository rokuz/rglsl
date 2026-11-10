use spirv::Op;

use super::super::{Block, BlockContext, Error, Instruction};
use crate::arena::Handle;

impl BlockContext<'_> {
    pub(in super::super) fn write_ray_query_function(
        &mut self,
        query: Handle<crate::Expression>,
        function: &crate::RayQueryFunction,
        block: &mut Block,
    ) -> Result<(), Error> {
        self.writer.require_ray_queries()?;
        let query_id = self.cached.get(query)?;
        match *function {
            crate::RayQueryFunction::Initialize {
                acceleration_structure,
                flags,
                cull_mask,
                origin,
                tmin,
                direction,
                tmax,
            } => {
                let acceleration_structure_id = self.get_handle_id(acceleration_structure)?;
                let mut operands = alloc::vec![query_id, acceleration_structure_id];
                for operand in [flags, cull_mask, origin, tmin, direction, tmax] {
                    operands.push(self.cached.get(operand)?);
                }
                block
                    .body
                    .push(Instruction::ray(Op::RayQueryInitializeKHR, None, &operands));
            }
            crate::RayQueryFunction::Proceed { result } => {
                let id = self.gen_id();
                self.cached.set(result, id)?;
                let bool_type_id = self.writer.get_bool_type_id();
                block.body.push(Instruction::ray(
                    Op::RayQueryProceedKHR,
                    Some((bool_type_id, id)),
                    &[query_id],
                ));
            }
            crate::RayQueryFunction::GenerateIntersection { hit_t } => {
                let hit_t_id = self.cached.get(hit_t)?;
                block.body.push(Instruction::ray(
                    Op::RayQueryGenerateIntersectionKHR,
                    None,
                    &[query_id, hit_t_id],
                ));
            }
            crate::RayQueryFunction::ConfirmIntersection => {
                block.body.push(Instruction::ray(
                    Op::RayQueryConfirmIntersectionKHR,
                    None,
                    &[query_id],
                ));
            }
            crate::RayQueryFunction::Terminate => {
                block.body.push(Instruction::ray(
                    Op::RayQueryTerminateKHR,
                    None,
                    &[query_id],
                ));
            }
        }
        Ok(())
    }

    pub(in super::super) fn write_ray_query_get(
        &mut self,
        query: Handle<crate::Expression>,
        value: crate::RayQueryValue,
        result_type_id: spirv::Word,
        block: &mut Block,
    ) -> Result<spirv::Word, Error> {
        use crate::RayQueryIntersectionValue as Iv;
        self.writer.require_ray_queries()?;
        let query_id = self.cached.get(query)?;
        let (op, committed) = match value {
            crate::RayQueryValue::RayFlags => (Op::RayQueryGetRayFlagsKHR, None),
            crate::RayQueryValue::RayTMin => (Op::RayQueryGetRayTMinKHR, None),
            crate::RayQueryValue::WorldRayOrigin => (Op::RayQueryGetWorldRayOriginKHR, None),
            crate::RayQueryValue::WorldRayDirection => (Op::RayQueryGetWorldRayDirectionKHR, None),
            crate::RayQueryValue::CandidateAabbOpaque => {
                (Op::RayQueryGetIntersectionCandidateAABBOpaqueKHR, None)
            }
            crate::RayQueryValue::Intersection { committed, value } => {
                let op = match value {
                    Iv::Type => Op::RayQueryGetIntersectionTypeKHR,
                    Iv::T => Op::RayQueryGetIntersectionTKHR,
                    Iv::InstanceCustomIndex => Op::RayQueryGetIntersectionInstanceCustomIndexKHR,
                    Iv::InstanceId => Op::RayQueryGetIntersectionInstanceIdKHR,
                    Iv::InstanceShaderBindingTableRecordOffset => {
                        Op::RayQueryGetIntersectionInstanceShaderBindingTableRecordOffsetKHR
                    }
                    Iv::GeometryIndex => Op::RayQueryGetIntersectionGeometryIndexKHR,
                    Iv::PrimitiveIndex => Op::RayQueryGetIntersectionPrimitiveIndexKHR,
                    Iv::Barycentrics => Op::RayQueryGetIntersectionBarycentricsKHR,
                    Iv::FrontFace => Op::RayQueryGetIntersectionFrontFaceKHR,
                    Iv::ObjectRayDirection => Op::RayQueryGetIntersectionObjectRayDirectionKHR,
                    Iv::ObjectRayOrigin => Op::RayQueryGetIntersectionObjectRayOriginKHR,
                    Iv::ObjectToWorld => Op::RayQueryGetIntersectionObjectToWorldKHR,
                    Iv::WorldToObject => Op::RayQueryGetIntersectionWorldToObjectKHR,
                    Iv::TriangleVertexPositions => {
                        self.writer.require_any(
                            "ray query vertex positions",
                            &[spirv::Capability::RayQueryPositionFetchKHR],
                        )?;
                        self.writer
                            .use_extension("SPV_KHR_ray_tracing_position_fetch");
                        Op::RayQueryGetIntersectionTriangleVertexPositionsKHR
                    }
                };
                (op, Some(committed))
            }
        };
        let mut operands = alloc::vec![query_id];
        if let Some(committed) = committed {
            let intersection = if committed {
                spirv::RayQueryIntersection::RayQueryCommittedIntersectionKHR
            } else {
                spirv::RayQueryIntersection::RayQueryCandidateIntersectionKHR
            };
            operands.push(self.get_index_constant(intersection as u32));
        }
        let id = self.gen_id();
        block
            .body
            .push(Instruction::ray(op, Some((result_type_id, id)), &operands));
        Ok(id)
    }
}
