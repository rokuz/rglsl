#version 450
layout(xfb_buffer = 0, xfb_offset = 16) out vec4 second;

void capture(vec4 p)
{
    second = p * 2.0;
}
