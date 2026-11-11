#version 450
layout(location = 0) in vec2 uv;
layout(location = 0) out vec4 sampled;
layout(set = 0, binding = 0) uniform sampler2D tex;

vec4 fetch(vec2 uv)
{
    return texture(tex, uv);
}

void main()
{
    sampled = fetch(uv);
    gl_Position = vec4(uv, 0.0, 1.0);
}
