use rglsl_types::builtin::BuiltIn::*;
use rglsl_types::extension::Extension::{self, *};

use super::ConstantValue::{Bool, Int, Uint};
use super::VariableKind::{Constant, Input};
use super::{BuiltinVariable, Redeclaration, VariableFlags};
use crate::builtins::{ALL_STAGES, ANY_HIT, CLOSEST_HIT, INTERSECTION, MISS};
use rglsl_types::ShaderStageMask;

const HIT: ShaderStageMask = INTERSECTION.union(ANY_HIT).union(CLOSEST_HIT);
const TRAVERSAL: ShaderStageMask = HIT.union(MISS);
const ALL_RAY: ShaderStageMask = ShaderStageMask::RAY_TRACING;
const ANY_OR_CLOSEST_HIT: ShaderStageMask = ANY_HIT.union(CLOSEST_HIT);
const NV: &[Extension] = &[NvRayTracing];
const EXT: &[Extension] = &[ExtRayTracing];
const EITHER: &[Extension] = &[NvRayTracing, ExtRayTracing];

const RAY: BuiltinVariable = BuiltinVariable {
    since: 460,
    flags: VariableFlags::GATE,
    ..BuiltinVariable::DEFAULT
};

pub(super) const CONSTANTS: &[BuiltinVariable] = variables! {
    defaults: RAY;
    "gl_RayFlagsNoneNV": Constant(Uint(0)) => uint
    "gl_RayFlagsNoneEXT": Constant(Uint(0)) => uint
    "gl_RayFlagsOpaqueNV": Constant(Uint(1)) => uint
    "gl_RayFlagsOpaqueEXT": Constant(Uint(1)) => uint
    "gl_RayFlagsNoOpaqueNV": Constant(Uint(2)) => uint
    "gl_RayFlagsNoOpaqueEXT": Constant(Uint(2)) => uint
    "gl_RayFlagsTerminateOnFirstHitNV": Constant(Uint(4)) => uint
    "gl_RayFlagsTerminateOnFirstHitEXT": Constant(Uint(4)) => uint
    "gl_RayFlagsSkipClosestHitShaderNV": Constant(Uint(8)) => uint
    "gl_RayFlagsSkipClosestHitShaderEXT": Constant(Uint(8)) => uint
    "gl_RayFlagsCullBackFacingTrianglesNV": Constant(Uint(16)) => uint
    "gl_RayFlagsCullBackFacingTrianglesEXT": Constant(Uint(16)) => uint
    "gl_RayFlagsCullFrontFacingTrianglesNV": Constant(Uint(32)) => uint
    "gl_RayFlagsCullFrontFacingTrianglesEXT": Constant(Uint(32)) => uint
    "gl_RayFlagsCullOpaqueNV": Constant(Uint(64)) => uint
    "gl_RayFlagsCullOpaqueEXT": Constant(Uint(64)) => uint
    "gl_RayFlagsCullNoOpaqueNV": Constant(Uint(128)) => uint
    "gl_RayFlagsCullNoOpaqueEXT": Constant(Uint(128)) => uint
    "gl_RayFlagsSkipTrianglesEXT": Constant(Uint(256)) => uint { requires_one_of: &[ExtRayFlagsPrimitiveCulling] }
    "gl_RayFlagsSkipBuiltinPrimitivesNV": Constant(Uint(256)) => uint
    "gl_RayFlagsSkipAABBEXT": Constant(Uint(512)) => uint { requires_one_of: &[ExtRayFlagsPrimitiveCulling] }
    "gl_RayFlagsForceOpacityMicromap2StateEXT": Constant(Uint(1024)) => uint { requires_one_of: &[ExtOpacityMicromap] }
    "gl_HitKindFrontFacingTriangleEXT": Constant(Uint(254)) => uint
    "gl_HitKindBackFacingTriangleEXT": Constant(Uint(255)) => uint
    "gl_RayQueryCandidateIntersectionEXT": Constant(Uint(0)) => uint
    "gl_RayQueryCommittedIntersectionEXT": Constant(Uint(1)) => uint
    "gl_RayQueryCommittedIntersectionNoneEXT": Constant(Uint(0)) => uint
    "gl_RayQueryCommittedIntersectionTriangleEXT": Constant(Uint(1)) => uint
    "gl_RayQueryCommittedIntersectionGeneratedEXT": Constant(Uint(2)) => uint
    "gl_RayQueryCandidateIntersectionTriangleEXT": Constant(Uint(0)) => uint
    "gl_RayQueryCandidateIntersectionAABBEXT": Constant(Uint(1)) => uint
    "gl_ClusterIDNoneNV": Constant(Int(-1)) => int
    "gl_EnableOpacityMicromapEXT": Constant(Bool(false)) => bool {
        requires_one_of: &[ExtOpacityMicromapRayQueryMode],
        redeclaration: Some(Redeclaration::Free),
    }
};

pub(super) const VARIABLES: &[BuiltinVariable] = variables! {
    defaults: RAY;
    "gl_LaunchIDNV": Input(RayInvocationId) => uvec3 {
        stages: ALL_RAY,
        requires_one_of: NV,
        shared: Some("gl_LaunchIDEXT"),
    }
    "gl_LaunchIDEXT": Input(RayInvocationId) => uvec3 {
        stages: ALL_RAY,
        requires_one_of: EXT,
    }
    "gl_LaunchSizeNV": Input(NumRayInvocations) => uvec3 {
        stages: ALL_RAY,
        requires_one_of: NV,
        shared: Some("gl_LaunchSizeEXT"),
    }
    "gl_LaunchSizeEXT": Input(NumRayInvocations) => uvec3 {
        stages: ALL_RAY,
        requires_one_of: EXT,
    }
    "gl_PrimitiveID": Input(PrimitiveIndex) => int {
        stages: HIT,
        requires_one_of: EITHER,
    }
    "gl_InstanceID": Input(InstanceId) => int {
        stages: HIT,
        requires_one_of: EITHER,
    }
    "gl_InstanceCustomIndexNV": Input(InstanceCustomData) => int {
        stages: HIT,
        requires_one_of: NV,
        shared: Some("gl_InstanceCustomIndexEXT"),
    }
    "gl_InstanceCustomIndexEXT": Input(InstanceCustomData) => int {
        stages: HIT,
        requires_one_of: EXT,
    }
    "gl_GeometryIndexEXT": Input(GeometryIndex) => int {
        stages: HIT,
        requires_one_of: EXT,
    }
    "gl_ObjectRayOriginEXT": Input(ObjectRayOrigin) => vec3 {
        stages: HIT,
        requires_one_of: EXT,
    }
    "gl_ObjectRayDirectionEXT": Input(ObjectRayDirection) => vec3 {
        stages: HIT,
        requires_one_of: EXT,
    }
    "gl_ObjectToWorldNV": Input(ObjectToWorld) => mat4x3 {
        stages: HIT,
        requires_one_of: NV,
        shared: Some("gl_ObjectToWorldEXT"),
    }
    "gl_ObjectToWorldEXT": Input(ObjectToWorld) => mat4x3 {
        stages: HIT,
        requires_one_of: EXT,
    }
    "gl_ObjectToWorld3x4EXT": Input(ObjectToWorld) => mat3x4 {
        stages: HIT,
        requires_one_of: EXT,
        shared: Some("gl_ObjectToWorldEXT"),
        named: Some("gl_ObjectToWorldEXT"),
        flags: variable_flags!(GATE, TRANSPOSED),
    }
    "gl_WorldToObjectNV": Input(WorldToObject) => mat4x3 {
        stages: HIT,
        requires_one_of: NV,
        shared: Some("gl_WorldToObjectEXT"),
    }
    "gl_WorldToObjectEXT": Input(WorldToObject) => mat4x3 {
        stages: HIT,
        requires_one_of: EXT,
    }
    "gl_WorldToObject3x4EXT": Input(WorldToObject) => mat3x4 {
        stages: HIT,
        requires_one_of: EXT,
        shared: Some("gl_WorldToObjectEXT"),
        named: Some("gl_WorldToObjectEXT"),
        flags: variable_flags!(GATE, TRANSPOSED),
    }
    "gl_WorldRayOriginNV": Input(WorldRayOrigin) => vec3 {
        stages: TRAVERSAL,
        requires_one_of: NV,
        shared: Some("gl_WorldRayOriginEXT"),
    }
    "gl_WorldRayOriginEXT": Input(WorldRayOrigin) => vec3 {
        stages: TRAVERSAL,
        requires_one_of: EXT,
    }
    "gl_WorldRayDirectionNV": Input(WorldRayDirection) => vec3 {
        stages: TRAVERSAL,
        requires_one_of: NV,
        shared: Some("gl_WorldRayDirectionEXT"),
    }
    "gl_WorldRayDirectionEXT": Input(WorldRayDirection) => vec3 {
        stages: TRAVERSAL,
        requires_one_of: EXT,
    }
    "gl_ObjectRayOriginNV": Input(ObjectRayOrigin) => vec3 {
        stages: TRAVERSAL,
        requires_one_of: NV,
        shared: Some("gl_ObjectRayOriginEXT"),
    }
    "gl_ObjectRayDirectionNV": Input(ObjectRayDirection) => vec3 {
        stages: TRAVERSAL,
        requires_one_of: NV,
        shared: Some("gl_ObjectRayDirectionEXT"),
    }
    "gl_RayTminNV": Input(RayTmin) => float {
        stages: TRAVERSAL,
        requires_one_of: NV,
        shared: Some("gl_RayTminEXT"),
    }
    "gl_RayTminEXT": Input(RayTmin) => float {
        stages: TRAVERSAL,
        requires_one_of: EXT,
    }
    "gl_RayTmaxNV": Input(RayTCurrentMax) => float {
        stages: TRAVERSAL,
        requires_one_of: NV,
        shared: Some("gl_RayTmaxEXT"),
    }
    "gl_RayTmaxEXT": Input(RayTCurrentMax) => float {
        stages: TRAVERSAL,
        requires_one_of: EXT,
    }
    "gl_IncomingRayFlagsNV": Input(IncomingRayFlags) => uint {
        stages: TRAVERSAL,
        requires_one_of: NV,
        shared: Some("gl_IncomingRayFlagsEXT"),
    }
    "gl_IncomingRayFlagsEXT": Input(IncomingRayFlags) => uint {
        stages: TRAVERSAL,
        requires_one_of: EXT,
    }
    "gl_CurrentRayTimeNV": Input(CurrentRayTime) => float {
        stages: TRAVERSAL,
        requires_one_of: &[NvRayTracingMotionBlur],
    }
    "gl_CullMaskEXT": Input(CullMask) => uint {
        stages: TRAVERSAL,
        requires_one_of: &[ExtRayCullMask],
    }
    "gl_HitTNV": Input(RayTCurrentMax) => float {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: NV,
        shared: Some("gl_RayTmaxEXT"),
        named: Some("gl_RayTmaxNV"),
    }
    "gl_HitTEXT": Input(RayTCurrentMax) => float {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: EXT,
        shared: Some("gl_RayTmaxEXT"),
        named: Some("gl_RayTmaxEXT"),
    }
    "gl_HitKindNV": Input(HitKind) => uint {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: NV,
        shared: Some("gl_HitKindEXT"),
    }
    "gl_HitKindEXT": Input(HitKind) => uint {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: EXT,
    }
    "gl_HitTriangleVertexPositionsEXT": Input(HitTriangleVertexPositions) => vec3[3] {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: &[ExtRayTracingPositionFetch],
    }
    "gl_HitMicroTriangleVertexPositionsNV": Input(HitMicroTriangleVertexPositions) => vec3[3] {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: &[NvDisplacementMicromap],
    }
    "gl_HitMicroTriangleVertexBarycentricsNV": Input(HitMicroTriangleVertexBarycentrics) => vec2[3] {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: &[NvDisplacementMicromap],
    }
    "gl_ClusterIDNV": Input(ClusterId) => int {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: &[NvClusterAccelerationStructure],
    }
    "gl_HitIsSphereNV": Input(HitIsSphere) => bool {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: &[NvLinearSweptSpheres],
    }
    "gl_HitIsLSSNV": Input(HitIsLss) => bool {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: &[NvLinearSweptSpheres],
    }
    "gl_HitSpherePositionNV": Input(HitSpherePosition) => vec3 {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: &[NvLinearSweptSpheres],
    }
    "gl_HitSphereRadiusNV": Input(HitSphereRadius) => float {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: &[NvLinearSweptSpheres],
    }
    "gl_HitLSSPositionsNV": Input(HitLssPositions) => vec3[2] {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: &[NvLinearSweptSpheres],
    }
    "gl_HitLSSRadiiNV": Input(HitLssRadii) => float[2] {
        stages: ANY_OR_CLOSEST_HIT,
        requires_one_of: &[NvLinearSweptSpheres],
    }
    "gl_HitKindFrontFacingMicroTriangleNV": Input(HitKindFrontFacingMicroTriangle) => uint {
        stages: ALL_STAGES,
    }
    "gl_HitKindBackFacingMicroTriangleNV": Input(HitKindBackFacingMicroTriangle) => uint {
        stages: ALL_STAGES,
    }
};
