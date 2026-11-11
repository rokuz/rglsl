#version 450

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

void main() {
    _GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
}
