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

layout(set = 0, binding = 1) uniform buf1 {
    vec2 injectionSwitch;
};

vec4 GLF_live14gl_FragCoord = _GLF_FUZZED((vec3(-640.539, -9.8, -4.9) * mat4x3(-24.22, 5.5, -2.8, -827.654, 1519.4713, 37.02, 293.435, 46.76, -1.6, -1.5, 6523.9479, -1.3)));

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live14injectionSwitch;
};

vec4 GLF_live17gl_FragCoord = _GLF_FUZZED(vec4(6.0, 16.64, 5.0, -808.812));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_live17injectionSwitch;
};

const int GLF_live17N = 10;
int GLF_live17data[10] = int[10](_GLF_FUZZED(-82922), _GLF_FUZZED(36189), _GLF_FUZZED(39035), _GLF_FUZZED((54697 ^ int(true))), _GLF_FUZZED(92802), _GLF_FUZZED(((-12039) * (ivec4(-56547, -81392, 93613, -47526).t | 48890))), _GLF_FUZZED(-13972), _GLF_FUZZED(-21953), _GLF_FUZZED((((-4758) | 22546))), _GLF_FUZZED(-5129)), GLF_live17temp[10] = int[10](_GLF_FUZZED((int(false) & (-6732))), _GLF_FUZZED(((-38472) + (-30473))), _GLF_FUZZED(3059), _GLF_FUZZED((+(-9459))), _GLF_FUZZED(-63166), _GLF_FUZZED(-27140), _GLF_FUZZED(41039), _GLF_FUZZED((+(72448 + 84105))), _GLF_FUZZED(-2838), _GLF_FUZZED(int(false)));

void GLF_live17merge(int GLF_live17from, int GLF_live17mid, int GLF_live17to) {
    int GLF_live17k = GLF_live17from, GLF_live17i = GLF_live17from, GLF_live17j = GLF_live17mid + 1;
    {
        int GLF_live17looplimiter0 = 0;
        while (GLF_live17i <= GLF_live17mid && GLF_live17j <= GLF_live17to) {
            if (GLF_live17looplimiter0 >= 3) {
                break;
            }
            GLF_live17looplimiter0++;
            {
                if (GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] < GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j, 10)]) {
                    GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i++, 10)];
                } else {
                    GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live17looplimiter1 = 0;
        while (GLF_live17i < GLF_live17N && GLF_live17i <= GLF_live17mid) {
            if (GLF_live17looplimiter1 >= 3) {
                break;
            }
            GLF_live17looplimiter1++;
            {
                GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i++, 10)];
            }
        }
    }
    {
        int GLF_live17looplimiter2 = 0;
        for (int GLF_live17i = GLF_live17from; GLF_live17i <= GLF_live17to; GLF_live17i++) {
            if (GLF_live17looplimiter2 >= 3) {
                break;
            }
            GLF_live17looplimiter2++;
            {
                GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)];
            }
        }
    }
}

vec4 GLF_live15gl_FragCoord = _GLF_FUZZED(vec4(61.76, 407.860, -33.50, 5.4));

layout(set = 0, binding = 4) uniform buf4 {
    float GLF_live16time;
};

float GLF_live16h_r = _GLF_FUZZED((vec2(44.22, -2.2) + vec2(118.773, 519.159)).y);
float GLF_live16s_g = _GLF_FUZZED(-31.65);
float GLF_live16b_b = _GLF_FUZZED(-5.8);

void GLF_live16doConvert() {
    vec3 GLF_live16temp = _GLF_FUZZED((+vec3(25.14, 7.3, -0.1)));
    GLF_live16temp = GLF_live16b_b * (1.0 - GLF_live16s_g) + (GLF_live16b_b - GLF_live16b_b * (1.0 - GLF_live16s_g)) * clamp(abs(abs(6.0 * (GLF_live16h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
    GLF_live16h_r = GLF_live16temp.x;
    GLF_live16s_g = GLF_live16temp.y;
    GLF_live16b_b = GLF_live16temp.z;
}

vec3 GLF_live16computeColor(float GLF_live16c, vec2 GLF_live16position) {
    GLF_live16h_r = fract(GLF_live16c);
    GLF_live16s_g = 1.0;
    GLF_live16b_b = (0.5 + (sin(GLF_live16time) * 0.5 + 0.5));
    GLF_live16doConvert();
    GLF_live16s_g *= 1.0 / GLF_live16position.y;
    GLF_live16h_r *= 1.0 / GLF_live16position.x;
    if (abs(GLF_live16position.y - GLF_live16position.x) < 0.5) {
        GLF_live16b_b = clamp(0.0, 1.0, GLF_live16b_b * 3.0);
    }
    return vec3(GLF_live16h_r, GLF_live16s_g, GLF_live16b_b);
}

vec3 GLF_live16defaultColor() {
    return vec3(0.0);
}

vec3 GLF_live16drawShape(vec2 GLF_live16pos, vec2 GLF_live16square, vec3 GLF_live16setting) {
    bool GLF_live16c1 = GLF_live16pos.x - GLF_live16setting.x < GLF_live16square.x;
    if (!GLF_live16c1) {
        return GLF_live16defaultColor();
    }
    bool GLF_live16c2 = GLF_live16pos.x + GLF_live16setting.x > GLF_live16square.x;
    if (!GLF_live16c2) {
        return GLF_live16defaultColor();
    }
    bool GLF_live16c3 = GLF_live16pos.y - GLF_live16setting.x < GLF_live16square.y;
    if (!GLF_live16c3) {
        return GLF_live16defaultColor();
    }
    bool GLF_live16c4 = GLF_live16pos.y + GLF_live16setting.x > GLF_live16square.y;
    if (!GLF_live16c4) {
        return GLF_live16defaultColor();
    }
    bool GLF_live16c5 = GLF_live16pos.x - (GLF_live16setting.x - GLF_live16setting.y) < GLF_live16square.x;
    if (!GLF_live16c5) {
        return GLF_live16computeColor(GLF_live16setting.z / 40.0, GLF_live16pos);
    }
    bool GLF_live16c6 = GLF_live16pos.x + (GLF_live16setting.x - GLF_live16setting.y) > GLF_live16square.x;
    if (!GLF_live16c6) {
        return GLF_live16computeColor(GLF_live16setting.z / 40.0, GLF_live16pos);
    }
    bool GLF_live16c7 = GLF_live16pos.y - (GLF_live16setting.x - GLF_live16setting.y) < GLF_live16square.y;
    if (!GLF_live16c7) {
        return GLF_live16computeColor(GLF_live16setting.z / 40.0, GLF_live16pos);
    }
    bool GLF_live16c8 = GLF_live16pos.y + (GLF_live16setting.x - GLF_live16setting.y) > GLF_live16square.y;
    if (!GLF_live16c8) {
        return GLF_live16computeColor(GLF_live16setting.z / 40.0, GLF_live16pos);
    }
    return GLF_live16defaultColor();
}

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead13resolution;
};

float GLF_dead13b_b = _GLF_FUZZED((vec4(20.77, -8.9, 43.77, -6.2).y - (-2628.3180)));
int GLF_live9MATRIX_N = 4;

layout(set = 0, binding = 6) uniform buf6 {
    float GLF_live7one;
};

mat2 GLF_live7m22 = _GLF_FUZZED(mat2(-8845.6251, -31.83, -8.8, -4193.1484));
mat2x3 GLF_live7m23 = _GLF_FUZZED(mat2x3(98.33, 6.3, 272.678, 728.482, -6.2, 4.9));
mat2x4 GLF_live7m24 = _GLF_FUZZED((+mat2x4(-7309.3381, 92.42, 40.90, -3831.4055, -224.965, 155.802, -8313.9592, 531.487)));
mat3x2 GLF_live7m32 = _GLF_FUZZED(mat3x2(-2.9, (-(-62.23)), -96.07, -32.01, -3.3, -7101.1334));
mat3 GLF_live7m33 = _GLF_FUZZED((6.0 + mat3(26.94, -2937.6297, -1860.3336, 81.88, 4.6, 6.2, 70.71, -375.410, 844.840)));
mat3x4 GLF_live7m34 = _GLF_FUZZED(mat3x4(69.92, 0.9, -3845.6455, 2.2, 32.70, -1.0, 6438.5693, 1.5, -4851.5963, 876.143, -7979.6304, -126.041));
mat4x2 GLF_live7m42 = _GLF_FUZZED(mat4x2(7.4, -69.13, -695.215, (-9.7), 4.7, -6.6, -4.5, (8394.7972 + (-40.09))));
mat4x3 GLF_live7m43 = _GLF_FUZZED(mat4x3(6644.0260, -9402.8392, -1079.6024, -88.86, -9.8, 10.44, -6247.0303, -7.5, 25.94, -6256.0159, -3204.6677, -41.06));
mat4 GLF_live7m44 = _GLF_IDENTITY(_GLF_FUZZED(mat4(mat4x3(67.88, -9495.2099, -2.5, -5.5, 16.07, 1873.4460, -6086.8444, 1589.3151, 6671.4727, 56.91, -8.6, -6956.7615))), (_GLF_FUZZED(mat4(mat4x3(67.88, -9495.2099, -2.5, -5.5, 16.07, 1873.4460, -6086.8444, 1589.3151, 6671.4727, 56.91, -8.6, -6956.7615)))) + mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0));
vec4 GLF_live10gl_FragCoord = _GLF_FUZZED(vec4(-787.840, -8.5, vec2(-7.7, -48.76)));

layout(set = 0, binding = 7) uniform buf7 {
    vec2 GLF_live10resolution;
};

layout(set = 0, binding = 8) uniform buf8 {
    vec2 GLF_live8injectionSwitch;
};

struct GLF_live8QuicksortObject {
    int numbers[10];
};

GLF_live8QuicksortObject GLF_live8obj = GLF_live8QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_live8swap(int GLF_live8i, int GLF_live8j) {
    int GLF_live8temp = GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 10)];
    GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 10)] = GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 10)];
    GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 10)] = GLF_live8temp;
}

vec3 GLF_live8palette(vec3 GLF_live8a, vec3 GLF_live8b, vec3 GLF_live8c, vec3 GLF_live8d) {
    return fract(mix(GLF_live8d * GLF_live8a, GLF_live8a * GLF_live8c, GLF_live8b + GLF_live8d - GLF_live8c));
}

const int GLF_dead6N = 10;
int GLF_dead6data[10] = int[10](_GLF_FUZZED(37948), _GLF_FUZZED((23802 - (-59401))), _GLF_FUZZED(-39756), _GLF_FUZZED((((-81754) + _GLF_IDENTITY(18824, (18824) << 0)) + (-10262))), _GLF_FUZZED(41667), _GLF_FUZZED(-22720), _GLF_FUZZED(-54656), _GLF_FUZZED(ivec3(45756, -14862, 76681).g), _GLF_FUZZED(-3742), _GLF_FUZZED(((65635u <= 18377u) ? int(false) : 94049))), GLF_dead6temp[10] = int[10](_GLF_FUZZED(-63586), _GLF_FUZZED(((uvec2(59291u, 87201u) != uvec2(93573u, 34757u)) ? (_GLF_IDENTITY(-72494, (-72494) | (-72494))) : (-22464))), _GLF_FUZZED(((-6389) * (-49020))), _GLF_FUZZED(15177), _GLF_FUZZED((+99050)), _GLF_FUZZED(80244), _GLF_FUZZED((ivec2(-47183, 88716).t & ivec2(37018, -64093).y)), _GLF_FUZZED(45669), _GLF_FUZZED(ivec3(17410, -80431, -97192).r), _GLF_FUZZED(-59852));

void GLF_dead6merge(int GLF_dead6from, int GLF_dead6mid, int GLF_dead6to) {
    int GLF_dead6k = GLF_dead6from, GLF_dead6i = GLF_dead6from, GLF_dead6j = GLF_dead6mid + 1;
    while (GLF_dead6i <= GLF_dead6mid && GLF_dead6j <= GLF_dead6to) {
        if (_GLF_DEAD(false)) {
            break;
            {
                int GLF_live14a = _GLF_FUZZED(-3701);
                int GLF_live14b = _GLF_FUZZED(-67393);
                int GLF_live14c = _GLF_FUZZED(int(false));
                int GLF_live14d = _GLF_FUZZED(44967);
                vec2 GLF_live14uv = _GLF_FUZZED((+vec2(9.1, -2706.8034)));
                {
                    int GLF_live14looplimiter3 = 0;
                    do {
                        if (GLF_live14looplimiter3 >= 3) {
                            break;
                        }
                        GLF_live14looplimiter3++;
                        {
                            GLF_live14uv.y -= step(GLF_live14injectionSwitch.y, GLF_live14uv.x) + float(GLF_live14a) + float(GLF_live14b) + float(GLF_live14c);
                            GLF_live14d--;
                        }
                    } while (GLF_live14d > int(GLF_live14injectionSwitch.x));
                }
            }
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead13c6 = _GLF_FUZZED((mat2x4(-9.0, -2.2, 0.1, -712.453, -18.39, -9.6, -7086.3824, -36.36) == GLF_live7m24));
                vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(unpackUnorm2x16(uvec2(195755u, 68351u).x));
                vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(vec3(-304.522, -1.9, -2.9));
                if (!donor_replacementGLF_dead13c6) {
                    ;
                }
            }
        }
        if (GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 10)] < GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 10)]) {
            GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6k++, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i++, 10)];
        } else {
            {
                {
                    ;
                }
            }
            GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6k++, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j++, 10)];
        }
    }
    while (GLF_dead6i < GLF_dead6N && GLF_dead6i <= GLF_dead6mid) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                ;
            }
        }
        GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6k++, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i++, 10)];
    }
    for (int GLF_dead6i = GLF_dead6from; GLF_dead6i <= GLF_dead6to; GLF_dead6i++) {
        GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 10)] = GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 10)];
    }
}

const int GLF_dead4dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, _GLF_IDENTITY(163, (163) ^ 0), 153, 143, 134, 126, 120, 116, 114, _GLF_IDENTITY(114, ~(~(_GLF_IDENTITY(114, 0 + (114))))), 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, _GLF_IDENTITY(171, (false ? _GLF_FUZZED(GLF_dead6N) : 171)), 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, _GLF_IDENTITY(117, 0 ^ (117)), 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, _GLF_IDENTITY(207, (207) | 0), 194, 181, 169, 158, 148, 141, 135, _GLF_IDENTITY(132, (_GLF_IDENTITY(132, (true ? 132 : _GLF_FUZZED(GLF_dead6N)))) << 0), 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, _GLF_IDENTITY(93, ~(~(_GLF_IDENTITY(93, clamp(93, 93, 93))))), 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, _GLF_IDENTITY(87, (_GLF_IDENTITY(87, ~(_GLF_IDENTITY(~(87), 0 + (~(87)))))) ^ 0), 103, 119, 134, 149, 162, _GLF_IDENTITY(173, (173) | (_GLF_IDENTITY(173, min(_GLF_IDENTITY(173, ~(~(173))), _GLF_IDENTITY(173, clamp(173, _GLF_IDENTITY(173, (173) | (173)), 173)))))), _GLF_IDENTITY(181, ~(~(_GLF_IDENTITY(181, (181) | (181))))), 186, 188, 186, 181, 174, 164, 153, 141, _GLF_IDENTITY(128, (128) | (128)), 116, 104, 94, _GLF_IDENTITY(86, 0 ^ (86)), 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, _GLF_IDENTITY(_GLF_IDENTITY(92, (false ? _GLF_FUZZED(11042) : 92)), max(_GLF_IDENTITY(92, (false ? _GLF_FUZZED(11042) : 92)), _GLF_IDENTITY(92, (false ? _GLF_FUZZED(11042) : 92)))), 83, 73, 62, 50, 38, _GLF_IDENTITY(26, _GLF_IDENTITY(int(_GLF_IDENTITY(ivec2(26, 0), (ivec2(26, 0)) - ivec2(0, 0))), int(ivec3(int(_GLF_IDENTITY(ivec2(26, 0), (ivec2(26, 0)) - ivec2(0, 0))), 0, 1)))), 16, 8, _GLF_IDENTITY(2, ~(_GLF_IDENTITY(~(2), (~(2)) << 0))), 0, 0, 4, 11, 21, 33, 48, 64, 81, _GLF_IDENTITY(98, ~(~(98))), 114, 129, 141, 151, 158, 161, 161, 158, 152, _GLF_IDENTITY(144, (144) + (0 >> _GLF_IDENTITY(int(5), int(5)))), 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
vec4 GLF_live1_GLF_color = _GLF_FUZZED((vec4(21.79, 7923.3648, 2256.3145, -0.7) - vec4(16.27, 23.61, -_GLF_IDENTITY(30.58, min(30.58, 30.58)), -_GLF_IDENTITY(8.9, (8.9) - 0.0))));
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

float compute_value(float limit, float thirty_two) {
    {
        int GLF_live17i = _GLF_FUZZED(93324);
        int GLF_live17j = _GLF_FUZZED(-70829);
        int GLF_live17k = _GLF_FUZZED(30165);
        int GLF_live17looplimiter0 = 0;
        int GLF_live17mid = _GLF_FUZZED((+(-24137)));
        int GLF_live17to = _GLF_FUZZED(((-57871) ^ (-80540)));
        while (GLF_live17i <= GLF_live17mid && GLF_live17j <= GLF_live17to) {
            if (GLF_live17looplimiter0 >= 3) {
                break;
            }
            GLF_live17looplimiter0++;
            {
                if (GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] < GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j, 10)]) {
                    GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i++, 10)];
                } else {
                    GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live7looplimiter1 = 0;
        if (GLF_live7looplimiter1 >= 3) {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
            {
                {
                    ;
                }
            }
        } else {
            return 1.0;
        }
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & (1 & 1))); _injected_loop_counter++) {
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    vec2 GLF_live16center = _GLF_FUZZED((-vec2(vec3(8.9, 8.0, -2.6))));
                    int GLF_live16i = _GLF_FUZZED(-63394);
                    vec2 GLF_live16position = _GLF_FUZZED(((vec2(-35.50, 9434.9294) + vec2(913.965, -2.6)) * mat2(mat3x2(-6.1, -7942.0162, -7437.7652, 4.1, -1.2, 474.897))));
                    vec3 GLF_live16result = _GLF_FUZZED(((-1873.1246) * vec3(-11.70, 4948.3042, -33.56)));
                    {
                        vec3 GLF_live16d = _GLF_FUZZED(vec3(315.191, -5987.1181, 86.46));
                        GLF_live16d = GLF_live16drawShape(GLF_live16position, GLF_live16center + vec2(sin(float(GLF_live16i) / 10.0 + GLF_live16time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live16i) / 100.0), 0.01, float(GLF_live16i)));
                        if (length(GLF_live16d) <= 0.0) {
                            ;
                        }
                        GLF_live16result = vec3(GLF_live16d);
                    }
                }
                continue;
            }
            int GLF_live9a = _GLF_FUZZED(int(false));
            {
                int GLF_live14a = _GLF_FUZZED(ivec3(51507, ivec2(-20076, -83658)).p);
                int GLF_live14b = _GLF_FUZZED(((((-6799) & 52653) * 19954) * (-62154)));
                int GLF_live14c = _GLF_FUZZED(((-25427) - (-70949)));
                int GLF_live14d = _GLF_FUZZED(80552);
                int GLF_live14looplimiter3 = 0;
                vec2 GLF_live14uv = _GLF_FUZZED(vec2(4.3, -9858.2664));
                do {
                    if (GLF_live14looplimiter3 >= 3) {
                        break;
                    }
                    GLF_live14looplimiter3++;
                    {
                        GLF_live14uv.y -= step(GLF_live14injectionSwitch.y, GLF_live14uv.x) + float(GLF_live14a) + float(GLF_live14b) + float(GLF_live14c);
                        GLF_live14d--;
                    }
                } while (GLF_live14d > int(GLF_live14injectionSwitch.x));
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                continue;
            }
            float GLF_live9alpha3 = _GLF_FUZZED(float(true));
            int GLF_live9j = _GLF_FUZZED((~(-16567)));
            if (_GLF_DEAD(false)) {
                break;
            }
            mat4 GLF_live9matrix_a = _GLF_FUZZED(mat4(-1.6, -5.8, 45.77, 5.4, 1479.2918, -1.6, 31.52, 7.2, 6.4, -201.992, 5.6, -580.048, 5775.1378, -457.451, 5.5, -89.57));
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            vec4 GLF_live9matrix_u = _GLF_FUZZED(vec4(5.3, (vec3(-8736.1179, -0.7, 7712.2570) * vec3(9558.8342, -87.69, -0.8))));
            {
                GLF_live9alpha3 += GLF_live9matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9a, 4)] * GLF_live9matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 4)];
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return 1.0;
                }
                {
                    int GLF_live17i = _GLF_FUZZED(((+(-73807)) - ivec4(6925, 41979, 38460, -46127).r));
                    int GLF_live17k = _GLF_FUZZED(-3316);
                    {
                        GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i++, 10)];
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
        {
            int GLF_live16looplimiter0 = 0;
            if (GLF_live16looplimiter0 >= 7) {
                ;
            }
        }
    }
    {
        int GLF_live17looplimiter4 = 0;
        if (GLF_live17looplimiter4 >= 3) {
            ;
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, bool(bvec2(false, false))))) {
    } else {
        if (_GLF_DEAD(false)) {
            return 1.0;
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))) {
                vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED(fwidthFine(max(vec2(2970.3305, 0.1), injectionSwitch)));
                if (donor_replacementGLF_dead3coord.x > 1.0)
                    donor_replacementGLF_dead3coord.x -= 1.0;
            }
            {
                int GLF_live10i = _GLF_FUZZED(ivec3(-58319, -11298, _GLF_IDENTITY(26242, max(26242, 26242))).r);
                if (GLF_live10i < int(GLF_live10gl_FragCoord.x)) {
                    ;
                }
            }
            {
                int GLF_live17i = _GLF_FUZZED(ivec3(80682, 31149, 74463).r);
                int GLF_live17k = _GLF_FUZZED(69317);
                int GLF_live17mid = _GLF_FUZZED(ivec4(32137, -18872, -69765, -6049).y);
                {
                    int GLF_live17looplimiter1 = 0;
                    while (GLF_live17i < GLF_live17N && GLF_live17i <= GLF_live17mid) {
                        if (GLF_live17looplimiter1 >= 3) {
                            break;
                        }
                        GLF_live17looplimiter1++;
                        {
                            GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i++, 10)];
                        }
                    }
                }
            }
        }
    }
    {
        bool GLF_live16c8 = _GLF_FUZZED(((ivec3(-9719, -69955, -64790) - ivec4(42138, -96188, 88267, 66802).t) != ivec3(-57544, 35889, 93823)));
        vec2 GLF_live16pos = _GLF_FUZZED(vec2(-43.38, 97.28));
        vec3 GLF_live16setting = _GLF_FUZZED(vec3(3.8));
        if (!GLF_live16c8) {
            ;
        }
    }
    float result = -0.5;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return 1.0;
        }
        return 1.0;
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return 1.0;
            }
            {
                {
                    GLF_live16b_b = clamp(0.0, 1.0, GLF_live16b_b * 3.0);
                }
            }
            int GLF_live10i = _GLF_FUZZED(-64109);
            if (GLF_live10i >= int(GLF_live10resolution.x)) {
                ;
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        for (int i = 1; i < _GLF_IDENTITY(800, _GLF_IDENTITY((800), ((800)) << 0) | (_GLF_IDENTITY(800, ~(~(_GLF_IDENTITY(800, (800) << 0)))))); i++) {
            if ((i % 32) == _GLF_IDENTITY(0, 0 + (_GLF_IDENTITY(0, clamp(0, _GLF_IDENTITY(0, (0) / 1), _GLF_IDENTITY(0, 0 ^ (0))))))) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    do {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_IDENTITY(result += 0.4, (_GLF_IDENTITY(result += 0.4, (result += 0.4) - 0.0)) - 0.0);
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            {
                                vec2 GLF_live17color = _GLF_FUZZED(vec2(-8998.8893, 832.918));
                                int GLF_live17i = _GLF_FUZZED(-63231);
                                vec3 GLF_live17vecCoor = _GLF_FUZZED((float(28504) + (mat2x3(-4.5, -0.8, 201.559, -25.43, 50.82, 5.5) * vec2(359.075))));
                                if (int(GLF_live17gl_FragCoord[1]) < 210) {
                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[5]))));
                                    GLF_live17color.y -= tanh(GLF_live17color.x) / cosh(GLF_live17color.y);
                                    ;
                                } else if (int(GLF_live17gl_FragCoord[1]) < 240) {
                                    GLF_live17color = fract(asinh(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[6]))));
                                    GLF_live17color.y -= isnan(float(GLF_live17i)) ? tanh(GLF_live17gl_FragCoord.x) : atanh(GLF_live17gl_FragCoord.y);
                                    ;
                                } else if (int(GLF_live17gl_FragCoord[1]) < 270) {
                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[7]))));
                                    GLF_live17color.y *= mix(normalize(GLF_live17vecCoor), normalize(vec3(GLF_live17color, degrees(GLF_live17color.x))), GLF_live17injectionSwitch.x).y;
                                    ;
                                } else {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    ;
                                }
                            }
                        } else {
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead13msb8 = _GLF_FUZZED(GLF_live9MATRIX_N);
                            vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED((vec2(7.5, 4352.2786) - (-21.54)));
                            {
                                bool GLF_live16c5 = _GLF_FUZZED((mat3x2(8.9, 98.32, 7730.8220, 2825.7279, 7.2, -4.0) != (mat3x2(0.0, 4829.6042, 8.8, 9439.2487, 7839.1458, -6.4) - mat3x2(-1.8, -7107.2175, -3844.4812, 399.606, -7.0, 0.2))));
                                vec2 GLF_live16pos = _GLF_FUZZED((mat3x2(2.3, 6111.8621, -7.3, 81.50, -1.3, -1.6) * vec3(9.0, -94.89, -759.556)));
                                vec3 GLF_live16setting = _GLF_FUZZED((vec3(-7.5, 81.72, -491.106) * (float(-80759))));
                                if (!GLF_live16c5) {
                                    ;
                                }
                            }
                            vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(step(GLF_live7one, vec3(-2398.0177, -4.1, 849.101)));
                            {
                                ;
                                {
                                    vec2 GLF_live17color = _GLF_FUZZED((vec2(9.5, 4778.4953) + vec2(-186.302, -8449.8899)));
                                    vec3 GLF_live17vecCoor = _GLF_FUZZED(vec3(672.732, 448.462, 9.2));
                                    {
                                        GLF_live17color = fract(acosh(clamp(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[3])), 1.0, 1000.0)));
                                        GLF_live17color.x += (isnan(GLF_live17gl_FragCoord.x) ? log2(GLF_live17gl_FragCoord.x) : log2(GLF_live17gl_FragCoord.y));
                                        ;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(ivec2(53428, 99398));
                            {
                                {
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    int GLF_live8looplimiter5 = 0;
                                    if (GLF_live8looplimiter5 >= 5) {
                                        if (_GLF_DEAD(false)) {
                                            {
                                                GLF_dead13b_b = clamp(float(bitfieldExtract(int(GLF_dead13resolution.x), 0, 0)), float(bitCount(GLF_live9MATRIX_N)), GLF_dead13b_b * float(bitCount(GLF_live9MATRIX_N)) * 3.0);
                                                {
                                                    vec2 GLF_live17color = _GLF_FUZZED(vec2(709.227, 5.5));
                                                    vec3 GLF_live17vecCoor = _GLF_FUZZED(vec3(1.5, 8.2, 3200.2259));
                                                    {
                                                        GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[7]))));
                                                        GLF_live17color.y *= mix(normalize(GLF_live17vecCoor), normalize(vec3(GLF_live17color, degrees(GLF_live17color.x))), GLF_live17injectionSwitch.x).y;
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                        ;
                                    }
                                }
                                float GLF_dead4p = (15.0 - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]))) / 15.0;
                                ;
                                {
                                    vec3 GLF_live8color = _GLF_FUZZED(((mat4x3(_GLF_IDENTITY(8442.7305, (8442.7305) + 0.0), 31.53, -777.259, -75.78, -8853.3475, -70.38, 46.49, 86.91, 4.4, 8926.2234, -3.2, -8.8) * vec4(-265.957, _GLF_IDENTITY(20.16, float(mat4(20.16, 0.0, 0.0, 1.0, 0.0, sqrt(1.0), 0.0, 0.0, 0.0, sqrt(0.0), 1.0, sqrt(1.0), 1.0, cos(0.0), 0.0, 0.0))), -289.599, -8.5)) * mat3(-8510.4352, 4584.9807, -9384.3535, 60.69, -49.48, -8687.2182, 5284.6429, -2.4, 8.7)));
                                    vec2 GLF_live8grid = _GLF_FUZZED(vec2(-9979.5948, 375.449));
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            bool donor_replacementGLF_dead13c3 = _GLF_FUZZED(bool(GLF_live9MATRIX_N));
                                            if (!donor_replacementGLF_dead13c3) {
                                                ;
                                            }
                                        }
                                        int GLF_live8count = int(GLF_live8injectionSwitch.x);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            {
                                                ;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat3(0.0, 1.0, sqrt(1.0), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                            {
                                                int GLF_live14a = _GLF_FUZZED(16422);
                                                int GLF_live14b = _GLF_FUZZED(63007);
                                                vec2 GLF_live14uv = _GLF_FUZZED(vec2(-52.40, 976.578));
                                                {
                                                    int GLF_live14looplimiter1 = 0;
                                                    do {
                                                        if (GLF_live14looplimiter1 >= 3) {
                                                            break;
                                                        }
                                                        GLF_live14looplimiter1++;
                                                        {
                                                            GLF_live14uv.y -= step(GLF_live14injectionSwitch.y, GLF_live14uv.x) + float(GLF_live14a);
                                                            GLF_live14uv.x *= (isnan(GLF_live14uv.y) ? cosh(GLF_live14gl_FragCoord.y) : tanh(GLF_live14gl_FragCoord.x));
                                                            GLF_live14b--;
                                                        }
                                                    } while (GLF_live14b > int(GLF_live14injectionSwitch.x));
                                                }
                                            }
                                            int GLF_live8looplimiter4 = 0;
                                            do {
                                                if (GLF_live8looplimiter4 >= 5) {
                                                    {
                                                        int GLF_live15i = _GLF_FUZZED(53060);
                                                        if (GLF_live15i < int(GLF_live15gl_FragCoord.x)) {
                                                            ;
                                                        }
                                                    }
                                                    break;
                                                }
                                                GLF_live8looplimiter4++;
                                                {
                                                    GLF_live8color -= GLF_live8palette(vec3(float(GLF_live8obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live8injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live8injectionSwitch.x, float(GLF_live8obj.numbers[2]) * 0.1, float(GLF_live8obj.numbers[8]) * 0.1));
                                                    GLF_live8count++;
                                                }
                                            } while (GLF_live8count != GLF_live8obj.numbers[1]);
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    ;
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            GLF_live8grid += vec2(GLF_live8count + int(GLF_live8injectionSwitch.y), GLF_live8count + int(GLF_live8injectionSwitch.x));
                                        } else {
                                        }
                                    }
                                    {
                                        int GLF_live17i = _GLF_FUZZED(-8028);
                                        int GLF_live17j = _GLF_FUZZED(int(false));
                                        int GLF_live17k = _GLF_FUZZED(((true ? (-38685) : (-77592)) + (37885 + 63999)));
                                        {
                                            if (GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] < GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j, 10)]) {
                                                GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i++, 10)];
                                            } else {
                                                GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j++, 10)];
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return 1.0;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    bool donor_replacementGLF_dead13c1 = _GLF_FUZZED(false);
                                    if (!donor_replacementGLF_dead13c1) {
                                        ;
                                    }
                                }
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                return 1.0;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    bool donor_replacementGLF_dead13c5 = _GLF_FUZZED(((uvec2(24987u, 142330u) >> (93602u - uvec2(117558u, 187071u))) == uvec2(191141u, 72054u)));
                                    vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(vec2(-3.0, -2.1));
                                    vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(mix(vec3(449.707, -850.017, -81.33), vec3(-927.982, -940.913, 5.0), length(clamp(vec2(-0.1, -14.34), vec2(243.047, -9.4), injectionSwitch))));
                                    if (!donor_replacementGLF_dead13c5) {
                                        ;
                                    }
                                }
                            }
                        }
                        break;
                        {
                            {
                                ;
                            }
                        }
                    }
                }
            } else {
                if (mod(float(i), round(thirty_two)) <= 0.01) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        continue;
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) && true))) {
                        {
                            int GLF_live17looplimiter3 = 0;
                            if (GLF_live17looplimiter3 >= 3) {
                                ;
                            }
                        }
                        do {
                            discard;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead6high = _GLF_FUZZED(i);
                        int donor_replacementGLF_dead6i = _GLF_FUZZED(clamp(i, i, -84798));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            bool donor_replacementGLF_dead13c2 = _GLF_FUZZED(true);
                            if (!donor_replacementGLF_dead13c2) {
                                ;
                            }
                        }
                        int donor_replacementGLF_dead6m = _GLF_FUZZED((((-96265) << (-9706)) ^ (-92222)));
                        {
                            {
                                bool GLF_live16c1 = _GLF_FUZZED(false);
                                if (!GLF_live16c1) {
                                    ;
                                }
                            }
                            int GLF_dead6from = donor_replacementGLF_dead6i;
                            int GLF_dead6mid = donor_replacementGLF_dead6i + donor_replacementGLF_dead6m - 1;
                            int GLF_dead6to = min(donor_replacementGLF_dead6i + 2 * donor_replacementGLF_dead6m - 1, _GLF_IDENTITY(donor_replacementGLF_dead6high, int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ (donor_replacementGLF_dead6high)));
                            GLF_dead6merge(GLF_dead6from, GLF_dead6mid, GLF_dead6to);
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                            {
                                vec2 GLF_live16pos = _GLF_FUZZED((vec2(-813.178, 22.01)));
                                vec3 GLF_live16setting = _GLF_FUZZED(vec3(-8374.1957, 36.44, 189.443));
                                {
                                    ;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            {
                                vec2 GLF_live16pos = _GLF_FUZZED(vec2(-1425.4900, 5.2));
                                vec3 GLF_live16setting = _GLF_FUZZED(vec3(55.68, -5.1, -5118.2983));
                                {
                                    ;
                                }
                            }
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & 1)); _injected_loop_counter++) {
                                        return 1.0;
                                        {
                                            int GLF_live14a = _GLF_FUZZED(-49454);
                                            int GLF_live14b = _GLF_FUZZED(-57354);
                                            int GLF_live14looplimiter1 = 0;
                                            vec2 GLF_live14uv = _GLF_FUZZED(vec2(-5035.9822, 5.5));
                                            {
                                                if (GLF_live14looplimiter1 >= 3) {
                                                    ;
                                                }
                                                GLF_live14looplimiter1++;
                                                {
                                                    GLF_live14uv.y -= step(GLF_live14injectionSwitch.y, GLF_live14uv.x) + float(GLF_live14a);
                                                    GLF_live14uv.x *= (isnan(GLF_live14uv.y) ? cosh(GLF_live14gl_FragCoord.y) : tanh(GLF_live14gl_FragCoord.x));
                                                    GLF_live14b--;
                                                }
                                            }
                                        }
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            ;
                        }
                        if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) && _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            continue;
                        }
                        {
                            vec3 GLF_live8color = _GLF_FUZZED(vec3(-361.636, 756.452, 4.8));
                            vec2 GLF_live8grid = _GLF_FUZZED((vec2(0.6, -29.46) * (-mat2(4.4, -321.343, -267.230, -386.881))));
                            {
                                int GLF_live8count = int(GLF_live8injectionSwitch.x);
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        bool donor_replacementGLF_dead13c3 = _GLF_FUZZED(bool((109796u & 4146u)));
                                        if (!donor_replacementGLF_dead13c3) {
                                            ;
                                        }
                                    }
                                    {
                                        vec2 GLF_live17color = _GLF_FUZZED((1299.0720 * vec2(105.292, 79.93)));
                                        int GLF_live17i = _GLF_FUZZED(int((vec2(vec4(207.236, -58.86, 21.94, -395.742)) == (mat4x2(939.549, -9.8, -678.420, 6869.7149, 784.203, -5726.7766, -90.90, -6.0) * vec4(3053.4555, 8807.5344, -44.78, 5951.8461)))));
                                        int GLF_live17looplimiter7 = 0;
                                        vec3 GLF_live17vecCoor = _GLF_FUZZED((vec4(-998.597, -2.4, -65.48, 3468.8277) * mat3x4(-8.4, -8320.5648, 79.69, -2.8, -422.409, -1250.1616, -0.3, -7805.0951, -7.4, -8.1, -8694.6775, 24.64)));
                                        do {
                                            if (GLF_live17looplimiter7 >= 3) {
                                                break;
                                            }
                                            GLF_live17looplimiter7++;
                                            {
                                                if (int(GLF_live17gl_FragCoord[1]) < 30) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[0]))));
                                                    GLF_live17color[0] = dFdy(GLF_live17gl_FragCoord.y);
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 60) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[1]))));
                                                    GLF_live17color[1] *= atan(faceforward(GLF_live17injectionSwitch, GLF_live17color.xx, GLF_live17vecCoor.yx).y);
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 90) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[2]))));
                                                    GLF_live17color.x += atanh(GLF_live17color.x) * cosh(GLF_live17injectionSwitch.y) * smoothstep(GLF_live17color, GLF_live17injectionSwitch, GLF_live17gl_FragCoord.yy).x;
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 120) {
                                                    GLF_live17color = fract(acosh(clamp(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[3])), 1.0, 1000.0)));
                                                    GLF_live17color.x += (isnan(GLF_live17gl_FragCoord.x) ? log2(GLF_live17gl_FragCoord.x) : log2(GLF_live17gl_FragCoord.y));
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 150) {
                                                    ;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 180) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[4]))));
                                                    GLF_live17color[1] += asinh(GLF_live17gl_FragCoord.y * ldexp(GLF_live17color.y, -GLF_live17i));
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 210) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[5]))));
                                                    GLF_live17color.y -= tanh(GLF_live17color.x) / cosh(GLF_live17color.y);
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 240) {
                                                    GLF_live17color = fract(asinh(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[6]))));
                                                    GLF_live17color.y -= isnan(float(GLF_live17i)) ? tanh(GLF_live17gl_FragCoord.x) : atanh(GLF_live17gl_FragCoord.y);
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 270) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[7]))));
                                                    GLF_live17color.y *= mix(normalize(GLF_live17vecCoor), normalize(vec3(GLF_live17color, degrees(GLF_live17color.x))), GLF_live17injectionSwitch.x).y;
                                                    break;
                                                } else {
                                                    ;
                                                }
                                            }
                                        } while (0 == int(GLF_live17injectionSwitch.x));
                                    }
                                    int GLF_live8looplimiter4 = 0;
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    do {
                                        do {
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            if (GLF_live8looplimiter4 >= 5) {
                                                break;
                                            }
                                            GLF_live8looplimiter4++;
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                                                continue;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    bool donor_replacementGLF_dead13c4 = _GLF_FUZZED(bool(48271u));
                                                    if (!donor_replacementGLF_dead13c4) {
                                                        ;
                                                    }
                                                }
                                            }
                                            {
                                                GLF_live8color -= GLF_live8palette(vec3(float(GLF_live8obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(int(GLF_live8injectionSwitch.y), 1 * (int(GLF_live8injectionSwitch.y))), 10)]) * 0.1), vec3(GLF_live8injectionSwitch.x, float(GLF_live8obj.numbers[2]) * 0.1, _GLF_IDENTITY(float(GLF_live8obj.numbers[8]) * 0.1, min(float(GLF_live8obj.numbers[8]) * 0.1, _GLF_IDENTITY(float(GLF_live8obj.numbers[8]) * 0.1, max(float(GLF_live8obj.numbers[8]) * 0.1, float(GLF_live8obj.numbers[8]) * 0.1))))));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    } else {
                                                        discard;
                                                    }
                                                }
                                                GLF_live8count++;
                                                {
                                                    int GLF_live17looplimiter5 = 0;
                                                    if (GLF_live17looplimiter5 >= 3) {
                                                        ;
                                                    }
                                                }
                                            }
                                            for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), 0 | (int(4))))) >> _GLF_IDENTITY(int(4), int(4))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            }
                                        } while (GLF_live8count != GLF_live8obj.numbers[_GLF_IDENTITY(1, max(1, 1))]);
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    {
                                        vec2 GLF_live16pos = _GLF_FUZZED(vec2(9143.9079, 7.0));
                                        vec3 GLF_live16setting = _GLF_FUZZED(vec3(0.9, 3499.3959, 4.7));
                                        {
                                            ;
                                        }
                                    }
                                }
                                GLF_live8grid += vec2(GLF_live8count + int(GLF_live8injectionSwitch.y), GLF_live8count + int(_GLF_IDENTITY(GLF_live8injectionSwitch, mix(vec2(_GLF_FUZZED(-0.0), (GLF_live8injectionSwitch)[1]), vec2(_GLF_IDENTITY((GLF_live8injectionSwitch)[0], ((GLF_live8injectionSwitch)[0]) - 0.0), _GLF_FUZZED(vec2(-1517.9464, 502.415).y)), bvec2(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), false))).x));
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        {
                            int GLF_live14a = _GLF_FUZZED(-20815);
                            int GLF_live14b = _GLF_FUZZED((-30313));
                            int GLF_live14c = _GLF_FUZZED((82774 + (-46904)));
                            vec2 GLF_live14uv = _GLF_FUZZED(vec4(2.2, 9.7, 4.9, 6.9).zw);
                            {
                                int GLF_live14looplimiter2 = 0;
                                do {
                                    if (GLF_live14looplimiter2 >= 3) {
                                        break;
                                    }
                                    GLF_live14looplimiter2++;
                                    {
                                        GLF_live14uv.y -= step(GLF_live14injectionSwitch.y, GLF_live14uv.x) + float(GLF_live14a) + float(GLF_live14b);
                                        GLF_live14uv.x += ldexp(GLF_live14injectionSwitch.y, isinf(GLF_live14uv.y + GLF_live14uv.x) ? findMSB(GLF_live14b) : findMSB(GLF_live14a));
                                        GLF_live14c--;
                                    }
                                } while (GLF_live14c > int(GLF_live14injectionSwitch.x));
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED((limit / _GLF_IDENTITY(injectionSwitch, (injectionSwitch) - log(vec2(1.0, 1.0)))));
                        {
                            vec3 GLF_live8color = _GLF_FUZZED((((-2.8) + (vec3(-4.6, 8.8, 869.206) * 1262.6819))));
                            int GLF_live8count = _GLF_FUZZED(-67923);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                    discard;
                                }
                            }
                            {
                                vec2 GLF_live17color = _GLF_FUZZED(vec2(187.957, -0.7));
                                vec3 GLF_live17vecCoor = _GLF_FUZZED(vec3(vec4(-6241.7273, 6.8, -2.3, -36.86)));
                                {
                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[1]))));
                                    GLF_live17color[1] *= atan(faceforward(GLF_live17injectionSwitch, GLF_live17color.xx, GLF_live17vecCoor.yx).y);
                                    ;
                                }
                            }
                            int GLF_live8looplimiter5 = 0;
                            {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                {
                                    int GLF_live17high = _GLF_FUZZED(((-7033) | (-8091)));
                                    int GLF_live17looplimiter3 = 0;
                                    int GLF_live17low = _GLF_FUZZED(-25740);
                                    int GLF_live17m = _GLF_FUZZED(ivec3(-28065, -76401, -84490).b);
                                    for (int GLF_live17i = GLF_live17low; GLF_live17i < GLF_live17high; GLF_live17i += 2 * GLF_live17m) {
                                        if (GLF_live17looplimiter3 >= 3) {
                                            break;
                                        }
                                        GLF_live17looplimiter3++;
                                        {
                                            int GLF_live17from = GLF_live17i;
                                            int GLF_live17mid = GLF_live17i + GLF_live17m - 1;
                                            int GLF_live17to = min(GLF_live17i + 2 * GLF_live17m - 1, GLF_live17high);
                                            GLF_live17merge(GLF_live17from, GLF_live17mid, GLF_live17to);
                                        }
                                    }
                                }
                                if (GLF_live8looplimiter5 >= 5) {
                                    {
                                        vec2 GLF_live16center = _GLF_FUZZED((vec4(-5.1, -4.4, 5242.2656, 947.158) * mat2x4(-6.4, 7903.7450, 1372.5419, 47.27, -11.92, -88.26, 9.6, -88.43)));
                                        vec2 GLF_live16position = _GLF_FUZZED(vec2(76.63, 3.8));
                                        vec3 GLF_live16result = _GLF_FUZZED((vec4(-4.2, -79.59, -2.3, 40.12) * mat3x4(1.8, 8.9, -5.7, 5.8, 3.8, -3.1, -897.360, -55.10, -136.235, -892.376, -7.0, -4.8)));
                                        {
                                            int GLF_live16looplimiter0 = 0;
                                            for (int GLF_live16i = 35; GLF_live16i >= 0; GLF_live16i--) {
                                                if (GLF_live16looplimiter0 >= 7) {
                                                    break;
                                                }
                                                GLF_live16looplimiter0++;
                                                {
                                                    vec3 GLF_live16d = _GLF_FUZZED(vec3(315.191, -5987.1181, 86.46));
                                                    GLF_live16d = GLF_live16drawShape(GLF_live16position, GLF_live16center + vec2(sin(float(GLF_live16i) / 10.0 + GLF_live16time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live16i) / 100.0), 0.01, float(GLF_live16i)));
                                                    if (length(GLF_live16d) <= 0.0) {
                                                        continue;
                                                    }
                                                    GLF_live16result = vec3(GLF_live16d);
                                                }
                                            }
                                        }
                                    }
                                    ;
                                }
                                GLF_live8looplimiter5++;
                                {
                                    GLF_live8color -= GLF_live8palette(vec3(float(GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live8injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live8injectionSwitch.x, 0.6, float(GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(_GLF_IDENTITY(GLF_live8injectionSwitch, min(GLF_live8injectionSwitch, GLF_live8injectionSwitch)).x), 10)]) * 0.1));
                                    GLF_live8count++;
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true))) {
                            continue;
                        }
                        if (donor_replacementGLF_dead3coord.y > 1.0)
                            donor_replacementGLF_dead3coord.y -= 1.0;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(0.0))))) {
                            discard;
                        } else {
                        }
                    }
                    {
                        float GLF_live9alpha3 = _GLF_FUZZED(float(false));
                        if (_GLF_DEAD(false)) {
                            {
                                vec2 GLF_live17color = _GLF_FUZZED(((-1.6) + vec2(85.46, 304.986)));
                                int GLF_live17i = _GLF_FUZZED(((-27860) - 43818));
                                vec3 GLF_live17vecCoor = _GLF_FUZZED(vec4(-9873.0649, 95.19, -685.488, 3.4).qpq);
                                {
                                    GLF_live17color = fract(asinh(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[6]))));
                                    GLF_live17color.y -= isnan(float(GLF_live17i)) ? tanh(GLF_live17gl_FragCoord.x) : atanh(GLF_live17gl_FragCoord.y);
                                    ;
                                }
                            }
                            discard;
                        }
                        int GLF_live9j = _GLF_FUZZED((59410));
                        int GLF_live9k = _GLF_FUZZED(-16674);
                        int GLF_live9looplimiter2 = 0;
                        mat4 GLF_live9matrix_a = _GLF_FUZZED(mat4(mat3x4(504.968, -6.0, 0.1, -2998.1953, -79.13, 5424.4120, 3.7, -4.2, -8084.0759, 88.00, 0.4, 5.9)));
                        vec4 GLF_live9matrix_u = _GLF_FUZZED(vec4(5.6, -3.4, 1.4, -1.6));
                        for (int GLF_live9a = GLF_live9MATRIX_N - 1; GLF_live9a >= GLF_live9k; GLF_live9a--) {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_IDENTITY(GLF_live9looplimiter2 >= 4, bool(_GLF_IDENTITY(bvec2(GLF_live9looplimiter2 >= 4, false), bvec2(bvec4(bvec2(GLF_live9looplimiter2 >= 4, false), false, false)))))) {
                                break;
                            }
                            {
                                {
                                    ;
                                }
                            }
                            GLF_live9looplimiter2++;
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            {
                                GLF_live9alpha3 += GLF_live9matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9a, 4)] * GLF_live9matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 4)];
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, max(injectionSwitch.y, injectionSwitch.y)))))) {
                        {
                            int GLF_live7cols = _GLF_FUZZED(ivec4(-74347, 54133, 25469, -19292).a);
                            int GLF_live7looplimiter3 = 0;
                            uint GLF_live7matrix_number = _GLF_FUZZED(167443u);
                            {
                                if (GLF_live7looplimiter3 >= 3) {
                                    {
                                        vec2 GLF_live17color = _GLF_FUZZED((mat2(7.8, -61.39, 16.70, 5.6) * vec2(28.51, -4120.5897)));
                                        int GLF_live17i = _GLF_FUZZED(ivec3(48707, -6564, 72531).x);
                                        int GLF_live17looplimiter7 = 0;
                                        vec3 GLF_live17vecCoor = _GLF_FUZZED(vec3(37.85));
                                        do {
                                            if (GLF_live17looplimiter7 >= 3) {
                                                break;
                                            }
                                            GLF_live17looplimiter7++;
                                            {
                                                if (int(GLF_live17gl_FragCoord[1]) < 30) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[0]))));
                                                    GLF_live17color[0] = dFdy(GLF_live17gl_FragCoord.y);
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 60) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[1]))));
                                                    GLF_live17color[1] *= atan(faceforward(GLF_live17injectionSwitch, GLF_live17color.xx, GLF_live17vecCoor.yx).y);
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 90) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[2]))));
                                                    GLF_live17color.x += atanh(GLF_live17color.x) * cosh(GLF_live17injectionSwitch.y) * smoothstep(GLF_live17color, GLF_live17injectionSwitch, GLF_live17gl_FragCoord.yy).x;
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 120) {
                                                    GLF_live17color = fract(acosh(clamp(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[3])), 1.0, 1000.0)));
                                                    GLF_live17color.x += (isnan(GLF_live17gl_FragCoord.x) ? log2(GLF_live17gl_FragCoord.x) : log2(GLF_live17gl_FragCoord.y));
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 150) {
                                                    ;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 180) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[4]))));
                                                    GLF_live17color[1] += asinh(GLF_live17gl_FragCoord.y * ldexp(GLF_live17color.y, -GLF_live17i));
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 210) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[5]))));
                                                    GLF_live17color.y -= tanh(GLF_live17color.x) / cosh(GLF_live17color.y);
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 240) {
                                                    GLF_live17color = fract(asinh(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[6]))));
                                                    GLF_live17color.y -= isnan(float(GLF_live17i)) ? tanh(GLF_live17gl_FragCoord.x) : atanh(GLF_live17gl_FragCoord.y);
                                                    break;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 270) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[7]))));
                                                    GLF_live17color.y *= mix(normalize(GLF_live17vecCoor), normalize(vec3(GLF_live17color, degrees(GLF_live17color.x))), GLF_live17injectionSwitch.x).y;
                                                    break;
                                                } else {
                                                    ;
                                                }
                                            }
                                        } while (0 == int(GLF_live17injectionSwitch.x));
                                    }
                                    ;
                                }
                                GLF_live7looplimiter3++;
                                if (_GLF_DEAD(false)) {
                                    return 1.0;
                                }
                                {
                                    {
                                        int GLF_live7looplimiter2 = 0;
                                        for (int GLF_live7rows = 2; GLF_live7rows <= 4; GLF_live7rows++) {
                                            if (GLF_live7looplimiter2 >= 3) {
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                break;
                                                if (_GLF_DEAD(false)) {
                                                    return 1.0;
                                                }
                                            }
                                            GLF_live7looplimiter2++;
                                            {
                                                {
                                                    int GLF_live7looplimiter1 = 0;
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    for (int GLF_live7c = 0; GLF_live7c < GLF_live7cols; GLF_live7c++) {
                                                        if (GLF_live7looplimiter1 >= 3) {
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                break;
                                                            }
                                                            break;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                vec2 GLF_live16center = _GLF_FUZZED(((vec2(-5786.8671, 8084.9153) * mat2(2349.9989, -7.3, -1372.5445, 111.143)) * 22.26).ts);
                                                                vec2 GLF_live16position = _GLF_FUZZED((vec4(8181.2501, -99.93, -95.03, 2937.7345).bg));
                                                                vec3 GLF_live16result = _GLF_FUZZED(((vec2(757.937, 3.7) * (-6.3)) * mat3x2(-229.716, 0.6, -1200.4980, 3.3, 4.3, 2884.0720)));
                                                                {
                                                                    int GLF_live16looplimiter0 = 0;
                                                                    for (int GLF_live16i = 35; GLF_live16i >= 0; GLF_live16i--) {
                                                                        if (GLF_live16looplimiter0 >= 7) {
                                                                            break;
                                                                        }
                                                                        GLF_live16looplimiter0++;
                                                                        {
                                                                            vec3 GLF_live16d = _GLF_FUZZED(vec3(315.191, -5987.1181, 86.46));
                                                                            GLF_live16d = GLF_live16drawShape(GLF_live16position, GLF_live16center + vec2(sin(float(GLF_live16i) / 10.0 + GLF_live16time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live16i) / 100.0), 0.01, float(GLF_live16i)));
                                                                            if (length(GLF_live16d) <= 0.0) {
                                                                                continue;
                                                                            }
                                                                            GLF_live16result = vec3(GLF_live16d);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            return 1.0;
                                                        }
                                                        GLF_live7looplimiter1++;
                                                        {
                                                            {
                                                                int GLF_live7looplimiter0 = 0;
                                                                for (int GLF_live7r = 0; GLF_live7r < GLF_live7rows; GLF_live7r++) {
                                                                    if (GLF_live7looplimiter0 >= 3) {
                                                                        break;
                                                                        {
                                                                            {
                                                                                ;
                                                                            }
                                                                        }
                                                                        if (_GLF_DEAD(false)) {
                                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (1 ^ (1 & 1))); _injected_loop_counter--) {
                                                                                if (_GLF_DEAD(false)) {
                                                                                    bool donor_replacementGLF_dead13c2 = _GLF_FUZZED((mat3x2(45.77, -84.27, -0.3, 78.86, 18.78, -3.3) == mat3x2(32.74, -18.62, 9337.4701, 6.0, -8358.1385, 536.678)));
                                                                                    if (!donor_replacementGLF_dead13c2) {
                                                                                        ;
                                                                                    }
                                                                                }
                                                                                return 1.0;
                                                                            }
                                                                        }
                                                                    }
                                                                    GLF_live7looplimiter0++;
                                                                    {
                                                                        {
                                                                            ;
                                                                        }
                                                                    }
                                                                    {
                                                                        switch (GLF_live7matrix_number) {
                                                                            case 0u:
                                                                                GLF_live7m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 2)] = GLF_live7one;
                                                                                break;
                                                                                if (_GLF_DEAD(false)) {
                                                                                    return 1.0;
                                                                                }
                                                                                if (_GLF_DEAD(false)) {
                                                                                    {
                                                                                        {
                                                                                            int GLF_live14a = _GLF_FUZZED(73913);
                                                                                            vec2 GLF_live14uv = _GLF_FUZZED(vec2(9.9, 4.1));
                                                                                            {
                                                                                                int GLF_live14looplimiter0 = 0;
                                                                                                do {
                                                                                                    if (GLF_live14looplimiter0 >= 3) {
                                                                                                        break;
                                                                                                    }
                                                                                                    GLF_live14looplimiter0++;
                                                                                                    {
                                                                                                        GLF_live14uv.y -= step(GLF_live14injectionSwitch.y, GLF_live14uv.x);
                                                                                                        GLF_live14uv.x -= fract(tanh(GLF_live14uv.x)) / ldexp(GLF_live14injectionSwitch.y, findMSB(GLF_live14a));
                                                                                                        GLF_live14a--;
                                                                                                    }
                                                                                                } while (GLF_live14a > int(GLF_live14injectionSwitch.x));
                                                                                            }
                                                                                        }
                                                                                        continue;
                                                                                    }
                                                                                }
                                                                            case 1u:
                                                                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, (false) && true)))))) {
                                                                                    return 1.0;
                                                                                }
                                                                                GLF_live7m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 3)] = GLF_live7one;
                                                                                break;
                                                                            case 2u:
                                                                                _GLF_IDENTITY(GLF_live7m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = GLF_live7one, (true ? _GLF_IDENTITY(GLF_live7m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = GLF_live7one, (true ? (GLF_live7m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = GLF_live7one) : _GLF_FUZZED(GLF_live7one))) : _GLF_FUZZED(-626.235)));
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                    continue;
                                                                                }
                                                                                break;
                                                                            case 3u:
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                    discard;
                                                                                    {
                                                                                        int GLF_live17i = _GLF_FUZZED(int(false));
                                                                                        int GLF_live17k = _GLF_FUZZED(-30533);
                                                                                        {
                                                                                            GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i++, 10)];
                                                                                        }
                                                                                    }
                                                                                }
                                                                                GLF_live7m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 2)] = GLF_live7one;
                                                                                break;
                                                                            case 4u:
                                                                                GLF_live7m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 3)] = GLF_live7one;
                                                                                break;
                                                                                {
                                                                                    int GLF_live14a = _GLF_FUZZED(-86115);
                                                                                    int GLF_live14b = _GLF_FUZZED(3816);
                                                                                    int GLF_live14c = _GLF_FUZZED((~(-27151)));
                                                                                    int GLF_live14d = _GLF_FUZZED(68727);
                                                                                    vec2 GLF_live14uv = _GLF_FUZZED(vec3(7.3, 4449.9666, -913.822).sp);
                                                                                    {
                                                                                        GLF_live14uv.y -= step(GLF_live14injectionSwitch.y, GLF_live14uv.x) + float(GLF_live14a) + float(GLF_live14b) + float(GLF_live14c);
                                                                                        GLF_live14d--;
                                                                                    }
                                                                                }
                                                                            case 5u:
                                                                                GLF_live7m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = GLF_live7one;
                                                                                break;
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                    {
                                                                                        continue;
                                                                                    }
                                                                                }
                                                                            case 6u:
                                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                                    GLF_live7m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 2)] = GLF_live7one;
                                                                                }
                                                                                if (_GLF_DEAD(false)) {
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        int donor_replacementGLF_dead13msb8 = _GLF_FUZZED(GLF_live9MATRIX_N);
                                                                                        vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(GLF_live10resolution);
                                                                                        vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(vec3(-39.72, 0.2, -3675.4036));
                                                                                        {
                                                                                            ;
                                                                                        }
                                                                                    }
                                                                                    continue;
                                                                                }
                                                                                break;
                                                                                if (_GLF_DEAD(false)) {
                                                                                    int donor_replacementGLF_dead13msb8 = _GLF_FUZZED(GLF_live9MATRIX_N);
                                                                                    vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(injectionSwitch);
                                                                                    vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(vec3(-7.8, 4.1, 382.695));
                                                                                    {
                                                                                        ;
                                                                                    }
                                                                                }
                                                                            case 7u:
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                    int donor_replacementGLF_dead13msb8 = _GLF_FUZZED(GLF_live7looplimiter2);
                                                                                    vec2 donor_replacementGLF_dead13position = _GLF_FUZZED(GLF_live8injectionSwitch);
                                                                                    if (abs(donor_replacementGLF_dead13position.y - donor_replacementGLF_dead13position.x) < 0.5) {
                                                                                        GLF_dead13b_b = clamp(float(bitfieldExtract(int(GLF_dead13resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead13msb8)), GLF_dead13b_b * float(bitCount(donor_replacementGLF_dead13msb8)) * 3.0);
                                                                                    }
                                                                                }
                                                                                GLF_live7m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 3)] = GLF_live7one;
                                                                                break;
                                                                            case 8u:
                                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                } else {
                                                                                    GLF_live7m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = GLF_live7one;
                                                                                }
                                                                                break;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    int donor_replacementGLF_dead13msb8 = _GLF_FUZZED(GLF_live7looplimiter2);
                                                    {
                                                        GLF_dead13b_b = clamp(float(bitfieldExtract(int(GLF_dead13resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead13msb8)), GLF_dead13b_b * float(bitCount(donor_replacementGLF_dead13msb8)) * 3.0);
                                                    }
                                                }
                                                GLF_live7matrix_number = GLF_live7matrix_number + 1u;
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    continue;
                                }
                            }
                        }
                    } else {
                        result += 100.0;
                    }
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                    }
                }
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead13c7 = _GLF_FUZZED(any(bvec2(true, false)));
                    vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(vec2(696.532, -744.341));
                    vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(vec3(-9700.8655, -790.362, 6.0));
                    if (!donor_replacementGLF_dead13c7) {
                        ;
                    }
                    {
                        bool GLF_live16c6 = _GLF_FUZZED((mat4(-8873.8010, 1572.2517, 6671.6693, 62.34, 5904.4168, 9.8, 8.7, 35.73, -8.6, -6.7, 2614.2592, 8.9, -8317.2997, 59.70, 3.0, 7934.4327) == mat4(68.59, -49.89, -354.826, -7.1, -12.93, 1.2, 637.436, 25.02, -9.3, 56.57, 4826.9748, 9015.9468, -1.1, 6.9, -8.9, -6447.1921)));
                        vec2 GLF_live16pos = _GLF_FUZZED(((-vec2(-301.421, 5.1)) - vec2(9649.7491, 45.17)));
                        vec3 GLF_live16setting = _GLF_FUZZED(vec3(2.5, 77.74, -9.4));
                        if (!GLF_live16c6) {
                            ;
                        }
                    }
                }
                {
                    int GLF_live14looplimiter1 = 0;
                    if (GLF_live14looplimiter1 >= 3) {
                        ;
                    }
                }
                {
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead13c8 = _GLF_FUZZED(true);
                        int donor_replacementGLF_dead13msb8 = _GLF_FUZZED(i);
                        vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(acosh(injectionSwitch));
                        vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(vec3(95.31, -2499.6456, -7.0));
                        if (!donor_replacementGLF_dead13c8) {
                            ;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0))))))) {
                            } else {
                                discard;
                            }
                        }
                    } else {
                    }
                    vec2 GLF_live1coord = _GLF_FUZZED(_GLF_IDENTITY((+vec2(-4.6, 5.1)), vec2(0.0, 0.0) + ((+vec2(-4.6, 5.1)))));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return 1.0;
                    }
                    {
                        vec2 GLF_live16position = _GLF_FUZZED(((vec2(-1.5, 2.5) + vec2(-6838.7740, -58.32)) + vec2(-3.3, 13.09)));
                        if (abs(GLF_live16position.y - GLF_live16position.x) < 0.5) {
                            GLF_live16b_b = clamp(0.0, 1.0, GLF_live16b_b * 3.0);
                        }
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            float donor_replacementGLF_dead5y = _GLF_FUZZED(limit);
                            if (limit * limit + donor_replacementGLF_dead5y * donor_replacementGLF_dead5y > 4.0) {
                                break;
                            }
                        }
                        {
                            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                {
                                    {
                                        ;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(dFdy(resolution));
                                    vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(vec3(6900.9429, -449.434, 19.09));
                                    {
                                        {
                                            bool GLF_live16c3 = _GLF_FUZZED(((-36121) == (-9158)));
                                            if (!GLF_live16c3) {
                                                ;
                                            }
                                        }
                                        ;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return 1.0;
                                }
                            }
                            vec3 GLF_live8color = _GLF_FUZZED((vec3(1774.3830, -4.7, 55.56) - 0.2));
                            int GLF_live8count = _GLF_FUZZED(((-35343) & 90339));
                            {
                                GLF_live8color += GLF_live8palette(vec3(0.5, float(GLF_live8obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(_GLF_IDENTITY(GLF_live8injectionSwitch, abs(vec2(0.0, 0.0)) + (GLF_live8injectionSwitch)).y)), vec3(float(GLF_live8obj.numbers[4]) * 0.1, GLF_live8injectionSwitch.x, 0.6));
                                GLF_live8count++;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return 1.0;
                            }
                        }
                        uvec2 GLF_live1icoord = _GLF_IDENTITY(uvec2(_GLF_IDENTITY(((GLF_live1coord - vec2(0.4, 0.0)) * _GLF_IDENTITY(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), clamp(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6)))))) * 256.0, (((GLF_live1coord - vec2(0.4, 0.0)) * _GLF_IDENTITY(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), clamp(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6)))))) * 256.0) / vec2(1.0, 1.0))), min(uvec2(_GLF_IDENTITY(((GLF_live1coord - vec2(0.4, 0.0)) * _GLF_IDENTITY(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), clamp(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6)))))) * 256.0, (_GLF_IDENTITY(((GLF_live1coord - vec2(0.4, 0.0)) * _GLF_IDENTITY(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), clamp(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6)))))), _GLF_IDENTITY((((GLF_live1coord - vec2(0.4, 0.0)) * _GLF_IDENTITY(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), clamp(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))))))) * mat2(_GLF_ONE(1.0, injectionSwitch.y)), max((((GLF_live1coord - vec2(0.4, 0.0)) * _GLF_IDENTITY(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), clamp(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))))))) * mat2(_GLF_ONE(1.0, injectionSwitch.y)), (((GLF_live1coord - vec2(0.4, 0.0)) * _GLF_IDENTITY(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), clamp(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))))))) * mat2(_GLF_ONE(1.0, injectionSwitch.y))))) * 256.0) / vec2(1.0, 1.0))), uvec2(_GLF_IDENTITY(((GLF_live1coord - vec2(0.4, 0.0)) * _GLF_IDENTITY(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), clamp(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6)))))) * 256.0, (((GLF_live1coord - vec2(0.4, 0.0)) * _GLF_IDENTITY(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), clamp(vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(_GLF_IDENTITY(1.0 / 0.4, _GLF_IDENTITY(float(_GLF_IDENTITY(float(1.0 / 0.4), mix(float(float(1.0 / 0.4)), float(_GLF_FUZZED(-42.14)), bool(false)))), min(float(_GLF_IDENTITY(float(1.0 / 0.4), mix(float(float(1.0 / 0.4)), float(_GLF_FUZZED(-42.14)), bool(false)))), float(_GLF_IDENTITY(float(1.0 / 0.4), mix(float(float(1.0 / 0.4)), float(_GLF_FUZZED(-42.14)), bool(false))))))), _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6))), vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, clamp(1.0 / 0.6, 1.0 / 0.6, 1.0 / 0.6)))))) * 256.0) / vec2(1.0, 1.0)))));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                            {
                                {
                                    ;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false || (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) {
                            discard;
                        }
                        {
                            int GLF_live8looplimiter3 = 0;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                            }
                            if (GLF_live8looplimiter3 >= 5) {
                                ;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                bool donor_replacementGLF_dead13c6 = _GLF_FUZZED(((true ? (-mat2(0.8, 2.8, 3.0, 577.326)) : GLF_live7m22) == (-mat2(-4.5, -272.336, -83.35, 8038.5425))));
                                int donor_replacementGLF_dead13msb8 = _GLF_FUZZED((bitfieldReverse(GLF_live9MATRIX_N) | 84354));
                                vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(GLF_live10resolution);
                                vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED((617.515 * _GLF_color).qss);
                                if (!donor_replacementGLF_dead13c6) {
                                    ;
                                    {
                                        bool GLF_live16c5 = _GLF_FUZZED((ivec2(-17262, -36181) == (ivec2(51141, -27173) + 67468)));
                                        vec2 GLF_live16pos = _GLF_FUZZED((vec4(-89.57, -59.89, 2675.4255, -4.3).w - vec2(2805.7907, 94.91)));
                                        vec3 GLF_live16setting = _GLF_FUZZED((vec3(-387.723, -8334.6232, -67.59) * 2.5));
                                        if (!GLF_live16c5) {
                                            ;
                                        }
                                    }
                                }
                            }
                            do {
                                if (_GLF_DEAD(false)) {
                                    bool donor_replacementGLF_dead13c5 = _GLF_FUZZED(false);
                                    vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(vec3(GLF_live7one, thirty_two, determinant(mat2(-0.3, 323.749, -391.687, -82.45))));
                                    if (!donor_replacementGLF_dead13c5) {
                                        ;
                                    }
                                }
                                {
                                    int GLF_live14a = _GLF_FUZZED(ivec4(-48837, 66873, 55683, -84287).y);
                                    int GLF_live14b = _GLF_FUZZED((10877 ^ (-65083)));
                                    int GLF_live14c = _GLF_FUZZED(ivec2(-6295, -69388).t);
                                    int GLF_live14looplimiter2 = 0;
                                    vec2 GLF_live14uv = _GLF_FUZZED(((vec2(-2780.6352, 9.4) * mat2(40.15, 22.44, -20.90, 5.0)) * mat2(222.636, 7.5, -8.5, 3975.5671)));
                                    {
                                        if (GLF_live14looplimiter2 >= 3) {
                                            ;
                                        }
                                        GLF_live14looplimiter2++;
                                        {
                                            GLF_live14uv.y -= step(GLF_live14injectionSwitch.y, GLF_live14uv.x) + float(GLF_live14a) + float(GLF_live14b);
                                            GLF_live14uv.x += ldexp(GLF_live14injectionSwitch.y, isinf(GLF_live14uv.y + GLF_live14uv.x) ? findMSB(GLF_live14b) : findMSB(GLF_live14a));
                                            GLF_live14c--;
                                        }
                                    }
                                }
                                discard;
                            } while (_GLF_WRAPPED_LOOP(false));
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead14j = _GLF_FUZZED(i);
                                if (donor_replacementGLF_dead14j < i + 1) {
                                    continue;
                                }
                            }
                        }
                        uint GLF_live1res1 = uint(((GLF_live1icoord.x * GLF_live1icoord.y) >> (GLF_live1icoord.x & 31u)) & 0xffffffffu);
                        if (_GLF_DEAD(false)) {
                            continue;
                            if (_GLF_DEAD(false)) {
                                {
                                    continue;
                                }
                            }
                        }
                        uint GLF_live1res2 = uint(((GLF_live1icoord.x * GLF_live1icoord.y) << (_GLF_IDENTITY(GLF_live1icoord, (_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) | uvec2(0u, 0u))) + uvec2(0u, 0u)).x & 31u)) & 0xffffffffu);
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    {
                                        bool GLF_live16c8 = _GLF_FUZZED(true);
                                        vec2 GLF_live16pos = _GLF_FUZZED(vec3(-973.549, -11.21, -550.942).bb);
                                        vec3 GLF_live16setting = _GLF_FUZZED(vec3(-4.7, -30.84, 0.7));
                                        if (!GLF_live16c8) {
                                            ;
                                        }
                                    }
                                    {
                                        {
                                            vec2 GLF_live16position = _GLF_FUZZED(vec2(0.1, 4.0));
                                            if (abs(GLF_live16position.y - GLF_live16position.x) < 0.5) {
                                                GLF_live16b_b = clamp(0.0, 1.0, GLF_live16b_b * 3.0);
                                            }
                                        }
                                        continue;
                                    }
                                }
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                    discard;
                                }
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(0.0, 1.0, 1.0, length(vec3(0.0, 0.0, 0.0)), 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                        return 1.0;
                                    }
                                    float GLF_live9alpha1 = _GLF_FUZZED(-1252.5131);
                                    {
                                        bool GLF_live16c5 = _GLF_FUZZED((false ? true : (mat4x2(-956.067, 7.8, -3341.8398, 92.31, -9.7, 9.3, 2.4, 8885.4240) != mat4x2(-9.5, 39.61, -7.8, -16.51, 43.11, 52.40, -6.9, 105.467))));
                                        vec2 GLF_live16pos = _GLF_FUZZED(vec2(8.0, -3330.8011));
                                        vec3 GLF_live16setting = _GLF_FUZZED(vec3(-520.726, 810.109, 597.987));
                                        if (!GLF_live16c5) {
                                            ;
                                        }
                                    }
                                    vec4 GLF_live9matrix_u = _GLF_FUZZED(vec4(-688.994, -2.9, -6.7, -8833.7323));
                                    int GLF_live9u = _GLF_FUZZED(int(uvec4(112148u, 40157u, 78424u, 92548u).w));
                                    {
                                        GLF_live9alpha1 += pow(GLF_live9matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9u, 4)], 2.0);
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                        float GLF_live1res = float(_GLF_IDENTITY(((GLF_live1res2 & 0x80000000u) != 0u ? _GLF_IDENTITY(1u, (_GLF_IDENTITY(1u, ~(_GLF_IDENTITY(~(1u), ~(~(~(1u))))))) << (0u >> _GLF_IDENTITY(uint(0u), _GLF_IDENTITY(uint(0u), max(uint(0u), uint(0u)))))) : 0u), min(((GLF_live1res2 & 0x80000000u) != 0u ? _GLF_IDENTITY(1u, (_GLF_IDENTITY(1u, ~(_GLF_IDENTITY(~(1u), ~(~(~(1u))))))) << (0u >> _GLF_IDENTITY(uint(0u), _GLF_IDENTITY(uint(0u), max(uint(0u), uint(0u)))))) : 0u), ((_GLF_IDENTITY(GLF_live1res2, (GLF_live1res2) * 1u) & 0x80000000u) != _GLF_IDENTITY(0u, 0u | (_GLF_IDENTITY(0u, min(0u, 0u)))) ? _GLF_IDENTITY(1u, (_GLF_IDENTITY(1u, ~(_GLF_IDENTITY(~(1u), ~(~(~(1u))))))) << (0u >> _GLF_IDENTITY(uint(0u), _GLF_IDENTITY(uint(0u), max(uint(0u), uint(0u)))))) : 0u))) ^ ((GLF_live1res1 & 1u) != 0u ? 1u : 0u));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                discard;
                            }
                        } else {
                        }
                        GLF_live1_GLF_color = vec4(GLF_live1res, GLF_live1res, GLF_live1res, 1.0);
                        {
                            int GLF_live8i = _GLF_FUZZED(28811);
                            if (_GLF_DEAD(false)) {
                                break;
                                {
                                    int GLF_live17high = _GLF_FUZZED(-28303);
                                    int GLF_live17i = _GLF_FUZZED(57287);
                                    int GLF_live17looplimiter3 = 0;
                                    int GLF_live17m = _GLF_FUZZED(30136);
                                    {
                                        if (GLF_live17looplimiter3 >= 3) {
                                            ;
                                        }
                                        GLF_live17looplimiter3++;
                                        {
                                            int GLF_live17from = GLF_live17i;
                                            int GLF_live17mid = GLF_live17i + GLF_live17m - 1;
                                            int GLF_live17to = min(GLF_live17i + 2 * GLF_live17m - 1, GLF_live17high);
                                            GLF_live17merge(GLF_live17from, GLF_live17mid, GLF_live17to);
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    bool donor_replacementGLF_dead13c7 = _GLF_FUZZED(((GLF_live1icoord * GLF_live1icoord) != (GLF_live1icoord)));
                                    int donor_replacementGLF_dead13msb8 = _GLF_FUZZED(-12917);
                                    {
                                        int GLF_live14m = _GLF_FUZZED(28002);
                                        {
                                            ;
                                        }
                                    }
                                    vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(vec3(-860.145, 81.24, 7.3));
                                    if (!donor_replacementGLF_dead13c7) {
                                        ;
                                    }
                                }
                            }
                            int GLF_live8j = _GLF_FUZZED((ivec3(-99746, -84252, 32626).x & 37392));
                            int GLF_live8looplimiter0 = 0;
                            int GLF_live8pivot = _GLF_FUZZED(ivec3(70313, 79579, -30803).r);
                            {
                                if (GLF_live8looplimiter0 >= 5) {
                                    ;
                                    if (_GLF_DEAD(false)) {
                                        return 1.0;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                GLF_live8looplimiter0++;
                                {
                                    int GLF_live17high = _GLF_FUZZED(80498);
                                    int GLF_live17looplimiter3 = 0;
                                    int GLF_live17low = _GLF_FUZZED((30763 | ((-98050) * ivec3(60342, 3747, -9226))).r);
                                    int GLF_live17m = _GLF_FUZZED(-85224);
                                    for (int GLF_live17i = GLF_live17low; GLF_live17i < GLF_live17high; GLF_live17i += 2 * GLF_live17m) {
                                        if (GLF_live17looplimiter3 >= 3) {
                                            break;
                                        }
                                        GLF_live17looplimiter3++;
                                        {
                                            int GLF_live17from = GLF_live17i;
                                            int GLF_live17mid = GLF_live17i + GLF_live17m - 1;
                                            int GLF_live17to = min(GLF_live17i + 2 * GLF_live17m - 1, GLF_live17high);
                                            GLF_live17merge(GLF_live17from, GLF_live17mid, GLF_live17to);
                                        }
                                    }
                                }
                                {
                                    if (GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 10)] <= GLF_live8pivot) {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        } else {
                                            GLF_live8i++;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        GLF_live8swap(GLF_live8i, GLF_live8j);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            continue;
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead14i = _GLF_FUZZED(int(bvec2(false, true)[0]));
                                if (GLF_live9MATRIX_N < donor_replacementGLF_dead14i + 1) {
                                    continue;
                                }
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                break;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        vec2 GLF_live16center = _GLF_FUZZED((9.8 + vec2(-9.1, -7.2)));
                        vec2 GLF_live16position = _GLF_FUZZED((true ? vec2(0.9, -5.2) : (-vec2(775.260, -632.703))));
                        vec3 GLF_live16result = _GLF_FUZZED(vec3(222.365, 46.48, -179.120));
                        {
                            int GLF_live16looplimiter0 = 0;
                            for (int GLF_live16i = 35; GLF_live16i >= 0; GLF_live16i--) {
                                if (GLF_live16looplimiter0 >= 7) {
                                    break;
                                }
                                GLF_live16looplimiter0++;
                                {
                                    vec3 GLF_live16d = _GLF_FUZZED(vec3(315.191, -5987.1181, 86.46));
                                    GLF_live16d = GLF_live16drawShape(GLF_live16position, GLF_live16center + vec2(sin(float(GLF_live16i) / 10.0 + GLF_live16time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live16i) / 100.0), 0.01, float(GLF_live16i)));
                                    if (length(GLF_live16d) <= 0.0) {
                                        continue;
                                    }
                                    GLF_live16result = vec3(GLF_live16d);
                                }
                            }
                        }
                    }
                    continue;
                }
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
            {
                {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (GLF_dead6N & 0)); _injected_loop_counter--) {
                        ;
                    }
                }
            }
            if (float(_GLF_IDENTITY(i, (false ? _GLF_FUZZED(ivec3(-94651, 29962, 956).t) : i))) >= limit) {
                {
                    {
                        ;
                    }
                }
                {
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                        {
                            int GLF_live17high = _GLF_FUZZED(-49588);
                            int GLF_live17low = _GLF_FUZZED(((-82395) + 93011));
                            {
                                int GLF_live17looplimiter4 = 0;
                                for (int GLF_live17m = 1; GLF_live17m <= GLF_live17high; GLF_live17m = 2 * GLF_live17m) {
                                    if (GLF_live17looplimiter4 >= 3) {
                                        break;
                                    }
                                    GLF_live17looplimiter4++;
                                    {
                                        {
                                            int GLF_live17looplimiter3 = 0;
                                            for (int GLF_live17i = GLF_live17low; GLF_live17i < GLF_live17high; GLF_live17i += 2 * GLF_live17m) {
                                                if (GLF_live17looplimiter3 >= 3) {
                                                    break;
                                                }
                                                GLF_live17looplimiter3++;
                                                {
                                                    int GLF_live17from = GLF_live17i;
                                                    int GLF_live17mid = GLF_live17i + GLF_live17m - 1;
                                                    int GLF_live17to = min(GLF_live17i + 2 * GLF_live17m - 1, GLF_live17high);
                                                    GLF_live17merge(GLF_live17from, GLF_live17mid, GLF_live17to);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    {
                        bool GLF_live16c7 = _GLF_FUZZED((56452u != uint((63065u >= 5101u))));
                        vec2 GLF_live16pos = _GLF_FUZZED(vec2(-7.7, 43.24));
                        vec3 GLF_live16setting = _GLF_FUZZED((vec3(-4635.7176, -7.7, 9.3)));
                        if (!GLF_live16c7) {
                            ;
                        }
                    }
                    {
                        ;
                    }
                }
                return result;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec2 donor_replacementGLF_dead13position = _GLF_FUZZED(GLF_live8injectionSwitch);
                    if (abs(donor_replacementGLF_dead13position.y - donor_replacementGLF_dead13position.x) < 0.5) {
                        GLF_dead13b_b = clamp(float(bitfieldExtract(int(GLF_dead13resolution.x), 0, 0)), float(bitCount(i)), GLF_dead13b_b * float(bitCount(i)) * 3.0);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    continue;
                }
                if (_GLF_DEAD(false)) {
                    continue;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return 1.0;
                        {
                            int GLF_live8i = _GLF_FUZZED(-93853);
                            int GLF_live8j = _GLF_FUZZED((-93890));
                            int GLF_live8pivot = _GLF_FUZZED(-96526);
                            do {
                                {
                                    int GLF_live17i = _GLF_FUZZED(83733);
                                    int GLF_live17looplimiter5 = 0;
                                    do {
                                        if (GLF_live17looplimiter5 >= 3) {
                                            break;
                                        }
                                        GLF_live17looplimiter5++;
                                        {
                                            switch (GLF_live17i) {
                                                case 0:
                                                    GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = 4;
                                                    break;
                                                case 1:
                                                    GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = 3;
                                                    break;
                                                case 2:
                                                    GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = 2;
                                                    break;
                                                case 3:
                                                    GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = 1;
                                                    break;
                                                case 4:
                                                    GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = 0;
                                                    break;
                                                case 5:
                                                    GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = -1;
                                                    break;
                                                case 6:
                                                    GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = -2;
                                                    break;
                                                case 7:
                                                    GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = -3;
                                                    break;
                                                case 8:
                                                    GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = -4;
                                                    break;
                                                case 9:
                                                    GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = -5;
                                                    break;
                                            }
                                            GLF_live17i++;
                                        }
                                    } while (GLF_live17i < 10);
                                }
                                if (GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 10)] <= GLF_live8pivot) {
                                    GLF_live8i++;
                                    GLF_live8swap(GLF_live8i, GLF_live8j);
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                discard;
                            } else {
                                if (_GLF_DEAD(false)) {
                                    {
                                        continue;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED(vec2(GLF_live1_GLF_color));
                            int donor_replacementGLF_dead3i = _GLF_FUZZED(-53479);
                            do {
                                if (donor_replacementGLF_dead3coord.x > _GLF_IDENTITY(1.0, float(mat2x3(1.0, 0.0, _GLF_IDENTITY(1.0, float(mat3x2(1.0, 0.0, 1.0, 0.0, 1.0, 1.0))), 0.0, abs(cos(0.0)), determinant(mat3(0.0, 1.0, 0.0, 0.0, sin(0.0), 0.0, 0.0, 0.0, sin(0.0))))))) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        if (_GLF_DEAD(false)) {
                                            return 1.0;
                                        }
                                    } else {
                                        {
                                            vec2 GLF_live16center = _GLF_FUZZED(vec2(-9.2, 705.463));
                                            int GLF_live16i = _GLF_FUZZED(39839);
                                            int GLF_live16looplimiter0 = 0;
                                            vec2 GLF_live16position = _GLF_FUZZED(vec2(7.6, 172.872));
                                            vec3 GLF_live16result = _GLF_FUZZED(vec3(-393.774, 65.48, -3498.8667));
                                            {
                                                if (GLF_live16looplimiter0 >= 7) {
                                                    ;
                                                }
                                                GLF_live16looplimiter0++;
                                                {
                                                    vec3 GLF_live16d = _GLF_FUZZED(vec3(315.191, -5987.1181, 86.46));
                                                    GLF_live16d = GLF_live16drawShape(GLF_live16position, GLF_live16center + vec2(sin(float(GLF_live16i) / 10.0 + GLF_live16time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live16i) / 100.0), 0.01, float(GLF_live16i)));
                                                    if (length(GLF_live16d) <= 0.0) {
                                                        ;
                                                    }
                                                    GLF_live16result = vec3(GLF_live16d);
                                                }
                                            }
                                        }
                                        donor_replacementGLF_dead3coord.x -= _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, (1.0) / 1.0)) / 1.0);
                                    }
                                }
                                if (donor_replacementGLF_dead3coord.y > 1.0)
                                    donor_replacementGLF_dead3coord.y -= 1.0;
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                                    {
                                        {
                                            int GLF_live8looplimiter2 = 0;
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    vec3 donor_replacementGLF_dead13d = _GLF_FUZZED(vec3(-91.05, -451.000, -842.361));
                                                    if (length(donor_replacementGLF_dead13d) <= float(bitfieldExtract(int(GLF_dead13resolution.x), 0, 0))) {
                                                        {
                                                            int GLF_live17i = _GLF_FUZZED(2818);
                                                            int GLF_live17looplimiter5 = 0;
                                                            {
                                                                if (GLF_live17looplimiter5 >= 3) {
                                                                    ;
                                                                }
                                                                GLF_live17looplimiter5++;
                                                                {
                                                                    switch (GLF_live17i) {
                                                                        case 0:
                                                                            GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = 4;
                                                                            break;
                                                                        case 1:
                                                                            GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = 3;
                                                                            break;
                                                                        case 2:
                                                                            GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = 2;
                                                                            break;
                                                                        case 3:
                                                                            GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = 1;
                                                                            break;
                                                                        case 4:
                                                                            GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = 0;
                                                                            break;
                                                                        case 5:
                                                                            GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = -1;
                                                                            break;
                                                                        case 6:
                                                                            GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = -2;
                                                                            break;
                                                                        case 7:
                                                                            GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = -3;
                                                                            break;
                                                                        case 8:
                                                                            GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = -4;
                                                                            break;
                                                                        case 9:
                                                                            GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] = -5;
                                                                            break;
                                                                    }
                                                                    GLF_live17i++;
                                                                }
                                                            }
                                                        }
                                                        continue;
                                                    }
                                                }
                                                for (int GLF_live8i = int(GLF_live8injectionSwitch.x); GLF_live8i < 10; GLF_live8i++) {
                                                    if (GLF_live8looplimiter2 >= 5) {
                                                        break;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        bool donor_replacementGLF_dead13c1 = _GLF_FUZZED(true);
                                                        if (!donor_replacementGLF_dead13c1) {
                                                            ;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    GLF_live8looplimiter2++;
                                                    {
                                                        GLF_live8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 10)] = (10 - GLF_live8i) * int(GLF_live8injectionSwitch.y);
                                                    }
                                                }
                                                {
                                                    vec3 GLF_live14color = _GLF_FUZZED(vec3(-28.31, -32.51, 2.3).pts);
                                                    {
                                                        GLF_live14color.yz += GLF_live14color.yz;
                                                    }
                                                }
                                            } else {
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead3coord *= 2.0;
                                } else {
                                    {
                                        int GLF_live17j = _GLF_FUZZED(69271);
                                        int GLF_live17looplimiter6 = 0;
                                        {
                                            if (GLF_live17looplimiter6 >= 3) {
                                                ;
                                            }
                                            GLF_live17looplimiter6++;
                                            {
                                                GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j, 10)];
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                donor_replacementGLF_dead3i++;
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                        }
                        {
                            bool GLF_live16c6 = _GLF_FUZZED((uvec3(156076u, 61654u, 86679u) == uvec3(9702u, 114366u, 114444u)));
                            vec2 GLF_live16pos = _GLF_FUZZED((vec3(-907.533, 6809.5960, -48.57) * mat2x3(3304.2308, -43.35, -81.19, -23.17, 191.672, 8.3)));
                            vec3 GLF_live16setting = _GLF_FUZZED(vec3(-231.591, 1.3, 7.7));
                            if (!GLF_live16c6) {
                                ;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(sqrt(0.0)))))) {
                    break;
                }
            }
            {
                vec2 GLF_live17color = _GLF_FUZZED(vec2(83.20, 9.8));
                int GLF_live17i = _GLF_FUZZED(61646);
                vec3 GLF_live17vecCoor = _GLF_FUZZED(vec3(213.238, -1.9, 64.15));
                if (int(GLF_live17gl_FragCoord[1]) < 90) {
                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[2]))));
                    GLF_live17color.x += atanh(GLF_live17color.x) * cosh(GLF_live17injectionSwitch.y) * smoothstep(GLF_live17color, GLF_live17injectionSwitch, GLF_live17gl_FragCoord.yy).x;
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 120) {
                    GLF_live17color = fract(acosh(clamp(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[3])), 1.0, 1000.0)));
                    GLF_live17color.x += (isnan(GLF_live17gl_FragCoord.x) ? log2(GLF_live17gl_FragCoord.x) : log2(GLF_live17gl_FragCoord.y));
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 150) {
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 180) {
                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[4]))));
                    GLF_live17color[1] += asinh(GLF_live17gl_FragCoord.y * ldexp(GLF_live17color.y, -GLF_live17i));
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 210) {
                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[5]))));
                    GLF_live17color.y -= tanh(GLF_live17color.x) / cosh(GLF_live17color.y);
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 240) {
                    GLF_live17color = fract(asinh(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[6]))));
                    GLF_live17color.y -= isnan(float(GLF_live17i)) ? tanh(GLF_live17gl_FragCoord.x) : atanh(GLF_live17gl_FragCoord.y);
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 270) {
                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[7]))));
                    GLF_live17color.y *= mix(normalize(GLF_live17vecCoor), normalize(vec3(GLF_live17color, degrees(GLF_live17color.x))), GLF_live17injectionSwitch.x).y;
                    ;
                } else {
                    ;
                }
            }
        }
    }
    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead4iteration = _GLF_FUZZED(-92107);
            if (donor_replacementGLF_dead4iteration < 1000) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                    break;
                }
                {
                    int GLF_live8looplimiter3 = 0;
                    if (GLF_live8looplimiter3 >= 5) {
                        {
                            vec2 GLF_live17color = _GLF_FUZZED(vec2(-3.7, 8.0));
                            int GLF_live17i = _GLF_FUZZED(53841);
                            vec3 GLF_live17vecCoor = _GLF_FUZZED(vec3(-7480.3007, -9782.1414, 1.1));
                            if (int(GLF_live17gl_FragCoord[1]) < 180) {
                                GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[4]))));
                                GLF_live17color[1] += asinh(GLF_live17gl_FragCoord.y * ldexp(GLF_live17color.y, -GLF_live17i));
                                ;
                            } else if (int(GLF_live17gl_FragCoord[1]) < 210) {
                                GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[5]))));
                                GLF_live17color.y -= tanh(GLF_live17color.x) / cosh(GLF_live17color.y);
                                ;
                            } else if (int(GLF_live17gl_FragCoord[1]) < 240) {
                                GLF_live17color = fract(asinh(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[6]))));
                                GLF_live17color.y -= isnan(float(GLF_live17i)) ? tanh(GLF_live17gl_FragCoord.x) : atanh(GLF_live17gl_FragCoord.y);
                                ;
                            } else if (int(GLF_live17gl_FragCoord[1]) < 270) {
                                GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[7]))));
                                GLF_live17color.y *= mix(normalize(GLF_live17vecCoor), normalize(vec3(GLF_live17color, degrees(GLF_live17color.x))), GLF_live17injectionSwitch.x).y;
                                ;
                            } else {
                                ;
                            }
                        }
                        ;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    {
                        vec2 GLF_live17color = _GLF_FUZZED(vec2((vec3(-51.71, 522.890, -554.861))));
                        int GLF_live17i = _GLF_FUZZED(-4009);
                        vec3 GLF_live17vecCoor = _GLF_FUZZED(vec3(-62.32, (false ? 7.6 : 3254.6101), -2.2));
                        {
                            GLF_live17color = fract(asinh(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[6]))));
                            GLF_live17color.y -= isnan(float(GLF_live17i)) ? tanh(GLF_live17gl_FragCoord.x) : atanh(GLF_live17gl_FragCoord.y);
                            ;
                        }
                    }
                }
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, !(!(gl_FragCoord.x < 0.0))))))) {
                    return 1.0;
                }
                {
                    {
                        ;
                    }
                }
                if (_GLF_DEAD(false)) {
                    return 1.0;
                }
            } else {
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead13c2 = _GLF_FUZZED(true);
                    if (!donor_replacementGLF_dead13c2) {
                        ;
                    }
                    {
                        vec2 GLF_live17color = _GLF_FUZZED(vec2(530.042, -25.31));
                        int GLF_live17i = _GLF_FUZZED(97802);
                        vec3 GLF_live17vecCoor = _GLF_FUZZED((vec3(309.938, -3.9, 64.41) * mat3(9.7, 2177.9891, 1.4, 36.99, -43.47, -270.832, 249.761, 8.1, -24.73)));
                        if (int(GLF_live17gl_FragCoord[1]) < 60) {
                            GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[1]))));
                            GLF_live17color[1] *= atan(faceforward(GLF_live17injectionSwitch, GLF_live17color.xx, GLF_live17vecCoor.yx).y);
                            ;
                        } else if (int(GLF_live17gl_FragCoord[1]) < 90) {
                            GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[2]))));
                            GLF_live17color.x += atanh(GLF_live17color.x) * cosh(GLF_live17injectionSwitch.y) * smoothstep(GLF_live17color, GLF_live17injectionSwitch, GLF_live17gl_FragCoord.yy).x;
                            ;
                        } else if (int(GLF_live17gl_FragCoord[1]) < 120) {
                            GLF_live17color = fract(acosh(clamp(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[3])), 1.0, 1000.0)));
                            GLF_live17color.x += (isnan(GLF_live17gl_FragCoord.x) ? log2(GLF_live17gl_FragCoord.x) : log2(GLF_live17gl_FragCoord.y));
                            ;
                        } else if (int(GLF_live17gl_FragCoord[1]) < 150) {
                            ;
                        } else if (int(GLF_live17gl_FragCoord[1]) < 180) {
                            GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[4]))));
                            GLF_live17color[1] += asinh(GLF_live17gl_FragCoord.y * ldexp(GLF_live17color.y, -GLF_live17i));
                            ;
                        } else if (int(GLF_live17gl_FragCoord[1]) < 210) {
                            GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[5]))));
                            GLF_live17color.y -= tanh(GLF_live17color.x) / cosh(GLF_live17color.y);
                            ;
                        } else if (int(GLF_live17gl_FragCoord[1]) < 240) {
                            GLF_live17color = fract(asinh(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[6]))));
                            GLF_live17color.y -= isnan(float(GLF_live17i)) ? tanh(GLF_live17gl_FragCoord.x) : atanh(GLF_live17gl_FragCoord.y);
                            ;
                        } else if (int(GLF_live17gl_FragCoord[1]) < 270) {
                            GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[7]))));
                            GLF_live17color.y *= mix(normalize(GLF_live17vecCoor), normalize(vec3(GLF_live17color, degrees(GLF_live17color.x))), GLF_live17injectionSwitch.x).y;
                            ;
                        } else {
                            ;
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    {
                        {
                            int GLF_live15looplimiter0 = 0;
                            if (GLF_live15looplimiter0 >= 6) {
                                ;
                            }
                        }
                        int GLF_live7looplimiter4 = 0;
                        if (GLF_live7looplimiter4 >= 3) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                ;
                                {
                                    bool GLF_live16c5 = _GLF_FUZZED(false);
                                    vec2 GLF_live16pos = _GLF_FUZZED((mat3x2(-77.45, 8508.3509, 19.09, -85.29, -3255.7940, 2.0) * vec3(-0.7, -39.02, 3.5)));
                                    vec3 GLF_live16setting = _GLF_FUZZED(vec3(-7.3, 2.8, -1.0));
                                    if (!GLF_live16c5) {
                                        ;
                                    }
                                }
                            } else {
                            }
                        }
                        {
                            {
                                ;
                            }
                        }
                    }
                    ;
                    {
                        int GLF_live7c = _GLF_FUZZED(ivec4(58710, -88047, -39253, -56703).s);
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead13c8 = _GLF_FUZZED(true);
                            vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(dFdyFine(GLF_live10resolution));
                            vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(vec3(3.3, 9.7, 32.97));
                            if (!donor_replacementGLF_dead13c8) {
                                ;
                            }
                        }
                        int GLF_live7looplimiter0 = 0;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        uint GLF_live7matrix_number = _GLF_FUZZED(uint(56288));
                        int GLF_live7rows = _GLF_FUZZED(ivec4(-38912, 31816, 11238, -19035).p);
                        for (int GLF_live7r = 0; GLF_live7r < GLF_live7rows; GLF_live7r++) {
                            if (GLF_live7looplimiter0 >= 3) {
                                {
                                    vec2 GLF_live16center = _GLF_FUZZED((1037.7287 - vec2(98.57, -6114.0160)));
                                    int GLF_live16looplimiter0 = 0;
                                    vec2 GLF_live16position = _GLF_FUZZED((mat2(-697.399, 14.52, 0.2, 2.8) * vec2(0.4, 9.0)));
                                    vec3 GLF_live16result = _GLF_FUZZED(vec3(-0.2, -8001.7621, 1125.7614));
                                    for (int GLF_live16i = 35; GLF_live16i >= 0; GLF_live16i--) {
                                        if (GLF_live16looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live16looplimiter0++;
                                        {
                                            vec3 GLF_live16d = _GLF_FUZZED(vec3(315.191, -5987.1181, 86.46));
                                            GLF_live16d = GLF_live16drawShape(GLF_live16position, GLF_live16center + vec2(sin(float(GLF_live16i) / 10.0 + GLF_live16time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live16i) / 100.0), 0.01, float(GLF_live16i)));
                                            if (length(GLF_live16d) <= 0.0) {
                                                continue;
                                            }
                                            GLF_live16result = vec3(GLF_live16d);
                                        }
                                    }
                                }
                                break;
                            }
                            GLF_live7looplimiter0++;
                            {
                                switch (GLF_live7matrix_number) {
                                    case 0u:
                                        GLF_live7m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 2)] = GLF_live7one;
                                        {
                                            vec2 GLF_live17color = _GLF_FUZZED(vec2(1676.2682, -28.70));
                                            vec3 GLF_live17vecCoor = _GLF_FUZZED(vec3(-7.3, -155.378, 4.6));
                                            {
                                                GLF_live17color = fract(acosh(clamp(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[3])), 1.0, 1000.0)));
                                                GLF_live17color.x += (isnan(GLF_live17gl_FragCoord.x) ? log2(GLF_live17gl_FragCoord.x) : log2(GLF_live17gl_FragCoord.y));
                                                ;
                                            }
                                        }
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            {
                                                vec2 GLF_live17color = _GLF_FUZZED(vec2(-70.32, -507.593));
                                                int GLF_live17i = _GLF_FUZZED(((-46364) + 57085));
                                                vec3 GLF_live17vecCoor = _GLF_FUZZED(vec3(32.84, -8.1, -4029.5696));
                                                if (int(GLF_live17gl_FragCoord[1]) < 90) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[2]))));
                                                    GLF_live17color.x += atanh(GLF_live17color.x) * cosh(GLF_live17injectionSwitch.y) * smoothstep(GLF_live17color, GLF_live17injectionSwitch, GLF_live17gl_FragCoord.yy).x;
                                                    ;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 120) {
                                                    GLF_live17color = fract(acosh(clamp(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[3])), 1.0, 1000.0)));
                                                    GLF_live17color.x += (isnan(GLF_live17gl_FragCoord.x) ? log2(GLF_live17gl_FragCoord.x) : log2(GLF_live17gl_FragCoord.y));
                                                    ;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 150) {
                                                    ;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 180) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[4]))));
                                                    GLF_live17color[1] += asinh(GLF_live17gl_FragCoord.y * ldexp(GLF_live17color.y, -GLF_live17i));
                                                    ;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 210) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[5]))));
                                                    GLF_live17color.y -= tanh(GLF_live17color.x) / cosh(GLF_live17color.y);
                                                    ;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 240) {
                                                    GLF_live17color = fract(asinh(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[6]))));
                                                    GLF_live17color.y -= isnan(float(GLF_live17i)) ? tanh(GLF_live17gl_FragCoord.x) : atanh(GLF_live17gl_FragCoord.y);
                                                    ;
                                                } else if (int(GLF_live17gl_FragCoord[1]) < 270) {
                                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[7]))));
                                                    GLF_live17color.y *= mix(normalize(GLF_live17vecCoor), normalize(vec3(GLF_live17color, degrees(GLF_live17color.x))), GLF_live17injectionSwitch.x).y;
                                                    ;
                                                } else {
                                                    ;
                                                }
                                            }
                                            break;
                                        }
                                    case 1u:
                                        GLF_live7m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 3)] = GLF_live7one;
                                        break;
                                    case 2u:
                                        GLF_live7m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = GLF_live7one;
                                        break;
                                    case 3u:
                                        GLF_live7m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 2)] = GLF_live7one;
                                        break;
                                    case 4u:
                                        GLF_live7m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 3)] = GLF_live7one;
                                        break;
                                    case 5u:
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        GLF_live7m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = GLF_live7one;
                                        break;
                                    case 6u:
                                        GLF_live7m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 2)] = GLF_live7one;
                                        break;
                                    case 7u:
                                        GLF_live7m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 3)] = GLF_live7one;
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                continue;
                                            }
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                        }
                                    case 8u:
                                        GLF_live7m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = GLF_live7one;
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0)))))) {
                                            {
                                                vec2 GLF_live16pos = _GLF_FUZZED(vec2((vec3(-783.983, 8.4, -6.8) * (-1589.9419))));
                                                vec3 GLF_live16setting = _GLF_FUZZED(vec3(-8458.5662));
                                                {
                                                    ;
                                                }
                                            }
                                            vec2 donor_replacementGLF_dead13position = _GLF_FUZZED(fwidthCoarse(GLF_live8injectionSwitch));
                                            if (abs(donor_replacementGLF_dead13position.y - donor_replacementGLF_dead13position.x) < 0.5) {
                                                GLF_dead13b_b = clamp(float(bitfieldExtract(int(GLF_dead13resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead4iteration)), GLF_dead13b_b * float(bitCount(donor_replacementGLF_dead4iteration)) * 3.0);
                                                {
                                                    int GLF_live15i = _GLF_FUZZED(int(true));
                                                    if (GLF_live15i < int(GLF_live15gl_FragCoord.x)) {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                }
                            }
                        }
                    }
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        continue;
                    }
                }
            }
            {
                int GLF_live15looplimiter0 = 0;
                if (GLF_live15looplimiter0 >= 6) {
                    ;
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        {
            ;
        }
    }
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
        return result;
        {
            int GLF_live17i = _GLF_FUZZED((false ? 80326 : 79840));
            int GLF_live17k = _GLF_FUZZED(ivec4(-83114, -31717, 904, -6284).y);
            int GLF_live17mid = _GLF_FUZZED(-18484);
            {
                int GLF_live17looplimiter1 = 0;
                while (GLF_live17i < GLF_live17N && GLF_live17i <= GLF_live17mid) {
                    if (GLF_live17looplimiter1 >= 3) {
                        break;
                    }
                    GLF_live17looplimiter1++;
                    {
                        GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i++, 10)];
                    }
                }
            }
        }
        {
            {
                if (_GLF_DEAD(false)) {
                    discard;
                }
                ;
            }
        }
    }
    {
        vec2 GLF_live17color = _GLF_FUZZED((mat3x2(20.87, 4.5, 0.1, -480.862, 2.8, -364.556) * vec3(85.77, -690.275, 4.6)));
        int GLF_live17i = _GLF_FUZZED(-17187);
        int GLF_live17looplimiter7 = 0;
        vec3 GLF_live17vecCoor = _GLF_FUZZED(vec2(96.37, 3.9).yy.grr);
        {
            if (GLF_live17looplimiter7 >= 3) {
                ;
            }
            GLF_live17looplimiter7++;
            {
                if (int(GLF_live17gl_FragCoord[1]) < 30) {
                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[0]))));
                    GLF_live17color[0] = dFdy(GLF_live17gl_FragCoord.y);
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 60) {
                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[1]))));
                    GLF_live17color[1] *= atan(faceforward(GLF_live17injectionSwitch, GLF_live17color.xx, GLF_live17vecCoor.yx).y);
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 90) {
                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[2]))));
                    GLF_live17color.x += atanh(GLF_live17color.x) * cosh(GLF_live17injectionSwitch.y) * smoothstep(GLF_live17color, GLF_live17injectionSwitch, GLF_live17gl_FragCoord.yy).x;
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 120) {
                    GLF_live17color = fract(acosh(clamp(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[3])), 1.0, 1000.0)));
                    GLF_live17color.x += (isnan(GLF_live17gl_FragCoord.x) ? log2(GLF_live17gl_FragCoord.x) : log2(GLF_live17gl_FragCoord.y));
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 150) {
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 180) {
                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[4]))));
                    GLF_live17color[1] += asinh(GLF_live17gl_FragCoord.y * ldexp(GLF_live17color.y, -GLF_live17i));
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 210) {
                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[5]))));
                    GLF_live17color.y -= tanh(GLF_live17color.x) / cosh(GLF_live17color.y);
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 240) {
                    GLF_live17color = fract(asinh(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[6]))));
                    GLF_live17color.y -= isnan(float(GLF_live17i)) ? tanh(GLF_live17gl_FragCoord.x) : atanh(GLF_live17gl_FragCoord.y);
                    ;
                } else if (int(GLF_live17gl_FragCoord[1]) < 270) {
                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[7]))));
                    GLF_live17color.y *= mix(normalize(GLF_live17vecCoor), normalize(vec3(GLF_live17color, degrees(GLF_live17color.x))), GLF_live17injectionSwitch.x).y;
                    ;
                } else {
                    ;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead13c7 = _GLF_FUZZED(mix(true, false, true));
            vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(vec2(-90.52, 8.4));
            vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(vec3(-946.404, -1.7, 8.4));
            if (!donor_replacementGLF_dead13c7) {
                ;
            }
        }
        return 1.0;
    }
}

void main() {
    vec3 c = vec3(7.0, 8.0, 9.0);
    float thirty_two = round(resolution.x / 8.0);
    c.x = compute_value(gl_FragCoord.x, thirty_two);
    {
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    return;
                } else {
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                ;
            } else {
            }
        }
    }
    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _GLF_IDENTITY(_injected_loop_counter--, ~(~(_injected_loop_counter--)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            {
                int GLF_live15looplimiter1 = 0;
                if (GLF_live15looplimiter1 >= 6) {
                    ;
                }
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    continue;
                }
                float GLF_live9beta = _GLF_FUZZED((-(+vec4(-989.127, 26.26, -9.2, 7.9))).p);
                int GLF_live9j = _GLF_FUZZED(-56492);
                int GLF_live9k = _GLF_FUZZED(((-16789) | 98838));
                if (_GLF_DEAD(false)) {
                    {
                        int GLF_live16looplimiter0 = 0;
                        if (GLF_live16looplimiter0 >= 7) {
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead13c1 = _GLF_FUZZED(true);
                        if (!donor_replacementGLF_dead13c1) {
                            ;
                        }
                    }
                    {
                        int GLF_live17i = _GLF_FUZZED(((80839 - 236) & (-23989)));
                        int GLF_live17k = _GLF_FUZZED(((78200 ^ 96105) - 40736));
                        {
                            GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i++, 10)];
                        }
                    }
                    continue;
                }
                mat4 GLF_live9matrix_a = _GLF_FUZZED(mat4(2169.5354, 7.3, -2.1, 56.46, 6.2, -721.958, -24.42, 4645.6979, 20.60, 5074.8187, -2.3, 3479.4955, -8705.6537, -64.39, -320.390, 923.129));
                vec4 GLF_live9matrix_u = _GLF_FUZZED(vec4(598.965, vec2(-678.092, -79.76), -1402.8959));
                {
                    int GLF_live9looplimiter3 = 0;
                    for (int GLF_live9a = GLF_live9MATRIX_N - 1; GLF_live9a >= GLF_live9k; GLF_live9a--) {
                        if (GLF_live9looplimiter3 >= 4) {
                            break;
                        }
                        GLF_live9looplimiter3++;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            GLF_live9matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 4)] = GLF_live9matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9a, 4)][_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live9j, (false ? _GLF_FUZZED(GLF_live9looplimiter3) : GLF_live9j)), 4)] - (GLF_live9beta * GLF_live9matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9a, 4)]);
                            {
                                int GLF_live14a = _GLF_FUZZED((~(49489 | 9350)));
                                int GLF_live14looplimiter0 = 0;
                                vec2 GLF_live14uv = _GLF_FUZZED(vec2(-32.32, 22.58));
                                do {
                                    if (GLF_live14looplimiter0 >= 3) {
                                        break;
                                    }
                                    GLF_live14looplimiter0++;
                                    {
                                        GLF_live14uv.y -= step(GLF_live14injectionSwitch.y, GLF_live14uv.x);
                                        GLF_live14uv.x -= fract(tanh(GLF_live14uv.x)) / ldexp(GLF_live14injectionSwitch.y, findMSB(GLF_live14a));
                                        GLF_live14a--;
                                    }
                                } while (GLF_live14a > int(GLF_live14injectionSwitch.x));
                            }
                        } else {
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                }
            }
            int donor_replacementGLF_dead5a = _GLF_FUZZED(-_GLF_IDENTITY(9226, 1 * (_GLF_IDENTITY(9226, ~(~(9226))))));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                    return;
                }
            } else {
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))))))) {
                discard;
            }
            float donor_replacementGLF_dead5beta = _GLF_FUZZED(0.7);
            int donor_replacementGLF_dead5j = _GLF_FUZZED((+ivec3(-14495, 89086, 18549)[1]));
            {
                int GLF_live7cols = _GLF_FUZZED((12002));
                int GLF_live7looplimiter2 = 0;
                uint GLF_live7matrix_number = _GLF_FUZZED((+49591u));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    {
                        vec2 GLF_live17color = _GLF_FUZZED(vec2(-568.302, -0.8));
                        int GLF_live17i = _GLF_FUZZED((-42938));
                        int GLF_live17looplimiter7 = 0;
                        vec3 GLF_live17vecCoor = _GLF_FUZZED(vec3(3.2, 3106.1334, -6379.4213));
                        do {
                            if (GLF_live17looplimiter7 >= 3) {
                                break;
                            }
                            GLF_live17looplimiter7++;
                            {
                                if (int(GLF_live17gl_FragCoord[1]) < 30) {
                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[0]))));
                                    GLF_live17color[0] = dFdy(GLF_live17gl_FragCoord.y);
                                    break;
                                } else if (int(GLF_live17gl_FragCoord[1]) < 60) {
                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[1]))));
                                    GLF_live17color[1] *= atan(faceforward(GLF_live17injectionSwitch, GLF_live17color.xx, GLF_live17vecCoor.yx).y);
                                    break;
                                } else if (int(GLF_live17gl_FragCoord[1]) < 90) {
                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[2]))));
                                    GLF_live17color.x += atanh(GLF_live17color.x) * cosh(GLF_live17injectionSwitch.y) * smoothstep(GLF_live17color, GLF_live17injectionSwitch, GLF_live17gl_FragCoord.yy).x;
                                    break;
                                } else if (int(GLF_live17gl_FragCoord[1]) < 120) {
                                    GLF_live17color = fract(acosh(clamp(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[3])), 1.0, 1000.0)));
                                    GLF_live17color.x += (isnan(GLF_live17gl_FragCoord.x) ? log2(GLF_live17gl_FragCoord.x) : log2(GLF_live17gl_FragCoord.y));
                                    break;
                                } else if (int(GLF_live17gl_FragCoord[1]) < 150) {
                                    ;
                                } else if (int(GLF_live17gl_FragCoord[1]) < 180) {
                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[4]))));
                                    GLF_live17color[1] += asinh(GLF_live17gl_FragCoord.y * ldexp(GLF_live17color.y, -GLF_live17i));
                                    break;
                                } else if (int(GLF_live17gl_FragCoord[1]) < 210) {
                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[5]))));
                                    GLF_live17color.y -= tanh(GLF_live17color.x) / cosh(GLF_live17color.y);
                                    break;
                                } else if (int(GLF_live17gl_FragCoord[1]) < 240) {
                                    GLF_live17color = fract(asinh(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[6]))));
                                    GLF_live17color.y -= isnan(float(GLF_live17i)) ? tanh(GLF_live17gl_FragCoord.x) : atanh(GLF_live17gl_FragCoord.y);
                                    break;
                                } else if (int(GLF_live17gl_FragCoord[1]) < 270) {
                                    GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[7]))));
                                    GLF_live17color.y *= mix(normalize(GLF_live17vecCoor), normalize(vec3(GLF_live17color, degrees(GLF_live17color.x))), GLF_live17injectionSwitch.x).y;
                                    break;
                                } else {
                                    ;
                                }
                            }
                        } while (0 == int(GLF_live17injectionSwitch.x));
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        discard;
                    }
                } else {
                }
                int GLF_live7rows = _GLF_FUZZED(14171);
                {
                    if (GLF_live7looplimiter2 >= 3) {
                        ;
                    }
                    GLF_live7looplimiter2++;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        break;
                    }
                    {
                        {
                            int GLF_live7looplimiter1 = 0;
                            for (int GLF_live7c = 0; GLF_live7c < GLF_live7cols; GLF_live7c++) {
                                if (GLF_live7looplimiter1 >= 3) {
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        int donor_replacementGLF_dead13msb8 = _GLF_FUZZED(min(ivec4(-68880, -58857, 4516, 27469).g, _injected_loop_counter));
                                        vec2 donor_replacementGLF_dead13position = _GLF_FUZZED(dFdxFine(GLF_live8injectionSwitch));
                                        if (abs(donor_replacementGLF_dead13position.y - donor_replacementGLF_dead13position.x) < 0.5) {
                                            GLF_dead13b_b = clamp(float(bitfieldExtract(int(GLF_dead13resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead13msb8)), GLF_dead13b_b * float(bitCount(donor_replacementGLF_dead13msb8)) * 3.0);
                                        }
                                    }
                                    break;
                                }
                                GLF_live7looplimiter1++;
                                {
                                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), bool(bvec3(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true))))) {
                                        break;
                                        {
                                            int GLF_live14m = _GLF_FUZZED(56650);
                                            int GLF_live14r = _GLF_FUZZED(75476);
                                            {
                                                GLF_live14r = GLF_live14m - 1;
                                            }
                                        }
                                    }
                                    {
                                        int GLF_live7looplimiter0 = 0;
                                        do {
                                            for (int GLF_live7r = _GLF_IDENTITY(0, int(ivec3(_GLF_IDENTITY(0, int(int(0))), 1, 0))); GLF_live7r < GLF_live7rows; GLF_live7r++) {
                                                if (GLF_live7looplimiter0 >= 3) {
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    break;
                                                }
                                                GLF_live7looplimiter0++;
                                                {
                                                    {
                                                        vec2 GLF_live17color = _GLF_FUZZED(vec2(-2.8, -6.1));
                                                        int GLF_live17i = _GLF_FUZZED(77853);
                                                        vec3 GLF_live17vecCoor = _GLF_FUZZED(vec3(4.6, -904.636, 9.9));
                                                        if (int(GLF_live17gl_FragCoord[1]) < 60) {
                                                            GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[1]))));
                                                            GLF_live17color[1] *= atan(faceforward(GLF_live17injectionSwitch, GLF_live17color.xx, GLF_live17vecCoor.yx).y);
                                                            ;
                                                        } else if (int(GLF_live17gl_FragCoord[1]) < 90) {
                                                            GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[2]))));
                                                            GLF_live17color.x += atanh(GLF_live17color.x) * cosh(GLF_live17injectionSwitch.y) * smoothstep(GLF_live17color, GLF_live17injectionSwitch, GLF_live17gl_FragCoord.yy).x;
                                                            ;
                                                        } else if (int(GLF_live17gl_FragCoord[1]) < 120) {
                                                            GLF_live17color = fract(acosh(clamp(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[3])), 1.0, 1000.0)));
                                                            GLF_live17color.x += (isnan(GLF_live17gl_FragCoord.x) ? log2(GLF_live17gl_FragCoord.x) : log2(GLF_live17gl_FragCoord.y));
                                                            ;
                                                        } else if (int(GLF_live17gl_FragCoord[1]) < 150) {
                                                            ;
                                                        } else if (int(GLF_live17gl_FragCoord[1]) < 180) {
                                                            GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[4]))));
                                                            GLF_live17color[1] += asinh(GLF_live17gl_FragCoord.y * ldexp(GLF_live17color.y, -GLF_live17i));
                                                            ;
                                                        } else if (int(GLF_live17gl_FragCoord[1]) < 210) {
                                                            GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[5]))));
                                                            GLF_live17color.y -= tanh(GLF_live17color.x) / cosh(GLF_live17color.y);
                                                            ;
                                                        } else if (int(GLF_live17gl_FragCoord[1]) < 240) {
                                                            GLF_live17color = fract(asinh(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[6]))));
                                                            GLF_live17color.y -= isnan(float(GLF_live17i)) ? tanh(GLF_live17gl_FragCoord.x) : atanh(GLF_live17gl_FragCoord.y);
                                                            ;
                                                        } else if (int(GLF_live17gl_FragCoord[1]) < 270) {
                                                            GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[7]))));
                                                            GLF_live17color.y *= mix(normalize(GLF_live17vecCoor), normalize(vec3(GLF_live17color, degrees(GLF_live17color.x))), GLF_live17injectionSwitch.x).y;
                                                            ;
                                                        } else {
                                                            ;
                                                        }
                                                    }
                                                    switch (GLF_live7matrix_number) {
                                                        case 0u:
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            GLF_live7m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 2)] = GLF_live7one;
                                                            break;
                                                        case 1u:
                                                            GLF_live7m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 3)] = GLF_live7one;
                                                            {
                                                                int GLF_live17i = _GLF_FUZZED(-91390);
                                                                int GLF_live17j = _GLF_FUZZED(99932);
                                                                int GLF_live17k = _GLF_FUZZED((+29185));
                                                                if (GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] < GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j, 10)]) {
                                                                    GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i++, 10)];
                                                                } else {
                                                                    GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j++, 10)];
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                bool donor_replacementGLF_dead13c8 = _GLF_FUZZED(true);
                                                                int donor_replacementGLF_dead13msb8 = _GLF_FUZZED(GLF_live7cols);
                                                                vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(vec2(-20.97, 0.9));
                                                                vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(tanh(c));
                                                                if (!donor_replacementGLF_dead13c8) {
                                                                    ;
                                                                }
                                                                {
                                                                    vec2 GLF_live16pos = _GLF_FUZZED((mat4x2(-70.73, -3.5, 7.9, -5639.0926, 1.4, -27.28, -98.55, -6.1) * vec4(6.3, 8.3, vec2(0.0, -4.6))));
                                                                    vec3 GLF_live16setting = _GLF_FUZZED(vec3(910.939, -33.88, 37.96));
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                discard;
                                                            }
                                                            break;
                                                        case 2u:
                                                            GLF_live7m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = GLF_live7one;
                                                            break;
                                                            if (_GLF_DEAD(false)) {
                                                                {
                                                                    continue;
                                                                }
                                                            }
                                                        case 3u:
                                                            GLF_live7m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 2)] = GLF_live7one;
                                                            break;
                                                        case 4u:
                                                            GLF_live7m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 3)] = GLF_live7one;
                                                            break;
                                                        case 5u:
                                                            GLF_live7m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = GLF_live7one;
                                                            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
                                                                return;
                                                            }
                                                            break;
                                                        case 6u:
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                return;
                                                            }
                                                            for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                GLF_live7m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 2)] = _GLF_IDENTITY(GLF_live7one, max(GLF_live7one, GLF_live7one));
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                discard;
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                {
                                                                    continue;
                                                                }
                                                            }
                                                            break;
                                                        case 7u:
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                continue;
                                                                if (_GLF_DEAD(false)) {
                                                                    {
                                                                        vec2 GLF_live16center = _GLF_FUZZED(vec4(-1.5, -76.23, 0.5, -28.79).qs);
                                                                        int GLF_live16i = _GLF_FUZZED(-4321);
                                                                        vec2 GLF_live16position = _GLF_FUZZED((vec2(-7932.2351, 7932.0579) * vec2(2.1, 1687.9959)));
                                                                        vec3 GLF_live16result = _GLF_FUZZED(vec3(3.9, 1680.0725, -4.1));
                                                                        {
                                                                            vec3 GLF_live16d = _GLF_FUZZED(vec3(315.191, -5987.1181, 86.46));
                                                                            GLF_live16d = GLF_live16drawShape(GLF_live16position, GLF_live16center + vec2(sin(float(GLF_live16i) / 10.0 + GLF_live16time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live16i) / 100.0), 0.01, float(GLF_live16i)));
                                                                            if (length(GLF_live16d) <= 0.0) {
                                                                                ;
                                                                            }
                                                                            GLF_live16result = vec3(GLF_live16d);
                                                                        }
                                                                    }
                                                                    {
                                                                        continue;
                                                                    }
                                                                }
                                                            }
                                                            GLF_live7m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 3)] = GLF_live7one;
                                                            break;
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                {
                                                                    int GLF_live17i = _GLF_FUZZED(-90301);
                                                                    int GLF_live17j = _GLF_FUZZED(ivec2(51826, -81092).s);
                                                                    int GLF_live17k = _GLF_FUZZED(((-63027) - (-57166)));
                                                                    int GLF_live17looplimiter0 = 0;
                                                                    int GLF_live17mid = _GLF_FUZZED(int(105037u));
                                                                    int GLF_live17to = _GLF_FUZZED(-64843);
                                                                    while (GLF_live17i <= GLF_live17mid && GLF_live17j <= GLF_live17to) {
                                                                        if (GLF_live17looplimiter0 >= 3) {
                                                                            break;
                                                                        }
                                                                        GLF_live17looplimiter0++;
                                                                        {
                                                                            if (GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] < GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j, 10)]) {
                                                                                GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i++, 10)];
                                                                            } else {
                                                                                GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j++, 10)];
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            } else {
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        vec2 donor_replacementGLF_dead13position = _GLF_FUZZED(GLF_live10resolution);
                                                                        if (abs(donor_replacementGLF_dead13position.y - donor_replacementGLF_dead13position.x) < 0.5) {
                                                                            GLF_dead13b_b = clamp(float(bitfieldExtract(int(GLF_dead13resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead5a)), GLF_dead13b_b * float(bitCount(donor_replacementGLF_dead5a)) * 3.0);
                                                                        }
                                                                    }
                                                                    return;
                                                                }
                                                            }
                                                        case 8u:
                                                            GLF_live7m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = _GLF_IDENTITY(GLF_live7one, (GLF_live7one) - 0.0);
                                                            break;
                                                    }
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    }
                                }
                            }
                        }
                        {
                            vec2 GLF_live16position = _GLF_FUZZED(vec2(2.7, -5.7));
                            if (abs(GLF_live16position.y - GLF_live16position.x) < 0.5) {
                                GLF_live16b_b = clamp(0.0, 1.0, GLF_live16b_b * 3.0);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                            return;
                        }
                        GLF_live7matrix_number = GLF_live7matrix_number + 1u;
                    }
                }
            }
            mat4 donor_replacementGLF_dead5matrix_a = _GLF_FUZZED((mat4(59.66, 9.2, _GLF_IDENTITY(-2667.0715, 0.0 + (_GLF_IDENTITY(-2667.0715, mix(float(_GLF_IDENTITY(-2667.0715, min(-2667.0715, -2667.0715))), float(_GLF_FUZZED(2.7)), bool(false))))), 0.3, 3999.9932, _GLF_IDENTITY(-3.7, clamp(-_GLF_IDENTITY(3.7, (3.7) * 1.0), -3.7, -3.7)), _GLF_IDENTITY(-50.17, float(mat2x3(-50.17, 1.0, 1.0, 0.0, 0.0, 0.0))), -640.483, -7.8, 6.2, -152.887, 196.741, 85.41, 61.02, -85.19, 3807.4051) - mat4(-6.4, _GLF_IDENTITY(_GLF_IDENTITY(423.410, (423.410) + 0.0), max(_GLF_IDENTITY(_GLF_IDENTITY(423.410, (423.410) + 0.0), max(_GLF_IDENTITY(423.410, (423.410) + 0.0), _GLF_IDENTITY(423.410, (423.410) + 0.0))), _GLF_IDENTITY(423.410, (423.410) + 0.0))), 96.50, -5.0, -0.9, 622.794, 4027.6653, -6.3, 588.186, -5.5, -192.812, 9.9, 2572.6462, -4.1, 5.1, 581.507)));
            vec4 donor_replacementGLF_dead5matrix_u = _GLF_FUZZED(_GLF_color);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                continue;
            }
            if (_GLF_DEAD(false)) {
                return;
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            return;
                        } else {
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead14j = _GLF_FUZZED(_injected_loop_counter);
                            if (donor_replacementGLF_dead14j < _injected_loop_counter + 1) {
                                continue;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead13position = _GLF_FUZZED(mix(injectionSwitch, vec2(-95.91, -15.96), bvec2(false, true)));
                    if (abs(donor_replacementGLF_dead13position.y - donor_replacementGLF_dead13position.x) < 0.5) {
                        GLF_dead13b_b = clamp(float(bitfieldExtract(int(GLF_dead13resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead5a)), GLF_dead13b_b * float(bitCount(donor_replacementGLF_dead5a)) * 3.0);
                    }
                }
            }
            {
                int GLF_live17high = _GLF_FUZZED(-464);
                int GLF_live17i = _GLF_FUZZED(((-69260)));
                int GLF_live17looplimiter3 = 0;
                int GLF_live17m = _GLF_FUZZED(-35253);
                {
                    if (GLF_live17looplimiter3 >= 3) {
                        ;
                    }
                    GLF_live17looplimiter3++;
                    {
                        int GLF_live17from = GLF_live17i;
                        int GLF_live17mid = GLF_live17i + GLF_live17m - 1;
                        int GLF_live17to = min(GLF_live17i + 2 * GLF_live17m - 1, GLF_live17high);
                        GLF_live17merge(GLF_live17from, GLF_live17mid, GLF_live17to);
                    }
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (_GLF_DEAD(false)) {
                            do {
                                discard;
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                    }
                    return;
                }
                donor_replacementGLF_dead5matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5j, 4)] = donor_replacementGLF_dead5matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5j, 4)] - (donor_replacementGLF_dead5beta * donor_replacementGLF_dead5matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5a, 4)]);
            }
            if (_GLF_DEAD(false)) {
                for (int _injected_loop_counter = ((0 & 38784) << _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), 0 ^ (int(3))))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & 1)); _injected_loop_counter++) {
                    return;
                }
            }
        }
        {
            vec3 GLF_live8color = _GLF_FUZZED(vec3((mat2(471.279, -3.8, -3.9, -6838.6281) * vec2(9.0, 373.917)), 2.8));
            if (_GLF_DEAD(false)) {
                {
                    ;
                }
            }
            int GLF_live8count = _GLF_FUZZED((15562));
            if (_GLF_DEAD(false)) {
                continue;
            }
            if (_GLF_DEAD(false)) {
                {
                    GLF_dead13b_b = clamp(float(bitfieldExtract(int(GLF_dead13resolution.x), 0, 0)), float(bitCount(GLF_live9MATRIX_N)), GLF_dead13b_b * float(bitCount(GLF_live9MATRIX_N)) * 3.0);
                }
            }
            {
                GLF_live8color += GLF_live8palette(vec3(0.5, float(GLF_live8obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live8injectionSwitch.y)), vec3(float(GLF_live8obj.numbers[4]) * 0.1, GLF_live8injectionSwitch.x, 0.6));
                GLF_live8count++;
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        c.y = compute_value(gl_FragCoord.y, thirty_two);
        if (_GLF_DEAD(false)) {
            {
                ;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, cos(0.0), 0.0, 0.0)))))) {
            {
                int GLF_live17looplimiter1 = 0;
                if (GLF_live17looplimiter1 >= 3) {
                    ;
                }
            }
            return;
        }
    }
    c.z = c.x + c.y;
    do {
        for (int i = _GLF_IDENTITY(0, int(int(0))); i < 3; i++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    continue;
                }
            }
            if (c[i] >= 1.0) {
                c[i] = _GLF_IDENTITY(c[i], float(_GLF_IDENTITY(mat4x3(c[i], 1.0, 0.0, 0.0, _GLF_IDENTITY(0.0, min(0.0, 0.0)), 0.0, 0.0, 1.0, cos(0.0), 0.0, sqrt(1.0), 1.0), _GLF_IDENTITY(mat3(1.0) * (mat4x3(c[i], 1.0, 0.0, 0.0, _GLF_IDENTITY(0.0, min(0.0, 0.0)), 0.0, 0.0, 1.0, cos(0.0), 0.0, sqrt(1.0), 1.0)), (false ? _GLF_FUZZED(mat4x3(-27.93, 8080.5275, -6.4, 488.967, 5.2, 442.750, 9232.1480, 0.9, -31.30, 3.1, 7068.6655, _GLF_IDENTITY(_GLF_IDENTITY(2.8, max(2.8, _GLF_IDENTITY(2.8, min(2.8, 2.8)))), float(mat3(_GLF_IDENTITY(_GLF_IDENTITY(2.8, max(2.8, _GLF_IDENTITY(2.8, min(2.8, 2.8)))), (false ? _GLF_FUZZED(5.4) : _GLF_IDENTITY(2.8, max(2.8, _GLF_IDENTITY(2.8, min(2.8, 2.8)))))), 1.0, 0.0, 0.0, 0.0, 0.0, round(length(normalize(vec3(1.0, 1.0, 1.0)))), 0.0, 0.0))))) : (mat3(1.0) * (mat4x3(c[i], 1.0, 0.0, 0.0, _GLF_IDENTITY(0.0, min(0.0, 0.0)), 0.0, 0.0, 1.0, cos(0.0), 0.0, sqrt(1.0), 1.0)))))))) * c[i];
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(false)) {
        {
            float GLF_live9alpha1 = _GLF_FUZZED(291.021);
            int GLF_live9k = _GLF_FUZZED(((-57670) | 22337));
            int GLF_live9looplimiter1 = 0;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    vec2 GLF_live16pos = _GLF_FUZZED(vec2(-6238.2514, 3556.5283));
                    vec3 GLF_live16setting = _GLF_FUZZED(vec3(-1513.3746, -1.9, 6383.2005));
                    {
                        ;
                    }
                }
                return;
            }
            vec4 GLF_live9matrix_u = _GLF_FUZZED(vec2(293.325).xxxy);
            if (_GLF_DEAD(false)) {
                return;
            }
            for (int GLF_live9u = GLF_live9MATRIX_N - 1; GLF_live9u >= GLF_live9k; GLF_live9u--) {
                if (GLF_live9looplimiter1 >= 4) {
                    if (_GLF_DEAD(false)) {
                        {
                            vec2 GLF_live16pos = _GLF_FUZZED(vec2(-6635.7260, 6.3));
                            vec3 GLF_live16setting = _GLF_FUZZED(vec4(vec2(66.04, -53.47), -4.9, -6688.6570).bgr);
                            {
                                ;
                            }
                        }
                        break;
                    }
                    {
                        bool GLF_live16c2 = _GLF_FUZZED(((uvec3(42406u, 95471u, 40748u) != uvec3(63951u, 168150u, 13436u)) && (mat3x4(8095.8951, 12.94, -4.4, 25.29, -7.7, -176.715, 7848.7611, -585.350, -690.229, 9931.6699, -25.77, -3.9) != mat3x4(454.030, 8417.4753, -8346.8618, 7057.8403, -29.41, -676.920, 316.737, -329.117, 5.7, 7.6, -8020.5533, 10.01))));
                        if (!GLF_live16c2) {
                            ;
                        }
                    }
                    break;
                    if (_GLF_DEAD(false)) {
                        {
                            {
                                ;
                            }
                        }
                        return;
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    GLF_live9looplimiter1++;
                }
                {
                    {
                        ;
                    }
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 0.0))))))) {
                        GLF_live9alpha1 += pow(GLF_live9matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9u, 4)], 2.0);
                    } else {
                    }
                }
            }
        }
        return;
    }
    {
        bool GLF_live16c4 = _GLF_FUZZED(false);
        if (!GLF_live16c4) {
            ;
        }
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            bool donor_replacementGLF_dead13c6 = _GLF_FUZZED((GLF_live9MATRIX_N < _injected_loop_counter));
            vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(unpackUnorm2x16((14409u + 127243u)));
            {
                bool GLF_live16c2 = _GLF_FUZZED(((mat4(4223.9876, -19.43, -6535.5639, -3586.0022, 60.51, -5.1, 6.0, 9773.2693, -94.24, 40.73, -2209.4298, -7.9, 804.093, 99.92, 179.794, 7716.2694) * 1.8) == mat4(mat3x2(-4.4, 28.51, -5.5, -2.5, 5700.3911, 3.6))));
                if (!GLF_live16c2) {
                    ;
                }
            }
            vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(c);
            {
                int GLF_live17j = _GLF_FUZZED(-31461);
                int GLF_live17looplimiter6 = 0;
                {
                    if (GLF_live17looplimiter6 >= 3) {
                        ;
                    }
                    GLF_live17looplimiter6++;
                    {
                        GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j, 10)];
                    }
                }
            }
            if (!donor_replacementGLF_dead13c6) {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            break;
        }
        _GLF_color = vec4(normalize(abs(c)), 1.0);
    }
    {
        int GLF_live2looplimiter0 = 0;
        if (_GLF_DEAD(false)) {
            return;
        }
        if (GLF_live2looplimiter0 >= 4) {
            ;
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < length(vec3(0.0, 0.0, 0.0)))))) {
                    } else {
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead12j = _GLF_FUZZED(24976);
                        uint donor_replacementGLF_dead12uselessOutVariable = _GLF_FUZZED(199428u);
                        {
                            int GLF_live14a = _GLF_FUZZED(79969);
                            int GLF_live14b = _GLF_FUZZED(((73158 - 32044) - (+(-89491))));
                            int GLF_live14looplimiter1 = 0;
                            vec2 GLF_live14uv = _GLF_FUZZED(vec2(vec4(-1.8, vec3(-849.965, 3.6, 26.37))));
                            {
                                if (GLF_live14looplimiter1 >= 3) {
                                    ;
                                }
                                GLF_live14looplimiter1++;
                                {
                                    GLF_live14uv.y -= step(GLF_live14injectionSwitch.y, GLF_live14uv.x) + float(GLF_live14a);
                                    GLF_live14uv.x *= (isnan(GLF_live14uv.y) ? cosh(GLF_live14gl_FragCoord.y) : tanh(GLF_live14gl_FragCoord.x));
                                    GLF_live14b--;
                                }
                            }
                        }
                        if (uint(donor_replacementGLF_dead12j) < uaddCarry(uint(GLF_live9MATRIX_N), 1u, donor_replacementGLF_dead12uselessOutVariable)) {
                            ;
                        }
                    }
                }
                int GLF_live7cols = _GLF_FUZZED(-12800);
                int GLF_live7looplimiter2 = 0;
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead13c8 = _GLF_FUZZED(false);
                    vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(GLF_live8injectionSwitch);
                    if (!donor_replacementGLF_dead13c8) {
                        ;
                    }
                }
                uint GLF_live7matrix_number = _GLF_FUZZED(7476u);
                int GLF_live7rows = _GLF_FUZZED(-29089);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    int donor_replacementGLF_dead13msb8 = _GLF_FUZZED(ivec2(62185, -55882)[1]);
                    vec2 donor_replacementGLF_dead13position = _GLF_FUZZED(max(vec2(1299.3862, -519.325), vec2(-3.9, 623.128)));
                    if (abs(donor_replacementGLF_dead13position.y - donor_replacementGLF_dead13position.x) < 0.5) {
                        GLF_dead13b_b = clamp(float(bitfieldExtract(int(GLF_dead13resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead13msb8)), GLF_dead13b_b * float(bitCount(donor_replacementGLF_dead13msb8)) * 3.0);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return;
                    {
                        int GLF_live14a = _GLF_FUZZED(((-36623) + (false ? 11297 : 94179)));
                        int GLF_live14b = _GLF_FUZZED(((32449 + 61252) & 60494));
                        int GLF_live14looplimiter1 = 0;
                        vec2 GLF_live14uv = _GLF_FUZZED(vec2(-45.98, 20.16));
                        {
                            if (GLF_live14looplimiter1 >= 3) {
                                ;
                            }
                            GLF_live14looplimiter1++;
                            {
                                GLF_live14uv.y -= step(GLF_live14injectionSwitch.y, GLF_live14uv.x) + float(GLF_live14a);
                                GLF_live14uv.x *= (isnan(GLF_live14uv.y) ? cosh(GLF_live14gl_FragCoord.y) : tanh(GLF_live14gl_FragCoord.x));
                                GLF_live14b--;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        bool GLF_live16c3 = _GLF_FUZZED(true);
                        if (!GLF_live16c3) {
                            ;
                        }
                    }
                    bool donor_replacementGLF_dead13c5 = _GLF_FUZZED((mat4x3(9.2, 8209.2713, -676.549, 894.572, 7.9, 7.1, -700.722, -3103.5183, -0.5, -19.16, -7.0, -1.0) == outerProduct(floor(vec3(-814.465, -7885.8726, 1874.1420)), GLF_live1_GLF_color)));
                    vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(GLF_live8injectionSwitch);
                    {
                        bool GLF_live16c3 = _GLF_FUZZED(((vec2(67.75, 8.9) * mat2(-6.5, 4.1, -2650.7700, 5.3)) == vec2(-9033.3320, 4.6)));
                        if (!GLF_live16c3) {
                            ;
                        }
                    }
                    vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(cosh(c));
                    if (!donor_replacementGLF_dead13c5) {
                        ;
                    }
                }
                {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (GLF_live7looplimiter2 >= 3) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        } else {
                            ;
                        }
                        {
                            int GLF_live14looplimiter3 = 0;
                            if (GLF_live14looplimiter3 >= 3) {
                                ;
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    } else {
                        GLF_live7looplimiter2++;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            return;
                            {
                                vec2 GLF_live16center = _GLF_FUZZED((vec2(98.77, -6.3) * (mat3x2(9923.0433, -8.1, 7.6, -502.286, -4258.1155, -4.0) * vec3(-84.18, -668.678, -26.59))));
                                int GLF_live16looplimiter0 = 0;
                                vec2 GLF_live16position = _GLF_FUZZED((vec3(-830.487, -3.2, 2.2) * mat2x3(554.888, 2.8, 2.0, 98.26, -67.95, -2.6)));
                                vec3 GLF_live16result = _GLF_FUZZED((vec3(5349.6450, -5835.6837, 4.4)));
                                for (int GLF_live16i = 35; GLF_live16i >= 0; GLF_live16i--) {
                                    if (GLF_live16looplimiter0 >= 7) {
                                        break;
                                    }
                                    GLF_live16looplimiter0++;
                                    {
                                        vec3 GLF_live16d = _GLF_FUZZED(vec3(315.191, -5987.1181, 86.46));
                                        GLF_live16d = GLF_live16drawShape(GLF_live16position, GLF_live16center + vec2(sin(float(GLF_live16i) / 10.0 + GLF_live16time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live16i) / 100.0), 0.01, float(GLF_live16i)));
                                        if (length(GLF_live16d) <= 0.0) {
                                            continue;
                                        }
                                        GLF_live16result = vec3(GLF_live16d);
                                    }
                                }
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                {
                                    ;
                                }
                                {
                                    bool GLF_live16c7 = _GLF_FUZZED(false);
                                    vec2 GLF_live16pos = _GLF_FUZZED(vec2(-8.0, 3224.4598));
                                    vec3 GLF_live16setting = _GLF_FUZZED(vec3(5481.7799, -7.8, 2680.1539));
                                    if (!GLF_live16c7) {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                    {
                        {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        ;
                                    }
                                }
                                return;
                            }
                            int GLF_live7looplimiter1 = 0;
                            for (int GLF_live7c = 0; GLF_live7c < GLF_live7cols; GLF_live7c++) {
                                if (GLF_live7looplimiter1 >= 3) {
                                    break;
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, true))))) {
                                        break;
                                    }
                                }
                                for (int _injected_loop_counter = _GLF_IDENTITY(((0 & GLF_dead6N) | 0), (((0 & GLF_dead6N) | 0)) | (((0 & GLF_dead6N) | 0))); _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    GLF_live7looplimiter1++;
                                }
                                {
                                    {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        int GLF_live7looplimiter0 = 0;
                                        for (int GLF_live7r = 0; _GLF_IDENTITY(GLF_live7r < GLF_live7rows, (GLF_live7r < GLF_live7rows) && true); GLF_live7r++) {
                                            if (GLF_live7looplimiter0 >= 3) {
                                                break;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    {
                                                        int GLF_live17i = _GLF_FUZZED(17252);
                                                        int GLF_live17j = _GLF_FUZZED(-55278);
                                                        int GLF_live17k = _GLF_FUZZED(36280);
                                                        int GLF_live17looplimiter0 = 0;
                                                        int GLF_live17mid = _GLF_FUZZED(90280);
                                                        int GLF_live17to = _GLF_FUZZED(67124);
                                                        while (GLF_live17i <= GLF_live17mid && GLF_live17j <= GLF_live17to) {
                                                            if (GLF_live17looplimiter0 >= 3) {
                                                                break;
                                                            }
                                                            GLF_live17looplimiter0++;
                                                            {
                                                                if (GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 10)] < GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j, 10)]) {
                                                                    GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i++, 10)];
                                                                } else {
                                                                    GLF_live17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17k++, 10)] = GLF_live17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17j++, 10)];
                                                                }
                                                            }
                                                        }
                                                    }
                                                    bool donor_replacementGLF_dead13c1 = _GLF_FUZZED(true);
                                                    if (!donor_replacementGLF_dead13c1) {
                                                        ;
                                                    }
                                                }
                                                discard;
                                            }
                                            GLF_live7looplimiter0++;
                                            {
                                                {
                                                    int GLF_live14a = _GLF_FUZZED(77462);
                                                    int GLF_live14b = _GLF_FUZZED(-63329);
                                                    int GLF_live14c = _GLF_FUZZED(48922);
                                                    int GLF_live14looplimiter2 = 0;
                                                    vec2 GLF_live14uv = _GLF_FUZZED(vec2(5.2, -8784.0390));
                                                    {
                                                        if (GLF_live14looplimiter2 >= 3) {
                                                            ;
                                                        }
                                                        GLF_live14looplimiter2++;
                                                        {
                                                            GLF_live14uv.y -= step(GLF_live14injectionSwitch.y, GLF_live14uv.x) + float(GLF_live14a) + float(GLF_live14b);
                                                            GLF_live14uv.x += ldexp(GLF_live14injectionSwitch.y, isinf(GLF_live14uv.y + GLF_live14uv.x) ? findMSB(GLF_live14b) : findMSB(GLF_live14a));
                                                            GLF_live14c--;
                                                        }
                                                    }
                                                }
                                                switch (GLF_live7matrix_number) {
                                                    case 0u:
                                                        GLF_live7m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 2)] = GLF_live7one;
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                        break;
                                                    case 1u:
                                                        GLF_live7m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 3)] = GLF_live7one;
                                                        break;
                                                    case 2u:
                                                        GLF_live7m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = GLF_live7one;
                                                        break;
                                                    case 3u:
                                                        GLF_live7m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 2)] = GLF_live7one;
                                                        break;
                                                        {
                                                            vec2 GLF_live17color = _GLF_FUZZED(((-26.68) * vec2(4.5, 5.2)));
                                                            int GLF_live17i = _GLF_FUZZED((+85058));
                                                            vec3 GLF_live17vecCoor = _GLF_FUZZED((mat3(1.7, -880.706, 61.33, 7.9, -36.61, 9.2, 7.3, -3.7, -6962.0250) * vec3(2.5, -98.99, -380.235)));
                                                            if (int(GLF_live17gl_FragCoord[1]) < 60) {
                                                                GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[1]))));
                                                                GLF_live17color[1] *= atan(faceforward(GLF_live17injectionSwitch, GLF_live17color.xx, GLF_live17vecCoor.yx).y);
                                                                ;
                                                            } else if (int(GLF_live17gl_FragCoord[1]) < 90) {
                                                                GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[2]))));
                                                                GLF_live17color.x += atanh(GLF_live17color.x) * cosh(GLF_live17injectionSwitch.y) * smoothstep(GLF_live17color, GLF_live17injectionSwitch, GLF_live17gl_FragCoord.yy).x;
                                                                ;
                                                            } else if (int(GLF_live17gl_FragCoord[1]) < 120) {
                                                                GLF_live17color = fract(acosh(clamp(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[3])), 1.0, 1000.0)));
                                                                GLF_live17color.x += (isnan(GLF_live17gl_FragCoord.x) ? log2(GLF_live17gl_FragCoord.x) : log2(GLF_live17gl_FragCoord.y));
                                                                ;
                                                            } else if (int(GLF_live17gl_FragCoord[1]) < 150) {
                                                                ;
                                                            } else if (int(GLF_live17gl_FragCoord[1]) < 180) {
                                                                GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[4]))));
                                                                GLF_live17color[1] += asinh(GLF_live17gl_FragCoord.y * ldexp(GLF_live17color.y, -GLF_live17i));
                                                                ;
                                                            } else if (int(GLF_live17gl_FragCoord[1]) < 210) {
                                                                GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[5]))));
                                                                GLF_live17color.y -= tanh(GLF_live17color.x) / cosh(GLF_live17color.y);
                                                                ;
                                                            } else if (int(GLF_live17gl_FragCoord[1]) < 240) {
                                                                GLF_live17color = fract(asinh(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[6]))));
                                                                GLF_live17color.y -= isnan(float(GLF_live17i)) ? tanh(GLF_live17gl_FragCoord.x) : atanh(GLF_live17gl_FragCoord.y);
                                                                ;
                                                            } else if (int(GLF_live17gl_FragCoord[1]) < 270) {
                                                                GLF_live17color = fract(sin(GLF_live17vecCoor.yx - trunc(float(GLF_live17data[7]))));
                                                                GLF_live17color.y *= mix(normalize(GLF_live17vecCoor), normalize(vec3(GLF_live17color, degrees(GLF_live17color.x))), GLF_live17injectionSwitch.x).y;
                                                                ;
                                                            } else {
                                                                ;
                                                            }
                                                        }
                                                    case 4u:
                                                        GLF_live7m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 3)] = GLF_live7one;
                                                        do {
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                                do {
                                                                    return;
                                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                        break;
                                                    case 5u:
                                                        GLF_live7m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = GLF_live7one;
                                                        break;
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                    case 6u:
                                                        GLF_live7m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 2)] = GLF_live7one;
                                                        break;
                                                    case 7u:
                                                        {
                                                            int GLF_live17looplimiter4 = 0;
                                                            if (GLF_live17looplimiter4 >= 3) {
                                                                ;
                                                            }
                                                        }
                                                        GLF_live7m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 3)] = GLF_live7one;
                                                        break;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                                            continue;
                                                        }
                                                    case 8u:
                                                        GLF_live7m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7r, 4)] = GLF_live7one;
                                                        break;
                                                        {
                                                            int GLF_live14a = _GLF_FUZZED(((-75683) - 23700));
                                                            int GLF_live14b = _GLF_FUZZED((int(133063u)));
                                                            int GLF_live14c = _GLF_FUZZED((-79145));
                                                            int GLF_live14d = _GLF_FUZZED((ivec3(49542, 17762, -74345) | 55617).y);
                                                            vec2 GLF_live14uv = _GLF_FUZZED(vec2(-1.0, 5.2));
                                                            {
                                                                GLF_live14uv.y -= step(GLF_live14injectionSwitch.y, GLF_live14uv.x) + float(GLF_live14a) + float(GLF_live14b) + float(GLF_live14c);
                                                                GLF_live14d--;
                                                            }
                                                        }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    discard;
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        discard;
                                    }
                                }
                            }
                        }
                        GLF_live7matrix_number = GLF_live7matrix_number + 1u;
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead13c8 = _GLF_FUZZED(true);
                            vec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(fwidth(GLF_live10resolution));
                            vec3 donor_replacementGLF_dead13setting = _GLF_FUZZED(vec3(9916.1493, 4.9, -99.51));
                            if (!donor_replacementGLF_dead13c8) {
                                ;
                            }
                        }
                    }
                }
            }
        }
    }
}
