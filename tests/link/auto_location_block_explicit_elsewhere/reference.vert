#version 450
layout(location = 0) in vec4 position;
out vec4 extra;
layout(location = 2) out Block { vec4 a; vec4 b; } blk;

void fill(vec4 p)
{
    blk.a = p * 0.5;
    blk.b = p.wzyx;
}

void main()
{
    gl_Position = position;
    extra = position * 0.25;
    fill(position);
}
