#version 450
layout(location = 0) out vec4 color;
layout(location = 0) in vec4 value;

vec4 incoming()
{
    return value;
}

void main()
{
    color = incoming();
}
