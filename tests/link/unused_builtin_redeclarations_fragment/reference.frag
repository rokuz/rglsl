#version 450
layout(depth_greater) out float gl_FragDepth;
in float gl_ClipDistance[2];
in float gl_CullDistance[];
layout(origin_upper_left) in vec4 gl_FragCoord;
layout(location = 0) out vec4 color;

void main()
{
    color = vec4(0.25, 0.5, 0.75, 1.0);
}
