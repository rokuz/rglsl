#version 450

#extension GL_EXT_buffer_reference : enable

layout(buffer_reference, std430, buffer_reference_align = 4) buffer T1 {
    int i;
    int j;
    int k;
};

layout(buffer_reference, std430, buffer_reference_align = 8) buffer T2 {
    int i;
    int j;
    int k;
};

layout(buffer_reference, std430) buffer T3 {
    int i;
    int j;
    int k;
};

layout(buffer_reference, std430, buffer_reference_align = 32) buffer T4 {
    int i;
    int j;
    int k;
};

layout(push_constant) uniform Refs {
    T1 r1;
    T2 r2;
    T3 r3;
    T4 r4;
} refs;

void main()
{
    T1 t1 = refs.r1;
    T2 t2 = refs.r2;
    T3 t3 = refs.r3;
    T4 t4 = refs.r4;

    t1.i = t1.k;
    t2.i = t2.k;
    t3.i = t3.k;
    t4.i = t4.k;
}
