#version 460
#extension GL_NV_fragment_shader_barycentric : require

layout(location = 0) pervertexNV in vec2 position[];
layout(location = 1) flat pervertexNV in int id[];
layout(location = 2) pervertexNV in Vertex {
    float weight;
    noperspective float plain;
} vertex[];
layout(location = 0) out vec4 color;

void main()
{
    vec2 expected = gl_FragCoord.xy / 8.0 - 1.0;
    vec3 weights = gl_BaryCoordNV;
    vec3 flatWeights = gl_BaryCoordNoPerspNV;
    vec2 perspective = weights.x * position[0] + weights.y * position[1] + weights.z * position[2];
    vec2 straight = flatWeights.x * position[0] + flatWeights.y * position[1] + flatWeights.z * position[2];
    bool close = all(lessThan(abs(perspective - expected), vec2(1.0e-3)))
        && all(lessThan(abs(straight - expected), vec2(1.0e-3)))
        && abs(weights.x + weights.y + weights.z - 1.0) < 1.0e-4;
    bool values = vertex[0].weight == 1.0 && vertex[1].weight == 2.0 && vertex[2].weight == 3.0
        && vertex[0].plain == 10.0 && vertex[1].plain == 20.0 && vertex[2].plain == 30.0;
    color = vec4(float(id[0]), float(id[1]), float(id[2]), (close && values) ? 255.0 : 0.0) / 255.0;
}
