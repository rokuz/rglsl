#version 460
#extension GL_ARM_tensors : require

layout(set = 0, binding = 0) uniform tensorARM<uint, 2> t;

uint other()
{
    return tensorSizeARM(t, 1);
}
