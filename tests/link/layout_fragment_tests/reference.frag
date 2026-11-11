#version 450
layout(early_fragment_tests) in;
layout(location = 0) out vec4 color;
float depth()
{
    return gl_FragCoord.z;
}
void main()
{
    color = vec4(depth());
}
