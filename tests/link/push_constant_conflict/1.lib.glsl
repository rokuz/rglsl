#version 450
layout(push_constant) uniform B {
    vec4 tint;
} b;

vec4 other()
{
    return b.tint;
}
