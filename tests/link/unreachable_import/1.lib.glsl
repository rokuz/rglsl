#version 450
float not_implemented(float x);

float never_called(float x)
{
    return not_implemented(x);
}

float used(float x)
{
    return x + 1.0;
}
