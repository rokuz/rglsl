#version 450

#extension GL_EXT_nonuniform_qualifier : enable

layout(location=0) nonuniformEXT in vec4 nu_inv4;
nonuniformEXT float nu_gf;
layout(location=1) in nonuniformEXT flat int nu_ii;
layout(location = 2) in vec2 inTexcoord;

layout(binding=0, input_attachment_index = 0) uniform subpassInput        inputAttachmentDyn[];
layout(binding=1)                             uniform samplerBuffer       uniformTexelBufferDyn[];
layout(binding=2, r32f)                       uniform imageBuffer         storageTexelBufferDyn[];
layout(binding=3)                             uniform uname { float a; }  uniformBuffer[];
layout(binding=4)                             buffer  bname { float b; }  storageBuffer[];
layout(binding=5)                             uniform sampler2D           sampledImage[];
layout(binding=6, r32f)                       uniform image2D             storageImage[];
layout(binding=7, input_attachment_index = 1) uniform subpassInput        inputAttachment[];
layout(binding=8)                             uniform samplerBuffer       uniformTexelBuffer[];
layout(binding=9, r32f)                       uniform imageBuffer         storageTexelBuffer[];
layout(binding = 10)                          uniform texture2D           uniformTexArr[8];
layout(binding = 11)                          uniform sampler             uniformSampler;

nonuniformEXT int foo(nonuniformEXT int nupi, nonuniformEXT out int f)
{
    return nupi;
}

void main()
{
    nu_gf = 0.5;
    nonuniformEXT int nu_li = 3;
    nonuniformEXT int nu_li2;
    int dyn_i = 1;
    nonuniformEXT int nu_ij = nu_ii & 7;

    int a = foo(nu_li, nu_li);
    nu_li = nonuniformEXT(a) + nonuniformEXT(a * 2);
    nu_li2 = a + nonuniformEXT(a * 2);

    float b;
    b = nu_inv4.x * nu_gf;
    b += subpassLoad(inputAttachmentDyn[dyn_i]).x;
    b += texelFetch(uniformTexelBufferDyn[dyn_i], 1).x;
    b += imageLoad(storageTexelBufferDyn[dyn_i], 1).x;
    b += uniformBuffer[nu_ij].a;
    b += storageBuffer[nu_ij].b;
    b += texture(sampledImage[nu_ij], vec2(0.5)).x;
    b += imageLoad(storageImage[nu_ij], ivec2(1)).x;
    b += subpassLoad(inputAttachment[nu_ij]).x;
    b += texelFetch(uniformTexelBuffer[nu_ij], 1).x;
    b += imageLoad(storageTexelBuffer[nu_ij], 1).x;
    b += texture(sampler2D(uniformTexArr[nu_ij], uniformSampler), inTexcoord.xy).x;
    b += texture(nonuniformEXT(sampler2D(uniformTexArr[nu_ij], uniformSampler)), inTexcoord.xy).x;

    nonuniformEXT ivec4 v = ivec4(0, 1, 2, 3);
    nonuniformEXT mat4 m = mat4(1.0);
    nonuniformEXT struct S { int a; } s = S(4);
    nonuniformEXT int arr[10] = int[10](0, 1, 2, 3, 4, 5, 6, 7, 0, 1);
    ivec4 uv = ivec4(5, 6, 7, 0);
    mat4 um = mat4(2.0);
    struct US { int a[10]; } us = US(int[10](1, 2, 3, 4, 5, 6, 7, 0, 1, 2));
    int uarr[10] = int[10](7, 6, 5, 4, 3, 2, 1, 0, 7, 6);
    b += uniformBuffer[v.y].a;
    b += uniformBuffer[v[2]].a;
    b += uniformBuffer[uv[nu_ij & 3]].a;
    b += uniformBuffer[int(m[2].z)].a;
    b += uniformBuffer[s.a].a;
    b += uniformBuffer[arr[2]].a;
    b += uniformBuffer[int(um[nu_ij & 3].z)].a;
    b += uniformBuffer[us.a[nu_ij]].a;
    b += uniformBuffer[uarr[nu_ij]].a;

    if (ivec2(gl_FragCoord.xy) == ivec2(3, 5)) {
        storageBuffer[nu_ij].b = b;
    }
}
