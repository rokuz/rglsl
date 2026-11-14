#version 450

layout(location = 0) in vec2 inPosition;
layout(location = 0) out vec2 position;
layout(location = 1) out float tag;
layout(location = 2) noperspective out float linearTag;
layout(location = 3) out float vertexTag;
layout(location = 4) out float clipW;

void main()
{
    float w = float(1 << gl_VertexIndex);
    gl_Position = vec4(inPosition * w, 0.0, w);
    position = inPosition;
    tag = float(gl_VertexIndex + 1);
    linearTag = tag;
    vertexTag = tag;
    clipW = w;
}
