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

struct _GLF_struct_16 {
    vec4 _f0;
    int a;
    uvec2 _f1;
    mat4 _f2;
    mat3x4 _f3;
};

struct _GLF_struct_20 {
    mat4x2 _f0;
    bvec4 _f1;
    ivec3 _f2;
    ivec3 _f3;
    mat3 _f4;
    mat3 _f5;
    mat2x4 _f6;
};

struct _GLF_struct_19 {
    uvec4 _f0;
    bool _f1;
    mat4x3 _f2;
    mat4x2 _f3;
    uvec2 _f4;
    vec3 _f5;
    mat2x3 _f6;
};

struct _GLF_struct_18 {
    _GLF_struct_19 _f0;
    vec2 _f1;
    mat4x3 _f2;
    _GLF_struct_20 _f3;
    vec4 _f4;
    mat4x3 _f5;
    mat2x3 _f6;
};

struct _GLF_struct_17 {
    vec4 _GLF_outVarBackup_GLF_color;
    mat3 _f0;
    _GLF_struct_18 _f1;
};

struct _GLF_struct_21 {
    vec4 _GLF_outVarBackup_GLF_color;
    vec3 _f0;
};

struct _GLF_struct_22 {
    vec2 _f0;
    vec4 _GLF_outVarBackup_GLF_color;
    mat3x4 _f1;
};

struct _GLF_struct_23 {
    float _f0;
    vec2 _f1;
    vec4 _GLF_outVarBackup_GLF_color;
    uvec4 _f2;
    ivec3 _f3;
    vec2 _f4;
};

struct _GLF_struct_11 {
    float _f0;
    ivec4 _f1;
    bvec4 _f2;
    bvec4 _f3;
};

struct _GLF_struct_10 {
    uint _f0;
    mat3x2 _f1;
    vec2 _f2;
    vec3 _f3;
    _GLF_struct_11 _f4;
    ivec4 _f5;
    float _f6;
};

struct _GLF_struct_9 {
    ivec2 _f0;
    ivec2 _f1;
    mat4x3 _f2;
    vec4 _GLF_outVarBackup_GLF_color;
    mat4x3 _f3;
    mat4x2 _f4;
    mat4 _f5;
    vec2 _f6;
};

struct _GLF_struct_8 {
    _GLF_struct_9 _f0;
    _GLF_struct_10 _f1;
    vec4 _f2;
    mat4x2 _f3;
    bvec2 _f4;
};

struct _GLF_struct_14 {
    mat3 _f0;
    vec2 _f1;
    vec3 _f2;
    mat2x4 _f3;
    bvec2 _f4;
    float _f5;
    vec4 _GLF_outVarBackup_GLF_color;
};

struct _GLF_struct_13 {
    _GLF_struct_14 _f0;
    vec3 _f1;
    int _f2;
};

struct _GLF_struct_12 {
    mat3x2 _f0;
    mat4 _f1;
    mat3x4 _f2;
    _GLF_struct_13 _f3;
    ivec3 _f4;
};

struct _GLF_struct_15 {
    uint _f0;
    vec4 _GLF_outVarBackup_GLF_color;
};

struct _GLF_struct_7 {
    int _f0;
    mat3x4 _f1;
    vec4 _GLF_outVarBackup_GLF_color;
};

struct _GLF_struct_6 {
    bool _f0;
    ivec4 _f1;
    bool _f2;
    mat3 _f3;
    mat2x4 _f4;
    ivec4 _f5;
};

struct _GLF_struct_5 {
    mat2 _f0;
    ivec2 _f1;
    mat4 _f2;
    mat2x4 _f3;
};

struct _GLF_struct_4 {
    _GLF_struct_5 _f0;
    uvec4 _f1;
    _GLF_struct_6 _f2;
    int _f3;
};

struct _GLF_struct_3 {
    mat4x2 _f0;
    mat2x3 _f1;
    uvec4 _f2;
    uvec2 _f3;
    mat2x3 _f4;
    uvec3 _f5;
    ivec4 _f6;
};

struct _GLF_struct_2 {
    _GLF_struct_3 _f0;
    vec3 _f1;
};

struct _GLF_struct_1 {
    vec2 _f0;
    vec4 _f1;
};

struct _GLF_struct_0 {
    _GLF_struct_1 _f0;
    _GLF_struct_2 _f1;
    uvec2 _f2;
    _GLF_struct_4 _f3;
    _GLF_struct_7 _f4;
};

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
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        do {
            return vec2(1.0, 1.0);
        } while (_GLF_WRAPPED_LOOP(false));
        {
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec2(1.0, 1.0);
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    return vec2(1.0, 1.0);
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                do {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    _GLF_color = log(vec4(2.1, -678.982, 83.35, -9.6));
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec2(true, false))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    } else {
                    }
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))))) {
                _GLF_outVarBackup_GLF_color = _GLF_color;
            } else {
            }
            _GLF_color = vec4(-4.3, 2.3, 87.00, -401.377);
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = reflect(_GLF_color, _GLF_outVarBackup_GLF_color);
                }
            } else {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        _GLF_color = mix(ceil(_GLF_color), _GLF_color, vec4(-6420.8056, 9.1, -759.218, -2252.8549));
                    }
                } else {
                    for (int _injected_loop_counter = _GLF_IDENTITY(1, min(1, 1)); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (false, atan(_GLF_outVarBackup_GLF_color, _GLF_color));
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return vec2(1.0, 1.0);
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = sign(_GLF_outVarBackup_GLF_color);
                    }
                }
            }
        }
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & 1)); _injected_loop_counter++) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            } else {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        return vec2(1.0, 1.0);
                    }
                    _GLF_color = _GLF_color;
                }
            }
        }
    }
    _GLF_struct_16 _GLF_struct_replacement_16 = _GLF_struct_16(vec4(1.0, 1.0, 1.0, 1.0), 4, uvec2(1u, 1u), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                        return vec2(1.0, 1.0);
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                } else {
                }
                return vec2(1.0, 1.0);
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec2(1.0, 1.0);
            }
        }
        if (_GLF_DEAD(false)) {
            return vec2(1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            return vec2(1.0, 1.0);
        }
    } else {
        if (_GLF_DEAD(false)) {
            _GLF_color = mix(_GLF_color, vec4(-5.2, 6.3, -8962.0027, -7169.3268), abs(_GLF_color));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec2(1.0, 1.0);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec2(1.0, 1.0);
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec2(1.0, 1.0);
        }
    } else {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = unpackSnorm4x8((187849u % 21346u));
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = vec4(702.460, -83.48, -2.5, -5233.7701);
            }
        } else {
            _GLF_outVarBackup_GLF_color = _GLF_color;
        }
        _GLF_color = vec4(-894.888, 83.81, -248.958, 96.23);
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec2(1.0, 1.0);
        }
        do {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                } else {
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    do {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & 1)); _injected_loop_counter++) {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                discard;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec3(0.0, 0.0, 0.0)))))) {
                    return vec2(1.0, 1.0);
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
            } else {
            }
            _GLF_color = vec4(-62.81, 735.210, -85.50, 2.2);
            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                break;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-4.9, 7254.5976, 452.415, 312.919);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    break;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        return vec2(1.0, 1.0);
                    }
                }
            }
            continue;
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = normalize(intBitsToFloat(clamp(ivec4(-71820, -87245, 58575, -72408), -27167, -99045)));
            }
            break;
        }
        uv.y -= step(injectionSwitch.y, uv.x);
        uv.x -= tanh(uv.x * 0.25) / ldexp(injectionSwitch.y, findMSB(_GLF_struct_replacement_16.a));
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            continue;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                discard;
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                continue;
            }
            for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 ^ 0)); _injected_loop_counter++) {
                _GLF_color = vec4(8637.2109, -11.99, 8.4, -2601.0057);
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                for (int _injected_loop_counter = (0 | (0 << _GLF_IDENTITY(int(3), int(3)))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    return vec2(1.0, 1.0);
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = mix(_GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color, bvec4(false, true, true, true));
            }
        }
        if (_GLF_DEAD(false)) {
            continue;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                _GLF_color = roundEven(vec4(-46.33, 34.16, -0.6, 1689.7138));
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = (732.199 / (_GLF_outVarBackup_GLF_color - _GLF_outVarBackup_GLF_color));
            }
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
        }
        for (int _injected_loop_counter = (((1 & 1) << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            if (_GLF_DEAD(false)) {
                discard;
            }
        }
        _GLF_struct_replacement_16.a--;
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                continue;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = vec4(5957.0218, -6.7, 44.99, -5.6);
            } else {
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = _GLF_color;
            }
            _GLF_color = atan(mod(_GLF_color, -387.371), smoothstep(6.9, 680.870, vec4(-2116.2215, -427.547, 75.66, 778.288)));
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(0.0, 0.0, 0.0, 0.0), vec4(1.0, 1.0, 1.0, 1.0)), dot(vec4(0.0, 0.0, 0.0, 0.0), vec4(1.0, 1.0, 1.0, 1.0))))))) {
                        _GLF_color = vec4(8129.5542, -266.602, -61.56, 5.3);
                    }
                    continue;
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    discard;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = asinh(fwidthFine(vec4(-93.89, -99.96, -5.1, -20.50)));
                    }
                } else {
                }
            }
        }
    } while (_GLF_struct_replacement_16.a > int(injectionSwitch.x));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return vec2(1.0, 1.0);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec2(1.0, 1.0);
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = ldexp(vec4(-8.2, 92.17, -6819.7882, -3477.7250), (ivec4(-74277, 11963, -91242, -8662) & (-32721)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = fract(_GLF_outVarBackup_GLF_color);
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(false)) {
            return vec2(1.0, 1.0);
        }
        _GLF_color = mix(vec4(-4.8, -5828.3969, -65.65, 3.6), dFdy(_GLF_color), notEqual(vec4(1662.0048, -941.421, -48.63, -0.7), vec4(7018.2328, 8.8, -76.53, -2525.0419)));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec2(1.0, 1.0);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                _GLF_color = normalize(sinh(_GLF_color));
            }
        }
    }
    int b = 3;
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(_GLF_struct_replacement_16.a);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = dFdyCoarse(_GLF_color);
        }
        if (_GLF_DEAD(false)) {
            break;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-4807.4225, 2827.3395, -121.633, 42.28);
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        do {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
            uv.x *= (isnan(uv.y) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x));
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
        if (_GLF_DEAD(false)) {
            discard;
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            b--;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = sinh(_GLF_color);
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = vec4(-28.82, -8291.5185, 6.4, 22.70);
            }
            discard;
        }
    } while (b > int(injectionSwitch.x));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-33.10, -733.455, -4.5, 2.7);
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        } else {
            do {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-841.565, 392.194, -2.7, -7293.8018);
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = unpackUnorm4x8((floatBitsToUint(4.7) - 48763u));
            }
            return vec2(1.0, 1.0);
        }
    }
    int c = 2;
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(vec2(0.0, 0.0)))))) {
        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = vec4(-6.6, 4.9, 3170.1879, 1.8);
                }
                {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true && (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))) {
                            _GLF_color = dFdxCoarse(_GLF_color);
                        }
                        continue;
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        continue;
                    }
                    do {
                        _GLF_color = vec4(623.203, 682.854, -0.2, -900.155);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    } else {
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (exp2(vec4(4.6, 2.7, -4.3, 59.87)) / vec4(2495.5552, 2.0, -9.6, 9.9));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), (false ? _GLF_FUZZED(-91329) : int(5))))) >> _GLF_IDENTITY(int(5), int(5))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            return vec2(1.0, 1.0);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (vec2(-97.07, 319.250) * mat4x2(mat3x4(6.0, -14.79, -6.9, -472.790, 1350.6150, 71.16, -5530.3581, 754.566, 4.3, -1.3, 23.78, 9092.6686)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(_GLF_IDENTITY(false, (false) && true), true, true))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = _GLF_color;
                            }
                        }
                        _GLF_color = (max(_GLF_color, vec4(7737.0483, -5.3, 17.97, -393.985)) * mat4(9.5, 0.5, -6436.9127, 0.3, -49.27, -3053.7892, 1064.9276, -5.0, -28.02, -90.26, 210.743, 1.7, 2.0, 2.9, 943.809, 12.29));
                        if (_GLF_DEAD(false)) {
                            return vec2(1.0, 1.0);
                        }
                    }
                    continue;
                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, false, false))))) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = step(_GLF_color, vec4(81.30, -0.9, -5.9, 1.4));
                                }
                                for (int _injected_loop_counter = (1 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > ((-42027) & 0)); _injected_loop_counter--) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = (_GLF_color / (-9681.7639));
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                _GLF_color = mat3x4(-5.7, -9.5, -10.06, -7.9, 5.8, 908.842, -2372.4848, -9.5, 799.086, 6391.9973, -8.2, -3.7)[0];
                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                    discard;
                                }
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    } else {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = step(-30.39, vec4(-1.4, -95.54, 4883.4665, 41.00));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = acos(_GLF_color).wzzx;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                            discard;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(7391.3398, -7.1, -4.0, -702.572);
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        discard;
                                    } else {
                                    }
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        return vec2(1.0, 1.0);
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = dFdy(vec4(582.471, -29.39, -7.4, -37.08));
                                }
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                } else {
                                    _GLF_color = (7652.5295 / _GLF_outVarBackup_GLF_color);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    continue;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            } else {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                do {
                                    _GLF_color = reflect((97.72 - vec4(0.8, 530.363, 80.94, 3511.9631)), vec4(-8999.5127, -899.448, -2.8, 75.30));
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    break;
                                }
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        } else {
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(-4948.6685, 14.98, 7.8, -0.5);
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                        continue;
                    }
                }
                do {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, false))))) {
                        break;
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    } else {
                        uv.y -= step(injectionSwitch.y, uv.x) + float(_GLF_struct_replacement_16.a) + float(b);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return vec2(1.0, 1.0);
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                uv.x += ldexp(injectionSwitch.y, isinf(uv.y + uv.x) ? findMSB(b) : findMSB(_GLF_struct_replacement_16.a));
                c--;
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-46.56, 3.1, -5166.7511, 8389.9840);
                }
            } while (c > int(injectionSwitch.x));
        }
    } else {
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        _GLF_color = (vec4(6.5, 5.1, 325.556, -6.1) - 22.12);
    }
    int d = 1;
    do {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = sign(vec4(-8895.7927, 1.4, 565.254, -66.38));
            }
            continue;
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
        uv.y -= step(injectionSwitch.y, uv.x) + float(_GLF_struct_replacement_16.a) + float(b) + float(c);
        if (_GLF_DEAD(false)) {
            break;
        }
        for (int _injected_loop_counter = (1 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
            if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                _GLF_color = vec4(trunc(4438.8071), sin(-4.4), injectionSwitch);
            }
            d--;
        }
    } while (d > int(injectionSwitch.x));
    return fract(uv);
}

float patternize(vec2 uv) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = (clamp(_GLF_color, -0.0, acos(-9.0)) - (-9186.0010));
            }
            return 1.0;
        }
        return 1.0;
    }
    vec2 size = vec2(0.45);
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = vec4(519.506, 17.29, -1.2, -5986.4032);
    }
    vec2 st = step(size, uv);
    if (_GLF_DEAD(false)) {
        _GLF_color = log(vec4(-45.12, 474.784, 92.83, -4.1));
    }
    switch (int(mod(gl_FragCoord.y, 5.0))) {
        case 0:
            return mix(pow(st.x, injectionSwitch.y), st.x, size.y);
            break;
        case 1:
            {
                _GLF_struct_8 _GLF_struct_replacement_8 = _GLF_struct_8(_GLF_struct_9(ivec2(1, 1), ivec2(1, 1), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0)), _GLF_struct_10(1u, mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), vec3(1.0, 1.0, 1.0), _GLF_struct_11(1.0, ivec4(1, 1, 1, 1), bvec4(true, true, true, true), bvec4(true, true, true, true)), ivec4(1, 1, 1, 1), 1.0), vec4(1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_struct_replacement_8._f0._GLF_outVarBackup_GLF_color = _GLF_color;
                } else {
                }
                _GLF_color = vec4(6.9, 5.2, -8120.3683, 843.422);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_struct_replacement_8._f0._GLF_outVarBackup_GLF_color;
                }
            }
            return mix(pow(uv.y, injectionSwitch.y), st.y, size.x);
            break;
        case 2:
            {
                _GLF_struct_17 _GLF_struct_replacement_17 = _GLF_struct_17(vec4(1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_18(_GLF_struct_19(uvec4(1u, 1u, 1u, 1u), true, mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), vec3(1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), vec2(1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_20(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true), ivec3(1, 1, 1), ivec3(1, 1, 1), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), vec4(1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)));
                if (_GLF_DEAD(false)) {
                    return 1.0;
                }
                _GLF_struct_replacement_17._GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = min(vec4(58.19, -8603.3099, -760.877, 6.3), -2.4);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = atanh(acos(_GLF_color));
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                    } else {
                        do {
                            _GLF_color = _GLF_struct_replacement_17._GLF_outVarBackup_GLF_color;
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(70.79, -7482.2907, -216.472, 1.9);
                        }
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return 1.0;
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            return 1.0;
                        }
                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), min(int(4), int(4)))))); _injected_loop_counter++) {
                            _GLF_color = vec4(22.75, 44.92, -18.83, -56.81);
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return 1.0;
                }
            }
            discard;
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = ((normalize(142.945) - vec4(-0.4, 49.81, -5812.2552, 16.59)) + 0.9);
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    return 1.0;
                }
                return 1.0;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(61.85, 97.31, 36.37, -8796.6067);
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = inversesqrt(vec4(-54.88, -979.295, 10.51, -0.7));
                                }
                                return 1.0;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                            return 1.0;
                        }
                    }
                }
            } else {
            }
            break;
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                for (int _injected_loop_counter = (0 & (-92450)); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6))) << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter++) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            _GLF_color = dFdx(fwidthCoarse(vec4(-7.7, -57.20, -1.3, -747.947)));
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                _GLF_color = sqrt(_GLF_color);
                            }
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = clamp(vec4(-270.002, 51.82, 74.18, -8343.0707), fract(uintBitsToFloat(99394u)), 3.1);
                    for (int _injected_loop_counter = (0 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                break;
                            }
                            return 1.0;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return 1.0;
                        }
                    }
                }
                _GLF_color = vec4(-1.0, 12.48, -1329.4710, -5.5);
                if (_GLF_DEAD(false)) {
                    _GLF_color = cosh(_GLF_color);
                }
                do {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        } else {
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(5.3, -5956.1792, -7.9, 6234.1749);
                            }
                            if (_GLF_DEAD(false)) {
                                return 1.0;
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            } else {
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = smoothstep(-85.55, -1987.1083, unpackSnorm4x8(100518u));
                            }
                            _GLF_color = (vec4(-6.7, 651.364, 256.315, 5440.0855) / vec4(9.1, -4.8, -713.425, 65.85));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = sin((mat3x4(-3.9, -6162.0846, -3173.8887, -302.605, 1348.2993, 309.494, -4.9, 8236.9680, 48.19, 7.2, -7305.1129, 445.128) * vec3(-3756.8671, -1916.8213, -39.09)));
                                }
                                for (int _injected_loop_counter = ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7))); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                    if (_GLF_DEAD(false)) {
                                        return 1.0;
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = exp2(_GLF_outVarBackup_GLF_color);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return 1.0;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                } else {
                                    return 1.0;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                return 1.0;
                            }
                            _GLF_color = (-_GLF_color);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = ((+vec4(518.047, -533.071, -66.73, 9.2)));
                                }
                                return 1.0;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-5.6, 6.2, -667.344, -31.54);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return 1.0;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = (mat2x4(1944.3590, -4.3, 6626.5238, -1.3, 3208.7326, 1.9, 7.7, 3350.7203) * injectionSwitch);
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                return 1.0;
                            } else {
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, false))))) {
                _GLF_color = vec4(856.225, 7.9, 4.7, -23.57);
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return 1.0;
                }
                _GLF_color = vec4(-497.814, 8912.6732, 9.9, -5156.7056);
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = vec4(836.734, 8580.8955, -504.501, 2.1);
                        }
                    }
                }
            }
        case 3:
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return 1.0;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = max(vec4(3.8, -9.7, 536.788, 46.93), vec4(4.5, -9054.8158, 93.82, 7.3));
                }
                do {
                    for (int _injected_loop_counter = (((-16504) & 0) << _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 | (1 | 1))); _injected_loop_counter++) {
                        if (_GLF_DEAD(false)) {
                            return 1.0;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = step(_GLF_color, (_GLF_outVarBackup_GLF_color + vec4(60.38, -2260.3514, 809.608, 3.8)));
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    } else {
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        _GLF_color = vec4(0.9, -2767.1726, 6.4, -840.713);
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = dFdyCoarse(vec4(-0.6, 231.856, 418.907, 0.1));
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = (cos(_GLF_color) + determinant((true, mat2(6160.4475, 610.314, -7440.5410, 5.5))));
                    }
                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 ^ 0)); _injected_loop_counter--) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                return 1.0;
                            }
                        }
                    }
                } else {
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (+tan(vec4(-7.6, 13.21, 9.2, -766.023)));
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                } else {
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    break;
                                }
                            }
                        } else {
                        }
                        _GLF_color = mat2x4(-0.3, 89.03, -167.620, 2.4, -21.43, 94.07, -461.856, 792.875)[0];
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    return 1.0;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = exp2(vec4(-6.0, -6.1, -8680.4587, -89.30));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        for (int _injected_loop_counter = (1 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = roundEven(_GLF_color);
                }
                return 1.0;
            }
            return mix(pow(uv.y, injectionSwitch.y), uv.y, size.y);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = (mat4(-0.3, 6784.5185, -5.2, -188.963, -2.3, 7289.3446, -73.71, 67.69, 417.959, 8.8, -304.283, -38.19, -4.0, -6.7, 6.1, 8875.2403) * mat3x4(-0.3, -420.228, 83.97, 87.16, 5.1, 2.1, 43.16, 8383.4398, 3.3, -69.75, 1.3, -9.4))[0];
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            } else {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(959.341, -4744.4556, 93.09, 2823.5192);
                    }
                    return 1.0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = degrees(log2((ivec4(-89236, -84402, 813, 27), vec4(-9.4, -619.983, -39.07, -493.037))));
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = fma(_GLF_color, step(73.45, (mat3x4(615.595, 666.260, -2653.0048, 6304.2502, 2.4, -6321.1372, 682.682, 64.48, -4.9, 63.77, -564.975, 853.059) * vec3(-78.60, -21.55, -6.6))), _GLF_color);
            }
            break;
        case 4:
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = (dFdyFine(95.34) * vec4(-1.2, 1.0, -0.6, -40.35));
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                    return 1.0;
                } else {
                }
            }
            return mix(pow(st.y, injectionSwitch.y), st.x, size.x);
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = log2(cosh(_GLF_color));
                }
                return 1.0;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = ldexp(_GLF_color, ivec4(-67144, -63409, 96762, -78568));
            }
            break;
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 | 1)); _injected_loop_counter++) {
                if (_GLF_DEAD(false)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            return 1.0;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = vec4(-67.99);
                        }
                        _GLF_color = (vec4(-71.11, 55.72, -20.34, -173.038) * mat4(890.970, 87.06, 551.767, 4081.3072, -6.6, -28.84, -6.6, -5051.9675, -81.68, -1.1, -3.0, -2.4, 27.52, 1162.3684, 35.51, 3839.6429));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-35.19, -7.4, -750.510, -599.116);
                            }
                        }
                    }
                    _GLF_color = vec4(425.823, -3.8, -90.62, -6.0);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return 1.0;
                        if (_GLF_DEAD(false)) {
                            return 1.0;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = atan(_GLF_color, _GLF_color);
                        }
                    }
                }
            }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        do {
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                _GLF_color = dFdyFine(_GLF_color);
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
        _GLF_color = vec4(55.95, -31.66, 1.5, 64.18);
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
}

int _GLF_outlined_0(int m) {
    return m + 1;
}

int binarySearch(BinarySearchObject obj, int x) {
    int l = 0, r = 9;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-3856.8572, vec3(-1.9, -2.2, -8.5));
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        } else {
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                return 1;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return 1;
        }
        do {
            do {
                if (_GLF_DEAD(false)) {
                    _GLF_color = fract(_GLF_outVarBackup_GLF_color);
                }
                _GLF_color = vec4(-43.68, -8.7, -5.3, 4.4);
            } while (_GLF_WRAPPED_LOOP(false));
        } while (_GLF_WRAPPED_LOOP(false));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = abs(_GLF_color);
                }
                return 1;
                if (_GLF_DEAD(false)) {
                    return 1;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    while (l <= r) {
        if (_GLF_DEAD(false)) {
            _GLF_color = round(max(_GLF_color, -8320.5042));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
            break;
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-7183.9664, -653.868, 26.49, -1266.8418);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            discard;
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                vec4 _GLF_outVarBackup_GLF_color;
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    if (_GLF_DEAD(false)) {
                        return 1;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
                _GLF_color = vec4(-6691.7853, 5.2, -2.3, 6.1);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    continue;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = degrees(_GLF_color);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            discard;
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                if (_GLF_DEAD(false)) {
                    return 1;
                }
                _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(_GLF_struct_1(vec2(1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0)), _GLF_struct_2(_GLF_struct_3(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), uvec2(1u, 1u), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), ivec4(1, 1, 1, 1)), vec3(1.0, 1.0, 1.0)), uvec2(1u, 1u), _GLF_struct_4(_GLF_struct_5(mat2(1.0, 1.0, 1.0, 1.0), ivec2(1, 1), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), uvec4(1u, 1u, 1u, 1u), _GLF_struct_6(true, ivec4(1, 1, 1, 1), true, mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1)), 1), _GLF_struct_7(1, mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0)));
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    _GLF_struct_replacement_0._f4._GLF_outVarBackup_GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    continue;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(resolution, 55.62, 80.75);
                    }
                }
                _GLF_color = ((-278.280) / (mat4(9.4, 4509.4627, 8.7, 7.3, 9935.3189, -47.68, 5876.9753, -1812.0404, -434.476, 2.3, -77.09, 63.06, 2522.7367, -0.0, 13.70, -704.582) * vec4(39.65, 5898.7238, 37.96, 914.916)));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_struct_replacement_0._f4._GLF_outVarBackup_GLF_color;
                    }
                } else {
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            break;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = tan(_GLF_color);
            }
            break;
        }
        int m = (l + r) / 2;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = vec4(952.286, -253.350, -253.795, 243.294);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = vec4(-713.190, -477.758, 4.0, 3554.4493);
            if (_GLF_DEAD(false)) {
                discard;
            }
        }
        for (int _injected_loop_counter = (0 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((0 << _GLF_IDENTITY(int(5), int(5))) << _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), 0 ^ (int(1)))))); _injected_loop_counter--) {
            for (int _injected_loop_counter = (1 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(0, 1 * (0))); _injected_loop_counter--) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_DEAD(false)) {
                        return 1;
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(0.8, -9779.7548, -5.6, 2.5);
                        }
                        _GLF_color = unpackUnorm4x8(92398u);
                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                discard;
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec2(false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))), !(!(bool(bvec2(false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))))))) {
                                discard;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return 1;
                    }
                    discard;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            discard;
        }
        if (obj.prime_numbers[m] == x) {
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                        _GLF_color = (dot(round(vec3(3.8, -8.4, -8588.4861)), vec3(26.07, -4861.4858, 2.7)) - _GLF_color);
                    }
                    discard;
                }
            }
            return m;
        }
        if (obj.prime_numbers[m] < x) {
            do {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    do {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return 1;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                    _GLF_color = floor(sign(vec4(1.6, 9.6, -2.0, -3625.4131)));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(63.78, -6.3, 37.74, 3.5);
                            }
                            break;
                        }
                    }
                }
                l = _GLF_outlined_0(m);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    _GLF_color = vec4(8.6, -1.3, -5394.7040, -5481.3620);
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color.wwwy;
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    } else {
                    }
                    if (_GLF_DEAD(false)) {
                        return 1;
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(false)) {
                discard;
            }
        } else {
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    {
                        _GLF_struct_21 _GLF_struct_replacement_21 = _GLF_struct_21(vec4(1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                break;
                            }
                            _GLF_struct_replacement_21._GLF_outVarBackup_GLF_color = _GLF_color;
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = vec4(-7.5, -112.591, 93.85, -156.299);
                            }
                        }
                        _GLF_color = vec4(-34.01, -2594.4892, -97.07, -19.17);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = atan(vec4(-399.035, -3.5, -0.1, -88.87), vec4(6.1, -0.4, -8.5, 610.924));
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                _GLF_color = _GLF_struct_replacement_21._GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    discard;
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        break;
                    }
                } else {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                    } else {
                    }
                }
                _GLF_color = (vec4(-2.8, -3162.3700, -4955.6349, -20.93));
                if (_GLF_DEAD(false)) {
                    break;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        discard;
                    } else {
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = (fwidth(vec3(2.1, -979.444, -6459.2363)) * mat4x3(-3.9, -1.1, 437.963, 5.7, 7.8, 92.42, 25.44, 23.48, 93.43, -9375.7523, 22.41, -9013.4074));
                    }
                }
            }
            r = m - 1;
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(false)) {
                continue;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = pow(vec4(12.21, 5.0, 4.4, 9148.9141), vec4(vec2(-947.263, 710.447), vec2(-8.6, -82.45)));
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                discard;
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            } else {
                _GLF_color = unpackSnorm4x8(72840u);
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = vec4(6985.0447, -2.5, -7.8, 2.9);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                continue;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = mod(vec4(557.883, 6.6, 8.6, 31.64), -48.01);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(0.0))))) {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = unpackUnorm4x8(173907u);
                        }
                    } else {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    continue;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                _GLF_color = dFdyFine(vec4(-712.672, -2.6, -67.06, -3.0));
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(false)) {
                continue;
            }
            continue;
        }
        if (_GLF_DEAD(false)) {
            break;
        }
    }
    return -1;
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(-3292.4138, -1.3, 2.6, 1.2);
    }
    do {
        if (_GLF_DEAD(false)) {
            _GLF_color = mix(vec4(-8.8, -9.0, 8022.8991, 6.6), vec4(-511.232, 3678.6117, 5.9, 6448.8932), lessThan(ivec4(47002, -34749, 24988, -48324), ivec4(-4437, 30974, 91755, -47906)));
        }
        for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            if (_GLF_DEAD(false)) {
                _GLF_color = atan(sinh(degrees(vec4(-1.1, 178.355, 1.7, 3.5))));
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return 1;
                }
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        do {
            if (_GLF_DEAD(false)) {
                return 1;
            }
        } while (_GLF_WRAPPED_LOOP(false));
        return 1;
    }
}

vec4 _GLF_outlined_1() {
    return (vec3(3952.0220, -58.35, -0.1) * mat4x3(-5.0, 6.0, 963.697, -69.79, 671.449, 9.1, 8687.8417, 14.54, 4.0, -0.5, 8.5, 5647.0178));
}

vec4 _GLF_outlined_2(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_3(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_4(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_5() {
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = vec4(-1.9, 699.173, -5.0, -3437.9978);
    }
    return (vec3(-4123.1368, 8.6, 57.45) * mat4x3(-203.137, -21.63, -3.0, -1.6, 425.353, 7419.8435, 6941.0991, 7476.6219, -272.577, -22.16, 6.5, -9790.8177));
}

vec4 _GLF_outlined_6() {
    return uintBitsToFloat(uvec4(133232u, 157765u, 15823u, 75663u));
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_DEAD(false)) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                return vec4(1.0, 1.0, 1.0, 1.0);
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            } else {
            }
        }
    }
}

void main() {
    do {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                continue;
            }
            if (_GLF_DEAD(false)) {
                {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = tan(clamp(_GLF_color, -420.466, abs(0.8)));
                    }
                    _GLF_struct_22 _GLF_struct_replacement_22 = _GLF_struct_22(vec2(1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                    _GLF_struct_replacement_22._GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec4(-2.1, 6.6, -77.07, -741.781));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        do {
                            discard;
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = vec4(-3.6, 83.62, 2025.3055, 0.3);
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_struct_replacement_22._GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = intBitsToFloat(ivec4(77861, 76898, 65995, 7762));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                    continue;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    discard;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            } else {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                            }
                        } else {
                        }
                        _GLF_color = vec4(-6.8, -454.311, 7898.5581, -5.3);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            do {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                } else {
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = inversesqrt(ceil(_GLF_outVarBackup_GLF_color));
                        }
                    }
                }
            } else {
            }
            _GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = trunc(_GLF_color);
                }
                return;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec3(true, false, true))))) {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(_GLF_IDENTITY(false, false || (false))), true && (!(_GLF_IDENTITY(false, false || (false))))))))) {
                        break;
                    }
                    _GLF_color = vec4(38.52, -15.63, -9.4, -6.8);
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                } else {
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                            return;
                        }
                    }
                }
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_struct_12 _GLF_struct_replacement_12 = _GLF_struct_12(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_13(_GLF_struct_14(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), vec3(1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true), 1.0, vec4(1.0, 1.0, 1.0, 1.0)), vec3(1.0, 1.0, 1.0), 1), ivec3(1, 1, 1));
            _GLF_struct_replacement_12._f3._f0._GLF_outVarBackup_GLF_color = _GLF_color;
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (vec4(8.9, -421.946, 68.38, 8.6) + (-666.301));
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                } else {
                    for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                        _GLF_color = unpackUnorm4x8((106118u - (107714u << 72078u)));
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (_GLF_IDENTITY(true, !(!(true)))) && true))) {
                _GLF_color = _GLF_struct_replacement_12._f3._f0._GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                    return;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = tanh(_GLF_color);
                }
            }
        } else {
        }
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = vec4(-8.4, -7.2, 7.6, -7.0);
        }
        return;
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ int(_GLF_ZERO(0.0, injectionSwitch.x)))); _injected_loop_counter--) {
            _GLF_color = vec4(-2.1, -598.232, -9.7, 6.5);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
        }
    }
    BinarySearchObject obj;
    if (_GLF_DEAD(false)) {
        return;
        if (_GLF_DEAD(false)) {
            _GLF_color = cos(_GLF_color);
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        for (int i = 0; i < 10; i++) {
            if (i == 0) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    }
                    _GLF_color = vec4(52.94, -0.3, -3.8, 9.7);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        } else {
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    obj.prime_numbers[i] = 2;
                }
            } else if (i == 1) {
                obj.prime_numbers[i] = 3;
                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, false))))) {
                    _GLF_color = (+_GLF_color).pptp;
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-681.336, -2672.5019, -35.33, -8.6);
                    }
                    _GLF_color = asinh(_GLF_color.stsp.tqtt);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = vec4(200.859, -861.218, -521.959, 7730.2233);
                }
                if (i == 2) {
                    obj.prime_numbers[i] = 5;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        break;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = (mat2x4(38.74, 0.2, 8735.1485, 9913.0749, 0.5, 0.5, 169.864, -1396.8077) * injectionSwitch);
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        continue;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                discard;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_outlined_4(_GLF_color);
                                _GLF_color = vec4(9027.9294, -1914.6932, 93.20, -0.0);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = sign(vec4(-471.280, -8.5, 5.7, -615.661));
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                    }
                                    break;
                                }
                                _GLF_color = _GLF_outlined_5();
                            } else {
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = unpackUnorm4x8(74319u);
                    }
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (vec4(-8.7, -835.343, -8.4, 9.1) + mod(vec4(8747.1152, -9.6, -8.0, 0.5), _GLF_color));
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = (bvec3(false, false, false).b ? _GLF_color : _GLF_color);
                                }
                                continue;
                            }
                            _GLF_struct_15 _GLF_struct_replacement_15 = _GLF_struct_15(1u, vec4(1.0, 1.0, 1.0, 1.0));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = mat4(-984.390, 8423.9634, 8757.9456, 3294.8119, 7.9, -5.7, 2076.0540, 8.0, 769.782, 3.3, -8.6, -20.03, 439.909, 9.6, 56.87, -6373.7672)[3];
                            }
                            _GLF_struct_replacement_15._GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(radians(vec3(9264.8785, 364.637, -3782.5683)), 3176.0792);
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < log(cos(0.0)))))) {
                                } else {
                                    discard;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_struct_replacement_15._GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = ((ivec2(-64666, -52804) != ivec2(-20933, -90746)) ? clamp(((-307.082) + _GLF_color), mod(588.369, -7861.0308), -4.4) : _GLF_color);
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = cosh(vec4(-0.0, -8.7, 3.0, 7876.4767));
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                    if (i == 3) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = vec4(2.4, -6.4, -7.8, -833.041);
                            }
                            return;
                        }
                        do {
                            obj.prime_numbers[i] = 7;
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = acosh(mix(_GLF_color, _GLF_color, vec4(636.688, 2.9, 9.0, 17.01)));
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = clamp(acosh(vec4(-3933.8620, 101.963, -77.33, 62.69)), vec4(97.30, 8850.1053, 56.36, -4.4).y, round(3.3));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                do {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, (false) || false)));
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                _GLF_color = refract(_GLF_color, _GLF_color, 4.7);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        if (i == 4) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                obj.prime_numbers[i] = 11;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return;
                                }
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = unpackSnorm4x8(151520u);
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (i == 5) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = vec4(9.1, -3577.2500, 9.9, 1.5);
                                }
                                obj.prime_numbers[i] = 13;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        return;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(injectionSwitch, 9217.2805, acosh(155.502));
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(74.44, -5.1, 554.882, -469.562);
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (mat4(-7.2, 8.6, 7.6, -359.706, 4.6, 1.6, -8462.8029, -76.57, 87.57, 71.87, 8.6, 8396.9630, -59.29, -44.63, -7.7, -2.6) * (vec4(-0.9, 4.0, -5388.0318, 6141.8487)));
                                        }
                                    }
                                    _GLF_color = _GLF_outlined_1();
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                    }
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                if (i == 6) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = vec4(-1.4, 71.33, 3.2, -1.1);
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (min(uvec3(166638u, 118643u, 91248u), 154962u), vec4(1.5, -1.3, -4.4, -480.716));
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = fwidthCoarse((-_GLF_color));
                                                }
                                            } else {
                                            }
                                            do {
                                                _GLF_color = vec4(4.6, -5930.1193, -5142.1279, -0.5);
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                discard;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            do {
                                                return;
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = mix(vec4(-5391.3017, -8979.3203, -6.8, 421.577), vec4(-9.6, 2229.1472, 9.8, -26.76), dot(mix(vec3(7006.2580, 9.5, -9520.4667), vec3(-1299.9434, -0.0, 457.668), bvec3(false, true, false)), vec3(-4.6, -3661.4462, -4207.6278)));
                                        }
                                        _GLF_color = radians(vec4(-4.5, 9428.6677, -920.214, 18.78));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = _GLF_color;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(757.648, -6.9, 9.5, -5.5);
                                                    }
                                                } else {
                                                    return;
                                                }
                                            }
                                            _GLF_color = vec4(-21.59, -610.548, -7.9, 648.311);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = abs(smoothstep(_GLF_color, _GLF_color, _GLF_color));
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(6.8, 7.0, -2.4, 2.5);
                                                }
                                            } else {
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = sin(vec4(-6.1, 7.2, -4.7, 5.5));
                                            }
                                        }
                                    }
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(-8.8, -8.3, 1044.0184, 22.13);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    obj.prime_numbers[i] = 17;
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                } else if (i == 7) {
                                    obj.prime_numbers[i] = 19;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = resolution.stst;
                                    }
                                } else if (i == 8) {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false))))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        obj.prime_numbers[i] = 23;
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                return;
                                            }
                                            break;
                                        }
                                    }
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec3(-0.2, -80.19, -839.588).spps;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        _GLF_color = _GLF_color;
                                    }
                                    if (i == 9) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = vec4(2.3, 31.93, 336.253, -20.60);
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        } else {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                return;
                                            }
                                            do {
                                                obj.prime_numbers[i] = 29;
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = log(_GLF_color);
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(-79.49, 9.6, -5779.8657, -3.7);
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = asin(_GLF_color);
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = inversesqrt((vec4(1.3, -914.441, -80.92, -71.90) * mat4(-336.268, -952.466, 565.069, 6926.3249, 339.167, -2.5, -3.9, -5.3, -20.34, 21.82, -890.278, 8496.9784, 9217.8663, -3370.0003, 2767.2778, -46.86)));
                                            }
                                            _GLF_color = vec4(-333.791, 87.78, -9.1, 463.038);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(false)) {
                                            for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                }
                                                return;
                                            }
                                        }
                                    } else {
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                vec4 _GLF_outVarBackup_GLF_color;
                do {
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
                _GLF_color = abs(vec4(-9.3, -40.34, 7227.5947, -1436.3044));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(vec3(57.93, -8534.4598, 1.4), ((3634.0950 * mat2(-758.024, 4.9, 87.15, 9309.5899)), 6261.4874));
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        discard;
                    }
                }
            } else {
            }
        }
    } else {
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = vec4(-7721.1979, 63.99, -5092.8972, -7.1);
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                return;
            }
            _GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = ((+vec4(225.216, -736.535, -89.91, -5.3)) * (-76.99));
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) || _GLF_FALSE(false, (gl_FragCoord.y < 0.0))))) {
                if (_GLF_DEAD(false)) {
                    return;
                }
            } else {
            }
        }
    } else {
    }
    vec2 uv = (gl_FragCoord.xy / resolution.x) * vec2(resolution.x / resolution.y, 1.0);
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_outlined_2(_GLF_color);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = vec4(5.2, 159.989, -5.2, 716.216);
                    }
                    return;
                }
                _GLF_color = exp(vec4(-2268.3064, -55.20, -355.004, -1.1));
            } else {
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        return;
                    } else {
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = dFdy(_GLF_outVarBackup_GLF_color);
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(false)) {
                _GLF_color = acos(ldexp(vec4(4.3, 6.2, -28.46, 1889.6740), ivec4(84031, -74767, -62918, 94696)));
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = vec4(-5.4, 10.02, -1.8, -51.80);
                }
            } else {
                _GLF_color = vec4(-4492.2488, 9871.5167, 37.69, -0.1);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = acos(cosh(vec4(-669.650, -7.7, 9935.0971, 52.98)));
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            do {
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        return;
                    } else {
                    }
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
            _GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = _GLF_outlined_3(_GLF_color);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = fma(cosh(vec4(-9484.3045, -3516.2147, 50.02, -2.6)), unpackUnorm4x8(uint(3932)), vec3(34.28, 8.8, -8.2).gggb);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = ((-9310.8118) * _GLF_color);
                                    }
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = unpackUnorm4x8(packSnorm4x8(_GLF_outVarBackup_GLF_color));
                                }
                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                    return;
                                }
                            }
                        } else {
                        }
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_struct_23 _GLF_struct_replacement_23 = _GLF_struct_23(1.0, vec2(1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), ivec3(1, 1, 1), vec2(1.0, 1.0));
                _GLF_struct_replacement_23._GLF_outVarBackup_GLF_color = _GLF_color;
                do {
                    _GLF_color = vec4(4.1, -507.601, 412.856, -34.33);
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_struct_replacement_23._GLF_outVarBackup_GLF_color;
                }
            } else {
            }
        }
    } else {
    }
    vec2 b = brick(uv * 7.0);
    vec3 color = vec3(patternize(b));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return;
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (gl_FragCoord.y < resolution.y / 1.1) {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = log(vec4(-50.20, 3.8, 353.017, -21.06));
                }
                return;
            }
        }
        if (_GLF_DEAD(false)) {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                return;
            }
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(0, (0) - 0)); _injected_loop_counter--) {
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                _GLF_color = step(_GLF_outVarBackup_GLF_color, _GLF_color);
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return;
            }
            _GLF_color = vec4(-3.3, -2.4, -939.750, -84.88);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        return;
                    }
                }
                do {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
        if (binarySearch(obj, obj.prime_numbers[4]) != -(int(resolution.y)) && binarySearch(obj, obj.prime_numbers[0]) >= -(int(resolution.x))) {
            color.yz -= dot(float(binarySearch(obj, obj.prime_numbers[4])), float(binarySearch(obj, obj.prime_numbers[0])));
            if (_GLF_DEAD(false)) {
                do {
                    return;
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        } else {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                for (int _injected_loop_counter = ((1 ^ 1) << _GLF_IDENTITY(int(3), int(3))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    discard;
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    do {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                            continue;
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    _GLF_color = _GLF_outlined_6();
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = tanh(_GLF_color);
                        }
                    }
                }
                do {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = (_GLF_color - 77.32);
                    }
                    return;
                }
                _GLF_color = _GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = dFdyCoarse(sqrt(vec4(-37.44, 8519.9120, 47.34, -77.28)));
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                do {
                    _GLF_color = (vec4(-579.934, -4.2, -684.738, 1643.4524) * mat4(mat3(-1.4, -0.0, -1.3, -7.4, -352.174, 6.7, -112.228, 930.301, -331.850)));
                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, (false) && true)));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = _GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                        _GLF_color = vec4(-2.8, -59.33, -1.3, -6.9);
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    return;
                }
            } else {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                } else {
                }
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(6.4, color);
        }
    } else {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (_GLF_IDENTITY(true, !(!(true))))))) {
            for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                if (binarySearch(obj, 1) == -1) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = sign(_GLF_color);
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (int(7)) >> 0))) >> _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter++) {
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = dFdyFine((1.4 + acos(vec4(2.8, -6.8, 9.6, -688.966))));
                        }
                        discard;
                    }
                } else {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = ldexp(vec4(-1.8, 271.307, -823.192, -7.7), ivec4(46276, 41721, -42082, 79807));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    color.yz += color.yz;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(8.6, 3.0, 636.001, -0.4);
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = exp2(vec4(4154.1486, -171.028, -9.5, 732.245));
                    }
                    _GLF_color = vec4(-29.39, -6.5, 6.8, -2.4);
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        break;
                    }
                }
            }
        } else {
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    _GLF_color = vec4(color, injectionSwitch.y);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
        return;
    }
}
