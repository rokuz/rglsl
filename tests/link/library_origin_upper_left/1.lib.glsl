#version 450
layout(origin_upper_left) in vec4 gl_FragCoord;

vec4 position()
{
    return gl_FragCoord;
}
