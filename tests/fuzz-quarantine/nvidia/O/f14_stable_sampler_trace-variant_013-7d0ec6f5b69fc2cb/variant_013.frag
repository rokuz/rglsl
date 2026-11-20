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

layout(set = 0, binding = 2) uniform buf2 {
    float GLF_live9one;
};

mat2 GLF_live9m22 = _GLF_FUZZED(mat2(4.1, 5.7, 800.127, -21.63));
mat2x3 GLF_live9m23 = _GLF_FUZZED((mat2x3(-30.17, 2.0, -7.0, -8385.7149, -4.0, 13.22) * 29.31));
mat2x4 GLF_live9m24 = _GLF_FUZZED(mat2x4(mat3x2(-1.7, -6.4, 1524.1897, 7.7, -386.066, 55.18)));
mat3x2 GLF_live9m32 = _GLF_FUZZED(mat3x2(mat2x3(-30.10, -1.7, -245.808, -6419.2719, 925.831, -8.4)));
mat3 GLF_live9m33 = _GLF_FUZZED((mat2x3(-9.6, -7811.0764, -0.3, 8340.4833, 3.3, 137.994) * (mat2(3390.4854, 64.55, 18.91, -6.7) * mat3x2(mat2x4(84.09, 9.7, 6037.5062, -8.8, -885.328, 90.89, 5777.1110, -8.8)))));
mat3x4 GLF_live9m34 = _GLF_FUZZED(mat3x4(598.499, 3.6, 10.01, 13.18, -3837.9625, -6402.4943, -520.956, -1686.8600, -69.18, 654.794, 9.9, 4913.4428));
mat4x2 GLF_live9m42 = _GLF_FUZZED(mat4x2(-9.4, -905.495, 7.2, 689.257, -5461.3080, 73.29, 60.44, -6.7));
mat4x3 GLF_live9m43 = _GLF_FUZZED(mat4x3(296.559, 5.1, -702.917, 63.64, -988.174, 39.71, 58.62, 7.1, -7.5, 6565.8242, -16.33, -20.86));
mat4 GLF_live9m44 = _GLF_FUZZED(mat4(-6.6, -212.635, -6761.8548, 1407.3328, -54.57, 4.0, -4.8, -71.96, -704.174, 5.9, -9.1, -4.6, -387.335, -0.7, -35.60, 8.2));
layout(set = 0, binding = 3) uniform sampler2D GLF_live10tex;
const float GLF_live10weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
vec4 GLF_live11_GLF_color = _GLF_FUZZED(vec4(-7.2, 6.9, -9445.8960, -6.4));

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_live11injectionSwitch;
};

float GLF_live11compute_derivative_x(float GLF_live11v) {
    return dFdx(GLF_live11v) * GLF_live11injectionSwitch.y;
}

float GLF_live11compute_derivative_y(float GLF_live11v) {
    return dFdy(GLF_live11v) * GLF_live11injectionSwitch.y;
}

float GLF_live11compute_stripe(float GLF_live11v) {
    return smoothstep(-.9, 1., (GLF_live11v) / ((GLF_live11injectionSwitch.y > GLF_live11injectionSwitch.x) ? GLF_live11compute_derivative_x(GLF_live11v) : GLF_live11compute_derivative_y(GLF_live11v)));
}

vec4 GLF_live7gl_FragCoord = _GLF_FUZZED(vec4(5904.9709, -782.856, -1.9, 3.1));
const int GLF_live7N = 10;
int GLF_live7data[10] = int[10](_GLF_FUZZED((-1059)), _GLF_FUZZED(-50331), _GLF_FUZZED(-30854), _GLF_FUZZED(-32949), _GLF_FUZZED(-73711), _GLF_FUZZED(-66829), _GLF_FUZZED(-15866), _GLF_FUZZED(((true ? (-94993) : 28859) & ivec3(3515, 41628, 91928)).y), _GLF_FUZZED(ivec3(-99864, -30622, -74189).s), _GLF_FUZZED(10442)), GLF_live7temp[10] = int[10](_GLF_FUZZED(-40382), _GLF_FUZZED(64441), _GLF_FUZZED(ivec4(39238, 75413, 28917, 72246).s), _GLF_FUZZED(ivec3(-36553, -67695, 14065).t), _GLF_FUZZED(-2467), _GLF_FUZZED(-1792), _GLF_FUZZED(92405), _GLF_FUZZED(-86028), _GLF_FUZZED(28957), _GLF_FUZZED(89924));

void GLF_live7merge(int GLF_live7from, int GLF_live7mid, int GLF_live7to) {
    int GLF_live7k = GLF_live7from, GLF_live7i = GLF_live7from, GLF_live7j = GLF_live7mid + 1;
    {
        int GLF_live7looplimiter0 = 0;
        if (_GLF_DEAD(false)) {
            return;
        }
        while (GLF_live7i <= GLF_live7mid && GLF_live7j <= GLF_live7to) {
            if (GLF_live7looplimiter0 >= 4) {
                break;
            }
            GLF_live7looplimiter0++;
            {
                if (GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] < GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7j, 10)]) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    GLF_live7temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7k++, 10)] = GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i++, 10)];
                } else {
                    GLF_live7temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7k++, 10)] = GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live7looplimiter1 = 0;
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return;
            }
            int GLF_live8iteration = _GLF_FUZZED(32099);
            {
                ;
            }
        }
        while (GLF_live7i < GLF_live7N && GLF_live7i <= GLF_live7mid) {
            if (GLF_live7looplimiter1 >= 4) {
                break;
            }
            GLF_live7looplimiter1++;
            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                break;
            }
            {
                GLF_live7temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7k++, 10)] = GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i++, 10)];
                if (_GLF_DEAD(false)) {
                    continue;
                }
            }
            {
                int GLF_live10looplimiter0 = 0;
                if (GLF_live10looplimiter0 >= 4) {
                    ;
                }
            }
        }
    }
    {
        int GLF_live7looplimiter2 = 0;
        for (int GLF_live7i = GLF_live7from; GLF_live7i <= GLF_live7to; GLF_live7i++) {
            if (GLF_live7looplimiter2 >= 4) {
                break;
                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                    continue;
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                GLF_live7looplimiter2++;
            }
            {
                GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = GLF_live7temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)];
                if (_GLF_DEAD(false)) {
                    break;
                }
            }
            {
                vec3 GLF_live11col = _GLF_FUZZED((+vec4(-718.161, -187.434, -8.4, 92.97).pts));
                vec2 GLF_live11uv = _GLF_FUZZED(vec2(-2.2, 3621.7218));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
                {
                    float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0));
                    GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        continue;
                    }
                    GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                    ;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
            }
        }
        {
            int GLF_live9c = _GLF_FUZZED(-46393);
            int GLF_live9looplimiter0 = 0;
            uint GLF_live9matrix_number = _GLF_FUZZED((+(83270u - (9372u + 13052u))));
            int GLF_live9rows = _GLF_FUZZED(-63299);
            for (int GLF_live9r = 0; GLF_live9r < GLF_live9rows; GLF_live9r++) {
                if (GLF_live9looplimiter0 >= 5) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    break;
                }
                GLF_live9looplimiter0++;
                {
                    switch (GLF_live9matrix_number) {
                        case 0u:
                            GLF_live9m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                            break;
                        case 1u:
                            GLF_live9m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                            break;
                        case 2u:
                            GLF_live9m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                            break;
                        case 3u:
                            GLF_live9m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                            break;
                        case 4u:
                            GLF_live9m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                discard;
                            }
                        case 5u:
                            GLF_live9m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                            break;
                        case 6u:
                            GLF_live9m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                            break;
                        case 7u:
                            GLF_live9m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                            break;
                        case 8u:
                            GLF_live9m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                            break;
                    }
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
            }
        }
    }
}

const int GLF_live6dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
vec4 GLF_live4_GLF_color = _GLF_FUZZED((-vec4(6.3, 770.094, -4.9, -7744.4513)));
vec4 GLF_live3_GLF_color = _GLF_FUZZED(vec4(vec2(-3.4, -683.441), vec2(-67.06, 35.26)));
int GLF_live0map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
layout(location = 0) out vec4 _GLF_color;
layout(set = 0, binding = 0) uniform sampler2D tex;

void main() {
    int i = 0;
    vec2 uvstep = vec2(1.0) * (1.0 / 256.0);
    float slope = 2.0 / 256.0;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (vec4(-34.19, -0.2, 210.716, 6.5) * 4.2);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        return;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-8.8, -1619.8414, 972.671, -360.496);
            {
                {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            vec2 GLF_live10coord = _GLF_FUZZED(vec2(-4.7, -8.9));
                            int GLF_live10looplimiter1 = 0;
                            vec4 GLF_live10res = _GLF_FUZZED(vec4(85.41, -0.1, 5538.1979, -41.76));
                            float GLF_live10uvstep = _GLF_FUZZED((+float(false)));
                            for (int GLF_live10i = 0; GLF_live10i < 3; GLF_live10i++) {
                                if (GLF_live10looplimiter1 >= 4) {
                                    break;
                                }
                                GLF_live10looplimiter1++;
                                {
                                    {
                                        int GLF_live10looplimiter0 = 0;
                                        for (int GLF_live10j = 0; GLF_live10j < 3; GLF_live10j++) {
                                            if (GLF_live10looplimiter0 >= 4) {
                                                break;
                                            }
                                            GLF_live10looplimiter0++;
                                            {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = ldexp(smoothstep(7.8, 8.2, vec4(-8.1, -67.37, 755.196, 5.7)), (ivec4(-65121, -98402, 37092, -23196) ^ ivec4(42474, 88428, 49418, -64078)));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                GLF_live10res += texture(GLF_live10tex, GLF_live10coord + vec2(float(GLF_live10i - 1) * GLF_live10uvstep, float(GLF_live10j - 1) * GLF_live10uvstep)) * GLF_live10weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i * 3 + GLF_live10j, 9)];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        GLF_live4_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    } else {
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    bool GLF_live11c1 = _GLF_FUZZED(true);
                    bool GLF_live11c2 = _GLF_FUZZED(true);
                    vec3 GLF_live11col = _GLF_FUZZED(vec3(-1.0, 4.5, -9.5));
                    vec2 GLF_live11uv = _GLF_FUZZED(vec2(-7.5, -9627.2407));
                    if (!GLF_live11c1 && GLF_live11c2) {
                        float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0));
                        GLF_live11col = mix(vec3(0.5, GLF_live11uv.x, 0.1), vec3(.4, 0, .5), GLF_live11stripe);
                        GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                        ;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-2217.6934, -515.443, -72.34, 4.5);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        vec3 GLF_live11col = _GLF_FUZZED((mat2x3(-4.9, -6.8, 386.894, 0.6, 2004.6099, 0.1) * (-vec2(86.05, -4118.1403))));
        vec2 GLF_live11uv = _GLF_FUZZED(vec3(1.5, 1720.1669, -8157.3744).xz);
        {
            float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0));
            GLF_live11col = mix(vec3(GLF_live11uv.x, 0, 0.75), vec3(.8, .7, GLF_live11uv.x), GLF_live11stripe);
            GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
            ;
        }
    }
    vec2 coord = gl_FragCoord.xy * (1.0 / 256.0);
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
            {
                vec3 GLF_live11col = _GLF_FUZZED((vec2(-6.9, 115.115) * mat3x2(-1801.1317, -74.63, -92.70, 80.79, 40.36, 1.6)));
                vec2 GLF_live11uv = _GLF_FUZZED(vec2(-9.1, -9.5));
                {
                    float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0));
                    GLF_live11col = mix(vec3(GLF_live11uv.x, .8, 0), vec3(1, GLF_live11uv.y, 0), GLF_live11stripe);
                    GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                    ;
                }
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        {
            {
                ;
            }
        }
        {
            ivec2 GLF_live6pos = _GLF_FUZZED(ivec2(37297, -78741));
            {
                float GLF_live8c_im = _GLF_FUZZED(vec2(6.3, 2.6).g);
                float GLF_live8c_re = _GLF_FUZZED((((+47.01) - 3449.1717) * (-6.6)));
                if (_GLF_DEAD(false)) {
                    return;
                }
                int GLF_live8iteration = _GLF_FUZZED(((-(true ? (-73034) : 90465)) ^ ((-95982) | (-92967))));
                int GLF_live8looplimiter0 = 0;
                float GLF_live8x = _GLF_FUZZED(-8.1);
                float GLF_live8y = _GLF_FUZZED((+10.89));
                {
                    if (GLF_live8looplimiter0 >= 4) {
                        ;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(47.88, 1.5, -2415.1837, -517.457);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    GLF_live8looplimiter0++;
                    {
                        if (GLF_live8x * GLF_live8x + GLF_live8y * GLF_live8y > 4.0) {
                            ;
                        }
                        float GLF_live8x_new = GLF_live8x * GLF_live8x - GLF_live8y * GLF_live8y + GLF_live8c_re;
                        GLF_live8y = 2.0 * GLF_live8x * GLF_live8y + GLF_live8c_im;
                        GLF_live8x = GLF_live8x_new;
                        GLF_live8iteration++;
                    }
                }
            }
            {
                {
                    vec3 GLF_live11col = _GLF_FUZZED(vec3(8150.1367, -2.2, -64.52));
                    vec2 GLF_live11uv = _GLF_FUZZED((59.47 * vec4(-4.7, 6.2, 4.2, -1.2)).sq);
                    {
                        float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0));
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        GLF_live11col = mix(vec3(GLF_live11uv.x, 0, 0.75), vec3(.8, .7, GLF_live11uv.x), GLF_live11stripe);
                        GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))))))) {
                    return;
                }
                if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                    float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    {
                        float GLF_live8xCoord = _GLF_FUZZED(4.8);
                        float GLF_live8yCoord = _GLF_FUZZED(vec3(1692.6437, -3.2, 34.23).x);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-9.8, 8.0, -3.9, -2.1);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            ;
                        }
                    }
                    ;
                }
                {
                    int GLF_live9cols = _GLF_FUZZED(ivec3(3644, 25734, 16905).s);
                    uint GLF_live9matrix_number = _GLF_FUZZED((22756u ^ 189597u));
                    int GLF_live9rows = _GLF_FUZZED((+(-31054)));
                    {
                        int GLF_live9looplimiter1 = 0;
                        for (int GLF_live9c = 0; GLF_live9c < GLF_live9cols; GLF_live9c++) {
                            if (GLF_live9looplimiter1 >= 5) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(2.9, -3.7, -8.8, 7.2);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                break;
                            }
                            GLF_live9looplimiter1++;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                            }
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(fma(floor(20.70), (-354.890), fract(-34.07)), abs(trunc(vec3(-415.158, -4.5, 10.02))));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    int GLF_live9looplimiter0 = 0;
                                    for (int GLF_live9r = 0; GLF_live9r < GLF_live9rows; GLF_live9r++) {
                                        if (GLF_live9looplimiter0 >= 5) {
                                            break;
                                        }
                                        GLF_live9looplimiter0++;
                                        {
                                            switch (GLF_live9matrix_number) {
                                                case 0u:
                                                    GLF_live9m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    break;
                                                case 1u:
                                                    GLF_live9m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                                                    break;
                                                case 2u:
                                                    GLF_live9m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                                                    break;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = sinh(mix(vec4(1.5, -4.1, 8.0, 0.5), fwidthCoarse(vec4(350.539, 6.1, -4891.5234, 6118.0252)), bvec4(true, false, false, false)));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                case 3u:
                                                    GLF_live9m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                                                    break;
                                                case 4u:
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    GLF_live9m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                                                    break;
                                                case 5u:
                                                    GLF_live9m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                                                    break;
                                                case 6u:
                                                    GLF_live9m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                                                    break;
                                                case 7u:
                                                    GLF_live9m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                                                    break;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        return;
                                                    }
                                                case 8u:
                                                    GLF_live9m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                GLF_live6pos.y++;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                    return;
                }
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
            {
                float GLF_live8x = _GLF_FUZZED((-2895.2184));
                float GLF_live8y = _GLF_FUZZED(3.3);
                if (GLF_live8x * GLF_live8x + GLF_live8y * GLF_live8y > 4.0) {
                    ;
                }
            }
        }
        _GLF_color = vec4(-8262.8305, -7.9, 8.7, 3846.5641);
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat2(0.0, 1.0, abs(0.0), 0.0)))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    float refh = texture(tex, coord).y;
    coord -= uvstep;
    do {
        {
            {
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    discard;
                }
            }
        }
        refh += slope;
    } while (_GLF_WRAPPED_LOOP(false));
    {
        vec2 GLF_live10coord = _GLF_FUZZED(vec2(24.62, -2523.2495));
        int GLF_live10i = _GLF_FUZZED(91085);
        int GLF_live10looplimiter1 = 0;
        vec4 GLF_live10res = _GLF_FUZZED(vec4(-874.806, -8365.9041, 289.516, 804.185));
        float GLF_live10uvstep = _GLF_FUZZED(vec2(-56.63, -3.8).t);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
        {
            if (GLF_live10looplimiter1 >= 4) {
                ;
            }
            GLF_live10looplimiter1++;
            {
                {
                    int GLF_live10looplimiter0 = 0;
                    for (int GLF_live10j = 0; GLF_live10j < 3; GLF_live10j++) {
                        if (GLF_live10looplimiter0 >= 4) {
                            break;
                        }
                        GLF_live10looplimiter0++;
                        {
                            GLF_live10res += texture(GLF_live10tex, GLF_live10coord + vec2(float(GLF_live10i - 1) * GLF_live10uvstep, float(GLF_live10j - 1) * GLF_live10uvstep)) * GLF_live10weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i * 3 + GLF_live10j, 9)];
                        }
                    }
                }
            }
        }
    }
    float h = texture(tex, coord).y;
    {
        switch (_GLF_SWITCH(int(_GLF_ZERO(0.0, injectionSwitch.x)))) {
            case 58:
                if (_GLF_DEAD(false)) {
                    return;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(vec3(-6.1, -5912.6072, -722.885), dFdyFine(2.0));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                {
                    ivec2 _GLF_SWITCH_1_0v;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    {
                        int GLF_live7high = _GLF_FUZZED((~((-75699) | (+(-85871)))));
                        {
                            int GLF_live9cols = _GLF_FUZZED(-86504);
                            int GLF_live9looplimiter2 = 0;
                            uint GLF_live9matrix_number = _GLF_FUZZED(117289u);
                            for (int GLF_live9rows = 2; GLF_live9rows <= 4; GLF_live9rows++) {
                                if (GLF_live9looplimiter2 >= 5) {
                                    break;
                                }
                                GLF_live9looplimiter2++;
                                {
                                    {
                                        int GLF_live9looplimiter1 = 0;
                                        for (int GLF_live9c = 0; GLF_live9c < GLF_live9cols; GLF_live9c++) {
                                            if (GLF_live9looplimiter1 >= 5) {
                                                break;
                                            }
                                            GLF_live9looplimiter1++;
                                            {
                                                {
                                                    int GLF_live9looplimiter0 = 0;
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    for (int GLF_live9r = 0; GLF_live9r < GLF_live9rows; GLF_live9r++) {
                                                        if (GLF_live9looplimiter0 >= 5) {
                                                            break;
                                                        }
                                                        GLF_live9looplimiter0++;
                                                        {
                                                            switch (GLF_live9matrix_number) {
                                                                case 0u:
                                                                    GLF_live9m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                                                                    break;
                                                                case 1u:
                                                                    GLF_live9m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                                                                    break;
                                                                case 2u:
                                                                    GLF_live9m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_live9m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_live9m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                                                                    break;
                                                                case 5u:
                                                                    GLF_live9m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_live9m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                                                                    break;
                                                                case 7u:
                                                                    GLF_live9m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                                                                    break;
                                                                case 8u:
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                        discard;
                                                                    }
                                                                    GLF_live9m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                                                                    break;
                                                                    if (_GLF_DEAD(false)) {
                                                                        discard;
                                                                    }
                                                            }
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-8838.8792, 8.6, 6372.5373, -901.545);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(4776.4281, -497.173, -376.709, -97.11);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(determinant((mat3(-4.8, 543.602, -8686.5275, 99.57, 3.1, 8.4, 298.404, -19.79, 4.5) * mat3(-9.0, 31.03, 450.373, 7.2, -7.5, -3.1, 215.926, -8.7, -8.2))), (vec3(-8.1, 6.1, -538.255) - 8.8));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    GLF_live9matrix_number = GLF_live9matrix_number + 1u;
                                }
                            }
                        }
                        int GLF_live7i = _GLF_FUZZED((ivec3(72366, -53418, 67085) ^ ivec3(69974, 36697, 9641)).p);
                        {
                            int GLF_live10looplimiter0 = 0;
                            if (GLF_live10looplimiter0 >= 4) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))))))) {
                                    return;
                                }
                                ;
                            }
                        }
                        int GLF_live7m = _GLF_FUZZED(int((true || true)));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-3641.9371, 763.331, -2361.2844, -1259.5698);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        {
                            int GLF_live7from = GLF_live7i;
                            int GLF_live7mid = GLF_live7i + GLF_live7m - 1;
                            int GLF_live7to = min(GLF_live7i + 2 * GLF_live7m - 1, GLF_live7high);
                            GLF_live7merge(GLF_live7from, GLF_live7mid, GLF_live7to);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    while (false) {
                        {
                            bool GLF_live11c1 = _GLF_FUZZED((uvec3(110810u, 108944u, 146176u) == uvec3(123598u, 103528u, 22312u)));
                            vec3 GLF_live11col = _GLF_FUZZED(vec3(-0.2, 8.0, 4.7));
                            vec2 GLF_live11uv = _GLF_FUZZED(vec2(-795.258, -42.95));
                            if (GLF_live11c1) {
                                float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0));
                                GLF_live11col = mix(vec3(GLF_live11uv.x, 0, 0.75), vec3(.8, .7, GLF_live11uv.x), GLF_live11stripe);
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                                ;
                            }
                        }
                        while ((mat3x4(mat2x3(165.446, 9.5, -2.3, 4.5, 7.9, 2845.9740)) == mat3x4(1.1, -5.6, -3332.3268, 56.00, -365.092, 56.57, -4.2, 1928.3506, -8.8, 925.378, -59.59, -1.7))) {
                            if (true) {
                                {
                                    int GLF_live7looplimiter1 = 0;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(429.088, -352.174, 7349.1366, 22.96);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (GLF_live7looplimiter1 >= 4) {
                                        ;
                                    }
                                }
                                bvec4(false, true, true, true);
                                for (mat3x4(0.3, 89.56, 0.7, 685.904, 2850.7649, 30.80, -9082.8735, 2.7, -5814.9224, 1.0, 7.1, 51.66); (uvec4(8072u, 154130u, 114468u, 16819u)[0] >= min(21083u, 53863u)); (ivec4(48171, 19107, -2343, 86643) - ivec4(77736, 56847, 68021, -76459))) {
                                    bvec4(true, true, true, true);
                                    continue;
                                }
                                false;
                                break;
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    (refh - mat3x2(-6.6, -7.5, 18.07, -5046.5014, 6.0, 47.48));
                                }
                                if (false) {
                                    dFdxCoarse(injectionSwitch);
                                    mat3x2 _GLF_SWITCH_1_1v, _GLF_SWITCH_1_2v, _GLF_SWITCH_1_3v;
                                }
                                while ((reflect(_GLF_color, _GLF_color) != GLF_live3_GLF_color)) {
                                    bvec2 _GLF_SWITCH_1_4v[17], _GLF_SWITCH_1_5v, _GLF_SWITCH_1_6v;
                                    (ivec3(-12805, 84960, -41682) << ivec3(-16276, 73933, 22707));
                                }
                                continue;
                                mat4(1.6, -3.7, -8324.9123, 81.14, -611.026, 3.5, -9772.1750, 6.0, -9.7, -2.2, -7064.6335, -4251.5558, 18.49, -6.0, 1.5, -21.52);
                            }
                            for (coord; false; (mat4x3(2.9, -7.0, 45.95, 64.37, 2248.2093, -407.267, 821.835, -7623.6892, -0.9, -9.4, 6.0, -53.27) == mat4x3(-316.659, 91.32, -815.092, 105.615, 2.1, -22.43, -6.9, -496.472, 6.5, -3.5, -14.36, 8806.4982))) {
                                continue;
                                {
                                    mat2 _GLF_SWITCH_1_7v[77], _GLF_SWITCH_1_8v, _GLF_SWITCH_1_9v;
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    ivec3(49808, -95277, -61031).rr;
                                    break;
                                    bvec3 _GLF_SWITCH_1_10v[21], _GLF_SWITCH_1_11v, _GLF_SWITCH_1_12v;
                                    mat4(-425.164, 0.4, 937.152, 1.1, -0.3, 27.12, -828.606, -1905.4179, -5.9, -3.1, -74.42, -44.48, -6837.2964, -2.0, -638.668, 9166.9119);
                                }
                                (+mat2x4(0.0, -1344.6163, 0.5, -1972.0599, 9.0, 91.85, -2.7, -0.0));
                                {
                                    {
                                        ;
                                    }
                                }
                                mat3(-376.707, -40.76, -7451.0011, 5.1, -0.7, 7653.2966, -9.2, -7966.9877, -69.40);
                                while (isnan(h)) {
                                    {
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        float GLF_live4pab = _GLF_FUZZED(-4114.9949);
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        {
                                            int GLF_live9looplimiter1 = 0;
                                            if (GLF_live9looplimiter1 >= 5) {
                                                ;
                                            }
                                        }
                                        float GLF_live4pca = _GLF_FUZZED(19.77);
                                        if (!((GLF_live4pab < 0.0 && GLF_live4pca < 0.0) || (GLF_live4pab >= 0.0 && GLF_live4pca >= 0.0))) {
                                            do {
                                                {
                                                    ;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            ;
                                        }
                                    }
                                    ivec4 _GLF_SWITCH_1_13v[6], _GLF_SWITCH_1_14v[31];
                                    ivec4(14128, -14253, -53601, 90316);
                                    return;
                                    ;
                                    {
                                        int GLF_live7high = _GLF_FUZZED(67944);
                                        int GLF_live7looplimiter4 = 0;
                                        int GLF_live7low = _GLF_FUZZED(-57137);
                                        for (int GLF_live7m = 1; GLF_live7m <= GLF_live7high; GLF_live7m = 2 * GLF_live7m) {
                                            if (GLF_live7looplimiter4 >= 4) {
                                                break;
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            }
                                            GLF_live7looplimiter4++;
                                            {
                                                {
                                                    int GLF_live7looplimiter3 = 0;
                                                    for (int GLF_live7i = GLF_live7low; GLF_live7i < GLF_live7high; GLF_live7i += 2 * GLF_live7m) {
                                                        if (GLF_live7looplimiter3 >= 4) {
                                                            break;
                                                        }
                                                        GLF_live7looplimiter3++;
                                                        {
                                                            int GLF_live7from = GLF_live7i;
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = vec4(15.55, -9.3, 9.5, 659.105);
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                    return;
                                                                }
                                                            }
                                                            int GLF_live7mid = GLF_live7i + GLF_live7m - 1;
                                                            int GLF_live7to = min(GLF_live7i + 2 * GLF_live7m - 1, GLF_live7high);
                                                            GLF_live7merge(GLF_live7from, GLF_live7mid, GLF_live7to);
                                                        }
                                                        {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-6.3, -644.064, -67.31, -6.0);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            int GLF_live9looplimiter3 = 0;
                                                            if (GLF_live9looplimiter3 >= 5) {
                                                                ;
                                                            }
                                                        }
                                                    }
                                                }
                                                {
                                                    vec2 GLF_live10coord = _GLF_FUZZED((true ? vec2(-79.63, -8261.0175) : (vec4(-7.6, -8.8, -8723.8281, 3.4) * mat2x4(9.3, 3014.5170, 36.34, -9170.7743, 5.1, 7.5, 19.88, -5.4))));
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-85.28, 9994.7159, 93.43, 986.934);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat2(0.0, 1.0, 0.0, 0.0)))))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    int GLF_live10i = _GLF_FUZZED(6015);
                                                    int GLF_live10j = _GLF_FUZZED(69792);
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(158.812, 984.545, -30.54, -184.374);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (true)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    vec4 GLF_live10res = _GLF_FUZZED(vec4(7.1, 0.6, -4637.5691, -92.14));
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                        break;
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(7.0, -2.1, -0.5, 278.885);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    float GLF_live10uvstep = _GLF_FUZZED(((-5791.3568) * (false ? 9.4 : (-9861.2491))));
                                                    do {
                                                        GLF_live10res += texture(GLF_live10tex, GLF_live10coord + vec2(float(GLF_live10i - 1) * GLF_live10uvstep, float(GLF_live10j - 1) * GLF_live10uvstep)) * GLF_live10weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i * 3 + GLF_live10j, 9)];
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                            }
                                        }
                                    }
                                    mat3x2(-2.3, -928.101, 820.922, -2.7, 8.3, -4.3);
                                }
                                {
                                    ivec2 GLF_live6pos = _GLF_FUZZED((ivec2(-15640, 67958) ^ ivec2(ivec3(64671, -92053, -50364))));
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(vec3(-638.367, -7.4, 3.7), 456.674);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    {
                                        int GLF_live6looplimiter0 = 0;
                                        while (GLF_live6pos.y != 256) {
                                            if (GLF_live6looplimiter0 >= 4) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    discard;
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(7918.5370, 4.7, 2845.9585, -1.4);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                break;
                                            }
                                            GLF_live6looplimiter0++;
                                            {
                                                if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                                    float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                                    ;
                                                }
                                                GLF_live6pos.y++;
                                            }
                                        }
                                        {
                                            vec2 GLF_live10coord = _GLF_FUZZED(vec2(-729.979, 639.881));
                                            int GLF_live10i = _GLF_FUZZED(88552);
                                            int GLF_live10looplimiter1 = 0;
                                            vec4 GLF_live10res = _GLF_FUZZED(vec4(-3036.0916, -7967.4363, -4.1, 44.01));
                                            float GLF_live10uvstep = _GLF_FUZZED(float((81067u == 171070u)));
                                            {
                                                if (GLF_live10looplimiter1 >= 4) {
                                                    ;
                                                }
                                                GLF_live10looplimiter1++;
                                                {
                                                    {
                                                        int GLF_live10looplimiter0 = 0;
                                                        for (int GLF_live10j = 0; GLF_live10j < 3; GLF_live10j++) {
                                                            if (GLF_live10looplimiter0 >= 4) {
                                                                break;
                                                            }
                                                            GLF_live10looplimiter0++;
                                                            {
                                                                GLF_live10res += texture(GLF_live10tex, GLF_live10coord + vec2(float(GLF_live10i - 1) * GLF_live10uvstep, float(GLF_live10j - 1) * GLF_live10uvstep)) * GLF_live10weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i * 3 + GLF_live10j, 9)];
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        ;
                    }
                    discard;
                    {
                        int GLF_live9looplimiter4 = 0;
                        if (GLF_live9looplimiter4 >= 5) {
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    mat3x4(7989.6772, 498.592, 4.3, 88.67, 6.9, 62.13, -199.219, -8943.8405, 2174.0654, -3758.5583, -6.9, 18.94);
                }
            case 0:
            case 37:
            case 8:
                vec4 _GLF_outVarBackup_GLF_color;
            case 34:
            case 64:
                {
                    int GLF_live0d = _GLF_FUZZED(35663);
                    ivec2 GLF_live0p = _GLF_FUZZED((-ivec2(-93074, 21970)));
                    {
                        GLF_live0d--;
                        GLF_live0map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live0p.x) + (GLF_live0p.y) * 16, 256)] = 1;
                        GLF_live0map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live0p.x + 1) + (GLF_live0p.y) * 16, 256)] = 1;
                        {
                            {
                                GLF_live4_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            }
                        }
                        GLF_live0map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live0p.x + 2) + (GLF_live0p.y) * 16, 256)] = 1;
                        GLF_live0p.x += 2;
                    }
                    {
                        float GLF_live4pab = _GLF_FUZZED(0.2);
                        float GLF_live4pbc = _GLF_FUZZED((3.8 * 29.80));
                        {
                            vec2 GLF_live10coord = _GLF_FUZZED(((-1.7) - vec2(0.0, -93.07)));
                            int GLF_live10i = _GLF_FUZZED(-74749);
                            int GLF_live10looplimiter0 = 0;
                            vec4 GLF_live10res = _GLF_FUZZED((false ? vec4(42.69, 8.8, -266.348, -962.898) : vec4(-6.3, 177.811, 5879.9129, -83.54)));
                            float GLF_live10uvstep = _GLF_FUZZED((+(-574.554)));
                            for (int GLF_live10j = 0; GLF_live10j < 3; GLF_live10j++) {
                                if (GLF_live10looplimiter0 >= 4) {
                                    break;
                                }
                                GLF_live10looplimiter0++;
                                {
                                    GLF_live10res += texture(GLF_live10tex, GLF_live10coord + vec2(float(GLF_live10i - 1) * GLF_live10uvstep, float(GLF_live10j - 1) * GLF_live10uvstep)) * GLF_live10weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i * 3 + GLF_live10j, 9)];
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        continue;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                return;
                            }
                        }
                        if (!((GLF_live4pab < 0.0 && GLF_live4pbc < 0.0) || (GLF_live4pab >= 0.0 && GLF_live4pbc >= 0.0))) {
                            ;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(5416.2887, 5.3, -42.40, -39.75);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-2.8, 175.616, -748.294, -0.6);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                }
            case 83:
                {
                    int GLF_live8looplimiter1 = 0;
                    if (GLF_live8looplimiter1 >= 4) {
                        ;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                {
                    bool GLF_live11c1 = _GLF_FUZZED((ivec2(2115, 4545) != ivec2(22495, -72679)));
                    vec3 GLF_live11col = _GLF_FUZZED((vec3(-6449.2692, -5.7, -87.21) * vec3(2959.3316, 704.521, -2228.2869)));
                    vec2 GLF_live11uv = _GLF_FUZZED(vec2(-880.571, -5.7));
                    if (GLF_live11c1) {
                        float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0));
                        GLF_live11col = mix(vec3(GLF_live11uv.x, 0, 0.75), vec3(.8, .7, GLF_live11uv.x), GLF_live11stripe);
                        do {
                            GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                        } while (_GLF_WRAPPED_LOOP(false));
                        ;
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                _GLF_color = vec4(809.118, -21.44, 1.7, 5450.9078);
                {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    float GLF_live7grey = _GLF_FUZZED(-9.7);
                    if (int(GLF_live7gl_FragCoord[1]) < 120) {
                        {
                            int GLF_live10looplimiter0 = 0;
                            if (GLF_live10looplimiter0 >= 4) {
                                ;
                            }
                        }
                        GLF_live7grey = 0.5 + float(GLF_live7data[3]) / 10.0;
                    } else {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-167.120, 8458.2820, 7.3, -7.9);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (int(GLF_live7gl_FragCoord[1]) < 150) {
                            ;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        } else {
                            if (int(GLF_live7gl_FragCoord[1]) < 180) {
                                GLF_live7grey = 0.5 + float(GLF_live7data[5]) / 10.0;
                                {
                                    vec2 GLF_live10coord = _GLF_FUZZED((vec2(87.64, -6689.7643) - vec2(-615.791, -4.6)));
                                    int GLF_live10i = _GLF_FUZZED(((-24618) + (+79881)));
                                    vec4 GLF_live10res = _GLF_FUZZED(vec4(-12.31, 2145.6452, -47.17, 567.632));
                                    float GLF_live10uvstep = _GLF_FUZZED(-901.233);
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            return;
                                        }
                                        {
                                            int GLF_live10looplimiter0 = 0;
                                            for (int GLF_live10j = 0; GLF_live10j < 3; GLF_live10j++) {
                                                if (GLF_live10looplimiter0 >= 4) {
                                                    break;
                                                }
                                                GLF_live10looplimiter0++;
                                                {
                                                    GLF_live10res += texture(GLF_live10tex, GLF_live10coord + vec2(float(GLF_live10i - 1) * GLF_live10uvstep, float(GLF_live10j - 1) * GLF_live10uvstep)) * GLF_live10weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i * 3 + GLF_live10j, 9)];
                                                }
                                            }
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(3.8, -9778.3567, -876.184, -58.18);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            } else {
                                if (int(GLF_live7gl_FragCoord[1]) < 210) {
                                    GLF_live7grey = 0.5 + float(GLF_live7data[6]) / 10.0;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-6633.5437, 78.47, 46.73, -6.3);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                } else {
                                    if (int(GLF_live7gl_FragCoord[1]) < 240) {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        GLF_live7grey = 0.5 + float(GLF_live7data[7]) / 10.0;
                                    } else {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = (vec4(988.135, 24.78, -454.665, -3776.7390) + vec4(-146.097, -663.321, -8.4, -7483.8886));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        do {
                                            if (int(GLF_live7gl_FragCoord[1]) < 270) {
                                                do {
                                                    GLF_live7grey = 0.5 + float(GLF_live7data[8]) / 10.0;
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                            } else {
                                                ;
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        return;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    {
                        ivec2 GLF_live6pos = _GLF_FUZZED((~ivec2(-48448, 82345)));
                        {
                            {
                                vec3 GLF_live11col = _GLF_FUZZED((vec2(843.638, -9930.3403) * (mat3x2(5.4, -5.0, -1.4, -846.225, 68.30, 325.098) * mat3(61.06, -566.731, 5.1, -8.2, 1065.3983, -729.496, -2.7, -3.8, 6.9))));
                                vec2 GLF_live11uv = _GLF_FUZZED(vec2(-652.059, -830.539));
                                {
                                    float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0));
                                    GLF_live11col = mix(vec3(GLF_live11uv.x, .8, 0), vec3(1, GLF_live11uv.y, 0), GLF_live11stripe);
                                    GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                                    ;
                                }
                            }
                            float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                            ;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-195.276, 16.19, -8.0, -772.376);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        return;
                    }
                    switch (_GLF_SWITCH(0)) {
                        case 5:
                            uvec2 _GLF_SWITCH_0_0v[68];
                        case 31:
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            {
                                int GLF_live1looplimiter1 = 0;
                                if (GLF_live1looplimiter1 >= 5) {
                                    {
                                        float GLF_live4pab = _GLF_FUZZED(1.1);
                                        float GLF_live4pbc = _GLF_FUZZED((5.6 - 43.90));
                                        if (!((GLF_live4pab < 0.0 && GLF_live4pbc < 0.0) || (GLF_live4pab >= 0.0 && GLF_live4pbc >= 0.0))) {
                                            ;
                                        }
                                        {
                                            vec2 GLF_live10coord = _GLF_FUZZED(vec2(0.6, 0.6));
                                            int GLF_live10i = _GLF_FUZZED(-45761);
                                            int GLF_live10looplimiter0 = 0;
                                            vec4 GLF_live10res = _GLF_FUZZED(vec4(674.176, 571.483, 9.8, 85.07));
                                            float GLF_live10uvstep = _GLF_FUZZED(-5351.8643);
                                            for (int GLF_live10j = 0; GLF_live10j < 3; GLF_live10j++) {
                                                if (GLF_live10looplimiter0 >= 4) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        break;
                                                    }
                                                    break;
                                                }
                                                GLF_live10looplimiter0++;
                                                {
                                                    GLF_live10res += texture(GLF_live10tex, GLF_live10coord + vec2(float(GLF_live10i - 1) * GLF_live10uvstep, float(GLF_live10j - 1) * GLF_live10uvstep)) * GLF_live10weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i * 3 + GLF_live10j, 9)];
                                                }
                                            }
                                        }
                                    }
                                    ;
                                }
                            }
                            for (mat4x2 _GLF_SWITCH_0_1v[27], _GLF_SWITCH_0_2v; all(greaterThan(ivec2(68746, 55442), ivec2(70651, 6300))); mat2(2.8, -7.7, -405.175, -879.815)) {
                            }
                        case 0:
                            {
                                bool GLF_live11c1 = _GLF_FUZZED((uint(false) != 146064u));
                                bool GLF_live11c2 = _GLF_FUZZED(((-4726) >= 67735));
                                bool GLF_live11c3 = _GLF_FUZZED(true);
                                vec3 GLF_live11col = _GLF_FUZZED((mat3(75.53, -6.9, -8241.9917, 52.94, -64.07, 0.6, 340.647, -3.6, -9415.2197) * (vec4(-4.9, -9.1, 4.7, 355.079) * mat3x4(-34.30, 9.5, 205.769, 51.20, 60.22, -950.856, -163.441, 88.26, -0.5, 457.292, -5.6, -33.81))));
                                vec2 GLF_live11uv = _GLF_FUZZED(vec2(1.5, 5.2));
                                if (!GLF_live11c1 && !GLF_live11c2 && GLF_live11c3) {
                                    float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                        return;
                                    }
                                    GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
                                    GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                                    ;
                                }
                            }
                        case 92:
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            break;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-4.5, -4.0, -67.03, 7.1);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    {
                                        int GLF_live9c = _GLF_FUZZED(-28932);
                                        int GLF_live9looplimiter1 = 0;
                                        uint GLF_live9matrix_number = _GLF_FUZZED(133650u);
                                        int GLF_live9rows = _GLF_FUZZED(-89509);
                                        {
                                            if (GLF_live9looplimiter1 >= 5) {
                                                ;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                return;
                                            }
                                            GLF_live9looplimiter1++;
                                            {
                                                {
                                                    int GLF_live9looplimiter0 = 0;
                                                    for (int GLF_live9r = 0; GLF_live9r < GLF_live9rows; GLF_live9r++) {
                                                        if (GLF_live9looplimiter0 >= 5) {
                                                            break;
                                                        }
                                                        GLF_live9looplimiter0++;
                                                        {
                                                            switch (GLF_live9matrix_number) {
                                                                case 0u:
                                                                    GLF_live9m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                                                                    break;
                                                                case 1u:
                                                                    GLF_live9m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                                                                    break;
                                                                case 2u:
                                                                    GLF_live9m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_live9m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_live9m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                                                                    break;
                                                                case 5u:
                                                                    GLF_live9m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_live9m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                                                                    if (_GLF_DEAD(false)) {
                                                                        break;
                                                                    }
                                                                    break;
                                                                case 7u:
                                                                    GLF_live9m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                                                                    break;
                                                                case 8u:
                                                                    GLF_live9m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                                                                    break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    do {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                }
                            }
                        default:
                            {
                                ivec2 GLF_live6pos = _GLF_FUZZED(ivec2(-58158, -67178));
                                if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                    float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                    ;
                                }
                            }
                            {
                                bool GLF_live11c1 = _GLF_FUZZED((125672u <= 103156u));
                                vec3 GLF_live11col = _GLF_FUZZED(vec3(-1.7, 3.6, -9.4));
                                vec2 GLF_live11uv = _GLF_FUZZED(vec2(-82.66, 76.75));
                                if (GLF_live11c1) {
                                    float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0));
                                    GLF_live11col = mix(vec3(GLF_live11uv.x, 0, 0.75), vec3(.8, .7, GLF_live11uv.x), GLF_live11stripe);
                                    GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                                    ;
                                }
                            }
                            1;
                    }
                }
                break;
            case 48:
                vec3 _GLF_SWITCH_1_15v, _GLF_SWITCH_1_16v;
                {
                    float GLF_live4pab = _GLF_FUZZED(float(73475u));
                    float GLF_live4pbc = _GLF_FUZZED((-vec2(30.05, 24.02).r));
                    if (!((GLF_live4pab < 0.0 && GLF_live4pbc < 0.0) || (GLF_live4pab >= 0.0 && GLF_live4pbc >= 0.0))) {
                        ;
                    }
                }
                {
                    int GLF_live9looplimiter6 = 0;
                    if (GLF_live9looplimiter6 >= 5) {
                        ;
                    }
                }
            default:
                1;
        }
    }
    {
        {
            int GLF_live6looplimiter0 = 0;
            if (GLF_live6looplimiter0 >= 4) {
                ;
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                return;
            }
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (mat4(639.413, 731.622, 4.4, -7162.0677, -9.2, 196.151, -5.1, 1121.2486, -3.0, 205.879, -85.55, 1.0, 84.55, 8.1, 4.3, -8.5) * mat3x4(4.4, -17.64, -6123.3779, 31.67, -35.17, -0.0, -99.57, 0.3, -821.270, -4.2, 47.02, 4704.0701))[2];
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                return;
            }
        }
        vec2 GLF_live3coord = _GLF_FUZZED(vec2(-6.1, -5140.8885));
        {
            {
                ;
            }
        }
        {
            uvec2 GLF_live3icoord = uvec2(((GLF_live3coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
            uint GLF_live3res1 = uint(((GLF_live3icoord.x * GLF_live3icoord.y) >> (GLF_live3icoord.x & 31u)) & 0xffffffffu);
            uint GLF_live3res2 = uint(((GLF_live3icoord.x * GLF_live3icoord.y) << (GLF_live3icoord.x & 31u)) & 0xffffffffu);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = sin(vec4(-189.161, -9.3, -4834.3676, 9632.7268));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            float GLF_live3res = float(((GLF_live3res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live3res1 & 1u) != 0u ? 1u : 0u));
            GLF_live3_GLF_color = vec4(GLF_live3res, GLF_live3res, GLF_live3res, 1.0);
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-3.9, -66.65, 6.9, -8.7);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    while (h < refh && i < 32) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
            continue;
        }
        coord -= uvstep;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = clamp((vec3(-43.57, -9617.0256, -58.45) * mat4x3(74.64, 5.4, 52.80, -9214.5518, 2.7, 8571.8590, 0.0, -1.5, 9.9, 47.67, -362.039, 0.4)), (-vec4(-5.4, -4257.3661, -656.516, 1640.7405)), (vec2(5225.5333, 844.741) * mat4x2(682.351, 874.063, -81.52, -91.53, -698.519, 3.4, 7.9, -92.36)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        refh += slope;
        h = texture(tex, coord).y;
        i++;
        {
            {
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(abs(0.0), 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(abs(0.0), 1.0, 0.0), vec3(1.0, 0.0, 1.0))))))) {
                        break;
                    }
                    GLF_live4_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = exp2(vec4(6.6, -9.6, -320.490, 0.5));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(_GLF_IDENTITY(true, !(!(true)))))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            int GLF_live0i = _GLF_FUZZED(17429);
            {
                {
                    {
                        ;
                    }
                }
                int GLF_live0looplimiter0 = 0;
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = dFdyFine(vec4(-38.43, 345.329, 5.9, 5572.6336));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    vec3 GLF_live11col = _GLF_FUZZED(vec3(-2.0, 3.4, 859.516));
                    vec2 GLF_live11uv = _GLF_FUZZED(vec2(5.9));
                    {
                        float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0));
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        GLF_live11col = mix(vec3(GLF_live11uv.x, .8, 0), vec3(1, GLF_live11uv.y, 0), GLF_live11stripe);
                        GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                        ;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                    }
                }
                {
                    float GLF_live4pab = _GLF_FUZZED(vec2(2.8, -1.6).y);
                    float GLF_live4pca = _GLF_FUZZED(float(((-13024) - (-32380))));
                    if (!((GLF_live4pab < 0.0 && GLF_live4pca < 0.0) || (GLF_live4pab >= 0.0 && GLF_live4pca >= 0.0))) {
                        ;
                        {
                            {
                                ;
                            }
                        }
                    }
                }
                for (GLF_live0i = 0; GLF_live0i < 16 * 16; GLF_live0i++) {
                    {
                        int GLF_live6looplimiter0 = 0;
                        ivec2 GLF_live6pos = _GLF_FUZZED(ivec2(-90225, -43191));
                        while (GLF_live6pos.y != 256) {
                            if (GLF_live6looplimiter0 >= 4) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            GLF_live6looplimiter0++;
                            {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                } else {
                                    if (GLF_live6pos.x < GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] + 15 && GLF_live6pos.x > GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)] - 15) {
                                        float GLF_live6p = (15.0 - abs(float(GLF_live6pos.x - GLF_live6dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                }
                                GLF_live6pos.y++;
                            }
                        }
                        {
                            int GLF_live9looplimiter3 = 0;
                            uint GLF_live9matrix_number = _GLF_FUZZED(185195u);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(1.5, 361.299, 3.1, 69.88);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            for (int GLF_live9cols = 2; GLF_live9cols <= 4; GLF_live9cols++) {
                                if (GLF_live9looplimiter3 >= 5) {
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                GLF_live9looplimiter3++;
                                {
                                    {
                                        int GLF_live9looplimiter2 = 0;
                                        for (int GLF_live9rows = 2; GLF_live9rows <= 4; GLF_live9rows++) {
                                            if (GLF_live9looplimiter2 >= 5) {
                                                break;
                                            }
                                            GLF_live9looplimiter2++;
                                            {
                                                {
                                                    int GLF_live9looplimiter1 = 0;
                                                    for (int GLF_live9c = 0; GLF_live9c < GLF_live9cols; GLF_live9c++) {
                                                        if (GLF_live9looplimiter1 >= 5) {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = mod(vec4(-7.7, -9.9, -48.86, -459.622), vec4(7.5, 5.9, -843.752, -0.4));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            break;
                                                        }
                                                        GLF_live9looplimiter1++;
                                                        {
                                                            {
                                                                int GLF_live9looplimiter0 = 0;
                                                                for (int GLF_live9r = 0; GLF_live9r < GLF_live9rows; GLF_live9r++) {
                                                                    if (GLF_live9looplimiter0 >= 5) {
                                                                        break;
                                                                    }
                                                                    GLF_live9looplimiter0++;
                                                                    {
                                                                        switch (GLF_live9matrix_number) {
                                                                            case 0u:
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = vec4(7045.2254, 88.02, 5.7, 4.0);
                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false || (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                                GLF_live9m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                                                                                break;
                                                                            case 1u:
                                                                                GLF_live9m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                                                                                break;
                                                                            case 2u:
                                                                                GLF_live9m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                                                                                break;
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                    continue;
                                                                                }
                                                                            case 3u:
                                                                                GLF_live9m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                                                                                break;
                                                                            case 4u:
                                                                                GLF_live9m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                                                                                break;
                                                                            case 5u:
                                                                                GLF_live9m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                                                                                break;
                                                                                if (_GLF_DEAD(false)) {
                                                                                    break;
                                                                                }
                                                                            case 6u:
                                                                                GLF_live9m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 2)] = GLF_live9one;
                                                                                break;
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = fwidthFine(vec4(313.788, 7.8, -1259.8578, -142.091));
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                            case 7u:
                                                                                GLF_live9m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 3)] = GLF_live9one;
                                                                                break;
                                                                            case 8u:
                                                                                GLF_live9m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live9r, 4)] = GLF_live9one;
                                                                                break;
                                                                        }
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            break;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_live9matrix_number = GLF_live9matrix_number + 1u;
                                            }
                                        }
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(41.74, -4581.5439, 18.81, 2.0);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    if (GLF_live0looplimiter0 >= 5) {
                        break;
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                    GLF_live0looplimiter0++;
                    {
                        GLF_live0map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 256)] = 0;
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        _GLF_color = vec4(vec3(float(i) * (1.0 / 32.0)), 1.0);
    }
}
