#version 450
layout(location = 0) in vec2 uv;
layout(location = 0) out vec4 color;
layout(set = 0, binding = 0) uniform sampler2D tex;

vec4 fetch(vec2 uv)
{
    return texture(tex, uv);
}

void main()
{
    color = fetch(uv);
}
