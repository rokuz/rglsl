#version 450 core

layout(vertices = 4) out;

patch out vec4 patchOut;

void main()
{
    gl_in[0].gl_PointSize;
    if (gl_InvocationID == 0) {
        patchOut = vec4(0.25, 0.5, 0.75, 1.0);
        gl_TessLevelOuter[0] = 2.0;
        gl_TessLevelOuter[1] = 2.0;
        gl_TessLevelOuter[2] = 2.0;
        gl_TessLevelOuter[3] = 2.0;
        gl_TessLevelInner[0] = 2.0;
        gl_TessLevelInner[1] = 2.0;
    }
}
