#version 450
layout(location = 0) out vec4 color;
vec4 incoming();
void main()
{
    color = incoming();
}
