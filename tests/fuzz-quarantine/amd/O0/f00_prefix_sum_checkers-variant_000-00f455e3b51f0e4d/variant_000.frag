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
vec4 GLF_live10gl_FragCoord = _GLF_FUZZED((vec4(-796.398, -526.010, -9706.1659, 2313.1645) * vec4(8.2, 615.066, -6.9, 3.6)));

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live10injectionSwitch;
};

const int GLF_live10N = 10;
int GLF_live10data[10] = int[10](_GLF_FUZZED(int((~181994u))), _GLF_FUZZED(((-88456) - 79819)), _GLF_FUZZED(ivec3(-27559, 41221, 99798).x), _GLF_FUZZED((ivec3(73438, -10313, 74940) - ivec3(4206, -16872, -76024)).g), _GLF_FUZZED((17223 ^ 34566)), _GLF_FUZZED(39293), _GLF_FUZZED(-4323), _GLF_FUZZED(-72256), _GLF_FUZZED((~(-12070))), _GLF_FUZZED(10013)), GLF_live10temp[10] = int[10](_GLF_FUZZED((+84409)), _GLF_FUZZED((-(54001 | 42309))), _GLF_FUZZED(((-36949) * 53181)), _GLF_FUZZED((34281 - (-55626))), _GLF_FUZZED((-44494)), _GLF_FUZZED((421)), _GLF_FUZZED(((-(-37734)) ^ 33987)), _GLF_FUZZED(ivec2(-69987, 12040).y), _GLF_FUZZED((-(-29874))), _GLF_FUZZED(63901));

void GLF_live10merge(int GLF_live10from, int GLF_live10mid, int GLF_live10to) {
    int GLF_live10k = GLF_live10from, GLF_live10i = GLF_live10from, GLF_live10j = GLF_live10mid + 1;
    {
        int GLF_live10looplimiter0 = 0;
        while (GLF_live10i <= GLF_live10mid && GLF_live10j <= GLF_live10to) {
            if (GLF_live10looplimiter0 >= 3) {
                break;
            }
            GLF_live10looplimiter0++;
            {
                if (GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] < GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 10)]) {
                    GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i++, 10)];
                } else {
                    GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live10looplimiter1 = 0;
        while (GLF_live10i < GLF_live10N && GLF_live10i <= GLF_live10mid) {
            if (GLF_live10looplimiter1 >= 3) {
                break;
            }
            GLF_live10looplimiter1++;
            {
                GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i++, 10)];
            }
        }
    }
    {
        int GLF_live10looplimiter2 = 0;
        for (int GLF_live10i = GLF_live10from; GLF_live10i <= GLF_live10to; GLF_live10i++) {
            if (GLF_live10looplimiter2 >= 3) {
                break;
            }
            GLF_live10looplimiter2++;
            {
                GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)];
            }
        }
    }
}

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_live13injectionSwitch;
};

struct GLF_live13QuicksortObject {
    int numbers[10];
};

GLF_live13QuicksortObject GLF_live13obj = GLF_live13QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_live13swap(int GLF_live13i, int GLF_live13j) {
    int GLF_live13temp = GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)];
    GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 10)];
    GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 10)] = GLF_live13temp;
}

vec3 GLF_live13palette(vec3 GLF_live13a, vec3 GLF_live13b, vec3 GLF_live13c, vec3 GLF_live13d) {
    return fract(mix(GLF_live13d * GLF_live13a, GLF_live13a * GLF_live13c, GLF_live13b + GLF_live13d - GLF_live13c));
}

layout(set = 0, binding = 4) uniform buf4 {
    float GLF_live12time;
};

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_live12resolution;
};

float GLF_live12h_r = _GLF_FUZZED(float(79236));
float GLF_live12s_g = _GLF_FUZZED(float(true));
float GLF_live12b_b = _GLF_FUZZED(-18.15);

void GLF_live12doConvert() {
    int GLF_live12msb8 = 256;
    vec3 GLF_live12temp = _GLF_FUZZED(smoothstep(vec3(2230.1640, -7.5, 573.833), vec3(2.4, -4455.2239, -903.273), vec3(5207.2927, 2367.1639, -3.2)));
    GLF_live12temp = GLF_live12b_b * (float(bitCount(GLF_live12msb8)) - GLF_live12s_g) + (GLF_live12b_b - GLF_live12b_b * (float(bitCount(GLF_live12msb8)) - GLF_live12s_g)) * clamp(abs(abs(6.0 * (GLF_live12h_r - vec3(bitfieldReverse(0), bitCount(GLF_live12msb8), 2) / 3.0)) - 3.0) - float(bitCount(GLF_live12msb8)), float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0)), float(bitCount(int(GLF_live12resolution.x))));
    GLF_live12h_r = GLF_live12temp.x;
    GLF_live12s_g = GLF_live12temp.y;
    GLF_live12b_b = GLF_live12temp.z;
}

vec3 GLF_live12computeColor(float GLF_live12c, vec2 GLF_live12position) {
    int GLF_live12msb8 = 256;
    GLF_live12h_r = fract(GLF_live12c);
    GLF_live12s_g = float(bitCount(GLF_live12msb8));
    GLF_live12b_b = (0.5 + (sin(GLF_live12time) * 0.5 + 0.5));
    GLF_live12doConvert();
    GLF_live12s_g *= float(bitCount(GLF_live12msb8)) / GLF_live12position.y;
    GLF_live12h_r *= float(bitCount(GLF_live12msb8)) / GLF_live12position.x;
    if (abs(GLF_live12position.y - GLF_live12position.x) < 0.5) {
        GLF_live12b_b = clamp(float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0)), float(bitCount(GLF_live12msb8)), GLF_live12b_b * float(bitCount(GLF_live12msb8)) * 3.0);
    }
    return vec3(GLF_live12h_r, GLF_live12s_g, GLF_live12b_b);
}

vec3 GLF_live12defaultColor() {
    return vec3(float(bitfieldExtract(int(GLF_live12resolution.y), 0, 0)));
}

vec3 GLF_live12drawShape(vec2 GLF_live12pos, vec2 GLF_live12square, vec3 GLF_live12setting) {
    int GLF_live12msb8 = 256;
    bool GLF_live12c1 = GLF_live12pos.x - GLF_live12setting.x < GLF_live12square.x;
    if (!GLF_live12c1) {
        return GLF_live12defaultColor();
    }
    bool GLF_live12c2 = GLF_live12pos.x + GLF_live12setting.x > GLF_live12square.x;
    if (!GLF_live12c2) {
        return GLF_live12defaultColor();
    }
    bool GLF_live12c3 = GLF_live12pos.y - GLF_live12setting.x < GLF_live12square.y;
    if (!GLF_live12c3) {
        return GLF_live12defaultColor();
    }
    bool GLF_live12c4 = GLF_live12pos.y + GLF_live12setting.x > GLF_live12square.y;
    if (!GLF_live12c4) {
        return GLF_live12defaultColor();
    }
    bool GLF_live12c5 = GLF_live12pos.x - (GLF_live12setting.x - GLF_live12setting.y) < GLF_live12square.x;
    if (!GLF_live12c5) {
        return GLF_live12computeColor(GLF_live12setting.z / (5.0 * float(findMSB(GLF_live12msb8))), GLF_live12pos);
    }
    bool GLF_live12c6 = GLF_live12pos.x + (GLF_live12setting.x - GLF_live12setting.y) > GLF_live12square.x;
    if (!GLF_live12c6) {
        return GLF_live12computeColor(GLF_live12setting.z / (5.0 * float(findMSB(GLF_live12msb8))), GLF_live12pos);
    }
    bool GLF_live12c7 = GLF_live12pos.y - (GLF_live12setting.x - GLF_live12setting.y) < GLF_live12square.y;
    if (!GLF_live12c7) {
        return GLF_live12computeColor(GLF_live12setting.z / (5.0 * float(findMSB(GLF_live12msb8))), GLF_live12pos);
    }
    bool GLF_live12c8 = GLF_live12pos.y + (GLF_live12setting.x - GLF_live12setting.y) > GLF_live12square.y;
    if (!GLF_live12c8) {
        return GLF_live12computeColor(GLF_live12setting.z / (5.0 * float(findMSB(GLF_live12msb8))), GLF_live12pos);
    }
    return GLF_live12defaultColor();
}

vec4 GLF_live11gl_FragCoord = _GLF_FUZZED(vec4(-9.5, 2662.7017, 8404.4719, 9.9));
const int GLF_live11N = 10;
int GLF_live11data[10] = int[10](_GLF_FUZZED((52132 + 85812)), _GLF_FUZZED(-81446), _GLF_FUZZED(73851), _GLF_FUZZED((28901 & (+82144))), _GLF_FUZZED(-22252), _GLF_FUZZED((~40093)), _GLF_FUZZED(ivec3(-36683, 31254, 25253).r), _GLF_FUZZED(-96467), _GLF_FUZZED(int((27616u + 24491u))), _GLF_FUZZED((-88569))), GLF_live11temp[10] = int[10](_GLF_FUZZED(((-68439) - 35408)), _GLF_FUZZED((-(+76107))), _GLF_FUZZED(int((100290u * 164313u))), _GLF_FUZZED(15528), _GLF_FUZZED(82850), _GLF_FUZZED(-76503), _GLF_FUZZED((74542 * (94422 + (-43406)))), _GLF_FUZZED(((68128 + 54142) | (-72169))), _GLF_FUZZED(-9683), _GLF_FUZZED((96364 & (-92001))));

void GLF_live11merge(int GLF_live11from, int GLF_live11mid, int GLF_live11to) {
    int GLF_live11k = GLF_live11from, GLF_live11i = GLF_live11from, GLF_live11j = GLF_live11mid + 1;
    {
        int GLF_live11looplimiter0 = 0;
        while (GLF_live11i <= GLF_live11mid && GLF_live11j <= GLF_live11to) {
            if (GLF_live11looplimiter0 >= 5) {
                break;
            }
            GLF_live11looplimiter0++;
            {
                if (GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] < GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j, 10)]) {
                    GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i++, 10)];
                } else {
                    GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live11looplimiter1 = 0;
        while (GLF_live11i < GLF_live11N && GLF_live11i <= GLF_live11mid) {
            if (GLF_live11looplimiter1 >= 5) {
                break;
            }
            GLF_live11looplimiter1++;
            {
                GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i++, 10)];
            }
        }
    }
    {
        int GLF_live11looplimiter2 = 0;
        for (int GLF_live11i = GLF_live11from; GLF_live11i <= GLF_live11to; GLF_live11i++) {
            if (GLF_live11looplimiter2 >= 5) {
                break;
            }
            GLF_live11looplimiter2++;
            {
                GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)];
            }
        }
    }
}

struct _GLF_struct_4 {
    bvec3 _f0;
    uvec4 _f1;
    int donor_replacementGLF_dead9i;
    vec4 _f2;
    uvec2 _f3;
};

struct _GLF_struct_3 {
    ivec2 _f0;
    bvec2 _f1;
    _GLF_struct_4 _f2;
    mat3 _f3;
};

struct _GLF_struct_5 {
    bvec4 _f0;
    ivec3 _f1;
    vec3 donor_replacementGLF_dead7color;
};

struct _GLF_struct_6 {
    mat2x4 _f0;
    uvec4 _f1;
    uvec4 _f2;
    int GLF_live1count;
};

struct _GLF_struct_12 {
    ivec3 _f0;
    vec3 _f1;
    vec2 _f2;
    mat2x3 _f3;
};

struct _GLF_struct_11 {
    mat4x3 _f0;
    _GLF_struct_12 _f1;
    vec2 _f2;
    mat3x4 _f3;
};

struct _GLF_struct_10 {
    float _f0;
    mat3 _f1;
    int GLF_live1looplimiter2;
    vec3 _f2;
};

struct _GLF_struct_9 {
    uvec3 _f0;
    uvec4 _f1;
    bool _f2;
    bvec4 _f3;
    mat3x4 _f4;
    mat4x3 _f5;
};

struct _GLF_struct_8 {
    int _f0;
    bool _f1;
    int _f2;
    bvec3 _f3;
    _GLF_struct_9 _f4;
    bvec4 _f5;
    bvec3 _f6;
};

struct _GLF_struct_7 {
    bvec3 _f0;
    vec3 _f1;
    _GLF_struct_8 _f2;
    _GLF_struct_10 _f3;
    _GLF_struct_11 _f4;
    int _f5;
};

struct _GLF_struct_20 {
    bool _f0;
};

struct _GLF_struct_19 {
    bvec4 _f0;
    vec2 _f1;
    uvec4 _f2;
    mat2 _f3;
    vec2 _f4;
    ivec3 _f5;
    ivec3 _f6;
};

struct _GLF_struct_18 {
    ivec3 _f0;
    bvec3 _f1;
    ivec2 _f2;
    mat2x4 _f3;
    uint _f4;
    bvec2 _f5;
};

struct _GLF_struct_17 {
    mat3x4 _f0;
    _GLF_struct_18 _f1;
    _GLF_struct_19 _f2;
    ivec4 _f3;
    float GLF_dead6p;
    mat4x3 _f4;
};

struct _GLF_struct_16 {
    mat3 _f0;
};

struct _GLF_struct_15 {
    bool _f0;
};

struct _GLF_struct_14 {
    mat2x3 _f0;
    _GLF_struct_15 _f1;
    mat2 _f2;
    _GLF_struct_16 _f3;
    mat2 _f4;
};

struct _GLF_struct_13 {
    ivec2 _f0;
    _GLF_struct_14 _f1;
    bvec3 _f2;
    _GLF_struct_17 _f3;
    bvec4 _f4;
    _GLF_struct_20 _f5;
};

struct _GLF_struct_30 {
    uvec2 _f0;
    bvec3 _f1;
    vec3 _f2;
};

struct _GLF_struct_29 {
    mat2x4 _f0;
    vec4 _f1;
    uvec2 _f2;
    mat2 _f3;
    _GLF_struct_30 _f4;
    mat4 _f5;
    ivec3 _f6;
};

struct _GLF_struct_28 {
    mat3x4 _f0;
    uvec2 _f1;
    vec3 _f2;
    mat4 _f3;
    mat3x4 _f4;
};

struct _GLF_struct_27 {
    mat2x4 _f0;
    _GLF_struct_28 _f1;
};

struct _GLF_struct_26 {
    ivec3 _f0;
    float _f1;
    bvec3 _f2;
    uvec3 _f3;
};

struct _GLF_struct_25 {
    vec3 _f0;
};

struct _GLF_struct_24 {
    bvec2 _f0;
    mat4 _f1;
    mat3 _f2;
};

struct _GLF_struct_23 {
    ivec3 _f0;
    uvec4 _f1;
    vec2 _f2;
};

struct _GLF_struct_22 {
    _GLF_struct_23 _f0;
    float GLF_dead6p;
    ivec3 _f1;
    uvec4 _f2;
    _GLF_struct_24 _f3;
    _GLF_struct_25 _f4;
    mat4x2 _f5;
};

struct _GLF_struct_21 {
    _GLF_struct_22 _f0;
    uvec3 _f1;
    mat3x4 _f2;
    _GLF_struct_26 _f3;
    _GLF_struct_27 _f4;
    _GLF_struct_29 _f5;
};

struct _GLF_struct_36 {
    bvec3 _f0;
    uint _f1;
    bvec4 _f2;
    uvec2 _f3;
    mat2x3 _f4;
};

struct _GLF_struct_35 {
    _GLF_struct_36 _f0;
    mat4x3 _f1;
};

struct _GLF_struct_34 {
    mat4x3 _f0;
    uvec2 _f1;
    ivec2 _f2;
    mat2x4 _f3;
    ivec2 _f4;
    vec3 _f5;
};

struct _GLF_struct_33 {
    bvec2 _f0;
    vec4 _f1;
    vec2 _f2;
    _GLF_struct_34 _f3;
    float _f4;
};

struct _GLF_struct_32 {
    uvec2 _f0;
    vec4 donor_replacementGLF_dead9res;
    ivec4 _f1;
    bvec4 _f2;
    vec3 _f3;
    mat2x3 _f4;
};

struct _GLF_struct_31 {
    mat4 _f0;
    _GLF_struct_32 _f1;
    _GLF_struct_33 _f2;
    _GLF_struct_35 _f3;
};

struct _GLF_struct_41 {
    mat3x4 _f0;
    bvec4 _f1;
    mat3x2 _f2;
};

struct _GLF_struct_40 {
    bool _f0;
    vec3 _f1;
    bvec3 _f2;
    uvec2 _f3;
    ivec2 _f4;
};

struct _GLF_struct_39 {
    vec3 _f0;
    mat4 _f1;
    _GLF_struct_40 _f2;
    mat4x2 _f3;
    bool _f4;
    mat2 _f5;
    vec2 _f6;
};

struct _GLF_struct_38 {
    bvec2 _f0;
    mat4x2 _f1;
    mat4 _f2;
    vec3 _f3;
    int _f4;
    uvec2 _f5;
    int GLF_live1looplimiter2;
};

struct _GLF_struct_37 {
    _GLF_struct_38 _f0;
    vec3 _f1;
    _GLF_struct_39 _f2;
    mat3x2 _f3;
    float _f4;
    _GLF_struct_41 _f5;
};

const int GLF_dead6dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);

struct GLF_dead7QuicksortObject {
    int numbers[10];
};

GLF_dead7QuicksortObject GLF_dead7obj = GLF_dead7QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead7swap(int GLF_dead7i, int GLF_dead7j) {
    int GLF_dead7temp = GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 10)];
    GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 10)] = GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7j, 10)];
    GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7j, 10)] = GLF_dead7temp;
}

layout(set = 0, binding = 6) uniform sampler2D GLF_dead9tex;
const float GLF_dead9weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
int GLF_dead4MATRIX_N = 4;

struct GLF_dead5BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead5BST GLF_dead5tree[10] = GLF_dead5BST[10](GLF_dead5BST(0, 0, 0), GLF_dead5BST(0, 0, 0), GLF_dead5BST(0, 0, 0), GLF_dead5BST(0, 0, 0), GLF_dead5BST(0, 0, 0), GLF_dead5BST(0, 0, 0), GLF_dead5BST(0, 0, 0), GLF_dead5BST(0, 0, 0), GLF_dead5BST(0, 0, 0), GLF_dead5BST(0, 0, 0));

void GLF_dead5makeTreeNode(inout GLF_dead5BST GLF_dead5tree, int GLF_dead5data) {
    {
        vec2 GLF_live10color = _GLF_FUZZED(((-7653.3852) + vec2(2343.4133, -1985.1074)));
        int GLF_live10i = _GLF_FUZZED((72949 * (-14536)));
        vec3 GLF_live10vecCoor = _GLF_FUZZED(vec3(-54.18, -3.1, -9.2));
        if (int(GLF_live10gl_FragCoord[1]) < 60) {
            GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[1]))));
            GLF_live10color[1] *= atan(faceforward(GLF_live10injectionSwitch, GLF_live10color.xx, GLF_live10vecCoor.yx).y);
            ;
        } else if (int(GLF_live10gl_FragCoord[1]) < 90) {
            GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[2]))));
            GLF_live10color.x += atanh(GLF_live10color.x) * cosh(GLF_live10injectionSwitch.y) * smoothstep(GLF_live10color, GLF_live10injectionSwitch, GLF_live10gl_FragCoord.yy).x;
            ;
        } else if (int(GLF_live10gl_FragCoord[1]) < 120) {
            GLF_live10color = fract(acosh(clamp(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[3])), 1.0, 1000.0)));
            GLF_live10color.x += (isnan(GLF_live10gl_FragCoord.x) ? log2(GLF_live10gl_FragCoord.x) : log2(GLF_live10gl_FragCoord.y));
            ;
        } else if (int(GLF_live10gl_FragCoord[1]) < 150) {
            ;
        } else if (int(GLF_live10gl_FragCoord[1]) < 180) {
            GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[4]))));
            GLF_live10color[1] += asinh(GLF_live10gl_FragCoord.y * ldexp(GLF_live10color.y, -GLF_live10i));
            ;
        } else if (int(GLF_live10gl_FragCoord[1]) < 210) {
            GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[5]))));
            GLF_live10color.y -= tanh(GLF_live10color.x) / cosh(GLF_live10color.y);
            ;
        } else if (int(GLF_live10gl_FragCoord[1]) < 240) {
            GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
            GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
            ;
        } else if (int(GLF_live10gl_FragCoord[1]) < 270) {
            GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[7]))));
            GLF_live10color.y *= mix(normalize(GLF_live10vecCoor), normalize(vec3(GLF_live10color, degrees(GLF_live10color.x))), GLF_live10injectionSwitch.x).y;
            ;
        } else {
            ;
        }
    }
    GLF_dead5tree.data = GLF_dead5data;
    GLF_dead5tree.leftIndex = -1;
    {
        float GLF_live11grey = _GLF_FUZZED(-6.7);
        {
            GLF_live11grey = 0.5 + float(GLF_live11data[7]) / 10.0;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            {
                ;
            }
        }
        ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(ivec2(-44787, 52116));
        {
            float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
            ;
        }
    }
    GLF_dead5tree.rightIndex = -1;
    {
        {
            ;
        }
    }
}

vec4 GLF_live1_GLF_color = _GLF_FUZZED((mat2x4(-4.8, -2.5, -29.03, 78.19, -500.818, -312.143, -7.8, 5512.5364) * vec2(5680.0127, 270.268)));

struct GLF_live1BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live1BST GLF_live1tree[10] = GLF_live1BST[10](GLF_live1BST(0, 0, 0), GLF_live1BST(0, 0, 0), GLF_live1BST(0, 0, 0), GLF_live1BST(0, 0, 0), GLF_live1BST(0, 0, 0), GLF_live1BST(0, 0, 0), GLF_live1BST(0, 0, 0), GLF_live1BST(0, 0, 0), GLF_live1BST(0, 0, 0), GLF_live1BST(0, 0, 0));

void GLF_live1makeTreeNode(inout GLF_live1BST GLF_live1tree, int GLF_live1data) {
    GLF_live1tree.data = GLF_live1data;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return;
    }
    GLF_live1tree.leftIndex = -1;
    if (_GLF_DEAD(false)) {
        return;
    }
    GLF_live1tree.rightIndex = -1;
}

int GLF_live1search(int GLF_live1target) {
    GLF_live1BST GLF_live1currentNode = GLF_live1BST(0, 0, 0);
    int GLF_live1index = 0;
    {
        int GLF_live1looplimiter1 = 0;
        while (GLF_live1index != -1) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead2limit = _GLF_FUZZED(fma(7.5, asin(-2400.8891), 723.216));
                float donor_replacementGLF_dead2result = _GLF_FUZZED(43.90);
                float donor_replacementGLF_dead2thirty_two = _GLF_FUZZED(atan(2.8, -51.87));
                for (int GLF_dead2i = 1; GLF_dead2i < 800; GLF_dead2i++) {
                    if ((GLF_dead2i % 32) == 0) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec3 donor_replacementGLF_dead7color = _GLF_FUZZED(vec3(-3688.9080, 5.7, -76.14));
                            vec2 donor_replacementGLF_dead7uv = _GLF_FUZZED(vec2(6.6, 710.730));
                            if (donor_replacementGLF_dead7uv.y > (1.0 / 4.0)) {
                                donor_replacementGLF_dead7color.x += float(GLF_dead7obj.numbers[5]);
                            }
                        }
                        donor_replacementGLF_dead2result += 0.4;
                    } else {
                        if (mod(float(GLF_dead2i), round(donor_replacementGLF_dead2thirty_two)) <= 0.01) {
                            donor_replacementGLF_dead2result += 100.0;
                            {
                                int GLF_live11high = _GLF_FUZZED(((-32274) + 14521));
                                int GLF_live11i = _GLF_FUZZED((((-95984) + (-99774)) & 28973));
                                int GLF_live11m = _GLF_FUZZED((87239 & 2450));
                                {
                                    int GLF_live11from = GLF_live11i;
                                    int GLF_live11mid = GLF_live11i + GLF_live11m - 1;
                                    int GLF_live11to = min(GLF_live11i + 2 * GLF_live11m - 1, GLF_live11high);
                                    GLF_live11merge(GLF_live11from, GLF_live11mid, GLF_live11to);
                                }
                            }
                        }
                        {
                            int GLF_live11i = _GLF_FUZZED(39385);
                            {
                                int GLF_live11looplimiter5 = 0;
                                do {
                                    if (GLF_live11looplimiter5 >= 5) {
                                        break;
                                    }
                                    GLF_live11looplimiter5++;
                                    {
                                        switch (GLF_live11i) {
                                            case 0:
                                                GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = 4;
                                                break;
                                            case 1:
                                                GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = 3;
                                                break;
                                            case 2:
                                                GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = 2;
                                                break;
                                            case 3:
                                                GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = 1;
                                                break;
                                            case 4:
                                                GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = 0;
                                                break;
                                            case 5:
                                                GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = -1;
                                                break;
                                            case 6:
                                                GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = -2;
                                                break;
                                            case 7:
                                                GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = -3;
                                                break;
                                            case 8:
                                                GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = -4;
                                                break;
                                            case 9:
                                                GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = -5;
                                                break;
                                        }
                                        GLF_live11i++;
                                    }
                                } while (GLF_live11i < 10);
                            }
                        }
                    }
                    if (float(GLF_dead2i) >= donor_replacementGLF_dead2limit) {
                        ;
                    }
                }
                {
                    int GLF_live10i = _GLF_FUZZED((~51322));
                    int GLF_live10j = _GLF_FUZZED(int(false));
                    int GLF_live10k = _GLF_FUZZED((48480 ^ int(false)));
                    if (GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] < GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 10)]) {
                        GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i++, 10)];
                    } else {
                        GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j++, 10)];
                    }
                }
            }
            if (GLF_live1looplimiter1 >= 7) {
                break;
            }
            GLF_live1looplimiter1++;
            {
                int GLF_live13looplimiter3 = 0;
                if (GLF_live13looplimiter3 >= 6) {
                    ;
                }
            }
            {
                GLF_live1currentNode = GLF_live1tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1index, 10)];
                if (GLF_live1currentNode.data == GLF_live1target) {
                    return GLF_live1target;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                    int donor_replacementGLF_dead3i = _GLF_FUZZED((GLF_live1looplimiter1 >> GLF_live1index));
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead8result = _GLF_FUZZED(-4204.8731);
                        {
                            int GLF_live12msb8 = _GLF_FUZZED(17701);
                            vec2 GLF_live12pos = _GLF_FUZZED(vec2(4.4, 97.24));
                            vec3 GLF_live12setting = _GLF_FUZZED(vec4(-4.7, 5680.0133, -7.4, -7.8).yxy);
                            {
                                ;
                            }
                        }
                        {
                            donor_replacementGLF_dead8result += 0.4;
                        }
                    }
                    int donor_replacementGLF_dead3v = _GLF_FUZZED((false ? (-88645) : (ivec3(-58023, -25482, 70128), GLF_live1target)));
                    for (donor_replacementGLF_dead3i = 0; donor_replacementGLF_dead3i < GLF_live1index; donor_replacementGLF_dead3i++) {
                        donor_replacementGLF_dead3v = (4 * donor_replacementGLF_dead3v * (1000 - donor_replacementGLF_dead3v)) / 1000;
                    }
                }
                GLF_live1index = GLF_live1target > GLF_live1currentNode.data ? GLF_live1currentNode.rightIndex : GLF_live1currentNode.leftIndex;
            }
        }
    }
    return -1;
}

struct _GLF_struct_2 {
    mat2x4 _f0;
    uvec3 _f1;
    vec3 _f2;
    bool _f3;
};

struct _GLF_struct_1 {
    _GLF_struct_2 _f0;
    int _f1;
    ivec4 _f2;
    mat2 _f3;
    float _f4;
    mat2x3 _f5;
};

struct _GLF_struct_0 {
    _GLF_struct_1 _f0;
    mat3 _f1;
    float _f2;
    mat2x3 _f3;
    ivec2 _f4;
    vec2 o;
    vec3 _f5;
};

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
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead4magnitudeX = _GLF_FUZZED(max(-8529.8729, -4.5));
            mat4 donor_replacementGLF_dead4matrix_a = _GLF_FUZZED(mat4(93.16, 6.4, 5280.3226, 2955.2082, 7.2, -0.8, -662.962, 6.9, 830.869, 545.765, -7332.7780, 533.724, 8.6, 64.59, 852.907, 2.9));
            for (int GLF_dead4x = GLF_dead4MATRIX_N - 1; GLF_dead4x >= j; GLF_dead4x--) {
                {
                    int GLF_live12msb8 = _GLF_FUZZED(2679);
                    vec2 GLF_live12pos = _GLF_FUZZED(vec2(3.8, -0.1));
                    vec3 GLF_live12setting = _GLF_FUZZED((9.6 * vec3(8.2, 1361.3282, 1368.7807)));
                    {
                        ;
                    }
                }
                donor_replacementGLF_dead4magnitudeX += pow(donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4x, 4)][_GLF_MAKE_IN_BOUNDS_INT(j, 4)], 2.0);
                {
                    int GLF_live13i = _GLF_FUZZED((ivec3(-90298, -88207, -82355).p & (-46099)));
                    int GLF_live13j = _GLF_FUZZED((47668 - int(false)));
                    {
                        GLF_live13i++;
                        GLF_live13swap(GLF_live13i, GLF_live13j);
                    }
                }
                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4x, 4)] = donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4x, 4)][_GLF_MAKE_IN_BOUNDS_INT(j, 4)];
            }
        }
        {
            int GLF_live1baseIndex = _GLF_FUZZED(-55953);
            int GLF_live1data = _GLF_FUZZED(49287);
            int GLF_live1treeIndex = _GLF_FUZZED(-16460);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    float GLF_live11grey = _GLF_FUZZED(116.944);
                    if (int(GLF_live11gl_FragCoord[1]) < 180) {
                        GLF_live11grey = 0.5 + float(GLF_live11data[5]) / 10.0;
                    } else {
                        if (int(GLF_live11gl_FragCoord[1]) < 210) {
                            GLF_live11grey = 0.5 + float(GLF_live11data[6]) / 10.0;
                        } else {
                            if (int(GLF_live11gl_FragCoord[1]) < 240) {
                                GLF_live11grey = 0.5 + float(GLF_live11data[7]) / 10.0;
                            } else {
                                if (int(GLF_live11gl_FragCoord[1]) < 270) {
                                    GLF_live11grey = 0.5 + float(GLF_live11data[8]) / 10.0;
                                } else {
                                    ;
                                }
                            }
                        }
                    }
                }
                int donor_replacementGLF_dead5baseIndex = _GLF_FUZZED(GLF_live1data);
                {
                    GLF_dead5tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5baseIndex, 10)].leftIndex = GLF_live1treeIndex;
                    GLF_dead5makeTreeNode(GLF_dead5tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1treeIndex, 10)], GLF_live1baseIndex);
                    if (_GLF_DEAD(false)) {
                        _GLF_struct_3 _GLF_struct_replacement_3 = _GLF_struct_3(ivec2(1, 1), bvec2(true, true), _GLF_struct_4(bvec3(true, true, true), uvec4(1u, 1u, 1u, 1u), _GLF_FUZZED(findLSB(97623u)), vec4(1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u)), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                        vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(vec4(333.326, 6.6, -6.6, 7623.5186));
                        float donor_replacementGLF_dead9uvstep = _GLF_FUZZED((mat4x2(mat4x3(-0.5, -3.2, -51.21, 46.19, 6.8, -5.4, -2205.6509, 4.9, 394.665, 3.1, 205.666, -7.3)), 9.7));
                        {
                            for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                donor_replacementGLF_dead9res += texture(GLF_dead9tex, n + vec2(float(_GLF_struct_replacement_3._f2.donor_replacementGLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_3._f2.donor_replacementGLF_dead9i * 3 + GLF_dead9j, 9)];
                            }
                        }
                    }
                    ;
                }
            }
            {
                float GLF_live11grey = _GLF_FUZZED(472.078);
                {
                    GLF_live11grey = 0.5 + float(GLF_live11data[7]) / 10.0;
                }
            }
            {
                if (GLF_live1data <= GLF_live1tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1baseIndex, 10)].data) {
                    if (GLF_live1tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1baseIndex, 10)].leftIndex == -1) {
                        GLF_live1tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1baseIndex, 10)].leftIndex = GLF_live1treeIndex;
                        GLF_live1makeTreeNode(GLF_live1tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1treeIndex, 10)], GLF_live1data);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead3v = _GLF_FUZZED(findMSB(GLF_live1data));
                            {
                                donor_replacementGLF_dead3v = (4 * donor_replacementGLF_dead3v * (1000 - donor_replacementGLF_dead3v)) / 1000;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(bitfieldReverse(ivec2(-59772, -44416)));
                                while (donor_replacementGLF_dead6pos.y != 256) {
                                    if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                                        float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                    donor_replacementGLF_dead6pos.y++;
                                }
                            }
                        }
                        ;
                    } else {
                        GLF_live1baseIndex = GLF_live1tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1baseIndex, 10)].leftIndex;
                        ;
                    }
                } else {
                    if (GLF_live1tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1baseIndex, 10)].rightIndex == -1) {
                        GLF_live1tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1baseIndex, 10)].rightIndex = GLF_live1treeIndex;
                        GLF_live1makeTreeNode(GLF_live1tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1treeIndex, 10)], GLF_live1data);
                        {
                            {
                                ;
                            }
                        }
                        ;
                        {
                            vec3 GLF_live13color = _GLF_FUZZED((vec4(63.87, -473.647, 666.772, -7136.9245) * (mat3x4(42.46, 6.7, 7.0, 5.6, 9.0, -7.7, 38.96, -9169.8921, -3.7, 8532.0631, 342.928, -8.0) - mat3x4(-3.4, -9.8, 71.34, -43.46, 3.5, -786.439, -20.29, 91.53, 95.43, 5.0, -8958.8944, 6.0))));
                            int GLF_live13count = _GLF_FUZZED(-83940);
                            {
                                int GLF_live13looplimiter4 = 0;
                                do {
                                    if (GLF_live13looplimiter4 >= 6) {
                                        break;
                                    }
                                    GLF_live13looplimiter4++;
                                    {
                                        GLF_live13color -= GLF_live13palette(vec3(float(GLF_live13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live13injectionSwitch.x, float(GLF_live13obj.numbers[2]) * 0.1, float(GLF_live13obj.numbers[8]) * 0.1));
                                        GLF_live13count++;
                                    }
                                } while (GLF_live13count != GLF_live13obj.numbers[1]);
                            }
                        }
                    } else {
                        GLF_live1baseIndex = GLF_live1tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1baseIndex, 10)].rightIndex;
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead7color = _GLF_FUZZED(m);
                            vec2 donor_replacementGLF_dead7uv = _GLF_FUZZED(step(-1.0, resolution));
                            if (donor_replacementGLF_dead7uv.x > (1.0 / 4.0)) {
                                donor_replacementGLF_dead7color.x += float(GLF_dead7obj.numbers[1]);
                            }
                            {
                                {
                                    ;
                                }
                            }
                        }
                        ;
                    }
                }
            }
        }
        for (int i = -1; i <= int(injectionSwitch.y); i++) {
            {
                int GLF_live11high = _GLF_FUZZED(((-24752) + (-13094)));
                int GLF_live11low = _GLF_FUZZED(95579);
                int GLF_live11m = _GLF_FUZZED(((-83745) + (-10687)));
                {
                    int GLF_live11looplimiter3 = 0;
                    for (int GLF_live11i = GLF_live11low; GLF_live11i < GLF_live11high; GLF_live11i += 2 * GLF_live11m) {
                        if (GLF_live11looplimiter3 >= 5) {
                            break;
                        }
                        GLF_live11looplimiter3++;
                        {
                            int GLF_live11from = GLF_live11i;
                            int GLF_live11mid = GLF_live11i + GLF_live11m - 1;
                            int GLF_live11to = min(GLF_live11i + 2 * GLF_live11m - 1, GLF_live11high);
                            GLF_live11merge(GLF_live11from, GLF_live11mid, GLF_live11to);
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), !(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) {
                {
                    int GLF_live10high = _GLF_FUZZED(-68775);
                    int GLF_live10i = _GLF_FUZZED(-16602);
                    int GLF_live10looplimiter3 = 0;
                    int GLF_live10m = _GLF_FUZZED(((-80514) & (-88164)));
                    {
                        if (GLF_live10looplimiter3 >= 3) {
                            ;
                        }
                        GLF_live10looplimiter3++;
                        {
                            int GLF_live10from = GLF_live10i;
                            int GLF_live10mid = GLF_live10i + GLF_live10m - 1;
                            int GLF_live10to = min(GLF_live10i + 2 * GLF_live10m - 1, GLF_live10high);
                            GLF_live10merge(GLF_live10from, GLF_live10mid, GLF_live10to);
                        }
                    }
                }
                break;
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(((ivec2(93714, 42068) + ivec2(-95323, 82603)) % ivec2(-70744, -41514)));
                    {
                        float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                        ;
                    }
                }
            }
            vec2 g = vec2(float(j), float(i));
            _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(_GLF_struct_1(_GLF_struct_2(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), vec3(1.0, 1.0, 1.0), true), 1, ivec4(1, 1, 1, 1), mat2(1.0, 1.0, 1.0, 1.0), 1.0, mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), mix(n, g, 0.2), vec3(1.0, 1.0, 1.0));
            if (injectionSwitch.x < (m.x)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    continue;
                    if (_GLF_DEAD(false)) {
                        {
                            {
                                {
                                    ;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            {
                                int GLF_live10from = _GLF_FUZZED(((-86857) ^ (-61886)));
                                int GLF_live10looplimiter2 = 0;
                                int GLF_live10to = _GLF_FUZZED(80076);
                                for (int GLF_live10i = GLF_live10from; GLF_live10i <= GLF_live10to; GLF_live10i++) {
                                    if (GLF_live10looplimiter2 >= 3) {
                                        break;
                                    }
                                    GLF_live10looplimiter2++;
                                    {
                                        GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)];
                                    }
                                }
                            }
                            _GLF_color = (length(299.665) / vec4(9.0, 9.5, -8.3, -3106.6496));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(-206.896);
                                {
                                    for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                        GLF_live1_GLF_color += texture(GLF_dead9tex, n + vec2(float(i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(i * 3 + GLF_dead9j, 9)];
                                    }
                                }
                            }
                        }
                        int donor_replacementGLF_dead2i = _GLF_FUZZED(i);
                        {
                            if (m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i, 3)] >= 1.0) {
                                m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i, 3)] = m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i, 3)] * m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i, 3)];
                            }
                            {
                                vec2 GLF_live10color = _GLF_FUZZED(vec2(-8.6, -2.7));
                                int GLF_live10i = _GLF_FUZZED(27777);
                                vec3 GLF_live10vecCoor = _GLF_FUZZED((137.692 + vec2(-72.79, 59.15).grg));
                                {
                                    GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[4]))));
                                    GLF_live10color[1] += asinh(GLF_live10gl_FragCoord.y * ldexp(GLF_live10color.y, -GLF_live10i));
                                    ;
                                }
                            }
                        }
                    }
                }
                int k = 1;
                while (k >= 0) {
                    _GLF_struct_replacement_0.o = _GLF_struct_replacement_0.o + _GLF_struct_replacement_0.o;
                    {
                        int GLF_live10from = _GLF_FUZZED(35909);
                        int GLF_live10to = _GLF_FUZZED(-7612);
                        {
                            int GLF_live10looplimiter2 = 0;
                            for (int GLF_live10i = GLF_live10from; GLF_live10i <= GLF_live10to; GLF_live10i++) {
                                if (GLF_live10looplimiter2 >= 3) {
                                    break;
                                }
                                GLF_live10looplimiter2++;
                                {
                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)];
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                        {
                            int GLF_live10i = _GLF_FUZZED(99518);
                            int GLF_live10looplimiter5 = 0;
                            {
                                if (GLF_live10looplimiter5 >= 3) {
                                    ;
                                }
                                GLF_live10looplimiter5++;
                                {
                                    switch (GLF_live10i) {
                                        case 0:
                                            GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 4;
                                            break;
                                        case 1:
                                            GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 3;
                                            break;
                                        case 2:
                                            GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 2;
                                            break;
                                        case 3:
                                            GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 1;
                                            break;
                                        case 4:
                                            GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 0;
                                            break;
                                        case 5:
                                            GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -1;
                                            break;
                                        case 6:
                                            GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -2;
                                            break;
                                        case 7:
                                            GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -3;
                                            break;
                                        case 8:
                                            GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -4;
                                            break;
                                        case 9:
                                            GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -5;
                                            break;
                                    }
                                    GLF_live10i++;
                                }
                            }
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            {
                                vec3 GLF_live13color = _GLF_FUZZED(vec3(153.720, -5.5, 93.70));
                                vec2 GLF_live13grid = _GLF_FUZZED((73.32 + vec2(-3.4, 9.7)));
                                vec2 GLF_live13uv = _GLF_FUZZED((vec2(-6.9, 344.989) - vec2(-2225.6978, 5518.4685)));
                                if (GLF_live13uv.x > (1.0 / 4.0)) {
                                    int GLF_live13count = int(GLF_live13injectionSwitch.x);
                                    {
                                        int GLF_live13looplimiter3 = 0;
                                        do {
                                            if (GLF_live13looplimiter3 >= 6) {
                                                break;
                                            }
                                            GLF_live13looplimiter3++;
                                            {
                                                GLF_live13color += GLF_live13palette(vec3(0.5, float(GLF_live13obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live13injectionSwitch.y)), vec3(float(GLF_live13obj.numbers[4]) * 0.1, GLF_live13injectionSwitch.x, 0.6));
                                                GLF_live13count++;
                                            }
                                        } while (GLF_live13count != GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.x), 10)]);
                                    }
                                    GLF_live13grid = vec2(GLF_live13count + GLF_live13obj.numbers[8], GLF_live13count + GLF_live13obj.numbers[6]);
                                }
                            }
                            ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED((j % ivec2(-17615, 20513)));
                            if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                                float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                                ;
                            }
                        }
                        _GLF_color = vec4(exp2(-4.9), vec2(5.5, 0.6), -44.72);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        int donor_replacementGLF_dead3v = _GLF_FUZZED((k ^ ivec4(66285, 59282, -71798, 343)).p);
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec3 donor_replacementGLF_dead8c = _GLF_FUZZED(degrees(ceil(m)));
                                if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(j, 3)] >= 1.0) {
                                    donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(j, 3)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(j, 3)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(j, 3)];
                                }
                            }
                            donor_replacementGLF_dead3v = (4 * donor_replacementGLF_dead3v * (1000 - donor_replacementGLF_dead3v)) / 1000;
                        }
                    }
                    k--;
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead8result = _GLF_FUZZED(ceil(-6.5));
                        {
                            int GLF_live10high = _GLF_FUZZED(-41479);
                            int GLF_live10looplimiter4 = 0;
                            int GLF_live10low = _GLF_FUZZED(70512);
                            int GLF_live10m = _GLF_FUZZED(((-31785) * ((-57489) & 97217)));
                            {
                                if (GLF_live10looplimiter4 >= 3) {
                                    ;
                                }
                                GLF_live10looplimiter4++;
                                {
                                    {
                                        int GLF_live10looplimiter3 = 0;
                                        for (int GLF_live10i = GLF_live10low; GLF_live10i < GLF_live10high; GLF_live10i += 2 * GLF_live10m) {
                                            if (GLF_live10looplimiter3 >= 3) {
                                                break;
                                            }
                                            GLF_live10looplimiter3++;
                                            {
                                                int GLF_live10from = GLF_live10i;
                                                int GLF_live10mid = GLF_live10i + GLF_live10m - 1;
                                                int GLF_live10to = min(GLF_live10i + 2 * GLF_live10m - 1, GLF_live10high);
                                                GLF_live10merge(GLF_live10from, GLF_live10mid, GLF_live10to);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        {
                            {
                                vec2 GLF_live10color = _GLF_FUZZED((9516.6802 + vec2(-92.05, -95.17)));
                                int GLF_live10i = _GLF_FUZZED(49344);
                                vec3 GLF_live10vecCoor = _GLF_FUZZED(vec3(-9.6, -6.0, -557.496));
                                {
                                    GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
                                    GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
                                    ;
                                }
                            }
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead3i = _GLF_FUZZED(-89852);
                        for (donor_replacementGLF_dead3i = 0; donor_replacementGLF_dead3i < i; donor_replacementGLF_dead3i++) {
                            j = (4 * j * (1000 - j)) / 1000;
                        }
                    }
                }
                m = vec3(injectionSwitch.x, cos(_GLF_struct_replacement_0.o));
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead3iters = _GLF_FUZZED(int(log2(55.05)));
            for (j = 0; j < donor_replacementGLF_dead3iters; j++) {
                j = (4 * j * (1000 - j)) / 1000;
            }
            {
                int GLF_live11high = _GLF_FUZZED(62977);
                int GLF_live11looplimiter4 = 0;
                int GLF_live11low = _GLF_FUZZED(-42557);
                for (int GLF_live11m = 1; GLF_live11m <= GLF_live11high; GLF_live11m = 2 * GLF_live11m) {
                    if (GLF_live11looplimiter4 >= 5) {
                        break;
                    }
                    GLF_live11looplimiter4++;
                    {
                        {
                            int GLF_live11looplimiter3 = 0;
                            for (int GLF_live11i = GLF_live11low; GLF_live11i < GLF_live11high; GLF_live11i += 2 * GLF_live11m) {
                                if (GLF_live11looplimiter3 >= 5) {
                                    break;
                                }
                                GLF_live11looplimiter3++;
                                {
                                    int GLF_live11from = GLF_live11i;
                                    int GLF_live11mid = GLF_live11i + GLF_live11m - 1;
                                    int GLF_live11to = min(GLF_live11i + 2 * GLF_live11m - 1, GLF_live11high);
                                    GLF_live11merge(GLF_live11from, GLF_live11mid, GLF_live11to);
                                }
                            }
                        }
                    }
                }
            }
        }
        {
            bool GLF_live12c3 = _GLF_FUZZED(((vec3(244.709, -3254.0640, -67.38) * mat4x3(3.5, 8.0, -2261.9472, 5747.3733, 7.5, -5728.5783, 3918.6115, -708.410, 1.3, 636.984, -9.3, 2.8)) == vec4(-7185.5529, -5236.9783, 56.89, 769.652)));
            if (!GLF_live12c3) {
                ;
            }
        }
    }
    return vec2(m.x, m.y - m.z);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.y;
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(((mat3x2(501.576, -28.33, 3122.0482, -1.5, 8675.9365, -785.881) == mat3x2(4.8, -263.432, 0.6, -2410.7818, -6960.5302, 2916.9961)) ? (mat2(-3501.7483, -7.9, -9.3, 6557.0037) * uv) : injectionSwitch));
        float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(refract(122.537, 386.899, 8264.3698));
        for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
            for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                GLF_live1_GLF_color += texture(GLF_dead9tex, donor_replacementGLF_dead9coord + vec2(float(GLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i * 3 + GLF_dead9j, 9)];
            }
            {
                bool GLF_live12c8 = _GLF_FUZZED((vec3(5.7, -694.254, -3986.5536) != vec3(8370.4844, -4.4, -56.45)));
                int GLF_live12msb8 = _GLF_FUZZED((-21947));
                vec2 GLF_live12pos = _GLF_FUZZED((vec3(-9.2, -46.93, 3186.1516) * mat2x3(-0.5, 7.3, -1785.2977, -2.4, 5.9, 373.648)));
                vec3 GLF_live12setting = _GLF_FUZZED((vec3(-56.10, -2059.3991, 9.4)));
                if (!GLF_live12c8) {
                    ;
                }
            }
        }
    }
    float A[50];
    for (int i = 0; i < 200; i++) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = ceil(vec4(-287.267, 2956.6949, -1.9, -515.850));
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead8i = _GLF_FUZZED(i);
                float donor_replacementGLF_dead8result = _GLF_FUZZED(reflect(4.9, dFdyCoarse(-999.756)));
                float donor_replacementGLF_dead8thirty_two = _GLF_FUZZED(((8909.3566 * (-949.022)) / (-34.60)));
                {
                    int GLF_live10high = _GLF_FUZZED(-96206);
                    int GLF_live10looplimiter4 = 0;
                    int GLF_live10low = _GLF_FUZZED(51458);
                    for (int GLF_live10m = 1; GLF_live10m <= GLF_live10high; GLF_live10m = 2 * GLF_live10m) {
                        if (GLF_live10looplimiter4 >= 3) {
                            break;
                        }
                        GLF_live10looplimiter4++;
                        {
                            {
                                int GLF_live10looplimiter3 = 0;
                                for (int GLF_live10i = GLF_live10low; GLF_live10i < GLF_live10high; GLF_live10i += 2 * GLF_live10m) {
                                    if (GLF_live10looplimiter3 >= 3) {
                                        break;
                                    }
                                    GLF_live10looplimiter3++;
                                    {
                                        int GLF_live10from = GLF_live10i;
                                        int GLF_live10mid = GLF_live10i + GLF_live10m - 1;
                                        int GLF_live10to = min(GLF_live10i + 2 * GLF_live10m - 1, GLF_live10high);
                                        GLF_live10merge(GLF_live10from, GLF_live10mid, GLF_live10to);
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    if (mod(float(donor_replacementGLF_dead8i), round(donor_replacementGLF_dead8thirty_two)) <= 0.01) {
                        donor_replacementGLF_dead8result += 100.0;
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (i >= int(resolution.x)) {
            break;
        }
        if ((4 * (i / 4)) == i) {
            {
                int GLF_live12msb8 = _GLF_FUZZED((48436));
                vec2 GLF_live12pos = _GLF_FUZZED((-vec2(1.5, -79.86)));
                vec3 GLF_live12setting = _GLF_FUZZED(vec3(-544.002, 281.726, 0.4));
                {
                    ;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(log2((0.4 + uv)));
                    vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(GLF_live1_GLF_color);
                    float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(length(vec3(-4.7, 776.694, -0.8)));
                    for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                        for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                            donor_replacementGLF_dead9res += texture(GLF_dead9tex, donor_replacementGLF_dead9coord + vec2(float(GLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i * 3 + GLF_dead9j, 9)];
                        }
                    }
                }
                mat4 donor_replacementGLF_dead4matrix_a = _GLF_FUZZED(mat4(-8633.9868, 831.590, -1.1, -6.0, 6336.9110, -603.425, -8909.0051, -1113.9088, 6335.9850, -624.623, 6.3, -3.1, 3445.4255, 70.36, -950.382, -3479.4769));
                {
                    for (int GLF_dead4j = (GLF_dead4MATRIX_N - 1); GLF_dead4j >= (i + 1); GLF_dead4j--) {
                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] -= (donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j, 4)]);
                    }
                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] /= donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(i, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                    {
                        vec2 GLF_live12center = _GLF_FUZZED((928.252 - vec2(3728.8416, -92.07)));
                        int GLF_live12msb8 = _GLF_FUZZED(int(true));
                        vec2 GLF_live12position = _GLF_FUZZED((vec2(6.2, -1189.1139)));
                        vec3 GLF_live12result = _GLF_FUZZED(vec3(8333.6355, -86.06, -6.1));
                        {
                            int GLF_live12looplimiter0 = 0;
                            for (int GLF_live12i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live12resolution.x), 0, 0)); GLF_live12i >= bitfieldReverse(bitfieldExtract(int(GLF_live12resolution.x), 0, 0)); GLF_live12i--) {
                                if (GLF_live12looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live12looplimiter0++;
                                {
                                    vec3 GLF_live12d = _GLF_FUZZED(vec3(-40.14, 1.8, -0.6));
                                    GLF_live12d = GLF_live12drawShape(GLF_live12position, GLF_live12center + vec2(sin(float(GLF_live12i) / (float(bitCount(GLF_live12msb8)) * 10.0) + GLF_live12time) / 4.0 * float(bitCount(GLF_live12msb8)), float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live12i) / 100.0 * float(bitCount(GLF_live12msb8))), 0.01, float(GLF_live12i)));
                                    if (length(GLF_live12d) <= float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))) {
                                        continue;
                                    }
                                    GLF_live12result = vec3(GLF_live12d);
                                }
                            }
                        }
                    }
                }
            }
            A[i / 4] = float(i);
        }
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(ivec2(33090, 9850));
            while (donor_replacementGLF_dead6pos.y != 256) {
                if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                    float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                    ;
                }
                donor_replacementGLF_dead6pos.y++;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead2c = _GLF_FUZZED(vec3(9971.9801, -9208.6313, -55.53));
                {
                    if (donor_replacementGLF_dead2c[_GLF_MAKE_IN_BOUNDS_INT(i, 3)] >= 1.0) {
                        donor_replacementGLF_dead2c[_GLF_MAKE_IN_BOUNDS_INT(i, 3)] = donor_replacementGLF_dead2c[_GLF_MAKE_IN_BOUNDS_INT(i, 3)] * donor_replacementGLF_dead2c[_GLF_MAKE_IN_BOUNDS_INT(i, 3)];
                    }
                }
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(ivec2(18661, -88509));
                    {
                        {
                            ;
                        }
                    }
                    {
                        if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                            float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                            ;
                        }
                        donor_replacementGLF_dead6pos.y++;
                    }
                }
            }
            discard;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                vec3 donor_replacementGLF_dead7color = _GLF_FUZZED(vec3(-7.6, 2412.6252, -55.56));
                vec2 donor_replacementGLF_dead7uv = _GLF_FUZZED(resolution);
                if (donor_replacementGLF_dead7uv.x > (2.0 / 4.0)) {
                    donor_replacementGLF_dead7color.y += float(GLF_dead7obj.numbers[2]);
                }
            }
            {
                float GLF_live11grey = _GLF_FUZZED(-38.48);
                {
                    GLF_live11grey = 0.5 + float(GLF_live11data[6]) / 10.0;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    float GLF_live11grey = _GLF_FUZZED(7792.8481);
                    {
                        GLF_live11grey = 0.5 + float(GLF_live11data[2]) / 10.0;
                    }
                }
                int donor_replacementGLF_dead4i = _GLF_FUZZED(ivec3(32271, -25176, 54428)[1]);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(ivec2(ivec3(-23364, 49391, 10863)));
                    while (donor_replacementGLF_dead6pos.y != 256) {
                        if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                            float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                            ;
                        }
                        donor_replacementGLF_dead6pos.y++;
                    }
                }
                mat4 donor_replacementGLF_dead4matrix_a = _GLF_FUZZED(outerProduct(mat3x4(-5.1, 36.06, -25.19, 5.6, 79.64, 1.4, 90.90, -811.984, -90.65, -37.39, 0.2, 115.908)[1], GLF_live1_GLF_color));
                vec4 donor_replacementGLF_dead4matrix_b = _GLF_FUZZED(faceforward(vec4(-7505.9921, 4498.8684, 4868.0650, 8.8), _GLF_color, vec4(-0.0, 1.5, -2.5, -928.951)));
                for (int GLF_dead4j = (GLF_dead4MATRIX_N - 1); GLF_dead4j >= (donor_replacementGLF_dead4i + 1); GLF_dead4j--) {
                    donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 4)] -= (donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j, 4)] * donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j, 4)]);
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    for (int i = 0; i < 50; i++) {
        if (i < int(gl_FragCoord.x)) {
            {
                int GLF_live13looplimiter3 = 0;
                if (GLF_live13looplimiter3 >= 6) {
                    ;
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead2c = _GLF_FUZZED(dFdxCoarse(vec3(-363.036, -194.177, -3.4)));
                    for (int GLF_dead2i = 0; GLF_dead2i < 3; GLF_dead2i++) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(findMSB(uvec2(83522u, 125562u)));
                            while (donor_replacementGLF_dead6pos.y != 256) {
                                if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                                    float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                                    ;
                                    {
                                        bool GLF_live12c8 = _GLF_FUZZED(false);
                                        int GLF_live12msb8 = _GLF_FUZZED(-61701);
                                        vec2 GLF_live12pos = _GLF_FUZZED((vec2(-28.45, -8.2) * 783.119));
                                        vec3 GLF_live12setting = _GLF_FUZZED((6.6 * vec3(-8.7, -5.2, 557.510)));
                                        if (!GLF_live12c8) {
                                            ;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead6pos.y++;
                            }
                        }
                        if (donor_replacementGLF_dead2c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i, 3)] >= 1.0) {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead8i = _GLF_FUZZED(i);
                                float donor_replacementGLF_dead8limit = _GLF_FUZZED((8.7 / (-6664.1555)));
                                float donor_replacementGLF_dead8result = _GLF_FUZZED(52.20);
                                float donor_replacementGLF_dead8thirty_two = _GLF_FUZZED(-799.509);
                                {
                                    if ((donor_replacementGLF_dead8i % 32) == 0) {
                                        donor_replacementGLF_dead8result += 0.4;
                                    } else {
                                        if (mod(float(donor_replacementGLF_dead8i), round(donor_replacementGLF_dead8thirty_two)) <= 0.01) {
                                            {
                                                vec2 GLF_live12center = _GLF_FUZZED(vec2(9.7, -72.02));
                                                int GLF_live12msb8 = _GLF_FUZZED(95897);
                                                vec2 GLF_live12position = _GLF_FUZZED(vec2(2163.9402, -9.9));
                                                vec3 GLF_live12result = _GLF_FUZZED(vec3(4.1, -6.4, 72.88));
                                                {
                                                    int GLF_live12looplimiter0 = 0;
                                                    for (int GLF_live12i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live12resolution.x), 0, 0)); GLF_live12i >= bitfieldReverse(bitfieldExtract(int(GLF_live12resolution.x), 0, 0)); GLF_live12i--) {
                                                        if (GLF_live12looplimiter0 >= 3) {
                                                            break;
                                                        }
                                                        GLF_live12looplimiter0++;
                                                        {
                                                            vec3 GLF_live12d = _GLF_FUZZED(vec3(-40.14, 1.8, -0.6));
                                                            GLF_live12d = GLF_live12drawShape(GLF_live12position, GLF_live12center + vec2(sin(float(GLF_live12i) / (float(bitCount(GLF_live12msb8)) * 10.0) + GLF_live12time) / 4.0 * float(bitCount(GLF_live12msb8)), float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live12i) / 100.0 * float(bitCount(GLF_live12msb8))), 0.01, float(GLF_live12i)));
                                                            if (length(GLF_live12d) <= float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))) {
                                                                continue;
                                                            }
                                                            GLF_live12result = vec3(GLF_live12d);
                                                        }
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead8result += 100.0;
                                            {
                                                vec2 GLF_live10color = _GLF_FUZZED(vec2(-2.5, -1463.1632));
                                                int GLF_live10i = _GLF_FUZZED((96560 ^ (-69483)));
                                                vec3 GLF_live10vecCoor = _GLF_FUZZED((((-544.676) + vec3(-0.8, -902.231, 9275.6818)) + (-6.8)));
                                                if (int(GLF_live10gl_FragCoord[1]) < 210) {
                                                    GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[5]))));
                                                    GLF_live10color.y -= tanh(GLF_live10color.x) / cosh(GLF_live10color.y);
                                                    ;
                                                } else if (int(GLF_live10gl_FragCoord[1]) < 240) {
                                                    GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
                                                    GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
                                                    ;
                                                } else if (int(GLF_live10gl_FragCoord[1]) < 270) {
                                                    GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[7]))));
                                                    GLF_live10color.y *= mix(normalize(GLF_live10vecCoor), normalize(vec3(GLF_live10color, degrees(GLF_live10color.x))), GLF_live10injectionSwitch.x).y;
                                                    ;
                                                } else {
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                    if (float(donor_replacementGLF_dead8i) >= donor_replacementGLF_dead8limit) {
                                        ;
                                        {
                                            int GLF_live10j = _GLF_FUZZED(29852);
                                            int GLF_live10looplimiter6 = 0;
                                            {
                                                if (GLF_live10looplimiter6 >= 3) {
                                                    ;
                                                }
                                                GLF_live10looplimiter6++;
                                                {
                                                    GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 10)];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            donor_replacementGLF_dead2c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i, 3)] = donor_replacementGLF_dead2c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i, 3)] * donor_replacementGLF_dead2c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i, 3)];
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(GLF_live1_GLF_color);
                                {
                                    {
                                        int GLF_live10looplimiter6 = 0;
                                        for (int GLF_live10j = 0; GLF_live10j < 10; GLF_live10j++) {
                                            if (GLF_live10looplimiter6 >= 3) {
                                                break;
                                            }
                                            GLF_live10looplimiter6++;
                                            {
                                                GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 10)];
                                            }
                                        }
                                    }
                                }
                                float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(2170.7433);
                                for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                                    for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                        donor_replacementGLF_dead9res += texture(GLF_dead9tex, uv + vec2(float(GLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i * 3 + GLF_dead9j, 9)];
                                    }
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(-7.0);
                    for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                        GLF_live1_GLF_color += texture(GLF_dead9tex, uv + vec2(float(i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(i * 3 + GLF_dead9j, 9)];
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec3 donor_replacementGLF_dead8c = _GLF_FUZZED(asin(vec3(-9996.5497, -4433.7642, 567.188)));
                        for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                            if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 3)] >= 1.0) {
                                donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 3)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 3)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 3)];
                            }
                        }
                    }
                    {
                        float GLF_live11grey = _GLF_FUZZED((3266.3158 - (-42.07)));
                        {
                            if (int(GLF_live11gl_FragCoord[1]) < 240) {
                                GLF_live11grey = 0.5 + float(GLF_live11data[7]) / 10.0;
                            } else {
                                if (int(GLF_live11gl_FragCoord[1]) < 270) {
                                    GLF_live11grey = 0.5 + float(GLF_live11data[8]) / 10.0;
                                } else {
                                    ;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead4beta = _GLF_FUZZED(-0.3);
                        {
                            {
                                ;
                            }
                        }
                        vec4 donor_replacementGLF_dead4matrix_b = _GLF_FUZZED(vec4(9539.9615, 1706.3733, -1.7, 9.1));
                        {
                            donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] - (donor_replacementGLF_dead4beta * GLF_live1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)]);
                        }
                    }
                    return;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = sqrt(dFdx(vec4(-78.67, 6.4, 4029.9916, 8.1)));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                            ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED((ivec2(31158, 20615) >> i));
                            while (donor_replacementGLF_dead6pos.y != 256) {
                                if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                                    float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                                    ;
                                }
                                donor_replacementGLF_dead6pos.y++;
                            }
                        }
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                {
                    vec3 GLF_live13color = _GLF_FUZZED((3846.6345 + vec3(3.0, -89.94, 4.5)));
                    vec2 GLF_live13grid = _GLF_FUZZED(vec2(-4748.1110, -5.0));
                    vec2 GLF_live13uv = _GLF_FUZZED((-vec2(-7.6, 83.38)));
                    if (GLF_live13uv.x > (3.0 / 4.0)) {
                        int GLF_live13count = int(GLF_live13injectionSwitch.x);
                        {
                            int GLF_live13looplimiter5 = 0;
                            do {
                                if (GLF_live13looplimiter5 >= 6) {
                                    break;
                                }
                                GLF_live13looplimiter5++;
                                {
                                    GLF_live13color -= GLF_live13palette(vec3(float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live13injectionSwitch.x, 0.6, float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.x), 10)]) * 0.1));
                                    GLF_live13count++;
                                }
                            } while (GLF_live13count != GLF_live13obj.numbers[2]);
                        }
                        GLF_live13grid += vec2(GLF_live13count + GLF_live13obj.numbers[3], GLF_live13count + GLF_live13obj.numbers[3]);
                    }
                }
                _GLF_color = acosh(vec4(222.885, -4.6, 6816.6385, 9069.5693));
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead2result = _GLF_FUZZED(dFdy(9339.3464));
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(ivec2(-38248, -58490));
                            while (donor_replacementGLF_dead6pos.y != 256) {
                                if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                                    float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                                    {
                                        int GLF_live11i = _GLF_FUZZED(94514);
                                        int GLF_live11looplimiter5 = 0;
                                        do {
                                            if (GLF_live11looplimiter5 >= 5) {
                                                break;
                                            }
                                            GLF_live11looplimiter5++;
                                            {
                                                switch (GLF_live11i) {
                                                    case 0:
                                                        GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = 4;
                                                        break;
                                                    case 1:
                                                        GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = 3;
                                                        break;
                                                    case 2:
                                                        GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = 2;
                                                        break;
                                                    case 3:
                                                        GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = 1;
                                                        break;
                                                    case 4:
                                                        GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = 0;
                                                        break;
                                                    case 5:
                                                        GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = -1;
                                                        break;
                                                    case 6:
                                                        GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = -2;
                                                        break;
                                                    case 7:
                                                        GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = -3;
                                                        break;
                                                    case 8:
                                                        GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = -4;
                                                        break;
                                                    case 9:
                                                        GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = -5;
                                                        break;
                                                }
                                                GLF_live11i++;
                                            }
                                        } while (GLF_live11i < 10);
                                    }
                                    ;
                                }
                                donor_replacementGLF_dead6pos.y++;
                            }
                        }
                        {
                            donor_replacementGLF_dead2result += 0.4;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-473.982, 40.48, -70.33, -862.993);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    return;
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = unpackSnorm4x8(180430u);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        for (int GLF_dead7i = 0; GLF_dead7i < 10; GLF_dead7i++) {
                            GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 10)] = (10 - GLF_dead7i);
                            GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 10)] = GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 10)] * GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 10)];
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead8result = _GLF_FUZZED(normalize(clamp(22.36, 438.694, -79.45)));
                float donor_replacementGLF_dead8thirty_two = _GLF_FUZZED(mod(-4162.2401, 3987.6656));
                if ((i % 32) == 0) {
                    donor_replacementGLF_dead8result += 0.4;
                } else {
                    if (mod(float(i), round(donor_replacementGLF_dead8thirty_two)) <= 0.01) {
                        donor_replacementGLF_dead8result += 100.0;
                    }
                }
            }
            break;
            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead7color = _GLF_FUZZED(vec3(9738.7939, 2.5, 1098.5146));
                    vec2 donor_replacementGLF_dead7uv = _GLF_FUZZED(log(fwidthFine(resolution)));
                    {
                        vec2 GLF_live10color = _GLF_FUZZED(vec2(5339.9639, -67.27));
                        int GLF_live10i = _GLF_FUZZED((37893 ^ (-4035)));
                        vec3 GLF_live10vecCoor = _GLF_FUZZED(vec3(0.3, 2728.1845, -308.877));
                        {
                            if (int(GLF_live10gl_FragCoord[1]) < 30) {
                                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[0]))));
                                GLF_live10color[0] = dFdy(GLF_live10gl_FragCoord.y);
                                ;
                            } else if (int(GLF_live10gl_FragCoord[1]) < 60) {
                                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[1]))));
                                GLF_live10color[1] *= atan(faceforward(GLF_live10injectionSwitch, GLF_live10color.xx, GLF_live10vecCoor.yx).y);
                                ;
                            } else if (int(GLF_live10gl_FragCoord[1]) < 90) {
                                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[2]))));
                                GLF_live10color.x += atanh(GLF_live10color.x) * cosh(GLF_live10injectionSwitch.y) * smoothstep(GLF_live10color, GLF_live10injectionSwitch, GLF_live10gl_FragCoord.yy).x;
                                ;
                            } else if (int(GLF_live10gl_FragCoord[1]) < 120) {
                                GLF_live10color = fract(acosh(clamp(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[3])), 1.0, 1000.0)));
                                GLF_live10color.x += (isnan(GLF_live10gl_FragCoord.x) ? log2(GLF_live10gl_FragCoord.x) : log2(GLF_live10gl_FragCoord.y));
                                ;
                            } else if (int(GLF_live10gl_FragCoord[1]) < 150) {
                                ;
                            } else if (int(GLF_live10gl_FragCoord[1]) < 180) {
                                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[4]))));
                                GLF_live10color[1] += asinh(GLF_live10gl_FragCoord.y * ldexp(GLF_live10color.y, -GLF_live10i));
                                ;
                            } else if (int(GLF_live10gl_FragCoord[1]) < 210) {
                                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[5]))));
                                GLF_live10color.y -= tanh(GLF_live10color.x) / cosh(GLF_live10color.y);
                                ;
                            } else if (int(GLF_live10gl_FragCoord[1]) < 240) {
                                GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
                                GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
                                ;
                            } else if (int(GLF_live10gl_FragCoord[1]) < 270) {
                                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[7]))));
                                GLF_live10color.y *= mix(normalize(GLF_live10vecCoor), normalize(vec3(GLF_live10color, degrees(GLF_live10color.x))), GLF_live10injectionSwitch.x).y;
                                ;
                            } else {
                                ;
                            }
                        }
                    }
                    if (donor_replacementGLF_dead7uv.y > (1.0 / 4.0)) {
                        donor_replacementGLF_dead7color.x += float(GLF_dead7obj.numbers[5]);
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(GLF_live1_GLF_color);
                        float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(16.18);
                        for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                            for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                donor_replacementGLF_dead9res += texture(GLF_dead9tex, uv + vec2(float(GLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i * 3 + GLF_dead9j, 9)];
                            }
                        }
                    }
                    {
                        i = (4 * i * (1000 - i)) / 1000;
                    }
                }
                break;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    float donor_replacementGLF_dead4alpha1 = _GLF_FUZZED(dFdyFine(-8.7));
                    int donor_replacementGLF_dead4k = _GLF_FUZZED(i);
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead8result = _GLF_FUZZED(78.35);
                        {
                            {
                                {
                                    ;
                                }
                            }
                            if (mod(float(donor_replacementGLF_dead4k), round(donor_replacementGLF_dead4alpha1)) <= 0.01) {
                                {
                                    vec2 GLF_live12center = _GLF_FUZZED((-vec2(-6.5, 232.951)));
                                    int GLF_live12i = _GLF_FUZZED((9572 ^ (-26420)));
                                    int GLF_live12msb8 = _GLF_FUZZED((-(-67890)));
                                    vec2 GLF_live12position = _GLF_FUZZED((vec3(vec2(8.7, 12.88), -4.7) * mat2x3(mat3(46.74, -76.39, 714.521, 1.1, 1055.6300, -4114.3759, 7.4, -4102.1062, -86.49))));
                                    vec3 GLF_live12result = _GLF_FUZZED(vec3(7834.6201, -2827.0825, 1.1));
                                    {
                                        vec3 GLF_live12d = _GLF_FUZZED(vec3(-40.14, 1.8, -0.6));
                                        GLF_live12d = GLF_live12drawShape(GLF_live12position, GLF_live12center + vec2(sin(float(GLF_live12i) / (float(bitCount(GLF_live12msb8)) * 10.0) + GLF_live12time) / 4.0 * float(bitCount(GLF_live12msb8)), float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live12i) / 100.0 * float(bitCount(GLF_live12msb8))), 0.01, float(GLF_live12i)));
                                        if (length(GLF_live12d) <= float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))) {
                                            ;
                                        }
                                        GLF_live12result = vec3(GLF_live12d);
                                    }
                                }
                                donor_replacementGLF_dead8result += 100.0;
                            }
                        }
                    }
                    vec4 donor_replacementGLF_dead4matrix_u = _GLF_FUZZED((vec4(-1202.7444, 6.0, -5.0, 1373.7001) / step(atan(-551.291, -6490.1467), -1.2)));
                    {
                        vec2 GLF_live12center = _GLF_FUZZED(vec2(-37.93, -38.31));
                        int GLF_live12msb8 = _GLF_FUZZED(73187);
                        vec2 GLF_live12position = _GLF_FUZZED((+vec2(-47.43, -2117.8802).yx));
                        vec3 GLF_live12result = _GLF_FUZZED(vec3(-875.887, -3.1, 31.67));
                        {
                            int GLF_live12looplimiter0 = 0;
                            for (int GLF_live12i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live12resolution.x), 0, 0)); GLF_live12i >= bitfieldReverse(bitfieldExtract(int(GLF_live12resolution.x), 0, 0)); GLF_live12i--) {
                                if (GLF_live12looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live12looplimiter0++;
                                {
                                    vec3 GLF_live12d = _GLF_FUZZED(vec3(-40.14, 1.8, -0.6));
                                    GLF_live12d = GLF_live12drawShape(GLF_live12position, GLF_live12center + vec2(sin(float(GLF_live12i) / (float(bitCount(GLF_live12msb8)) * 10.0) + GLF_live12time) / 4.0 * float(bitCount(GLF_live12msb8)), float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live12i) / 100.0 * float(bitCount(GLF_live12msb8))), 0.01, float(GLF_live12i)));
                                    if (length(GLF_live12d) <= float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))) {
                                        continue;
                                    }
                                    GLF_live12result = vec3(GLF_live12d);
                                }
                            }
                        }
                    }
                    for (int GLF_dead4u = GLF_dead4MATRIX_N - 1; GLF_dead4u >= donor_replacementGLF_dead4k; GLF_dead4u--) {
                        donor_replacementGLF_dead4alpha1 += pow(donor_replacementGLF_dead4matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4u, 4)], 2.0);
                        {
                            vec2 GLF_live10color = _GLF_FUZZED(vec2(535.276, -1.0));
                            int GLF_live10i = _GLF_FUZZED(((-9635) * ((-47574) & 47392)));
                            vec3 GLF_live10vecCoor = _GLF_FUZZED((vec3(-12.49, 10.99, -1.5) * mat3(777.615, 3048.1647, -2.4, -85.93, 2.0, -3.5, 12.90, -5.9, 39.79)));
                            {
                                int GLF_live10looplimiter7 = 0;
                                do {
                                    if (GLF_live10looplimiter7 >= 3) {
                                        break;
                                    }
                                    GLF_live10looplimiter7++;
                                    {
                                        if (int(GLF_live10gl_FragCoord[1]) < 30) {
                                            GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[0]))));
                                            GLF_live10color[0] = dFdy(GLF_live10gl_FragCoord.y);
                                            break;
                                        } else if (int(GLF_live10gl_FragCoord[1]) < 60) {
                                            GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[1]))));
                                            GLF_live10color[1] *= atan(faceforward(GLF_live10injectionSwitch, GLF_live10color.xx, GLF_live10vecCoor.yx).y);
                                            break;
                                        } else if (int(GLF_live10gl_FragCoord[1]) < 90) {
                                            GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[2]))));
                                            GLF_live10color.x += atanh(GLF_live10color.x) * cosh(GLF_live10injectionSwitch.y) * smoothstep(GLF_live10color, GLF_live10injectionSwitch, GLF_live10gl_FragCoord.yy).x;
                                            break;
                                        } else if (int(GLF_live10gl_FragCoord[1]) < 120) {
                                            GLF_live10color = fract(acosh(clamp(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[3])), 1.0, 1000.0)));
                                            GLF_live10color.x += (isnan(GLF_live10gl_FragCoord.x) ? log2(GLF_live10gl_FragCoord.x) : log2(GLF_live10gl_FragCoord.y));
                                            break;
                                        } else if (int(GLF_live10gl_FragCoord[1]) < 150) {
                                            ;
                                        } else if (int(GLF_live10gl_FragCoord[1]) < 180) {
                                            GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[4]))));
                                            GLF_live10color[1] += asinh(GLF_live10gl_FragCoord.y * ldexp(GLF_live10color.y, -GLF_live10i));
                                            break;
                                        } else if (int(GLF_live10gl_FragCoord[1]) < 210) {
                                            GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[5]))));
                                            GLF_live10color.y -= tanh(GLF_live10color.x) / cosh(GLF_live10color.y);
                                            break;
                                        } else if (int(GLF_live10gl_FragCoord[1]) < 240) {
                                            GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
                                            GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
                                            break;
                                        } else if (int(GLF_live10gl_FragCoord[1]) < 270) {
                                            GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[7]))));
                                            GLF_live10color.y *= mix(normalize(GLF_live10vecCoor), normalize(vec3(GLF_live10color, degrees(GLF_live10color.x))), GLF_live10injectionSwitch.x).y;
                                            break;
                                        } else {
                                            ;
                                        }
                                    }
                                } while (0 == int(GLF_live10injectionSwitch.x));
                            }
                        }
                    }
                }
                {
                    vec2 GLF_live10color = _GLF_FUZZED((vec4(-4891.8449, -2.8, -4.9, -205.799) * mat2x4(895.901, 1256.1089, -45.42, -48.34, 5.6, -59.14, -0.4, -69.75)));
                    int GLF_live10i = _GLF_FUZZED(47859);
                    vec3 GLF_live10vecCoor = _GLF_FUZZED((vec2(vec3(58.13, -7.3, -276.162)) * mat3x2(-768.636, -8.1, 736.662, -3.0, -3219.2304, -5443.1259)));
                    if (int(GLF_live10gl_FragCoord[1]) < 210) {
                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[5]))));
                        GLF_live10color.y -= tanh(GLF_live10color.x) / cosh(GLF_live10color.y);
                        ;
                    } else if (int(GLF_live10gl_FragCoord[1]) < 240) {
                        GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
                        GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
                        ;
                    } else if (int(GLF_live10gl_FragCoord[1]) < 270) {
                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[7]))));
                        GLF_live10color.y *= mix(normalize(GLF_live10vecCoor), normalize(vec3(GLF_live10color, degrees(GLF_live10color.x))), GLF_live10injectionSwitch.x).y;
                        ;
                    } else {
                        ;
                    }
                }
            }
        }
        if (i > 0) {
            A[i] += A[i - 1];
        }
    }
    vec2 c = pattern((15.0 + tan(0.2)) * uv);
    vec3 col;
    if (int(gl_FragCoord.y) < 20) {
        col = .5 + cos(c.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0));
        {
            if (_GLF_DEAD(false)) {
                vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(max(pow(vec4(3629.4616, -173.225, -10.97, -1.1), _GLF_color), -723.936));
                float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(-3669.5370);
                {
                    for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                        donor_replacementGLF_dead9res += texture(GLF_dead9tex, uv + vec2(float(GLF_dead4MATRIX_N - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N * 3 + GLF_dead9j, 9)];
                    }
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = sqrt(clamp(vec4(63.45, -3134.1935, 34.76, -9.6), vec4(-32.80, 5.9, 350.246, 62.93), vec4(-7.5, 914.991, 7982.7728, -59.02)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    } else if (int(gl_FragCoord.y) < 40) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(2.8, -6.9, 54.83, 77.50);
            {
                vec3 GLF_live13color = _GLF_FUZZED(vec3(1.7, -220.791, -2.6));
                int GLF_live13count = _GLF_FUZZED(23828);
                {
                    int GLF_live13looplimiter4 = 0;
                    do {
                        if (GLF_live13looplimiter4 >= 6) {
                            break;
                        }
                        GLF_live13looplimiter4++;
                        {
                            GLF_live13color -= GLF_live13palette(vec3(float(GLF_live13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live13injectionSwitch.x, float(GLF_live13obj.numbers[2]) * 0.1, float(GLF_live13obj.numbers[8]) * 0.1));
                            GLF_live13count++;
                        }
                    } while (GLF_live13count != GLF_live13obj.numbers[1]);
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        col = .5 + cos(c.y + vec3(resolution.x, A[9] / resolution.x + 50.0, 22.0));
    } else if (int(gl_FragCoord.y) < 60) {
        col = .5 + cos(c.y + vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0));
    } else if (int(gl_FragCoord.y) < 80) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead3i = _GLF_FUZZED(-18856);
            int donor_replacementGLF_dead3iters = _GLF_FUZZED((72846 - 36001));
            int donor_replacementGLF_dead3v = _GLF_FUZZED(mix(-49044, 93694, false));
            for (donor_replacementGLF_dead3i = 0; donor_replacementGLF_dead3i < donor_replacementGLF_dead3iters; donor_replacementGLF_dead3i++) {
                donor_replacementGLF_dead3v = (4 * donor_replacementGLF_dead3v * (1000 - donor_replacementGLF_dead3v)) / 1000;
            }
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                int donor_replacementGLF_dead5target = _GLF_FUZZED(89566);
                {
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED((GLF_dead4MATRIX_N ^ ivec2(3881, -70105)));
                if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                    float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                    ;
                }
            }
            {
                {
                    float GLF_live11grey = _GLF_FUZZED(42.95);
                    if (int(GLF_live11gl_FragCoord[1]) < 90) {
                        GLF_live11grey = 0.5 + float(GLF_live11data[2]) / 10.0;
                    } else {
                        if (int(GLF_live11gl_FragCoord[1]) < 120) {
                            GLF_live11grey = 0.5 + float(GLF_live11data[3]) / 10.0;
                        } else {
                            if (int(GLF_live11gl_FragCoord[1]) < 150) {
                                ;
                            } else {
                                if (int(GLF_live11gl_FragCoord[1]) < 180) {
                                    GLF_live11grey = 0.5 + float(GLF_live11data[5]) / 10.0;
                                } else {
                                    if (int(GLF_live11gl_FragCoord[1]) < 210) {
                                        GLF_live11grey = 0.5 + float(GLF_live11data[6]) / 10.0;
                                    } else {
                                        if (int(GLF_live11gl_FragCoord[1]) < 240) {
                                            GLF_live11grey = 0.5 + float(GLF_live11data[7]) / 10.0;
                                        } else {
                                            if (int(GLF_live11gl_FragCoord[1]) < 270) {
                                                GLF_live11grey = 0.5 + float(GLF_live11data[8]) / 10.0;
                                            } else {
                                                ;
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
                        vec3 GLF_live12d = _GLF_FUZZED(vec3(-83.18, -1.1, -1.2));
                        if (length(GLF_live12d) <= float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))) {
                            ;
                        }
                    }
                    ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(ivec2(76382, -14441));
                    {
                        int GLF_live10i = _GLF_FUZZED(75458);
                        int GLF_live10k = _GLF_FUZZED(-58472);
                        int GLF_live10looplimiter1 = 0;
                        {
                            if (GLF_live10looplimiter1 >= 3) {
                                ;
                            }
                            GLF_live10looplimiter1++;
                            {
                                GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i++, 10)];
                            }
                        }
                    }
                    if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                        float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                        ;
                    }
                }
                GLF_live1_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
            }
        }
        col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                int donor_replacementGLF_dead7i = _GLF_FUZZED(GLF_dead4MATRIX_N);
                {
                    GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 10)] = (10 - donor_replacementGLF_dead7i);
                    GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 10)] = GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 10)] * GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 10)];
                }
            }
            {
                float GLF_live11grey = _GLF_FUZZED(-658.860);
                {
                    GLF_live11grey = 0.5 + float(GLF_live11data[8]) / 10.0;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-1.8, 8.4, 80.68, -1487.5317);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    int GLF_live12msb8 = _GLF_FUZZED(int((100122u == 16827u)));
                    vec2 GLF_live12pos = _GLF_FUZZED((mat2(3.3, 9.5, -6.5, 8129.1784) * vec2(-4.8, 298.487)));
                    vec3 GLF_live12setting = _GLF_FUZZED(vec3(-9451.9958, -7824.4657, -5.3));
                    {
                        ;
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(vec2(2507.9188, -557.102));
                            {
                                bool GLF_live12c3 = _GLF_FUZZED(false);
                                if (!GLF_live12c3) {
                                    ;
                                }
                            }
                            int donor_replacementGLF_dead9i = _GLF_FUZZED(GLF_dead4MATRIX_N);
                            int donor_replacementGLF_dead9j = _GLF_FUZZED(-33040);
                            float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(7.8);
                            {
                                _GLF_outVarBackup_GLF_color += texture(GLF_dead9tex, donor_replacementGLF_dead9coord + vec2(float(donor_replacementGLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(donor_replacementGLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i * 3 + donor_replacementGLF_dead9j, 9)];
                            }
                        }
                        _GLF_color = vec4(-0.8, -469.431, 4547.4050, 7.0);
                        {
                            int GLF_live13h = _GLF_FUZZED(ivec4(69135, 38960, -97516, 60407).w);
                            int GLF_live13i = _GLF_FUZZED((~(-2766)));
                            int GLF_live13l = _GLF_FUZZED((41389 + (-19459)));
                            int GLF_live13looplimiter0 = 0;
                            int GLF_live13pivot = _GLF_FUZZED((-86488));
                            for (int GLF_live13j = GLF_live13l; GLF_live13j <= GLF_live13h - 1; GLF_live13j++) {
                                if (GLF_live13looplimiter0 >= 6) {
                                    break;
                                }
                                GLF_live13looplimiter0++;
                                {
                                    if (GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 10)] <= GLF_live13pivot) {
                                        GLF_live13i++;
                                        GLF_live13swap(GLF_live13i, GLF_live13j);
                                    }
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_struct_5 _GLF_struct_replacement_5 = _GLF_struct_5(bvec4(true, true, true, true), ivec3(1, 1, 1), _GLF_FUZZED(mix(vec3(844.773, -9.0, -5775.9293), vec3(-9.1, 4.7, -383.184), dFdxCoarse(31.73))));
                        vec2 donor_replacementGLF_dead7uv = _GLF_FUZZED(c);
                        if (abs(donor_replacementGLF_dead7uv.x - donor_replacementGLF_dead7uv.y) < 0.25) {
                            _GLF_struct_replacement_5.donor_replacementGLF_dead7color.x += float(GLF_dead7obj.numbers[9]);
                        }
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    int GLF_live0looplimiter3 = 0;
                    if (GLF_live0looplimiter3 >= 3) {
                        ;
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = mod(vec4(-460.560, 7.8, -42.49, -5.1), vec4(-548.812, 29.49, -9.3, 1966.1179));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
            int donor_replacementGLF_dead3i = _GLF_FUZZED(abs(-14496));
            {
                int GLF_live13looplimiter2 = 0;
                if (GLF_live13looplimiter2 >= 6) {
                    ;
                }
            }
            int donor_replacementGLF_dead3iters = _GLF_FUZZED(-63004);
            int donor_replacementGLF_dead3v = _GLF_FUZZED(floatBitsToInt(7.4));
            for (donor_replacementGLF_dead3i = 0; donor_replacementGLF_dead3i < donor_replacementGLF_dead3iters; donor_replacementGLF_dead3i++) {
                donor_replacementGLF_dead3v = (4 * donor_replacementGLF_dead3v * (1000 - donor_replacementGLF_dead3v)) / 1000;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead8result = _GLF_FUZZED(smoothstep(tanh(-2037.1842), -7920.9983, 45.07));
                {
                    vec2 GLF_live10color = _GLF_FUZZED(vec4(9.6, -2.9, 3326.2276, 9.2).tq.ts);
                    int GLF_live10i = _GLF_FUZZED(97363);
                    vec3 GLF_live10vecCoor = _GLF_FUZZED(vec3(-6.4, -5.8, 118.849));
                    if (int(GLF_live10gl_FragCoord[1]) < 240) {
                        GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
                        GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
                        ;
                    } else if (int(GLF_live10gl_FragCoord[1]) < 270) {
                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[7]))));
                        GLF_live10color.y *= mix(normalize(GLF_live10vecCoor), normalize(vec3(GLF_live10color, degrees(GLF_live10color.x))), GLF_live10injectionSwitch.x).y;
                        ;
                    } else {
                        ;
                    }
                }
                {
                    donor_replacementGLF_dead8result += 0.4;
                }
                {
                    float GLF_live11grey = _GLF_FUZZED(float(191703u));
                    {
                        GLF_live11grey = 0.5 + float(GLF_live11data[8]) / 10.0;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead7uv = _GLF_FUZZED(uv);
            if (donor_replacementGLF_dead7uv.y > (2.0 / 4.0)) {
                col.y += float(GLF_dead7obj.numbers[6]);
            }
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
            return;
            {
                float GLF_live11grey = _GLF_FUZZED(5464.3337);
                if (int(GLF_live11gl_FragCoord[1]) < 120) {
                    GLF_live11grey = 0.5 + float(GLF_live11data[3]) / 10.0;
                } else {
                    if (int(GLF_live11gl_FragCoord[1]) < 150) {
                        ;
                    } else {
                        if (int(GLF_live11gl_FragCoord[1]) < 180) {
                            GLF_live11grey = 0.5 + float(GLF_live11data[5]) / 10.0;
                        } else {
                            if (int(GLF_live11gl_FragCoord[1]) < 210) {
                                GLF_live11grey = 0.5 + float(GLF_live11data[6]) / 10.0;
                            } else {
                                if (int(GLF_live11gl_FragCoord[1]) < 240) {
                                    GLF_live11grey = 0.5 + float(GLF_live11data[7]) / 10.0;
                                } else {
                                    if (int(GLF_live11gl_FragCoord[1]) < 270) {
                                        GLF_live11grey = 0.5 + float(GLF_live11data[8]) / 10.0;
                                    } else {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(resolution);
                int donor_replacementGLF_dead9j = _GLF_FUZZED(floatBitsToInt(fwidth(-444.212)));
                float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(-4.5);
                {
                    _GLF_color += texture(GLF_dead9tex, donor_replacementGLF_dead9coord + vec2(float(GLF_dead4MATRIX_N - 1) * donor_replacementGLF_dead9uvstep, float(donor_replacementGLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N * 3 + donor_replacementGLF_dead9j, 9)];
                }
            }
            {
                {
                    ;
                }
            }
        }
        if (int(gl_FragCoord.y) < 100) {
            col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
        } else {
            {
                bool GLF_live12c5 = _GLF_FUZZED(false);
                int GLF_live12msb8 = _GLF_FUZZED((92970 + 3631));
                vec2 GLF_live12pos = _GLF_FUZZED((false ? vec2(8762.4883, -685.985) : (vec2(6.8, 2.8) + 64.61)));
                vec3 GLF_live12setting = _GLF_FUZZED(vec3(-723.431, 914.382, -4.7));
                if (!GLF_live12c5) {
                    ;
                }
            }
            if (int(gl_FragCoord.y) < 120) {
                {
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(ceil(resolution));
                            int donor_replacementGLF_dead9i = _GLF_FUZZED((-ivec2(87086, -91805)).r);
                            float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(step(619.850, sinh(-9520.2737)));
                            {
                                for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                    _GLF_color += texture(GLF_dead9tex, donor_replacementGLF_dead9coord + vec2(float(donor_replacementGLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i * 3 + GLF_dead9j, 9)];
                                }
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                if (col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)] >= 1.0) {
                                    col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)] = col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)] * col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)];
                                }
                            }
                        }
                        _GLF_color = intBitsToFloat(ivec4(-53175, 78271, -1704, 26392));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        {
                            float GLF_live11grey = _GLF_FUZZED(309.655);
                            {
                                GLF_live11grey = 0.5 + float(GLF_live11data[2]) / 10.0;
                            }
                        }
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return;
                        }
                        {
                            ;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            {
                                int GLF_live11i = _GLF_FUZZED(29113);
                                int GLF_live11looplimiter2 = 0;
                                {
                                    if (GLF_live11looplimiter2 >= 5) {
                                        ;
                                    }
                                    GLF_live11looplimiter2++;
                                    {
                                        GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)];
                                    }
                                }
                            }
                            GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 10)] = (10 - GLF_dead4MATRIX_N);
                            GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 10)] = GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 10)] * GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 10)];
                            {
                                int GLF_live11i = _GLF_FUZZED(-26023);
                                int GLF_live11k = _GLF_FUZZED(((-82236) ^ (-71408)));
                                int GLF_live11looplimiter1 = 0;
                                int GLF_live11mid = _GLF_FUZZED(-57655);
                                while (GLF_live11i < GLF_live11N && GLF_live11i <= GLF_live11mid) {
                                    if (GLF_live11looplimiter1 >= 5) {
                                        break;
                                    }
                                    GLF_live11looplimiter1++;
                                    {
                                        GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i++, 10)];
                                    }
                                }
                            }
                        }
                    }
                    _GLF_color = max(degrees(vec4(-70.69, 2.6, -674.396, -4.6)), degrees(length(5.7)));
                    {
                        float GLF_live11grey = _GLF_FUZZED(1.9);
                        {
                            if (int(GLF_live11gl_FragCoord[1]) < 270) {
                                GLF_live11grey = 0.5 + float(GLF_live11data[8]) / 10.0;
                            } else {
                                ;
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                col.x += float(GLF_dead7obj.numbers[5]);
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            int GLF_live10high = _GLF_FUZZED(ivec2(33534, 72387).r);
                            int GLF_live10low = _GLF_FUZZED(-83863);
                            int GLF_live10m = _GLF_FUZZED(18582);
                            {
                                {
                                    int GLF_live10looplimiter3 = 0;
                                    for (int GLF_live10i = GLF_live10low; GLF_live10i < GLF_live10high; GLF_live10i += 2 * GLF_live10m) {
                                        if (GLF_live10looplimiter3 >= 3) {
                                            break;
                                        }
                                        GLF_live10looplimiter3++;
                                        {
                                            int GLF_live10from = GLF_live10i;
                                            int GLF_live10mid = GLF_live10i + GLF_live10m - 1;
                                            int GLF_live10to = min(GLF_live10i + 2 * GLF_live10m - 1, GLF_live10high);
                                            GLF_live10merge(GLF_live10from, GLF_live10mid, GLF_live10to);
                                        }
                                    }
                                }
                            }
                        }
                        float donor_replacementGLF_dead2result = _GLF_FUZZED(trunc(-10.47));
                        {
                            donor_replacementGLF_dead2result += 100.0;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                donor_replacementGLF_dead2result += 0.4;
                            }
                        }
                    }
                    {
                        _GLF_struct_6 _GLF_struct_replacement_6 = _GLF_struct_6(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), uvec4(1u, 1u, 1u, 1u), _GLF_FUZZED((~(-31764))));
                        {
                            float GLF_live11grey = _GLF_FUZZED(8.1);
                            if (int(GLF_live11gl_FragCoord[1]) < 150) {
                                ;
                            } else {
                                if (int(GLF_live11gl_FragCoord[1]) < 180) {
                                    GLF_live11grey = 0.5 + float(GLF_live11data[5]) / 10.0;
                                } else {
                                    if (int(GLF_live11gl_FragCoord[1]) < 210) {
                                        GLF_live11grey = 0.5 + float(GLF_live11data[6]) / 10.0;
                                    } else {
                                        if (int(GLF_live11gl_FragCoord[1]) < 240) {
                                            GLF_live11grey = 0.5 + float(GLF_live11data[7]) / 10.0;
                                        } else {
                                            if (int(GLF_live11gl_FragCoord[1]) < 270) {
                                                GLF_live11grey = 0.5 + float(GLF_live11data[8]) / 10.0;
                                            } else {
                                                ;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                float GLF_live11grey = _GLF_FUZZED((vec4(-9.5, -5473.9760, 2.9, -4.2).w));
                                if (int(GLF_live11gl_FragCoord[1]) < 90) {
                                    GLF_live11grey = 0.5 + float(GLF_live11data[2]) / 10.0;
                                } else {
                                    if (int(GLF_live11gl_FragCoord[1]) < 120) {
                                        GLF_live11grey = 0.5 + float(GLF_live11data[3]) / 10.0;
                                    } else {
                                        if (int(GLF_live11gl_FragCoord[1]) < 150) {
                                            ;
                                        } else {
                                            if (int(GLF_live11gl_FragCoord[1]) < 180) {
                                                GLF_live11grey = 0.5 + float(GLF_live11data[5]) / 10.0;
                                            } else {
                                                if (int(GLF_live11gl_FragCoord[1]) < 210) {
                                                    GLF_live11grey = 0.5 + float(GLF_live11data[6]) / 10.0;
                                                } else {
                                                    if (int(GLF_live11gl_FragCoord[1]) < 240) {
                                                        GLF_live11grey = 0.5 + float(GLF_live11data[7]) / 10.0;
                                                    } else {
                                                        if (int(GLF_live11gl_FragCoord[1]) < 270) {
                                                            GLF_live11grey = 0.5 + float(GLF_live11data[8]) / 10.0;
                                                        } else {
                                                            ;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(sign(ivec2(-62576, -16107)));
                            {
                                float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                                ;
                            }
                        }
                        int GLF_live1i = _GLF_FUZZED((ivec4(-82750, -94888, -3043, -98540).p ^ (-57903)));
                        _GLF_struct_7 _GLF_struct_replacement_7 = _GLF_struct_7(bvec3(true, true, true), vec3(1.0, 1.0, 1.0), _GLF_struct_8(1, true, 1, bvec3(true, true, true), _GLF_struct_9(uvec3(1u, 1u, 1u), uvec4(1u, 1u, 1u, 1u), true, bvec4(true, true, true, true), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), bvec4(true, true, true, true), bvec3(true, true, true)), _GLF_struct_10(1.0, mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 0, vec3(1.0, 1.0, 1.0)), _GLF_struct_11(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_12(ivec3(1, 1, 1), vec3(1.0, 1.0, 1.0), vec2(1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), vec2(1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), 1);
                        {
                            if (_GLF_struct_replacement_7._f3.GLF_live1looplimiter2 >= 7) {
                                ;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        float donor_replacementGLF_dead4beta = _GLF_FUZZED(3064.7233);
                                        int donor_replacementGLF_dead4j = _GLF_FUZZED(int(true));
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        int donor_replacementGLF_dead4k = _GLF_FUZZED(-81712);
                                        if (_GLF_DEAD(false)) {
                                            if (mod(float(_GLF_struct_replacement_7._f3.GLF_live1looplimiter2), round(donor_replacementGLF_dead4beta)) <= 0.01) {
                                                donor_replacementGLF_dead4beta += 100.0;
                                                {
                                                    int GLF_live11i = _GLF_FUZZED(((+58218)));
                                                    int GLF_live11k = _GLF_FUZZED(ivec2(-37672, 1757).y);
                                                    int GLF_live11looplimiter1 = 0;
                                                    {
                                                        if (GLF_live11looplimiter1 >= 5) {
                                                            ;
                                                        }
                                                        GLF_live11looplimiter1++;
                                                        {
                                                            GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i++, 10)];
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        mat4 donor_replacementGLF_dead4matrix_a = _GLF_FUZZED(mat4(8.1, -86.78, 2.6, 1398.7926, -8.6, -876.827, 7.3, -9.6, -4351.7295, 51.22, -8.9, 7.5, 80.10, -6.0, -2.7, 54.38));
                                        vec4 donor_replacementGLF_dead4matrix_u = _GLF_FUZZED(asinh(_GLF_outVarBackup_GLF_color));
                                        for (int GLF_dead4a = GLF_dead4MATRIX_N - 1; GLF_dead4a >= donor_replacementGLF_dead4k; GLF_dead4a--) {
                                            donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 4)] = donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 4)] - (donor_replacementGLF_dead4beta * donor_replacementGLF_dead4matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)]);
                                        }
                                    }
                                }
                            }
                            _GLF_struct_replacement_7._f3.GLF_live1looplimiter2++;
                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, false))))) {
                                return;
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(injectionSwitch);
                                    float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(cos(-1.1));
                                    for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                                        for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                            _GLF_outVarBackup_GLF_color += texture(GLF_dead9tex, donor_replacementGLF_dead9coord + vec2(float(GLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i * 3 + GLF_dead9j, 9)];
                                        }
                                    }
                                }
                            }
                            {
                                int GLF_live1result = GLF_live1search(GLF_live1i);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-98.33, vec3(7.5, 505.809, -4321.2622));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                switch (GLF_live1i) {
                                    case 9:
                                    case 5:
                                        if (_GLF_DEAD(false)) {
                                            if (GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1result, 10)] <= _GLF_struct_replacement_7._f3.GLF_live1looplimiter2) {
                                                _GLF_struct_replacement_6.GLF_live1count++;
                                                GLF_dead7swap(_GLF_struct_replacement_6.GLF_live1count, GLF_live1result);
                                            }
                                            {
                                                int GLF_live12looplimiter0 = 0;
                                                if (GLF_live12looplimiter0 >= 3) {
                                                    ;
                                                }
                                            }
                                        }
                                    case 12:
                                    case 15:
                                    case 7:
                                    case 8:
                                    case 2:
                                    case 6:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            return;
                                        }
                                    case 17:
                                    case 13:
                                        {
                                            {
                                                vec2 GLF_live10color = _GLF_FUZZED(vec2(-1.1, 9.2));
                                                int GLF_live10i = _GLF_FUZZED(55343);
                                                vec3 GLF_live10vecCoor = _GLF_FUZZED(vec3(-255.375, -7.8, 5.7));
                                                if (int(GLF_live10gl_FragCoord[1]) < 180) {
                                                    GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[4]))));
                                                    GLF_live10color[1] += asinh(GLF_live10gl_FragCoord.y * ldexp(GLF_live10color.y, -GLF_live10i));
                                                    ;
                                                } else if (int(GLF_live10gl_FragCoord[1]) < 210) {
                                                    GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[5]))));
                                                    GLF_live10color.y -= tanh(GLF_live10color.x) / cosh(GLF_live10color.y);
                                                    ;
                                                } else if (int(GLF_live10gl_FragCoord[1]) < 240) {
                                                    GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
                                                    GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
                                                    ;
                                                } else if (int(GLF_live10gl_FragCoord[1]) < 270) {
                                                    GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[7]))));
                                                    GLF_live10color.y *= mix(normalize(GLF_live10vecCoor), normalize(vec3(GLF_live10color, degrees(GLF_live10color.x))), GLF_live10injectionSwitch.x).y;
                                                    ;
                                                } else {
                                                    ;
                                                }
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = (-vec4(69.66, 48.76, -8.8, 8.6));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            int donor_replacementGLF_dead2i = _GLF_FUZZED(-53434);
                                            {
                                                int GLF_live12looplimiter0 = 0;
                                                if (GLF_live12looplimiter0 >= 3) {
                                                    ;
                                                }
                                            }
                                            float donor_replacementGLF_dead2limit = _GLF_FUZZED(dFdy(95.28));
                                            if (_GLF_DEAD(false)) {
                                                ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(clamp(ivec2(-13347, -85274).yy, ((ivec2(48550, 30235) ^ ivec2(-91802, -22405)) * 43954), ivec2(_GLF_struct_replacement_6.GLF_live1count, max(25431, donor_replacementGLF_dead2i))));
                                                while (donor_replacementGLF_dead6pos.y != 256) {
                                                    if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                                                        float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                                                        ;
                                                    }
                                                    donor_replacementGLF_dead6pos.y++;
                                                }
                                            }
                                            float donor_replacementGLF_dead2result = _GLF_FUZZED(sqrt(3.6));
                                            {
                                                int GLF_live10high = _GLF_FUZZED(-42982);
                                                int GLF_live10looplimiter4 = 0;
                                                int GLF_live10low = _GLF_FUZZED(-24230);
                                                int GLF_live10m = _GLF_FUZZED(((18221 ^ (-7035)) - (+((-70080) - 84844))));
                                                {
                                                    if (GLF_live10looplimiter4 >= 3) {
                                                        ;
                                                    }
                                                    GLF_live10looplimiter4++;
                                                    {
                                                        {
                                                            int GLF_live10looplimiter3 = 0;
                                                            for (int GLF_live10i = GLF_live10low; GLF_live10i < GLF_live10high; GLF_live10i += 2 * GLF_live10m) {
                                                                if (GLF_live10looplimiter3 >= 3) {
                                                                    break;
                                                                }
                                                                GLF_live10looplimiter3++;
                                                                {
                                                                    int GLF_live10from = GLF_live10i;
                                                                    int GLF_live10mid = GLF_live10i + GLF_live10m - 1;
                                                                    int GLF_live10to = min(GLF_live10i + 2 * GLF_live10m - 1, GLF_live10high);
                                                                    GLF_live10merge(GLF_live10from, GLF_live10mid, GLF_live10to);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            float donor_replacementGLF_dead2thirty_two = _GLF_FUZZED(inversesqrt(-7491.8957));
                                            {
                                                if ((donor_replacementGLF_dead2i % 32) == 0) {
                                                    donor_replacementGLF_dead2result += 0.4;
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                } else {
                                                    if (mod(float(donor_replacementGLF_dead2i), round(donor_replacementGLF_dead2thirty_two)) <= 0.01) {
                                                        donor_replacementGLF_dead2result += 100.0;
                                                    }
                                                    {
                                                        float GLF_live11grey = _GLF_FUZZED(vec3(-4.0, 4754.6618, -1.9).t);
                                                        if (int(GLF_live11gl_FragCoord[1]) < 120) {
                                                            GLF_live11grey = 0.5 + float(GLF_live11data[3]) / 10.0;
                                                        } else {
                                                            if (int(GLF_live11gl_FragCoord[1]) < 150) {
                                                                ;
                                                            } else {
                                                                if (int(GLF_live11gl_FragCoord[1]) < 180) {
                                                                    GLF_live11grey = 0.5 + float(GLF_live11data[5]) / 10.0;
                                                                } else {
                                                                    if (int(GLF_live11gl_FragCoord[1]) < 210) {
                                                                        GLF_live11grey = 0.5 + float(GLF_live11data[6]) / 10.0;
                                                                    } else {
                                                                        if (int(GLF_live11gl_FragCoord[1]) < 240) {
                                                                            GLF_live11grey = 0.5 + float(GLF_live11data[7]) / 10.0;
                                                                        } else {
                                                                            if (int(GLF_live11gl_FragCoord[1]) < 270) {
                                                                                GLF_live11grey = 0.5 + float(GLF_live11data[8]) / 10.0;
                                                                            } else {
                                                                                ;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (float(donor_replacementGLF_dead2i) >= donor_replacementGLF_dead2limit) {
                                                    ;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    if (col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)] >= 1.0) {
                                                        col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)] = col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)] * col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)];
                                                    }
                                                }
                                            }
                                        }
                                        if (GLF_live1result == GLF_live1i) {
                                            _GLF_struct_replacement_6.GLF_live1count++;
                                            if (_GLF_DEAD(false)) {
                                                ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(ivec2(11436, 99504));
                                                if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                                                    {
                                                        bool GLF_live12c4 = _GLF_FUZZED(true);
                                                        if (!GLF_live12c4) {
                                                            ;
                                                        }
                                                    }
                                                    float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                                                    ;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(ivec2(GLF_live1i));
                                            while (donor_replacementGLF_dead6pos.y != 256) {
                                                if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                                                    float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                                                    ;
                                                }
                                                donor_replacementGLF_dead6pos.y++;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            float donor_replacementGLF_dead4beta = _GLF_FUZZED(-8.8);
                                            vec4 donor_replacementGLF_dead4matrix_b = _GLF_FUZZED(GLF_live1_GLF_color);
                                            {
                                                {
                                                    bool GLF_live12c7 = _GLF_FUZZED(((true ? (-2.2) : 6362.8104) != (-25.59)));
                                                    int GLF_live12msb8 = _GLF_FUZZED(94197);
                                                    vec2 GLF_live12pos = _GLF_FUZZED((vec2(-3116.4552, -617.765) * 366.365));
                                                    vec3 GLF_live12setting = _GLF_FUZZED(vec3(314.978, -8.9, -941.786));
                                                    if (!GLF_live12c7) {
                                                        ;
                                                    }
                                                }
                                                donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_7._f3.GLF_live1looplimiter2, 4)] = donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_7._f3.GLF_live1looplimiter2, 4)] - (donor_replacementGLF_dead4beta * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_7._f3.GLF_live1looplimiter2, 4)]);
                                            }
                                        }
                                        break;
                                    default:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            int donor_replacementGLF_dead3iters = _GLF_FUZZED((10184 | findMSB(126251u)));
                                            for (_GLF_struct_replacement_7._f3.GLF_live1looplimiter2 = 0; _GLF_struct_replacement_7._f3.GLF_live1looplimiter2 < donor_replacementGLF_dead3iters; _GLF_struct_replacement_7._f3.GLF_live1looplimiter2++) {
                                                _GLF_struct_replacement_6.GLF_live1count = (4 * _GLF_struct_replacement_6.GLF_live1count * (1000 - _GLF_struct_replacement_6.GLF_live1count)) / 1000;
                                            }
                                        }
                                        {
                                            int GLF_live10i = _GLF_FUZZED(-28318);
                                            int GLF_live10k = _GLF_FUZZED(-32538);
                                            {
                                                GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i++, 10)];
                                            }
                                        }
                                        if (GLF_live1result == -1) {
                                            _GLF_struct_replacement_6.GLF_live1count++;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                                int donor_replacementGLF_dead3v = _GLF_FUZZED(findLSB(5631));
                                                for (GLF_live1i = 0; GLF_live1i < GLF_live1result; GLF_live1i++) {
                                                    donor_replacementGLF_dead3v = (4 * donor_replacementGLF_dead3v * (1000 - donor_replacementGLF_dead3v)) / 1000;
                                                }
                                            }
                                        }
                                        break;
                                }
                            }
                            {
                                int GLF_live10looplimiter6 = 0;
                                if (GLF_live10looplimiter6 >= 3) {
                                    ;
                                }
                            }
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead8i = _GLF_FUZZED(88218);
                        {
                            vec2 GLF_live10color = _GLF_FUZZED(vec2(-6.9, 85.63));
                            int GLF_live10i = _GLF_FUZZED((+(-56471)));
                            int GLF_live10looplimiter7 = 0;
                            vec3 GLF_live10vecCoor = _GLF_FUZZED(vec3(5515.6529, 91.44, 55.36));
                            {
                                if (GLF_live10looplimiter7 >= 3) {
                                    ;
                                }
                                GLF_live10looplimiter7++;
                                {
                                    if (int(GLF_live10gl_FragCoord[1]) < 30) {
                                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[0]))));
                                        GLF_live10color[0] = dFdy(GLF_live10gl_FragCoord.y);
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 60) {
                                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[1]))));
                                        GLF_live10color[1] *= atan(faceforward(GLF_live10injectionSwitch, GLF_live10color.xx, GLF_live10vecCoor.yx).y);
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 90) {
                                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[2]))));
                                        GLF_live10color.x += atanh(GLF_live10color.x) * cosh(GLF_live10injectionSwitch.y) * smoothstep(GLF_live10color, GLF_live10injectionSwitch, GLF_live10gl_FragCoord.yy).x;
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 120) {
                                        GLF_live10color = fract(acosh(clamp(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[3])), 1.0, 1000.0)));
                                        GLF_live10color.x += (isnan(GLF_live10gl_FragCoord.x) ? log2(GLF_live10gl_FragCoord.x) : log2(GLF_live10gl_FragCoord.y));
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 150) {
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 180) {
                                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[4]))));
                                        GLF_live10color[1] += asinh(GLF_live10gl_FragCoord.y * ldexp(GLF_live10color.y, -GLF_live10i));
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 210) {
                                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[5]))));
                                        GLF_live10color.y -= tanh(GLF_live10color.x) / cosh(GLF_live10color.y);
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 240) {
                                        GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
                                        GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 270) {
                                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[7]))));
                                        GLF_live10color.y *= mix(normalize(GLF_live10vecCoor), normalize(vec3(GLF_live10color, degrees(GLF_live10color.x))), GLF_live10injectionSwitch.x).y;
                                        ;
                                    } else {
                                        ;
                                    }
                                }
                            }
                        }
                        float donor_replacementGLF_dead8result = _GLF_FUZZED(float(GLF_dead4MATRIX_N));
                        float donor_replacementGLF_dead8thirty_two = _GLF_FUZZED(-55.85);
                        if (mod(float(donor_replacementGLF_dead8i), round(donor_replacementGLF_dead8thirty_two)) <= 0.01) {
                            {
                                vec3 GLF_live13color = _GLF_FUZZED((+vec3(-71.61, 3781.7327, -7.2)));
                                int GLF_live13count = _GLF_FUZZED(2191);
                                int GLF_live13looplimiter3 = 0;
                                do {
                                    if (GLF_live13looplimiter3 >= 6) {
                                        break;
                                    }
                                    GLF_live13looplimiter3++;
                                    {
                                        GLF_live13color += GLF_live13palette(vec3(0.5, float(GLF_live13obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live13injectionSwitch.y)), vec3(float(GLF_live13obj.numbers[4]) * 0.1, GLF_live13injectionSwitch.x, 0.6));
                                        GLF_live13count++;
                                    }
                                } while (GLF_live13count != GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.x), 10)]);
                            }
                            donor_replacementGLF_dead8result += 100.0;
                        }
                    }
                    _GLF_color = exp2(vec4(954.884, 0.7, -1.9, 2114.0225));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead4alpha2 = _GLF_FUZZED(uv[0]);
                    float donor_replacementGLF_dead4alpha3 = _GLF_FUZZED(-531.270);
                    float donor_replacementGLF_dead4beta = _GLF_FUZZED(log(vec4(-2.0, 3.6, -2.4, -545.494)[1]));
                    int donor_replacementGLF_dead4j = _GLF_FUZZED(24141);
                    int donor_replacementGLF_dead4k = _GLF_FUZZED((mix(12399, -3675, false) % 51936));
                    mat4 donor_replacementGLF_dead4matrix_a = _GLF_FUZZED(mat4(-49.12, -5.5, -604.025, 712.276, 4.7, 6.2, -0.4, 77.35, -9126.9927, 0.1, 92.38, -6850.6559, -911.099, 28.07, 6.1, 36.19));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(min(ivec2(-72933, 99083), GLF_dead4MATRIX_N));
                        while (donor_replacementGLF_dead6pos.y != 256) {
                            if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                                float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                                ;
                            }
                            donor_replacementGLF_dead6pos.y++;
                        }
                    }
                    {
                        for (int GLF_dead4a = GLF_dead4MATRIX_N - 1; GLF_dead4a >= donor_replacementGLF_dead4k; GLF_dead4a--) {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead9i = _GLF_FUZZED(GLF_dead4MATRIX_N);
                                vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(_GLF_color);
                                float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(max(3.7, donor_replacementGLF_dead4alpha2));
                                {
                                    for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                        donor_replacementGLF_dead9res += texture(GLF_dead9tex, uv + vec2(float(donor_replacementGLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i * 3 + GLF_dead9j, 9)];
                                        {
                                            vec3 GLF_live13color = _GLF_FUZZED(((vec3(9.9, -5485.6359, -803.503) + 288.187)));
                                            vec2 GLF_live13grid = _GLF_FUZZED(vec2(-31.87, 15.26));
                                            {
                                                int GLF_live13count = int(GLF_live13injectionSwitch.x);
                                                {
                                                    int GLF_live13looplimiter5 = 0;
                                                    do {
                                                        if (GLF_live13looplimiter5 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live13looplimiter5++;
                                                        {
                                                            GLF_live13color -= GLF_live13palette(vec3(float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live13injectionSwitch.x, 0.6, float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.x), 10)]) * 0.1));
                                                            GLF_live13count++;
                                                        }
                                                    } while (GLF_live13count != GLF_live13obj.numbers[2]);
                                                }
                                                GLF_live13grid += vec2(GLF_live13count + GLF_live13obj.numbers[3], GLF_live13count + GLF_live13obj.numbers[3]);
                                            }
                                        }
                                    }
                                }
                            }
                            donor_replacementGLF_dead4alpha3 += GLF_live1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)] * donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 4)];
                        }
                        donor_replacementGLF_dead4beta = donor_replacementGLF_dead4alpha2 * donor_replacementGLF_dead4alpha3;
                        for (int GLF_dead4a = GLF_dead4MATRIX_N - 1; GLF_dead4a >= donor_replacementGLF_dead4k; GLF_dead4a--) {
                            donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 4)] = donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 4)] - (donor_replacementGLF_dead4beta * GLF_live1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)]);
                            {
                                {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                                    if (col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 3)] >= 1.0) {
                                        col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 3)] = col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 3)] * col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 3)];
                                    }
                                }
                            }
                        }
                        {
                            int GLF_live13i = _GLF_FUZZED(69723);
                            int GLF_live13j = _GLF_FUZZED(int((false ? 93939u : 139471u)));
                            {
                                GLF_live13i++;
                                GLF_live13swap(GLF_live13i, GLF_live13j);
                            }
                        }
                        donor_replacementGLF_dead4alpha3 = 0.0;
                        donor_replacementGLF_dead4beta = 0.0;
                    }
                }
                col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        vec3 GLF_live13color = _GLF_FUZZED((vec3(8157.1863, 7.8, -6.1) * mat3(8345.2788, 883.731, 437.091, -7.1, -1.8, -5.8, 7.7, -88.49, 3.6)));
                        int GLF_live13count = _GLF_FUZZED(190);
                        int GLF_live13looplimiter4 = 0;
                        do {
                            if (GLF_live13looplimiter4 >= 6) {
                                break;
                            }
                            GLF_live13looplimiter4++;
                            {
                                GLF_live13color -= GLF_live13palette(vec3(float(GLF_live13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live13injectionSwitch.x, float(GLF_live13obj.numbers[2]) * 0.1, float(GLF_live13obj.numbers[8]) * 0.1));
                                GLF_live13count++;
                            }
                        } while (GLF_live13count != GLF_live13obj.numbers[1]);
                    }
                    float donor_replacementGLF_dead4alpha2 = _GLF_FUZZED(6.8);
                    float donor_replacementGLF_dead4alpha3 = _GLF_FUZZED(fwidthCoarse(dFdyCoarse(789.103)));
                    float donor_replacementGLF_dead4beta = _GLF_FUZZED(log(4731.5207));
                    int donor_replacementGLF_dead4j = _GLF_FUZZED((false ? (-23735) : 19507));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = fract(vec4(6.4, 435.672, -0.4, 663.645));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    int donor_replacementGLF_dead4k = _GLF_FUZZED((ivec4(53496, -41029, -62489, 42295).g >> 14764));
                    {
                        vec3 GLF_live13color = _GLF_FUZZED(vec3(6287.8507, vec2(-252.995, 3.9)));
                        int GLF_live13count = _GLF_FUZZED(int(11849u));
                        {
                            int GLF_live13looplimiter5 = 0;
                            do {
                                if (GLF_live13looplimiter5 >= 6) {
                                    break;
                                }
                                GLF_live13looplimiter5++;
                                {
                                    GLF_live13color -= GLF_live13palette(vec3(float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live13injectionSwitch.x, 0.6, float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.x), 10)]) * 0.1));
                                    GLF_live13count++;
                                }
                            } while (GLF_live13count != GLF_live13obj.numbers[2]);
                        }
                    }
                    mat4 donor_replacementGLF_dead4matrix_a = _GLF_FUZZED(((false ? pow(5372.3170, -8.7) : (-4.5)) / (-mat4(-3.0, -6.3, 9.9, 0.3, -7.1, 3912.8913, 6743.4477, 900.722, 2554.2951, 5192.5231, 0.6, -225.361, 411.838, 5167.3931, -744.604, -0.6))));
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                col.x += float(GLF_dead7obj.numbers[1]);
                            }
                            {
                                int GLF_live12msb8 = _GLF_FUZZED(62133);
                                vec2 GLF_live12pos = _GLF_FUZZED(((-vec2(8206.7747, 75.56)) - 1.7));
                                vec3 GLF_live12setting = _GLF_FUZZED(vec3(-6.8, 335.917, -29.72));
                                {
                                    ;
                                }
                            }
                        }
                        for (int GLF_dead4a = GLF_dead4MATRIX_N - 1; GLF_dead4a >= donor_replacementGLF_dead4k; GLF_dead4a--) {
                            donor_replacementGLF_dead4alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)] * donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 4)];
                        }
                        donor_replacementGLF_dead4beta = donor_replacementGLF_dead4alpha2 * donor_replacementGLF_dead4alpha3;
                        for (int GLF_dead4a = GLF_dead4MATRIX_N - 1; GLF_dead4a >= donor_replacementGLF_dead4k; GLF_dead4a--) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = mix(floor(vec4(-8.4, 1412.0774, 7473.9170, 174.630)), vec4(-5306.5536, -79.83, 65.16, -547.396), bvec4(true, true, true, true));
                                {
                                    vec3 GLF_live13color = _GLF_FUZZED(vec3(5358.9436, 3.8, 3141.5481));
                                    vec2 GLF_live13grid = _GLF_FUZZED(vec2(-7.0, -0.8));
                                    vec2 GLF_live13uv = _GLF_FUZZED(((+vec2(8275.3343, -43.99)) - vec2(9.1, 1.0)));
                                    if (GLF_live13uv.x > (2.0 / 4.0)) {
                                        int GLF_live13count = int(GLF_live13injectionSwitch.x);
                                        {
                                            int GLF_live13looplimiter4 = 0;
                                            do {
                                                if (GLF_live13looplimiter4 >= 6) {
                                                    break;
                                                }
                                                GLF_live13looplimiter4++;
                                                {
                                                    GLF_live13color -= GLF_live13palette(vec3(float(GLF_live13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live13injectionSwitch.x, float(GLF_live13obj.numbers[2]) * 0.1, float(GLF_live13obj.numbers[8]) * 0.1));
                                                    GLF_live13count++;
                                                }
                                            } while (GLF_live13count != GLF_live13obj.numbers[1]);
                                        }
                                        GLF_live13grid += vec2(GLF_live13count + int(GLF_live13injectionSwitch.y), GLF_live13count + int(GLF_live13injectionSwitch.x));
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 4)] = donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 4)] - (donor_replacementGLF_dead4beta * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)]);
                        }
                        donor_replacementGLF_dead4alpha3 = 0.0;
                        donor_replacementGLF_dead4beta = 0.0;
                    }
                }
                if (int(gl_FragCoord.y) < 140) {
                    col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(dFdx(vec4(-376.002, uv, -1717.8307)));
                                float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(-382.996);
                                for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                                    for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                        donor_replacementGLF_dead9res += texture(GLF_dead9tex, c + vec2(float(GLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i * 3 + GLF_dead9j, 9)];
                                        {
                                            vec2 GLF_live10color = _GLF_FUZZED(vec3(443.601, 121.727, 2.3).rr);
                                            int GLF_live10i = _GLF_FUZZED(((-46855) - (-13689)));
                                            vec3 GLF_live10vecCoor = _GLF_FUZZED((vec3(282.834, -520.118, -167.792)));
                                            if (int(GLF_live10gl_FragCoord[1]) < 120) {
                                                GLF_live10color = fract(acosh(clamp(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[3])), 1.0, 1000.0)));
                                                GLF_live10color.x += (isnan(GLF_live10gl_FragCoord.x) ? log2(GLF_live10gl_FragCoord.x) : log2(GLF_live10gl_FragCoord.y));
                                                ;
                                            } else if (int(GLF_live10gl_FragCoord[1]) < 150) {
                                                ;
                                            } else if (int(GLF_live10gl_FragCoord[1]) < 180) {
                                                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[4]))));
                                                GLF_live10color[1] += asinh(GLF_live10gl_FragCoord.y * ldexp(GLF_live10color.y, -GLF_live10i));
                                                ;
                                            } else if (int(GLF_live10gl_FragCoord[1]) < 210) {
                                                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[5]))));
                                                GLF_live10color.y -= tanh(GLF_live10color.x) / cosh(GLF_live10color.y);
                                                ;
                                            } else if (int(GLF_live10gl_FragCoord[1]) < 240) {
                                                GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
                                                GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
                                                ;
                                            } else if (int(GLF_live10gl_FragCoord[1]) < 270) {
                                                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[7]))));
                                                GLF_live10color.y *= mix(normalize(GLF_live10vecCoor), normalize(vec3(GLF_live10color, degrees(GLF_live10color.x))), GLF_live10injectionSwitch.x).y;
                                                ;
                                            } else {
                                                ;
                                            }
                                        }
                                    }
                                }
                            }
                            float donor_replacementGLF_dead2limit = _GLF_FUZZED(pow(-978.932, 548.277));
                            if (_GLF_DEAD(false)) {
                                {
                                    col.y += float(GLF_dead7obj.numbers[6]);
                                }
                            }
                            {
                                int GLF_live10i = _GLF_FUZZED((+(-46388)));
                                {
                                    int GLF_live10looplimiter5 = 0;
                                    do {
                                        if (GLF_live10looplimiter5 >= 3) {
                                            break;
                                        }
                                        GLF_live10looplimiter5++;
                                        {
                                            switch (GLF_live10i) {
                                                case 0:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 4;
                                                    break;
                                                case 1:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 3;
                                                    break;
                                                case 2:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 2;
                                                    break;
                                                case 3:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 1;
                                                    break;
                                                case 4:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 0;
                                                    break;
                                                case 5:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -1;
                                                    break;
                                                case 6:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -2;
                                                    break;
                                                case 7:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -3;
                                                    break;
                                                case 8:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -4;
                                                    break;
                                                case 9:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -5;
                                                    break;
                                            }
                                            GLF_live10i++;
                                        }
                                    } while (GLF_live10i < 10);
                                }
                            }
                            float donor_replacementGLF_dead2result = _GLF_FUZZED(-2122.5623);
                            float donor_replacementGLF_dead2thirty_two = _GLF_FUZZED(46.96);
                            for (int GLF_dead2i = 1; GLF_dead2i < 800; GLF_dead2i++) {
                                {
                                    vec3 GLF_live13color = _GLF_FUZZED(vec3(vec4(4.4, vec2(-0.7, -476.995), (+9.9))));
                                    int GLF_live13count = _GLF_FUZZED(1652);
                                    {
                                        int GLF_live13looplimiter4 = 0;
                                        do {
                                            if (GLF_live13looplimiter4 >= 6) {
                                                break;
                                            }
                                            GLF_live13looplimiter4++;
                                            {
                                                GLF_live13color -= GLF_live13palette(vec3(float(GLF_live13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live13injectionSwitch.x, float(GLF_live13obj.numbers[2]) * 0.1, float(GLF_live13obj.numbers[8]) * 0.1));
                                                GLF_live13count++;
                                            }
                                        } while (GLF_live13count != GLF_live13obj.numbers[1]);
                                    }
                                }
                                if ((GLF_dead2i % 32) == 0) {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            int GLF_live11high = _GLF_FUZZED((+(-16894)));
                                            int GLF_live11looplimiter3 = 0;
                                            int GLF_live11low = _GLF_FUZZED(int(true));
                                            int GLF_live11m = _GLF_FUZZED(75655);
                                            for (int GLF_live11i = GLF_live11low; GLF_live11i < GLF_live11high; GLF_live11i += 2 * GLF_live11m) {
                                                if (GLF_live11looplimiter3 >= 5) {
                                                    break;
                                                }
                                                GLF_live11looplimiter3++;
                                                {
                                                    int GLF_live11from = GLF_live11i;
                                                    int GLF_live11mid = GLF_live11i + GLF_live11m - 1;
                                                    int GLF_live11to = min(GLF_live11i + 2 * GLF_live11m - 1, GLF_live11high);
                                                    GLF_live11merge(GLF_live11from, GLF_live11mid, GLF_live11to);
                                                }
                                            }
                                        }
                                        ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(clamp(ivec2(70361, 42832), ivec2(99508, -25429), ivec2(50218, 23138)));
                                        while (donor_replacementGLF_dead6pos.y != 256) {
                                            if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                                                float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                                                {
                                                    vec3 GLF_live13color = _GLF_FUZZED((vec3(-1.0, -409.049, -64.29) * 98.19));
                                                    int GLF_live13count = _GLF_FUZZED((+ivec4(90485, -33089, 65386, -33416)).y);
                                                    int GLF_live13looplimiter5 = 0;
                                                    do {
                                                        if (GLF_live13looplimiter5 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live13looplimiter5++;
                                                        {
                                                            GLF_live13color -= GLF_live13palette(vec3(float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live13injectionSwitch.x, 0.6, float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.x), 10)]) * 0.1));
                                                            GLF_live13count++;
                                                        }
                                                    } while (GLF_live13count != GLF_live13obj.numbers[2]);
                                                }
                                                ;
                                            }
                                            donor_replacementGLF_dead6pos.y++;
                                        }
                                    }
                                    donor_replacementGLF_dead2result += 0.4;
                                } else {
                                    if (mod(float(GLF_dead2i), round(donor_replacementGLF_dead2thirty_two)) <= 0.01) {
                                        donor_replacementGLF_dead2result += 100.0;
                                        if (_GLF_DEAD(false)) {
                                            vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(fract(_GLF_color));
                                            for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                                                for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                                    donor_replacementGLF_dead9res += texture(GLF_dead9tex, uv + vec2(float(GLF_dead9i - 1) * donor_replacementGLF_dead2result, float(GLF_dead9j - 1) * donor_replacementGLF_dead2result)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i * 3 + GLF_dead9j, 9)];
                                                }
                                                {
                                                    int GLF_live12msb8 = _GLF_FUZZED(ivec3(24214, -55519, -72099).y);
                                                    vec2 GLF_live12pos = _GLF_FUZZED(vec2(78.32, -4413.4431));
                                                    vec3 GLF_live12setting = _GLF_FUZZED(vec3(-39.16, -0.2, 1.3));
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                            {
                                                bool GLF_live12c1 = _GLF_FUZZED(true);
                                                if (!GLF_live12c1) {
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (float(GLF_dead2i) >= donor_replacementGLF_dead2limit) {
                                    ;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(vec2(7.1, 82.31));
                        int donor_replacementGLF_dead9i = _GLF_FUZZED(bitfieldExtract(-10302, GLF_dead4MATRIX_N, int(-961.989)));
                        float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(float((GLF_dead4MATRIX_N - ivec4(-95120, 15380, 89601, 86420)[2])));
                        {
                            _GLF_color += texture(GLF_dead9tex, donor_replacementGLF_dead9coord + vec2(float(donor_replacementGLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead4MATRIX_N - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i * 3 + GLF_dead4MATRIX_N, 9)];
                        }
                    }
                } else if (int(gl_FragCoord.y) < 160) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(_GLF_IDENTITY(false, !(!(false))), false, false))))) {
                            {
                                {
                                    ;
                                }
                            }
                            float donor_replacementGLF_dead2result = _GLF_FUZZED(860.470);
                            {
                                donor_replacementGLF_dead2result += 0.4;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)] = col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)] * col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)];
                            }
                        }
                        return;
                    }
                    col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            {
                                vec2 GLF_live10color = _GLF_FUZZED(vec4(-410.253, -4218.0702, -65.63, 48.81).gr);
                                int GLF_live10i = _GLF_FUZZED(-70062);
                                vec3 GLF_live10vecCoor = _GLF_FUZZED(vec3(-59.50, 2212.4109, -33.35));
                                if (int(GLF_live10gl_FragCoord[1]) < 90) {
                                    GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[2]))));
                                    GLF_live10color.x += atanh(GLF_live10color.x) * cosh(GLF_live10injectionSwitch.y) * smoothstep(GLF_live10color, GLF_live10injectionSwitch, GLF_live10gl_FragCoord.yy).x;
                                    ;
                                } else if (int(GLF_live10gl_FragCoord[1]) < 120) {
                                    GLF_live10color = fract(acosh(clamp(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[3])), 1.0, 1000.0)));
                                    GLF_live10color.x += (isnan(GLF_live10gl_FragCoord.x) ? log2(GLF_live10gl_FragCoord.x) : log2(GLF_live10gl_FragCoord.y));
                                    ;
                                } else if (int(GLF_live10gl_FragCoord[1]) < 150) {
                                    ;
                                } else if (int(GLF_live10gl_FragCoord[1]) < 180) {
                                    GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[4]))));
                                    GLF_live10color[1] += asinh(GLF_live10gl_FragCoord.y * ldexp(GLF_live10color.y, -GLF_live10i));
                                    ;
                                } else if (int(GLF_live10gl_FragCoord[1]) < 210) {
                                    GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[5]))));
                                    GLF_live10color.y -= tanh(GLF_live10color.x) / cosh(GLF_live10color.y);
                                    ;
                                } else if (int(GLF_live10gl_FragCoord[1]) < 240) {
                                    GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
                                    GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
                                    ;
                                } else if (int(GLF_live10gl_FragCoord[1]) < 270) {
                                    GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[7]))));
                                    GLF_live10color.y *= mix(normalize(GLF_live10vecCoor), normalize(vec3(GLF_live10color, degrees(GLF_live10color.x))), GLF_live10injectionSwitch.x).y;
                                    ;
                                } else {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    if (GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 10)] <= GLF_dead4MATRIX_N) {
                                        GLF_dead4MATRIX_N++;
                                        GLF_dead7swap(GLF_dead4MATRIX_N, GLF_dead4MATRIX_N);
                                    }
                                }
                            }
                            _GLF_color = vec4(630.356, -6.7, -75.07, -100.614);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int donor_replacementGLF_dead5count = _GLF_FUZZED(-45482);
                        {
                            int GLF_live13looplimiter1 = 0;
                            if (GLF_live13looplimiter1 >= 6) {
                                ;
                            }
                        }
                        int donor_replacementGLF_dead5result = _GLF_FUZZED(83848);
                        if (donor_replacementGLF_dead5result == -1) {
                            donor_replacementGLF_dead5count++;
                        }
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                            float donor_replacementGLF_dead2result = _GLF_FUZZED(-7.5);
                            {
                                donor_replacementGLF_dead2result += 100.0;
                                {
                                    vec2 GLF_live10color = _GLF_FUZZED(vec2(573.222, -4353.6660));
                                    int GLF_live10i = _GLF_FUZZED(-59984);
                                    vec3 GLF_live10vecCoor = _GLF_FUZZED(vec3(-22.80, -8.9, -0.4));
                                    if (int(GLF_live10gl_FragCoord[1]) < 60) {
                                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[1]))));
                                        GLF_live10color[1] *= atan(faceforward(GLF_live10injectionSwitch, GLF_live10color.xx, GLF_live10vecCoor.yx).y);
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 90) {
                                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[2]))));
                                        GLF_live10color.x += atanh(GLF_live10color.x) * cosh(GLF_live10injectionSwitch.y) * smoothstep(GLF_live10color, GLF_live10injectionSwitch, GLF_live10gl_FragCoord.yy).x;
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 120) {
                                        GLF_live10color = fract(acosh(clamp(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[3])), 1.0, 1000.0)));
                                        GLF_live10color.x += (isnan(GLF_live10gl_FragCoord.x) ? log2(GLF_live10gl_FragCoord.x) : log2(GLF_live10gl_FragCoord.y));
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 150) {
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 180) {
                                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[4]))));
                                        GLF_live10color[1] += asinh(GLF_live10gl_FragCoord.y * ldexp(GLF_live10color.y, -GLF_live10i));
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 210) {
                                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[5]))));
                                        GLF_live10color.y -= tanh(GLF_live10color.x) / cosh(GLF_live10color.y);
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 240) {
                                        GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
                                        GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
                                        ;
                                    } else if (int(GLF_live10gl_FragCoord[1]) < 270) {
                                        GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[7]))));
                                        GLF_live10color.y *= mix(normalize(GLF_live10vecCoor), normalize(vec3(GLF_live10color, degrees(GLF_live10color.x))), GLF_live10injectionSwitch.x).y;
                                        ;
                                    } else {
                                        ;
                                    }
                                }
                            }
                        }
                        int GLF_live1count = _GLF_FUZZED(-9620);
                        if (GLF_live1count == 20) {
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(15.52);
                                for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                                    for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                        {
                                            int GLF_live13looplimiter1 = 0;
                                            if (GLF_live13looplimiter1 >= 6) {
                                                ;
                                            }
                                        }
                                        _GLF_color += texture(GLF_dead9tex, uv + vec2(float(GLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i * 3 + GLF_dead9j, 9)];
                                    }
                                }
                            }
                            GLF_live1_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(-85.59);
                                for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                                    for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                        {
                                            int GLF_live11i = _GLF_FUZZED((-(-38692)));
                                            int GLF_live11j = _GLF_FUZZED((+(-96206)));
                                            int GLF_live11k = _GLF_FUZZED(-54756);
                                            int GLF_live11looplimiter0 = 0;
                                            {
                                                if (GLF_live11looplimiter0 >= 5) {
                                                    ;
                                                }
                                                GLF_live11looplimiter0++;
                                                {
                                                    if (GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] < GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j, 10)]) {
                                                        GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i++, 10)];
                                                    } else {
                                                        GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j++, 10)];
                                                    }
                                                }
                                            }
                                        }
                                        GLF_live1_GLF_color += texture(GLF_dead9tex, c + vec2(float(GLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i * 3 + GLF_dead9j, 9)];
                                    }
                                }
                            }
                        } else {
                            GLF_live1_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (8170.5985 + vec4(-47.51, 27.87, 3.5, 5.4));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(ivec2(-96230, 99238));
                                {
                                    float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                                    ;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (int(gl_FragCoord.y) < 180) {
                        {
                            vec2 GLF_live10color = _GLF_FUZZED((+vec2(-96.47, 1.1)));
                            vec3 GLF_live10vecCoor = _GLF_FUZZED(vec3(-37.01, 8.2, 81.05));
                            {
                                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[2]))));
                                GLF_live10color.x += atanh(GLF_live10color.x) * cosh(GLF_live10injectionSwitch.y) * smoothstep(GLF_live10color, GLF_live10injectionSwitch, GLF_live10gl_FragCoord.yy).x;
                                ;
                            }
                        }
                        col = .5 + cos(c.y + vec3(resolution.x, A[44] / resolution.x + 50.0, 22.0));
                    } else {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead2i = _GLF_FUZZED((36479 % ivec2(68512, -43288)[1]));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED((((-97498) ^ ivec2(-63, -53881)) * ivec2(82410, -42893)));
                                {
                                    _GLF_struct_13 _GLF_struct_replacement_13 = _GLF_struct_13(ivec2(1, 1), _GLF_struct_14(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_15(true), mat2(1.0, 1.0, 1.0, 1.0), _GLF_struct_16(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat2(1.0, 1.0, 1.0, 1.0)), bvec3(true, true, true), _GLF_struct_17(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_18(ivec3(1, 1, 1), bvec3(true, true, true), ivec2(1, 1), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1u, bvec2(true, true)), _GLF_struct_19(bvec4(true, true, true, true), vec2(1.0, 1.0), uvec4(1u, 1u, 1u, 1u), mat2(1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), ivec3(1, 1, 1), ivec3(1, 1, 1)), ivec4(1, 1, 1, 1), (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0, mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), bvec4(true, true, true, true), _GLF_struct_20(true));
                                    ;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                {
                                    int GLF_live10i = _GLF_FUZZED(-13864);
                                    int GLF_live10k = _GLF_FUZZED(3508);
                                    int GLF_live10looplimiter1 = 0;
                                    {
                                        if (GLF_live10looplimiter1 >= 3) {
                                            ;
                                        }
                                        GLF_live10looplimiter1++;
                                        {
                                            GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i++, 10)];
                                        }
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-61.14, -4.9, -28.64, -0.9);
                                if (_GLF_DEAD(false)) {
                                    ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED((ivec2(19457, 71000) ^ ivec2(17704, -24638)).rgr.xy);
                                    {
                                        float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    float donor_replacementGLF_dead8result = _GLF_FUZZED(-3.0);
                                    {
                                        donor_replacementGLF_dead8result += 100.0;
                                    }
                                }
                            }
                            float donor_replacementGLF_dead2limit = _GLF_FUZZED(atanh(519.912));
                            {
                                vec3 GLF_live12d = _GLF_FUZZED(vec3(512.282, 599.402, -830.765));
                                if (length(GLF_live12d) <= float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))) {
                                    ;
                                }
                            }
                            float donor_replacementGLF_dead2result = _GLF_FUZZED(acos(uintBitsToFloat(mix(40638u, 59067u, false))));
                            float donor_replacementGLF_dead2thirty_two = _GLF_FUZZED(441.785);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-2.6, -4825.8822, 911.732, 608.042);
                                {
                                    {
                                        ;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead8i = _GLF_FUZZED(-15457);
                                    float donor_replacementGLF_dead8limit = _GLF_FUZZED(donor_replacementGLF_dead2limit);
                                    if (float(donor_replacementGLF_dead8i) >= donor_replacementGLF_dead8limit) {
                                        ;
                                    }
                                }
                                {
                                    int GLF_live11looplimiter3 = 0;
                                    if (GLF_live11looplimiter3 >= 5) {
                                        ;
                                    }
                                }
                            }
                            {
                                if ((donor_replacementGLF_dead2i % 32) == 0) {
                                    if (_GLF_DEAD(false)) {
                                        ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(ivec2(-50568, -76475));
                                        {
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            _GLF_struct_21 _GLF_struct_replacement_21 = _GLF_struct_21(_GLF_struct_22(_GLF_struct_23(ivec3(1, 1, 1), uvec4(1u, 1u, 1u, 1u), vec2(1.0, 1.0)), (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0, ivec3(1, 1, 1), uvec4(1u, 1u, 1u, 1u), _GLF_struct_24(bvec2(true, true), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_25(vec3(1.0, 1.0, 1.0)), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), uvec3(1u, 1u, 1u), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_26(ivec3(1, 1, 1), 1.0, bvec3(true, true, true), uvec3(1u, 1u, 1u)), _GLF_struct_27(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_28(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), vec3(1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), _GLF_struct_29(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), mat2(1.0, 1.0, 1.0, 1.0), _GLF_struct_30(uvec2(1u, 1u), bvec3(true, true, true), vec3(1.0, 1.0, 1.0)), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1)));
                                            ;
                                        }
                                    }
                                    donor_replacementGLF_dead2result += 0.4;
                                } else {
                                    if (mod(float(donor_replacementGLF_dead2i), round(donor_replacementGLF_dead2thirty_two)) <= 0.01) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(injectionSwitch);
                                            float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(donor_replacementGLF_dead2limit);
                                            for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                                                for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                                    GLF_live1_GLF_color += texture(GLF_dead9tex, donor_replacementGLF_dead9coord + vec2(float(GLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i * 3 + GLF_dead9j, 9)];
                                                }
                                            }
                                        }
                                        donor_replacementGLF_dead2result += 100.0;
                                    }
                                }
                                if (float(donor_replacementGLF_dead2i) >= donor_replacementGLF_dead2limit) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        int donor_replacementGLF_dead9i = _GLF_FUZZED(donor_replacementGLF_dead2i);
                                        for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                            _GLF_color += texture(GLF_dead9tex, c + vec2(float(donor_replacementGLF_dead9i - 1) * donor_replacementGLF_dead2result, float(GLF_dead9j - 1) * donor_replacementGLF_dead2result)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i * 3 + GLF_dead9j, 9)];
                                        }
                                    }
                                    {
                                        int GLF_live10looplimiter1 = 0;
                                        if (GLF_live10looplimiter1 >= 3) {
                                            ;
                                        }
                                    }
                                    ;
                                }
                            }
                            {
                                vec3 GLF_live13color = _GLF_FUZZED(vec3(-9.8, -749.224, -4.9));
                                int GLF_live13count = _GLF_FUZZED(59268);
                                int GLF_live13looplimiter4 = 0;
                                do {
                                    if (GLF_live13looplimiter4 >= 6) {
                                        break;
                                    }
                                    GLF_live13looplimiter4++;
                                    {
                                        GLF_live13color -= GLF_live13palette(vec3(float(GLF_live13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live13injectionSwitch.x, float(GLF_live13obj.numbers[2]) * 0.1, float(GLF_live13obj.numbers[8]) * 0.1));
                                        GLF_live13count++;
                                    }
                                } while (GLF_live13count != GLF_live13obj.numbers[1]);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead7j = _GLF_FUZZED(donor_replacementGLF_dead2i);
                                int donor_replacementGLF_dead7pivot = _GLF_FUZZED(71829);
                                {
                                    {
                                        vec2 GLF_live10color = _GLF_FUZZED((mat2(-241.422, 38.55, -8.9, -8.6) * vec2(289.594, 3.3)));
                                        int GLF_live10i = _GLF_FUZZED(((false ? (-52504) : (86913 ^ (-1046))) + 94964));
                                        vec3 GLF_live10vecCoor = _GLF_FUZZED((true ? vec3(2412.6197, 45.36, 590.852) : vec3(-38.29, 2143.0190, -6365.1546)));
                                        {
                                            GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[4]))));
                                            GLF_live10color[1] += asinh(GLF_live10gl_FragCoord.y * ldexp(GLF_live10color.y, -GLF_live10i));
                                            ;
                                        }
                                    }
                                    if (GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7j, 10)] <= donor_replacementGLF_dead7pivot) {
                                        GLF_dead4MATRIX_N++;
                                        GLF_dead7swap(GLF_dead4MATRIX_N, donor_replacementGLF_dead7j);
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return;
                        }
                        if (int(gl_FragCoord.y) < 200) {
                            {
                                {
                                    ;
                                }
                                {
                                    int GLF_live10i = _GLF_FUZZED((+(-37539)));
                                    {
                                        GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)];
                                    }
                                }
                            }
                            col = .5 + cos(c.y + vec3(resolution.x, A[49] / resolution.x + 50.0, 22.0));
                        } else {
                            {
                                vec2 GLF_live12center = _GLF_FUZZED((vec2(-2.9, 3.7) + vec2(8.3, 383.509).x));
                                int GLF_live12i = _GLF_FUZZED(int(false));
                                int GLF_live12looplimiter0 = 0;
                                int GLF_live12msb8 = _GLF_FUZZED(-45636);
                                vec2 GLF_live12position = _GLF_FUZZED(vec2(8.6, 4466.7867));
                                vec3 GLF_live12result = _GLF_FUZZED((vec3(2.7, -8.2, -425.648) * (-83.52)));
                                {
                                    if (GLF_live12looplimiter0 >= 3) {
                                        ;
                                    }
                                    GLF_live12looplimiter0++;
                                    {
                                        vec3 GLF_live12d = _GLF_FUZZED(vec3(-40.14, 1.8, -0.6));
                                        GLF_live12d = GLF_live12drawShape(GLF_live12position, GLF_live12center + vec2(sin(float(GLF_live12i) / (float(bitCount(GLF_live12msb8)) * 10.0) + GLF_live12time) / 4.0 * float(bitCount(GLF_live12msb8)), float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live12i) / 100.0 * float(bitCount(GLF_live12msb8))), 0.01, float(GLF_live12i)));
                                        if (length(GLF_live12d) <= float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))) {
                                            ;
                                        }
                                        GLF_live12result = vec3(GLF_live12d);
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                int donor_replacementGLF_dead4i = _GLF_FUZZED(findMSB(bitfieldInsert(119079u, 136538u, 20445, -86586)));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    vec3 donor_replacementGLF_dead8c = _GLF_FUZZED(col);
                                    if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 3)] >= 1.0) {
                                        donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 3)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 3)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 3)];
                                    }
                                }
                                mat4 donor_replacementGLF_dead4matrix_a = _GLF_FUZZED(mat4(613.276, 5.7, 39.35, -2.9, 8666.8634, -109.781, 50.50, 62.21, 8729.0835, -30.05, -6.9, 43.74, -4503.9287, 5.5, 406.508, -0.0));
                                {
                                    {
                                        ;
                                    }
                                }
                                for (int GLF_dead4j = (GLF_dead4MATRIX_N - 1); GLF_dead4j >= (donor_replacementGLF_dead4i + 1); GLF_dead4j--) {
                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 4)] -= (donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j, 4)]);
                                }
                            }
                            {
                                int GLF_live10high = _GLF_FUZZED(15549);
                                int GLF_live10i = _GLF_FUZZED(43815);
                                int GLF_live10m = _GLF_FUZZED(37675);
                                {
                                    int GLF_live10from = GLF_live10i;
                                    int GLF_live10mid = GLF_live10i + GLF_live10m - 1;
                                    int GLF_live10to = min(GLF_live10i + 2 * GLF_live10m - 1, GLF_live10high);
                                    GLF_live10merge(GLF_live10from, GLF_live10mid, GLF_live10to);
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                {
                                    {
                                        ;
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = floor((mat2x3(-327.117, -9.1, -441.267, 3150.2928, -23.30, 1.3), vec4(-0.8, 4.5, -950.693, -8.4)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_struct_31 _GLF_struct_replacement_31 = _GLF_struct_31(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_32(uvec2(1u, 1u), _GLF_FUZZED(_GLF_color), ivec4(1, 1, 1, 1), bvec4(true, true, true, true), vec3(1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_33(bvec2(true, true), vec4(1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), _GLF_struct_34(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), ivec2(1, 1), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), vec3(1.0, 1.0, 1.0)), 1.0), _GLF_struct_35(_GLF_struct_36(bvec3(true, true, true), 1u, bvec4(true, true, true, true), uvec2(1u, 1u), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)));
                                        float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(inversesqrt(-557.877));
                                        for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                                            for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                                _GLF_struct_replacement_31._f1.donor_replacementGLF_dead9res += texture(GLF_dead9tex, c + vec2(float(GLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i * 3 + GLF_dead9j, 9)];
                                            }
                                        }
                                    }
                                }
                            }
                            discard;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            {
                                float GLF_live11grey = _GLF_FUZZED(9.9);
                                if (int(GLF_live11gl_FragCoord[1]) < 240) {
                                    GLF_live11grey = 0.5 + float(GLF_live11data[7]) / 10.0;
                                } else {
                                    if (int(GLF_live11gl_FragCoord[1]) < 270) {
                                        GLF_live11grey = 0.5 + float(GLF_live11data[8]) / 10.0;
                                    } else {
                                        ;
                                    }
                                }
                            }
                            GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 10)] = (10 - GLF_dead4MATRIX_N);
                            GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 10)] = GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 10)] * GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 10)];
                        }
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(dFdxCoarse((vec3(-4.1, -1677.5733, -21.80) * mat2x3(60.59, 51.32, -0.3, -40.19, 9.8, -9.5))));
        {
            int GLF_live12msb8 = _GLF_FUZZED((false ? (-85652) : (true ? (-94649) : 42490)));
            vec2 GLF_live12pos = _GLF_FUZZED((mat4x2(0.1, 57.56, 8273.3555, -7022.2170, 9254.2825, 4.3, 795.407, 436.621) * vec4(5.9, 747.101, -50.96, 3.8)));
            vec3 GLF_live12setting = _GLF_FUZZED((false ? vec3(-9.9, 1.9, -94.28) : vec3(9.1, -802.373, 80.80)));
            {
                ;
            }
        }
        float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(-518.861);
        {
            GLF_live1_GLF_color += texture(GLF_dead9tex, donor_replacementGLF_dead9coord + vec2(float(GLF_dead4MATRIX_N - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead4MATRIX_N - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N * 3 + GLF_dead4MATRIX_N, 9)];
        }
    }
    {
        int GLF_live1count = _GLF_FUZZED(-2203);
        {
            _GLF_struct_37 _GLF_struct_replacement_37 = _GLF_struct_37(_GLF_struct_38(bvec2(true, true), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), 1, uvec2(1u, 1u), 0), vec3(1.0, 1.0, 1.0), _GLF_struct_39(vec3(1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_40(true, vec3(1.0, 1.0, 1.0), bvec3(true, true, true), uvec2(1u, 1u), ivec2(1, 1)), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), true, mat2(1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0)), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, _GLF_struct_41(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)));
            for (int GLF_live1i = 0; GLF_live1i < 20; GLF_live1i++) {
                if (_GLF_struct_replacement_37._f0.GLF_live1looplimiter2 >= 7) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        break;
                        {
                            int GLF_live11i = _GLF_FUZZED(56869);
                            int GLF_live11j = _GLF_FUZZED((65197));
                            int GLF_live11k = _GLF_FUZZED((-50151));
                            {
                                if (GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] < GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j, 10)]) {
                                    GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i++, 10)];
                                } else {
                                    GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j++, 10)];
                                }
                            }
                        }
                    }
                    break;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(-0.6);
                        for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                            for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                _GLF_color += texture(GLF_dead9tex, c + vec2(float(GLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i * 3 + GLF_dead9j, 9)];
                            }
                            {
                                float GLF_live11grey = _GLF_FUZZED(9.1);
                                if (int(GLF_live11gl_FragCoord[1]) < 90) {
                                    GLF_live11grey = 0.5 + float(GLF_live11data[2]) / 10.0;
                                } else {
                                    if (int(GLF_live11gl_FragCoord[1]) < 120) {
                                        GLF_live11grey = 0.5 + float(GLF_live11data[3]) / 10.0;
                                    } else {
                                        if (int(GLF_live11gl_FragCoord[1]) < 150) {
                                            ;
                                        } else {
                                            if (int(GLF_live11gl_FragCoord[1]) < 180) {
                                                GLF_live11grey = 0.5 + float(GLF_live11data[5]) / 10.0;
                                            } else {
                                                if (int(GLF_live11gl_FragCoord[1]) < 210) {
                                                    GLF_live11grey = 0.5 + float(GLF_live11data[6]) / 10.0;
                                                } else {
                                                    if (int(GLF_live11gl_FragCoord[1]) < 240) {
                                                        GLF_live11grey = 0.5 + float(GLF_live11data[7]) / 10.0;
                                                    } else {
                                                        if (int(GLF_live11gl_FragCoord[1]) < 270) {
                                                            GLF_live11grey = 0.5 + float(GLF_live11data[8]) / 10.0;
                                                        } else {
                                                            ;
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
                            {
                                ;
                            }
                        }
                    }
                }
                {
                    int GLF_live13looplimiter0 = 0;
                    if (GLF_live13looplimiter0 >= 6) {
                        ;
                    }
                }
                _GLF_struct_replacement_37._f0.GLF_live1looplimiter2++;
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = log2(vec4(-426.734, 5.9, 574.781, -1742.1537));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    int GLF_live1result = GLF_live1search(GLF_live1i);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            vec2 GLF_live10color = _GLF_FUZZED(vec2(-6.5, -6.2));
                            int GLF_live10i = _GLF_FUZZED(((-20558) | 60895));
                            vec3 GLF_live10vecCoor = _GLF_FUZZED((true ? vec3(((-371.361) * (-9340.9979)), vec2(-5.8, 4.7)) : vec3(-0.7, -0.8, 3.0)));
                            if (int(GLF_live10gl_FragCoord[1]) < 210) {
                                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[5]))));
                                GLF_live10color.y -= tanh(GLF_live10color.x) / cosh(GLF_live10color.y);
                                ;
                            } else if (int(GLF_live10gl_FragCoord[1]) < 240) {
                                GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
                                GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
                                ;
                            } else if (int(GLF_live10gl_FragCoord[1]) < 270) {
                                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[7]))));
                                GLF_live10color.y *= mix(normalize(GLF_live10vecCoor), normalize(vec3(GLF_live10color, degrees(GLF_live10color.x))), GLF_live10injectionSwitch.x).y;
                                ;
                            } else {
                                ;
                            }
                        }
                        float donor_replacementGLF_dead8result = _GLF_FUZZED(175.243);
                        {
                            donor_replacementGLF_dead8result += 100.0;
                        }
                    }
                    switch (GLF_live1i) {
                        case 9:
                        case 5:
                        case 12:
                        case 15:
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead2result = _GLF_FUZZED(degrees(743.315));
                                {
                                    donor_replacementGLF_dead2result += 100.0;
                                }
                            }
                        case 7:
                        case 8:
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(round(dFdxCoarse(resolution)));
                                float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(4300.8858);
                                {
                                    {
                                        vec3 GLF_live13color = _GLF_FUZZED(vec3(2742.6706, 7.7, 736.158));
                                        vec2 GLF_live13grid = _GLF_FUZZED(vec2(-4972.8603));
                                        vec2 GLF_live13uv = _GLF_FUZZED((vec2(-3718.8715, -8.7) * (-4170.4094)));
                                        if (GLF_live13uv.x > (2.0 / 4.0)) {
                                            int GLF_live13count = int(GLF_live13injectionSwitch.x);
                                            {
                                                int GLF_live13looplimiter4 = 0;
                                                do {
                                                    if (GLF_live13looplimiter4 >= 6) {
                                                        break;
                                                    }
                                                    GLF_live13looplimiter4++;
                                                    {
                                                        GLF_live13color -= GLF_live13palette(vec3(float(GLF_live13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live13injectionSwitch.x, float(GLF_live13obj.numbers[2]) * 0.1, float(GLF_live13obj.numbers[8]) * 0.1));
                                                        GLF_live13count++;
                                                    }
                                                } while (GLF_live13count != GLF_live13obj.numbers[1]);
                                            }
                                            GLF_live13grid += vec2(GLF_live13count + int(GLF_live13injectionSwitch.y), GLF_live13count + int(GLF_live13injectionSwitch.x));
                                        }
                                    }
                                    for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                        _GLF_color += texture(GLF_dead9tex, donor_replacementGLF_dead9coord + vec2(float(GLF_dead4MATRIX_N - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N * 3 + GLF_dead9j, 9)];
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = dFdyCoarse(vec4(-6.8, 954.007, -51.45, 6.7));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        case 2:
                        case 6:
                        case 17:
                        case 13:
                            if (GLF_live1result == GLF_live1i) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (vec4(0.1, 909.635, 5.7, -0.7) * (mat4(-213.536, -9.0, -27.27, -2.6, -5.4, 758.548, -6.8, -79.05, -4.4, 2527.5218, -9.0, 173.764, 382.956, -6487.9828, -506.421, 8.2) / mat4(0.0, 40.68, 77.50, -23.64, 6877.3748, -59.33, 5581.0361, -4519.3235, 8.1, 1.1, -97.90, 6.2, 423.665, -7.9, 750.902, -4.1)));
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(9.0);
                                        for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                                            for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                                GLF_live1_GLF_color += texture(GLF_dead9tex, uv + vec2(float(GLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i * 3 + GLF_dead9j, 9)];
                                            }
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(dFdx(-687.001));
                                        for (int GLF_dead9j = 0; GLF_dead9j < 3; GLF_dead9j++) {
                                            GLF_live1_GLF_color += texture(GLF_dead9tex, uv + vec2(float(GLF_live1i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead9j - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i * 3 + GLF_dead9j, 9)];
                                        }
                                    }
                                }
                                GLF_live1count++;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    for (GLF_live1count = 0; GLF_live1count < _GLF_struct_replacement_37._f0.GLF_live1looplimiter2; GLF_live1count++) {
                                        GLF_live1i = (4 * GLF_live1i * (1000 - GLF_live1i)) / 1000;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (c.y > (3.0 / 4.0)) {
                                            col.z += float(GLF_dead7obj.numbers[7]);
                                        }
                                    }
                                    {
                                        int GLF_live11looplimiter1 = 0;
                                        if (GLF_live11looplimiter1 >= 5) {
                                            ;
                                        }
                                    }
                                }
                            }
                            break;
                        default:
                            if (GLF_live1result == -1) {
                                GLF_live1count++;
                            }
                            break;
                    }
                }
                if (_GLF_DEAD(false)) {
                    discard;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                return;
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(((-3340.8620) * uv));
                int donor_replacementGLF_dead9i = _GLF_FUZZED(58016);
                vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(roundEven(GLF_live1_GLF_color));
                float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(dFdyFine(sin(9.9)));
                {
                    donor_replacementGLF_dead9res += texture(GLF_dead9tex, donor_replacementGLF_dead9coord + vec2(float(donor_replacementGLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_live1count - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i * 3 + GLF_live1count, 9)];
                }
            }
            float donor_replacementGLF_dead4beta = _GLF_FUZZED(pow(7.8, GLF_live1_GLF_color.z));
            vec4 donor_replacementGLF_dead4matrix_b = _GLF_FUZZED(mat2x4(5.6, -85.96, -8245.9798, -66.94, 3705.5728, 212.021, -5736.9586, 569.875)[1]);
            for (int GLF_dead4b = GLF_dead4MATRIX_N - 1; GLF_dead4b >= GLF_live1count; GLF_dead4b--) {
                donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4b, 4)] = donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4b, 4)] - (donor_replacementGLF_dead4beta * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4b, 4)]);
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return;
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead8i = _GLF_FUZZED(GLF_dead4MATRIX_N);
            float donor_replacementGLF_dead8result = _GLF_FUZZED(fwidthCoarse(sqrt(_GLF_color.s)));
            float donor_replacementGLF_dead8thirty_two = _GLF_FUZZED(-9.9);
            if ((donor_replacementGLF_dead8i % 32) == 0) {
                donor_replacementGLF_dead8result += 0.4;
            } else {
                if (mod(float(donor_replacementGLF_dead8i), round(donor_replacementGLF_dead8thirty_two)) <= 0.01) {
                    donor_replacementGLF_dead8result += 100.0;
                }
                {
                    vec2 GLF_live12center = _GLF_FUZZED(vec2(2.5, -34.87));
                    int GLF_live12msb8 = _GLF_FUZZED(-51606);
                    vec2 GLF_live12position = _GLF_FUZZED((mat3x2(-2637.6572, 25.10, 9.5, 88.93, 7.1, -296.898) * vec3(2.6, 756.999, 94.96)));
                    vec3 GLF_live12result = _GLF_FUZZED(vec3(-52.15, -3.5, 572.769));
                    {
                        int GLF_live12looplimiter0 = 0;
                        for (int GLF_live12i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live12resolution.x), 0, 0)); GLF_live12i >= bitfieldReverse(bitfieldExtract(int(GLF_live12resolution.x), 0, 0)); GLF_live12i--) {
                            if (GLF_live12looplimiter0 >= 3) {
                                break;
                            }
                            GLF_live12looplimiter0++;
                            {
                                vec3 GLF_live12d = _GLF_FUZZED(vec3(-40.14, 1.8, -0.6));
                                GLF_live12d = GLF_live12drawShape(GLF_live12position, GLF_live12center + vec2(sin(float(GLF_live12i) / (float(bitCount(GLF_live12msb8)) * 10.0) + GLF_live12time) / 4.0 * float(bitCount(GLF_live12msb8)), float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live12i) / 100.0 * float(bitCount(GLF_live12msb8))), 0.01, float(GLF_live12i)));
                                if (length(GLF_live12d) <= float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))) {
                                    continue;
                                }
                                GLF_live12result = vec3(GLF_live12d);
                            }
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-0.8, 6.0, -56.18, 2.9);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(fma(uv, resolution, c));
                        int donor_replacementGLF_dead9i = _GLF_FUZZED(findMSB(GLF_dead4MATRIX_N));
                        vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(exp(GLF_live1_GLF_color));
                        float donor_replacementGLF_dead9uvstep = _GLF_FUZZED(ceil(3.7));
                        {
                            donor_replacementGLF_dead9res += texture(GLF_dead9tex, donor_replacementGLF_dead9coord + vec2(float(donor_replacementGLF_dead9i - 1) * donor_replacementGLF_dead9uvstep, float(GLF_dead4MATRIX_N - 1) * donor_replacementGLF_dead9uvstep)) * GLF_dead9weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i * 3 + GLF_dead4MATRIX_N, 9)];
                        }
                    }
                }
            }
            int donor_replacementGLF_dead2i = _GLF_FUZZED(-57953);
            float donor_replacementGLF_dead2result = _GLF_FUZZED(exp2(1870.3206));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = dFdyFine(vec4(803.697, -8.2, -27.24, -2014.1053));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            float donor_replacementGLF_dead2thirty_two = _GLF_FUZZED(normalize(determinant((+mat2(418.135, 32.56, -67.70, 778.469)))));
            if (mod(float(donor_replacementGLF_dead2i), round(donor_replacementGLF_dead2thirty_two)) <= 0.01) {
                donor_replacementGLF_dead2result += 100.0;
            }
        }
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(ivec2(-14501, 8091));
            {
                if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                    {
                        int GLF_live10i = _GLF_FUZZED(-93491);
                        int GLF_live10looplimiter5 = 0;
                        {
                            if (GLF_live10looplimiter5 >= 3) {
                                ;
                            }
                            GLF_live10looplimiter5++;
                            {
                                switch (GLF_live10i) {
                                    case 0:
                                        GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 4;
                                        break;
                                    case 1:
                                        GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 3;
                                        break;
                                    case 2:
                                        GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 2;
                                        break;
                                    case 3:
                                        GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 1;
                                        break;
                                    case 4:
                                        GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 0;
                                        break;
                                    case 5:
                                        GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -1;
                                        break;
                                    case 6:
                                        GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -2;
                                        break;
                                    case 7:
                                        GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -3;
                                        break;
                                    case 8:
                                        GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -4;
                                        break;
                                    case 9:
                                        GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -5;
                                        break;
                                }
                                GLF_live10i++;
                            }
                        }
                    }
                    float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                    ;
                }
                donor_replacementGLF_dead6pos.y++;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
            if (col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)] >= 1.0) {
                col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)] = col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)] * col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4MATRIX_N, 3)];
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(35.24, -787.539, 45.81, 4.2);
        {
            vec2 GLF_live10color = _GLF_FUZZED(vec2(3378.4715, 9.9));
            int GLF_live10i = _GLF_FUZZED(ivec3(-10237, -58800, -74801).p);
            vec3 GLF_live10vecCoor = _GLF_FUZZED(((vec4(-46.21, -96.75, -8.7, 4360.7813) * mat3x4(-6.5, 8267.0243, -1.2, -80.54, 1.7, -5112.4960, -84.47, -0.7, 7.3, 14.50, -41.82, -737.167)) + vec3(-1.9, 556.604, -599.465)));
            if (int(GLF_live10gl_FragCoord[1]) < 30) {
                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[0]))));
                GLF_live10color[0] = dFdy(GLF_live10gl_FragCoord.y);
                ;
            } else if (int(GLF_live10gl_FragCoord[1]) < 60) {
                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[1]))));
                GLF_live10color[1] *= atan(faceforward(GLF_live10injectionSwitch, GLF_live10color.xx, GLF_live10vecCoor.yx).y);
                ;
            } else if (int(GLF_live10gl_FragCoord[1]) < 90) {
                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[2]))));
                GLF_live10color.x += atanh(GLF_live10color.x) * cosh(GLF_live10injectionSwitch.y) * smoothstep(GLF_live10color, GLF_live10injectionSwitch, GLF_live10gl_FragCoord.yy).x;
                ;
            } else if (int(GLF_live10gl_FragCoord[1]) < 120) {
                GLF_live10color = fract(acosh(clamp(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[3])), 1.0, 1000.0)));
                GLF_live10color.x += (isnan(GLF_live10gl_FragCoord.x) ? log2(GLF_live10gl_FragCoord.x) : log2(GLF_live10gl_FragCoord.y));
                ;
            } else if (int(GLF_live10gl_FragCoord[1]) < 150) {
                ;
            } else if (int(GLF_live10gl_FragCoord[1]) < 180) {
                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[4]))));
                GLF_live10color[1] += asinh(GLF_live10gl_FragCoord.y * ldexp(GLF_live10color.y, -GLF_live10i));
                ;
            } else if (int(GLF_live10gl_FragCoord[1]) < 210) {
                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[5]))));
                GLF_live10color.y -= tanh(GLF_live10color.x) / cosh(GLF_live10color.y);
                ;
            } else if (int(GLF_live10gl_FragCoord[1]) < 240) {
                GLF_live10color = fract(asinh(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[6]))));
                GLF_live10color.y -= isnan(float(GLF_live10i)) ? tanh(GLF_live10gl_FragCoord.x) : atanh(GLF_live10gl_FragCoord.y);
                ;
            } else if (int(GLF_live10gl_FragCoord[1]) < 270) {
                GLF_live10color = fract(sin(GLF_live10vecCoor.yx - trunc(float(GLF_live10data[7]))));
                GLF_live10color.y *= mix(normalize(GLF_live10vecCoor), normalize(vec3(GLF_live10color, degrees(GLF_live10color.x))), GLF_live10injectionSwitch.x).y;
                ;
            } else {
                ;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead6pos = _GLF_FUZZED((ivec2(76699, 65810) ^ ivec2(-38913, 1658)));
                if (donor_replacementGLF_dead6pos.x < GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] + 15 && donor_replacementGLF_dead6pos.x > GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)] - 15) {
                    float GLF_dead6p = (15.0 - abs(float(donor_replacementGLF_dead6pos.x - GLF_dead6dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6pos.y, 256)]))) / 15.0;
                    ;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (uv.y > (2.0 / 4.0)) {
                col.y += float(GLF_dead7obj.numbers[6]);
            }
        }
        {
            int GLF_live13looplimiter2 = 0;
            for (int GLF_live13i = int(GLF_live13injectionSwitch.x); GLF_live13i < 10; GLF_live13i++) {
                if (GLF_live13looplimiter2 >= 6) {
                    break;
                }
                GLF_live13looplimiter2++;
                {
                    GLF_live13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = (10 - GLF_live13i) * int(GLF_live13injectionSwitch.y);
                }
            }
        }
    }
    _GLF_color = vec4(col, 1.0);
}
