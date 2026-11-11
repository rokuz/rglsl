#version 450
layout(location = 0) in vec2 uv;
layout(location = 0) out vec4 sampled;

vec4 fetch(vec2 uv);

void main()
{
    sampled = fetch(uv);
    gl_Position = vec4(uv, 0.0, 1.0);
}
