#version 450
layout(location = 0) in vec2 position;
layout(location = 0) out vec4 color;
layout(location = 1) out vec4 unread;
layout(location = 2) flat out ivec2 selector;
layout(location = 3, component = 0) out float red;
layout(location = 3, component = 1) out float green_unread;
layout(location = 4) out mat2 pair;
layout(location = 6) out vec4 after_pair;

vec4 shade(vec2 p)
{
    return vec4(0.0, 1.0, 0.0, 1.0) + vec4(p.x * p.x, 0.0, 0.0, 0.0);
}

void main()
{
    gl_Position = vec4(position, 0.0, 1.0);
    gl_PointSize = 4.0;
    color = shade(position);
    unread = vec4(position, 1.0, 0.0) * 3.0;
    selector = ivec2(1, 2);
    red = 0.25;
    green_unread = 0.75;
    pair = mat2(0.5, 0.0, 0.0, 0.5);
    after_pair = vec4(0.125);
}
