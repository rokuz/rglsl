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

vec3 _GLF_outlined_0(vec2 injectionSwitch, vec2 o) {
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
        if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-0.4, -0.5, -45.65, 1239.2233);
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
            }
            _GLF_color = _GLF_color;
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    _GLF_color = vec4(9.2, -5.2, 644.974, 6604.1128);
                }
            }
        }
    } else {
    }
    do {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            do {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(1273.4293, -2787.1823, -579.187, 264.243);
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        do {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        break;
                    }
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
        } else {
        }
        return vec3(injectionSwitch.x, cos(o));
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0)))));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
        _GLF_color = dFdxFine(_GLF_color);
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                _GLF_color = _GLF_color;
            }
        }
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                } else {
                    do {
                        _GLF_color = _GLF_color;
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(false)) {
                        discard;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                            continue;
                        }
                    }
                }
            }
        }
    }
}

vec2 pattern(in vec2 x) {
    vec2 n = floor(x);
    vec3 m = vec3(1.0);
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = vec4(95.45, -261.503, -6.2, 8765.6798);
        }
    }
    if (_GLF_DEAD(false)) {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
            return vec2(1.0, 1.0);
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            for (int _injected_loop_counter = _GLF_IDENTITY(0, (_GLF_IDENTITY(0, (0) << 0)) >> 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                    return vec2(1.0, 1.0);
                }
            }
        } else {
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                        _GLF_color = vec4(-83.55, 3836.7706, -7.8, -9534.8017);
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))), !(!(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0)))))))) {
                        return vec2(1.0, 1.0);
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                    } else {
                        return vec2(1.0, 1.0);
                    }
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    _GLF_color = vec4(-6.8, -26.29, -3158.3577, -89.90);
                }
            }
        }
    } else {
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-397.891, -6690.6223, 3.3, -6.3);
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            _GLF_color = vec4(13.10, 614.980, 80.55, 474.395);
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                continue;
            }
            for (int j = -1; j <= int(injectionSwitch.y); j++) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        continue;
                    }
                }
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (3316.7508 * _GLF_color);
                    }
                }
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = tan(_GLF_color);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        do {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                } else {
                                    _GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = (82.21 / _GLF_color);
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = round(atan(_GLF_color));
                                }
                            }
                            discard;
                        } else {
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = fract(vec4(-44.06, -763.450, 5348.1612, 3.4));
                    }
                    do {
                        if (_GLF_DEAD(false)) {
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = (1.9 / _GLF_color);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-9.4, -8.3, 1.9, -9182.3243);
                                            }
                                        }
                                    } else {
                                    }
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                _GLF_color = step(8.9, _GLF_color);
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                _GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return vec2(1.0, 1.0);
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                return vec2(1.0, 1.0);
                                            }
                                        }
                                    }
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = uintBitsToFloat(uvec4(93453u, 1256u, 96949u, 145649u));
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ (1 & 1))); _injected_loop_counter++) {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    } else {
                                                        _GLF_color = vec4(-4021.0032, -5704.9658, 2.3, 382.995);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    return vec2(1.0, 1.0);
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    continue;
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    discard;
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            _GLF_color = vec4(4762.4975, fwidthCoarse(m));
                                        }
                                    }
                                }
                                _GLF_color = vec4(-9.5, 59.02, 4472.1100, 3302.7178);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    _GLF_color = vec4(-2684.3236, 4.8, 3.9, -4301.9421);
                                    if (_GLF_DEAD(false)) {
                                        return vec2(1.0, 1.0);
                                    }
                                }
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = tan(_GLF_color);
                                        } else {
                                        }
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    _GLF_color = _GLF_color;
                                }
                                continue;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                return vec2(1.0, 1.0);
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(5.0, -3.7, 1346.3318, 6.8);
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return vec2(1.0, 1.0);
                                    }
                                    _GLF_color = log2(dFdx(vec4(-9319.1594, -221.454, -7.8, -2.1)));
                                    if (_GLF_DEAD(false)) {
                                        return vec2(1.0, 1.0);
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (_GLF_IDENTITY(false, bool(bvec4(false, true, false, true))))))) {
                                        _GLF_color = _GLF_color;
                                    }
                                }
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(7593.3926, 80.09, -530.645, 84.65);
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                            }
                        }
                        discard;
                    }
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
                do {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            for (int i = -1; i <= int(injectionSwitch.y); i++) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = fwidthCoarse(_GLF_color);
                                    }
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    do {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = roundEven(sin(vec4(15.71, -914.575, -90.22, -6.2)));
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(6.9, 9.1, -1.1, 9362.2013);
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    } else {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            do {
                                                _GLF_color = vec4(26.35, -889.092, -3050.1698, 2259.1512);
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        } else {
                                        }
                                    }
                                }
                                vec2 g = vec2(float(j), float(i));
                                if (_GLF_DEAD(false)) {
                                    return vec2(1.0, 1.0);
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter++) {
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = vec4(-9.0, -8145.8614, 44.82, 6037.2838);
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            return vec2(1.0, 1.0);
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        do {
                                            discard;
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    }
                                    break;
                                }
                                vec2 o = mix(n, g, 0.2);
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 | 0)); _injected_loop_counter++) {
                                        if (injectionSwitch.x < (m.x)) {
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                        }
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)) || (false)))) {
                                                if (_GLF_DEAD(false)) {
                                                    for (int _injected_loop_counter = (0 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                        return vec2(1.0, 1.0);
                                                    }
                                                }
                                                _GLF_color = ((-5.8) - vec4(9819.9747, 75.27, 57.88, 4591.8219));
                                            }
                                            int k = 1;
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                while (k >= 0) {
                                                    o = o + o;
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            return vec2(1.0, 1.0);
                                                        }
                                                        return vec2(1.0, 1.0);
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            return vec2(1.0, 1.0);
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            do {
                                                                _GLF_color = vec4(7.8, -683.574, 6.5, -1691.9992);
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        return vec2(1.0, 1.0);
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                } else {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                        discard;
                                                                    }
                                                                }
                                                                _GLF_color = _GLF_color;
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    break;
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                                    discard;
                                                                    if (_GLF_DEAD(false)) {
                                                                        return vec2(1.0, 1.0);
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    return vec2(1.0, 1.0);
                                                                }
                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        do {
                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                discard;
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
                                                                        break;
                                                                    }
                                                                } else {
                                                                    discard;
                                                                }
                                                            }
                                                            discard;
                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((((1 << _GLF_IDENTITY(int(5), int(5))) >> _GLF_IDENTITY(int(5), int(5))) << _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), max(int(4), _GLF_IDENTITY(int(4), ~(~(int(4)))))))) >> _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), ~(~(int(4))))))); _injected_loop_counter++) {
                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = _GLF_color;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        do {
                                                            if (_GLF_DEAD(false)) {
                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter--) {
                                                                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                        _GLF_color = vec4(4.2, -6.7, -2.3, 179.497);
                                                                        if (_GLF_DEAD(false)) {
                                                                            continue;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                                            continue;
                                                        }
                                                        break;
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            discard;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    k--;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))) & _GLF_IDENTITY(1, (1) - 0))); _injected_loop_counter++) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            } else {
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter++) {
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(29.00, 25.78, 73.36, 182.423);
                                                        }
                                                        m = _GLF_outlined_0(injectionSwitch, o);
                                                    }
                                                }
                                            } else {
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(false)) {
                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                            return vec2(1.0, 1.0);
                                                        }
                                                    }
                                                } else {
                                                }
                                                continue;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    _GLF_color = vec4(-8449.5546, -5.0, -9.4, -574.894);
                }
            }
            if (_GLF_DEAD(false)) {
                do {
                    _GLF_color = vec4(115.233, 4.2, -7.7, 2.1);
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(false)) {
                    continue;
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                break;
            }
        } while (_GLF_WRAPPED_LOOP(false));
    } else {
    }
    if (_GLF_DEAD(false)) {
        do {
            if (_GLF_DEAD(false)) {
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                    return vec2(1.0, 1.0);
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
        return vec2(1.0, 1.0);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
            _GLF_color = (_GLF_color + _GLF_color);
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_DEAD(false)) {
            _GLF_color = ((-31.53) / clamp(vec4(89.39, -120.204, -8193.6249, 6590.6452), -9.5, sign(6049.7965)));
        }
        if (_GLF_DEAD(false)) {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 ^ int(_GLF_ZERO(0.0, injectionSwitch.x)))); _injected_loop_counter++) {
                _GLF_color = exp2(_GLF_color);
            }
        }
    } else {
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            return vec2(1.0, 1.0);
        } else {
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = dFdxFine(_GLF_color);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                        return vec2(1.0, 1.0);
                    }
                    _GLF_color = mix(vec4(113.003, 74.81, 56.05, 5.8), vec4(-8.4, -9.3, 0.3, 611.213), _GLF_color);
                }
            }
            _GLF_color = vec4(-59.63, 6365.7645, 994.787, -5575.4700);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec2(1.0, 1.0);
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                for (int _injected_loop_counter = (1 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    return vec2(1.0, 1.0);
                }
            }
            if (_GLF_DEAD(false)) {
                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                    _GLF_color = _GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(!(false))))) {
            } else {
                return vec2(1.0, 1.0);
            }
        }
    } else {
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
            _GLF_color = (_GLF_color - 77.93);
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))))))) {
                return vec2(1.0, 1.0);
            }
            _GLF_color = sin(vec4(811.295, 18.87, -9.4, -8.5));
        }
        do {
            return vec2(1.0, 1.0);
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
        for (int _injected_loop_counter = _GLF_IDENTITY(((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0))), (true ? ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0))) : _GLF_FUZZED(31936))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ZERO(0.0, injectionSwitch.x)) & 78194)); _injected_loop_counter--) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec2(1.0, 1.0);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            return vec2(1.0, 1.0);
                        }
                    }
                    return vec2(1.0, 1.0);
                } else {
                }
            } else {
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
        return vec2(1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
        _GLF_color = vec4(3.2, 66.22, -7877.4846, 739.369);
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        } else {
            return vec2(1.0, 1.0);
        }
    }
    return vec2(m.x, m.y - m.z);
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_DEAD(false)) {
            do {
                return vec2(1.0, 1.0);
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        return vec2(1.0, 1.0);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            do {
                                return vec2(1.0, 1.0);
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                        }
                        _GLF_color = cos(vec4(-286.667, -9.2, 501.424, -14.68));
                    }
                    do {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            do {
                                _GLF_color = _GLF_color;
                            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, (false) || false)));
                        } else {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0))))))) {
                        _GLF_color = vec4(81.61, -13.57, -201.832, -1303.1099);
                    }
                    if (_GLF_DEAD(false)) {
                        return vec2(1.0, 1.0);
                    }
                    if (_GLF_DEAD(false)) {
                        do {
                            return vec2(1.0, 1.0);
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x)))));
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
            } else {
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return vec2(1.0, 1.0);
                }
                _GLF_color = vec4(61.30, 59.30, -4430.9281, 91.66);
            }
        } else {
        }
    } else {
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = (_GLF_color + fwidthFine(vec4(6551.1041, 3631.5285, -972.123, 617.912)));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec2(1.0, 1.0);
        }
    }
    if (_GLF_DEAD(false)) {
        return vec2(1.0, 1.0);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                return vec2(1.0, 1.0);
            } else {
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec2(1.0, 1.0);
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = abs(vec4(-495.952, 59.96, 8.8, -78.96));
            }
            if (_GLF_DEAD(false)) {
                do {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    for (int _injected_loop_counter = (0 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                return vec2(1.0, 1.0);
                            }
                            if (_GLF_DEAD(false)) {
                                return vec2(1.0, 1.0);
                            }
                            _GLF_color = _GLF_color;
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = _GLF_color;
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(ivec4(int(3), 0, 1, 0)), (false ? _GLF_FUZZED(13293) : int(ivec4(int(3), 0, 1, 0)))))))); _injected_loop_counter++) {
                            _GLF_color = _GLF_color;
                        }
                    }
                } else {
                }
            }
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
        } else {
        }
    }
}

vec4 _GLF_outlined_1(vec3 col) {
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        return vec4(col, 1.0);
    } else {
    }
    do {
        if (_GLF_DEAD(false)) {
            return vec4(1.0, 1.0, 1.0, 1.0);
        }
    } while (_GLF_WRAPPED_LOOP(false));
}

void main() {
    vec4 GLF_merged2_0_2_1_2_2_2cuv;
    vec2 uv = gl_FragCoord.xy / resolution.y;
    do {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true))) {
                    continue;
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            do {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(680.209, 14.94, -0.7, -8.7);
                                    }
                                    _GLF_color = asin(vec4(3.1, 830.981, -9.5, -7.9));
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            continue;
                        }
                        _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(false)) {
                            do {
                                _GLF_color = vec4(-94.89, 35.93, 48.69, -680.252);
                            } while (_GLF_WRAPPED_LOOP(false));
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                    _GLF_color = (GLF_merged2_0_2_1_2_2_2cuv / (-97.38));
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                    }
                } else {
                    GLF_merged2_0_2_1_2_2_2cuv.zw = uv;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    _GLF_color = degrees(vec4(2352.2580, 1.6, 9206.8375, 95.14));
                }
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
    float A[50];
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_DEAD(false)) {
            _GLF_color = dFdxFine(_GLF_color);
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                do {
                    _GLF_color = trunc(vec4(-73.06, 72.84, -5.5, 2.9));
                } while (_GLF_WRAPPED_LOOP(false));
            }
            do {
                return;
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
        }
    }
    if (_GLF_DEAD(false)) {
        do {
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0))))))) {
                        discard;
                    }
                }
            }
            return;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                for (int _injected_loop_counter = (33545 & 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                    discard;
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            return;
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            } else {
                do {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                }
                                _GLF_color = (-atanh(_GLF_color));
                            }
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                return;
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = mod(GLF_merged2_0_2_1_2_2_2cuv, -30.96);
                                } else {
                                }
                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = (_GLF_color / vec4(98.82, -1.4, -3.0, 823.758));
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                return;
                                            } else {
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
            }
        }
    } else {
    }
    for (int i = 0; i < 200; i++) {
        if (_GLF_DEAD(false)) {
            discard;
        }
        if (i >= int(resolution.x)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    break;
                }
                break;
            }
            break;
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    return;
                } else {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                } else {
                    do {
                        _GLF_color = intBitsToFloat(sign(ivec4(61031, -78874, -96425, -26220)));
                    } while (_GLF_WRAPPED_LOOP(false));
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    break;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            continue;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = max(GLF_merged2_0_2_1_2_2_2cuv, cos(_GLF_color));
                }
                return;
            }
        } else {
        }
        if ((4 * (i / 4)) == i) {
            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = vec4(-3.4, -2603.6396, -9.3, 5440.0676);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0)), 1.0, 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0)), 1.0, 0.0))))))) {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 0.0, 0.0)), dot(vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 0.0, 0.0))))))) {
                    } else {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                return;
                            }
                        }
                    }
                    discard;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = atan(vec4(422.102, 6.5, -4571.1431, 6152.0699), min(GLF_merged2_0_2_1_2_2_2cuv, 863.459));
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                }
                discard;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                    _GLF_color = round(vec4(-5687.2872, 3.1, 93.15, 2.2));
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
            }
            A[i / 4] = float(i);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            continue;
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = tan(_GLF_color);
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = tan(_GLF_color);
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    return;
                }
            }
            if (_GLF_DEAD(false)) {
                discard;
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            break;
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            do {
                return;
            } while (_GLF_WRAPPED_LOOP(false));
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                    return;
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    _GLF_color = vec4(-48.54, 611.494, -7669.3098, 77.13);
                }
            }
        } else {
        }
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                do {
                    _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
            }
        } while (_GLF_WRAPPED_LOOP(false));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(abs(0.0)))))) {
            return;
        }
        return;
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
        } else {
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    return;
                }
            }
        } else {
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = (-vec4(-427.021, 7.6, 868.357, 4.7));
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            do {
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return;
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = log(GLF_merged2_0_2_1_2_2_2cuv);
                                } else {
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_color;
                            } else {
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                    do {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(!(false))))) {
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = (mat3x4(7254.8548, 567.338, 6205.1095, 2.3, -481.451, -1776.2488, -325.252, 3107.3769, -82.20, -1.0, 9.7, -13.98) * vec3(6.9, 1.2, -6528.0748));
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                            return;
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        return;
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    do {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = mat3x4(-5561.1129, 7170.8322, 6324.9705, 92.00, 5.2, -9737.9873, -3.8, 9.5, 8.3, 8246.5070, 7154.7540, 22.70)[2];
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                } else {
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                        do {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                }
                _GLF_color = min(_GLF_color, mix(_GLF_color, vec4(9.7, -2.4, 8909.0932, 1.4), _GLF_color));
            }
        } else {
        }
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                return;
            } else {
            }
        }
        return;
        if (_GLF_DEAD(false)) {
            return;
            if (_GLF_DEAD(false)) {
                return;
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = mat4(-17.63, -7679.2116, 0.6, -4.5, 8.4, 1.5, 8551.0852, -817.337, 37.03, -3.2, 555.545, 5684.1915, -1485.4414, -9372.4821, 9.8, 928.287)[1];
    }
    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            for (int i = 0; i < 50; i++) {
                if (i < int(gl_FragCoord.x)) {
                    break;
                    do {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                            if (_GLF_DEAD(false)) {
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                    return;
                                }
                            }
                            discard;
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0))))));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return;
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                do {
                                    return;
                                } while (_GLF_WRAPPED_LOOP(false));
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = (-vec4(-8.4, -9.9, -7.2, 819.336));
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(-469.077, 72.52, 2.1, -5.8);
                                    }
                                    _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                            } else {
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = unpackSnorm4x8(163421u);
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = vec4(0.3, -5915.4589, 2722.2072, 2.2);
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    continue;
                                }
                            }
                            _GLF_color = vec4(6809.4536, 4.0, -5.4, 916.474);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                            discard;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                do {
                                    _GLF_color = vec4(7807.0588, -1.8, 92.66, -538.492);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        break;
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        discard;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                        discard;
                    }
                }
                if (_GLF_DEAD(false)) {
                    do {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(1.0, -2952.1914, 53.35, -7790.6775);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                } else {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        return;
                                    }
                                }
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = round(_GLF_color);
                        } else {
                        }
                    } else {
                    }
                }
                if (i > 0) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(-371.897, -3.3, -0.6, 783.910);
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = abs(_GLF_color);
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                    } else {
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            do {
                                _GLF_color = _GLF_color;
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            do {
                                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                        }
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                            }
                            discard;
                        }
                        A[i] += A[i - 1];
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(1.0, 961.826, -9.0, 9.3);
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        continue;
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        discard;
                                    }
                                }
                                _GLF_color = _GLF_color;
                            }
                        } else {
                        }
                    }
                }
            }
            do {
                if (_GLF_DEAD(false)) {
                    return;
                }
            } while (_GLF_WRAPPED_LOOP(false));
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(5), int(5))) >> _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), max(int(5), int(5)))))); _injected_loop_counter++) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
            }
        } else {
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (false) || false))) {
        } else {
            return;
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                return;
            }
            _GLF_color = cos(vec4(-1749.8045, -61.51, 46.38, -683.692));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                do {
                    return;
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    return;
                }
            } else {
                return;
            }
        }
    }
    vec2 c = pattern((15.0 + tan(0.2)) * GLF_merged2_0_2_1_2_2_2cuv.zw);
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
        }
        for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7))); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(0), int(0)))); _injected_loop_counter--) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            } else {
                return;
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 ^ 0)); _injected_loop_counter--) {
                            return;
                        }
                    }
                } else {
                }
            }
        }
        GLF_merged2_0_2_1_2_2_2cuv.xy = c;
        if (_GLF_DEAD(false)) {
            do {
                if (_GLF_DEAD(false)) {
                    _GLF_color = exp(GLF_merged2_0_2_1_2_2_2cuv);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = fma(GLF_merged2_0_2_1_2_2_2cuv, (ivec4(43713, 60089, 3422, -43443), GLF_merged2_0_2_1_2_2_2cuv), mat2x4(90.66, 0.9, -16.73, -51.01, 724.060, 446.559, -334.516, -5883.0611)[1]);
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
            return;
            do {
                if (_GLF_DEAD(false)) {
                    return;
                    do {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = dFdxCoarse(floor((-3308.8587, _GLF_color)));
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                        } else {
                        }
                    } else {
                    }
                }
            } else {
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            do {
                _GLF_color = atanh(GLF_merged2_0_2_1_2_2_2cuv);
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(0.0, 1.0, 1.0), vec3(1.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0)), dot(vec3(0.0, 1.0, 1.0), vec3(1.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0))))))) {
            } else {
                _GLF_color = _GLF_color;
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                return;
            }
            _GLF_color = clamp(_GLF_color, -25.78, 6.5);
            if (_GLF_DEAD(false)) {
                return;
            }
        }
    } else {
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            do {
                if (_GLF_DEAD(false)) {
                    continue;
                }
                for (int _injected_loop_counter = ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    _GLF_color = vec4(-5.8, -2459.8208, 1698.4977, 23.60);
                    if (_GLF_DEAD(false)) {
                        do {
                            _GLF_color = _GLF_color;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        break;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
        } else {
        }
        if (_GLF_DEAD(false)) {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                return;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        return;
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        } else {
            return;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        } else {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    do {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
            } else {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                } else {
                    _GLF_color = _GLF_color;
                }
            }
        }
    }
    do {
        if (_GLF_DEAD(false)) {
            do {
                return;
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
        }
    } while (_GLF_WRAPPED_LOOP(false));
    vec3 col;
    if (int(gl_FragCoord.y) < 20) {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & 1)); _injected_loop_counter++) {
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
            } else {
                return;
            }
        }
        for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY(1, clamp(1, 1, 1))); _injected_loop_counter++) {
            if (_GLF_DEAD(false)) {
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter++) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-5251.7632, -2.1, -96.24, -631.572);
                    }
                }
                continue;
            }
            col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0));
        }
        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(length(vec3(0.0, 0.0, 0.0))))))) {
                for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                }
            } else {
            }
        }
    } else {
        do {
            if (_GLF_DEAD(false)) {
                _GLF_color = uintBitsToFloat(uvec4(102343u, 10847u, 9026u, 195241u));
            }
        } while (_GLF_WRAPPED_LOOP(false));
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    return;
                } else {
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
        }
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            if (int(gl_FragCoord.y) < 40) {
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = cosh(_GLF_color);
                    }
                } else {
                }
                col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[9] / resolution.x + 50.0, 22.0));
                if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) || (false)))) {
                    _GLF_color = round((+_GLF_color));
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        do {
                            _GLF_color = vec4(2.8, 58.57, -5448.7866, 51.48);
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    }
                } else {
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                            _GLF_color = vec4(-797.467, 9.3, -4.7, -7.6);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            do {
                                return;
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                            } else {
                                _GLF_color = dFdy(col.ggbb);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            continue;
                        }
                    }
                    _GLF_color = _GLF_color;
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (resolution * matrixCompMult(mat4x2(4.7, 97.85, -0.1, -5.9, -6190.0794, -47.63, -0.6, -6407.2042), mat4x2(1.4, 2568.5016, -87.84, 9914.0733, 3.8, -4.7, -33.15, -8.9)));
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            discard;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0))))))) {
                                _GLF_color = normalize(GLF_merged2_0_2_1_2_2_2cuv);
                            }
                        }
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            do {
                                _GLF_color = max((+GLF_merged2_0_2_1_2_2_2cuv), -2.3);
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(15.99, -8.3, -7490.5303, 1.3);
                    }
                    return;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = intBitsToFloat(ivec4(46306, -60410, -23544, -84296));
                    } else {
                    }
                }
                if (int(gl_FragCoord.y) < 60) {
                    do {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            break;
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))), false || (_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))))) {
                            _GLF_color = (false ? _GLF_color : _GLF_color);
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                    return;
                                }
                            } else {
                            }
                        } else {
                        }
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = (dFdxCoarse(vec3(-48.76, -7010.5467, 5612.3354)).bbbb + vec4(-9.4, -55.48, -289.169, -8.1));
                                } else {
                                }
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = (((-350.975) - mat3x4(70.87, 0.3, 7712.3300, 4772.6591, 8.9, -1.3, 77.46, 852.020, -2.8, 0.0, 8.9, -2198.3669)) * vec3(-8.6, 87.63, 87.65));
                        } else {
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = vec4(-95.41, 4.2, 6151.3373, -1.3);
                            } else {
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                    if (int(gl_FragCoord.y) < 80) {
                        do {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                } else {
                                    discard;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = min(vec4(1899.8366, 529.040, -8882.7915, -4.5), GLF_merged2_0_2_1_2_2_2cuv);
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (_GLF_color + min(-27.64, -1125.8971));
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = vec4((resolution / c), -2.5, -1.7);
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = vec4(vec3(-4.0, 499.853, 0.5), 375.909);
                                        }
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = asinh(vec4(63.67, -7.9, -9.4, 6033.8924));
                                                } else {
                                                }
                                            }
                                        }
                                        return;
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = vec4(-63.28, -60.06, -629.305, -5.4);
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    return;
                                                } else {
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 1)); _injected_loop_counter++) {
                                                _GLF_color = _GLF_color;
                                            }
                                        }
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                            _GLF_color = mod(min(GLF_merged2_0_2_1_2_2_2cuv, 2.2), 4804.0953);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        discard;
                                                    }
                                                } else {
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = vec4(349.000, 28.22, 18.16, -7.6);
                                            }
                                            break;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = vec4(-5.2, 13.49, -8279.9907, 799.007);
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                discard;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                }
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            do {
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    return;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                    }
                                }
                            } else {
                            }
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = faceforward(GLF_merged2_0_2_1_2_2_2cuv, GLF_merged2_0_2_1_2_2_2cuv, vec4(-3.3, -1525.3476, 899.509, -1.5));
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = refract((GLF_merged2_0_2_1_2_2_2cuv * mat4(-8483.1369, -2.0, 3.0, 952.272, 8.2, -8.8, 8082.7367, 184.435, -5.9, -86.50, -45.69, 7.4, 7.3, -9.4, 4534.7081, -351.712)), vec4(9.3, 38.05, -4.5, 748.034), -5181.8075);
                            }
                            _GLF_color = ((-3.3) + GLF_merged2_0_2_1_2_2_2cuv);
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 | 1)); _injected_loop_counter++) {
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, cos(0.0))), dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, cos(0.0)))))))) {
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = vec4(11.72, 784.364, 41.63, -7.6);
                                }
                                _GLF_color = vec4(69.59, -44.41, 43.20, 730.257);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = ldexp(GLF_merged2_0_2_1_2_2_2cuv, (uvec3(124822u, 158657u, 56459u), ivec4(-46015, 29333, 84082, 98367)));
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false || (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))) {
                            discard;
                        }
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            break;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            break;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    do {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_color;
                                        } else {
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            break;
                        }
                        if (int(gl_FragCoord.y) < 100) {
                            do {
                                do {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            break;
                                        }
                                        _GLF_color = vec4(725.693, 9.3, 22.43, -9.8);
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        do {
                                            _GLF_color = vec4(1.3, 2955.9501, -401.296, 7790.3143);
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    }
                                }
                                do {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                            for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (((1 & ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0)))) << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter++) {
                                                _GLF_color = asin(_GLF_color);
                                            }
                                        }
                                    }
                                    break;
                                }
                                continue;
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = smoothstep(_GLF_color, exp2(vec4(713.832, 8.4, -672.200, 17.50)), asin(GLF_merged2_0_2_1_2_2_2cuv));
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        discard;
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, length(vec2(0.0, 0.0)))))))) {
                                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    discard;
                                }
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                } else {
                                    col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    do {
                                        return;
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                        } else if (int(gl_FragCoord.y) < 120) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                } else {
                                    _GLF_color = round(_GLF_color);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = normalize(_GLF_color);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                    continue;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = roundEven(_GLF_color);
                                }
                            } else {
                            }
                            for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 0)); _injected_loop_counter--) {
                                col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                discard;
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    return;
                                }
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = sinh(vec4(-8.2, 5473.3539, 1577.3310, 6.8));
                                    }
                                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                        _GLF_color = vec4(-611.201, 7.5, -713.786, 9.1);
                                    }
                                }
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (int(gl_FragCoord.y) < 140) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                    for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | 0)); _injected_loop_counter--) {
                                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                            if (_GLF_DEAD(false)) {
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), (int(2)) << 0)))); _injected_loop_counter--) {
                                                    _GLF_color = vec4(vec3(-0.6, 833.545, 1.6), 2.3);
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            if (_GLF_DEAD(false)) {
                                                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((int(true) & 0) >> _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter--) {
                                                    discard;
                                                }
                                            }
                                            col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                        } else {
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            if (_GLF_DEAD(false)) {
                                                for (int _injected_loop_counter = (int(_GLF_ZERO(0.0, injectionSwitch.x)) >> _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            }
                                        } else {
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = pow(GLF_merged2_0_2_1_2_2_2cuv, vec4(7.4, 1.3, -1.4, 479.511));
                                }
                            } else if (int(gl_FragCoord.y) < 160) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = atan(vec4(-5.9, 73.24, -2862.2490, -766.741));
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    do {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ 0)); _injected_loop_counter--) {
                                            return;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            break;
                                        }
                                        _GLF_color = _GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                            } else {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                for (int _injected_loop_counter = (2876 & (int(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(int(2), int(2)))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))))) {
                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                            } else {
                                                            }
                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    discard;
                                                                }
                                                            }
                                                            return;
                                                        }
                                                    } else {
                                                    }
                                                    _GLF_color = fwidthCoarse(GLF_merged2_0_2_1_2_2_2cuv);
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(-8717.9898, -2.9, 4.3, 4.6);
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                            }
                                            discard;
                                        }
                                    }
                                }
                                if (int(gl_FragCoord.y) < 180) {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                discard;
                                            } else {
                                            }
                                        }
                                        _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                            _GLF_color = col.yzyx;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter++) {
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                            }
                                            discard;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        return;
                                                    }
                                                }
                                            }
                                            continue;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                        }
                                        continue;
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter++) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                discard;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY((0 << _GLF_IDENTITY(int(5), int(5))), ((0 << _GLF_IDENTITY(int(5), int(5)))) ^ 0)); _injected_loop_counter--) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                break;
                                            }
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, false || (_GLF_IDENTITY(false, !(!(false))))))) {
                                                discard;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[44] / resolution.x + 50.0, 22.0));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                _GLF_color = vec4(-9417.2677, col);
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                break;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                discard;
                                            }
                                        } else {
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    break;
                                                }
                                                continue;
                                            }
                                            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), bool(bool(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))) {
                                                _GLF_color = vec4(44.77, -3756.7878, 93.26, 197.363);
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))))))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    continue;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, 0.0, tan(0.0), 0.0, _GLF_IDENTITY(dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0))), 1.0, 1.0, 0.0)))))) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                discard;
                                            } else {
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(false)) {
                                                return;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = vec4(-1.0, 180.909, -0.7, 426.295);
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    for (int _injected_loop_counter = ((0 | 0) >> _GLF_IDENTITY(int(0), int(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter++) {
                                                        _GLF_color = vec4(2131.8862, -304.849, -2.8, 4611.4564);
                                                    }
                                                }
                                            }
                                        } else {
                                        }
                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
                                            do {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        return;
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                    }
                                                } else {
                                                }
                                                _GLF_color = refract(_GLF_color, vec4(-8166.7996, 4873.3445, 4.3, -4927.6842), atan(4.3, 6.5));
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = (-vec4(7918.2834, 848.098, -5.4, 324.156));
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(3.6, -7397.3532, 704.038, 1.8);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = trunc(_GLF_color);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (determinant(mat2(3.5, -36.64, -0.7, -265.204)) / GLF_merged2_0_2_1_2_2_2cuv);
                                        }
                                    }
                                } else {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bool(true))))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                            do {
                                                discard;
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                } else {
                                                    _GLF_color = step(_GLF_color, vec4(4.9, ldexp(-0.8, -53946), -871.942, -3.4));
                                                }
                                            }
                                        }
                                    } else {
                                    }
                                    if (int(gl_FragCoord.y) < 200) {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[49] / resolution.x + 50.0, 22.0));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = (true ? GLF_merged2_0_2_1_2_2_2cuv : vec4(-779.601, -8796.0751, 66.07, -831.608));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    break;
                                                }
                                            }
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    do {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            } else {
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        discard;
                                                                    }
                                                                    do {
                                                                        discard;
                                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0)))));
                                                                }
                                                            }
                                                            do {
                                                                _GLF_color = vec4(resolution, length(-2.4), dFdyCoarse(-3383.3231));
                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                } else {
                                                                    do {
                                                                        if (_GLF_DEAD(false)) {
                                                                            return;
                                                                        }
                                                                        do {
                                                                            if (_GLF_DEAD(false)) {
                                                                                if (_GLF_DEAD(false)) {
                                                                                    _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                                                                }
                                                                                do {
                                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                                                                        do {
                                                                                            discard;
                                                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                                                    }
                                                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                                return;
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                }
                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = fwidthFine(vec4(98.66, 13.42, -2.5, 647.033));
                                                                    }
                                                                }
                                                                _GLF_color = fwidthFine(_GLF_color);
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    continue;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            _GLF_color = vec4(-67.43, 4737.3355, 1.9, -8449.3444);
                                                                        }
                                                                    }
                                                                    do {
                                                                        if (_GLF_DEAD(false)) {
                                                                            discard;
                                                                        }
                                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                    discard;
                                                                }
                                                            }
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = dFdy(vec4(-6.4, 782.727, -84.17, -51.02));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        continue;
                                                    }
                                                }
                                                break;
                                            }
                                        } else {
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                                }
                                                do {
                                                    _GLF_color = tanh((sqrt(GLF_merged2_0_2_1_2_2_2cuv) / _GLF_color));
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        continue;
                                                        do {
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            } else {
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        do {
                                                                            do {
                                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(0, (false ? _GLF_FUZZED(-70315) : 0))); _injected_loop_counter--) {
                                                                                    discard;
                                                                                }
                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                                    }
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                    }
                                                    do {
                                                        _GLF_color = vec4(-31.65, 29.05, 58.14, -38.60);
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                        do {
                                                            return;
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                        if (_GLF_DEAD(false)) {
                                                            do {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    do {
                                                                        if (_GLF_DEAD(false)) {
                                                                            return;
                                                                        }
                                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 1.0, 0.0, 0.0))))));
                                                                    _GLF_color = tanh((vec4(-4.5, -5559.3840, 6.4, 8.6) + abs(vec4(7.5, 36.40, -1.6, 616.568))));
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = vec4(9076.4922, -8.6, -6.2, -8.9);
                                                                    }
                                                                    return;
                                                                    if (_GLF_DEAD(false)) {
                                                                        continue;
                                                                    }
                                                                }
                                                                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                        }
                                                    }
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = ((+mat3x4(-74.94, -3.5, 481.286, -6.1, -6.4, -6.5, 6856.5873, -442.113, 7.6, -8701.2814, 259.933, -9395.8864)) * col);
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            do {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    return;
                                                                }
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0)))));
                                                        } else {
                                                        }
                                                    } else {
                                                    }
                                                    break;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                                        continue;
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), (!(false)) && true))))) {
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            _GLF_color = vec4(7.7, -2.9, 8.6, -420.053);
                                                        }
                                                    }
                                                } else {
                                                }
                                                _GLF_color = vec4(-69.46, 68.79, -98.12, 9.6);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = vec4(-4.8, tan(-6491.6388), unpackHalf2x16(73701u));
                                                }
                                                break;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            } else {
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    } else {
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(false)) {
                                                                discard;
                                                            }
                                                            discard;
                                                        }
                                                    }
                                                } else {
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0)))); _injected_loop_counter++) {
                                                        _GLF_color = ((-8.4) - vec4(-56.51, 50.46, -93.45, -144.696));
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = refract(vec4(-516.167, 6.2, 1.4, 5.9), log2(vec4(-239.203, 1818.2134, -687.729, -3.7)), length(vec3(782.991, 2.6, 8.9)));
                                                    }
                                                }
                                                continue;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                    _GLF_color = uintBitsToFloat((uvec4(178235u, 78897u, 161111u, 90549u) + 43223u));
                                                }
                                            }
                                        }
                                    } else {
                                        do {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            discard;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    }
                                }
                                do {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            do {
                                _GLF_color = _GLF_color;
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                } else {
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        do {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                return;
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    }
                                    _GLF_color = vec4(-431.120, -1837.2441, 59.67, -865.607);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                    discard;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_color;
                                        } else {
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                            }
                                        }
                                    }
                                    discard;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    discard;
                                } else {
                                }
                            }
                        } else {
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                discard;
                            }
                            continue;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, (1) | (1))); _injected_loop_counter++) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = round((_GLF_color));
                            } else {
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                        return;
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    continue;
                }
                do {
                    _GLF_color = _GLF_color;
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                if (_GLF_DEAD(false)) {
                    discard;
                }
                if (_GLF_DEAD(false)) {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                        _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                    }
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                    discard;
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        } else {
            if (_GLF_DEAD(false)) {
                _GLF_color = dFdyCoarse(GLF_merged2_0_2_1_2_2_2cuv);
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = (acosh(-3.8) - _GLF_color);
        }
        if (_GLF_DEAD(false)) {
            return;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(abs(1.0), 0.0), vec2(tan(0.0), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))))), dot(vec2(abs(1.0), 0.0), vec2(tan(0.0), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0)))))))))) {
                return;
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                return;
            } else {
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    return;
                }
            } else {
            }
        }
    }
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
        _GLF_color = _GLF_outlined_1(col);
    }
}
