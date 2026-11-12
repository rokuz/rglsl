#version 450
layout(location = 0) out vec4 color;

vec4 coverage();

void main()
{
    color = coverage();
}
