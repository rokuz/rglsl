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

layout(set = 0, binding = 1) uniform buf1 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_dead10resolution;
};

vec4 GLF_dead12_GLF_color = _GLF_FUZZED(vec4(9706.7770, -17.94, 8.6, -801.313));

layout(set = 0, binding = 3) uniform buf3 {
    float GLF_dead12one;
};

mat2 GLF_dead12m22 = _GLF_FUZZED(mat2(6008.2636, 4734.9796, 923.104, -8.1));
mat2x3 GLF_dead12m23 = _GLF_FUZZED((mat2x3(mat4(30.36, 6.4, 6.1, -416.142, 63.23, 75.01, -2.0, 250.987, -25.94, -58.44, 51.00, -7.9, -663.293, 562.717, -648.804, -8.1)) + mat2x3(-2.3, 1.0, -9.2, 9.1, 8.4, 7919.4302)));
mat2x4 GLF_dead12m24 = _GLF_FUZZED(mat2x4(mat2(-8292.5362, 672.611, 414.655, 9258.1350)));
mat3x2 GLF_dead12m32 = _GLF_FUZZED(mat3x2(mat2(mat3x4(6.6, 5818.7037, -344.717, 2.5, 4049.3541, 76.51, -4.9, -398.492, -2.7, -9391.4724, -9.8, 82.36))));
mat3 GLF_dead12m33 = _GLF_FUZZED(mat3(-54.98, -6984.9675, -98.14, -3.5, -336.558, -220.215, -9423.0716, 553.130, -5.0));
mat3x4 GLF_dead12m34 = _GLF_FUZZED(mat3x4(mat2x3(69.49, 86.76, 2654.9358, -205.144, 795.559, -8.9)));
mat4x2 GLF_dead12m42 = _GLF_FUZZED(mat4x2(7912.6652, 61.75, -1.7, -9.2, 975.834, 638.668, -77.98, -5258.8599));
mat4x3 GLF_dead12m43 = _GLF_FUZZED(mat4x3(432.560, -421.150, -271.706, -426.960, -3.4, 2.4, 1.2, 84.77, 6.9, -7857.3691, -590.429, -50.08));
mat4 GLF_dead12m44 = _GLF_FUZZED((+mat4(-6370.8274, 27.20, 2.8, -1.6, -0.7, 65.12, 55.22, -0.3, 7551.6096, -874.865, -7.0, 912.792, 0.7, 5.5, 9.4, 5.9)));
vec4 GLF_dead11gl_FragCoord = _GLF_FUZZED(vec4(274.946, -9.2, 291.070, -6855.3825));

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead11resolution;
};

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead6resolution;
};

vec4 GLF_dead9_GLF_color = _GLF_FUZZED(((mat4x3(7774.0629, 5.2, -54.21, 6.5, -5.0, -11.18, 437.228, 5.5, -3.9, 39.08, -66.03, -8.8) * vec4(1471.7715, 975.115, -38.36, 183.844)) * mat4x3(-95.59, -9.2, -1977.8241, -5.0, -882.520, -7.2, -8.8, 4.9, 4.2, 91.72, -5.1, 2.6)));

layout(set = 0, binding = 6) uniform buf6 {
    vec3 GLF_dead9polynomial;
};

float GLF_dead9fx(float GLF_dead9x) {
    return GLF_dead9polynomial.x * (GLF_dead9x * GLF_dead9x) + GLF_dead9polynomial.y * GLF_dead9x + GLF_dead9polynomial.z;
}

layout(set = 0, binding = 7) uniform buf7 {
    vec2 GLF_dead8injectionSwitch;
};

struct GLF_dead8QuicksortObject {
    int numbers[10];
};

GLF_dead8QuicksortObject GLF_dead8obj = GLF_dead8QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

vec3 GLF_dead8palette(vec3 GLF_dead8a, vec3 GLF_dead8b, vec3 GLF_dead8c, vec3 GLF_dead8d) {
    return fract(mix(GLF_dead8d * GLF_dead8a, GLF_dead8a * GLF_dead8c, GLF_dead8b + GLF_dead8d - GLF_dead8c));
}

const vec4 GLF_dead7pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_dead7picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, 4, 4), vec4(12, 22, 4, 4));

bool GLF_dead7collision(vec2 GLF_dead7pos, vec4 GLF_dead7quad) {
    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter--) {
        if (GLF_dead7pos.x < GLF_dead7quad.x) {
            return false;
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead13x = _GLF_FUZZED(-8.0);
                float donor_replacementGLF_dead13y = _GLF_FUZZED(faceforward(length(GLF_dead9polynomial), -2.0, 371.665));
                if (donor_replacementGLF_dead13x * donor_replacementGLF_dead13x + donor_replacementGLF_dead13y * donor_replacementGLF_dead13y > 4.0) {
                    break;
                }
            }
        }
    }
    if (GLF_dead7pos.y < GLF_dead7quad.y) {
        return false;
    }
    if (GLF_dead7pos.x > GLF_dead7quad.x + GLF_dead7quad.z) {
        return false;
    }
    if (GLF_dead7pos.y > GLF_dead7quad.y + GLF_dead7quad.w) {
        if (_GLF_DEAD(false)) {
            return true;
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead13iteration = _GLF_FUZZED(11564);
                float donor_replacementGLF_dead13xCoord = _GLF_FUZZED(min(-4.9, 55.13));
                float donor_replacementGLF_dead13yCoord = _GLF_FUZZED(-5563.7977);
                if (donor_replacementGLF_dead13iteration < 1000) {
                    ;
                } else {
                    ;
                }
            }
        }
        return false;
    }
    return true;
}

struct GLF_dead3BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead3BST GLF_dead3tree[10] = GLF_dead3BST[10](GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0));

int GLF_dead3search(int GLF_dead3target) {
    GLF_dead3BST GLF_dead3currentNode = GLF_dead3BST(0, 0, 0);
    if (_GLF_DEAD(false)) {
        uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(184032u);
        for (int GLF_dead12cols = 2; GLF_dead12cols <= 4; GLF_dead12cols++) {
            for (int GLF_dead12rows = 2; GLF_dead12rows <= 4; GLF_dead12rows++) {
                for (int GLF_dead12c = 0; GLF_dead12c < GLF_dead12cols; GLF_dead12c++) {
                    for (int GLF_dead12r = 0; GLF_dead12r < GLF_dead12rows; GLF_dead12r++) {
                        switch (donor_replacementGLF_dead12matrix_number) {
                            case 0u:
                                GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                break;
                            case 1u:
                                GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                break;
                            case 2u:
                                GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                break;
                            case 3u:
                                GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                break;
                            case 4u:
                                GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                break;
                            case 5u:
                                GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                break;
                            case 6u:
                                GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                break;
                            case 7u:
                                GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                break;
                            case 8u:
                                GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                break;
                        }
                    }
                }
                donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
        return 1;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            float donor_replacementGLF_dead13xCoord = _GLF_FUZZED(-3.9);
            float donor_replacementGLF_dead13yCoord = _GLF_FUZZED(-6.3);
            if (GLF_dead3target < 1000) {
                ;
            } else {
                ;
            }
        }
    }
    int GLF_dead3index = 0;
    while (GLF_dead3index != -1) {
        GLF_dead3currentNode = GLF_dead3tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3index, 10)];
        if (_GLF_DEAD(false)) {
            return 1;
        }
        if (GLF_dead3currentNode.data == GLF_dead3target) {
            return GLF_dead3target;
        }
        GLF_dead3index = GLF_dead3target > GLF_dead3currentNode.data ? GLF_dead3currentNode.rightIndex : GLF_dead3currentNode.leftIndex;
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead6xCoord = _GLF_FUZZED(76.86);
                float donor_replacementGLF_dead6yCoord = _GLF_FUZZED(5.4);
                if (GLF_dead3index < bitfieldInsert(GLF_dead3index, 0, 0, 0)) {
                    ;
                } else {
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead13c_im = _GLF_FUZZED(1.3);
                float donor_replacementGLF_dead13c_re = _GLF_FUZZED(-514.671);
                int donor_replacementGLF_dead13iteration = _GLF_FUZZED(GLF_dead3index);
                float donor_replacementGLF_dead13x = _GLF_FUZZED(-5442.9638);
                float donor_replacementGLF_dead13y = _GLF_FUZZED(sqrt(97.33));
                for (int GLF_dead13k = 0; GLF_dead13k < 1000; GLF_dead13k++) {
                    if (donor_replacementGLF_dead13x * donor_replacementGLF_dead13x + donor_replacementGLF_dead13y * donor_replacementGLF_dead13y > 4.0) {
                        break;
                    }
                    float GLF_dead13x_new = donor_replacementGLF_dead13x * donor_replacementGLF_dead13x - donor_replacementGLF_dead13y * donor_replacementGLF_dead13y + donor_replacementGLF_dead13c_re;
                    donor_replacementGLF_dead13y = 2.0 * donor_replacementGLF_dead13x * donor_replacementGLF_dead13y + donor_replacementGLF_dead13c_im;
                    donor_replacementGLF_dead13x = GLF_dead13x_new;
                    donor_replacementGLF_dead13iteration++;
                }
            }
            break;
        }
    }
    return -1;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return 1;
        }
        return 1;
    }
}

layout(set = 0, binding = 8) uniform sampler2D GLF_dead5tex;

struct GLF_dead0BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead0BST GLF_dead0tree[10] = GLF_dead0BST[10](GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0));

int GLF_dead0search(int GLF_dead0target) {
    GLF_dead0BST GLF_dead0currentNode = GLF_dead0BST(0, 0, 0);
    if (_GLF_DEAD(false)) {
        {
            ;
        }
    }
    int GLF_dead0index = 0;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return 1;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return 1;
    }
    while (GLF_dead0index != -1) {
        GLF_dead0currentNode = GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0index, 10)];
        if (GLF_dead0currentNode.data == GLF_dead0target) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead7i = _GLF_FUZZED((int(165083u) / 37164));
                    vec2 donor_replacementGLF_dead7pos = _GLF_FUZZED((4.8 / dFdy(injectionSwitch)));
                    vec4 donor_replacementGLF_dead7res = _GLF_FUZZED(vec4(153.683, -5.5, -25.31, 1.1));
                    if (GLF_dead7collision(donor_replacementGLF_dead7pos, GLF_dead7picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 8)])) {
                        donor_replacementGLF_dead7res = GLF_dead7pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead7picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 8)].x) * int(GLF_dead7picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 8)].y) + donor_replacementGLF_dead7i * 9 + 11) % 16, 16)];
                    }
                }
            }
            return GLF_dead0target;
            if (_GLF_DEAD(false)) {
                break;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
            return 1;
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        } else {
            GLF_dead0index = GLF_dead0target > GLF_dead0currentNode.data ? GLF_dead0currentNode.rightIndex : GLF_dead0currentNode.leftIndex;
        }
        if (_GLF_DEAD(false)) {
            break;
        }
    }
    return -1;
}

int GLF_dead2MATRIX_N = 4;
layout(location = 0) out vec4 _GLF_color;
layout(set = 0, binding = 0) uniform sampler2D tex;

float ReallyApproxNormalizedAtan2(vec2 v) {
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead13c_im = _GLF_FUZZED(6.1);
                float donor_replacementGLF_dead13c_re = _GLF_FUZZED(float(false));
                int donor_replacementGLF_dead13iteration = _GLF_FUZZED(findLSB(GLF_dead2MATRIX_N));
                float donor_replacementGLF_dead13x = _GLF_FUZZED(-50.01);
                float donor_replacementGLF_dead13y = _GLF_FUZZED(-5632.2201);
                for (int GLF_dead13k = 0; GLF_dead13k < 1000; GLF_dead13k++) {
                    if (donor_replacementGLF_dead13x * donor_replacementGLF_dead13x + donor_replacementGLF_dead13y * donor_replacementGLF_dead13y > 4.0) {
                        break;
                    }
                    float GLF_dead13x_new = donor_replacementGLF_dead13x * donor_replacementGLF_dead13x - donor_replacementGLF_dead13y * donor_replacementGLF_dead13y + donor_replacementGLF_dead13c_re;
                    donor_replacementGLF_dead13y = 2.0 * donor_replacementGLF_dead13x * donor_replacementGLF_dead13y + donor_replacementGLF_dead13c_im;
                    donor_replacementGLF_dead13x = GLF_dead13x_new;
                    donor_replacementGLF_dead13iteration++;
                }
            }
        } else {
            _GLF_color = vec4(-5.6, 169.206, -48.39, -7739.8199);
        }
    }
    if (_GLF_DEAD(false)) {
        return 1.0;
    }
    if (_GLF_DEAD(false)) {
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            return 1.0;
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = vec4(injectionSwitch.x, inversesqrt(vec3(26.33, -7117.7337, 84.33)));
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = vec4(4.1, -6.1, -1.1, -5.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = _GLF_color;
            }
        } while (_GLF_WRAPPED_LOOP(false));
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        } else {
            return 1.0;
        }
    }
    float pi2 = 1.0 / (355.0 / 113.0);
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = GLF_dead9_GLF_color;
            }
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    continue;
                }
                return 1.0;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead12cols = _GLF_FUZZED((+(-59787)));
                    uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED((uvec3(140985u, 128366u, 189345u))[0]);
                    {
                        for (int GLF_dead12rows = 2; GLF_dead12rows <= 4; GLF_dead12rows++) {
                            for (int GLF_dead12c = 0; GLF_dead12c < donor_replacementGLF_dead12cols; GLF_dead12c++) {
                                for (int GLF_dead12r = 0; GLF_dead12r < GLF_dead12rows; GLF_dead12r++) {
                                    switch (donor_replacementGLF_dead12matrix_number) {
                                        case 0u:
                                            GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                            break;
                                        case 1u:
                                            GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                            break;
                                        case 2u:
                                            GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                            break;
                                        case 3u:
                                            GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                            break;
                                        case 4u:
                                            GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                            break;
                                        case 5u:
                                            GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                            break;
                                        case 6u:
                                            GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                            break;
                                        case 7u:
                                            GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                            break;
                                        case 8u:
                                            GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                            break;
                                    }
                                }
                            }
                            donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
        }
        return 1.0;
    }
    if (length(v) < 0.001) {
        return 0.0;
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            _GLF_color = fwidthCoarse(GLF_dead9_GLF_color);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        float donor_replacementGLF_dead9x2 = _GLF_FUZZED(atan(inversesqrt(0.0)));
        if (donor_replacementGLF_dead9x2 <= -0.9 && donor_replacementGLF_dead9x2 >= -1.1) {
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            GLF_dead9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return 1.0;
            }
            GLF_dead9_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
        }
    }
    vec2 a = abs(v);
    float z;
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead6c_im = _GLF_FUZZED((false ? pi2 : pi2));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead10iterationCap = _GLF_FUZZED(abs(sign(GLF_dead2MATRIX_N)));
            {
                donor_replacementGLF_dead10iterationCap += 1;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return 1.0;
        }
        float donor_replacementGLF_dead6c_re = _GLF_FUZZED(z);
        int donor_replacementGLF_dead6iteration = _GLF_FUZZED(65492);
        int donor_replacementGLF_dead6iterationCap = _GLF_FUZZED(GLF_dead2MATRIX_N);
        int donor_replacementGLF_dead6k = _GLF_FUZZED(int(pi2));
        float donor_replacementGLF_dead6x = _GLF_FUZZED(((mat2x4(7.8, -5.1, 8617.7619, -8.4, -9.1, 6.7, 5.8, 68.94) - z), pi2));
        float donor_replacementGLF_dead6y = _GLF_FUZZED(95.35);
        do {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead12cols = _GLF_FUZZED(donor_replacementGLF_dead6iterationCap);
                uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(27378u);
                for (int GLF_dead12rows = 2; GLF_dead12rows <= 4; GLF_dead12rows++) {
                    for (int GLF_dead12c = 0; GLF_dead12c < donor_replacementGLF_dead12cols; GLF_dead12c++) {
                        for (int GLF_dead12r = 0; GLF_dead12r < GLF_dead12rows; GLF_dead12r++) {
                            switch (donor_replacementGLF_dead12matrix_number) {
                                case 0u:
                                    GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                    break;
                                case 1u:
                                    GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                    break;
                                case 2u:
                                    GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                    break;
                                case 3u:
                                    GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                    break;
                                case 4u:
                                    GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                    break;
                                case 5u:
                                    GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                    break;
                                case 6u:
                                    GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                    break;
                                case 7u:
                                    GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                    break;
                                case 8u:
                                    GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                    break;
                            }
                        }
                    }
                    donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
                }
            }
            if (donor_replacementGLF_dead6x * donor_replacementGLF_dead6x + donor_replacementGLF_dead6y * donor_replacementGLF_dead6y > 4.0) {
                break;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    discard;
                }
                _GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(107581u);
                    for (int GLF_dead12cols = 2; GLF_dead12cols <= 4; GLF_dead12cols++) {
                        for (int GLF_dead12rows = 2; GLF_dead12rows <= 4; GLF_dead12rows++) {
                            for (int GLF_dead12c = 0; GLF_dead12c < GLF_dead12cols; GLF_dead12c++) {
                                for (int GLF_dead12r = 0; GLF_dead12r < GLF_dead12rows; GLF_dead12r++) {
                                    switch (donor_replacementGLF_dead12matrix_number) {
                                        case 0u:
                                            GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                            break;
                                        case 1u:
                                            GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                            break;
                                        case 2u:
                                            GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                            break;
                                        case 3u:
                                            GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                            break;
                                        case 4u:
                                            GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                            break;
                                        case 5u:
                                            GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                            break;
                                        case 6u:
                                            GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                            break;
                                        case 7u:
                                            GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                            break;
                                        case 8u:
                                            GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                            break;
                                    }
                                }
                            }
                            donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
                        }
                    }
                }
            }
            float GLF_dead6x_new = donor_replacementGLF_dead6x * donor_replacementGLF_dead6x - donor_replacementGLF_dead6y * donor_replacementGLF_dead6y + donor_replacementGLF_dead6c_re;
            donor_replacementGLF_dead6y = 2.0 * donor_replacementGLF_dead6x * donor_replacementGLF_dead6y + donor_replacementGLF_dead6c_im;
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead13xCoord = _GLF_FUZZED(-77.88);
                float donor_replacementGLF_dead13yCoord = _GLF_FUZZED(faceforward(9213.8865, z, donor_replacementGLF_dead6y));
                {
                    ;
                }
            }
            donor_replacementGLF_dead6x = GLF_dead6x_new;
            donor_replacementGLF_dead6iteration++;
            donor_replacementGLF_dead6k++;
        } while (donor_replacementGLF_dead6k < bitfieldInsert(donor_replacementGLF_dead6iterationCap + (257.0 > GLF_dead6resolution.y ? 1 : 0), 0, 0, 0));
        if (_GLF_DEAD(false)) {
            _GLF_color = exp(vec4(38.67, -1.5, -3.8, 8.6));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead10iteration = _GLF_FUZZED(ivec4(85158, -17074, -68326, 8497)[1]);
            {
                ;
            }
        }
    }
    if (a.y > a.x) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
            uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(17372u);
            for (int GLF_dead12rows = 2; GLF_dead12rows <= 4; GLF_dead12rows++) {
                for (int GLF_dead12c = 0; GLF_dead12c < GLF_dead2MATRIX_N; GLF_dead12c++) {
                    for (int GLF_dead12r = 0; GLF_dead12r < GLF_dead12rows; GLF_dead12r++) {
                        switch (donor_replacementGLF_dead12matrix_number) {
                            case 0u:
                                GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                break;
                            case 1u:
                                GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                break;
                            case 2u:
                                GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                break;
                            case 3u:
                                GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                break;
                            case 4u:
                                GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                break;
                            case 5u:
                                GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                break;
                            case 6u:
                                GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                break;
                            case 7u:
                                GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                break;
                            case 8u:
                                GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                break;
                        }
                    }
                }
                donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return 1.0;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                _GLF_color = vec4(cos(z), v, -3.5);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    float donor_replacementGLF_dead10c_im = _GLF_FUZZED(ldexp(z, GLF_dead2MATRIX_N));
                    float donor_replacementGLF_dead10c_re = _GLF_FUZZED(float((173312u & uvec2(40923u, 151573u)[0])));
                    int donor_replacementGLF_dead10iteration = _GLF_FUZZED(-41860);
                    int donor_replacementGLF_dead10k = _GLF_FUZZED(10989);
                    float donor_replacementGLF_dead10y = _GLF_FUZZED(inversesqrt((false ? z : pi2)));
                    {
                        if (pi2 * pi2 + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                            ;
                        }
                        float GLF_dead10x_new = pi2 * pi2 - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                        donor_replacementGLF_dead10y = 2.0 * pi2 * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_im;
                        pi2 = GLF_dead10x_new;
                        donor_replacementGLF_dead10iteration++;
                        donor_replacementGLF_dead10k++;
                    }
                }
            }
            return 1.0;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return 1.0;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = asin(dFdyCoarse(_GLF_color));
        }
        z = a.x / a.y;
    } else {
        if (_GLF_DEAD(false)) {
            return 1.0;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead10iteration = _GLF_FUZZED((33830 << (-18275)));
                if (donor_replacementGLF_dead10iteration < bitfieldInsert(GLF_dead2MATRIX_N, 0, 0, 0)) {
                    ;
                } else {
                    ;
                }
            }
        }
        z = a.y / a.x;
    }
    if (_GLF_DEAD(false)) {
        return 1.0;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, sin(0.0))), dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, sin(0.0)))))))) {
        return 1.0;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        int donor_replacementGLF_dead3i = _GLF_FUZZED(bitfieldReverse(GLF_dead2MATRIX_N));
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(tan(0.0)))))) {
                if (_GLF_DEAD(false)) {
                    uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(132889u);
                    for (int GLF_dead12cols = 2; GLF_dead12cols <= 4; GLF_dead12cols++) {
                        for (int GLF_dead12rows = 2; GLF_dead12rows <= 4; GLF_dead12rows++) {
                            for (int GLF_dead12c = 0; GLF_dead12c < GLF_dead12cols; GLF_dead12c++) {
                                for (int GLF_dead12r = 0; GLF_dead12r < GLF_dead12rows; GLF_dead12r++) {
                                    switch (donor_replacementGLF_dead12matrix_number) {
                                        case 0u:
                                            GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                            break;
                                        case 1u:
                                            GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                            break;
                                        case 2u:
                                            GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                            break;
                                        case 3u:
                                            GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                            break;
                                        case 4u:
                                            GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                            break;
                                        case 5u:
                                            GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                            break;
                                        case 6u:
                                            GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                            break;
                                        case 7u:
                                            GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                            break;
                                        case 8u:
                                            GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                            break;
                                    }
                                }
                            }
                            donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return 1.0;
                }
                _GLF_color = GLF_dead9_GLF_color;
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
            return 1.0;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return 1.0;
        }
        {
            int GLF_dead3result = GLF_dead3search(donor_replacementGLF_dead3i);
            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                switch (donor_replacementGLF_dead3i) {
                    case 9:
                    case 5:
                        if (_GLF_DEAD(false)) {
                            return 1.0;
                            if (_GLF_DEAD(false)) {
                                return 1.0;
                            }
                        }
                    case 12:
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(log2(vec3(926.508, 8.7, -5.1)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = GLF_dead9_GLF_color;
                            }
                            vec2 donor_replacementGLF_dead8grid = _GLF_FUZZED(asinh(vec2(448.961, -2.2)));
                            vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED(vec2(pi2));
                            if (donor_replacementGLF_dead8uv.x > (3.0 / 4.0)) {
                                int GLF_dead8count = int(GLF_dead8injectionSwitch.x);
                                do {
                                    donor_replacementGLF_dead8color -= GLF_dead8palette(vec3(float(GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead8injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead8injectionSwitch.x, 0.6, float(GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead8injectionSwitch.x), 10)]) * 0.1));
                                    GLF_dead8count++;
                                } while (GLF_dead8count != GLF_dead8obj.numbers[2]);
                                donor_replacementGLF_dead8grid += vec2(GLF_dead8count + GLF_dead8obj.numbers[3], GLF_dead8count + GLF_dead8obj.numbers[3]);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    float donor_replacementGLF_dead13xCoord = _GLF_FUZZED(dot(vec3(4.0, 63.72, -7778.8481), fma(donor_replacementGLF_dead8color, GLF_dead9polynomial, donor_replacementGLF_dead8color)));
                                    float donor_replacementGLF_dead13yCoord = _GLF_FUZZED(pi2);
                                    {
                                        ;
                                    }
                                }
                            }
                        }
                    case 15:
                    case 7:
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            float donor_replacementGLF_dead9x2 = _GLF_FUZZED(pi2);
                            if (donor_replacementGLF_dead9x2 <= -0.9 && donor_replacementGLF_dead9x2 >= -1.1) {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED((34373u | packUnorm2x16(vec2(-763.583, -726.397))));
                                        for (int GLF_dead12cols = 2; GLF_dead12cols <= 4; GLF_dead12cols++) {
                                            for (int GLF_dead12rows = 2; GLF_dead12rows <= 4; GLF_dead12rows++) {
                                                for (int GLF_dead12c = 0; GLF_dead12c < GLF_dead12cols; GLF_dead12c++) {
                                                    for (int GLF_dead12r = 0; GLF_dead12r < GLF_dead12rows; GLF_dead12r++) {
                                                        switch (donor_replacementGLF_dead12matrix_number) {
                                                            case 0u:
                                                                GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                                break;
                                                            case 1u:
                                                                GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                                break;
                                                            case 2u:
                                                                GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                                break;
                                                            case 3u:
                                                                GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                                break;
                                                            case 4u:
                                                                GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                                break;
                                                            case 5u:
                                                                GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                                break;
                                                            case 6u:
                                                                GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                                break;
                                                            case 7u:
                                                                GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                                break;
                                                            case 8u:
                                                                GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                                break;
                                                        }
                                                    }
                                                }
                                                donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
                                            }
                                        }
                                    }
                                    GLF_dead9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                int donor_replacementGLF_dead10iterationCap = _GLF_FUZZED((_injected_loop_counter << (-37637)));
                                                float donor_replacementGLF_dead10xCoord = _GLF_FUZZED(z);
                                                float donor_replacementGLF_dead10yCoord = _GLF_FUZZED(degrees(-1.6));
                                                if (GLF_dead2MATRIX_N < bitfieldInsert(donor_replacementGLF_dead10iterationCap, 0, 0, 0)) {
                                                    ;
                                                } else {
                                                    ;
                                                }
                                            }
                                            return 1.0;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = vec4(-7231.4378, -8.1, -4.9, 888.862);
                                    }
                                }
                            } else {
                                GLF_dead9_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                if (_GLF_DEAD(false)) {
                                    return 1.0;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return 1.0;
                            }
                        }
                    case 8:
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return 1.0;
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead12cols = _GLF_FUZZED(bitfieldExtract(floatBitsToInt(z), GLF_dead2MATRIX_N, GLF_dead3result));
                            uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(uint(z));
                            {
                                for (int GLF_dead12rows = 2; GLF_dead12rows <= 4; GLF_dead12rows++) {
                                    for (int GLF_dead12c = 0; GLF_dead12c < donor_replacementGLF_dead12cols; GLF_dead12c++) {
                                        for (int GLF_dead12r = 0; GLF_dead12r < GLF_dead12rows; GLF_dead12r++) {
                                            switch (donor_replacementGLF_dead12matrix_number) {
                                                case 0u:
                                                    GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                    break;
                                                case 1u:
                                                    GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                    break;
                                                case 2u:
                                                    GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                    break;
                                                case 3u:
                                                    GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                    break;
                                                case 4u:
                                                    GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                    break;
                                                case 5u:
                                                    GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                    break;
                                                case 6u:
                                                    GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                    break;
                                                case 7u:
                                                    GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                    break;
                                                case 8u:
                                                    GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                    break;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    return 1.0;
                                }
                                vec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(v);
                                vec4 donor_replacementGLF_dead7res = _GLF_FUZZED((injectionSwitch * mat4x2(4293.4380, 838.082, 807.584, -3.8, -3.4, 2038.7789, 5872.2061, -9846.4905)));
                                {
                                    if (GLF_dead7collision(donor_replacementGLF_dead7pos, GLF_dead7picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 8)])) {
                                        if (_GLF_DEAD(false)) {
                                            return 1.0;
                                        }
                                        donor_replacementGLF_dead7res = GLF_dead7pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead7picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 8)].x) * int(GLF_dead7picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 8)].y) + GLF_dead2MATRIX_N * 9 + 11) % 16, 16)];
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead10iteration = _GLF_FUZZED(abs(GLF_dead3result));
                                            {
                                                ;
                                            }
                                        }
                                    }
                                }
                            }
                            _GLF_color = clamp((611.867 + vec4(-4.5, -1506.2623, -5.6, 764.892)), clamp(_GLF_color, z, pi2), vec3(-405.200, -52.34, -1.2).bbrb);
                        }
                    case 2:
                    case 6:
                    case 17:
                    case 13:
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return 1.0;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(92329u);
                            for (int GLF_dead12cols = 2; GLF_dead12cols <= 4; GLF_dead12cols++) {
                                for (int GLF_dead12rows = 2; GLF_dead12rows <= 4; GLF_dead12rows++) {
                                    for (int GLF_dead12c = 0; GLF_dead12c < GLF_dead12cols; GLF_dead12c++) {
                                        for (int GLF_dead12r = 0; GLF_dead12r < GLF_dead12rows; GLF_dead12r++) {
                                            switch (donor_replacementGLF_dead12matrix_number) {
                                                case 0u:
                                                    GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                    break;
                                                case 1u:
                                                    GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                    break;
                                                case 2u:
                                                    GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                    break;
                                                case 3u:
                                                    GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                    break;
                                                case 4u:
                                                    GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                    break;
                                                case 5u:
                                                    GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                    break;
                                                case 6u:
                                                    GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                    break;
                                                case 7u:
                                                    GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                    break;
                                                case 8u:
                                                    GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                    break;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
                                }
                            }
                        }
                        if (GLF_dead3result == donor_replacementGLF_dead3i) {
                            GLF_dead2MATRIX_N++;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            int donor_replacementGLF_dead11i = _GLF_FUZZED(max(GLF_dead3result, GLF_dead2MATRIX_N));
                            if (donor_replacementGLF_dead11i >= int(GLF_dead11resolution.x)) {
                                break;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return 1.0;
                        }
                        break;
                    default:
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(round(v));
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(abs(0.0), 0.0, 1.0, log(1.0))))))) {
                                    return 1.0;
                                }
                                _GLF_color = _GLF_color;
                            }
                            vec4 donor_replacementGLF_dead7quad = _GLF_FUZZED(step(sinh(vec4(-1.4, 406.823, -1.1, 73.10)), _GLF_color));
                            if (donor_replacementGLF_dead7pos.y < donor_replacementGLF_dead7quad.y) {
                                ;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = floor(GLF_dead9_GLF_color);
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead10iterationCap = _GLF_FUZZED(ivec3(46550, -50790, 76019).y);
                                {
                                    donor_replacementGLF_dead10iterationCap += 1;
                                }
                            }
                            return 1.0;
                        }
                        if (GLF_dead3result == -1) {
                            GLF_dead2MATRIX_N++;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead9_GLF_color;
                                }
                                return 1.0;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = ldexp(GLF_dead9_GLF_color, ivec4(-48932, -29607, -37433, 80888));
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead10iterationCap = _GLF_FUZZED(-1119);
                                    {
                                        donor_replacementGLF_dead10iterationCap += 1;
                                    }
                                }
                            } else {
                            }
                        }
                        break;
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead13x = _GLF_FUZZED(pow(z, 59.01));
                            if (donor_replacementGLF_dead13x * donor_replacementGLF_dead13x + pi2 * pi2 > 4.0) {
                                break;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = GLF_dead9_GLF_color;
                        }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = (GLF_dead9_GLF_color + vec4(-8266.5280, -3.7, -8211.8038, 0.0));
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        vec2 donor_replacementGLF_dead7pos = _GLF_FUZZED((85207, a));
        for (GLF_dead2MATRIX_N = 0; GLF_dead2MATRIX_N < 8; GLF_dead2MATRIX_N++) {
            if (GLF_dead7collision(donor_replacementGLF_dead7pos, GLF_dead7picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 8)])) {
                _GLF_color = GLF_dead7pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead7picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 8)].x) * int(GLF_dead7picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 8)].y) + GLF_dead2MATRIX_N * 9 + 11) % 16, 16)];
            }
        }
    }
    float th = (0.97 - 0.19 * z * z) * z * pi2;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(exp(0.0), 0.0, 0.0, 1.0), vec4(0.0, 1.0, 1.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0))))), dot(vec4(exp(0.0), 0.0, 0.0, 1.0), vec4(0.0, 1.0, 1.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0)))))))))) {
        _GLF_color = _GLF_color;
    }
    if (a.y < a.x) {
        if (_GLF_DEAD(false)) {
            _GLF_color = (vec4(504.993, -638.482, -3.9, -5155.9622) * matrixCompMult(mat4(1.4, -5.3, 348.292, 4585.7191, 5.8, 47.65, 474.652, 897.153, 7.4, -551.150, 534.283, -6575.5973, 7470.1873, 8.2, 1.1, 767.638), mat4(306.970, 6002.1795, -9209.8499, -3.1, 9355.4669, 3.1, -2589.0879, 9150.9212, 969.980, 37.79, -62.60, -9425.2002, -1.1, -953.422, 5.3, -9051.9944)));
        }
        th = 0.5 - th;
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return 1.0;
    }
    if (v.x < 0.0) {
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead10iteration = _GLF_FUZZED(GLF_dead2MATRIX_N);
            float donor_replacementGLF_dead10x = _GLF_FUZZED(pi2);
            float donor_replacementGLF_dead10y = _GLF_FUZZED(pi2);
            {
                if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                    ;
                }
                float GLF_dead10x_new = donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + pi2;
                donor_replacementGLF_dead10y = 2.0 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y + th;
                donor_replacementGLF_dead10x = GLF_dead10x_new;
                donor_replacementGLF_dead10iteration++;
                GLF_dead2MATRIX_N++;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(vec2(11.38, 66.60));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = GLF_dead9_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, determinant(mat3(1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)))), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, determinant(mat3(1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0))))))))) {
                    int donor_replacementGLF_dead10iterationCap = _GLF_FUZZED(GLF_dead2MATRIX_N);
                    float donor_replacementGLF_dead10yCoord = _GLF_FUZZED(z);
                    if (GLF_dead2MATRIX_N < bitfieldInsert(donor_replacementGLF_dead10iterationCap, 0, 0, 0)) {
                        ;
                    } else {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        float donor_replacementGLF_dead10xCoord = _GLF_FUZZED(atanh(pi2));
                        float donor_replacementGLF_dead10yCoord = _GLF_FUZZED(pi2);
                        {
                            ;
                        }
                    }
                    return 1.0;
                }
                if (_GLF_DEAD(false)) {
                    {
                        discard;
                    }
                }
            }
            vec4 donor_replacementGLF_dead5res = _GLF_FUZZED(_GLF_color);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec3(0.0, 0.0, 0.0)))))) {
                {
                    ;
                }
            }
            {
                donor_replacementGLF_dead5res = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
            }
        }
        th = 1.0 - th;
    }
    if (v.y < 0.0) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return 1.0;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), mix(float(dot(vec2(1.0, 0.0), vec2(0.0, 1.0))), float(_GLF_FUZZED(-86.29)), bool(false)))))))) {
                float donor_replacementGLF_dead10c_im = _GLF_FUZZED(z);
                float donor_replacementGLF_dead10c_re = _GLF_FUZZED(pi2);
                int donor_replacementGLF_dead10iteration = _GLF_FUZZED(bitfieldExtract(GLF_dead2MATRIX_N, GLF_dead2MATRIX_N, GLF_dead2MATRIX_N));
                int donor_replacementGLF_dead10k = _GLF_FUZZED(1470);
                float donor_replacementGLF_dead10x = _GLF_FUZZED((+pi2));
                float donor_replacementGLF_dead10y = _GLF_FUZZED(sin(8723.6152));
                {
                    if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                        ;
                    }
                    float GLF_dead10x_new = donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                    donor_replacementGLF_dead10y = 2.0 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_im;
                    donor_replacementGLF_dead10x = GLF_dead10x_new;
                    donor_replacementGLF_dead10iteration++;
                    donor_replacementGLF_dead10k++;
                }
            }
            _GLF_color = smoothstep(uintBitsToFloat(20115u), -472.717, _GLF_color);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(6321.6303, 0.4, 4.2, -0.4);
            }
            return 1.0;
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = GLF_dead9_GLF_color;
                }
                _GLF_color = vec4(-5.9, 3.6, -65.48, 281.109);
            }
        }
        th = -th;
    }
    if (_GLF_DEAD(false)) {
        return 1.0;
        if (_GLF_DEAD(false)) {
            {
                discard;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
        _GLF_color = (_GLF_color / fma(v, injectionSwitch, a)[0]);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return 1.0;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    float donor_replacementGLF_dead13c_im = _GLF_FUZZED(distance(th, 8151.2159));
                    float donor_replacementGLF_dead13c_re = _GLF_FUZZED(pi2);
                    float donor_replacementGLF_dead13x = _GLF_FUZZED(intBitsToFloat(4917));
                    float donor_replacementGLF_dead13y = _GLF_FUZZED(th);
                    for (int GLF_dead13k = 0; GLF_dead13k < 1000; GLF_dead13k++) {
                        if (donor_replacementGLF_dead13x * donor_replacementGLF_dead13x + donor_replacementGLF_dead13y * donor_replacementGLF_dead13y > 4.0) {
                            break;
                        }
                        float GLF_dead13x_new = donor_replacementGLF_dead13x * donor_replacementGLF_dead13x - donor_replacementGLF_dead13y * donor_replacementGLF_dead13y + donor_replacementGLF_dead13c_re;
                        donor_replacementGLF_dead13y = 2.0 * donor_replacementGLF_dead13x * donor_replacementGLF_dead13y + donor_replacementGLF_dead13c_im;
                        donor_replacementGLF_dead13x = GLF_dead13x_new;
                        GLF_dead2MATRIX_N++;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead10iterationCap = _GLF_FUZZED((GLF_dead2MATRIX_N % sign(GLF_dead2MATRIX_N)));
                    {
                        donor_replacementGLF_dead10iterationCap += 1;
                    }
                }
                {
                    ;
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return 1.0;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    float donor_replacementGLF_dead10y = _GLF_FUZZED(determinant((vec4(80.70, 4991.4836, -5.7, 1.7), mat4(-934.273, 2119.7754, 900.123, 1.7, -23.30, 69.09, -27.07, 6.4, 10.15, -3247.6119, -19.91, 7673.3713, -5.0, -31.29, -9711.8493, -1.9))));
                    if (z * z + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                        ;
                    }
                }
            }
            return 1.0;
        }
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            return 1.0;
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead9polynomial.ggbg;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(determinant(mat2(0.0, 0.0, 1.0, 0.0)), 0.0, 1.0, 0.0)))))) {
                    for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (false ? _GLF_FUZZED(-24862) : _GLF_IDENTITY(int(7), (int(7)) / 1))))) >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (int(7)) | (int(7)))))); _injected_loop_counter++) {
                        return 1.0;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead13y = _GLF_FUZZED(roundEven(log(6.0)));
                            if (z * z + donor_replacementGLF_dead13y * donor_replacementGLF_dead13y > 4.0) {
                                break;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead10iteration = _GLF_FUZZED(GLF_dead2MATRIX_N);
                        int donor_replacementGLF_dead10iterationCap = _GLF_FUZZED(99016);
                        float donor_replacementGLF_dead10xCoord = _GLF_FUZZED(pi2);
                        float donor_replacementGLF_dead10yCoord = _GLF_FUZZED(log(th));
                        if (donor_replacementGLF_dead10iteration < bitfieldInsert(donor_replacementGLF_dead10iterationCap, 0, 0, 0)) {
                            ;
                        } else {
                            ;
                        }
                    }
                }
            }
            _GLF_color = vec4(310.484, -1.5, 20.76, 36.31);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
            float donor_replacementGLF_dead6c_im = _GLF_FUZZED(pi2);
            int donor_replacementGLF_dead6iteration = _GLF_FUZZED(GLF_dead2MATRIX_N);
            if (_GLF_DEAD(false)) {
                _GLF_color = fwidth(GLF_dead9_GLF_color);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return 1.0;
            }
            int donor_replacementGLF_dead6k = _GLF_FUZZED(((-3619) >> abs(findMSB(169972u))));
            float donor_replacementGLF_dead6x = _GLF_FUZZED(length(vec4(-4.9, 7700.8469, -196.134, 30.39)));
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead9_GLF_color;
            }
            float donor_replacementGLF_dead6y = _GLF_FUZZED((determinant(mat2(2.4, 120.665, -9029.1182, 2.9)) + pi2));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)))))) {
                int donor_replacementGLF_dead13iteration = _GLF_FUZZED(donor_replacementGLF_dead6iteration);
                {
                    ;
                }
            }
            {
                if (donor_replacementGLF_dead6x * donor_replacementGLF_dead6x + donor_replacementGLF_dead6y * donor_replacementGLF_dead6y > 4.0) {
                    ;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = GLF_dead9_GLF_color;
                    }
                }
                float GLF_dead6x_new = donor_replacementGLF_dead6x * donor_replacementGLF_dead6x - donor_replacementGLF_dead6y * donor_replacementGLF_dead6y + th;
                donor_replacementGLF_dead6y = 2.0 * donor_replacementGLF_dead6x * donor_replacementGLF_dead6y + donor_replacementGLF_dead6c_im;
                donor_replacementGLF_dead6x = GLF_dead6x_new;
                donor_replacementGLF_dead6iteration++;
                donor_replacementGLF_dead6k++;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(702.013, -5203.3716, -88.17, -42.91);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                float donor_replacementGLF_dead10yCoord = _GLF_FUZZED(intBitsToFloat(GLF_dead2MATRIX_N));
                {
                    ;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        return 1.0;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(false)) {
            return 1.0;
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return 1.0;
        }
        return 1.0;
    }
    return th;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead0sum = _GLF_FUZZED(ivec4(-70870, 49103, 57196, 84850).r);
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            for (int GLF_dead0target = 0; GLF_dead0target < 20; GLF_dead0target++) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return 1.0;
                }
                int GLF_dead0result = GLF_dead0search(GLF_dead0target);
                if (GLF_dead0result > 0) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return 1.0;
                    }
                    donor_replacementGLF_dead0sum += GLF_dead0result;
                } else {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(1504.6805, -2.1, 1584.2354, 717.633);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                discard;
                            }
                        }
                        vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(dFdxFine(vec3(-480.041, -61.86, -1.8)));
                        vec2 donor_replacementGLF_dead8grid = _GLF_FUZZED((injectionSwitch * a));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead13c_im = _GLF_FUZZED(pi2);
                            float donor_replacementGLF_dead13y = _GLF_FUZZED(pi2);
                            for (int GLF_dead13k = 0; GLF_dead13k < 1000; GLF_dead13k++) {
                                if (z * z + donor_replacementGLF_dead13y * donor_replacementGLF_dead13y > 4.0) {
                                    break;
                                }
                                float GLF_dead13x_new = z * z - donor_replacementGLF_dead13y * donor_replacementGLF_dead13y + z;
                                donor_replacementGLF_dead13y = 2.0 * z * donor_replacementGLF_dead13y + donor_replacementGLF_dead13c_im;
                                z = GLF_dead13x_new;
                                GLF_dead0target++;
                            }
                        }
                        vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED((atan(pi2, pi2) / injectionSwitch));
                        if (donor_replacementGLF_dead8uv.x > (1.0 / 4.0)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(1.9, -835.689, -13.68, -6747.5423);
                            }
                            int GLF_dead8count = int(GLF_dead8injectionSwitch.x);
                            do {
                                donor_replacementGLF_dead8color += GLF_dead8palette(vec3(0.5, float(GLF_dead8obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead8injectionSwitch.y)), vec3(float(GLF_dead8obj.numbers[4]) * 0.1, GLF_dead8injectionSwitch.x, 0.6));
                                GLF_dead8count++;
                            } while (GLF_dead8count != GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead8injectionSwitch.x), 10)]);
                            donor_replacementGLF_dead8grid = vec2(GLF_dead8count + GLF_dead8obj.numbers[8], GLF_dead8count + GLF_dead8obj.numbers[6]);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(29533u);
                        for (int GLF_dead12cols = 2; GLF_dead12cols <= 4; GLF_dead12cols++) {
                            for (int GLF_dead12rows = 2; GLF_dead12rows <= 4; GLF_dead12rows++) {
                                for (int GLF_dead12c = 0; GLF_dead12c < GLF_dead12cols; GLF_dead12c++) {
                                    for (int GLF_dead12r = 0; GLF_dead12r < GLF_dead12rows; GLF_dead12r++) {
                                        switch (donor_replacementGLF_dead12matrix_number) {
                                            case 0u:
                                                GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                break;
                                            case 1u:
                                                GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                break;
                                            case 2u:
                                                GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                break;
                                            case 3u:
                                                GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                break;
                                            case 4u:
                                                GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                break;
                                            case 5u:
                                                GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                break;
                                            case 6u:
                                                GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                break;
                                            case 7u:
                                                GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                break;
                                            case 8u:
                                                GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                break;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead6pab = _GLF_FUZZED(roundEven(-2.9));
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        if (!((donor_replacementGLF_dead6pab < 0.0 && th < 0.0) || (donor_replacementGLF_dead6pab >= 0.0 && th >= 0.0))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = vec4(GLF_dead6resolution, pi2, -2.4);
                            }
                            ;
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = cosh(fwidth(GLF_dead9_GLF_color));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        int donor_replacementGLF_dead13iteration = _GLF_FUZZED(-64596);
                                        float donor_replacementGLF_dead13xCoord = _GLF_FUZZED(floor(pi2));
                                        float donor_replacementGLF_dead13yCoord = _GLF_FUZZED(473.273);
                                        if (donor_replacementGLF_dead13iteration < 1000) {
                                            ;
                                        } else {
                                            ;
                                        }
                                    }
                                }
                                float donor_replacementGLF_dead9A = _GLF_FUZZED(donor_replacementGLF_dead6pab);
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead10c_im = _GLF_FUZZED(length(mat3x2(-2483.7774, 0.5, 78.74, 3187.4973, -2.4, -22.71)[0]));
                                    float donor_replacementGLF_dead10x = _GLF_FUZZED(dFdy(th));
                                    float donor_replacementGLF_dead10y = _GLF_FUZZED(th);
                                    do {
                                        if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                                            break;
                                        }
                                        float GLF_dead10x_new = donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead9A;
                                        donor_replacementGLF_dead10y = 2.0 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_im;
                                        donor_replacementGLF_dead10x = GLF_dead10x_new;
                                        GLF_dead0result++;
                                        donor_replacementGLF_dead0sum++;
                                    } while (donor_replacementGLF_dead0sum < bitfieldInsert(donor_replacementGLF_dead0sum + (257.0 > GLF_dead10resolution.y ? 1 : 0), 0, 0, 0));
                                }
                                float donor_replacementGLF_dead9B = _GLF_FUZZED(z);
                                int donor_replacementGLF_dead9iterations = _GLF_FUZZED(int(111512u));
                                float donor_replacementGLF_dead9temp = _GLF_FUZZED(pi2);
                                float donor_replacementGLF_dead9x0 = _GLF_FUZZED(z);
                                float donor_replacementGLF_dead9x1 = _GLF_FUZZED(z);
                                float donor_replacementGLF_dead9x2 = _GLF_FUZZED((-intBitsToFloat((donor_replacementGLF_dead0sum | GLF_dead0result))));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return 1.0;
                                }
                                {
                                    float GLF_dead9h0 = donor_replacementGLF_dead9x0 - donor_replacementGLF_dead9x2;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = fwidth(_GLF_color);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            return 1.0;
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead12cols = _GLF_FUZZED(71362);
                                                uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(bitfieldReverse(99255u));
                                                int donor_replacementGLF_dead12rows = _GLF_FUZZED(bitCount(GLF_dead0target));
                                                {
                                                    for (int GLF_dead12c = 0; GLF_dead12c < donor_replacementGLF_dead12cols; GLF_dead12c++) {
                                                        for (int GLF_dead12r = 0; GLF_dead12r < donor_replacementGLF_dead12rows; GLF_dead12r++) {
                                                            switch (donor_replacementGLF_dead12matrix_number) {
                                                                case 0u:
                                                                    GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                                    break;
                                                                case 1u:
                                                                    GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                                    break;
                                                                case 2u:
                                                                    GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                                    break;
                                                                case 5u:
                                                                    GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                                    break;
                                                                case 7u:
                                                                    GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                                    break;
                                                                case 8u:
                                                                    GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                                    break;
                                                            }
                                                        }
                                                    }
                                                    donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bvec2(_GLF_IDENTITY(false, false || (false)), true), bvec2(bvec4(bvec2(_GLF_IDENTITY(false, false || (false)), true), false, true))))))) {
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            _GLF_color = trunc(vec4(-4.0, -4.8, -98.85, -7.3));
                                        }
                                    }
                                    float GLF_dead9h1 = donor_replacementGLF_dead9x1 - donor_replacementGLF_dead9x2;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = GLF_dead9_GLF_color;
                                    }
                                    float GLF_dead9k0 = GLF_dead9fx(donor_replacementGLF_dead9x0) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                                    float GLF_dead9k1 = GLF_dead9fx(donor_replacementGLF_dead9x1) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = GLF_dead9_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                break;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead9temp = donor_replacementGLF_dead9x2;
                                    donor_replacementGLF_dead9A = (((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))) / ((((GLF_dead9h0) * (GLF_dead9h0)) * (GLF_dead9h1)) - (((GLF_dead9h1) * (GLF_dead9h1)) * (GLF_dead9h0)));
                                    donor_replacementGLF_dead9B = (((GLF_dead9k0) - (donor_replacementGLF_dead9A * (((GLF_dead9h0) * (GLF_dead9h0))))) / (GLF_dead9h0));
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead12c = _GLF_FUZZED(GLF_dead0target);
                                        uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(113937u);
                                        int donor_replacementGLF_dead12r = _GLF_FUZZED((+donor_replacementGLF_dead9iterations));
                                        {
                                            switch (donor_replacementGLF_dead12matrix_number) {
                                                case 0u:
                                                    GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 2)] = GLF_dead12one;
                                                    break;
                                                case 1u:
                                                    GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 3)] = GLF_dead12one;
                                                    break;
                                                case 2u:
                                                    GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 4)] = GLF_dead12one;
                                                    break;
                                                case 3u:
                                                    GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 2)] = GLF_dead12one;
                                                    break;
                                                case 4u:
                                                    GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 3)] = GLF_dead12one;
                                                    break;
                                                case 5u:
                                                    GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 4)] = GLF_dead12one;
                                                    break;
                                                case 6u:
                                                    GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 2)] = GLF_dead12one;
                                                    break;
                                                case 7u:
                                                    GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 3)] = GLF_dead12one;
                                                    break;
                                                case 8u:
                                                    GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 4)] = GLF_dead12one;
                                                    break;
                                            }
                                        }
                                    }
                                    z = GLF_dead9fx(donor_replacementGLF_dead9x2);
                                    donor_replacementGLF_dead9x2 = donor_replacementGLF_dead9x2 - ((2.0 * z) / (donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(max((donor_replacementGLF_dead9B * donor_replacementGLF_dead9B) - (4.0 * donor_replacementGLF_dead9A * z), 0.0))));
                                    donor_replacementGLF_dead9x0 = donor_replacementGLF_dead9x1;
                                    if (_GLF_DEAD(false)) {
                                        return 1.0;
                                    }
                                    donor_replacementGLF_dead9x1 = donor_replacementGLF_dead9temp;
                                    if (_GLF_DEAD(false)) {
                                        uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(64043u);
                                        for (int GLF_dead12cols = 2; GLF_dead12cols <= 4; GLF_dead12cols++) {
                                            for (int GLF_dead12rows = 2; GLF_dead12rows <= 4; GLF_dead12rows++) {
                                                for (int GLF_dead12c = 0; GLF_dead12c < GLF_dead12cols; GLF_dead12c++) {
                                                    for (int GLF_dead12r = 0; GLF_dead12r < GLF_dead12rows; GLF_dead12r++) {
                                                        switch (donor_replacementGLF_dead12matrix_number) {
                                                            case 0u:
                                                                GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                                break;
                                                            case 1u:
                                                                GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                                break;
                                                            case 2u:
                                                                GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                                break;
                                                            case 3u:
                                                                GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                                break;
                                                            case 4u:
                                                                GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                                break;
                                                            case 5u:
                                                                GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                                break;
                                                            case 6u:
                                                                GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                                break;
                                                            case 7u:
                                                                GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                                break;
                                                            case 8u:
                                                                GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                                break;
                                                        }
                                                    }
                                                }
                                                donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = unpackSnorm4x8(99080u);
                                    }
                                    donor_replacementGLF_dead9iterations++;
                                }
                            }
                        }
                    }
                    switch (GLF_dead0result) {
                        case -1:
                            donor_replacementGLF_dead0sum += 1;
                            break;
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    break;
                                }
                            }
                        case 0:
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = max(unpackSnorm4x8(59833u), GLF_dead9_GLF_color);
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    float donor_replacementGLF_dead10x = _GLF_FUZZED(acosh(z));
                                    float donor_replacementGLF_dead10y = _GLF_FUZZED(pi2);
                                    if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                                        break;
                                    }
                                }
                            }
                            ;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        discard;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = (vec4(759.114, pi2, a) - GLF_dead9_GLF_color);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    float donor_replacementGLF_dead10x = _GLF_FUZZED(-0.3);
                    float donor_replacementGLF_dead10y = _GLF_FUZZED(length(refract(vec4(-7501.7621, 1.2, -63.16, -0.2), vec4(-5.7, 4295.7025, -6.6, -3.3), -5.9)));
                    {
                        donor_replacementGLF_dead10x = 1.0;
                        donor_replacementGLF_dead10y = 1.0;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                discard;
                            }
                        }
                    }
                    return 1.0;
                }
                _GLF_color = (pi2 + _GLF_color);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return 1.0;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            {
                GLF_dead9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            }
        }
        do {
            return 1.0;
            if (_GLF_DEAD(false)) {
                discard;
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead10iterationCap = _GLF_FUZZED((-(-33032)));
                if (0.0 > GLF_dead10resolution.y) {
                    donor_replacementGLF_dead10iterationCap += 1;
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return 1.0;
        }
        int donor_replacementGLF_dead1msb8 = _GLF_FUZZED(-99264);
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = inversesqrt(tan(_GLF_color));
            }
            _GLF_color = vec4(-43.04, -12.63, 70.10, -1804.8264);
        }
        vec2 donor_replacementGLF_dead1pos = _GLF_FUZZED(uintBitsToFloat((uvec2(198865u, 10928u) * 44347u)));
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            _GLF_color = roundEven(GLF_dead9_GLF_color);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            float donor_replacementGLF_dead13c_im = _GLF_FUZZED(exp2(fma(-7.3, -7.6, z)));
            float donor_replacementGLF_dead13c_re = _GLF_FUZZED(intBitsToFloat(donor_replacementGLF_dead1msb8));
            {
                if (th * th + z * z > 4.0) {
                    ;
                }
                float GLF_dead13x_new = th * th - z * z + donor_replacementGLF_dead13c_re;
                z = 2.0 * th * z + donor_replacementGLF_dead13c_im;
                th = GLF_dead13x_new;
                GLF_dead2MATRIX_N++;
            }
        }
        vec3 donor_replacementGLF_dead1setting = _GLF_FUZZED(vec3(24.21, -221.430, 11.59));
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead12c = _GLF_FUZZED(GLF_dead2MATRIX_N);
            uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED((bitfieldInsert(187100u, 138953u, donor_replacementGLF_dead1msb8, donor_replacementGLF_dead1msb8) - 92462u));
            int donor_replacementGLF_dead12rows = _GLF_FUZZED(-86847);
            for (int GLF_dead12r = 0; GLF_dead12r < donor_replacementGLF_dead12rows; GLF_dead12r++) {
                switch (donor_replacementGLF_dead12matrix_number) {
                    case 0u:
                        GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                        break;
                    case 1u:
                        GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                        break;
                    case 2u:
                        GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                        break;
                    case 3u:
                        GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                        break;
                    case 4u:
                        GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                        break;
                    case 5u:
                        GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                        break;
                    case 6u:
                        GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                        break;
                    case 7u:
                        GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                        break;
                    case 8u:
                        GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                        break;
                }
            }
        }
        {
            if (_GLF_DEAD(false)) {
                return 1.0;
                if (_GLF_DEAD(false)) {
                    _GLF_color = unpackSnorm4x8(min(min(88876u, 162649u), 196572u));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        float donor_replacementGLF_dead13yCoord = _GLF_FUZZED((-(-8.4)));
                        {
                            ;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                    vec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(fma((v), injectionSwitch, v));
                    vec4 donor_replacementGLF_dead7quad = _GLF_FUZZED(max(vec4(511.774, 2430.8949, -33.55, -2140.8935), _GLF_color));
                    if (donor_replacementGLF_dead7pos.y > donor_replacementGLF_dead7quad.y + donor_replacementGLF_dead7quad.w) {
                        ;
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                        float donor_replacementGLF_dead13c_im = _GLF_FUZZED(reflect(z, -8.1));
                        float donor_replacementGLF_dead13c_re = _GLF_FUZZED(float(donor_replacementGLF_dead1msb8));
                        int donor_replacementGLF_dead13iteration = _GLF_FUZZED((donor_replacementGLF_dead1msb8 - GLF_dead2MATRIX_N));
                        float donor_replacementGLF_dead13x = _GLF_FUZZED(9.8);
                        for (int GLF_dead13k = 0; GLF_dead13k < 1000; GLF_dead13k++) {
                            if (donor_replacementGLF_dead13x * donor_replacementGLF_dead13x + pi2 * pi2 > 4.0) {
                                break;
                            }
                            float GLF_dead13x_new = donor_replacementGLF_dead13x * donor_replacementGLF_dead13x - pi2 * pi2 + donor_replacementGLF_dead13c_re;
                            pi2 = 2.0 * donor_replacementGLF_dead13x * pi2 + donor_replacementGLF_dead13c_im;
                            donor_replacementGLF_dead13x = GLF_dead13x_new;
                            donor_replacementGLF_dead13iteration++;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = GLF_dead9_GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = vec4(-2378.0488, 8.6, -9.1, 46.66);
                }
                do {
                    if (_GLF_DEAD(false)) {
                        if (z <= -0.9 && z >= -1.1) {
                            GLF_dead9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            if (_GLF_DEAD(false)) {
                                {
                                    break;
                                }
                            }
                        } else {
                            GLF_dead9_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return 1.0;
                }
            }
            ;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(vec2(4695.6349, -84.11), log2(injectionSwitch));
        }
    }
}

vec2 polarize(vec2 coord) {
    vec2 center = coord - vec2(0.5);
    if (_GLF_DEAD(false)) {
        _GLF_color = (mat2x4(-7.1, -2.3, 7465.7689, 5.2, -9359.6979, 2.1, 1961.1885, -7.9) * injectionSwitch);
    }
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead13c_im = _GLF_FUZZED(((+0.1) - (-0.3)));
        float donor_replacementGLF_dead13c_re = _GLF_FUZZED(-980.806);
        int donor_replacementGLF_dead13iteration = _GLF_FUZZED(GLF_dead2MATRIX_N);
        float donor_replacementGLF_dead13x = _GLF_FUZZED(-549.218);
        float donor_replacementGLF_dead13y = _GLF_FUZZED(length(vec3(-45.81, -1.5, 1.6)));
        {
            if (donor_replacementGLF_dead13x * donor_replacementGLF_dead13x + donor_replacementGLF_dead13y * donor_replacementGLF_dead13y > 4.0) {
                ;
            }
            float GLF_dead13x_new = donor_replacementGLF_dead13x * donor_replacementGLF_dead13x - donor_replacementGLF_dead13y * donor_replacementGLF_dead13y + donor_replacementGLF_dead13c_re;
            donor_replacementGLF_dead13y = 2.0 * donor_replacementGLF_dead13x * donor_replacementGLF_dead13y + donor_replacementGLF_dead13c_im;
            donor_replacementGLF_dead13x = GLF_dead13x_new;
            donor_replacementGLF_dead13iteration++;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(vec2(vec3(-7545.5037, 6346.4733, 926.199)));
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead13x = _GLF_FUZZED(min(-9.9, -7.6));
            float donor_replacementGLF_dead13y = _GLF_FUZZED(dFdxFine(-5.0));
            if (donor_replacementGLF_dead13x * donor_replacementGLF_dead13x + donor_replacementGLF_dead13y * donor_replacementGLF_dead13y > 4.0) {
                ;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                float donor_replacementGLF_dead13x = _GLF_FUZZED(distance((1.1 * GLF_dead9_GLF_color), GLF_dead9_GLF_color));
                float donor_replacementGLF_dead13y = _GLF_FUZZED(21.32);
                if (donor_replacementGLF_dead13x * donor_replacementGLF_dead13x + donor_replacementGLF_dead13y * donor_replacementGLF_dead13y > 4.0) {
                    ;
                }
            }
            return vec2(1.0, 1.0);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec2(1.0, 1.0);
        }
        {
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return vec2(1.0, 1.0);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead10iteration = _GLF_FUZZED(GLF_dead2MATRIX_N);
                    {
                        ;
                    }
                }
                return vec2(1.0, 1.0);
            }
            _GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = vec4(-5.5, 89.04, 7.4, -4.1);
                }
                _GLF_color = clamp(GLF_dead9_GLF_color, (injectionSwitch * mat4x2(-518.549, 8736.7150, 9046.2276, -3612.3466, -9477.3322, -6.8, 27.47, 1.2)), fwidth(vec4(-36.41, 1.8, 491.914, -9716.1424)));
            }
        }
    }
    float dist = length(center);
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            return vec2(1.0, 1.0);
            if (_GLF_DEAD(false)) {
                {
                    ;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(vec3(0.6, 519.136, -19.42));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            float donor_replacementGLF_dead10c_im = _GLF_FUZZED(-6.7);
            float donor_replacementGLF_dead10c_re = _GLF_FUZZED(-478.454);
            int donor_replacementGLF_dead10iteration = _GLF_FUZZED(GLF_dead2MATRIX_N);
            int donor_replacementGLF_dead10k = _GLF_FUZZED(abs(bitCount(165743u)));
            float donor_replacementGLF_dead10y = _GLF_FUZZED((-(-6350.6987)));
            do {
                if (dist * dist + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                    break;
                }
                float GLF_dead10x_new = dist * dist - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                donor_replacementGLF_dead10y = 2.0 * dist * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_im;
                dist = GLF_dead10x_new;
                donor_replacementGLF_dead10iteration++;
                donor_replacementGLF_dead10k++;
            } while (donor_replacementGLF_dead10k < bitfieldInsert(GLF_dead2MATRIX_N + (257.0 > GLF_dead10resolution.y ? 1 : 0), 0, 0, 0));
        }
        vec2 donor_replacementGLF_dead8grid = _GLF_FUZZED(vec2(-9.5, 5.6));
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return vec2(1.0, 1.0);
            }
            int GLF_dead8count = int(GLF_dead8injectionSwitch.x);
            do {
                donor_replacementGLF_dead8color += GLF_dead8palette(vec3(0.5, float(GLF_dead8obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead8injectionSwitch.y)), vec3(float(GLF_dead8obj.numbers[4]) * 0.1, GLF_dead8injectionSwitch.x, 0.6));
                GLF_dead8count++;
            } while (GLF_dead8count != GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead8injectionSwitch.x), 10)]);
            donor_replacementGLF_dead8grid = vec2(GLF_dead8count + GLF_dead8obj.numbers[8], GLF_dead8count + GLF_dead8obj.numbers[6]);
            if (_GLF_DEAD(false)) {
                {
                    ;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return vec2(1.0, 1.0);
    }
    float angle = ReallyApproxNormalizedAtan2(center);
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_dead9_GLF_color;
    }
    return vec2(dist, angle);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = vec4(-0.2, -553.214, -28.28, 3.2);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = sign(dFdyFine(vec4(2.3, 4.2, -5.9, -129.453)));
    }
}

void main() {
    vec2 coord = gl_FragCoord.xy * (1.0 / 256.0);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(2.5, 15.46, 6223.1718, -147.383);
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead2alpha1 = _GLF_FUZZED(4055.4511);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-61.42, -4.7, -8767.8600, 936.882);
                }
                return;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            vec4 donor_replacementGLF_dead2matrix_u = _GLF_FUZZED(_GLF_color);
            int donor_replacementGLF_dead2u = _GLF_FUZZED((~69673));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                float donor_replacementGLF_dead13c_im = _GLF_FUZZED(determinant(mat2(-1.6, -960.915, 8909.6360, 217.739)));
                float donor_replacementGLF_dead13c_re = _GLF_FUZZED(-18.12);
                int donor_replacementGLF_dead13iteration = _GLF_FUZZED(GLF_dead2MATRIX_N);
                float donor_replacementGLF_dead13x = _GLF_FUZZED(9929.1551);
                float donor_replacementGLF_dead13y = _GLF_FUZZED(trunc(donor_replacementGLF_dead2alpha1));
                for (int GLF_dead13k = 0; GLF_dead13k < 1000; GLF_dead13k++) {
                    if (donor_replacementGLF_dead13x * donor_replacementGLF_dead13x + donor_replacementGLF_dead13y * donor_replacementGLF_dead13y > 4.0) {
                        break;
                    }
                    float GLF_dead13x_new = donor_replacementGLF_dead13x * donor_replacementGLF_dead13x - donor_replacementGLF_dead13y * donor_replacementGLF_dead13y + donor_replacementGLF_dead13c_re;
                    donor_replacementGLF_dead13y = 2.0 * donor_replacementGLF_dead13x * donor_replacementGLF_dead13y + donor_replacementGLF_dead13c_im;
                    donor_replacementGLF_dead13x = GLF_dead13x_new;
                    donor_replacementGLF_dead13iteration++;
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return;
                    }
                } else {
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (GLF_dead9_GLF_color - (-9.4));
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            {
                                discard;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    return;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (false)))) {
                        return;
                    }
                }
                donor_replacementGLF_dead2alpha1 += donor_replacementGLF_dead2matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2u, 4)] * donor_replacementGLF_dead2matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2u, 4)];
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        do {
            if (_GLF_DEAD(false)) {
                return;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = min(_GLF_color, _GLF_color);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            return;
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = sqrt(_GLF_color);
                }
                return;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = vec4(31.44, 2.5, 0.9, -72.04);
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead9_GLF_color;
            }
        } else {
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                return;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                float donor_replacementGLF_dead6pab = _GLF_FUZZED(2.1);
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return;
                    }
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
                float donor_replacementGLF_dead6pca = _GLF_FUZZED(cosh(4.6));
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead12_GLF_color = vec4(vec3(0.0), 1.0);
                        }
                    }
                }
                if (!((donor_replacementGLF_dead6pab < 0.0 && donor_replacementGLF_dead6pca < 0.0) || (donor_replacementGLF_dead6pab >= 0.0 && donor_replacementGLF_dead6pca >= 0.0))) {
                    ;
                }
            }
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(vec3(-2172.8375, 2.8, 2.0));
                    int donor_replacementGLF_dead8count = _GLF_FUZZED(GLF_dead2MATRIX_N);
                    do {
                        donor_replacementGLF_dead8color -= GLF_dead8palette(vec3(float(GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead8injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead8injectionSwitch.x, 0.6, float(GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead8injectionSwitch.x), 10)]) * 0.1));
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                            if (_GLF_DEAD(false)) {
                                {
                                    break;
                                }
                            }
                            break;
                        }
                        donor_replacementGLF_dead8count++;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = GLF_dead9_GLF_color;
                        }
                        do {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    } while (donor_replacementGLF_dead8count != GLF_dead8obj.numbers[2]);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    float donor_replacementGLF_dead13xCoord = _GLF_FUZZED(((-4.7) + (-4.6)));
                    float donor_replacementGLF_dead13yCoord = _GLF_FUZZED(-48.82);
                    {
                        ;
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(false)) {
                _GLF_color = mat2x4(-64.51, 421.419, -1466.4137, 99.72, 79.97, 0.2, -202.218, -33.22)[0];
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(_GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 1.0, 0.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 1.0, 0.0, 0.0)))))))) {
                    return;
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        _GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead2alpha3 = _GLF_FUZZED(-5.8);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = (false ? vec4(donor_replacementGLF_dead2alpha3, 3.4, donor_replacementGLF_dead2alpha3, -59.09) : _GLF_color);
            }
            int donor_replacementGLF_dead2j = _GLF_FUZZED((~90322));
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            ;
                        }
                    }
                    return;
                }
                _GLF_color = vec4(-6.0, -1.9, -8.8, -6047.1380);
            }
            int donor_replacementGLF_dead2k = _GLF_FUZZED(12059);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        _GLF_color = vec4(571.277, -106.935, -9510.0723, 8908.6281);
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = cosh(_GLF_color);
                        }
                        {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = fma(_GLF_color, _GLF_color, GLF_dead9_GLF_color);
                            }
                            ;
                        }
                    }
                }
                int donor_replacementGLF_dead3count = _GLF_FUZZED(abs(GLF_dead2MATRIX_N));
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-2.2, (mat4x3(568.618, 219.460, 7.4, 71.36, 874.083, -9.8, 3.5, -2.4, 9.7, -737.523, -7927.2743, 9.4) * vec4(-4.2, -440.895, -3.3, -4185.9164))).qtts;
                }
                int donor_replacementGLF_dead3i = _GLF_FUZZED(donor_replacementGLF_dead2k);
                if (GLF_dead2MATRIX_N == donor_replacementGLF_dead3i) {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bvec3(false, true, false), bvec3(bvec4(bvec3(false, true, false), false))))))) {
                            int donor_replacementGLF_dead13iteration = _GLF_FUZZED(donor_replacementGLF_dead3i);
                            float donor_replacementGLF_dead13xCoord = _GLF_FUZZED(donor_replacementGLF_dead2alpha3);
                            float donor_replacementGLF_dead13yCoord = _GLF_FUZZED(donor_replacementGLF_dead2alpha3);
                            if (donor_replacementGLF_dead13iteration < 1000) {
                                ;
                            } else {
                                ;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(59.20, -69.63, -4.1, 25.56);
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(181774u);
                            for (int GLF_dead12cols = 2; GLF_dead12cols <= 4; GLF_dead12cols++) {
                                for (int GLF_dead12rows = 2; GLF_dead12rows <= 4; GLF_dead12rows++) {
                                    for (int GLF_dead12c = 0; GLF_dead12c < GLF_dead12cols; GLF_dead12c++) {
                                        for (int GLF_dead12r = 0; GLF_dead12r < GLF_dead12rows; GLF_dead12r++) {
                                            switch (donor_replacementGLF_dead12matrix_number) {
                                                case 0u:
                                                    GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                    break;
                                                case 1u:
                                                    GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                    break;
                                                case 2u:
                                                    GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                    break;
                                                case 3u:
                                                    GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                    break;
                                                case 4u:
                                                    GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                    break;
                                                case 5u:
                                                    GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                    break;
                                                case 6u:
                                                    GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                                    break;
                                                case 7u:
                                                    GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                                    break;
                                                case 8u:
                                                    GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                                    break;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
                                }
                            }
                        }
                    }
                    donor_replacementGLF_dead3count++;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(vec3(516.062, 4.6, 1415.5077));
                    if (_GLF_DEAD(false)) {
                        return;
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead10xCoord = _GLF_FUZZED(dFdy(donor_replacementGLF_dead2alpha3));
                            float donor_replacementGLF_dead10yCoord = _GLF_FUZZED(-7.5);
                            {
                                ;
                            }
                        }
                    }
                    vec2 donor_replacementGLF_dead8grid = _GLF_FUZZED(unpackUnorm2x16(170692u));
                    vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED(normalize(coord));
                    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        if (donor_replacementGLF_dead8uv.x > (1.0 / 4.0)) {
                            int GLF_dead8count = int(GLF_dead8injectionSwitch.x);
                            do {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                donor_replacementGLF_dead8color += GLF_dead8palette(vec3(0.5, float(GLF_dead8obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead8injectionSwitch.y)), vec3(float(GLF_dead8obj.numbers[4]) * 0.1, GLF_dead8injectionSwitch.x, 0.6));
                                GLF_dead8count++;
                            } while (GLF_dead8count != GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead8injectionSwitch.x), 10)]);
                            donor_replacementGLF_dead8grid = vec2(GLF_dead8count + GLF_dead8obj.numbers[8], GLF_dead8count + GLF_dead8obj.numbers[6]);
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            mat4 donor_replacementGLF_dead2matrix_a = _GLF_FUZZED((0.0 / mat4(-1.8, 1057.9389, 709.335, 8.6, 362.185, 497.145, -5.1, -903.608, 109.302, -1.5, -9.5, 0.1, -4.9, -6.3, 5.9, -3290.6657)));
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = unpackSnorm4x8(uint(7.1));
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead10c_re = _GLF_FUZZED((-ldexp(8.5, donor_replacementGLF_dead2j)));
                            int donor_replacementGLF_dead10iteration = _GLF_FUZZED(ivec2(-57679, 41004)[1]);
                            int donor_replacementGLF_dead10iterationCap = _GLF_FUZZED((ivec4(24059, -7655, -92036, 31736) << GLF_dead2MATRIX_N)[1]);
                            float donor_replacementGLF_dead10x = _GLF_FUZZED(donor_replacementGLF_dead2alpha3);
                            float donor_replacementGLF_dead10y = _GLF_FUZZED(-288.726);
                            do {
                                if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                                    break;
                                }
                                float GLF_dead10x_new = donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                                donor_replacementGLF_dead10y = 2.0 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y + donor_replacementGLF_dead2alpha3;
                                donor_replacementGLF_dead10x = GLF_dead10x_new;
                                donor_replacementGLF_dead10iteration++;
                                donor_replacementGLF_dead2k++;
                            } while (donor_replacementGLF_dead2k < bitfieldInsert(donor_replacementGLF_dead10iterationCap + (257.0 > GLF_dead10resolution.y ? 1 : 0), 0, 0, 0));
                        }
                        return;
                    }
                    return;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                return;
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = unpackUnorm4x8(floatBitsToUint(9.7));
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            if (_GLF_DEAD(false)) {
                return;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(abs(0.0)))))) {
                    int donor_replacementGLF_dead6iteration = _GLF_FUZZED(donor_replacementGLF_dead2k);
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead10iterationCap = _GLF_FUZZED(GLF_dead2MATRIX_N);
                        if (0.0 > GLF_dead10resolution.y) {
                            donor_replacementGLF_dead10iterationCap += 1;
                        }
                    }
                    int donor_replacementGLF_dead6iterationCap = _GLF_FUZZED(((-donor_replacementGLF_dead2j) % GLF_dead2MATRIX_N));
                    float donor_replacementGLF_dead6xCoord = _GLF_FUZZED(radians(5162.1005));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead12c = _GLF_FUZZED(-83240);
                        uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(clamp(26802u, (16707u << 10644u), 99904u));
                        int donor_replacementGLF_dead12r = _GLF_FUZZED(-80818);
                        {
                            switch (donor_replacementGLF_dead12matrix_number) {
                                case 0u:
                                    GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 2)] = GLF_dead12one;
                                    break;
                                case 1u:
                                    GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 3)] = GLF_dead12one;
                                    break;
                                case 2u:
                                    GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 4)] = GLF_dead12one;
                                    break;
                                case 3u:
                                    GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 2)] = GLF_dead12one;
                                    break;
                                case 4u:
                                    GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 3)] = GLF_dead12one;
                                    break;
                                case 5u:
                                    GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 4)] = GLF_dead12one;
                                    break;
                                case 6u:
                                    GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 2)] = GLF_dead12one;
                                    break;
                                case 7u:
                                    GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 3)] = GLF_dead12one;
                                    break;
                                case 8u:
                                    GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12r, 4)] = GLF_dead12one;
                                    break;
                            }
                        }
                    }
                    float donor_replacementGLF_dead6yCoord = _GLF_FUZZED(donor_replacementGLF_dead2alpha3);
                    if (donor_replacementGLF_dead6iteration < bitfieldInsert(donor_replacementGLF_dead6iterationCap, 0, 0, 0)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead11i = _GLF_FUZZED(GLF_dead2MATRIX_N);
                                if (donor_replacementGLF_dead11i < int(GLF_dead11gl_FragCoord.x)) {
                                    ;
                                }
                            }
                        }
                        ;
                    } else {
                        ;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            for (int GLF_dead2a = GLF_dead2MATRIX_N - 1; GLF_dead2a >= donor_replacementGLF_dead2k; GLF_dead2a--) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead10x = _GLF_FUZZED(donor_replacementGLF_dead2alpha3);
                    float donor_replacementGLF_dead10y = _GLF_FUZZED(donor_replacementGLF_dead2alpha3);
                    if (0.0 > GLF_dead10resolution.x) {
                        donor_replacementGLF_dead10x = 1.0;
                        donor_replacementGLF_dead10y = 1.0;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = (_GLF_color / (-1481.6955));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead12c = _GLF_FUZZED(findLSB(50865));
                            uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(floatBitsToUint(log2(roundEven(372.447))));
                            int donor_replacementGLF_dead12rows = _GLF_FUZZED(bitfieldInsert(donor_replacementGLF_dead2j, GLF_dead2a, GLF_dead2a, -30954));
                            {
                                for (int GLF_dead12r = 0; GLF_dead12r < donor_replacementGLF_dead12rows; GLF_dead12r++) {
                                    switch (donor_replacementGLF_dead12matrix_number) {
                                        case 0u:
                                            GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                            break;
                                        case 1u:
                                            GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                            break;
                                        case 2u:
                                            GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                            break;
                                        case 3u:
                                            GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                            break;
                                        case 4u:
                                            GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                            break;
                                        case 5u:
                                            GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                            break;
                                        case 6u:
                                            GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                            break;
                                        case 7u:
                                            GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                            break;
                                        case 8u:
                                            GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                            break;
                                    }
                                }
                            }
                        }
                        _GLF_color = ldexp(GLF_dead9_GLF_color, ivec4(19900, 64273, 37513, -2131));
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = vec4(8.5, 0.7, 5439.3291, 2010.9972);
                }
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_IDENTITY(false, true && (false)), (_GLF_IDENTITY(false, true && (false))) && true))) {
                    vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(vec3(0.8, -3647.4634, 61.45));
                    int donor_replacementGLF_dead8count = _GLF_FUZZED(GLF_dead2MATRIX_N);
                    do {
                        donor_replacementGLF_dead8color -= GLF_dead8palette(vec3(float(GLF_dead8obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead8injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead8injectionSwitch.x, float(GLF_dead8obj.numbers[2]) * 0.1, float(GLF_dead8obj.numbers[8]) * 0.1));
                        donor_replacementGLF_dead8count++;
                    } while (donor_replacementGLF_dead8count != GLF_dead8obj.numbers[1]);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = mix(intBitsToFloat(ivec4(-48668, -71092, 5886, 63945)), sign(_GLF_color), -2.2);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                break;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                }
                donor_replacementGLF_dead2alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2a, 4)] * donor_replacementGLF_dead2matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2j, 4)];
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                do {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            GLF_dead9_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(false)) {
                    _GLF_color = intBitsToFloat(ivec2(61322, 74149)).rgrg;
                }
                if (_GLF_DEAD(false)) {
                    discard;
                }
            }
            if (_GLF_DEAD(false)) {
                uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED((mat4(85.88, -707.144, -0.3, -2.9, -8.0, 3.0, -7.5, 7.4, 5.5, -72.73, 2.0, -2125.2905, -1.7, -1.4, -2737.8341, -3810.1094), 176621u));
                for (int GLF_dead12cols = 2; GLF_dead12cols <= 4; GLF_dead12cols++) {
                    for (int GLF_dead12rows = 2; GLF_dead12rows <= 4; GLF_dead12rows++) {
                        for (int GLF_dead12c = 0; GLF_dead12c < GLF_dead12cols; GLF_dead12c++) {
                            for (int GLF_dead12r = 0; GLF_dead12r < GLF_dead12rows; GLF_dead12r++) {
                                switch (donor_replacementGLF_dead12matrix_number) {
                                    case 0u:
                                        GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                        break;
                                    case 1u:
                                        GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                        break;
                                    case 2u:
                                        GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                        break;
                                    case 3u:
                                        GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                        break;
                                    case 4u:
                                        GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                        break;
                                    case 5u:
                                        GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                        break;
                                    case 6u:
                                        GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                        break;
                                    case 7u:
                                        GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                        break;
                                    case 8u:
                                        GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                        break;
                                }
                            }
                        }
                        donor_replacementGLF_dead12matrix_number = donor_replacementGLF_dead12matrix_number + 1u;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead12cols = _GLF_FUZZED(bitfieldExtract((ivec3(6193, 40777, 28166) | ivec3(-34898, 68330, 48790)).t, -24022, findLSB(GLF_dead2MATRIX_N)));
                    uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(187821u);
                    int donor_replacementGLF_dead12rows = _GLF_FUZZED((GLF_dead2MATRIX_N * 91867));
                    for (int GLF_dead12c = 0; GLF_dead12c < donor_replacementGLF_dead12cols; GLF_dead12c++) {
                        for (int GLF_dead12r = 0; GLF_dead12r < donor_replacementGLF_dead12rows; GLF_dead12r++) {
                            switch (donor_replacementGLF_dead12matrix_number) {
                                case 0u:
                                    GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                    break;
                                case 1u:
                                    GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                    break;
                                case 2u:
                                    GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                    break;
                                case 3u:
                                    GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                    break;
                                case 4u:
                                    GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                    break;
                                case 5u:
                                    GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                    break;
                                case 6u:
                                    GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                    break;
                                case 7u:
                                    GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                    break;
                                case 8u:
                                    GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                    break;
                            }
                        }
                    }
                }
                {
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    ;
                }
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 | (0 << _GLF_IDENTITY(int(7), int(7))))); _injected_loop_counter--) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (donor_replacementGLF_dead2alpha3 - (vec4(683.147, -2923.1223, 3.1, 7661.8097) * mat4(-35.63, 8.2, 0.0, -1.4, 1.5, -8.6, -2326.9499, 730.963, 775.877, 230.863, 376.984, -4.9, 46.57, -7.7, -3.9, -8.4)));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    uint donor_replacementGLF_dead12matrix_number = _GLF_FUZZED(158759u);
                    int donor_replacementGLF_dead12rows = _GLF_FUZZED((ivec2(72871, -2002)[0] >> GLF_dead2MATRIX_N));
                    {
                        for (int GLF_dead12r = 0; GLF_dead12r < donor_replacementGLF_dead12rows; GLF_dead12r++) {
                            switch (donor_replacementGLF_dead12matrix_number) {
                                case 0u:
                                    GLF_dead12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                    break;
                                case 1u:
                                    GLF_dead12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                    break;
                                case 2u:
                                    GLF_dead12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                    break;
                                case 3u:
                                    GLF_dead12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                    break;
                                case 4u:
                                    GLF_dead12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                    break;
                                case 5u:
                                    GLF_dead12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                    break;
                                case 6u:
                                    GLF_dead12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 2)] = GLF_dead12one;
                                    break;
                                case 7u:
                                    GLF_dead12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 3)] = GLF_dead12one;
                                    break;
                                case 8u:
                                    GLF_dead12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12r, 4)] = GLF_dead12one;
                                    break;
                            }
                        }
                    }
                }
                _GLF_color = _GLF_color;
            }
            return;
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead10xCoord = _GLF_FUZZED(GLF_dead9_GLF_color.x);
                    float donor_replacementGLF_dead10yCoord = _GLF_FUZZED(max(-9.5, 454.783));
                    {
                        ;
                    }
                }
                return;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = mat2x4(-94.57, -38.18, 783.639, 978.489, 84.97, 286.795, -610.720, 30.24)[0];
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
        }
    }
    vec2 coord1 = polarize(coord + vec2(20.0 / 256.0, -80.0 / 256.0));
    vec2 coord2 = polarize(coord + vec2(-60.0 / 256.0, 40.0 / 256.0));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                float donor_replacementGLF_dead10c_im = _GLF_FUZZED(-217.399);
                float donor_replacementGLF_dead10c_re = _GLF_FUZZED(dFdx(distance(-70.94, 8.0)));
                int donor_replacementGLF_dead10iteration = _GLF_FUZZED(-90495);
                int donor_replacementGLF_dead10iterationCap = _GLF_FUZZED(GLF_dead2MATRIX_N);
                int donor_replacementGLF_dead10k = _GLF_FUZZED(ivec2(-17961, 66216).y);
                float donor_replacementGLF_dead10x = _GLF_FUZZED(-61.34);
                float donor_replacementGLF_dead10y = _GLF_FUZZED(dFdx(-5253.7548));
                do {
                    if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                        break;
                    }
                    float GLF_dead10x_new = donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                    donor_replacementGLF_dead10y = 2.0 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_im;
                    donor_replacementGLF_dead10x = GLF_dead10x_new;
                    donor_replacementGLF_dead10iteration++;
                    donor_replacementGLF_dead10k++;
                } while (donor_replacementGLF_dead10k < bitfieldInsert(donor_replacementGLF_dead10iterationCap + (257.0 > GLF_dead10resolution.y ? 1 : 0), 0, 0, 0));
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead9_GLF_color;
            }
            float donor_replacementGLF_dead9A = _GLF_FUZZED(55.17);
            float donor_replacementGLF_dead9B = _GLF_FUZZED(-933.677);
            float donor_replacementGLF_dead9C = _GLF_FUZZED(abs(3.1));
            if (_GLF_DEAD(false)) {
                return;
            }
            float donor_replacementGLF_dead9temp = _GLF_FUZZED(acos(sqrt(6.3)));
            float donor_replacementGLF_dead9x0 = _GLF_FUZZED(466.888);
            float donor_replacementGLF_dead9x1 = _GLF_FUZZED(dot(_GLF_color, _GLF_color));
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(donor_replacementGLF_dead9C, GLF_dead9polynomial);
            }
            float donor_replacementGLF_dead9x2 = _GLF_FUZZED(263.377);
            {
                float GLF_dead9h0 = donor_replacementGLF_dead9x0 - donor_replacementGLF_dead9x2;
                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(_GLF_IDENTITY(false, !(!(false)))))))) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        float donor_replacementGLF_dead13xCoord = _GLF_FUZZED(409.610);
                        float donor_replacementGLF_dead13yCoord = _GLF_FUZZED(mod(donor_replacementGLF_dead9C, donor_replacementGLF_dead9temp));
                        {
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                float GLF_dead9h1 = donor_replacementGLF_dead9x1 - donor_replacementGLF_dead9x2;
                float GLF_dead9k0 = GLF_dead9fx(donor_replacementGLF_dead9x0) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                float GLF_dead9k1 = GLF_dead9fx(donor_replacementGLF_dead9x1) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                if (_GLF_DEAD(false)) {
                    return;
                }
                donor_replacementGLF_dead9temp = donor_replacementGLF_dead9x2;
                donor_replacementGLF_dead9A = (((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))) / ((((GLF_dead9h0) * (GLF_dead9h0)) * (GLF_dead9h1)) - (((GLF_dead9h1) * (GLF_dead9h1)) * (GLF_dead9h0)));
                donor_replacementGLF_dead9B = (((GLF_dead9k0) - (donor_replacementGLF_dead9A * (((GLF_dead9h0) * (GLF_dead9h0))))) / (GLF_dead9h0));
                donor_replacementGLF_dead9C = GLF_dead9fx(donor_replacementGLF_dead9x2);
                do {
                    donor_replacementGLF_dead9x2 = donor_replacementGLF_dead9x2 - ((2.0 * donor_replacementGLF_dead9C) / (donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(max((donor_replacementGLF_dead9B * donor_replacementGLF_dead9B) - (4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C), 0.0))));
                } while (_GLF_WRAPPED_LOOP(false));
                donor_replacementGLF_dead9x0 = donor_replacementGLF_dead9x1;
                donor_replacementGLF_dead9x1 = donor_replacementGLF_dead9temp;
                GLF_dead2MATRIX_N++;
            }
        }
        return;
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead7i = _GLF_FUZZED(93337);
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(4.4, -66.46, 8.4, -39.94);
            }
            vec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(coord2);
            vec4 donor_replacementGLF_dead7res = _GLF_FUZZED(mix(vec4(4.3, 40.40, -1.2, 57.17), vec4(-774.171, 9785.3503, -7.1, -49.40), dFdyCoarse(vec4(34.96, -8.0, 5582.1574, 1542.6583))));
            {
                if (GLF_dead7collision(donor_replacementGLF_dead7pos, GLF_dead7picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 8)])) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    donor_replacementGLF_dead7res = GLF_dead7pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead7picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 8)].x) * int(GLF_dead7picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 8)].y) + donor_replacementGLF_dead7i * 9 + 11) % 16, 16)];
                }
            }
        }
        do {
            return;
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    }
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead13x = _GLF_FUZZED(801.494);
        float donor_replacementGLF_dead13y = _GLF_FUZZED(log2(-540.109));
        if (donor_replacementGLF_dead13x * donor_replacementGLF_dead13x + donor_replacementGLF_dead13y * donor_replacementGLF_dead13y > 4.0) {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            {
                ;
            }
        }
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(false)) {
            return;
        }
        _GLF_color = vec4(-408.134, -6.2, 9789.9723, 5.5);
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec3(false, true, true)), false || (bool(bvec3(false, true, true))))))) {
            {
                ;
            }
        }
        return;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                return;
            }
            return;
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead9_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = GLF_dead9_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        return;
    }
    vec2 coord3 = polarize(coord);
    coord = coord1 - coord2 + coord3;
    coord = floor(coord * 256.0) / 256.0;
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(false)) {
        vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(refract(log2(vec3(75.34, 1.6, 9.8)), vec3(-9.1, 0.8, 8.5), -14.22));
        int donor_replacementGLF_dead8count = _GLF_FUZZED(21377);
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(4.3);
        }
        do {
            donor_replacementGLF_dead8color -= GLF_dead8palette(vec3(float(GLF_dead8obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead8injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead8injectionSwitch.x, float(GLF_dead8obj.numbers[2]) * 0.1, float(GLF_dead8obj.numbers[8]) * 0.1));
            if (_GLF_DEAD(false)) {
                {
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = mat3x4(-8970.4709, 27.18, -101.472, 2.6, 7.8, 669.622, -50.99, 48.35, 2.7, -9.6, 61.36, -5521.7510)[2];
            }
            donor_replacementGLF_dead8count++;
        } while (donor_replacementGLF_dead8count != GLF_dead8obj.numbers[1]);
    }
    _GLF_color = vec4(texture(tex, coord).xyz, 1.0);
}
