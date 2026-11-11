#version 450
layout(location = 0) out vec4 color;

float half_of(float x);

void main()
{
    color = vec4(half_of(3.0));
}
