#version 450
out float gl_ClipDistance[10];
out float gl_CullDistance[10];
void main()
{
    gl_ClipDistance[9] = 1.0;
    gl_CullDistance[9] = 1.0;
    gl_Position = vec4(0.0);
}
