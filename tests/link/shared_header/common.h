#pragma once
struct Light {
    vec3 color;
    float power;
};

const float BRIGHTNESS = 0.75;

vec3 lit(Light light);
