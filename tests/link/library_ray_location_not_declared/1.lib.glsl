#version 460
#extension GL_EXT_ray_tracing : require
layout(set = 0, binding = 0) uniform accelerationStructureEXT scene;
void trace(vec3 origin, vec3 direction, const int payload) {
    traceRayEXT(scene, gl_RayFlagsOpaqueEXT, 0xff, 0, 0, 0, origin, 0.0, direction, 100.0, payload);
}
void shadow(vec3 origin, const int payload) {
    trace(origin, vec3(0.0, 0.0, 1.0), payload);
}
void call(uint record, const int data) {
    executeCallableEXT(record, data);
}
