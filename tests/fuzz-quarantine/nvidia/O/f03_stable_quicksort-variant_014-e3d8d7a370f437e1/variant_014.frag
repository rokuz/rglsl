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
vec4 GLF_dead9gl_FragCoord = _GLF_FUZZED((vec3(8944.4868, 3.0, -620.953) + vec3(26.51, 6.1, -5102.2619)).xzxx.yyxw);

layout(set = 0, binding = 1) uniform buf1 {
    vec2 GLF_dead9injectionSwitch;
};

const int GLF_dead9N = 10;
int GLF_dead9data[10] = int[10](_GLF_FUZZED(41938), _GLF_FUZZED((~1719)), _GLF_FUZZED((44701 & (-70952))), _GLF_FUZZED(51559), _GLF_FUZZED(-22710), _GLF_FUZZED((((-99946) - (-10667)) | (-31670))), _GLF_FUZZED(39876), _GLF_FUZZED(39854), _GLF_FUZZED(64642), _GLF_FUZZED(5114)), GLF_dead9temp[10] = int[10](_GLF_FUZZED(37477), _GLF_FUZZED(98129), _GLF_FUZZED(70845), _GLF_FUZZED((19002 | (-87144))), _GLF_FUZZED(-38429), _GLF_FUZZED(-36470), _GLF_FUZZED(((-72245) ^ (-17225))), _GLF_FUZZED(-36415), _GLF_FUZZED(-13995), _GLF_FUZZED(-42689));

void GLF_dead9merge(int GLF_dead9from, int GLF_dead9mid, int GLF_dead9to) {
    int GLF_dead9k = GLF_dead9from, GLF_dead9i = GLF_dead9from, GLF_dead9j = GLF_dead9mid + 1;
    while (GLF_dead9i <= GLF_dead9mid && GLF_dead9j <= GLF_dead9to) {
        if (GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 10)] < GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9j, 10)]) {
            GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9k++, 10)] = GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i++, 10)];
        } else {
            GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9k++, 10)] = GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9j++, 10)];
        }
    }
    while (GLF_dead9i < GLF_dead9N && GLF_dead9i <= GLF_dead9mid) {
        GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9k++, 10)] = GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i++, 10)];
    }
    for (int GLF_dead9i = GLF_dead9from; GLF_dead9i <= GLF_dead9to; GLF_dead9i++) {
        GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 10)] = GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 10)];
    }
}

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_dead11injectionSwitch;
};

struct _GLF_struct_4 {
    mat2 _f0;
    float _f1;
    vec3 donor_replacementGLF_dead7color;
};

struct _GLF_struct_5 {
    uint _f0;
    mat3x4 _f1;
    float GLF_dead4x_new;
    mat2x4 _f2;
    mat3x2 _f3;
};

struct _GLF_struct_7 {
    uvec3 _f0;
    float donor_replacementGLF_dead6grey;
    mat3 _f1;
};

struct _GLF_struct_6 {
    mat4x3 _f0;
    bvec4 _f1;
    bvec2 _f2;
    float _f3;
    _GLF_struct_7 _f4;
};

struct _GLF_struct_13 {
    mat3x4 _f0;
    mat2x4 _f1;
    mat2x4 _f2;
    uvec3 _f3;
};

struct _GLF_struct_12 {
    mat3x2 _f0;
    int _f1;
    ivec2 _f2;
    int _f3;
    vec4 _f4;
    _GLF_struct_13 _f5;
    ivec3 _f6;
};

struct _GLF_struct_11 {
    bvec2 _f0;
    int _f1;
    mat2x4 _f2;
    float _f3;
};

struct _GLF_struct_10 {
    uvec3 _f0;
};

struct _GLF_struct_9 {
    ivec4 _f0;
    uint _f1;
    uvec3 _f2;
    mat3x2 _f3;
    _GLF_struct_10 _f4;
    _GLF_struct_11 _f5;
};

struct _GLF_struct_8 {
    _GLF_struct_9 _f0;
    _GLF_struct_12 _f1;
    int GLF_live2looplimiter0;
    vec2 _f2;
};

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead4resolution;
};

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead7injectionSwitch;
};

struct GLF_dead7QuicksortObject {
    int numbers[10];
};

GLF_dead7QuicksortObject GLF_dead7obj = GLF_dead7QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead7swap(int GLF_dead7i, int GLF_dead7j) {
    int GLF_dead7temp = GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 10)];
    GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 10)] = GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7j, 10)];
    GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7j, 10)] = GLF_dead7temp;
}

vec3 GLF_dead7palette(vec3 GLF_dead7a, vec3 GLF_dead7b, vec3 GLF_dead7c, vec3 GLF_dead7d) {
    return fract(mix(GLF_dead7d * GLF_dead7a, GLF_dead7a * GLF_dead7c, GLF_dead7b + GLF_dead7d - GLF_dead7c));
}

layout(set = 0, binding = 5) uniform buf5 {
    float GLF_dead5time;
};

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_dead5resolution;
};

float GLF_dead5h_r = _GLF_FUZZED(233.948);
float GLF_dead5s_g = _GLF_FUZZED((+vec2(-6575.4920, 104.144)).r);
float GLF_dead5b_b = _GLF_FUZZED(-294.327);

void GLF_dead5doConvert() {
    int GLF_dead5msb8 = 256;
    vec3 GLF_dead5temp = _GLF_FUZZED(vec3(-2.9, 2.3, 3.1));
    GLF_dead5temp = GLF_dead5b_b * (float(bitCount(GLF_dead5msb8)) - GLF_dead5s_g) + (GLF_dead5b_b - GLF_dead5b_b * (float(bitCount(GLF_dead5msb8)) - GLF_dead5s_g)) * clamp(abs(abs(6.0 * (GLF_dead5h_r - vec3(bitfieldReverse(0), bitCount(GLF_dead5msb8), 2) / 3.0)) - 3.0) - float(bitCount(GLF_dead5msb8)), float(bitfieldExtract(int(GLF_dead5resolution.x), 0, 0)), float(bitCount(int(GLF_dead5resolution.x))));
    GLF_dead5h_r = GLF_dead5temp.x;
    GLF_dead5s_g = GLF_dead5temp.y;
    GLF_dead5b_b = GLF_dead5temp.z;
}

vec3 GLF_dead5computeColor(float GLF_dead5c, vec2 GLF_dead5position) {
    int GLF_dead5msb8 = 256;
    GLF_dead5h_r = fract(GLF_dead5c);
    GLF_dead5s_g = float(bitCount(GLF_dead5msb8));
    if (_GLF_DEAD(false)) {
        if (GLF_dead5position.x < 0.0) {
            GLF_dead5h_r = 1.0 - GLF_dead5h_r;
        }
    }
    GLF_dead5b_b = (0.5 + (sin(GLF_dead5time) * 0.5 + 0.5));
    GLF_dead5doConvert();
    GLF_dead5s_g *= float(bitCount(GLF_dead5msb8)) / GLF_dead5position.y;
    GLF_dead5h_r *= float(bitCount(GLF_dead5msb8)) / GLF_dead5position.x;
    if (abs(GLF_dead5position.y - GLF_dead5position.x) < 0.5) {
        GLF_dead5b_b = clamp(float(bitfieldExtract(int(GLF_dead5resolution.x), 0, 0)), float(bitCount(GLF_dead5msb8)), GLF_dead5b_b * float(bitCount(GLF_dead5msb8)) * 3.0);
    }
    return vec3(GLF_dead5h_r, GLF_dead5s_g, GLF_dead5b_b);
}

vec3 GLF_dead5defaultColor() {
    return vec3(float(bitfieldExtract(int(GLF_dead5resolution.y), 0, 0)));
}

vec3 GLF_dead5drawShape(vec2 GLF_dead5pos, vec2 GLF_dead5square, vec3 GLF_dead5setting) {
    int GLF_dead5msb8 = 256;
    bool GLF_dead5c1 = GLF_dead5pos.x - GLF_dead5setting.x < GLF_dead5square.x;
    if (!GLF_dead5c1) {
        return GLF_dead5defaultColor();
    }
    bool GLF_dead5c2 = GLF_dead5pos.x + GLF_dead5setting.x > GLF_dead5square.x;
    if (!GLF_dead5c2) {
        return GLF_dead5defaultColor();
    }
    bool GLF_dead5c3 = GLF_dead5pos.y - GLF_dead5setting.x < GLF_dead5square.y;
    if (!GLF_dead5c3) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                for (int GLF_dead9i = GLF_dead5msb8; GLF_dead9i < GLF_dead5msb8; GLF_dead9i += 2 * GLF_dead5msb8) {
                    int GLF_dead9from = GLF_dead9i;
                    int GLF_dead9mid = GLF_dead9i + GLF_dead5msb8 - 1;
                    int GLF_dead9to = min(GLF_dead9i + 2 * GLF_dead5msb8 - 1, GLF_dead5msb8);
                    GLF_dead9merge(GLF_dead9from, GLF_dead9mid, GLF_dead9to);
                }
            }
        }
        return GLF_dead5defaultColor();
    }
    if (_GLF_DEAD(false)) {
        {
            discard;
        }
    }
    bool GLF_dead5c4 = GLF_dead5pos.y + GLF_dead5setting.x > GLF_dead5square.y;
    if (!GLF_dead5c4) {
        return GLF_dead5defaultColor();
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
            if (GLF_dead5square.y < 0.0) {
                GLF_dead5s_g = -GLF_dead5s_g;
            }
        }
    }
    bool GLF_dead5c5 = GLF_dead5pos.x - (GLF_dead5setting.x - GLF_dead5setting.y) < GLF_dead5square.x;
    if (!GLF_dead5c5) {
        return GLF_dead5computeColor(GLF_dead5setting.z / (5.0 * float(findMSB(GLF_dead5msb8))), GLF_dead5pos);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                for (int GLF_dead11i = -1; GLF_dead11i <= int(GLF_dead11injectionSwitch.y); GLF_dead11i++) {
                    vec2 GLF_dead11g = vec2(float(GLF_dead5msb8), float(GLF_dead11i));
                    vec2 GLF_dead11o = mix(GLF_dead5pos, GLF_dead11g, 0.2);
                    if (GLF_dead11injectionSwitch.x < (GLF_dead5setting.x)) {
                        int GLF_dead11k = 1;
                        while (GLF_dead11k >= 0) {
                            GLF_dead11o = GLF_dead11o + GLF_dead11o;
                            GLF_dead11k--;
                        }
                        GLF_dead5setting = vec3(GLF_dead11injectionSwitch.x, cos(GLF_dead11o));
                    }
                }
            }
        }
    }
    bool GLF_dead5c6 = GLF_dead5pos.x + (GLF_dead5setting.x - GLF_dead5setting.y) > GLF_dead5square.x;
    if (!GLF_dead5c6) {
        return GLF_dead5computeColor(GLF_dead5setting.z / (5.0 * float(findMSB(GLF_dead5msb8))), GLF_dead5pos);
        if (_GLF_DEAD(false)) {
            if (length(GLF_dead5pos) < 0.001) {
                ;
            }
        }
    }
    bool GLF_dead5c7 = GLF_dead5pos.y - (GLF_dead5setting.x - GLF_dead5setting.y) < GLF_dead5square.y;
    if (!GLF_dead5c7) {
        return GLF_dead5computeColor(GLF_dead5setting.z / (5.0 * float(findMSB(GLF_dead5msb8))), GLF_dead5pos);
    }
    bool GLF_dead5c8 = GLF_dead5pos.y + (GLF_dead5setting.x - GLF_dead5setting.y) > GLF_dead5square.y;
    if (!GLF_dead5c8) {
        return GLF_dead5computeColor(GLF_dead5setting.z / (5.0 * float(findMSB(GLF_dead5msb8))), GLF_dead5pos);
    }
    return GLF_dead5defaultColor();
    if (_GLF_DEAD(false)) {
        {
            GLF_dead5b_b = GLF_dead5pos.x / GLF_dead5pos.y;
        }
    }
}

vec4 GLF_dead6gl_FragCoord = _GLF_FUZZED(vec4(vec2(4.1, -10.41), (true ? (-829.339) : 8314.1307), (float(98282))));
const int GLF_dead6N = 10;
int GLF_dead6data[10] = int[10](_GLF_FUZZED(int(true)), _GLF_FUZZED(-72573), _GLF_FUZZED((-54946)), _GLF_FUZZED(91305), _GLF_FUZZED((7792 | (-84637))), _GLF_FUZZED(7448), _GLF_FUZZED((-57276)), _GLF_FUZZED(51593), _GLF_FUZZED(24405), _GLF_FUZZED(-61646)), GLF_dead6temp[10] = int[10](_GLF_FUZZED(((-3042) | (+14130))), _GLF_FUZZED((+(-71045))), _GLF_FUZZED((ivec4(85978, -81780, -51331, -62631) * ivec4(626, 95346, -77638, -12688)).b), _GLF_FUZZED(ivec2(ivec3(-28520, 39568, -52268)).s), _GLF_FUZZED(-40680), _GLF_FUZZED((-16608)), _GLF_FUZZED(ivec4(19478, 76628, -68275, 56166).g), _GLF_FUZZED(ivec4(-62056, 20565, 36137, -65035).s), _GLF_FUZZED(-9900), _GLF_FUZZED(-9310));

void GLF_dead6merge(int GLF_dead6from, int GLF_dead6mid, int GLF_dead6to) {
    int GLF_dead6k = GLF_dead6from, GLF_dead6i = GLF_dead6from, GLF_dead6j = GLF_dead6mid + 1;
    while (GLF_dead6i <= GLF_dead6mid && GLF_dead6j <= GLF_dead6to) {
        if (GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 10)] < GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 10)]) {
            GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6k++, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i++, 10)];
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(_GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)), dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)))))))) {
                vec2 donor_replacementGLF_dead9color = _GLF_FUZZED(GLF_dead5resolution);
                vec3 donor_replacementGLF_dead9vecCoor = _GLF_FUZZED((vec2(1.0, 8.4) * mat3x2(-783.770, -9418.3178, 66.20, 925.889, 6.5, 3.6)));
                if (int(GLF_dead9gl_FragCoord[1]) < 240) {
                    donor_replacementGLF_dead9color = fract(asinh(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[6]))));
                    donor_replacementGLF_dead9color.y -= isnan(float(GLF_dead6mid)) ? tanh(GLF_dead9gl_FragCoord.x) : atanh(GLF_dead9gl_FragCoord.y);
                    break;
                } else if (int(GLF_dead9gl_FragCoord[1]) < 270) {
                    donor_replacementGLF_dead9color = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[7]))));
                    donor_replacementGLF_dead9color.y *= mix(normalize(donor_replacementGLF_dead9vecCoor), normalize(vec3(donor_replacementGLF_dead9color, degrees(donor_replacementGLF_dead9color.x))), GLF_dead9injectionSwitch.x).y;
                    break;
                } else {
                    discard;
                }
            }
        } else {
            GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6k++, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j++, 10)];
        }
    }
    while (GLF_dead6i < GLF_dead6N && GLF_dead6i <= GLF_dead6mid) {
        GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6k++, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i++, 10)];
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec3 donor_replacementGLF_dead11m = _GLF_FUZZED(vec3(-7432.4621, -6005.2756, 70.69));
            vec2 donor_replacementGLF_dead11n = _GLF_FUZZED(GLF_dead4resolution);
            {
                vec2 GLF_dead11g = vec2(float(GLF_dead6i), float(GLF_dead6mid));
                vec2 GLF_dead11o = mix(donor_replacementGLF_dead11n, GLF_dead11g, 0.2);
                if (GLF_dead11injectionSwitch.x < (donor_replacementGLF_dead11m.x)) {
                    int GLF_dead11k = 1;
                    while (GLF_dead11k >= 0) {
                        GLF_dead11o = GLF_dead11o + GLF_dead11o;
                        GLF_dead11k--;
                    }
                    donor_replacementGLF_dead11m = vec3(GLF_dead11injectionSwitch.x, cos(GLF_dead11o));
                }
            }
        }
    }
    for (int GLF_dead6i = GLF_dead6from; GLF_dead6i <= GLF_dead6to; GLF_dead6i++) {
        GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 10)] = GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 10)];
    }
}

struct _GLF_struct_2 {
    mat2 _f0;
    ivec3 _f1;
    ivec2 _f2;
    bool _f3;
    uvec2 _f4;
    mat3x4 _f5;
};

struct _GLF_struct_1 {
    vec2 _f0;
    float _f1;
    _GLF_struct_2 _f2;
    mat3x2 _f3;
};

struct _GLF_struct_0 {
    mat3 _f0;
    _GLF_struct_1 _f1;
    bool _f2;
    ivec3 _f3;
    float GLF_live3th;
};

struct _GLF_struct_3 {
    mat2x3 _f0;
    ivec2 GLF_live2pos;
};

layout(set = 0, binding = 7) uniform buf7 {
    vec2 injectionSwitch;
};

const int GLF_live2dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, _GLF_IDENTITY(114, (114) | (114)), 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, _GLF_IDENTITY(223, int(ivec2(223, 1))), 212, 200, 190, 180, _GLF_IDENTITY(172, int(ivec2(172, 1))), 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, _GLF_IDENTITY(80, clamp(80, 80, _GLF_IDENTITY(80, _GLF_IDENTITY(int(int(80)), (false ? _GLF_FUZZED(-3887) : int(int(80))))))), 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, _GLF_IDENTITY(45, (_GLF_IDENTITY(45, (45) << 0)) - 0), 60, 77, 94);
layout(set = 0, binding = 8) uniform sampler2D GLF_live0tex;
vec4 GLF_live1_GLF_color = _GLF_FUZZED(vec4(0.8, 0.6, 6.8, -4408.6025));

layout(set = 0, binding = 9) uniform buf9 {
    vec2 GLF_live1injectionSwitch;
};

float GLF_live1compute_derivative_x(float GLF_live1v) {
    return dFdx(GLF_live1v) * GLF_live1injectionSwitch.y;
}

float GLF_live1compute_derivative_y(float GLF_live1v) {
    return dFdy(GLF_live1v) * GLF_live1injectionSwitch.y;
}

float GLF_live1compute_stripe(float GLF_live1v) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return 1.0;
    }
    return smoothstep(-.9, 1., (GLF_live1v) / ((GLF_live1injectionSwitch.y > GLF_live1injectionSwitch.x) ? GLF_live1compute_derivative_x(GLF_live1v) : GLF_live1compute_derivative_y(GLF_live1v)));
}

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

struct QuicksortObject {
    int numbers[10];
};

QuicksortObject obj;

void swap(int i, int j) {
    int temp = obj.numbers[i];
    obj.numbers[i] = obj.numbers[j];
    obj.numbers[j] = temp;
}

int performPartition(int l, int h) {
    {
        switch (_GLF_SWITCH((98446 & 0))) {
            case 39:
                return 25967;
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))) {
                    vec3 donor_replacementGLF_dead11m = _GLF_FUZZED(exp(vec3(-5.7, -6690.2444, 0.9)));
                    vec2 donor_replacementGLF_dead11n = _GLF_FUZZED(GLF_live1_GLF_color.gg);
                    {
                        for (int GLF_dead11i = -1; GLF_dead11i <= int(GLF_dead11injectionSwitch.y); GLF_dead11i++) {
                            vec2 GLF_dead11g = vec2(float(l), float(GLF_dead11i));
                            vec2 GLF_dead11o = mix(donor_replacementGLF_dead11n, GLF_dead11g, 0.2);
                            if (GLF_dead11injectionSwitch.x < (donor_replacementGLF_dead11m.x)) {
                                int GLF_dead11k = 1;
                                while (GLF_dead11k >= 0) {
                                    GLF_dead11o = GLF_dead11o + GLF_dead11o;
                                    GLF_dead11k--;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = tanh(vec4(8.7, 1.5, 73.28, -784.779));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(vec2(0.0, 0.0)))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead11m = vec3(GLF_dead11injectionSwitch.x, cos(GLF_dead11o));
                            }
                        }
                    }
                }
            case 0:
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-9.4, 4.7, -75.18, 0.1);
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead5h_r = -GLF_dead5h_r;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec2 GLF_live0coord = _GLF_FUZZED(vec2(670.997, -4666.5691));
                int GLF_live0i = _GLF_FUZZED(80371);
            case 4:
                int GLF_live0looplimiter0 = 0;
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead9color = _GLF_FUZZED((GLF_dead5b_b + GLF_live1injectionSwitch));
                    vec3 donor_replacementGLF_dead9vecCoor = _GLF_FUZZED((false ? vec3(92.38, 4.6, -40.27) : round(vec3(-4.6, 0.8, -886.873))));
                    {
                        donor_replacementGLF_dead9color = fract(acosh(clamp(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[3])), 1.0, 1000.0)));
                        donor_replacementGLF_dead9color.x += (isnan(GLF_dead9gl_FragCoord.x) ? log2(GLF_dead9gl_FragCoord.x) : log2(GLF_dead9gl_FragCoord.y));
                        break;
                    }
                }
                vec4 GLF_live0texel = _GLF_FUZZED(vec4(-357.964, -_GLF_IDENTITY(3643.8828, (3643.8828) - length(vec4(0.0, 0.0, 0.0, 0.0))), 3805.4365, -1.2));
            case 92:
                {
                    if (GLF_live0looplimiter0 >= 3) {
                        ;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(vec3(3.5, 7.3, 0.1), -866.299);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = degrees((mat2x4(-43.89, -41.88, -88.92, -95.52, -5.0, -60.63, 51.05, -3.3) * vec2(-80.49, 9.2)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))))) {
                            float donor_replacementGLF_dead4xCoord = _GLF_FUZZED(inversesqrt(8.7));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = atan(vec4(-2.1, 2.3, -5.1, 4.5));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            float donor_replacementGLF_dead4yCoord = _GLF_FUZZED(-88.36);
                            if (h < bitfieldInsert(l, 0, 0, 0)) {
                                ;
                            } else {
                                ;
                            }
                        }
                    }
                    GLF_live0looplimiter0++;
                    {
                        switch (_GLF_SWITCH(0)) {
                            case 0:
                            case 23:
                            case 72:
                                GLF_live0coord = GLF_live0texel.xz + GLF_live0texel.yy;
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead10x = _GLF_FUZZED(h);
                                    if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + h * h > 262144) {
                                        break;
                                    }
                                }
                                GLF_live0coord = floor(GLF_live0coord * 256.0) / 256.0;
                            case 89:
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = degrees(vec4(-47.70, 5049.3833, -9.1, 5155.4243));
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-7.1, 5827.4547, 2.5, 9.5);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-1.0, -675.438, -6.7, 9224.0226);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-6591.2547, -1248.5595, -6591.9711, 4.0);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    bool donor_replacementGLF_dead5c8 = _GLF_FUZZED((bvec2(false, true) == bvec2(false, false)));
                                    int donor_replacementGLF_dead5msb8 = _GLF_FUZZED(GLF_live0i);
                                    vec3 donor_replacementGLF_dead5setting = _GLF_FUZZED(sinh(vec3(-6532.5534, -3.8, 1235.4431)));
                                    if (!donor_replacementGLF_dead5c8) {
                                        ;
                                        if (_GLF_DEAD(false)) {
                                            if (int(GLF_dead9gl_FragCoord[1]) < 240) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(2.1, -2.2, -99.41, 2.0);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                GLF_live0coord = fract(asinh(donor_replacementGLF_dead5setting.yx - trunc(float(GLF_dead9data[6]))));
                                                GLF_live0coord.y -= isnan(float(GLF_live0i)) ? tanh(GLF_dead9gl_FragCoord.x) : atanh(GLF_dead9gl_FragCoord.y);
                                                break;
                                            } else if (int(GLF_dead9gl_FragCoord[1]) < 270) {
                                                GLF_live0coord = fract(sin(donor_replacementGLF_dead5setting.yx - trunc(float(GLF_dead9data[7]))));
                                                GLF_live0coord.y *= mix(normalize(donor_replacementGLF_dead5setting), normalize(vec3(GLF_live0coord, degrees(GLF_live0coord.x))), GLF_dead9injectionSwitch.x).y;
                                                break;
                                            } else {
                                                discard;
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = tan(vec4(2.4, 66.81, 8.6, 72.74));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                            case 51:
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                                        {
                                            discard;
                                        }
                                    }
                                    _GLF_color = ((mat4(61.06, -91.36, -3311.9238, 8.8, 1.7, 3.8, 589.109, 24.59, -476.007, 2823.3791, 4964.8663, -8.4, -53.02, -6.3, 3464.6507, -895.697) * mat4(8.7, 552.790, 81.96, 8.5, 2.2, -2.6, -1.2, -6438.0348, 4.0, -9.6, -44.98, -772.133, -4245.4728, -349.857, -3342.5683, 1141.5228)) * vec4(-4755.4469, 7409.6803, -4.2, -4907.3423));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return 1;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    float donor_replacementGLF_dead8th = _GLF_FUZZED(cos(63.56));
                                    {
                                        donor_replacementGLF_dead8th = -donor_replacementGLF_dead8th;
                                    }
                                }
                                GLF_live0texel = texture(GLF_live0tex, GLF_live0coord);
                            case 8:
                            case 17:
                                GLF_live0i++;
                                break;
                            case 55:
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        if (GLF_live0coord.x < 0.0) {
                                            GLF_dead5s_g = 1.0 - GLF_dead5s_g;
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = sqrt(vec4(444.498, -9454.8148, 991.412, 67.75));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            float donor_replacementGLF_dead8th = _GLF_FUZZED(GLF_dead5s_g);
                                            {
                                                donor_replacementGLF_dead8th = 1.0 - donor_replacementGLF_dead8th;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            {
                                                GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(l, 10)] = (10 - l) * int(GLF_dead7injectionSwitch.y);
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(0.1, -3.2, -7.5, 1828.8812);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                vec3 donor_replacementGLF_dead9vecCoor = _GLF_FUZZED(vec3(-339.878, -609.516, -9.4));
                                                if (int(GLF_dead9gl_FragCoord[1]) < 270) {
                                                    GLF_live0coord = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[7]))));
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-4.4, -37.14, 8329.9634, 7.3);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    GLF_live0coord.y *= mix(normalize(donor_replacementGLF_dead9vecCoor), normalize(vec3(GLF_live0coord, degrees(GLF_live0coord.x))), GLF_dead9injectionSwitch.x).y;
                                                    break;
                                                } else {
                                                    discard;
                                                }
                                            }
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                mat2x4(mat4(7189.0332, -3177.9707, -3810.8718, -8.6, 781.469, -8921.1003, -41.28, -2.9, -455.767, -4.0, 994.430, 0.8, -716.108, -43.00, 21.89, 5442.7260));
                            default:
                                1;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (vec4(671.089, -897.174, 5.7, -180.744) - vec4(84.55, 923.165, -92.48, -36.04));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = smoothstep(-16.08, 5.4, vec4(91.96, -23.56, 41.15, 5.9));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead7l = _GLF_FUZZED(-66713);
                            for (int GLF_dead7j = donor_replacementGLF_dead7l; GLF_dead7j <= h - 1; GLF_dead7j++) {
                                if (GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7j, 10)] <= h) {
                                    h++;
                                    GLF_dead7swap(h, GLF_dead7j);
                                }
                            }
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(478.414, 5556.0961, -5.7, 8.6);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                break;
            case 17:
                if (_GLF_DEAD(false)) {
                    if (l < 1000) {
                        ;
                    } else {
                        ;
                    }
                }
                ;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(1.9, -43.89, 31.52, -32.56);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        vec3 donor_replacementGLF_dead9vecCoor = _GLF_FUZZED(vec3(-61.38, 3.3, 462.310));
                        {
                            GLF_live0coord = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[0]))));
                            GLF_live0coord[0] = dFdy(GLF_dead9gl_FragCoord.y);
                            break;
                        }
                    }
                    _GLF_color = vec4(-65.27, 8798.0205, -52.70, 5.6);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = roundEven(sqrt(vec4(-7.0, -6.8, -0.5, 9323.6931)));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead5c5 = _GLF_FUZZED(false);
                        vec3 donor_replacementGLF_dead5setting = _GLF_FUZZED(resolution.sts);
                        if (!donor_replacementGLF_dead5c5) {
                            ;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                l += 1;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec3 donor_replacementGLF_dead9vecCoor = _GLF_FUZZED(vec3(4.5, 6.3, 8.5));
                            {
                                if (int(GLF_dead9gl_FragCoord[1]) < 30) {
                                    GLF_live0coord = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[0]))));
                                    GLF_live0coord[0] = dFdy(GLF_dead9gl_FragCoord.y);
                                    break;
                                } else if (int(GLF_dead9gl_FragCoord[1]) < 60) {
                                    GLF_live0coord = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[1]))));
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = fwidth(vec4(8.0, -9.6, 75.71, 568.442));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    GLF_live0coord[1] *= atan(faceforward(GLF_dead9injectionSwitch, GLF_live0coord.xx, donor_replacementGLF_dead9vecCoor.yx).y);
                                    break;
                                } else if (int(GLF_dead9gl_FragCoord[1]) < 90) {
                                    GLF_live0coord = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[2]))));
                                    GLF_live0coord.x += atanh(GLF_live0coord.x) * cosh(GLF_dead9injectionSwitch.y) * smoothstep(GLF_live0coord, GLF_dead9injectionSwitch, GLF_dead9gl_FragCoord.yy).x;
                                    break;
                                } else {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = tan(vec4(96.69, -8583.8427, 6.1, -7.8));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (int(GLF_dead9gl_FragCoord[1]) < 120) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-79.48, 3735.7683, vec2(-7155.3961, -885.008));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        GLF_live0coord = fract(acosh(clamp(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[3])), 1.0, 1000.0)));
                                        GLF_live0coord.x += (isnan(GLF_dead9gl_FragCoord.x) ? log2(GLF_dead9gl_FragCoord.x) : log2(GLF_dead9gl_FragCoord.y));
                                        break;
                                    } else if (int(GLF_dead9gl_FragCoord[1]) < 150) {
                                        discard;
                                    } else if (int(GLF_dead9gl_FragCoord[1]) < 180) {
                                        GLF_live0coord = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[4]))));
                                        GLF_live0coord[1] += asinh(GLF_dead9gl_FragCoord.y * ldexp(GLF_live0coord.y, -l));
                                        break;
                                    } else if (int(GLF_dead9gl_FragCoord[1]) < 210) {
                                        GLF_live0coord = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[5]))));
                                        GLF_live0coord.y -= tanh(GLF_live0coord.x) / cosh(GLF_live0coord.y);
                                        break;
                                    } else if (int(GLF_dead9gl_FragCoord[1]) < 240) {
                                        GLF_live0coord = fract(asinh(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[6]))));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = (+vec4(-5666.1368, 9620.1010, 758.801, -5.7));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        GLF_live0coord.y -= isnan(float(l)) ? tanh(GLF_dead9gl_FragCoord.x) : atanh(GLF_dead9gl_FragCoord.y);
                                        break;
                                    } else if (int(GLF_dead9gl_FragCoord[1]) < 270) {
                                        GLF_live0coord = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[7]))));
                                        GLF_live0coord.y *= mix(normalize(donor_replacementGLF_dead9vecCoor), normalize(vec3(GLF_live0coord, degrees(GLF_live0coord.x))), GLF_dead9injectionSwitch.x).y;
                                        break;
                                    } else {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = reflect((vec4(368.866, 6.7, -0.5, -7.9) + vec4(3.6, 4.5, -950.892, -7.8)), vec4(-3.5, -828.846, 13.88, -5688.0677));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        discard;
                                    }
                                }
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            default:
                1;
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead7color = _GLF_FUZZED(min(vec3(43.71, 56.00, -2230.7593), vec3(6239.8691, 112.753, -9076.6183)));
                    do {
                        donor_replacementGLF_dead7color -= GLF_dead7palette(vec3(float(GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead7injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead7injectionSwitch.x, 0.6, float(GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead7injectionSwitch.x), 10)]) * 0.1));
                        GLF_live0looplimiter0++;
                    } while (GLF_live0looplimiter0 != GLF_dead7obj.numbers[2]);
                }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            vec2 donor_replacementGLF_dead11o = _GLF_FUZZED(injectionSwitch);
            {
                donor_replacementGLF_dead11o = donor_replacementGLF_dead11o + donor_replacementGLF_dead11o;
                l--;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(71.84, -9.3, -36.47, 385.408);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        while (h <= h && h <= h) {
            if (GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)] < GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)]) {
                GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(h++, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(h++, 10)];
            } else {
                GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(h++, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(h++, 10)];
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = faceforward((vec4(-8356.5336, -4957.5277, 21.37, -0.3) * (-7608.4699)), vec4(421.766, 8784.7998, 1929.0485, 6463.1091), cosh(vec4(-0.2, 5.1, 4074.9762, -934.321)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead9i = _GLF_FUZZED(bitfieldReverse((~h)));
        do {
            switch (donor_replacementGLF_dead9i) {
                case 0:
                    GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = 4;
                    break;
                case 1:
                    GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = 3;
                    break;
                case 2:
                    GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = 2;
                    break;
                case 3:
                    GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = 1;
                    break;
                case 4:
                    GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = 0;
                    break;
                case 5:
                    GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = -1;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = dFdyFine((19.05 / roundEven(vec4(-0.7, -6.6, 1414.2395, 9.0))));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    break;
                case 6:
                    GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = -2;
                    break;
                case 7:
                    GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = -3;
                    break;
                case 8:
                    GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = -4;
                    break;
                case 9:
                    GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = -5;
                    break;
            }
            donor_replacementGLF_dead9i++;
        } while (donor_replacementGLF_dead9i < 10);
    }
    int pivot = obj.numbers[h];
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(9407.9640, -5.8, 614.722, 7.9);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    int i = l - 1;
    for (int j = l; j <= h - 1; j++) {
        switch (_GLF_SWITCH(int(_GLF_ZERO(0.0, injectionSwitch.x)))) {
            case 96:
                discard;
            case 0:
            case 17:
            case 1:
            case 47:
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead5pos = _GLF_FUZZED((vec2(6.6, 323.786) + (-73.76)));
                    vec3 donor_replacementGLF_dead5setting = _GLF_FUZZED(min(vec3(-5469.1924, -9.7, 1547.9909), vec3(-4.4, 5039.8990, -2067.1081)));
                    {
                        ;
                    }
                }
                if (_GLF_IDENTITY(obj.numbers[j] <= pivot, !(_GLF_IDENTITY(!(obj.numbers[j] <= pivot), (!(obj.numbers[j] <= pivot)) && true)))) {
                    if (_GLF_DEAD(false)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(1728.4564, -94.95, 63.57, -5.3);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        float donor_replacementGLF_dead6grey = _GLF_FUZZED(faceforward(abs(5.8), 69.36, 356.721));
                        {
                            donor_replacementGLF_dead6grey = 0.5 + float(GLF_dead6data[8]) / 10.0;
                        }
                    }
                    i++;
                    swap(i, j);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(20.97, 892.098, 8576.1230, 1859.1724);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (0.0 > GLF_dead4resolution.y) {
                        i += 1;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = sign(vec4(-296.471, -171.103, -4815.5739, -246.542));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = fract(vec4(-8.3, -54.29, 8.4, 170.687));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                }
            case 75:
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    int donor_replacementGLF_dead9i = _GLF_FUZZED(bitfieldInsert(findMSB(15910u), GLF_dead6N, -67173, i));
                    {
                        int GLF_dead9from = donor_replacementGLF_dead9i;
                        int GLF_dead9mid = donor_replacementGLF_dead9i + pivot - 1;
                        int GLF_dead9to = min(donor_replacementGLF_dead9i + 2 * pivot - 1, j);
                        GLF_dead9merge(GLF_dead9from, GLF_dead9mid, GLF_dead9to);
                    }
                }
            case 70:
            case 52:
            case 78:
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = abs(vec4(6.7, -8.8, 1216.1093, -4.5));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            bool donor_replacementGLF_dead5c8 = _GLF_FUZZED((uvec4(143367u, 105662u, 147541u, 26727u) == (uvec4(10405u, 167535u, 133179u, 17851u) << 156725u)));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-91.46, -7.9, -54.40, -39.29);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            vec2 donor_replacementGLF_dead5pos = _GLF_FUZZED(GLF_live1injectionSwitch);
                            vec3 donor_replacementGLF_dead5setting = _GLF_FUZZED(asin(faceforward((mat4x3(8.0, -26.38, -834.327, -3.0, -0.4, 7.1, -3.4, -568.703, -926.506, 1.7, -18.66, 732.747) * _GLF_outVarBackup_GLF_color), vec3(-85.90, 1709.7542, -5452.2801), vec3(86.39, -7797.3750, 660.505))));
                            if (!donor_replacementGLF_dead5c8) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(26.47, 54.68, 14.70, -7.4);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                ;
                                if (_GLF_DEAD(false)) {
                                    {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-6.3, -79.33, -182.361, 51.95);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        donor_replacementGLF_dead5pos = fract(sin(donor_replacementGLF_dead5setting.yx - trunc(float(GLF_dead9data[1]))));
                                        donor_replacementGLF_dead5pos[1] *= atan(faceforward(GLF_dead9injectionSwitch, donor_replacementGLF_dead5pos.xx, donor_replacementGLF_dead5setting.yx).y);
                                        break;
                                    }
                                }
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    bool GLF_live1c1 = _GLF_FUZZED(((-2348.0637) <= vec4(-7.2, -530.382, 6.1, 440.398).r));
                    bool GLF_live1c2 = _GLF_FUZZED((mat3x2(66.10, -294.214, 7744.4952, 3.1, -15.63, 7.6) != mat3x2(-6.7, 2047.2136, -963.423, -787.582, -4335.0047, -4.1)));
                    if (_GLF_DEAD(false)) {
                        _GLF_struct_4 _GLF_struct_replacement_4 = _GLF_struct_4(mat2(1.0, 1.0, 1.0, 1.0), 1.0, _GLF_FUZZED(vec3(6.9, 37.00, -8.8)));
                        vec2 donor_replacementGLF_dead7grid = _GLF_FUZZED(abs(injectionSwitch));
                        {
                            int GLF_dead7count = int(GLF_dead7injectionSwitch.x);
                            do {
                                _GLF_struct_replacement_4.donor_replacementGLF_dead7color -= GLF_dead7palette(vec3(float(GLF_dead7obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead7injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead7injectionSwitch.x, float(GLF_dead7obj.numbers[2]) * 0.1, float(GLF_dead7obj.numbers[8]) * 0.1));
                                GLF_dead7count++;
                            } while (GLF_dead7count != GLF_dead7obj.numbers[1]);
                            donor_replacementGLF_dead7grid += vec2(GLF_dead7count + int(GLF_dead7injectionSwitch.y), GLF_dead7count + int(GLF_dead7injectionSwitch.x));
                        }
                    }
                    bool GLF_live1c3 = _GLF_FUZZED(_GLF_IDENTITY(false, (false) || false));
                    vec3 GLF_live1col = _GLF_FUZZED(vec3(vec2(1475.7949, 3.7), vec4(5.0, -48.86, 2678.9343, -2.9).a));
                    vec2 GLF_live1uv = _GLF_FUZZED((vec2(4178.2084, 9.4) - vec2(2334.9597, -142.329)));
                    if (!GLF_live1c1 && !GLF_live1c2 && GLF_live1c3) {
                        float GLF_live1stripe = GLF_live1compute_stripe(cos((GLF_live1uv.x + GLF_live1uv.y) * 20.0));
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_live1stripe = 0.5 + float(GLF_dead6data[3]) / 10.0;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (GLF_live1uv.x < 0.0) {
                                GLF_dead5h_r = 1.0 - GLF_dead5h_r;
                            }
                        }
                        GLF_live1col = mix(vec3(.7, sinh(GLF_live1uv.x), GLF_live1uv.x), vec3(.3, .5, GLF_live1uv.x), GLF_live1stripe);
                        GLF_live1_GLF_color = vec4(GLF_live1col, 1.0);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = sqrt(vec4(-982.875, -5.5, 2887.9677, 3.4));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    int GLF_dead7count = int(GLF_dead7injectionSwitch.x);
                                    do {
                                        GLF_live1col -= GLF_dead7palette(vec3(float(GLF_dead7obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead7injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead7injectionSwitch.x, float(GLF_dead7obj.numbers[2]) * 0.1, float(GLF_dead7obj.numbers[8]) * 0.1));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = ((mat2x3(-4.2, 2.5, -34.49, -15.98, -7.1, -1.2), min(vec4(822.798, 15.18, -75.17, -493.924), vec4(8.5, -9.5, 2.5, 5842.7921))) + vec4(-0.5, 345.932, 3.3, -2.1));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        GLF_dead7count++;
                                    } while (GLF_dead7count != GLF_dead7obj.numbers[1]);
                                    GLF_live1uv += vec2(GLF_dead7count + int(GLF_dead7injectionSwitch.y), GLF_dead7count + int(GLF_dead7injectionSwitch.x));
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                return 1;
                                if (_GLF_DEAD(false)) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(6.8, -8460.6005, -64.84, 8530.2582);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    {
                                        GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(h++, 10)] = GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h++, 10)];
                                    }
                                }
                            }
                            float donor_replacementGLF_dead4c_im = _GLF_FUZZED(GLF_live1stripe);
                            do {
                                if (GLF_live1stripe * GLF_live1stripe + GLF_live1stripe * GLF_live1stripe > 4.0) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(vec2(5636.4573, -20.28), -7613.0365, 4.3);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            GLF_dead5h_r = -GLF_dead5h_r;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-80.70, vec2(495.719, -314.225), -835.687);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                    break;
                                }
                                _GLF_struct_5 _GLF_struct_replacement_5 = _GLF_struct_5(1u, mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), GLF_live1stripe * GLF_live1stripe - GLF_live1stripe * GLF_live1stripe + GLF_live1stripe, mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                                GLF_live1stripe = 2.0 * GLF_live1stripe * GLF_live1stripe + donor_replacementGLF_dead4c_im;
                                GLF_live1stripe = _GLF_struct_replacement_5.GLF_dead4x_new;
                                if (_GLF_DEAD(false)) {
                                    do {
                                        if (int(GLF_dead9gl_FragCoord[1]) < 30) {
                                            GLF_live1uv = fract(sin(GLF_live1col.yx - trunc(float(GLF_dead9data[0]))));
                                            GLF_live1uv[0] = dFdy(GLF_dead9gl_FragCoord.y);
                                            break;
                                        } else if (int(GLF_dead9gl_FragCoord[1]) < 60) {
                                            GLF_live1uv = fract(sin(GLF_live1col.yx - trunc(float(GLF_dead9data[1]))));
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = ldexp(vec4(-7743.2830, 967.448, -69.96, -10.97), ivec4(-62764, 20358, -2136, -34151));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            GLF_live1uv[1] *= atan(faceforward(GLF_dead9injectionSwitch, GLF_live1uv.xx, GLF_live1col.yx).y);
                                            break;
                                        } else if (int(GLF_dead9gl_FragCoord[1]) < 90) {
                                            GLF_live1uv = fract(sin(GLF_live1col.yx - trunc(float(GLF_dead9data[2]))));
                                            GLF_live1uv.x += atanh(GLF_live1uv.x) * cosh(GLF_dead9injectionSwitch.y) * smoothstep(GLF_live1uv, GLF_dead9injectionSwitch, GLF_dead9gl_FragCoord.yy).x;
                                            break;
                                        } else if (int(GLF_dead9gl_FragCoord[1]) < 120) {
                                            GLF_live1uv = fract(acosh(clamp(GLF_live1col.yx - trunc(float(GLF_dead9data[3])), 1.0, 1000.0)));
                                            GLF_live1uv.x += (isnan(GLF_dead9gl_FragCoord.x) ? log2(GLF_dead9gl_FragCoord.x) : log2(GLF_dead9gl_FragCoord.y));
                                            break;
                                        } else if (int(GLF_dead9gl_FragCoord[1]) < 150) {
                                            discard;
                                        } else if (int(GLF_dead9gl_FragCoord[1]) < 180) {
                                            GLF_live1uv = fract(sin(GLF_live1col.yx - trunc(float(GLF_dead9data[4]))));
                                            GLF_live1uv[1] += asinh(GLF_dead9gl_FragCoord.y * ldexp(GLF_live1uv.y, -j));
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(61.61, 7.2, -7.8, 8970.1585);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            break;
                                        } else if (int(GLF_dead9gl_FragCoord[1]) < 210) {
                                            GLF_live1uv = fract(sin(GLF_live1col.yx - trunc(float(GLF_dead9data[5]))));
                                            GLF_live1uv.y -= tanh(GLF_live1uv.x) / cosh(GLF_live1uv.y);
                                            break;
                                        } else if (int(GLF_dead9gl_FragCoord[1]) < 240) {
                                            GLF_live1uv = fract(asinh(GLF_live1col.yx - trunc(float(GLF_dead9data[6]))));
                                            GLF_live1uv.y -= isnan(float(j)) ? tanh(GLF_dead9gl_FragCoord.x) : atanh(GLF_dead9gl_FragCoord.y);
                                            break;
                                        } else if (int(GLF_dead9gl_FragCoord[1]) < 270) {
                                            GLF_live1uv = fract(sin(GLF_live1col.yx - trunc(float(GLF_dead9data[7]))));
                                            GLF_live1uv.y *= mix(normalize(GLF_live1col), normalize(vec3(GLF_live1uv, degrees(GLF_live1uv.x))), GLF_dead9injectionSwitch.x).y;
                                            break;
                                        } else {
                                            discard;
                                        }
                                    } while (0 == int(GLF_dead9injectionSwitch.x));
                                }
                                l++;
                                l++;
                            } while (l < bitfieldInsert(j + (257.0 > GLF_dead4resolution.y ? 1 : 0), 0, 0, 0));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = normalize(uintBitsToFloat(uvec4(122848u, 88229u, 38889u, 106772u)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        ;
                    }
                }
                break;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = abs(vec4(701.943, -224.110, 25.35, -1.9));
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = degrees(vec4(-5069.3329, -2.1, -1.8, 0.8));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-6822.6130, -52.02, 1.6, -2301.8275);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead8v = _GLF_FUZZED(injectionSwitch);
                        if (length(donor_replacementGLF_dead8v) < 0.001) {
                            ;
                        }
                    }
                    float donor_replacementGLF_dead6grey = _GLF_FUZZED(1.8);
                    {
                        if (int(GLF_dead6gl_FragCoord[1]) < 150) {
                            discard;
                        } else {
                            if (int(GLF_dead6gl_FragCoord[1]) < 180) {
                                donor_replacementGLF_dead6grey = 0.5 + float(GLF_dead6data[5]) / 10.0;
                            } else {
                                if (int(GLF_dead6gl_FragCoord[1]) < 210) {
                                    donor_replacementGLF_dead6grey = 0.5 + float(GLF_dead6data[6]) / 10.0;
                                } else {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-57.48, 1020.0076, 28.83, 8.6);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (int(GLF_dead6gl_FragCoord[1]) < 240) {
                                        donor_replacementGLF_dead6grey = 0.5 + float(GLF_dead6data[7]) / 10.0;
                                    } else {
                                        if (int(GLF_dead6gl_FragCoord[1]) < 270) {
                                            donor_replacementGLF_dead6grey = 0.5 + float(GLF_dead6data[8]) / 10.0;
                                            if (_GLF_DEAD(false)) {
                                                vec2 donor_replacementGLF_dead9color = _GLF_FUZZED((mat3x2(940.683, -4180.0895, 496.069, 0.0, -0.9, 1.2) * vec3(-9.9, 3.7, 2854.8182)));
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(6.5, -1.8, -83.58, 2272.6780);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                int donor_replacementGLF_dead9i = _GLF_FUZZED(h);
                                                vec3 donor_replacementGLF_dead9vecCoor = _GLF_FUZZED(intBitsToFloat(findMSB(ivec3(87475, 87010, 52440))));
                                                if (int(GLF_dead9gl_FragCoord[1]) < 90) {
                                                    donor_replacementGLF_dead9color = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[2]))));
                                                    donor_replacementGLF_dead9color.x += atanh(donor_replacementGLF_dead9color.x) * cosh(GLF_dead9injectionSwitch.y) * smoothstep(donor_replacementGLF_dead9color, GLF_dead9injectionSwitch, GLF_dead9gl_FragCoord.yy).x;
                                                    break;
                                                } else if (int(GLF_dead9gl_FragCoord[1]) < 120) {
                                                    donor_replacementGLF_dead9color = fract(acosh(clamp(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[3])), 1.0, 1000.0)));
                                                    donor_replacementGLF_dead9color.x += (isnan(GLF_dead9gl_FragCoord.x) ? log2(GLF_dead9gl_FragCoord.x) : log2(GLF_dead9gl_FragCoord.y));
                                                    break;
                                                } else if (int(GLF_dead9gl_FragCoord[1]) < 150) {
                                                    discard;
                                                } else if (int(GLF_dead9gl_FragCoord[1]) < 180) {
                                                    donor_replacementGLF_dead9color = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[4]))));
                                                    donor_replacementGLF_dead9color[1] += asinh(GLF_dead9gl_FragCoord.y * ldexp(donor_replacementGLF_dead9color.y, -donor_replacementGLF_dead9i));
                                                    break;
                                                } else if (int(GLF_dead9gl_FragCoord[1]) < 210) {
                                                    donor_replacementGLF_dead9color = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[5]))));
                                                    donor_replacementGLF_dead9color.y -= tanh(donor_replacementGLF_dead9color.x) / cosh(donor_replacementGLF_dead9color.y);
                                                    break;
                                                } else if (int(GLF_dead9gl_FragCoord[1]) < 240) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = cos(vec4(-473.495, -2.6, -6679.2059, -6.0));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    donor_replacementGLF_dead9color = fract(asinh(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[6]))));
                                                    donor_replacementGLF_dead9color.y -= isnan(float(donor_replacementGLF_dead9i)) ? tanh(GLF_dead9gl_FragCoord.x) : atanh(GLF_dead9gl_FragCoord.y);
                                                    break;
                                                } else if (int(GLF_dead9gl_FragCoord[1]) < 270) {
                                                    donor_replacementGLF_dead9color = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[7]))));
                                                    donor_replacementGLF_dead9color.y *= mix(normalize(donor_replacementGLF_dead9vecCoor), normalize(vec3(donor_replacementGLF_dead9color, degrees(donor_replacementGLF_dead9color.x))), GLF_dead9injectionSwitch.x).y;
                                                    break;
                                                } else {
                                                    discard;
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-435.767, 6498.7643, -8.5, 4848.8879);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        } else {
                                            discard;
                                        }
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(75.78, -8.9, -8.3, 8864.5593);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = clamp(vec4(-784.024, -4764.6378, -3.1, 9.5), mat3x4(6657.8305, -328.363, -7956.9864, -8480.8540, 8.4, 3.8, 2.7, -1.0, 901.276, 7.0, 6.0, -8.8)[2], reflect(vec4(-39.88, -1.1, 4.5, 1.0), exp(vec4(2.0, 3.1, 5.7, -14.14))));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            case 65:
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = dFdy(vec4(28.50, 215.677, -8.9, 2103.5939));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                discard;
            case 18:
                ;
                if (_GLF_DEAD(false)) {
                    {
                        break;
                    }
                }
            default:
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec2(12.18, 6732.4928) * mat4x2(-0.8, 24.83, 9.8, 7.5, -4.6, -7.4, -5.9, 3430.4673));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                1;
        }
    }
    i++;
    swap(i, h);
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead5center = _GLF_FUZZED(injectionSwitch);
        if (_GLF_DEAD(false)) {
            vec3 donor_replacementGLF_dead9vecCoor = _GLF_FUZZED((mat4x3(-9.6, -65.28, -0.1, -2.2, 5584.7811, 94.24, 3.3, 1313.8149, 17.60, 6522.5755, -83.97, -0.4) * GLF_dead6gl_FragCoord));
            {
                donor_replacementGLF_dead5center = fract(acosh(clamp(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[3])), 1.0, 1000.0)));
                donor_replacementGLF_dead5center.x += (isnan(GLF_dead9gl_FragCoord.x) ? log2(GLF_dead9gl_FragCoord.x) : log2(GLF_dead9gl_FragCoord.y));
                ;
            }
        }
        vec2 donor_replacementGLF_dead5position = _GLF_FUZZED(fma(vec2(-864.439, 4.1), resolution, vec2(0.1, 5131.5395)));
        vec3 donor_replacementGLF_dead5result = _GLF_FUZZED(vec3(-965.914, -330.768, 9.6));
        {
            vec3 GLF_dead5d = _GLF_FUZZED(atan(vec3(-9625.1582, -118.574, 7306.1303), vec3(-23.57, 6.6, 4.2)));
            GLF_dead5d = GLF_dead5drawShape(donor_replacementGLF_dead5position, donor_replacementGLF_dead5center + vec2(sin(float(i) / (float(bitCount(h)) * 10.0) + GLF_dead5time) / 4.0 * float(bitCount(h)), float(bitfieldExtract(int(GLF_dead5resolution.x), 0, 0))), vec3(0.01 + sin(float(i) / 100.0 * float(bitCount(h))), 0.01, float(i)));
            if (_GLF_DEAD(false)) {
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-838.871, 7215.4661, -6.0, -2202.7784);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_dead5h_r = -GLF_dead5h_r;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-5320.4306, -207.446, -9.4, -68.96);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            if (length(GLF_dead5d) <= float(bitfieldExtract(int(GLF_dead5resolution.x), 0, 0))) {
                ;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-5.1, -343.169, 304.066, -1.7);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = cos(vec4(6.1, 2174.5141, -859.287, -208.199));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(0.0))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        ;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return 1;
            }
            donor_replacementGLF_dead5result = vec3(GLF_dead5d);
        }
    }
    return i;
}

void quicksort() {
    int l = 0, h = 9;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(0.9, 8.2, 597.338, -3.4);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    int stack[10];
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(90.82, -9864.3989, -5.5, -147.991);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = mix(vec4(-8.9, 6.6, -3447.7938, 74.84), vec4(-326.027, -9425.6792, 31.76, 4038.9183), vec4(55.77, 639.069, -5.3, 47.80));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    int top = -1;
    stack[++top] = l;
    {
        int GLF_live2looplimiter0 = 0;
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead8a = _GLF_FUZZED(fwidth(dFdxFine(GLF_dead7injectionSwitch)));
            {
                GLF_dead5h_r = donor_replacementGLF_dead8a.y / donor_replacementGLF_dead8a.x;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4((1.8 * (-1.1)), faceforward(-2.7, 6903.0099, 889.496), -966.185, mod(-658.355, -7517.6996));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0))))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        ivec2 GLF_live2pos = _GLF_FUZZED((-ivec2(24335, -92777)));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-391.794, vec3(vec2(-15.88, 8.0), 7.5));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            if (_GLF_IDENTITY(GLF_live2looplimiter0 >= 3, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) && (GLF_live2looplimiter0 >= 3))) {
                if (_GLF_DEAD(false)) {
                    while (GLF_live2looplimiter0 < GLF_dead9N && GLF_live2looplimiter0 <= l) {
                        GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(l++, 10)] = GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2looplimiter0++, 10)];
                    }
                }
                ;
            }
            GLF_live2looplimiter0++;
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead8a = _GLF_FUZZED(GLF_live1injectionSwitch);
                float donor_replacementGLF_dead8z = _GLF_FUZZED(GLF_dead5b_b);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = degrees(vec4(5.3, -504.031, -908.653, -33.33));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (donor_replacementGLF_dead8a.y > donor_replacementGLF_dead8a.x) {
                    donor_replacementGLF_dead8z = donor_replacementGLF_dead8a.x / donor_replacementGLF_dead8a.y;
                } else {
                    donor_replacementGLF_dead8z = donor_replacementGLF_dead8a.y / donor_replacementGLF_dead8a.x;
                }
            }
            {
                if (GLF_live2pos.x < GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15 && GLF_live2pos.x > GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] - 15) {
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead8a = _GLF_FUZZED(GLF_dead5resolution);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = ((-5068.5006) * vec4(5.9, -7.9, -373.949, -3.0));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            GLF_dead5b_b = donor_replacementGLF_dead8a.y / donor_replacementGLF_dead8a.x;
                        }
                    }
                    float GLF_live2p = (15.0 - abs(float(GLF_live2pos.x - GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)]))) / 15.0;
                    ;
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead9low = _GLF_FUZZED(l);
                    int donor_replacementGLF_dead9m = _GLF_FUZZED(l);
                    for (int GLF_dead9i = donor_replacementGLF_dead9low; GLF_dead9i < h; GLF_dead9i += 2 * donor_replacementGLF_dead9m) {
                        int GLF_dead9from = GLF_dead9i;
                        int GLF_dead9mid = GLF_dead9i + donor_replacementGLF_dead9m - 1;
                        int GLF_dead9to = min(GLF_dead9i + 2 * donor_replacementGLF_dead9m - 1, h);
                        GLF_dead9merge(GLF_dead9from, GLF_dead9mid, GLF_dead9to);
                    }
                }
                GLF_live2pos.y++;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    stack[++top] = h;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        {
            GLF_dead5h_r = -GLF_dead5h_r;
        }
    }
    while (top >= 0) {
        {
            _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_1(vec2(1.0, 1.0), 1.0, _GLF_struct_2(mat2(1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), ivec2(1, 1), true, uvec2(1u, 1u), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), true, ivec3(1, 1, 1), _GLF_FUZZED(vec3(-7981.0246, 7993.2178, -2.8).s));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec4(-0.8, -4.6, 2.3, 21.59) / vec4(16.08, 7570.2285, 4.0, 64.15));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    ;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead7color = _GLF_FUZZED(asin(vec3(-7893.5890, 4.9, 3.8)));
                    vec2 donor_replacementGLF_dead7grid = _GLF_FUZZED(injectionSwitch);
                    {
                        int GLF_dead7count = int(GLF_dead7injectionSwitch.x);
                        do {
                            donor_replacementGLF_dead7color -= GLF_dead7palette(vec3(float(GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead7injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead7injectionSwitch.x, 0.6, float(GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead7injectionSwitch.x), 10)]) * 0.1));
                            GLF_dead7count++;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = clamp(vec4(957.383, 4.9, -753.988, 61.07), 3.7, sinh(796.606));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                do {
                                    switch (h) {
                                        case 0:
                                            GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)] = 4;
                                            break;
                                        case 1:
                                            GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)] = 3;
                                            break;
                                        case 2:
                                            GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)] = 2;
                                            break;
                                        case 3:
                                            GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)] = 1;
                                            break;
                                        case 4:
                                            GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)] = 0;
                                            break;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = (mat4(-36.66, -77.56, 139.379, 410.016, -92.94, 56.40, -0.3, 4.7, 0.9, 176.670, 5.6, -99.52, -8.9, -8835.8093, -24.75, 52.56) * vec4(-5.9, -5.1, -55.48, 2.5));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        case 5:
                                            GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)] = -1;
                                            break;
                                        case 6:
                                            GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)] = -2;
                                            break;
                                        case 7:
                                            GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)] = -3;
                                            break;
                                        case 8:
                                            GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)] = -4;
                                            break;
                                        case 9:
                                            GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)] = -5;
                                            break;
                                    }
                                    h++;
                                } while (h < 10);
                            }
                        } while (GLF_dead7count != GLF_dead7obj.numbers[2]);
                        donor_replacementGLF_dead7grid += vec2(GLF_dead7count + GLF_dead7obj.numbers[3], GLF_dead7count + GLF_dead7obj.numbers[3]);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = ceil(vec4(1859.4285, 3665.8057, 32.69, 25.07));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int donor_replacementGLF_dead10c_re = _GLF_FUZZED((findLSB(GLF_dead6N) >> GLF_dead6N));
                        for (int GLF_dead10k = 0; GLF_dead10k < 1000; GLF_dead10k++) {
                            if (top * top + h * h > 262144) {
                                break;
                            }
                            int GLF_dead10x_new = ((top * top - h * h) / 256 + donor_replacementGLF_dead10c_re);
                            h = (2 * top * h / 256 + top);
                            top = GLF_dead10x_new;
                            h++;
                        }
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-7.0, -512.599, -3.8, -205.861);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                }
            }
            {
                _GLF_struct_replacement_0.GLF_live3th = 1.0 - _GLF_struct_replacement_0.GLF_live3th;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            float donor_replacementGLF_dead4x = _GLF_FUZZED(-6413.1178);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                vec2 donor_replacementGLF_dead8a = _GLF_FUZZED(trunc(GLF_dead7injectionSwitch));
                if (donor_replacementGLF_dead8a.y > donor_replacementGLF_dead8a.x) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = asin(fwidthCoarse((vec4(-794.954, -4.3, -4931.6460, -2153.4437) * vec4(-8.3, 4346.1653, 9.8, -6124.6713))));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_dead5s_g = donor_replacementGLF_dead8a.x / donor_replacementGLF_dead8a.y;
                } else {
                    GLF_dead5s_g = donor_replacementGLF_dead8a.y / donor_replacementGLF_dead8a.x;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(6.2, vec3(faceforward(vec4(328.249, -0.3, 639.082, 1962.9868), vec4(-3.4, 8.1, -46.38, 7.2), vec4(-0.5, -2.8, 76.98, 5.8))));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            float donor_replacementGLF_dead4y = _GLF_FUZZED(-5.0);
            if (donor_replacementGLF_dead4x * donor_replacementGLF_dead4x + donor_replacementGLF_dead4y * donor_replacementGLF_dead4y > 4.0) {
                break;
            }
        }
        h = stack[top--];
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec3(-3.7, 1.9, 2.7) * mat4x3(-8.7, 6.8, -48.81, 622.830, 14.76, 6399.6438, -171.176, -1.8, -3.3, -4.1, 7101.6449, -604.397));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(top++, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(l++, 10)];
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-56.71, -44.01, 634.555, 1.2);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                bool donor_replacementGLF_dead5c7 = _GLF_FUZZED(false);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (top < 1000) {
                        ;
                    } else {
                        ;
                    }
                }
                vec2 donor_replacementGLF_dead5pos = _GLF_FUZZED(GLF_live1injectionSwitch);
                vec3 donor_replacementGLF_dead5setting = _GLF_FUZZED(cos(vec3(-61.37, 6.5, 2.7)));
                if (!donor_replacementGLF_dead5c7) {
                    ;
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead10x = _GLF_FUZZED(h);
                        if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + top * top > 262144) {
                            break;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = ldexp(vec4(2.6, -10.87, 7.3, -9256.4251), (-ivec4(-27298, -48250, -33764, 78195)));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
        }
        l = stack[top--];
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
            float donor_replacementGLF_dead4c_im = _GLF_FUZZED(-7.7);
            float donor_replacementGLF_dead4c_re = _GLF_FUZZED(dot(vec2(331.299, -661.371), vec2(-6.7, -0.2)));
            float donor_replacementGLF_dead4x = _GLF_FUZZED((730.452 + 75.39));
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead9color = _GLF_FUZZED(vec3(-8795.4336, 21.81, 891.500).yz);
                int donor_replacementGLF_dead9i = _GLF_FUZZED(bitCount(98521u));
                vec3 donor_replacementGLF_dead9vecCoor = _GLF_FUZZED(vec3(-79.76, -699.630, -232.224));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(2.8, -867.785, -0.0, -6110.5381);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (int(GLF_dead9gl_FragCoord[1]) < 60) {
                    donor_replacementGLF_dead9color = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[1]))));
                    donor_replacementGLF_dead9color[1] *= atan(faceforward(GLF_dead9injectionSwitch, donor_replacementGLF_dead9color.xx, donor_replacementGLF_dead9vecCoor.yx).y);
                    break;
                } else if (int(GLF_dead9gl_FragCoord[1]) < 90) {
                    donor_replacementGLF_dead9color = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[2]))));
                    donor_replacementGLF_dead9color.x += atanh(donor_replacementGLF_dead9color.x) * cosh(GLF_dead9injectionSwitch.y) * smoothstep(donor_replacementGLF_dead9color, GLF_dead9injectionSwitch, GLF_dead9gl_FragCoord.yy).x;
                    break;
                } else if (int(GLF_dead9gl_FragCoord[1]) < 120) {
                    donor_replacementGLF_dead9color = fract(acosh(clamp(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[3])), 1.0, 1000.0)));
                    donor_replacementGLF_dead9color.x += (isnan(GLF_dead9gl_FragCoord.x) ? log2(GLF_dead9gl_FragCoord.x) : log2(GLF_dead9gl_FragCoord.y));
                    break;
                } else if (int(GLF_dead9gl_FragCoord[1]) < 150) {
                    discard;
                } else if (int(GLF_dead9gl_FragCoord[1]) < 180) {
                    donor_replacementGLF_dead9color = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[4]))));
                    donor_replacementGLF_dead9color[1] += asinh(GLF_dead9gl_FragCoord.y * ldexp(donor_replacementGLF_dead9color.y, -donor_replacementGLF_dead9i));
                    break;
                } else if (int(GLF_dead9gl_FragCoord[1]) < 210) {
                    donor_replacementGLF_dead9color = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[5]))));
                    donor_replacementGLF_dead9color.y -= tanh(donor_replacementGLF_dead9color.x) / cosh(donor_replacementGLF_dead9color.y);
                    break;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-56.14, 67.14, 39.31, 87.31);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                } else if (int(GLF_dead9gl_FragCoord[1]) < 240) {
                    donor_replacementGLF_dead9color = fract(asinh(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[6]))));
                    donor_replacementGLF_dead9color.y -= isnan(float(donor_replacementGLF_dead9i)) ? tanh(GLF_dead9gl_FragCoord.x) : atanh(GLF_dead9gl_FragCoord.y);
                    break;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-2.1, 67.11, 6.8, 1.7);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                } else if (int(GLF_dead9gl_FragCoord[1]) < 270) {
                    donor_replacementGLF_dead9color = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[7]))));
                    donor_replacementGLF_dead9color.y *= mix(normalize(donor_replacementGLF_dead9vecCoor), normalize(vec3(donor_replacementGLF_dead9color, degrees(donor_replacementGLF_dead9color.x))), GLF_dead9injectionSwitch.x).y;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(1019.1343, 5.2, -4.8, 61.61);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    break;
                } else {
                    discard;
                }
            }
            float donor_replacementGLF_dead4y = _GLF_FUZZED(-9.7);
            if (_GLF_DEAD(false)) {
                {
                    ;
                }
            }
            do {
                if (donor_replacementGLF_dead4x * donor_replacementGLF_dead4x + donor_replacementGLF_dead4y * donor_replacementGLF_dead4y > 4.0) {
                    break;
                }
                float GLF_dead4x_new = donor_replacementGLF_dead4x * donor_replacementGLF_dead4x - donor_replacementGLF_dead4y * donor_replacementGLF_dead4y + donor_replacementGLF_dead4c_re;
                donor_replacementGLF_dead4y = 2.0 * donor_replacementGLF_dead4x * donor_replacementGLF_dead4y + donor_replacementGLF_dead4c_im;
                donor_replacementGLF_dead4x = GLF_dead4x_new;
                l++;
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                }
                h++;
            } while (h < bitfieldInsert(h + (257.0 > GLF_dead4resolution.y ? 1 : 0), 0, 0, 0));
        }
        int p = performPartition(l, h);
        {
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead7color = _GLF_FUZZED(roundEven(vec3(4.0, 7.6, 323.900)));
                vec2 donor_replacementGLF_dead7grid = _GLF_FUZZED(vec2(-3.6, 8.1));
                vec2 donor_replacementGLF_dead7uv = _GLF_FUZZED(GLF_live1injectionSwitch);
                if (donor_replacementGLF_dead7uv.x > (1.0 / 4.0)) {
                    int GLF_dead7count = int(GLF_dead7injectionSwitch.x);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec2 donor_replacementGLF_dead8v = _GLF_FUZZED(injectionSwitch);
                        if (donor_replacementGLF_dead8v.y < 0.0) {
                            GLF_dead5b_b = -GLF_dead5b_b;
                        }
                    }
                    do {
                        donor_replacementGLF_dead7color += GLF_dead7palette(vec3(0.5, float(GLF_dead7obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead7injectionSwitch.y)), vec3(float(GLF_dead7obj.numbers[4]) * 0.1, GLF_dead7injectionSwitch.x, 0.6));
                        GLF_dead7count++;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(_GLF_ZERO(0.0, injectionSwitch.x)))))) {
                            {
                                GLF_dead5s_g = -GLF_dead5s_g;
                            }
                        }
                    } while (GLF_dead7count != GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead7injectionSwitch.x), 10)]);
                    donor_replacementGLF_dead7grid = vec2(GLF_dead7count + GLF_dead7obj.numbers[8], GLF_dead7count + GLF_dead7obj.numbers[6]);
                }
            }
            int GLF_live2looplimiter0 = 0;
            _GLF_struct_3 _GLF_struct_replacement_3 = _GLF_struct_3(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED((ivec2(-6770, 13979) & ivec2(14971, 8770))));
            while (_GLF_struct_replacement_3.GLF_live2pos.y != 256) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec2 donor_replacementGLF_dead9color = _GLF_FUZZED(faceforward(GLF_dead7injectionSwitch, GLF_dead5resolution, GLF_dead7injectionSwitch));
                    vec3 donor_replacementGLF_dead9vecCoor = _GLF_FUZZED(vec3(-7816.2408, 2532.5035, 1237.1224));
                    {
                        donor_replacementGLF_dead9color = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[0]))));
                        donor_replacementGLF_dead9color[0] = dFdy(GLF_dead9gl_FragCoord.y);
                        break;
                    }
                }
                if (GLF_live2looplimiter0 >= 3) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = degrees(vec4(-827.841, -1.9, 6.9, -42.02));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    break;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = asinh(vec4(vec3(-5772.2352, -6472.2343, -0.9), length(vec3(-4.3, -7.2, 8880.9365))));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec3 donor_replacementGLF_dead11m = _GLF_FUZZED(fract(injectionSwitch.tss));
                        vec2 donor_replacementGLF_dead11o = _GLF_FUZZED(GLF_live1injectionSwitch);
                        if (GLF_dead11injectionSwitch.x < (donor_replacementGLF_dead11m.x)) {
                            int GLF_dead11k = 1;
                            while (GLF_dead11k >= 0) {
                                donor_replacementGLF_dead11o = donor_replacementGLF_dead11o + donor_replacementGLF_dead11o;
                                GLF_dead11k--;
                            }
                            donor_replacementGLF_dead11m = vec3(GLF_dead11injectionSwitch.x, cos(donor_replacementGLF_dead11o));
                        }
                    }
                }
                GLF_live2looplimiter0++;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                    _GLF_color = vec4(-4803.1116, -9329.5068, 4263.2416, 19.30);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        break;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(3.1, 0.7, -71.24, 69.71);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                {
                    if (_GLF_struct_replacement_3.GLF_live2pos.x < GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_3.GLF_live2pos.y, 256)] + 15 && _GLF_struct_replacement_3.GLF_live2pos.x > GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(_GLF_struct_replacement_3.GLF_live2pos, ~(~(_GLF_struct_replacement_3.GLF_live2pos))).y, 256)] - 15) {
                        float GLF_live2p = (15.0 - abs(float(_GLF_struct_replacement_3.GLF_live2pos.x - GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_3.GLF_live2pos.y, 256)]))) / 15.0;
                        ;
                    }
                    _GLF_struct_replacement_3.GLF_live2pos.y++;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = intBitsToFloat(ivec4(ivec2(16064, -41140), -44223, -6847));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        for (int GLF_dead6m = 1; GLF_dead6m <= l; GLF_dead6m = 2 * GLF_dead6m) {
                            for (int GLF_dead6i = l; GLF_dead6i < l; GLF_dead6i += 2 * GLF_dead6m) {
                                if (_GLF_DEAD(false)) {
                                    if (GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)] < GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h, 10)]) {
                                        GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(top++, 10)] = GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h++, 10)];
                                    } else {
                                        GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(top++, 10)] = GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(h++, 10)];
                                    }
                                }
                                int GLF_dead6from = GLF_dead6i;
                                int GLF_dead6mid = GLF_dead6i + GLF_dead6m - 1;
                                int GLF_dead6to = min(GLF_dead6i + 2 * GLF_dead6m - 1, l);
                                GLF_dead6merge(GLF_dead6from, GLF_dead6mid, GLF_dead6to);
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead6grey = _GLF_FUZZED(log(1331.0627));
                {
                    donor_replacementGLF_dead6grey = 0.5 + float(GLF_dead6data[1]) / 10.0;
                }
            }
        }
        if (p - 1 > l) {
            stack[++top] = l;
            stack[++top] = p - 1;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(2039.8532, 51.26, 601.298, -60.94);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    discard;
                }
            }
        }
        if (p + 1 < h) {
            switch (_GLF_SWITCH(int(_GLF_ZERO(0.0, injectionSwitch.x)))) {
                case 89:
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-4274.2982, 8730.7225, -3.7, -97.96);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    mat3x2 _GLF_SWITCH_3_0v, _GLF_SWITCH_3_1v;
                case 37:
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec4(177.988, -403.934, 8.5, -8.0) - ((-22.26) * sqrt(vec4(-782.717, 218.654, 4718.0473, -9.4))));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead4x = _GLF_FUZZED(-7.1);
                        float donor_replacementGLF_dead4y = _GLF_FUZZED(0.8);
                        {
                            donor_replacementGLF_dead4x = 1.0;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = smoothstep((5.7 / 4926.4323), -49.51, vec4(54.45, -5.0, 6085.5218, 5.3));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                vec2 donor_replacementGLF_dead8a = _GLF_FUZZED(unpackHalf2x16(119578u));
                                if (donor_replacementGLF_dead8a.y < donor_replacementGLF_dead8a.x) {
                                    donor_replacementGLF_dead4y = 0.5 - donor_replacementGLF_dead4y;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-55.85, -4.3, 5.1, -2648.2668);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            donor_replacementGLF_dead4y = 1.0;
                        }
                    }
                    discard;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(88.63, 546.365, 493.498, -7.3);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        {
                            ;
                        }
                    }
                case 0:
                case 21:
                    stack[++top] = p + 1;
                case 69:
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_struct_6 _GLF_struct_replacement_6 = _GLF_struct_6(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true), bvec2(true, true), 1.0, _GLF_struct_7(uvec3(1u, 1u, 1u), _GLF_FUZZED(62.36), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-2.3, 418.128, -88.20, -67.74);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                if (h < 1000) {
                                    ;
                                } else {
                                    ;
                                }
                            }
                            _GLF_struct_replacement_6._f4.donor_replacementGLF_dead6grey = 0.5 + float(GLF_dead6data[8]) / 10.0;
                        }
                    }
                    stack[++top] = h;
                    break;
                default:
                    1;
            }
        }
    }
}

void main() {
    {
        for (int _GLF_SPLIT_LOOP_COUNTERi = 0; _GLF_SPLIT_LOOP_COUNTERi < 9; _GLF_SPLIT_LOOP_COUNTERi++) {
            if (_GLF_DEAD(false)) {
                while (_GLF_SPLIT_LOOP_COUNTERi <= _GLF_SPLIT_LOOP_COUNTERi && _GLF_SPLIT_LOOP_COUNTERi <= _GLF_SPLIT_LOOP_COUNTERi) {
                    if (GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(_GLF_SPLIT_LOOP_COUNTERi, 10)] < GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(_GLF_SPLIT_LOOP_COUNTERi, 10)]) {
                        GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_SPLIT_LOOP_COUNTERi++, 10)] = GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(_GLF_SPLIT_LOOP_COUNTERi++, 10)];
                    } else {
                        GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_SPLIT_LOOP_COUNTERi++, 10)] = GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(_GLF_SPLIT_LOOP_COUNTERi++, 10)];
                    }
                }
            }
            obj.numbers[_GLF_SPLIT_LOOP_COUNTERi] = (10 - _GLF_SPLIT_LOOP_COUNTERi);
            obj.numbers[_GLF_SPLIT_LOOP_COUNTERi] = obj.numbers[_GLF_SPLIT_LOOP_COUNTERi] * obj.numbers[_GLF_SPLIT_LOOP_COUNTERi];
        }
        for (int _GLF_SPLIT_LOOP_COUNTERi = 9; _GLF_SPLIT_LOOP_COUNTERi < 10; _GLF_SPLIT_LOOP_COUNTERi++) {
            obj.numbers[_GLF_SPLIT_LOOP_COUNTERi] = (10 - _GLF_SPLIT_LOOP_COUNTERi);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-40.97, 5.7, -9527.3695, -5737.5716);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            obj.numbers[_GLF_SPLIT_LOOP_COUNTERi] = obj.numbers[_GLF_SPLIT_LOOP_COUNTERi] * obj.numbers[_GLF_SPLIT_LOOP_COUNTERi];
        }
    }
    {
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead9color = _GLF_FUZZED(GLF_live1injectionSwitch);
            int donor_replacementGLF_dead9i = _GLF_FUZZED(-89483);
            vec3 donor_replacementGLF_dead9vecCoor = _GLF_FUZZED((false ? vec3(468.772, -96.92, -81.18) : vec3(3.6, 407.102, -2575.8391)));
            if (int(GLF_dead9gl_FragCoord[1]) < 240) {
                donor_replacementGLF_dead9color = fract(asinh(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[6]))));
                donor_replacementGLF_dead9color.y -= isnan(float(donor_replacementGLF_dead9i)) ? tanh(GLF_dead9gl_FragCoord.x) : atanh(GLF_dead9gl_FragCoord.y);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(38.07, -9098.5423, 8.2, 3.9);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                ;
            } else if (int(GLF_dead9gl_FragCoord[1]) < 270) {
                donor_replacementGLF_dead9color = fract(sin(donor_replacementGLF_dead9vecCoor.yx - trunc(float(GLF_dead9data[7]))));
                donor_replacementGLF_dead9color.y *= mix(normalize(donor_replacementGLF_dead9vecCoor), normalize(vec3(donor_replacementGLF_dead9color, degrees(donor_replacementGLF_dead9color.x))), GLF_dead9injectionSwitch.x).y;
                ;
            } else {
                discard;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-8292.3487, 2.4, -922.729, -2131.4685);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = dFdx(vec4(4.8, -7582.5598, 5365.2228, -86.37));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    quicksort();
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead6j = _GLF_FUZZED(92261);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(84.24, -1.4, 4735.0653, -98.18);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6j, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6j, 10)];
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(844.145, 336.239, vec2(-4.4, -10.58));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    vec2 uv = gl_FragCoord.xy / resolution;
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = asinh(vec4(4.4, -1.2, -116.872, 0.8));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        return;
    }
    vec3 color = vec3(1.0, 2.0, 3.0);
    color.x += float(obj.numbers[0]);
    if (uv.x > (1.0 / 4.0)) {
        color.x += float(obj.numbers[1]);
    }
    if (uv.x > (2.0 / 4.0)) {
        color.y += float(obj.numbers[2]);
    }
    if (uv.x > (3.0 / 4.0)) {
        color.z += float(obj.numbers[3]);
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead9high = _GLF_FUZZED(abs(bitfieldExtract(GLF_dead6N, GLF_dead6N, GLF_dead6N)));
            int donor_replacementGLF_dead9low = _GLF_FUZZED(ivec3(-84058, -22258, -17884).b);
            int donor_replacementGLF_dead9m = _GLF_FUZZED(GLF_dead6N);
            for (int GLF_dead9i = donor_replacementGLF_dead9low; GLF_dead9i < donor_replacementGLF_dead9high; GLF_dead9i += 2 * donor_replacementGLF_dead9m) {
                int GLF_dead9from = GLF_dead9i;
                int GLF_dead9mid = GLF_dead9i + donor_replacementGLF_dead9m - 1;
                int GLF_dead9to = min(GLF_dead9i + 2 * donor_replacementGLF_dead9m - 1, donor_replacementGLF_dead9high);
                GLF_dead9merge(GLF_dead9from, GLF_dead9mid, GLF_dead9to);
            }
        }
        return;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = unpackSnorm4x8(floatBitsToUint(4049.8200));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    _GLF_IDENTITY(color.y += float(obj.numbers[4]), 1.0 * (color.y += float(obj.numbers[4])));
    {
        switch (_GLF_SWITCH(0)) {
            case 21:
                bvec4(false, false, false, true);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-6.5, -3.7, -24.53, -1.3);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bvec2(false, false), bvec2(bvec3(bvec2(false, false), false))))))) {
                    if (uv.x > (3.0 / 4.0)) {
                        int GLF_dead7count = int(GLF_dead7injectionSwitch.x);
                        do {
                            if (_GLF_DEAD(false)) {
                                if (GLF_dead7count * GLF_dead7count + GLF_dead7count * GLF_dead7count > 262144) {
                                    break;
                                }
                            }
                            color -= GLF_dead7palette(vec3(float(GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead7injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead7injectionSwitch.x, 0.6, float(GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead7injectionSwitch.x), 10)]) * 0.1));
                            GLF_dead7count++;
                        } while (GLF_dead7count != GLF_dead7obj.numbers[2]);
                        uv += vec2(GLF_dead7count + GLF_dead7obj.numbers[3], GLF_dead7count + GLF_dead7obj.numbers[3]);
                    }
                }
            case 88:
                {
                    color;
                    mat2x4 _GLF_SWITCH_4_0v[89], _GLF_SWITCH_4_1v, _GLF_SWITCH_4_2v[98];
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            discard;
                            if (_GLF_DEAD(false)) {
                                {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(3.6, -2.4, 195.051, 1.3);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead9i = _GLF_FUZZED(GLF_dead6N);
                                {
                                    GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)];
                                }
                            }
                            return;
                        }
                    }
                    (14539u + uvec2(22202u, 180309u));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec2 donor_replacementGLF_dead8a = _GLF_FUZZED(uv);
                        if (donor_replacementGLF_dead8a.y < donor_replacementGLF_dead8a.x) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = mix(vec4(1.3, -5.0, -53.35, 17.34), vec4(847.901, -0.9, 2386.9450, -143.176), bvec4(true, (ivec2(61501, -99351) == ivec2(97585, -23609)), false, false));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            GLF_dead5h_r = 0.5 - GLF_dead5h_r;
                        }
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead5c8 = _GLF_FUZZED(true);
                            int donor_replacementGLF_dead5msb8 = _GLF_FUZZED(min(2379, 7169));
                            vec2 donor_replacementGLF_dead5pos = _GLF_FUZZED(injectionSwitch);
                            if (!donor_replacementGLF_dead5c8) {
                                ;
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead9color = _GLF_FUZZED(donor_replacementGLF_dead5pos);
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(8.2, 53.58, -1906.0837, -8.6);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    {
                                        donor_replacementGLF_dead9color = fract(sin(color.yx - trunc(float(GLF_dead9data[4]))));
                                        donor_replacementGLF_dead9color[1] += asinh(GLF_dead9gl_FragCoord.y * ldexp(donor_replacementGLF_dead9color.y, -donor_replacementGLF_dead5msb8));
                                        break;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(74.28, 573.137, -6.8, -3.3);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                            {
                                if (_GLF_DEAD(false)) {
                                    if (int(GLF_dead9gl_FragCoord[1]) < 270) {
                                        uv = fract(sin(color.yx - trunc(float(GLF_dead9data[7]))));
                                        uv.y *= mix(normalize(color), normalize(vec3(uv, degrees(uv.x))), GLF_dead9injectionSwitch.x).y;
                                        break;
                                    } else {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-53.76, -22.32, 1.0, -1640.4812);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        discard;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = atanh(vec4(-4.1, 91.84, 6.0, -867.169));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                discard;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(2930.6279, 663.471, 6.7, 1235.9947);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-148.588, -352.223, 2.6, 31.15);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = vec4(82.76, 720.270, -362.730, 6.8);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(7420.3294, 0.9, -89.88, -793.654);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            int donor_replacementGLF_dead5msb8 = _GLF_FUZZED(70686);
                            {
                                ;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead9i = _GLF_FUZZED(max(floatBitsToInt(atan(GLF_dead5h_r, -14.72)), GLF_dead6N));
                            do {
                                if (int(GLF_dead9gl_FragCoord[1]) < 30) {
                                    uv = fract(sin(color.yx - trunc(float(GLF_dead9data[0]))));
                                    uv[0] = dFdy(GLF_dead9gl_FragCoord.y);
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = ceil(vec4(93.41, -35.83, 9.5, -9249.0900));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    break;
                                } else if (int(GLF_dead9gl_FragCoord[1]) < 60) {
                                    uv = fract(sin(color.yx - trunc(float(GLF_dead9data[1]))));
                                    uv[1] *= atan(faceforward(GLF_dead9injectionSwitch, uv.xx, color.yx).y);
                                    break;
                                } else if (int(GLF_dead9gl_FragCoord[1]) < 90) {
                                    uv = fract(sin(color.yx - trunc(float(GLF_dead9data[2]))));
                                    uv.x += atanh(uv.x) * cosh(GLF_dead9injectionSwitch.y) * smoothstep(uv, GLF_dead9injectionSwitch, GLF_dead9gl_FragCoord.yy).x;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = (clamp(vec2(-85.41, -6112.8282), vec2(-468.971, -40.39), vec2(-1831.8863, 5445.7371)) * mat4x2(18.10, -1884.2322, -3.5, 774.013, -4256.0700, 3632.1925, -722.090, 987.864));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    break;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = acos(vec4(-23.07, 62.75, 47.24, 28.34));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                } else if (int(GLF_dead9gl_FragCoord[1]) < 120) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = clamp(vec4(-4.6, -437.798, -9.8, -48.59), -6.3, -996.065);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    uv = fract(acosh(clamp(color.yx - trunc(float(GLF_dead9data[3])), 1.0, 1000.0)));
                                    uv.x += (isnan(GLF_dead9gl_FragCoord.x) ? log2(GLF_dead9gl_FragCoord.x) : log2(GLF_dead9gl_FragCoord.y));
                                    break;
                                } else if (int(GLF_dead9gl_FragCoord[1]) < 150) {
                                    discard;
                                } else if (int(GLF_dead9gl_FragCoord[1]) < 180) {
                                    uv = fract(sin(color.yx - trunc(float(GLF_dead9data[4]))));
                                    uv[1] += asinh(GLF_dead9gl_FragCoord.y * ldexp(uv.y, -donor_replacementGLF_dead9i));
                                    break;
                                } else if (int(GLF_dead9gl_FragCoord[1]) < 210) {
                                    uv = fract(sin(color.yx - trunc(float(GLF_dead9data[5]))));
                                    uv.y -= tanh(uv.x) / cosh(uv.y);
                                    break;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = mix(step(7890.4674, vec4(-31.67, 5635.3865, -6089.6161, -4.9)), vec4(-570.493, -6.1, -8.0, 259.362), bvec4(true, true, true, false));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                } else if (int(GLF_dead9gl_FragCoord[1]) < 240) {
                                    uv = fract(asinh(color.yx - trunc(float(GLF_dead9data[6]))));
                                    uv.y -= isnan(float(donor_replacementGLF_dead9i)) ? tanh(GLF_dead9gl_FragCoord.x) : atanh(GLF_dead9gl_FragCoord.y);
                                    break;
                                } else if (int(GLF_dead9gl_FragCoord[1]) < 270) {
                                    uv = fract(sin(color.yx - trunc(float(GLF_dead9data[7]))));
                                    uv.y *= mix(normalize(color), normalize(vec3(uv, degrees(uv.x))), GLF_dead9injectionSwitch.x).y;
                                    break;
                                } else {
                                    discard;
                                }
                            } while (0 == int(GLF_dead9injectionSwitch.x));
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    mat4x3 _GLF_SWITCH_4_3v[74], _GLF_SWITCH_4_4v[74], _GLF_SWITCH_4_5v[59];
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(cosh(52.80), 97.34, -8430.8654, 43.64);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            case 0:
            case 60:
            case 90:
                ivec2 GLF_live2pos = _GLF_FUZZED((94594 ^ _GLF_IDENTITY(ivec2(-5951, -58162), (ivec2(-5951, -58162)) - ivec2(0, 0))));
            case 84:
            case 17:
            case 6:
            case 3:
            case 7:
            case 76:
            case 78:
                {
                    _GLF_struct_8 _GLF_struct_replacement_8 = _GLF_struct_8(_GLF_struct_9(ivec4(1, 1, 1, 1), 1u, uvec3(1u, 1u, 1u), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_10(uvec3(1u, 1u, 1u)), _GLF_struct_11(bvec2(true, true), 1, mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0)), _GLF_struct_12(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1, ivec2(1, 1), 1, vec4(1.0, 1.0, 1.0, 1.0), _GLF_struct_13(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u)), ivec3(1, 1, 1)), _GLF_IDENTITY(0, (0) ^ 0), vec2(1.0, 1.0));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = sinh(vec4(78.12, 50.81, -33.24, 588.746));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead8z = _GLF_FUZZED(((-9.5) - dFdyCoarse(GLF_dead5h_r)));
                                if (uv.y > uv.x) {
                                    donor_replacementGLF_dead8z = uv.x / uv.y;
                                } else {
                                    donor_replacementGLF_dead8z = uv.y / uv.x;
                                }
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = min(vec4(130.721, -7.2, 6094.5955, -9700.5734), vec4(-5769.0231, 247.539, -3.7, -1.4));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    while (GLF_live2pos.y != 256) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(vec2(-8502.8080, -4740.8661), intBitsToFloat(findLSB(ivec2(-8105, -28448))));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = vec4(29.67, -93.70, 1.2, -218.458);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-5.2, -9.5, 3.5, -46.27);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead11i = _GLF_FUZZED(GLF_dead6N);
                                    int donor_replacementGLF_dead11j = _GLF_FUZZED(-29707);
                                    {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-7824.7939, 212.236, -442.015, 9694.6454);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        vec2 GLF_dead11g = vec2(float(donor_replacementGLF_dead11j), float(donor_replacementGLF_dead11i));
                                        vec2 GLF_dead11o = mix(uv, GLF_dead11g, 0.2);
                                        if (GLF_dead11injectionSwitch.x < (color.x)) {
                                            int GLF_dead11k = 1;
                                            while (GLF_dead11k >= 0) {
                                                GLF_dead11o = GLF_dead11o + GLF_dead11o;
                                                GLF_dead11k--;
                                            }
                                            color = vec3(GLF_dead11injectionSwitch.x, cos(GLF_dead11o));
                                        }
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead10iteration = _GLF_FUZZED(GLF_dead6N);
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-16.23, 3.6, -8.4, 6595.1099);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                ;
                            }
                        }
                        if (_GLF_struct_replacement_8.GLF_live2looplimiter0 >= 3) {
                            break;
                        }
                        _GLF_struct_replacement_8.GLF_live2looplimiter0++;
                        if (_GLF_DEAD(false)) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (vec4(-0.0, -0.4, 9.0, 2.9)[0] + vec4(9225.1549, -7.9, -85.31, 994.021));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            break;
                        }
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = fract(vec4(-7.3, 30.43, 28.36, 89.45));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = sign(vec4(-1.9, 7044.0061, 3.5, 16.71));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    for (int GLF_dead5i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_dead5resolution.x), 0, 0)); GLF_dead5i >= bitfieldReverse(bitfieldExtract(int(GLF_dead5resolution.x), 0, 0)); GLF_dead5i--) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = pow(vec4(-62.78, -4916.8949, -172.919, -231.999), vec4(-496.795, 474.024, -74.45, 7982.8623));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        vec3 GLF_dead5d = _GLF_FUZZED(atan(vec3(-9625.1582, -118.574, 7306.1303), vec3(-23.57, 6.6, 4.2)));
                                        GLF_dead5d = GLF_dead5drawShape(uv, uv + vec2(sin(float(GLF_dead5i) / (float(bitCount(_GLF_struct_replacement_8.GLF_live2looplimiter0)) * 10.0) + GLF_dead5time) / 4.0 * float(bitCount(_GLF_struct_replacement_8.GLF_live2looplimiter0)), float(bitfieldExtract(int(GLF_dead5resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_dead5i) / 100.0 * float(bitCount(_GLF_struct_replacement_8.GLF_live2looplimiter0))), 0.01, float(GLF_dead5i)));
                                        if (length(GLF_dead5d) <= float(bitfieldExtract(int(GLF_dead5resolution.x), 0, 0))) {
                                            continue;
                                        }
                                        color = vec3(GLF_dead5d);
                                    }
                                }
                            }
                            if (GLF_live2pos.x < GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15 && GLF_live2pos.x > GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] - 15) {
                                if (_GLF_DEAD(false)) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(122.749, -9884.5915, -8.7, 88.94);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    float donor_replacementGLF_dead8z = _GLF_FUZZED(color.y);
                                    {
                                        donor_replacementGLF_dead8z = uv.x / uv.y;
                                    }
                                }
                                float GLF_live2p = (15.0 - abs(float(GLF_live2pos.x - GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)]))) / _GLF_IDENTITY(15.0, clamp(_GLF_IDENTITY(15.0, clamp(15.0, 15.0, 15.0)), 15.0, 15.0));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(4.1, -716.247, 8.0, -91.01);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                ;
                            }
                            GLF_live2pos.y++;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead8th = _GLF_FUZZED(-1986.6969);
                        if (uv.x < 0.0) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (vec4(-1.6, -80.98, -2559.9244, -6.6) / vec4(-2955.9329, -420.664, -2.2, 97.86));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            donor_replacementGLF_dead8th = 1.0 - donor_replacementGLF_dead8th;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(3.9, 787.137, -8.7, -6339.8731);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(23.43, 741.659, 381.403, -3.5);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int donor_replacementGLF_dead6k = _GLF_FUZZED(((-60335) - ivec4(-62743, -24118, -83416, -89740).a));
                        {
                            GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6k++, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_8.GLF_live2looplimiter0++, 10)];
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mix(vec4(-7.9, 3.8, -7.8, -8869.0896), exp2(vec4(8839.9372, -39.08, -7.6, -3.2)), bvec4(true, true, true, false));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    {
                        GLF_dead5h_r = 1.0 - GLF_dead5h_r;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-3.1, -4.7, -708.859, 119.157);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat3(0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                break;
                if (_GLF_DEAD(false)) {
                    {
                        int GLF_dead7count = int(GLF_dead7injectionSwitch.x);
                        do {
                            if (_GLF_DEAD(false)) {
                                if (int(GLF_dead9gl_FragCoord[1]) < 60) {
                                    uv = fract(sin(color.yx - trunc(float(GLF_dead9data[1]))));
                                    uv[1] *= atan(faceforward(GLF_dead9injectionSwitch, uv.xx, color.yx).y);
                                    break;
                                } else if (int(GLF_dead9gl_FragCoord[1]) < 90) {
                                    uv = fract(sin(color.yx - trunc(float(GLF_dead9data[2]))));
                                    uv.x += atanh(uv.x) * cosh(GLF_dead9injectionSwitch.y) * smoothstep(uv, GLF_dead9injectionSwitch, GLF_dead9gl_FragCoord.yy).x;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-7278.6418, 32.95, 3.3, 4.5);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    break;
                                } else if (int(GLF_dead9gl_FragCoord[1]) < 120) {
                                    uv = fract(acosh(clamp(color.yx - trunc(float(GLF_dead9data[3])), 1.0, 1000.0)));
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(4.8, 95.05, 4618.2618, -4.4);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    uv.x += (isnan(GLF_dead9gl_FragCoord.x) ? log2(GLF_dead9gl_FragCoord.x) : log2(GLF_dead9gl_FragCoord.y));
                                    break;
                                } else {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-4.1, -8.7, 648.506, -4.3);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (int(GLF_dead9gl_FragCoord[1]) < 150) {
                                        discard;
                                    } else if (int(GLF_dead9gl_FragCoord[1]) < 180) {
                                        uv = fract(sin(color.yx - trunc(float(GLF_dead9data[4]))));
                                        uv[1] += asinh(GLF_dead9gl_FragCoord.y * ldexp(uv.y, -GLF_dead7count));
                                        break;
                                    } else if (int(GLF_dead9gl_FragCoord[1]) < 210) {
                                        uv = fract(sin(color.yx - trunc(float(GLF_dead9data[5]))));
                                        uv.y -= tanh(uv.x) / cosh(uv.y);
                                        break;
                                    } else if (int(GLF_dead9gl_FragCoord[1]) < 240) {
                                        uv = fract(asinh(color.yx - trunc(float(GLF_dead9data[6]))));
                                        uv.y -= isnan(float(GLF_dead7count)) ? tanh(GLF_dead9gl_FragCoord.x) : atanh(GLF_dead9gl_FragCoord.y);
                                        break;
                                    } else if (int(GLF_dead9gl_FragCoord[1]) < 270) {
                                        uv = fract(sin(color.yx - trunc(float(GLF_dead9data[7]))));
                                        uv.y *= mix(normalize(color), normalize(vec3(uv, degrees(uv.x))), GLF_dead9injectionSwitch.x).y;
                                        break;
                                    } else {
                                        discard;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = fma(vec4(74.73, 4547.7856, 2.9, -51.16), dFdy(vec4(7694.5165, -0.6, 65.81, -890.896)), vec4(0.1, -2.2, 89.89, 81.75));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                            }
                            color -= GLF_dead7palette(vec3(float(GLF_dead7obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead7obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead7injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead7injectionSwitch.x, float(GLF_dead7obj.numbers[2]) * 0.1, float(GLF_dead7obj.numbers[8]) * 0.1));
                            GLF_dead7count++;
                        } while (GLF_dead7count != GLF_dead7obj.numbers[1]);
                        uv += vec2(GLF_dead7count + int(GLF_dead7injectionSwitch.y), GLF_dead7count + int(GLF_dead7injectionSwitch.x));
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-7.9, 7.6, -117.893, 849.522);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            default:
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead6grey = _GLF_FUZZED(-6.0);
                    {
                        if (int(GLF_dead6gl_FragCoord[1]) < 150) {
                            discard;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = smoothstep(log2(vec4(-5.0, 0.2, 21.22, 3.4)), vec4(-297.541, 8137.3052, -672.071, 9193.8042), max(vec4(-588.472, -6526.8249, -3.5, -850.770), -5690.0905));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_dead5h_r = -GLF_dead5h_r;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(8866.1547, vec3(-5.7, -79.23, -1.0));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (int(GLF_dead6gl_FragCoord[1]) < 180) {
                                donor_replacementGLF_dead6grey = 0.5 + float(GLF_dead6data[5]) / 10.0;
                            } else {
                                if (int(GLF_dead6gl_FragCoord[1]) < 210) {
                                    donor_replacementGLF_dead6grey = 0.5 + float(GLF_dead6data[6]) / 10.0;
                                } else {
                                    if (int(GLF_dead6gl_FragCoord[1]) < 240) {
                                        donor_replacementGLF_dead6grey = 0.5 + float(GLF_dead6data[7]) / 10.0;
                                    } else {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(51.92, 471.615, -8.3, -3.3);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (int(GLF_dead6gl_FragCoord[1]) < 270) {
                                            donor_replacementGLF_dead6grey = 0.5 + float(GLF_dead6data[8]) / 10.0;
                                        } else {
                                            discard;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        int donor_replacementGLF_dead9i = _GLF_FUZZED(GLF_dead6N);
                                        int donor_replacementGLF_dead9k = _GLF_FUZZED((25542 >> bitCount(-3039)));
                                        {
                                            GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9k++, 10)] = GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i++, 10)];
                                        }
                                    }
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = fma(vec4(-14.93, 70.76, 571.211, 3.3), vec4(-4.1, 95.85, -7.0, 5.5), vec4(-969.556, 90.82, -614.529, -1271.0664));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                1;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(8867.0195, 24.30, 399.559, 5.8);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
        }
    }
    if (_GLF_DEAD(false)) {
        {
            ;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead6j = _GLF_FUZZED(24352);
            {
                GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6j, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6j, 10)];
            }
            if (_GLF_DEAD(false)) {
                for (int GLF_dead10k = 0; GLF_dead10k < 1000; GLF_dead10k++) {
                    if (donor_replacementGLF_dead6j * donor_replacementGLF_dead6j + donor_replacementGLF_dead6j * donor_replacementGLF_dead6j > 262144) {
                        break;
                    }
                    int GLF_dead10x_new = ((donor_replacementGLF_dead6j * donor_replacementGLF_dead6j - donor_replacementGLF_dead6j * donor_replacementGLF_dead6j) / 256 + donor_replacementGLF_dead6j);
                    donor_replacementGLF_dead6j = (2 * donor_replacementGLF_dead6j * donor_replacementGLF_dead6j / 256 + donor_replacementGLF_dead6j);
                    donor_replacementGLF_dead6j = GLF_dead10x_new;
                    donor_replacementGLF_dead6j++;
                }
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(697.784, 9.0, 1.7, -8.4);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(mat4x2(6.4, -1.6, -1077.2204, -2.2, -5781.2725, -0.2, -9252.1243, -3.2)[1], smoothstep(vec2(304.510, -9.8), ldexp(vec2(16.16, 73.59), ivec2(-74706, -15477)), vec2(-5819.8059, -4.7)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-683.887, -0.2, -7202.6979, 690.100);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    if (uv.y > (1.0 / 4.0)) {
        color.x += float(obj.numbers[5]);
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = log2(vec4(-9.5, 7545.7274, 1.6, -63.51));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            float donor_replacementGLF_dead6grey = _GLF_FUZZED(-8.9);
            {
                donor_replacementGLF_dead6grey = 0.5 + float(GLF_dead6data[1]) / 10.0;
            }
        }
        float GLF_live3th = _GLF_FUZZED(float(-34583));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(954.955, 79.95, -852.108, -165.001);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead4iterationCap = _GLF_FUZZED(((-94272) >> (-59564)));
            {
                donor_replacementGLF_dead4iterationCap += 1;
            }
        }
        {
            GLF_live3th = -GLF_live3th;
            if (_GLF_DEAD(false)) {
                {
                    ;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-2.8, 61.94, 449.846, 6045.9122);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            {
                uv = fract(sin(color.yx - trunc(float(GLF_dead9data[2]))));
                uv.x += atanh(uv.x) * cosh(GLF_dead9injectionSwitch.y) * smoothstep(uv, GLF_dead9injectionSwitch, GLF_dead9gl_FragCoord.yy).x;
                ;
            }
        }
    }
    if (uv.y > (2.0 / 4.0)) {
        color.y += float(obj.numbers[6]);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead5c4 = _GLF_FUZZED(true);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(6.6, -2.1, -47.78, 4017.5830);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (!donor_replacementGLF_dead5c4) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead10iteration = _GLF_FUZZED(findMSB(28580));
                        {
                            ;
                        }
                    }
                    ;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(5.3, 8659.3399, 2.4, -2215.7438);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = (vec4(-17.52, 7.4, -16.44, -1119.2330) / (-18.23));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead10c_im = _GLF_FUZZED(bitfieldExtract(GLF_dead6N, GLF_dead6N, -552));
                    int donor_replacementGLF_dead10c_re = _GLF_FUZZED(((-55987) >> GLF_dead6N));
                    int donor_replacementGLF_dead10iteration = _GLF_FUZZED(((-77803) / GLF_dead6N));
                    int donor_replacementGLF_dead10x = _GLF_FUZZED(ivec3(58648, 11819, 271)[2]);
                    int donor_replacementGLF_dead10y = _GLF_FUZZED(int(GLF_dead5b_b));
                    for (int GLF_dead10k = 0; GLF_dead10k < 1000; GLF_dead10k++) {
                        if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 262144) {
                            break;
                        }
                        int GLF_dead10x_new = ((donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y) / 256 + donor_replacementGLF_dead10c_re);
                        donor_replacementGLF_dead10y = (2 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y / 256 + donor_replacementGLF_dead10c_im);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(85.77, -41.25, 694.827, 49.94);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        donor_replacementGLF_dead10x = GLF_dead10x_new;
                        donor_replacementGLF_dead10iteration++;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    if (uv.y > (3.0 / _GLF_IDENTITY(4.0, clamp(_GLF_IDENTITY(4.0, (false ? _GLF_FUZZED(668.216) : 4.0)), 4.0, 4.0)))) {
        color.z += float(obj.numbers[7]);
    }
    color.z += float(obj.numbers[8]);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-669.238, -1916.5733, 2752.4684, 0.3);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (abs(uv.x - uv.y) < 0.25) {
        color.x += float(obj.numbers[9]);
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    GLF_dead5s_g = 0.5 - GLF_dead5s_g;
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(_GLF_IDENTITY(false, (false) || false)), (!(_GLF_IDENTITY(false, (false) || false))) && true))))) {
                int donor_replacementGLF_dead4iteration = _GLF_FUZZED(28035);
                {
                    ;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                int donor_replacementGLF_dead4iteration = _GLF_FUZZED((69110 / (-67094)));
                int donor_replacementGLF_dead4iterationCap = _GLF_FUZZED(71172);
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead9high = _GLF_FUZZED(ivec4(-85692, -57496, -71006, 84288).s);
                    {
                        int GLF_dead9from = donor_replacementGLF_dead4iteration;
                        int GLF_dead9mid = donor_replacementGLF_dead4iteration + donor_replacementGLF_dead4iteration - 1;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(7780.8577, 7.9, -6.2, 688.598);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int GLF_dead9to = min(donor_replacementGLF_dead4iteration + 2 * donor_replacementGLF_dead4iteration - 1, donor_replacementGLF_dead9high);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = dFdyCoarse(normalize(vec4(-5672.0800, -9252.6954, -1.5, 957.836)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_dead9merge(GLF_dead9from, GLF_dead9mid, GLF_dead9to);
                    }
                }
                float donor_replacementGLF_dead4xCoord = _GLF_FUZZED(floor((mat4x2(0.4, 5973.3572, 2.5, -3.0, -54.84, 9.7, -2131.7650, 62.05), ldexp(-63.76, 55741))));
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bool(false)), (bool(bool(false))) || false)))) {
                        while (donor_replacementGLF_dead4iteration <= donor_replacementGLF_dead4iterationCap && donor_replacementGLF_dead4iterationCap <= donor_replacementGLF_dead4iteration) {
                            if (GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4iteration, 10)] < GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4iterationCap, 10)]) {
                                GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4iteration++, 10)] = GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4iteration++, 10)];
                            } else {
                                GLF_dead9temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4iteration++, 10)] = GLF_dead9data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4iterationCap++, 10)];
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-6.4, 8004.2706, 4732.7582, -6140.4179);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    return;
                }
                float donor_replacementGLF_dead4yCoord = _GLF_FUZZED(960.945);
                if (donor_replacementGLF_dead4iteration < bitfieldInsert(donor_replacementGLF_dead4iterationCap, 0, 0, 0)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(76.39, -5299.5970, 7831.5155, 92.61);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    ;
                } else {
                    ;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(6606.1286, 122.362, 106.035, 0.2);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = smoothstep(-337.959, -5221.5028, atan(vec4(41.09, -1.6, 93.77, 4307.7431)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(0.0))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead5msb8 = _GLF_FUZZED(-39642);
                    {
                        GLF_dead5b_b = clamp(float(bitfieldExtract(int(GLF_dead5resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead5msb8)), GLF_dead5b_b * float(bitCount(donor_replacementGLF_dead5msb8)) * 3.0);
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-266.135, 2.3, 121.895, 422.589);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    _GLF_color = vec4(normalize(color), 1.0);
}
