use alloc::{string::String, vec::Vec};

use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::SymbolId;
use rglsl_sema::builtins::kind::{
    Ray, RayIntersection, RayQueryFunction as QueryFunction, RayQueryValue as QueryValue,
};
use rglsl_sema::builtins::variables::VariableFlags;
use rglsl_sema::scope::Storage;
use rglsl_sema::types::{BlockId, BlockStorage};
use rglsl_types::extension::Extension;

use super::expression::Chain;
use super::function::FunctionLowerer;
use super::{GlobalRef, Lowerer, Packing, Result, internal, semantic};
use crate::{
    AddressSpace, Binding, BuiltIn, Expression, GlobalVariable, Handle, HitObjectFlavor,
    MathFunction, MemoryDecorations, RayPipelineFunction, RayQueryFunction,
    RayQueryIntersectionValue, RayQueryValue, RayTracingData, RayTracingFeatures, RayTracingFlavor,
    ShaderStage, Span, Statement,
};

const fn intersection(value: RayIntersection) -> RayQueryIntersectionValue {
    use RayQueryIntersectionValue as Iv;
    match value {
        RayIntersection::Type => Iv::Type,
        RayIntersection::T => Iv::T,
        RayIntersection::InstanceCustomIndex => Iv::InstanceCustomIndex,
        RayIntersection::InstanceId => Iv::InstanceId,
        RayIntersection::InstanceShaderBindingTableRecordOffset => {
            Iv::InstanceShaderBindingTableRecordOffset
        }
        RayIntersection::GeometryIndex => Iv::GeometryIndex,
        RayIntersection::PrimitiveIndex => Iv::PrimitiveIndex,
        RayIntersection::Barycentrics => Iv::Barycentrics,
        RayIntersection::FrontFace => Iv::FrontFace,
        RayIntersection::ObjectRayDirection => Iv::ObjectRayDirection,
        RayIntersection::ObjectRayOrigin => Iv::ObjectRayOrigin,
        RayIntersection::ObjectToWorld => Iv::ObjectToWorld,
        RayIntersection::WorldToObject => Iv::WorldToObject,
        RayIntersection::TriangleVertexPositions => Iv::TriangleVertexPositions,
        RayIntersection::ClusterId => Iv::ClusterId,
        RayIntersection::SpherePosition => Iv::SpherePosition,
        RayIntersection::SphereRadius => Iv::SphereRadius,
        RayIntersection::LssPositions => Iv::LssPositions,
        RayIntersection::LssRadii => Iv::LssRadii,
        RayIntersection::LssHitValue => Iv::LssHitValue,
        RayIntersection::IsSphereHit => Iv::IsSphereHit,
        RayIntersection::IsLssHit => Iv::IsLssHit,
    }
}

const fn query_value(value: QueryValue) -> RayQueryValue {
    match value {
        QueryValue::RayFlags => RayQueryValue::RayFlags,
        QueryValue::RayTMin => RayQueryValue::RayTMin,
        QueryValue::WorldRayOrigin => RayQueryValue::WorldRayOrigin,
        QueryValue::WorldRayDirection => RayQueryValue::WorldRayDirection,
        QueryValue::CandidateAabbOpaque => RayQueryValue::CandidateAabbOpaque,
    }
}

const fn ray_block_space(storage: BlockStorage) -> Option<(AddressSpace, Option<usize>)> {
    Some(match storage {
        BlockStorage::RayPayload => (AddressSpace::RayPayload, Some(0)),
        BlockStorage::RayPayloadIn => (AddressSpace::IncomingRayPayload, Some(0)),
        BlockStorage::HitAttribute => (AddressSpace::HitAttribute, None),
        BlockStorage::CallableData => (AddressSpace::CallableData, Some(1)),
        BlockStorage::CallableDataIn => (AddressSpace::IncomingCallableData, Some(1)),
        BlockStorage::HitObjectAttributeNv => (
            AddressSpace::HitObjectAttribute {
                flavor: HitObjectFlavor::Nv,
            },
            Some(2),
        ),
        BlockStorage::HitObjectAttributeExt => (
            AddressSpace::HitObjectAttribute {
                flavor: HitObjectFlavor::Ext,
            },
            Some(2),
        ),
        _ => return None,
    })
}

const fn ray_space(storage: Storage) -> Option<(AddressSpace, Option<usize>)> {
    Some(match storage {
        Storage::RayPayload => (AddressSpace::RayPayload, Some(0)),
        Storage::RayPayloadIn => (AddressSpace::IncomingRayPayload, Some(0)),
        Storage::HitAttribute => (AddressSpace::HitAttribute, None),
        Storage::CallableData => (AddressSpace::CallableData, Some(1)),
        Storage::CallableDataIn => (AddressSpace::IncomingCallableData, Some(1)),
        Storage::HitObjectAttributeNv => (
            AddressSpace::HitObjectAttribute {
                flavor: HitObjectFlavor::Nv,
            },
            Some(2),
        ),
        Storage::HitObjectAttributeExt => (
            AddressSpace::HitObjectAttribute {
                flavor: HitObjectFlavor::Ext,
            },
            Some(2),
        ),
        _ => return None,
    })
}

impl Lowerer<'_> {
    pub(super) fn ray_tracing_features(&self) -> RayTracingFeatures {
        let extensions = &self.analysis.extensions;
        let mut features = RayTracingFeatures::empty();
        if self.library || self.stage_map(ShaderStage::ray_tracing) {
            if extensions.contains(Extension::NvRayTracing) {
                features |= RayTracingFeatures::NV;
            }
            if !extensions.contains_any(&[
                Extension::ExtRayTracing,
                Extension::NvShaderInvocationReorder,
                Extension::ExtShaderInvocationReorder,
            ]) {
                features |= RayTracingFeatures::PAYLOAD_LOCATIONS;
            }
            if self.library
                || !self.stage_map(|stage| {
                    matches!(stage, ShaderStage::RayGeneration | ShaderStage::Callable)
                })
            {
                if extensions.contains(Extension::ExtRayCullMask) {
                    features |= RayTracingFeatures::CULL_MASK;
                }
                if extensions.contains(Extension::ExtRayTracingPositionFetch) {
                    features |= RayTracingFeatures::POSITION_FETCH;
                }
            }
        }
        if self.analysis.primitive_culling {
            features |= RayTracingFeatures::PRIMITIVE_CULLING;
        }
        let opacity_micromap = self.analysis.references.values().any(|&symbol| {
            self.symbol(symbol)
                .is_some_and(|symbol| symbol.name == "gl_RayFlagsForceOpacityMicromap2StateEXT")
        });
        if opacity_micromap {
            features |= RayTracingFeatures::OPACITY_MICROMAP;
        }
        features
    }

    pub(super) fn ray_builtin_decorations(&self, builtin: BuiltIn) -> MemoryDecorations {
        if builtin == BuiltIn::RayTCurrentMax && self.stage_is(ShaderStage::Intersection) {
            MemoryDecorations::VOLATILE.union(MemoryDecorations::COHERENT)
        } else {
            MemoryDecorations::empty()
        }
    }

    pub(super) fn ray_variable(&mut self, symbol: SymbolId, name: String, at: Span) -> Result<()> {
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let qualifiers = &variable.qualifiers;
        let ty = variable.ty.clone();
        let (space, set) = ray_space(qualifiers.storage).ok_or_else(|| internal(at))?;
        let location = qualifiers
            .layout_entry("location")
            .and_then(|entry| entry.value.constant())
            .and_then(|value| u32::try_from(value).ok());
        let ir = self.ir_type(&ty, at)?;
        self.ray_global(symbol, name, space, set, location, ir, at);
        Ok(())
    }

    pub(super) fn ray_block(
        &mut self,
        symbol: SymbolId,
        id: BlockId,
        name: String,
        at: Span,
    ) -> Result<()> {
        let analysis = self.analysis;
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let block = analysis.types.block(id).ok_or_else(|| internal(at))?;
        let (space, set) = ray_block_space(block.storage).ok_or_else(|| internal(at))?;
        let location = block
            .qualifiers
            .layout_entry("location")
            .or_else(|| variable.qualifiers.layout_entry("location"))
            .and_then(|entry| entry.value.constant())
            .and_then(|value| u32::try_from(value).ok());
        if !variable.ty.dimensions().is_empty() {
            return Err(super::unsupported("arrays of ray tracing blocks", at));
        }
        let ir = self.block_struct(id, Packing::Std430, false, at)?;
        let handle = self.ray_global(symbol, name, space, set, location, ir, at);
        self.module.global_variables.get_mut(handle).block =
            Some(crate::BlockDeclaration::RayTracing);
        Ok(())
    }

    #[expect(
        clippy::too_many_arguments,
        reason = "the arguments are the parts of one request"
    )]
    fn ray_global(
        &mut self,
        symbol: SymbolId,
        name: String,
        space: AddressSpace,
        set: Option<usize>,
        location: Option<u32>,
        ty: Handle<crate::Type>,
        at: Span,
    ) -> Handle<GlobalVariable> {
        let io = location.map(|location| Binding::Location {
            location,
            interpolation: None,
            sampling: None,
            blend_src: None,
            per_primitive: false,
            component: None,
            invariant: false,
            patch: false,
            per_view: false,
        });
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(name),
                space,
                binding: None,
                ty,
                init: None,
                memory_decorations: MemoryDecorations::empty(),
                io,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            at,
        );
        if let (Some(set), Some(location)) = (set, location) {
            self.ray_data.entry((set, location)).or_insert(handle);
        }
        if space == AddressSpace::IncomingRayPayload && self.incoming_ray_payload.is_none() {
            self.incoming_ray_payload = Some(handle);
        }
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        handle
    }

    pub(super) fn ray_query_global(
        &mut self,
        name: String,
        ty: Handle<crate::Type>,
        at: Span,
    ) -> Handle<GlobalVariable> {
        self.module.global_variables.append(
            GlobalVariable {
                name: Some(name),
                space: AddressSpace::Private,
                binding: None,
                ty,
                init: None,
                memory_decorations: MemoryDecorations::empty(),
                io: None,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            at,
        )
    }
}

impl FunctionLowerer<'_, '_> {
    pub(super) fn ray_builtin_chain(
        &mut self,
        symbol: SymbolId,
        at: Span,
    ) -> Result<Option<Chain>> {
        let transposed = self
            .lw
            .analysis
            .builtins
            .variable(symbol)
            .is_some_and(|row| row.has(VariableFlags::TRANSPOSED));
        if !transposed {
            return Ok(None);
        }
        let GlobalRef::Variable(global) = self.lw.global_ref(symbol, at)? else {
            return Err(internal(at));
        };
        let pointer = self.add(Expression::GlobalVariable(global), at)?;
        let value = self.add(Expression::Load { pointer }, at)?;
        let transposed = self.add(
            Expression::Math {
                fun: MathFunction::Transpose,
                arg: value,
                arg1: None,
                arg2: None,
                arg3: None,
            },
            at,
        )?;
        Ok(Some(Chain::Value(transposed)))
    }

    fn constant_bool(&self, expression: &AstExpression, at: Span) -> Result<bool> {
        let info = self.info(expression)?;
        info.value
            .as_ref()
            .and_then(|value| value.values.first())
            .and_then(|value| value.as_bool())
            .ok_or_else(|| semantic("`committed` must be a compile-time constant", at))
    }

    fn ray_location(&self, expression: &AstExpression, at: Span) -> Result<u32> {
        let info = self.info(expression)?;
        info.value
            .as_ref()
            .and_then(|value| value.scalar_i64())
            .and_then(|value| u32::try_from(value).ok())
            .ok_or_else(|| semantic("the location must be a compile-time constant", at))
    }

    pub(super) fn ray_data(
        &mut self,
        expression: &AstExpression,
        set: usize,
        nv: bool,
        at: Span,
    ) -> Result<RayTracingData> {
        let location = self.ray_location(expression, at)?;
        if nv {
            return Ok(RayTracingData::Location(location));
        }
        let global = *self.lw.ray_data.get(&(set, location)).ok_or_else(|| {
            semantic(
                match set {
                    0 => "no rayPayloadEXT/rayPayloadInEXT is declared with this location",
                    1 => "no callableDataEXT/callableDataInEXT is declared with this location",
                    _ => "no hitObjectAttributeNV/hitObjectAttributeEXT is declared with this location",
                },
                at,
            )
        })?;
        let pointer = self.add(Expression::GlobalVariable(global), at)?;
        Ok(RayTracingData::Pointer(pointer))
    }
}

impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    pub(super) async fn ray_operands(
        self,
        arguments: &'b [AstExpression],
    ) -> Result<Vec<Handle<Expression>>> {
        let mut operands = Vec::with_capacity(arguments.len());
        for argument in arguments {
            operands.push(self.nest(self.clone().rvalue(argument)).await?);
        }
        Ok(operands)
    }

    pub(super) async fn ray_query_pointer(
        self,
        argument: &'b AstExpression,
    ) -> Result<Handle<Expression>> {
        Ok({
            let frame = self.clone().place(argument);
            self.nest(frame).await
        }?
        .pointer)
    }

    pub(super) async fn ray_call(
        self,
        ray: Ray,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        use RayQueryIntersectionValue as Iv;
        match ray {
            Ray::Intersection(value) => {
                let value = intersection(value);
                let [ref query, ref committed, ref rest @ ..] = *arguments else {
                    return Err(internal(at));
                };
                let committed = self.with(|this| this.constant_bool(committed, at))??;
                let query = {
                    let frame = self.clone().ray_query_pointer(query);
                    self.nest(frame).await
                }?;
                match value {
                    Iv::TriangleVertexPositions => {
                        self.with(|this| this.lw.module.generate_vertex_return_type())?;
                    }
                    Iv::LssPositions => {
                        self.with(|this| this.generate_lss_array(Some(crate::VectorSize::Tri)))?;
                    }
                    Iv::LssRadii => self.with(|this| this.generate_lss_array(None))?,
                    _ => {}
                }
                let result = self.with(|this| {
                    this.add(
                        Expression::RayQueryGet {
                            query,
                            value: RayQueryValue::Intersection { committed, value },
                        },
                        at,
                    )
                })??;
                if let [ref output] = *rest {
                    let place = {
                        let frame = self.clone().place(output);
                        self.nest(frame).await
                    }?;
                    self.with(|this| this.store(&place, result, at))??;
                    return Ok(None);
                }
                Ok(Some(result))
            }
            Ray::Query(value) => {
                let value = query_value(value);
                let query = arguments.first().ok_or_else(|| internal(at))?;
                let query = {
                    let frame = self.clone().ray_query_pointer(query);
                    self.nest(frame).await
                }?;
                self.with(|this| {
                    this.add(Expression::RayQueryGet { query, value }, at)
                        .map(Some)
                })?
            }
            Ray::QueryFunction(QueryFunction::Initialize) => {
                let [ref query, ref rest @ ..] = *arguments else {
                    return Err(internal(at));
                };
                let query = {
                    let frame = self.clone().ray_query_pointer(query);
                    self.nest(frame).await
                }?;
                let [
                    acceleration_structure,
                    flags,
                    cull_mask,
                    origin,
                    tmin,
                    direction,
                    tmax,
                ] = *{
                    let frame = self.clone().ray_operands(rest);
                    self.nest(frame).await
                }?
                .as_slice()
                else {
                    return Err(internal(at));
                };
                self.with(|this| {
                    this.push(
                        Statement::RayQuery {
                            query,
                            fun: RayQueryFunction::Initialize {
                                acceleration_structure,
                                flags,
                                cull_mask,
                                origin,
                                tmin,
                                direction,
                                tmax,
                            },
                        },
                        at,
                    );
                })?;
                Ok(None)
            }
            Ray::QueryFunction(QueryFunction::Proceed) => {
                let query = arguments.first().ok_or_else(|| internal(at))?;
                let query = {
                    let frame = self.clone().ray_query_pointer(query);
                    self.nest(frame).await
                }?;
                let result = self.with(|this| {
                    this.result_statement(
                        Expression::RayQueryProceedResult,
                        |result| Statement::RayQuery {
                            query,
                            fun: RayQueryFunction::Proceed { result },
                        },
                        at,
                    )
                })?;
                Ok(Some(result))
            }
            Ray::QueryFunction(
                function @ (QueryFunction::Terminate | QueryFunction::ConfirmIntersection),
            ) => {
                let query = arguments.first().ok_or_else(|| internal(at))?;
                let query = {
                    let frame = self.clone().ray_query_pointer(query);
                    self.nest(frame).await
                }?;
                let fun = if function == QueryFunction::Terminate {
                    RayQueryFunction::Terminate
                } else {
                    RayQueryFunction::ConfirmIntersection
                };
                self.with(|this| this.push(Statement::RayQuery { query, fun }, at))?;
                Ok(None)
            }
            Ray::QueryFunction(QueryFunction::GenerateIntersection) => {
                let [ref query, ref hit_t] = *arguments else {
                    return Err(internal(at));
                };
                let query = {
                    let frame = self.clone().ray_query_pointer(query);
                    self.nest(frame).await
                }?;
                let hit_t = {
                    let frame = self.clone().rvalue(hit_t);
                    self.nest(frame).await
                }?;
                self.with(|this| {
                    this.push(
                        Statement::RayQuery {
                            query,
                            fun: RayQueryFunction::GenerateIntersection { hit_t },
                        },
                        at,
                    );
                })?;
                Ok(None)
            }
            Ray::TraceRay { nv, motion } => {
                let (payload, operands) = arguments.split_last().ok_or_else(|| internal(at))?;
                let operands = {
                    let frame = self.clone().ray_operands(operands);
                    self.nest(frame).await
                }?;
                let (time, operands) = if motion {
                    let (time, operands) = operands.split_last().ok_or_else(|| internal(at))?;
                    (Some(*time), operands)
                } else {
                    (None, operands.as_slice())
                };
                let [
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
                ] = *operands
                else {
                    return Err(internal(at));
                };
                let payload = self.with(|this| this.ray_data(payload, 0, nv, at))??;
                self.with(|this| {
                    this.push(
                        Statement::RayPipelineFunction(RayPipelineFunction::TraceRay {
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
                        }),
                        at,
                    );
                })?;
                Ok(None)
            }
            Ray::ExecuteCallable { nv } => {
                let [ref sbt_index, ref data] = *arguments else {
                    return Err(internal(at));
                };
                let sbt_index = {
                    let frame = self.clone().rvalue(sbt_index);
                    self.nest(frame).await
                }?;
                let data = self.with(|this| this.ray_data(data, 1, nv, at))??;
                self.with(|this| {
                    this.push(
                        Statement::RayPipelineFunction(RayPipelineFunction::ExecuteCallable {
                            sbt_index,
                            data,
                        }),
                        at,
                    );
                })?;
                Ok(None)
            }
            Ray::ReportIntersection => {
                let [ref hit_t, ref hit_kind] = *arguments else {
                    return Err(internal(at));
                };
                let hit_t = {
                    let frame = self.clone().rvalue(hit_t);
                    self.nest(frame).await
                }?;
                let hit_kind = {
                    let frame = self.clone().rvalue(hit_kind);
                    self.nest(frame).await
                }?;
                let result = self.with(|this| {
                    this.result_statement(
                        Expression::ReportIntersectionResult,
                        |result| {
                            Statement::RayPipelineFunction(
                                RayPipelineFunction::ReportIntersection {
                                    hit_t,
                                    hit_kind,
                                    result,
                                },
                            )
                        },
                        at,
                    )
                })?;
                Ok(Some(result))
            }
            Ray::IgnoreIntersection => {
                self.with(|this| {
                    this.push(
                        Statement::RayPipelineFunction(RayPipelineFunction::IgnoreIntersection {
                            flavor: RayTracingFlavor::Nv,
                        }),
                        at,
                    );
                })?;
                Ok(None)
            }
            Ray::TerminateRay => {
                self.with(|this| {
                    this.push(
                        Statement::RayPipelineFunction(RayPipelineFunction::TerminateRay {
                            flavor: RayTracingFlavor::Nv,
                        }),
                        at,
                    );
                })?;
                Ok(None)
            }
            Ray::MicroTriangle(value) => {
                let frame = self.clone().micro_triangle(value, arguments, at);
                self.nest(frame).await
            }
            Ray::HitObject(flavor, call) => {
                let frame = self.clone().hit_object_call(flavor, call, arguments, at);
                self.nest(frame).await
            }
        }
    }

    pub(super) async fn acceleration_structure_from(
        self,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let argument = arguments.first().ok_or_else(|| internal(at))?;
        let address = {
            let frame = self.clone().rvalue(argument);
            self.nest(frame).await
        }?;
        self.with(|this| this.add(Expression::AccelerationStructureFromAddress { address }, at))?
    }
}

impl Lowerer<'_> {
    pub(super) fn opacity_micromap(&mut self, at: Span) -> Result<Option<Handle<Expression>>> {
        if !self
            .analysis
            .extensions
            .contains(Extension::ExtOpacityMicromapRayQueryMode)
        {
            return Ok(None);
        }
        self.builtin_name("gl_EnableOpacityMicromapEXT");
        let analysis = self.analysis;
        let Some(symbol) = analysis
            .builtins
            .variables()
            .find(|&(name, _)| name == "gl_EnableOpacityMicromapEXT")
            .map(|(_, symbol)| symbol)
        else {
            return Ok(None);
        };
        let expression = match self.global_ref(symbol, at)? {
            GlobalRef::Constant(handle) => Expression::Constant(handle),
            GlobalRef::Override(handle) => Expression::Override(handle),
            GlobalRef::Variable(_) => return Err(internal(at)),
        };
        Ok(Some(self.module.global_expressions.append(expression, at)))
    }
}

impl<'b, 'a> super::function::LowererCx<'b, 'a> {
    pub(super) async fn builtin_override(
        self,
        symbol: SymbolId,
        variable: &'b rglsl_sema::scope::Variable,
        at: Span,
    ) -> Result<Option<GlobalRef>> {
        let Some(id) = variable
            .qualifiers
            .layout_entry("constant_id")
            .and_then(|entry| entry.value.constant())
        else {
            return Ok(None);
        };
        let id =
            u32::try_from(id).map_err(|_| semantic("the `constant_id` is out of range", at))?;
        let name = self.with(|this| this.symbol(symbol).map(|symbol| symbol.name.clone()))?;
        let values = variable
            .value
            .as_ref()
            .map(|value| value.values.clone())
            .unwrap_or_default();
        let ty = {
            let frame = self.clone().ir_type(variable.ty.clone(), at);
            self.nest(frame).await
        }?;
        let init = {
            let frame = self
                .clone()
                .global_constant(variable.ty.clone(), values.clone(), at);
            self.nest(frame).await
        }?;
        let handle = self.with(|this| {
            this.module.overrides.append(
                crate::Override {
                    name,
                    id: Some(id),
                    ty,
                    init: Some(init),
                },
                at,
            )
        })?;
        let found = GlobalRef::Override(handle);
        self.with(|this| this.globals.insert(symbol, found))?;
        Ok(Some(found))
    }
}
