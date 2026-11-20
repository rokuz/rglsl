#version 450

layout(location = 0) out vec4 color;

layout(std140, set = 0, binding = 0) uniform Parameters {
    vec4 offset;
    vec4 scale;
};

const int OCTAVES = 10;
const int SAMPLES = 32;

vec3 permute(vec3 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float simplex(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
    float sum = 0.0;
    float amplitude = 0.5;
    mat2 rotation = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < OCTAVES; i++) {
        sum += amplitude * simplex(p);
        p = rotation * p * 2.02 + vec2(1.7, 9.2);
        amplitude *= 0.5;
    }
    return sum;
}

vec3 sampleAt(vec2 position) {
    vec2 p = position / 128.0 + offset.xy;
    vec2 q = vec2(fbm(p), fbm(p + vec2(5.2, 1.3)));
    vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2)), fbm(p + 4.0 * q + vec2(8.3, 2.8)));
    float f = fbm(p + 4.0 * r * (1.0 + 0.05 * scale.x));
    vec3 shade = mix(vec3(0.10, 0.62, 0.67), vec3(0.67, 0.67, 0.50), clamp(f * f * 4.0, 0.0, 1.0));
    shade = mix(shade, vec3(0.0, 0.0, 0.16), clamp(length(q), 0.0, 1.0));
    shade = mix(shade, vec3(0.67, 1.0, 1.0), clamp(abs(r.x), 0.0, 1.0));
    return (f * f * f + 0.6 * f * f + 0.5 * f) * shade;
}

void main() {
    vec3 sum = vec3(0.0);
    for (int s = 0; s < SAMPLES; s++) {
        vec2 offset = vec2(float(s % 4), float(s / 4)) / 4.0 - 0.375;
        sum += sampleAt(gl_FragCoord.xy + offset);
    }
    color = vec4(sum / float(SAMPLES) + 1.0, 1.0);
}
