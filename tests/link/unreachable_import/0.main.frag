#version 450
layout(location = 0) out vec4 color;

float used(float x);

void main()
{
    color = vec4(used(1.0));
}
