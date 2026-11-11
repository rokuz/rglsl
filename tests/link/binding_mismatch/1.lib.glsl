#version 450
layout(set = 0, binding = 1) uniform Params {
    vec4 tint;
} params;

vec4 other()
{
    return params.tint;
}
