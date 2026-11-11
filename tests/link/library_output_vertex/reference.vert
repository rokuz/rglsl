#version 450
layout(location = 0) in vec4 position;
layout(location = 0) out vec4 shaded;

void shade(vec4 p)
{
    shaded = p * 0.5;
}

void main()
{
    shade(position);
    gl_Position = position;
}
