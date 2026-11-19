#version 450

precision highp float;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

vec2 pattern(in vec2 x) {
    vec2 n = floor(x);
    vec3 m = vec3(1.0);
    for (int j = -1; j <= int(injectionSwitch.y); j++) {
        for (int i = -1; i <= int(injectionSwitch.y); i++) {
            vec2 g = vec2(float(j), float(i));
            vec2 o = mix(n, g, 0.2);
            if (injectionSwitch.x < (m.x)) {
                int k = 1;
                while (k >= 0) {
                    o = o + o;
                    k--;
                }
                m = vec3(injectionSwitch.x, cos(o));
            }
        }
    }
    return vec2(m.x, m.y - m.z);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.y;
    float A[50];
    for (int i = 0; i < 200; i++) {
        if (i >= int(resolution.x)) {
            break;
        }
        if ((4 * (i / 4)) == i) {
            A[i / 4] = float(i);
        }
    }
    for (int i = 0; i < 50; i++) {
        if (i < int(gl_FragCoord.x)) {
            break;
        }
        if (i > 0) {
            A[i] += A[i - 1];
        }
    }
    vec2 c = pattern((15.0 + tan(0.2)) * uv);
    vec3 col;
    if (int(gl_FragCoord.y) < 20) {
        col = .5 + cos(c.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0));
    } else {
        if (int(gl_FragCoord.y) < 40) {
            col = .5 + cos(c.y + vec3(resolution.x, A[9] / resolution.x + 50.0, 22.0));
        } else {
            if (int(gl_FragCoord.y) < 60) {
                col = .5 + cos(c.y + vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0));
            } else {
                if (int(gl_FragCoord.y) < 80) {
                    col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                } else {
                    if (int(gl_FragCoord.y) < 100) {
                        col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                    } else {
                        if (int(gl_FragCoord.y) < 120) {
                            col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                        } else {
                            if (int(gl_FragCoord.y) < 140) {
                                col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                            } else {
                                if (int(gl_FragCoord.y) < 160) {
                                    col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                } else {
                                    if (int(gl_FragCoord.y) < 180) {
                                        col = .5 + cos(c.y + vec3(resolution.x, A[44] / resolution.x + 50.0, 22.0));
                                    } else {
                                        if (int(gl_FragCoord.y) < 200) {
                                            col = .5 + cos(c.y + vec3(resolution.x, A[49] / resolution.x + 50.0, 22.0));
                                        } else {
                                            discard;
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
    _GLF_color = vec4(col, 1.0);
}
