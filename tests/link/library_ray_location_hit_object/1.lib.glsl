#version 460
#extension GL_EXT_ray_tracing : require
#extension GL_EXT_shader_invocation_reorder : require
layout(set = 0, binding = 0) uniform accelerationStructureEXT scene;
void traced(hitObjectEXT hit, vec3 origin, const int payload) {
    hitObjectTraceRayEXT(hit, scene, gl_RayFlagsOpaqueEXT, 0xff, 0, 0, 0, origin, 0.0, vec3(0.0, 0.0, 1.0), 100.0, payload);
}
void executed(hitObjectEXT hit, const int payload) {
    hitObjectExecuteShaderEXT(hit, payload);
}
void attributes(hitObjectEXT hit, const int location) {
    hitObjectGetAttributesEXT(hit, location);
}
