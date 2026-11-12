#version 450
layout(local_size_x_id = 3) in;
uint twice(uint x)
{
    return x * 2u;
}
