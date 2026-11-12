#version 450
layout(location = 0) out vec4 color;

vec4 position()
{
    return gl_FragCoord;
}

void main()
{
    color = position() / 64.0;
}
