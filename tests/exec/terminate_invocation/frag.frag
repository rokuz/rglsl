#version 450
#extension GL_EXT_terminate_invocation : require

layout(set = 0, binding = 0) buffer Log { uint hits; };
layout(location = 0) out vec4 color;

void main()
{
    if (gl_FragCoord.x < 8.0) {
        terminateInvocation;
    }
    atomicAdd(hits, 1u);
    color = vec4(1.0, 0.0, 0.0, 1.0);
}
