use spirv::Op;

use crate::back::spv::{Block, BlockContext, Error, Instruction};

impl BlockContext<'_> {
    fn ray_tracing_data_id(&mut self, data: crate::RayTracingData) -> Result<spirv::Word, Error> {
        match data {
            crate::RayTracingData::Pointer(pointer) => self.cached.get(pointer),
            crate::RayTracingData::Location(location) => {
                let location = i32::try_from(location)
                    .map_err(|_| Error::Validation("a ray tracing location is too large"))?;
                Ok(self
                    .writer
                    .get_constant_scalar(crate::Literal::I32(location)))
            }
        }
    }

    pub(in super::super) fn write_ray_tracing_pipeline_function(
        &mut self,
        function: &crate::RayPipelineFunction,
        block: &mut Block,
    ) -> Result<Option<Instruction>, Error> {
        self.writer.require_ray_tracing()?;
        match *function {
            crate::RayPipelineFunction::TraceRay {
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
            } => {
                let mut operands = alloc::vec![self.get_handle_id(acceleration_structure)?];
                for operand in [
                    flags, cull_mask, sbt_offset, sbt_stride, miss_index, origin, tmin, direction,
                    tmax,
                ]
                .into_iter()
                .chain(time)
                {
                    operands.push(self.cached.get(operand)?);
                }
                operands.push(self.ray_tracing_data_id(payload)?);
                let op = match (time, payload) {
                    (Some(_), _) => {
                        self.writer.require_any(
                            "ray tracing motion blur",
                            &[spirv::Capability::RayTracingMotionBlurNV],
                        )?;
                        self.writer.use_extension("SPV_NV_ray_tracing_motion_blur");
                        Op::TraceRayMotionNV
                    }
                    (None, crate::RayTracingData::Pointer(_)) => Op::TraceRayKHR,
                    (None, crate::RayTracingData::Location(_)) => Op::TraceNV,
                };
                block.body.push(Instruction::ray(op, None, &operands));
                Ok(None)
            }
            crate::RayPipelineFunction::ExecuteCallable { sbt_index, data } => {
                let operands = [self.cached.get(sbt_index)?, self.ray_tracing_data_id(data)?];
                let op = match data {
                    crate::RayTracingData::Pointer(_) => Op::ExecuteCallableKHR,
                    crate::RayTracingData::Location(_) => Op::ExecuteCallableNV,
                };
                block.body.push(Instruction::ray(op, None, &operands));
                Ok(None)
            }
            crate::RayPipelineFunction::ReportIntersection {
                hit_t,
                hit_kind,
                result,
            } => {
                let operands = [self.cached.get(hit_t)?, self.cached.get(hit_kind)?];
                let id = self.gen_id();
                self.cached.set(result, id)?;
                let bool_type_id = self.writer.get_bool_type_id();
                block.body.push(Instruction::ray(
                    Op::ReportIntersectionKHR,
                    Some((bool_type_id, id)),
                    &operands,
                ));
                Ok(None)
            }
            crate::RayPipelineFunction::IgnoreIntersection { nv: true } => {
                block
                    .body
                    .push(Instruction::ray(Op::IgnoreIntersectionNV, None, &[]));
                Ok(None)
            }
            crate::RayPipelineFunction::TerminateRay { nv: true } => {
                block
                    .body
                    .push(Instruction::ray(Op::TerminateRayNV, None, &[]));
                Ok(None)
            }
            crate::RayPipelineFunction::IgnoreIntersection { nv: false } => {
                Ok(Some(Instruction::ray(Op::IgnoreIntersectionKHR, None, &[])))
            }
            crate::RayPipelineFunction::TerminateRay { nv: false } => {
                Ok(Some(Instruction::ray(Op::TerminateRayKHR, None, &[])))
            }
        }
    }
}
