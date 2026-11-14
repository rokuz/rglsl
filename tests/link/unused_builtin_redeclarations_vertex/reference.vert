#version 450
out float gl_ClipDistance[4];
out float gl_CullDistance[];
layout(location = 0) out vec4 color;

void main()
{
    color = vec4(0.25, 0.5, 0.75, 1.0);
}
