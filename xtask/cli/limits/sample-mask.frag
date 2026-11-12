#version 450
layout(location = 0) out vec4 color;
void main()
{
    gl_SampleMask[1] = 1;
    color = vec4(1.0);
}
