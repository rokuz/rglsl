#version 450

layout(binding = 0, std140) uniform Shared {
    mat4 mvp;
    vec4 tint;
    float scale[2];
} shared_block;

layout(binding = 2) uniform sampler2D albedo;
layout(binding = 3, std430) readonly buffer Lights {
    vec4 colors[4];
} lights;

layout(location = 0) in vec2 v_uv;
layout(location = 1) in VertexData {
    vec3 normal;
    float depth;
} v_in;

layout(location = 0) out vec4 color;
layout(location = 1) out vec4 extra;

void main()
{
    color = texture(albedo, v_uv) * shared_block.tint + lights.colors[2];
    color.xyz += v_in.normal * v_in.depth;
    gl_FragDepth = v_in.depth;
}
