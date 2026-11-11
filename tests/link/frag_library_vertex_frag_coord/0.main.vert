#version 450
layout(location = 0) in vec4 position;
float depth();
void main()
{
    gl_Position = position * depth();
}
