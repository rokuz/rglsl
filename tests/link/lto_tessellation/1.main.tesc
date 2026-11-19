#version 450
layout(vertices = 3) out;
layout(location = 0) in vec4 v_color[];
layout(location = 1) in vec4 v_dead[];
layout(location = 0) out vec4 tc_color[];
layout(location = 1) out vec4 tc_dead[];
layout(location = 2) patch out vec4 p_used;
layout(location = 3) patch out vec4 p_dead;

void main()
{
    tc_color[gl_InvocationID] = v_color[gl_InvocationID];
    tc_dead[gl_InvocationID] = v_dead[gl_InvocationID] * 4.0;
    gl_out[gl_InvocationID].gl_Position = gl_in[gl_InvocationID].gl_Position;
    if (gl_InvocationID == 0) {
        p_used = vec4(1.0, 0.0, 0.0, 0.0);
        p_dead = vec4(2.0);
        gl_TessLevelOuter[0] = 1.0;
        gl_TessLevelOuter[1] = 1.0;
        gl_TessLevelOuter[2] = 1.0;
        gl_TessLevelInner[0] = 1.0;
    }
}
