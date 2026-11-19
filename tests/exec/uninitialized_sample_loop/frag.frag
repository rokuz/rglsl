#version 450

layout(set = 0, binding = 0) uniform sampler2D tex;
layout(location = 0) out vec4 color;

void main()
{
    vec3 col;
    vec2 coord = vec2(1.0, 1.0);
    float h = 1.0;
    vec2 step = col.xy;
    while (h < 1.0) {
        coord -= step;
        h = texture(tex, coord).y;
    }
    color = vec4(h, 0.0, 0.0, 1.0);
}
