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
vec4 GLF_dead22_GLF_color = _GLF_FUZZED(vec4(360.008, -29.21, 9.9, 602.831));

layout(set = 0, binding = 2) uniform buf2 {
    vec3 GLF_dead22polynomial;
};

float GLF_dead22fx(float GLF_dead22x) {
    return GLF_dead22polynomial.x * pow(GLF_dead22x, 2.0) + GLF_dead22polynomial.y * GLF_dead22x + GLF_dead22polynomial.z;
}

vec4 GLF_dead23gl_FragCoord = _GLF_FUZZED(vec4(-98.38, -32.72, 8.2, 26.68));
vec4 GLF_dead21_GLF_color = _GLF_FUZZED(vec4(-1.9, float(76775u), vec2(-845.101, 6.5)));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead21injectionSwitch;
};

float GLF_dead21compute_derivative_x(float GLF_dead21v) {
    return dFdx(GLF_dead21v) * GLF_dead21injectionSwitch.y;
}

float GLF_dead21compute_derivative_y(float GLF_dead21v) {
    return dFdy(GLF_dead21v) * GLF_dead21injectionSwitch.y;
}

float GLF_dead21compute_stripe(float GLF_dead21v) {
    return smoothstep(-.9, 1., (GLF_dead21v) / ((GLF_dead21injectionSwitch.y > GLF_dead21injectionSwitch.x) ? GLF_dead21compute_derivative_x(GLF_dead21v) : GLF_dead21compute_derivative_y(GLF_dead21v)));
}

vec4 GLF_dead18gl_FragCoord = _GLF_FUZZED((true ? (mat2x4(0.2, -1.9, 2916.5303, -613.884, 2.2, 3.2, -580.465, -26.72) * vec2(8.0, 7.9)) : vec4(-2961.8963, 1914.6512, -6665.4326, -99.06)));
const int GLF_dead18N = 10;
int GLF_dead18data[10] = int[10](_GLF_FUZZED((+29741)), _GLF_FUZZED(int(((-20281) == (-20597)))), _GLF_FUZZED(5468), _GLF_FUZZED(59635), _GLF_FUZZED(38761), _GLF_FUZZED(((-712) & (-46760))), _GLF_FUZZED((-(false ? (-43476) : 7744))), _GLF_FUZZED(ivec4(81509, -15370, -52524, 97609).q), _GLF_FUZZED(86033), _GLF_FUZZED((int(false) + ivec2(-71322, -31186)).y)), GLF_dead18temp[10] = int[10](_GLF_FUZZED(int(870u)), _GLF_FUZZED(ivec2(47610, -12021).g), _GLF_FUZZED(((true ? ivec4(-37669, -88813, 4653, -41606).t : (-60705)) * 37694)), _GLF_FUZZED((+1184)), _GLF_FUZZED(-26853), _GLF_FUZZED(-21724), _GLF_FUZZED((-(true ? (50945 & (-58539)) : (-87717)))), _GLF_FUZZED(7232), _GLF_FUZZED((67911 | int(uint(-27876)))), _GLF_FUZZED(ivec3(ivec2(-2334, 37307), (-(-37059))).p));

void GLF_dead18merge(int GLF_dead18from, int GLF_dead18mid, int GLF_dead18to) {
    int GLF_dead18k = GLF_dead18from, GLF_dead18i = GLF_dead18from, GLF_dead18j = GLF_dead18mid + 1;
    while (GLF_dead18i <= GLF_dead18mid && GLF_dead18j <= GLF_dead18to) {
        if (GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i, 10)] < GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 10)]) {
            GLF_dead18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18k++, 10)] = GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i++, 10)];
        } else {
            GLF_dead18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18k++, 10)] = GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j++, 10)];
        }
    }
    while (GLF_dead18i < GLF_dead18N && GLF_dead18i <= GLF_dead18mid) {
        GLF_dead18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18k++, 10)] = GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i++, 10)];
    }
    for (int GLF_dead18i = GLF_dead18from; GLF_dead18i <= GLF_dead18to; GLF_dead18i++) {
        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i, 10)] = GLF_dead18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i, 10)];
    }
}

struct GLF_dead19QuicksortObject {
    int numbers[10];
};

GLF_dead19QuicksortObject GLF_dead19obj = GLF_dead19QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead19swap(int GLF_dead19i, int GLF_dead19j) {
    int GLF_dead19temp = GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 10)];
    GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 10)] = GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 10)];
    GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 10)] = GLF_dead19temp;
}

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_live15injectionSwitch;
};

struct _GLF_struct_31 {
    vec2 _f0;
    mat3 _f1;
    float _f2;
    mat2 _f3;
    vec3 _f4;
    mat2x4 _f5;
    bvec3 _f6;
};

struct _GLF_struct_30 {
    mat4x3 _f0;
    mat3x2 _f1;
    bvec2 _f2;
    mat2 _f3;
    uint _f4;
    bool _f5;
};

struct _GLF_struct_29 {
    vec2 _f0;
    ivec4 _f1;
    mat4x3 _f2;
};

struct _GLF_struct_28 {
    _GLF_struct_29 _f0;
    _GLF_struct_30 _f1;
    uint _f2;
    _GLF_struct_31 _f3;
};

struct _GLF_struct_27 {
    mat2 _f0;
};

struct _GLF_struct_26 {
    mat2x3 _f0;
    ivec2 _f1;
    vec3 donor_replacementGLF_dead12color;
    _GLF_struct_27 _f2;
    mat2x4 _f3;
    _GLF_struct_28 _f4;
};

struct _GLF_struct_36 {
    uvec4 _f0;
    bvec3 _f1;
};

struct _GLF_struct_35 {
    ivec4 _f0;
    mat4 _f1;
    uvec4 _f2;
    mat2 _f3;
    uvec3 _f4;
    _GLF_struct_36 _f5;
    float _f6;
};

struct _GLF_struct_34 {
    bvec4 _f0;
    ivec4 _f1;
    bvec3 _f2;
};

struct _GLF_struct_33 {
    ivec3 _f0;
};

struct _GLF_struct_32 {
    float GLF_dead11k0;
    _GLF_struct_33 _f0;
    _GLF_struct_34 _f1;
    _GLF_struct_35 _f2;
    bvec3 _f3;
};

layout(set = 0, binding = 5) uniform buf5 {
    vec3 GLF_dead11polynomial;
};

float GLF_dead11fx(float GLF_dead11x) {
    return GLF_dead11polynomial.x * pow(GLF_dead11x, 2.0) + GLF_dead11polynomial.y * GLF_dead11x + GLF_dead11polynomial.z;
}

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_dead12injectionSwitch;
};

struct GLF_dead12QuicksortObject {
    int numbers[10];
};

GLF_dead12QuicksortObject GLF_dead12obj = GLF_dead12QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

vec3 GLF_dead12palette(vec3 GLF_dead12a, vec3 GLF_dead12b, vec3 GLF_dead12c, vec3 GLF_dead12d) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        float donor_replacementGLF_dead18grey = _GLF_FUZZED(3408.3602);
        if (int(GLF_dead18gl_FragCoord[1]) < 90) {
            donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[2]) / 10.0;
        } else {
            if (int(GLF_dead18gl_FragCoord[1]) < 120) {
                donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[3]) / 10.0;
            } else {
                if (int(GLF_dead18gl_FragCoord[1]) < 150) {
                    discard;
                } else {
                    if (int(GLF_dead18gl_FragCoord[1]) < 180) {
                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[5]) / 10.0;
                    } else {
                        if (int(GLF_dead18gl_FragCoord[1]) < 210) {
                            donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[6]) / 10.0;
                        } else {
                            if (int(GLF_dead18gl_FragCoord[1]) < 240) {
                                donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[7]) / 10.0;
                            } else {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead20limit = _GLF_FUZZED(-1.5);
                                    for (int GLF_dead20i = 1; GLF_dead20i < 800; GLF_dead20i++) {
                                        if ((GLF_dead20i % 32) == 0) {
                                            donor_replacementGLF_dead18grey += 0.4;
                                        } else {
                                            if (mod(float(GLF_dead20i), round(donor_replacementGLF_dead18grey)) <= 0.01) {
                                                donor_replacementGLF_dead18grey += 100.0;
                                            }
                                        }
                                        if (float(GLF_dead20i) >= donor_replacementGLF_dead20limit) {
                                            ;
                                        }
                                    }
                                }
                                if (int(GLF_dead18gl_FragCoord[1]) < 270) {
                                    donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[8]) / 10.0;
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
    return fract(mix(GLF_dead12d * GLF_dead12a, GLF_dead12a * GLF_dead12c, GLF_dead12b + GLF_dead12d - GLF_dead12c));
}

const int GLF_dead10dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
layout(set = 0, binding = 7) uniform sampler2D GLF_dead9tex;

struct _GLF_struct_6 {
    mat2x4 _f0;
    ivec2 _f1;
    uvec3 _f2;
    uint _f3;
};

struct _GLF_struct_5 {
    int GLF_live6iters;
    mat3x4 _f0;
    mat3 _f1;
    ivec2 _f2;
};

struct _GLF_struct_4 {
    uvec2 _f0;
    _GLF_struct_5 _f1;
    _GLF_struct_6 _f2;
    mat4x2 _f3;
    mat3x4 _f4;
};

struct _GLF_struct_3 {
    ivec3 _f0;
    _GLF_struct_4 _f1;
    mat2 _f2;
    vec4 _f3;
};

struct _GLF_struct_8 {
    bvec2 _f0;
    mat3x4 _f1;
    int GLF_live6v;
    bvec3 _f2;
};

struct _GLF_struct_7 {
    bvec3 _f0;
    float _f1;
    _GLF_struct_8 _f2;
};

struct _GLF_struct_16 {
    mat3x2 _f0;
    bvec4 _f1;
};

struct _GLF_struct_15 {
    int _f0;
    mat4x3 _f1;
    vec4 _f2;
    mat2x4 _f3;
    ivec3 _f4;
    bvec3 _f5;
    vec2 _f6;
};

struct _GLF_struct_14 {
    ivec3 _f0;
    uvec3 _f1;
};

struct _GLF_struct_13 {
    uint _f0;
    uvec2 _f1;
    uvec2 _f2;
};

struct _GLF_struct_12 {
    _GLF_struct_13 _f0;
    _GLF_struct_14 _f1;
    _GLF_struct_15 _f2;
    vec4 _f3;
    vec4 _f4;
    _GLF_struct_16 _f5;
    mat4 _f6;
};

struct _GLF_struct_11 {
    vec3 _f0;
    bool _f1;
    mat2x4 _f2;
    vec4 _f3;
    int _f4;
    ivec4 _f5;
    vec4 _f6;
};

struct _GLF_struct_10 {
    mat4x3 _f0;
    float _f1;
    _GLF_struct_11 _f2;
};

struct _GLF_struct_9 {
    _GLF_struct_10 _f0;
    ivec4 _f1;
    _GLF_struct_12 _f2;
    int _injected_loop_counter;
    uvec2 _f3;
    mat4x2 _f4;
    mat3x2 _f5;
    float _f6;
};

struct _GLF_struct_20 {
    ivec4 _f0;
    mat4x3 _f1;
    uvec3 _f2;
};

struct _GLF_struct_19 {
    uvec4 _f0;
    _GLF_struct_20 _f1;
};

struct _GLF_struct_18 {
    float _f0;
    float donor_replacementGLF_dead1uvstep;
};

struct _GLF_struct_17 {
    _GLF_struct_18 _f0;
    _GLF_struct_19 _f1;
};

struct _GLF_struct_25 {
    mat3x2 _f0;
    uint _f1;
    ivec2 _f2;
};

struct _GLF_struct_24 {
    vec3 _f0;
};

struct _GLF_struct_23 {
    vec2 _f0;
    mat2 _f1;
};

struct _GLF_struct_22 {
    _GLF_struct_23 _f0;
    _GLF_struct_24 _f1;
    _GLF_struct_25 _f2;
};

struct _GLF_struct_21 {
    _GLF_struct_22 _f0;
    int GLF_dead1j;
};

int GLF_live7data[10] = int[10](_GLF_FUZZED(int(93588u)), _GLF_FUZZED(((-75358) + 93112)), _GLF_FUZZED(40567), _GLF_FUZZED(51389), _GLF_FUZZED(88726), _GLF_FUZZED(-51546), _GLF_FUZZED(-55891), _GLF_FUZZED(-65768), _GLF_FUZZED(-13723), _GLF_FUZZED((~(~(-49016))))), GLF_live7temp[10] = int[10](_GLF_FUZZED(int(1473u)), _GLF_FUZZED(-5861), _GLF_FUZZED((-84943)), _GLF_FUZZED(-41830), _GLF_FUZZED(36347), _GLF_FUZZED(((-58150) | (-62832))), _GLF_FUZZED(ivec2(-4402, -23937).x), _GLF_FUZZED(80321), _GLF_FUZZED((bool(-78.93) ? ((uvec4(113726u, 118100u, 147456u, 129417u) != uvec4(5600u, 101320u, 145097u, 153841u)) ? (-94060) : 87335) : (49645 * (-72764)))), _GLF_FUZZED(94433));

struct _GLF_struct_2 {
    mat4 _f0;
    mat2x4 _f1;
    mat2x4 _f2;
    vec4 donor_replacementGLF_dead1res;
    bool _f3;
};

struct _GLF_struct_1 {
    _GLF_struct_2 _f0;
    vec3 _f1;
    bvec2 _f2;
    mat3x2 _f3;
};

struct _GLF_struct_0 {
    vec3 _f0;
    uvec3 _f1;
    mat4 _f2;
    _GLF_struct_1 _f3;
};

struct GLF_live5BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live5BST GLF_live5tree[10] = GLF_live5BST[10](GLF_live5BST(0, 0, 0), GLF_live5BST(0, 0, 0), GLF_live5BST(0, 0, 0), GLF_live5BST(0, 0, 0), GLF_live5BST(0, 0, 0), GLF_live5BST(0, 0, 0), GLF_live5BST(0, 0, 0), GLF_live5BST(0, 0, 0), GLF_live5BST(0, 0, 0), GLF_live5BST(0, 0, 0));

void GLF_live5makeTreeNode(inout GLF_live5BST GLF_live5tree, int GLF_live5data) {
    GLF_live5tree.data = GLF_live5data;
    GLF_live5tree.leftIndex = -1;
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
        GLF_live5tree.rightIndex = -1;
    } else {
    }
}

const int GLF_live2dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
vec4 GLF_dead0gl_FragCoord = _GLF_FUZZED((vec4(2.9, 12.92, 5529.4787, 9.4) + (-72.26)));

layout(set = 0, binding = 8) uniform buf8 {
    vec2 GLF_dead0injectionSwitch;
};

int GLF_dead0data[10] = int[10](_GLF_FUZZED(((-64047) | (-51293))), _GLF_FUZZED(-33501), _GLF_FUZZED((+(-93472))), _GLF_FUZZED(ivec4(3101, 23535, -78696, 27762).x), _GLF_FUZZED(((-55878) ^ 56348)), _GLF_FUZZED((93315 - (-18999))), _GLF_FUZZED(-70628), _GLF_FUZZED(int(78430u)), _GLF_FUZZED(-68835), _GLF_FUZZED(-21495)), GLF_dead0temp[10] = int[10](_GLF_FUZZED(54458), _GLF_FUZZED(-76599), _GLF_FUZZED(36066), _GLF_FUZZED(int((mat4(265.696, 54.19, 21.06, -304.811, 1141.8995, 502.858, -537.734, -4001.9698, 6867.7136, 321.239, -316.323, -5.3, -83.41, 96.64, -3.1, 367.562) != mat4(-906.645, -0.2, 8.6, 4.0, 39.14, -7.9, -64.13, 2.0, -973.825, -802.576, -3355.9732, -9.2, -827.719, -78.21, -46.57, 6.0)))), _GLF_FUZZED((73132 * ivec4(61446, 91675, -42989, 64507).a)), _GLF_FUZZED((ivec4(-14927, -95196, -3814, 46909).t + ((-93650) | (-78029)))), _GLF_FUZZED((false ? (-74572) : 6220)), _GLF_FUZZED((35399 + ivec4(-15781, 67187, 3754, 35996).g)), _GLF_FUZZED((+(-57884))), _GLF_FUZZED(25367));
layout(set = 0, binding = 9) uniform sampler2D GLF_dead1tex;
const float GLF_dead1weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

vec2 pattern(in vec2 x) {
    {
        ivec2 GLF_live2pos = _GLF_FUZZED(ivec2(60941, 54493));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            float donor_replacementGLF_dead9h = _GLF_FUZZED(-2684.2010);
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
            int donor_replacementGLF_dead9i = _GLF_FUZZED(bitfieldExtract((-(-4234)), 29731, 43275));
            float donor_replacementGLF_dead9refh = _GLF_FUZZED(-98.31);
            do {
                if (_GLF_DEAD(false)) {
                    return vec2(1.0, 1.0);
                }
            } while (_GLF_WRAPPED_LOOP(false));
            float donor_replacementGLF_dead9slope = _GLF_FUZZED(fwidth(-8.5));
            {
                vec2 GLF_live13a = _GLF_FUZZED(vec2(4.5, -7013.1296));
                float GLF_live13z = _GLF_FUZZED(-5.4);
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead19color = _GLF_FUZZED((GLF_dead11polynomial * fwidth(GLF_dead11polynomial)));
                    {
                        donor_replacementGLF_dead19color.x += float(GLF_dead19obj.numbers[1]);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                    vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(GLF_dead11polynomial);
                    vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(x);
                    {
                        float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                        donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead21uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                        GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                        ;
                    }
                }
                {
                    GLF_live13z = GLF_live13a.x / GLF_live13a.y;
                }
            }
            vec2 donor_replacementGLF_dead9uvstep = _GLF_FUZZED(clamp(x, -7.4, -79.66));
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    do {
                        return vec2(1.0, 1.0);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = (10 - donor_replacementGLF_dead9i);
                                GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] * GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)];
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead18temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i++, 10)] = GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i++, 10)];
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    GLF_dead22_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                }
                            }
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                    {
                        vec3 GLF_live14c = _GLF_FUZZED(vec3(265.600, 5026.0995, -90.96));
                        int GLF_live14i = _GLF_FUZZED(int((mat3x2(9.9, 831.405, -691.748, 783.760, -487.992, 4840.4086) == mat3x2(75.13, 5.8, -7612.1410, -4.5, -5.7, 3.3))));
                        int GLF_live14looplimiter1 = 0;
                        {
                            if (GLF_live14looplimiter1 >= 4) {
                                ;
                            }
                            GLF_live14looplimiter1++;
                            {
                                if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)] >= 1.0) {
                                    GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)];
                                }
                            }
                        }
                    }
                } else {
                    x -= donor_replacementGLF_dead9uvstep;
                }
                donor_replacementGLF_dead9refh += donor_replacementGLF_dead9slope;
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(false);
                    bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((mat2x4(0.5, -1.7, -5684.4407, -3.0, 2.5, 3339.5177, 8641.8814, 1.2) != mat2x4(747.922, 47.34, 1802.7188, 59.11, -95.49, 3.2, -8.2, -9.0)));
                    bool donor_replacementGLF_dead21c3 = _GLF_FUZZED(false);
                    bool donor_replacementGLF_dead21c4 = _GLF_FUZZED(((66180u & 135691u) > 174454u));
                    vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-23.53, -3.9, 25.45));
                    if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && !donor_replacementGLF_dead21c3 && donor_replacementGLF_dead21c4) {
                        float GLF_dead21stripe = GLF_dead21compute_stripe(tan((x.x + x.y) * 20.0));
                        donor_replacementGLF_dead21col = mix(vec3(x.x, .8, 0), vec3(1, x.y, 0), GLF_dead21stripe);
                        GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                        ;
                    }
                }
                donor_replacementGLF_dead9h = texture(GLF_dead9tex, x).y;
                donor_replacementGLF_dead9i++;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    int donor_replacementGLF_dead18m = _GLF_FUZZED(donor_replacementGLF_dead9i);
                    {
                        for (int GLF_dead18i = donor_replacementGLF_dead9i; GLF_dead18i < donor_replacementGLF_dead9i; GLF_dead18i += 2 * donor_replacementGLF_dead18m) {
                            int GLF_dead18from = GLF_dead18i;
                            int GLF_dead18mid = GLF_dead18i + donor_replacementGLF_dead18m - 1;
                            int GLF_dead18to = min(GLF_dead18i + 2 * donor_replacementGLF_dead18m - 1, donor_replacementGLF_dead9i);
                            GLF_dead18merge(GLF_dead18from, GLF_dead18mid, GLF_dead18to);
                        }
                    }
                }
                return vec2(1.0, 1.0);
            }
        }
        {
            if (GLF_live2pos.x < GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15 && GLF_live2pos.x > GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] - 15) {
                float GLF_live2p = (15.0 - abs(float(GLF_live2pos.x - GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)]))) / 15.0;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead20result = _GLF_FUZZED(degrees(-3.0));
                        {
                            donor_replacementGLF_dead20result += 0.4;
                        }
                    }
                    return vec2(1.0, 1.0);
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead18i = _GLF_FUZZED(bitCount(190270u));
                        do {
                            do {
                                switch (donor_replacementGLF_dead18i) {
                                    case 0:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 10)] = 4;
                                        break;
                                    case 1:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 10)] = 3;
                                        break;
                                    case 2:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
                                            bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(false);
                                            bool donor_replacementGLF_dead21c3 = _GLF_FUZZED((mat4(4976.8281, -93.98, 2.1, 90.54, 6.3, 55.89, 8.4, 7.4, 94.92, 9.1, 1.5, -40.32, 161.368, 6203.2141, 4251.7234, 60.16) != mat4(27.41, 85.41, -8463.9063, 1.5, 8.9, -1.9, 2.4, 493.595, 8185.0192, 42.91, -285.280, 8904.0016, -5.6, 9.8, 796.637, 711.559)));
                                            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(log2(vec3(7.4, 41.83, 7.5)));
                                            vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(max(ldexp(GLF_dead0injectionSwitch, GLF_live2pos), 38.77));
                                            if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && donor_replacementGLF_dead21c3) {
                                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                                donor_replacementGLF_dead21col = mix(vec3(.7, sinh(donor_replacementGLF_dead21uv.x), donor_replacementGLF_dead21uv.x), vec3(.3, .5, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                ;
                                            }
                                        }
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 10)] = 2;
                                        break;
                                    case 3:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 10)] = 1;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            {
                                                break;
                                            }
                                        }
                                        break;
                                    case 4:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 10)] = 0;
                                        break;
                                    case 5:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 10)] = -1;
                                        break;
                                    case 6:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 10)] = -2;
                                        break;
                                    case 7:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 10)] = -3;
                                        break;
                                    case 8:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 10)] = -4;
                                        break;
                                    case 9:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 10)] = -5;
                                        break;
                                }
                                donor_replacementGLF_dead18i++;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(false);
                                    bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((61783u >= 93942u));
                                    bool donor_replacementGLF_dead21c3 = _GLF_FUZZED(false);
                                    bool donor_replacementGLF_dead21c4 = _GLF_FUZZED(false);
                                    vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(abs(GLF_dead11polynomial));
                                    if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && !donor_replacementGLF_dead21c3 && donor_replacementGLF_dead21c4) {
                                        float GLF_dead21stripe = GLF_dead21compute_stripe(tan((x.x + x.y) * 20.0));
                                        donor_replacementGLF_dead21col = mix(vec3(x.x, .8, 0), vec3(1, x.y, 0), GLF_dead21stripe);
                                        GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                        ;
                                    }
                                }
                            } while (donor_replacementGLF_dead18i < 10);
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return vec2(1.0, 1.0);
                    }
                }
                ;
            }
            GLF_live2pos.y++;
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead19i = _GLF_FUZZED((findMSB(-50841) ^ ivec3(80456, 32448, 47995).r));
            int donor_replacementGLF_dead19j = _GLF_FUZZED(int((43968u ^ 192240u)));
            int donor_replacementGLF_dead19pivot = _GLF_FUZZED(-20001);
            {
                if (GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 10)] <= donor_replacementGLF_dead19pivot) {
                    donor_replacementGLF_dead19i++;
                    GLF_dead19swap(donor_replacementGLF_dead19i, donor_replacementGLF_dead19j);
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
        return vec2(1.0, 1.0);
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
    } else {
        int GLF_live6i = _GLF_FUZZED((75943 | int(175790u)));
        _GLF_struct_3 _GLF_struct_replacement_3 = _GLF_struct_3(ivec3(1, 1, 1), _GLF_struct_4(uvec2(1u, 1u), _GLF_struct_5(_GLF_FUZZED((~(-35634))), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1)), _GLF_struct_6(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), uvec3(1u, 1u, 1u), 1u), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat2(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
        int GLF_live6looplimiter0 = 0;
        _GLF_struct_7 _GLF_struct_replacement_7 = _GLF_struct_7(bvec3(true, true, true), 1.0, _GLF_struct_8(bvec2(true, true), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED((+67105)), bvec3(true, true, true)));
        for (GLF_live6i = 0; GLF_live6i < _GLF_struct_replacement_3._f1._f1.GLF_live6iters; GLF_live6i++) {
            if (GLF_live6looplimiter0 >= 5) {
                break;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                break;
            }
            GLF_live6looplimiter0++;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(GLF_dead11polynomial);
                {
                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((x.x + x.y) * 20.0));
                    donor_replacementGLF_dead21col = mix(vec3(x.x, 0, 0.75), vec3(.8, .7, x.x), GLF_dead21stripe);
                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                    ;
                }
            }
            {
                _GLF_struct_replacement_7._f2.GLF_live6v = (4 * _GLF_struct_replacement_7._f2.GLF_live6v * (1000 - _GLF_struct_replacement_7._f2.GLF_live6v)) / 1000;
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
        }
    }
    vec2 n = floor(x);
    {
        int GLF_live7j = _GLF_FUZZED(72229);
        int GLF_live7k = _GLF_FUZZED(ivec3(71949, -12110, -54607).p);
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                float donor_replacementGLF_dead22A = _GLF_FUZZED(7237.1425);
                float donor_replacementGLF_dead22B = _GLF_FUZZED((tan(-1743.7061) + 3214.0306));
                float donor_replacementGLF_dead22C = _GLF_FUZZED(3143.0068);
                float donor_replacementGLF_dead22temp = _GLF_FUZZED(-7.3);
                float donor_replacementGLF_dead22x0 = _GLF_FUZZED(dot(8.2, sin(-6.0)));
                float donor_replacementGLF_dead22x1 = _GLF_FUZZED(9.7);
                float donor_replacementGLF_dead22x2 = _GLF_FUZZED(-831.816);
                {
                    float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead22x2;
                    float GLF_dead22h1 = donor_replacementGLF_dead22x1 - donor_replacementGLF_dead22x2;
                    float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                    float GLF_dead22k1 = GLF_dead22fx(donor_replacementGLF_dead22x1) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                    donor_replacementGLF_dead22temp = donor_replacementGLF_dead22x2;
                    donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                    donor_replacementGLF_dead22B = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                    donor_replacementGLF_dead22C = GLF_dead22fx(donor_replacementGLF_dead22x2);
                    donor_replacementGLF_dead22x2 = donor_replacementGLF_dead22x2 - ((2.0 * donor_replacementGLF_dead22C) / (donor_replacementGLF_dead22B + sign(donor_replacementGLF_dead22B) * sqrt(pow(donor_replacementGLF_dead22B, 2.0) - (4.0 * donor_replacementGLF_dead22A * donor_replacementGLF_dead22C))));
                    donor_replacementGLF_dead22x0 = donor_replacementGLF_dead22x1;
                    donor_replacementGLF_dead22x1 = donor_replacementGLF_dead22temp;
                }
            }
            GLF_live7temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7k++, 10)] = GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7j++, 10)];
        }
    }
    if (_GLF_DEAD(false)) {
        return vec2(1.0, 1.0);
    }
    vec3 m = vec3(1.0);
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        for (int j = -1; j <= int(injectionSwitch.y); j++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    if (GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(j, 10)] <= j) {
                        j++;
                        GLF_dead19swap(j, j);
                    }
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                for (int i = -1; i <= int(injectionSwitch.y); i++) {
                    vec2 g = vec2(float(j), float(i));
                    vec2 o = mix(n, g, 0.2);
                    for (_GLF_struct_9 _GLF_struct_replacement_9 = _GLF_struct_9(_GLF_struct_10(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, _GLF_struct_11(vec3(1.0, 1.0, 1.0), true, mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), 1, ivec4(1, 1, 1, 1), vec4(1.0, 1.0, 1.0, 1.0))), ivec4(1, 1, 1, 1), _GLF_struct_12(_GLF_struct_13(1u, uvec2(1u, 1u), uvec2(1u, 1u)), _GLF_struct_14(ivec3(1, 1, 1), uvec3(1u, 1u, 1u)), _GLF_struct_15(1, mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), bvec3(true, true, true), vec2(1.0, 1.0)), vec4(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), _GLF_struct_16(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true)), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), 1, uvec2(1u, 1u), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0); _GLF_WRAPPED_LOOP(_GLF_struct_replacement_9._injected_loop_counter != (0 >> _GLF_IDENTITY(int(8), _GLF_IDENTITY(int(8), int(int(int(8))))))); _GLF_struct_replacement_9._injected_loop_counter--) {
                        if (injectionSwitch.x < (m.x)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                float donor_replacementGLF_dead22A = _GLF_FUZZED(3362.1576);
                                float donor_replacementGLF_dead22B = _GLF_FUZZED(-0.3);
                                float donor_replacementGLF_dead22C = _GLF_FUZZED(mod(o[1], -96.39));
                                float donor_replacementGLF_dead22temp = _GLF_FUZZED(refract(dFdyCoarse(17.42), acosh(-1.7), -5.0));
                                float donor_replacementGLF_dead22x0 = _GLF_FUZZED(float(((-7743.6272) > (-3.7))));
                                float donor_replacementGLF_dead22x1 = _GLF_FUZZED(557.101);
                                float donor_replacementGLF_dead22x2 = _GLF_FUZZED(-9.8);
                                {
                                    float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead22x2;
                                    float GLF_dead22h1 = donor_replacementGLF_dead22x1 - donor_replacementGLF_dead22x2;
                                    float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                    float GLF_dead22k1 = GLF_dead22fx(donor_replacementGLF_dead22x1) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                    donor_replacementGLF_dead22temp = donor_replacementGLF_dead22x2;
                                    donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                                    donor_replacementGLF_dead22B = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                                    donor_replacementGLF_dead22C = GLF_dead22fx(donor_replacementGLF_dead22x2);
                                    donor_replacementGLF_dead22x2 = donor_replacementGLF_dead22x2 - ((2.0 * donor_replacementGLF_dead22C) / (donor_replacementGLF_dead22B + sign(donor_replacementGLF_dead22B) * sqrt(pow(donor_replacementGLF_dead22B, 2.0) - (4.0 * donor_replacementGLF_dead22A * donor_replacementGLF_dead22C))));
                                    donor_replacementGLF_dead22x0 = donor_replacementGLF_dead22x1;
                                    donor_replacementGLF_dead22x1 = donor_replacementGLF_dead22temp;
                                }
                            }
                            int k = 1;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    {
                                        GLF_dead22_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                    }
                                }
                                for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                    discard;
                                }
                            }
                            do {
                                while (k >= 0) {
                                    o = o + o;
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    k--;
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
                                        break;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        vec3 GLF_live15m = _GLF_FUZZED(vec3(-1745.9795, 7.7, -2.1));
                                        vec2 GLF_live15o = _GLF_FUZZED(vec2(4454.2024, -5.5));
                                        {
                                            int GLF_live15k = 1;
                                            {
                                                int GLF_live15looplimiter0 = 0;
                                                while (GLF_live15k >= 0) {
                                                    if (GLF_live15looplimiter0 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live15looplimiter0++;
                                                    {
                                                        GLF_live15o = GLF_live15o + GLF_live15o;
                                                        GLF_live15k--;
                                                    }
                                                }
                                            }
                                            GLF_live15m = vec3(GLF_live15injectionSwitch.x, cos(GLF_live15o));
                                        }
                                    } else {
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        continue;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return vec2(1.0, 1.0);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        for (int GLF_dead18i = k; GLF_dead18i <= j; GLF_dead18i++) {
                                            GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i, 10)] = GLF_dead18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i, 10)];
                                        }
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            m = vec3(injectionSwitch.x, cos(o));
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                discard;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                discard;
                            } else {
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return vec2(1.0, 1.0);
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter--) {
                        discard;
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead22A = _GLF_FUZZED(distance(x, atanh(GLF_live15injectionSwitch)));
                        float donor_replacementGLF_dead22B = _GLF_FUZZED(6192.9687);
                        float donor_replacementGLF_dead22C = _GLF_FUZZED(cos(-5.5));
                        float donor_replacementGLF_dead22temp = _GLF_FUZZED(-9.7);
                        float donor_replacementGLF_dead22x0 = _GLF_FUZZED(30.06);
                        float donor_replacementGLF_dead22x1 = _GLF_FUZZED(GLF_dead0injectionSwitch.g);
                        float donor_replacementGLF_dead22x2 = _GLF_FUZZED(fract(0.8));
                        while (abs(donor_replacementGLF_dead22x2 - donor_replacementGLF_dead22x1) >= .000000000000001) {
                            float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead22x2;
                            float GLF_dead22h1 = donor_replacementGLF_dead22x1 - donor_replacementGLF_dead22x2;
                            float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                            float GLF_dead22k1 = GLF_dead22fx(donor_replacementGLF_dead22x1) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                            donor_replacementGLF_dead22temp = donor_replacementGLF_dead22x2;
                            donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                            donor_replacementGLF_dead22B = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                            donor_replacementGLF_dead22C = GLF_dead22fx(donor_replacementGLF_dead22x2);
                            donor_replacementGLF_dead22x2 = donor_replacementGLF_dead22x2 - ((2.0 * donor_replacementGLF_dead22C) / (donor_replacementGLF_dead22B + sign(donor_replacementGLF_dead22B) * sqrt(pow(donor_replacementGLF_dead22B, 2.0) - (4.0 * donor_replacementGLF_dead22A * donor_replacementGLF_dead22C))));
                            donor_replacementGLF_dead22x0 = donor_replacementGLF_dead22x1;
                            donor_replacementGLF_dead22x1 = donor_replacementGLF_dead22temp;
                        }
                    }
                }
            }
        }
    } else {
    }
    return vec2(m.x, m.y - m.z);
    if (_GLF_DEAD(false)) {
        return vec2(1.0, 1.0);
    }
}

void main() {
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        vec2 donor_replacementGLF_dead0color = _GLF_FUZZED(vec2(161.187, -3.1));
        vec3 donor_replacementGLF_dead0vecCoor = _GLF_FUZZED(vec3(-7.7, -9.2, -375.915));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            donor_replacementGLF_dead0color = fract(sin(donor_replacementGLF_dead0vecCoor.yx - trunc(float(GLF_dead0data[1]))));
            if (_GLF_DEAD(false)) {
                return;
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            donor_replacementGLF_dead0color[1] *= atan(faceforward(GLF_dead0injectionSwitch, donor_replacementGLF_dead0color.xx, donor_replacementGLF_dead0vecCoor.yx).y);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 | 0)); _injected_loop_counter++) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        ;
                    } else {
                    }
                }
            } else {
            }
        } else {
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            do {
                return;
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
        }
        {
            ivec2 GLF_live8p = _GLF_FUZZED(ivec2(-45121, -15639));
            {
                GLF_live8p.x = -GLF_live8p.x;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
            }
        }
    }
    vec2 uv = gl_FragCoord.xy / resolution.y;
    float A[50];
    {
        bool GLF_live4c8 = _GLF_FUZZED((mat3x2(vec2(-18.46, 81.50), vec2(1.6, 87.09), (mat3x2(7.6, -8.6, -41.03, 7.1, 0.7, -7497.3839) * vec3(8.4, -302.150, 69.60))) != mat3x2(8.5, 6228.1984, -38.95, -4726.4732, 0.2, 7.6)));
        int GLF_live4msb8 = _GLF_FUZZED(ivec3(98485, 41073, -60920).y);
        vec2 GLF_live4pos = _GLF_FUZZED(vec3(vec4(-0.8, 105.074, -7.3, -3.1)).yy);
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((ivec4(32221, -85864, -35632, 37971) != ivec4(65921, 43848, -47022, -17810)));
                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(6.2, 244.875, 361.387));
                if (!GLF_live4c8 && !donor_replacementGLF_dead21c2 && !GLF_live4c8 && GLF_live4c8) {
                    float GLF_dead21stripe = GLF_dead21compute_stripe(tan((GLF_live4pos.x + GLF_live4pos.y) * 20.0));
                    donor_replacementGLF_dead21col = mix(vec3(GLF_live4pos.x, .8, 0), vec3(1, GLF_live4pos.y, 0), GLF_dead21stripe);
                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                    return;
                }
            }
            float GLF_live13th = _GLF_FUZZED((-(-967.993)));
            {
                GLF_live13th = 0.5 - GLF_live13th;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec3 donor_replacementGLF_dead19color = _GLF_FUZZED(vec3(-3644.6999, -6581.1609, -134.034));
                    if (GLF_live4pos.x > (3.0 / 4.0)) {
                        donor_replacementGLF_dead19color.z += float(GLF_dead19obj.numbers[3]);
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead22A = _GLF_FUZZED(GLF_live13th);
                            float donor_replacementGLF_dead22C = _GLF_FUZZED((7.5 + 30.01));
                            float donor_replacementGLF_dead22x0 = _GLF_FUZZED(4.4);
                            float donor_replacementGLF_dead22x2 = _GLF_FUZZED(GLF_live13th);
                            {
                                float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead22x2;
                                float GLF_dead22h1 = GLF_live13th - donor_replacementGLF_dead22x2;
                                float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                float GLF_dead22k1 = GLF_dead22fx(GLF_live13th) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                GLF_live13th = donor_replacementGLF_dead22x2;
                                donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                                GLF_live13th = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                                donor_replacementGLF_dead22C = GLF_dead22fx(donor_replacementGLF_dead22x2);
                                donor_replacementGLF_dead22x2 = donor_replacementGLF_dead22x2 - ((2.0 * donor_replacementGLF_dead22C) / (GLF_live13th + sign(GLF_live13th) * sqrt(pow(GLF_live13th, 2.0) - (4.0 * donor_replacementGLF_dead22A * donor_replacementGLF_dead22C))));
                                donor_replacementGLF_dead22x0 = GLF_live13th;
                                GLF_live13th = GLF_live13th;
                            }
                        }
                    }
                }
            } else {
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            vec3 donor_replacementGLF_dead19color = _GLF_FUZZED((dot(7.5, 945.365) * GLF_dead11polynomial));
            {
                donor_replacementGLF_dead19color.x += float(GLF_dead19obj.numbers[5]);
            }
        }
        vec3 GLF_live4setting = _GLF_FUZZED(vec2(-35.20, 337.055).sts);
        if (!GLF_live4c8) {
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            ;
        }
        if (_GLF_DEAD(false)) {
            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-9.8, -8755.4002, 21.01));
            {
                float GLF_dead21stripe = GLF_dead21compute_stripe(tan((uv.x + uv.y) * 20.0));
                donor_replacementGLF_dead21col = mix(vec3(uv.x, .8, 0), vec3(1, uv.y, 0), GLF_dead21stripe);
                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                return;
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        for (int i = 0; i < 200; i++) {
            do {
                if (_GLF_DEAD(false)) {
                    discard;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            GLF_dead22_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                            return;
                        }
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead10pos = _GLF_FUZZED((~max(ivec2(-48259, 21722), bitfieldReverse(ivec2(-63282, -86397)))));
                            while (donor_replacementGLF_dead10pos.y != 256) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(GLF_dead11polynomial);
                                            {
                                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((uv.x + uv.y) * 20.0));
                                                donor_replacementGLF_dead21col = mix(vec3(.7, sinh(uv.x), uv.x), vec3(.3, .5, uv.x), GLF_dead21stripe);
                                                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                return;
                                            }
                                        }
                                        discard;
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                }
                                if (donor_replacementGLF_dead10pos.x < GLF_dead10dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10pos.y, 256)] + 15 && donor_replacementGLF_dead10pos.x > GLF_dead10dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10pos.y, 256)] - 15) {
                                    float GLF_dead10p = (15.0 - abs(float(donor_replacementGLF_dead10pos.x - GLF_dead10dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10pos.y, 256)]))) / 15.0;
                                    ;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (i < int(GLF_dead23gl_FragCoord.x)) {
                                            break;
                                        }
                                    }
                                    {
                                        vec2 GLF_live13a = _GLF_FUZZED((vec2(-7.9, 5.6)));
                                        float GLF_live13z = _GLF_FUZZED((+(true ? (-0.1) : (-287.509))));
                                        {
                                            GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead10pos.y++;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead18k = _GLF_FUZZED(i);
                                int donor_replacementGLF_dead18mid = _GLF_FUZZED(i);
                                while (i < GLF_dead18N && i <= donor_replacementGLF_dead18mid) {
                                    GLF_dead18temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18k++, 10)] = GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)];
                                }
                            }
                        }
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
            if (i >= int(resolution.x)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                    discard;
                }
                break;
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead22A = _GLF_FUZZED(6.8);
                    float donor_replacementGLF_dead22B = _GLF_FUZZED(45.28);
                    float donor_replacementGLF_dead22C = _GLF_FUZZED(-8.1);
                    float donor_replacementGLF_dead22temp = _GLF_FUZZED(dot(vec3(-26.07, 6871.6165, 0.1), GLF_dead11polynomial));
                    float donor_replacementGLF_dead22x0 = _GLF_FUZZED(-6.1);
                    float donor_replacementGLF_dead22x1 = _GLF_FUZZED(2.3);
                    float donor_replacementGLF_dead22x2 = _GLF_FUZZED(exp(-113.574));
                    while (abs(donor_replacementGLF_dead22x2 - donor_replacementGLF_dead22x1) >= .000000000000001) {
                        float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead22x2;
                        float GLF_dead22h1 = donor_replacementGLF_dead22x1 - donor_replacementGLF_dead22x2;
                        float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                        float GLF_dead22k1 = GLF_dead22fx(donor_replacementGLF_dead22x1) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                        donor_replacementGLF_dead22temp = donor_replacementGLF_dead22x2;
                        donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                        donor_replacementGLF_dead22B = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                        donor_replacementGLF_dead22C = GLF_dead22fx(donor_replacementGLF_dead22x2);
                        donor_replacementGLF_dead22x2 = donor_replacementGLF_dead22x2 - ((2.0 * donor_replacementGLF_dead22C) / (donor_replacementGLF_dead22B + sign(donor_replacementGLF_dead22B) * sqrt(pow(donor_replacementGLF_dead22B, 2.0) - (4.0 * donor_replacementGLF_dead22A * donor_replacementGLF_dead22C))));
                        donor_replacementGLF_dead22x0 = donor_replacementGLF_dead22x1;
                        donor_replacementGLF_dead22x1 = donor_replacementGLF_dead22temp;
                    }
                }
            }
            if ((4 * (i / 4)) == i) {
                A[i / 4] = float(i);
            }
        }
    } else {
    }
    for (int i = 0; i < 50; i++) {
        if (i < int(gl_FragCoord.x)) {
            break;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                    if (_GLF_DEAD(false)) {
                        vec3 donor_replacementGLF_dead20c = _GLF_FUZZED(GLF_dead11polynomial);
                        for (int GLF_dead20i = 0; GLF_dead20i < 3; GLF_dead20i++) {
                            if (donor_replacementGLF_dead20c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 3)] >= 1.0) {
                                donor_replacementGLF_dead20c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 3)] = donor_replacementGLF_dead20c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 3)] * donor_replacementGLF_dead20c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 3)];
                            }
                        }
                    }
                }
                continue;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead18grey = _GLF_FUZZED(exp2(-7.7));
                if (int(GLF_dead18gl_FragCoord[1]) < 90) {
                    donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[2]) / 10.0;
                } else {
                    if (int(GLF_dead18gl_FragCoord[1]) < 120) {
                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[3]) / 10.0;
                    } else {
                        if (int(GLF_dead18gl_FragCoord[1]) < 150) {
                            discard;
                        } else {
                            if (int(GLF_dead18gl_FragCoord[1]) < 180) {
                                donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[5]) / 10.0;
                            } else {
                                if (int(GLF_dead18gl_FragCoord[1]) < 210) {
                                    donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[6]) / 10.0;
                                } else {
                                    if (int(GLF_dead18gl_FragCoord[1]) < 240) {
                                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[7]) / 10.0;
                                    } else {
                                        if (int(GLF_dead18gl_FragCoord[1]) < 270) {
                                            donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[8]) / 10.0;
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
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead20c = _GLF_FUZZED(pow(vec3(5.2, -66.31, 6.5), GLF_dead11polynomial));
                {
                    donor_replacementGLF_dead20c[_GLF_MAKE_IN_BOUNDS_INT(i, 3)] = donor_replacementGLF_dead20c[_GLF_MAKE_IN_BOUNDS_INT(i, 3)] * donor_replacementGLF_dead20c[_GLF_MAKE_IN_BOUNDS_INT(i, 3)];
                }
            }
            float donor_replacementGLF_dead11A = _GLF_FUZZED(-67.30);
            float donor_replacementGLF_dead11B = _GLF_FUZZED(5.5);
            float donor_replacementGLF_dead11C = _GLF_FUZZED(-61.13);
            float donor_replacementGLF_dead11temp = _GLF_FUZZED(66.31);
            float donor_replacementGLF_dead11x0 = _GLF_FUZZED(-995.151);
            float donor_replacementGLF_dead11x1 = _GLF_FUZZED(refract(-11.96, -8.2, 6378.3115));
            float donor_replacementGLF_dead11x2 = _GLF_FUZZED(tan(-14.22));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    {
                        ;
                    }
                }
                while (abs(donor_replacementGLF_dead11x2 - donor_replacementGLF_dead11x1) >= .000000000000001) {
                    float GLF_dead11h0 = donor_replacementGLF_dead11x0 - donor_replacementGLF_dead11x2;
                    float GLF_dead11h1 = donor_replacementGLF_dead11x1 - donor_replacementGLF_dead11x2;
                    float GLF_dead11k0 = GLF_dead11fx(donor_replacementGLF_dead11x0) - GLF_dead11fx(donor_replacementGLF_dead11x2);
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    float GLF_dead11k1 = GLF_dead11fx(donor_replacementGLF_dead11x1) - GLF_dead11fx(donor_replacementGLF_dead11x2);
                    donor_replacementGLF_dead11temp = donor_replacementGLF_dead11x2;
                    donor_replacementGLF_dead11A = (((GLF_dead11h1) * (GLF_dead11k0)) - ((GLF_dead11h0) * (GLF_dead11k1))) / ((pow((GLF_dead11h0), 2.0) * (GLF_dead11h1)) - (pow((GLF_dead11h1), 2.0) * (GLF_dead11h0)));
                    donor_replacementGLF_dead11B = (((GLF_dead11k0) - (donor_replacementGLF_dead11A * (pow((GLF_dead11h0), 2.0)))) / (GLF_dead11h0));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead22A = _GLF_FUZZED(donor_replacementGLF_dead11x2);
                        float donor_replacementGLF_dead22B = _GLF_FUZZED((i, (GLF_dead11k0 * GLF_dead11k0)));
                        float donor_replacementGLF_dead22temp = _GLF_FUZZED(GLF_dead11h0);
                        float donor_replacementGLF_dead22x0 = _GLF_FUZZED(length(injectionSwitch));
                        while (abs(donor_replacementGLF_dead11temp - donor_replacementGLF_dead11x0) >= .000000000000001) {
                            float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead11temp;
                            float GLF_dead22h1 = donor_replacementGLF_dead11x0 - donor_replacementGLF_dead11temp;
                            float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead11temp);
                            float GLF_dead22k1 = GLF_dead22fx(donor_replacementGLF_dead11x0) - GLF_dead22fx(donor_replacementGLF_dead11temp);
                            donor_replacementGLF_dead22temp = donor_replacementGLF_dead11temp;
                            donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                            donor_replacementGLF_dead22B = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                            GLF_dead11h1 = GLF_dead22fx(donor_replacementGLF_dead11temp);
                            donor_replacementGLF_dead11temp = donor_replacementGLF_dead11temp - ((2.0 * GLF_dead11h1) / (donor_replacementGLF_dead22B + sign(donor_replacementGLF_dead22B) * sqrt(pow(donor_replacementGLF_dead22B, 2.0) - (4.0 * donor_replacementGLF_dead22A * GLF_dead11h1))));
                            donor_replacementGLF_dead22x0 = donor_replacementGLF_dead11x0;
                            donor_replacementGLF_dead11x0 = donor_replacementGLF_dead22temp;
                        }
                    }
                    donor_replacementGLF_dead11C = GLF_dead11fx(donor_replacementGLF_dead11x2);
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        {
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    donor_replacementGLF_dead11x2 = donor_replacementGLF_dead11x2 - ((2.0 * donor_replacementGLF_dead11C) / (donor_replacementGLF_dead11B + sign(donor_replacementGLF_dead11B) * sqrt(pow(donor_replacementGLF_dead11B, 2.0) - (4.0 * donor_replacementGLF_dead11A * donor_replacementGLF_dead11C))));
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        donor_replacementGLF_dead11x0 = donor_replacementGLF_dead11x1;
                    }
                    donor_replacementGLF_dead11x1 = donor_replacementGLF_dead11temp;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                        if (_GLF_DEAD(false)) {
                            if (GLF_dead11h0 <= -0.9 && GLF_dead11h0 >= -1.1) {
                                GLF_dead22_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            } else {
                                GLF_dead22_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                            }
                        }
                    }
                }
            } else {
            }
        }
        if (i > 0) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead18grey = _GLF_FUZZED(6551.2632);
                    if (int(GLF_dead18gl_FragCoord[1]) < 240) {
                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[7]) / 10.0;
                    } else {
                        if (int(GLF_dead18gl_FragCoord[1]) < 270) {
                            donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[8]) / 10.0;
                        } else {
                            discard;
                        }
                    }
                }
                return;
            }
            A[i] += A[i - 1];
            if (_GLF_DEAD(false)) {
                discard;
            }
        }
    }
    vec2 c = pattern((15.0 + tan(0.2)) * uv);
    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), !(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) && true))) {
        return;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            float donor_replacementGLF_dead18grey = _GLF_FUZZED(-9569.6151);
            if (int(GLF_dead18gl_FragCoord[1]) < 30) {
                donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[0]) / 10.0;
            } else {
                if (int(GLF_dead18gl_FragCoord[1]) < 60) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[1]) / 10.0;
                    } else {
                    }
                } else {
                    if (int(GLF_dead18gl_FragCoord[1]) < 90) {
                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[2]) / 10.0;
                    } else {
                        if (int(GLF_dead18gl_FragCoord[1]) < 120) {
                            donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[3]) / 10.0;
                        } else {
                            if (int(GLF_dead18gl_FragCoord[1]) < 150) {
                                discard;
                            } else {
                                if (int(GLF_dead18gl_FragCoord[1]) < 180) {
                                    donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[5]) / 10.0;
                                } else {
                                    if (int(GLF_dead18gl_FragCoord[1]) < 210) {
                                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[6]) / 10.0;
                                    } else {
                                        if (int(GLF_dead18gl_FragCoord[1]) < 240) {
                                            donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[7]) / 10.0;
                                        } else {
                                            if (int(GLF_dead18gl_FragCoord[1]) < 270) {
                                                donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[8]) / 10.0;
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
    }
    vec3 col;
    if (int(gl_FragCoord.y) < 20) {
        col = .5 + cos(c.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0));
    } else {
        do {
            if (int(gl_FragCoord.y) < 40) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                col = .5 + cos(c.y + vec3(resolution.x, A[9] / resolution.x + 50.0, 22.0));
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead22A = _GLF_FUZZED(44.64);
                    float donor_replacementGLF_dead22B = _GLF_FUZZED(resolution[0]);
                    float donor_replacementGLF_dead22C = _GLF_FUZZED(length(GLF_dead18gl_FragCoord));
                    float donor_replacementGLF_dead22temp = _GLF_FUZZED(acos(-8836.7892));
                    float donor_replacementGLF_dead22x0 = _GLF_FUZZED(-8927.7407);
                    float donor_replacementGLF_dead22x1 = _GLF_FUZZED(84.38);
                    float donor_replacementGLF_dead22x2 = _GLF_FUZZED(degrees(-8.7));
                    while (abs(donor_replacementGLF_dead22x2 - donor_replacementGLF_dead22x1) >= .000000000000001) {
                        float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead22x2;
                        float GLF_dead22h1 = donor_replacementGLF_dead22x1 - donor_replacementGLF_dead22x2;
                        float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                        float GLF_dead22k1 = GLF_dead22fx(donor_replacementGLF_dead22x1) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                        donor_replacementGLF_dead22temp = donor_replacementGLF_dead22x2;
                        donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                        donor_replacementGLF_dead22B = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                        donor_replacementGLF_dead22C = GLF_dead22fx(donor_replacementGLF_dead22x2);
                        donor_replacementGLF_dead22x2 = donor_replacementGLF_dead22x2 - ((2.0 * donor_replacementGLF_dead22C) / (donor_replacementGLF_dead22B + sign(donor_replacementGLF_dead22B) * sqrt(pow(donor_replacementGLF_dead22B, 2.0) - (4.0 * donor_replacementGLF_dead22A * donor_replacementGLF_dead22C))));
                        donor_replacementGLF_dead22x0 = donor_replacementGLF_dead22x1;
                        donor_replacementGLF_dead22x1 = donor_replacementGLF_dead22temp;
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
            } else if (int(gl_FragCoord.y) < 60) {
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(false);
                        bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(bvec4(true, true, false, true)[1]);
                        bool donor_replacementGLF_dead21c3 = _GLF_FUZZED((uvec4(16468u, 44155u, 162188u, 10226u) == (uvec4(41660u, 49161u, 188935u, 43394u) | packUnorm4x8(GLF_dead18gl_FragCoord))));
                        bool donor_replacementGLF_dead21c4 = _GLF_FUZZED(((6.2 / mat3x2(5.2, 82.54, 708.108, -94.14, -1.4, 122.816)) == mat3x2(7443.3215, -0.3, -2.9, 34.50, 80.41, -99.91)));
                        vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(GLF_dead11polynomial);
                        vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(resolution);
                        if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && !donor_replacementGLF_dead21c3 && donor_replacementGLF_dead21c4) {
                            float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                            donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead21uv.x, .8, 0), vec3(1, donor_replacementGLF_dead21uv.y, 0), GLF_dead21stripe);
                            GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                            return;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(any(lessThanEqual(uvec3(10814u, 72305u, 31875u), uvec3(103689u, 185276u, 177336u))));
                                bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(true);
                                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(min(col, 32.01));
                                if (!donor_replacementGLF_dead21c1 && donor_replacementGLF_dead21c2) {
                                    float GLF_dead21stripe = GLF_dead21compute_stripe(tan((c.x + c.y) * 20.0));
                                    donor_replacementGLF_dead21col = mix(vec3(0.5, c.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
                                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                    return;
                                }
                            }
                            int donor_replacementGLF_dead18j = _GLF_FUZZED(bitCount(14731));
                            {
                                GLF_dead18temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 10)] = GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 10)];
                            }
                        }
                        vec3 GLF_live14c = _GLF_FUZZED(vec3(1.8, 861.560, -738.792));
                        int GLF_live14looplimiter1 = 0;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED((bvec2(true, false), bvec2(true, true).y));
                            bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(false);
                            bool donor_replacementGLF_dead21c3 = _GLF_FUZZED((!false));
                            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(GLF_live14c);
                            if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && donor_replacementGLF_dead21c3) {
                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((uv.x + uv.y) * 20.0));
                                donor_replacementGLF_dead21col = mix(vec3(.7, sinh(uv.x), uv.x), vec3(.3, .5, uv.x), GLF_dead21stripe);
                                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                return;
                            }
                        }
                        for (int GLF_live14i = 0; GLF_live14i < 3; GLF_live14i++) {
                            if (GLF_live14looplimiter1 >= 4) {
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                vec3 donor_replacementGLF_dead20c = _GLF_FUZZED((GLF_live14c / 231.281).yxx);
                                for (int GLF_dead20i = 0; GLF_dead20i < 3; GLF_dead20i++) {
                                    if (donor_replacementGLF_dead20c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 3)] >= 1.0) {
                                        donor_replacementGLF_dead20c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 3)] = donor_replacementGLF_dead20c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 3)] * donor_replacementGLF_dead20c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 3)];
                                    }
                                }
                            }
                            GLF_live14looplimiter1++;
                            {
                                if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)] >= 1.0) {
                                    GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)];
                                }
                            }
                        }
                    }
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    int donor_replacementGLF_dead12i = _GLF_FUZZED(99026);
                    {
                        GLF_dead12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12i, 10)] = (10 - donor_replacementGLF_dead12i) * int(GLF_dead12injectionSwitch.y);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            col.x += float(GLF_dead19obj.numbers[1]);
                        }
                    }
                }
                col = .5 + cos(c.y + vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0));
                if (_GLF_DEAD(false)) {
                    return;
                }
            } else if (int(gl_FragCoord.y) < 80) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(bvec3(true, false, true).g);
                        bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(true);
                        bool donor_replacementGLF_dead21c3 = _GLF_FUZZED((ivec2(55574, 59016) != ivec2(ivec4(92505, -40918, 79145, -26203))));
                        if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && donor_replacementGLF_dead21c3) {
                            float GLF_dead21stripe = GLF_dead21compute_stripe(cos((c.x + c.y) * 20.0));
                            col = mix(vec3(.7, sinh(c.x), c.x), vec3(.3, .5, c.x), GLF_dead21stripe);
                            GLF_dead21_GLF_color = vec4(col, 1.0);
                            return;
                        }
                    }
                    {
                        int GLF_live6looplimiter0 = 0;
                        int GLF_live6v = _GLF_FUZZED(int(true));
                        do {
                            do {
                                if (GLF_live6looplimiter0 >= 5) {
                                    ;
                                    if (_GLF_DEAD(false)) {
                                        break;
                                        {
                                            vec2 GLF_live13a = _GLF_FUZZED(vec2(-5.0, 6.0));
                                            float GLF_live13z = _GLF_FUZZED(-968.864);
                                            {
                                                GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                                            }
                                        }
                                    }
                                }
                                GLF_live6looplimiter0++;
                                {
                                    {
                                        ;
                                    }
                                }
                                {
                                    GLF_live6v = (4 * GLF_live6v * (1000 - GLF_live6v)) / 1000;
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        } while (_GLF_WRAPPED_LOOP(false));
                        {
                            float GLF_live13th = _GLF_FUZZED(vec3(194.599, 95.03, -6.7).b);
                            vec2 GLF_live13v = _GLF_FUZZED(vec2(126.211, -533.843));
                            if (GLF_live13v.y < 0.0) {
                                GLF_live13th = -GLF_live13th;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                col.y += float(GLF_dead19obj.numbers[6]);
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    vec2 donor_replacementGLF_dead1coord = _GLF_FUZZED(injectionSwitch);
                    int donor_replacementGLF_dead1i = _GLF_FUZZED(65924);
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                    _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(vec3(1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_1(_GLF_struct_2(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(mod(_GLF_color, asin(ceil(vec4(-8.7, -41.39, -4.0, -4800.6424))))), true), vec3(1.0, 1.0, 1.0), bvec2(true, true), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)));
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 0.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 1.0), vec3(1.0, 0.0, 0.0)), dot(vec3(0.0, 1.0, 1.0), vec3(1.0, 0.0, 0.0))), 0.0, 1.0, 0.0, sqrt(0.0), 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                            {
                                switch (donor_replacementGLF_dead1i) {
                                    case 0:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 10)] = 4;
                                        break;
                                    case 1:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 10)] = 3;
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            for (int GLF_dead20i = 0; GLF_dead20i < 3; GLF_dead20i++) {
                                                if (col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 3)] >= 1.0) {
                                                    col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 3)] = col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 3)] * col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 3)];
                                                }
                                            }
                                        }
                                    case 2:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 10)] = 2;
                                        break;
                                    case 3:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 10)] = 1;
                                        break;
                                    case 4:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 10)] = 0;
                                        break;
                                    case 5:
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec2(true, false))))) {
                                            GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 10)] = -1;
                                        } else {
                                        }
                                        break;
                                    case 6:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 10)] = -2;
                                        break;
                                    case 7:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 10)] = -3;
                                        break;
                                    case 8:
                                        GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 10)] = -4;
                                        break;
                                    case 9:
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 10)] = -5;
                                        }
                                        break;
                                }
                                donor_replacementGLF_dead1i++;
                            }
                        }
                    }
                    _GLF_struct_17 _GLF_struct_replacement_17 = _GLF_struct_17(_GLF_struct_18(1.0, _GLF_FUZZED(reflect(-2.0, 3593.0706))), _GLF_struct_19(uvec4(1u, 1u, 1u, 1u), _GLF_struct_20(ivec4(1, 1, 1, 1), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u))));
                    do {
                        for (_GLF_struct_21 _GLF_struct_replacement_21 = _GLF_struct_21(_GLF_struct_22(_GLF_struct_23(vec2(1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0)), _GLF_struct_24(vec3(1.0, 1.0, 1.0)), _GLF_struct_25(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1u, ivec2(1, 1))), 0); _GLF_struct_replacement_21.GLF_dead1j < 3; _GLF_struct_replacement_21.GLF_dead1j++) {
                            {
                                int GLF_live8looplimiter1 = 0;
                                ivec2 GLF_live8p = _GLF_FUZZED(ivec2(37423, 47572));
                                {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    if (GLF_live8looplimiter1 >= 7) {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        ;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            continue;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            return;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (GLF_live8p.x < GLF_dead10dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8p.y, 256)] + 15 && GLF_live8p.x > GLF_dead10dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8p.y, 256)] - 15) {
                                                float GLF_dead10p = (15.0 - abs(float(GLF_live8p.x - GLF_dead10dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8p.y, 256)]))) / 15.0;
                                                ;
                                            }
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    col.z += float(GLF_dead19obj.numbers[3]);
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                GLF_live8looplimiter1++;
                                            }
                                        }
                                        {
                                            int GLF_live14i = _GLF_FUZZED(-2728);
                                            float GLF_live14result = _GLF_FUZZED(vec4(-3.1, -4.7, -8738.6319, -1.4).s);
                                            float GLF_live14thirty_two = _GLF_FUZZED(-340.688);
                                            if (mod(float(GLF_live14i), round(GLF_live14thirty_two)) <= 0.01) {
                                                GLF_live14result += 100.0;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(donor_replacementGLF_dead1coord);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                {
                                                    discard;
                                                }
                                            }
                                            float donor_replacementGLF_dead9h = _GLF_FUZZED(2.3);
                                            float donor_replacementGLF_dead9refh = _GLF_FUZZED(length(GLF_dead0gl_FragCoord));
                                            float donor_replacementGLF_dead9slope = _GLF_FUZZED(normalize(72.73));
                                            while (donor_replacementGLF_dead9h < donor_replacementGLF_dead9refh && GLF_live8looplimiter1 < 32) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    donor_replacementGLF_dead9coord -= c;
                                                } else {
                                                }
                                                donor_replacementGLF_dead9refh += donor_replacementGLF_dead9slope;
                                                donor_replacementGLF_dead9h = texture(GLF_dead9tex, donor_replacementGLF_dead9coord).y;
                                                GLF_live8looplimiter1++;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                vec3 donor_replacementGLF_dead19color = _GLF_FUZZED(ldexp(vec3(-9716.2435, -43.35, -860.560), ivec3(23914, 98756, 63987)));
                                                {
                                                    donor_replacementGLF_dead19color.y += float(GLF_dead19obj.numbers[2]);
                                                }
                                            }
                                        }
                                    }
                                    {
                                        {
                                            int GLF_live15j = _GLF_FUZZED(ivec4(-65623, -34161, -18662, 33463).p);
                                            vec3 GLF_live15m = _GLF_FUZZED(vec3(7.8, -671.358, 2320.4104));
                                            vec2 GLF_live15n = _GLF_FUZZED(vec2(7.2, (4.4)));
                                            {
                                                {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                                        float donor_replacementGLF_dead20result = _GLF_FUZZED(-2.7);
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    int GLF_live15looplimiter1 = 0;
                                                    for (int GLF_live15i = -1; GLF_live15i <= int(GLF_live15injectionSwitch.y); GLF_live15i++) {
                                                        if (GLF_live15looplimiter1 >= 3) {
                                                            break;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            float donor_replacementGLF_dead18grey = _GLF_FUZZED(30.14);
                                                            if (int(GLF_dead18gl_FragCoord[1]) < 30) {
                                                                donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[0]) / 10.0;
                                                            } else {
                                                                if (int(GLF_dead18gl_FragCoord[1]) < 60) {
                                                                    donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[1]) / 10.0;
                                                                } else {
                                                                    if (int(GLF_dead18gl_FragCoord[1]) < 90) {
                                                                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[2]) / 10.0;
                                                                    } else {
                                                                        if (int(GLF_dead18gl_FragCoord[1]) < 120) {
                                                                            do {
                                                                                donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[3]) / 10.0;
                                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                        } else {
                                                                            if (_GLF_DEAD(false)) {
                                                                                int donor_replacementGLF_dead20i = _GLF_FUZZED(GLF_live15i);
                                                                                if (GLF_live15m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] >= 1.0) {
                                                                                    GLF_live15m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] = GLF_live15m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] * GLF_live15m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)];
                                                                                }
                                                                            }
                                                                            if (int(GLF_dead18gl_FragCoord[1]) < 150) {
                                                                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                                    discard;
                                                                                }
                                                                            } else {
                                                                                if (int(GLF_dead18gl_FragCoord[1]) < 180) {
                                                                                    donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[5]) / 10.0;
                                                                                } else {
                                                                                    if (int(GLF_dead18gl_FragCoord[1]) < 210) {
                                                                                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[6]) / 10.0;
                                                                                    } else {
                                                                                        if (int(GLF_dead18gl_FragCoord[1]) < 240) {
                                                                                            donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[7]) / 10.0;
                                                                                        } else {
                                                                                            if (int(GLF_dead18gl_FragCoord[1]) < 270) {
                                                                                                donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[8]) / 10.0;
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
                                                        GLF_live15looplimiter1++;
                                                        {
                                                            vec2 GLF_live15g = vec2(float(GLF_live15j), float(GLF_live15i));
                                                            vec2 GLF_live15o = mix(GLF_live15n, GLF_live15g, 0.2);
                                                            if (GLF_live15injectionSwitch.x < (GLF_live15m.x)) {
                                                                int GLF_live15k = 1;
                                                                {
                                                                    int GLF_live15looplimiter0 = 0;
                                                                    while (GLF_live15k >= 0) {
                                                                        if (GLF_live15looplimiter0 >= 3) {
                                                                            break;
                                                                        }
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            int donor_replacementGLF_dead20i = _GLF_FUZZED(findLSB(clamp(-20381, GLF_live15looplimiter0, GLF_live15k)));
                                                                            float donor_replacementGLF_dead20result = _GLF_FUZZED(-3900.2966);
                                                                            float donor_replacementGLF_dead20thirty_two = _GLF_FUZZED(clamp(-8735.5625, 2.1, 8.9));
                                                                            if ((donor_replacementGLF_dead20i % 32) == 0) {
                                                                                donor_replacementGLF_dead20result += 0.4;
                                                                            } else {
                                                                                if (mod(float(donor_replacementGLF_dead20i), round(donor_replacementGLF_dead20thirty_two)) <= 0.01) {
                                                                                    donor_replacementGLF_dead20result += 100.0;
                                                                                }
                                                                            }
                                                                        }
                                                                        GLF_live15looplimiter0++;
                                                                        {
                                                                            GLF_live15o = GLF_live15o + GLF_live15o;
                                                                            GLF_live15k--;
                                                                        }
                                                                    }
                                                                }
                                                                GLF_live15m = vec3(GLF_live15injectionSwitch.x, cos(GLF_live15o));
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_live8p.x -= 16;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                        break;
                                        {
                                            vec2 GLF_live13a = _GLF_FUZZED((mat4x2(-4134.1698, -8918.6465, 1.8, 1.1, -6447.8145, 9.6, -53.04, -9.9) * vec4(-703.715, -4.7, -75.03, -4.5)));
                                            float GLF_live13th = _GLF_FUZZED(759.310);
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead18to = _GLF_FUZZED(donor_replacementGLF_dead1i);
                                                for (int GLF_dead18i = GLF_live8looplimiter1; GLF_dead18i <= donor_replacementGLF_dead18to; GLF_dead18i++) {
                                                    GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i, 10)] = GLF_dead18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i, 10)];
                                                }
                                            }
                                            if (GLF_live13a.y < GLF_live13a.x) {
                                                GLF_live13th = 0.5 - GLF_live13th;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec2 donor_replacementGLF_dead19uv = _GLF_FUZZED(fma(uv, (5130.4729 + GLF_dead0injectionSwitch), resolution));
                                        if (donor_replacementGLF_dead19uv.x > (3.0 / 4.0)) {
                                            col.z += float(GLF_dead19obj.numbers[3]);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead20i = _GLF_FUZZED((-GLF_live8looplimiter1));
                                            if (col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] >= 1.0) {
                                                col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] = col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] * col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)];
                                            }
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                            }
                            _GLF_struct_replacement_0._f3._f0.donor_replacementGLF_dead1res += texture(GLF_dead1tex, donor_replacementGLF_dead1coord + vec2(float(donor_replacementGLF_dead1i - 1) * _GLF_struct_replacement_17._f0.donor_replacementGLF_dead1uvstep, float(_GLF_struct_replacement_21.GLF_dead1j - 1) * _GLF_struct_replacement_17._f0.donor_replacementGLF_dead1uvstep)) * GLF_dead1weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i * 3 + _GLF_struct_replacement_21.GLF_dead1j, 9)];
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    do {
                        return;
                    } while (_GLF_WRAPPED_LOOP(false));
                }
                col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0)), 0.0)))))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                } else {
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead19i = _GLF_FUZZED(mix(93124, 99026, true));
                    int donor_replacementGLF_dead19j = _GLF_FUZZED(mix((64206 % ivec3(3149, 25036, 74734)), ivec3(-30153, 14397, -50776), bvec3(true, false, true))[2]);
                    int donor_replacementGLF_dead19pivot = _GLF_FUZZED(-80888);
                    if (GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 10)] <= donor_replacementGLF_dead19pivot) {
                        donor_replacementGLF_dead19i++;
                        GLF_dead19swap(donor_replacementGLF_dead19i, donor_replacementGLF_dead19j);
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        return;
                    } else {
                    }
                }
            } else {
                {
                    int GLF_live7from = _GLF_FUZZED(35115);
                    int GLF_live7looplimiter2 = 0;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    int GLF_live7to = _GLF_FUZZED(int(68143u));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return;
                    }
                    for (int GLF_live7i = GLF_live7from; GLF_live7i <= GLF_live7to; GLF_live7i++) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            float donor_replacementGLF_dead9h = _GLF_FUZZED(dFdxCoarse(-684.236));
                            float donor_replacementGLF_dead9refh = _GLF_FUZZED(-406.283);
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_dead18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7to++, 10)] = GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7from++, 10)];
                                }
                            }
                            float donor_replacementGLF_dead9slope = _GLF_FUZZED(tanh(-8.8));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                break;
                            }
                            vec2 donor_replacementGLF_dead9uvstep = _GLF_FUZZED(GLF_dead0injectionSwitch);
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            while (donor_replacementGLF_dead9h < donor_replacementGLF_dead9refh && GLF_live7i < 32) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        GLF_dead22_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                    }
                                }
                                c -= donor_replacementGLF_dead9uvstep;
                                {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            if (int(GLF_dead18gl_FragCoord[1]) < 60) {
                                                donor_replacementGLF_dead9refh = 0.5 + float(GLF_dead18data[1]) / 10.0;
                                            } else {
                                                if (int(GLF_dead18gl_FragCoord[1]) < 90) {
                                                    donor_replacementGLF_dead9refh = 0.5 + float(GLF_dead18data[2]) / 10.0;
                                                } else {
                                                    if (int(GLF_dead18gl_FragCoord[1]) < 120) {
                                                        donor_replacementGLF_dead9refh = 0.5 + float(GLF_dead18data[3]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead18gl_FragCoord[1]) < 150) {
                                                            discard;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                int donor_replacementGLF_dead20i = _GLF_FUZZED(int((ivec2(-4300, -36750) != ivec2(GLF_dead18N, GLF_live7to))));
                                                                float donor_replacementGLF_dead20result = _GLF_FUZZED(donor_replacementGLF_dead9slope);
                                                                if (mod(float(donor_replacementGLF_dead20i), round(donor_replacementGLF_dead9h)) <= 0.01) {
                                                                    donor_replacementGLF_dead20result += 100.0;
                                                                }
                                                            }
                                                        } else {
                                                            if (int(GLF_dead18gl_FragCoord[1]) < 180) {
                                                                donor_replacementGLF_dead9refh = 0.5 + float(GLF_dead18data[5]) / 10.0;
                                                            } else {
                                                                if (int(GLF_dead18gl_FragCoord[1]) < 210) {
                                                                    donor_replacementGLF_dead9refh = 0.5 + float(GLF_dead18data[6]) / 10.0;
                                                                } else {
                                                                    if (int(GLF_dead18gl_FragCoord[1]) < 240) {
                                                                        donor_replacementGLF_dead9refh = 0.5 + float(GLF_dead18data[7]) / 10.0;
                                                                    } else {
                                                                        if (int(GLF_dead18gl_FragCoord[1]) < 270) {
                                                                            donor_replacementGLF_dead9refh = 0.5 + float(GLF_dead18data[8]) / 10.0;
                                                                        } else {
                                                                            discard;
                                                                        }
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true && (_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))))) {
                                                                    float donor_replacementGLF_dead22A = _GLF_FUZZED((donor_replacementGLF_dead9h));
                                                                    float donor_replacementGLF_dead22B = _GLF_FUZZED(donor_replacementGLF_dead9slope);
                                                                    float donor_replacementGLF_dead22C = _GLF_FUZZED(sin(dFdyFine(donor_replacementGLF_dead9refh)));
                                                                    float donor_replacementGLF_dead22temp = _GLF_FUZZED(donor_replacementGLF_dead9h);
                                                                    float donor_replacementGLF_dead22x0 = _GLF_FUZZED((+acosh((GLF_live7looplimiter2, donor_replacementGLF_dead9h))));
                                                                    while (abs(donor_replacementGLF_dead9slope - donor_replacementGLF_dead9slope) >= .000000000000001) {
                                                                        float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead9slope;
                                                                        float GLF_dead22h1 = donor_replacementGLF_dead9slope - donor_replacementGLF_dead9slope;
                                                                        float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead9slope);
                                                                        float GLF_dead22k1 = GLF_dead22fx(donor_replacementGLF_dead9slope) - GLF_dead22fx(donor_replacementGLF_dead9slope);
                                                                        donor_replacementGLF_dead22temp = donor_replacementGLF_dead9slope;
                                                                        donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                                                                        donor_replacementGLF_dead22B = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                                                                        donor_replacementGLF_dead22C = GLF_dead22fx(donor_replacementGLF_dead9slope);
                                                                        donor_replacementGLF_dead9slope = donor_replacementGLF_dead9slope - ((2.0 * donor_replacementGLF_dead22C) / (donor_replacementGLF_dead22B + sign(donor_replacementGLF_dead22B) * sqrt(pow(donor_replacementGLF_dead22B, 2.0) - (4.0 * donor_replacementGLF_dead22A * donor_replacementGLF_dead22C))));
                                                                        donor_replacementGLF_dead22x0 = donor_replacementGLF_dead9slope;
                                                                        donor_replacementGLF_dead9slope = donor_replacementGLF_dead22temp;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    int GLF_live14i = _GLF_FUZZED(28582);
                                    float GLF_live14limit = _GLF_FUZZED(float(169155u));
                                    int GLF_live14looplimiter0 = 0;
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead19uv = _GLF_FUZZED(smoothstep(GLF_live15injectionSwitch, GLF_live15injectionSwitch, (-resolution)));
                                        if (donor_replacementGLF_dead19uv.y > (3.0 / 4.0)) {
                                            col.z += float(GLF_dead19obj.numbers[7]);
                                        }
                                    }
                                    float GLF_live14result = _GLF_FUZZED(-4.3);
                                    float GLF_live14thirty_two = _GLF_FUZZED(5.3);
                                    {
                                        if (GLF_live14looplimiter0 >= 4) {
                                            if (_GLF_DEAD(false)) {
                                                float donor_replacementGLF_dead22A = _GLF_FUZZED(dot(c, GLF_dead12injectionSwitch));
                                                float donor_replacementGLF_dead22B = _GLF_FUZZED(GLF_live14result);
                                                float donor_replacementGLF_dead22temp = _GLF_FUZZED(GLF_dead12injectionSwitch[0]);
                                                float donor_replacementGLF_dead22x0 = _GLF_FUZZED(donor_replacementGLF_dead9slope);
                                                float donor_replacementGLF_dead22x2 = _GLF_FUZZED(injectionSwitch.t);
                                                {
                                                    float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead22x2;
                                                    float GLF_dead22h1 = GLF_live14result - donor_replacementGLF_dead22x2;
                                                    float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                                    float GLF_dead22k1 = GLF_dead22fx(GLF_live14result) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                                    donor_replacementGLF_dead22temp = donor_replacementGLF_dead22x2;
                                                    donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                                                    donor_replacementGLF_dead22B = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                                                    donor_replacementGLF_dead9slope = GLF_dead22fx(donor_replacementGLF_dead22x2);
                                                    donor_replacementGLF_dead22x2 = donor_replacementGLF_dead22x2 - ((2.0 * donor_replacementGLF_dead9slope) / (donor_replacementGLF_dead22B + sign(donor_replacementGLF_dead22B) * sqrt(pow(donor_replacementGLF_dead22B, 2.0) - (4.0 * donor_replacementGLF_dead22A * donor_replacementGLF_dead9slope))));
                                                    donor_replacementGLF_dead22x0 = GLF_live14result;
                                                    GLF_live14result = donor_replacementGLF_dead22temp;
                                                }
                                            }
                                            ;
                                        }
                                        GLF_live14looplimiter0++;
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead19i = _GLF_FUZZED(GLF_live14i);
                                            {
                                                GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 10)] = (10 - donor_replacementGLF_dead19i);
                                                GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 10)] = GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 10)] * GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 10)];
                                            }
                                        }
                                        {
                                            if ((GLF_live14i % 32) == 0) {
                                                GLF_live14result += 0.4;
                                            } else {
                                                if (mod(float(GLF_live14i), round(GLF_live14thirty_two)) <= 0.01) {
                                                    if (_GLF_DEAD(false)) {
                                                        bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
                                                        bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((mat3x4(253.887, 2.5, 3691.1240, 87.78, -7.5, -0.5, 777.415, 319.758, 4.7, 4223.4963, -8.2, 111.603) == mat3x4(-0.2, -6543.8990, 572.366, 7.8, -350.077, -6.7, 536.385, 64.29, -37.98, -736.289, 5181.2560, -4134.8703)));
                                                        bool donor_replacementGLF_dead21c3 = _GLF_FUZZED(false);
                                                        bool donor_replacementGLF_dead21c4 = _GLF_FUZZED(any(bvec2(false, false)));
                                                        if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && !donor_replacementGLF_dead21c3 && donor_replacementGLF_dead21c4) {
                                                            float GLF_dead21stripe = GLF_dead21compute_stripe(tan((uv.x + uv.y) * 20.0));
                                                            col = mix(vec3(uv.x, .8, 0), vec3(1, uv.y, 0), GLF_dead21stripe);
                                                            GLF_dead21_GLF_color = vec4(col, 1.0);
                                                            return;
                                                        }
                                                    }
                                                    GLF_live14result += 100.0;
                                                }
                                            }
                                            if (float(GLF_live14i) >= GLF_live14limit) {
                                                ;
                                            }
                                        }
                                    }
                                }
                                donor_replacementGLF_dead9refh += donor_replacementGLF_dead9slope;
                                donor_replacementGLF_dead9h = texture(GLF_dead9tex, c).y;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                GLF_live7i++;
                            }
                        }
                        if (GLF_live7looplimiter2 >= 4) {
                            break;
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            GLF_live7looplimiter2++;
                        } else {
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead23i = _GLF_FUZZED(GLF_live7from);
                                    if (donor_replacementGLF_dead23i < int(GLF_dead23gl_FragCoord.x)) {
                                        break;
                                    }
                                }
                                discard;
                            }
                            GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = GLF_live7temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)];
                        }
                    }
                }
                if (int(gl_FragCoord.y) < 100) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                        if (_GLF_DEAD(false)) {
                            {
                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((uv.x + uv.y) * 20.0));
                                col = mix(vec3(.7, sinh(uv.x), uv.x), vec3(.3, .5, uv.x), GLF_dead21stripe);
                                GLF_dead21_GLF_color = vec4(col, 1.0);
                                return;
                            }
                        }
                    }
                    col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                } else {
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead18grey = _GLF_FUZZED(asinh(-54.52));
                            if (int(GLF_dead18gl_FragCoord[1]) < 30) {
                                donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[0]) / 10.0;
                            } else {
                                if (int(GLF_dead18gl_FragCoord[1]) < 60) {
                                    donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[1]) / 10.0;
                                } else {
                                    if (int(GLF_dead18gl_FragCoord[1]) < 90) {
                                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[2]) / 10.0;
                                    } else {
                                        if (int(GLF_dead18gl_FragCoord[1]) < 120) {
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead20i = _GLF_FUZZED(-21873);
                                                float donor_replacementGLF_dead20limit = _GLF_FUZZED(fwidth(log(donor_replacementGLF_dead18grey)));
                                                if (float(donor_replacementGLF_dead20i) >= donor_replacementGLF_dead20limit) {
                                                    ;
                                                }
                                            }
                                            donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[3]) / 10.0;
                                        } else {
                                            if (int(GLF_dead18gl_FragCoord[1]) < 150) {
                                                discard;
                                            } else {
                                                if (int(GLF_dead18gl_FragCoord[1]) < 180) {
                                                    donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[5]) / 10.0;
                                                } else {
                                                    if (int(GLF_dead18gl_FragCoord[1]) < 210) {
                                                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[6]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead18gl_FragCoord[1]) < 240) {
                                                            donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[7]) / 10.0;
                                                        } else {
                                                            if (int(GLF_dead18gl_FragCoord[1]) < 270) {
                                                                donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[8]) / 10.0;
                                                            } else {
                                                                for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
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
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                return;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    {
                                        GLF_dead22_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(c);
                                        {
                                            float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                            col = mix(vec3(.7, sinh(donor_replacementGLF_dead21uv.x), donor_replacementGLF_dead21uv.x), vec3(.3, .5, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                            GLF_dead21_GLF_color = vec4(col, 1.0);
                                            return;
                                        }
                                    }
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead20i = _GLF_FUZZED(int(80654u));
                                    {
                                        col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] = col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] * col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)];
                                    }
                                }
                            }
                            ;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead20limit = _GLF_FUZZED(2.6);
                                float donor_replacementGLF_dead20result = _GLF_FUZZED(79.35);
                                float donor_replacementGLF_dead20thirty_two = _GLF_FUZZED(abs(-8.0));
                                for (int GLF_dead20i = 1; GLF_dead20i < 800; GLF_dead20i++) {
                                    if ((GLF_dead20i % 32) == 0) {
                                        donor_replacementGLF_dead20result += 0.4;
                                    } else {
                                        if (mod(float(GLF_dead20i), round(donor_replacementGLF_dead20thirty_two)) <= 0.01) {
                                            donor_replacementGLF_dead20result += 100.0;
                                        }
                                    }
                                    if (float(GLF_dead20i) >= donor_replacementGLF_dead20limit) {
                                        ;
                                    }
                                }
                            }
                            return;
                        }
                    }
                    if (int(gl_FragCoord.y) < 120) {
                        {
                            ivec2 GLF_live8p = _GLF_FUZZED(ivec2(14683, -98481));
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(ivec2(-81128, -1246));
                                {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(_GLF_IDENTITY(false, false || (false)), true, false, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))))) {
                                        return;
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead22A = _GLF_FUZZED((false ? 6661.7565 : 387.550));
                                            float donor_replacementGLF_dead22B = _GLF_FUZZED(5.4);
                                            float donor_replacementGLF_dead22C = _GLF_FUZZED(-6.5);
                                            float donor_replacementGLF_dead22temp = _GLF_FUZZED(length(vec4(-79.99, -6599.3583, 2.7, -24.46)));
                                            float donor_replacementGLF_dead22x0 = _GLF_FUZZED(sqrt(-21.51));
                                            float donor_replacementGLF_dead22x1 = _GLF_FUZZED(degrees(9.2));
                                            float donor_replacementGLF_dead22x2 = _GLF_FUZZED(determinant(mat2(-17.78, 9029.5911, -39.54, -56.84)));
                                            {
                                                float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead22x2;
                                                float GLF_dead22h1 = donor_replacementGLF_dead22x1 - donor_replacementGLF_dead22x2;
                                                float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                                float GLF_dead22k1 = GLF_dead22fx(donor_replacementGLF_dead22x1) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                                donor_replacementGLF_dead22temp = donor_replacementGLF_dead22x2;
                                                donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                                                donor_replacementGLF_dead22B = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                                                donor_replacementGLF_dead22C = GLF_dead22fx(donor_replacementGLF_dead22x2);
                                                donor_replacementGLF_dead22x2 = donor_replacementGLF_dead22x2 - ((2.0 * donor_replacementGLF_dead22C) / (donor_replacementGLF_dead22B + sign(donor_replacementGLF_dead22B) * sqrt(pow(donor_replacementGLF_dead22B, 2.0) - (4.0 * donor_replacementGLF_dead22A * donor_replacementGLF_dead22C))));
                                                donor_replacementGLF_dead22x0 = donor_replacementGLF_dead22x1;
                                                donor_replacementGLF_dead22x1 = donor_replacementGLF_dead22temp;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        int donor_replacementGLF_dead20i = _GLF_FUZZED(31276);
                                        {
                                            if (col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] >= 1.0) {
                                                col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] = col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] * col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)];
                                            }
                                        }
                                    }
                                    float GLF_dead10p = (15.0 - abs(float(donor_replacementGLF_dead10pos.x - GLF_dead10dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10pos.y, 256)]))) / 15.0;
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 | 1)); _injected_loop_counter++) {
                                        ;
                                    }
                                }
                            }
                            {
                                GLF_live8p.y--;
                            }
                        }
                        col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                if (_GLF_DEAD(false)) {
                                    bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(bvec4(true, false, true, false).z);
                                    bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((bvec3(true, false, false) == lessThan(vec3(914.527, -0.1, -18.30), col)));
                                    bool donor_replacementGLF_dead21c3 = _GLF_FUZZED(false);
                                    vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(dFdx(injectionSwitch));
                                    if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && donor_replacementGLF_dead21c3) {
                                        float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                        col = mix(vec3(.7, sinh(donor_replacementGLF_dead21uv.x), donor_replacementGLF_dead21uv.x), vec3(.3, .5, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                        GLF_dead21_GLF_color = vec4(col, 1.0);
                                        return;
                                    }
                                }
                                return;
                            }
                        }
                    } else if (int(gl_FragCoord.y) < 140) {
                        col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead2v = _GLF_FUZZED(-82612);
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            {
                                do {
                                    donor_replacementGLF_dead2v = (4 * donor_replacementGLF_dead2v * (1000 - donor_replacementGLF_dead2v)) / 1000;
                                    {
                                        vec3 GLF_live14c = _GLF_FUZZED(vec3(81.10, 3.8, 568.811));
                                        if (_GLF_DEAD(false)) {
                                            {
                                                GLF_dead22_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                            }
                                        }
                                        int GLF_live14i = _GLF_FUZZED((47836));
                                        {
                                            GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)];
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                int donor_replacementGLF_dead20i = _GLF_FUZZED((ivec3(41485, -56092, -38857) >> GLF_dead18N)[1]);
                                                if (col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] >= 1.0) {
                                                    col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] = col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)] * col[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 3)];
                                                }
                                            }
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead22A = _GLF_FUZZED(-549.146);
                                        float donor_replacementGLF_dead22B = _GLF_FUZZED(dot(_GLF_color, mat2x4(23.60, 0.0, 130.255, 1655.9893, 400.894, 2.5, 423.366, 7.1)[1]));
                                        float donor_replacementGLF_dead22C = _GLF_FUZZED(6.7);
                                        float donor_replacementGLF_dead22temp = _GLF_FUZZED(5590.5660);
                                        float donor_replacementGLF_dead22x0 = _GLF_FUZZED(refract(vec2(-6.7, 2.1), GLF_dead12injectionSwitch, 7.5).r);
                                        float donor_replacementGLF_dead22x1 = _GLF_FUZZED(-7664.8312);
                                        float donor_replacementGLF_dead22x2 = _GLF_FUZZED(-839.984);
                                        {
                                            float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead22x2;
                                            float GLF_dead22h1 = donor_replacementGLF_dead22x1 - donor_replacementGLF_dead22x2;
                                            float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                            float GLF_dead22k1 = GLF_dead22fx(donor_replacementGLF_dead22x1) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                            donor_replacementGLF_dead22temp = donor_replacementGLF_dead22x2;
                                            donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                                            donor_replacementGLF_dead22B = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                                            donor_replacementGLF_dead22C = GLF_dead22fx(donor_replacementGLF_dead22x2);
                                            donor_replacementGLF_dead22x2 = donor_replacementGLF_dead22x2 - ((2.0 * donor_replacementGLF_dead22C) / (donor_replacementGLF_dead22B + sign(donor_replacementGLF_dead22B) * sqrt(pow(donor_replacementGLF_dead22B, 2.0) - (4.0 * donor_replacementGLF_dead22A * donor_replacementGLF_dead22C))));
                                            donor_replacementGLF_dead22x0 = donor_replacementGLF_dead22x1;
                                            donor_replacementGLF_dead22x1 = donor_replacementGLF_dead22temp;
                                        }
                                    }
                                    return;
                                }
                            }
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead22A = _GLF_FUZZED(-55.67);
                            float donor_replacementGLF_dead22B = _GLF_FUZZED(8.7);
                            float donor_replacementGLF_dead22C = _GLF_FUZZED(distance(-9876.6752, -801.547));
                            float donor_replacementGLF_dead22temp = _GLF_FUZZED(max(933.098, 536.295));
                            float donor_replacementGLF_dead22x0 = _GLF_FUZZED(-5.7);
                            float donor_replacementGLF_dead22x1 = _GLF_FUZZED(-83.00);
                            float donor_replacementGLF_dead22x2 = _GLF_FUZZED(6.1);
                            while (abs(donor_replacementGLF_dead22x2 - donor_replacementGLF_dead22x1) >= .000000000000001) {
                                float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead22x2;
                                float GLF_dead22h1 = donor_replacementGLF_dead22x1 - donor_replacementGLF_dead22x2;
                                float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                float GLF_dead22k1 = GLF_dead22fx(donor_replacementGLF_dead22x1) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                donor_replacementGLF_dead22temp = donor_replacementGLF_dead22x2;
                                donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                                donor_replacementGLF_dead22B = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                                donor_replacementGLF_dead22C = GLF_dead22fx(donor_replacementGLF_dead22x2);
                                donor_replacementGLF_dead22x2 = donor_replacementGLF_dead22x2 - ((2.0 * donor_replacementGLF_dead22C) / (donor_replacementGLF_dead22B + sign(donor_replacementGLF_dead22B) * sqrt(pow(donor_replacementGLF_dead22B, 2.0) - (4.0 * donor_replacementGLF_dead22A * donor_replacementGLF_dead22C))));
                                donor_replacementGLF_dead22x0 = donor_replacementGLF_dead22x1;
                                donor_replacementGLF_dead22x1 = donor_replacementGLF_dead22temp;
                            }
                        }
                        if (int(gl_FragCoord.y) < 160) {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead0i = _GLF_FUZZED(ivec4(-69756, -75185, 6437, 44170).y);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    float donor_replacementGLF_dead18grey = _GLF_FUZZED(92.75);
                                    if (int(GLF_dead18gl_FragCoord[1]) < 180) {
                                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[5]) / 10.0;
                                    } else {
                                        if (int(GLF_dead18gl_FragCoord[1]) < 210) {
                                            donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[6]) / 10.0;
                                        } else {
                                            if (int(GLF_dead18gl_FragCoord[1]) < 240) {
                                                donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[7]) / 10.0;
                                            } else {
                                                if (int(GLF_dead18gl_FragCoord[1]) < 270) {
                                                    donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[8]) / 10.0;
                                                } else {
                                                    discard;
                                                }
                                            }
                                        }
                                    }
                                }
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (int(GLF_dead0gl_FragCoord[1]) < 120) {
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            uv = fract(acosh(clamp(col.yx - trunc(float(GLF_dead0data[3])), 1.0, 1000.0)));
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    GLF_dead22_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                }
                                            }
                                            uv.x += (isnan(GLF_dead0gl_FragCoord.x) ? log2(GLF_dead0gl_FragCoord.x) : log2(GLF_dead0gl_FragCoord.y));
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            ;
                                        } else if (int(GLF_dead0gl_FragCoord[1]) < 150) {
                                            {
                                                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                    ;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, true))))) {
                                                bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
                                                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-2.8, -7.3, 2.1));
                                                vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(vec3(-5191.5233, 8367.2452, -864.485).zy);
                                                if (donor_replacementGLF_dead21c1) {
                                                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                                    donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead21uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                    return;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                return;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        return;
                                                    }
                                                    break;
                                                }
                                            }
                                            discard;
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    do {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                            vec3 donor_replacementGLF_dead19color = _GLF_FUZZED(tanh(col));
                                                            {
                                                                donor_replacementGLF_dead19color.z += float(GLF_dead19obj.numbers[7]);
                                                            }
                                                        }
                                                        do {
                                                            return;
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                }
                                            }
                                        } else {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(false)) {
                                                    vec2 donor_replacementGLF_dead19uv = _GLF_FUZZED(GLF_dead12injectionSwitch);
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                        if (donor_replacementGLF_dead19uv.y > (2.0 / 4.0)) {
                                                            col.y += float(GLF_dead19obj.numbers[6]);
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        float donor_replacementGLF_dead22A = _GLF_FUZZED(8.7);
                                                        float donor_replacementGLF_dead22B = _GLF_FUZZED(max(-540.897, -998.461));
                                                        float donor_replacementGLF_dead22C = _GLF_FUZZED(14.92);
                                                        float donor_replacementGLF_dead22temp = _GLF_FUZZED(sinh(-488.829));
                                                        float donor_replacementGLF_dead22x0 = _GLF_FUZZED(length(GLF_live15injectionSwitch));
                                                        float donor_replacementGLF_dead22x1 = _GLF_FUZZED(5.6);
                                                        float donor_replacementGLF_dead22x2 = _GLF_FUZZED(tanh(601.855));
                                                        {
                                                            float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead22x2;
                                                            float GLF_dead22h1 = donor_replacementGLF_dead22x1 - donor_replacementGLF_dead22x2;
                                                            float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                                            float GLF_dead22k1 = GLF_dead22fx(donor_replacementGLF_dead22x1) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                                            donor_replacementGLF_dead22temp = donor_replacementGLF_dead22x2;
                                                            donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                                                            donor_replacementGLF_dead22B = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                                                            donor_replacementGLF_dead22C = GLF_dead22fx(donor_replacementGLF_dead22x2);
                                                            donor_replacementGLF_dead22x2 = donor_replacementGLF_dead22x2 - ((2.0 * donor_replacementGLF_dead22C) / (donor_replacementGLF_dead22B + sign(donor_replacementGLF_dead22B) * sqrt(pow(donor_replacementGLF_dead22B, 2.0) - (4.0 * donor_replacementGLF_dead22A * donor_replacementGLF_dead22C))));
                                                            donor_replacementGLF_dead22x0 = donor_replacementGLF_dead22x1;
                                                            donor_replacementGLF_dead22x1 = donor_replacementGLF_dead22temp;
                                                        }
                                                    }
                                                }
                                            } else {
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (int(GLF_dead0gl_FragCoord[1]) < 180) {
                                                    uv = fract(sin(col.yx - trunc(float(GLF_dead0data[4]))));
                                                    uv[1] += asinh(GLF_dead0gl_FragCoord.y * ldexp(uv.y, -donor_replacementGLF_dead0i));
                                                    ;
                                                } else {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        if (int(GLF_dead0gl_FragCoord[1]) < 210) {
                                                            uv = fract(sin(col.yx - trunc(float(GLF_dead0data[5]))));
                                                            uv.y -= tanh(uv.x) / cosh(uv.y);
                                                            ;
                                                        } else if (int(GLF_dead0gl_FragCoord[1]) < 240) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                return;
                                                            }
                                                            uv = fract(asinh(col.yx - trunc(float(GLF_dead0data[6]))));
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                break;
                                                            }
                                                            uv.y -= isnan(float(donor_replacementGLF_dead0i)) ? tanh(GLF_dead0gl_FragCoord.x) : atanh(GLF_dead0gl_FragCoord.y);
                                                            ;
                                                        } else if (int(GLF_dead0gl_FragCoord[1]) < 270) {
                                                            {
                                                                int GLF_live8looplimiter1 = 0;
                                                                if (GLF_live8looplimiter1 >= 7) {
                                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bvec3(false, true, true), bvec3(bvec3(bvec3(false, true, true)))))))) {
                                                                        {
                                                                            GLF_dead18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8looplimiter1, 10)] = GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8looplimiter1, 10)];
                                                                        }
                                                                    }
                                                                    ;
                                                                    if (_GLF_DEAD(false)) {
                                                                        continue;
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                uv = fract(sin(col.yx - trunc(float(GLF_dead0data[7]))));
                                                            } else {
                                                            }
                                                            do {
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        {
                                                                            GLF_dead18temp[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 10)] = GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 10)];
                                                                        }
                                                                    }
                                                                    discard;
                                                                }
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                                                {
                                                                    if (col[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)] >= 1.0) {
                                                                        col[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)] = col[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)] * col[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)];
                                                                    }
                                                                }
                                                            }
                                                            uv.y *= mix(normalize(col), normalize(vec3(uv, degrees(uv.x))), GLF_dead0injectionSwitch.x).y;
                                                            ;
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                break;
                                                            }
                                                        } else {
                                                            discard;
                                                        }
                                                        do {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                return;
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                                            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED((mat3x2(mat4x2(mat3x4(84.56, -0.2, 59.27, -238.906, 1.9, 730.479, -9.9, 8412.0932, 9707.3646, 543.108, -7485.8934, -22.84))) == mat3x2(-859.542, -1.3, -94.65, -2.1, 83.77, 9459.2615)));
                                                            bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((140713u < 76224u));
                                                            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(col);
                                                            vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(GLF_live15injectionSwitch);
                                                            if (!donor_replacementGLF_dead21c1 && donor_replacementGLF_dead21c2) {
                                                                float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                                                donor_replacementGLF_dead21col = mix(vec3(0.5, donor_replacementGLF_dead21uv.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
                                                                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                                return;
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        {
                                                            col.x += float(GLF_dead19obj.numbers[5]);
                                                        }
                                                    }
                                                    int GLF_live15j = _GLF_FUZZED(ivec3(-49840, -38115, -62241).b);
                                                    int GLF_live15looplimiter2 = 0;
                                                    vec3 GLF_live15m = _GLF_FUZZED(vec3(-9.6, -1.3, -22.02));
                                                    vec2 GLF_live15n = _GLF_FUZZED(vec2(-1.7, 8.4));
                                                    {
                                                        if (GLF_live15looplimiter2 >= 3) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                {
                                                                    GLF_dead22_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                                }
                                                            }
                                                            ;
                                                        }
                                                        GLF_live15looplimiter2++;
                                                        {
                                                            {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    vec3 donor_replacementGLF_dead19color = _GLF_FUZZED(GLF_dead11polynomial);
                                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                        donor_replacementGLF_dead19color.x += float(GLF_dead19obj.numbers[9]);
                                                                    }
                                                                }
                                                                int GLF_live15looplimiter1 = 0;
                                                                for (int GLF_live15i = -1; GLF_live15i <= int(GLF_live15injectionSwitch.y); GLF_live15i++) {
                                                                    if (GLF_live15looplimiter1 >= 3) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            {
                                                                                _injected_loop_counter = GLF_live15j;
                                                                            }
                                                                        }
                                                                        break;
                                                                    }
                                                                    GLF_live15looplimiter1++;
                                                                    {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            float donor_replacementGLF_dead22A = _GLF_FUZZED(cos((+4.8)));
                                                                            float donor_replacementGLF_dead22B = _GLF_FUZZED(sinh(step(8.6, 26.18)));
                                                                            float donor_replacementGLF_dead22C = _GLF_FUZZED(63.60);
                                                                            float donor_replacementGLF_dead22temp = _GLF_FUZZED(-1.8);
                                                                            float donor_replacementGLF_dead22x0 = _GLF_FUZZED(9313.0027);
                                                                            float donor_replacementGLF_dead22x1 = _GLF_FUZZED(sign(-825.154));
                                                                            float donor_replacementGLF_dead22x2 = _GLF_FUZZED(41.35);
                                                                            {
                                                                                float GLF_dead22h0 = donor_replacementGLF_dead22x0 - donor_replacementGLF_dead22x2;
                                                                                float GLF_dead22h1 = donor_replacementGLF_dead22x1 - donor_replacementGLF_dead22x2;
                                                                                float GLF_dead22k0 = GLF_dead22fx(donor_replacementGLF_dead22x0) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                                                                float GLF_dead22k1 = GLF_dead22fx(donor_replacementGLF_dead22x1) - GLF_dead22fx(donor_replacementGLF_dead22x2);
                                                                                donor_replacementGLF_dead22temp = donor_replacementGLF_dead22x2;
                                                                                donor_replacementGLF_dead22A = (((GLF_dead22h1) * (GLF_dead22k0)) - ((GLF_dead22h0) * (GLF_dead22k1))) / ((pow((GLF_dead22h0), 2.0) * (GLF_dead22h1)) - (pow((GLF_dead22h1), 2.0) * (GLF_dead22h0)));
                                                                                donor_replacementGLF_dead22B = (((GLF_dead22k0) - (donor_replacementGLF_dead22A * (pow((GLF_dead22h0), 2.0)))) / (GLF_dead22h0));
                                                                                donor_replacementGLF_dead22C = GLF_dead22fx(donor_replacementGLF_dead22x2);
                                                                                donor_replacementGLF_dead22x2 = donor_replacementGLF_dead22x2 - ((2.0 * donor_replacementGLF_dead22C) / (donor_replacementGLF_dead22B + sign(donor_replacementGLF_dead22B) * sqrt(pow(donor_replacementGLF_dead22B, 2.0) - (4.0 * donor_replacementGLF_dead22A * donor_replacementGLF_dead22C))));
                                                                                donor_replacementGLF_dead22x0 = donor_replacementGLF_dead22x1;
                                                                                donor_replacementGLF_dead22x1 = donor_replacementGLF_dead22temp;
                                                                            }
                                                                        }
                                                                        vec2 GLF_live15g = vec2(float(GLF_live15j), float(GLF_live15i));
                                                                        vec2 GLF_live15o = mix(GLF_live15n, GLF_live15g, 0.2);
                                                                        if (GLF_live15injectionSwitch.x < (GLF_live15m.x)) {
                                                                            int GLF_live15k = 1;
                                                                            {
                                                                                int GLF_live15looplimiter0 = 0;
                                                                                while (GLF_live15k >= 0) {
                                                                                    if (GLF_live15looplimiter0 >= 3) {
                                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED((GLF_live15k < GLF_live15j));
                                                                                            bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(true);
                                                                                            bool donor_replacementGLF_dead21c3 = _GLF_FUZZED((donor_replacementGLF_dead0i != (126065u, GLF_live15j)));
                                                                                            if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && donor_replacementGLF_dead21c3) {
                                                                                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((uv.x + uv.y) * 20.0));
                                                                                                col = mix(vec3(.7, sinh(uv.x), uv.x), vec3(.3, .5, uv.x), GLF_dead21stripe);
                                                                                                GLF_dead21_GLF_color = vec4(col, 1.0);
                                                                                                return;
                                                                                            }
                                                                                        }
                                                                                        break;
                                                                                    }
                                                                                    GLF_live15looplimiter0++;
                                                                                    {
                                                                                        GLF_live15o = GLF_live15o + GLF_live15o;
                                                                                        GLF_live15k--;
                                                                                    }
                                                                                }
                                                                            }
                                                                            GLF_live15m = vec3(GLF_live15injectionSwitch.x, cos(GLF_live15o));
                                                                        }
                                                                    }
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                        float donor_replacementGLF_dead18grey = _GLF_FUZZED(length(GLF_dead0gl_FragCoord));
                                                                        if (int(GLF_dead18gl_FragCoord[1]) < 30) {
                                                                            donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[0]) / 10.0;
                                                                        } else {
                                                                            if (int(GLF_dead18gl_FragCoord[1]) < 60) {
                                                                                donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[1]) / 10.0;
                                                                            } else {
                                                                                if (int(GLF_dead18gl_FragCoord[1]) < 90) {
                                                                                    donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[2]) / 10.0;
                                                                                } else {
                                                                                    if (int(GLF_dead18gl_FragCoord[1]) < 120) {
                                                                                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[3]) / 10.0;
                                                                                    } else {
                                                                                        if (int(GLF_dead18gl_FragCoord[1]) < 150) {
                                                                                            discard;
                                                                                        } else {
                                                                                            if (int(GLF_dead18gl_FragCoord[1]) < 180) {
                                                                                                donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[5]) / 10.0;
                                                                                            } else {
                                                                                                if (int(GLF_dead18gl_FragCoord[1]) < 210) {
                                                                                                    donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[6]) / 10.0;
                                                                                                } else {
                                                                                                    if (int(GLF_dead18gl_FragCoord[1]) < 240) {
                                                                                                        donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[7]) / 10.0;
                                                                                                    } else {
                                                                                                        if (int(GLF_dead18gl_FragCoord[1]) < 270) {
                                                                                                            donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[8]) / 10.0;
                                                                                                        } else {
                                                                                                            discard;
                                                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                                                {
                                                                                                                    donor_replacementGLF_dead18grey += 0.4;
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                                if (_GLF_DEAD(false)) {
                                                                                                    if (donor_replacementGLF_dead18grey <= -0.9 && donor_replacementGLF_dead18grey >= -1.1) {
                                                                                                        GLF_dead22_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                                                                    } else {
                                                                                                        GLF_dead22_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
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
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                                            } else {
                                                                col.x += float(GLF_dead19obj.numbers[5]);
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    discard;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (1 ^ 1)); _injected_loop_counter--) {
                                                    int GLF_live7i = _GLF_FUZZED(((-62857) ^ (-7716)));
                                                    do {
                                                        GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = GLF_live7temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)];
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            discard;
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0)))))) {
                                            if (_GLF_DEAD(false)) {
                                                float donor_replacementGLF_dead9h = _GLF_FUZZED(8.8);
                                                float donor_replacementGLF_dead9refh = _GLF_FUZZED(-980.388);
                                                float donor_replacementGLF_dead9slope = _GLF_FUZZED(-3.8);
                                                vec2 donor_replacementGLF_dead9uvstep = _GLF_FUZZED(uv);
                                                {
                                                    uv -= donor_replacementGLF_dead9uvstep;
                                                    donor_replacementGLF_dead9refh += donor_replacementGLF_dead9slope;
                                                    donor_replacementGLF_dead9h = texture(GLF_dead9tex, uv).y;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            return;
                                                        } else {
                                                        }
                                                    }
                                                    donor_replacementGLF_dead0i++;
                                                }
                                            }
                                            return;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                float donor_replacementGLF_dead9h = _GLF_FUZZED(min(798.272, 8.7));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                                float donor_replacementGLF_dead9refh = _GLF_FUZZED(mix(6.6, -9.3, (mat3x2(4.0, -425.556, -58.60, 5.5, 7.5, -8293.0370) != mat3x2(-37.59, 804.963, -0.3, -681.375, 70.48, -8.5))));
                                                float donor_replacementGLF_dead9slope = _GLF_FUZZED(round(radians(8.8)));
                                                while (donor_replacementGLF_dead9h < donor_replacementGLF_dead9refh && donor_replacementGLF_dead0i < 32) {
                                                    c -= c;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                                        vec2 donor_replacementGLF_dead19uv = _GLF_FUZZED(GLF_live15injectionSwitch);
                                                        if (donor_replacementGLF_dead19uv.y > (2.0 / 4.0)) {
                                                            col.y += float(GLF_dead19obj.numbers[6]);
                                                        }
                                                    }
                                                    donor_replacementGLF_dead9refh += donor_replacementGLF_dead9slope;
                                                    donor_replacementGLF_dead9h = texture(GLF_dead9tex, c).y;
                                                    donor_replacementGLF_dead0i++;
                                                }
                                            }
                                        }
                                    }
                                    {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        bool GLF_live4c4 = _GLF_FUZZED((mat2x3(-9.5, 471.585, 8.3, -15.66, 0.9, 1.6) != (+mat2x3(9424.4544, -980.329, -2829.9250, -91.20, 9.0, -7.2))));
                                        {
                                            vec3 GLF_live14c = _GLF_FUZZED(vec3(114.258, 6.0, -988.465));
                                            {
                                                int GLF_live14looplimiter1 = 0;
                                                for (int GLF_live14i = 0; GLF_live14i < 3; GLF_live14i++) {
                                                    if (GLF_live14looplimiter1 >= 4) {
                                                        break;
                                                    }
                                                    GLF_live14looplimiter1++;
                                                    {
                                                        if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)] >= 1.0) {
                                                            GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 3)];
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (!GLF_live4c4) {
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    return;
                                                } else {
                                                }
                                            }
                                            ;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_struct_26 _GLF_struct_replacement_26 = _GLF_struct_26(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), _GLF_FUZZED(col), _GLF_struct_27(mat2(1.0, 1.0, 1.0, 1.0)), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_28(_GLF_struct_29(vec2(1.0, 1.0), ivec4(1, 1, 1, 1), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_30(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true), mat2(1.0, 1.0, 1.0, 1.0), 1u, true), 1u, _GLF_struct_31(vec2(1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, mat2(1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec3(true, true, true))));
                                    {
                                        _GLF_struct_replacement_26.donor_replacementGLF_dead12color += GLF_dead12palette(vec3(0.5, float(GLF_dead12obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead12injectionSwitch.y)), vec3(float(GLF_dead12obj.numbers[4]) * 0.1, GLF_dead12injectionSwitch.x, 0.6));
                                        donor_replacementGLF_dead0i++;
                                    }
                                }
                            }
                            col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                        } else {
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead12color = _GLF_FUZZED(col);
                                int donor_replacementGLF_dead12count = _GLF_FUZZED(int((83939u != 119336u)));
                                do {
                                    donor_replacementGLF_dead12color -= GLF_dead12palette(vec3(float(GLF_dead12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead12injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead12injectionSwitch.x, 0.6, float(GLF_dead12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead12injectionSwitch.x), 10)]) * 0.1));
                                    donor_replacementGLF_dead12count++;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                        vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-5.8, 3698.6705, -3.9));
                                        {
                                            float GLF_dead21stripe = GLF_dead21compute_stripe(cos((uv.x + uv.y) * 20.0));
                                            donor_replacementGLF_dead21col = mix(vec3(uv.x, 0, 0.75), vec3(.8, .7, uv.x), GLF_dead21stripe);
                                            GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                            return;
                                        }
                                    }
                                } while (donor_replacementGLF_dead12count != GLF_dead12obj.numbers[2]);
                            }
                            {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                int GLF_live5baseIndex = _GLF_FUZZED(34370);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    {
                                        float GLF_dead21stripe = GLF_dead21compute_stripe(cos((c.x + c.y) * 20.0));
                                        col = mix(vec3(c.x, 0, 0.75), vec3(.8, .7, c.x), GLF_dead21stripe);
                                        GLF_dead21_GLF_color = vec4(col, 1.0);
                                        return;
                                    }
                                }
                                int GLF_live5data = _GLF_FUZZED(-85210);
                                int GLF_live5treeIndex = _GLF_FUZZED(-40395);
                                if (GLF_live5tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5baseIndex, 10)].rightIndex == -1) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))))))) {
                                        return;
                                    }
                                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < (int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ 1)); _injected_loop_counter++) {
                                        GLF_live5tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5baseIndex, 10)].rightIndex = GLF_live5treeIndex;
                                    }
                                    GLF_live5makeTreeNode(GLF_live5tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5treeIndex, 10)], GLF_live5data);
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (false ? _GLF_FUZZED(54996) : int(7)))))); _injected_loop_counter++) {
                                        ;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    }
                                } else {
                                    GLF_live5baseIndex = GLF_live5tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5baseIndex, 10)].rightIndex;
                                    do {
                                        ;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead18grey = _GLF_FUZZED(3096.8930);
                                        {
                                            donor_replacementGLF_dead18grey = 0.5 + float(GLF_dead18data[5]) / 10.0;
                                        }
                                    }
                                }
                            }
                            if (int(gl_FragCoord.y) < 180) {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        return;
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead11A = _GLF_FUZZED(clamp(radians(abs(54.33)), dFdxFine(414.837), 3477.4303));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                if (c.x > (1.0 / 4.0)) {
                                                    col.x += float(GLF_dead19obj.numbers[1]);
                                                }
                                            }
                                            float donor_replacementGLF_dead11B = _GLF_FUZZED(atan(985.940));
                                            float donor_replacementGLF_dead11C = _GLF_FUZZED(dFdyCoarse(-76.17));
                                            float donor_replacementGLF_dead11temp = _GLF_FUZZED(7.8);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                {
                                                    if (int(GLF_dead18gl_FragCoord[1]) < 120) {
                                                        donor_replacementGLF_dead11C = 0.5 + float(GLF_dead18data[3]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead18gl_FragCoord[1]) < 150) {
                                                            discard;
                                                        } else {
                                                            if (int(GLF_dead18gl_FragCoord[1]) < 180) {
                                                                donor_replacementGLF_dead11C = 0.5 + float(GLF_dead18data[5]) / 10.0;
                                                            } else {
                                                                do {
                                                                    if (int(GLF_dead18gl_FragCoord[1]) < 210) {
                                                                        donor_replacementGLF_dead11C = 0.5 + float(GLF_dead18data[6]) / 10.0;
                                                                    } else {
                                                                        if (int(GLF_dead18gl_FragCoord[1]) < 240) {
                                                                            donor_replacementGLF_dead11C = 0.5 + float(GLF_dead18data[7]) / 10.0;
                                                                        } else {
                                                                            if (int(GLF_dead18gl_FragCoord[1]) < 270) {
                                                                                donor_replacementGLF_dead11C = 0.5 + float(GLF_dead18data[8]) / 10.0;
                                                                            } else {
                                                                                discard;
                                                                            }
                                                                        }
                                                                    }
                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            float donor_replacementGLF_dead11x0 = _GLF_FUZZED(smoothstep(95.20, tan(9421.6498), log(40.05)));
                                            float donor_replacementGLF_dead11x1 = _GLF_FUZZED(floor(acos(879.547)));
                                            float donor_replacementGLF_dead11x2 = _GLF_FUZZED(log2(-5.7));
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                float GLF_dead11h0 = donor_replacementGLF_dead11x0 - donor_replacementGLF_dead11x2;
                                                float GLF_dead11h1 = donor_replacementGLF_dead11x1 - donor_replacementGLF_dead11x2;
                                                _GLF_struct_32 _GLF_struct_replacement_32 = _GLF_struct_32(GLF_dead11fx(donor_replacementGLF_dead11x0) - GLF_dead11fx(donor_replacementGLF_dead11x2), _GLF_struct_33(ivec3(1, 1, 1)), _GLF_struct_34(bvec4(true, true, true, true), ivec4(1, 1, 1, 1), bvec3(true, true, true)), _GLF_struct_35(ivec4(1, 1, 1, 1), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), mat2(1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), _GLF_struct_36(uvec4(1u, 1u, 1u, 1u), bvec3(true, true, true)), 1.0), bvec3(true, true, true));
                                                float GLF_dead11k1 = GLF_dead11fx(donor_replacementGLF_dead11x1) - GLF_dead11fx(donor_replacementGLF_dead11x2);
                                                donor_replacementGLF_dead11temp = donor_replacementGLF_dead11x2;
                                                donor_replacementGLF_dead11A = (((GLF_dead11h1) * (_GLF_struct_replacement_32.GLF_dead11k0)) - ((GLF_dead11h0) * (GLF_dead11k1))) / ((pow((GLF_dead11h0), 2.0) * (GLF_dead11h1)) - (pow((GLF_dead11h1), 2.0) * (GLF_dead11h0)));
                                                donor_replacementGLF_dead11B = (((_GLF_struct_replacement_32.GLF_dead11k0) - (donor_replacementGLF_dead11A * (pow((GLF_dead11h0), 2.0)))) / (GLF_dead11h0));
                                                donor_replacementGLF_dead11C = GLF_dead11fx(donor_replacementGLF_dead11x2);
                                                donor_replacementGLF_dead11x2 = donor_replacementGLF_dead11x2 - ((2.0 * donor_replacementGLF_dead11C) / (donor_replacementGLF_dead11B + sign(donor_replacementGLF_dead11B) * sqrt(pow(donor_replacementGLF_dead11B, 2.0) - (4.0 * donor_replacementGLF_dead11A * donor_replacementGLF_dead11C))));
                                                donor_replacementGLF_dead11x0 = donor_replacementGLF_dead11x1;
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    {
                                                        float GLF_live13th = _GLF_FUZZED(918.730);
                                                        {
                                                            if (_GLF_DEAD(false)) {
                                                                {
                                                                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((uv.x + uv.y) * 20.0));
                                                                    col = mix(vec3(uv.x, 0, 0.75), vec3(.8, .7, uv.x), GLF_dead21stripe);
                                                                    GLF_dead21_GLF_color = vec4(col, 1.0);
                                                                    return;
                                                                }
                                                            }
                                                            GLF_live13th = 1.0 - GLF_live13th;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (GLF_dead11k1 <= -0.9 && GLF_dead11k1 >= -1.1) {
                                                            GLF_dead22_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                        } else {
                                                            GLF_dead22_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                                        }
                                                    }
                                                    donor_replacementGLF_dead11x1 = donor_replacementGLF_dead11temp;
                                                } else {
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                return;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead19i = _GLF_FUZZED(((mat4(-403.703, -947.386, 3.0, -575.637, -4.9, 47.64, 9.8, -887.345, -0.6, 6.4, -772.401, -4.4, -2.6, 72.41, 985.807, 241.756) == mat4(26.34, 2253.5450, 5955.9343, 8.1, -844.099, 73.79, 7.6, -9.0, 3.6, -3.8, -7449.4986, 74.93, -5.9, 28.34, 14.79, 5.6)) ? (-ivec2(83943, 99598).g) : (-60295)));
                                        {
                                            GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 10)] = (10 - donor_replacementGLF_dead19i);
                                            GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 10)] = GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 10)] * GLF_dead19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 10)];
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            {
                                                GLF_dead22_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        {
                                            int GLF_live8looplimiter1 = 0;
                                            if (GLF_live8looplimiter1 >= 7) {
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                                                } else {
                                                    ;
                                                }
                                            }
                                        }
                                        return;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(_GLF_IDENTITY(dot(vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, 1.0)), dot(vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, 1.0))), 0.0, 0.0, 1.0), vec4(length(0.0), 1.0, 1.0, 0.0)), _GLF_IDENTITY(dot(vec4(_GLF_IDENTITY(dot(vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, 1.0)), dot(vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, 1.0))), 0.0, 0.0, 1.0), vec4(length(0.0), 1.0, 1.0, 0.0)), (false ? _GLF_FUZZED(-39.15) : dot(vec4(_GLF_IDENTITY(dot(vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, 1.0)), dot(vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, 1.0))), 0.0, 0.0, 1.0), vec4(length(0.0), 1.0, 1.0, 0.0))))))))) {
                                        float donor_replacementGLF_dead22x2 = _GLF_FUZZED((973.822 + asin(atan(-36.10, 406.450))));
                                        if (donor_replacementGLF_dead22x2 <= -0.9 && donor_replacementGLF_dead22x2 >= -1.1) {
                                            GLF_dead22_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        } else {
                                            GLF_dead22_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            ;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                vec2 donor_replacementGLF_dead19uv = _GLF_FUZZED(unpackHalf2x16(135077u));
                                                if (abs(donor_replacementGLF_dead19uv.x - donor_replacementGLF_dead19uv.y) < 0.25) {
                                                    col.x += float(GLF_dead19obj.numbers[9]);
                                                }
                                            }
                                        } else {
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead11A = _GLF_FUZZED(cos(986.745));
                                    float donor_replacementGLF_dead11B = _GLF_FUZZED(intBitsToFloat(-36852));
                                    float donor_replacementGLF_dead11C = _GLF_FUZZED(4407.9393);
                                    float donor_replacementGLF_dead11temp = _GLF_FUZZED(smoothstep(-7.2, -5969.2623, dot(94.62, acosh(-1571.1048))));
                                    float donor_replacementGLF_dead11x0 = _GLF_FUZZED(acosh(refract(-4.7, -407.076, 6.1)));
                                    float donor_replacementGLF_dead11x1 = _GLF_FUZZED(min(269.952, -369.708));
                                    float donor_replacementGLF_dead11x2 = _GLF_FUZZED(determinant(mat3(-3641.3192, 79.52, -695.288, -6.6, 349.794, -854.211, -5.4, -9472.8297, 92.20)));
                                    {
                                        float GLF_dead11h0 = donor_replacementGLF_dead11x0 - donor_replacementGLF_dead11x2;
                                        float GLF_dead11h1 = donor_replacementGLF_dead11x1 - donor_replacementGLF_dead11x2;
                                        float GLF_dead11k0 = GLF_dead11fx(donor_replacementGLF_dead11x0) - GLF_dead11fx(donor_replacementGLF_dead11x2);
                                        float GLF_dead11k1 = GLF_dead11fx(donor_replacementGLF_dead11x1) - GLF_dead11fx(donor_replacementGLF_dead11x2);
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            donor_replacementGLF_dead11temp = donor_replacementGLF_dead11x2;
                                        }
                                        donor_replacementGLF_dead11A = (((GLF_dead11h1) * (GLF_dead11k0)) - ((GLF_dead11h0) * (GLF_dead11k1))) / ((pow((GLF_dead11h0), 2.0) * (GLF_dead11h1)) - (pow((GLF_dead11h1), 2.0) * (GLF_dead11h0)));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED((bvec2(true, true) != bvec2(false, true)));
                                            bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((true ? false : false));
                                            bool donor_replacementGLF_dead21c3 = _GLF_FUZZED(true);
                                            if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && donor_replacementGLF_dead21c3) {
                                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((c.x + c.y) * 20.0));
                                                col = mix(vec3(.7, sinh(c.x), c.x), vec3(.3, .5, c.x), GLF_dead21stripe);
                                                GLF_dead21_GLF_color = vec4(col, 1.0);
                                                return;
                                            }
                                        }
                                        donor_replacementGLF_dead11B = (((GLF_dead11k0) - (donor_replacementGLF_dead11A * (pow((GLF_dead11h0), 2.0)))) / (GLF_dead11h0));
                                        donor_replacementGLF_dead11C = GLF_dead11fx(donor_replacementGLF_dead11x2);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(false);
                                            bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(false);
                                            bool donor_replacementGLF_dead21c3 = _GLF_FUZZED(false);
                                            bool donor_replacementGLF_dead21c4 = _GLF_FUZZED(false);
                                            vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(GLF_live15injectionSwitch);
                                            if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && !donor_replacementGLF_dead21c3 && donor_replacementGLF_dead21c4) {
                                                float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                                col = mix(vec3(donor_replacementGLF_dead21uv.x, .8, 0), vec3(1, donor_replacementGLF_dead21uv.y, 0), GLF_dead21stripe);
                                                GLF_dead21_GLF_color = vec4(col, 1.0);
                                                return;
                                            }
                                        }
                                        donor_replacementGLF_dead11x2 = donor_replacementGLF_dead11x2 - ((2.0 * donor_replacementGLF_dead11C) / (donor_replacementGLF_dead11B + sign(donor_replacementGLF_dead11B) * sqrt(pow(donor_replacementGLF_dead11B, 2.0) - (4.0 * donor_replacementGLF_dead11A * donor_replacementGLF_dead11C))));
                                        donor_replacementGLF_dead11x0 = donor_replacementGLF_dead11x1;
                                        donor_replacementGLF_dead11x1 = donor_replacementGLF_dead11temp;
                                    }
                                }
                                col = .5 + cos(c.y + vec3(resolution.x, A[44] / resolution.x + 50.0, 22.0));
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        do {
                                            return;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                            return;
                                        }
                                    }
                                }
                            } else if (int(gl_FragCoord.y) < 200) {
                                col = .5 + cos(c.y + vec3(resolution.x, A[49] / resolution.x + 50.0, 22.0));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        if (_GLF_DEAD(false)) {
                                            vec3 donor_replacementGLF_dead19color = _GLF_FUZZED((mat4x3(2.5, -8274.3525, -616.861, 348.098, 5425.4748, 0.0, -5803.3355, -852.860, 93.69, -770.492, -52.55, -7.6) * GLF_dead0gl_FragCoord));
                                            vec2 donor_replacementGLF_dead19uv = _GLF_FUZZED(resolution);
                                            if (donor_replacementGLF_dead19uv.y > (1.0 / 4.0)) {
                                                donor_replacementGLF_dead19color.x += float(GLF_dead19obj.numbers[5]);
                                            }
                                        }
                                        {
                                            ;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (_GLF_IDENTITY(true, (true) || false))))) {
                                        return;
                                    } else {
                                    }
                                }
                            } else {
                                discard;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        return;
                                    }
                                    {
                                        int GLF_live14i = _GLF_FUZZED(-7547);
                                        float GLF_live14limit = _GLF_FUZZED(-5.4);
                                        float GLF_live14result = _GLF_FUZZED(-0.4);
                                        if (float(GLF_live14i) >= GLF_live14limit) {
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, 1.0, 0.0)))))) {
                                        float donor_replacementGLF_dead22x2 = _GLF_FUZZED(exp2(-69.92));
                                        if (donor_replacementGLF_dead22x2 <= -0.9 && donor_replacementGLF_dead22x2 >= -1.1) {
                                            GLF_dead22_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        } else {
                                            GLF_dead22_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead18i = _GLF_FUZZED(-29052);
                                        {
                                            GLF_dead18data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 10)] = GLF_dead18temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 10)];
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead16index = _GLF_FUZZED(55281);
        int donor_replacementGLF_dead16j = _GLF_FUZZED(39592);
        {
            donor_replacementGLF_dead16index = donor_replacementGLF_dead16j;
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        do {
            _GLF_color = vec4(col, 1.0);
        } while (_GLF_WRAPPED_LOOP(false));
    } else {
    }
}
