#version 450
layout(points) in;
layout(points, max_vertices = 2) out;
layout(location = 0) out vec4 first;

void emit_second();

void main()
{
    first = gl_in[0].gl_Position;
    EmitStreamVertex(0);
    EndStreamPrimitive(0);
    emit_second();
}
