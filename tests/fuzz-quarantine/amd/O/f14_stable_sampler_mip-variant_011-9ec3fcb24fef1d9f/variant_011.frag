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
layout(set = 0, binding = 0) uniform sampler2D tex;

void main() {
    for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(8), _GLF_IDENTITY(int(8), (_GLF_IDENTITY(int(8), ~(~(int(8))))) | (_GLF_IDENTITY(int(8), max(int(8), int(8))))))); _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(41.75, -7.4, -50.47, -343.929);
            if (_GLF_DEAD(false)) {
                _GLF_color = asin(_GLF_color);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = atan(_GLF_color);
        }
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((0 | 1) | 1)); _injected_loop_counter++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            } else {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = (dFdxCoarse(_GLF_color) * vec4(697.846, -5.3, 5007.6929, -458.348));
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = dFdyFine(vec4(86.28, -8280.5768, 0.5, 1.1));
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(826.581, 0.1, 7.9, 7.1);
                        }
                        _GLF_color = refract(faceforward(_GLF_color, _GLF_color, (injectionSwitch * mat4x2(-2.3, 3.2, 717.839, -2.2, -147.436, 2.1, 2188.4316, -9669.3356))), _GLF_color, uintBitsToFloat(9179u));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-8.3, 9309.3286, -0.2, -3.8);
                }
            }
            do {
                _GLF_color = exp2(vec4(-8.9, -7.3, 6.5, 61.78));
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = ceil(_GLF_color);
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = mod(_GLF_color, max(injectionSwitch.g, 4.0));
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            do {
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 1)); _injected_loop_counter++) {
                    _GLF_color = (+_GLF_color);
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
            _GLF_color = _GLF_color;
        }
    } while (_GLF_WRAPPED_LOOP(false));
    vec2 coord = gl_FragCoord.xy * (1.0 / 256.0);
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            do {
                _GLF_color = vec4(-2693.1293, -3.8, 1681.2343, -1.5);
            } while (_GLF_WRAPPED_LOOP(false));
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = (fwidth(_GLF_color) + _GLF_color);
        }
    } else {
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = _GLF_color;
    }
    vec4 res = vec4(0.25);
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(835.621, 25.63, -2.8, -778.289);
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = vec4(-7.2, 2.4, 4565.6651, 5.1);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = mat3x4(-926.859, 788.575, -8.8, 7.4, -94.34, -4.7, 3.7, -1120.0639, -0.6, 7271.2943, 795.889, -17.19)[2];
            }
        } else {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-8.8, 1843.3633, 9738.8752, 997.403);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = (vec4(68.34, -4.2, 4.9, -6.0) * mat4(665.132, 6568.6806, 8170.7213, 498.599, -9435.6561, 9.6, 348.501, 854.755, -8436.0856, 31.28, 72.21, 50.18, -7.1, -4.5, -6679.8676, -1.3));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = _GLF_color;
        }
    }
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        for (int _injected_loop_counter = ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (int(7)) | (int(7))))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    _GLF_color = res;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = roundEven(res);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = acosh(res);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = trunc(_GLF_color);
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = exp2(res);
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = vec4(-2.4, 4.2, 10.96, -9301.3778);
            }
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = reflect(vec4(7141.3422, -1.4, 62.13, 2.9).wwyz, ldexp((vec3(-0.2, -3684.4528, 9304.5066) * mat4x3(-560.923, 8204.2927, 6.6, -2.2, 775.494, 6.5, 7.9, -6271.4687, 9.7, 77.62, 12.18, -3.6)), ivec4(-79384, -19562, -85987, 59270)));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = ceil(ldexp(res, ivec4(-12276, -64032, 1821, 64764)));
            }
        } else {
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = res;
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
    } else {
        coord *= 2.0;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = res;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        } else {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = res;
        }
    }
    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = uintBitsToFloat(uvec4(53653u, 62199u, 171140u, 82410u));
        }
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, (false ? _GLF_FUZZED(-41722) : 1))); _injected_loop_counter++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = (res + (-4721.9491));
                }
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    _GLF_color = mat3x4(4429.0078, -7.8, 8271.1870, -2118.5866, -408.163, 8.8, -0.9, 156.109, 262.679, -0.8, -91.78, -2.0)[1];
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = res;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-9.3, 7636.9219, -818.677, 82.67);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                        _GLF_color = (5873.4757 * _GLF_color);
                    }
                }
                do {
                    _GLF_color = _GLF_color;
                } while (_GLF_WRAPPED_LOOP(false));
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = uintBitsToFloat(uvec4(146007u, 81866u, 162375u, 199915u));
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = _GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(false)) {
            _GLF_color = (intBitsToFloat(-48296) / intBitsToFloat(ivec4(-70122, 97840, -47665, -97617)));
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            _GLF_color = (res / length(coord));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = vec4(-0.6, -120.033, 9.8, 8.6);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = res;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = res;
                        }
                        _GLF_color = vec4(-3.8, -89.72, -2445.6511, 0.8);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = pow((_GLF_color - res), vec4(6359.4568, -9.5, 7.3, 6.8));
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                do {
                    _GLF_color = vec4(-0.1, 68.38, -43.93, -60.33);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                        _GLF_color = fwidthCoarse(vec4(5565.1608, 0.4, 2.3, -8356.1222));
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
        for (int _injected_loop_counter = (27718 & 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                do {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(bvec3(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, true))))) {
                        } else {
                            _GLF_color = vec4(5.4, -805.661, -8.8, -68.23);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = log(vec4(-6.9, 334.621, -3.8, -7.3));
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = sign(res);
    }
    int i = 0;
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            _GLF_color = dFdx(_GLF_color);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = mix((injectionSwitch * mat4x2(7.1, 753.139, -5923.9731, -3.6, 7.9, 3887.4609, 9.6, 106.505)), max(faceforward(res, res, res), -686.926), dFdyFine(0.7));
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = dFdx(res);
                }
                _GLF_color = res;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            do {
                if (_GLF_DEAD(false)) {
                    _GLF_color = unpackSnorm4x8(194243u);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(7065.5761, -859.879, 191.921, 6404.7161);
                    }
                }
                _GLF_color = uintBitsToFloat(uvec4(8688u, 187454u, 176776u, 99387u));
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = (_GLF_color - (-605.318));
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-2.3, -39.77, -1514.3970, 8.9);
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = res;
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = res;
                        }
                        _GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-83.21, -890.915, -6585.5551, -917.235);
                        }
                    }
                }
                _GLF_color = res;
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-99.44, -2463.8147, 374.835, 51.30);
                }
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = (+vec4(-1.1, 8.0, -6.2, -728.679));
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                do {
                    while (i < 1 && coord.x > 1.0 || coord.y > 1.0) {
                        do {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                _GLF_color = res;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = fract(vec4(90.72, -6382.0906, 31.70, -1.5));
                                }
                            }
                            do {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = atan(vec4(-4929.1422, 29.10, -128.923, 55.82));
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, cos(0.0)), vec2(1.0, 0.0)), dot(vec2(0.0, cos(0.0)), vec2(1.0, 0.0))))))) {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(0.0))))) {
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                        _GLF_color = (vec4(9.9, 47.71, -9713.2294, 9.0) * mat4(-720.446, -5531.4233, 6792.0653, -9.8, -59.58, -3.4, -304.769, -2.9, 80.37, 500.984, -8.6, -4.1, -4.2, -5.3, 911.852, 2147.3786));
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(2593.7613, -117.830, 6.9, 5.1);
                                        }
                                    }
                                } else {
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (+_GLF_color);
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(0.6, -82.94, -398.255, 59.94);
                                                }
                                                _GLF_color = mix(_GLF_color, _GLF_color, bvec4(false, false, true, false));
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = uintBitsToFloat((uvec3(196546u, 165313u, 55858u)[2] / (179714u | uvec4(89895u, 101272u, 118335u, 88923u))));
                                                }
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = smoothstep(5614.4514, 707.811, res);
                                }
                            } else {
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-6.9, 1.3, injectionSwitch);
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(97.40, 1159.4173, 84.80, -8.4);
                                    }
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = res;
                                            }
                                            _GLF_color = vec4(exp2(-5358.5631), vec3(-78.15, 454.462, 1.8));
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = ((-24.70) - res);
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = step(2.0, vec4(498.267, 92.79, 3584.0175, 1647.1903));
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = res;
                                            }
                                            _GLF_color = _GLF_color;
                                        }
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter++) {
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > ((0 & (-22375)) << _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter--) {
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(0, (0) >> 0)); _injected_loop_counter--) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(1.7, -6984.6865, 9.6, 5.1);
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(72.30, 7689.1770, -7.8, 78.74);
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = (mat2x4(46.57, -8.1, 8.4, 8259.8312, -8.7, -3607.3337, -1.8, -86.27) * coord);
                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                                            _GLF_color = vec4(-859.301, 2074.8278, 1.7, -363.078);
                                                        }
                                                    } else {
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = ((-7037.8682) + res);
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = max(smoothstep(_GLF_color, res, _GLF_color), res);
                                                        }
                                                        _GLF_color = (+refract(vec4(4.4, 8.9, 9164.6552, -79.55), res, 559.983));
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec3(0.0, 0.0, 0.0)))))) {
                                                        _GLF_color = vec4(vec3(-2.2, 2.5, 9.2), -4996.0525);
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = res;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = _GLF_color;
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                        }
                                                    }
                                                }
                                                for (int _injected_loop_counter = (1 & int(_GLF_ONE(1.0, injectionSwitch.y))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                                        _GLF_color = vec4(-3.8, 47.87, 390.742, -0.2);
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    _GLF_color = _GLF_color.aaab;
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = smoothstep(vec4(-0.0, -9.7, -6.6, 4.8), intBitsToFloat(ivec4(-33222, 82219, -42899, 93514)), smoothstep(res, _GLF_color, tan(res)));
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = degrees(_GLF_color);
                                                        }
                                                        _GLF_color = min(res, -0.9);
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = res;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = trunc(_GLF_color);
                                        }
                                    }
                                }
                            }
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(0), int(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 1)); _injected_loop_counter++) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_color;
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = log(res);
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = (mat3x4(-5.7, 170.402, 211.772, -6736.6797, 8.7, 8797.3210, 59.68, -7870.7026, -348.904, 3.3, 5.6, -1362.1049) * min(vec3(6.9, 285.010, 6.1), -8.9));
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = ldexp(_GLF_color, ivec4(-96190, -66125, 35438, 11786));
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = trunc(res);
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = acosh(vec4(84.02, 3.1, -0.3, -4.1));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(9.3, 3.0, -4.0, -544.020);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                            _GLF_color = (624.200 + mat2x4(3.6, 6.6, -7.1, -3644.1979, -3.7, 6.6, -7793.3577, -6.8))[1];
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = res;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(1.0, 0.0, sqrt(1.0)), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, 0.0, sqrt(1.0)), vec3(0.0, 1.0, 0.0))))))) {
                                _GLF_color = res;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = dFdyFine(res);
                                    } else {
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                }
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = degrees(atan(res));
                            }
                        }
                        do {
                            do {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, max(1, _GLF_IDENTITY(1, (1) | 0)))); _injected_loop_counter++) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 0.0, round(length(normalize(1.0))), _GLF_ZERO(0.0, injectionSwitch.x), 0.0, 0.0, sqrt(0.0), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(8.3, 4068.1204, 9.3, 2399.9184);
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            } else {
                                                _GLF_color = res;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = injectionSwitch.tstt;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(sqrt(0.0)))))) {
                                    _GLF_color = ((-6.8) / res);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = vec4(-5.6, -14.87, -5.5, -442.280);
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(47.55, vec3(-5741.7393, -2.7, -4.6));
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = (vec3(8.3, -97.41, 54.04) * (mat4x3(384.878, 99.45, -3.3, -5.3, 4.2, -5.3, 1804.3318, -5663.5182, 8.2, 766.451, 2.9, 3.2) + mat4x3(8.5, -7106.8646, 539.085, -0.0, 543.667, -857.950, -80.27, -132.399, 77.24, -5234.0115, -1.8, 964.472)));
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (vec4(-5.3, 7.8, vec2(7.3, 9.1)) / (-6.2));
                                    }
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = sinh(uintBitsToFloat(uvec4(134431u, 108531u, 51245u, 179978u)));
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(79.29, -270.548, -2916.3855, 7.9);
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = dFdyCoarse(_GLF_color);
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-7.4, -7.3, -718.966, 7.9);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            for (int _injected_loop_counter = (int(_GLF_ONE(1.0, injectionSwitch.y)) & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > (int(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter--) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = exp2(mod(res, 7.0));
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-6.5, -48.72, 966.873, 68.91);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(7867.6470, 9819.9850, 510.982, 3.3);
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                                do {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = atan(vec4(5.9, 10.82, 160.226, -96.14));
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            _GLF_color = inversesqrt((mat4(-7733.5442, 21.19, -21.19, 9.8, -47.57, 1420.0333, 821.820, 6.3, 2.8, 803.390, -5027.4584, 1.0, 7.5, 7.8, -6.0, 110.850) * vec4(-1.8, -4.7, -80.23, 0.3)));
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = radians(_GLF_color);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = fwidthCoarse(vec4(9.4, -681.028, 7.6, 35.20));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = vec4(1547.3105, 64.18, -4.7, -2.4);
                                }
                                _GLF_color = res;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = dFdxFine(res);
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = ((res + 91.42) / _GLF_color);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = _GLF_color;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                        _GLF_color = mat2x4(28.70, 3.5, 9988.8733, -66.47, 55.82, 1703.4669, 9172.1135, 674.178)[1];
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (coord.x > 1.0) {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = (mat4(4.4, -3.3, -44.90, 8.0, 78.79, 31.41, -463.981, 8.3, 1993.3437, -6526.5093, -5.7, 785.249, 756.151, -4.5, -43.35, 105.831) * res);
                                                        }
                                                        _GLF_color = vec4(6.5, -8.4, -106.766, -4.3);
                                                    }
                                                    do {
                                                        _GLF_color = uintBitsToFloat((uvec4(99298u, 62872u, 121626u, 50160u) + 93782u));
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, true && (false)))) {
                                                    } else {
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(1.0))))) {
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                    } else {
                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                        } else {
                                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                                _GLF_color = _GLF_color;
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
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-803.470, 513.168, 4.9, -854.638);
                                            }
                                            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = vec4(fwidthFine(4.4), vec3(-269.749, 5.9, 89.04));
                                                    }
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            } else {
                                                                _GLF_color = (res / _GLF_color);
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(4483.9181, -1234.0809, -60.74, -797.796);
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = vec4(-329.993, -7.1, 6.7, 2.1);
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = _GLF_color;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = fract(vec4(30.77, 7.3, 0.2, -99.58));
                                                                }
                                                                _GLF_color = (dFdyCoarse(_GLF_color) / vec4(-2.0, -30.66, 451.269, 5.4));
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = res;
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                _GLF_color = res;
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = uintBitsToFloat(uvec4(175794u, 37778u, 29500u, 103164u));
                                                                        }
                                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                                                            _GLF_color = dFdxCoarse(_GLF_color);
                                                                        }
                                                                        _GLF_color = sinh(_GLF_color);
                                                                    }
                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                        _GLF_color = _GLF_color;
                                                                    }
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, 0.0, 1.0, sqrt(0.0))))))) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            _GLF_color = res;
                                                                        }
                                                                        do {
                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                                                _GLF_color = (res);
                                                                            }
                                                                            _GLF_color = res;
                                                                            if (_GLF_DEAD(false)) {
                                                                                _GLF_color = _GLF_color;
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                                    }
                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = _GLF_color;
                                                                        }
                                                                    } else {
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = _GLF_color;
                                                                        }
                                                                        if (_GLF_DEAD(false)) {
                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                    _GLF_color = (_GLF_color - (-12.88));
                                                                                } else {
                                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                        _GLF_color = res;
                                                                                    }
                                                                                }
                                                                            }
                                                                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, true, false, true))))) {
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                                                                    _GLF_color = vec4(0.8, -3.8, -4699.2394, 3611.6784);
                                                                                }
                                                                                _GLF_color = atan((mat4(546.251, 541.744, 9.3, 1.3, -9.5, -19.09, 1401.1201, 993.305, -840.624, -59.81, 2.9, 879.206, -3.8, -571.359, 8530.7308, 4.5) * _GLF_color));
                                                                            }
                                                                            _GLF_color = vec4(-9078.2192, 6041.8058, 2153.5399, -6779.3934);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        } else {
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = vec4(8.8, -4.8, 29.00, 51.88);
                                                        }
                                                        do {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                _GLF_color = res;
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = intBitsToFloat(ivec4(i, ivec2(-50564, 85802), -54552));
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = fwidthFine(vec4(0.5, 484.541, 9.6, 7219.7295));
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        _GLF_color = vec4(-3.0, -8.3, -37.31, -9.2);
                                                                    }
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = vec4(-2301.1739, -381.053, -6.7, -4033.6922);
                                                                    }
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = floor(step(vec4(-2.6, 8.5, -6.3, 348.058), res));
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = sqrt(vec4(8.5, -7.9, 427.233, -3.9));
                                                                        }
                                                                    }
                                                                    _GLF_color = vec4(6364.4992, 4469.3484, -97.61, 968.187);
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                for (int _injected_loop_counter = ((0 << _GLF_IDENTITY(int(3), int(3))) | (0 >> _GLF_IDENTITY(int(5), int(5)))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                    _GLF_color = (injectionSwitch * mat4x2(-463.229, 995.680, -744.897, -4924.2403, -7.7, 938.083, -376.309, 670.724));
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            } else {
                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                } else {
                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = res;
                                                                        }
                                                                        _GLF_color = _GLF_color;
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = vec4(-2850.6693, -96.56, -999.287, -877.686);
                                                                        }
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            _GLF_color = _GLF_color;
                                                                        }
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    _GLF_color = clamp(res, res, res);
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                _GLF_color = step(vec4(-6222.9184, -901.183, -4036.3669, 360.063), _GLF_color);
                                                            }
                                                        }
                                                    } else {
                                                    }
                                                    do {
                                                        do {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = mix(vec4(-9468.7616, 9.6, 4.9, -5229.7235), res, res);
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    _GLF_color = _GLF_color;
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = vec4(-261.411, -9.0, -91.32, -147.209);
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = mat4(1422.2845, 5.8, -1035.2806, 18.86, -218.461, 133.934, -28.79, 1.2, 9782.7309, -58.25, -3.1, 96.04, 291.879, -567.314, -60.64, -0.5)[3];
                                                            }
                                                            do {
                                                                _GLF_color = (cosh(87.26) * intBitsToFloat(ivec4(56761, -53824, 4587, -78137)));
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0))))));
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = res;
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            } else {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = vec4(7582.7539, -9.3, 6436.0347, -42.63);
                                                                }
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            _GLF_color = (false ? mod(res, -9.7) : _GLF_color);
                                                                        }
                                                                        _GLF_color = vec4(-2.1, -93.02, -1.4, -215.750);
                                                                    }
                                                                } else {
                                                                }
                                                            }
                                                        } else {
                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 0)); _injected_loop_counter--) {
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            _GLF_color = exp2(vec4(5328.7901, 8915.0601, 88.04, -0.2));
                                                                        } else {
                                                                        }
                                                                    } else {
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    for (int _injected_loop_counter = ((0 & 42299) >> _GLF_IDENTITY(int(3), int(3))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                            _GLF_color = _GLF_color;
                                                                        }
                                                                    }
                                                                    if (_GLF_DEAD(false)) {
                                                                        do {
                                                                            do {
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                    } else {
                                                                                        _GLF_color = vec4(-7196.2255, 455.651, 3029.6913, 8.0);
                                                                                    }
                                                                                }
                                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                _GLF_color = _GLF_color;
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                                    }
                                                                }
                                                            } else {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = fma(vec4(4202.5430, -9322.7097, 14.29, -98.77), (false ? _GLF_color : _GLF_color), _GLF_color);
                                                                }
                                                                do {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                        _GLF_color = (-_GLF_color);
                                                                    }
                                                                    _GLF_color = clamp(((_GLF_color / (-316.304)) + injectionSwitch[0]), faceforward(_GLF_color, vec4(-85.85, -2.6, -7.2, -5.0), vec4(-8.6, 821.539, -34.32, -973.598)), vec4(-5.2, 5455.9015, 6958.3733, 6467.4467));
                                                                    if (_GLF_DEAD(false)) {
                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                        } else {
                                                                            _GLF_color = res;
                                                                        }
                                                                    }
                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                                _GLF_color = vec4(-78.89, -2.3, -9470.7777, 77.24);
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = dFdy(log(vec4(-9.2, 34.51, 1712.3584, 4.1)));
                                                    }
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    _GLF_color = res;
                                                                }
                                                                do {
                                                                    _GLF_color = _GLF_color;
                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                            }
                                                        } else {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(2225.5929, 607.605, 1617.2466, -69.00);
                                                            }
                                                        }
                                                    } else {
                                                        if (_GLF_DEAD(false)) {
                                                            do {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                            _GLF_color = (+sqrt(res));
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        } else {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(-3731.0625, 3.1, -9.2, 8625.0908);
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = min(max(_GLF_color, -0.2), 432.722);
                                                        }
                                                    }
                                                }
                                            } else {
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                for (int _injected_loop_counter = _GLF_IDENTITY(1, (1) | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                    do {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = res;
                                                            }
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = vec4(28.33, -2926.4055, -6.9, 6136.4950);
                                                                }
                                                            } else {
                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                } else {
                                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter++) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            if (_GLF_DEAD(false)) {
                                                                                _GLF_color = _GLF_color;
                                                                            }
                                                                            _GLF_color = _GLF_color;
                                                                        }
                                                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), clamp(int(0), int(0), int(0)))))); _injected_loop_counter--) {
                                                                            coord.x -= 1.0;
                                                                        }
                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                        } else {
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        for (int _injected_loop_counter = _GLF_IDENTITY(int(_GLF_ONE(1.0, injectionSwitch.y)), int(ivec2(int(_GLF_ONE(1.0, injectionSwitch.y)), 0))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(8), int(8)))); _injected_loop_counter--) {
                                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                                _GLF_color = vec4(-0.6, -4.6, -4356.8161, -6.0);
                                                                                            } else {
                                                                                                if (_GLF_DEAD(false)) {
                                                                                                    _GLF_color = vec4(5.2, -235.060, -566.413, 9737.3628);
                                                                                                }
                                                                                                if (_GLF_DEAD(false)) {
                                                                                                    _GLF_color = _GLF_color;
                                                                                                }
                                                                                                if (_GLF_DEAD(false)) {
                                                                                                    _GLF_color = _GLF_color;
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        if (_GLF_DEAD(false)) {
                                                                                            _GLF_color = vec4(-0.2, 28.41, 7.5, -5.0);
                                                                                        }
                                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                                                                        } else {
                                                                                            if (_GLF_DEAD(false)) {
                                                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                } else {
                                                                                                    if (_GLF_DEAD(false)) {
                                                                                                        _GLF_color = mod(smoothstep(23.36, 595.474, vec3(-7542.9239, -885.113, -0.9)), 575.939).bgbb;
                                                                                                    }
                                                                                                    if (_GLF_DEAD(false)) {
                                                                                                        _GLF_color = res;
                                                                                                    }
                                                                                                    _GLF_color = vec4(9.5, 5.1, injectionSwitch);
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                } else {
                                                                                }
                                                                            } else {
                                                                            }
                                                                        }
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = (mat4(145.983, -6.2, 580.596, -6.6, -9.7, -4.0, 6.5, 7388.7073, -77.57, -98.99, 6427.6361, 8067.3187, 50.81, 6.0, 8958.7938, -869.902) * _GLF_color);
                                                                        }
                                                                        do {
                                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                                if (_GLF_DEAD(false)) {
                                                                                    _GLF_color = res;
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        _GLF_color = vec4(injectionSwitch, injectionSwitch);
                                                                                    }
                                                                                }
                                                                            }
                                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                                do {
                                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                        if (_GLF_DEAD(false)) {
                                                                                            _GLF_color = atanh(res);
                                                                                        }
                                                                                        do {
                                                                                            _GLF_color = vec4(5033.4521, 5.4, 5810.1918, -3415.8405);
                                                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                                                    }
                                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            if (_GLF_DEAD(false)) {
                                                                                _GLF_color = vec4(-4044.7183, vec3(840.203, 7.0, -6.1));
                                                                            }
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                _GLF_color = vec4(2.5, -8.4, 3.4, 5.6);
                                                                            } else {
                                                                            }
                                                                        }
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = clamp(vec4(646.161, -5987.1530, 509.522, -8.5), (-res), _GLF_color);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            } else {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    _GLF_color = vec4(1967.1130, -54.90, -13.59, 1.9);
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    do {
                                                                        _GLF_color = vec4(-4.7, 71.07, -88.57, -5.7);
                                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = degrees(_GLF_color);
                                                                }
                                                            }
                                                        } else {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                _GLF_color = exp(_GLF_color);
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(-69.69, -1.7, 8.0, 74.66);
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(0.0, 0.0, abs(0.0)), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, abs(0.0)), vec3(1.0, 1.0, 1.0)))))));
                                                }
                                            } else {
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = fract(_GLF_color);
                                            }
                                        }
                                    } else {
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = asin(res);
                                        }
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = refract(reflect((1795.9332 / res), vec4(-5723.8345, -7969.6443, -2.3, 70.45)), vec4(9.1, 3.7, -1.2, -1100.4869), -7.3);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-4679.4588, 6583.9311, -3289.4668, 4499.8253);
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = (vec4(3.0, 3.3, -7.1, 6.8) - (-4839.1600));
                                                }
                                            }
                                            _GLF_color = (res / (-7.4));
                                        }
                                    }
                                    do {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = dFdxCoarse(_GLF_color);
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = dFdx(_GLF_color);
                                                        }
                                                        _GLF_color = roundEven(_GLF_color);
                                                    }
                                                }
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), (int(1)) >> 0)))); _injected_loop_counter--) {
                                                    _GLF_color = faceforward(vec4(79.09, 0.9, 0.7, -8574.9264), _GLF_color, res);
                                                }
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = exp(vec4(-46.73, -12.83, -8.3, -7640.6270));
                                        }
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                            _GLF_color = vec4(-2181.3557);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                                    _GLF_color = exp2(res);
                                                }
                                            } else {
                                            }
                                        }
                                    }
                                    for (int _injected_loop_counter = (0 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = res;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                _GLF_color = res;
                                            }
                                            for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(8), int(8)))); _injected_loop_counter--) {
                                                if (_GLF_DEAD(false)) {
                                                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((0 | 1) ^ 0)); _injected_loop_counter++) {
                                                        _GLF_color = vec4(-7.3, coord, 2566.3837);
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                            _GLF_color = smoothstep(-6.0, 597.806, res);
                                                        }
                                                    }
                                                }
                                                do {
                                                    for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = res;
                                                        }
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(27.43, -84.89, -17.28, 664.844);
                                            }
                                            do {
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    _GLF_color = vec4(-9.8, -4377.0155, -4191.1096, -4.1);
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = res;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = vec4(-295.902, -4815.4786, 22.31, 1.9);
                                                    }
                                                } else {
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), !(!(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))))) {
                                                                for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = vec4(2918.6140, -380.570, 0.5, 2741.4502);
                                                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true && (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) {
                                                                            _GLF_color = _GLF_color;
                                                                        }
                                                                    }
                                                                }
                                                                _GLF_color = res;
                                                            } else {
                                                            }
                                                        } else {
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            do {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        do {
                                                            do {
                                                                _GLF_color = vec4(1987.0110, vec3(7055.3456, 97.99, 24.09));
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                        for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                _GLF_color = inversesqrt(inversesqrt((_GLF_color - vec4(-4.5, -5018.7245, 99.27, -2.9))));
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = faceforward(_GLF_color, vec4(9.3, -88.97, -2.9, -4699.2811), vec4(26.95, -3456.7349, -1.0, -22.46));
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = dFdx(cosh(res));
                                                        }
                                                        _GLF_color = smoothstep(0.6, distance(vec3(-6.3, -76.44, 1.7), vec3(1.3, 7.5, 48.96)), exp(_GLF_color));
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, (0.0) / 1.0))))) {
                                                    _GLF_color = res;
                                                }
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(-39.42, -9.0, -0.4, 48.71);
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = res;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = res;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = res;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = reflect((res / 9.1), _GLF_color);
                                    }
                                } else {
                                }
                            } else {
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(2.2, -60.42, 1.8, -4718.7275);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = normalize(_GLF_color);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    do {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = fwidthFine(res);
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                } else {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(abs(0.0)))))) {
                                            _GLF_color = res;
                                        }
                                    } else {
                                        _GLF_color = _GLF_color;
                                    }
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = vec4(7768.8419, -4.5, 3.5, -21.54);
                                }
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                } else {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 & 29737)); _injected_loop_counter--) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(18.26, injectionSwitch, -4.6);
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = vec4(-4935.7714, 3606.9706, -7588.6859, -87.29);
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, !(!(false)))) && true))) {
                            do {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = smoothstep(_GLF_color, (_GLF_color - res), cos(vec4(-11.88, 96.50, 365.269, 4.8)));
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = fract(mod(_GLF_color, _GLF_color));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = res;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = unpackUnorm4x8(113593u);
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                        }
                                    }
                                    _GLF_color = res;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = vec4(-616.905, -7.4, 1.9, 1456.4194);
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                _GLF_color = res;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = dFdxFine(res);
                                }
                            }
                        } else {
                            do {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    if (_GLF_DEAD(false)) {
                                        do {
                                            do {
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    for (int _injected_loop_counter = (44260 & 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < (int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ 1)); _injected_loop_counter++) {
                                                        _GLF_color = atan(_GLF_color);
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = normalize(vec4(-2.7, -62.08, 32.69, -46.17));
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    do {
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(false)) {
                                                                do {
                                                                    _GLF_color = mod(tanh(_GLF_color), -0.4);
                                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                            }
                                                            _GLF_color = smoothstep(-116.868, sinh(-693.526), acosh(_GLF_color));
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = _GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = smoothstep(635.263, 97.80, cosh(res));
                                                        }
                                                    }
                                                } else {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(7.8, -5646.8802, 812.496, -369.476);
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = (_GLF_color + 9.8);
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = res;
                                                            }
                                                        } else {
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = res;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = res;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = res;
                                                        }
                                                    }
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = (ceil(-978.335) / vec4(5447.1868, -697.753, -3.2, 7.2));
                                        }
                                        _GLF_color = vec4(613.180, 3665.3539, -0.5, -10.65);
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = exp2(res);
                                            }
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            } else {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                    } else {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = (fract(res) + 413.349);
                                                            }
                                                            _GLF_color = vec4(9.0, -1.4, 547.814, -5946.3324);
                                                        }
                                                    }
                                                    _GLF_color = _GLF_color;
                                                } else {
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = res;
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter--) {
                                            do {
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        do {
                                                            do {
                                                                _GLF_color = (+trunc(max(vec4(-559.918, 3705.2943, -4.8, 3.8), -564.727)));
                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                    } else {
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                        }
                                    }
                                    do {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            do {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        } else {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = unpackUnorm4x8(103931u);
                                                    }
                                                } else {
                                                    _GLF_color = _GLF_color;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = mix(vec4(-975.307, -249.881, -8.9, 7.6), res, bvec4(false, false, false, false));
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                                _GLF_color = mod(res, 3340.4219);
                                            }
                                            _GLF_color = max(vec4(-0.2, 5270.5287, -1.4, -8.8), dFdxCoarse(_GLF_color));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(3499.1620, injectionSwitch, 8.2);
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = vec4(-9.8, -3.4, 5.2, -1.4);
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = smoothstep(res, ldexp(_GLF_color, findMSB(ivec4(27939, -41809, -33333, -78708))), _GLF_color);
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(-8182.9156, -3.7, 7.6, -142.662);
                                                        }
                                                    } else {
                                                    }
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        _GLF_color = res;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(-9377.2190, -5.4, -56.33, -6.7);
                                                            }
                                                            _GLF_color = res;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = res;
                                                    }
                                                }
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = tan(_GLF_color);
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-2.0, 41.07, 6.0, -540.543);
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, bool(bvec4(false, true, true, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))))));
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-5558.8770, -901.271, -2.2, 9.9);
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = res;
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = mod(fma(_GLF_color, res, ldexp(_GLF_color, ivec4(-2899, -69594, -91205, 79960))), -6236.7162);
                            }
                            if (coord.y > 1.0) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(-763.338, -6139.6615, 28.97, -92.83);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = vec4(859.789, 3659.5050, -5.8, 18.79);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = res;
                                    }
                                }
                                do {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(1.0))))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (mat3x2(8.3, -5.6, -3.3, 457.698, -3.1, -5329.1661)[1] * mat4x2(-340.097, -3149.1166, -9829.8530, 6.7, -9439.6925, 8.4, 6908.6181, -28.90));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = (bvec3(false, true, false), vec4(-22.25, 183.794, -3448.0338, 9.3));
                                            }
                                        }
                                        coord.y -= 1.0;
                                    } else {
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (vec4(-165.745, -6248.1982, -2.2, -73.33) - ceil(res));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = res;
                                            } else {
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            _GLF_color = max(vec4(9.6, -2.8, 1.4, -58.23), _GLF_color);
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (mat3x4(13.83, 141.130, 957.122, 391.983, -3880.1579, -6.2, -9.4, 8.4, -0.3, 49.70, 561.148, -28.82) * vec3(1.6, 2.9, -8916.3079));
                        }
                        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = vec4(6721.7431, -4.9, 0.7, -4.2);
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = res;
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            } else {
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = res;
                                        } else {
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                                        _GLF_color = res;
                                                    }
                                                    for (int _injected_loop_counter = _GLF_IDENTITY((int(_GLF_ONE(1.0, injectionSwitch.y)) & 1), max((int(_GLF_ONE(1.0, injectionSwitch.y)) & 1), _GLF_IDENTITY((int(_GLF_ONE(1.0, injectionSwitch.y)) & 1), max((int(_GLF_ONE(1.0, injectionSwitch.y)) & 1), (int(_GLF_ONE(1.0, injectionSwitch.y)) & 1))))); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = smoothstep(_GLF_color, res, vec4(8696.7945, 0.4, 2.9, -879.259));
                                                        }
                                                        _GLF_color = _GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = intBitsToFloat(ivec4(-84974, -89243, 17994, 7513));
                                                        }
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = fwidthFine(res);
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                        }
                                    }
                                } else {
                                }
                            }
                        }
                        do {
                            coord *= 2.0;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = res;
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (mix(vec4(-22.28, 65.99, -375.685, -3.0), (mat2x4(8.5, -908.278, -276.790, -858.358, 0.2, 48.51, 2.3, -2.0) * coord), equal(_GLF_color, vec4(-4971.2269, 40.89, 7.0, -4.1))) * mat4(-6.2, 7228.7258, -5.0, -6.7, 383.142, -7.7, 2.0, 5.4, 83.48, -8.4, 8.0, -8.8, 8.8, -9.4, -214.340, 8.1));
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (mat4(-542.459, -3693.9596, -8.1, -5.4, -8650.8404, 12.18, 212.918, -5.4, 90.80, 102.141, 6.2, 54.61, -80.24, 238.923, 6614.3956, 5.8) * res);
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            do {
                                do {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (false) && true))) {
                                    } else {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = vec4(-4.2, 2463.4537, -1.6, -7.4);
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = mod(res, -6793.6390);
                                                    }
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = cos(vec4(-3038.3021, 59.44, 7.6, -5837.8866));
                                                            }
                                                        }
                                                    } else {
                                                        do {
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = round(res);
                                                                }
                                                            } else {
                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                } else {
                                                                    for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), 0 | (int(4))))); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)) ? _GLF_FUZZED(i) : int(5))))) >> _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter++) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                if (_GLF_DEAD(false)) {
                                                                                    _GLF_color = _GLF_color;
                                                                                }
                                                                                if (_GLF_DEAD(false)) {
                                                                                    _GLF_color = vec4(fract(vec2(-139.288, 29.55)[0]), injectionSwitch, 5.2);
                                                                                }
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                    _GLF_color = sqrt(res);
                                                                                }
                                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        _GLF_color = (injectionSwitch * (mat4x2(-9.4, -4156.4697, 76.72, 8.6, -9.1, -32.87, -7.1, -33.78)));
                                                                                    }
                                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY((int(_GLF_ZERO(0.0, injectionSwitch.x)) >> _GLF_IDENTITY(int(7), int(7))), ~(~((int(_GLF_ZERO(0.0, injectionSwitch.x)) >> _GLF_IDENTITY(int(7), int(7))))))); _injected_loop_counter--) {
                                                                                        if (_GLF_DEAD(false)) {
                                                                                            _GLF_color = vec4(0.0, -9944.2748, -1.8, 305.634);
                                                                                        }
                                                                                    }
                                                                                }
                                                                            } else {
                                                                                _GLF_color = _GLF_color;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                _GLF_color = min(res, -8.9);
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = dFdyFine(refract(_GLF_color, vec4(-5.7, 140.751, 9.4, -8.9), -36.57));
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    _GLF_color = vec4(74.61, 42.56, -374.541, -2.4);
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = res;
                                                                    }
                                                                }
                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (false) && true))) {
                                                                } else {
                                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                        do {
                                                                            if (_GLF_DEAD(false)) {
                                                                                _GLF_color = res;
                                                                                if (_GLF_DEAD(false)) {
                                                                                    _GLF_color = _GLF_color;
                                                                                }
                                                                            }
                                                                            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                    } else {
                                                                                        _GLF_color = res;
                                                                                    }
                                                                                }
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                    _GLF_color = log(acos(res));
                                                                                }
                                                                            }
                                                                            if (_GLF_DEAD(false)) {
                                                                                _GLF_color = mod(vec4(-3.3, -3.6, 1.0, -8.5), -571.654);
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = res;
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                    }
                                                }
                                            } else {
                                            }
                                        }
                                        do {
                                            do {
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = res;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = vec4(-31.80, -76.16, 8.5, 21.56);
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        } else {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                        _GLF_color = _GLF_color;
                                                                    }
                                                                }
                                                                _GLF_color = res;
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    _GLF_color = res;
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                    }
                                                } else {
                                                    i++;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = dFdyCoarse(res);
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = res;
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0)))))));
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            } while (_GLF_WRAPPED_LOOP(false));
                        } else {
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = intBitsToFloat(ivec4(-5747, -25554, 30747, -71697));
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = max(vec4(-4.2, 1.0, 3.0, 29.35), -857.845);
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            } else {
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = res;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (_GLF_color * 69.44);
                            }
                        } else {
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = fwidthFine(res);
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false || (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
                                for (int _injected_loop_counter = (0 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = dFdyCoarse(res);
                                    }
                                    _GLF_color = refract(((-5642.7523) * res), vec4(929.361, -885.746, 4413.8216, -9.4), 7.9);
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(ceil(-1.4), vec3(-99.33, -73.14, 9.5));
                            }
                        }
                    } else {
                    }
                } else {
                }
            } else {
            }
        } else {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = vec4(-7910.1995, 1.0, -9343.5439, -6.1);
                }
                _GLF_color = radians(vec4(-1.2, -5.6, 45.13, -7.5));
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(log(1.0), 1.0)), dot(vec2(1.0, 0.0), vec2(log(1.0), 1.0))))))) {
                _GLF_color = atan(_GLF_color);
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = res;
                }
            } else {
                if (_GLF_DEAD(false)) {
                    for (int _injected_loop_counter = _GLF_IDENTITY(1, int(_GLF_IDENTITY(int(1), ~(~(int(1)))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        do {
                            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                _GLF_color = vec4(-272.764, -3.6, injectionSwitch);
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = exp2(vec4(489.384, 9.1, injectionSwitch));
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, false))))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = vec4(64.51, 6.9, 8.6, -6.5);
                            }
                            _GLF_color = asin(vec4(-1.2, coord, -9448.7617));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = fwidthCoarse(res);
                            }
                        }
                    } else {
                        _GLF_color = mod(_GLF_color, -59.87);
                    }
                } else {
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-0.2, -0.5, -6.9, -949.541);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = res;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = roundEven(vec4(4.7, 2268.6141, -2857.7823, -3.1));
                            if (_GLF_DEAD(false)) {
                                _GLF_color = res;
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                            _GLF_color = _GLF_color;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    _GLF_color = (false ? vec4(3.5, 6.1, 72.73, 35.84) : res);
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                _GLF_color = fma(vec4(-828.443, 5.5, 913.179, 6311.9588), _GLF_color, res);
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), clamp(int(2), int(2), int(2))))) >> _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = dFdy(res);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = res;
                    }
                    _GLF_color = (_GLF_color);
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = res;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = (vec3(984.565, 0.8, -12.49) * mat4x3(8.9, 2738.5312, -86.36, 794.316, 558.818, -11.29, 4.0, 87.46, 7294.7678, 64.17, 9.4, -95.67));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3)))); _injected_loop_counter++) {
                do {
                    do {
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            _GLF_color = res;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0))))))) {
                                _GLF_color = (vec3(-449.418, 57.56, 5.1) * mat4x3(-515.472, 867.127, -39.47, 37.78, 4.5, 4.1, -5408.3901, 9.3, 851.126, -33.69, 2.9, -62.85));
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                if (_GLF_DEAD(false)) {
                    _GLF_color = (res / _GLF_color);
                }
            }
        }
    } else {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (reflect(vec4(-36.04, 1.6, -3585.2782, -350.760), sin(vec4(1.2, 8.4, -1.7, 18.04))) * exp2(-2.7));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = mat2x4(-7.3, 6.0, 1308.2819, -9506.2909, 562.678, -59.92, -46.72, -27.78)[1];
                    }
                }
                _GLF_color = vec4(3409.5991, 6.5, 3065.6644, 3.5);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = log2(intBitsToFloat(ivec4(-79326, -42754, -84788, 10130)));
                    }
                } else {
                }
            }
            _GLF_color = (tanh(_GLF_color) + mod(_GLF_color, 6.9));
        }
        if (coord.x < 1.0 && coord.y < 1.0) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 1.0, 0.0, 0.0)))))) {
                _GLF_color = res;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = res;
                }
            }
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    res = texture(tex, coord);
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = min(vec4(3897.2664, -5740.7166, -3.6, 6.8), mod(vec4(2.7, -9.4, 9815.9107, -8.1), vec4(coord, -8.4, -3338.0931)));
                    }
                }
            }
            do {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = (vec4(47.93, -1.4, 7568.9735, 9211.2907) - reflect(res, _GLF_color));
                    }
                    do {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = res;
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = fwidthFine(_GLF_color);
                                }
                                _GLF_color = res;
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, (0.0) * 1.0)))));
                    do {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = atan(_GLF_color, vec4(7427.3005, 78.03, -1.5, -4.1));
                        }
                        do {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            } else {
                                do {
                                    _GLF_color = res;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = res;
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = clamp(vec4(1.3, 4302.5851, 7733.4772, 4560.5622), vec4(6.9, -229.710, 8.7, -9151.8953), vec4(-6.3, -1713.6283, -9.2, -9.6));
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = degrees(res);
                            }
                        } else {
                            _GLF_color = asinh(_GLF_color);
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = res;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_color;
                                } else {
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (vec4(8.6, -70.35, -741.796, -2.4) * (-510.002));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = res;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = uintBitsToFloat(uvec4(160272u, 109013u, 70470u, 143930u));
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = (mat2x4(530.936, 20.48, -3.4, 14.09, -8.6, 84.00, -6836.0858, 1121.1673) * vec2(736.357, -7.6));
                        }
                    }
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(0.0, log(1.0), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0))))));
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = dFdy(_GLF_color);
            }
            _GLF_color = vec4(7.7, 258.212, -3.1, -9.5);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = res;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                do {
                    _GLF_color = res;
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            for (int _injected_loop_counter = ((0 >> _GLF_IDENTITY(int(2), int(2))) | (0 | 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                _GLF_color = dFdy(_GLF_color);
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
        }
    } else {
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
    } else {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                            do {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(log(1.0)))))) {
                                                _GLF_color = roundEven(vec4(22.88, 8762.6345, 2.2, 4.2));
                                            }
                                            _GLF_color = res;
                                        }
                                        _GLF_color = res;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = clamp(_GLF_color, 7.4, -0.9);
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                        _GLF_color = unpackSnorm4x8(max(94228u, 143166u));
                                    }
                                } else {
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = smoothstep(-26.86, -3989.4212, vec4(-7764.1913, -8.2, -819.123, -13.55));
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0)))))) {
                                    _GLF_color = fwidthFine(res);
                                }
                                _GLF_color = vec4(0.7, -74.23, 523.115, -7.7);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = unpackUnorm4x8(83088u);
                            }
                            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(3), int(3)))); _injected_loop_counter--) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = res;
                                        }
                                    } else {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | 0)); _injected_loop_counter--) {
                                            do {
                                                for (int _injected_loop_counter = (0 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(4.1, -295.594, 64.93, 55.42);
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    _GLF_color = res;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    do {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            _GLF_color = vec4(-5.2, faceforward(753.765, -2190.5370, -94.13), coord).sqss;
                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                                                                _GLF_color = unpackSnorm4x8(packHalf2x16(coord));
                                                                            }
                                                                        }
                                                                        _GLF_color = vec4(-71.18, vec3(-3.2, -6.6, 246.870));
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = abs(step((1.7), vec4(-6.3, 37.96, -685.674, 0.5)));
                                                                        }
                                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                }
                                                            }
                                                            do {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        _GLF_color = vec4(610.790, 287.530, -65.18, 8.5);
                                                                    }
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = (-vec4(-3465.4918, 71.32, 521.035, -73.08));
                                                                    }
                                                                }
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                        }
                                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 0)); _injected_loop_counter--) {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(-8.3, refract(unpackSnorm2x16(195940u), injectionSwitch, 6.4), -3.3);
                                                            }
                                                            for (int _injected_loop_counter = ((-34855) & 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                        _GLF_color = uintBitsToFloat(uvec4(113125u, 126952u, 18059u, 182503u));
                                                                    }
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = vec4(-0.6, -0.1, -4.6, -0.9);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = (vec3(-3.5, -1.4, 4.3) * mat4x3(-5.7, -404.274, 855.841, -989.615, -64.65, -27.34, -799.685, -13.23, 2.1, 953.147, -330.958, -2510.0582));
                                            }
                                        }
                                    }
                                } else {
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = cosh((_GLF_color - vec4(9452.2739, -8.2, 0.3, -35.95)));
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        do {
                                            _GLF_color = vec4(res.xyz, 1.0);
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = _GLF_color;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = fwidthFine(res);
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = vec4(-750.434, -7.5, 3.9, 1.0);
                                                }
                                                do {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            for (int _injected_loop_counter = _GLF_IDENTITY(0, (0) | (0)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                _GLF_color = inversesqrt(dFdyCoarse(_GLF_color));
                                                            }
                                                        } else {
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    for (int _injected_loop_counter = (0 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                        _GLF_color = _GLF_color;
                                                                    }
                                                                }
                                                                _GLF_color = _GLF_color;
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = vec4(648.681, tanh(vec3(-213.420, 3665.1349, -8.1)));
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(-17.44, 1633.4015, -22.84, 1.5);
                                                            }
                                                        } else {
                                                        }
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = res;
                                            }
                                        }
                                    } else {
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = tan(_GLF_color);
                                }
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = ((mat3x4(-83.35, 3713.8768, 53.97, -1026.9779, 6919.8825, -9021.1983, 5.8, -1.9, -374.007, -12.20, -4.7, 3.3) * exp(vec3(270.064, 6041.6741, 49.78))) + _GLF_color);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(vec2(2.8, 5.7), vec2(-436.443, 39.93));
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                do {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = res;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(-63.46, 4.8, -0.7, -95.49);
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = intBitsToFloat((ivec4(-92593, 89333, 13984, 21211) * bitCount(i)));
                                                            }
                                                            _GLF_color = res;
                                                        }
                                                        _GLF_color = res;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = log(vec4(333.395, 1.5, 1750.2872, 14.77));
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(7.3, fwidthCoarse(vec3(-84.50, 5143.1812, -8.7)));
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = res.pqts;
                                                    }
                                                    _GLF_color = vec4(injectionSwitch, ceil(coord));
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            } else {
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = min(res, vec4(6269.5500, injectionSwitch, -5597.0204));
                                            if (_GLF_DEAD(false)) {
                                                do {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                    } else {
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    _GLF_color = sign(vec4(0.0, 5.3, -947.635, -1.4));
                                                } else {
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = res;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        } else {
            for (int _injected_loop_counter = (1 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter--) {
                _GLF_color = vec4(-42.90, -57.48, 82.18, 472.314);
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = reflect(_GLF_color, res);
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = res;
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(7826.6975, 226.023, 986.500, -9.8);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = vec4(8975.5867, -22.73, -43.94, 1738.6809);
    }
}
