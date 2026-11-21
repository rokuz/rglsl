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
    int a = 4;
    for (int _injected_loop_counter = (((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), (int(2)) | 0))) | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 | 0)); _injected_loop_counter--) {
        do {
            uv.y -= step(_GLF_IDENTITY(injectionSwitch.y, (_GLF_IDENTITY(_GLF_IDENTITY(injectionSwitch.y, mix(float(_GLF_FUZZED((_GLF_IDENTITY(false ? 277.642 : 474.905, (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)) ? _GLF_FUZZED(-3056.4335) : _GLF_IDENTITY(false ? 277.642 : 474.905, (false ? 277.642 : 474.905) * 1.0)))))), float(injectionSwitch.y), bool(true))), (_GLF_IDENTITY(injectionSwitch.y, mix(float(_GLF_FUZZED((_GLF_IDENTITY(false ? 277.642 : 474.905, (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)) ? _GLF_FUZZED(-3056.4335) : _GLF_IDENTITY(false ? 277.642 : 474.905, (false ? 277.642 : 474.905) * 1.0)))))), float(injectionSwitch.y), bool(true)))) - 0.0)) / 1.0), uv.x);
            do {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    do {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_outVarBackup_GLF_color = _GLF_color) * vec4(1.0, 1.0, 1.0, 1.0));
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            _GLF_color = vec4(-538.276, vec2(-53.50, -59.71), 8.9);
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                } else {
                }
                _GLF_color = vec4(7.0, -5.8, -506.536, _GLF_IDENTITY(_GLF_IDENTITY(-2.8, min(_GLF_IDENTITY(-2.8, (false ? _GLF_FUZZED(-45.28) : (-2.8))), -2.8)), float(vec4(_GLF_IDENTITY(-2.8, min(_GLF_IDENTITY(-2.8, (_GLF_IDENTITY(false ? _GLF_FUZZED(-45.28) : (-2.8), (false ? _GLF_FUZZED(-45.28) : (-2.8)) / 1.0))), -2.8)), log(1.0), 1.0, 0.0))));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch, max(injectionSwitch, _GLF_IDENTITY(injectionSwitch, max(injectionSwitch, _GLF_IDENTITY(injectionSwitch, vec2(mat3(injectionSwitch, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))))))).x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            } while (_GLF_WRAPPED_LOOP(false));
            uv.x -= fract(tanh(uv.x)) / ldexp(_GLF_IDENTITY(injectionSwitch.y, max(injectionSwitch.y, injectionSwitch.y)), findMSB(a));
            _GLF_IDENTITY(a--, (true ? (a--) : _GLF_FUZZED((true ? a : a))));
        } while (a > int(injectionSwitch.x));
    }
    int b = 3;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = vec4(-542.548, 9.5, -5.6, 5057.2882);
        } else {
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), max(int(6), int(6)))))); _injected_loop_counter--) {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), min(int(0), int(0))))) >> _GLF_IDENTITY(int(0), int(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | 0)); _injected_loop_counter--) {
                    do {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    } while (_GLF_WRAPPED_LOOP(false));
                }
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-8.8, 13.71, -4014.6920, -6621.3448);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        } else {
        }
    }
    for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & 1)); _GLF_IDENTITY(_injected_loop_counter++, ~(~(_injected_loop_counter++)))) {
        do {
            uv.y -= step(_GLF_IDENTITY(injectionSwitch, min(injectionSwitch, _GLF_IDENTITY(injectionSwitch, _GLF_IDENTITY(vec2(mat4(_GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED(1.1), _GLF_IDENTITY((injectionSwitch)[1], max((injectionSwitch)[1], (injectionSwitch)[1]))), vec2((injectionSwitch)[0], _GLF_FUZZED(-5.9)), bvec2(true, false))), 1.0, 1.0, 0.0, _GLF_IDENTITY(0.0, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? 0.0 : _GLF_FUZZED(-4528.9010))), 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)), 0.0, 1.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 0.0), vec4(1.0, 0.0, 0.0, 1.0)), dot(vec4(0.0, 1.0, 1.0, _GLF_IDENTITY(0.0, max(_GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), _GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(-19.21)), bool(false)))))), vec4(1.0, 0.0, 0.0, 1.0))), _GLF_ONE(1.0, injectionSwitch.y), 0.0, 1.0, 0.0, 0.0)), mat2(1.0) * (vec2(mat4(_GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED(1.1), _GLF_IDENTITY((injectionSwitch)[1], max((injectionSwitch)[1], (injectionSwitch)[1]))), vec2((injectionSwitch)[0], _GLF_FUZZED(-5.9)), bvec2(true, false))), 1.0, 1.0, 0.0, _GLF_IDENTITY(0.0, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? 0.0 : _GLF_FUZZED(-4528.9010))), 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)), 0.0, 1.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 0.0), vec4(1.0, 0.0, 0.0, 1.0)), dot(vec4(0.0, 1.0, 1.0, _GLF_IDENTITY(0.0, max(_GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), _GLF_IDENTITY(_GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(-19.21)), bool(false))), (true ? _GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(-19.21)), bool(false))) : _GLF_FUZZED(69.85)))))), vec4(1.0, 0.0, 0.0, 1.0))), _GLF_ONE(1.0, injectionSwitch.y), 0.0, 1.0, 0.0, 0.0))))))).y, _GLF_IDENTITY(uv.x, (_GLF_IDENTITY(_GLF_IDENTITY(uv.x, mix(float(uv.x), float(_GLF_FUZZED(294.985)), bool(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))), mix(float(_GLF_FUZZED(-88.83)), float(_GLF_IDENTITY(uv.x, mix(float(uv.x), float(_GLF_FUZZED(294.985)), bool(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))), bool(true)))) * 1.0)) + float(a);
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(8), int(8)))); _GLF_IDENTITY(_injected_loop_counter--, _GLF_IDENTITY(0, min(0, 0)) ^ (_GLF_IDENTITY(_injected_loop_counter--, (_injected_loop_counter--) | 0)))) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    uv.x *= (_GLF_IDENTITY(isnan(uv.y) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x), (_GLF_IDENTITY(isnan(uv.y), false || (_GLF_IDENTITY(_GLF_IDENTITY(isnan(uv.y), (isnan(uv.y)) || false), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) && (_GLF_IDENTITY(isnan(uv.y), (isnan(uv.y)) || false))))) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x)) * cos(_GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(-1.5)), float(0.0), bool(true))))));
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = degrees(vec4(-6323.7807, 91.32, -551.655, -15.07));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-5012.3401, 596.689, 7.8, 1.1);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        for (int _injected_loop_counter = (0 ^ (0 >> _GLF_IDENTITY(int(7), int(7)))); _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(7.5, 2.0, 9.4, 32.63);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                } else {
                                    _GLF_color = vec4(-0.8, -4.7, -134.072, -9.5);
                                }
                                do {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = ((vec4(3781.2618, 11.80, -334.481, 6.8)) + vec4(-5.9, -6.9, -6.6, -854.533));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    } else {
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = _GLF_IDENTITY(vec4(90.60, 7308.5600, -4198.0434, -2.6), vec4(1.0, 1.0, 1.0, 1.0) * (vec4(90.60, 7308.5600, -4198.0434, -2.6)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = log2(dFdx(vec4(-1.6, 535.663, -200.108, 3764.1768)));
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
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = vec4(-8465.8122, 5600.9832, -129.186, 7.6);
                        } else {
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = fma(vec4(13.40, -8.4, -3.6, 6.6), vec4(-9.7, -320.294, 86.53, -0.8), vec4(-526.857, -3546.8023, 800.682, -83.03));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    do {
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            b--;
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = roundEven(sinh(vec4(-7.8, 6919.8142, -9.9, 104.377)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = vec4(-9601.7137, -2.1, -709.034, -633.156);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-17.59, -8.8, 9357.4819, 1.0);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            } else {
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        }
                        _GLF_color = vec4(5353.4388, 7.4, -2.6, 0.1);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            } else {
            }
        } while (b > int(injectionSwitch.x));
    }
    int c = 2;
    do {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (-mat3x4(483.775, 2.5, 36.95, -6.5, -561.571, -23.77, 8299.1284, -36.50, 385.384, -27.84, 6.2, 532.861))[1];
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter--) {
            do {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    do {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = inversesqrt(unpackUnorm4x8(89344u));
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_color = _GLF_outVarBackup_GLF_color) - vec4(0.0, 0.0, 0.0, 0.0));
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (dFdx(-1.8) * vec4(-255.660, 7.8, -5.5, 98.16));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch.y, (_GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, injectionSwitch.y, injectionSwitch.y))) + 0.0))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        } else {
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(22.52);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-52.92, 181.365, 49.89, 4090.9534).gagb;
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            do {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                _GLF_color = vec4(29.86, 7.0, 207.230, -46.75);
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = (mat2x4(-72.74, -4.3, -9973.8274, 9452.8571, -1291.5951, -9.0, -2.0, 4962.7206) * vec2(2.9, -6.4));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        do {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                        _GLF_color = _GLF_IDENTITY(tanh(vec4(3.7, -92.39, 1.7, -3559.0900)), max(tanh(vec4(3.7, -92.39, 1.7, -3559.0900)), tanh(vec4(3.7, -92.39, 1.7, -3559.0900))));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 1)); _injected_loop_counter++) {
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                            }
                                            _GLF_color = max(vec4(421.083, -4.4, -1504.6637, -476.837), fwidthCoarse(69.52));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-3667.2849, 5.1, 878.986, 5.7);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-58.61, -807.502, -64.81, 4.2);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        _GLF_color = vec4(_GLF_IDENTITY(1.4, float(mat2(_GLF_IDENTITY(1.4, max(1.4, _GLF_IDENTITY(1.4, clamp(1.4, 1.4, 1.4)))), 0.0, 0.0, 0.0))), 367.189, -6.0, -7466.9141);
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(0.3, -801.095, -889.568, -85.28);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(98.44, -97.47, 9.7, 1851.5558);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, false || (_GLF_IDENTITY(false, false || (false))))));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_outVarBackup_GLF_color = _GLF_color) * vec4(1.0, 1.0, 1.0, 1.0));
                                _GLF_IDENTITY(_GLF_color = asin(vec4(-7.8, -7.0, -1.6, -641.237)), (_GLF_IDENTITY(_GLF_color = asin(vec4(-7.8, -7.0, -1.6, -641.237)), vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_color = asin(vec4(-7.8, -7.0, -1.6, -641.237))))) - vec4(0.0, 0.0, 0.0, 0.0));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    } else {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
                uv.y -= step(injectionSwitch.y, _GLF_IDENTITY(uv, (_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), !(!(_GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), true && ((injectionSwitch.x > injectionSwitch.y))))))) ? _GLF_FUZZED(uv) : uv)).x) + float(a) + float(b);
                uv.x += ldexp(injectionSwitch.y, isinf(_GLF_IDENTITY(uv, _GLF_IDENTITY(vec2(uv[0], uv[1]), max(_GLF_IDENTITY(vec2(uv[0], uv[1]), max(vec2(uv[0], uv[1]), _GLF_IDENTITY(vec2(uv[0], uv[1]), (vec2(uv[0], uv[1])) - vec2(0.0, 0.0)))), vec2(uv[0], uv[1])))).y + uv.x) ? findMSB(b) : findMSB(a));
                c--;
            } while (c > int(injectionSwitch.x));
        }
    } while (_GLF_WRAPPED_LOOP(false));
    int d = 1;
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY(1, int(ivec4(1, 1, _GLF_IDENTITY(0, clamp(0, _GLF_IDENTITY(0, (0) >> 0), 0)), 0)))); _injected_loop_counter++) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            do {
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    uv.y -= step(injectionSwitch.y, uv.x) + float(a) + _GLF_IDENTITY(float(b), _GLF_IDENTITY(float(mat2(float(b), round(length(normalize(vec3(1.0, _GLF_IDENTITY(1.0, float(_GLF_IDENTITY(mat3(_GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0)), 1.0, 1.0)), 0.0, 1.0, cos(0.0), 1.0, 0.0, 0.0, 1.0, 1.0), (mat3(_GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0)), 1.0, 1.0)), 0.0, 1.0, cos(0.0), 1.0, 0.0, 0.0, 1.0, 1.0)) - mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))), 1.0)))), 0.0, 1.0)), float(_GLF_IDENTITY(vec4(float(mat2(float(b), round(length(normalize(vec3(1.0, _GLF_IDENTITY(1.0, float(_GLF_IDENTITY(mat3(_GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0)), 1.0, 1.0)), 0.0, 1.0, cos(0.0), 1.0, 0.0, 0.0, 1.0, 1.0), (mat3(_GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0)), 1.0, 1.0)), 0.0, 1.0, cos(0.0), 1.0, 0.0, 0.0, 1.0, 1.0)) - mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))), 1.0)))), 0.0, 1.0)), 0.0, 0.0, abs(1.0)), (false ? _GLF_FUZZED(vec4(-0.2, -0.8, -855.071, -5.3)) : vec4(float(mat2(float(b), round(length(normalize(vec3(1.0, _GLF_IDENTITY(1.0, float(_GLF_IDENTITY(mat3(_GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0)), 1.0, 1.0)), 0.0, 1.0, cos(0.0), 1.0, 0.0, 0.0, 1.0, 1.0), (_GLF_IDENTITY(mat3(_GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, (true ? _GLF_IDENTITY(1.0, float(mat3(1.0, 0.0, 1.0, 1.0, _GLF_ONE(1.0, injectionSwitch.y), 1.0, determinant(mat3(1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0)), 1.0, 0.0))) : _GLF_FUZZED(983.168))), 1.0, 1.0)), 1.0, 1.0)), 0.0, 1.0, cos(0.0), 1.0, 0.0, _GLF_IDENTITY(0.0, (_GLF_IDENTITY(0.0, (0.0) + 0.0)) + 0.0), 1.0, 1.0), (true ? mat3(_GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, (true ? _GLF_IDENTITY(1.0, float(mat3(1.0, 0.0, 1.0, 1.0, _GLF_ONE(1.0, injectionSwitch.y), 1.0, determinant(mat3(1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0)), 1.0, 0.0))) : _GLF_FUZZED(983.168))), 1.0, 1.0)), 1.0, 1.0)), 0.0, 1.0, cos(0.0), 1.0, 0.0, _GLF_IDENTITY(0.0, (_GLF_IDENTITY(0.0, (0.0) + 0.0)) + 0.0), 1.0, 1.0) : _GLF_FUZZED(mat3(-6.9, -0.4, 2.0, -731.810, 3.8, 8.6, 62.62, 4052.6981, -6.4))))) - mat3(0.0, 0.0, _GLF_IDENTITY(0.0, min(0.0, 0.0)), 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, max(_GLF_IDENTITY(0.0, float(mat4x2(0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0))), 0.0)), 0.0)))), 1.0)))), 0.0, _GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(58.43) : 1.0)))), _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED((-9410.7640))), float(0.0), bool(true))), 0.0, abs(1.0))))))) + _GLF_IDENTITY(_GLF_IDENTITY(float(c), _GLF_IDENTITY((float(c)), ((float(c))) / 1.0) / 1.0), max(_GLF_IDENTITY(float(c), _GLF_IDENTITY((float(c)), ((float(c))) / 1.0) / 1.0), _GLF_IDENTITY(float(c), _GLF_IDENTITY((float(c)), _GLF_IDENTITY(((_GLF_IDENTITY(float(c), mix(float(_GLF_FUZZED((7514.7013))), float(_GLF_IDENTITY(float(c), (_GLF_IDENTITY(float(c), (false ? _GLF_FUZZED(787.917) : float(c)))) - 0.0)), bool(true))))), min(((_GLF_IDENTITY(float(c), mix(float(_GLF_FUZZED((7514.7013))), float(_GLF_IDENTITY(float(c), (_GLF_IDENTITY(float(c), (false ? _GLF_FUZZED(787.917) : float(c)))) - 0.0)), bool(true))))), ((_GLF_IDENTITY(float(c), mix(float(_GLF_FUZZED((7514.7013))), float(_GLF_IDENTITY(float(c), (_GLF_IDENTITY(float(c), (false ? _GLF_FUZZED(787.917) : float(c)))) - 0.0)), bool(true))))))) / _GLF_IDENTITY(1.0, (1.0) * 1.0)) / 1.0)));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, (_GLF_color) - vec4(0.0, 0.0, 0.0, 0.0));
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            _GLF_color = mat2x4(-780.875, -0.5, -5.8, -0.2, 49.80, -1520.9018, -109.007, 80.20)[0];
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, _GLF_IDENTITY((true) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), _GLF_IDENTITY(bool(bvec4(_GLF_IDENTITY((true) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true && ((true) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))), true, true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)))), !(!(bool(bvec4(_GLF_IDENTITY((true) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true && ((true) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))), true, true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))))))) {
                            do {
                                _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (true ? (_GLF_color = _GLF_outVarBackup_GLF_color) : _GLF_FUZZED(_GLF_IDENTITY(_GLF_color, (_GLF_color) / vec4(1.0, 1.0, 1.0, 1.0)))));
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                    }
                }
                do {
                    d--;
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-6.3, 67.27, 5.9, -64.87);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        do {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
            } while (d > int(injectionSwitch.x));
        }
    }
    return _GLF_IDENTITY(fract(uv), (fract(uv)) * mat2(1.0));
}

float patternize(vec2 uv) {
    vec2 size = vec2(0.45);
    vec2 st = smoothstep(size, size, uv);
    for (int _injected_loop_counter = _GLF_IDENTITY(0, (0) / 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 1)); _injected_loop_counter++) {
        switch (int(mod(gl_FragCoord.y, _GLF_IDENTITY(5.0, (false ? _GLF_FUZZED(fract(-41.26)) : 5.0))))) {
            case 0:
                return mix(pow(_GLF_IDENTITY(st, (st) - vec2(0.0, 0.0)).x, _GLF_IDENTITY(injectionSwitch, vec2(injectionSwitch[0], _GLF_IDENTITY(injectionSwitch[1], clamp(injectionSwitch[1], injectionSwitch[1], _GLF_IDENTITY(injectionSwitch[1], mix(float(_GLF_FUZZED(7.4)), float(injectionSwitch[1]), bool(true))))))).y), _GLF_IDENTITY(st, min(st, st)).x, size.y);
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-74.01, -72.11, vec2(8035.0821, -108.324));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mod(vec4(-847.630, 2272.7588, 41.26, 4409.4438), float(true));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(0.0, max(0.0, _GLF_IDENTITY(0.0, 0.0 + (0.0)))))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        } else {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = clamp(vec4(6.1, -83.12, -4.8, 797.190), vec4(-13.78, -1.3, 9.7, 280.182), vec4(-50.17, -9.0, -9378.4737, 1.2));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(5020.6844, 29.14, 7517.5361, -496.046);
                        do {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                do {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-3319.9189, -598.595, -8976.7220, 134.904);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec4(-6.0, -47.69, 699.159, -4052.6753) - vec4(5519.6170, 415.234, 245.263, -9309.5085));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    } else {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        } else {
                            _GLF_color = (vec4(7.2, 7486.5199, -2.0, 305.570) + vec4(5325.1947, 2.1, 351.573, 9206.4067));
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                break;
            case 1:
                return mix(pow(uv.y, injectionSwitch.y), st.y, size.x);
                break;
            case 2:
                for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 << _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter--) {
                    discard;
                }
                break;
            case 3:
                return mix(_GLF_IDENTITY(pow(uv.y, injectionSwitch.y), _GLF_IDENTITY(_GLF_IDENTITY((pow(uv.y, injectionSwitch.y)) - 0.0, (_GLF_IDENTITY((pow(uv.y, injectionSwitch.y)) - 0.0, clamp((pow(uv.y, injectionSwitch.y)) - 0.0, (pow(uv.y, _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, injectionSwitch.y, injectionSwitch.y)), injectionSwitch.y)))) - 0.0, (pow(uv.y, _GLF_IDENTITY(injectionSwitch, (injectionSwitch) + vec2(0.0, 0.0)).y)) - 0.0))) / 1.0), clamp(_GLF_IDENTITY((pow(uv.y, injectionSwitch.y)) - 0.0, (_GLF_IDENTITY((pow(uv.y, injectionSwitch.y)) - 0.0, clamp((pow(uv.y, injectionSwitch.y)) - 0.0, (pow(uv.y, _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, injectionSwitch.y, injectionSwitch.y)), injectionSwitch.y)))) - 0.0, (pow(uv.y, _GLF_IDENTITY(injectionSwitch, (injectionSwitch) + vec2(0.0, 0.0)).y)) - 0.0))) / 1.0), _GLF_IDENTITY(_GLF_IDENTITY((pow(uv.y, injectionSwitch.y)) - 0.0, (_GLF_IDENTITY((pow(uv.y, injectionSwitch.y)) - 0.0, clamp((pow(uv.y, injectionSwitch.y)) - 0.0, (pow(uv.y, _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, injectionSwitch.y, injectionSwitch.y)), injectionSwitch.y)))) - 0.0, (pow(uv.y, _GLF_IDENTITY(injectionSwitch, (injectionSwitch) + vec2(0.0, 0.0)).y)) - 0.0))) / 1.0), max(_GLF_IDENTITY((pow(uv.y, injectionSwitch.y)) - 0.0, (_GLF_IDENTITY((pow(uv.y, injectionSwitch.y)) - 0.0, clamp((pow(uv.y, injectionSwitch.y)) - 0.0, (pow(uv.y, _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, injectionSwitch.y, injectionSwitch.y)), injectionSwitch.y)))) - 0.0, (pow(uv.y, _GLF_IDENTITY(injectionSwitch, (injectionSwitch) + vec2(0.0, 0.0)).y)) - 0.0))) / 1.0), _GLF_IDENTITY((pow(uv.y, injectionSwitch.y)) - 0.0, (_GLF_IDENTITY((pow(uv.y, injectionSwitch.y)) - 0.0, clamp((pow(uv.y, injectionSwitch.y)) - 0.0, (pow(uv.y, _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, injectionSwitch.y, injectionSwitch.y)), injectionSwitch.y)))) - 0.0, (pow(uv.y, _GLF_IDENTITY(injectionSwitch, (injectionSwitch) + vec2(0.0, 0.0)).y)) - 0.0))) / 1.0))), _GLF_IDENTITY((pow(uv.y, injectionSwitch.y)) - 0.0, (_GLF_IDENTITY((pow(uv.y, injectionSwitch.y)) - 0.0, clamp((pow(uv.y, injectionSwitch.y)) - 0.0, (pow(uv.y, _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, injectionSwitch.y, injectionSwitch.y)), injectionSwitch.y)))) - 0.0, (pow(uv.y, _GLF_IDENTITY(injectionSwitch, (injectionSwitch) + vec2(0.0, 0.0)).y)) - 0.0))) / 1.0)))), _GLF_IDENTITY(uv, min(uv, uv)).y, _GLF_IDENTITY(size.y, mix(float(_GLF_FUZZED(-9.3)), float(_GLF_IDENTITY(size.y, (true ? size.y : _GLF_FUZZED(28.59)))), bool(true))));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(825.038, 230.679, 60.06, -_GLF_IDENTITY(7.1, (false ? _GLF_FUZZED(-1265.3102) : 7.1)));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                break;
            case 4:
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    return mix(pow(_GLF_IDENTITY(st.y, clamp(st.y, _GLF_IDENTITY(st.y, min(st.y, st.y)), st.y)), injectionSwitch.y), st.x, _GLF_IDENTITY(size, max(size, size)).x);
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0)))); _injected_loop_counter++) {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (asin(984.567) / vec4(5.3, 812.516, 5124.7863, -5.2));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    _GLF_color = vec4(_GLF_IDENTITY(226.497, min(226.497, 226.497)), 6.8, 64.30, -592.729);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        do {
                            _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, mix(vec4(_GLF_FUZZED(7463.8509), (_GLF_outVarBackup_GLF_color)[1], _GLF_FUZZED(3.5), _GLF_FUZZED(-3.1)), vec4((_GLF_outVarBackup_GLF_color)[0], _GLF_FUZZED(-7942.7661), (_GLF_outVarBackup_GLF_color)[2], (_GLF_outVarBackup_GLF_color)[3]), bvec4(true, false, true, true)));
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                    }
                }
                break;
        }
    }
}

int binarySearch(BinarySearchObject obj, int x) {
    int l = 0, r = 9;
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
        while (l <= r) {
            int m = _GLF_IDENTITY((l + r), ((l + r)) - 0) / 2;
            if (obj.prime_numbers[m] == x) {
                return m;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                        _GLF_color = vec4(-6.9, -47.46, -4.2, 4.9);
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            if (obj.prime_numbers[m] < x) {
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                    l = _GLF_IDENTITY(m + 1, (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)) ? _GLF_FUZZED(mix(l, l, false)) : (m + 1)));
                }
            } else {
                r = m - 1;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-1885.2927, 2.7, -3.8, -8532.8402);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = mat3x4(4.1, 1272.0110, 629.167, _GLF_IDENTITY(-693.565, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(min(6704.5757, 875.258)) : (-693.565))), 57.73, 9.2, 768.125, 881.408, 963.835, -444.225, 5.8, 5.3)[2];
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-89.62, 6.4, -223.181, -3.5);
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                do {
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, true && (false)))))));
                _GLF_color = vec4(_GLF_IDENTITY(5959.6473, clamp(5959.6473, 5959.6473, 5959.6473)), -4082.5297, 6.9, 245.682);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    } else {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            } else {
                _GLF_color = mix(vec4(97.62, -3.5, -20.27, _GLF_IDENTITY(9.0, clamp(_GLF_IDENTITY(9.0, min(9.0, 9.0)), 9.0, 9.0))), clamp(vec4(6.9, -494.247, 546.078, -121.534), vec4(5019.6872, -8713.6096, -4.4, 6.0), fwidth(vec4(-_GLF_IDENTITY(392.558, clamp(_GLF_IDENTITY(392.558, float(mat3x4(392.558, 1.0, abs(0.0), exp(0.0), 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0))), 392.558, 392.558)), -7.6, 228.521, -4407.1137))), trunc(vec4(4.9, -2212.6643, 7.3, 7.1)));
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (ivec4(-58382, -35691, 59077, 82752), vec4(-2832.6950, -6640.4327, -3.4, -5882.2723));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (true)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
        return -1;
    } else {
    }
}

void main() {
    BinarySearchObject obj;
    for (int i = 0; i < 10; _GLF_IDENTITY(i++, 1 * (i++))) {
        do {
            if (i == 0) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter > 0, _GLF_IDENTITY(bool(bvec4(_injected_loop_counter > 0, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))), true && (_GLF_IDENTITY(bool(bvec4(_injected_loop_counter > 0, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))), bool(bool(bool(bvec4(_injected_loop_counter > 0, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))))))); _injected_loop_counter--) {
                        obj.prime_numbers[i] = 2;
                    }
                } else {
                }
            } else if (_GLF_IDENTITY(i == 1, _GLF_IDENTITY(bool(bool(i == 1)), bool(bvec2(_GLF_IDENTITY(bool(bool(i == 1)), !(!(bool(bool(i == 1))))), true))))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-7.8, 5.5, 3.1, -838.274);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                do {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = floor(vec4(9.2, -971.695, 0.1, 5681.7541));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                do {
                    obj.prime_numbers[i] = 3;
                } while (_GLF_WRAPPED_LOOP(false));
            } else {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | 0)); _injected_loop_counter--) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (i == 2) {
                            obj.prime_numbers[i] = 5;
                        } else {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) && true))) {
                            } else {
                                if (i == 3) {
                                    obj.prime_numbers[i] = 7;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = step(vec2(-3.1, -3.3).g, vec4(-16.21, -_GLF_IDENTITY(413.459, min(413.459, 413.459)), 67.10, 3321.6975));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                } else {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-7.7, -3.4, -356.850, 3.0);
                                            do {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                        }
                                    } else {
                                        do {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                if (i == 4) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = ldexp(vec4(1.9, -6250.5135, 99.89, 4.3), ivec4(46325, 92621, -74824, -40792));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.y >= 0.0, true && (gl_FragCoord.y >= 0.0)))))) {
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                obj.prime_numbers[i] = 11;
                                                            } else {
                                                            }
                                                        }
                                                    } else {
                                                    }
                                                } else {
                                                    {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            } else {
                                                                _GLF_color = fract(vec4(38.03, 459.223, 3993.8533, -8083.5773));
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 & ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1))))); _injected_loop_counter++) {
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        }
                                                        _GLF_color = fwidthFine(vec4(325.177, 3.3, 146.830, -72.96));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(!(false))))) {
                                                    } else {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = smoothstep(vec4(-8703.1166, 5.5, 9.8, 5922.3504), (vec4(7.4, -94.47, 7.0, -5.3) - vec4(-2.7, 4.5, -4.2, 8775.4224)), vec4(-0.5, 305.707, -7.3, 30.73));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 0.0, 0.0, 0.0)), dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 0.0, 0.0, 0.0))))))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        if (i == 5) {
                                                            _GLF_IDENTITY(obj.prime_numbers[i] = 13, _GLF_IDENTITY((obj.prime_numbers[i] = 13) / 1, (_GLF_IDENTITY((obj.prime_numbers[i] = 13) / 1, _GLF_IDENTITY(((obj.prime_numbers[i] = 13) / 1), (false ? _GLF_FUZZED(-66474) : _GLF_IDENTITY(((obj.prime_numbers[i] = 13) / 1), ~(~(((obj.prime_numbers[i] = 13) / 1)))))) ^ 0)) / 1));
                                                        } else {
                                                            for (int _injected_loop_counter = _GLF_IDENTITY(((1 << _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), 0 + (_GLF_IDENTITY(_GLF_IDENTITY(int(6), max(int(6), int(6))), ~(_GLF_IDENTITY(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), int(_GLF_IDENTITY(ivec4(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), 0, 1, 0), (ivec4(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), 0, 1, 0)) << ivec4(0, 0, 0, 0)))))))))) >> _GLF_IDENTITY(int(6), int(6))), max(((1 << _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), 0 + (_GLF_IDENTITY(_GLF_IDENTITY(int(6), max(int(6), int(6))), ~(_GLF_IDENTITY(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), int(_GLF_IDENTITY(ivec4(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), 0, 1, 0), (ivec4(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), 0, 1, 0)) << ivec4(0, 0, 0, 0)))))))))) >> _GLF_IDENTITY(int(6), int(6))), _GLF_IDENTITY(((1 << _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), 0 + (_GLF_IDENTITY(_GLF_IDENTITY(int(6), max(int(6), int(6))), ~(_GLF_IDENTITY(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), int(_GLF_IDENTITY(ivec4(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), 0, 1, 0), (ivec4(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), 0, 1, 0)) << ivec4(0, 0, 0, 0)))))))))) >> _GLF_IDENTITY(int(6), int(6))), clamp(((1 << _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), 0 + (_GLF_IDENTITY(_GLF_IDENTITY(int(6), max(int(6), int(6))), ~(_GLF_IDENTITY(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), int(_GLF_IDENTITY(ivec4(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), 0, 1, 0), (ivec4(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), 0, 1, 0)) << ivec4(0, 0, 0, 0)))))))))) >> _GLF_IDENTITY(int(6), int(6))), ((1 << _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), 0 + (_GLF_IDENTITY(_GLF_IDENTITY(int(6), max(int(6), int(6))), ~(_GLF_IDENTITY(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), int(_GLF_IDENTITY(ivec4(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), 0, 1, 0), (ivec4(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), 0, 1, 0)) << ivec4(0, 0, 0, 0)))))))))) >> _GLF_IDENTITY(int(6), int(6))), ((1 << _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), 0 + (_GLF_IDENTITY(_GLF_IDENTITY(int(6), max(int(6), int(6))), ~(_GLF_IDENTITY(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), int(_GLF_IDENTITY(ivec4(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), 0, 1, 0), (ivec4(~(_GLF_IDENTITY(int(6), max(int(6), int(6)))), 0, 1, 0)) << ivec4(0, 0, 0, 0)))))))))) >> _GLF_IDENTITY(int(6), int(6))))))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.y >= 0.0, bool(bvec4(gl_FragCoord.y >= 0.0, false, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), true))))))) {
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                        } else {
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        }
                                                                        _GLF_color = vec4(-8.6, 781.072, -8.2, -98.04);
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                        if (i == 6) {
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter, ~(~(_GLF_IDENTITY(_injected_loop_counter, (_injected_loop_counter) | (_injected_loop_counter))))) != 1); _injected_loop_counter++) {
                                                                                    obj.prime_numbers[i] = 17;
                                                                                    {
                                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                            _GLF_color = vec4(819.026, 779.874, 2.5, -6.4);
                                                                                        } else {
                                                                                        }
                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                        }
                                                                                    }
                                                                                }
                                                                            } else {
                                                                            }
                                                                        } else {
                                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            } else {
                                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                } else {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = vec4(-82.68, -0.3, -0.5, -3797.2412);
                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                            }
                                                                            if (i == 7) {
                                                                                _GLF_IDENTITY(obj.prime_numbers[i] = 19, (_GLF_IDENTITY(obj.prime_numbers[i] = 19, (false ? _GLF_FUZZED(-80275) : (obj.prime_numbers[i] = 19)))) ^ (_GLF_IDENTITY(((-29790) & 0), (_GLF_IDENTITY(((-29790) & 0), 1 * (((-29790) & 0)))) * 1) | 0));
                                                                            } else {
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = vec4(-43.69, 2.8, 7.5, -4833.6901);
                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                        }
                                                                                    }
                                                                                }
                                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                    for (int _injected_loop_counter = _GLF_IDENTITY(0, 1 * (0)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                                        if (i == 8) {
                                                                                            {
                                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                                {
                                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                    _GLF_color = (intBitsToFloat(ivec2(-32292, 78430)) * (+mat4x2(-5.1, 9.6, 27.91, 90.70, -7.0, 8.5, -8726.0570, -676.998)));
                                                                                                    do {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                                        }
                                                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                                                }
                                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                _GLF_color = sinh((vec4(0.2, -569.379, 196.039, 5.4) * mat4(3062.8394, -76.63, 7.6, 760.258, -7.0, 28.33, -0.6, -652.467, -6.5, 74.01, -161.887, -1.5, -1768.7436, 9011.1149, -4.7, -4358.2034)));
                                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                                }
                                                                                            }
                                                                                            obj.prime_numbers[i] = 23;
                                                                                            {
                                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                                {
                                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                    _GLF_color = fwidth(exp2(vec4(-7.7, -7726.8317, 933.776, -156.558)));
                                                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                                    } else {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                _GLF_color = unpackSnorm4x8(50061u);
                                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                                                                                        _GLF_color = ((mat2x4(-2.1, -4.8, 6.8, -5.9, 4.1, -0.8, -963.832, _GLF_IDENTITY(563.888, (false ? _GLF_FUZZED(6061.3665) : 563.888))) != mat2x4(-54.01, -2.6, -0.3, -0.0, 7.8, -9.9, -7361.1735, -2.8)) ? vec4(6.6, -3600.8193, 6.8, 3.1) : vec4(0.1, -302.835, 125.515, 30.18));
                                                                                                    } else {
                                                                                                    }
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord, (_GLF_IDENTITY(false, true && (false)) ? _GLF_FUZZED(vec4(-8.0, 10.75, 5.0, 5004.9837)) : gl_FragCoord)).x >= 0.0)))) {
                                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                                    }
                                                                                                } else {
                                                                                                }
                                                                                                do {
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                                    }
                                                                                                    {
                                                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                                        } else {
                                                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                        }
                                                                                                        _GLF_color = vec4(-13.84, 276.969, -168.181, 7.7);
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                                            do {
                                                                                                                _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, _GLF_IDENTITY(mat4(1.0) * (_GLF_outVarBackup_GLF_color), vec4(vec4(mat4(1.0) * (_GLF_outVarBackup_GLF_color)))));
                                                                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                                                                        }
                                                                                                    }
                                                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                                            }
                                                                                        } else {
                                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), _GLF_IDENTITY(bool(bvec3(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true, false)), bool(bvec4(bool(bvec3(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true, false)), true, false, true)))))) {
                                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                                {
                                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                    _GLF_color = vec4(_GLF_IDENTITY(-408.136, determinant(mat2(0.0, 0.0, 1.0, 0.0)) + (-408.136)), 2.1, 2.2, -_GLF_IDENTITY(57.51, mix(float(_GLF_FUZZED(vec2(46.53, -852.925).x)), float(_GLF_IDENTITY(57.51, min(57.51, _GLF_IDENTITY(57.51, (false ? _GLF_FUZZED(44.87) : 57.51))))), bool(true))));
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                                                                                                        _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, min(_GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color));
                                                                                                    }
                                                                                                }
                                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                                } else {
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord, mix(vec4(_GLF_IDENTITY(_GLF_FUZZED(71.15), float(mat3x2(_GLF_FUZZED(71.15), exp(0.0), 0.0, 0.0, 0.0, 1.0))), _GLF_FUZZED(5742.3192), (gl_FragCoord)[2], _GLF_FUZZED(89.02)), vec4((gl_FragCoord)[0], _GLF_IDENTITY(_GLF_IDENTITY((gl_FragCoord)[1], ((gl_FragCoord)[1]) - determinant(mat3(0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, min(0.0, 0.0)), 0.0, 0.0, 0.0, 0.0))), (_GLF_IDENTITY(_GLF_IDENTITY((gl_FragCoord)[1], ((gl_FragCoord)[1]) - determinant(mat3(0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, min(0.0, 0.0)), 0.0, 0.0, 0.0, 0.0))), float(float(_GLF_IDENTITY((gl_FragCoord)[1], ((gl_FragCoord)[1]) - determinant(mat3(0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, min(0.0, 0.0)), 0.0, 0.0, 0.0, 0.0))))))) / 1.0), _GLF_FUZZED(7.4), (gl_FragCoord)[3]), bvec4(true, true, _GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < _GLF_IDENTITY(0.0, float(vec3(0.0, log(1.0), 1.0)))), !(!(_GLF_IDENTITY((gl_FragCoord.y < _GLF_IDENTITY(0.0, float(vec3(0.0, log(1.0), 1.0)))), ((gl_FragCoord.y < _GLF_IDENTITY(0.0, float(vec3(0.0, log(1.0), 1.0))))) || false))))), true))).x >= _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)))))) {
                                                                                                        {
                                                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                                _GLF_color = _GLF_IDENTITY(vec4(35.16, -89.20, 8.8, -5.9), (vec4(35.16, -89.20, 8.8, -5.9)) - vec4(0.0, _GLF_IDENTITY(0.0, (true ? _GLF_IDENTITY(0.0, 1.0 * (0.0)) : _GLF_FUZZED(2100.4514))), 0.0, 0.0));
                                                                                                            } else {
                                                                                                            }
                                                                                                            {
                                                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                } else {
                                                                                                                    _GLF_IDENTITY(_GLF_color = vec4(3315.3754, -9423.6340, -99.00, 4231.6764), (_GLF_color = vec4(3315.3754, -9423.6340, -99.00, 4231.6764)) / abs(vec4(1.0, 1.0, 1.0, 1.0)));
                                                                                                                }
                                                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                                _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, _GLF_IDENTITY(mat4(1.0) * (_GLF_outVarBackup_GLF_color), max(mat4(1.0) * (_GLF_outVarBackup_GLF_color), mat4(1.0) * (_GLF_outVarBackup_GLF_color))));
                                                                                                            }
                                                                                                        }
                                                                                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                            } else {
                                                                                                                _GLF_color = vec4(8518.5650, _GLF_IDENTITY(3.4, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? 3.4 : _GLF_FUZZED(-71.72))), 4467.7841, 185.463);
                                                                                                            }
                                                                                                        }
                                                                                                    } else {
                                                                                                    }
                                                                                                }
                                                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                                } else {
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, _GLF_IDENTITY(bool(bvec3(_GLF_IDENTITY(true, (true) && true), false, false)), bool(bool(bool(bvec3(_GLF_IDENTITY(true, (true) && true), false, false)))))))) {
                                                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                                        } else {
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            } else {
                                                                                            }
                                                                                            if (i == 9) {
                                                                                                {
                                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                                                                                            do {
                                                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                                                        } else {
                                                                                                        }
                                                                                                    } else {
                                                                                                    }
                                                                                                    {
                                                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                        _GLF_color = vec4(vec2(0.3, 916.738), sinh(vec2(-393.534, -7.3)));
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                                        }
                                                                                                    }
                                                                                                    _GLF_color = (mat3x4(_GLF_IDENTITY(-3.5, float(mat3x4(-3.5, _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)), _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)), mix(float(_GLF_FUZZED(-685.105)), float(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0))), bool(true)))), 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, _GLF_IDENTITY(sqrt(1.0), clamp(sqrt(1.0), sqrt(1.0), sqrt(_GLF_IDENTITY(1.0, _GLF_IDENTITY(float(float(_GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(5.5) : 1.0)))), (false ? _GLF_FUZZED(5191.3060) : float(float(_GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(5.5) : _GLF_IDENTITY(1.0, clamp(1.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)), _GLF_IDENTITY(1.0, min(_GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(-6.4) : 1.0)), 1.0)))))))))))))), 0.0, 1.0))), 7050.7107, -8090.1555, -_GLF_IDENTITY(858.770, (858.770) * 1.0), 4978.5507, -350.195, 916.953, _GLF_IDENTITY(-247.826, min(_GLF_IDENTITY(-247.826, 1.0 * (-247.826)), -247.826)), -31.42, -62.73, _GLF_IDENTITY(6492.3706, (6492.3706) / 1.0), -6.9) * vec3(_GLF_IDENTITY(-5.3, min(-5.3, _GLF_IDENTITY(-5.3, clamp(-5.3, -5.3, -5.3)))), 815.411, -_GLF_IDENTITY(137.302, (true ? 137.302 : _GLF_FUZZED(-7.9)))));
                                                                                                    do {
                                                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) && (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) {
                                                                                                        } else {
                                                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((gl_FragCoord.x >= 0.0), !(!((gl_FragCoord.x >= 0.0))))))) {
                                                                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                                                    } else {
                                                                                                                        for (int _injected_loop_counter = (1 & ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6)))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                                                            _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_color = _GLF_outVarBackup_GLF_color) + vec4(0.0, 0.0, 0.0, 0.0));
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            } else {
                                                                                                            }
                                                                                                        }
                                                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                                                    {
                                                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                        _GLF_color = mod(vec4(586.238, 11.06, 4094.4583, -9.1), -6.3);
                                                                                                        do {
                                                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                                            }
                                                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                                                                    }
                                                                                                }
                                                                                                do {
                                                                                                    obj.prime_numbers[i] = 29;
                                                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            } else {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = degrees(vec4(-8.2, 90.21, 8.7, -3409.5256));
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                                            _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (false ? _GLF_FUZZED(_GLF_outVarBackup_GLF_color) : _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_outVarBackup_GLF_color = _GLF_color) - vec4(0.0, 0.0, 0.0, 0.0))));
                                                                        }
                                                                        _GLF_color = vec4(54.98, 8.9, 3.9, 80.57);
                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                        } else {
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = (7459.3124 - vec4(8.2, -7.9, -2.3, -469.764));
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                } else {
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), !(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))));
                                    }
                                }
                            }
                        }
                    } else {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(9.0, -0.6, 4.3, -7543.0201);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    vec2 uv = (gl_FragCoord.xy / resolution.x) * vec2(_GLF_IDENTITY(resolution.x / resolution.y, mix(float(_GLF_FUZZED(5.0)), float(resolution.x / resolution.y), bool(true))), 1.0);
    vec2 b = brick(uv * 7.0);
    vec3 color = vec3(patternize(b));
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6))), !(!(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6))))))); _injected_loop_counter++) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (gl_FragCoord.y < resolution.y / 1.1) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    } else {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_IDENTITY(_GLF_color = _GLF_IDENTITY(vec4(-8969.2934, 7.6, 72.09, 4562.1317), max(vec4(-8969.2934, 7.6, 72.09, 4562.1317), vec4(-8969.2934, 7.6, 72.09, 4562.1317))), (false ? _GLF_FUZZED(vec4(-98.06, -9172.7396, -5.6, 2540.2441)) : (_GLF_color = _GLF_IDENTITY(vec4(-8969.2934, 7.6, 72.09, 4562.1317), max(vec4(-8969.2934, 7.6, 72.09, 4562.1317), vec4(-8969.2934, 7.6, 72.09, 4562.1317))))));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            } else {
                            }
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(6.1, -_GLF_IDENTITY(4.1, min(4.1, 4.1)), 1.8, 1299.1268);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (binarySearch(obj, _GLF_IDENTITY(obj.prime_numbers[4], (obj.prime_numbers[4]) | (_GLF_IDENTITY(_GLF_IDENTITY(obj.prime_numbers[4], 0 ^ (obj.prime_numbers[_GLF_IDENTITY(4, int(ivec2(4, 0)))])), 0 ^ (_GLF_IDENTITY(_GLF_IDENTITY(obj.prime_numbers[4], 0 ^ (obj.prime_numbers[_GLF_IDENTITY(4, int(ivec2(4, 0)))])), (_GLF_IDENTITY(obj.prime_numbers[4], 0 ^ (_GLF_IDENTITY(obj.prime_numbers[_GLF_IDENTITY(4, int(ivec2(4, 0)))], clamp(obj.prime_numbers[_GLF_IDENTITY(4, int(ivec2(4, 0)))], obj.prime_numbers[_GLF_IDENTITY(4, int(ivec2(4, 0)))], obj.prime_numbers[_GLF_IDENTITY(4, int(ivec2(4, 0)))]))))) ^ 0)))))) != -_GLF_IDENTITY((int(resolution.y)), clamp((int(resolution.y)), (int(resolution.y)), _GLF_IDENTITY((int(resolution.y)), ~(~((int(resolution.y))))))) && binarySearch(obj, obj.prime_numbers[0]) >= -(int(resolution.x))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        } else {
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                _GLF_color = vec4(7.7, -27.32, -8799.7888, 4.1);
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        _GLF_color = vec4(98.97, -1.0, _GLF_IDENTITY(42.87, max(42.87, _GLF_IDENTITY(42.87, (_GLF_IDENTITY(42.87, mix(float(_GLF_FUZZED(-76.13)), float(42.87), bool(true)))) / 1.0))), -2429.3047);
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter, ~_GLF_IDENTITY((~(_injected_loop_counter)), ((~(_injected_loop_counter))) ^ 0)) != ((-80569) & 0)); _injected_loop_counter--) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_IDENTITY(_GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, mat4(1.0) * (_GLF_outVarBackup_GLF_color)), (_GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, mat4(1.0) * (_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, _GLF_IDENTITY((_GLF_outVarBackup_GLF_color) * mat4(1.0), mix(vec4(((_GLF_outVarBackup_GLF_color) * mat4(1.0))[0], ((_GLF_outVarBackup_GLF_color) * mat4(1.0))[1], ((_GLF_outVarBackup_GLF_color) * mat4(1.0))[2], ((_GLF_outVarBackup_GLF_color) * mat4(1.0))[3]), vec4(_GLF_FUZZED(1.4), _GLF_FUZZED(887.570), _GLF_FUZZED(134.586), _GLF_FUZZED(-2.2)), bvec4(false, false, false, false))))))) / vec4(1.0, 1.0, 1.0, 1.0));
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                for (int _injected_loop_counter = _GLF_IDENTITY(1, (1) << 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 ^ 1)); _injected_loop_counter--) {
                                    _GLF_color = vec4(920.139, 474.816, -7161.3749, -654.906);
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter, (false ? _GLF_FUZZED(_injected_loop_counter) : _GLF_IDENTITY(_injected_loop_counter, (_GLF_IDENTITY(true, (true) && _GLF_TRUE(true, (gl_FragCoord.y >= 0.0))) ? _injected_loop_counter : _GLF_FUZZED(_injected_loop_counter))))) < 1); _injected_loop_counter++) {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, mix(vec4((_GLF_color)[0], (_GLF_color)[1], _GLF_FUZZED(-10.33), (_GLF_color)[3]), vec4(_GLF_FUZZED(5343.8629), _GLF_FUZZED(4.0), _GLF_IDENTITY((_GLF_color)[2], mix(float(_GLF_IDENTITY((_GLF_color)[2], ((_GLF_color)[2]) - 0.0)), float(_GLF_FUZZED(9468.4386)), bool(false))), _GLF_FUZZED((5.3 * 5752.6908))), bvec4(false, false, true, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))));
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = floor(vec4(356.643, 9.5, -9750.1939, -674.841));
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = atanh(vec4(34.93, -2.7, -7944.5112, 9.6));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        do {
                            _GLF_color = (mix(vec4(-8.1, 34.84, -7702.8457, _GLF_IDENTITY(-_GLF_IDENTITY(352.916, (_GLF_IDENTITY(352.916, (_GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), max(_GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), clamp(_GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), float(mat4x2(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0, 1.0))), _GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), _GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))))), _GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), mix(float(_GLF_FUZZED(260.055)), float(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244)))), bool(true)))))) - 0.0)) * 1.0), max(_GLF_IDENTITY(-_GLF_IDENTITY(352.916, (_GLF_IDENTITY(352.916, (_GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), max(_GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), clamp(_GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), float(mat4x2(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0, 1.0))), _GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), _GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))))), _GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), mix(float(_GLF_FUZZED(260.055)), float(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244)))), bool(true)))))) - 0.0)) * 1.0), _GLF_ONE(1.0, injectionSwitch.y) * (-_GLF_IDENTITY(352.916, (_GLF_IDENTITY(352.916, (_GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), max(_GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), clamp(_GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), float(mat4x2(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0, 1.0))), _GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), _GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))))), _GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), mix(float(_GLF_FUZZED(260.055)), float(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244)))), bool(true)))))) - 0.0)) * 1.0))), -_GLF_IDENTITY(352.916, (_GLF_IDENTITY(352.916, (_GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), max(_GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), clamp(_GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), float(mat4x2(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0, 1.0))), _GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), _GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))))), _GLF_IDENTITY(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244))), mix(float(_GLF_FUZZED(260.055)), float(_GLF_IDENTITY(352.916, (true ? 352.916 : _GLF_FUZZED(974.244)))), bool(true)))))) - 0.0)) * 1.0)))), vec4(4194.4654, 8515.2254, 96.05, 229.437), bvec4(_GLF_IDENTITY(_GLF_IDENTITY(true, bool(bvec2(true, true))), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (_GLF_IDENTITY(true, bool(bvec2(true, true))))), true, false, false)) / 2.0);
                        } while (_GLF_WRAPPED_LOOP(false));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-6.3, 1.4, 11.56, 4.4);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(2.6, 9.3, -6.8, 1668.3886);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    for (int _injected_loop_counter = _GLF_IDENTITY(1, (1) | (1)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (((0 | 0) | 0) >> _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter--) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        } else {
                            color.yz -= dot(_GLF_IDENTITY(float(binarySearch(obj, obj.prime_numbers[4])), (true ? float(binarySearch(obj, obj.prime_numbers[4])) : _GLF_FUZZED(uintBitsToFloat(19310u)))), float(binarySearch(obj, obj.prime_numbers[0])));
                        }
                    }
                } else {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        discard;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            _GLF_color = vec4(-0.0, 2.6, -1.0, 6918.1091);
                        }
                        do {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                } else {
                                }
                                _GLF_color = vec4(4.8, 977.689, -9838.4742, 3.3);
                                for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), max(_GLF_IDENTITY(int(3), ~(~(int(3)))), int(3))))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((_GLF_IDENTITY(injectionSwitch.x, (injectionSwitch.x) + 0.0) < injectionSwitch.y), !(!((_GLF_IDENTITY(injectionSwitch.x, (injectionSwitch.x) + 0.0) < injectionSwitch.y))))))) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(1.1, -9458.9277, 42.17, 7.3);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
            } else {
                if (binarySearch(obj, 1) == -1) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        } else {
                            discard;
                        }
                    } else {
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(3.1, -879.631, 24.92, 4.4);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                } else {
                                }
                            }
                        } else {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-6061.0152, 7.7, -4.8, -5.4);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                _GLF_color = vec2(-65.09, 2740.3154).grrr;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(6.8, -10.67, 928.770, 8907.0366);
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                } else {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        for (int _injected_loop_counter = (0 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            } else {
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            color.yz += _GLF_IDENTITY(color.yz, mix(vec2((color.yz)[0], (color.yz)[1]), vec2(_GLF_FUZZED(4994.4137), _GLF_FUZZED((-0.4))), bvec2(false, false)));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = dFdxFine(vec4(8.8, -2.7, -937.948, -974.202));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    } else {
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, cos(vec4(0.0, 0.0, 0.0, 0.0)) * (_GLF_color));
                    }
                    _GLF_IDENTITY(_GLF_color = vec4(-1671.5562, 1.6, -8789.3321, -6.7), (_GLF_IDENTITY(_GLF_color = vec4(-1671.5562, 1.6, -8789.3321, -6.7), (true ? (_GLF_color = vec4(-1671.5562, 1.6, -8789.3321, -6.7)) : _GLF_FUZZED(_GLF_outVarBackup_GLF_color)))) - vec4(0.0, 0.0, 0.0, 0.0));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        } else {
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            _GLF_outVarBackup_GLF_color = _GLF_color;
        }
        _GLF_color = vec4(2.2, 7563.8025, 1.2, 0.0);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _GLF_IDENTITY(_injected_loop_counter++, ~(~(_GLF_IDENTITY(_injected_loop_counter++, (_GLF_IDENTITY(_injected_loop_counter++, (_injected_loop_counter++) - 0)) - 0))))) {
        _GLF_IDENTITY(_GLF_color = vec4(color, injectionSwitch.y), (_GLF_IDENTITY(_GLF_color = vec4(color, injectionSwitch.y), vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_color = vec4(color, _GLF_IDENTITY(_GLF_IDENTITY(injectionSwitch.y, (true ? injectionSwitch.y : _GLF_FUZZED(-887.100))), min(_GLF_IDENTITY(injectionSwitch.y, (true ? injectionSwitch.y : _GLF_FUZZED(-887.100))), _GLF_IDENTITY(injectionSwitch.y, (true ? injectionSwitch.y : _GLF_FUZZED(-887.100))))))))) + vec4(0.0, 0.0, 0.0, 0.0));
    }
}
