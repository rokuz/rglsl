#version 450 core

#extension GL_AMD_gpu_shader_half_float: enable
#extension GL_AMD_gpu_shader_int16: enable

layout(location = 0) in f16vec4 if16v4;
layout(location = 1) in i16vec4 ii16v4;
layout(location = 2) in u16vec4 iu16v4;

layout(location = 0, xfb_buffer = 0, xfb_stride = 12, xfb_offset = 0) out vec3 of16v3;
layout(location = 1, xfb_buffer = 1, xfb_stride = 12, xfb_offset = 0) out F16Out
{
    float of16;
    vec2  of16v2;
};

layout(location = 5, xfb_buffer = 2, xfb_stride = 12, xfb_offset = 0) out ivec3 oi16v3;
layout(location = 6, xfb_buffer = 3, xfb_stride = 12, xfb_offset = 0) out I16Out
{
    uint  ou16;
    uvec2 ou16v2;
};

void main()
{
    of16v3 = vec3(if16v4.xyz);
    of16   = float(if16v4.x);
    of16v2 = vec2(if16v4.xy);

    oi16v3 = ivec3(ii16v4.xyz);
    ou16   = uint(iu16v4.x);
    ou16v2 = uvec2(iu16v4.xy);

    gl_Position = vec4(vec2(if16v4.xy), 0.0, 1.0);
}
