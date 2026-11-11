#version 450
float scale(float x)
{
    return x * 2.0 + 0.5;
}

uint mix_bits(uint a, uint b)
{
    return (a ^ b) & 7u;
}
