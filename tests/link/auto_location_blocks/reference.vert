#version 450
layout(location = 0) in vec4 position;
out vec4 extra;
out Block { vec4 a; vec4 b; } blk;
out vec2 more;
out vec4 again;

void fill(vec4 p)
{
    blk.a = p * 0.5;
    blk.b = p.wzyx;
    more = p.xy;
    again = vec4(0.75);
}

void main()
{
    gl_Position = position;
    extra = position * 0.25;
    fill(position);
}
