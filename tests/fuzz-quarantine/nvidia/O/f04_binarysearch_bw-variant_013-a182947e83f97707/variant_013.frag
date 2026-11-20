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
        _GLF_color = vec4(vec2(vec3(5.6, 572.886, -702.022)), vec2(-2928.6715, -46.28));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-22.87, -976.056, -47.98, -7793.2168);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    int a = 4;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(2.7, -8896.1265, 9402.7917, -618.169);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    do {
        uv.y -= _GLF_IDENTITY(step(injectionSwitch.y, uv.x), (true ? step(injectionSwitch.y, uv.x) : _GLF_FUZZED(-9037.0520)));
        uv.x -= fract(tanh(uv.x)) / ldexp(injectionSwitch.y, _GLF_IDENTITY(findMSB(a), ~(~(findMSB(a)))));
        a--;
    } while (a > int(injectionSwitch.x));
    int b = 3;
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = (vec4(-39.98, _GLF_IDENTITY(42.65, 0.0 + (42.65)), -_GLF_IDENTITY(3.7, (3.7) * 1.0), -706.046) - tanh(_GLF_color));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = atan(smoothstep(vec4(-1.8, 3.1, 39.41, -147.400), vec4(8403.2191, -4908.1644, 7.5, 54.80), vec4(-9.9, 38.04, 8.2, -424.646)));
        }
        uv.y -= step(injectionSwitch.y, uv.x) + _GLF_IDENTITY(float(a), _GLF_IDENTITY((true ? float(a) : _GLF_FUZZED(216.899)), _GLF_IDENTITY(float(_GLF_IDENTITY(mat2x4((true ? float(a) : _GLF_FUZZED(216.899)), 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0), transpose(transpose(mat2x4((true ? float(a) : _GLF_FUZZED(216.899)), 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0))))), (false ? _GLF_FUZZED(46.14) : float(_GLF_IDENTITY(mat2x4((true ? float(a) : _GLF_FUZZED(216.899)), 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0), transpose(transpose(mat2x4((true ? float(a) : _GLF_FUZZED(216.899)), 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0)))))))));
        uv.x *= (isnan(uv.y) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(vec2(-0.4, 1504.0536), (554.173 + vec2(1067.1110, -53.94)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        b--;
    } while (b > int(injectionSwitch.x));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (mix(vec4(-3758.4192, 26.68, -3.1, 72.56), vec4(-14.29, 7.7, 860.834, 31.10), vec4(-28.21, 9213.3347, -8.5, -537.038)) * fwidthFine(0.2));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_color = asin(vec4(-4574.4278, 5.8, -9.3, 9.3));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-547.501, -97.89, 220.782, -9930.4379);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = roundEven(vec4(-596.698, -6476.6225, -4.8, 9529.8049));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = vec4(14.75, -1.1, -15.85, 1103.9859);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(7.2, 94.74, 81.19, -8.4);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = atan(vec4(-9797.3709, 2.2, 959.742, 664.721));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (mat3x4(3810.7851, -2.7, 0.8, 520.562, 1.7, 553.423, 876.566, -5.3, 7416.4249, -41.94, -0.0, -9.0) * vec3(-35.84, 81.08, 2.4));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        do {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_color = _GLF_outVarBackup_GLF_color));
            }
        } while (_GLF_WRAPPED_LOOP(false));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(0.3, -989.619, -1330.2344, -648.450);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (true)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(41.97, -2344.6145, 719.916, 259.800);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    int c = 2;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = mix(pow(vec4(9.1, 77.31, 819.774, 448.873), vec4(-790.111, -21.36, -1574.9706, 2079.3078)), (-vec4(-68.34, 8.3, -119.802, 4684.0562)), sign(5.9));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(6315.3325, 996.872, 4.3, -34.28);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = vec4(3365.5982, 963.189, 32.32, 15.56);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_color = asinh(vec4(-5.2, -617.969, 3.9, -6.1).ywxx);
        if (_GLF_DEAD(false)) {
            _GLF_color = reflect(_GLF_outVarBackup_GLF_color, vec4(-74.60, 1821.1878, -5.0, 328.563));
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    do {
        switch (_GLF_SWITCH(_GLF_IDENTITY(_GLF_IDENTITY(0, _GLF_IDENTITY((0) * 1, 0 ^ ((0) * 1))), (_GLF_IDENTITY(0, _GLF_IDENTITY((0) * 1, 0 ^ ((0) * 1)))) | (_GLF_IDENTITY(0, _GLF_IDENTITY((0) * 1, 0 ^ ((0) * 1))))))) {
            case 19:
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-31.03, 935.906, -5726.7132, -7.0);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = trunc(vec4(5.6, -7812.5849, -582.537, 5550.8109));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                resolution;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-9.3, 0.9, 1.3, -98.02);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            case 0:
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    do {
                        _GLF_color = sinh(vec4(4.7, -70.83, 794.401, 8215.8341));
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = reflect(((mat4(5080.7347, -3358.6759, -23.65, 6.9, -69.87, 3.1, 6.4, 62.76, 7.0, -37.94, -28.93, 2471.8905, 4636.6566, -870.777, -3684.0136, 36.17) - mat4(-69.19, 6.1, -43.01, -4.6, -948.049, 61.49, -6930.6816, 4.7, -393.616, 6.8, 3.9, 3614.8418, -7150.1193, 95.77, 41.01, -1.5)) * vec4(-2718.4514, 4.3, 93.59, -7.8)), vec4(352.318, -3.0, -28.59, -6974.8312));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-7157.9029, -53.10, 622.114, -7.1);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-1956.7925, 9.9, -773.348, 63.59);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-338.199, 8897.4892, 4049.7466, -726.766);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            case 46:
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(875.542, -7.1, -47.33, 1236.1217);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            case 78:
                uv.y -= step(injectionSwitch.y, _GLF_IDENTITY(uv, clamp(uv, _GLF_IDENTITY(uv, _GLF_IDENTITY(vec2(vec4(uv, 1.0, 0.0)), max(vec2(vec4(uv, 1.0, 0.0)), vec2(vec4(uv, 1.0, _GLF_IDENTITY(0.0, 0.0 + (_GLF_IDENTITY(0.0, min(0.0, 0.0))))))))), uv)).x) + float(a) + float(b);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(185.581, _GLF_IDENTITY(59.48, mix(float(_GLF_FUZZED(8.1)), float(59.48), bool(true))), 7314.3901, 0.9);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        switch (_GLF_SWITCH(0)) {
                            case 0:
                            case 18:
                            case 69:
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = cos(vec4(6458.6447, 2.8, -78.52, 47.87));
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(intBitsToFloat(ivec3(-49335, -96165, 1657)), sqrt(839.576));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            case 22:
                            case 68:
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                break;
                            case 26:
                                (uvec3(140672u, 59470u, 166294u), (-mat2x4(-0.7, -68.35, 8108.9553, -746.077, -56.75, 9.9, -7.2, -7165.0251)));
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = smoothstep(_GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color);
                                }
                            case 59:
                                return dFdxFine(resolution);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                            default:
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(step(-555.440, -3.7), 93.94, mix(6259.8092, 2672.1805, false), vec2(-85.17, -248.572).x);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                1;
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(555.151, -72.70, 2.8, 3450.7665);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            case 82:
            case 22:
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-7.8, -6.5, 4117.8597, 7294.9101);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-30.86, 3172.8128, 1.6, -9.0);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            case 2:
                uv.x += ldexp(injectionSwitch.y, isinf(uv.y + _GLF_IDENTITY(uv.x, min(_GLF_IDENTITY(uv.x, mix(float(_GLF_FUZZED(-188.977)), _GLF_IDENTITY(float(uv.x), max(_GLF_IDENTITY(float(uv.x), min(float(uv.x), float(uv.x))), _GLF_IDENTITY(float(uv.x), clamp(float(uv.x), float(uv.x), float(uv.x))))), bool(true))), _GLF_IDENTITY(uv.x, (false ? _GLF_FUZZED(_GLF_IDENTITY(0.0, min(0.0, 0.0))) : uv.x))))) ? findMSB(b) : findMSB(a));
            case 79:
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-285.906, -75.82, 57.70, 46.29);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = dFdxCoarse(vec4(9.8, 8.8, 12.02, -1.2));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch, (injectionSwitch) * mat2(1.0)).y)), true && (_GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch, (injectionSwitch) * mat2(1.0)).y)))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = mod(uintBitsToFloat(uvec4(33495u, 155663u, 184369u, 48589u)), -9095.4235);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (vec3(-0.4, 3864.9570, 1.2) * mat4x3(-48.20, -9.3, -29.12, 76.69, -4.9, -4106.4545, 3.8, -0.2, 90.91, -3.9, -780.240, -13.35));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec3(77.17, -8.3, 992.679).stpp / (-69.64));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            case 33:
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = asinh(vec4(-4890.2240, 440.367, -81.18, 42.57));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(8.8, -1.7, -1.1, -898.832);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat4(sqrt(0.0), determinant(mat3(1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0)), sin(0.0), _GLF_ZERO(0.0, injectionSwitch.x), 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = mat3x4(-72.32, 36.44, -33.30, -2.9, 1.6, 7.6, 95.92, -603.653, 683.629, -101.391, -3359.9983, 1.0)[2];
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = unpackUnorm4x8(27796u);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                c--;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = vec4(48.74, -8381.7670, 117.082, -7.6);
                }
                break;
            case 58:
                return (mat2(4.1, 6313.2693, -599.371, -5.0) * resolution);
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(2796.9978, -3.9, -9.4, 1.5);
                }
            case 90:
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4((vec2(1.8, -105.423) * vec2(vec4(-11.55, -1735.1135, 2228.2413, 7.3))), vec2(-8.1, -5.8));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-9052.6490, -4.7, 2453.0167, -95.64);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                mat4 _GLF_SWITCH_0_0v[45], _GLF_SWITCH_0_1v[18];
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(88.58, -534.822, -616.234, -9694.0362);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-973.889, -8.6, -6844.5077, -52.64);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = dFdyFine(unpackUnorm4x8(153138u));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            default:
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = clamp(vec4(5.8, -7399.2408, -35.33, -4.3), (vec4(-61.72, 48.77, 14.20, -9007.9482)), fwidthCoarse(vec4(4914.8615, 2895.5183, -3.4, -4835.8490)));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                1;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = intBitsToFloat(ivec4(-71971, 99928, -66324, -88634));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
        }
    } while (c > int(injectionSwitch.x));
    int d = 1;
    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), int(ivec3(int(7), 0, 1))))) >> _GLF_IDENTITY(int(7), int(7))); _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), (int(_GLF_ZERO(0.0, injectionSwitch.x))) - 0)); _injected_loop_counter--) {
        do {
            uv.y -= _GLF_IDENTITY(_GLF_IDENTITY(_GLF_IDENTITY(step(injectionSwitch.y, uv.x) + float(a), min(_GLF_IDENTITY(step(injectionSwitch.y, uv.x) + float(a), float(mat3(step(injectionSwitch.y, uv.x) + float(a), 0.0, 0.0, 0.0, abs(1.0), 0.0, 1.0, 0.0, 1.0))), step(injectionSwitch.y, uv.x) + float(a))) + float(b), mix(float(_GLF_FUZZED(992.641)), float(_GLF_IDENTITY(step(injectionSwitch.y, uv.x) + float(a), min(_GLF_IDENTITY(step(injectionSwitch.y, uv.x) + float(a), float(mat3(step(injectionSwitch.y, uv.x) + float(a), 0.0, 0.0, 0.0, abs(1.0), 0.0, 1.0, 0.0, 1.0))), step(injectionSwitch.y, uv.x) + float(a))) + float(b)), bool(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))) + float(c), mix(float(_GLF_IDENTITY(_GLF_IDENTITY(step(injectionSwitch.y, uv.x) + float(a), min(_GLF_IDENTITY(step(injectionSwitch.y, uv.x) + float(a), float(mat3(step(injectionSwitch.y, uv.x) + float(a), 0.0, 0.0, 0.0, abs(1.0), 0.0, 1.0, 0.0, 1.0))), step(injectionSwitch.y, uv.x) + float(a))) + float(b), mix(float(_GLF_FUZZED(992.641)), float(_GLF_IDENTITY(step(injectionSwitch.y, uv.x) + float(a), min(_GLF_IDENTITY(step(injectionSwitch.y, uv.x) + float(a), float(mat3(step(injectionSwitch.y, uv.x) + float(a), 0.0, 0.0, 0.0, abs(1.0), 0.0, 1.0, 0.0, 1.0))), step(injectionSwitch.y, uv.x) + float(a))) + float(b)), bool(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))) + float(c)), float(_GLF_FUZZED(0.6)), bool(false)));
            d--;
        } while (d > int(injectionSwitch.x));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-17.61, -0.2, 285.031, 30.21);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
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
        _GLF_color = vec4(2.7, 4151.5531, -6.2, 11.60);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), false || (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-5.0, 6.4, -4.9, 7.5);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    return fract(uv);
}

float patternize(vec2 uv) {
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(4.8, 36.28, -1.2, -6.6);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_color = vec4(-2656.5758, -43.24, 284.524, 770.286);
    }
    vec2 size = vec2(0.45);
    vec2 st = step(size, uv);
    switch (int(mod(gl_FragCoord.y, 5.0))) {
        case 0:
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = step(5.0, vec4(8766.3990, 279.684, -9.2, -982.117));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = dFdx(vec4(-113.126, 347.287, -7.4, -198.549));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = _GLF_IDENTITY((vec4(-8.4, _GLF_IDENTITY(11.57, max(_GLF_IDENTITY(11.57, max(11.57, 11.57)), 11.57)), -8.0, -6901.0236) * mat4(7.5, _GLF_IDENTITY(-2738.0752, float(mat2x3(-2738.0752, 0.0, 1.0, 1.0, abs(1.0), 0.0))), _GLF_IDENTITY(_GLF_IDENTITY(-0.8, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? (-0.8) : _GLF_FUZZED(length(vec3(-52.23, 81.89, 8720.0351))))), clamp(_GLF_IDENTITY(_GLF_IDENTITY(-0.8, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? (-0.8) : _GLF_FUZZED(length(vec3(-52.23, 81.89, 8720.0351))))), (_GLF_IDENTITY(-0.8, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? (-0.8) : _GLF_FUZZED(length(vec3(-52.23, 81.89, 8720.0351)))))) - 0.0), _GLF_IDENTITY(-0.8, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? (-0.8) : _GLF_FUZZED(length(vec3(-52.23, 81.89, 8720.0351))))), _GLF_IDENTITY(-0.8, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? (-0.8) : _GLF_FUZZED(length(vec3(-52.23, 81.89, 8720.0351))))))), 70.18, -55.18, 788.921, -8172.3191, 581.716, 564.910, 4.6, -70.67, 0.9, -7277.4036, 626.188, 59.00, 62.63)), ((vec4(-8.4, _GLF_IDENTITY(11.57, max(_GLF_IDENTITY(11.57, max(11.57, 11.57)), 11.57)), -8.0, -6901.0236) * mat4(7.5, _GLF_IDENTITY(-2738.0752, float(mat2x3(-2738.0752, 0.0, 1.0, 1.0, abs(1.0), 0.0))), _GLF_IDENTITY(_GLF_IDENTITY(-0.8, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? (-0.8) : _GLF_FUZZED(length(vec3(-52.23, 81.89, 8720.0351))))), clamp(_GLF_IDENTITY(_GLF_IDENTITY(-0.8, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? (-0.8) : _GLF_FUZZED(length(vec3(-52.23, 81.89, 8720.0351))))), (_GLF_IDENTITY(-0.8, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? (-0.8) : _GLF_FUZZED(length(vec3(-52.23, 81.89, 8720.0351)))))) - 0.0), _GLF_IDENTITY(-0.8, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? (-0.8) : _GLF_FUZZED(length(vec3(-52.23, 81.89, 8720.0351))))), _GLF_IDENTITY(-0.8, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? (-0.8) : _GLF_FUZZED(length(vec3(-52.23, 81.89, 8720.0351))))))), 70.18, -55.18, 788.921, -8172.3191, 581.716, 564.910, 4.6, -70.67, 0.9, -7277.4036, 626.188, 59.00, 62.63))) + vec4(0.0, 0.0, 0.0, 0.0));
            }
            return mix(pow(_GLF_IDENTITY(st.x, (true ? _GLF_IDENTITY(st.x, (st.x) * 1.0) : _GLF_FUZZED(log2(dFdx(-7227.3691))))), injectionSwitch.y), _GLF_IDENTITY(st.x, max(st.x, st.x)), size.y);
            break;
        case 1:
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = sqrt(vec4(94.95, 118.147, -93.36, -9.1));
            }
            return mix(pow(uv.y, injectionSwitch.y), st.y, size.x);
            break;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-3.4, -8905.0776, 4.3, 559.278);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        case 2:
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-9.4, -839.570, 5.7, 3349.5083);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(dFdyCoarse(vec3(974.435, 8157.9709, 97.22)), refract(6985.7951, -2.7, -1314.3249));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    switch (_GLF_SWITCH(0)) {
                        case 0:
                        case 22:
                        case 13:
                        case 97:
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            break;
                        default:
                            1;
                    }
                }
            }
            discard;
            break;
        case 3:
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(5822.7575, -6091.4585, -25.04, 8.5);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            return mix(pow(uv.y, _GLF_IDENTITY(injectionSwitch.y, mix(float(_GLF_FUZZED(85.33)), float(_GLF_IDENTITY(injectionSwitch.y, (false ? _GLF_FUZZED(199.806) : injectionSwitch.y))), bool(true)))), uv.y, size.y);
            break;
        case 4:
            return mix(_GLF_IDENTITY(pow(_GLF_IDENTITY(st.y, float(mat2x4(st.y, abs(abs(1.0)), 1.0, length(vec2(0.0, 0.0)), 0.0, 1.0, 1.0, 1.0))), injectionSwitch.y), mix(float(_GLF_FUZZED(3433.3464)), float(pow(_GLF_IDENTITY(st.y, float(mat2x4(_GLF_IDENTITY(st.y, clamp(_GLF_IDENTITY(st.y, clamp(st.y, st.y, st.y)), st.y, st.y)), abs(abs(1.0)), 1.0, length(vec2(0.0, 0.0)), 0.0, 1.0, 1.0, 1.0))), injectionSwitch.y)), bool(true))), st.x, size.x);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(5621.2617, 7.8, -5.5, 277.815);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = asinh(vec4(17.54, -846.686, 7.8, -331.705));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (vec4(-6.4, -1.8, 758.080, 73.04) / asin(vec4(-2.7, 8215.8495, 0.5, 860.915)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = vec4(15.82, vec2(-153.483, 95.48), -0.7);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    do {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (+vec4(cross(vec3(8.9, -50.72, 124.634), vec3(7.1, 7705.4116, -23.28)), ceil(-63.01)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = atanh(log2(vec4(-7.3, 50.73, -49.41, 754.240)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            break;
    }
}

int binarySearch(BinarySearchObject obj, int x) {
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-4.6, 4020.6515, 326.229, -6.6);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = inversesqrt(cosh(vec4(52.77, -3132.0471, 9.8, -886.533)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (_GLF_IDENTITY(true, true && (true))) && true))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (trunc(vec4(0.2, 786.987, 0.9, -45.69)) / vec4(-322.031, -325.638, -7.1, 78.28));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        _GLF_color = ((false ? lessThan(ivec2(65119, -8609), ivec2(-4238, -44162)) : bvec2(false, false)), _GLF_color);
    }
    int l = 0, r = 9;
    while (l <= r) {
        int m = (l + r) / _GLF_IDENTITY(2, max(2, 2));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (ivec3(48050, 78134, -77283), vec4(759.694, 9.2, 7.2, -9280.7455));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (obj.prime_numbers[m] == _GLF_IDENTITY(x, max(x, x))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, 1.0, 0.0)))))) {
                _GLF_color = _GLF_color;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(6615.6830, 4981.0197, -8009.9349, -0.2);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = max(vec4(-3.9, -5859.8025, 22.00, -3.1), 7.3);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(751.183, 7437.7118, -58.29, -200.300);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            return m;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = sign(vec4(306.907, -58.34, 63.29, -7.9));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (obj.prime_numbers[m] < x) {
            switch (_GLF_SWITCH((((-32400) & 0) >> _GLF_IDENTITY(int(2), int(2))))) {
                case 0:
                case 55:
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = _GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = refract(vec4(-418.006, -3.6, -6.4, 7.4), vec4(-8154.6416, -2852.6921, -273.821, 2193.0800), 7.4);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = ((-7330.7732) / vec4(-3.8, -783.360, 2.7, 207.622));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0))))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(2273.2818, 8.3, -6.2, 5801.7206);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-908.728, -1294.8137, -0.2, -6214.8816);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                case 76:
                case 21:
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = trunc(vec4(2.5, -2.1, 5828.7911, -9.9));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                case 66:
                    l = m + 1;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(1.0, -8.3, 4.3, 80.95);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0))))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    break;
                case 49:
                    mat3(9.5, 5.6, -4.2, -9788.9145, -251.397, 7.0, 898.246, 552.564, -29.67);
                default:
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(5.4, -3.9, -31.82, -9744.2961);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_IDENTITY(1, min(1, 1));
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-2.3, 67.12, -41.97, -661.587);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = fract(_GLF_color);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = fma(vec4(778.468, -0.8, -4.6, 52.79), vec4(-732.682, -74.50, -5705.3649, 3.3), vec4(-1.4, 4.1, 9.2, 5.6));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(73.20, 7.8, -8.8, -1332.4276);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        } else {
            if (_GLF_DEAD(false)) {
                _GLF_color = (-_GLF_color);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = mat2x4(0.9, -3654.9190, 2.9, 4.4, 7.2, -5.8, -73.09, -41.55)[0];
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = step(vec4(1.1, -0.6, 1.2, -4601.9841), vec4(-65.45, 18.46, 623.768, -145.678));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            _GLF_IDENTITY(r = m - 1, (_GLF_IDENTITY(r = m - 1, (r = m - 1) | 0)) | 0);
        }
    }
    return -1;
}

void main() {
    BinarySearchObject obj;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = ((-517.046) / vec4(-9278.0320, 24.04, _GLF_IDENTITY(-22.27, clamp(-22.27, -22.27, -22.27)), -11.85));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(5349.2155, 7.8, -8.7, -56.30);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-9.9, -825.875, -51.80, 8.9);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-988.804, -7708.6580, 9419.6939, 50.16);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-72.16, 6477.7057, 5.8, -2.2);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-84.71, -6937.9677, -75.41, 7107.1202);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = vec4(2.3, 4002.4220, -2047.4473, 9693.1943);
            }
        }
    }
    for (int i = 0; i < _GLF_IDENTITY(10, min(_GLF_IDENTITY(10, 0 ^ (10)), _GLF_IDENTITY(10, int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ (_GLF_IDENTITY(10, 0 | (10)))))); i++) {
        if (_GLF_DEAD(false)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-4665.3455, -7.1, -9597.6288, -6.0);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = _GLF_color;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(1.5, -638.376, -5.1, -163.139);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (false ? _GLF_FUZZED(_GLF_outVarBackup_GLF_color) : (_GLF_outVarBackup_GLF_color = _GLF_color)));
            }
            _GLF_color = vec4(94.49, 5.8, -4.2, -62.22);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = max(vec4(-4.9, 15.37, -10.99, -3022.7498), vec4(-8.0, -4253.0570, 4346.3168, 0.2));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (i == 0) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(5959.3188, 1.0, -921.400, 84.20);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            obj.prime_numbers[i] = 2;
        } else {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-9.9, 9510.5312, -9.6, -6219.9023);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (i == 1) {
                obj.prime_numbers[i] = 3;
            } else if (i == _GLF_IDENTITY(2, max(2, 2))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(4.1, -299.723, 206.662, 402.896);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                obj.prime_numbers[i] = 5;
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-926.695, _GLF_IDENTITY(37.82, (_GLF_IDENTITY(37.82, mix(float(37.82), float(_GLF_FUZZED(-6.0)), bool(false)))) + 0.0), 80.48, -7.6);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = atan(vec4(-6.8, -54.02, -21.45, -76.52), mat4(5797.8080, 16.74, 2895.1975, 7.2, 194.239, 9648.8873, -3000.6302, -6813.2981, 48.74, 64.79, -7468.6862, -48.91, 519.939, -84.56, 911.036, -25.99)[1]);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                if (_GLF_IDENTITY(i == 3, !(_GLF_IDENTITY(!(i == 3), (!(i == 3)) && true)))) {
                    obj.prime_numbers[i] = 7;
                } else if (_GLF_IDENTITY(i, (i) | 0) == _GLF_IDENTITY(4, max(4, 4))) {
                    obj.prime_numbers[i] = 11;
                } else if (i == 5) {
                    obj.prime_numbers[i] = 13;
                } else if (i == 6) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-4062.8051, -51.40, -7733.3387, 7.7);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    obj.prime_numbers[i] = 17;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = sinh(dFdy(vec4(9805.4193, -2.6, -9.6, -86.95)));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = fract(vec4(3.8, 2365.1026, 5.2, 58.85));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            switch (_GLF_SWITCH(int(_GLF_ZERO(0.0, injectionSwitch.x)))) {
                                case 75:
                                    if ((clamp(159955u, 135226u, 108610u) > 30818u)) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(17.52, -1.2, -6624.0235, 542.595);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        clamp(uvec3(146132u, 117390u, 102882u), uvec3(105979u, 149112u, 164456u), uvec3(191467u, 115689u, 131349u));
                                        if (true) {
                                            if (false) {
                                                {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-7608.0730, 7334.1042, 36.11, 5.9);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    {
                                                        vec2 _GLF_SWITCH_4_0v;
                                                        (_GLF_IDENTITY(uvec4(75033u, 121661u, 24424u, 160252u), ~(_GLF_IDENTITY(~(uvec4(75033u, 121661u, 24424u, 160252u)), (~(uvec4(75033u, 121661u, 24424u, 160252u))) >> uvec4(0u, 0u, 0u, 0u)))) ^ uvec4(13205u, 144388u, 70891u, 95705u));
                                                        int _GLF_SWITCH_4_1v, _GLF_SWITCH_4_2v;
                                                        mat3x2 _GLF_SWITCH_4_3v;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = asin(_GLF_outVarBackup_GLF_color);
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-6021.1574, -2.5, 6.8, -751.711);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat4(mat2(-998.365, 9.2, -1396.6161, -9589.3023));
                                                        vec2 _GLF_SWITCH_4_4v, _GLF_SWITCH_4_5v, _GLF_SWITCH_4_6v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(9.3, 1.3, -17.91, -861.706);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = cosh(vec4(-5301.2970, -6.5, -3.2, 8.7));
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        mat2x3 _GLF_SWITCH_4_7v, _GLF_SWITCH_4_8v[72], _GLF_SWITCH_4_9v;
                                                        vec2 _GLF_SWITCH_4_10v, _GLF_SWITCH_4_11v;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    return;
                                                    uvec3(106188u, 90658u, 31660u);
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                {
                                                    vec2(-9.8, 7.4);
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = ceil(_GLF_outVarBackup_GLF_color);
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(75.44, -53.00, -17.59, 45.39);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(vec2(0.0, 0.0)))))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    (mat3(4.1, -957.419, -77.11, -68.10, 55.90, -479.297, 92.56, -100.004, -92.66) - mat3(990.830, 1395.7200, -70.52, -0.5, 4.1, -6.1, -35.16, 7803.7142, 83.39));
                                                    (mat3x2(-24.50, -8.4, 9466.5514, -9.9, 6.6, -2.6) / mat3x2(0.5, 4.6, _GLF_IDENTITY(6.1, (6.1) + 0.0), 1.4, -5851.6003, 257.522));
                                                    {
                                                        uvec3 _GLF_SWITCH_4_12v;
                                                        discard;
                                                        uvec3 _GLF_SWITCH_4_13v;
                                                        bvec4 _GLF_SWITCH_4_14v;
                                                        {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = (vec4(-5.3, -177.732, 40.87, -3221.7323) - dFdy(min(-4623.1500, -8.2)));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-70.29, 6.4, -7888.8751, 4.9);
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = clamp(vec4(-5892.0022, -89.82, 4.3, 254.811), vec4(46.45, -8721.8693, 3.5, -3.8), vec4(-614.832, 4.1, 5032.0220, -471.794));
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat3x4 _GLF_SWITCH_4_15v, _GLF_SWITCH_4_16v;
                                                        (-mat3(6700.1641, -7.1, -62.84, -145.589, 337.929, -6.4, -9333.4571, -58.39, 65.62));
                                                    }
                                                    for (lessThan(ivec3(-90390, 40483, 26407), ivec3(10370, _GLF_IDENTITY(66976, (_GLF_IDENTITY(66976, int(ivec2(66976, 0)))) | int(_GLF_ZERO(0.0, injectionSwitch.x))), -2093)); false; (true)) {
                                                        mat4x2(-15.47, -67.09, -27.29, 4366.1565, -9.4, 769.720, -12.21, -563.951);
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = vec4(41.94, 288.074, -874.354, 697.661);
                                                            {
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = step(fma(vec4(744.680, 4154.1654, -2219.3522, 8.1), vec4(-4.6, -137.929, -6.6, 6161.5524), vec4(-9.7, -5145.4850, -81.47, 916.713)), vec4(6.4, 7.6, -5.7, 5.4));
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = (+vec4(-4.0, -5417.8398, -1.1, 3298.4963));
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(-815.017, 7036.3537, -6.3, -8.1);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = (((-6.5) - vec4(-605.985, 72.35, 4.9, 5.8)) + fma(sin(1849.3543), pow(-10.85, 618.893), 619.511));
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                        ;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-2.2, 5.0, 47.99, -456.593);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat2(5782.0103, -1876.4786, -0.3, 9.9);
                                                        false;
                                                        uvec4(195410u, 31146u, 195712u, 191297u);
                                                        i;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(8.0, -4.5, 1.9, -1.1);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = sign(vec4(33.12, -3.3, 7577.9513, -92.77));
                                                        }
                                                        uvec4(143516u, 16698u, 147037u, 3638u);
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = mat4(-47.11, 14.14, 0.9, 8383.6233, -6.4, -87.08, 217.017, 4845.9046, 1.5, -1.2, 3969.6523, 7.4, 765.075, -6.6, 3183.2186, -899.187)[3];
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = min(vec4(39.81, -371.639, 68.73, -9283.9200), vec4(8449.5418, 6.1, 4313.4751, 4.6));
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = (vec4(3.5, 35.75, 2014.4862, -4.0) * vec4(-248.274, -2.5, -47.85, -8.3));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                }
                                                {
                                                    mat2(-78.75, 2802.0207, -8206.5149, -14.88);
                                                }
                                                (_GLF_IDENTITY(mat4(-1411.4314, -96.48, -1760.7398, -2.9, -5.9, -9.4, -181.205, -21.92, -6.8, 5.8, 9.6, -1737.1274, -4.0, 1.8, -1.9, -68.07), transpose(_GLF_IDENTITY(transpose(mat4(-1411.4314, -96.48, -1760.7398, -2.9, -5.9, -9.4, -181.205, -21.92, -6.8, 5.8, 9.6, -1737.1274, -4.0, 1.8, -1.9, -68.07)), transpose(transpose(_GLF_IDENTITY(transpose(mat4(-1411.4314, -96.48, -1760.7398, -2.9, -5.9, -9.4, -181.205, -21.92, -6.8, 5.8, 9.6, -1737.1274, -4.0, 1.8, -1.9, -68.07)), (transpose(mat4(-1411.4314, -96.48, -1760.7398, -2.9, -5.9, -9.4, -181.205, -21.92, -6.8, 5.8, 9.6, -1737.1274, -4.0, 1.8, -1.9, -68.07))) - mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))))))) / 47.08);
                                                while ((i >= (-41882))) {
                                                    if (true) {
                                                        (mat4x3(20.93, 3.7, -82.97, 9042.9948, 132.808, 2.2, -9.4, -8.2, 9350.2802, -6.6, -665.317, 182.159) / mat4x3(718.015, -67.64, 9.1, 4.4, 4.1, 61.32, -5.6, -55.33, 9976.3472, -887.119, 3.7, -1.0));
                                                        mat4(mat2(-_GLF_IDENTITY(0.2, max(0.2, _GLF_IDENTITY(0.2, (true ? 0.2 : _GLF_FUZZED(9515.5913))))), -11.88, -313.329, -9.1));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(6007.8225, 7771.3490, 7943.0794, -2318.6839);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            _GLF_color = injectionSwitch.rggr;
                                                        }
                                                        findLSB(i);
                                                        mat3x2(1535.7324, 2187.0197, 9.2, 41.91, 329.388, 25.95);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-0.7, -70.33, 8.8, -5.2);
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec2(-2628.3262, 664.392).xxyx;
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat2 _GLF_SWITCH_4_17v;
                                                        return;
                                                        (-mat2x4(-1.0, -685.746, 5.7, -4722.8310, 7385.5527, -7959.3533, 722.226, -96.13));
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = dFdyCoarse(_GLF_color);
                                                        }
                                                        uvec4(uvec2(_GLF_IDENTITY(172195u, 0u + (172195u)), 177006u), uvec2(107962u, 156918u)[0], 156843u);
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    } else {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (-vec4(-16.02, -743.215, -7.1, 6909.7633));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        bvec4(bvec2(true, true), lessThanEqual(ivec2(-52654, 42751), ivec2(68255, -84702)));
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(74.78, -2148.1244, -996.858, 346.732);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = mod(vec4(-9.8, -1.5, -12.68, 7570.5316), -9635.9705);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        ivec2 _GLF_SWITCH_4_18v, _GLF_SWITCH_4_19v;
                                                        return;
                                                        ;
                                                        break;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = floor(acos(vec4(-40.35, 7967.5880, -95.14, -271.983)));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        (ivec3(2979, 80471, -87099) ^ (-4698)).gg;
                                                        break;
                                                    }
                                                    for ((bitfieldInsert(uvec3(69570u, 99770u, 48239u), uvec3(25750u, 37263u, 48423u), bitfieldReverse(i), -57106), mat2x4(-6691.6276, 4245.7315, -4.6, -3.7, -5435.8484, _GLF_IDENTITY(-0.8, (-0.8) / 1.0), -5.8, -591.341)); true; resolution) {
                                                        mat3x2 _GLF_SWITCH_4_20v[33], _GLF_SWITCH_4_21v, _GLF_SWITCH_4_22v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-329.717, 47.31, -25.56, 34.83);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat3 _GLF_SWITCH_4_23v, _GLF_SWITCH_4_24v[47], _GLF_SWITCH_4_25v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(96.56, -346.191, -4.4, 9.8);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        discard;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        mat4x3 _GLF_SWITCH_4_26v, _GLF_SWITCH_4_27v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (mat2x4(-0.4, 9925.5901, -8537.2582, 2059.7931, 1.2, -8268.6918, -3.1, -324.848) * vec2(-4552.2341, 98.72));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        bvec3(false, true, false);
                                                    }
                                                    for (vec4 _GLF_SWITCH_4_28v; true; max(acosh(vec3(-267.597, -6198.5986, -9997.0237)), 70.24)) {
                                                        break;
                                                        mat2x3 _GLF_SWITCH_4_29v, _GLF_SWITCH_4_30v[91], _GLF_SWITCH_4_31v[83];
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        continue;
                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                            ;
                                                        }
                                                    }
                                                    while (((ivec3(-87894, 80493, -8690), 90223u) <= bitfieldInsert(58202u, 99556u, _GLF_IDENTITY(-98325, (_GLF_IDENTITY(-98325, (false ? _GLF_FUZZED(i) : (-98325)))) - 0), -77805))) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-999.231, vec3(-48.41, 8228.7823, -689.737));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        (194479u * uvec2(26138u, 17216u));
                                                        181621u;
                                                        {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = log(vec2(-9.6, -9109.6917).yyxx);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = sin(vec4(8.4, -4.0, 11.26, -23.39));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec2(79.84, 689.864).xxxy;
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        return;
                                                        bool _GLF_SWITCH_4_32v, _GLF_SWITCH_4_33v[19], _GLF_SWITCH_4_34v;
                                                    }
                                                    ;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-4.5, -4685.4537, 2.3, 15.38);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    ;
                                                    _GLF_color;
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        ;
                                                    } else {
                                                    }
                                                }
                                                {
                                                }
                                            }
                                            mat3 _GLF_SWITCH_4_35v;
                                            for (findMSB(uvec2(167870u, 71299u)); true; mat4(332.453, 8.7, -159.258, -5.0, 99.58, 1.9, 777.314, -7.6, -319.619, -28.59, 8.1, 7.9, 3876.9235, 91.58, 8.1, -335.163)) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(-2.5, -4691.0685, -308.190, 35.99);
                                                }
                                                {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-28.56, -6.2, -337.208, -1.2);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (_GLF_IDENTITY(true, (true) || false)) || false))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    mat2x3(-4530.7874, -221.153, 8.6, 7.8, 1.6, -7.6);
                                                }
                                                while ((bvec2(true, true) != bvec2(false, false))) {
                                                    return;
                                                    for (bool _GLF_SWITCH_4_36v, _GLF_SWITCH_4_37v; bvec3(true, true, false).r; ivec2(-78031, -_GLF_IDENTITY(41910, (41910) / 1))) {
                                                        ivec2(13934, 51692);
                                                        continue;
                                                        uvec4 _GLF_SWITCH_4_38v[19];
                                                        ivec3(-70616, 61389, 34255);
                                                        mat4(8.1);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(9.8, 217.279, 76.96, 823.445);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        (+mat4(9.1, 189.902, -8.3, 5.2, 47.30, 13.29, 2.5, -8.8, -9.8, -656.267, -85.00, -11.93, 3.7, 0.2, 3.9, -1.6));
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-1.1, 0.7, -4069.4894, -83.08);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        -_GLF_IDENTITY(60396, (60396) >> (0 ^ 0));
                                                        return;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(0.0, -4185.9566, 154.724, 4097.5610);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        break;
                                                    }
                                                    bitfieldReverse(29011u);
                                                    if ((bvec4(true, false, true, true) == bvec4(false, false, true, true))) {
                                                        (uvec3(97714u, 9543u, 154367u) & 39530u);
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = (true ? vec4(-30.48, 50.35, -60.83, 0.7) : vec4(-3729.9020, -9352.8872, 1.3, -591.521));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        break;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-77.86, -748.285, -9963.0733, 5.0);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = floor(vec4(-4.6, -214.088, 8.4, 694.660));
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-2.8, 6.4, -65.92, -5.2);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        continue;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(2.4, 8995.9279, -6786.4542, 7.4);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(640.230, 3.3, vec2(24.36, 4.0));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = exp((mat3x4(566.744, -1.3, 5.9, 8.1, -48.15, 958.751, 3.8, 276.884, 14.74, 5894.3198, 6.0, -97.25) * vec3(-7.9, 48.69, 3.6)));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        bvec2(false, true).stt;
                                                        break;
                                                    }
                                                    (22733u * 78354u);
                                                    break;
                                                    {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = _GLF_color;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec3(-37.49, -5.0, 4.1).zxyx;
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(1637.4929, -26.88, -682.114, -1406.9018);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = (vec4(7.1, -8.0, 9.0, 120.781) + (-345.172));
                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        continue;
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = ((mat4(35.40, 76.67, 8327.2778, 276.627, 5.4, 7.9, 6937.5573, 0.1, -45.49, -490.119, -8573.3473, 272.873, 5.7, -58.66, -1.9, 2078.3673) - (-85.74)) * vec4(10.49, -382.994, 94.97, 5757.7584));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            _GLF_color = vec4(resolution, vec2(-7.9, 46.26));
                                                        }
                                                        bvec4 _GLF_SWITCH_4_39v, _GLF_SWITCH_4_40v[91], _GLF_SWITCH_4_41v;
                                                        {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-1814.5878, -81.05, 480.814, -4.0);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(3886.2580, 15.03, -5060.4199, -46.53);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec4(_GLF_IDENTITY(true, false || (true)), true, true, _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            _GLF_color = mix(vec4(-8.2, 897.722, -8.8, 4.8), vec4(200.158, 9.3, 5616.7544, -9655.7051), -6320.2098);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        ivec2 _GLF_SWITCH_4_42v, _GLF_SWITCH_4_43v;
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = vec4(2.5, 10.14, -9.2, -16.03);
                                                            } else {
                                                            }
                                                        }
                                                        (bitfieldExtract(-13957, i, i) > 88626);
                                                        _GLF_color;
                                                        ;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec2(1.6, 3871.6325).tstt;
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    continue;
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = refract(vec4(-6.3, 9.4, -86.29, 7.8), vec4(-764.015, -4.8, -12.28, -3.7), 6324.7829);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                {
                                                    for ((any(bvec2(true, true)) ? bvec2(true, false) : bvec2(true, true)); true; uvec4(83747u, 164984u, 102441u, 180334u)) {
                                                        mat4x3(-8.3, -37.41, _GLF_IDENTITY(8.0, mix(float(_GLF_FUZZED(vec2(-6070.4225, -8209.3545).t)), float(8.0), bool(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))), -5221.4951, _GLF_IDENTITY(0.6, float(_GLF_IDENTITY(mat4(_GLF_IDENTITY(0.6, (0.6) + 0.0), 0.0, 0.0, 1.0, 0.0, 1.0, tan(0.0), abs(0.0), 0.0, 0.0, log(1.0), length(vec2(0.0, 0.0)), 1.0, 0.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), 0.0), transpose(transpose(mat4(_GLF_IDENTITY(0.6, (0.6) + 0.0), 0.0, 0.0, 1.0, 0.0, 1.0, tan(0.0), abs(0.0), 0.0, 0.0, log(1.0), length(vec2(0.0, 0.0)), 1.0, 0.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), 0.0)))))), 3.8, -357.788, 30.71, 9.4, -6.4, 6.3, -5.0);
                                                        break;
                                                        _GLF_color;
                                                        (-mat4x3(589.473, -705.875, -6.9, 689.084, -386.612, -9254.9600, _GLF_IDENTITY(-39.47, min(-39.47, -39.47)), 662.593, -8.0, 16.20, 4.8, 9.0));
                                                    }
                                                    while (((mat4x3(-3.7, _GLF_IDENTITY(4.7, 1.0 * (4.7)), _GLF_IDENTITY(-5191.7920, float(_GLF_IDENTITY(mat4(-5191.7920, 1.0, 1.0, 0.0, 1.0, length(sqrt(vec2(0.0, 0.0))), _GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0, _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(-3.0)), float(0.0), bool(true))), 1.0, 1.0, 0.0, 0.0, round(length(normalize(vec3(1.0, 1.0, 1.0)))), 0.0, sqrt(0.0)), (_GLF_IDENTITY(mat4(-5191.7920, 1.0, 1.0, 0.0, 1.0, length(sqrt(vec2(0.0, 0.0))), _GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0, _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(-3.0)), float(0.0), bool(true))), 1.0, 1.0, 0.0, 0.0, round(length(normalize(vec3(1.0, 1.0, 1.0)))), 0.0, sqrt(0.0)), mat4(1.0) * (mat4(-5191.7920, 1.0, 1.0, 0.0, 1.0, length(sqrt(vec2(0.0, 0.0))), _GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0, _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(-3.0)), float(0.0), bool(true))), 1.0, 1.0, 0.0, 0.0, round(length(normalize(vec3(1.0, 1.0, 1.0)))), 0.0, sqrt(0.0))))) - mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))), -21.69, 428.605, 6.1, -63.96, -9.6, -15.28, 668.835, 944.182, 808.702) - (-6.2)) == mat4x3(-780.561, -627.032, 8.0, -11.25, 773.169, -824.051, 9.8, 7372.5571, 43.69, -656.815, 42.95, 243.519))) {
                                                        continue;
                                                    }
                                                    (vec2(-0.6, 8.2) != resolution);
                                                    do {
                                                        mat2 _GLF_SWITCH_4_44v[55], _GLF_SWITCH_4_45v[29], _GLF_SWITCH_4_46v;
                                                        break;
                                                        break;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (cosh(-7.4) / vec4(41.45, -1.0, -430.459, 4.1));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        vec3 _GLF_SWITCH_4_47v[58];
                                                        cosh(vec3(-7932.1061, 3.9, -9376.4460));
                                                        bvec2(true, true);
                                                        break;
                                                    } while (true);
                                                    _GLF_SWITCH_4_35v;
                                                    _GLF_outVarBackup_GLF_color;
                                                    mat2x4(5993.2161, 861.722, 53.38, 3765.3349, 7.6, -7.9, -7107.2350, -987.891);
                                                }
                                                while ((vec3(-377.390, 880.573, 0.8) != vec3(5.8, 704.625, -3.7))) {
                                                    transpose(mat2x3(3571.8483, 7836.6975, -83.63, -_GLF_IDENTITY(164.718, max(_GLF_IDENTITY(164.718, min(164.718, 164.718)), _GLF_IDENTITY(164.718, (_GLF_IDENTITY(164.718, min(164.718, 164.718))) / 1.0))), -9.1, 9.2));
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                        ;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(vec2(-5397.1402, 9.6), vec2(-3075.8659, -9.2));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-4405.8548, 485.087, 936.030, 5486.3686);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(1.1, -3.5, -521.346, 412.429);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    continue;
                                                    for (mat4 _GLF_SWITCH_4_48v[65], _GLF_SWITCH_4_49v[10], _GLF_SWITCH_4_50v; false; (mat4(-181.490, 68.91, -2.2, _GLF_IDENTITY(-57.67, (-57.67) - 0.0), 3345.1240, 33.10, -29.66, -_GLF_IDENTITY(21.62, min(21.62, _GLF_IDENTITY(21.62, (21.62) + tan(0.0)))), -17.75, 43.99, -7.1, 92.88, -29.65, -68.04, -42.17, 65.18))) {
                                                        mat2x3 _GLF_SWITCH_4_51v[3], _GLF_SWITCH_4_52v[60], _GLF_SWITCH_4_53v[36];
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(91.53, -737.406, -4411.7425, -2579.2499);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    return;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = _GLF_color;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = max(vec4(6.7, 7522.4183, 532.387, 518.380), -7.3);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    mat3x2(-180.849, 4487.0119, 78.14, 5.1, -2.1, -1.9);
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-7.7, 5.7, 10.28, -3546.4147);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                while (((56.17 * mat2(0.0, -451.228, -_GLF_IDENTITY(53.68, clamp(_GLF_IDENTITY(53.68, min(53.68, _GLF_IDENTITY(53.68, (53.68) - 0.0))), 53.68, _GLF_IDENTITY(53.68, mix(float(_GLF_FUZZED(vec3(371.642, -3.5, 7.1).b)), float(_GLF_IDENTITY(53.68, mix(float(_GLF_FUZZED(-398.882)), float(53.68), bool(true)))), bool(true))))), -7.1)) != mat2(-1085.2402, 58.66, -1.1, 7.4))) {
                                                    while (isinf(degrees(91.19))) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        ivec4 _GLF_SWITCH_4_54v;
                                                        lessThanEqual(vec4(3730.7129, 3.7, 215.032, 681.267), _GLF_outVarBackup_GLF_color);
                                                        continue;
                                                        do {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = (+vec4(-4.5, -99.58, -6571.3657, -3.3));
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            mat3x2(((-3.4) + mat2x4(-2114.9620, -90.14, 4818.7576, 6.0, 1654.2626, _GLF_IDENTITY(47.22, (false ? _GLF_FUZZED(length(vec3(-1.7, -5.7, -3.8))) : 47.22)), 771.831, 201.858)));
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-7506.3442, -34.74, -27.89, 1850.4213);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat2x3 _GLF_SWITCH_4_55v[95], _GLF_SWITCH_4_56v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(4.1, -4.2, -5.1, 434.855);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        break;
                                                        (vec3(775.379, 3273.2327, 83.81) * mat2x3(-7039.6261, -54.40, 42.63, 8924.0924, -2.9, 6236.7311));
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = asinh(vec4(4.4, 72.98, -729.116, 815.421));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(_GLF_ZERO(0.0, injectionSwitch.x), (_GLF_ZERO(0.0, injectionSwitch.x)) + 0.0))))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    (uvec4(20961u, 173923u, 75477u, 139837u) % (79545u & 44793u));
                                                    break;
                                                    bvec2(false, true);
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = vec4(-301.839, 977.796, 3697.2467, -3.2);
                                                    }
                                                    for (vec3 _GLF_SWITCH_4_57v, _GLF_SWITCH_4_58v; bool(9.4); uvec4(40538u, 1178u, 96953u, 27163u)) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(382.014, -7.3, -1.2, -1.0);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            _GLF_color = sign(vec4(-493.833, 6973.6121, 7.0, 5.3));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        (_GLF_IDENTITY(ivec3(-99439, -28854, 83989) + 3059, ~(~(ivec3(-99439, -28854, 83989) + 3059))));
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = inversesqrt((vec4(0.7, 5.9, -69.57, -2709.7060) + vec4(-3.3, -10.13, 4.5, -1860.1017)));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        continue;
                                                        ;
                                                        discard;
                                                        _GLF_IDENTITY(ivec4(-84395, -7377, -13615, 61680), (ivec4(-84395, -7377, -13615, 61680)) | (ivec4(-84395, -7377, -13615, 61680)));
                                                        mat2 _GLF_SWITCH_4_59v, _GLF_SWITCH_4_60v, _GLF_SWITCH_4_61v;
                                                        vec4 _GLF_SWITCH_4_62v, _GLF_SWITCH_4_63v[95], _GLF_SWITCH_4_64v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-4.0, 1593.3961, -7.1, -11.01);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-6.5, -6.4, 5918.7027, 3.2);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        (_GLF_SWITCH_4_60v * injectionSwitch);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = mix((vec4(-906.711, 90.30, -95.01, 5705.7230) / 410.496), unpackSnorm4x8(162593u), bvec4(true, false, false, true));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    mat4x3(-6.8, -9.8, 1055.4479, -0.6, -92.84, 649.547, 39.93, 2684.7319, 86.31, 36.78, 80.98, 1.4);
                                                    if ((mat4x3(-4.5, 803.146, 5428.4202, -4.8, 1993.7380, 490.912, 2591.2931, -6.8, -64.38, 7835.3026, -2.9, -5.6), isnan(80.46))) {
                                                        break;
                                                        bvec4(true, false, false, false);
                                                        ivec3(67490, -_GLF_IDENTITY(96858, (0 << _GLF_IDENTITY(int(6), int(6))) + (96858)), -41724);
                                                        break;
                                                        (mat4(-135.663, -3.7, 56.42, 5.2, -706.835, -846.671, -28.13, 582.256, -7.5, 880.406, 84.87, -5.9, 9.4, -7.7, 9.1, -47.76) * mat3x4(-6.9, -2.4, -_GLF_IDENTITY(55.75, 0.0 + (_GLF_IDENTITY(55.75, mix(float(55.75), float(_GLF_FUZZED(70.46)), bool(false))))), _GLF_IDENTITY(53.97, min(53.97, 53.97)), -135.796, 9.6, 22.84, 746.234, 8496.0652, -48.80, 1226.4017, -7633.7082));
                                                        uvec2(77864u, 81517u);
                                                        {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-168.215, 9.3, 0.1, 509.216);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (mix(vec3(-887.804, 8.7, 44.97), vec3(7208.4626, 0.2, 9508.0034), -7157.4108), vec4(6107.0115, -135.573, 7.6, -1.0));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        bitfieldReverse(174808u);
                                                        mat3x4(-3.5, 5403.3966, -566.905, -3.9, -3292.8505, -441.957, -99.35, 1.3, 85.46, 4483.7064, 0.3, 72.08);
                                                        break;
                                                    } else {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (vec4(33.15, -62.80, -9736.8590, -4.7) + (-3.0));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        break;
                                                        discard;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = asin(vec4(-282.701, 42.83, 782.167, 3545.1100));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat2 _GLF_SWITCH_4_65v;
                                                        mat4x3 _GLF_SWITCH_4_66v;
                                                        bvec4 _GLF_SWITCH_4_67v[27], _GLF_SWITCH_4_68v;
                                                    }
                                                    for (mat4x2 _GLF_SWITCH_4_69v; (false || true); vec4(4191.4960, step(vec3(74.72, 741.538, -8445.5868), vec3(-8390.2168, 6.3, -530.859)))) {
                                                        continue;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = ldexp(vec4(-788.065, 53.38, -1.4, 2.8), ivec4(38057, -61353, 52003, -74367));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat4x3 _GLF_SWITCH_4_70v, _GLF_SWITCH_4_71v, _GLF_SWITCH_4_72v;
                                                        mix(-70.80, 5619.1037, -575.865);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = fwidthCoarse(vec4(5.4, 19.34, 190.385, -2.1));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat3x4(-1.0, 79.98, 6.0, -0.3, 3.7, -4902.0126, 3489.5047, -2680.4824, 346.248, 2.0, -9.2, -572.166);
                                                        break;
                                                        ;
                                                        uvec3 _GLF_SWITCH_4_73v, _GLF_SWITCH_4_74v[20], _GLF_SWITCH_4_75v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-5244.5447, -29.84, 18.89, -9.3);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    ;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(378.715, 360.985, -5414.8403, 560.412);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_color = _GLF_color;
                                                    }
                                                }
                                            }
                                            return;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = radians(vec4(-5.2, 256.309, 3.4, 3297.7222));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (((mat2x3(-8348.8050, -0.8, 59.42, -5656.0859, -221.180, -46.22) / (-634.500)) == transpose(mat3x2(_GLF_IDENTITY(4172.3573, (_GLF_IDENTITY(4172.3573, mix(float(4172.3573), float(_GLF_FUZZED(9.3)), bool(false)))) * 1.0), -8.2, -1.0, 2.9, 4343.8723, -31.71)))) {
                                                findMSB(ivec3(86606, 53516, 6011));
                                                (uvec4(134296u, 15771u, 1353u, 170031u) ^ uvec4(142287u, 134783u, 74001u, 139015u));
                                                for ((175555u * uvec3(41361u, 114254u, 73348u)); (mat4x2(-49.29, -2.1, 20.28, -1.4, -5.2, 7.4, -0.7, 58.46) != mat4x2(70.57, -8121.0407, 759.294, -2542.0352, 937.574, _GLF_IDENTITY(-0.9, _GLF_IDENTITY(float(_GLF_IDENTITY(vec4(-0.9, 1.0, sqrt(0.0), 0.0), (vec4(-0.9, 1.0, sqrt(0.0), 0.0)) * vec4(1.0, 1.0, 1.0, 1.0))), (float(_GLF_IDENTITY(vec4(-0.9, 1.0, sqrt(0.0), 0.0), (vec4(-0.9, 1.0, sqrt(0.0), 0.0)) * vec4(1.0, 1.0, 1.0, 1.0)))) - length(vec3(0.0, 0.0, 0.0)))), 9794.8897, -5.3)); -74828) {
                                                    vec3 _GLF_SWITCH_4_76v;
                                                }
                                                mat3x4 _GLF_SWITCH_4_77v;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(313.736, (true ? 5.1 : 93.30), 8666.3335, 6.5);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(359.214, 9.4, 8.8, 5515.3863);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            } else {
                                                mat2x4 _GLF_SWITCH_4_78v[81];
                                                for (mat3x2 _GLF_SWITCH_4_79v[13]; true; true) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-71.11, 7.9, 2781.2181, -2.1);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                if (((127523u * uvec2(164513u, 146954u)) != uvec2(120800u, 1760u))) {
                                                    vec2 _GLF_SWITCH_4_80v, _GLF_SWITCH_4_81v, _GLF_SWITCH_4_82v[19];
                                                    if (false) {
                                                        (true, inverse(mat3(-8424.9777, 1.7, -8080.6193, -5.5, 5.7, 58.25, 3.7, 8.6, 4.3)));
                                                        vec3 _GLF_SWITCH_4_83v, _GLF_SWITCH_4_84v, _GLF_SWITCH_4_85v;
                                                        bvec2(true, false);
                                                        uvec2 _GLF_SWITCH_4_86v, _GLF_SWITCH_4_87v[26], _GLF_SWITCH_4_88v[59];
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = tan(vec4(5336.0382, -3.7, -7.4, -8038.1651));
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(19.61, -9496.6089, 19.02, 92.90);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    } else {
                                                        mod(faceforward(-6.0, -100.410, -1.4), 50.91);
                                                        atan(_GLF_color);
                                                        ivec3(43037, -8635, 97372);
                                                        uvec4 _GLF_SWITCH_4_89v[97], _GLF_SWITCH_4_90v, _GLF_SWITCH_4_91v;
                                                        return;
                                                        (mat2(-_GLF_IDENTITY(9.0, float(mat3x4(9.0, sqrt(1.0), 1.0, 0.0, abs(exp(0.0)), 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0))), 36.29, 2445.1874, -41.52) * mat3x2(-289.099, -5595.8737, -6385.5936, _GLF_IDENTITY(-6.8, float(mat3x4(-6.8, 1.0, abs(0.0), 1.0, _GLF_IDENTITY(dot(vec3(_GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)), dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0))), 1.0, tan(0.0)), vec3(0.0, 1.0, 0.0)), _GLF_IDENTITY(dot(vec3(_GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)), dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0))), 1.0, tan(0.0)), vec3(0.0, 1.0, 0.0)), (false ? _GLF_FUZZED(-810.648) : dot(vec3(_GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)), dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0))), 1.0, tan(0.0)), vec3(0.0, 1.0, 0.0))))), 0.0, 1.0, 1.0, 1.0, _GLF_ONE(1.0, injectionSwitch.y), 1.0, _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 1.0, 0.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 1.0, 0.0, 0.0)))))), 7.0, -109.311));
                                                        ;
                                                        ivec4(27785, -22055, -70139, -42963);
                                                        return;
                                                    }
                                                    (vec3(-0.4, 62.53, 0.1).r + mat4x3(-6.9, 46.60, 491.073, -9028.3113, -5.5, _GLF_IDENTITY(1.9, clamp(1.9, _GLF_IDENTITY(1.9, float(mat3x4(1.9, sin(0.0), 0.0, 0.0, 0.0, 1.0, 1.0, tan(0.0), determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0)), 0.0, 0.0, 1.0))), 1.9)), -11.02, -7.0, 948.861, 155.775, -1493.0523, -8598.2549));
                                                    {
                                                        (true ? mat4x3(400.601, -33.34, 311.550, -48.47, -70.73, 446.407, 949.250, -8.0, 3.7, -27.02, 409.053, 71.18) : mat4x3(6191.1414, 97.20, -1129.3421, 5531.0088, 3497.3745, 1563.6176, 5.2, -7.9, 0.9, -7.5, -5.8, 5524.6446));
                                                    }
                                                    {
                                                        mat4x2(vec2(-9032.1272, 9.2), _GLF_SWITCH_4_80v, vec2(29.71, 2.5), _GLF_SWITCH_4_81v);
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                            _GLF_color = ((mat3x2(mat2x3(3868.2830, 9948.8720, -6.3, -7.4, 981.641, 8639.2045)) != mat3x2(8.2, -5574.4582, 5.3, 9.9, -6.3, 335.859)) ? _GLF_outVarBackup_GLF_color : (2.8 / vec4(5548.1964, -766.102, -3485.0269, 3.2)));
                                                        }
                                                    }
                                                    {
                                                        mat4x3(-5.7, _GLF_IDENTITY(-27.17, mix(float(-27.17), float(_GLF_FUZZED(7.3)), bool(false))), -_GLF_IDENTITY(5.1, (5.1) / exp(0.0)), -8.7, -7.3, 5470.1279, 606.542, -0.8, -453.446, 12.19, 35.06, -7.6);
                                                        ;
                                                        uint _GLF_SWITCH_4_92v[91], _GLF_SWITCH_4_93v, _GLF_SWITCH_4_94v;
                                                        (-mat2x3(-6.1, 6.6, 2.8, 8.3, -37.88, -6.4));
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (vec4(999.841, -0.7, -68.06, -997.756) / vec4(-6221.4596, -5.8, -420.633, -783.682));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-85.54, 524.613, -6.9, -9.4);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    for (equal(uvec4(6281u, 121305u, 190197u, 185936u), (~uvec4(183173u, 25410u, 148788u, 25023u))); isnan((94.06 * (-7.6))); (uvec2(133742u, 90034u) | uvec2(141149u, 31539u))) {
                                                        ;
                                                        mat2x4(-160.135, _GLF_IDENTITY(-5.0, (true ? _GLF_IDENTITY(-5.0, (-5.0) + 0.0) : _GLF_FUZZED(-7.4))), -8379.9100, 4.1, 4960.8626, -9476.5569, 9648.2390, 39.47);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(1.3, 82.50, 2.5, -0.1);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = acosh(vec4(-6.1, -5.3, -3.8, -2.3));
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        mat4x3 _GLF_SWITCH_4_95v[6], _GLF_SWITCH_4_96v, _GLF_SWITCH_4_97v;
                                                        lessThan(ivec2(-23584, 42388), ivec2(-63454, 47629));
                                                        mat2 _GLF_SWITCH_4_98v, _GLF_SWITCH_4_99v, _GLF_SWITCH_4_100v;
                                                        bvec3 _GLF_SWITCH_4_101v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = log2(vec4(190.095, -68.48, -22.08, -244.859));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = sinh(_GLF_outVarBackup_GLF_color);
                                                    }
                                                }
                                                mat4(-8296.8452, -1.9, 9.6, -6.2, -89.46, 8.9, 270.907, 1487.1075, _GLF_IDENTITY(-5.8, (_GLF_IDENTITY(-5.8, float(vec2(-5.8, 1.0)))) * sqrt(1.0)), 9.3, 6.5, 42.38, 8905.6490, -3.4, 142.439, 3.4);
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(7.2, 600.401, 9.5, -8.3);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                ;
                                                ivec3 _GLF_SWITCH_4_102v;
                                                ivec4 _GLF_SWITCH_4_103v, _GLF_SWITCH_4_104v;
                                                {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(0.2, 870.455, -3.2, -1.3);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = acos(vec4(-40.32, 8.4, -2838.9381, -1915.4919));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                            return;
                                            if (true) {
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(32.77, -3266.8875, -2.1, 9250.3385);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    _GLF_color = round(mat4(-983.413, 1371.8640, -4.3, -450.821, -7589.3871, 4.4, -7.9, -4.2, 9.0, 8836.6949, 5.5, 6969.5269, -4.2, 1.6, -5.1, -51.32)[1]);
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-9.8, -3590.5299, -0.0, 349.279);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                while (true) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = mix(vec4(-401.028, -162.448, -223.795, 8345.4745), vec4(57.70, 1.4, -6331.5071, -369.369), bvec4(true, true, true, true));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (true) {
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = ((ivec4(25463, -75454, -99789, 63645) != ivec4(45837, -27165, 68969, -71738)) ? vec4(528.326, -9.8, 228.915, 4.0) : vec4(1169.9200, -891.637, 189.303, 4.5));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                mat3 _GLF_SWITCH_4_105v, _GLF_SWITCH_4_106v, _GLF_SWITCH_4_107v;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-21.51, 710.869, -505.546, 3.4);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(3.2, 6.5, -41.28, 648.747);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (mat2x4(626.366, -25.43, -3.8, -6857.4081, 1726.7176, -9812.6389, 8156.0775, -53.21) * 1.8)[0];
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                {
                                                    (mat2(-52.35, -202.790, 7580.5023, -52.06) + mat2(-69.41, 9.0, 4.8, -14.71));
                                                }
                                                for (mat2x3(-5.0, 5.5, -5.8, _GLF_IDENTITY(-0.0, max(-0.0, -0.0)), 8449.9697, 7.4); (_GLF_IDENTITY((ivec3(76537, -62931, -87661) == ivec3(31715, 35791, 91382)), !(!((ivec3(76537, -62931, -87661) == ivec3(31715, 35791, 91382)))))); findLSB(uvec3(66262u, 1415u, _GLF_IDENTITY(5325u, ~(~(5325u)))))) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = step((vec4(4.0, 4.4, 5.4, 215.563) + 1.9), vec4(8.5, -4334.7319, -8938.6901, -7781.6579));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    discard;
                                                    while (true) {
                                                        mat2x3 _GLF_SWITCH_4_108v;
                                                    }
                                                    ivec2 _GLF_SWITCH_4_109v[48], _GLF_SWITCH_4_110v;
                                                    for (uint _GLF_SWITCH_4_111v; ((bvec2(false, false) == bvec2(bvec3(false, false, true))) && (_GLF_IDENTITY(uvec2(116299u, 17711u), min(_GLF_IDENTITY(uvec2(116299u, 17711u), (uvec2(116299u, 17711u)) >> uvec2(0u, 0u)), uvec2(116299u, 17711u))) == uvec2(66228u, 127011u))); abs(_GLF_color)) {
                                                        vec2(-0.6, -8.3);
                                                        (uvec3(123854u, 147082u, 65053u) % uvec3(127467u, 52848u, 108765u));
                                                        50600;
                                                    }
                                                    bvec3 _GLF_SWITCH_4_112v, _GLF_SWITCH_4_113v[43], _GLF_SWITCH_4_114v[44];
                                                    mat4x2 _GLF_SWITCH_4_115v[51];
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = max(vec4(5.5, 0.6, 29.69, 7981.0277), determinant(mat3(-467.199, 9971.4668, 97.91, 1.7, -360.602, -984.658, -454.436, -12.36, 9.2)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                            } else {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = min(vec4(1.0, -8657.0798, -855.907, 6.9), -318.746);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                clamp(floatBitsToUint(intBitsToFloat(ivec2(90620, 83366))), packSnorm4x8(_GLF_outVarBackup_GLF_color), (116222u));
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = atan(vec4(-6868.7923, 84.64, -42.07, -7.3), vec4(-427.056, -61.19, -0.2, 3.4));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                            {
                                            }
                                        }
                                        mat3x2 _GLF_SWITCH_4_116v;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = smoothstep(vec4(844.652, -227.955, 0.9, 4.2), _GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color);
                                        }
                                        mat4x2 _GLF_SWITCH_4_117v, _GLF_SWITCH_4_118v;
                                        {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(471.231, 9.8, 4.1, 9.9);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = smoothstep(-9.9, -72.66, vec4(61.35, -7184.1720, -1.4, 2.9));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        {
                                        }
                                    } else {
                                        while (false) {
                                            while ((15304u <= 96090u)) {
                                                bvec4 _GLF_SWITCH_4_119v, _GLF_SWITCH_4_120v[67];
                                                (uvec3(182328u, 28443u, 29311u) - uvec3(87231u, 11392u, 156582u));
                                            }
                                            return;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(818.170, -9461.3453, -8.9, 334.619);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-38.04, -35.54, -2.7, -7.9);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        roundEven(vec2(-6835.4702, -5980.5166)).yyx;
                                        mat4x3(5.2, 29.47, -449.245, -1.9, -_GLF_IDENTITY(9.0, min(_GLF_IDENTITY(9.0, 0.0 + (9.0)), _GLF_IDENTITY(9.0, float(_GLF_IDENTITY(mat3(9.0, 1.0, 0.0, 0.0, 0.0, 1.0, sqrt(1.0), 0.0, 0.0), transpose(transpose(mat3(9.0, 1.0, 0.0, 0.0, 0.0, 1.0, sqrt(1.0), 0.0, 0.0)))))))), -45.21, 98.47, -1.5, 7747.8312, 1.1, -6.8, -69.37);
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(7.8, -95.49, -0.5, -76.61);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        for (mat3x4 _GLF_SWITCH_4_121v, _GLF_SWITCH_4_122v[74]; true; uvec2(81945u, 112931u)) {
                                            do {
                                                ;
                                                bvec4 _GLF_SWITCH_4_123v[83], _GLF_SWITCH_4_124v, _GLF_SWITCH_4_125v;
                                                if (false) {
                                                    (_GLF_IDENTITY(false ? (mat4(82.96, -8342.5080, 2.2, -911.183, 655.330, -4305.0093, -97.12, 5.7, 80.44, -665.439, 804.893, 185.245, -8.0, 5.9, -9150.0810, 537.346) + mat4(42.42, -4.5, 843.417, 485.136, 0.0, -6382.1411, -11.48, -_GLF_IDENTITY(4.6, (_GLF_IDENTITY(4.6, clamp(_GLF_IDENTITY(4.6, max(4.6, 4.6)), _GLF_IDENTITY(4.6, max(4.6, 4.6)), 4.6))) + 0.0), -45.87, -871.937, 87.38, 451.056, 6101.0347, -386.513, -382.708, -13.58)) : (mat3x4(454.060, -20.86, -98.82, 0.7, 4.1, 117.417, -72.32, -7.0, -4.4, -7625.6931, -7117.2931, -8.1) * mat4x3(-7365.8740, 5.9, 53.17, 7734.9981, _GLF_IDENTITY(-2.3, (-2.3) - 0.0), 287.102, 8.9, -928.989, 3.8, 2203.4782, 864.245, 91.86)), mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (_GLF_IDENTITY(false ? (mat4(82.96, -8342.5080, 2.2, -911.183, 655.330, -4305.0093, -97.12, 5.7, 80.44, -665.439, 804.893, 185.245, -8.0, 5.9, -9150.0810, 537.346) + mat4(42.42, -4.5, 843.417, 485.136, 0.0, -6382.1411, -11.48, -_GLF_IDENTITY(4.6, (_GLF_IDENTITY(4.6, clamp(_GLF_IDENTITY(4.6, max(4.6, 4.6)), _GLF_IDENTITY(4.6, max(4.6, 4.6)), 4.6))) + 0.0), -45.87, -871.937, 87.38, 451.056, 6101.0347, -386.513, -382.708, -13.58)) : (mat3x4(454.060, -20.86, -98.82, 0.7, 4.1, 117.417, -72.32, -7.0, -4.4, -7625.6931, -7117.2931, -8.1) * mat4x3(-7365.8740, 5.9, 53.17, 7734.9981, _GLF_IDENTITY(-2.3, (-2.3) - 0.0), 287.102, 8.9, -928.989, 3.8, 2203.4782, 864.245, 91.86)), (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? (false ? (mat4(82.96, -8342.5080, 2.2, -911.183, 655.330, -4305.0093, -97.12, 5.7, 80.44, -665.439, 804.893, 185.245, -8.0, 5.9, -9150.0810, 537.346) + mat4(42.42, -4.5, 843.417, 485.136, 0.0, -6382.1411, -11.48, -_GLF_IDENTITY(4.6, (_GLF_IDENTITY(4.6, clamp(_GLF_IDENTITY(4.6, max(4.6, 4.6)), _GLF_IDENTITY(4.6, max(4.6, 4.6)), 4.6))) + 0.0), -45.87, -871.937, 87.38, 451.056, 6101.0347, -386.513, -382.708, -13.58)) : (mat3x4(454.060, -20.86, -98.82, 0.7, 4.1, 117.417, -72.32, -7.0, -4.4, -7625.6931, -7117.2931, -8.1) * mat4x3(-7365.8740, 5.9, 53.17, 7734.9981, _GLF_IDENTITY(-2.3, (-2.3) - 0.0), 287.102, 8.9, -928.989, 3.8, 2203.4782, 864.245, 91.86))) : _GLF_FUZZED(mat4(-1613.2281, 4.0, -8.7, 6.0, -5.9, -4.2, 6.2, 71.71, -2.9, 5.0, -0.5, 7.9, -3578.1450, 1.3, 2109.4891, 9.3)))))));
                                                    for (uint _GLF_SWITCH_4_126v, _GLF_SWITCH_4_127v, _GLF_SWITCH_4_128v; true; outerProduct(injectionSwitch, (mat3x2(616.773, -7.7, 8503.0591, -53.51, -5451.5765, -269.942) * vec3(9.6, -34.68, _GLF_IDENTITY(0.0, (false ? _GLF_FUZZED(1259.3299) : 0.0)))))) {
                                                        vec3(-6.6, -8.7, 998.666);
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(30.32, -65.79, 6.5, -2.5);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(1.0, 8.3, 25.58, -5.9);
                                                    }
                                                    {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(3.4, -2560.3013, -0.7, -446.908);
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = dFdyCoarse(atan(vec4(-8823.5249, -8310.7636, 4.4, 5.5), log(vec4(0.8, -0.8, 338.230, 6400.8288))));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = roundEven(vec4(-4.9, -5445.9645, 2.7, 99.44));
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        uvec2 _GLF_SWITCH_4_129v, _GLF_SWITCH_4_130v[21];
                                                    }
                                                    mat4 _GLF_SWITCH_4_131v, _GLF_SWITCH_4_132v[13], _GLF_SWITCH_4_133v;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec3(745.907, 75.71, -750.902).tstt;
                                                    }
                                                } else {
                                                    (9187.7596, bvec3(true, false, false));
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = tanh(vec4(-7201.2827, -4.7, 0.2, -64.10));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = exp2(cos(vec4(-9.7, 798.802, -7.5, -447.206)));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                ivec4(40839, -53784, 53413, 8892);
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(3384.0298, -540.534, 7.6, -113.303);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(-6133.1053, -953.167, -3.4, -2.3);
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(9.1, 497.091, -521.427, -537.669);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                do {
                                                    uvec4 _GLF_SWITCH_4_134v, _GLF_SWITCH_4_135v[53];
                                                    return;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(2.8, -4.0, -5.4, 22.98);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = (_GLF_color * mat4(2.8, -7793.8781, -925.413, 9.2, -6.9, -3959.7555, -8.9, 749.159, 954.857, 5.2, 0.8, -2.7, -852.202, -6.1, -520.503, 809.976));
                                                    }
                                                    continue;
                                                    if ((mat2x3(_GLF_IDENTITY(2.6, max(2.6, 2.6)), 0.2, 2.1, -0.0, _GLF_IDENTITY(708.965, min(708.965, 708.965)), -8.4) != (_GLF_IDENTITY(true, (_GLF_IDENTITY(true, !(!(true)))) && true) ? mat2x3(42.85, -382.853, -9.0, 2603.6624, 5.8, 1.3) : mat2x3(7.8, -7.3, -0.8, 4.6, -610.537, _GLF_IDENTITY(4.5, (true ? 4.5 : _GLF_FUZZED(-6.2))))))) {
                                                        mat4x2(_GLF_IDENTITY(-914.728, max(-914.728, -914.728)), -631.598, 234.772, 8.3, 6.0, -2.3, -3784.8528, 1.1);
                                                        break;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(3.6, 5.4, -4.9, -64.03);
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(201.711, -0.3, 3663.3348, 351.482);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-272.488, 0.5, -533.018, -262.558);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    break;
                                                    mat4x3 _GLF_SWITCH_4_136v[60];
                                                    if (((false ? mat3x4(-12.71, 9.3, -97.10, 2.9, -8.6, _GLF_IDENTITY(-78.81, (-78.81) * exp(0.0)), -9.2, -6.8, -811.385, -3.8, 2.0, 79.13) : mat3x4(810.791, -1.0, -7.0, 8.2, -34.29, -54.98, 53.59, 3.2, -44.25, -138.489, 330.841, -51.94)) != mat3x4(-1.6, -78.83, -200.353, 75.20, -7.7, -8.4, -7.3, -_GLF_IDENTITY(4.0, clamp(4.0, 4.0, 4.0)), -6.8, -_GLF_IDENTITY(11.63, mix(float(_GLF_FUZZED(6.7)), float(11.63), bool(true))), 82.16, 8226.2132))) {
                                                        _GLF_IDENTITY((+mat4(_GLF_IDENTITY(9.3, float(mat2(9.3, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), clamp(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0))))), 1.0, 0.0))), 4815.1360, 33.21, 113.828, -9.1, 197.495, -6.1, -6.4, 7.0, 401.792, -1661.7667, -7.5, 896.676, 6466.1177, -5.6, 9017.0927)), mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + ((+mat4(_GLF_IDENTITY(9.3, float(mat2(9.3, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), clamp(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0))))), 1.0, 0.0))), 4815.1360, 33.21, 113.828, -9.1, 197.495, -6.1, -6.4, 7.0, 401.792, -1661.7667, -7.5, 896.676, 6466.1177, -5.6, 9017.0927))));
                                                        uvec2(149820u, 59794u);
                                                        break;
                                                        (true ? mat4x3(4.9, -1.0, 7.6, -8.2, 172.247, 554.447, _GLF_IDENTITY(7.3, clamp(7.3, 7.3, 7.3)), -571.751, -6.0, 98.84, -53.46, -5.5) : mat4x3(-52.92, _GLF_IDENTITY(-354.004, min(-354.004, -354.004)), 72.64, 980.514, _GLF_IDENTITY(-5.6, (false ? _GLF_FUZZED(28.66) : (-5.6))), 9.9, -6.7, -0.3, _GLF_IDENTITY(868.381, max(_GLF_IDENTITY(868.381, clamp(868.381, 868.381, 868.381)), 868.381)), -0.1, -8054.1702, -6915.7011));
                                                        return;
                                                    } else {
                                                        bvec4(bvec2(true, false), true, false);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = uintBitsToFloat((113479u & (102568u % uvec4(140824u, 44375u, 174791u, 48923u))));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        continue;
                                                        discard;
                                                        mat3x2(7.4, 24.59, 27.14, 4.9, -95.61, 2.5);
                                                        greaterThanEqual(vec3(6258.3677, -3.4, -5.1), _GLF_IDENTITY(resolution, min(resolution, resolution)).sts);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-1053.9797, -4.3, 7874.2442, -32.29);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(vec2(1.5, 43.81), vec2(-5746.7947, 5814.7116));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    while (any(bvec2(false, _GLF_IDENTITY(false, true && (false))))) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = fma(log(vec4(-296.908, 2252.0456, -5929.0935, 8046.5945)), vec4(-71.26, -2.5, -104.887, -17.07), vec4(-9545.8197, 2.3, 8706.1484, 507.776));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    uvec3 _GLF_SWITCH_4_137v;
                                                } while ((vec4(-5.2, 190.768, -6.9, -3.7).y > step(243.980, -278.983)));
                                                continue;
                                                ((-8.2) - mat4(-0.7, 32.90, 9158.7373, 1.5, 8.3, -3.6, 371.833, 75.15, -5.8, -76.20, -118.030, -816.793, 3513.3617, -515.133, -_GLF_IDENTITY(6.5, (_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))) ? 6.5 : _GLF_FUZZED(-9.5))), 8.9));
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = fma(vec4(2.3, 2.8, -90.28, -6.3), cosh(vec4(4.1, -643.609, -21.05, 5154.7203)), vec4(-67.28, -193.430, -7.1, -9680.5914));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                mat4(9577.5342, -2.3, -802.093, 3026.0139, -8.1, 9.8, -637.936, 923.222, 666.671, 1960.9059, -727.785, -_GLF_IDENTITY(133.516, max(133.516, _GLF_IDENTITY(133.516, min(_GLF_IDENTITY(133.516, clamp(133.516, 133.516, 133.516)), 133.516)))), -5.3, -_GLF_IDENTITY(570.451, min(_GLF_IDENTITY(570.451, float(vec4(570.451, _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 1.0, 0.0)), dot(vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 1.0, 0.0))), tan(0.0), 0.0))), 570.451)), 6.9, -3.2);
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = (vec3(62.74, -7.2, -7.4).sp, vec4(-7.1, 8.6, -35.85, -29.31));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                bvec4 _GLF_SWITCH_4_138v, _GLF_SWITCH_4_139v;
                                            } while (false);
                                            while (false) {
                                                return;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                if (true) {
                                                    mat4x2(-51.71, 9866.5688, 47.22, -1.7, 73.98, -8198.2660, -6.9, 90.80);
                                                    return;
                                                    vec4 _GLF_SWITCH_4_140v, _GLF_SWITCH_4_141v[25], _GLF_SWITCH_4_142v;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(915.252, 8.2, 88.89, -6653.5027);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    break;
                                                    for (((-2.2) / mat2x3(2.1, -9668.7701, 3437.1552, 394.947, -8774.0905, -6.7)); false; mat4x2(mat3x2(2.2, 967.766, 2.6, -3.8, -2.1, 94.45))) {
                                                        mat2x4(3.9, -8.0, -5.6, -7425.7281, 593.148, -1770.0340, _GLF_IDENTITY(-984.408, max(-984.408, _GLF_IDENTITY(-984.408, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? (-984.408) : _GLF_FUZZED(-8.3))))), -552.684);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(0.7, -94.97, -3767.0745, 63.35);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(3.8, 5521.3976, 1.8, 9.0);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat3x4 _GLF_SWITCH_4_143v;
                                                        mat3x2(_GLF_IDENTITY(-0.1, (false ? _GLF_FUZZED(vec3(6.5, 363.741, 182.192)[2]) : (-0.1))), -6.4, -6.8, -355.395, 8.9, _GLF_IDENTITY(2586.4505, (_GLF_IDENTITY(2586.4505, (true ? 2586.4505 : _GLF_FUZZED(-5.6)))) / 1.0));
                                                        ;
                                                        ivec4 _GLF_SWITCH_4_144v, _GLF_SWITCH_4_145v;
                                                    }
                                                    _GLF_SWITCH_4_142v;
                                                    _GLF_IDENTITY(uvec4(143496u, 159184u, 22468u, 58005u), (true ? uvec4(143496u, 159184u, 22468u, 58005u) : _GLF_FUZZED(uvec4(168485u, 65252u, 100212u, 107261u))));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(tan(vec2(0.0, 0.0))))))) {
                                                        _GLF_color = fma((_GLF_SWITCH_4_142v * _GLF_color), _GLF_SWITCH_4_140v, vec4(-306.638, 57.19, 7527.6382, -8.8));
                                                        {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = (5337.4884 / vec4(9.2, -5021.5138, -0.1, 61.99));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(395.911, 616.109, 83.47, -256.436);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = log(vec4(1.6, 7.0, 0.1, 83.40));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_color = (clamp(6.8, -9.0, 3.1), dFdx(vec4(1492.5215, -0.3, 97.39, 7.1)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    discard;
                                                } else {
                                                    (_GLF_IDENTITY(uvec4(156217u, 102370u, 176362u, 123157u).t / uvec4(68434u, 159119u, 193485u, 98285u), (uvec4(156217u, 102370u, 176362u, 123157u).t / uvec4(68434u, 159119u, 193485u, 98285u)) | (uvec4(156217u, 102370u, 176362u, 123157u).t / uvec4(68434u, 159119u, 193485u, 98285u))));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = fma(vec4(1.5, 6.5, 23.29, -882.958), vec4(-3.2, -164.017, 28.14, -3125.9378), dFdyCoarse(vec4(-1.0, -8.5, 70.45, 83.77)));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_color = _GLF_color;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = dFdx(ldexp(vec4(260.354, -306.705, -3.3, 2448.0703), ivec4(18835, -67139, 8118, -21171)));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(11.28, -10.55, 8.6, 58.35);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    ivec3 _GLF_SWITCH_4_146v;
                                                    ;
                                                    (mat3(4.9, 4914.4988, 97.32, 2.7, -73.40, 7.4, -1.2, 61.31, 25.46) * mat4x3(_GLF_IDENTITY(2610.9262, max(2610.9262, 2610.9262)), -39.93, -6279.6613, -532.261, 2.7, 6.3, -4.5, 6.7, -_GLF_IDENTITY(9.2, float(_GLF_IDENTITY(mat4x2(9.2, sqrt(1.0), sin(0.0), 0.0, 1.0, log(1.0), log(1.0), 1.0), mat4x2(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat4x2(9.2, sqrt(1.0), sin(0.0), 0.0, 1.0, log(1.0), log(1.0), 1.0))))), 4.7, -9.5, 543.160));
                                                }
                                                if ((!true)) {
                                                    for (mat3 _GLF_SWITCH_4_147v[57], _GLF_SWITCH_4_148v[24], _GLF_SWITCH_4_149v[73]; true; (mat4(-12.83, -389.745, 3.2, -6574.4923, 566.107, -2.0, 8384.9927, 319.190, 8.0, 88.18, -1.1, _GLF_IDENTITY(-7716.7502, _GLF_IDENTITY(float(mat4x2(-7716.7502, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0)), 1.0 * (float(mat4x2(-7716.7502, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0))))), 0.8, -6.8, 1.5, 9684.9636) - (matrixCompMult(mat2x4(25.69, 4314.2922, _GLF_IDENTITY(-5.6, min(_GLF_IDENTITY(-5.6, (-5.6) - 0.0), -5.6)), -2.1, -26.12, -_GLF_IDENTITY(3524.3968, max(3524.3968, 3524.3968)), -1.2, 8.8), mat2x4(-1876.6954, _GLF_IDENTITY(1724.5335, (_GLF_IDENTITY(1724.5335, (1724.5335) / 1.0)) * 1.0), 3.9, 5816.5962, 5795.4652, 890.226, 85.02, -48.49)) * mat4x2(3.1, 96.63, -7.4, 1.7, 8420.8397, -3.1, -3.2, -542.393)))) {
                                                    }
                                                    lessThan(_GLF_IDENTITY(uvec2(2790u, 21177u), (uvec2(2790u, 21177u)) | (uvec2(2790u, 21177u))), uvec2(146023u, 180048u));
                                                    {
                                                        mat3x2 _GLF_SWITCH_4_150v, _GLF_SWITCH_4_151v[52], _GLF_SWITCH_4_152v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-92.09, -0.0, -9059.2304, -8.0);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        true;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-3.3, -1.9, 904.800, 41.31);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        bvec3(false, true, (3365u != 77486u));
                                                        bvec3 _GLF_SWITCH_4_153v, _GLF_SWITCH_4_154v;
                                                        ;
                                                        resolution;
                                                        break;
                                                        ivec3(_GLF_IDENTITY(960, (960) >> int(_GLF_ZERO(0.0, injectionSwitch.x))), 71413, _GLF_IDENTITY(-226, 1 * (_GLF_IDENTITY(-226, max(-226, -226)))));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = vec4(-4637.3367, resolution, 76.52);
                                                        }
                                                        dFdxCoarse(dFdxFine(9.6));
                                                    }
                                                    if ((i != (-49917))) {
                                                        return;
                                                        ;
                                                        ivec3(-19754, -80890, -64439);
                                                        uvec2(39684u, 47785u).st[1];
                                                        151342u;
                                                        mat2x4 _GLF_SWITCH_4_155v[15], _GLF_SWITCH_4_156v;
                                                        (64849 ^ i);
                                                        break;
                                                        intBitsToFloat(ivec2(85606, 94842));
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-3.3, 5.0, 5.3, -1.3);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    {
                                                        (bvec3(_GLF_IDENTITY(true, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)) || (_GLF_IDENTITY(true, !(!(true))))), false, true)[0] ? _GLF_SWITCH_4_121v : mat3x4(884.712, 1584.5313, 748.870, 1.6, -1131.2839, 613.926, -69.47, 6.8, -0.8, -22.46, -20.05, -7.7));
                                                        (true ? not(bvec3(true, false, true)) : bvec3(false, true, true));
                                                        mat4(7440.3170, -9.3, -6.8, 310.885, -1.3, 2.3, -6984.1810, 8.1, 63.63, -5.6, 978.868, 4.7, -2.9, -46.24, -7281.7458, _GLF_IDENTITY(60.41, mix(float(_GLF_FUZZED(-403.735)), float(60.41), bool(true))));
                                                        mat4x3 _GLF_SWITCH_4_157v[89];
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(vec2(-9.0, -90.03), 2.3, -743.193);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = (dot(vec3(-8.5, 7.8, 91.51), vec3(-9801.9162, -0.0, -707.365)) / vec4(6.0, 52.02, -1.1, -9370.9515));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                ;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-4782.0934, -9.5, 73.23, 236.129);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                _GLF_color = _GLF_color;
                                            }
                                        }
                                        mat4x2(-3642.2037, 867.788, -6.6, -23.43, -98.17, 499.115, 77.69, -5.9);
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-6.0, -97.48, -509.919, -24.76);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        return;
                                        for (mat3x2 _GLF_SWITCH_4_158v; _GLF_IDENTITY(bvec2(true, false), _GLF_IDENTITY(bvec2(bvec4(bvec2(true, false), false, true)), bvec2(bvec2(bvec2(bvec4(bvec2(true, false), false, true)))))).t; uvec3(131866u, _GLF_IDENTITY(105654u, (105654u) | uint(_GLF_ZERO(0.0, injectionSwitch.x))), 91436u).zxx) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = vec4(9.4, -7.1, -251.381, 7301.0164);
                                            }
                                            discard;
                                            break;
                                            -9357.7694;
                                            continue;
                                            {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = (uvec4(196942u, 147196u, 108687u, 53301u), (vec4(-9230.5306, 3.9, -7.4, 25.94) / (-71.88)));
                                                }
                                                bvec2 _GLF_SWITCH_4_159v;
                                            }
                                            {
                                                mat4x3(-431.164, -9.1, -990.633, 3.7, -1994.2701, 40.87, 820.133, -49.08, 1.8, -1254.8149, 90.06, 9717.3155);
                                                uvec3 _GLF_SWITCH_4_160v, _GLF_SWITCH_4_161v, _GLF_SWITCH_4_162v[11];
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(7268.3511, -1317.0150, -72.16, 9715.8306);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            ivec2 _GLF_SWITCH_4_163v;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = step(-3816.0997, vec4(-0.2, 0.1, 4830.1850, -50.27));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = mat2x4(3.3, -9165.7265, 778.782, 64.64, -1.0, -57.42, 725.440, 3741.1561)[0];
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        (_GLF_IDENTITY((ivec2(-20371, 26370) + _GLF_IDENTITY(ivec2(55023, 72316), (_GLF_IDENTITY(ivec2(55023, 72316), max(ivec2(55023, 72316), ivec2(55023, 72316)))) + ivec2(0, 0))) | ivec2(50137, 28140), (false ? _GLF_FUZZED(((-31723) ^ ivec2(8984, 47104))) : ((ivec2(-20371, 26370) + _GLF_IDENTITY(ivec2(55023, 72316), (_GLF_IDENTITY(ivec2(55023, 72316), max(ivec2(55023, 72316), ivec2(55023, 72316)))) + ivec2(0, 0))) | ivec2(50137, 28140)))));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(867.387, -3.5, -500.284, -2.5);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        for (ivec4 _GLF_SWITCH_4_164v[77]; (i == 52195); uvec2(56672u, 25417u)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            ivec2 _GLF_SWITCH_4_165v, _GLF_SWITCH_4_166v;
                                            return;
                                            if (all(bvec2(true, true))) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = (9223.3279 / _GLF_outVarBackup_GLF_color);
                                                }
                                                if (false) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (mat4(-1.2, 8524.1737, 4.1, 497.527, -9065.5158, -31.54, -66.03, 10.34, 7424.3157, 6.3, -34.54, 879.498, 33.42, -34.49, 47.59, -43.78) * (-vec4(-1.0, -543.853, -70.14, 65.08)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    continue;
                                                    return;
                                                    continue;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = acos(vec4(7039.1609, -5.0, -4.3, -850.726));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                } else {
                                                    mat3 _GLF_SWITCH_4_167v, _GLF_SWITCH_4_168v[33];
                                                    {
                                                        return;
                                                        abs(i);
                                                        uvec3(10274u, 86688u, 3008u);
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(2.1, 2.7, 168.863, 6.3);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat4(-2.9, 41.78, -16.89, -385.352, 24.99, _GLF_IDENTITY(71.96, min(71.96, 71.96)), 949.117, -2.6, -131.527, 4772.2624, -9.1, -9.0, -33.09, 4.8, 56.01, _GLF_IDENTITY(25.51, (25.51) * 1.0));
                                                        vec4 _GLF_SWITCH_4_169v, _GLF_SWITCH_4_170v, _GLF_SWITCH_4_171v;
                                                    }
                                                    mat2x4 _GLF_SWITCH_4_172v;
                                                    do {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (((-26171) != (-822)) ? vec4(0.4, 8553.9348, 2.4, 86.77) : vec4(-8893.9169, 51.88, 100.281, 441.914));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat2(mat3x2(-1.8, -1360.5246, 2.0, 6233.0243, 9.8, -0.3));
                                                        uvec4 _GLF_SWITCH_4_173v, _GLF_SWITCH_4_174v[77];
                                                        mat2x4 _GLF_SWITCH_4_175v, _GLF_SWITCH_4_176v, _GLF_SWITCH_4_177v[46];
                                                        vec4 _GLF_SWITCH_4_178v[19], _GLF_SWITCH_4_179v;
                                                    } while ((51890u > bitfieldInsert(340u, 58792u, 3696, findMSB(196002u))));
                                                    for (bvec4(false, false, true, false); (mat3x4(-49.15, 884.753, -8151.8092, -4799.4148, -324.153, -4.6, _GLF_IDENTITY(6.6, mix(float(_GLF_FUZZED(655.659)), float(_GLF_IDENTITY(6.6, 0.0 + (6.6))), bool(true))), 9.4, -3.9, 8.8, 4792.5973, -1.2) == mat3x4(9462.2192, 5128.3372, 6.4, 5.6, -535.171, -1.7, -321.118, 4.2, -3959.9150, -6.0, 943.383, -357.112)); vec2(-5.8, 7906.8058)) {
                                                        ;
                                                        uvec4(112383u, 86200u, 143579u, 123603u);
                                                        mat3x4 _GLF_SWITCH_4_180v, _GLF_SWITCH_4_181v;
                                                        mat2 _GLF_SWITCH_4_182v[94];
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(vec3(0.4, -1.4, 802.415), 8400.0758);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            _GLF_color = vec4(-14.96, 9.7, -90.02, 8407.4619);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = ((87.97 + vec4(730.489, 930.529, -79.21, 2.3)) - 74.91);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_color = ((mat2x4(-64.34, 5555.3877, 5106.1971, -0.0, -1.3, 6541.8957, -1379.4300, 4.8) / 3391.5404) * vec2(5338.0412, -9.1));
                                                    }
                                                    bvec4 _GLF_SWITCH_4_183v, _GLF_SWITCH_4_184v;
                                                    199823u;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-6673.8486, 1.6, 0.1, 4.4);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (vec3(-31.79, 47.80, 0.1).xxyx - length(vec3(-4317.7099, -2233.8135, 15.32)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                for (ivec3 _GLF_SWITCH_4_185v; any(bvec4(true, false, false, false)); (_GLF_SWITCH_4_165v ^ i)) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-3.6, 610.411, -920.530, -3.3);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_color = vec4(-0.8, -42.84, -41.87, 27.62);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    while (true) {
                                                        bvec4(false, false, false, false);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-10.38, 3.0, -4.5, 2.4);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        return;
                                                        mat4x3(2260.0739, _GLF_IDENTITY(90.33, _GLF_IDENTITY(float(mat2x3(90.33, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 1.0, 1.0, 0.0)), min(float(mat2x3(90.33, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 1.0, 1.0, 0.0)), float(mat2x3(90.33, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 1.0, 1.0, 0.0))))), _GLF_IDENTITY(5.7, mix(float(_GLF_FUZZED(-9.3)), float(_GLF_IDENTITY(5.7, (true ? 5.7 : _GLF_FUZZED(-8366.8762)))), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))), -2444.8291, -38.66, -9.1, 1.3, 72.73, 97.49, -45.11, 3381.3090, 888.037);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (vec4(2.3, -0.3, 2615.3747, -7.1));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        vec2 _GLF_SWITCH_4_186v;
                                                    }
                                                    matrixCompMult(mat3(45.63, -7.9, 2311.1423, -0.5, 90.09, 4.7, 6376.4380, -9460.3122, -10.83), mat3(42.69, -647.278, -49.30, -45.11, -9.5, _GLF_IDENTITY(-8.1, (-8.1) / determinant(mat3(1.0, 0.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0))), abs(1.0), exp(0.0), 0.0, 0.0, 0.0, 1.0))), 6.1, 4515.2874, -881.444));
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(81.10, 63.49, -9362.9545, 2618.9261);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    ivec3 _GLF_SWITCH_4_187v, _GLF_SWITCH_4_188v;
                                                    (mat3(651.993, 785.904, -9091.6475, -9700.7447, 9542.9935, -74.93, 515.018, 5.9, -51.39) * mat4x3(-6.5, -7177.4124, 0.7, 9.9, -410.613, -5269.9246, 6.2, 70.14, 0.9, 12.53, -5033.5289, -0.7));
                                                    continue;
                                                    mat3x4 _GLF_SWITCH_4_189v;
                                                    mat4x3 _GLF_SWITCH_4_190v[23], _GLF_SWITCH_4_191v;
                                                    (uvec4(152259u, 42686u, 126661u, 91041u));
                                                }
                                                greaterThanEqual(uvec2(126407u, 184512u), (uvec2(12840u, 118967u) & uvec2(136931u, 181965u)));
                                                bool _GLF_SWITCH_4_192v;
                                                (vec4(-2.6, -_GLF_IDENTITY(696.650, (696.650) / 1.0), -4.3, -6.2) - _GLF_outVarBackup_GLF_color);
                                                {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(29.96, -859.739, 5.5, 5.1);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-531.589, 599.027, 5743.1429, 5302.1321);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    _GLF_color = degrees(vec4(9.7, -7837.4066, 8.2, -26.96));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), clamp(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))))))))) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-97.98, -17.92, 6.5, 9.9);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(_GLF_IDENTITY(!(_GLF_IDENTITY(true, bool(bvec2(true, true)))), (!(_GLF_IDENTITY(true, bool(bvec2(true, true))))) && true))))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                mat2x4(-3599.0209, 6.1, -4.7, 3.6, -6.0, -198.313, -2.3, -3467.3113);
                                                {
                                                    for (((mat2(31.96, -958.063, -4572.3794, 7.1) - 3.1)); false; mat2(6.5, -1.8, -6.4, -98.50)) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-771.970, 0.9, -32.47, 719.154);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(0.0))))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat2x3 _GLF_SWITCH_4_193v[62], _GLF_SWITCH_4_194v;
                                                        return;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-6.7, 2.6, -4343.2615, -4.2);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(8.1, -894.827, -4267.3337, -19.29);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                            }
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(1.5, -6923.2498, -234.325, -7.7);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                        mat4x2(_GLF_IDENTITY(2226.3589, max(2226.3589, 2226.3589)), -3.4, -180.534, 5.7, 2465.7329, 194.088, 96.01, -6.2);
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    uvec4(100690u, 168161u, 101307u, 75729u);
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(atan(vec2(-8.9, -13.36)), mod(vec2(7823.7719, -1.3), vec2(-2.7, 740.166)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    ((ivec3(47631, 84902, -_GLF_IDENTITY(72293, (72293) | (_GLF_IDENTITY(72293, (72293) | (72293))))) == ivec3(38635, -30, -75886)) ? mat4x3(-5395.1687, 9.3, -694.711, 1.2, -2.9, 7137.7395, 6.9, -4.2, 2.3, 4.6, -9.7, 86.38) : mat4x3(6.3, 2.1, -1058.4693, 939.097, -1675.1197, 806.614, -6.4, 2244.8265, -851.633, 62.93, 5.9, -8.4));
                                                    ivec2 _GLF_SWITCH_4_195v[40], _GLF_SWITCH_4_196v[38], _GLF_SWITCH_4_197v[55];
                                                    _GLF_SWITCH_4_192v;
                                                    continue;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = refract(vec4(1.2, 135.066, 9666.8430, 9.9), pow(dFdyCoarse(vec4(-750.354, -0.5, -3.2, -83.48)), mat4(-4827.7688, 92.26, -4.6, 406.876, 0.5, 81.56, -6.4, 2.1, 84.71, 216.529, -9.3, -225.909, -0.2, 45.27, -6.4, -4.5)[0]), -98.82);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_color = normalize(vec4(23.77, 46.30, -83.39, -816.547));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    continue;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-3062.2250, 3691.2075, -9080.9329, 5.7);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-36.38, 6218.6237, -1.6, 518.622);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-10.72, 1986.3732, 8242.0592, -1957.1475);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-1321.4029);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                if (_GLF_SWITCH_4_192v) {
                                                    if (_GLF_SWITCH_4_192v) {
                                                        true;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = (28.11 - _GLF_color);
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-9.6, 437.772, -5.1, -3.0);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        uvec3 _GLF_SWITCH_4_198v, _GLF_SWITCH_4_199v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = fwidth(vec4(-4796.7435, -77.14, 200.471, 162.668));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    } else {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-450.871, -4.6, 222.127, 4.7);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-4437.4992, 6776.2320, -2841.9874, -0.5);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-4543.6933, -2.8, -28.22, 83.73);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    {
                                                        ;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (vec4(-869.600, 321.657, 9933.0584, 25.60)).zyyz;
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        uvec4(67195u, 31785u, 37883u, 10115u);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = floor(vec4(-847.775, -97.09, 4.7, 2.1));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        bvec4(bvec4(true, false, true, false).br, bvec2(false, false));
                                                        break;
                                                        vec3 _GLF_SWITCH_4_200v[68], _GLF_SWITCH_4_201v[14], _GLF_SWITCH_4_202v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = ((uint(-20185)), vec4(-50.30, 89.01, -91.18, 448.316));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        int _GLF_SWITCH_4_203v[55], _GLF_SWITCH_4_204v, _GLF_SWITCH_4_205v;
                                                        float _GLF_SWITCH_4_206v, _GLF_SWITCH_4_207v[52];
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        true;
                                                        return;
                                                    }
                                                    bvec2 _GLF_SWITCH_4_208v;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-870.252, 4.5, -5.7, 2061.0426);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    ivec2 _GLF_SWITCH_4_209v, _GLF_SWITCH_4_210v, _GLF_SWITCH_4_211v;
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(8.5, 92.71, 81.71, 9961.9215);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    } else {
                                                        mat4(5285.2001, -5.3, -0.7, 287.421, 36.74, 2848.3811, 34.22, -91.55, 677.190, -17.59, -4482.3201, -875.934, 7927.6337, -73.48, -1.8, 1071.2681);
                                                    }
                                                }
                                                while ((72287 <= i)) {
                                                    mat2 _GLF_SWITCH_4_212v, _GLF_SWITCH_4_213v;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = ((-5225.9050) / vec4(-1.0, -8.7, -8.0, -7.9));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                            } else {
                                                do {
                                                    (ivec4(48051, 33365, -3649, -78403) ^ ivec4(23393, -81253, 97839, -47964));
                                                    break;
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = ceil(vec4(3447.1442, -709.827, 723.774, 5.0));
                                                    }
                                                    {
                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                            ivec4(-48925, _GLF_IDENTITY(-93723, int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ (-93723)), 13329, 67125);
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = (49.17 / vec4(16.78, 2.0, -7065.5658, -4510.0253));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                        -68970;
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = fma((5.4 * vec4(-425.393, -7.8, 1.1, 6.9)), vec4(-3.2, -9857.9658, 6723.2248, -8.9), vec4(85.86, 6.6, -930.908, -743.639));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            _GLF_color = sqrt(vec4(-238.873, -2931.2081, 51.46, -962.759));
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = fwidth(vec4(-0.8, -60.75, 228.783, 57.59));
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-8500.5582, -947.516, 4.0, 1.6);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        bvec2 _GLF_SWITCH_4_214v[1], _GLF_SWITCH_4_215v, _GLF_SWITCH_4_216v;
                                                        mat2x3(-486.499, 27.17, -5275.9003, 226.013, -381.513, 8.5);
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(689.113, vec3(748.962, -5293.0410, -5.8));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = max(vec4(-2085.4352, -3.9, 622.282, -8270.3316), vec4(1.7, 4.6, 0.9, 921.669));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    for (mat3(_GLF_IDENTITY(-56.12, mix(float(_GLF_FUZZED(6.0)), float(-56.12), bool(true))), -1.7, -3.4, -45.31, -37.79, -6.1, -0.0, 2027.1995, 7.6); false; (mat4x3(66.67, -1501.4688, 5881.9416, 19.32, -5240.6029, 3.8, -455.993, 306.405, 8956.0146, -5459.9453, _GLF_IDENTITY(5.6, _GLF_IDENTITY(float(mat2x3(5.6, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(sqrt(0.0), 0.0, 0.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(sqrt(0.0), 0.0, 0.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0))), 1.0, log(1.0))), float(mat3(_GLF_IDENTITY(float(mat2x3(5.6, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(sqrt(0.0), 0.0, 0.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(sqrt(0.0), 0.0, 0.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0))), 1.0, log(1.0))), (float(mat2x3(5.6, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(sqrt(0.0), 0.0, 0.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(sqrt(0.0), 0.0, 0.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0))), 1.0, log(1.0)))) / 1.0), 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0)))), 7.4) * mat2x4(_GLF_IDENTITY(-53.71, float(mat3x4(-53.71, 0.0, 1.0, 1.0, 1.0, 0.0, cos(0.0), 0.0, 0.0, 1.0, 0.0, sqrt(1.0)))), 1.8, 9.0, 9836.7247, -99.59, 1658.2216, 9.9, 642.531))) {
                                                        clamp(uvec2(_GLF_IDENTITY(47051u, (47051u) / 1u), 58175u)[0], (3012u & 122224u), 99409u);
                                                        continue;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = unpackUnorm4x8(38459u);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        faceforward(_GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color, inversesqrt(vec4(-5.8, 1640.8213, -8045.2574, 0.3)));
                                                        ;
                                                        uvec4 _GLF_SWITCH_4_217v, _GLF_SWITCH_4_218v[12], _GLF_SWITCH_4_219v;
                                                        mat3x4 _GLF_SWITCH_4_220v[89], _GLF_SWITCH_4_221v;
                                                    }
                                                    ivec3(4607, 17116, -92135);
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-4.9, 601.372, -9.3, 45.34);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    for (uvec4 _GLF_SWITCH_4_222v[29], _GLF_SWITCH_4_223v, _GLF_SWITCH_4_224v; (bvec3(true, true, false) == bvec3(false, false, true)); greaterThan(vec3(-325.136, _GLF_IDENTITY(67.85, mix(float(_GLF_IDENTITY(67.85, float(mat2x4(67.85, 1.0, 1.0, 0.0, 1.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0, 0.0)))), float(_GLF_FUZZED(-3.6)), bool(false))), 44.96), vec3(-87.19, -837.617, 19.68))) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = exp(refract(_GLF_color, vec4(-2.7, 2859.9442, -0.4, 9.7), -5.9));
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = ceil(vec4(-6335.5895, -900.087, -5141.1635, -31.70));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                        ivec2(-90557, -4341);
                                                        mat4 _GLF_SWITCH_4_225v, _GLF_SWITCH_4_226v;
                                                    }
                                                    mat3x2(-2308.2547, -1.7, -22.19, 617.871, -9513.5185, 18.33);
                                                    if (false) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(836.726, 61.41, 78.42, -2.5);
                                                        }
                                                        return;
                                                        (-mat3(mat2x4(8.1, -1162.7692, 143.039, 742.611, -2033.8654, 62.46, _GLF_IDENTITY(3.2, min(3.2, _GLF_IDENTITY(3.2, min(3.2, 3.2)))), 51.91)));
                                                        bvec3(bvec4(false, true, false, false));
                                                        (mat3x4(-719.662, -836.854, -646.812, 0.9, _GLF_IDENTITY(-707.950, min(_GLF_IDENTITY(-707.950, max(-707.950, -707.950)), -707.950)), 80.61, -5.6, -36.14, -8.5, 274.370, -3.2, -3.5) * mat2x3(-9.9, 49.87, -8831.4440, 3.6, 70.00, 2.2));
                                                        mat2x4 _GLF_SWITCH_4_227v, _GLF_SWITCH_4_228v[42];
                                                        break;
                                                    }
                                                } while (false);
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(9.2, 3697.5831, 0.5, -8360.3072);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                } else {
                                                    (_GLF_outVarBackup_GLF_color * _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(sinh(vec4(-1.5, -201.532, 446.843, -9961.9714))) : _GLF_outVarBackup_GLF_color)));
                                                }
                                                discard;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = min(vec4(7.9, -1.9, -3.1, 8.8), vec4(68.51, 7876.2520, 2.8, 8.4));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = step(vec4(10.37, 13.31, -59.66, -384.276), vec4(195.961, 4.3, -4468.4802, 0.6));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = (+vec4(90.00, -2670.5573, 8.1, -580.208));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                return;
                                                uvec3 _GLF_SWITCH_4_229v, _GLF_SWITCH_4_230v[70], _GLF_SWITCH_4_231v;
                                                break;
                                                while (true) {
                                                    break;
                                                    mat3 _GLF_SWITCH_4_232v, _GLF_SWITCH_4_233v[93];
                                                    (-mat3x2(1.3, 94.36, -_GLF_IDENTITY(7588.1578, float(vec3(7588.1578, 1.0, 1.0))), -6532.6702, -3873.3294, -17.49));
                                                    tan(vec3(-362.022, -9.0, -9964.2748));
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(29.42, -3.7, -5.3, 3.5);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    ;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = exp2(vec4(-8.3, 6266.5871, 380.020, -3.8));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    bvec3(true, true, true);
                                                    mat3x2(8.1, 374.417, -24.31, -_GLF_IDENTITY(5.8, _GLF_IDENTITY(float(mat3(5.8, 0.0, tan(0.0), _GLF_ZERO(0.0, injectionSwitch.x), 1.0, round(length(normalize(vec3(1.0, 1.0, 1.0)))), 0.0, 1.0, _GLF_IDENTITY(dot(vec2(abs(1.0), 1.0), vec2(0.0, 0.0)), dot(vec2(abs(1.0), 1.0), vec2(0.0, 0.0))))), (false ? _GLF_FUZZED(481.072) : float(mat3(5.8, 0.0, tan(0.0), _GLF_ZERO(0.0, injectionSwitch.x), 1.0, round(length(normalize(vec3(1.0, 1.0, 1.0)))), 0.0, 1.0, _GLF_IDENTITY(dot(vec2(abs(1.0), 1.0), vec2(0.0, 0.0)), dot(vec2(abs(1.0), 1.0), vec2(0.0, 0.0)))))))), -42.55, 2.1);
                                                }
                                            }
                                            do {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(1.8, 3637.6056, -22.55, -33.18);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = cosh(_GLF_outVarBackup_GLF_color);
                                                }
                                                if (bool(21170u)) {
                                                }
                                                mat2x3(7629.2561, 658.205, 8518.4935, -46.15, -6.8, 775.292);
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = sinh(_GLF_color);
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(9.2, -7.3, -1.0, -5369.0060);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                mat3 _GLF_SWITCH_4_234v[47], _GLF_SWITCH_4_235v, _GLF_SWITCH_4_236v;
                                                lessThanEqual(vec4(-3.6, -_GLF_IDENTITY(8.8, mix(float(8.8), float(_GLF_FUZZED(6069.0439)), bool(false))), _GLF_IDENTITY(784.134, max(784.134, _GLF_IDENTITY(784.134, clamp(784.134, 784.134, 784.134)))), -65.50), (mat2x4(1.8, -2570.2116, -5017.3686, 2.5, -876.500, -51.04, _GLF_IDENTITY(-6.9, abs(_GLF_ONE(1.0, injectionSwitch.y)) * (-6.9)), 58.06) * injectionSwitch));
                                                mat3 _GLF_SWITCH_4_237v;
                                                {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(3128.4806, 6354.1045, 5.9, -6.5);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    bitCount(ivec4(_GLF_IDENTITY(53713, (_GLF_IDENTITY(53713, (false ? _GLF_FUZZED(16247) : 53713))) + (0 << _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), (int(4)) / 1)))), _GLF_IDENTITY(-84057, (-84057) | 0), -71596, 38886));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    uvec4 _GLF_SWITCH_4_238v, _GLF_SWITCH_4_239v;
                                                    while (all(bvec2(false, true))) {
                                                        dFdyCoarse(-7994.5871);
                                                    }
                                                    if ((uvec4(80641u, 70064u, 76684u, 112198u) != _GLF_SWITCH_4_239v)) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-5.3, 2.3, -7.7, 0.9);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                        break;
                                                        uvec3 _GLF_SWITCH_4_240v, _GLF_SWITCH_4_241v, _GLF_SWITCH_4_242v;
                                                        break;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(9.6, -651.302, -59.11, -674.984);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bool(true))))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            _GLF_color = vec4(2686.3002, 98.23, -3.8, 859.439);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        true;
                                                        mat4(-7.5, -2.3, _GLF_IDENTITY(-2.3, (-2.3) + 0.0), 9560.4009, 4295.9545, 5.6, 715.513, 4.6, -757.651, -7963.3710, -15.20, -6666.5457, -7.1, -2824.3993, 0.8, -8.8);
                                                        mat4 _GLF_SWITCH_4_243v[59];
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        ;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(1128.5670, 77.82, 832.658, -5.2);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            _GLF_color = mod(_GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color);
                                                        }
                                                        bvec2 _GLF_SWITCH_4_244v, _GLF_SWITCH_4_245v[26];
                                                    } else {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = dFdyCoarse(vec4(8.7, 5.6, 443.377, 4240.9811));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        resolution;
                                                        -7926.9359;
                                                        bvec4(false, true, false, true);
                                                        ivec4 _GLF_SWITCH_4_246v, _GLF_SWITCH_4_247v[37], _GLF_SWITCH_4_248v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = acosh(vec4(-92.18, -8121.5431, -1572.8131, 7.2));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        continue;
                                                    }
                                                    {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(5.8, 5937.6047, -74.04, -7.6);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = smoothstep(fwidthCoarse(reflect(vec4(3.2, 9893.1964, -68.03, 654.327), _GLF_outVarBackup_GLF_color)), (injectionSwitch * mat4x2(1.6, 817.334, -8163.7946, -99.39, -589.565, -0.1, -9.1, -2525.9477)), vec4(2133.1223, -485.588, 3.0, -63.54));
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = dFdxFine(vec4(-0.9, 3898.4219, -6.8, 978.508));
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-38.50, 7.3, 10.87, -75.48);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        ;
                                                        mat2x3(6775.1790, _GLF_IDENTITY(-835.742, mix(float(_GLF_FUZZED(-3.0)), float(-835.742), bool(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 0.0), vec4(1.0, 0.0, 0.0, 1.0)), dot(vec4(0.0, 1.0, 1.0, 0.0), vec4(1.0, 0.0, 0.0, 1.0)))))))), -8694.2759, 4260.4225, -344.992, _GLF_IDENTITY(-0.5, (_GLF_IDENTITY(-0.5, 0.0 + (-0.5))) * sqrt(1.0)));
                                                        mat2 _GLF_SWITCH_4_249v, _GLF_SWITCH_4_250v[4];
                                                        (mat4x2(9779.1407, -24.06, 82.67, -5148.1685, -2.0, 629.453, -5.8, -93.11) * _GLF_color);
                                                        ivec3(-88091, -78071, 82707);
                                                        _GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (false) {
                                                        uvec3(packUnorm2x16(injectionSwitch));
                                                        35078;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-600.124, 542.517, 9.9, -7.9);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        -9432.6593;
                                                        2.5;
                                                        break;
                                                        (98163u / _GLF_SWITCH_4_238v);
                                                    } else {
                                                        mat2x4 _GLF_SWITCH_4_251v, _GLF_SWITCH_4_252v, _GLF_SWITCH_4_253v;
                                                        i;
                                                        _GLF_SWITCH_4_235v;
                                                        break;
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-3.6, 8.7, 0.3, -7.9).brba;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-38.99, 9.8, 798.674, -1780.9278);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    (sign(ivec3(3524, 26746, 31908)) + (-13928));
                                                    while ((ivec4(-16051, _GLF_IDENTITY(93326, 0 + (93326)), 8966, _GLF_IDENTITY(-77873, max(-77873, -77873))) == ivec4(-_GLF_IDENTITY(89549, max(_GLF_IDENTITY(89549, ~(~(89549))), _GLF_IDENTITY(89549, (89549) / int(_GLF_ONE(1.0, injectionSwitch.y))))), 26170, 86702, 99739))) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(494.392, -6.5, -2332.1661, -9.5);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-2.7, 2342.2984, -4.5, -13.92);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                    for (mat3x4(mat3x2(-88.97, -0.6, 662.321, -5.1, 3.6, -138.038)); (148137u > 172683u); false) {
                                                        if ((bvec2(bvec4(true, false, false, false)) != bvec2(false, true))) {
                                                            break;
                                                        }
                                                        break;
                                                        for (mat4x2 _GLF_SWITCH_4_254v, _GLF_SWITCH_4_255v, _GLF_SWITCH_4_256v[97]; _GLF_IDENTITY((bvec2(false, true) != bvec2(false, false)), bool(_GLF_IDENTITY(bvec3((bvec2(false, true) != bvec2(false, false)), false, true), bvec3(bvec3(bvec3((bvec2(false, true) != bvec2(false, false)), false, true)))))); (_GLF_SWITCH_4_254v * 70.27)) {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = atan(vec4(-35.78, 851.057, -20.10, 29.40), vec4(-6.2, -4.1, 2333.2192, 7.2));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            uvec3(64747u, 149073u, 92006u);
                                                            bvec4 _GLF_SWITCH_4_257v, _GLF_SWITCH_4_258v;
                                                        }
                                                        {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = (vec4(397.672, -81.66, -5.2, -8.1) + (vec4(75.55, 35.88, 4.9, 13.38) / vec4(-0.4, -4.9, 87.14, 5.5)));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (sinh(vec4(-6968.2898, -0.5, -88.26, 11.58)) - vec4(9878.4312, -9598.8221, 4683.5790, -24.57));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = trunc(_GLF_color);
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-9.1, -0.6, -157.325, -4.9);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                }
                                                {
                                                    float _GLF_SWITCH_4_259v[30];
                                                    mat2 _GLF_SWITCH_4_260v[3];
                                                    while ((mat4(791.234, -68.45, 6204.0679, 664.644, 2.9, 667.251, 5320.9866, -267.679, -81.87, 29.71, -7964.3841, -8.4, -6973.8596, _GLF_IDENTITY(-71.35, (_GLF_IDENTITY(-71.35, mix(float(-71.35), float(_GLF_FUZZED(9.6)), bool(false)))) * 1.0), -76.28, 4989.7119) == mat4(mat3x4(762.011, 1205.1531, -88.34, -_GLF_IDENTITY(96.70, clamp(96.70, 96.70, _GLF_IDENTITY(96.70, float(mat2x3(96.70, 1.0, 0.0, 0.0, 0.0, 0.0))))), 0.6, 145.071, -2522.5519, -0.8, -3.9, -52.78, 974.064, 7400.2455)))) {
                                                        ivec2 _GLF_SWITCH_4_261v, _GLF_SWITCH_4_262v[10];
                                                        mat3x2(97.25, 52.84, -_GLF_IDENTITY(8.1, max(_GLF_IDENTITY(8.1, min(8.1, 8.1)), 8.1)), 419.663, -0.9, 1.9);
                                                        vec3(-32.85, 2928.4646, -8833.0217);
                                                        fwidthCoarse(mix(vec3(49.18, _GLF_IDENTITY(-_GLF_IDENTITY(6.7, min(6.7, 6.7)), clamp(_GLF_IDENTITY(-_GLF_IDENTITY(6.7, min(6.7, 6.7)), mix(float(-_GLF_IDENTITY(6.7, min(6.7, 6.7))), float(_GLF_FUZZED(-3611.8678)), bool(false))), _GLF_IDENTITY(-_GLF_IDENTITY(6.7, min(6.7, 6.7)), cos(0.0) * (-_GLF_IDENTITY(6.7, min(6.7, 6.7)))), -_GLF_IDENTITY(6.7, min(6.7, 6.7)))), 5.8), vec3(6.0, -157.657, 75.76), inversesqrt(vec3(-12.74, 4.2, -7.0))));
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(5246.1850, 3190.5597, -18.47, -140.823);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = normalize(vec4(-411.346, 42.05, 9209.6910, 74.53));
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    while (true) {
                                                        bvec3(true, true, false);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-53.84, -4.0, -7.6, -367.869);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = fract(vec4(-673.060, 15.09, 5192.6621, 410.596));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                        (bitfieldReverse(ivec3(-96073, 67783, -75682)) >> i);
                                                        bvec4 _GLF_SWITCH_4_263v[29], _GLF_SWITCH_4_264v[84], _GLF_SWITCH_4_265v;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = roundEven(_GLF_outVarBackup_GLF_color);
                                                        }
                                                        ((-188.909) - mat4(-1.6, -5.5, -11.83, -12.82, -7242.8206, 3.0, -286.841, 4507.1926, 276.080, -6183.4792, 830.396, -8.0, 76.47, _GLF_IDENTITY(9.1, max(9.1, 9.1)), 8.9, 8.2));
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(8129.7501, 0.0, -45.56, -2.2);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        lessThan(uvec2(47726u, 11326u), (54770u ^ uvec2(107546u, 102413u)));
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = fract(vec4(-4651.1499, -2961.1907, 19.89, -48.82));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(-5.2, -57.72, -7.5, 502.575);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    bvec4(true, false, false, false);
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(816.082, 684.773, -9.3, -52.68);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = log2(vec4(1.7, -5603.1646, 1.9, 5.5));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = tanh(vec4(-28.71, vec2(6.0, 3.6), 2424.5041));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                    return;
                                                    if (false) {
                                                        vec4 _GLF_SWITCH_4_266v[20];
                                                        uvec2(162231u, 101559u);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-5.9, mix(vec2(-9.6, -8.3), vec2(-1.8, 9.2), 5.6), 1.5);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        ;
                                                        mat2x4(5.6, 2.6, 8.7, 826.221, 1.7, 2.0, 327.126, 40.70);
                                                        i;
                                                        discard;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(6.0, -815.853, 547.908, -88.20);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat2x4 _GLF_SWITCH_4_267v;
                                                        vec3 _GLF_SWITCH_4_268v, _GLF_SWITCH_4_269v[87];
                                                        ;
                                                    } else {
                                                        greaterThanEqual(ivec4(79101, 54863, 54120, 69522), ivec4(2361, -17875, 37480, -63680)).q;
                                                        ivec3(-208, -49626, -9382);
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = radians(vec4(-571.607, refract(-8.2, -4.9, 568.992), 119.636, 6075.2675));
                                                        }
                                                    }
                                                }
                                            } while ((mat4x3(-218.651, -3845.5740, 9.7, 862.184, 142.497, -6.0, -8949.0545, -7622.6721, 927.171, -36.44, 668.084, -79.09) != mat4x3(-318.712, 341.393, 628.744, -30.10, -1.2, 7.9, -646.669, -2279.4443, _GLF_IDENTITY(-21.89, float(_GLF_IDENTITY(mat4x2(-21.89, sin(0.0), 0.0, 1.0, 1.0, 0.0, 1.0, 1.0), mat4x2(mat4x3(mat4x2(-21.89, sin(0.0), 0.0, 1.0, 1.0, 0.0, 1.0, 1.0)))))), 5042.7537, 1.8, -_GLF_IDENTITY(846.783, (846.783) / 1.0))));
                                            discard;
                                            if (false) {
                                                {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(905.303, -2935.9367, 38.01, 847.995);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    continue;
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = uintBitsToFloat(uvec4(28602u, 128733u, 167663u, 105133u));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                ;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-22.85, -6.3, 260.491, 96.56);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                for (mat2((mat4x3(2387.7884, -521.571, 67.73, -4451.5776, 78.36, _GLF_IDENTITY(-1.5, mix(float(_GLF_FUZZED(1.0)), float(-1.5), bool(true))), 521.660, -59.63, 1431.3005, 0.9, -20.91, -588.456) * mat3x4(mat2x4(-4.9, -3405.8924, -2.6, 7.2, 3838.4976, 4.1, 5.3, -9976.7963)))); (vec4(62.21, -_GLF_IDENTITY(7.8, max(7.8, 7.8)), 174.216, -8653.2093) != vec4(-0.7, -387.010, -226.492, -9.4)); greaterThanEqual(uvec3(140696u, 177911u, 116783u), uvec3(51768u, 60273u, 98367u))) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (mix(vec2(222.917, -48.65), vec2(999.512, -2278.3131), 8521.9311) * (mat4x2(7.3, 921.752, 5.7, 528.569, 536.305, -7805.4813, 2.4, 7.4) / mat4x2(-4.1, 4.3, 854.363, 128.984, -7993.4043, -9.2, 94.82, -1.7)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    uvec4 _GLF_SWITCH_4_270v, _GLF_SWITCH_4_271v;
                                                    if (all(bvec2(true, true))) {
                                                        do {
                                                            ;
                                                            (~_GLF_SWITCH_4_270v);
                                                            (uvec3(129366u, 10170u, 86760u) - _GLF_IDENTITY(bitfieldExtract(2385u, 73303, 7794), (_GLF_IDENTITY(bitfieldExtract(2385u, 73303, 7794), (bitfieldExtract(2385u, 73303, 7794)) - 0u)) | (bitfieldExtract(2385u, 73303, 7794))));
                                                            continue;
                                                            for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, 0 | (1))); _injected_loop_counter++) {
                                                                _GLF_SWITCH_4_166v;
                                                            }
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = round(vec4(-793.897, 635.494, -315.276, -1.7));
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            bvec2 _GLF_SWITCH_4_272v, _GLF_SWITCH_4_273v[62], _GLF_SWITCH_4_274v[29];
                                                        } while ((injectionSwitch != resolution));
                                                        if (false) {
                                                            bvec2 _GLF_SWITCH_4_275v[80];
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(6.8, 82.97, 8.0, 3770.9892);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            return;
                                                            break;
                                                            (ivec4(86642, -66465, 35058, 4805) - ivec4(-39088, 67841, _GLF_SWITCH_4_165v));
                                                            discard;
                                                            mat2x3(mat3x2(74.09, 2.2, -7.8, -60.77, -6.4, _GLF_IDENTITY(-639.305, mix(float(_GLF_FUZZED(7.8)), float(-639.305), bool(true)))));
                                                        }
                                                        continue;
                                                        mat2x3 _GLF_SWITCH_4_276v, _GLF_SWITCH_4_277v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (vec4(-61.69, 2.9, -380.498, 18.65) * mat4(1.2, 2.4, 8.8, -3.9, -8214.7925, -7833.5726, 33.15, 99.53, -44.57, -727.020, 4.5, -3770.4053, -2.9, -6.6, 562.117, -5753.1266));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        break;
                                                    } else {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = sinh(sin(sin(vec4(4583.7615, 6758.7358, 42.61, 695.976))));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(vec3(0.0, 0.0, 0.0)))))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        for (mat2x3 _GLF_SWITCH_4_278v[35], _GLF_SWITCH_4_279v; (_GLF_outVarBackup_GLF_color == max(_GLF_color, _GLF_outVarBackup_GLF_color)); (mat3(306.409, _GLF_IDENTITY(-9823.9639, min(-9823.9639, -9823.9639)), -443.304, -847.430, -0.4, -85.38, -252.928, 330.263, 218.681) / mat3(5.8, 8.5, 920.026, -900.029, 550.702, _GLF_IDENTITY(5.3, (_GLF_IDENTITY(5.3, max(5.3, 5.3))) + 0.0), -921.210, 562.058, 508.876))) {
                                                            uint _GLF_SWITCH_4_280v[71], _GLF_SWITCH_4_281v[48];
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(45.73, -28.45, -35.64, 71.44);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = dFdx(clamp(vec4(-6.9, 935.828, 0.6, -567.497), ((-56.26) * vec4(-730.781, 290.100, 19.13, 457.222)), vec4(85.02, -7876.7402, -6.7, -6247.7995)));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        {
                                                            mat2(_GLF_IDENTITY(84.66, float(mat3x4(84.66, _GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), _GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), (false ? _GLF_FUZZED(2.2) : dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0))))), 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, log(1.0), 1.0))), -8423.9118, -996.862, -0.7);
                                                            discard;
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                            int _GLF_SWITCH_4_282v[94], _GLF_SWITCH_4_283v;
                                                            break;
                                                            (uvec3(111372u, 48061u, 141425u) + (_GLF_SWITCH_4_270v[1] << 189311u));
                                                            ((7195.5851 / mat2x4(2089.0837, 0.6, -67.90, -660.558, -8.0, -47.54, -355.279, _GLF_IDENTITY(1.4, (_GLF_IDENTITY(1.4, (true ? 1.4 : _GLF_FUZZED(-4979.6828)))) - 0.0))), mix(94659u, (55739u & 14957u), false));
                                                        }
                                                        ((+mat3x2(-8544.4332, 9.8, -4.3, _GLF_IDENTITY(7391.6072, float(mat3x4(7391.6072, 1.0, _GLF_ONE(1.0, injectionSwitch.y), sqrt(_GLF_ZERO(0.0, injectionSwitch.x)), 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, log(1.0)))), -3.8, -1548.4302)) / (+60.83));
                                                        fwidthCoarse(_GLF_IDENTITY(injectionSwitch, vec2(injectionSwitch[0], injectionSwitch[1])));
                                                    }
                                                    continue;
                                                    while (true) {
                                                        continue;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(55.24, -870.475, -2.0, -726.105);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(1.0))))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        (uvec3(69891u, 92509u, 112766u) / uvec3(76442u, 182790u, 194683u));
                                                        if (true) {
                                                            uvec4 _GLF_SWITCH_4_284v[65], _GLF_SWITCH_4_285v[97], _GLF_SWITCH_4_286v[94];
                                                            uvec3 _GLF_SWITCH_4_287v[80], _GLF_SWITCH_4_288v;
                                                            break;
                                                            outerProduct(injectionSwitch, vec3(87.47, _GLF_IDENTITY(-1.2, (-1.2) * _GLF_ONE(1.0, injectionSwitch.y)), 5.7));
                                                        } else {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(1.9, 80.19, -0.2, -4.4);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            ivec2(-78775, 98347);
                                                            greaterThan(_GLF_SWITCH_4_165v, ivec2(16976, _GLF_IDENTITY(36058, ~(~(_GLF_IDENTITY(36058, max(36058, 36058)))))));
                                                        }
                                                        (+mat3(8.4, -14.28, -6.2, 4517.6823, 885.871, -6.8, 1254.6467, -2.3, -5.3));
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            while (_GLF_IDENTITY(true, true && (true))) {
                                                                bvec2(true, true).ggrg;
                                                                (46374u % uvec2(123133u, 57282u));
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(-67.19, -3.7, -8746.6058, -6.1);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                uvec4 _GLF_SWITCH_4_289v, _GLF_SWITCH_4_290v[44];
                                                                return;
                                                                max(i, (3817.4502, _GLF_SWITCH_4_165v)[1]);
                                                                bvec2(true, false);
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = (vec4(-82.36, -48.51, 5.2, -8453.6130) * mat4(mat3(-15.50, 941.164, -0.5, 8426.0144, 1.1, -98.66, -52.61, -3.8, -798.023)));
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = vec4(-1029.8895, 811.793, 7.0, 0.2);
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                }
                                                                bool _GLF_SWITCH_4_291v, _GLF_SWITCH_4_292v[65], _GLF_SWITCH_4_293v;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(839.346, -984.337, 4.7, 701.579);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = (vec4(-2.0, 5878.6764, -218.203, -4.8) - (-18.71));
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = vec4(4.4, 1.9, -31.70, 17.51);
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-474.993, 7.7, -4393.9443, -6.3);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (+vec4(-3.0, 15.34, -4.9, -6.2));
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = refract(vec4(-15.80, -600.048, -6.2, 134.862), vec4(68.79, -1.7, -5798.3243, 153.281), -796.166);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        {
                                                            ;
                                                        }
                                                        ivec4 _GLF_SWITCH_4_294v[68], _GLF_SWITCH_4_295v;
                                                        if (true) {
                                                            return;
                                                            continue;
                                                            vec3 _GLF_SWITCH_4_296v;
                                                            mix(vec4(-247.423, 3502.2902, -3306.4199, -5279.0407), _GLF_outVarBackup_GLF_color, 6.7);
                                                            mat2(-9.6, 10.63, 7.5, 49.78);
                                                            clamp(uvec2(17619u, 70673u), uvec2(75677u, _GLF_IDENTITY(2331u, ~(_GLF_IDENTITY(~(2331u), ~(~(~(2331u))))))), max(uvec2(59393u, 118670u), 33141u));
                                                            mat2x3(2796.2977, 860.694, 8.5, 5.3, 5.1, -267.929);
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = (mat2x4(-7274.5946, 18.19, 813.729, -320.562, -20.05, -910.935, 391.946, -7.0) * vec2(-6.6, 5.5));
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            mat2(-5749.6456, -0.9, 56.10, -59.18);
                                                        }
                                                        mat2x3(4296.5236, 511.557, -7.7, 2.1, 534.954, 3389.4354);
                                                    }
                                                    ivec4 _GLF_SWITCH_4_297v;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-324.898, 827.501, 781.371, -3853.3462);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat2(0.0, 0.0, 1.0, 0.0)))))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_color = vec4(-56.83, -7423.3947, -993.079, 443.054);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                            }
                                            vec3(-27.24, -96.57, 6.3);
                                            for ((mat3x2(-478.420, 307.705, -4.7, -9606.5821, -129.675, 54.50), (mat3(3.4, 4.7, 6.8, 43.61, -38.35, 359.807, 4.6, -606.811, -1.7) / mat3(_GLF_IDENTITY(-_GLF_IDENTITY(6.1, float(mat4(6.1, 0.0, 1.0, 0.0, 0.0, cos(0.0), 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0)), dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0)))))), (-_GLF_IDENTITY(6.1, float(mat4(6.1, 0.0, 1.0, 0.0, 0.0, cos(0.0), 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0)), dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0))))))) / 1.0), -6668.5793, _GLF_IDENTITY(-64.55, _GLF_IDENTITY(float(float(-64.55)), 0.0 + (float(float(-64.55))))), -_GLF_IDENTITY(2.2, (_GLF_IDENTITY(2.2, min(_GLF_IDENTITY(2.2, min(2.2, 2.2)), 2.2))) - tan(0.0)), 0.2, -35.09, -5.4, 56.86, 22.39))); true; ivec3(77916, -79259, -22408)) {
                                                for (bool _GLF_SWITCH_4_298v, _GLF_SWITCH_4_299v, _GLF_SWITCH_4_300v[63]; _GLF_SWITCH_4_299v; uvec4(196812u, 186495u, 192258u, 7228u)) {
                                                    mat4 _GLF_SWITCH_4_301v, _GLF_SWITCH_4_302v, _GLF_SWITCH_4_303v;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-33.02, -40.10, -59.64, 8.3);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    for (bvec2 _GLF_SWITCH_4_304v[5]; (i <= (uvec3(148676u, 198460u, 132227u), i)); uvec2(_GLF_IDENTITY(3683u, 0u | (_GLF_IDENTITY(3683u, max(_GLF_IDENTITY(3683u, (true ? 3683u : _GLF_FUZZED(56209u))), _GLF_IDENTITY(3683u, (3683u) - 0u))))), 20881u)) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = fma(vec4(-5.4, 579.402, -55.16, 7.1), vec4(0.8, -102.276, 5.0, -3.4), acosh(vec4(-88.41, 6.1, -28.60, -899.850)));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(_GLF_ZERO(0.0, injectionSwitch.x)))))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        bvec2 _GLF_SWITCH_4_305v, _GLF_SWITCH_4_306v, _GLF_SWITCH_4_307v;
                                                        discard;
                                                        mat2x4(3.2, 26.51, -4.7, -3655.2112, 8999.9351, _GLF_IDENTITY(-4461.7376, clamp(-4461.7376, -4461.7376, -4461.7376)), 2209.5088, 9.3);
                                                        mat3(-951.228, 80.46, 4718.6593, -166.755, 7705.0576, -4310.8098, -3.5, 9192.7997, 2175.8947);
                                                        mat3x2 _GLF_SWITCH_4_308v;
                                                    }
                                                    uvec3 _GLF_SWITCH_4_309v[22], _GLF_SWITCH_4_310v[45];
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-8.6, 664.552, 751.017, -505.543);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    mat3x4 _GLF_SWITCH_4_311v, _GLF_SWITCH_4_312v, _GLF_SWITCH_4_313v;
                                                    uvec4(79624u, 173441u, 6131u, 44302u);
                                                    while (_GLF_SWITCH_4_299v) {
                                                        _GLF_SWITCH_4_299v;
                                                        bvec2(true, true);
                                                        mat4x3(93.77, _GLF_IDENTITY(-7.7, float(mat4x2(-7.7, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0))), 1.5, _GLF_IDENTITY(-4903.1266, sqrt(0.0) + (-4903.1266)), 3530.9984, 863.561, 3.3, 2.1, -292.540, 2.4, -6868.4625, -595.509);
                                                        ivec4 _GLF_SWITCH_4_314v[37], _GLF_SWITCH_4_315v;
                                                        continue;
                                                        ivec3(20157, -71301, -82708);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(1.8, -373.188, -5.6, 7838.1140);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(0.0, float(mat2x3(0.0, 0.0, 1.0, 1.0, 0.0, 0.0))))))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        ivec4 _GLF_SWITCH_4_316v[8];
                                                        mat3 _GLF_SWITCH_4_317v, _GLF_SWITCH_4_318v, _GLF_SWITCH_4_319v;
                                                        vec2(8.7, 3.9);
                                                    }
                                                }
                                                vec4(1064.8576, 85.00, -138.942, -9.5);
                                                while (true) {
                                                    for (mat2 _GLF_SWITCH_4_320v[23], _GLF_SWITCH_4_321v, _GLF_SWITCH_4_322v; false; (mat3x4(5074.6405, 3361.9473, 5422.1458, 1.3, -0.7, -718.333, -6648.2504, 854.001, -0.7, -1.7, 910.746, -6109.6693) * mat4x3(-2.1, 190.451, -6.8, -2.7, -9.6, -4390.0742, 2.2, -8102.1093, 1.6, -1.9, 6786.7512, -2.1))) {
                                                        discard;
                                                        return;
                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        mat4((-mat4x3(8903.5517, _GLF_IDENTITY(-3.4, min(-3.4, -3.4)), 819.145, -320.875, 1.9, 6.2, 7.1, -959.739, 995.522, -3.9, -589.475, -65.54)));
                                                        vec4 _GLF_SWITCH_4_323v;
                                                    }
                                                    break;
                                                    if ((_GLF_IDENTITY(mat3x4(1.8, -2918.6589, -6.7, -37.73, 1.7, -9.7, 5.4, _GLF_IDENTITY(-7.6, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))) * (-7.6)), -86.67, -3672.3753, 483.084, -6.6) == ((-8.7) + mat3x4(-8480.6249, 945.315, 4.1, -3380.6245, -29.61, -4.1, -76.31, 5.5, 1925.3823, -0.4, 6.0, 5.1)), (_GLF_IDENTITY(mat3x4(1.8, -2918.6589, -6.7, -37.73, 1.7, -9.7, 5.4, _GLF_IDENTITY(-7.6, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))) * (-7.6)), -86.67, -3672.3753, 483.084, -6.6) == ((-8.7) + mat3x4(-8480.6249, 945.315, 4.1, -3380.6245, -29.61, -4.1, -76.31, 5.5, 1925.3823, -0.4, 6.0, 5.1)), (mat3x4(1.8, -2918.6589, -6.7, -37.73, 1.7, -9.7, 5.4, _GLF_IDENTITY(-7.6, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))) * (-7.6)), -86.67, -3672.3753, 483.084, -6.6) == ((-8.7) + mat3x4(-8480.6249, 945.315, 4.1, -3380.6245, -29.61, -4.1, -76.31, 5.5, 1925.3823, -0.4, 6.0, 5.1))) && true)) && true))) {
                                                        vec3 _GLF_SWITCH_4_324v, _GLF_SWITCH_4_325v;
                                                        bitfieldExtract(uvec2(172566u, 138080u), 1083, i);
                                                        mat3(456.788, -5073.9713, 5627.7400, -55.04, -3.5, 2.9, 873.359, 1505.5944, 804.996);
                                                        discard;
                                                        _GLF_color;
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (+pow(vec4(2000.2403, 2.3, 4.3, 9037.4344), vec4(-337.396, -4178.0829, -9.9, -1.6)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    for (ivec3 _GLF_SWITCH_4_326v; bool(1961.9246); greaterThan(ivec4(8923, -5163, 30900, 46702), ivec4(-42403, -9171, 87804, 64300))) {
                                                        discard;
                                                        uvec3 _GLF_SWITCH_4_327v[70], _GLF_SWITCH_4_328v;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (true ? vec4(-4.0, -403.685, 118.407, 6.3) : vec4(32.03, -962.896, -52.81, 2826.3862));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        continue;
                                                        (_GLF_IDENTITY(degrees(-0.9), (true ? degrees(-0.9) : _GLF_FUZZED(566.606))) / mat3(-4.3, 69.47, -39.00, _GLF_IDENTITY(8.6, (true ? _GLF_IDENTITY(8.6, 0.0 + (8.6)) : _GLF_FUZZED(distance(_GLF_outVarBackup_GLF_color, vec4(-794.163, 9574.1383, 7.8, -5.0))))), 3341.7218, -138.990, 4.5, 9.5, -2.3));
                                                        mat3x4 _GLF_SWITCH_4_329v[81], _GLF_SWITCH_4_330v, _GLF_SWITCH_4_331v[76];
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = mix(vec4(106.579, 9.1, -5719.6437, 855.715), vec4(-351.676, 1.6, 9931.3362, 4218.5049), 666.549);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                mat4x3 _GLF_SWITCH_4_332v, _GLF_SWITCH_4_333v;
                                                (-(-406.546));
                                                do {
                                                    mat2x4 _GLF_SWITCH_4_334v[34], _GLF_SWITCH_4_335v, _GLF_SWITCH_4_336v;
                                                } while (all(bvec2(false, false)));
                                                while (((ivec2(-87591, -51660) != _GLF_IDENTITY((_GLF_SWITCH_4_165v ^ i), (false ? _GLF_FUZZED((13777 % ivec2(-3616, 90960))) : (_GLF_SWITCH_4_165v ^ i)))) || true)) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = mat3x4(0.4, -698.502, 4451.9268, 56.24, 1.5, -213.425, 6.3, -1.3, 8.8, -1688.1970, 8830.6908, -5.9)[0];
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                mat2(-8.7, 1972.4501, -9.8, 412.833);
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = cos(vec4(8981.9864, -99.09, -5.6, -2892.9788));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                case 0:
                                case 85:
                                case 12:
                                    {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = clamp(reflect(vec4(1.5, 41.02, 8077.8327, 9.7), vec4(-929.749, 813.386, 9509.1903, -86.20)), length(4.6), 9.2);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = asinh(vec4(-6690.2032, 11.67, -20.55, -97.22));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                case 43:
                                case 88:
                                case 91:
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = (true ? vec4(3430.9029, -6001.4676, 3159.8404, 3674.0374) : _GLF_color);
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = fwidthFine(uintBitsToFloat(uvec4(135262u, 144426u, 166831u, 83132u)));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                case 7:
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(303.641, 8.9, 4003.1711, 56.11);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    break;
                                case 87:
                                    mat3 _GLF_SWITCH_4_337v, _GLF_SWITCH_4_338v, _GLF_SWITCH_4_339v;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = mix(vec4(-4689.5344, -41.29, -942.633, 26.35), vec4(4.2, 2.7, 1.7, 9.1), -64.42);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                case 72:
                                    bvec4(true, false, false, true);
                                default:
                                    1;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = unpackSnorm4x8(81864u);
                                    }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = dFdyCoarse(vec4(-6008.8643, 6.9, 124.967, 47.64));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                } else if (i == 7) {
                    obj.prime_numbers[i] = 19;
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = log2(_GLF_color);
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(78.89, -2.1, 4.1, 2877.8797);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(219.140, -886.608, 322.804, 5.2);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = exp(vec4(-44.99, _GLF_IDENTITY(3.0, max(_GLF_IDENTITY(3.0, 0.0 + (_GLF_IDENTITY(3.0, float(mat4x2(3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0))))), 3.0)), 36.07, -553.886));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = ((mat3x4(-4.6, -7019.6957, -24.12, -479.217, 92.36, -2.6, -2.2, 65.47, 2.3, 9.9, 684.273, -5535.9788) * mat3(-57.66, -74.27, 8953.7298, 4611.6918, -0.7, -6.0, -8496.3320, -5.8, -304.023)) * (vec3(-5258.6811, 8607.8848, 3580.7114) / vec3(-8.9, 10.69, 2.8)));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-340.774, 8.4, -3106.3318, -7.9);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-18.43, -805.953, -21.21, 8655.3582);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-3170.4958, -6.0, 6.5, 2.0);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = _GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(4686.3909, -89.32, 8.0, 1.1);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = cosh(((-924.831) * vec4(-463.502, -383.416, -2.4, 87.83)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    if (i == 8) {
                        if (_GLF_DEAD(false)) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(55.17, -4178.9839, 5.6, 3.4);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = floor(vec4(_GLF_IDENTITY(-1837.0903, (_GLF_IDENTITY(-1837.0903, 1.0 * (-1837.0903))) + _GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 1.0)), _GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 1.0)), (dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 1.0))) / 1.0))), -6.7, -5956.5021, -8.8));
                        }
                        _GLF_IDENTITY(obj.prime_numbers[i] = 23, (obj.prime_numbers[i] = 23) ^ 0);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(0.7, -1.9, -4367.8371, -6410.3213);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec2(-4.7, _GLF_IDENTITY(923.860, min(923.860, _GLF_IDENTITY(923.860, min(923.860, _GLF_IDENTITY(923.860, clamp(923.860, 923.860, 923.860))))))).sttt;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = max(vec4(3.0, -77.42, 6933.0954, -336.806), vec4(0.6, 2.5, -5.9, -59.36));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    } else {
                        if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, !(!(false)))), bool(bvec4(_GLF_DEAD(_GLF_IDENTITY(false, !(!(false)))), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), true, _GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.y, float(vec4(gl_FragCoord.y, _GLF_IDENTITY(dot(vec2(1.0, length(vec2(0.0, 0.0))), vec2(1.0, abs(0.0))), dot(vec2(1.0, length(vec2(0.0, 0.0))), vec2(1.0, abs(0.0)))), 1.0, 1.0))) >= 0.0)))))) {
                            switch (_GLF_SWITCH(0)) {
                                case 31:
                                    for (mat3x4(8.7, 6.5, 114.378, 22.78, -65.97, 649.520, -85.94, 9.4, -97.11, -5.1, 1.9, 308.892); false; mat2x3(mat2x4(6463.7243, -3.2, -6.4, -41.02, 44.60, -6.8, 7369.0079, -4091.7385))) {
                                    }
                                case 40:
                                    do {
                                        (mat2(-52.28, -9.5, 712.984, 9.2), -_GLF_IDENTITY(5636.4958, max(_GLF_IDENTITY(5636.4958, (5636.4958) + tan(0.0)), 5636.4958)));
                                        {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec2(545.837, -3.5).ggrg;
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-713.797, 7.3, 8.6, -764.759);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                case 0:
                                case 72:
                                case 64:
                                case 55:
                                case 25:
                                case 68:
                                case 70:
                                    _GLF_color = (_GLF_IDENTITY(sqrt((mat4x2(4.9, 969.050, 1.6, 746.620, -9.7, _GLF_IDENTITY(8.1, float(_GLF_IDENTITY(mat2x3(8.1, 1.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0), transpose(transpose(mat2x3(8.1, 1.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0)))))), 6.1, -4831.4089) * vec4(-2045.8337, 0.1, 0.0, -9.5))), clamp(sqrt((mat4x2(4.9, 969.050, 1.6, 746.620, -9.7, _GLF_IDENTITY(8.1, float(_GLF_IDENTITY(mat2x3(8.1, 1.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0), transpose(transpose(mat2x3(8.1, 1.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0)))))), 6.1, -4831.4089) * vec4(-2045.8337, 0.1, 0.0, -9.5))), sqrt((mat4x2(4.9, 969.050, 1.6, 746.620, -9.7, _GLF_IDENTITY(8.1, float(_GLF_IDENTITY(mat2x3(8.1, 1.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0), transpose(transpose(mat2x3(8.1, 1.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0)))))), 6.1, -4831.4089) * vec4(-2045.8337, 0.1, 0.0, -9.5))), sqrt((mat4x2(4.9, 969.050, 1.6, 746.620, -9.7, _GLF_IDENTITY(8.1, float(_GLF_IDENTITY(mat2x3(8.1, 1.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0), transpose(transpose(mat2x3(8.1, 1.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0)))))), 6.1, -4831.4089) * vec4(-2045.8337, 0.1, 0.0, -9.5))))) * matrixCompMult(mat4x2(795.195, 155.004, -4.7, 4558.0435, -_GLF_IDENTITY(539.113, min(539.113, 539.113)), -66.96, -9.7, 43.60), mat4x2(694.212, 77.81, 6.7, 3231.2049, -9847.6173, -8.2, -94.89, 0.4)));
                                    break;
                                case 67:
                                    bvec3 _GLF_SWITCH_5_0v[2], _GLF_SWITCH_5_1v, _GLF_SWITCH_5_2v;
                                default:
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(8671.5759, -275.786, 6.8, 4.7);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec4(true, false, true, true))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    1;
                            }
                        }
                        if (i == 9) {
                            _GLF_IDENTITY(obj.prime_numbers[i] = 29, ~_GLF_IDENTITY((_GLF_IDENTITY(~(obj.prime_numbers[i] = 29), (~(obj.prime_numbers[i] = 29)) >> 0)), 0 | ((_GLF_IDENTITY(~(obj.prime_numbers[i] = 29), (~(obj.prime_numbers[i] = 29)) >> 0)))));
                        }
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (findMSB(ivec4(79088, -39031, 40943, 62719)), vec4(6.4, -1.8, -6.2, -6735.2234));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = vec4(9510.3270, 3968.5306, 5.1, 6017.3956);
            }
        } else {
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (vec4(-361.317, -355.544, 32.81, 4.3) / 3140.4583);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = ((-6992.8944) / vec4(8.0, -250.879, -5721.5509, 9.5));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = step(dot(vec4(-2.6, 9.6, -313.445, -1.1), _GLF_outVarBackup_GLF_color), vec4(670.298, 1896.5769, 575.611, -0.9));
        }
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(993.230, 0.5, 6446.9441, -173.172);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(944.948, 10.92, -528.992, 739.599);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-511.637, -1.4, -32.02, -3.5);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = vec4(-93.61, -180.949, 2.3, 2526.7061);
    }
    vec2 uv = (gl_FragCoord.xy / resolution.x) * vec2(resolution.x / resolution.y, 1.0);
    vec2 b = brick(uv * 7.0);
    vec3 color = vec3(patternize(b));
    if (gl_FragCoord.y < resolution.y / 1.1) {
        if (_GLF_IDENTITY(binarySearch(obj, obj.prime_numbers[4]), (binarySearch(obj, obj.prime_numbers[4])) - 0) != -(int(resolution.y)) && binarySearch(obj, obj.prime_numbers[_GLF_IDENTITY(0, (0) | (0))]) >= -(int(resolution.x))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-8150.4290, -5.8, 1162.6676, 704.341);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            switch (_GLF_SWITCH((1 ^ 1))) {
                case 0:
                case 30:
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-180.385, -3.4, -587.233, 4832.6326);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                case 46:
                    if (_GLF_DEAD(false)) {
                        _GLF_color = fwidthFine(vec4(23.17, -73.59, -75.65, -141.187));
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = normalize(vec4(227.153, 7.4, -376.681, -910.452));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-0.7, -0.0, 7.7, -55.52);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-1.7, -647.088, -7088.3064, 2.4);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                case 81:
                case 59:
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(0.8, (vec3(51.44, 39.68, 4612.4576) * (-2077.1697)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(3104.0805, 8.3, 5609.7760, 3.9);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                case 9:
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = ldexp(mat3x4(95.11, -2997.9687, -1.1, -144.520, 49.15, -5502.5122, 2689.1235, -192.107, -5.3, -250.349, -8941.3734, -634.688)[2], ivec4(-62978, -30506, 32886, -72118));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    color.yz -= dot(float(binarySearch(obj, obj.prime_numbers[4])), float(binarySearch(obj, obj.prime_numbers[0])));
                    break;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = clamp(vec4(7.8, -9.5, 8.0, 6.9), vec4(-106.226, -2961.2163, 6.5, -5424.3163), (vec4(787.425, -72.53, 8.6, -16.03) / (-3966.5339)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = uintBitsToFloat(uvec4(30403u, 132188u, 133643u, 177120u));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-6.2, -7042.7163, -_GLF_IDENTITY(328.820, (true ? 328.820 : _GLF_FUZZED(6909.4538))), -7.9);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = dFdy(vec4(5133.1309, 392.178, 4.1, 4.2));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(sinh(vec2(3432.1116, 0.4)), 9.9, 734.552);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(0.0))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    _GLF_color = vec4(7.7, -3226.1051, 8796.7188, -777.701);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = trunc(vec4(6.8, 101.161, 1.4, -3.2));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                _GLF_color = vec4(-8.6, 17.17, 2040.5192, 4.9);
                            }
                            _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(_GLF_color) : _GLF_outVarBackup_GLF_color));
                        }
                    }
                case 87:
                    4959u;
                case 82:
                    ;
                default:
                    do {
                        1;
                    } while (_GLF_WRAPPED_LOOP(false));
            }
        } else {
            discard;
        }
    } else {
        if (binarySearch(obj, 1) == -1) {
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(6.3, -4.0, 0.5, 3.7);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-21.13, -0.5, -2.1, 1.5);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = fwidthCoarse(vec4(2.8, -12.03, -6.3, -23.88));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-88.37, -84.51, -4520.4582, -5.3);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-72.62, -825.881, -760.838, 963.362);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            discard;
        } else {
            color.yz += color.yz;
        }
    }
    _GLF_color = vec4(color, injectionSwitch.y);
}
