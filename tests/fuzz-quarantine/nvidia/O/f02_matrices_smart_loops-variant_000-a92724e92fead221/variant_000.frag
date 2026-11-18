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

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_live4injectionSwitch;
};

struct GLF_live4QuicksortObject {
    int numbers[10];
};

GLF_live4QuicksortObject GLF_live4obj;

vec3 GLF_live4palette(vec3 GLF_live4a, vec3 GLF_live4b, vec3 GLF_live4c, vec3 GLF_live4d) {
    return fract(mix(GLF_live4d * GLF_live4a, GLF_live4a * GLF_live4c, GLF_live4b + GLF_live4d - GLF_live4c));
}

int GLF_dead2data[10] = int[10](_GLF_FUZZED(-33861), _GLF_FUZZED((true ? ((-65179) & (-72511)) : 34562)), _GLF_FUZZED((89219 ^ (-29379))), _GLF_FUZZED(78073), _GLF_FUZZED(-15131), _GLF_FUZZED(-47672), _GLF_FUZZED(39632), _GLF_FUZZED(-78575), _GLF_FUZZED(-73306), _GLF_FUZZED((16053))), GLF_dead2temp[10] = int[10](_GLF_FUZZED(13725), _GLF_FUZZED(-1836), _GLF_FUZZED(-31779), _GLF_FUZZED(49722), _GLF_FUZZED((-(93554 | 8876))), _GLF_FUZZED(-34579), _GLF_FUZZED(((false ? 53978 : 63718) ^ 28445)), _GLF_FUZZED(13297), _GLF_FUZZED(int((mat2(-8.1, -2.4, 872.350, -1610.3259) != mat2(4056.9046, -885.786, 3.0, 3.1)))), _GLF_FUZZED(12830));
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

void main() {
    if (_GLF_DEAD(false)) {
        return;
    }
    uint matrix_number = 0u;
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
    }
    for (int cols = 2; cols <= 4; cols++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            break;
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (determinant(m33) + _GLF_color);
                }
                for (int _GLF_SPLIT_LOOP_COUNTERrows = 2; _GLF_SPLIT_LOOP_COUNTERrows < 3; _GLF_SPLIT_LOOP_COUNTERrows++) {
                    for (int c = 0; c < cols; c++) {
                        for (int r = 0; r < _GLF_SPLIT_LOOP_COUNTERrows; r++) {
                            switch (matrix_number) {
                                case 0u:
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(sin(0.0), 1.0, 1.0)), dot(vec3(1.0, 0.0, 0.0), vec3(sin(0.0), 1.0, 1.0))))))) {
                                        } else {
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    m22[c][r] = one;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        return;
                                    }
                                    break;
                                case 1u:
                                    m23[c][r] = one;
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (one + vec4(61.57, 908.559, -1.0, -6397.6205));
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (vec4(24.98, 7605.9545, 588.433, 2770.1881) / reflect(_GLF_color, _GLF_color));
                                        }
                                    }
                                case 2u:
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        continue;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(15.34, 0.6, -0.3, 48.84);
                                        }
                                    }
                                    m24[c][r] = one;
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        return;
                                    }
                                case 3u:
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(3.9, 65.47, 9.6, 116.504);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        return;
                                    }
                                    {
                                        vec3 GLF_live4color = _GLF_FUZZED(vec3(9.4));
                                        int GLF_live4count = _GLF_FUZZED(int(true));
                                        {
                                            GLF_live4color -= GLF_live4palette(vec3(float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live4injectionSwitch.x, 0.6, float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.x), 10)]) * 0.1));
                                            GLF_live4count++;
                                        }
                                    }
                                    m32[c][r] = one;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        discard;
                                        {
                                            int GLF_live6i = _GLF_FUZZED((63992 & (-84871)));
                                            float GLF_live6limit = _GLF_FUZZED(9.7);
                                            float GLF_live6result = _GLF_FUZZED((1141.1207 + 56.45));
                                            if (float(GLF_live6i) >= GLF_live6limit) {
                                                ;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    break;
                                case 4u:
                                    if (_GLF_DEAD(false)) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-9.3, 64.33, -96.98, -65.16);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        float donor_replacementGLF_dead1limit = _GLF_FUZZED(one);
                                        float donor_replacementGLF_dead1ref = _GLF_FUZZED((one / 536.331));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                continue;
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = ceil(vec4(vec2(9.4, -3508.7319), -50.95, -6.9));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        float donor_replacementGLF_dead1s = _GLF_FUZZED(one);
                                        if (_GLF_DEAD(false)) {
                                            return;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                        }
                                        {
                                            for (int _GLF_SPLIT_LOOP_COUNTERGLF_dead1i = 1; _GLF_SPLIT_LOOP_COUNTERGLF_dead1i < 272; _GLF_SPLIT_LOOP_COUNTERGLF_dead1i++) {
                                                if (mod(float(_GLF_SPLIT_LOOP_COUNTERGLF_dead1i), donor_replacementGLF_dead1ref) <= 0.01) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-30.24, -650.869, -3448.7438, 101.938);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = vec4(-2.7, -2.5, 5324.7379, -82.09);
                                                            }
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                    }
                                                    donor_replacementGLF_dead1s += 0.2;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = vec4(-5.8, 7.3, -1.1, 348.108);
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(exp2(8.2), -5490.7627, vec2(850.969, 8770.2119));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(8.9, -607.805, -466.851, 172.128);
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                                                _GLF_color = (dFdyCoarse(_GLF_outVarBackup_GLF_color) - _GLF_color);
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                        }
                                                    }
                                                }
                                                if (float(_GLF_SPLIT_LOOP_COUNTERGLF_dead1i) >= donor_replacementGLF_dead1limit) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = sqrt(_GLF_color);
                                                    }
                                                    ;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                            }
                                            for (int _GLF_SPLIT_LOOP_COUNTERGLF_dead1i = 272; _GLF_SPLIT_LOOP_COUNTERGLF_dead1i < 800; _GLF_SPLIT_LOOP_COUNTERGLF_dead1i++) {
                                                if (mod(float(_GLF_SPLIT_LOOP_COUNTERGLF_dead1i), donor_replacementGLF_dead1ref) <= 0.01) {
                                                    donor_replacementGLF_dead1s += 0.2;
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = ceil(vec4(-4.6, 7.0, -5.1, -9.9));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        return;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = vec4(-5.8, 7.3, -1.1, 348.108);
                                                    }
                                                }
                                                {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = exp2(vec4(-7.0, 2.6, 4573.2991, -9.2));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(exp2(8.2), -5490.7627, vec2(850.969, 8770.2119));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                if (float(_GLF_SPLIT_LOOP_COUNTERGLF_dead1i) >= donor_replacementGLF_dead1limit) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        return;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = sqrt(_GLF_color);
                                                    }
                                                    ;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-505.213, 4.4, -6064.3578, 6956.7951);
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = mod(vec4(-352.331, 19.79, -265.305, -3.6), vec4(181.723, 402.937, -5.0, -1.6));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                discard;
                                            }
                                        }
                                        m33[c][r] = one;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                        }
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-29.27, 7.8, 53.93, 6.8);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = (_GLF_color - 2.8);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            return;
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                continue;
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = fwidthCoarse(vec4(one));
                                        }
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(190.622, 9.2, 6.4, 7934.6127);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                    }
                                    break;
                                case 5u:
                                    {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-1.6, -1.4, 115.860, -7.9);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        vec3 GLF_live6c = _GLF_FUZZED(((vec3(-4.8, 2.1, -4363.3210) - (-37.00)) - 792.577));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = (mat2x4(922.683, -7.2, 2869.5373, -9.9, -1258.5459, 78.89, 588.268, -84.90) * vec2(-697.557, 9.5));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        int GLF_live6i = _GLF_FUZZED(87017);
                                        int GLF_live6looplimiter1 = 0;
                                        {
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                                if (GLF_live6looplimiter1 >= 6) {
                                                    for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(8), int(8))); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), min(int(2), int(2))))) >> _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter++) {
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = sign(_GLF_color);
                                                            }
                                                        }
                                                        ;
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = vec4(-2381.0542, -610.787, -98.88, -4656.9405);
                                                    }
                                                }
                                            }
                                            GLF_live6looplimiter1++;
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = unpackUnorm4x8(166892u);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = (_GLF_outVarBackup_GLF_color * one);
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                }
                                            }
                                            {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                if (GLF_live6c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 3)] >= 1.0) {
                                                    GLF_live6c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 3)] = GLF_live6c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 3)] * GLF_live6c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 3)];
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 0.0, 0.0, 0.0, 1.0, sqrt(0.0), log(1.0), 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 1.0), vec3(1.0, 0.0, 0.0)), dot(vec3(0.0, 1.0, 1.0), vec3(1.0, 0.0, 0.0))), 1.0, 1.0, 1.0, 0.0)))))) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-5002.8914, 2.6, -817.096, -5.9);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    m34[c][r] = one;
                                    break;
                                case 6u:
                                    m42[c][r] = one;
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    break;
                                case 7u:
                                    m43[c][r] = one;
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                        continue;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(one, vec3(6.1, 9107.9951, 7.6));
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        continue;
                                    }
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        return;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-6.1, -9.0, -2.3, 3.0);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                case 8u:
                                    m44[c][r] = one;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = faceforward(vec4(-3214.0208, 614.384, -547.479, 3.3), vec4(8617.8460, -8627.8618, 1.0, -43.42), (mat4(-97.98, 61.46, -8.7, 658.982, 88.86, 4.7, 56.55, 50.90, 153.796, -5985.4794, 622.744, -529.499, 4.4, 744.110, 49.93, -3.6) * vec4(96.37, -9123.6843, 5543.1762, -19.53)));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    break;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-1048.0608, 299.053, 1.9, 7.0);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = vec4(72.17, -946.143, -2.6, -9.8);
                                    }
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(4478.5513, 627.514, 925.274, 5683.5530);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    matrix_number = matrix_number + 1u;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            continue;
                        }
                        _GLF_color = log2(vec4(-23.33, -178.131, -77.33, -703.703));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = vec4(-1033.8236, -3008.0322, -6197.0630, -7165.6397);
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-6.4, -171.607, 59.36, 1553.1681);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = dFdx(vec4(-283.608, 8880.6107, 1.3, 6420.1460));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                {
                    for (int _GLF_SPLIT_LOOP_COUNTER_GLF_SPLIT_LOOP_COUNTERrows = 3; _GLF_SPLIT_LOOP_COUNTER_GLF_SPLIT_LOOP_COUNTERrows < 4; _GLF_SPLIT_LOOP_COUNTER_GLF_SPLIT_LOOP_COUNTERrows++) {
                        for (int c = 0; c < cols; c++) {
                            for (int r = 0; r < _GLF_SPLIT_LOOP_COUNTER_GLF_SPLIT_LOOP_COUNTERrows; r++) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    break;
                                }
                                switch (matrix_number) {
                                    case 0u:
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(sin(0.0), 1.0, 1.0)), dot(vec3(1.0, 0.0, 0.0), vec3(sin(0.0), 1.0, 1.0))))))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    discard;
                                                }
                                            } else {
                                                ;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                continue;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(38.18, 571.860, -57.59, 4562.6371);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color.ywyx;
                                            }
                                            discard;
                                        }
                                        m22[c][r] = one;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            return;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            return;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = dFdx(vec4(-56.80, -7.7, -974.988, 80.12));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        break;
                                    case 1u:
                                        m23[c][r] = one;
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (one + vec4(61.57, 908.559, -1.0, -6397.6205));
                                        }
                                    case 2u:
                                        m24[c][r] = one;
                                        break;
                                    case 3u:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(-93.99, 30.42, -8.9, 2.5);
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(195.707, -1.1, 6.1, 972.222);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = vec4(atan(0.7), distance(roundEven(injectionSwitch), vec2(375.915, -92.13)), one, -6866.6611);
                                        }
                                        {
                                            vec3 GLF_live4color = _GLF_FUZZED(vec3(9.4));
                                            int GLF_live4count = _GLF_FUZZED(int(true));
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = roundEven(vec4(3.4, -84.99, 44.67, -46.42)).xxyw;
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = fwidthFine(_GLF_color);
                                                        }
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                GLF_live4color -= GLF_live4palette(vec3(float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live4injectionSwitch.x, 0.6, float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.x), 10)]) * 0.1));
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                GLF_live4count++;
                                            }
                                        }
                                        m32[c][r] = one;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            discard;
                                            {
                                                int GLF_live6i = _GLF_FUZZED((63992 & (-84871)));
                                                float GLF_live6limit = _GLF_FUZZED(9.7);
                                                float GLF_live6result = _GLF_FUZZED((1141.1207 + 56.45));
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                    _GLF_color = vec4(826.161, 3.3, 2.3, -95.57);
                                                }
                                                if (float(GLF_live6i) >= GLF_live6limit) {
                                                    ;
                                                }
                                            }
                                        }
                                        break;
                                    case 4u:
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead1limit = _GLF_FUZZED(one);
                                            float donor_replacementGLF_dead1ref = _GLF_FUZZED((one / 536.331));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(79.53, -7.1, 4.0, 8804.9963);
                                            }
                                            {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(20.48, -21.67, -9.0, 73.29);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = ceil(vec4(vec2(9.4, -3508.7319), -50.95, -6.9));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                            }
                                            float donor_replacementGLF_dead1s = _GLF_FUZZED(one);
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            {
                                                for (int _GLF_SPLIT_LOOP_COUNTERGLF_dead1i = 1; _GLF_SPLIT_LOOP_COUNTERGLF_dead1i < 272; _GLF_SPLIT_LOOP_COUNTERGLF_dead1i++) {
                                                    if (mod(float(_GLF_SPLIT_LOOP_COUNTERGLF_dead1i), donor_replacementGLF_dead1ref) <= 0.01) {
                                                        donor_replacementGLF_dead1s += 0.2;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                        discard;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            if (_GLF_DEAD(false)) {
                                                                break;
                                                            }
                                                            _GLF_color = vec4(-5.8, 7.3, -1.1, 348.108);
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = mix(vec4(91.82, -0.4, 3652.8013, 4.9), _GLF_color, _GLF_color);
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            continue;
                                                        }
                                                        _GLF_color = vec4(exp2(8.2), -5490.7627, vec2(850.969, 8770.2119));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (float(_GLF_SPLIT_LOOP_COUNTERGLF_dead1i) >= donor_replacementGLF_dead1limit) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = sqrt(_GLF_color);
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            break;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-6.7, -393.790, -870.771, -2040.1758);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(4488.1321, 1.2, 2.9, -7.1);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(max(tan(vec3(-2.1, 299.594, 83.08)), vec3(-8432.3079, 9.0, -367.465)), length(vec3(2769.0407, 162.330, 82.00)));
                                                            }
                                                        }
                                                        ;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(93.79, -7.5, -40.68, 9.5);
                                                }
                                                for (int _GLF_SPLIT_LOOP_COUNTERGLF_dead1i = 272; _GLF_SPLIT_LOOP_COUNTERGLF_dead1i < 800; _GLF_SPLIT_LOOP_COUNTERGLF_dead1i++) {
                                                    if (mod(float(_GLF_SPLIT_LOOP_COUNTERGLF_dead1i), donor_replacementGLF_dead1ref) <= 0.01) {
                                                        donor_replacementGLF_dead1s += 0.2;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-9.8, 478.312, 8.8, -1.0);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(-7.2, -53.55, 1064.4687, 74.98);
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = vec4(-5.8, 7.3, -1.1, 348.108);
                                                        }
                                                    }
                                                    {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = fract(vec4(4.2, -625.280, -0.0, 0.2));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(exp2(8.2), -5490.7627, vec2(850.969, 8770.2119));
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = dFdy(_GLF_outVarBackup_GLF_color.ggaa);
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (float(_GLF_SPLIT_LOOP_COUNTERGLF_dead1i) >= donor_replacementGLF_dead1limit) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = vec4(-233.121, 5279.7670, -42.67, -2350.3959);
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = sqrt(_GLF_color);
                                                        }
                                                        ;
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                                    discard;
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-505.213, 4.4, -6064.3578, 6956.7951);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                                discard;
                                            }
                                            m33[c][r] = one;
                                        }
                                        {
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                _GLF_color = ceil(_GLF_color);
                                            }
                                            _GLF_color = vec4(-29.27, 7.8, 53.93, 6.8);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                        break;
                                    case 5u:
                                        {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-5893.5680, -6.9, 118.020, -1738.5258);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-81.80, -256.145, 39.21, 5.9);
                                            }
                                            vec3 GLF_live6c = _GLF_FUZZED(((vec3(-4.8, 2.1, -4363.3210) - (-37.00)) - 792.577));
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                    continue;
                                                }
                                                _GLF_color = (mat2x4(922.683, -7.2, 2869.5373, -9.9, -1258.5459, 78.89, 588.268, -84.90) * vec2(-697.557, 9.5));
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            int GLF_live6i = _GLF_FUZZED(87017);
                                            int GLF_live6looplimiter1 = 0;
                                            {
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = m44[2];
                                                        }
                                                        break;
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = abs(vec4(-82.69, 95.47, 2.9, 5.5));
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (+vec4(320.571, 7103.1936, 91.21, -8184.2472));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (GLF_live6looplimiter1 >= 6) {
                                                        for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(8), int(8))); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), min(int(2), int(2))))) >> _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter++) {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = (_GLF_color * atan(vec4(868.728, -2022.0457, -213.401, -553.276)));
                                                                }
                                                                _GLF_color = exp(vec4(-9.0, 2.8, -9.2, 5870.8394));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            ;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = dFdxFine(_GLF_color);
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = vec4(-2381.0542, -610.787, -98.88, -4656.9405);
                                                        }
                                                    }
                                                }
                                                GLF_live6looplimiter1++;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = _GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = dFdx(vec4(66.86, 5.6, 71.42, 5347.3292));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = dFdxCoarse(vec4(4451.3916, 3.0, 2.2, -587.020));
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = unpackUnorm4x8(166892u);
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                {
                                                    if (GLF_live6c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 3)] >= 1.0) {
                                                        GLF_live6c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 3)] = GLF_live6c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 3)] * GLF_live6c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 3)];
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            }
                                        }
                                        m34[c][r] = one;
                                        break;
                                    case 6u:
                                        m42[c][r] = one;
                                        break;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = sinh(vec4(-349.902, -43.55, -48.27, 9.2));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    case 7u:
                                        m43[c][r] = one;
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = step((_GLF_color - (one + vec4(344.159, -445.445, 80.19, -7831.2262))), vec4(4194.8341, 8.9, -2.7, -8.7));
                                            }
                                            continue;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = unpackSnorm4x8(85240u);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        break;
                                    case 8u:
                                        m44[c][r] = one;
                                        break;
                                }
                            }
                        }
                        matrix_number = matrix_number + 1u;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(89.82, -9.7, -7722.7204, 640.334);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = exp2(_GLF_color);
                                }
                            }
                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                _GLF_color = vec4(59.10, -4.5, 99.10, 2.7);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (injectionSwitch * (mat4x2(-6.8, 4796.4569, -977.832, -42.14, 89.34, one, 27.99, one) - length(vec3(664.823, 6.2, 65.26))));
                            }
                            _GLF_color = log2(vec4(-23.33, -178.131, -77.33, -703.703));
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(68.26, 711.589, 72.98, -33.08);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            _GLF_color = dFdx(vec4(-283.608, 8880.6107, 1.3, 6420.1460));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    for (int _GLF_SPLIT_LOOP_COUNTER_GLF_SPLIT_LOOP_COUNTERrows = 4; _GLF_SPLIT_LOOP_COUNTER_GLF_SPLIT_LOOP_COUNTERrows <= 4; _GLF_SPLIT_LOOP_COUNTER_GLF_SPLIT_LOOP_COUNTERrows++) {
                        for (int c = 0; c < cols; c++) {
                            for (int r = 0; r < _GLF_SPLIT_LOOP_COUNTER_GLF_SPLIT_LOOP_COUNTERrows; r++) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    break;
                                }
                                switch (matrix_number) {
                                    case 0u:
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(sin(0.0), 1.0, 1.0)), dot(vec3(1.0, 0.0, 0.0), vec3(sin(0.0), 1.0, 1.0))))))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    discard;
                                                }
                                            } else {
                                                ;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                continue;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(38.18, 571.860, -57.59, 4562.6371);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color.ywyx;
                                            }
                                            discard;
                                        }
                                        m22[c][r] = one;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            return;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            return;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = dFdx(vec4(-56.80, -7.7, -974.988, 80.12));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        break;
                                    case 1u:
                                        m23[c][r] = one;
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (one + vec4(61.57, 908.559, -1.0, -6397.6205));
                                        }
                                    case 2u:
                                        m24[c][r] = one;
                                        break;
                                    case 3u:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(-93.99, 30.42, -8.9, 2.5);
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(195.707, -1.1, 6.1, 972.222);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = vec4(atan(0.7), distance(roundEven(injectionSwitch), vec2(375.915, -92.13)), one, -6866.6611);
                                        }
                                        {
                                            vec3 GLF_live4color = _GLF_FUZZED(vec3(9.4));
                                            int GLF_live4count = _GLF_FUZZED(int(true));
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = roundEven(vec4(3.4, -84.99, 44.67, -46.42)).xxyw;
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = fwidthFine(_GLF_color);
                                                        }
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                GLF_live4color -= GLF_live4palette(vec3(float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live4injectionSwitch.x, 0.6, float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.x), 10)]) * 0.1));
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                GLF_live4count++;
                                            }
                                        }
                                        m32[c][r] = one;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            discard;
                                            {
                                                int GLF_live6i = _GLF_FUZZED((63992 & (-84871)));
                                                float GLF_live6limit = _GLF_FUZZED(9.7);
                                                float GLF_live6result = _GLF_FUZZED((1141.1207 + 56.45));
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                    _GLF_color = vec4(826.161, 3.3, 2.3, -95.57);
                                                }
                                                if (float(GLF_live6i) >= GLF_live6limit) {
                                                    ;
                                                }
                                            }
                                        }
                                        break;
                                    case 4u:
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead1limit = _GLF_FUZZED(one);
                                            float donor_replacementGLF_dead1ref = _GLF_FUZZED((one / 536.331));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(79.53, -7.1, 4.0, 8804.9963);
                                            }
                                            {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(20.48, -21.67, -9.0, 73.29);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = ceil(vec4(vec2(9.4, -3508.7319), -50.95, -6.9));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                            }
                                            float donor_replacementGLF_dead1s = _GLF_FUZZED(one);
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            {
                                                for (int _GLF_SPLIT_LOOP_COUNTERGLF_dead1i = 1; _GLF_SPLIT_LOOP_COUNTERGLF_dead1i < 272; _GLF_SPLIT_LOOP_COUNTERGLF_dead1i++) {
                                                    if (mod(float(_GLF_SPLIT_LOOP_COUNTERGLF_dead1i), donor_replacementGLF_dead1ref) <= 0.01) {
                                                        donor_replacementGLF_dead1s += 0.2;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                        discard;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            if (_GLF_DEAD(false)) {
                                                                break;
                                                            }
                                                            _GLF_color = vec4(-5.8, 7.3, -1.1, 348.108);
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = mix(vec4(91.82, -0.4, 3652.8013, 4.9), _GLF_color, _GLF_color);
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            continue;
                                                        }
                                                        _GLF_color = vec4(exp2(8.2), -5490.7627, vec2(850.969, 8770.2119));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (float(_GLF_SPLIT_LOOP_COUNTERGLF_dead1i) >= donor_replacementGLF_dead1limit) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = sqrt(_GLF_color);
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            break;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-6.7, -393.790, -870.771, -2040.1758);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(4488.1321, 1.2, 2.9, -7.1);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(max(tan(vec3(-2.1, 299.594, 83.08)), vec3(-8432.3079, 9.0, -367.465)), length(vec3(2769.0407, 162.330, 82.00)));
                                                            }
                                                        }
                                                        ;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(93.79, -7.5, -40.68, 9.5);
                                                }
                                                for (int _GLF_SPLIT_LOOP_COUNTERGLF_dead1i = 272; _GLF_SPLIT_LOOP_COUNTERGLF_dead1i < 800; _GLF_SPLIT_LOOP_COUNTERGLF_dead1i++) {
                                                    if (mod(float(_GLF_SPLIT_LOOP_COUNTERGLF_dead1i), donor_replacementGLF_dead1ref) <= 0.01) {
                                                        donor_replacementGLF_dead1s += 0.2;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-9.8, 478.312, 8.8, -1.0);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(-7.2, -53.55, 1064.4687, 74.98);
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = vec4(-5.8, 7.3, -1.1, 348.108);
                                                        }
                                                    }
                                                    {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = fract(vec4(4.2, -625.280, -0.0, 0.2));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(exp2(8.2), -5490.7627, vec2(850.969, 8770.2119));
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = dFdy(_GLF_outVarBackup_GLF_color.ggaa);
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (float(_GLF_SPLIT_LOOP_COUNTERGLF_dead1i) >= donor_replacementGLF_dead1limit) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = vec4(-233.121, 5279.7670, -42.67, -2350.3959);
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = sqrt(_GLF_color);
                                                        }
                                                        ;
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                                    discard;
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-505.213, 4.4, -6064.3578, 6956.7951);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                                discard;
                                            }
                                            m33[c][r] = one;
                                        }
                                        {
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                _GLF_color = ceil(_GLF_color);
                                            }
                                            _GLF_color = vec4(-29.27, 7.8, 53.93, 6.8);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                        break;
                                    case 5u:
                                        {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-5893.5680, -6.9, 118.020, -1738.5258);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-81.80, -256.145, 39.21, 5.9);
                                            }
                                            vec3 GLF_live6c = _GLF_FUZZED(((vec3(-4.8, 2.1, -4363.3210) - (-37.00)) - 792.577));
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                    continue;
                                                }
                                                _GLF_color = (mat2x4(922.683, -7.2, 2869.5373, -9.9, -1258.5459, 78.89, 588.268, -84.90) * vec2(-697.557, 9.5));
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            int GLF_live6i = _GLF_FUZZED(87017);
                                            int GLF_live6looplimiter1 = 0;
                                            {
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = m44[2];
                                                        }
                                                        break;
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = abs(vec4(-82.69, 95.47, 2.9, 5.5));
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (+vec4(320.571, 7103.1936, 91.21, -8184.2472));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (GLF_live6looplimiter1 >= 6) {
                                                        for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(8), int(8))); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), min(int(2), int(2))))) >> _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter++) {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = (_GLF_color * atan(vec4(868.728, -2022.0457, -213.401, -553.276)));
                                                                }
                                                                _GLF_color = exp(vec4(-9.0, 2.8, -9.2, 5870.8394));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            ;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = dFdxFine(_GLF_color);
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = vec4(-2381.0542, -610.787, -98.88, -4656.9405);
                                                        }
                                                    }
                                                }
                                                GLF_live6looplimiter1++;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = _GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = dFdx(vec4(66.86, 5.6, 71.42, 5347.3292));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = dFdxCoarse(vec4(4451.3916, 3.0, 2.2, -587.020));
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = unpackUnorm4x8(166892u);
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                {
                                                    if (GLF_live6c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 3)] >= 1.0) {
                                                        GLF_live6c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 3)] = GLF_live6c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 3)] * GLF_live6c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 3)];
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            }
                                        }
                                        m34[c][r] = one;
                                        break;
                                    case 6u:
                                        m42[c][r] = one;
                                        break;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = sinh(vec4(-349.902, -43.55, -48.27, 9.2));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    case 7u:
                                        m43[c][r] = one;
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = step((_GLF_color - (one + vec4(344.159, -445.445, 80.19, -7831.2262))), vec4(4194.8341, 8.9, -2.7, -8.7));
                                            }
                                            continue;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = unpackSnorm4x8(85240u);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        break;
                                    case 8u:
                                        m44[c][r] = one;
                                        break;
                                }
                            }
                        }
                        matrix_number = matrix_number + 1u;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(89.82, -9.7, -7722.7204, 640.334);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = exp2(_GLF_color);
                                }
                            }
                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                _GLF_color = vec4(59.10, -4.5, 99.10, 2.7);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (injectionSwitch * (mat4x2(-6.8, 4796.4569, -977.832, -42.14, 89.34, one, 27.99, one) - length(vec3(664.823, 6.2, 65.26))));
                            }
                            _GLF_color = log2(vec4(-23.33, -178.131, -77.33, -703.703));
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(68.26, 711.589, 72.98, -33.08);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            _GLF_color = dFdx(vec4(-283.608, 8880.6107, 1.3, 6420.1460));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
            }
        }
    }
    float sums[9];
    if (_GLF_DEAD(false)) {
        _GLF_color = unpackUnorm4x8(110527u);
    }
    int sum_index = 0;
    {
        {
            if (_GLF_DEAD(false)) {
                return;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = sign(vec4(51.83, 17.43, 21.05, -3.7));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            ;
        }
    }
    {
        for (int _GLF_SPLIT_LOOP_COUNTERcols = 2; _GLF_SPLIT_LOOP_COUNTERcols < 3; _GLF_SPLIT_LOOP_COUNTERcols++) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    for (int _GLF_SPLIT_LOOP_COUNTERrows = 2; _GLF_SPLIT_LOOP_COUNTERrows < 3; _GLF_SPLIT_LOOP_COUNTERrows++) {
                        sums[sum_index] = 0.0;
                        for (int c = 0; c < _GLF_SPLIT_LOOP_COUNTERcols; c++) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            for (int r = 0; r < _GLF_SPLIT_LOOP_COUNTERrows; r++) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (vec4(937.161, -4.4, -218.694, 0.6) + vec4(-8.5, 69.16, 0.4, -278.916));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    vec3 GLF_live4color = _GLF_FUZZED(vec3(-7.5));
                                    int GLF_live4count = _GLF_FUZZED(65035);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                        discard;
                                    }
                                    int GLF_live4looplimiter5 = 0;
                                    do {
                                        if (GLF_live4looplimiter5 >= 5) {
                                            break;
                                        }
                                        GLF_live4looplimiter5++;
                                        {
                                            GLF_live4color -= GLF_live4palette(vec3(float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live4injectionSwitch.x, 0.6, float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.x), 10)]) * 0.1));
                                            GLF_live4count++;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                _GLF_color = vec4(-5.5, -1.0, -9.4, 9.9);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = dFdyFine((mat2x4(8.0, -8098.7780, 6203.6994, 1.7, -7757.9257, -1.9, -7472.7218, 75.13) * (-injectionSwitch)));
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                        }
                                    } while (GLF_live4count != GLF_live4obj.numbers[2]);
                                }
                                switch (sum_index) {
                                    case 0:
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        sums[sum_index] += m22[c][r];
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            continue;
                                        }
                                    case 1:
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                discard;
                                            }
                                            vec3 GLF_live4color = _GLF_FUZZED(vec3(-688.638, -4117.2305, -7887.1173));
                                            int GLF_live4count = _GLF_FUZZED(72341);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = unpackUnorm4x8(169774u);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                return;
                                            }
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                GLF_live4color += GLF_live4palette(vec3(0.5, float(GLF_live4obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live4injectionSwitch.y)), vec3(float(GLF_live4obj.numbers[4]) * 0.1, GLF_live4injectionSwitch.x, 0.6));
                                                GLF_live4count++;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-209.090, 345.749, 9.3, -562.467);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                        sums[sum_index] += m23[c][r];
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        break;
                                    case 2:
                                        sums[sum_index] += m24[c][r];
                                        break;
                                    case 3:
                                        sums[sum_index] += m32[c][r];
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = sign(vec4(4607.1659, -120.289, 7548.9286, -2302.7985));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(-11.91, 9102.9132, 557.355, -8.5);
                                                    }
                                                    return;
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = mat2x4(3.2, -8.7, -9.2, 6.1, 4.0, 37.12, 86.69, 5.6)[1];
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = faceforward(clamp(_GLF_outVarBackup_GLF_color, _GLF_color, _GLF_outVarBackup_GLF_color), _GLF_outVarBackup_GLF_color, vec4(8057.5343, -591.038, 453.986, -7.5));
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (vec3(2109.4253, -6.2, 5.6) * (-mat4x3(-1.0, -7.5, -32.36, -35.37, 4.5, 5.0, -447.747, 9.3, 1.1, -327.739, -2.0, 77.30)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            continue;
                                        }
                                    case 4:
                                        sums[sum_index] += m33[c][r];
                                        break;
                                    case 5:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = roundEven(_GLF_color);
                                        }
                                        sums[sum_index] += m34[c][r];
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = tan(vec4(-84.76, -3094.8022, 9148.2922, 20.10));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_color = vec4(5.8, -2.2, 633.061, 7.4);
                                        }
                                    case 6:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            discard;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = dFdyCoarse(vec4(-628.535, -1398.0409, 0.9, -22.36));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        sums[sum_index] += m42[c][r];
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        break;
                                    case 7:
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(438.162, 4.3, 1925.4850, 7.1);
                                        }
                                        sums[sum_index] += m43[c][r];
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    discard;
                                                }
                                            } else {
                                                ;
                                            }
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-37.06, -1565.5138, 8.0, -4.6);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                {
                                                    ;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = normalize(vec4(4755.5402, -89.89, 2.6, 78.41));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                                _GLF_color = inversesqrt(vec4(695.380, 2.8, 0.4, 9.8));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            discard;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = acos(atan(vec4(-2.9, -8.4, -4.2, -5.1)));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                    case 8:
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = floor(_GLF_color);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(2145.0108, 6.4, -2.1, -8.4);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = sign(vec4(-10.13, 710.138, 745.461, 995.937));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            float donor_replacementGLF_dead2grey = _GLF_FUZZED(77.48);
                                            {
                                                donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[8]) / 10.0;
                                            }
                                        }
                                        sums[sum_index] += m44[c][r];
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        break;
                                }
                            }
                        }
                        sums[sum_index] /= 16.0;
                        sum_index++;
                    }
                    for (int _GLF_SPLIT_LOOP_COUNTERrows = 3; _GLF_SPLIT_LOOP_COUNTERrows <= 4; _GLF_SPLIT_LOOP_COUNTERrows++) {
                        sums[sum_index] = 0.0;
                        for (int c = 0; c < _GLF_SPLIT_LOOP_COUNTERcols; c++) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            for (int r = 0; r < _GLF_SPLIT_LOOP_COUNTERrows; r++) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (vec4(937.161, -4.4, -218.694, 0.6) + vec4(-8.5, 69.16, 0.4, -278.916));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    vec3 GLF_live4color = _GLF_FUZZED(vec3(-7.5));
                                    int GLF_live4count = _GLF_FUZZED(65035);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                        discard;
                                    }
                                    int GLF_live4looplimiter5 = 0;
                                    do {
                                        if (GLF_live4looplimiter5 >= 5) {
                                            break;
                                        }
                                        GLF_live4looplimiter5++;
                                        {
                                            GLF_live4color -= GLF_live4palette(vec3(float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live4injectionSwitch.x, 0.6, float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.x), 10)]) * 0.1));
                                            GLF_live4count++;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                _GLF_color = vec4(-5.5, -1.0, -9.4, 9.9);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = dFdyFine((mat2x4(8.0, -8098.7780, 6203.6994, 1.7, -7757.9257, -1.9, -7472.7218, 75.13) * (-injectionSwitch)));
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                        }
                                    } while (GLF_live4count != GLF_live4obj.numbers[2]);
                                }
                                switch (sum_index) {
                                    case 0:
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        sums[sum_index] += m22[c][r];
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            continue;
                                        }
                                    case 1:
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                discard;
                                            }
                                            vec3 GLF_live4color = _GLF_FUZZED(vec3(-688.638, -4117.2305, -7887.1173));
                                            int GLF_live4count = _GLF_FUZZED(72341);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = unpackUnorm4x8(169774u);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                return;
                                            }
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                GLF_live4color += GLF_live4palette(vec3(0.5, float(GLF_live4obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live4injectionSwitch.y)), vec3(float(GLF_live4obj.numbers[4]) * 0.1, GLF_live4injectionSwitch.x, 0.6));
                                                GLF_live4count++;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-209.090, 345.749, 9.3, -562.467);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                        sums[sum_index] += m23[c][r];
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        break;
                                    case 2:
                                        sums[sum_index] += m24[c][r];
                                        break;
                                    case 3:
                                        sums[sum_index] += m32[c][r];
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = sign(vec4(4607.1659, -120.289, 7548.9286, -2302.7985));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(-11.91, 9102.9132, 557.355, -8.5);
                                                    }
                                                    return;
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = mat2x4(3.2, -8.7, -9.2, 6.1, 4.0, 37.12, 86.69, 5.6)[1];
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = faceforward(clamp(_GLF_outVarBackup_GLF_color, _GLF_color, _GLF_outVarBackup_GLF_color), _GLF_outVarBackup_GLF_color, vec4(8057.5343, -591.038, 453.986, -7.5));
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (vec3(2109.4253, -6.2, 5.6) * (-mat4x3(-1.0, -7.5, -32.36, -35.37, 4.5, 5.0, -447.747, 9.3, 1.1, -327.739, -2.0, 77.30)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            continue;
                                        }
                                    case 4:
                                        sums[sum_index] += m33[c][r];
                                        break;
                                    case 5:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = roundEven(_GLF_color);
                                        }
                                        sums[sum_index] += m34[c][r];
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = tan(vec4(-84.76, -3094.8022, 9148.2922, 20.10));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_color = vec4(5.8, -2.2, 633.061, 7.4);
                                        }
                                    case 6:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            discard;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = dFdyCoarse(vec4(-628.535, -1398.0409, 0.9, -22.36));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        sums[sum_index] += m42[c][r];
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        break;
                                    case 7:
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(438.162, 4.3, 1925.4850, 7.1);
                                        }
                                        sums[sum_index] += m43[c][r];
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    discard;
                                                }
                                            } else {
                                                ;
                                            }
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-37.06, -1565.5138, 8.0, -4.6);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                {
                                                    ;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = normalize(vec4(4755.5402, -89.89, 2.6, 78.41));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                                _GLF_color = inversesqrt(vec4(695.380, 2.8, 0.4, 9.8));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            discard;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = acos(atan(vec4(-2.9, -8.4, -4.2, -5.1)));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                    case 8:
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = floor(_GLF_color);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(2145.0108, 6.4, -2.1, -8.4);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = sign(vec4(-10.13, 710.138, 745.461, 995.937));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            float donor_replacementGLF_dead2grey = _GLF_FUZZED(77.48);
                                            {
                                                donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[8]) / 10.0;
                                            }
                                        }
                                        sums[sum_index] += m44[c][r];
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        break;
                                }
                            }
                        }
                        sums[sum_index] /= 16.0;
                        sum_index++;
                    }
                }
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(6.7, 39.07, -8.0, -59.38);
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        for (int _GLF_SPLIT_LOOP_COUNTERcols = 3; _GLF_SPLIT_LOOP_COUNTERcols <= 4; _GLF_SPLIT_LOOP_COUNTERcols++) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    for (int _GLF_SPLIT_LOOP_COUNTERrows = 2; _GLF_SPLIT_LOOP_COUNTERrows < 3; _GLF_SPLIT_LOOP_COUNTERrows++) {
                        sums[sum_index] = 0.0;
                        for (int c = 0; c < _GLF_SPLIT_LOOP_COUNTERcols; c++) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            for (int r = 0; r < _GLF_SPLIT_LOOP_COUNTERrows; r++) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (vec4(937.161, -4.4, -218.694, 0.6) + vec4(-8.5, 69.16, 0.4, -278.916));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    vec3 GLF_live4color = _GLF_FUZZED(vec3(-7.5));
                                    int GLF_live4count = _GLF_FUZZED(65035);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                        discard;
                                    }
                                    int GLF_live4looplimiter5 = 0;
                                    do {
                                        if (GLF_live4looplimiter5 >= 5) {
                                            break;
                                        }
                                        GLF_live4looplimiter5++;
                                        {
                                            GLF_live4color -= GLF_live4palette(vec3(float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live4injectionSwitch.x, 0.6, float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.x), 10)]) * 0.1));
                                            GLF_live4count++;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                _GLF_color = vec4(-5.5, -1.0, -9.4, 9.9);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = dFdyFine((mat2x4(8.0, -8098.7780, 6203.6994, 1.7, -7757.9257, -1.9, -7472.7218, 75.13) * (-injectionSwitch)));
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                        }
                                    } while (GLF_live4count != GLF_live4obj.numbers[2]);
                                }
                                switch (sum_index) {
                                    case 0:
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        sums[sum_index] += m22[c][r];
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            continue;
                                        }
                                    case 1:
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                discard;
                                            }
                                            vec3 GLF_live4color = _GLF_FUZZED(vec3(-688.638, -4117.2305, -7887.1173));
                                            int GLF_live4count = _GLF_FUZZED(72341);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = unpackUnorm4x8(169774u);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                return;
                                            }
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                GLF_live4color += GLF_live4palette(vec3(0.5, float(GLF_live4obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live4injectionSwitch.y)), vec3(float(GLF_live4obj.numbers[4]) * 0.1, GLF_live4injectionSwitch.x, 0.6));
                                                GLF_live4count++;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-209.090, 345.749, 9.3, -562.467);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                        sums[sum_index] += m23[c][r];
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        break;
                                    case 2:
                                        sums[sum_index] += m24[c][r];
                                        break;
                                    case 3:
                                        sums[sum_index] += m32[c][r];
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = sign(vec4(4607.1659, -120.289, 7548.9286, -2302.7985));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(-11.91, 9102.9132, 557.355, -8.5);
                                                    }
                                                    return;
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = mat2x4(3.2, -8.7, -9.2, 6.1, 4.0, 37.12, 86.69, 5.6)[1];
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = faceforward(clamp(_GLF_outVarBackup_GLF_color, _GLF_color, _GLF_outVarBackup_GLF_color), _GLF_outVarBackup_GLF_color, vec4(8057.5343, -591.038, 453.986, -7.5));
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (vec3(2109.4253, -6.2, 5.6) * (-mat4x3(-1.0, -7.5, -32.36, -35.37, 4.5, 5.0, -447.747, 9.3, 1.1, -327.739, -2.0, 77.30)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            continue;
                                        }
                                    case 4:
                                        sums[sum_index] += m33[c][r];
                                        break;
                                    case 5:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = roundEven(_GLF_color);
                                        }
                                        sums[sum_index] += m34[c][r];
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = tan(vec4(-84.76, -3094.8022, 9148.2922, 20.10));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_color = vec4(5.8, -2.2, 633.061, 7.4);
                                        }
                                    case 6:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            discard;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = dFdyCoarse(vec4(-628.535, -1398.0409, 0.9, -22.36));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        sums[sum_index] += m42[c][r];
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        break;
                                    case 7:
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(438.162, 4.3, 1925.4850, 7.1);
                                        }
                                        sums[sum_index] += m43[c][r];
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    discard;
                                                }
                                            } else {
                                                ;
                                            }
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-37.06, -1565.5138, 8.0, -4.6);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                {
                                                    ;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = normalize(vec4(4755.5402, -89.89, 2.6, 78.41));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                                _GLF_color = inversesqrt(vec4(695.380, 2.8, 0.4, 9.8));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            discard;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = acos(atan(vec4(-2.9, -8.4, -4.2, -5.1)));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                    case 8:
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = floor(_GLF_color);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(2145.0108, 6.4, -2.1, -8.4);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = sign(vec4(-10.13, 710.138, 745.461, 995.937));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            float donor_replacementGLF_dead2grey = _GLF_FUZZED(77.48);
                                            {
                                                donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[8]) / 10.0;
                                            }
                                        }
                                        sums[sum_index] += m44[c][r];
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        break;
                                }
                            }
                        }
                        sums[sum_index] /= 16.0;
                        sum_index++;
                    }
                    for (int _GLF_SPLIT_LOOP_COUNTERrows = 3; _GLF_SPLIT_LOOP_COUNTERrows <= 4; _GLF_SPLIT_LOOP_COUNTERrows++) {
                        sums[sum_index] = 0.0;
                        for (int c = 0; c < _GLF_SPLIT_LOOP_COUNTERcols; c++) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            for (int r = 0; r < _GLF_SPLIT_LOOP_COUNTERrows; r++) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (vec4(937.161, -4.4, -218.694, 0.6) + vec4(-8.5, 69.16, 0.4, -278.916));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    vec3 GLF_live4color = _GLF_FUZZED(vec3(-7.5));
                                    int GLF_live4count = _GLF_FUZZED(65035);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                        discard;
                                    }
                                    int GLF_live4looplimiter5 = 0;
                                    do {
                                        if (GLF_live4looplimiter5 >= 5) {
                                            break;
                                        }
                                        GLF_live4looplimiter5++;
                                        {
                                            GLF_live4color -= GLF_live4palette(vec3(float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live4injectionSwitch.x, 0.6, float(GLF_live4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live4injectionSwitch.x), 10)]) * 0.1));
                                            GLF_live4count++;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                _GLF_color = vec4(-5.5, -1.0, -9.4, 9.9);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = dFdyFine((mat2x4(8.0, -8098.7780, 6203.6994, 1.7, -7757.9257, -1.9, -7472.7218, 75.13) * (-injectionSwitch)));
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                        }
                                    } while (GLF_live4count != GLF_live4obj.numbers[2]);
                                }
                                switch (sum_index) {
                                    case 0:
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        sums[sum_index] += m22[c][r];
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            continue;
                                        }
                                    case 1:
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                discard;
                                            }
                                            vec3 GLF_live4color = _GLF_FUZZED(vec3(-688.638, -4117.2305, -7887.1173));
                                            int GLF_live4count = _GLF_FUZZED(72341);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = unpackUnorm4x8(169774u);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                return;
                                            }
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                GLF_live4color += GLF_live4palette(vec3(0.5, float(GLF_live4obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live4injectionSwitch.y)), vec3(float(GLF_live4obj.numbers[4]) * 0.1, GLF_live4injectionSwitch.x, 0.6));
                                                GLF_live4count++;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-209.090, 345.749, 9.3, -562.467);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                        sums[sum_index] += m23[c][r];
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        break;
                                    case 2:
                                        sums[sum_index] += m24[c][r];
                                        break;
                                    case 3:
                                        sums[sum_index] += m32[c][r];
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = sign(vec4(4607.1659, -120.289, 7548.9286, -2302.7985));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(-11.91, 9102.9132, 557.355, -8.5);
                                                    }
                                                    return;
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = mat2x4(3.2, -8.7, -9.2, 6.1, 4.0, 37.12, 86.69, 5.6)[1];
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = faceforward(clamp(_GLF_outVarBackup_GLF_color, _GLF_color, _GLF_outVarBackup_GLF_color), _GLF_outVarBackup_GLF_color, vec4(8057.5343, -591.038, 453.986, -7.5));
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (vec3(2109.4253, -6.2, 5.6) * (-mat4x3(-1.0, -7.5, -32.36, -35.37, 4.5, 5.0, -447.747, 9.3, 1.1, -327.739, -2.0, 77.30)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            continue;
                                        }
                                    case 4:
                                        sums[sum_index] += m33[c][r];
                                        break;
                                    case 5:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = roundEven(_GLF_color);
                                        }
                                        sums[sum_index] += m34[c][r];
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = tan(vec4(-84.76, -3094.8022, 9148.2922, 20.10));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_color = vec4(5.8, -2.2, 633.061, 7.4);
                                        }
                                    case 6:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            discard;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = dFdyCoarse(vec4(-628.535, -1398.0409, 0.9, -22.36));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        sums[sum_index] += m42[c][r];
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        break;
                                    case 7:
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(438.162, 4.3, 1925.4850, 7.1);
                                        }
                                        sums[sum_index] += m43[c][r];
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    discard;
                                                }
                                            } else {
                                                ;
                                            }
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-37.06, -1565.5138, 8.0, -4.6);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                {
                                                    ;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = normalize(vec4(4755.5402, -89.89, 2.6, 78.41));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                                _GLF_color = inversesqrt(vec4(695.380, 2.8, 0.4, 9.8));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            discard;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = acos(atan(vec4(-2.9, -8.4, -4.2, -5.1)));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                    case 8:
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = floor(_GLF_color);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(2145.0108, 6.4, -2.1, -8.4);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = sign(vec4(-10.13, 710.138, 745.461, 995.937));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            float donor_replacementGLF_dead2grey = _GLF_FUZZED(77.48);
                                            {
                                                donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[8]) / 10.0;
                                            }
                                        }
                                        sums[sum_index] += m44[c][r];
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        break;
                                }
                            }
                        }
                        sums[sum_index] /= 16.0;
                        sum_index++;
                    }
                }
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(6.7, 39.07, -8.0, -59.38);
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    int region_x = int(gl_FragCoord.x / (resolution.x / 3.0));
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-3.1, -7.1, -8.8, 397.428);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-3.1, -2.0, 77.80, 40.91);
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = asinh(vec4(-354.479, 3532.3305, -1294.1376, -17.99));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                _GLF_color = unpackUnorm4x8(33916u);
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(415.595, 8566.8225, 4.8, -49.13);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            _GLF_color = m34[1];
        }
        _GLF_color = vec4(-12.29, -68.24, 776.074, 9.2);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = (_GLF_color / _GLF_outVarBackup_GLF_color);
        }
    }
    int region_y = int(gl_FragCoord.y / (resolution.x / 3.0));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))), !(!(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0)))))))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            _GLF_color = vec4(386.250, -99.69, 311.563, 880.005);
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = clamp(vec4(-5586.0401, 17.00, -9.8, 705.961), trunc(vec4(-4.4, 895.904, 2090.6041, -3198.9909)), vec4(7833.9320, 68.33, -98.52, 2.5));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
        return;
    }
    int overall_region = region_y * 3 + region_x;
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = (m44 * _GLF_color);
        }
        if (overall_region > 0 && overall_region < 9) {
            _GLF_color = vec4(vec3(sums[overall_region]), 1.0);
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead1s = _GLF_FUZZED(one);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = sqrt(vec4(303.778, 876.114, 11.88, 4.6));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    donor_replacementGLF_dead1s += 0.2;
                }
                if (_GLF_DEAD(false)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = _GLF_color;
                        }
                        _GLF_color = vec4(-9177.6524, 4.8, -82.26, -5.9);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = _GLF_color;
                }
            }
        } else {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = refract(vec4(392.476, 739.476, 1.7, 6676.1841), inversesqrt(vec4(3.6, -6.6, 0.9, -747.655)), 382.303);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = vec4(vec3(0.0), 1.0);
        }
    }
}
