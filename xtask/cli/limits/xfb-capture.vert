#version 450
layout(location = 0, xfb_buffer = 0, xfb_offset = 380) out vec4 captured;
void capture()
{
    captured = vec4(1.0);
}
