#version 450

#ifndef REDUCER
#define _GLF_ZERO(X, Y)                   (Y)
#define _GLF_ONE(X, Y)                    (Y)
#define _GLF_FALSE(X, Y)                  (Y)
#define _GLF_TRUE(X, Y)                   (Y)
#define _GLF_IDENTITY(X, Y)               (Y)
#define _GLF_DEAD(X)                      (X)
#define _GLF_FUZZED(X)                    (X)
#define _GLF_WRAPPED_LOOP(X)              X
#define _GLF_WRAPPED_IF_TRUE(X)           X
#define _GLF_WRAPPED_IF_FALSE(X)          X
#define _GLF_SWITCH(X)                    X
#define _GLF_MAKE_IN_BOUNDS_INT(IDX, SZ)  clamp(IDX, 0, SZ - 1)
#define _GLF_MAKE_IN_BOUNDS_UINT(IDX, SZ) clamp(IDX, 0u, SZ - 1u)
#endif

// END OF GENERATED HEADER

precision highp float;

layout(set = 0, binding = 2) uniform buf2 {
    vec2 injectionSwitch;
};

vec4 GLF_dead14gl_FragCoord = _GLF_FUZZED((+(vec2(50.88, -8.2) * mat4x2(mat2(4.0, 53.89, -1454.2897, 4734.7196)))));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead14injectionSwitch;
};

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead14resolution;
};

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead13injectionSwitch;
};

struct GLF_dead13QuicksortObject {
    int numbers[10];
};

GLF_dead13QuicksortObject GLF_dead13obj = GLF_dead13QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead13swap(int GLF_dead13i, int GLF_dead13j) {
    int GLF_dead13temp = GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)];
    GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)] = GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 10)];
    GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 10)] = GLF_dead13temp;
}

vec3 GLF_dead13palette(vec3 GLF_dead13a, vec3 GLF_dead13b, vec3 GLF_dead13c, vec3 GLF_dead13d) {
    return fract(mix(GLF_dead13d * GLF_dead13a, GLF_dead13a * GLF_dead13c, GLF_dead13b + GLF_dead13d - GLF_dead13c));
}

vec4 GLF_dead12_GLF_color = _GLF_FUZZED(vec4(1225.1731, (-1400.0672), vec2(-69.73, -79.89)));

float GLF_dead12cross2d(vec2 GLF_dead12a, vec2 GLF_dead12b) {
    return ((GLF_dead12a.x) * (GLF_dead12b.y) - (GLF_dead12b.x) * (GLF_dead12a.y));
}

int GLF_dead12pointInTriangle(vec2 GLF_dead12p, vec2 GLF_dead12a, vec2 GLF_dead12b, vec2 GLF_dead12c) {
    float GLF_dead12pab = GLF_dead12cross2d(vec2(GLF_dead12p.x - GLF_dead12a.x, GLF_dead12p.y - GLF_dead12a.y), vec2(GLF_dead12b.x - GLF_dead12a.x, GLF_dead12b.y - GLF_dead12a.y));
    float GLF_dead12pbc = GLF_dead12cross2d(vec2(GLF_dead12p.x - GLF_dead12b.x, GLF_dead12p.y - GLF_dead12b.y), vec2(GLF_dead12c.x - GLF_dead12b.x, GLF_dead12c.y - GLF_dead12b.y));
    if (!((GLF_dead12pab < 0.0 && GLF_dead12pbc < 0.0) || (GLF_dead12pab >= 0.0 && GLF_dead12pbc >= 0.0))) {
        return 0;
    }
    float GLF_dead12pca = GLF_dead12cross2d(vec2(GLF_dead12p.x - GLF_dead12c.x, GLF_dead12p.y - GLF_dead12c.y), vec2(GLF_dead12a.x - GLF_dead12c.x, GLF_dead12a.y - GLF_dead12c.y));
    if (!((GLF_dead12pab < 0.0 && GLF_dead12pca < 0.0) || (GLF_dead12pab >= 0.0 && GLF_dead12pca >= 0.0))) {
        return 0;
    }
    return 1;
}

vec4 GLF_dead11_GLF_color = _GLF_FUZZED(vec4(561.510, -315.168, 3.4, 6937.3545));

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_dead11injectionSwitch;
};

float GLF_dead11compute_derivative_x(float GLF_dead11v) {
    return dFdx(GLF_dead11v) * GLF_dead11injectionSwitch.y;
}

float GLF_dead11compute_derivative_y(float GLF_dead11v) {
    return dFdy(GLF_dead11v) * GLF_dead11injectionSwitch.y;
}

float GLF_dead11compute_stripe(float GLF_dead11v, float GLF_dead11t) {
    return smoothstep(-.9, 1., (GLF_dead11v) / (20.0 * ((GLF_dead11injectionSwitch.y > GLF_dead11injectionSwitch.x) ? GLF_dead11compute_derivative_x(GLF_dead11t) : GLF_dead11compute_derivative_y(GLF_dead11t))));
}

vec4 GLF_dead9_GLF_color = _GLF_FUZZED(vec4(vec2(-430.537, 37.55), (vec2(32.07, -5.8))));

struct GLF_dead9BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead9BST GLF_dead9tree[10] = GLF_dead9BST[10](GLF_dead9BST(0, 0, 0), GLF_dead9BST(0, 0, 0), GLF_dead9BST(0, 0, 0), GLF_dead9BST(0, 0, 0), GLF_dead9BST(0, 0, 0), GLF_dead9BST(0, 0, 0), GLF_dead9BST(0, 0, 0), GLF_dead9BST(0, 0, 0), GLF_dead9BST(0, 0, 0), GLF_dead9BST(0, 0, 0));

void GLF_dead9makeTreeNode(inout GLF_dead9BST GLF_dead9tree, int GLF_dead9data) {
    GLF_dead9tree.data = GLF_dead9data;
    GLF_dead9tree.leftIndex = -1;
    GLF_dead9tree.rightIndex = -1;
}

int GLF_dead9search(int GLF_dead9target) {
    GLF_dead9BST GLF_dead9currentNode = GLF_dead9BST(0, 0, 0);
    int GLF_dead9index = 0;
    while (GLF_dead9index != -1) {
        GLF_dead9currentNode = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9index, 10)];
        if (GLF_dead9currentNode.data == GLF_dead9target) {
            return GLF_dead9target;
        }
        GLF_dead9index = GLF_dead9target > GLF_dead9currentNode.data ? GLF_dead9currentNode.rightIndex : GLF_dead9currentNode.leftIndex;
    }
    return -1;
}

layout(set = 0, binding = 7) uniform sampler2D GLF_dead10tex;
vec4 GLF_dead4gl_FragCoord = _GLF_FUZZED(vec4(2.4, 97.90, 9.7, -165.676));

layout(set = 0, binding = 8) uniform buf8 {
    vec2 GLF_dead4injectionSwitch;
};

layout(set = 0, binding = 9) uniform buf9 {
    vec2 GLF_dead4resolution;
};

const int GLF_dead4N = 10;
int GLF_dead4data[10] = int[10](_GLF_FUZZED(92661), _GLF_FUZZED((8943 - 22789)), _GLF_FUZZED((95670 + 16562)), _GLF_FUZZED(int(140010u)), _GLF_FUZZED((745 + 48231)), _GLF_FUZZED(-48613), _GLF_FUZZED(43315), _GLF_FUZZED(-8184), _GLF_FUZZED(-16456), _GLF_FUZZED((~ivec3(-88117, -35969, 5299).b))), GLF_dead4temp[10] = int[10](_GLF_FUZZED(-30632), _GLF_FUZZED((82392 | (-77997))), _GLF_FUZZED((+36124)), _GLF_FUZZED((-(-56810))), _GLF_FUZZED((~18426)), _GLF_FUZZED(-95957), _GLF_FUZZED((ivec4(21047, 40147, 69693, 19749).a)), _GLF_FUZZED((+3367)), _GLF_FUZZED(-9047), _GLF_FUZZED(-93562));

void GLF_dead4merge(int GLF_dead4from, int GLF_dead4mid, int GLF_dead4to) {
    int GLF_dead4k = GLF_dead4from, GLF_dead4i = GLF_dead4from, GLF_dead4j = GLF_dead4mid + 1;
    do {
        if (_GLF_DEAD(false)) {
            for (int GLF_dead9i = 0; GLF_dead9i < 20; GLF_dead9i++) {
                int GLF_dead9result = GLF_dead9search(GLF_dead9i);
                switch (GLF_dead9i) {
                    case 9:
                    case 5:
                    case 12:
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead11c1 = _GLF_FUZZED((transpose(mat4x3(4.7, 4970.0392, 14.34, 1.3, 6.4, 93.00, -95.12, 0.4, -9.4, -811.996, -5161.8456, 674.144)) == (mat3x4(-322.231, -4.2, -819.982, 0.3, -2165.0416, 6.8, 989.098, -0.7, 16.97, -2.8, -2035.5768, -99.91) / (mat4(6.8, 91.30, -5731.2696, 6793.2136, -5.2, 8.0, -9189.2404, -2.9, -69.94, 25.95, 3034.2123, 501.616, -927.506, 137.386, 1370.0393, -8.9) * mat3x4(-2.9, -86.66, 99.13, -4.8, -4.1, -20.49, 6147.8993, -290.259, 0.4, -8816.9926, 41.55, 80.37)))));
                            vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(6.5, -578.412, -0.2));
                            vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(roundEven(vec2(84.69, -47.89)));
                            if (donor_replacementGLF_dead11c1) {
                                float GLF_dead11stripe = GLF_dead11compute_stripe(cos((donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y) * 20.0), donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y);
                                donor_replacementGLF_dead11col = mix(vec3(donor_replacementGLF_dead11uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead11uv.x), GLF_dead11stripe);
                                GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                                return;
                            }
                        }
                    case 15:
                    case 7:
                    case 8:
                    case 2:
                    case 6:
                    case 17:
                    case 13:
                        if (GLF_dead9result == GLF_dead9i) {
                            GLF_dead4from++;
                        }
                        break;
                    default:
                        if (GLF_dead9result == -1) {
                            GLF_dead4from++;
                        }
                        break;
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead12pos = _GLF_FUZZED(((-37.26) * GLF_dead4injectionSwitch));
                    if (GLF_dead12pointInTriangle(donor_replacementGLF_dead12pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                        GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    } else {
                        GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                    }
                }
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
        } else {
            while (GLF_dead4i <= GLF_dead4mid && GLF_dead4j <= GLF_dead4to) {
                if (GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 10)] < GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j, 10)]) {
                    GLF_dead4temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4k++, 10)] = GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i++, 10)];
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(clamp(injectionSwitch, GLF_dead4injectionSwitch, min(injectionSwitch, injectionSwitch)));
                        float donor_replacementGLF_dead10h = _GLF_FUZZED(8824.2814);
                        float donor_replacementGLF_dead10refh = _GLF_FUZZED(mod(sign(-3425.6918), -9182.9390));
                        float donor_replacementGLF_dead10slope = _GLF_FUZZED(572.772);
                        vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(acos(injectionSwitch));
                        {
                            donor_replacementGLF_dead10coord -= donor_replacementGLF_dead10uvstep;
                            donor_replacementGLF_dead10refh += donor_replacementGLF_dead10slope;
                            donor_replacementGLF_dead10h = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                            GLF_dead4to++;
                        }
                    }
                } else {
                    GLF_dead4temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4k++, 10)] = GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j++, 10)];
                }
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    while (GLF_dead4i < GLF_dead4N && GLF_dead4i <= GLF_dead4mid) {
        GLF_dead4temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4k++, 10)] = GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i++, 10)];
    }
    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(injectionSwitch);
                float donor_replacementGLF_dead10h = _GLF_FUZZED(dFdyFine(-936.586));
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                }
                float donor_replacementGLF_dead10refh = _GLF_FUZZED(floor(round(cosh(408.935))));
                float donor_replacementGLF_dead10slope = _GLF_FUZZED(-9.3);
                vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(injectionSwitch);
                {
                    donor_replacementGLF_dead10coord -= donor_replacementGLF_dead10uvstep;
                    donor_replacementGLF_dead10refh += donor_replacementGLF_dead10slope;
                    donor_replacementGLF_dead10h = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                    GLF_dead4mid++;
                }
            }
            for (int GLF_dead4i = GLF_dead4from; GLF_dead4i <= GLF_dead4to; GLF_dead4i++) {
                GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 10)] = GLF_dead4temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 10)];
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    ;
                }
            }
        } else {
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(vec2(426.010, -891.316));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    while (GLF_dead4j >= 0) {
                        donor_replacementGLF_dead10coord = donor_replacementGLF_dead10coord + donor_replacementGLF_dead10coord;
                        GLF_dead4j--;
                    }
                }
                float donor_replacementGLF_dead10h = _GLF_FUZZED(-633.064);
                int donor_replacementGLF_dead10i = _GLF_FUZZED(GLF_dead4N);
                float donor_replacementGLF_dead10refh = _GLF_FUZZED(pow(25.75, trunc(-49.66)));
                float donor_replacementGLF_dead10slope = _GLF_FUZZED(2234.5517);
                vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(vec2(-3.3, 977.980));
                {
                    donor_replacementGLF_dead10coord -= donor_replacementGLF_dead10uvstep;
                    donor_replacementGLF_dead10refh += donor_replacementGLF_dead10slope;
                    donor_replacementGLF_dead10h = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                    donor_replacementGLF_dead10i++;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(vec3(-1.8, 647.567, -6.9));
                do {
                    donor_replacementGLF_dead13color -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead13injectionSwitch.x, 0.6, float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]) * 0.1));
                    GLF_dead4j++;
                } while (GLF_dead4j != GLF_dead13obj.numbers[2]);
            }
        }
    }
}

ivec2 GLF_dead3iter(ivec2 GLF_dead3p) {
    if (GLF_dead3p.x > 0) {
        GLF_dead3p.y--;
        if (_GLF_DEAD(false)) {
            {
                GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
            }
        }
    }
    if (GLF_dead3p.x < 0) {
        GLF_dead3p.y++;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
            vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(normalize(vec3(7.2, -5.4, -7.8)));
            vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(GLF_dead4resolution);
            {
                float GLF_dead11stripe = GLF_dead11compute_stripe(cos((donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y) * 20.0), donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y);
                donor_replacementGLF_dead11col = mix(vec3(donor_replacementGLF_dead11uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead11uv.x), GLF_dead11stripe);
                GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                ;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(GLF_dead4injectionSwitch);
                float donor_replacementGLF_dead10h = _GLF_FUZZED((+6.8));
                int donor_replacementGLF_dead10i = _GLF_FUZZED(abs(GLF_dead4N));
                float donor_replacementGLF_dead10refh = _GLF_FUZZED(331.177);
                float donor_replacementGLF_dead10slope = _GLF_FUZZED(-6.7);
                vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(sinh(GLF_dead4resolution));
                {
                    donor_replacementGLF_dead10coord -= donor_replacementGLF_dead10uvstep;
                    donor_replacementGLF_dead10refh += donor_replacementGLF_dead10slope;
                    donor_replacementGLF_dead10h = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                    donor_replacementGLF_dead10i++;
                }
            }
        } else {
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead11c1 = _GLF_FUZZED(lessThan(tanh(vec3(-352.708, -5222.9754, 68.34)), vec3(-40.34, -9704.0352, 959.883))[2]);
                bool donor_replacementGLF_dead11c2 = _GLF_FUZZED((1.6 > 2597.9942));
                bool donor_replacementGLF_dead11c3 = _GLF_FUZZED((mat2(6.0, -936.127, -21.01, -39.58) != mat2(40.17, 7066.2743, 77.89, 8.9)));
                vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(ceil(vec3(-403.958, -0.7, -5.5)));
                vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED((vec3(0.3, 8.4, -0.5) * mat2x3(36.46, -2891.0804, -92.99, -6112.4476, 14.94, -4.3)));
                if (!donor_replacementGLF_dead11c1 && !donor_replacementGLF_dead11c2 && donor_replacementGLF_dead11c3) {
                    float GLF_dead11stripe = GLF_dead11compute_stripe(cos((donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y) * 20.0), donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y);
                    donor_replacementGLF_dead11col = mix(vec3(.7, sinh(donor_replacementGLF_dead11uv.x), donor_replacementGLF_dead11uv.x), vec3(.3, .5, donor_replacementGLF_dead11uv.x), GLF_dead11stripe);
                    GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                    ;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead9count = _GLF_FUZZED(8203);
        int donor_replacementGLF_dead9i = _GLF_FUZZED(bitfieldExtract(GLF_dead4N, GLF_dead4N, bitfieldInsert(-70591, -93614, GLF_dead4N, GLF_dead4N)));
        int donor_replacementGLF_dead9result = _GLF_FUZZED(-62793);
        if (donor_replacementGLF_dead9result == donor_replacementGLF_dead9i) {
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(vec3(-75.23, 9.1, -5.2));
                do {
                    donor_replacementGLF_dead13color += GLF_dead13palette(vec3(0.5, float(GLF_dead13obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead13injectionSwitch.y)), vec3(float(GLF_dead13obj.numbers[4]) * 0.1, GLF_dead13injectionSwitch.x, 0.6));
                    donor_replacementGLF_dead9result++;
                } while (donor_replacementGLF_dead9result != GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]);
            }
            donor_replacementGLF_dead9count++;
        }
    }
    GLF_dead3p.x += GLF_dead3p.y / 2;
    do {
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead12pos = _GLF_FUZZED(acosh(injectionSwitch));
            if (GLF_dead12pointInTriangle(donor_replacementGLF_dead12pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            } else {
                GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
            }
        }
        return GLF_dead3p;
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
}

layout(set = 0, binding = 10) uniform sampler2D GLF_dead6tex;
const float GLF_dead6weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);

layout(set = 0, binding = 11) uniform buf11 {
    vec2 GLF_dead0injectionSwitch;
};

struct GLF_dead0QuicksortObject {
    int numbers[10];
};

GLF_dead0QuicksortObject GLF_dead0obj = GLF_dead0QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead0swap(int GLF_dead0i, int GLF_dead0j) {
    int GLF_dead0temp = GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 10)];
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(ivec2(45289, 13056));
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(step(GLF_dead4injectionSwitch, vec2(-218.234, -2945.3573)));
            float donor_replacementGLF_dead10h = _GLF_FUZZED(vec4(456.728, -860.280, -2.3, -606.238).y);
            float donor_replacementGLF_dead10refh = _GLF_FUZZED(-6.3);
            float donor_replacementGLF_dead10slope = _GLF_FUZZED(dot(atan(GLF_dead4gl_FragCoord), fract(vec4(-5624.0390, 791.869, 4978.3968, -44.98))));
            vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(ldexp(GLF_dead4resolution, ivec2(ivec3(24918, -87226, 2868))));
            while (donor_replacementGLF_dead10h < donor_replacementGLF_dead10refh && GLF_dead0i < 32) {
                donor_replacementGLF_dead10coord -= donor_replacementGLF_dead10uvstep;
                do {
                    donor_replacementGLF_dead10refh += donor_replacementGLF_dead10slope;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        vec3 donor_replacementGLF_dead11col = _GLF_FUZZED((uvec4(29573u, 63369u, 139334u, 63435u), (donor_replacementGLF_dead10h - vec3(8.6, 0.0, -0.6))));
                        {
                            float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead10coord.x + donor_replacementGLF_dead10coord.y) * 20.0), donor_replacementGLF_dead10coord.x + donor_replacementGLF_dead10coord.y);
                            donor_replacementGLF_dead11col = mix(vec3(donor_replacementGLF_dead10coord.x, .8, 0), vec3(1, donor_replacementGLF_dead10coord.y, 0), GLF_dead11stripe);
                            GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                            return;
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                donor_replacementGLF_dead10h = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                GLF_dead0i++;
            }
        }
        if (donor_replacementGLF_dead3p.x > 0) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                float donor_replacementGLF_dead12pab = _GLF_FUZZED(6.0);
                float donor_replacementGLF_dead12pca = _GLF_FUZZED((false ? 626.199 : (-5.9)));
                if (!((donor_replacementGLF_dead12pab < 0.0 && donor_replacementGLF_dead12pca < 0.0) || (donor_replacementGLF_dead12pab >= 0.0 && donor_replacementGLF_dead12pca >= 0.0))) {
                    ;
                }
            }
            donor_replacementGLF_dead3p.y--;
            if (_GLF_DEAD(false)) {
                {
                    GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                }
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(GLF_dead4injectionSwitch);
                float donor_replacementGLF_dead10h = _GLF_FUZZED(uintBitsToFloat(128484u));
                float donor_replacementGLF_dead10refh = _GLF_FUZZED(-8.0);
                float donor_replacementGLF_dead10slope = _GLF_FUZZED(6.6);
                vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(injectionSwitch);
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    donor_replacementGLF_dead10coord -= donor_replacementGLF_dead10uvstep;
                    donor_replacementGLF_dead10refh += donor_replacementGLF_dead10slope;
                    donor_replacementGLF_dead10h = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                    GLF_dead0i++;
                }
            }
        }
    }
    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), max(int(2), _GLF_IDENTITY(int(2), (int(2)) | (int(2)))))))); _injected_loop_counter--) {
        GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 10)] = GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0j, 10)];
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(GLF_dead0injectionSwitch);
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(49.64, 7.4, -1.0));
                {
                    float GLF_dead11stripe = GLF_dead11compute_stripe(cos((donor_replacementGLF_dead10coord.x + donor_replacementGLF_dead10coord.y) * 20.0), donor_replacementGLF_dead10coord.x + donor_replacementGLF_dead10coord.y);
                    donor_replacementGLF_dead11col = mix(vec3(.7, sinh(donor_replacementGLF_dead10coord.x), donor_replacementGLF_dead10coord.x), vec3(.3, .5, donor_replacementGLF_dead10coord.x), GLF_dead11stripe);
                    GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                    return;
                }
            }
            float donor_replacementGLF_dead10h = _GLF_FUZZED(exp2(min(-9.1, 39.21)));
            float donor_replacementGLF_dead10refh = _GLF_FUZZED(floor(cos(6.4)));
            float donor_replacementGLF_dead10slope = _GLF_FUZZED(87.65);
            vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(vec2(27.84, -4.1));
            {
                donor_replacementGLF_dead10coord -= donor_replacementGLF_dead10uvstep;
                donor_replacementGLF_dead10refh += donor_replacementGLF_dead10slope;
                donor_replacementGLF_dead10h = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                for (int _injected_loop_counter = _GLF_IDENTITY(0, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(-70613) : 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 ^ (0 | 1))); _injected_loop_counter++) {
                    GLF_dead0i++;
                }
            }
        }
    }
    GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0j, 10)] = GLF_dead0temp;
}

vec3 GLF_dead0palette(vec3 GLF_dead0a, vec3 GLF_dead0b, vec3 GLF_dead0c, vec3 GLF_dead0d) {
    return fract(mix(GLF_dead0d * GLF_dead0a, GLF_dead0a * GLF_dead0c, GLF_dead0b + GLF_dead0d - GLF_dead0c));
}

struct GLF_dead2QuicksortObject {
    int numbers[10];
};

GLF_dead2QuicksortObject GLF_dead2obj = GLF_dead2QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    float time;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

float h_r;
float s_g;
float b_b;

vec3 _GLF_outlined_5(float b_b, float s_g, float h_r) {
    return b_b * (1.0 - s_g) + (b_b - b_b * (1.0 - s_g)) * clamp(abs(abs(6.0 * (h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
}

float _GLF_outlined_6(vec3 temp) {
    return temp.y;
}

void doConvert() {
    vec3 temp;
    temp = _GLF_outlined_5(b_b, s_g, h_r);
    h_r = temp.x;
    s_g = _GLF_outlined_6(temp);
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-9.6, -2.8, 229.014, -621.273);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(GLF_dead0injectionSwitch);
        int donor_replacementGLF_dead10i = _GLF_FUZZED(GLF_dead4N);
        vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(dFdx(temp.br));
        {
            donor_replacementGLF_dead10coord -= donor_replacementGLF_dead10uvstep;
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                s_g += s_g;
            }
            s_g = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
            donor_replacementGLF_dead10i++;
        }
    }
    b_b = temp.z;
}

float _GLF_outlined_0() {
    return 1.0;
}

float _GLF_outlined_7(float time) {
    return (0.5 + (sin(time) * 0.5 + 0.5));
    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
        bool donor_replacementGLF_dead11c1 = _GLF_FUZZED((mat3(-4.4, 9.6, -59.62, -9.6, -48.87, 3.4, -3.8, -8.8, 2.6) == mat3(-5.5, 3.3, -1886.4970, 4.2, 32.15, -84.77, 8.3, -5.2, -9.3)));
        vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(fwidthFine(vec3(-38.41, -10.60, 784.083)));
        vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(GLF_dead4injectionSwitch);
        if (donor_replacementGLF_dead11c1) {
            float GLF_dead11stripe = GLF_dead11compute_stripe(cos((donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y) * 20.0), donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y);
            donor_replacementGLF_dead11col = mix(vec3(donor_replacementGLF_dead11uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead11uv.x), GLF_dead11stripe);
            GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
            ;
        }
    }
}

vec3 computeColor(float c, vec2 position) {
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        do {
            h_r = fract(c);
        } while (_GLF_WRAPPED_LOOP(false));
    } else {
    }
    for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(8), _GLF_IDENTITY(int(8), (int(8)) - 0))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 | ((1 << _GLF_IDENTITY(int(5), int(5))) >> _GLF_IDENTITY(int(5), int(5))))); _injected_loop_counter++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            {
                discard;
            }
        }
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            s_g = _GLF_outlined_0();
        }
    }
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                b_b = _GLF_outlined_7(time);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    do {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                    _GLF_color = (vec4(9.3, 2.1, 1.8, -3.8) / vec4(5.2, 75.12, 3.4, -33.87));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead13i = _GLF_FUZZED(int(false));
                            {
                                donor_replacementGLF_dead13i++;
                                GLF_dead13swap(donor_replacementGLF_dead13i, _injected_loop_counter);
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(min(vec3(1.8, -86.03, -8.0), c));
                        {
                            float GLF_dead11stripe = GLF_dead11compute_stripe(tan((position.x + position.y) * 20.0), position.x + position.y);
                            donor_replacementGLF_dead11col = mix(vec3(position.x, .8, 0), vec3(1, position.y, 0), GLF_dead11stripe);
                            GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                            ;
                        }
                    }
                }
            } else {
            }
        } else {
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, 1.0, 0.0, 0.0)))))) {
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(GLF_dead4injectionSwitch);
            float donor_replacementGLF_dead10h = _GLF_FUZZED(((-359.854) - round(s_g)));
            int donor_replacementGLF_dead10i = _GLF_FUZZED(int(false));
            float donor_replacementGLF_dead10slope = _GLF_FUZZED(ldexp(s_g, ivec4(-81477, 20178, -29181, -76017)[0]));
            vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED((mat3x2(-75.44, -2.9, 508.706, 62.04, -365.921, 10.20)[0] - time));
            {
                donor_replacementGLF_dead10coord -= donor_replacementGLF_dead10uvstep;
                s_g += donor_replacementGLF_dead10slope;
                donor_replacementGLF_dead10h = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                donor_replacementGLF_dead10i++;
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead4i = _GLF_FUZZED(mix((min(3310, 82617)), 62435, (time == dot(vec3(8.1, -8.0, 5.4), vec3(-1.0, 548.315, -23.39)))));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                do {
                    switch (donor_replacementGLF_dead4i) {
                        case 0:
                            GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = 4;
                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                {
                                    position -= position;
                                    b_b += c;
                                    h_r = texture(GLF_dead10tex, position).y;
                                    donor_replacementGLF_dead4i++;
                                }
                            }
                            break;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = roundEven(faceforward(vec4(-76.36, 311.461, 95.51, 68.26), vec4(8.0, 958.285, -2.9, 4.3), vec4(3905.9474, 5.6, 1.3, -3.2)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                    {
                                        GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                    }
                                }
                            }
                        case 1:
                            if (_GLF_DEAD(false)) {
                                {
                                    int GLF_dead9result = GLF_dead9search(donor_replacementGLF_dead4i);
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                        vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(radians(vec3(18.45, 350.129, -9575.6755)));
                                        {
                                            float GLF_dead11stripe = GLF_dead11compute_stripe(cos((position.x + position.y) * 20.0), position.x + position.y);
                                            donor_replacementGLF_dead11col = mix(vec3(.7, sinh(position.x), position.x), vec3(.3, .5, position.x), GLF_dead11stripe);
                                            GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                                            ;
                                        }
                                    }
                                    switch (donor_replacementGLF_dead4i) {
                                        case 9:
                                        case 5:
                                        case 12:
                                        case 15:
                                        case 7:
                                        case 8:
                                        case 2:
                                        case 6:
                                        case 17:
                                        case 13:
                                            if (GLF_dead9result == donor_replacementGLF_dead4i) {
                                                donor_replacementGLF_dead4i++;
                                            }
                                            break;
                                        default:
                                            if (GLF_dead9result == -1) {
                                                if (_GLF_DEAD(false)) {
                                                    vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(ceil(vec3(6637.9062, 3.4, -0.4)));
                                                    {
                                                        float GLF_dead11stripe = GLF_dead11compute_stripe(tan((position.x + position.y) * 20.0), position.x + position.y);
                                                        donor_replacementGLF_dead11col = mix(vec3(position.x, .8, 0), vec3(1, position.y, 0), GLF_dead11stripe);
                                                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                                                        ;
                                                    }
                                                }
                                                donor_replacementGLF_dead4i++;
                                            }
                                            break;
                                    }
                                }
                            }
                            GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = 3;
                            break;
                        case 2:
                            do {
                                GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = 2;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(7.1, -3.2, -866.242));
                                    {
                                        float GLF_dead11stripe = GLF_dead11compute_stripe(tan((position.x + position.y) * 20.0), position.x + position.y);
                                        donor_replacementGLF_dead11col = mix(vec3(0.5, position.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                                        ;
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            break;
                        case 3:
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(exp2(vec3(60.54, -3288.6505, 61.57)));
                                {
                                    donor_replacementGLF_dead13color += GLF_dead13palette(vec3(0.5, float(GLF_dead13obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead13injectionSwitch.y)), vec3(float(GLF_dead13obj.numbers[4]) * 0.1, GLF_dead13injectionSwitch.x, 0.6));
                                    donor_replacementGLF_dead4i++;
                                }
                            }
                            GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = 1;
                            break;
                        case 4:
                            GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = 0;
                            break;
                        case 5:
                            GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = -1;
                            if (_GLF_DEAD(false)) {
                                {
                                    ;
                                }
                            }
                            break;
                        case 6:
                            GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = -2;
                            break;
                            do {
                                if (_GLF_DEAD(false)) {
                                    {
                                        ;
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        case 7:
                            GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = -3;
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead10i = _GLF_FUZZED((donor_replacementGLF_dead4i & donor_replacementGLF_dead4i));
                                while (c < b_b && donor_replacementGLF_dead10i < 32) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(-8.8, 2860.4859, -652.397));
                                        {
                                            float GLF_dead11stripe = GLF_dead11compute_stripe(cos((position.x + position.y) * 20.0), position.x + position.y);
                                            donor_replacementGLF_dead11col = mix(vec3(.7, sinh(position.x), position.x), vec3(.3, .5, position.x), GLF_dead11stripe);
                                            GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                                            ;
                                        }
                                    }
                                    position -= position;
                                    b_b += h_r;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        do {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            _GLF_color = vec4(8.0, 3.1, -84.79, -42.49);
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            if (_GLF_DEAD(false)) {
                                                vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(-0.7, 3.0, -6200.1067));
                                                {
                                                    float GLF_dead11stripe = GLF_dead11compute_stripe(cos((position.x + position.y) * 20.0), position.x + position.y);
                                                    donor_replacementGLF_dead11col = mix(vec3(position.x, 0, 0.75), vec3(.8, .7, position.x), GLF_dead11stripe);
                                                    GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                                                    ;
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(exp2(vec3(-844.356, 2.1, 66.34)));
                                        {
                                            float GLF_dead11stripe = GLF_dead11compute_stripe(cos((position.x + position.y) * 20.0), position.x + position.y);
                                            donor_replacementGLF_dead11col = mix(vec3(position.x, 0, 0.75), vec3(.8, .7, position.x), GLF_dead11stripe);
                                            GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                                            ;
                                        }
                                    }
                                    c = texture(GLF_dead10tex, position).y;
                                    donor_replacementGLF_dead10i++;
                                }
                            }
                        case 8:
                            if (_GLF_DEAD(false)) {
                                for (int GLF_dead9i = 0; GLF_dead9i < 20; GLF_dead9i++) {
                                    int GLF_dead9result = GLF_dead9search(GLF_dead9i);
                                    switch (GLF_dead9i) {
                                        case 9:
                                        case 5:
                                        case 12:
                                        case 15:
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(-8.7, -9.1, -94.25));
                                                {
                                                    float GLF_dead11stripe = GLF_dead11compute_stripe(tan((position.x + position.y) * 20.0), position.x + position.y);
                                                    donor_replacementGLF_dead11col = mix(vec3(position.x, .8, 0), vec3(1, position.y, 0), GLF_dead11stripe);
                                                    GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                                                    ;
                                                }
                                            }
                                        case 7:
                                        case 8:
                                        case 2:
                                        case 6:
                                        case 17:
                                        case 13:
                                            if (GLF_dead9result == GLF_dead9i) {
                                                donor_replacementGLF_dead4i++;
                                            }
                                            break;
                                        default:
                                            if (GLF_dead9result == -1) {
                                                donor_replacementGLF_dead4i++;
                                            }
                                            break;
                                    }
                                }
                            }
                            GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = -4;
                            break;
                        case 9:
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                }
                            }
                            GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = -5;
                            break;
                    }
                    donor_replacementGLF_dead4i++;
                } while (donor_replacementGLF_dead4i < 10);
            } else {
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(vec3(-8.4, -830.087, -2.1));
                vec2 donor_replacementGLF_dead13uv = _GLF_FUZZED(GLF_dead4resolution);
                if (donor_replacementGLF_dead13uv.x > (1.0 / 4.0)) {
                    int GLF_dead13count = int(GLF_dead13injectionSwitch.x);
                    do {
                        donor_replacementGLF_dead13color += GLF_dead13palette(vec3(0.5, float(GLF_dead13obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead13injectionSwitch.y)), vec3(float(GLF_dead13obj.numbers[4]) * 0.1, GLF_dead13injectionSwitch.x, 0.6));
                        GLF_dead13count++;
                    } while (GLF_dead13count != GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]);
                    position = vec2(GLF_dead13count + GLF_dead13obj.numbers[8], GLF_dead13count + GLF_dead13obj.numbers[6]);
                }
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(GLF_dead4resolution);
                int donor_replacementGLF_dead10i = _GLF_FUZZED(-44740);
                {
                    donor_replacementGLF_dead10coord -= position;
                    h_r += s_g;
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            {
                                if (GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] <= donor_replacementGLF_dead10i) {
                                    donor_replacementGLF_dead10i++;
                                    GLF_dead13swap(donor_replacementGLF_dead10i, donor_replacementGLF_dead10i);
                                }
                            }
                        }
                        b_b = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                    } else {
                    }
                    donor_replacementGLF_dead10i++;
                }
            }
        } else {
        }
        if (_GLF_DEAD(false)) {
            if (GLF_dead12pointInTriangle(position, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            } else {
                GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            doConvert();
            {
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead14m = _GLF_FUZZED(vec3(855.697, 164.214, 79.86));
                    for (int GLF_dead14j = -1; GLF_dead14j <= int(GLF_dead14injectionSwitch.y); GLF_dead14j++) {
                        for (int GLF_dead14i = -1; GLF_dead14i <= int(GLF_dead14injectionSwitch.y); GLF_dead14i++) {
                            vec2 GLF_dead14g = vec2(float(GLF_dead14j), float(GLF_dead14i));
                            vec2 GLF_dead14o = mix(position, GLF_dead14g, 0.2);
                            if (GLF_dead14injectionSwitch.x < (donor_replacementGLF_dead14m.x)) {
                                int GLF_dead14k = 1;
                                while (GLF_dead14k >= 0) {
                                    GLF_dead14o = GLF_dead14o + GLF_dead14o;
                                    GLF_dead14k--;
                                }
                                donor_replacementGLF_dead14m = vec3(GLF_dead14injectionSwitch.x, cos(GLF_dead14o));
                            }
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    bool donor_replacementGLF_dead11c1 = _GLF_FUZZED(false);
                    bool donor_replacementGLF_dead11c2 = _GLF_FUZZED(false);
                    bool donor_replacementGLF_dead11c3 = _GLF_FUZZED(false);
                    vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(-717.331, 299.517, -1487.7483));
                    if (!donor_replacementGLF_dead11c1 && !donor_replacementGLF_dead11c2 && donor_replacementGLF_dead11c3) {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(cos((position.x + position.y) * 20.0), position.x + position.y);
                        donor_replacementGLF_dead11col = mix(vec3(.7, sinh(position.x), position.x), vec3(.3, .5, position.x), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                        ;
                    }
                }
                _GLF_color = trunc(vec4(-4124.2493, -3.6, 2551.1931, -9647.9926));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    }
                }
            }
        }
    }
    s_g *= 1.0 / position.y;
    h_r *= 1.0 / position.x;
    if (_GLF_DEAD(false)) {
        vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(-6.9, -95.63, -758.061));
        {
            float GLF_dead11stripe = GLF_dead11compute_stripe(cos((position.x + position.y) * 20.0), position.x + position.y);
            donor_replacementGLF_dead11col = mix(vec3(position.x, 0, 0.75), vec3(.8, .7, position.x), GLF_dead11stripe);
            GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
            ;
        }
    }
    if (abs(position.y - position.x) < 0.5) {
        if (_GLF_DEAD(false)) {
            vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(mod(vec3(3.6, 594.131, -2652.8182), fwidthFine(h_r)));
            int donor_replacementGLF_dead13count = _GLF_FUZZED(83992);
            do {
                donor_replacementGLF_dead13color += GLF_dead13palette(vec3(0.5, float(GLF_dead13obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead13injectionSwitch.y)), vec3(float(GLF_dead13obj.numbers[4]) * 0.1, GLF_dead13injectionSwitch.x, 0.6));
                donor_replacementGLF_dead13count++;
            } while (donor_replacementGLF_dead13count != GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]);
        }
        b_b = clamp(b_b * 3.0, 0.0, 1.0);
    }
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead10i = _GLF_FUZZED(ivec3(28952, -5036, 88747).p);
            while (h_r < s_g && donor_replacementGLF_dead10i < 32) {
                position -= position;
                s_g += s_g;
                h_r = texture(GLF_dead10tex, position).y;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    bool donor_replacementGLF_dead11c1 = _GLF_FUZZED((true));
                    bool donor_replacementGLF_dead11c2 = _GLF_FUZZED(isinf(h_r));
                    bool donor_replacementGLF_dead11c3 = _GLF_FUZZED((53195u <= 106317u));
                    bool donor_replacementGLF_dead11c4 = _GLF_FUZZED((mat2x3(mat2x4(5463.5455, -99.42, 2936.2578, 210.606, -6.2, -511.723, -3253.6071, 6106.0699)) != mat2x3(926.428, 589.401, -6.1, -891.971, -1779.1820, 15.74)));
                    vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(-433.772, 0.7, -284.606));
                    if (!donor_replacementGLF_dead11c1 && !donor_replacementGLF_dead11c2 && !donor_replacementGLF_dead11c3 && donor_replacementGLF_dead11c4) {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(tan((position.x + position.y) * 20.0), position.x + position.y);
                        donor_replacementGLF_dead11col = mix(vec3(position.x, .8, 0), vec3(1, position.y, 0), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                        ;
                    }
                }
                donor_replacementGLF_dead10i++;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead6i = _GLF_FUZZED(ivec3(-81370, -52935, -13331)[1]);
            int donor_replacementGLF_dead6j = _GLF_FUZZED(findMSB(75368u));
            vec4 donor_replacementGLF_dead6res = _GLF_FUZZED(_GLF_color);
            {
                donor_replacementGLF_dead6res += texture(GLF_dead6tex, position + vec2(float(donor_replacementGLF_dead6i - 1) * h_r, float(donor_replacementGLF_dead6j - 1) * h_r)) * GLF_dead6weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i * 3 + donor_replacementGLF_dead6j, 9)];
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = mod(vec4(-7356.4904, 94.80, -81.70, 8.3), 9.6);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead9baseIndex = _GLF_FUZZED(findMSB(43809u));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (GLF_dead12pointInTriangle(position, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                    GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } else {
                    GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                }
            }
            {
                donor_replacementGLF_dead9baseIndex = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9baseIndex, 10)].leftIndex;
                continue;
            }
        }
        return vec3(h_r, s_g, b_b);
    } while (_GLF_WRAPPED_LOOP(false));
    do {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead4i = _GLF_FUZZED(21878);
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(vec3(-0.8, 285.048, -33.13));
                {
                    donor_replacementGLF_dead13color += GLF_dead13palette(vec3(0.5, float(GLF_dead13obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead13injectionSwitch.y)), vec3(float(GLF_dead13obj.numbers[4]) * 0.1, GLF_dead13injectionSwitch.x, 0.6));
                    donor_replacementGLF_dead4i++;
                }
            }
            vec3 donor_replacementGLF_dead4vecCoor = _GLF_FUZZED(intBitsToFloat(ivec3(44569, -64387, -75454)));
            if (int(GLF_dead4gl_FragCoord[1]) < 30) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    position = fract(sin(donor_replacementGLF_dead4vecCoor.yx - trunc(float(GLF_dead4data[0]))));
                } else {
                }
                position[0] = dFdy(GLF_dead4gl_FragCoord.y);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (donor_replacementGLF_dead4i <= GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].data) {
                        if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].leftIndex == -1) {
                            GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].leftIndex = donor_replacementGLF_dead4i;
                            GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)], donor_replacementGLF_dead4i);
                            ;
                        } else {
                            donor_replacementGLF_dead4i = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].leftIndex;
                            ;
                        }
                    } else {
                        if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].rightIndex == -1) {
                            GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].rightIndex = donor_replacementGLF_dead4i;
                            GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)], donor_replacementGLF_dead4i);
                            ;
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                donor_replacementGLF_dead4i = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].rightIndex;
                            } else {
                            }
                            ;
                        }
                    }
                }
                ;
            } else if (int(GLF_dead4gl_FragCoord[1]) < 60) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    } else {
                    }
                    _GLF_color = log2(vec4(1024.9688, 6472.1944, 72.15, -800.928));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                position = fract(sin(donor_replacementGLF_dead4vecCoor.yx - trunc(float(GLF_dead4data[1]))));
                position[1] *= atan(faceforward(GLF_dead4injectionSwitch, position.xx, donor_replacementGLF_dead4vecCoor.yx).y);
                ;
            } else if (int(GLF_dead4gl_FragCoord[1]) < 90) {
                position = fract(sin(donor_replacementGLF_dead4vecCoor.yx - trunc(float(GLF_dead4data[2]))));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        for (int GLF_dead14i = -1; GLF_dead14i <= int(GLF_dead14injectionSwitch.y); GLF_dead14i++) {
                            vec2 GLF_dead14g = vec2(float(donor_replacementGLF_dead4i), float(GLF_dead14i));
                            vec2 GLF_dead14o = mix(position, GLF_dead14g, 0.2);
                            if (GLF_dead14injectionSwitch.x < (donor_replacementGLF_dead4vecCoor.x)) {
                                int GLF_dead14k = 1;
                                while (GLF_dead14k >= 0) {
                                    GLF_dead14o = GLF_dead14o + GLF_dead14o;
                                    GLF_dead14k--;
                                }
                                donor_replacementGLF_dead4vecCoor = vec3(GLF_dead14injectionSwitch.x, cos(GLF_dead14o));
                            }
                        }
                    }
                }
                position.x += atanh(position.x) * cosh(GLF_dead4injectionSwitch.y) * smoothstep(position, GLF_dead4injectionSwitch, GLF_dead4gl_FragCoord.yy).x;
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                    {
                        GLF_dead9_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(tanh(vec3(-163.700, -150.518, 2.6)));
                    {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(tan((position.x + position.y) * 20.0), position.x + position.y);
                        donor_replacementGLF_dead11col = mix(vec3(0.5, position.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                        ;
                    }
                }
            } else {
                do {
                    if (int(GLF_dead4gl_FragCoord[1]) < 120) {
                        position = fract(acosh(clamp(donor_replacementGLF_dead4vecCoor.yx - trunc(float(GLF_dead4data[3])), 1.0, 1000.0)));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))) && true))) {
                            position.x += (isnan(GLF_dead4gl_FragCoord.x) ? log2(GLF_dead4gl_FragCoord.x) : log2(GLF_dead4gl_FragCoord.y));
                        } else {
                        }
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead10h = _GLF_FUZZED(s_g);
                            {
                                position -= position;
                                h_r += s_g;
                                donor_replacementGLF_dead10h = texture(GLF_dead10tex, position).y;
                                donor_replacementGLF_dead4i++;
                            }
                        }
                        ;
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                if (donor_replacementGLF_dead4i <= GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].data) {
                                    if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].leftIndex == -1) {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        } else {
                                            GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].leftIndex = donor_replacementGLF_dead4i;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                            vec2 donor_replacementGLF_dead12pos = _GLF_FUZZED(injectionSwitch);
                                            if (GLF_dead12pointInTriangle(donor_replacementGLF_dead12pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                                                GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                            } else {
                                                GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                            }
                                        }
                                        GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)], donor_replacementGLF_dead4i);
                                        ;
                                    } else {
                                        donor_replacementGLF_dead4i = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].leftIndex;
                                        continue;
                                    }
                                } else {
                                    if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].rightIndex == -1) {
                                        GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].rightIndex = donor_replacementGLF_dead4i;
                                        GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)], donor_replacementGLF_dead4i);
                                        ;
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead14i = _GLF_FUZZED(donor_replacementGLF_dead4i);
                                            {
                                                vec2 GLF_dead14g = vec2(float(donor_replacementGLF_dead4i), float(donor_replacementGLF_dead14i));
                                                vec2 GLF_dead14o = mix(position, GLF_dead14g, 0.2);
                                                if (GLF_dead14injectionSwitch.x < (donor_replacementGLF_dead4vecCoor.x)) {
                                                    int GLF_dead14k = 1;
                                                    while (GLF_dead14k >= 0) {
                                                        GLF_dead14o = GLF_dead14o + GLF_dead14o;
                                                        GLF_dead14k--;
                                                    }
                                                    donor_replacementGLF_dead4vecCoor = vec3(GLF_dead14injectionSwitch.x, cos(GLF_dead14o));
                                                }
                                            }
                                        }
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            {
                                                if (GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] <= donor_replacementGLF_dead4i) {
                                                    donor_replacementGLF_dead4i++;
                                                    GLF_dead13swap(donor_replacementGLF_dead4i, donor_replacementGLF_dead4i);
                                                }
                                            }
                                        }
                                        donor_replacementGLF_dead4i = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].rightIndex;
                                        continue;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            vec3 donor_replacementGLF_dead13color = _GLF_FUZZED((mat2x3(-9.1, 46.13, -3312.2025, 42.35, -8831.8821, 84.00) / c)[1]);
                                            {
                                                donor_replacementGLF_dead13color -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead13injectionSwitch.x, 0.6, float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]) * 0.1));
                                                donor_replacementGLF_dead4i++;
                                            }
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = (10 - donor_replacementGLF_dead4i) * int(GLF_dead13injectionSwitch.y);
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (int(GLF_dead4gl_FragCoord[1]) < 150) {
                                if (_GLF_DEAD(false)) {
                                    if (!((h_r < 0.0 && h_r < 0.0) || (h_r >= 0.0 && h_r >= 0.0))) {
                                        ;
                                    }
                                }
                                discard;
                            } else if (int(GLF_dead4gl_FragCoord[1]) < 180) {
                                position = fract(sin(donor_replacementGLF_dead4vecCoor.yx - trunc(float(GLF_dead4data[4]))));
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead13count = _GLF_FUZZED(GLF_dead4N);
                                    {
                                        donor_replacementGLF_dead4vecCoor -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead13injectionSwitch.x, float(GLF_dead13obj.numbers[2]) * 0.1, float(GLF_dead13obj.numbers[8]) * 0.1));
                                        donor_replacementGLF_dead13count++;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (false) && true))) {
                                } else {
                                    position[1] += asinh(GLF_dead4gl_FragCoord.y * ldexp(position.y, -donor_replacementGLF_dead4i));
                                }
                                ;
                            } else {
                                do {
                                    if (int(GLF_dead4gl_FragCoord[1]) < 210) {
                                        position = fract(sin(donor_replacementGLF_dead4vecCoor.yx - trunc(float(GLF_dead4data[5]))));
                                        for (int _injected_loop_counter = (int(_GLF_ZERO(0.0, injectionSwitch.x)) >> _GLF_IDENTITY(int(5), int(5))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                            position.y -= tanh(position.x) / cosh(position.y);
                                        }
                                        ;
                                    } else if (int(GLF_dead4gl_FragCoord[1]) < 240) {
                                        if (_GLF_DEAD(false)) {
                                            vec3 donor_replacementGLF_dead13color = _GLF_FUZZED((donor_replacementGLF_dead4vecCoor * donor_replacementGLF_dead4vecCoor));
                                            {
                                                int GLF_dead13count = int(GLF_dead13injectionSwitch.x);
                                                do {
                                                    donor_replacementGLF_dead13color -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead13injectionSwitch.x, float(GLF_dead13obj.numbers[2]) * 0.1, float(GLF_dead13obj.numbers[8]) * 0.1));
                                                    GLF_dead13count++;
                                                } while (GLF_dead13count != GLF_dead13obj.numbers[1]);
                                                position += vec2(GLF_dead13count + int(GLF_dead13injectionSwitch.y), GLF_dead13count + int(GLF_dead13injectionSwitch.x));
                                            }
                                        }
                                        position = fract(asinh(donor_replacementGLF_dead4vecCoor.yx - trunc(float(GLF_dead4data[6]))));
                                        do {
                                            if (_GLF_DEAD(false)) {
                                                float donor_replacementGLF_dead10slope = _GLF_FUZZED(reflect(-670.821, s_g));
                                                while (b_b < h_r && donor_replacementGLF_dead4i < 32) {
                                                    position -= position;
                                                    h_r += donor_replacementGLF_dead10slope;
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    b_b = texture(GLF_dead10tex, position).y;
                                                    donor_replacementGLF_dead4i++;
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_DEAD(false)) {
                                            bool donor_replacementGLF_dead11c1 = _GLF_FUZZED(true);
                                            bool donor_replacementGLF_dead11c2 = _GLF_FUZZED(((s_g * mat4x3(-4.6, -232.739, -78.69, -683.563, -9.3, -684.179, -9207.2642, -885.444, -71.32, -4.3, -6.2, 0.5)) != matrixCompMult(mat4x3(-6613.4119, 3.0, -6510.9497, 198.420, 3.8, -58.66, -6.1, -1.4, -4373.8443, 243.372, -4253.9394, 6.5), mat4x3(29.80, 8142.9338, -837.502, 265.795, -1473.7474, -240.891, 2.1, 197.314, 58.86, 4127.1505, 1614.7385, -427.255))));
                                            vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(ldexp(radians(fwidthFine(resolution)), ivec2(-24126, -91339)));
                                            if (!donor_replacementGLF_dead11c1 && donor_replacementGLF_dead11c2) {
                                                float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y) * 20.0), donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y);
                                                donor_replacementGLF_dead4vecCoor = mix(vec3(0.5, donor_replacementGLF_dead11uv.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                                                GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead4vecCoor, 1.0);
                                                ;
                                            }
                                        }
                                        position.y -= isnan(float(donor_replacementGLF_dead4i)) ? tanh(GLF_dead4gl_FragCoord.x) : atanh(GLF_dead4gl_FragCoord.y / GLF_dead4resolution.y);
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            ;
                                        }
                                    } else if (int(GLF_dead4gl_FragCoord[1]) < 270) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            {
                                                position -= position;
                                                c += b_b;
                                                c = texture(GLF_dead10tex, position).y;
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                    {
                                                        GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                                    }
                                                }
                                                donor_replacementGLF_dead4i++;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (!((s_g < 0.0 && b_b < 0.0) || (s_g >= 0.0 && b_b >= 0.0))) {
                                                ;
                                            }
                                        }
                                        position = fract(sin(donor_replacementGLF_dead4vecCoor.yx - trunc(float(GLF_dead4data[7]))));
                                        position.y *= mix(normalize(donor_replacementGLF_dead4vecCoor), normalize(vec3(position, degrees(position.x))), GLF_dead4injectionSwitch.x).y;
                                        ;
                                    } else {
                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(bvec2(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false)))) && true))) {
                                            if (donor_replacementGLF_dead4i <= GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].data) {
                                                if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].leftIndex == -1) {
                                                    GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].leftIndex = donor_replacementGLF_dead4i;
                                                    GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)], donor_replacementGLF_dead4i);
                                                    ;
                                                } else {
                                                    donor_replacementGLF_dead4i = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].leftIndex;
                                                    continue;
                                                }
                                            } else {
                                                if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].rightIndex == -1) {
                                                    GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].rightIndex = donor_replacementGLF_dead4i;
                                                    GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)], donor_replacementGLF_dead4i);
                                                    ;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        {
                                                            GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                                        }
                                                    }
                                                } else {
                                                    donor_replacementGLF_dead4i = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].rightIndex;
                                                    continue;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    ;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            bool donor_replacementGLF_dead11c1 = _GLF_FUZZED(true);
                                            bool donor_replacementGLF_dead11c2 = _GLF_FUZZED(false);
                                            bool donor_replacementGLF_dead11c3 = _GLF_FUZZED(false);
                                            bool donor_replacementGLF_dead11c4 = _GLF_FUZZED(mix(false, (mat4x2(31.57, -7531.0700, 803.138, -3.5, -479.623, 29.38, -3.3, -17.67) != mat4x2(5327.9749, -3.9, 6984.2424, 3.9, 4730.8848, 219.294, -6.7, 1.8)), (false ^^ true)));
                                            vec3 donor_replacementGLF_dead11col = _GLF_FUZZED((mat2(72.12, 3379.0961, 73.78, 6.5), step(c, vec3(74.76, -7.8, -14.66))));
                                            if (!donor_replacementGLF_dead11c1 && !donor_replacementGLF_dead11c2 && !donor_replacementGLF_dead11c3 && donor_replacementGLF_dead11c4) {
                                                float GLF_dead11stripe = GLF_dead11compute_stripe(tan((position.x + position.y) * 20.0), position.x + position.y);
                                                donor_replacementGLF_dead11col = mix(vec3(position.x, .8, 0), vec3(1, position.y, 0), GLF_dead11stripe);
                                                GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                                                ;
                                            }
                                        }
                                        discard;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            {
                                                donor_replacementGLF_dead4vecCoor -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead13injectionSwitch.x, 0.6, float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]) * 0.1));
                                                donor_replacementGLF_dead4i++;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(tan(donor_replacementGLF_dead4vecCoor));
                                        {
                                            donor_replacementGLF_dead13color += GLF_dead13palette(vec3(0.5, float(GLF_dead13obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead13injectionSwitch.y)), vec3(float(GLF_dead13obj.numbers[4]) * 0.1, GLF_dead13injectionSwitch.x, 0.6));
                                            donor_replacementGLF_dead4i++;
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
}

vec3 defaultColor() {
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead0i = _GLF_FUZZED(70898);
            int donor_replacementGLF_dead0j = _GLF_FUZZED(max(-3649, -59726));
            int donor_replacementGLF_dead0pivot = _GLF_FUZZED((39390 & (-50452)));
            if (GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0j, 10)] <= donor_replacementGLF_dead0pivot) {
                donor_replacementGLF_dead0i++;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(vec2(-2.8, 848.060));
                    vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(GLF_dead0injectionSwitch);
                    if (_GLF_DEAD(false)) {
                        if (!((s_g < 0.0 && s_g < 0.0) || (s_g >= 0.0 && s_g >= 0.0))) {
                            ;
                        }
                    }
                    {
                        donor_replacementGLF_dead10coord -= donor_replacementGLF_dead10uvstep;
                        s_g += h_r;
                        b_b = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                        donor_replacementGLF_dead0i++;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                ;
                            }
                        }
                    }
                }
                GLF_dead0swap(donor_replacementGLF_dead0i, donor_replacementGLF_dead0j);
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead4color = _GLF_FUZZED(_GLF_color.pp);
        vec3 donor_replacementGLF_dead4vecCoor = _GLF_FUZZED(vec3(-7776.8635, -736.595, 46.66));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            donor_replacementGLF_dead4color = fract(sin(donor_replacementGLF_dead4vecCoor.yx - trunc(float(GLF_dead4data[5]))));
            donor_replacementGLF_dead4color.y -= tanh(donor_replacementGLF_dead4color.x) / cosh(donor_replacementGLF_dead4color.y);
            do {
                ;
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
        } else {
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead10i = _GLF_FUZZED(ivec3(-23177, -60616, 61439)[0]);
            float donor_replacementGLF_dead10slope = _GLF_FUZZED(b_b);
            vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(donor_replacementGLF_dead4color);
            while (s_g < b_b && donor_replacementGLF_dead10i < 32) {
                donor_replacementGLF_dead4color -= donor_replacementGLF_dead10uvstep;
                if (_GLF_DEAD(false)) {
                    if (donor_replacementGLF_dead4color.x > (3.0 / 4.0)) {
                        int GLF_dead13count = int(GLF_dead13injectionSwitch.x);
                        do {
                            donor_replacementGLF_dead4vecCoor -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead13injectionSwitch.x, 0.6, float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]) * 0.1));
                            GLF_dead13count++;
                        } while (GLF_dead13count != GLF_dead13obj.numbers[2]);
                        donor_replacementGLF_dead4color += vec2(GLF_dead13count + GLF_dead13obj.numbers[3], GLF_dead13count + GLF_dead13obj.numbers[3]);
                    }
                }
                b_b += donor_replacementGLF_dead10slope;
                s_g = texture(GLF_dead10tex, donor_replacementGLF_dead4color).y;
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    donor_replacementGLF_dead10i++;
                }
            }
        }
    }
    return vec3(0.0);
}

vec3 drawShape(vec2 pos, vec2 square, vec3 setting) {
    bool c1 = pos.x - setting.x < square.x;
    if (!c1) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead4i = _GLF_FUZZED((27578 & (-72883)));
                int donor_replacementGLF_dead4k = _GLF_FUZZED(-21491);
                int donor_replacementGLF_dead4mid = _GLF_FUZZED(-69632);
                if (_GLF_DEAD(false)) {
                    {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(cos((square.x + square.y) * 20.0), square.x + square.y);
                        setting = mix(vec3(.7, sinh(square.x), square.x), vec3(.3, .5, square.x), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(setting, 1.0);
                        ;
                    }
                }
                while (donor_replacementGLF_dead4i < GLF_dead4N && donor_replacementGLF_dead4i <= donor_replacementGLF_dead4mid) {
                    GLF_dead4temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4k++, 10)] = GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i++, 10)];
                }
            }
            _GLF_color = vec4(0.4, 3.9, 1.6, -6202.0275);
            if (_GLF_DEAD(false)) {
                if (GLF_dead12pointInTriangle(square, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                    GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } else {
                    GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    {
                        GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    }
                }
            }
        }
        return defaultColor();
    }
    bool c2 = pos.x + setting.x > square.x;
    if (!c2) {
        return defaultColor();
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            int donor_replacementGLF_dead4high = _GLF_FUZZED(71638);
            int donor_replacementGLF_dead4low = _GLF_FUZZED(bitfieldExtract(-83789, 5194, 51925));
            int donor_replacementGLF_dead4m = _GLF_FUZZED(((-11936) % 67529));
            {
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead9result = _GLF_FUZZED(donor_replacementGLF_dead4low);
                        if (donor_replacementGLF_dead9result == -1) {
                            donor_replacementGLF_dead4m++;
                        }
                    }
                }
                for (int GLF_dead4i = donor_replacementGLF_dead4low; GLF_dead4i < donor_replacementGLF_dead4high; GLF_dead4i += 2 * donor_replacementGLF_dead4m) {
                    if (_GLF_DEAD(false)) {
                        vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(459.089, -0.7, 296.405));
                        {
                            float GLF_dead11stripe = GLF_dead11compute_stripe(cos((pos.x + pos.y) * 20.0), pos.x + pos.y);
                            donor_replacementGLF_dead11col = mix(vec3(.7, sinh(pos.x), pos.x), vec3(.3, .5, pos.x), GLF_dead11stripe);
                            GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                            ;
                        }
                    }
                    int GLF_dead4from = GLF_dead4i;
                    int GLF_dead4mid = GLF_dead4i + donor_replacementGLF_dead4m - 1;
                    int GLF_dead4to = min(GLF_dead4i + 2 * donor_replacementGLF_dead4m - 1, donor_replacementGLF_dead4high);
                    GLF_dead4merge(GLF_dead4from, GLF_dead4mid, GLF_dead4to);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        }
                    }
                }
            }
        }
    }
    bool c3 = pos.y - setting.x < square.y;
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead13i = _GLF_FUZZED(-28369);
        int donor_replacementGLF_dead13j = _GLF_FUZZED((3299 * GLF_dead4N));
        {
            donor_replacementGLF_dead13i++;
            GLF_dead13swap(donor_replacementGLF_dead13i, donor_replacementGLF_dead13j);
        }
    }
    if (!c3) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead4i = _GLF_FUZZED(((-55137) + 59562));
            if (int(GLF_dead4gl_FragCoord[1]) < 30) {
                square = fract(sin(setting.yx - trunc(float(GLF_dead4data[0]))));
                square[0] = dFdy(GLF_dead4gl_FragCoord.y);
                ;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    }
                    _GLF_color = vec4(1617.3812, -5393.8524, -321.496, -67.55);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            } else if (int(GLF_dead4gl_FragCoord[1]) < 60) {
                square = fract(sin(setting.yx - trunc(float(GLF_dead4data[1]))));
                square[1] *= atan(faceforward(GLF_dead4injectionSwitch, square.xx, setting.yx).y);
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (GLF_dead12pointInTriangle(square, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                            GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        } else {
                            GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                        }
                    }
                }
                ;
            } else if (int(GLF_dead4gl_FragCoord[1]) < 90) {
                square = fract(sin(setting.yx - trunc(float(GLF_dead4data[2]))));
                square.x += atanh(square.x) * cosh(GLF_dead4injectionSwitch.y) * smoothstep(square, GLF_dead4injectionSwitch, GLF_dead4gl_FragCoord.yy).x;
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(cos((pos.x + pos.y) * 20.0), pos.x + pos.y);
                        setting = mix(vec3(.7, sinh(pos.x), pos.x), vec3(.3, .5, pos.x), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(setting, 1.0);
                        ;
                    }
                }
            } else if (int(GLF_dead4gl_FragCoord[1]) < 120) {
                square = fract(acosh(clamp(setting.yx - trunc(float(GLF_dead4data[3])), 1.0, 1000.0)));
                square.x += (isnan(GLF_dead4gl_FragCoord.x) ? log2(GLF_dead4gl_FragCoord.x) : log2(GLF_dead4gl_FragCoord.y));
                ;
            } else if (int(GLF_dead4gl_FragCoord[1]) < 150) {
                discard;
            } else if (int(GLF_dead4gl_FragCoord[1]) < 180) {
                if (_GLF_DEAD(false)) {
                    for (int GLF_dead14j = -1; GLF_dead14j <= int(GLF_dead14injectionSwitch.y); GLF_dead14j++) {
                        for (int GLF_dead14i = -1; GLF_dead14i <= int(GLF_dead14injectionSwitch.y); GLF_dead14i++) {
                            vec2 GLF_dead14g = vec2(float(GLF_dead14j), float(GLF_dead14i));
                            vec2 GLF_dead14o = mix(square, GLF_dead14g, 0.2);
                            if (GLF_dead14injectionSwitch.x < (setting.x)) {
                                int GLF_dead14k = 1;
                                while (GLF_dead14k >= 0) {
                                    GLF_dead14o = GLF_dead14o + GLF_dead14o;
                                    GLF_dead14k--;
                                }
                                setting = vec3(GLF_dead14injectionSwitch.x, cos(GLF_dead14o));
                            }
                        }
                    }
                }
                square = fract(sin(setting.yx - trunc(float(GLF_dead4data[4]))));
                square[1] += asinh(GLF_dead4gl_FragCoord.y * ldexp(square.y, -donor_replacementGLF_dead4i));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = (10 - donor_replacementGLF_dead4i) * int(GLF_dead13injectionSwitch.y);
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        donor_replacementGLF_dead4i = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].leftIndex;
                        ;
                    }
                }
                ;
            } else if (int(GLF_dead4gl_FragCoord[1]) < 210) {
                square = fract(sin(setting.yx - trunc(float(GLF_dead4data[5]))));
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead12pab = _GLF_FUZZED(b_b);
                    float donor_replacementGLF_dead12pbc = _GLF_FUZZED(ceil(fma(h_r, s_g, time)));
                    if (!((donor_replacementGLF_dead12pab < 0.0 && donor_replacementGLF_dead12pbc < 0.0) || (donor_replacementGLF_dead12pab >= 0.0 && donor_replacementGLF_dead12pbc >= 0.0))) {
                        ;
                    }
                }
                square.y -= tanh(square.x) / cosh(square.y);
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(GLF_dead4injectionSwitch);
                    {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(cos((donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y) * 20.0), donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y);
                        setting = mix(vec3(donor_replacementGLF_dead11uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead11uv.x), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(setting, 1.0);
                        ;
                    }
                }
                ;
            } else if (int(GLF_dead4gl_FragCoord[1]) < 240) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        {
                            float GLF_dead11stripe = GLF_dead11compute_stripe(tan((pos.x + pos.y) * 20.0), pos.x + pos.y);
                            setting = mix(vec3(pos.x, .8, 0), vec3(1, pos.y, 0), GLF_dead11stripe);
                            GLF_dead11_GLF_color = vec4(setting, 1.0);
                            ;
                        }
                    }
                    _GLF_color = dFdyFine(exp2(vec4(-1237.3789, -6462.0696, -5.3, -298.820).arra));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            if (!((b_b < 0.0 && h_r < 0.0) || (b_b >= 0.0 && h_r >= 0.0))) {
                                ;
                            }
                        }
                    }
                }
                square = fract(asinh(setting.yx - trunc(float(GLF_dead4data[6]))));
                square.y -= isnan(float(donor_replacementGLF_dead4i)) ? tanh(GLF_dead4gl_FragCoord.x) : atanh(GLF_dead4gl_FragCoord.y / GLF_dead4resolution.y);
                ;
                if (_GLF_DEAD(false)) {
                    {
                        for (int _injected_loop_counter = (1 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                            square -= square;
                        }
                        h_r += b_b;
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            h_r = texture(GLF_dead10tex, square).y;
                        }
                        donor_replacementGLF_dead4i++;
                    }
                }
            } else if (int(GLF_dead4gl_FragCoord[1]) < 270) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead10refh = _GLF_FUZZED(1.6);
                    {
                        pos -= pos;
                        donor_replacementGLF_dead10refh += h_r;
                        h_r = texture(GLF_dead10tex, pos).y;
                        donor_replacementGLF_dead4i++;
                    }
                }
                square = fract(sin(setting.yx - trunc(float(GLF_dead4data[7]))));
                if (_GLF_DEAD(false)) {
                    if (!((s_g < 0.0 && s_g < 0.0) || (s_g >= 0.0 && s_g >= 0.0))) {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    float donor_replacementGLF_dead10h = _GLF_FUZZED(b_b);
                    float donor_replacementGLF_dead10slope = _GLF_FUZZED(b_b);
                    while (donor_replacementGLF_dead10h < s_g && donor_replacementGLF_dead4i < 32) {
                        square -= square;
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            s_g += donor_replacementGLF_dead10slope;
                        }
                        donor_replacementGLF_dead10h = texture(GLF_dead10tex, square).y;
                        donor_replacementGLF_dead4i++;
                    }
                }
                square.y *= mix(normalize(setting), normalize(vec3(square, degrees(square.x))), GLF_dead4injectionSwitch.x).y;
                ;
            } else {
                discard;
            }
        }
        return defaultColor();
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead9baseIndex = _GLF_FUZZED(GLF_dead4N);
        int donor_replacementGLF_dead9data = _GLF_FUZZED(int(true));
        int donor_replacementGLF_dead9treeIndex = _GLF_FUZZED(ivec4(71983, -84825, 99294, 90034).brg[2]);
        if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9baseIndex, 10)].leftIndex == -1) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9baseIndex, 10)].leftIndex = donor_replacementGLF_dead9treeIndex;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                float donor_replacementGLF_dead12pbc = _GLF_FUZZED(h_r);
                if (!((b_b < 0.0 && donor_replacementGLF_dead12pbc < 0.0) || (b_b >= 0.0 && donor_replacementGLF_dead12pbc >= 0.0))) {
                    ;
                }
            }
            GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9treeIndex, 10)], donor_replacementGLF_dead9data);
            ;
        } else {
            donor_replacementGLF_dead9baseIndex = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9baseIndex, 10)].leftIndex;
            ;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (c1) {
            float GLF_dead11stripe = GLF_dead11compute_stripe(cos((pos.x + pos.y) * 20.0), pos.x + pos.y);
            setting = mix(vec3(pos.x, 0, 0.75), vec3(.8, .7, pos.x), GLF_dead11stripe);
            GLF_dead11_GLF_color = vec4(setting, 1.0);
            ;
        }
    }
    bool c4 = pos.y + setting.x > square.y;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (GLF_dead12pointInTriangle(pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
            GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
        } else {
            GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
        }
    }
    if (_GLF_DEAD(false)) {
        ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(((-32412) - (ivec2(-63921, 87999) >> 78155)));
        {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                donor_replacementGLF_dead3p = GLF_dead3iter(donor_replacementGLF_dead3p);
            }
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(_GLF_IDENTITY(false, (false) && true), false, false, true))))) {
            int donor_replacementGLF_dead13h = _GLF_FUZZED(15699);
            int donor_replacementGLF_dead13i = _GLF_FUZZED(64518);
            int donor_replacementGLF_dead13l = _GLF_FUZZED(GLF_dead4N);
            int donor_replacementGLF_dead13pivot = _GLF_FUZZED(bitfieldExtract(GLF_dead4N, GLF_dead4N, -39159));
            for (int GLF_dead13j = donor_replacementGLF_dead13l; GLF_dead13j <= donor_replacementGLF_dead13h - 1; GLF_dead13j++) {
                if (GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 10)] <= donor_replacementGLF_dead13pivot) {
                    donor_replacementGLF_dead13i++;
                    GLF_dead13swap(donor_replacementGLF_dead13i, GLF_dead13j);
                }
            }
        }
    }
    if (!c4) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead9target = _GLF_FUZZED(GLF_dead4N);
            {
                ;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead9baseIndex = _GLF_FUZZED(ivec3(-61161, -64524, -72021).z);
                int donor_replacementGLF_dead9data = _GLF_FUZZED(-8884);
                int donor_replacementGLF_dead9treeIndex = _GLF_FUZZED(67888);
                {
                    if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9baseIndex, 10)].leftIndex == -1) {
                        GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9baseIndex, 10)].leftIndex = donor_replacementGLF_dead9treeIndex;
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(-890.263, -977.391, -1.0));
                            if (!c2 && !c4 && c1) {
                                float GLF_dead11stripe = GLF_dead11compute_stripe(cos((square.x + square.y) * 20.0), square.x + square.y);
                                donor_replacementGLF_dead11col = mix(vec3(.7, sinh(square.x), square.x), vec3(.3, .5, square.x), GLF_dead11stripe);
                                GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                                ;
                            }
                        }
                        GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9treeIndex, 10)], donor_replacementGLF_dead9data);
                        ;
                    } else {
                        donor_replacementGLF_dead9baseIndex = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9baseIndex, 10)].leftIndex;
                        ;
                    }
                }
            }
            if (int(GLF_dead4gl_FragCoord[1]) < 270) {
                square = fract(sin(setting.yx - trunc(float(GLF_dead4data[7]))));
                do {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead10i = _GLF_FUZZED(findLSB(12575u));
                        float donor_replacementGLF_dead10refh = _GLF_FUZZED(time);
                        float donor_replacementGLF_dead10slope = _GLF_FUZZED((s_g / time));
                        if (_GLF_DEAD(false)) {
                            if (!c3 && c3) {
                                float GLF_dead11stripe = GLF_dead11compute_stripe(tan((square.x + square.y) * 20.0), square.x + square.y);
                                setting = mix(vec3(0.5, square.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                                GLF_dead11_GLF_color = vec4(setting, 1.0);
                                ;
                            }
                        }
                        while (s_g < donor_replacementGLF_dead10refh && donor_replacementGLF_dead10i < 32) {
                            square -= pos;
                            donor_replacementGLF_dead10refh += donor_replacementGLF_dead10slope;
                            s_g = texture(GLF_dead10tex, square).y;
                            donor_replacementGLF_dead10i++;
                        }
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        if (GLF_dead12pointInTriangle(pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                            GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        } else {
                            GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                square.y *= mix(normalize(setting), normalize(vec3(square, degrees(square.x))), GLF_dead4injectionSwitch.x).y;
                ;
            } else {
                discard;
            }
        }
        return defaultColor();
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                if (!((s_g < 0.0 && s_g < 0.0) || (s_g >= 0.0 && s_g >= 0.0))) {
                    ;
                }
            }
            if (square.y > (3.0 / 4.0)) {
                setting.z += float(GLF_dead2obj.numbers[7]);
            }
        }
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
        vec2 donor_replacementGLF_dead2uv = _GLF_FUZZED(square);
        if (donor_replacementGLF_dead2uv.y > (2.0 / 4.0)) {
            if (_GLF_DEAD(false)) {
                {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY((0 | 0), ((0 | 0)) >> 0)); _injected_loop_counter--) {
                        discard;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (!((s_g < 0.0 && s_g < 0.0) || (s_g >= 0.0 && s_g >= 0.0))) {
                                ;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    for (int GLF_dead14j = -1; GLF_dead14j <= int(GLF_dead14injectionSwitch.y); GLF_dead14j++) {
                        for (int GLF_dead14i = -1; GLF_dead14i <= int(GLF_dead14injectionSwitch.y); GLF_dead14i++) {
                            vec2 GLF_dead14g = vec2(float(GLF_dead14j), float(GLF_dead14i));
                            vec2 GLF_dead14o = mix(donor_replacementGLF_dead2uv, GLF_dead14g, 0.2);
                            if (GLF_dead14injectionSwitch.x < (setting.x)) {
                                int GLF_dead14k = 1;
                                while (GLF_dead14k >= 0) {
                                    GLF_dead14o = GLF_dead14o + GLF_dead14o;
                                    GLF_dead14k--;
                                }
                                setting = vec3(GLF_dead14injectionSwitch.x, cos(GLF_dead14o));
                            }
                        }
                    }
                }
            }
            setting.y += float(GLF_dead2obj.numbers[6]);
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead4i = _GLF_FUZZED(ivec2(65250, 2271).r);
            if (int(GLF_dead4gl_FragCoord[1]) < 90) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(vec2(-40.83, -11.30));
                    {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y) * 20.0), donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y);
                        setting = mix(vec3(donor_replacementGLF_dead11uv.x, .8, 0), vec3(1, donor_replacementGLF_dead11uv.y, 0), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(setting, 1.0);
                        ;
                    }
                }
                square = fract(sin(setting.yx - trunc(float(GLF_dead4data[2]))));
                square.x += atanh(square.x) * cosh(GLF_dead4injectionSwitch.y) * smoothstep(square, GLF_dead4injectionSwitch, GLF_dead4gl_FragCoord.yy).x;
                ;
            } else if (int(GLF_dead4gl_FragCoord[1]) < 120) {
                square = fract(acosh(clamp(setting.yx - trunc(float(GLF_dead4data[3])), 1.0, 1000.0)));
                square.x += (isnan(GLF_dead4gl_FragCoord.x) ? log2(GLF_dead4gl_FragCoord.x) : log2(GLF_dead4gl_FragCoord.y));
                ;
            } else {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (int(GLF_dead4gl_FragCoord[1]) < 150) {
                        discard;
                    } else if (int(GLF_dead4gl_FragCoord[1]) < 180) {
                        square = fract(sin(setting.yx - trunc(float(GLF_dead4data[4]))));
                        square[1] += asinh(GLF_dead4gl_FragCoord.y * ldexp(square.y, -donor_replacementGLF_dead4i));
                        ;
                    } else if (int(GLF_dead4gl_FragCoord[1]) < 210) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (!((b_b < 0.0 && b_b < 0.0) || (b_b >= 0.0 && b_b >= 0.0))) {
                                ;
                            }
                        }
                        square = fract(sin(setting.yx - trunc(float(GLF_dead4data[5]))));
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            square.y -= tanh(square.x) / cosh(square.y);
                        }
                        ;
                    } else if (int(GLF_dead4gl_FragCoord[1]) < 240) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            square = fract(asinh(setting.yx - trunc(float(GLF_dead4data[6]))));
                        }
                        square.y -= isnan(float(donor_replacementGLF_dead4i)) ? tanh(GLF_dead4gl_FragCoord.x) : atanh(GLF_dead4gl_FragCoord.y / GLF_dead4resolution.y);
                        ;
                    } else {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (int(GLF_dead4gl_FragCoord[1]) < 270) {
                                square = fract(sin(setting.yx - trunc(float(GLF_dead4data[7]))));
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(GLF_dead4resolution);
                                        float donor_replacementGLF_dead10slope = _GLF_FUZZED(fwidth(h_r));
                                        while (h_r < s_g && donor_replacementGLF_dead4i < 32) {
                                            donor_replacementGLF_dead10coord -= square;
                                            s_g += donor_replacementGLF_dead10slope;
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = (10 - donor_replacementGLF_dead4i) * int(GLF_dead13injectionSwitch.y);
                                                }
                                            }
                                            h_r = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                                            donor_replacementGLF_dead4i++;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                                float donor_replacementGLF_dead12pab = _GLF_FUZZED(degrees(tan(time)));
                                                if (!((donor_replacementGLF_dead12pab < 0.0 && b_b < 0.0) || (donor_replacementGLF_dead12pab >= 0.0 && b_b >= 0.0))) {
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(setting);
                                        vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(vec2(80.22, -7.3));
                                        if (c2) {
                                            float GLF_dead11stripe = GLF_dead11compute_stripe(cos((donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y) * 20.0), donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y);
                                            donor_replacementGLF_dead11col = mix(vec3(donor_replacementGLF_dead11uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead11uv.x), GLF_dead11stripe);
                                            GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                                            ;
                                        }
                                    }
                                    square.y *= mix(normalize(setting), normalize(vec3(square, degrees(square.x))), GLF_dead4injectionSwitch.x).y;
                                }
                                ;
                            } else {
                                discard;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0)), dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0))))))) {
                                if (pos.x > (1.0 / 4.0)) {
                                    int GLF_dead13count = int(GLF_dead13injectionSwitch.x);
                                    do {
                                        setting += GLF_dead13palette(vec3(0.5, float(GLF_dead13obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead13injectionSwitch.y)), vec3(float(GLF_dead13obj.numbers[4]) * 0.1, GLF_dead13injectionSwitch.x, 0.6));
                                        GLF_dead13count++;
                                    } while (GLF_dead13count != GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]);
                                    donor_replacementGLF_dead2uv = vec2(GLF_dead13count + GLF_dead13obj.numbers[8], GLF_dead13count + GLF_dead13obj.numbers[6]);
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (donor_replacementGLF_dead4i >= int(GLF_dead14resolution.x)) {
                            ;
                        }
                    }
                } else {
                }
            }
        }
    }
    bool c5 = pos.x - (setting.x - setting.y) < square.x;
    if (!c5) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead4i = _GLF_FUZZED(findMSB(uint(c3)));
            {
                GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = GLF_dead4temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)];
            }
        }
        do {
            return computeColor(setting.z / 40.0, pos);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    bool c6 = pos.x + (setting.x - setting.y) > square.x;
    if (!c6) {
        return computeColor(setting.z / 40.0, pos);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(vec2(-2.5, -2.1));
            int donor_replacementGLF_dead10i = _GLF_FUZZED(-72354);
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                while (b_b < s_g && donor_replacementGLF_dead10i < 32) {
                    donor_replacementGLF_dead10coord -= pos;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] = (10 - donor_replacementGLF_dead10i) * int(GLF_dead13injectionSwitch.y);
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(3.9, -63.21, -1670.8515, 0.2).bggb;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    s_g += h_r;
                    b_b = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                    donor_replacementGLF_dead10i++;
                }
            }
        }
    }
    bool c7 = pos.y - (setting.x - setting.y) < square.y;
    if (!c7) {
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), (int(5)) / 1)))); _injected_loop_counter--) {
            return computeColor(setting.z / 40.0, pos);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            float donor_replacementGLF_dead10h = _GLF_FUZZED((h_r - h_r));
            int donor_replacementGLF_dead10i = _GLF_FUZZED(-81427);
            float donor_replacementGLF_dead10slope = _GLF_FUZZED(determinant(mat3(mat2(-6.3, 4.4, 6343.7190, -74.85))));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                while (donor_replacementGLF_dead10h < s_g && donor_replacementGLF_dead10i < 32) {
                    square -= pos;
                    s_g += donor_replacementGLF_dead10slope;
                    donor_replacementGLF_dead10h = texture(GLF_dead10tex, square).y;
                    donor_replacementGLF_dead10i++;
                    if (_GLF_DEAD(false)) {
                        do {
                            setting -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead13injectionSwitch.x, float(GLF_dead13obj.numbers[2]) * 0.1, float(GLF_dead13obj.numbers[8]) * 0.1));
                            donor_replacementGLF_dead10i++;
                        } while (donor_replacementGLF_dead10i != GLF_dead13obj.numbers[1]);
                    }
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        if (GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] <= donor_replacementGLF_dead10i) {
                            donor_replacementGLF_dead10i++;
                            GLF_dead13swap(donor_replacementGLF_dead10i, donor_replacementGLF_dead10i);
                        }
                    }
                }
            }
        }
    }
    for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(5), int(5))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead0i = _GLF_FUZZED(-50767);
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & ((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2))))); _injected_loop_counter++) {
                GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 10)] = (10 - donor_replacementGLF_dead0i) * int(GLF_dead0injectionSwitch.y);
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead10slope = _GLF_FUZZED(time);
                if (_GLF_DEAD(false)) {
                    if (!((h_r < 0.0 && b_b < 0.0) || (h_r >= 0.0 && b_b >= 0.0))) {
                        ;
                    }
                }
                {
                    pos -= square;
                    b_b += donor_replacementGLF_dead10slope;
                    b_b = texture(GLF_dead10tex, pos).y;
                    donor_replacementGLF_dead0i++;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                {
                    GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                }
            }
        }
    }
    bool c8 = pos.y + (setting.x - setting.y) > square.y;
    if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, bool(bvec2(false, true)))) && true))) {
        int donor_replacementGLF_dead3i = _GLF_FUZZED(-93678);
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            {
                ;
                if (_GLF_DEAD(false)) {
                    if (GLF_dead12pointInTriangle(square, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                        GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    } else {
                        GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                    }
                }
            }
        }
        ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(ivec2(-52755, -40713));
        for (donor_replacementGLF_dead3i = 0; donor_replacementGLF_dead3i < 100; donor_replacementGLF_dead3i++) {
            donor_replacementGLF_dead3p = GLF_dead3iter(donor_replacementGLF_dead3p);
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-533.181, vec2(51.31, -7.2), asin(tanh(-8.5)));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (GLF_dead12pointInTriangle(square, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                                GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            } else {
                                GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead13l = _GLF_FUZZED(donor_replacementGLF_dead3i);
                        for (int GLF_dead13j = donor_replacementGLF_dead13l; GLF_dead13j <= donor_replacementGLF_dead3i - 1; GLF_dead13j++) {
                            if (GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 10)] <= donor_replacementGLF_dead3i) {
                                donor_replacementGLF_dead3i++;
                                GLF_dead13swap(donor_replacementGLF_dead3i, GLF_dead13j);
                            }
                        }
                    }
                }
                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                        pos -= square;
                    }
                    h_r += s_g;
                    s_g = texture(GLF_dead10tex, pos).y;
                    do {
                        donor_replacementGLF_dead3i++;
                    } while (_GLF_WRAPPED_LOOP(false));
                }
            }
        }
    }
    if (!c8) {
        return computeColor(setting.z / 40.0, pos);
        for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            vec4 _GLF_outVarBackup_GLF_color;
            do {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead4i = _GLF_FUZZED(((-18799) % clamp(-11384, -46601, int(56529u))));
                    int donor_replacementGLF_dead4k = _GLF_FUZZED(sign(-1030));
                    {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead12pab = _GLF_FUZZED(dot(vec3(-5863.6584, 377.067, 54.76), vec3(-7.6, -63.48, 5.6)));
                            if (!((donor_replacementGLF_dead12pab < 0.0 && b_b < 0.0) || (donor_replacementGLF_dead12pab >= 0.0 && b_b >= 0.0))) {
                                ;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead9treeIndex = _GLF_FUZZED(donor_replacementGLF_dead4i);
                            if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 10)].rightIndex == -1) {
                                GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 10)].rightIndex = donor_replacementGLF_dead9treeIndex;
                                GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9treeIndex, 10)], donor_replacementGLF_dead4k);
                                ;
                            } else {
                                _injected_loop_counter = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 10)].rightIndex;
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                }
                            }
                        }
                        GLF_dead4temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4k++, 10)] = GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i++, 10)];
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                int donor_replacementGLF_dead6i = _GLF_FUZZED(-45121);
                for (int _injected_loop_counter = (((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))) & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                        int donor_replacementGLF_dead14i = _GLF_FUZZED(GLF_dead4N);
                        if (donor_replacementGLF_dead14i < int(GLF_dead14gl_FragCoord.x)) {
                            break;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        for (int GLF_dead6j = 0; GLF_dead6j < 3; GLF_dead6j++) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                _GLF_color += texture(GLF_dead6tex, pos + vec2(float(donor_replacementGLF_dead6i - 1) * h_r, float(GLF_dead6j - 1) * h_r)) * GLF_dead6weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i * 3 + GLF_dead6j, 9)];
                            }
                        }
                    } else {
                    }
                }
            }
            _GLF_color = vec4(-0.8, -71.38, 950.852, 1.9);
            if (_GLF_DEAD(false)) {
                do {
                    setting -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead13injectionSwitch.x, 0.6, float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]) * 0.1));
                    _injected_loop_counter++;
                } while (_injected_loop_counter != GLF_dead13obj.numbers[2]);
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead9count = _GLF_FUZZED(_injected_loop_counter);
                    if (donor_replacementGLF_dead9count == 20) {
                        GLF_dead9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    } else {
                        if (_GLF_DEAD(false)) {
                            if (_injected_loop_counter < int(GLF_dead14gl_FragCoord.x)) {
                                break;
                            }
                        }
                        GLF_dead9_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    for (int GLF_dead9i = 0; GLF_dead9i < 20; GLF_dead9i++) {
                        int GLF_dead9result = GLF_dead9search(GLF_dead9i);
                        switch (GLF_dead9i) {
                            case 9:
                            case 5:
                            case 12:
                            case 15:
                            case 7:
                                if (_GLF_DEAD(false)) {
                                    bool donor_replacementGLF_dead11c2 = _GLF_FUZZED((bvec4(false, false, false, false) != bvec4(false, true, true, true)));
                                    vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(-162.653, -9.0, 8164.1232));
                                    if (!c7 && donor_replacementGLF_dead11c2) {
                                        float GLF_dead11stripe = GLF_dead11compute_stripe(tan((square.x + square.y) * 20.0), square.x + square.y);
                                        donor_replacementGLF_dead11col = mix(vec3(0.5, square.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                                        ;
                                    }
                                }
                            case 8:
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (!((s_g < 0.0 && b_b < 0.0) || (s_g >= 0.0 && b_b >= 0.0))) {
                                        ;
                                    }
                                }
                            case 2:
                            case 6:
                            case 17:
                            case 13:
                                if (GLF_dead9result == GLF_dead9i) {
                                    _injected_loop_counter++;
                                }
                                break;
                            default:
                                if (GLF_dead9result == -1) {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            int GLF_dead14k = 1;
                                            while (GLF_dead14k >= 0) {
                                                pos = pos + pos;
                                                GLF_dead14k--;
                                            }
                                            setting = vec3(GLF_dead14injectionSwitch.x, cos(pos));
                                        }
                                    }
                                    _injected_loop_counter++;
                                }
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead12pos = _GLF_FUZZED(injectionSwitch);
                                    if (GLF_dead12pointInTriangle(donor_replacementGLF_dead12pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                                        GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                    } else {
                                        GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                    }
                                }
                                break;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead11c1 = _GLF_FUZZED((uvec4(32024u, 19944u, 18501u, 7027u) != uvec4(46322u, 91009u, 53874u, 148504u)));
                    vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(floor(setting));
                    if (donor_replacementGLF_dead11c1) {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(cos((square.x + square.y) * 20.0), square.x + square.y);
                        donor_replacementGLF_dead11col = mix(vec3(square.x, 0, 0.75), vec3(.8, .7, square.x), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                        ;
                    }
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    if (GLF_dead12pointInTriangle(square, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                        GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    } else {
                        GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    {
                        setting -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead13injectionSwitch.x, 0.6, float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]) * 0.1));
                        _injected_loop_counter++;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-69.10, 3.4, 44.09, -4704.4508);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED(vec2(-413.383, 51.28));
            for (int GLF_dead6i = 0; GLF_dead6i < 3; GLF_dead6i++) {
                for (int GLF_dead6j = 0; GLF_dead6j < 3; GLF_dead6j++) {
                    _GLF_color += texture(GLF_dead6tex, donor_replacementGLF_dead6coord + vec2(float(GLF_dead6i - 1) * s_g, float(GLF_dead6j - 1) * s_g)) * GLF_dead6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i * 3 + GLF_dead6j, 9)];
                }
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead9baseIndex = _GLF_FUZZED(GLF_dead4N);
                int donor_replacementGLF_dead9data = _GLF_FUZZED(int(77940u));
                int donor_replacementGLF_dead9treeIndex = _GLF_FUZZED(((-52954) ^ (-9793)));
                if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9baseIndex, 10)].rightIndex == -1) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (c5) {
                                float GLF_dead11stripe = GLF_dead11compute_stripe(cos((pos.x + pos.y) * 20.0), pos.x + pos.y);
                                setting = mix(vec3(pos.x, 0, 0.75), vec3(.8, .7, pos.x), GLF_dead11stripe);
                                GLF_dead11_GLF_color = vec4(setting, 1.0);
                                ;
                            }
                        }
                        GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9baseIndex, 10)].rightIndex = donor_replacementGLF_dead9treeIndex;
                    } else {
                    }
                    GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9treeIndex, 10)], donor_replacementGLF_dead9data);
                    ;
                } else {
                    donor_replacementGLF_dead9baseIndex = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9baseIndex, 10)].rightIndex;
                    ;
                    if (_GLF_DEAD(false)) {
                        do {
                            setting += GLF_dead13palette(vec3(0.5, float(GLF_dead13obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead13injectionSwitch.y)), vec3(float(GLF_dead13obj.numbers[4]) * 0.1, GLF_dead13injectionSwitch.x, 0.6));
                            donor_replacementGLF_dead9baseIndex++;
                        } while (donor_replacementGLF_dead9baseIndex != GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]);
                    }
                }
            }
        }
    }
    return defaultColor();
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        int donor_replacementGLF_dead10i = _GLF_FUZZED(-73762);
        float donor_replacementGLF_dead10refh = _GLF_FUZZED(s_g);
        vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(GLF_dead0injectionSwitch);
        {
            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                square -= donor_replacementGLF_dead10uvstep;
            }
            donor_replacementGLF_dead10refh += b_b;
            h_r = texture(GLF_dead10tex, square).y;
            donor_replacementGLF_dead10i++;
        }
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (!((b_b < 0.0 && s_g < 0.0) || (b_b >= 0.0 && s_g >= 0.0))) {
                ;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = vec4(-0.0, -0.3, 34.40, -488.184);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead10i = _GLF_FUZZED(int(c8));
                float donor_replacementGLF_dead10slope = _GLF_FUZZED(b_b);
                while (s_g < b_b && donor_replacementGLF_dead10i < 32) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        {
                            float GLF_dead11stripe = GLF_dead11compute_stripe(cos((pos.x + pos.y) * 20.0), pos.x + pos.y);
                            setting = mix(vec3(pos.x, 0, 0.75), vec3(.8, .7, pos.x), GLF_dead11stripe);
                            GLF_dead11_GLF_color = vec4(setting, 1.0);
                            ;
                        }
                    }
                    square -= pos;
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                    } else {
                        if (_GLF_DEAD(false)) {
                            {
                                int GLF_dead14k = 1;
                                while (GLF_dead14k >= 0) {
                                    square = square + square;
                                    GLF_dead14k--;
                                }
                                setting = vec3(GLF_dead14injectionSwitch.x, cos(square));
                            }
                        }
                        b_b += donor_replacementGLF_dead10slope;
                    }
                    s_g = texture(GLF_dead10tex, square).y;
                    donor_replacementGLF_dead10i++;
                }
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED((ivec2(23418, -351) * (ivec2(55221, -68525) + (4944 % (-99055)))));
                {
                    donor_replacementGLF_dead3p.y++;
                }
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead4i = _GLF_FUZZED(int(136849u));
                int donor_replacementGLF_dead4k = _GLF_FUZZED(61748);
                int donor_replacementGLF_dead4mid = _GLF_FUZZED(-17365);
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(setting);
                    {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(tan((square.x + square.y) * 20.0), square.x + square.y);
                        donor_replacementGLF_dead11col = mix(vec3(square.x, .8, 0), vec3(1, square.y, 0), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                        ;
                    }
                }
                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    while (donor_replacementGLF_dead4i < GLF_dead4N && donor_replacementGLF_dead4i <= donor_replacementGLF_dead4mid) {
                        do {
                            GLF_dead4temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4k++, 10)] = GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i++, 10)];
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    ;
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead11c1 = _GLF_FUZZED((mat4x2(3.5, -65.14, 5.6, 959.560, -856.865, 4620.9872, -421.564, -0.5) != mat4x2(2.0, -519.254, 2.4, -9.1, -4.9, -8.4, 0.5, 3643.5966)));
                            if (donor_replacementGLF_dead11c1) {
                                float GLF_dead11stripe = GLF_dead11compute_stripe(cos((square.x + square.y) * 20.0), square.x + square.y);
                                setting = mix(vec3(square.x, 0, 0.75), vec3(.8, .7, square.x), GLF_dead11stripe);
                                GLF_dead11_GLF_color = vec4(setting, 1.0);
                                ;
                            }
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead10i = _GLF_FUZZED(GLF_dead4N);
            vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(GLF_dead0injectionSwitch);
            {
                pos -= donor_replacementGLF_dead10uvstep;
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    s_g += s_g;
                }
                h_r = texture(GLF_dead10tex, pos).y;
                donor_replacementGLF_dead10i++;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(_GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)))))))) {
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(sqrt(setting));
                if (c6) {
                    float GLF_dead11stripe = GLF_dead11compute_stripe(cos((square.x + square.y) * 20.0), square.x + square.y);
                    donor_replacementGLF_dead11col = mix(vec3(square.x, 0, 0.75), vec3(.8, .7, square.x), GLF_dead11stripe);
                    GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                    ;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead11c1 = _GLF_FUZZED(c5);
                    bool donor_replacementGLF_dead11c3 = _GLF_FUZZED((c2 ? (ivec3(-50676, 88097, -92076) == ivec3(-90405, 24113, -87440)) : c1));
                    bool donor_replacementGLF_dead11c4 = _GLF_FUZZED(c4);
                    if (!donor_replacementGLF_dead11c1 && !c1 && !donor_replacementGLF_dead11c3 && donor_replacementGLF_dead11c4) {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(tan((pos.x + pos.y) * 20.0), pos.x + pos.y);
                        setting = mix(vec3(pos.x, .8, 0), vec3(1, pos.y, 0), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(setting, 1.0);
                        ;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    _GLF_color = (vec2(476.556, 2.1).rggr);
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int donor_replacementGLF_dead10i = _GLF_FUZZED((GLF_dead4N << 28900));
            float donor_replacementGLF_dead10refh = _GLF_FUZZED(intBitsToFloat(88678));
            while (h_r < donor_replacementGLF_dead10refh && donor_replacementGLF_dead10i < 32) {
                square -= square;
                donor_replacementGLF_dead10refh += b_b;
                h_r = texture(GLF_dead10tex, square).y;
                donor_replacementGLF_dead10i++;
            }
        }
        ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(ivec2(85768, 59425));
        {
            donor_replacementGLF_dead3p.y--;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(_GLF_ZERO(0.0, injectionSwitch.x), 1.0, 0.0, 1.0, 0.0, determinant(mat4(0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)), 1.0, 1.0, 0.0, sqrt(0.0), 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))))) {
        {
            ;
        }
    }
}

vec4 _GLF_outlined_1(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_2() {
    return round(unpackUnorm4x8(109502u));
}

vec3 _GLF_outlined_3(vec3 d) {
    return vec3(d);
}

vec2 _GLF_outlined_9(vec2 resolution) {
    if (_GLF_DEAD(false)) {
        vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(fract(vec3(699.836, 6133.7743, -3976.5239)));
        {
            float GLF_dead11stripe = GLF_dead11compute_stripe(tan((resolution.x + resolution.y) * 20.0), resolution.x + resolution.y);
            donor_replacementGLF_dead11col = mix(vec3(resolution.x, .8, 0), vec3(1, resolution.y, 0), GLF_dead11stripe);
            GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
            ;
        }
    }
    return resolution.xy / min(resolution.x, resolution.y);
}

vec4 _GLF_outlined_10() {
    do {
        return vec4(0.0, 0.0, 1.0, 1.0);
    } while (_GLF_WRAPPED_LOOP(false));
}

vec3 computePoint(mat2 rotationMatrix) {
    vec2 aspect;
    aspect = _GLF_outlined_9(resolution);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED(injectionSwitch);
        int donor_replacementGLF_dead6i = _GLF_FUZZED(abs(-99916));
        for (int GLF_dead6j = 0; GLF_dead6j < 3; GLF_dead6j++) {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                _GLF_color += texture(GLF_dead6tex, donor_replacementGLF_dead6coord + vec2(float(donor_replacementGLF_dead6i - 1) * b_b, float(GLF_dead6j - 1) * b_b)) * GLF_dead6weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i * 3 + GLF_dead6j, 9)];
            }
        }
    }
    vec2 position;
    if (_GLF_DEAD(false)) {
        vec3 donor_replacementGLF_dead2color = _GLF_FUZZED(vec3(-995.510, -7.2, 930.581));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(resolution);
            int donor_replacementGLF_dead10i = _GLF_FUZZED(GLF_dead4N);
            while (s_g < h_r && donor_replacementGLF_dead10i < 32) {
                donor_replacementGLF_dead10coord -= position;
                h_r += s_g;
                s_g = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    float donor_replacementGLF_dead12pbc = _GLF_FUZZED(-315.644);
                    if (!((b_b < 0.0 && donor_replacementGLF_dead12pbc < 0.0) || (b_b >= 0.0 && donor_replacementGLF_dead12pbc >= 0.0))) {
                        ;
                    }
                }
                donor_replacementGLF_dead10i++;
                if (_GLF_DEAD(false)) {
                    {
                        GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                    }
                }
            }
        }
        if (aspect.x > (1.0 / 4.0)) {
            donor_replacementGLF_dead2color.x += float(GLF_dead2obj.numbers[1]);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead13i = _GLF_FUZZED(ivec4(92041, -31689, 61052, 5635).q);
            {
                GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13i, 10)] = (10 - donor_replacementGLF_dead13i) * int(GLF_dead13injectionSwitch.y);
            }
        }
    }
    position = (gl_FragCoord.xy / resolution.xy) * aspect;
    vec2 center;
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > ((0 << _GLF_IDENTITY(int(3), int(3))) << _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter--) {
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(ivec2(-87103, -31869));
            {
                donor_replacementGLF_dead3p.y--;
            }
        }
        center = vec2(0.5) * aspect;
        if (_GLF_DEAD(false)) {
            {
                continue;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    } else {
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            }
                        }
                    }
                    _GLF_color = vec4(435.027, -6103.3621, -5.3, -8.9);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 10)] = (10 - _injected_loop_counter) * int(GLF_dead13injectionSwitch.y);
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(vec3(5.5, 181.484, 1.9));
        int donor_replacementGLF_dead13count = _GLF_FUZZED(GLF_dead4N);
        {
            donor_replacementGLF_dead13color += GLF_dead13palette(vec3(0.5, float(GLF_dead13obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead13injectionSwitch.y)), vec3(float(GLF_dead13obj.numbers[4]) * 0.1, GLF_dead13injectionSwitch.x, 0.6));
            donor_replacementGLF_dead13count++;
        }
    }
    do {
        position *= rotationMatrix;
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(ivec2(-42292, -51951));
        {
            donor_replacementGLF_dead3p.x -= 16;
        }
    }
    center *= rotationMatrix;
    vec3 result = vec3(0.0);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(false)) {
            vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(result);
            {
                int GLF_dead13count = int(GLF_dead13injectionSwitch.x);
                do {
                    donor_replacementGLF_dead13color -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead13injectionSwitch.x, 0.6, float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]) * 0.1));
                    GLF_dead13count++;
                } while (GLF_dead13count != GLF_dead13obj.numbers[2]);
                position += vec2(GLF_dead13count + GLF_dead13obj.numbers[3], GLF_dead13count + GLF_dead13obj.numbers[3]);
            }
        }
        int donor_replacementGLF_dead10i = _GLF_FUZZED(GLF_dead4N);
        float donor_replacementGLF_dead10refh = _GLF_FUZZED(refract(time, time, h_r));
        vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED((vec4(-1159.3293, 2.0, -7858.9200, -0.6) * mat2x4(6.5, 61.53, -2.1, 4.8, 909.520, 4.0, 7.3, 0.3)));
        while (h_r < donor_replacementGLF_dead10refh && donor_replacementGLF_dead10i < 32) {
            center -= donor_replacementGLF_dead10uvstep;
            donor_replacementGLF_dead10refh += h_r;
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED((GLF_dead4resolution * center));
                {
                    float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y) * 20.0), donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y);
                    result = mix(vec3(0.5, donor_replacementGLF_dead11uv.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                    GLF_dead11_GLF_color = vec4(result, 1.0);
                    ;
                }
            }
            h_r = texture(GLF_dead10tex, center).y;
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                donor_replacementGLF_dead10i++;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(_GLF_ZERO(0.0, injectionSwitch.x)))))) {
        {
            GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
        }
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead0i = _GLF_FUZZED(42163);
        {
            GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 10)] = (10 - donor_replacementGLF_dead0i) * int(GLF_dead0injectionSwitch.y);
        }
    }
    for (int i = 35; i >= 0; i--) {
        vec3 d;
        if (_GLF_WRAPPED_IF_FALSE(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead11c1 = _GLF_FUZZED(true);
                        bool donor_replacementGLF_dead11c2 = _GLF_FUZZED(isinf(length(-5514.7902)));
                        bool donor_replacementGLF_dead11c3 = _GLF_FUZZED((bvec4(true, true, true, true) != bvec4(false, true, true, true)));
                        if (!donor_replacementGLF_dead11c1 && !donor_replacementGLF_dead11c2 && donor_replacementGLF_dead11c3) {
                            float GLF_dead11stripe = GLF_dead11compute_stripe(cos((center.x + center.y) * 20.0), center.x + center.y);
                            result = mix(vec3(.7, sinh(center.x), center.x), vec3(.3, .5, center.x), GLF_dead11stripe);
                            GLF_dead11_GLF_color = vec4(result, 1.0);
                            ;
                        }
                    }
                    continue;
                }
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead6i = _GLF_FUZZED(i);
                vec4 donor_replacementGLF_dead6res = _GLF_FUZZED(dFdyFine(vec4(-9.5, -2382.0194, 4.6, 8.9)));
                for (int GLF_dead6j = 0; GLF_dead6j < 3; GLF_dead6j++) {
                    donor_replacementGLF_dead6res += texture(GLF_dead6tex, position + vec2(float(donor_replacementGLF_dead6i - 1) * b_b, float(GLF_dead6j - 1) * b_b)) * GLF_dead6weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i * 3 + GLF_dead6j, 9)];
                }
            }
        } else {
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead13grid = _GLF_FUZZED((d * (mat3(-5.7, -1.3, -5678.1263, -154.665, -22.26, 527.807, 9654.2134, -8.9, -9900.5873) * mat2x3(57.46, -25.75, 2.7, -7.9, 5.3, 930.628))));
                {
                    int GLF_dead13count = int(GLF_dead13injectionSwitch.x);
                    do {
                        d -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead13injectionSwitch.x, float(GLF_dead13obj.numbers[2]) * 0.1, float(GLF_dead13obj.numbers[8]) * 0.1));
                        GLF_dead13count++;
                    } while (GLF_dead13count != GLF_dead13obj.numbers[1]);
                    donor_replacementGLF_dead13grid += vec2(GLF_dead13count + int(GLF_dead13injectionSwitch.y), GLF_dead13count + int(GLF_dead13injectionSwitch.x));
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bool(false), true && (bool(false))))))) {
                int donor_replacementGLF_dead0j = _GLF_FUZZED(35356);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    {
                        GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                    }
                }
                {
                    if (GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0j, 10)] <= i) {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                            ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(ivec2(-48419, 51641));
                            {
                                donor_replacementGLF_dead3p.x = -donor_replacementGLF_dead3p.x;
                            }
                        }
                        i++;
                        GLF_dead0swap(i, donor_replacementGLF_dead0j);
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    } else {
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(ivec2(49359, 37196));
                            if (donor_replacementGLF_dead3p.x < 0) {
                                donor_replacementGLF_dead3p.x = -donor_replacementGLF_dead3p.x;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead9treeIndex = _GLF_FUZZED(i);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                        }
                    }
                    {
                        if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex == -1) {
                            GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex = donor_replacementGLF_dead9treeIndex;
                            GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9treeIndex, 10)], i);
                            ;
                        } else {
                            i = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex;
                            continue;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead10slope = _GLF_FUZZED(floor(675.109));
                        {
                            center -= aspect;
                            b_b += donor_replacementGLF_dead10slope;
                            s_g = texture(GLF_dead10tex, center).y;
                            i++;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        }
                    }
                    vec2 donor_replacementGLF_dead4color = _GLF_FUZZED(dFdy(center));
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead9_GLF_color = _GLF_outlined_10();
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    discard;
                                }
                            }
                        }
                    }
                    vec3 donor_replacementGLF_dead4vecCoor = _GLF_FUZZED(result);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(0.0, abs(1.0), 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                        {
                            GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].leftIndex = i;
                            GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)], donor_replacementGLF_dead0j);
                            ;
                        }
                    }
                    if (int(GLF_dead4gl_FragCoord[1]) < 270) {
                        donor_replacementGLF_dead4color = fract(sin(donor_replacementGLF_dead4vecCoor.yx - trunc(float(GLF_dead4data[7]))));
                        donor_replacementGLF_dead4color.y *= mix(normalize(donor_replacementGLF_dead4vecCoor), normalize(vec3(donor_replacementGLF_dead4color, degrees(donor_replacementGLF_dead4color.x))), GLF_dead4injectionSwitch.x).y;
                        break;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                            if (donor_replacementGLF_dead0j <= GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].data) {
                                if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].leftIndex == -1) {
                                    GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].leftIndex = i;
                                    GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)], donor_replacementGLF_dead0j);
                                    ;
                                } else {
                                    i = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].leftIndex;
                                    continue;
                                }
                            } else {
                                if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex == -1) {
                                    GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex = i;
                                    GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)], donor_replacementGLF_dead0j);
                                    ;
                                } else {
                                    i = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex;
                                    continue;
                                }
                            }
                        }
                    } else {
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (int(_GLF_ONE(1.0, injectionSwitch.y)) ^ ((1 << _GLF_IDENTITY(int(5), int(5))) >> _GLF_IDENTITY(int(5), int(5))))); _injected_loop_counter--) {
                            discard;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead11c1 = _GLF_FUZZED(false);
                    if (donor_replacementGLF_dead11c1) {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(cos((center.x + center.y) * 20.0), center.x + center.y);
                        result = mix(vec3(center.x, 0, 0.75), vec3(.8, .7, center.x), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(result, 1.0);
                        ;
                    }
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(!(false))))) {
            } else {
                if (_GLF_DEAD(false)) {
                    if (i >= int(GLF_dead14resolution.x)) {
                        break;
                    }
                }
                d = drawShape(position, center + vec2(sin(float(i) / 10.0 + time) / 4.0, 0.0), vec3(0.01 + sin(float(i) / 100.0), 0.01, float(i)));
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    for (int GLF_dead6i = 0; GLF_dead6i < 3; GLF_dead6i++) {
                        for (int GLF_dead6j = 0; GLF_dead6j < 3; GLF_dead6j++) {
                            _GLF_color += texture(GLF_dead6tex, center + vec2(float(GLF_dead6i - 1) * h_r, float(GLF_dead6j - 1) * h_r)) * GLF_dead6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i * 3 + GLF_dead6j, 9)];
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    bool donor_replacementGLF_dead11c1 = _GLF_FUZZED(bvec4(true, bvec3(false, true, true))[3]);
                    if (donor_replacementGLF_dead11c1) {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(cos((aspect.x + aspect.y) * 20.0), aspect.x + aspect.y);
                        d = mix(vec3(aspect.x, 0, 0.75), vec3(.8, .7, aspect.x), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(d, 1.0);
                        ;
                    }
                }
                GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = (10 - i);
                GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] * GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(i, 10)];
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_1(_GLF_color);
                    _GLF_color = _GLF_outlined_2();
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED((b_b * injectionSwitch));
                            int donor_replacementGLF_dead6i = _GLF_FUZZED((44066 / (mat4(mat3x4(5.7, 3.9, 179.608, -2.1, 8931.1677, -6.7, 68.38, -7.6, 1571.5335, 11.62, 34.04, -728.863)), -48429)));
                            float donor_replacementGLF_dead6uvstep = _GLF_FUZZED(b_b);
                            {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead13l = _GLF_FUZZED(-84535);
                                    int donor_replacementGLF_dead13pivot = _GLF_FUZZED((bool(45072) ? 37703 : (-18568)));
                                    for (int GLF_dead13j = donor_replacementGLF_dead13l; GLF_dead13j <= i - 1; GLF_dead13j++) {
                                        if (GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 10)] <= donor_replacementGLF_dead13pivot) {
                                            donor_replacementGLF_dead6i++;
                                            GLF_dead13swap(donor_replacementGLF_dead6i, GLF_dead13j);
                                        }
                                    }
                                }
                                for (int GLF_dead6j = 0; GLF_dead6j < 3; GLF_dead6j++) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            {
                                                float GLF_dead11stripe = GLF_dead11compute_stripe(tan((center.x + center.y) * 20.0), center.x + center.y);
                                                result = mix(vec3(0.5, center.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                                                GLF_dead11_GLF_color = vec4(result, 1.0);
                                                ;
                                            }
                                        }
                                        _GLF_outVarBackup_GLF_color += texture(GLF_dead6tex, donor_replacementGLF_dead6coord + vec2(float(donor_replacementGLF_dead6i - 1) * donor_replacementGLF_dead6uvstep, float(GLF_dead6j - 1) * donor_replacementGLF_dead6uvstep)) * GLF_dead6weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i * 3 + GLF_dead6j, 9)];
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead12pbc = _GLF_FUZZED(dot(position, donor_replacementGLF_dead6coord));
                                            if (!((donor_replacementGLF_dead6uvstep < 0.0 && donor_replacementGLF_dead12pbc < 0.0) || (donor_replacementGLF_dead6uvstep >= 0.0 && donor_replacementGLF_dead12pbc >= 0.0))) {
                                                ;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead13pivot = _GLF_FUZZED((29746 % GLF_dead4N));
                            if (GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] <= donor_replacementGLF_dead13pivot) {
                                i++;
                                GLF_dead13swap(i, i);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                ;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-99.21, -235.048, 844.898, -1.8);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                            int donor_replacementGLF_dead14j = _GLF_FUZZED(i);
                                            for (int GLF_dead14i = -1; GLF_dead14i <= int(GLF_dead14injectionSwitch.y); GLF_dead14i++) {
                                                vec2 GLF_dead14g = vec2(float(donor_replacementGLF_dead14j), float(GLF_dead14i));
                                                vec2 GLF_dead14o = mix(center, GLF_dead14g, 0.2);
                                                if (GLF_dead14injectionSwitch.x < (d.x)) {
                                                    int GLF_dead14k = 1;
                                                    while (GLF_dead14k >= 0) {
                                                        GLF_dead14o = GLF_dead14o + GLF_dead14o;
                                                        GLF_dead14k--;
                                                    }
                                                    d = vec3(GLF_dead14injectionSwitch.x, cos(GLF_dead14o));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                float donor_replacementGLF_dead10slope = _GLF_FUZZED(time);
                                if (_GLF_DEAD(false)) {
                                    if (center.x > (3.0 / 4.0)) {
                                        int GLF_dead13count = int(GLF_dead13injectionSwitch.x);
                                        do {
                                            d -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead13injectionSwitch.x, 0.6, float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]) * 0.1));
                                            GLF_dead13count++;
                                        } while (GLF_dead13count != GLF_dead13obj.numbers[2]);
                                        position += vec2(GLF_dead13count + GLF_dead13obj.numbers[3], GLF_dead13count + GLF_dead13obj.numbers[3]);
                                    }
                                }
                                {
                                    center -= center;
                                    s_g += donor_replacementGLF_dead10slope;
                                    h_r = texture(GLF_dead10tex, center).y;
                                    i++;
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        }
                                    }
                                }
                            }
                            for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 << _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter--) {
                                for (int GLF_dead6j = 0; GLF_dead6j < 3; GLF_dead6j++) {
                                    _GLF_outVarBackup_GLF_color += texture(GLF_dead6tex, center + vec2(float(i - 1) * b_b, float(GLF_dead6j - 1) * b_b)) * GLF_dead6weights[_GLF_MAKE_IN_BOUNDS_INT(i * 3 + GLF_dead6j, 9)];
                                }
                            }
                        } else {
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex == -1) {
                                    GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex = i;
                                    GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)], i);
                                    ;
                                } else {
                                    i = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex;
                                    continue;
                                    if (_GLF_DEAD(false)) {
                                        vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(fwidth(result));
                                        {
                                            donor_replacementGLF_dead13color -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead13injectionSwitch.x, float(GLF_dead13obj.numbers[2]) * 0.1, float(GLF_dead13obj.numbers[8]) * 0.1));
                                            i++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (length(d) <= 0.0) {
            continue;
        }
        result = _GLF_outlined_3(d);
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            do {
                return result;
            } while (_GLF_WRAPPED_LOOP(false));
        } else {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead9count = _GLF_FUZZED((~ivec4(9088, -43825, -11269, -93082)).x);
                do {
                    if (donor_replacementGLF_dead9count == 20) {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                            if (!((b_b < 0.0 && h_r < 0.0) || (b_b >= 0.0 && h_r >= 0.0))) {
                                ;
                            }
                        }
                        GLF_dead9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    } else {
                        GLF_dead9_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
    } else {
    }
}

vec4 _GLF_outlined_4() {
    do {
        return vec4(-5.8, 6.3, -352.918, -45.33);
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED(resolution);
        int donor_replacementGLF_dead6i = _GLF_FUZZED(-25298);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-7.3, 99.73, -54.17, 1.5);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead11c1 = _GLF_FUZZED(true);
                    bool donor_replacementGLF_dead11c2 = _GLF_FUZZED(true);
                    vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(atan(vec3(2.6, 3.4, 61.44)));
                    if (!donor_replacementGLF_dead11c1 && donor_replacementGLF_dead11c2) {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead6coord.x + donor_replacementGLF_dead6coord.y) * 20.0), donor_replacementGLF_dead6coord.x + donor_replacementGLF_dead6coord.y);
                        donor_replacementGLF_dead11col = mix(vec3(0.5, donor_replacementGLF_dead6coord.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                        ;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(bvec4(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, true, false))))) {
                    if (!((h_r < 0.0 && s_g < 0.0) || (h_r >= 0.0 && s_g >= 0.0))) {
                        ;
                    }
                }
            } else {
                for (int GLF_dead6j = 0; GLF_dead6j < 3; GLF_dead6j++) {
                    _GLF_color += texture(GLF_dead6tex, donor_replacementGLF_dead6coord + vec2(float(donor_replacementGLF_dead6i - 1) * b_b, float(GLF_dead6j - 1) * b_b)) * GLF_dead6weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i * 3 + GLF_dead6j, 9)];
                }
            }
        }
    }
}

vec4 _GLF_outlined_8(vec3 mixed) {
    return vec4(mixed, 1.0);
}

vec4 _GLF_outlined_11() {
    return vec4(1.0, 0.0, 0.0, 1.0);
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead14i = _GLF_FUZZED(97904);
        int donor_replacementGLF_dead14j = _GLF_FUZZED(12216);
        vec3 donor_replacementGLF_dead14m = _GLF_FUZZED(dFdxFine(vec3(5.9, -62.80, 10.38)));
        vec2 donor_replacementGLF_dead14n = _GLF_FUZZED(fma((mat4x2(-0.2, -4857.6774, 1.1, -4.8, 375.030, 76.12, -9.0, -5940.8951) * GLF_dead4gl_FragCoord), dFdy(intBitsToFloat(ivec2(-18205, -59358))), resolution));
        {
            vec2 GLF_dead14g = vec2(float(donor_replacementGLF_dead14j), float(donor_replacementGLF_dead14i));
            vec2 GLF_dead14o = mix(donor_replacementGLF_dead14n, GLF_dead14g, 0.2);
            if (GLF_dead14injectionSwitch.x < (donor_replacementGLF_dead14m.x)) {
                int GLF_dead14k = 1;
                while (GLF_dead14k >= 0) {
                    GLF_dead14o = GLF_dead14o + GLF_dead14o;
                    GLF_dead14k--;
                }
                donor_replacementGLF_dead14m = vec3(GLF_dead14injectionSwitch.x, cos(GLF_dead14o));
            }
        }
    }
}

float _GLF_outlined_12(float time) {
    return sin(time) * 0.1;
}

vec3 _GLF_outlined_13(vec3 point1, vec3 point2) {
    return mix(point1, point2, vec3(0.3));
}

void main() {
    float angle;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            {
                GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            }
        }
        vec3 donor_replacementGLF_dead0color = _GLF_FUZZED(vec3(-400.594, 773.041, 7435.3177));
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead4color = _GLF_FUZZED((false, vec2(746.829, -1.8)));
            int donor_replacementGLF_dead4i = _GLF_FUZZED(int(false));
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                do {
                    if (int(GLF_dead4gl_FragCoord[1]) < 30) {
                        donor_replacementGLF_dead4color = fract(sin(donor_replacementGLF_dead0color.yx - trunc(float(GLF_dead4data[0]))));
                        donor_replacementGLF_dead4color[0] = dFdy(GLF_dead4gl_FragCoord.y);
                        break;
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                            }
                        }
                    } else if (int(GLF_dead4gl_FragCoord[1]) < 60) {
                        donor_replacementGLF_dead4color = fract(sin(donor_replacementGLF_dead0color.yx - trunc(float(GLF_dead4data[1]))));
                        donor_replacementGLF_dead4color[1] *= atan(faceforward(GLF_dead4injectionSwitch, donor_replacementGLF_dead4color.xx, donor_replacementGLF_dead0color.yx).y);
                        break;
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(acosh(GLF_dead4injectionSwitch));
                            while (h_r < b_b && donor_replacementGLF_dead4i < 32) {
                                donor_replacementGLF_dead4color -= donor_replacementGLF_dead10uvstep;
                                b_b += b_b;
                                h_r = texture(GLF_dead10tex, donor_replacementGLF_dead4color).y;
                                donor_replacementGLF_dead4i++;
                            }
                        }
                    } else if (int(GLF_dead4gl_FragCoord[1]) < 90) {
                        donor_replacementGLF_dead4color = fract(sin(donor_replacementGLF_dead0color.yx - trunc(float(GLF_dead4data[2]))));
                        donor_replacementGLF_dead4color.x += atanh(donor_replacementGLF_dead4color.x) * cosh(GLF_dead4injectionSwitch.y) * smoothstep(donor_replacementGLF_dead4color, GLF_dead4injectionSwitch, GLF_dead4gl_FragCoord.yy).x;
                        break;
                    } else if (int(GLF_dead4gl_FragCoord[1]) < 120) {
                        donor_replacementGLF_dead4color = fract(acosh(clamp(donor_replacementGLF_dead0color.yx - trunc(float(GLF_dead4data[3])), 1.0, 1000.0)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            donor_replacementGLF_dead4color.x += (isnan(GLF_dead4gl_FragCoord.x) ? log2(GLF_dead4gl_FragCoord.x) : log2(GLF_dead4gl_FragCoord.y));
                        } else {
                        }
                        break;
                    } else if (int(GLF_dead4gl_FragCoord[1]) < 150) {
                        discard;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].leftIndex == -1) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                } else {
                                    GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].leftIndex = donor_replacementGLF_dead4i;
                                }
                                GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)], donor_replacementGLF_dead4i);
                                return;
                            } else {
                                donor_replacementGLF_dead4i = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)].leftIndex;
                                continue;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(1.4, 70.59, 5.5, -68.00);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead12pab = _GLF_FUZZED(log2(angle));
                                float donor_replacementGLF_dead12pbc = _GLF_FUZZED(angle);
                                if (!((donor_replacementGLF_dead12pab < 0.0 && donor_replacementGLF_dead12pbc < 0.0) || (donor_replacementGLF_dead12pab >= 0.0 && donor_replacementGLF_dead12pbc >= 0.0))) {
                                    ;
                                }
                            }
                        }
                    } else if (int(GLF_dead4gl_FragCoord[1]) < 180) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                            vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(abs(donor_replacementGLF_dead0color));
                            do {
                                donor_replacementGLF_dead13color -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead13injectionSwitch.x, float(GLF_dead13obj.numbers[2]) * 0.1, float(GLF_dead13obj.numbers[8]) * 0.1));
                                _injected_loop_counter++;
                            } while (_injected_loop_counter != GLF_dead13obj.numbers[1]);
                        }
                        donor_replacementGLF_dead4color = fract(sin(donor_replacementGLF_dead0color.yx - trunc(float(GLF_dead4data[4]))));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                ;
                            }
                        }
                        donor_replacementGLF_dead4color[1] += asinh(GLF_dead4gl_FragCoord.y * ldexp(donor_replacementGLF_dead4color.y, -donor_replacementGLF_dead4i));
                        break;
                    } else {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead12pbc = _GLF_FUZZED(time);
                            if (!((angle < 0.0 && donor_replacementGLF_dead12pbc < 0.0) || (angle >= 0.0 && donor_replacementGLF_dead12pbc >= 0.0))) {
                                ;
                            }
                        }
                        if (int(GLF_dead4gl_FragCoord[1]) < 210) {
                            donor_replacementGLF_dead4color = fract(sin(donor_replacementGLF_dead0color.yx - trunc(float(GLF_dead4data[5]))));
                            donor_replacementGLF_dead4color.y -= tanh(donor_replacementGLF_dead4color.x) / cosh(donor_replacementGLF_dead4color.y);
                            break;
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead10h = _GLF_FUZZED(fwidthFine(s_g));
                                float donor_replacementGLF_dead10slope = _GLF_FUZZED((s_g));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    for (int GLF_dead14i = -1; GLF_dead14i <= int(GLF_dead14injectionSwitch.y); GLF_dead14i++) {
                                        vec2 GLF_dead14g = vec2(float(donor_replacementGLF_dead4i), float(GLF_dead14i));
                                        vec2 GLF_dead14o = mix(donor_replacementGLF_dead4color, GLF_dead14g, 0.2);
                                        if (GLF_dead14injectionSwitch.x < (donor_replacementGLF_dead0color.x)) {
                                            int GLF_dead14k = 1;
                                            while (GLF_dead14k >= 0) {
                                                GLF_dead14o = GLF_dead14o + GLF_dead14o;
                                                GLF_dead14k--;
                                            }
                                            donor_replacementGLF_dead0color = vec3(GLF_dead14injectionSwitch.x, cos(GLF_dead14o));
                                        }
                                    }
                                }
                                {
                                    if (_GLF_DEAD(false)) {
                                        if (!((b_b < 0.0 && h_r < 0.0) || (b_b >= 0.0 && h_r >= 0.0))) {
                                            ;
                                        }
                                    }
                                    donor_replacementGLF_dead4color -= donor_replacementGLF_dead4color;
                                    angle += donor_replacementGLF_dead10slope;
                                    donor_replacementGLF_dead10h = texture(GLF_dead10tex, donor_replacementGLF_dead4color).y;
                                    donor_replacementGLF_dead4i++;
                                }
                            }
                        } else if (int(GLF_dead4gl_FragCoord[1]) < 240) {
                            donor_replacementGLF_dead4color = fract(asinh(donor_replacementGLF_dead0color.yx - trunc(float(GLF_dead4data[6]))));
                            if (_GLF_DEAD(false)) {
                                if (GLF_dead12pointInTriangle(donor_replacementGLF_dead4color, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                                    GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                } else {
                                    GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                }
                            }
                            donor_replacementGLF_dead4color.y -= isnan(float(donor_replacementGLF_dead4i)) ? tanh(GLF_dead4gl_FragCoord.x) : atanh(GLF_dead4gl_FragCoord.y / GLF_dead4resolution.y);
                            break;
                        } else if (int(GLF_dead4gl_FragCoord[1]) < 270) {
                            donor_replacementGLF_dead4color = fract(sin(donor_replacementGLF_dead0color.yx - trunc(float(GLF_dead4data[7]))));
                            donor_replacementGLF_dead4color.y *= mix(normalize(donor_replacementGLF_dead0color), normalize(vec3(donor_replacementGLF_dead4color, degrees(donor_replacementGLF_dead4color.x))), GLF_dead4injectionSwitch.x).y;
                            break;
                        } else {
                            discard;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    donor_replacementGLF_dead0color += GLF_dead13palette(vec3(0.5, float(GLF_dead13obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead13injectionSwitch.y)), vec3(float(GLF_dead13obj.numbers[4]) * 0.1, GLF_dead13injectionSwitch.x, 0.6));
                                    donor_replacementGLF_dead4i++;
                                }
                            }
                        }
                    }
                } while (0 == int(GLF_dead4injectionSwitch.x));
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(960.904, 22.83, -2.1, 2.8);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(mat3x2(-959.659, 7.4, -9.6, 25.19, -1.2, 3.5)[0]);
                    {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y) * 20.0), donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y);
                        donor_replacementGLF_dead0color = mix(vec3(donor_replacementGLF_dead11uv.x, .8, 0), vec3(1, donor_replacementGLF_dead11uv.y, 0), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead0color, 1.0);
                        return;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            } else {
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                int donor_replacementGLF_dead13count = _GLF_FUZZED(abs(GLF_dead4N));
                {
                    donor_replacementGLF_dead0color -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead13injectionSwitch.x, 0.6, float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]) * 0.1));
                    donor_replacementGLF_dead13count++;
                }
            }
        }
        vec2 donor_replacementGLF_dead0grid = _GLF_FUZZED(injectionSwitch);
        vec2 donor_replacementGLF_dead0uv = _GLF_FUZZED(mod(vec2(9.9, -6.4), resolution));
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(7187.0468, -80.82, -3.3));
                {
                    float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead0grid.x + donor_replacementGLF_dead0grid.y) * 20.0), donor_replacementGLF_dead0grid.x + donor_replacementGLF_dead0grid.y);
                    donor_replacementGLF_dead11col = mix(vec3(0.5, donor_replacementGLF_dead0grid.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                    GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                    return;
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead0grid.x + donor_replacementGLF_dead0grid.y) * 20.0), donor_replacementGLF_dead0grid.x + donor_replacementGLF_dead0grid.y);
                        donor_replacementGLF_dead0color = mix(vec3(donor_replacementGLF_dead0grid.x, .8, 0), vec3(1, donor_replacementGLF_dead0grid.y, 0), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead0color, 1.0);
                        return;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        GLF_dead9_GLF_color = _GLF_outlined_11();
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                }
                donor_replacementGLF_dead0grid = fract(sin(donor_replacementGLF_dead0color.yx - trunc(float(GLF_dead4data[5]))));
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    donor_replacementGLF_dead0grid.y -= tanh(donor_replacementGLF_dead0grid.x) / cosh(donor_replacementGLF_dead0grid.y);
                }
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    ;
                    if (_GLF_DEAD(false)) {
                        vec3 donor_replacementGLF_dead11col = _GLF_FUZZED((donor_replacementGLF_dead0color - (-6.9)));
                        {
                            float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0), donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y);
                            donor_replacementGLF_dead11col = mix(vec3(0.5, donor_replacementGLF_dead0uv.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                            GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                            return;
                        }
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(5408.0979, -7.2, 8.2, -5666.4714);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            } else {
            }
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(donor_replacementGLF_dead0color);
                vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(mat2(95.44, 4.1, 2.2, 9.1)[0]);
                {
                    float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y) * 20.0), donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y);
                    donor_replacementGLF_dead11col = mix(vec3(donor_replacementGLF_dead11uv.x, .8, 0), vec3(1, donor_replacementGLF_dead11uv.y, 0), GLF_dead11stripe);
                    GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                    return;
                }
            }
        }
        if (donor_replacementGLF_dead0uv.x > (2.0 / 4.0)) {
            if (_GLF_DEAD(false)) {
                if (GLF_dead12pointInTriangle(donor_replacementGLF_dead0grid, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                    GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } else {
                    GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                }
            }
            int GLF_dead0count = int(GLF_dead0injectionSwitch.x);
            do {
                donor_replacementGLF_dead0color -= GLF_dead0palette(vec3(float(GLF_dead0obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead0injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead0injectionSwitch.x, float(GLF_dead0obj.numbers[2]) * 0.1, float(GLF_dead0obj.numbers[8]) * 0.1));
                GLF_dead0count++;
            } while (GLF_dead0count != GLF_dead0obj.numbers[1]);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(_GLF_ZERO(0.0, injectionSwitch.x), 0.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))), 1.0, 0.0, 0.0, 0.0)))))) {
                int donor_replacementGLF_dead9data = _GLF_FUZZED(-3922);
                if (donor_replacementGLF_dead9data <= GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0count, 10)].data) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(47.11, -8.7, -4.1, -7.5);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0count, 10)].leftIndex == -1) {
                        GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0count, 10)].leftIndex = GLF_dead0count;
                        GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0count, 10)], donor_replacementGLF_dead9data);
                        return;
                    } else {
                        GLF_dead0count = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0count, 10)].leftIndex;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))))))) {
                            {
                                ;
                            }
                        }
                        ;
                    }
                } else {
                    if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0count, 10)].rightIndex == -1) {
                        GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0count, 10)].rightIndex = GLF_dead0count;
                        GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0count, 10)], donor_replacementGLF_dead9data);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            return;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                bool donor_replacementGLF_dead11c1 = _GLF_FUZZED((atan(mat3x2(512.287, -7.2, 5.0, 7.5, -9.3, -2958.6023)[1], resolution) == vec2(-7941.7780, 1.8)));
                                bool donor_replacementGLF_dead11c2 = _GLF_FUZZED(false);
                                bool donor_replacementGLF_dead11c3 = _GLF_FUZZED((s_g == sign(b_b)));
                                if (!donor_replacementGLF_dead11c1 && !donor_replacementGLF_dead11c2 && donor_replacementGLF_dead11c3) {
                                    float GLF_dead11stripe = GLF_dead11compute_stripe(cos((donor_replacementGLF_dead0grid.x + donor_replacementGLF_dead0grid.y) * 20.0), donor_replacementGLF_dead0grid.x + donor_replacementGLF_dead0grid.y);
                                    donor_replacementGLF_dead0color = mix(vec3(.7, sinh(donor_replacementGLF_dead0grid.x), donor_replacementGLF_dead0grid.x), vec3(.3, .5, donor_replacementGLF_dead0grid.x), GLF_dead11stripe);
                                    GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead0color, 1.0);
                                    return;
                                }
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                if (!((b_b < 0.0 && angle < 0.0) || (b_b >= 0.0 && angle >= 0.0))) {
                                    ;
                                }
                            }
                        }
                    } else {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            for (int _injected_loop_counter = _GLF_IDENTITY(0, (0) / 1); _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            }
                            _GLF_color = vec4(3382.4682, 226.820, 6099.3516, -3307.7736);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    bool donor_replacementGLF_dead11c1 = _GLF_FUZZED(false);
                                    bool donor_replacementGLF_dead11c2 = _GLF_FUZZED((false ? false : true));
                                    vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(vec2((s_g), b_b));
                                    if (!donor_replacementGLF_dead11c1 && donor_replacementGLF_dead11c2) {
                                        float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y) * 20.0), donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y);
                                        donor_replacementGLF_dead0color = mix(vec3(0.5, donor_replacementGLF_dead11uv.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead0color, 1.0);
                                        return;
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead14k = _GLF_FUZZED((ivec2(81213, -85791)[0] >> GLF_dead4N));
                                    {
                                        donor_replacementGLF_dead0grid = donor_replacementGLF_dead0grid + donor_replacementGLF_dead0grid;
                                        donor_replacementGLF_dead14k--;
                                    }
                                }
                            }
                        }
                        GLF_dead0count = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0count, 10)].rightIndex;
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead11c1 = _GLF_FUZZED((mat4x2(49.27, -8.7, -784.050, 0.7, 1194.5679, 75.50, 1701.1908, 815.377) == mat4x2(612.223, 2.4, -8367.2736, -340.245, -114.764, 233.501, 33.76, -2.8)));
                        bool donor_replacementGLF_dead11c2 = _GLF_FUZZED(((-34340) != 55093));
                        if (!donor_replacementGLF_dead11c1 && donor_replacementGLF_dead11c2) {
                            float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0), donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y);
                            donor_replacementGLF_dead0color = mix(vec3(0.5, donor_replacementGLF_dead0uv.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                            GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead0color, 1.0);
                            return;
                        }
                    }
                }
            }
            donor_replacementGLF_dead0grid += vec2(GLF_dead0count + int(GLF_dead0injectionSwitch.y), GLF_dead0count + int(GLF_dead0injectionSwitch.x));
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-1.4, 1018.4509, -18.60, 207.482);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    bool donor_replacementGLF_dead11c1 = _GLF_FUZZED((mat4x3(-347.840, -598.889, 4.9, 0.1, 8.6, -5927.7498, 8.5, -37.53, 22.92, -7.5, 0.1, -1.3) != mat4x3(-41.75, 8458.4143, -4.5, 237.802, 0.4, -0.3, -7.1, 7384.2935, 5451.5352, 7.4, 824.575, 1.8)));
                    bool donor_replacementGLF_dead11c2 = _GLF_FUZZED(true);
                    if (!donor_replacementGLF_dead11c1 && donor_replacementGLF_dead11c2) {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0), donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y);
                        donor_replacementGLF_dead0color = mix(vec3(0.5, donor_replacementGLF_dead0uv.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead0color, 1.0);
                        return;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead6i = _GLF_FUZZED(ivec4(-45578, 51712, -68681, -68627)[2]);
                int donor_replacementGLF_dead6j = _GLF_FUZZED(ivec2(46402, -87843)[1]);
                vec4 donor_replacementGLF_dead6res = _GLF_FUZZED(max(dFdy(vec4(8308.3045, -0.2, -3.9, -320.040)), b_b));
                {
                    donor_replacementGLF_dead6res += texture(GLF_dead6tex, donor_replacementGLF_dead0uv + vec2(float(donor_replacementGLF_dead6i - 1) * s_g, float(donor_replacementGLF_dead6j - 1) * s_g)) * GLF_dead6weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i * 3 + donor_replacementGLF_dead6j, 9)];
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = _GLF_outlined_4();
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    do {
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED((mat4x2(-9504.5621, 46.89, -180.419, 6.7, 7807.2407, -24.12, -7.9, 48.60), vec2(10.89, -2.2)));
            if (_GLF_DEAD(false)) {
                if (GLF_dead12pointInTriangle(donor_replacementGLF_dead10coord, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                    GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } else {
                    GLF_dead12_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                }
            }
            int donor_replacementGLF_dead10i = _GLF_FUZZED((mix(82816, 84263, true) + 41051));
            vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED((vec2(-3.3, -9.1) - GLF_dead4resolution));
            while (s_g < angle && donor_replacementGLF_dead10i < 32) {
                donor_replacementGLF_dead10coord -= donor_replacementGLF_dead10uvstep;
                angle += b_b;
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(sinh(vec3(-90.75, 0.5, -8.1)));
                    {
                        int GLF_dead13count = int(GLF_dead13injectionSwitch.x);
                        do {
                            donor_replacementGLF_dead13color -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead13injectionSwitch.x, 0.6, float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.x), 10)]) * 0.1));
                            GLF_dead13count++;
                        } while (GLF_dead13count != GLF_dead13obj.numbers[2]);
                        donor_replacementGLF_dead10coord += vec2(GLF_dead13count + GLF_dead13obj.numbers[3], GLF_dead13count + GLF_dead13obj.numbers[3]);
                    }
                }
                s_g = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
                donor_replacementGLF_dead10i++;
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec3(0.0, 0.0, 0.0)))))) {
        vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(round(vec3(8.3, -54.46, -3770.3079)));
        int donor_replacementGLF_dead13count = _GLF_FUZZED((GLF_dead4N << (-50452)));
        {
            donor_replacementGLF_dead13color += GLF_dead13palette(vec3(0.5, float(GLF_dead13obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead13injectionSwitch.y)), vec3(float(GLF_dead13obj.numbers[4]) * 0.1, GLF_dead13injectionSwitch.x, 0.6));
            donor_replacementGLF_dead13count++;
        }
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED(max(injectionSwitch, round(h_r)));
        vec4 donor_replacementGLF_dead6res = _GLF_FUZZED(vec4(5.7, -0.6, -3.1, 0.8));
        for (int GLF_dead6i = 0; GLF_dead6i < 3; GLF_dead6i++) {
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(2.7, 612.946, -5.6));
                {
                    float GLF_dead11stripe = GLF_dead11compute_stripe(tan((donor_replacementGLF_dead6coord.x + donor_replacementGLF_dead6coord.y) * 20.0), donor_replacementGLF_dead6coord.x + donor_replacementGLF_dead6coord.y);
                    donor_replacementGLF_dead11col = mix(vec3(0.5, donor_replacementGLF_dead6coord.x, 0.1), vec3(.4, 0, .5), GLF_dead11stripe);
                    GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                    return;
                }
            }
            for (int GLF_dead6j = 0; GLF_dead6j < 3; GLF_dead6j++) {
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead11c1 = _GLF_FUZZED(true);
                    bool donor_replacementGLF_dead11c2 = _GLF_FUZZED(bvec4(false, false, true, false).z);
                    bool donor_replacementGLF_dead11c3 = _GLF_FUZZED(true);
                    vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(vec3(71.75, 156.514, 6.5));
                    if (!donor_replacementGLF_dead11c1 && !donor_replacementGLF_dead11c2 && donor_replacementGLF_dead11c3) {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(cos((donor_replacementGLF_dead6coord.x + donor_replacementGLF_dead6coord.y) * 20.0), donor_replacementGLF_dead6coord.x + donor_replacementGLF_dead6coord.y);
                        donor_replacementGLF_dead11col = mix(vec3(.7, sinh(donor_replacementGLF_dead6coord.x), donor_replacementGLF_dead6coord.x), vec3(.3, .5, donor_replacementGLF_dead6coord.x), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                        return;
                    }
                }
                donor_replacementGLF_dead6res += texture(GLF_dead6tex, donor_replacementGLF_dead6coord + vec2(float(GLF_dead6i - 1) * h_r, float(GLF_dead6j - 1) * h_r)) * GLF_dead6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i * 3 + GLF_dead6j, 9)];
            }
        }
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
        angle = _GLF_outlined_12(time);
    }
    mat2 rotationMatrix;
    if (_GLF_DEAD(false)) {
        {
            ;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(injectionSwitch);
        int donor_replacementGLF_dead10i = _GLF_FUZZED(((-95451) * findLSB(65038u)));
        vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(unpackSnorm2x16(33348u));
        {
            donor_replacementGLF_dead10coord -= donor_replacementGLF_dead10uvstep;
            h_r += angle;
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                s_g = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
            } else {
            }
            donor_replacementGLF_dead10i++;
        }
    }
    rotationMatrix = mat2(sin(angle), -cos(angle), cos(angle), sin(angle));
    vec3 point1;
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead8i = _GLF_FUZZED((uvec4(64574u, 7550u, 9407u, 68802u), (GLF_dead4N & GLF_dead4N)));
        int donor_replacementGLF_dead8j = _GLF_FUZZED(GLF_dead4N);
        uint donor_replacementGLF_dead8uselessOutVariable = _GLF_FUZZED(26756u);
        if (uint(donor_replacementGLF_dead8j) < uaddCarry(uint(donor_replacementGLF_dead8i), 1u, donor_replacementGLF_dead8uselessOutVariable)) {
            ;
        }
    }
    point1 = computePoint(rotationMatrix);
    mat2 rotationMatrix2;
    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
        vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED((GLF_dead0injectionSwitch));
        int donor_replacementGLF_dead10i = _GLF_FUZZED(GLF_dead4N);
        float donor_replacementGLF_dead10slope = _GLF_FUZZED(ldexp(normalize(s_g), -35903));
        vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(GLF_dead4injectionSwitch);
        while (h_r < angle && donor_replacementGLF_dead10i < 32) {
            donor_replacementGLF_dead10coord -= donor_replacementGLF_dead10uvstep;
            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                angle += donor_replacementGLF_dead10slope;
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                h_r = texture(GLF_dead10tex, donor_replacementGLF_dead10coord).y;
            }
            donor_replacementGLF_dead10i++;
        }
    }
    rotationMatrix2 = rotationMatrix * rotationMatrix;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-452.358, -764.402, -18.49, 75.42);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    vec3 point2;
    point2 = computePoint(rotationMatrix2);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-51.31, 0.7, -86.62, -2103.2863);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    mat2 rotationMatrix3;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead11c1 = _GLF_FUZZED((vec4(injectionSwitch, -3.5, s_g) != _GLF_color));
            vec3 donor_replacementGLF_dead11col = _GLF_FUZZED(asin(smoothstep(h_r, s_g, point2)));
            vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(reflect(mod(resolution, resolution), vec2(45.36, 5.9)));
            if (donor_replacementGLF_dead11c1) {
                float GLF_dead11stripe = GLF_dead11compute_stripe(cos((donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y) * 20.0), donor_replacementGLF_dead11uv.x + donor_replacementGLF_dead11uv.y);
                donor_replacementGLF_dead11col = mix(vec3(donor_replacementGLF_dead11uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead11uv.x), GLF_dead11stripe);
                GLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11col, 1.0);
                return;
            }
        }
        vec2 donor_replacementGLF_dead0grid = _GLF_FUZZED(resolution);
        vec2 donor_replacementGLF_dead0uv = _GLF_FUZZED((injectionSwitch + time));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
            int donor_replacementGLF_dead10i = _GLF_FUZZED(findMSB(GLF_dead4N));
            vec2 donor_replacementGLF_dead10uvstep = _GLF_FUZZED(vec2(vec4(902.072, -3.4, -9744.1670, -69.68)));
            {
                donor_replacementGLF_dead0uv -= donor_replacementGLF_dead10uvstep;
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), bool(bvec3(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false, false))))) {
                    bool donor_replacementGLF_dead11c1 = _GLF_FUZZED(true);
                    bool donor_replacementGLF_dead11c2 = _GLF_FUZZED(false);
                    bool donor_replacementGLF_dead11c3 = _GLF_FUZZED((bvec4(false, true, false, false) == lessThan(ivec4(85363, -63873, -21219, -22330), ivec4(46750, -61499, 46112, -46321))));
                    if (!donor_replacementGLF_dead11c1 && !donor_replacementGLF_dead11c2 && donor_replacementGLF_dead11c3) {
                        float GLF_dead11stripe = GLF_dead11compute_stripe(cos((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0), donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y);
                        point1 = mix(vec3(.7, sinh(donor_replacementGLF_dead0uv.x), donor_replacementGLF_dead0uv.x), vec3(.3, .5, donor_replacementGLF_dead0uv.x), GLF_dead11stripe);
                        GLF_dead11_GLF_color = vec4(point1, 1.0);
                        return;
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    angle += b_b;
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    b_b = texture(GLF_dead10tex, donor_replacementGLF_dead0uv).y;
                }
                donor_replacementGLF_dead10i++;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                bool donor_replacementGLF_dead11c1 = _GLF_FUZZED(true);
                bool donor_replacementGLF_dead11c2 = _GLF_FUZZED(false);
                bool donor_replacementGLF_dead11c3 = _GLF_FUZZED((36564 <= (-14365)));
                if (!donor_replacementGLF_dead11c1 && !donor_replacementGLF_dead11c2 && donor_replacementGLF_dead11c3) {
                    float GLF_dead11stripe = GLF_dead11compute_stripe(cos((donor_replacementGLF_dead0grid.x + donor_replacementGLF_dead0grid.y) * 20.0), donor_replacementGLF_dead0grid.x + donor_replacementGLF_dead0grid.y);
                    point2 = mix(vec3(.7, sinh(donor_replacementGLF_dead0grid.x), donor_replacementGLF_dead0grid.x), vec3(.3, .5, donor_replacementGLF_dead0grid.x), GLF_dead11stripe);
                    GLF_dead11_GLF_color = vec4(point2, 1.0);
                    return;
                }
            }
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        ;
                    }
                }
                if (donor_replacementGLF_dead0uv.x > (2.0 / 4.0)) {
                    int GLF_dead0count = int(GLF_dead0injectionSwitch.x);
                    do {
                        point1 -= GLF_dead0palette(vec3(float(GLF_dead0obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead0injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead0injectionSwitch.x, float(GLF_dead0obj.numbers[2]) * 0.1, float(GLF_dead0obj.numbers[8]) * 0.1));
                        GLF_dead0count++;
                    } while (GLF_dead0count != GLF_dead0obj.numbers[1]);
                    donor_replacementGLF_dead0grid += vec2(GLF_dead0count + int(GLF_dead0injectionSwitch.y), GLF_dead0count + int(GLF_dead0injectionSwitch.x));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        ;
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
        } else {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead9baseIndex = _GLF_FUZZED(ivec4(ivec3(83628, -46613, 50432), 98770).q);
                int donor_replacementGLF_dead9data = _GLF_FUZZED((GLF_dead4N / findLSB(15755u)));
                int donor_replacementGLF_dead9treeIndex = _GLF_FUZZED((97630 % GLF_dead4N));
                {
                    if (GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9baseIndex, 10)].leftIndex == -1) {
                        GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9baseIndex, 10)].leftIndex = donor_replacementGLF_dead9treeIndex;
                        GLF_dead9makeTreeNode(GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9treeIndex, 10)], donor_replacementGLF_dead9data);
                        return;
                    } else {
                        donor_replacementGLF_dead9baseIndex = GLF_dead9tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9baseIndex, 10)].leftIndex;
                        ;
                    }
                }
            }
        }
    }
    rotationMatrix3 = rotationMatrix * rotationMatrix * rotationMatrix;
    vec3 point3;
    point3 = computePoint(rotationMatrix3);
    vec3 mixed;
    mixed = _GLF_outlined_13(point1, point2);
    mixed = mix(mixed, point3, vec3(0.3));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-4.6, -62.49, -0.4, -2.8);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    for (int _injected_loop_counter = (((1 ^ 1) & 2984) ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
        _GLF_color = _GLF_outlined_8(mixed);
    }
}
