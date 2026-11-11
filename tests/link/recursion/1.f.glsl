#version 450
float g(float x);

float f(float x)
{
    return x > 0.0 ? g(x - 1.0) : x;
}
