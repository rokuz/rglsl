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

struct _GLF_struct_2 {
    vec4 _f0;
    int i;
    uint _f1;
    bool _f2;
    mat4x3 _f3;
    bool _f4;
    mat2x4 _f5;
};

struct _GLF_struct_1 {
    uvec4 _f0;
    mat4 _f1;
    mat2 _f2;
    ivec3 _f3;
    ivec3 _f4;
    bvec2 _f5;
    _GLF_struct_2 _f6;
};

struct _GLF_struct_0 {
    _GLF_struct_1 _f0;
    float _f1;
    mat3x2 _f2;
};

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

vec4 _GLF_outlined_27(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_141(vec4 _GLF_color) {
    return (7707.6720 - _GLF_color);
}

vec4 _GLF_outlined_85() {
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_outlined_141(_GLF_color);
    }
    return vec4(337.668, -42.76, 2.3, -2.1);
}

vec4 _GLF_outlined_86(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_142() {
    return ceil(clamp(vec4(-7.8, 4225.8857, -43.97, -5.3), -4.7, -8.1));
}

vec4 _GLF_outlined_5() {
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        _GLF_color = _GLF_color;
    }
    return vec4(1.9, 49.93, -3997.9354, -8603.5844);
    {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = acosh(vec4(71.77, 0.8, 58.72, -9.5));
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = (_GLF_color - clamp(mix(vec4(-379.639, 6677.1029, -0.3, 87.83), _GLF_color, 66.23), vec4(-68.92, -94.38, -783.150, -54.59), vec4(4.3, 1.7, -890.146, 3045.9037)));
            }
            _GLF_color = _GLF_color;
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_outlined_27(_GLF_color);
        if (_GLF_DEAD(false)) {
            _GLF_color = asin(_GLF_outVarBackup_GLF_color);
        }
        _GLF_color = _GLF_outlined_142();
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = _GLF_outlined_85();
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outlined_86(_GLF_outVarBackup_GLF_color);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}

vec4 _GLF_outlined_28() {
    return (dFdy(vec4(8346.0693, 7938.7815, 2.6, -8946.8523)) - determinant(mat2(-548.614, -41.30, -897.970, 701.674)));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = atan(vec4(-29.50, 7.1, -7942.7576, -7.0), reflect(vec4(-204.045, -4.0, -4.4, 321.435), vec4(54.85, -93.67, 8064.9022, -663.278)));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}

vec4 _GLF_outlined_49() {
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(5.5, 7.6, -249.617, 8.2);
    }
    return vec4(-53.60, 0.1, 1325.8380, 350.624);
}

vec4 _GLF_outlined_50(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_51(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_87(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_88(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_89(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_90(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_91(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_143(vec4 _GLF_color) {
    return ((7.1 - 7649.0446) * _GLF_color);
}

vec4 _GLF_outlined_144(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_145() {
    return (float(false) - vec4(0.1, 3.7, -7905.3590, 1.7));
}

vec4 _GLF_outlined_146() {
    return atanh(vec4(2612.7241, -38.01, 8928.7975, -4934.4990));
}

vec2 brick(vec2 uv) {
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_outlined_87(_GLF_color);
            _GLF_color = _GLF_outlined_49();
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = _GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(0.1, -2715.0450, 886.609, -6.5).rrba;
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outlined_88(_GLF_outVarBackup_GLF_color);
                }
            }
        }
        _GLF_color = vec4(960.316, 346.231, -918.268, 75.56);
        if (_GLF_DEAD(false)) {
            _GLF_color = smoothstep(9.7, dFdy(-184.142), roundEven(_GLF_color));
        }
    }
    int a = 4;
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_outlined_89(_GLF_color);
    }
    do {
        if (_GLF_DEAD(false)) {
            _GLF_color = floor(vec4(6.9, -8.0, -1.1, -2.8));
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (mat4(-8903.5836, -6975.6351, 2086.4580, -0.0, 0.0, -6512.8299, 5.7, 7.0, -495.352, 85.12, -41.69, 4.9, 9998.2393, -50.00, 20.93, -4.4) * fwidthCoarse(vec4(79.04, -8.6, -529.699, 5143.7041)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        uv.y -= step(injectionSwitch.y, uv.x);
        uv.x -= tanh(uv.x * 0.25) / ldexp(injectionSwitch.y, findMSB(a));
        a--;
    } while (a > int(injectionSwitch.x));
    int b = 3;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = _GLF_outlined_5();
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = sin(atan(sqrt(vec4(7.2, 9907.5111, -0.0, 9.3))));
        }
    }
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a);
        uv.x *= (isnan(uv.y) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x));
        b--;
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-5.1, 1.3, 4682.4795, -792.348);
        }
    } while (b > int(injectionSwitch.x));
    int c = 2;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = _GLF_outlined_143(_GLF_color);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = dFdx(_GLF_outVarBackup_GLF_color);
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_outlined_144(_GLF_color);
            _GLF_color = atan(vec4(6742.4226, -5.0, -74.92, -2738.3784));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_color = _GLF_outlined_28();
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outlined_50(_GLF_outVarBackup_GLF_color);
        }
    }
    do {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = _GLF_outlined_145();
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outlined_90(_GLF_outVarBackup_GLF_color);
            }
        }
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b);
        uv.x += ldexp(injectionSwitch.y, isinf(uv.y + uv.x) ? findMSB(b) : findMSB(a));
        c--;
    } while (c > int(injectionSwitch.x));
    int d = 1;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_outlined_51(_GLF_color);
        _GLF_color = vec4(vec3(1.1, 76.72, -6454.6056), 641.059);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outlined_91(_GLF_outVarBackup_GLF_color);
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, false, true, false))))) {
            _GLF_color = vec4(6230.1912, 3100.5927, -1487.2785, -42.14);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = _GLF_outlined_146();
    }
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b) + float(c);
        d--;
    } while (d > int(injectionSwitch.x));
    return fract(uv);
}

vec4 _GLF_outlined_6(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_16(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_29(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_30(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_147() {
    return vec4(-83.79, -81.83, -6.0, -7598.2847);
}

vec4 _GLF_outlined_31() {
    return dFdyFine(vec4(4345.0581, 9.5, -273.449, 6040.0160));
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_outlined_147();
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = clamp(vec4(64.66, 585.229, -5841.7121, -21.94), _GLF_color, _GLF_color);
        }
    }
}

vec4 _GLF_outlined_32() {
    return uintBitsToFloat(uvec4(16492u, 55371u, 58061u, 45856u));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = _GLF_color;
    }
}

vec4 _GLF_outlined_92(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_33() {
    return abs(vec4(3715.1559, 4.8, -5.5, 8368.8451));
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_outlined_92(_GLF_color);
    }
}

vec4 _GLF_outlined_52() {
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = ((vec3(-6131.1332, -26.36, 8.9)) * mat4x3(615.868, -679.028, 9546.0272, 0.0, 0.5, -9.0, 6.8, 9.1, -201.057, 7132.9146, 6881.6203, 12.08));
    }
    return asinh(vec2(-0.5, -92.12)).grgg;
}

vec4 _GLF_outlined_53(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_54(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_55(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_93() {
    return vec4(8.4, -7.3, 9.3, 736.209);
}

vec4 _GLF_outlined_94(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = (vec4(-397.829, 4275.7222, -33.03, 3317.9759) + vec4(6.9, -5.8, -260.854, 94.38));
    }
}

vec4 _GLF_outlined_95(vec2 st) {
    return vec4(vec2(-49.96, -596.786), st);
}

vec4 _GLF_outlined_96() {
    return vec4(-4938.7705, 1.5, 5.4, -465.678);
}

vec4 _GLF_outlined_97(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_98() {
    return radians(vec4(97.41, -59.45, 979.516, -2.6));
}

vec4 _GLF_outlined_99() {
    return sin(vec4(-313.665, -4.1, -733.871, -41.87));
}

vec4 _GLF_outlined_100(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_148(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_149(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_150(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_151(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_152() {
    return vec4(-10.51, 10.60, 5.7, 49.40);
}

vec4 _GLF_outlined_153(vec4 _GLF_color) {
    return mix(_GLF_color, _GLF_color, vec4(-8.2, -117.877, 338.717, 4424.2119));
}

vec4 _GLF_outlined_154() {
    return vec4(8053.2516, 46.25, -709.445, -86.32);
}

vec4 _GLF_outlined_155(vec4 _GLF_color) {
    return _GLF_color.qstp;
}

float patternize(vec2 uv) {
    vec2 size = vec2(0.45);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (vec4(274.022, 9.3, -63.08, -507.678) / (-881.841));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = smoothstep(43.73, 608.239, _GLF_outVarBackup_GLF_color);
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    vec2 st = step(size, uv);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = _GLF_outlined_93();
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    switch (int(mod(gl_FragCoord.y, 5.0))) {
        case 0:
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            return mix(pow(st.x, injectionSwitch.y), st.x, size.y);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, sqrt(0.0), 0.0, 0.0, 0.0, 1.0, 0.0)))))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(575.518);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = vec4(-73.48, 224.680, -8353.4188, -2.0);
                    }
                    _GLF_color = (-_GLF_color);
                }
                _GLF_outVarBackup_GLF_color = _GLF_outlined_148(_GLF_color);
                _GLF_color = _GLF_outlined_52();
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outlined_53(_GLF_outVarBackup_GLF_color);
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outlined_94(_GLF_outVarBackup_GLF_color);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = ceil(_GLF_color);
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outlined_149(_GLF_outVarBackup_GLF_color);
                    }
                }
            }
            break;
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = (_GLF_color * (-9561.0698));
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(4535.5272, -11.19, 468.504, 8.3);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = vec4(3.8, 757.148, -71.33, -2.5);
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (-cosh(min(vec4(1540.8833, 87.37, -5627.0824, -6.3), -706.472)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_outlined_6(_GLF_color);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = vec4(0.4);
                }
            }
        case 1:
            return mix(pow(uv.y, injectionSwitch.y), st.y, size.x);
            break;
        case 2:
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = _GLF_outlined_95(st);
            }
            discard;
            break;
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_outlined_29(_GLF_color);
            }
        case 3:
            if (_GLF_DEAD(false)) {
                _GLF_color = reflect(round(vec3(2.3, 51.79, -23.97)), vec3(-5.1, 3.4, -3577.1692)).yyxx;
                if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                    _GLF_color = vec4(455.629, -1449.8662, size);
                }
            }
            return mix(pow(uv.y, injectionSwitch.y), uv.y, size.y);
            if (_GLF_DEAD(false)) {
                _GLF_color = mix(vec4(-5674.4787, -688.766, -4.8, -1438.6625), vec4(0.2, -1874.4433, -1979.1749, 0.1), determinant(mat4(-9.3, -419.367, -1720.8456, 2049.8165, -4500.2171, -9.8, 0.8, 0.8, -49.48, -70.16, -0.0, 3.7, 9.9, 6.7, -4915.6498, -6198.2399)));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = fwidthFine(_GLF_color);
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_30(_GLF_color);
                    _GLF_color = _GLF_outlined_96();
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = _GLF_outlined_31();
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = _GLF_outlined_32();
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = dFdyFine(_GLF_outVarBackup_GLF_color);
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(-6.3, -0.8, 83.23, 3376.4670);
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-366.372, 1.7, -6.9, 8.6);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = vec4(-3.1, -0.2, -288.109, -5559.2713);
                                        }
                                        _GLF_color = _GLF_outlined_150(_GLF_outVarBackup_GLF_color);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = vec4(-74.16, 33.67, -861.714, -6870.0683);
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_outlined_151(_GLF_color);
                                            _GLF_color = vec4(0.1, 5.5, 932.553, -2.3);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                                _GLF_color = tan(_GLF_color);
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-11.21, -4.0, -324.969, -6.9);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = sign(_GLF_outVarBackup_GLF_color);
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(1.0, 1.0, 0.0, 1.0)), _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(1.0, 1.0, 0.0, 1.0)), (true ? dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(1.0, 1.0, 0.0, 1.0)) : _GLF_FUZZED(283.072)))))))) {
                            _GLF_color = _GLF_outlined_54(_GLF_outVarBackup_GLF_color);
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = sqrt(_GLF_color);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_outlined_97(_GLF_color);
                            _GLF_color = _GLF_outlined_98();
                            if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec2(false, true)), bool(bvec3(bool(bvec2(false, true)), false, true)))))) {
                                _GLF_color = vec4(0.3, -87.56, -67.52, 0.7);
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(vec2(0.0, 0.0)))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = intBitsToFloat(ivec3(53258, -77013, 73015)).gbrb;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outlined_55(_GLF_outVarBackup_GLF_color);
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(41.75, 613.467, 6572.4187, 1.3);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = log(vec4(372.313, -325.002, 4922.3373, -9.5));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_outlined_16(_GLF_color);
                            _GLF_color = _GLF_outlined_152();
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(0.5, 1.7, -67.61, 2.5);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_33();
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-6.0, -77.55, 4.3, 1.9);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outlined_153(_GLF_color);
                }
                _GLF_color = _GLF_outlined_99();
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))) && true))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outlined_154();
                    }
                }
            }
            break;
        case 4:
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outlined_155(_GLF_color);
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = refract(vec4(-511.466, 620.636, -3.6, -5.0), vec4(6.7, 287.238, -445.343, -101.996), -2.7);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outlined_100(_GLF_outVarBackup_GLF_color);
                }
            }
            return mix(pow(st.y, injectionSwitch.y), st.x, size.x);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = vec4(1019.0374, -967.454, -179.055, 560.450);
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(79.30, -4681.4846, 5954.2860, -5.3);
                }
            }
            break;
    }
}

vec4 _GLF_outlined_56() {
    return vec4(-5.7, -4524.1873, -4.0, -96.66);
}

vec4 _GLF_outlined_57(vec4 _GLF_outVarBackup_GLF_color) {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = pow((_GLF_outVarBackup_GLF_color * floor(vec4(0.2, -64.49, 1489.2908, -1.1))), min(vec4(7.3, 7.5, -38.63, 2.1), 2.6));
        }
        _GLF_color = vec4(7168.1585, 57.45, -48.08, 461.323);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), true && (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_156(vec4 _GLF_color) {
    return _GLF_color;
}

int _GLF_outlined_0(int m) {
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_outlined_56();
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_outlined_156(_GLF_color);
        _GLF_color = intBitsToFloat(ivec4(-8849, 36973, 33853, 97532));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outlined_57(_GLF_outVarBackup_GLF_color);
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(3.6);
            }
        }
    }
    return m - 1;
}

vec4 _GLF_outlined_7(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_157() {
    return refract(vec4(-6666.3400, 6.7, -3.9, -250.746), vec4(5.7, -257.162, 8.3, 8.5), -872.836);
}

vec4 _GLF_outlined_34() {
    return mod(vec4(-63.97, 9.0, -6724.9008, 74.86), -6711.6960);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))))) {
        _GLF_color = vec4(-7.3, 7.6, -969.853, -59.83);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = _GLF_outlined_157();
        }
    }
}

vec4 _GLF_outlined_35() {
    return (ldexp(vec4(-5.2, -96.43, 423.381, -78.52), ivec4(80979, -21474, -15062, -61540)) * (-1550.3229));
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-514.495, 3.4, -824.629, -751.639);
        }
        _GLF_color = reflect(vec4(-1753.8393, 14.40, 1537.4353, 5.8), vec4(-1.6, -1.7, 3894.5742, -4.2));
    }
}

vec4 _GLF_outlined_58(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_101() {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        _GLF_color = _GLF_color;
    }
    return (mat4(7.7, 9.2, -8733.4919, 25.92, -1579.1337, -7.7, -1.2, 6562.8118, 9592.3915, -7.4, -4963.3510, 537.521, -4838.9299, 6.4, -6.4, -49.93) * cosh(vec4(-42.13, -3473.3032, -5322.5288, 6.2)));
}

vec4 _GLF_outlined_158(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_8(vec4 _GLF_outVarBackup_GLF_color) {
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(343.669, -1924.9938, 8362.4301, 912.419);
    }
    {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_outlined_158(_GLF_outVarBackup_GLF_color);
        }
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_outlined_101();
        }
        _GLF_outVarBackup_GLF_color = _GLF_outlined_58(_GLF_color);
        _GLF_color = _GLF_outlined_34();
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-0.8, -9318.9925, -6.7, 1278.0387);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = intBitsToFloat((ivec4(-71827, 98206, -29680, 81364) >> ivec4(83442, -89588, 19006, 65566)));
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    return _GLF_outVarBackup_GLF_color;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = _GLF_outlined_35();
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_outVarBackup_GLF_color;
    }
}

vec4 _GLF_outlined_17(vec4 _GLF_color) {
    return _GLF_color;
}

int _GLF_outlined_18(int m) {
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = exp2(_GLF_color);
        }
        _GLF_color = (vec4(6782.0080, -702.784, -9.8, -7.1) + (-82.45));
    }
    return m + 1;
}

vec4 _GLF_outlined_59() {
    return vec4(-4.5, 6.0, -2.4, 5.3);
}

vec4 _GLF_outlined_159(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_160(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_36(vec4 _GLF_outVarBackup_GLF_color) {
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(-654.050, -9.9, 4921.9220, 5.5);
    }
    return _GLF_outVarBackup_GLF_color;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = _GLF_outlined_59();
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = asinh(_GLF_outVarBackup_GLF_color);
            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(_GLF_IDENTITY(false, bool(bool(false))), true, true, false))))) {
                _GLF_color = _GLF_outlined_159(_GLF_outVarBackup_GLF_color);
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outlined_160(_GLF_outVarBackup_GLF_color);
        }
    }
}

vec4 _GLF_outlined_161(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_37(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
        _GLF_color = _GLF_outlined_161(_GLF_outVarBackup_GLF_color);
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(6.8, 81.53, -4.4, 530.499);
    }
}

vec4 _GLF_outlined_60(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_61() {
    return vec4(98.55, 88.10, 7.4, -4751.8773);
}

vec4 _GLF_outlined_62(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_102() {
    return dFdyFine((1.9 - vec4(11.64, -3.5, 564.012, -3461.2278)));
}

vec4 _GLF_outlined_103() {
    return dFdyCoarse(vec4(-8.3, 9.7, 561.878, 30.70));
}

vec4 _GLF_outlined_104(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_105() {
    return vec4(-3.0, 68.28, 515.747, -7.2);
}

vec4 _GLF_outlined_106(vec4 _GLF_color) {
    return step(vec4(0.1, 59.46, -9641.9508, 8.8), _GLF_color);
}

vec4 _GLF_outlined_107(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_162(vec4 _GLF_outVarBackup_GLF_color, vec4 _GLF_color) {
    return faceforward(atan(_GLF_outVarBackup_GLF_color), _GLF_outVarBackup_GLF_color, _GLF_color);
}

vec4 _GLF_outlined_163(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_164() {
    return vec4(-8658.9789, -3.1, 5235.0613, 9894.1852);
}

int binarySearch(BinarySearchObject obj, int x) {
    int l = 0, r = 9;
    while (l <= r) {
        int m = (l + r) / 2;
        if (obj.prime_numbers[m] == x) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_60(_GLF_color);
                _GLF_color = _GLF_outlined_61();
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outlined_36(_GLF_outVarBackup_GLF_color);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(length(0.0)))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_17(_GLF_color);
                    _GLF_color = _GLF_outlined_102();
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(1.1, -4.8, 0.4, -3.7);
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_7(_GLF_color);
                _GLF_color = _GLF_outlined_103();
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = mat3x4(-1.5, 37.01, 9301.3408, -370.886, -8909.6432, 4.5, 814.357, -2.8, 900.856, 840.597, -4113.2384, -1996.3360)[1];
                    }
                    _GLF_color = _GLF_outlined_8(_GLF_outVarBackup_GLF_color);
                }
            }
            return m;
        }
        if (_GLF_DEAD(false)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_104(_GLF_color);
                    _GLF_color = dFdyFine(vec4(-240.323, 3.0, -5.6, -3807.9004));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_outlined_62(_GLF_color);
                if (_GLF_DEAD(false)) {
                    _GLF_color = abs(vec4(256.934, 1763.2348, 150.162, 4955.2490));
                }
                _GLF_color = vec4(-7.1, -6093.8485, -4.9, 3.2);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = _GLF_outlined_162(_GLF_outVarBackup_GLF_color, _GLF_color);
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outlined_37(_GLF_outVarBackup_GLF_color);
                }
            }
            _GLF_color = _GLF_outlined_105();
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_outlined_106(_GLF_color);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = smoothstep(_GLF_color, _GLF_color, vec4(728.571, 29.43, 2.0, 13.94));
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = vec4(-14.77, 2.0, 4809.5026, 77.34);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(4226.6966, -6.2, 2112.5595, 65.26);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outlined_107(_GLF_outVarBackup_GLF_color);
                }
            }
        }
        if (obj.prime_numbers[m] < x) {
            l = _GLF_outlined_18(m);
        } else {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_163(_GLF_color);
                _GLF_color = normalize(vec4(-494.129, -6.8, -657.217, -2680.4516));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            r = _GLF_outlined_0(m);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_outlined_164();
        }
        _GLF_color = vec4(-2.3, 6.0, -5.7, 9457.6108);
    }
    return -1;
}

vec4 _GLF_outlined_9(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_19(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_108(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_1(vec3 color, vec2 injectionSwitch) {
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-13.36, 0.4, 34.28, -7466.6883);
            }
            _GLF_color = (step(injectionSwitch, injectionSwitch) * mat4x2(22.25, 1.2, 2123.8852, -9.1, -2.5, 2.9, -6715.9601, -18.51));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = (vec4(585.430, -3.3, 8.7, -1516.1819) - _GLF_color);
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec2(-9183.7712, 8.2).tsst;
        }
        _GLF_color = _GLF_outlined_9(_GLF_color);
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = _GLF_outlined_108(_GLF_color);
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_outlined_19(_GLF_color);
        _GLF_color = sign(vec4(4.3, -21.12, 7775.2119, -5687.4063));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    return vec4(color, injectionSwitch.y);
}

vec4 _GLF_outlined_2() {
    return vec4(-1879.2244, -486.871, -2.0, 57.32);
}

vec4 _GLF_outlined_3() {
    return vec4(7.5, -1.6, 3.7, -64.39);
}

vec4 _GLF_outlined_38(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_39(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_63(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_64(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_65() {
    return step(max(2533.8884, -5.4), vec4(924.713, -71.05, 9281.0911, -6.4));
}

vec4 _GLF_outlined_165(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_166() {
    return vec4(-673.332, 2.9, 2.7, 7742.7819);
}

vec4 _GLF_outlined_167(vec4 _GLF_outVarBackup_GLF_color, vec4 _GLF_color) {
    return clamp(radians(_GLF_outVarBackup_GLF_color), _GLF_color, _GLF_color);
}

vec4 _GLF_outlined_4(vec4 _GLF_outVarBackup_GLF_color) {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_outlined_38(_GLF_color);
        _GLF_color = sinh(vec4(-8.5, -1.3, 642.519, -2.3));
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_outlined_165(_GLF_outVarBackup_GLF_color);
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = (roundEven(_GLF_color) / (-9149.0178));
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = _GLF_outlined_63(_GLF_outVarBackup_GLF_color);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_outlined_39(_GLF_color);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = ((-50.37) / _GLF_outVarBackup_GLF_color);
            }
            _GLF_color = tan(vec4(-8085.7351, -3.3, 6.7, 8286.6466));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    return _GLF_outVarBackup_GLF_color;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = fract(_GLF_color);
        }
        _GLF_color = vec4(8879.2832, -61.52, -7852.4519, 8002.7120);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_outlined_64(_GLF_color);
        _GLF_color = _GLF_outlined_65();
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = fma(faceforward((_GLF_outVarBackup_GLF_color * (-4659.3078)), _GLF_color, _GLF_color), _GLF_outVarBackup_GLF_color, intBitsToFloat(ivec4(-60389, -30244, 67984, 48934)));
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_outlined_166();
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outlined_167(_GLF_outVarBackup_GLF_color, _GLF_color);
                }
            }
        }
    }
}

vec4 _GLF_outlined_10(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_11(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_12(vec4 _GLF_color) {
    return min(_GLF_color, vec4(-29.28, -3207.7242, -1.6, 6137.0123));
}

vec4 _GLF_outlined_13() {
    return vec4(-613.055, 8.9, -1563.5848, -4576.2811);
}

vec4 _GLF_outlined_14(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_15(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_109() {
    return vec4(-372.235, 157.919, 565.687, -6032.5144);
}

vec4 _GLF_outlined_168(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_20() {
    return (vec4(8802.2431, -4331.9678, -5.2, 4.5) - 3554.1388);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = _GLF_outlined_109();
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outlined_168(_GLF_outVarBackup_GLF_color);
        }
    }
}

vec4 _GLF_outlined_21(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_22() {
    if (_GLF_DEAD(false)) {
        _GLF_color = tanh(_GLF_color);
    }
    return vec4(24.40, 8.3, 1.3, -256.849);
    if (_GLF_DEAD(false)) {
        _GLF_color = (4.1 - _GLF_color);
    }
}

vec4 _GLF_outlined_23(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_24(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_25(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_26(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        _GLF_color = _GLF_outVarBackup_GLF_color;
    }
}

vec4 _GLF_outlined_40(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_110(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_111() {
    return sqrt(vec4(-5.1, 47.53, 8295.8965, -0.1));
}

vec4 _GLF_outlined_112(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_41() {
    return ldexp((mat4(-255.400, -9634.7220, 274.199, -7.3, 901.897, 9.1, -732.668, -16.06, 1.3, 3.4, 1842.6785, -5298.3425, -79.08, -9192.6303, -0.7, 2.3) * vec4(-498.743, 99.07, 28.96, 5.9)), ivec4(8323, 1600, 86038, 87144));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_outlined_110(_GLF_color);
        _GLF_color = _GLF_outlined_111();
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outlined_112(_GLF_outVarBackup_GLF_color);
        }
    }
}

vec4 _GLF_outlined_113(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_169() {
    return vec4(-3987.3492, 2307.4674, 2.7, -5356.2913);
}

vec4 _GLF_outlined_42() {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = min((mat2x4(-55.16, -9.4, 604.579, -3.3, -5.6, 6.9, 9213.0047, -3442.8385) * vec2(7.7, 7124.5145)), _GLF_color);
            }
            _GLF_color = vec4(-2233.7172, -6.4, -5720.3868, -9.4);
        }
        _GLF_color = _GLF_outlined_169();
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    return vec4(785.615, 7551.7423, -3738.1703, 27.81);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        _GLF_outVarBackup_GLF_color = _GLF_outlined_113(_GLF_color);
        _GLF_color = exp2((vec4(-1.9, 44.51, -915.106, 7.5) - min(vec4(0.5, -81.66, 4.9, -3.1), vec4(-7.8, -958.091, -1.3, -4653.3867))));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}

vec4 _GLF_outlined_43() {
    return mod(vec4(303.486, 8077.6680, 8.5, -6.8), -400.609);
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(-56.42, 1.2, 657.020, -986.896);
    }
}

vec4 _GLF_outlined_44() {
    return vec4(vec2(192.614, 6484.5769), 0.1, -9047.6695);
}

vec4 _GLF_outlined_45(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_46(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_47(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_48(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_66() {
    return vec4(-2425.9284, -380.240, 7.1, 9626.5134);
}

vec4 _GLF_outlined_67(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_68(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_69(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_70(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_71(vec4 _GLF_outVarBackup_GLF_color) {
    return (clamp(vec4(34.18, -5454.5754, -2.1, 80.23), -8.4, 56.10) * _GLF_outVarBackup_GLF_color);
    if (_GLF_DEAD(false)) {
        _GLF_color = (mat3x4(9516.1451, 1199.4697, -3569.5583, -5.5, -67.29, 99.77, 61.55, 184.132, 48.11, -5.6, 420.662, -387.970) * exp(vec3(-441.767, 819.468, 2.6)));
    }
}

vec4 _GLF_outlined_72(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_73(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_74(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_75(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_76(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_77() {
    return dFdyFine(vec4(-0.6, 5.9, 5399.0293, 8.2));
}

vec4 _GLF_outlined_78(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_79(vec4 _GLF_color) {
    return fwidthCoarse(_GLF_color);
}

vec4 _GLF_outlined_80(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_81(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_82() {
    return (vec2(-6.1, -99.92).ttts - sinh(-57.74));
}

vec4 _GLF_outlined_83(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_84(vec4 _GLF_outVarBackup_GLF_color) {
    return acosh((6.0 + _GLF_outVarBackup_GLF_color));
}

vec4 _GLF_outlined_114() {
    return vec4(5.2, 3.8, 2.2, 15.79);
}

vec4 _GLF_outlined_115() {
    return vec4(mix(determinant(mat4(-8414.8093, -656.241, 5.2, -1668.9044, 35.51, -8.2, 8.9, 0.1, 5794.1681, -779.803, -19.08, -8.6, 6.2, 1540.9326, 4015.9700, -688.405)), float(83211u), false), -487.743, mod(vec2(-16.06, -4.5), vec2(3.1, -8.0)));
}

vec4 _GLF_outlined_116(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_117() {
    return vec4(0.1, -82.24, -2203.2177, -8.3);
}

vec4 _GLF_outlined_118(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_119(vec4 _GLF_outVarBackup_GLF_color, vec4 _GLF_color) {
    return reflect(_GLF_outVarBackup_GLF_color, (-pow(_GLF_color, _GLF_outVarBackup_GLF_color)));
}

vec4 _GLF_outlined_120() {
    return trunc(vec4(5.2, 7.6, -6909.9724, -21.11));
}

vec4 _GLF_outlined_121(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_122(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_123(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_124(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_125(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_126() {
    return vec4(-9.2);
    if (_GLF_DEAD(false)) {
        _GLF_color = dFdx(_GLF_color);
    }
}

vec4 _GLF_outlined_127(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_128(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_129() {
    return vec4(9220.1235, -51.55, 88.93, 9136.2243);
}

vec4 _GLF_outlined_130(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_131() {
    return mat3x4(36.29, -66.10, 0.4, 6.0, 9.1, 774.984, -9496.1916, 9.4, -60.13, 2056.2506, -484.380, 852.100)[0];
}

vec4 _GLF_outlined_132() {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = tanh(vec4(-34.86, 1.1, 412.272, -4581.7431));
    }
    return vec4(-5930.9206, -5.4, -15.28, 6.9);
}

vec4 _GLF_outlined_133(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_134() {
    return vec4(192.525, 31.93, 67.90, -596.439);
}

vec4 _GLF_outlined_135(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_136(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_137(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_138() {
    return vec3(19.71, 53.15, 364.909).bbrg;
}

vec4 _GLF_outlined_139(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_140(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_170() {
    return mat4((mat2(-1.0, -565.181, 81.38, 2287.7748) * mat2(9.3, 362.875, 7523.6260, -8226.2923)))[1];
}

vec4 _GLF_outlined_171() {
    return vec4(-8.8, 343.381, 688.220, 0.5);
}

vec4 _GLF_outlined_172(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_173(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_174(vec4 _GLF_outVarBackup_GLF_color, vec4 _GLF_color) {
    return step(_GLF_outVarBackup_GLF_color, _GLF_color);
}

vec4 _GLF_outlined_175(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_176() {
    return vec4(6.4, 2.5, -80.82, -0.1);
}

vec4 _GLF_outlined_177() {
    return (vec4(-0.4, -458.638, -90.19, -15.49) - vec4(-62.91, 8.6, 853.609, -7.9));
}

vec4 _GLF_outlined_178(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_179(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_180(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_181() {
    return fwidth(vec4(0.9, 2.5, -6.6, -9747.1966));
}

vec4 _GLF_outlined_182(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_183(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_184(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_185() {
    return sinh(vec4(-4.7, -24.88, 5.7, -9.0));
}

vec4 _GLF_outlined_186(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_187() {
    return vec4(45.13, 7736.6040, -21.68, -1079.7784);
}

vec4 _GLF_outlined_188(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_189(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_190() {
    return vec4(-69.24, -431.953, -304.175, 0.3);
}

vec4 _GLF_outlined_191(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_192(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_193(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_194(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_195() {
    return vec4(-5.8, 8.5, -795.330, 7.3);
}

vec4 _GLF_outlined_196(vec4 _GLF_outVarBackup_GLF_color) {
    return cosh(mod(_GLF_outVarBackup_GLF_color, floor(-8857.3676)));
}

vec4 _GLF_outlined_197(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_198(vec4 _GLF_color) {
    return _GLF_color;
}

void main() {
    if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) && (false)))) {
        _GLF_color = _GLF_color;
    }
    BinarySearchObject obj;
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(59.73, -82.55, 8.3, 258.387);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(1.0, 1.0, 0.0, 1.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(1.0, 1.0, 0.0, 1.0))))))) {
            _GLF_color = _GLF_outlined_170();
        }
        _GLF_color = _GLF_outlined_66();
    }
    for (_GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(_GLF_struct_1(uvec4(1u, 1u, 1u, 1u), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), ivec3(1, 1, 1), bvec2(true, true), _GLF_struct_2(vec4(1.0, 1.0, 1.0, 1.0), 0, 1u, true, mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), true, mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), 1.0, mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)); _GLF_struct_replacement_0._f0._f6.i < 10; _GLF_struct_replacement_0._f0._f6.i++) {
        if (_GLF_struct_replacement_0._f0._f6.i == 0) {
            obj.prime_numbers[_GLF_struct_replacement_0._f0._f6.i] = 2;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_114();
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = (mat2x4(-1.9, -4.5, 6.4, -273.604, -1.9, -3090.7523, -9.7, -7148.1521) * resolution);
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_40(_GLF_color);
                    _GLF_color = _GLF_outlined_115();
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = smoothstep(vec4(41.95, 9.4, 1691.6420, -2523.2451), _GLF_color, vec4(1256.7524, -5.5, 801.256, 28.74));
                        }
                    }
                }
                _GLF_color = mod(vec4(-1935.7543, 6.1, -950.105, 29.06), refract(vec4(2384.7628, 6.6, -3895.9858, -562.565), vec4(19.19, -4005.5831, -0.7, -8689.8120), 403.810));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outlined_67(_GLF_outVarBackup_GLF_color);
                }
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = unpackSnorm4x8(uint(distance(_GLF_color, vec4(86.34, 7.0, -648.999, -8071.5935))));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (sin(vec4(849.075, -9.8, -562.081, -46.32)));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            if (_GLF_struct_replacement_0._f0._f6.i == 1) {
                {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = asinh(_GLF_color);
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_68(_GLF_color);
                    _GLF_color = dFdx(vec4(-2.2, -4.2, 669.265, 8.8));
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, (0.0) / 1.0))))) {
                            _GLF_color = _GLF_outlined_171();
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = unpackSnorm4x8(bitfieldExtract(164514u, 56203, -26820));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = sinh(atanh(_GLF_color));
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = (vec3(26.34, 530.215, -2501.9873) * mat4x3(-0.9, -1.5, 6.3, 786.756, 6607.6672, -9.4, 8.6, 72.55, -681.476, 8.5, 96.89, 3.5));
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        _GLF_color = vec4(87.44, -781.784, -709.599, -9.8);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(9.6, 2476.5560, -122.056, -3886.7018);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0)))))) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_outlined_116(_GLF_color);
                                }
                                _GLF_color = _GLF_outlined_69(_GLF_outVarBackup_GLF_color);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outlined_172(_GLF_color);
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = smoothstep(sin(8.7), 5153.9380, clamp(_GLF_color, -7851.3162, -4.0));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_outlined_20();
                }
                obj.prime_numbers[_GLF_struct_replacement_0._f0._f6.i] = 3;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-1891.1139, -9.9, 259.424, 8717.5617);
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    _GLF_color = _GLF_outlined_10(_GLF_color);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-0.9, 9.0, 9.6, -59.77);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(80.91, 3.0, -2.6, -163.466);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec3(0.0, 0.0, 0.0)))))) {
                                _GLF_color = _GLF_color;
                            }
                            _GLF_color = _GLF_outlined_21(_GLF_outVarBackup_GLF_color);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (+_GLF_color);
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = abs((+_GLF_color));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = vec4(0.1, -8071.7455, -20.11, 5.5);
                                }
                            }
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (_GLF_color / (-33.10));
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = pow(vec4(-654.250, 807.230, 466.861, -124.942), _GLF_color);
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = _GLF_outlined_41();
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(abs(1.0)))))) {
                                            _GLF_color = trunc(min(_GLF_outVarBackup_GLF_color, -269.976));
                                        }
                                        _GLF_color = _GLF_outlined_70(_GLF_outVarBackup_GLF_color);
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_outlined_173(_GLF_color);
                                _GLF_color = refract((1.3 / vec4(-2.8, -9.7, 5038.6611, 8281.9636)), vec4(1.2, 24.46, -4481.7370, -67.58), sin(-973.900));
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) && (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))) {
                                    _GLF_color = _GLF_outlined_174(_GLF_outVarBackup_GLF_color, _GLF_color);
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = (_GLF_color + _GLF_color);
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-1781.3600, 40.50, -430.512, 9916.2761);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outlined_175(_GLF_outVarBackup_GLF_color);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = vec4(9.7, 6.3, 72.06, -336.133);
                                            }
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_outlined_176();
                                        }
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        _GLF_color = asinh(vec4(1360.4996, -9.1, -651.818, -277.969));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_IDENTITY(true, false || (true)), !(!(_GLF_IDENTITY(true, false || (true))))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-3872.5402, 548.455, -6.9, 966.459);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(-1480.5832, 0.3, -3.8, 2.0);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(853.919, -570.603, 6.1, -7.5);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_struct_replacement_0._f0._f6.i == 2) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = _GLF_outlined_117();
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outlined_71(_GLF_outVarBackup_GLF_color);
                        }
                        _GLF_color = _GLF_outlined_42();
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = round(_GLF_outVarBackup_GLF_color);
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = fwidthCoarse(vec4(6077.4679, 510.342, 1.6, -3.6));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = dFdx((false ? _GLF_color : _GLF_outVarBackup_GLF_color));
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = _GLF_outlined_177();
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outlined_11(_GLF_outVarBackup_GLF_color);
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                    }
                    obj.prime_numbers[_GLF_struct_replacement_0._f0._f6.i] = 5;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_outlined_178(_GLF_color);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_outlined_2();
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outlined_118(_GLF_color);
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outlined_72(_GLF_color);
                    }
                    if (_GLF_struct_replacement_0._f0._f6.i == 3) {
                        obj.prime_numbers[_GLF_struct_replacement_0._f0._f6.i] = 7;
                    } else if (_GLF_struct_replacement_0._f0._f6.i == 4) {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                            _GLF_color = _GLF_color;
                        }
                        obj.prime_numbers[_GLF_struct_replacement_0._f0._f6.i] = 11;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_outlined_73(_GLF_color);
                            _GLF_color = vec4(-5171.5811, -0.9, -1.1, 4789.3932);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_outlined_119(_GLF_outVarBackup_GLF_color, _GLF_color);
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    } else if (_GLF_struct_replacement_0._f0._f6.i == 5) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_outlined_179(_GLF_color);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            _GLF_color = (mat4(-848.420, -3.6, 75.10, -3.7, -2.9, 941.775, 1.0, -8.3, -60.84, -9.1, -2.5, -4.9, 1.5, 33.40, 60.29, 6026.4459) * vec4(41.36, -5622.1705, -1.5, 448.712));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        obj.prime_numbers[_GLF_struct_replacement_0._f0._f6.i] = 13;
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outlined_180(_GLF_color);
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = step(vec4(3.8, 1.8, 5.7, -7607.6381), _GLF_outVarBackup_GLF_color);
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(5.6, -832.195, 988.708, -118.158);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = fma(vec4(-6.8, 1.3, -4884.1387, -408.572), sign(vec4(-334.592, -1387.8049, -5391.5985, 3.1)), vec4(7181.6038, 1.6, 9.7, 41.12));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = _GLF_outlined_120();
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-9.5, 1855.0114, -112.010, 974.929);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                _GLF_color = _GLF_outlined_74(_GLF_outVarBackup_GLF_color);
                            }
                        }
                        if (_GLF_struct_replacement_0._f0._f6.i == 6) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (smoothstep(3.5, (-5955.2866), step(1.4, _GLF_color)) * mat4(4.8, -8.8, -6.3, 929.743, 8.4, -0.7, 2882.7080, 574.498, -19.20, -1597.4868, -9.2, -9489.4024, -15.63, -556.277, 0.0, 418.704));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_outlined_121(_GLF_color);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(74.48, 1028.8783, -5302.5018, 496.144);
                                        }
                                        _GLF_color = refract(vec4(7.0, 9.1, 8.5, -6.2), vec4(-453.339, 408.381, -353.994, -9987.3619), -9.3);
                                    }
                                    _GLF_color = _GLF_outlined_43();
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = mix(_GLF_outVarBackup_GLF_color, vec4(5096.8924, -12.67, -7589.9833, -4190.6303), trunc(497.096));
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_outlined_122(_GLF_color);
                                            _GLF_color = dFdyCoarse(vec4(77.63, 18.17, -3.5, 7348.1133));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                                    _GLF_color = vec4(5.2, 33.29, 1265.5835, -672.379);
                                                }
                                                _GLF_color = _GLF_outlined_123(_GLF_outVarBackup_GLF_color);
                                            }
                                        }
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = _GLF_outlined_181();
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                _GLF_color = _GLF_outlined_12(_GLF_color);
                            }
                            obj.prime_numbers[_GLF_struct_replacement_0._f0._f6.i] = 17;
                        } else {
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_outlined_124(_GLF_color);
                                _GLF_color = (vec4(19.46, -3.0, -8.6, 3.2) - 3.3);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outlined_125(_GLF_outVarBackup_GLF_color);
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outlined_182(_GLF_color);
                            }
                            if (_GLF_struct_replacement_0._f0._f6.i == 7) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = vec4(4.5, 27.79, -926.621, -1.1);
                                }
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = trunc(_GLF_color);
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_183(_GLF_color);
                                    _GLF_color = _GLF_outlined_44();
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(_GLF_IDENTITY(false, false || (false))))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            _GLF_color = vec4(-8.3, -42.74, 46.54, 47.89);
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = fma(vec4(-3.5, -659.544, 6.2, -1.1), trunc(vec4(-5.5, 1.4, -5.8, -8596.2329)), vec4(-6.3, 974.771, -1.7, -4010.3245));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat2(0.0, 0.0, 1.0, 0.0)))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = _GLF_outlined_13();
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-5508.8422, radians(vec2(5.2, 883.753)), -95.14);
                                            }
                                            {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-49.97, -2163.2768, 9239.0155, -7.4);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = unpackUnorm4x8(168161u);
                                                }
                                                _GLF_color = _GLF_outlined_22();
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_outlined_184(_GLF_outVarBackup_GLF_color);
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = _GLF_outlined_126();
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_75(_GLF_color);
                                                    _GLF_color = (vec4(2002.8351, 1270.3895, -239.711, 934.533) * mat4(0.1, -38.90, -535.522, -4.2, 0.6, 9744.5895, -809.248, 7.9, -47.56, -5.6, 4.3, -81.74, 8233.2212, -700.836, 2.4, 94.95));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0)))))) {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_outlined_185();
                                                    }
                                                    _GLF_color = _GLF_outlined_127(_GLF_outVarBackup_GLF_color);
                                                }
                                                _GLF_color = _GLF_outlined_128(_GLF_outVarBackup_GLF_color);
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = ((bvec2(true, true), mat3x4(-349.378, 9.8, 0.3, 607.739, -2.3, -5.8, 455.342, -239.319, 5.2, -7820.8472, 1211.5005, -9.4)) * (vec2(4.4, -8.3) * mat3x2(6.0, -8.6, 8.5, 56.30, 116.908, 726.026)));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                obj.prime_numbers[_GLF_struct_replacement_0._f0._f6.i] = 19;
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = _GLF_outlined_45(_GLF_color);
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_23(_GLF_color);
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_outlined_46(_GLF_color);
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(-540.202, -3.6, -7.7, -52.75);
                                        }
                                        _GLF_color = _GLF_outlined_129();
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = inversesqrt(vec4(-464.676, 53.59, -198.871, 6.9));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_186(_GLF_color);
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_outlined_187();
                                                    }
                                                    _GLF_color = vec4(41.32, 5.4, 42.48, 41.59);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_outlined_188(_GLF_color);
                                                            _GLF_color = vec4(vec2(-9.0, -7.9), fma(vec2(5.7, 1.7), vec2(-58.78, -93.04), vec2(-593.870, -873.188)));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_color = _GLF_outlined_130(_GLF_outVarBackup_GLF_color);
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_outlined_189(_GLF_outVarBackup_GLF_color);
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = exp2(vec4(-54.29, -664.768, -1627.5279, 115.396));
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (dot(59.78, -62.05) / vec4(95.19, 6451.7478, 901.319, 7996.4825));
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                                                _GLF_color = min(_GLF_color, _GLF_outVarBackup_GLF_color);
                                            }
                                        }
                                        _GLF_color = fract(log2(_GLF_color));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = (vec2(-1.3, 2.6) * mat4x2(-2292.7481, -0.8, 4439.4445, -9.4, 6.1, -1596.3870, 5.0, 6.0));
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = reflect(vec4(9037.7565, 3.9, -2.6, 9.0), min(vec4(116.341, 3.8, -7044.0769, 2.3), vec4(-52.61, -31.13, 56.55, 382.953)));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_outlined_190();
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_outlined_191(_GLF_outVarBackup_GLF_color);
                                                }
                                            }
                                        }
                                    }
                                    _GLF_color = vec4(6.5, -93.27, -9.6, 31.17);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outlined_14(_GLF_outVarBackup_GLF_color);
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                            } else if (_GLF_struct_replacement_0._f0._f6.i == 8) {
                                obj.prime_numbers[_GLF_struct_replacement_0._f0._f6.i] = 23;
                            } else if (_GLF_struct_replacement_0._f0._f6.i == 9) {
                                obj.prime_numbers[_GLF_struct_replacement_0._f0._f6.i] = 29;
                            }
                        }
                    }
                }
            }
        }
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-6607.9428, 66.32, -4.3, 1.4);
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_outlined_24(_GLF_color);
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outlined_192(_GLF_color);
                    }
                    _GLF_color = exp2(min(vec4(7.0, -306.778, -5.6, 23.83), -3.3));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                        _GLF_color = _GLF_outlined_193(_GLF_outVarBackup_GLF_color);
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(vec2(3.6, -7.3), 3953.7834, 69.41);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outlined_76(_GLF_outVarBackup_GLF_color);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(716.499, 31.03, 3.4, -1.1);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false || (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = ((-367.220) * (vec4(3.4, 7638.4348, 0.4, -166.172) - 69.50));
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            _GLF_color = _GLF_outlined_3();
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_outlined_77();
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = (vec4(-76.95, 7.1, -4.9, -5.7) - 7066.1744);
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outlined_47(_GLF_outVarBackup_GLF_color);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_131();
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = _GLF_outlined_78(_GLF_outVarBackup_GLF_color);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = min(_GLF_color, (mat3x4(-443.876, 4995.6679, 0.0, 5849.5681, -4096.5145, -8913.5035, 7.8, 4307.0323, -9982.9656, -7.2, -5.0, 61.14) * vec3(8.0, 1.8, -7.6)));
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = mix(_GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color, greaterThanEqual(ivec4(-24970, 88778, -80129, 78490), ivec4(-41557, 20379, -11703, -14777)));
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = _GLF_outlined_132();
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                _GLF_color = _GLF_outlined_79(_GLF_color);
                            }
                        }
                        _GLF_color = _GLF_outlined_25(_GLF_outVarBackup_GLF_color);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_outlined_80(_GLF_color);
                }
            }
        }
    }
    vec2 uv = (gl_FragCoord.xy / resolution.x) * vec2(resolution.x / resolution.y, 1.0);
    vec2 b = brick(uv * 7.0);
    vec3 color = vec3(patternize(b));
    if (gl_FragCoord.y < resolution.y / 1.1) {
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-8989.1464, -7.9, -153.600, 1.2);
        }
        {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, false))))) {
                    _GLF_color = vec4(-0.0, 773.484, -1490.9458, -5204.0750);
                }
                _GLF_color = _GLF_color;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_133(_GLF_color);
                _GLF_color = uintBitsToFloat((uvec4(29998u, 182870u, 37083u, 138276u) / 21216u));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = sin(_GLF_outVarBackup_GLF_color);
                            }
                            _GLF_color = _GLF_outlined_134();
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(50.62, 8.3, -971.472, -8.9);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outlined_194(_GLF_outVarBackup_GLF_color);
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_outlined_135(_GLF_color);
                            _GLF_color = _GLF_outlined_195();
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outlined_136(_GLF_outVarBackup_GLF_color);
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = acos(cos(_GLF_color));
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = normalize(_GLF_color);
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_137(_GLF_color);
                _GLF_color = vec4(-648.220, 9.5, -344.194, -7298.4413);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = _GLF_outlined_138();
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (true ? _GLF_outVarBackup_GLF_color : _GLF_outVarBackup_GLF_color);
                }
                _GLF_color = mat4(-5157.1428, -6.3, 1.3, -5700.1126, 1213.5219, 6.9, 98.78, -10.72, -9.6, -4.3, -2.1, 2601.2610, 239.524, -9218.1859, 564.514, 2.9)[0];
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-774.281, 3.8, -2.6, -313.390);
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_outlined_81(_GLF_color);
            _GLF_color = vec4(-7.3, 3.3, -2.5, 66.06);
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_outlined_196(_GLF_outVarBackup_GLF_color);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = refract(_GLF_outVarBackup_GLF_color, _GLF_color, 3.0);
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outlined_26(_GLF_outVarBackup_GLF_color);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = ((_GLF_outVarBackup_GLF_color.t - mat2x4(67.68, 85.83, -7142.0007, 783.832, 49.07, 395.795, -8.1, 64.73)) * b);
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outlined_15(_GLF_color);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(4.9, -536.652, -44.94, -804.593);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
        }
        if (binarySearch(obj, obj.prime_numbers[4]) != -(int(resolution.y)) && binarySearch(obj, obj.prime_numbers[0]) >= -(int(resolution.x))) {
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (55456, vec4(5.9, -9734.1843, 6.9, -8873.6887));
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_48(_GLF_color);
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(2.9, -9.0, 2780.5085, 75.78);
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                _GLF_color = vec4(6.3, 52.74, -427.157, -6.6);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    _GLF_color = _GLF_outlined_139(_GLF_color);
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            color.yz -= dot(float(binarySearch(obj, obj.prime_numbers[4])), float(binarySearch(obj, obj.prime_numbers[0])));
        } else {
            discard;
        }
    } else {
        if (binarySearch(obj, 1) == -1) {
            discard;
        } else {
            color.yz += color.yz;
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_outlined_197(_GLF_color);
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_outlined_198(_GLF_color);
            _GLF_color = _GLF_outlined_82();
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outlined_83(_GLF_color);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = refract(vec4(3.6, 8.3, -9007.1302, 95.36), _GLF_outVarBackup_GLF_color, -4.3);
                    }
                }
                {
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), bool(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
                        _GLF_color = _GLF_color;
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        _GLF_color = _GLF_outlined_84(_GLF_outVarBackup_GLF_color);
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-4.4, -6434.2937, -0.1, 8480.9224);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = cos(_GLF_outVarBackup_GLF_color);
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (bvec2(true, false), _GLF_color);
                    }
                }
                _GLF_color = _GLF_outlined_4(_GLF_outVarBackup_GLF_color);
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_outlined_140(_GLF_color);
            _GLF_color = vec4(-87.93, 426.145, 3.1, 69.65);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    _GLF_color = _GLF_outlined_1(color, injectionSwitch);
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = _GLF_color;
    }
}
