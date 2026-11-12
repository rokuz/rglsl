#version 450
layout(set = 1) uniform sampler2D t0;
uniform sampler2D t1;
layout(binding = 0) uniform sampler2D t2;
uniform U { float x; } u;
buffer B { float y; } b;
layout(location = 0) out vec4 color;
void main() { color = texture(t0, vec2(0)) + texture(t1, vec2(0)) + texture(t2, vec2(u.x)) + b.y; }
