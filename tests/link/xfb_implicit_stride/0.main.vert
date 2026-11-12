#version 450
layout(location = 0) in vec4 position;
layout(xfb_buffer = 0, xfb_offset = 0) out vec4 first;

void capture(vec4 p);

void main()
{
    gl_Position = position;
    first = position;
    capture(position);
}
