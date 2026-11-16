use alloc::vec;

use arrayvec::ArrayVec;
use spirv::BuiltIn;

use super::{Error, Writer, feature, helpers::BindingDecorations};
use crate::arena::Handle;

impl Writer {
    pub(super) const fn invariant_output(
        &self,
        class: spirv::StorageClass,
        built_in: crate::BuiltIn,
    ) -> bool {
        use crate::BuiltIn as Bi;
        self.invariant_outputs
            && matches!(class, spirv::StorageClass::Output)
            && matches!(
                built_in,
                Bi::PointSize
                    | Bi::ClipDistances
                    | Bi::CullDistance
                    | Bi::TessLevelOuter
                    | Bi::TessLevelInner
                    | Bi::PrimitiveIndex
                    | Bi::Layer { .. }
                    | Bi::ViewportIndex
                    | Bi::FragDepth
                    | Bi::SampleMask { .. }
            )
    }

    pub(super) fn map_built_in(
        &mut self,
        ir_module: &crate::Module,
        stage: crate::ShaderStage,
        class: spirv::StorageClass,
        ty: Handle<crate::Type>,
        built_in: crate::BuiltIn,
    ) -> Result<BindingDecorations, Error> {
        use crate::BuiltIn as Bi;
        use spirv::Decoration;
        let mut others = ArrayVec::new();
        if self.invariant_output(class, built_in) {
            others.push(Decoration::Invariant);
        }
        let mesh_output = stage == crate::ShaderStage::Mesh && class == spirv::StorageClass::Output;

        let built_in = match built_in {
            Bi::Position { invariant } => {
                if invariant {
                    others.push(Decoration::Invariant);
                }

                if class == spirv::StorageClass::Input && stage == crate::ShaderStage::Fragment {
                    BuiltIn::FragCoord
                } else {
                    BuiltIn::Position
                }
            }
            Bi::ViewIndex => {
                self.require(&feature::MULTIVIEW)?;
                BuiltIn::ViewIndex
            }
            // vertex
            Bi::BaseInstance | Bi::BaseVertex => {
                self.require(&feature::DRAW_PARAMETERS)?;
                if built_in == Bi::BaseInstance {
                    BuiltIn::BaseInstance
                } else {
                    BuiltIn::BaseVertex
                }
            }
            Bi::ClipDistances => {
                self.require_any(
                    "`clip_distances` built-in",
                    &[spirv::Capability::ClipDistance],
                )?;
                BuiltIn::ClipDistance
            }
            Bi::CullDistance => {
                self.require_any(
                    "`cull_distance` built-in",
                    &[spirv::Capability::CullDistance],
                )?;
                BuiltIn::CullDistance
            }
            Bi::InstanceIndex => BuiltIn::InstanceIndex,
            Bi::PointSize => {
                match stage {
                    crate::ShaderStage::Geometry => self.require_any(
                        "`gl_PointSize` in a geometry shader",
                        &[spirv::Capability::GeometryPointSize],
                    )?,
                    crate::ShaderStage::TessControl | crate::ShaderStage::TessEvaluation => self
                        .require_any(
                            "`gl_PointSize` in a tessellation shader",
                            &[spirv::Capability::TessellationPointSize],
                        )?,
                    _ => {}
                }
                BuiltIn::PointSize
            }
            Bi::InvocationId => BuiltIn::InvocationId,
            Bi::PatchVertices => BuiltIn::PatchVertices,
            Bi::TessCoord => BuiltIn::TessCoord,
            Bi::TessLevelOuter => {
                others.push(Decoration::Patch);
                BuiltIn::TessLevelOuter
            }
            Bi::TessLevelInner => {
                others.push(Decoration::Patch);
                BuiltIn::TessLevelInner
            }
            Bi::Layer { .. } => {
                self.require_layer_capability(stage, true)?;
                if mesh_output {
                    others.push(Decoration::PerPrimitiveEXT);
                }
                BuiltIn::Layer
            }
            Bi::ViewportIndex => {
                self.require_layer_capability(stage, false)?;
                if mesh_output {
                    others.push(Decoration::PerPrimitiveEXT);
                }
                BuiltIn::ViewportIndex
            }
            Bi::ViewportMaskNV => {
                self.require(&feature::VIEWPORT_MASK)?;
                if mesh_output {
                    others.push(Decoration::PerPrimitiveEXT);
                }
                BuiltIn::ViewportMaskNV
            }
            Bi::SecondaryPositionNV | Bi::SecondaryViewportMaskNV => {
                self.require(&feature::STEREO_VIEW)?;
                if built_in == Bi::SecondaryPositionNV {
                    BuiltIn::SecondaryPositionNV
                } else {
                    BuiltIn::SecondaryViewportMaskNV
                }
            }
            Bi::PositionPerViewNV | Bi::ViewportMaskPerViewNV => {
                self.require(&feature::PER_VIEW_ATTRIBUTES)?;
                if stage == crate::ShaderStage::Mesh {
                    if mesh_output && built_in == Bi::ViewportMaskPerViewNV {
                        others.push(Decoration::PerPrimitiveEXT);
                    }
                    others.push(Decoration::PerViewNV);
                }
                if built_in == Bi::PositionPerViewNV {
                    BuiltIn::PositionPerViewNV
                } else {
                    BuiltIn::ViewportMaskPerViewNV
                }
            }
            Bi::VertexIndex => BuiltIn::VertexIndex,
            Bi::DrawIndex => {
                self.require(&feature::DRAW_PARAMETERS)?;
                BuiltIn::DrawIndex
            }
            // fragment
            Bi::FragDepth => BuiltIn::FragDepth,
            Bi::PointCoord => BuiltIn::PointCoord,
            Bi::FrontFacing => BuiltIn::FrontFacing,
            Bi::PrimitiveIndex => {
                if !stage.ray_tracing()
                    && !matches!(
                        stage,
                        crate::ShaderStage::TessControl
                            | crate::ShaderStage::TessEvaluation
                            | crate::ShaderStage::Mesh
                    )
                {
                    self.require_any("`primitive_index` built-in", &[spirv::Capability::Geometry])?;
                }
                if stage == crate::ShaderStage::Mesh {
                    others.push(Decoration::PerPrimitiveEXT);
                }
                BuiltIn::PrimitiveId
            }
            Bi::Barycentric {
                perspective,
                flavor,
            } => {
                self.require_barycentrics(flavor)?;
                if perspective {
                    BuiltIn::BaryCoordKHR
                } else {
                    BuiltIn::BaryCoordNoPerspKHR
                }
            }
            Bi::AmdBarycentric(barycentric) => {
                use rglsl_types::builtin::AmdBarycentric as Amd;
                self.use_feature(&feature::AMD_SHADER_EXPLICIT_VERTEX_PARAMETER);
                match barycentric {
                    Amd::NoPerspective => BuiltIn::BaryCoordNoPerspAMD,
                    Amd::NoPerspectiveCentroid => BuiltIn::BaryCoordNoPerspCentroidAMD,
                    Amd::NoPerspectiveSample => BuiltIn::BaryCoordNoPerspSampleAMD,
                    Amd::Smooth => BuiltIn::BaryCoordSmoothAMD,
                    Amd::SmoothCentroid => BuiltIn::BaryCoordSmoothCentroidAMD,
                    Amd::SmoothSample => BuiltIn::BaryCoordSmoothSampleAMD,
                    Amd::PullModel => BuiltIn::BaryCoordPullModelAMD,
                }
            }
            Bi::SampleIndex => {
                self.require_any(
                    "`sample_index` built-in",
                    &[spirv::Capability::SampleRateShading],
                )?;

                BuiltIn::SampleId
            }
            Bi::SampleMask { .. } => BuiltIn::SampleMask,
            Bi::SamplePosition => {
                self.require_any(
                    "`gl_SamplePosition`",
                    &[spirv::Capability::SampleRateShading],
                )?;
                BuiltIn::SamplePosition
            }
            Bi::HelperInvocation => {
                if self.lang_version() >= (1, 6) && !self.vulkan_memory_model {
                    others.push(Decoration::Volatile);
                }
                BuiltIn::HelperInvocation
            }
            Bi::DeviceIndex => {
                self.require(&feature::DEVICE_GROUP)?;
                BuiltIn::DeviceIndex
            }
            Bi::ShadingRate => {
                self.require(&feature::FRAGMENT_SHADING_RATE)?;
                BuiltIn::ShadingRateKHR
            }
            Bi::FragSize(flavor) | Bi::FragInvocationCount(flavor) => {
                self.require(match flavor {
                    crate::FragmentDensityFlavor::Ext => &feature::FRAGMENT_DENSITY_EXT,
                    crate::FragmentDensityFlavor::Nv => &feature::FRAGMENT_DENSITY_NV,
                })?;
                if matches!(built_in, Bi::FragSize(_)) {
                    BuiltIn::FragSizeEXT
                } else {
                    BuiltIn::FragInvocationCountEXT
                }
            }
            Bi::FullyCovered => {
                self.require(&feature::FRAGMENT_FULLY_COVERED)?;
                BuiltIn::FullyCoveredEXT
            }
            Bi::FragStencilRef => {
                self.require(&feature::STENCIL_EXPORT)?;
                BuiltIn::FragStencilRefEXT
            }
            // compute
            Bi::GlobalInvocationId => BuiltIn::GlobalInvocationId,
            Bi::LocalInvocationId => BuiltIn::LocalInvocationId,
            Bi::LocalInvocationIndex => BuiltIn::LocalInvocationIndex,
            Bi::WorkGroupId => BuiltIn::WorkgroupId,
            Bi::WorkGroupSize => BuiltIn::WorkgroupSize,
            Bi::NumWorkGroups => BuiltIn::NumWorkgroups,
            // Subgroup
            Bi::NumSubgroups => {
                self.require_any(
                    "`num_subgroups` built-in",
                    &[spirv::Capability::GroupNonUniform],
                )?;
                BuiltIn::NumSubgroups
            }
            Bi::SubgroupId => {
                self.require_any(
                    "`subgroup_id` built-in",
                    &[spirv::Capability::GroupNonUniform],
                )?;
                BuiltIn::SubgroupId
            }
            Bi::SubgroupSize => {
                self.require_any(
                    "`subgroup_size` built-in",
                    &[
                        spirv::Capability::GroupNonUniform,
                        spirv::Capability::SubgroupBallotKHR,
                    ],
                )?;
                BuiltIn::SubgroupSize
            }
            Bi::SubgroupInvocationId => {
                self.require_any(
                    "`subgroup_invocation_id` built-in",
                    &[
                        spirv::Capability::GroupNonUniform,
                        spirv::Capability::SubgroupBallotKHR,
                    ],
                )?;
                BuiltIn::SubgroupLocalInvocationId
            }
            Bi::SubgroupMask(mask) => {
                self.require_all(&[
                    spirv::Capability::GroupNonUniform,
                    spirv::Capability::GroupNonUniformBallot,
                ])
                .map_err(|missing| {
                    Error::MissingCapabilities("subgroup mask built-in", vec![missing])
                })?;
                subgroup_mask(mask)
            }
            Bi::ShaderBallot(ballot) => {
                self.require(&feature::SHADER_BALLOT)?;
                match ballot {
                    crate::ShaderBallot::Size => BuiltIn::SubgroupSize,
                    crate::ShaderBallot::InvocationId => BuiltIn::SubgroupLocalInvocationId,
                    crate::ShaderBallot::Mask(mask) => subgroup_mask(mask),
                }
            }
            Bi::CullPrimitive => {
                others.push(Decoration::PerPrimitiveEXT);
                BuiltIn::CullPrimitiveEXT
            }
            Bi::PrimitiveShadingRate => {
                self.require(&feature::FRAGMENT_SHADING_RATE)?;
                if mesh_output {
                    others.push(Decoration::PerPrimitiveEXT);
                }
                BuiltIn::PrimitiveShadingRateKHR
            }
            Bi::TaskCountNV => BuiltIn::TaskCountNV,
            Bi::PrimitiveCountNV => BuiltIn::PrimitiveCountNV,
            Bi::PrimitiveIndicesNV => BuiltIn::PrimitiveIndicesNV,
            Bi::ShaderCore(core) => self.shader_core_builtin(core)?,
            Bi::MeshViewCountNV => BuiltIn::MeshViewCountNV,
            Bi::MeshViewIndicesNV => BuiltIn::MeshViewIndicesNV,
            Bi::ClipDistancePerViewNV => {
                others.push(Decoration::PerViewNV);
                BuiltIn::ClipDistancePerViewNV
            }
            Bi::CullDistancePerViewNV => {
                others.push(Decoration::PerViewNV);
                BuiltIn::CullDistancePerViewNV
            }
            Bi::LayerPerViewNV => {
                if mesh_output {
                    others.push(Decoration::PerPrimitiveEXT);
                }
                others.push(Decoration::PerViewNV);
                BuiltIn::LayerPerViewNV
            }
            Bi::TileOffset => {
                self.require(&feature::TILE_SHADING)?;
                BuiltIn::TileOffsetQCOM
            }
            Bi::TileDimension => {
                self.require(&feature::TILE_SHADING)?;
                BuiltIn::TileDimensionQCOM
            }
            Bi::TileApronSize => {
                self.require(&feature::TILE_SHADING)?;
                BuiltIn::TileApronSizeQCOM
            }
            Bi::PointIndex => BuiltIn::PrimitivePointIndicesEXT,
            Bi::LineIndices => BuiltIn::PrimitiveLineIndicesEXT,
            Bi::TriangleIndices => BuiltIn::PrimitiveTriangleIndicesEXT,
            // No decoration, this EmitMeshTasksEXT is called at function return
            Bi::MeshTaskSize => return Ok(BindingDecorations::None),
            // These aren't normal builtins and don't occur in function output
            Bi::VertexCount | Bi::Vertices | Bi::PrimitiveCount | Bi::Primitives => {
                return Err(Error::Validation(
                    "a mesh output built-in is used as a varying",
                ));
            }
            // ray tracing pipeline
            Bi::RayInvocationId => BuiltIn::LaunchIdKHR,
            Bi::NumRayInvocations => BuiltIn::LaunchSizeKHR,
            Bi::InstanceCustomData => BuiltIn::InstanceCustomIndexKHR,
            Bi::GeometryIndex => BuiltIn::RayGeometryIndexKHR,
            Bi::WorldRayOrigin => BuiltIn::WorldRayOriginKHR,
            Bi::WorldRayDirection => BuiltIn::WorldRayDirectionKHR,
            Bi::ObjectRayOrigin => BuiltIn::ObjectRayOriginKHR,
            Bi::ObjectRayDirection => BuiltIn::ObjectRayDirectionKHR,
            Bi::RayTmin => BuiltIn::RayTminKHR,
            Bi::RayTCurrentMax => BuiltIn::RayTmaxKHR,
            Bi::ObjectToWorld => BuiltIn::ObjectToWorldKHR,
            Bi::WorldToObject => BuiltIn::WorldToObjectKHR,
            Bi::HitKind => BuiltIn::HitKindKHR,
            Bi::InstanceId => BuiltIn::InstanceId,
            Bi::IncomingRayFlags => BuiltIn::IncomingRayFlagsKHR,
            Bi::CullMask => {
                self.require(&feature::RAY_CULL_MASK)?;
                BuiltIn::CullMaskKHR
            }
            Bi::HitTriangleVertexPositions => {
                self.require(&feature::RAY_TRACING_POSITION_FETCH)?;
                BuiltIn::HitTriangleVertexPositionsKHR
            }
            Bi::CurrentRayTime => {
                self.require(&feature::RAY_TRACING_MOTION_BLUR)?;
                BuiltIn::CurrentRayTimeNV
            }
            Bi::ClusterId => {
                self.require(&feature::CLUSTER_ACCELERATION_STRUCTURE)?;
                BuiltIn::ClusterIDNV
            }
            Bi::HitMicroTriangleVertexPositions => {
                self.require(&feature::DISPLACEMENT_MICROMAP)?;
                BuiltIn::HitMicroTriangleVertexPositionsNV
            }
            Bi::HitMicroTriangleVertexBarycentrics => {
                self.require(&feature::DISPLACEMENT_MICROMAP)?;
                BuiltIn::HitMicroTriangleVertexBarycentricsNV
            }
            Bi::HitKindFrontFacingMicroTriangle => {
                self.require(&feature::DISPLACEMENT_MICROMAP)?;
                BuiltIn::HitKindFrontFacingMicroTriangleNV
            }
            Bi::HitKindBackFacingMicroTriangle => {
                self.require(&feature::DISPLACEMENT_MICROMAP)?;
                BuiltIn::HitKindBackFacingMicroTriangleNV
            }
            Bi::HitIsSphere => {
                self.require(&feature::SPHERE_GEOMETRY)?;
                BuiltIn::HitIsSphereNV
            }
            Bi::HitSpherePosition => {
                self.require(&feature::SPHERE_GEOMETRY)?;
                BuiltIn::HitSpherePositionNV
            }
            Bi::HitSphereRadius => {
                self.require(&feature::SPHERE_GEOMETRY)?;
                BuiltIn::HitSphereRadiusNV
            }
            Bi::HitIsLss => {
                self.require(&feature::LSS_GEOMETRY)?;
                BuiltIn::HitIsLSSNV
            }
            Bi::HitLssPositions => {
                self.require(&feature::LSS_GEOMETRY)?;
                BuiltIn::HitLSSPositionsNV
            }
            Bi::HitLssRadii => {
                self.require(&feature::LSS_GEOMETRY)?;
                BuiltIn::HitLSSRadiiNV
            }
        };

        if class == spirv::StorageClass::Input && stage == crate::ShaderStage::Fragment {
            let mut element = ty;
            while let crate::TypeInner::Array { base, .. } = ir_module.types[element].inner {
                element = base;
            }
            let is_flat = match ir_module.types[element].inner {
                crate::TypeInner::Scalar(scalar) | crate::TypeInner::Vector { scalar, .. } => {
                    scalar.kind.is_integer()
                }
                _ => false,
            };

            if is_flat {
                others.push(Decoration::Flat);
            }
        }
        Ok(BindingDecorations::BuiltIn(built_in, others))
    }

    pub(super) fn require_barycentrics(
        &mut self,
        flavor: crate::BarycentricFlavor,
    ) -> Result<(), Error> {
        self.require(match flavor {
            crate::BarycentricFlavor::Khr => &feature::BARYCENTRICS_KHR,
            crate::BarycentricFlavor::Nv => &feature::BARYCENTRICS_NV,
        })
    }

    fn shader_core_builtin(&mut self, core: crate::ShaderCore) -> Result<BuiltIn, Error> {
        use crate::ShaderCore as Sc;
        let nv = &feature::SHADER_SM_BUILTINS;
        let arm = &feature::CORE_BUILTINS_ARM;
        let (built_in, feature) = match core {
            Sc::WarpsPerSmNv => (BuiltIn::WarpsPerSMNV, nv),
            Sc::SmCountNv => (BuiltIn::SMCountNV, nv),
            Sc::WarpIdNv => (BuiltIn::WarpIDNV, nv),
            Sc::SmIdNv => (BuiltIn::SMIDNV, nv),
            Sc::CoreIdArm => (BuiltIn::CoreIDARM, arm),
            Sc::CoreCountArm => (BuiltIn::CoreCountARM, arm),
            Sc::CoreMaxIdArm => (BuiltIn::CoreMaxIDARM, arm),
            Sc::WarpIdArm => (BuiltIn::WarpIDARM, arm),
            Sc::WarpMaxIdArm => (BuiltIn::WarpMaxIDARM, arm),
        };
        self.require(feature)?;
        Ok(built_in)
    }
}

const fn subgroup_mask(mask: crate::SubgroupMask) -> BuiltIn {
    match mask {
        crate::SubgroupMask::Eq => BuiltIn::SubgroupEqMask,
        crate::SubgroupMask::Ge => BuiltIn::SubgroupGeMask,
        crate::SubgroupMask::Gt => BuiltIn::SubgroupGtMask,
        crate::SubgroupMask::Le => BuiltIn::SubgroupLeMask,
        crate::SubgroupMask::Lt => BuiltIn::SubgroupLtMask,
    }
}
