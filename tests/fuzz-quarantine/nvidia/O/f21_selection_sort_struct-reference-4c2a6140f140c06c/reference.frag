#version 450

precision highp float;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

struct Obj {
    float odd_numbers[10];
    float even_numbers[10];
};

void main() {
    Obj obj;
    int odd_index = 0;
    float odd_number = 1.0;
    while (odd_index <= 9) {
        obj.odd_numbers[odd_index] = odd_number;
        odd_number += 2.0;
        odd_index++;
    }
    int even_index = 9;
    float even_number = 0.0;
    while (even_index >= 0) {
        obj.even_numbers[even_index] = even_number;
        even_number += 2.;
        even_index--;
    }
    for (int i = 0; i < 9; i++) {
        int index = i;
        for (int j = i + 1; j < 10; j++) {
            if (obj.even_numbers[j] < obj.even_numbers[index]) {
                index = j;
            }
        }
        float smaller_number = obj.even_numbers[index];
        obj.even_numbers[index] = obj.even_numbers[i];
        obj.even_numbers[i] = smaller_number;
    }
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col = tan(pow(uv.xxx, uv.yyy) + vec3(obj.odd_numbers[int(floor(gl_FragCoord.x / 1000.0))], obj.even_numbers[int(floor(gl_FragCoord.y / 1000.0))], sinh(uv.x)));
    _GLF_color.rgb = col;
    _GLF_color.a = 1.0;
}
