#version 450
layout(pixel_center_integer) in vec4 gl_FragCoord;

vec4 position()
{
    return gl_FragCoord;
}
