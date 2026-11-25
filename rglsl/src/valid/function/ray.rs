use super::{BlockContext, FunctionError};
use crate::arena::Handle;
use crate::span::{AddSpan as _, WithSpan};

#[derive(Clone, Copy)]
enum RayOperand {
    Int,
    Uint,
    Float,
    Vector,
}

impl super::super::Validator {
    fn is_ray_query_pointer(
        &self,
        query: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<bool, WithSpan<FunctionError>> {
        Ok(
            if let crate::TypeInner::Pointer { base, .. } =
                *context.resolve_type_inner(query, &self.valid_expression_set)?
            {
                matches!(context.types[base].inner, crate::TypeInner::RayQuery)
            } else {
                false
            },
        )
    }

    pub(super) fn validate_ray_query(
        &mut self,
        query: Handle<crate::Expression>,
        fun: &crate::RayQueryFunction,
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        if !self.is_ray_query_pointer(query, context)? {
            return Err(FunctionError::InvalidRayQueryExpression(query)
                .with_span_static(span, "invalid query expression"));
        }
        match *fun {
            crate::RayQueryFunction::Initialize {
                acceleration_structure,
                flags,
                cull_mask,
                origin,
                tmin,
                direction,
                tmax,
            } => {
                self.validate_acceleration_structure(acceleration_structure, context)?;
                for (operand, kind) in [
                    (flags, RayOperand::Uint),
                    (cull_mask, RayOperand::Uint),
                    (origin, RayOperand::Vector),
                    (tmin, RayOperand::Float),
                    (direction, RayOperand::Vector),
                    (tmax, RayOperand::Float),
                ] {
                    self.validate_ray_operand(operand, kind, context)?;
                }
            }
            crate::RayQueryFunction::Proceed { result } => {
                self.emit_expression(result, context)?;
            }
            crate::RayQueryFunction::GenerateIntersection { hit_t } => {
                if !matches!(
                    *context.resolve_type_inner(hit_t, &self.valid_expression_set)?,
                    crate::TypeInner::Scalar(crate::Scalar {
                        kind: crate::ScalarKind::Float,
                        width: _,
                    })
                ) {
                    return Err(FunctionError::InvalidHitDistanceType(hit_t)
                        .with_span_static(span, "invalid hit_t"));
                }
            }
            crate::RayQueryFunction::ConfirmIntersection | crate::RayQueryFunction::Terminate => {}
        }
        Ok(())
    }

    pub(super) fn validate_hit_object(
        &self,
        object: Handle<crate::Expression>,
        fun: &crate::HitObjectFunction,
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<super::super::ShaderStages, WithSpan<FunctionError>> {
        let mut stages = super::super::ShaderStages::RAY_GENERATION
            | super::super::ShaderStages::CLOSEST_HIT
            | super::super::ShaderStages::MISS;
        let flavor = if let crate::TypeInner::Pointer { base, .. } =
            *context.resolve_type_inner(object, &self.valid_expression_set)?
            && let crate::TypeInner::HitObject { flavor } = context.types[base].inner
        {
            Some(flavor)
        } else {
            None
        };
        let Some(flavor) = flavor else {
            return Err(FunctionError::InvalidHitObjectExpression(object)
                .with_span_static(span, "invalid hit object expression"));
        };
        self.validate_hit_object_function(flavor, fun, span, context)?;
        if matches!(
            *fun,
            crate::HitObjectFunction::ReorderThread { .. }
                | crate::HitObjectFunction::ReorderExecute { .. }
                | crate::HitObjectFunction::TraceReorderExecute { .. }
        ) {
            stages &= super::super::ShaderStages::RAY_GENERATION;
        }
        Ok(stages)
    }

    pub(super) fn validate_reorder_thread(
        &self,
        hint: Handle<crate::Expression>,
        bits: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<super::super::ShaderStages, WithSpan<FunctionError>> {
        self.validate_ray_operand(hint, RayOperand::Uint, context)?;
        self.validate_ray_operand(bits, RayOperand::Uint, context)?;
        Ok(super::super::ShaderStages::RAY_GENERATION)
    }

    pub(super) fn validate_ray_pipeline_function(
        &mut self,
        fun: &crate::RayPipelineFunction,
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<super::super::ShaderStages, WithSpan<FunctionError>> {
        use crate::AddressSpace;
        match *fun {
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
                self.validate_acceleration_structure(acceleration_structure, context)?;
                for (operand, kind) in [
                    (flags, RayOperand::Uint),
                    (cull_mask, RayOperand::Uint),
                    (sbt_offset, RayOperand::Uint),
                    (sbt_stride, RayOperand::Uint),
                    (miss_index, RayOperand::Uint),
                    (origin, RayOperand::Vector),
                    (tmin, RayOperand::Float),
                    (direction, RayOperand::Vector),
                    (tmax, RayOperand::Float),
                ]
                .into_iter()
                .chain(time.map(|time| (time, RayOperand::Float)))
                {
                    self.validate_ray_operand(operand, kind, context)?;
                }
                if time.is_some() && payload.pointer().is_none() {
                    return Err(FunctionError::InvalidPayloadType
                        .with_span_static(span, "a motion trace needs a payload variable"));
                }
                self.validate_ray_data(
                    payload,
                    &[AddressSpace::RayPayload, AddressSpace::IncomingRayPayload],
                    span,
                    context,
                )?;
                Ok(super::super::ShaderStages::RAY_GENERATION
                    | super::super::ShaderStages::CLOSEST_HIT
                    | super::super::ShaderStages::MISS)
            }
            crate::RayPipelineFunction::ExecuteCallable { sbt_index, data } => {
                self.validate_ray_operand(sbt_index, RayOperand::Uint, context)?;
                self.validate_ray_data(
                    data,
                    &[
                        AddressSpace::CallableData,
                        AddressSpace::IncomingCallableData,
                    ],
                    span,
                    context,
                )?;
                Ok(super::super::ShaderStages::RAY_GENERATION
                    | super::super::ShaderStages::CLOSEST_HIT
                    | super::super::ShaderStages::MISS
                    | super::super::ShaderStages::CALLABLE)
            }
            crate::RayPipelineFunction::ReportIntersection {
                hit_t,
                hit_kind,
                result,
            } => {
                self.validate_ray_operand(hit_t, RayOperand::Float, context)?;
                self.validate_ray_operand(hit_kind, RayOperand::Uint, context)?;
                self.emit_expression(result, context)?;
                Ok(super::super::ShaderStages::INTERSECTION)
            }
            crate::RayPipelineFunction::IgnoreIntersection { .. }
            | crate::RayPipelineFunction::TerminateRay { .. } => {
                Ok(super::super::ShaderStages::ANY_HIT)
            }
        }
    }

    fn validate_acceleration_structure(
        &self,
        handle: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        if matches!(
            *context.resolve_type_inner(handle, &self.valid_expression_set)?,
            crate::TypeInner::AccelerationStructure
        ) {
            Ok(())
        } else {
            Err(FunctionError::InvalidAccelerationStructure(handle)
                .with_span_handle(handle, context.expressions))
        }
    }

    fn validate_ray_operand(
        &self,
        handle: Handle<crate::Expression>,
        kind: RayOperand,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        let inner = context.resolve_type_inner(handle, &self.valid_expression_set)?;
        let valid = match kind {
            RayOperand::Int => *inner == crate::TypeInner::Scalar(crate::Scalar::I32),
            RayOperand::Uint => *inner == crate::TypeInner::Scalar(crate::Scalar::U32),
            RayOperand::Float => *inner == crate::TypeInner::Scalar(crate::Scalar::F32),
            RayOperand::Vector => {
                *inner
                    == crate::TypeInner::Vector {
                        size: crate::VectorSize::Tri,
                        scalar: crate::Scalar::F32,
                    }
            }
        };
        if valid {
            Ok(())
        } else {
            Err(FunctionError::InvalidRayOperand(handle)
                .with_span_handle(handle, context.expressions))
        }
    }

    fn validate_hit_object_data(
        &self,
        data: crate::RayTracingData,
        space: crate::AddressSpace,
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::AddressSpace as As;
        let spaces: &[As] = match space {
            As::RayPayload => &[As::RayPayload, As::IncomingRayPayload],
            _ => &[space],
        };
        match data {
            crate::RayTracingData::Pointer(pointer) => {
                self.validate_ray_data_pointer(pointer, spaces, context)
            }
            crate::RayTracingData::Location(_) => Err(FunctionError::InvalidPayloadType
                .with_span_static(span, "a hit object needs a variable")),
            crate::RayTracingData::Argument { index, .. } => {
                self.validate_ray_data_argument(index, span, context)
            }
        }
    }

    fn validate_hit_object_function(
        &self,
        flavor: crate::HitObjectFlavor,
        fun: &crate::HitObjectFunction,
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::{HitObjectFlavor as Hk, HitObjectFunction as Hf};
        let attributes = crate::AddressSpace::HitObjectAttribute { flavor };
        let ext_only = |valid: bool| {
            if valid {
                Ok(())
            } else {
                Err(FunctionError::InvalidHitObjectOperation(flavor)
                    .with_span_static(span, "invalid hit object operation"))
            }
        };
        let trace = |trace: &crate::HitObjectTrace| -> Result<(), WithSpan<FunctionError>> {
            self.validate_acceleration_structure(trace.acceleration_structure, context)?;
            for (operand, operand_kind) in [
                (trace.flags, RayOperand::Uint),
                (trace.cull_mask, RayOperand::Uint),
                (trace.sbt_offset, RayOperand::Uint),
                (trace.sbt_stride, RayOperand::Uint),
                (trace.miss_index, RayOperand::Uint),
                (trace.origin, RayOperand::Vector),
                (trace.tmin, RayOperand::Float),
                (trace.direction, RayOperand::Vector),
                (trace.tmax, RayOperand::Float),
            ]
            .into_iter()
            .chain(trace.time.map(|time| (time, RayOperand::Float)))
            {
                self.validate_ray_operand(operand, operand_kind, context)?;
            }
            self.validate_hit_object_data(
                trace.payload,
                crate::AddressSpace::RayPayload,
                span,
                context,
            )
        };
        let hint = |hint: Option<crate::ReorderHint>| -> Result<(), WithSpan<FunctionError>> {
            match hint {
                Some(hint) => hint.try_for_each_operand(|operand| {
                    self.validate_ray_operand(operand, RayOperand::Uint, context)
                }),
                None => Ok(()),
            }
        };
        match *fun {
            Hf::TraceRay(ref data) => trace(data),
            Hf::TraceReorderExecute {
                trace: ref data,
                hint: reorder,
            } => {
                ext_only(flavor == Hk::Ext)?;
                trace(data)?;
                hint(reorder)
            }
            Hf::RecordHit {
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
                attributes: pointer,
            } => {
                ext_only(flavor == Hk::Nv)?;
                self.validate_acceleration_structure(acceleration_structure, context)?;
                for (operand, operand_kind) in [
                    (instance_id, RayOperand::Int),
                    (primitive_id, RayOperand::Int),
                    (geometry_index, RayOperand::Int),
                    (hit_kind, RayOperand::Uint),
                    (origin, RayOperand::Vector),
                    (tmin, RayOperand::Float),
                    (direction, RayOperand::Vector),
                    (tmax, RayOperand::Float),
                ] {
                    self.validate_ray_operand(operand, operand_kind, context)?;
                }
                sbt_record.try_for_each_operand(|operand| {
                    self.validate_ray_operand(operand, RayOperand::Uint, context)
                })?;
                if let Some(time) = time {
                    self.validate_ray_operand(time, RayOperand::Float, context)?;
                }
                self.validate_hit_object_data(pointer, attributes, span, context)
            }
            Hf::RecordMiss {
                flags,
                miss_index,
                origin,
                tmin,
                direction,
                tmax,
                time,
            } => {
                ext_only(flags.is_some() == (flavor == Hk::Ext))?;
                for (operand, operand_kind) in [
                    (miss_index, RayOperand::Uint),
                    (origin, RayOperand::Vector),
                    (tmin, RayOperand::Float),
                    (direction, RayOperand::Vector),
                    (tmax, RayOperand::Float),
                ]
                .into_iter()
                .chain(flags.map(|flags| (flags, RayOperand::Uint)))
                .chain(time.map(|time| (time, RayOperand::Float)))
                {
                    self.validate_ray_operand(operand, operand_kind, context)?;
                }
                Ok(())
            }
            Hf::RecordEmpty => Ok(()),
            Hf::RecordFromQuery {
                query,
                sbt_record_index,
                attributes: pointer,
                hit_kind,
            } => {
                ext_only(flavor == Hk::Ext)?;
                if !self.is_ray_query_pointer(query, context)? {
                    return Err(FunctionError::InvalidRayQueryExpression(query)
                        .with_span_static(span, "invalid query expression"));
                }
                for operand in core::iter::once(sbt_record_index).chain(hit_kind) {
                    self.validate_ray_operand(operand, RayOperand::Uint, context)?;
                }
                self.validate_hit_object_data(pointer, attributes, span, context)
            }
            Hf::ExecuteShader { payload } => self.validate_hit_object_data(
                payload,
                crate::AddressSpace::RayPayload,
                span,
                context,
            ),
            Hf::ReorderExecute {
                payload,
                hint: reorder,
            } => {
                ext_only(flavor == Hk::Ext)?;
                self.validate_hit_object_data(
                    payload,
                    crate::AddressSpace::RayPayload,
                    span,
                    context,
                )?;
                hint(reorder)
            }
            Hf::GetAttributes {
                attributes: pointer,
            } => self.validate_hit_object_data(pointer, attributes, span, context),
            Hf::SetShaderBindingTableRecordIndex { index } => {
                ext_only(flavor == Hk::Ext)?;
                self.validate_ray_operand(index, RayOperand::Uint, context)
            }
            Hf::ReorderThread { hint: reorder } => hint(reorder),
        }
    }

    fn validate_ray_data_argument(
        &self,
        index: u32,
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        if self.mode == crate::valid::ValidationMode::Executable {
            return Err(FunctionError::UnresolvedRayDataArgument(index)
                .with_span_static(span, "the location of this call"));
        }
        let signed_integer = usize::try_from(index)
            .ok()
            .and_then(|index| context.arguments.get(index))
            .is_some_and(|argument| {
                context.types[argument.ty].inner == crate::TypeInner::Scalar(crate::Scalar::I32)
            });
        if signed_integer {
            Ok(())
        } else {
            Err(FunctionError::InvalidRayDataArgument(index)
                .with_span_static(span, "the location of this call"))
        }
    }

    fn validate_ray_data(
        &self,
        data: crate::RayTracingData,
        spaces: &[crate::AddressSpace],
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        match data {
            crate::RayTracingData::Pointer(pointer) => {
                self.validate_ray_data_pointer(pointer, spaces, context)
            }
            crate::RayTracingData::Location(_) => Ok(()),
            crate::RayTracingData::Argument { index, .. } => {
                self.validate_ray_data_argument(index, span, context)
            }
        }
    }

    fn validate_ray_data_pointer(
        &self,
        pointer: Handle<crate::Expression>,
        spaces: &[crate::AddressSpace],
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        let crate::TypeInner::Pointer { space, .. } =
            *context.resolve_type_inner(pointer, &self.valid_expression_set)?
        else {
            return Err(
                FunctionError::InvalidPayloadType.with_span_handle(pointer, context.expressions)
            );
        };
        if !spaces.contains(&space) {
            return Err(FunctionError::InvalidPayloadAddressSpace(space)
                .with_span_handle(pointer, context.expressions));
        }
        if matches!(
            context.expressions[pointer],
            crate::Expression::GlobalVariable(_)
        ) {
            Ok(())
        } else {
            Err(FunctionError::PayloadPointerNotGlobal
                .with_span_handle(pointer, context.expressions))
        }
    }
}
