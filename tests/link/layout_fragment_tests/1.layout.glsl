#version 450
layout(early_fragment_tests) in;
float depth()
{
    return gl_FragCoord.z;
}
