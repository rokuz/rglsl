#version 450
layout(binding = 0) uniform U { vec4 a; vec4 b; } u;
layout(location = 0) out vec4 color;
void main()
{
    color = u.a;
    color = undefined_thing + u.b;
}
