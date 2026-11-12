#version 450

layout(binding = 0, std140) uniform Shared {
    mat4 mvp;
    vec4 tint;
    float scale[2];
} shared_block;

layout(binding = 1, std430) buffer Positions {
    vec4 offset;
    vec4 points[];
} positions;

layout(location = 0) in vec3 position;
layout(location = 1) in vec2 uv;
layout(location = 2) in float unused_input;

layout(location = 0) out vec2 v_uv;
layout(location = 1) out VertexData {
    vec3 normal;
    float depth;
} v_out;

void main()
{
    v_uv = uv * shared_block.scale[1];
    v_out.normal = position;
    v_out.depth = positions.points[int(uv.x)].w;
    gl_Position = shared_block.mvp * vec4(position + positions.offset.xyz, 1.0);
}
