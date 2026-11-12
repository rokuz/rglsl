#version 450 core

#extension GL_ARB_gpu_shader_int64: enable
#extension GL_EXT_shader_image_int64: enable
#extension GL_KHR_memory_scope_semantics: enable
#extension GL_ARB_sparse_texture2: enable

layout(binding = 0, r64i)  uniform i64image1D i1D;
layout(binding = 1, r64ui) uniform u64image2D u2D;
layout(binding = 2, r64i)  uniform i64image3D i3D;
layout(binding = 3, r64ui) uniform u64imageCube uCube;
layout(binding = 4, r64i)  uniform i64imageBuffer iBuf;
layout(binding = 5, r64ui) uniform u64image1DArray u1DArray;
layout(binding = 6, r64i)  uniform i64image2DArray i2DArray;
layout(binding = 7, r64ui) uniform u64imageCubeArray uCubeArray;
layout(binding = 9, r64ui) uniform u64image2DMS u2DMS;
layout(binding = 10, r64i) uniform i64image2DMSArray i2DMSArray;

layout(binding = 11) buffer Buf
{
    int64_t i64;
    uint64_t u64;
    i64vec4 i64v4;
    u64vec4 u64v4;
    ivec4 i32v4;
};

void main()
{
    ivec4 c = i32v4 & ivec4(3, 1, 1, 3);
    if (ivec2(gl_FragCoord.xy) == ivec2(3, 5)) {
    i64 = imageAtomicAdd(i1D, c.x, i64);
    i64 = imageAtomicMin(i3D, c.xyz, i64);
    i64 = imageAtomicMax(iBuf, c.x, i64);
    i64 = imageAtomicAnd(i2DArray, c.xyz, i64);
    i64 = imageAtomicXor(i2DMSArray, c.xyz, c.w, i64);
    i64 = imageAtomicExchange(i1D, c.x, i64);
    i64 = imageAtomicCompSwap(i3D, c.xyz, i64, i64 + 1);

    i64 = imageAtomicAdd(i1D, c.x, i64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquireRelease);
    i64 = imageAtomicMin(i3D, c.xyz, i64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquireRelease);
    i64 = imageAtomicMax(iBuf, c.x, i64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquireRelease);
    i64 = imageAtomicAnd(i2DArray, c.xyz, i64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquireRelease);
    i64 = imageAtomicXor(i2DMSArray, c.xyz, c.w, i64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquireRelease);
    i64 = imageAtomicExchange(i1D, c.x, i64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquireRelease);
    i64 = imageAtomicCompSwap(i3D, c.xyz, i64, i64 + 1, gl_ScopeDevice,
            gl_StorageSemanticsImage, gl_SemanticsAcquireRelease, gl_StorageSemanticsImage, gl_SemanticsAcquire);
    i64 = imageAtomicLoad(iBuf, c.x, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquire);
    imageAtomicStore(i2DArray, c.xyz, i64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsRelease);

    u64 = imageAtomicAdd(u2D, c.xy, u64);
    u64 = imageAtomicMin(uCube, c.xyz, u64);
    u64 = imageAtomicMax(u1DArray, c.xy, u64);
    u64 = imageAtomicAnd(uCubeArray, c.xyz, u64);
    u64 = imageAtomicOr(u2DMS, c.xy, c.z, u64);
    u64 = imageAtomicXor(u2D, c.xy, u64);
    u64 = imageAtomicExchange(uCube, c.xyz, u64);
    u64 = imageAtomicCompSwap(u1DArray, c.xy, u64, u64 + 1);

    u64 = imageAtomicAdd(u2D, c.xy, u64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquireRelease);
    u64 = imageAtomicMin(uCube, c.xyz, u64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquireRelease);
    u64 = imageAtomicMax(u1DArray, c.xy, u64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquireRelease);
    u64 = imageAtomicAnd(uCubeArray, c.xyz, u64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquireRelease);
    u64 = imageAtomicOr(u2DMS, c.xy, c.z, u64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquireRelease);
    u64 = imageAtomicXor(u2D, c.xy, u64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquireRelease);
    u64 = imageAtomicExchange(uCube, c.xyz, u64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquireRelease);
    u64 = imageAtomicCompSwap(u1DArray, c.xy, u64, u64 + 1, gl_ScopeDevice,
            gl_StorageSemanticsImage, gl_SemanticsAcquireRelease, gl_StorageSemanticsImage, gl_SemanticsAcquire);
    u64 = imageAtomicLoad(uCubeArray, c.xyz, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquire);
    imageAtomicStore(u2DMS, c.xy, c.z, u64, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsRelease);

    i64v4 += imageLoad(i1D, c.x);
    i64v4 += imageLoad(i3D, c.xyz);
    i64v4 += imageLoad(iBuf, c.x);
    i64v4 += imageLoad(i2DArray, c.xyz);
    i64v4 += imageLoad(i2DMSArray, c.xyz, c.w);

    imageStore(u2D, c.xy, u64v4);
    imageStore(uCube, c.xyz, u64v4);
    imageStore(u1DArray, c.xy, u64v4);
    imageStore(uCubeArray, c.xyz, u64v4);
    imageStore(u2DMS, c.xy, c.z, u64v4);

    sparseImageLoadARB(i3D, c.xyz, i64v4);
    sparseImageLoadARB(i2DArray, c.xyz, i64v4);
    sparseImageLoadARB(u2D, c.xy, u64v4);
    sparseImageLoadARB(uCube, c.xyz, u64v4);
    sparseImageLoadARB(uCubeArray, c.xyz, u64v4);
    }
}
