#version 450

precision highp float;
precision highp int;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec3 polynomial;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec3 initial_xvalues;
};

float fx(float x) {
    return polynomial.x * pow(x, 2.0) + polynomial.y * x + polynomial.z;
}

void main() {
    float x2 = initial_xvalues.x;
    float x1 = initial_xvalues.y;
    float x0 = initial_xvalues.z;
    float temp = 0.0;
    float A = 0.0;
    float B = 0.0;
    float C = 0.0;
    while (abs(x2 - x1) >= .000000000000001) {
        float h0 = x0 - x2;
        float h1 = x1 - x2;
        float k0 = fx(x0) - fx(x2);
        float k1 = fx(x1) - fx(x2);
        temp = x2;
        A = (((h1) * (k0)) - ((h0) * (k1))) / ((pow((h0), 2.0) * (h1)) - (pow((h1), 2.0) * (h0)));
        B = (((k0) - (A * (pow((h0), 2.0)))) / (h0));
        C = fx(x2);
        x2 = x2 - ((2.0 * C) / (B + sign(B) * sqrt(pow(B, 2.0) - (4.0 * A * C))));
        x0 = x1;
        x1 = temp;
    }
    if (x2 <= -0.9 && x2 >= -1.1) {
        _GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
    } else {
        _GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
    }
}
