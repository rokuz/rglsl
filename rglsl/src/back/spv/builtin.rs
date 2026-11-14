use alloc::vec;

use arrayvec::ArrayVec;
use spirv::BuiltIn;

use super::{Error, Writer, helpers::BindingDecorations};
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
                if self.lang_version() < (1, 3) {
                    self.use_extension("SPV_KHR_multiview");
                }
                self.require_any("`view_index` built-in", &[spirv::Capability::MultiView])?;
                BuiltIn::ViewIndex
            }
            // vertex
            Bi::BaseInstance | Bi::BaseVertex => {
                if self.lang_version() < (1, 3) {
                    self.use_extension("SPV_KHR_shader_draw_parameters");
                }
                self.require_any(
                    "draw parameter built-ins",
                    &[spirv::Capability::DrawParameters],
                )?;
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
                self.use_extension("SPV_NV_viewport_array2");
                self.require_any(
                    "`gl_ViewportMask`",
                    &[spirv::Capability::ShaderViewportMaskNV],
                )?;
                if mesh_output {
                    others.push(Decoration::PerPrimitiveEXT);
                }
                BuiltIn::ViewportMaskNV
            }
            Bi::SecondaryPositionNV | Bi::SecondaryViewportMaskNV => {
                self.use_extension("SPV_NV_stereo_view_rendering");
                self.require_any(
                    "stereo view rendering built-ins",
                    &[spirv::Capability::ShaderStereoViewNV],
                )?;
                if built_in == Bi::SecondaryPositionNV {
                    BuiltIn::SecondaryPositionNV
                } else {
                    BuiltIn::SecondaryViewportMaskNV
                }
            }
            Bi::PositionPerViewNV | Bi::ViewportMaskPerViewNV => {
                self.use_extension("SPV_NVX_multiview_per_view_attributes");
                self.require_any(
                    "per-view attribute built-ins",
                    &[spirv::Capability::PerViewAttributesNV],
                )?;
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
                if self.lang_version() < (1, 3) {
                    self.use_extension("SPV_KHR_shader_draw_parameters");
                }
                self.require_any("`draw_index built-in", &[spirv::Capability::DrawParameters])?;
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
            Bi::Barycentric { perspective, nv } => {
                self.require_barycentrics(nv)?;
                if perspective {
                    BuiltIn::BaryCoordKHR
                } else {
                    BuiltIn::BaryCoordNoPerspKHR
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
                if self.lang_version() < (1, 3) {
                    self.use_extension("SPV_KHR_device_group");
                }
                self.require_any("`gl_DeviceIndex`", &[spirv::Capability::DeviceGroup])?;
                BuiltIn::DeviceIndex
            }
            Bi::ShadingRate => {
                self.use_extension("SPV_KHR_fragment_shading_rate");
                self.require_any(
                    "`gl_ShadingRateEXT`",
                    &[spirv::Capability::FragmentShadingRateKHR],
                )?;
                BuiltIn::ShadingRateKHR
            }
            Bi::FragSize { nv } | Bi::FragInvocationCount { nv } => {
                self.use_extension(if nv {
                    "SPV_NV_shading_rate"
                } else {
                    "SPV_EXT_fragment_invocation_density"
                });
                self.require_any(
                    "fragment density built-ins",
                    &[spirv::Capability::FragmentDensityEXT],
                )?;
                if matches!(built_in, Bi::FragSize { .. }) {
                    BuiltIn::FragSizeEXT
                } else {
                    BuiltIn::FragInvocationCountEXT
                }
            }
            Bi::FullyCovered => {
                self.use_extension("SPV_EXT_fragment_fully_covered");
                self.require_any(
                    "`gl_FragFullyCoveredNV`",
                    &[spirv::Capability::FragmentFullyCoveredEXT],
                )?;
                BuiltIn::FullyCoveredEXT
            }
            Bi::FragStencilRef => {
                self.use_extension("SPV_EXT_shader_stencil_export");
                self.require_any(
                    "`gl_FragStencilRefARB`",
                    &[spirv::Capability::StencilExportEXT],
                )?;
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
                self.use_extension("SPV_KHR_shader_ballot");
                self.require_any(
                    "shader ballot built-in",
                    &[spirv::Capability::SubgroupBallotKHR],
                )?;
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
                self.use_extension("SPV_KHR_fragment_shading_rate");
                self.require_any(
                    "`gl_PrimitiveShadingRateEXT`",
                    &[spirv::Capability::FragmentShadingRateKHR],
                )?;
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
            Bi::ClipDistancePerViewNV | Bi::CullDistancePerViewNV | Bi::LayerPerViewNV => {
                if built_in == Bi::LayerPerViewNV && mesh_output {
                    others.push(Decoration::PerPrimitiveEXT);
                }
                others.push(Decoration::PerViewNV);
                match built_in {
                    Bi::ClipDistancePerViewNV => BuiltIn::ClipDistancePerViewNV,
                    Bi::CullDistancePerViewNV => BuiltIn::CullDistancePerViewNV,
                    _ => BuiltIn::LayerPerViewNV,
                }
            }
            Bi::TileOffset | Bi::TileDimension | Bi::TileApronSize => {
                self.require_tile_shading()?;
                match built_in {
                    Bi::TileOffset => BuiltIn::TileOffsetQCOM,
                    Bi::TileDimension => BuiltIn::TileDimensionQCOM,
                    _ => BuiltIn::TileApronSizeQCOM,
                }
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
                self.require_any("`gl_CullMaskEXT`", &[spirv::Capability::RayCullMaskKHR])?;
                self.use_extension("SPV_KHR_ray_cull_mask");
                BuiltIn::CullMaskKHR
            }
            Bi::HitTriangleVertexPositions => {
                self.require_any(
                    "`gl_HitTriangleVertexPositionsEXT`",
                    &[spirv::Capability::RayTracingPositionFetchKHR],
                )?;
                self.use_extension("SPV_KHR_ray_tracing_position_fetch");
                BuiltIn::HitTriangleVertexPositionsKHR
            }
            Bi::CurrentRayTime => {
                self.require_any(
                    "`gl_CurrentRayTimeNV`",
                    &[spirv::Capability::RayTracingMotionBlurNV],
                )?;
                self.use_extension("SPV_NV_ray_tracing_motion_blur");
                BuiltIn::CurrentRayTimeNV
            }
            Bi::ClusterId => {
                self.require_cluster_acceleration_structure()?;
                BuiltIn::ClusterIDNV
            }
            Bi::HitMicroTriangleVertexPositions
            | Bi::HitMicroTriangleVertexBarycentrics
            | Bi::HitKindFrontFacingMicroTriangle
            | Bi::HitKindBackFacingMicroTriangle => {
                self.require_any(
                    "displacement micromaps",
                    &[spirv::Capability::RayTracingDisplacementMicromapNV],
                )?;
                self.use_extension("SPV_NV_displacement_micromap");
                match built_in {
                    Bi::HitMicroTriangleVertexPositions => {
                        BuiltIn::HitMicroTriangleVertexPositionsNV
                    }
                    Bi::HitMicroTriangleVertexBarycentrics => {
                        BuiltIn::HitMicroTriangleVertexBarycentricsNV
                    }
                    Bi::HitKindFrontFacingMicroTriangle => {
                        BuiltIn::HitKindFrontFacingMicroTriangleNV
                    }
                    _ => BuiltIn::HitKindBackFacingMicroTriangleNV,
                }
            }
            Bi::HitIsSphere | Bi::HitSpherePosition | Bi::HitSphereRadius => {
                self.require_sphere_geometry()?;
                match built_in {
                    Bi::HitIsSphere => BuiltIn::HitIsSphereNV,
                    Bi::HitSpherePosition => BuiltIn::HitSpherePositionNV,
                    _ => BuiltIn::HitSphereRadiusNV,
                }
            }
            Bi::HitIsLss | Bi::HitLssPositions | Bi::HitLssRadii => {
                self.require_lss_geometry()?;
                match built_in {
                    Bi::HitIsLss => BuiltIn::HitIsLSSNV,
                    Bi::HitLssPositions => BuiltIn::HitLSSPositionsNV,
                    _ => BuiltIn::HitLSSRadiiNV,
                }
            }
        };

        use crate::ScalarKind as Sk;

        // Per the Vulkan spec, `VUID-StandaloneSpirv-Flat-04744`:
        //
        // > Any variable with integer or double-precision floating-
        // > point type and with Input storage class in a fragment
        // > shader, must be decorated Flat
        if class == spirv::StorageClass::Input && stage == crate::ShaderStage::Fragment {
            let mut element = ty;
            while let crate::TypeInner::Array { base, .. } = ir_module.types[element].inner {
                element = base;
            }
            let is_flat = match ir_module.types[element].inner {
                crate::TypeInner::Scalar(scalar) | crate::TypeInner::Vector { scalar, .. } => {
                    match scalar.kind {
                        Sk::Uint | Sk::Sint => true,
                        Sk::Bool
                        | Sk::Float
                        | Sk::BFloat
                        | Sk::FloatE4M3
                        | Sk::FloatE5M2
                        | Sk::FloatE2M1
                        | Sk::FloatE3M2
                        | Sk::FloatE2M3
                        | Sk::FloatUE8M0
                        | Sk::FloatMXINT8 => false,
                    }
                }
                _ => false,
            };

            if is_flat {
                others.push(Decoration::Flat);
            }
        }
        Ok(BindingDecorations::BuiltIn(built_in, others))
    }

    pub(super) fn require_barycentrics(&mut self, nv: bool) -> Result<(), Error> {
        self.use_extension(if nv {
            "SPV_NV_fragment_shader_barycentric"
        } else {
            "SPV_KHR_fragment_shader_barycentric"
        });
        self.require_any(
            "fragment shader barycentrics",
            &[spirv::Capability::FragmentBarycentricKHR],
        )
    }

    fn shader_core_builtin(&mut self, core: crate::ShaderCore) -> Result<BuiltIn, Error> {
        use crate::ShaderCore as Sc;
        let (built_in, nv) = match core {
            Sc::WarpsPerSmNv => (BuiltIn::WarpsPerSMNV, true),
            Sc::SmCountNv => (BuiltIn::SMCountNV, true),
            Sc::WarpIdNv => (BuiltIn::WarpIDNV, true),
            Sc::SmIdNv => (BuiltIn::SMIDNV, true),
            Sc::CoreIdArm => (BuiltIn::CoreIDARM, false),
            Sc::CoreCountArm => (BuiltIn::CoreCountARM, false),
            Sc::CoreMaxIdArm => (BuiltIn::CoreMaxIDARM, false),
            Sc::WarpIdArm => (BuiltIn::WarpIDARM, false),
            Sc::WarpMaxIdArm => (BuiltIn::WarpMaxIDARM, false),
        };
        if nv {
            self.use_extension("SPV_NV_shader_sm_builtins");
            self.require_any(
                "shader SM built-ins",
                &[spirv::Capability::ShaderSMBuiltinsNV],
            )?;
        } else {
            self.use_extension("SPV_ARM_core_builtins");
            self.require_any(
                "shader core built-ins",
                &[spirv::Capability::CoreBuiltinsARM],
            )?;
        }
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
