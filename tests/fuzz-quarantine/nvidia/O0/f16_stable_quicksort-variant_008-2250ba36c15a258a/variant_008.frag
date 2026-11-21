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
vec4 GLF_live11_GLF_color = _GLF_FUZZED(vec4(-398.492, 26.24, -1048.8222, 703.524));

layout(set = 0, binding = 1) uniform buf1 {
    float GLF_live11one;
};

mat2 GLF_live11m22 = _GLF_FUZZED(((339.206 * (-342.369)) + mat2(-9203.4996, -72.44, -30.40, 215.425)));
mat2x3 GLF_live11m23 = _GLF_FUZZED(mat2x3(mat2(-83.34, -4.0, -41.39, 4.7)));
mat2x4 GLF_live11m24 = _GLF_FUZZED((mat2x4(0.4, 5760.7330, 24.97, -934.554, -477.566, 59.36, 309.693, -5890.9225)));
mat3x2 GLF_live11m32 = _GLF_FUZZED(mat3x2(17.43, 4.9, -1461.5053, 272.133, -8.6, 3190.6915));
mat3 GLF_live11m33 = _GLF_FUZZED(mat3(8039.9417, -4.7, 7.9, 6489.2370, 56.31, 4148.3021, 291.670, -9.1, 8.4));
mat3x4 GLF_live11m34 = _GLF_FUZZED((-mat3x4(1.6, 50.50, 71.45, -32.71, 1875.4045, -1806.7139, 41.20, -9670.7471, 74.59, -6.9, -28.57, 5.1)));
mat4x2 GLF_live11m42 = _GLF_FUZZED(mat4x2(-6.2, 2568.9165, -388.863, 45.14, 5.2, 1791.1503, 4.5, -9.8));
mat4x3 GLF_live11m43 = _GLF_FUZZED(mat4x3(-93.93, 7467.4092, 3.8, 7802.3472, -8.7, 87.59, 9.3, -9.6, -5297.6039, -38.33, 25.24, 2682.3997));
mat4 GLF_live11m44 = _GLF_FUZZED(mat4(-7.2, 8.8, 63.94, -87.41, 9821.4883, -782.815, -52.25, 24.97, 6069.6147, 56.12, 9110.8767, 34.83, -18.70, 548.939, -2.1, 5.5));

layout(set = 0, binding = 2) uniform buf2 {
    float GLF_live10time;
};

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_live10resolution;
};

float GLF_live10h_r = _GLF_FUZZED(-94.05);
float GLF_live10s_g = _GLF_FUZZED(6115.2464);
float GLF_live10b_b = _GLF_FUZZED(-6.6);

void GLF_live10doConvert() {
    int GLF_live10msb8 = 256;
    vec3 GLF_live10temp = _GLF_FUZZED(vec3(-2.0, 58.50, -3.5));
    GLF_live10temp = GLF_live10b_b * (float(bitCount(GLF_live10msb8)) - GLF_live10s_g) + (GLF_live10b_b - GLF_live10b_b * (float(bitCount(GLF_live10msb8)) - GLF_live10s_g)) * clamp(abs(abs(6.0 * (GLF_live10h_r - vec3(bitfieldReverse(0), bitCount(GLF_live10msb8), 2) / 3.0)) - 3.0) - float(bitCount(GLF_live10msb8)), float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0)), float(bitCount(int(GLF_live10resolution.x))));
    GLF_live10h_r = GLF_live10temp.x;
    GLF_live10s_g = GLF_live10temp.y;
    GLF_live10b_b = GLF_live10temp.z;
}

vec3 GLF_live10computeColor(float GLF_live10c, vec2 GLF_live10position) {
    int GLF_live10msb8 = 256;
    GLF_live10h_r = fract(GLF_live10c);
    GLF_live10s_g = float(bitCount(GLF_live10msb8));
    GLF_live10b_b = (0.5 + (sin(GLF_live10time) * 0.5 + 0.5));
    GLF_live10doConvert();
    GLF_live10s_g *= float(bitCount(GLF_live10msb8)) / GLF_live10position.y;
    GLF_live10h_r *= float(bitCount(GLF_live10msb8)) / GLF_live10position.x;
    if (abs(GLF_live10position.y - GLF_live10position.x) < 0.5) {
        GLF_live10b_b = clamp(float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0)), float(bitCount(GLF_live10msb8)), GLF_live10b_b * float(bitCount(GLF_live10msb8)) * 3.0);
    }
    return vec3(GLF_live10h_r, GLF_live10s_g, GLF_live10b_b);
}

vec3 GLF_live10defaultColor() {
    return vec3(float(bitfieldExtract(int(GLF_live10resolution.y), 0, 0)));
}

vec3 GLF_live10drawShape(vec2 GLF_live10pos, vec2 GLF_live10square, vec3 GLF_live10setting) {
    int GLF_live10msb8 = 256;
    bool GLF_live10c1 = GLF_live10pos.x - GLF_live10setting.x < GLF_live10square.x;
    if (!GLF_live10c1) {
        return GLF_live10defaultColor();
    }
    bool GLF_live10c2 = GLF_live10pos.x + GLF_live10setting.x > GLF_live10square.x;
    if (!GLF_live10c2) {
        return GLF_live10defaultColor();
    }
    bool GLF_live10c3 = GLF_live10pos.y - GLF_live10setting.x < GLF_live10square.y;
    if (!GLF_live10c3) {
        return GLF_live10defaultColor();
    }
    bool GLF_live10c4 = GLF_live10pos.y + GLF_live10setting.x > GLF_live10square.y;
    if (!GLF_live10c4) {
        return GLF_live10defaultColor();
    }
    bool GLF_live10c5 = GLF_live10pos.x - (GLF_live10setting.x - GLF_live10setting.y) < GLF_live10square.x;
    if (!GLF_live10c5) {
        return GLF_live10computeColor(GLF_live10setting.z / (5.0 * float(findMSB(GLF_live10msb8))), GLF_live10pos);
    }
    bool GLF_live10c6 = GLF_live10pos.x + (GLF_live10setting.x - GLF_live10setting.y) > GLF_live10square.x;
    if (!GLF_live10c6) {
        return GLF_live10computeColor(GLF_live10setting.z / (5.0 * float(findMSB(GLF_live10msb8))), GLF_live10pos);
    }
    bool GLF_live10c7 = GLF_live10pos.y - (GLF_live10setting.x - GLF_live10setting.y) < GLF_live10square.y;
    if (!GLF_live10c7) {
        return GLF_live10computeColor(GLF_live10setting.z / (5.0 * float(findMSB(GLF_live10msb8))), GLF_live10pos);
    }
    bool GLF_live10c8 = GLF_live10pos.y + (GLF_live10setting.x - GLF_live10setting.y) > GLF_live10square.y;
    if (!GLF_live10c8) {
        return GLF_live10computeColor(GLF_live10setting.z / (5.0 * float(findMSB(GLF_live10msb8))), GLF_live10pos);
    }
    return GLF_live10defaultColor();
}

layout(set = 0, binding = 4) uniform sampler2D GLF_live8tex;

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_live4injectionSwitch;
};

vec4 GLF_live6_GLF_color = _GLF_IDENTITY(_GLF_FUZZED((vec4(8904.6920, 423.291, 0.6, 3236.2812) * (+(-2.7)))), clamp(_GLF_FUZZED((vec4(8904.6920, 423.291, 0.6, 3236.2812) * (+(-2.7)))), _GLF_IDENTITY(_GLF_FUZZED((vec4(8904.6920, 423.291, 0.6, 3236.2812) * (+(-2.7)))), clamp(_GLF_FUZZED((vec4(8904.6920, 423.291, 0.6, 3236.2812) * (+(-2.7)))), _GLF_FUZZED((vec4(8904.6920, 423.291, 0.6, 3236.2812) * (+(-2.7)))), _GLF_IDENTITY(_GLF_FUZZED((vec4(8904.6920, 423.291, 0.6, 3236.2812) * (+(-2.7)))), (_GLF_FUZZED((vec4(8904.6920, 423.291, 0.6, 3236.2812) * (+(-2.7))))) / vec4(1.0, 1.0, 1.0, 1.0)))), _GLF_FUZZED((vec4(8904.6920, 423.291, 0.6, 3236.2812) * (+(-2.7))))));
layout(set = 0, binding = 6) uniform sampler2D GLF_live7tex;

struct _GLF_struct_9 {
    vec4 _f0;
    mat4 _f1;
    vec2 _f2;
    uvec4 _f3;
};

struct _GLF_struct_8 {
    ivec3 _f0;
    vec4 _f1;
    ivec2 _f2;
    float GLF_live3x_new;
    _GLF_struct_9 _f3;
};

struct _GLF_struct_7 {
    mat3 _f0;
    float _f1;
    uvec3 _f2;
    float _f3;
    mat2x3 _f4;
};

struct _GLF_struct_6 {
    bool _f0;
    mat3 _f1;
    vec3 _f2;
};

struct _GLF_struct_5 {
    ivec4 _f0;
    bool _f1;
    uvec4 _f2;
};

struct _GLF_struct_4 {
    _GLF_struct_5 _f0;
    _GLF_struct_6 _f1;
    bvec2 _f2;
    _GLF_struct_7 _f3;
    int _f4;
    vec3 _f5;
};

struct _GLF_struct_3 {
    mat3 _f0;
    _GLF_struct_4 _f1;
    mat2x4 _f2;
    mat3x4 _f3;
    _GLF_struct_8 _f4;
    vec3 _f5;
};

struct _GLF_struct_14 {
    int _f0;
};

struct _GLF_struct_13 {
    uvec3 _f0;
    _GLF_struct_14 _f1;
};

struct _GLF_struct_12 {
    bvec4 _f0;
    int top;
    mat2x3 _f1;
    mat3 _f2;
    uint _f3;
    mat2x3 _f4;
};

struct _GLF_struct_11 {
    mat3x4 _f0;
    bvec2 _f1;
    mat4 _f2;
    _GLF_struct_12 _f3;
    bvec3 _f4;
};

struct _GLF_struct_10 {
    _GLF_struct_11 _f0;
    float _f1;
    uvec4 _f2;
    float _f3;
    uint _f4;
    int _f5;
    _GLF_struct_13 _f6;
};

struct _GLF_struct_18 {
    int _f0;
    mat3x2 _f1;
    bvec4 _f2;
    uvec2 _f3;
    vec2 GLF_live0uv;
    vec3 _f4;
    uvec4 _f5;
};

struct _GLF_struct_17 {
    uint _f0;
    uvec3 _f1;
    int _f2;
    mat2 _f3;
    ivec2 _f4;
    uvec3 _f5;
};

struct _GLF_struct_16 {
    _GLF_struct_17 _f0;
    _GLF_struct_18 _f1;
};

struct _GLF_struct_15 {
    mat3x2 _f0;
    mat2x4 _f1;
    _GLF_struct_16 _f2;
    mat3 _f3;
    int _f4;
    bvec2 _f5;
};

struct _GLF_struct_19 {
    mat3x2 _f0;
    bvec3 _f1;
    int p;
};

struct _GLF_struct_22 {
    ivec2 _f0;
    ivec3 _f1;
    vec2 _f2;
    bvec3 _f3;
    vec2 _f4;
    bvec3 _f5;
    mat4x2 _f6;
};

struct _GLF_struct_21 {
    _GLF_struct_22 _f0;
};

struct _GLF_struct_20 {
    bvec4 _f0;
    uvec3 _f1;
    int GLF_live3iteration;
    mat2x4 _f2;
    _GLF_struct_21 _f3;
    uvec2 _f4;
    mat2 _f5;
};

struct _GLF_struct_0 {
    bvec3 _f0;
    mat2x3 _f1;
    int i;
};

struct _GLF_struct_2 {
    vec4 _GLF_outVarBackup_GLF_color;
    bvec4 _f0;
};

struct _GLF_struct_1 {
    _GLF_struct_2 _f0;
    mat3 _f1;
    float _f2;
};

layout(set = 0, binding = 7) uniform buf7 {
    vec2 injectionSwitch;
};

vec4 GLF_live0_GLF_color = _GLF_FUZZED((vec2(3.0, -42.26).y * vec4(-91.11, -934.016, 1.8, -64.77)));

layout(set = 0, binding = 8) uniform buf8 {
    vec2 GLF_live0injectionSwitch;
};

float GLF_live0compute_derivative_x(float GLF_live0v) {
    return dFdx(GLF_live0v) * GLF_live0injectionSwitch.y;
}

float GLF_live0compute_derivative_y(float GLF_live0v) {
    return _GLF_IDENTITY(dFdy(GLF_live0v) * GLF_live0injectionSwitch.y, max(dFdy(GLF_live0v) * GLF_live0injectionSwitch.y, dFdy(GLF_live0v) * GLF_live0injectionSwitch.y));
}

float GLF_live0compute_stripe(float GLF_live0v) {
    return smoothstep(-.9, 1., _GLF_IDENTITY((GLF_live0v), mix(float(_GLF_FUZZED((true ? (-4.5) : 2987.7699))), float((_GLF_IDENTITY(GLF_live0v, mix(float(_GLF_FUZZED(-15.86)), float(_GLF_IDENTITY(GLF_live0v, (GLF_live0v) / 1.0)), bool(true))))), bool(true))) / (_GLF_IDENTITY((GLF_live0injectionSwitch.y > GLF_live0injectionSwitch.x), true && ((GLF_live0injectionSwitch.y > GLF_live0injectionSwitch.x))) ? GLF_live0compute_derivative_x(GLF_live0v) : GLF_live0compute_derivative_y(GLF_live0v)));
}

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

struct QuicksortObject {
    int numbers[10];
};

QuicksortObject obj;

vec4 _GLF_outlined_3() {
    return cosh(vec4(6.3, 3.8, 8664.1717, -4.9));
}

void swap(int i, int j) {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            vec2 GLF_live8coord = _GLF_FUZZED(vec2(-425.078, 2.4));
            vec4 GLF_live8res = _GLF_FUZZED((mat2x4(435.721, 295.335, 675.534, 52.06, -8.8, 686.114, -4949.9931, -4.5) * vec2(72.47, 9342.2447)));
            if (GLF_live8coord.x < 1.0 && GLF_live8coord.y < 1.0) {
                GLF_live8res = texture(GLF_live8tex, GLF_live8coord);
            }
        }
        _GLF_color = _GLF_outlined_3();
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = pow(vec4(70.85, 3861.9898, 2.8, 55.60), intBitsToFloat(ivec4(-21495, 64345, -26501, 4887)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), bool(bvec4(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false || (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))), true, true, true))))) {
                    _GLF_color = GLF_live0_GLF_color;
                }
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (vec4(8100.6863, 0.7, 3.4, -15.69) * 8.8);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        bool GLF_live0c1 = _GLF_FUZZED(_GLF_IDENTITY((1.2 <= (-1698.2868)), false || ((1.2 <= (-1698.2868)))));
        if (_GLF_DEAD(false)) {
            _GLF_color = smoothstep(_GLF_color, vec4(-3.9, -782.594, 7728.7908, -_GLF_IDENTITY(63.59, (true ? _GLF_IDENTITY(63.59, (63.59) - 0.0) : _GLF_FUZZED(6.4)))), _GLF_IDENTITY(_GLF_color, mix(vec4(_GLF_FUZZED(-3.1), _GLF_FUZZED(vec2(-3350.6562, 520.177).t), (_GLF_color)[2], _GLF_FUZZED(-17.75)), vec4((_GLF_color)[0], (_GLF_color)[1], _GLF_FUZZED(-258.617), (_GLF_color)[3]), bvec4(true, true, _GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, !(!(injectionSwitch.x > injectionSwitch.y))))), true))));
        }
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(664.610)), float(0.0), bool(true)))))) && true))) {
            _GLF_color = max(vec4(resolution, 522.574, -38.94), 81.77);
        }
        {
            float GLF_live9s = _GLF_FUZZED(float((73425 * 75132)));
            {
                ;
            }
        }
        bool GLF_live0c2 = _GLF_IDENTITY(_GLF_FUZZED(false), _GLF_IDENTITY(bool(bvec2(_GLF_IDENTITY(_GLF_FUZZED(false), true && (_GLF_FUZZED(false))), true)), !(!(bool(bvec2(_GLF_IDENTITY(_GLF_FUZZED(false), true && (_GLF_FUZZED(false))), true))))));
        vec3 GLF_live0col = _GLF_FUZZED(vec3(326.619, vec2(_GLF_IDENTITY(21.92, clamp(_GLF_IDENTITY(21.92, clamp(21.92, 21.92, 21.92)), 21.92, 21.92)), 0.6)));
        vec2 GLF_live0uv = _GLF_FUZZED(_GLF_IDENTITY(vec2(-19.05, 3.5), (vec2(-19.05, 3.5)) - vec2(_GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x))));
        if (!GLF_live0c1 && GLF_live0c2) {
            float GLF_live0stripe = GLF_live0compute_stripe(_GLF_IDENTITY(tan((GLF_live0uv.x + GLF_live0uv.y) * 20.0), min(_GLF_IDENTITY(tan((GLF_live0uv.x + GLF_live0uv.y) * 20.0), mix(float(_GLF_FUZZED(5.6)), float(tan((GLF_live0uv.x + GLF_live0uv.y) * 20.0)), bool(true))), tan((GLF_live0uv.x + GLF_live0uv.y) * 20.0))));
            GLF_live0col = mix(vec3(0.5, GLF_live0uv.x, 0.1), vec3(.4, 0, .5), GLF_live0stripe);
            GLF_live0_GLF_color = vec4(GLF_live0col, 1.0);
            ;
        }
    }
    int temp = obj.numbers[i];
    {
        int GLF_live5k = _GLF_FUZZED(-89686);
        vec2 GLF_live5o = _GLF_FUZZED((_GLF_IDENTITY((true ? vec2(-9.9, -_GLF_IDENTITY(3202.7341, float(mat3x4(3202.7341, sin(0.0), 1.0, 1.0, 0.0, exp(0.0), 1.0, 1.0, 1.0, sin(0.0), 1.0, 1.0)))) : vec2(_GLF_IDENTITY(-5822.1030, max(-5822.1030, _GLF_IDENTITY(-5822.1030, float(float(_GLF_IDENTITY(-5822.1030, (-5822.1030) - 0.0)))))), 756.827)).r - vec2(64.66, 76.43), clamp((true ? vec2(-9.9, -_GLF_IDENTITY(3202.7341, float(mat3x4(3202.7341, sin(0.0), 1.0, 1.0, 0.0, exp(0.0), 1.0, 1.0, 1.0, sin(0.0), 1.0, 1.0)))) : vec2(_GLF_IDENTITY(-5822.1030, max(-5822.1030, _GLF_IDENTITY(-5822.1030, float(float(_GLF_IDENTITY(-5822.1030, (-5822.1030) - 0.0)))))), 756.827)).r - vec2(64.66, 76.43), _GLF_IDENTITY((true ? vec2(-9.9, -_GLF_IDENTITY(3202.7341, float(mat3x4(3202.7341, sin(0.0), 1.0, 1.0, 0.0, exp(0.0), 1.0, 1.0, 1.0, sin(0.0), 1.0, 1.0)))) : vec2(_GLF_IDENTITY(-5822.1030, max(-5822.1030, _GLF_IDENTITY(-5822.1030, float(float(_GLF_IDENTITY(-5822.1030, (-5822.1030) - 0.0)))))), 756.827)).r - vec2(64.66, 76.43), ((true ? vec2(-9.9, -_GLF_IDENTITY(3202.7341, float(mat3x4(3202.7341, sin(0.0), 1.0, 1.0, 0.0, exp(0.0), 1.0, 1.0, 1.0, sin(0.0), 1.0, 1.0)))) : vec2(_GLF_IDENTITY(-5822.1030, max(-5822.1030, _GLF_IDENTITY(-5822.1030, float(float(_GLF_IDENTITY(-5822.1030, (-5822.1030) - 0.0)))))), 756.827)).r - vec2(64.66, 76.43)) * mat2(1.0)), (true ? vec2(-9.9, -_GLF_IDENTITY(3202.7341, float(mat3x4(3202.7341, sin(0.0), 1.0, 1.0, 0.0, exp(0.0), 1.0, 1.0, 1.0, sin(0.0), 1.0, 1.0)))) : vec2(_GLF_IDENTITY(-5822.1030, max(-5822.1030, _GLF_IDENTITY(-5822.1030, float(float(_GLF_IDENTITY(-5822.1030, (-5822.1030) - 0.0)))))), 756.827)).r - vec2(64.66, 76.43)))));
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4((+(-4.1)), GLF_live0injectionSwitch, 1.8);
            }
            int GLF_live5looplimiter0 = 0;
            while (GLF_live5k >= 0) {
                if (GLF_live5looplimiter0 >= 5) {
                    {
                        {
                            ;
                        }
                    }
                    break;
                }
                GLF_live5looplimiter0++;
                {
                    GLF_live5o = GLF_live5o + GLF_live5o;
                    GLF_live5k--;
                }
            }
            {
                int GLF_live11c = _GLF_FUZZED(ivec4(ivec2(-57941, -10051), 4157, 1001).b);
                int GLF_live11looplimiter0 = 0;
                uint GLF_live11matrix_number = _GLF_FUZZED((150401u | 26834u));
                int GLF_live11r = _GLF_FUZZED((+61532));
                {
                    if (GLF_live11looplimiter0 >= 5) {
                        ;
                    }
                    GLF_live11looplimiter0++;
                    {
                        switch (GLF_live11matrix_number) {
                            case 0u:
                                GLF_live11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                break;
                            case 1u:
                                GLF_live11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                break;
                            case 2u:
                                GLF_live11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                break;
                            case 3u:
                                GLF_live11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                break;
                            case 4u:
                                GLF_live11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                break;
                            case 5u:
                                GLF_live11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                break;
                            case 6u:
                                GLF_live11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                break;
                            case 7u:
                                GLF_live11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                break;
                            case 8u:
                                GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                break;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
        }
    }
    {
        vec3 GLF_live10d = _GLF_FUZZED(vec3(-72.80, -4.1, 933.239));
        if (length(GLF_live10d) <= float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0))) {
            ;
        }
    }
    obj.numbers[i] = _GLF_IDENTITY(obj.numbers[j], max(obj.numbers[j], obj.numbers[j]));
    {
        vec2 GLF_live6coord = _GLF_FUZZED(vec2(0.4, 86.61));
        {
            ivec2 GLF_live6icoord = ivec2(((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    vec4 GLF_live9c = _GLF_FUZZED(vec4(-6.3, 20.32, 629.435, -7.0));
                    int GLF_live9i = _GLF_FUZZED(-88906);
                    {
                        GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] = GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] * GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)];
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(2272.1723, 4335.6611, 25.92, -27.71);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int GLF_live6v = (GLF_live6icoord.x ^ GLF_live6icoord.y) * GLF_live6icoord.y;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = (resolution * mat4x2(638.531));
                }
                {
                    int GLF_live11looplimiter1 = 0;
                    if (GLF_live11looplimiter1 >= 5) {
                        ;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec3(8.1, -257.111, 48.15).zxxx;
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 GLF_live9c = _GLF_FUZZED(vec4(4.8, 2444.3749, 37.15, -0.3));
                int GLF_live9i = _GLF_FUZZED(33679);
                {
                    if (GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] >= 1.0) {
                        GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] = GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] * GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)];
                    }
                }
            }
            bool GLF_live6res1 = ((GLF_live6v >> 10) & 1) != 0;
            bool GLF_live6res2 = ((GLF_live6v >> 11) & 4) != 0;
            bool GLF_live6res3 = ((GLF_live6v >> 12) & 8) != 0;
            GLF_live6_GLF_color = vec4(GLF_live6res1 ? 1.0 : 0.0, GLF_live6res2 ? 1.0 : 0.0, GLF_live6res3 ? 1.0 : 0.0, _GLF_IDENTITY(1, (1) - 0));
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(4342.7113, -876.850, -8312.4698, 58.65);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (_GLF_outVarBackup_GLF_color) - vec4(0.0, 0.0, 0.0, 0.0));
        }
    }
    obj.numbers[j] = temp;
}

vec4 _GLF_outlined_4(int GLF_live6res1, int GLF_live6res2, int GLF_live6res3) {
    {
        vec2 GLF_live8coord = _GLF_FUZZED(vec2(95.93, -5.5));
        int GLF_live8i = _GLF_FUZZED(26138);
        int GLF_live8looplimiter0 = 0;
        {
            if (GLF_live8looplimiter0 >= 5) {
                ;
            }
            GLF_live8looplimiter0++;
            {
                if (GLF_live8coord.x > 1.0)
                    GLF_live8coord.x -= 1.0;
                if (GLF_live8coord.y > 1.0)
                    GLF_live8coord.y -= 1.0;
                GLF_live8coord *= 2.0;
                GLF_live8i++;
            }
        }
    }
    return vec4(float(GLF_live6res1 ^ GLF_live6res2), float(GLF_live6res2 & GLF_live6res3), float(GLF_live6res1 | GLF_live6res3), 1.0);
}

vec4 _GLF_outlined_5() {
    return vec4(3.8, 1576.4583, -_GLF_IDENTITY(2475.9485, max(2475.9485, _GLF_IDENTITY(2475.9485, (_GLF_IDENTITY(2475.9485, clamp(2475.9485, 2475.9485, 2475.9485))) + 0.0))), -63.18);
}

int performPartition(int l, int h) {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = dFdx(vec4(6567.0923, -_GLF_IDENTITY(0.4, min(0.4, 0.4)), 8508.9972, -4672.5254));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    int pivot = obj.numbers[h];
    {
        {
            vec2 GLF_live7coord = _GLF_FUZZED((7.6 + vec2(-955.785, -5.0)));
            int GLF_live7i = _GLF_FUZZED(int((34224u * 181180u)));
            {
                {
                    vec4 GLF_live9c = _GLF_FUZZED(vec4(5073.6765, -198.915, -537.193, 419.373));
                    int GLF_live9i = _GLF_FUZZED(-88091);
                    {
                        if (GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] >= 1.0) {
                            GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] = GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] * GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)];
                        }
                    }
                }
                int GLF_live7looplimiter0 = 0;
                while (GLF_live7i < 1 && GLF_live7coord.x > 1.0 || GLF_live7coord.y > 1.0) {
                    if (GLF_live7looplimiter0 >= 4) {
                        break;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(7.5, 4.5, 40.41, -1.5);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    GLF_live7looplimiter0++;
                    {
                        if (GLF_live7coord.x > 1.0)
                            GLF_live7coord.x -= 1.0;
                        if (GLF_live7coord.y > 1.0)
                            GLF_live7coord.y -= 1.0;
                        GLF_live7coord *= 2.0;
                        GLF_live7i++;
                    }
                }
            }
            {
                {
                    vec2 GLF_live8coord = _GLF_FUZZED(vec2(-3539.8473, -20.27));
                    int GLF_live8i = _GLF_FUZZED(-56594);
                    {
                        int GLF_live8looplimiter0 = 0;
                        while (GLF_live8i < 1 && GLF_live8coord.x > 1.0 || GLF_live8coord.y > 1.0) {
                            if (GLF_live8looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live8looplimiter0++;
                            {
                                if (GLF_live8coord.x > 1.0)
                                    GLF_live8coord.x -= 1.0;
                                if (GLF_live8coord.y > 1.0)
                                    GLF_live8coord.y -= 1.0;
                                GLF_live8coord *= 2.0;
                                GLF_live8i++;
                            }
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, (_GLF_color) - vec4(0.0, 0.0, 0.0, 0.0));
                _GLF_color = dFdxCoarse(vec4(-6.4, 3105.7791, 7.0, -_GLF_IDENTITY(1.0, clamp(1.0, _GLF_IDENTITY(1.0, float(mat2x4(1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0))), 1.0))));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    {
                        float GLF_live9limit = _GLF_FUZZED((vec3(-6.5, -3.3, -5.0).t + (-3.0)));
                        int GLF_live9looplimiter0 = 0;
                        float GLF_live9ref = _GLF_FUZZED(4.4);
                        float GLF_live9s = _GLF_FUZZED((+(-0.1)));
                        for (int GLF_live9i = 1; GLF_live9i < 800; GLF_live9i++) {
                            if (GLF_live9looplimiter0 >= 4) {
                                break;
                            }
                            GLF_live9looplimiter0++;
                            {
                                if (mod(float(GLF_live9i), GLF_live9ref) <= 0.01) {
                                    GLF_live9s += 0.2;
                                }
                                if (float(GLF_live9i) >= GLF_live9limit) {
                                    ;
                                }
                            }
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            ;
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(5.2, -37.92, 1740.4592, 24.72);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec2 GLF_live7coord = _GLF_FUZZED((vec4(0.3, -727.340, 3166.4577, -189.570).rrgg * mat2x4(mat2(-7.5, 82.26, -9326.8715, -190.454))));
                int GLF_live7i = _GLF_FUZZED(((-36225) ^ (-4141)));
                {
                    {
                        int GLF_live11c = _GLF_FUZZED(-43031);
                        uint GLF_live11matrix_number = _GLF_FUZZED((32456u - 112578u));
                        int GLF_live11rows = _GLF_FUZZED(54887);
                        {
                            {
                                int GLF_live11looplimiter0 = 0;
                                for (int GLF_live11r = 0; GLF_live11r < GLF_live11rows; GLF_live11r++) {
                                    if (GLF_live11looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live11looplimiter0++;
                                    {
                                        switch (GLF_live11matrix_number) {
                                            case 0u:
                                                GLF_live11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                break;
                                            case 1u:
                                                GLF_live11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                break;
                                            case 2u:
                                                GLF_live11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                break;
                                            case 3u:
                                                GLF_live11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                break;
                                            case 4u:
                                                GLF_live11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                break;
                                            case 5u:
                                                GLF_live11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                break;
                                            case 6u:
                                                GLF_live11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                break;
                                            case 7u:
                                                GLF_live11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                break;
                                            case 8u:
                                                GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        int GLF_live11c = _GLF_FUZZED(57256);
                        uint GLF_live11matrix_number = _GLF_FUZZED(22748u);
                        int GLF_live11rows = _GLF_FUZZED(((-89524) | 9737));
                        {
                            {
                                int GLF_live11looplimiter0 = 0;
                                for (int GLF_live11r = 0; GLF_live11r < GLF_live11rows; GLF_live11r++) {
                                    if (GLF_live11looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live11looplimiter0++;
                                    {
                                        switch (GLF_live11matrix_number) {
                                            case 0u:
                                                GLF_live11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                break;
                                            case 1u:
                                                GLF_live11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                break;
                                            case 2u:
                                                GLF_live11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                break;
                                            case 3u:
                                                GLF_live11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                break;
                                            case 4u:
                                                GLF_live11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                break;
                                            case 5u:
                                                GLF_live11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                break;
                                            case 6u:
                                                GLF_live11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                break;
                                            case 7u:
                                                GLF_live11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                break;
                                            case 8u:
                                                GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = fma(vec4(3.4, -2531.8151, 356.271, 8214.1780), vec4(-7896.0418, _GLF_IDENTITY(-873.502, (-873.502) - 0.0), 7.5, 45.34), (vec4(86.73, -6.5, -2947.9424, -_GLF_IDENTITY(47.74, mix(float(_GLF_FUZZED(2.0)), float(47.74), bool(true)))) / (-63.84)));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    if (GLF_live7coord.x > 1.0)
                        GLF_live7coord.x -= 1.0;
                    if (GLF_live7coord.y > _GLF_IDENTITY(1.0, (1.0) / 1.0))
                        GLF_live7coord.y -= 1.0;
                    GLF_live7coord *= 2.0;
                    GLF_live7i++;
                    {
                        vec2 GLF_live8coord = _GLF_FUZZED(vec2(-1132.8418, 0.6));
                        int GLF_live8i = _GLF_FUZZED(39874);
                        int GLF_live8looplimiter0 = 0;
                        {
                            if (GLF_live8looplimiter0 >= 5) {
                                ;
                            }
                            GLF_live8looplimiter0++;
                            {
                                if (GLF_live8coord.x > 1.0)
                                    GLF_live8coord.x -= 1.0;
                                if (GLF_live8coord.y > 1.0)
                                    GLF_live8coord.y -= 1.0;
                                GLF_live8coord *= 2.0;
                                GLF_live8i++;
                            }
                        }
                    }
                }
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = vec4(-38.02, 4.2, 7.7, -1.1);
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            vec2 GLF_live10center = _GLF_FUZZED(vec2(-266.714, -649.303));
            int GLF_live10i = _GLF_FUZZED((+48055));
            int GLF_live10msb8 = _GLF_FUZZED(((-65708) ^ (-58755)));
            vec2 GLF_live10position = _GLF_FUZZED((+vec2(-2.5, 4.3)));
            vec3 GLF_live10result = _GLF_FUZZED(vec3(vec4(95.39, 7.1, -230.959, 26.90)));
            {
                vec3 GLF_live10d = _GLF_FUZZED((vec4(978.231, -6285.9547, 72.17, -0.9) * mat3x4(43.13, 437.273, -5.8, 4512.8907, 4.0, -34.87, -72.53, -416.876, 2812.4812, 8.2, 847.864, -9.1)));
                GLF_live10d = GLF_live10drawShape(GLF_live10position, GLF_live10center + vec2(sin(float(GLF_live10i) / (float(bitCount(GLF_live10msb8)) * 10.0) + GLF_live10time) / 4.0 * float(bitCount(GLF_live10msb8)), float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live10i) / 100.0 * float(bitCount(GLF_live10msb8))), 0.01, float(GLF_live10i)));
                if (length(GLF_live10d) <= float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0))) {
                    ;
                }
                GLF_live10result = vec3(GLF_live10d);
            }
        }
        _GLF_color = normalize(vec4(5536.7924, -89.77, 78.38, -4111.4713));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(bvec3(true, true, true), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), l - 1);
    for (int j = l; j <= h - 1; j++) {
        if (obj.numbers[j] <= pivot) {
            {
                float GLF_live3c_im = _GLF_FUZZED(3.4);
                float GLF_live3c_re = _GLF_IDENTITY(_GLF_FUZZED(6597.6940), min(_GLF_FUZZED(6597.6940), _GLF_FUZZED(6597.6940)));
                int GLF_live3iteration = _GLF_FUZZED(88083);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = max(vec4(-5.9, 9047.9897, 4.3, -8955.7396), vec4(93.71, 5.0, -881.086, -8011.1660));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                float GLF_live3x = _GLF_FUZZED((+(-3198.2873)));
                float GLF_live3y = _GLF_FUZZED(float(false));
                {
                    int GLF_live3looplimiter0 = 0;
                    {
                        int GLF_live10msb8 = _GLF_FUZZED(((-72214) | (56500 & (-22667))));
                        vec2 GLF_live10pos = _GLF_FUZZED((-vec3(5.0, -903.129, 922.274)).rg);
                        vec3 GLF_live10setting = _GLF_FUZZED(((-4.1) - vec3(573.216, 32.60, -8114.4857)));
                        {
                            ;
                        }
                    }
                    for (int GLF_live3k = 0; GLF_live3k < 1000; GLF_live3k++) {
                        if (GLF_live3looplimiter0 >= 6) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live6_GLF_color;
                            }
                            break;
                        }
                        {
                            vec2 GLF_live8coord = _GLF_FUZZED((vec2(6.1, 718.801) * vec2(-7743.0871, -822.786)));
                            int GLF_live8i = _GLF_FUZZED((-(-7359)));
                            int GLF_live8looplimiter0 = 0;
                            {
                                if (GLF_live8looplimiter0 >= 5) {
                                    ;
                                }
                                GLF_live8looplimiter0++;
                                {
                                    if (GLF_live8coord.x > 1.0)
                                        GLF_live8coord.x -= 1.0;
                                    if (GLF_live8coord.y > 1.0)
                                        GLF_live8coord.y -= 1.0;
                                    GLF_live8coord *= 2.0;
                                    GLF_live8i++;
                                }
                            }
                        }
                        GLF_live3looplimiter0++;
                        {
                            vec2 GLF_live6coord = _GLF_FUZZED(_GLF_IDENTITY(vec2(vec3(22.09, 2.8, -72.07)), vec2(_GLF_IDENTITY(vec4(_GLF_IDENTITY(vec2(vec3(22.09, 2.8, -72.07)), clamp(vec2(vec3(22.09, 2.8, -72.07)), vec2(vec3(22.09, 2.8, -72.07)), vec2(vec3(22.09, 2.8, -72.07)))), 0.0, 0.0), (vec4(_GLF_IDENTITY(vec2(vec3(22.09, 2.8, -72.07)), clamp(vec2(vec3(22.09, 2.8, -72.07)), vec2(vec3(22.09, 2.8, -72.07)), vec2(vec3(22.09, 2.8, -72.07)))), 0.0, 0.0)) / vec4(1.0, 1.0, 1.0, 1.0)))));
                            {
                                {
                                    vec2 GLF_live10center = _GLF_FUZZED((false ? vec2(-6.3, 195.380) : (vec2(-5686.8852, 7943.1448) + vec2(-8.2, 40.86))));
                                    int GLF_live10msb8 = _GLF_FUZZED(ivec3(30320, 89399, -44393).y);
                                    vec2 GLF_live10position = _GLF_FUZZED(vec2(5091.7600, -3.0));
                                    vec3 GLF_live10result = _GLF_FUZZED(vec3(14.00, -3.7, 1.6));
                                    {
                                        int GLF_live10looplimiter0 = 0;
                                        for (int GLF_live10i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live10resolution.x), 0, 0)); GLF_live10i >= bitfieldReverse(bitfieldExtract(int(GLF_live10resolution.x), 0, 0)); GLF_live10i--) {
                                            if (GLF_live10looplimiter0 >= 6) {
                                                break;
                                            }
                                            GLF_live10looplimiter0++;
                                            {
                                                vec3 GLF_live10d = _GLF_FUZZED((vec4(978.231, -6285.9547, 72.17, -0.9) * mat3x4(43.13, 437.273, -5.8, 4512.8907, 4.0, -34.87, -72.53, -416.876, 2812.4812, 8.2, 847.864, -9.1)));
                                                GLF_live10d = GLF_live10drawShape(GLF_live10position, GLF_live10center + vec2(sin(float(GLF_live10i) / (float(bitCount(GLF_live10msb8)) * 10.0) + GLF_live10time) / 4.0 * float(bitCount(GLF_live10msb8)), float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live10i) / 100.0 * float(bitCount(GLF_live10msb8))), 0.01, float(GLF_live10i)));
                                                if (length(GLF_live10d) <= float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0))) {
                                                    continue;
                                                }
                                                GLF_live10result = vec3(GLF_live10d);
                                            }
                                        }
                                    }
                                }
                                if (GLF_live6coord.y < 0.6) {
                                    uvec2 GLF_live6icoord = uvec2(((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(28.95, 9.8, -4.9, -2359.8127);
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        {
                                            bool GLF_live10c4 = _GLF_FUZZED(((-63.80) != 37.01));
                                            if (!GLF_live10c4) {
                                                ;
                                            }
                                        }
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = intBitsToFloat(ivec4(_GLF_IDENTITY(27909, 0 | (27909)), 92089, 19686, -50587));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            if (_GLF_IDENTITY(_GLF_DEAD(false), false || (_GLF_DEAD(false)))) {
                                                _GLF_color = ceil(GLF_live6_GLF_color);
                                            }
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    uint GLF_live6res1 = uint(((GLF_live6icoord.x * GLF_live6icoord.y) >> (GLF_live6icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_live6res2 = uint(((GLF_live6icoord.x * GLF_live6icoord.y) << (GLF_live6icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_live6res = float((_GLF_IDENTITY((GLF_live6res2 & 0x80000000u) != 0u ? 1u : 0u, ((GLF_live6res2 & 0x80000000u) != 0u ? 1u : 0u) + 0u)) ^ ((GLF_live6res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_live6_GLF_color = vec4(GLF_live6res, GLF_live6res, GLF_live6res, 1.0);
                                } else {
                                    ivec2 GLF_live6icoord = ivec2(((GLF_live6coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_live6res3 = ((GLF_live6icoord.x >> 5) & 1) ^ ((GLF_live6icoord.y & 32) >> 5);
                                    int GLF_live6res2 = (GLF_live6icoord.y * GLF_live6icoord.y >> 10) & 1;
                                    {
                                        vec2 GLF_live8coord = _GLF_FUZZED(vec2(-11.40, 3563.4078));
                                        if (GLF_live8coord.y > 1.0)
                                            GLF_live8coord.y -= 1.0;
                                    }
                                    if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) && true)) {
                                        _GLF_color = GLF_live0_GLF_color;
                                    }
                                    int GLF_live6res1 = (GLF_live6icoord.x * GLF_live6icoord.y >> 9) & 1;
                                    {
                                        int GLF_live11cols = _GLF_FUZZED(-40923);
                                        uint GLF_live11matrix_number = _GLF_FUZZED(uint((true ? false : bool(161745u))));
                                        int GLF_live11rows = _GLF_FUZZED(ivec4(20457, -16758, 43755, -94920).b);
                                        {
                                            int GLF_live11looplimiter1 = 0;
                                            for (int GLF_live11c = 0; GLF_live11c < GLF_live11cols; GLF_live11c++) {
                                                if (GLF_live11looplimiter1 >= 5) {
                                                    break;
                                                }
                                                GLF_live11looplimiter1++;
                                                {
                                                    {
                                                        int GLF_live11looplimiter0 = 0;
                                                        for (int GLF_live11r = 0; GLF_live11r < GLF_live11rows; GLF_live11r++) {
                                                            if (GLF_live11looplimiter0 >= 5) {
                                                                break;
                                                            }
                                                            GLF_live11looplimiter0++;
                                                            {
                                                                switch (GLF_live11matrix_number) {
                                                                    case 0u:
                                                                        GLF_live11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                        break;
                                                                    case 1u:
                                                                        GLF_live11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                        break;
                                                                    case 2u:
                                                                        GLF_live11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                        break;
                                                                    case 3u:
                                                                        GLF_live11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                        break;
                                                                    case 4u:
                                                                        GLF_live11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                        break;
                                                                    case 5u:
                                                                        GLF_live11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                        break;
                                                                    case 6u:
                                                                        GLF_live11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                        break;
                                                                    case 7u:
                                                                        GLF_live11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                        break;
                                                                    case 8u:
                                                                        GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    GLF_live6_GLF_color = _GLF_outlined_4(GLF_live6res1, GLF_live6res2, GLF_live6res3);
                                    {
                                        vec4 GLF_live9c = _GLF_FUZZED((mat4(-127.097, 4.1, -16.78, -7427.6497, -0.3, -77.55, -14.00, 69.62, -0.4, -27.95, 40.09, -46.39, -9468.6052, 4015.1363, 4472.6836, -5.2) * ((-2611.9239) * vec4(4.9, 6888.3536, -3997.7210, 710.521))));
                                        int GLF_live9i = _GLF_FUZZED(-93665);
                                        if (GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] >= 1.0) {
                                            GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] = GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] * GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)];
                                        }
                                    }
                                }
                            }
                        }
                        {
                            if (GLF_live3x * GLF_live3x + _GLF_IDENTITY(GLF_live3y, max(_GLF_IDENTITY(GLF_live3y, 1.0 * (GLF_live3y)), GLF_live3y)) * GLF_live3y > 4.0) {
                                break;
                            }
                            _GLF_struct_3 _GLF_struct_replacement_3 = _GLF_struct_3(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0), _GLF_struct_4(_GLF_struct_5(ivec4(1, 1, 1, 1), true, uvec4(1u, 1u, 1u, 1u)), _GLF_struct_6(true, mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)), bvec2(true, true), _GLF_struct_7(mat3(1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, 0.0 + (1.0)), 1.0, 1.0, 1.0, 1.0), 1.0, uvec3(1u, 1u, 1u), 1.0, mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), 1, vec3(1.0, _GLF_IDENTITY(1.0, (false ? _GLF_FUZZED((-50.03)) : 1.0)), _GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, (1.0) + 0.0))))), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, _GLF_IDENTITY(1.0, (true ? 1.0 : _GLF_FUZZED(GLF_live3c_im))))), 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_8(ivec3(1, 1, 1), vec4(1.0, 1.0, 1.0, 1.0), ivec2(1, 1), _GLF_IDENTITY(_GLF_IDENTITY(GLF_live3x, float(mat4x3(_GLF_IDENTITY(GLF_live3x, (true ? GLF_live3x : _GLF_FUZZED(GLF_live3c_im))), 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, exp(length(vec2(0.0, 0.0)))))) * GLF_live3x - _GLF_IDENTITY(GLF_live3y * GLF_live3y, mix(float(_GLF_FUZZED(7.0)), float(GLF_live3y * GLF_live3y), bool(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))) + GLF_live3c_re, float(float(_GLF_IDENTITY(GLF_live3x, float(mat4x3(_GLF_IDENTITY(GLF_live3x, (true ? GLF_live3x : _GLF_FUZZED(GLF_live3c_im))), 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, exp(length(vec2(0.0, 0.0)))))) * GLF_live3x - _GLF_IDENTITY(GLF_live3y * GLF_live3y, mix(float(_GLF_FUZZED(7.0)), float(GLF_live3y * GLF_live3y), bool(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))) + GLF_live3c_re))), _GLF_struct_9(vec4(1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), uvec4(_GLF_IDENTITY(1u, min(1u, 1u)), 1u, 1u, 1u))), vec3(1.0, 1.0, 1.0));
                            GLF_live3y = _GLF_IDENTITY(2.0 * GLF_live3x * GLF_live3y + GLF_live3c_im, (_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch, vec2(vec3(_GLF_IDENTITY(injectionSwitch, vec2(_GLF_IDENTITY(injectionSwitch[0], min(injectionSwitch[0], injectionSwitch[0])), injectionSwitch[1])), 0.0))).x < injectionSwitch.y)) ? (2.0 * GLF_live3x * GLF_live3y + GLF_live3c_im) : _GLF_FUZZED(GLF_live3y)));
                            GLF_live3x = _GLF_struct_replacement_3._f4.GLF_live3x_new;
                            GLF_live3iteration++;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-7622.1144, -5090.4360, 34.63, -1518.1689);
                                {
                                    {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            _GLF_struct_replacement_0.i++;
            swap(_GLF_struct_replacement_0.i, j);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = _GLF_outlined_5();
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0, bool(_GLF_IDENTITY(bvec2(_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0, !(!(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0)))) && true), false), bvec2(_GLF_IDENTITY(bvec2(_GLF_IDENTITY(bvec2(_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0, !(!(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0)))) && true), false), bvec2(bvec3(bvec2(_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0, !(!(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0)))) && true), false), true)))), bvec2(bvec4(bvec2(_GLF_IDENTITY(bvec2(_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0, !(!(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0)))) && true), false), bvec2(bvec3(bvec2(_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0, !(!(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0))).y < 0.0)))) && true), false), true)))), true, false))))))))))) {
                    _GLF_color = asinh(unpackSnorm4x8(14494u));
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(log(1.0)))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-18.08, -2928.9902, -1.5, -6089.9991);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            {
                                ;
                            }
                        }
                        _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, clamp(_GLF_outVarBackup_GLF_color, _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, max(_GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color)), _GLF_outVarBackup_GLF_color))) / vec4(1.0, 1.0, 1.0, 1.0));
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_IDENTITY(tanh(_GLF_color), (_GLF_IDENTITY(tanh(_GLF_color), (tanh(_GLF_color)) - vec4(0.0, 0.0, 0.0, 0.0))) - abs(vec4(0.0, 0.0, 0.0, 0.0)));
                    }
                }
                {
                    {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                            {
                                {
                                    ;
                                }
                            }
                            _GLF_color = _GLF_color;
                        }
                        ;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = dFdy(mat3x4(7.6, 0.2, _GLF_IDENTITY(-688.337, (-688.337) / 1.0), 9370.0563, -9655.0355, -7.2, 33.43, 4.2, -62.63, 209.364, -8.4, 68.33)[0]);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((gl_FragCoord.y >= 0.0), ((gl_FragCoord.y >= 0.0)) || false)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = step(_GLF_color, GLF_live0_GLF_color);
                }
                {
                    int GLF_live4a = _GLF_FUZZED((true ? (~(-41747)) : (5981)));
                    int GLF_live4looplimiter0 = 0;
                    vec2 GLF_live4uv = _GLF_FUZZED((vec2(25.88, 9.6) * vec2(30.34, -6.2)));
                    if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) || false)) {
                        {
                            vec2 GLF_live10center = _GLF_FUZZED(vec2(984.783, 37.01));
                            int GLF_live10msb8 = _GLF_FUZZED(-99347);
                            vec2 GLF_live10position = _GLF_FUZZED((vec2(-361.654, -572.175) * mat2(-7.9, 4.6, 1.8, 9.9)));
                            vec3 GLF_live10result = _GLF_FUZZED(vec3(vec2(-926.742, 5.8), -1.2));
                            {
                                int GLF_live10looplimiter0 = 0;
                                for (int GLF_live10i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live10resolution.x), 0, 0)); GLF_live10i >= bitfieldReverse(bitfieldExtract(int(GLF_live10resolution.x), 0, 0)); GLF_live10i--) {
                                    if (GLF_live10looplimiter0 >= 6) {
                                        break;
                                    }
                                    GLF_live10looplimiter0++;
                                    {
                                        vec3 GLF_live10d = _GLF_FUZZED((vec4(978.231, -6285.9547, 72.17, -0.9) * mat3x4(43.13, 437.273, -5.8, 4512.8907, 4.0, -34.87, -72.53, -416.876, 2812.4812, 8.2, 847.864, -9.1)));
                                        GLF_live10d = GLF_live10drawShape(GLF_live10position, GLF_live10center + vec2(sin(float(GLF_live10i) / (float(bitCount(GLF_live10msb8)) * 10.0) + GLF_live10time) / 4.0 * float(bitCount(GLF_live10msb8)), float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live10i) / 100.0 * float(bitCount(GLF_live10msb8))), 0.01, float(GLF_live10i)));
                                        if (length(GLF_live10d) <= float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0))) {
                                            continue;
                                        }
                                        GLF_live10result = vec3(GLF_live10d);
                                    }
                                }
                            }
                        }
                        _GLF_color = _GLF_color;
                    }
                    {
                        vec4 GLF_live9c = _GLF_FUZZED(vec4(4.9, 8.1, vec2(-193.114, 23.38)));
                        {
                            int GLF_live9looplimiter1 = 0;
                            for (int GLF_live9i = 0; GLF_live9i < 3; GLF_live9i++) {
                                if (GLF_live9looplimiter1 >= 4) {
                                    break;
                                }
                                GLF_live9looplimiter1++;
                                {
                                    if (GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] >= 1.0) {
                                        GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] = GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] * GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)];
                                    }
                                }
                            }
                        }
                    }
                    do {
                        if (GLF_live4looplimiter0 >= 6) {
                            {
                                int GLF_live9i = _GLF_FUZZED(ivec2(-94727, -75488).x);
                                float GLF_live9limit = _GLF_FUZZED(8.5);
                                int GLF_live9looplimiter0 = 0;
                                float GLF_live9ref = _GLF_FUZZED(-10.29);
                                float GLF_live9s = _GLF_FUZZED(float((false ? (-61873) : (-1721))));
                                {
                                    if (GLF_live9looplimiter0 >= 4) {
                                        ;
                                    }
                                    GLF_live9looplimiter0++;
                                    {
                                        if (mod(float(GLF_live9i), GLF_live9ref) <= 0.01) {
                                            GLF_live9s += 0.2;
                                        }
                                        if (float(GLF_live9i) >= GLF_live9limit) {
                                            ;
                                        }
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (false ? _GLF_FUZZED((_GLF_color * (-4961.0270))) : (_GLF_outVarBackup_GLF_color = _GLF_color)));
                                _GLF_color = atanh(_GLF_IDENTITY(vec4(4439.4075, 5820.2961, 1.5, -1392.4258), (vec4(4439.4075, 5820.2961, 1.5, -1392.4258)) - vec4(0.0, 0.0, 0.0, 0.0)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                {
                                    int GLF_live9looplimiter1 = 0;
                                    if (GLF_live9looplimiter1 >= 4) {
                                        ;
                                    }
                                }
                            }
                            break;
                        }
                        {
                            bool GLF_live10c3 = _GLF_FUZZED(false);
                            if (!GLF_live10c3) {
                                ;
                            }
                        }
                        GLF_live4looplimiter0++;
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                {
                                    float GLF_live9limit = _GLF_FUZZED(-3.9);
                                    float GLF_live9ref = _GLF_FUZZED(8.8);
                                    float GLF_live9s = _GLF_FUZZED(float((~(-84968))));
                                    {
                                        int GLF_live9looplimiter0 = 0;
                                        for (int GLF_live9i = 1; GLF_live9i < 800; GLF_live9i++) {
                                            if (GLF_live9looplimiter0 >= 4) {
                                                break;
                                            }
                                            GLF_live9looplimiter0++;
                                            {
                                                if (mod(float(GLF_live9i), GLF_live9ref) <= 0.01) {
                                                    GLF_live9s += 0.2;
                                                }
                                                if (float(GLF_live9i) >= GLF_live9limit) {
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = cos(vec4(465.134, 7603.3932, -6883.9937, 447.488));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_IDENTITY(GLF_live4uv.y -= step(GLF_live4injectionSwitch.y, GLF_live4uv.x), (GLF_live4uv.y -= step(GLF_live4injectionSwitch.y, GLF_live4uv.x)) * 1.0);
                            GLF_live4uv.x -= fract(tanh(GLF_live4uv.x)) / ldexp(_GLF_IDENTITY(GLF_live4injectionSwitch.y, min(_GLF_IDENTITY(GLF_live4injectionSwitch.y, min(GLF_live4injectionSwitch.y, GLF_live4injectionSwitch.y)), _GLF_IDENTITY(GLF_live4injectionSwitch.y, mix(float(GLF_live4injectionSwitch.y), float(_GLF_FUZZED(-6.8)), bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))), findMSB(GLF_live4a));
                            GLF_live4a--;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-5.3, -508.476, 4.6, -6.6);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    } while (GLF_live4a > int(GLF_live4injectionSwitch.x));
                }
            }
        }
    }
    _GLF_struct_replacement_0.i++;
    swap(_GLF_struct_replacement_0.i, h);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-96.46, -2.2, -936.471, -5.3);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    return _GLF_struct_replacement_0.i;
}

vec4 _GLF_outlined_0() {
    return vec4(13.18, -502.093, 11.02, 867.365);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-1596.8038, 8895.4394, 1.6, -57.78);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}

void quicksort() {
    {
        {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_live0_GLF_color;
    }
    int l = 0, h = 9;
    if (_GLF_DEAD(false)) {
        _GLF_color = clamp(vec4(-24.28, -6892.1604, 883.631, -_GLF_IDENTITY(9.8, (false ? _GLF_FUZZED(-8.2) : 9.8))), _GLF_IDENTITY(_GLF_color, _GLF_IDENTITY(vec4(mat3x2(_GLF_color, 1.0, 0.0)), mix(vec4(_GLF_FUZZED(92.26), (vec4(mat3x2(_GLF_color, 1.0, 0.0)))[1], (vec4(mat3x2(_GLF_color, 1.0, 0.0)))[2], _GLF_FUZZED(-6.5)), vec4((vec4(mat3x2(_GLF_color, 1.0, 0.0)))[0], _GLF_FUZZED(2239.6538), _GLF_FUZZED(-9829.8767), (vec4(mat3x2(_GLF_color, 1.0, 0.0)))[3]), bvec4(true, false, false, true)))), vec4(-5.6, 6.0, -_GLF_IDENTITY(525.625, min(525.625, 525.625)), 564.333));
    }
    int stack[10];
    _GLF_struct_10 _GLF_struct_replacement_10 = _GLF_struct_10(_GLF_struct_11(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_12(bvec4(true, true, true, true), -1, mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1u, mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), bvec3(true, true, true)), 1.0, uvec4(1u, 1u, 1u, 1u), 1.0, 1u, 1, _GLF_struct_13(uvec3(1u, 1u, 1u), _GLF_struct_14(1)));
    {
        float GLF_live3c_im = _GLF_FUZZED(2488.4844);
        float GLF_live3c_re = _GLF_FUZZED(-8647.2169);
        {
            vec2 GLF_live7coord = _GLF_FUZZED(vec2(_GLF_IDENTITY(vec4(7.3, 2.0, -1486.6175, -23.32), vec4(0.0, 0.0, 0.0, 0.0) + (vec4(7.3, 2.0, -1486.6175, -23.32)))));
            int GLF_live7i = _GLF_FUZZED(ivec4(-1978, 71610, 77782, 57275).a);
            {
                if (GLF_live7coord.x > 1.0) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mod(vec4(2.2, 1.6, -36.33, 37.12), vec4(84.48, -89.25, 117.857, 23.95));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live7coord.x -= 1.0;
                    {
                        int GLF_live8looplimiter0 = 0;
                        if (GLF_live8looplimiter0 >= 5) {
                            ;
                        }
                    }
                }
                if (GLF_live7coord.y > 1.0)
                    GLF_live7coord.y -= 1.0;
                GLF_live7coord *= 2.0;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-2967.5319, -57.40, 3.0, -7.9);
                    {
                        {
                            ;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_IDENTITY(GLF_live7i++, (_GLF_IDENTITY(GLF_live7i++, (false ? _GLF_FUZZED(h) : (GLF_live7i++)))) >> 0);
                {
                    {
                        vec2 GLF_live8coord = _GLF_FUZZED((+vec2(-3.5, 77.12)));
                        int GLF_live8i = _GLF_FUZZED((~((-35523) + (-78380))));
                        int GLF_live8looplimiter0 = 0;
                        {
                            if (GLF_live8looplimiter0 >= 5) {
                                ;
                            }
                            GLF_live8looplimiter0++;
                            {
                                if (GLF_live8coord.x > 1.0)
                                    GLF_live8coord.x -= 1.0;
                                if (GLF_live8coord.y > 1.0)
                                    GLF_live8coord.y -= 1.0;
                                GLF_live8coord *= 2.0;
                                GLF_live8i++;
                            }
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        vec2 GLF_live8coord = _GLF_FUZZED(vec2((-50.17)));
                        int GLF_live8i = _GLF_FUZZED(int(((mat4x2(-5117.8901, -8.8, -653.214, -5.6, -9.9, 1885.4653, 6.2, 1.7) * 6.2) != mat4x2(-410.754, -58.12, -3.0, 35.49, 2825.6822, 4.5, -816.472, -9760.5393))));
                        {
                            int GLF_live8looplimiter0 = 0;
                            while (GLF_live8i < 1 && GLF_live8coord.x > 1.0 || GLF_live8coord.y > 1.0) {
                                if (GLF_live8looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live8looplimiter0++;
                                {
                                    if (GLF_live8coord.x > 1.0)
                                        GLF_live8coord.x -= 1.0;
                                    if (GLF_live8coord.y > 1.0)
                                        GLF_live8coord.y -= 1.0;
                                    GLF_live8coord *= 2.0;
                                    GLF_live8i++;
                                }
                            }
                        }
                    }
                    _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_outVarBackup_GLF_color = _GLF_color) / vec4(1.0, 1.0, 1.0, 1.0))) / vec4(1.0, 1.0, 1.0, 1.0));
                    _GLF_color = ldexp(vec4(-85.30, -4.2, -4.5, 5096.5231), ivec4(43903, _GLF_IDENTITY(82630, min(82630, _GLF_IDENTITY(82630, ~(~(82630))))), -_GLF_IDENTITY(51949, ~(~(51949))), -41109));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-8.4, -9.4, 0.1, -6.6);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        int GLF_live3iteration = _GLF_FUZZED((93967 - (-98566)));
        int GLF_live3looplimiter0 = 0;
        float GLF_live3x = _GLF_FUZZED((5.3 * (-3163.6729)));
        float GLF_live3y = _GLF_FUZZED(-8.1);
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-8701.2189, acosh(inversesqrt(vec2(-0.2, -2.5))), 5860.6204);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (GLF_live3looplimiter0 >= 6) {
                ;
                if (_GLF_DEAD(false)) {
                    _GLF_color = (GLF_live0_GLF_color / GLF_live6_GLF_color);
                }
            }
            _GLF_IDENTITY(GLF_live3looplimiter0++, 1 * (GLF_live3looplimiter0++));
            {
                if (_GLF_IDENTITY(GLF_live3x * GLF_live3x, (_GLF_IDENTITY(GLF_live3x * GLF_live3x, max(GLF_live3x * GLF_live3x, GLF_live3x * _GLF_IDENTITY(GLF_live3x, max(_GLF_IDENTITY(GLF_live3x, float(mat3(GLF_live3x, 1.0, 1.0, log(1.0), 1.0, 1.0, 1.0, _GLF_ZERO(0.0, injectionSwitch.x), 1.0))), GLF_live3x))))) * 1.0) + GLF_live3y * _GLF_IDENTITY(GLF_live3y, float(mat3x4(GLF_live3y, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, abs(0.0), 0.0))) > 4.0) {
                    {
                        vec2 GLF_live6coord = _GLF_FUZZED(_GLF_IDENTITY((vec2(_GLF_IDENTITY(7060.0337, clamp(7060.0337, 7060.0337, 7060.0337)), -2.7) + vec2(53.41, -861.588)), (false ? _GLF_FUZZED((injectionSwitch * GLF_live3c_re)) : (vec2(_GLF_IDENTITY(7060.0337, clamp(7060.0337, 7060.0337, 7060.0337)), -2.7) + vec2(53.41, -861.588)))));
                        if (GLF_live6coord.y < 0.6) {
                            uvec2 GLF_live6icoord = uvec2(((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / _GLF_IDENTITY(0.4, clamp(_GLF_IDENTITY(0.4, clamp(0.4, _GLF_IDENTITY(0.4, clamp(0.4, 0.4, 0.4)), 0.4)), 0.4, _GLF_IDENTITY(0.4, _GLF_IDENTITY(float(mat2(0.4, 0.0, 1.0, 0.0)), (float(mat2(0.4, 0.0, 1.0, 0.0))) / 1.0)))), 1.0 / 0.6)) * 256.0);
                            uint GLF_live6res1 = uint(((GLF_live6icoord.x * GLF_live6icoord.y) >> (GLF_live6icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_live6res2 = uint(((GLF_live6icoord.x * GLF_live6icoord.y) << (GLF_live6icoord.x & 31u)) & 0xffffffffu);
                            {
                                int GLF_live11c = _GLF_FUZZED(((-21106) - 2163));
                                int GLF_live11looplimiter0 = 0;
                                uint GLF_live11matrix_number = _GLF_FUZZED((6839u * 189831u));
                                int GLF_live11r = _GLF_FUZZED(35738);
                                {
                                    if (GLF_live11looplimiter0 >= 5) {
                                        ;
                                    }
                                    GLF_live11looplimiter0++;
                                    {
                                        switch (GLF_live11matrix_number) {
                                            case 0u:
                                                GLF_live11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                break;
                                            case 1u:
                                                GLF_live11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                break;
                                            case 2u:
                                                GLF_live11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                break;
                                            case 3u:
                                                GLF_live11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                break;
                                            case 4u:
                                                GLF_live11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                break;
                                            case 5u:
                                                GLF_live11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                break;
                                            case 6u:
                                                GLF_live11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                break;
                                            case 7u:
                                                GLF_live11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                break;
                                            case 8u:
                                                GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                break;
                                        }
                                    }
                                }
                            }
                            float GLF_live6res = float(((GLF_live6res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((_GLF_IDENTITY(GLF_live6res1 & 1u, (_GLF_IDENTITY(GLF_live6res1 & 1u, min(_GLF_IDENTITY(GLF_live6res1 & 1u, min(GLF_live6res1 & 1u, GLF_live6res1 & 1u)), GLF_live6res1 & 1u))) - 0u)) != 0u ? 1u : 0u));
                            GLF_live6_GLF_color = vec4(GLF_live6res, GLF_live6res, GLF_live6res, 1.0);
                        } else {
                            ivec2 GLF_live6icoord = ivec2(((GLF_live6coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_live6res3 = ((GLF_live6icoord.x >> 5) & 1) ^ ((GLF_live6icoord.y & 32) >> 5);
                            int GLF_live6res2 = (GLF_live6icoord.y * GLF_live6icoord.y >> 10) & 1;
                            int GLF_live6res1 = (GLF_live6icoord.x * GLF_live6icoord.y >> 9) & 1;
                            GLF_live6_GLF_color = vec4(float(GLF_live6res1 ^ GLF_live6res2), float(GLF_live6res2 & GLF_live6res3), float(GLF_live6res1 | GLF_live6res3), 1.0);
                            {
                                {
                                    ;
                                }
                            }
                        }
                    }
                    ;
                }
                float GLF_live3x_new = GLF_live3x * GLF_live3x - GLF_live3y * GLF_live3y + GLF_live3c_re;
                GLF_live3y = 2.0 * GLF_live3x * _GLF_IDENTITY(GLF_live3y, (GLF_live3y) - 0.0) + GLF_live3c_im;
                {
                    int GLF_live9looplimiter0 = 0;
                    if (GLF_live9looplimiter0 >= 4) {
                        ;
                    }
                }
                GLF_live3x = GLF_live3x_new;
                GLF_live3iteration++;
                {
                    vec2 GLF_live7coord = _GLF_FUZZED(vec2(-6.9, float(false)));
                    vec4 GLF_live7res = _GLF_IDENTITY(_GLF_FUZZED(vec4(-8.8, 973.035, 480.979, _GLF_IDENTITY(-1.3, float(mat2(-1.3, 1.0, 1.0, 1.0))))), (_GLF_FUZZED(vec4(-8.8, 973.035, 480.979, _GLF_IDENTITY(-1.3, float(mat2(-1.3, 1.0, 1.0, 1.0)))))) / vec4(1.0, 1.0, 1.0, 1.0));
                    if (GLF_live7coord.x < 1.0 && GLF_live7coord.y < 1.0) {
                        GLF_live7res = texture(GLF_live7tex, GLF_live7coord);
                    }
                }
            }
        }
    }
    {
        vec2 GLF_live8coord = _GLF_FUZZED(vec2(-83.94, -304.323));
        int GLF_live8i = _GLF_FUZZED(int((20941u < 107975u)));
        {
            int GLF_live8looplimiter0 = 0;
            while (GLF_live8i < 1 && GLF_live8coord.x > 1.0 || GLF_live8coord.y > 1.0) {
                if (GLF_live8looplimiter0 >= 5) {
                    break;
                }
                GLF_live8looplimiter0++;
                {
                    if (GLF_live8coord.x > 1.0)
                        GLF_live8coord.x -= 1.0;
                    if (GLF_live8coord.y > 1.0)
                        GLF_live8coord.y -= 1.0;
                    GLF_live8coord *= 2.0;
                    GLF_live8i++;
                }
            }
        }
    }
    stack[++_GLF_struct_replacement_10._f0._f3.top] = l;
    stack[++_GLF_struct_replacement_10._f0._f3.top] = h;
    {
        vec2 GLF_live8coord = _GLF_FUZZED((vec2(3495.3489, 15.22)));
        int GLF_live8i = _GLF_FUZZED(-7539);
        int GLF_live8looplimiter0 = 0;
        while (GLF_live8i < 1 && GLF_live8coord.x > 1.0 || GLF_live8coord.y > 1.0) {
            if (GLF_live8looplimiter0 >= 5) {
                break;
            }
            GLF_live8looplimiter0++;
            {
                if (GLF_live8coord.x > 1.0)
                    GLF_live8coord.x -= 1.0;
                if (GLF_live8coord.y > 1.0)
                    GLF_live8coord.y -= 1.0;
                GLF_live8coord *= 2.0;
                GLF_live8i++;
            }
        }
    }
    {
        vec3 GLF_live0col = _GLF_FUZZED(vec3(-953.677, -2.7, -11.15));
        _GLF_struct_15 _GLF_struct_replacement_15 = _GLF_struct_15(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, float(_GLF_IDENTITY(mat3x2(1.0, 1.0, 0.0, 0.0, 0.0, 1.0), mat3x2(mat3x4(mat3x2(1.0, 1.0, 0.0, 0.0, 0.0, 1.0)))))), 1.0, 1.0, 1.0), _GLF_struct_16(_GLF_struct_17(1u, uvec3(1u, 1u, 1u), 1, mat2(1.0, 1.0, 1.0, 1.0), ivec2(1, 1), uvec3(1u, 1u, _GLF_IDENTITY(1u, (_GLF_IDENTITY(1u, uint(_GLF_IDENTITY(uvec4(1u, 1u, 0u, 1u), max(uvec4(1u, 1u, 0u, 1u), uvec4(1u, 1u, 0u, 1u)))))) >> 0u))), _GLF_struct_18(1, mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true), uvec2(1u, 1u), _GLF_FUZZED(vec2(9366.5152, -3117.3080)), vec3(1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u))), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1, bvec2(true, true));
        {
            float GLF_live0stripe = GLF_live0compute_stripe(tan((_GLF_struct_replacement_15._f2._f1.GLF_live0uv.x + _GLF_IDENTITY(GLF_live0uv.y, min(_GLF_IDENTITY(GLF_live0uv.y, (_GLF_struct_replacement_15._f2._f1.GLF_live0uv.y) / _GLF_IDENTITY(1.0, max(1.0, 1.0))), _GLF_struct_replacement_15._f2._f1.GLF_live0uv.y))) * 20.0));
            GLF_live0col = _GLF_IDENTITY(mix(vec3(_GLF_struct_replacement_15._f2._f1.GLF_live0uv.x, .8, 0), vec3(1, _GLF_struct_replacement_15._f2._f1.GLF_live0uv.y, 0), _GLF_IDENTITY(GLF_live0stripe, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(599.712) : GLF_live0stripe))), clamp(mix(vec3(_GLF_struct_replacement_15._f2._f1.GLF_live0uv.x, .8, 0), vec3(1, _GLF_struct_replacement_15._f2._f1.GLF_live0uv.y, 0), _GLF_IDENTITY(GLF_live0stripe, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(599.712) : GLF_live0stripe))), _GLF_IDENTITY(mix(vec3(_GLF_struct_replacement_15._f2._f1.GLF_live0uv.x, .8, 0), vec3(1, _GLF_struct_replacement_15._f2._f1.GLF_live0uv.y, 0), _GLF_IDENTITY(GLF_live0stripe, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(599.712) : GLF_live0stripe))), min(mix(vec3(_GLF_struct_replacement_15._f2._f1.GLF_live0uv.x, .8, 0), vec3(1, _GLF_struct_replacement_15._f2._f1.GLF_live0uv.y, 0), _GLF_IDENTITY(GLF_live0stripe, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(599.712) : GLF_live0stripe))), mix(vec3(_GLF_struct_replacement_15._f2._f1.GLF_live0uv.x, .8, 0), vec3(1, _GLF_struct_replacement_15._f2._f1.GLF_live0uv.y, 0), _GLF_IDENTITY(GLF_live0stripe, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(599.712) : GLF_live0stripe))))), mix(vec3(_GLF_struct_replacement_15._f2._f1.GLF_live0uv.x, .8, 0), vec3(1, _GLF_struct_replacement_15._f2._f1.GLF_live0uv.y, 0), _GLF_IDENTITY(GLF_live0stripe, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(599.712) : GLF_live0stripe)))));
            GLF_live0_GLF_color = vec4(GLF_live0col, 1.0);
            ;
        }
    }
    {
        int GLF_live11cols = _GLF_FUZZED((74157 - 66124));
        uint GLF_live11matrix_number = _GLF_FUZZED(110553u);
        {
            int GLF_live11looplimiter2 = 0;
            for (int GLF_live11rows = 2; GLF_live11rows <= 4; GLF_live11rows++) {
                if (GLF_live11looplimiter2 >= 5) {
                    break;
                }
                GLF_live11looplimiter2++;
                {
                    {
                        int GLF_live11looplimiter1 = 0;
                        for (int GLF_live11c = 0; GLF_live11c < GLF_live11cols; GLF_live11c++) {
                            if (GLF_live11looplimiter1 >= 5) {
                                break;
                            }
                            GLF_live11looplimiter1++;
                            {
                                {
                                    int GLF_live11looplimiter0 = 0;
                                    for (int GLF_live11r = 0; GLF_live11r < GLF_live11rows; GLF_live11r++) {
                                        if (GLF_live11looplimiter0 >= 5) {
                                            break;
                                        }
                                        GLF_live11looplimiter0++;
                                        {
                                            switch (GLF_live11matrix_number) {
                                                case 0u:
                                                    GLF_live11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                    break;
                                                case 1u:
                                                    GLF_live11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                    break;
                                                case 2u:
                                                    GLF_live11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                    break;
                                                case 3u:
                                                    GLF_live11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                    break;
                                                case 4u:
                                                    GLF_live11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                    break;
                                                case 5u:
                                                    GLF_live11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                    break;
                                                case 6u:
                                                    GLF_live11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                    break;
                                                case 7u:
                                                    GLF_live11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                    break;
                                                case 8u:
                                                    GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    GLF_live11matrix_number = GLF_live11matrix_number + 1u;
                }
            }
        }
    }
    while (_GLF_struct_replacement_10._f0._f3.top >= 0) {
        h = stack[_GLF_struct_replacement_10._f0._f3.top--];
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, 1.0, 0.0, 0.0)))))) {
            _GLF_color = vec4(-667.432, -7512.8750, 7465.3263, -7.7);
        }
        {
            int GLF_live4a = _GLF_FUZZED(-64104);
            vec2 GLF_live4uv = _GLF_FUZZED(vec2(-7.2, 8931.5273));
            {
                {
                    int GLF_live9i = _GLF_FUZZED(((78225 * (-4062)) ^ 51383));
                    float GLF_live9limit = _GLF_FUZZED(vec4(5.6, -505.544, -418.381, 17.07).q);
                    float GLF_live9ref = _GLF_FUZZED(((-17.51) - 1.7));
                    float GLF_live9s = _GLF_FUZZED((+981.866));
                    {
                        if (mod(float(GLF_live9i), GLF_live9ref) <= 0.01) {
                            GLF_live9s += 0.2;
                        }
                        if (float(GLF_live9i) >= GLF_live9limit) {
                            ;
                        }
                    }
                }
                int GLF_live4looplimiter0 = 0;
                do {
                    if (GLF_live4looplimiter0 >= 6) {
                        break;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = _GLF_IDENTITY(vec4(-3.2, -0.7, 327.884, 7.9), vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_IDENTITY(vec4(-3.2, -0.7, 327.884, 7.9), (vec4(-3.2, -0.7, 327.884, 7.9)) / vec4(1.0, 1.0, 1.0, 1.0))));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec2 GLF_live8coord = _GLF_FUZZED((false ? vec2(2248.5640, -27.76) : vec2(-153.187, -869.003)));
                        if (GLF_live8coord.x > 1.0)
                            GLF_live8coord.x -= 1.0;
                    }
                    GLF_live4looplimiter0++;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = asinh(vec4(-69.52, -6.7, -5916.1508, -0.3));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        GLF_live4uv.y -= step(GLF_live4injectionSwitch.y, GLF_live4uv.x);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = max(vec4(-2.1, -3.9, -1.0, 904.088), -6074.3344);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_live4uv.x -= fract(tanh(GLF_live4uv.x)) / ldexp(GLF_live4injectionSwitch.y, findMSB(GLF_live4a));
                        GLF_live4a--;
                    }
                } while (GLF_live4a > int(GLF_live4injectionSwitch.x));
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live0_GLF_color;
                {
                    {
                        ;
                    }
                }
            }
        }
        l = stack[_GLF_IDENTITY(_GLF_struct_replacement_10._f0._f3.top--, (false ? _GLF_FUZZED(-65885) : _GLF_IDENTITY(_GLF_struct_replacement_10._f0._f3.top--, (_GLF_struct_replacement_10._f0._f3.top--) ^ 0)))];
        _GLF_struct_19 _GLF_struct_replacement_19 = _GLF_struct_19(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec3(true, true, true), performPartition(l, h));
        if (_GLF_struct_replacement_19.p - 1 > l) {
            stack[++_GLF_struct_replacement_10._f0._f3.top] = l;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(26.05, -528.350, 32.30, -532.025);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = _GLF_outlined_0();
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = GLF_live6_GLF_color;
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec2(true, false))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(asinh(81.41), -9553.8795, vec2(-823.516, 8283.2785));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        {
                            int GLF_live10msb8 = _GLF_FUZZED(70986);
                            vec2 GLF_live10pos = _GLF_FUZZED((mat4x2(9.5, -2.8, -8680.3111, 9.5, 223.136, -8078.1185, 1.0, -28.79) * vec4(6.6, -43.65, -441.953, 47.38)));
                            vec3 GLF_live10setting = _GLF_FUZZED(vec3(232.181, -97.01, 8.3));
                            {
                                ;
                            }
                        }
                    }
                }
                {
                    int GLF_live10looplimiter0 = 0;
                    if (GLF_live10looplimiter0 >= 6) {
                        ;
                    }
                }
            }
            stack[++_GLF_struct_replacement_10._f0._f3.top] = _GLF_struct_replacement_19.p - 1;
            {
                bool GLF_live10c1 = _GLF_FUZZED((uvec3(88051u, 88532u, 25966u) == uvec3(uvec2(132972u, 60951u), 196480u)));
                if (!GLF_live10c1) {
                    ;
                }
            }
        }
        if (_GLF_struct_replacement_19.p + 1 < h) {
            stack[++_GLF_struct_replacement_10._f0._f3.top] = _GLF_struct_replacement_19.p + 1;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (vec3(44.15, 6995.9719, 6.1).zxyz + (-20.17));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                {
                    vec3 GLF_live10d = _GLF_FUZZED(vec3(0.1, -4.9, 779.851));
                    if (length(GLF_live10d) <= float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0))) {
                        ;
                    }
                }
            }
            stack[++_GLF_struct_replacement_10._f0._f3.top] = h;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_IDENTITY(_GLF_color = vec4(_GLF_IDENTITY(258.558, min(258.558, _GLF_IDENTITY(258.558, (258.558) - 0.0))), -0.0, -2.1, 5749.7329), (_GLF_color = vec4(_GLF_IDENTITY(258.558, min(258.558, _GLF_IDENTITY(258.558, (258.558) - 0.0))), -0.0, -2.1, 5749.7329)) + vec4(0.0, 0.0, 0.0, 0.0));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_live0_GLF_color;
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(7143.7291, _GLF_IDENTITY(3277.3526, 1.0 * (3277.3526)), -67.37, 28.62);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                {
                    ;
                }
            }
        }
    }
}

vec3 _GLF_outlined_1(vec2 GLF_live0uv, float GLF_live0stripe) {
    return mix(vec3(_GLF_IDENTITY(GLF_live0uv.x, (_GLF_IDENTITY(GLF_live0uv.x, float(mat2(_GLF_IDENTITY(GLF_live0uv.x, 1.0 * (GLF_live0uv.x)), 1.0, 1.0, 0.0)))) / 1.0), 0, 0.75), vec3(.8, .7, GLF_live0uv.x), GLF_live0stripe);
}

vec4 _GLF_outlined_2(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_6() {
    return vec4(acosh(vec3(93.19, 5.3, -1079.3155)), atan(-180.383, 7.4));
}

vec4 _GLF_outlined_7(float GLF_live6res) {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = trunc(vec4(-0.8, -6.5, 87.83, 3559.7859));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(250.742)), float(0.0), bool(true))))))) {
            {
                {
                    ;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    return vec4(GLF_live6res, GLF_live6res, GLF_live6res, 1.0);
}

vec4 _GLF_outlined_8(int GLF_live6res1, int GLF_live6res2, int GLF_live6res3) {
    return vec4(float(GLF_live6res1 ^ GLF_live6res2), float(GLF_live6res2 & _GLF_IDENTITY(GLF_live6res3, int(_GLF_IDENTITY(ivec2(GLF_live6res3, 0), ivec2(ivec4(ivec2(GLF_live6res3, 0), 0, 0)))))), float(GLF_live6res1 | GLF_live6res3), 1.0);
}

int _GLF_outlined_9(int GLF_live4m) {
    return GLF_live4m - 1;
}

vec4 _GLF_outlined_10(float GLF_live6res) {
    return vec4(GLF_live6res, _GLF_IDENTITY(GLF_live6res, clamp(GLF_live6res, GLF_live6res, GLF_live6res)), GLF_live6res, 1.0);
    {
        {
            float GLF_live9s = _GLF_FUZZED(vec3(281.674, -8706.7002, 216.911).z);
            {
                GLF_live9s += 0.2;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            {
                ;
            }
        }
        _GLF_color = vec4(-819.756, -2699.9570, 3.2, 7.8);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}

void main() {
    for (int i = 0; i < 10; _GLF_IDENTITY(i++, ~(~(_GLF_IDENTITY(i++, (_GLF_IDENTITY(i++, ~(~(i++)))) / 1))))) {
        obj.numbers[i] = (10 - i);
        obj.numbers[i] = obj.numbers[i] * obj.numbers[_GLF_IDENTITY(i, min(_GLF_IDENTITY(i, min(i, i)), _GLF_IDENTITY(i, (i) << 0)))];
    }
    {
        int GLF_live2i = _GLF_FUZZED(-_GLF_IDENTITY(_GLF_IDENTITY(84210, max(84210, 84210)), (_GLF_IDENTITY(_GLF_IDENTITY(84210, max(84210, 84210)), max(_GLF_IDENTITY(_GLF_IDENTITY(84210, max(84210, 84210)), (false ? _GLF_FUZZED(-66934) : _GLF_IDENTITY(84210, max(84210, 84210)))), _GLF_IDENTITY(84210, max(84210, 84210))))) - (0 ^ 0)));
        int GLF_live2j = _GLF_FUZZED(ivec2(-83621, -39401).g);
        uint GLF_live2uselessOutVariable = _GLF_FUZZED(_GLF_IDENTITY(157621u, (false ? _GLF_FUZZED(148410u) : _GLF_IDENTITY(157621u, ~(~(_GLF_IDENTITY(157621u, clamp(157621u, _GLF_IDENTITY(157621u, (157621u) | (157621u)), 157621u))))))));
        if (uint(GLF_live2j) < uaddCarry(uint(_GLF_IDENTITY(GLF_live2i, ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6))) * (GLF_live2i))), 1u, GLF_live2uselessOutVariable)) {
            {
                {
                    ;
                }
            }
            ;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = dFdxFine(vec4(6465.4340, 99.02, -367.323, 881.357));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    {
        int GLF_live11looplimiter1 = 0;
        if (GLF_live11looplimiter1 >= 5) {
            ;
        }
    }
    {
        vec2 GLF_live7coord = _GLF_FUZZED(((vec2(-3.7, 50.90) - vec2(969.929, 899.748)) * vec2(-12.18, -99.53)));
        int GLF_live7i = _GLF_FUZZED((1132 ^ 84384));
        {
            int GLF_live9i = _GLF_FUZZED(((-8974) ^ 47425));
            float GLF_live9limit = _GLF_FUZZED((mat4x3(-2558.8819, 2231.6941, -5.6, 2.1, -4502.6158, 4369.3193, 3.5, -7.4, -924.885, 8.1, 18.86, 89.53) * (false ? vec4(29.87, -1.6, 7.1, -2.0) : vec4(-2746.5683, -5.2, -369.701, 8.6))).b);
            int GLF_live9looplimiter0 = 0;
            float GLF_live9ref = _GLF_FUZZED(4.3);
            float GLF_live9s = _GLF_FUZZED(5978.0771);
            {
                if (GLF_live9looplimiter0 >= 4) {
                    ;
                }
                GLF_live9looplimiter0++;
                {
                    if (mod(float(GLF_live9i), GLF_live9ref) <= 0.01) {
                        GLF_live9s += 0.2;
                    }
                    if (float(GLF_live9i) >= GLF_live9limit) {
                        ;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = unpackSnorm4x8(148054u);
        }
        int GLF_live7looplimiter0 = 0;
        {
            vec2 GLF_live8coord = _GLF_FUZZED(vec2((-vec3(7213.2438, 1697.7725, 67.35))));
            int GLF_live8i = _GLF_FUZZED(-10347);
            {
                if (GLF_live8coord.x > 1.0)
                    GLF_live8coord.x -= 1.0;
                if (GLF_live8coord.y > 1.0)
                    GLF_live8coord.y -= 1.0;
                GLF_live8coord *= 2.0;
                GLF_live8i++;
            }
        }
        {
            if (GLF_live7looplimiter0 >= 4) {
                ;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = intBitsToFloat(ivec4(10192, 85991, -97608, 98776));
                    {
                        int GLF_live11looplimiter4 = 0;
                        if (GLF_live11looplimiter4 >= 5) {
                            ;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            GLF_live7looplimiter0++;
            {
                if (_GLF_IDENTITY(_GLF_IDENTITY(GLF_live7coord.x, clamp(GLF_live7coord.x, GLF_live7coord.x, GLF_live7coord.x)) > 1.0, (_GLF_IDENTITY(GLF_live7coord.x, clamp(GLF_live7coord.x, GLF_live7coord.x, GLF_live7coord.x)) > 1.0) || false))
                    GLF_live7coord.x -= 1.0;
                if (_GLF_IDENTITY(GLF_live7coord.y, (_GLF_IDENTITY(GLF_live7coord.y, min(GLF_live7coord.y, GLF_live7coord.y))) - 0.0) > 1.0)
                    GLF_live7coord.y -= _GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(7.8) : 1.0));
                GLF_live7coord *= 2.0;
                GLF_live7i++;
            }
        }
    }
    quicksort();
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            vec2 GLF_live6coord = _GLF_FUZZED(vec2(-1.1, 531.862));
            {
                ivec2 GLF_live6icoord = ivec2(_GLF_IDENTITY(((GLF_live6coord - vec2(0.4, 0.0)) * vec2(_GLF_IDENTITY(1.0, 1.0 * (1.0)) / 0.6, 1.0)) * 256.0, max(((GLF_live6coord - vec2(0.4, 0.0)) * vec2(_GLF_IDENTITY(1.0, 1.0 * (1.0)) / 0.6, 1.0)) * 256.0, ((GLF_live6coord - vec2(0.4, 0.0)) * vec2(_GLF_IDENTITY(1.0, 1.0 * (1.0)) / 0.6, 1.0)) * 256.0)));
                int GLF_live6v = (GLF_live6icoord.x ^ GLF_live6icoord.y) * GLF_live6icoord.y;
                bool GLF_live6res1 = ((GLF_live6v >> 10) & 1) != 0;
                {
                    vec4 GLF_live9c = _GLF_FUZZED(vec4(-8.0, -0.4, -631.378, -0.5));
                    {
                        int GLF_live9looplimiter1 = 0;
                        for (int GLF_live9i = 0; GLF_live9i < 3; GLF_live9i++) {
                            if (GLF_live9looplimiter1 >= 4) {
                                break;
                            }
                            GLF_live9looplimiter1++;
                            {
                                if (GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] >= 1.0) {
                                    GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] = GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] * GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)];
                                }
                            }
                        }
                    }
                }
                bool GLF_live6res2 = ((GLF_live6v >> 11) & 4) != 0;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                {
                    int GLF_live11cols = _GLF_FUZZED((10080));
                    uint GLF_live11matrix_number = _GLF_FUZZED(((157306u ^ uvec3(35064u, 191562u, 172583u)).z));
                    {
                        int GLF_live11looplimiter2 = 0;
                        for (int GLF_live11rows = 2; GLF_live11rows <= 4; GLF_live11rows++) {
                            if (GLF_live11looplimiter2 >= 5) {
                                break;
                            }
                            GLF_live11looplimiter2++;
                            {
                                {
                                    int GLF_live11looplimiter1 = 0;
                                    for (int GLF_live11c = 0; GLF_live11c < GLF_live11cols; GLF_live11c++) {
                                        if (GLF_live11looplimiter1 >= 5) {
                                            break;
                                        }
                                        GLF_live11looplimiter1++;
                                        {
                                            {
                                                int GLF_live11looplimiter0 = 0;
                                                for (int GLF_live11r = 0; GLF_live11r < GLF_live11rows; GLF_live11r++) {
                                                    if (GLF_live11looplimiter0 >= 5) {
                                                        break;
                                                    }
                                                    GLF_live11looplimiter0++;
                                                    {
                                                        switch (GLF_live11matrix_number) {
                                                            case 0u:
                                                                GLF_live11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                break;
                                                            case 1u:
                                                                GLF_live11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                break;
                                                            case 2u:
                                                                GLF_live11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                break;
                                                            case 3u:
                                                                GLF_live11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                break;
                                                            case 4u:
                                                                GLF_live11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                break;
                                                            case 5u:
                                                                GLF_live11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                break;
                                                            case 6u:
                                                                GLF_live11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                break;
                                                            case 7u:
                                                                GLF_live11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                break;
                                                            case 8u:
                                                                GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                GLF_live11matrix_number = GLF_live11matrix_number + 1u;
                            }
                        }
                    }
                }
                bool GLF_live6res3 = ((GLF_live6v >> 12) & 8) != 0;
                GLF_live6_GLF_color = vec4(GLF_live6res1 ? 1.0 : 0.0, GLF_live6res2 ? 1.0 : 0.0, GLF_live6res3 ? 1.0 : 0.0, 1);
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                _GLF_color = GLF_live0_GLF_color;
            }
            _GLF_color = step(-2209.7342, step(normalize(vec4(_GLF_IDENTITY(86.43, 1.0 * (86.43)), 1.4, -6511.0391, -63.45)), _GLF_color));
        }
        _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, (_GLF_color) - vec4(0.0, 0.0, 0.0, 0.0));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                {
                    ;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(8659.9010, -8.6, 1988.1962, -9.6);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = mat4(-1144.4704, 8542.1288, -89.41, 2357.8964, -4.7, -9.3, 8237.3079, _GLF_IDENTITY(9.6, max(9.6, _GLF_IDENTITY(9.6, float(mat4x3(9.6, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, sqrt(0.0), 1.0, 1.0, 1.0, 1.0))))), -9.5, -43.86, -53.03, 8147.4094, 11.22, _GLF_IDENTITY(-19.66, mix(float(_GLF_FUZZED(14.92)), float(_GLF_IDENTITY(-19.66, mix(float(_GLF_FUZZED((4000.6878))), float(-19.66), bool(true)))), bool(true))), _GLF_IDENTITY(-60.72, (false ? _GLF_FUZZED(determinant(mat4(0.1, 3.4, 9069.9267, 5178.4130, -4.9, 906.469, -3076.9803, -66.73, 30.62, 6195.5775, 7890.9304, 9788.8901, 6.5, 55.34, -43.02, 95.34))) : _GLF_IDENTITY(-60.72, mix(float(_GLF_IDENTITY(-60.72, float(vec4(-60.72, 0.0, 1.0, 1.0)))), float(_GLF_FUZZED(1.5)), bool(false))))), -2266.2926)[2];
            }
            float GLF_live3c_im = _GLF_FUZZED(-9106.5543);
            float GLF_live3c_re = _GLF_FUZZED(489.507);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, min(_GLF_color, _GLF_IDENTITY(_GLF_color, vec4(_GLF_color[0], _GLF_color[1], _GLF_color[2], _GLF_color[3]))));
                _GLF_color = vec4(-6.8, -5.7, 795.330, 4.0);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))), (_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x)))) && true))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                {
                    uint GLF_live11matrix_number = _GLF_FUZZED((148929u - 111170u));
                    {
                        int GLF_live11looplimiter3 = 0;
                        for (int GLF_live11cols = 2; GLF_live11cols <= 4; GLF_live11cols++) {
                            if (GLF_live11looplimiter3 >= 5) {
                                break;
                            }
                            GLF_live11looplimiter3++;
                            {
                                {
                                    int GLF_live11looplimiter2 = 0;
                                    for (int GLF_live11rows = 2; GLF_live11rows <= 4; GLF_live11rows++) {
                                        if (GLF_live11looplimiter2 >= 5) {
                                            break;
                                        }
                                        GLF_live11looplimiter2++;
                                        {
                                            {
                                                int GLF_live11looplimiter1 = 0;
                                                for (int GLF_live11c = 0; GLF_live11c < GLF_live11cols; GLF_live11c++) {
                                                    if (GLF_live11looplimiter1 >= 5) {
                                                        break;
                                                    }
                                                    GLF_live11looplimiter1++;
                                                    {
                                                        {
                                                            int GLF_live11looplimiter0 = 0;
                                                            for (int GLF_live11r = 0; GLF_live11r < GLF_live11rows; GLF_live11r++) {
                                                                if (GLF_live11looplimiter0 >= 5) {
                                                                    break;
                                                                }
                                                                GLF_live11looplimiter0++;
                                                                {
                                                                    switch (GLF_live11matrix_number) {
                                                                        case 0u:
                                                                            GLF_live11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                            break;
                                                                        case 1u:
                                                                            GLF_live11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                            break;
                                                                        case 2u:
                                                                            GLF_live11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                            break;
                                                                        case 3u:
                                                                            GLF_live11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                            break;
                                                                        case 4u:
                                                                            GLF_live11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                            break;
                                                                        case 5u:
                                                                            GLF_live11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                            break;
                                                                        case 6u:
                                                                            GLF_live11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                            break;
                                                                        case 7u:
                                                                            GLF_live11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                            break;
                                                                        case 8u:
                                                                            GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                            break;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_live11matrix_number = GLF_live11matrix_number + 1u;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            _GLF_struct_20 _GLF_struct_replacement_20 = _GLF_struct_20(bvec4(true, true, true, true), uvec3(1u, 1u, 1u), _GLF_FUZZED((_GLF_IDENTITY(((-75.54) < (-6.9)) ? _GLF_IDENTITY((_GLF_IDENTITY(-7091, (-7091) >> 0)), (_GLF_IDENTITY((_GLF_IDENTITY(-7091, (-7091) >> 0)), ((_GLF_IDENTITY(-7091, (-7091) >> 0))) << 0)) / 1) : 12719, (_GLF_IDENTITY(((-75.54) < (-6.9)) ? _GLF_IDENTITY((_GLF_IDENTITY(-7091, (-7091) >> 0)), (_GLF_IDENTITY((_GLF_IDENTITY(-7091, (-7091) >> 0)), ((_GLF_IDENTITY(-7091, (-7091) >> 0))) << 0)) / 1) : 12719, (((-75.54) < (-6.9)) ? _GLF_IDENTITY((_GLF_IDENTITY(-7091, (-7091) >> 0)), (_GLF_IDENTITY((_GLF_IDENTITY(-7091, (-7091) >> 0)), ((_GLF_IDENTITY(-7091, (-7091) >> 0))) << 0)) / 1) : 12719) >> 0)) / 1))), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_21(_GLF_struct_22(ivec2(1, 1), ivec3(1, 1, 1), _GLF_IDENTITY(vec2(1.0, 1.0), vec2(mat2(vec2(1.0, 1.0), 0.0, 0.0))), bvec3(true, true, _GLF_IDENTITY(true, bool(bvec3(true, true, false)))), vec2(1.0, _GLF_IDENTITY(1.0, max(1.0, _GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(GLF_live3c_im) : 1.0))))), bvec3(_GLF_IDENTITY(true, true && (true)), true, true), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), _GLF_IDENTITY(uvec2(1u, 1u), min(uvec2(1u, 1u), _GLF_IDENTITY(uvec2(1u, 1u), max(uvec2(1u, 1u), uvec2(1u, 1u))))), mat2(1.0, 1.0, 1.0, 1.0));
            int GLF_live3looplimiter0 = 0;
            {
                {
                    ;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-462.605, 679.025, 1.9, -724.962);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            float GLF_live3x = _GLF_FUZZED(-969.218);
            float GLF_live3y = _GLF_FUZZED(-5188.8260);
            {
                vec2 GLF_live7coord = _GLF_FUZZED(((-93.69) + vec2(1.1, -8.5)));
                vec4 GLF_live7res = _GLF_IDENTITY(_GLF_FUZZED(vec4(28.13, 16.14, -163.416, -894.787)), max(_GLF_IDENTITY(_GLF_FUZZED(vec4(28.13, 16.14, -163.416, -894.787)), clamp(_GLF_FUZZED(vec4(28.13, 16.14, -163.416, -894.787)), _GLF_FUZZED(vec4(28.13, 16.14, -163.416, -894.787)), _GLF_FUZZED(vec4(28.13, 16.14, -163.416, -894.787)))), _GLF_IDENTITY(_GLF_FUZZED(vec4(28.13, 16.14, -163.416, -894.787)), clamp(_GLF_FUZZED(vec4(28.13, 16.14, -163.416, -894.787)), _GLF_FUZZED(vec4(28.13, 16.14, -163.416, -894.787)), _GLF_IDENTITY(_GLF_FUZZED(vec4(28.13, 16.14, -163.416, -894.787)), (_GLF_FUZZED(vec4(28.13, 16.14, -163.416, -894.787))) / vec4(1.0, 1.0, 1.0, 1.0))))));
                if (GLF_live7coord.x < 1.0 && GLF_live7coord.y < 1.0) {
                    GLF_live7res = texture(GLF_live7tex, GLF_live7coord);
                }
            }
            {
                if (GLF_live3looplimiter0 >= 6) {
                    ;
                }
                {
                    vec2 GLF_live10center = _GLF_FUZZED(vec3(-808.468, -5.0, -853.101).bb);
                    int GLF_live10i = _GLF_FUZZED(int(((-74949) >= (-4058))));
                    int GLF_live10msb8 = _GLF_FUZZED(((-56013) * ((-11600) | (-54651))));
                    vec2 GLF_live10position = _GLF_FUZZED(((mat2(-3.2, -81.48, 24.94, -0.5) * 940.645) * vec2(4453.2445, 9.0)));
                    vec3 GLF_live10result = _GLF_FUZZED(((true ? vec3(-389.725, -502.520, -632.727) : vec3(4341.9477, -22.52, 6709.1399)) * vec3(67.76, -3871.2215, 1.2)));
                    {
                        vec3 GLF_live10d = _GLF_FUZZED((vec4(978.231, -6285.9547, 72.17, -0.9) * mat3x4(43.13, 437.273, -5.8, 4512.8907, 4.0, -34.87, -72.53, -416.876, 2812.4812, 8.2, 847.864, -9.1)));
                        GLF_live10d = GLF_live10drawShape(GLF_live10position, GLF_live10center + vec2(sin(float(GLF_live10i) / (float(bitCount(GLF_live10msb8)) * 10.0) + GLF_live10time) / 4.0 * float(bitCount(GLF_live10msb8)), float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live10i) / 100.0 * float(bitCount(GLF_live10msb8))), 0.01, float(GLF_live10i)));
                        if (length(GLF_live10d) <= float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0))) {
                            ;
                        }
                        GLF_live10result = vec3(GLF_live10d);
                    }
                }
                GLF_live3looplimiter0++;
                {
                    if (GLF_live3x * GLF_live3x + GLF_live3y * _GLF_IDENTITY(GLF_live3y, max(_GLF_IDENTITY(GLF_live3y, (_GLF_IDENTITY(GLF_live3y, clamp(GLF_live3y, GLF_live3y, GLF_live3y))) / 1.0), _GLF_IDENTITY(GLF_live3y, max(_GLF_IDENTITY(GLF_live3y, clamp(GLF_live3y, GLF_live3y, GLF_live3y)), _GLF_IDENTITY(GLF_live3y, float(vec2(_GLF_IDENTITY(GLF_live3y, (false ? _GLF_FUZZED(GLF_live3y) : GLF_live3y)), 0.0))))))) > 4.0) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                int GLF_live5looplimiter1 = 0;
                                if (GLF_live5looplimiter1 >= 5) {
                                    ;
                                }
                            }
                            _GLF_color = unpackSnorm4x8((24445u + 70646u));
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = max(_GLF_color, round(_GLF_outVarBackup_GLF_color));
                        }
                        ;
                    }
                    float GLF_live3x_new = _GLF_IDENTITY(GLF_live3x * GLF_live3x - GLF_live3y * GLF_live3y + GLF_live3c_re, mix(float(GLF_live3x * GLF_live3x - GLF_live3y * GLF_live3y + GLF_live3c_re), float(_GLF_FUZZED(vec3(-29.40, 424.332, 5.1).rrrb.a)), bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))));
                    GLF_live3y = _GLF_IDENTITY(2.0 * GLF_live3x * GLF_live3y + GLF_live3c_im, (_GLF_IDENTITY(2.0 * GLF_live3x * GLF_live3y + GLF_live3c_im, max(_GLF_IDENTITY(2.0 * GLF_live3x * GLF_live3y, clamp(_GLF_IDENTITY(2.0 * GLF_live3x * GLF_live3y, (_GLF_IDENTITY(2.0 * GLF_live3x * GLF_live3y, float(mat4x2(2.0 * GLF_live3x * GLF_live3y, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0)))) + 0.0), 2.0 * GLF_live3x * GLF_live3y, 2.0 * GLF_live3x * GLF_live3y)) + GLF_live3c_im, 2.0 * GLF_live3x * GLF_live3y + GLF_live3c_im))) / 1.0);
                    GLF_live3x = GLF_live3x_new;
                    _GLF_IDENTITY(GLF_live3iteration++, (_GLF_IDENTITY(GLF_live3iteration++, ~(~(_GLF_struct_replacement_20.GLF_live3iteration++)))) - int(_GLF_ZERO(0.0, injectionSwitch.x)));
                    {
                        int GLF_live4a = _GLF_FUZZED(int(116284u));
                        int GLF_live4b = _GLF_FUZZED((23469 * 44044));
                        int GLF_live4c = _GLF_FUZZED((~(-71631)));
                        vec2 GLF_live4uv = _GLF_FUZZED(vec2(60.64, -7.8));
                        {
                            GLF_live4uv.y -= step(GLF_live4injectionSwitch.y, GLF_live4uv.x) + float(GLF_live4a) + float(_GLF_IDENTITY(GLF_live4b, (GLF_live4b) << 0));
                            {
                                {
                                    ;
                                }
                            }
                            GLF_live4uv.x += ldexp(GLF_live4injectionSwitch.y, isinf(GLF_live4uv.y + GLF_live4uv.x) ? findMSB(GLF_live4b) : findMSB(GLF_live4a));
                            GLF_live4c--;
                            {
                                vec4 GLF_live9c = _GLF_FUZZED(vec4(7.1, 9.4, 6.7, 111.398));
                                int GLF_live9i = _GLF_FUZZED(-16638);
                                {
                                    GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] = GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] * GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)];
                                }
                            }
                        }
                    }
                }
            }
        }
        _GLF_color = vec4(-_GLF_IDENTITY(6980.7813, _GLF_IDENTITY(clamp(6980.7813, _GLF_IDENTITY(6980.7813, float(mat2x3(6980.7813, 1.0, _GLF_IDENTITY(0.0, (_GLF_IDENTITY(0.0, 0.0 + (_GLF_IDENTITY(0.0, max(0.0, 0.0))))) / 1.0), 1.0, 1.0, 0.0))), _GLF_IDENTITY(6980.7813, float(vec2(_GLF_IDENTITY(6980.7813, max(6980.7813, 6980.7813)), 0.0)))), (clamp(6980.7813, _GLF_IDENTITY(6980.7813, float(mat2x3(6980.7813, 1.0, _GLF_IDENTITY(0.0, (_GLF_IDENTITY(0.0, 0.0 + (_GLF_IDENTITY(0.0, max(0.0, 0.0))))) / 1.0), 1.0, 1.0, 0.0))), _GLF_IDENTITY(6980.7813, float(vec2(_GLF_IDENTITY(6980.7813, max(6980.7813, 6980.7813)), 0.0))))) + 0.0)), 7998.0253, 6.0, 34.62);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        {
            {
                ;
            }
        }
    }
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 color = vec3(1.0, 2.0, 3.0);
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = radians(vec4(6.1, 4127.5441, _GLF_IDENTITY(1.4, float(mat4(1.4, 1.0, 0.0, 1.0, determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, sin(0.0), log(1.0), round(length(normalize(vec3(1.0, 1.0, 1.0)))), determinant(mat3(1.0, 0.0, 0.0, 1.0, 1.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0)), dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0))), 0.0, 1.0, determinant(mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0)))), 1.0, round(length(normalize(vec3(1.0, 1.0, 1.0)))), 1.0, abs(1.0), 1.0, _GLF_IDENTITY(dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0)), dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0)))))), -94.64));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    bool GLF_live10c6 = _GLF_FUZZED((false || false));
                    int GLF_live10msb8 = _GLF_FUZZED(62355);
                    vec2 GLF_live10pos = _GLF_FUZZED(vec2(((-8367.6206) - (-5.2))));
                    vec3 GLF_live10setting = _GLF_FUZZED(vec3(-4139.9187, -6.9, -5.3));
                    if (!GLF_live10c6) {
                        ;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, _GLF_IDENTITY((gl_FragCoord.x >= 0.0), !(!(_GLF_IDENTITY((gl_FragCoord.x >= 0.0), _GLF_IDENTITY(bool(bvec2((gl_FragCoord.x >= 0.0), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))), (bool(bvec2((gl_FragCoord.x >= 0.0), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))) && true)))))), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (_GLF_IDENTITY(_GLF_TRUE(true, _GLF_IDENTITY((gl_FragCoord.x >= 0.0), !(!(_GLF_IDENTITY((gl_FragCoord.x >= 0.0), _GLF_IDENTITY(bool(bvec2((gl_FragCoord.x >= 0.0), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))), (bool(bvec2((gl_FragCoord.x >= 0.0), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))) && true)))))), (_GLF_TRUE(true, _GLF_IDENTITY((gl_FragCoord.x >= 0.0), !(!(_GLF_IDENTITY((gl_FragCoord.x >= 0.0), _GLF_IDENTITY(bool(bvec2((gl_FragCoord.x >= 0.0), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))), (bool(bvec2((gl_FragCoord.x >= 0.0), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))) && true))))))) || false))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        vec2 GLF_live6coord = _GLF_FUZZED((vec3(283.469, 4.4, -4.8) * mat2x3(211.115, -5.9, 408.159, 9.5, -5022.1837, 3.2)));
        {
            uvec2 GLF_live6icoord = uvec2((_GLF_IDENTITY((GLF_live6coord - vec2(0.4, 0.0)), mix(vec2(_GLF_FUZZED(623.881), ((GLF_live6coord - vec2(0.4, 0.0)))[1]), vec2(_GLF_IDENTITY(((GLF_live6coord - vec2(0.4, 0.0)))[0], clamp(((GLF_live6coord - vec2(0.4, 0.0)))[0], ((GLF_live6coord - vec2(0.4, 0.0)))[0], ((GLF_live6coord - vec2(0.4, 0.0)))[0])), _GLF_FUZZED(-2286.7002)), bvec2(true, false))) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
            uint GLF_live6res1 = uint((_GLF_IDENTITY((GLF_live6icoord.x * GLF_live6icoord.y), ((GLF_live6icoord.x * GLF_live6icoord.y)) | ((GLF_live6icoord.x * GLF_live6icoord.y))) >> (GLF_live6icoord.x & 31u)) & 0xffffffffu);
            uint GLF_live6res2 = uint(((GLF_live6icoord.x * GLF_live6icoord.y) << (GLF_live6icoord.x & 31u)) & 0xffffffffu);
            float GLF_live6res = float(((GLF_live6res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live6res1 & 1u) != 0u ? 1u : 0u));
            GLF_live6_GLF_color = vec4(GLF_live6res, GLF_live6res, GLF_live6res, 1.0);
        }
    }
    _GLF_IDENTITY(color.x += float(obj.numbers[_GLF_IDENTITY(0, clamp(0, 0, 0))]), (_GLF_IDENTITY(color.x += float(obj.numbers[_GLF_IDENTITY(0, clamp(0, 0, 0))]), (color.x += float(obj.numbers[_GLF_IDENTITY(0, clamp(0, 0, 0))])) + 0.0)) / 1.0);
    {
        vec3 GLF_live0col = _GLF_FUZZED(vec3(77.51, 1.5, 7.6));
        vec2 GLF_live0uv = _GLF_FUZZED((vec2(554.850, -4.6) - _GLF_IDENTITY(64.05, mix(float(_GLF_FUZZED(-3.4)), float(64.05), bool(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))));
        {
            float GLF_live0stripe = GLF_live0compute_stripe(cos((GLF_live0uv.x + _GLF_IDENTITY(GLF_live0uv, clamp(GLF_live0uv, GLF_live0uv, GLF_live0uv)).y) * 20.0));
            GLF_live0col = _GLF_outlined_1(GLF_live0uv, GLF_live0stripe);
            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])).x < 0.0)))) {
                _GLF_color = GLF_live6_GLF_color.zzyw;
            }
            {
                vec2 GLF_live7coord = _GLF_FUZZED(vec2(8787.1376, _GLF_IDENTITY(0.4, clamp(_GLF_IDENTITY(0.4, float(mat3x4(_GLF_IDENTITY(0.4, mix(float(_GLF_FUZZED(4.0)), float(0.4), bool(true))), 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, sin(0.0), 1.0, 1.0, exp(0.0), 1.0))), 0.4, 0.4))));
                vec4 GLF_live7res = _GLF_FUZZED(((vec3(-_GLF_IDENTITY(9790.8614, (9790.8614) / 1.0), -1.5, -875.415) * (-1112.0077)) * mat2x3(1737.5049, 89.82, 321.418, -693.067, 2405.9187, -8.3)).xyyx);
                {
                    {
                        vec2 GLF_live8coord = _GLF_FUZZED((vec2(-37.04, 5.2) * mat2(-4.5, 270.053, 0.8, 892.744)));
                        int GLF_live8i = _GLF_FUZZED(48742);
                        int GLF_live8looplimiter0 = 0;
                        {
                            if (GLF_live8looplimiter0 >= 5) {
                                ;
                            }
                            GLF_live8looplimiter0++;
                            {
                                if (GLF_live8coord.x > 1.0)
                                    GLF_live8coord.x -= 1.0;
                                if (GLF_live8coord.y > 1.0)
                                    GLF_live8coord.y -= 1.0;
                                GLF_live8coord *= 2.0;
                                GLF_live8i++;
                            }
                        }
                    }
                    GLF_live7res = texture(GLF_live7tex, GLF_live7coord);
                }
            }
            GLF_live0_GLF_color = vec4(GLF_live0col, 1.0);
            ;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (vec4(938.346, -1.3, 7932.2791, 0.0) + roundEven(95.22));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, (_GLF_color) + vec4(0.0, 0.0, 0.0, 0.0));
        {
            {
                vec2 GLF_live8coord = _GLF_FUZZED(vec2(-198.794, 3278.6235));
                int GLF_live8i = _GLF_FUZZED(((-81277) | ((-99962) & (-38878))));
                int GLF_live8looplimiter0 = 0;
                {
                    if (GLF_live8looplimiter0 >= 5) {
                        ;
                    }
                    GLF_live8looplimiter0++;
                    {
                        if (GLF_live8coord.x > 1.0)
                            GLF_live8coord.x -= 1.0;
                        if (GLF_live8coord.y > 1.0)
                            GLF_live8coord.y -= 1.0;
                        GLF_live8coord *= 2.0;
                        GLF_live8i++;
                    }
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(max(length(vec4(-5.1, 6.9, 77.57, 6.0)), -818.645), log(vec2(-8.0, 8.7)), distance(7.1, 96.77));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(4982.2943, 5.2, 105.171, 6289.4960);
                    {
                        float GLF_live9s = _GLF_FUZZED(7.1);
                        {
                            ;
                        }
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_color = vec4(-4.2, _GLF_IDENTITY(922.328, max(922.328, 922.328)), -8.4, 4.8);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(-82.18)), float(0.0), bool(true))))), (_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(-82.18)), float(0.0), bool(true)))))) || false))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (uv.x > (1.0 / 4.0)) {
        color.x += float(obj.numbers[_GLF_IDENTITY(1, (false ? _GLF_FUZZED(-45940) : 1))]);
        {
            {
                {
                    GLF_live11_GLF_color = vec4(vec3(0.0), 1.0);
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = step(vec4(1.8, -6.1, -6.3, 7588.8074), vec4(42.90, -540.171, 617.835, 18.29));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(_GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0)), dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0))), clamp(_GLF_IDENTITY(_GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0)), dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0))), max(_GLF_IDENTITY(_GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0)), dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0))), (_GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0)), dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0)))) / 1.0), _GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0)), dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0))))), _GLF_IDENTITY(_GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0)), dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0))), float(mat3(_GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0)), dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0))), 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0))), _GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0)), dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(_GLF_ONE(1.0, injectionSwitch.y), sin(0.0), 0.0, 0.0))))))))) {
                {
                    int GLF_live8looplimiter0 = 0;
                    if (GLF_live8looplimiter0 >= 5) {
                        ;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_outlined_2(_GLF_color);
            _GLF_color = vec4(-92.54, -186.502, 5704.0653, 4.1);
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = (dFdx(_GLF_outVarBackup_GLF_color) * vec4(631.443, -6585.3794, -7962.4694, 937.828));
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(6448.6774, 0.6, -4.3, 65.51);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x, float(mat3x4(injectionSwitch.x, determinant(mat4(1.0, 0.0, _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))), 0.0, 0.0, 1.0, 0.0, _GLF_IDENTITY(0.0, (0.0) + 0.0), 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0)), determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0))) < injectionSwitch.y)))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        vec2 GLF_live8coord = _GLF_FUZZED((vec2(7.5, -17.24)));
                        if (GLF_live8coord.x > 1.0)
                            GLF_live8coord.x -= 1.0;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = mix(vec4(13.11, -343.916, -1158.2416, 2.9), _GLF_IDENTITY(vec4(3333.1479, -88.26, -8339.7235, 5406.9734), min(_GLF_IDENTITY(vec4(3333.1479, -88.26, -8339.7235, 5406.9734), (vec4(3333.1479, -88.26, -8339.7235, 5406.9734)) * vec4(1.0, 1.0, 1.0, 1.0)), vec4(3333.1479, -88.26, -8339.7235, 5406.9734))), vec4(-39.81, -1040.5541, 8.6, -976.907));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                    _GLF_color = _GLF_outlined_6();
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    {
                        vec2 GLF_live8coord = _GLF_FUZZED(vec2(21.09, -477.185));
                        int GLF_live8i = _GLF_FUZZED(82252);
                        {
                            int GLF_live8looplimiter0 = 0;
                            while (GLF_live8i < 1 && GLF_live8coord.x > 1.0 || GLF_live8coord.y > 1.0) {
                                if (GLF_live8looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live8looplimiter0++;
                                {
                                    if (GLF_live8coord.x > 1.0)
                                        GLF_live8coord.x -= 1.0;
                                    if (GLF_live8coord.y > 1.0)
                                        GLF_live8coord.y -= 1.0;
                                    GLF_live8coord *= 2.0;
                                    GLF_live8i++;
                                }
                            }
                        }
                    }
                    vec2 GLF_live6coord = _GLF_FUZZED((mat2(-6.8, 3880.0111, 78.50, 1681.2056) * vec2(5.6, 3.8)));
                    {
                        if (GLF_live6coord.y < 0.6) {
                            uvec2 GLF_live6icoord = _GLF_IDENTITY(uvec2((_GLF_IDENTITY((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6), (true ? ((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) : _GLF_FUZZED(refract(GLF_live6coord, vec2(-5.6, -6.7), 8.9))))) * 256.0), max(_GLF_IDENTITY(uvec2((_GLF_IDENTITY((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6), (true ? ((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) : _GLF_FUZZED(refract(GLF_live6coord, vec2(-5.6, -6.7), 8.9))))) * 256.0), min(uvec2((_GLF_IDENTITY((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6), (true ? ((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) : _GLF_FUZZED(refract(GLF_live6coord, vec2(-5.6, -6.7), 8.9))))) * 256.0), uvec2((_GLF_IDENTITY((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6), (true ? ((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) : _GLF_FUZZED(refract(GLF_live6coord, vec2(-5.6, -6.7), 8.9))))) * 256.0))), uvec2((_GLF_IDENTITY((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6), (true ? ((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) : _GLF_FUZZED(refract(GLF_live6coord, vec2(-5.6, -6.7), 8.9))))) * 256.0)));
                            uint GLF_live6res1 = uint(((GLF_live6icoord.x * GLF_live6icoord.y) >> (_GLF_IDENTITY(GLF_live6icoord, min(GLF_live6icoord, GLF_live6icoord)).x & 31u)) & 0xffffffffu);
                            uint GLF_live6res2 = uint(((GLF_live6icoord.x * GLF_live6icoord.y) << (GLF_live6icoord.x & 31u)) & 0xffffffffu);
                            float GLF_live6res = float(((GLF_live6res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live6res1 & 1u) != 0u ? 1u : 0u));
                            GLF_live6_GLF_color = _GLF_outlined_7(GLF_live6res);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                {
                                    int GLF_live10msb8 = _GLF_FUZZED(-69834);
                                    vec2 GLF_live10position = _GLF_FUZZED(vec2(7.7, 7.3));
                                    if (abs(GLF_live10position.y - GLF_live10position.x) < 0.5) {
                                        GLF_live10b_b = clamp(float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0)), float(bitCount(GLF_live10msb8)), GLF_live10b_b * float(bitCount(GLF_live10msb8)) * 3.0);
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = asinh(vec4(5.7, 9027.9546, -9.0, -39.58));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, float(_GLF_IDENTITY(mat3(gl_FragCoord.x, 1.0, round(length(normalize(1.0))), 1.0, round(length(normalize(1.0))), 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))), 1.0), vec3(0.0, log(1.0), 1.0)), dot(vec3(0.0, _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))), 1.0), vec3(0.0, log(1.0), 1.0))), tan(0.0)), (mat3(gl_FragCoord.x, 1.0, round(length(normalize(1.0))), 1.0, round(length(normalize(1.0))), 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))), 1.0), vec3(0.0, log(1.0), 1.0)), dot(vec3(0.0, _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))), 1.0), vec3(0.0, log(1.0), 1.0))), tan(0.0))) * mat3(1.0)))) < 0.0)))) {
                                    {
                                        vec2 GLF_live8coord = _GLF_FUZZED(vec2(-10.91, -8.4));
                                        int GLF_live8i = _GLF_FUZZED(75199);
                                        {
                                            int GLF_live8looplimiter0 = 0;
                                            while (GLF_live8i < 1 && GLF_live8coord.x > 1.0 || GLF_live8coord.y > 1.0) {
                                                if (GLF_live8looplimiter0 >= 5) {
                                                    break;
                                                }
                                                GLF_live8looplimiter0++;
                                                {
                                                    if (GLF_live8coord.x > 1.0)
                                                        GLF_live8coord.x -= 1.0;
                                                    if (GLF_live8coord.y > 1.0)
                                                        GLF_live8coord.y -= 1.0;
                                                    GLF_live8coord *= 2.0;
                                                    GLF_live8i++;
                                                }
                                            }
                                        }
                                    }
                                    _GLF_color = log2(sign(_GLF_color));
                                }
                            }
                        } else {
                            ivec2 GLF_live6icoord = ivec2(((GLF_live6coord - _GLF_IDENTITY(vec2(0.4, 0.6), (_GLF_IDENTITY(vec2(0.4, 0.6), (true ? vec2(0.4, 0.6) : _GLF_FUZZED(resolution)))) * vec2(1.0, 1.0))) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_live6res3 = ((GLF_live6icoord.x >> 5) & 1) ^ ((GLF_live6icoord.y & 32) >> 5);
                            int GLF_live6res2 = (GLF_live6icoord.y * GLF_live6icoord.y >> 10) & 1;
                            int GLF_live6res1 = (_GLF_IDENTITY(GLF_live6icoord.x, min(GLF_live6icoord.x, GLF_live6icoord.x)) * GLF_live6icoord.y >> 9) & 1;
                            {
                                int GLF_live9i = _GLF_FUZZED((-2115));
                                float GLF_live9ref = _GLF_FUZZED(((-2276.6884) * 5.6));
                                float GLF_live9s = _GLF_FUZZED((844.882 - 9.8));
                                if (mod(float(GLF_live9i), GLF_live9ref) <= 0.01) {
                                    GLF_live9s += 0.2;
                                }
                            }
                            GLF_live6_GLF_color = _GLF_outlined_8(_GLF_IDENTITY(GLF_live6res1, (_GLF_IDENTITY(GLF_live6res1, ~(~(GLF_live6res1)))) | 0), GLF_live6res2, GLF_live6res3);
                        }
                    }
                }
            }
        }
    }
    if (_GLF_IDENTITY(uv.x > (2.0 / 4.0), _GLF_IDENTITY(bool(bvec4(uv.x > (2.0 / 4.0), _GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0)))), true, true)), bool(bvec2(bool(bvec4(uv.x > (2.0 / 4.0), _GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0)))), true, true)), true))))) {
        {
            vec4 GLF_live9c = _GLF_FUZZED(vec4(-0.8, 505.459, -9817.8636, -9.3));
            int GLF_live9looplimiter1 = 0;
            for (int GLF_live9i = 0; GLF_live9i < 3; GLF_live9i++) {
                if (GLF_live9looplimiter1 >= 4) {
                    break;
                }
                GLF_live9looplimiter1++;
                {
                    if (GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] >= 1.0) {
                        GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] = GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] * GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)];
                    }
                }
            }
        }
        {
            {
                int GLF_live4m = _GLF_FUZZED(ivec3(-5026, 84676, -33476).s);
                int GLF_live4r = _GLF_FUZZED(ivec4(-76016, -75386, _GLF_IDENTITY(-32687, 0 | (-32687)), 70019).a);
                {
                    GLF_live4r = _GLF_outlined_9(GLF_live4m);
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                vec4 GLF_live9c = _GLF_FUZZED(vec4(-732.655, 8.8, 1.5, -35.60));
                int GLF_live9looplimiter1 = 0;
                for (int GLF_live9i = 0; GLF_live9i < 3; GLF_live9i++) {
                    if (GLF_live9looplimiter1 >= 4) {
                        break;
                    }
                    GLF_live9looplimiter1++;
                    {
                        if (GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] >= 1.0) {
                            GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] = GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] * GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)];
                        }
                    }
                }
            }
            _GLF_color = vec4(9.4, 4.5, 80.67, -777.752);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            {
                vec4 GLF_live9c = _GLF_FUZZED(vec4(54.35, vec3(vec4(-83.35, 5403.5389, 5.3, 75.74))));
                int GLF_live9i = _GLF_FUZZED(79624);
                {
                    GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] = GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] * GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)];
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (_GLF_IDENTITY(vec3(9.7, -761.908, 80.26) * mat4x3(3503.5657, 18.09, -81.93, 167.936, 8.1, -79.49, -8.6, -83.00, -11.92, 3.1, -7.8, -0.9), mat4(1.0) * (vec3(9.7, -761.908, 80.26) * mat4x3(3503.5657, 18.09, -81.93, 167.936, 8.1, -79.49, -8.6, -83.00, -11.92, 3.1, -7.8, -0.9))));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = floor(exp2(vec4(41.72, -1.6, -1991.4251, 2.2)));
                }
            }
        }
        _GLF_IDENTITY(color.y += _GLF_IDENTITY(float(obj.numbers[2]), clamp(float(obj.numbers[2]), float(obj.numbers[2]), float(obj.numbers[2]))), (color.y += _GLF_IDENTITY(float(obj.numbers[2]), clamp(float(obj.numbers[2]), _GLF_IDENTITY(float(obj.numbers[2]), max(_GLF_IDENTITY(float(obj.numbers[2]), (false ? _GLF_FUZZED(round(-6.1)) : _GLF_IDENTITY(float(obj.numbers[2]), clamp(float(obj.numbers[2]), float(obj.numbers[2]), float(obj.numbers[2]))))), _GLF_IDENTITY(float(obj.numbers[2]), clamp(float(obj.numbers[2]), _GLF_IDENTITY(float(obj.numbers[2]), float(vec4(float(obj.numbers[2]), 0.0, 0.0, 0.0))), float(obj.numbers[2]))))), float(obj.numbers[_GLF_IDENTITY(2, ~(~(2)))])))) * 1.0);
    }
    if (uv.x > (3.0 / 4.0)) {
        color.z += float(obj.numbers[3]);
    }
    color.y += float(obj.numbers[4]);
    if (uv.y > (_GLF_IDENTITY(1.0 / 4.0, min(1.0 / 4.0, 1.0 / 4.0)))) {
        color.x += float(obj.numbers[5]);
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = dFdxFine(dFdxCoarse(GLF_live6_GLF_color));
            }
            int GLF_live4a = _GLF_FUZZED(-63542);
            int GLF_live4looplimiter0 = 0;
            vec2 GLF_live4uv = _GLF_FUZZED(_GLF_IDENTITY(vec2(-1.5, _GLF_IDENTITY(94.72, min(94.72, 94.72))), max(vec2(-1.5, _GLF_IDENTITY(94.72, min(94.72, 94.72))), vec2(-1.5, _GLF_IDENTITY(94.72, min(94.72, 94.72))))));
            {
                if (GLF_live4looplimiter0 >= 6) {
                    ;
                }
                GLF_live4looplimiter0++;
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, mix(float(gl_FragCoord.y), float(_GLF_FUZZED(-8.6)), bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))) < 0.0)))) {
                    _GLF_color = vec4(-66.93, -7.2, 739.797, -30.30);
                }
                {
                    {
                        vec4 GLF_live9c = _GLF_FUZZED(vec4(-9.0, 601.048, 2831.0854, 0.9));
                        int GLF_live9i = _GLF_FUZZED(96166);
                        {
                            GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] = GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)] * GLF_live9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 4)];
                        }
                    }
                    GLF_live4uv.y -= step(GLF_live4injectionSwitch.y, GLF_live4uv.x);
                    GLF_live4uv.x -= fract(_GLF_IDENTITY(tanh(GLF_live4uv.x), (_GLF_IDENTITY(tanh(GLF_live4uv.x), float(mat3x2(tanh(GLF_live4uv.x), 0.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0)), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0))), 1.0)))) - 0.0)) / ldexp(GLF_live4injectionSwitch.y, findMSB(GLF_live4a));
                    GLF_live4a--;
                }
            }
        }
    }
    if (uv.y > (2.0 / 4.0)) {
        color.y += float(obj.numbers[6]);
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
    }
    {
        {
            vec2 GLF_live8coord = _GLF_FUZZED(vec2(float(78636)));
            int GLF_live8i = _GLF_FUZZED(int(140921u));
            {
                int GLF_live8looplimiter0 = 0;
                while (GLF_live8i < 1 && GLF_live8coord.x > 1.0 || GLF_live8coord.y > 1.0) {
                    if (GLF_live8looplimiter0 >= 5) {
                        break;
                    }
                    GLF_live8looplimiter0++;
                    {
                        if (GLF_live8coord.x > 1.0)
                            GLF_live8coord.x -= 1.0;
                        if (GLF_live8coord.y > 1.0)
                            GLF_live8coord.y -= 1.0;
                        GLF_live8coord *= 2.0;
                        GLF_live8i++;
                    }
                }
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(2.4, 8019.8287, 482.566, _GLF_IDENTITY(-8130.2109, float(vec3(-8130.2109, 0.0, 0.0))));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (uv.y > (3.0 / 4.0)) {
        _GLF_IDENTITY(color.z += float(obj.numbers[7]), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(color.z += float(obj.numbers[7]), (color.z += float(obj.numbers[7])) * 1.0) : _GLF_FUZZED(-34.89)));
    }
    color.z += float(obj.numbers[_GLF_IDENTITY(8, min(8, 8))]);
    if (abs(uv.x - uv.y) < 0.25) {
        color.x += float(obj.numbers[9]);
        {
            {
                float GLF_live9s = _GLF_FUZZED(-7.2);
                {
                    ;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                int GLF_live11looplimiter7 = 0;
                if (GLF_live11looplimiter7 >= 5) {
                    ;
                }
            }
            _GLF_color = vec4(_GLF_IDENTITY(2.2, _GLF_IDENTITY(float(float(_GLF_IDENTITY(2.2, mix(float(_GLF_FUZZED(-9.9)), float(2.2), bool(true))))), clamp(float(float(_GLF_IDENTITY(2.2, mix(float(_GLF_FUZZED(-9.9)), float(2.2), bool(true))))), float(float(_GLF_IDENTITY(2.2, mix(float(_GLF_FUZZED(-9.9)), float(2.2), bool(true))))), float(float(_GLF_IDENTITY(2.2, mix(float(_GLF_FUZZED(-9.9)), float(2.2), bool(true)))))))), 9474.9879, 1.4, -59.53);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        {
            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, false))))) {
                _GLF_color = GLF_live6_GLF_color;
            }
            {
                bool GLF_live10c7 = _GLF_FUZZED(false);
                int GLF_live10msb8 = _GLF_FUZZED(-95926);
                vec2 GLF_live10pos = _GLF_FUZZED(vec3(-163.862, -458.953, 0.4).st);
                vec3 GLF_live10setting = _GLF_FUZZED(((vec3(5.8, -868.529, -5.2) * 8.9)));
                if (!GLF_live10c7) {
                    ;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(162.858, -0.4, 3974.8679, 574.208);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_struct_1 _GLF_struct_replacement_1 = _GLF_struct_1(_GLF_struct_2(vec4(1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true)), mat3(1.0, 1.0, _GLF_IDENTITY(1.0, min(_GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, (1.0) - 0.0)) - 0.0), 1.0)), 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0);
        _GLF_struct_replacement_1._f0._GLF_outVarBackup_GLF_color = _GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = atan(sqrt(vec4(-_GLF_IDENTITY(42.54, (false ? _GLF_FUZZED(773.053) : _GLF_IDENTITY(42.54, max(42.54, 42.54)))), _GLF_IDENTITY(-53.46, 0.0 + (-53.46)), 594.750, 5.8)), _GLF_IDENTITY(atanh(vec4(-48.71, 2693.0660, -793.035, -3.5)), max(atanh(vec4(-48.71, 2693.0660, -793.035, -3.5)), atanh(vec4(-48.71, 2693.0660, -793.035, -3.5)))));
            {
                int GLF_live9i = _GLF_FUZZED(((87975 | (-8981)) | (-68008)));
                float GLF_live9limit = _GLF_FUZZED(float(false));
                float GLF_live9s = _GLF_FUZZED(590.241);
                if (float(GLF_live9i) >= GLF_live9limit) {
                    ;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (_GLF_outVarBackup_GLF_color) - abs(vec4(0.0, 0.0, 0.0, 0.0)));
                {
                    vec2 GLF_live8coord = _GLF_FUZZED(vec2(-8174.2897, -2285.7827));
                    int GLF_live8i = _GLF_FUZZED(75165);
                    int GLF_live8looplimiter0 = 0;
                    {
                        if (GLF_live8looplimiter0 >= 5) {
                            ;
                        }
                        GLF_live8looplimiter0++;
                        {
                            if (GLF_live8coord.x > 1.0)
                                GLF_live8coord.x -= 1.0;
                            if (GLF_live8coord.y > 1.0)
                                GLF_live8coord.y -= 1.0;
                            GLF_live8coord *= 2.0;
                            GLF_live8i++;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = round(GLF_live0_GLF_color);
                }
            }
        }
        _GLF_color = vec4(9.4, 6863.2918, 85.56, _GLF_IDENTITY(-1009.2993, (-1009.2993) * 1.0));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_struct_replacement_1._f0._GLF_outVarBackup_GLF_color;
            {
                vec2 GLF_live6coord = _GLF_FUZZED(vec2(vec3(-7598.7455, 99.38, 1.4)));
                if (GLF_live6coord.x > 0.4) {
                    if (GLF_live6coord.y < 0.6) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, mix(vec2((injectionSwitch)[0], _GLF_FUZZED(-7.7)), vec2(_GLF_FUZZED(69.60), (injectionSwitch)[1]), bvec2(false, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))).y)))) {
                            _GLF_color = asin(GLF_live6_GLF_color);
                        }
                        uvec2 GLF_live6icoord = uvec2(((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_live6res1 = uint(((_GLF_IDENTITY(GLF_live6icoord.x * GLF_live6icoord.y, uint(uvec4(GLF_live6icoord.x * GLF_live6icoord.y, 1u, 0u, 1u)))) >> (GLF_live6icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_live6res2 = uint(((GLF_live6icoord.x * GLF_live6icoord.y) << (GLF_live6icoord.x & 31u)) & 0xffffffffu);
                        float GLF_live6res = float(((GLF_live6res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live6res1 & 1u) != 0u ? 1u : 0u));
                        GLF_live6_GLF_color = _GLF_outlined_10(GLF_live6res);
                    } else {
                        ivec2 GLF_live6icoord = ivec2(((GLF_live6coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.4, mix(float(1.0 / 0.4), float(_GLF_FUZZED(0.6)), bool(false))))) * 256.0);
                        int GLF_live6res3 = _GLF_IDENTITY(((GLF_live6icoord.x >> 5) & 1), clamp(((GLF_live6icoord.x >> 5) & 1), ((GLF_live6icoord.x >> 5) & 1), _GLF_IDENTITY(((GLF_live6icoord.x >> 5) & 1), (((GLF_live6icoord.x >> 5) & 1)) | 0))) ^ ((GLF_live6icoord.y & 32) >> 5);
                        int GLF_live6res2 = (_GLF_IDENTITY(GLF_live6icoord.y * GLF_live6icoord.y, min(GLF_live6icoord.y * GLF_live6icoord.y, GLF_live6icoord.y * GLF_live6icoord.y)) >> 10) & 1;
                        {
                            bool GLF_live10c3 = _GLF_FUZZED(false);
                            if (!GLF_live10c3) {
                                ;
                            }
                        }
                        int GLF_live6res1 = (GLF_live6icoord.x * GLF_live6icoord.y >> 9) & 1;
                        GLF_live6_GLF_color = vec4(float(GLF_live6res1 ^ GLF_live6res2), float(GLF_live6res2 & GLF_live6res3), float(GLF_live6res1 | GLF_live6res3), 1.0);
                    }
                } else {
                    ivec2 GLF_live6icoord = ivec2(((GLF_live6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                    int GLF_live6v = (GLF_live6icoord.x ^ GLF_live6icoord.y) * GLF_live6icoord.y;
                    bool GLF_live6res1 = ((GLF_live6v >> 10) & 1) != 0;
                    bool GLF_live6res2 = ((GLF_live6v >> 11) & 4) != 0;
                    bool GLF_live6res3 = ((GLF_live6v >> 12) & 8) != 0;
                    GLF_live6_GLF_color = _GLF_IDENTITY(vec4(GLF_live6res1 ? 1.0 : 0.0, GLF_live6res2 ? 1.0 : 0.0, GLF_live6res3 ? 1.0 : 0.0, 1), _GLF_IDENTITY(mat4(1.0) * (vec4(GLF_live6res1 ? 1.0 : 0.0, GLF_live6res2 ? 1.0 : 0.0, GLF_live6res3 ? 1.0 : 0.0, 1)), vec4(0.0, 0.0, 0.0, 0.0) + (mat4(1.0) * (vec4(GLF_live6res1 ? 1.0 : 0.0, GLF_live6res2 ? 1.0 : 0.0, GLF_live6res3 ? 1.0 : 0.0, 1)))));
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = _GLF_IDENTITY(cos(unpackUnorm4x8(84452u)), (cos(unpackUnorm4x8(84452u))) * vec4(1.0, 1.0, 1.0, 1.0));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    _GLF_color = _GLF_IDENTITY(vec4(normalize(color), _GLF_IDENTITY(1.0, min(1.0, 1.0))), vec4(mat3x4(vec4(_GLF_IDENTITY(normalize(color), min(normalize(color), normalize(color))), _GLF_IDENTITY(1.0, min(1.0, 1.0))), 0.0, 0.0, sin(0.0), 1.0, 0.0, 1.0, 0.0, 0.0)));
}
