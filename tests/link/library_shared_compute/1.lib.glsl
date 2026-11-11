#version 450
shared float cache[4];

void store(uint index)
{
    cache[index] = float(index);
}
