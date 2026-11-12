#version 450
layout(location = 0) in vec4 position;
void capture(vec4 p);
void main()
{
    capture(position);
    gl_Position = position;
}
