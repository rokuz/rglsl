#version 450
layout(triangles, equal_spacing, ccw) in;
layout(location = 0) in vec4 tc_color[];
layout(location = 2) patch in vec4 p_used;
layout(location = 0) out vec4 color;

vec4 corner(int index);

void main()
{
    gl_Position = gl_in[0].gl_Position * gl_TessCoord.x
        + gl_in[1].gl_Position * gl_TessCoord.y
        + gl_in[2].gl_Position * gl_TessCoord.z;
    color = tc_color[0] * 0.0 + corner(1) + p_used;
}

vec4 corner(int index)
{
    return tc_color[index];
}
