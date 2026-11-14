#version 450
#extension GL_AMD_shader_explicit_vertex_parameter : require

layout(location = 0) __explicitInterpAMD in vec2 position;
layout(location = 1) in float tag;
layout(location = 2) noperspective in float linearTag;
layout(location = 3) __explicitInterpAMD in float vertexTag;
layout(location = 4) __explicitInterpAMD in float clipW;
layout(location = 0) out vec4 color;

const vec2 corners[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));

bool near(float a, float b)
{
    return abs(a - b) < 1.0e-4;
}

bool near(vec2 a, vec2 b)
{
    return all(lessThan(abs(a - b), vec2(1.0e-4)));
}

float blend(vec2 weights, vec3 values)
{
    return (1.0 - weights.x - weights.y) * values.x + weights.x * values.y + weights.y * values.z;
}

void main()
{
    vec3 tags = vec3(interpolateAtVertexAMD(vertexTag, 0u), interpolateAtVertexAMD(vertexTag, 1u),
        interpolateAtVertexAMD(vertexTag, 2u));
    vec3 ws = vec3(interpolateAtVertexAMD(clipW, 0u), interpolateAtVertexAMD(clipW, 1u),
        interpolateAtVertexAMD(clipW, 2u));
    vec2 p0 = interpolateAtVertexAMD(position, 0u);
    vec2 p1 = interpolateAtVertexAMD(position, 1u);
    vec2 p2 = interpolateAtVertexAMD(position, 2u);
    bool vertices = tags.x + tags.y + tags.z == 6.0 && tags.x * tags.y * tags.z == 6.0
        && tags.x != tags.y && tags.y != tags.z && tags.x != tags.z
        && p0 == corners[clamp(int(tags.x) - 1, 0, 2)]
        && p1 == corners[clamp(int(tags.y) - 1, 0, 2)]
        && p2 == corners[clamp(int(tags.z) - 1, 0, 2)]
        && ws == exp2(tags - 1.0);

    vec2 expected = gl_FragCoord.xy / 8.0 - 1.0;
    vec2 linear = gl_BaryCoordNoPerspAMD;
    vec2 located = (1.0 - linear.x - linear.y) * p0 + linear.x * p1 + linear.y * p2;
    bool linearOk = near(located, expected)
        && near(blend(linear, tags), linearTag)
        && near(gl_BaryCoordNoPerspSampleAMD, linear);

    vec2 smoothWeights = gl_BaryCoordSmoothAMD;
    bool smoothOk = near(blend(smoothWeights, tags), tag)
        && !near(blend(smoothWeights, tags), linearTag)
        && near(gl_BaryCoordSmoothSampleAMD, smoothWeights);

    vec3 pull = gl_BaryCoordPullModelAMD;
    bool pullOk = near(pull.z, gl_FragCoord.w)
        && near(pull.xy, linear / ws.yz)
        && near(pull.xy / pull.z, smoothWeights);

    color = vec4(vertices ? 1.0 : 0.0, linearOk ? 1.0 : 0.0, smoothOk ? 1.0 : 0.0, pullOk ? 1.0 : 0.0);
}
