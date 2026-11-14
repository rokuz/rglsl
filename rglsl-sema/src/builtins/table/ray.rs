use rglsl_types::extension::Extension::*;

use super::BuiltinFunction;
use crate::builtins::kind::BuiltinKind::Ray;
use crate::builtins::kind::HitObjectFlavor::{Ext, Nv};
use crate::builtins::kind::Ray::*;
use crate::builtins::kind::{
    HitObject as Object, HitObjectValue, MicroTriangleValue, RayIntersection, RayQueryFunction,
    RayQueryValue,
};
use crate::builtins::{
    ANY_HIT, CALLABLE, CLOSEST_HIT, COMPUTE, INTERSECTION, MESH, MISS, RAY_GENERATION,
};
use rglsl_types::ShaderStageMask;

const TRACE_STAGES: ShaderStageMask = RAY_GENERATION.union(CLOSEST_HIT).union(MISS);

pub(super) const FUNCTIONS: &[BuiltinFunction] = builtins! {
    "rayQueryInitializeEXT": Ray(QueryFunction(RayQueryFunction::Initialize)) => [
        void(rayQueryEXT, accelerationStructureEXT, uint, uint, vec3, float, vec3, float),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryTerminateEXT": Ray(QueryFunction(RayQueryFunction::Terminate)) => [
        void(rayQueryEXT),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGenerateIntersectionEXT": Ray(QueryFunction(RayQueryFunction::GenerateIntersection)) => [
        void(rayQueryEXT, float),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryConfirmIntersectionEXT": Ray(QueryFunction(RayQueryFunction::ConfirmIntersection)) => [
        void(rayQueryEXT),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryProceedEXT": Ray(QueryFunction(RayQueryFunction::Proceed)) => [bool(rayQueryEXT)] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionTypeEXT": Ray(Intersection(RayIntersection::Type)) => [
        uint(rayQueryEXT, bool),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetRayTMinEXT": Ray(Query(RayQueryValue::RayTMin)) => [float(rayQueryEXT)] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetRayFlagsEXT": Ray(Query(RayQueryValue::RayFlags)) => [uint(rayQueryEXT)] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetWorldRayOriginEXT": Ray(Query(RayQueryValue::WorldRayOrigin)) => [
        vec3(rayQueryEXT),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetWorldRayDirectionEXT": Ray(Query(RayQueryValue::WorldRayDirection)) => [
        vec3(rayQueryEXT),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionTEXT": Ray(Intersection(RayIntersection::T)) => [
        float(rayQueryEXT, bool),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionInstanceCustomIndexEXT": Ray(Intersection(RayIntersection::InstanceCustomIndex)) => [
        int(rayQueryEXT, bool),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionInstanceIdEXT": Ray(Intersection(RayIntersection::InstanceId)) => [
        int(rayQueryEXT, bool),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionInstanceShaderBindingTableRecordOffsetEXT": Ray(Intersection(RayIntersection::InstanceShaderBindingTableRecordOffset)) => [
        uint(rayQueryEXT, bool),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionGeometryIndexEXT": Ray(Intersection(RayIntersection::GeometryIndex)) => [
        int(rayQueryEXT, bool),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionPrimitiveIndexEXT": Ray(Intersection(RayIntersection::PrimitiveIndex)) => [
        int(rayQueryEXT, bool),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionBarycentricsEXT": Ray(Intersection(RayIntersection::Barycentrics)) => [
        vec2(rayQueryEXT, bool),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionFrontFaceEXT": Ray(Intersection(RayIntersection::FrontFace)) => [
        bool(rayQueryEXT, bool),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionCandidateAABBOpaqueEXT": Ray(Query(RayQueryValue::CandidateAabbOpaque)) => [
        bool(rayQueryEXT),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionObjectRayDirectionEXT": Ray(Intersection(RayIntersection::ObjectRayDirection)) => [
        vec3(rayQueryEXT, bool),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionObjectRayOriginEXT": Ray(Intersection(RayIntersection::ObjectRayOrigin)) => [
        vec3(rayQueryEXT, bool),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionObjectToWorldEXT": Ray(Intersection(RayIntersection::ObjectToWorld)) => [
        mat4x3(rayQueryEXT, bool),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionWorldToObjectEXT": Ray(Intersection(RayIntersection::WorldToObject)) => [
        mat4x3(rayQueryEXT, bool),
    ] {
        requires: &[ExtRayQuery],
        since: 460,
    }
    "rayQueryGetIntersectionTriangleVertexPositionsEXT": Ray(Intersection(RayIntersection::TriangleVertexPositions)) => [
        void(rayQueryEXT, bool, out vec3[3]),
    ] {
        requires: &[ExtRayTracingPositionFetch],
        since: 460,
    }
    "rayQueryGetIntersectionClusterIdNV": Ray(Intersection(RayIntersection::ClusterId)) => [
        int(rayQueryEXT, bool),
    ] {
        requires: &[NvClusterAccelerationStructure],
        since: 460,
    }
    "rayQueryGetIntersectionSpherePositionNV": Ray(Intersection(RayIntersection::SpherePosition)) => [
        vec3(rayQueryEXT, bool),
    ] {
        requires: &[NvLinearSweptSpheres],
        since: 460,
    }
    "rayQueryGetIntersectionSphereRadiusNV": Ray(Intersection(RayIntersection::SphereRadius)) => [
        float(rayQueryEXT, bool),
    ] {
        requires: &[NvLinearSweptSpheres],
        since: 460,
    }
    "rayQueryGetIntersectionLSSHitValueNV": Ray(Intersection(RayIntersection::LssHitValue)) => [
        float(rayQueryEXT, bool),
    ] {
        requires: &[NvLinearSweptSpheres],
        since: 460,
    }
    "rayQueryGetIntersectionLSSPositionsNV": Ray(Intersection(RayIntersection::LssPositions)) => [
        void(rayQueryEXT, bool, out vec3[2]),
    ] {
        requires: &[NvLinearSweptSpheres],
        since: 460,
    }
    "rayQueryGetIntersectionLSSRadiiNV": Ray(Intersection(RayIntersection::LssRadii)) => [
        void(rayQueryEXT, bool, out float[2]),
    ] {
        requires: &[NvLinearSweptSpheres],
        since: 460,
    }
    "rayQueryIsSphereHitNV": Ray(Intersection(RayIntersection::IsSphereHit)) => [
        bool(rayQueryEXT, bool),
    ] {
        requires: &[NvLinearSweptSpheres],
        since: 460,
    }
    "rayQueryIsLSSHitNV": Ray(Intersection(RayIntersection::IsLssHit)) => [
        bool(rayQueryEXT, bool),
    ] {
        requires: &[NvLinearSweptSpheres],
        since: 460,
    }
    "traceNV": Ray(TraceRay { nv: true, motion: false }) => [
        void(accelerationStructureNV, uint, uint, uint, uint, uint, vec3, float, vec3, float, int),
    ] {
        requires: &[NvRayTracing],
        stages: TRACE_STAGES,
        since: 460,
    }
    "traceRayMotionNV": Ray(TraceRay { nv: false, motion: true }) => [
        void(accelerationStructureNV, uint, uint, uint, uint, uint, vec3, float, vec3, float, float, int),
    ] {
        requires: &[NvRayTracingMotionBlur],
        stages: TRACE_STAGES,
        since: 460,
    }
    "traceRayEXT": Ray(TraceRay { nv: false, motion: false }) => [
        void(accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, int),
    ] {
        requires: &[ExtRayTracing],
        stages: TRACE_STAGES,
        since: 460,
    }
    "executeCallableNV": Ray(ExecuteCallable { nv: true }) => [void(uint, int)] {
        requires: &[NvRayTracing],
        stages: TRACE_STAGES.union(CALLABLE),
        since: 460,
    }
    "executeCallableEXT": Ray(ExecuteCallable { nv: false }) => [void(uint, int)] {
        requires: &[ExtRayTracing],
        stages: TRACE_STAGES.union(CALLABLE),
        since: 460,
    }
    "reportIntersectionNV": Ray(ReportIntersection) => [bool(float, uint)] {
        requires: &[NvRayTracing],
        stages: INTERSECTION,
        since: 460,
    }
    "reportIntersectionEXT": Ray(ReportIntersection) => [bool(float, uint)] {
        requires: &[ExtRayTracing],
        stages: INTERSECTION,
        since: 460,
    }
    "ignoreIntersectionNV": Ray(IgnoreIntersection) => [void()] {
        requires: &[NvRayTracing],
        stages: ANY_HIT,
        since: 460,
    }
    "terminateRayNV": Ray(TerminateRay) => [void()] {
        requires: &[NvRayTracing],
        stages: ANY_HIT,
        since: 460,
    }
    "hitObjectTraceRayNV": Ray(HitObject(Nv, Object::TraceRay { motion: false })) => [
        void(hitObjectNV, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, int),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectTraceRayMotionNV": Ray(HitObject(Nv, Object::TraceRay { motion: true })) => [
        void(hitObjectNV, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, float, int),
    ] {
        requires: &[NvShaderInvocationReorder, NvRayTracingMotionBlur],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectRecordHitNV": Ray(HitObject(
        Nv,
        Object::RecordHit {
            with_index: false,
            motion: false,
        },
    )) => [
        void(hitObjectNV, accelerationStructureEXT, int, int, int, uint, uint, uint, vec3, float, vec3, float, int),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectRecordHitMotionNV": Ray(HitObject(
        Nv,
        Object::RecordHit {
            with_index: false,
            motion: true,
        },
    )) => [
        void(hitObjectNV, accelerationStructureEXT, int, int, int, uint, uint, uint, vec3, float, vec3, float, float, int),
    ] {
        requires: &[NvShaderInvocationReorder, NvRayTracingMotionBlur],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectRecordHitWithIndexNV": Ray(HitObject(
        Nv,
        Object::RecordHit {
            with_index: true,
            motion: false,
        },
    )) => [
        void(hitObjectNV, accelerationStructureEXT, int, int, int, uint, uint, vec3, float, vec3, float, int),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectRecordHitWithIndexMotionNV": Ray(HitObject(
        Nv,
        Object::RecordHit {
            with_index: true,
            motion: true,
        },
    )) => [
        void(hitObjectNV, accelerationStructureEXT, int, int, int, uint, uint, vec3, float, vec3, float, float, int),
    ] {
        requires: &[NvShaderInvocationReorder, NvRayTracingMotionBlur],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectRecordMissNV": Ray(HitObject(Nv, Object::RecordMiss)) => [
        void(hitObjectNV, uint, vec3, float, vec3, float),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectRecordMissMotionNV": Ray(HitObject(Nv, Object::RecordMiss)) => [
        void(hitObjectNV, uint, vec3, float, vec3, float, float),
    ] {
        requires: &[NvShaderInvocationReorder, NvRayTracingMotionBlur],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectRecordEmptyNV": Ray(HitObject(Nv, Object::RecordEmpty)) => [void(hitObjectNV)] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectExecuteShaderNV": Ray(HitObject(Nv, Object::ExecuteShader)) => [void(hitObjectNV, int)] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectIsEmptyNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::IsEmpty))) => [
        bool(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectIsMissNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::IsMiss))) => [bool(hitObjectNV)] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectIsHitNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::IsHit))) => [bool(hitObjectNV)] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetRayTMinNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::RayTMin))) => [
        float(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetRayTMaxNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::RayTMax))) => [
        float(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetWorldRayOriginNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::WorldRayOrigin))) => [
        vec3(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetWorldRayDirectionNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::WorldRayDirection))) => [
        vec3(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetObjectRayOriginNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::ObjectRayOrigin))) => [
        vec3(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetObjectRayDirectionNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::ObjectRayDirection))) => [
        vec3(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetWorldToObjectNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::WorldToObject))) => [
        mat4x3(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetObjectToWorldNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::ObjectToWorld))) => [
        mat4x3(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetInstanceCustomIndexNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::InstanceCustomIndex))) => [
        int(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetInstanceIdNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::InstanceId))) => [
        int(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetGeometryIndexNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::GeometryIndex))) => [
        int(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetPrimitiveIndexNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::PrimitiveIndex))) => [
        int(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetHitKindNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::HitKind))) => [
        uint(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetAttributesNV": Ray(HitObject(Nv, Object::GetAttributes)) => [void(hitObjectNV, int)] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetCurrentTimeNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::CurrentTime))) => [
        float(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder, NvRayTracingMotionBlur],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetShaderBindingTableRecordIndexNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::ShaderBindingTableRecordIndex))) => [
        uint(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetShaderRecordBufferHandleNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::ShaderRecordBufferHandle))) => [
        uvec2(hitObjectNV),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetClusterIdNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::ClusterId))) => [
        int(hitObjectNV),
    ] {
        requires: &[NvClusterAccelerationStructure],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetSpherePositionNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::SpherePosition))) => [
        vec3(hitObjectNV),
    ] {
        requires: &[NvLinearSweptSpheres],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetSphereRadiusNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::SphereRadius))) => [
        float(hitObjectNV),
    ] {
        requires: &[NvLinearSweptSpheres],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetLSSPositionsNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::LssPositions))) => [
        void(hitObjectNV, out vec3[2]),
    ] {
        requires: &[NvLinearSweptSpheres],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetLSSRadiiNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::LssRadii))) => [
        void(hitObjectNV, out float[2]),
    ] {
        requires: &[NvLinearSweptSpheres],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectIsSphereHitNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::IsSphereHit))) => [
        bool(hitObjectNV),
    ] {
        requires: &[NvLinearSweptSpheres],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectIsLSSHitNV": Ray(HitObject(Nv, Object::Value(HitObjectValue::IsLssHit))) => [
        bool(hitObjectNV),
    ] {
        requires: &[NvLinearSweptSpheres],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectTraceRayEXT": Ray(HitObject(Ext, Object::TraceRay { motion: false })) => [
        void(hitObjectEXT, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, int),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectTraceRayMotionEXT": Ray(HitObject(Ext, Object::TraceRay { motion: true })) => [
        void(hitObjectEXT, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, float, int),
    ] {
        requires: &[ExtShaderInvocationReorder, NvRayTracingMotionBlur],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectRecordMissEXT": Ray(HitObject(Ext, Object::RecordMiss)) => [
        void(hitObjectEXT, uint, uint, vec3, float, vec3, float),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectRecordMissMotionEXT": Ray(HitObject(Ext, Object::RecordMiss)) => [
        void(hitObjectEXT, uint, uint, vec3, float, vec3, float, float),
    ] {
        requires: &[ExtShaderInvocationReorder, NvRayTracingMotionBlur],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectRecordEmptyEXT": Ray(HitObject(Ext, Object::RecordEmpty)) => [void(hitObjectEXT)] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectExecuteShaderEXT": Ray(HitObject(Ext, Object::ExecuteShader)) => [void(hitObjectEXT, int)] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectIsEmptyEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::IsEmpty))) => [
        bool(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectIsMissEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::IsMiss))) => [
        bool(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectIsHitEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::IsHit))) => [
        bool(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetRayTMinEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::RayTMin))) => [
        float(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetRayTMaxEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::RayTMax))) => [
        float(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetRayFlagsEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::RayFlags))) => [
        uint(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetWorldRayOriginEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::WorldRayOrigin))) => [
        vec3(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetWorldRayDirectionEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::WorldRayDirection))) => [
        vec3(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetObjectRayOriginEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::ObjectRayOrigin))) => [
        vec3(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetObjectRayDirectionEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::ObjectRayDirection))) => [
        vec3(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetWorldToObjectEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::WorldToObject))) => [
        mat4x3(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetObjectToWorldEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::ObjectToWorld))) => [
        mat4x3(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetInstanceCustomIndexEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::InstanceCustomIndex))) => [
        int(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetInstanceIdEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::InstanceId))) => [
        int(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetGeometryIndexEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::GeometryIndex))) => [
        int(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetPrimitiveIndexEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::PrimitiveIndex))) => [
        int(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetHitKindEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::HitKind))) => [
        uint(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetAttributesEXT": Ray(HitObject(Ext, Object::GetAttributes)) => [void(hitObjectEXT, int)] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetCurrentTimeEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::CurrentTime))) => [
        float(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder, NvRayTracingMotionBlur],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetShaderBindingTableRecordIndexEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::ShaderBindingTableRecordIndex))) => [
        uint(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetShaderRecordBufferHandleEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::ShaderRecordBufferHandle))) => [
        uvec2(hitObjectEXT),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectSetShaderBindingTableRecordIndexEXT": Ray(HitObject(Ext, Object::SetShaderBindingTableRecordIndex)) => [
        void(hitObjectEXT, uint),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectRecordFromQueryEXT": Ray(HitObject(Ext, Object::RecordFromQuery)) => [
        void(hitObjectEXT, rayQueryEXT, uint, int),
        void(hitObjectEXT, rayQueryEXT, uint, int, uint),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: TRACE_STAGES,
        since: 460,
    }
    "hitObjectGetIntersectionTriangleVertexPositionsEXT": Ray(HitObject(Ext, Object::Value(HitObjectValue::TriangleVertexPositions))) => [
        void(hitObjectEXT, out vec3[3]),
    ] {
        requires: &[ExtShaderInvocationReorder, ExtRayTracingPositionFetch],
        stages: TRACE_STAGES,
        since: 460,
    }
    "reorderThreadNV": Ray(HitObject(Nv, Object::ReorderThread)) => [
        void(uint, uint),
        void(hitObjectNV),
        void(hitObjectNV, uint, uint),
    ] {
        requires: &[NvShaderInvocationReorder],
        stages: RAY_GENERATION,
        since: 460,
    }
    "reorderThreadEXT": Ray(HitObject(Ext, Object::ReorderThread)) => [
        void(uint, uint),
        void(hitObjectEXT),
        void(hitObjectEXT, uint, uint),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: RAY_GENERATION,
        since: 460,
    }
    "hitObjectReorderExecuteEXT": Ray(HitObject(Ext, Object::ReorderExecute)) => [
        void(hitObjectEXT, int),
        void(hitObjectEXT, uint, uint, int),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: RAY_GENERATION,
        since: 460,
    }
    "hitObjectTraceReorderExecuteEXT": Ray(HitObject(Ext, Object::TraceReorderExecute { motion: false })) => [
        void(hitObjectEXT, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, int),
        void(hitObjectEXT, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, uint, uint, int),
    ] {
        requires: &[ExtShaderInvocationReorder],
        stages: RAY_GENERATION,
        since: 460,
    }
    "hitObjectTraceMotionReorderExecuteEXT": Ray(HitObject(Ext, Object::TraceReorderExecute { motion: true })) => [
        void(hitObjectEXT, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, float, int),
        void(hitObjectEXT, accelerationStructureEXT, uint, uint, uint, uint, uint, vec3, float, vec3, float, float, uint, uint, int),
    ] {
        requires: &[ExtShaderInvocationReorder, NvRayTracingMotionBlur],
        stages: RAY_GENERATION,
        since: 460,
    }
    "fetchMicroTriangleVertexPositionNV": Ray(MicroTriangle(MicroTriangleValue::Position)) => [
        vec3(accelerationStructureEXT, int, int, int, ivec2),
    ] {
        requires: &[NvDisplacementMicromap],
        stages: RAY_GENERATION.union(COMPUTE).union(MESH),
        since: 460,
    }
    "fetchMicroTriangleVertexBarycentricNV": Ray(MicroTriangle(MicroTriangleValue::Barycentric)) => [
        vec2(accelerationStructureEXT, int, int, int, ivec2),
    ] {
        requires: &[NvDisplacementMicromap],
        stages: RAY_GENERATION.union(COMPUTE).union(MESH),
        since: 460,
    }

};
