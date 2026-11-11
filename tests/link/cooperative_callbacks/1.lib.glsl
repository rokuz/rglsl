#version 450 core
#extension GL_EXT_shader_explicit_arithmetic_types : enable

float16_t combineSum(const in float16_t a, const in float16_t b)
{
    return a + b;
}

float16_t relu(const in uint32_t row, const in uint32_t col, const in float16_t x)
{
    return max(x, float16_t(0));
}
