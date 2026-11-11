#version 450
layout(location = 0) in vec4 position;
layout(location = 0) out vec4 shaded;
vec4 tinted(vec4 v);
void main()
{
    gl_Position = position;
    shaded = tinted(position);
}
