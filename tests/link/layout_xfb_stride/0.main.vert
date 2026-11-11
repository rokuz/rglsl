#version 450
layout(xfb_buffer = 0, xfb_offset = 0, location = 0) out vec4 captured;
vec4 transform(vec4 p);
void main()
{
    captured = transform(vec4(1.0));
    gl_Position = captured;
}
