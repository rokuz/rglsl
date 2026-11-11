#version 450
layout(set = 0, binding = 0) uniform Params {
    vec4 tint;
    float scale;
} p;

float accumulated;

void accumulate(float x)
{
    accumulated += x * p.scale;
}
