#version 450
layout(location = 0) out vec4 color;

float helper(float x);
float other(int x);

void main()
{
    color = vec4(helper(1.0), other(2), 0.0, 1.0);
}
