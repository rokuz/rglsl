#version 450
layout(triangles) in;
layout(location = 0) in vec4 positions[31];
void main()
{
    gl_Position = positions[0] + vec4(float(gl_MaxPatchVertices));
}
