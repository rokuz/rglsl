#version 450
layout(location = 0) out vec4 color;

layout(push_constant) uniform Constants {
    vec4 tint;
    float scale;
} constants;

float scaled(float x);

void main()
{
    color = constants.tint * scaled(2.0);
}
