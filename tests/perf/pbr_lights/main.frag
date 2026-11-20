#version 450

layout(location = 0) out vec4 color;

const int LIGHTS = 128;
const float PI = 3.14159265;
const int SAMPLES = 24;

struct Light {
    vec4 position;
    vec4 color;
};

layout(std140, set = 0, binding = 0) uniform Lights {
    Light lights[LIGHTS];
};

layout(std140, set = 0, binding = 1) uniform Material {
    vec4 albedo;
    vec4 surface;
    mat4 view;
};

float distributionGGX(float nDotH, float roughness) {
    float a = roughness * roughness;
    float a2 = a * a;
    float d = nDotH * nDotH * (a2 - 1.0) + 1.0;
    return a2 / (PI * d * d);
}

float geometrySchlick(float nDotV, float roughness) {
    float r = roughness + 1.0;
    float k = r * r / 8.0;
    return nDotV / (nDotV * (1.0 - k) + k);
}

vec3 fresnelSchlick(float cosTheta, vec3 f0) {
    return f0 + (1.0 - f0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

vec3 shadeLight(Light light, vec3 position, vec3 normal, vec3 toEye, vec3 base, float metallic, float roughness) {
    vec3 toLight = light.position.xyz * 4.0 - position;
    float distanceSquared = max(dot(toLight, toLight), 0.01);
    vec3 l = toLight * inversesqrt(distanceSquared);
    vec3 h = normalize(l + toEye);
    float nDotL = max(dot(normal, l), 0.0);
    float nDotV = max(dot(normal, toEye), 0.001);
    float nDotH = max(dot(normal, h), 0.0);
    vec3 f0 = mix(vec3(0.04), base, metallic);
    vec3 f = fresnelSchlick(max(dot(h, toEye), 0.0), f0);
    float d = distributionGGX(nDotH, roughness);
    float g = geometrySchlick(nDotV, roughness) * geometrySchlick(nDotL, roughness);
    vec3 specular = d * g * f / (4.0 * nDotV * max(nDotL, 0.001));
    vec3 diffuse = (1.0 - f) * (1.0 - metallic) * base / PI;
    vec3 radiance = abs(light.color.rgb) / distanceSquared;
    return (diffuse + specular) * radiance * nDotL;
}

vec3 sampleAt(vec2 position) {
    vec2 uv = position / 512.0 * 2.0 - 1.0;
    float height = 0.2 * sin(uv.x * 7.0) * cos(uv.y * 5.0);
    vec3 surfacePosition = vec3(uv * 4.0, height);
    vec3 normal = normalize(vec3(-1.4 * cos(uv.x * 7.0) * cos(uv.y * 5.0), sin(uv.x * 7.0) * sin(uv.y * 5.0), 1.0));
    normal = normalize(mat3(view) * normal + normal * 2.0);
    vec3 toEye = normalize(vec3(0.0, 0.0, 6.0) - surfacePosition);
    vec3 base = abs(albedo.rgb) * 0.5 + 0.25;
    float metallic = clamp(abs(surface.x) * 0.5, 0.0, 1.0);
    float roughness = clamp(abs(surface.y) * 0.5, 0.05, 1.0);
    vec3 total = vec3(0.0);
    for (int i = 0; i < LIGHTS; i++) {
        total += shadeLight(lights[i], surfacePosition, normal, toEye, base, metallic, roughness);
    }
    vec3 mapped = total / (total + 1.0);
    return pow(mapped, vec3(1.0 / 2.2));
}

void main() {
    vec3 sum = vec3(0.0);
    for (int s = 0; s < SAMPLES; s++) {
        vec2 offset = vec2(float(s % 4), float(s / 4)) / 4.0 - 0.375;
        sum += sampleAt(gl_FragCoord.xy + offset);
    }
    color = vec4(sum / float(SAMPLES), 1.0);
}
