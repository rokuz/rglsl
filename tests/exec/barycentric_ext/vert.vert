#version 460

layout(location = 0) in vec2 inPosition;
layout(location = 0) out vec2 position;
layout(location = 1) flat out int id;
layout(location = 2) out Vertex {
    float weight;
    float tenfold;
} vertex;

void main()
{
    gl_Position = vec4(inPosition, 0.0, 1.0);
    position = inPosition;
    id = 1 << gl_VertexIndex;
    vertex.weight = float(gl_VertexIndex + 1);
    vertex.tenfold = float(10 * (gl_VertexIndex + 1));
}
