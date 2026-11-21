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

layout(set = 0, binding = 1) uniform buf1 {
    vec2 injectionSwitch;
};

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

vec3 pickColor(int i) {
    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (_GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, gl_FragCoord, _GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, gl_FragCoord, gl_FragCoord))))) + vec4(0.0, 0.0, 0.0, 0.0)).x < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, _GLF_IDENTITY(1.0, (1.0) + _GLF_IDENTITY(dot(vec3(log(1.0), 1.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0)))), vec3(1.0, 0.0, 1.0)), dot(vec3(log(1.0), 1.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0)))), vec3(1.0, 0.0, 1.0)))));
            }
        }
    } else {
        do {
            return vec3(float(i) / 50.0, float(_GLF_IDENTITY(i, _GLF_IDENTITY(0, int(ivec2(_GLF_IDENTITY(0, max(_GLF_IDENTITY(0, clamp(0, 0, 0)), _GLF_IDENTITY(0, (0) * 1))), (_GLF_IDENTITY(0 >> _GLF_IDENTITY(int(8), int(8)), ~(_GLF_IDENTITY(~(0 >> _GLF_IDENTITY(int(8), int(8))), 1 * (_GLF_IDENTITY(~(0 >> _GLF_IDENTITY(int(8), int(8))), min(~(0 >> _GLF_IDENTITY(int(8), int(8))), ~(0 >> _GLF_IDENTITY(int(8), int(8))))))))))))) ^ (i))) / 120.0, float(_GLF_IDENTITY(i, (true ? _GLF_IDENTITY(i, clamp(i, i, i)) : _GLF_FUZZED(i)))) / 140.0);
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, vec2(injectionSwitch[0], _GLF_IDENTITY(injectionSwitch[1], (injectionSwitch[1]) * 1.0))).x > injectionSwitch.y))));
    }
}

vec3 mand(float xCoord, float yCoord) {
    if (_GLF_DEAD(false)) {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, true && (false))) && true))) {
                return vec3(1.0, 1.0, 1.0);
            }
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    ivec3 GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos;
    int xpos = int(xCoord) * 256;
    int ypos = int(yCoord) * 256;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & 1)); _injected_loop_counter++) {
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    return vec3(1.0, 1.0, _GLF_IDENTITY(1.0, clamp(1.0, _GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0)), _GLF_IDENTITY(1.0, min(1.0, 1.0)))));
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
            }
        }
        return vec3(1.0, 1.0, 1.0);
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            do {
                return vec3(1.0, 1.0, 1.0);
            } while (_GLF_WRAPPED_LOOP(false));
        }
        return vec3(1.0, 1.0, 1.0);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                return vec3(1.0, 1.0, 1.0);
            }
        } else {
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
            return vec3(1.0, 1.0, _GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(((-765.380) + 3.6))), bool(false))));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(_GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0, 1.0);
            }
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return vec3(1.0, _GLF_IDENTITY(1.0, float(_GLF_IDENTITY(vec2(1.0, 1.0), (true ? vec2(1.0, 1.0) : _GLF_FUZZED(vec2(-6.6, -2.9)))))), 1.0);
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            return vec3(1.0, 1.0, 1.0);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.z = _GLF_IDENTITY(_GLF_IDENTITY(ypos, ~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))))), clamp(_GLF_IDENTITY(ypos, _GLF_IDENTITY(~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1)))), _GLF_IDENTITY(max(_GLF_IDENTITY(~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1)))), ~(~(~(_GLF_IDENTITY(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))), ~(~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1)))))))))), ~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))))), min(max(_GLF_IDENTITY(~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1)))), ~_GLF_IDENTITY((~(~(_GLF_IDENTITY(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))), ~(~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))))))))), min(_GLF_IDENTITY((~(~(_GLF_IDENTITY(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))), ~(~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))))))))), 1 * ((~(~(_GLF_IDENTITY(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))), ~(~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))))))))))), (~(~(_GLF_IDENTITY(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))), ~(~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1)))))))))))), ~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))))), max(_GLF_IDENTITY(~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1)))), ~(~(~(_GLF_IDENTITY(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))), ~(~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1)))))))))), ~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))))))))), _GLF_IDENTITY(_GLF_IDENTITY(ypos, ~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))))), ~(~(_GLF_IDENTITY(_GLF_IDENTITY(ypos, ~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1))))), 0 | (_GLF_IDENTITY(ypos, ~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1)))))))))), _GLF_IDENTITY(ypos, ~(_GLF_IDENTITY(~(ypos), int(ivec3(~(ypos), 0, 1)))))));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            do {
                return vec3(1.0, 1.0, 1.0);
            } while (_GLF_WRAPPED_LOOP(false));
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, !_GLF_IDENTITY((!(false)), bool(bvec2((!(false)), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))))))))) {
                return vec3(1.0, 1.0, 1.0);
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY((int(_GLF_ONE(1.0, injectionSwitch.y)) ^ 1), (_GLF_IDENTITY((int(_GLF_ONE(1.0, injectionSwitch.y)) ^ 1), ((int(_GLF_ONE(1.0, injectionSwitch.y)) ^ 1)) << 0)) | (_GLF_IDENTITY((int(_GLF_ONE(1.0, injectionSwitch.y)) ^ 1), ((int(_GLF_ONE(1.0, injectionSwitch.y)) ^ 1)) - 0)))); _injected_loop_counter--) {
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    break;
                                }
                                return vec3(1.0, 1.0, 1.0);
                            }
                            break;
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                }
                return vec3(1.0, 1.0, 1.0);
            }
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        do {
                            return vec3(_GLF_IDENTITY(1.0, float(mat3(1.0, 1.0, 1.0, _GLF_IDENTITY(0.0, min(_GLF_IDENTITY(0.0, max(0.0, 0.0)), 0.0)), _GLF_ONE(1.0, injectionSwitch.y), 1.0, 1.0, 0.0, 1.0))), 1.0, 1.0);
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(false)) {
                            return _GLF_IDENTITY(vec3(1.0, 1.0, 1.0), mix(vec3((vec3(1.0, 1.0, _GLF_IDENTITY(1.0, max(1.0, 1.0))))[0], _GLF_FUZZED(-4.6), (vec3(1.0, 1.0, 1.0))[2]), vec3(_GLF_FUZZED(7.6), (vec3(1.0, 1.0, 1.0))[1], _GLF_FUZZED(-6296.5542)), bvec3(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) && (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), false)));
                        }
                    }
                } else {
                }
                if (_GLF_DEAD(false)) {
                    return vec3(_GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(5041.2305)), bool(false))), 1.0, 1.0);
                }
                return vec3(1.0, 1.0, 1.0);
            } else {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                        break;
                    }
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), bool(bvec3(!(false), false, false))))))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            do {
                return vec3(1.0, 1.0, 1.0);
            } while (_GLF_WRAPPED_LOOP(false));
        }
        return vec3(1.0, 1.0, 1.0);
    }
    int height = int(resolution.y) * 256;
    for (int _injected_loop_counter = _GLF_IDENTITY(((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), 0 + (_GLF_IDENTITY(int(4), ~(~(int(4)))))))), (((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), 0 + (_GLF_IDENTITY(int(4), ~(~(int(4))))))))) ^ (int(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(int(3), int(3)))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_IDENTITY(_GLF_DEAD(false), false || (_GLF_DEAD(false)))) {
            continue;
        }
    }
    if (_GLF_DEAD(false)) {
        return _GLF_IDENTITY(vec3(1.0, 1.0, 1.0), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(sinh(vec3(-1.4, 0.2, -5.8))) : vec3(1.0, 1.0, 1.0)));
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, _GLF_IDENTITY(1.0, max(_GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0)));
        }
    }
    do {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                break;
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                do {
                    return vec3(1.0, 1.0, 1.0);
                } while (_GLF_WRAPPED_LOOP(false));
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                break;
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.x = height;
    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(!(false))))) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec2(false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))), false || (bool(bvec2(false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))))) {
            return vec3(1.0, 1.0, 1.0);
        }
    } else {
        if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, (0.0) / 1.0)))), true && (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, (0.0) / 1.0))))))) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    int width = int(resolution.x) * 256;
    if (_GLF_DEAD(false)) {
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    continue;
                }
                continue;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                    }
                    continue;
                }
                return vec3(1.0, 1.0, 1.0);
            }
        } while (_GLF_WRAPPED_LOOP(false));
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
    } else {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            return vec3(1.0, 1.0, 1.0);
        }
    }
    int c_re = ((xpos - _GLF_IDENTITY(width, (width) << 0) / _GLF_IDENTITY(2, (_GLF_IDENTITY(2, clamp(2, _GLF_IDENTITY(2, (2) + 0), 2))) << 0)) * 819) / width - 102;
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(_GLF_IDENTITY(injectionSwitch, _GLF_IDENTITY((injectionSwitch) * mat2(1.0), (_GLF_IDENTITY((injectionSwitch) * mat2(1.0), vec2(mat2((injectionSwitch) * mat2(1.0), 0.0, 0.0)))) - vec2(0.0, 0.0))).x, mix(float(_GLF_FUZZED(vec3(6.4, -459.317, -8.4).t)), float(_GLF_IDENTITY(_GLF_IDENTITY(injectionSwitch, _GLF_IDENTITY((injectionSwitch) * mat2(1.0), (_GLF_IDENTITY((injectionSwitch) * mat2(1.0), vec2(mat2((injectionSwitch) * mat2(1.0), 0.0, 0.0)))) - vec2(0.0, 0.0))).x, min(_GLF_IDENTITY(injectionSwitch, _GLF_IDENTITY((injectionSwitch) * mat2(1.0), (_GLF_IDENTITY((injectionSwitch) * mat2(1.0), vec2(mat2((injectionSwitch) * mat2(1.0), 0.0, 0.0)))) - vec2(0.0, _GLF_IDENTITY(0.0, mix(_GLF_IDENTITY(float(0.0), min(_GLF_IDENTITY(float(0.0), (false ? _GLF_FUZZED(28.12) : float(0.0))), float(0.0))), float(_GLF_FUZZED(505.594)), bool(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, (false ? _GLF_FUZZED(xCoord) : gl_FragCoord.x)) < 0.0)))))))).x, _GLF_IDENTITY(_GLF_IDENTITY(injectionSwitch, _GLF_IDENTITY((injectionSwitch) * mat2(1.0), (_GLF_IDENTITY((injectionSwitch) * mat2(1.0), vec2(mat2((injectionSwitch) * mat2(1.0), 0.0, 0.0)))) - vec2(0.0, 0.0))).x, min(_GLF_IDENTITY(injectionSwitch, _GLF_IDENTITY((injectionSwitch) * mat2(1.0), (_GLF_IDENTITY((injectionSwitch) * mat2(1.0), vec2(mat2((injectionSwitch) * mat2(1.0), 0.0, 0.0)))) - vec2(0.0, 0.0))).x, _GLF_IDENTITY(injectionSwitch, _GLF_IDENTITY((injectionSwitch) * mat2(1.0), (_GLF_IDENTITY((injectionSwitch) * mat2(1.0), vec2(mat2((_GLF_IDENTITY(injectionSwitch, (_GLF_IDENTITY(_GLF_IDENTITY(true, false || (true)), true && (_GLF_IDENTITY(_GLF_IDENTITY(true, false || (true)), bool(bool(_GLF_IDENTITY(_GLF_IDENTITY(true, false || (true)), _GLF_IDENTITY((_GLF_IDENTITY(true, false || (true))) && true, (_GLF_IDENTITY((_GLF_IDENTITY(true, false || (true))) && true, !(_GLF_IDENTITY(!((_GLF_IDENTITY(true, false || (true))) && true), !(!(!((_GLF_IDENTITY(true, false || (true))) && true))))))) || false))))))) ? injectionSwitch : _GLF_FUZZED(resolution)))) * mat2(1.0), 0.0, 0.0)))) - vec2(0.0, 0.0))).x))))), bool(true))) > injectionSwitch.y)))) {
        return _GLF_IDENTITY(vec3(1.0, 1.0, 1.0), (vec3(1.0, _GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0, 1.0)), 1.0)) * mat3(1.0));
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        return vec3(1.0, 1.0, 1.0);
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, _GLF_IDENTITY(float(_GLF_IDENTITY(mat3(gl_FragCoord.y, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)))), (false ? _GLF_FUZZED(mat3(892.766, -4266.0544, -127.216, -5321.4799, -2750.6734, 6699.8588, -4.9, 8869.3904, 822.063)) : mat3(gl_FragCoord.y, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0))))))), mix(float(_GLF_FUZZED(-7.8)), float(float(_GLF_IDENTITY(mat3(gl_FragCoord.y, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)))), (false ? _GLF_FUZZED(mat3(892.766, -4266.0544, -127.216, -5321.4799, -2750.6734, 6699.8588, -4.9, 8869.3904, 822.063)) : mat3(gl_FragCoord.y, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)))))))), bool(true)))) < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), (int(3)) / 1)))); _injected_loop_counter--) {
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_IDENTITY(_GLF_DEAD(false), _GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x < injectionSwitch.y, false || (_GLF_IDENTITY(injectionSwitch.x < injectionSwitch.y, false || (injectionSwitch.x < injectionSwitch.y)))))) && (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) && true)))) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, _GLF_IDENTITY(1.0, (true ? _GLF_IDENTITY(1.0, max(1.0, 1.0)) : _GLF_FUZZED(153.321))), 1.0);
        }
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true), _GLF_IDENTITY(bool(bool(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true))), !(!(bool(bool(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true)))))))), bool(_GLF_IDENTITY(bvec3(_GLF_DEAD(_GLF_IDENTITY(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true), _GLF_IDENTITY(bool(bool(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true))), !(!(bool(bool(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true)))))))), false, true), bvec3(bvec3(bvec3(_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true), _GLF_IDENTITY(bool(bool(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true))), !(!(bool(bool(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true)))))))), false || (_GLF_DEAD(_GLF_IDENTITY(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true), _GLF_IDENTITY(bool(bool(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true))), !(!(bool(bool(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true)))))))))), false, true))))))) {
        return vec3(1.0, 1.0, 1.0);
    }
    int c_im = _GLF_IDENTITY(((GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.z - GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.x / 2) * 819) / width, 0 | (((GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.z - GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.x / 2) * 819) / width));
    int x = 0, y = 0;
    for (int _injected_loop_counter = _GLF_IDENTITY(0, _GLF_IDENTITY((_GLF_IDENTITY(0, (0) * 1)) >> 0, ((_GLF_IDENTITY(0, (0) * 1)) >> 0) / 1)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    break;
                }
                continue;
            }
            break;
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
            do {
                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                    discard;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return vec3(1.0, 1.0, 1.0);
                        if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                            discard;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        discard;
                    } else {
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            continue;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                break;
                            }
                            return vec3(1.0, 1.0, 1.0);
                        } else {
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    continue;
                }
                _GLF_IDENTITY(GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.y = y, (0 << _GLF_IDENTITY(int(0), int(0))) | _GLF_IDENTITY((GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.y = y), ((_GLF_IDENTITY(GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.y = y, (GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.y = y) | 0))) - (0 | 0)));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    continue;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                        break;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return vec3(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, max(1.0, _GLF_IDENTITY(1.0, float(mat3(1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0))))))), 1.0, 1.0);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(_GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 0.0)), dot(vec2(0.0, 1.0), vec2(_GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 0.0))))))) {
                    continue;
                    if (_GLF_DEAD(false)) {
                        continue;
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                break;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                break;
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (false) || false))) {
        } else {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                return vec3(1.0, 1.0, 1.0);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        return vec3(1.0, 1.0, 1.0);
                    } else {
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true))) {
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    return vec3(1.0, 1.0, 1.0);
                }
            }
            return vec3(1.0, 1.0, 1.0);
        }
    } else {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    if (_GLF_IDENTITY(_GLF_DEAD(false), bool(bvec2(_GLF_DEAD(false), false)))) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    return vec3(1.0, 1.0, 1.0);
                }
                do {
                    return vec3(1.0, 1.0, 1.0);
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, !(!(injectionSwitch.x > injectionSwitch.y))))))) {
                        break;
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            }
        } else {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                return vec3(1.0, 1.0, 1.0);
            }
        }
        return vec3(_GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0, 1.0);
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    int iteration = _GLF_IDENTITY(0, (0) << 0);
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
        for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), 1 * (int(5))))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 ^ (0 ^ 0))); _injected_loop_counter++) {
            if (_GLF_DEAD(false)) {
                for (int _injected_loop_counter = (12055 & 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 | int(_GLF_ONE(1.0, injectionSwitch.y)))); _injected_loop_counter++) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    return vec3(1.0, 1.0, 1.0);
                }
            }
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec2(true, true))))) {
        if (_GLF_DEAD(false)) {
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                return vec3(1.0, 1.0, 1.0);
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    return vec3(1.0, _GLF_IDENTITY(1.0, (1.0) - sin(0.0)), 1.0);
                }
            } else {
            }
        }
        if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))), (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))) && true)) {
            return vec3(1.0, 1.0, 1.0);
        }
    } else {
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, _GLF_IDENTITY(bool(bvec4(gl_FragCoord.x < 0.0, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false)), _GLF_IDENTITY(bool(bool(bool(bvec4(gl_FragCoord.x < 0.0, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false)))), !(!(bool(bool(bool(bvec4(gl_FragCoord.x < 0.0, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false))))))))))))) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                return vec3(1.0, 1.0, 1.0);
            }
        } while (_GLF_WRAPPED_LOOP(false));
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    continue;
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                        discard;
                    }
                    discard;
                }
            } else {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord.y < determinant(mat3(0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, max(0.0, 0.0)), 0.0, determinant(mat2(1.0, 0.0, 0.0, 1.0)), _GLF_ONE(1.0, injectionSwitch.y), 0.0)), !(!(gl_FragCoord.y < determinant(mat3(_GLF_IDENTITY(0.0, (false ? _GLF_FUZZED(yCoord) : 0.0)), 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, max(0.0, 0.0)), 0.0, determinant(mat2(1.0, 0.0, 0.0, 1.0)), _GLF_ONE(1.0, injectionSwitch.y), 0.0))))), bool(bvec4(_GLF_IDENTITY(gl_FragCoord.y < determinant(mat3(0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, max(0.0, 0.0)), 0.0, determinant(mat2(1.0, 0.0, 0.0, 1.0)), _GLF_ONE(1.0, injectionSwitch.y), 0.0)), !(!(gl_FragCoord.y < determinant(mat3(_GLF_IDENTITY(0.0, (false ? _GLF_IDENTITY(_GLF_FUZZED(yCoord), mix(float(_GLF_FUZZED((true ? 910.241 : (-500.931)))), float(_GLF_FUZZED(yCoord)), bool(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x)))))) : 0.0)), 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, max(0.0, 0.0)), 0.0, determinant(mat2(1.0, 0.0, 0.0, 1.0)), _GLF_ONE(1.0, injectionSwitch.y), 0.0))))), true, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true))))))) {
                    return vec3(1.0, _GLF_IDENTITY(1.0, mix(float(_GLF_IDENTITY(1.0, max(1.0, _GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0))))), float(_GLF_FUZZED(0.9)), bool(false))), 1.0);
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                            }
                            return vec3(_GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0, 1.0);
                        }
                        return vec3(1.0, 1.0, 1.0);
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
            }
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, (true ? injectionSwitch : _GLF_FUZZED(clamp(vec2(611.708, -5296.0587), resolution, vec2(-883.597, 8.9))))).x > injectionSwitch.y)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        for (int _injected_loop_counter = (int(_GLF_ZERO(0.0, injectionSwitch.x)) >> _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
            for (int _injected_loop_counter = _GLF_IDENTITY(0, _GLF_IDENTITY((0) | 0, _GLF_IDENTITY(((0) | 0), 0 ^ (_GLF_IDENTITY(((0) | 0), ~(_GLF_IDENTITY(~(((0) | 0)), ~(~(~(((0) | 0))))))))) - 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                do {
                    for (int k = 0; k < 1000; k++) {
                        if (_GLF_IDENTITY(x * x, (_GLF_IDENTITY(x * x, (x * x) >> 0)) - 0) + GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.y * _GLF_IDENTITY(GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.y, clamp(GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.y, GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.y, GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.y)) > 262144) {
                            if (_GLF_DEAD(false)) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, clamp(_GLF_IDENTITY(gl_FragCoord.y, mix(float(_GLF_FUZZED(-9.6)), float(gl_FragCoord.y), bool(true))), gl_FragCoord.y, gl_FragCoord.y)) < 0.0)))) {
                                continue;
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, _GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? 1.0 : _GLF_FUZZED(xCoord))))));
                                }
                            }
                        }
                        int x_new = ((x * _GLF_IDENTITY(x, clamp(x, _GLF_IDENTITY(x, (x) | (_GLF_IDENTITY(x, (x) - 0))), x)) - GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.y * _GLF_IDENTITY(GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos, _GLF_IDENTITY(ivec3(ivec4(GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos, ((1 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), _GLF_IDENTITY((true ? int(5) : _GLF_FUZZED(xpos)), ((true ? int(5) : _GLF_FUZZED(xpos))) | (0 >> _GLF_IDENTITY(int(2), int(2))))))) >> _GLF_IDENTITY(int(5), int(5))))), (ivec3(ivec4(_GLF_IDENTITY(GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos, (GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos) << ivec3(0, 0, 0)), ((1 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), _GLF_IDENTITY((true ? int(5) : _GLF_FUZZED(xpos)), ((true ? int(5) : _GLF_IDENTITY(_GLF_FUZZED(xpos), ~(_GLF_IDENTITY(~(_GLF_IDENTITY(_GLF_FUZZED(xpos), (_GLF_FUZZED(xpos)) - 0)), clamp(_GLF_IDENTITY(~(_GLF_IDENTITY(_GLF_FUZZED(xpos), (_GLF_FUZZED(xpos)) - 0)), (~(_GLF_IDENTITY(_GLF_FUZZED(xpos), (_GLF_FUZZED(xpos)) - 0))) - 0), ~(_GLF_IDENTITY(_GLF_FUZZED(xpos), (_GLF_FUZZED(xpos)) - 0)), ~(_GLF_IDENTITY(_GLF_FUZZED(xpos), (_GLF_FUZZED(xpos)) - 0)))))))) | (0 >> _GLF_IDENTITY(int(2), int(2))))))) >> _GLF_IDENTITY(int(5), int(5)))))) | (ivec3(1, 1, 1) ^ ivec3(1, 1, 1)))).y) / 256 + c_re);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, clamp(_GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), _GLF_IDENTITY(0.0, 0.0 + (0.0)), 0.0)))))) {
                            continue;
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, _GLF_IDENTITY(injectionSwitch.x, mix(float(_GLF_FUZZED(9.2)), float(_GLF_IDENTITY(injectionSwitch.x, (false ? _GLF_FUZZED(xCoord) : injectionSwitch.x))), bool(true)))))))) {
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.y = (2 * _GLF_IDENTITY(x, 0 + (x)) * _GLF_IDENTITY(GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.y, (GLF_merged3_0_1_6_1_1_1_2_1_4heightyypos.y) ^ _GLF_IDENTITY(0, int(int(0)))) / 256 + c_im);
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _GLF_IDENTITY(_injected_loop_counter++, (false ? _GLF_FUZZED((x)) : _GLF_IDENTITY(_injected_loop_counter++, ~(~(_GLF_IDENTITY(_injected_loop_counter++, (_injected_loop_counter++) ^ 0))))))) {
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                do {
                                    x = x_new;
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            } else {
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(347.618)), float(0.0), bool(true)))), bool(_GLF_IDENTITY(bvec2((gl_FragCoord.y < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(347.618)), float(0.0), bool(true)))), true), bvec2(bvec4(bvec2((gl_FragCoord.y < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(347.618)), float(0.0), bool(true)))), true), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), true)))))))) {
                                if (_GLF_IDENTITY(_GLF_DEAD(false), !(_GLF_IDENTITY(!(_GLF_DEAD(false)), !(!(!(_GLF_DEAD(false)))))))) {
                                    continue;
                                }
                                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), !(!(_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) && true))))) {
                                    continue;
                                }
                                discard;
                            }
                            continue;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            do {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) || false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(8), int(8))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                return vec3(1.0, 1.0, _GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED((+2.8))), float(1.0), bool(true))));
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                return vec3(1.0, 1.0, 1.0);
                                            }
                                            break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        continue;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            continue;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), bool(bvec2(!(false), false))))))) {
                                    } else {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            return _GLF_IDENTITY(vec3(1.0, 1.0, 1.0), _GLF_IDENTITY(mat3(1.0) * (vec3(1.0, 1.0, 1.0)), max(mat3(1.0) * (vec3(1.0, 1.0, 1.0)), mat3(1.0) * (_GLF_IDENTITY(vec3(1.0, 1.0, 1.0), (false ? _GLF_FUZZED(vec3(-6.8, 4.7, -2.8)) : _GLF_IDENTITY(vec3(1.0, 1.0, 1.0), mix(vec3((vec3(1.0, 1.0, 1.0))[0], (vec3(1.0, 1.0, 1.0))[1], _GLF_FUZZED(-1.0)), vec3(_GLF_FUZZED(-90.87), _GLF_FUZZED(((-993.143) + (-66.59))), (vec3(1.0, 1.0, 1.0))[2]), bvec3(false, false, true)))))))));
                                        } else {
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            discard;
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        discard;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                    discard;
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        discard;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.x >= length(vec4(0.0, 0.0, 0.0, 0.0)), !(!(_GLF_IDENTITY(gl_FragCoord.x >= length(vec4(0.0, 0.0, 0.0, 0.0)), false || (gl_FragCoord.x >= length(vec4(0.0, 0.0, 0.0, 0.0))))))))))) {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                return vec3(1.0, 1.0, 1.0);
                                            }
                                            return _GLF_IDENTITY(vec3(1.0, 1.0, 1.0), clamp(_GLF_IDENTITY(vec3(1.0, 1.0, 1.0), mix(vec3((vec3(1.0, 1.0, 1.0))[0], _GLF_FUZZED((-9.4)), (vec3(1.0, 1.0, 1.0))[2]), vec3(_GLF_FUZZED(183.561), (vec3(1.0, 1.0, 1.0))[1], _GLF_FUZZED(-6.6)), bvec3(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true, false))), vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)));
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                do {
                                                    if (_GLF_DEAD(false)) {
                                                        return vec3(1.0, 1.0, 1.0);
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                return _GLF_IDENTITY(vec3(1.0, 1.0, 1.0), vec3(mat4x2(_GLF_IDENTITY(vec3(1.0, 1.0, 1.0), (vec3(1.0, 1.0, 1.0)) + vec3(0.0, 0.0, 0.0)), 0.0, 0.0, 1.0, 0.0, determinant(mat2(1.0, 1.0, 0.0, 1.0)))));
                                            }
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                                continue;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (_GLF_IDENTITY(1, clamp(1, 1, _GLF_IDENTITY(1, (1) - 0))) ^ 0)); _injected_loop_counter++) {
                                                    discard;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            continue;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                        continue;
                                        if (_GLF_DEAD(false)) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            discard;
                                        }
                                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter != 1, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (_GLF_IDENTITY(_injected_loop_counter != 1, bool(bvec2(_injected_loop_counter != 1, _GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, !(!(injectionSwitch.x > injectionSwitch.y))))))))))); _injected_loop_counter++) {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    continue;
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (true ? gl_FragCoord : _GLF_FUZZED(_GLF_color))).x < 0.0)), bool(bool(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (true ? gl_FragCoord : _GLF_FUZZED(_GLF_color))).x < 0.0))))))) {
                                                } else {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, _GLF_IDENTITY(clamp(injectionSwitch.x, injectionSwitch.x, _GLF_IDENTITY(injectionSwitch.x, min(injectionSwitch.x, injectionSwitch.x))), (_GLF_IDENTITY(clamp(injectionSwitch.x, injectionSwitch.x, _GLF_IDENTITY(injectionSwitch.x, min(injectionSwitch.x, injectionSwitch.x))), max(clamp(injectionSwitch.x, injectionSwitch.x, _GLF_IDENTITY(injectionSwitch.x, min(injectionSwitch.x, injectionSwitch.x))), clamp(injectionSwitch.x, injectionSwitch.x, _GLF_IDENTITY(injectionSwitch.x, min(injectionSwitch.x, injectionSwitch.x)))))) - 0.0)) > injectionSwitch.y)))) {
                                                        discard;
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x < injectionSwitch.y, (injectionSwitch.x < injectionSwitch.y) || _GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
                                                    return vec3(1.0, _GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0)), 1.0);
                                                } else {
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                                discard;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return vec3(1.0, 1.0, 1.0);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                            continue;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bvec2(false, _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))), _GLF_IDENTITY(bvec2(bvec3(bvec2(false, _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))), false)), bvec2(bvec3(bvec2(bvec3(bvec2(false, _GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch.y, float(mat4x2(_GLF_IDENTITY(injectionSwitch.y, (false ? _GLF_FUZZED(yCoord) : injectionSwitch.y)), 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, _GLF_ZERO(0.0, injectionSwitch.x))))))), false)), false)))))))) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, mix(float(_GLF_FUZZED((-12.10))), float(injectionSwitch.x), bool(true))) > injectionSwitch.y)))) {
                                break;
                            }
                            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), bool(_GLF_IDENTITY(bool(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))), false || (bool(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))))) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter > 0, bool(bool(_injected_loop_counter > 0)))); _injected_loop_counter--) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                return vec3(1.0, 1.0, 1.0);
                                            }
                                            return vec3(1.0, _GLF_IDENTITY(1.0, float(vec4(1.0, exp(0.0), 1.0, _GLF_ZERO(0.0, injectionSwitch.x)))), 1.0);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                    } else {
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, vec2(injectionSwitch[0], injectionSwitch[_GLF_IDENTITY(1, (_GLF_IDENTITY(1, (1) ^ 0)) / 1)])).y)), _GLF_IDENTITY(bool(bvec3(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, vec2(injectionSwitch[0], injectionSwitch[_GLF_IDENTITY(1, (_GLF_IDENTITY(1, (1) ^ 0)) / 1)])).y)), false, false)), (bool(bvec3(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, vec2(injectionSwitch[0], injectionSwitch[_GLF_IDENTITY(1, (_GLF_IDENTITY(1, (1) ^ 0)) / 1)])).y)), false, false))) || false)))) {
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                discard;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        continue;
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), false || ((injectionSwitch.x > injectionSwitch.y)))))) {
                                                discard;
                                            }
                                            discard;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                return vec3(1.0, 1.0, 1.0);
                                            }
                                            discard;
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, false))))) {
                                        continue;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        continue;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))) || false))) {
                                    discard;
                                }
                                continue;
                            }
                        } else {
                            if (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_IDENTITY(_GLF_DEAD(false), bool(bvec4(_GLF_DEAD(false), false, false, true))))))) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                discard;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, 0.0 + (_GLF_IDENTITY(injectionSwitch.x, (false ? _GLF_FUZZED(xCoord) : injectionSwitch.x)))) > injectionSwitch.y)))) {
                            discard;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, mix(float(gl_FragCoord.y), float(_GLF_FUZZED((+7706.8653))), bool(false))) < 0.0)))) {
                            continue;
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                        }
                        iteration++;
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            return vec3(1.0, 1.0, 1.0);
                        } else {
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    discard;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    discard;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                return vec3(1.0, 1.0, 1.0);
            }
            return vec3(1.0, _GLF_IDENTITY(1.0, (1.0) - 0.0), 1.0);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, mix(float(injectionSwitch.y), float(_GLF_FUZZED(-128.002)), bool(false))))))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < abs(0.0), !(!(_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord.x < abs(0.0), true && (gl_FragCoord.x < abs(0.0))), !(!(_GLF_IDENTITY(gl_FragCoord.x < abs(0.0), true && (gl_FragCoord.x < abs(0.0))))))))))))) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                return vec3(1.0, 1.0, _GLF_IDENTITY(1.0, min(_GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(-7.3)), _GLF_IDENTITY(bool(false), bool(bool(_GLF_IDENTITY(bool(false), true && (bool(false)))))))), 1.0)));
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(1.0, 0.0, round(length(normalize(1.0))), 1.0), vec4(0.0, 1.0, 0.0, 0.0)), _GLF_IDENTITY(dot(vec4(1.0, 0.0, round(length(normalize(1.0))), 1.0), vec4(0.0, 1.0, 0.0, 0.0)), float(mat2x4(dot(vec4(1.0, 0.0, round(length(normalize(1.0))), 1.0), vec4(0.0, 1.0, 0.0, 0.0)), 0.0, 0.0, _GLF_IDENTITY(dot(vec4(1.0, tan(0.0), 0.0, 0.0), vec4(1.0, sin(0.0), 0.0, 0.0)), dot(vec4(1.0, tan(0.0), 0.0, 0.0), vec4(1.0, sin(0.0), 0.0, 0.0))), _GLF_ONE(1.0, injectionSwitch.y), 1.0, abs(1.0), 1.0)))))))) {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], _GLF_IDENTITY(gl_FragCoord[2], max(gl_FragCoord[2], gl_FragCoord[2])), gl_FragCoord[3])).y < 0.0)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    return vec3(_GLF_IDENTITY(1.0, float(vec3(_GLF_IDENTITY(1.0, max(1.0, 1.0)), 0.0, 1.0))), 1.0, 1.0);
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec3(0.0, 0.0, 0.0)))))) {
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            break;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            } else {
                do {
                    do {
                        for (int _injected_loop_counter = _GLF_IDENTITY(0, (0) ^ 0); _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter < 1, (_injected_loop_counter < 1) || false)); _injected_loop_counter++) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, _GLF_IDENTITY((injectionSwitch.x), max(_GLF_IDENTITY((injectionSwitch.x), ((injectionSwitch.x)) - 0.0), _GLF_IDENTITY((injectionSwitch.x), max((injectionSwitch.x), (injectionSwitch.x))))) - 0.0) > injectionSwitch.y)))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                discard;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            discard;
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, max(injectionSwitch.y, injectionSwitch.y))), ((injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, max(injectionSwitch.y, injectionSwitch.y)))) && true)))) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), bool(bool(!(false))))))))))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            return vec3(1.0, _GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(68.05) : 1.0)), 1.0);
                        }
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), (int(5)) >> 0))) >> _GLF_IDENTITY(_GLF_IDENTITY(int(5), int(5)), clamp(_GLF_IDENTITY(_GLF_IDENTITY(int(5), int(5)), (false ? _GLF_FUZZED(xpos) : _GLF_IDENTITY(int(5), int(5)))), _GLF_IDENTITY(int(5), int(5)), _GLF_IDENTITY(int(5), int(5)))))); _injected_loop_counter++) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    discard;
                                }
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                    discard;
                                }
                                return vec3(1.0, 1.0, 1.0);
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bvec2(false, true), bvec2(bvec2(bvec2(false, true)))))))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                    }
                }
            } else {
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(_GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(_GLF_IDENTITY(float(-51600), float(_GLF_IDENTITY(vec2(float(-51600), 1.0), (false ? _GLF_FUZZED(resolution) : vec2(float(-51600), 1.0))))))), float(0.0), bool(true)))))))) {
                    return vec3(_GLF_IDENTITY(1.0, max(1.0, _GLF_IDENTITY(1.0, min(_GLF_IDENTITY(1.0, 0.0 + (1.0)), 1.0)))), 1.0, 1.0);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED(26.99)), float(1.0), bool(true)))) - length(vec4(0.0, 0.0, 0.0, 0.0))), 1.0);
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                    } else {
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, (true ? 0.0 : _GLF_FUZZED(sin(xCoord)))))))) {
                    return vec3(_GLF_IDENTITY(1.0, mix(float(_GLF_IDENTITY(1.0, max(1.0, 1.0))), float(_GLF_FUZZED(float(false))), bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))), 1.0, 1.0);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        } else {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (iteration < 1000) {
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return vec3(1.0, 1.0, 1.0);
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                    }
                }
                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), bool(_GLF_IDENTITY(bool(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))), !(!(bool(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))))))) {
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    return vec3(1.0, 1.0, 1.0);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord.y, (gl_FragCoord.y) - 0.0) < 0.0, true && (_GLF_IDENTITY(gl_FragCoord.y, (gl_FragCoord.y) - 0.0) < 0.0)))))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                return vec3(1.0, 1.0, 1.0);
                for (int _injected_loop_counter = ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(_GLF_IDENTITY(int(5), int(5)), 0 + (_GLF_IDENTITY(int(5), int(5))))) >> _GLF_IDENTITY(int(5), int(5))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(false)) {
                                break;
                                if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                    break;
                                }
                            }
                            return vec3(1.0, 1.0, 1.0);
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        continue;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (_GLF_IDENTITY(_GLF_IDENTITY(0, (0) / (1 & 1)) ^ 1, (false ? _GLF_FUZZED(width) : (_GLF_IDENTITY(0, (0) / (1 & 1)) ^ 1))))); _injected_loop_counter++) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                            break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            return vec3(1.0, 1.0, 1.0);
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                        } else {
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                            discard;
                                        }
                                        if (_GLF_IDENTITY(_GLF_DEAD(false), bool(bvec4(_GLF_IDENTITY(_GLF_DEAD(false), !(!_GLF_IDENTITY((_GLF_DEAD(false)), true && (_GLF_IDENTITY((_GLF_DEAD(false)), !(!((_GLF_DEAD(false))))))))), _GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))), true, false)))) {
                                            discard;
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                                if (_GLF_DEAD(false)) {
                                                    return vec3(1.0, 1.0, 1.0);
                                                }
                                                discard;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    discard;
                                                }
                                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 1.0, 0.0)), dot(vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 1.0, 0.0))))), bool(bool(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 1.0, 0.0)), dot(vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 1.0, 0.0)))))))))) {
                                                    continue;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                discard;
                                            }
                                        } else {
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                continue;
                                            }
                                            break;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                    }
                                    return _GLF_IDENTITY(vec3(1.0, 1.0, 1.0), (vec3(1.0, 1.0, 1.0)) / vec3(1.0, 1.0, 1.0));
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    return vec3(_GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0, 1.0);
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        break;
                                    }
                                }
                            }
                        }
                        return _GLF_IDENTITY(vec3(1.0, 1.0, 1.0), mix(vec3(_GLF_FUZZED(-40.16), _GLF_FUZZED(3.8), _GLF_FUZZED(_GLF_IDENTITY(-6.0, mix(float(_GLF_FUZZED(8864.1409)), float(-6.0), bool(true))))), vec3((vec3(1.0, 1.0, 1.0))[0], (vec3(1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0))))[1], (vec3(1.0, 1.0, 1.0))[2]), _GLF_IDENTITY(bvec3(true, true, true), bvec3(bvec4(bvec3(true, true, true), true)))));
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                }
            }
            do {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, max(_GLF_IDENTITY(0.0, min(_GLF_IDENTITY(0.0, (0.0) - 0.0), 0.0)), 0.0)))))) {
                        continue;
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(_GLF_IDENTITY(true, (true) || false)))))) {
                                    return vec3(1.0, 1.0, 1.0);
                                } else {
                                }
                            }
                            do {
                                return vec3(1.0, 1.0, 1.0);
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return vec3(1.0, 1.0, 1.0);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                break;
                            }
                        }
                        discard;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        discard;
                    }
                    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec4(false, false, false, false)), (bool(bvec4(false, false, false, _GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(false), bool(_GLF_IDENTITY(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), bvec2(bvec4(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), false, false)))))), (bool(_GLF_IDENTITY(bool(false), bool(_GLF_IDENTITY(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), bvec2(bvec4(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), false, false))))))) || false))))) && _GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.x, (gl_FragCoord.x) + tan(0.0)) >= 0.0))))), (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec4(false, false, false, false)), (bool(bvec4(false, false, false, _GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(false), bool(_GLF_IDENTITY(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), bvec2(bvec4(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), false, false)))))), (bool(_GLF_IDENTITY(bool(false), bool(_GLF_IDENTITY(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), bvec2(bvec4(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), false, false))))))) || false))))) && _GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.x, (gl_FragCoord.x) + tan(0.0)) >= 0.0))))), _GLF_IDENTITY(bool(bvec2(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec4(false, false, false, false)), (bool(bvec4(false, false, false, _GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(false), bool(_GLF_IDENTITY(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), bvec2(bvec4(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), false, false)))))), (bool(_GLF_IDENTITY(bool(false), bool(_GLF_IDENTITY(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), bvec2(bvec4(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), false, false))))))) || false))))) && _GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.x, (gl_FragCoord.x) + tan(0.0)) >= 0.0))))), true)), true && (bool(bvec2(_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec4(false, false, false, false)), (bool(bvec4(false, false, false, _GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(false), bool(_GLF_IDENTITY(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), bvec2(bvec4(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), false, false)))))), (bool(_GLF_IDENTITY(bool(false), bool(_GLF_IDENTITY(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), bvec2(bvec4(bvec2(bool(false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), false, false))))))) || false))))) && _GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.x, (gl_FragCoord.x) + tan(0.0)) >= 0.0))))), true)))))) || false)) {
                        continue;
                    }
                }
                return pickColor(iteration);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    do {
                        return vec3(1.0, 1.0, 1.0);
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    for (int _injected_loop_counter = (((1 ^ 1) << _GLF_IDENTITY(int(5), int(5))) << _GLF_IDENTITY(int(4), int(4))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _GLF_IDENTITY(_injected_loop_counter++, (true ? (_injected_loop_counter++) : _GLF_FUZZED(width)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            return vec3(1.0, 1.0, 1.0);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            break;
                        }
                        if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), !(!(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
                            continue;
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        break;
                    }
                    continue;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0)))))), _GLF_IDENTITY(!(!(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0)))))))), false || (!(!(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0)))))))))))) {
                        break;
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, (_GLF_IDENTITY(gl_FragCoord.x, mix(float(_GLF_FUZZED(-226.301)), float(gl_FragCoord.x), bool(true)))) - 0.0) < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            break;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            discard;
                        }
                        discard;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(_GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(-6.4)), float(0.0), bool(true))), (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? _GLF_IDENTITY(_GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(-6.4)), float(0.0), bool(true))), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))) * (_GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(-6.4)), float(0.0), bool(true))))) : _GLF_FUZZED(-28.32))))))) {
                            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) && true))) {
                                discard;
                            }
                            break;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            } else {
                                return vec3(1.0, 1.0, 1.0);
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                continue;
                            }
                        }
                    }
                    do {
                        discard;
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
        } else {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            do {
                do {
                    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), true && (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, min(gl_FragCoord.y, gl_FragCoord.y)) < 0.0)))))) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec3(cos(0.0), 0.0, 0.0), vec3(0.0, 1.0, exp(0.0))), dot(_GLF_IDENTITY(vec3(cos(0.0), 0.0, 0.0), (false ? _GLF_FUZZED(vec3(9174.6851, -743.431, 9.8)) : vec3(cos(0.0), _GLF_IDENTITY(0.0, min(0.0, _GLF_IDENTITY(0.0, (0.0) - 0.0))), 0.0))), vec3(0.0, 1.0, exp(0.0)))))))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < 0.0), true && ((gl_FragCoord.x < 0.0)))))) {
                                return vec3(1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, _GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED(-158.089)), float(1.0), bool(true))))));
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < 0.0, bool(_GLF_IDENTITY(bvec2(gl_FragCoord.y < 0.0, _GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0)))))), bvec2(bvec4(bvec2(gl_FragCoord.y < 0.0, _GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0)))))), true, true))))))))) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                        } else {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x), (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x)) || _GLF_FALSE(false, (gl_FragCoord.y < tan(0.0)))))))) {
                                    return vec3(1.0, 1.0, 1.0);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                }
                            }
                        }
                        break;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                            break;
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                                return vec3(1.0, 1.0, 1.0);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    break;
                                }
                            }
                            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), false || (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), false || (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))))) {
                                continue;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    discard;
                                }
                            }
                            break;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            continue;
                        }
                        do {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_IDENTITY(_GLF_DEAD(false), bool(bool(_GLF_DEAD(false))))) {
                                    break;
                                    for (int _injected_loop_counter = (1 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), clamp(int(_GLF_ZERO(0.0, injectionSwitch.x)), int(_GLF_ZERO(0.0, injectionSwitch.x)), int(_GLF_ZERO(0.0, _GLF_IDENTITY(injectionSwitch.x, min(injectionSwitch.x, _GLF_IDENTITY(injectionSwitch, (injectionSwitch) / vec2(1.0, 1.0)).x))))))); _injected_loop_counter--) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            discard;
                                        }
                                    }
                                }
                                return vec3(0.0, 0.0, _GLF_IDENTITY(0.5, (true ? _GLF_IDENTITY(0.5, (0.5) / 1.0) : _GLF_FUZZED(xCoord))));
                                if (_GLF_DEAD(_GLF_IDENTITY(false, true && (_GLF_IDENTITY(false, _GLF_IDENTITY(true && (false), _GLF_IDENTITY(!(_GLF_IDENTITY(!(true && (false)), _GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x, mix(float(_GLF_IDENTITY(injectionSwitch.x, (injectionSwitch.x) * 1.0)), float(_GLF_FUZZED((+(-0.7)))), bool(false))) < injectionSwitch.y)) && (!(true && (false))))), !(_GLF_IDENTITY(!(!(_GLF_IDENTITY(!(true && (false)), _GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x, mix(float(_GLF_IDENTITY(injectionSwitch.x, (injectionSwitch.x) * 1.0)), float(_GLF_FUZZED((+(-0.7)))), bool(false))) < injectionSwitch.y)) && (!(true && (false)))))), bool(bool(_GLF_IDENTITY(!(!(_GLF_IDENTITY(!(true && (false)), _GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x, mix(float(_GLF_IDENTITY(injectionSwitch.x, (injectionSwitch.x) * 1.0)), float(_GLF_FUZZED((+(-0.7)))), bool(false))) < injectionSwitch.y)) && (!(true && (false)))))), (!(!(_GLF_IDENTITY(!(true && (false)), _GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x, mix(float(_GLF_IDENTITY(injectionSwitch.x, (injectionSwitch.x) * 1.0)), float(_GLF_FUZZED((+(-0.7)))), bool(false))) < injectionSwitch.y)) && (!(true && (false))))))) && _GLF_IDENTITY(true, !(!(true))))))))))))))) {
                                    discard;
                                }
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    } else {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                do {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                    continue;
                                }
                                return vec3(1.0, 1.0, 1.0);
                                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])).y < determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    break;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                return vec3(1.0, 1.0, 1.0);
                                if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, !(!(false)))) && _GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))) {
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    return _GLF_IDENTITY(vec3(1.0, 1.0, 1.0), max(vec3(1.0, 1.0, 1.0), _GLF_IDENTITY(vec3(1.0, 1.0, 1.0), (vec3(1.0, 1.0, 1.0)) * mat3(1.0))));
                                }
                            } else {
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                return vec3(_GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0, 1.0);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    break;
                                }
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            return vec3(1.0, 1.0, 1.0);
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            do {
                return vec3(1.0, 1.0, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, float(mat3x2(1.0, 1.0, 0.0, 0.0, 0.0, 1.0)))) - 0.0));
            } while (_GLF_WRAPPED_LOOP(false));
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, _GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0)), 1.0);
                }
                return vec3(1.0, 1.0, 1.0);
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x < injectionSwitch.y, !(_GLF_IDENTITY(!(injectionSwitch.x < injectionSwitch.y), true && (!(injectionSwitch.x < injectionSwitch.y))))))))) {
                        return vec3(1.0, 1.0, 1.0);
                    } else {
                    }
                }
            }
        }
    }
}

void main() {
    vec3 data[16];
    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))), !(!(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0))))))))) {
        return;
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            do {
                return;
            } while (_GLF_WRAPPED_LOOP(false));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        } else {
            do {
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    discard;
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
        }
    } else {
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return;
    }
    for (int i = 0; i < _GLF_IDENTITY(4, ~(~(4))); i++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            break;
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(false)) {
                break;
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                if (_GLF_DEAD(false)) {
                    continue;
                }
                for (int j = 0; _GLF_IDENTITY(j, int(ivec4(j, _GLF_IDENTITY(int(_GLF_ONE(1.0, injectionSwitch.y)), max(int(_GLF_ONE(1.0, injectionSwitch.y)), int(_GLF_ONE(1.0, injectionSwitch.y)))), _GLF_IDENTITY(1, ~(~(1))), 1))) < 4; j++) {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter--) {
                        do {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, max(_GLF_IDENTITY(injectionSwitch, clamp(injectionSwitch, injectionSwitch, injectionSwitch)), injectionSwitch)).y)))) {
                                return;
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(vec4(gl_FragCoord))).x < 0.0))));
                        do {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        discard;
                                    }
                                }
                                do {
                                    do {
                                        if (_GLF_IDENTITY(_GLF_DEAD(false), bool(bool(_GLF_DEAD(false))))) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        return;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            break;
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(_GLF_IDENTITY(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), bool(bool(!(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, clamp(gl_FragCoord.x, gl_FragCoord.x, gl_FragCoord.x)) < 0.0)))))))))) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                return;
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            } else {
                                                for (int _injected_loop_counter = int(_GLF_ONE(1.0, _GLF_IDENTITY(injectionSwitch, _GLF_IDENTITY((injectionSwitch), mix(vec2(((injectionSwitch))[0], _GLF_IDENTITY(((injectionSwitch))[1], 1.0 * (((injectionSwitch))[1]))), vec2(_GLF_FUZZED(1.6), _GLF_FUZZED(vec2(-52.36, 7.1).x)), bvec2(_GLF_IDENTITY(false, !(!(false))), false))) - vec2(0.0, 0.0)).y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter--) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        continue;
                                                    }
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord.x, (false ? _GLF_FUZZED(-41.89) : _GLF_IDENTITY(gl_FragCoord.x, clamp(gl_FragCoord.x, gl_FragCoord.x, gl_FragCoord.x)))) < 0.0, bool(bvec3(_GLF_IDENTITY(gl_FragCoord.x, (false ? _GLF_FUZZED(-41.89) : _GLF_IDENTITY(gl_FragCoord.x, clamp(gl_FragCoord.x, gl_FragCoord.x, gl_FragCoord.x)))) < 0.0, _GLF_IDENTITY(true, (true) && true), false))))))) {
                                        return;
                                    }
                                } else {
                                    data[4 * j + i] = mand(gl_FragCoord.x + float(i - 1), _GLF_IDENTITY(gl_FragCoord.y, mix(float(_GLF_FUZZED((vec3(429.691, -9806.6414, _GLF_IDENTITY(29.48, _GLF_IDENTITY(clamp(_GLF_IDENTITY(29.48, clamp(29.48, 29.48, _GLF_IDENTITY(29.48, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? 29.48 : _GLF_FUZZED(round(81.70)))))), 29.48, 29.48), float(vec2(_GLF_IDENTITY(clamp(_GLF_IDENTITY(29.48, clamp(29.48, 29.48, _GLF_IDENTITY(29.48, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? 29.48 : _GLF_FUZZED(round(81.70)))))), 29.48, 29.48), min(clamp(_GLF_IDENTITY(29.48, clamp(29.48, 29.48, _GLF_IDENTITY(29.48, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? 29.48 : _GLF_FUZZED(_GLF_IDENTITY(round(81.70), (false ? _GLF_FUZZED(-_GLF_IDENTITY(6.5, (6.5) / 1.0)) : round(81.70)))))))), 29.48, 29.48), _GLF_IDENTITY(clamp(_GLF_IDENTITY(29.48, clamp(29.48, 29.48, _GLF_IDENTITY(29.48, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? 29.48 : _GLF_FUZZED(round(81.70)))))), 29.48, 29.48), float(mat2(clamp(_GLF_IDENTITY(29.48, clamp(29.48, 29.48, _GLF_IDENTITY(29.48, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? 29.48 : _GLF_FUZZED(round(81.70)))))), 29.48, 29.48), 0.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)), _GLF_IDENTITY(1.0, clamp(1.0, _GLF_IDENTITY(1.0, min(_GLF_IDENTITY(1.0, 1.0 * (1.0)), 1.0)), 1.0))))))), 0.0))))).x))), float(gl_FragCoord.y), bool(true))) + float(j - _GLF_IDENTITY(1, (true ? 1 : _GLF_FUZZED(i)))));
                                }
                                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), false || (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
                                    return;
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                }
            }
        } else {
        }
        if (_GLF_DEAD(false)) {
            break;
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
        }
    }
    vec3 sum = vec3(0.0);
    do {
        if (_GLF_DEAD(false)) {
            break;
        }
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((_GLF_IDENTITY(gl_FragCoord.x, (gl_FragCoord.x) + 0.0) < _GLF_ZERO(0.0, injectionSwitch.x)), !(!((_GLF_IDENTITY(gl_FragCoord.x, (gl_FragCoord.x) + 0.0) < _GLF_ZERO(0.0, injectionSwitch.x)))))))) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_DEAD(false)) {
                        do {
                            return;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return;
                    }
                }
                if (_GLF_DEAD(false)) {
                    break;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        discard;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))) && true))) {
                            return;
                        } else {
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        discard;
                    }
                    return;
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        do {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                continue;
                            }
                            do {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                return;
                            } while (_GLF_WRAPPED_LOOP(false));
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                if (_GLF_DEAD(false)) {
                    continue;
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                }
                return;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                continue;
            }
        } while (_GLF_WRAPPED_LOOP(false));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            break;
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord.x < sqrt(0.0), !(!(_GLF_IDENTITY(gl_FragCoord.x < sqrt(0.0), (gl_FragCoord.x < sqrt(0.0)) && true)))), true && (_GLF_IDENTITY(gl_FragCoord.x < sqrt(0.0), !(!(_GLF_IDENTITY(gl_FragCoord.x < sqrt(0.0), (gl_FragCoord.x < sqrt(0.0)) && true))))))))));
    for (int i = 0; _GLF_IDENTITY(i, (false ? _GLF_FUZZED(i) : i)) < 16; i++) {
        sum += data[i];
        if (_GLF_DEAD(false)) {
            continue;
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
        if (_GLF_DEAD(false)) {
            break;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(length(tan(vec4(0.0, 0.0, 0.0, 0.0))), min(length(tan(vec4(0.0, 0.0, 0.0, 0.0))), length(tan(vec4(0.0, 0.0, 0.0, 0.0))))))))) {
                continue;
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
        return;
        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, (false) && true))))))))) {
            return;
            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, true))))) {
                return;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    sum /= vec3(16.0);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, _GLF_IDENTITY(min(_GLF_IDENTITY(0.0, (0.0) * 1.0), 0.0), mix(float(_GLF_FUZZED(2422.2385)), float(_GLF_IDENTITY(min(_GLF_IDENTITY(0.0, (0.0) * 1.0), 0.0), float(mat4x2(min(_GLF_IDENTITY(0.0, (0.0) * 1.0), 0.0), 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0)))), bool(true)))))))) {
        if (_GLF_DEAD(false)) {
            do {
                if (_GLF_DEAD(false)) {
                    return;
                }
                return;
            } while (_GLF_WRAPPED_LOOP(false));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                return;
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, min(gl_FragCoord, gl_FragCoord)).x < 0.0)))) {
                    return;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return;
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            return;
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                return;
            }
            return;
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, (injectionSwitch.x > injectionSwitch.y) || false))))) {
                        return;
                    }
                }
            } else {
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                    return;
                }
                return;
            }
        }
        for (int _injected_loop_counter = (((0 | 1) << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (int(7)) - 0))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), (false ? _GLF_FUZZED(87564) : int(2)))))); _injected_loop_counter--) {
            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), false || (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, (true ? _GLF_IDENTITY(injectionSwitch.y, max(_GLF_IDENTITY(injectionSwitch.y, mix(float(_GLF_FUZZED(-2.2)), float(injectionSwitch.y), bool(true))), injectionSwitch.y)) : _GLF_FUZZED(-3.9))))))))) {
                return;
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                break;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(false)) {
        return;
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
            return;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return;
    }
    _GLF_color = vec4(sum, 1.0);
    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
        if (_GLF_DEAD(false)) {
            return;
        }
        return;
        if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), false || (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), true && (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))))) {
            return;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(false)) {
            return;
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < 0.0), bool(bool(_GLF_IDENTITY((gl_FragCoord.x < 0.0), bool(bvec4(_GLF_IDENTITY((gl_FragCoord.x < 0.0), bool(bvec2((gl_FragCoord.x < 0.0), true))), true, false, true))))))))) {
                    return;
                }
                return;
            }
        }
        return;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return;
        }
        return;
    }
}
