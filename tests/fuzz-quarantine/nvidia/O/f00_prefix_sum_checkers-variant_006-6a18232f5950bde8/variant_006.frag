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

vec2 pattern(in vec2 x) {
    vec2 n = floor(x);
    if (_GLF_DEAD(false)) {
        return vec2(_GLF_IDENTITY(_GLF_IDENTITY(1.0, min(_GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(-460.512) : 1.0)), 1.0)), (false ? _GLF_FUZZED(3584.2173) : _GLF_IDENTITY(1.0, min(_GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(-460.512) : 1.0)), 1.0)))), 1.0);
    }
    vec3 m = vec3(1.0);
    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bvec3(false, false, true), _GLF_IDENTITY(bvec3(bvec3(bvec3(false, false, true))), bvec3(bvec3(bvec3(bvec3(bvec3(false, false, true))))))))))) {
        if (_GLF_IDENTITY(_GLF_DEAD(false), _GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, gl_FragCoord, gl_FragCoord)).x >= 0.0)) && (_GLF_DEAD(false)))) {
            return vec2(1.0, 1.0);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        return vec2(1.0, 1.0);
                    }
                    return vec2(1.0, 1.0);
                }
            } else {
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            return vec2(1.0, 1.0);
        } else {
        }
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
        do {
            do {
                if (_GLF_DEAD(false)) {
                    return vec2(1.0, 1.0);
                }
            } while (_GLF_WRAPPED_LOOP(false));
            for (int _injected_loop_counter = _GLF_IDENTITY(0, min(0, 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY(1, (1) | (1))); _injected_loop_counter++) {
                for (int j = -1; j <= _GLF_IDENTITY(int(_GLF_IDENTITY(injectionSwitch.y, min(injectionSwitch.y, _GLF_IDENTITY(injectionSwitch.y, mix(float(_GLF_FUZZED(9.4)), float(injectionSwitch.y), bool(true)))))), (_GLF_IDENTITY(int(_GLF_IDENTITY(injectionSwitch.y, min(injectionSwitch.y, _GLF_IDENTITY(injectionSwitch.y, mix(float(_GLF_FUZZED(9.4)), float(injectionSwitch.y), bool(true)))))), ~(~(int(_GLF_IDENTITY(injectionSwitch.y, min(injectionSwitch.y, _GLF_IDENTITY(injectionSwitch.y, mix(float(_GLF_FUZZED(9.4)), float(injectionSwitch.y), bool(true)))))))))) + 0); j++) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                    }
                                    continue;
                                }
                            }
                            return vec2(1.0, 1.0);
                            if (_GLF_DEAD(false)) {
                                do {
                                    do {
                                        discard;
                                    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        }
                    } else {
                        for (int i = -_GLF_IDENTITY(1, max(1, 1)); i <= _GLF_IDENTITY(int(injectionSwitch.y), 0 | (_GLF_IDENTITY(_GLF_IDENTITY(int(injectionSwitch.y), 0 ^ (int(injectionSwitch.y))), (_GLF_IDENTITY(_GLF_IDENTITY(int(injectionSwitch.y), 0 ^ (int(injectionSwitch.y))), (_GLF_IDENTITY(_GLF_IDENTITY(int(injectionSwitch.y), 0 ^ (int(injectionSwitch.y))), min(_GLF_IDENTITY(int(injectionSwitch.y), 0 ^ (int(injectionSwitch.y))), _GLF_IDENTITY(int(injectionSwitch.y), 0 ^ (int(injectionSwitch.y)))))) | (_GLF_IDENTITY(int(injectionSwitch.y), 0 ^ (int(injectionSwitch.y)))))) << _GLF_IDENTITY(0, _GLF_IDENTITY((0), ((0)) / 1) ^ 0)))); i++) {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_DEAD(false)) {
                                return vec2(1.0, 1.0);
                                if (_GLF_DEAD(false)) {
                                    return vec2(1.0, 1.0);
                                }
                            }
                            vec2 g = vec2(float(j), float(i));
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                if (_GLF_DEAD(false)) {
                                    return vec2(1.0, 1.0);
                                }
                            } else {
                            }
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            vec2 o = mix(n, g, 0.2);
                            if (_GLF_DEAD(false)) {
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return vec2(1.0, 1.0);
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(_GLF_ZERO(0.0, injectionSwitch.x), (_GLF_ZERO(0.0, injectionSwitch.x)) - 0.0))))) {
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true && (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
                                    break;
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false || (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))) {
                                    break;
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    for (int _injected_loop_counter = (1 & _GLF_IDENTITY(1, (1) << 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                        do {
                                            if (injectionSwitch.x < (m.x)) {
                                                int k = _GLF_IDENTITY(1, (1) | (1));
                                                while (k >= 0) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            return vec2(1.0, 1.0);
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, bool(bvec3(injectionSwitch.x > injectionSwitch.y, false, true))))))) {
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                        continue;
                                                    }
                                                    o = o + o;
                                                    if (_GLF_DEAD(false)) {
                                                        return vec2(1.0, 1.0);
                                                    }
                                                    k--;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                        continue;
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                }
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 ^ 1)); _injected_loop_counter++) {
                                                    do {
                                                        m = vec3(injectionSwitch.x, cos(o));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, exp(0.0) * (injectionSwitch.y)))))) {
                                                            break;
                                                            if (_GLF_DEAD(false)) {
                                                                break;
                                                            }
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                    }
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0)), dot(vec3(0.0, 0.0, 1.0), vec3(_GLF_IDENTITY(1.0, (1.0) / determinant(mat3(1.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 1.0, _GLF_IDENTITY(0.0, (0.0) + 0.0), 1.0, 0.0, 1.0))), 1.0, 0.0))))))) {
                                        return vec2(1.0, 1.0);
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return vec2(1.0, 1.0);
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                return vec2(1.0, 1.0);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            continue;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(determinant(_GLF_IDENTITY(mat3(0.0, 0.0, 0.0, cos(0.0), 0.0, 0.0, length(vec2(0.0, 0.0)), 0.0, sin(0.0)), (mat3(0.0, 0.0, 0.0, cos(0.0), 0.0, 0.0, length(vec2(0.0, 0.0)), 0.0, sin(0.0))) / mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), _GLF_IDENTITY(float(_GLF_IDENTITY(mat3x4(determinant(_GLF_IDENTITY(mat3(0.0, 0.0, 0.0, cos(0.0), 0.0, 0.0, length(vec2(0.0, 0.0)), 0.0, sin(0.0)), (mat3(0.0, 0.0, 0.0, cos(0.0), 0.0, 0.0, length(vec2(0.0, 0.0)), 0.0, sin(0.0))) / mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), 1.0, 0.0, 1.0, 1.0, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, 1.0, abs(0.0), 0.0, abs(determinant(mat3(1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0)))), (false ? _GLF_FUZZED(mat3x4(7821.7653, -43.71, 1215.8840, -3.7, 4855.8420, 2190.2412, 7.2, -3.5, -759.005, -245.937, -32.10, 370.988)) : mat3x4(determinant(_GLF_IDENTITY(mat3(0.0, 0.0, 0.0, cos(0.0), 0.0, 0.0, length(vec2(0.0, 0.0)), 0.0, sin(0.0)), (mat3(0.0, 0.0, 0.0, cos(0.0), 0.0, 0.0, length(vec2(0.0, 0.0)), 0.0, sin(0.0))) / mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), 1.0, 0.0, 1.0, 1.0, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, 1.0, abs(0.0), 0.0, abs(determinant(mat3(1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0))))))), (float(_GLF_IDENTITY(mat3x4(determinant(_GLF_IDENTITY(mat3(0.0, 0.0, 0.0, cos(0.0), 0.0, 0.0, length(vec2(0.0, 0.0)), 0.0, sin(0.0)), (mat3(0.0, 0.0, 0.0, cos(0.0), 0.0, 0.0, length(vec2(0.0, 0.0)), 0.0, sin(0.0))) / mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), 1.0, 0.0, 1.0, 1.0, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, 1.0, abs(0.0), 0.0, abs(determinant(mat3(1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0)))), (false ? _GLF_FUZZED(mat3x4(7821.7653, -43.71, 1215.8840, -3.7, 4855.8420, 2190.2412, 7.2, -3.5, -759.005, -245.937, -32.10, 370.988)) : mat3x4(determinant(_GLF_IDENTITY(mat3(0.0, 0.0, 0.0, cos(0.0), 0.0, 0.0, length(vec2(0.0, 0.0)), 0.0, sin(0.0)), (mat3(0.0, 0.0, 0.0, cos(0.0), _GLF_IDENTITY(0.0, (0.0) * abs(1.0)), 0.0, length(vec2(0.0, 0.0)), 0.0, sin(0.0))) / mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), 1.0, 0.0, 1.0, 1.0, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, 1.0, abs(0.0), 0.0, abs(determinant(mat3(1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0)))))))) / 1.0)))))) {
                        break;
                    }
                    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), _GLF_IDENTITY(bool(bvec3(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))), bool(_GLF_IDENTITY(bvec2(bool(bvec3(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))), true), bvec2(bvec2(_GLF_IDENTITY(bvec2(bool(bvec3(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, mix(float(_GLF_FUZZED(7.5)), float(gl_FragCoord.x), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))) < 0.0))), false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))), true), _GLF_IDENTITY(bvec2(bvec2(bvec2(bool(bvec3(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, mix(float(_GLF_FUZZED(7.5)), float(gl_FragCoord.x), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))) < 0.0))), false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))), true))), bvec2(bvec4(_GLF_IDENTITY(bvec2(bvec2(bvec2(bool(bvec3(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, mix(float(_GLF_FUZZED(7.5)), float(gl_FragCoord.x), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))) < 0.0))), false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))), true))), bvec2(bvec2(bvec2(bvec2(bvec2(bool(bvec3(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, mix(float(_GLF_FUZZED(7.5)), float(gl_FragCoord.x), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))) < 0.0))), false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))), true)))))), true, false))))))))))) {
                        if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) && true)) {
                            discard;
                        }
                        discard;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                    }
                    do {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, _GLF_IDENTITY(vec2(injectionSwitch[0], injectionSwitch[1]), _GLF_IDENTITY((vec2(injectionSwitch[0], injectionSwitch[1])) * mat2(1.0), ((vec2(injectionSwitch[0], injectionSwitch[1])) * mat2(1.0)) / sqrt(vec2(1.0, 1.0))))).y)))) {
                            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, max(_GLF_IDENTITY(gl_FragCoord, max(gl_FragCoord, gl_FragCoord)), gl_FragCoord)).x < 0.0))), bool(bool(_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, max(_GLF_IDENTITY(gl_FragCoord, max(gl_FragCoord, gl_FragCoord)), gl_FragCoord)).x < 0.0))), bool(bvec2(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, max(_GLF_IDENTITY(gl_FragCoord, max(gl_FragCoord, gl_FragCoord)), gl_FragCoord)).x < 0.0))), false))))))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return vec2(1.0, 1.0);
                                }
                                continue;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, tan(0.0), 1.0, 0.0)))))) {
                                return vec2(1.0, 1.0);
                            }
                            discard;
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0))))));
                    if (_GLF_DEAD(false)) {
                        break;
                        if (_GLF_DEAD(false)) {
                            return vec2(1.0, 1.0);
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    for (int _injected_loop_counter = _GLF_IDENTITY(1, max(1, 1)); _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_GLF_IDENTITY(_injected_loop_counter, ~(~(_injected_loop_counter))), max(_GLF_IDENTITY(_GLF_IDENTITY(_injected_loop_counter, ~(~(_injected_loop_counter))), (_GLF_IDENTITY(_injected_loop_counter, ~(~(_injected_loop_counter)))) << 0), _GLF_IDENTITY(_injected_loop_counter, ~(~(_injected_loop_counter))))) > 0); _injected_loop_counter--) {
        if (_GLF_IDENTITY(_GLF_DEAD(false), true && (_GLF_DEAD(false)))) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < tan(0.0)), true && ((gl_FragCoord.x < tan(0.0))))))) {
                } else {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            break;
                        }
                        if (_GLF_DEAD(false)) {
                            return vec2(1.0, 1.0);
                        }
                        return vec2(1.0, 1.0);
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, max(injectionSwitch.y, injectionSwitch.y)))))) {
                discard;
            }
            if (_GLF_DEAD(false)) {
                for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(0), int(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                        return vec2(1.0, 1.0);
                    }
                }
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | (1 ^ 1))); _injected_loop_counter--) {
                if (_GLF_DEAD(false)) {
                    break;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec2(1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    discard;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    return vec2(1.0, 1.0);
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    return vec2(1.0, 1.0);
                }
            }
            return vec2(m.x, _GLF_IDENTITY(m.y, min(_GLF_IDENTITY(m.y, mix(float(m.y), float(_GLF_FUZZED(5.4)), bool(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(1.0, 1.0, 1.0, 1.0) * (_GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, gl_FragCoord, gl_FragCoord)))).x < 0.0))))), _GLF_IDENTITY(m.y, _GLF_IDENTITY(_GLF_IDENTITY((m.y), float(_GLF_IDENTITY(mat4((m.y), abs(0.0), _GLF_ZERO(0.0, injectionSwitch.x), abs(1.0), 0.0, 0.0, log(cos(0.0)), 1.0, exp(length(0.0)), 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0), (true ? mat4((m.y), abs(0.0), _GLF_ZERO(0.0, injectionSwitch.x), abs(1.0), 0.0, 0.0, log(cos(0.0)), 1.0, exp(length(0.0)), 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0) : _GLF_FUZZED(mat4(-146.783, 738.805, 7812.7981, -475.035, -8.7, 44.58, 8849.5095, 9.5, 92.55, -602.907, 7752.2613, -1.7, -8688.4952, -31.16, 82.11, 29.89)))))), clamp(_GLF_IDENTITY((m.y), float(_GLF_IDENTITY(mat4((m.y), abs(0.0), _GLF_ZERO(0.0, injectionSwitch.x), abs(1.0), 0.0, 0.0, log(cos(0.0)), 1.0, exp(length(0.0)), 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0), (true ? mat4((m.y), abs(0.0), _GLF_ZERO(0.0, injectionSwitch.x), abs(1.0), 0.0, 0.0, log(cos(0.0)), 1.0, exp(length(0.0)), 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0) : _GLF_FUZZED(mat4(-146.783, 738.805, 7812.7981, -475.035, -8.7, 44.58, 8849.5095, 9.5, 92.55, -602.907, 7752.2613, -1.7, -8688.4952, -31.16, 82.11, 29.89)))))), _GLF_IDENTITY((m.y), float(_GLF_IDENTITY(mat4((m.y), abs(0.0), _GLF_ZERO(0.0, injectionSwitch.x), abs(1.0), 0.0, 0.0, log(cos(0.0)), 1.0, exp(length(0.0)), 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0), (true ? mat4((m.y), abs(0.0), _GLF_ZERO(0.0, injectionSwitch.x), abs(1.0), 0.0, 0.0, log(cos(0.0)), 1.0, exp(length(0.0)), 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0) : _GLF_FUZZED(mat4(-146.783, 738.805, 7812.7981, -475.035, -8.7, 44.58, 8849.5095, 9.5, 92.55, -602.907, 7752.2613, -1.7, -8688.4952, -31.16, 82.11, 29.89)))))), _GLF_IDENTITY((m.y), float(_GLF_IDENTITY(mat4((m.y), abs(0.0), _GLF_ZERO(0.0, injectionSwitch.x), abs(1.0), 0.0, 0.0, log(cos(0.0)), 1.0, exp(length(0.0)), 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0), (true ? mat4((m.y), abs(0.0), _GLF_ZERO(0.0, injectionSwitch.x), abs(1.0), 0.0, 0.0, log(cos(0.0)), 1.0, exp(length(0.0)), 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0) : _GLF_FUZZED(mat4(-146.783, 738.805, 7812.7981, -475.035, -8.7, 44.58, 8849.5095, 9.5, 92.55, -602.907, 7752.2613, -1.7, -8688.4952, -31.16, 82.11, 29.89)))))))) + 0.0))) - m.z);
        } else {
        }
    } else {
    }
}

void main() {
    if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)))), !(!((gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)))))))))) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
            } else {
                if (_GLF_DEAD(false)) {
                    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), (_GLF_IDENTITY(int(5), (int(5)) | (int(5)))) | (int(5)))))); _injected_loop_counter--) {
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        }
        return;
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        if (_GLF_DEAD(false)) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
            } else {
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                do {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                        return;
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), !(_GLF_IDENTITY(!((injectionSwitch.x > injectionSwitch.y)), true && (!((injectionSwitch.x > injectionSwitch.y))))))))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return;
                    }
                    return;
                }
            } else {
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    return;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return;
                    }
                }
                return;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        return;
                    } else {
                    }
                }
                return;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
            }
            return;
        }
    } else {
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    vec2 uv = gl_FragCoord.xy / resolution.y;
    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (false ? _GLF_FUZZED((+vec4(99.01, 67.41, -0.6, -6150.9489))) : gl_FragCoord)).y < 0.0)))) {
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return;
            }
            do {
                return;
            } while (_GLF_WRAPPED_LOOP(false));
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            do {
                return;
            } while (_GLF_WRAPPED_LOOP(false));
        } else {
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(false)) {
                return;
            }
            return;
        } else {
        }
    }
    float A[50];
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            if (_GLF_DEAD(false)) {
                return;
            }
        }
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, 0 ^ (1))); _injected_loop_counter++) {
        if (_GLF_DEAD(false)) {
            continue;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
    }
    for (int i = 0; i < 200; i++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
        if (i >= int(_GLF_IDENTITY(resolution, (false ? _GLF_FUZZED(injectionSwitch) : resolution)).x)) {
            break;
        }
        if (_GLF_DEAD(false)) {
            return;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    discard;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            discard;
                        }
                    }
                }
                break;
            }
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
        if ((4 * (i / 4)) == i) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                break;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    break;
                }
            }
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        discard;
                    } else {
                    }
                }
                do {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < 0.0), bool(bvec3((gl_FragCoord.y < 0.0), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), false)))))) {
                    continue;
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            discard;
                        }
                        break;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                    discard;
                                }
                            }
                        } else {
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        return;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        do {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            } else {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    discard;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        discard;
                                    } else {
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        if (_GLF_DEAD(false)) {
                            do {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))) {
                                    return;
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                            continue;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            continue;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            break;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    discard;
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                }
                if (_GLF_DEAD(false)) {
                    discard;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        continue;
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
            A[i / 4] = float(i);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                discard;
            }
            continue;
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
    } else {
        for (int i = 0; i < 50; i++) {
            if (i < int(gl_FragCoord.x)) {
                if (_GLF_DEAD(false)) {
                    break;
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                }
                break;
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    break;
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, (false) || false)) || false))) {
                    break;
                }
                if (_GLF_DEAD(false)) {
                    break;
                    if (_GLF_DEAD(false)) {
                        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            return;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        discard;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0))))))) {
                    return;
                } else {
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < 0.0, !(!(_GLF_IDENTITY(gl_FragCoord.y < 0.0, (_GLF_IDENTITY(gl_FragCoord.y < 0.0, bool(_GLF_IDENTITY(bvec2(gl_FragCoord.y < 0.0, false), bvec2(bvec2(bvec2(gl_FragCoord.y < 0.0, false))))))) || false)))))))) {
                            return;
                        }
                    } else {
                    }
                } else {
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    discard;
                }
            } else {
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                if (i > 0) {
                    A[i] += A[i - 1];
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, mat2(1.0) * (injectionSwitch)).x > injectionSwitch.y))), !(!(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, mat2(1.0) * (injectionSwitch)).x > injectionSwitch.y))))))) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                        if (_GLF_DEAD(false)) {
                            discard;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                    continue;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                break;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    vec2 c = pattern((_GLF_IDENTITY(15.0, (true ? 15.0 : _GLF_FUZZED(-4.3))) + tan(0.2)) * uv);
    vec3 col;
    if (int(gl_FragCoord.y) < 20) {
        col = .5 + cos(c.y + vec3(resolution.x, A[_GLF_IDENTITY(4, 0 + (4))] / resolution.x + 50.0, 22.0));
        if (_GLF_DEAD(false)) {
            return;
        }
        do {
            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, true, true, false))))) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    do {
                        return;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                } else {
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
    } else {
        if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) && (false)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                return;
            } else {
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
            if (_GLF_DEAD(false)) {
                do {
                    return;
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
            }
            do {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        continue;
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                    return;
                }
                do {
                    return;
                } while (_GLF_WRAPPED_LOOP(false));
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < 0.0), false || ((gl_FragCoord.y < 0.0))))));
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_DEAD(false)) {
                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        return;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
            } else {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), min(_GLF_IDENTITY(int(4), (int(4)) | (int(4))), int(4)))))); _injected_loop_counter--) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, max(_GLF_IDENTITY(injectionSwitch, vec2(injectionSwitch[0], injectionSwitch[1])), _GLF_IDENTITY(injectionSwitch, clamp(_GLF_IDENTITY(injectionSwitch, clamp(injectionSwitch, injectionSwitch, injectionSwitch)), _GLF_IDENTITY(injectionSwitch, mix(vec2((injectionSwitch)[0], _GLF_FUZZED(11.40)), vec2(_GLF_FUZZED(-203.370), (injectionSwitch)[1]), bvec2(false, true))), injectionSwitch)))).y)))) {
                        discard;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                discard;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        return;
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_DEAD(false))))) {
                                discard;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
        } else {
        }
        if (int(gl_FragCoord.y) < 40) {
            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                return;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(false)) {
                    return;
                }
                do {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, _GLF_IDENTITY(0.0, 1.0 * (0.0)))))))) {
                    } else {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        discard;
                                    }
                                    col = .5 + cos(c.y + vec3(resolution.x, A[9] / resolution.x + 50.0, 22.0));
                                } while (_GLF_WRAPPED_LOOP(false));
                            } else {
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                do {
                    return;
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return;
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                return;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            do {
                if (_GLF_DEAD(false)) {
                    return;
                }
            } while (_GLF_WRAPPED_LOOP(false));
        } else {
            do {
                if (int(_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])).y) < 60) {
                    col = _GLF_IDENTITY(.5 + cos(c.y + vec3(resolution.x, _GLF_IDENTITY(A[14] / _GLF_IDENTITY(resolution, vec2(1.0, 1.0) * (resolution)).x, min(A[14] / _GLF_IDENTITY(resolution, vec2(1.0, 1.0) * (resolution)).x, A[14] / _GLF_IDENTITY(resolution, vec2(1.0, 1.0) * (resolution)).x)) + _GLF_IDENTITY(50.0, (true ? _GLF_IDENTITY(50.0, max(50.0, 50.0)) : _GLF_FUZZED(9994.5768))), 22.0)), vec3(1.0, 1.0, 1.0) * (.5 + cos(c.y + vec3(resolution.x, _GLF_IDENTITY(A[14] / _GLF_IDENTITY(resolution, vec2(1.0, 1.0) * (resolution)).x, min(A[14] / _GLF_IDENTITY(resolution, vec2(1.0, 1.0) * (resolution)).x, A[14] / _GLF_IDENTITY(resolution, vec2(1.0, 1.0) * (resolution)).x)) + _GLF_IDENTITY(50.0, (true ? _GLF_IDENTITY(50.0, max(50.0, 50.0)) : _GLF_FUZZED(9994.5768))), 22.0))));
                    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), true && ((injectionSwitch.x > injectionSwitch.y))))), true && (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), true && ((injectionSwitch.x > injectionSwitch.y)))))))) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            } else {
                                return;
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                            }
                            return;
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                do {
                                    return;
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                discard;
                            }
                            do {
                                discard;
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                    }
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return;
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (_GLF_IDENTITY(!(false), (!(false)) || false))))))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, (_GLF_IDENTITY(injectionSwitch.y, _GLF_IDENTITY(0.0, max(0.0, 0.0)) + (injectionSwitch.y))) / exp(0.0)))))) {
                            continue;
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        }
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (int(gl_FragCoord.y) < 80) {
                        if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) && true)) {
                            break;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            continue;
                        }
                        do {
                            col = .5 + cos(c.y + _GLF_IDENTITY(vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0), (vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0)) + vec3(0.0, 0.0, 0.0)));
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                    discard;
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    } else {
                        if (_GLF_DEAD(false)) {
                            return;
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    discard;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < 0.0), true && ((gl_FragCoord.y < 0.0)))))) {
                        } else {
                            if (int(_GLF_IDENTITY(gl_FragCoord, mix(vec4(_GLF_FUZZED(81.37), _GLF_IDENTITY((gl_FragCoord)[1], float(mat2x4((gl_FragCoord)[1], 1.0, 0.0, 0.0, 1.0, 1.0, cos(0.0), 0.0))), (gl_FragCoord)[2], (gl_FragCoord)[3]), vec4((gl_FragCoord)[0], _GLF_FUZZED(0.3), _GLF_FUZZED(2.3), _GLF_FUZZED(934.184)), bvec4(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0))))).y) < 100) {
                                for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                    }
                                } else {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, true, true, true))))) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            continue;
                                        }
                                    }
                                }
                                col = _GLF_IDENTITY(.5, 0.0 + (.5)) + cos(_GLF_IDENTITY(c, clamp(c, c, c)).y + vec3(resolution.x, A[39] / _GLF_IDENTITY(resolution.x, (resolution.x) - _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, sqrt(1.0))), dot(vec2(0.0, 0.0), vec2(1.0, sqrt(_GLF_IDENTITY(1.0, max(1.0, 1.0))))))) + 50.0, 22.0));
                            } else {
                                for (int _injected_loop_counter = ((0 << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (_GLF_IDENTITY(int(7), (_GLF_IDENTITY(int(7), (_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))) ? _GLF_FUZZED(mix(-19595, findMSB(158206u), true)) : int(7)))) << 0)) - 0))) << _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                    if (_GLF_DEAD(false)) {
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                            discard;
                                        }
                                    }
                                    if (int(gl_FragCoord.y) < 120) {
                                        if (_GLF_DEAD(false)) {
                                            do {
                                                do {
                                                    discard;
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    continue;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                        }
                                        col = .5 + cos(c.y + vec3(resolution.x, A[39] / _GLF_IDENTITY(resolution.x, (resolution.x) + 0.0) + 50.0, 22.0));
                                    } else if (int(gl_FragCoord.y) < 140) {
                                        do {
                                            do {
                                                col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (_GLF_IDENTITY(true, bool(bvec4(true, false, true, false))))))) {
                                                    discard;
                                                } else {
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                do {
                                                    return;
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                        } else {
                                        }
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, clamp(injectionSwitch, injectionSwitch, _GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED(_GLF_IDENTITY(2.2, max(_GLF_IDENTITY(2.2, (true ? 2.2 : _GLF_FUZZED(7.7))), 2.2))), _GLF_IDENTITY(_GLF_FUZZED(9.0), float(mat4x2(_GLF_FUZZED(9.0), 0.0, 0.0, sqrt(0.0), 0.0, 0.0, 1.0, 1.0)))), vec2((injectionSwitch)[0], (injectionSwitch)[1]), bvec2(true, true))))).y)))) {
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            continue;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                return;
                                            }
                                        }
                                        if (int(gl_FragCoord.y) < 160) {
                                            if (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_IDENTITY(_GLF_DEAD(false), false || (_GLF_DEAD(false))))))) {
                                                break;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            if (_GLF_IDENTITY(_GLF_DEAD(false), false || (_GLF_DEAD(false)))) {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !_GLF_IDENTITY((_GLF_IDENTITY(!(false), (!(_GLF_IDENTITY(false, true && (false)))) && true)), _GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])).y < 0.0)) || (_GLF_IDENTITY((_GLF_IDENTITY(!(false), (!(_GLF_IDENTITY(false, true && (false)))) && true)), bool(bvec4((_GLF_IDENTITY(!(false), (!(_GLF_IDENTITY(false, true && (false)))) && true)), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))))))) {
                                                        break;
                                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))), false || (_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))))) {
                                                            if (_GLF_DEAD(false)) {
                                                                break;
                                                            }
                                                            discard;
                                                        }
                                                    }
                                                    continue;
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        discard;
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        continue;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, clamp(0.0, _GLF_IDENTITY(0.0, (true ? 0.0 : _GLF_FUZZED(2.0))), _GLF_IDENTITY(0.0, float(float(0.0))))))))) {
                                                    continue;
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                    return;
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                break;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    do {
                                                        do {
                                                            col = .5 + cos(c.y + vec3(_GLF_IDENTITY(resolution.x, (_GLF_IDENTITY(resolution.x, mix(float(_GLF_FUZZED(-7.9)), float(resolution.x), _GLF_IDENTITY(bool(true), bool(bvec3(bool(true), true, _GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))), (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))), (_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0))))) && true)) && true))))))) * _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0)))), A[_GLF_IDENTITY(39, (_GLF_IDENTITY(39, (39) - 0)) << 0)] / resolution.x + 50.0, 22.0));
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                } else {
                                                    do {
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                do {
                                                                    return;
                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                            } else {
                                                            }
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        break;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        break;
                                                    }
                                                    continue;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        discard;
                                                    }
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, min(injectionSwitch, _GLF_IDENTITY(injectionSwitch, (true ? injectionSwitch : _GLF_FUZZED(resolution))))).y)))) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            return;
                                                        }
                                                    } else {
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                    }
                                                }
                                            } else {
                                            }
                                            do {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    return;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                        } else if (int(gl_FragCoord.y) < 180) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    } else {
                                                        discard;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        continue;
                                                    }
                                                    discard;
                                                }
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                                    return;
                                                }
                                                do {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        discard;
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            } else {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    discard;
                                                }
                                                do {
                                                    col = .5 + cos(c.y + vec3(resolution.x, A[44] / resolution.x + 50.0, _GLF_IDENTITY(22.0, _GLF_IDENTITY(min(22.0, 22.0), min(_GLF_IDENTITY(min(22.0, 22.0), max(min(22.0, 22.0), _GLF_IDENTITY(min(22.0, 22.0), clamp(min(22.0, 22.0), min(22.0, 22.0), min(22.0, 22.0))))), _GLF_IDENTITY(min(22.0, 22.0), (min(22.0, 22.0)) / 1.0))))));
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    break;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            if (int(gl_FragCoord.y) < 200) {
                                                for (int _injected_loop_counter = _GLF_IDENTITY(0, (0) ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY(1, (1) << (0 | 0))); _injected_loop_counter++) {
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    } else {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            discard;
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                            }
                                                        }
                                                        col = .5 + _GLF_IDENTITY(cos(c.y + vec3(_GLF_IDENTITY(resolution.x, float(mat4(resolution.x, 0.0, log(1.0), 1.0, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, round(length(normalize(exp(vec4(0.0, 0.0, 0.0, 0.0))))), 0.0, 1.0))), _GLF_IDENTITY(A[49] / resolution.x + 50.0, max(A[49] / resolution.x + 50.0, _GLF_IDENTITY(A[49] / resolution.x + 50.0, min(A[49] / resolution.x + 50.0, A[49] / resolution.x + 50.0)))), 22.0)), mix(vec3(_GLF_FUZZED(315.151), _GLF_FUZZED(-12.04), (cos(c.y + vec3(_GLF_IDENTITY(resolution.x, float(mat4(resolution.x, _GLF_IDENTITY(_GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(((-3.5) * (-7.4)))), bool(false))), clamp(_GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(((-3.5) * (-7.4)))), bool(false))), _GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(((-3.5) * (-7.4)))), bool(false))), _GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(((-3.5) * (-7.4)))), bool(false))))), log(1.0), 1.0, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, round(length(normalize(exp(vec4(0.0, 0.0, 0.0, 0.0))))), 0.0, 1.0))), _GLF_IDENTITY(A[49] / resolution.x + 50.0, max(A[49] / resolution.x + 50.0, _GLF_IDENTITY(_GLF_IDENTITY(A[49] / resolution.x + 50.0, min(A[49] / resolution.x + 50.0, A[49] / resolution.x + _GLF_IDENTITY(50.0, (false ? _GLF_FUZZED(18.48) : 50.0)))), (false ? _GLF_FUZZED(-7.9) : _GLF_IDENTITY(_GLF_IDENTITY(A[49] / resolution.x + 50.0, min(A[49] / resolution.x + 50.0, A[49] / resolution.x + _GLF_IDENTITY(50.0, (false ? _GLF_FUZZED(18.48) : 50.0)))), mix(float(_GLF_FUZZED(86.56)), float(_GLF_IDENTITY(_GLF_IDENTITY(A[49] / resolution.x + 50.0, min(A[49] / resolution.x + 50.0, A[49] / resolution.x + _GLF_IDENTITY(50.0, (false ? _GLF_FUZZED(18.48) : 50.0)))), (_GLF_IDENTITY(A[49] / resolution.x + 50.0, min(A[49] / resolution.x + 50.0, A[49] / resolution.x + _GLF_IDENTITY(50.0, (false ? _GLF_FUZZED(18.48) : 50.0))))) / 1.0)), bool(true))))))), 22.0)))[2]), vec3((cos(c.y + vec3(_GLF_IDENTITY(resolution.x, float(mat4(resolution.x, 0.0, log(1.0), 1.0, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, round(length(_GLF_IDENTITY(normalize(exp(vec4(0.0, 0.0, 0.0, 0.0))), (false ? _GLF_FUZZED(vec4(-6.8, 729.093, -778.404, 53.43)) : normalize(exp(vec4(0.0, 0.0, 0.0, 0.0))))))), 0.0, 1.0))), _GLF_IDENTITY(A[49] / resolution.x + 50.0, max(A[49] / resolution.x + 50.0, _GLF_IDENTITY(A[49] / resolution.x + 50.0, min(A[49] / resolution.x + 50.0, A[49] / resolution.x + 50.0)))), _GLF_IDENTITY(22.0, max(_GLF_IDENTITY(22.0, (_GLF_IDENTITY(22.0, mix(float(22.0), float(_GLF_FUZZED(-1.4)), bool(false)))) / 1.0), _GLF_IDENTITY(22.0, mix(float(_GLF_FUZZED(-3.9)), float(22.0), bool(true))))))))[0], (cos(c.y + vec3(_GLF_IDENTITY(resolution.x, float(mat4(resolution.x, _GLF_IDENTITY(0.0, _GLF_IDENTITY((0.0), exp(0.0) * (_GLF_IDENTITY((0.0), 1.0 * ((0.0))))) / 1.0), log(1.0), 1.0, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, round(length(normalize(exp(vec4(0.0, 0.0, 0.0, 0.0))))), 0.0, 1.0))), _GLF_IDENTITY(A[49] / resolution.x + 50.0, max(A[49] / resolution.x + 50.0, _GLF_IDENTITY(A[49] / resolution.x + 50.0, min(A[49] / resolution.x + 50.0, A[49] / resolution.x + 50.0)))), 22.0)))[1], _GLF_FUZZED((3118.0712 - 4992.9790))), bvec3(true, true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)))));
                                                    }
                                                }
                                            } else {
                                                discard;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            break;
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, sqrt(0.0)), vec2(0.0, cos(0.0))), dot(vec2(1.0, sqrt(0.0)), vec2(0.0, cos(0.0)))))))) {
                                            discard;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_DEAD(_GLF_IDENTITY(false, true && (_GLF_IDENTITY(false, bool(bool(false)))))))))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    break;
                                                }
                                                discard;
                                            }
                                            return;
                                        }
                                        break;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < 0.0, (gl_FragCoord.y < 0.0) || false)))));
        }
    }
    for (int _injected_loop_counter = ((1 ^ 0) ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, min(gl_FragCoord.y, gl_FragCoord.y)) < 0.0)))) {
        } else {
            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])).y < 0.0)))) {
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return;
                    }
                    return;
                }
            }
            _GLF_color = vec4(col, 1.0);
        }
    }
}
