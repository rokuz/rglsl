#version 450
layout(xfb_buffer = 0, xfb_stride = 32) out;
vec4 transform(vec4 p)
{
    return p * 2.0;
}
