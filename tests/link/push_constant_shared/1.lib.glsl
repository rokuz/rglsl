#version 450
layout(push_constant) uniform Constants {
    vec4 tint;
    float scale;
} values;

float scaled(float x)
{
    return x * values.scale;
}
