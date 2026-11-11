#version 450
layout(set = 0, binding = 0) uniform Params {
    vec4 tint;
    float scale;
} params;

float wave(float x);

vec4 shade(vec2 p)
{
    return params.tint * wave(p.x * params.scale) + vec4(p, 0.0, 1.0);
}
