#version 450
layout(set = 0, binding = 0) uniform Params {
    vec4 tint;
} params;

vec4 tinted(vec4 v)
{
    return v * params.tint;
}
