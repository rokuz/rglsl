#[cfg(feature = "arbitrary")]
use arbitrary::Arbitrary;
#[cfg(feature = "deserialize")]
use serde::Deserialize;
#[cfg(feature = "serialize")]
use serde::Serialize;

use crate::ShaderStageMask;
use crate::flavor::{BarycentricFlavor, FragmentDensityFlavor};
use crate::rglo::Rglo;

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum SubgroupMask {
    Eq,
    Ge,
    Gt,
    Le,
    Lt,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum AmdBarycentric {
    NoPerspective,
    NoPerspectiveCentroid,
    NoPerspectiveSample,
    Smooth,
    SmoothCentroid,
    SmoothSample,
    PullModel,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum ShaderBallot {
    Size,
    InvocationId,
    Mask(SubgroupMask),
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum ShaderCore {
    WarpsPerSmNv,
    SmCountNv,
    WarpIdNv,
    SmIdNv,
    CoreIdArm,
    CoreCountArm,
    CoreMaxIdArm,
    WarpIdArm,
    WarpMaxIdArm,
}

/// Built-in inputs and outputs.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd, Rglo)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum BuiltIn {
    // This must be at the top so that it gets sorted to the top. PrimitiveIndex is considered a non SV
    // by FXC so it must appear before any other SVs.
    /// Read in fragment shaders, written in mesh shaders, read in any and closest hit shaders.
    PrimitiveIndex,

    /// Written in vertex/mesh shaders, read in fragment shaders
    Position {
        invariant: bool,
    },
    /// Read in task, mesh, vertex, and fragment shaders
    ViewIndex,

    /// Read in vertex shaders
    BaseInstance,
    /// Read in vertex shaders
    BaseVertex,
    /// Written in vertex & mesh shaders
    ClipDistances,
    /// Written in vertex & mesh shaders
    CullDistance,
    /// Read in vertex, any- and closest-hit shaders
    InstanceIndex,
    /// Written in vertex & mesh shaders
    PointSize,
    /// Read in vertex shaders
    VertexIndex,
    /// Read in vertex & task shaders, or mesh shaders in pipelines without task shaders
    DrawIndex,

    InvocationId,
    PatchVertices,
    TessCoord,
    TessLevelOuter,
    TessLevelInner,
    Layer {
        viewport_relative: bool,
        secondary_view_offset: Option<i32>,
    },
    ViewportIndex,
    ViewportMaskNV,
    SecondaryPositionNV,
    SecondaryViewportMaskNV,
    PositionPerViewNV,
    ViewportMaskPerViewNV,

    /// Written in fragment shaders
    FragDepth,
    /// Read in fragment shaders
    PointCoord,
    /// Read in fragment shaders
    FrontFacing,
    /// Read in fragment shaders
    Barycentric {
        perspective: bool,
        flavor: BarycentricFlavor,
    },
    /// Read in fragment shaders
    AmdBarycentric(AmdBarycentric),
    /// Read in fragment shaders
    SampleIndex,
    /// Read or written in fragment shaders
    SampleMask {
        override_coverage: bool,
    },
    SamplePosition,
    HelperInvocation,
    DeviceIndex,
    ShadingRate,
    FragSize(FragmentDensityFlavor),
    FragInvocationCount(FragmentDensityFlavor),
    FullyCovered,
    FragStencilRef,

    /// Read in compute, task, and mesh shaders
    GlobalInvocationId,
    /// Read in compute, task, and mesh shaders
    LocalInvocationId,
    /// Read in compute, task, and mesh shaders
    LocalInvocationIndex,
    /// Read in compute, task, and mesh shaders
    WorkGroupId,
    /// Read in compute, task, and mesh shaders
    WorkGroupSize,
    /// Read in compute, task, and mesh shaders
    NumWorkGroups,

    /// Read in compute, task, and mesh shaders
    NumSubgroups,
    /// Read in compute, task, and mesh shaders
    SubgroupId,
    /// Read in compute, fragment, task, and mesh shaders
    SubgroupSize,
    /// Read in compute, fragment, task, and mesh shaders
    SubgroupInvocationId,
    SubgroupMask(SubgroupMask),
    ShaderBallot(ShaderBallot),
    TileOffset,
    TileDimension,
    TileApronSize,
    ShaderCore(ShaderCore),

    /// Written in task shaders
    MeshTaskSize,
    /// Written in mesh shaders
    CullPrimitive,
    /// Written in mesh shaders
    PointIndex,
    /// Written in mesh shaders
    LineIndices,
    /// Written in mesh shaders
    TriangleIndices,

    /// Written to a workgroup variable in mesh shaders
    VertexCount,
    /// Written to a workgroup variable in mesh shaders
    Vertices,
    /// Written to a workgroup variable in mesh shaders
    PrimitiveCount,
    /// Written to a workgroup variable in mesh shaders
    Primitives,

    PrimitiveShadingRate,
    TaskCountNV,
    PrimitiveCountNV,
    PrimitiveIndicesNV,
    MeshViewCountNV,
    MeshViewIndicesNV,
    ClipDistancePerViewNV,
    CullDistancePerViewNV,
    LayerPerViewNV,

    /// Read in all ray tracing pipeline shaders, the id within the number of
    /// rays that this current ray is.
    RayInvocationId,
    /// Read in all ray tracing pipeline shaders, the number of rays created.
    NumRayInvocations,
    /// Read in closest hit and any hit shaders, the custom data in the tlas
    /// instance
    InstanceCustomData,
    /// Read in closest hit and any hit shaders, the index of the geometry in
    /// the blas.
    GeometryIndex,
    /// Read in closest hit, any hit, and miss shaders, the origin of the ray.
    WorldRayOrigin,
    /// Read in closest hit, any hit, and miss shaders, the direction of the
    /// ray.
    WorldRayDirection,
    /// Read in closest hit and any hit shaders, the direction of the ray in
    /// object space.
    ObjectRayOrigin,
    /// Read in closest hit and any hit shaders, the direction of the ray in
    /// object space.
    ObjectRayDirection,
    /// Read in closest hit, any hit, and miss shaders, the t min provided by
    /// in the ray desc.
    RayTmin,
    /// Read in closest hit, any hit, and miss shaders, the final bounds at which
    /// a hit is accepted (the closest committed hit if there is one otherwise, t
    /// max provided in the ray desc).
    RayTCurrentMax,
    /// Read in closest hit and any hit shaders, the matrix for converting from
    /// object space to world space
    ObjectToWorld,
    /// Read in closest hit and any hit shaders, the matrix for converting from
    /// world space to object space
    WorldToObject,
    /// Read in closest hit and any hit shaders, the type of hit as provided by
    /// the intersection function if any, otherwise this is 254 (0xFE) for a
    /// front facing triangle and 255 (0xFF) for a back facing triangle
    HitKind,
    InstanceId,
    IncomingRayFlags,
    CullMask,
    HitTriangleVertexPositions,
    CurrentRayTime,
    ClusterId,
    HitMicroTriangleVertexPositions,
    HitMicroTriangleVertexBarycentrics,
    HitKindFrontFacingMicroTriangle,
    HitKindBackFacingMicroTriangle,
    HitIsSphere,
    HitIsLss,
    HitSpherePosition,
    HitSphereRadius,
    HitLssPositions,
    HitLssRadii,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Component {
    F32,
    I32,
    U32,
    Bool,
    Index,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum BuiltInValue {
    Scalar(Component),
    Vector(u8, Component),
    Matrix { columns: u8, rows: u8 },
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ArrayLength {
    Any,
    Constant,
    Exactly(u32),
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum BuiltInType {
    Any,
    AnyArray,
    Value(BuiltInValue),
    Array {
        element: BuiltInValue,
        length: ArrayLength,
    },
    NestedArray(BuiltInValue),
    ValueOrNestedArray {
        value: BuiltInValue,
        element: BuiltInValue,
    },
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum MeshAccess {
    Stages,
    InterfaceOutput,
    InputWithoutTaskPayload,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct BuiltInInfo {
    pub inputs: ShaderStageMask,
    pub outputs: ShaderStageMask,
    pub mesh: MeshAccess,
    pub ty: BuiltInType,
}

const NONE: ShaderStageMask = ShaderStageMask::empty();
const ALL: ShaderStageMask = ShaderStageMask::all();
const VERTEX: ShaderStageMask = ShaderStageMask::VERTEX;
const FRAGMENT: ShaderStageMask = ShaderStageMask::FRAGMENT;
const TASK: ShaderStageMask = ShaderStageMask::TASK;
const MESH: ShaderStageMask = ShaderStageMask::MESH;
const TESS_CONTROL: ShaderStageMask = ShaderStageMask::TESS_CONTROL;
const TESS_EVALUATION: ShaderStageMask = ShaderStageMask::TESS_EVALUATION;
const GEOMETRY: ShaderStageMask = ShaderStageMask::GEOMETRY;
const ARRAYED: ShaderStageMask = TESS_CONTROL.union(TESS_EVALUATION).union(GEOMETRY);
const PRE_RASTERIZATION: ShaderStageMask = VERTEX.union(ARRAYED).union(MESH);
const COMPUTE_LIKE: ShaderStageMask = ShaderStageMask::COMPUTE.union(TASK).union(MESH);
const TILE: ShaderStageMask = ShaderStageMask::COMPUTE.union(FRAGMENT);
const ANY_OR_CLOSEST_HIT: ShaderStageMask =
    ShaderStageMask::ANY_HIT.union(ShaderStageMask::CLOSEST_HIT);
const HIT: ShaderStageMask = ANY_OR_CLOSEST_HIT.union(ShaderStageMask::INTERSECTION);
const TRAVERSAL: ShaderStageMask = HIT.union(ShaderStageMask::MISS);
const RAY_TRACING: ShaderStageMask = TRAVERSAL
    .union(ShaderStageMask::RAY_GENERATION)
    .union(ShaderStageMask::CALLABLE);

const F32: BuiltInValue = BuiltInValue::Scalar(Component::F32);
const I32: BuiltInValue = BuiltInValue::Scalar(Component::I32);
const U32: BuiltInValue = BuiltInValue::Scalar(Component::U32);
const BOOL: BuiltInValue = BuiltInValue::Scalar(Component::Bool);
const INDEX: BuiltInValue = BuiltInValue::Scalar(Component::Index);
const VEC2: BuiltInValue = BuiltInValue::Vector(2, Component::F32);
const VEC3: BuiltInValue = BuiltInValue::Vector(3, Component::F32);
const VEC4: BuiltInValue = BuiltInValue::Vector(4, Component::F32);
const IVEC2: BuiltInValue = BuiltInValue::Vector(2, Component::I32);
const UVEC2: BuiltInValue = BuiltInValue::Vector(2, Component::U32);
const UVEC3: BuiltInValue = BuiltInValue::Vector(3, Component::U32);
const UVEC4: BuiltInValue = BuiltInValue::Vector(4, Component::U32);
const MAT4X3: BuiltInValue = BuiltInValue::Matrix {
    columns: 4,
    rows: 3,
};

const fn access(inputs: ShaderStageMask, outputs: ShaderStageMask, ty: BuiltInType) -> BuiltInInfo {
    BuiltInInfo {
        inputs,
        outputs,
        mesh: MeshAccess::Stages,
        ty,
    }
}

const fn input(stages: ShaderStageMask, value: BuiltInValue) -> BuiltInInfo {
    access(stages, NONE, BuiltInType::Value(value))
}

const fn output(stages: ShaderStageMask, value: BuiltInValue) -> BuiltInInfo {
    access(NONE, stages, BuiltInType::Value(value))
}

const fn mesh_output(ty: BuiltInType) -> BuiltInInfo {
    BuiltInInfo {
        inputs: NONE,
        outputs: NONE,
        mesh: MeshAccess::InterfaceOutput,
        ty,
    }
}

const fn array(element: BuiltInValue, length: ArrayLength) -> BuiltInType {
    BuiltInType::Array { element, length }
}

impl BuiltIn {
    pub const fn info(self) -> BuiltInInfo {
        use ArrayLength::{Any, Constant, Exactly};
        match self {
            Self::PrimitiveIndex => BuiltInInfo {
                inputs: FRAGMENT.union(HIT).union(ARRAYED),
                outputs: GEOMETRY,
                mesh: MeshAccess::InterfaceOutput,
                ty: BuiltInType::Value(INDEX),
            },
            Self::Position { .. } => access(
                FRAGMENT.union(ARRAYED),
                VERTEX.union(MESH).union(ARRAYED),
                BuiltInType::Value(VEC4),
            ),
            Self::ViewIndex => input(
                VERTEX
                    .union(FRAGMENT)
                    .union(TASK)
                    .union(MESH)
                    .union(ARRAYED),
                INDEX,
            ),
            Self::BaseInstance | Self::BaseVertex | Self::VertexIndex | Self::InstanceIndex => {
                input(VERTEX, INDEX)
            }
            Self::ClipDistances | Self::CullDistance => access(
                FRAGMENT.union(ARRAYED),
                VERTEX.union(MESH).union(ARRAYED),
                array(F32, Constant),
            ),
            Self::PointSize => access(
                ARRAYED,
                VERTEX.union(MESH).union(ARRAYED),
                BuiltInType::Value(F32),
            ),
            Self::DrawIndex => BuiltInInfo {
                inputs: VERTEX.union(TASK),
                outputs: NONE,
                mesh: MeshAccess::InputWithoutTaskPayload,
                ty: BuiltInType::Value(INDEX),
            },
            Self::InvocationId => input(TESS_CONTROL.union(GEOMETRY), INDEX),
            Self::PatchVertices => input(TESS_CONTROL.union(TESS_EVALUATION), INDEX),
            Self::TessCoord => input(TESS_EVALUATION, VEC3),
            Self::TessLevelOuter => access(TESS_EVALUATION, TESS_CONTROL, array(F32, Exactly(4))),
            Self::TessLevelInner => access(TESS_EVALUATION, TESS_CONTROL, array(F32, Exactly(2))),
            Self::Layer { .. } | Self::ViewportIndex => {
                access(FRAGMENT, PRE_RASTERIZATION, BuiltInType::Value(INDEX))
            }
            Self::ViewportMaskNV | Self::SecondaryViewportMaskNV | Self::ViewportMaskPerViewNV => {
                access(NONE, PRE_RASTERIZATION, BuiltInType::NestedArray(I32))
            }
            Self::SecondaryPositionNV => {
                access(ARRAYED, PRE_RASTERIZATION, BuiltInType::Value(VEC4))
            }
            Self::PositionPerViewNV => {
                access(ARRAYED, PRE_RASTERIZATION, BuiltInType::NestedArray(VEC4))
            }
            Self::FragDepth => output(FRAGMENT, F32),
            Self::PointCoord | Self::SamplePosition => input(FRAGMENT, VEC2),
            Self::FrontFacing | Self::HelperInvocation | Self::FullyCovered => {
                input(FRAGMENT, BOOL)
            }
            Self::Barycentric { .. } | Self::AmdBarycentric(AmdBarycentric::PullModel) => {
                input(FRAGMENT, VEC3)
            }
            Self::AmdBarycentric(_) => input(FRAGMENT, VEC2),
            Self::SampleIndex => input(FRAGMENT, INDEX),
            Self::SampleMask { .. } => access(
                FRAGMENT,
                FRAGMENT,
                BuiltInType::ValueOrNestedArray {
                    value: U32,
                    element: INDEX,
                },
            ),
            Self::DeviceIndex => input(ALL, INDEX),
            Self::ShadingRate | Self::FragInvocationCount(_) => input(FRAGMENT, I32),
            Self::FragSize(_) => input(FRAGMENT, IVEC2),
            Self::FragStencilRef => output(FRAGMENT, I32),
            Self::GlobalInvocationId
            | Self::LocalInvocationId
            | Self::WorkGroupId
            | Self::WorkGroupSize
            | Self::NumWorkGroups => input(COMPUTE_LIKE, UVEC3),
            Self::LocalInvocationIndex | Self::NumSubgroups | Self::SubgroupId => {
                input(COMPUTE_LIKE, U32)
            }
            Self::ShaderBallot(ShaderBallot::Size) => input(ALL, INDEX),
            Self::SubgroupSize
            | Self::SubgroupInvocationId
            | Self::ShaderBallot(ShaderBallot::InvocationId)
            | Self::ShaderCore(_) => input(ALL, U32),
            Self::SubgroupMask(_) | Self::ShaderBallot(ShaderBallot::Mask(_)) => input(ALL, UVEC4),
            Self::TileOffset | Self::TileApronSize => input(TILE, UVEC2),
            Self::TileDimension => input(TILE, UVEC3),
            Self::MeshTaskSize => output(TASK, UVEC3),
            Self::CullPrimitive => mesh_output(BuiltInType::Value(BOOL)),
            Self::PointIndex | Self::PrimitiveIndicesNV => mesh_output(array(U32, Any)),
            Self::LineIndices => mesh_output(array(UVEC2, Any)),
            Self::TriangleIndices => mesh_output(array(UVEC3, Any)),
            Self::PrimitiveCountNV => mesh_output(BuiltInType::Value(U32)),
            Self::VertexCount | Self::Vertices | Self::PrimitiveCount | Self::Primitives => {
                access(NONE, NONE, BuiltInType::Any)
            }
            Self::PrimitiveShadingRate => output(PRE_RASTERIZATION, I32),
            Self::TaskCountNV => output(TASK, U32),
            Self::MeshViewCountNV => input(TASK.union(MESH), U32),
            Self::MeshViewIndicesNV => access(TASK.union(MESH), NONE, array(U32, Any)),
            Self::ClipDistancePerViewNV | Self::CullDistancePerViewNV => {
                access(NONE, PRE_RASTERIZATION, BuiltInType::AnyArray)
            }
            Self::LayerPerViewNV => access(NONE, PRE_RASTERIZATION, array(I32, Any)),
            Self::RayInvocationId | Self::NumRayInvocations => input(RAY_TRACING, UVEC3),
            Self::InstanceCustomData | Self::GeometryIndex | Self::InstanceId => input(HIT, INDEX),
            Self::WorldRayOrigin | Self::WorldRayDirection => input(TRAVERSAL, VEC3),
            Self::ObjectRayOrigin | Self::ObjectRayDirection => input(HIT, VEC3),
            Self::RayTmin | Self::RayTCurrentMax | Self::CurrentRayTime => input(TRAVERSAL, F32),
            Self::IncomingRayFlags | Self::CullMask => input(TRAVERSAL, U32),
            Self::ObjectToWorld | Self::WorldToObject => input(HIT, MAT4X3),
            Self::HitKind => input(ANY_OR_CLOSEST_HIT, U32),
            Self::HitTriangleVertexPositions | Self::HitMicroTriangleVertexPositions => {
                access(ANY_OR_CLOSEST_HIT, NONE, array(VEC3, Exactly(3)))
            }
            Self::HitMicroTriangleVertexBarycentrics => {
                access(ANY_OR_CLOSEST_HIT, NONE, array(VEC2, Exactly(3)))
            }
            Self::HitLssPositions => access(ANY_OR_CLOSEST_HIT, NONE, array(VEC3, Exactly(2))),
            Self::HitLssRadii => access(ANY_OR_CLOSEST_HIT, NONE, array(F32, Any)),
            Self::ClusterId => input(ANY_OR_CLOSEST_HIT, I32),
            Self::HitKindFrontFacingMicroTriangle | Self::HitKindBackFacingMicroTriangle => {
                input(ALL, U32)
            }
            Self::HitIsSphere | Self::HitIsLss => input(ANY_OR_CLOSEST_HIT, BOOL),
            Self::HitSpherePosition => input(ANY_OR_CLOSEST_HIT, VEC3),
            Self::HitSphereRadius => input(ANY_OR_CLOSEST_HIT, F32),
        }
    }

    pub const fn canonical(self) -> Self {
        match self {
            Self::Position { .. } => Self::Position { invariant: false },
            Self::Barycentric { perspective, .. } => Self::Barycentric {
                perspective,
                flavor: BarycentricFlavor::Khr,
            },
            Self::Layer { .. } => Self::Layer {
                viewport_relative: false,
                secondary_view_offset: None,
            },
            Self::SampleMask { .. } => Self::SampleMask {
                override_coverage: false,
            },
            other => other,
        }
    }
}
