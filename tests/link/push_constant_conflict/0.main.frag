#version 450
layout(location = 0) out vec4 color;

layout(push_constant) uniform A {
    vec4 tint;
} a;

vec4 other();

void main()
{
    color = a.tint + other();
}
