#version 450
layout(location = 0) out vec4 color;

layout(set = 0, binding = 0) uniform Params {
    vec4 tint;
    float scale;
} params;

float accumulated;

void accumulate(float x);

void main()
{
    accumulated = params.scale;
    accumulate(2.0);
    color = params.tint * accumulated;
}
