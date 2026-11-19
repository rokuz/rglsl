#version 450
layout(triangles) in;
layout(triangle_strip, max_vertices = 3) out;
layout(location = 0) in vec4 color[];
layout(location = 1) in vec4 dead[];
layout(location = 2) flat in int level[];
layout(location = 0) out vec4 outColor;
layout(location = 1) out vec4 extra;
layout(location = 2) flat out int outLevel;

void main()
{
    for (int i = 0; i < 3; ++i) {
        gl_Position = gl_in[i].gl_Position;
        outColor = color[i];
        extra = dead[i] * 2.0;
        outLevel = level[i];
        EmitVertex();
    }
    EndPrimitive();
}
