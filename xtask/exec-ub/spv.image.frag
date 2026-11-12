#version 450

layout(rgba32f, binding = 0)    uniform image1D         i1D;
layout(rgba32f, binding = 1)    uniform image2D         i2D;
layout(rgba32f, binding = 2)    uniform image3D         i3D;
layout(rgba32f, binding = 3)    uniform imageCube       iCube;
layout(rgba32f, binding = 4)    uniform imageCubeArray  iCubeArray;
layout(rgba32f, binding = 6)    uniform image1DArray    i1DArray;
layout(rg16, binding = 7)       uniform image2DArray    i2DArray;
layout(rgba32f, binding = 8)    uniform imageBuffer     iBuffer;
layout(rgba32f, binding = 9)    uniform image2DMS       i2DMS;
layout(rgba32f, binding = 10)   uniform image2DMSArray  i2DMSArray;

layout(r32i,    binding = 11)   uniform iimage1D        ii1D;
layout(r32ui,   binding = 12)   uniform uimage2D        ui2D;
layout(r32i,    binding = 13)   uniform iimage2DMS      ii2DMS;
layout(r32ui,   binding = 14)   uniform uimage2DMSArray ui2DMSArray;

flat in int     ic1D;
flat in ivec2   ic2D;
flat in ivec3   ic3D;
flat in ivec4   ic4D;

writeonly layout(binding = 1)   uniform image2D         wo2D;

flat in uint value;

out vec4 fragData;

void main()
{
    ivec3 iv = ivec3(0);
    iv.x    += imageSize(i1D);
    iv.xy   += imageSize(i2D);
    iv.xyz  += imageSize(i3D);
    iv.xy   += imageSize(iCube);
    iv.xyz  += imageSize(iCubeArray);
    iv.xy   += imageSize(i1DArray);
    iv.xyz  += imageSize(i2DArray);
    iv.x    += imageSize(iBuffer);
    iv.xy   += imageSize(i2DMS);
    iv.xyz  += imageSize(i2DMSArray);

    iv.x    += imageSamples(i2DMS);
    iv.x    += imageSamples(i2DMSArray);

    vec4 v = vec4(0.0);
    uint ui = 0;
    ivec3 c3 = ic3D & ivec3(3, 3, 1);
    ivec2 c2 = ic2D & ivec2(3, 1);
    int c1 = ic1D & 3;
    if (ivec2(gl_FragCoord.xy) == ivec2(3, 5)) {
    v += imageLoad(i1D, c1);
    imageStore(i1D, c1, v);
    v += imageLoad(i2D, c2);
    imageStore(i2D, c2, v);
    v += imageLoad(i3D, c3);
    imageStore(i3D, c3, v);
    v += imageLoad(iCube, c3);
    imageStore(iCube, c3, v);
    v += imageLoad(iCubeArray, c3);
    imageStore(iCubeArray, c3, v);
    v += imageLoad(i1DArray, c2);
    imageStore(i1DArray, c2, v);
    v += imageLoad(i2DArray, c3);
    imageStore(i2DArray, c3, v);
    v += imageLoad(iBuffer, c1);
    imageStore(iBuffer, c1, v);
    v += imageLoad(i2DMS, c2, 1);
    imageStore(i2DMS, c2, 2, v);
    v += imageLoad(i2DMSArray, c3, 3);
    imageStore(i2DMSArray, c3, 3, v);

    iv.x    += imageAtomicAdd(ii1D, c1, 10);
    ui      += imageAtomicAdd(ui2D, c2, value);
    iv.x    += imageAtomicMin(ii1D, c1, 11);
    ui      += imageAtomicMin(ui2D, c2, value);
    iv.x    += imageAtomicMax(ii1D, c1, 12);
    ui      += imageAtomicMax(ui2D, c2, value);
    iv.x    += imageAtomicAnd(ii1D, c1, 13);
    ui      += imageAtomicAnd(ui2D, c2, value);
    iv.x    += imageAtomicOr(ii1D, c1, 14);
    ui      += imageAtomicOr(ui2D, c2, value);
    iv.x    += imageAtomicXor(ii1D, c1, 15);
    ui      += imageAtomicXor(ui2D, c2, value);
    iv.x    += imageAtomicExchange(ii1D, c1, 16);
    ui      += imageAtomicExchange(ui2D, c2, value);
    iv.x    += imageAtomicCompSwap(ii1D, c1, 18, 17);
    ui      += imageAtomicCompSwap(ui2D, c2, 19u, value);
    iv.x    += imageAtomicCompSwap(ii2DMS, c2, 2, 18, 17);
    ui      += imageAtomicCompSwap(ui2DMSArray, c3, 3, 19u, value);

    imageStore(wo2D, c2 + ivec2(4, 0), v);

    }
    fragData = ui != iv.y ? v : vec4(0.0); 
}

