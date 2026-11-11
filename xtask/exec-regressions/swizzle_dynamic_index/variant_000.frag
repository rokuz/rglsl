#version 450

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

void setQuarter(out float f) {
    f = 0.25;
}

void main() {
    int i = int(gl_FragCoord.x) % 3;
    int j = int(gl_FragCoord.y) % 2;
    vec4 v = vec4(0.0);
    v.xyz[i] = 0.5;
    v.wzyx[j + 1] += 0.25;
    v.zyx.yx[j]++;
    ++v.wx[j];
    setQuarter(v.yw[j]);
    _GLF_color = v / 4.0;
}
