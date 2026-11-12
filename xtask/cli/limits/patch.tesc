#version 450
layout(vertices = 3) out;
layout(location = 0) in vec4 positions[31];
void main()
{
    gl_out[gl_InvocationID].gl_Position = positions[gl_InvocationID] + vec4(float(gl_in.length()));
}
