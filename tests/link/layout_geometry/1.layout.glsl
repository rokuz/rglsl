#version 450
layout(triangles, invocations = 2) in;
layout(triangle_strip, max_vertices = 3) out;
void emit(vec4 p)
{
    gl_Position = p;
    EmitVertex();
}
