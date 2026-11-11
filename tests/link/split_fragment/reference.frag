#version 450
layout(location = 0) in vec2 uv;
layout(location = 0) out vec4 color;

layout(set = 0, binding = 0) uniform Params {
    vec4 tint;
    float scale;
} params;

float wave(float x)
{
    return fract(x * 3.0) - 0.5;
}

vec4 shade(vec2 p)
{
    return params.tint * wave(p.x * params.scale) + vec4(p, 0.0, 1.0);
}

void main()
{
    color = shade(uv);
}
