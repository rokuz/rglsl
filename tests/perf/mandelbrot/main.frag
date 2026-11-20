#version 450

layout(location = 0) out vec4 color;

layout(std140, set = 0, binding = 0) uniform View {
    vec4 window;
    vec4 tint;
};

const int ITERATIONS = 1024;
const int SAMPLES = 24;

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.0, 0.10, 0.20);
    return a + b * cos(6.28318 * (c * t + d));
}

vec3 sampleAt(vec2 position) {
    vec2 uv = position / 512.0;
    vec2 c = vec2(-0.7453, 0.1127) + (uv - 0.5) * (0.01 + 0.001 * abs(window.x)) + window.yz * 0.0005;
    vec2 z = vec2(0.0);
    int count = ITERATIONS;
    for (int i = 0; i < ITERATIONS; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        if (dot(z, z) > 64.0) {
            count = i;
            break;
        }
    }
    if (count == ITERATIONS) {
        return vec3(0.0);
    }
    float smoothCount = float(count) - log2(log2(dot(z, z))) + 4.0;
    return palette(smoothCount / 64.0) * (1.0 + 0.1 * tint.rgb);
}

void main() {
    vec3 sum = vec3(0.0);
    for (int s = 0; s < SAMPLES; s++) {
        vec2 offset = vec2(float(s % 4), float(s / 4)) / 4.0 - 0.375;
        sum += sampleAt(gl_FragCoord.xy + offset);
    }
    color = vec4(sum / float(SAMPLES), 1.0);
}
