#version 450

precision highp float;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

struct BinarySearchObject {
    int prime_numbers[10];
};

vec2 brick(vec2 uv) {
    int a = 4;
    do {
        uv.y -= step(injectionSwitch.y, uv.x);
        uv.x -= fract(tanh(uv.x)) / ldexp(injectionSwitch.y, findMSB(a));
        a--;
    } while (a > int(injectionSwitch.x));
    int b = 3;
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a);
        uv.x *= (isnan(uv.y) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x));
        b--;
    } while (b > int(injectionSwitch.x));
    int c = 2;
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b);
        uv.x += ldexp(injectionSwitch.y, isinf(uv.y + uv.x) ? findMSB(b) : findMSB(a));
        c--;
    } while (c > int(injectionSwitch.x));
    int d = 1;
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b) + float(c);
        d--;
    } while (d > int(injectionSwitch.x));
    return fract(uv);
}

float patternize(vec2 uv) {
    vec2 size = vec2(0.45);
    vec2 st = smoothstep(size, size, uv);
    switch (int(mod(gl_FragCoord.y, 5.0))) {
        case 0:
            return mix(pow(st.x, injectionSwitch.y), st.x, size.y);
            break;
        case 1:
            return mix(pow(uv.y, injectionSwitch.y), st.y, size.x);
            break;
        case 2:
            discard;
            break;
        case 3:
            return mix(pow(uv.y, injectionSwitch.y), uv.y, size.y);
            break;
        case 4:
            return mix(pow(st.y, injectionSwitch.y), st.x, size.x);
            break;
    }
}

int binarySearch(BinarySearchObject obj, int x) {
    int l = 0, r = 9;
    while (l <= r) {
        int m = (l + r) / 2;
        if (obj.prime_numbers[m] == x) {
            return m;
        }
        if (obj.prime_numbers[m] < x) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return -1;
}

void main() {
    BinarySearchObject obj;
    for (int i = 0; i < 10; i++) {
        if (i == 0) {
            obj.prime_numbers[i] = 2;
        } else {
            if (i == 1) {
                obj.prime_numbers[i] = 3;
            } else {
                if (i == 2) {
                    obj.prime_numbers[i] = 5;
                } else {
                    if (i == 3) {
                        obj.prime_numbers[i] = 7;
                    } else {
                        if (i == 4) {
                            obj.prime_numbers[i] = 11;
                        } else {
                            if (i == 5) {
                                obj.prime_numbers[i] = 13;
                            } else {
                                if (i == 6) {
                                    obj.prime_numbers[i] = 17;
                                } else {
                                    if (i == 7) {
                                        obj.prime_numbers[i] = 19;
                                    } else {
                                        if (i == 8) {
                                            obj.prime_numbers[i] = 23;
                                        } else {
                                            if (i == 9) {
                                                obj.prime_numbers[i] = 29;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    vec2 uv = (gl_FragCoord.xy / resolution.x) * vec2(resolution.x / resolution.y, 1.0);
    vec2 b = brick(uv * 7.0);
    vec3 color = vec3(patternize(b));
    if (gl_FragCoord.y < resolution.y / 1.1) {
        if (binarySearch(obj, obj.prime_numbers[4]) != -(int(resolution.y)) && binarySearch(obj, obj.prime_numbers[0]) >= -(int(resolution.x))) {
            color.yz -= dot(float(binarySearch(obj, obj.prime_numbers[4])), float(binarySearch(obj, obj.prime_numbers[0])));
        } else {
            discard;
        }
    } else {
        if (binarySearch(obj, 1) == -1) {
            discard;
        } else {
            color.yz += color.yz;
        }
    }
    _GLF_color = vec4(color, injectionSwitch.y);
}
