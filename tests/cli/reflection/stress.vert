#version 460
#extension GL_EXT_scalar_block_layout : require

struct Light { vec3 position; float radius; mat3x2 basis[2]; };
struct Scene { Light lights[3]; vec4 ambient; int count; };

layout(binding = 0, std140) uniform Camera { layout(row_major) mat4 view; mat4 proj; Scene scene; } cameras[2];
layout(binding = 1, std430) buffer Particles { Scene scenes[2]; Light dynamic[]; } particles;
layout(binding = 2, scalar) buffer Packed { vec3 a; float b; dvec3 c; } packed_data;
layout(binding = 3) uniform sampler2DArray layers[4];
layout(binding = 4) uniform usampler3D volume;
layout(binding = 5, rgba8) uniform readonly image2D picture;
layout(binding = 6) uniform Plain { float values[2][3]; ivec2 cells[4]; bool flags[2]; } plain;
layout(push_constant) uniform Push { uint index; float weights[4]; } push;

layout(location = 0) in vec4 position;
layout(location = 1) in ivec2 tile;
layout(location = 2) in mat2 rotation;
layout(location = 0) out vec4 result;
layout(location = 1) flat out int mode;

float lightSum(Light light) { return light.radius + light.basis[1][0].x; }

float sampleAll(int i)
{
    float sum = 0.0;
    do {
        sum += texture(layers[i], vec3(0.0)).x;
        i++;
    } while (i < int(push.weights[2]));
    switch (tile.x) {
    case 0:
        sum += float(texelFetch(volume, ivec3(0), 0).x);
        break;
    default:
        sum += imageLoad(picture, tile).y;
    }
    return sum;
}

void main()
{
    Scene s = cameras[1].scene;
    float x = lightSum(particles.scenes[push.index].lights[2]);
    x += particles.dynamic[tile.y].radius + float(particles.dynamic.length());
    x += push.index > 2u ? plain.values[1][2] : plain.values[0][tile.x];
    x += float(plain.cells[3].y) + (plain.flags[1] ? 1.0 : 0.0);
    x += packed_data.a.y + packed_data.b + float(packed_data.c.z);
    for (int k = 0; k < cameras[0].scene.count; k++) {
        x += cameras[k].scene.lights[k].position.x;
    }
    result = cameras[0].proj * cameras[1].view * position + vec4(x + sampleAll(1)) * s.ambient;
    result.xy += rotation * vec2(1.0);
    mode = gl_VertexIndex + gl_InstanceIndex;
    gl_Position = result;
}
