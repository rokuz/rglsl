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

const int N = 10;
int data[10], temp[10];

void merge(int from, int mid, int to) {
    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                _GLF_color = step(vec4(40.68, 1.3, 4.9, -4397.2532), _GLF_color);
            } else {
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return;
            }
        } else {
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
    }
    int k = from, i = from, j = _GLF_IDENTITY(mid + 1, max(mid + 1, mid + 1));
    do {
        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, false, true, false))))) {
            _GLF_color = unpackUnorm4x8(69756u);
        }
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return;
        }
        _GLF_color = vec4(-6.3, 9.4, -1545.4205, -211.067);
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(sqrt(vec4(0.0, 0.0, 0.0, 0.0))))))) {
        return;
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = floor(floor(vec4(3.1, -4087.0451, 7.5, 5.7)));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = sqrt(vec4(-2452.5497, 38.52, -82.40, 2196.1219));
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                return;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    } else {
        if (_GLF_DEAD(false)) {
            return;
        }
        while (i <= mid && j <= to) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < 0.0), !(!_GLF_IDENTITY(((gl_FragCoord.y < 0.0)), false || (((gl_FragCoord.y < 0.0))))))))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                    continue;
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
            } else {
                if (_GLF_DEAD(false)) {
                    break;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    continue;
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = asinh(refract(vec4(22.56, 2.1, -6.0, 4.9), vec4(689.857, -493.189, 2.6, -1818.7148), 5553.6000));
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            do {
                                discard;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = tanh(_GLF_color);
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                discard;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(0.7, -579.550, -1.5, -206.479);
                }
                if (data[i] < data[j]) {
                    _GLF_IDENTITY(temp[k++] = _GLF_IDENTITY(data[i++], (data[i++]) >> 0), (temp[k++] = _GLF_IDENTITY(data[i++], (data[i++]) >> 0)) ^ 0);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                        break;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                _GLF_color = (_GLF_color + _GLF_color);
                            }
                        }
                    }
                } else {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                discard;
                            }
                            return;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                discard;
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = unpackSnorm4x8(44285u);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return;
                                }
                                _GLF_color = (_GLF_color * (-5.6));
                                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, mix(float(_GLF_FUZZED(-3028.1144)), float(gl_FragCoord.x), bool(true))) < 0.0)))) {
                                    return;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        continue;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            continue;
                        }
                    } else {
                    }
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            discard;
                        }
                        _GLF_IDENTITY(temp[k++] = data[j++], (temp[k++] = data[j++]) * ((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2))));
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-8031.6944, -728.036, -844.853, -83.18);
                        }
                        continue;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                discard;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    continue;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = abs(vec4(-6.6, 9254.1092, -3108.7353, 9.3));
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-465.440, 4.7, 3.9, -670.271);
        }
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    return;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY(1, (_GLF_IDENTITY(1, _GLF_IDENTITY((true ? 1 : _GLF_FUZZED(k)), (_GLF_IDENTITY((true ? 1 : _GLF_FUZZED(k)), int(ivec3((true ? 1 : _GLF_FUZZED(k)), 1, 1)))) | 0))) << 0)); _injected_loop_counter++) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        do {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                                continue;
                            }
                            _GLF_color = vec4(34.58, 7542.0987, 3345.0789, 9.8);
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = vec4(-69.53, 110.285, 2868.6846, 869.300);
                    }
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
        if (_GLF_DEAD(false)) {
            _GLF_color = dFdyCoarse(_GLF_color);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return;
    }
    for (int _injected_loop_counter = (0 & (+N)); _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 ^ 1)); _injected_loop_counter++) {
        if (_GLF_DEAD(false)) {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = vec4(-378.330, 321.288, 8.9, -77.39);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    continue;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    continue;
                }
            } else {
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                    _GLF_color = trunc(vec4(6221.6063, -4.8, -7.3, 7.4));
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                }
                do {
                    discard;
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                continue;
            }
            discard;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = dFdyCoarse(_GLF_color);
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, bool(_GLF_IDENTITY(bvec3(injectionSwitch.x > injectionSwitch.y, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true), bvec3(bvec4(bvec3(injectionSwitch.x > injectionSwitch.y, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true), true))))))))) {
                return;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = cosh(vec4(-90.15, 2.4, 2.7, -8.1));
            }
        } else {
            _GLF_color = round(_GLF_color);
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true && (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) {
                return;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return;
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    while (_GLF_IDENTITY(i < N && i <= mid, !(!(i < N && i <= mid)))) {
        temp[k++] = data[_GLF_IDENTITY(i++, (i++) / 1)];
    }
    if (_GLF_DEAD(false)) {
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                return;
            }
        } while (_GLF_WRAPPED_LOOP(false));
        if (_GLF_DEAD(false)) {
            return;
        }
        _GLF_color = vec4(-8.3, -2954.8620, -1.9, 2.4);
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                do {
                    return;
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = cosh(vec4(-728.182, -8.9, -2.2, 126.603));
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
        } else {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                    return;
                }
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))), false || (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))), !(!(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))), (_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0))))) && true)))))))) {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, true))))) {
                            return;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                _GLF_color = ldexp(vec4(5.6, 6481.9835, -1677.7646, -645.173), ivec4(20262, -3505, -26575, 26116));
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                discard;
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            return;
                        }
                        _GLF_color = vec4(-852.255, -66.13, 502.526, 70.99);
                        if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                            }
                            return;
                        }
                    }
                }
                return;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = sinh(mix(_GLF_color, _GLF_color, _GLF_color));
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            for (int _injected_loop_counter = (0 & N); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                _GLF_color = acos(vec4(1794.9015, -3.1, 2011.3050, 7681.2912));
            }
        }
    } else {
        if (_GLF_DEAD(false)) {
            _GLF_color = intBitsToFloat(ivec4(-85873, 78681, -7866, -45521));
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x)), bool(bvec4(_GLF_IDENTITY(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x)), !(_GLF_IDENTITY(!(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))), bool(bvec2(!(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))), true))))), true, _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))))); _injected_loop_counter--) {
            for (int i = from; i <= to; i++) {
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    continue;
                }
                do {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (_GLF_IDENTITY((0 | int(_GLF_ZERO(0.0, injectionSwitch.x))), 1 * ((0 | int(_GLF_ZERO(0.0, injectionSwitch.x))))) >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter--) {
                            data[i] = _GLF_IDENTITY(temp[i], (temp[i]) | (temp[i]));
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            continue;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = vec4(42.52, -753.527, 639.491, 3.1);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
    }
}

void mergeSort() {
    if (_GLF_DEAD(false)) {
        return;
    }
    int low = 0;
    int high = _GLF_IDENTITY(N - 1, (_GLF_IDENTITY(N - 1, int(ivec2(N - 1, (0 << _GLF_IDENTITY(int(0), int(0))))))) | (N - 1));
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
        for (int m = 1; m <= high; m = 2 * m) {
            if (_GLF_DEAD(false)) {
                continue;
            }
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                if (_GLF_DEAD(false)) {
                    break;
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(_GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, abs(0.0))), _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, abs(0.0))), (true ? _GLF_IDENTITY(dot(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), min(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), (vec4(0.0, 1.0, 0.0, 1.0)) - vec4(0.0, 0.0, 0.0, 0.0)), vec4(0.0, 1.0, 0.0, 1.0))), vec4(1.0, 0.0, 1.0, abs(0.0))), float(mat4x2(dot(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), min(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), (vec4(0.0, 1.0, 0.0, 1.0)) - vec4(0.0, 0.0, 0.0, 0.0)), vec4(0.0, 1.0, 0.0, 1.0))), vec4(1.0, 0.0, 1.0, abs(0.0))), 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, log(1.0)))) : _GLF_FUZZED(2.2)))), (_GLF_IDENTITY(_GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, abs(0.0))), _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, abs(0.0))), (true ? _GLF_IDENTITY(dot(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), min(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), (vec4(0.0, 1.0, 0.0, 1.0)) - vec4(0.0, 0.0, 0.0, 0.0)), vec4(0.0, 1.0, 0.0, 1.0))), vec4(1.0, 0.0, 1.0, abs(0.0))), float(mat4x2(dot(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), min(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), (vec4(0.0, 1.0, 0.0, 1.0)) - vec4(0.0, 0.0, 0.0, 0.0)), vec4(0.0, 1.0, 0.0, 1.0))), vec4(1.0, 0.0, 1.0, abs(0.0))), 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, log(1.0)))) : _GLF_FUZZED(2.2)))), max(_GLF_IDENTITY(_GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, abs(0.0))), _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, abs(0.0))), (true ? _GLF_IDENTITY(dot(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), min(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), (vec4(0.0, 1.0, 0.0, 1.0)) - vec4(0.0, 0.0, 0.0, 0.0)), vec4(0.0, 1.0, 0.0, 1.0))), vec4(1.0, 0.0, 1.0, abs(0.0))), float(mat4x2(dot(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), min(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), (vec4(0.0, 1.0, 0.0, 1.0)) - vec4(0.0, 0.0, 0.0, 0.0)), vec4(0.0, 1.0, 0.0, 1.0))), vec4(1.0, 0.0, 1.0, abs(0.0))), 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, log(1.0)))) : _GLF_FUZZED(2.2)))), mix(float(_GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, abs(0.0))), _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, abs(0.0))), (true ? _GLF_IDENTITY(dot(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), min(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), (vec4(0.0, 1.0, 0.0, 1.0)) - vec4(0.0, 0.0, 0.0, 0.0)), vec4(0.0, 1.0, 0.0, 1.0))), vec4(1.0, 0.0, 1.0, abs(0.0))), float(mat4x2(dot(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), min(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), _GLF_IDENTITY((vec4(0.0, 1.0, 0.0, 1.0)) - vec4(0.0, 0.0, 0.0, 0.0), ((vec4(0.0, 1.0, 0.0, 1.0)) - vec4(0.0, 0.0, 0.0, 0.0)) / vec4(1.0, 1.0, 1.0, 1.0))), vec4(0.0, 1.0, 0.0, 1.0))), vec4(1.0, 0.0, 1.0, abs(0.0))), 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, log(1.0)))) : _GLF_FUZZED(_GLF_IDENTITY(2.2, mix(float(_GLF_FUZZED(-64.98)), float(_GLF_IDENTITY(2.2, max(2.2, 2.2))), bool(true)))))))), float(_GLF_FUZZED(1245.9168)), bool(false))), _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, abs(0.0))), _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, abs(0.0))), (true ? _GLF_IDENTITY(dot(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), min(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), (vec4(0.0, 1.0, 0.0, 1.0)) - vec4(0.0, 0.0, 0.0, 0.0)), vec4(0.0, 1.0, 0.0, 1.0))), vec4(1.0, 0.0, 1.0, abs(0.0))), float(mat4x2(dot(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), min(_GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), (vec4(0.0, 1.0, 0.0, 1.0)) - vec4(0.0, 0.0, 0.0, 0.0)), vec4(0.0, 1.0, 0.0, 1.0))), vec4(1.0, 0.0, 1.0, abs(0.0))), 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, log(1.0)))) : _GLF_FUZZED(2.2))))))) + determinant(mat2(0.0, 0.0, 1.0, 0.0))))))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    break;
                                }
                                _GLF_color = log(_GLF_color);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    break;
                                }
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                            }
                        }
                        return;
                    }
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        break;
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return;
                        }
                        for (int i = low; _GLF_IDENTITY(_GLF_IDENTITY(i, (_GLF_IDENTITY(_GLF_IDENTITY(i, _GLF_IDENTITY((i) >> (0 & N), ((i) >> (0 & N)) >> 0)), int(ivec4(_GLF_IDENTITY(_GLF_IDENTITY(i, _GLF_IDENTITY((i) >> (0 & N), ((i) >> (0 & N)) >> 0)), (_GLF_IDENTITY(i, _GLF_IDENTITY((i) >> (0 & N), _GLF_IDENTITY(((i) >> (0 & N)), (((i) >> (0 & N))) | (((i) >> (0 & N)))) >> 0))) ^ 0), 0, 0, 1)))) ^ 0) < high, (_GLF_IDENTITY(i, (_GLF_IDENTITY(_GLF_IDENTITY(i, _GLF_IDENTITY((i) >> (0 & N), ((i) >> (0 & N)) >> 0)), int(ivec4(_GLF_IDENTITY(_GLF_IDENTITY(i, _GLF_IDENTITY((i) >> (0 & N), ((i) >> (0 & N)) >> 0)), (_GLF_IDENTITY(i, _GLF_IDENTITY((i) >> (0 & N), _GLF_IDENTITY(((i) >> (0 & N)), (((i) >> (0 & N))) | (((i) >> (0 & N)))) >> 0))) ^ 0), 0, 0, 1)))) ^ 0) < high) || false); i += 2 * m) {
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            int from = i;
                            int mid = i + m - 1;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        _GLF_color = vec4(995.957, -3239.9526, -3247.3484, 5.5);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = _GLF_color;
                                        }
                                    }
                                } else {
                                }
                            }
                            int to = min(i + 2 * m - 1, _GLF_IDENTITY(_GLF_IDENTITY(high, int(ivec2(high, 0))), (_GLF_IDENTITY(high, int(ivec2(high, 0)))) ^ (0 << _GLF_IDENTITY(int(1), int(1)))));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        discard;
                                    }
                                    _GLF_color = vec4(-8.4, 8234.9276, -1.8, 2.5);
                                }
                                return;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, (injectionSwitch.y) * 1.0))))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = vec4(-408.026, -8.3, -60.72, 207.132);
                                }
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    continue;
                                }
                            }
                            if (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_DEAD(false))))) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                break;
                            }
                            merge(from, mid, to);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-717.412, 9.2, -4.8, 5461.7368);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                break;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = (uvec3(126435u, 27096u, 133840u), vec4(-0.4, -6.3, -61.98, -5.0));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        continue;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    break;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(3.7, 782.294, 5.1, 44.89);
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
}

void main() {
    if (_GLF_DEAD(false)) {
        _GLF_color = mat2x4(8.1, -73.33, 2052.8402, 163.938, -6140.7970, -_GLF_IDENTITY(5.4, float(_GLF_IDENTITY(float(5.4), (float(_GLF_IDENTITY(5.4, min(5.4, 5.4)))) / 1.0))), -88.54, 5.6)[1];
        if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
            return;
        }
    }
    int i = int(injectionSwitch.x);
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
        do {
            if (_GLF_DEAD(false)) {
                break;
            }
            do {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = tanh(_GLF_color);
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(70.62, 1.2, -16.28, -5.2);
                        }
                    }
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                break;
                if (_GLF_DEAD(false)) {
                    _GLF_color = fwidthCoarse(_GLF_color);
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                break;
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                do {
                    switch (i) {
                        case 0:
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(53.08, 746.363, -6336.2059, 8.4);
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                continue;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bool(false), bool(bvec4(bool(false), false, true, false))))))) {
                                    _GLF_color = (583.107 * mod(vec4(3194.5685, 1.0, 8.8, -294.240), vec4(-126.716, 8881.6597, 2463.2043, -724.767)));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                discard;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (vec4(-9.2, length(vec3(4.7, 64.23, -987.617)), injectionSwitch) + vec4(-98.24, -0.2, -7.6, 851.280));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    _GLF_color = _GLF_color;
                                }
                            }
                            do {
                                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), !(!(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, (false ? _GLF_FUZZED(849.519) : gl_FragCoord.y)) < 0.0))))))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        discard;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = degrees(vec4(-552.982, 28.94, -8.5, -5.9));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                discard;
                                            }
                                        }
                                    } else {
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                discard;
                            }
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                do {
                                    data[i] = 4;
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = log2(_GLF_color);
                            }
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, (true ? injectionSwitch : _GLF_FUZZED(vec2(-8.7, 8.7)))).y)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        discard;
                                    }
                                    _GLF_color = vec4(525.795, 85.18, -8240.2901, 36.69);
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            discard;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = (_GLF_color / 43.26);
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            break;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, !(!(false)))) && true))) {
                                    do {
                                        return;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(abs(0.0)))))) {
                                    continue;
                                }
                                discard;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = roundEven(_GLF_color);
                                        }
                                        _GLF_color = vec4(0.6, 68.98, -34.45, -5.9);
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = step(-7.9, abs(vec4(6.7, -20.64, 7.4, -82.43)));
                                }
                            }
                        case 1:
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            do {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = step(_GLF_color, vec4(16.54, -3.6, -2.2, -2.6));
                                }
                                data[i] = 3;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, (true ? gl_FragCoord : _GLF_FUZZED(_GLF_color))).x < 0.0, bool(bool(_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, (true ? gl_FragCoord : _GLF_FUZZED(_GLF_color))).x < 0.0, true && (_GLF_IDENTITY(gl_FragCoord, (true ? gl_FragCoord : _GLF_FUZZED(_GLF_color))).x < 0.0)))))))));
                            if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), bool(bvec3((injectionSwitch.x > injectionSwitch.y), true, _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))))))) {
                                _GLF_color = mod(_GLF_color, -44.34);
                                if (_GLF_DEAD(false)) {
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        return;
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        continue;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, (0.0) - 0.0))))) {
                                            break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = max(floor(vec4(-9569.7189, 510.468, -76.42, 86.80)), 7148.9273);
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        continue;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            break;
                            if (_GLF_DEAD(false)) {
                                do {
                                    return;
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                }
                                continue;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    continue;
                                }
                            }
                        case 2:
                            if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_IDENTITY(_GLF_DEAD(false), false || (_GLF_DEAD(false)))) && _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(1.0))))) {
                                    _GLF_IDENTITY(_GLF_color = vec4(-9.7, -7885.2968, -5.3, -9661.7696), (false ? _GLF_FUZZED(vec4(-6.7, 2.6, -6494.9988, 64.61)) : (_GLF_color = vec4(-9.7, -7885.2968, -5.3, -9661.7696))));
                                } else {
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch, (injectionSwitch) * mat2(1.0)).y)))) {
                                    _GLF_color = _GLF_color;
                                } else {
                                }
                            }
                            data[i] = 2;
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    break;
                                }
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    discard;
                                }
                                do {
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            _GLF_color = mix(vec4(-2.8, 9.5, 4591.4628, 5499.9830), vec4(-6.6), vec4(-8.6, 3.8, -8.3, 4.0));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                                            return;
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            return;
                                        }
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            continue;
                                        }
                                    }
                                    continue;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(47.25, 92.50, -1626.1317, -4.2);
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = unpackSnorm4x8(115356u);
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY((false), bool(bvec2((false), false))) || false))) {
                                                    return;
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                }
                                            } else {
                                                _GLF_color = _GLF_color;
                                            }
                                        } else {
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            break;
                                        }
                                    }
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        discard;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), _GLF_IDENTITY(bool(bvec3(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false, true)), !(!(bool(bvec3(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false, true)))))))) {
                                    return;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = ((-99.83) * _GLF_color);
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return;
                                }
                                break;
                            }
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                discard;
                            }
                        case 3:
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            do {
                                data[i] = 1;
                            } while (_GLF_WRAPPED_LOOP(false));
                            break;
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, mix(float(gl_FragCoord.y), float(_GLF_FUZZED(-6066.4575)), bool(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))) < 0.0)))) {
                                continue;
                            }
                        case 4:
                            if (_GLF_IDENTITY(_GLF_DEAD(false), true && (_GLF_DEAD(false)))) {
                                _GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    break;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    continue;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), min(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(_GLF_IDENTITY(vec2(_GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(-591.149)), bool(false))), 0.0), min(vec2(_GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(-591.149)), bool(false))), 0.0), _GLF_IDENTITY(vec2(_GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(-591.149)), bool(false))), 0.0), (vec2(_GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(-591.149)), bool(false))), 0.0)) / vec2(1.0, 1.0)))), vec2(1.0, 1.0))))))))) {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                                    data[i] = 0;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = unpackSnorm4x8(113847u);
                                    }
                                } else {
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                }
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = floor(vec4(-818.899, 215.050, 17.10, -84.78));
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            break;
                        case 5:
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            data[i] = -1;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 1.0, abs(1.0)), vec3(0.0, log(1.0), 0.0)), dot(vec3(1.0, 1.0, abs(1.0)), vec3(0.0, log(1.0), 0.0))))))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    break;
                                }
                                _GLF_color = min((_GLF_color - (-0.2)), vec4(530.776, -_GLF_IDENTITY(6.2, min(6.2, 6.2)), -48.63, -9.3));
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        continue;
                                    }
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter--) {
                                            _GLF_color = exp2(_GLF_color);
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, min(0.0, 0.0)))))) {
                                continue;
                            }
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                            }
                        case 6:
                            do {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    data[i] = -2;
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = (6691.8014 + _GLF_color);
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, false || (_GLF_IDENTITY(false, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) && (false))))));
                            break;
                        case 7:
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                data[i] = -3;
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                    break;
                                }
                                _GLF_color = trunc(_GLF_color);
                            }
                            break;
                        case 8:
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                return;
                            }
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec3(4663.4335, 8.2, -4.0).xzzy;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(3.0, -5.4, -9.4, 94.95);
                                            }
                                        }
                                    }
                                }
                                data[i] = -4;
                            }
                            break;
                        case 9:
                            if (_GLF_IDENTITY(_GLF_DEAD(false), true && _GLF_IDENTITY((_GLF_DEAD(false)), !(!((_GLF_DEAD(false))))))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                    return;
                                }
                                return;
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x, (false ? _GLF_FUZZED(-4639.0160) : injectionSwitch.x)) < injectionSwitch.y)))) {
                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                    data[i] = -5;
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = clamp(vec4(-8.0, -508.949, -36.16, 0.9), refract(-4.9, 7.3, atan(-5959.5761)), intBitsToFloat((N << i)));
                                        }
                                    } else {
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                    _GLF_color = vec4(min(-2.3, -648.234), dot(182.813, 4.8), vec2(-536.090, 517.420));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    discard;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (distance(2.4, -8128.5962) + _GLF_color);
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        break;
                                    }
                                }
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = ldexp(_GLF_color, ivec4(34505, 1819, 1566, 30151));
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = vec4(-611.122, 10.09, -90.11, -18.04);
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = unpackSnorm4x8(180251u);
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                }
                                continue;
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = log2(vec4(-7262.7208, 3.5, 2.5, -350.951));
                                    }
                                    discard;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(sqrt(1.0)))))) {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    break;
                                }
                            }
                            break;
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), false || (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) {
                                _GLF_color = vec4(3.0, 3.0, -5139.6077, -864.323);
                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                    break;
                                }
                            }
                    }
                    i++;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    do {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    return;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        break;
                                    }
                                } else {
                                }
                            }
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(5), int(5))) >> _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), (_GLF_IDENTITY(int(5), clamp(int(5), _GLF_IDENTITY(int(5), max(_GLF_IDENTITY(int(5), clamp(int(5), int(5), int(5))), _GLF_IDENTITY(int(5), min(int(5), int(5))))), _GLF_IDENTITY(int(5), max(_GLF_IDENTITY(int(5), min(int(5), int(5))), int(5)))))) >> 0)))); _injected_loop_counter++) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                _GLF_color = vec2(-4.2, 1.1).ssss;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = (((-518.695) + _GLF_color) / fwidthCoarse(_GLF_color));
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            } else {
                                for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 ^ 1)); _injected_loop_counter++) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        discard;
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                discard;
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = exp2(exp(vec4(-51.83, -5.2, -85.50, -726.021)));
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                discard;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                continue;
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), max(int(4), int(4)))))); _injected_loop_counter--) {
                        if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), false || (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
                            do {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    _GLF_color = unpackUnorm4x8(160644u);
                                }
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-6.6, 0.6, -80.45, _GLF_IDENTITY(-4.2, min(_GLF_IDENTITY(-4.2, mix(float(_GLF_FUZZED(3327.6848)), float(_GLF_IDENTITY(-4.2, 1.0 * (-4.2))), bool(true))), -4.2)));
                    }
                } while (_GLF_IDENTITY(i, (i) | 0) < 10);
            }
        } while (_GLF_WRAPPED_LOOP(false));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
        }
    } else {
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(_GLF_IDENTITY(!(true), bool(bvec3(!(true), false, true))))))) {
        if (_GLF_DEAD(false)) {
            return;
        }
        for (int j = 0; j < 10; j++) {
            if (_GLF_DEAD(false)) {
                break;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-6.6, 7.9, -3154.9577, -2.8);
                    }
                    break;
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                _GLF_color = vec4(-6.6, -4.6, -629.952, -3.9);
            }
            do {
                temp[j] = data[j];
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-3122.5400, 7606.3280, -5382.5756, 3.9);
                }
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(false)) {
                continue;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-923.098, -297.253, 53.35, -169.336);
            }
            if (_GLF_DEAD(false)) {
                continue;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    break;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(1.0, 0.0, sin(0.0), 0.0), vec4(0.0, 1.0, 1.0, 1.0)), dot(vec4(1.0, 0.0, sin(0.0), 0.0), vec4(0.0, 1.0, 1.0, 1.0))))))) {
                    _GLF_color = dFdx(clamp(vec4(-434.142, 67.78, -187.147, -3475.3791), _GLF_color, _GLF_color));
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = trunc(_GLF_color);
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    break;
                }
                return;
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(6.0, 4961.9641, 764.704, 78.59);
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
        }
    } else {
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = mix(_GLF_color, _GLF_color, greaterThan(vec4(0.3, -1102.7596, 4229.7440, 6.6), _GLF_color));
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return;
    }
    do {
        if (_GLF_DEAD(false)) {
            break;
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = cos(vec4(9088.0951, vec2(-920.317, -75.82), 4603.8847));
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        return;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = vec4(-29.21, 341.437, 1.2, 8022.4516);
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            break;
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = roundEven(_GLF_color);
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    _GLF_color = vec4(-995.914, 65.51, -5494.2558, -2.5);
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return;
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    break;
                }
                _GLF_color = _GLF_color;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                mergeSort();
            } else {
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    continue;
                }
                return;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    continue;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                continue;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    float grey;
    for (int _injected_loop_counter = (0 ^ int(_GLF_ZERO(0.0, injectionSwitch.x))); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((int(_GLF_ONE(1.0, _GLF_IDENTITY(injectionSwitch, min(injectionSwitch, injectionSwitch)).y)) << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), max(int(7), int(7))))) >> _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter++) {
        if (int(_GLF_IDENTITY(gl_FragCoord[1], max(_GLF_IDENTITY(gl_FragCoord[1], min(gl_FragCoord[1], gl_FragCoord[1])), gl_FragCoord[1]))) < 30) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    _GLF_color = _GLF_color;
                }
                discard;
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(0, (false ? _GLF_FUZZED(_injected_loop_counter) : 0))); _injected_loop_counter--) {
                    return;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                discard;
                if (_GLF_DEAD(false)) {
                    break;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    if (_GLF_DEAD(false)) {
                        return;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                }
            }
            do {
                if (_GLF_DEAD(false)) {
                    return;
                }
                grey = 0.5 + float(data[0]) / 10.0;
            } while (_GLF_WRAPPED_LOOP(false));
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(43.24, 81.70, 5118.9176, -6404.4749);
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-_GLF_IDENTITY(119.444, (119.444) * 1.0), 6.1, -52.97, 2.0);
                if (_GLF_DEAD(false)) {
                    discard;
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), !(_GLF_IDENTITY(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), bool(bvec4(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), false, true, false))))))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        return;
                    } else {
                    }
                }
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = (vec4(4532.1975, 38.36, -948.403, 586.205));
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                continue;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                }
                if (_GLF_IDENTITY(_GLF_DEAD(false), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) && (_GLF_DEAD(false)))) {
                    _GLF_color = vec4(vec3(62.04, -1.4, 7430.0389), 8.4);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        continue;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            discard;
                        }
                    }
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0)))))) {
                        return;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        return;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    } else {
                    }
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = _GLF_color;
                        }
                        return;
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        for (int _injected_loop_counter = (_GLF_IDENTITY(0 << _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), (_GLF_IDENTITY(int(3), (int(3)) | 0)) | (int(3)))), (0 << _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), (_GLF_IDENTITY(int(3), (int(3)) | 0)) | (int(3))))) | 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter < (_GLF_IDENTITY(1, (false ? _GLF_FUZZED(i) : 1)) | _GLF_IDENTITY(_GLF_IDENTITY(0, (0) | (0)), max(_GLF_IDENTITY(_GLF_IDENTITY(0, (0) | (0)), max(_GLF_IDENTITY(_GLF_IDENTITY(0, (0) | (0)), (_GLF_IDENTITY(0, (0) | (0))) << 0), _GLF_IDENTITY(0, (0) | (0)))), _GLF_IDENTITY(0, (0) | (0)))))); _injected_loop_counter++) {
                            do {
                                return;
                            } while (_GLF_WRAPPED_LOOP(false));
                            if (_GLF_DEAD(false)) {
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    break;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(length(vec4(0.0, 0.0, 0.0, 0.0))))))) {
                                return;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        continue;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        break;
                    }
                }
            }
            if (int(gl_FragCoord[1]) < 60) {
                do {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        continue;
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        _GLF_color = vec4(-8.9, 9.7, 50.13, 3720.3091);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(77.25, -799.705, 7549.8631, -7609.1459);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            discard;
                        }
                        return;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = tan(_GLF_color);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        do {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = dFdyFine(_GLF_color);
                                    }
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    _GLF_color = dFdxCoarse(vec2(76.06, -4853.8990).ssts);
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                            return;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    do {
                        if (_GLF_DEAD(false)) {
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = vec4(3.3, 3.6, 25.45, -3038.3857);
                                } else {
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, max(0.0, 0.0)))))) {
                            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                _GLF_color = degrees(vec4(-683.130, -9.2, -21.54, -43.53));
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = abs(vec4(729.847, -90.00, 498.238, -741.108));
                            }
                            _GLF_color = _GLF_color;
                        }
                        grey = 0.5 + float(_GLF_IDENTITY(data[1], min(data[1], data[1]))) / 10.0;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (vec4(6.6, -71.18, 1.2, -7.7) * grey);
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, _GLF_IDENTITY(vec2(mat3(_GLF_IDENTITY(injectionSwitch, vec2(vec4(injectionSwitch, 0.0, 0.0))), 1.0, sin(0.0), 1.0, exp(0.0), 1.0, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, abs(0.0))), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, abs(0.0)))))), _GLF_IDENTITY((vec2(mat3(_GLF_IDENTITY(injectionSwitch, vec2(vec4(injectionSwitch, 0.0, 0.0))), 1.0, sin(0.0), 1.0, exp(0.0), 1.0, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, abs(0.0))), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, abs(0.0))))))) * mat2(1.0), mix(vec2(_GLF_FUZZED(898.315), _GLF_FUZZED(99.37)), vec2(((vec2(mat3(_GLF_IDENTITY(injectionSwitch, vec2(vec4(injectionSwitch, 0.0, 0.0))), 1.0, sin(0.0), 1.0, exp(0.0), 1.0, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, abs(0.0))), dot(_GLF_IDENTITY(vec3(1.0, 1.0, 1.0), max(_GLF_IDENTITY(vec3(1.0, 1.0, 1.0), (vec3(1.0, 1.0, 1.0)) - vec3(_GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x))), vec3(1.0, 1.0, 1.0))), vec3(0.0, 0.0, abs(0.0))))))) * mat2(1.0))[0], ((vec2(mat3(_GLF_IDENTITY(injectionSwitch, vec2(vec4(injectionSwitch, 0.0, 0.0))), 1.0, sin(0.0), 1.0, exp(0.0), 1.0, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, abs(0.0))), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, abs(0.0))))))) * mat2(1.0))[_GLF_IDENTITY(1, min(_GLF_IDENTITY(1, int(int(1))), 1))]), bvec2(true, true))))).y))));
            } else {
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (int(gl_FragCoord[1]) < 90) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                            }
                        } else {
                            grey = 0.5 + float(data[2]) / 10.0;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (vec4(-7.7, 7368.1386, -8989.2611, 7.7) - grey);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                discard;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            break;
                        }
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return;
                        }
                    }
                } else {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter++) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            continue;
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                    }
                    if (int(gl_FragCoord[1]) < 120) {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            _GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                        grey = 0.5 + _GLF_IDENTITY(float(data[3]) / 10.0, float(mat4x2(float(data[3]) / 10.0, abs(1.0), _GLF_IDENTITY(0.0, max(0.0, 0.0)), determinant(mat3(0.0, tan(0.0), 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0)), 1.0, 0.0, 0.0, 1.0)));
                        do {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    } else {
                                        return;
                                    }
                                }
                                return;
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                discard;
                            }
                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    break;
                                }
                            }
                            _GLF_color = _GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = round(dFdx(_GLF_color));
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = max(vec4(-3.2, 49.56, -5662.8356, -5651.9257), _GLF_color);
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                }
                                for (int _injected_loop_counter = (int(_GLF_ZERO(0.0, injectionSwitch.x)) | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        discard;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                        break;
                                    }
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            continue;
                                        }
                                        _GLF_color = _GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, max(gl_FragCoord.y, _GLF_IDENTITY(gl_FragCoord.y, (false ? _GLF_FUZZED(grey) : gl_FragCoord.y)))) < 0.0))));
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    } else {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = log2(vec4(769.486, -8688.8357, -706.125, -1634.8340));
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    }
                                    if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) && true)) {
                                        return;
                                    }
                                    do {
                                        _GLF_color = vec4(0.8, 16.98, 7.6, -9705.5361);
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                        }
                                    } else {
                                        _GLF_color = fma(vec4(80.38, 2.5, -7.7, 8593.6057), vec4(-0.7, 0.9, 919.082, 985.130), vec4(-7.5, 8.0, 5.3, -90.17));
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                    _GLF_color = vec4(-83.10, -3112.4635, -3.8, -4.0);
                                }
                                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x)))), !(!(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x)))))))) {
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, 0.0, tan(0.0))))))) {
                                        _GLF_color = mix((_GLF_color * trunc(grey)), vec4(-648.212, -1.0, 407.295, -5.3), greaterThan(vec4(4935.6608, -2454.3389, 4.7, 0.7), (_GLF_color - (-4.5))));
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(-0.5, -2.8, 6.7, -8.2).tptp;
                                }
                            } else {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        return;
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                            continue;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord, (gl_FragCoord) - vec4(0.0, 0.0, 0.0, 0.0)).y >= sin(0.0))))) {
                                        if (_GLF_DEAD(false)) {
                                            do {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                    return;
                                                }
                                                return;
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    return;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), bool(bvec2(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false)))));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                break;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            }
                                        }
                                    } else {
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                        discard;
                                    }
                                }
                                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), true && (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            continue;
                                        }
                                        _GLF_color = max(_GLF_color, 7469.3051);
                                    }
                                    _GLF_color = exp2(_GLF_color);
                                }
                            }
                            if (int(gl_FragCoord[1]) < 150) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) && (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, true && (injectionSwitch.x > injectionSwitch.y)))))))) {
                                } else {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    } else {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 ^ 0)); _injected_loop_counter--) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = mod(_GLF_color, vec4(1.9, -7685.4782, 7680.6451, -42.65));
                                        }
                                        discard;
                                    }
                                }
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = exp(vec4(6.3, -3.3, -42.26, -316.548));
                                }
                                if (int(gl_FragCoord[1]) < 180) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = fwidth(_GLF_color);
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(54.48, -184.526, -6.5, -8303.2425);
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(5), int(5))) >> _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter++) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                                    _GLF_color = (3.2 / _GLF_color);
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        discard;
                                                    }
                                                }
                                                _GLF_color = vec4(-8876.9773, 904.960, -5703.7235, 5.3);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        _GLF_color = _GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(149.685, 5431.6385, 209.531, -267.088);
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                return;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 0)); _injected_loop_counter--) {
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        _GLF_color = ((+vec4(-27.55, -2.0, 1.9, -7.8)) * dFdxCoarse(grey));
                                                    } else {
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = uintBitsToFloat((uvec3(172716u, 170880u, 191244u).ptss >> 114853u));
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                                        continue;
                                                    }
                                                }
                                            } else {
                                            }
                                        } else {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    break;
                                                }
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                break;
                                            }
                                        }
                                    }
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, _GLF_IDENTITY(injectionSwitch.x, clamp(injectionSwitch.x, _GLF_IDENTITY(injectionSwitch.x, min(injectionSwitch.x, injectionSwitch.x)), _GLF_IDENTITY(injectionSwitch.x, float(_GLF_IDENTITY(mat4x2(injectionSwitch.x, 1.0, 1.0, 0.0, 1.0, 1.0, determinant(mat2(1.0, 0.0, 0.0, 1.0)), 0.0), mat2(1.0) * (mat4x2(injectionSwitch.x, 1.0, 1.0, 0.0, 1.0, 1.0, determinant(mat2(1.0, 0.0, 0.0, 1.0)), 0.0)))))))))); _injected_loop_counter--) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                continue;
                                            }
                                            _GLF_color = ldexp(vec4(-9.1, 32.55, 4.3, 2057.9404), ivec3(79770, -98571, -18677).yzyx);
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(61.50, 8174.1445, 6.3, -34.03);
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    discard;
                                                }
                                            }
                                            continue;
                                        }
                                        grey = _GLF_IDENTITY(_GLF_IDENTITY(0.5 + float(data[5]) / 10.0, (_GLF_IDENTITY(0.5 + float(data[5]) / 10.0, (true ? (0.5 + float(data[5]) / 10.0) : _GLF_FUZZED(distance(-3.7, 3.9))))) / 1.0), (true ? _GLF_IDENTITY(0.5 + float(data[5]) / 10.0, (_GLF_IDENTITY(0.5 + float(data[5]) / 10.0, (true ? (0.5 + float(data[5]) / 10.0) : _GLF_FUZZED(distance(-3.7, 3.9))))) / 1.0) : _GLF_FUZZED(grey)));
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return;
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    } else {
                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true && (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = vec4(9.2, 994.481, -183.204, -68.37);
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = ceil(vec4(injectionSwitch, grey, distance(grey, 5.9)));
                                                }
                                                discard;
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))))) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_IDENTITY(int(gl_FragCoord[1]) < 210, _GLF_IDENTITY(false, !(!(false))) || (_GLF_IDENTITY(int(gl_FragCoord[1]) < 210, false || (int(gl_FragCoord[1]) < 210))))) {
                                                grey = 0.5 + float(data[6]) / 10.0;
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            } else {
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            break;
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        } else {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(_GLF_ZERO(0.0, injectionSwitch.x)))))) {
                                                                _GLF_color = vec4(8.6, 7483.0407, -71.03, 40.63);
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        discard;
                                                                    }
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                }
                                                            }
                                                        }
                                                        _GLF_color = vec4(357.421, 8.0, 48.89, 88.83);
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                    }
                                                } else {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        return;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                    }
                                                }
                                                if (int(gl_FragCoord[1]) < 240) {
                                                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                break;
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                                                    break;
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(-267.344, -6229.8074, 57.36, 2612.1912);
                                                            }
                                                            do {
                                                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter, max(_GLF_IDENTITY(_injected_loop_counter, clamp(_injected_loop_counter, _injected_loop_counter, _injected_loop_counter)), _injected_loop_counter)) > _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), (_GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), 0 ^ (int(_GLF_ZERO(0.0, injectionSwitch.x))))) - 0)); _injected_loop_counter--) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            _GLF_color = mat2x4(3.8, -2188.6713, -6878.7109, 1.8, 794.891, -7.2, -0.8, -59.50)[0];
                                                                        }
                                                                        if (_GLF_DEAD(false)) {
                                                                            continue;
                                                                        }
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                                                    _GLF_color = vec4(983.457, -0.5, -6326.6456, 7.1);
                                                                }
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
                                                            do {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    break;
                                                                }
                                                                return;
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        discard;
                                                                    }
                                                                    continue;
                                                                }
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = _GLF_IDENTITY(_GLF_color, clamp(_GLF_color, _GLF_color, _GLF_IDENTITY(_GLF_color, clamp(_GLF_color, _GLF_color, _GLF_color))));
                                                                    }
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                        continue;
                                                                    }
                                                                } else {
                                                                    if (_GLF_DEAD(false)) {
                                                                        continue;
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    break;
                                                                }
                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            return;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        continue;
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                                            _GLF_color = (_GLF_color * grey);
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(-349.155, -97.73, -24.03, -580.316);
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        grey = 0.5 + float(_GLF_IDENTITY(data[7], (data[_GLF_IDENTITY(7, 0 ^ (7))]) / 1)) / 10.0;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            continue;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_IDENTITY(false, !(!(false))), (_GLF_IDENTITY(false, !(!(false)))) && true))) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(sin(0.0)))))) {
                                                            _GLF_color = atan(_GLF_color);
                                                        }
                                                        continue;
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(-905.129, -6019.6975, -13.61, -6.7);
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                continue;
                                                                if (_GLF_DEAD(false)) {
                                                                    continue;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = vec4(-2.7, -7831.6048, -456.507, -58.71);
                                                                }
                                                            }
                                                            _GLF_color = vec4(vec2(5.3, -3.4), (vec2(-697.254, -805.312) + 1.1));
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        return;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                } else {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        break;
                                                    }
                                                    do {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                                _GLF_color = sinh(_GLF_color);
                                                            }
                                                            break;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(false)) {
                                                                discard;
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = dFdyCoarse(_GLF_color);
                                                            }
                                                            return;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                return;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = dFdyFine(vec4(1306.5207, 245.154, 3701.9038, 8536.7539));
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                return;
                                                            }
                                                            discard;
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                }
                                                                _GLF_color = vec4(1.0, -1.2, 642.089, 136.335);
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        discard;
                                                                    }
                                                                    _GLF_color = sin(vec4(-4.2, -777.613, 107.160, 0.8));
                                                                }
                                                                break;
                                                            }
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                                for (int _injected_loop_counter = (int(_GLF_ZERO(0.0, injectionSwitch.x)) | (_GLF_IDENTITY(1, clamp(1, 1, _GLF_IDENTITY(1, max(1, _GLF_IDENTITY(1, (1) ^ 0))))) ^ 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = abs(vec4(747.434, 5650.6594, 7.6, 5.6));
                                                                            if (_GLF_DEAD(false)) {
                                                                                break;
                                                                            }
                                                                        }
                                                                        _GLF_color = clamp((+_GLF_color), _GLF_color, max(vec3(-0.0, -5008.5928, 3770.9805), 30.05).gbbr);
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            discard;
                                                                        }
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            _GLF_color = (vec4(3.6, 61.47, -9.9, -66.65) - _GLF_color);
                                                                        }
                                                                        if (_GLF_DEAD(false)) {
                                                                            continue;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                continue;
                                                            }
                                                        } else {
                                                        }
                                                    } else {
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(-90.01, -331.605, -0.6, 7.9);
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0))))))) {
                                                                return;
                                                            }
                                                            _GLF_color = vec4(-7.9, -9.4, -9.1, 86.86);
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                                    discard;
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                break;
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                                return;
                                                            }
                                                        } else {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = smoothstep(vec4(-62.04, -2465.6830, 47.29, -622.881), vec4(941.843, -925.000, -0.7, 0.9), ceil(_GLF_color));
                                                            }
                                                            _GLF_color = vec4(-288.187, -6853.1526, -4.3, -29.17);
                                                        }
                                                    }
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                        if (_GLF_IDENTITY(int(gl_FragCoord[1]) < 270, bool(bvec3(_GLF_IDENTITY(int(gl_FragCoord[1]) < 270, bool(bool(int(_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3]))[1]) < 270))), false, false)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                    if (_GLF_DEAD(false)) {
                                                                        return;
                                                                    }
                                                                }
                                                                break;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                discard;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                continue;
                                                            }
                                                            for (int _injected_loop_counter = _GLF_IDENTITY(1, int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ (1)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                grey = 0.5 + float(data[8]) / 10.0;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                        } else {
                                                            discard;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(sin(0.0)))))) {
                                                            return;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            discard;
                                                        }
                                                    }
                                                    for (int _injected_loop_counter = _GLF_IDENTITY(1, _GLF_IDENTITY(0, (0) | (0)) + (1)); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter--) {
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                do {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                        _GLF_color = _GLF_color;
                                                                    }
                                                                    _GLF_color = vec4(-1.2, -8185.4376, -876.352, -6.0);
                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                            } else {
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                break;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                continue;
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                                        break;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            }
                                        }
                                    }
                                }
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < 0.0, !(!(gl_FragCoord.y < 0.0))))))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                            discard;
                                        }
                                        do {
                                            discard;
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            return;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        continue;
                                    }
                                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > (((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1))) ^ 1)); _injected_loop_counter--) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                break;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), ((injectionSwitch.x > injectionSwitch.y)) && true)))) {
                                                    return;
                                                }
                                                return;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    discard;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                }
                                            }
                                        } else {
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, min(gl_FragCoord.x, gl_FragCoord.x)) < abs(0.0))))) {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    discard;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                                _GLF_color = _GLF_color;
                                            }
                                            break;
                                            if (_GLF_DEAD(false)) {
                                                return;
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                _GLF_color = (vec2(0.4, -0.3) * (mat3x2(-5.3, 0.2, 659.973, -90.61, 0.4, -998.117) * mat4x3(-5.9, -690.036, 4173.8524, 408.558, -76.35, -53.79, -3160.5259, -271.056, 4.0, 52.11, -51.12, -46.39)));
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                break;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_DEAD(false)) {
                                    return;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = reflect(_GLF_color, vec4(-58.02, -2.9, 370.861, 4.0));
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                return;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = tan((vec4(-5.5, 3427.8896, 71.60, -919.090) - _GLF_color));
                                }
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                    }
                }
                if (_GLF_DEAD(false)) {
                    continue;
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    _GLF_color = vec4(-112.833, 9.7, 83.31, 88.91);
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            break;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                            _GLF_color = fma(degrees(vec4(6581.7391, -978.158, 2.1, 6181.8753)), vec4(-28.10, 382.535, 1204.1098, 5228.1471), vec4(-11.19, -4047.2073, 334.464, -1.0));
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                    _GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                discard;
                            }
                        }
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0)))), _GLF_IDENTITY(bool(bvec4((gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0)))), false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false)), bool(bvec2(_GLF_IDENTITY(bool(bvec4((gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0)))), false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false)), (bool(bvec4((gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0)))), false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false))) && true), false))))))) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = vec4(-3141.0849, -438.707, -91.55, -12.47);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        discard;
                                    }
                                }
                                discard;
                            }
                            do {
                                _GLF_color = vec2(-9.3, 4951.7681).sstt;
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                        if (_GLF_DEAD(false)) {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                do {
                                    return;
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    _GLF_color = vec4(7.6, -1.9, 8.8, 371.690);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return;
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    break;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                    _GLF_color = vec4(-1932.3565, 5860.2913, 1668.5866, -22.33);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        _GLF_color = _GLF_color;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), _GLF_IDENTITY((_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))) || false, !(!((_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))) || false)))))) {
                                    _GLF_color = (_GLF_IDENTITY(vec4(-8213.1577, 77.97, 29.51, -6.1), mix(vec4(_GLF_FUZZED(-97.93), (vec4(-8213.1577, 77.97, 29.51, -6.1))[1], _GLF_FUZZED((true ? 7582.7576 : 530.845)), (vec4(-8213.1577, 77.97, 29.51, -6.1))[3]), vec4((vec4(-8213.1577, 77.97, 29.51, -6.1))[0], _GLF_FUZZED((-15.65)), (vec4(-8213.1577, 77.97, 29.51, -6.1))[2], _GLF_FUZZED(72.60)), bvec4(true, false, true, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))) / vec4(1.5, 6.2, 192.654, 6.7));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                        discard;
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = atan(mat3x4(-3.2, 3.0, -508.939, -6275.9511, 4400.8572, -0.8, -5.1, 25.04, -8.6, 5.1, -9700.9489, -3.6)[2]);
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        break;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = log(_GLF_IDENTITY(reflect(_GLF_color, _GLF_color), mix(vec4((reflect(_GLF_color, _GLF_color))[0], (reflect(_GLF_color, _GLF_color))[1], (reflect(_GLF_color, _GLF_color))[2], (_GLF_IDENTITY(reflect(_GLF_color, _GLF_color), (reflect(_GLF_color, _GLF_color)) / vec4(_GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y))))[3]), vec4(_GLF_FUZZED(9.2), _GLF_FUZZED((-8.9)), _GLF_FUZZED(-4197.3553), _GLF_FUZZED(-8269.3691)), bvec4(false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false, false))));
                        } else {
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                } else {
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = min(_GLF_IDENTITY(_GLF_color, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? _GLF_color : _GLF_FUZZED(vec4(8.4, -7536.6882, -0.0, 3.9)))), 7.9);
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-6860.5047, 6.8, -4049.0506, 23.30);
                }
            }
        }
    }
    do {
        do {
            _GLF_color = vec4(vec3(grey), 1.0);
        } while (_GLF_WRAPPED_LOOP(false));
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                return;
            }
            return;
        }
    } else {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        } else {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(57.13, 6.5, -28.85, -2.3);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                return;
            }
            return;
        }
    }
}
