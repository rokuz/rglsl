#version 450
layout(location = 0) out vec4 color;
float depth();
void main()
{
    color = vec4(depth());
}
