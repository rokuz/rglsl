#version 450
layout(xfb_buffer = 1, xfb_stride = 400) out;
layout(location = 0, xfb_buffer = 1, xfb_offset = 0) out vec4 captured;
void main()
{
    captured = vec4(1.0);
    gl_Position = vec4(0.0);
}
