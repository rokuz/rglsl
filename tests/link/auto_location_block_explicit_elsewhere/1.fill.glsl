#version 450
layout(location = 2) out Block { vec4 a; vec4 b; } blk;

void fill(vec4 p)
{
    blk.a = p * 0.5;
    blk.b = p.wzyx;
}
