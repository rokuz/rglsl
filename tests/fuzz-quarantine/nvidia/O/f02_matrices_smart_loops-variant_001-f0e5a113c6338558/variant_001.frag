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

layout(set = 0, binding = 2) uniform buf2 {
    vec2 injectionSwitch;
};

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    float one;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

mat2 m22;
mat2x3 m23;
mat2x4 m24;
mat3x2 m32;
mat3 m33;
mat3x4 m34;
mat4x2 m42;
mat4x3 m43;
mat4 m44;

void main() {
    uint matrix_number = 0u;
    for (int cols = 2; cols <= 4; cols++) {
        do {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-8.3, 300.132, -2.5, -17.05);
                }
                _GLF_color = (mat4(-3.2, 58.66, 4.9, 0.8, 125.304, 4235.5374, -9.2, -1.7, -301.373, 0.4, 8.6, -409.803, 8745.3052, 576.467, -5874.8897, -4921.1562)[2] + one);
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), false || (!(false)))))));
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        } else {
            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(false)) {
                do {
                    _GLF_color = (injectionSwitch * m42);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = uintBitsToFloat(uvec4(155952u, 68925u, 169758u, 70232u));
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = (_GLF_color * mat4(6325.3461, 7.3, 9.3, -24.96, 84.89, 4.1, -79.93, -0.6, 4048.1148, 125.018, -670.618, -8.5, 6.2, 590.028, 9.3, -52.42)).ssqp;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = intBitsToFloat((-ivec4(14809, 13809, -29622, -60963)));
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
        }
        for (int rows = 2; rows <= 4; rows++) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-339.599, 6.9, -3433.9902, -34.74);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = ldexp(vec4(4417.0740, -4.3, 528.267, -60.88), ivec4(34873, -62650, -958, -92527));
                    }
                }
            } else {
                for (int c = 0; c < cols; c++) {
                    for (int r = 0; r < rows; r++) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, max(1, 1))); _injected_loop_counter++) {
                                switch (matrix_number) {
                                    case 0u:
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                m22[c][r] = one;
                                            } else {
                                            }
                                        }
                                        break;
                                    case 1u:
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = acosh(sinh(exp2(vec4(-4.3, 7933.2974, -0.9, -648.805))));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = fract(vec4(160.871, -7351.8644, 5.2, -4.6));
                                        }
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = reflect(vec4(1.9, -2632.2920, -2.2, 47.03), vec4(4.9, 4107.4622, -4.9, 2102.7622));
                                            }
                                            _GLF_color = smoothstep(vec4(8.2, 244.234, 0.3, 3526.2856), vec4(-1.9, -8824.4817, 6.1, 333.032), floor(vec4(-1692.5608, 4343.8681, -90.48, -339.351)));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = normalize(_GLF_color);
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = min(_GLF_color, one);
                                            }
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                } else {
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                            _GLF_color = _GLF_color;
                                        }
                                        m23[c][r] = one;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = vec4(-3941.3349, -15.98, 8.2, -8.6);
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (m44 * m34)[1];
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                    case 2u:
                                        m24[c][r] = one;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    _GLF_color = (one - atan(_GLF_color, _GLF_color));
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = degrees(vec4(3.7, 890.840, 6.4, -137.298));
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = mix(vec4(6.1, 25.40, 888.927, 615.860), vec4(-366.982, 83.22, -557.671, -4488.7571), _GLF_color);
                                                }
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = vec4(-7.4, 8.4, -24.80, 0.4);
                                                    } else {
                                                    }
                                                }
                                                _GLF_color = (false ? vec4(-4.3, -4.6, -3.8, -0.3) : _GLF_color);
                                            }
                                            _GLF_color = max(vec4(-48.40, -6.3, 4670.9165, -78.13), vec3(-23.55, -7.7, 58.17).y);
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-64.47, -2.5, 31.52, 4.3);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                                                    _GLF_color = _GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = (m33, vec4(44.93, -5.5, 6.3, 17.83));
                                                    }
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                        _GLF_color = vec4(-6.9, -1.8, 4.8, 9.3);
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = dFdyCoarse(_GLF_color);
                                                    }
                                                    _GLF_color = atan((vec4(-562.412, -6.3, -533.500, 8960.7450)), acos(_GLF_color));
                                                }
                                                do {
                                                    _GLF_color = vec4(-11.48, -8.8, 9792.2118, 8.8);
                                                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, false || (false))));
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                        _GLF_color = asinh(_GLF_color);
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = radians(vec4(683.046, 5133.1042, 4.8, -9.9));
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(false)) {
                                                do {
                                                    _GLF_color = _GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = asinh(vec4(4458.8948, 3.0, 5079.5342, -3.5));
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, bool(bvec3(false, true, true)))));
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = (one + _GLF_color);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(!(false))))) {
                                                } else {
                                                    _GLF_color = min(vec4(0.8, 6.6, 0.8, -2.9), one);
                                                }
                                            }
                                        } else {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = vec4(55.35, -2.7, 7214.2659, -28.09);
                                                }
                                            } else {
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                _GLF_color = (3.8 + vec4(53.04, -8121.9195, 4.1, -723.627));
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        break;
                                    case 3u:
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = dFdyFine(asinh(vec4(672.278, -53.17, 9.3, -3419.0257)));
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = uintBitsToFloat(uvec4(41284u, 196099u, 71638u, 23731u));
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < sin(determinant(mat4(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0))))))) {
                                            } else {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = atan(_GLF_color, vec4(3.5, 6.7, -40.47, -2182.4904));
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = trunc(_GLF_color);
                                                    }
                                                    _GLF_color = dFdy(vec4(3.0, -512.191, 5257.2697, -5790.7271));
                                                }
                                            }
                                        } else {
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(one, vec2(2739.9109, -25.82), 1.9);
                                        }
                                        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = log(vec4(-119.375, -626.752, -3985.8331, -7.2));
                                            }
                                            do {
                                                do {
                                                    for (int _injected_loop_counter = ((0 | 0) << _GLF_IDENTITY(int(7), int(7))); _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, max(1, 1))); _injected_loop_counter++) {
                                                        do {
                                                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(_GLF_IDENTITY(false, !(!(false))), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))))) {
                                                                _GLF_color = vec4(-1821.2905, -6.0, -38.49, -4.1);
                                                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, false))))) {
                                                                    _GLF_color = unpackUnorm4x8(matrix_number);
                                                                }
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                        m32[c][r] = one;
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = dFdyFine(dFdy(vec4(989.070, 2.0, 85.46, -4.0)));
                                            }
                                        }
                                        break;
                                        for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 | int(_GLF_ONE(1.0, injectionSwitch.y)))); _injected_loop_counter++) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = dFdyCoarse(vec4(5.2, 5.2, one, 63.27));
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, (false ? _GLF_FUZZED(ivec2(-86892, -19495).t) : 1))); _injected_loop_counter++) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(-81.32);
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = faceforward(_GLF_color, trunc(_GLF_color), (+_GLF_color));
                                                        }
                                                    }
                                                }
                                                _GLF_color = vec4(_GLF_color.qq, (+injectionSwitch));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = vec4(-0.5, 4059.7373, -498.891, -1719.1781);
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = (vec3(-623.297, 460.088, -271.781) * mat4x3(mat3x4(-7.6, -6512.9425, -4.8, 6294.9691, -30.46, 92.11, 4969.0205, -24.90, 1714.6904, 5649.9690, 8374.4608, 4.1)));
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(one, -27.17, injectionSwitch);
                                                }
                                                _GLF_color = _GLF_color;
                                            }
                                        }
                                        do {
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(0, max(_GLF_IDENTITY(0, 0 ^ (0)), 0))); _injected_loop_counter--) {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = vec4(-1.1, -3893.7787, -5720.1735, 0.8);
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = dFdxFine(_GLF_color);
                                                            }
                                                            _GLF_color = vec4(-2583.7192, 1.0, -69.06, -9420.5211);
                                                        }
                                                        _GLF_color = vec4(exp(-3349.6125), normalize(vec3(0.9, -1.1, -6279.7631)));
                                                        do {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 0)); _injected_loop_counter--) {
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = vec4(-2.8, -4.8, 6.6, -185.170);
                                                                            if (_GLF_DEAD(false)) {
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = vec4(-34.53, -4.7, -265.504, -6.1);
                                                                                } else {
                                                                                }
                                                                            }
                                                                        }
                                                                        _GLF_color = max(_GLF_color, (vec4(6.5, 7.0, -3.2, 39.12) * (mat4(0.5, 735.352, -980.699, -0.5, -7.5, 133.365, -4746.7268, -5.1, -3.0, 147.727, 81.87, -2.6, -3819.2651, -6076.9526, -42.59, -6711.3065) * mat4(4.8, -4445.4678, 29.31, 22.21, -35.67, -7079.3674, -5.6, -9.3, 5807.2152, -5.4, -7.2, -6193.2435, 4993.3189, -2568.5915, 8449.4601, 210.450))));
                                                                    }
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = atanh((_GLF_color - refract(_GLF_color, vec4(5.7, 466.333, 4047.9521, -6.0), one)));
                                                                    }
                                                                }
                                                            } else {
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, (false) && true)));
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = tan(vec4(-1004.8209, 2.2, -9907.9407, -928.375));
                                                        }
                                                    }
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            for (int _injected_loop_counter = _GLF_IDENTITY(1, (true ? 1 : _GLF_FUZZED(rows))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    } else {
                                                                        _GLF_color = fwidthCoarse(_GLF_color);
                                                                    }
                                                                }
                                                            }
                                                        } else {
                                                            _GLF_color = fwidthCoarse(_GLF_color);
                                                            for (int _injected_loop_counter = ((-2490) & 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ 1)); _injected_loop_counter++) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = vec4(-5393.0453, -956.414, -48.13, 7.5);
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(0.8, -66.29, -8949.3954, -6.8);
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                } else {
                                                                    _GLF_color = dFdyCoarse(_GLF_color);
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = dFdx(log(dFdyCoarse(vec4(-2.0, 7.8, -9.8, -5.9))));
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            _GLF_color = tanh(_GLF_color);
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(-4.7, 4.4, -138.127, 8.5);
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = asin(_GLF_color);
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = unpackUnorm4x8(matrix_number);
                                                            }
                                                            _GLF_color = vec4(64.07, -658.381, -6.0, 0.8);
                                                        } else {
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                        } else {
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = atanh(vec4(-7.7, 5.9, -225.782, -3.1));
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                _GLF_color = _GLF_color;
                                                            } else {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = smoothstep(vec4(7.1, -81.28, 0.5, 99.05), vec4(vec2(6630.8268, -928.119)[1], one, injectionSwitch), vec4(88.17, -4.7, 13.87, 232.501));
                                                                }
                                                            }
                                                        } else {
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), (int(2)) * 1))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 | 1)); _injected_loop_counter++) {
                                                            _GLF_color = fract(_GLF_color);
                                                        }
                                                    }
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = mix(_GLF_color, _GLF_color, not(bvec4(false, false, false, true)));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = sinh(ldexp((mat3x4(-4651.1030, -862.730, -7.0, -318.079, -8.6, -6450.7813, -1.1, 882.986, 4843.8772, -7.5, -1.6, -1.1) * vec3(-861.609, 70.86, -206.324)), ivec4(82494, -80744, 86632, 33206)));
                                                }
                                                _GLF_color = vec4(31.48, 6.0, -75.95, -3.1);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = (m24 * resolution);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(acosh(injectionSwitch), -389.646, -2.4);
                                            }
                                        }
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    do {
                                                        _GLF_color = vec4(-3.1, 3.3, -77.74, -4.7);
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = ((-877.714) / asin(_GLF_color));
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = dFdxCoarse(_GLF_color);
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = cos(step(vec4(-5.1, 6.6, -66.06, 5.9), vec4(88.01, 0.6, 97.43, -8.6)));
                                            }
                                        } else {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                for (int _injected_loop_counter = (1 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter > (int(_GLF_ZERO(0.0, injectionSwitch.x)) | (55501 & 0))); _injected_loop_counter--) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = dFdy(pow(_GLF_color, _GLF_color));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = vec4(1200.2157, -0.4, 5.6, 268.717);
                                                            } else {
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(refract(one, one, one), vec3(-28.83, 665.847, -3.2));
                                                    }
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(6.0, 9.8, -68.73, -3.8);
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                _GLF_color = vec4(-1640.9925, 58.27, -50.35, -4.4);
                                            }
                                        }
                                    case 4u:
                                        m33[c][r] = one;
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-6316.6772, 86.30, 364.367, -2.7);
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = vec4(884.903, 4.1, 7.0, -792.282);
                                            } else {
                                            }
                                        }
                                        break;
                                    case 5u:
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = vec4(-8.2, 13.95, 7.2, -6152.6614);
                                                }
                                            } else {
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        m34[c][r] = one;
                                        break;
                                    case 6u:
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                m42[c][r] = one;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(3335.7124, 96.10, -22.99, 4715.0421);
                                                }
                                            }
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(injectionSwitch.t);
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = (+faceforward(vec4(366.189, -204.940, 9769.5453, 4.2), vec4(529.788, -929.717, 64.68, 547.765), mix(vec4(-6401.0599, 3.8, -2346.4908, -3.3), _GLF_color, one)));
                                                } else {
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(5.8, -8.4, 76.68, 1205.9868);
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = (935.117 - (_GLF_color));
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = pow(_GLF_color, _GLF_color);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = (-vec4(-0.2, -9.1, 62.29, -291.303));
                                        }
                                    case 7u:
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (_GLF_IDENTITY(true, !(!(true))))))) {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                }
                                            } else {
                                                m43[c][r] = one;
                                                do {
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    } else {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = vec4(917.451, -855.156, -2.0, 462.193);
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                        } else {
                                                        }
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(-56.75, vec3(4.4, 5.5, 65.51));
                                                    }
                                                }
                                            }
                                        } else {
                                        }
                                        do {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = vec4(-6.3, -2.1, 31.76, 7.9);
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bool(true))))) {
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = step(-14.53, (false ? vec4(-8458.3989, 4.5, -1.1, -3.9) : _GLF_color));
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    _GLF_color = vec4(2214.0610, vec3(284.966, -2345.2424, -65.73));
                                                                }
                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                } else {
                                                                    _GLF_color = vec4(-327.506, -809.529, -9829.6926, 7.0);
                                                                }
                                                            }
                                                        } else {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                    _GLF_color = max(_GLF_color, clamp(vec4(-4.5, -5.5, -1.9, 3.2), _GLF_color, _GLF_color));
                                                                } else {
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = dFdyFine(_GLF_color);
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        _GLF_color = _GLF_color;
                                                                    }
                                                                }
                                                            } else {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))))))) {
                                                                    do {
                                                                        _GLF_color = vec4(one, resolution, one);
                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = vec4(826.183, -676.398, -9.5, -6294.3235);
                                                                }
                                                            } else {
                                                            }
                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = (vec3(-88.16, 717.381, 34.68) * (m23 * mat3x2(-1848.4119, -5.9, 3.4, -6.4, -2.4, -6.0))).zzxy;
                                                                    if (_GLF_DEAD(false)) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            _GLF_color = vec4(5.1, -40.36, -968.407, -62.64);
                                                                        }
                                                                        _GLF_color = _GLF_color;
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    _GLF_color = vec4(0.7, 851.468, -1.7, -2.4);
                                                                    if (_GLF_DEAD(false)) {
                                                                        do {
                                                                            _GLF_color = vec4(-8.8, -371.902, -240.605, -42.31);
                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, sqrt(0.0), 0.0)))))) {
                                                                                _GLF_color = (mat3x4(7333.1330, -457.669, 5.6, 2.0, 559.995, -97.24, -199.680, -459.559, 2.0, 304.973, -2217.2863, 0.0) * vec3(1155.6197, 6.9, -2.5));
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), !(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))));
                                                                    }
                                                                }
                                                            }
                                                        } else {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                                _GLF_color = pow(reflect(vec4(92.65, -2.7, 0.8, -4.5), _GLF_color), _GLF_color);
                                                            }
                                                            _GLF_color = (vec3(288.425, -1.2, -7851.4670) * mat4x3(-3.5, 7.7, -1.5, -729.352, -9.7, -2.3, -1928.4102, 692.296, 3.3, -5.7, -18.69, 23.18));
                                                        }
                                                    }
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(85.09, -29.85, -5.5, -3.0);
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    } else {
                                                        do {
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = unpackSnorm4x8(100336u);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = _GLF_color;
                                                                        }
                                                                    } else {
                                                                    }
                                                                }
                                                            } else {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(-4.9, -2.7, 327.083, 1592.0654);
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = max(vec4(9.6, -6.9, 4.3, 2356.4845), _GLF_color);
                                                    }
                                                } else {
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(-57.07, -1478.2612, -1.4, -2699.1402);
                                                }
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, true))))) {
                                                    _GLF_color = (_GLF_color - _GLF_color);
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    _GLF_color = (_GLF_color / _GLF_color);
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0)), log(1.0), 1.0, 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))), 0.0)))))) {
                                                            _GLF_color = mod(vec4(6.2, -2.6, -79.04, 276.476), vec4(9465.5292, 8.1, -4.0, 8.5));
                                                        }
                                                        do {
                                                            _GLF_color = _GLF_color;
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                    }
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = (+_GLF_color);
                                            if (_GLF_DEAD(false)) {
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0))))))) {
                                                    } else {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = resolution.rggr;
                                        }
                                    case 8u:
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = roundEven(_GLF_color);
                                        }
                                        do {
                                            m44[c][r] = one;
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                        } else {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                                    _GLF_color = sin(vec4(-64.92, -4.4, -1.3, 4.0));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = tanh(_GLF_color);
                                                    }
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                for (int _injected_loop_counter = _GLF_IDENTITY(0, max(0, 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = cos(refract(vec4(99.73, -6.5, 78.26, 700.949), _GLF_color, -8263.9290));
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = clamp(_GLF_color, -2.0, one);
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            }
                                        }
                                        break;
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = smoothstep(round(one), 5.2, _GLF_color);
                                                }
                                                _GLF_color = vec4(-9228.0539, -7018.1635, -7914.7860, 798.622);
                                            }
                                        } else {
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = min(smoothstep(_GLF_color, _GLF_color, fma(vec4(-20.39, -69.30, -7.2, -88.71), vec4(934.977, 8.8, 0.5, 27.04), vec4(7.6, 355.772, -12.36, -9260.4836))), 3.0);
                                        }
                                }
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (smoothstep(89.22, 632.592, _GLF_color) / dFdxFine(_GLF_color));
                                    }
                                }
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    do {
                        do {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = sign(vec4(one, -99.81, vec2(-3212.8208, -59.94)));
                                }
                                _GLF_color = uintBitsToFloat(uvec4(143484u, 29608u, 88375u, 89506u));
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = refract(vec4(7.1, 6.2, -958.526, 5626.2195), injectionSwitch.yxxx, -1820.4314);
                            }
                            _GLF_color = mix(_GLF_color, _GLF_color, vec4(-2733.8014, -454.724, 2.6, -9.4));
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(9279.6413, 97.71, 96.43, -96.90);
                    }
                }
            }
            matrix_number = matrix_number + 1u;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(21.60, -9.3, 81.83, -5.3);
    }
    float sums[9];
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                _GLF_color = vec4(injectionSwitch, mod((17.74 + (-1.4)), smoothstep(1375.1937, 573.914, -483.006)), one);
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = mod(fwidth(_GLF_color), -32.46);
                    }
                } else {
                    _GLF_color = vec4(-425.586, 2368.3503, -3790.9842, -81.08);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = floor(vec4(-2.8, 67.96, -6.0, 4.8));
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = smoothstep(one, one, _GLF_color);
                }
            } else {
            }
        }
    } else {
    }
    int sum_index = 0;
    do {
        if (_GLF_DEAD(false)) {
            _GLF_color = acosh(mat2x4(980.162, 76.62, -7062.3019, -84.10, -5.4, -527.104, 3062.2647, -19.77)[1]);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = degrees(vec4(-6.5, 4.6, 6659.5448, 3.8));
                }
                _GLF_color = _GLF_color;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
            _GLF_color = _GLF_color;
        }
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        _GLF_color = radians(vec4(-4910.0512, 96.82, -8.8, -4152.7203));
    }
    for (int cols = 2; cols <= 4; cols++) {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = sinh((injectionSwitch * m42));
                    }
                    for (int _injected_loop_counter = ((-63435) & 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3)))); _injected_loop_counter++) {
                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = tanh(vec4(6.4, 4.1, -53.69, 6343.6887));
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, determinant(mat2(0.0, 0.0, 1.0, 0.0)), 0.0)))))) {
                    _GLF_color = _GLF_color;
                }
            } else {
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = mod(vec4(-467.350, -6.7, -8593.2584, -3.6), -4.0);
        }
        if (_GLF_DEAD(false)) {
            do {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(vec2(1.9, 49.59), 79.37, -819.368);
                }
                _GLF_color = _GLF_color;
            } while (_GLF_WRAPPED_LOOP(false));
        }
        for (int rows = 2; rows <= 4; rows++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = vec4(4.2, 3707.4597, 188.737, 0.4);
            }
            sums[sum_index] = 0.0;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = atan(smoothstep(one, 7843.3981, _GLF_color));
            }
            for (int _injected_loop_counter = (1 ^ int(_GLF_ONE(1.0, injectionSwitch.y))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                for (int c = 0; c < cols; c++) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                    _GLF_color = vec4(-32.29, 4.5, -3520.1251, -65.70);
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            _GLF_color = _GLF_color;
                        }
                    } else {
                    }
                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 | 1)); _injected_loop_counter++) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = _GLF_color;
                        }
                        do {
                            if (_GLF_DEAD(false)) {
                                for (int _injected_loop_counter = (((-40363) * (-78613)) & int(_GLF_ZERO(0.0, injectionSwitch.x))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 | 1)); _injected_loop_counter++) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        _GLF_color = cosh(vec4(-4077.0595, -43.98, -7.0, 7482.0926));
                                    }
                                }
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    if (_GLF_DEAD(false)) {
                                        do {
                                            _GLF_color = vec4(one, one, vec2(43.17, 8073.4936));
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x)))));
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(5268.6220, -17.86, -7180.4356, 93.85).yzxz;
                                            }
                                        } else {
                                            _GLF_color = vec4(-3675.8341, -3.8, 8682.0514, 459.313);
                                        }
                                    }
                                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                            _GLF_color = vec4(9.9, -530.067, 500.634, 609.277);
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                    }
                    for (int r = 0; r < rows; r++) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = fma(step(vec4(-4.9, 7.8, -944.781, 268.338), vec4(-9029.0233, 18.45, 32.64, -3479.7862)), vec4(-16.82, -7.2, -4.2, 8.6), vec4(-467.783, -2.8, -9.2, -176.329));
                            }
                        } else {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = ((uvec4(195660u, 131078u, 2276u, 230u) != uvec4(20320u, 148444u, 86384u, 98307u)) ? vec4(-8.4, 59.64, 5718.5830, -914.771) : _GLF_color);
                                    } else {
                                    }
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = vec4(mod(2535.6704, one), injectionSwitch, one);
                                }
                                switch (sum_index) {
                                    case 0:
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            do {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = dFdyFine(reflect(vec4(one, 22.37, resolution), acosh(_GLF_color)));
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        do {
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = atanh(vec4(one, reflect(63.00, -959.127), -29.29, one));
                                                            } else {
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = (_GLF_color * m44);
                                            }
                                        }
                                        sums[sum_index] += m22[c][r];
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = refract(vec4(-569.526, -449.099, 2.8, -8.7), vec4(5.6, -385.016, -14.76, -7.1), one);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = unpackSnorm4x8(96215u);
                                            }
                                        }
                                        break;
                                    case 1:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = fract(vec4(-2.1, -6910.7481, 39.86, -9.8));
                                        }
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), ~(~(int(4))))))); _injected_loop_counter--) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                _GLF_color = floor(_GLF_color);
                                            }
                                            sums[sum_index] += m23[c][r];
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec2(-3989.7627, 473.337).ssts;
                                        }
                                    case 2:
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                                            if (_GLF_DEAD(false)) {
                                                do {
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                _GLF_color = min((_GLF_color * m44), intBitsToFloat(min(cols, c)));
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                } else {
                                                                    _GLF_color = cos((_GLF_color - one));
                                                                }
                                                            }
                                                        } else {
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        _GLF_color = _GLF_color;
                                                    } else {
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                if (_GLF_DEAD(false)) {
                                                    for (int _injected_loop_counter = (1 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                        _GLF_color = exp(_GLF_color);
                                                    }
                                                }
                                            }
                                        } else {
                                        }
                                        do {
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                do {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(-1558.3956, -846.814, -3489.4067, 4730.7791);
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_color;
                                                                } else {
                                                                }
                                                            }
                                                            _GLF_color = vec4(7.0, -5.0, 874.748, 431.875);
                                                        }
                                                        _GLF_color = radians(injectionSwitch).rgrg;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                            _GLF_color = degrees(vec4(-84.13, -6.5, 82.75, -3443.3250));
                                                        }
                                                    }
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                                            _GLF_color = mix(vec4(-1892.9920, -2.9, 29.96, -3551.6294), vec4(-58.23, -36.96, 376.793, -5.3), lessThan(uvec4(9937u, 53835u, 163779u, 166331u), uvec4(99087u, 72431u, 38382u, 72008u)));
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        _GLF_color = _GLF_color;
                                                                    }
                                                                }
                                                            } else {
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_IDENTITY(true, (true) && true), false || (_GLF_IDENTITY(true, (true) && true))))) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                _GLF_color = _GLF_color.ywxw;
                                                            } else {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = asinh(vec4(4038.9583, 7.5, -53.65, -3.4));
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(resolution, resolution);
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter--) {
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            _GLF_color = vec4(17.69, 2338.6626, 26.16, -7.3);
                                                                        }
                                                                    } else {
                                                                    }
                                                                    _GLF_color = (vec4(one, trunc(one), _GLF_color[3], -9.6) + 483.874);
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(0.5, -9576.5281, -401.935, -603.494);
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                    }
                                                    sums[sum_index] += m24[c][r];
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    } else {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(one, vec3(-44.21, -2.4, 242.793));
                                                        }
                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                            _GLF_color = (one / sin(_GLF_color));
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            _GLF_color = clamp(mix(_GLF_color, vec4(-5.1, -6.5, -3.0, 3.2), bvec4(false, false, true, false)), _GLF_color, vec4(7243.8659, 3.3, -94.09, 4.3));
                                                        }
                                                        for (int _injected_loop_counter = (((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), ~(~(int(0)))))) & int(_GLF_ONE(1.0, injectionSwitch.y))); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                            for (int _injected_loop_counter = (1 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    _GLF_color = vec4(1.7, 559.898, -17.52, 7.3);
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = (vec4(-0.9) + one);
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = vec3(64.30, -1.7, -7715.7002).ttst;
                                                        if (_GLF_DEAD(false)) {
                                                            do {
                                                                _GLF_color = _GLF_color;
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = fwidth(degrees(vec4(3561.2667, -7.1, 5231.7921, 3.3)));
                                                                    }
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                        }
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-6322.1455, 30.71, -6150.6965, -9.6);
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(1.0, 7584.8086, 77.89, -887.273);
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(233.390, 6.7, 0.7, 6.0);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    do {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            _GLF_color = vec4(-2.9, -8411.2487, 285.685, -3.3);
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = vec4(-79.18, dFdx(injectionSwitch), one);
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                                        _GLF_color = vec4(49.48, -1.8, -4897.1126, -90.15);
                                                    }
                                                }
                                            } else {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = smoothstep(one, ((-88.44) + one), _GLF_color);
                                                    } else {
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                }
                                            }
                                            _GLF_color = _GLF_color;
                                        }
                                    case 3:
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        _GLF_color = (463.298 / _GLF_color);
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(cols) : int(4))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = floor(_GLF_color);
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                                                                    _GLF_color = abs(vec4(-9.8, -1.8, -63.93, 56.89));
                                                                } else {
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = inversesqrt(atanh(_GLF_color));
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    _GLF_color = vec4(18.75, -13.04, 1701.5945, -7838.7190);
                                                                }
                                                            } else {
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = vec4(smoothstep(one, vec3(2.6, 4.8, -8436.1883)[2], injectionSwitch), -9.6, fract(log(one)));
                                                }
                                            }
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = mix(_GLF_color, vec4(41.92, -3.0, 252.777, 0.7), bvec4(false, false, true, true));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = roundEven(_GLF_color);
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                        } else {
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter++) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(false)) {
                                                    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), int(_GLF_IDENTITY(ivec4(int(2), 1, 0, 0), (ivec4(int(2), 1, 0, 0)) * ivec4(1, 1, 1, 1)))))) >> _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                        _GLF_color = fwidthFine(vec4(-5.6, -996.811, -2400.1292, 5.7));
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = (vec4(2.2, -70.92, -6.4, -7.8) + _GLF_color);
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = acos(vec4(907.521, -950.810, -96.19, 5.3));
                                                }
                                            } else {
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), !(!(!(false)))))))) {
                                            do {
                                                _GLF_color = _GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = fwidth(vec4(910.015, 965.168, 9.9, -8059.4399));
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = tanh(_GLF_color);
                                        }
                                        sums[sum_index] += m32[c][r];
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                                do {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                            }
                                        } else {
                                        }
                                        break;
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = vec4(-3958.3644, -20.61, -2.3, -7033.5522);
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = vec4(9.1, -6.0, -71.85, 294.652);
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = ceil(vec4(741.197, -6.1, -9885.9910, 3120.0977));
                                                }
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 | 1)); _injected_loop_counter++) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(sqrt(0.0)))))) {
                                                            _GLF_color = vec4(-3172.5303, 5.8, 0.4, -4.0);
                                                        }
                                                        _GLF_color = _GLF_color;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        _GLF_color = _GLF_color;
                                                    } else {
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = vec4(0.4, 5.8, 9281.6321, -6.3);
                                        }
                                    case 4:
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            sums[sum_index] += m33[c][r];
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = refract(vec4(76.28, -7.5, -991.993, 5.4), _GLF_color, 580.411);
                                            }
                                        }
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = vec4(816.357, -5921.5498, -2.2, 4644.4518);
                                        }
                                    case 5:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), clamp(_GLF_IDENTITY(int(1), min(int(1), int(1))), int(1), int(1))))) >> _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), (false ? _GLF_FUZZED(cols) : int(1))))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                    _GLF_color = cosh(_GLF_color);
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = (vec2(-9.1, 2320.3213) * mat4x2(0.0, 8.5, 1667.5869, -8833.3301, -2483.1944, -7550.6263, 6346.3996, 74.20));
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(-8.2, -5981.3335, 111.652, -186.029);
                                                }
                                                _GLF_color = floor(vec4(55.69, 7.7, -9707.5395, -42.24));
                                            }
                                            _GLF_color = fwidthCoarse(vec4(853.734, -5.8, -6.8, -7475.9221));
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        do {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                } else {
                                                                    do {
                                                                        do {
                                                                            if (_GLF_DEAD(false)) {
                                                                                _GLF_color = _GLF_color;
                                                                            }
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                if (_GLF_DEAD(false)) {
                                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                    } else {
                                                                                        _GLF_color = _GLF_color;
                                                                                    }
                                                                                }
                                                                            } else {
                                                                            }
                                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            } else {
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                    _GLF_color = inversesqrt(mix(_GLF_color, round(_GLF_color), bvec4(false, false, false, false)));
                                                                                }
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                        _GLF_color = _GLF_color;
                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                }
                                                            } else {
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    _GLF_color = vec4(-3570.5127, 6705.0924, 7.7, 7.2);
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (((1 & 1) << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter++) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(0, (_GLF_IDENTITY(0, min(0, 0))) ^ 0)); _injected_loop_counter--) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = (_GLF_color + vec4(-9.3, -399.735, 9.4, -6.0));
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = sin(vec4(900.218, -78.18, -3953.6868, -6.0));
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                    } else {
                                                                        _GLF_color = asin(_GLF_color);
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = _GLF_color;
                                                                    }
                                                                    _GLF_color = max(smoothstep(_GLF_color, _GLF_color, _GLF_color), vec4(-9.2, -8.9, -770.749, -0.4));
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = (mat3x4(7.5, 5023.8093, -6.8, -293.666, -9055.8817, -6088.7404, -1.2, 7.5, 4.1, 1720.3654, 5663.5527, -95.51) * vec3(0.3, -6.9, 5.9));
                                                                }
                                                                _GLF_color = vec4(9.5, -9.6, -4.4, -8.8);
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = (atan(vec3(-555.998, 960.087, 47.96), vec3(-700.832, -2.7, -3.2)) * m43);
                                                                }
                                                                _GLF_color = vec4(-1197.7983, 24.63, -4.1, -96.47);
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = (one / vec4(4.3, 85.61, 631.365, 9184.2881));
                                                            }
                                                            _GLF_color = vec4(-6626.9123, -49.71, -1.2, -4.2);
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = vec4(1.4, -6.1, -3668.3649, -3.1);
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        do {
                                                            _GLF_color = inversesqrt(_GLF_color);
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                    }
                                                    sums[sum_index] += m34[c][r];
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        for (int _injected_loop_counter = _GLF_IDENTITY(0, int(ivec3(0, 1, 0))); _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, (1) - 0)); _injected_loop_counter++) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = reflect(vec4(-1.6, -5568.8024, -1.1, -7.6), _GLF_color);
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    _GLF_color = vec4(53.00, (-5246.9758), injectionSwitch);
                                                                }
                                                                _GLF_color = inversesqrt(vec4(80.39, 21.33, 4250.3408, -7.2));
                                                            }
                                                        } else {
                                                        }
                                                        _GLF_color = (896.161 + _GLF_color);
                                                    }
                                                } else {
                                                }
                                            } else {
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = vec4(-781.340, -8.2, -6996.9821, 8.3);
                                                }
                                            } else {
                                            }
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                _GLF_color = pow((one / _GLF_color), vec4(37.30, 3607.4534, 9850.2369, 467.227));
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = atanh(_GLF_color);
                                        }
                                    case 6:
                                        sums[sum_index] += m42[c][r];
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = vec4(vec2(4.2, -7.2).r, abs(one), resolution);
                                                }
                                                _GLF_color = dFdxCoarse((vec3(8.0, 2.4, 2.7) * m43));
                                            }
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                _GLF_color = exp2(_GLF_color);
                                            }
                                        }
                                    case 7:
                                        do {
                                            do {
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(_GLF_ZERO(0.0, injectionSwitch.x)))))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = fma(vec4(-2.8, -56.91, 4525.7515, 7.9), vec4(-4.1, 5.5, 638.607, 999.224), vec4(85.56, -3.9, -688.208, -8.8));
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    sums[sum_index] += m43[c][r];
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                do {
                                                                    do {
                                                                        _GLF_color = vec4(773.889, -3297.3831, 396.609, -128.548);
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                                            _GLF_color = vec4(-696.187, -2.1, -8.1, -6.8);
                                                                        }
                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0))))));
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    _GLF_color = (dot(vec3(17.01, 0.3, 1.2), vec3(-96.86, -8539.3064, -6859.7214)) - injectionSwitch.ssst);
                                                                }
                                                            }
                                                        } else {
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = sqrt(vec4(-7727.4409, 0.3, -802.518, -7114.2805));
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, true))))) {
                                                            for (int _injected_loop_counter = (int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ (0 << _GLF_IDENTITY(int(8), int(8)))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ 1)); _injected_loop_counter++) {
                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                } else {
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = _GLF_color;
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = vec4(226.877, 31.71, 5.2, -8680.7249);
                                                                        }
                                                                    }
                                                                    do {
                                                                        for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                            if (_GLF_DEAD(false)) {
                                                                                _GLF_color = sin(max(_GLF_color, refract(5.5, one, 6.8)));
                                                                            }
                                                                            _GLF_color = mix(_GLF_color, cosh(_GLF_color), 4.2);
                                                                        }
                                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(6630.1016, 1.5, 29.84, -3.7);
                                                        }
                                                        _GLF_color = _GLF_color;
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0)))));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = dFdyCoarse(sin(_GLF_color));
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            _GLF_color = sign(vec4(63.36, 2.0, 12.25, -2212.8866));
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                    case 8:
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | 0)); _injected_loop_counter--) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                                _GLF_color = vec4(-107.868, 9.2, -965.562, 7135.4886);
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = reflect(vec4(-9.9, 5745.7929, -3614.4504, 999.517), acosh(vec4(-7.5, 75.74, -8.9, 776.431)));
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = uintBitsToFloat(uvec4(46123u, 31956u, 145984u, 140587u));
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(4.6, -0.6, 182.173, -6.3);
                                                }
                                            }
                                        }
                                        sums[sum_index] += m44[c][r];
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(mix(one, 3621.7435, false));
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = intBitsToFloat(ivec4(58669, -70041, -12850, 91848));
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = dFdx(_GLF_color);
                                                }
                                            }
                                        } else {
                                        }
                                        break;
                                }
                            } else {
                            }
                        } else {
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (vec3(-380.662, 1417.0342, -2.8) * (mat3(36.79, -3.7, 9.7, -783.167, 7737.4438, 5.3, -79.55, -4.3, -730.111) * mat4x3(4.1, 254.720, -6.6, 15.59, -7962.8005, -4.2, -2.6, 7.5, -8867.2799, 0.9, 641.016, -298.801)));
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(sqrt(1.0), 1.0, 0.0, 1.0), vec4(0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0)), dot(vec4(sqrt(1.0), 1.0, 0.0, 1.0), vec4(0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0))))))) {
                                _GLF_color = round(vec4(-3.0, -5.7, 5.9, -353.664));
                                do {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = asin(vec4(5664.6145, 807.632, 41.60, 13.86));
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (vec4(2.9, 1.5, -1.3, -8382.3876) / (-8.2));
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = vec4(3541.6256, -2.2, 5.2, 9.5);
                                    }
                                    _GLF_color = clamp(_GLF_color, one, one);
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = vec4(42.91, -59.88, -951.344, -3326.5473);
                                do {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                        _GLF_color = vec4(-9.3, -5.7, -5867.2693, -1113.1675);
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-552.316, -46.92, 8.6, -12.79);
                            }
                            for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = normalize(sin(vec4(5717.0941, 6.7, -3.8, 6.7)));
                                    } else {
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            } else {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = log(_GLF_color.tst.bgbr);
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    } else {
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                }
                                _GLF_color = vec4(561.323, 1963.9563, -6038.0747, 6.6);
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_color.qqsq;
                                        } else {
                                        }
                                    } else {
                                    }
                                }
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (vec3(467.819, 7.4, 1.7) * m43);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(0.7, -1.4, 6.0, -281.417);
                                    }
                                }
                            } else {
                            }
                        } else {
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
            sums[sum_index] /= 16.0;
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            } else {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    sum_index++;
                }
            }
        }
    }
    int region_x = int(gl_FragCoord.x / (resolution.x / 3.0));
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            _GLF_color = (one / _GLF_color);
        }
        _GLF_color = _GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = asinh(_GLF_color);
        }
    }
    int region_y = int(gl_FragCoord.y / (resolution.x / 3.0));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = mix(vec4(8528.9907, 7.7, 8414.8505, 9.2), _GLF_color, bvec4(false, false, true, true));
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
        _GLF_color = _GLF_color;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (int(7)) + (0 << _GLF_IDENTITY(int(6), int(6)))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    _GLF_color = vec4(2.1, 0.5, 39.49, -531.730);
                }
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_color;
                } else {
                }
            }
        }
        _GLF_color = vec4(772.972, -4517.5574, -857.592, -880.933);
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = radians(fwidthCoarse((vec4(15.79, 1.2, -566.782, 43.37) * _GLF_color)));
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat2(0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), 0.0, 0.0)))))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = (tan(one) * (vec4(48.98, 15.64, 515.764, 9.9) + _GLF_color));
            }
            _GLF_color = _GLF_color;
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = tan(_GLF_color);
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec3(false, false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))), true && (bool(bvec3(false, false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))))) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                }
            } else {
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = atanh(vec4(-367.751, 3369.8637, -32.69, 1343.6203));
            }
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = ((-0.2) - round(log2(_GLF_color)));
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = atan(vec4(17.52, -725.541, 516.920, -170.179), vec4(9.8, -0.5, 5430.6263, -9918.4223));
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0)))))) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(0.8, -976.663, 265.622, 42.56);
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(false)) {
                do {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = refract(_GLF_color, _GLF_color, 83.85);
                        } else {
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-3.3, -2.7, 8.5, 83.60);
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(128.571, -1.9, 65.79, -7514.5604);
                }
                do {
                    _GLF_color = vec4(7.5, 6.5, 86.45, -18.09);
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
            }
        }
    }
    int overall_region = region_y * 3 + region_x;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        for (int _injected_loop_counter = (0 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), (int(5)) / 1)))); _injected_loop_counter--) {
            _GLF_color = _GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = _GLF_color;
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), (int(6)) / 1))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                if (_GLF_DEAD(false)) {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = log(_GLF_color);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter++) {
                                        _GLF_color = atanh(vec4(-896.757, -4.4, 6.3, 4945.4230));
                                    }
                                }
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = dFdy(_GLF_color);
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = atan(vec4(-1.2, -27.64, -90.78, 969.207), vec4(19.49, 42.60, 5.7, 31.72));
                            } else {
                            }
                        }
                        _GLF_color = _GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = vec4(16.57, 2.5, -417.697, 303.937);
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                do {
                                    _GLF_color = _GLF_color;
                                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, bool(bvec2(false, true)))));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = dFdyFine(acosh(mix(vec4(20.10, -8.2, 0.4, 94.60), vec4(-2799.9876, 74.24, 90.47, 2964.9569), one)));
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                        } else {
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = vec4(8298.2105, -9.7, 3.6, -65.04);
                        }
                        do {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = uintBitsToFloat(uvec4(175917u, 175648u, 146922u, 63927u));
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > ((-64533) & int(_GLF_ZERO(0.0, injectionSwitch.x)))); _injected_loop_counter--) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(922.616, 1226.5205, 2.1, 5.1);
                                        }
                                        _GLF_color = _GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                    _GLF_color = vec4(-2.2, -3186.2304, 0.6, -2.1);
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(vec3(59.12, -701.539, -1.2), one);
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = (vec4(-8.2, 9.0, 1.4, 125.100) + one);
                        }
                    }
                    do {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = m44[3];
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = tan(_GLF_color);
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = fwidth(unpackUnorm4x8(114938u));
                    }
                    do {
                        _GLF_color = _GLF_color;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0)))));
                }
            }
        } else {
        }
    } else {
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
        if (_GLF_DEAD(false)) {
            _GLF_color = ((+roundEven(_GLF_color)) * (-83.97));
        }
    } else {
    }
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        if (overall_region > 0 && overall_region < 9) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = vec4(-60.08, -66.43, -1.7, 91.60);
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = tan(_GLF_color);
                }
                _GLF_color = clamp(_GLF_color, _GLF_color, vec4(-516.963, -206.283, -4.2, 39.78));
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        _GLF_color = ((_GLF_color * vec4(9.2, -7.2, 6810.3235, -3.1)) * m44);
                    }
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                _GLF_color = vec4(vec3(sums[overall_region]), 1.0);
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(6383.5592, 8064.1083, 1.9, -72.37);
            }
            if (_GLF_DEAD(false)) {
                do {
                    _GLF_color = _GLF_color;
                } while (_GLF_WRAPPED_LOOP(false));
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = acosh(_GLF_color);
            }
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 0)); _injected_loop_counter--) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                        do {
                            _GLF_color = exp(atan(_GLF_color));
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    _GLF_color = vec4(826.642, fma(fwidthCoarse(one), exp(one), one), distance(_GLF_color, _GLF_color), max(-4270.8643, -22.22));
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = max(vec4(-197.217, 6760.5185, -9471.5092, 3232.1305), one);
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    }
                }
            }
            _GLF_color = vec4(vec3(0.0), 1.0);
            if (_GLF_DEAD(false)) {
                do {
                    _GLF_color = vec4(-2.2, -9144.3945, 89.25, 1.2);
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = (vec4(4.4, -2.0, -27.81, 3.3) * mat4(one));
        do {
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
}
