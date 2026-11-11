#version 450
layout(set = 0, binding = 0) uniform Matrices {
    mat4 mvp;
} matrices;

vec4 transform(vec4 p)
{
    return matrices.mvp * p;
}
