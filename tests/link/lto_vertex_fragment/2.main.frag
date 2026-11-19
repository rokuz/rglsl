#version 450
layout(location = 0) in vec4 color;
layout(location = 1) in vec4 unread;
layout(location = 2) flat in ivec2 selector;
layout(location = 3, component = 0) in float red;
layout(location = 4) in mat2 pair;
layout(location = 0) out vec4 result;

void main()
{
    result = vec4(0.0, color.g, float(selector.x - 1), 1.0);
    if (selector.y == 2) {
        result.r = red * 4.0;
    }
    result.b += pair[1].y * 2.0 - 1.0;
}
