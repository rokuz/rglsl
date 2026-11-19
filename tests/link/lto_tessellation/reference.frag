#version 450
layout(location = 0) in vec4 color;
layout(location = 0) out vec4 result;

void main()
{
    result = vec4(color.r, color.g, 0.0, color.a);
}
