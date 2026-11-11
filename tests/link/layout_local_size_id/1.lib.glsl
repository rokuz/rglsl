#version 450
layout(local_size_x_id = 3, local_size_x = 4) in;
uint twice(uint x)
{
    return x * 2u;
}
