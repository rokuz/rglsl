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

struct _GLF_struct_10 {
    mat2x4 _f0;
    vec2 GLF_live4v;
};

struct _GLF_struct_11 {
    bvec2 _f0;
    mat3x4 _f1;
    float _f2;
    mat3 _f3;
    vec2 _f4;
    uvec2 _f5;
    float GLF_live11ref;
};

struct _GLF_struct_12 {
    mat2x3 _f0;
    mat2x3 _f1;
    uvec3 _f2;
    mat4x2 _f3;
    ivec3 _f4;
    int GLF_live5v;
    bvec4 _f5;
};

struct _GLF_struct_15 {
    mat4 _f0;
};

struct _GLF_struct_14 {
    vec2 st;
    bvec3 _f0;
    uvec2 _f1;
};

struct _GLF_struct_13 {
    _GLF_struct_14 _f0;
    int _f1;
    _GLF_struct_15 _f2;
    bvec4 _f3;
    uvec4 _f4;
    ivec3 _f5;
    mat4x2 _f6;
};

struct _GLF_struct_19 {
    ivec3 _f0;
    int _f1;
};

struct _GLF_struct_18 {
    vec2 _f0;
    mat3 _f1;
    float _f2;
    float _f3;
    mat3x4 _f4;
    float GLF_live11ref;
    bvec4 _f5;
    uvec3 _f6;
};

struct _GLF_struct_17 {
    _GLF_struct_18 _f0;
    _GLF_struct_19 _f1;
    mat3x2 _f2;
    mat3 _f3;
    mat3x2 _f4;
    vec2 _f5;
};

struct _GLF_struct_16 {
    vec2 _f0;
    mat3 _f1;
    uvec3 _f2;
    _GLF_struct_17 _f3;
    vec4 _f4;
    vec4 _f5;
    mat4x3 _f6;
};

struct _GLF_struct_23 {
    vec4 _GLF_outVarBackup_GLF_color;
    vec4 _f0;
    mat3x4 _f1;
    mat4 _f2;
    mat4 _f3;
    mat4 _f4;
    int _f5;
};

struct _GLF_struct_22 {
    ivec3 _f0;
};

struct _GLF_struct_21 {
    ivec2 _f0;
    ivec4 _f1;
    mat2x3 _f2;
    _GLF_struct_22 _f3;
    uvec2 _f4;
    _GLF_struct_23 _f5;
};

struct _GLF_struct_20 {
    _GLF_struct_21 _f0;
    float _f1;
};

struct _GLF_struct_24 {
    mat2x3 _f0;
    int i;
    bvec3 _f1;
};

struct _GLF_struct_30 {
    uvec4 _f0;
    bvec4 _f1;
    uvec2 _f2;
    int _f3;
    mat4 _f4;
    uvec3 _f5;
    bool _f6;
};

struct _GLF_struct_29 {
    uvec2 _f0;
    mat3x4 _f1;
    mat2x3 _f2;
    mat2 _f3;
    mat4 _f4;
    bvec2 _f5;
};

struct _GLF_struct_28 {
    vec4 _f0;
    mat3x2 _f1;
    mat4 _f2;
    mat3x4 _f3;
    _GLF_struct_29 _f4;
    bvec3 _f5;
    _GLF_struct_30 _f6;
};

struct _GLF_struct_27 {
    vec3 _f0;
};

struct _GLF_struct_26 {
    vec4 _f0;
    uvec4 _f1;
    vec2 _f2;
    bvec3 _f3;
    vec2 _f4;
    _GLF_struct_27 _f5;
};

struct _GLF_struct_25 {
    mat3x4 _f0;
    ivec3 _f1;
    _GLF_struct_26 _f2;
    mat4 _f3;
    _GLF_struct_28 _f4;
    vec4 _GLF_outVarBackup_GLF_color;
};

struct _GLF_struct_31 {
    mat3x4 _f0;
    uvec2 GLF_live1icoord;
    uint _f1;
};

struct _GLF_struct_35 {
    mat2 _f0;
    bvec3 _f1;
    mat4x3 _f2;
    uvec2 _f3;
    bool _f4;
    mat4 _f5;
    vec4 _f6;
};

struct _GLF_struct_34 {
    uvec4 _f0;
    bvec3 _f1;
    uvec4 _f2;
    vec3 _f3;
};

struct _GLF_struct_33 {
    mat2x4 _f0;
    _GLF_struct_34 _f1;
    _GLF_struct_35 _f2;
};

struct _GLF_struct_32 {
    int GLF_live8pivot;
    ivec3 _f0;
    _GLF_struct_33 _f1;
};

struct _GLF_struct_36 {
    int GLF_live8count;
    uint _f0;
    int _f1;
};

struct _GLF_struct_39 {
    mat2 _f0;
    vec4 _f1;
    uvec2 _f2;
    bvec3 _f3;
    mat4x2 _f4;
    bvec4 _f5;
    ivec3 _f6;
};

struct _GLF_struct_38 {
    vec3 _f0;
};

struct _GLF_struct_37 {
    ivec2 _f0;
    float GLF_live9B;
    bool _f1;
    mat4x2 _f2;
    _GLF_struct_38 _f3;
    _GLF_struct_39 _f4;
    vec2 _f5;
};

struct _GLF_struct_41 {
    ivec3 _f0;
    mat3x4 _f1;
    mat2 _f2;
    int _f3;
    mat3x4 _f4;
    mat4x2 _f5;
    vec2 _f6;
};

struct _GLF_struct_40 {
    float _f0;
    float GLF_live9k1;
    int _f1;
    _GLF_struct_41 _f2;
};

struct _GLF_struct_42 {
    float GLF_live9C;
    vec4 _f0;
};

struct _GLF_struct_43 {
    int GLF_live9looplimiter0;
    vec3 _f0;
};

struct _GLF_struct_44 {
    float GLF_live2beta;
    mat3x4 _f0;
    uvec2 _f1;
    bool _f2;
    float _f3;
    float _f4;
};

struct _GLF_struct_45 {
    int GLF_live2k;
    bool _f0;
};

struct _GLF_struct_46 {
    bool _f0;
    float GLF_live9temp;
    bvec2 _f1;
    mat2x4 _f2;
    float _f3;
    mat2x3 _f4;
    ivec3 _f5;
    bvec4 _f6;
};

struct _GLF_struct_48 {
    uvec3 _f0;
    bool _f1;
    mat2 _f2;
};

struct _GLF_struct_47 {
    _GLF_struct_48 _f0;
    vec3 _f1;
    vec3 _f2;
    bvec3 _f3;
    float _f4;
    int GLF_live5count;
    uint _f5;
    uvec4 _f6;
};

struct _GLF_struct_52 {
    ivec4 _f0;
    mat2x3 _f1;
};

struct _GLF_struct_51 {
    vec3 _f0;
    mat3x2 _f1;
    vec2 _f2;
    bvec3 _f3;
    int GLF_live5looplimiter0;
};

struct _GLF_struct_50 {
    bvec4 _f0;
    _GLF_struct_51 _f1;
    mat4 _f2;
    bool _f3;
    bvec4 _f4;
};

struct _GLF_struct_49 {
    mat3 _f0;
    _GLF_struct_50 _f1;
    _GLF_struct_52 _f2;
    uvec2 _f3;
};

struct _GLF_struct_53 {
    int GLF_live5v;
    ivec4 _f0;
    mat4 _f1;
    float _f2;
};

struct _GLF_struct_58 {
    ivec3 _f0;
};

struct _GLF_struct_57 {
    mat4 _f0;
    bvec4 _f1;
};

struct _GLF_struct_56 {
    ivec3 _f0;
    uvec4 _f1;
};

struct _GLF_struct_55 {
    _GLF_struct_56 _f0;
    _GLF_struct_57 _f1;
    mat4 _f2;
    mat4x3 _f3;
    mat3x2 _f4;
};

struct _GLF_struct_54 {
    mat4 _f0;
    _GLF_struct_55 _f1;
    _GLF_struct_58 _f2;
    float _f3;
    uvec4 _f4;
    bvec4 _f5;
    vec4 _GLF_outVarBackup_GLF_color;
};

struct _GLF_struct_63 {
    mat2 _f0;
    mat3x4 _f1;
    mat2x4 _f2;
    bvec2 _f3;
    mat3 _f4;
};

struct _GLF_struct_62 {
    bvec3 _f0;
    uint _f1;
    mat4 _f2;
    bool _f3;
};

struct _GLF_struct_61 {
    _GLF_struct_62 _f0;
    _GLF_struct_63 _f1;
    uint _f2;
};

struct _GLF_struct_60 {
    int GLF_live10looplimiter5;
    mat4x2 _f0;
};

struct _GLF_struct_59 {
    bvec2 _f0;
    mat2x3 _f1;
    _GLF_struct_60 _f2;
    _GLF_struct_61 _f3;
    mat3x2 _f4;
    bvec4 _f5;
};

struct _GLF_struct_66 {
    mat2 _f0;
    uvec4 _f1;
    bvec3 _f2;
};

struct _GLF_struct_65 {
    bvec4 _f0;
    ivec2 _f1;
    bool _f2;
    ivec3 _f3;
    mat4x3 _f4;
    _GLF_struct_66 _f5;
};

struct _GLF_struct_64 {
    mat3x4 _f0;
    bvec4 _f1;
    mat4x2 _f2;
    float _f3;
    mat3 _f4;
    ivec2 GLF_live1icoord;
    _GLF_struct_65 _f5;
};

struct _GLF_struct_70 {
    bvec2 _f0;
    mat3 _f1;
    mat2x3 _f2;
    mat2 _f3;
    mat4 _f4;
    vec4 _f5;
};

struct _GLF_struct_69 {
    float _f0;
    mat2 _f1;
};

struct _GLF_struct_68 {
    _GLF_struct_69 _f0;
    _GLF_struct_70 _f1;
    vec4 _f2;
    mat2x4 _f3;
};

struct _GLF_struct_67 {
    vec2 _f0;
    mat2 _f1;
    uint _f2;
    int GLF_live1res3;
    _GLF_struct_68 _f3;
    ivec3 _f4;
};

int GLF_live11msb8 = 256;
int GLF_live10MATRIX_N = 4;
vec4 GLF_live9_GLF_color = _GLF_FUZZED(vec4(293.319, -214.553, 125.042, 1.5));

layout(set = 0, binding = 2) uniform buf2 {
    vec3 GLF_live9polynomial;
};

float GLF_live9fx(float GLF_live9x) {
    return GLF_live9polynomial.x * pow(GLF_live9x, 2.0) + GLF_live9polynomial.y * GLF_live9x + GLF_live9polynomial.z;
}

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_live8injectionSwitch;
};

struct GLF_live8QuicksortObject {
    int numbers[10];
};

GLF_live8QuicksortObject GLF_live8obj = GLF_live8QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_live8swap(int GLF_live8i, int GLF_live8j) {
    int GLF_live8temp = GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 10)];
    GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 10)] = GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 10)];
    GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 10)] = GLF_live8temp;
}

vec3 GLF_live8palette(vec3 GLF_live8a, vec3 GLF_live8b, vec3 GLF_live8c, vec3 GLF_live8d) {
    return fract(mix(GLF_live8d * GLF_live8a, GLF_live8a * GLF_live8c, GLF_live8b + GLF_live8d - GLF_live8c));
}

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_live6injectionSwitch;
};

struct _GLF_struct_5 {
    mat3x2 _f0;
    vec2 _f1;
};

struct _GLF_struct_4 {
    mat2 _f0;
    mat3x2 _f1;
    mat3x4 _f2;
    _GLF_struct_5 _f3;
    uvec3 _f4;
    mat2 _f5;
    ivec3 _f6;
};

struct _GLF_struct_3 {
    mat2 _f0;
    bool _f1;
    float _f2;
};

struct _GLF_struct_2 {
    mat2x3 _f0;
    mat4 GLF_live2matrix_a;
};

struct _GLF_struct_1 {
    _GLF_struct_2 _f0;
    _GLF_struct_3 _f1;
    mat4 _f2;
    ivec3 _f3;
    uvec4 _f4;
    _GLF_struct_4 _f5;
};

struct _GLF_struct_8 {
    uvec4 _f0;
    mat4x3 _f1;
    bvec4 _f2;
};

struct _GLF_struct_7 {
    bvec2 _f0;
    bvec3 _f1;
    mat3x2 _f2;
    _GLF_struct_8 _f3;
    uvec3 _f4;
    ivec4 _f5;
    int GLF_live2looplimiter3;
    uint _f6;
};

struct _GLF_struct_6 {
    bvec3 _f0;
    _GLF_struct_7 _f1;
    bvec4 _f2;
    uint _f3;
};

struct _GLF_struct_9 {
    vec2 _f0;
    vec2 GLF_live3pos;
};

struct _GLF_struct_0 {
    float _f0;
    int _f1;
    float GLF_live1res;
    vec2 _f2;
    float _f3;
    mat2x4 _f4;
    mat3 _f5;
    uvec4 _f6;
};

int GLF_live2MATRIX_N = 4;
vec4 GLF_live0_GLF_color = _GLF_FUZZED(vec3(4760.3873, 2.6, -564.463).sspp);
vec4 GLF_live1_GLF_color = _GLF_FUZZED(vec4(-7343.3842, -897.793, -3964.6398, 24.12));
vec4 GLF_live3_GLF_color = _GLF_FUZZED(vec4(2.2, -75.77, -_GLF_IDENTITY(85.51, min(85.51, 85.51)), 6797.1880));

float GLF_live3cross2d(vec2 GLF_live3a, vec2 GLF_live3b) {
    return ((GLF_live3a.x) * (GLF_live3b.y) - (GLF_live3b.x) * (GLF_live3a.y));
}

int GLF_live3pointInTriangle(vec2 GLF_live3p, vec2 GLF_live3a, vec2 GLF_live3b, vec2 GLF_live3c) {
    float GLF_live3pab = GLF_live3cross2d(vec2(GLF_live3p.x - GLF_live3a.x, _GLF_IDENTITY(GLF_live3p.y - GLF_live3a.y, _GLF_IDENTITY(float(mat3(GLF_live3p.y - GLF_live3a.y, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, cos(0.0))), mix(float(_GLF_FUZZED(5.5)), float(float(mat3(GLF_live3p.y - GLF_live3a.y, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, cos(0.0)))), bool(true))))), vec2(GLF_live3b.x - GLF_live3a.x, GLF_live3b.y - GLF_live3a.y));
    float GLF_live3pbc = GLF_live3cross2d(vec2(GLF_live3p.x - GLF_live3b.x, GLF_live3p.y - GLF_live3b.y), vec2(GLF_live3c.x - GLF_live3b.x, GLF_live3c.y - GLF_live3b.y));
    if (!((_GLF_IDENTITY(GLF_live3pab < 0.0, (GLF_live3pab < 0.0) || false) && GLF_live3pbc < 0.0) || (GLF_live3pab >= 0.0 && GLF_live3pbc >= 0.0))) {
        return 0;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return 1;
    }
    float GLF_live3pca = GLF_live3cross2d(vec2(GLF_live3p.x - GLF_live3c.x, GLF_live3p.y - GLF_live3c.y), vec2(GLF_live3a.x - _GLF_IDENTITY(GLF_live3c.x, clamp(_GLF_IDENTITY(GLF_live3c.x, (false ? _GLF_FUZZED(GLF_live3pab) : _GLF_IDENTITY(GLF_live3c.x, (false ? _GLF_FUZZED(GLF_live3pab) : GLF_live3c.x)))), _GLF_IDENTITY(GLF_live3c.x, clamp(GLF_live3c.x, GLF_live3c.x, GLF_live3c.x)), GLF_live3c.x)), GLF_live3a.y - _GLF_IDENTITY(GLF_live3c.y, _GLF_IDENTITY(float(_GLF_IDENTITY(mat2(GLF_live3c.y, 1.0, sqrt(0.0), 1.0), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(mat2(-11.98, -3509.9599, -104.294, 2.2)) : mat2(GLF_live3c.y, 1.0, sqrt(0.0), 1.0)))), (true ? float(_GLF_IDENTITY(mat2(GLF_live3c.y, 1.0, sqrt(0.0), 1.0), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(mat2(-11.98, -3509.9599, -104.294, 2.2)) : mat2(GLF_live3c.y, 1.0, sqrt(0.0), 1.0)))) : _GLF_FUZZED(GLF_live3pab))))));
    if (!((GLF_live3pab < 0.0 && GLF_live3pca < 0.0) || (GLF_live3pab >= 0.0 && GLF_live3pca >= 0.0))) {
        return 0;
    }
    {
        float GLF_live4th = _GLF_FUZZED((-(+(-6051.5553))));
        _GLF_struct_10 _GLF_struct_replacement_10 = _GLF_struct_10(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(((-77.67) + vec2(778.908, 9270.6630))));
        if (_GLF_struct_replacement_10.GLF_live4v.y < 0.0) {
            GLF_live4th = -GLF_live4th;
        }
    }
    return 1;
}

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
    if (_GLF_DEAD(false)) {
        return vec2(1.0, 1.0);
    }
    int a = 4;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)))))) {
        {
            int GLF_live5v = _GLF_FUZZED(-26417);
            if ((GLF_live5v & 1) == 1) {
                GLF_live5v = 3 * GLF_live5v + 1;
            } else {
                GLF_live5v /= 2;
                {
                    vec3 GLF_live8color = _GLF_FUZZED(vec3(3928.5358, 3.5, -6.5));
                    int GLF_live8count = _GLF_FUZZED((((84579 & (-75265)) - (-16127))));
                    int GLF_live8looplimiter5 = 0;
                    {
                        if (GLF_live8looplimiter5 >= 6) {
                            ;
                        }
                        GLF_live8looplimiter5++;
                        {
                            GLF_live8color -= GLF_live8palette(vec3(float(GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live8injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live8injectionSwitch.x, 0.6, float(GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live8injectionSwitch.x), 10)]) * 0.1));
                            GLF_live8count++;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    {
                        ;
                    }
                }
                return vec2(1.0, 1.0);
            }
        }
        return vec2(1.0, _GLF_IDENTITY(1.0, min(_GLF_IDENTITY(1.0, (1.0) / 1.0), 1.0)));
    }
    do {
        uv.y -= step(injectionSwitch.y, uv.x);
        uv.x -= fract(tanh(uv.x)) / ldexp(_GLF_IDENTITY(injectionSwitch, min(injectionSwitch, injectionSwitch)).y, findMSB(a));
        if (_GLF_DEAD(false)) {
            discard;
        }
        a--;
    } while (a > int(injectionSwitch.x));
    int b = 3;
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            break;
        }
        uv.y -= step(injectionSwitch.y, _GLF_IDENTITY(uv, vec2(0.0, 0.0) + (_GLF_IDENTITY(uv, mix(vec2(_GLF_FUZZED(0.7), (uv)[1]), vec2((uv)[0], _GLF_FUZZED(8.8)), bvec2(true, false))))).x) + float(a);
        uv.x *= (isnan(uv.y) ? cosh(gl_FragCoord.y) : tanh(_GLF_IDENTITY(gl_FragCoord, min(_GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, gl_FragCoord, _GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])))), gl_FragCoord)).x));
        b--;
        {
            int GLF_live10i = _GLF_FUZZED(int(true));
            int GLF_live10looplimiter8 = 0;
            mat4 GLF_live10matrix_a = _GLF_FUZZED(mat4(4.9, -663.530, -0.6, 65.57, -8.5, -4.5, -5.0, -89.90, 7.7, -1502.4173, -8948.2744, -83.98, -4512.3607, 19.69, -59.96, -97.42));
            vec4 GLF_live10matrix_b = _GLF_FUZZED(vec4(2.1, -885.303, 4.7, 9.5));
            for (int GLF_live10j = (GLF_live10MATRIX_N - 1); GLF_live10j >= (GLF_live10i + 1); GLF_live10j--) {
                if (GLF_live10looplimiter8 >= 4) {
                    break;
                }
                GLF_live10looplimiter8++;
                {
                    GLF_live10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] -= (GLF_live10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 4)] * GLF_live10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 4)]);
                }
            }
        }
    } while (b > int(injectionSwitch.x));
    int c = 2;
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, cos(0.0))), dot(vec2(0.0, 0.0), vec2(1.0, cos(0.0)))))))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(158.867, -9.2, 5449.9581, -177.013);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            return vec2(1.0, 1.0);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec2(1.0, 1.0);
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(21.92, -86.27, -960.435, 6271.8614);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-7924.7198, 36.68, 990.691, -1.1);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bool(true))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-3.5, 4.0, -345.871, 83.77);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(373.053, 5.8, -6.0, 2.4);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-248.783, -96.55, -9.2, -0.6);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                break;
            }
        }
        uv.x += ldexp(injectionSwitch.y, isinf(uv.y + uv.x) ? findMSB(b) : findMSB(a));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-2.1, 3311.4527, -6.8, -6.9);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            {
                {
                    int GLF_live11looplimiter0 = 0;
                    if (GLF_live11looplimiter0 >= 5) {
                        ;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    {
                        GLF_live9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-9.3, -5.2, 2.0, -49.87);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int GLF_live6looplimiter2 = 0;
            vec3 GLF_live6m = _GLF_FUZZED((vec3(3.4, 4547.4485, -1.2) + 0.4));
            vec2 GLF_live6n = _GLF_FUZZED(vec2(1.5, -688.720));
            for (int GLF_live6j = -1; GLF_live6j <= int(GLF_live6injectionSwitch.y); GLF_live6j++) {
                if (_GLF_DEAD(false)) {
                    discard;
                    {
                        int GLF_live9looplimiter0 = 0;
                        if (GLF_live9looplimiter0 >= 4) {
                            ;
                        }
                    }
                }
                if (GLF_live6looplimiter2 >= 3) {
                    break;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = dFdxCoarse(vec4(8.7, -2.8, 7.1, -6772.3096));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                GLF_live6looplimiter2++;
                {
                    {
                        int GLF_live6looplimiter1 = 0;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = radians(vec4(0.6, -4.3, -1.8, -1.3));
                            {
                                int GLF_live11i = _GLF_FUZZED((29356 & (46017 + 71534)));
                                float GLF_live11limit = _GLF_FUZZED(23.71);
                                int GLF_live11looplimiter0 = 0;
                                _GLF_struct_11 _GLF_struct_replacement_11 = _GLF_struct_11(bvec2(true, true), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), uvec2(1u, 1u), _GLF_FUZZED((((+2148.9117) * 169.487))));
                                float GLF_live11s = _GLF_FUZZED(vec3(-5.3, 0.7, 4.4).p);
                                while (GLF_live11i < bitfieldInsert(800, GLF_live11i, 0, 0)) {
                                    if (GLF_live11looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live11looplimiter0++;
                                    {
                                        if (mod(float(GLF_live11i), _GLF_struct_replacement_11.GLF_live11ref) <= 0.01) {
                                            GLF_live11s += 0.2;
                                        }
                                        if (float(GLF_live11i) >= GLF_live11limit) {
                                            ;
                                        }
                                        GLF_live11i++;
                                    }
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (true)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        for (int GLF_live6i = -1; GLF_live6i <= int(GLF_live6injectionSwitch.y); GLF_live6i++) {
                            if (GLF_live6looplimiter1 >= 3) {
                                break;
                            }
                            GLF_live6looplimiter1++;
                            {
                                vec2 GLF_live6g = vec2(float(GLF_live6j), float(GLF_live6i));
                                vec2 GLF_live6o = mix(GLF_live6n, GLF_live6g, 0.2);
                                if (GLF_live6injectionSwitch.x < (GLF_live6m.x)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        break;
                                    }
                                    int GLF_live6k = 1;
                                    {
                                        int GLF_live6looplimiter0 = 0;
                                        {
                                            int GLF_live11looplimiter0 = 0;
                                            if (GLF_live11looplimiter0 >= 5) {
                                                ;
                                            }
                                        }
                                        while (GLF_live6k >= 0) {
                                            if (GLF_live6looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live6looplimiter0++;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(1.9, -465.303, -9.2, 9.5);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            {
                                                {
                                                    float GLF_live9A = _GLF_FUZZED(8221.6867);
                                                    float GLF_live9B = _GLF_FUZZED(vec3(-5.0, -40.57, 1.7).p);
                                                    float GLF_live9C = _GLF_FUZZED(381.333);
                                                    float GLF_live9temp = _GLF_FUZZED(93.98);
                                                    float GLF_live9x0 = _GLF_FUZZED(-2.0);
                                                    float GLF_live9x1 = _GLF_FUZZED(vec3(274.514, -774.366, 4.1).y);
                                                    float GLF_live9x2 = _GLF_FUZZED(vec4(-680.313, -78.03, -3147.5241, -71.62).g);
                                                    {
                                                        int GLF_live9looplimiter0 = 0;
                                                        while (abs(GLF_live9x2 - GLF_live9x1) >= .000000000000001) {
                                                            if (GLF_live9looplimiter0 >= 4) {
                                                                break;
                                                            }
                                                            GLF_live9looplimiter0++;
                                                            {
                                                                float GLF_live9h0 = GLF_live9x0 - GLF_live9x2;
                                                                float GLF_live9h1 = GLF_live9x1 - GLF_live9x2;
                                                                float GLF_live9k0 = GLF_live9fx(GLF_live9x0) - GLF_live9fx(GLF_live9x2);
                                                                float GLF_live9k1 = GLF_live9fx(GLF_live9x1) - GLF_live9fx(GLF_live9x2);
                                                                GLF_live9temp = GLF_live9x2;
                                                                GLF_live9A = (((GLF_live9h1) * (GLF_live9k0)) - ((GLF_live9h0) * (GLF_live9k1))) / ((pow((GLF_live9h0), 2.0) * (GLF_live9h1)) - (pow((GLF_live9h1), 2.0) * (GLF_live9h0)));
                                                                GLF_live9B = (((GLF_live9k0) - (GLF_live9A * (pow((GLF_live9h0), 2.0)))) / (GLF_live9h0));
                                                                GLF_live9C = GLF_live9fx(GLF_live9x2);
                                                                GLF_live9x2 = GLF_live9x2 - ((2.0 * GLF_live9C) / (GLF_live9B + sign(GLF_live9B) * sqrt(pow(GLF_live9B, 2.0) - (4.0 * GLF_live9A * GLF_live9C))));
                                                                GLF_live9x0 = GLF_live9x1;
                                                                GLF_live9x1 = GLF_live9temp;
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_live6o = GLF_live6o + GLF_live6o;
                                                GLF_live6k--;
                                            }
                                        }
                                    }
                                    GLF_live6m = vec3(GLF_live6injectionSwitch.x, cos(GLF_live6o));
                                }
                            }
                        }
                    }
                }
            }
            {
                int GLF_live11i = _GLF_FUZZED(-10661);
                float GLF_live11limit = _GLF_FUZZED(float(96835u));
                float GLF_live11ref = _GLF_FUZZED(-212.161);
                float GLF_live11s = _GLF_FUZZED((-5.4));
                {
                    if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                        GLF_live11s += 0.2;
                    }
                    if (float(GLF_live11i) >= GLF_live11limit) {
                        ;
                    }
                    GLF_live11i++;
                }
            }
        }
        if (_GLF_IDENTITY(_GLF_DEAD(false), bool(bvec4(_GLF_DEAD(false), true, false, false)))) {
            continue;
        }
        c--;
    } while (c > _GLF_IDENTITY(int(injectionSwitch.x), (_GLF_IDENTITY(int(injectionSwitch.x), (int(injectionSwitch.x)) / 1)) | 0));
    int d = 1;
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b) + float(c);
        d--;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                _GLF_struct_12 _GLF_struct_replacement_12 = _GLF_struct_12(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), _GLF_FUZZED(ivec4(40554, 40326, -81705, -41024).w), bvec4(true, true, true, true));
                {
                    _GLF_struct_replacement_12.GLF_live5v /= 2;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            {
                                ;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = pow(vec4(80.93, 325.097, -8.6, -371.095), vec4(89.39, 14.49, 1.4, -150.009));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = normalize((+vec4(-463.128, -136.701, 0.3, 64.60)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    return vec2(1.0, 1.0);
                }
                {
                    int GLF_live5count = _GLF_FUZZED((73727));
                    int GLF_live5v = _GLF_FUZZED(-30614);
                    {
                        int GLF_live5looplimiter0 = 0;
                        while (GLF_live5v > 1) {
                            if (GLF_live5looplimiter0 >= 3) {
                                {
                                    {
                                        GLF_live9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                    }
                                }
                                break;
                            }
                            GLF_live5looplimiter0++;
                            {
                                int GLF_live11i = _GLF_FUZZED(67170);
                                float GLF_live11limit = _GLF_FUZZED(((!false) ? (vec2(6600.0365, 61.75) + 9292.3549).y : (-9.5)));
                                float GLF_live11s = _GLF_FUZZED(-9294.4560);
                                if (float(GLF_live11i) >= GLF_live11limit) {
                                    ;
                                }
                            }
                            {
                                if ((GLF_live5v & 1) == 1) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = mat4(7.8, 51.99, 7816.9852, -428.882, -0.0, -2.6, 5.5, -3366.3688, -1.6, 64.87, 4.4, -5.3, -950.524, 9.7, -2371.6448, -487.766)[0];
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    GLF_live5v = 3 * GLF_live5v + 1;
                                } else {
                                    GLF_live5v /= 2;
                                }
                                GLF_live5count++;
                            }
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = fwidthFine(vec4(-7198.5767, 473.181, -8109.6045, 9.6));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, vec4(_GLF_IDENTITY(mat3(_GLF_color, 0.0, 0.0, 1.0, 1.0, 0.0), mat3(mat3x4(mat3(_GLF_color, 0.0, 0.0, 1.0, 1.0, 0.0))))));
                _GLF_color = vec4(-8.8, 86.26, -7060.7318, _GLF_IDENTITY(96.87, mix(float(96.87), float(_GLF_FUZZED(-6.3)), bool(false))));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(1.0, round(length(normalize(vec2(1.0, 1.0))))), vec2(0.0, 0.0)), dot(vec2(1.0, round(length(normalize(vec2(1.0, 1.0))))), vec2(0.0, 0.0))))))) {
                    continue;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            continue;
        }
    } while (d > int(injectionSwitch.x));
    return fract(uv);
}

float patternize(vec2 uv) {
    {
        {
            ;
        }
    }
    vec2 size = _GLF_IDENTITY(vec2(0.45), mix(vec2(_GLF_FUZZED(-1025.1766), _GLF_FUZZED(963.541)), vec2(_GLF_IDENTITY(_GLF_IDENTITY((vec2(0.45)), vec2(_GLF_IDENTITY(mat2x3((vec2(0.45)), 1.0, 1.0, abs(0.0), 0.0), (mat2x3((vec2(0.45)), 1.0, 1.0, abs(0.0), 0.0)) + mat2x3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0))))[0], max(_GLF_IDENTITY((vec2(0.45)), vec2(_GLF_IDENTITY(mat2x3((vec2(0.45)), 1.0, 1.0, abs(0.0), 0.0), (mat2x3((vec2(0.45)), 1.0, 1.0, abs(0.0), 0.0)) + mat2x3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0))))[0], _GLF_IDENTITY((vec2(0.45)), vec2(_GLF_IDENTITY(mat2x3((vec2(0.45)), 1.0, 1.0, abs(0.0), 0.0), (mat2x3((vec2(0.45)), 1.0, 1.0, abs(0.0), 0.0)) + mat2x3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0))))[0])), (vec2(0.45))[1]), bvec2(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true)));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            float GLF_live11s = _GLF_FUZZED((6.9));
            {
                GLF_live11s += 0.2;
            }
        }
        _GLF_color = vec4(-2.9, -955.209, -81.20, -30.15);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), !(!(!(false)))))))) {
            return 1.0;
        }
    }
    _GLF_struct_13 _GLF_struct_replacement_13 = _GLF_struct_13(_GLF_struct_14(step(_GLF_IDENTITY(size, vec2(size[0], size[1])), uv), bvec3(true, true, true), uvec2(1u, 1u)), 1, _GLF_struct_15(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), bvec4(true, true, true, true), uvec4(1u, 1u, 1u, 1u), ivec3(1, 1, 1), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
    switch (int(mod(gl_FragCoord.y, 5.0))) {
        case 0:
            return mix(pow(_GLF_struct_replacement_13._f0.st.x, injectionSwitch.y), _GLF_struct_replacement_13._f0.st.x, size.y);
            {
                vec3 GLF_live8color = _GLF_FUZZED((mat3(-0.0, -2283.7179, 52.76, -306.593, -9.1, 9.9, -32.37, -31.83, -84.75) * vec3(-362.008, -3.7, 214.827)));
                int GLF_live8count = _GLF_FUZZED((false ? 60776 : 8255));
                {
                    GLF_live8color -= GLF_live8palette(vec3(float(GLF_live8obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live8injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live8injectionSwitch.x, float(GLF_live8obj.numbers[2]) * 0.1, float(GLF_live8obj.numbers[8]) * 0.1));
                    GLF_live8count++;
                }
            }
            break;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = fma(vec4(-4.7, 0.1, 8486.6677, -14.41), (vec4(-46.66, -5.5, -1780.7080, -0.4) - vec4(-46.56, -3034.0521, -6.9, 1.2)), trunc(vec4(4.2, 6169.6032, -8.8, 6172.5377)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        case 1:
            return mix(pow(_GLF_IDENTITY(uv.y, mix(float(_GLF_FUZZED(3.5)), float(uv.y), bool(true))), injectionSwitch.y), _GLF_struct_replacement_13._f0.st.y, size.x);
            break;
        case 2:
            discard;
            break;
        case 3:
            return mix(pow(uv.y, injectionSwitch.y), uv.y, size.y);
            {
                int GLF_live11i = _GLF_FUZZED(-90975);
                float GLF_live11limit = _GLF_FUZZED((+(-3.2)));
                _GLF_struct_16 _GLF_struct_replacement_16 = _GLF_struct_16(vec2(1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), _GLF_struct_17(_GLF_struct_18(vec2(1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, 1.0, mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(0.0), bvec4(true, true, true, true), uvec3(1u, 1u, 1u)), _GLF_struct_19(ivec3(1, 1, 1), 1), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0)), vec4(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                float GLF_live11s = _GLF_FUZZED(-181.147);
                {
                    if (mod(float(GLF_live11i), _GLF_struct_replacement_16._f3._f0.GLF_live11ref) <= 0.01) {
                        GLF_live11s += 0.2;
                    }
                    if (float(GLF_live11i) >= GLF_live11limit) {
                        ;
                    }
                    GLF_live11i++;
                }
            }
            break;
        case 4:
            return mix(pow(_GLF_struct_replacement_13._f0.st.y, injectionSwitch.y), _GLF_struct_replacement_13._f0.st.x, _GLF_IDENTITY(size.x, (size.x) - 0.0));
            break;
    }
}

int binarySearch(BinarySearchObject obj, int x) {
    int l = 0, r = 9;
    {
        int GLF_live5v = _GLF_FUZZED((11820 - 53311));
        {
            GLF_live5v = 3 * GLF_live5v + 1;
        }
    }
    {
        int GLF_live11i = _GLF_FUZZED(-46143);
        float GLF_live11limit = _GLF_FUZZED(float(97348u));
        float GLF_live11ref = _GLF_FUZZED((-vec2(-5.3, 74.20).t));
        float GLF_live11s = _GLF_FUZZED(-8837.5103);
        {
            int GLF_live11looplimiter0 = 0;
            while (GLF_live11i < bitfieldInsert(800, GLF_live11i, 0, 0)) {
                if (GLF_live11looplimiter0 >= 5) {
                    break;
                }
                GLF_live11looplimiter0++;
                {
                    if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                        GLF_live11s += 0.2;
                    }
                    if (float(GLF_live11i) >= GLF_live11limit) {
                        ;
                    }
                    GLF_live11i++;
                }
            }
        }
    }
    while (l <= _GLF_IDENTITY(r, (r) ^ 0)) {
        int m = (l + r) / 2;
        if (_GLF_DEAD(false)) {
            return 1;
        }
        {
            float GLF_live9A = _GLF_FUZZED(28.31);
            float GLF_live9B = _GLF_FUZZED(55.90);
            float GLF_live9C = _GLF_FUZZED((true ? float(21450) : (-5.4)));
            int GLF_live9looplimiter0 = 0;
            float GLF_live9temp = _GLF_FUZZED(2.5);
            float GLF_live9x0 = _GLF_FUZZED(2.2);
            float GLF_live9x1 = _GLF_FUZZED((177.137 + 2.6));
            float GLF_live9x2 = _GLF_FUZZED(-9374.9346);
            while (abs(GLF_live9x2 - GLF_live9x1) >= .000000000000001) {
                if (GLF_live9looplimiter0 >= 4) {
                    break;
                }
                GLF_live9looplimiter0++;
                {
                    float GLF_live9h0 = GLF_live9x0 - GLF_live9x2;
                    float GLF_live9h1 = GLF_live9x1 - GLF_live9x2;
                    float GLF_live9k0 = GLF_live9fx(GLF_live9x0) - GLF_live9fx(GLF_live9x2);
                    float GLF_live9k1 = GLF_live9fx(GLF_live9x1) - GLF_live9fx(GLF_live9x2);
                    GLF_live9temp = GLF_live9x2;
                    GLF_live9A = (((GLF_live9h1) * (GLF_live9k0)) - ((GLF_live9h0) * (GLF_live9k1))) / ((pow((GLF_live9h0), 2.0) * (GLF_live9h1)) - (pow((GLF_live9h1), 2.0) * (GLF_live9h0)));
                    GLF_live9B = (((GLF_live9k0) - (GLF_live9A * (pow((GLF_live9h0), 2.0)))) / (GLF_live9h0));
                    GLF_live9C = GLF_live9fx(GLF_live9x2);
                    GLF_live9x2 = GLF_live9x2 - ((2.0 * GLF_live9C) / (GLF_live9B + sign(GLF_live9B) * sqrt(pow(GLF_live9B, 2.0) - (4.0 * GLF_live9A * GLF_live9C))));
                    GLF_live9x0 = GLF_live9x1;
                    GLF_live9x1 = GLF_live9temp;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = intBitsToFloat(ivec4(63674, 19301, 51288, 72899));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (obj.prime_numbers[m] == x) {
            return m;
        }
        if (obj.prime_numbers[m] < x) {
            {
                float GLF_live7x = _GLF_FUZZED(0.4);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(1.4, 3.5, -9.7, -26.39);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    int GLF_live9looplimiter0 = 0;
                    if (GLF_live9looplimiter0 >= 4) {
                        ;
                    }
                }
                float GLF_live7y = _GLF_FUZZED(-49.97);
                {
                    _GLF_struct_20 _GLF_struct_replacement_20 = _GLF_struct_20(_GLF_struct_21(ivec2(1, 1), ivec4(1, 1, 1, 1), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_22(ivec3(1, 1, 1)), uvec2(1u, 1u), _GLF_struct_23(vec4(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1)), 1.0);
                    _GLF_struct_replacement_20._f0._f5._GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(6785.4196, -2.0, -92.19, 1.9);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_struct_replacement_20._f0._f5._GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    vec4 GLF_live11c = _GLF_FUZZED(((mat2x4(6.6, -9.8, 830.283, 426.010, -6735.3228, -2443.1070, 0.9, -61.50) * vec2(-4010.4994, -1.6)) - vec4(-9.0, 196.925, -218.165, -5498.9510)));
                    int GLF_live11i = _GLF_FUZZED(-6472);
                    if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                        GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                    }
                }
                if (GLF_live7x * GLF_live7x + GLF_live7y * GLF_live7y > 4.0) {
                    ;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return 1;
                }
            }
            l = m + 1;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    int GLF_live11i = _GLF_FUZZED(-4274);
                    float GLF_live11ref = _GLF_FUZZED(416.989);
                    float GLF_live11s = _GLF_FUZZED(float(16365));
                    if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                        GLF_live11s += 0.2;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (6.0 / vec4(-2503.4795, -234.920, 0.9, 6.6));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    float GLF_live9A = _GLF_FUZZED(1.6);
                    float GLF_live9B = _GLF_FUZZED(7173.9366);
                    float GLF_live9C = _GLF_FUZZED(-86.34);
                    float GLF_live9temp = _GLF_FUZZED(-7.9);
                    float GLF_live9x0 = _GLF_FUZZED((68.89 - (-7684.0543)));
                    float GLF_live9x1 = _GLF_FUZZED((+(-3.0)));
                    float GLF_live9x2 = _GLF_FUZZED(66.67);
                    {
                        float GLF_live9h0 = GLF_live9x0 - GLF_live9x2;
                        float GLF_live9h1 = GLF_live9x1 - GLF_live9x2;
                        float GLF_live9k0 = GLF_live9fx(GLF_live9x0) - GLF_live9fx(GLF_live9x2);
                        float GLF_live9k1 = GLF_live9fx(GLF_live9x1) - GLF_live9fx(GLF_live9x2);
                        GLF_live9temp = GLF_live9x2;
                        GLF_live9A = (((GLF_live9h1) * (GLF_live9k0)) - ((GLF_live9h0) * (GLF_live9k1))) / ((pow((GLF_live9h0), 2.0) * (GLF_live9h1)) - (pow((GLF_live9h1), 2.0) * (GLF_live9h0)));
                        GLF_live9B = (((GLF_live9k0) - (GLF_live9A * (pow((GLF_live9h0), 2.0)))) / (GLF_live9h0));
                        GLF_live9C = GLF_live9fx(GLF_live9x2);
                        GLF_live9x2 = GLF_live9x2 - ((2.0 * GLF_live9C) / (GLF_live9B + sign(GLF_live9B) * sqrt(pow(GLF_live9B, 2.0) - (4.0 * GLF_live9A * GLF_live9C))));
                        GLF_live9x0 = GLF_live9x1;
                        GLF_live9x1 = GLF_live9temp;
                    }
                }
                discard;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-7.0, 1.8, 5288.8223, -775.138);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, max(_GLF_outVarBackup_GLF_color, _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, mat4(1.0) * (_GLF_outVarBackup_GLF_color))));
                }
            }
        } else {
            {
                int GLF_live8h = _GLF_FUZZED((70978 | ((-60090) ^ (-1039))));
                int GLF_live8i = _GLF_FUZZED(ivec3(-59521, 49081, 86448).z);
                int GLF_live8l = _GLF_FUZZED(21351);
                int GLF_live8looplimiter0 = 0;
                int GLF_live8pivot = _GLF_FUZZED((+ivec3(67321, -81801, -36918)).r);
                for (int GLF_live8j = GLF_live8l; GLF_live8j <= GLF_live8h - 1; GLF_live8j++) {
                    if (GLF_live8looplimiter0 >= 6) {
                        break;
                    }
                    GLF_live8looplimiter0++;
                    {
                        if (GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 10)] <= GLF_live8pivot) {
                            GLF_live8i++;
                            GLF_live8swap(GLF_live8i, GLF_live8j);
                        }
                    }
                }
            }
            {
                vec2 GLF_live4v = _GLF_FUZZED((float(((-8092) | (-11422))) * vec2(18.55, 1.5)));
                if (length(GLF_live4v) < 0.001) {
                    ;
                }
            }
            r = m - 1;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                continue;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                {
                    vec3 GLF_live6m = _GLF_FUZZED((+vec3(488.259, -12.68, 635.044)));
                    vec2 GLF_live6o = _GLF_FUZZED(vec2(-4397.0669, -8.6));
                    {
                        int GLF_live6k = 1;
                        {
                            int GLF_live6looplimiter0 = 0;
                            while (GLF_live6k >= 0) {
                                if (GLF_live6looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live6looplimiter0++;
                                {
                                    GLF_live6o = GLF_live6o + GLF_live6o;
                                    GLF_live6k--;
                                }
                            }
                        }
                        GLF_live6m = vec3(GLF_live6injectionSwitch.x, cos(GLF_live6o));
                    }
                }
                _GLF_color = unpackSnorm4x8(184456u);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        vec4 GLF_live11c = _GLF_FUZZED(vec4(8.3, -4.3, -42.76, -949.924));
                        int GLF_live11i = _GLF_FUZZED(-71053);
                        {
                            GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                        }
                    }
                }
            }
        }
        {
            {
                {
                    int GLF_live8i = _GLF_FUZZED(-83309);
                    int GLF_live8looplimiter2 = 0;
                    {
                        if (GLF_live8looplimiter2 >= 6) {
                            ;
                        }
                        GLF_live8looplimiter2++;
                        {
                            GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 10)] = (10 - GLF_live8i) * int(GLF_live8injectionSwitch.y);
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(664.091, 831.729, 2.0, 7.1);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    int GLF_live11i = _GLF_FUZZED((false ? (~42518) : (-78300)));
                    float GLF_live11limit = _GLF_FUZZED(851.083);
                    float GLF_live11s = _GLF_FUZZED(vec3(7489.7057, 951.965, 8347.3203).s);
                    if (float(GLF_live11i) >= GLF_live11limit) {
                        ;
                    }
                }
                GLF_live0_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            }
        }
    }
    return -1;
}

void main() {
    BinarySearchObject obj;
    for (_GLF_struct_24 _GLF_struct_replacement_24 = _GLF_struct_24(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 0, bvec3(true, true, true)); _GLF_struct_replacement_24.i < 10; _GLF_struct_replacement_24.i++) {
        if (_GLF_DEAD(false)) {
            discard;
            {
                {
                    ;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            continue;
            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (false ? _GLF_FUZZED(GLF_live0_GLF_color) : gl_FragCoord)).y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                break;
            }
        }
        if (_GLF_struct_replacement_24.i == 0) {
            obj.prime_numbers[_GLF_struct_replacement_24.i] = 2;
        } else if (_GLF_struct_replacement_24.i == 1) {
            {
                _GLF_struct_25 _GLF_struct_replacement_25 = _GLF_struct_25(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), _GLF_struct_26(vec4(1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), vec2(1.0, 1.0), bvec3(true, true, true), vec2(1.0, 1.0), _GLF_struct_27(vec3(1.0, 1.0, 1.0))), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_28(vec4(1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_29(uvec2(1u, 1u), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true)), bvec3(true, true, true), _GLF_struct_30(uvec4(1u, 1u, 1u, 1u), bvec4(true, true, true, true), uvec2(1u, 1u), 1, mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), true)), vec4(1.0, 1.0, 1.0, 1.0));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = dFdxCoarse(vec4(-9.6, 577.561, 43.19, 253.410));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        {
                            {
                                ;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_struct_replacement_25._GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (mat2x4(_GLF_IDENTITY(2.7, tan(0.0) + (2.7)), 30.71, -7395.2792, 2.7, 34.08, -3.6, 8590.0553, 24.05) * vec2(47.84, 565.103));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-33.52, -401.877, 4.3, _GLF_IDENTITY(-32.13, (false ? _GLF_FUZZED(-0.2) : _GLF_IDENTITY(-32.13, mix(float(_GLF_FUZZED(vec2(-28.85, -3890.4799).y)), float(-32.13), bool(true))))));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = _GLF_struct_replacement_25._GLF_outVarBackup_GLF_color;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            int GLF_live10i = _GLF_FUZZED((-15722));
                            int GLF_live10looplimiter8 = 0;
                            mat4 GLF_live10matrix_a = _GLF_FUZZED(mat4(-9.5, 33.50, 6.2, 66.61, 253.986, -3032.3694, 3.4, 231.637, 480.175, 676.594, -4.6, -8.5, -8199.6517, -408.632, -55.49, -43.49));
                            vec4 GLF_live10matrix_b = _GLF_FUZZED(vec4(-6.2, 7.0, -8.4, 1367.3345));
                            for (int GLF_live10j = (GLF_live10MATRIX_N - 1); GLF_live10j >= (GLF_live10i + 1); GLF_live10j--) {
                                if (GLF_live10looplimiter8 >= 4) {
                                    break;
                                }
                                GLF_live10looplimiter8++;
                                {
                                    GLF_live10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] -= (GLF_live10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 4)] * GLF_live10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 4)]);
                                }
                            }
                        }
                        _GLF_color = sin(vec4(-558.351, -2.2, -4.7, 318.781));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-8.3, -40.76, -0.4, 5.4);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            obj.prime_numbers[_GLF_struct_replacement_24.i] = 3;
            {
                int GLF_live8i = _GLF_FUZZED(2869);
                int GLF_live8j = _GLF_FUZZED(-20782);
                int GLF_live8pivot = _GLF_FUZZED(92213);
                if (GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 10)] <= GLF_live8pivot) {
                    GLF_live8i++;
                    GLF_live8swap(GLF_live8i, GLF_live8j);
                }
            }
        } else {
            {
                vec2 GLF_live1coord = _GLF_FUZZED(vec2(4665.6278, -2.1));
                {
                    _GLF_struct_31 _GLF_struct_replacement_31 = _GLF_struct_31(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec2(((GLF_live1coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0), 1u);
                    uint GLF_live1res1 = uint(((_GLF_struct_replacement_31.GLF_live1icoord.x * _GLF_struct_replacement_31.GLF_live1icoord.y) >> (_GLF_struct_replacement_31.GLF_live1icoord.x & 31u)) & 0xffffffffu);
                    {
                        vec2 GLF_live4a = _GLF_FUZZED((vec2(6.7, -3.4)));
                        {
                            {
                                {
                                    ;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            {
                                int GLF_live8h = _GLF_FUZZED(-76281);
                                int GLF_live8i = _GLF_FUZZED(-28964);
                                int GLF_live8l = _GLF_FUZZED((20290 + 91673));
                                int GLF_live8looplimiter0 = 0;
                                _GLF_struct_32 _GLF_struct_replacement_32 = _GLF_struct_32(_GLF_FUZZED(3114), ivec3(1, 1, 1), _GLF_struct_33(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_34(uvec4(1u, 1u, 1u, 1u), bvec3(true, true, true), uvec4(1u, 1u, 1u, 1u), vec3(1.0, 1.0, 1.0)), _GLF_struct_35(mat2(1.0, 1.0, 1.0, 1.0), bvec3(true, true, true), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), true, mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0))));
                                for (int GLF_live8j = GLF_live8l; GLF_live8j <= GLF_live8h - 1; GLF_live8j++) {
                                    if (GLF_live8looplimiter0 >= 6) {
                                        break;
                                    }
                                    GLF_live8looplimiter0++;
                                    {
                                        if (GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 10)] <= _GLF_struct_replacement_32.GLF_live8pivot) {
                                            GLF_live8i++;
                                            GLF_live8swap(GLF_live8i, GLF_live8j);
                                        }
                                    }
                                }
                            }
                            _GLF_color = vec4(91.84, 566.246, 707.214, -393.941);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        float GLF_live4z = _GLF_FUZZED(3.3);
                        if (GLF_live4a.y > GLF_live4a.x) {
                            {
                                vec3 GLF_live8color = _GLF_FUZZED(((-58.28) - (mat4x3(6.8, 69.33, -38.88, 886.387, -4.7, -68.73, -9.5, -2.4, -5.6, -241.108, -72.62, -9.0) * vec4(-9.3, -5.7, 273.206, -27.04))));
                                _GLF_struct_36 _GLF_struct_replacement_36 = _GLF_struct_36(_GLF_FUZZED(((-(-11303)) ^ (-15472))), 1u, 1);
                                int GLF_live8looplimiter3 = 0;
                                do {
                                    if (GLF_live8looplimiter3 >= 6) {
                                        break;
                                    }
                                    GLF_live8looplimiter3++;
                                    {
                                        GLF_live8color += GLF_live8palette(vec3(0.5, float(GLF_live8obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live8injectionSwitch.y)), vec3(float(GLF_live8obj.numbers[4]) * 0.1, GLF_live8injectionSwitch.x, 0.6));
                                        _GLF_struct_replacement_36.GLF_live8count++;
                                    }
                                } while (_GLF_struct_replacement_36.GLF_live8count != GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live8injectionSwitch.x), 10)]);
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = refract(vec4(-2.3, -912.998, 281.054, 992.233), exp2((true ? vec4(49.19, -238.672, 779.328, -8.0) : vec4(60.85, -271.054, 4.3, 708.117))), 86.95);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            GLF_live4z = GLF_live4a.x / GLF_live4a.y;
                        } else {
                            GLF_live4z = GLF_live4a.y / GLF_live4a.x;
                        }
                    }
                    uint GLF_live1res2 = uint(((_GLF_struct_replacement_31.GLF_live1icoord.x * _GLF_struct_replacement_31.GLF_live1icoord.y) << (_GLF_struct_replacement_31.GLF_live1icoord.x & 31u)) & 0xffffffffu);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            float GLF_live10alpha1 = _GLF_FUZZED(-2.9);
                            int GLF_live10looplimiter1 = 0;
                            vec4 GLF_live10matrix_u = _GLF_FUZZED(vec4(-42.94, vec2(-3.7, -1.5), -0.2));
                            int GLF_live10u = _GLF_FUZZED(11007);
                            {
                                if (GLF_live10looplimiter1 >= 4) {
                                    ;
                                }
                                GLF_live10looplimiter1++;
                                {
                                    GLF_live10alpha1 += pow(GLF_live10matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10u, 4)], 2.0);
                                }
                            }
                        }
                        _GLF_color = vec4(-760.103, -8.4, -3.9, -6303.2123);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(1.0, 1, float(((GLF_live1res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live1res1 & 1u) != 0u ? 1u : 0u)), vec2(1.0, 1.0), 1.0, mat2x4(1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, (1.0) - 0.0)) + 0.0), 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u));
                    GLF_live1_GLF_color = vec4(_GLF_struct_replacement_0.GLF_live1res, _GLF_struct_replacement_0.GLF_live1res, _GLF_struct_replacement_0.GLF_live1res, 1.0);
                }
            }
            if (_GLF_struct_replacement_24.i == 2) {
                obj.prime_numbers[_GLF_struct_replacement_24.i] = 5;
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        {
                            GLF_live9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(9.1, -7643.8005, -9.2, 5.8);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    {
                        vec4 GLF_live11c = _GLF_FUZZED(vec4(-3522.7456, -2.0, -53.30, 6.8));
                        int GLF_live11i = _GLF_FUZZED((~66539));
                        int GLF_live11looplimiter1 = 0;
                        int GLF_live11msb8 = _GLF_FUZZED((98408 + 17342));
                        do {
                            if (GLF_live11looplimiter1 >= 5) {
                                break;
                            }
                            GLF_live11looplimiter1++;
                            {
                                if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                    GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                }
                                GLF_live11i++;
                            }
                        } while (GLF_live11i < findMSB(findLSB(GLF_live11msb8)));
                    }
                }
                if (_GLF_struct_replacement_24.i == 3) {
                    obj.prime_numbers[_GLF_struct_replacement_24.i] = 7;
                } else {
                    {
                        int GLF_live10looplimiter7 = 0;
                        if (GLF_live10looplimiter7 >= 4) {
                            ;
                        }
                    }
                    if (_GLF_struct_replacement_24.i == _GLF_IDENTITY(4, 0 ^ (_GLF_IDENTITY(4, clamp(4, 4, 4))))) {
                        obj.prime_numbers[_GLF_struct_replacement_24.i] = 11;
                    } else if (_GLF_IDENTITY(i == _GLF_IDENTITY(5, 0 ^ (_GLF_IDENTITY(5, (5) | (5)))), _GLF_IDENTITY(false, (false) || false) || (_GLF_struct_replacement_24.i == _GLF_IDENTITY(5, 0 ^ (_GLF_IDENTITY(5, (_GLF_IDENTITY(5, min(5, 5))) | (5))))))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-388.054, -6.1, 32.59, -581.352);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_IDENTITY(obj.prime_numbers[i] = 13, 0 | (_GLF_IDENTITY(obj.prime_numbers[i] = 13, (obj.prime_numbers[_GLF_struct_replacement_24.i] = _GLF_IDENTITY(13, min(13, 13))) * 1)));
                    } else if (_GLF_struct_replacement_24.i == 6) {
                        obj.prime_numbers[_GLF_struct_replacement_24.i] = 17;
                    } else {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-_GLF_IDENTITY(6.4, float(mat3(6.4, exp(0.0), tan(0.0), 0.0, 0.0, 0.0, 0.0, sqrt(0.0), 0.0))), -24.06, 7387.4685, -3.1);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                {
                                    float GLF_live9A = _GLF_FUZZED(-1.1);
                                    _GLF_struct_37 _GLF_struct_replacement_37 = _GLF_struct_37(ivec2(1, 1), _GLF_FUZZED(-600.813), true, mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_38(vec3(1.0, 1.0, 1.0)), _GLF_struct_39(mat2(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), bvec3(true, true, true), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true), ivec3(1, 1, 1)), vec2(1.0, 1.0));
                                    float GLF_live9C = _GLF_FUZZED(vec4(-5.7, -150.359, 7.0, -82.06).z);
                                    int GLF_live9looplimiter0 = 0;
                                    float GLF_live9temp = _GLF_FUZZED(-9624.3073);
                                    float GLF_live9x0 = _GLF_FUZZED(-6.0);
                                    float GLF_live9x1 = _GLF_FUZZED(((bvec3(true, false, true) == bvec3(false, false, false)) ? (-429.137) : (-2.1)));
                                    float GLF_live9x2 = _GLF_FUZZED(vec3(-8740.1305, 700.962, -316.928).r);
                                    while (abs(GLF_live9x2 - GLF_live9x1) >= .000000000000001) {
                                        if (GLF_live9looplimiter0 >= 4) {
                                            break;
                                        }
                                        GLF_live9looplimiter0++;
                                        {
                                            float GLF_live9h0 = GLF_live9x0 - GLF_live9x2;
                                            float GLF_live9h1 = GLF_live9x1 - GLF_live9x2;
                                            float GLF_live9k0 = GLF_live9fx(GLF_live9x0) - GLF_live9fx(GLF_live9x2);
                                            _GLF_struct_40 _GLF_struct_replacement_40 = _GLF_struct_40(1.0, GLF_live9fx(GLF_live9x1) - GLF_live9fx(GLF_live9x2), 1, _GLF_struct_41(ivec3(1, 1, 1), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), 1, mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0)));
                                            GLF_live9temp = GLF_live9x2;
                                            GLF_live9A = (((GLF_live9h1) * (GLF_live9k0)) - ((GLF_live9h0) * (_GLF_struct_replacement_40.GLF_live9k1))) / ((pow((GLF_live9h0), 2.0) * (GLF_live9h1)) - (pow((GLF_live9h1), 2.0) * (GLF_live9h0)));
                                            _GLF_struct_replacement_37.GLF_live9B = (((GLF_live9k0) - (GLF_live9A * (pow((GLF_live9h0), 2.0)))) / (GLF_live9h0));
                                            GLF_live9C = GLF_live9fx(GLF_live9x2);
                                            GLF_live9x2 = GLF_live9x2 - ((2.0 * GLF_live9C) / (_GLF_struct_replacement_37.GLF_live9B + sign(_GLF_struct_replacement_37.GLF_live9B) * sqrt(pow(_GLF_struct_replacement_37.GLF_live9B, 2.0) - (4.0 * GLF_live9A * GLF_live9C))));
                                            GLF_live9x0 = GLF_live9x1;
                                            GLF_live9x1 = GLF_live9temp;
                                        }
                                    }
                                }
                                {
                                    int GLF_live5count = _GLF_FUZZED((-(-8812)));
                                    int GLF_live5v = _GLF_FUZZED(ivec2(-59535, 34562).s);
                                    {
                                        int GLF_live5looplimiter0 = 0;
                                        while (GLF_live5v > 1) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-107.228, -9.6, 315.577, 7560.1541);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (GLF_live5looplimiter0 >= 3) {
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                break;
                                            }
                                            GLF_live5looplimiter0++;
                                            {
                                                if ((GLF_live5v & 1) == 1) {
                                                    GLF_live5v = 3 * GLF_live5v + 1;
                                                } else {
                                                    GLF_live5v /= 2;
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                }
                                                GLF_live5count++;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                continue;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        {
                                            float GLF_live9A = _GLF_FUZZED(vec3(-7.0, -8245.9131, -91.22).g);
                                            float GLF_live9B = _GLF_FUZZED(-3.2);
                                            _GLF_struct_42 _GLF_struct_replacement_42 = _GLF_struct_42(_GLF_FUZZED((4757.4878)), vec4(1.0, 1.0, 1.0, 1.0));
                                            float GLF_live9temp = _GLF_FUZZED(-3.9);
                                            float GLF_live9x0 = _GLF_FUZZED(329.388);
                                            float GLF_live9x1 = _GLF_FUZZED(((-7791.7372) * (-4929.2228)));
                                            float GLF_live9x2 = _GLF_FUZZED(float(false));
                                            {
                                                int GLF_live9looplimiter0 = 0;
                                                while (abs(GLF_live9x2 - GLF_live9x1) >= .000000000000001) {
                                                    if (GLF_live9looplimiter0 >= 4) {
                                                        break;
                                                    }
                                                    GLF_live9looplimiter0++;
                                                    {
                                                        float GLF_live9h0 = GLF_live9x0 - GLF_live9x2;
                                                        float GLF_live9h1 = GLF_live9x1 - GLF_live9x2;
                                                        float GLF_live9k0 = GLF_live9fx(GLF_live9x0) - GLF_live9fx(GLF_live9x2);
                                                        float GLF_live9k1 = GLF_live9fx(GLF_live9x1) - GLF_live9fx(GLF_live9x2);
                                                        GLF_live9temp = GLF_live9x2;
                                                        GLF_live9A = (((GLF_live9h1) * (GLF_live9k0)) - ((GLF_live9h0) * (GLF_live9k1))) / ((pow((GLF_live9h0), 2.0) * (GLF_live9h1)) - (pow((GLF_live9h1), 2.0) * (GLF_live9h0)));
                                                        GLF_live9B = (((GLF_live9k0) - (GLF_live9A * (pow((GLF_live9h0), 2.0)))) / (GLF_live9h0));
                                                        _GLF_struct_replacement_42.GLF_live9C = GLF_live9fx(GLF_live9x2);
                                                        GLF_live9x2 = GLF_live9x2 - ((2.0 * _GLF_struct_replacement_42.GLF_live9C) / (GLF_live9B + sign(GLF_live9B) * sqrt(pow(GLF_live9B, 2.0) - (4.0 * GLF_live9A * _GLF_struct_replacement_42.GLF_live9C))));
                                                        GLF_live9x0 = GLF_live9x1;
                                                        GLF_live9x1 = GLF_live9temp;
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                        {
                                            vec4 GLF_live11c = _GLF_FUZZED(vec4(1971.3898, -2707.9528, 53.88, -8.4));
                                            int GLF_live11i = _GLF_FUZZED(18225);
                                            {
                                                if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                                    GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                                }
                                                GLF_live11i++;
                                            }
                                        }
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                {
                                    float GLF_live7c_im = _GLF_FUZZED(((-7541.8899) - vec2(-127.302, 2981.4942).y));
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = step(-50.02, ((-7115.7988) + vec4(-0.1, 42.15, -3259.1227, -90.21)));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false || (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    float GLF_live7c_re = _GLF_FUZZED(3297.1442);
                                    int GLF_live7iteration = _GLF_FUZZED(81407);
                                    float GLF_live7x = _GLF_FUZZED(61.70);
                                    float GLF_live7y = _GLF_FUZZED(-0.1);
                                    {
                                        float GLF_live9A = _GLF_FUZZED(-8451.3380);
                                        float GLF_live9B = _GLF_FUZZED(-9137.7587);
                                        float GLF_live9C = _GLF_FUZZED(-2.6);
                                        _GLF_struct_43 _GLF_struct_replacement_43 = _GLF_struct_43(0, vec3(1.0, 1.0, 1.0));
                                        float GLF_live9temp = _GLF_FUZZED((1569.8472 - (-7061.9651)));
                                        float GLF_live9x0 = _GLF_FUZZED(9.7);
                                        float GLF_live9x1 = _GLF_FUZZED(float(((141200u - 189652u) * (187726u * 28624u))));
                                        float GLF_live9x2 = _GLF_FUZZED(((mat4(-680.823, 5.1, 723.092, -3.0, -206.097, 402.254, -253.892, -0.2, -17.56, 21.35, 3.8, 2798.6186, 1.2, -21.32, 31.91, 6.3) != mat4(3054.6770, 0.2, 9.7, -475.982, 3737.2994, 20.68, -68.64, -1.8, -169.195, -5.8, 22.10, 95.33, 57.15, -3.4, -6.6, 116.628)) ? 8701.0758 : (-2553.4138)));
                                        while (abs(GLF_live9x2 - GLF_live9x1) >= .000000000000001) {
                                            if (_GLF_struct_replacement_43.GLF_live9looplimiter0 >= 4) {
                                                break;
                                            }
                                            _GLF_struct_replacement_43.GLF_live9looplimiter0++;
                                            {
                                                float GLF_live9h0 = GLF_live9x0 - GLF_live9x2;
                                                float GLF_live9h1 = GLF_live9x1 - GLF_live9x2;
                                                float GLF_live9k0 = GLF_live9fx(GLF_live9x0) - GLF_live9fx(GLF_live9x2);
                                                float GLF_live9k1 = GLF_live9fx(GLF_live9x1) - GLF_live9fx(GLF_live9x2);
                                                GLF_live9temp = GLF_live9x2;
                                                GLF_live9A = (((GLF_live9h1) * (GLF_live9k0)) - ((GLF_live9h0) * (GLF_live9k1))) / ((pow((GLF_live9h0), 2.0) * (GLF_live9h1)) - (pow((GLF_live9h1), 2.0) * (GLF_live9h0)));
                                                GLF_live9B = (((GLF_live9k0) - (GLF_live9A * (pow((GLF_live9h0), 2.0)))) / (GLF_live9h0));
                                                GLF_live9C = GLF_live9fx(GLF_live9x2);
                                                GLF_live9x2 = GLF_live9x2 - ((2.0 * GLF_live9C) / (GLF_live9B + sign(GLF_live9B) * sqrt(pow(GLF_live9B, 2.0) - (4.0 * GLF_live9A * GLF_live9C))));
                                                GLF_live9x0 = GLF_live9x1;
                                                GLF_live9x1 = GLF_live9temp;
                                            }
                                        }
                                    }
                                    {
                                        if (GLF_live7x * GLF_live7x + GLF_live7y * GLF_live7y > 4.0) {
                                            ;
                                        }
                                        float GLF_live7x_new = GLF_live7x * GLF_live7x - GLF_live7y * GLF_live7y + GLF_live7c_re;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(65.84, -677.259, -97.46, -5518.6901);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(0.0))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        GLF_live7y = 2.0 * GLF_live7x * GLF_live7y + GLF_live7c_im;
                                        GLF_live7x = GLF_live7x_new;
                                        GLF_live7iteration++;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    continue;
                                }
                                {
                                    float GLF_live9A = _GLF_FUZZED(4962.3196);
                                    float GLF_live9B = _GLF_FUZZED((-2.3));
                                    float GLF_live9C = _GLF_FUZZED(float(119108u));
                                    float GLF_live9temp = _GLF_FUZZED(-28.94);
                                    float GLF_live9x0 = _GLF_FUZZED(-482.638);
                                    float GLF_live9x1 = _GLF_FUZZED((67.35 + 3376.9878));
                                    float GLF_live9x2 = _GLF_FUZZED(84.00);
                                    {
                                        int GLF_live9looplimiter0 = 0;
                                        while (abs(GLF_live9x2 - GLF_live9x1) >= .000000000000001) {
                                            if (GLF_live9looplimiter0 >= 4) {
                                                break;
                                            }
                                            GLF_live9looplimiter0++;
                                            {
                                                float GLF_live9h0 = GLF_live9x0 - GLF_live9x2;
                                                float GLF_live9h1 = GLF_live9x1 - GLF_live9x2;
                                                float GLF_live9k0 = GLF_live9fx(GLF_live9x0) - GLF_live9fx(GLF_live9x2);
                                                float GLF_live9k1 = GLF_live9fx(GLF_live9x1) - GLF_live9fx(GLF_live9x2);
                                                GLF_live9temp = GLF_live9x2;
                                                GLF_live9A = (((GLF_live9h1) * (GLF_live9k0)) - ((GLF_live9h0) * (GLF_live9k1))) / ((pow((GLF_live9h0), 2.0) * (GLF_live9h1)) - (pow((GLF_live9h1), 2.0) * (GLF_live9h0)));
                                                GLF_live9B = (((GLF_live9k0) - (GLF_live9A * (pow((GLF_live9h0), 2.0)))) / (GLF_live9h0));
                                                GLF_live9C = GLF_live9fx(GLF_live9x2);
                                                GLF_live9x2 = GLF_live9x2 - ((2.0 * GLF_live9C) / (GLF_live9B + sign(GLF_live9B) * sqrt(pow(GLF_live9B, 2.0) - (4.0 * GLF_live9A * GLF_live9C))));
                                                GLF_live9x0 = GLF_live9x1;
                                                GLF_live9x1 = GLF_live9temp;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        {
                            vec2 GLF_merged2_0_1_15_1_1_15GLF_live2alpha2GLF_live2alpha3;
                            {
                                {
                                    ;
                                }
                            }
                            float GLF_live2alpha2 = _GLF_FUZZED(_GLF_IDENTITY(3.0, mix(float(_GLF_FUZZED(2546.0241)), float(_GLF_IDENTITY(3.0, float(vec4(3.0, 1.0, abs(1.0), 0.0)))), bool(true))));
                            GLF_merged2_0_1_15_1_1_15GLF_live2alpha2GLF_live2alpha3.x = GLF_live2alpha2;
                            float GLF_live2alpha3 = _GLF_FUZZED(-8.8);
                            {
                                int GLF_live11looplimiter0 = 0;
                                if (GLF_live11looplimiter0 >= 5) {
                                    ;
                                }
                            }
                            GLF_merged2_0_1_15_1_1_15GLF_live2alpha2GLF_live2alpha3.y = GLF_live2alpha3;
                            _GLF_struct_44 _GLF_struct_replacement_44 = _GLF_struct_44(_GLF_FUZZED(float((32596 != ((_GLF_IDENTITY(-62934, clamp(-62934, -62934, -62934))) - 89627)))), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), true, 1.0, 1.0);
                            _GLF_struct_45 _GLF_struct_replacement_45 = _GLF_struct_45(_GLF_FUZZED(12006), true);
                            {
                                float GLF_live4th = _GLF_FUZZED(515.447);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-7.5, 5092.4652, 0.5, 7.5);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (true)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    {
                                        int GLF_live10i = _GLF_FUZZED(44119);
                                        mat4 GLF_live10matrix_a = _GLF_FUZZED(mat4(6.1, -6.9, -6175.5270, -5.0, 4.3, 7.1, -0.3, 367.561, -2.4, -5.8, 68.53, 94.81, -1.2, 6.4, 171.401, -2.3));
                                        vec4 GLF_live10matrix_b = _GLF_FUZZED(vec4(-7.8, 7.3, -5403.7454, -2.5));
                                        {
                                            int GLF_live10looplimiter8 = 0;
                                            for (int GLF_live10j = (GLF_live10MATRIX_N - 1); GLF_live10j >= (GLF_live10i + 1); GLF_live10j--) {
                                                if (GLF_live10looplimiter8 >= 4) {
                                                    break;
                                                }
                                                GLF_live10looplimiter8++;
                                                {
                                                    GLF_live10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] -= (GLF_live10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 4)] * GLF_live10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 4)]);
                                                }
                                            }
                                        }
                                    }
                                }
                                {
                                    {
                                        vec4 GLF_live11c = _GLF_FUZZED(vec4(9.8, -88.66, -52.10, -5.6));
                                        int GLF_live11i = _GLF_FUZZED((+97252));
                                        {
                                            GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = asinh(vec4(-6.2, -1.6, 2.5, -3957.2766));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            {
                                                int GLF_live10k = _GLF_FUZZED(-2878);
                                                int GLF_live10looplimiter0 = 0;
                                                float GLF_live10magnitudeX = _GLF_FUZZED(-1762.2106);
                                                mat4 GLF_live10matrix_a = _GLF_FUZZED(mat4(42.24, -40.68, -209.797, 3.3, -766.032, -1.5, -1.3, -2.1, 18.85, -1.0, -82.38, -0.2, -46.79, 0.6, 1624.8636, 9.6));
                                                vec4 GLF_live10matrix_u = _GLF_FUZZED(vec4(-341.543, (vec2(-591.640, -8.0) - (-4.9)), -83.27));
                                                for (int GLF_live10x = GLF_live10MATRIX_N - 1; GLF_live10x >= GLF_live10k; GLF_live10x--) {
                                                    if (GLF_live10looplimiter0 >= 4) {
                                                        break;
                                                    }
                                                    GLF_live10looplimiter0++;
                                                    {
                                                        GLF_live10magnitudeX += pow(GLF_live10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k, 4)], 2.0);
                                                        GLF_live10matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10x, 4)] = GLF_live10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k, 4)];
                                                    }
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    GLF_live4th = 0.5 - GLF_live4th;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-1705.9674, -49.65, 109.375, -577.988);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_struct_1 _GLF_struct_replacement_1 = _GLF_struct_1(_GLF_struct_2(mat2x3(1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)), 1.0), _GLF_FUZZED(((-4758.8440) + mat4(75.76, 9.4, 97.75, 9.2, 8499.6943, -751.551, -42.64, -0.4, -2.3, 568.448, 3167.5973, -5.3, -_GLF_IDENTITY(8.9, 1.0 * (8.9)), -8178.9106, _GLF_IDENTITY(634.094, max(634.094, _GLF_IDENTITY(634.094, mix(float(634.094), float(_GLF_FUZZED(-4782.5912)), bool(false))))), 2.6)))), _GLF_struct_3(mat2(1.0, 1.0, 1.0, 1.0), true, _GLF_IDENTITY(1.0, _GLF_IDENTITY(float(mat2x4(1.0, 0.0, 0.0, 1.0, round(length(normalize(1.0))), 0.0, 0.0, log(1.0))), min(float(mat2x4(1.0, 0.0, 0.0, 1.0, round(length(normalize(1.0))), 0.0, 0.0, log(1.0))), float(mat2x4(1.0, 0.0, 0.0, 1.0, round(length(normalize(1.0))), 0.0, 0.0, log(1.0))))))), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), uvec4(1u, 1u, 1u, 1u), _GLF_struct_4(mat2(1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, float(mat2x4(1.0, 0.0, 1.0, 1.0, 1.0, 1.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0))), 1.0), _GLF_struct_5(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0)), uvec3(1u, 1u, 1u), mat2(1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1)));
                            vec4 GLF_live2matrix_u = _GLF_IDENTITY(_GLF_FUZZED(vec3(-56.42, 4.5, -2.8).grbr), (_GLF_FUZZED(vec3(-56.42, 4.5, -2.8).grbr)) - vec4(0.0, 0.0, 0.0, 0.0));
                            {
                                vec3 GLF_live8color = _GLF_FUZZED(vec3(-91.45, 92.29, 1.5));
                                int GLF_live8count = _GLF_FUZZED((true ? 76053 : 99757));
                                int GLF_live8looplimiter4 = 0;
                                {
                                    if (GLF_live8looplimiter4 >= 6) {
                                        ;
                                    }
                                    GLF_live8looplimiter4++;
                                    {
                                        GLF_live8color -= GLF_live8palette(vec3(float(GLF_live8obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live8injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live8injectionSwitch.x, float(GLF_live8obj.numbers[2]) * 0.1, float(GLF_live8obj.numbers[8]) * 0.1));
                                        GLF_live8count++;
                                    }
                                }
                            }
                            {
                                int GLF_live2looplimiter4 = 0;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                for (int GLF_live2j = _GLF_IDENTITY(GLF_live2k, min(_GLF_struct_replacement_45.GLF_live2k, _GLF_struct_replacement_45.GLF_live2k)); GLF_live2j < GLF_live2MATRIX_N; GLF_live2j++) {
                                    if (GLF_live2looplimiter4 >= 3) {
                                        break;
                                    }
                                    {
                                        vec2 GLF_live4a = _GLF_FUZZED(((mat3x2(7.5, 7.5, -8.1, -7.8, -5995.7499, -23.51) * vec3(654.383, -221.156, -966.271)) * 8.6));
                                        float GLF_live4z = _GLF_FUZZED(vec4(6850.3289, 5346.5455, -0.9, 4.3).z);
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        {
                                            GLF_live4z = GLF_live4a.x / GLF_live4a.y;
                                        }
                                    }
                                    GLF_live2looplimiter4++;
                                    {
                                        {
                                            {
                                                float GLF_live7c_im = _GLF_FUZZED(vec4(-6.3, 11.43, 98.41, 8.8).w);
                                                float GLF_live7c_re = _GLF_FUZZED(vec2(6.4, 6091.9267).t);
                                                int GLF_live7iteration = _GLF_FUZZED(((-27820) + ivec4(-86481, ivec2(-52306, -82537), 81368)).s);
                                                int GLF_live7looplimiter0 = 0;
                                                float GLF_live7x = _GLF_FUZZED(float(79450));
                                                float GLF_live7y = _GLF_FUZZED(float(-67025));
                                                {
                                                    if (GLF_live7looplimiter0 >= 6) {
                                                        ;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    GLF_live7looplimiter0++;
                                                    {
                                                        if (GLF_live7x * GLF_live7x + GLF_live7y * GLF_live7y > 4.0) {
                                                            ;
                                                        }
                                                        float GLF_live7x_new = GLF_live7x * GLF_live7x - GLF_live7y * GLF_live7y + GLF_live7c_re;
                                                        GLF_live7y = 2.0 * GLF_live7x * GLF_live7y + GLF_live7c_im;
                                                        GLF_live7x = GLF_live7x_new;
                                                        GLF_live7iteration++;
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            {
                                                int GLF_live10looplimiter8 = 0;
                                                if (GLF_live10looplimiter8 >= 4) {
                                                    ;
                                                }
                                            }
                                            int GLF_live2looplimiter2 = 0;
                                            for (int GLF_live2a = GLF_live2MATRIX_N - 1; GLF_live2a >= _GLF_struct_replacement_45.GLF_live2k; GLF_live2a--) {
                                                if (GLF_live2looplimiter2 >= 3) {
                                                    break;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(982.056, -422.318, 45.86, -5728.4144);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch, min(_GLF_IDENTITY(injectionSwitch, vec2(mat2x4(injectionSwitch, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0))), injectionSwitch)).x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    {
                                                        float GLF_live4th = _GLF_FUZZED(418.729);
                                                        {
                                                            {
                                                                {
                                                                    float GLF_live10alpha3 = _GLF_FUZZED(6.8);
                                                                    int GLF_live10k = _GLF_FUZZED(int(106304u));
                                                                    vec4 GLF_live10matrix_b = _GLF_FUZZED(vec4(-293.566, 594.682, 81.43, 7.6));
                                                                    vec4 GLF_live10matrix_u = _GLF_FUZZED(vec4(-9.2, -65.86, 9345.2323, -2797.3645));
                                                                    {
                                                                        int GLF_live10looplimiter5 = 0;
                                                                        for (int GLF_live10b = GLF_live10MATRIX_N - 1; GLF_live10b >= GLF_live10k; GLF_live10b--) {
                                                                            if (GLF_live10looplimiter5 >= 4) {
                                                                                break;
                                                                            }
                                                                            GLF_live10looplimiter5++;
                                                                            {
                                                                                GLF_live10alpha3 += GLF_live10matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10b, 4)] * GLF_live10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10b, 4)];
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-863.750, 33.15, 7.8, -1.9);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            GLF_live4th = 1.0 - GLF_live4th;
                                                        }
                                                    }
                                                    _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_outVarBackup_GLF_color = _GLF_color) / vec4(1.0, 1.0, 1.0, 1.0))));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        discard;
                                                        {
                                                            vec4 GLF_live11c = _GLF_FUZZED(vec4(1.1, 486.593, -8.3, -5.3));
                                                            int GLF_live11i = _GLF_FUZZED(ivec2(-84971, 95635).g);
                                                            if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                                                GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                                            }
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-4.3, 7436.7395, vec2(6.1, -1.2));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                    }
                                                    _GLF_color = vec4(-5312.8885, _GLF_IDENTITY(434.217, min(434.217, 434.217)), 9172.6571, 31.81);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        {
                                                            float GLF_live9A = _GLF_FUZZED(-2983.2865);
                                                            float GLF_live9B = _GLF_FUZZED(-8782.0647);
                                                            float GLF_live9C = _GLF_FUZZED(-5.0);
                                                            int GLF_live9looplimiter0 = 0;
                                                            float GLF_live9temp = _GLF_FUZZED(1328.6275);
                                                            float GLF_live9x0 = _GLF_FUZZED(vec4(-207.022, -764.303, -84.60, -3.1).s);
                                                            float GLF_live9x1 = _GLF_FUZZED(float(true));
                                                            float GLF_live9x2 = _GLF_FUZZED(8.4);
                                                            while (abs(GLF_live9x2 - GLF_live9x1) >= .000000000000001) {
                                                                if (GLF_live9looplimiter0 >= 4) {
                                                                    break;
                                                                }
                                                                GLF_live9looplimiter0++;
                                                                {
                                                                    float GLF_live9h0 = GLF_live9x0 - GLF_live9x2;
                                                                    float GLF_live9h1 = GLF_live9x1 - GLF_live9x2;
                                                                    float GLF_live9k0 = GLF_live9fx(GLF_live9x0) - GLF_live9fx(GLF_live9x2);
                                                                    float GLF_live9k1 = GLF_live9fx(GLF_live9x1) - GLF_live9fx(GLF_live9x2);
                                                                    GLF_live9temp = GLF_live9x2;
                                                                    GLF_live9A = (((GLF_live9h1) * (GLF_live9k0)) - ((GLF_live9h0) * (GLF_live9k1))) / ((pow((GLF_live9h0), 2.0) * (GLF_live9h1)) - (pow((GLF_live9h1), 2.0) * (GLF_live9h0)));
                                                                    GLF_live9B = (((GLF_live9k0) - (GLF_live9A * (pow((GLF_live9h0), 2.0)))) / (GLF_live9h0));
                                                                    GLF_live9C = GLF_live9fx(GLF_live9x2);
                                                                    GLF_live9x2 = GLF_live9x2 - ((2.0 * GLF_live9C) / (GLF_live9B + sign(GLF_live9B) * sqrt(pow(GLF_live9B, 2.0) - (4.0 * GLF_live9A * GLF_live9C))));
                                                                    GLF_live9x0 = GLF_live9x1;
                                                                    GLF_live9x1 = GLF_live9temp;
                                                                }
                                                            }
                                                        }
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                _GLF_IDENTITY(GLF_live2looplimiter2++, (_GLF_IDENTITY(GLF_live2looplimiter2++, (GLF_live2looplimiter2++) << 0)) >> 0);
                                                {
                                                    GLF_merged2_0_1_15_1_1_15GLF_live2alpha2GLF_live2alpha3.y += GLF_live2matrix_u[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live2a, (GLF_live2a) * ((1 ^ 0) ^ 0)), 4)] * _GLF_struct_replacement_1._f0.GLF_live2matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2a, 4)][_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live2j, 1 * (_GLF_IDENTITY(GLF_live2j, int(ivec4(GLF_live2j, 1, 0, 0))))), 4)];
                                                }
                                            }
                                        }
                                        _GLF_struct_replacement_44.GLF_live2beta = GLF_merged2_0_1_15_1_1_15GLF_live2alpha2GLF_live2alpha3.x * GLF_merged2_0_1_15_1_1_15GLF_live2alpha2GLF_live2alpha3.y;
                                        {
                                            float GLF_live9A = _GLF_FUZZED(4.0);
                                            float GLF_live9B = _GLF_FUZZED((227.171));
                                            float GLF_live9C = _GLF_FUZZED(339.437);
                                            float GLF_live9temp = _GLF_FUZZED(672.553);
                                            float GLF_live9x0 = _GLF_FUZZED(286.439);
                                            float GLF_live9x1 = _GLF_FUZZED((7.8 - 236.000));
                                            float GLF_live9x2 = _GLF_FUZZED(-2146.7696);
                                            {
                                                float GLF_live9h0 = GLF_live9x0 - GLF_live9x2;
                                                float GLF_live9h1 = GLF_live9x1 - GLF_live9x2;
                                                float GLF_live9k0 = GLF_live9fx(GLF_live9x0) - GLF_live9fx(GLF_live9x2);
                                                float GLF_live9k1 = GLF_live9fx(GLF_live9x1) - GLF_live9fx(GLF_live9x2);
                                                GLF_live9temp = GLF_live9x2;
                                                GLF_live9A = (((GLF_live9h1) * (GLF_live9k0)) - ((GLF_live9h0) * (GLF_live9k1))) / ((pow((GLF_live9h0), 2.0) * (GLF_live9h1)) - (pow((GLF_live9h1), 2.0) * (GLF_live9h0)));
                                                GLF_live9B = (((GLF_live9k0) - (GLF_live9A * (pow((GLF_live9h0), 2.0)))) / (GLF_live9h0));
                                                GLF_live9C = GLF_live9fx(GLF_live9x2);
                                                GLF_live9x2 = GLF_live9x2 - ((2.0 * GLF_live9C) / (GLF_live9B + sign(GLF_live9B) * sqrt(pow(GLF_live9B, 2.0) - (4.0 * GLF_live9A * GLF_live9C))));
                                                GLF_live9x0 = GLF_live9x1;
                                                GLF_live9x1 = GLF_live9temp;
                                            }
                                        }
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, _GLF_ONE(1.0, injectionSwitch.y))), dot(vec2(0.0, 0.0), vec2(1.0, _GLF_ONE(1.0, injectionSwitch.y)))))))) {
                                                continue;
                                                {
                                                    int GLF_live11looplimiter0 = 0;
                                                    if (GLF_live11looplimiter0 >= 5) {
                                                        ;
                                                    }
                                                }
                                            }
                                            {
                                                int GLF_live5count = _GLF_FUZZED((~94829));
                                                int GLF_live5v = _GLF_FUZZED(((-99014) + (-35461)));
                                                {
                                                    if ((GLF_live5v & 1) == 1) {
                                                        GLF_live5v = 3 * GLF_live5v + 1;
                                                        {
                                                            float GLF_live9x2 = _GLF_FUZZED(9.4);
                                                            if (GLF_live9x2 <= -0.9 && GLF_live9x2 >= -1.1) {
                                                                GLF_live9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                            } else {
                                                                GLF_live9_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                                            }
                                                        }
                                                    } else {
                                                        GLF_live5v /= 2;
                                                    }
                                                    GLF_live5count++;
                                                }
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            {
                                                vec3 GLF_live8color = _GLF_FUZZED(vec3(4175.1511, -385.993, 541.365));
                                                int GLF_live8count = _GLF_FUZZED(ivec2(-33416, 2044).y);
                                                int GLF_live8looplimiter5 = 0;
                                                {
                                                    if (GLF_live8looplimiter5 >= 6) {
                                                        ;
                                                    }
                                                    GLF_live8looplimiter5++;
                                                    {
                                                        GLF_live8color -= GLF_live8palette(vec3(float(GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live8injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live8injectionSwitch.x, 0.6, float(GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live8injectionSwitch.x), 10)]) * 0.1));
                                                        GLF_live8count++;
                                                    }
                                                }
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            _GLF_color = vec4(97.91, -1892.9609, -4.7, 9343.1073);
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = step(vec4(-8315.5101, -9.4, -5.7, -536.622), vec4(24.34, 619.777, _GLF_IDENTITY(-17.82, min(-17.82, _GLF_IDENTITY(-17.82, float(mat3(-17.82, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, cos(0.0), 1.0))))), -5.1));
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bool(true))))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = ((-91.41) + vec4(-1.7, -49.49, -8.1, -322.710));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                discard;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        {
                                            _GLF_struct_6 _GLF_struct_replacement_6 = _GLF_struct_6(bvec3(true, true, true), _GLF_struct_7(bvec2(true, true), bvec3(true, true, true), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_8(uvec4(1u, 1u, 1u, 1u), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true)), uvec3(1u, 1u, 1u), _GLF_IDENTITY(ivec4(1, 1, _GLF_IDENTITY(1, max(1, 1)), 1), (ivec4(1, 1, _GLF_IDENTITY(1, max(1, 1)), 1)) - ivec4(0, 0, 0, 0)), 0, 1u), bvec4(true, true, true, true), 1u);
                                            {
                                                vec4 GLF_live11c = _GLF_FUZZED((vec4(5.3, -6.3, -8.6, -6.4) * (-648.132)));
                                                int GLF_live11i = _GLF_FUZZED(((ivec4(-91433, 56760, -32956, 55445) != ((-54387) + ivec4(-61167, 9279, -90641, 26513))) ? (-64552) : 49481));
                                                int GLF_live11looplimiter1 = 0;
                                                int GLF_live11msb8 = _GLF_FUZZED(43481);
                                                do {
                                                    if (GLF_live11looplimiter1 >= 5) {
                                                        break;
                                                    }
                                                    GLF_live11looplimiter1++;
                                                    {
                                                        if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                                            GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                                        }
                                                        GLF_live11i++;
                                                    }
                                                } while (GLF_live11i < findMSB(findLSB(GLF_live11msb8)));
                                            }
                                            for (int GLF_live2a = GLF_live2MATRIX_N - 1; GLF_live2a >= _GLF_struct_replacement_45.GLF_live2k; GLF_live2a--) {
                                                if (_GLF_struct_replacement_6._f1.GLF_live2looplimiter3 >= 3) {
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                }
                                                _GLF_struct_replacement_6._f1.GLF_live2looplimiter3++;
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        float GLF_live4th = _GLF_FUZZED((((-14.51) * 4.9) - 1.9));
                                                        {
                                                            GLF_live4th = -GLF_live4th;
                                                        }
                                                    }
                                                    continue;
                                                }
                                                {
                                                    _GLF_struct_replacement_1._f0.GLF_live2matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j, 4)] = _GLF_struct_replacement_1._f0.GLF_live2matrix_a[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live2a, 4), int(ivec4(_GLF_MAKE_IN_BOUNDS_INT(GLF_live2a, 4), ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1))), 1, (0 & (-84417)))))][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j, 4)] - (_GLF_struct_replacement_44.GLF_live2beta * GLF_live2matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2a, 4)]);
                                                }
                                            }
                                        }
                                        GLF_merged2_0_1_15_1_1_15GLF_live2alpha2GLF_live2alpha3.y = 0.0;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                {
                                                    int GLF_live5count = _GLF_FUZZED(-27942);
                                                    int GLF_live5looplimiter0 = 0;
                                                    int GLF_live5v = _GLF_FUZZED(-66034);
                                                    {
                                                        if (GLF_live5looplimiter0 >= 3) {
                                                            ;
                                                        }
                                                        GLF_live5looplimiter0++;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(4.4, -6027.6693, -69.03, 9.8);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        {
                                                            if (_GLF_DEAD(false)) {
                                                                {
                                                                    float GLF_live9A = _GLF_FUZZED(-6.3);
                                                                    float GLF_live9B = _GLF_FUZZED(-74.74);
                                                                    float GLF_live9C = _GLF_FUZZED(-0.6);
                                                                    int GLF_live9looplimiter0 = 0;
                                                                    _GLF_struct_46 _GLF_struct_replacement_46 = _GLF_struct_46(true, _GLF_FUZZED(-9806.5912), bvec2(true, true), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), bvec4(true, true, true, true));
                                                                    float GLF_live9x0 = _GLF_FUZZED(-3.0);
                                                                    float GLF_live9x1 = _GLF_FUZZED((5.6 - (1.0 * 277.923)));
                                                                    float GLF_live9x2 = _GLF_FUZZED(-12.23);
                                                                    while (abs(GLF_live9x2 - GLF_live9x1) >= .000000000000001) {
                                                                        if (GLF_live9looplimiter0 >= 4) {
                                                                            break;
                                                                        }
                                                                        GLF_live9looplimiter0++;
                                                                        {
                                                                            float GLF_live9h0 = GLF_live9x0 - GLF_live9x2;
                                                                            float GLF_live9h1 = GLF_live9x1 - GLF_live9x2;
                                                                            float GLF_live9k0 = GLF_live9fx(GLF_live9x0) - GLF_live9fx(GLF_live9x2);
                                                                            float GLF_live9k1 = GLF_live9fx(GLF_live9x1) - GLF_live9fx(GLF_live9x2);
                                                                            _GLF_struct_replacement_46.GLF_live9temp = GLF_live9x2;
                                                                            GLF_live9A = (((GLF_live9h1) * (GLF_live9k0)) - ((GLF_live9h0) * (GLF_live9k1))) / ((pow((GLF_live9h0), 2.0) * (GLF_live9h1)) - (pow((GLF_live9h1), 2.0) * (GLF_live9h0)));
                                                                            GLF_live9B = (((GLF_live9k0) - (GLF_live9A * (pow((GLF_live9h0), 2.0)))) / (GLF_live9h0));
                                                                            GLF_live9C = GLF_live9fx(GLF_live9x2);
                                                                            GLF_live9x2 = GLF_live9x2 - ((2.0 * GLF_live9C) / (GLF_live9B + sign(GLF_live9B) * sqrt(pow(GLF_live9B, 2.0) - (4.0 * GLF_live9A * GLF_live9C))));
                                                                            GLF_live9x0 = GLF_live9x1;
                                                                            GLF_live9x1 = _GLF_struct_replacement_46.GLF_live9temp;
                                                                        }
                                                                    }
                                                                }
                                                                return;
                                                            }
                                                            if ((GLF_live5v & 1) == 1) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    discard;
                                                                }
                                                                GLF_live5v = 3 * GLF_live5v + 1;
                                                            } else {
                                                                {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                                GLF_live5v /= 2;
                                                            }
                                                            GLF_live5count++;
                                                        }
                                                    }
                                                }
                                                _GLF_color = smoothstep(vec4(7.9, 493.053, -809.411, -4410.1859), _GLF_IDENTITY(vec3(799.332, 3.3, 4.1), (true ? _GLF_IDENTITY(vec3(799.332, 3.3, 4.1), (false ? _GLF_FUZZED(vec3(628.459, 42.92, -7293.1830)) : vec3(799.332, 3.3, 4.1))) : _GLF_FUZZED(vec3(6.3, -4.7, -562.469)))).yyyx, vec4(_GLF_IDENTITY(-410.782, max(-410.782, _GLF_IDENTITY(-410.782, (true ? (-410.782) : _GLF_FUZZED(_GLF_struct_replacement_44.GLF_live2beta))))), -6281.9076, 221.810, 4202.3042));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, vec4(mat2x3(_GLF_outVarBackup_GLF_color, 1.0, sqrt(log(1.0)))));
                                                }
                                            }
                                            break;
                                        }
                                        _GLF_struct_replacement_44.GLF_live2beta = _GLF_IDENTITY(0.0, max(0.0, _GLF_IDENTITY(0.0, mix(float(_GLF_IDENTITY(0.0, (true ? 0.0 : _GLF_FUZZED(GLF_live2alpha3)))), float(_GLF_FUZZED(vec3(893.083, -912.178, 8.6).t)), bool(false)))));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(5.1, -98.74, -941.004, -3.9);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_IDENTITY(i == 7, false || (_GLF_struct_replacement_24.i == 7))) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                {
                                    {
                                        ;
                                    }
                                }
                                _GLF_color = vec4(1855.5546, -2102.1070, -_GLF_IDENTITY(910.261, (false ? _GLF_FUZZED(-172.890) : _GLF_IDENTITY(910.261, max(910.261, 910.261)))), -8.7);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    {
                                        {
                                            float GLF_live10alpha2 = _GLF_FUZZED((+83.26));
                                            float GLF_live10alpha3 = _GLF_FUZZED(vec4(8935.2370, 0.1, 0.2, 9569.5562).y);
                                            float GLF_live10beta = _GLF_FUZZED((89.84 * 8.6));
                                            int GLF_live10k = _GLF_FUZZED(int(true));
                                            int GLF_live10looplimiter4 = 0;
                                            mat4 GLF_live10matrix_a = _GLF_FUZZED(mat4(62.83, 6.1, 9.2, 1075.1479, -32.61, -9.1, -5860.3482, -1.9, 966.801, -4.8, -97.93, -2595.6315, -73.87, -49.64, 5.7, -752.146));
                                            vec4 GLF_live10matrix_u = _GLF_FUZZED((vec4(-876.535, -513.397, 1705.9894, -13.97) * ((-9.4) + (-5.3))));
                                            for (int GLF_live10j = GLF_live10k; GLF_live10j < GLF_live10MATRIX_N; GLF_live10j++) {
                                                if (GLF_live10looplimiter4 >= 4) {
                                                    break;
                                                }
                                                GLF_live10looplimiter4++;
                                                {
                                                    {
                                                        int GLF_live10looplimiter2 = 0;
                                                        for (int GLF_live10a = GLF_live10MATRIX_N - 1; GLF_live10a >= GLF_live10k; GLF_live10a--) {
                                                            if (GLF_live10looplimiter2 >= 4) {
                                                                break;
                                                            }
                                                            GLF_live10looplimiter2++;
                                                            {
                                                                GLF_live10alpha3 += GLF_live10matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10a, 4)] * GLF_live10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 4)];
                                                            }
                                                        }
                                                    }
                                                    GLF_live10beta = GLF_live10alpha2 * GLF_live10alpha3;
                                                    {
                                                        int GLF_live10looplimiter3 = 0;
                                                        for (int GLF_live10a = GLF_live10MATRIX_N - 1; GLF_live10a >= GLF_live10k; GLF_live10a--) {
                                                            if (GLF_live10looplimiter3 >= 4) {
                                                                break;
                                                            }
                                                            GLF_live10looplimiter3++;
                                                            {
                                                                GLF_live10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 4)] = GLF_live10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 4)] - (GLF_live10beta * GLF_live10matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10a, 4)]);
                                                            }
                                                        }
                                                    }
                                                    GLF_live10alpha3 = 0.0;
                                                    GLF_live10beta = 0.0;
                                                }
                                            }
                                        }
                                        {
                                            ;
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                            }
                            obj.prime_numbers[_GLF_struct_replacement_24.i] = 19;
                        } else if (_GLF_struct_replacement_24.i == 8) {
                            obj.prime_numbers[_GLF_struct_replacement_24.i] = _GLF_IDENTITY(23, 1 * (23));
                        } else if (_GLF_struct_replacement_24.i == 9) {
                            {
                                vec2 GLF_live4a = _GLF_FUZZED((true ? vec2(827.795, -18.59) : vec2(-82.22, 96.13)));
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                float GLF_live4z = _GLF_FUZZED(-65.01);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                                    return;
                                }
                                {
                                    float GLF_live9A = _GLF_FUZZED(7398.9801);
                                    float GLF_live9B = _GLF_FUZZED(526.184);
                                    float GLF_live9C = _GLF_FUZZED(vec4(-36.70, -408.636, -1.6, -3.9).r);
                                    int GLF_live9looplimiter0 = 0;
                                    float GLF_live9temp = _GLF_FUZZED(-883.738);
                                    float GLF_live9x0 = _GLF_FUZZED(37.52);
                                    float GLF_live9x1 = _GLF_FUZZED(721.513);
                                    float GLF_live9x2 = _GLF_FUZZED((false ? 605.318 : 2.8));
                                    while (abs(GLF_live9x2 - GLF_live9x1) >= .000000000000001) {
                                        if (GLF_live9looplimiter0 >= 4) {
                                            break;
                                        }
                                        GLF_live9looplimiter0++;
                                        {
                                            float GLF_live9h0 = GLF_live9x0 - GLF_live9x2;
                                            float GLF_live9h1 = GLF_live9x1 - GLF_live9x2;
                                            float GLF_live9k0 = GLF_live9fx(GLF_live9x0) - GLF_live9fx(GLF_live9x2);
                                            float GLF_live9k1 = GLF_live9fx(GLF_live9x1) - GLF_live9fx(GLF_live9x2);
                                            GLF_live9temp = GLF_live9x2;
                                            GLF_live9A = (((GLF_live9h1) * (GLF_live9k0)) - ((GLF_live9h0) * (GLF_live9k1))) / ((pow((GLF_live9h0), 2.0) * (GLF_live9h1)) - (pow((GLF_live9h1), 2.0) * (GLF_live9h0)));
                                            GLF_live9B = (((GLF_live9k0) - (GLF_live9A * (pow((GLF_live9h0), 2.0)))) / (GLF_live9h0));
                                            GLF_live9C = GLF_live9fx(GLF_live9x2);
                                            GLF_live9x2 = GLF_live9x2 - ((2.0 * GLF_live9C) / (GLF_live9B + sign(GLF_live9B) * sqrt(pow(GLF_live9B, 2.0) - (4.0 * GLF_live9A * GLF_live9C))));
                                            GLF_live9x0 = GLF_live9x1;
                                            GLF_live9x1 = GLF_live9temp;
                                        }
                                    }
                                }
                                {
                                    GLF_live4z = GLF_live4a.y / GLF_live4a.x;
                                }
                            }
                            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, _GLF_IDENTITY(injectionSwitch.x, clamp(injectionSwitch.x, injectionSwitch.x, _GLF_IDENTITY(injectionSwitch.x, mix(float(_GLF_FUZZED(-54.01)), float(injectionSwitch.x), bool(true)))))))), !(_GLF_IDENTITY(!(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, _GLF_IDENTITY(injectionSwitch.x, clamp(injectionSwitch.x, injectionSwitch.x, _GLF_IDENTITY(injectionSwitch.x, mix(float(_GLF_FUZZED(-54.01)), float(injectionSwitch.x), bool(true))))))))), !(!(!(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, _GLF_IDENTITY(injectionSwitch.x, clamp(injectionSwitch.x, injectionSwitch.x, _GLF_IDENTITY(injectionSwitch.x, mix(float(_GLF_FUZZED(-54.01)), float(injectionSwitch.x), bool(true)))))))))))))))) {
                                {
                                    int GLF_live7iteration = _GLF_FUZZED(-99316);
                                    float GLF_live7xCoord = _GLF_FUZZED(-6.9);
                                    float GLF_live7yCoord = _GLF_FUZZED(-8.3);
                                    if (GLF_live7iteration < 1000) {
                                        ;
                                    } else {
                                        ;
                                    }
                                }
                                discard;
                            }
                            obj.prime_numbers[_GLF_struct_replacement_24.i] = 29;
                        }
                    }
                }
            }
        }
    }
    {
        _GLF_struct_9 _GLF_struct_replacement_9 = _GLF_struct_9(vec2(1.0, 1.0), _GLF_FUZZED(vec2(4.6, -96.71)));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = atan(vec4(_GLF_IDENTITY(929.234, max(_GLF_IDENTITY(929.234, max(929.234, 929.234)), 929.234)), -682.508, -7.2, 61.88), vec4(-7.2, -4.0, 8.3, -1.8));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (GLF_live3pointInTriangle(_GLF_struct_replacement_9.GLF_live3pos, _GLF_IDENTITY(vec2(0.7, 0.3), mat2(1.0) * (vec2(0.7, 0.3))), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
            GLF_live3_GLF_color = _GLF_IDENTITY(vec4(1.0, _GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(7012.8429)), bool(false))), 0.0, 1.0), (vec4(1.0, _GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(7012.8429)), bool(false))), 0.0, 1.0)) * vec4(1.0, 1.0, 1.0, 1.0));
        } else {
            GLF_live3_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return;
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-0.5, _GLF_IDENTITY(5.8, min(5.8, 5.8)), -95.44, -3.1);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(42.04, -2.8, 1628.5891, 15.18);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            int GLF_live10k = _GLF_FUZZED(((18686) * ivec2(-13294, -37260).s));
                            float GLF_live10magnitudeX = _GLF_FUZZED((617.587 * 7.5));
                            mat4 GLF_live10matrix_a = _GLF_FUZZED(mat4(mat4x3(3784.9446, -41.69, 9755.5119, -6.3, 850.069, 1133.7864, -26.64, 3.8, -9.9, 829.411, -30.15, -8569.1132)));
                            vec4 GLF_live10matrix_u = _GLF_FUZZED((vec2(-5552.5358, -6.0) * mat4x2(403.625, 7440.7005, -58.09, 19.55, -503.127, 2.6, -4.5, -7018.4818)));
                            {
                                int GLF_live10looplimiter0 = 0;
                                for (int GLF_live10x = GLF_live10MATRIX_N - 1; GLF_live10x >= GLF_live10k; GLF_live10x--) {
                                    if (GLF_live10looplimiter0 >= 4) {
                                        break;
                                    }
                                    GLF_live10looplimiter0++;
                                    {
                                        GLF_live10magnitudeX += pow(GLF_live10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k, 4)], 2.0);
                                        GLF_live10matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10x, 4)] = GLF_live10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k, 4)];
                                    }
                                }
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(true), (bool(true)) && true)), bool(bvec3(bool(_GLF_IDENTITY(bool(true), (bool(true)) && true)), true, _GLF_IDENTITY(false, !(!(false))))))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec2(-634.336, -869.529).xxyx;
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_struct_47 _GLF_struct_replacement_47 = _GLF_struct_47(_GLF_struct_48(uvec3(1u, 1u, 1u), true, mat2(1.0, 1.0, 1.0, 1.0)), vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), bvec3(true, true, true), 1.0, _GLF_FUZZED(74669), 1u, uvec4(1u, 1u, 1u, 1u));
        _GLF_struct_49 _GLF_struct_replacement_49 = _GLF_struct_49(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_50(bvec4(true, true, true, true), _GLF_struct_51(vec3(1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), bvec3(true, true, true), 0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), true, bvec4(true, true, true, true)), _GLF_struct_52(ivec4(1, 1, 1, 1), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), uvec2(1u, 1u));
        int GLF_live5v = _GLF_FUZZED(63572);
        while (GLF_live5v > 1) {
            if (_GLF_struct_replacement_49._f1._f1.GLF_live5looplimiter0 >= 3) {
                if (_GLF_DEAD(false)) {
                    continue;
                }
                break;
            }
            _GLF_struct_replacement_49._f1._f1.GLF_live5looplimiter0++;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (1.4 + vec4(-2.0, -516.719, 6.9, -6.0));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                if ((GLF_live5v & 1) == 1) {
                    GLF_live5v = 3 * GLF_live5v + 1;
                } else {
                    GLF_live5v /= 2;
                }
                _GLF_struct_replacement_47.GLF_live5count++;
            }
        }
        {
            float GLF_live10beta = _GLF_FUZZED((vec3(-83.32, 1441.9323, 88.70) * mat3(4.3, 77.01, -9.3, -4.5, -3.4, 791.489, 2362.3463, 39.43, -6475.1610)).p);
            int GLF_live10k = _GLF_FUZZED(((-(-95188)) | 10680));
            int GLF_live10looplimiter6 = 0;
            vec4 GLF_live10matrix_b = _GLF_FUZZED(vec4(1943.7581, 23.48, 2.3, -5774.8950));
            vec4 GLF_live10matrix_u = _GLF_FUZZED(vec4(-8.4, -44.27, -323.105, -3.7));
            for (int GLF_live10b = GLF_live10MATRIX_N - 1; GLF_live10b >= GLF_live10k; GLF_live10b--) {
                if (GLF_live10looplimiter6 >= 4) {
                    break;
                }
                GLF_live10looplimiter6++;
                {
                    GLF_live10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10b, 4)] = GLF_live10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10b, 4)] - (GLF_live10beta * GLF_live10matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10b, 4)]);
                }
            }
        }
    }
    vec2 uv = (gl_FragCoord.xy / resolution.x) * vec2(resolution.x / resolution.y, 1.0);
    {
        int GLF_live5count = _GLF_FUZZED(((-39199) * (-(-27972))));
        int GLF_live5looplimiter0 = 0;
        {
            {
                ;
            }
        }
        _GLF_struct_53 _GLF_struct_replacement_53 = _GLF_struct_53(_GLF_FUZZED(((-14675) ^ 83152)), ivec4(1, 1, 1, 1), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0);
        {
            if (GLF_live5looplimiter0 >= 3) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                ;
            }
            GLF_live5looplimiter0++;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            {
                if ((_GLF_struct_replacement_53.GLF_live5v & 1) == 1) {
                    _GLF_struct_replacement_53.GLF_live5v = 3 * _GLF_struct_replacement_53.GLF_live5v + 1;
                } else {
                    _GLF_struct_replacement_53.GLF_live5v /= 2;
                }
                GLF_live5count++;
            }
            {
                float GLF_live9A = _GLF_FUZZED((+(-6.7)));
                float GLF_live9B = _GLF_FUZZED((9.1 - 7.8));
                float GLF_live9C = _GLF_FUZZED(2.6);
                float GLF_live9temp = _GLF_FUZZED((true ? (-24.86) : (-9.2)));
                float GLF_live9x0 = _GLF_FUZZED(210.831);
                float GLF_live9x1 = _GLF_FUZZED(((-2.5) + (-317.972)));
                float GLF_live9x2 = _GLF_FUZZED(vec2(-4.6, -35.14).t);
                {
                    int GLF_live9looplimiter0 = 0;
                    while (abs(GLF_live9x2 - GLF_live9x1) >= .000000000000001) {
                        if (GLF_live9looplimiter0 >= 4) {
                            break;
                        }
                        GLF_live9looplimiter0++;
                        {
                            float GLF_live9h0 = GLF_live9x0 - GLF_live9x2;
                            float GLF_live9h1 = GLF_live9x1 - GLF_live9x2;
                            float GLF_live9k0 = GLF_live9fx(GLF_live9x0) - GLF_live9fx(GLF_live9x2);
                            float GLF_live9k1 = GLF_live9fx(GLF_live9x1) - GLF_live9fx(GLF_live9x2);
                            GLF_live9temp = GLF_live9x2;
                            GLF_live9A = (((GLF_live9h1) * (GLF_live9k0)) - ((GLF_live9h0) * (GLF_live9k1))) / ((pow((GLF_live9h0), 2.0) * (GLF_live9h1)) - (pow((GLF_live9h1), 2.0) * (GLF_live9h0)));
                            GLF_live9B = (((GLF_live9k0) - (GLF_live9A * (pow((GLF_live9h0), 2.0)))) / (GLF_live9h0));
                            GLF_live9C = GLF_live9fx(GLF_live9x2);
                            GLF_live9x2 = GLF_live9x2 - ((2.0 * GLF_live9C) / (GLF_live9B + sign(GLF_live9B) * sqrt(pow(GLF_live9B, 2.0) - (4.0 * GLF_live9A * GLF_live9C))));
                            GLF_live9x0 = GLF_live9x1;
                            GLF_live9x1 = GLF_live9temp;
                        }
                    }
                }
            }
        }
    }
    vec2 b = brick(uv * 7.0);
    vec3 color = vec3(patternize(b));
    {
        int GLF_live10b = _GLF_FUZZED(94347);
        float GLF_live10beta = _GLF_FUZZED(-5.9);
        int GLF_live10looplimiter6 = 0;
        vec4 GLF_live10matrix_b = _GLF_FUZZED(vec4(-1696.6243, 6.4, -5.7, -0.0));
        vec4 GLF_live10matrix_u = _GLF_FUZZED((vec3(-226.745, 0.1, -79.44) * mat4x3(mat2x3(-1.8, -898.271, -39.77, 6.2, 2181.3871, -8.8))));
        {
            if (GLF_live10looplimiter6 >= 4) {
                ;
            }
            GLF_live10looplimiter6++;
            {
                GLF_live10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10b, 4)] = GLF_live10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10b, 4)] - (GLF_live10beta * GLF_live10matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10b, 4)]);
            }
        }
    }
    if (gl_FragCoord.y < _GLF_IDENTITY(resolution.y, min(_GLF_IDENTITY(resolution.y, mix(float(resolution.y), float(_GLF_FUZZED(float(82448))), bool(false))), resolution.y)) / 1.1) {
        if (binarySearch(obj, obj.prime_numbers[_GLF_IDENTITY(4, (4) ^ 0)]) != -(int(resolution.y)) && binarySearch(obj, obj.prime_numbers[_GLF_IDENTITY(0, (_GLF_IDENTITY(_GLF_IDENTITY(0, clamp(0, 0, 0)), (_GLF_IDENTITY(_GLF_IDENTITY(0, clamp(0, 0, 0)), (_GLF_IDENTITY(0, clamp(0, 0, 0))) | (_GLF_IDENTITY(_GLF_IDENTITY(0, clamp(0, 0, 0)), (false ? _GLF_FUZZED(-7056) : _GLF_IDENTITY(0, clamp(0, 0, 0))))))) >> 0)) ^ 0)]) >= -_GLF_IDENTITY((int(resolution.x)), ~(~((int(resolution.x)))))) {
            color.yz -= dot(_GLF_IDENTITY(float(binarySearch(obj, obj.prime_numbers[4])), (float(binarySearch(obj, obj.prime_numbers[4]))) * determinant(mat2(1.0, 0.0, 0.0, 1.0))), float(binarySearch(obj, obj.prime_numbers[0])));
        } else {
            discard;
        }
    } else {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                return;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(916.156, -55.29, -80.80, 5.8);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                int GLF_live7iteration = _GLF_FUZZED(38126);
                float GLF_live7xCoord = _GLF_FUZZED(float(172966u));
                {
                    _GLF_struct_54 _GLF_struct_replacement_54 = _GLF_struct_54(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_55(_GLF_struct_56(ivec3(1, 1, 1), uvec4(1u, 1u, 1u, 1u)), _GLF_struct_57(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true)), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_58(ivec3(1, 1, 1)), 1.0, uvec4(1u, 1u, 1u, 1u), bvec4(true, true, true, true), vec4(1.0, 1.0, 1.0, 1.0));
                    _GLF_struct_replacement_54._GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (mat4(-1.7, -0.8, 49.05, -5813.6164, -2.0, -9557.8302, -9.5, -3.1, 19.37, -0.6, -3.2, -24.17, -240.528, -7.6, -5.1, -9.2) * vec4(6.8, -9.9, -1.6, -1642.0532));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_struct_replacement_54._GLF_outVarBackup_GLF_color;
                    }
                }
                float GLF_live7yCoord = _GLF_FUZZED(266.752);
                if (GLF_live7iteration < 1000) {
                    ;
                } else {
                    ;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (fwidth(vec4(6.8, 24.83, -6740.8014, -452.140)) - normalize(3.5));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = vec4(-9.2, -504.060, 2663.2066, 9.5);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            {
                int GLF_live5count = _GLF_FUZZED((6849 & 2140));
                int GLF_live5looplimiter0 = 0;
                {
                    int GLF_live8h = _GLF_FUZZED(37731);
                    int GLF_live8i = _GLF_FUZZED(62578);
                    int GLF_live8l = _GLF_FUZZED(-89684);
                    int GLF_live8looplimiter0 = 0;
                    int GLF_live8pivot = _GLF_FUZZED(-66282);
                    for (int GLF_live8j = GLF_live8l; GLF_live8j <= GLF_live8h - 1; GLF_live8j++) {
                        if (GLF_live8looplimiter0 >= 6) {
                            break;
                        }
                        GLF_live8looplimiter0++;
                        {
                            if (GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 10)] <= GLF_live8pivot) {
                                GLF_live8i++;
                                GLF_live8swap(GLF_live8i, GLF_live8j);
                            }
                        }
                    }
                }
                int GLF_live5v = _GLF_FUZZED(-85502);
                {
                    float GLF_live10alpha3 = _GLF_FUZZED(float(ivec2(-6171, -34530).y));
                    int GLF_live10b = _GLF_FUZZED(16774);
                    vec4 GLF_live10matrix_b = _GLF_FUZZED((-((vec4(-35.81, -77.92, 8.0, 7.8)) * mat4(823.823, -7.5, 3.7, -535.962, 982.840, -5856.9676, -73.73, 68.82, -43.94, 309.907, -4.1, -0.9, -3.1, 2662.9807, -5.2, -1.8))));
                    vec4 GLF_live10matrix_u = _GLF_FUZZED(vec4(-166.610, 5.9, -294.795, -5.6));
                    {
                        GLF_live10alpha3 += GLF_live10matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10b, 4)] * GLF_live10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10b, 4)];
                    }
                }
                while (GLF_live5v > 1) {
                    if (GLF_live5looplimiter0 >= 3) {
                        break;
                    }
                    GLF_live5looplimiter0++;
                    {
                        {
                            _GLF_struct_59 _GLF_struct_replacement_59 = _GLF_struct_59(bvec2(true, true), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_60(0, mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_61(_GLF_struct_62(bvec3(true, true, true), 1u, mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), true), _GLF_struct_63(mat2(1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), 1u), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true));
                            if (_GLF_struct_replacement_59._f2.GLF_live10looplimiter5 >= 4) {
                                ;
                            }
                        }
                        if ((GLF_live5v & 1) == 1) {
                            GLF_live5v = 3 * GLF_live5v + 1;
                        } else {
                            GLF_live5v /= 2;
                            {
                                int GLF_live10looplimiter8 = 0;
                                if (GLF_live10looplimiter8 >= 4) {
                                    ;
                                }
                            }
                        }
                        GLF_live5count++;
                    }
                }
            }
        }
        if (binarySearch(obj, _GLF_IDENTITY(1, (1) * 1)) == -1) {
            {
                vec2 GLF_live1coord = _GLF_FUZZED(vec2(-4337.9515, -7.8));
                if (GLF_live1coord.y < 0.6) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            float GLF_live11s = _GLF_FUZZED(1669.3257);
                            {
                                ;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            {
                                ;
                            }
                        }
                        _GLF_IDENTITY(_GLF_color = fwidth(vec3(29.27, 953.102, 6.8)).pttp, vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_color = fwidth(vec3(29.27, 953.102, 6.8)).pttp));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(_GLF_IDENTITY(3.1, float(mat3x4(3.1, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 1.0, 1.0, 1.0, 0.0, 1.0, abs(sqrt(1.0)), 0.0, 0.0))), 6.2, -8.5, _GLF_IDENTITY(-9372.4747, min(-9372.4747, _GLF_IDENTITY(-9372.4747, clamp(_GLF_IDENTITY(-9372.4747, min(-9372.4747, -9372.4747)), -9372.4747, -9372.4747)))));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    uvec2 GLF_live1icoord = uvec2(((GLF_live1coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_live1res1 = uint(((GLF_live1icoord.x * _GLF_IDENTITY(GLF_live1icoord.y, (GLF_live1icoord.y) | (GLF_live1icoord.y))) >> (GLF_live1icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_live1res2 = uint((_GLF_IDENTITY((GLF_live1icoord.x * GLF_live1icoord.y) << (GLF_live1icoord.x & 31u), ~(~((GLF_live1icoord.x * GLF_live1icoord.y) << (GLF_live1icoord.x & _GLF_IDENTITY(31u, ~(_GLF_IDENTITY(~(_GLF_IDENTITY(31u, (31u) << 0u)), min(~(_GLF_IDENTITY(31u, (31u) << 0u)), _GLF_IDENTITY(~(_GLF_IDENTITY(31u, (31u) << 0u)), uint(uvec3(~(_GLF_IDENTITY(31u, (31u) << 0u)), 1u, 0u)))))))))))) & 0xffffffffu);
                    float GLF_live1res = float(((GLF_live1res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live1res1 & 1u) != 0u ? 1u : 0u));
                    GLF_live1_GLF_color = vec4(GLF_live1res, GLF_live1res, GLF_live1res, 1.0);
                } else {
                    _GLF_struct_64 _GLF_struct_replacement_64 = _GLF_struct_64(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2((_GLF_IDENTITY((GLF_live1coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4), ((GLF_live1coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) / vec2(1.0, 1.0))) * 256.0), _GLF_struct_65(bvec4(true, true, true, true), ivec2(1, 1), true, ivec3(1, 1, 1), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_66(mat2(1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), bvec3(true, true, true))));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            vec2 GLF_live4a = _GLF_FUZZED(vec2(5.8, -134.079));
                            float GLF_live4z = _GLF_FUZZED(-2875.6621);
                            {
                                float GLF_live9A = _GLF_FUZZED(-8.7);
                                float GLF_live9B = _GLF_FUZZED(float((bvec3(true, true, true) == bvec3(true, true, true))));
                                float GLF_live9C = _GLF_FUZZED(350.925);
                                int GLF_live9looplimiter0 = 0;
                                float GLF_live9temp = _GLF_FUZZED(((-93.68) * (-1703.7960)));
                                float GLF_live9x0 = _GLF_FUZZED(28.19);
                                float GLF_live9x1 = _GLF_FUZZED(7553.6576);
                                float GLF_live9x2 = _GLF_FUZZED(vec2(2.9, -285.603).y);
                                {
                                    if (GLF_live9looplimiter0 >= 4) {
                                        ;
                                    }
                                    GLF_live9looplimiter0++;
                                    {
                                        float GLF_live9h0 = GLF_live9x0 - GLF_live9x2;
                                        float GLF_live9h1 = GLF_live9x1 - GLF_live9x2;
                                        float GLF_live9k0 = GLF_live9fx(GLF_live9x0) - GLF_live9fx(GLF_live9x2);
                                        float GLF_live9k1 = GLF_live9fx(GLF_live9x1) - GLF_live9fx(GLF_live9x2);
                                        GLF_live9temp = GLF_live9x2;
                                        GLF_live9A = (((GLF_live9h1) * (GLF_live9k0)) - ((GLF_live9h0) * (GLF_live9k1))) / ((pow((GLF_live9h0), 2.0) * (GLF_live9h1)) - (pow((GLF_live9h1), 2.0) * (GLF_live9h0)));
                                        GLF_live9B = (((GLF_live9k0) - (GLF_live9A * (pow((GLF_live9h0), 2.0)))) / (GLF_live9h0));
                                        GLF_live9C = GLF_live9fx(GLF_live9x2);
                                        GLF_live9x2 = GLF_live9x2 - ((2.0 * GLF_live9C) / (GLF_live9B + sign(GLF_live9B) * sqrt(pow(GLF_live9B, 2.0) - (4.0 * GLF_live9A * GLF_live9C))));
                                        GLF_live9x0 = GLF_live9x1;
                                        GLF_live9x1 = GLF_live9temp;
                                    }
                                }
                            }
                            {
                                GLF_live4z = GLF_live4a.x / GLF_live4a.y;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec3(-6138.0847, -2947.5152, -7238.8573).rrrr;
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            return;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = trunc((_GLF_IDENTITY((mat3x4(-219.248, 885.065, 2881.2142, 401.041, 15.28, -2.1, 2215.3328, 80.53, 1.4, 2.3, _GLF_IDENTITY(4235.6397, (_GLF_IDENTITY(4235.6397, min(4235.6397, _GLF_IDENTITY(4235.6397, min(4235.6397, 4235.6397))))) + 0.0), -2.9) / mat3x4(-1.4, 58.77, 164.325, 3.5, 165.602, 0.8, -510.838, -2.6, -5.8, 873.718, 8442.8253, -459.130)) * vec3(-17.14, -766.644, 4.5), mix(vec4(((mat3x4(-219.248, 885.065, 2881.2142, 401.041, 15.28, -2.1, 2215.3328, 80.53, 1.4, 2.3, _GLF_IDENTITY(4235.6397, (_GLF_IDENTITY(4235.6397, min(4235.6397, _GLF_IDENTITY(4235.6397, min(4235.6397, 4235.6397))))) + 0.0), -2.9) / mat3x4(-1.4, 58.77, 164.325, 3.5, 165.602, 0.8, -510.838, -2.6, -5.8, 873.718, 8442.8253, -459.130)) * vec3(-17.14, -766.644, 4.5))[0], _GLF_FUZZED(946.076), ((mat3x4(-219.248, 885.065, 2881.2142, 401.041, 15.28, -2.1, 2215.3328, 80.53, 1.4, 2.3, _GLF_IDENTITY(4235.6397, (_GLF_IDENTITY(4235.6397, min(4235.6397, _GLF_IDENTITY(4235.6397, min(4235.6397, 4235.6397))))) + 0.0), -2.9) / mat3x4(-1.4, 58.77, 164.325, 3.5, 165.602, 0.8, -510.838, -2.6, -5.8, 873.718, 8442.8253, -459.130)) * vec3(-17.14, -766.644, 4.5))[2], _GLF_FUZZED(3.2)), vec4(_GLF_FUZZED(-153.992), ((mat3x4(-219.248, 885.065, 2881.2142, 401.041, 15.28, -2.1, 2215.3328, 80.53, 1.4, 2.3, _GLF_IDENTITY(4235.6397, (_GLF_IDENTITY(4235.6397, min(4235.6397, _GLF_IDENTITY(4235.6397, min(4235.6397, 4235.6397))))) + 0.0), -2.9) / mat3x4(-1.4, 58.77, 164.325, 3.5, 165.602, 0.8, -510.838, -2.6, -5.8, 873.718, 8442.8253, -459.130)) * vec3(-17.14, -766.644, 4.5))[1], _GLF_FUZZED(3.5), ((mat3x4(-219.248, 885.065, 2881.2142, 401.041, 15.28, -2.1, 2215.3328, 80.53, 1.4, 2.3, _GLF_IDENTITY(4235.6397, (_GLF_IDENTITY(4235.6397, min(4235.6397, _GLF_IDENTITY(4235.6397, min(4235.6397, 4235.6397))))) + 0.0), -2.9) / mat3x4(-1.4, 58.77, 164.325, 3.5, 165.602, 0.8, -510.838, -2.6, -5.8, 873.718, 8442.8253, -459.130)) * vec3(-17.14, -766.644, 4.5))[3]), bvec4(false, true, false, true)))));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = log2(vec4(72.67, -_GLF_IDENTITY(3743.9322, (3743.9322) / 1.0), 2.9, -97.99));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_struct_67 _GLF_struct_replacement_67 = _GLF_struct_67(vec2(1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), 1u, ((_GLF_struct_replacement_64.GLF_live1icoord.x >> 5) & 1) ^ ((_GLF_IDENTITY(GLF_live1icoord, clamp(_GLF_struct_replacement_64.GLF_live1icoord, _GLF_IDENTITY(GLF_live1icoord, (false ? _GLF_FUZZED(_GLF_struct_replacement_64.GLF_live1icoord) : _GLF_struct_replacement_64.GLF_live1icoord)), _GLF_IDENTITY(GLF_live1icoord, (_GLF_struct_replacement_64.GLF_live1icoord) / ivec2(1, 1)))).y & 32) >> 5), _GLF_struct_68(_GLF_struct_69(1.0, mat2(1.0, 1.0, 1.0, 1.0)), _GLF_struct_70(bvec2(true, true), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0)), vec4(1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), ivec3(1, 1, 1));
                    int GLF_live1res2 = (_GLF_IDENTITY(GLF_live1icoord, ivec2(_GLF_struct_replacement_64.GLF_live1icoord[0], _GLF_struct_replacement_64.GLF_live1icoord[1])).y * _GLF_struct_replacement_64.GLF_live1icoord.y >> 10) & 1;
                    {
                        {
                            ;
                        }
                    }
                    int GLF_live1res1 = (_GLF_struct_replacement_64.GLF_live1icoord.x * _GLF_struct_replacement_64.GLF_live1icoord.y >> 9) & 1;
                    GLF_live1_GLF_color = vec4(float(_GLF_IDENTITY(GLF_live1res1, int(_GLF_IDENTITY(ivec3(GLF_live1res1, 1, 1), ~(~(ivec3(GLF_live1res1, 1, 1)))))) ^ GLF_live1res2), float(_GLF_IDENTITY(GLF_live1res2 & GLF_live1res3, (GLF_live1res2 & _GLF_struct_replacement_67.GLF_live1res3) / 1)), float(GLF_live1res1 | _GLF_struct_replacement_67.GLF_live1res3), 1.0);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = step(vec4(0.6, -3309.7512, -941.320, -2229.1301), vec4(-753.235, -16.03, -763.040, -462.093));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-75.40, 7.3, 39.17, -6.0);
                        {
                            float GLF_live11s = _GLF_FUZZED((25.78));
                            {
                                ;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        {
                            {
                                ;
                            }
                        }
                        float GLF_live7c_im = _GLF_FUZZED((14.56 + (true ? (-30.92) : (737.424))));
                        float GLF_live7c_re = _GLF_FUZZED(53.10);
                        int GLF_live7iteration = _GLF_FUZZED(int(true));
                        {
                            {
                                ;
                            }
                        }
                        int GLF_live7looplimiter0 = 0;
                        float GLF_live7x = _GLF_FUZZED(-10.46);
                        float GLF_live7y = _GLF_FUZZED((+(-74.92)));
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = dFdy((vec4(1.5, -9.5, -8.4, -2468.0693) * vec4(9874.1686, 9.3, 1.3, -0.3)));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (GLF_live7looplimiter0 >= 6) {
                                ;
                            }
                            GLF_live7looplimiter0++;
                            {
                                if (GLF_live7x * GLF_live7x + GLF_live7y * GLF_live7y > 4.0) {
                                    ;
                                }
                                float GLF_live7x_new = GLF_live7x * GLF_live7x - GLF_live7y * GLF_live7y + GLF_live7c_re;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                }
                                GLF_live7y = 2.0 * GLF_live7x * GLF_live7y + GLF_live7c_im;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec2(566.261, -9.2).rgrg;
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                GLF_live7x = GLF_live7x_new;
                                GLF_live7iteration++;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return;
                    }
                    return;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            discard;
        } else {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (mix(vec4(4.8, _GLF_IDENTITY(8.4, max(8.4, 8.4)), -4.9, -1.7), vec4(197.366, -81.41, 6.5, 7853.4355), 5.7) + (7.9 * vec4(-8816.1031, -7.0, 59.78, 17.77)));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_IDENTITY(color.yz += _GLF_IDENTITY(color, (color) * mat3(1.0)).yz, (false ? _GLF_FUZZED(injectionSwitch) : (color.yz += _GLF_IDENTITY(color, (color) * mat3(1.0)).yz)));
        }
    }
    _GLF_color = vec4(_GLF_IDENTITY(color, (_GLF_TRUE(true, _GLF_IDENTITY((injectionSwitch.x < injectionSwitch.y), !(!((injectionSwitch.x < injectionSwitch.y))))) ? _GLF_IDENTITY(color, vec3(mat3x4(color, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0))) : _GLF_FUZZED(step(vec3(-5.2, -3.4, -0.0), vec3(443.353, -678.093, 53.74))))), injectionSwitch.y);
}
