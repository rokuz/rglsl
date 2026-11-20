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
vec4 GLF_dead13gl_FragCoord = _GLF_FUZZED(vec4(7786.5746, -6207.6850, -4.8, -5498.3587));

layout(set = 0, binding = 1) uniform buf1 {
    vec2 GLF_dead13injectionSwitch;
};

const int GLF_dead13N = 10;
int GLF_dead13data[10] = int[10](_GLF_FUZZED((true ? int(174385u) : (-43607))), _GLF_FUZZED(int(183947u)), _GLF_FUZZED((((-96656) * 6040) * (true ? 35418 : (-22738)))), _GLF_FUZZED(51451), _GLF_FUZZED(int(3677u)), _GLF_FUZZED(-22478), _GLF_FUZZED(99905), _GLF_FUZZED(((-65717) ^ ivec3(-79295, -99803, -98160).z)), _GLF_FUZZED((-(79536 + (-36092)))), _GLF_FUZZED((70776))), GLF_dead13temp[10] = int[10](_GLF_FUZZED(-23804), _GLF_FUZZED(-9565), _GLF_FUZZED(ivec3(76013, 73045, 66548).y), _GLF_FUZZED(-97230), _GLF_FUZZED((56875 & 57302)), _GLF_FUZZED(ivec3(85013).x), _GLF_FUZZED(-18083), _GLF_FUZZED((((-44688) & (-29411)) * (-58258))), _GLF_FUZZED(int(105998u)), _GLF_FUZZED(-68633));

void GLF_dead13merge(int GLF_dead13from, int GLF_dead13mid, int GLF_dead13to) {
    int GLF_dead13k = GLF_dead13from, GLF_dead13i = GLF_dead13from, GLF_dead13j = GLF_dead13mid + 1;
    while (GLF_dead13i <= GLF_dead13mid && GLF_dead13j <= GLF_dead13to) {
        if (GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)] < GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 10)]) {
            GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i++, 10)];
        } else {
            GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j++, 10)];
        }
    }
    while (GLF_dead13i < GLF_dead13N && GLF_dead13i <= GLF_dead13mid) {
        GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i++, 10)];
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        for (int GLF_dead13i = GLF_dead13from; GLF_dead13i <= GLF_dead13to; GLF_dead13i++) {
            GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)] = GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)];
        }
    } else {
    }
}

vec4 GLF_dead12_GLF_color = _GLF_FUZZED((+vec2(-0.1, 6467.7084)).grgg);

struct _GLF_struct_7 {
    mat3x2 _f0;
    mat2x4 _f1;
    vec2 _f2;
};

struct _GLF_struct_6 {
    vec3 _f0;
    bool _f1;
};

struct _GLF_struct_5 {
    uvec2 _f0;
    _GLF_struct_6 _f1;
    float _f2;
    _GLF_struct_7 _f3;
    mat3 _f4;
    uvec4 _f5;
};

struct _GLF_struct_4 {
    uvec2 _f0;
};

struct _GLF_struct_3 {
    float c_re;
    mat2x3 _f0;
    _GLF_struct_4 _f1;
    uvec4 _f2;
    vec4 _f3;
    _GLF_struct_5 _f4;
};

struct _GLF_struct_9 {
    mat4x2 _f0;
    int GLF_live7i;
    int _f1;
};

struct _GLF_struct_8 {
    bvec4 _f0;
    uvec4 _f1;
    _GLF_struct_9 _f2;
};

struct _GLF_struct_10 {
    mat3x2 _f0;
    vec3 sum;
    mat2 _f1;
    uvec2 _f2;
    uvec4 _f3;
};

struct _GLF_struct_13 {
    mat2 _f0;
    int donor_replacementGLF_dead2iters;
};

struct _GLF_struct_12 {
    mat2x4 _f0;
    int _f1;
    mat3x4 _f2;
    vec2 _f3;
    _GLF_struct_13 _f4;
    int _f5;
};

struct _GLF_struct_11 {
    mat2x3 _f0;
    _GLF_struct_12 _f1;
};

layout(set = 0, binding = 2) uniform buf2 {
    float GLF_live6one;
};

mat2 GLF_live6m22 = _GLF_FUZZED((mat2(_GLF_IDENTITY(2.4, max(2.4, _GLF_IDENTITY(2.4, (_GLF_IDENTITY(2.4, mix(float(_GLF_FUZZED(88.53)), float(2.4), bool(true)))) / 1.0))), 643.637, 2.2, 2930.0144) - 7043.4754));
mat2x3 GLF_live6m23 = _GLF_FUZZED(mat2x3(-0.7, -5.3, 82.47, -7.2, 398.836, 228.522));
mat2x4 GLF_live6m24 = _GLF_FUZZED(mat2x4(3543.6651, 4438.6061, 7.6, -8.0, -9197.4778, -0.0, 6639.0568, 3.5));
mat3x2 GLF_live6m32 = _GLF_FUZZED(mat3x2(-8.6, -7104.8333, -6.4, -3.7, 7.1, -6778.2529));
mat3 GLF_live6m33 = _GLF_FUZZED(mat3(mat4x2(-85.11, -1.0, -1.1, -67.92, 8.0, -775.084, _GLF_IDENTITY(-5.6, 0.0 + (_GLF_IDENTITY(-5.6, max(-5.6, _GLF_IDENTITY(-5.6, mix(float(_GLF_FUZZED(0.5)), float(-5.6), bool(true))))))), 2.0)));
mat3x4 GLF_live6m34 = _GLF_FUZZED(mat3x4(vec4(-4.6, -356.949, 4731.8090, -6.4), vec4(6.0, -30.47, 2372.9793, 4.5), _GLF_IDENTITY(vec4(793.166, 200.370, -137.947, 688.145), clamp(vec4(793.166, 200.370, -137.947, 688.145), vec4(793.166, 200.370, -137.947, 688.145), _GLF_IDENTITY(vec4(793.166, 200.370, -137.947, 688.145), (vec4(793.166, 200.370, -137.947, 688.145)) - vec4(0.0, 0.0, 0.0, 0.0))))));
mat4x2 GLF_live6m42 = _GLF_FUZZED(mat4x2(-7741.1890));
mat4x3 GLF_live6m43 = _GLF_FUZZED((_GLF_IDENTITY(false, (false) || false) ? mat4x3(2273.9229, 78.39, -8.2, -50.32, -4.1, -819.227, 4954.7553, 862.698, -0.6, -3.6, 4.4, -64.77) : mat4x3(-9.6, -31.15, -4835.5800, 1104.4925, -6688.4719, 3.1, 607.562, -8.2, 105.662, -9330.3971, _GLF_IDENTITY(-214.583, (true ? _GLF_IDENTITY(-214.583, max(-214.583, -214.583)) : _GLF_FUZZED(6906.2270))), -5.6)));
mat4 GLF_live6m44 = _GLF_FUZZED(mat4(519.546, 2.3, -25.08, -97.90, -57.78, 276.770, -95.43, -1377.7175, -5.2, -7.0, 21.47, -563.568, -4291.6107, -0.6, -4.2, 4983.9852));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_live7injectionSwitch;
};

struct GLF_live7QuicksortObject {
    int numbers[10];
};

GLF_live7QuicksortObject GLF_live7obj = GLF_live7QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

struct _GLF_struct_2 {
    mat2x3 _f0;
};

struct _GLF_struct_1 {
    _GLF_struct_2 _f0;
    float c_im;
};

struct _GLF_struct_0 {
    bool _f0;
    _GLF_struct_1 _f1;
    uvec3 _f2;
    mat4x2 _f3;
    mat2x4 _f4;
    mat2x4 _f5;
};

layout(set = 0, binding = 4) uniform buf4 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 5) uniform sampler2D GLF_dead5tex;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

vec3 pickColor(int i) {
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(40.67, -40.44, 0.3, 32.04);
    }
    return vec3(_GLF_IDENTITY(float(i), _GLF_IDENTITY(float(mat4x2(float(i), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), clamp(float(mat4x2(float(i), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), float(mat4x2(float(i), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), _GLF_IDENTITY(float(mat4x2(float(i), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), max(float(mat4x2(float(i), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), float(mat4x2(float(i), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))))))) / 50.0, _GLF_IDENTITY(float(i), min(_GLF_IDENTITY(float(i), 0.0 + (_GLF_IDENTITY(float(i), (float(i)) + 0.0))), float(i))) / 120.0, float(i) / 140.0);
}

vec3 mand(float xCoord, float yCoord) {
    float height = resolution.y;
    float width = resolution.x;
    float xpos = xCoord * 0.1 + (resolution.x * 0.6);
    float ypos = yCoord * 0.1 + (resolution.y * 0.4);
    _GLF_struct_3 _GLF_struct_replacement_3 = _GLF_struct_3(_GLF_IDENTITY(0.8 * (xpos - width / 2.0) * _GLF_IDENTITY(4.0, determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0)) + (4.0)) / width - 0.4, (true ? (0.8 * (xpos - width / 2.0) * _GLF_IDENTITY(4.0, determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0)) + (4.0)) / width - 0.4) : _GLF_FUZZED(width))), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_4(uvec2(1u, 1u)), uvec4(1u, 1u, 1u, 1u), vec4(1.0, 1.0, 1.0, 1.0), _GLF_struct_5(uvec2(1u, 1u), _GLF_struct_6(vec3(1.0, 1.0, 1.0), true), 1.0, _GLF_struct_7(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0)), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u)));
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(76.73, -61.99, 72.43, -3.0);
    }
    _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(true, _GLF_struct_1(_GLF_struct_2(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), 0.8 * (ypos - height / 2.0) * 4.0 / width), uvec3(1u, 1u, 1u), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, (true ? 1.0 : _GLF_FUZZED(acos(yCoord)))), 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
    float x = 0.0, y = 0.0;
    {
        int GLF_live6cols = _GLF_FUZZED(ivec2(-56753, 39494).tt.t);
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-964.289, 8636.4303, -108.196, 9.4);
        }
        uint GLF_live6matrix_number = _GLF_FUZZED(57330u);
        {
            {
                int GLF_live6looplimiter2 = 0;
                for (int GLF_live6rows = 2; GLF_live6rows <= 4; GLF_live6rows++) {
                    if (GLF_live6looplimiter2 >= 6) {
                        break;
                    }
                    GLF_live6looplimiter2++;
                    {
                        do {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = GLF_dead12_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = GLF_dead13gl_FragCoord;
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, !(!(false)))) || false)));
                        {
                            int GLF_live6looplimiter1 = 0;
                            for (int GLF_live6c = 0; GLF_live6c < _GLF_IDENTITY(GLF_live6cols, ~(_GLF_IDENTITY(~(_GLF_IDENTITY(GLF_live6cols, (GLF_live6cols) - (0 | 0))), (~(_GLF_IDENTITY(GLF_live6cols, (GLF_live6cols) - (0 | 0)))) + 0))); GLF_live6c++) {
                                if (GLF_live6looplimiter1 >= 6) {
                                    break;
                                }
                                GLF_live6looplimiter1++;
                                {
                                    {
                                        int GLF_live6looplimiter0 = 0;
                                        for (int GLF_live6r = 0; GLF_live6r < GLF_live6rows; GLF_live6r++) {
                                            if (GLF_live6looplimiter0 >= 6) {
                                                break;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_dead13gl_FragCoord;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-8024.4576, -397.468, -7.0, -2.1);
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_dead12_GLF_color;
                                                }
                                            } else {
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                    GLF_live6looplimiter0++;
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = (width * vec4(4.5, -21.75, 7.7, 8.3));
                                                }
                                                switch (GLF_live6matrix_number) {
                                                    case 0u:
                                                        GLF_live6m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 2)] = GLF_live6one;
                                                        break;
                                                    case 1u:
                                                        GLF_live6m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 3)] = GLF_live6one;
                                                        break;
                                                    case 2u:
                                                        GLF_live6m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 4)] = GLF_live6one;
                                                        break;
                                                    case 3u:
                                                        GLF_live6m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 2)] = GLF_live6one;
                                                        break;
                                                    case 4u:
                                                        GLF_live6m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 3)] = GLF_live6one;
                                                        do {
                                                            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                                _GLF_color = degrees(_GLF_color);
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                        break;
                                                    case 5u:
                                                        GLF_live6m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 4)] = GLF_live6one;
                                                        break;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = GLF_dead12_GLF_color;
                                                        }
                                                    case 6u:
                                                        for (int _injected_loop_counter = ((0 ^ 0) >> _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                            GLF_live6m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 2)] = GLF_live6one;
                                                        }
                                                        break;
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        } else {
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = min(unpackSnorm4x8(193983u), GLF_dead12_GLF_color);
                                                                }
                                                                vec3 donor_replacementGLF_dead10c = _GLF_FUZZED(smoothstep(x, x, (vec3(-447.177, -3.0, -6948.5684) * asinh(GLF_live6one))));
                                                                int donor_replacementGLF_dead10i = _GLF_FUZZED(findLSB(GLF_live6cols));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                            _GLF_color = vec4(330.497, -1867.7596, -2133.6394, 274.402);
                                                                        }
                                                                    }
                                                                } else {
                                                                }
                                                                {
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        donor_replacementGLF_dead10c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 3)] = donor_replacementGLF_dead10c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 3)] * donor_replacementGLF_dead10c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 3)];
                                                                    } else {
                                                                    }
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = GLF_dead12_GLF_color;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    case 7u:
                                                        do {
                                                            if (_GLF_DEAD(false)) {
                                                                vec2 donor_replacementGLF_dead12coord = _GLF_FUZZED(GLF_live7injectionSwitch);
                                                                {
                                                                    ivec2 GLF_dead12icoord = ivec2(((donor_replacementGLF_dead12coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                                    int GLF_dead12v = (GLF_dead12icoord.x ^ GLF_dead12icoord.y) * GLF_dead12icoord.y;
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = degrees(asinh(GLF_dead13gl_FragCoord));
                                                                    }
                                                                    bool GLF_dead12res1 = ((GLF_dead12v >> 10) & 1) != 0;
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                        } else {
                                                                            _GLF_color = degrees(inversesqrt(GLF_dead12_GLF_color));
                                                                        }
                                                                    }
                                                                    if (_GLF_DEAD(false)) {
                                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bvec2(false, false), bvec2(bvec3(bvec2(false, false), true))))))) {
                                                                            _GLF_color = vec4(764.109, -5.7, 8.5, -1462.4557);
                                                                        }
                                                                        _GLF_color = vec4(fma(dFdyCoarse(xCoord), x, x), xpos, uintBitsToFloat(uvec2(195857u, 42535u)));
                                                                    }
                                                                    bool GLF_dead12res2 = ((GLF_dead12v >> 11) & 4) != 0;
                                                                    bool GLF_dead12res3 = ((GLF_dead12v >> 12) & 8) != 0;
                                                                    GLF_dead12_GLF_color = vec4(GLF_dead12res1 ? 1.0 : 0.0, GLF_dead12res2 ? 1.0 : 0.0, GLF_dead12res3 ? 1.0 : 0.0, 1);
                                                                }
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                        GLF_live6m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 3)] = GLF_live6one;
                                                        break;
                                                    case 8u:
                                                        GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 4)] = GLF_live6one;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = vec4(612.699, -9747.6081, 0.2, 7318.9992);
                                                        }
                                                        break;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_dead13gl_FragCoord;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            vec2 donor_replacementGLF_dead13color = _GLF_FUZZED(smoothstep(log(height), ypos, injectionSwitch));
                                            vec3 donor_replacementGLF_dead13vecCoor = _GLF_FUZZED(vec3(ypos));
                                            do {
                                                if (int(GLF_dead13gl_FragCoord[1]) < 30) {
                                                    donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[0]))));
                                                    donor_replacementGLF_dead13color[0] = dFdy(GLF_dead13gl_FragCoord.y);
                                                    break;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & 1)); _injected_loop_counter++) {
                                                            _GLF_color = GLF_dead13gl_FragCoord;
                                                        }
                                                    }
                                                } else if (int(GLF_dead13gl_FragCoord[1]) < 60) {
                                                    donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[1]))));
                                                    donor_replacementGLF_dead13color[1] *= atan(faceforward(GLF_dead13injectionSwitch, donor_replacementGLF_dead13color.xx, donor_replacementGLF_dead13vecCoor.yx).y);
                                                    break;
                                                } else if (int(GLF_dead13gl_FragCoord[1]) < 90) {
                                                    donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[2]))));
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(-2491.4237, 628.736, 5.1, -3.8);
                                                    }
                                                    donor_replacementGLF_dead13color.x += atanh(donor_replacementGLF_dead13color.x) * cosh(GLF_dead13injectionSwitch.y) * smoothstep(donor_replacementGLF_dead13color, GLF_dead13injectionSwitch, GLF_dead13gl_FragCoord.yy).x;
                                                    break;
                                                } else if (int(GLF_dead13gl_FragCoord[1]) < 120) {
                                                    donor_replacementGLF_dead13color = fract(acosh(clamp(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[3])), 1.0, 1000.0)));
                                                    donor_replacementGLF_dead13color.x += (isnan(GLF_dead13gl_FragCoord.x) ? log2(GLF_dead13gl_FragCoord.x) : log2(GLF_dead13gl_FragCoord.y));
                                                    break;
                                                } else if (int(GLF_dead13gl_FragCoord[1]) < 150) {
                                                    discard;
                                                } else if (int(GLF_dead13gl_FragCoord[1]) < 180) {
                                                    donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[4]))));
                                                    donor_replacementGLF_dead13color[1] += asinh(GLF_dead13gl_FragCoord.y * ldexp(donor_replacementGLF_dead13color.y, -GLF_live6c));
                                                    break;
                                                } else if (int(GLF_dead13gl_FragCoord[1]) < 210) {
                                                    donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[5]))));
                                                    donor_replacementGLF_dead13color.y -= tanh(donor_replacementGLF_dead13color.x) / cosh(donor_replacementGLF_dead13color.y);
                                                    break;
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = GLF_dead12_GLF_color;
                                                        }
                                                    }
                                                } else if (int(GLF_dead13gl_FragCoord[1]) < 240) {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        donor_replacementGLF_dead13color = fract(asinh(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[6]))));
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = mod(mix(_GLF_color, GLF_dead12_GLF_color, inversesqrt(height)), (GLF_live6m34 * donor_replacementGLF_dead13vecCoor));
                                                            } else {
                                                            }
                                                        } else {
                                                        }
                                                    }
                                                    donor_replacementGLF_dead13color.y -= isnan(float(GLF_live6c)) ? tanh(GLF_dead13gl_FragCoord.x) : atanh(GLF_dead13gl_FragCoord.y);
                                                    break;
                                                } else if (int(GLF_dead13gl_FragCoord[1]) < 270) {
                                                    donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[7]))));
                                                    donor_replacementGLF_dead13color.y *= mix(normalize(donor_replacementGLF_dead13vecCoor), normalize(vec3(donor_replacementGLF_dead13color, degrees(donor_replacementGLF_dead13color.x))), GLF_dead13injectionSwitch.x).y;
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = (GLF_dead12_GLF_color * GLF_live6m44);
                                                    }
                                                } else {
                                                    discard;
                                                }
                                            } while (0 == int(GLF_dead13injectionSwitch.x));
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            GLF_live6matrix_number = GLF_live6matrix_number + 1u;
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead10result = _GLF_FUZZED(y);
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead13gl_FragCoord;
                }
                donor_replacementGLF_dead10result += 0.4;
            }
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))) && true))) {
                _GLF_color = GLF_dead12_GLF_color;
            }
        }
    }
    int iteration = 0;
    for (int k = 0; _GLF_IDENTITY(k, (k) << 0) < 1000; k++) {
        if (x * x + y * y > 4.0) {
            {
                int GLF_live1count = _GLF_FUZZED((ivec3(-17866, 26331, 20411) ^ ivec3(_GLF_IDENTITY(-17840, int(ivec2(-17840, 0))), -1464, -_GLF_IDENTITY(80716, ~(~(80716))))).b);
                if (_GLF_DEAD(false)) {
                    _GLF_color = (vec4(978.091, -2.9, 2.7, -83.02) * vec4(-978.713, 59.16, -0.8, 25.73));
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead2v = _GLF_FUZZED(iteration);
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            _GLF_color = GLF_dead13gl_FragCoord;
                        }
                    }
                    {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            donor_replacementGLF_dead2v = (4 * donor_replacementGLF_dead2v * (1000 - donor_replacementGLF_dead2v)) / 1000;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                                int GLF_live7looplimiter2 = 0;
                                for (_GLF_struct_8 _GLF_struct_replacement_8 = _GLF_struct_8(bvec4(true, true, true, true), uvec4(1u, 1u, 1u, 1u), _GLF_struct_9(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), int(GLF_live7injectionSwitch.x), 1)); _GLF_struct_replacement_8._f2.GLF_live7i < 10; _GLF_struct_replacement_8._f2.GLF_live7i++) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    if (GLF_live7looplimiter2 >= 6) {
                                        break;
                                    }
                                    GLF_live7looplimiter2++;
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                            int donor_replacementGLF_dead13high = _GLF_FUZZED(GLF_live7looplimiter2);
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = (atanh(atanh(vec4(-0.4, -917.984, 446.360, 264.562))) / vec4(21.86, -3949.3340, 1088.7113, -0.9));
                                            }
                                            int donor_replacementGLF_dead13low = _GLF_FUZZED(max(-91271, donor_replacementGLF_dead2v));
                                            for (int GLF_dead13m = 1; GLF_dead13m <= donor_replacementGLF_dead13high; GLF_dead13m = 2 * GLF_dead13m) {
                                                for (int GLF_dead13i = donor_replacementGLF_dead13low; GLF_dead13i < donor_replacementGLF_dead13high; GLF_dead13i += 2 * GLF_dead13m) {
                                                    int GLF_dead13from = GLF_dead13i;
                                                    int GLF_dead13mid = GLF_dead13i + GLF_dead13m - 1;
                                                    int GLF_dead13to = min(GLF_dead13i + 2 * GLF_dead13m - 1, donor_replacementGLF_dead13high);
                                                    GLF_dead13merge(GLF_dead13from, GLF_dead13mid, GLF_dead13to);
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = log2(fwidthFine(GLF_dead13gl_FragCoord));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            } else {
                                                                _GLF_color = max(GLF_dead12_GLF_color, _GLF_color);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = GLF_live6m34[0];
                                        } else {
                                        }
                                    }
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(length(vec3(0.0, 0.0, 0.0))))))) {
                                            _GLF_color = GLF_dead13gl_FragCoord;
                                        }
                                        GLF_live7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_8._f2.GLF_live7i, 10)] = _GLF_IDENTITY((10 - _GLF_struct_replacement_8._f2.GLF_live7i), ((10 - _GLF_struct_replacement_8._f2.GLF_live7i)) | 0) * int(GLF_live7injectionSwitch.y);
                                    }
                                }
                            }
                        } else {
                        }
                    }
                    do {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = step(_GLF_color, _GLF_color);
                            } else {
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                    _GLF_color = _GLF_color;
                                }
                                _GLF_color = smoothstep(x, length(vec3(-3.6, -963.013, -32.44)), vec4(yCoord, y, resolution));
                            }
                            int donor_replacementGLF_dead10i = _GLF_FUZZED(iteration);
                            float donor_replacementGLF_dead10limit = _GLF_FUZZED(xCoord);
                            float donor_replacementGLF_dead10result = _GLF_FUZZED(ypos);
                            float donor_replacementGLF_dead10thirty_two = _GLF_FUZZED(height);
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead12_GLF_color;
                                }
                                if ((donor_replacementGLF_dead10i % 32) == 0) {
                                    donor_replacementGLF_dead10result += 0.4;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = mat3x4(9.9, 7.0, -8.6, -67.05, 5.8, 4919.1763, 0.1, -0.7, -636.349, 3.8, -58.32, 5.5)[2];
                                    }
                                } else {
                                    if (mod(float(donor_replacementGLF_dead10i), round(donor_replacementGLF_dead10thirty_two)) <= 0.01) {
                                        donor_replacementGLF_dead10result += 100.0;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                } else {
                                    if (float(donor_replacementGLF_dead10i) >= donor_replacementGLF_dead10limit) {
                                        ;
                                    }
                                }
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0)))));
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = abs(GLF_dead13gl_FragCoord);
                }
                int GLF_live1looplimiter0 = 0;
                int GLF_live1v = _GLF_FUZZED(43480);
                while (GLF_live1v > 1) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (GLF_live6m24 * injectionSwitch);
                    }
                    if (GLF_live1looplimiter0 >= 7) {
                        break;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = asinh(vec4(8.8, -1.2, 1.9, 4.4));
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        vec2 donor_replacementGLF_dead12coord = _GLF_FUZZED((mat3x4(vec4(6.5, -904.481, 0.4, -4.6), vec4(8.0, 39.38, 0.3, -5.6), vec4(577.840, -621.749, -889.453, -188.952)), vec2(53.01, -0.5)));
                        {
                            if (donor_replacementGLF_dead12coord.y < 0.6) {
                                uvec2 GLF_dead12icoord = uvec2(((donor_replacementGLF_dead12coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_dead12res1 = uint(((GLF_dead12icoord.x * GLF_dead12icoord.y) >> (GLF_dead12icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_dead12res2 = uint(((GLF_dead12icoord.x * GLF_dead12icoord.y) << (GLF_dead12icoord.x & 31u)) & 0xffffffffu);
                                float GLF_dead12res = float(((GLF_dead12res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead12res1 & 1u) != 0u ? 1u : 0u));
                                GLF_dead12_GLF_color = vec4(GLF_dead12res, GLF_dead12res, GLF_dead12res, 1.0);
                            } else {
                                ivec2 GLF_dead12icoord = ivec2(((donor_replacementGLF_dead12coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_dead12res3 = ((GLF_dead12icoord.x >> 5) & 1) ^ ((GLF_dead12icoord.y & 32) >> 5);
                                int GLF_dead12res2 = (GLF_dead12icoord.y * GLF_dead12icoord.y >> 10) & 1;
                                int GLF_dead12res1 = (GLF_dead12icoord.x * GLF_dead12icoord.y >> 9) & 1;
                                GLF_dead12_GLF_color = vec4(float(GLF_dead12res1 ^ GLF_dead12res2), float(GLF_dead12res2 & GLF_dead12res3), float(GLF_dead12res1 | GLF_dead12res3), 1.0);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = pow(smoothstep(vec4(-707.639, -8150.8484, 3.9, -7302.6976), vec4(-6.7, -73.74, 7.6, 4489.0463), _GLF_color), GLF_dead13gl_FragCoord);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_dead13gl_FragCoord;
                                        }
                                    } else {
                                    }
                                }
                            }
                        }
                    }
                    GLF_live1looplimiter0++;
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 1.0, 0.0, 0.0)))))) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) || false))) {
                                _GLF_color = (vec4(-7316.6902, -7.1, 30.34, -6087.7215) * step(GLF_dead12_GLF_color, _GLF_color));
                            } else {
                            }
                        }
                        if ((GLF_live1v & 1) == 1) {
                            GLF_live1v = _GLF_IDENTITY(3 * GLF_live1v, clamp(3 * GLF_live1v, _GLF_IDENTITY(3 * GLF_live1v, ~(~(3 * GLF_live1v))), 3 * GLF_live1v)) + 1;
                            for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0))))))) {
                                        vec3 donor_replacementGLF_dead10c = _GLF_FUZZED((true ? vec3(-260.144, 71.91, -565.591) : vec3(793.671, -678.749, -58.27)));
                                        int donor_replacementGLF_dead10i = _GLF_FUZZED(int(xCoord));
                                        {
                                            if (donor_replacementGLF_dead10c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 3)] >= 1.0) {
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ZERO(0.0, injectionSwitch.x)) >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter--) {
                                                    donor_replacementGLF_dead10c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 3)] = donor_replacementGLF_dead10c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 3)] * donor_replacementGLF_dead10c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 3)];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            GLF_live1v /= 2;
                            {
                                int GLF_live8i = _GLF_FUZZED(-31146);
                                int GLF_live8iters = _GLF_FUZZED((18460 + (-17725)));
                                int GLF_live8looplimiter0 = 0;
                                int GLF_live8v = _GLF_FUZZED((59791));
                                for (GLF_live8i = 0; GLF_live8i < GLF_live8iters; GLF_live8i++) {
                                    if (GLF_live8looplimiter0 >= 6) {
                                        break;
                                    }
                                    GLF_live8looplimiter0++;
                                    {
                                        GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0)), 1.0, 0.0), vec3(1.0, 0.0, cos(0.0))), dot(vec3(determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0)), 1.0, 0.0), vec3(1.0, 0.0, cos(0.0)))))))) {
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = GLF_dead13gl_FragCoord;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_dead12_GLF_color;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = (vec4(91.73, 1304.5990, 374.156, 823.149) / _GLF_color);
                                    }
                                } else {
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = fwidth((height * mat3x4(18.92, 63.81, -9.0, 7.1, 959.320, -8660.8928, 1423.6578, -7317.6763, -728.434, -5104.0524, 1945.8861, 4579.7959))[0]);
                                        }
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                            _GLF_color = step(xCoord, GLF_dead12_GLF_color);
                                        }
                                    }
                                }
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec2 donor_replacementGLF_dead12coord = _GLF_FUZZED(GLF_live7injectionSwitch);
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            uvec2 GLF_dead12icoord = uvec2(((donor_replacementGLF_dead12coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_dead12res1 = uint(((GLF_dead12icoord.x * GLF_dead12icoord.y) >> (GLF_dead12icoord.x & 31u)) & 0xffffffffu);
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(xCoord, vec3(-8.4, 978.331, -9.4));
                                            }
                                            uint GLF_dead12res2 = uint(((GLF_dead12icoord.x * GLF_dead12icoord.y) << (GLF_dead12icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_dead12res = float(((GLF_dead12res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead12res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_dead12_GLF_color = vec4(GLF_dead12res, GLF_dead12res, GLF_dead12res, 1.0);
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            GLF_live1count++;
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    int donor_replacementGLF_dead13high = _GLF_FUZZED((iteration - GLF_live1looplimiter0));
                                    int donor_replacementGLF_dead13low = _GLF_FUZZED(((-7635) ^ (GLF_live1count - 76918)));
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (xCoord / exp(vec4(50.33, 5.9, 5.7, 5737.3196)));
                                    }
                                    int donor_replacementGLF_dead13m = _GLF_FUZZED((true ? ivec4(82240, 61017, -27309, -18106) : ivec4(20189, 69917, 67637, 20671)).b);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    {
                                        do {
                                            for (int GLF_dead13i = donor_replacementGLF_dead13low; GLF_dead13i < donor_replacementGLF_dead13high; GLF_dead13i += 2 * donor_replacementGLF_dead13m) {
                                                int GLF_dead13from = GLF_dead13i;
                                                int GLF_dead13mid = GLF_dead13i + donor_replacementGLF_dead13m - 1;
                                                int GLF_dead13to = min(GLF_dead13i + 2 * donor_replacementGLF_dead13m - 1, donor_replacementGLF_dead13high);
                                                GLF_dead13merge(GLF_dead13from, GLF_dead13mid, GLF_dead13to);
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = vec4(125.045, -5371.1137, -2.1, 433.655);
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(0.0, sqrt(0.0), 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0)))))) {
                                        _GLF_color = vec4(-51.26, 36.99, 9.6, -2.2);
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(GLF_live7injectionSwitch, atan(mat3x2(-645.995, -730.079, 6.6, -2601.7914, 8.6, 36.68)[0], unpackSnorm2x16(158346u)));
                                }
                            }
                        } else {
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead13gl_FragCoord;
                        }
                        int donor_replacementGLF_dead10i = _GLF_FUZZED((~k));
                        {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(214.303, 831.178, 8.6, -2604.0652);
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = GLF_dead13gl_FragCoord;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(8.0, 2.4, 4.8, 8593.9431);
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (mod(float(donor_replacementGLF_dead10i), round(xCoord)) <= 0.01) {
                                    height += 100.0;
                                }
                            } else {
                            }
                        }
                    }
                }
            }
            break;
            do {
                int GLF_live1looplimiter0 = 0;
                if (_GLF_DEAD(false)) {
                    _GLF_color = smoothstep(log2(xCoord), (xpos / GLF_live6one), _GLF_color);
                }
                do {
                    if (GLF_live1looplimiter0 >= 7) {
                        ;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = pow(ldexp(vec4(0.5, 4.4, -81.51, -1446.9696), (ivec4(4006, -73049, 95843, -27254) | ivec4(-57831, -38204, -58720, 28003))), _GLF_color);
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
            if (_GLF_DEAD(false)) {
                _GLF_color = injectionSwitch.rrgg;
            }
        }
        float x_new = _GLF_IDENTITY(x, (false ? _GLF_FUZZED(width) : _GLF_IDENTITY(x, max(_GLF_IDENTITY(x, (x) - 0.0), x)))) * x - y * y + _GLF_struct_replacement_3.c_re;
        y = 2.0 * x * y + _GLF_struct_replacement_0._f1.c_im;
        x = x_new;
        _GLF_IDENTITY(iteration++, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(iteration) : _GLF_IDENTITY(iteration++, (false ? _GLF_FUZZED(-22126) : (iteration++)))));
        if (_GLF_DEAD(false)) {
            _GLF_color = step(_GLF_color, GLF_dead12_GLF_color);
        }
    }
    if (iteration < 1000) {
        return pickColor(iteration);
    } else {
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = (length(vec3(837.970, -1.4, 9.9)) / GLF_dead12_GLF_color);
            }
            int GLF_live9result = _GLF_FUZZED(int(false));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead13i = _GLF_FUZZED(GLF_live9result);
                if (_GLF_DEAD(false)) {
                    for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        _GLF_color = GLF_dead12_GLF_color;
                    }
                }
                int donor_replacementGLF_dead13j = _GLF_FUZZED((ivec2(-31430, 83815) / ivec2(-57675, 38450)).y);
                if (GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13i, 10)] < GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13j, 10)]) {
                    GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(iteration++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13i++, 10)];
                } else {
                    GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(iteration++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13j++, 10)];
                }
            }
            int GLF_live9sum = _GLF_FUZZED(63070);
            if (GLF_live9result > 0) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    GLF_live9sum += GLF_live9result;
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = (vec4(-2.7, -32.75, 4257.0393, -8.0) + x);
                }
                switch (GLF_live9result) {
                    case -1:
                        GLF_live9sum += 1;
                        break;
                    case 0:
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(abs(0.0), 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                            vec2 donor_replacementGLF_dead12coord = _GLF_FUZZED(acosh((4.0 / resolution)));
                            {
                                ivec2 GLF_dead12icoord = ivec2(((donor_replacementGLF_dead12coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = GLF_dead12_GLF_color;
                                    }
                                }
                                int GLF_dead12res3 = ((GLF_dead12icoord.x >> 5) & 1) ^ ((GLF_dead12icoord.y & 32) >> 5);
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = radians(GLF_dead12_GLF_color);
                                    } else {
                                    }
                                }
                                int GLF_dead12res2 = (GLF_dead12icoord.y * GLF_dead12icoord.y >> 10) & 1;
                                int GLF_dead12res1 = (GLF_dead12icoord.x * GLF_dead12icoord.y >> 9) & 1;
                                GLF_dead12_GLF_color = vec4(float(GLF_dead12res1 ^ GLF_dead12res2), float(GLF_dead12res2 & GLF_dead12res3), float(GLF_dead12res1 | GLF_dead12res3), 1.0);
                            }
                        }
                        ;
                }
            }
        }
        return vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y);
    }
}

void main() {
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_dead13gl_FragCoord;
    }
    vec3 data[16];
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            data[4 * j + i] = mand(gl_FragCoord.x + float(i - 1), gl_FragCoord.y + float(j - 1));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead11i = _GLF_FUZZED(ivec4(-68125, 71595, -38123, 56409)[2]);
                    int donor_replacementGLF_dead11j = _GLF_FUZZED((+(-46663)));
                    if (donor_replacementGLF_dead11j < donor_replacementGLF_dead11i + 1) {
                        continue;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead13gl_FragCoord;
                    }
                }
                vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(((-70.52) - faceforward(injectionSwitch, resolution, vec2(721.505, -811.521))));
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(1071.1962, -13.44, -7.9, -9676.2529);
                }
                int donor_replacementGLF_dead5i = _GLF_FUZZED(bitfieldInsert(j, (uvec2(2170u, 108997u), j), findLSB(155654u), i));
                {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead10result = _GLF_FUZZED(-98.90);
                        {
                            donor_replacementGLF_dead10result += 100.0;
                        }
                    }
                    donor_replacementGLF_dead5coord = _GLF_IDENTITY(_GLF_color.xz + _GLF_color.yy, (true ? (_GLF_color.xz + _GLF_color.yy) : _GLF_FUZZED(resolution)));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (+GLF_dead12_GLF_color);
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(7.2, 8.4, -0.7, 5.1);
                        }
                    }
                    for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                        _GLF_IDENTITY(donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0, (_GLF_IDENTITY(donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0, vec2(1.0, 1.0) * (donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0))) + vec2(0.0, 0.0));
                    }
                    _GLF_color = texture(GLF_dead5tex, _GLF_IDENTITY(donor_replacementGLF_dead5coord, clamp(_GLF_IDENTITY(donor_replacementGLF_dead5coord, mix(vec2(_GLF_FUZZED(565.127), (donor_replacementGLF_dead5coord)[1]), vec2((donor_replacementGLF_dead5coord)[0], _GLF_FUZZED(6.8)), bvec2(true, false))), donor_replacementGLF_dead5coord, donor_replacementGLF_dead5coord)));
                    donor_replacementGLF_dead5i++;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    int donor_replacementGLF_dead10i = _GLF_FUZZED(87989);
                    float donor_replacementGLF_dead10result = _GLF_FUZZED(3044.2004);
                    float donor_replacementGLF_dead10thirty_two = _GLF_FUZZED(GLF_live6one);
                    if ((donor_replacementGLF_dead10i % 32) == 0) {
                        donor_replacementGLF_dead10result += 0.4;
                    } else {
                        if (mod(float(donor_replacementGLF_dead10i), round(donor_replacementGLF_dead10thirty_two)) <= 0.01) {
                            donor_replacementGLF_dead10result += 100.0;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead13gl_FragCoord;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)))))) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bool(false)), !(!(bool(bool(false)))))))) {
                        } else {
                            _GLF_color = _GLF_color;
                        }
                    }
                }
                _GLF_color = vec4(90.92, 0.8, 6376.5529, 9.3);
                if (_GLF_DEAD(false)) {
                    _GLF_color = atan(_GLF_color, GLF_dead13gl_FragCoord);
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec2 donor_replacementGLF_dead13color = _GLF_FUZZED(injectionSwitch);
            vec3 donor_replacementGLF_dead13vecCoor = _GLF_FUZZED(faceforward(vec3(-1.7, 1.2, -57.89), _GLF_color.tqs, vec3(8.0, 8978.4014, 2938.6825)));
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = (vec4(-850.896, 0.2, -200.618, 870.557) * GLF_dead13gl_FragCoord);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = GLF_dead12_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                } else {
                    donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[7]))));
                }
                donor_replacementGLF_dead13color.y *= mix(normalize(donor_replacementGLF_dead13vecCoor), normalize(vec3(donor_replacementGLF_dead13color, degrees(donor_replacementGLF_dead13color.x))), GLF_dead13injectionSwitch.x).y;
                break;
            }
        }
    }
    for (int _injected_loop_counter = (_GLF_IDENTITY(0, (0) >> 0) >> _GLF_IDENTITY(int(3), int(3))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (((1 & 1) << _GLF_IDENTITY(int(5), int(5))) >> _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), 0 + (_GLF_IDENTITY(int(5), (int(5)) >> 0)))))); _injected_loop_counter++) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead2v = _GLF_FUZZED(floatBitsToInt(determinant(mat3(49.72, -1.8, -2258.4355, 7682.7626, 9.9, 7.1, -_GLF_IDENTITY(5.1, 1.0 * _GLF_IDENTITY((_GLF_IDENTITY(5.1, (true ? 5.1 : _GLF_FUZZED(injectionSwitch.g)))), min((_GLF_IDENTITY(5.1, (true ? 5.1 : _GLF_FUZZED(injectionSwitch.g)))), (_GLF_IDENTITY(5.1, (true ? 5.1 : _GLF_FUZZED(injectionSwitch.g))))))), -34.32, -424.294))));
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                donor_replacementGLF_dead2v = (4 * donor_replacementGLF_dead2v * (1000 - donor_replacementGLF_dead2v)) / 1000;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = dFdy(GLF_dead12_GLF_color);
                }
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    do {
                        _GLF_color = GLF_dead12_GLF_color;
                    } while (_GLF_WRAPPED_LOOP(false));
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = uintBitsToFloat(uvec4(45629u, 129328u, 187370u, 127985u));
                }
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-12.60, 353.672, 68.60, 0.4);
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = (44.93 + smoothstep(24.14, -867.606, GLF_live6m44[0]));
    }
    _GLF_struct_10 _GLF_struct_replacement_10 = _GLF_struct_10(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(0.0), mat2(1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), uvec4(1u, 1u, 1u, 1u));
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            _GLF_color = _GLF_color;
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < length(0.0)), ((gl_FragCoord.y < length(0.0))) && true)))) {
            _GLF_color = vec4(8.5, -9216.0206, 4566.4133, 68.34);
            {
                int GLF_live6c = _GLF_FUZZED((true ? (-24848) : (-49841)));
                int GLF_live6looplimiter0 = 0;
                uint GLF_live6matrix_number = _GLF_FUZZED(77466u);
                int GLF_live6rows = _GLF_FUZZED(34500);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = dFdyCoarse(GLF_dead13gl_FragCoord);
                }
                for (int GLF_live6r = 0; GLF_live6r < GLF_live6rows; GLF_live6r++) {
                    if (GLF_live6looplimiter0 >= 6) {
                        break;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead12coord = _GLF_FUZZED((GLF_live7injectionSwitch / trunc(float(true))));
                            {
                                if (donor_replacementGLF_dead12coord.y < 0.6) {
                                    uvec2 GLF_dead12icoord = uvec2(((donor_replacementGLF_dead12coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_dead12res1 = uint(((GLF_dead12icoord.x * GLF_dead12icoord.y) >> (GLF_dead12icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_dead12res2 = uint(((GLF_dead12icoord.x * GLF_dead12icoord.y) << (GLF_dead12icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead12res = float(((GLF_dead12res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead12res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead12_GLF_color = vec4(GLF_dead12res, GLF_dead12res, GLF_dead12res, 1.0);
                                } else {
                                    ivec2 GLF_dead12icoord = ivec2(((donor_replacementGLF_dead12coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_dead13gl_FragCoord;
                                    }
                                    int GLF_dead12res3 = ((GLF_dead12icoord.x >> 5) & 1) ^ ((GLF_dead12icoord.y & 32) >> 5);
                                    int GLF_dead12res2 = (GLF_dead12icoord.y * GLF_dead12icoord.y >> 10) & 1;
                                    int GLF_dead12res1 = (GLF_dead12icoord.x * GLF_dead12icoord.y >> 9) & 1;
                                    GLF_dead12_GLF_color = vec4(float(GLF_dead12res1 ^ GLF_dead12res2), float(GLF_dead12res2 & GLF_dead12res3), float(GLF_dead12res1 | GLF_dead12res3), 1.0);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = GLF_dead12_GLF_color.xzyy;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = GLF_dead12_GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead13gl_FragCoord;
                        }
                    }
                    GLF_live6looplimiter0++;
                    do {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = dFdxCoarse(fract(vec4(-0.0, 538.652, 8589.7742, -574.671)));
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec4(sqrt(1.0), 1.0, abs(0.0), tan(0.0)), vec4(0.0, 0.0, 1.0, exp(0.0))), dot(vec4(sqrt(1.0), 1.0, abs(0.0), tan(0.0)), vec4(0.0, 0.0, 1.0, exp(0.0)))))))) {
                                for (int _injected_loop_counter = _GLF_IDENTITY((0 & GLF_dead13N), ((0 & GLF_dead13N)) + 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), (int(5)) | (int(5))))) >> _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter++) {
                                    switch (GLF_live6matrix_number) {
                                        case 0u:
                                            GLF_live6m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 2)] = GLF_live6one;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                int donor_replacementGLF_dead13high = _GLF_FUZZED(GLF_live6rows);
                                                int donor_replacementGLF_dead13m = _GLF_FUZZED(GLF_live6looplimiter0);
                                                for (int GLF_dead13i = GLF_live6r; GLF_dead13i < donor_replacementGLF_dead13high; GLF_dead13i += 2 * donor_replacementGLF_dead13m) {
                                                    int GLF_dead13from = GLF_dead13i;
                                                    int GLF_dead13mid = GLF_dead13i + donor_replacementGLF_dead13m - 1;
                                                    int GLF_dead13to = min(GLF_dead13i + 2 * donor_replacementGLF_dead13m - 1, donor_replacementGLF_dead13high);
                                                    GLF_dead13merge(GLF_dead13from, GLF_dead13mid, GLF_dead13to);
                                                }
                                            }
                                            break;
                                        case 1u:
                                            GLF_live6m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 3)] = GLF_live6one;
                                            break;
                                        case 2u:
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead13i = _GLF_FUZZED(GLF_live6looplimiter0);
                                                {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = asin(GLF_dead12_GLF_color);
                                                    }
                                                    int GLF_dead13from = donor_replacementGLF_dead13i;
                                                    int GLF_dead13mid = donor_replacementGLF_dead13i + GLF_live6r - 1;
                                                    int GLF_dead13to = min(donor_replacementGLF_dead13i + 2 * GLF_live6r - 1, GLF_live6rows);
                                                    GLF_dead13merge(GLF_dead13from, GLF_dead13mid, GLF_dead13to);
                                                }
                                            }
                                            GLF_live6m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 4)] = GLF_live6one;
                                            break;
                                        case 3u:
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                GLF_live6m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 2)] = GLF_live6one;
                                            } else {
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = step(vec4(-620.383, -990.408, 4390.7768, 6.3), GLF_dead12_GLF_color);
                                            }
                                            break;
                                        case 4u:
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = ((-7.4) + tan(GLF_dead13gl_FragCoord));
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                GLF_live6m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 3)] = GLF_live6one;
                                            }
                                            break;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = vec4(-5894.5221, vec3(-458.501, -4147.8521, 2402.4764));
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = exp(_GLF_color);
                                                }
                                                vec2 donor_replacementGLF_dead13color = _GLF_FUZZED(vec2(7268.3646, 1.8));
                                                int donor_replacementGLF_dead13i = _GLF_FUZZED(bitCount(GLF_live6c));
                                                vec3 donor_replacementGLF_dead13vecCoor = _GLF_FUZZED(injectionSwitch.ttt);
                                                if (int(GLF_dead13gl_FragCoord[1]) < 210) {
                                                    for (int _injected_loop_counter = _GLF_IDENTITY(1, (1) | (1)); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter--) {
                                                        donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[5]))));
                                                    }
                                                    donor_replacementGLF_dead13color.y -= tanh(donor_replacementGLF_dead13color.x) / cosh(donor_replacementGLF_dead13color.y);
                                                    break;
                                                } else if (int(GLF_dead13gl_FragCoord[1]) < 240) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = tan(_GLF_color);
                                                    }
                                                    donor_replacementGLF_dead13color = fract(asinh(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[6]))));
                                                    donor_replacementGLF_dead13color.y -= isnan(float(donor_replacementGLF_dead13i)) ? tanh(GLF_dead13gl_FragCoord.x) : atanh(GLF_dead13gl_FragCoord.y);
                                                    break;
                                                } else if (int(GLF_dead13gl_FragCoord[1]) < 270) {
                                                    donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[7]))));
                                                    donor_replacementGLF_dead13color.y *= mix(normalize(donor_replacementGLF_dead13vecCoor), normalize(vec3(donor_replacementGLF_dead13color, degrees(donor_replacementGLF_dead13color.x))), GLF_dead13injectionSwitch.x).y;
                                                    break;
                                                } else {
                                                    discard;
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                                        _GLF_color = pow(vec4(2.0, 59.02, -6.2, -4946.6453), GLF_dead13gl_FragCoord);
                                                    }
                                                }
                                            }
                                        case 5u:
                                            GLF_live6m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 4)] = GLF_live6one;
                                            break;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = GLF_dead13gl_FragCoord;
                                            }
                                        case 6u:
                                            GLF_live6m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 2)] = GLF_live6one;
                                            break;
                                        case 7u:
                                            GLF_live6m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 3)] = GLF_live6one;
                                            break;
                                        case 8u:
                                            GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 4)] = GLF_live6one;
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), (int(1)) >> 0))) >> _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter++) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = dFdxFine(GLF_dead13gl_FragCoord);
                                                }
                                            }
                                            break;
                                    }
                                }
                            } else {
                            }
                        } else {
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead13gl_FragCoord;
                        }
                    }
                }
            }
        }
    }
    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        do {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(4138.2271, -856.374, 483.420, 4996.9028);
            }
            for (int i = 0; i < 16; i++) {
                do {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = dFdxCoarse(vec4(-1.1, 7450.6578, 540.124, 5.8));
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                _GLF_struct_replacement_10.sum += data[_GLF_IDENTITY(i, (_GLF_IDENTITY(i, (i) >> 0)) | (_GLF_IDENTITY(i, (i) | (i))))];
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead2i = _GLF_FUZZED(20588);
        _GLF_struct_11 _GLF_struct_replacement_11 = _GLF_struct_11(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_12(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1, mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), _GLF_struct_13(mat2(1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(max(66898, abs(18179)))), 1));
        int donor_replacementGLF_dead2v = _GLF_FUZZED(81132);
        for (_GLF_IDENTITY(donor_replacementGLF_dead2i = 0, (true ? (donor_replacementGLF_dead2i = 0) : _GLF_FUZZED(donor_replacementGLF_dead2v))); donor_replacementGLF_dead2i < _GLF_struct_replacement_11._f1._f4.donor_replacementGLF_dead2iters; donor_replacementGLF_dead2i++) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = uintBitsToFloat(uvec4(111200u, 142536u, 78413u, 196361u));
                }
                _GLF_color = _GLF_IDENTITY(_GLF_color, (_GLF_color) / vec4(_GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y)));
                {
                    {
                        ;
                    }
                }
            }
            do {
                do {
                    donor_replacementGLF_dead2v = (4 * donor_replacementGLF_dead2v * (1000 - donor_replacementGLF_dead2v)) / 1000;
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    do {
        do {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                    _GLF_color = _GLF_color;
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-9.2, 9775.5653, -1.3, 7.2);
                        }
                    }
                }
            }
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                _GLF_struct_replacement_10.sum /= vec3(16.0);
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
    _GLF_color = vec4(_GLF_struct_replacement_10.sum, 1.0);
}
