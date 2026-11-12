#version 450
layout(location = 39) out vec4 color;
void main()
{
    color = vec4(float(gl_MaxDrawBuffers));
}
