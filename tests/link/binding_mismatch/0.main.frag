#version 450
layout(location = 0) out vec4 color;

layout(set = 0, binding = 0) uniform Params {
    vec4 tint;
} params;

vec4 other();

void main()
{
    color = params.tint + other();
}
