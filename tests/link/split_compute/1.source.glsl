#version 450
layout(set = 0, binding = 0) readonly buffer Source {
    float values[];
} src;

float missing_helper(float x);

float neighbour(uint index)
{
    return src.values[(index + 1u) % 8u];
}

float never_called(float x)
{
    return missing_helper(x);
}
