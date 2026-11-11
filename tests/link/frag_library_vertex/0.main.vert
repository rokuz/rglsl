#version 450
layout(location = 0) in vec4 position;
float f(float x);
void main()
{
    gl_Position = position * f(1.0);
}
