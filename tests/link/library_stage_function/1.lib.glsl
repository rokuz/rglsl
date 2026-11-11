#version 450
layout(local_size_x = 1) in;

float slope(float x)
{
    barrier();
    return x;
}
