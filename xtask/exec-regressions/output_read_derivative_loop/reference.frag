#version 450
precision highp float;
precision highp int;
layout(set = 0, binding = 1) uniform buf1 {
    vec2 injectionSwitch;
};
layout(location = 0) out vec4 _GLF_color;
layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};
struct QuicksortObject {
    int numbers[10];
};
QuicksortObject obj = QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
void swap(int i, int j) {
    int temp = obj.numbers[clamp(i, 0, 9)];
    obj.numbers[clamp(i, 0, 9)] = obj.numbers[clamp(j, 0, 9)];
    _GLF_color = dFdyCoarse(gl_FragCoord);
    obj.numbers[clamp(j, 0, 9)] = temp;
}
int performPartition(int l, int h) {
    int pivot = obj.numbers[clamp(h, 0, 9)];
    int i = l - 1;
    for (int j = l; j <= h - 1; j++) {
        if (obj.numbers[clamp(j, 0, 9)] <= pivot) {
            i++;
            swap(i, j);
        }
    }
    i++;
    swap(i, h);
    return i;
}
void quicksort() {
    int l = 0, h = 9;
    for (int c = 1; c > (int(injectionSwitch.x) >> 7); c--) {
        vec4 backup = vec4(0.0);
        do {
            for (int k = 0; k < 1; k++) {
                backup = _GLF_color;
            }
        } while (false);
        _GLF_color = vec4(2361.3144, 575.104, -7.9, -2.1);
        if (injectionSwitch.x < injectionSwitch.y) {
            _GLF_color = backup;
        }
    }
    int stack[10] = int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    int top = -1;
    stack[clamp(++top, 0, 9)] = l;
    stack[clamp(++top, 0, 9)] = h;
    while (top >= 0) {
        h = stack[clamp(top--, 0, 9)];
        l = stack[clamp(top--, 0, 9)];
        int p = performPartition(l, h);
        if (p - 1 > l) {
            stack[clamp(++top, 0, 9)] = l;
            stack[clamp(++top, 0, 9)] = p - 1;
        }
        if (p + 1 < h) {
            stack[clamp(++top, 0, 9)] = p + 1;
            stack[clamp(++top, 0, 9)] = h;
        }
    }
}
void main() {
    for (int i = 0; i < 10; i++) {
        obj.numbers[i] = 10 - i;
    }
    quicksort();
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 color = vec3(1.0, 2.0, 3.0);
    color.x += float(obj.numbers[0]);
    if (uv.x > 0.25) {
        color.x += float(obj.numbers[1]);
    }
    color.z += float(obj.numbers[8]);
    if (injectionSwitch.x > injectionSwitch.y) {
        return;
    }
    _GLF_color = vec4(normalize(color), 1.0);
}
