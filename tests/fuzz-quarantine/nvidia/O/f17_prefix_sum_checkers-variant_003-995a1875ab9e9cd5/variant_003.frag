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

struct _GLF_struct_17 {
    mat4 _f0;
    bvec4 _f1;
    ivec3 _f2;
};

struct _GLF_struct_16 {
    uvec3 _f0;
    mat4x3 _f1;
    uvec3 _f2;
    ivec4 _f3;
    mat3 _f4;
};

struct _GLF_struct_15 {
    mat3x4 _f0;
    bvec2 _f1;
    _GLF_struct_16 _f2;
    mat2x4 _f3;
    uvec3 _f4;
    _GLF_struct_17 _f5;
};

struct _GLF_struct_14 {
    mat4x3 _f0;
    int i;
    ivec3 _f1;
    ivec4 _f2;
    _GLF_struct_15 _f3;
};

struct _GLF_struct_18 {
    int _f0;
    mat3 _f1;
    int GLF_live1looplimiter1;
};

const int GLF_live3N = 10;
int GLF_live3data[10] = int[10](_GLF_FUZZED(ivec3(-22744, -62361, 99753).x), _GLF_FUZZED(-82949), _GLF_FUZZED(-89047), _GLF_FUZZED(-75782), _GLF_FUZZED(-62108), _GLF_FUZZED(ivec4(-25909, -16706, 64301, -83411).g), _GLF_FUZZED(((-65879) ^ 56281)), _GLF_FUZZED(-24228), _GLF_FUZZED(-54895), _GLF_FUZZED(((-47408) & 11039))), GLF_live3temp[10] = int[10](_GLF_FUZZED(-23909), _GLF_FUZZED(66756), _GLF_FUZZED(41885), _GLF_FUZZED((-(-96492))), _GLF_FUZZED((+77525)), _GLF_FUZZED(((-91248) ^ (-84296))), _GLF_FUZZED(-1221), _GLF_FUZZED(14798), _GLF_FUZZED(ivec2(-86887, -53988).ggr.t), _GLF_FUZZED(-7936));

void GLF_live3merge(int GLF_live3from, int GLF_live3mid, int GLF_live3to) {
    if (_GLF_DEAD(false)) {
        return;
    }
    int GLF_live3k = GLF_live3from, GLF_live3i = GLF_live3from, GLF_live3j = GLF_live3mid + 1;
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                return;
            }
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
        int GLF_live3looplimiter0 = 0;
        if (_GLF_DEAD(false)) {
            return;
        }
        while (GLF_live3i <= GLF_live3mid && GLF_live3j <= GLF_live3to) {
            if (GLF_live3looplimiter0 >= 6) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    return;
                }
                break;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            GLF_live3looplimiter0++;
            {
                if (GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] < GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3j, 10)]) {
                    GLF_live3temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3k++, 10)] = GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i++, 10)];
                } else {
                    GLF_live3temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3k++, 10)] = GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live3looplimiter1 = 0;
        while (GLF_live3i < GLF_live3N && GLF_live3i <= GLF_live3mid) {
            if (GLF_live3looplimiter1 >= 6) {
                break;
                if (_GLF_DEAD(false)) {
                    continue;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_DEAD(false)) {
                    break;
                }
                GLF_live3looplimiter1++;
            } else {
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            {
                GLF_live3temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3k++, 10)] = GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i++, 10)];
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    continue;
                }
            }
        }
    }
    {
        int GLF_live3looplimiter2 = 0;
        for (int GLF_live3i = GLF_live3from; GLF_live3i <= GLF_live3to; GLF_live3i++) {
            if (GLF_live3looplimiter2 >= 6) {
                break;
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                continue;
            }
            GLF_live3looplimiter2++;
            {
                GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = GLF_live3temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)];
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
}

ivec2 GLF_live6iter(ivec2 GLF_live6p) {
    if (GLF_live6p.x > 0) {
        GLF_live6p.y--;
    }
    if (GLF_live6p.x < 0) {
        do {
            if (_GLF_DEAD(false)) {
                continue;
            }
            GLF_live6p.y++;
        } while (_GLF_WRAPPED_LOOP(false));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return ivec2(1, 1);
        }
        if (_GLF_DEAD(false)) {
            return ivec2(1, 1);
        }
    }
    GLF_live6p.x += GLF_live6p.y / 2;
    if (_GLF_DEAD(false)) {
        return ivec2(1, 1);
    }
    return GLF_live6p;
    if (_GLF_DEAD(false)) {
        return ivec2(1, 1);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return ivec2(1, 1);
        }
    }
}

const int GLF_live4dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, _GLF_IDENTITY(195, (195) - 0), 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, _GLF_IDENTITY(186, ~(~(_GLF_IDENTITY(186, clamp(186, 186, 186))))), 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);

struct _GLF_struct_13 {
    uint _f0;
};

struct _GLF_struct_12 {
    mat4 _f0;
    bvec3 _f1;
    mat4x3 _f2;
    bvec4 _f3;
    uvec3 _f4;
};

struct _GLF_struct_11 {
    bvec2 _f0;
    mat2x3 _f1;
    mat4 _f2;
    bvec2 _f3;
};

struct _GLF_struct_10 {
    mat4x2 _f0;
    _GLF_struct_11 _f1;
    _GLF_struct_12 _f2;
    _GLF_struct_13 _f3;
    vec3 _f4;
};

struct _GLF_struct_9 {
    float _f0;
    float _f1;
    bool _f2;
    mat3x2 _f3;
    ivec2 _f4;
    mat2x3 _f5;
};

struct _GLF_struct_8 {
    mat2 _f0;
    mat2 _f1;
    mat3x4 _f2;
};

struct _GLF_struct_7 {
    uvec4 _f0;
};

struct _GLF_struct_6 {
    bool _f0;
    mat2x4 _f1;
};

struct _GLF_struct_5 {
    _GLF_struct_6 _f0;
    _GLF_struct_7 _f1;
    _GLF_struct_8 _f2;
    mat2 _f3;
};

struct _GLF_struct_4 {
    mat3x2 _f0;
    vec3 _f1;
};

struct _GLF_struct_3 {
    _GLF_struct_4 _f0;
    uvec2 _f1;
    _GLF_struct_5 _f2;
    float _f3;
    _GLF_struct_9 _f4;
    float GLF_live1s;
    mat2x4 _f5;
    _GLF_struct_10 _f6;
};

struct _GLF_struct_2 {
    mat3x2 _f0;
    mat4 _f1;
    mat3x4 _f2;
    uvec4 _f3;
};

struct _GLF_struct_1 {
    uint _f0;
    uint _f1;
    _GLF_struct_2 _f2;
};

struct _GLF_struct_0 {
    mat4x2 _f0;
    mat4 _f1;
    _GLF_struct_1 _f2;
    vec4 _f3;
    mat3 _f4;
    ivec2 GLF_live0p;
    mat3 _f5;
};

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

vec2 pattern(in vec2 x) {
    if (_GLF_DEAD(false)) {
        return vec2(1.0, 1.0);
    }
    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
        if (_GLF_DEAD(false)) {
            return vec2(1.0, 1.0);
        }
        int GLF_live0looplimiter1 = 0;
        _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_1(1u, 1u, _GLF_struct_2(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u))), vec4(1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED((ivec2(-37973, 44326) + (ivec2(-57650, 72421) ^ ivec2(-68954, -13898)))), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
        if (_GLF_DEAD(false)) {
            break;
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                break;
            }
            discard;
            if (_GLF_DEAD(false)) {
                discard;
            }
        }
        while (_GLF_struct_replacement_0.GLF_live0p.x > 15) {
            if (_GLF_DEAD(false)) {
                {
                    int GLF_live3i = _GLF_FUZZED(94126);
                    int GLF_live3j = _GLF_FUZZED(ivec2(-18636, 15660).t);
                    int GLF_live3k = _GLF_FUZZED(33075);
                    int GLF_live3looplimiter0 = 0;
                    {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        if (GLF_live3looplimiter0 >= 6) {
                            if (_GLF_DEAD(false)) {
                                return vec2(1.0, 1.0);
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                }
                            }
                            ;
                        }
                        GLF_live3looplimiter0++;
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                            if (GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] < GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3j, 10)]) {
                                GLF_live3temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3k++, 10)] = GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i++, 10)];
                            } else {
                                GLF_live3temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3k++, 10)] = GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3j++, 10)];
                            }
                            if (_GLF_DEAD(false)) {
                                return vec2(1.0, 1.0);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0))))))) {
                            break;
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    return vec2(1.0, 1.0);
                } else {
                }
            }
            if (GLF_live0looplimiter1 >= 5) {
                break;
            }
            GLF_live0looplimiter1++;
            if (_GLF_DEAD(false)) {
                continue;
            }
            {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    _GLF_struct_replacement_0.GLF_live0p.x -= 16;
                }
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
        }
    }
    vec2 n = floor(x);
    vec3 m = vec3(1.0);
    for (int j = -1; j <= int(injectionSwitch.y); j++) {
        if (_GLF_DEAD(false)) {
            continue;
        }
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
            for (int i = -1; i <= int(injectionSwitch.y); i++) {
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        break;
                    }
                    vec4 GLF_live1c = _GLF_FUZZED(vec4(-25.85, -4.2, 0.7, -7.2));
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    {
                        {
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            ;
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    int GLF_live1i = _GLF_FUZZED((18065 * 15619));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = roundEven(_GLF_color);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        do {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_IDENTITY(_GLF_color = atan(vec4(-4367.8143, 0.1, 2553.3516, -25.67), pow(vec4(-124.516, 46.34, -640.955, 6.6), vec4(-4424.7706, -8.6, -5.0, -415.390))), (true ? _GLF_IDENTITY(_GLF_color = atan(vec4(-4367.8143, 0.1, 2553.3516, -25.67), pow(vec4(-124.516, 46.34, -640.955, 6.6), vec4(-4424.7706, -8.6, -5.0, -415.390))), (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? (_GLF_color = atan(vec4(-4367.8143, 0.1, 2553.3516, -25.67), pow(vec4(-124.516, 46.34, -640.955, 6.6), vec4(-4424.7706, -8.6, -5.0, -415.390)))) : _GLF_FUZZED((mat2x4(-4.6, -7.1, 84.46, 3.3, 0.1, 8388.0714, -0.0, -7.7) * resolution)))) : _GLF_FUZZED(_GLF_outVarBackup_GLF_color)));
                            do {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        int GLF_live5looplimiter3 = 0;
                                        if (GLF_live5looplimiter3 >= 3) {
                                            ;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                break;
                                            }
                                        }
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
                    }
                    if (GLF_live1c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)] >= 1.0) {
                        GLF_live1c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)] = GLF_live1c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)] * GLF_live1c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)];
                    }
                }
                vec2 g = vec2(float(j), float(i));
                vec2 o = mix(n, g, 0.2);
                if (_GLF_DEAD(false)) {
                    break;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(3075.9538, -5.3, -6.1, _GLF_IDENTITY(-177.684, (-177.684) + sin(0.0)));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            discard;
                        }
                        break;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    if (injectionSwitch.x < (m.x)) {
                        {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                return vec2(1.0, 1.0);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                    discard;
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    break;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                }
                            }
                            _GLF_color = vec4(-3.5, -6.7, 800.724, 3.9);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return vec2(1.0, 1.0);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    break;
                                }
                            }
                        }
                        int k = 1;
                        while (k >= 0) {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            o = o + o;
                            if (_GLF_DEAD(false)) {
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    _GLF_color = _GLF_color;
                                }
                            }
                            k--;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                return vec2(1.0, 1.0);
                            }
                            continue;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-3197.7571, 92.53, -1.7, -3.8);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            int GLF_live6i = _GLF_FUZZED(int(false));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return vec2(1.0, 1.0);
                            }
                            int GLF_live6looplimiter0 = 0;
                            ivec2 GLF_live6p = _GLF_FUZZED(ivec2(-3109, -69285));
                            for (GLF_live6i = 0; GLF_live6i < 100; GLF_live6i++) {
                                if (GLF_live6looplimiter0 >= 5) {
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                }
                                GLF_live6looplimiter0++;
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        break;
                                    }
                                    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), clamp(_GLF_IDENTITY(int(5), clamp(int(5), int(5), int(5))), int(5), _GLF_IDENTITY(int(5), ~(~(int(5)))))))) >> _GLF_IDENTITY(int(5), int(5))); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                break;
                                            }
                                            continue;
                                        }
                                        GLF_live6p = GLF_live6iter(GLF_live6p);
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return vec2(1.0, 1.0);
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        m = vec3(injectionSwitch.x, cos(o));
                    }
                } else {
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec2(1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    return vec2(1.0, 1.0);
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                }
            }
        }
    }
    return vec2(m.x, m.y - m.z);
    if (_GLF_DEAD(false)) {
        return vec2(1.0, 1.0);
    }
    {
        float GLF_live2th = _GLF_FUZZED(3.9);
        vec2 GLF_live2v = _GLF_FUZZED(vec2(726.730, -3.6));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, max(0.0, 0.0)))))) {
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
            _GLF_color = vec4(5.0, -9.7, -45.87, -30.50);
        }
        if (_GLF_DEAD(false)) {
            return vec2(1.0, 1.0);
        }
        if (GLF_live2v.y < 0.0) {
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec2(1.0, 1.0);
                }
                int GLF_live3i = _GLF_FUZZED(7980);
                if (_GLF_DEAD(false)) {
                    return vec2(1.0, 1.0);
                }
                {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            return vec2(1.0, 1.0);
                        }
                        return vec2(1.0, 1.0);
                    }
                    switch (GLF_live3i) {
                        case 0:
                            GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = 4;
                            break;
                        case 1:
                            GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = 3;
                            break;
                        case 2:
                            GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = 2;
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return vec2(1.0, 1.0);
                            }
                        case 3:
                            GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = 1;
                            break;
                        case 4:
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return vec2(1.0, 1.0);
                            }
                            GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = 0;
                            break;
                        case 5:
                            GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = -1;
                            break;
                        case 6:
                            GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = -2;
                            if (_GLF_DEAD(false)) {
                                return vec2(1.0, 1.0);
                            }
                            break;
                            if (_GLF_DEAD(false)) {
                                return vec2(1.0, 1.0);
                            }
                        case 7:
                            GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = -3;
                            if (_GLF_DEAD(false)) {
                                return vec2(1.0, 1.0);
                            }
                            break;
                        case 8:
                            GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = -4;
                            break;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    return vec2(1.0, 1.0);
                                }
                                return vec2(1.0, 1.0);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return vec2(1.0, 1.0);
                            }
                        case 9:
                            GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = -5;
                            break;
                    }
                    GLF_live3i++;
                }
            }
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
            GLF_live2th = -GLF_live2th;
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
        }
    }
}

void main() {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(false)) {
            return;
        }
        _GLF_color = _GLF_color;
    }
    vec2 uv = gl_FragCoord.xy / resolution.y;
    float A[50];
    for (int i = 0; i < 200; i++) {
        if (i >= int(resolution.x)) {
            {
                if (_GLF_DEAD(false)) {
                    break;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        break;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = exp2(vec4(1.4, -8.4, -58.53, 2734.9493));
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        continue;
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
            }
            break;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (-vec4(-9.7, 2239.7481, 4.6, 30.35));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        ivec2 GLF_live4pos = _GLF_FUZZED(ivec2(-24348, 59005));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            continue;
                        }
                        {
                            if (GLF_live4pos.x < GLF_live4dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4pos.y, 256)] + 15 && GLF_live4pos.x > GLF_live4dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4pos.y, 256)] - 15) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                }
                                float GLF_live4p = (15.0 - abs(float(GLF_live4pos.x - GLF_live4dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4pos.y, 256)]))) / 15.0;
                                ;
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            GLF_live4pos.y++;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            break;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                continue;
                if (_GLF_DEAD(false)) {
                    discard;
                }
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                continue;
            }
        }
        if ((4 * (i / 4)) == _GLF_IDENTITY(i, clamp(i, _GLF_IDENTITY(i, max(i, i)), i))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    int GLF_live3i = _GLF_FUZZED((38389 & (-70469)));
                    int GLF_live3looplimiter5 = 0;
                    {
                        if (GLF_live3looplimiter5 >= 6) {
                            ;
                        }
                        GLF_live3looplimiter5++;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return;
                                }
                                switch (GLF_live3i) {
                                    case 0:
                                        GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = 4;
                                        break;
                                    case 1:
                                        GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = 3;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            break;
                                        }
                                    case 2:
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = 2;
                                        break;
                                    case 3:
                                        GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = 1;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                            break;
                                        }
                                        break;
                                    case 4:
                                        GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = _GLF_IDENTITY(0, 0 | (0));
                                        break;
                                    case 5:
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = -1;
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    case 6:
                                        GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = -2;
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    case 7:
                                        GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = -3;
                                        break;
                                    case 8:
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = -4;
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        break;
                                    case 9:
                                        GLF_live3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = -5;
                                        break;
                                }
                            } else {
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                            }
                            GLF_live3i++;
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        } else {
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
                _GLF_color = vec4(9.2, -2840.0592, 5.9, 2.4);
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    continue;
                }
                discard;
            }
            A[i / 4] = float(i);
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(false)) {
            return;
        }
        _GLF_color = mod(vec4(-6.9, 7203.0463, 315.736, -6.7), 7826.8064);
    }
    for (_GLF_struct_14 _GLF_struct_replacement_14 = _GLF_struct_14(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 0, ivec3(1, 1, 1), ivec4(1, 1, 1, 1), _GLF_struct_15(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true), _GLF_struct_16(uvec3(1u, 1u, 1u), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), ivec4(1, 1, 1, 1), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), _GLF_struct_17(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true), ivec3(1, 1, 1)))); _GLF_struct_replacement_14.i < 50; _GLF_struct_replacement_14.i++) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                discard;
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = sin(vec4(1.8, 308.497, 254.702, -9.1));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                if (_GLF_DEAD(false)) {
                    discard;
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    continue;
                }
            }
        }
        if (_GLF_struct_replacement_14.i < int(gl_FragCoord.x)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, mat4(1.0) * (gl_FragCoord)).y < 0.0)))) {
                    _GLF_color = smoothstep(_GLF_IDENTITY(fwidthFine(vec4(0.1, 0.8, 2.0, -6663.1327)), min(fwidthFine(vec4(0.1, 0.8, 2.0, -6663.1327)), fwidthFine(vec4(0.1, 0.8, 2.0, -6663.1327)))), unpackUnorm4x8(32178u), _GLF_color);
                }
                _GLF_color = _GLF_color;
                {
                    {
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        ivec2 GLF_live4pos = _GLF_FUZZED((~ivec2(47339, -26624)));
                        {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            float GLF_live4p = (15.0 - abs(float(GLF_live4pos.x - GLF_live4dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4pos.y, 256)]))) / 15.0;
                            ;
                        }
                    }
                    {
                        ;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        continue;
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        discard;
                    } else {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        continue;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(6090.3507, 0.8, 21.32, 4019.4319);
                }
                break;
            }
            break;
            if (_GLF_DEAD(false)) {
                _GLF_color = (mat3x4(-774.356, -42.19, 3.9, 39.93, -3.1, -6.7, 18.65, 7398.3842, -8.3, 9.8, 61.47, 824.347) / (-5.3))[1];
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                discard;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-9429.3858, -1.4, -0.1, 3.4);
        }
        if (_GLF_DEAD(false)) {
            break;
        }
        if (_GLF_IDENTITY(i, min(_GLF_struct_replacement_14.i, _GLF_struct_replacement_14.i)) > 0) {
            if (_GLF_DEAD(false)) {
                break;
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
            {
                int GLF_live6looplimiter0 = 0;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
                if (_GLF_IDENTITY(GLF_live6looplimiter0, (GLF_live6looplimiter0) | (GLF_live6looplimiter0)) >= 5) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    do {
                        ;
                    } while (_GLF_WRAPPED_LOOP(false));
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
            }
            A[_GLF_struct_replacement_14.i] += A[_GLF_struct_replacement_14.i - 1];
        }
    }
    vec2 c = pattern((15.0 + tan(0.2)) * uv);
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
        }
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(false)) {
            return;
        }
        for (int _injected_loop_counter = ((1 ^ 0) ^ (0 ^ 1)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
            _GLF_outVarBackup_GLF_color = _GLF_color;
        }
        _GLF_color = min(vec4(34.59, (820.396), vec2(-4.6, -71.01)), -4524.8738);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    vec3 col;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return;
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (int(gl_FragCoord.y) < 20) {
        if (_GLF_DEAD(false)) {
            return;
        }
        col = .5 + cos(c.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = vec4(4.1, 56.63, 16.76, -13.48);
        }
    } else {
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_IDENTITY(int(gl_FragCoord.y) < 40, !(!(_GLF_IDENTITY(int(gl_FragCoord.y) < 40, bool(_GLF_IDENTITY(bvec2(int(gl_FragCoord.y) < 40, false), bvec2(bvec2(bvec2(int(gl_FragCoord.y) < 40, false)))))))))) {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
                col = .5 + cos(c.y + vec3(resolution.x, A[9] / resolution.x + 50.0, 22.0));
            } else {
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (-vec4(-53.54, 44.43, -7.3, -980.221));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    _GLF_color = clamp(_GLF_color, exp(_GLF_color), vec4(-3836.1404, -9.3, -1.1, 3.2));
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            if (int(gl_FragCoord.y) < 60) {
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                            }
                            return;
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_IDENTITY(_GLF_color = mat3x4(-1274.0140, -339.931, -660.657, -4569.7161, 7.6, -76.88, -15.98, -6244.2966, -0.7, _GLF_IDENTITY(-2.2, clamp(-2.2, _GLF_IDENTITY(-2.2, float(mat3x4(-2.2, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0))), -2.2)), -8.7, 7.9)[1], (_GLF_color = mat3x4(-1274.0140, -339.931, -660.657, -4569.7161, 7.6, -76.88, -15.98, -6244.2966, -0.7, _GLF_IDENTITY(-2.2, clamp(-2.2, _GLF_IDENTITY(-2.2, float(mat3x4(-2.2, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0))), -2.2)), -8.7, 7.9)[1]) * vec4(1.0, 1.0, 1.0, 1.0));
                        }
                        _GLF_color = log(vec4(230.775, -5225.0699, -751.123, -9.9));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                            return;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                    }
                }
                col = .5 + cos(c.y + vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0));
                {
                    int GLF_live5index = _GLF_FUZZED(ivec4(59993, 59066, -46644, 87399).x);
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    int GLF_live5j = _GLF_FUZZED(ivec2(45243, -69476).g);
                    {
                        GLF_live5index = GLF_live5j;
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                }
            } else {
                for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), (true ? int(6) : _GLF_FUZZED(49743))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    do {
                        if (int(gl_FragCoord.y) < 80) {
                            {
                                {
                                    ivec2 GLF_live6p = _GLF_FUZZED(ivec2(40733, -46040));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        discard;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        continue;
                                    }
                                    {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        int GLF_live6looplimiter1 = 0;
                                        while (GLF_live6p.x > 15) {
                                            if (GLF_live6looplimiter1 >= 5) {
                                                break;
                                            }
                                            GLF_live6looplimiter1++;
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                GLF_live6p.x -= 16;
                                            }
                                        }
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                do {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(-8594.9617)), float(0.0), bool(true)))))));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                }
                                _GLF_color = vec4(-0.9, 10.09, -9.1, _GLF_IDENTITY(-5.4, (-5.4) - 0.0));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                discard;
                            }
                        } else if (int(gl_FragCoord.y) < 100) {
                            col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                _GLF_color = _GLF_color;
                            }
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.x >= 0.0, true && (_GLF_IDENTITY(gl_FragCoord.x >= 0.0, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(gl_FragCoord.x >= 0.0), !(!(bool(gl_FragCoord.x >= 0.0))))), (bool(_GLF_IDENTITY(bool(gl_FragCoord.x >= 0.0), !(!(bool(gl_FragCoord.x >= 0.0)))))) && true)))))))) {
                                if (int(gl_FragCoord.y) < 120) {
                                    {
                                        int GLF_live3high = _GLF_FUZZED(((-82576) - 40295));
                                        int GLF_live3low = _GLF_FUZZED(int((mat2x3(-7.7, -5043.1259, -4.5, -1.8, -4.3, 4344.0836) == mat2x3(-5.2, -69.77, 4954.4875, -2324.5320, -913.338, 468.269))));
                                        int GLF_live3m = _GLF_FUZZED(((-74009) & ((-38906) ^ 53480)));
                                        {
                                            int GLF_live3looplimiter3 = 0;
                                            for (int GLF_live3i = GLF_live3low; GLF_live3i < GLF_live3high; GLF_live3i += 2 * GLF_live3m) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    break;
                                                }
                                                if (GLF_live3looplimiter3 >= 6) {
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    break;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        discard;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                }
                                                GLF_live3looplimiter3++;
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    int GLF_live3from = GLF_live3i;
                                                    int GLF_live3mid = GLF_live3i + GLF_live3m - 1;
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    int GLF_live3to = min(GLF_live3i + 2 * GLF_live3m - 1, GLF_live3high);
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        break;
                                                    }
                                                    GLF_live3merge(GLF_live3from, GLF_live3mid, GLF_live3to);
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                } else {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                                        return;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    continue;
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
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        break;
                                    }
                                    col = .5 + cos(c.y + vec3(resolution.x, _GLF_IDENTITY(A[39], min(A[39], A[39])) / resolution.x + 50.0, 22.0));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            vec4 GLF_live1c = _GLF_FUZZED(vec4(5.5, -4589.4634, -5.2, -6.6));
                                            int GLF_live1i = _GLF_FUZZED(ivec2(91374, -2823).x);
                                            _GLF_struct_18 _GLF_struct_replacement_18 = _GLF_struct_18(1, mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 0);
                                            {
                                                if (_GLF_struct_replacement_18.GLF_live1looplimiter1 >= 7) {
                                                    ;
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                }
                                                _GLF_struct_replacement_18.GLF_live1looplimiter1++;
                                                {
                                                    if (GLF_live1c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)] >= 1.0) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            discard;
                                                        }
                                                        GLF_live1c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)] = GLF_live1c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)] * GLF_live1c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)];
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = (+vec4(-2420.5242, -7734.4826, -450.755, -7.1));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true && (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
                                                                    break;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    continue;
                                                                }
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        break;
                                                    }
                                                    GLF_live1i++;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                            }
                                            _GLF_color = mix(vec3(-34.67, 9.1, 4538.6193), vec3(1.9, -5.5, -5.2), vec3(-4.5, -83.73, 7.6)).yyxx;
                                        }
                                        _GLF_color = vec4(-1.4, determinant(mat3(3948.2880, -458.598, 33.69, -235.399, -1.6, -2.2, -37.55, -60.25, 2.9)), -0.3, -781.881);
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                        }
                                    }
                                } else if (int(gl_FragCoord.y) < 140) {
                                    col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        discard;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            discard;
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        } else {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                        }
                                        _GLF_color = vec4(484.969, -46.31, -4.0, -7394.3771);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                        _GLF_color = vec4(-96.03, 2.6, -524.906, -892.424);
                                    }
                                    if (int(gl_FragCoord.y) < 160) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            return;
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                                            col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                        } else {
                                        }
                                    } else if (int(gl_FragCoord.y) < 180) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            continue;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            continue;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        } else {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                discard;
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            }
                                            col = .5 + cos(c.y + vec3(resolution.x, A[44] / resolution.x + 50.0, 22.0));
                                        }
                                        do {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    continue;
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || _GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0))))))) {
                                            if (_GLF_DEAD(false)) {
                                                return;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                }
                                            }
                                            _GLF_color = mix(vec4(-5.5, -37.42, 2706.5458, 270.480), vec4(_GLF_IDENTITY(52.27, (52.27) + sqrt(0.0)), -12.96, -47.94, -41.78), _GLF_color);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    } else if (int(gl_FragCoord.y) < 200) {
                                        col = .5 + cos(c.y + vec3(resolution.x, A[49] / resolution.x + 50.0, 22.0));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            _GLF_color = vec4(608.521, 139.433, -6500.3947, -0.2);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(6.7, 374.906, 7834.9491, 765.148);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            break;
                                        }
                                        {
                                            int GLF_live1i = _GLF_FUZZED(ivec4(-58351, 30625, -68893, -91839).r);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                return;
                                            }
                                            float GLF_live1ref = _GLF_FUZZED(float(uvec2(63649u, 1857u).t));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                break;
                                            }
                                            {
                                                int GLF_live4looplimiter0 = 0;
                                                if (GLF_live4looplimiter0 >= 5) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        break;
                                                    }
                                                    ;
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                }
                                            }
                                            _GLF_struct_3 _GLF_struct_replacement_3 = _GLF_struct_3(_GLF_struct_4(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)), uvec2(1u, 1u), _GLF_struct_5(_GLF_struct_6(true, mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_7(uvec4(1u, 1u, 1u, 1u)), _GLF_struct_8(mat2(1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat2(1.0, 1.0, 1.0, 1.0)), 1.0, _GLF_struct_9(1.0, 1.0, true, mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_FUZZED(-34.82), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_10(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_11(bvec2(true, true), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true)), _GLF_struct_12(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec3(true, true, true), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true), uvec3(1u, 1u, 1u)), _GLF_struct_13(1u), vec3(1.0, 1.0, 1.0)));
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                continue;
                                            }
                                            if (mod(float(GLF_live1i), GLF_live1ref) <= 0.01) {
                                                {
                                                    int GLF_live6looplimiter0 = 0;
                                                    ivec2 GLF_live6p = _GLF_FUZZED(_GLF_IDENTITY(ivec2((85141 & 75802)), clamp(_GLF_IDENTITY(ivec2((85141 & 75802)), (ivec2((85141 & 75802))) << ivec2(0, 0)), _GLF_IDENTITY(ivec2((85141 & 75802)), (ivec2((85141 & 75802))) - ivec2(0, 0)), _GLF_IDENTITY(ivec2((85141 & 75802)), (ivec2((85141 & 75802))) | (ivec2((85141 & 75802)))))));
                                                    {
                                                        if (GLF_live6looplimiter0 >= 5) {
                                                            ;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                continue;
                                                            }
                                                        }
                                                        GLF_live6looplimiter0++;
                                                        {
                                                            do {
                                                                GLF_live6p = GLF_live6iter(GLF_live6p);
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                        }
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                } else {
                                                    _GLF_struct_replacement_3.GLF_live1s += 0.2;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        break;
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(0.0, 0.0, 0.0, 0.0, sqrt(0.0), _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 0.0)))))) {
                                                return;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    continue;
                                                }
                                                _GLF_color = dFdy(vec4(609.298, 6.3, 5839.9965, -993.620));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    discard;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                break;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            continue;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, clamp(_GLF_IDENTITY(0.0, (false ? _GLF_FUZZED(atan(-439.766)) : 0.0)), 0.0, _GLF_IDENTITY(0.0, (0.0) / 1.0))))))) {
                                            do {
                                                _GLF_color = _GLF_color;
                                            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, bool(bvec3(false, true, true)))));
                                        }
                                        discard;
                                    }
                                }
                            } else {
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                }
            }
        }
    }
    _GLF_color = vec4(col, 1.0);
}
