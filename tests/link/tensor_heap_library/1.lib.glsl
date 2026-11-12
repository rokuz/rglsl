#version 460
#extension GL_EXT_descriptor_heap : require
#extension GL_ARM_tensors : require

layout(descriptor_heap) uniform tensorARM<float, 2> tensors[4];

float first(uint index)
{
    float value;
    tensorReadARM(tensors[index], uint[](0u, 0u), value);
    return value;
}
