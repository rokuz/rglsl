#version 450
out vec2 more;
out vec4 again;
out Block { vec4 a; vec4 b; } blk;

void fill(vec4 p)
{
    blk.a = p * 0.5;
    blk.b = p.wzyx;
    more = p.xy;
    again = vec4(0.75);
}
