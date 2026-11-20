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
vec4 GLF_live5gl_FragCoord = _GLF_FUZZED(vec4(1.2, 3.9, -91.39, -4.5));

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live5injectionSwitch;
};

int GLF_live5data[10] = int[10](_GLF_FUZZED(((_GLF_IDENTITY(19317, clamp(19317, 19317, _GLF_IDENTITY(19317, int(int(19317)))))) | 11961)), _GLF_FUZZED(ivec4(-65239, 43571, -90808, -96267).s), _GLF_FUZZED(20846), _GLF_FUZZED(41631), _GLF_FUZZED((~(-10575))), _GLF_FUZZED(27301), _GLF_FUZZED((+38995)), _GLF_FUZZED(30782), _GLF_FUZZED(int(true)), _GLF_FUZZED((+(-62443)))), GLF_live5temp[10] = int[10](_GLF_IDENTITY(_GLF_FUZZED((63144 + int(_GLF_IDENTITY(false, true && (false))))), int(ivec4(_GLF_FUZZED((63144 + int(_GLF_IDENTITY(_GLF_IDENTITY(false, true && (false)), !(!(_GLF_IDENTITY(_GLF_IDENTITY(false, true && (false)), (_GLF_IDENTITY(false, true && (false))) || false))))))), 0, 0, 1))), _GLF_FUZZED(-71603), _GLF_FUZZED(-46172), _GLF_FUZZED((46735 + (-2391))), _GLF_FUZZED(-61535), _GLF_FUZZED(-69838), _GLF_FUZZED(int(false)), _GLF_FUZZED(int((_GLF_IDENTITY((70493u ^ 187220u) < 54577u, bool(_GLF_IDENTITY(bool(_GLF_IDENTITY((70493u ^ 187220u) < 54577u, !(!((70493u ^ 187220u) < 54577u)))), !(!(bool(_GLF_IDENTITY((70493u ^ 187220u) < 54577u, !(!((70493u ^ 187220u) < 54577u)))))))))))), _GLF_FUZZED(int(151564u)), _GLF_FUZZED(98));
layout(set = 0, binding = 3) uniform sampler2D GLF_live6tex;
const float GLF_live6weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
const int GLF_live3dp[256] = int[256](115, _GLF_IDENTITY(133, int(ivec4(133, (0 << _GLF_IDENTITY(int(1), int(1))), 1, 0))), 150, 164, 176, 184, 190, _GLF_IDENTITY(192, (192) >> (0 >> _GLF_IDENTITY(int(2), int(2)))), 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, _GLF_IDENTITY(80, 1 * (80)), 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, _GLF_IDENTITY(256, (false ? _GLF_FUZZED(-63132) : 256)), 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, _GLF_IDENTITY(190, (_GLF_IDENTITY(190, 1 * (190))) | (_GLF_IDENTITY(190, (190) - 0))), 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, _GLF_IDENTITY(145, (145) / 1), 161, 177, _GLF_IDENTITY(193, (_GLF_IDENTITY(193, (193) | (193))) >> 0), 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, _GLF_IDENTITY(41, min(_GLF_IDENTITY(41, (41) | (41)), _GLF_IDENTITY(41, clamp(41, 41, 41)))), 44, 51, 61, 73, _GLF_IDENTITY(87, ~(~(_GLF_IDENTITY(87, max(87, 87))))), 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, _GLF_IDENTITY(104, clamp(104, 104, 104)), 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, _GLF_IDENTITY(2, int(ivec3(2, 0, 1))), 0, 0, 4, 11, 21, _GLF_IDENTITY(33, (33) | (_GLF_IDENTITY(33, int(ivec3(33, ((1 << _GLF_IDENTITY(_GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), min(int(0), _GLF_IDENTITY(int(0), clamp(int(0), int(0), int(0)))))), (_GLF_IDENTITY(_GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), min(int(0), _GLF_IDENTITY(int(0), clamp(int(0), int(0), int(0)))))), int(ivec3(_GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), min(int(0), _GLF_IDENTITY(int(0), clamp(int(0), int(0), int(0)))))), 1, 1)))) << 0)) >> _GLF_IDENTITY(int(0), int(0))), 1))))), 48, 64, 81, 98, 114, 129, 141, 151, _GLF_IDENTITY(158, clamp(_GLF_IDENTITY(158, 0 + (158)), 158, 158)), 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, _GLF_IDENTITY(68, ~(~(68))), 65, 65, 67, _GLF_IDENTITY(70, clamp(70, 70, 70)), 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, _GLF_IDENTITY(79, (79) | (79)), 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, _GLF_IDENTITY(94, max(94, 94)));
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
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(23.30, -978.179, 1398.9065, 94.15);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
        }
    }
    int a = 4;
    do {
        uv.y -= step(injectionSwitch.y, uv.x);
        uv.x -= fract(tanh(uv.x)) / ldexp(injectionSwitch.y, findMSB(a));
        if (_GLF_DEAD(false)) {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(int(_GLF_ONE(1.0, injectionSwitch.y)), (int(_GLF_ONE(1.0, injectionSwitch.y))) | (_GLF_IDENTITY(int(_GLF_ONE(1.0, injectionSwitch.y)), _GLF_IDENTITY(_GLF_IDENTITY((int(_GLF_ONE(1.0, injectionSwitch.y))), min((int(_GLF_ONE(1.0, injectionSwitch.y))), _GLF_IDENTITY((int(_GLF_ONE(1.0, injectionSwitch.y))), ((int(_GLF_ONE(1.0, injectionSwitch.y)))) | ((int(_GLF_ONE(1.0, injectionSwitch.y))))))) >> _GLF_IDENTITY(0, (0) | 0), (false ? _GLF_FUZZED((int(-4.7) - 58873)) : (_GLF_IDENTITY((int(_GLF_ONE(1.0, injectionSwitch.y))), min((int(_GLF_ONE(1.0, injectionSwitch.y))), _GLF_IDENTITY((int(_GLF_ONE(1.0, injectionSwitch.y))), ((int(_GLF_ONE(1.0, injectionSwitch.y)))) | ((int(_GLF_ONE(1.0, injectionSwitch.y))))))) >> _GLF_IDENTITY(0, (0) | 0)))))))); _injected_loop_counter++) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        {
                            ;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-8.4, 491.590, 6.2, -4.6);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, bool(bvec2(gl_FragCoord.x < 0.0, false))))), !(!(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, bool(bvec2(gl_FragCoord.x < 0.0, false)))))))))) {
                        } else {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        }
                        _GLF_color = sinh(vec4(-6.5, 1.0, -9.3, -483.069));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((injectionSwitch.x < injectionSwitch.y), bool(bvec4(_GLF_IDENTITY((injectionSwitch.x < injectionSwitch.y), ((injectionSwitch.x < injectionSwitch.y)) && true), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true && (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), bool(bvec4(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true, false, _GLF_IDENTITY(false, false || (false))))))))) {
                        continue;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, min(_GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED((-4754.4297)), (injectionSwitch)[1]), vec2((injectionSwitch)[0], _GLF_FUZZED(3776.4137)), bvec2(true, false))), _GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED((+3232.1342)), (injectionSwitch)[1]), vec2((injectionSwitch)[0], _GLF_FUZZED(153.349)), bvec2(true, false))))).x > injectionSwitch.y)))) {
                    return vec2(1.0, 1.0);
                }
            }
            continue;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (false ? _GLF_FUZZED(_GLF_IDENTITY(vec3(3.6, -9358.2121, 8.8).rrgg, clamp(_GLF_IDENTITY(vec3(3.6, -9358.2121, 8.8).rrgg, min(vec3(3.6, -9358.2121, 8.8).rrgg, vec3(3.6, -9358.2121, 8.8).rrgg)), vec3(3.6, -9358.2121, 8.8).rrgg, vec3(3.6, -9358.2121, 8.8).rrgg))) : (_GLF_outVarBackup_GLF_color = _GLF_color)));
                if (_GLF_DEAD(false)) {
                    break;
                }
                _GLF_color = roundEven(vec4(-2082.8416, -63.07, 3.5, 9.5));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x < injectionSwitch.y, (injectionSwitch.x < injectionSwitch.y) || false))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            continue;
                        }
                    } else {
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_IDENTITY((4820.0048 + inversesqrt(_GLF_color)), max((4820.0048 + inversesqrt(_GLF_color)), _GLF_IDENTITY((4820.0048 + inversesqrt(_GLF_color)), max((4820.0048 + inversesqrt(_GLF_color)), (4820.0048 + inversesqrt(_GLF_color))))));
                    }
                }
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            a--;
        } else {
        }
    } while (a > int(_GLF_IDENTITY(_GLF_IDENTITY(injectionSwitch, min(injectionSwitch, injectionSwitch)), min(_GLF_IDENTITY(_GLF_IDENTITY(injectionSwitch, min(injectionSwitch, injectionSwitch)), (_GLF_IDENTITY(injectionSwitch, min(injectionSwitch, injectionSwitch))) * mat2(1.0)), _GLF_IDENTITY(injectionSwitch, min(injectionSwitch, injectionSwitch)))).x));
    int b = 3;
    do {
        if (_GLF_DEAD(false)) {
            return _GLF_IDENTITY(vec2(1.0, 1.0), (_GLF_IDENTITY(vec2(1.0, 1.0), _GLF_IDENTITY(vec2(_GLF_IDENTITY(mat3x2(vec2(1.0, 1.0), sin(0.0), 0.0, 0.0, 1.0), (mat3x2(vec2(1.0, 1.0), sin(0.0), 0.0, 0.0, 1.0)) - mat3x2(0.0, 0.0, 0.0, 0.0, 0.0, 0.0))), clamp(vec2(_GLF_IDENTITY(mat3x2(vec2(1.0, 1.0), sin(0.0), 0.0, 0.0, 1.0), (mat3x2(vec2(1.0, 1.0), sin(0.0), 0.0, 0.0, 1.0)) - mat3x2(0.0, 0.0, 0.0, 0.0, 0.0, 0.0))), vec2(_GLF_IDENTITY(mat3x2(vec2(1.0, 1.0), sin(0.0), 0.0, 0.0, 1.0), (mat3x2(vec2(1.0, 1.0), sin(0.0), 0.0, 0.0, 1.0)) - mat3x2(0.0, 0.0, 0.0, 0.0, 0.0, 0.0))), vec2(_GLF_IDENTITY(mat3x2(vec2(1.0, 1.0), sin(0.0), 0.0, 0.0, 1.0), (mat3x2(vec2(1.0, 1.0), sin(0.0), 0.0, 0.0, 1.0)) - mat3x2(0.0, 0.0, 0.0, 0.0, 0.0, 0.0))))))) * sqrt(vec2(1.0, 1.0)));
        }
        uv.y -= step(injectionSwitch.y, uv.x) + float(a);
        uv.x *= _GLF_IDENTITY((isnan(uv.y) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x)), clamp((isnan(uv.y) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x)), (isnan(_GLF_IDENTITY(uv, max(uv, uv)).y) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x)), (isnan(_GLF_IDENTITY(uv.y, clamp(uv.y, uv.y, _GLF_IDENTITY(uv.y, float(mat4x2(uv.y, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)))))) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x))));
        if (_GLF_DEAD(false)) {
            continue;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            _GLF_IDENTITY(_GLF_color = atanh(vec4(-48.66, -96.32, 3371.3835, 5261.6179)), (_GLF_color = atanh(vec4(-48.66, -96.32, 3371.3835, 5261.6179))) / vec4(1.0, 1.0, 1.0, 1.0));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), (_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), !(!(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))))) && true))) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                } else {
                }
            }
        }
        b--;
    } while (b > _GLF_IDENTITY(int(injectionSwitch.x), 0 + (int(injectionSwitch.x))));
    int c = 2;
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_live5gl_FragCoord;
        if (_GLF_DEAD(false)) {
            return vec2(1.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)));
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        for (int _injected_loop_counter = int(_GLF_ONE(1.0, _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, injectionSwitch.y, injectionSwitch.y)))); _GLF_WRAPPED_LOOP(_injected_loop_counter > (74434 & 0)); _injected_loop_counter--) {
            _GLF_outVarBackup_GLF_color = _GLF_color;
        }
        _GLF_color = sin(vec4(-4.2, -7427.2709, 28.04, -3.6));
        if (_GLF_DEAD(false)) {
            return vec2(1.0, 1.0);
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < _GLF_IDENTITY(0.0, clamp(_GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), _GLF_IDENTITY(0.0, max(0.0, 0.0)), 0.0)), true && (gl_FragCoord.y < _GLF_IDENTITY(0.0, clamp(_GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), _GLF_IDENTITY(0.0, max(0.0, 0.0)), 0.0)))))))) {
                    discard;
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, bool(bvec4(injectionSwitch.x > injectionSwitch.y, false, true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))))));
            for (int _injected_loop_counter = (0 << _GLF_IDENTITY(_GLF_IDENTITY(int(8), int(8)), ~(~(_GLF_IDENTITY(int(8), int(8)))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_IDENTITY(_GLF_ONE(1.0, injectionSwitch.y), (false ? _GLF_FUZZED(_GLF_color[3]) : _GLF_IDENTITY(_GLF_ONE(1.0, injectionSwitch.y), max(_GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, _GLF_IDENTITY(_GLF_IDENTITY(injectionSwitch, (injectionSwitch) - tan(vec2(0.0, 0.0))).y, max(_GLF_IDENTITY(injectionSwitch, (injectionSwitch) - tan(vec2(0.0, 0.0))).y, _GLF_IDENTITY(injectionSwitch, (injectionSwitch) - tan(vec2(0.0, 0.0))).y)))))))) | 0)); _injected_loop_counter++) {
                _GLF_color = mix(vec4(3442.9926, -7497.5562, 40.59, 521.706), vec4(-3.7, 4.1, 603.941, -47.11), -11.29);
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), _GLF_IDENTITY(!(!(!(false))), (_GLF_IDENTITY(!(!(!(false))), !(!(!(!(!(false))))))) || false)))))) {
                } else {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) && true)) {
                        return vec2(1.0, 1.0);
                    }
                }
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    do {
        {
            vec2 GLF_live5color = _GLF_IDENTITY(_GLF_FUZZED(vec2(0.4, -5.7)), min(_GLF_IDENTITY(_GLF_FUZZED(vec2(0.4, -5.7)), (_GLF_FUZZED(vec2(0.4, -5.7))) / vec2(1.0, _GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(dFdxCoarse(-1.7)) : _GLF_IDENTITY(1.0, float(float(1.0))))))), _GLF_IDENTITY(_GLF_FUZZED(vec2(0.4, -5.7)), (_GLF_FUZZED(vec2(0.4, _GLF_IDENTITY(-5.7, float(_GLF_IDENTITY(mat4x2(-5.7, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0), _GLF_IDENTITY(mat4x2(mat4(mat4x2(-5.7, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0))), transpose(transpose(mat4x2(mat4(mat4x2(-5.7, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0)))))))))))) * mat2(1.0))));
            vec3 GLF_live5vecCoor = _GLF_FUZZED((_GLF_IDENTITY((-562.007) - vec3(-415.523, _GLF_IDENTITY(-1.4, float(mat3(-1.4, log(exp(0.0)), 1.0, 1.0, 0.0, 1.0, 1.0, _GLF_ZERO(0.0, injectionSwitch.x), 1.0))), 9.8), ((-562.007) - vec3(-415.523, _GLF_IDENTITY(-1.4, float(mat3(-1.4, log(exp(0.0)), 1.0, 1.0, 0.0, 1.0, 1.0, _GLF_ZERO(0.0, injectionSwitch.x), 1.0))), 9.8)) / vec3(1.0, 1.0, 1.0))));
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            } else {
                do {
                    GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[5]))));
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(mat2x3(_GLF_IDENTITY(gl_FragCoord, (gl_FragCoord) - vec4(0.0, 0.0, 0.0, 0.0)), abs(0.0), 0.0))).y < 0.0))));
                GLF_live5color.y -= tanh(GLF_live5color.x) / cosh(_GLF_IDENTITY(GLF_live5color.y, (_GLF_IDENTITY(GLF_live5color.y, (GLF_live5color.y) + 0.0)) - 0.0));
                if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(_GLF_IDENTITY(false, !(!(false))), bool(_GLF_IDENTITY(bvec3(_GLF_IDENTITY(false, !(!(false))), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), _GLF_FALSE(false, (gl_FragCoord.x < 0.0))), bvec3(bvec3(bvec3(_GLF_IDENTITY(false, !(!(false))), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), _GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))))) && true))) {
                    discard;
                }
                ;
            }
        }
        uv.y -= step(injectionSwitch.y, uv.x) + _GLF_IDENTITY(float(_GLF_IDENTITY(a, min(a, a))), (float(_GLF_IDENTITY(a, min(a, a)))) / 1.0) + float(_GLF_IDENTITY(b, 1 * (b)));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            for (int _injected_loop_counter = ((0 | 1) | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                do {
                    uv.x += ldexp(injectionSwitch.y, isinf(_GLF_IDENTITY(uv.y, 1.0 * (_GLF_IDENTITY(uv.y, (uv.y) - 0.0))) + uv.x) ? findMSB(b) : findMSB(a));
                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec4(false, false, true, false)), (bool(bvec4(false, false, true, false))) && true))));
            }
        } else {
        }
        c--;
    } while (c > int(injectionSwitch.x));
    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) || false))) {
        return vec2(1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec2(1.0, 1.0);
        }
        do {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                do {
                    return _GLF_IDENTITY(vec2(1.0, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0))) / 1.0)) - 0.0)), (vec2(1.0, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, _GLF_IDENTITY((_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0))) / 1.0, min((_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0))) / 1.0, (_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0))) / 1.0)))) - 0.0))) + sin(vec2(0.0, 0.0)));
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    continue;
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    int d = 1;
    do {
        do {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_IDENTITY(_GLF_color = vec4(_GLF_IDENTITY(-_GLF_IDENTITY(44.77, (44.77) / 1.0), min(-_GLF_IDENTITY(44.77, (_GLF_IDENTITY(44.77, mix(float(_GLF_FUZZED(5.0)), float(44.77), bool(true)))) / 1.0), -_GLF_IDENTITY(44.77, (44.77) / 1.0))), -1.1, 0.5, -957.215), (_GLF_IDENTITY(_GLF_color = vec4(_GLF_IDENTITY(-_GLF_IDENTITY(44.77, (44.77) / 1.0), min(-_GLF_IDENTITY(44.77, (_GLF_IDENTITY(44.77, mix(float(_GLF_FUZZED(5.0)), float(44.77), bool(true)))) / 1.0), -_GLF_IDENTITY(44.77, (44.77) / 1.0))), -1.1, 0.5, -957.215), vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_color = vec4(_GLF_IDENTITY(-_GLF_IDENTITY(44.77, (44.77) / 1.0), min(-_GLF_IDENTITY(44.77, (_GLF_IDENTITY(44.77, mix(float(_GLF_FUZZED(5.0)), float(44.77), bool(true)))) / 1.0), -_GLF_IDENTITY(44.77, (44.77) / 1.0))), -1.1, 0.5, -957.215)))) / vec4(1.0, 1.0, 1.0, 1.0));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < sqrt(0.0)), bool(bvec3((gl_FragCoord.x < sqrt(0.0)), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false)))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, mix(vec4((_GLF_color)[0], _GLF_FUZZED(vec4(-82.32, -4.7, 47.77, -7330.6683).g), (_GLF_color)[2], _GLF_FUZZED(7663.3522)), vec4(_GLF_FUZZED(1645.5763), (_GLF_color)[1], _GLF_FUZZED(-3.9), (_GLF_color)[3]), bvec4(false, _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), false, true)));
                        _GLF_color = intBitsToFloat(ivec4(-68999, -10339, 89466, 96703));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b) + float(c);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                d--;
                {
                    vec2 GLF_live6coord = _GLF_FUZZED(vec2(5.0, -2576.9318));
                    int GLF_live6i = _GLF_FUZZED((93288));
                    vec4 GLF_live6res = _GLF_FUZZED(vec4(-887.287, -2.2, 681.573, 2.6));
                    float GLF_live6uvstep = _GLF_IDENTITY(_GLF_FUZZED(((-1.3) + 3.9)), max(_GLF_FUZZED(((-1.3) + 3.9)), _GLF_FUZZED(((-1.3) + 3.9))));
                    {
                        int GLF_live6looplimiter0 = 0;
                        for (int GLF_live6j = 0; GLF_live6j < 3; GLF_live6j++) {
                            if (GLF_live6looplimiter0 >= 7) {
                                break;
                            }
                            GLF_live6looplimiter0++;
                            {
                                GLF_live6res += texture(GLF_live6tex, GLF_live6coord + vec2(float(GLF_live6i - 1) * GLF_live6uvstep, float(GLF_live6j - 1) * GLF_live6uvstep)) * GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live6i * 3 + GLF_live6j, ~(~(_GLF_IDENTITY(GLF_live6i * 3 + GLF_live6j, (GLF_live6i * 3 + GLF_live6j) | (GLF_live6i * 3 + GLF_live6j))))), 9)];
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                        continue;
                    }
                }
            } else {
            }
        } while (d > int(injectionSwitch.x));
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    return fract(uv);
}

float patternize(vec2 uv) {
    vec2 size = vec2(0.45);
    vec2 st = step(size, _GLF_IDENTITY(_GLF_IDENTITY(uv, (uv) * vec2(1.0, _GLF_IDENTITY(1.0, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? 1.0 : _GLF_FUZZED(cosh(64.68)))))), vec2(mat2x4(_GLF_IDENTITY(uv, (uv) * vec2(1.0, _GLF_IDENTITY(1.0, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? 1.0 : _GLF_FUZZED(cosh(64.68)))))), 1.0, 1.0, sin(0.0), 1.0, 1.0, 0.0))));
    switch (int(mod(gl_FragCoord.y, 5.0))) {
        case 0:
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return 1.0;
            }
            return mix(pow(st.x, injectionSwitch.y), st.x, _GLF_IDENTITY(size.y, float(mat2x3(_GLF_IDENTITY(size.y, clamp(_GLF_IDENTITY(size.y, mix(float(_GLF_FUZZED(-95.02)), float(size.y), bool(true))), _GLF_IDENTITY(size.y, (false ? _GLF_FUZZED(-75.29) : size.y)), size.y)), 1.0, 1.0, determinant(_GLF_IDENTITY(mat2(0.0, log(1.0), 0.0, 0.0), mat2(mat2x3(_GLF_IDENTITY(mat2(0.0, log(1.0), 0.0, 0.0), (mat2(0.0, log(1.0), 0.0, 0.0)) - mat2(0.0, 0.0, 0.0, 0.0)))))), 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0))))))));
            break;
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) && _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))) {
                return 1.0;
            }
        case 1:
            {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    ;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return 1.0;
                    }
                }
            }
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    break;
                }
                int GLF_live0k = _GLF_FUZZED((88650 ^ (-66375)));
                int GLF_live0looplimiter0 = 0;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                }
                float GLF_live0magnitudeX = _GLF_FUZZED((+float(_GLF_IDENTITY(true, (true) && true))));
                if (_GLF_DEAD(false)) {
                    break;
                }
                mat4 GLF_live0matrix_a = _GLF_FUZZED((_GLF_IDENTITY(_GLF_IDENTITY(mat4(9.9, 7.3, -862.568, -6.8, 3130.8022, -39.22, -0.8, -8200.9711, -5.6, 4346.4116, 3405.6966, -5.1, -1.4, 93.33, -533.098, 4.8), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)) ? _GLF_FUZZED((mat4(9894.7856, 1.5, 7.7, 0.2, 5.4, -8326.6454, -27.19, 443.258, 5.4, 31.35, 48.65, -4.1, -3.6, -5.6, -8.3, 7.9) + mat4(6.6, -7.8, -3.9, -251.314, -92.59, -60.01, 64.80, -667.635, -405.841, -9.6, 64.67, -86.28, -85.72, -1.3, -793.660, -9292.5838))) : _GLF_IDENTITY(mat4(9.9, 7.3, -862.568, -6.8, 3130.8022, -39.22, -0.8, -8200.9711, -5.6, 4346.4116, 3405.6966, -5.1, -1.4, 93.33, -533.098, 4.8), transpose(transpose(mat4(9.9, 7.3, -862.568, -6.8, 3130.8022, -39.22, -0.8, -8200.9711, -5.6, 4346.4116, 3405.6966, -5.1, -1.4, 93.33, -533.098, 4.8)))))) + (+mat4(-27.25, 287.378, 6.8, -9419.6828, 439.331, -0.5, 927.326, 48.28, 1.5, 8.9, 4.8, 4.4, -116.625, -1.5, -2.5, 64.34)), (_GLF_IDENTITY(true, bool(bool(true))) ? (_GLF_IDENTITY(mat4(9.9, 7.3, -862.568, -6.8, 3130.8022, -39.22, -0.8, -8200.9711, -5.6, 4346.4116, 3405.6966, -5.1, -1.4, 93.33, -533.098, 4.8), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)) ? _GLF_FUZZED((mat4(9894.7856, 1.5, 7.7, 0.2, 5.4, -8326.6454, -27.19, 443.258, 5.4, 31.35, 48.65, -4.1, -3.6, -5.6, -8.3, 7.9) + mat4(6.6, -7.8, -3.9, -251.314, -92.59, -60.01, 64.80, -667.635, -405.841, -_GLF_IDENTITY(9.6, mix(float(_GLF_FUZZED((8.1))), float(_GLF_IDENTITY(9.6, (9.6) + 0.0)), bool(true))), _GLF_IDENTITY(64.67, min(64.67, 64.67)), -86.28, -85.72, -1.3, -793.660, -9292.5838))) : _GLF_IDENTITY(mat4(9.9, 7.3, -862.568, -6.8, 3130.8022, -39.22, -0.8, -8200.9711, -5.6, 4346.4116, 3405.6966, -5.1, -1.4, 93.33, -533.098, 4.8), transpose(_GLF_IDENTITY(transpose(mat4(9.9, 7.3, -862.568, -6.8, 3130.8022, -39.22, -0.8, -8200.9711, _GLF_IDENTITY(-5.6, clamp(-5.6, _GLF_IDENTITY(-5.6, max(-5.6, _GLF_IDENTITY(-5.6, clamp(-5.6, -5.6, -5.6)))), _GLF_IDENTITY(_GLF_IDENTITY(-5.6, _GLF_IDENTITY(float(vec3(-5.6, 0.0, 1.0)), mix(float(float(vec3(-5.6, 0.0, 1.0))), float(_GLF_FUZZED(-7071.3393)), bool(false)))), max(_GLF_IDENTITY(_GLF_IDENTITY(-5.6, _GLF_IDENTITY(float(vec3(-5.6, 0.0, 1.0)), mix(float(float(vec3(-5.6, 0.0, 1.0))), float(_GLF_FUZZED(-7071.3393)), bool(false)))), float(mat3x2(_GLF_IDENTITY(_GLF_IDENTITY(-5.6, _GLF_IDENTITY(float(vec3(-5.6, 0.0, 1.0)), mix(float(float(vec3(-5.6, 0.0, 1.0))), float(_GLF_FUZZED(-7071.3393)), bool(false)))), (false ? _GLF_FUZZED(-0.9) : _GLF_IDENTITY(-5.6, _GLF_IDENTITY(float(vec3(-5.6, 0.0, 1.0)), mix(float(float(vec3(-5.6, 0.0, 1.0))), float(_GLF_FUZZED(-7071.3393)), bool(false)))))), 1.0, _GLF_ONE(1.0, injectionSwitch.y), 1.0, 0.0, exp(0.0)))), _GLF_IDENTITY(_GLF_IDENTITY(-5.6, _GLF_IDENTITY(float(vec3(-5.6, 0.0, 1.0)), mix(float(float(vec3(-5.6, 0.0, 1.0))), float(_GLF_FUZZED(-7071.3393)), bool(false)))), mix(float(_GLF_FUZZED((+4.9))), float(_GLF_IDENTITY(-5.6, _GLF_IDENTITY(float(vec3(-5.6, 0.0, 1.0)), mix(float(float(vec3(-5.6, 0.0, 1.0))), float(_GLF_FUZZED(-7071.3393)), bool(false))))), bool(true))))))), 4346.4116, 3405.6966, -5.1, -1.4, 93.33, -_GLF_IDENTITY(533.098, float(vec4(533.098, 0.0, 0.0, 1.0))), 4.8)), (transpose(mat4(9.9, 7.3, -862.568, -6.8, 3130.8022, -39.22, -0.8, -8200.9711, _GLF_IDENTITY(-5.6, clamp(-5.6, _GLF_IDENTITY(-5.6, max(-5.6, _GLF_IDENTITY(-5.6, clamp(-5.6, -5.6, -5.6)))), _GLF_IDENTITY(_GLF_IDENTITY(-5.6, _GLF_IDENTITY(float(vec3(-5.6, 0.0, 1.0)), mix(float(float(vec3(-5.6, 0.0, 1.0))), float(_GLF_FUZZED(-7071.3393)), bool(false)))), max(_GLF_IDENTITY(_GLF_IDENTITY(-5.6, _GLF_IDENTITY(float(vec3(-5.6, 0.0, 1.0)), mix(float(float(vec3(-5.6, 0.0, 1.0))), float(_GLF_FUZZED(-7071.3393)), bool(false)))), float(mat3x2(_GLF_IDENTITY(_GLF_IDENTITY(-5.6, _GLF_IDENTITY(float(vec3(-5.6, 0.0, 1.0)), mix(float(float(vec3(-5.6, 0.0, 1.0))), float(_GLF_FUZZED(-7071.3393)), bool(false)))), (false ? _GLF_FUZZED(-0.9) : _GLF_IDENTITY(-5.6, _GLF_IDENTITY(float(vec3(-5.6, 0.0, 1.0)), mix(float(float(vec3(-5.6, 0.0, 1.0))), float(_GLF_FUZZED(-7071.3393)), bool(false)))))), 1.0, _GLF_ONE(1.0, injectionSwitch.y), 1.0, 0.0, exp(0.0)))), _GLF_IDENTITY(_GLF_IDENTITY(-5.6, _GLF_IDENTITY(float(vec3(-5.6, 0.0, 1.0)), mix(float(float(vec3(-5.6, 0.0, 1.0))), float(_GLF_FUZZED(-7071.3393)), bool(false)))), mix(float(_GLF_FUZZED((+4.9))), float(_GLF_IDENTITY(-5.6, _GLF_IDENTITY(float(vec3(-5.6, 0.0, 1.0)), mix(float(float(vec3(-5.6, 0.0, 1.0))), float(_GLF_FUZZED(-7071.3393)), bool(false))))), bool(true))))))), 4346.4116, 3405.6966, -5.1, -1.4, 93.33, -_GLF_IDENTITY(533.098, float(vec4(533.098, 0.0, 0.0, 1.0))), 4.8))) - _GLF_IDENTITY(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0), (mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)) - mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))))))) + (+mat4(-27.25, 287.378, 6.8, -9419.6828, 439.331, -0.5, 927.326, 48.28, _GLF_IDENTITY(1.5, (1.5) / 1.0), 8.9, 4.8, 4.4, -116.625, -1.5, -2.5, 64.34))) : _GLF_FUZZED(mat4(-6.4, 6500.1861, 2.7, -7.8, 2.7, 8.5, 1974.8813, 9966.7398, 239.911, -7.9, -8190.9131, 90.73, 1.1, -_GLF_IDENTITY(75.05, (false ? _GLF_FUZZED(GLF_live0magnitudeX) : 75.05)), 71.49, 74.39))))));
                vec4 GLF_live0matrix_u = _GLF_FUZZED(vec4(-_GLF_IDENTITY(6854.7921, mix(float(_GLF_IDENTITY(6854.7921, (6854.7921) / 1.0)), float(_GLF_FUZZED(-0.2)), bool(false))), 3.4, 2381.9356, 9.7));
                int GLF_live0x = _GLF_FUZZED(41685);
                {
                    do {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < 0.0), !(!(_GLF_IDENTITY((gl_FragCoord.x < 0.0), bool(bvec4(_GLF_IDENTITY((gl_FragCoord.x < 0.0), true && ((gl_FragCoord.x < 0.0))), false, false, true))))))))) {
                        } else {
                            if (_GLF_IDENTITY(GLF_live0looplimiter0 >= 5, false || (GLF_live0looplimiter0 >= 5))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return 1.0;
                                }
                                ;
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, mat4(1.0) * (gl_FragCoord)).x, float(mat4(_GLF_IDENTITY(gl_FragCoord, mat4(1.0) * (gl_FragCoord)).x, _GLF_ONE(1.0, injectionSwitch.y), 1.0, 0.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0)), dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0))), 0.0, 1.0, 1.0, 1.0, 1.0, _GLF_ONE(1.0, injectionSwitch.y), 1.0, 1.0, 1.0, 0.0, 0.0))) < 0.0)))) {
                            return 1.0;
                        }
                        vec2 GLF_live5color = _GLF_FUZZED(vec2(-_GLF_IDENTITY(842.952, min(842.952, 842.952)), 84.02));
                        int GLF_live5i = _GLF_FUZZED(-95852);
                        vec3 GLF_live5vecCoor = _GLF_FUZZED(vec3(9022.0404, 8266.0029, 640.969));
                        {
                            GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(_GLF_IDENTITY(GLF_live5data[4], (GLF_live5data[4]) >> (0 ^ 0))))));
                            GLF_live5color[1] += asinh(GLF_live5gl_FragCoord.y * ldexp(GLF_live5color.y, -GLF_live5i));
                            ;
                        }
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 | 1)); _injected_loop_counter++) {
                        GLF_live0looplimiter0++;
                    }
                    {
                        do {
                            _GLF_IDENTITY(_GLF_IDENTITY(GLF_live0magnitudeX += pow(GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0k, 4)], 2.0), (GLF_live0magnitudeX += _GLF_IDENTITY(pow(GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0k, 4)], 2.0), max(pow(GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0k, 4)], 2.0), pow(GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0k, 4)], 2.0)))) * 1.0), (true ? _GLF_IDENTITY(GLF_live0magnitudeX += pow(GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0k, 4)], 2.0), _GLF_IDENTITY((GLF_live0magnitudeX += _GLF_IDENTITY(pow(GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0k, 4)], 2.0), max(pow(GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0k, 4)], 2.0), pow(GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)][_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live0k, 4), (_GLF_MAKE_IN_BOUNDS_INT(GLF_live0k, 4)) * 1)], 2.0)))) * 1.0, (true ? ((GLF_live0magnitudeX += _GLF_IDENTITY(pow(GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0k, 4)], 2.0), max(pow(GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0k, 4)], 2.0), pow(GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)][_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live0k, 4), (_GLF_MAKE_IN_BOUNDS_INT(GLF_live0k, 4)) * 1)], 2.0)))) * 1.0) : _GLF_FUZZED(534.083)))) : _GLF_FUZZED(sign(1161.8757))));
                            if (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_DEAD(false))))) {
                                break;
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, max(injectionSwitch.x, injectionSwitch.x)) > injectionSwitch.y)))) {
                            continue;
                        }
                        GLF_live0matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)] = _GLF_IDENTITY(GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)][_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live0k, (_GLF_IDENTITY(GLF_live0k, clamp(GLF_live0k, GLF_live0k, GLF_live0k))) | (_GLF_IDENTITY(GLF_live0k, clamp(GLF_live0k, GLF_live0k, GLF_live0k)))), 4)], (GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0x, 4)][_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live0k, (_GLF_IDENTITY(GLF_live0k, clamp(GLF_live0k, GLF_live0k, GLF_live0k))) | (_GLF_IDENTITY(GLF_live0k, clamp(GLF_live0k, GLF_live0k, GLF_live0k)))), 4)]) - 0.0);
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
            return mix(pow(_GLF_IDENTITY(uv.y, max(uv.y, _GLF_IDENTITY(uv.y, min(uv.y, uv.y)))), injectionSwitch.y), st.y, size.x);
            break;
        case 2:
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, abs(vec4(0.0, 0.0, 0.0, 0.0)) + (_GLF_color));
                _GLF_color = vec4(_GLF_IDENTITY(11.92, min(11.92, _GLF_IDENTITY(11.92, mix(float(_GLF_FUZZED(3510.2429)), float(_GLF_IDENTITY(11.92, mix(float(11.92), float(_GLF_FUZZED(59.76)), bool(false)))), bool(true))))), 40.71, 7.2, 59.57);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (abs(1431.8933) + _GLF_color);
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            discard;
            break;
        case 3:
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-7.2, -92.61, -528.470, 7.1);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return 1.0;
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    return mix(pow(uv.y, injectionSwitch.y), uv.y, size.y);
                } else {
                }
            }
            break;
        case 4:
            return mix(pow(_GLF_IDENTITY(st.y, clamp(st.y, st.y, _GLF_IDENTITY(st.y, (st.y) + 0.0))), _GLF_IDENTITY(injectionSwitch.y, mix(_GLF_IDENTITY(float(injectionSwitch.y), mix(float(float(injectionSwitch.y)), float(_GLF_FUZZED(((-123.375) + (-0.0)))), bool(false))), float(_GLF_FUZZED(-3.5)), bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))), st.x, _GLF_IDENTITY(size, max(size, size)).x);
            break;
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec3(vec2(-5.9, 62.59), -5.6).ppps;
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
}

int binarySearch(BinarySearchObject obj, int x) {
    if (_GLF_DEAD(false)) {
        return 1;
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bvec3(false, false, false), bvec3(bvec4(_GLF_IDENTITY(bvec3(false, false, false), _GLF_IDENTITY(bvec3(bvec3(bvec3(false, false, false))), bvec3(bvec3(bvec3(bvec3(bvec3(false, false, false))))))), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))))))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return 1;
        }
        return 1;
    }
    int l = 0, r = 9;
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        while (_GLF_IDENTITY(l, (l) << 0) <= _GLF_IDENTITY(r, (r) << 0)) {
            int m = (l + r) / 2;
            for (int _injected_loop_counter = (0 & (-_GLF_IDENTITY(39131, (39131) - 0))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                if (obj.prime_numbers[m] == x) {
                    return _GLF_IDENTITY(_GLF_IDENTITY(m, _GLF_IDENTITY((m) | (m), _GLF_IDENTITY(0, (0) ^ 0) | ((m) | (m)))), clamp(_GLF_IDENTITY(m, _GLF_IDENTITY((m) | (m), _GLF_IDENTITY(0, (0) ^ 0) | ((m) | (m)))), _GLF_IDENTITY(m, _GLF_IDENTITY((m) | (m), _GLF_IDENTITY(0, (0) ^ 0) | ((m) | (m)))), _GLF_IDENTITY(_GLF_IDENTITY(m, _GLF_IDENTITY((m) | (m), _GLF_IDENTITY(0, (0) ^ 0) | ((m) | (m)))), (_GLF_IDENTITY(m, _GLF_IDENTITY((m) | (m), _GLF_IDENTITY(0, (0) ^ 0) | ((m) | (m))))) | (_GLF_IDENTITY(m, _GLF_IDENTITY((m) | (m), _GLF_IDENTITY(0, (0) ^ 0) | ((m) | (m))))))));
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    {
                        vec2 GLF_live5color = _GLF_FUZZED(vec2(4964.6471, -7843.7011));
                        int GLF_live5i = _GLF_FUZZED(ivec2(-3711, 72611).r);
                        vec3 GLF_live5vecCoor = _GLF_FUZZED((vec3(-0.0, _GLF_IDENTITY(97.97, length(vec4(0.0, 0.0, 0.0, 0.0)) + (97.97)), _GLF_IDENTITY(-71.54, (-71.54) / 1.0)) + (-6.8)));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        if (int(_GLF_IDENTITY(GLF_live5gl_FragCoord[1], (GLF_live5gl_FragCoord[1]) + 0.0)) < 60) {
                            GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[1]))));
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            GLF_live5color[1] *= atan(faceforward(GLF_live5injectionSwitch, GLF_live5color.xx, GLF_live5vecCoor.yx).y);
                            ;
                        } else if (int(GLF_live5gl_FragCoord[1]) < 90) {
                            GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[2]))));
                            GLF_live5color.x += atanh(GLF_live5color.x) * cosh(GLF_live5injectionSwitch.y) * smoothstep(GLF_live5color, GLF_live5injectionSwitch, GLF_live5gl_FragCoord.yy).x;
                            ;
                        } else if (int(GLF_live5gl_FragCoord[1]) < 120) {
                            GLF_live5color = fract(acosh(clamp(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[3])), 1.0, 1000.0)));
                            GLF_live5color.x += (isnan(_GLF_IDENTITY(GLF_live5gl_FragCoord, clamp(GLF_live5gl_FragCoord, GLF_live5gl_FragCoord, _GLF_IDENTITY(GLF_live5gl_FragCoord, clamp(GLF_live5gl_FragCoord, _GLF_IDENTITY(GLF_live5gl_FragCoord, (GLF_live5gl_FragCoord) - vec4(0.0, 0.0, 0.0, 0.0)), GLF_live5gl_FragCoord)))).x) ? log2(GLF_live5gl_FragCoord.x) : log2(GLF_live5gl_FragCoord.y));
                            ;
                        } else if (int(GLF_live5gl_FragCoord[1]) < _GLF_IDENTITY(150, ~(~(_GLF_IDENTITY(150, ~(~(_GLF_IDENTITY(150, (150) + _GLF_IDENTITY(0, int(int(0))))))))))) {
                            ;
                        } else {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_IDENTITY(int(GLF_live5gl_FragCoord[1]) < 180, (int(GLF_live5gl_FragCoord[1]) < 180) || false)) {
                                GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(_GLF_IDENTITY(GLF_live5data[4], int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ (GLF_live5data[4]))))));
                                _GLF_IDENTITY(GLF_live5color[1] += asinh(GLF_live5gl_FragCoord.y * ldexp(GLF_live5color.y, -GLF_live5i)), _GLF_IDENTITY((GLF_live5color[1] += asinh(GLF_live5gl_FragCoord.y * ldexp(GLF_live5color.y, -GLF_live5i))), (_GLF_IDENTITY((GLF_live5color[1] += asinh(GLF_live5gl_FragCoord.y * ldexp(GLF_live5color.y, -GLF_live5i))), (false ? _GLF_FUZZED(-39.14) : (GLF_live5color[1] += asinh(GLF_live5gl_FragCoord.y * ldexp(GLF_live5color.y, -GLF_live5i)))))) * 1.0) * exp(0.0));
                                ;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    break;
                                }
                            } else if (int(GLF_live5gl_FragCoord[1]) < 210) {
                                GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[_GLF_IDENTITY(5, (5) >> 0)]))));
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    GLF_live5color.y -= tanh(GLF_live5color.x) / cosh(GLF_live5color.y);
                                }
                                ;
                            } else if (int(GLF_live5gl_FragCoord[1]) < 240) {
                                GLF_live5color = fract(asinh(GLF_live5vecCoor.yx - trunc(float(_GLF_IDENTITY(GLF_live5data[6], ~(_GLF_IDENTITY(~(GLF_live5data[6]), int(int(~(GLF_live5data[6]))))))))));
                                GLF_live5color.y -= isnan(float(GLF_live5i)) ? tanh(GLF_live5gl_FragCoord.x) : atanh(GLF_live5gl_FragCoord.y);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return 1;
                                }
                                ;
                            } else if (int(GLF_live5gl_FragCoord[1]) < 270) {
                                GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[7]))));
                                _GLF_IDENTITY(GLF_live5color.y *= mix(_GLF_IDENTITY(normalize(GLF_live5vecCoor), vec3(mat2x3(normalize(GLF_live5vecCoor), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 1.0, 0.0))), normalize(vec3(GLF_live5color, degrees(GLF_live5color.x))), GLF_live5injectionSwitch.x).y, (GLF_live5color.y *= mix(_GLF_IDENTITY(normalize(GLF_live5vecCoor), vec3(mat2x3(normalize(GLF_live5vecCoor), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 1.0, 0.0))), normalize(vec3(GLF_live5color, degrees(GLF_live5color.x))), GLF_live5injectionSwitch.x).y) * 1.0);
                                ;
                            } else {
                                ;
                            }
                        }
                    }
                    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, (false) && true)), false || (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, (false) && true)), !(!(_GLF_DEAD(_GLF_IDENTITY(false, (false) && true)))))))) {
                        _GLF_color = vec4(8.9, 140.859, -43.63, -653.915);
                    }
                    _GLF_IDENTITY(_GLF_color = unpackUnorm4x8(108235u), exp(vec4(0.0, 0.0, 0.0, 0.0)) * (_GLF_color = unpackUnorm4x8(108235u)));
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                }
            }
            if (obj.prime_numbers[m] < x) {
                if (_GLF_DEAD(false)) {
                    break;
                }
                do {
                    l = m + 1;
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    discard;
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    break;
                }
                r = m - 1;
            }
        }
    } else {
    }
    {
        vec2 GLF_live6coord = _GLF_IDENTITY(_GLF_FUZZED(vec2(9.9, 7.4).rr), min(_GLF_FUZZED(vec2(9.9, 7.4).rr), _GLF_FUZZED(vec2(9.9, 7.4).rr)));
        int GLF_live6i = _GLF_FUZZED(57404);
        int GLF_live6j = _GLF_FUZZED(((-79749) - 39971));
        int GLF_live6looplimiter0 = 0;
        vec4 GLF_live6res = _GLF_FUZZED((mat3x4(_GLF_IDENTITY(-4.1, (-4.1) + 0.0), 173.725, -89.75, 73.73, -2.9, 9838.4360, 14.26, -0.4, 7.5, 7.5, -3.5, 4.8) * vec3(_GLF_IDENTITY(-1.6, (-1.6) / 1.0), _GLF_IDENTITY(1.8, clamp(1.8, _GLF_IDENTITY(1.8, min(1.8, 1.8)), _GLF_IDENTITY(1.8, max(_GLF_IDENTITY(1.8, (1.8) - 0.0), 1.8)))), 9.9)));
        float GLF_live6uvstep = _GLF_FUZZED(_GLF_IDENTITY(-7.6, (-7.6) / 1.0));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return 1;
        }
        {
            if (_GLF_IDENTITY(GLF_live6looplimiter0, clamp(GLF_live6looplimiter0, GLF_live6looplimiter0, GLF_live6looplimiter0)) >= 7) {
                do {
                    ;
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(false)) {
                    return 1;
                }
            }
            for (int _injected_loop_counter = ((_GLF_IDENTITY(~_GLF_IDENTITY((-53480), ((-53480)) | ((-53480))), max(~_GLF_IDENTITY((-53480), ((-53480)) | ((-53480))), ~_GLF_IDENTITY((-53480), ((-53480)) | ((-53480)))))) & 0); _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter, (_injected_loop_counter) | (_injected_loop_counter)) != 1); _injected_loop_counter++) {
                GLF_live6looplimiter0++;
                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                    continue;
                }
            }
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < 0.0, false || (_GLF_IDENTITY(gl_FragCoord.y < 0.0, bool(_GLF_IDENTITY(bvec2(gl_FragCoord.y < 0.0, false), _GLF_IDENTITY(bvec2(_GLF_IDENTITY(bvec2(bvec2(gl_FragCoord.y < 0.0, false)), bvec2(bvec2(bvec2(bvec2(gl_FragCoord.y < 0.0, false)))))), bvec2(bvec4(bvec2(_GLF_IDENTITY(bvec2(bvec2(gl_FragCoord.y < 0.0, false)), bvec2(bvec2(bvec2(bvec2(gl_FragCoord.y < 0.0, false)))))), true, true)))))))))))) {
                    _GLF_color = _GLF_color;
                }
                GLF_live6res += texture(GLF_live6tex, GLF_live6coord + _GLF_IDENTITY(vec2(float(GLF_live6i - 1) * GLF_live6uvstep, _GLF_IDENTITY(float(GLF_live6j - 1) * GLF_live6uvstep, mix(float(float(GLF_live6j - 1) * GLF_live6uvstep), float(_GLF_FUZZED(1319.6147)), bool(false)))), vec2(0.0, 0.0) + (_GLF_IDENTITY(vec2(float(GLF_live6i - 1) * GLF_live6uvstep, _GLF_IDENTITY(float(GLF_live6j - 1) * GLF_live6uvstep, mix(float(float(GLF_live6j - 1) * GLF_live6uvstep), float(_GLF_FUZZED(1319.6147)), bool(false)))), (false ? _GLF_FUZZED(sqrt(GLF_live6coord)) : vec2(float(GLF_live6i - 1) * GLF_live6uvstep, _GLF_IDENTITY(float(GLF_live6j - 1) * GLF_live6uvstep, mix(float(float(GLF_live6j - 1) * GLF_live6uvstep), float(_GLF_FUZZED(1319.6147)), bool(false))))))))) * GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + GLF_live6j, 9)];
            } while (_GLF_WRAPPED_LOOP(false));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = _GLF_color;
        }
    }
    return -1;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(false)) {
            return 1;
        }
        _GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            return 1;
        }
    }
}

void main() {
    vec4 GLF_merged2_0_2_1_2_2_2buv;
    {
        {
            if (_GLF_DEAD(false)) {
                return;
            }
            ;
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    BinarySearchObject obj;
    {
        vec2 GLF_live6coord = _GLF_FUZZED(vec2(9.3, -791.020));
        int GLF_live6i = _GLF_FUZZED((+ivec4(_GLF_IDENTITY(8554, int(int(_GLF_IDENTITY(8554, int(ivec4(8554, 0, 1, 0)))))), -39403, 5158, 12094)).t);
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_merged2_0_2_1_2_2_2buv;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return;
            }
        }
        int GLF_live6looplimiter0 = 0;
        vec4 GLF_live6res = _GLF_FUZZED(vec4(657.638, 37.50, -2090.0008, -1.0));
        float GLF_live6uvstep = _GLF_FUZZED(_GLF_IDENTITY(-7.6, clamp(_GLF_IDENTITY(-7.6, mix(float(_GLF_FUZZED(-11.51)), float(-7.6), bool(true))), -7.6, -7.6)));
        for (int GLF_live6j = 0; _GLF_IDENTITY(GLF_live6j, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(GLF_live6looplimiter0) : GLF_live6j)) < 3; GLF_live6j++) {
            if (GLF_live6looplimiter0 >= 7) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                break;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                GLF_live6looplimiter0++;
            } else {
            }
            {
                GLF_live6res += texture(GLF_live6tex, GLF_live6coord + vec2(float(GLF_live6i - 1) * _GLF_IDENTITY(GLF_live6uvstep, min(GLF_live6uvstep, GLF_live6uvstep)), float(GLF_live6j - 1) * _GLF_IDENTITY(GLF_live6uvstep, (_GLF_IDENTITY(GLF_live6uvstep, (_GLF_IDENTITY(GLF_live6uvstep, clamp(GLF_live6uvstep, GLF_live6uvstep, GLF_live6uvstep))) * 1.0)) / 1.0))) * GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + GLF_live6j, 9)];
            }
        }
    }
    do {
        for (int i = 0; i < 10; i++) {
            do {
                vec4 _GLF_outVarBackup_GLF_color;
                do {
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(false)) {
                    discard;
                }
                _GLF_color = _GLF_IDENTITY(vec4(-6.3, -_GLF_IDENTITY(859.718, clamp(_GLF_IDENTITY(859.718, min(859.718, 859.718)), _GLF_IDENTITY(859.718, max(859.718, 859.718)), 859.718)), -9.9, -0.6), (vec4(-6.3, -_GLF_IDENTITY(_GLF_IDENTITY(859.718, clamp(_GLF_IDENTITY(859.718, min(859.718, 859.718)), _GLF_IDENTITY(859.718, max(859.718, 859.718)), 859.718)), _GLF_IDENTITY((true ? _GLF_IDENTITY(859.718, clamp(_GLF_IDENTITY(859.718, min(859.718, 859.718)), _GLF_IDENTITY(859.718, max(859.718, 859.718)), 859.718)) : _GLF_FUZZED(-5.4)), clamp((true ? _GLF_IDENTITY(859.718, clamp(_GLF_IDENTITY(859.718, min(859.718, 859.718)), _GLF_IDENTITY(859.718, max(859.718, 859.718)), 859.718)) : _GLF_FUZZED(-5.4)), (true ? _GLF_IDENTITY(859.718, clamp(_GLF_IDENTITY(859.718, min(859.718, 859.718)), _GLF_IDENTITY(859.718, max(859.718, 859.718)), 859.718)) : _GLF_FUZZED(-5.4)), (true ? _GLF_IDENTITY(859.718, clamp(_GLF_IDENTITY(859.718, min(859.718, 859.718)), _GLF_IDENTITY(859.718, max(859.718, 859.718)), 859.718)) : _GLF_FUZZED(-5.4))))), _GLF_IDENTITY(-9.9, _GLF_IDENTITY(float(mat2x3(-9.9, 1.0, 1.0, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 0.0)), (false ? _GLF_FUZZED(-98.74) : float(mat2x3(-9.9, 1.0, 1.0, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 0.0))))), -0.6)) / vec4(1.0, 1.0, 1.0, 1.0));
                do {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.y, _GLF_IDENTITY((gl_FragCoord.y) / 1.0, (true ? _GLF_IDENTITY((gl_FragCoord.y) / 1.0, 0.0 + ((gl_FragCoord.y) / 1.0)) : _GLF_FUZZED(tan(dot(_GLF_outVarBackup_GLF_color, GLF_live5gl_FragCoord)))))) >= sqrt(0.0))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(false)) {
                    break;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        int GLF_live4looplimiter0 = 0;
                        if (GLF_live4looplimiter0 >= 5) {
                            ;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                continue;
                            }
                        }
                    }
                    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, gl_FragCoord, gl_FragCoord)).x < 0.0))), (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, gl_FragCoord, gl_FragCoord)).x < 0.0)))) || false)) {
                        break;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = ((-_GLF_IDENTITY(0.4, min(_GLF_IDENTITY(0.4, (0.4) + 0.0), _GLF_IDENTITY(0.4, (true ? _GLF_IDENTITY(0.4, (0.4) - 0.0) : _GLF_FUZZED(-393.519)))))) - dFdx(vec4(-4.8, -800.158, 42.49, 3523.7479)));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((gl_FragCoord.y >= 0.0), !(!(_GLF_IDENTITY((gl_FragCoord.y >= 0.0), bool(bvec3((gl_FragCoord.y >= 0.0), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false))))))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(false)) {
                continue;
            }
            {
                int GLF_live1i = _GLF_FUZZED(39492);
                float GLF_live1ref = _GLF_FUZZED((vec4(61.52, -659.221, 22.84, -5424.5784).a));
                float GLF_live1s = _GLF_IDENTITY(_GLF_FUZZED(54.93), min(_GLF_IDENTITY(_GLF_FUZZED(54.93), min(_GLF_IDENTITY(_GLF_FUZZED(54.93), _GLF_IDENTITY(float(vec3(_GLF_FUZZED(54.93), 0.0, 1.0)), max(float(vec3(_GLF_FUZZED(54.93), 0.0, 1.0)), _GLF_IDENTITY(float(vec3(_GLF_FUZZED(54.93), 0.0, 1.0)), min(float(vec3(_GLF_FUZZED(54.93), 0.0, 1.0)), float(vec3(_GLF_FUZZED(54.93), 0.0, 1.0))))))), _GLF_FUZZED(54.93))), _GLF_FUZZED(54.93)));
                if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), bool(bvec2(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))), !(_GLF_IDENTITY(!(_GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), bool(bvec2(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))), (bool(_GLF_IDENTITY(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), bool(bvec2(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) || false)), true && (!(_GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), bool(bvec2(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))), (bool(_GLF_IDENTITY(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), bool(bvec2(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) || false))))))))) {
                } else {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                        } else {
                            return;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = fma(GLF_live5gl_FragCoord, _GLF_color, GLF_live5gl_FragCoord);
                        }
                    }
                }
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), _GLF_IDENTITY(_GLF_IDENTITY(int(4), 0 ^ (int(4))), clamp(_GLF_IDENTITY(int(4), 0 ^ (int(4))), _GLF_IDENTITY(int(4), 0 ^ (int(4))), _GLF_IDENTITY(_GLF_IDENTITY(int(4), 0 ^ (int(4))), max(_GLF_IDENTITY(_GLF_IDENTITY(int(4), 0 ^ (int(4))), (_GLF_IDENTITY(int(4), 0 ^ (int(4)))) / 1), _GLF_IDENTITY(int(4), 0 ^ (int(4)))))))))); _injected_loop_counter++) {
                    if (mod(float(GLF_live1i), GLF_live1ref) <= 0.01) {
                        GLF_live1s += 0.2;
                    }
                }
            }
            if (i == 0) {
                obj.prime_numbers[i] = 2;
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat3(0.0, 0.0, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(-0.9)), bool(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(mat3(gl_FragCoord, 1.0, 0.0, 1.0, 0.0, sqrt(1.0)))).x < 0.0)))))) + 0.0), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = vec4(-2266.2612, -433.913, 131.578, -59.47);
                        }
                    } else {
                    }
                    _GLF_color = ceil((_GLF_color / (-257.097)));
                }
            } else if (_GLF_IDENTITY(i, _GLF_IDENTITY(0, int(ivec3(0, 0, 0))) ^ (_GLF_IDENTITY(i, (_GLF_IDENTITY(i, (i) / 1)) << 0))) == 1) {
                if (_GLF_DEAD(false)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, false || (false)))) {
                        } else {
                            _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, vec4(mat2x3(_GLF_IDENTITY(_GLF_color, (_GLF_IDENTITY(_GLF_color, (false ? _GLF_FUZZED(vec4(-0.4, 9.7, 77.50, 304.159)) : _GLF_color))) + vec4(0.0, 0.0, 0.0, 0.0)), 0.0, 0.0)));
                        }
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & 1)); _injected_loop_counter++) {
                            _GLF_color = clamp(vec4(-5733.3384, 5.8, -800.158, 6020.9151), _GLF_IDENTITY(length(vec4(0.5, -49.51, 972.747, -1.8)), clamp(length(vec4(0.5, -49.51, 972.747, -1.8)), length(vec4(0.5, -49.51, 972.747, -1.8)), _GLF_IDENTITY(length(vec4(0.5, -49.51, 972.747, -1.8)), (length(vec4(0.5, -49.51, 972.747, -1.8))) - _GLF_IDENTITY(0.0, max(0.0, 0.0))))), -1.3);
                        }
                        {
                            vec2 GLF_live5color = _GLF_FUZZED(((mat3x2(-6140.5479, -288.004, 856.602, -833.629, 6949.2592, -8.3) * vec3(4.2, 169.643, -3.5)) - _GLF_IDENTITY(vec4(30.98, -9.8, 142.671, 36.61).r, max(_GLF_IDENTITY(vec4(30.98, -9.8, 142.671, 36.61).r, _GLF_IDENTITY((vec4(_GLF_IDENTITY(30.98, (false ? _GLF_FUZZED(0.4) : 30.98)), -9.8, 142.671, 36.61).r) / sqrt(1.0), max((vec4(_GLF_IDENTITY(30.98, (false ? _GLF_FUZZED(0.4) : 30.98)), -9.8, 142.671, 36.61).r) / sqrt(1.0), (vec4(_GLF_IDENTITY(30.98, (false ? _GLF_FUZZED(0.4) : 30.98)), -9.8, 142.671, 36.61).r) / sqrt(1.0)))), vec4(30.98, -9.8, 142.671, 36.61).r))));
                            int GLF_live5i = _GLF_FUZZED(_GLF_IDENTITY(-86765, (-86765) >> 0));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = step(-240.022, vec4(8.6, 6.3, 0.4, 3577.2198));
                            }
                            vec3 GLF_live5vecCoor = _GLF_FUZZED(_GLF_IDENTITY((vec3(-2.2, 6.7, 1781.9054) + vec3(-1.8, -363.333, 26.55)), max(_GLF_IDENTITY((vec3(-2.2, 6.7, 1781.9054) + vec3(-1.8, -363.333, 26.55)), vec3(1.0, 1.0, 1.0) * ((vec3(-2.2, 6.7, 1781.9054) + vec3(-1.8, -363.333, 26.55)))), (vec3(-2.2, 6.7, 1781.9054) + vec3(-1.8, -363.333, 26.55)))));
                            {
                                if (int(GLF_live5gl_FragCoord[1]) < 30) {
                                    GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[0]))));
                                    GLF_live5color[0] = dFdy(GLF_live5gl_FragCoord.y);
                                    ;
                                } else if (int(GLF_live5gl_FragCoord[1]) < 60) {
                                    GLF_live5color = fract(sin(_GLF_IDENTITY(GLF_live5vecCoor.yx, (_GLF_IDENTITY(GLF_live5vecCoor.yx, min(GLF_live5vecCoor.yx, GLF_live5vecCoor.yx))) - vec2(0.0, 0.0)) - trunc(float(GLF_live5data[1]))));
                                    GLF_live5color[1] *= atan(faceforward(GLF_live5injectionSwitch, _GLF_IDENTITY(GLF_live5color.xx, mix(vec2(_GLF_FUZZED(71.77), (GLF_live5color.xx)[1]), vec2((GLF_live5color.xx)[0], _GLF_FUZZED(5.6)), bvec2(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), false))), GLF_live5vecCoor.yx).y);
                                    ;
                                } else if (int(_GLF_IDENTITY(GLF_live5gl_FragCoord, vec4(mat3x4(_GLF_IDENTITY(GLF_live5gl_FragCoord, max(GLF_live5gl_FragCoord, GLF_live5gl_FragCoord)), 0.0, 0.0, 1.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 1.0, 1.0, log(1.0), 0.0)))[1]) < 90) {
                                    GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[2]))));
                                    GLF_live5color.x += _GLF_IDENTITY(_GLF_IDENTITY(atanh(_GLF_IDENTITY(GLF_live5color, vec2(mat3x4(GLF_live5color, 0.0, length(vec3(0.0, 0.0, 0.0)), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0, 1.0, 0.0))).x), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(-6.8) : atanh(_GLF_IDENTITY(GLF_live5color, vec2(mat3x4(GLF_live5color, 0.0, length(vec3(0.0, 0.0, 0.0)), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0, 1.0, 0.0))).x))) * cosh(GLF_live5injectionSwitch.y) * smoothstep(GLF_live5color, GLF_live5injectionSwitch, GLF_live5gl_FragCoord.yy).x, (true ? _GLF_IDENTITY(_GLF_IDENTITY(atanh(_GLF_IDENTITY(GLF_live5color, vec2(mat3x4(GLF_live5color, 0.0, length(vec3(0.0, 0.0, 0.0)), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0, 1.0, 0.0))).x), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(-6.8) : atanh(_GLF_IDENTITY(GLF_live5color, vec2(mat3x4(GLF_live5color, 0.0, length(vec3(0.0, 0.0, 0.0)), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0, 1.0, 0.0))).x))) * cosh(GLF_live5injectionSwitch.y) * smoothstep(GLF_live5color, GLF_live5injectionSwitch, GLF_live5gl_FragCoord.yy).x, mix(float(_GLF_FUZZED((_GLF_IDENTITY((-1.5) + 0.8, (_GLF_IDENTITY((-1.5) + 0.8, _GLF_IDENTITY(float(mat2x3((-1.5) + 0.8, 0.0, 1.0, 1.0, 0.0, 0.0)), clamp(float(mat2x3((-1.5) + 0.8, 0.0, 1.0, 1.0, 0.0, 0.0)), float(mat2x3((-1.5) + 0.8, 0.0, 1.0, 1.0, 0.0, 0.0)), float(mat2x3((-1.5) + 0.8, 0.0, 1.0, 1.0, 0.0, 0.0)))))) + 0.0)))), _GLF_IDENTITY(float(_GLF_IDENTITY(atanh(_GLF_IDENTITY(GLF_live5color, vec2(mat3x4(GLF_live5color, 0.0, length(vec3(0.0, 0.0, 0.0)), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0, 1.0, 0.0))).x), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(-6.8) : atanh(_GLF_IDENTITY(GLF_live5color, vec2(mat3x4(GLF_live5color, 0.0, length(vec3(0.0, 0.0, 0.0)), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0, 1.0, 0.0))).x))) * cosh(GLF_live5injectionSwitch.y) * smoothstep(GLF_live5color, GLF_live5injectionSwitch, GLF_live5gl_FragCoord.yy).x), float(mat4x2(float(_GLF_IDENTITY(atanh(_GLF_IDENTITY(GLF_live5color, vec2(mat3x4(GLF_live5color, 0.0, length(vec3(0.0, 0.0, 0.0)), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0, 1.0, 0.0))).x), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(-6.8) : atanh(_GLF_IDENTITY(GLF_live5color, vec2(mat3x4(GLF_live5color, 0.0, length(vec3(0.0, 0.0, 0.0)), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0, 1.0, 0.0))).x))) * cosh(GLF_live5injectionSwitch.y) * smoothstep(GLF_live5color, GLF_live5injectionSwitch, GLF_live5gl_FragCoord.yy).x), 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, sin(0.0)))), bool(true))) : _GLF_FUZZED(_GLF_IDENTITY(-93.07, min(-93.07, -93.07)))));
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), !(!(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) || _GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                        }
                                        ;
                                    }
                                } else if (_GLF_IDENTITY(int(GLF_live5gl_FragCoord[1]), 0 | (_GLF_IDENTITY(int(GLF_live5gl_FragCoord[1]), clamp(int(GLF_live5gl_FragCoord[1]), int(GLF_live5gl_FragCoord[1]), int(GLF_live5gl_FragCoord[1]))))) < 120) {
                                    GLF_live5color = _GLF_IDENTITY(fract(acosh(clamp(_GLF_IDENTITY(GLF_live5vecCoor.yx, mix(vec2((GLF_live5vecCoor.yx)[0], (GLF_live5vecCoor.yx)[1]), vec2(_GLF_FUZZED(-60.54), _GLF_FUZZED((579.639 + (true ? 69.89 : 6.2)))), bvec2(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false))) - trunc(float(_GLF_IDENTITY(GLF_live5data[3], int(ivec3(GLF_live5data[3], 0, (1 ^ 0)))))), 1.0, 1000.0))), (true ? fract(acosh(clamp(_GLF_IDENTITY(GLF_live5vecCoor.yx, mix(vec2((GLF_live5vecCoor.yx)[0], (GLF_live5vecCoor.yx)[1]), vec2(_GLF_FUZZED(-60.54), _GLF_FUZZED((579.639 + (true ? 69.89 : 6.2)))), bvec2(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false))) - trunc(float(_GLF_IDENTITY(GLF_live5data[3], int(ivec3(GLF_live5data[3], 0, (1 ^ 0)))))), 1.0, 1000.0))) : _GLF_FUZZED((mix(resolution, resolution, GLF_live5color)))));
                                    GLF_live5color.x += _GLF_IDENTITY((isnan(GLF_live5gl_FragCoord.x) ? log2(GLF_live5gl_FragCoord.x) : log2(GLF_live5gl_FragCoord.y)), max((isnan(GLF_live5gl_FragCoord.x) ? log2(GLF_live5gl_FragCoord.x) : log2(GLF_live5gl_FragCoord.y)), (isnan(GLF_live5gl_FragCoord.x) ? log2(GLF_live5gl_FragCoord.x) : _GLF_IDENTITY(log2(GLF_live5gl_FragCoord.y), clamp(_GLF_IDENTITY(log2(GLF_live5gl_FragCoord.y), (false ? _GLF_FUZZED(9.2) : log2(GLF_live5gl_FragCoord.y))), log2(GLF_live5gl_FragCoord.y), log2(GLF_live5gl_FragCoord.y))))));
                                    for (int _injected_loop_counter = ((_GLF_IDENTITY(1 << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), 1 * (int(7)))), (1 << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), 1 * (int(7))))) | (_GLF_IDENTITY(1 << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), 1 * (int(7)))), max(1 << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), 1 * (int(7)))), 1 << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), 1 * (int(7))))))))) >> _GLF_IDENTITY(int(7), int(_GLF_IDENTITY(7, ~(~(7)))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        ;
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(5), int(5))) >> _GLF_IDENTITY(int(5), int(_GLF_IDENTITY(5, (5) | (0 << _GLF_IDENTITY(int(7), int(7)))))))); _injected_loop_counter++) {
                                        if (int(_GLF_IDENTITY(GLF_live5gl_FragCoord, clamp(GLF_live5gl_FragCoord, GLF_live5gl_FragCoord, _GLF_IDENTITY(GLF_live5gl_FragCoord, mix(vec4((GLF_live5gl_FragCoord)[0], _GLF_FUZZED(-549.628), _GLF_IDENTITY((GLF_live5gl_FragCoord)[2], mix(float((GLF_live5gl_FragCoord)[2]), float(_GLF_FUZZED(2.9)), bool(false))), _GLF_FUZZED(-1642.8024)), vec4(_GLF_FUZZED(974.535), (GLF_live5gl_FragCoord)[1], _GLF_FUZZED(5214.3113), (GLF_live5gl_FragCoord)[3]), bvec4(false, true, false, true)))))[1]) < 150) {
                                            ;
                                        } else {
                                            do {
                                                if (int(_GLF_IDENTITY(GLF_live5gl_FragCoord, (false ? _GLF_FUZZED(vec4(5.9, -1948.9376, -80.70, 52.05)) : GLF_live5gl_FragCoord))[1]) < 180) {
                                                    _GLF_IDENTITY(GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[4])))), (true ? (GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[4]))))) : _GLF_FUZZED(resolution)));
                                                    GLF_live5color[1] += asinh(GLF_live5gl_FragCoord.y * ldexp(GLF_live5color.y, -GLF_live5i));
                                                    ;
                                                } else {
                                                    do {
                                                        if (int(GLF_live5gl_FragCoord[1]) < 210) {
                                                            GLF_live5color = _GLF_IDENTITY(fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[5])))), (fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[5]))))) / sqrt(vec2(_GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y))));
                                                            GLF_live5color.y -= tanh(GLF_live5color.x) / cosh(GLF_live5color.y);
                                                            ;
                                                        } else if (int(GLF_live5gl_FragCoord[1]) < _GLF_IDENTITY(240, int(int(240)))) {
                                                            GLF_live5color = _GLF_IDENTITY(fract(asinh(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[6])), (true ? trunc(float(GLF_live5data[6])) : _GLF_FUZZED(6382.2416))))), _GLF_IDENTITY((fract(asinh(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[6])), (true ? trunc(float(_GLF_IDENTITY(GLF_live5data[6], (_GLF_IDENTITY(GLF_live5data[6], (GLF_live5data[6]) << 0)) * _GLF_IDENTITY(1, (1) << 0)))) : _GLF_FUZZED(6382.2416)))))), vec2(_GLF_IDENTITY(mat3x2(_GLF_IDENTITY((fract(asinh(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[6])), (true ? trunc(float(_GLF_IDENTITY(GLF_live5data[6], (_GLF_IDENTITY(GLF_live5data[6], (GLF_live5data[6]) << 0)) * _GLF_IDENTITY(1, (1) << 0)))) : _GLF_FUZZED(6382.2416)))))), (_GLF_IDENTITY((fract(asinh(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[6])), (true ? trunc(float(_GLF_IDENTITY(GLF_live5data[6], (_GLF_IDENTITY(GLF_live5data[6], (GLF_live5data[6]) << 0)) * _GLF_IDENTITY(1, (1) << 0)))) : _GLF_FUZZED(6382.2416)))))), mat2(1.0) * ((fract(asinh(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[6])), (true ? trunc(float(_GLF_IDENTITY(GLF_live5data[6], (_GLF_IDENTITY(GLF_live5data[6], (GLF_live5data[6]) << 0)) * _GLF_IDENTITY(1, (1) << 0)))) : _GLF_FUZZED(6382.2416))))))))) - vec2(0.0, 0.0)), 0.0, log(1.0), 1.0, 0.0), transpose(_GLF_IDENTITY(transpose(mat3x2(_GLF_IDENTITY((fract(asinh(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[6])), (true ? trunc(float(_GLF_IDENTITY(GLF_live5data[6], (_GLF_IDENTITY(GLF_live5data[6], (GLF_live5data[6]) << 0)) * _GLF_IDENTITY(1, (1) << 0)))) : _GLF_FUZZED(6382.2416)))))), (_GLF_IDENTITY((fract(asinh(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[6])), (true ? trunc(float(_GLF_IDENTITY(GLF_live5data[6], (_GLF_IDENTITY(GLF_live5data[6], (GLF_live5data[6]) << 0)) * _GLF_IDENTITY(1, (1) << 0)))) : _GLF_FUZZED(6382.2416)))))), mat2(1.0) * ((fract(asinh(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[6])), (true ? trunc(float(_GLF_IDENTITY(GLF_live5data[6], (_GLF_IDENTITY(GLF_live5data[6], (GLF_live5data[6]) << 0)) * _GLF_IDENTITY(1, (1) << 0)))) : _GLF_FUZZED(6382.2416))))))))) - vec2(0.0, 0.0)), 0.0, log(1.0), 1.0, 0.0)), (transpose(mat3x2(_GLF_IDENTITY((fract(asinh(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[6])), (true ? trunc(float(_GLF_IDENTITY(GLF_live5data[6], (_GLF_IDENTITY(GLF_live5data[6], (GLF_live5data[6]) << 0)) * _GLF_IDENTITY(1, (1) << 0)))) : _GLF_FUZZED(6382.2416)))))), (_GLF_IDENTITY((fract(asinh(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[6])), (true ? trunc(float(_GLF_IDENTITY(GLF_live5data[6], (_GLF_IDENTITY(GLF_live5data[6], (GLF_live5data[6]) << 0)) * _GLF_IDENTITY(1, (1) << 0)))) : _GLF_FUZZED(6382.2416)))))), mat2(1.0) * ((fract(asinh(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[6])), (true ? trunc(float(_GLF_IDENTITY(GLF_live5data[6], (_GLF_IDENTITY(GLF_live5data[6], (GLF_live5data[6]) << 0)) * _GLF_IDENTITY(1, (1) << 0)))) : _GLF_FUZZED(6382.2416))))))))) - vec2(0.0, 0.0)), 0.0, log(1.0), 1.0, 0.0))) * mat2(1.0)))))) * vec2(1.0, 1.0));
                                                            GLF_live5color.y -= isnan(float(GLF_live5i)) ? tanh(GLF_live5gl_FragCoord.x) : atanh(GLF_live5gl_FragCoord.y);
                                                            ;
                                                        } else if (int(GLF_live5gl_FragCoord[1]) < 270) {
                                                            _GLF_IDENTITY(GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(_GLF_IDENTITY(GLF_live5data[7], ((58745) & 0) | (GLF_live5data[7])))))), vec2(1.0, 1.0) * (_GLF_IDENTITY(GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(_GLF_IDENTITY(GLF_live5data[7], ((58745) & 0) | (GLF_live5data[7])))))), (GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(_GLF_IDENTITY(GLF_live5data[7], _GLF_IDENTITY(((58745) & 0) | (GLF_live5data[7]), (((58745) & 0) | (GLF_live5data[7])) | 0))))))) / vec2(1.0, 1.0))));
                                                            GLF_live5color.y *= mix(normalize(GLF_live5vecCoor), normalize(vec3(GLF_live5color, degrees(GLF_live5color.x))), GLF_live5injectionSwitch.x).y;
                                                            ;
                                                        } else {
                                                            ;
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, mix(vec4(_GLF_FUZZED((8.7 + (-_GLF_IDENTITY(208.203, max(208.203, 208.203))))), _GLF_FUZZED(-13.70), (_GLF_outVarBackup_GLF_color)[2], (_GLF_outVarBackup_GLF_color)[3]), vec4((_GLF_outVarBackup_GLF_color)[0], (_GLF_outVarBackup_GLF_color)[1], _GLF_FUZZED(-8.4), _GLF_FUZZED(float(110247u))), bvec4(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true, _GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), true && (!(false))))), false)));
                        }
                    }
                    continue;
                }
                obj.prime_numbers[i] = 3;
            } else if (_GLF_IDENTITY(_GLF_IDENTITY(i == 2, _GLF_IDENTITY((i == 2), _GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))) || ((i == 2))) && _GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch, mat2(1.0) * (injectionSwitch)).y))), !(!(_GLF_IDENTITY(_GLF_IDENTITY(i == 2, _GLF_IDENTITY((i == 2), _GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))) || ((i == 2))) && _GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch, mat2(1.0) * (injectionSwitch)).y))), !(!(_GLF_IDENTITY(i == 2, _GLF_IDENTITY((i == 2), _GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(sin(0.0), (true ? sin(0.0) : _GLF_FUZZED(3.0))))) || ((i == 2))) && _GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch, mat2(1.0) * (injectionSwitch)).y)))))))))) {
                obj.prime_numbers[i] = 5;
                {
                    vec2 GLF_live6coord = _GLF_FUZZED(vec2(-1552.4136, -251.185));
                    int GLF_live6looplimiter1 = 0;
                    vec4 GLF_live6res = _GLF_FUZZED(vec4(8327.9597, -9.9, 390.000, 0.7));
                    float GLF_live6uvstep = _GLF_FUZZED((1.2 * 5673.6096));
                    for (int GLF_live6i = 0; _GLF_IDENTITY(GLF_live6i < 3, bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(GLF_live6i < 3, _GLF_IDENTITY(bool(_GLF_IDENTITY(bvec2(GLF_live6i < 3, false), bvec2(bvec3(bvec2(GLF_live6i < 3, false), true)))), !(!(bool(_GLF_IDENTITY(bvec2(GLF_live6i < 3, false), bvec2(bvec3(bvec2(GLF_live6i < 3, false), true))))))))), _GLF_IDENTITY(false || (bool(_GLF_IDENTITY(GLF_live6i < 3, _GLF_IDENTITY(bool(_GLF_IDENTITY(bvec2(GLF_live6i < 3, false), bvec2(bvec3(bvec2(GLF_live6i < 3, false), true)))), !(!(bool(_GLF_IDENTITY(bvec2(GLF_live6i < 3, false), bvec2(bvec3(bvec2(_GLF_IDENTITY(GLF_live6i < 3, !(!(GLF_live6i < 3))), false), true)))))))))), true && (_GLF_IDENTITY(false || (bool(_GLF_IDENTITY(GLF_live6i < 3, _GLF_IDENTITY(bool(_GLF_IDENTITY(bvec2(GLF_live6i < 3, false), bvec2(bvec3(bvec2(GLF_live6i < 3, false), true)))), !(!(bool(_GLF_IDENTITY(bvec2(GLF_live6i < 3, false), bvec2(bvec3(bvec2(_GLF_IDENTITY(GLF_live6i < 3, !(!(GLF_live6i < 3))), false), true)))))))))), true && (false || (bool(_GLF_IDENTITY(GLF_live6i < 3, _GLF_IDENTITY(bool(_GLF_IDENTITY(bvec2(GLF_live6i < 3, false), bvec2(bvec3(bvec2(GLF_live6i < 3, false), true)))), !(!(bool(_GLF_IDENTITY(bvec2(GLF_live6i < 3, false), bvec2(bvec3(bvec2(_GLF_IDENTITY(GLF_live6i < 3, !(!(GLF_live6i < 3))), false), true))))))))))))))))); GLF_live6i++) {
                        if (GLF_live6looplimiter1 >= 7) {
                            break;
                        }
                        GLF_live6looplimiter1++;
                        {
                            {
                                int GLF_live6looplimiter0 = 0;
                                for (int GLF_live6j = 0; GLF_live6j < 3; GLF_live6j++) {
                                    if (GLF_live6looplimiter0 >= _GLF_IDENTITY(7, 0 | (_GLF_IDENTITY(7, clamp(7, 7, 7))))) {
                                        break;
                                    }
                                    _GLF_IDENTITY(GLF_live6looplimiter0++, ~(_GLF_IDENTITY(~(_GLF_IDENTITY(GLF_live6looplimiter0++, ~(~(GLF_live6looplimiter0++)))), (~(_GLF_IDENTITY(GLF_live6looplimiter0++, ~(~(GLF_live6looplimiter0++))))) * 1)));
                                    {
                                        GLF_live6res += texture(GLF_live6tex, GLF_live6coord + vec2(float(GLF_live6i - 1) * GLF_live6uvstep, float(GLF_live6j - 1) * GLF_live6uvstep)) * GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + GLF_live6j, 9)];
                                    }
                                }
                            }
                        }
                    }
                }
            } else if (i == 3) {
                {
                    if (_GLF_DEAD(false)) {
                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, max(_GLF_IDENTITY(injectionSwitch, mat2(1.0) * (injectionSwitch)), injectionSwitch)).x > injectionSwitch.y)))) {
                                return;
                            }
                            _GLF_color = GLF_merged2_0_2_1_2_2_2buv;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (_GLF_IDENTITY(mat4(48.91, -7898.2518, -8.9, 1717.7970, 1758.2314, 9.3, 8.0, -3.7, -66.31, -8.3, 53.28, 369.840, -5.5, -5493.1719, -5.2, -2.6), (mat4(48.91, -7898.2518, -8.9, 1717.7970, 1758.2314, 9.3, 8.0, -3.7, -66.31, -8.3, 53.28, 369.840, -5.5, -5493.1719, -5.2, -2.6)) - mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)) * vec4(9.3, 6.0, 15.66, 1.6));
                    do {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, bool(bvec3(false, false, false)))), bool(bvec3(bool(_GLF_IDENTITY(false, bool(bvec3(false, false, false)))), true, true))))))) {
                                continue;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, 0.0 + (0.0))))));
                    {
                        int GLF_live5looplimiter2 = 0;
                        if (GLF_live5looplimiter2 >= 7) {
                            ;
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    obj.prime_numbers[i] = 7;
                } else {
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
            } else {
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false || (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
                    discard;
                }
                if (i == 4) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        discard;
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        obj.prime_numbers[i] = _GLF_IDENTITY(11, 0 ^ (11));
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                    {
                        int GLF_live5i = _GLF_FUZZED(92434);
                        int GLF_live5k = _GLF_FUZZED(((-71595) - (-82457)));
                        {
                            GLF_live5temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5k++, 10)] = GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i++, 10)];
                        }
                    }
                } else if (_GLF_IDENTITY(i == 5, !(_GLF_IDENTITY(!(i == 5), !(!(!(i == 5))))))) {
                    obj.prime_numbers[i] = _GLF_IDENTITY(13, (_GLF_IDENTITY(13, (_GLF_IDENTITY(13, (13) | (13))) | (_GLF_IDENTITY(13, clamp(_GLF_IDENTITY(13, (true ? 13 : _GLF_FUZZED(i))), 13, 13))))) / 1);
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (_GLF_IDENTITY(_GLF_DEAD(false), !(_GLF_IDENTITY(!(_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) && true)), !(!(!(_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) && true)))))))) {
                        _GLF_color = GLF_live5gl_FragCoord;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            continue;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (_GLF_IDENTITY(true, bool(bvec2(true, true)))) && true))) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-2.8, 6067.5367, 4.4, 307.865);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_IDENTITY(_GLF_DEAD(false), false || (_GLF_DEAD(false)))) {
                                continue;
                            }
                            _GLF_color = mat2x4(_GLF_IDENTITY(-0.9, max(-0.9, -0.9)), 49.05, _GLF_IDENTITY(516.457, clamp(516.457, 516.457, 516.457)), 7.0, -5.0, -154.927, 6.7, 426.103)[1];
                        } else {
                            for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), clamp(int(6), int(6), int(6))))); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter++) {
                                int GLF_live5i = _GLF_FUZZED(int((136466u)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    int GLF_live5looplimiter5 = 0;
                                    do {
                                        if (GLF_live5looplimiter5 >= 7) {
                                            break;
                                        }
                                        GLF_live5looplimiter5++;
                                        {
                                            switch (GLF_live5i) {
                                                case 0:
                                                    GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = 4;
                                                    break;
                                                case 1:
                                                    GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = 3;
                                                    break;
                                                case 2:
                                                    GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = 2;
                                                    break;
                                                case 3:
                                                    GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = 1;
                                                    break;
                                                case 4:
                                                    GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = 0;
                                                    break;
                                                case 5:
                                                    GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = _GLF_IDENTITY(-1, 0 ^ (-1));
                                                    break;
                                                case 6:
                                                    GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = -2;
                                                    break;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        break;
                                                    }
                                                case 7:
                                                    GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = -3;
                                                    break;
                                                case 8:
                                                    GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = -4;
                                                    break;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        discard;
                                                    }
                                                case 9:
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                        GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = -5;
                                                    }
                                                    break;
                                            }
                                            GLF_live5i++;
                                        }
                                    } while (GLF_live5i < 10);
                                } else {
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = atan(_GLF_IDENTITY(vec4(_GLF_IDENTITY(9.4, (9.4) - _GLF_ZERO(0.0, injectionSwitch.x)), -8.3, -479.461, -17.27), vec4(_GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y)) * (vec4(_GLF_IDENTITY(9.4, (9.4) - _GLF_ZERO(0.0, injectionSwitch.x)), -8.3, -479.461, -17.27))), vec4(-6.4, 6.0, 33.27, 77.95));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, (_GLF_IDENTITY(injectionSwitch, vec2(_GLF_IDENTITY(injectionSwitch[0], clamp(injectionSwitch[0], injectionSwitch[0], injectionSwitch[0])), injectionSwitch[1]))) / vec2(1.0, 1.0)).x > injectionSwitch.y)), false || (_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, (_GLF_IDENTITY(injectionSwitch, vec2(_GLF_IDENTITY(injectionSwitch[0], clamp(injectionSwitch[0], injectionSwitch[0], injectionSwitch[0])), injectionSwitch[1]))) / vec2(1.0, 1.0)).x > injectionSwitch.y)))))) && true)) {
                        discard;
                        if (_GLF_IDENTITY(_GLF_DEAD(false), bool(bvec2(_GLF_DEAD(false), _GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), bool(bvec3(!(false), false, true))))))))) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                _GLF_color = cosh(trunc(GLF_merged2_0_2_1_2_2_2buv));
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                {
                                    vec2 GLF_live6coord = _GLF_IDENTITY(_GLF_FUZZED(_GLF_IDENTITY(vec4(868.335, 0.5, -15.54, -8.1).sp, mix(vec2(_GLF_FUZZED(801.978), (vec4(868.335, 0.5, -15.54, -8.1).sp)[1]), vec2((vec4(868.335, 0.5, -15.54, -8.1).sp)[0], _GLF_FUZZED(1.1)), bvec2(true, false)))), clamp(_GLF_FUZZED(_GLF_IDENTITY(vec4(868.335, 0.5, -15.54, -8.1).sp, mix(vec2(_GLF_FUZZED(_GLF_IDENTITY(801.978, min(801.978, 801.978))), (vec4(868.335, 0.5, -15.54, -8.1).sp)[1]), vec2((vec4(868.335, 0.5, -15.54, -8.1).sp)[0], _GLF_FUZZED(1.1)), bvec2(true, false)))), _GLF_FUZZED(_GLF_IDENTITY(vec4(868.335, 0.5, -15.54, -8.1).sp, mix(vec2(_GLF_FUZZED(801.978), (vec4(868.335, 0.5, -15.54, -8.1).sp)[1]), vec2((vec4(868.335, 0.5, -15.54, -8.1).sp)[0], _GLF_FUZZED(1.1)), bvec2(true, false)))), _GLF_FUZZED(_GLF_IDENTITY(vec4(868.335, 0.5, -15.54, -8.1).sp, mix(_GLF_IDENTITY(vec2(_GLF_FUZZED(_GLF_IDENTITY(801.978, max(801.978, 801.978))), (_GLF_IDENTITY(vec4(868.335, 0.5, -15.54, -8.1), clamp(_GLF_IDENTITY(vec4(868.335, 0.5, -15.54, -8.1), mix(vec4((vec4(868.335, 0.5, -15.54, -8.1))[0], (vec4(868.335, 0.5, -15.54, -8.1))[1], (vec4(868.335, 0.5, -15.54, -8.1))[2], _GLF_FUZZED(-7.9)), vec4(_GLF_FUZZED(8876.0827), _GLF_FUZZED(-449.508), _GLF_FUZZED(-3.1), (vec4(868.335, 0.5, -15.54, -8.1))[3]), bvec4(false, false, false, true))), vec4(868.335, 0.5, -15.54, -8.1), vec4(868.335, 0.5, -15.54, -8.1))).sp)[1]), _GLF_IDENTITY((vec2(_GLF_FUZZED(_GLF_IDENTITY(801.978, max(801.978, 801.978))), (_GLF_IDENTITY(vec4(868.335, 0.5, -15.54, -8.1), clamp(_GLF_IDENTITY(vec4(868.335, 0.5, -15.54, -8.1), mix(vec4((vec4(868.335, 0.5, -15.54, -8.1))[0], (vec4(868.335, 0.5, -15.54, -8.1))[1], (vec4(868.335, 0.5, -15.54, -8.1))[2], _GLF_FUZZED(-7.9)), vec4(_GLF_FUZZED(8876.0827), _GLF_FUZZED(-449.508), _GLF_FUZZED(-3.1), (vec4(868.335, 0.5, -15.54, -8.1))[3]), bvec4(false, false, false, true))), vec4(868.335, 0.5, -15.54, -8.1), vec4(868.335, 0.5, -15.54, -8.1))).sp)[1])) * mat2(1.0), (true ? ((vec2(_GLF_FUZZED(_GLF_IDENTITY(801.978, max(801.978, 801.978))), (_GLF_IDENTITY(vec4(868.335, 0.5, -15.54, -8.1), clamp(_GLF_IDENTITY(vec4(868.335, 0.5, -15.54, -8.1), mix(vec4((vec4(868.335, 0.5, -15.54, -8.1))[0], (vec4(868.335, 0.5, -15.54, -8.1))[1], (vec4(868.335, 0.5, -15.54, -8.1))[2], _GLF_FUZZED(-7.9)), vec4(_GLF_FUZZED(8876.0827), _GLF_FUZZED(-449.508), _GLF_FUZZED(-3.1), (vec4(868.335, 0.5, -15.54, -8.1))[3]), bvec4(false, false, false, true))), vec4(868.335, 0.5, -15.54, -8.1), vec4(868.335, 0.5, -15.54, -8.1))).sp)[1])) * mat2(1.0)) : _GLF_FUZZED(resolution)))), vec2((vec4(868.335, 0.5, -15.54, -8.1).sp)[0], _GLF_FUZZED(1.1)), bvec2(true, false))))));
                                    int GLF_live6looplimiter1 = 0;
                                    vec4 GLF_live6res = _GLF_FUZZED((float(175066u) + vec4(4.1, 37.42, 3.9, 7.8)));
                                    float GLF_live6uvstep = _GLF_FUZZED(float(-24596));
                                    for (int GLF_live6i = 0; GLF_live6i < 3; _GLF_IDENTITY(GLF_live6i++, ~(~(_GLF_IDENTITY(GLF_live6i++, (false ? _GLF_FUZZED(GLF_live6looplimiter1) : _GLF_IDENTITY(GLF_live6i++, (GLF_live6i++) >> (0 >> _GLF_IDENTITY(int(0), int(0)))))))))) {
                                        if (GLF_live6looplimiter1 >= 7) {
                                            break;
                                        }
                                        GLF_live6looplimiter1++;
                                        do {
                                            {
                                                int GLF_live6looplimiter0 = 0;
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                    for (int GLF_live6j = 0; GLF_live6j < 3; GLF_live6j++) {
                                                        if (GLF_live6looplimiter0 >= 7) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                return;
                                                            }
                                                            break;
                                                            if (_GLF_DEAD(false)) {
                                                                discard;
                                                            }
                                                        }
                                                        GLF_live6looplimiter0++;
                                                        {
                                                            GLF_live6res += texture(GLF_live6tex, _GLF_IDENTITY(GLF_live6coord, clamp(GLF_live6coord, GLF_live6coord, _GLF_IDENTITY(GLF_live6coord, max(GLF_live6coord, GLF_live6coord)))) + _GLF_IDENTITY(vec2(_GLF_IDENTITY(float(GLF_live6i - 1), 0.0 + (float(GLF_live6i - 1))) * GLF_live6uvstep, float(GLF_live6j - 1) * GLF_live6uvstep), _GLF_IDENTITY((vec2(_GLF_IDENTITY(float(GLF_live6i - 1), 0.0 + (float(GLF_live6i - 1))) * GLF_live6uvstep, float(GLF_live6j - 1) * GLF_live6uvstep)) * mat2(1.0), min((vec2(_GLF_IDENTITY(float(GLF_live6i - 1), 0.0 + (float(GLF_live6i - 1))) * GLF_live6uvstep, float(_GLF_IDENTITY(GLF_live6j - 1, clamp(GLF_live6j - 1, GLF_live6j - 1, GLF_live6j - 1))) * GLF_live6uvstep)) * mat2(1.0), _GLF_IDENTITY((vec2(_GLF_IDENTITY(float(GLF_live6i - 1), 0.0 + (float(GLF_live6i - 1))) * GLF_live6uvstep, float(GLF_live6j - 1) * GLF_live6uvstep)) * mat2(1.0), min((vec2(_GLF_IDENTITY(float(GLF_live6i - 1), 0.0 + (float(GLF_live6i - 1))) * GLF_live6uvstep, _GLF_IDENTITY(float(GLF_live6j - 1), clamp(float(GLF_live6j - 1), _GLF_IDENTITY(float(GLF_live6j - 1), max(float(GLF_live6j - 1), float(GLF_live6j - 1))), float(GLF_live6j - 1))) * GLF_live6uvstep)) * mat2(1.0), (vec2(_GLF_IDENTITY(float(GLF_live6i - 1), 0.0 + (float(GLF_live6i - 1))) * GLF_live6uvstep, float(_GLF_IDENTITY(GLF_live6j, (GLF_live6j) / 1) - 1) * GLF_live6uvstep)) * mat2(1.0))))))) * GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + GLF_live6j, 9)];
                                                        }
                                                    }
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                    }
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                    break;
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, (_GLF_color) * mat4(1.0));
                                _GLF_color = _GLF_IDENTITY(mix(vec4(7186.8019, 250.093, 895.589, 296.286), mix(vec4(-172.512, 8483.8998, 621.294, -6.5), vec4(8.3, 7.9, 7614.5960, 3.6), 1.4), notEqual(vec4(9.7, 6.9, 94.97, 6156.5097), vec4(576.832, -680.138, -9.5, -7.8))), min(_GLF_IDENTITY(mix(vec4(7186.8019, 250.093, 895.589, 296.286), mix(vec4(-172.512, 8483.8998, 621.294, -6.5), vec4(8.3, 7.9, 7614.5960, 3.6), 1.4), notEqual(vec4(9.7, 6.9, 94.97, 6156.5097), vec4(576.832, -680.138, -9.5, -7.8))), clamp(mix(vec4(7186.8019, 250.093, 895.589, 296.286), mix(vec4(-172.512, 8483.8998, 621.294, -6.5), vec4(8.3, 7.9, 7614.5960, 3.6), 1.4), notEqual(vec4(9.7, 6.9, 94.97, 6156.5097), vec4(576.832, -680.138, -9.5, -7.8))), mix(vec4(7186.8019, 250.093, 895.589, 296.286), mix(vec4(-172.512, 8483.8998, 621.294, -6.5), vec4(8.3, 7.9, 7614.5960, 3.6), 1.4), notEqual(vec4(9.7, 6.9, 94.97, 6156.5097), vec4(576.832, -680.138, -9.5, -7.8))), mix(vec4(7186.8019, 250.093, 895.589, 296.286), mix(vec4(-172.512, 8483.8998, 621.294, -6.5), vec4(8.3, 7.9, 7614.5960, 3.6), 1.4), notEqual(vec4(9.7, 6.9, 94.97, 6156.5097), vec4(576.832, -680.138, -9.5, -7.8))))), mix(vec4(7186.8019, 250.093, 895.589, 296.286), mix(vec4(-172.512, 8483.8998, 621.294, -6.5), vec4(8.3, 7.9, 7614.5960, 3.6), 1.4), notEqual(vec4(9.7, 6.9, 94.97, 6156.5097), vec4(576.832, -680.138, -9.5, -7.8)))));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        discard;
                    }
                } else if (i == 6) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < _GLF_IDENTITY(0.0, (0.0) + 0.0), !(!(gl_FragCoord.y < _GLF_IDENTITY(0.0, (0.0) + 0.0)))))))) {
                        continue;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = tanh(_GLF_IDENTITY(GLF_live5gl_FragCoord, vec4(GLF_live5gl_FragCoord[0], GLF_live5gl_FragCoord[1], GLF_live5gl_FragCoord[2], GLF_live5gl_FragCoord[3])));
                        if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < 0.0), !(!((gl_FragCoord.x < 0.0))))))) {
                            break;
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(!(false))))) {
                    } else {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = vec4(6418.9590, 3401.0728, -99.87, -_GLF_IDENTITY(7.1, _GLF_IDENTITY(min(7.1, 7.1), min(min(7.1, 7.1), min(7.1, 7.1)))));
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                discard;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                {
                                    int GLF_live5j = _GLF_FUZZED(93831);
                                    int GLF_live5k = _GLF_FUZZED(10484);
                                    {
                                        GLF_live5temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5k++, 10)] = GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5j++, 10)];
                                    }
                                }
                                _GLF_color = vec4(-8922.3027, 5507.9509, -5467.8708, -1895.9811);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _GLF_IDENTITY(_injected_loop_counter--, (_injected_loop_counter--) + 0)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    obj.prime_numbers[i] = 17;
                } else {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (i == 7) {
                        _GLF_IDENTITY(obj.prime_numbers[i] = 19, 0 ^ (_GLF_IDENTITY(obj.prime_numbers[i] = 19, (obj.prime_numbers[i] = 19) >> 0)));
                    } else {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            {
                                int GLF_live5looplimiter1 = 0;
                                if (_GLF_IDENTITY(GLF_live5looplimiter1 >= 7, (GLF_live5looplimiter1 >= 7) && true)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        continue;
                                    }
                                    ;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                        _GLF_color = vec4(_GLF_IDENTITY(vec3(-37.28, -9879.0142, -7992.0953), sin(log(vec3(1.0, 1.0, 1.0))) + (vec3(-37.28, -9879.0142, -7992.0953))), 7092.6571);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            break;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                            } else {
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            }
                            _GLF_color = vec4(9233.4610, -222.729, -0.0, -7958.5942);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), !(_GLF_IDENTITY(!(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), bool(bool(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false || (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))))), (!(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), bool(bool(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false || (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))))) && true))))) {
                                    continue;
                                }
                                _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (_GLF_outVarBackup_GLF_color) + vec4(0.0, 0.0, 0.0, 0.0))) - vec4(0.0, 0.0, 0.0, 0.0));
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                discard;
                            } else {
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, vec4(mat4x3(_GLF_color, 1.0, 0.0, 0.0, determinant(mat2(1.0, determinant(mat4(1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0)), 0.0, 1.0)), 0.0, 0.0, 1.0, cos(0.0))));
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                        return;
                                    }
                                } else {
                                    _GLF_color = vec4(_GLF_IDENTITY(9.3, max(9.3, 9.3)), -5.0, 8.9, 8373.1333);
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_merged2_0_2_1_2_2_2buv;
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                _GLF_color = acosh(vec4(5.4, -2.4, 17.88, 9.3));
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_IDENTITY(_GLF_IDENTITY(i, (_GLF_IDENTITY(i, max(i, _GLF_IDENTITY(i, int(ivec3(i, 1, 1)))))) | (i)) == 8, !(!(_GLF_IDENTITY(i, _GLF_IDENTITY((_GLF_IDENTITY(i, max(i, _GLF_IDENTITY(i, int(ivec3(i, 1, 1)))))) | (i), (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), !(_GLF_IDENTITY(!(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), (!(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) && true)))) || false) ? _GLF_FUZZED(-75098) : ((_GLF_IDENTITY(i, max(_GLF_IDENTITY(i, int(ivec3(_GLF_IDENTITY(i, (i) ^ 0), 0, 1))), _GLF_IDENTITY(i, int(ivec3(i, _GLF_IDENTITY(1, min(1, 1)), 1)))))) | (i))))) == 8)))) {
                            _GLF_IDENTITY(obj.prime_numbers[i] = 23, 1 * (_GLF_IDENTITY(obj.prime_numbers[i] = 23, ~(~(obj.prime_numbers[i] = 23)))));
                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                return;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = dFdx(vec4(7.5, 0.4, -_GLF_IDENTITY(8.4, (true ? _GLF_IDENTITY(8.4, float(mat3x2(8.4, 1.0, 0.0, 0.0, 0.0, 1.0))) : _GLF_FUZZED(67.95))), 7.1));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    for (int _injected_loop_counter = (1 & _GLF_IDENTITY(1, int(_GLF_IDENTITY(int(1), ~(~(int(1))))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 1.0)), dot(vec3(0.0, 1.0, 0.0), _GLF_IDENTITY(vec3(1.0, determinant(mat4(0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) + 0.0), 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 1.0), clamp(vec3(1.0, determinant(mat4(0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) + 0.0), 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 1.0), _GLF_IDENTITY(vec3(1.0, determinant(mat4(0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) + 0.0), 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 1.0), (vec3(1.0, determinant(mat4(0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) + 0.0), 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 1.0)) / vec3(1.0, 1.0, 1.0)), vec3(1.0, determinant(mat4(0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) + 0.0), 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 1.0))))))))) {
                                    continue;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                        }
                                    } else {
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                    }
                                    _GLF_color = max(vec4(1865.4706, 9258.7088, -0.6, 87.34), 5745.0212);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        break;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = unpackUnorm4x8((+21588u));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                break;
                                            }
                                        }
                                    }
                                    continue;
                                }
                                ivec2 GLF_live3pos = _GLF_IDENTITY(_GLF_FUZZED((~(_GLF_IDENTITY((-98560) - ivec2(73539, 48658), (_GLF_IDENTITY((-98560) - ivec2(73539, 48658), ivec2(0, 0) ^ ((-98560) - ivec2(73539, 48658)))) / ivec2(1, 1))))), ivec2(0, 0) ^ (_GLF_FUZZED((~(_GLF_IDENTITY((-98560) - ivec2(73539, 48658), (_GLF_IDENTITY((-98560) - ivec2(73539, 48658), ivec2(0, 0) ^ ((-98560) - ivec2(73539, 48658)))) / ivec2(1, 1)))))));
                                if (_GLF_DEAD(false)) {
                                    return;
                                    {
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                            break;
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_outVarBackup_GLF_color = _GLF_color) - vec4(0.0, 0.0, 0.0, 0.0));
                                        _GLF_color = _GLF_IDENTITY(vec4(7185.5919, -2682.5587, 9437.5582, -97.49), mat4(1.0) * (vec4(7185.5919, -2682.5587, 9437.5582, -97.49)));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                {
                                    int GLF_live3looplimiter0 = 0;
                                    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            {
                                                vec2 GLF_live6coord = _GLF_FUZZED(vec2(-37.82, 475.558));
                                                int GLF_live6i = _GLF_FUZZED(-11891);
                                                int GLF_live6j = _GLF_FUZZED(19687);
                                                int GLF_live6looplimiter0 = 0;
                                                vec4 GLF_live6res = _GLF_IDENTITY(_GLF_FUZZED(vec4(1.8, -4.7, -26.01, -54.85)), max(_GLF_IDENTITY(_GLF_FUZZED(vec4(1.8, -4.7, -26.01, -54.85)), (_GLF_FUZZED(vec4(1.8, -4.7, -26.01, -54.85))) * mat4(1.0)), _GLF_FUZZED(vec4(1.8, -4.7, -26.01, -54.85))));
                                                float GLF_live6uvstep = _GLF_FUZZED(((-5720.3101) * float(62776u)));
                                                {
                                                    if (GLF_live6looplimiter0 >= 7) {
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(_GLF_IDENTITY(!(true), bool(bvec3(!(true), true, true))))))) {
                                                            ;
                                                        } else {
                                                        }
                                                    }
                                                    GLF_live6looplimiter0++;
                                                    {
                                                        GLF_live6res += texture(GLF_live6tex, GLF_live6coord + vec2(float(GLF_live6i - 1) * GLF_live6uvstep, float(GLF_live6j - 1) * GLF_live6uvstep)) * GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live6i * 3, int(_GLF_IDENTITY(ivec4(GLF_live6i * 3, 0, 1, 0), ivec4(0, 0, 0, 0) + (ivec4(GLF_live6i * 3, 0, 1, 0))))) + GLF_live6j, 9)];
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        return;
                                                    }
                                                }
                                            }
                                            do {
                                                _GLF_color = fma(vec4(-2.4, 7.8, 8719.7122, -3201.6757), exp2(vec4(_GLF_IDENTITY(2079.5753, clamp(2079.5753, 2079.5753, 2079.5753)), -5.0, -3.1, -180.520)), inversesqrt(vec4(-6.3, 7.1, 2.6, -4294.0618)));
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, clamp(injectionSwitch.x, injectionSwitch.x, injectionSwitch.x)) > injectionSwitch.y))));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        while (GLF_live3pos.y != 256) {
                                            if (GLF_live3looplimiter0 >= _GLF_IDENTITY(4, max(4, 4))) {
                                                if (_GLF_IDENTITY(_GLF_DEAD(false), false || (_GLF_DEAD(false)))) {
                                                    _GLF_color = dFdyCoarse(_GLF_color);
                                                    {
                                                        int GLF_live6looplimiter1 = 0;
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), clamp(int(3), int(3), int(3)))))); _injected_loop_counter++) {
                                                            if (GLF_live6looplimiter1 >= 7) {
                                                                ;
                                                            }
                                                        }
                                                    }
                                                }
                                                break;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    break;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-8.9, -647.027, -5.9, -9.6);
                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                            continue;
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_live3looplimiter0++;
                                            {
                                                if (_GLF_IDENTITY(GLF_live3pos, ~(~(GLF_live3pos))).x < GLF_live3dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256)] + 15 && GLF_live3pos.x > _GLF_IDENTITY(GLF_live3dp[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256), (_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256)) - 0)], min(GLF_live3dp[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256), _GLF_IDENTITY((_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live3pos.y, (false ? _GLF_FUZZED(67175) : _GLF_IDENTITY(GLF_live3pos.y, (GLF_live3pos.y) * int(_GLF_ONE(1.0, injectionSwitch.y))))), 256)) - 0, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? ((_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live3pos.y, (false ? _GLF_FUZZED(67175) : _GLF_IDENTITY(GLF_live3pos.y, (GLF_live3pos.y) * int(_GLF_ONE(1.0, injectionSwitch.y))))), 256)) - 0) : _GLF_FUZZED(GLF_live3looplimiter0))))], _GLF_IDENTITY(GLF_live3dp[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256), (_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256)) - 0)], (GLF_live3dp[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256), (_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256)) - 0)]) + 0))) - 15) {
                                                    float GLF_live3p = (_GLF_IDENTITY(15.0, 0.0 + (15.0)) - abs(_GLF_IDENTITY(float(_GLF_IDENTITY(GLF_live3pos.x - GLF_live3dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256)], (0 << _GLF_IDENTITY(int(4), int(4))) | (GLF_live3pos.x - GLF_live3dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256)]))), (false ? _GLF_FUZZED(2.0) : float(_GLF_IDENTITY(GLF_live3pos.x - GLF_live3dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256)], (0 << _GLF_IDENTITY(int(4), int(4))) | (GLF_live3pos.x - GLF_live3dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256)]))))))) / 15.0;
                                                    do {
                                                        ;
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                }
                                                do {
                                                    GLF_live3pos.y++;
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = sign(vec4(654.593, _GLF_IDENTITY(_GLF_IDENTITY(7.1, clamp(7.1, 7.1, 7.1)), (_GLF_IDENTITY(7.1, clamp(7.1, 7.1, 7.1))) + _GLF_IDENTITY(dot(vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0))), vec2(1.0, 0.0)), dot(vec2(0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0))), vec2(1.0, 0.0)))), 7391.9400, -5523.1512));
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_IDENTITY(tanh(GLF_live5gl_FragCoord), _GLF_IDENTITY(vec4(_GLF_IDENTITY(mat4x3(tanh(GLF_live5gl_FragCoord), 0.0, 0.0, tan(0.0), sqrt(0.0), 1.0, 0.0, 1.0, cos(0.0)), mat4x3(mat4x3(mat4x3(tanh(GLF_live5gl_FragCoord), 0.0, 0.0, tan(0.0), sqrt(0.0), 1.0, 0.0, 1.0, cos(0.0)))))), (vec4(_GLF_IDENTITY(mat4x3(tanh(GLF_live5gl_FragCoord), 0.0, 0.0, tan(0.0), sqrt(0.0), 1.0, 0.0, 1.0, cos(0.0)), mat4x3(mat4x3(mat4x3(tanh(GLF_live5gl_FragCoord), 0.0, 0.0, tan(0.0), sqrt(0.0), 1.0, 0.0, 1.0, cos(0.0))))))) - log(vec4(1.0, 1.0, 1.0, 1.0))));
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                        _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? (_GLF_color = _GLF_outVarBackup_GLF_color) : _GLF_FUZZED(_GLF_color)));
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), false || (!(false))))))) {
                                        continue;
                                    }
                                }
                            }
                        } else if (i == 9) {
                            obj.prime_numbers[i] = 29;
                        }
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = pow(vec4(643.313, -5438.4060, 337.315, 1.3), vec4(-7603.5026, -8.7, -_GLF_IDENTITY(20.66, (_GLF_IDENTITY(20.66, 1.0 * (20.66))) + 0.0), 8280.3587));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                break;
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, false || (false))));
    vec2 uv = (gl_FragCoord.xy / resolution.x) * vec2(_GLF_IDENTITY(resolution.x, clamp(_GLF_IDENTITY(resolution.x, (resolution.x) - _GLF_IDENTITY(0.0, (0.0) / 1.0)), _GLF_IDENTITY(resolution.x, _GLF_IDENTITY(float(mat3(_GLF_IDENTITY(resolution.x, 1.0 * (resolution.x)), 0.0, abs(0.0), 0.0, 0.0, 1.0, cos(0.0), sqrt(0.0), _GLF_IDENTITY(dot(vec4(0.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)), vec4(1.0, 1.0, 1.0, 1.0)), dot(vec4(0.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)), vec4(1.0, 1.0, 1.0, 1.0))))), (false ? _GLF_FUZZED(7477.9881) : float(mat3(_GLF_IDENTITY(resolution.x, 1.0 * (resolution.x)), 0.0, abs(0.0), 0.0, 0.0, 1.0, cos(0.0), sqrt(0.0), _GLF_IDENTITY(dot(vec4(0.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)), vec4(1.0, 1.0, 1.0, 1.0)), dot(vec4(0.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)), vec4(1.0, 1.0, 1.0, 1.0)))))))), _GLF_IDENTITY(resolution.x, float(mat4x3(resolution.x, 0.0, 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, float(mat3(0.0, 0.0, determinant(mat2(0.0, 1.0, 0.0, length(0.0))), 0.0, 0.0, 0.0, 0.0, 0.0, abs(1.0)))), _GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED((+855.033))), bool(false))), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(_GLF_IDENTITY(0.0, 1.0 * (0.0)), 1.0))), 0.0, exp(0.0), 1.0))))) / _GLF_IDENTITY(resolution, (true ? resolution : _GLF_FUZZED(GLF_live5injectionSwitch))).y, 1.0);
    GLF_merged2_0_2_1_2_2_2buv.zw = uv;
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    vec2 b = brick(GLF_merged2_0_2_1_2_2_2buv.zw * 7.0);
    GLF_merged2_0_2_1_2_2_2buv.xy = b;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(false)) {
            return;
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (_GLF_IDENTITY(true ? mat2x4(-6.2, 56.63, 8535.0627, 34.92, -4.9, -9.6, _GLF_IDENTITY(-39.16, (false ? _GLF_FUZZED(9433.8024) : (-39.16))), 3.3)[0] : vec4(3785.5484, -5213.0058, 661.025, 5560.5755), max(_GLF_IDENTITY(true ? mat2x4(-6.2, 56.63, 8535.0627, 34.92, -4.9, -9.6, _GLF_IDENTITY(-39.16, (false ? _GLF_FUZZED(9433.8024) : (-39.16))), 3.3)[0] : vec4(3785.5484, -5213.0058, 661.025, 5560.5755), (true ? mat2x4(-6.2, 56.63, 8535.0627, 34.92, -4.9, -9.6, _GLF_IDENTITY(-39.16, (false ? _GLF_FUZZED(9433.8024) : (-39.16))), 3.3)[0] : vec4(3785.5484, -5213.0058, 661.025, 5560.5755)) - vec4(0.0, 0.0, 0.0, 0.0)), true ? mat2x4(-6.2, 56.63, 8535.0627, 34.92, -4.9, -9.6, _GLF_IDENTITY(-39.16, (false ? _GLF_FUZZED(9433.8024) : (-39.16))), 3.3)[0] : vec4(3785.5484, -5213.0058, 661.025, 5560.5755))));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    vec3 color = vec3(patternize(GLF_merged2_0_2_1_2_2_2buv.xy));
    if (gl_FragCoord.y < resolution.y / 1.1) {
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (binarySearch(obj, obj.prime_numbers[4]) != -(int(resolution.y)) && binarySearch(obj, obj.prime_numbers[0]) >= -(int(resolution.x))) {
                color.yz -= dot(float(binarySearch(obj, _GLF_IDENTITY(obj.prime_numbers[4], (obj.prime_numbers[4]) / 1))), float(binarySearch(obj, obj.prime_numbers[0])));
                {
                    int GLF_live5i = _GLF_FUZZED((99035 - (-19236)));
                    {
                        int GLF_live5looplimiter5 = 0;
                        do {
                            if (GLF_live5looplimiter5 >= 7) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                            }
                            GLF_live5looplimiter5++;
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                switch (GLF_live5i) {
                                    case 0:
                                        GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = 4;
                                        break;
                                    case 1:
                                        GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = 3;
                                        break;
                                    case 2:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_IDENTITY(GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = 2, (GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = 2) ^ 0);
                                        } else {
                                        }
                                        break;
                                    case 3:
                                        if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true))), _GLF_IDENTITY(bool(bvec4(_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true))), !(!_GLF_IDENTITY((_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true))), false || (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true)))))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) || (_GLF_IDENTITY((_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true))), false || (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true)))))), ((_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true))), false || (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true))))))) && true))))), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false, _GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))), !(!(bool(bvec4(_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true))), !(!_GLF_IDENTITY((_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true))), false || (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true)))))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) || (_GLF_IDENTITY((_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true))), false || (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true)))))), ((_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true))), false || (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false))))))))), (bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, true && (false))), !(_GLF_IDENTITY(!(bool(_GLF_IDENTITY(false, true && (false)))), false || (!(bool(_GLF_IDENTITY(false, true && (false)))))))))) && true))))))) && true))))), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false, _GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0)))))))))) {
                                            do {
                                                _GLF_color = _GLF_IDENTITY(roundEven(vec4(resolution, 8.5, -6.0)), vec4(1.0, 1.0, 1.0, 1.0) * (_GLF_IDENTITY(roundEven(vec4(resolution, 8.5, -6.0)), mix(vec4(_GLF_FUZZED(-988.150), _GLF_FUZZED(118.265), (roundEven(vec4(resolution, 8.5, -6.0)))[2], _GLF_FUZZED(-963.625)), vec4((roundEven(vec4(resolution, 8.5, -6.0)))[0], (roundEven(vec4(resolution, 8.5, -6.0)))[1], _GLF_FUZZED(-5196.7008), (roundEven(vec4(resolution, 8.5, -6.0)))[3]), bvec4(true, true, false, true)))));
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                        GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = 1;
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    case 4:
                                        GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = 0;
                                        break;
                                    case 5:
                                        GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = -1;
                                        break;
                                    case 6:
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < determinant(mat4(0.0, 1.0, _GLF_IDENTITY(1.0, _GLF_IDENTITY(float(mat2(_GLF_IDENTITY(1.0, (1.0) - 0.0), 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0)), 0.0 + (float(mat2(_GLF_IDENTITY(1.0, (1.0) - 0.0), 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0))))), 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), bool(bool(gl_FragCoord.y < determinant(mat4(0.0, 1.0, _GLF_IDENTITY(1.0, _GLF_IDENTITY(float(mat2(_GLF_IDENTITY(1.0, (1.0) - 0.0), 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0)), 0.0 + (float(mat2(_GLF_IDENTITY(1.0, (1.0) - 0.0), 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0))))), 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))))))))) {
                                                continue;
                                            }
                                            _GLF_IDENTITY(GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = -2, (true ? (GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = -2) : _GLF_FUZZED(GLF_live5i)));
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                        break;
                                    case 7:
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = -3;
                                        } else {
                                        }
                                        break;
                                    case 8:
                                        GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = -4;
                                        break;
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                            break;
                                        }
                                    case 9:
                                        GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = -5;
                                        break;
                                }
                                _GLF_IDENTITY(GLF_live5i++, (GLF_live5i++) >> 0);
                            } else {
                            }
                        } while (GLF_live5i < 10);
                    }
                }
            } else {
                discard;
            }
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY((int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ 1), ~(~((int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ 1))))); _injected_loop_counter++) {
                _GLF_color = _GLF_color;
            }
        }
        for (int _injected_loop_counter = (_GLF_IDENTITY((1 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), (int(5)) | (int(5))))), ((1 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), (int(5)) | (int(5)))))) / 1) >> _GLF_IDENTITY(int(5), int(5))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter--) {
            if (_GLF_IDENTITY(binarySearch(obj, 1), ~(_GLF_IDENTITY(~(binarySearch(obj, 1)), (_GLF_IDENTITY(~(binarySearch(obj, 1)), 0 | (~(binarySearch(obj, 1))))) >> 0))) == -1) {
                discard;
            } else {
                color.yz += _GLF_IDENTITY(color, mat3(1.0) * (color)).yz;
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        _GLF_color = vec4(color, injectionSwitch.y);
    }
    {
        int GLF_live0i = _GLF_FUZZED(int((54588u * 99826u)));
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < tan(_GLF_ZERO(0.0, injectionSwitch.x)))), (_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < tan(_GLF_ZERO(0.0, injectionSwitch.x)), _GLF_IDENTITY(bool(bvec4(gl_FragCoord.y < tan(_GLF_ZERO(0.0, injectionSwitch.x)), false, true, false)), !(!(bool(bvec4(gl_FragCoord.y < tan(_GLF_ZERO(0.0, injectionSwitch.x)), false, true, false))))))))) || _GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, !(!(injectionSwitch.x > injectionSwitch.y)))))))) {
            return;
        }
        int GLF_live0j = _GLF_FUZZED(_GLF_IDENTITY((54945 - ((vec4(-57.75, -_GLF_IDENTITY(9.9, max(9.9, 9.9)), -4.8, 8.0) != vec4(7880.6334, 8.8, 268.607, 3232.9341)) ? (-61030) : 19561)), ((54945 - ((vec4(-57.75, -_GLF_IDENTITY(9.9, max(9.9, 9.9)), -4.8, 8.0) != vec4(_GLF_IDENTITY(7880.6334, max(_GLF_IDENTITY(7880.6334, clamp(7880.6334, _GLF_IDENTITY(7880.6334, (7880.6334) / 1.0), 7880.6334)), 7880.6334)), 8.8, 268.607, 3232.9341)) ? (-61030) : 19561))) | ((54945 - ((vec4(-57.75, -_GLF_IDENTITY(9.9, max(9.9, 9.9)), -4.8, 8.0) != vec4(7880.6334, 8.8, 268.607, 3232.9341)) ? (-61030) : 19561)))));
        int GLF_live0looplimiter8 = 0;
        mat4 GLF_live0matrix_a = _GLF_FUZZED(mat4(7.1, -1286.9598, -1979.1909, 687.346, -7507.0880, 539.046, -93.79, 96.01, 2055.1285, _GLF_IDENTITY(-_GLF_IDENTITY(0.5, clamp(0.5, _GLF_IDENTITY(0.5, (0.5) / 1.0), 0.5)), (-_GLF_IDENTITY(0.5, clamp(0.5, _GLF_IDENTITY(0.5, (0.5) / 1.0), 0.5))) - 0.0), 8.4, -55.42, 4.9, 3.6, -82.91, 77.11));
        vec4 GLF_live0matrix_b = _GLF_FUZZED((mat4(6.7, 3.8, -0.7, 3670.4871, -8.6, -86.85, -8.1, 6.5, -6.9, -7.7, 414.754, 7.3, -1.3, 8.8, -51.52, 8.8) * vec4(-24.99, 1.3, 38.59, _GLF_IDENTITY(_GLF_IDENTITY(-908.759, mix(float(_GLF_IDENTITY(-908.759, min(_GLF_IDENTITY(-908.759, (-908.759) / 1.0), -908.759))), float(_GLF_FUZZED(8862.4005)), bool(false))), float(_GLF_IDENTITY(vec2(_GLF_IDENTITY(-908.759, mix(float(_GLF_IDENTITY(-908.759, min(_GLF_IDENTITY(-908.759, (-908.759) / 1.0), -908.759))), float(_GLF_FUZZED(8862.4005)), bool(false))), sin(0.0)), clamp(vec2(_GLF_IDENTITY(-908.759, mix(float(_GLF_IDENTITY(-908.759, min(_GLF_IDENTITY(-908.759, (-908.759) / 1.0), -908.759))), float(_GLF_FUZZED(8862.4005)), bool(false))), sin(0.0)), vec2(_GLF_IDENTITY(-908.759, mix(float(_GLF_IDENTITY(-908.759, min(_GLF_IDENTITY(-908.759, (-908.759) / 1.0), -908.759))), float(_GLF_FUZZED(8862.4005)), bool(false))), sin(0.0)), vec2(_GLF_IDENTITY(-908.759, mix(float(_GLF_IDENTITY(-908.759, min(_GLF_IDENTITY(-908.759, (-908.759) / 1.0), -908.759))), float(_GLF_FUZZED(8862.4005)), bool(false))), sin(0.0)))))))));
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 | 0)); _injected_loop_counter--) {
            if (GLF_live0looplimiter8 >= _GLF_IDENTITY(5, _GLF_IDENTITY(int(int(5)), _GLF_IDENTITY(int(int(int(int(5)))), (false ? _GLF_FUZZED(-25141) : _GLF_IDENTITY(int(int(int(int(5)))), ~(~(int(int(int(int(5)))))))))))) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                    ;
                } else {
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            return;
                            {
                                vec2 GLF_live5color = _GLF_FUZZED(vec2(546.949, 68.43));
                                int GLF_live5i = _GLF_FUZZED((49781 - (-27543)));
                                vec3 GLF_live5vecCoor = _GLF_FUZZED((+vec3(5676.0706, -5.3, _GLF_IDENTITY(22.13, clamp(22.13, _GLF_IDENTITY(22.13, min(22.13, 22.13)), 22.13)))));
                                if (int(GLF_live5gl_FragCoord[1]) < 150) {
                                    ;
                                } else if (int(GLF_live5gl_FragCoord[1]) < 180) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(exp2(31.53), -893.443, log2(-823.157), atan(1666.6537, (+8.2)));
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        _GLF_IDENTITY(GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[4])))), (_GLF_IDENTITY(GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[4])))), (GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[4]))))) / vec2(1.0, 1.0))) * vec2(1.0, 1.0));
                                    }
                                    GLF_live5color[1] += asinh(GLF_live5gl_FragCoord.y * ldexp(_GLF_IDENTITY(GLF_live5color, max(_GLF_IDENTITY(GLF_live5color, vec2(mat2(GLF_live5color, 0.0, 1.0))), _GLF_IDENTITY(GLF_live5color, mix(vec2((GLF_live5color)[0], (GLF_live5color)[1]), vec2(_GLF_FUZZED(813.983), _GLF_FUZZED(5.7)), bvec2(false, false))))).y, -GLF_live5i));
                                    ;
                                } else if (int(GLF_live5gl_FragCoord[1]) < 210) {
                                    GLF_live5color = fract(sin(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[5]))));
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    GLF_live5color.y -= tanh(GLF_live5color.x) / cosh(GLF_live5color.y);
                                    do {
                                        ;
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    } else {
                                        if (int(GLF_live5gl_FragCoord[1]) < 240) {
                                            GLF_live5color = fract(asinh(GLF_live5vecCoor.yx - trunc(float(GLF_live5data[6]))));
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                                continue;
                                            }
                                            GLF_live5color.y -= isnan(float(GLF_live5i)) ? tanh(GLF_live5gl_FragCoord.x) : atanh(GLF_live5gl_FragCoord.y);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                discard;
                                            }
                                            ;
                                        } else if (int(_GLF_IDENTITY(GLF_live5gl_FragCoord, min(_GLF_IDENTITY(GLF_live5gl_FragCoord, (true ? GLF_live5gl_FragCoord : _GLF_FUZZED(GLF_merged2_0_2_1_2_2_2buv))), GLF_live5gl_FragCoord))[1]) < 270) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = degrees(acosh(GLF_live5gl_FragCoord));
                                            }
                                            GLF_live5color = fract(sin(_GLF_IDENTITY(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), clamp(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0))))), min(_GLF_IDENTITY(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), clamp(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0))))), clamp(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), clamp(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0))))), _GLF_IDENTITY(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), clamp(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0))))), mix(vec2(_GLF_FUZZED(57.78), (GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), clamp(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0))))))[1]), vec2((GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), clamp(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0))))))[0], _GLF_FUZZED(-3.7)), bvec2(true, false))), GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), clamp(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0))))))), _GLF_IDENTITY(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), clamp(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0))))), min(GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), clamp(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0))))), GLF_live5vecCoor.yx - _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), clamp(min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)), min(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), _GLF_IDENTITY(trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))])), (trunc(float(GLF_live5data[_GLF_IDENTITY(7, (7) | (7))]))) - 0.0)))))))))));
                                            GLF_live5color.y *= mix(normalize(GLF_live5vecCoor), _GLF_IDENTITY(normalize(vec3(GLF_live5color, degrees(GLF_live5color.x))), vec3(mat3(normalize(vec3(GLF_live5color, degrees(GLF_live5color.x))), 1.0, 1.0, 1.0, length(vec3(0.0, 0.0, 0.0)), 1.0, 1.0))), GLF_live5injectionSwitch.x).y;
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                ;
                                            }
                                        } else {
                                            ;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < 0.0, !(_GLF_IDENTITY(!(gl_FragCoord.y < 0.0), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) && (!(gl_FragCoord.y < 0.0))))))))) {
                                                discard;
                                            }
                                        }
                                    }
                                }
                            }
                            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), false || (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), bool(bvec4(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), true, true, false)))))) {
                                continue;
                            }
                        }
                    }
                } else {
                }
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                GLF_live0looplimiter8++;
            }
            {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < tan(0.0), true && (gl_FragCoord.x < tan(0.0))))))) {
                                continue;
                            }
                        } else {
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((_GLF_IDENTITY(1 << _GLF_IDENTITY(int(4), int(4)), (_GLF_IDENTITY(1 << _GLF_IDENTITY(int(4), int(4)), _GLF_IDENTITY((1 << _GLF_IDENTITY(int(4), int(4))), max((1 << _GLF_IDENTITY(int(4), int(4))), (1 << _GLF_IDENTITY(int(4), int(4))))) - 0)) >> 0)) >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter++) {
                                return;
                            }
                        }
                    }
                }
                GLF_live0matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)] -= (GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)][_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live0j, _GLF_IDENTITY(4, (4) - 0)), (_GLF_MAKE_IN_BOUNDS_INT(GLF_live0j, _GLF_IDENTITY(4, (4) - 0))) / 1)] * GLF_live0matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0j, _GLF_IDENTITY(4, _GLF_IDENTITY((4), (true ? (4) : _GLF_FUZZED(GLF_live0j))) | (4)))]);
            }
        }
    }
}
