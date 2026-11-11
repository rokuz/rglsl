#version 450
layout(location = 0) out vec4 color;

int g(float x);

void main()
{
    color = vec4(float(g(1.0)));
}
