#version 450

layout(location = 0) in vec2 inPosition;
layout(location = 0) out float id;

void main()
{
    gl_Position = vec4(inPosition, 0.0, 1.0);
    id = float(gl_VertexIndex + 1);
}
