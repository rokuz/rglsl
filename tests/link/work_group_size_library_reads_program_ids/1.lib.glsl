#version 450
layout(local_size_x = 8, local_size_y = 2) in;
uint lanes()
{
    return gl_WorkGroupSize.x + gl_WorkGroupSize.y * 100u;
}
