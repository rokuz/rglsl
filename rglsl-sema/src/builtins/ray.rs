use super::{
    Section, ALL_STAGES, ANY_HIT, CALLABLE, CLOSEST_HIT, INTERSECTION, MISS, RAY_GENERATION,
};

const RT_NV: &str = "GL_NV_ray_tracing";
const RT_EXT: &str = "GL_EXT_ray_tracing";
const RAY_QUERY: &str = "GL_EXT_ray_query";
const MOTION_BLUR: &str = "GL_NV_ray_tracing_motion_blur";
const CULL_MASK: &str = "GL_EXT_ray_cull_mask";
const POSITION_FETCH: &str = "GL_EXT_ray_tracing_position_fetch";
const PRIMITIVE_CULLING: &str = "GL_EXT_ray_flags_primitive_culling";
const OPACITY_MICROMAP: &str = "GL_EXT_opacity_micromap";

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
",
    },
];

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

pub(crate) fn variable_extensions(
    name: &str,
    stage: super::Stage,
) -> Option<&'static [&'static str]> {
    const NV: &[&str] = &[RT_NV];
    const EXT: &[&str] = &[RT_EXT];
    const EITHER: &[&str] = &[RT_NV, RT_EXT];
    Some(match name {
        "gl_PrimitiveID" | "gl_InstanceID" if stage.ray_tracing() => EITHER,
        "gl_CullMaskEXT" => &[CULL_MASK],
        "gl_CurrentRayTimeNV" => &[MOTION_BLUR],
        "gl_HitTriangleVertexPositionsEXT" => &[POSITION_FETCH],
        "gl_RayFlagsSkipAABBEXT" | "gl_RayFlagsSkipTrianglesEXT" => &[PRIMITIVE_CULLING],
        "gl_RayFlagsForceOpacityMicromap2StateEXT" => &[OPACITY_MICROMAP],
        _ if !stage.ray_tracing() || !name.starts_with("gl_") => return None,
        _ if name.starts_with("gl_RayFlags")
            || name.starts_with("gl_HitKind") && name.ends_with("TriangleEXT")
            || name.starts_with("gl_RayQuery") =>
        {
            return None
        }
        _ if name.ends_with("NV") => NV,
        _ if name.ends_with("EXT") => EXT,
        _ => return None,
    })
}

pub(crate) fn function_extensions(name: &str) -> Option<&'static [&'static str]> {
    Some(match name {
        "traceNV"
        | "reportIntersectionNV"
        | "ignoreIntersectionNV"
        | "terminateRayNV"
        | "executeCallableNV" => &[RT_NV],
        "traceRayEXT" | "reportIntersectionEXT" | "executeCallableEXT" => &[RT_EXT],
        "traceRayMotionNV" => &[MOTION_BLUR],
        "rayQueryGetIntersectionTriangleVertexPositionsEXT" => &[POSITION_FETCH],
        _ if name.starts_with("rayQuery") => &[RAY_QUERY],
        _ => return None,
    })
}
