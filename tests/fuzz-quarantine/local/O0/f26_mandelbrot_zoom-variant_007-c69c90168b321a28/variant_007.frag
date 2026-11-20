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

vec4 GLF_live21_GLF_color = _GLF_FUZZED((vec4(-54.03, -505.760, -718.016, 5.8) + 7031.8192));

layout(set = 0, binding = 2) uniform buf2 {
    float GLF_live21one;
};

mat2 GLF_live21m22 = _GLF_FUZZED(mat2(-9010.9090, -97.71, -1.8, -2740.1140));
mat2x3 GLF_live21m23 = _GLF_FUZZED(mat2x3(1315.5234, 313.506, -20.03, 5.6, 8.9, -509.326));
mat2x4 GLF_live21m24 = _GLF_FUZZED(mat2x4(-876.213, 72.48, -1662.1347, -91.55, -8.9, 3.6, -539.591, 1.3));
mat3x2 GLF_live21m32 = _GLF_FUZZED(mat3x2(-3.3, 4736.5099, 15.14, -986.737, -9.8, 68.36));
mat3 GLF_live21m33 = _GLF_FUZZED(((-6.9) * mat3((mat2x4(77.38, -6887.2398, 93.31, 2853.7063, 8553.6381, 0.1, -77.32, 4476.1932) * mat4x2(-7581.0897, -6269.2614, 3.4, 2.8, 4149.4546, 378.635, 2074.2165, -504.377)))));
mat3x4 GLF_live21m34 = _GLF_FUZZED((mat3x4(-610.573, -66.51, 40.72, -35.20, 44.83, 0.2, -4410.3488, 575.814, 944.148, 9.0, 7.9, -26.71) + (((-1964.1741) * mat3x4(-32.27, 4048.0918, 7388.5047, 2.4, -9138.1282, -4021.9193, 34.30, 6047.1012, -3.2, -5.5, 86.35, -5003.6765)) * mat3(-911.885, -167.441, -324.747, -31.01, -6.1, 30.30, 9.5, 6.5, -875.294))));
mat4x2 GLF_live21m42 = _GLF_FUZZED(mat4x2(-0.9, 614.237, -7148.4218, 85.31, -5.4, vec3(-276.508, -23.99, -4.8).s, -728.297, -1643.7098));
mat4x3 GLF_live21m43 = _GLF_FUZZED(mat4x3(-84.20, 549.362, -8.6, 99.74, -98.26, -40.69, -7.9, -295.738, 788.208, 331.923, -388.658, 6.4));
mat4 GLF_live21m44 = _GLF_FUZZED(mat4(3.6, -73.00, -68.15, 0.0, -3071.5959, 9303.1085, 52.45, 95.83, -1085.9764, -8.6, -4.3, 4043.2963, 8288.1519, -43.16, -76.50, -0.4));
layout(set = 0, binding = 3) uniform sampler2D GLF_live22tex;
const float GLF_live22weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead15injectionSwitch;
};

struct GLF_dead15QuicksortObject {
    int numbers[10];
};

GLF_dead15QuicksortObject GLF_dead15obj = GLF_dead15QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead15swap(int GLF_dead15i, int GLF_dead15j) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return;
    }
    int GLF_dead15temp = GLF_dead15obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15i, 10)];
    GLF_dead15obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15i, 10)] = GLF_dead15obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15j, 10)];
    GLF_dead15obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15j, 10)] = GLF_dead15temp;
}

vec3 GLF_dead15palette(vec3 GLF_dead15a, vec3 GLF_dead15b, vec3 GLF_dead15c, vec3 GLF_dead15d) {
    {
        {
            ;
        }
    }
    return fract(mix(GLF_dead15d * GLF_dead15a, GLF_dead15a * GLF_dead15c, GLF_dead15b + GLF_dead15d - GLF_dead15c));
}

ivec2 GLF_dead16iter(ivec2 GLF_dead16p) {
    if (GLF_dead16p.x > 0) {
        GLF_dead16p.y--;
    }
    if (GLF_dead16p.x < 0) {
        GLF_dead16p.y++;
        {
            {
                ;
            }
        }
    }
    GLF_dead16p.x += GLF_dead16p.y / 2;
    return GLF_dead16p;
    if (_GLF_DEAD(false)) {
        return ivec2(1, 1);
    }
}

layout(set = 0, binding = 5) uniform buf5 {
    vec3 GLF_dead10polynomial;
};

float GLF_dead10fx(float GLF_dead10x) {
    return GLF_dead10polynomial.x * pow(GLF_dead10x, 2.0) + GLF_dead10polynomial.y * GLF_dead10x + GLF_dead10polynomial.z;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return 1.0;
    }
}

vec4 GLF_dead9gl_FragCoord = _GLF_FUZZED(vec4(2.8, -318.660, 3299.7773, 34.85));
int GLF_dead9data[10] = int[10](_GLF_FUZZED(int(false)), _GLF_FUZZED(-68342), _GLF_FUZZED(ivec3(-76958, -87952, 67047).g), _GLF_FUZZED(16671), _GLF_FUZZED(ivec4(-4122, 19714, 17900, -85891).y), _GLF_FUZZED(34456), _GLF_FUZZED((+(true ? ivec2(-76125, -99399) : ivec2(-85976, 92250)).s)), _GLF_FUZZED(11328), _GLF_FUZZED(-99187), _GLF_FUZZED(((-55541) ^ 15420))), GLF_dead9temp[10] = int[10](_GLF_FUZZED(ivec3(15743, 26093, -39385).x), _GLF_FUZZED(-47556), _GLF_FUZZED(-5770), _GLF_FUZZED((66425 | (-41358))), _GLF_FUZZED(-68694), _GLF_FUZZED(5697), _GLF_FUZZED(2189), _GLF_FUZZED((+(-75540))), _GLF_FUZZED(41410), _GLF_FUZZED(-79198));
layout(set = 0, binding = 6) uniform sampler2D GLF_dead8tex;

layout(set = 0, binding = 7) uniform buf7 {
    float GLF_live3time;
};

layout(set = 0, binding = 8) uniform buf8 {
    vec2 GLF_live3resolution;
};

float GLF_live3h_r = _GLF_FUZZED(-53.84);
float GLF_live3s_g = _GLF_FUZZED(vec4(-9343.8719, 7.1, 26.59, -2.9).w);
float GLF_live3b_b = _GLF_FUZZED(-8.6);

void GLF_live3doConvert() {
    int GLF_live3msb8 = 256;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        vec3 donor_replacementGLF_dead15color = _GLF_FUZZED(refract(clamp(GLF_dead10polynomial, GLF_dead10polynomial, vec3(-28.45, 6.4, 129.155)), vec3(-97.89, -5419.5857, -0.9), GLF_live3h_r));
        int donor_replacementGLF_dead15count = _GLF_FUZZED((false, GLF_live3msb8));
        do {
            donor_replacementGLF_dead15color -= GLF_dead15palette(vec3(float(GLF_dead15obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead15injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead15injectionSwitch.x, 0.6, float(GLF_dead15obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead15injectionSwitch.x), 10)]) * 0.1));
            donor_replacementGLF_dead15count++;
        } while (donor_replacementGLF_dead15count != GLF_dead15obj.numbers[2]);
    }
    {
        vec2 GLF_live22coord = _GLF_FUZZED((vec2(-9.7, -2.9) + (-798.380)));
        int GLF_live22i = _GLF_FUZZED((((-74843) & (-51001)) ^ ivec3(-4702, 15459, -59589).p));
        int GLF_live22j = _GLF_FUZZED(ivec4(-7993, ivec3(40586, -43399, -71935)).w);
        vec4 GLF_live22res = _GLF_FUZZED(vec4(7563.4862, vec2(2814.3826, 8406.8864), -1.6));
        float GLF_live22uvstep = _GLF_FUZZED(vec2(-3341.9343, -4.5).y);
        {
            GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
        }
    }
    vec3 GLF_live3temp = _GLF_FUZZED(vec3(7.9, 4.5, 3.4));
    GLF_live3temp = GLF_live3b_b * (float(bitCount(GLF_live3msb8)) - GLF_live3s_g) + (GLF_live3b_b - GLF_live3b_b * (float(bitCount(GLF_live3msb8)) - GLF_live3s_g)) * clamp(abs(abs(6.0 * (GLF_live3h_r - vec3(bitfieldReverse(0), bitCount(GLF_live3msb8), 2) / 3.0)) - 3.0) - float(bitCount(GLF_live3msb8)), float(bitfieldExtract(int(GLF_live3resolution.x), 0, 0)), float(bitCount(int(GLF_live3resolution.x))));
    GLF_live3h_r = GLF_live3temp.x;
    GLF_live3s_g = GLF_live3temp.y;
    GLF_live3b_b = GLF_live3temp.z;
}

float _GLF_outlined_0(int GLF_live3msb8) {
    return float(bitCount(GLF_live3msb8));
}

float _GLF_outlined_1(float GLF_live3c) {
    return fract(GLF_live3c);
}

vec3 GLF_live3computeColor(float GLF_live3c, vec2 GLF_live3position) {
    int GLF_live3msb8 = 256;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        return vec3(1.0, 1.0, 1.0);
    }
    {
        {
            ;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
        {
            {
                GLF_live21_GLF_color = vec4(vec3(0.0), 1.0);
            }
        }
    }
    do {
        {
            int GLF_live22looplimiter1 = 0;
            if (GLF_live22looplimiter1 >= 5) {
                ;
            }
        }
        GLF_live3h_r = _GLF_outlined_1(GLF_live3c);
    } while (_GLF_WRAPPED_LOOP(false));
    do {
        {
            int GLF_live20x = _GLF_FUZZED(11103);
            int GLF_live20y = _GLF_FUZZED(-1380);
            if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 262144) {
                ;
            }
        }
        GLF_live3s_g = _GLF_outlined_0(GLF_live3msb8);
    } while (_GLF_WRAPPED_LOOP(false));
    GLF_live3b_b = (0.5 + (sin(GLF_live3time) * 0.5 + 0.5));
    if (_GLF_DEAD(false)) {
        do {
            return vec3(1.0, 1.0, 1.0);
        } while (_GLF_WRAPPED_LOOP(false));
    }
    GLF_live3doConvert();
    GLF_live3s_g *= float(bitCount(GLF_live3msb8)) / GLF_live3position.y;
    GLF_live3h_r *= float(bitCount(GLF_live3msb8)) / GLF_live3position.x;
    if (abs(GLF_live3position.y - GLF_live3position.x) < 0.5) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        GLF_live3b_b = clamp(float(bitfieldExtract(int(GLF_live3resolution.x), 0, 0)), float(bitCount(GLF_live3msb8)), GLF_live3b_b * float(bitCount(GLF_live3msb8)) * 3.0);
    }
    return vec3(GLF_live3h_r, GLF_live3s_g, GLF_live3b_b);
    {
        int GLF_live22looplimiter0 = 0;
        if (GLF_live22looplimiter0 >= 5) {
            ;
        }
    }
}

vec3 GLF_live3defaultColor() {
    {
        vec2 GLF_live22coord = _GLF_FUZZED(vec2(36.18, ((-(-69.91)))));
        vec4 GLF_live22res = _GLF_FUZZED(vec4(-7.7, -958.668, -6.8, -1.5));
        float GLF_live22uvstep = _GLF_FUZZED(-70.77);
        {
            int GLF_live22looplimiter1 = 0;
            for (int GLF_live22i = 0; GLF_live22i < 3; GLF_live22i++) {
                if (GLF_live22looplimiter1 >= 5) {
                    break;
                }
                GLF_live22looplimiter1++;
                {
                    {
                        int GLF_live22looplimiter0 = 0;
                        for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                            if (GLF_live22looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live22looplimiter0++;
                            {
                                GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                            }
                        }
                    }
                }
            }
        }
    }
    return vec3(float(bitfieldExtract(int(GLF_live3resolution.y), 0, 0)));
}

vec3 GLF_live3drawShape(vec2 GLF_live3pos, vec2 GLF_live3square, vec3 GLF_live3setting) {
    int GLF_live3msb8 = 256;
    bool GLF_live3c1 = GLF_live3pos.x - GLF_live3setting.x < GLF_live3square.x;
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (!GLF_live3c1) {
        return GLF_live3defaultColor();
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    bool GLF_live3c2 = GLF_live3pos.x + GLF_live3setting.x > GLF_live3square.x;
    if (!GLF_live3c2) {
        return GLF_live3defaultColor();
    }
    {
        int GLF_live20x = _GLF_FUZZED(((-79899) | int(87006u)));
        int GLF_live20y = _GLF_FUZZED(78251);
        if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 262144) {
            ;
        }
    }
    bool GLF_live3c3 = GLF_live3pos.y - GLF_live3setting.x < GLF_live3square.y;
    if (!GLF_live3c3) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        return GLF_live3defaultColor();
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    bool GLF_live3c4 = GLF_live3pos.y + GLF_live3setting.x > GLF_live3square.y;
    if (!GLF_live3c4) {
        return GLF_live3defaultColor();
    }
    {
        int GLF_live21looplimiter1 = 0;
        if (GLF_live21looplimiter1 >= 5) {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    {
        int GLF_live20x = _GLF_FUZZED(27153);
        int GLF_live20y = _GLF_FUZZED((+79759));
        if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 262144) {
            ;
        }
    }
    bool GLF_live3c5 = GLF_live3pos.x - (GLF_live3setting.x - GLF_live3setting.y) < GLF_live3square.x;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        return vec3(1.0, 1.0, 1.0);
    }
    if (!GLF_live3c5) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(-44277, 15907));
                {
                    donor_replacementGLF_dead16p.y++;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
            return vec3(1.0, 1.0, 1.0);
        }
        {
            {
                ;
            }
        }
        return GLF_live3computeColor(GLF_live3setting.z / (5.0 * float(findMSB(GLF_live3msb8))), GLF_live3pos);
    }
    bool GLF_live3c6 = GLF_live3pos.x + (GLF_live3setting.x - GLF_live3setting.y) > GLF_live3square.x;
    if (!GLF_live3c6) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            return GLF_live3computeColor(GLF_live3setting.z / (5.0 * float(findMSB(GLF_live3msb8))), GLF_live3pos);
        } else {
            {
                int GLF_live22looplimiter0 = 0;
                if (GLF_live22looplimiter0 >= 5) {
                    ;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
    }
    bool GLF_live3c7 = GLF_live3pos.y - (GLF_live3setting.x - GLF_live3setting.y) < GLF_live3square.y;
    if (!GLF_live3c7) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        {
            float GLF_live12th = _GLF_FUZZED(vec2(5.4, 86.43).s);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
                {
                    vec2 GLF_live22coord = _GLF_FUZZED(((-6.7) - (vec4(-9.8, 5398.7705, -7156.2443, 94.55) * (-8.6)).qp));
                    int GLF_live22i = _GLF_FUZZED((+(-7063)));
                    int GLF_live22looplimiter1 = 0;
                    vec4 GLF_live22res = _GLF_FUZZED(vec4(-1.5, 7.5, -54.00, -26.13));
                    float GLF_live22uvstep = _GLF_FUZZED(float(int(false)));
                    {
                        if (GLF_live22looplimiter1 >= 5) {
                            ;
                        }
                        GLF_live22looplimiter1++;
                        {
                            {
                                int GLF_live22looplimiter0 = 0;
                                for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                    if (GLF_live22looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live22looplimiter0++;
                                    {
                                        GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            {
                int GLF_live22looplimiter1 = 0;
                if (GLF_live22looplimiter1 >= 5) {
                    ;
                }
            }
            {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    GLF_live12th = 1.0 - GLF_live12th;
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                } else {
                }
            }
            {
                {
                    ;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        return GLF_live3computeColor(GLF_live3setting.z / (5.0 * float(findMSB(GLF_live3msb8))), GLF_live3pos);
    }
    bool GLF_live3c8 = GLF_live3pos.y + (GLF_live3setting.x - GLF_live3setting.y) > GLF_live3square.y;
    if (!GLF_live3c8) {
        return GLF_live3computeColor(GLF_live3setting.z / (5.0 * float(findMSB(GLF_live3msb8))), GLF_live3pos);
    }
    {
        int GLF_live20c_im = _GLF_FUZZED((+(-31401)));
        int GLF_live20c_re = _GLF_FUZZED(73061);
        int GLF_live20iteration = _GLF_FUZZED(-39457);
        int GLF_live20looplimiter0 = 0;
        int GLF_live20x = _GLF_FUZZED(-35224);
        int GLF_live20y = _GLF_FUZZED(77193);
        for (int GLF_live20k = 0; GLF_live20k < 1000; GLF_live20k++) {
            if (GLF_live20looplimiter0 >= 5) {
                break;
            }
            GLF_live20looplimiter0++;
            {
                if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 262144) {
                    break;
                }
                int GLF_live20x_new = ((GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y) / 256 + GLF_live20c_re);
                GLF_live20y = (2 * GLF_live20x * GLF_live20y / 256 + GLF_live20c_im);
                GLF_live20x = GLF_live20x_new;
                GLF_live20iteration++;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    do {
        return GLF_live3defaultColor();
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        int donor_replacementGLF_dead7i = _GLF_FUZZED((GLF_live3msb8 >> GLF_live3msb8));
        float donor_replacementGLF_dead7result = _GLF_FUZZED(GLF_live3s_g);
        float donor_replacementGLF_dead7thirty_two = _GLF_FUZZED(vec4(-844.270, 76.79, 541.280, -4.6).s);
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        {
            if (mod(float(donor_replacementGLF_dead7i), round(donor_replacementGLF_dead7thirty_two)) <= 0.01) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                donor_replacementGLF_dead7result += 100.0;
            }
        }
    }
}

vec4 GLF_dead2_GLF_color = _GLF_FUZZED((vec2(5.9, 160.094).xxxy * mat4(7.9, -61.82, -8.5, -0.0, 733.603, -5807.9923, 69.30, -708.255, -3.1, -884.349, -979.346, -4.3, 8.8, -4.7, 8542.7507, -83.61)));
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

vec3 pickColor(int i) {
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-0.3, -3.3, 84.82, 7473.6091);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        int GLF_live3msb8 = _GLF_FUZZED((23800 * (-12510)));
        vec2 GLF_live3pos = _GLF_FUZZED(vec2(7.5, 4.8));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = refract(GLF_dead2_GLF_color, vec4(3329.4128, -3.1, -3.2, -9.5), GLF_live3s_g);
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        vec3 GLF_live3setting = _GLF_FUZZED(vec3(3.1, -0.6, 3.0));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            ;
        } else {
            {
                vec2 GLF_live22coord = _GLF_FUZZED((vec2(2920.0030, 8.7) * ((-335.436) + vec2(-4.1, 953.285))));
                int GLF_live22i = _GLF_FUZZED(64922);
                int GLF_live22looplimiter0 = 0;
                vec4 GLF_live22res = _GLF_FUZZED((mat2x4(-7.2, 9.9, -583.439, -2258.1331, -6.3, 4.5, -5.4, 6.8) * vec2(-7.9, -906.513)));
                float GLF_live22uvstep = _GLF_FUZZED(-5.9);
                for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                    if (GLF_live22looplimiter0 >= 5) {
                        break;
                    }
                    GLF_live22looplimiter0++;
                    {
                        GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead17v = _GLF_FUZZED(int(true));
                {
                    donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                    {
                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-53.21, 4143.6411));
                        int GLF_live22i = _GLF_FUZZED(((-95838) & 67126));
                        int GLF_live22looplimiter0 = 0;
                        vec4 GLF_live22res = _GLF_FUZZED((-vec4(4.4, -430.990, -4.4, -2.7)));
                        float GLF_live22uvstep = _GLF_FUZZED((-3.7));
                        for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                            if (GLF_live22looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live22looplimiter0++;
                            {
                                GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = mix(_GLF_color, _GLF_color, GLF_dead9gl_FragCoord);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            return vec3(1.0, 1.0, 1.0);
        }
    }
    {
        vec2 GLF_live22coord = _GLF_FUZZED((mat3x2(-5.0, 8813.6112, 847.541, 4974.2781, 6751.5400, 223.924) * vec3(-99.90, -4.2, 5.4)));
        int GLF_live22i = _GLF_FUZZED(-19647);
        int GLF_live22looplimiter0 = 0;
        vec4 GLF_live22res = _GLF_FUZZED(((true ? vec4(-311.396, -8.9, 8.7, 585.623) : vec4(6.2, -5973.9701, 8590.8757, 9.3)) - vec4(6049.2876, 977.446, 9.0, -34.58)));
        float GLF_live22uvstep = _GLF_FUZZED(vec2(-947.155, 3.4).g);
        for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
            if (GLF_live22looplimiter0 >= 5) {
                break;
            }
            GLF_live22looplimiter0++;
            {
                GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
            }
        }
    }
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead2x2 = _GLF_FUZZED(-6139.8346);
        if (donor_replacementGLF_dead2x2 <= -0.9 && donor_replacementGLF_dead2x2 >= -1.1) {
            GLF_dead2_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            GLF_dead2_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        {
            vec4 GLF_live13c = _GLF_FUZZED(vec4(-356.353, -140.257, 182.540, -260.060));
            int GLF_live13i = _GLF_FUZZED(54437);
            if (GLF_live13c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)] >= 1.0) {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                GLF_live13c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)] = GLF_live13c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)] * GLF_live13c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)];
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                return vec3(1.0, 1.0, 1.0);
            }
        }
        return vec3(1.0, 1.0, 1.0);
    }
    return vec3(float(i) / 50.0, float(i) / 120.0, float(i) / 140.0);
}

float _GLF_outlined_2(float x, float y, vec4 GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth) {
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead18i = _GLF_FUZZED(floatBitsToInt(GLF_live3time));
        float donor_replacementGLF_dead18ref = _GLF_FUZZED(determinant(mat3(3.3, 2.9, 572.842, -625.570, 8.0, 554.619, 0.1, 2722.0721, 94.69)));
        float donor_replacementGLF_dead18s = _GLF_FUZZED(GLF_live3time);
        if (mod(float(donor_replacementGLF_dead18i), donor_replacementGLF_dead18ref) <= 0.01) {
            {
                {
                    ;
                }
            }
            donor_replacementGLF_dead18s += 0.2;
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(-29119, -42757));
            if (donor_replacementGLF_dead16p.x > 0) {
                donor_replacementGLF_dead16p.y--;
            }
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
        }
        return 1.0;
    }
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            break;
        }
        return 2.0 * x * y + GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth.x;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            int donor_replacementGLF_dead18i = _GLF_FUZZED(int(true));
            float donor_replacementGLF_dead18ref = _GLF_FUZZED(reflect(normalize(GLF_live3s_g), float((77336u >= 139097u))));
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            float donor_replacementGLF_dead18s = _GLF_FUZZED(84.52);
            if (mod(float(donor_replacementGLF_dead18i), donor_replacementGLF_dead18ref) <= 0.01) {
                donor_replacementGLF_dead18s += 0.2;
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
}

vec4 _GLF_outlined_3(vec4 _GLF_color) {
    return _GLF_color;
}

float _GLF_outlined_4(vec2 GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k1, float GLF_dead10k0, float GLF_dead10h0) {
    {
        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-928.820, -70.04));
        int GLF_live22i = _GLF_FUZZED((int(true) ^ 24771));
        int GLF_live22looplimiter1 = 0;
        vec4 GLF_live22res = _GLF_FUZZED(vec4(68.69, 8.1, -7.4, -53.83));
        float GLF_live22uvstep = _GLF_FUZZED(-2.7);
        {
            if (GLF_live22looplimiter1 >= 5) {
                ;
            }
            GLF_live22looplimiter1++;
            {
                {
                    int GLF_live22looplimiter0 = 0;
                    for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                        if (GLF_live22looplimiter0 >= 5) {
                            break;
                        }
                        GLF_live22looplimiter0++;
                        {
                            GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                        }
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return 1.0;
    }
    return (((GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k1.x) * (GLF_dead10k0)) - ((GLF_dead10h0) * (GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k1.y))) / ((pow((GLF_dead10h0), 2.0) * (GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k1.x)) - (pow((GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k1.x), 2.0) * (GLF_dead10h0)));
}

vec4 _GLF_outlined_5() {
    if (_GLF_DEAD(false)) {
        return vec4(1.0, 1.0, 1.0, 1.0);
    }
    return min(min(vec4(-37.75, 4.3, -490.214, 2405.9558), vec4(0.9, 9128.1034, 26.73, 47.78)), 17.18);
}

vec4 _GLF_outlined_6() {
    return vec4(-7.6, -1.7, 4992.1651, 0.9);
}

float _GLF_outlined_7(float donor_replacementGLF_dead10x2, float donor_replacementGLF_dead10C, float donor_replacementGLF_dead10B, float donor_replacementGLF_dead10A) {
    return donor_replacementGLF_dead10x2 - ((2.0 * donor_replacementGLF_dead10C) / (donor_replacementGLF_dead10B + sign(donor_replacementGLF_dead10B) * sqrt(pow(donor_replacementGLF_dead10B, 2.0) - (4.0 * donor_replacementGLF_dead10A * donor_replacementGLF_dead10C))));
}

vec4 _GLF_outlined_8(vec4 _GLF_color) {
    return _GLF_color;
}

vec3 mand(float xCoord, float yCoord) {
    vec4 GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
        return vec3(1.0, 1.0, 1.0);
    }
    float height = resolution.y;
    GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth.z = height;
    float width = resolution.x;
    GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth.w = width;
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = _GLF_outlined_5();
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                float GLF_live4limit = _GLF_FUZZED(float(((-14443) > (-4544))));
                {
                    {
                        GLF_live21_GLF_color = vec4(vec3(0.0), 1.0);
                    }
                }
                float GLF_live4ref = _GLF_FUZZED(1.8);
                float GLF_live4s = _GLF_FUZZED(float(false));
                {
                    int GLF_live4looplimiter0 = 0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return vec3(1.0, 1.0, 1.0);
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(-3.2, -0.9));
                            int GLF_live22i = _GLF_FUZZED(79946);
                            vec4 GLF_live22res = _GLF_FUZZED((49.31 * vec2(7.5, -484.487).rrrr));
                            float GLF_live22uvstep = _GLF_FUZZED(-8.9);
                            {
                                int GLF_live22looplimiter0 = 0;
                                for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                    if (GLF_live22looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live22looplimiter0++;
                                    {
                                        GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                    }
                                }
                            }
                        }
                    }
                    for (int GLF_live4i = 1; GLF_live4i < 800; GLF_live4i++) {
                        if (GLF_live4looplimiter0 >= 4) {
                            break;
                        }
                        GLF_live4looplimiter0++;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = round(_GLF_color);
                            {
                                {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                        }
                        {
                            if (mod(float(GLF_live4i), GLF_live4ref) <= 0.01) {
                                GLF_live4s += 0.2;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (float(GLF_live4i) >= GLF_live4limit) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                    {
                                        int GLF_live21looplimiter5 = 0;
                                        if (GLF_live21looplimiter5 >= 5) {
                                            ;
                                        }
                                    }
                                    break;
                                }
                                ;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        {
                            int GLF_live14count = _GLF_FUZZED(62188);
                            int GLF_live14looplimiter0 = 0;
                            {
                                vec2 GLF_live22coord = _GLF_FUZZED(vec2(-7.3, 3.5));
                                int GLF_live22i = _GLF_FUZZED(12299);
                                vec4 GLF_live22res = _GLF_FUZZED((vec2(6.8, 70.03) * mat4x2(-212.526, -4.1, 7.9, -1.3, 7.2, -4.7, 0.8, 9.2)));
                                float GLF_live22uvstep = _GLF_FUZZED(-0.6);
                                {
                                    {
                                        int GLF_live22looplimiter0 = 0;
                                        for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                            if (GLF_live22looplimiter0 >= 5) {
                                                break;
                                            }
                                            GLF_live22looplimiter0++;
                                            {
                                                GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                            }
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                break;
                            }
                            int GLF_live14v = _GLF_FUZZED(((-28104) * 66428));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                float donor_replacementGLF_dead18ref = _GLF_FUZZED(yCoord);
                                float donor_replacementGLF_dead18s = _GLF_FUZZED(GLF_live3resolution[0]);
                                for (int GLF_dead18i = 1; GLF_dead18i < 800; GLF_dead18i++) {
                                    if (mod(float(GLF_dead18i), donor_replacementGLF_dead18ref) <= 0.01) {
                                        donor_replacementGLF_dead18s += 0.2;
                                    }
                                    if (float(GLF_dead18i) >= height) {
                                        ;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                int GLF_live21c = _GLF_FUZZED((true ? 93607 : (((-79320) ^ (-20225)) * 13626)));
                                                int GLF_live21looplimiter0 = 0;
                                                uint GLF_live21matrix_number = _GLF_FUZZED((49098u + 176021u));
                                                int GLF_live21rows = _GLF_FUZZED(int(true));
                                                for (int GLF_live21r = 0; GLF_live21r < GLF_live21rows; GLF_live21r++) {
                                                    if (GLF_live21looplimiter0 >= 5) {
                                                        break;
                                                    }
                                                    GLF_live21looplimiter0++;
                                                    {
                                                        switch (GLF_live21matrix_number) {
                                                            case 0u:
                                                                GLF_live21m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                break;
                                                            case 1u:
                                                                GLF_live21m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                break;
                                                            case 2u:
                                                                GLF_live21m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                break;
                                                            case 3u:
                                                                GLF_live21m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                break;
                                                            case 4u:
                                                                GLF_live21m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                break;
                                                            case 5u:
                                                                GLF_live21m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                break;
                                                            case 6u:
                                                                GLF_live21m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                break;
                                                            case 7u:
                                                                GLF_live21m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                break;
                                                            case 8u:
                                                                GLF_live21m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                break;
                                                        }
                                                    }
                                                }
                                            }
                                            continue;
                                        }
                                    }
                                }
                            }
                            while (GLF_live14v > 1) {
                                if (GLF_live14looplimiter0 >= 6) {
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                {
                                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(-8607.4911, 9074.8773));
                                    int GLF_live22i = _GLF_FUZZED((ivec3(52060).t + (-93247)));
                                    int GLF_live22looplimiter1 = 0;
                                    vec4 GLF_live22res = _GLF_FUZZED(vec4(-94.36, 6.2, 968.627, -99.50));
                                    float GLF_live22uvstep = _GLF_FUZZED((4324.1106));
                                    {
                                        if (GLF_live22looplimiter1 >= 5) {
                                            ;
                                        }
                                        GLF_live22looplimiter1++;
                                        {
                                            {
                                                int GLF_live22looplimiter0 = 0;
                                                for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                                    if (GLF_live22looplimiter0 >= 5) {
                                                        break;
                                                    }
                                                    GLF_live22looplimiter0++;
                                                    {
                                                        GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                {
                                    int GLF_live21looplimiter4 = 0;
                                    if (GLF_live21looplimiter4 >= 5) {
                                        ;
                                    }
                                }
                                GLF_live14looplimiter0++;
                                {
                                    if ((GLF_live14v & 1) == 1) {
                                        {
                                            int GLF_live21looplimiter2 = 0;
                                            if (GLF_live21looplimiter2 >= 5) {
                                                ;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        GLF_live14v = 3 * GLF_live14v + 1;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(10.52, 1433.9256, 1.0, -2.5);
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead17v = _GLF_FUZZED(findLSB(findMSB(GLF_live14count)));
                                            {
                                                donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                return vec3(1.0, 1.0, 1.0);
                                            }
                                        }
                                        GLF_live14v /= 2;
                                    }
                                    GLF_live14count++;
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                }
                            }
                        }
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(8254.0334, 4297.7636));
                            vec4 GLF_live22res = _GLF_FUZZED(vec4(322.015, -6.0, -242.742, -23.00));
                            float GLF_live22uvstep = _GLF_FUZZED(36.71);
                            {
                                int GLF_live22looplimiter1 = 0;
                                for (int GLF_live22i = 0; GLF_live22i < 3; GLF_live22i++) {
                                    if (GLF_live22looplimiter1 >= 5) {
                                        break;
                                    }
                                    GLF_live22looplimiter1++;
                                    {
                                        {
                                            int GLF_live22looplimiter0 = 0;
                                            for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                                if (GLF_live22looplimiter0 >= 5) {
                                                    break;
                                                }
                                                GLF_live22looplimiter0++;
                                                {
                                                    GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                            break;
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    float xpos = xCoord * 0.1 + (resolution.x * 0.6);
    float ypos = yCoord * 0.1 + (resolution.y * 0.4);
    float c_re = 0.8 * (xpos - GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth.w / 2.0) * 4.0 / GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth.w - 0.4;
    GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth.y = c_re;
    float c_im = 0.8 * (ypos - GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth.z / 2.0) * 4.0 / GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth.w;
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
    } else {
        {
            vec2 GLF_live22coord = _GLF_FUZZED(vec2(vec4(504.752, 935.449, -3.7, -83.71)));
            vec4 GLF_live22res = _GLF_FUZZED(vec4(((-11.29) - (-9211.8857)), 58.30, vec2(-12.21, -711.749)));
            float GLF_live22uvstep = _GLF_FUZZED(-76.89);
            {
                int GLF_live22looplimiter1 = 0;
                for (int GLF_live22i = 0; GLF_live22i < 3; GLF_live22i++) {
                    if (GLF_live22looplimiter1 >= 5) {
                        break;
                    }
                    GLF_live22looplimiter1++;
                    {
                        {
                            int GLF_live22looplimiter0 = 0;
                            for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                if (GLF_live22looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live22looplimiter0++;
                                {
                                    GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                }
                            }
                        }
                    }
                }
            }
        }
        GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth.x = c_im;
        {
            {
                ;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
        {
            {
                ;
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        {
            {
                ;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
            {
                vec2 GLF_live22coord = _GLF_FUZZED(vec2(-3.3, -2404.2530));
                int GLF_live22looplimiter1 = 0;
                vec4 GLF_live22res = _GLF_FUZZED((true ? vec4(-9102.3888, 8731.7510, 6.4, -7680.3510) : vec4(7.5, -648.955, -9.1, -94.52)));
                float GLF_live22uvstep = _GLF_FUZZED(-203.994);
                for (int GLF_live22i = 0; GLF_live22i < 3; GLF_live22i++) {
                    if (GLF_live22looplimiter1 >= 5) {
                        break;
                    }
                    GLF_live22looplimiter1++;
                    {
                        {
                            int GLF_live22looplimiter0 = 0;
                            for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                if (GLF_live22looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live22looplimiter0++;
                                {
                                    GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                }
                            }
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(false)) {
                _GLF_color = (GLF_dead2_GLF_color + vec4(102.611, -0.1, -33.14, 5.2));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    } else {
        {
            vec2 GLF_live22coord = _GLF_FUZZED(vec2(-59.67, -4623.0225));
            int GLF_live22i = _GLF_FUZZED(19835);
            int GLF_live22looplimiter0 = 0;
            vec4 GLF_live22res = _GLF_FUZZED(vec4(7.2, -1560.8232, -9.5, 31.81));
            float GLF_live22uvstep = _GLF_FUZZED(6.1);
            for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                if (GLF_live22looplimiter0 >= 5) {
                    break;
                }
                GLF_live22looplimiter0++;
                {
                    GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    {
        ivec2 GLF_merged2_0_1_14_1_1_21GLF_live5countGLF_live5looplimiter0;
        {
            int GLF_live20looplimiter0 = 0;
            if (GLF_live20looplimiter0 >= 5) {
                ;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    vec2 GLF_live22coord = _GLF_FUZZED((mat3x2(5.0, -57.09, 2.3, -95.16, 2.3, 8.2) * vec3(107.275, 26.88, 5.7)));
                    int GLF_live22looplimiter1 = 0;
                    vec4 GLF_live22res = _GLF_FUZZED((vec2(-442.782, 25.84).x - (vec4(8.8, 3.7, -9.7, 5893.3306) + vec4(8547.8377, -2.5, -2.0, -9.7))));
                    float GLF_live22uvstep = _GLF_FUZZED((-5527.4909));
                    for (int GLF_live22i = 0; GLF_live22i < 3; GLF_live22i++) {
                        if (GLF_live22looplimiter1 >= 5) {
                            break;
                        }
                        GLF_live22looplimiter1++;
                        {
                            {
                                int GLF_live22looplimiter0 = 0;
                                for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                    if (GLF_live22looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live22looplimiter0++;
                                    {
                                        GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                    }
                                }
                            }
                        }
                    }
                }
                return vec3(1.0, 1.0, 1.0);
                {
                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(2.0, -1.5));
                    int GLF_live22i = _GLF_FUZZED(-3251);
                    int GLF_live22looplimiter1 = 0;
                    vec4 GLF_live22res = _GLF_FUZZED((vec4(67.60, -232.023, 22.39, -8.7) - vec4(-603.441, 7.9, -1.7, 3405.3237)));
                    float GLF_live22uvstep = _GLF_FUZZED(0.2);
                    {
                        if (GLF_live22looplimiter1 >= 5) {
                            ;
                        }
                        GLF_live22looplimiter1++;
                        {
                            {
                                int GLF_live22looplimiter0 = 0;
                                for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                    if (GLF_live22looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live22looplimiter0++;
                                    {
                                        GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            _GLF_color = (vec4(-2.1, 3.9, 9.1, 2.8) - (-3.0));
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead18limit = _GLF_FUZZED(c_im);
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                float donor_replacementGLF_dead18ref = _GLF_FUZZED((fwidthCoarse(GLF_live3time) - c_im));
                float donor_replacementGLF_dead18s = _GLF_FUZZED(fract(ypos));
                for (int GLF_dead18i = 1; GLF_dead18i < 800; GLF_dead18i++) {
                    if (mod(float(GLF_dead18i), donor_replacementGLF_dead18ref) <= 0.01) {
                        donor_replacementGLF_dead18s += 0.2;
                    }
                    {
                        int GLF_live20looplimiter3 = 0;
                        if (GLF_live20looplimiter3 >= 5) {
                            ;
                        }
                    }
                    if (float(GLF_dead18i) >= donor_replacementGLF_dead18limit) {
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
            {
                {
                    ;
                }
            }
        }
        int GLF_live5count = _GLF_FUZZED(70944);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            vec3 donor_replacementGLF_dead15color = _GLF_FUZZED(vec3(0.3, 76.29, -81.60));
            {
                vec2 GLF_live22coord = _GLF_FUZZED(vec2((true ? vec4(-614.767, -79.48, 4.1, -9212.3498) : vec4(-6.9, -0.1, -54.06, -5.8))));
                int GLF_live22i = _GLF_FUZZED(-12583);
                int GLF_live22looplimiter1 = 0;
                vec4 GLF_live22res = _GLF_FUZZED(vec4(0.5, vec2(-983.774, -4857.0418), -2.5));
                float GLF_live22uvstep = _GLF_FUZZED(float(true));
                {
                    if (GLF_live22looplimiter1 >= 5) {
                        ;
                    }
                    GLF_live22looplimiter1++;
                    {
                        {
                            int GLF_live22looplimiter0 = 0;
                            for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                if (GLF_live22looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live22looplimiter0++;
                                {
                                    GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                }
                            }
                        }
                    }
                }
            }
            vec2 donor_replacementGLF_dead15grid = _GLF_FUZZED(GLF_live3resolution);
            vec2 donor_replacementGLF_dead15uv = _GLF_FUZZED(ceil(injectionSwitch));
            if (donor_replacementGLF_dead15uv.x > (1.0 / 4.0)) {
                int GLF_dead15count = int(GLF_dead15injectionSwitch.x);
                do {
                    donor_replacementGLF_dead15color += GLF_dead15palette(vec3(0.5, float(GLF_dead15obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead15injectionSwitch.y)), vec3(float(GLF_dead15obj.numbers[4]) * 0.1, GLF_dead15injectionSwitch.x, 0.6));
                    GLF_dead15count++;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        continue;
                    }
                    {
                        {
                            ;
                        }
                    }
                } while (GLF_dead15count != GLF_dead15obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead15injectionSwitch.x), 10)]);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                donor_replacementGLF_dead15grid = vec2(GLF_dead15count + GLF_dead15obj.numbers[8], GLF_dead15count + GLF_dead15obj.numbers[6]);
            }
        }
        GLF_merged2_0_1_14_1_1_21GLF_live5countGLF_live5looplimiter0.x = GLF_live5count;
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                vec2 GLF_merged2_0_1_27_1_1_30donor_replacementGLF_dead8hdonor_replacementGLF_dead8refh;
                vec3 GLF_merged2_0_1_31_1_2_32donor_replacementGLF_dead8slopedonor_replacementGLF_dead8uvstep;
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                {
                    int GLF_live20c_im = _GLF_FUZZED(-27944);
                    int GLF_live20c_re = _GLF_FUZZED(64476);
                    int GLF_live20iteration = _GLF_FUZZED(-50675);
                    int GLF_live20looplimiter0 = 0;
                    int GLF_live20x = _GLF_FUZZED(75739);
                    int GLF_live20y = _GLF_FUZZED(((38594 * 18351) * 44043));
                    {
                        if (GLF_live20looplimiter0 >= 5) {
                            ;
                        }
                        GLF_live20looplimiter0++;
                        {
                            if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 262144) {
                                ;
                            }
                            int GLF_live20x_new = ((GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y) / 256 + GLF_live20c_re);
                            GLF_live20y = (2 * GLF_live20x * GLF_live20y / 256 + GLF_live20c_im);
                            GLF_live20x = GLF_live20x_new;
                            GLF_live20iteration++;
                        }
                    }
                }
                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(resolution);
                float donor_replacementGLF_dead8h = _GLF_FUZZED(xpos);
                GLF_merged2_0_1_27_1_1_30donor_replacementGLF_dead8hdonor_replacementGLF_dead8refh.x = donor_replacementGLF_dead8h;
                {
                    {
                        vec2 GLF_live22coord = _GLF_FUZZED((vec2(80.55, 0.5) - 2111.5168));
                        int GLF_live22i = _GLF_FUZZED((-(-51399)));
                        int GLF_live22looplimiter0 = 0;
                        vec4 GLF_live22res = _GLF_FUZZED(vec4(-66.86, -4960.1185, 8.1, 931.600));
                        float GLF_live22uvstep = _GLF_FUZZED((+vec3(741.080, 39.45, 5.1)).s);
                        for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                            if (GLF_live22looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live22looplimiter0++;
                            {
                                GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                            }
                        }
                    }
                    int GLF_live13i = _GLF_FUZZED(-51318);
                    float GLF_live13ref = _GLF_FUZZED(438.824);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    float GLF_live13s = _GLF_FUZZED(-1.9);
                    for (int _injected_loop_counter = _GLF_IDENTITY(1, 0 | (1)); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                        if (mod(float(GLF_live13i), GLF_live13ref) <= 0.01) {
                            GLF_live13s += 0.2;
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        }
                    }
                }
                int donor_replacementGLF_dead8i = _GLF_FUZZED(GLF_merged2_0_1_14_1_1_21GLF_live5countGLF_live5looplimiter0.x);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    break;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                float donor_replacementGLF_dead8refh = _GLF_FUZZED(dFdxFine(xpos));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                GLF_merged2_0_1_27_1_1_30donor_replacementGLF_dead8hdonor_replacementGLF_dead8refh.y = donor_replacementGLF_dead8refh;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                float donor_replacementGLF_dead8slope = _GLF_FUZZED(GLF_live3h_r);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                GLF_merged2_0_1_31_1_2_32donor_replacementGLF_dead8slopedonor_replacementGLF_dead8uvstep.x = donor_replacementGLF_dead8slope;
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                    {
                        int GLF_live21c = _GLF_FUZZED(57757);
                        int GLF_live21looplimiter0 = 0;
                        uint GLF_live21matrix_number = _GLF_FUZZED(uint(false));
                        int GLF_live21rows = _GLF_FUZZED((39688 ^ (false ? (-7493) : 24716)));
                        for (int GLF_live21r = 0; GLF_live21r < GLF_live21rows; GLF_live21r++) {
                            if (GLF_live21looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live21looplimiter0++;
                            {
                                switch (GLF_live21matrix_number) {
                                    case 0u:
                                        GLF_live21m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                        break;
                                    case 1u:
                                        GLF_live21m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                        break;
                                    case 2u:
                                        GLF_live21m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                        break;
                                    case 3u:
                                        GLF_live21m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                        break;
                                    case 4u:
                                        GLF_live21m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                        break;
                                    case 5u:
                                        GLF_live21m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                        break;
                                    case 6u:
                                        GLF_live21m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                        break;
                                    case 7u:
                                        GLF_live21m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                        break;
                                    case 8u:
                                        GLF_live21m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                        break;
                                }
                            }
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    _GLF_color = abs(vec4(-0.5, 4.7, -90.03, -1.8));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
                vec2 donor_replacementGLF_dead8uvstep = _GLF_FUZZED(smoothstep(GLF_live3resolution, unpackHalf2x16(71579u), GLF_live3resolution.rg));
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        vec3 donor_replacementGLF_dead15color = _GLF_FUZZED(sin(GLF_dead10polynomial));
                        vec2 donor_replacementGLF_dead15grid = _GLF_FUZZED(resolution);
                        vec2 donor_replacementGLF_dead15uv = _GLF_FUZZED((mat3x2(2293.8322, -13.56, -9.5, 75.93, 5.9, -1.9) * refract(GLF_dead10polynomial, GLF_merged2_0_1_31_1_2_32donor_replacementGLF_dead8slopedonor_replacementGLF_dead8uvstep, yCoord)));
                        if (donor_replacementGLF_dead15uv.x > (1.0 / 4.0)) {
                            int GLF_dead15count = int(GLF_dead15injectionSwitch.x);
                            do {
                                {
                                    int GLF_live21cols = _GLF_FUZZED(-59280);
                                    int GLF_live21looplimiter2 = 0;
                                    uint GLF_live21matrix_number = _GLF_FUZZED(48439u);
                                    int GLF_live21rows = _GLF_FUZZED(1181);
                                    {
                                        if (GLF_live21looplimiter2 >= 5) {
                                            ;
                                        }
                                        GLF_live21looplimiter2++;
                                        {
                                            {
                                                int GLF_live21looplimiter1 = 0;
                                                for (int GLF_live21c = 0; GLF_live21c < GLF_live21cols; GLF_live21c++) {
                                                    if (GLF_live21looplimiter1 >= 5) {
                                                        break;
                                                    }
                                                    GLF_live21looplimiter1++;
                                                    {
                                                        {
                                                            int GLF_live21looplimiter0 = 0;
                                                            for (int GLF_live21r = 0; GLF_live21r < GLF_live21rows; GLF_live21r++) {
                                                                if (GLF_live21looplimiter0 >= 5) {
                                                                    break;
                                                                }
                                                                GLF_live21looplimiter0++;
                                                                {
                                                                    switch (GLF_live21matrix_number) {
                                                                        case 0u:
                                                                            GLF_live21m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                            break;
                                                                        case 1u:
                                                                            GLF_live21m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                            break;
                                                                        case 2u:
                                                                            GLF_live21m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                            break;
                                                                        case 3u:
                                                                            GLF_live21m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                            break;
                                                                        case 4u:
                                                                            GLF_live21m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                            break;
                                                                        case 5u:
                                                                            GLF_live21m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                            break;
                                                                        case 6u:
                                                                            GLF_live21m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                            break;
                                                                        case 7u:
                                                                            GLF_live21m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                            break;
                                                                        case 8u:
                                                                            GLF_live21m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                            break;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_live21matrix_number = GLF_live21matrix_number + 1u;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                donor_replacementGLF_dead15color += GLF_dead15palette(vec3(0.5, float(GLF_dead15obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead15injectionSwitch.y)), vec3(float(GLF_dead15obj.numbers[4]) * 0.1, GLF_dead15injectionSwitch.x, 0.6));
                                {
                                    vec2 GLF_live22coord = _GLF_FUZZED((vec4(-86.75, -978.076, 5.0, 208.315) * mat2x4(-9.2, 535.903, -84.43, 50.83, 33.27, 0.8, 75.14, -53.50)));
                                    int GLF_live22i = _GLF_FUZZED((false ? (-74514) : 50057));
                                    int GLF_live22j = _GLF_FUZZED(-64511);
                                    vec4 GLF_live22res = _GLF_FUZZED(vec4(vec2(-6.9, 94.21), (false ? vec2(3857.8728, -252.692) : vec2(2.3, 3.1))));
                                    float GLF_live22uvstep = _GLF_FUZZED(-76.15);
                                    {
                                        GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                    }
                                }
                                GLF_dead15count++;
                            } while (GLF_dead15count != GLF_dead15obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead15injectionSwitch.x), 10)]);
                            donor_replacementGLF_dead15grid = vec2(GLF_dead15count + GLF_dead15obj.numbers[8], GLF_dead15count + GLF_dead15obj.numbers[6]);
                        }
                    }
                    return vec3(1.0, 1.0, 1.0);
                }
                GLF_merged2_0_1_31_1_2_32donor_replacementGLF_dead8slopedonor_replacementGLF_dead8uvstep.yz = donor_replacementGLF_dead8uvstep;
                {
                    {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    return vec3(1.0, 1.0, 1.0);
                }
                while (GLF_merged2_0_1_27_1_1_30donor_replacementGLF_dead8hdonor_replacementGLF_dead8refh.x < GLF_merged2_0_1_27_1_1_30donor_replacementGLF_dead8hdonor_replacementGLF_dead8refh.y && donor_replacementGLF_dead8i < 32) {
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    donor_replacementGLF_dead8coord -= GLF_merged2_0_1_31_1_2_32donor_replacementGLF_dead8slopedonor_replacementGLF_dead8uvstep.yz;
                    if (_GLF_DEAD(false)) {
                        break;
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        {
                            int GLF_live21looplimiter7 = 0;
                            if (GLF_live21looplimiter7 >= 5) {
                                ;
                            }
                        }
                    }
                    GLF_merged2_0_1_27_1_1_30donor_replacementGLF_dead8hdonor_replacementGLF_dead8refh.y += GLF_merged2_0_1_31_1_2_32donor_replacementGLF_dead8slopedonor_replacementGLF_dead8uvstep.x;
                    GLF_merged2_0_1_27_1_1_30donor_replacementGLF_dead8hdonor_replacementGLF_dead8refh.x = texture(GLF_dead8tex, donor_replacementGLF_dead8coord).y;
                    donor_replacementGLF_dead8i++;
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                vec2 GLF_live22coord = _GLF_FUZZED((vec2(512.837, 7.2) * 28.78));
                int GLF_live22i = _GLF_FUZZED(-3517);
                int GLF_live22looplimiter1 = 0;
                vec4 GLF_live22res = _GLF_FUZZED((vec4(0.7, 8.2, -4.3, 739.122) * vec4(3953.4623, 284.129, 5.1, 8.4)));
                float GLF_live22uvstep = _GLF_FUZZED(4.5);
                {
                    if (GLF_live22looplimiter1 >= 5) {
                        ;
                    }
                    GLF_live22looplimiter1++;
                    {
                        {
                            int GLF_live22looplimiter0 = 0;
                            for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                if (GLF_live22looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live22looplimiter0++;
                                {
                                    GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                }
                            }
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        int GLF_live5looplimiter0 = 0;
        GLF_merged2_0_1_14_1_1_21GLF_live5countGLF_live5looplimiter0.y = GLF_live5looplimiter0;
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        } else {
            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                {
                    vec2 GLF_live22coord = _GLF_FUZZED((-vec2(0.7, 50.02)));
                    int GLF_live22i = _GLF_FUZZED((11421 - (-13259)));
                    vec4 GLF_live22res = _GLF_FUZZED((mat2x4(-9.6, 1.7, 7.0, 6.3, -17.73, -8.8, 3.6, -4.5) * vec2(-2212.2654, -3.2)));
                    float GLF_live22uvstep = _GLF_FUZZED((38.94 * 57.97));
                    {
                        int GLF_live22looplimiter0 = 0;
                        for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                            if (GLF_live22looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live22looplimiter0++;
                            {
                                GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                            }
                        }
                    }
                }
                return vec3(1.0, 1.0, 1.0);
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                {
                    int GLF_live20c_im = _GLF_FUZZED(726);
                    int GLF_live20c_re = _GLF_FUZZED(99216);
                    int GLF_live20iteration = _GLF_FUZZED(-81307);
                    int GLF_live20x = _GLF_FUZZED(47141);
                    int GLF_live20y = _GLF_FUZZED(int(158232u));
                    {
                        if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 262144) {
                            ;
                        }
                        int GLF_live20x_new = ((GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y) / 256 + GLF_live20c_re);
                        GLF_live20y = (2 * GLF_live20x * GLF_live20y / 256 + GLF_live20c_im);
                        GLF_live20x = GLF_live20x_new;
                        GLF_live20iteration++;
                    }
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                return vec3(1.0, 1.0, 1.0);
            }
            _GLF_color = step(1.2, vec4(-34.20, 396.145, -97.44, 898.520));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        int GLF_live5v = _GLF_FUZZED(-52270);
        {
            if (GLF_merged2_0_1_14_1_1_21GLF_live5countGLF_live5looplimiter0.y >= 4) {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                ;
            }
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED((GLF_merged2_0_1_14_1_1_21GLF_live5countGLF_live5looplimiter0 | GLF_merged2_0_1_14_1_1_21GLF_live5countGLF_live5looplimiter0));
                if (donor_replacementGLF_dead16p.x < 0) {
                    donor_replacementGLF_dead16p.y++;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                    {
                        vec2 GLF_live22coord = _GLF_FUZZED((mat2(8939.2776, -0.4, -451.118, 3759.6927) * vec2(994.832, -55.54)));
                        int GLF_live22i = _GLF_FUZZED(12594);
                        int GLF_live22j = _GLF_FUZZED(ivec4(-3534, -89572, -10490, 55081).s);
                        vec4 GLF_live22res = _GLF_FUZZED((mat4(371.531, 9.4, 3780.3538, -193.578, 24.87, -1.8, 3.8, -4.1, -1.1, 8700.6410, -4.7, -0.2, -7133.7973, -6.0, -8298.8452, 8.3) * vec4(-1.8, 877.434, 7.5, -8726.6795)));
                        float GLF_live22uvstep = _GLF_FUZZED(vec3(22.51, -8.0, 4.0).g);
                        {
                            GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                        }
                    }
                }
            }
            GLF_merged2_0_1_14_1_1_21GLF_live5countGLF_live5looplimiter0.y++;
            {
                if ((GLF_live5v & 1) == 1) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        return vec3(1.0, 1.0, 1.0);
                    }
                    GLF_live5v = 3 * GLF_live5v + 1;
                    {
                        int GLF_live21c = _GLF_FUZZED(5394);
                        uint GLF_live21matrix_number = _GLF_FUZZED((+194223u));
                        int GLF_live21rows = _GLF_FUZZED((96790 * 47578));
                        {
                            {
                                int GLF_live21looplimiter0 = 0;
                                for (int GLF_live21r = 0; GLF_live21r < GLF_live21rows; GLF_live21r++) {
                                    if (GLF_live21looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live21looplimiter0++;
                                    {
                                        switch (GLF_live21matrix_number) {
                                            case 0u:
                                                GLF_live21m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                break;
                                            case 1u:
                                                GLF_live21m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                break;
                                            case 2u:
                                                GLF_live21m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                break;
                                            case 3u:
                                                GLF_live21m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                break;
                                            case 4u:
                                                GLF_live21m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                break;
                                            case 5u:
                                                GLF_live21m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                break;
                                            case 6u:
                                                GLF_live21m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                break;
                                            case 7u:
                                                GLF_live21m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                break;
                                            case 8u:
                                                GLF_live21m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                } else {
                    GLF_live5v /= 2;
                }
                GLF_merged2_0_1_14_1_1_21GLF_live5countGLF_live5looplimiter0.x++;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(17414, -29695));
                    while (donor_replacementGLF_dead16p.x > 15) {
                        donor_replacementGLF_dead16p.x -= 16;
                    }
                }
                do {
                    do {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                _GLF_color = vec4(3.0, -9607.2637, -6840.3004, 52.36);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(length(vec2(0.0, 0.0))))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
        }
    }
    {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_outlined_6();
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = log2(vec4(-51.11, -753.592, -2431.7401, -9.1));
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = GLF_dead9gl_FragCoord;
                } else {
                }
            }
        }
    }
    float x = 0.0, y = 0.0;
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            return vec3(1.0, 1.0, 1.0);
        } else {
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        int donor_replacementGLF_dead17i = _GLF_FUZZED(-87377);
        int donor_replacementGLF_dead17iters = _GLF_FUZZED(ivec3(55627, -40986, 9330)[2]);
        int donor_replacementGLF_dead17v = _GLF_FUZZED(55497);
        for (donor_replacementGLF_dead17i = 0; donor_replacementGLF_dead17i < donor_replacementGLF_dead17iters; donor_replacementGLF_dead17i++) {
            donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
        }
    }
    int iteration = 0;
    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(0, (0) ^ 0)); _injected_loop_counter--) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            for (int _injected_loop_counter = ((69757 & 0) ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                return vec3(1.0, 1.0, 1.0);
                {
                    int GLF_live6looplimiter2 = 0;
                    if (GLF_live6looplimiter2 >= 6) {
                        ;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        _GLF_color = ceil(GLF_dead9gl_FragCoord);
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        int donor_replacementGLF_dead15i = _GLF_FUZZED(-603);
        int donor_replacementGLF_dead15j = _GLF_FUZZED((false ? (iteration - iteration) : 86299));
        {
            int GLF_live21c = _GLF_FUZZED(13982);
            int GLF_live21looplimiter1 = 0;
            uint GLF_live21matrix_number = _GLF_FUZZED((~uvec3(120820u, 151272u, 141483u).s));
            int GLF_live21rows = _GLF_FUZZED((((-78640) | (-70905)) * 70767));
            {
                if (GLF_live21looplimiter1 >= 5) {
                    ;
                }
                GLF_live21looplimiter1++;
                {
                    {
                        int GLF_live21looplimiter0 = 0;
                        for (int GLF_live21r = 0; GLF_live21r < GLF_live21rows; GLF_live21r++) {
                            if (GLF_live21looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live21looplimiter0++;
                            {
                                switch (GLF_live21matrix_number) {
                                    case 0u:
                                        GLF_live21m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                        break;
                                    case 1u:
                                        GLF_live21m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                        break;
                                    case 2u:
                                        GLF_live21m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                        break;
                                    case 3u:
                                        GLF_live21m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                        break;
                                    case 4u:
                                        GLF_live21m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                        break;
                                    case 5u:
                                        GLF_live21m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                        break;
                                    case 6u:
                                        GLF_live21m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                        break;
                                    case 7u:
                                        GLF_live21m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                        break;
                                    case 8u:
                                        GLF_live21m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        }
        int donor_replacementGLF_dead15pivot = _GLF_FUZZED(-26275);
        if (GLF_dead15obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15j, 10)] <= donor_replacementGLF_dead15pivot) {
            donor_replacementGLF_dead15i++;
            GLF_dead15swap(donor_replacementGLF_dead15i, donor_replacementGLF_dead15j);
        }
    }
    for (int k = 0; k < 1000; k++) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        {
            vec2 GLF_live12v = _GLF_FUZZED(vec2(6639.5265, 1.9));
            if (length(GLF_live12v) < 0.001) {
                ;
                if (_GLF_DEAD(false)) {
                    {
                        {
                            ;
                        }
                    }
                    continue;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    discard;
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(5.8, 1.0, -1740.3498, -7.9);
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
                _GLF_color = vec4(1.1, -2.7, 3598.4936, 69.78);
                {
                    int GLF_live20looplimiter0 = 0;
                    if (GLF_live20looplimiter0 >= 5) {
                        ;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            {
                {
                    ;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            discard;
                        }
                        {
                            ;
                            {
                                int GLF_live20c_im = _GLF_FUZZED((true ? ((-38156) ^ 63869) : 34827));
                                int GLF_live20c_re = _GLF_FUZZED(42359);
                                int GLF_live20iteration = _GLF_FUZZED(74269);
                                int GLF_live20looplimiter0 = 0;
                                int GLF_live20x = _GLF_FUZZED(ivec4(-11240, -68664, 35913, 25545).a);
                                int GLF_live20y = _GLF_FUZZED(((-81093) | (6733 + ivec2(-85230, 82967))).g);
                                for (int GLF_live20k = 0; GLF_live20k < 1000; GLF_live20k++) {
                                    if (GLF_live20looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live20looplimiter0++;
                                    {
                                        if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 262144) {
                                            break;
                                        }
                                        int GLF_live20x_new = ((GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y) / 256 + GLF_live20c_re);
                                        GLF_live20y = (2 * GLF_live20x * GLF_live20y / 256 + GLF_live20c_im);
                                        GLF_live20x = GLF_live20x_new;
                                        GLF_live20iteration++;
                                    }
                                }
                            }
                        }
                        {
                            int GLF_live20looplimiter0 = 0;
                            if (GLF_live20looplimiter0 >= 5) {
                                ;
                            }
                        }
                    }
                }
            }
            return vec3(1.0, 1.0, 1.0);
        }
        {
            ivec2 GLF_merged2_0_1_14_1_1_10GLF_live5countGLF_live5v;
            int GLF_live5count = _GLF_FUZZED(79428);
            GLF_merged2_0_1_14_1_1_10GLF_live5countGLF_live5v.x = GLF_live5count;
            int GLF_live5looplimiter0 = 0;
            int GLF_live5v = _GLF_FUZZED(int(179072u));
            GLF_merged2_0_1_14_1_1_10GLF_live5countGLF_live5v.y = GLF_live5v;
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = fract(vec4(7266.5191, -9415.2412, 678.673, -7.9));
                    {
                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-635.763, -0.3));
                        int GLF_live22i = _GLF_FUZZED(-88108);
                        vec4 GLF_live22res = _GLF_FUZZED(vec4(-3876.0179, -7.6, -8193.5336, 43.29));
                        float GLF_live22uvstep = _GLF_FUZZED(1.7);
                        {
                            int GLF_live22looplimiter0 = 0;
                            for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                if (GLF_live22looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live22looplimiter0++;
                                {
                                    GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                }
                            }
                        }
                    }
                }
            }
            do {
                while (GLF_merged2_0_1_14_1_1_10GLF_live5countGLF_live5v.y > 1) {
                    if (GLF_live5looplimiter0 >= 4) {
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                        {
                            int GLF_live22looplimiter1 = 0;
                            if (GLF_live22looplimiter1 >= 5) {
                                ;
                            }
                        }
                    }
                    GLF_live5looplimiter0++;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            do {
                                discard;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                {
                                    int GLF_live20x = _GLF_FUZZED(-83543);
                                    int GLF_live20y = _GLF_FUZZED((+(-66750)));
                                    if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 262144) {
                                        ;
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                            return vec3(1.0, 1.0, 1.0);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = uintBitsToFloat((198738u * (uvec4(1275u, 73246u, 85581u, 20097u) % 84919u)));
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        } else {
                            _GLF_color = vec4(-3.2, 0.7, 442.282, 375.845);
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            {
                                int GLF_live21c = _GLF_FUZZED(((-24057) - (42359 + ivec4(-62876, -92074, -85693, -20639).q)));
                                uint GLF_live21matrix_number = _GLF_FUZZED((197187u ^ uvec2(73245u, 17869u).y));
                                int GLF_live21r = _GLF_FUZZED((true ? 88655 : 83693));
                                {
                                    switch (GLF_live21matrix_number) {
                                        case 0u:
                                            GLF_live21m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                            break;
                                        case 1u:
                                            GLF_live21m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                            break;
                                        case 2u:
                                            GLF_live21m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                            break;
                                        case 3u:
                                            GLF_live21m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                            break;
                                        case 4u:
                                            GLF_live21m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                            break;
                                        case 5u:
                                            GLF_live21m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                            break;
                                        case 6u:
                                            GLF_live21m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                            break;
                                        case 7u:
                                            GLF_live21m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                            break;
                                        case 8u:
                                            GLF_live21m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                            break;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                vec4 donor_replacementGLF_dead18c = _GLF_FUZZED((GLF_live3s_g + vec4(-8.9, -6424.8332, 3.9, 6227.6576)));
                                int donor_replacementGLF_dead18i = _GLF_FUZZED((GLF_live5v + findLSB(47677u)));
                                {
                                    if (donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] >= 1.0) {
                                        donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] = donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] * donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)];
                                    }
                                }
                            }
                            _GLF_color = inversesqrt(vec4(867.403, -4.3, 780.649, -9224.0705));
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    return vec3(1.0, 1.0, 1.0);
                                    if (_GLF_DEAD(false)) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if ((GLF_merged2_0_1_14_1_1_10GLF_live5countGLF_live5v.y & 1) == 1) {
                            GLF_merged2_0_1_14_1_1_10GLF_live5countGLF_live5v.y = 3 * GLF_merged2_0_1_14_1_1_10GLF_live5countGLF_live5v.y + 1;
                        } else {
                            GLF_merged2_0_1_14_1_1_10GLF_live5countGLF_live5v.y /= 2;
                            {
                                float GLF_live12th = _GLF_FUZZED(831.527);
                                {
                                    GLF_live12th = 0.5 - GLF_live12th;
                                }
                            }
                        }
                        GLF_merged2_0_1_14_1_1_10GLF_live5countGLF_live5v.x++;
                    }
                    {
                        int GLF_live21looplimiter3 = 0;
                        uint GLF_live21matrix_number = _GLF_FUZZED((~(63810u * 57436u)));
                        for (int GLF_live21cols = 2; GLF_live21cols <= 4; GLF_live21cols++) {
                            if (GLF_live21looplimiter3 >= 5) {
                                break;
                            }
                            GLF_live21looplimiter3++;
                            {
                                {
                                    int GLF_live21looplimiter2 = 0;
                                    for (int GLF_live21rows = 2; GLF_live21rows <= 4; GLF_live21rows++) {
                                        if (GLF_live21looplimiter2 >= 5) {
                                            break;
                                        }
                                        GLF_live21looplimiter2++;
                                        {
                                            {
                                                int GLF_live21looplimiter1 = 0;
                                                for (int GLF_live21c = 0; GLF_live21c < GLF_live21cols; GLF_live21c++) {
                                                    if (GLF_live21looplimiter1 >= 5) {
                                                        break;
                                                    }
                                                    GLF_live21looplimiter1++;
                                                    {
                                                        {
                                                            int GLF_live21looplimiter0 = 0;
                                                            for (int GLF_live21r = 0; GLF_live21r < GLF_live21rows; GLF_live21r++) {
                                                                if (GLF_live21looplimiter0 >= 5) {
                                                                    break;
                                                                }
                                                                GLF_live21looplimiter0++;
                                                                {
                                                                    switch (GLF_live21matrix_number) {
                                                                        case 0u:
                                                                            GLF_live21m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                            break;
                                                                        case 1u:
                                                                            GLF_live21m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                            break;
                                                                        case 2u:
                                                                            GLF_live21m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                            break;
                                                                        case 3u:
                                                                            GLF_live21m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                            break;
                                                                        case 4u:
                                                                            GLF_live21m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                            break;
                                                                        case 5u:
                                                                            GLF_live21m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                            break;
                                                                        case 6u:
                                                                            GLF_live21m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                            break;
                                                                        case 7u:
                                                                            GLF_live21m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                            break;
                                                                        case 8u:
                                                                            GLF_live21m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                            break;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_live21matrix_number = GLF_live21matrix_number + 1u;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        break;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead18limit = _GLF_FUZZED(dot(degrees(GLF_live3resolution), (injectionSwitch + c_im)));
                        float donor_replacementGLF_dead18ref = _GLF_FUZZED(asin(height));
                        float donor_replacementGLF_dead18s = _GLF_FUZZED(c_im);
                        for (int GLF_dead18i = 1; GLF_dead18i < 800; GLF_dead18i++) {
                            if (mod(float(GLF_dead18i), donor_replacementGLF_dead18ref) <= 0.01) {
                                donor_replacementGLF_dead18s += 0.2;
                            }
                            if (float(GLF_dead18i) >= donor_replacementGLF_dead18limit) {
                                ;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    continue;
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    if (_GLF_DEAD(false)) {
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED((vec2(2.0, 885.233) + (-0.2)));
                            int GLF_live22i = _GLF_FUZZED(-32921);
                            vec4 GLF_live22res = _GLF_FUZZED((-vec4(-1303.3164, -326.826, 2.7, 1804.8622)));
                            float GLF_live22uvstep = _GLF_FUZZED(((-267.669) + (-1.5)));
                            {
                                {
                                    int GLF_live22looplimiter0 = 0;
                                    for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                        if (GLF_live22looplimiter0 >= 5) {
                                            break;
                                        }
                                        GLF_live22looplimiter0++;
                                        {
                                            GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                        }
                                    }
                                }
                            }
                        }
                        discard;
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        int GLF_live21cols = _GLF_FUZZED(ivec4(-9899, -78883, -14319, 4378).y);
                        int GLF_live21looplimiter3 = 0;
                        uint GLF_live21matrix_number = _GLF_FUZZED(141360u);
                        {
                            if (GLF_live21looplimiter3 >= 5) {
                                ;
                            }
                            GLF_live21looplimiter3++;
                            {
                                {
                                    int GLF_live21looplimiter2 = 0;
                                    for (int GLF_live21rows = 2; GLF_live21rows <= 4; GLF_live21rows++) {
                                        if (GLF_live21looplimiter2 >= 5) {
                                            break;
                                        }
                                        GLF_live21looplimiter2++;
                                        {
                                            {
                                                int GLF_live21looplimiter1 = 0;
                                                for (int GLF_live21c = 0; GLF_live21c < GLF_live21cols; GLF_live21c++) {
                                                    if (GLF_live21looplimiter1 >= 5) {
                                                        break;
                                                    }
                                                    GLF_live21looplimiter1++;
                                                    {
                                                        {
                                                            int GLF_live21looplimiter0 = 0;
                                                            for (int GLF_live21r = 0; GLF_live21r < GLF_live21rows; GLF_live21r++) {
                                                                if (GLF_live21looplimiter0 >= 5) {
                                                                    break;
                                                                }
                                                                GLF_live21looplimiter0++;
                                                                {
                                                                    switch (GLF_live21matrix_number) {
                                                                        case 0u:
                                                                            GLF_live21m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                            break;
                                                                        case 1u:
                                                                            GLF_live21m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                            break;
                                                                        case 2u:
                                                                            GLF_live21m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                            break;
                                                                        case 3u:
                                                                            GLF_live21m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                            break;
                                                                        case 4u:
                                                                            GLF_live21m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                            break;
                                                                        case 5u:
                                                                            GLF_live21m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                            break;
                                                                        case 6u:
                                                                            GLF_live21m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                            break;
                                                                        case 7u:
                                                                            GLF_live21m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                            break;
                                                                        case 8u:
                                                                            GLF_live21m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                            break;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_live21matrix_number = GLF_live21matrix_number + 1u;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        discard;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-4508.3871, 0.5));
                        int GLF_live22looplimiter1 = 0;
                        vec4 GLF_live22res = _GLF_FUZZED(vec4(-957.054, 4.4, -2.8, -1851.3803));
                        float GLF_live22uvstep = _GLF_FUZZED((vec4(9.6, 4.6, -2777.4025, -4.3).q + vec3(917.017, 4.1, -8331.7501).y));
                        for (int GLF_live22i = 0; GLF_live22i < 3; GLF_live22i++) {
                            if (GLF_live22looplimiter1 >= 5) {
                                break;
                            }
                            GLF_live22looplimiter1++;
                            {
                                {
                                    int GLF_live22looplimiter0 = 0;
                                    for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                        if (GLF_live22looplimiter0 >= 5) {
                                            break;
                                        }
                                        GLF_live22looplimiter0++;
                                        {
                                            GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                        }
                                    }
                                }
                            }
                        }
                    }
                    _GLF_color = vec4(-74.50, -1326.5444, -79.26, -8.1);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                    }
                }
                {
                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(-8.8, 5.3));
                    int GLF_live22looplimiter1 = 0;
                    vec4 GLF_live22res = _GLF_FUZZED(vec4(110.565, -292.430, -1.6, 5454.6191));
                    float GLF_live22uvstep = _GLF_FUZZED((8351.8082 - 947.519));
                    for (int GLF_live22i = 0; GLF_live22i < 3; GLF_live22i++) {
                        if (GLF_live22looplimiter1 >= 5) {
                            break;
                        }
                        GLF_live22looplimiter1++;
                        {
                            {
                                int GLF_live22looplimiter0 = 0;
                                for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                    if (GLF_live22looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live22looplimiter0++;
                                    {
                                        GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                    }
                                }
                            }
                        }
                    }
                }
                float donor_replacementGLF_dead9grey = _GLF_FUZZED(-2630.4617);
                if (int(GLF_dead9gl_FragCoord[1]) < 240) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    donor_replacementGLF_dead9grey = 0.5 + float(GLF_dead9data[7]) / 10.0;
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        continue;
                    }
                    if (int(GLF_dead9gl_FragCoord[1]) < 270) {
                        {
                            float GLF_live13limit = _GLF_FUZZED(-7.2);
                            float GLF_live13ref = _GLF_FUZZED(-6922.2655);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                            }
                            {
                                vec2 GLF_live22coord = _GLF_FUZZED(vec2(-9.6, -54.92));
                                int GLF_live22looplimiter1 = 0;
                                vec4 GLF_live22res = _GLF_FUZZED((9.2 + vec4(-1.6, -995.739, 4.7, 8160.2657)));
                                float GLF_live22uvstep = _GLF_FUZZED(float(true));
                                for (int GLF_live22i = 0; GLF_live22i < 3; GLF_live22i++) {
                                    if (GLF_live22looplimiter1 >= 5) {
                                        break;
                                    }
                                    GLF_live22looplimiter1++;
                                    {
                                        {
                                            int GLF_live22looplimiter0 = 0;
                                            for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                                if (GLF_live22looplimiter0 >= 5) {
                                                    break;
                                                }
                                                GLF_live22looplimiter0++;
                                                {
                                                    GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            float GLF_live13s = _GLF_FUZZED(61.99);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                {
                                    {
                                        ;
                                    }
                                }
                                int GLF_live13looplimiter0 = 0;
                                for (int GLF_live13i = 1; GLF_live13i < 800; GLF_live13i++) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        continue;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                return vec3(1.0, 1.0, 1.0);
                                            }
                                            _GLF_color = vec4(3789.5179, 0.8, -180.649, -6.7);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                discard;
                                            }
                                            vec3 donor_replacementGLF_dead15color = _GLF_FUZZED(mix(GLF_dead10polynomial, vec3(-465.805, 5.7, 58.45), lessThanEqual(uvec3(31972u, 29544u, 110837u), uvec3(87667u, 38992u, 184870u))));
                                            int donor_replacementGLF_dead15count = _GLF_FUZZED(floatBitsToInt(length(vec4(-2.7, 0.0, 18.29, -6.6))));
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            {
                                                donor_replacementGLF_dead15color -= GLF_dead15palette(vec3(float(GLF_dead15obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead15obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead15injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead15injectionSwitch.x, float(GLF_dead15obj.numbers[2]) * 0.1, float(GLF_dead15obj.numbers[8]) * 0.1));
                                                donor_replacementGLF_dead15count++;
                                                {
                                                    vec2 GLF_live22coord = _GLF_FUZZED((+vec2(-1.9, -5.9)));
                                                    int GLF_live22looplimiter1 = 0;
                                                    vec4 GLF_live22res = _GLF_FUZZED(vec4(94.42, 2.9, 2703.7130, 8554.5972));
                                                    float GLF_live22uvstep = _GLF_FUZZED(-500.322);
                                                    for (int GLF_live22i = 0; GLF_live22i < 3; GLF_live22i++) {
                                                        if (GLF_live22looplimiter1 >= 5) {
                                                            break;
                                                        }
                                                        GLF_live22looplimiter1++;
                                                        {
                                                            {
                                                                int GLF_live22looplimiter0 = 0;
                                                                for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                                                    if (GLF_live22looplimiter0 >= 5) {
                                                                        break;
                                                                    }
                                                                    GLF_live22looplimiter0++;
                                                                    {
                                                                        GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (GLF_live13looplimiter0 >= 5) {
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                    GLF_live13looplimiter0++;
                                    {
                                        if (mod(float(GLF_live13i), GLF_live13ref) <= 0.01) {
                                            GLF_live13s += 0.2;
                                        }
                                        if (float(GLF_live13i) >= GLF_live13limit) {
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    GLF_merged2_0_1_14_1_1_10GLF_live5countGLF_live5v.y--;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                break;
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                            ;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                discard;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    }
                                }
                            } else {
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                            continue;
                        }
                        {
                            {
                                ;
                            }
                        }
                        donor_replacementGLF_dead9grey = 0.5 + float(GLF_dead9data[8]) / 10.0;
                    } else {
                        discard;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    continue;
                }
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                continue;
            }
            break;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            continue;
        }
        if (x * x + y * y > 4.0) {
            break;
            {
                {
                    ;
                }
            }
        }
        float x_new = x * x - y * y + GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth.y;
        y = _GLF_outlined_2(x, y, GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth);
        {
            vec2 GLF_live22coord = _GLF_FUZZED((vec2(46.06, 66.04) * (87.06)));
            int GLF_live22i = _GLF_FUZZED(((-16293) & 21624));
            int GLF_live22j = _GLF_FUZZED(63250);
            vec4 GLF_live22res = _GLF_FUZZED(vec4(2072.7395, -7983.9983, 540.047, 7.4));
            float GLF_live22uvstep = _GLF_FUZZED(52.89);
            {
                GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
            }
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
        x = x_new;
        iteration++;
        {
            int GLF_live20looplimiter0 = 0;
            if (GLF_live20looplimiter0 >= 5) {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            {
                do {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        return vec3(1.0, 1.0, 1.0);
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                {
                    int GLF_live13i = _GLF_FUZZED(((-1833) | 52721));
                    float GLF_live13limit = _GLF_FUZZED(3.5);
                    float GLF_live13s = _GLF_FUZZED(float(44046u));
                    if (float(GLF_live13i) >= GLF_live13limit) {
                        ;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                {
                    {
                        ;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            do {
                                _GLF_color = vec4(-4.4, 6.8, 6.8, -61.20);
                            } while (_GLF_WRAPPED_LOOP(false));
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) || (false)))) {
                        continue;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            break;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
                _GLF_color = vec4(-9.8, 561.911, 2440.7148, -7.0);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = pow(vec4(-7907.6536, 4.8, -34.16, 8.7), _GLF_color);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    break;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = (_GLF_color + _GLF_color);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        continue;
                    }
                }
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
        for (int _injected_loop_counter = ((0 & 33845) ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            if (iteration < 1000) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = (mat3x4(91.49, 594.999, 33.80, -5.7, -684.371, 2557.6877, 89.85, -542.033, 6905.8932, 861.912, 44.64, -2225.3032) * min(fwidth(vec3(6338.0728, -6.5, -12.08)), vec3(-9200.8786, -81.64, 8.8)));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            int donor_replacementGLF_dead17i = _GLF_FUZZED(_injected_loop_counter);
                            int donor_replacementGLF_dead17iters = _GLF_FUZZED(iteration);
                            int donor_replacementGLF_dead17v = _GLF_FUZZED(abs((true ? 32597 : _injected_loop_counter)));
                            for (donor_replacementGLF_dead17i = 0; donor_replacementGLF_dead17i < donor_replacementGLF_dead17iters; donor_replacementGLF_dead17i++) {
                                donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                            }
                        }
                        float donor_replacementGLF_dead10A = _GLF_FUZZED(yCoord);
                        float donor_replacementGLF_dead10B = _GLF_FUZZED(GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth.y);
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        float donor_replacementGLF_dead10C = _GLF_FUZZED(GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth.w);
                        float donor_replacementGLF_dead10temp = _GLF_FUZZED(ypos);
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        float donor_replacementGLF_dead10x0 = _GLF_FUZZED(float(true));
                        float donor_replacementGLF_dead10x1 = _GLF_FUZZED(step(-2735.6062, vec3(-6.7, 91.11, -690.733))[0]);
                        float donor_replacementGLF_dead10x2 = _GLF_FUZZED(uintBitsToFloat(30280u));
                        while (abs(donor_replacementGLF_dead10x2 - donor_replacementGLF_dead10x1) >= .000000000000001) {
                            vec2 GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k0;
                            {
                                {
                                    ;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = acosh(vec4(-6.7, -653.496, -2.8, 3.3));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            float GLF_dead10h0 = donor_replacementGLF_dead10x0 - donor_replacementGLF_dead10x2;
                            float GLF_dead10h1 = donor_replacementGLF_dead10x1 - donor_replacementGLF_dead10x2;
                            GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k0.x = GLF_dead10h1;
                            {
                                int GLF_live20x = _GLF_FUZZED(-10909);
                                int GLF_live20y = _GLF_FUZZED(36991);
                                if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 262144) {
                                    ;
                                }
                            }
                            float GLF_dead10k0 = GLF_dead10fx(donor_replacementGLF_dead10x0) - GLF_dead10fx(donor_replacementGLF_dead10x2);
                            GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k0.y = GLF_dead10k0;
                            float GLF_dead10k1 = GLF_dead10fx(donor_replacementGLF_dead10x1) - GLF_dead10fx(donor_replacementGLF_dead10x2);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    continue;
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    continue;
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_outlined_3(_GLF_color);
                                _GLF_color = mix(vec4(-2.3, -6.7, 629.946, -5.3), vec4(3.0, 4.7, -1.7, 63.79), lessThanEqual(uvec4(84285u, 22982u, 48351u, 173344u), uvec4(163974u, 15339u, 161864u, 6489u)));
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < length(sin(0.0)))))) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            {
                                                vec2 GLF_live22coord = _GLF_FUZZED(vec2(-5020.7688, -9.4));
                                                int GLF_live22i = _GLF_FUZZED((82300 + 23553));
                                                int GLF_live22looplimiter1 = 0;
                                                vec4 GLF_live22res = _GLF_FUZZED(vec4(94.93, -520.833, 3244.0565, -5.3).ttqq);
                                                float GLF_live22uvstep = _GLF_FUZZED(-77.90);
                                                {
                                                    if (GLF_live22looplimiter1 >= 5) {
                                                        ;
                                                    }
                                                    GLF_live22looplimiter1++;
                                                    {
                                                        {
                                                            int GLF_live22looplimiter0 = 0;
                                                            for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                                                if (GLF_live22looplimiter0 >= 5) {
                                                                    break;
                                                                }
                                                                GLF_live22looplimiter0++;
                                                                {
                                                                    GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    return vec3(1.0, 1.0, 1.0);
                                                }
                                                _GLF_color = _GLF_color;
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                            donor_replacementGLF_dead10temp = donor_replacementGLF_dead10x2;
                            donor_replacementGLF_dead10A = (((GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k0.x) * (GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k0.y)) - ((GLF_dead10h0) * (GLF_dead10k1))) / ((pow((GLF_dead10h0), 2.0) * (GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k0.x)) - (pow((GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k0.x), 2.0) * (GLF_dead10h0)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                            }
                            donor_replacementGLF_dead10B = (((GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k0.y) - (donor_replacementGLF_dead10A * (pow((GLF_dead10h0), 2.0)))) / (GLF_dead10h0));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                break;
                                {
                                    int GLF_live21cols = _GLF_FUZZED((+(~(-50885))));
                                    int GLF_live21looplimiter2 = 0;
                                    uint GLF_live21matrix_number = _GLF_FUZZED(19250u);
                                    int GLF_live21rows = _GLF_FUZZED(-98460);
                                    {
                                        if (GLF_live21looplimiter2 >= 5) {
                                            ;
                                        }
                                        GLF_live21looplimiter2++;
                                        {
                                            {
                                                int GLF_live21looplimiter1 = 0;
                                                for (int GLF_live21c = 0; GLF_live21c < GLF_live21cols; GLF_live21c++) {
                                                    if (GLF_live21looplimiter1 >= 5) {
                                                        break;
                                                    }
                                                    GLF_live21looplimiter1++;
                                                    {
                                                        {
                                                            int GLF_live21looplimiter0 = 0;
                                                            for (int GLF_live21r = 0; GLF_live21r < GLF_live21rows; GLF_live21r++) {
                                                                if (GLF_live21looplimiter0 >= 5) {
                                                                    break;
                                                                }
                                                                GLF_live21looplimiter0++;
                                                                {
                                                                    switch (GLF_live21matrix_number) {
                                                                        case 0u:
                                                                            GLF_live21m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                            break;
                                                                        case 1u:
                                                                            GLF_live21m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                            break;
                                                                        case 2u:
                                                                            GLF_live21m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                            break;
                                                                        case 3u:
                                                                            GLF_live21m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                            break;
                                                                        case 4u:
                                                                            GLF_live21m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                            break;
                                                                        case 5u:
                                                                            GLF_live21m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                            break;
                                                                        case 6u:
                                                                            GLF_live21m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                            break;
                                                                        case 7u:
                                                                            GLF_live21m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                            break;
                                                                        case 8u:
                                                                            GLF_live21m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                            break;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_live21matrix_number = GLF_live21matrix_number + 1u;
                                        }
                                    }
                                }
                            }
                            donor_replacementGLF_dead10C = GLF_dead10fx(donor_replacementGLF_dead10x2);
                            donor_replacementGLF_dead10x2 = donor_replacementGLF_dead10x2 - ((2.0 * donor_replacementGLF_dead10C) / (donor_replacementGLF_dead10B + sign(donor_replacementGLF_dead10B) * sqrt(pow(donor_replacementGLF_dead10B, 2.0) - (4.0 * donor_replacementGLF_dead10A * donor_replacementGLF_dead10C))));
                            donor_replacementGLF_dead10x0 = donor_replacementGLF_dead10x1;
                            donor_replacementGLF_dead10x1 = donor_replacementGLF_dead10temp;
                            {
                                {
                                    ;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(2958.1175, vec2(-6.9, 1.2), 8.7);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            {
                                vec2 GLF_live22coord = _GLF_FUZZED(vec2(-8.3, 5.0));
                                vec4 GLF_live22res = _GLF_FUZZED(vec4(5.0, vec3(-325.112, -77.24, -8.1)));
                                float GLF_live22uvstep = _GLF_FUZZED(vec3(31.90, -9.0, 8153.3009).p);
                                {
                                    int GLF_live22looplimiter1 = 0;
                                    for (int GLF_live22i = 0; GLF_live22i < 3; GLF_live22i++) {
                                        if (GLF_live22looplimiter1 >= 5) {
                                            break;
                                        }
                                        GLF_live22looplimiter1++;
                                        {
                                            {
                                                int GLF_live22looplimiter0 = 0;
                                                for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                                    if (GLF_live22looplimiter0 >= 5) {
                                                        break;
                                                    }
                                                    GLF_live22looplimiter0++;
                                                    {
                                                        GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    {
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
                return pickColor(iteration);
            } else {
                {
                    if (_GLF_DEAD(false)) {
                        continue;
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED((421.190 - vec2(89.56, 0.6)));
                            vec4 GLF_live22res = _GLF_FUZZED(vec4(6.2, -8.8, -8.9, -694.633));
                            float GLF_live22uvstep = _GLF_FUZZED(vec4(863.463, -1389.0594, -8.0, 8641.5821).z);
                            {
                                int GLF_live22looplimiter1 = 0;
                                for (int GLF_live22i = 0; GLF_live22i < 3; GLF_live22i++) {
                                    if (GLF_live22looplimiter1 >= 5) {
                                        break;
                                    }
                                    GLF_live22looplimiter1++;
                                    {
                                        {
                                            int GLF_live22looplimiter0 = 0;
                                            for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                                if (GLF_live22looplimiter0 >= 5) {
                                                    break;
                                                }
                                                GLF_live22looplimiter0++;
                                                {
                                                    GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    vec2 GLF_live3center = _GLF_FUZZED(vec2(-6.5, 9.1));
                    int GLF_live3i = _GLF_FUZZED(78998);
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead10A = _GLF_FUZZED(GLF_live3time);
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                return vec3(1.0, 1.0, 1.0);
                            }
                            float GLF_live12th = _GLF_FUZZED((+2012.4265));
                            {
                                GLF_live12th = 0.5 - GLF_live12th;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                        }
                        float donor_replacementGLF_dead10B = _GLF_FUZZED(acosh(xCoord));
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        float donor_replacementGLF_dead10C = _GLF_FUZZED(xCoord);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(76.84, -6.7, -83.82, -225.568);
                        }
                        float donor_replacementGLF_dead10temp = _GLF_FUZZED(GLF_live3s_g);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        {
                            vec2 GLF_live12a = _GLF_FUZZED(vec2(-6.5, 6547.5604).rr);
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            float GLF_live12th = _GLF_FUZZED(-177.825);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                continue;
                            }
                            if (GLF_live12a.y < GLF_live12a.x) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(tan(vec4(0.0, 0.0, 0.0, 0.0))))))) {
                                    break;
                                }
                                GLF_live12th = 0.5 - GLF_live12th;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                break;
                            }
                        }
                        float donor_replacementGLF_dead10x0 = _GLF_FUZZED(GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth.w);
                        float donor_replacementGLF_dead10x1 = _GLF_FUZZED(dFdy(float(false)));
                        float donor_replacementGLF_dead10x2 = _GLF_FUZZED(GLF_live3center.r);
                        {
                            vec2 GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k1;
                            float GLF_dead10h0 = donor_replacementGLF_dead10x0 - donor_replacementGLF_dead10x2;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                continue;
                            }
                            float GLF_dead10h1 = donor_replacementGLF_dead10x1 - donor_replacementGLF_dead10x2;
                            GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k1.x = GLF_dead10h1;
                            float GLF_dead10k0 = GLF_dead10fx(donor_replacementGLF_dead10x0) - GLF_dead10fx(donor_replacementGLF_dead10x2);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                            }
                            float GLF_dead10k1 = GLF_dead10fx(donor_replacementGLF_dead10x1) - GLF_dead10fx(donor_replacementGLF_dead10x2);
                            GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k1.y = GLF_dead10k1;
                            donor_replacementGLF_dead10temp = donor_replacementGLF_dead10x2;
                            donor_replacementGLF_dead10A = _GLF_outlined_4(GLF_merged2_0_1_12_1_1_12GLF_dead10h1GLF_dead10k1, GLF_dead10k0, GLF_dead10h0);
                            for (int _injected_loop_counter = ((1 & 1) ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                {
                                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(2.9, -610.674));
                                    vec4 GLF_live22res = _GLF_FUZZED(vec4(-454.489, -924.985, -98.98, 581.201));
                                    float GLF_live22uvstep = _GLF_FUZZED(-594.597);
                                    {
                                        int GLF_live22looplimiter1 = 0;
                                        for (int GLF_live22i = 0; GLF_live22i < 3; GLF_live22i++) {
                                            if (GLF_live22looplimiter1 >= 5) {
                                                break;
                                            }
                                            GLF_live22looplimiter1++;
                                            {
                                                {
                                                    int GLF_live22looplimiter0 = 0;
                                                    for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                                        if (GLF_live22looplimiter0 >= 5) {
                                                            break;
                                                        }
                                                        GLF_live22looplimiter0++;
                                                        {
                                                            GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                donor_replacementGLF_dead10B = (((GLF_dead10k0) - (donor_replacementGLF_dead10A * (pow((GLF_dead10h0), 2.0)))) / (GLF_dead10h0));
                            }
                            donor_replacementGLF_dead10C = GLF_dead10fx(donor_replacementGLF_dead10x2);
                            donor_replacementGLF_dead10x2 = _GLF_outlined_7(donor_replacementGLF_dead10x2, donor_replacementGLF_dead10C, donor_replacementGLF_dead10B, donor_replacementGLF_dead10A);
                            {
                                {
                                    ;
                                }
                            }
                            donor_replacementGLF_dead10x0 = donor_replacementGLF_dead10x1;
                            donor_replacementGLF_dead10x1 = donor_replacementGLF_dead10temp;
                            if (_GLF_DEAD(false)) {
                                {
                                    {
                                        ;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                return vec3(1.0, 1.0, 1.0);
                                {
                                    int GLF_live20looplimiter3 = 0;
                                    if (GLF_live20looplimiter3 >= 5) {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_outlined_8(_GLF_color);
                            _GLF_color = (vec4(-9657.0930, 94.38, 840.949, 4.6) - (-398.284));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                            }
                        }
                        _GLF_color = atanh(log(mod(vec4(-30.98, -4.4, -709.979, 72.62), GLF_live3h_r)));
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    int GLF_live3msb8 = _GLF_FUZZED(37364);
                    vec2 GLF_live3position = _GLF_FUZZED((vec2(5.6, -185.515).xx * vec2(-7.7, 79.52)));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        do {
                            {
                                {
                                    ;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        } while (_GLF_WRAPPED_LOOP(false));
                        _GLF_color = vec4(8.6, 98.84, 1.1, -5214.7494);
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead17v = _GLF_FUZZED(GLF_live3i);
                            {
                                donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                    }
                    vec3 GLF_live3result = _GLF_FUZZED(vec3(234.877, -8.0, 0.6));
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            return vec3(1.0, 1.0, 1.0);
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                        vec3 GLF_live3d = _GLF_FUZZED((vec3(-97.65, 9.2, 8.6) - (-6219.3104)));
                        GLF_live3d = GLF_live3drawShape(GLF_live3position, GLF_live3center + vec2(sin(float(GLF_live3i) / (float(bitCount(GLF_live3msb8)) * 10.0) + GLF_live3time) / 4.0 * float(bitCount(GLF_live3msb8)), float(bitfieldExtract(int(GLF_live3resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live3i) / 100.0 * float(bitCount(GLF_live3msb8))), 0.01, float(GLF_live3i)));
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(3177, 97027));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    discard;
                                }
                                {
                                    donor_replacementGLF_dead16p = GLF_dead16iter(donor_replacementGLF_dead16p);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                        }
                        {
                            float GLF_live13s = _GLF_FUZZED(48.19);
                            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))), (_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0)))) || false))) {
                                return vec3(1.0, 1.0, 1.0);
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            {
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                    ;
                                }
                            }
                        }
                        if (length(GLF_live3d) <= float(bitfieldExtract(int(GLF_live3resolution.x), 0, 0))) {
                            {
                                {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            ;
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                        }
                        GLF_live3result = vec3(GLF_live3d);
                    }
                    {
                        int GLF_live14looplimiter0 = 0;
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(vec3(-3.9, -7.1, -37.21)));
                            int GLF_live22i = _GLF_FUZZED(-8059);
                            int GLF_live22j = _GLF_FUZZED(-80345);
                            vec4 GLF_live22res = _GLF_FUZZED(vec4(1470.1540, 7.3, -3544.0757, 0.9));
                            float GLF_live22uvstep = _GLF_FUZZED(4.8);
                            {
                                GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                            }
                        }
                        if (GLF_live14looplimiter0 >= 6) {
                            {
                                int GLF_live21looplimiter3 = 0;
                                if (GLF_live21looplimiter3 >= 5) {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead17v = _GLF_FUZZED(GLF_live14looplimiter0);
                                {
                                    donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            ;
                        }
                    }
                }
                return vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y);
                if (_GLF_DEAD(false)) {
                    {
                        {
                            GLF_live21_GLF_color = vec4(vec3(0.0), 1.0);
                        }
                    }
                    continue;
                }
            }
        }
    } else {
    }
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        bool GLF_live3c1 = _GLF_FUZZED((27994 > 89038));
        if (!GLF_live3c1) {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                vec2 GLF_live22coord = _GLF_FUZZED((vec2(3291.5641, -8202.0688).yy));
                int GLF_live22i = _GLF_FUZZED(-49038);
                int GLF_live22looplimiter0 = 0;
                vec4 GLF_live22res = _GLF_FUZZED(vec4(407.464, 76.76, -2088.1078, 591.168));
                float GLF_live22uvstep = _GLF_FUZZED(float(-32822));
                for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                    if (GLF_live22looplimiter0 >= 5) {
                        break;
                    }
                    GLF_live22looplimiter0++;
                    {
                        GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                    }
                }
            }
            ;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                continue;
            }
            _GLF_color = vec4(-5.5, -1379.2380, 3.8, 98.07);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                continue;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec3(1.0, 1.0, 1.0);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_merged4_0_1_4_1_1_4_2_1_6_3_1_5c_imc_reheightwidth;
                    {
                        {
                            ;
                        }
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, true && (false))));
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
}

vec4 _GLF_outlined_9(vec4 _GLF_color, float GLF_live3b_b, float GLF_live3time) {
    return clamp(_GLF_color, dFdx(GLF_live3b_b), GLF_live3time);
}

void main() {
    {
        int GLF_live14count = _GLF_FUZZED(-81501);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
            return;
        }
        int GLF_live14looplimiter0 = 0;
        int GLF_live14v = _GLF_FUZZED(94887);
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                return;
            }
            return;
        }
        while (GLF_live14v > 1) {
            if (GLF_live14looplimiter0 >= 6) {
                break;
                if (_GLF_DEAD(false)) {
                    discard;
                }
            }
            GLF_live14looplimiter0++;
            {
                if (_GLF_DEAD(false)) {
                    return;
                }
                if ((GLF_live14v & 1) == 1) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                        continue;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-99.77, 1.2, 1.0, 6.2);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                discard;
                            }
                            {
                                int GLF_live21looplimiter3 = 0;
                                uint GLF_live21matrix_number = _GLF_FUZZED(74246u);
                                for (int GLF_live21cols = 2; GLF_live21cols <= 4; GLF_live21cols++) {
                                    if (GLF_live21looplimiter3 >= 5) {
                                        break;
                                    }
                                    GLF_live21looplimiter3++;
                                    {
                                        {
                                            int GLF_live21looplimiter2 = 0;
                                            for (int GLF_live21rows = 2; GLF_live21rows <= 4; GLF_live21rows++) {
                                                if (GLF_live21looplimiter2 >= 5) {
                                                    break;
                                                }
                                                GLF_live21looplimiter2++;
                                                {
                                                    {
                                                        int GLF_live21looplimiter1 = 0;
                                                        for (int GLF_live21c = 0; GLF_live21c < GLF_live21cols; GLF_live21c++) {
                                                            if (GLF_live21looplimiter1 >= 5) {
                                                                break;
                                                            }
                                                            GLF_live21looplimiter1++;
                                                            {
                                                                {
                                                                    int GLF_live21looplimiter0 = 0;
                                                                    for (int GLF_live21r = 0; GLF_live21r < GLF_live21rows; GLF_live21r++) {
                                                                        if (GLF_live21looplimiter0 >= 5) {
                                                                            break;
                                                                        }
                                                                        GLF_live21looplimiter0++;
                                                                        {
                                                                            switch (GLF_live21matrix_number) {
                                                                                case 0u:
                                                                                    GLF_live21m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                                    break;
                                                                                case 1u:
                                                                                    GLF_live21m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                                    break;
                                                                                case 2u:
                                                                                    GLF_live21m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                                    break;
                                                                                case 3u:
                                                                                    GLF_live21m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                                    break;
                                                                                case 4u:
                                                                                    GLF_live21m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                                    break;
                                                                                case 5u:
                                                                                    GLF_live21m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                                    break;
                                                                                case 6u:
                                                                                    GLF_live21m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 2)] = GLF_live21one;
                                                                                    break;
                                                                                case 7u:
                                                                                    GLF_live21m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 3)] = GLF_live21one;
                                                                                    break;
                                                                                case 8u:
                                                                                    GLF_live21m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live21r, 4)] = GLF_live21one;
                                                                                    break;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    GLF_live21matrix_number = GLF_live21matrix_number + 1u;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        {
                            int GLF_live22looplimiter0 = 0;
                            if (GLF_live22looplimiter0 >= 5) {
                                ;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        GLF_live14v = 3 * GLF_live14v + 1;
                    } else {
                    }
                } else {
                    GLF_live14v /= 2;
                }
                GLF_live14count++;
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
        }
    }
    vec3 data[16];
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
        {
            int GLF_live20looplimiter1 = 0;
            if (GLF_live20looplimiter1 >= 5) {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        return;
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        for (int i = 0; i < 4; i++) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    break;
                }
                continue;
            }
            if (_GLF_DEAD(false)) {
                {
                    GLF_dead2_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                }
                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED((vec3(-5267.9150, 3.3, -9302.1280) * mat2x3(-6287.0309, -2572.7689, -60.41, 0.5, 8.0, 224.810)));
                            int GLF_live22i = _GLF_FUZZED(71977);
                            vec4 GLF_live22res = _GLF_FUZZED(vec4(2668.2013, 705.385, -3.7, 530.837));
                            float GLF_live22uvstep = _GLF_FUZZED(-83.46);
                            {
                                {
                                    int GLF_live22looplimiter0 = 0;
                                    for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                        if (GLF_live22looplimiter0 >= 5) {
                                            break;
                                        }
                                        GLF_live22looplimiter0++;
                                        {
                                            GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                _GLF_color = (faceforward(_GLF_color, vec4(-4006.2027, -625.230, -8.4, -4299.1787), vec4(-4.4, 2.0, -729.760, -7.0)) - ceil(vec4(-900.205, -7.6, 2958.0047, 623.712)));
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-236.181, 5.8, 1342.9748, 2051.5529);
                            }
                        }
                    }
                }
            }
            {
                {
                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(-247.810, 859.084));
                    int GLF_live22looplimiter1 = 0;
                    vec4 GLF_live22res = _GLF_FUZZED(vec4(9.0, 3.9, -532.867, 9.7));
                    float GLF_live22uvstep = _GLF_FUZZED(-17.83);
                    for (int GLF_live22i = 0; GLF_live22i < 3; GLF_live22i++) {
                        if (GLF_live22looplimiter1 >= 5) {
                            break;
                        }
                        GLF_live22looplimiter1++;
                        {
                            {
                                int GLF_live22looplimiter0 = 0;
                                for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                    if (GLF_live22looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live22looplimiter0++;
                                    {
                                        GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                    }
                                }
                            }
                        }
                    }
                }
                for (int _GLF_SPLIT_LOOP_COUNTERj = 0; _GLF_SPLIT_LOOP_COUNTERj < 2; _GLF_SPLIT_LOOP_COUNTERj++) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                            }
                        } else {
                            discard;
                        }
                    }
                    data[4 * _GLF_SPLIT_LOOP_COUNTERj + i] = mand(gl_FragCoord.x + float(i - 1), gl_FragCoord.y + float(_GLF_SPLIT_LOOP_COUNTERj - 1));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    continue;
                }
                for (int _GLF_SPLIT_LOOP_COUNTERj = 2; _GLF_SPLIT_LOOP_COUNTERj < 4; _GLF_SPLIT_LOOP_COUNTERj++) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                            {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, true, true, true))))) {
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (_GLF_color + (_GLF_color));
                                }
                                int GLF_live11i = _GLF_FUZZED(-88467);
                                int GLF_live11j = _GLF_FUZZED(((-48814) & 11341));
                                if (GLF_live11j < GLF_live11i + 1) {
                                    ;
                                }
                            }
                        } else {
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    continue;
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                _GLF_color = vec4(1148.0743, 6.6, 1986.7172, 46.21);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            discard;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            _GLF_color = dFdy(vec4(-7.4, 2.9, -50.98, 644.318));
                        } else {
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        }
                    }
                    data[4 * _GLF_SPLIT_LOOP_COUNTERj + i] = mand(gl_FragCoord.x + float(i - 1), gl_FragCoord.y + float(_GLF_SPLIT_LOOP_COUNTERj - 1));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(-6.2, 2443.1812));
                            int GLF_live22i = _GLF_FUZZED(int(182044u));
                            vec4 GLF_live22res = _GLF_FUZZED((vec4(-7.0, -675.214, -1.0, -842.806) - (-4.5)));
                            float GLF_live22uvstep = _GLF_FUZZED(vec3(431.740, 634.282, -541.781).y);
                            {
                                int GLF_live22looplimiter0 = 0;
                                for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                    if (GLF_live22looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live22looplimiter0++;
                                    {
                                        GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(-0.5, 8.0));
                            int GLF_live22i = _GLF_FUZZED((17447 ^ (-13202)));
                            int GLF_live22j = _GLF_FUZZED(ivec2(25655, -46837).t);
                            vec4 GLF_live22res = _GLF_FUZZED(vec4(8.3, 2.7, vec2(-705.156)));
                            float GLF_live22uvstep = _GLF_FUZZED(float(((-987.634) >= (-8706.2885))));
                            {
                                GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                            }
                        }
                        return;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = vec4(60.18, -8204.7840, 562.961, 911.540);
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                    break;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    discard;
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                do {
                    _GLF_color = vec4(-6.0, -3371.3971, -7.1, -52.35);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        break;
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                    continue;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                {
                    ivec3 GLF_merged3_0_1_15_1_1_22_2_1_11GLF_live14countGLF_live14looplimiter0GLF_live14v;
                    int GLF_live14count = _GLF_FUZZED(86722);
                    GLF_merged3_0_1_15_1_1_22_2_1_11GLF_live14countGLF_live14looplimiter0GLF_live14v.x = GLF_live14count;
                    if (_GLF_DEAD(false)) {
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED((mat2(16.74, 5.2, 53.13, 6.4) * vec2(-95.43, -8.9)));
                            int GLF_live22i = _GLF_FUZZED(-42870);
                            int GLF_live22looplimiter1 = 0;
                            vec4 GLF_live22res = _GLF_FUZZED(vec4(2.4, -5.0, 174.130, -7136.1857));
                            float GLF_live22uvstep = _GLF_FUZZED(458.953);
                            {
                                if (GLF_live22looplimiter1 >= 5) {
                                    ;
                                }
                                GLF_live22looplimiter1++;
                                {
                                    {
                                        int GLF_live22looplimiter0 = 0;
                                        for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                            if (GLF_live22looplimiter0 >= 5) {
                                                break;
                                            }
                                            GLF_live22looplimiter0++;
                                            {
                                                GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        _GLF_color = (GLF_dead9gl_FragCoord - GLF_dead9gl_FragCoord);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                    }
                    int GLF_live14looplimiter0 = 0;
                    GLF_merged3_0_1_15_1_1_22_2_1_11GLF_live14countGLF_live14looplimiter0GLF_live14v.y = GLF_live14looplimiter0;
                    int GLF_live14v = _GLF_FUZZED((false ? (false ? 94411 : (-32551)) : (-7315)));
                    GLF_merged3_0_1_15_1_1_22_2_1_11GLF_live14countGLF_live14looplimiter0GLF_live14v.z = GLF_live14v;
                    {
                        int GLF_live21looplimiter4 = 0;
                        if (GLF_live21looplimiter4 >= 5) {
                            ;
                        }
                    }
                    while (GLF_merged3_0_1_15_1_1_22_2_1_11GLF_live14countGLF_live14looplimiter0GLF_live14v.z > 1) {
                        {
                            int GLF_live22looplimiter1 = 0;
                            if (GLF_live22looplimiter1 >= 5) {
                                ;
                            }
                        }
                        if (GLF_merged3_0_1_15_1_1_22_2_1_11GLF_live14countGLF_live14looplimiter0GLF_live14v.y >= 6) {
                            break;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            continue;
                        }
                        GLF_merged3_0_1_15_1_1_22_2_1_11GLF_live14countGLF_live14looplimiter0GLF_live14v.y++;
                        {
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    continue;
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(8.2, -5.9, -28.62, 5.1);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                } else {
                                }
                            }
                            if ((GLF_merged3_0_1_15_1_1_22_2_1_11GLF_live14countGLF_live14looplimiter0GLF_live14v.z & 1) == 1) {
                                GLF_merged3_0_1_15_1_1_22_2_1_11GLF_live14countGLF_live14looplimiter0GLF_live14v.z = 3 * GLF_merged3_0_1_15_1_1_22_2_1_11GLF_live14countGLF_live14looplimiter0GLF_live14v.z + 1;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    continue;
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    } else {
                                        _GLF_color = unpackUnorm4x8(108340u);
                                        {
                                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(-4956.5950, 6.7));
                                            int GLF_live22i = _GLF_FUZZED(-63282);
                                            int GLF_live22looplimiter1 = 0;
                                            vec4 GLF_live22res = _GLF_FUZZED(vec4(float(137426u)));
                                            float GLF_live22uvstep = _GLF_FUZZED(-827.886);
                                            {
                                                if (GLF_live22looplimiter1 >= 5) {
                                                    ;
                                                }
                                                GLF_live22looplimiter1++;
                                                {
                                                    {
                                                        int GLF_live22looplimiter0 = 0;
                                                        for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                                            if (GLF_live22looplimiter0 >= 5) {
                                                                break;
                                                            }
                                                            GLF_live22looplimiter0++;
                                                            {
                                                                GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
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
                                }
                                GLF_merged3_0_1_15_1_1_22_2_1_11GLF_live14countGLF_live14looplimiter0GLF_live14v.z /= 2;
                            }
                            GLF_merged3_0_1_15_1_1_22_2_1_11GLF_live14countGLF_live14looplimiter0GLF_live14v.x++;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (true)))) {
                    {
                        vec4 GLF_live13c = _GLF_FUZZED(vec4(vec2(78.61, 7790.7046), (+34.82), float(-76145)));
                        int GLF_live13looplimiter1 = 0;
                        for (int GLF_live13i = 0; GLF_live13i < 3; GLF_live13i++) {
                            if (GLF_live13looplimiter1 >= 5) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            GLF_live13looplimiter1++;
                            {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                if (GLF_live13c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)] >= 1.0) {
                                    GLF_live13c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)] = GLF_live13c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)] * GLF_live13c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)];
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                        discard;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                            {
                                int GLF_live22looplimiter1 = 0;
                                if (GLF_live22looplimiter1 >= 5) {
                                    ;
                                }
                            }
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                break;
            }
        }
    } else {
    }
    vec3 sum = vec3(0.0);
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-8.9, -4.8, -6.7, -5.6);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(false)) {
                return;
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(false)) {
            {
                {
                    ;
                }
            }
            return;
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        for (int _GLF_SPLIT_LOOP_COUNTERi = 0; _GLF_SPLIT_LOOP_COUNTERi < 0; _GLF_SPLIT_LOOP_COUNTERi++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                discard;
            }
            sum += data[_GLF_SPLIT_LOOP_COUNTERi];
        }
        do {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                for (int _GLF_SPLIT_LOOP_COUNTERi = 0; _GLF_SPLIT_LOOP_COUNTERi < 16; _GLF_SPLIT_LOOP_COUNTERi++) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                        discard;
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return;
                        }
                    }
                    sum += data[_GLF_SPLIT_LOOP_COUNTERi];
                }
            } else {
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
            {
                vec2 GLF_live22coord = _GLF_FUZZED(((-17.76) + (15.39 - vec2(-783.329, 6.0))));
                int GLF_live22i = _GLF_FUZZED(17922);
                int GLF_live22looplimiter1 = 0;
                vec4 GLF_live22res = _GLF_FUZZED(vec4(vec2(84.37, 5.8), vec3(8.2, 4.0, -308.560).g, -940.043));
                float GLF_live22uvstep = _GLF_FUZZED(vec2(-869.032, -1.0).y);
                {
                    if (GLF_live22looplimiter1 >= 5) {
                        ;
                    }
                    GLF_live22looplimiter1++;
                    {
                        {
                            int GLF_live22looplimiter0 = 0;
                            for (int GLF_live22j = 0; GLF_live22j < 3; GLF_live22j++) {
                                if (GLF_live22looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live22looplimiter0++;
                                {
                                    GLF_live22res += texture(GLF_live22tex, GLF_live22coord + vec2(float(GLF_live22i - 1) * GLF_live22uvstep, float(GLF_live22j - 1) * GLF_live22uvstep)) * GLF_live22weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22i * 3 + GLF_live22j, 9)];
                                }
                            }
                        }
                    }
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
    } else {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_dead9gl_FragCoord;
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(false)) {
            return;
        }
        return;
    }
    sum /= vec3(16.0);
    if (_GLF_DEAD(false)) {
        return;
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_outlined_9(_GLF_color, GLF_live3b_b, GLF_live3time);
        }
    }
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
        {
            ;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        {
            int GLF_live22looplimiter0 = 0;
            if (GLF_live22looplimiter0 >= 5) {
                ;
            }
        }
        return;
    }
    _GLF_color = vec4(sum, 1.0);
}
