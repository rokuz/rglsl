#version 450
layout(location = 0) in vec2 position;
layout(location = 0) out vec4 v_color;
layout(location = 1) out vec4 v_dead;

void main()
{
    gl_Position = vec4(position, 0.0, 1.0);
    gl_PointSize = 1.0;
    v_color = vec4(0.0, 1.0, 1.0, 1.0);
    v_dead = vec4(position, 0.0, 1.0);
}
