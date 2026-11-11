#version 450
layout(location = 0) out vec4 color;

float f(float x);
int f(int x);

void main()
{
    color = vec4(f(1.0), float(f(2)), 0.0, 1.0);
}
