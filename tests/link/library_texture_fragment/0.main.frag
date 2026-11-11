#version 450
layout(location = 0) in vec2 uv;
layout(location = 0) out vec4 color;

vec4 fetch(vec2 uv);

void main()
{
    color = fetch(uv);
}
