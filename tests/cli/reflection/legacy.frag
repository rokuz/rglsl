#version 450
struct S { vec3 a; float b[3]; mat2x3 m; };
layout(binding = 1) uniform UBO { vec4 v; float arr[4]; S s; S ss[2]; layout(row_major) mat3 rm; } ubo;
layout(std430, binding = 2) buffer SSBO { int n; vec4 data[]; } sb;
layout(binding = 3) uniform sampler2D tex;
layout(binding = 4) uniform sampler2D tex2[3];
layout(std140, binding = 5) uniform PC { float k; } pc;
layout(location = 0) in vec2 uv;
layout(location = 1) in flat int idx;
layout(location = 0) out vec4 color;
float f() { return ubo.arr[2] + ubo.s.b[idx]; }
void main() {
  color = ubo.v + texture(tex, uv) * pc.k + texture(tex2[1], uv);
  color.x += f() + ubo.ss[idx].m[0].x + sb.data[idx].y + float(sb.data.length()) + ubo.rm[0][0];
  for (int i = 0; i < 2; i += int(ubo.arr[1])) { color += ubo.ss[0].a.xxxx; }
}
