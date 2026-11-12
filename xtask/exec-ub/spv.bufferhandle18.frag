#version 450

#extension GL_EXT_shader_explicit_arithmetic_types_int64 : enable
#extension GL_EXT_buffer_reference2 : enable
#extension GL_EXT_scalar_block_layout : enable

layout(buffer_reference, buffer_reference_align = 8) buffer T1 {
    int x;
    bool y;
};
layout(buffer_reference, buffer_reference_align = 64) buffer T2 {
    int x;
};

const int s = int(uint64_t(T1(T2(uint64_t(3)))));
int x[s];
const uint64_t t = uint64_t(true ? T2(uint64_t(10)) : T2(uint64_t(11)));

#define sizeof(T) (uint64_t(T(uint64_t(0))+1))

const uint64_t s2 = sizeof(T1);
uint buf[int(s2)];

layout(push_constant) uniform Refs {
    T1 ra;
    T1 rf;
    T1 rj;
    T2 rm;
} refs;

void main()
{
    T1 a = refs.ra, b = T1(uint64_t(5));
    T1 c = true ? a : b;
    T1 d = (a,b);
    T1 e = true ? T1(uint64_t(6)) : T1(uint64_t(7));
    T1 f = a.y ? refs.rf : refs.rf;

    f[3].x = 1;
    (f+5).x = 1;

    T1 arr[2] = {a, f};
    arr[1][7].x = 1;
    int i = 1;
    arr[i][i].x = 1;

    arr[i][i][i][i][i][i][i].x = 1;

    T1 j = refs.rj;
    j = j+1;
    j = j-2;
    j += 3;
    j -= 4;
    j = 5+j;
    T1 k = j + 6;
    int64_t x = k - j;
    uint64_t y = sizeof(T1);
    k = k + (-1);

    T2 m = refs.rm;
    m = m+1;
}
