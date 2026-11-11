#version 450
float wave(float x)
{
    return fract(x * 3.0) - 0.5;
}
