#version 450
struct Light {
    vec3 color;
    float power;
};

const float BRIGHTNESS = 0.75;

layout(location = 0) in vec3 tint;
layout(location = 0) out vec4 color;

vec3 lit(Light light)
{
    return light.color * light.power * BRIGHTNESS;
}

void main()
{
    Light light = Light(tint, 2.0);
    color = vec4(lit(light) * BRIGHTNESS, 1.0);
}
