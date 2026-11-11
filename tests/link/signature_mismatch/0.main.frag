#version 450
layout(location = 0) out vec4 color;

void f(out float x);

void main()
{
    float value;
    f(value);
    color = vec4(value);
}
