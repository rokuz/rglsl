#version 450
layout(location = 0) flat in int which;
layout(location = 0) out vec4 color;
layout(binding = 0) uniform Block { vec4 weights[4]; };
void main()
{
    color = weights[which];
}
