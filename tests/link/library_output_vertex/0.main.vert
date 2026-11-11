#version 450
layout(location = 0) in vec4 position;
void shade(vec4 p);
void main()
{
    shade(position);
    gl_Position = position;
}
