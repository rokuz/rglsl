#version 450
#extension GL_EXT_shader_explicit_arithmetic_types_float16 : require
layout(location = 0, xfb_buffer = 0, xfb_offset = 0) out float16_t captured;

void capture(vec4 p)
{
    captured = float16_t(p.x);
}
