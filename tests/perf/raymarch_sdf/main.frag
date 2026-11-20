#version 450

layout(location = 0) out vec4 color;

layout(std140, set = 0, binding = 0) uniform Camera {
    vec4 eye;
    vec4 light;
    vec4 time;
};

const int SAMPLES = 24;

struct Hit {
    float distance;
    int material;
};

float sdSphere(vec3 p, float radius) {
    return length(p) - radius;
}

float sdBox(vec3 p, vec3 bounds) {
    vec3 q = abs(p) - bounds;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float sdTorus(vec3 p, vec2 t) {
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
}

float smoothUnion(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

Hit closest(Hit a, Hit b) {
    if (b.distance < a.distance) {
        return b;
    }
    return a;
}

Hit scene(vec3 p) {
    float phase = time.x * 0.1;
    Hit hit = Hit(p.y + 1.0, 0);
    vec3 repeated = vec3(mod(p.x + 2.0, 4.0) - 2.0, p.y, mod(p.z + 2.0, 4.0) - 2.0);
    float blob = smoothUnion(sdSphere(repeated - vec3(0.0, 0.2 * sin(phase), 0.0), 0.8),
                             sdBox(repeated - vec3(0.6, -0.4, 0.0), vec3(0.4)), 0.3);
    hit = closest(hit, Hit(blob, 1));
    hit = closest(hit, Hit(sdTorus(repeated - vec3(0.0, 0.9, 0.0), vec2(0.7, 0.12)), 2));
    return hit;
}

vec3 normalAt(vec3 p) {
    const vec2 e = vec2(0.0005, 0.0);
    return normalize(vec3(
        scene(p + e.xyy).distance - scene(p - e.xyy).distance,
        scene(p + e.yxy).distance - scene(p - e.yxy).distance,
        scene(p + e.yyx).distance - scene(p - e.yyx).distance));
}

float softShadow(vec3 origin, vec3 direction) {
    float result = 1.0;
    float t = 0.02;
    for (int i = 0; i < 48; i++) {
        float h = scene(origin + direction * t).distance;
        if (h < 0.0005) {
            return 0.0;
        }
        result = min(result, 8.0 * h / t);
        t += clamp(h, 0.02, 0.25);
        if (t > 12.0) {
            break;
        }
    }
    return clamp(result, 0.0, 1.0);
}

vec3 materialColor(int material, vec3 p) {
    switch (material) {
    case 0:
        return mix(vec3(0.2), vec3(0.8), mod(floor(p.x) + floor(p.z), 2.0));
    case 1:
        return vec3(0.9, 0.4, 0.2);
    default:
        return vec3(0.2, 0.5, 0.9);
    }
}

vec3 sampleAt(vec2 position) {
    vec2 uv = (position - 256.0) / 256.0;
    vec3 origin = vec3(0.0, 1.5, -6.0) + eye.xyz * 0.1;
    vec3 direction = normalize(vec3(uv.x, -uv.y - 0.2, 1.6));
    float t = 0.0;
    Hit hit = Hit(1e9, -1);
    for (int i = 0; i < 160; i++) {
        Hit current = scene(origin + direction * t);
        if (current.distance < 0.0005 * t) {
            hit = Hit(t, current.material);
            break;
        }
        t += current.distance;
        if (t > 40.0) {
            break;
        }
    }
    if (hit.material < 0) {
        return vec3(0.5, 0.7, 1.0);
    }
    vec3 p = origin + direction * hit.distance;
    vec3 n = normalAt(p);
    vec3 toLight = normalize(vec3(0.6, 0.8, -0.4) + light.xyz * 0.05);
    float diffuse = max(dot(n, toLight), 0.0) * softShadow(p + n * 0.002, toLight);
    float ambient = 0.5 + 0.5 * n.y;
    vec3 shade = materialColor(hit.material, p) * (0.15 * ambient + 0.85 * diffuse);
    return mix(shade, vec3(0.5, 0.7, 1.0), 1.0 - exp(-0.02 * hit.distance * hit.distance));
}

void main() {
    vec3 sum = vec3(0.0);
    for (int s = 0; s < SAMPLES; s++) {
        vec2 offset = vec2(float(s % 6), float(s / 6)) / 6.0 - 0.4;
        sum += sampleAt(gl_FragCoord.xy + offset);
    }
    color = vec4(sum / float(SAMPLES), 1.0);
}
