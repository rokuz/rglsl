#version 450
layout(location = 0) out vec4 color;
float f(float x);
void main()
{
    color = vec4(f(1.0));
}
