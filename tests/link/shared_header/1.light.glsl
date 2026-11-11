#version 450
#include "common.h"

vec3 lit(Light light)
{
    return light.color * light.power * BRIGHTNESS;
}
