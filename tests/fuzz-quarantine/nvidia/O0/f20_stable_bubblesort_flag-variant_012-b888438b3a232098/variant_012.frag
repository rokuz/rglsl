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
precision highp int;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

bool checkSwap(float a, float b) {
    if (_GLF_DEAD(false)) {
        return true;
        if (_GLF_DEAD(false)) {
            return true;
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
        return gl_FragCoord.y < resolution.y / 2.0 ? a > b : a < b;
    } else {
    }
    if (_GLF_DEAD(false)) {
        return true;
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec3(true, false, true))))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return true;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return true;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_DEAD(false)) {
                    return true;
                }
            } else {
            }
        }
    } else {
    }
    for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 ^ 0)); _injected_loop_counter++) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                return true;
            }
            return true;
            if (_GLF_DEAD(false)) {
                return true;
            }
        }
    }
}

void main() {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
        return;
    }
    float data[10];
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                return;
            } else {
            }
        }
    } else {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            return;
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_outVarBackup_GLF_color = _GLF_color;
        } else {
        }
        _GLF_color = cos(sign((0.3 - vec4(-9.1, -5.2, -3.7, -352.819))));
        do {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        } while (_GLF_WRAPPED_LOOP(false));
        do {
            if (_GLF_DEAD(false)) {
                return;
            }
        } while (_GLF_WRAPPED_LOOP(false));
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                continue;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 1.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 1.0, 1.0, 0.0))))))) {
                break;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                vec4 _GLF_outVarBackup_GLF_color;
                do {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        break;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-44.45, 6.1, 20.35, -3.7);
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        if (_GLF_DEAD(false)) {
                            for (int _injected_loop_counter = ((1 ^ 1) ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY(1, (1) | (1))); _injected_loop_counter++) {
                                return;
                            }
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                } while (_GLF_WRAPPED_LOOP(false));
                _GLF_color = vec4(-5.6, -5.8, 4.4, -4.6);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            } else {
                if (_GLF_DEAD(false)) {
                    discard;
                }
            }
            return;
            for (int _injected_loop_counter = ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), clamp(int(3), int(3), _GLF_IDENTITY(int(3), (false ? _GLF_FUZZED(_injected_loop_counter) : int(3))))))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                if (_GLF_DEAD(false)) {
                    discard;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(48.30, 41.83, -4.5, -742.102);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, (false) || false)) || false))) {
                        continue;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    for (int i = 0; i < 10; i++) {
        if (_GLF_DEAD(false)) {
            continue;
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    discard;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    discard;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = radians(vec4(-872.297, 8.7, 0.6, 3.3));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    break;
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    _GLF_color = vec4(530.674, 26.12, 7.9, -6.8);
                }
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), (int(5)) >> 0))) >> _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter++) {
                    do {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            do {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                }
            }
            break;
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            do {
                data[i] = float(10 - i) * injectionSwitch.y;
                if (_GLF_DEAD(false)) {
                    return;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    do {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
                    _GLF_color = vec4(9.7, 9.2, -5.0, -333.839);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec4(15.63, -9.7, -2269.4914, 93.22) + (-7640.8127));
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    do {
                        do {
                            do {
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            } else {
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                continue;
                                            }
                                        } else {
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 & (-72808))); _injected_loop_counter--) {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                        }
                                        _GLF_color = ((-138.164) - vec4(-2.7, -63.17, -815.208, 7074.4462));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                discard;
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    discard;
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
            } while (_GLF_WRAPPED_LOOP(false));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = vec4(190.542, 3429.4562, -8.0, 37.11);
                } else {
                }
                if (_GLF_DEAD(false)) {
                    discard;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    break;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                break;
            }
        }
        {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    discard;
                }
                break;
                for (int _injected_loop_counter = (0 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), (int(2)) >> 0))) >> _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), max(_GLF_IDENTITY(int(2), int(ivec3(int(2), 0, 1))), int(2)))))); _injected_loop_counter++) {
                    if (_GLF_DEAD(false)) {
                        return;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                }
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                        break;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                    }
                    continue;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    } else {
                        discard;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-3.6, 3304.1646, -12.33, 8.9);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        continue;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    } else {
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                } else {
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            discard;
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            discard;
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-5.2, 860.331, -7893.2964, -303.099);
                        if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bool(false)), !(!(bool(bool(false)))))))) {
                            continue;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    _GLF_color = vec4(4.6, -3048.0126, 3612.7310, -853.419);
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        break;
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, false, false, true))))) {
                        continue;
                    }
                    discard;
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        break;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = vec4(1.9, -7.8, -0.7, 159.897);
            } else {
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                do {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                if (_GLF_DEAD(false)) {
                                    for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter--) {
                                        discard;
                                    }
                                }
                            } else {
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = fract(vec4(6.1, -7.1, -8640.2916, -9.6));
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        discard;
                                    } else {
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(8524.0995, 89.59, -104.167, 3.3);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                return;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            continue;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    do {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    } while (_GLF_WRAPPED_LOOP(false));
                    _GLF_color = dFdyCoarse(vec4(593.052, -104.960, 260.497, -84.60));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) && true))) {
                            break;
                        }
                        break;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            break;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                }
                continue;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    continue;
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    continue;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        discard;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = min(vec4(1.2, 4.9, 50.10, -0.5), mod(smoothstep(50.08, -6.8, vec4(-89.59, -1.9, -8.0, 143.806)), atanh(3.0)));
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0)))))) {
                            continue;
                        }
                    }
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    do {
                        return;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0)))));
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        continue;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-368.493, -7.4, -6.1, -2968.8543);
                    do {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = min(vec4(-0.3, -505.532, -58.97, 31.85), vec4(-886.034, -8200.0672, -8.6, 525.490));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                    return;
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    do {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            break;
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-15.18, -88.40, 1.0, -3623.0192);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                    }
                    _GLF_color = dFdy((-vec4(-4.8, -515.869, -641.201, -89.71)));
                } else {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        return;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        do {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            _GLF_color = vec4(7.2, -0.6, -320.035, -692.296);
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            do {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        discard;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0))))))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        } else {
                        }
                    }
                } else {
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                    discard;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
    }
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    discard;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        continue;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                    continue;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    _GLF_color = vec4(-4.4, 9.6, 7.1, 6.8);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                }
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), (true ? int(6) : _GLF_FUZZED(7074)))))); _injected_loop_counter++) {
                    _GLF_color = vec4(-18.91, 3538.2487, 1.0, -5.5);
                }
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    } else {
                    }
                    _GLF_color = (mat3x4(-89.66, 7.1, -586.533, -9.0, -4.6, 9825.4642, 3612.0502, 44.78, 7447.1733, 7.3, 1.2, -65.49) * vec3(-0.5, -1.4, -826.659));
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bool(true))))) {
                        discard;
                    } else {
                    }
                }
                do {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            return;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                discard;
                            }
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            discard;
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (vec4(2.0, 83.06, -4.3, -2673.6752) + vec4(-163.104, 550.073, -79.30, 92.20));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = dFdxCoarse(vec4(-396.390, 8.0, 64.76, 449.604));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0))))));
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
            return;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = cosh(vec4(69.19, 798.752, -16.91, -7.8));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    do {
                        return;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                break;
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    do {
        do {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    return;
                }
            } else {
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter--) {
                    vec4 _GLF_outVarBackup_GLF_color;
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        discard;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                    do {
                        for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(0), int(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            _GLF_color = fract(radians(vec4(-813.764, 8.8, 78.60, -5.1)));
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            } else {
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    continue;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    {
                        if (_GLF_DEAD(false)) {
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                return;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return;
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                            discard;
                        }
                        for (int _injected_loop_counter = (0 ^ int(_GLF_ZERO(0.0, injectionSwitch.x))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            _GLF_color = vec4(-1.3, 0.0, -0.8, -7767.9857);
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (radians(vec4(vec2(-6299.3490, 8.3), vec2(8.0, -310.474))));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) || false))) {
                                do {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(round(length(normalize(vec2(1.0, 1.0)))), 1.0)), dot(vec2(0.0, 0.0), vec2(round(length(normalize(vec2(1.0, 1.0)))), 1.0))))))) {
                                continue;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                discard;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            } else {
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                return;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    discard;
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                return;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    do {
                                        return;
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                discard;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    continue;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                        break;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        break;
                                    }
                                    _GLF_color = vec4(-4.0, 9.3, 93.09, -613.029);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                do {
                                    discard;
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return;
                                }
                                _GLF_color = (vec4(-6.7, -911.639, -5183.4161, -8333.4766) - 47.80);
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    continue;
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            break;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            continue;
                        }
                    }
                    return;
                }
                for (int i = 0; i < 9; i++) {
                    {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), !(_GLF_IDENTITY(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), !(!(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))))))) {
                        } else {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-9.6, 16.65, -5.5, -755.899);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    discard;
                                }
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), clamp(int(0), int(0), int(0)))))); _injected_loop_counter--) {
                            _GLF_color = vec4(-65.13, 40.73, 9.4, -4.5);
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            } else {
                                return;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                continue;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    break;
                                }
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                do {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                        }
                        do {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    for (int j = 0; j < 10; j++) {
                        if (j < i + 1) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    break;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    continue;
                                }
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | 0)); _injected_loop_counter--) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        break;
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                    } else {
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = ((-23.34) - intBitsToFloat(ivec4(29676, 3737, 8824, 73271)));
                                    {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                        }
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = unpackSnorm4x8(186426u);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                } else {
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        return;
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = (vec4(61.95, -53.88, 814.076, 8.6) / vec4(-626.384, 5708.5410, 0.4, -2293.7923));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                    }
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(0.9, 734.104, ((-64.02) + vec2(-8.3, 4.1)));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            break;
                                        }
                                    } else {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                continue;
                                            }
                                            _GLF_color = ((-6835.5891) / vec4(-35.95, 9.6, -435.810, -8.0));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                return;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                            return;
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            return;
                                        } else {
                                        }
                                    }
                                } else {
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        return;
                                    }
                                    {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            discard;
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            discard;
                                        }
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = sqrt(vec4(-15.31, 1201.6887, -2.8, -46.42));
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                } else {
                                                }
                                            }
                                        }
                                    }
                                }
                                continue;
                            }
                            continue;
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                continue;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                        }
                        for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 1)); _injected_loop_counter++) {
                            vec4 _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-2600.2341, -2721.4424, 71.10, -4.7);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 ^ 0)); _injected_loop_counter--) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        discard;
                                    }
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            } else {
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > ((1 & 1) ^ 1)); _injected_loop_counter--) {
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                }
                            }
                            do {
                                _GLF_color = (-99934, vec4(-871.220, -78.75, 1675.8545, 4.3));
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    } else {
                                        return;
                                    }
                                }
                                _GLF_color = roundEven(vec4(95.94, -70.15, -4393.9056, -74.74));
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    } else {
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    do {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        do {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            return;
                                        }
                                        _GLF_color = (mat4(3794.2899, -6.0, -96.37, -612.604, -264.446, -8.6, 7.7, -1.2, -8.9, -2.6, 425.509, 39.05, -2.7, 87.28, -1144.3555, -96.86) * vec4(489.910, 89.14, -316.461, 7876.7857));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                } else {
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        _GLF_color = vec4(-8.0, 5.9, 0.6, -8.4);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                } else {
                                }
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = trunc(vec4(vec2(-9887.5217, 1.3), -3.1, 6803.9624));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                    }
                                    do {
                                        return;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                break;
                                            }
                                            discard;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))))))) {
                                        } else {
                                            _GLF_color = intBitsToFloat(min(ivec4(-72, -95062, -50295, 35702), 30559));
                                        }
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-6857.8833, -4.3, -69.86, 2.7);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) || false))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                discard;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                continue;
                                            }
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, true))))) {
                                                continue;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                }
                                do {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(8.3, uintBitsToFloat(uvec3(49798u, 61205u, 59052u)));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            do {
                                                return;
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            return;
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    _GLF_color = vec4(72.20, 36.25, -1.4, -215.894);
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0)))));
                                do {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        do {
                                            for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                return;
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                continue;
                                                {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        continue;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    do {
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            return;
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
                                                    _GLF_color = vec4(208.852, 2085.3010, 3.5, 77.33);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(0.0))))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                    }
                                                }
                                            }
                                            continue;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    }
                                    return;
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        continue;
                                    }
                                    _GLF_color = vec4(-19.01, 2.0, 60.00, -8.1);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        discard;
                                    }
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                vec4 _GLF_outVarBackup_GLF_color;
                                do {
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                } while (_GLF_WRAPPED_LOOP(false));
                                _GLF_color = vec4(5497.2691, -9.9, -8.9, 5710.8505);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    do {
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) && (_GLF_IDENTITY(false, !(!(false))))))) {
                                        discard;
                                    }
                                    _GLF_color = vec4(-1545.5088, 2.4, 403.563, -0.4);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, tan(0.0))), dot(vec2(1.0, 1.0), vec2(0.0, tan(0.0)))))))) {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    } else {
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                    }
                                    do {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(0.0))))) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = max(vec4(7619.8793, 0.4, 9.4, -6.0), (vec4(-2.0, 2.9, 233.858, 5.5) * vec4(463.851, -20.05, -88.28, -146.594)));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                                                        return;
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                }
                                break;
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    continue;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-1.5, -40.31, -4.9, -0.1);
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            return;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            continue;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                continue;
                            }
                        }
                        bool doSwap = checkSwap(data[i], data[j]);
                        if (_GLF_DEAD(false)) {
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                discard;
                            }
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                do {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    discard;
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = dFdyFine(vec4(-2574.0457, -9.2, 1.0, -1.8)).rgab;
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                } else {
                                    discard;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        discard;
                                    }
                                }
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            _GLF_color = vec4(sinh(4296.0100));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = mat3x4(mat4x3(-7773.9468, -9.1, -99.84, 9.6, 645.098, -143.899, -19.10, -477.894, -78.18, 6681.5064, 3.4, -5.4))[2];
                                    } else {
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    do {
                                        _GLF_color = vec4(-6.0, -19.24, -369.933, -248.694);
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))))))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            return;
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            continue;
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            discard;
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            do {
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            _GLF_color = (vec4(-9890.7355, -2125.5159, -82.57, -31.25) + dot(vec4(-1.9, -5026.2894, 10.45, -5.3), vec4(-855.375, 8.5, 2757.4937, -626.746)));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                                break;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            } else {
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                            }
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                        _GLF_color = vec4(-1.7, vec2(2.4, -7.7), (9926.2465 + 3357.2865));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                continue;
                                            }
                                        }
                                    }
                                } else {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        } else {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                continue;
                                            }
                                        }
                                        _GLF_color = vec4(-614.253, 1.2, 625.386, 65.39);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 | 0)); _injected_loop_counter--) {
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                    return;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                        return;
                                    }
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, (false) || false)) && true))) {
                                        return;
                                    }
                                    break;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                        do {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                continue;
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 | 1)); _injected_loop_counter++) {
                                            _GLF_color = vec4(98.52, 522.719, 2288.0714, -900.930);
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    continue;
                                                }
                                                return;
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                continue;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-0.1, -5.7, -3273.6920, -15.54);
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                for (int _injected_loop_counter = (0 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((((1 << _GLF_IDENTITY(int(5), int(5))) >> _GLF_IDENTITY(int(5), int(5))) << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), int(ivec3(int(7), 1, 0))))) >> _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter++) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                        }
                        if (doSwap) {
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            float temp = data[i];
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    do {
                                        discard;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                            } else {
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            } else {
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(1.3, -86.32, 4.4, -0.3);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    do {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                    }
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                for (int _injected_loop_counter = (1 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            discard;
                                        }
                                    }
                                    do {
                                        data[i] = data[j];
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                            continue;
                                        }
                                        do {
                                            discard;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                return;
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                        }
                                        {
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                } else {
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                    discard;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                do {
                                                    _GLF_color = mat4(4594.3167, -242.367, 7444.6909, -6391.6476, -0.7, 3356.1105, 2.1, 676.970, 70.60, -94.83, 0.7, 8.3, 2298.6408, -118.129, -7.6, 34.15)[3];
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    do {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                }
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                            } else {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(6.9, 671.435, 83.84, 2.4);
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-950.422, -9.9, 36.89, -946.556);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                continue;
                                                            }
                                                        } else {
                                                        }
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                            _GLF_color = intBitsToFloat(ivec4(-25036, -10732, 22121, 58360));
                                            for (int _injected_loop_counter = _GLF_IDENTITY(0, (0) | (0)); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            return;
                                                        }
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        _GLF_color = vec4(259.165, -7.2, -5.7, -105.203);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    } else {
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    return;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                discard;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        return;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                do {
                                    discard;
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                            data[j] = temp;
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                break;
                            }
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-3.3, -764.743, 3017.5415, 74.95);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    discard;
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    do {
                                        _GLF_color = reflect(vec4(-50.02, -9790.2262, -14.24, 5.0), asinh(vec4(1.9, 4254.6659, 651.109, 8.6)));
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        } else {
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            continue;
                                        }
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                        continue;
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    } else {
                                        _GLF_color = round(vec4(-93.41, 9.2, 2.9, 9974.0625));
                                    }
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        continue;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-4.9, 1120.9591, 537.500, 290.631);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                        break;
                                    }
                                    for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(0), int(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                break;
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                }
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > ((0 & int(false)) >> _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter--) {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(8.4, -1262.3180, 1.1, -1419.2201);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                        }
                                        return;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))))) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        discard;
                                    } else {
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (_GLF_IDENTITY(false, true && (false)))))) {
                                        return;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = dFdxCoarse(vec4(-9594.9088, 8.8, 133.561, 4.7));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                break;
                                            }
                                            discard;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = clamp(vec4(-5168.7616, -58.31, -3.7, -1.9), vec4(-6.6, -6372.7424, -2.6, -7923.8265), mod(vec4(-9.9, 0.2, -2.0, -877.184), vec4(-23.90, -643.249, 9.2, 2.7)));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 | 0) & ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0))))); _injected_loop_counter++) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                discard;
                                            }
                                            _GLF_color = asin(vec4(494.394, 917.931, -678.368, 255.354));
                                        } else {
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    do {
                                                        discard;
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                }
                                                continue;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                } else {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(sin(0.0)))))) {
                                                        break;
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                            }
                                        }
                                    } else {
                                    }
                                    do {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            _GLF_color = ldexp(vec4(772.405, -152.409, -411.086, 369.358), sign(ivec4(12210, -47209, -49194, 65830)));
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) && (true)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    break;
                                                }
                                                break;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            } else {
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        continue;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                        continue;
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    _GLF_color = vec4(164.425, -2.9, -34.63, 65.55);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            } else {
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    break;
                                }
                                discard;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = atanh(vec4(-942.786, 4.1, 32.19, -4186.5285));
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        } else {
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    break;
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                    return;
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = atan(step(-4611.7153, vec4(-1.2, -4.0, -895.916, -8028.7133)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        _GLF_color = vec4(-922.122, 30.76, -4.5, 370.364);
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))) && true))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    return;
                                                }
                                                continue;
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    } else {
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                    }
                                    _GLF_color = (vec4(8.5, -3402.1920, -2.9, 1208.2734) * (-2413.8397));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        } else {
                                        }
                                    } else {
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            break;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                continue;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 0.0, 0.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), tan(0.0), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0)))))) {
                                    break;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            } else {
                                _GLF_color = (vec4(-5.9, -3.7, -3.3, 662.111) / vec4(6.0, 93.03, -8.7, -2802.6042));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    discard;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                    }
                                } else {
                                }
                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                    _GLF_color = mix(vec4(434.366, 53.61, 8438.1967, -657.442), vec4(-29.55, 16.69, -703.601, -39.67), bvec4(true, true, false, true));
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    break;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    }
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        do {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        _GLF_color = vec4(9392.2778, -77.21, -102.482, 9579.4314);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            for (int _injected_loop_counter = _GLF_IDENTITY(1, (1) >> 0); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                return;
                                            }
                                        }
                                    }
                                    return;
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-754.028, 7.4, 446.631, 434.319);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                do {
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                _GLF_color = sinh(((-5.7) / vec4(6.9, 424.763, -0.5, -7.1)));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(!(false))))) {
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    } else {
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                    continue;
                                    {
                                        do {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(dFdyFine(6.0), exp2(vec2(-7.7, 3.2)), 7.9);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(0.9, vec3(2611.4386, 2.7, -9127.2801));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-1.1, -5.0, 3558.0731, -66.49);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    break;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                            } else {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    do {
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                        do {
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            return;
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            continue;
                                                        }
                                                        continue;
                                                    }
                                                    _GLF_color = vec4(8308.3053, -7.8, -8.0, 89.70);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    return;
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            discard;
                                                        }
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(9.4, 2.6, 8008.9922, 456.282);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    } else {
                                                    }
                                                }
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        return;
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = (mat4(3665.9391, -479.712, -6.5, -5860.0776, -92.01, -258.211, -4980.2748, -1.4, -63.47, 87.94, 8.8, -5421.0504, 9596.1856, 244.011, 3.7, 0.7) * vec4(-5.4, 17.48, 1602.9115, 6.1));
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                        break;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            discard;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (((1 | (1 & 1)) << _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), max(int(3), int(3))))) >> _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), int(ivec4(int(3), 0, 0, 0)))))); _injected_loop_counter++) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    discard;
                                                } else {
                                                }
                                            }
                                        }
                                        return;
                                    }
                                    _GLF_color = (step(vec4(-370.161, 993.680, 58.19, 87.78), vec4(25.51, -2.0, 36.36, 3153.7036)) * (-7228.8333));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), false || (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                        break;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = (vec4(-3.2, -1.5, -0.0, 3.5) * log2(vec4(6.6, -9021.4587, 9.8, 463.853)));
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    continue;
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                break;
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                break;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            continue;
                                        }
                                    }
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))), 0.0, 1.0), vec4(1.0, 1.0, determinant(mat3(1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0)), 0.0)), dot(vec4(0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))), 0.0, 1.0), vec4(1.0, 1.0, determinant(mat3(1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0)), 0.0))))))) {
                                            break;
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)), vec4(0.0, 1.0, 1.0, 1.0)), dot(vec4(1.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)), vec4(0.0, 1.0, 1.0, 1.0))))))) {
                                                break;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    return;
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-7928.1328, 1828.0312, -73.79, -410.630);
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        break;
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            continue;
                                                        }
                                                    }
                                                } else {
                                                }
                                                _GLF_color = mat4(-699.251, -8.6, 327.188, -553.227, -461.140, 9637.8977, -4.1, -129.194, -2.6, -8797.3414, -7464.1601, -3948.2762, 79.29, 5080.0809, 981.999, 5616.4130)[2];
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    } else {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        } else {
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        }
                                                        _GLF_color = vec4(atan(-55.67));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            discard;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                        }
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            _GLF_color = atanh(vec4(-86.62, -3294.7801, -5.6, 3.4));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        } else {
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 | 0)); _injected_loop_counter--) {
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                }
                                                _GLF_color = vec4(-3642.4072, -398.919, -7.8, -310.510);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            continue;
                                        }
                                        _GLF_color = (vec4(2660.2559, -3.6, 106.181, -1.7) * mat4(-8.8, -6.3, 2.7, -30.69, -933.859, -9.9, 95.19, -8.0, -666.095, 256.944, 8.4, 3.8, 6120.6319, -5.4, -41.04, -228.634));
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                discard;
                                            }
                                            continue;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        break;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(vec2(395.934, -9.9), -53.97, fwidth(-4.6));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    continue;
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    do {
                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(_GLF_IDENTITY(false, bool(bvec3(false, true, false))), true))))) {
                                                            return;
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                }
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(sin(0.0)))))) {
                                                    discard;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            break;
                                            {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    do {
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                    _GLF_color = tan(vec4(1.8, -661.431, -6.4, 24.25));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            return;
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                break;
                                                            }
                                                        } else {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                                if (_GLF_DEAD(false)) {
                                                                    return;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                } else {
                                                }
                                                do {
                                                    _GLF_color = min(normalize(vec4(-7541.9308, -3.1, -2416.2144, -22.29)), -8.1);
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            discard;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                    }
                                                } else {
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        discard;
                                                    }
                                                } else {
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = sinh(tanh(mix(vec4(-4.1, 950.574, 1188.8552, -4.9), vec4(-76.63, -815.526, 7.4, -27.31), vec4(-9.2, 1213.0322, -5878.3550, 4831.4767))));
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            continue;
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    continue;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                return;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                break;
                                            }
                                            do {
                                                for (int _injected_loop_counter = _GLF_IDENTITY(1, int(ivec3(1, 0, 1))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = vec4(3321.1392, 5.0, -54.54, 118.872);
                                                    } else {
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                return;
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        break;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    do {
                                                        return;
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        {
                                            {
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = abs(vec4(9.9, 34.81, 3573.5016, -7.7));
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            return;
                                                        }
                                                    }
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = dFdxCoarse(vec4(88.93, 1.3, -2.9, 91.07));
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = (vec4(8.3, -3775.9564, 18.33, 9.8) * mat4(412.707, -84.45, 1.7, -6.6, 9663.2931, 33.41, 4910.9254, 0.2, -5.6, -3.1, -5834.3531, -8088.6741, 3819.9991, -6968.4412, -6.1, 1097.2431));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            continue;
                                                        }
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(31.35, -8.8, 246.177, 6325.4771);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            _GLF_color = dFdyFine(exp(mat3x4(594.074, 696.760, 6272.0217, 4.1, -9.9, 598.778, -7.0, -9340.6710, -483.969, 8347.6566, -5.5, 9.0)[2]));
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                do {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = (+(-vec4(-7.2, 5.7, -86.26, 144.996)));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                            } else {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    } else {
                                                    }
                                                } else {
                                                }
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                                    break;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        discard;
                                                    }
                                                }
                                            }
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    do {
                                                        discard;
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    return;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                        do {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), bool(bool(!(false)))))))) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    continue;
                                                }
                                                _GLF_color = (vec4(4.3, 4.1, -7177.0256, 6437.3312));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            continue;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        continue;
                                        {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                continue;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    return;
                                                }
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            do {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                } else {
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = ceil(vec4(-44.36, -506.926, 3.3, 102.698));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                for (int _injected_loop_counter = (int(_GLF_ONE(1.0, injectionSwitch.y)) | (1 & int(_GLF_ONE(1.0, injectionSwitch.y)))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            discard;
                                                        }
                                                    } else {
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    } else {
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, false || (false))) && true))) {
                                                        } else {
                                                            _GLF_color = trunc(vec4(-79.58, -3.0, 952.793, -2152.8577));
                                                        }
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        break;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        continue;
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = cosh(vec4(-128.609, -4.0, -1.2, -2778.6259));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        break;
                                                    }
                                                    for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                            }
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            break;
                                                        }
                                                    }
                                                }
                                                break;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                return;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        discard;
                                                    } else {
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (vec4(-4.8, -6.8, -6.9, -987.955));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                break;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                continue;
                                                            }
                                                        } else {
                                                        }
                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 & 1)); _injected_loop_counter++) {
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                            }
                                                        }
                                                        _GLF_color = atan(vec4(-7.3, 6014.4784, 79.02, -253.536), vec4(-974.605, 54.87, -458.016, 7561.2324));
                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                                            return;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            break;
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 & 1)); _injected_loop_counter++) {
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            }
                                                            _GLF_color = vec4(-944.472, 3888.2476, 1.6, 425.846);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (_GLF_IDENTITY(true, bool(bool(true)))) || false))) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    continue;
                                                                }
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (_GLF_IDENTITY(true, (true) && true))))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                } else {
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                                                break;
                                                            }
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                        if (_GLF_DEAD(false)) {
                                                            do {
                                                                discard;
                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        continue;
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = tan(vec4(6237.4379, 1097.2084, -155.034, 143.065));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            continue;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                    _GLF_color = max(inversesqrt(vec4(-16.06, 5447.7816, 3.5, -308.270)), vec4(-3.8, 410.216, 1.1, 75.03));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    break;
                                                }
                                            } else {
                                            }
                                            do {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = refract(vec4(-1.8, -0.0, 282.420, 3.1), vec4(7.8, 52.88, 6.7, 938.391), -7.2);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_DEAD(false)) {
                                                                continue;
                                                            }
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            } else {
                                                                if (_GLF_DEAD(false)) {
                                                                    break;
                                                                }
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    discard;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    return;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    return;
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                } else {
                                                }
                                                _GLF_color = vec4(-57.24, vec2(-4.6, -7168.7964), -8.8);
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                break;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            discard;
                                        }
                                        discard;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        continue;
                                    }
                                    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), min(int(7), int(7))))); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        _GLF_color = vec4(-3984.7285, 62.54, 410.632, 6.4);
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            do {
                                                do {
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                continue;
                                            }
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (false) || false))) {
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                }
                                                _GLF_color = vec4(-449.602, 0.0, -2944.7217, 5.1);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        return;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                            }
                                            do {
                                                _GLF_color = intBitsToFloat(ivec4(44544, -14140, 47701, 39304));
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, 0.0, 0.0, abs(0.0), 1.0, 0.0, log(1.0), 0.0))))));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                continue;
                                            }
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    } else {
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    do {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    do {
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, true && (_GLF_IDENTITY(false, !(!(false))))))) {
                                            continue;
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        } else {
                                            _GLF_color = pow(vec4(9145.7188, -3.6, -6974.3332, 6632.9770), exp2(vec4(3.0, -9385.0477, -0.2, 297.734)));
                                            {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    continue;
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                } else {
                                                }
                                                _GLF_color = vec4(vec2(-4306.6304, -89.13), vec2(-5.5, -25.09));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0))))))) {
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                discard;
                                            } else {
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        break;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        do {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    continue;
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    _GLF_color = vec4(-736.976, 9754.5561, -7445.9178, -0.9);
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            continue;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            do {
                                                _GLF_color = clamp(pow(vec4(-9.9, -6987.8876, -173.264, 853.449), vec4(9.0, -52.89, -2957.2885, 5.9)), vec4(6111.5502, -23.36, -4.4, 7.2), vec4(-550.243, 3.9, -958.481, 2.2));
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                break;
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            do {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    do {
                                                        discard;
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x)))))));
                                            _GLF_color = (mat4(-0.3, 9629.9197, -3495.3269, 7627.6358, -5.1, 33.30, -2.9, -1.6, 3811.8631, 3.9, 7.1, 686.796, -5.7, 2.9, -9439.0901, 433.863) * vec4(-8.2, -174.786, -677.560, 7118.2995));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        return;
                                                    } else {
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                                        continue;
                                                    }
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        continue;
                                                    }
                                                    _GLF_color = dFdxCoarse((vec3(3.3, -5.4, -53.80) * mat4x3(-28.87, -1.6, -9.2, 39.62, 3740.0411, -919.031, -5.7, 722.115, -1.3, 926.891, 7532.0071, -5.7)));
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            for (int _injected_loop_counter = _GLF_IDENTITY(_GLF_IDENTITY(0, clamp(0, 0, 0)), clamp(_GLF_IDENTITY(0, clamp(0, 0, 0)), _GLF_IDENTITY(0, clamp(0, 0, 0)), _GLF_IDENTITY(0, clamp(0, 0, 0)))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 | 1)); _injected_loop_counter++) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                return;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                    } else {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                                                            continue;
                                                        }
                                                    }
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            discard;
                                        }
                                        discard;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            break;
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(vec2(-78.83, -7.5), vec2(-954.492, 44.48));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        do {
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(8.1, -624.377, 42.91, -2.1);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec2(true, false))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2))) << _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), ~(_GLF_IDENTITY(~(int(1)), int(ivec3(~(int(1)), 1, 0))))))) >> _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter++) {
                                            return;
                                        }
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    } else {
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = faceforward(vec4(4.2, -198.859, 6219.2863, -2.3), vec4(-91.97, 90.34, -793.974, 1.5), vec4(-0.1, 1320.6401, 1.4, 384.997));
                                    } else {
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(8), int(8))); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3)))); _injected_loop_counter++) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        } else {
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    continue;
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (((-8.1) - vec4(-4.2, 8.0, 949.541, 8.7)) / 7.8);
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, (_GLF_IDENTITY(1, ~(~(1)))) >> 0)); _injected_loop_counter++) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            break;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                continue;
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), min(int(7), int(7)))))); _injected_loop_counter--) {
                                discard;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    discard;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                _GLF_color = mod(vec4(245.902, -9.1, -36.86, -46.50), vec4(-7.4, 3.3, -1.5, -2.4));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                        break;
                                    }
                                    _GLF_color = step(3147.6376, mat2x4(7.0, 3.8, 7746.9289, 523.747, -15.25, 14.48, -8165.7283, 50.32)[0]);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                        }
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                } else {
                                    return;
                                }
                            }
                            discard;
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    _GLF_color = atan(vec4(3990.1056, 22.04, -32.26, 3.5), vec4(389.157, 2.5, -4.6, -7792.0044));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    } else {
                                    }
                                }
                                for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(5), int(5))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 | (1 ^ (0 | 0)))); _injected_loop_counter++) {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    do {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(vec2(-7194.6047, -4374.8531), 2.3, -4373.9455);
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            } else {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            for (int _injected_loop_counter = (0 | (0 << _GLF_IDENTITY(int(4), int(4)))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                return;
                                            }
                                        }
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    _GLF_color = vec3(36.25, -5.2, 818.290).yxxz;
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            _GLF_color = dFdx(vec4(-4.3, -48.18, 668.585, -2520.9633));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    continue;
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            return;
                                        }
                                    }
                                } else {
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, sin(0.0), 0.0, 0.0)))))) {
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                discard;
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            _GLF_color = vec4(1.0, 527.888, -6.0, -81.47);
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    break;
                                }
                                return;
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    continue;
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                _GLF_color = vec4(-95.53, 9.0, 4.3, 1.0);
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-833.752, -9316.5409, -140.342, 767.279);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                discard;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        discard;
                                    } else {
                                    }
                                }
                            }
                        }
                        continue;
                    }
                }
            } else {
                do {
                    if (_GLF_DEAD(false)) {
                        discard;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY(1, (1) - (0 ^ 0))); _injected_loop_counter++) {
                                    _GLF_color = smoothstep(-979.185, -70.25, vec4(68.85, -4.1, 436.682, 9623.4591));
                                }
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                }
                                discard;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    break;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            }
                            _GLF_color = vec4(243.055, -8892.8487, -56.47, -5312.5916);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                    discard;
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return;
        }
        return;
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false || (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
            return;
        }
        return;
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
            if (_GLF_DEAD(false)) {
                return;
                if (_GLF_DEAD(false)) {
                    break;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    do {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        do {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, (false) || false)));
                    } while (_GLF_WRAPPED_LOOP(false));
                    _GLF_color = vec4(-176.497, 2254.4055, 0.5, -4341.6926);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        if (_GLF_DEAD(false)) {
            return;
        }
    } else {
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(false)) {
            do {
                return;
                if (_GLF_DEAD(false)) {
                    continue;
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, ~(~(1)))); _injected_loop_counter++) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                do {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            return;
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                _GLF_color = faceforward(vec4(-86.43, 241.331, 3.9, 5583.7997), vec4(-64.16, 2.7, -5.8, -2155.0549), vec4(-99.64, -0.4, 3.3, -83.15));
                do {
                    do {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(false)) {
                    do {
                        return;
                    } while (_GLF_WRAPPED_LOOP(false));
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        } else {
        }
        _GLF_color = abs(vec4(398.224, -2.5, -3.9, 8417.8797));
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        } else {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (int(7)) << 0)))); _injected_loop_counter--) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                }
            } else {
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        break;
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY(1, (true ? _GLF_IDENTITY(1, ~(~(1))) : _GLF_FUZZED((32876 / 29232))))); _injected_loop_counter++) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat2(0.0, 1.0, 0.0, 0.0)))))) {
            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                return;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return;
                }
            } else {
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                return;
            }
        } else {
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        {
            if (_GLF_DEAD(false)) {
                do {
                    return;
                } while (_GLF_WRAPPED_LOOP(false));
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (uvec2(180815u, 178079u), fma(vec4(2.7, 1189.2013, -883.357, -593.366), vec4(-740.792, -7.0, 1.5, 415.236), vec4(7.1, -5.9, 0.5, -137.444)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(712.172, -9.3, -2.5, 674.435);
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                            return;
                        }
                    }
                } else {
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
        } else {
            return;
        }
    }
    do {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        } else {
                            return;
                        }
                    }
                } else {
                }
                do {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = vec4(5958.8096, 944.896, 6061.6849, -1.5);
                    } else {
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        discard;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            continue;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            continue;
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    do {
                        return;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                }
            } else {
                do {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return;
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                do {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            continue;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                discard;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                            return;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(7490.4132, 831.490, -94.03, -562.545);
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            if (gl_FragCoord.x < resolution.x / 2.0) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    continue;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-6748.5743, 2039.0416, -7486.1980, 6.5);
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (int(_GLF_ONE(1.0, injectionSwitch.y)) & 1)); _injected_loop_counter++) {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    _GLF_color = vec4(-91.54, -5142.0651, 868.378, -6.9);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                            continue;
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        discard;
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    }
                                    {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        } else {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        _GLF_color = vec4(6.3, 5737.2487, -0.3, 740.278);
                                        for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                continue;
                                            }
                                        }
                                    }
                                    _GLF_color = (vec4(-7746.5016, 348.859, -400.558, -846.975) * vec4(-494.928, -628.271, -488.288, -2.7));
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                } else {
                                                    discard;
                                                }
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(9204.9831, 5025.0675, 5.0, -2.1);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                break;
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                do {
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                        discard;
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                            }
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    break;
                                                }
                                                discard;
                                            }
                                        }
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                discard;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                return;
                                            }
                                            _GLF_color = vec4(854.938, 173.939, 698.807, -9.0);
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    break;
                                                }
                                                _GLF_color = vec4(-756.684, -4.9, 653.318, -33.55);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        continue;
                                                    }
                                                }
                                            } else {
                                            }
                                        }
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            return;
                                            {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                                    return;
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                for (int _injected_loop_counter = (1 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                    _GLF_color = vec4(846.970, 32.05, -1922.3922, -29.92);
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) || false))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                        }
                                    }
                                    do {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                } else {
                                                }
                                                _GLF_color = dFdy(smoothstep(vec4(3.9, -2.9, -1.7, -287.765), vec4(266.644, 2.1, 3.5, -625.477), vec4(3.5, -1.0, 879.175, 8002.8053)));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, true))))) {
                                                            return;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            discard;
                                                        }
                                                        _GLF_color = vec4((mat2x3(-7795.5587, -5.1, -1707.6658, -1586.2576, 937.495, -7.8) * vec2(-25.12, -70.55)), pow(9.4, -3.5));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                return;
                                                            }
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            discard;
                                                        }
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        continue;
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    }
                                }
                                _GLF_color = vec4(data[0] / 10.0, data[5] / 10.0, data[9] / 10.0, 1.0);
                            } else {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                    discard;
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    for (int _injected_loop_counter = ((0 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(0), int(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                    }
                                    _GLF_color = (determinant(mat3(-9.7, -188.267, -9.1, 4.6, -7.5, 87.20, 74.31, -8.1, 8.6)) * vec4(-4374.2589, 824.690, -57.79, 653.820));
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(2.7, -7.1, 4.9, -913.134);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            } else {
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                _GLF_color = vec4(data[5] / 10.0, data[9] / 10.0, data[0] / 10.0, 1.0);
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
                                continue;
                            }
                            return;
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    } else {
                        return;
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                        _GLF_color = vec2(-7.5, -86.87).ggrg;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            } else {
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(bvec4(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))), true, true, false))))) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                return;
                            }
                            _GLF_color = vec4(7.9, -6.7, 1139.3393, 873.806);
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec3(0.0, 0.0, 0.0)))))) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            return;
                                        } else {
                                        }
                                    }
                                } else {
                                }
                            }
                        }
                    }
                    return;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
            }
        } else {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(8574.0545, 83.23, -3.7, 7313.5527);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    return;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        do {
                            return;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    continue;
                                }
                                continue;
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    } else {
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                        return;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        return;
                    } else {
                    }
                }
            } else {
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
}
