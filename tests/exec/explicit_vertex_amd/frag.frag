#version 450
#extension GL_AMD_shader_explicit_vertex_parameter : require

layout(location = 0) __explicitInterpAMD in float id;
layout(location = 0) out vec4 color;

void main()
{
    float a = interpolateAtVertexAMD(id, 0u);
    float b = interpolateAtVertexAMD(id, 1u);
    float c = interpolateAtVertexAMD(id, 2u);
    bool sum = abs(a + b + c - 6.0) < 1.0e-4;
    bool product = abs(a * b * c - 6.0) < 1.0e-4;
    bool distinct = a != b && b != c && a != c;
    color = vec4(sum ? 1.0 : 0.0, product ? 1.0 : 0.0, distinct ? 1.0 : 0.0, 1.0);
}
