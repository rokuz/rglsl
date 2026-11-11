#version 450
layout(location = 0) in vec4 shaded;
layout(location = 0) out vec4 color;
vec4 tinted(vec4 v);
void main()
{
    color = tinted(shaded);
}
