#version 460
#extension GL_ARM_tensors : require

layout(set = 0, binding = 0) uniform tensorARM<float, 2> first;
layout(set = 0, binding = 1) uniform tensorARM<float, 2> pair[2];

tensorARM<float, 2> select(uint index)
{
    if (index == 0u) {
        return first;
    }
    return pair[index - 1u];
}

tensorARM<float, 2>[2] everything()
{
    return pair;
}

uint count(readonly writeonly tensorARM<float, 2> tensors[2])
{
    return tensorSizeARM(tensors[0], 0) + tensorSizeARM(tensors[1], 0);
}
