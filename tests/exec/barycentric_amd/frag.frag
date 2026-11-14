#version 450
#extension GL_AMD_shader_explicit_vertex_parameter : require

layout(location = 0) out vec4 color;

const vec2 corners[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));

bool matches(vec2 weights, vec2 expected)
{
    vec2 forward = (1.0 - weights.x - weights.y) * corners[0] + weights.x * corners[1] + weights.y * corners[2];
    vec2 backward = (1.0 - weights.x - weights.y) * corners[0] + weights.y * corners[1] + weights.x * corners[2];
    return all(lessThan(abs(forward - expected), vec2(1.0e-3)))
        || all(lessThan(abs(backward - expected), vec2(1.0e-3)));
}

void main()
{
    vec2 expected = gl_FragCoord.xy / 8.0 - 1.0;
    bool interpolated = matches(gl_BaryCoordSmoothAMD, expected)
        && matches(gl_BaryCoordSmoothCentroidAMD, expected)
        && matches(gl_BaryCoordSmoothSampleAMD, expected);
    bool linear = matches(gl_BaryCoordNoPerspAMD, expected)
        && matches(gl_BaryCoordNoPerspCentroidAMD, expected)
        && matches(gl_BaryCoordNoPerspSampleAMD, expected);
    bool pull = !any(isnan(gl_BaryCoordPullModelAMD)) && !any(isinf(gl_BaryCoordPullModelAMD));
    color = vec4(interpolated ? 1.0 : 0.0, linear ? 1.0 : 0.0, pull ? 1.0 : 0.0, 1.0);
}
