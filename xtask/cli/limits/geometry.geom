#version 450
layout(points) in;
layout(points, max_vertices = 300) out;
void main()
{
    gl_Position = gl_in[0].gl_Position;
    EmitVertex();
}
