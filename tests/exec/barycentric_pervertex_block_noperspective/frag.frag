#version 460
#extension GL_EXT_fragment_shader_barycentric : require

layout(location = 0) pervertexEXT in Vertex {
    float weight;
    noperspective float plain;
} vertex[];
layout(location = 0) out vec4 color;

void main()
{
    bool consistent = true;
    float weights = 0.0;
    for (int i = 0; i < 3; ++i) {
        consistent = consistent && vertex[i].plain == 10.0 * vertex[i].weight;
        weights += vertex[i].weight;
    }
    bool distinct = vertex[0].weight != vertex[1].weight && vertex[1].weight != vertex[2].weight
        && vertex[0].weight != vertex[2].weight;
    color = (consistent && distinct && weights == 6.0) ? vec4(1.0) : vec4(0.0, 0.0, 0.0, 1.0);
}
