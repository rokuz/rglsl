#version 450

vec4 shade(vec2 p)
{
    return vec4(0.0, 1.0, 0.0, 1.0) + vec4(p, 0.0, 0.0) * 0.0;
}
