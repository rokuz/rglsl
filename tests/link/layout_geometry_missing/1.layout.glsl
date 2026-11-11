#version 450
layout(triangles) in;
void emit(vec4 p)
{
    gl_Position = p;
    EmitVertex();
}
