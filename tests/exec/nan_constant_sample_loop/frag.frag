#version 450

layout(set = 0, binding = 0) uniform sampler2D tex;
layout(location = 0) out vec4 color;
layout(location = 1) out vec4 done;

void main()
{
    color = vec4(0.0);
    for (int i = 0; i < 4; i++) {
        vec2 coord = vec2(1.0) + pow(-3.8, 4.4);
        color += texture(tex, coord + vec2(float(i), 1.0));
    }
    done = vec4(1.0, 0.0, 0.0, 1.0);
}
