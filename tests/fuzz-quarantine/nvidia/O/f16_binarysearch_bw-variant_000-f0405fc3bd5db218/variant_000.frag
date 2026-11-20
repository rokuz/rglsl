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

struct GLF_live9QuicksortObject {
    int numbers[10];
};

GLF_live9QuicksortObject GLF_live9obj = GLF_live9QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

layout(set = 0, binding = 2) uniform buf2 {
    float GLF_live2one;
};

mat2 GLF_live2m22 = _GLF_FUZZED(mat2(_GLF_IDENTITY((mat4(-2.9, 4096.4535, -68.59, -10.85, -77.77, -6.5, 1.2, -999.452, -5.2, 4276.7221, 7.1, 211.537, -_GLF_IDENTITY(3348.7108, float(float(_GLF_IDENTITY(3348.7108, 0.0 + (3348.7108))))), -6.4, -5.7, 44.71) + 103.845), (false ? _GLF_FUZZED(mat4(-1.5, -7713.6230, 1955.3985, 942.669, 7510.0908, -536.945, -0.4, 61.84, 944.504, -6.0, 752.339, -849.811, -1102.6390, 9797.0349, -2.4, -860.656)) : (mat4(-2.9, 4096.4535, -68.59, -10.85, -77.77, -6.5, 1.2, -999.452, -5.2, 4276.7221, 7.1, 211.537, -_GLF_IDENTITY(3348.7108, float(float(_GLF_IDENTITY(3348.7108, 0.0 + (3348.7108))))), -6.4, -5.7, 44.71) + 103.845)))));
mat2x3 GLF_live2m23 = _GLF_FUZZED(((-555.978) - (mat2x3(543.543, -0.9, -7.6, 8.2, -649.348, 5.4) - mat2x3(-30.79, 4093.4587, -4889.3488, 1400.7278, 6.7, 6.7))));
mat2x4 GLF_live2m24 = _GLF_FUZZED(mat2x4(42.24, -_GLF_IDENTITY(9.7, float(_GLF_IDENTITY(mat3(9.7, sqrt(tan(0.0)), 1.0, length(0.0), sqrt(0.0), abs(1.0), 0.0, sqrt(1.0), 0.0), mat3(mat4x3(_GLF_IDENTITY(mat3(9.7, sqrt(tan(0.0)), 1.0, length(0.0), sqrt(0.0), abs(1.0), 0.0, sqrt(1.0), 0.0), mat3(mat3(mat3(9.7, sqrt(tan(0.0)), 1.0, length(0.0), sqrt(0.0), abs(1.0), 0.0, sqrt(1.0), 0.0))))))))), -4.6, 35.29, -3.3, 62.35, -0.2, -8.4));
mat3x2 GLF_live2m32 = _GLF_FUZZED((mat3x2(31.78, -376.522, 11.69, 4.8, 4433.3560, 3843.5019) * (-(-4259.0380))));
mat3 GLF_live2m33 = _GLF_FUZZED((mat2x3(-2734.1998, 159.911, -_GLF_IDENTITY(53.27, min(_GLF_IDENTITY(53.27, _GLF_IDENTITY(float(float(53.27)), 0.0 + (float(float(53.27))))), _GLF_IDENTITY(53.27, min(_GLF_IDENTITY(53.27, (false ? _GLF_FUZZED(645.024) : 53.27)), 53.27)))), -8011.4726, 79.56, 539.217) * mat3x2(-9.3, -72.66, 4.9, -5.1, 2.1, -9.2)));
mat3x4 GLF_live2m34 = _GLF_FUZZED(mat3x4(-5080.2929, 910.301, 4759.9734, -3.8, -2.8, 8759.6804, 514.013, 1.9, -736.426, 33.71, 7.1, -48.91));
mat4x2 GLF_live2m42 = _GLF_FUZZED(mat4x2(_GLF_IDENTITY(5767.3098, max(5767.3098, 5767.3098)), 73.40, -5.2, 9.2, -3080.3812, -622.924, -0.8, -5.1));
mat4x3 GLF_live2m43 = _GLF_FUZZED(mat4x3(-4.8, -814.541, -993.385, 9.1, -332.260, 3261.6214, 857.205, -6.9, 903.777, 7175.7469, -7762.3535, 2547.2799));
mat4 GLF_live2m44 = _GLF_FUZZED(mat4(9.7, -5503.7782, -2.5, 859.129, 95.00, -8.8, 379.001, 3.8, -6855.1201, -21.37, 2.4, -8.1, 130.438, -887.453, 618.109, -7755.6941));
layout(set = 0, binding = 3) uniform sampler2D GLF_live3tex;
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
    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))), bool(bool(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))), !(!(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))), (_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x)))) && true))))))))) {
        if (_GLF_DEAD(false)) {
            _GLF_color = (vec4(-106.719, -708.002, -3.9, 983.314) - distance(vec4(1.1, 4341.4933, -66.89, -90.01), _GLF_color));
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = (_GLF_color + _GLF_color);
        }
        return vec2(1.0, 1.0);
    }
    int a = 4;
    do {
        uv.y -= step(injectionSwitch.y, uv.x);
        {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return vec2(1.0, 1.0);
                }
                discard;
                if (_GLF_DEAD(false)) {
                    break;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                continue;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            _GLF_color = exp(vec4(43.23, -2544.8512, 63.65, -8300.6404));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = _GLF_color;
            }
            _GLF_color = mix(vec4(-328.686, _GLF_IDENTITY(-74.05, min(-74.05, -74.05)), -76.97, -8.3), vec4(_GLF_IDENTITY(-37.19, _GLF_IDENTITY(float(vec2(-37.19, 1.0)), clamp(float(vec2(-37.19, 1.0)), float(vec2(-37.19, 1.0)), float(vec2(-37.19, 1.0))))), 0.2, 5.0, 5911.9879), bvec4(false, true, true, true));
        }
        uv.x -= fract(tanh(uv.x)) / ldexp(injectionSwitch.y, _GLF_IDENTITY(findMSB(a), min(findMSB(a), findMSB(a))));
        a--;
    } while (_GLF_IDENTITY(a, 0 | (a)) > int(injectionSwitch.x));
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(5.8, 3.5, -29.73, 83.19);
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = acos(_GLF_color);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = cosh(((-341.390) - vec4(1072.7324, -6238.7176, 47.75, 4.9)));
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(log(1.0)))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        return vec2(1.0, 1.0);
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(623.085, 777.618, 4.1, -3.9);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(8.4, 8.0, 611.716, 9.1);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = mix(_GLF_outVarBackup_GLF_color, _GLF_color, bvec4(true, false, true, true));
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(2999.2947, float(a), (resolution / fwidthFine(124.199)));
                }
            }
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return vec2(1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
        _GLF_color = vec4(90.30, 6.9, -833.418, -42.54);
    }
    int b = 3;
    do {
        if (_GLF_DEAD(false)) {
            _GLF_color = floor(GLF_live2m44[2]);
        }
        uv.y -= step(injectionSwitch.y, uv.x) + float(a);
        {
            {
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = log(vec4(-7.6, -1191.1612, -1625.5117, -31.97));
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-31.68, 99.33, 37.81, 727.560);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return vec2(1.0, 1.0);
                }
                ;
            }
        }
        uv.x *= (isnan(uv.y) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x));
        b--;
    } while (_GLF_IDENTITY(b, ~(~(b))) > int(injectionSwitch.x));
    int c = 2;
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = vec4(-679.325, -618.828, 3.9, -7.2);
        }
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + _GLF_IDENTITY(float(b), max(float(b), float(b)));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            discard;
        }
        _GLF_IDENTITY(uv.x += ldexp(injectionSwitch.y, isinf(uv.y + uv.x) ? findMSB(b) : findMSB(a)), (_GLF_IDENTITY(uv.x += ldexp(injectionSwitch.y, isinf(uv.y + uv.x) ? findMSB(b) : findMSB(a)), (uv.x += ldexp(injectionSwitch.y, isinf(uv.y + uv.x) ? findMSB(b) : findMSB(a))) - 0.0)) + sin(0.0));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return vec2(1.0, 1.0);
            }
            {
                vec2 GLF_live7a = _GLF_FUZZED(vec2(637.320, 1.7));
                float GLF_live7z = _GLF_FUZZED(vec2(-5.1, -8.9).x);
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                {
                    GLF_live7z = GLF_live7a.y / GLF_live7a.x;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-477.239, 5.2, -62.57, 66.08);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-433.588, 0.4, -702.108, -1157.2695);
                }
                return vec2(1.0, 1.0);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                _GLF_color = mix(sinh(_GLF_color), _GLF_color, bvec2(false, false).tsst);
            }
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-8249.1399, -5.3, -5588.1096, 963.859);
            }
            _GLF_color = unpackUnorm4x8(uint(false));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (true ? _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_outVarBackup_GLF_color = _GLF_color) - vec4(0.0, 0.0, 0.0, 0.0)) : _GLF_FUZZED(vec4(28.69, 333.294, -501.165, 61.09))));
                _GLF_color = vec4(-0.9, -1.5, 0.0, 619.601);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(-2646.4568, -855.675, -4.7, -8.7);
                        }
                        break;
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            discard;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = dFdx(vec4(-3.9, 69.79, 5.9, 878.749));
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = sin(vec4(-9264.1421, -755.211, 6197.5108, 9.1));
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            continue;
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = round((8818.3190 * _GLF_color));
            }
            {
                vec2 GLF_live7a = _GLF_FUZZED(vec2(-121.900, 405.320).yy);
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                float GLF_live7z = _GLF_FUZZED(((+15.27) * 176.183));
                {
                    GLF_live7z = GLF_live7a.x / GLF_live7a.y;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                _GLF_color = radians(vec4(-49.98, -3.8, -26.42, 8.3));
            }
        }
        c--;
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                continue;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                    _GLF_color = vec4(-0.2, -3.0, 75.93, 7.3);
                }
                break;
                if (_GLF_DEAD(false)) {
                    break;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            _GLF_color = vec4(7633.6020, 2.6, 1.6, -33.00);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    _GLF_color = (_GLF_outVarBackup_GLF_color);
                }
            }
            if (_GLF_DEAD(false)) {
                discard;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
    } while (c > int(injectionSwitch.x));
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return vec2(1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        _GLF_color = vec4(vec3(3.0, 4928.1568, -294.098), distance(vec3(9568.7003, -1.4, 3.6), vec3(-9.3, 55.57, -6.4)));
    }
    {
        {
            int GLF_live8i = _GLF_FUZZED(((vec2(72.97, -3.7) != vec2(5.2, -5070.8029)) ? 73586 : (-97225)));
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
            float GLF_live8result = _GLF_FUZZED(-4.3);
            float GLF_live8thirty_two = _GLF_FUZZED(1.4);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = vec4(-7.7, 4341.2879, -9.1, -8639.1789);
            }
            if (mod(float(GLF_live8i), round(GLF_live8thirty_two)) <= 0.01) {
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
                    return vec2(1.0, 1.0);
                }
                GLF_live8result += 100.0;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    return vec2(1.0, 1.0);
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec2(1.0, 1.0);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = vec4(2.5, -4.3, 4.5, 984.671);
            }
            return vec2(1.0, 1.0);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))))) {
            return vec2(1.0, 1.0);
        }
        vec2 GLF_live3coord = _GLF_FUZZED(((mat3x2(-1.7, -4.3, -7.2, -3.6, -0.9, 2.7) * mat3(7728.2160, -3.8, -909.336, -4.7, -964.917, -9354.4253, 827.904, -668.229, 3.7)) * vec3(1.4, -95.56, -5.8)));
        float GLF_live3h = _GLF_FUZZED((false ? 99.32 : float(99672)));
        if (_GLF_DEAD(false)) {
            return vec2(1.0, 1.0);
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 1.0, 0.0, 0.0)))))) {
                return vec2(1.0, 1.0);
            }
            vec3 GLF_live8c = _GLF_FUZZED(vec3(vec2(-10.97, -57.60), 9464.3107));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = vec4(-252.528, 54.47, -9177.4042, 6.0);
            }
            int GLF_live8i = _GLF_FUZZED(-84225);
            int GLF_live8looplimiter1 = 0;
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
            {
                if (GLF_live8looplimiter1 >= 5) {
                    ;
                }
                GLF_live8looplimiter1++;
                {
                    if (GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 3)] >= 1.0) {
                        GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 3)] = GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 3)] * GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 3)];
                        if (_GLF_DEAD(false)) {
                            return vec2(1.0, 1.0);
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
            return vec2(1.0, 1.0);
        }
        int GLF_live3i = _GLF_FUZZED((false ? 91469 : (-58824)));
        if (_GLF_DEAD(false)) {
            _GLF_color = unpackUnorm4x8(packSnorm2x16(GLF_live3coord));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = dFdyFine(_GLF_IDENTITY(_GLF_color, sqrt(sqrt(vec4(0.0, 0.0, 0.0, 0.0))) + (_GLF_color)));
        }
        float GLF_live3refh = _GLF_FUZZED(6.0);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
            _GLF_color = vec4(266.597, -67.18, -29.21, -27.78);
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return vec2(1.0, 1.0);
                }
                return vec2(1.0, 1.0);
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-6.7, -8.8, -45.50, 69.36);
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(457.420, -3.1, -17.10, 3.1);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec2(1.0, 1.0);
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (75.63 - vec4(-2661.7957, -309.388, -36.51, -4.2));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec2(1.0, 1.0);
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec2(1.0, 1.0);
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (sqrt(vec4(-101.536, -4.1, 65.77, -4.5)) * (-1.5));
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    return vec2(1.0, 1.0);
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(8404.5123, 91.83, -3.0, -4120.3521);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return vec2(1.0, 1.0);
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = vec4(4188.2328, -5.5, 6.6, 9.6);
                }
                return vec2(1.0, 1.0);
            }
        }
        float GLF_live3slope = _GLF_FUZZED(5.5);
        if (_GLF_DEAD(false)) {
            return vec2(1.0, 1.0);
        }
        vec2 GLF_live3uvstep = _GLF_FUZZED(((-8.1) * vec2(6786.9790, -3.3)));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(45.09, 3108.5857, 2877.8895, -5.1);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                _GLF_color = faceforward(_GLF_outVarBackup_GLF_color, vec4(-74.82, 7101.1569, 598.848, -9.0), _GLF_outVarBackup_GLF_color);
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec2(1.0, 1.0);
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-2.3, -8566.6658, 884.894, -7.9);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-58.44, -28.66, -41.24, 5.9);
            }
            GLF_live3coord -= GLF_live3uvstep;
            GLF_live3refh += GLF_live3slope;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = (GLF_live3refh * refract(_GLF_color, vec4(996.785, -5848.6931, -3585.0991, 417.153), GLF_live2one));
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = (ceil(vec4(-256.475, 2.2, 0.6, -72.00)) * GLF_live2m44);
            }
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), bool(bool(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))) {
                return vec2(1.0, 1.0);
            }
            GLF_live3h = texture(GLF_live3tex, GLF_live3coord).y;
            GLF_live3i++;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return vec2(1.0, 1.0);
        }
    }
    int d = 1;
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b) + float(c);
        if (_GLF_DEAD(false)) {
            _GLF_color = (vec4(92.30, -6.9, -330.080, 27.43) + inversesqrt(GLF_live2one));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec2(1.0, 1.0);
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = (_GLF_color * _GLF_color);
        }
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(1917.2009, -5.7, -2138.7084, 0.0);
                if (_GLF_DEAD(false)) {
                    discard;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(4.6, 2.3, 1430.9570, -574.818);
            }
            _GLF_color = vec4(4.0, 7.9, 26.28, 898.496);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    break;
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                    {
                        ;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                    }
                }
            }
        }
        d--;
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = (_GLF_color / distance(radians(_GLF_color), vec4(_GLF_IDENTITY(3681.3738, max(3681.3738, _GLF_IDENTITY(3681.3738, (3681.3738) - 0.0))), 8631.5944, GLF_live2one, GLF_live2one)));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-96.79, -1968.7204, -3.1, -1.7);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            return vec2(1.0, 1.0);
                        }
                        _GLF_color = log2(_GLF_color);
                    }
                }
            }
        }
    } while (d > int(injectionSwitch.x));
    return fract(uv);
}

float patternize(vec2 uv) {
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return 1.0;
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(GLF_live2one, GLF_live2one, tanh(GLF_live2one), -52.36);
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (+vec4(-722.398, 4.0, -0.7, -7360.1277));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                return 1.0;
            }
            _GLF_color = vec4(-863.204, vec3(343.578, -61.55, -4.4));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return 1.0;
            }
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), true && (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))))) {
                    return 1.0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return 1.0;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return 1.0;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return 1.0;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-4.7, -94.05, 8979.4779, 250.940);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return 1.0;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-12.21, -1.7, 0.3, 9150.3453);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return 1.0;
            }
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return 1.0;
        }
        {
            vec3 GLF_live9color = _GLF_FUZZED((vec3(-9382.7363, -3461.0006, 3426.6282) - vec3(-30.68, -200.470, -844.788)));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return 1.0;
                    }
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                    }
                    _GLF_color = step(_GLF_outVarBackup_GLF_color, vec4(4.8, -27.56, -91.88, -8.9));
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = step(vec4(6392.9619, 7914.5479, -167.609, 7953.9182), trunc(vec4(90.92, -816.613, 2238.8440, 82.04)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = sqrt(trunc(vec4(25.23, -88.39, 5959.0936, 2.1)));
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                GLF_live9color.x += float(GLF_live9obj.numbers[9]);
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = dFdy(sign(vec4(-46.08, -6399.5094, -48.30, 96.59)));
            }
        }
        _GLF_color = dFdx(vec4(7.9, -8497.1797, -4.8, -41.68));
        if (_GLF_DEAD(false)) {
            _GLF_color = fwidthFine(vec4(-750.971, 453.705, -5255.4821, -12.45));
        }
        {
            {
                if (_GLF_DEAD(false)) {
                    return 1.0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = dFdyCoarse(_GLF_color);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return 1.0;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = step(vec4(3035.2966, 9368.5026, -783.662, -82.79), (vec3(3.0, -534.591, 9445.5329) * mat4x3(-734.785, 13.97, 8.0, 73.41, 2190.4924, 3.0, -7060.6691, 4.1, 793.056, -0.0, 308.836, -309.473)));
                }
                if (_GLF_DEAD(false)) {
                    return 1.0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = vec4(-30.49, 1.3, 0.2, -45.52);
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = ceil(vec3(1.8, 7.9, -_GLF_IDENTITY(4.8, min(4.8, 4.8))).yxxx).zyzz;
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            float GLF_live4pab = _GLF_FUZZED(-116.210);
            float GLF_live4pca = _GLF_FUZZED((211.872 * vec4(3.5, -7.1, -4.2, -304.157)).t);
            if (!((GLF_live4pab < 0.0 && GLF_live4pca < 0.0) || (GLF_live4pab >= 0.0 && GLF_live4pca >= 0.0))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    _GLF_color = _GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            return 1.0;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(unpackSnorm2x16(73263u), vec2(-5287.0998, -3.3));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = reflect(vec4(-335.857, -3.0, -0.9, 487.393), _GLF_outVarBackup_GLF_color);
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return 1.0;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        if (_GLF_DEAD(false)) {
                            return 1.0;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                _GLF_color = _GLF_color;
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = fma(vec4(0.7, -3.9, 2.7, -8436.1639), vec4(23.14, 845.446, -959.411, 49.39), asinh(vec4(-2.5, -0.9, -707.086, 4520.1975)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return 1.0;
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int GLF_live8looplimiter1 = 0;
                        if (GLF_live8looplimiter1 >= 5) {
                            ;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                        }
                    }
                    _GLF_color = dFdyCoarse(vec4(5.5, -3327.4114, 3.6, 346.966));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            return 1.0;
                        }
                    }
                }
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(-14.94, 99.12, 7867.7791, 38.51);
    }
    vec2 size = vec2(0.45);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return 1.0;
    }
    if (_GLF_DEAD(false)) {
        return 1.0;
    }
    vec2 st = step(size, uv);
    {
        int GLF_live2c = _GLF_FUZZED(-47807);
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
        int GLF_live2looplimiter1 = 0;
        uint GLF_live2matrix_number = _GLF_FUZZED(uvec4(47049u, 25611u, 67275u, 2148u).a);
        int GLF_live2rows = _GLF_FUZZED(-65366);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return 1.0;
        }
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(GLF_live2one, GLF_live2one, acos(2.6), 7.5);
            }
            if (GLF_live2looplimiter1 >= 6) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec3(7441.7606, 615.045, -2331.7011).gggb;
                        }
                        _GLF_color = vec4(-8.0, -4643.0283, 4354.2592, -16.35);
                    }
                    _GLF_color = clamp((vec4(-160.024, 28.49, -32.90, -34.56) + (-892.414)), vec4(57.42, 6.4, -0.7, 7.2), vec4(-6305.5836, 404.766, -65.91, -657.053));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (mat4(-81.24, 797.988, -749.440, -46.03, 8037.3505, 5721.8826, -497.222, 221.494, -8.2, -161.530, -328.626, -6683.9110, -7.2, 5.9, 7.5, -94.39) * sin(vec4(1.8, 4.3, 8.9, 0.4)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return 1.0;
                            }
                            if (_GLF_DEAD(false)) {
                                return 1.0;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = _GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = injectionSwitch.sstt;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = tanh(vec4(2.6, 73.11, -8.2, -7.8));
                    }
                }
                ;
            }
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = fwidthFine(_GLF_color);
            }
            GLF_live2looplimiter1++;
            {
                {
                    int GLF_live2looplimiter0 = 0;
                    for (int GLF_live2r = 0; GLF_live2r < GLF_live2rows; GLF_live2r++) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return 1.0;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                return 1.0;
                            }
                            return 1.0;
                        }
                        if (GLF_live2looplimiter0 >= 6) {
                            break;
                        }
                        GLF_live2looplimiter0++;
                        {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = pow(_GLF_color, vec4(-3.1, -555.699, -2.6, -11.22));
                            }
                            switch (GLF_live2matrix_number) {
                                case 0u:
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    GLF_live2m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2r, 2)] = GLF_live2one;
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    break;
                                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true && (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = vec4(5752.1106, -6.1, 13.76, 3.0);
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                case 1u:
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    GLF_live2m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2r, 3)] = GLF_live2one;
                                    break;
                                case 2u:
                                    GLF_live2m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2r, 4)] = GLF_live2one;
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-9.4, -9963.1190, 27.90, 9.9);
                                            }
                                            _GLF_color = vec4(-432.030, -4.3, 9.1, 14.63);
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(28.45, 2.3, -2.1, -6.6);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (roundEven(vec4(GLF_live2one, vec2(-0.5, 7.8), -9.7)) / sin(-686.380));
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-961.193, 7.4, -6.8, -207.921);
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(vec3(514.528, -57.74, -275.425), -3664.0789);
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(false)) {
                                                return 1.0;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = sqrt(_GLF_outVarBackup_GLF_color);
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = (mat4(5.5, 4.0, -288.486, 8.5, -9.2, 912.080, 8.9, -766.585, 802.681, 0.3, 69.77, 8.6, -253.994, -2.2, -7055.5401, 3.2) * sinh(vec4(474.126, 42.89, -4.3, 9841.2929)));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            return 1.0;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = intBitsToFloat(ivec4(46299, 99441, -30675, -3180));
                                    }
                                    {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                _GLF_color = vec4(8297.3869, 4.9, -5428.8345, -8.6);
                                            }
                                            continue;
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        _GLF_color = atanh(vec4(3.1, 1.9, -3.4, 54.31));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                case 3u:
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = step(vec4(0.1, 7207.3302, -5199.8678, -0.9), _GLF_color);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                            return 1.0;
                                        }
                                        _GLF_color = vec4(-6.4, -9733.1261, -680.672, -5.0);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))))))) {
                                            return 1.0;
                                        }
                                    }
                                    GLF_live2m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2r, 2)] = GLF_live2one;
                                    break;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                                        _GLF_color = degrees(vec4(470.693, -775.314, -817.018, 2.8));
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            continue;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = faceforward(_GLF_color, vec4(-57.35, -3.2, -5758.1578, -351.735), _GLF_color);
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(vec2(5.7, 656.921), vec2(-3.6, -181.063));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return 1.0;
                                            }
                                        }
                                    }
                                case 4u:
                                    if (_GLF_DEAD(false)) {
                                        return 1.0;
                                    }
                                    {
                                        int GLF_live8looplimiter0 = 0;
                                        if (GLF_live8looplimiter0 >= 5) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                                return 1.0;
                                            }
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        break;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    GLF_live2m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2r, 3)] = GLF_live2one;
                                    break;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                        continue;
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                case 5u:
                                    GLF_live2m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2r, 4)] = GLF_live2one;
                                    break;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                    }
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            break;
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        _GLF_color = dFdxCoarse(vec4(-53.35, -50.40, -4407.5811, -6.5));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                case 6u:
                                    GLF_live2m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2r, 2)] = GLF_live2one;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = intBitsToFloat(ivec4(55179, -29693, -39352, -62067));
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(-5.3, -4.8, 7146.7592, 5.4);
                                    }
                                    break;
                                case 7u:
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = uintBitsToFloat(uvec4(184680u, 176481u, 48979u, 163716u));
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                                _GLF_color = radians(_GLF_outVarBackup_GLF_color);
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    GLF_live2m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2r, 3)] = GLF_live2one;
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(-79.16, -821.651, -4.2, -6856.5448);
                                    }
                                case 8u:
                                    if (_GLF_DEAD(false)) {
                                        break;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                discard;
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = atan(vec4(2.1, -4956.4124, -97.03, 466.723), vec4(-8608.0738, 8.8, -445.909, -896.865));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    break;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-2.1, -7231.5808, 1597.3841, -6.7);
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                return 1.0;
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(991.756, 28.10, 3840.4142, -8019.6688);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(5.2, 5592.1557, 9.1, 56.41);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = dFdxCoarse(vec4(-1.5, 135.621, 5.7, 4.4));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                discard;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        break;
                                    }
                                    GLF_live2m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2r, 4)] = GLF_live2one;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return 1.0;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = degrees(vec2(-6.6, 896.995).xxyx);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                break;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = (_GLF_outVarBackup_GLF_color * _GLF_color);
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(-683.679, vec2(-9.1, -1809.7978), -8487.7567);
                                        }
                                        _GLF_color = roundEven((mat3x4(2.1, -2.5, -51.51, -1.2, 97.37, 2.3, 619.720, 5296.1410, 39.44, -4.6, 38.82, 4099.1650) * vec3(9.8, -1.7, 4.2)));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(77.33, 5077.6260, 3.8, 9.6);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            break;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = exp2(_GLF_color);
                                            }
                                        }
                                    }
                                    break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return 1.0;
                                }
                                continue;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    switch (int(_GLF_IDENTITY(mod(gl_FragCoord.y, 5.0), float(_GLF_IDENTITY(mat3x4(_GLF_IDENTITY(mod(gl_FragCoord.y, 5.0), (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? mod(gl_FragCoord.y, 5.0) : _GLF_FUZZED(344.089))), round(length(normalize(determinant(mat2(1.0, 1.0, 0.0, 1.0))))), _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(_GLF_ONE(1.0, injectionSwitch.y), 0.0)), dot(vec2(1.0, 0.0), vec2(_GLF_ONE(1.0, injectionSwitch.y), 0.0))), _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))), 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0), mat3x4(mat4(mat3x4(_GLF_IDENTITY(mod(gl_FragCoord.y, 5.0), (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? mod(gl_FragCoord.y, 5.0) : _GLF_FUZZED(344.089))), round(length(normalize(determinant(mat2(1.0, 1.0, 0.0, 1.0))))), _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(_GLF_ONE(1.0, injectionSwitch.y), 0.0)), dot(vec2(1.0, 0.0), vec2(_GLF_ONE(1.0, injectionSwitch.y), 0.0))), _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))), 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)), 0.0)))))))) {
        case 0:
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-23.73, -88.91, 7630.0224, 5.3);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            return mix(pow(st.x, injectionSwitch.y), st.x, size.y);
            break;
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return 1.0;
                }
                _GLF_color = vec4(5.2, 1515.8391, 9705.7425, -233.939);
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    return 1.0;
                }
                _GLF_color = vec4(6867.9761, -1.1, 7.1, -3.6);
            }
        case 1:
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (-vec4(7742.6678, -945.927, 9166.1078, -143.919));
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = faceforward(_GLF_color, _GLF_color, vec4(-2994.9139, 9.0, 0.0, -9683.6453));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return 1.0;
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    return 1.0;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_color;
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (vec2(0.6, 0.6) * mat4x2(570.703, 75.19, 12.88, -4856.2318, -34.60, -377.887, 9.3, 4391.6020));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return 1.0;
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = acosh(GLF_live2m44[3]);
                }
                _GLF_color = vec4(st, 925.532, GLF_live2one);
            }
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            return mix(pow(uv.y, injectionSwitch.y), st.y, size.x);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (false ? _GLF_FUZZED(_GLF_color) : (_GLF_outVarBackup_GLF_color = _GLF_color)));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                _GLF_color = normalize(vec4(31.16, 6419.7926, _GLF_IDENTITY(-94.08, min(_GLF_IDENTITY(-94.08, (false ? _GLF_FUZZED(determinant(GLF_live2m44)) : (-94.08))), -94.08)), -4.3));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            break;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return 1.0;
            }
        case 2:
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return 1.0;
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = vec4(-8298.8767, -3.4, -8912.5896, -6.5);
                    }
                }
                _GLF_color = vec4(-95.91, 5.2, -83.42, -89.98);
            }
            {
                vec2 GLF_live7a = _GLF_FUZZED(vec2(-7.5, 7.2));
                float GLF_live7z = _GLF_FUZZED((-(-0.9)));
                {
                    GLF_live7z = GLF_live7a.x / GLF_live7a.y;
                }
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return 1.0;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    _GLF_color = vec4(81.95, -420.927, -98.74, 898.360);
                }
                {
                    vec2 GLF_live7a = _GLF_FUZZED(vec2(-4.4, -8870.1679));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-582.948, 0.9, 14.71, 955.526);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))))))) {
                                return 1.0;
                                if (_GLF_DEAD(false)) {
                                    return 1.0;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    float GLF_live7th = _GLF_FUZZED(vec3(4.5, 210.509, -714.448).g);
                    if (GLF_live7a.y < GLF_live7a.x) {
                        GLF_live7th = 0.5 - GLF_live7th;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    return 1.0;
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    return 1.0;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = cosh(vec4(-871.662, -552.288, 48.48, 50.57));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = sqrt(_GLF_outVarBackup_GLF_color);
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = vec4(-5.4, 2.0, -5710.6179, 3.1);
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                    return 1.0;
                }
            }
            discard;
            break;
        case 3:
            return mix(pow(uv.y, injectionSwitch.y), uv.y, size.y);
            break;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = vec4(injectionSwitch, 36.48, fract(-778.496));
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return 1.0;
                        }
                        _GLF_color = vec4(1.8, -130.411, 28.03, 789.514);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return 1.0;
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), !(!(!(false)))))))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-64.05, -4.1, -4204.2564, -8.1);
                        }
                        _GLF_color = vec3(-9578.6682, -44.25, -5.9).grgr;
                    }
                    return 1.0;
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                    }
                }
                if (_GLF_DEAD(false)) {
                    return 1.0;
                }
                _GLF_color = clamp(_GLF_color, _GLF_color, _GLF_color);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                        return 1.0;
                    }
                    return 1.0;
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, sin(0.0), 1.0)), _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, sin(0.0), 1.0)), clamp(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, sin(0.0), 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, sin(0.0), 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, sin(0.0), 1.0))))))))) {
                return 1.0;
            }
        case 4:
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            return mix(pow(st.y, injectionSwitch.y), st.x, size.x);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(4081.2032, -5334.9577, 615.030, _GLF_IDENTITY(4.8, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(-6.8) : 4.8)));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (step(_GLF_color, vec4(83.97, 985.327, 563.880, -6348.2896)) * (GLF_live2one / mat4(_GLF_color, vec4(977.516, -6931.2922, -7775.3379, 22.78), vec4(-86.53, -6443.6687, -4.6, 3.8), vec4(651.228, 4674.7901, -7118.6160, 5.3))));
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = abs(vec4(21.93, -853.615, -6261.9813, 517.025));
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(_GLF_ZERO(0.0, injectionSwitch.x)))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    return 1.0;
                }
            }
            break;
    }
}

int binarySearch(BinarySearchObject obj, int x) {
    int l = 0, r = 9;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
        _GLF_color = _GLF_color;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return 1;
    }
    while (l <= r) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = mix(vec4(-3764.2954, -4.9, -481.344, 1.7), vec4(-296.653, 28.60, 440.653, -8.5), notEqual(vec4(-337.825, 3.0, 303.237, -7786.9022), vec4(664.002, 0.1, -0.1, -476.778)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec2 GLF_live7a = _GLF_FUZZED((vec3(52.44, -498.051, -9.6) * mat2x3(10.16, -8.7, -789.370, 308.400, -1.0, -2626.0637)));
            float GLF_live7z = _GLF_FUZZED((-(-317.880)));
            {
                GLF_live7z = GLF_live7a.x / GLF_live7a.y;
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                _GLF_color = unpackUnorm4x8(120881u);
            }
        }
        int m = (l + r) / 2;
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            break;
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                _GLF_color = normalize(_GLF_color);
            }
            {
                float GLF_live8result = _GLF_FUZZED(vec4(-462.979, -9.5, -82.81, 4.9).x);
                {
                    GLF_live8result += 0.4;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = (vec4(-2954.5698, -8.6, -1.8, 2399.6548) / vec4(-1706.5387, -1.4, 79.99, 38.12));
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = tanh(_GLF_color);
            }
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = (vec4(-5.2, -5.0, -64.28, -2607.3289) + vec4(8.7, 8.9, -8.1, 3.3));
                    }
                    _GLF_color = vec4(-64.58, 62.22, -3.8, 18.92);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = vec4(-6.4, 4.8, 17.03, -1.2);
            }
            if (_GLF_DEAD(false)) {
                return 1;
            }
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return 1;
                    }
                    _GLF_color = vec4(3069.1376, 6.0, 49.14, 370.503);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(5.2, -9.5, -2883.7361, -6682.5344);
                if (_GLF_DEAD(false)) {
                    _GLF_color = dFdyFine(_GLF_color);
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = mod(_GLF_outVarBackup_GLF_color, GLF_live2one);
                        }
                        return 1;
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            _GLF_color = _GLF_color;
        }
        {
            if (_GLF_DEAD(false)) {
                continue;
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-2.5, 728.079, -364.960, -20.49);
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)))), vec4(0.0, 1.0, round(length(normalize(vec3(1.0, 1.0, 1.0)))), 1.0)), dot(vec4(1.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)))), vec4(0.0, 1.0, round(length(normalize(vec3(1.0, 1.0, 1.0)))), 1.0))))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec3(481.038, 30.95, -738.311).grbb;
            }
        }
        if (obj.prime_numbers[m] == x) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = dFdy(vec4(-6424.7846, -9.4, -1.0, -6.7));
            }
            return m;
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    break;
                }
                int GLF_live0count = _GLF_FUZZED((true ? 15718 : (-82179)));
                int GLF_live0v = _GLF_FUZZED(-37498);
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        continue;
                    }
                    if ((GLF_live0v & 1) == 1) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (_GLF_color / _GLF_color);
                        }
                        GLF_live0v = 3 * GLF_live0v + 1;
                    } else {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, (false) && true)))))) {
                            _GLF_color = (vec4(960.839, -9393.7947, -452.432, -79.64) - vec4(-9475.9500, -15.97, 37.37, -48.40));
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        GLF_live0v /= 2;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(668.596, 1524.8387, -3.8, 56.81);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    return 1;
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-79.45, -66.18, -4.4, 3.7);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                return 1;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return 1;
                                    }
                                    _GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(-608.659, 4779.8079, -2581.7596, 1.9);
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = (mat4(-8236.7415, -38.39, 18.94, 0.9, 702.284, 2.4, -42.24, 2.6, 0.4, -9.5, 321.777, 2.8, -8.2, 8996.9789, -798.496, 34.91) * _GLF_color);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        discard;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(3621.0931, -774.895, 1695.9935, 850.517);
                        }
                    }
                    GLF_live0count++;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = vec4(vec2(97.94, 37.36), GLF_live2one, 4.4);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(length(vec2(0.0, 0.0))))))) {
                            return 1;
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, abs(0.0), 0.0)))))) {
                                _GLF_color = _GLF_color;
                            }
                            {
                                ;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = vec4(1.5, 826.190, 7.7, -84.92);
        }
        if (obj.prime_numbers[m] < x) {
            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec4(false, true, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true)), !(!(bool(bvec4(false, true, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true))))))), true && (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec4(false, true, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true)), !(!(bool(bvec4(false, true, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true)))))))))) {
                _GLF_color = tanh(_GLF_color);
            }
            l = m + 1;
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                continue;
            }
            if (_GLF_DEAD(false)) {
                return 1;
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            {
                {
                    int GLF_live8i = _GLF_FUZZED((53512));
                    float GLF_live8limit = _GLF_FUZZED(7489.1447);
                    int GLF_live8looplimiter0 = 0;
                    float GLF_live8result = _GLF_FUZZED(-7.0);
                    float GLF_live8thirty_two = _GLF_FUZZED(73.79);
                    {
                        if (GLF_live8looplimiter0 >= 5) {
                            ;
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                return 1;
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                discard;
                            }
                            _GLF_color = min(vec4(-420.027, 5203.9636, -921.293, 4.9), 6.7);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                        }
                        GLF_live8looplimiter0++;
                        {
                            if ((GLF_live8i % 32) == 0) {
                                GLF_live8result += 0.4;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = vec4(80.76, vec3(-5.6, 239.614, 64.29));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    discard;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    continue;
                                }
                            } else {
                                {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(4.4, 122.730, -5627.2097, 0.9);
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-7.8, -995.391, -31.43, 92.11);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(-2.1, 3.0, -81.16, -16.49);
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (mod(float(GLF_live8i), round(GLF_live8thirty_two)) <= 0.01) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(0.0, log(1.0)), vec2(1.0, 1.0)), _GLF_IDENTITY(dot(vec2(0.0, log(1.0)), vec2(1.0, 1.0)), clamp(dot(vec2(0.0, log(1.0)), vec2(1.0, 1.0)), dot(vec2(0.0, log(1.0)), vec2(1.0, 1.0)), dot(vec2(0.0, log(1.0)), vec2(1.0, 1.0))))))))) {
                                        return 1;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = vec4(GLF_live8limit, fma(-9.1, GLF_live8thirty_two, GLF_live8result), GLF_live8thirty_two, GLF_live8result);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            continue;
                                        }
                                    }
                                    GLF_live8result += 100.0;
                                }
                            }
                            if (float(GLF_live8i) >= GLF_live8limit) {
                                ;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                    _GLF_color = mix(_GLF_color, vec4(0.1, 5957.1013, 17.89, -8.7), clamp(GLF_live8result, -45.67, GLF_live8thirty_two));
                                }
                            }
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (vec4(963.121, 6.3, -9233.5643, 674.435) + vec4(6.0, 9960.8641, -7.5, 509.371));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        } else {
            if (_GLF_DEAD(false)) {
                {
                    if (_GLF_DEAD(false)) {
                        return 1;
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        return 1;
                    }
                    _GLF_color = mod(vec4(0.0, 3.3, 48.45, -7992.8590), vec4(-80.20, -53.36, 39.19, 5.9));
                    if (_GLF_DEAD(false)) {
                        return 1;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                discard;
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
            r = m - 1;
            if (_GLF_DEAD(false)) {
                break;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = inversesqrt(_GLF_color);
        }
    }
    return -1;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    return 1;
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (vec4(-45.82, -0.1, 9.2, -444.986) - refract(-5077.8714, 3753.8178, -807.779));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                return 1;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return 1;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = radians(vec4(-1.7, -2.3, 568.257, 9913.1237));
                    }
                }
            }
            _GLF_color = vec4(8.9, -43.52, -3812.5014, 0.5);
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-25.90, 55.23, 57.80, 975.825);
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return 1;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = dFdx(log(vec4(9.8, -83.84, -704.952, 604.209)));
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        return 1;
                    }
                }
                _GLF_color = vec4(-9.4, -381.447, -5.7, 125.251);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = fwidth((_GLF_outVarBackup_GLF_color - _GLF_outVarBackup_GLF_color));
                }
            }
        }
        return 1;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return 1;
    }
}

void main() {
    BinarySearchObject obj;
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(-6.3, 9.7, -971.924, -7955.2420);
    }
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                return;
            }
            _GLF_color = fwidth(((vec3(812.977, -373.795, -949.110) * mat4x3(512.774, 6.7, 6.5, 652.570, 424.603, 399.282, 2.8, -11.47, 5907.1915, -5595.6131, -2.4, -33.20)) * reflect(vec4(-33.34, -7.3, -98.95, -539.300), vec4(2.4, -6.9, -6752.5982, 40.46))));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                    return;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(abs(0.0)))))) {
                        _GLF_color = fwidthCoarse(_GLF_outVarBackup_GLF_color);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = reflect(abs(vec4(-438.621, -1482.3336, -35.97, 7.5)), _GLF_color);
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(0.8, -826.123, 1.7, 4.5);
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-6.3, -73.53, 9205.5279, 2.8);
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = dFdxCoarse(_GLF_outVarBackup_GLF_color);
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        _GLF_color = (-vec4(_GLF_IDENTITY(-1.2, mix(float(-1.2), float(_GLF_FUZZED(7839.8152)), bool(false))), 75.99, 91.22, -4.9));
    }
    for (int i = 0; i < 10; i++) {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_IDENTITY(atanh(vec4(-5.9, 986.766, -757.502, 612.077)), mix(vec4(_GLF_FUZZED(-3564.4542), _GLF_FUZZED((+8441.4986)), (atanh(vec4(-5.9, 986.766, -757.502, 612.077)))[2], (atanh(vec4(-5.9, 986.766, -757.502, 612.077)))[3]), vec4((atanh(vec4(-5.9, 986.766, -757.502, 612.077)))[0], (atanh(vec4(-5.9, 986.766, -757.502, 612.077)))[1], _GLF_FUZZED(179.739), _GLF_FUZZED(-9.4)), bvec4(true, true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false)));
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                break;
            }
            _GLF_color = normalize(vec4(degrees(-16.33), vec3(-18.90, -6963.7159, 4.0)[2], vec2(-84.74, -2.3)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (i == 0) {
            obj.prime_numbers[i] = 2;
            if (_GLF_DEAD(false)) {
                continue;
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    break;
                }
                _GLF_color = refract(vec4(-75.99, -7451.4024, -8979.8527, -308.621), vec4(-8.0, 2.9, 1639.9139, -8.3), 5.4);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.x >= 0.0, !(_GLF_IDENTITY(!(gl_FragCoord.x >= 0.0), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (!(gl_FragCoord.x >= 0.0))))))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = vec4(1.6, 59.86, 382.298, 307.874);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = (vec4(-697.624, -94.35, 912.415, -0.5));
            }
        } else {
            if (_GLF_DEAD(false)) {
                discard;
            }
            if (_GLF_IDENTITY(i, max(i, i)) == 1) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    discard;
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) {
                        continue;
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    discard;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            continue;
                        }
                        _GLF_color = vec4(-8.7, -854.932, -5.6, -5529.9656);
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-4906.9116, 7.9, 1.8, 8.3);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        continue;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = _GLF_color;
                        }
                        discard;
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        continue;
                    }
                    _GLF_color = vec4(-3350.2325, 32.61, -5888.7124, 6.6);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                        _GLF_color = _GLF_color;
                    }
                }
                obj.prime_numbers[i] = 3;
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = min(vec4(381.856, -433.453, _GLF_IDENTITY(-9.8, mix(float(_GLF_FUZZED(542.094)), float(-9.8), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))), -241.762), vec4(-308.137, 3.1, 2186.5449, 4.4));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(0.0, min(0.0, 0.0)))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (i == 2) {
                    obj.prime_numbers[i] = 5;
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                return;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            _GLF_color = vec4(5277.4105, -6.7, 90.72, -70.88);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = trunc(vec4(-959.048, -47.36, -2.8, 0.2));
                                }
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = dFdx(_GLF_color);
                            }
                            return;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = ldexp(log(_GLF_outVarBackup_GLF_color), ivec4(34944, -39593, 99884, 94845));
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (0.1 * vec4(3.1, vec3(-8735.7877, -9.2, 3.2)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = dFdxCoarse(mix(vec4(-5.9, _GLF_IDENTITY(350.191, 0.0 + (_GLF_IDENTITY(350.191, mix(float(350.191), float(_GLF_FUZZED(-5124.5168)), bool(false))))), 8979.2940, 8.8), vec4(-55.07, 795.905, 8347.9950, -0.8), vec4(-8.8, -3.5, 12.83, 785.430)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-872.410, 2.3, 572.901, 541.694);
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    discard;
                                }
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            break;
                        }
                    }
                } else if (i == 3) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        continue;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-38.46, -50.11, 2.6, 1.0);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                        }
                        _GLF_color = dFdy(vec4(52.90, -8043.1964, -4.1, 2975.6049));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            _GLF_color = injectionSwitch.rrrg;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-26.43, 9562.3167, -4263.0244, 2.4);
                            }
                            {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = vec4(-8.1, 2038.2012, -5.5, 57.90);
                                    }
                                    _GLF_color = sign(uintBitsToFloat(uvec4(184643u, 195989u, 66538u, 36348u)));
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        discard;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return;
                                    }
                                }
                                _GLF_color = dFdxFine(vec4(-2.6, -38.44, -2.6, 2.1));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    continue;
                                }
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    continue;
                                }
                                return;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (vec4(7392.3945, -84.10, -8.7, 2.6) / floor(GLF_live2one));
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    obj.prime_numbers[i] = 7;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return;
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = max((vec4(-2800.6083, 3.1, -48.35, 9.0) - vec4(940.777, 899.150, 35.01, 8437.7443)), vec4(-5.7, 8.6, -52.38, 972.352));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = min(_GLF_color, -44.08);
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (GLF_live2one * _GLF_color);
                        }
                        continue;
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = atanh(vec4(-5.4, -5791.6004, -8160.9844, -2.6));
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (i == 4) {
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = injectionSwitch.yyxy;
                                }
                                int GLF_live0count = _GLF_FUZZED(-25993);
                                int GLF_live0looplimiter0 = 0;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                }
                                {
                                    {
                                        float GLF_live7th = _GLF_FUZZED(8990.6131);
                                        {
                                            GLF_live7th = 1.0 - GLF_live7th;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                            discard;
                                        }
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec3(40.37, 846.579, -3892.4242).zzzy;
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = faceforward(vec4(321.255, 51.65, -73.32, 9.9), vec4(0.1, 474.934, 3.3, -6.4), _GLF_color);
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    discard;
                                }
                                int GLF_live0v = _GLF_FUZZED(-32864);
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                while (GLF_live0v > _GLF_IDENTITY(1, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? 1 : _GLF_FUZZED(95121)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (GLF_live0looplimiter0 >= 7) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                break;
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = (vec4(39.36, 45.14, 18.47, 80.24) + (421.335 - 0.8));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = mat4(88.06, 857.721, 9.5, -2113.2589, 4.7, 3807.2559, 2.2, -7.2, 36.51, 8.9, -1.5, -4655.4320, 0.6, 75.48, 0.9, 7.0)[0];
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            continue;
                                        }
                                        break;
                                    }
                                    GLF_live0looplimiter0++;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = mix(vec4(859.683, 88.68, -39.86, 6.0), _GLF_color, vec4(-15.85, -1.4, 2.3, -2478.5766));
                                    }
                                    {
                                        if ((GLF_live0v & 1) == 1) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(968.927, -99.04, 6.1, 3239.7236);
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = (33.15 + vec4(-95.80, 803.672, -3.9, 65.58));
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = (smoothstep(GLF_live2one, -47.81, vec4(99.54, -7.8, 7573.8651, 84.96)));
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            }
                                            GLF_live0v = 3 * GLF_live0v + _GLF_IDENTITY(1, (0 >> _GLF_IDENTITY(int(2), int(2))) | (1));
                                        } else {
                                            GLF_live0v /= 2;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(_GLF_IDENTITY(dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0)))))))) {
                                                discard;
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = vec4(-58.00, 808.678, -44.26, -7288.6119);
                                        }
                                        GLF_live0count++;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = atanh(degrees(vec4(6.9, 7.7, -42.78, -7.3)));
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = (-(atan(vec2(-73.02, 6241.9584), resolution) * (mat4x2(-1.6, -2.6, -2.0, 4880.8132, -3176.1081, -41.00, 75.99, -22.71) + (-7835.9143))));
                                }
                                discard;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                _GLF_color = vec4(-45.94, -64.74, -672.255, -4.8);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(_GLF_IDENTITY(!(true), bool(bvec4(!(true), true, false, true))))))) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                }
                            }
                            _GLF_IDENTITY(_GLF_color = sinh(mat3x4(939.942, 29.28, -890.783, 4.8, -10.77, -972.440, 29.73, 15.20, -48.64, 831.532, 6.1, -894.954)[1]), (false ? _GLF_FUZZED(mod(_GLF_color, GLF_live2one)) : (_GLF_color = sinh(mat3x4(939.942, 29.28, -890.783, 4.8, -10.77, -972.440, 29.73, 15.20, -48.64, 831.532, 6.1, -894.954)[1]))));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = radians(vec4(5.3, 8.3, 5.4, -82.64));
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = max(vec4(-2.4, 8.3, -1817.1846, -2.8), -96.39);
                        }
                        _GLF_IDENTITY(obj.prime_numbers[i] = 11, (obj.prime_numbers[i] = 11) | 0);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-9304.9388, 8.3, -94.34, 6177.5727);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = vec4(99.22, 4.6, -338.071, -677.381);
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = (injectionSwitch * (+mat4x2(-143.303, -1.7, -356.198, 7.3, 5.9, -412.856, 9.9, 1.8)));
                            }
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = fwidthFine(vec4(-9068.9680, 8.3, -69.81, 7.1));
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                            if (_GLF_DEAD(false)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = ceil(vec4(-9766.7027, -1.4, 1.8, 673.848));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))))))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        break;
                                    }
                                    _GLF_color = vec4(GLF_live2one, vec3(6.8, -806.525, 3068.3350));
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, false))))) {
                                    _GLF_color = _GLF_color;
                                }
                                continue;
                            }
                        }
                        {
                            vec3 GLF_live9color = _GLF_FUZZED(vec3(248.775, -89.57, 8.7));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = mod(_GLF_color, vec4(3053.7970, 4822.1711, -9534.5063, -0.6));
                            }
                            vec2 GLF_live9uv = _GLF_FUZZED((vec3(6294.3697, 889.674, -701.609) * mat3(-4505.9854, -4647.6451, 4.1, -1387.6006, 6.6, -0.3, 2.9, 977.618, 7.6)).sp);
                            if (GLF_live9uv.y > (1.0 / 4.0)) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = (_GLF_color + (-257.064));
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                GLF_live9color.x += float(GLF_live9obj.numbers[5]);
                            }
                        }
                        if (_GLF_IDENTITY(_GLF_DEAD(false), true && (_GLF_DEAD(false)))) {
                            discard;
                        }
                        if (i == 5) {
                            obj.prime_numbers[i] = 13;
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = ((vec3(-7.4, -486.606, 24.14) * GLF_live2m33) * mat4x3(-555.861, -4.3, 479.880, -9378.4690, 1.7, 6.0, -6549.0939, -0.6, 80.70, -55.96, 773.219, -5.4));
                                }
                                _GLF_color = reflect(vec4(7.5, 38.36, -14.45, 309.929), tanh(vec4(-9.7, 6.0, 4.1, -8787.2489)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = (_GLF_color - vec4(11.84, -3.4, 424.094, 730.475));
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = mod(vec4(-2.5, -9.6, 7.0, -70.07), GLF_live2one);
                            }
                        } else if (i == 6) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            obj.prime_numbers[i] = 17;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (vec4(60.29, 5474.0919, -3.8, 456.634));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                _GLF_color = vec4(-12.75, float(61333u), dFdyFine(vec2(0.4, -4.3)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = faceforward(vec4(-498.503, 2.4, 6971.2515, 1472.9046), vec4(-413.382, -952.183, 72.87, 5.1), vec4(-6.3, 7.2, -83.62, 5521.8099));
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)))))) {
                                return;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(722.315, 5.0, 54.10, 8995.6367);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(9.8, 6206.5848, -7.9, 700.783);
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = vec4(5.3, 2.6, -20.22, -9.3);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                continue;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                discard;
                            }
                        } else if (i == 7) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = exp(_GLF_color);
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (vec2(8.3, -7.5) * mat4x2(mat4x3(-30.14, -7.9, 51.95, -0.3, -5.1, 1.4, 2.6, -8.5, 2.8, -905.534, -4.8, -3.0)));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(round(GLF_live2one), vec3(3.4, 41.08, -8.3));
                                }
                                break;
                            }
                            obj.prime_numbers[i] = 19;
                            {
                                float GLF_live7th = _GLF_FUZZED((+647.776));
                                vec2 GLF_live7v = _GLF_FUZZED((vec2(-5829.0744) * vec2(-10.82, -4.0)));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = max(vec4(-9.9, 7.5, 73.04, 90.45), inversesqrt(vec4(-67.22, -2029.6714, 6.0, 8.3)));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (GLF_live7v.x < 0.0) {
                                    GLF_live7th = 1.0 - GLF_live7th;
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, true))))) {
                                discard;
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        _GLF_color = log(vec4(2262.1081, -62.06, -7922.7708, -83.43));
                                    }
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-2270.1254, 1.1, -80.14, 45.10);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                discard;
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = smoothstep(_GLF_outVarBackup_GLF_color, vec4(-966.390, 468.009, 2.0, 4.2), vec4(-4.6, 679.346, -18.80, -7334.5822));
                                            }
                                        }
                                    }
                                    _GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0))))))) {
                                    return;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = fwidth(_GLF_color);
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = max(_GLF_outVarBackup_GLF_color, unpackUnorm4x8(50387u));
                                }
                                _GLF_color = reflect(vec4(-766.329, -7720.1636, 558.769, 497.954), vec4(9.6, 314.036, -76.86, -704.255));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, exp(0.0), 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, exp(0.0), 1.0))))))) {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        _GLF_color = mat3x4(1.4, 9.8, 40.64, 1858.7621, -713.851, 1665.2469, -987.811, -2.3, -64.79, 5.4, 41.82, 4478.0175)[1];
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = tanh(_GLF_outVarBackup_GLF_color);
                                        }
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        _GLF_color = vec4(-4.4, -2984.1166, -40.46, -67.94);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(1.0, 1.0, abs(0.0)), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, abs(0.0)), vec3(0.0, 0.0, 1.0))))))) {
                                                return;
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                continue;
                                            }
                                            {
                                                int GLF_live8i = _GLF_FUZZED(((-58327) | (-68544)));
                                                {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = injectionSwitch.xxyx;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            continue;
                                                        }
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = smoothstep(-12.90, -542.385, vec4(-441.012, 295.740, 8.1, -7.7));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, false, true, false))))) {
                                                            _GLF_color = floor(_GLF_color);
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = (true, _GLF_color);
                                                    }
                                                }
                                                float GLF_live8limit = _GLF_FUZZED(vec2(2742.2161, -332.315).x);
                                                int GLF_live8looplimiter0 = 0;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = tan(_GLF_color);
                                                        }
                                                        discard;
                                                    }
                                                    continue;
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                        return;
                                                    }
                                                }
                                                float GLF_live8result = _GLF_FUZZED(float(-88648));
                                                float GLF_live8thirty_two = _GLF_FUZZED((vec3(41.89, -3177.2588, -7651.5164) * (-1.8)).z);
                                                {
                                                    if (GLF_live8looplimiter0 >= 5) {
                                                        ;
                                                    }
                                                    GLF_live8looplimiter0++;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = normalize(vec4(-7.4, 5070.3562, -9.2, -9.4));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            continue;
                                                        }
                                                    }
                                                    {
                                                        if ((GLF_live8i % 32) == 0) {
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                            }
                                                            GLF_live8result += 0.4;
                                                        } else {
                                                            if (mod(float(GLF_live8i), round(GLF_live8thirty_two)) <= 0.01) {
                                                                GLF_live8result += 100.0;
                                                            }
                                                        }
                                                        if (float(GLF_live8i) >= GLF_live8limit) {
                                                            ;
                                                            if (_GLF_DEAD(false)) {
                                                                break;
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                _GLF_color = reflect(ldexp(_GLF_color, ivec4(77114, 27486, -8996, -22373)), _GLF_outVarBackup_GLF_color);
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = sinh((_GLF_color / GLF_live8result));
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                }
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = atanh(vec4(-0.9, -2.4, -1.8, 30.94));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = vec4(-5497.0940, 974.453, -3.3, -0.0);
                                                            }
                                                            break;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = clamp(vec4(-498.840, 9.2, 5.3, 37.18), _GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color);
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else if (i == 8) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = _GLF_color;
                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, true))))) {
                                    _GLF_color = log(vec4(-8195.9522));
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(3.4, -1.0, -0.1, -8598.5209);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(2.9, -7.0, 0.9, 123.335);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch, clamp(_GLF_IDENTITY(injectionSwitch, (injectionSwitch) - vec2(0.0, 0.0)), injectionSwitch, injectionSwitch)).x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        return;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, false))))) {
                                        continue;
                                    }
                                    continue;
                                }
                                _GLF_color = vec4(6.7, -5.2, 7795.8135, 3.6);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                break;
                            }
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(-4.9, -7.3, 395.432, -669.784);
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = fwidthFine(tan(vec4(5429.0971, -7.0, 8.1, 4.0)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            return;
                                        }
                                        _GLF_color = _GLF_color;
                                    }
                                }
                            }
                            obj.prime_numbers[i] = 23;
                        } else if (i == 9) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(3572.7458, -3269.6158, 2479.2857, 5842.5892);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            obj.prime_numbers[i] = 29;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(7.5, -8.6, 35.63, 1180.4871);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                continue;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = max(_GLF_color, vec4(5663.9021, -9.8, -84.54, 928.808));
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            continue;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = trunc(vec4(-6.4, -2.0, -2.7, -44.72));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                continue;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(7558.0884, 1.4, -21.40, 236.095);
        }
    }
    vec2 uv = (gl_FragCoord.xy / resolution.x) * vec2(resolution.x / resolution.y, 1.0);
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(148.146, 27.38, 573.962, 3.4);
    }
    vec2 b = _GLF_IDENTITY(brick(uv * 7.0), (_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))) ? _GLF_FUZZED(vec2(-3.4, 360.668)) : _GLF_IDENTITY(brick(uv * 7.0), (false ? _GLF_FUZZED(vec2(-7.6, -18.43)) : brick(uv * 7.0)))));
    vec3 color = vec3(patternize(b));
    if (_GLF_DEAD(false)) {
        _GLF_color = intBitsToFloat(((ivec4(17424, 90281, 91864, 76762) / ivec4(99490, 50422, 76852, -5752)) % ivec4(36796, 99294, 15294, 12658)));
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = ceil(_GLF_color);
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(514.884, -575.203, -6872.0023, 4.4);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (gl_FragCoord.y < resolution.y / _GLF_IDENTITY(1.1, clamp(1.1, 1.1, 1.1))) {
        if (_GLF_IDENTITY(binarySearch(obj, obj.prime_numbers[_GLF_IDENTITY(4, (4) | (4))]) != -(int(resolution.y)) && binarySearch(obj, obj.prime_numbers[0]) >= -(int(resolution.x)), true && (binarySearch(obj, obj.prime_numbers[_GLF_IDENTITY(4, (4) | (4))]) != -(int(resolution.y)) && binarySearch(obj, obj.prime_numbers[0]) >= -(int(resolution.x))))) {
            {
                {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    float GLF_live5th = _GLF_FUZZED(((-40.26) + (-(-953.034))));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return;
                    }
                    vec2 GLF_live5v = _GLF_FUZZED(vec2(46.35, 6.6));
                    if (_GLF_DEAD(false)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = vec4(2.6, 31.55, -9.9, 719.064);
                                }
                                return;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = (vec3(-6.9, -75.40, -5.6) * mat4x3(8555.7180, -11.54, -91.83, 56.59, 15.83, 9320.9634, -9.9, 7.5, -52.56, 918.075, 900.321, 2940.1021));
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = _GLF_color;
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = vec4(79.28, 3.5, 4.4, -31.98);
                            }
                            _GLF_color = mix(vec4(-2.4, 8.7, -86.43, 583.984), radians((vec4(2.3, 10.75, 7.5, -956.978) / 0.1)), bvec4(true, false, false, false));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(-8.8, 474.394, -0.3, -7369.5090);
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = vec4(pow(mod(GLF_live5v, uv), GLF_live5v), vec2(-36.64, 81.20));
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = vec4(-99.53, -66.79, -4.1, 4880.1959);
                            }
                        }
                        return;
                    }
                    if (GLF_live5v.y < 0.0) {
                        GLF_live5th = -GLF_live5th;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = normalize(_GLF_color);
                }
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = vec4(64.75, 9068.0434, 5.5, -5.8);
                    }
                }
                {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = min(_GLF_color, GLF_live2one);
                    }
                    vec3 GLF_live8c = _GLF_FUZZED((-vec3(-175.102, 324.749, 23.36)));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return;
                    }
                    int GLF_live8i = _GLF_FUZZED((~int((false == true))));
                    {
                        if (GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 3)] >= 1.0) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 3)] = GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 3)] * GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 3)];
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = vec4(min(GLF_live2one, GLF_live2one), GLF_live8c);
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = (false ? vec4(-818.509, 62.98, -57.07, 78.24) : _GLF_color);
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = atan(_GLF_color, vec4(197.460, -662.712, -9.0, -22.32));
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            _GLF_color = vec4(vec2(381.302, -9.9), acosh(vec2(9810.0654, -2.3)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = fract(vec4(39.12, -83.38, -7.3, -5673.8494));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(radians(-22.85), -99.44, vec2(-7393.9963, 453.376));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            _GLF_color = fwidthFine((_GLF_color / vec4(-3.7, -8.5, -69.30, 5.3)));
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(4.3, 932.658, -3489.8409, 87.46);
                            }
                            return;
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-4.5, -936.769, 21.73, 0.1);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            return;
                        }
                        _GLF_color = vec4(264.815, 0.5, -4.5, 7100.1975);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                    _GLF_color = fwidthFine(vec4(-9704.6237, -3999.7696, -8050.2797, -255.661));
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(589.949, 2.9, 2.6, 0.5);
                        }
                        return;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(refract(9708.1358, GLF_live2one, GLF_live2one));
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = _GLF_color;
                        }
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, vec4(_GLF_IDENTITY(mat2x4(_GLF_color, _GLF_IDENTITY(dot(vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 0.0))), 1.0, 0.0, 0.0), mat2x4(_GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x)) + (mat2x4(_GLF_color, _GLF_IDENTITY(dot(vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 0.0))), 1.0, 0.0, 0.0)))));
                _GLF_color = (acosh(vec4(1.5, -9.7, 5675.6637, -972.434)) / 391.714);
                {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    vec2 GLF_live7a = _GLF_FUZZED(vec2(-6.3, 6.0));
                    float GLF_live7z = _GLF_FUZZED((5821.7242 * 0.2));
                    {
                        GLF_live7z = GLF_live7a.x / GLF_live7a.y;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(exp(resolution), injectionSwitch);
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = step(GLF_live2one, (_GLF_outVarBackup_GLF_color + GLF_live2one));
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
            color.yz -= dot(float(binarySearch(obj, obj.prime_numbers[4])), float(binarySearch(obj, obj.prime_numbers[0])));
        } else {
            discard;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = dFdyCoarse(_GLF_outVarBackup_GLF_color);
                }
                _GLF_color = unpackUnorm4x8(94104u);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = mix(vec4(-5.1, -185.669, 5784.5171, 8.5), _GLF_color, _GLF_color);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = vec4(6.2, 70.65, 0.4, 64.05);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(2194.2191, 8.6, -5.9, 8824.7792);
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-5005.2786, -2.0, -0.9, -4.6);
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
        }
        if (binarySearch(obj, 1) == -1) {
            {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    _GLF_IDENTITY(_GLF_color = _GLF_color, (_GLF_color = _GLF_color) - vec4(0.0, 0.0, 0.0, 0.0));
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = log(vec4(897.524, -630.700, -1.9, -30.10));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return;
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                    _GLF_color = ((-6853.0335) * vec4(19.59, -2929.3813, -7147.7865, 22.39));
                }
                _GLF_color = vec4(-829.828, -8.9, -_GLF_IDENTITY(419.402, max(_GLF_IDENTITY(419.402, (419.402) / 1.0), _GLF_IDENTITY(419.402, max(419.402, 419.402)))), -77.36);
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (-smoothstep(vec4(0.7, -53.69, 2.5, 789.962), _GLF_outVarBackup_GLF_color, _GLF_color));
                            }
                            return;
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = clamp(vec4(10.53, 390.597, 9939.3630, 77.30), 3.3, -2.2);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                        _GLF_color = clamp(clamp(vec4(4687.5595, 2100.3306, -250.064, 1.7), _GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color), _GLF_color, vec4(-2.9, 3.9, 31.43, 0.1));
                    }
                    return;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(0.1, 2.2, -718.375, -9.1);
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            discard;
            if (_GLF_DEAD(false)) {
                return;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = vec4(8.5, 633.408, -5.6, 25.70);
                    if (_GLF_DEAD(false)) {
                        return;
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-118.136, -8.5, -6.5, 395.285);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(41.65, 9537.5871, 8568.0694, 4.2);
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            return;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-6.7, 7.7, 54.00, 6081.3503);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        } else {
            color.yz += color.yz;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
            _GLF_color = step(vec4(742.614, 73.92, 8645.9034, -68.10), vec4(1.7, -87.42, -9.0, -6.3));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
        return;
    }
    _GLF_color = vec4(color, injectionSwitch.y);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        _GLF_IDENTITY(_GLF_color = vec4(-3.4, -1.6, -69.43, 6.0), (true ? (_GLF_color = vec4(-3.4, -1.6, -69.43, 6.0)) : _GLF_FUZZED(vec4(870.093, -3.6, -20.13, 4077.5329))));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}
