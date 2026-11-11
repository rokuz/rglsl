#version 450
#include "common.h"

layout(location = 0) in vec3 tint;
layout(location = 0) out vec4 color;

void main()
{
    Light light = Light(tint, 2.0);
    color = vec4(lit(light) * BRIGHTNESS, 1.0);
}
