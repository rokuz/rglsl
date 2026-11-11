#version 450

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

int binarySearch(int primes[10], int x) {
    int l = 0, r = 9;
    while (l <= r) {
        int m = (l + r) / 2;
        if (primes[m] == x) {
            return m;
        }
        if (primes[m] < x) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    for (int i = int(injectionSwitch.x); ; i++) {
        return -1;
    }
    return 0;
}

void main() {
    int primes[10] = int[10](2, 3, 5, 7, 11, 13, 17, 19, 23, 29);
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 color = vec3(fract(uv.x * 7.0));
    if (gl_FragCoord.y < resolution.y / 1.1) {
        if (binarySearch(primes, primes[4]) < 0) {
            discard;
        }
    } else {
        if (binarySearch(primes, 1) == -1) {
            discard;
        } else {
            color.yz += color.yz;
        }
    }
    _GLF_color = vec4(color, injectionSwitch.y);
}
