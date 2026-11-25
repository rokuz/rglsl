#version 460
#extension GL_NV_ray_tracing : require
layout(set = 0, binding = 0) uniform accelerationStructureNV scene;
void trace(vec3 origin, const int payload) {
    traceNV(scene, gl_RayFlagsOpaqueNV, 0xff, 0, 0, 0, origin, 0.0, vec3(0.0, 0.0, 1.0), 100.0, payload);
}
void call(const int data) {
    executeCallableNV(0u, data);
}
