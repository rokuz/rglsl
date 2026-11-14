use super::{ANY_HIT, CALLABLE, CLOSEST_HIT, INTERSECTION, MISS, RAY_GENERATION};
use rglsl_types::ShaderStage;
use rglsl_types::extension::Extension;

const HIT: u16 = INTERSECTION | ANY_HIT | CLOSEST_HIT;
const TRAVERSAL: u16 = HIT | MISS;
const ALL_RAY: u16 = RAY_GENERATION | TRAVERSAL | CALLABLE;

pub(super) struct RayVariable {
    pub stages: u16,
    pub text: &'static str,
}

pub(super) const VARIABLES: &[RayVariable] = &[
    RayVariable {
        stages: ALL_RAY,
        text: "
in uvec3 gl_LaunchIDNV
in uvec3 gl_LaunchIDEXT
in uvec3 gl_LaunchSizeNV
in uvec3 gl_LaunchSizeEXT
",
    },
    RayVariable {
        stages: HIT,
        text: "
in int gl_PrimitiveID
in int gl_InstanceID
in int gl_InstanceCustomIndexNV
in int gl_InstanceCustomIndexEXT
in int gl_GeometryIndexEXT
in vec3 gl_ObjectRayOriginEXT
in vec3 gl_ObjectRayDirectionEXT
in mat4x3 gl_ObjectToWorldNV
in mat4x3 gl_ObjectToWorldEXT
in mat3x4 gl_ObjectToWorld3x4EXT
in mat4x3 gl_WorldToObjectNV
in mat4x3 gl_WorldToObjectEXT
in mat3x4 gl_WorldToObject3x4EXT
",
    },
    RayVariable {
        stages: TRAVERSAL,
        text: "
in vec3 gl_WorldRayOriginNV
in vec3 gl_WorldRayOriginEXT
in vec3 gl_WorldRayDirectionNV
in vec3 gl_WorldRayDirectionEXT
in vec3 gl_ObjectRayOriginNV
in vec3 gl_ObjectRayDirectionNV
in float gl_RayTminNV
in float gl_RayTminEXT
in float gl_RayTmaxNV
in float gl_RayTmaxEXT
in uint gl_IncomingRayFlagsNV
in uint gl_IncomingRayFlagsEXT
in float gl_CurrentRayTimeNV
in uint gl_CullMaskEXT
",
    },
    RayVariable {
        stages: ANY_HIT | CLOSEST_HIT,
        text: "
in float gl_HitTNV
in float gl_HitTEXT
in uint gl_HitKindNV
in uint gl_HitKindEXT
in vec3 gl_HitTriangleVertexPositionsEXT[3]
in vec3 gl_HitMicroTriangleVertexPositionsNV[3]
in vec2 gl_HitMicroTriangleVertexBarycentricsNV[3]
in int gl_ClusterIDNV
in bool gl_HitIsSphereNV
in bool gl_HitIsLSSNV
in vec3 gl_HitSpherePositionNV
in float gl_HitSphereRadiusNV
in vec3 gl_HitLSSPositionsNV[2]
in float gl_HitLSSRadiiNV[2]
",
    },
    RayVariable {
        stages: ALL_RAY,
        text: "
in uint gl_HitKindFrontFacingMicroTriangleNV
in uint gl_HitKindBackFacingMicroTriangleNV
",
    },
];

pub(super) const INT_CONSTANTS: [(&str, i32); 1] = [("gl_ClusterIDNoneNV", -1)];

pub(super) const UINT_CONSTANTS: [(&str, u32); 31] = [
    ("gl_RayFlagsNoneNV", 0),
    ("gl_RayFlagsNoneEXT", 0),
    ("gl_RayFlagsOpaqueNV", 1),
    ("gl_RayFlagsOpaqueEXT", 1),
    ("gl_RayFlagsNoOpaqueNV", 2),
    ("gl_RayFlagsNoOpaqueEXT", 2),
    ("gl_RayFlagsTerminateOnFirstHitNV", 4),
    ("gl_RayFlagsTerminateOnFirstHitEXT", 4),
    ("gl_RayFlagsSkipClosestHitShaderNV", 8),
    ("gl_RayFlagsSkipClosestHitShaderEXT", 8),
    ("gl_RayFlagsCullBackFacingTrianglesNV", 16),
    ("gl_RayFlagsCullBackFacingTrianglesEXT", 16),
    ("gl_RayFlagsCullFrontFacingTrianglesNV", 32),
    ("gl_RayFlagsCullFrontFacingTrianglesEXT", 32),
    ("gl_RayFlagsCullOpaqueNV", 64),
    ("gl_RayFlagsCullOpaqueEXT", 64),
    ("gl_RayFlagsCullNoOpaqueNV", 128),
    ("gl_RayFlagsCullNoOpaqueEXT", 128),
    ("gl_RayFlagsSkipTrianglesEXT", 256),
    ("gl_RayFlagsSkipBuiltinPrimitivesNV", 256),
    ("gl_RayFlagsSkipAABBEXT", 512),
    ("gl_RayFlagsForceOpacityMicromap2StateEXT", 1024),
    ("gl_HitKindFrontFacingTriangleEXT", 254),
    ("gl_HitKindBackFacingTriangleEXT", 255),
    ("gl_RayQueryCandidateIntersectionEXT", 0),
    ("gl_RayQueryCommittedIntersectionEXT", 1),
    ("gl_RayQueryCommittedIntersectionNoneEXT", 0),
    ("gl_RayQueryCommittedIntersectionTriangleEXT", 1),
    ("gl_RayQueryCommittedIntersectionGeneratedEXT", 2),
    ("gl_RayQueryCandidateIntersectionTriangleEXT", 0),
    ("gl_RayQueryCandidateIntersectionAABBEXT", 1),
];

pub(crate) fn variable_extensions(name: &str, stage: ShaderStage) -> Option<&'static [Extension]> {
    const NV: &[Extension] = &[Extension::NvRayTracing];
    const EXT: &[Extension] = &[Extension::ExtRayTracing];
    const EITHER: &[Extension] = &[Extension::NvRayTracing, Extension::ExtRayTracing];
    Some(match name {
        "gl_PrimitiveID" | "gl_InstanceID" if stage.ray_tracing() => EITHER,
        "gl_CullMaskEXT" => &[Extension::ExtRayCullMask],
        "gl_CurrentRayTimeNV" => &[Extension::NvRayTracingMotionBlur],
        "gl_HitTriangleVertexPositionsEXT" => &[Extension::ExtRayTracingPositionFetch],
        "gl_RayFlagsSkipAABBEXT" | "gl_RayFlagsSkipTrianglesEXT" => {
            &[Extension::ExtRayFlagsPrimitiveCulling]
        }
        "gl_RayFlagsForceOpacityMicromap2StateEXT" => &[Extension::ExtOpacityMicromap],
        "gl_EnableOpacityMicromapEXT" => &[Extension::ExtOpacityMicromapRayQueryMode],
        "gl_HitMicroTriangleVertexPositionsNV" | "gl_HitMicroTriangleVertexBarycentricsNV" => {
            &[Extension::NvDisplacementMicromap]
        }
        "gl_ClusterIDNV" => &[Extension::NvClusterAccelerationStructure],
        "gl_HitIsSphereNV"
        | "gl_HitIsLSSNV"
        | "gl_HitSpherePositionNV"
        | "gl_HitSphereRadiusNV"
        | "gl_HitLSSPositionsNV"
        | "gl_HitLSSRadiiNV" => &[Extension::NvLinearSweptSpheres],
        "gl_HitKindFrontFacingMicroTriangleNV"
        | "gl_HitKindBackFacingMicroTriangleNV"
        | "gl_ClusterIDNoneNV" => return None,
        _ if !stage.ray_tracing() || !name.starts_with("gl_") => return None,
        "gl_WarpsPerSMNV" | "gl_SMCountNV" | "gl_WarpIDNV" | "gl_SMIDNV" => return None,
        _ if name.starts_with("gl_RayFlags")
            || name.starts_with("gl_HitKind") && name.ends_with("TriangleEXT")
            || name.starts_with("gl_RayQuery") =>
        {
            return None;
        }
        _ if name.ends_with("NV") => NV,
        _ if name.ends_with("EXT") => EXT,
        _ => return None,
    })
}
