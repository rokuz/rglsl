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
const int GLF_live6dp[256] = int[256](115, 133, 150, _GLF_IDENTITY(164, (false ? _GLF_FUZZED(-82381) : 164)), 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, _GLF_IDENTITY(120, ~(~(_GLF_IDENTITY(120, int(ivec2(_GLF_IDENTITY(120, (120) >> 0), 0)))))), 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, _GLF_IDENTITY(79, (_GLF_IDENTITY(79, 0 | (79))) - 0), 80, 84, 91, 101, 114, 130, 146, _GLF_IDENTITY(164, (164) ^ (0 >> _GLF_IDENTITY(int(4), int(4)))), 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, _GLF_IDENTITY(162, (162) - 0), 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, _GLF_IDENTITY(105, 0 | (105)), 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, _GLF_IDENTITY(141, (141) ^ 0), 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, _GLF_IDENTITY(49, (49) / (0 ^ 1)), 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, _GLF_IDENTITY(81, 0 | (81)), 73, 68, 65, 65, 67, _GLF_IDENTITY(70, (_GLF_IDENTITY(70, (70) | (70))) ^ 0), 75, 81, 87, 92, 97, 101, 103, 102, _GLF_IDENTITY(100, ~(~(100))), 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);

struct _GLF_struct_6 {
    mat3x4 _f0;
    mat3 _f1;
    uvec2 _f2;
    bvec2 _f3;
    mat2 _f4;
    ivec2 GLF_live2p;
    mat2x4 _f5;
};

struct _GLF_struct_5 {
    mat4x2 _f0;
    _GLF_struct_6 _f1;
    uvec4 _f2;
};

struct _GLF_struct_10 {
    bvec2 _f0;
    mat4x3 _f1;
};

struct _GLF_struct_9 {
    bvec2 _f0;
    mat3x2 _f1;
    mat4 _f2;
    uvec4 _f3;
};

struct _GLF_struct_8 {
    vec2 GLF_live0coord;
    _GLF_struct_9 _f0;
    mat3x2 _f1;
    vec2 _f2;
    uvec3 _f3;
    _GLF_struct_10 _f4;
    bvec4 _f5;
};

struct _GLF_struct_7 {
    float _f0;
    vec2 _f1;
    _GLF_struct_8 _f2;
    ivec2 _f3;
    uint _f4;
    int _f5;
    ivec2 _f6;
};

struct _GLF_struct_20 {
    uvec2 _f0;
    ivec3 _f1;
    bvec3 _f2;
    ivec2 _f3;
};

struct _GLF_struct_19 {
    mat4 _f0;
    mat3 _f1;
};

struct _GLF_struct_18 {
    ivec2 _f0;
    vec2 _f1;
    bool _f2;
    mat4x2 _f3;
    mat4 _f4;
    bvec2 _f5;
};

struct _GLF_struct_17 {
    _GLF_struct_18 _f0;
    int _f1;
    vec2 _f2;
    mat3 _f3;
    _GLF_struct_19 _f4;
    _GLF_struct_20 _f5;
    uvec4 _f6;
};

struct _GLF_struct_16 {
    bvec2 _f0;
    mat2x3 _f1;
    mat4x2 _f2;
    mat3x2 _f3;
    ivec4 _f4;
    uint _f5;
};

struct _GLF_struct_15 {
    ivec4 _f0;
    int _f1;
    ivec2 _f2;
    mat4 _f3;
    uint _f4;
    ivec4 _f5;
    mat3 _f6;
};

struct _GLF_struct_14 {
    _GLF_struct_15 _f0;
    mat4x3 _f1;
    uvec2 _f2;
    uvec2 _f3;
    int _f4;
    mat4x2 _f5;
    _GLF_struct_16 _f6;
};

struct _GLF_struct_13 {
    uvec2 _f0;
    int _f1;
    vec4 _f2;
    mat3 _f3;
};

struct _GLF_struct_12 {
    int _f0;
    uvec3 _f1;
    uint _f2;
    uvec4 _f3;
    vec3 _f4;
    _GLF_struct_13 _f5;
    ivec4 _f6;
};

struct _GLF_struct_11 {
    ivec3 _f0;
    int GLF_live2looplimiter1;
    _GLF_struct_12 _f1;
    uvec3 _f2;
    _GLF_struct_14 _f3;
    vec2 _f4;
    _GLF_struct_17 _f5;
};

struct _GLF_struct_21 {
    int _f0;
    mat4 _f1;
    mat4x3 _f2;
    int region_y;
    ivec2 _f3;
    bvec2 _f4;
    uvec2 _f5;
    mat4x3 _f6;
};

struct _GLF_struct_2 {
    vec3 _f0;
    ivec2 _f1;
    mat4x2 _f2;
};

struct _GLF_struct_1 {
    _GLF_struct_2 _f0;
    int rows;
};

struct _GLF_struct_0 {
    mat4x3 _f0;
    mat2 _f1;
    _GLF_struct_1 _f2;
    uvec4 _f3;
};

struct _GLF_struct_4 {
    uvec4 _f0;
    float GLF_live0slope;
};

struct _GLF_struct_3 {
    _GLF_struct_4 _f0;
    vec3 _f1;
    vec3 _f2;
    mat3x2 _f3;
    vec3 _f4;
    bvec4 _f5;
};

layout(set = 0, binding = 2) uniform buf2 {
    vec2 injectionSwitch;
};

vec4 GLF_live3_GLF_color = _GLF_FUZZED((false ? vec4(385.843, -1.0, 8.9, 5770.8261) : vec4(6.0, 4888.3700, -19.46, -0.8)));
int GLF_live2map[16 * 16];
layout(set = 0, binding = 3) uniform sampler2D GLF_live0tex;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    float one;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

mat2 m22;
mat2x3 m23;
mat2x4 m24;
mat3x2 m32;
mat3 m33;
mat3x4 m34;
mat4x2 m42;
mat4x3 m43;
mat4 m44;

vec4 _GLF_outlined_0(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_1(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_2(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_3(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_4() {
    if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < 0.0), true && ((gl_FragCoord.x < 0.0)))))) {
        _GLF_color = acosh(step(GLF_live3_GLF_color, _GLF_color));
    }
    return (vec4(391.905, -122.501, -1.3, 9.3) + vec4(_GLF_IDENTITY(-833.180, min(-833.180, -833.180)), 987.861, 5.3, -1.4));
}

vec4 _GLF_outlined_5(vec4 _GLF_color) {
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
    } else {
        return _GLF_color;
    }
}

bool _GLF_outlined_6() {
    return true;
    if (_GLF_DEAD(false)) {
        _GLF_color = fma(GLF_live3_GLF_color, _GLF_color, vec4(886.906, -96.95, -7.1, 185.579));
    }
}

vec4 _GLF_outlined_7() {
    return abs(vec4(0.4, _GLF_IDENTITY(6.6, (false ? _GLF_FUZZED(289.085) : 6.6)), 2471.9950, 18.55));
}

vec4 _GLF_outlined_8(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_9(vec4 GLF_live3_GLF_color) {
    {
        float GLF_live5c_im = _GLF_FUZZED(42.75);
        float GLF_live5c_re = _GLF_FUZZED(-_GLF_IDENTITY(735.738, max(735.738, 735.738)));
        int GLF_live5iteration = _GLF_FUZZED(_GLF_IDENTITY((false ? 50747 : 93127), (_GLF_IDENTITY((false ? 50747 : 93127), (_GLF_IDENTITY((false ? 50747 : 93127), max((false ? 50747 : 93127), (false ? 50747 : 93127)))) >> 0)) - 0));
        float GLF_live5x = _GLF_IDENTITY(_GLF_FUZZED(-967.004), float(vec4(_GLF_FUZZED(-967.004), sqrt(0.0), 0.0, 1.0)));
        float GLF_live5y = _GLF_IDENTITY(_GLF_FUZZED(-1.5), (true ? _GLF_FUZZED(-1.5) : _GLF_FUZZED(GLF_live5c_re)));
        {
            if (GLF_live5x * GLF_live5x + GLF_live5y * GLF_live5y > 4.0) {
                ;
            }
            float GLF_live5x_new = GLF_live5x * GLF_live5x - GLF_live5y * GLF_live5y + GLF_live5c_re;
            GLF_live5y = 2.0 * GLF_live5x * GLF_live5y + GLF_live5c_im;
            GLF_live5x = _GLF_IDENTITY(GLF_live5x_new, (_GLF_IDENTITY(GLF_live5x_new, (GLF_live5x_new) + log(1.0))) / 1.0);
            GLF_live5iteration++;
        }
    }
    return GLF_live3_GLF_color;
}

vec4 _GLF_outlined_10() {
    return vec4(-_GLF_IDENTITY(36.84, (36.84) / 1.0), 619.598, 534.789, -2870.8970);
}

vec4 _GLF_outlined_11(vec4 GLF_live3_GLF_color) {
    return GLF_live3_GLF_color;
}

vec4 _GLF_outlined_12() {
    return _GLF_IDENTITY(roundEven(vec4(-352.915, 6.0, 52.32, 48.80)), clamp(roundEven(vec4(-352.915, 6.0, 52.32, 48.80)), roundEven(vec4(-_GLF_IDENTITY(352.915, 1.0 * (352.915)), 6.0, 52.32, 48.80)), roundEven(vec4(-352.915, 6.0, 52.32, 48.80))));
}

vec4 _GLF_outlined_13(vec4 GLF_live3_GLF_color) {
    return GLF_live3_GLF_color;
}

vec4 _GLF_outlined_14(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_15() {
    return vec4(_GLF_IDENTITY(67.33, max(67.33, 67.33)), -_GLF_IDENTITY(3.9, _GLF_IDENTITY(float(vec2(3.9, 1.0)), clamp(_GLF_IDENTITY(float(vec2(3.9, 1.0)), float(vec2(float(vec2(3.9, 1.0)), 1.0))), float(vec2(3.9, 1.0)), float(vec2(3.9, 1.0))))), -62.30, 6450.2198);
}

vec4 _GLF_outlined_16(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_17(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_18(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_19(vec4 GLF_live3_GLF_color) {
    return GLF_live3_GLF_color;
}

vec4 _GLF_outlined_20(vec4 _GLF_color) {
    return _GLF_color;
    {
        int GLF_live6looplimiter0 = 0;
        if (GLF_live6looplimiter0 >= 5) {
            ;
        }
    }
}

void main() {
    {
        int GLF_live6looplimiter0 = 0;
        ivec2 GLF_live6pos = _GLF_FUZZED((-(ivec2(89892, 23502) * (25405 | (-8921)))));
        while (GLF_live6pos.y != 256) {
            if (GLF_live6looplimiter0 >= 5) {
                break;
            }
            _GLF_IDENTITY(GLF_live6looplimiter0++, (true ? (GLF_live6looplimiter0++) : _GLF_FUZZED(min(bitfieldExtract(GLF_live6looplimiter0, GLF_live6looplimiter0, -83319), GLF_live6looplimiter0))));
            {
                if (GLF_live6pos.x < GLF_live6dp[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), (_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), ~(~(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256))))) | (_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), 0 | (_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)))))] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                    float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                    ;
                }
                GLF_live6pos.y++;
            }
        }
    }
    uint matrix_number = 0u;
    for (int cols = 2; cols <= 4; cols++) {
        for (_GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(mat4x3(1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, max(_GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, (1.0) + sqrt(0.0)), 1.0, 1.0)), 1.0)), 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), _GLF_struct_1(_GLF_struct_2(_GLF_IDENTITY(vec3(1.0, 1.0, 1.0), _GLF_IDENTITY(vec3(_GLF_IDENTITY(mat2x4(_GLF_IDENTITY(vec3(1.0, 1.0, 1.0), max(vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0))), round(length(normalize(1.0))), 0.0, 1.0, 1.0, 0.0), (false ? _GLF_FUZZED(mat2x4(50.12, 8607.1416, -9.4, -6.8, -21.64, -78.18, -2972.9781, 9.6)) : mat2x4(_GLF_IDENTITY(vec3(1.0, 1.0, 1.0), max(vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0))), round(length(normalize(1.0))), 0.0, 1.0, 1.0, 0.0)))), (vec3(_GLF_IDENTITY(mat2x4(_GLF_IDENTITY(vec3(1.0, 1.0, 1.0), max(vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0))), round(length(normalize(1.0))), 0.0, 1.0, 1.0, 0.0), (false ? _GLF_FUZZED(mat2x4(50.12, 8607.1416, _GLF_IDENTITY(-9.4, mix(float(-9.4), float(_GLF_FUZZED(26.23)), bool(false))), -6.8, -21.64, _GLF_IDENTITY(-78.18, (-78.18) * round(length(normalize(exp(vec3(0.0, 0.0, 0.0)))))), -2972.9781, 9.6)) : mat2x4(_GLF_IDENTITY(vec3(1.0, 1.0, 1.0), max(vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0))), round(length(normalize(1.0))), 0.0, 1.0, 1.0, 0.0))))) - vec3(0.0, 0.0, 0.0))), _GLF_IDENTITY(ivec2(1, 1), (_GLF_IDENTITY(ivec2(1, 1), max(_GLF_IDENTITY(ivec2(1, 1), (ivec2(1, 1)) | (_GLF_IDENTITY(ivec2(1, 1), (ivec2(1, 1)) << ivec2(0, 0)))), _GLF_IDENTITY(ivec2(1, 1), clamp(ivec2(1, 1), ivec2(1, 1), ivec2(1, _GLF_IDENTITY(1, (1) | (_GLF_IDENTITY(1, (1) / 1))))))))) | (ivec2(1, 1))), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), 2), uvec4(1u, 1u, 1u, 1u)); _GLF_struct_replacement_0._f2.rows <= 4; _GLF_struct_replacement_0._f2.rows++) {
            for (int c = 0; c < cols; c++) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_7();
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(9.2)), float(0.0), bool(true)))), ((gl_FragCoord.y < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(9.2)), float(0.0), bool(true))))) && true)), !(_GLF_IDENTITY(!(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(9.2)), float(0.0), bool(true)))), ((gl_FragCoord.y < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(9.2)), float(0.0), bool(true))))) && true))), bool(bool(!(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(9.2)), float(0.0), bool(true)))), ((gl_FragCoord.y < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(9.2)), float(0.0), bool(true))))) && true)))))))))) {
                            _GLF_color = _GLF_outlined_8(_GLF_outVarBackup_GLF_color);
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                for (int r = 0; r < _GLF_struct_replacement_0._f2.rows; r++) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = _GLF_outlined_9(GLF_live3_GLF_color);
                    }
                    {
                        {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live3_GLF_color;
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            }
                            _GLF_color = vec4(-9.5, -_GLF_IDENTITY(2.5, (2.5) * 1.0), 9.7, 944.086);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = _GLF_outlined_10();
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.x >= 0.0, (gl_FragCoord.x >= 0.0) || false))))) {
                                _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_color = _GLF_outVarBackup_GLF_color) - vec4(0.0, 0.0, 0.0, 0.0));
                                if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < 0.0), ((gl_FragCoord.x < 0.0)) && true)))) {
                                    _GLF_color = _GLF_IDENTITY(exp(_GLF_outVarBackup_GLF_color), (exp(_GLF_outVarBackup_GLF_color)) * vec4(1.0, 1.0, 1.0, 1.0));
                                }
                                {
                                    int GLF_live6looplimiter0 = 0;
                                    if (GLF_live6looplimiter0 >= 5) {
                                        ;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_color;
                                } else {
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_IDENTITY(GLF_live3_GLF_color, (true ? GLF_live3_GLF_color : _GLF_FUZZED(abs(_GLF_color))));
                        }
                        vec2 GLF_live0coord = _GLF_FUZZED(((-0.9) * vec2(-_GLF_IDENTITY(63.14, min(_GLF_IDENTITY(63.14, (63.14) - 0.0), _GLF_IDENTITY(63.14, max(63.14, _GLF_IDENTITY(63.14, (63.14) / 1.0))))), -529.177)));
                        float GLF_live0h = _GLF_FUZZED(((-7420.0600) * (-16.07)));
                        for (int _injected_loop_counter = (int(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), 1 * (int(0))))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = _GLF_color;
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, (_GLF_color) * mat4(1.0));
                            _GLF_color = vec4(-4.3, 90.34, -1772.9864, 36.07);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((_GLF_IDENTITY(injectionSwitch, tan(vec2(0.0, 0.0)) + (_GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED(2.5), (injectionSwitch)[1]), vec2((injectionSwitch)[0], _GLF_FUZZED(7751.8141)), bvec2(true, false))))).x < injectionSwitch.y), (_GLF_IDENTITY((_GLF_IDENTITY(injectionSwitch, tan(vec2(0.0, 0.0)) + (_GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED(2.5), (injectionSwitch)[1]), vec2((injectionSwitch)[0], _GLF_FUZZED(7751.8141)), bvec2(true, false))))).x < injectionSwitch.y), !(!((_GLF_IDENTITY(injectionSwitch, tan(vec2(0.0, 0.0)) + _GLF_IDENTITY((_GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED(2.5), (injectionSwitch)[1]), vec2((injectionSwitch)[0], _GLF_FUZZED(7751.8141)), bvec2(true, false)))), mix(vec2(((_GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED(2.5), (injectionSwitch)[1]), vec2((injectionSwitch)[0], _GLF_FUZZED(7751.8141)), bvec2(true, false)))))[0], ((_GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED(2.5), (injectionSwitch)[1]), vec2((injectionSwitch)[0], _GLF_FUZZED(7751.8141)), bvec2(true, false)))))[1]), vec2(_GLF_FUZZED(2.9), _GLF_FUZZED((8.7))), bvec2(_GLF_IDENTITY(false, !(!(false))), false)))).x < injectionSwitch.y))))) && true)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    float GLF_live5x = _GLF_FUZZED(1.3);
                                    float GLF_live5y = _GLF_FUZZED((-(-7.9)));
                                    if (GLF_live5x * GLF_live5x + GLF_live5y * GLF_live5y > 4.0) {
                                        ;
                                    }
                                }
                                _GLF_color = vec4(24.63, 57.95, _GLF_IDENTITY(8084.2743, (8084.2743) * 1.0), -1.4);
                                {
                                    ivec2 GLF_live6pos = _GLF_FUZZED((((-37326) + (ivec2(-94262, 73349) | ivec2(11719, 11026))) | ivec2(11254, -93572)));
                                    if (GLF_live6pos.x < GLF_live6dp[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), max(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), _GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)))] + 15 && GLF_live6pos.x > _GLF_IDENTITY(GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)], (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] : _GLF_FUZZED(clamp(_injected_loop_counter, c, c)))) - 15) {
                                        float GLF_live6p = _GLF_IDENTITY((15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))), ((15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)])))) - 0.0) / 15.0;
                                        ;
                                    }
                                }
                            }
                        }
                        int GLF_live0i = _GLF_FUZZED(63210);
                        float GLF_live0refh = _GLF_FUZZED(-4525.4615);
                        _GLF_struct_3 _GLF_struct_replacement_3 = _GLF_struct_3(_GLF_struct_4(uvec4(1u, 1u, 1u, 1u), _GLF_FUZZED(float((11036u == 81404u)))), vec3(1.0, _GLF_IDENTITY(1.0, float(mat4(1.0, exp(0.0), 0.0, 1.0, 0.0, exp(0.0), _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0)), dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0))), 1.0, tan(0.0), 0.0, 1.0, 0.0, log(1.0), 0.0, length(0.0), 0.0))), 1.0), vec3(1.0, 1.0, _GLF_IDENTITY(1.0, min(_GLF_IDENTITY(1.0, (1.0) + 0.0), 1.0))), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), bvec4(true, true, true, true));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = m34[1];
                        }
                        vec2 GLF_live0uvstep = _GLF_FUZZED((86.20 * vec2(72.47, -7510.4679)));
                        {
                            int GLF_live0looplimiter0 = 0;
                            while (GLF_live0h < GLF_live0refh && GLF_live0i < 32) {
                                {
                                    float GLF_live5c_im = _GLF_FUZZED((-403.209));
                                    float GLF_live5c_re = _GLF_FUZZED((2.6 + 53.56));
                                    int GLF_live5iteration = _GLF_FUZZED((~(57236 ^ (~45178))));
                                    int GLF_live5looplimiter0 = 0;
                                    float GLF_live5x = _GLF_FUZZED(51.59);
                                    float GLF_live5y = _GLF_FUZZED(float(51833u));
                                    for (int GLF_live5k = 0; GLF_live5k < 1000; GLF_live5k++) {
                                        if (GLF_live5looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live5looplimiter0++;
                                        {
                                            if (_GLF_IDENTITY(GLF_live5x * GLF_live5x + GLF_live5y * GLF_live5y > 4.0, _GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))) || (GLF_live5x * GLF_live5x + GLF_live5y * GLF_live5y > 4.0))) {
                                                break;
                                            }
                                            float GLF_live5x_new = GLF_live5x * GLF_live5x - GLF_live5y * _GLF_IDENTITY(GLF_live5y, mix(float(GLF_live5y), float(_GLF_FUZZED((true ? 530.626 : 0.3))), bool(false))) + GLF_live5c_re;
                                            GLF_live5y = 2.0 * GLF_live5x * GLF_live5y + GLF_live5c_im;
                                            GLF_live5x = GLF_live5x_new;
                                            _GLF_IDENTITY(GLF_live5iteration++, 0 + (GLF_live5iteration++));
                                        }
                                    }
                                }
                                if (GLF_live0looplimiter0 >= 6) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            _GLF_color = GLF_live3_GLF_color;
                                        }
                                        _GLF_color = vec4(-27.15, -5.9, -9.9, -6.0);
                                    }
                                }
                                if (_GLF_IDENTITY(_GLF_DEAD(false), true && (_GLF_DEAD(false)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        {
                                            ivec2 GLF_live6pos = _GLF_FUZZED((ivec2(77309, 95644) * (_GLF_IDENTITY(ivec2(-_GLF_IDENTITY(86265, clamp(86265, _GLF_IDENTITY(86265, max(86265, 86265)), _GLF_IDENTITY(86265, 0 ^ (86265)))), 37921), (ivec2(-_GLF_IDENTITY(86265, clamp(86265, _GLF_IDENTITY(86265, max(86265, 86265)), _GLF_IDENTITY(86265, 0 ^ (86265)))), 37921)) | ivec2(0, 0)) * ivec2(_GLF_IDENTITY(79526, (79526) << 0), -66080))));
                                            if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                                float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                                ;
                                            }
                                        }
                                        _GLF_color = GLF_live3_GLF_color;
                                    }
                                    _GLF_IDENTITY(_GLF_color = GLF_live3_GLF_color, (_GLF_color = GLF_live3_GLF_color) / vec4(1.0, 1.0, 1.0, 1.0));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        ivec2 GLF_live6pos = _GLF_FUZZED((ivec2(_GLF_IDENTITY(-8444, (_GLF_IDENTITY(-8444, (-8444) / 1)) | (-8444)), 9033) & ivec2(-9255, 40210).y));
                                        {
                                            float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    break;
                                }
                                GLF_live0looplimiter0++;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    continue;
                                }
                                {
                                    GLF_live0coord -= GLF_live0uvstep;
                                    GLF_live0refh += _GLF_struct_replacement_3._f0.GLF_live0slope;
                                    {
                                        float GLF_live5c_im = _GLF_FUZZED((-1.7));
                                        float GLF_live5c_re = _GLF_FUZZED(((+9703.8200)));
                                        int GLF_live5iteration = _GLF_FUZZED(-64351);
                                        float GLF_live5x = _GLF_FUZZED(vec4(-7222.7865, -9841.4156, 7.3, 587.638).a);
                                        float GLF_live5y = _GLF_FUZZED(-968.517);
                                        {
                                            if (GLF_live5x * GLF_live5x + GLF_live5y * GLF_live5y > 4.0) {
                                                ;
                                            }
                                            float GLF_live5x_new = GLF_live5x * GLF_live5x - GLF_live5y * GLF_live5y + GLF_live5c_re;
                                            GLF_live5y = 2.0 * GLF_live5x * GLF_live5y + GLF_live5c_im;
                                            GLF_live5x = GLF_live5x_new;
                                            GLF_live5iteration++;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    GLF_live0h = texture(GLF_live0tex, _GLF_IDENTITY(GLF_live0coord, (GLF_live0coord) * mat2(1.0))).y;
                                    {
                                        float GLF_live5xCoord = _GLF_FUZZED(float((ivec3(-43502, 63404, -89035) != ivec3(57160, -50581, 96440))));
                                        float GLF_live5yCoord = _GLF_FUZZED(23.57);
                                        {
                                            ;
                                        }
                                    }
                                    GLF_live0i++;
                                    {
                                        int GLF_live5looplimiter0 = 0;
                                        if (GLF_live5looplimiter0 >= 7) {
                                            ;
                                        }
                                    }
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                return;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_live3_GLF_color;
                                                }
                                            } else {
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    do {
                                        {
                                            ivec2 GLF_live6pos = _GLF_FUZZED((ivec2(-9065, -43141) ^ (-76772)));
                                            if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                                float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                                ;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(-3.9, -97.68, 53.65, 86.37);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = ((m44 * one) * asin(_GLF_color));
                                                {
                                                    ivec2 GLF_live6pos = _GLF_FUZZED(((ivec2(9328) - ivec3(96145, -24549, _GLF_IDENTITY(48040, min(48040, _GLF_IDENTITY(48040, (48040) >> 0)))).zy) - ivec2(94715, -74501)));
                                                    {
                                                        int GLF_live6looplimiter0 = 0;
                                                        while (GLF_live6pos.y != 256) {
                                                            if (_GLF_IDENTITY(GLF_live6looplimiter0, (0 ^ 0) | (GLF_live6looplimiter0)) >= 5) {
                                                                break;
                                                            }
                                                            GLF_live6looplimiter0++;
                                                            {
                                                                if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                                                    float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                                                    ;
                                                                }
                                                                _GLF_IDENTITY(GLF_live6pos.y++, 0 | (GLF_live6pos.y++));
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_outlined_0(_GLF_color);
                                        _GLF_color = vec4(113.502, -2.2, 7.1, -734.165);
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = unpackUnorm4x8((~matrix_number));
                                        }
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        do {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) && true)) {
                                            _GLF_color = tan(trunc(dFdxCoarse(_GLF_outVarBackup_GLF_color)));
                                        }
                                    }
                                }
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                        _GLF_color = vec4(25.75, 658.862, -1.5, 3.2);
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (mat4(-31.91, 937.126, -0.3, 9.5, 0.3, 961.399, -6.5, 4.5, -7910.8166, 1.9, 126.718, 1.9, -0.1, -36.85, 26.49, 22.16) * vec4(2888.4576, -1290.4547, -7.7, 6364.0497));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(0.0))))) {
                                        _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_color = _GLF_outVarBackup_GLF_color) * cos(vec4(0.0, 0.0, 0.0, 0.0)))) + vec4(0.0, 0.0, 0.0, 0.0))) - vec4(0.0, 0.0, 0.0, 0.0));
                                    }
                                }
                            }
                        }
                        {
                            ivec2 GLF_live6pos = _GLF_FUZZED(ivec2(ivec4(ivec2(23740, -63535), -_GLF_IDENTITY(55103, int(_GLF_IDENTITY(ivec4(55103, (1 & 1), 1, 0), ivec4(0, 0, 0, 0) + (ivec4(55103, (1 & 1), 1, 0))))), 57584)));
                            if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / _GLF_IDENTITY(15.0, clamp(15.0, 15.0, _GLF_IDENTITY(15.0, (true ? 15.0 : _GLF_FUZZED(GLF_live0h)))));
                                ;
                            }
                        }
                    }
                    switch (matrix_number) {
                        case 0u:
                            m22[c][r] = one;
                            {
                                {
                                    ;
                                }
                            }
                            break;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (_GLF_IDENTITY(gl_FragCoord, min(gl_FragCoord, gl_FragCoord))) / vec4(_GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y))).x < 0.0)))) {
                                    _GLF_color = _GLF_outlined_11(GLF_live3_GLF_color);
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_outlined_1(_GLF_color);
                                _GLF_color = vec4(486.965, -8.2, _GLF_IDENTITY(789.501, (true ? 789.501 : _GLF_FUZZED(-67.74))), -60.01);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            {
                                {
                                    ;
                                }
                            }
                        case 1u:
                            m23[c][r] = one;
                            if (_GLF_DEAD(false)) {
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                            break;
                        case 2u:
                            m24[c][r] = one;
                            break;
                        case 3u:
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live3_GLF_color;
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(8), int(8))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    _GLF_color = vec4(-18.18, -0.0, -2.3, -8.2);
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_outlined_12();
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, mix(vec4(_GLF_FUZZED(6.7), (_GLF_outVarBackup_GLF_color)[1], _GLF_FUZZED(1.6), (_GLF_outVarBackup_GLF_color)[3]), vec4((_GLF_outVarBackup_GLF_color)[0], _GLF_FUZZED((+1015.4407)), (_GLF_outVarBackup_GLF_color)[2], _GLF_FUZZED(66.70)), bvec4(true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true, false)));
                                }
                            }
                            m32[c][r] = one;
                            break;
                        case 4u:
                            {
                                int GLF_live2directions = _GLF_FUZZED(33880);
                                _GLF_struct_5 _GLF_struct_replacement_5 = _GLF_struct_5(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_6(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, (1.0) * cos(0.0)), 1.0, 1.0), uvec2(1u, 1u), bvec2(true, true), mat2(1.0, 1.0, 1.0, 1.0), _GLF_FUZZED((50879 | (+ivec2(-33164, -57190)))), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, (1.0) - log(1.0)))), uvec4(1u, 1u, _GLF_IDENTITY(1u, (1u) | (1u)), 1u));
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_struct_replacement_5._f1.GLF_live2p.y < 14 && GLF_live2map[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY((GLF_live2p.x) + (GLF_live2p.y + 2) * 16, ((_GLF_struct_replacement_5._f1.GLF_live2p.x) + (_GLF_struct_replacement_5._f1.GLF_live2p.y + 2) * 16) / 1), 256)] == 0) {
                                    GLF_live2directions += 1;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = clamp(GLF_live3_GLF_color, 5.3, tanh(7057.5966));
                                }
                            }
                            m33[c][r] = one;
                            break;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live3_GLF_color;
                            }
                        case 5u:
                            m34[c][r] = _GLF_IDENTITY(one, mix(float(one), float(_GLF_FUZZED(-48.87)), bool(false)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            break;
                            do {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = atan(fwidthFine(_GLF_color), GLF_live3_GLF_color);
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, sin(0.0), 0.0, 0.0))))));
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        case 6u:
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < abs(0.0), bool(bvec2(_GLF_IDENTITY(gl_FragCoord.x < abs(0.0), (_GLF_IDENTITY(gl_FragCoord.x < abs(0.0), (gl_FragCoord.x < abs(0.0)) || false)) && true), true))))))) {
                                    _GLF_color = _GLF_IDENTITY(GLF_live3_GLF_color, _GLF_IDENTITY(vec4(vec4(GLF_live3_GLF_color)), (vec4(vec4(GLF_live3_GLF_color))) / vec4(1.0, 1.0, 1.0, 1.0)));
                                }
                                float GLF_live3x2 = _GLF_FUZZED(_GLF_IDENTITY((-3.8), (true ? (-3.8) : _GLF_FUZZED(ldexp(-1.0, r)))));
                                if (_GLF_IDENTITY(GLF_live3x2 <= -0.9 && _GLF_IDENTITY(GLF_live3x2 >= -1.1, !(!(GLF_live3x2 >= -1.1))), !(!(GLF_live3x2 <= -0.9 && _GLF_IDENTITY(GLF_live3x2 >= -1.1, !(!(GLF_live3x2 >= -1.1))))))) {
                                    {
                                        int GLF_live6looplimiter0 = 0;
                                        ivec2 GLF_live6pos = _GLF_FUZZED(ivec2(40300, 49442));
                                        {
                                            if (GLF_live6looplimiter0 >= _GLF_IDENTITY(5, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? 5 : _GLF_FUZZED(c)))) {
                                                ;
                                            }
                                            GLF_live6looplimiter0++;
                                            {
                                                if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                                    float GLF_live6p = (15.0 - abs(float(_GLF_IDENTITY(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)], (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(c) : _GLF_IDENTITY(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)], clamp(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)], _GLF_IDENTITY(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)], 0 | (GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)])), _GLF_IDENTITY(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)], (GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]) << 0)))))))) / 15.0;
                                                    ;
                                                }
                                                GLF_live6pos.y++;
                                            }
                                        }
                                    }
                                    _GLF_IDENTITY(GLF_live3_GLF_color = vec4(1.0, 0.0, 0.0, 1.0), (false ? _GLF_FUZZED(GLF_live3_GLF_color) : _GLF_IDENTITY(GLF_live3_GLF_color = vec4(1.0, 0.0, 0.0, 1.0), (GLF_live3_GLF_color = vec4(1.0, 0.0, 0.0, 1.0)) - vec4(0.0, 0.0, 0.0, 0.0))));
                                } else {
                                    GLF_live3_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (vec4(3.2, -17.45, -0.7, 3748.9929) + _GLF_color);
                            }
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = _GLF_color;
                                    {
                                        float GLF_live5c_im = _GLF_FUZZED(-588.761);
                                        float GLF_live5c_re = _GLF_FUZZED(445.607);
                                        int GLF_live5iteration = _GLF_FUZZED(_GLF_IDENTITY(21872, int(ivec4(_GLF_IDENTITY(21872, ~(~(21872))), 0, 0, 0))));
                                        int GLF_live5looplimiter0 = 0;
                                        float GLF_live5x = _GLF_FUZZED(246.825);
                                        float GLF_live5y = _GLF_FUZZED(6.6);
                                        {
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                if (_GLF_IDENTITY(GLF_live5looplimiter0, (true ? _GLF_IDENTITY(GLF_live5looplimiter0, min(GLF_live5looplimiter0, _GLF_IDENTITY(GLF_live5looplimiter0, (GLF_live5looplimiter0) ^ 0))) : _GLF_FUZZED(GLF_live5looplimiter0))) >= 7) {
                                                    ;
                                                }
                                            }
                                            GLF_live5looplimiter0++;
                                            {
                                                if (GLF_live5x * GLF_live5x + GLF_live5y * GLF_live5y > _GLF_IDENTITY(4.0, mix(float(_GLF_FUZZED(2848.6565)), float(_GLF_IDENTITY(4.0, mix(float(_GLF_IDENTITY(4.0, (true ? 4.0 : _GLF_FUZZED(one)))), float(_GLF_FUZZED(795.899)), bool(false)))), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))))) {
                                                    ;
                                                }
                                                float GLF_live5x_new = GLF_live5x * GLF_live5x - GLF_live5y * GLF_live5y + GLF_live5c_re;
                                                GLF_live5y = 2.0 * GLF_live5x * GLF_live5y + GLF_live5c_im;
                                                GLF_live5x = GLF_live5x_new;
                                                GLF_live5iteration++;
                                            }
                                        }
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-289.333, 765.772, -4.9, 6.3);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bvec3(false, false, false), bvec3(bvec3(bvec3(false, false, false)))))))) {
                                        _GLF_color = mod(GLF_live3_GLF_color, _GLF_outVarBackup_GLF_color);
                                    }
                                }
                            }
                            m42[c][r] = one;
                            break;
                        case 7u:
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    {
                                        ;
                                    }
                                }
                                _GLF_color = _GLF_color;
                            }
                            {
                                {
                                    int GLF_live5looplimiter2 = 0;
                                    if (GLF_live5looplimiter2 >= 7) {
                                        ;
                                    }
                                }
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, _GLF_IDENTITY(injectionSwitch.y, max(injectionSwitch.y, injectionSwitch.y))))); _injected_loop_counter++) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        discard;
                                        {
                                            {
                                                ;
                                            }
                                        }
                                    }
                                }
                                bool GLF_live2canwalk = _GLF_FUZZED(false);
                                int GLF_live2i = _GLF_IDENTITY(_GLF_FUZZED((_GLF_IDENTITY((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))), 0 ^ (_GLF_IDENTITY((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))), 0 + ((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))))))))), max(_GLF_IDENTITY(_GLF_FUZZED((_GLF_IDENTITY((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))), 0 ^ (_GLF_IDENTITY((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))), 0 + ((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))))))))), (_GLF_FUZZED((_GLF_IDENTITY((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))), 0 ^ (_GLF_IDENTITY((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))), 0 + ((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1)))))))))) - (0 ^ 0)), _GLF_IDENTITY(_GLF_FUZZED((_GLF_IDENTITY((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))), 0 ^ (_GLF_IDENTITY((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))), 0 + ((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))))))))), ~(~(_GLF_FUZZED((_GLF_IDENTITY((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))), 0 ^ (_GLF_IDENTITY((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))), 0 + ((-35643) - _GLF_IDENTITY((-86023), int(_GLF_IDENTITY(int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0)), (int(_GLF_IDENTITY((-86023), (_GLF_IDENTITY((-86023), int(ivec4((-86023), 0, 1, 0)))) ^ 0))) * 1))))))))))))));
                                int GLF_live2j = _GLF_FUZZED(_GLF_IDENTITY(74924, 0 | (_GLF_IDENTITY(74924, min(74924, 74924)))));
                                ivec2 GLF_live2p = _GLF_IDENTITY(_GLF_FUZZED((ivec2(-23558, -27629) + (-33768))), (_GLF_FUZZED((ivec2(-23558, -27629) + (-33768)))) >> ivec2(0, 0));
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = max(_GLF_color, _GLF_IDENTITY(one, mix(float(one), float(_GLF_FUZZED(55.34)), bool(false))));
                                }
                                {
                                    GLF_live2p.x = GLF_live2j * 2;
                                    GLF_live2p.y = GLF_live2i * 2;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(3.3, _GLF_IDENTITY(-2.5, (false ? _GLF_FUZZED(3.4) : (-2.5))), -2.4, 890.918);
                                    }
                                    GLF_live2canwalk = true;
                                }
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = GLF_live3_GLF_color;
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                vec4 _GLF_outVarBackup_GLF_color;
                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 | 1)); _injected_loop_counter++) {
                                    {
                                        int GLF_live6looplimiter0 = 0;
                                        if (GLF_live6looplimiter0 >= 5) {
                                            ;
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_outlined_13(GLF_live3_GLF_color);
                                }
                                _GLF_color = vec4(0.6, 8.9, 4236.3117, 29.99);
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                    int GLF_live6looplimiter0 = 0;
                                    ivec2 GLF_live6pos = _GLF_FUZZED(ivec2(79790, 71849));
                                    while (GLF_live6pos.y != 256) {
                                        if (GLF_live6looplimiter0 >= 5) {
                                            break;
                                        }
                                        GLF_live6looplimiter0++;
                                        {
                                            if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                                float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                                ;
                                            }
                                            GLF_live6pos.y++;
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_IDENTITY(_GLF_color = (mat4(4.1, -9222.5976, -3.4, 1.8, -462.463, -1.0, 9.1, 5.0, 19.49, -628.843, -983.251, 9.1, -488.223, 4112.1872, 6869.5756, -2739.8941) * _GLF_outVarBackup_GLF_color), (_GLF_IDENTITY(_GLF_color = (mat4(4.1, -9222.5976, -3.4, 1.8, -462.463, -1.0, 9.1, 5.0, 19.49, -628.843, -983.251, 9.1, -488.223, 4112.1872, 6869.5756, -2739.8941) * _GLF_outVarBackup_GLF_color), (_GLF_IDENTITY(_GLF_color = (mat4(4.1, -9222.5976, -3.4, 1.8, -462.463, -1.0, 9.1, 5.0, 19.49, -628.843, -983.251, 9.1, -488.223, 4112.1872, 6869.5756, -2739.8941) * _GLF_outVarBackup_GLF_color), (_GLF_color = (mat4(4.1, -9222.5976, -3.4, 1.8, -462.463, -1.0, 9.1, 5.0, 19.49, -628.843, -983.251, 9.1, -488.223, 4112.1872, 6869.5756, -2739.8941) * _GLF_outVarBackup_GLF_color)) - vec4(0.0, 0.0, 0.0, 0.0))) + vec4(0.0, 0.0, 0.0, 0.0))) + vec4(0.0, 0.0, 0.0, 0.0));
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                            _GLF_color = min(_GLF_color, -89.79);
                                        }
                                    }
                                }
                            } else {
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, max(injectionSwitch.x, injectionSwitch.x)) > injectionSwitch.y)))) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    {
                                        ;
                                    }
                                } else {
                                }
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                    _GLF_color = vec4(_GLF_IDENTITY(-56.77, max(-56.77, -56.77)), 81.17, 3.5, 4.5);
                                }
                            }
                            _GLF_IDENTITY(m43[c][r] = one, (m43[c][r] = one) - 0.0);
                            if (_GLF_DEAD(false)) {
                                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(-0.5, _GLF_IDENTITY(8.4, mix(float(_GLF_FUZZED(18.02)), float(8.4), bool(true))), 3.6, -0.8);
                                    }
                                }
                                continue;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                            break;
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(518.529, 2.4, 58.12, -_GLF_IDENTITY(7544.7593, mix(float(_GLF_FUZZED(3382.0261)), float(7544.7593), bool(true))));
                                }
                                {
                                    int GLF_live5looplimiter0 = 0;
                                    if (GLF_live5looplimiter0 >= 7) {
                                        ;
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_outlined_14(_GLF_color);
                                _GLF_color = vec4(-9.9, -5770.7052, 4.0, -413.593);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        {
                                            int GLF_live6looplimiter0 = 0;
                                            ivec2 GLF_live6pos = _GLF_FUZZED(ivec2(13974, -84089));
                                            while (GLF_live6pos.y != 256) {
                                                if (GLF_live6looplimiter0 >= 5) {
                                                    break;
                                                }
                                                GLF_live6looplimiter0++;
                                                {
                                                    if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live6pos, ~(_GLF_IDENTITY(~(_GLF_IDENTITY(GLF_live6pos, ivec2(GLF_live6pos[0], _GLF_IDENTITY(GLF_live6pos[1], (GLF_live6pos[1]) * 1)))), (~(_GLF_IDENTITY(GLF_live6pos, ivec2(GLF_live6pos[0], _GLF_IDENTITY(GLF_live6pos[1], (GLF_live6pos[1]) * 1))))) * ivec2(1, 1)))).y, 256)] - 15) {
                                                        float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                                        ;
                                                    }
                                                    GLF_live6pos.y++;
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = clamp(_GLF_outVarBackup_GLF_color, vec4(42.85, -1797.3504, 1867.3164, 6.9), GLF_live3_GLF_color);
                                            {
                                                int GLF_live6looplimiter0 = 0;
                                                ivec2 GLF_live6pos = _GLF_FUZZED(ivec2(93786, -74886));
                                                {
                                                    if (GLF_live6looplimiter0 >= 5) {
                                                        ;
                                                    }
                                                    GLF_live6looplimiter0++;
                                                    {
                                                        if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                                            float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                                            ;
                                                        }
                                                        GLF_live6pos.y++;
                                                    }
                                                }
                                            }
                                        } else {
                                        }
                                    }
                                    {
                                        float GLF_live5xCoord = _GLF_FUZZED(96.41);
                                        float GLF_live5yCoord = _GLF_FUZZED(88.15);
                                        {
                                            ;
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        case 8u:
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_IDENTITY(_GLF_color, _GLF_IDENTITY((_GLF_color) * mat4(1.0), (_GLF_IDENTITY((_GLF_color) * mat4(1.0), max((_GLF_color) * mat4(1.0), (_GLF_color) * mat4(1.0)))) * vec4(1.0, 1.0, 1.0, 1.0)));
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = vec4(-7787.5169, vec3(-8.0, 3.0, 0.4));
                                }
                            }
                            {
                                {
                                    float GLF_live5x = _GLF_FUZZED((vec2(-7.2, _GLF_IDENTITY(-940.541, 0.0 + (-940.541))) * mat2(58.77, -_GLF_IDENTITY(8.8, clamp(_GLF_IDENTITY(8.8, (8.8) / 1.0), 8.8, 8.8)), -14.95, -222.457)).x);
                                    float GLF_live5y = _GLF_FUZZED(float(161727u));
                                    if (GLF_live5x * GLF_live5x + GLF_live5y * GLF_live5y > 4.0) {
                                        ;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                    return;
                                }
                                {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = min(GLF_live3_GLF_color, sinh(GLF_live3_GLF_color));
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < 0.0), ((gl_FragCoord.y < 0.0)) && true)))) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-2.5, -21.15, 907.866, -0.9);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = vec4(875.644, -620.031, 13.69, -4.1);
                                            }
                                        } else {
                                        }
                                        continue;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            {
                                                int GLF_live6looplimiter0 = 0;
                                                ivec2 GLF_live6pos = _GLF_FUZZED(ivec2(63528, -91595));
                                                {
                                                    if (GLF_live6looplimiter0 >= 5) {
                                                        ;
                                                    }
                                                    GLF_live6looplimiter0++;
                                                    {
                                                        if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                                            float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live6pos, ~(~(_GLF_IDENTITY(GLF_live6pos, (true ? _GLF_IDENTITY(GLF_live6pos, ivec2(ivec4(GLF_live6pos, 0, 0))) : _GLF_FUZZED(GLF_live6pos)))))).y, 256)]))) / 15.0;
                                                            ;
                                                        }
                                                        GLF_live6pos.y++;
                                                    }
                                                }
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_outlined_2(_GLF_color);
                                            _GLF_color = vec4(-7490.7459, 8.2, 2.6, -54.56);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(_GLF_color.w, -9348.5550, 86.91, one);
                                        }
                                    }
                                    for (int _injected_loop_counter = _GLF_IDENTITY(0, 0 + (0)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_IDENTITY(_GLF_ONE(1.0, injectionSwitch.y), (_GLF_ONE(1.0, injectionSwitch.y)) * 1.0)) | 1)); _injected_loop_counter++) {
                                        ;
                                    }
                                    {
                                        ivec2 GLF_live6pos = _GLF_FUZZED((~ivec2(-63699, 71824)));
                                        {
                                            if (_GLF_IDENTITY(GLF_live6pos.x, (GLF_live6pos.x) | (GLF_live6pos.x)) < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && _GLF_IDENTITY(GLF_live6pos.x, (GLF_live6pos.x) * int(_GLF_ONE(1.0, injectionSwitch.y))) > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                                float GLF_live6p = _GLF_IDENTITY((15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0, ((15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0) / _GLF_IDENTITY(dot(vec4(0.0, 0.0, 0.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(0.0, 0.0, 0.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0))));
                                                ;
                                            }
                                            GLF_live6pos.y++;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3]))) * vec4(1.0, 1.0, 1.0, 1.0)).y < 0.0)))) {
                                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3))) << _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), 0 ^ (_GLF_IDENTITY(int(3), ~(~(int(3)))))))) >> _GLF_IDENTITY(int(3), int(3)))); _injected_loop_counter++) {
                                            _GLF_color = ceil(vec4(7.1, 5839.3721, 5.9, -588.860));
                                        }
                                    }
                                    {
                                        {
                                            ;
                                        }
                                    }
                                }
                            }
                            m44[c][r] = one;
                            break;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = vec4(2.3, 4350.4181, 5103.8219, -6.7);
                        do {
                            ivec2 GLF_live6pos = _GLF_FUZZED((((mat3x2(-5811.5871, -0.4, 0.7, 0.3, -188.910, -540.114) == mat3x2(3.5, -9.2, 2876.2982, -13.85, -_GLF_IDENTITY(6255.3390, max(6255.3390, 6255.3390)), -2866.7201)) && _GLF_IDENTITY(false, false || (false))) ? ivec2(14439, -31570) : ivec2(-42751, -88501)));
                            {
                                if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                    float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                    ;
                                }
                                GLF_live6pos.y++;
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    {
                        ivec2 GLF_live6pos = _GLF_FUZZED((ivec2(62583, -82918) * 71362));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            int GLF_live6looplimiter0 = 0;
                            while (GLF_live6pos.y != 256) {
                                if (GLF_live6looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live6looplimiter0++;
                                {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, bool(bvec4(_GLF_IDENTITY(false, (false) || false), true, false, true))))) {
                                    } else {
                                        if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                            float GLF_live6p = (15.0 - abs(float(_GLF_IDENTITY(GLF_live6pos, min(GLF_live6pos, GLF_live6pos)).x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                            ;
                                        }
                                    }
                                    GLF_live6pos.y++;
                                }
                            }
                        } else {
                        }
                    }
                }
            }
            _GLF_IDENTITY(matrix_number = _GLF_IDENTITY(matrix_number, 0u + (matrix_number)) + 1u, 0u ^ (_GLF_IDENTITY(matrix_number = _GLF_IDENTITY(matrix_number, 0u + (matrix_number)) + 1u, 0u + (matrix_number = _GLF_IDENTITY(matrix_number, 0u + (matrix_number)) + 1u))));
        }
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < 0.0), bool(bvec4((gl_FragCoord.x < 0.0), false, true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))), true && (_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < 0.0), bool(bvec4((gl_FragCoord.x < 0.0), false, true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))))))) {
            return;
            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, _GLF_IDENTITY((gl_FragCoord.y), min((gl_FragCoord.y), _GLF_IDENTITY((gl_FragCoord.y), ((gl_FragCoord.y)) + sin(0.0)))) / 1.0) < tan(log(1.0)))))) {
                _GLF_IDENTITY(_GLF_color = degrees(GLF_live3_GLF_color), vec4(1.0, 1.0, 1.0, 1.0) * (_GLF_color = degrees(GLF_live3_GLF_color)));
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            int GLF_live6looplimiter0 = 0;
            ivec2 GLF_live6pos = _GLF_FUZZED((ivec2(2285, -60384) | ivec2(-44126, 7825)));
            {
                if (_GLF_IDENTITY(GLF_live6looplimiter0, (GLF_live6looplimiter0) | (GLF_live6looplimiter0)) >= 5) {
                    ;
                }
                GLF_live6looplimiter0++;
                {
                    if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > _GLF_IDENTITY(GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15, int(_GLF_IDENTITY(int(GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15), min(int(GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15), int(GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15)))))) {
                        float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                        ;
                    }
                    GLF_live6pos.y++;
                }
            }
        }
        _GLF_color = degrees(vec4(1.8, 0.3, 7.2, -4861.5437));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
        _GLF_color = GLF_live3_GLF_color;
    }
    {
        ivec2 GLF_live6pos = _GLF_FUZZED((ivec2(-37217, 92280) & (-58688)));
        if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
            float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
            ;
        }
    }
    float sums[9];
    int sum_index = 0;
    if (_GLF_DEAD(false)) {
        _GLF_color = atan(vec4(-92.79, -3519.1373, -6.4, -71.11));
        {
            float GLF_live5xCoord = _GLF_FUZZED((float(94500) * float(40891u)));
            float GLF_live5yCoord = _GLF_FUZZED(-1710.2372);
            {
                ;
            }
        }
    }
    {
        int GLF_live5looplimiter3 = 0;
        if (GLF_live5looplimiter3 >= 7) {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    for (int cols = 2; cols <= 4; cols++) {
        {
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        int GLF_live6looplimiter0 = 0;
                        if (GLF_live6looplimiter0 >= 5) {
                            ;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 0.0, 1.0, _GLF_IDENTITY(0.0, (_GLF_IDENTITY(0.0, max(0.0, 0.0))) - length(tan(vec4(0.0, 0.0, 0.0, 0.0)))), _GLF_IDENTITY(0.0, (false ? _GLF_FUZZED(sinh(distance(_GLF_color, _GLF_color))) : 0.0)), 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))))) {
                        _GLF_color = atan(GLF_live3_GLF_color, vec4(-355.609, -711.112, -4.7, _GLF_IDENTITY(-2190.4043, min(-2190.4043, _GLF_IDENTITY(-2190.4043, (-2190.4043) / 1.0)))));
                    }
                    _GLF_color = vec4(-8.3, -4.8, -8.5, 50.88);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= length(vec3(0.0, 0.0, 0.0)))), !(!(_GLF_TRUE(true, (gl_FragCoord.x >= length(vec3(0.0, 0.0, 0.0))))))))) {
                        _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, vec4(_GLF_outVarBackup_GLF_color[0], _GLF_outVarBackup_GLF_color[1], _GLF_outVarBackup_GLF_color[2], _GLF_outVarBackup_GLF_color[3]));
                    }
                }
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    continue;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                        {
                            int GLF_live6looplimiter0 = 0;
                            ivec2 GLF_live6pos = _GLF_IDENTITY(_GLF_FUZZED(ivec2(48756, -30574)), (_GLF_FUZZED(ivec2(48756, -30574))) - ivec2(0, 0));
                            {
                                if (GLF_live6looplimiter0 >= 5) {
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        ;
                                    }
                                }
                                GLF_live6looplimiter0++;
                                {
                                    if (GLF_live6pos.x < GLF_live6dp[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), (_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)) | (_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), clamp(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), _GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), _GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)))))] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live6pos.y, (GLF_live6pos.y) * 1), 256)] - 15) {
                                        float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                    GLF_live6pos.y++;
                                }
                            }
                        }
                    }
                }
                {
                    int GLF_live6looplimiter0 = 0;
                    if (GLF_live6looplimiter0 >= 5) {
                        ;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = mat4(6.6, 263.880, 9016.6051, -1.5, -648.819, 3.4, 5084.8126, -7.4, _GLF_IDENTITY(-1345.2064, 1.0 * (-1345.2064)), 3.7, -6.2, -95.75, 6875.1213, 5674.7029, 37.54, 6.4)[3];
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0))))))) {
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outlined_15();
                        }
                    }
                }
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            {
                ivec2 GLF_live6pos = _GLF_FUZZED(ivec3(25512, -34273, -74495).ts);
                {
                    int GLF_live6looplimiter0 = _GLF_IDENTITY(0, ~(~(_GLF_IDENTITY(0, 0 | (0)))));
                    while (GLF_live6pos.y != 256) {
                        if (GLF_live6looplimiter0 >= 5) {
                            break;
                        }
                        GLF_live6looplimiter0++;
                        {
                            if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                float GLF_live6p = (_GLF_IDENTITY(15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), (_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), _GLF_IDENTITY(int(ivec3(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), 1, 0)), min(int(ivec3(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), 1, 0)), int(ivec3(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), 1, 0)))))) - 0)])), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)) ? _GLF_FUZZED(sqrt(one)) : (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), (_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), _GLF_IDENTITY(int(ivec3(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), 1, 0)), min(int(ivec3(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), 1, 0)), int(ivec3(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), 1, 0)))))) - 0)])))))) / 15.0;
                                ;
                            }
                            GLF_live6pos.y++;
                        }
                    }
                }
            }
            for (int rows = 2; rows <= 4; rows++) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = (vec4(28.66, 4.9, -8.0, 122.060) * one);
                    }
                    _GLF_color = acos(_GLF_color);
                }
                _GLF_IDENTITY(sums[sum_index] = 0.0, 1.0 * (sums[sum_index] = 0.0));
                for (int c = 0; c < cols; c++) {
                    for (int r = 0; r < rows; r++) {
                        switch (sum_index) {
                            case 0:
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live3_GLF_color;
                                    {
                                        int GLF_live6looplimiter0 = 0;
                                        if (GLF_live6looplimiter0 >= 5) {
                                            ;
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, determinant(mat3(0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)))), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, determinant(mat3(0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)))), clamp(dot(_GLF_IDENTITY(vec2(0.0, 1.0), max(vec2(0.0, 1.0), vec2(0.0, 1.0))), vec2(1.0, determinant(mat3(0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)))), dot(vec2(0.0, 1.0), vec2(1.0, determinant(mat3(0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)))), dot(vec2(0.0, 1.0), vec2(1.0, determinant(mat3(0.0, 1.0, 1.0, 0.0, _GLF_IDENTITY(0.0, clamp(_GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED((9142.3078 * 2770.5770))), float(0.0), bool(true))), 0.0, 0.0)), 1.0, 0.0, 0.0, 0.0))))))))))) {
                                } else {
                                    sums[sum_index] += m22[c][r];
                                }
                                break;
                                {
                                    {
                                        ;
                                    }
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                            case 1:
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = GLF_live3_GLF_color;
                                }
                                sums[sum_index] += m23[c][r];
                                break;
                            case 2:
                                sums[sum_index] += m24[c][r];
                                if (_GLF_DEAD(false)) {
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_IDENTITY(ceil(vec4(_GLF_IDENTITY(-7240.4733, float(_GLF_IDENTITY(mat3x2(-7240.4733, 0.0, 0.0, 1.0, 1.0, 0.0), transpose(transpose(mat3x2(-7240.4733, 0.0, 0.0, 1.0, 1.0, 0.0)))))), -_GLF_IDENTITY(2.2, 0.0 + (_GLF_IDENTITY(2.2, (2.2) - 0.0))), -6.3, 4086.0620)), mix(vec4(_GLF_FUZZED(-1.2), (ceil(vec4(_GLF_IDENTITY(-7240.4733, float(_GLF_IDENTITY(mat3x2(-7240.4733, 0.0, 0.0, 1.0, 1.0, 0.0), transpose(transpose(mat3x2(-7240.4733, 0.0, 0.0, 1.0, 1.0, 0.0)))))), -_GLF_IDENTITY(2.2, 0.0 + (_GLF_IDENTITY(2.2, (2.2) - 0.0))), -6.3, 4086.0620)))[1], (ceil(vec4(_GLF_IDENTITY(-7240.4733, float(_GLF_IDENTITY(mat3x2(-7240.4733, 0.0, 0.0, 1.0, 1.0, 0.0), transpose(transpose(mat3x2(-7240.4733, 0.0, 0.0, 1.0, 1.0, 0.0)))))), -_GLF_IDENTITY(2.2, 0.0 + (_GLF_IDENTITY(2.2, (2.2) - 0.0))), -6.3, 4086.0620)))[2], _GLF_FUZZED(-5.5)), vec4((ceil(vec4(_GLF_IDENTITY(-7240.4733, float(_GLF_IDENTITY(mat3x2(-7240.4733, 0.0, 0.0, 1.0, 1.0, 0.0), transpose(transpose(mat3x2(-7240.4733, 0.0, 0.0, 1.0, 1.0, 0.0)))))), -_GLF_IDENTITY(2.2, 0.0 + (_GLF_IDENTITY(2.2, (2.2) - 0.0))), -6.3, 4086.0620)))[0], _GLF_FUZZED(vec3(-64.91, 1.1, -1560.7791).t), _GLF_FUZZED(6.1), (ceil(vec4(_GLF_IDENTITY(-7240.4733, float(_GLF_IDENTITY(mat3x2(-7240.4733, 0.0, 0.0, 1.0, 1.0, 0.0), transpose(transpose(mat3x2(-7240.4733, 0.0, 0.0, 1.0, 1.0, 0.0)))))), -_GLF_IDENTITY(2.2, 0.0 + (_GLF_IDENTITY(2.2, (2.2) - 0.0))), -6.3, 4086.0620)))[3]), bvec4(true, _GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))), false, true)));
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = asin(_GLF_color);
                                }
                                break;
                                {
                                    {
                                        ;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    break;
                                }
                            case 3:
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    {
                                        int GLF_live7looplimiter0 = 0;
                                        if (_GLF_IDENTITY(GLF_live7looplimiter0, ~(~(GLF_live7looplimiter0))) >= 4) {
                                            ;
                                        }
                                    }
                                    _GLF_color = _GLF_outlined_16(_GLF_color);
                                }
                                sums[sum_index] += m32[c][r];
                                break;
                            case 4:
                                sums[sum_index] += m33[c][r];
                                break;
                                {
                                    int GLF_live5looplimiter0 = 0;
                                    if (GLF_live5looplimiter0 >= _GLF_IDENTITY(7, (_GLF_IDENTITY(7, (7) | (_GLF_IDENTITY(7, max(7, 7))))) | (7))) {
                                        ;
                                    }
                                }
                            case 5:
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                                {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = ((-0.5) - sinh(_GLF_color));
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    {
                                        int GLF_live6looplimiter0 = 0;
                                        if (GLF_live6looplimiter0 >= 5) {
                                            ;
                                        }
                                    }
                                    _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, (_GLF_color) - abs(vec4(0.0, 0.0, 0.0, 0.0))), (_GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, (_GLF_color) - abs(vec4(0.0, 0.0, 0.0, 0.0)))) - vec4(0.0, 0.0, 0.0, 0.0));
                                    _GLF_color = step(distance(vec2(32.16, 76.18), vec2(-391.044, -18.97)), (vec3(-88.64, -155.422, -3.1) * mat4x3(-2491.6545, 39.75, _GLF_IDENTITY(463.797, max(_GLF_IDENTITY(463.797, float(mat2x4(463.797, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, sqrt(1.0)))), 463.797)), 9.2, 3566.8547, -469.047, 6921.5602, -9438.4046, -8.8, -3937.3652, -7340.1903, -5.3)));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outlined_17(_GLF_outVarBackup_GLF_color);
                                    }
                                }
                                _GLF_IDENTITY(sums[sum_index] += _GLF_IDENTITY(m34[c], (false ? _GLF_FUZZED(vec4(263.071, 3.9, 3.6, 76.38)) : m34[c]))[r], (sums[sum_index] += _GLF_IDENTITY(m34[c], (false ? _GLF_FUZZED(vec4(263.071, 3.9, 3.6, 76.38)) : m34[c]))[r]) - log(_GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0))) - 0.0)));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = _GLF_IDENTITY(GLF_live3_GLF_color, min(GLF_live3_GLF_color, GLF_live3_GLF_color));
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = max(vec4(3419.4304, -737.180, 85.25, 7.3), vec4(-5.3, 5299.2148, 4.8, 1.4));
                                    }
                                }
                                {
                                    ivec2 GLF_live6pos = _GLF_FUZZED(((~ivec2(-67937, -82181)) + ((true ? (-17551) : 82969) * _GLF_IDENTITY(78461, (_GLF_IDENTITY(78461, (false ? _GLF_FUZZED(r) : 78461))) << 0))));
                                    {
                                        float GLF_live6p = (_GLF_IDENTITY(15.0, max(15.0, 15.0)) - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                }
                                break;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_3(_GLF_color);
                                    _GLF_color = _GLF_IDENTITY(_GLF_outlined_4(), (true ? _GLF_outlined_4() : _GLF_FUZZED(_GLF_outVarBackup_GLF_color)));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_IDENTITY(true, bool(bvec3(true, true, false))), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) && (_GLF_IDENTITY(true, bool(bvec3(true, true, false))))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    _GLF_struct_7 _GLF_struct_replacement_7 = _GLF_struct_7(1.0, vec2(_GLF_IDENTITY(1.0, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(one) : 1.0)), 1.0), _GLF_struct_8(_GLF_FUZZED((vec2(7.9, -94.07) + vec2(9666.6522, -1.4).gg)), _GLF_struct_9(bvec2(true, true), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)) ? _GLF_FUZZED(log2(703.955)) : 1.0)), 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, _GLF_IDENTITY(1u, 0u | (1u)), 1u)), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), uvec3(_GLF_IDENTITY(1u, (_GLF_IDENTITY(1u, (1u) | (1u))) | 0u), 1u, 1u), _GLF_struct_10(bvec2(true, true), mat4x3(1.0, _GLF_IDENTITY(1.0, 1.0 * (1.0)), 1.0, 1.0, _GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, (true ? 1.0 : _GLF_FUZZED(one))), 1.0, 1.0)), 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), bvec4(true, true, true, true)), ivec2(1, _GLF_IDENTITY(1, ~(~(1)))), 1u, 1, ivec2(1, 1));
                                    float GLF_live0h = _GLF_FUZZED(-5.1);
                                    int GLF_live0i = _GLF_FUZZED(ivec4(10071, 94438, -14518, -76270).q);
                                    int GLF_live0looplimiter0 = 0;
                                    float GLF_live0refh = _GLF_FUZZED(float(61105u));
                                    float GLF_live0slope = _GLF_FUZZED((-0.0));
                                    vec2 GLF_live0uvstep = _GLF_FUZZED(vec4(27.31, 2.9, -3.4, 8112.2747).aa);
                                    {
                                        ivec2 GLF_live6pos = _GLF_FUZZED((ivec2(-6854, -94616)));
                                        if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), max(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), _GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)))] - 15) {
                                            float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live6pos.y, 1 * (GLF_live6pos.y)), 256)]))) / 15.0;
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_live3_GLF_color;
                                    }
                                    while (GLF_live0h < GLF_live0refh && GLF_live0i < 32) {
                                        if (GLF_live0looplimiter0 >= 6) {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = (vec3(-7391.3246, -1.1, -0.5) * m43);
                                                } else {
                                                }
                                            }
                                            break;
                                            {
                                                ivec2 GLF_live6pos = _GLF_FUZZED((ivec2(-56571, -25733) | ivec2(-61219, 79956)));
                                                {
                                                    int GLF_live6looplimiter0 = 0;
                                                    while (GLF_live6pos.y != _GLF_IDENTITY(256, (_GLF_IDENTITY(256, max(256, 256))) << 0)) {
                                                        if (GLF_live6looplimiter0 >= 5) {
                                                            break;
                                                        }
                                                        GLF_live6looplimiter0++;
                                                        {
                                                            if (_GLF_IDENTITY(GLF_live6pos, ivec2(GLF_live6pos[0], GLF_live6pos[1])).x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                                                float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                                                ;
                                                            }
                                                            GLF_live6pos.y++;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_live0looplimiter0++;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = (_GLF_color + GLF_live0slope);
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                                _GLF_color = GLF_live3_GLF_color;
                                            }
                                        }
                                        {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, max(injectionSwitch, injectionSwitch)).y)))) {
                                                    if (_GLF_IDENTITY(_GLF_DEAD(false), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (_GLF_DEAD(false)))) {
                                                        _GLF_color = smoothstep(mix(_GLF_color, _GLF_outVarBackup_GLF_color, bvec4(true, false, false, true)), vec4(4.6, 34.74, -_GLF_IDENTITY(55.65, min(55.65, 55.65)), 3.0), GLF_live3_GLF_color);
                                                    }
                                                    _GLF_color = GLF_live3_GLF_color;
                                                    {
                                                        ivec2 GLF_live6pos = _GLF_FUZZED((ivec2(-48106, -8118) - ivec2(-783, _GLF_IDENTITY(71644, max(_GLF_IDENTITY(71644, ~(~(71644))), 71644)))));
                                                        {
                                                            float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                                            ;
                                                        }
                                                    }
                                                }
                                                do {
                                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_5(_GLF_color);
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                _GLF_color = unpackSnorm4x8(uint(-_GLF_IDENTITY(88130, (88130) >> 0)));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (false ? _GLF_FUZZED(_GLF_color) : (_GLF_color = _GLF_outVarBackup_GLF_color)));
                                                }
                                            }
                                            _GLF_struct_replacement_7._f2.GLF_live0coord -= _GLF_IDENTITY(GLF_live0uvstep, vec2(_GLF_IDENTITY(mat3x2(_GLF_IDENTITY(GLF_live0uvstep, (true ? _GLF_IDENTITY(GLF_live0uvstep, vec2(mat3x2(GLF_live0uvstep, 1.0, 1.0, 0.0, 0.0))) : _GLF_FUZZED(vec2(88.55, 7.7)))), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), length(vec4(0.0, 0.0, 0.0, 0.0))), (mat3x2(_GLF_IDENTITY(GLF_live0uvstep, (true ? _GLF_IDENTITY(GLF_live0uvstep, vec2(mat3x2(GLF_live0uvstep, 1.0, 1.0, 0.0, 0.0))) : _GLF_FUZZED(vec2(88.55, 7.7)))), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), length(vec4(0.0, 0.0, 0.0, 0.0)))) * mat3(1.0))));
                                            GLF_live0refh += GLF_live0slope;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_IDENTITY(vec4(4.9, -1.9, 8.8, 9764.0592), clamp(vec4(4.9, -1.9, 8.8, 9764.0592), vec4(4.9, -1.9, 8.8, 9764.0592), vec4(4.9, -1.9, 8.8, 9764.0592)));
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, vec2(_GLF_IDENTITY(injectionSwitch[0], min(injectionSwitch[0], injectionSwitch[0])), injectionSwitch[1])).x > injectionSwitch.y)))) {
                                                _GLF_color = vec4(-_GLF_IDENTITY(544.416, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? 544.416 : _GLF_FUZZED(GLF_live0h))), _GLF_IDENTITY(-_GLF_IDENTITY(2.3, (2.3) / _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), float(vec3(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), 0.0, 1.0))))), max(_GLF_IDENTITY(-_GLF_IDENTITY(2.3, (2.3) / _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), float(vec3(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), 0.0, 1.0))))), (-_GLF_IDENTITY(2.3, (2.3) / _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), float(vec3(dot(vec2(_GLF_IDENTITY(0.0, (0.0) - length(vec2(0.0, 0.0))), 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), 0.0, 1.0)))))) - 0.0), -_GLF_IDENTITY(2.3, _GLF_IDENTITY((2.3) / _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), _GLF_IDENTITY(float(vec3(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), 0.0, 1.0)), (_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))) ? _GLF_IDENTITY(float(vec3(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), 0.0, 1.0)), float(mat4x2(float(vec3(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), 0.0, 1.0)), 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0))) : _GLF_FUZZED(2.7))))), (false ? _GLF_FUZZED(sqrt(one)) : ((2.3) / _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), _GLF_IDENTITY(float(vec3(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), 0.0, 1.0)), (_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))) ? _GLF_IDENTITY(float(vec3(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), 0.0, 1.0)), float(mat4x2(float(vec3(dot(vec2(0.0, 1.0), vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)))), 0.0, 1.0)), 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0))) : _GLF_FUZZED(2.7))))))))))), _GLF_IDENTITY(6.8, clamp(6.8, 6.8, _GLF_IDENTITY(6.8, max(6.8, 6.8)))), 8.5);
                                                {
                                                    ivec2 GLF_live6pos = _GLF_FUZZED((ivec2(79567, _GLF_IDENTITY(-98380, _GLF_IDENTITY(int(_GLF_IDENTITY(int(-98380), min(int(-98380), int(-98380)))), ~(~(int(_GLF_IDENTITY(int(-98380), min(int(-98380), int(-98380))))))))) * ivec2(90788, -29465)));
                                                    {
                                                        if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                                            float GLF_live6p = (15.0 - abs(float(_GLF_IDENTITY(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)], ~(~(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)])))))) / 15.0;
                                                            ;
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        } else {
                                                            _GLF_IDENTITY(GLF_live6pos.y++, (_GLF_IDENTITY(GLF_live6pos.y++, (GLF_live6pos.y++) - 0)) / 1);
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_live0h = _GLF_IDENTITY(texture(GLF_live0tex, GLF_live0coord), vec4(mat2(texture(GLF_live0tex, _GLF_struct_replacement_7._f2.GLF_live0coord)))).y;
                                            GLF_live0i++;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(GLF_live0slope, reflect(_GLF_IDENTITY(vec3(-4.4, 966.216, -9.5), mix(vec3(_GLF_FUZZED(950.355), _GLF_FUZZED(vec2(-7.5, -0.4).x), (vec3(-4.4, 966.216, -9.5))[2]), vec3((vec3(-4.4, 966.216, -9.5))[0], (vec3(-4.4, 966.216, -9.5))[1], _GLF_FUZZED(vec2(277.727, 2.6).t)), bvec3(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), true, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))), vec3(-4.9, -0.2, 3013.0102)));
                                            }
                                        }
                                    }
                                }
                                do {
                                    if (_GLF_IDENTITY(_GLF_DEAD(false), bool(_GLF_IDENTITY(bool(_GLF_DEAD(false)), true && (bool(_GLF_DEAD(false))))))) {
                                        {
                                            ivec2 GLF_live6pos = _GLF_FUZZED(ivec2(3264, _GLF_IDENTITY(79381, (79381) << (0 ^ 0))));
                                            {
                                                int GLF_live6looplimiter0 = 0;
                                                while (GLF_live6pos.y != 256) {
                                                    if (GLF_live6looplimiter0 >= 5) {
                                                        break;
                                                    }
                                                    GLF_live6looplimiter0++;
                                                    {
                                                        if (GLF_live6pos.x < _GLF_IDENTITY(GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)], int(ivec3(GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)], 1, 1))) + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                                            float GLF_live6p = (15.0 - abs(float(_GLF_IDENTITY(GLF_live6pos.x, (_GLF_IDENTITY(GLF_live6pos.x, (GLF_live6pos.x) << 0)) / 1) - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                                            ;
                                                        }
                                                        GLF_live6pos.y++;
                                                    }
                                                }
                                            }
                                        }
                                        discard;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_live3_GLF_color;
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x)))));
                                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, max(_GLF_IDENTITY(injectionSwitch, (true ? injectionSwitch : _GLF_FUZZED(vec2(49.74, 5.9)))), injectionSwitch)).y))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) || (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, max(_GLF_IDENTITY(injectionSwitch, (true ? injectionSwitch : _GLF_FUZZED(vec2(49.74, 5.9)))), injectionSwitch)).y)))))) {
                                    _GLF_color = exp2(GLF_live3_GLF_color);
                                }
                            case 6:
                                sums[sum_index] += m42[c][r];
                                if (_GLF_DEAD(false)) {
                                    discard;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, 1.0 * (gl_FragCoord.x)) < 0.0)))) {
                                        _GLF_color = exp(GLF_live3_GLF_color);
                                    }
                                }
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_IDENTITY(false, _GLF_IDENTITY(false || (_GLF_IDENTITY(false, false || (false))), (_GLF_IDENTITY(false || (_GLF_IDENTITY(false, false || (false))), !(!(false || (_GLF_IDENTITY(false, false || (false))))))) && true)), !(!(_GLF_IDENTITY(_GLF_IDENTITY(false, _GLF_IDENTITY(false || (_GLF_IDENTITY(false, false || (false))), (_GLF_IDENTITY(false || (_GLF_IDENTITY(false, false || (false))), !(!(false || (_GLF_IDENTITY(false, false || (false))))))) && true)), true && (_GLF_IDENTITY(_GLF_IDENTITY(false, _GLF_IDENTITY(false || (_GLF_IDENTITY(false, false || (false))), (_GLF_IDENTITY(false || (_GLF_IDENTITY(false, false || (false))), !(!(false || (_GLF_IDENTITY(false, false || (false))))))) && true)), bool(bvec2(_GLF_IDENTITY(false, _GLF_IDENTITY(false || (_GLF_IDENTITY(false, false || (false))), (_GLF_IDENTITY(false || (_GLF_IDENTITY(false, false || (false))), !(!(false || (_GLF_IDENTITY(false, false || (false))))))) && true)), false)))))))))) {
                                        _GLF_color = vec4(vec3(845.598, -2.1, -7.8), 4.0);
                                    }
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(one, log2(one), m32[1]);
                                }
                            case 7:
                                sums[sum_index] += m43[_GLF_IDENTITY(c, (c) / ((((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6))) << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))))][r];
                                break;
                                {
                                    {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            } else {
                                                _GLF_color = (log2((one - vec4(-9.5, -30.32, 280.393, 8023.4946))) + 54.48);
                                            }
                                        }
                                        GLF_live3_GLF_color = vec4(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)))), _GLF_IDENTITY(0.0, (_GLF_IDENTITY(0.0, (_GLF_IDENTITY(0.0, min(0.0, 0.0))) + 0.0)) - 0.0), 0.0, 1.0);
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            _GLF_color = (vec3(-6.7, -5.5, 8.7), vec4(921.443, _GLF_IDENTITY(-17.39, float(mat4x3(_GLF_IDENTITY(-17.39, (-17.39) / 1.0), 1.0, sin(0.0), 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0))), -77.78, -3284.8822));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            case 8:
                                _GLF_IDENTITY(sums[sum_index] += m44[c][r], (false ? _GLF_FUZZED(89.79) : (sums[sum_index] += m44[c][r])));
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = _GLF_IDENTITY(vec4(-2.3, 8012.7788, -209.932, -674.475), mix(vec4((vec4(-2.3, 8012.7788, -209.932, -674.475))[0], _GLF_FUZZED(662.219), _GLF_FUZZED(-2368.1515), _GLF_FUZZED(3385.4703)), vec4(_GLF_FUZZED(-683.690), (vec4(-2.3, 8012.7788, -209.932, -674.475))[1], (vec4(-2.3, 8012.7788, -209.932, -674.475))[2], (vec4(-2.3, 8012.7788, -209.932, -674.475))[3]), bvec4(false, true, true, true)));
                                }
                                {
                                    bool GLF_live2canwalk = _GLF_FUZZED((mat3x2(-35.16, -_GLF_IDENTITY(0.3, (_GLF_IDENTITY(0.3, (_GLF_IDENTITY(0.3, clamp(0.3, 0.3, 0.3))) - 0.0)) * 1.0), _GLF_IDENTITY(4036.6151, max(_GLF_IDENTITY(4036.6151, (true ? 4036.6151 : _GLF_FUZZED(step(8.5, 2658.6377)))), 4036.6151)), -17.05, 7.0, -3.9) != mat3x2(95.09, 6.4, 3354.9222, 91.21, -439.140, 5.8)));
                                    int GLF_live2i = _GLF_FUZZED(61335);
                                    int GLF_live2j = _GLF_IDENTITY(_GLF_FUZZED((-(-57825))), (_GLF_FUZZED((-(-57825)))) + 0);
                                    if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)))), _GLF_IDENTITY(bool(bvec2(_GLF_IDENTITY((gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)))), bool(bvec2((gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)))), false))), _GLF_IDENTITY(true, !(!(true))))), false || (_GLF_IDENTITY(bool(bvec2(_GLF_IDENTITY((gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)))), bool(bvec2((gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)))), false))), _GLF_IDENTITY(true, !(!(true))))), bool(bvec2(bool(bvec2(_GLF_IDENTITY((gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)))), bool(bvec2((gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 1.0, 1.0)))), false))), _GLF_IDENTITY(true, !(!(true))))), true))))))))) {
                                        _GLF_color = acos(vec4(-8831.3613, 49.98, -7.0, 2.0));
                                    }
                                    int GLF_live2looplimiter2 = 0;
                                    ivec2 GLF_live2p = _GLF_FUZZED(ivec2(-18760, -70523));
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = round(GLF_live3_GLF_color);
                                    }
                                    for (GLF_live2i = 0; GLF_live2i < 8; GLF_live2i++) {
                                        {
                                            ivec2 GLF_live6pos = _GLF_FUZZED(ivec2(_GLF_IDENTITY((false ? 37120 : (-9913)), _GLF_IDENTITY(int(ivec4((false ? 37120 : (-9913)), 0, 1, 0)), (false ? _GLF_FUZZED(-74725) : int(ivec4((false ? 37120 : (-9913)), 0, 1, 0)))))));
                                            {
                                                float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                                ;
                                            }
                                        }
                                        if (GLF_live2looplimiter2 >= 5) {
                                            break;
                                        }
                                        GLF_live2looplimiter2++;
                                        {
                                            {
                                                _GLF_struct_11 _GLF_struct_replacement_11 = _GLF_struct_11(ivec3(1, 1, 1), 0, _GLF_struct_12(1, uvec3(1u, 1u, 1u), 1u, uvec4(1u, 1u, 1u, 1u), vec3(_GLF_IDENTITY(1.0, (1.0) - 0.0), 1.0, 1.0), _GLF_struct_13(uvec2(1u, 1u), _GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 0, 1), (ivec3(1, 0, 1)) | ivec3(0, 0, 0)))), vec4(1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), ivec4(1, 1, 1, 1)), _GLF_IDENTITY(uvec3(1u, 1u, 1u), clamp(uvec3(1u, 1u, 1u), uvec3(1u, 1u, 1u), _GLF_IDENTITY(uvec3(1u, 1u, 1u), (true ? uvec3(1u, 1u, 1u) : _GLF_FUZZED(uvec3(28063u, 54986u, 138858u)))))), _GLF_struct_14(_GLF_struct_15(ivec4(1, 1, 1, 1), 1, ivec2(1, 1), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1u, ivec4(1, 1, 1, 1), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat4x3(1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, (1.0) + 0.0), 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(one) : 1.0))), uvec2(1u, 1u), uvec2(1u, 1u), 1, mat4x2(1.0, 1.0, _GLF_IDENTITY(1.0, float(_GLF_IDENTITY(mat3(1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0), mat3(1.0) * (mat3(1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0))))), _GLF_IDENTITY(1.0, max(1.0, _GLF_IDENTITY(1.0, (1.0) - _GLF_ZERO(0.0, injectionSwitch.x)))), 1.0, 1.0, 1.0, 1.0), _GLF_struct_16(bvec2(true, true), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(_GLF_IDENTITY(1.0, min(1.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)))), 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED(42.71)), float(1.0), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))), 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, _GLF_IDENTITY(1, (false ? _GLF_FUZZED(c) : 1))), 1u)), vec2(1.0, 1.0), _GLF_struct_17(_GLF_struct_18(ivec2(1, 1), vec2(_GLF_IDENTITY(1.0, float(mat2x4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0))), 1.0), true, mat4x2(1.0, 1.0, _GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(one) : 1.0)), 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_IDENTITY(bvec2(true, true), bvec2(bvec4(bvec2(true, true), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false)))), 1, vec2(1.0, _GLF_IDENTITY(1.0, float(_GLF_IDENTITY(mat3(1.0, 1.0, 1.0, 1.0, 0.0, 1.0, determinant(mat2(0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0))), sqrt(0.0))), _GLF_IDENTITY(dot(vec3(0.0, 0.0, 1.0), vec3(sqrt(0.0), 0.0, 1.0)), dot(vec3(0.0, 0.0, 1.0), vec3(sqrt(0.0), 0.0, 1.0))), log(1.0)), mat3(mat3x4(mat3(1.0, 1.0, 1.0, 1.0, 0.0, 1.0, determinant(mat2(0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0))), sqrt(0.0))), _GLF_IDENTITY(dot(vec3(0.0, 0.0, 1.0), vec3(sqrt(0.0), 0.0, 1.0)), dot(vec3(0.0, 0.0, 1.0), vec3(sqrt(0.0), 0.0, 1.0))), log(1.0)))))))), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_19(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_20(uvec2(1u, 1u), ivec3(1, 1, 1), bvec3(true, true, true), _GLF_IDENTITY(ivec2(1, 1), (ivec2(1, 1)) | (ivec2(1, 1)))), uvec4(1u, 1u, 1u, 1u)));
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_live3_GLF_color;
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = asin(vec4(2355.2654, 685.902, 38.30, 9709.6597));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((injectionSwitch.x < injectionSwitch.y), true && ((injectionSwitch.x < injectionSwitch.y)))))) {
                                                        do {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                    }
                                                }
                                                for (GLF_live2j = 0; GLF_live2j < _GLF_IDENTITY(8, (8) - 0); GLF_live2j++) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, _GLF_IDENTITY(injectionSwitch, vec2(injectionSwitch[0], injectionSwitch[1])).x))))) {
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        _GLF_color = vec4(one, one, one, -_GLF_IDENTITY(8655.9122, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(9.1) : 8655.9122)));
                                                    }
                                                    if (_GLF_struct_replacement_11.GLF_live2looplimiter1 >= 5) {
                                                        break;
                                                    }
                                                    _GLF_struct_replacement_11.GLF_live2looplimiter1++;
                                                    {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (false ? _GLF_FUZZED(vec4(643.814, 28.03, -7337.6867, -60.68)) : (_GLF_outVarBackup_GLF_color = _GLF_color))) : _GLF_FUZZED(GLF_live3_GLF_color)));
                                                            _GLF_color = vec4(94.24, 6079.1971, 5.1, -323.462);
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = GLF_live3_GLF_color;
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    _GLF_color = GLF_live3_GLF_color;
                                                                }
                                                                _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_color = _GLF_outVarBackup_GLF_color) - log(vec4(1.0, 1.0, 1.0, 1.0)));
                                                            }
                                                        }
                                                        if (_GLF_IDENTITY(GLF_live2map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j * 2 + _GLF_IDENTITY(GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0), (_GLF_IDENTITY(GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0), (false ? _GLF_FUZZED(cols) : (GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0))))) / 1), 256)], _GLF_IDENTITY(int(ivec2(GLF_live2map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j * 2 + _GLF_IDENTITY(GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0), (_GLF_IDENTITY(GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0), (false ? _GLF_FUZZED(cols) : (GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0))))) / 1), 256)], (0 >> _GLF_IDENTITY(int(6), int(6))))), clamp(int(ivec2(GLF_live2map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j * 2 + _GLF_IDENTITY(GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0), (_GLF_IDENTITY(GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0), (false ? _GLF_FUZZED(cols) : (GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0))))) / 1), 256)], (0 >> _GLF_IDENTITY(int(6), int(6))))), int(ivec2(GLF_live2map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j * 2 + _GLF_IDENTITY(GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0), (_GLF_IDENTITY(GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0), (false ? _GLF_FUZZED(cols) : (GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0))))) / _GLF_IDENTITY(1, (1) - ((0 | 0) & 38881))), 256)], (0 >> _GLF_IDENTITY(int(6), int(6))))), int(ivec2(GLF_live2map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j * 2 + _GLF_IDENTITY(GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0), (_GLF_IDENTITY(GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0), (false ? _GLF_FUZZED(cols) : (GLF_live2i * 2 * _GLF_IDENTITY(16, (_GLF_IDENTITY(16, min(16, 16))) | 0))))) / 1), 256)], (0 >> _GLF_IDENTITY(int(6), int(6)))))))) == 0) {
                                                            GLF_live2p.x = GLF_live2j * 2;
                                                            GLF_live2p.y = GLF_live2i * 2;
                                                            GLF_live2canwalk = _GLF_IDENTITY(_GLF_outlined_6(), (_GLF_outlined_6()) || false);
                                                        }
                                                    }
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_outlined_18(_GLF_color);
                                                _GLF_color = _GLF_IDENTITY(vec4(8.6, 0.3, -534.489, _GLF_IDENTITY(-0.0, (-0.0) - 0.0)), mix(vec4((vec4(8.6, 0.3, -534.489, _GLF_IDENTITY(-0.0, (-0.0) - 0.0)))[0], _GLF_FUZZED(6.3), (vec4(8.6, 0.3, -534.489, _GLF_IDENTITY(-0.0, (-0.0) - 0.0)))[2], _GLF_FUZZED(130.418)), vec4(_GLF_FUZZED((true ? 2.2 : 2481.4613)), _GLF_IDENTITY((vec4(8.6, 0.3, -534.489, _GLF_IDENTITY(-0.0, (-0.0) - 0.0)))[1], (true ? (vec4(8.6, 0.3, -534.489, _GLF_IDENTITY(-0.0, (-0.0) - 0.0)))[1] : _GLF_FUZZED(25.17))), _GLF_FUZZED(36.70), (vec4(8.6, 0.3, -534.489, _GLF_IDENTITY(-0.0, (-0.0) - 0.0)))[3]), bvec4(false, true, false, _GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0))))))));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_IDENTITY(_GLF_DEAD(false), bool(bool(_GLF_DEAD(false))))) || false)) || _GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                break;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = dFdxFine(vec4(9100.0795, 76.25, 39.63, _GLF_IDENTITY(9457.9920, mix(float(9457.9920), float(_GLF_FUZZED(7.3)), bool(false)))));
                                                }
                                            }
                                        }
                                        {
                                            int GLF_live6looplimiter0 = 0;
                                            if (GLF_live6looplimiter0 >= 5) {
                                                ;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = pow(_GLF_color, vec4(-565.240, -3.7, -_GLF_IDENTITY(243.385, _GLF_IDENTITY(float(vec2(243.385, 0.0)), clamp(_GLF_IDENTITY(float(vec2(243.385, 0.0)), (float(vec2(243.385, 0.0))) + 0.0), _GLF_IDENTITY(float(vec2(243.385, 0.0)), mix(float(_GLF_FUZZED(-5.0)), float(float(vec2(243.385, 0.0))), bool(true))), float(vec2(243.385, 0.0))))), -534.711));
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = sqrt(_GLF_IDENTITY(vec4(-7243.1616, -5675.9838, 2.9, -7429.7146), max(vec4(-7243.1616, -5675.9838, 2.9, -_GLF_IDENTITY(7429.7146, (true ? _GLF_IDENTITY(7429.7146, (true ? 7429.7146 : _GLF_FUZZED(one))) : _GLF_FUZZED(asin(one))))), vec4(-7243.1616, -5675.9838, 2.9, -7429.7146))));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))), false || (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))), (_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0)))) && _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))))) {
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            _GLF_color = (_GLF_color - 7.8);
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)) || (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))), false || (_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))))))) {
                                            _GLF_color = sign(GLF_live3_GLF_color);
                                        }
                                    }
                                }
                                {
                                    ivec2 GLF_live6pos = _GLF_FUZZED((((uvec2(49948u, 141902u) != uvec2(2620u, 175435u)) ? (-74167) : (-39339)) * ivec2(-1820, 59393)));
                                    {
                                        if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                            float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                            ;
                                        }
                                        GLF_live6pos.y++;
                                    }
                                }
                        }
                    }
                }
                {
                    int GLF_live5iteration = _GLF_FUZZED((18667));
                    {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_IDENTITY(GLF_live3_GLF_color, (_GLF_IDENTITY(GLF_live3_GLF_color, mix(vec4(_GLF_FUZZED(vec3(137.580, 736.228, 3.3).p), (GLF_live3_GLF_color)[1], _GLF_FUZZED(-4944.1889), _GLF_FUZZED(-1.1)), vec4((GLF_live3_GLF_color)[0], _GLF_FUZZED(-98.43), (GLF_live3_GLF_color)[2], (GLF_live3_GLF_color)[3]), bvec4(true, false, true, true)))) / vec4(1.0, 1.0, 1.0, 1.0));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outlined_19(GLF_live3_GLF_color);
                    }
                }
                sums[sum_index] /= 16.0;
                if (_GLF_DEAD(false)) {
                    _GLF_color = dFdxFine(_GLF_color);
                    {
                        {
                            ;
                        }
                    }
                }
                {
                    int GLF_live2directions = _GLF_IDENTITY(_GLF_FUZZED(_GLF_IDENTITY(9593, (9593) << 0)), min(_GLF_FUZZED(_GLF_IDENTITY(9593, (9593) << 0)), _GLF_FUZZED(_GLF_IDENTITY(9593, (9593) << 0))));
                    ivec2 GLF_live2p = _GLF_FUZZED(_GLF_IDENTITY(ivec2(46412, 26459), ivec2(ivec4(ivec2(46412, 26459), 0, (1 ^ 1)))));
                    if (_GLF_IDENTITY(GLF_live2p.y > 0, (GLF_live2p.y > 0) && true) && GLF_live2map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live2p.x) + (_GLF_IDENTITY(GLF_live2p.y - 2, (GLF_live2p.y - 2) | (_GLF_IDENTITY(GLF_live2p.y - 2, (0 | 0) | (GLF_live2p.y - 2))))) * 16, 256)] == 0) {
                        GLF_live2directions += 1;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])).y < sqrt(0.0))))) {
                        continue;
                    }
                }
                {
                    int GLF_live6looplimiter0 = 0;
                    ivec2 GLF_live6pos = _GLF_FUZZED((52187 + ivec2(48587, 72541)));
                    {
                        if (GLF_live6looplimiter0 >= 5) {
                            ;
                        }
                        GLF_live6looplimiter0++;
                        {
                            if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, _GLF_IDENTITY(256, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? 256 : _GLF_FUZZED(int(-3.7)))))] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                ;
                            }
                            GLF_live6pos.y++;
                        }
                    }
                }
                sum_index++;
            }
        }
    }
    int region_x = int(gl_FragCoord.x / (resolution.x / _GLF_IDENTITY(3.0, mix(float(_GLF_FUZZED(6.0)), float(_GLF_IDENTITY(3.0, clamp(_GLF_IDENTITY(3.0, clamp(3.0, 3.0, 3.0)), 3.0, 3.0))), bool(true)))));
    {
        ivec2 GLF_live6pos = _GLF_FUZZED((((ivec2(-99080, -43981) - (-38966))) | ivec2(-32709, -45039)));
        for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(3), _GLF_IDENTITY(_GLF_IDENTITY(int(3), _GLF_IDENTITY((int(3)) | (int(3)), 0 + (_GLF_IDENTITY((int(3)) | (int(3)), ~(~((int(3)) | (int(3)))))))), (_GLF_IDENTITY(int(3), _GLF_IDENTITY((int(3)) | (int(3)), 0 + (_GLF_IDENTITY((int(3)) | (int(3)), ~(~((int(3)) | (int(3))))))))) >> 0))) >> _GLF_IDENTITY(int(3), int(3))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            int GLF_live6looplimiter0 = 0;
            while (GLF_live6pos.y != 256) {
                if (GLF_live6looplimiter0 >= 5) {
                    break;
                }
                _GLF_IDENTITY(GLF_live6looplimiter0++, (GLF_live6looplimiter0++) >> 0);
                {
                    if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                        float GLF_live6p = (15.0 - _GLF_IDENTITY(abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)])), (true ? abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)])) : _GLF_FUZZED(dFdxFine(intBitsToFloat(sum_index)))))) / 15.0;
                        ;
                    }
                    GLF_live6pos.y++;
                }
            }
        }
    }
    _GLF_struct_21 _GLF_struct_replacement_21 = _GLF_struct_21(1, mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(-5.1)), bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), int(gl_FragCoord.y / (resolution.x / 3.0)), ivec2(1, 1), bvec2(true, true), uvec2(1u, 1u), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
    int overall_region = _GLF_struct_replacement_21.region_y * 3 + region_x;
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
        if (overall_region > 0 && overall_region < 9) {
            {
                ivec2 GLF_live6pos = _GLF_FUZZED((-ivec2(-13074, -33228)));
                {
                    float GLF_live6p = (15.0 - abs(_GLF_IDENTITY(float(GLF_live6pos.x - GLF_live6dp[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), (false ? _GLF_FUZZED((sum_index + sum_index)) : _GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)))]), 0.0 + (float(GLF_live6pos.x - GLF_live6dp[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256), (false ? _GLF_FUZZED((sum_index + sum_index)) : _GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)))]))))) / 15.0;
                    ;
                }
            }
            do {
                _GLF_color = vec4(vec3(sums[overall_region]), 1.0);
            } while (_GLF_WRAPPED_LOOP(false));
            {
                int GLF_live6looplimiter0 = 0;
                ivec2 GLF_live6pos = _GLF_FUZZED((ivec2(-81914, -44478) - ivec2(57242, 25834)));
                {
                    if (GLF_live6looplimiter0 >= 5) {
                        ;
                    }
                    GLF_live6looplimiter0++;
                    {
                        if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > _GLF_IDENTITY(GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15, (true ? _GLF_IDENTITY(GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15, clamp(GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15, GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15, GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15)) : _GLF_FUZZED(overall_region)))) {
                            float GLF_live6p = (_GLF_IDENTITY(15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)])), clamp(_GLF_IDENTITY(15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)])), min(15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)])), 15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)])))), 15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)])), 15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))))) / 15.0;
                            ;
                        }
                        GLF_live6pos.y++;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live3_GLF_color;
            }
            {
                int GLF_live3looplimiter0 = 0;
                if (GLF_live3looplimiter0 >= 5) {
                    ;
                }
                {
                    {
                        ivec2 GLF_live6pos = _GLF_FUZZED((ivec2(-18325, 48447) + ivec2(ivec3(-93914, -32292, -32180))));
                        {
                            int GLF_live6looplimiter0 = 0;
                            while (GLF_live6pos.y != 256) {
                                if (GLF_live6looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live6looplimiter0++;
                                {
                                    if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                        float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                    GLF_live6pos.y++;
                                }
                            }
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_IDENTITY(_GLF_DEAD(false), !(_GLF_IDENTITY(!(_GLF_DEAD(false)), bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(!(_GLF_DEAD(false)), bool(_GLF_IDENTITY(bvec3(!(_GLF_DEAD(false)), true, true), bvec3(bvec4(bvec3(!(_GLF_DEAD(false)), true, true), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))))), bool(bool(bool(_GLF_IDENTITY(!(_GLF_DEAD(false)), bool(_GLF_IDENTITY(bvec3(!(_GLF_DEAD(false)), true, true), bvec3(bvec4(bvec3(!(_GLF_DEAD(false)), true, true), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))))))))))))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        {
                            int GLF_live5looplimiter0 = _GLF_IDENTITY(0, ~(~(0)));
                            if (GLF_live5looplimiter0 >= 7) {
                                ;
                            }
                        }
                        _GLF_color = (vec3(851.629, _GLF_IDENTITY(19.91, _GLF_IDENTITY(float(mat4x2(19.91, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0)), 0.0 + (float(mat4x2(19.91, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0))))), 51.00) * mat4x3(-91.28, 1.2, -235.933, 3085.2208, -10.90, 882.582, _GLF_IDENTITY(46.53, (46.53) * 1.0), 2847.2059, -3.2, _GLF_IDENTITY(1.3, _GLF_IDENTITY(float(_GLF_IDENTITY(mat4(1.3, 1.0, 1.0, 1.0, 1.0, 0.0, log(1.0), 0.0, sqrt(0.0), 1.0, length(vec3(0.0, 0.0, 0.0)), 1.0, tan(0.0), 1.0, cos(0.0), determinant(mat3(1.0, 0.0, 0.0, 1.0, 1.0, 0.0, abs(1.0), abs(1.0), 1.0))), (true ? mat4(1.3, 1.0, 1.0, 1.0, 1.0, 0.0, log(1.0), 0.0, sqrt(0.0), 1.0, length(vec3(0.0, 0.0, 0.0)), 1.0, tan(0.0), 1.0, cos(0.0), determinant(mat3(1.0, 0.0, 0.0, 1.0, 1.0, 0.0, abs(1.0), abs(1.0), 1.0))) : _GLF_FUZZED(m44)))), max(float(_GLF_IDENTITY(mat4(1.3, 1.0, 1.0, 1.0, 1.0, 0.0, log(1.0), 0.0, sqrt(0.0), 1.0, length(vec3(0.0, 0.0, 0.0)), 1.0, tan(0.0), 1.0, cos(0.0), determinant(mat3(1.0, 0.0, 0.0, 1.0, 1.0, 0.0, abs(1.0), abs(1.0), 1.0))), (true ? mat4(1.3, 1.0, 1.0, 1.0, 1.0, 0.0, log(1.0), 0.0, sqrt(0.0), 1.0, length(vec3(0.0, 0.0, 0.0)), 1.0, tan(0.0), 1.0, cos(0.0), determinant(mat3(1.0, 0.0, 0.0, 1.0, 1.0, 0.0, abs(1.0), abs(1.0), 1.0))) : _GLF_FUZZED(m44)))), float(_GLF_IDENTITY(mat4(1.3, 1.0, 1.0, 1.0, 1.0, 0.0, log(1.0), 0.0, sqrt(0.0), 1.0, length(vec3(0.0, 0.0, 0.0)), 1.0, tan(0.0), 1.0, cos(0.0), determinant(mat3(1.0, 0.0, 0.0, 1.0, 1.0, 0.0, abs(1.0), abs(1.0), 1.0))), (true ? mat4(1.3, 1.0, 1.0, 1.0, 1.0, 0.0, log(1.0), 0.0, sqrt(0.0), 1.0, length(vec3(0.0, 0.0, 0.0)), 1.0, tan(0.0), 1.0, cos(0.0), determinant(mat3(1.0, 0.0, 0.0, 1.0, 1.0, 0.0, abs(1.0), abs(1.0), 1.0))) : _GLF_FUZZED(m44))))))), 3.4, -779.244));
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        int GLF_live5iteration = _GLF_FUZZED(-95746);
                        {
                            ;
                        }
                    }
                    _GLF_IDENTITY(_GLF_color = mod(vec4(-8.1, -3.2, _GLF_IDENTITY(-83.45, min(_GLF_IDENTITY(-83.45, mix(float(-83.45), float(_GLF_FUZZED(48.38)), bool(false))), _GLF_IDENTITY(-83.45, clamp(-83.45, -83.45, -83.45)))), -2937.6229), vec4(2494.0041, 6.6, -9.6, 716.303)), (_GLF_color = mod(vec4(-8.1, -3.2, _GLF_IDENTITY(-83.45, min(_GLF_IDENTITY(-83.45, mix(float(-83.45), float(_GLF_FUZZED(48.38)), bool(false))), _GLF_IDENTITY(-83.45, clamp(-83.45, -_GLF_IDENTITY(83.45, clamp(_GLF_IDENTITY(83.45, float(_GLF_IDENTITY(mat4x2(83.45, 1.0, 1.0, 1.0, 0.0, log(1.0), 0.0, 0.0), mat2(1.0) * (mat4x2(83.45, 1.0, 1.0, 1.0, 0.0, log(1.0), 0.0, 0.0))))), 83.45, 83.45)), -83.45)))), -2937.6229), vec4(2494.0041, 6.6, _GLF_IDENTITY(-9.6, (false ? _GLF_FUZZED(-865.178) : (-9.6))), 716.303))) - vec4(0.0, 0.0, 0.0, 0.0));
                    {
                        int GLF_live6looplimiter0 = 0;
                        ivec2 GLF_live6pos = _GLF_FUZZED(ivec2(-22841, -97755));
                        {
                            if (GLF_live6looplimiter0 >= 5) {
                                ;
                            }
                            GLF_live6looplimiter0++;
                            {
                                if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > _GLF_IDENTITY(GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15, (GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) << 0)) {
                                    float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / _GLF_IDENTITY(15.0, 0.0 + (15.0));
                                    ;
                                }
                                GLF_live6pos.y++;
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                    } else {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, !(!(gl_FragCoord.x < 0.0))))))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_IDENTITY(vec4(-32.34, -_GLF_IDENTITY(227.435, max(227.435, 227.435)), -69.73, -29.78), clamp(vec4(-32.34, -_GLF_IDENTITY(227.435, max(227.435, 227.435)), -69.73, -29.78), vec4(-32.34, -_GLF_IDENTITY(227.435, max(227.435, 227.435)), -69.73, -29.78), vec4(-32.34, -_GLF_IDENTITY(227.435, max(227.435, 227.435)), -69.73, -29.78)));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = trunc(vec4(3.2, 3.9, 57.67, 4.8));
                    }
                }
                return;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-33.65, -9.4, _GLF_IDENTITY(-2.2, mix(float(_GLF_FUZZED((-926.298))), float(-2.2), bool(true))), -8.6);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat4(0.0, 0.0, determinant(mat4(1.0, 0.0, 0.0, 0.0, 1.0, 1.0, _GLF_IDENTITY(0.0, (0.0) + 0.0), 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0)), 1.0, 0.0, 0.0, 1.0, 0.0, log(1.0), 0.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), _GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED(891.991)), float(1.0), bool(true))), 0.0, 0.0, determinant(_GLF_IDENTITY(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, min(0.0, 0.0)), 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0), transpose(transpose(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, min(0.0, 0.0)), 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0))))), 0.0)))))) {
                    {
                        int GLF_live5iteration = _GLF_FUZZED(int((_GLF_IDENTITY((5.3 - (-6998.3494)) >= (-8141.6622), !(!(_GLF_IDENTITY((5.3 - (-6998.3494)) >= (-8141.6622), !(!((5.3 - (-6998.3494)) >= (-8141.6622))))))))));
                        {
                            ;
                        }
                    }
                    do {
                        {
                            int GLF_live5looplimiter2 = 0;
                            if (GLF_live5looplimiter2 >= 7) {
                                ;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                {
                                    ;
                                }
                            }
                            _GLF_color = _GLF_outlined_20(_GLF_color);
                        }
                        _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, _GLF_IDENTITY(mat4(1.0) * (_GLF_outVarBackup_GLF_color), min(mat4(1.0) * (_GLF_outVarBackup_GLF_color), mat4(1.0) * (_GLF_outVarBackup_GLF_color))));
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, (false ? _GLF_FUZZED(3.5) : gl_FragCoord.y)) < 0.0)))) {
                        _GLF_color = (_GLF_outVarBackup_GLF_color * (-8790.4250));
                    }
                }
                {
                    {
                        ;
                    }
                }
            }
        } else {
            _GLF_color = vec4(vec3(0.0), 1.0);
        }
    } else {
    }
}
