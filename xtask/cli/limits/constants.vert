#version 450
float clip[gl_MaxClipDistances - 9];
float workgroup[gl_MaxComputeWorkGroupSize.x - 2047];
void main()
{
    gl_Position = vec4(clip[0] + workgroup[0]);
}
