#version 450
layout(location = 0) out vec4 color;
layout(location = 0) in float value;

float slope(float x);

void main()
{
    color = vec4(slope(value));
}
