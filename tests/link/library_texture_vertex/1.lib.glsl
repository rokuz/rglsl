#version 450
layout(set = 0, binding = 0) uniform sampler2D tex;

vec4 fetch(vec2 uv)
{
    return texture(tex, uv);
}
