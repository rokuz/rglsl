#version 450
layout(stream = 1) out;
layout(location = 1) out vec4 second;

void emit_second()
{
    second = vec4(2.0);
    EmitStreamVertex(1);
    EndStreamPrimitive(1);
}
