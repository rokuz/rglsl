#version 450
layout(local_size_x = 8) in;
uint twice(uint x)
{
    return x * 2u;
}
