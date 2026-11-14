#version 450
#extension GL_AMD_shader_explicit_vertex_parameter : require

layout(location = 0) __explicitInterpAMD in vec2 position;
layout(location = 1) in float tag;
layout(location = 2) noperspective in float linearTag;
layout(location = 3) __explicitInterpAMD in float vertexTag;
layout(location = 0) out vec4 color;

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
    vec2 p0 = interpolateAtVertexAMD(position, 0u);
    vec2 p1 = interpolateAtVertexAMD(position, 1u);
    vec2 p2 = interpolateAtVertexAMD(position, 2u);

    vec2 linear = gl_BaryCoordNoPerspAMD;
    vec2 located = (1.0 - linear.x - linear.y) * p0 + linear.x * p1 + linear.y * p2;
    bool linearOk = near(located, gl_FragCoord.xy / 8.0 - 1.0) && near(blend(linear, tags), linearTag);
    bool linearCentroid = near(gl_BaryCoordNoPerspCentroidAMD, linear);

    vec2 smoothWeights = gl_BaryCoordSmoothAMD;
    bool smoothOk = near(blend(smoothWeights, tags), tag);
    bool smoothCentroid = near(gl_BaryCoordSmoothCentroidAMD, smoothWeights);

    color = vec4(linearOk && smoothOk ? 1.0 : 0.0, linearCentroid ? 1.0 : 0.0, smoothCentroid ? 1.0 : 0.0, 1.0);
}
