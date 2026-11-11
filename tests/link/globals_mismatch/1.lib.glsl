#version 450
layout(set = 0, binding = 0) uniform Params {
    vec3 tint;
} params;

vec4 other()
{
    return vec4(params.tint, 1.0);
}
