use super::{
    ALL_STAGES, ANY_HIT, CALLABLE, CLOSEST_HIT, COMPUTE, INTERSECTION, MESH, MISS, RAY_GENERATION,
    Section,
};
use rglsl_types::ShaderStage;
use rglsl_types::extension::Extension;

const RAY_QUERY_FUNCTIONS: &str = "
void rayQueryInitializeEXT(rayQueryEXT, accelerationStructureEXT, uint, uint, vec3, float, vec3, float)
void rayQueryTerminateEXT(rayQueryEXT)
void rayQueryGenerateIntersectionEXT(rayQueryEXT, float)
void rayQueryConfirmIntersectionEXT(rayQueryEXT)
bool rayQueryProceedEXT(rayQueryEXT)
uint rayQueryGetIntersectionTypeEXT(rayQueryEXT, bool)
float rayQueryGetRayTMinEXT(rayQueryEXT)
uint rayQueryGetRayFlagsEXT(rayQueryEXT)
vec3 rayQueryGetWorldRayOriginEXT(rayQueryEXT)
vec3 rayQueryGetWorldRayDirectionEXT(rayQueryEXT)
float rayQueryGetIntersectionTEXT(rayQueryEXT, bool)
int rayQueryGetIntersectionInstanceCustomIndexEXT(rayQueryEXT, bool)
int rayQueryGetIntersectionInstanceIdEXT(rayQueryEXT, bool)
uint rayQueryGetIntersectionInstanceShaderBindingTableRecordOffsetEXT(rayQueryEXT, bool)
int rayQueryGetIntersectionGeometryIndexEXT(rayQueryEXT, bool)
int rayQueryGetIntersectionPrimitiveIndexEXT(rayQueryEXT, bool)
vec2 rayQueryGetIntersectionBarycentricsEXT(rayQueryEXT, bool)
bool rayQueryGetIntersectionFrontFaceEXT(rayQueryEXT, bool)
bool rayQueryGetIntersectionCandidateAABBOpaqueEXT(rayQueryEXT)
vec3 rayQueryGetIntersectionObjectRayDirectionEXT(rayQueryEXT, bool)
vec3 rayQueryGetIntersectionObjectRayOriginEXT(rayQueryEXT, bool)
mat4x3 rayQueryGetIntersectionObjectToWorldEXT(rayQueryEXT, bool)
mat4x3 rayQueryGetIntersectionWorldToObjectEXT(rayQueryEXT, bool)
void rayQueryGetIntersectionTriangleVertexPositionsEXT(rayQueryEXT, bool, out vec3[3])
int rayQueryGetIntersectionClusterIdNV(rayQueryEXT, bool)
vec3 rayQueryGetIntersectionSpherePositionNV(rayQueryEXT, bool)
float rayQueryGetIntersectionSphereRadiusNV(rayQueryEXT, bool)
float rayQueryGetIntersectionLSSHitValueNV(rayQueryEXT, bool)
void rayQueryGetIntersectionLSSPositionsNV(rayQueryEXT, bool, out vec3[2])
void rayQueryGetIntersectionLSSRadiiNV(rayQueryEXT, bool, out float[2])
bool rayQueryIsSphereHitNV(rayQueryEXT, bool)
bool rayQueryIsLSSHitNV(rayQueryEXT, bool)
";

const HIT_OBJECT_FUNCTIONS: &str = "
void hitObjectTraceRayNV(hitObjectNV, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, int)
void hitObjectTraceRayMotionNV(hitObjectNV, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, float, int)
void hitObjectRecordHitNV(hitObjectNV, accelerationStructureEXT, int, int, int, uint, uint, uint, vec3, float, vec3, float, int)
void hitObjectRecordHitMotionNV(hitObjectNV, accelerationStructureEXT, int, int, int, uint, uint, uint, vec3, float, vec3, float, float, int)
void hitObjectRecordHitWithIndexNV(hitObjectNV, accelerationStructureEXT, int, int, int, uint, uint, vec3, float, vec3, float, int)
void hitObjectRecordHitWithIndexMotionNV(hitObjectNV, accelerationStructureEXT, int, int, int, uint, uint, vec3, float, vec3, float, float, int)
void hitObjectRecordMissNV(hitObjectNV, uint, vec3, float, vec3, float)
void hitObjectRecordMissMotionNV(hitObjectNV, uint, vec3, float, vec3, float, float)
void hitObjectRecordEmptyNV(hitObjectNV)
void hitObjectExecuteShaderNV(hitObjectNV, int)
bool hitObjectIsEmptyNV(hitObjectNV)
bool hitObjectIsMissNV(hitObjectNV)
bool hitObjectIsHitNV(hitObjectNV)
float hitObjectGetRayTMinNV(hitObjectNV)
float hitObjectGetRayTMaxNV(hitObjectNV)
vec3 hitObjectGetWorldRayOriginNV(hitObjectNV)
vec3 hitObjectGetWorldRayDirectionNV(hitObjectNV)
vec3 hitObjectGetObjectRayOriginNV(hitObjectNV)
vec3 hitObjectGetObjectRayDirectionNV(hitObjectNV)
mat4x3 hitObjectGetWorldToObjectNV(hitObjectNV)
mat4x3 hitObjectGetObjectToWorldNV(hitObjectNV)
int hitObjectGetInstanceCustomIndexNV(hitObjectNV)
int hitObjectGetInstanceIdNV(hitObjectNV)
int hitObjectGetGeometryIndexNV(hitObjectNV)
int hitObjectGetPrimitiveIndexNV(hitObjectNV)
uint hitObjectGetHitKindNV(hitObjectNV)
void hitObjectGetAttributesNV(hitObjectNV, int)
float hitObjectGetCurrentTimeNV(hitObjectNV)
uint hitObjectGetShaderBindingTableRecordIndexNV(hitObjectNV)
uvec2 hitObjectGetShaderRecordBufferHandleNV(hitObjectNV)
int hitObjectGetClusterIdNV(hitObjectNV)
vec3 hitObjectGetSpherePositionNV(hitObjectNV)
float hitObjectGetSphereRadiusNV(hitObjectNV)
void hitObjectGetLSSPositionsNV(hitObjectNV, out vec3[2])
void hitObjectGetLSSRadiiNV(hitObjectNV, out float[2])
bool hitObjectIsSphereHitNV(hitObjectNV)
bool hitObjectIsLSSHitNV(hitObjectNV)
void hitObjectTraceRayEXT(hitObjectEXT, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, int)
void hitObjectTraceRayMotionEXT(hitObjectEXT, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, float, int)
void hitObjectRecordMissEXT(hitObjectEXT, uint, uint, vec3, float, vec3, float)
void hitObjectRecordMissMotionEXT(hitObjectEXT, uint, uint, vec3, float, vec3, float, float)
void hitObjectRecordEmptyEXT(hitObjectEXT)
void hitObjectExecuteShaderEXT(hitObjectEXT, int)
bool hitObjectIsEmptyEXT(hitObjectEXT)
bool hitObjectIsMissEXT(hitObjectEXT)
bool hitObjectIsHitEXT(hitObjectEXT)
float hitObjectGetRayTMinEXT(hitObjectEXT)
float hitObjectGetRayTMaxEXT(hitObjectEXT)
uint hitObjectGetRayFlagsEXT(hitObjectEXT)
vec3 hitObjectGetWorldRayOriginEXT(hitObjectEXT)
vec3 hitObjectGetWorldRayDirectionEXT(hitObjectEXT)
vec3 hitObjectGetObjectRayOriginEXT(hitObjectEXT)
vec3 hitObjectGetObjectRayDirectionEXT(hitObjectEXT)
mat4x3 hitObjectGetWorldToObjectEXT(hitObjectEXT)
mat4x3 hitObjectGetObjectToWorldEXT(hitObjectEXT)
int hitObjectGetInstanceCustomIndexEXT(hitObjectEXT)
int hitObjectGetInstanceIdEXT(hitObjectEXT)
int hitObjectGetGeometryIndexEXT(hitObjectEXT)
int hitObjectGetPrimitiveIndexEXT(hitObjectEXT)
uint hitObjectGetHitKindEXT(hitObjectEXT)
void hitObjectGetAttributesEXT(hitObjectEXT, int)
float hitObjectGetCurrentTimeEXT(hitObjectEXT)
uint hitObjectGetShaderBindingTableRecordIndexEXT(hitObjectEXT)
uvec2 hitObjectGetShaderRecordBufferHandleEXT(hitObjectEXT)
void hitObjectSetShaderBindingTableRecordIndexEXT(hitObjectEXT, uint)
void hitObjectRecordFromQueryEXT(hitObjectEXT, rayQueryEXT, uint, int)
void hitObjectRecordFromQueryEXT(hitObjectEXT, rayQueryEXT, uint, int, uint)
void hitObjectGetIntersectionTriangleVertexPositionsEXT(hitObjectEXT, out vec3[3])
";

const REORDER_FUNCTIONS: &str = "
void reorderThreadNV(uint, uint)
void reorderThreadNV(hitObjectNV)
void reorderThreadNV(hitObjectNV, uint, uint)
void reorderThreadEXT(uint, uint)
void reorderThreadEXT(hitObjectEXT)
void reorderThreadEXT(hitObjectEXT, uint, uint)
void hitObjectReorderExecuteEXT(hitObjectEXT, int)
void hitObjectReorderExecuteEXT(hitObjectEXT, uint, uint, int)
void hitObjectTraceReorderExecuteEXT(hitObjectEXT, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, int)
void hitObjectTraceReorderExecuteEXT(hitObjectEXT, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, uint, uint, int)
void hitObjectTraceMotionReorderExecuteEXT(hitObjectEXT, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, float, int)
void hitObjectTraceMotionReorderExecuteEXT(hitObjectEXT, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, float, uint, uint, int)
";

const MICROMAP_FUNCTIONS: &str = "
vec3 fetchMicroTriangleVertexPositionNV(accelerationStructureEXT, int, int, int, ivec2)
vec2 fetchMicroTriangleVertexBarycentricNV(accelerationStructureEXT, int, int, int, ivec2)
";

const TRACE: &str = "
void traceNV(accelerationStructureNV, uint, uint, uint, uint, uint, vec3, float, vec3, float, int)
void traceRayMotionNV(accelerationStructureNV, uint, uint, uint, uint, uint, vec3, float, vec3, float, float, int)
void traceRayEXT(accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, int)
";

const EXECUTE_CALLABLE: &str = "
void executeCallableNV(uint, int)
void executeCallableEXT(uint, int)
";

const REPORT_INTERSECTION: &str = "
bool reportIntersectionNV(float, uint)
bool reportIntersectionEXT(float, uint)
";

const ANY_HIT_FUNCTIONS: &str = "
void ignoreIntersectionNV()
void terminateRayNV()
";

pub(super) const SECTIONS: &[Section] = &[
    Section::new(RAY_QUERY_FUNCTIONS)
        .in_stages(ALL_STAGES)
        .since(460),
    Section::new(TRACE)
        .in_stages(RAY_GENERATION | CLOSEST_HIT | MISS)
        .since(460),
    Section::new(EXECUTE_CALLABLE)
        .in_stages(RAY_GENERATION | CLOSEST_HIT | MISS | CALLABLE)
        .since(460),
    Section::new(REPORT_INTERSECTION)
        .in_stages(INTERSECTION)
        .since(460),
    Section::new(ANY_HIT_FUNCTIONS)
        .in_stages(ANY_HIT)
        .since(460),
    Section::new(HIT_OBJECT_FUNCTIONS)
        .in_stages(RAY_GENERATION | CLOSEST_HIT | MISS)
        .since(460),
    Section::new(REORDER_FUNCTIONS)
        .in_stages(RAY_GENERATION)
        .since(460),
    Section::new(MICROMAP_FUNCTIONS)
        .in_stages(RAY_GENERATION | COMPUTE | MESH)
        .since(460),
];

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

pub(crate) fn function_extensions(name: &str) -> Option<&'static [Extension]> {
    Some(match name {
        "traceNV"
        | "reportIntersectionNV"
        | "ignoreIntersectionNV"
        | "terminateRayNV"
        | "executeCallableNV" => &[Extension::NvRayTracing],
        "traceRayEXT" | "reportIntersectionEXT" | "executeCallableEXT" => {
            &[Extension::ExtRayTracing]
        }
        "traceRayMotionNV" => &[Extension::NvRayTracingMotionBlur],
        "rayQueryGetIntersectionTriangleVertexPositionsEXT" => {
            &[Extension::ExtRayTracingPositionFetch]
        }
        "rayQueryGetIntersectionClusterIdNV" | "hitObjectGetClusterIdNV" => {
            &[Extension::NvClusterAccelerationStructure]
        }
        "rayQueryGetIntersectionSpherePositionNV"
        | "rayQueryGetIntersectionSphereRadiusNV"
        | "rayQueryGetIntersectionLSSHitValueNV"
        | "rayQueryGetIntersectionLSSPositionsNV"
        | "rayQueryGetIntersectionLSSRadiiNV"
        | "rayQueryIsSphereHitNV"
        | "rayQueryIsLSSHitNV"
        | "hitObjectGetSpherePositionNV"
        | "hitObjectGetSphereRadiusNV"
        | "hitObjectGetLSSPositionsNV"
        | "hitObjectGetLSSRadiiNV"
        | "hitObjectIsSphereHitNV"
        | "hitObjectIsLSSHitNV" => &[Extension::NvLinearSweptSpheres],
        "fetchMicroTriangleVertexPositionNV" | "fetchMicroTriangleVertexBarycentricNV" => {
            &[Extension::NvDisplacementMicromap]
        }
        _ if name.starts_with("rayQuery") => &[Extension::ExtRayQuery],
        _ if name.starts_with("hitObject") || name.starts_with("reorderThread") => {
            if name.ends_with("NV") {
                &[Extension::NvShaderInvocationReorder]
            } else {
                &[Extension::ExtShaderInvocationReorder]
            }
        }
        _ => return None,
    })
}

pub(crate) fn interacting_extension(name: &str) -> Option<&'static [Extension]> {
    Some(match name {
        "hitObjectTraceRayMotionNV"
        | "hitObjectRecordHitMotionNV"
        | "hitObjectRecordHitWithIndexMotionNV"
        | "hitObjectRecordMissMotionNV"
        | "hitObjectGetCurrentTimeNV"
        | "hitObjectTraceRayMotionEXT"
        | "hitObjectRecordMissMotionEXT"
        | "hitObjectGetCurrentTimeEXT"
        | "hitObjectTraceMotionReorderExecuteEXT" => &[Extension::NvRayTracingMotionBlur],
        "hitObjectGetIntersectionTriangleVertexPositionsEXT" => {
            &[Extension::ExtRayTracingPositionFetch]
        }
        _ => return None,
    })
}
