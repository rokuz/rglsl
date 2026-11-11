#version 450
#extension GL_KHR_shader_subgroup_basic: enable
layout(vertices=1) out;
layout(set = 0, binding = 0, std430) buffer Output
{
  uvec4 result[];
};

void main (void)
{
  result[gl_PrimitiveID] = uvec4(gl_SubgroupSize, uint(gl_SubgroupInvocationID < gl_SubgroupSize), 0, 0);
  gl_TessLevelOuter[0] = 2.0;
  gl_TessLevelOuter[1] = 2.0;
  gl_TessLevelOuter[2] = 2.0;
  gl_TessLevelOuter[3] = 2.0;
  gl_TessLevelInner[0] = 2.0;
  gl_TessLevelInner[1] = 2.0;
}
