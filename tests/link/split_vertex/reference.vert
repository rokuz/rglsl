#version 450
layout(location = 0) in vec4 position;
layout(location = 0) out vec4 shaded;

layout(set = 0, binding = 0) uniform Matrices {
    mat4 mvp;
} matrices;

vec4 transform(vec4 p)
{
    return matrices.mvp * p;
}

void main()
{
    gl_Position = transform(position);
    shaded = position * 0.5;
}
