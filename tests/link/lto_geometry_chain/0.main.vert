#version 450
layout(location = 0) in vec2 position;
layout(location = 0) out vec4 color;
layout(location = 1) out vec4 dead;
layout(location = 2) flat out int level;

float brightness();

void main()
{
    gl_Position = vec4(position, 0.0, 1.0);
    gl_PointSize = 2.0;
    color = vec4(brightness(), 0.0, 1.0, 1.0);
    dead = vec4(position, 0.5, 0.5);
    level = 3;
}
