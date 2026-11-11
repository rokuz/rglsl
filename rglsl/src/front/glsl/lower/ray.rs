use alloc::{string::String, vec::Vec};

use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::scope::Storage;
use rglsl_sema::types::{BlockId, BlockStorage, Scalar as GlslScalar, Type as GlslType};
use rglsl_sema::SymbolId;

use super::expression::Chain;
use super::function::FunctionLowerer;
use super::{internal, semantic, GlobalRef, Lowerer, Packing, Result};
use crate::{
    AddressSpace, Binding, BuiltIn, Expression, GlobalVariable, Handle, HitObjectKind,
    MathFunction, MemoryDecorations, RayPipelineFunction, RayQueryFunction,
    RayQueryIntersectionValue, RayQueryValue, RayTracingData, RayTracingFeatures, ShaderStage,
    Span, Statement,
};

const RAY_TRACING_NV: &str = "GL_NV_ray_tracing";
const RAY_TRACING_EXT: &str = "GL_EXT_ray_tracing";

pub(super) fn ray_builtin(name: &str) -> Option<(BuiltIn, &'static str)> {
    Some(match name {
        "gl_LaunchIDNV" | "gl_LaunchIDEXT" => (BuiltIn::RayInvocationId, "gl_LaunchIDEXT"),
        "gl_LaunchSizeNV" | "gl_LaunchSizeEXT" => (BuiltIn::NumRayInvocations, "gl_LaunchSizeEXT"),
        "gl_InstanceID" => (BuiltIn::InstanceId, "gl_InstanceID"),
        "gl_InstanceCustomIndexNV" | "gl_InstanceCustomIndexEXT" => {
            (BuiltIn::InstanceCustomData, "gl_InstanceCustomIndexEXT")
        }
        "gl_GeometryIndexEXT" => (BuiltIn::GeometryIndex, "gl_GeometryIndexEXT"),
        "gl_WorldRayOriginNV" | "gl_WorldRayOriginEXT" => {
            (BuiltIn::WorldRayOrigin, "gl_WorldRayOriginEXT")
        }
        "gl_WorldRayDirectionNV" | "gl_WorldRayDirectionEXT" => {
            (BuiltIn::WorldRayDirection, "gl_WorldRayDirectionEXT")
        }
        "gl_ObjectRayOriginNV" | "gl_ObjectRayOriginEXT" => {
            (BuiltIn::ObjectRayOrigin, "gl_ObjectRayOriginEXT")
        }
        "gl_ObjectRayDirectionNV" | "gl_ObjectRayDirectionEXT" => {
            (BuiltIn::ObjectRayDirection, "gl_ObjectRayDirectionEXT")
        }
        "gl_RayTminNV" | "gl_RayTminEXT" => (BuiltIn::RayTmin, "gl_RayTminEXT"),
        "gl_RayTmaxNV" | "gl_RayTmaxEXT" | "gl_HitTNV" | "gl_HitTEXT" => {
            (BuiltIn::RayTCurrentMax, "gl_RayTmaxEXT")
        }
        "gl_HitKindNV" | "gl_HitKindEXT" => (BuiltIn::HitKind, "gl_HitKindEXT"),
        "gl_ObjectToWorldNV" | "gl_ObjectToWorldEXT" | "gl_ObjectToWorld3x4EXT" => {
            (BuiltIn::ObjectToWorld, "gl_ObjectToWorldEXT")
        }
        "gl_WorldToObjectNV" | "gl_WorldToObjectEXT" | "gl_WorldToObject3x4EXT" => {
            (BuiltIn::WorldToObject, "gl_WorldToObjectEXT")
        }
        "gl_IncomingRayFlagsNV" | "gl_IncomingRayFlagsEXT" => {
            (BuiltIn::IncomingRayFlags, "gl_IncomingRayFlagsEXT")
        }
        "gl_CullMaskEXT" => (BuiltIn::CullMask, "gl_CullMaskEXT"),
        "gl_HitTriangleVertexPositionsEXT" => (
            BuiltIn::HitTriangleVertexPositions,
            "gl_HitTriangleVertexPositionsEXT",
        ),
        "gl_CurrentRayTimeNV" => (BuiltIn::CurrentRayTime, "gl_CurrentRayTimeNV"),
        "gl_ClusterIDNV" => (BuiltIn::ClusterId, "gl_ClusterIDNV"),
        "gl_HitMicroTriangleVertexPositionsNV" => (
            BuiltIn::HitMicroTriangleVertexPositions,
            "gl_HitMicroTriangleVertexPositionsNV",
        ),
        "gl_HitMicroTriangleVertexBarycentricsNV" => (
            BuiltIn::HitMicroTriangleVertexBarycentrics,
            "gl_HitMicroTriangleVertexBarycentricsNV",
        ),
        "gl_HitKindFrontFacingMicroTriangleNV" => (
            BuiltIn::HitKindFrontFacingMicroTriangle,
            "gl_HitKindFrontFacingMicroTriangleNV",
        ),
        "gl_HitKindBackFacingMicroTriangleNV" => (
            BuiltIn::HitKindBackFacingMicroTriangle,
            "gl_HitKindBackFacingMicroTriangleNV",
        ),
        "gl_HitIsSphereNV" => (BuiltIn::HitIsSphere, "gl_HitIsSphereNV"),
        "gl_HitIsLSSNV" => (BuiltIn::HitIsLss, "gl_HitIsLSSNV"),
        "gl_HitSpherePositionNV" => (BuiltIn::HitSpherePosition, "gl_HitSpherePositionNV"),
        "gl_HitSphereRadiusNV" => (BuiltIn::HitSphereRadius, "gl_HitSphereRadiusNV"),
        "gl_HitLSSPositionsNV" => (BuiltIn::HitLssPositions, "gl_HitLSSPositionsNV"),
        "gl_HitLSSRadiiNV" => (BuiltIn::HitLssRadii, "gl_HitLSSRadiiNV"),
        _ => return None,
    })
}

const fn transposed_builtin(name: &str) -> bool {
    matches!(
        name.as_bytes(),
        b"gl_ObjectToWorld3x4EXT" | b"gl_WorldToObject3x4EXT"
    )
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
                kind: HitObjectKind::Nv,
            },
            Some(2),
        ),
        BlockStorage::HitObjectAttributeExt => (
            AddressSpace::HitObjectAttribute {
                kind: HitObjectKind::Ext,
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
                kind: HitObjectKind::Nv,
            },
            Some(2),
        ),
        Storage::HitObjectAttributeExt => (
            AddressSpace::HitObjectAttribute {
                kind: HitObjectKind::Ext,
            },
            Some(2),
        ),
        _ => return None,
    })
}

impl Lowerer<'_> {
    pub(super) fn ray_tracing_features(&self) -> RayTracingFeatures {
        let extensions = &self.analysis.extensions;
        let stage = self.options.stage;
        let mut features = RayTracingFeatures::empty();
        if stage.ray_tracing() {
            if extensions.contains(RAY_TRACING_NV) {
                features |= RayTracingFeatures::NV;
            }
            if ![
                RAY_TRACING_EXT,
                "GL_NV_shader_invocation_reorder",
                "GL_EXT_shader_invocation_reorder",
            ]
            .into_iter()
            .any(|extension| extensions.contains(extension))
            {
                features |= RayTracingFeatures::PAYLOAD_LOCATIONS;
            }
            if !matches!(stage, ShaderStage::RayGeneration | ShaderStage::Callable) {
                if extensions.contains("GL_EXT_ray_cull_mask") {
                    features |= RayTracingFeatures::CULL_MASK;
                }
                if extensions.contains("GL_EXT_ray_tracing_position_fetch") {
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

    pub(super) const fn ray_builtin_decorations(&self, builtin: BuiltIn) -> MemoryDecorations {
        match (builtin, self.options.stage) {
            (BuiltIn::RayTCurrentMax, ShaderStage::Intersection) => {
                MemoryDecorations::VOLATILE.union(MemoryDecorations::COHERENT)
            }
            _ => MemoryDecorations::empty(),
        }
    }

    pub(super) fn ray_builtin_type(
        &mut self,
        name: &str,
        ty: &GlslType,
        at: Span,
    ) -> Result<Handle<crate::Type>> {
        if transposed_builtin(name) {
            let transposed = GlslType::matrix(GlslScalar::Float, 4, 3);
            return self.ir_type(&transposed, at);
        }
        self.ir_type(ty, at)
    }

    pub(super) fn ray_variable(&mut self, symbol: SymbolId, name: String, at: Span) -> Result<()> {
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let qualifiers = &variable.qualifiers;
        let ty = variable.ty.clone();
        let (space, set) = ray_space(qualifiers.storage).ok_or_else(|| internal(at))?;
        let location = qualifiers
            .layout_entry("location")
            .and_then(|entry| entry.value)
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
            .and_then(|entry| entry.value)
            .and_then(|value| u32::try_from(value).ok());
        if !variable.ty.array.is_empty() {
            return Err(super::unsupported("arrays of ray tracing blocks", at));
        }
        let ir = self.block_struct(id, Packing::Std430, false, at)?;
        self.ray_global(symbol, name, space, set, location, ir, at);
        Ok(())
    }

    #[allow(clippy::too_many_arguments)]
    fn ray_global(
        &mut self,
        symbol: SymbolId,
        name: String,
        space: AddressSpace,
        set: Option<usize>,
        location: Option<u32>,
        ty: Handle<crate::Type>,
        at: Span,
    ) {
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
        let Some(name) = self.lw.symbol(symbol).map(|symbol| symbol.name.as_str()) else {
            return Ok(None);
        };
        if !transposed_builtin(name) {
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

    pub(super) fn ray_operands(
        &mut self,
        arguments: &[AstExpression],
    ) -> Result<Vec<Handle<Expression>>> {
        arguments
            .iter()
            .map(|argument| self.rvalue(argument))
            .collect()
    }

    pub(super) fn ray_query_pointer(
        &mut self,
        argument: &AstExpression,
    ) -> Result<Handle<Expression>> {
        Ok(self.place(argument)?.pointer)
    }

    pub(super) fn ray_builtin_call(
        &mut self,
        name: &str,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Option<Handle<Expression>>>> {
        use RayQueryIntersectionValue as Iv;
        let intersection = match name {
            "rayQueryGetIntersectionTypeEXT" => Some(Iv::Type),
            "rayQueryGetIntersectionTEXT" => Some(Iv::T),
            "rayQueryGetIntersectionInstanceCustomIndexEXT" => Some(Iv::InstanceCustomIndex),
            "rayQueryGetIntersectionInstanceIdEXT" => Some(Iv::InstanceId),
            "rayQueryGetIntersectionInstanceShaderBindingTableRecordOffsetEXT" => {
                Some(Iv::InstanceShaderBindingTableRecordOffset)
            }
            "rayQueryGetIntersectionGeometryIndexEXT" => Some(Iv::GeometryIndex),
            "rayQueryGetIntersectionPrimitiveIndexEXT" => Some(Iv::PrimitiveIndex),
            "rayQueryGetIntersectionBarycentricsEXT" => Some(Iv::Barycentrics),
            "rayQueryGetIntersectionFrontFaceEXT" => Some(Iv::FrontFace),
            "rayQueryGetIntersectionObjectRayDirectionEXT" => Some(Iv::ObjectRayDirection),
            "rayQueryGetIntersectionObjectRayOriginEXT" => Some(Iv::ObjectRayOrigin),
            "rayQueryGetIntersectionObjectToWorldEXT" => Some(Iv::ObjectToWorld),
            "rayQueryGetIntersectionWorldToObjectEXT" => Some(Iv::WorldToObject),
            "rayQueryGetIntersectionTriangleVertexPositionsEXT" => {
                Some(Iv::TriangleVertexPositions)
            }
            "rayQueryGetIntersectionClusterIdNV" => Some(Iv::ClusterId),
            "rayQueryGetIntersectionSpherePositionNV" => Some(Iv::SpherePosition),
            "rayQueryGetIntersectionSphereRadiusNV" => Some(Iv::SphereRadius),
            "rayQueryGetIntersectionLSSHitValueNV" => Some(Iv::LssHitValue),
            "rayQueryGetIntersectionLSSPositionsNV" => Some(Iv::LssPositions),
            "rayQueryGetIntersectionLSSRadiiNV" => Some(Iv::LssRadii),
            "rayQueryIsSphereHitNV" => Some(Iv::IsSphereHit),
            "rayQueryIsLSSHitNV" => Some(Iv::IsLssHit),
            _ => None,
        };
        if let Some(value) = intersection {
            let [ref query, ref committed, ref rest @ ..] = *arguments else {
                return Err(internal(at));
            };
            let committed = self.constant_bool(committed, at)?;
            let query = self.ray_query_pointer(query)?;
            match value {
                Iv::TriangleVertexPositions => {
                    self.lw.module.generate_vertex_return_type();
                }
                Iv::LssPositions => self.generate_lss_array(Some(crate::VectorSize::Tri)),
                Iv::LssRadii => self.generate_lss_array(None),
                _ => {}
            }
            let result = self.add(
                Expression::RayQueryGet {
                    query,
                    value: RayQueryValue::Intersection { committed, value },
                },
                at,
            )?;
            if let [ref output] = *rest {
                let place = self.place(output)?;
                self.store(&place, result, at)?;
                return Ok(Some(None));
            }
            return Ok(Some(Some(result)));
        }
        let ray_value = match name {
            "rayQueryGetRayTMinEXT" => Some(RayQueryValue::RayTMin),
            "rayQueryGetRayFlagsEXT" => Some(RayQueryValue::RayFlags),
            "rayQueryGetWorldRayOriginEXT" => Some(RayQueryValue::WorldRayOrigin),
            "rayQueryGetWorldRayDirectionEXT" => Some(RayQueryValue::WorldRayDirection),
            "rayQueryGetIntersectionCandidateAABBOpaqueEXT" => {
                Some(RayQueryValue::CandidateAabbOpaque)
            }
            _ => None,
        };
        if let Some(value) = ray_value {
            let query = arguments.first().ok_or_else(|| internal(at))?;
            let query = self.ray_query_pointer(query)?;
            return self
                .add(Expression::RayQueryGet { query, value }, at)
                .map(|result| Some(Some(result)));
        }
        match name {
            "rayQueryInitializeEXT" => {
                let [ref query, ref rest @ ..] = *arguments else {
                    return Err(internal(at));
                };
                let query = self.ray_query_pointer(query)?;
                let [acceleration_structure, flags, cull_mask, origin, tmin, direction, tmax] =
                    *self.ray_operands(rest)?.as_slice()
                else {
                    return Err(internal(at));
                };
                self.push(
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
                Ok(Some(None))
            }
            "rayQueryProceedEXT" => {
                let query = arguments.first().ok_or_else(|| internal(at))?;
                let query = self.ray_query_pointer(query)?;
                let result = self.result_statement(
                    Expression::RayQueryProceedResult,
                    |result| Statement::RayQuery {
                        query,
                        fun: RayQueryFunction::Proceed { result },
                    },
                    at,
                );
                Ok(Some(Some(result)))
            }
            "rayQueryTerminateEXT" | "rayQueryConfirmIntersectionEXT" => {
                let query = arguments.first().ok_or_else(|| internal(at))?;
                let query = self.ray_query_pointer(query)?;
                let fun = if name == "rayQueryTerminateEXT" {
                    RayQueryFunction::Terminate
                } else {
                    RayQueryFunction::ConfirmIntersection
                };
                self.push(Statement::RayQuery { query, fun }, at);
                Ok(Some(None))
            }
            "rayQueryGenerateIntersectionEXT" => {
                let [ref query, ref hit_t] = *arguments else {
                    return Err(internal(at));
                };
                let query = self.ray_query_pointer(query)?;
                let hit_t = self.rvalue(hit_t)?;
                self.push(
                    Statement::RayQuery {
                        query,
                        fun: RayQueryFunction::GenerateIntersection { hit_t },
                    },
                    at,
                );
                Ok(Some(None))
            }
            "traceNV" | "traceRayEXT" | "traceRayMotionNV" => {
                let motion = name == "traceRayMotionNV";
                let (payload, operands) = arguments.split_last().ok_or_else(|| internal(at))?;
                let operands = self.ray_operands(operands)?;
                let (time, operands) = if motion {
                    let (time, operands) = operands.split_last().ok_or_else(|| internal(at))?;
                    (Some(*time), operands)
                } else {
                    (None, operands.as_slice())
                };
                let [acceleration_structure, flags, cull_mask, sbt_offset, sbt_stride, miss_index, origin, tmin, direction, tmax] =
                    *operands
                else {
                    return Err(internal(at));
                };
                let payload = self.ray_data(payload, 0, name == "traceNV", at)?;
                self.push(
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
                Ok(Some(None))
            }
            "executeCallableNV" | "executeCallableEXT" => {
                let [ref sbt_index, ref data] = *arguments else {
                    return Err(internal(at));
                };
                let sbt_index = self.rvalue(sbt_index)?;
                let data = self.ray_data(data, 1, name == "executeCallableNV", at)?;
                self.push(
                    Statement::RayPipelineFunction(RayPipelineFunction::ExecuteCallable {
                        sbt_index,
                        data,
                    }),
                    at,
                );
                Ok(Some(None))
            }
            "reportIntersectionNV" | "reportIntersectionEXT" => {
                let [ref hit_t, ref hit_kind] = *arguments else {
                    return Err(internal(at));
                };
                let hit_t = self.rvalue(hit_t)?;
                let hit_kind = self.rvalue(hit_kind)?;
                let result = self.result_statement(
                    Expression::ReportIntersectionResult,
                    |result| {
                        Statement::RayPipelineFunction(RayPipelineFunction::ReportIntersection {
                            hit_t,
                            hit_kind,
                            result,
                        })
                    },
                    at,
                );
                Ok(Some(Some(result)))
            }
            "ignoreIntersectionNV" => {
                self.push(
                    Statement::RayPipelineFunction(RayPipelineFunction::IgnoreIntersection {
                        nv: true,
                    }),
                    at,
                );
                Ok(Some(None))
            }
            "terminateRayNV" => {
                self.push(
                    Statement::RayPipelineFunction(RayPipelineFunction::TerminateRay { nv: true }),
                    at,
                );
                Ok(Some(None))
            }
            _ => self.hit_object_call(name, arguments, at),
        }
    }

    pub(super) fn acceleration_structure_from(
        &mut self,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let argument = arguments.first().ok_or_else(|| internal(at))?;
        let address = self.rvalue(argument)?;
        self.add(Expression::AccelerationStructureFromAddress { address }, at)
    }
}

impl Lowerer<'_> {
    pub(super) fn builtin_override(
        &mut self,
        symbol: SymbolId,
        variable: &rglsl_sema::scope::Variable,
        at: Span,
    ) -> Result<Option<GlobalRef>> {
        let Some(id) = variable
            .qualifiers
            .layout_entry("constant_id")
            .and_then(|entry| entry.value)
        else {
            return Ok(None);
        };
        let id =
            u32::try_from(id).map_err(|_| semantic("the `constant_id` is out of range", at))?;
        let name = self.symbol(symbol).map(|symbol| symbol.name.clone());
        let values = variable
            .value
            .as_ref()
            .map(|value| value.values.clone())
            .unwrap_or_default();
        let ty = self.ir_type(&variable.ty, at)?;
        let init = self.global_constant(&variable.ty, &values, at)?;
        let handle = self.module.overrides.append(
            crate::Override {
                name,
                id: Some(id),
                ty,
                init: Some(init),
            },
            at,
        );
        let found = GlobalRef::Override(handle);
        self.globals.insert(symbol, found);
        Ok(Some(found))
    }

    pub(super) fn opacity_micromap(&mut self, at: Span) -> Result<Option<Handle<Expression>>> {
        if !self
            .analysis
            .extensions
            .contains("GL_EXT_opacity_micromap_ray_query_mode")
        {
            return Ok(None);
        }
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
