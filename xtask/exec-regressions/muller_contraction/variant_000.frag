#version 450

precision highp float;
precision highp int;

layout(set = 0, binding = 2) uniform buf2 {
    vec2 injectionSwitch;
};

vec4 GLF_dead8_GLF_color = (vec4(12.34, -3226.7545, -7.8, 4000.7940));

float GLF_dead8cross2d(vec2 GLF_dead8a, vec2 GLF_dead8b) {
    return ((GLF_dead8a.x) * (GLF_dead8b.y) - (GLF_dead8b.x) * (GLF_dead8a.y));
}

int GLF_dead8pointInTriangle(vec2 GLF_dead8p, vec2 GLF_dead8a, vec2 GLF_dead8b, vec2 GLF_dead8c) {
    float GLF_dead8pab = GLF_dead8cross2d(vec2(GLF_dead8p.x - GLF_dead8a.x, GLF_dead8p.y - GLF_dead8a.y), vec2(GLF_dead8b.x - GLF_dead8a.x, GLF_dead8b.y - GLF_dead8a.y));
    float GLF_dead8pbc = GLF_dead8cross2d(vec2(GLF_dead8p.x - GLF_dead8b.x, GLF_dead8p.y - GLF_dead8b.y), vec2(GLF_dead8c.x - GLF_dead8b.x, GLF_dead8c.y - GLF_dead8b.y));
    if (!((GLF_dead8pab < 0.0 && GLF_dead8pbc < 0.0) || (GLF_dead8pab >= 0.0 && GLF_dead8pbc >= 0.0))) {
        return 0;
    }
    float GLF_dead8pca = GLF_dead8cross2d(vec2(GLF_dead8p.x - GLF_dead8c.x, GLF_dead8p.y - GLF_dead8c.y), vec2(GLF_dead8a.x - GLF_dead8c.x, GLF_dead8a.y - GLF_dead8c.y));
    if (!((GLF_dead8pab < 0.0 && GLF_dead8pca < 0.0) || (GLF_dead8pab >= 0.0 && GLF_dead8pca >= 0.0))) {
        return 0;
    }
    return 1;
}

vec4 GLF_dead6_GLF_color = (vec4(-2934.5553, -3.0, 8.5, -3743.4895));

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_dead6injectionSwitch;
};

float GLF_dead6compute_derivative_x(float GLF_dead6v) {
    return dFdx(GLF_dead6v) * GLF_dead6injectionSwitch.y;
}

float GLF_dead6compute_derivative_y(float GLF_dead6v) {
    return dFdy(GLF_dead6v) * GLF_dead6injectionSwitch.y;
}

float GLF_dead6compute_stripe(float GLF_dead6v) {
    return smoothstep(-.9, 1., (GLF_dead6v) / ((GLF_dead6injectionSwitch.y > GLF_dead6injectionSwitch.x) ? GLF_dead6compute_derivative_x(GLF_dead6v) : GLF_dead6compute_derivative_y(GLF_dead6v)));
}

int GLF_dead3MATRIX_N = 4;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec3 polynomial;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec3 initial_xvalues;
};

float fx(float x) {
    do {
    } while (((injectionSwitch.x > injectionSwitch.y)));
    return polynomial.x * pow(x, 2.0) + polynomial.y * x + polynomial.z;
}

float _GLF_outlined_2(float x1) {
    if ((((injectionSwitch.x > injectionSwitch.y)))) {
        vec2 donor_replacementGLF_dead8pos = (injectionSwitch);
        if (GLF_dead8pointInTriangle(donor_replacementGLF_dead8pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
            GLF_dead8_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
        } else {
            GLF_dead8_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
        }
    }
    return x1;
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
        temp = (x2);
        A = (((h1) * (k0)) - ((h0) * (k1))) / ((pow((h0), 2.0) * (h1)) - (pow((h1), 2.0) * (h0)));
        B = ((((k0) - (A * (pow((h0), 2.0)))) / (h0)));
        for (int _injected_loop_counter = ((int((1.0)) << (int(0))) >> (int(0))); _injected_loop_counter > 0; _injected_loop_counter--) {
        }
        C = fx(x2);
        do {
            x2 = (x2 - ((2.0 * C) / (B + sign(B) * sqrt(pow(B, 2.0) - (4.0 * A * C)))));
        } while (((gl_FragCoord.y < 0.0)));
        x0 = _GLF_outlined_2(x1);
        x1 = temp;
    }
    if (x2 <= -0.9 && x2 >= -1.1) {
        _GLF_color = (vec4(1.0, 0.0, 0.0, 1.0));
    } else {
        if ((((gl_FragCoord.x < tan(0.0))))) {
            if ((((gl_FragCoord.x < 0.0)))) {
                _GLF_color = GLF_dead8_GLF_color;
            }
            int donor_replacementGLF_dead3i = (-90640);
            if ((((gl_FragCoord.x < 0.0)))) {
                vec3 donor_replacementGLF_dead6col = (clamp(initial_xvalues, C, x0));
                vec2 donor_replacementGLF_dead6uv = (tan(vec2(-2509.5047, 9.3)));
                {
                    float GLF_dead6stripe = GLF_dead6compute_stripe(cos((donor_replacementGLF_dead6uv.x + donor_replacementGLF_dead6uv.y) * 20.0));
                    donor_replacementGLF_dead6col = mix(vec3(donor_replacementGLF_dead6uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead6uv.x), GLF_dead6stripe);
                    GLF_dead6_GLF_color = vec4(donor_replacementGLF_dead6col, 1.0);
                    return;
                }
            }
            mat4 donor_replacementGLF_dead3matrix_a = ((true ? (x1 / mat4(70.75, 122.572, -7997.1566, -1.0, 3.3, 7.6, 346.422, -55.56, -6011.3748, 636.992, 6.6, -169.161, -5934.8201, -9.8, -8284.7547, -8.6)) : mat4(-966.789, 3.5, -49.08, 37.40, 6.1, 62.55, 6620.0948, -54.06, 7.6, 1.9, -2.4, 8332.7285, 94.10, 275.227, -4.5, 4.0)));
            vec4 donor_replacementGLF_dead3matrix_b = (vec4(-704.953, 82.21, -4.7, -3300.1119));
            for (int GLF_dead3j = (GLF_dead3MATRIX_N - 1); GLF_dead3j >= (donor_replacementGLF_dead3i + 1); GLF_dead3j--) {
                donor_replacementGLF_dead3matrix_b[clamp(donor_replacementGLF_dead3i, 0, 4 - 1)] -= (donor_replacementGLF_dead3matrix_a[clamp(donor_replacementGLF_dead3i, 0, 4 - 1)][clamp(GLF_dead3j, 0, 4 - 1)] * donor_replacementGLF_dead3matrix_b[clamp(GLF_dead3j, 0, 4 - 1)]);
            }
            donor_replacementGLF_dead3matrix_b[clamp(donor_replacementGLF_dead3i, 0, 4 - 1)] /= donor_replacementGLF_dead3matrix_a[clamp(donor_replacementGLF_dead3i, 0, 4 - 1)][clamp(donor_replacementGLF_dead3i, 0, 4 - 1)];
        }
        _GLF_color = (vec4(0.0, 1.0, 0.0, 1.0));
    }
}
