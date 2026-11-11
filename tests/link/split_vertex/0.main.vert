#version 450
layout(location = 0) in vec4 position;
layout(location = 0) out vec4 shaded;

vec4 transform(vec4 p);

void main()
{
    gl_Position = transform(position);
    shaded = position * 0.5;
}
