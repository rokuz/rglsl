#version 450
#extension GL_EXT_shader_explicit_arithmetic_types_float16 : require

layout(location = 0, xfb_buffer = 0, xfb_offset = 0) out float arr[1];
layout(location = 1, xfb_buffer = 0, xfb_offset = 4) out float h;

void main()
{
    arr[0] = 1.0;
    h = float(float16_t(2.0));
}
