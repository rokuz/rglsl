#version 450
layout(location = 0) flat in int which;
layout(location = 0) out vec4 color;
void main()
{
    vec4 values[2] = vec4[2](vec4(1.0), vec4(2.0));
    color = values[which];
}
