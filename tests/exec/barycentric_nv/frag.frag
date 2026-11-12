#version 460
#extension GL_NV_fragment_shader_barycentric : require

layout(location = 0) pervertexNV in vec2 position[];
layout(location = 1) flat pervertexNV in int id[];
layout(location = 2) pervertexNV in Vertex {
    float weight;
    float tenfold;
} vertex[];
layout(location = 0) out vec4 color;

const vec2 corners[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));

void main()
{
    vec2 expected = gl_FragCoord.xy / 8.0 - 1.0;
    vec3 weights = gl_BaryCoordNV;
    vec3 flatWeights = gl_BaryCoordNoPerspNV;
    vec2 perspective = weights.x * position[0] + weights.y * position[1] + weights.z * position[2];
    vec2 straight = flatWeights.x * position[0] + flatWeights.y * position[1] + flatWeights.z * position[2];
    bool close = all(lessThan(abs(perspective - expected), vec2(1.0e-3)))
        && all(lessThan(abs(straight - expected), vec2(1.0e-3)))
        && abs(weights.x + weights.y + weights.z - 1.0) < 1.0e-4
        && abs(flatWeights.x + flatWeights.y + flatWeights.z - 1.0) < 1.0e-4;
    int seen = 0;
    bool consistent = true;
    for (int i = 0; i < 3; ++i) {
        int k = findLSB(id[i]);
        seen |= id[i];
        consistent = consistent && bitCount(id[i]) == 1 && k >= 0 && k < 3
            && position[i] == corners[clamp(k, 0, 2)]
            && vertex[i].weight == float(k + 1)
            && vertex[i].tenfold == float(10 * (k + 1));
    }
    color = vec4(float(seen), consistent ? 255.0 : 0.0, close ? 255.0 : 0.0, 255.0) / 255.0;
}
