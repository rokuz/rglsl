#version 450

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

void main() {
    int i = int(gl_FragCoord.x) % 3;
    int j = int(gl_FragCoord.y) % 2;
    vec4 v = vec4(0.0);
    if (i == 0) {
        v.x = 0.5;
    } else if (i == 1) {
        v.y = 0.5;
    } else {
        v.z = 0.5;
    }
    if (j == 0) {
        v.z += 0.25;
        v.y += 1.0;
        v.w += 1.0;
        v.y = 0.25;
    } else {
        v.y += 0.25;
        v.z += 1.0;
        v.x += 1.0;
        v.w = 0.25;
    }
    _GLF_color = v / 4.0;
}
