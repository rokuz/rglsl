#version 450
#extension GL_EXT_post_depth_coverage : require
layout(post_depth_coverage) in;

vec4 coverage()
{
    return vec4(float(gl_SampleMaskIn[0] & 1));
}
