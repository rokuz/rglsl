#version 460
#extension GL_ARM_tensors : require

float sum(readonly tensorARM<float, 2> tensor, uint row)
{
    float values[4];
    tensorReadARM(tensor, uint[](row, 0u), values, gl_TensorOperandsOutOfBoundsValueARM, 0.0);
    return values[0] + values[1] + values[2] + values[3];
}

void scale(readonly tensorARM<float, 2> from, writeonly tensorARM<float, 2> to, float factor)
{
    float value;
    tensorReadARM(from, uint[](0u, 0u), value);
    tensorWriteARM(to, uint[](0u, 0u), value * factor, gl_TensorOperandsNonTemporalARM);
}

uint count(readonly writeonly tensorARM<int, 1> tensor)
{
    return tensorSizeARM(tensor, 0);
}
