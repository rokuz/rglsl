#version 460
#extension GL_ARM_tensors : require

layout(set = 0, binding = 0) uniform tensorARM<uint, 3> table;

uint lookup(uint x)
{
    uint value;
    tensorReadARM(table, uint[](x, 0u, 0u), value, gl_TensorOperandsOutOfBoundsValueARM, 7u);
    return value;
}
