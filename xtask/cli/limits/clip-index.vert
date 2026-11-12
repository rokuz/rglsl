#version 450
void main()
{
    gl_ClipDistance[9] = float(gl_MaxClipDistances);
    gl_Position = vec4(0.0);
}
