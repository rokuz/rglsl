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
    float GLF_live18one;
};

mat2 GLF_live18m22 = _GLF_FUZZED(mat2((mat2x4(4.3, -533.751, 1751.2270, 225.111, 1.0, -214.774, -651.683, -9.5))));
mat2x3 GLF_live18m23 = _GLF_FUZZED(mat2x3(-5172.4162, 1.9, -4930.6951, -707.213, -0.7, -77.29));
mat2x4 GLF_live18m24 = _GLF_FUZZED(mat2x4(6.4, 5.1, -22.18, -5975.8547, -7.9, -4683.8970, 2.9, -0.0));
mat3x2 GLF_live18m32 = _GLF_FUZZED(mat3x2(908.584, 61.46, -50.58, -38.22, -4433.1754, 9.8));
mat3 GLF_live18m33 = _GLF_FUZZED(mat3(-6.5, -5536.5175, -8.4, 75.72, -27.89, 8618.2168, 76.51, 1.4, 11.38));
mat3x4 GLF_live18m34 = _GLF_FUZZED(mat3x4(-0.4, -78.47, -3.6, 1378.4002, -505.428, 6.5, -9336.1518, -89.06, 8122.6099, -56.53, -0.2, -73.55));
mat4x2 GLF_live18m42 = _GLF_FUZZED((mat4x2(-125.461, -67.32, -33.80, -65.75, -459.259, -884.315, 10.07, 5227.6759)));
mat4x3 GLF_live18m43 = _GLF_FUZZED(mat4x3(-189.171, 4233.5876, -4.6, -296.904, -9.9, 455.285, 90.25, -1.2, -25.18, 3147.2804, 72.38, -4.4));
mat4 GLF_live18m44 = _GLF_FUZZED(mat4(7.8, 6694.4140, 9.4, -4.8, 7320.4522, -9.1, -37.16, -9.5, -9.9, -2.4, 4.0, 9999.8579, -1826.5179, -4971.7491, -2.9, 66.86));
vec4 GLF_live19gl_FragCoord = _GLF_FUZZED(vec4(-6.6, -152.623, -3.4, -29.89));

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live19injectionSwitch;
};

const int GLF_live19N = 10;
int GLF_live19data[10] = int[10](_GLF_FUZZED(90571), _GLF_FUZZED((83891 - 77924)), _GLF_FUZZED(65266), _GLF_FUZZED(-67372), _GLF_FUZZED(-2734), _GLF_FUZZED(int(bvec4(true, true, true, true).z)), _GLF_FUZZED((~((-94698) | ivec3(54184, 19765, -20207).g))), _GLF_FUZZED(int(123997u)), _GLF_FUZZED(-15629), _GLF_FUZZED(-46441)), GLF_live19temp[10] = int[10](_GLF_FUZZED(-32626), _GLF_FUZZED(-58562), _GLF_FUZZED(98011), _GLF_FUZZED(-14070), _GLF_FUZZED((((74877 & 82549) | (-89022)) & 48397)), _GLF_FUZZED(61894), _GLF_FUZZED(67161), _GLF_FUZZED(-78244), _GLF_FUZZED((-60070)), _GLF_FUZZED(-19429));

void GLF_live19merge(int GLF_live19from, int GLF_live19mid, int GLF_live19to) {
    int GLF_live19k = GLF_live19from, GLF_live19i = GLF_live19from, GLF_live19j = GLF_live19mid + 1;
    {
        int GLF_live19looplimiter0 = 0;
        while (GLF_live19i <= GLF_live19mid && GLF_live19j <= GLF_live19to) {
            if (GLF_live19looplimiter0 >= 6) {
                break;
            }
            GLF_live19looplimiter0++;
            {
                if (GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] < GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)]) {
                    GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i++, 10)];
                } else {
                    GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live19looplimiter1 = 0;
        while (GLF_live19i < GLF_live19N && GLF_live19i <= GLF_live19mid) {
            if (GLF_live19looplimiter1 >= 6) {
                break;
            }
            GLF_live19looplimiter1++;
            {
                GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i++, 10)];
            }
        }
    }
    {
        int GLF_live19looplimiter2 = 0;
        for (int GLF_live19i = GLF_live19from; GLF_live19i <= GLF_live19to; GLF_live19i++) {
            if (GLF_live19looplimiter2 >= 6) {
                break;
            }
            GLF_live19looplimiter2++;
            {
                GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)];
            }
        }
    }
}

const int GLF_live17dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
layout(set = 0, binding = 3) uniform sampler2D GLF_live20tex;
vec4 GLF_dead16_GLF_color = _GLF_FUZZED(vec3(-4907.5817, -4441.4143, 36.63).ppps);

layout(set = 0, binding = 4) uniform buf4 {
    vec3 GLF_dead16polynomial;
};

float GLF_dead16fx(float GLF_dead16x) {
    return GLF_dead16polynomial.x * pow(GLF_dead16x, 2.0) + GLF_dead16polynomial.y * GLF_dead16x + GLF_dead16polynomial.z;
}

vec4 GLF_dead15_GLF_color = _GLF_FUZZED(vec3(8252.9082, 95.68, 2237.4295).xxzy);

float GLF_dead15cross2d(vec2 GLF_dead15a, vec2 GLF_dead15b) {
    return ((GLF_dead15a.x) * (GLF_dead15b.y) - (GLF_dead15b.x) * (GLF_dead15a.y));
}

int GLF_dead15pointInTriangle(vec2 GLF_dead15p, vec2 GLF_dead15a, vec2 GLF_dead15b, vec2 GLF_dead15c) {
    float GLF_dead15pab = GLF_dead15cross2d(vec2(GLF_dead15p.x - GLF_dead15a.x, GLF_dead15p.y - GLF_dead15a.y), vec2(GLF_dead15b.x - GLF_dead15a.x, GLF_dead15b.y - GLF_dead15a.y));
    float GLF_dead15pbc = GLF_dead15cross2d(vec2(GLF_dead15p.x - GLF_dead15b.x, GLF_dead15p.y - GLF_dead15b.y), vec2(GLF_dead15c.x - GLF_dead15b.x, GLF_dead15c.y - GLF_dead15b.y));
    {
        ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(85116, 34655));
        {
            int GLF_live17looplimiter0 = 0;
            while (GLF_live17pos.y != 256) {
                if (GLF_live17looplimiter0 >= 3) {
                    break;
                }
                GLF_live17looplimiter0++;
                {
                    if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                        float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                        ;
                    }
                    GLF_live17pos.y++;
                }
            }
        }
    }
    if (!((GLF_dead15pab < 0.0 && GLF_dead15pbc < 0.0) || (GLF_dead15pab >= 0.0 && GLF_dead15pbc >= 0.0))) {
        return 0;
    }
    float GLF_dead15pca = GLF_dead15cross2d(vec2(GLF_dead15p.x - GLF_dead15c.x, GLF_dead15p.y - GLF_dead15c.y), vec2(GLF_dead15a.x - GLF_dead15c.x, GLF_dead15a.y - GLF_dead15c.y));
    if (!((GLF_dead15pab < 0.0 && GLF_dead15pca < 0.0) || (GLF_dead15pab >= 0.0 && GLF_dead15pca >= 0.0))) {
        return 0;
    }
    return 1;
}

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead6injectionSwitch;
};

struct GLF_dead6QuicksortObject {
    int numbers[10];
};

GLF_dead6QuicksortObject GLF_dead6obj;

void GLF_dead6swap(int GLF_dead6i, int GLF_dead6j) {
    int GLF_dead6temp = GLF_dead6obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 10)];
    {
        vec2 GLF_live13a = _GLF_FUZZED(vec2(263.113, 2.0));
        {
            int GLF_live19high = _GLF_FUZZED(((-40352) | 49985));
            int GLF_live19looplimiter3 = 0;
            int GLF_live19low = _GLF_FUZZED(int(false));
            int GLF_live19m = _GLF_FUZZED((76423 ^ (-54439)));
            for (int GLF_live19i = GLF_live19low; GLF_live19i < GLF_live19high; GLF_live19i += 2 * GLF_live19m) {
                if (GLF_live19looplimiter3 >= 6) {
                    break;
                }
                GLF_live19looplimiter3++;
                {
                    int GLF_live19from = GLF_live19i;
                    int GLF_live19mid = GLF_live19i + GLF_live19m - 1;
                    int GLF_live19to = min(GLF_live19i + 2 * GLF_live19m - 1, GLF_live19high);
                    GLF_live19merge(GLF_live19from, GLF_live19mid, GLF_live19to);
                }
            }
        }
        float GLF_live13th = _GLF_FUZZED(-12.20);
        if (GLF_live13a.y < GLF_live13a.x) {
            GLF_live13th = 0.5 - GLF_live13th;
        }
    }
    GLF_dead6obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 10)] = GLF_dead6obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 10)];
    {
        float GLF_live13th = _GLF_FUZZED(-2434.9940);
        vec2 GLF_live13v = _GLF_FUZZED((vec2(3.6, -5791.0486) * ((-8.4) - 89.37)));
        if (GLF_live13v.y < 0.0) {
            GLF_live13th = -GLF_live13th;
        }
    }
    GLF_dead6obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 10)] = GLF_dead6temp;
}

vec3 GLF_dead6palette(vec3 GLF_dead6a, vec3 GLF_dead6b, vec3 GLF_dead6c, vec3 GLF_dead6d) {
    return fract(mix(GLF_dead6d * GLF_dead6a, GLF_dead6a * GLF_dead6c, GLF_dead6b + GLF_dead6d - GLF_dead6c));
}

vec4 GLF_dead8_GLF_color = _GLF_FUZZED((3143.2205 - vec4(19.43, 21.12, 627.905, -5911.9468)));
int GLF_dead8map[16 * 16];

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_dead5resolution;
};

vec4 GLF_dead4gl_FragCoord = _GLF_FUZZED(vec4(-3.3, 1093.0450, 55.24, -38.55));

layout(set = 0, binding = 7) uniform buf7 {
    vec2 GLF_dead4injectionSwitch;
};

layout(set = 0, binding = 8) uniform buf8 {
    vec2 GLF_dead4resolution;
};

layout(set = 0, binding = 9) uniform sampler2D GLF_live2tex;
const float GLF_live2weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

const int N = 10;
int data[10], temp[10];

void merge(int from, int mid, int to) {
    int k = from, i = from, j = mid + 1;
    while (_GLF_IDENTITY(i, (true ? _GLF_IDENTITY(i, int(_GLF_ONE(1.0, injectionSwitch.y)) * (i)) : _GLF_FUZZED(-62053))) <= mid && j <= to) {
        if (data[i] < data[j]) {
            temp[k++] = data[i++];
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = ((-1.1) / (mat4(-4969.9863, -8.9, -6180.6298, -1420.5606, -2.4, 0.2, -6.8, 7200.9627, 6.8, 28.20, 9353.4235, 4787.6736, 5644.6708, -49.98, -3.8, 1202.2971) * atan(vec4(-75.65, 0.7, -0.0, 831.258), vec4(6.5, -8128.0272, 9949.7977, 19.87))));
                {
                    {
                        ;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        } else {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(11.08, -81.12, 137.390, 1.1);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        }
                    }
                    {
                        int GLF_live12looplimiter3 = 0;
                        if (GLF_live12looplimiter3 >= 3) {
                            ;
                        }
                        {
                            int GLF_live19i = _GLF_FUZZED(-11337);
                            int GLF_live19j = _GLF_FUZZED(int(true));
                            int GLF_live19k = _GLF_FUZZED((((-58291) | (-42825)) * (-77043)));
                            if (GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] < GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)]) {
                                GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i++, 10)];
                            } else {
                                GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j++, 10)];
                            }
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                uint GLF_live18matrix_number = _GLF_FUZZED(92005u);
                {
                    int GLF_live18looplimiter3 = 0;
                    for (int GLF_live18cols = 2; GLF_live18cols <= 4; GLF_live18cols++) {
                        if (GLF_live18looplimiter3 >= 7) {
                            break;
                        }
                        GLF_live18looplimiter3++;
                        {
                            {
                                int GLF_live18looplimiter2 = 0;
                                for (int GLF_live18rows = 2; GLF_live18rows <= 4; GLF_live18rows++) {
                                    if (GLF_live18looplimiter2 >= 7) {
                                        break;
                                    }
                                    GLF_live18looplimiter2++;
                                    {
                                        {
                                            int GLF_live18looplimiter1 = 0;
                                            for (int GLF_live18c = 0; GLF_live18c < GLF_live18cols; GLF_live18c++) {
                                                if (GLF_live18looplimiter1 >= 7) {
                                                    break;
                                                }
                                                GLF_live18looplimiter1++;
                                                {
                                                    {
                                                        int GLF_live18looplimiter0 = 0;
                                                        for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                            if (GLF_live18looplimiter0 >= 7) {
                                                                break;
                                                            }
                                                            GLF_live18looplimiter0++;
                                                            {
                                                                switch (GLF_live18matrix_number) {
                                                                    case 0u:
                                                                        GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                        break;
                                                                    case 1u:
                                                                        GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                        break;
                                                                    case 2u:
                                                                        GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                        break;
                                                                    case 3u:
                                                                        GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                        break;
                                                                    case 4u:
                                                                        GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                        break;
                                                                    case 5u:
                                                                        GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                        break;
                                                                    case 6u:
                                                                        GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                        break;
                                                                    case 7u:
                                                                        GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                        break;
                                                                    case 8u:
                                                                        GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_live18matrix_number = GLF_live18matrix_number + 1u;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            temp[k++] = data[j++];
        }
        {
            {
                vec2 GLF_live13v = _GLF_FUZZED((true ? vec2(-20.39, -18.71) : vec2(-3.6, 456.816)));
                if (length(GLF_live13v) < 0.001) {
                    ;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec2 GLF_live13v = _GLF_FUZZED((vec3(-3.1, 6.9, 5.1) * mat2x3(0.5, -3830.6993, 368.008, 2.6, 4628.2739, 1.7)));
                if (length(GLF_live13v) < 0.001) {
                    ;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-9248.4436, 9395.8213, 9703.3639, 66.72);
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) && true))) {
                {
                    vec2 GLF_live13a = _GLF_FUZZED(((vec4(-2139.1613, -8.6, -9.1, -21.97) * mat2x4(90.52, -2.4, -75.93, 2.0, 7.9, 6276.3825, 3396.4163, 640.347)) + float(true)));
                    {
                        int GLF_live18cols = _GLF_FUZZED(51638);
                        int GLF_live18looplimiter3 = 0;
                        uint GLF_live18matrix_number = _GLF_FUZZED((184000u | 57862u));
                        {
                            if (GLF_live18looplimiter3 >= 7) {
                                ;
                            }
                            GLF_live18looplimiter3++;
                            {
                                {
                                    int GLF_live18looplimiter2 = 0;
                                    for (int GLF_live18rows = 2; GLF_live18rows <= 4; GLF_live18rows++) {
                                        if (GLF_live18looplimiter2 >= 7) {
                                            break;
                                        }
                                        GLF_live18looplimiter2++;
                                        {
                                            {
                                                int GLF_live18looplimiter1 = 0;
                                                for (int GLF_live18c = 0; GLF_live18c < GLF_live18cols; GLF_live18c++) {
                                                    if (GLF_live18looplimiter1 >= 7) {
                                                        break;
                                                    }
                                                    GLF_live18looplimiter1++;
                                                    {
                                                        {
                                                            int GLF_live18looplimiter0 = 0;
                                                            for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                                if (GLF_live18looplimiter0 >= 7) {
                                                                    break;
                                                                }
                                                                GLF_live18looplimiter0++;
                                                                {
                                                                    switch (GLF_live18matrix_number) {
                                                                        case 0u:
                                                                            GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                            break;
                                                                        case 1u:
                                                                            GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                            break;
                                                                        case 2u:
                                                                            GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                            break;
                                                                        case 3u:
                                                                            GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                            break;
                                                                        case 4u:
                                                                            GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                            break;
                                                                        case 5u:
                                                                            GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                            break;
                                                                        case 6u:
                                                                            GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                            break;
                                                                        case 7u:
                                                                            GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                            break;
                                                                        case 8u:
                                                                            GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                            break;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_live18matrix_number = GLF_live18matrix_number + 1u;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead16_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                        }
                    }
                    float GLF_live13z = _GLF_FUZZED(-9.1);
                    {
                        {
                            ;
                        }
                    }
                    if (GLF_live13a.y > GLF_live13a.x) {
                        GLF_live13z = GLF_live13a.x / GLF_live13a.y;
                    } else {
                        GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                    }
                }
                vec3 donor_replacementGLF_dead6color = _GLF_FUZZED(vec3(6737.4077, -475.306, 498.271));
                if (_GLF_DEAD(false)) {
                    {
                        from = (4 * from * (1000 - from)) / 1000;
                    }
                }
                {
                    donor_replacementGLF_dead6color -= GLF_dead6palette(vec3(float(GLF_dead6obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead6injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead6injectionSwitch.x, 0.6, float(GLF_dead6obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead6injectionSwitch.x), 10)]) * 0.1));
                    k++;
                }
                {
                    float GLF_live13th = _GLF_FUZZED(6.2);
                    vec2 GLF_live13v = _GLF_FUZZED(vec2(1.2, 5360.4073));
                    {
                        int GLF_live18c = _GLF_FUZZED((99550 - ((-7287) - 71965)));
                        uint GLF_live18matrix_number = _GLF_FUZZED(uvec3(72897u, 50597u, 182634u).z);
                        int GLF_live18r = _GLF_FUZZED((+(-10043)));
                        {
                            switch (GLF_live18matrix_number) {
                                case 0u:
                                    GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                    break;
                                case 1u:
                                    GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                    break;
                                case 2u:
                                    GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                    break;
                                case 3u:
                                    GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                    break;
                                case 4u:
                                    GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                    break;
                                case 5u:
                                    GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                    break;
                                case 6u:
                                    GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                    break;
                                case 7u:
                                    GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                    break;
                                case 8u:
                                    GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                    break;
                            }
                        }
                    }
                    if (GLF_live13v.y < 0.0) {
                        GLF_live13th = -GLF_live13th;
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    vec2 GLF_live20coord = _GLF_FUZZED(vec2(-22.19, 6.0));
                    int GLF_live20i = _GLF_FUZZED((-(-38104)));
                    int GLF_live20looplimiter0 = 0;
                    vec4 GLF_live20texel = _GLF_FUZZED(vec4(61.51, 10.78, 14.08, 8.8));
                    while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                        if (GLF_live20looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live20looplimiter0++;
                        {
                            GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                            GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                            GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                            GLF_live20i++;
                        }
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(1.2, -1255.9098, -165.235, 141.506);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        {
            int GLF_live1iterationCap = _GLF_FUZZED((-_GLF_IDENTITY(ivec2(-61355, 80065), clamp(ivec2(-61355, 80065), ivec2(-61355, 80065), ivec2(-61355, 80065))).g));
            {
                {
                    vec2 GLF_live20coord = _GLF_FUZZED((vec2(-3.4, -414.440) * ((-0.8) + mat2(5.1, 8.1, -2505.7527, -236.865))));
                    int GLF_live20i = _GLF_FUZZED(42704);
                    int GLF_live20looplimiter0 = 0;
                    vec4 GLF_live20texel = _GLF_FUZZED(vec4((-(402.065 * vec2(0.1, 394.600))), float(false), vec3(360.719, -6.7, -37.36).s));
                    {
                        if (GLF_live20looplimiter0 >= 7) {
                            ;
                        }
                        GLF_live20looplimiter0++;
                        {
                            GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                            GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                            GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                            GLF_live20i++;
                        }
                    }
                }
                GLF_live1iterationCap += 1;
            }
            {
                int GLF_live12looplimiter2 = 0;
                if (GLF_live12looplimiter2 >= 3) {
                    ;
                }
            }
        }
    }
    while (i < N && i <= mid) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = acosh(vec4(228.950, -7.3, -2.0, -118.631));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), !(_GLF_IDENTITY(!(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))), false || (!(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                {
                    int GLF_live20looplimiter0 = 0;
                    if (GLF_live20looplimiter0 >= 7) {
                        ;
                    }
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = cosh(vec4(3766.0036, 9.5, 2.4, -5.3));
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead15pos = _GLF_FUZZED(mix(vec2(-0.3, 7.0), GLF_dead4injectionSwitch, -7041.6493));
                if (GLF_dead15pointInTriangle(donor_replacementGLF_dead15pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                    GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } else {
                    GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                }
                {
                    vec2 GLF_live20coord = _GLF_FUZZED(vec2(503.967, -21.11));
                    int GLF_live20i = _GLF_FUZZED(65828);
                    vec4 GLF_live20texel = _GLF_FUZZED(vec4(9.4, 1486.0524, 6.8, -3752.1064));
                    {
                        GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                        GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                        GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                        GLF_live20i++;
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                vec2 GLF_live13a = _GLF_FUZZED((vec2(-15.35, 2.0) + (9.9 - vec2(-2416.3789, 1.0))));
                float GLF_live13z = _GLF_FUZZED(((-7617.9945) * (-5706.9486)));
                if (GLF_live13a.y > GLF_live13a.x) {
                    GLF_live13z = GLF_live13a.x / GLF_live13a.y;
                } else {
                    GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                }
            }
        }
        temp[k++] = data[i++];
        {
            int GLF_live20looplimiter0 = 0;
            if (GLF_live20looplimiter0 >= 7) {
                ;
            }
        }
    }
    for (int i = from; i <= to; i++) {
        data[i] = temp[i];
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                float GLF_live13th = _GLF_FUZZED(7493.1835);
                {
                    GLF_live13th = -GLF_live13th;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = clamp(vec4(226.947, -6618.8266, -41.82, -4.8), -71.63, -8.7);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                {
                    int GLF_live19i = _GLF_FUZZED((true ? (-42942) : 53083));
                    int GLF_live19k = _GLF_FUZZED(-4292);
                    {
                        GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i++, 10)];
                    }
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead16x2 = _GLF_FUZZED(uintBitsToFloat(63917u));
                    if (donor_replacementGLF_dead16x2 <= -0.9 && donor_replacementGLF_dead16x2 >= -1.1) {
                        GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    } else {
                        GLF_dead16_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                    }
                }
                int donor_replacementGLF_dead4i = _GLF_FUZZED(to);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    ivec2 donor_replacementGLF_dead8p = _GLF_FUZZED(ivec2(-19050, -696));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            mid = (4 * mid * (1000 - mid)) / 1000;
                        }
                        {
                            int GLF_live18looplimiter1 = 0;
                            if (GLF_live18looplimiter1 >= 7) {
                                ;
                            }
                        }
                    }
                    if (k >= 0 && donor_replacementGLF_dead8p.x < 14 && GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x + 2) + (donor_replacementGLF_dead8p.y) * 16, 256)] == 0) {
                        k--;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-3.4, -123.181, -28.65, -161.273);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y) * 16, 256)] = 1;
                        GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x + 1) + (donor_replacementGLF_dead8p.y) * 16, 256)] = 1;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            {
                                ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(9090, 74470));
                                {
                                    int GLF_live17looplimiter0 = 0;
                                    while (GLF_live17pos.y != 256) {
                                        if (GLF_live17looplimiter0 >= 3) {
                                            break;
                                        }
                                        GLF_live17looplimiter0++;
                                        {
                                            if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                ;
                                            }
                                            GLF_live17pos.y++;
                                        }
                                    }
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(((-24.71) - (-0.8)), vec3(2361.3929, 700.627, 8307.7823));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                {
                                    int GLF_live19i = _GLF_FUZZED(((-59693) * (-8752)));
                                    int GLF_live19looplimiter5 = 0;
                                    {
                                        if (GLF_live19looplimiter5 >= 6) {
                                            ;
                                        }
                                        GLF_live19looplimiter5++;
                                        {
                                            switch (GLF_live19i) {
                                                case 0:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 4;
                                                    break;
                                                case 1:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 3;
                                                    break;
                                                case 2:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 2;
                                                    break;
                                                case 3:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 1;
                                                    break;
                                                case 4:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 0;
                                                    break;
                                                case 5:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -1;
                                                    break;
                                                case 6:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -2;
                                                    break;
                                                case 7:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -3;
                                                    break;
                                                case 8:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -4;
                                                    break;
                                                case 9:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -5;
                                                    break;
                                            }
                                            GLF_live19i++;
                                        }
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                {
                                    int GLF_live12c_im = _GLF_FUZZED(-4644);
                                    int GLF_live12c_re = _GLF_FUZZED(ivec4(44456, 23446, -4209, -18961).abr.t);
                                    int GLF_live12iteration = _GLF_FUZZED(-86752);
                                    int GLF_live12x = _GLF_FUZZED(int(true));
                                    int GLF_live12y = _GLF_FUZZED(31897);
                                    {
                                        int GLF_live19i = _GLF_FUZZED(ivec3(-53852, -19794, -61595).p);
                                        {
                                            switch (GLF_live19i) {
                                                case 0:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 4;
                                                    break;
                                                case 1:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 3;
                                                    break;
                                                case 2:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 2;
                                                    break;
                                                case 3:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 1;
                                                    break;
                                                case 4:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 0;
                                                    break;
                                                case 5:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -1;
                                                    break;
                                                case 6:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -2;
                                                    break;
                                                case 7:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -3;
                                                    break;
                                                case 8:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -4;
                                                    break;
                                                case 9:
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -5;
                                                    break;
                                            }
                                            GLF_live19i++;
                                        }
                                    }
                                    {
                                        int GLF_live12looplimiter0 = 0;
                                        for (int GLF_live12k = 0; GLF_live12k < 1000; GLF_live12k++) {
                                            if (GLF_live12looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live12looplimiter0++;
                                            {
                                                if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 262144) {
                                                    break;
                                                }
                                                int GLF_live12x_new = ((GLF_live12x * GLF_live12x - GLF_live12y * GLF_live12y) / 256 + GLF_live12c_re);
                                                GLF_live12y = (2 * GLF_live12x * GLF_live12y / 256 + GLF_live12c_im);
                                                GLF_live12x = GLF_live12x_new;
                                                GLF_live12iteration++;
                                            }
                                        }
                                    }
                                }
                                {
                                    int GLF_live17looplimiter0 = 0;
                                    ivec2 GLF_live17pos = _GLF_FUZZED((-ivec2(15467, 9434)));
                                    {
                                        if (GLF_live17looplimiter0 >= 3) {
                                            ;
                                        }
                                        GLF_live17looplimiter0++;
                                        {
                                            if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                ;
                                            }
                                            GLF_live17pos.y++;
                                        }
                                    }
                                }
                            }
                            {
                                {
                                    ;
                                }
                            }
                        }
                        GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x + 2) + (donor_replacementGLF_dead8p.y) * 16, 256)] = 1;
                        donor_replacementGLF_dead8p.x += 2;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        {
                            vec2 GLF_live20coord = _GLF_FUZZED((vec2(1536.1765, 3.9) + (vec2(-7.8, -661.731) + (-4.7))));
                            int GLF_live20i = _GLF_FUZZED(int(124924u));
                            vec4 GLF_live20texel = _GLF_FUZZED(vec4(-2.3, 2.7, -9.2, 521.740));
                            {
                                int GLF_live20looplimiter0 = 0;
                                while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                    if (GLF_live20looplimiter0 >= 7) {
                                        break;
                                    }
                                    GLF_live20looplimiter0++;
                                    {
                                        GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                        GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                        GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                        GLF_live20i++;
                                    }
                                }
                            }
                        }
                        ;
                        {
                            int GLF_live19j = _GLF_FUZZED((false ? (19801) : ivec2(-6938, 33027).g));
                            int GLF_live19k = _GLF_FUZZED((ivec3(22995, 56411, -38135) * 93353).z);
                            {
                                GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j++, 10)];
                            }
                        }
                    }
                    {
                        ivec2 GLF_live17pos = _GLF_FUZZED((41823 ^ ivec2(67426, -79069)));
                        {
                            float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                            ;
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(5.9, -393.357, 1.5, -6623.9628);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            int GLF_live18c = _GLF_FUZZED(12890);
                            int GLF_live18looplimiter1 = 0;
                            uint GLF_live18matrix_number = _GLF_FUZZED((uint(false) - 130385u));
                            int GLF_live18rows = _GLF_FUZZED((-((-66761) * 65356)));
                            {
                                if (GLF_live18looplimiter1 >= 7) {
                                    ;
                                }
                                GLF_live18looplimiter1++;
                                {
                                    {
                                        int GLF_live18looplimiter0 = 0;
                                        for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                            if (GLF_live18looplimiter0 >= 7) {
                                                break;
                                            }
                                            GLF_live18looplimiter0++;
                                            {
                                                switch (GLF_live18matrix_number) {
                                                    case 0u:
                                                        GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                        break;
                                                    case 1u:
                                                        GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                        break;
                                                    case 2u:
                                                        GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                        break;
                                                    case 3u:
                                                        GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                        break;
                                                    case 4u:
                                                        GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                        break;
                                                    case 5u:
                                                        GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                        break;
                                                    case 6u:
                                                        GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                        break;
                                                    case 7u:
                                                        GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                        break;
                                                    case 8u:
                                                        GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                        break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (donor_replacementGLF_dead4i < int(GLF_dead4gl_FragCoord.x)) {
                    break;
                    {
                        ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(-1955, -10370));
                        {
                            int GLF_live17looplimiter0 = 0;
                            while (GLF_live17pos.y != 256) {
                                if (GLF_live17looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live17looplimiter0++;
                                {
                                    if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                        float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                    GLF_live17pos.y++;
                                }
                            }
                        }
                    }
                }
            }
            _GLF_IDENTITY(_GLF_color = vec4(129.563, 5274.7822, 6502.2689, -2.3), vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_color = vec4(129.563, 5274.7822, 6502.2689, -2.3)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                {
                    float GLF_live13th = _GLF_FUZZED(75.01);
                    {
                        GLF_live13th = 0.5 - GLF_live13th;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                int GLF_live11looplimiter0 = 0;
                {
                    int GLF_live19i = _GLF_FUZZED(ivec3(-92167, -72281, 90432).g);
                    int GLF_live19k = _GLF_FUZZED(-11910);
                    {
                        GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i++, 10)];
                    }
                }
                if (GLF_live11looplimiter0 >= 4) {
                    ;
                }
            }
        }
    }
}

void mergeSort() {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        ivec2 GLF_live17pos = _GLF_FUZZED((-ivec2(-88137, -83674)));
                        if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                            float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                            ;
                        }
                    }
                    float donor_replacementGLF_dead15pab = _GLF_FUZZED(40.13);
                    float donor_replacementGLF_dead15pca = _GLF_FUZZED(-51.69);
                    if (!((donor_replacementGLF_dead15pab < 0.0 && donor_replacementGLF_dead15pca < 0.0) || (donor_replacementGLF_dead15pab >= 0.0 && donor_replacementGLF_dead15pca >= 0.0))) {
                        ;
                    }
                }
                ;
            }
        }
        _GLF_color = ceil(fract(vec4(-581.887, 5.1, -83.41, 9427.6027)));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            {
                ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(-13643, 45069));
                {
                    float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                    ;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(determinant(mat2(0.0, 0.0, 0.0, 0.0))))))) {
                    {
                        {
                            int GLF_live18cols = _GLF_FUZZED(13347);
                            int GLF_live18looplimiter3 = 0;
                            uint GLF_live18matrix_number = _GLF_FUZZED(uint(false));
                            {
                                if (GLF_live18looplimiter3 >= 7) {
                                    ;
                                }
                                GLF_live18looplimiter3++;
                                {
                                    {
                                        int GLF_live18looplimiter2 = 0;
                                        for (int GLF_live18rows = 2; GLF_live18rows <= 4; GLF_live18rows++) {
                                            if (GLF_live18looplimiter2 >= 7) {
                                                break;
                                            }
                                            GLF_live18looplimiter2++;
                                            {
                                                {
                                                    int GLF_live18looplimiter1 = 0;
                                                    for (int GLF_live18c = 0; GLF_live18c < GLF_live18cols; GLF_live18c++) {
                                                        if (GLF_live18looplimiter1 >= 7) {
                                                            break;
                                                        }
                                                        GLF_live18looplimiter1++;
                                                        {
                                                            {
                                                                int GLF_live18looplimiter0 = 0;
                                                                for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                                    if (GLF_live18looplimiter0 >= 7) {
                                                                        break;
                                                                    }
                                                                    GLF_live18looplimiter0++;
                                                                    {
                                                                        switch (GLF_live18matrix_number) {
                                                                            case 0u:
                                                                                GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                break;
                                                                            case 1u:
                                                                                GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                break;
                                                                            case 2u:
                                                                                GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                break;
                                                                            case 3u:
                                                                                GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                break;
                                                                            case 4u:
                                                                                GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                break;
                                                                            case 5u:
                                                                                GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                break;
                                                                            case 6u:
                                                                                GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                break;
                                                                            case 7u:
                                                                                GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                break;
                                                                            case 8u:
                                                                                GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                break;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_live18matrix_number = GLF_live18matrix_number + 1u;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    }
                }
                vec2 GLF_live13a = _GLF_FUZZED((vec2(-16.79, -0.5)));
                float GLF_live13z = _GLF_FUZZED((6.9 - 97.41));
                {
                    GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                }
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-8.5, 845.658, -9632.0629, -829.414);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead16A = _GLF_FUZZED(dot(injectionSwitch, cosh(GLF_dead4resolution)));
                    float donor_replacementGLF_dead16B = _GLF_FUZZED(fwidth(5.0));
                    float donor_replacementGLF_dead16C = _GLF_FUZZED(-2.6);
                    float donor_replacementGLF_dead16temp = _GLF_FUZZED(-5728.8158);
                    float donor_replacementGLF_dead16x0 = _GLF_FUZZED(step(fwidthCoarse(-8.5), -8.3));
                    float donor_replacementGLF_dead16x1 = _GLF_FUZZED(mat2(-940.080, -872.909, 56.37, -391.690)[0].s);
                    float donor_replacementGLF_dead16x2 = _GLF_FUZZED(vec3(89.06, -484.118, 8.5)[0]);
                    {
                        float GLF_dead16h0 = donor_replacementGLF_dead16x0 - donor_replacementGLF_dead16x2;
                        float GLF_dead16h1 = donor_replacementGLF_dead16x1 - donor_replacementGLF_dead16x2;
                        float GLF_dead16k0 = GLF_dead16fx(donor_replacementGLF_dead16x0) - GLF_dead16fx(donor_replacementGLF_dead16x2);
                        float GLF_dead16k1 = GLF_dead16fx(donor_replacementGLF_dead16x1) - GLF_dead16fx(donor_replacementGLF_dead16x2);
                        {
                            vec2 GLF_live20coord = _GLF_FUZZED(vec2(-88.47, 22.39));
                            int GLF_live20i = _GLF_FUZZED(77591);
                            int GLF_live20looplimiter0 = 0;
                            vec4 GLF_live20texel = _GLF_FUZZED((3991.9837 - vec4(-2.7, -1417.0467, -107.118, 2326.4443)));
                            while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                if (GLF_live20looplimiter0 >= 7) {
                                    break;
                                }
                                GLF_live20looplimiter0++;
                                {
                                    GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                    GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                    GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                    GLF_live20i++;
                                }
                            }
                        }
                        donor_replacementGLF_dead16temp = donor_replacementGLF_dead16x2;
                        donor_replacementGLF_dead16A = (((GLF_dead16h1) * (GLF_dead16k0)) - ((GLF_dead16h0) * (GLF_dead16k1))) / ((pow((GLF_dead16h0), 2.0) * (GLF_dead16h1)) - (pow((GLF_dead16h1), 2.0) * (GLF_dead16h0)));
                        donor_replacementGLF_dead16B = (((GLF_dead16k0) - (donor_replacementGLF_dead16A * (pow((GLF_dead16h0), 2.0)))) / (GLF_dead16h0));
                        donor_replacementGLF_dead16C = GLF_dead16fx(donor_replacementGLF_dead16x2);
                        donor_replacementGLF_dead16x2 = donor_replacementGLF_dead16x2 - ((2.0 * donor_replacementGLF_dead16C) / (donor_replacementGLF_dead16B + sign(donor_replacementGLF_dead16B) * sqrt(pow(donor_replacementGLF_dead16B, 2.0) - (4.0 * donor_replacementGLF_dead16A * donor_replacementGLF_dead16C))));
                        donor_replacementGLF_dead16x0 = donor_replacementGLF_dead16x1;
                        donor_replacementGLF_dead16x1 = donor_replacementGLF_dead16temp;
                        {
                            int GLF_live18cols = _GLF_FUZZED(((28520 & (-73896)) + (-70036)));
                            int GLF_live18looplimiter3 = 0;
                            uint GLF_live18matrix_number = _GLF_FUZZED(175664u);
                            {
                                if (GLF_live18looplimiter3 >= 7) {
                                    ;
                                }
                                GLF_live18looplimiter3++;
                                {
                                    {
                                        int GLF_live18looplimiter2 = 0;
                                        for (int GLF_live18rows = 2; GLF_live18rows <= 4; GLF_live18rows++) {
                                            if (GLF_live18looplimiter2 >= 7) {
                                                break;
                                            }
                                            GLF_live18looplimiter2++;
                                            {
                                                {
                                                    int GLF_live18looplimiter1 = 0;
                                                    for (int GLF_live18c = 0; GLF_live18c < GLF_live18cols; GLF_live18c++) {
                                                        if (GLF_live18looplimiter1 >= 7) {
                                                            break;
                                                        }
                                                        GLF_live18looplimiter1++;
                                                        {
                                                            {
                                                                int GLF_live18looplimiter0 = 0;
                                                                for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                                    if (GLF_live18looplimiter0 >= 7) {
                                                                        break;
                                                                    }
                                                                    GLF_live18looplimiter0++;
                                                                    {
                                                                        switch (GLF_live18matrix_number) {
                                                                            case 0u:
                                                                                GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                break;
                                                                            case 1u:
                                                                                GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                break;
                                                                            case 2u:
                                                                                GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                break;
                                                                            case 3u:
                                                                                GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                break;
                                                                            case 4u:
                                                                                GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                break;
                                                                            case 5u:
                                                                                GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                break;
                                                                            case 6u:
                                                                                GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                break;
                                                                            case 7u:
                                                                                GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                break;
                                                                            case 8u:
                                                                                GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                break;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_live18matrix_number = GLF_live18matrix_number + 1u;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                float GLF_live13th = _GLF_FUZZED(-862.304);
                {
                    {
                        ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(-80378, 12846));
                        {
                            float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                            ;
                        }
                    }
                    GLF_live13th = -GLF_live13th;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead6i = _GLF_FUZZED((bitfieldExtract(N, -46171, N) * ((-4136) ^ (-75647))));
        int donor_replacementGLF_dead6j = _GLF_FUZZED(N);
        if (donor_replacementGLF_dead6j < donor_replacementGLF_dead6i + 1) {
            ;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(37.24, 40.77, 3.8, -66.47);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead8i = _GLF_FUZZED(N);
        {
            GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 256)] = 0;
            {
                int GLF_live12looplimiter1 = 0;
                if (GLF_live12looplimiter1 >= 3) {
                    {
                        int GLF_live18looplimiter3 = 0;
                        if (GLF_live18looplimiter3 >= 7) {
                            ;
                        }
                    }
                    ;
                }
            }
            {
                int GLF_live19looplimiter2 = 0;
                if (GLF_live19looplimiter2 >= 6) {
                    ;
                }
            }
        }
    }
    int low = 0;
    int high = N - 1;
    for (int m = 1; m <= high; m = 2 * m) {
        {
            ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(-41157, 65624));
            {
                float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                ;
            }
        }
        for (int i = low; _GLF_IDENTITY(i, max(_GLF_IDENTITY(i, 0 | (_GLF_IDENTITY(i, (i) - 0))), i)) < high; i += 2 * m) {
            {
                vec2 GLF_live13a = _GLF_FUZZED(vec2(8.3, 8.6));
                float GLF_live13z = _GLF_FUZZED(2.3);
                if (GLF_live13a.y > GLF_live13a.x) {
                    GLF_live13z = GLF_live13a.x / GLF_live13a.y;
                } else {
                    GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                }
            }
            int from = i;
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead6color = _GLF_FUZZED(vec3(-1225.7134, 303.312, -9990.8973));
                do {
                    donor_replacementGLF_dead6color -= GLF_dead6palette(vec3(float(GLF_dead6obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead6obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead6injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead6injectionSwitch.x, float(GLF_dead6obj.numbers[2]) * 0.1, float(GLF_dead6obj.numbers[8]) * 0.1));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(50.61, -28.87, 56.97, -1.5);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            {
                                vec2 GLF_live20coord = _GLF_FUZZED((vec2(4.2, 2.3) * vec2(-413.816, 0.4)));
                                int GLF_live20i = _GLF_FUZZED(-95097);
                                vec4 GLF_live20texel = _GLF_FUZZED(vec4(-5.2, 7.3, (+vec3(7.5, -34.13, 197.109).t), 1.6));
                                {
                                    int GLF_live20looplimiter0 = 0;
                                    while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                        if (GLF_live20looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live20looplimiter0++;
                                        {
                                            GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                            GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                            GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                            GLF_live20i++;
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 1.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 1.0, 1.0, 0.0))))))) {
                                {
                                    discard;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    i++;
                } while (i != GLF_dead6obj.numbers[1]);
            }
            int mid = _GLF_IDENTITY(i + m, (i + m) | (i + m)) - 1;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(2.4, 1251.9573, -4.1, 2141.6657);
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead9iteration = _GLF_FUZZED(low);
                    float donor_replacementGLF_dead9xCoord = _GLF_FUZZED(716.909);
                    {
                        {
                            int GLF_live19looplimiter6 = 0;
                            for (int GLF_live19j = 0; GLF_live19j < 10; GLF_live19j++) {
                                if (GLF_live19looplimiter6 >= 6) {
                                    break;
                                }
                                GLF_live19looplimiter6++;
                                {
                                    GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)];
                                }
                            }
                        }
                    }
                    float donor_replacementGLF_dead9yCoord = _GLF_FUZZED(-5266.0259);
                    if (donor_replacementGLF_dead9iteration < 1000) {
                        if (_GLF_DEAD(false)) {
                            {
                                vec2 GLF_live20coord = _GLF_FUZZED((vec2(vec2(-70.93, -339.507).tss) + (-199.170)));
                                int GLF_live20i = _GLF_FUZZED(((-94696) + (-73703)));
                                vec4 GLF_live20texel = _GLF_FUZZED((vec4(-35.18, -1.6, -380.579, -34.27) + vec4(-53.36, -516.577, -3.5, 2055.1529)));
                                {
                                    GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                    GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                    GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                    GLF_live20i++;
                                }
                            }
                            float donor_replacementGLF_dead16A = _GLF_FUZZED(sqrt(593.964));
                            float donor_replacementGLF_dead16x0 = _GLF_FUZZED(donor_replacementGLF_dead9yCoord);
                            float donor_replacementGLF_dead16x2 = _GLF_FUZZED(determinant(mat4(mat2(-644.070, -3.8, -722.808, 5.0))));
                            {
                                float GLF_dead16h0 = donor_replacementGLF_dead16x0 - donor_replacementGLF_dead16x2;
                                float GLF_dead16h1 = donor_replacementGLF_dead9xCoord - donor_replacementGLF_dead16x2;
                                float GLF_dead16k0 = GLF_dead16fx(donor_replacementGLF_dead16x0) - GLF_dead16fx(donor_replacementGLF_dead16x2);
                                {
                                    int GLF_live18cols = _GLF_FUZZED(-9560);
                                    uint GLF_live18matrix_number = _GLF_FUZZED(uvec4(92954u, 26882u, 16487u, 76290u).q);
                                    {
                                        int GLF_live18looplimiter2 = 0;
                                        for (int GLF_live18rows = 2; GLF_live18rows <= 4; GLF_live18rows++) {
                                            if (GLF_live18looplimiter2 >= 7) {
                                                break;
                                            }
                                            GLF_live18looplimiter2++;
                                            {
                                                {
                                                    int GLF_live18looplimiter1 = 0;
                                                    for (int GLF_live18c = 0; GLF_live18c < GLF_live18cols; GLF_live18c++) {
                                                        if (GLF_live18looplimiter1 >= 7) {
                                                            break;
                                                        }
                                                        GLF_live18looplimiter1++;
                                                        {
                                                            {
                                                                int GLF_live18looplimiter0 = 0;
                                                                for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                                    if (GLF_live18looplimiter0 >= 7) {
                                                                        break;
                                                                    }
                                                                    GLF_live18looplimiter0++;
                                                                    {
                                                                        switch (GLF_live18matrix_number) {
                                                                            case 0u:
                                                                                GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                break;
                                                                            case 1u:
                                                                                GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                break;
                                                                            case 2u:
                                                                                GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                break;
                                                                            case 3u:
                                                                                GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                break;
                                                                            case 4u:
                                                                                GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                break;
                                                                            case 5u:
                                                                                GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                break;
                                                                            case 6u:
                                                                                GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                break;
                                                                            case 7u:
                                                                                GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                break;
                                                                            case 8u:
                                                                                GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                break;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_live18matrix_number = GLF_live18matrix_number + 1u;
                                            }
                                        }
                                    }
                                }
                                float GLF_dead16k1 = GLF_dead16fx(donor_replacementGLF_dead9xCoord) - GLF_dead16fx(donor_replacementGLF_dead16x2);
                                {
                                    int GLF_live18looplimiter3 = 0;
                                    uint GLF_live18matrix_number = _GLF_FUZZED((uvec2(199022u, 48724u) ^ uvec2(65628u, 172504u)).g);
                                    for (int GLF_live18cols = 2; GLF_live18cols <= 4; GLF_live18cols++) {
                                        if (GLF_live18looplimiter3 >= 7) {
                                            break;
                                        }
                                        GLF_live18looplimiter3++;
                                        {
                                            {
                                                int GLF_live18looplimiter2 = 0;
                                                for (int GLF_live18rows = 2; GLF_live18rows <= 4; GLF_live18rows++) {
                                                    if (GLF_live18looplimiter2 >= 7) {
                                                        break;
                                                    }
                                                    GLF_live18looplimiter2++;
                                                    {
                                                        {
                                                            int GLF_live18looplimiter1 = 0;
                                                            for (int GLF_live18c = 0; GLF_live18c < GLF_live18cols; GLF_live18c++) {
                                                                if (GLF_live18looplimiter1 >= 7) {
                                                                    break;
                                                                }
                                                                GLF_live18looplimiter1++;
                                                                {
                                                                    {
                                                                        int GLF_live18looplimiter0 = 0;
                                                                        for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                                            if (GLF_live18looplimiter0 >= 7) {
                                                                                break;
                                                                            }
                                                                            GLF_live18looplimiter0++;
                                                                            {
                                                                                switch (GLF_live18matrix_number) {
                                                                                    case 0u:
                                                                                        GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                        break;
                                                                                    case 1u:
                                                                                        GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                        break;
                                                                                    case 2u:
                                                                                        GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                        break;
                                                                                    case 3u:
                                                                                        GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                        break;
                                                                                    case 4u:
                                                                                        GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                        break;
                                                                                    case 5u:
                                                                                        GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                        break;
                                                                                    case 6u:
                                                                                        GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                        break;
                                                                                    case 7u:
                                                                                        GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                        break;
                                                                                    case 8u:
                                                                                        GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                        break;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        GLF_live18matrix_number = GLF_live18matrix_number + 1u;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                donor_replacementGLF_dead9yCoord = donor_replacementGLF_dead16x2;
                                donor_replacementGLF_dead16A = (((GLF_dead16h1) * (GLF_dead16k0)) - ((GLF_dead16h0) * (GLF_dead16k1))) / ((pow((GLF_dead16h0), 2.0) * (GLF_dead16h1)) - (pow((GLF_dead16h1), 2.0) * (GLF_dead16h0)));
                                {
                                    vec2 GLF_live19color = _GLF_FUZZED((vec2(14.03, -3.8) * vec2(7857.3092, 3.4)));
                                    int GLF_live19i = _GLF_FUZZED(ivec4(5842, -17492, 27734, 96041).s);
                                    vec3 GLF_live19vecCoor = _GLF_FUZZED((false ? vec3(60.60, 8383.9036, 899.435) : vec3(3246.8840, 191.870, -79.87)));
                                    if (int(GLF_live19gl_FragCoord[1]) < 240) {
                                        GLF_live19color = fract(asinh(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[6]))));
                                        GLF_live19color.y -= isnan(float(GLF_live19i)) ? tanh(GLF_live19gl_FragCoord.x) : atanh(GLF_live19gl_FragCoord.y);
                                        ;
                                    } else if (int(GLF_live19gl_FragCoord[1]) < 270) {
                                        GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[7]))));
                                        GLF_live19color.y *= mix(normalize(GLF_live19vecCoor), normalize(vec3(GLF_live19color, degrees(GLF_live19color.x))), GLF_live19injectionSwitch.x).y;
                                        ;
                                    } else {
                                        ;
                                    }
                                }
                                donor_replacementGLF_dead9xCoord = (((GLF_dead16k0) - (donor_replacementGLF_dead16A * (pow((GLF_dead16h0), 2.0)))) / (GLF_dead16h0));
                                donor_replacementGLF_dead9xCoord = GLF_dead16fx(donor_replacementGLF_dead16x2);
                                {
                                    {
                                        ;
                                    }
                                }
                                donor_replacementGLF_dead16x2 = donor_replacementGLF_dead16x2 - ((2.0 * donor_replacementGLF_dead9xCoord) / (donor_replacementGLF_dead9xCoord + sign(donor_replacementGLF_dead9xCoord) * sqrt(pow(donor_replacementGLF_dead9xCoord, 2.0) - (4.0 * donor_replacementGLF_dead16A * donor_replacementGLF_dead9xCoord))));
                                donor_replacementGLF_dead16x0 = donor_replacementGLF_dead9xCoord;
                                donor_replacementGLF_dead9xCoord = donor_replacementGLF_dead9yCoord;
                            }
                        }
                        ;
                    } else {
                        ;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int to = min(i + 2 * m - 1, high);
            merge(from, mid, to);
        }
    }
}

void main() {
    int i = int(injectionSwitch.x);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            vec2 GLF_live20coord = _GLF_FUZZED(vec2(8.9, -16.33));
            int GLF_live20i = _GLF_FUZZED((((-66285) > 53582) ? 19137 : int(136056u)));
            vec4 GLF_live20texel = _GLF_FUZZED(((mat3(-4.1, -7.3, -7.6, 6.4, 783.022, 8077.3105, 132.178, -9.3, -746.148) * vec3(1.2, 6044.4158, -2.6)) * mat4x3(7313.1671)));
            {
                GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                GLF_live20i++;
            }
        }
        _GLF_color = sinh(fract(vec4(-45.70, -83.52, -2.3, 50.26)));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < 0.0), ((gl_FragCoord.x < 0.0)) && true)))) {
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead15pab = _GLF_FUZZED(float(91547));
            float donor_replacementGLF_dead15pbc = _GLF_FUZZED(-955.477);
            if (!((donor_replacementGLF_dead15pab < 0.0 && donor_replacementGLF_dead15pbc < 0.0) || (donor_replacementGLF_dead15pab >= 0.0 && donor_replacementGLF_dead15pbc >= 0.0))) {
                ;
            }
            {
                ivec2 GLF_live17pos = _GLF_FUZZED(((mat3x2(575.698, -98.89, -5.0, 39.15, 360.136, -75.43) != mat3x2(3.4, 79.92, 3945.9833, 2.4, -3.3, 9.5)) ? ivec2(38146, 81943) : ivec2(27036, -63125)));
                {
                    int GLF_live17looplimiter0 = 0;
                    while (GLF_live17pos.y != 256) {
                        if (GLF_live17looplimiter0 >= 3) {
                            break;
                        }
                        GLF_live17looplimiter0++;
                        {
                            if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                ;
                            }
                            GLF_live17pos.y++;
                        }
                    }
                }
            }
        }
        int donor_replacementGLF_dead5iteration = _GLF_FUZZED(bitfieldExtract((i * i), i, N));
        {
            ;
            {
                {
                    ;
                }
            }
        }
    }
    do {
        switch (i) {
            case 0:
                data[i] = 4;
                {
                    {
                        {
                            vec2 GLF_live20coord = _GLF_FUZZED(vec4(5.0, 6.3, -7674.2529, 278.244).br);
                            int GLF_live20i = _GLF_FUZZED(13944);
                            int GLF_live20looplimiter0 = 0;
                            vec4 GLF_live20texel = _GLF_FUZZED(vec4(-1.7, 2.6, 57.58, 55.06));
                            {
                                if (GLF_live20looplimiter0 >= 7) {
                                    ;
                                }
                                GLF_live20looplimiter0++;
                                {
                                    GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                    GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                    GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                    GLF_live20i++;
                                }
                            }
                        }
                        vec2 GLF_live13a = _GLF_FUZZED((vec2(4.5, 78.44) + (vec2(43.02, 3684.9409) * 12.94)));
                        float GLF_live13z = _GLF_FUZZED(-9.7);
                        if (GLF_live13a.y > GLF_live13a.x) {
                            {
                                {
                                    ;
                                }
                            }
                            GLF_live13z = GLF_live13a.x / GLF_live13a.y;
                        } else {
                            GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(26.26, 36.83, -187.103, 5.4);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                break;
                {
                    {
                        ;
                    }
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead17i = _GLF_FUZZED(ivec4(41430, -46057, -59955, -36394).b);
                    int donor_replacementGLF_dead17v = _GLF_FUZZED(int(false));
                    for (donor_replacementGLF_dead17i = 0; donor_replacementGLF_dead17i < i; donor_replacementGLF_dead17i++) {
                        donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                    }
                }
                {
                    int GLF_live17looplimiter0 = 0;
                    ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(-36793, -887));
                    {
                        if (GLF_live17looplimiter0 >= 3) {
                            ;
                        }
                        GLF_live17looplimiter0++;
                        {
                            if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                ;
                            }
                            GLF_live17pos.y++;
                        }
                    }
                }
            case 1:
                data[i] = 3;
                break;
                {
                    vec2 GLF_live2coord = _GLF_FUZZED(vec2(38.84, 7.3));
                    int GLF_live2i = _GLF_FUZZED(int(((_GLF_IDENTITY(false ? _GLF_IDENTITY(34771u, uint(uint(34771u))) : 186643u, ~(~(false ? _GLF_IDENTITY(34771u, uint(uint(34771u))) : 186643u)))) - 197415u)));
                    {
                        ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(13076, -13795));
                        {
                            if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                ;
                            }
                            GLF_live17pos.y++;
                        }
                    }
                    {
                        float GLF_live13th = _GLF_FUZZED(81.69);
                        {
                            GLF_live13th = 0.5 - GLF_live13th;
                        }
                        {
                            vec2 GLF_live19color = _GLF_FUZZED(vec2(3.1, -8.3));
                            vec3 GLF_live19vecCoor = _GLF_FUZZED(vec3(4979.0415, 661.663, -7347.1963));
                            {
                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[7]))));
                                GLF_live19color.y *= mix(normalize(GLF_live19vecCoor), normalize(vec3(GLF_live19color, degrees(GLF_live19color.x))), GLF_live19injectionSwitch.x).y;
                                ;
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            vec2 GLF_live13v = _GLF_FUZZED((mat2(488.939, -2307.1826, -8357.3260, 507.633) * vec2(7.4, -5.7)));
                            if (length(GLF_live13v) < 0.001) {
                                ;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        ;
                                    }
                                }
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            vec2 GLF_live20coord = _GLF_FUZZED(vec2(-47.81).st);
                            int GLF_live20i = _GLF_FUZZED(((62077 + (-31886)) ^ (61727 ^ (33527 * 52914))));
                            vec4 GLF_live20texel = _GLF_FUZZED(vec4(1.5, 86.93, -603.248, -8.5));
                            {
                                int GLF_live20looplimiter0 = 0;
                                while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                    if (GLF_live20looplimiter0 >= 7) {
                                        break;
                                    }
                                    GLF_live20looplimiter0++;
                                    {
                                        GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                        GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                        GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                        GLF_live20i++;
                                    }
                                }
                            }
                        }
                        _GLF_color = (vec4(4.2, -5284.8018, -7473.5630, -6525.3731) + vec4(59.05, 19.73, -597.827, -45.57));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    int GLF_live2looplimiter0 = 0;
                    vec4 GLF_live2res = _GLF_FUZZED(_GLF_IDENTITY(vec4(-1887.7401, -2.0, 7334.8291, 3.0), clamp(vec4(-1887.7401, -2.0, 7334.8291, 3.0), vec4(-1887.7401, -2.0, 7334.8291, 3.0), vec4(-1887.7401, -2.0, 7334.8291, 3.0))));
                    float GLF_live2uvstep = _GLF_FUZZED(float(152975u));
                    {
                        ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(ivec3(24302, -57004, 12639)));
                        {
                            if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                ;
                            }
                            GLF_live17pos.y++;
                        }
                    }
                    for (int GLF_live2j = 0; GLF_live2j < 3; GLF_live2j++) {
                        {
                            vec2 GLF_live20coord = _GLF_FUZZED(vec2(-8.5, 35.24));
                            int GLF_live20i = _GLF_FUZZED((+int(false)));
                            vec4 GLF_live20texel = _GLF_FUZZED(vec4(4.5, 9592.1583, -3.6, -4319.0186));
                            {
                                int GLF_live20looplimiter0 = 0;
                                while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                    if (GLF_live20looplimiter0 >= 7) {
                                        break;
                                    }
                                    GLF_live20looplimiter0++;
                                    {
                                        GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                        GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                        GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                        GLF_live20i++;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY((false), false || (_GLF_IDENTITY((false), ((false)) || false))) && true))) {
                            {
                                {
                                    vec2 GLF_live20coord = _GLF_FUZZED(vec4(5.3, 9.6, -1.2, -35.19).br);
                                    int GLF_live20i = _GLF_FUZZED(93443);
                                    vec4 GLF_live20texel = _GLF_FUZZED(vec4(48.58, 25.13, -4.8, -73.39));
                                    {
                                        int GLF_live20looplimiter0 = 0;
                                        while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                            if (GLF_live20looplimiter0 >= 7) {
                                                break;
                                            }
                                            GLF_live20looplimiter0++;
                                            {
                                                GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                                GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                                GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                                GLF_live20i++;
                                            }
                                        }
                                    }
                                }
                                {
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    vec2 GLF_live13a = _GLF_FUZZED(((2026.4177 - vec2(-449.667, 6.8)) * vec2(-6471.8753, -7.7)));
                                    float GLF_live13z = _GLF_FUZZED(5.3);
                                    if (GLF_live13a.y > GLF_live13a.x) {
                                        GLF_live13z = GLF_live13a.x / GLF_live13a.y;
                                    } else {
                                        GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                                    }
                                }
                                break;
                            }
                        }
                        if (GLF_live2looplimiter0 >= 3) {
                            break;
                        }
                        GLF_live2looplimiter0++;
                        {
                            {
                                int GLF_live18looplimiter1 = 0;
                                if (GLF_live18looplimiter1 >= 7) {
                                    ;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-1.6, -2.8, -6.2, -151.241);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                {
                                    int GLF_live19high = _GLF_FUZZED((ivec4(69607, 15422, -57034, 25042) & 20441).y);
                                    int GLF_live19low = _GLF_FUZZED(((-96080) + 23984));
                                    {
                                        int GLF_live19looplimiter4 = 0;
                                        for (int GLF_live19m = 1; GLF_live19m <= GLF_live19high; GLF_live19m = 2 * GLF_live19m) {
                                            if (GLF_live19looplimiter4 >= 6) {
                                                break;
                                            }
                                            GLF_live19looplimiter4++;
                                            {
                                                {
                                                    int GLF_live19looplimiter3 = 0;
                                                    for (int GLF_live19i = GLF_live19low; GLF_live19i < GLF_live19high; GLF_live19i += 2 * GLF_live19m) {
                                                        if (GLF_live19looplimiter3 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live19looplimiter3++;
                                                        {
                                                            int GLF_live19from = GLF_live19i;
                                                            int GLF_live19mid = GLF_live19i + GLF_live19m - 1;
                                                            int GLF_live19to = min(GLF_live19i + 2 * GLF_live19m - 1, GLF_live19high);
                                                            GLF_live19merge(GLF_live19from, GLF_live19mid, GLF_live19to);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            GLF_live2res += texture(GLF_live2tex, GLF_live2coord + vec2(float(GLF_live2i - 1) * GLF_live2uvstep, float(GLF_live2j - 1) * _GLF_IDENTITY(GLF_live2uvstep, float(mat4x3(GLF_live2uvstep, 1.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 0.0, 0.0, abs(0.0))), dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 0.0, 0.0, abs(0.0)))), 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0))))) * GLF_live2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2i * 3 + GLF_live2j, 9)];
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            {
                                discard;
                                {
                                    int GLF_live18looplimiter2 = 0;
                                    if (GLF_live18looplimiter2 >= 7) {
                                        ;
                                    }
                                }
                            }
                            {
                                int GLF_live19j = _GLF_FUZZED(7970);
                                {
                                    GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)];
                                }
                            }
                        }
                        int donor_replacementGLF_dead4j = _GLF_FUZZED(i);
                        {
                            vec2 GLF_live20coord = _GLF_FUZZED((6687.9370 + vec2(0.3, 74.28)));
                            int GLF_live20i = _GLF_FUZZED(61565);
                            int GLF_live20looplimiter0 = 0;
                            vec4 GLF_live20texel = _GLF_FUZZED((mat3x4(mat4(-63.17, 61.19, 86.66, 634.588, 6.3, 91.11, -7530.7296, -274.649, 4.0, 5.7, 7.3, 6.9, -108.551, -1.0, -0.0, 84.94)) * vec3(2.1, -4.5, 3.8)));
                            while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                if (GLF_live20looplimiter0 >= 7) {
                                    break;
                                }
                                GLF_live20looplimiter0++;
                                {
                                    GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                    GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                    GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                    GLF_live20i++;
                                }
                            }
                        }
                        vec3 donor_replacementGLF_dead4m = _GLF_FUZZED(asin(mod(vec3(-1.5, -7141.9586, 9.2), -9.6)));
                        vec2 donor_replacementGLF_dead4n = _GLF_FUZZED(vec2(-25.78, -3.9));
                        {
                            {
                                ;
                            }
                        }
                        for (int GLF_dead4i = -1; GLF_dead4i <= int(GLF_dead4injectionSwitch.y); GLF_dead4i++) {
                            vec2 GLF_dead4g = vec2(float(donor_replacementGLF_dead4j), float(GLF_dead4i));
                            vec2 GLF_dead4o = mix(donor_replacementGLF_dead4n, GLF_dead4g, 0.2);
                            if (GLF_dead4injectionSwitch.x < (donor_replacementGLF_dead4m.x)) {
                                int GLF_dead4k = 1;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                    {
                                        GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                    }
                                }
                                while (GLF_dead4k >= 0) {
                                    GLF_dead4o = GLF_dead4o + GLF_dead4o;
                                    GLF_dead4k--;
                                }
                                _GLF_IDENTITY(donor_replacementGLF_dead4m = vec3(GLF_dead4injectionSwitch.x, cos(GLF_dead4o)), (false ? _GLF_FUZZED(donor_replacementGLF_dead4m) : (donor_replacementGLF_dead4m = vec3(GLF_dead4injectionSwitch.x, cos(GLF_dead4o)))));
                                {
                                    vec2 GLF_live19color = _GLF_FUZZED(vec2(7227.2211, -321.272).ts);
                                    int GLF_live19i = _GLF_FUZZED(-8584);
                                    vec3 GLF_live19vecCoor = _GLF_FUZZED(vec3(564.081, 3.8, -8.3));
                                    if (int(GLF_live19gl_FragCoord[1]) < 60) {
                                        GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[1]))));
                                        GLF_live19color[1] *= atan(faceforward(GLF_live19injectionSwitch, GLF_live19color.xx, GLF_live19vecCoor.yx).y);
                                        ;
                                    } else if (int(GLF_live19gl_FragCoord[1]) < 90) {
                                        GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[2]))));
                                        GLF_live19color.x += atanh(GLF_live19color.x) * cosh(GLF_live19injectionSwitch.y) * smoothstep(GLF_live19color, GLF_live19injectionSwitch, GLF_live19gl_FragCoord.yy).x;
                                        ;
                                    } else if (int(GLF_live19gl_FragCoord[1]) < 120) {
                                        GLF_live19color = fract(acosh(clamp(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[3])), 1.0, 1000.0)));
                                        GLF_live19color.x += (isnan(GLF_live19gl_FragCoord.x) ? log2(GLF_live19gl_FragCoord.x) : log2(GLF_live19gl_FragCoord.y));
                                        ;
                                    } else if (int(GLF_live19gl_FragCoord[1]) < 150) {
                                        ;
                                    } else if (int(GLF_live19gl_FragCoord[1]) < 180) {
                                        GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[4]))));
                                        GLF_live19color[1] += asinh(GLF_live19gl_FragCoord.y * ldexp(GLF_live19color.y, -GLF_live19i));
                                        ;
                                    } else if (int(GLF_live19gl_FragCoord[1]) < 210) {
                                        GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[5]))));
                                        GLF_live19color.y -= tanh(GLF_live19color.x) / cosh(GLF_live19color.y);
                                        ;
                                    } else if (int(GLF_live19gl_FragCoord[1]) < 240) {
                                        GLF_live19color = fract(asinh(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[6]))));
                                        GLF_live19color.y -= isnan(float(GLF_live19i)) ? tanh(GLF_live19gl_FragCoord.x) : atanh(GLF_live19gl_FragCoord.y);
                                        ;
                                    } else if (int(GLF_live19gl_FragCoord[1]) < 270) {
                                        GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[7]))));
                                        GLF_live19color.y *= mix(normalize(GLF_live19vecCoor), normalize(vec3(GLF_live19color, degrees(GLF_live19color.x))), GLF_live19injectionSwitch.x).y;
                                        ;
                                    } else {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                }
            case 2:
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        vec2 GLF_live19color = _GLF_FUZZED((vec3(-4.3, -841.125, 88.69) * mat2x3(310.044, -59.50, 7806.6513, 409.998, 5.3, -980.591)));
                        vec3 GLF_live19vecCoor = _GLF_FUZZED((vec3(-4387.5377, -8.7, -2.6) - 180.062));
                        {
                            GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[1]))));
                            GLF_live19color[1] *= atan(faceforward(GLF_live19injectionSwitch, GLF_live19color.xx, GLF_live19vecCoor.yx).y);
                            ;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(7906.0776, 6425.9059, 147.022, -68.74);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                data[i] = 2;
                {
                    ivec2 GLF_live17pos = _GLF_FUZZED((41246 & ivec2(-20435, 41805)));
                    if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                        float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    {
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead9iteration = _GLF_FUZZED(i);
                        {
                            ivec2 GLF_live17pos = _GLF_FUZZED((ivec2(85184, -43143) | ((-48743) ^ ivec2(-45615, -65391))));
                            if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                ;
                            }
                        }
                        {
                            ;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead9xCoord = _GLF_FUZZED(length(GLF_dead4gl_FragCoord));
                    float donor_replacementGLF_dead9yCoord = _GLF_FUZZED(-764.350);
                    if (i < 1000) {
                        ;
                        {
                            int GLF_live17looplimiter0 = 0;
                            if (GLF_live17looplimiter0 >= 3) {
                                ;
                            }
                        }
                    } else {
                        ;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            {
                                ;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = dFdxCoarse(vec4(9.3, -9891.8936, 9426.6095, 5841.6548));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            {
                                int GLF_live12looplimiter1 = 0;
                                if (GLF_live12looplimiter1 >= 3) {
                                    {
                                        int GLF_live19high = _GLF_FUZZED(int(true));
                                        int GLF_live19looplimiter4 = 0;
                                        int GLF_live19low = _GLF_FUZZED(43813);
                                        for (int GLF_live19m = 1; GLF_live19m <= GLF_live19high; GLF_live19m = 2 * GLF_live19m) {
                                            if (GLF_live19looplimiter4 >= 6) {
                                                break;
                                            }
                                            GLF_live19looplimiter4++;
                                            {
                                                {
                                                    int GLF_live19looplimiter3 = 0;
                                                    for (int GLF_live19i = GLF_live19low; GLF_live19i < GLF_live19high; GLF_live19i += 2 * GLF_live19m) {
                                                        if (GLF_live19looplimiter3 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live19looplimiter3++;
                                                        {
                                                            int GLF_live19from = GLF_live19i;
                                                            int GLF_live19mid = GLF_live19i + GLF_live19m - 1;
                                                            int GLF_live19to = min(GLF_live19i + 2 * GLF_live19m - 1, GLF_live19high);
                                                            GLF_live19merge(GLF_live19from, GLF_live19mid, GLF_live19to);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    ;
                                }
                            }
                            {
                                vec2 GLF_live20coord = _GLF_FUZZED(((vec2(2503.6899, 4.0) * (-7.8)) + 5585.8014));
                                int GLF_live20i = _GLF_FUZZED(int(true));
                                vec4 GLF_live20texel = _GLF_FUZZED(vec4(134.000, -558.022, -87.30, -7.7).garb);
                                {
                                    int GLF_live20looplimiter0 = 0;
                                    while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                        if (GLF_live20looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live20looplimiter0++;
                                        {
                                            GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                            GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                            GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                            GLF_live20i++;
                                        }
                                    }
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                break;
            case 3:
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead8canwalk = _GLF_FUZZED(false);
                    int donor_replacementGLF_dead8i = _GLF_FUZZED(N);
                    ivec2 donor_replacementGLF_dead8ipos = _GLF_FUZZED(ivec2(82199, 16580));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(7.4, -2.6, -8144.1427, 119.722);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    ivec2 donor_replacementGLF_dead8p = _GLF_FUZZED(ivec2(97241, 38836));
                    {
                        {
                            ;
                        }
                    }
                    {
                        vec2 GLF_live13a = _GLF_FUZZED((93.55 * vec2(-409.622, 4.6)));
                        float GLF_live13z = _GLF_FUZZED(float(116520u));
                        {
                            GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead17v = _GLF_FUZZED(findLSB(20916));
                            {
                                donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                            }
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                    int donor_replacementGLF_dead8v = _GLF_FUZZED(findMSB(uvec2(138630u, 199784u))[1]);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            {
                                int GLF_live18c = _GLF_FUZZED((true ? (-20344) : 81498));
                                int GLF_live18looplimiter1 = 0;
                                uint GLF_live18matrix_number = _GLF_FUZZED((118550u | 53198u));
                                int GLF_live18rows = _GLF_FUZZED(24649);
                                {
                                    if (GLF_live18looplimiter1 >= 7) {
                                        ;
                                    }
                                    GLF_live18looplimiter1++;
                                    {
                                        {
                                            int GLF_live18looplimiter0 = 0;
                                            for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                if (GLF_live18looplimiter0 >= 7) {
                                                    break;
                                                }
                                                GLF_live18looplimiter0++;
                                                {
                                                    switch (GLF_live18matrix_number) {
                                                        case 0u:
                                                            GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                            break;
                                                        case 1u:
                                                            GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                            break;
                                                        case 2u:
                                                            GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                            break;
                                                        case 3u:
                                                            GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                            break;
                                                        case 4u:
                                                            GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                            break;
                                                        case 5u:
                                                            GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                            break;
                                                        case 6u:
                                                            GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                            break;
                                                        case 7u:
                                                            GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                            break;
                                                        case 8u:
                                                            GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            vec2 GLF_live13a = _GLF_FUZZED(vec2(-1732.6077, 9.2));
                            float GLF_live13th = _GLF_FUZZED(float((165561u - 10269u)));
                            if (GLF_live13a.y < GLF_live13a.x) {
                                GLF_live13th = 0.5 - GLF_live13th;
                            }
                        }
                        _GLF_color = (mod(vec2(-4300.4125, -8.1), vec2(-8234.1040, -299.202)) * mat4x2(-9.4, -6.4, -8553.4681, -7.3, 2.2, 1171.9310, 390.651, 7.9));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    GLF_dead16_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                    {
                                        int GLF_live17looplimiter0 = 0;
                                        ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(60803, -58587));
                                        {
                                            if (GLF_live17looplimiter0 >= 3) {
                                                ;
                                            }
                                            GLF_live17looplimiter0++;
                                            {
                                                if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                    float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                    ;
                                                }
                                                GLF_live17pos.y++;
                                            }
                                        }
                                    }
                                }
                                {
                                    int GLF_live17looplimiter0 = 0;
                                    ivec2 GLF_live17pos = _GLF_FUZZED((60526 & ivec2(96441)));
                                    {
                                        if (GLF_live17looplimiter0 >= 3) {
                                            ;
                                        }
                                        GLF_live17looplimiter0++;
                                        {
                                            if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                ;
                                            }
                                            GLF_live17pos.y++;
                                        }
                                    }
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        donor_replacementGLF_dead8v++;
                        int GLF_dead8directions = 0;
                        if (donor_replacementGLF_dead8p.x > 0 && GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x - 2) + (donor_replacementGLF_dead8p.y) * 16, 256)] == 0) {
                            GLF_dead8directions += 1;
                        }
                        if (donor_replacementGLF_dead8p.y > 0 && GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y - 2) * 16, 256)] == 0) {
                            GLF_dead8directions += 1;
                        }
                        if (donor_replacementGLF_dead8p.x < 14 && GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x + 2) + (donor_replacementGLF_dead8p.y) * 16, 256)] == 0) {
                            GLF_dead8directions += 1;
                            {
                                int GLF_live18c = _GLF_FUZZED(-19320);
                                int GLF_live18looplimiter1 = 0;
                                uint GLF_live18matrix_number = _GLF_FUZZED(180198u);
                                int GLF_live18rows = _GLF_FUZZED((((-49906) & (-23536)) * ((-24149) + 59299)));
                                {
                                    if (GLF_live18looplimiter1 >= 7) {
                                        ;
                                    }
                                    GLF_live18looplimiter1++;
                                    {
                                        {
                                            int GLF_live18looplimiter0 = 0;
                                            for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                if (GLF_live18looplimiter0 >= 7) {
                                                    break;
                                                }
                                                GLF_live18looplimiter0++;
                                                {
                                                    switch (GLF_live18matrix_number) {
                                                        case 0u:
                                                            GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                            break;
                                                        case 1u:
                                                            GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                            break;
                                                        case 2u:
                                                            GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                            break;
                                                        case 3u:
                                                            GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                            break;
                                                        case 4u:
                                                            GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                            break;
                                                        case 5u:
                                                            GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                            break;
                                                        case 6u:
                                                            GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                            break;
                                                        case 7u:
                                                            GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                            break;
                                                        case 8u:
                                                            GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (donor_replacementGLF_dead8p.y < 14 && GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y + 2) * 16, 256)] == 0) {
                            GLF_dead8directions += 1;
                        }
                        if (GLF_dead8directions == 0) {
                            {
                                float GLF_live13th = _GLF_FUZZED(-7.5);
                                {
                                    int GLF_live18looplimiter6 = 0;
                                    if (GLF_live18looplimiter6 >= 7) {
                                        ;
                                    }
                                }
                                {
                                    GLF_live13th = 1.0 - GLF_live13th;
                                    {
                                        int GLF_live17looplimiter0 = 0;
                                        if (GLF_live17looplimiter0 >= 3) {
                                            ;
                                        }
                                    }
                                }
                            }
                            donor_replacementGLF_dead8canwalk = false;
                            int GLF_dead8j = _GLF_FUZZED(max(74743, (26563 & (-13239))));
                            for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < 8; donor_replacementGLF_dead8i++) {
                                {
                                    vec2 GLF_live20coord = _GLF_FUZZED(vec2(6892.0714, 6.1));
                                    int GLF_live20i = _GLF_FUZZED(-63743);
                                    int GLF_live20looplimiter0 = 0;
                                    vec4 GLF_live20texel = _GLF_FUZZED(vec4(-9505.0339, -682.092, -7875.6508, 645.426));
                                    while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                        if (GLF_live20looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live20looplimiter0++;
                                        {
                                            GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                            GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                            GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                            GLF_live20i++;
                                        }
                                    }
                                }
                                for (GLF_dead8j = 0; GLF_dead8j < 8; GLF_dead8j++) {
                                    if (GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8j * 2 + donor_replacementGLF_dead8i * 2 * 16, 256)] == 0) {
                                        donor_replacementGLF_dead8p.x = GLF_dead8j * 2;
                                        donor_replacementGLF_dead8p.y = donor_replacementGLF_dead8i * 2;
                                        donor_replacementGLF_dead8canwalk = true;
                                        {
                                            {
                                                ;
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
                            GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y) * 16, 256)] = 1;
                        } else {
                            {
                                ivec2 GLF_live17pos = _GLF_FUZZED(((-99878) + ((83963 ^ (-56694)) - ivec2(57778, -32794))));
                                if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                    float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                    ;
                                }
                            }
                            {
                                {
                                    ;
                                }
                            }
                            int GLF_dead8d = donor_replacementGLF_dead8v % GLF_dead8directions;
                            donor_replacementGLF_dead8v += GLF_dead8directions;
                            if (GLF_dead8d >= 0 && donor_replacementGLF_dead8p.x > 0 && GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x - 2) + (donor_replacementGLF_dead8p.y) * 16, 256)] == 0) {
                                GLF_dead8d--;
                                GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y) * 16, 256)] = 1;
                                GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x - 1) + (donor_replacementGLF_dead8p.y) * 16, 256)] = 1;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = smoothstep(vec4(181.241, 5.5, 3.9, 3102.1743), vec4(-7474.6651, -280.698, -430.146, 603.972), vec4(767.148, 3.8, -748.663, -7541.8914));
                                    {
                                        int GLF_live18looplimiter1 = 0;
                                        if (GLF_live18looplimiter1 >= 7) {
                                            ;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x - 2) + (donor_replacementGLF_dead8p.y) * 16, 256)] = 1;
                                donor_replacementGLF_dead8p.x -= 2;
                            }
                            {
                                int GLF_live12c_im = _GLF_FUZZED(20072);
                                int GLF_live12c_re = _GLF_FUZZED(30805);
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    float donor_replacementGLF_dead15pab = _GLF_FUZZED(54.84);
                                    float donor_replacementGLF_dead15pbc = _GLF_FUZZED(GLF_dead4gl_FragCoord.g);
                                    if (!((donor_replacementGLF_dead15pab < 0.0 && donor_replacementGLF_dead15pbc < 0.0) || (donor_replacementGLF_dead15pab >= 0.0 && donor_replacementGLF_dead15pbc >= 0.0))) {
                                        ;
                                    }
                                }
                                int GLF_live12iteration = _GLF_FUZZED(int(false));
                                int GLF_live12looplimiter0 = 0;
                                int GLF_live12x = _GLF_FUZZED(-19001);
                                int GLF_live12y = _GLF_FUZZED(ivec4(-17260, -94806, 88343, 35296).w);
                                for (int GLF_live12k = 0; GLF_live12k < 1000; GLF_live12k++) {
                                    if (GLF_live12looplimiter0 >= 3) {
                                        break;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        vec2 donor_replacementGLF_dead15pos = _GLF_FUZZED(vec2(4580.9220, -972.740));
                                        if (GLF_dead15pointInTriangle(donor_replacementGLF_dead15pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                                            GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        } else {
                                            GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                        }
                                    }
                                    {
                                        ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(-76756, 90652));
                                        {
                                            int GLF_live17looplimiter0 = 0;
                                            while (GLF_live17pos.y != 256) {
                                                if (GLF_live17looplimiter0 >= 3) {
                                                    break;
                                                }
                                                GLF_live17looplimiter0++;
                                                {
                                                    if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                        float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                        ;
                                                    }
                                                    GLF_live17pos.y++;
                                                }
                                            }
                                        }
                                    }
                                    GLF_live12looplimiter0++;
                                    {
                                        if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 262144) {
                                            break;
                                        }
                                        int GLF_live12x_new = ((GLF_live12x * GLF_live12x - GLF_live12y * GLF_live12y) / 256 + GLF_live12c_re);
                                        GLF_live12y = (2 * GLF_live12x * GLF_live12y / 256 + GLF_live12c_im);
                                        GLF_live12x = GLF_live12x_new;
                                        GLF_live12iteration++;
                                    }
                                }
                            }
                            if (GLF_dead8d >= 0 && donor_replacementGLF_dead8p.y > 0 && GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y - 2) * 16, 256)] == 0) {
                                GLF_dead8d--;
                                if (_GLF_DEAD(false)) {
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    {
                                        ;
                                    }
                                }
                                GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y) * 16, 256)] = 1;
                                GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y - 1) * 16, 256)] = 1;
                                {
                                    int GLF_live19looplimiter1 = 0;
                                    if (GLF_live19looplimiter1 >= 6) {
                                        ;
                                    }
                                }
                                GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y - 2) * 16, 256)] = 1;
                                donor_replacementGLF_dead8p.y -= 2;
                            }
                            if (GLF_dead8d >= 0 && donor_replacementGLF_dead8p.x < 14 && GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x + 2) + (donor_replacementGLF_dead8p.y) * 16, 256)] == 0) {
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            int GLF_live20looplimiter0 = 0;
                                            if (GLF_live20looplimiter0 >= 7) {
                                                ;
                                            }
                                        }
                                        int donor_replacementGLF_dead17i = _GLF_FUZZED(clamp(GLF_dead8d, donor_replacementGLF_dead8v, donor_replacementGLF_dead8v));
                                        {
                                            int GLF_live19i = _GLF_FUZZED(ivec2(-69781, -5454).s);
                                            int GLF_live19j = _GLF_FUZZED(37677);
                                            int GLF_live19k = _GLF_FUZZED(((5320 | (86052 + (-33368))) & (-68100)));
                                            int GLF_live19looplimiter0 = 0;
                                            int GLF_live19mid = _GLF_FUZZED(((-80207) - (-39511)));
                                            int GLF_live19to = _GLF_FUZZED(-58067);
                                            while (GLF_live19i <= GLF_live19mid && GLF_live19j <= GLF_live19to) {
                                                if (GLF_live19looplimiter0 >= 6) {
                                                    break;
                                                }
                                                GLF_live19looplimiter0++;
                                                {
                                                    if (GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] < GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)]) {
                                                        GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i++, 10)];
                                                    } else {
                                                        GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j++, 10)];
                                                    }
                                                }
                                            }
                                        }
                                        int donor_replacementGLF_dead17iters = _GLF_FUZZED(donor_replacementGLF_dead8v);
                                        int donor_replacementGLF_dead17v = _GLF_FUZZED(-55928);
                                        for (donor_replacementGLF_dead17i = 0; donor_replacementGLF_dead17i < donor_replacementGLF_dead17iters; donor_replacementGLF_dead17i++) {
                                            donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                                        }
                                    }
                                    vec2 GLF_live13a = _GLF_FUZZED(vec2(-3.4, -1.9));
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead17iters = _GLF_FUZZED(GLF_dead8directions);
                                        {
                                            int GLF_live19from = _GLF_FUZZED(10233);
                                            int GLF_live19looplimiter2 = 0;
                                            int GLF_live19to = _GLF_FUZZED(45804);
                                            for (int GLF_live19i = GLF_live19from; GLF_live19i <= GLF_live19to; GLF_live19i++) {
                                                if (GLF_live19looplimiter2 >= 6) {
                                                    break;
                                                }
                                                GLF_live19looplimiter2++;
                                                {
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)];
                                                }
                                            }
                                        }
                                        int donor_replacementGLF_dead17v = _GLF_FUZZED(GLF_dead8directions);
                                        for (GLF_dead8d = 0; GLF_dead8d < donor_replacementGLF_dead17iters; GLF_dead8d++) {
                                            donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                                        }
                                    }
                                    float GLF_live13z = _GLF_FUZZED(-0.3);
                                    {
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                                    }
                                }
                                GLF_dead8d--;
                                GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y) * 16, 256)] = 1;
                                GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x + 1) + (donor_replacementGLF_dead8p.y) * 16, 256)] = 1;
                                GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x + 2) + (donor_replacementGLF_dead8p.y) * 16, 256)] = 1;
                                donor_replacementGLF_dead8p.x += 2;
                            }
                            if (GLF_dead8d >= 0 && donor_replacementGLF_dead8p.y < 14 && GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y + 2) * 16, 256)] == 0) {
                                if (_GLF_DEAD(false)) {
                                    {
                                        GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                    }
                                }
                                GLF_dead8d--;
                                GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y) * 16, 256)] = 1;
                                GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y + 1) * 16, 256)] = 1;
                                GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y + 2) * 16, 256)] = 1;
                                donor_replacementGLF_dead8p.y += 2;
                            }
                            {
                                {
                                    ;
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = faceforward(vec4(-6.5, -4169.8040, 4.7, -904.033), vec4(-30.28, 9.7, 8.0, 4384.0249), vec4(-3.3, -64.49, -511.759, 6.4));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                                {
                                    float GLF_live13th = _GLF_FUZZED(((false ? (true ? 2796.3482 : 173.701) : 6.0) - 73.89));
                                    {
                                        GLF_live13th = 0.5 - GLF_live13th;
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8ipos.y * 16 + donor_replacementGLF_dead8ipos.x, 256)] == 1) {
                            if (_GLF_DEAD(false)) {
                                {
                                    donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                }
                            }
                            GLF_dead8_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                            return;
                            {
                                {
                                    ;
                                }
                            }
                        }
                    }
                    {
                        {
                            int GLF_live18looplimiter3 = 0;
                            uint GLF_live18matrix_number = _GLF_FUZZED(uvec3(73046u, 143881u, 62892u).r);
                            for (int GLF_live18cols = 2; GLF_live18cols <= 4; GLF_live18cols++) {
                                if (GLF_live18looplimiter3 >= 7) {
                                    break;
                                }
                                GLF_live18looplimiter3++;
                                {
                                    {
                                        int GLF_live18looplimiter2 = 0;
                                        for (int GLF_live18rows = 2; GLF_live18rows <= 4; GLF_live18rows++) {
                                            if (GLF_live18looplimiter2 >= 7) {
                                                break;
                                            }
                                            GLF_live18looplimiter2++;
                                            {
                                                {
                                                    int GLF_live18looplimiter1 = 0;
                                                    for (int GLF_live18c = 0; GLF_live18c < GLF_live18cols; GLF_live18c++) {
                                                        if (GLF_live18looplimiter1 >= 7) {
                                                            break;
                                                        }
                                                        GLF_live18looplimiter1++;
                                                        {
                                                            {
                                                                int GLF_live18looplimiter0 = 0;
                                                                for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                                    if (GLF_live18looplimiter0 >= 7) {
                                                                        break;
                                                                    }
                                                                    GLF_live18looplimiter0++;
                                                                    {
                                                                        switch (GLF_live18matrix_number) {
                                                                            case 0u:
                                                                                GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                break;
                                                                            case 1u:
                                                                                GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                break;
                                                                            case 2u:
                                                                                GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                break;
                                                                            case 3u:
                                                                                GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                break;
                                                                            case 4u:
                                                                                GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                break;
                                                                            case 5u:
                                                                                GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                break;
                                                                            case 6u:
                                                                                GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                break;
                                                                            case 7u:
                                                                                GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                break;
                                                                            case 8u:
                                                                                GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                break;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_live18matrix_number = GLF_live18matrix_number + 1u;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        vec2 GLF_live13a = _GLF_FUZZED((vec3(-71.22, 3868.1095, 73.24) * mat2x3(2.2, -0.7, -8482.9270, -9.9, 5592.6120, 500.582)));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            }
                        }
                        float GLF_live13th = _GLF_FUZZED(1.7);
                        if (GLF_live13a.y < GLF_live13a.x) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                }
                            }
                            GLF_live13th = 0.5 - GLF_live13th;
                        }
                    }
                }
                data[i] = 1;
                break;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_IDENTITY(abs(vec4(8470.7852, -148.209, 3.9, 5642.8371)), clamp(abs(vec4(8470.7852, -148.209, 3.9, 5642.8371)), abs(vec4(8470.7852, -148.209, 3.9, 5642.8371)), abs(vec4(8470.7852, -148.209, 3.9, 5642.8371))));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        int donor_replacementGLF_dead17i = _GLF_FUZZED(abs(N));
                        int donor_replacementGLF_dead17iters = _GLF_FUZZED(i);
                        for (donor_replacementGLF_dead17i = 0; donor_replacementGLF_dead17i < donor_replacementGLF_dead17iters; donor_replacementGLF_dead17i++) {
                            i = (4 * i * (1000 - i)) / 1000;
                            {
                                int GLF_live19looplimiter4 = 0;
                                if (GLF_live19looplimiter4 >= 6) {
                                    ;
                                }
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            case 4:
                data[i] = 0;
                break;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        GLF_dead8_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                        return;
                    }
                }
            case 5:
                data[i] = -1;
                {
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead16x2 = _GLF_FUZZED(acos(-746.645));
                        if (donor_replacementGLF_dead16x2 <= -0.9 && donor_replacementGLF_dead16x2 >= -1.1) {
                            GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        } else {
                            GLF_dead16_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead17v = _GLF_FUZZED(((-82598) - N));
                        {
                            vec2 GLF_live19color = _GLF_FUZZED((mat2(-5969.3047, 6.5, 7.1, -1.7) * vec2(6.7, -3144.5338)));
                            int GLF_live19i = _GLF_FUZZED((59626 ^ ivec2(-1921, 41218)).r);
                            vec3 GLF_live19vecCoor = _GLF_FUZZED((vec3(4.2, -807.649, -3125.1721) - float(false)));
                            if (int(GLF_live19gl_FragCoord[1]) < 90) {
                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[2]))));
                                GLF_live19color.x += atanh(GLF_live19color.x) * cosh(GLF_live19injectionSwitch.y) * smoothstep(GLF_live19color, GLF_live19injectionSwitch, GLF_live19gl_FragCoord.yy).x;
                                ;
                            } else if (int(GLF_live19gl_FragCoord[1]) < 120) {
                                GLF_live19color = fract(acosh(clamp(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[3])), 1.0, 1000.0)));
                                GLF_live19color.x += (isnan(GLF_live19gl_FragCoord.x) ? log2(GLF_live19gl_FragCoord.x) : log2(GLF_live19gl_FragCoord.y));
                                ;
                            } else if (int(GLF_live19gl_FragCoord[1]) < 150) {
                                ;
                            } else if (int(GLF_live19gl_FragCoord[1]) < 180) {
                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[4]))));
                                GLF_live19color[1] += asinh(GLF_live19gl_FragCoord.y * ldexp(GLF_live19color.y, -GLF_live19i));
                                ;
                            } else if (int(GLF_live19gl_FragCoord[1]) < 210) {
                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[5]))));
                                GLF_live19color.y -= tanh(GLF_live19color.x) / cosh(GLF_live19color.y);
                                ;
                            } else if (int(GLF_live19gl_FragCoord[1]) < 240) {
                                GLF_live19color = fract(asinh(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[6]))));
                                GLF_live19color.y -= isnan(float(GLF_live19i)) ? tanh(GLF_live19gl_FragCoord.x) : atanh(GLF_live19gl_FragCoord.y);
                                ;
                            } else if (int(GLF_live19gl_FragCoord[1]) < 270) {
                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[7]))));
                                GLF_live19color.y *= mix(normalize(GLF_live19vecCoor), normalize(vec3(GLF_live19color, degrees(GLF_live19color.x))), GLF_live19injectionSwitch.x).y;
                                ;
                            } else {
                                ;
                            }
                        }
                        {
                            donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-128.219, -610.149, 3.9, 63.61);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                break;
            case 6:
                data[i] = -2;
                {
                    float GLF_live3th = _GLF_FUZZED(-600.636);
                    {
                        GLF_live3th = 0.5 - GLF_live3th;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                int donor_replacementGLF_dead5iterationCap = _GLF_FUZZED(i);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-9.2, 7.2, 8452.9622, 4.6);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                float donor_replacementGLF_dead5xCoord = _GLF_FUZZED(-8.5);
                                float donor_replacementGLF_dead5yCoord = _GLF_FUZZED(122.611);
                                if (_GLF_DEAD(false)) {
                                    {
                                        GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                    }
                                }
                                if (i < bitfieldInsert(donor_replacementGLF_dead5iterationCap, 0, 0, 0)) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        {
                                            vec2 GLF_live13a = _GLF_FUZZED(vec2(vec3(-42.33, 3.5, -5.0)));
                                            float GLF_live13th = _GLF_FUZZED(float(uint(false)));
                                            {
                                                int GLF_live18cols = _GLF_FUZZED(-43228);
                                                int GLF_live18looplimiter2 = 0;
                                                uint GLF_live18matrix_number = _GLF_FUZZED(96791u);
                                                for (int GLF_live18rows = 2; GLF_live18rows <= 4; GLF_live18rows++) {
                                                    if (GLF_live18looplimiter2 >= 7) {
                                                        break;
                                                    }
                                                    GLF_live18looplimiter2++;
                                                    {
                                                        {
                                                            int GLF_live18looplimiter1 = 0;
                                                            for (int GLF_live18c = 0; GLF_live18c < GLF_live18cols; GLF_live18c++) {
                                                                if (GLF_live18looplimiter1 >= 7) {
                                                                    break;
                                                                }
                                                                GLF_live18looplimiter1++;
                                                                {
                                                                    {
                                                                        int GLF_live18looplimiter0 = 0;
                                                                        for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                                            if (GLF_live18looplimiter0 >= 7) {
                                                                                break;
                                                                            }
                                                                            GLF_live18looplimiter0++;
                                                                            {
                                                                                switch (GLF_live18matrix_number) {
                                                                                    case 0u:
                                                                                        GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                        break;
                                                                                    case 1u:
                                                                                        GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                        break;
                                                                                    case 2u:
                                                                                        GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                        break;
                                                                                    case 3u:
                                                                                        GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                        break;
                                                                                    case 4u:
                                                                                        GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                        break;
                                                                                    case 5u:
                                                                                        GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                        break;
                                                                                    case 6u:
                                                                                        GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                        break;
                                                                                    case 7u:
                                                                                        GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                        break;
                                                                                    case 8u:
                                                                                        GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                        break;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        GLF_live18matrix_number = GLF_live18matrix_number + 1u;
                                                    }
                                                }
                                            }
                                            if (GLF_live13a.y < GLF_live13a.x) {
                                                GLF_live13th = 0.5 - GLF_live13th;
                                            }
                                        }
                                        _GLF_color = asin(vec4(-5.0, -6.4, 7.3, 3.3));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    ;
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead17i = _GLF_FUZZED(bitfieldExtract((donor_replacementGLF_dead5iterationCap >> 2473), donor_replacementGLF_dead5iterationCap, (-mix(i, -28403, true))));
                                            int donor_replacementGLF_dead17v = _GLF_FUZZED(donor_replacementGLF_dead5iterationCap);
                                            for (donor_replacementGLF_dead17i = 0; donor_replacementGLF_dead17i < donor_replacementGLF_dead5iterationCap; donor_replacementGLF_dead17i++) {
                                                donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                                            }
                                        }
                                        vec3 donor_replacementGLF_dead6color = _GLF_FUZZED((inverse(mat3(-7.1, -9.7, 0.2, -744.657, 2.2, -0.8, 12.40, 5.3, 33.07)) * vec3(-310.540, -34.03, 2954.4695)));
                                        do {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                int donor_replacementGLF_dead17i = _GLF_FUZZED((donor_replacementGLF_dead5iterationCap % findLSB(i)));
                                                int donor_replacementGLF_dead17iters = _GLF_FUZZED(ivec4(11661, 39572, -66623, 5996).a);
                                                int donor_replacementGLF_dead17v = _GLF_FUZZED(N);
                                                for (donor_replacementGLF_dead17i = 0; donor_replacementGLF_dead17i < donor_replacementGLF_dead17iters; donor_replacementGLF_dead17i++) {
                                                    donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                                                }
                                            }
                                            donor_replacementGLF_dead6color -= GLF_dead6palette(vec3(float(GLF_dead6obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead6injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead6injectionSwitch.x, 0.6, float(GLF_dead6obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead6injectionSwitch.x), 10)]) * 0.1));
                                            donor_replacementGLF_dead5iterationCap++;
                                        } while (donor_replacementGLF_dead5iterationCap != GLF_dead6obj.numbers[2]);
                                    }
                                    ;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec2(-5.1, 225.762).ggrg;
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    {
                                        int GLF_live19from = _GLF_FUZZED(-83549);
                                        int GLF_live19to = _GLF_FUZZED(-42554);
                                        {
                                            int GLF_live19looplimiter2 = 0;
                                            for (int GLF_live19i = GLF_live19from; GLF_live19i <= GLF_live19to; GLF_live19i++) {
                                                if (GLF_live19looplimiter2 >= 6) {
                                                    break;
                                                }
                                                GLF_live19looplimiter2++;
                                                {
                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)];
                                                }
                                            }
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        int donor_replacementGLF_dead17i = _GLF_FUZZED(bitCount(N));
                                        for (donor_replacementGLF_dead17i = 0; donor_replacementGLF_dead17i < i; donor_replacementGLF_dead17i++) {
                                            i = (4 * i * (1000 - i)) / 1000;
                                        }
                                    }
                                    _GLF_color = vec4(-3.7, 0.5, -185.804, -6575.4613);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                break;
            case 7:
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        ivec2 GLF_live17pos = _GLF_FUZZED((19366 * ivec2(-80169, 53106)));
                        {
                            if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                ;
                            }
                            GLF_live17pos.y++;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = dFdyFine(vec4(-24.37, -66.52, -4.8, -802.294));
                    {
                        int GLF_live17looplimiter0 = 0;
                        ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(11349, 12877));
                        {
                            if (GLF_live17looplimiter0 >= 3) {
                                ;
                            }
                            GLF_live17looplimiter0++;
                            {
                                if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                    float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                    ;
                                }
                                GLF_live17pos.y++;
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            int donor_replacementGLF_dead17i = _GLF_FUZZED(int(bvec4(true, false, false, true).g));
                            int donor_replacementGLF_dead17iters = _GLF_FUZZED(findLSB(i));
                            int donor_replacementGLF_dead17v = _GLF_FUZZED(83997);
                            for (donor_replacementGLF_dead17i = 0; donor_replacementGLF_dead17i < donor_replacementGLF_dead17iters; donor_replacementGLF_dead17i++) {
                                donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                data[i] = -3;
                break;
            case 8:
                data[i] = -4;
                break;
            case 9:
                {
                    ivec2 GLF_live17pos = _GLF_FUZZED((ivec2(59012, -50291) - (~ivec2(-79535, -16815))));
                    {
                        if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                            float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                            ;
                        }
                        GLF_live17pos.y++;
                    }
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (i >= int(GLF_dead4resolution.x)) {
                            break;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        ivec2 GLF_live17pos = _GLF_FUZZED((+ivec2(71301, -82210)));
                        {
                            float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                            ;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        {
                            int GLF_live19high = _GLF_FUZZED(-81949);
                            int GLF_live19looplimiter3 = 0;
                            int GLF_live19low = _GLF_FUZZED(62458);
                            int GLF_live19m = _GLF_FUZZED(82196);
                            for (int GLF_live19i = GLF_live19low; GLF_live19i < GLF_live19high; GLF_live19i += 2 * GLF_live19m) {
                                if (GLF_live19looplimiter3 >= 6) {
                                    break;
                                }
                                GLF_live19looplimiter3++;
                                {
                                    int GLF_live19from = GLF_live19i;
                                    int GLF_live19mid = GLF_live19i + GLF_live19m - 1;
                                    int GLF_live19to = min(GLF_live19i + 2 * GLF_live19m - 1, GLF_live19high);
                                    GLF_live19merge(GLF_live19from, GLF_live19mid, GLF_live19to);
                                }
                            }
                        }
                        float GLF_live13th = _GLF_FUZZED(8.0);
                        {
                            GLF_live13th = 0.5 - GLF_live13th;
                        }
                    }
                    _GLF_color = vec4(865.381, 70.04, 2670.2211, -453.705);
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead9x = _GLF_FUZZED(asinh(determinant(mat3(4.0, -1.2, -5.9, 8.7, 5612.5152, 9.9, 79.97, 6.8, 9.4))));
                        float donor_replacementGLF_dead9y = _GLF_FUZZED(floor(-7.4));
                        if (donor_replacementGLF_dead9x * donor_replacementGLF_dead9x + donor_replacementGLF_dead9y * donor_replacementGLF_dead9y > 4.0) {
                            break;
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    {
                                        GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                    }
                                }
                                int GLF_live12looplimiter3 = 0;
                                if (GLF_live12looplimiter3 >= 3) {
                                    ;
                                }
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            float GLF_live13th = _GLF_FUZZED(-8.1);
                            vec2 GLF_live13v = _GLF_FUZZED(((vec4(-7.5, 4.3, 572.212, 359.073) + vec4(-35.17, -961.381, 0.7, -555.968)) * mat2x4(5.0, 183.950, -677.105, -982.553, -290.438, -780.040, -5.7, -2110.9640)));
                            if (GLF_live13v.x < 0.0) {
                                GLF_live13th = 1.0 - GLF_live13th;
                            }
                        }
                    }
                }
                {
                    ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(-84009, ((-5781) | (-84915))));
                    {
                        float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                        ;
                    }
                }
                data[i] = -5;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead8directions = _GLF_FUZZED(bitfieldReverse(N));
                    {
                        donor_replacementGLF_dead8directions += 1;
                    }
                }
                break;
                {
                    {
                        {
                            {
                                ;
                            }
                        }
                        {
                            vec2 GLF_live13a = _GLF_FUZZED((vec2(-6189.9983, -6.2) + (+(-101.999))));
                            float GLF_live13th = _GLF_FUZZED(-6019.6394);
                            if (GLF_live13a.y < GLF_live13a.x) {
                                GLF_live13th = 0.5 - GLF_live13th;
                            }
                        }
                        ;
                    }
                }
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead9xCoord = _GLF_FUZZED(3.4);
            {
                float GLF_live13th = _GLF_FUZZED(1.3);
                {
                    GLF_live13th = 0.5 - GLF_live13th;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, true && (false))) || false))) {
                        int donor_replacementGLF_dead17i = _GLF_FUZZED(findLSB(130754u));
                        int donor_replacementGLF_dead17iters = _GLF_FUZZED((sign(ivec2(13167, -10715)[1]) / bitfieldInsert(i, 48196, i, 26449)));
                        int donor_replacementGLF_dead17v = _GLF_FUZZED(findMSB(i));
                        for (donor_replacementGLF_dead17i = 0; donor_replacementGLF_dead17i < donor_replacementGLF_dead17iters; donor_replacementGLF_dead17i++) {
                            donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                        }
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    vec2 GLF_live13a = _GLF_FUZZED(vec2(19.76, 9.0));
                    float GLF_live13th = _GLF_FUZZED(7.8);
                    if (GLF_live13a.y < GLF_live13a.x) {
                        GLF_live13th = 0.5 - GLF_live13th;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = min(vec4(372.562, 0.9, -7.2, 1.1), determinant(mat4(-3.6, 644.118, 6.9, -8202.7391, -0.9, -225.160, 1.7, -51.98, 87.04, -486.074, 1.6, -16.71, 4575.2636, 894.227, -611.380, 4.5)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        {
                            ;
                        }
                    }
                }
            }
            float donor_replacementGLF_dead9yCoord = _GLF_FUZZED((6.8 / sqrt(-960.372)));
            {
                ;
                {
                    {
                        ;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                }
            }
        }
        {
            {
                int GLF_live11index = _GLF_FUZZED(((-69079) ^ ((-83742) - 37913)));
                int GLF_live11j = _GLF_FUZZED(62089);
                {
                    GLF_live11index = GLF_live11j;
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead17v = _GLF_FUZZED(-8938);
                    {
                        int GLF_live20looplimiter0 = 0;
                        if (GLF_live20looplimiter0 >= 7) {
                            ;
                        }
                    }
                    {
                        donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                    }
                }
            }
            {
                ;
            }
        }
        i++;
    } while (_GLF_IDENTITY(i < 10, !(!(i < 10))));
    {
        {
            int GLF_live20looplimiter0 = 0;
            if (GLF_live20looplimiter0 >= 7) {
                ;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-2843.8771, -7.9, -46.33, -8.0);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    for (int j = 0; j < 10; j++) {
        temp[j] = data[j];
    }
    mergeSort();
    {
        int GLF_live17looplimiter0 = 0;
        if (GLF_live17looplimiter0 >= 3) {
            ;
        }
    }
    {
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead7x = _GLF_FUZZED(-57.94);
            float donor_replacementGLF_dead7y = _GLF_FUZZED(594.855);
            if (donor_replacementGLF_dead7x * donor_replacementGLF_dead7x + donor_replacementGLF_dead7y * donor_replacementGLF_dead7y > 4.0) {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead16A = _GLF_FUZZED((fract(vec3(326.666, -890.354, -8.7).g)));
            {
                int GLF_live18looplimiter2 = 0;
                if (GLF_live18looplimiter2 >= 7) {
                    ;
                }
            }
            float donor_replacementGLF_dead16B = _GLF_FUZZED(float(3192u));
            float donor_replacementGLF_dead16C = _GLF_FUZZED(9.6);
            float donor_replacementGLF_dead16temp = _GLF_FUZZED(exp(-4.1));
            float donor_replacementGLF_dead16x0 = _GLF_FUZZED(float(false));
            float donor_replacementGLF_dead16x1 = _GLF_FUZZED(cosh(uintBitsToFloat(120503u)));
            float donor_replacementGLF_dead16x2 = _GLF_FUZZED(ldexp(-5.7, i));
            {
                float GLF_dead16h0 = donor_replacementGLF_dead16x0 - donor_replacementGLF_dead16x2;
                float GLF_dead16h1 = donor_replacementGLF_dead16x1 - donor_replacementGLF_dead16x2;
                float GLF_dead16k0 = GLF_dead16fx(donor_replacementGLF_dead16x0) - GLF_dead16fx(donor_replacementGLF_dead16x2);
                float GLF_dead16k1 = GLF_dead16fx(donor_replacementGLF_dead16x1) - GLF_dead16fx(donor_replacementGLF_dead16x2);
                donor_replacementGLF_dead16temp = donor_replacementGLF_dead16x2;
                donor_replacementGLF_dead16A = (((GLF_dead16h1) * (GLF_dead16k0)) - ((GLF_dead16h0) * (GLF_dead16k1))) / ((pow((GLF_dead16h0), 2.0) * (GLF_dead16h1)) - (pow((GLF_dead16h1), 2.0) * (GLF_dead16h0)));
                donor_replacementGLF_dead16B = (((GLF_dead16k0) - (donor_replacementGLF_dead16A * (pow((GLF_dead16h0), 2.0)))) / (GLF_dead16h0));
                donor_replacementGLF_dead16C = GLF_dead16fx(donor_replacementGLF_dead16x2);
                {
                    {
                        ;
                    }
                }
                donor_replacementGLF_dead16x2 = donor_replacementGLF_dead16x2 - ((2.0 * donor_replacementGLF_dead16C) / (donor_replacementGLF_dead16B + sign(donor_replacementGLF_dead16B) * sqrt(pow(donor_replacementGLF_dead16B, 2.0) - (4.0 * donor_replacementGLF_dead16A * donor_replacementGLF_dead16C))));
                donor_replacementGLF_dead16x0 = donor_replacementGLF_dead16x1;
                donor_replacementGLF_dead16x1 = donor_replacementGLF_dead16temp;
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead5iterationCap = _GLF_FUZZED(N);
            if (0.0 > GLF_dead5resolution.y) {
                donor_replacementGLF_dead5iterationCap += 1;
            }
            {
                vec2 GLF_live20coord = _GLF_FUZZED(vec2(90.89, -5.1));
                int GLF_live20i = _GLF_FUZZED(ivec4(28249, -46452, 6292, -21008).s);
                vec4 GLF_live20texel = _GLF_FUZZED((vec4(8.8, 9772.5312, 5.7, 3211.5164) * vec4(-7.3, -799.550, -9.7, 91.21)));
                {
                    int GLF_live20looplimiter0 = 0;
                    while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                        if (GLF_live20looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live20looplimiter0++;
                        {
                            GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                            GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                            GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                            GLF_live20i++;
                        }
                    }
                }
            }
        }
        {
            int GLF_live18c = _GLF_FUZZED((false ? (-94118) : 25123));
            uint GLF_live18matrix_number = _GLF_FUZZED((uvec3(145083u, 197560u, 7558u).t | 116987u));
            int GLF_live18rows = _GLF_FUZZED((~((-9467) | 31325)));
            {
                {
                    int GLF_live18looplimiter0 = 0;
                    for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                        if (GLF_live18looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live18looplimiter0++;
                        {
                            switch (GLF_live18matrix_number) {
                                case 0u:
                                    GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                    break;
                                case 1u:
                                    GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                    break;
                                case 2u:
                                    GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                    break;
                                case 3u:
                                    GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                    break;
                                case 4u:
                                    GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                    break;
                                case 5u:
                                    GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                    break;
                                case 6u:
                                    GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                    break;
                                case 7u:
                                    GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                    break;
                                case 8u:
                                    GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                    break;
                            }
                        }
                    }
                }
            }
        }
        vec2 GLF_live2coord = _GLF_FUZZED(vec2(8.5, (false ? 3156.4459 : 65.17)));
        {
            int GLF_live17looplimiter0 = 0;
            if (GLF_live17looplimiter0 >= 3) {
                ;
            }
        }
        int GLF_live2i = _GLF_FUZZED((((-93059) | 82105) * 79565));
        if (_GLF_DEAD(false)) {
            {
                ;
                {
                    ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(88062, -59713));
                    {
                        if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                            float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                            ;
                        }
                        GLF_live17pos.y++;
                    }
                }
            }
        }
        int GLF_live2j = _GLF_FUZZED(851);
        {
            vec2 GLF_live13a = _GLF_FUZZED(((133267u != 61809u) ? vec2(54.72, 21.39) : vec2(62.91, -3276.8562)));
            float GLF_live13z = _GLF_FUZZED(-530.907);
            {
                GLF_live13z = GLF_live13a.x / GLF_live13a.y;
            }
        }
        vec4 GLF_live2res = _GLF_FUZZED(vec4(5.5, -4298.7131, -5.3, 1.4));
        float GLF_live2uvstep = _GLF_FUZZED(8.5);
        {
            GLF_live2res += texture(GLF_live2tex, GLF_live2coord + vec2(float(GLF_live2i - 1) * GLF_live2uvstep, float(GLF_live2j - 1) * GLF_live2uvstep)) * GLF_live2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2i * 3 + GLF_live2j, 9)];
        }
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead5iterationCap = _GLF_IDENTITY(_GLF_FUZZED(N), min(_GLF_IDENTITY(_GLF_FUZZED(N), int(ivec2(_GLF_FUZZED(N), 1))), _GLF_FUZZED(N)));
        {
            {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead15pos = _GLF_FUZZED(sign(vec2(-71.66, 1.6)));
            if (GLF_dead15pointInTriangle(donor_replacementGLF_dead15pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            } else {
                GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
            }
        }
        {
            int GLF_live12c_im = _GLF_FUZZED((-53782));
            int GLF_live12c_re = _GLF_FUZZED(-80777);
            {
                int GLF_live19i = _GLF_FUZZED(6461);
                int GLF_live19looplimiter2 = 0;
                {
                    if (GLF_live19looplimiter2 >= 6) {
                        ;
                    }
                    GLF_live19looplimiter2++;
                    {
                        GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)];
                    }
                }
            }
            int GLF_live12iteration = _GLF_FUZZED((~(-71094)));
            int GLF_live12looplimiter0 = 0;
            int GLF_live12x = _GLF_FUZZED(-52531);
            int GLF_live12y = _GLF_FUZZED((ivec3(-39764, 73514, 51956) * ivec3(-29439, -30325, 94366)).p);
            {
                if (GLF_live12looplimiter0 >= 3) {
                    ;
                }
                GLF_live12looplimiter0++;
                {
                    if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 262144) {
                        ;
                    }
                    int GLF_live12x_new = ((GLF_live12x * GLF_live12x - GLF_live12y * GLF_live12y) / 256 + GLF_live12c_re);
                    if (_GLF_DEAD(false)) {
                        {
                            vec2 GLF_live20coord = _GLF_FUZZED(vec2(3.4, 13.33));
                            int GLF_live20i = _GLF_FUZZED(int(false));
                            vec4 GLF_live20texel = _GLF_FUZZED(vec4(8.1, 738.727, -4404.5982, 80.14));
                            {
                                GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                GLF_live20i++;
                            }
                        }
                        int donor_replacementGLF_dead17i = _GLF_FUZZED(GLF_live12c_im);
                        for (donor_replacementGLF_dead17i = 0; donor_replacementGLF_dead17i < GLF_live12x_new; donor_replacementGLF_dead17i++) {
                            i = (4 * i * (1000 - i)) / 1000;
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                    GLF_live12y = (2 * GLF_live12x * GLF_live12y / 256 + GLF_live12c_im);
                    {
                        int GLF_live18cols = _GLF_FUZZED(((-70735) * 10747));
                        uint GLF_live18matrix_number = _GLF_FUZZED(87770u);
                        {
                            {
                                int GLF_live18looplimiter2 = 0;
                                for (int GLF_live18rows = 2; GLF_live18rows <= 4; GLF_live18rows++) {
                                    if (GLF_live18looplimiter2 >= 7) {
                                        break;
                                    }
                                    GLF_live18looplimiter2++;
                                    {
                                        {
                                            int GLF_live18looplimiter1 = 0;
                                            for (int GLF_live18c = 0; GLF_live18c < GLF_live18cols; GLF_live18c++) {
                                                if (GLF_live18looplimiter1 >= 7) {
                                                    break;
                                                }
                                                GLF_live18looplimiter1++;
                                                {
                                                    {
                                                        int GLF_live18looplimiter0 = 0;
                                                        for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                            if (GLF_live18looplimiter0 >= 7) {
                                                                break;
                                                            }
                                                            GLF_live18looplimiter0++;
                                                            {
                                                                switch (GLF_live18matrix_number) {
                                                                    case 0u:
                                                                        GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                        break;
                                                                    case 1u:
                                                                        GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                        break;
                                                                    case 2u:
                                                                        GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                        break;
                                                                    case 3u:
                                                                        GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                        break;
                                                                    case 4u:
                                                                        GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                        break;
                                                                    case 5u:
                                                                        GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                        break;
                                                                    case 6u:
                                                                        GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                        break;
                                                                    case 7u:
                                                                        GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                        break;
                                                                    case 8u:
                                                                        GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_live18matrix_number = GLF_live18matrix_number + 1u;
                                    }
                                }
                            }
                        }
                    }
                    GLF_live12x = GLF_live12x_new;
                    GLF_live12iteration++;
                }
            }
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                float donor_replacementGLF_dead16A = _GLF_FUZZED(GLF_dead8_GLF_color[3]);
                float donor_replacementGLF_dead16B = _GLF_FUZZED(5586.1172);
                float donor_replacementGLF_dead16C = _GLF_FUZZED(6.0);
                float donor_replacementGLF_dead16temp = _GLF_FUZZED(exp2(-623.214));
                float donor_replacementGLF_dead16x0 = _GLF_FUZZED(clamp(mix(-8935.8644, determinant(mat3(-73.62, -84.15, 9.1, 16.84, -9274.2559, -252.328, 6.3, -2.3, 39.18)), -775.388), 25.90, 8.2));
                float donor_replacementGLF_dead16x1 = _GLF_FUZZED(-0.8);
                float donor_replacementGLF_dead16x2 = _GLF_FUZZED(dFdy(-806.041));
                {
                    float GLF_dead16h0 = donor_replacementGLF_dead16x0 - donor_replacementGLF_dead16x2;
                    float GLF_dead16h1 = donor_replacementGLF_dead16x1 - donor_replacementGLF_dead16x2;
                    float GLF_dead16k0 = GLF_dead16fx(donor_replacementGLF_dead16x0) - GLF_dead16fx(donor_replacementGLF_dead16x2);
                    float GLF_dead16k1 = GLF_dead16fx(donor_replacementGLF_dead16x1) - GLF_dead16fx(donor_replacementGLF_dead16x2);
                    donor_replacementGLF_dead16temp = donor_replacementGLF_dead16x2;
                    donor_replacementGLF_dead16A = (((GLF_dead16h1) * (GLF_dead16k0)) - ((GLF_dead16h0) * (GLF_dead16k1))) / ((pow((GLF_dead16h0), 2.0) * (GLF_dead16h1)) - (pow((GLF_dead16h1), 2.0) * (GLF_dead16h0)));
                    donor_replacementGLF_dead16B = (((GLF_dead16k0) - (donor_replacementGLF_dead16A * (pow((GLF_dead16h0), 2.0)))) / (GLF_dead16h0));
                    donor_replacementGLF_dead16C = GLF_dead16fx(donor_replacementGLF_dead16x2);
                    donor_replacementGLF_dead16x2 = donor_replacementGLF_dead16x2 - ((2.0 * donor_replacementGLF_dead16C) / (donor_replacementGLF_dead16B + sign(donor_replacementGLF_dead16B) * sqrt(pow(donor_replacementGLF_dead16B, 2.0) - (4.0 * donor_replacementGLF_dead16A * donor_replacementGLF_dead16C))));
                    donor_replacementGLF_dead16x0 = donor_replacementGLF_dead16x1;
                    donor_replacementGLF_dead16x1 = donor_replacementGLF_dead16temp;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                int GLF_live19from = _GLF_FUZZED(78718);
                int GLF_live19to = _GLF_FUZZED(93158);
                {
                    int GLF_live19looplimiter2 = 0;
                    for (int GLF_live19i = GLF_live19from; GLF_live19i <= GLF_live19to; GLF_live19i++) {
                        if (GLF_live19looplimiter2 >= 6) {
                            break;
                        }
                        GLF_live19looplimiter2++;
                        {
                            GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)];
                        }
                    }
                }
            }
            _GLF_color = vec4(631.009, 5.1, 998.671, -1.2);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            donor_replacementGLF_dead5iterationCap += 1;
            if (_GLF_DEAD(false)) {
                {
                    ;
                }
            }
        }
    }
    float grey;
    if (int(gl_FragCoord[1]) < 30) {
        {
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_outVarBackup_GLF_color = _GLF_color) / vec4(1.0, 1.0, 1.0, 1.0));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead17iters = _GLF_FUZZED(N);
                        int donor_replacementGLF_dead17v = _GLF_FUZZED(-90334);
                        for (i = 0; i < donor_replacementGLF_dead17iters; i++) {
                            donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                        }
                    }
                    _GLF_color = vec4(181.009, 3425.5703, 98.02, 5068.4993);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            {
                                vec2 GLF_live19color = _GLF_FUZZED(vec2(-47.59, -1270.8891));
                                int GLF_live19i = _GLF_FUZZED(((-12700) | (-84477)));
                                vec3 GLF_live19vecCoor = _GLF_FUZZED(vec3(-165.092, 512.364, 46.82));
                                if (int(GLF_live19gl_FragCoord[1]) < 240) {
                                    GLF_live19color = fract(asinh(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[6]))));
                                    GLF_live19color.y -= isnan(float(GLF_live19i)) ? tanh(GLF_live19gl_FragCoord.x) : atanh(GLF_live19gl_FragCoord.y);
                                    ;
                                } else if (int(GLF_live19gl_FragCoord[1]) < 270) {
                                    GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[7]))));
                                    GLF_live19color.y *= mix(normalize(GLF_live19vecCoor), normalize(vec3(GLF_live19color, degrees(GLF_live19color.x))), GLF_live19injectionSwitch.x).y;
                                    ;
                                } else {
                                    ;
                                }
                            }
                            int donor_replacementGLF_dead17i = _GLF_FUZZED(findLSB((mat4x2(-7.3, 7.3, 44.58, -234.123, -4.1, 159.010, 3.2, 801.424), N)));
                            {
                                int GLF_live19high = _GLF_FUZZED(24349);
                                int GLF_live19looplimiter4 = 0;
                                int GLF_live19low = _GLF_FUZZED(-14154);
                                int GLF_live19m = _GLF_FUZZED((((-51815) | (-45729)) | 26200));
                                {
                                    if (GLF_live19looplimiter4 >= 6) {
                                        ;
                                    }
                                    GLF_live19looplimiter4++;
                                    {
                                        {
                                            int GLF_live19looplimiter3 = 0;
                                            for (int GLF_live19i = GLF_live19low; GLF_live19i < GLF_live19high; GLF_live19i += 2 * GLF_live19m) {
                                                if (GLF_live19looplimiter3 >= 6) {
                                                    break;
                                                }
                                                GLF_live19looplimiter3++;
                                                {
                                                    int GLF_live19from = GLF_live19i;
                                                    int GLF_live19mid = GLF_live19i + GLF_live19m - 1;
                                                    int GLF_live19to = min(GLF_live19i + 2 * GLF_live19m - 1, GLF_live19high);
                                                    GLF_live19merge(GLF_live19from, GLF_live19mid, GLF_live19to);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            int donor_replacementGLF_dead17v = _GLF_FUZZED(clamp(38304, -13558, (~N)));
                            for (donor_replacementGLF_dead17i = 0; donor_replacementGLF_dead17i < i; donor_replacementGLF_dead17i++) {
                                donor_replacementGLF_dead17v = (4 * donor_replacementGLF_dead17v * (1000 - donor_replacementGLF_dead17v)) / 1000;
                            }
                        }
                    }
                }
                {
                    vec2 GLF_live13a = _GLF_FUZZED((-vec2(vec4(329.748, -462.629, -6554.9715, 1532.0189))));
                    float GLF_live13th = _GLF_FUZZED(209.664);
                    if (GLF_live13a.y < GLF_live13a.x) {
                        GLF_live13th = 0.5 - GLF_live13th;
                    }
                }
                ;
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                int donor_replacementGLF_dead6i = _GLF_FUZZED(-82225);
                int donor_replacementGLF_dead6j = _GLF_FUZZED(N);
                {
                    donor_replacementGLF_dead6i++;
                    {
                        int GLF_live17looplimiter0 = 0;
                        if (GLF_live17looplimiter0 >= 3) {
                            ;
                        }
                    }
                    GLF_dead6swap(donor_replacementGLF_dead6i, donor_replacementGLF_dead6j);
                }
            }
        }
        {
            {
                ;
            }
        }
        {
            int GLF_live17looplimiter0 = 0;
            if (GLF_live17looplimiter0 >= 3) {
                ;
            }
        }
        grey = 0.5 + float(data[0]) / _GLF_IDENTITY(10.0, clamp(_GLF_IDENTITY(10.0, _GLF_IDENTITY(min(10.0, 10.0), clamp(min(10.0, 10.0), min(10.0, 10.0), min(10.0, 10.0)))), _GLF_IDENTITY(10.0, max(10.0, _GLF_IDENTITY(10.0, clamp(10.0, 10.0, 10.0)))), 10.0));
    } else {
        if (int(gl_FragCoord[1]) < 60) {
            grey = 0.5 + _GLF_IDENTITY(float(data[1]), clamp(float(data[1]), float(data[1]), float(data[1]))) / 10.0;
        } else {
            if (int(gl_FragCoord[1]) < 90) {
                {
                    int GLF_live18c = _GLF_FUZZED(ivec3(-10744, 65424, 36079).t);
                    uint GLF_live18matrix_number = _GLF_FUZZED(148947u);
                    int GLF_live18r = _GLF_FUZZED(74834);
                    {
                        switch (GLF_live18matrix_number) {
                            case 0u:
                                GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                break;
                            case 1u:
                                GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                break;
                            case 2u:
                                GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                break;
                            case 3u:
                                GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                break;
                            case 4u:
                                GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                break;
                            case 5u:
                                GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                break;
                            case 6u:
                                GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                break;
                            case 7u:
                                GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                break;
                            case 8u:
                                GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                break;
                        }
                    }
                }
                _GLF_IDENTITY(grey = 0.5 + float(data[2]) / 10.0, 0.0 + (grey = 0.5 + float(data[2]) / 10.0));
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    float donor_replacementGLF_dead15pab = _GLF_FUZZED(dFdy(-4578.0240));
                    {
                        ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(50104, 70372));
                        if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                            float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                            ;
                        }
                    }
                    if (!((donor_replacementGLF_dead15pab < 0.0 && grey < 0.0) || (donor_replacementGLF_dead15pab >= 0.0 && grey >= 0.0))) {
                        ;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-65.53, 8.8, 4120.7173, 9.2);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead16x2 = _GLF_FUZZED(grey);
                            if (donor_replacementGLF_dead16x2 <= -0.9 && donor_replacementGLF_dead16x2 >= -1.1) {
                                GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            } else {
                                GLF_dead16_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (int(gl_FragCoord[1]) < 120) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(7717.1855, -2.5, 530.855, -9.3);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                            {
                                vec2 GLF_live13a = _GLF_FUZZED(vec3(4813.4308, 96.53, 6267.7705).br);
                                float GLF_live13z = _GLF_FUZZED((true ? float(false) : 3.0));
                                if (GLF_live13a.y > GLF_live13a.x) {
                                    GLF_live13z = GLF_live13a.x / GLF_live13a.y;
                                } else {
                                    GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                                }
                            }
                        }
                    }
                    grey = 0.5 + float(data[3]) / 10.0;
                } else {
                    if (int(gl_FragCoord[1]) < 150) {
                        discard;
                    } else {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            {
                                vec2 GLF_live20coord = _GLF_FUZZED(vec2(97.41, 6.6));
                                int GLF_live20i = _GLF_FUZZED(76802);
                                int GLF_live20looplimiter0 = 0;
                                vec4 GLF_live20texel = _GLF_FUZZED(vec4(-8.2, 34.68, 0.9, 181.505));
                                {
                                    if (GLF_live20looplimiter0 >= 7) {
                                        ;
                                    }
                                    GLF_live20looplimiter0++;
                                    {
                                        GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                        GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                        GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                        GLF_live20i++;
                                    }
                                }
                            }
                            _GLF_color = vec4(-1.1, 4.4, -1361.3023, 0.2);
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead16x2 = _GLF_FUZZED(-3.4);
                                if (donor_replacementGLF_dead16x2 <= -0.9 && donor_replacementGLF_dead16x2 >= -1.1) {
                                    GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                    {
                                        int GLF_live17looplimiter0 = 0;
                                        ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(-29422, -41479));
                                        while (GLF_live17pos.y != 256) {
                                            if (GLF_live17looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live17looplimiter0++;
                                            {
                                                if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                    float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                    ;
                                                }
                                                GLF_live17pos.y++;
                                            }
                                        }
                                    }
                                } else {
                                    GLF_dead16_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                {
                                    {
                                        ;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            ivec2 donor_replacementGLF_dead8ipos = _GLF_FUZZED(floatBitsToInt(vec2(-781.081, 3.7)));
                            if (GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8ipos.y * 16 + donor_replacementGLF_dead8ipos.x, 256)] == 1) {
                                GLF_dead8_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                return;
                            }
                        }
                        if (int(gl_FragCoord[1]) < 180) {
                            grey = 0.5 + float(data[5]) / 10.0;
                            {
                                {
                                    int GLF_live19j = _GLF_FUZZED(-98662);
                                    int GLF_live19k = _GLF_FUZZED((+71890));
                                    {
                                        GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j++, 10)];
                                    }
                                }
                                float GLF_live13th = _GLF_FUZZED((((-624.768) - (-3.6))));
                                vec2 GLF_live13v = _GLF_FUZZED(((-3584.2131) + (-vec2(9.3, 28.93))));
                                if (GLF_live13v.x < 0.0) {
                                    GLF_live13th = 1.0 - GLF_live13th;
                                }
                                {
                                    int GLF_live20looplimiter0 = 0;
                                    if (GLF_live20looplimiter0 >= 7) {
                                        ;
                                    }
                                }
                            }
                        } else {
                            if (int(gl_FragCoord[1]) < 210) {
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < 0.0, bool(bool(gl_FragCoord.y < 0.0))))))) {
                                        {
                                            int GLF_live17looplimiter0 = 0;
                                            if (GLF_live17looplimiter0 >= 3) {
                                                ;
                                            }
                                        }
                                        float donor_replacementGLF_dead5c_re = _GLF_FUZZED(radians(-5.6));
                                        int donor_replacementGLF_dead5iteration = _GLF_FUZZED(_GLF_IDENTITY(N, (N) ^ 0));
                                        {
                                            vec2 GLF_live13a = _GLF_FUZZED(vec4(-151.558, 69.69, -2.4, -93.50).gg);
                                            float GLF_live13z = _GLF_FUZZED(float(170181u));
                                            if (GLF_live13a.y > GLF_live13a.x) {
                                                {
                                                    int GLF_live18c = _GLF_FUZZED(-82586);
                                                    int GLF_live18looplimiter0 = 0;
                                                    uint GLF_live18matrix_number = _GLF_FUZZED(39618u);
                                                    int GLF_live18r = _GLF_FUZZED(int(true));
                                                    {
                                                        if (GLF_live18looplimiter0 >= 7) {
                                                            ;
                                                        }
                                                        GLF_live18looplimiter0++;
                                                        {
                                                            switch (GLF_live18matrix_number) {
                                                                case 0u:
                                                                    GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                    break;
                                                                case 1u:
                                                                    GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                    break;
                                                                case 2u:
                                                                    GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                    break;
                                                                case 5u:
                                                                    GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                    break;
                                                                case 7u:
                                                                    GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                    break;
                                                                case 8u:
                                                                    GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                    break;
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_live13z = GLF_live13a.x / GLF_live13a.y;
                                            } else {
                                                GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            for (donor_replacementGLF_dead5iteration = 0; donor_replacementGLF_dead5iteration < donor_replacementGLF_dead5iteration; donor_replacementGLF_dead5iteration++) {
                                                i = (4 * i * (1000 - i)) / 1000;
                                            }
                                        }
                                        int donor_replacementGLF_dead5k = _GLF_FUZZED(17573);
                                        float donor_replacementGLF_dead5x = _GLF_FUZZED(-7.7);
                                        float donor_replacementGLF_dead5y = _GLF_FUZZED(cos(injectionSwitch)[0]);
                                        do {
                                            if (donor_replacementGLF_dead5x * donor_replacementGLF_dead5x + donor_replacementGLF_dead5y * donor_replacementGLF_dead5y > 4.0) {
                                                break;
                                            }
                                            float GLF_dead5x_new = donor_replacementGLF_dead5x * donor_replacementGLF_dead5x - donor_replacementGLF_dead5y * donor_replacementGLF_dead5y + donor_replacementGLF_dead5c_re;
                                            donor_replacementGLF_dead5y = 2.0 * donor_replacementGLF_dead5x * donor_replacementGLF_dead5y + grey;
                                            donor_replacementGLF_dead5x = GLF_dead5x_new;
                                            {
                                                int GLF_live17looplimiter0 = 0;
                                                ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(-83643, 84104));
                                                while (GLF_live17pos.y != 256) {
                                                    if (GLF_live17looplimiter0 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live17looplimiter0++;
                                                    {
                                                        if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                            float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                            ;
                                                        }
                                                        GLF_live17pos.y++;
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead5iteration++;
                                            donor_replacementGLF_dead5k++;
                                        } while (_GLF_IDENTITY(donor_replacementGLF_dead5k, ~(~(_GLF_IDENTITY(donor_replacementGLF_dead5k, _GLF_IDENTITY(int(ivec3(donor_replacementGLF_dead5k, 1, 1)), (true ? int(ivec3(donor_replacementGLF_dead5k, 1, 1)) : _GLF_FUZZED(donor_replacementGLF_dead5k))))))) < bitfieldInsert(i + (257.0 > GLF_dead5resolution.y ? 1 : 0), 0, 0, 0));
                                    }
                                    {
                                        ;
                                    }
                                }
                                grey = 0.5 + float(data[_GLF_IDENTITY(6, (6) << 0)]) / 10.0;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = step(712.251, sin(vec4(-205.366, 8376.1292, -45.80, 4.8)));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                            } else {
                                if (int(gl_FragCoord[1]) < 240) {
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead16x2 = _GLF_FUZZED(exp(95.70));
                                        if (donor_replacementGLF_dead16x2 <= -0.9 && donor_replacementGLF_dead16x2 >= -1.1) {
                                            GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        } else {
                                            GLF_dead16_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                        }
                                    }
                                    grey = 0.5 + float(data[7]) / 10.0;
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            bool donor_replacementGLF_dead8canwalk = _GLF_FUZZED(true);
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                {
                                                    ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(-52877, -18708));
                                                    {
                                                        float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                        ;
                                                    }
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = mat4(-9.2, 170.366, -8518.5197, -8.2, -24.21, -88.91, -5.8, 4.2, -148.674, 160.778, 4044.6515, -4.2, -3.2, 193.858, -3.0, 91.17)[0];
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    {
                                                        vec2 GLF_live20coord = _GLF_FUZZED(vec2(-289.413, -7.3));
                                                        int GLF_live20i = _GLF_FUZZED((52401 & ((-57864) + (-37996))));
                                                        vec4 GLF_live20texel = _GLF_FUZZED(vec4(3279.7430, 8781.1739, 98.20, 52.23));
                                                        {
                                                            int GLF_live20looplimiter0 = 0;
                                                            while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                                                if (GLF_live20looplimiter0 >= 7) {
                                                                    break;
                                                                }
                                                                GLF_live20looplimiter0++;
                                                                {
                                                                    GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                                                    GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                                                    GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                                                    GLF_live20i++;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            int donor_replacementGLF_dead8j = _GLF_FUZZED(N);
                                            ivec2 donor_replacementGLF_dead8p = _GLF_FUZZED(ivec2(73971, 47606));
                                            {
                                                int GLF_live17looplimiter0 = 0;
                                                ivec2 GLF_live17pos = _GLF_FUZZED(((-69191) & ivec2(-55288, 61827)));
                                                while (GLF_live17pos.y != 256) {
                                                    if (GLF_live17looplimiter0 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live17looplimiter0++;
                                                    {
                                                        if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                            float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                            ;
                                                        }
                                                        GLF_live17pos.y++;
                                                    }
                                                }
                                            }
                                            {
                                                for (donor_replacementGLF_dead8j = 0; donor_replacementGLF_dead8j < 8; donor_replacementGLF_dead8j++) {
                                                    if (GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8j * 2 + i * 2 * 16, 256)] == 0) {
                                                        donor_replacementGLF_dead8p.x = donor_replacementGLF_dead8j * 2;
                                                        donor_replacementGLF_dead8p.y = i * 2;
                                                        donor_replacementGLF_dead8canwalk = true;
                                                        {
                                                            int GLF_live11looplimiter2 = 0;
                                                            if (GLF_live11looplimiter2 >= 4) {
                                                                ;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            {
                                                int GLF_live19i = _GLF_FUZZED(int(119373u));
                                                int GLF_live19j = _GLF_FUZZED((25857 * (false ? (24683) : 34152)));
                                                int GLF_live19k = _GLF_FUZZED(int(true));
                                                if (GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] < GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)]) {
                                                    GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i++, 10)];
                                                } else {
                                                    GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j++, 10)];
                                                }
                                            }
                                        }
                                        {
                                            int GLF_live19high = _GLF_FUZZED(67223);
                                            int GLF_live19looplimiter4 = 0;
                                            int GLF_live19low = _GLF_FUZZED((~ivec3(88342, -74737, 7186).r));
                                            for (int GLF_live19m = 1; GLF_live19m <= GLF_live19high; GLF_live19m = 2 * GLF_live19m) {
                                                if (GLF_live19looplimiter4 >= 6) {
                                                    break;
                                                }
                                                GLF_live19looplimiter4++;
                                                {
                                                    {
                                                        int GLF_live19looplimiter3 = 0;
                                                        for (int GLF_live19i = GLF_live19low; GLF_live19i < GLF_live19high; GLF_live19i += 2 * GLF_live19m) {
                                                            if (GLF_live19looplimiter3 >= 6) {
                                                                break;
                                                            }
                                                            GLF_live19looplimiter3++;
                                                            {
                                                                int GLF_live19from = GLF_live19i;
                                                                int GLF_live19mid = GLF_live19i + GLF_live19m - 1;
                                                                int GLF_live19to = min(GLF_live19i + 2 * GLF_live19m - 1, GLF_live19high);
                                                                GLF_live19merge(GLF_live19from, GLF_live19mid, GLF_live19to);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            float donor_replacementGLF_dead16x2 = _GLF_FUZZED(inversesqrt(grey));
                                            if (donor_replacementGLF_dead16x2 <= -0.9 && donor_replacementGLF_dead16x2 >= -1.1) {
                                                GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                            } else {
                                                GLF_dead16_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                            }
                                        }
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, min(_GLF_IDENTITY(_GLF_color, vec4(mat4(_GLF_color, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 0.0, 0.0, 0.0, 1.0))), _GLF_color));
                                            _GLF_color = vec4(76.02, -44.64, -2970.9334, 50.84);
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        {
                                            vec2 GLF_live20coord = _GLF_FUZZED((-vec2(3427.0608, 863.877)));
                                            int GLF_live20i = _GLF_FUZZED(((-79022) - ((-2143) | 66395)));
                                            int GLF_live20looplimiter0 = 0;
                                            vec4 GLF_live20texel = _GLF_FUZZED(vec4(-2.1, 415.900, 779.089, 87.16));
                                            {
                                                if (GLF_live20looplimiter0 >= 7) {
                                                    ;
                                                }
                                                GLF_live20looplimiter0++;
                                                {
                                                    GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                                    GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                                    GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                                    GLF_live20i++;
                                                }
                                            }
                                        }
                                        {
                                            float GLF_live13th = _GLF_FUZZED((true ? ((-72.33) - (0.3 * 3.0)) : 31.51));
                                            {
                                                GLF_live13th = 0.5 - GLF_live13th;
                                            }
                                        }
                                        vec2 GLF_live2coord = _GLF_IDENTITY(_GLF_FUZZED(vec2(4.4, -468.823)), mat2(1.0) * (_GLF_FUZZED(vec2(4.4, -468.823))));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            {
                                                vec2 GLF_live20coord = _GLF_FUZZED(vec2(-398.631, 62.96));
                                                int GLF_live20i = _GLF_FUZZED((-(-30626)));
                                                int GLF_live20looplimiter0 = 0;
                                                vec4 GLF_live20texel = _GLF_FUZZED(vec4(0.2, -4226.8545, 3429.6979, 7.9));
                                                while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                                    if (GLF_live20looplimiter0 >= 7) {
                                                        break;
                                                    }
                                                    GLF_live20looplimiter0++;
                                                    {
                                                        GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                                        GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                                        GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                                        GLF_live20i++;
                                                    }
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = pow(vec4(-853.892, -45.30, -4.8, 6.5), acos(vec4(-2.5, 5579.1905, 0.5, -9.3)));
                                                {
                                                    int GLF_live18cols = _GLF_FUZZED(int((ivec4(-39431, 63955, -67360, -32170) == ivec4(-14285, -63869, 31887, -85890))));
                                                    uint GLF_live18matrix_number = _GLF_FUZZED(uvec2(179880u, 49724u).x);
                                                    {
                                                        int GLF_live18looplimiter2 = 0;
                                                        for (int GLF_live18rows = 2; GLF_live18rows <= 4; GLF_live18rows++) {
                                                            if (GLF_live18looplimiter2 >= 7) {
                                                                break;
                                                            }
                                                            GLF_live18looplimiter2++;
                                                            {
                                                                {
                                                                    int GLF_live18looplimiter1 = 0;
                                                                    for (int GLF_live18c = 0; GLF_live18c < GLF_live18cols; GLF_live18c++) {
                                                                        if (GLF_live18looplimiter1 >= 7) {
                                                                            break;
                                                                        }
                                                                        GLF_live18looplimiter1++;
                                                                        {
                                                                            {
                                                                                int GLF_live18looplimiter0 = 0;
                                                                                for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                                                    if (GLF_live18looplimiter0 >= 7) {
                                                                                        break;
                                                                                    }
                                                                                    GLF_live18looplimiter0++;
                                                                                    {
                                                                                        switch (GLF_live18matrix_number) {
                                                                                            case 0u:
                                                                                                GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                                break;
                                                                                            case 1u:
                                                                                                GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                                break;
                                                                                            case 2u:
                                                                                                GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                                break;
                                                                                            case 3u:
                                                                                                GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                                break;
                                                                                            case 4u:
                                                                                                GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                                break;
                                                                                            case 5u:
                                                                                                GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                                break;
                                                                                            case 6u:
                                                                                                GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                                break;
                                                                                            case 7u:
                                                                                                GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                                break;
                                                                                            case 8u:
                                                                                                GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                                break;
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                GLF_live18matrix_number = GLF_live18matrix_number + 1u;
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-11.54, 0.4, -0.4, -16.52);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
                                                {
                                                    float GLF_live13th = _GLF_FUZZED(float(((-50250) | (-67106))));
                                                    {
                                                        GLF_live13th = -GLF_live13th;
                                                    }
                                                }
                                                {
                                                    vec2 GLF_live20coord = _GLF_FUZZED((vec2(4.9, -316.050) - (vec2(-7.7, -9007.2836) * 7.9)));
                                                    int GLF_live20i = _GLF_FUZZED(-43727);
                                                    vec4 GLF_live20texel = _GLF_FUZZED(vec4(-5.9, -3202.1471, -3.6, -9.7));
                                                    {
                                                        int GLF_live20looplimiter0 = 0;
                                                        while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                                            if (GLF_live20looplimiter0 >= 7) {
                                                                break;
                                                            }
                                                            GLF_live20looplimiter0++;
                                                            {
                                                                GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                                                GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                                                GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                                                GLF_live20i++;
                                                            }
                                                        }
                                                    }
                                                }
                                                _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, vec4(_GLF_outVarBackup_GLF_color[0], _GLF_outVarBackup_GLF_color[1], _GLF_IDENTITY(_GLF_outVarBackup_GLF_color[2], min(_GLF_outVarBackup_GLF_color[2], _GLF_outVarBackup_GLF_color[2])), _GLF_outVarBackup_GLF_color[3]));
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        {
                                                            vec2 GLF_live19color = _GLF_FUZZED(vec2(-652.537, -9.8));
                                                            int GLF_live19i = _GLF_FUZZED(38960);
                                                            vec3 GLF_live19vecCoor = _GLF_FUZZED(vec3(vec2(3.6, 2.7), 9861.5400));
                                                            if (int(GLF_live19gl_FragCoord[1]) < 60) {
                                                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[1]))));
                                                                GLF_live19color[1] *= atan(faceforward(GLF_live19injectionSwitch, GLF_live19color.xx, GLF_live19vecCoor.yx).y);
                                                                ;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 90) {
                                                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[2]))));
                                                                GLF_live19color.x += atanh(GLF_live19color.x) * cosh(GLF_live19injectionSwitch.y) * smoothstep(GLF_live19color, GLF_live19injectionSwitch, GLF_live19gl_FragCoord.yy).x;
                                                                ;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 120) {
                                                                GLF_live19color = fract(acosh(clamp(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[3])), 1.0, 1000.0)));
                                                                GLF_live19color.x += (isnan(GLF_live19gl_FragCoord.x) ? log2(GLF_live19gl_FragCoord.x) : log2(GLF_live19gl_FragCoord.y));
                                                                ;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 150) {
                                                                ;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 180) {
                                                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[4]))));
                                                                GLF_live19color[1] += asinh(GLF_live19gl_FragCoord.y * ldexp(GLF_live19color.y, -GLF_live19i));
                                                                ;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 210) {
                                                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[5]))));
                                                                GLF_live19color.y -= tanh(GLF_live19color.x) / cosh(GLF_live19color.y);
                                                                ;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 240) {
                                                                GLF_live19color = fract(asinh(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[6]))));
                                                                GLF_live19color.y -= isnan(float(GLF_live19i)) ? tanh(GLF_live19gl_FragCoord.x) : atanh(GLF_live19gl_FragCoord.y);
                                                                ;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 270) {
                                                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[7]))));
                                                                GLF_live19color.y *= mix(normalize(GLF_live19vecCoor), normalize(vec3(GLF_live19color, degrees(GLF_live19color.x))), GLF_live19injectionSwitch.x).y;
                                                                ;
                                                            } else {
                                                                ;
                                                            }
                                                        }
                                                        i = (4 * i * (1000 - i)) / 1000;
                                                    }
                                                }
                                            }
                                        }
                                        int GLF_live2i = _GLF_FUZZED(((-17224) ^ (ivec2(81300, -53373) | (-63814)).y));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(4.1, -938.751, 9.4, 0.4);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        int GLF_live2j = _GLF_FUZZED(-96056);
                                        vec4 GLF_live2res = _GLF_FUZZED(vec4(936.145, 379.707, 3.6, 4.4));
                                        float GLF_live2uvstep = _GLF_FUZZED(((-653.255) + (-2005.5350)));
                                        {
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    float GLF_live13th = _GLF_FUZZED(98.60);
                                                    {
                                                        GLF_live13th = 1.0 - GLF_live13th;
                                                    }
                                                }
                                                float donor_replacementGLF_dead9x = _GLF_FUZZED((+grey));
                                                float donor_replacementGLF_dead9y = _GLF_FUZZED(grey);
                                                {
                                                    if (donor_replacementGLF_dead9x * donor_replacementGLF_dead9x + donor_replacementGLF_dead9y * donor_replacementGLF_dead9y > 4.0) {
                                                        ;
                                                    }
                                                    float GLF_dead9x_new = donor_replacementGLF_dead9x * donor_replacementGLF_dead9x - donor_replacementGLF_dead9y * donor_replacementGLF_dead9y + grey;
                                                    {
                                                        int GLF_live18looplimiter0 = 0;
                                                        if (GLF_live18looplimiter0 >= 7) {
                                                            ;
                                                        }
                                                    }
                                                    donor_replacementGLF_dead9y = 2.0 * donor_replacementGLF_dead9x * donor_replacementGLF_dead9y + GLF_live2uvstep;
                                                    donor_replacementGLF_dead9x = GLF_dead9x_new;
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    GLF_live2i++;
                                                }
                                            }
                                            GLF_live2res += texture(GLF_live2tex, GLF_live2coord + vec2(float(GLF_live2i - 1) * GLF_live2uvstep, float(GLF_live2j - 1) * GLF_live2uvstep)) * GLF_live2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2i * 3 + GLF_live2j, 9)];
                                        }
                                    }
                                    {
                                        float GLF_live13th = _GLF_FUZZED((4.1 * (-3.8)));
                                        vec2 GLF_live13v = _GLF_FUZZED(vec2(2.3, 0.1));
                                        if (GLF_live13v.x < 0.0) {
                                            GLF_live13th = 1.0 - GLF_live13th;
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            {
                                                int GLF_live19i = _GLF_FUZZED((+(true ? (-23000) : 12198)));
                                                int GLF_live19j = _GLF_FUZZED((59677));
                                                int GLF_live19k = _GLF_FUZZED(-8785);
                                                int GLF_live19looplimiter0 = 0;
                                                {
                                                    if (GLF_live19looplimiter0 >= 6) {
                                                        ;
                                                    }
                                                    GLF_live19looplimiter0++;
                                                    {
                                                        if (GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] < GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)]) {
                                                            GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i++, 10)];
                                                        } else {
                                                            GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j++, 10)];
                                                        }
                                                    }
                                                }
                                            }
                                            {
                                                discard;
                                            }
                                        }
                                        _GLF_color = exp2(smoothstep(atan(vec4(-3.8, -0.4, -9.7, -779.246)), vec4(9282.9759, 5481.3265, -0.7, -2.6), vec4(361.805, 743.945, -329.667, -2.9)));
                                        {
                                            int GLF_live17looplimiter0 = 0;
                                            ivec2 GLF_live17pos = _GLF_FUZZED(((30867 | ((-63311) * (-56525))) - ivec2(56225, -24272)));
                                            {
                                                if (GLF_live17looplimiter0 >= 3) {
                                                    ;
                                                }
                                                GLF_live17looplimiter0++;
                                                {
                                                    if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                        float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                        ;
                                                    }
                                                    GLF_live17pos.y++;
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            {
                                                vec2 GLF_live19color = _GLF_FUZZED(vec2(-6954.1595, 16.76));
                                                int GLF_live19i = _GLF_FUZZED((-79695));
                                                vec3 GLF_live19vecCoor = _GLF_FUZZED((mat3(90.07, 99.38, -4.4, -2755.5331, -5236.6357, -8.2, 6724.0309, -7.0, -552.350) * (vec3(-256.671, 466.663, -3.2))));
                                                {
                                                    int GLF_live19looplimiter7 = 0;
                                                    do {
                                                        if (GLF_live19looplimiter7 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live19looplimiter7++;
                                                        {
                                                            if (int(GLF_live19gl_FragCoord[1]) < 30) {
                                                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[0]))));
                                                                GLF_live19color[0] = dFdy(GLF_live19gl_FragCoord.y);
                                                                break;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 60) {
                                                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[1]))));
                                                                GLF_live19color[1] *= atan(faceforward(GLF_live19injectionSwitch, GLF_live19color.xx, GLF_live19vecCoor.yx).y);
                                                                break;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 90) {
                                                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[2]))));
                                                                GLF_live19color.x += atanh(GLF_live19color.x) * cosh(GLF_live19injectionSwitch.y) * smoothstep(GLF_live19color, GLF_live19injectionSwitch, GLF_live19gl_FragCoord.yy).x;
                                                                break;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 120) {
                                                                GLF_live19color = fract(acosh(clamp(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[3])), 1.0, 1000.0)));
                                                                GLF_live19color.x += (isnan(GLF_live19gl_FragCoord.x) ? log2(GLF_live19gl_FragCoord.x) : log2(GLF_live19gl_FragCoord.y));
                                                                break;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 150) {
                                                                ;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 180) {
                                                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[4]))));
                                                                GLF_live19color[1] += asinh(GLF_live19gl_FragCoord.y * ldexp(GLF_live19color.y, -GLF_live19i));
                                                                break;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 210) {
                                                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[5]))));
                                                                GLF_live19color.y -= tanh(GLF_live19color.x) / cosh(GLF_live19color.y);
                                                                break;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 240) {
                                                                GLF_live19color = fract(asinh(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[6]))));
                                                                GLF_live19color.y -= isnan(float(GLF_live19i)) ? tanh(GLF_live19gl_FragCoord.x) : atanh(GLF_live19gl_FragCoord.y);
                                                                break;
                                                            } else if (int(GLF_live19gl_FragCoord[1]) < 270) {
                                                                GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[7]))));
                                                                GLF_live19color.y *= mix(normalize(GLF_live19vecCoor), normalize(vec3(GLF_live19color, degrees(GLF_live19color.x))), GLF_live19injectionSwitch.x).y;
                                                                break;
                                                            } else {
                                                                ;
                                                            }
                                                        }
                                                    } while (0 == int(GLF_live19injectionSwitch.x));
                                                }
                                            }
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    {
                                        vec2 GLF_live20coord = _GLF_FUZZED(vec2(-74.81, -26.12));
                                        int GLF_live20i = _GLF_FUZZED(84737);
                                        int GLF_live20looplimiter0 = 0;
                                        vec4 GLF_live20texel = _GLF_FUZZED(vec4(-8524.6250, 5.2, -7.9, 582.318));
                                        while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                            if (GLF_live20looplimiter0 >= 7) {
                                                break;
                                            }
                                            GLF_live20looplimiter0++;
                                            {
                                                GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                                GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                                GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                                GLF_live20i++;
                                            }
                                        }
                                    }
                                } else {
                                    if (_GLF_IDENTITY(int(gl_FragCoord[1]) < 270, !(!(int(_GLF_IDENTITY(gl_FragCoord[1], mix(float(gl_FragCoord[1]), float(_GLF_FUZZED(-1.5)), bool(false)))) < 270)))) {
                                        _GLF_IDENTITY(grey = 0.5 + float(data[8]) / 10.0, 0.0 + (grey = _GLF_IDENTITY(0.5, (0.5) - 0.0) + float(data[8]) / _GLF_IDENTITY(10.0, float(vec4(10.0, 0.0, 0.0, 1.0)))));
                                        {
                                            vec2 GLF_live2coord = _GLF_FUZZED((-vec2(-7.1, 5.0)));
                                            int GLF_live2i = _GLF_FUZZED(-26359);
                                            int GLF_live2j = _GLF_FUZZED((+(-70165)));
                                            int GLF_live2looplimiter0 = 0;
                                            {
                                                {
                                                    vec2 GLF_live13a = _GLF_FUZZED(vec2(-5.5, 179.231));
                                                    float GLF_live13th = _GLF_FUZZED(5.2);
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    if (GLF_live13a.y < GLF_live13a.x) {
                                                        GLF_live13th = 0.5 - GLF_live13th;
                                                    }
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                {
                                                    ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(96157, -29408));
                                                    {
                                                        int GLF_live17looplimiter0 = 0;
                                                        while (GLF_live17pos.y != 256) {
                                                            if (GLF_live17looplimiter0 >= 3) {
                                                                break;
                                                            }
                                                            GLF_live17looplimiter0++;
                                                            {
                                                                if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                                    float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                                    ;
                                                                }
                                                                GLF_live17pos.y++;
                                                            }
                                                        }
                                                    }
                                                }
                                                {
                                                    vec2 GLF_live13a = _GLF_FUZZED(vec2(vec4(-7877.3841, 6.2, 55.09, -54.24)));
                                                    {
                                                        int GLF_live18cols = _GLF_FUZZED(75310);
                                                        int GLF_live18looplimiter2 = 0;
                                                        uint GLF_live18matrix_number = _GLF_FUZZED((~60115u));
                                                        int GLF_live18rows = _GLF_FUZZED(-90050);
                                                        {
                                                            if (GLF_live18looplimiter2 >= 7) {
                                                                ;
                                                            }
                                                            GLF_live18looplimiter2++;
                                                            {
                                                                {
                                                                    int GLF_live18looplimiter1 = 0;
                                                                    for (int GLF_live18c = 0; GLF_live18c < GLF_live18cols; GLF_live18c++) {
                                                                        if (GLF_live18looplimiter1 >= 7) {
                                                                            break;
                                                                        }
                                                                        GLF_live18looplimiter1++;
                                                                        {
                                                                            {
                                                                                int GLF_live18looplimiter0 = 0;
                                                                                for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                                                    if (GLF_live18looplimiter0 >= 7) {
                                                                                        break;
                                                                                    }
                                                                                    GLF_live18looplimiter0++;
                                                                                    {
                                                                                        switch (GLF_live18matrix_number) {
                                                                                            case 0u:
                                                                                                GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                                break;
                                                                                            case 1u:
                                                                                                GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                                break;
                                                                                            case 2u:
                                                                                                GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                                break;
                                                                                            case 3u:
                                                                                                GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                                break;
                                                                                            case 4u:
                                                                                                GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                                break;
                                                                                            case 5u:
                                                                                                GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                                break;
                                                                                            case 6u:
                                                                                                GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                                break;
                                                                                            case 7u:
                                                                                                GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                                break;
                                                                                            case 8u:
                                                                                                GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                                break;
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                GLF_live18matrix_number = GLF_live18matrix_number + 1u;
                                                            }
                                                        }
                                                    }
                                                    float GLF_live13z = _GLF_FUZZED(-7.4);
                                                    {
                                                        vec2 GLF_live19color = _GLF_FUZZED(vec2(-8.2, -0.0));
                                                        int GLF_live19i = _GLF_FUZZED(35158);
                                                        vec3 GLF_live19vecCoor = _GLF_FUZZED(vec2(-310.120, -0.9).rgr);
                                                        if (int(GLF_live19gl_FragCoord[1]) < 90) {
                                                            GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[2]))));
                                                            GLF_live19color.x += atanh(GLF_live19color.x) * cosh(GLF_live19injectionSwitch.y) * smoothstep(GLF_live19color, GLF_live19injectionSwitch, GLF_live19gl_FragCoord.yy).x;
                                                            ;
                                                        } else if (int(GLF_live19gl_FragCoord[1]) < 120) {
                                                            GLF_live19color = fract(acosh(clamp(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[3])), 1.0, 1000.0)));
                                                            GLF_live19color.x += (isnan(GLF_live19gl_FragCoord.x) ? log2(GLF_live19gl_FragCoord.x) : log2(GLF_live19gl_FragCoord.y));
                                                            ;
                                                        } else if (int(GLF_live19gl_FragCoord[1]) < 150) {
                                                            ;
                                                        } else if (int(GLF_live19gl_FragCoord[1]) < 180) {
                                                            GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[4]))));
                                                            GLF_live19color[1] += asinh(GLF_live19gl_FragCoord.y * ldexp(GLF_live19color.y, -GLF_live19i));
                                                            ;
                                                        } else if (int(GLF_live19gl_FragCoord[1]) < 210) {
                                                            GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[5]))));
                                                            GLF_live19color.y -= tanh(GLF_live19color.x) / cosh(GLF_live19color.y);
                                                            ;
                                                        } else if (int(GLF_live19gl_FragCoord[1]) < 240) {
                                                            GLF_live19color = fract(asinh(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[6]))));
                                                            GLF_live19color.y -= isnan(float(GLF_live19i)) ? tanh(GLF_live19gl_FragCoord.x) : atanh(GLF_live19gl_FragCoord.y);
                                                            ;
                                                        } else if (int(GLF_live19gl_FragCoord[1]) < 270) {
                                                            GLF_live19color = fract(sin(GLF_live19vecCoor.yx - trunc(float(GLF_live19data[7]))));
                                                            GLF_live19color.y *= mix(normalize(GLF_live19vecCoor), normalize(vec3(GLF_live19color, degrees(GLF_live19color.x))), GLF_live19injectionSwitch.x).y;
                                                            ;
                                                        } else {
                                                            ;
                                                        }
                                                    }
                                                    {
                                                        GLF_live13z = GLF_live13a.x / GLF_live13a.y;
                                                    }
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-26.47, -1.1, 192.198, 8651.8726);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    {
                                                        uint GLF_live18matrix_number = _GLF_FUZZED(uvec2(66626u, 150077u).s);
                                                        {
                                                            int GLF_live18looplimiter3 = 0;
                                                            for (int GLF_live18cols = 2; GLF_live18cols <= 4; GLF_live18cols++) {
                                                                if (GLF_live18looplimiter3 >= 7) {
                                                                    break;
                                                                }
                                                                GLF_live18looplimiter3++;
                                                                {
                                                                    {
                                                                        int GLF_live18looplimiter2 = 0;
                                                                        for (int GLF_live18rows = 2; GLF_live18rows <= 4; GLF_live18rows++) {
                                                                            if (GLF_live18looplimiter2 >= 7) {
                                                                                break;
                                                                            }
                                                                            GLF_live18looplimiter2++;
                                                                            {
                                                                                {
                                                                                    int GLF_live18looplimiter1 = 0;
                                                                                    for (int GLF_live18c = 0; GLF_live18c < GLF_live18cols; GLF_live18c++) {
                                                                                        if (GLF_live18looplimiter1 >= 7) {
                                                                                            break;
                                                                                        }
                                                                                        GLF_live18looplimiter1++;
                                                                                        {
                                                                                            {
                                                                                                int GLF_live18looplimiter0 = 0;
                                                                                                for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                                                                    if (GLF_live18looplimiter0 >= 7) {
                                                                                                        break;
                                                                                                    }
                                                                                                    GLF_live18looplimiter0++;
                                                                                                    {
                                                                                                        switch (GLF_live18matrix_number) {
                                                                                                            case 0u:
                                                                                                                GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                                                break;
                                                                                                            case 1u:
                                                                                                                GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                                                break;
                                                                                                            case 2u:
                                                                                                                GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                                                break;
                                                                                                            case 3u:
                                                                                                                GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                                                break;
                                                                                                            case 4u:
                                                                                                                GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                                                break;
                                                                                                            case 5u:
                                                                                                                GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                                                break;
                                                                                                            case 6u:
                                                                                                                GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                                                                break;
                                                                                                            case 7u:
                                                                                                                GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                                                                break;
                                                                                                            case 8u:
                                                                                                                GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                                                                break;
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                                GLF_live18matrix_number = GLF_live18matrix_number + 1u;
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
                                                ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(25181, -50301));
                                                {
                                                    if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                        float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                        ;
                                                    }
                                                    GLF_live17pos.y++;
                                                }
                                            }
                                            vec4 GLF_live2res = _GLF_IDENTITY(_GLF_FUZZED(vec4(-889.413, 3223.7548, 27.04, -7.5)), max(_GLF_FUZZED(vec4(-889.413, 3223.7548, 27.04, -7.5)), _GLF_FUZZED(vec4(-889.413, 3223.7548, 27.04, -7.5))));
                                            float GLF_live2uvstep = _GLF_FUZZED(float((vec3(-18.35, -8.0, -5.9) != vec3(-_GLF_IDENTITY(6011.0303, max(6011.0303, 6011.0303)), -2.5, -2087.0858))));
                                            {
                                                if (GLF_live2looplimiter0 >= 3) {
                                                    ;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    {
                                                        ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(-56389, 79803));
                                                        {
                                                            if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                                float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                                ;
                                                            }
                                                            GLF_live17pos.y++;
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-5367.4324, 8023.2998, -3516.4309, -5.2);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                                {
                                                                    GLF_dead16_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    int donor_replacementGLF_dead8d = _GLF_FUZZED(N);
                                                    ivec2 donor_replacementGLF_dead8p = _GLF_FUZZED(ivec2(-49522, -2165));
                                                    {
                                                        donor_replacementGLF_dead8d--;
                                                        GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y) * 16, 256)] = 1;
                                                        GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y - 1) * 16, 256)] = 1;
                                                        GLF_dead8map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead8p.x) + (donor_replacementGLF_dead8p.y - 2) * 16, 256)] = 1;
                                                        donor_replacementGLF_dead8p.y -= 2;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = exp2(vec4(-80.08, -5.7, -65.59, 3891.1109));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        {
                                                            int GLF_live12c_im = _GLF_FUZZED(33114);
                                                            int GLF_live12c_re = _GLF_FUZZED(18992);
                                                            int GLF_live12iteration = _GLF_FUZZED(1065);
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                vec2 donor_replacementGLF_dead15pos = _GLF_FUZZED(vec2(-258.439, -94.57));
                                                                if (GLF_dead15pointInTriangle(donor_replacementGLF_dead15pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                                                                    {
                                                                        vec2 GLF_live20coord = _GLF_FUZZED(vec2(-8.6, -3.6));
                                                                        int GLF_live20i = _GLF_FUZZED(76753);
                                                                        int GLF_live20looplimiter0 = 0;
                                                                        vec4 GLF_live20texel = _GLF_FUZZED(vec4(39.78, -84.63, -405.512, -35.74));
                                                                        while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                                                            if (GLF_live20looplimiter0 >= 7) {
                                                                                break;
                                                                            }
                                                                            GLF_live20looplimiter0++;
                                                                            {
                                                                                GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                                                                GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                                                                GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                                                                GLF_live20i++;
                                                                            }
                                                                        }
                                                                    }
                                                                    GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                                    {
                                                                        {
                                                                            ;
                                                                        }
                                                                    }
                                                                } else {
                                                                    GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                                                }
                                                            }
                                                            int GLF_live12looplimiter0 = 0;
                                                            int GLF_live12x = _GLF_FUZZED(55357);
                                                            int GLF_live12y = _GLF_FUZZED((~ivec2(-38774, -87348).g));
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            {
                                                                if (GLF_live12looplimiter0 >= 3) {
                                                                    ;
                                                                }
                                                                GLF_live12looplimiter0++;
                                                                {
                                                                    if (_GLF_DEAD(false)) {
                                                                        {
                                                                            GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                                        }
                                                                    }
                                                                    if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 262144) {
                                                                        ;
                                                                    }
                                                                    int GLF_live12x_new = ((GLF_live12x * GLF_live12x - GLF_live12y * GLF_live12y) / 256 + GLF_live12c_re);
                                                                    GLF_live12y = (2 * GLF_live12x * GLF_live12y / 256 + GLF_live12c_im);
                                                                    GLF_live12x = GLF_live12x_new;
                                                                    GLF_live12iteration++;
                                                                    {
                                                                        int GLF_live19looplimiter2 = 0;
                                                                        if (GLF_live19looplimiter2 >= 6) {
                                                                            ;
                                                                        }
                                                                    }
                                                                    if (_GLF_DEAD(false)) {
                                                                        {
                                                                            ;
                                                                            {
                                                                                int GLF_live20looplimiter0 = 0;
                                                                                if (GLF_live20looplimiter0 >= 7) {
                                                                                    ;
                                                                                }
                                                                            }
                                                                        }
                                                                        {
                                                                            ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(45438, 98744));
                                                                            {
                                                                                if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                                                    float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                                                    ;
                                                                                }
                                                                                GLF_live17pos.y++;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        float donor_replacementGLF_dead16B = _GLF_FUZZED(acosh(GLF_live2uvstep));
                                                        float donor_replacementGLF_dead16C = _GLF_FUZZED((fwidthFine(grey) - tanh(clamp(grey, grey, -211.752))));
                                                        float donor_replacementGLF_dead16temp = _GLF_FUZZED(GLF_live2uvstep);
                                                        float donor_replacementGLF_dead16x0 = _GLF_FUZZED(atan(-6.2, GLF_live2uvstep));
                                                        float donor_replacementGLF_dead16x2 = _GLF_FUZZED(GLF_live2uvstep);
                                                        {
                                                            float GLF_dead16h0 = donor_replacementGLF_dead16x0 - donor_replacementGLF_dead16x2;
                                                            float GLF_dead16h1 = grey - donor_replacementGLF_dead16x2;
                                                            float GLF_dead16k0 = GLF_dead16fx(donor_replacementGLF_dead16x0) - GLF_dead16fx(donor_replacementGLF_dead16x2);
                                                            float GLF_dead16k1 = GLF_dead16fx(grey) - GLF_dead16fx(donor_replacementGLF_dead16x2);
                                                            donor_replacementGLF_dead16temp = donor_replacementGLF_dead16x2;
                                                            grey = (((GLF_dead16h1) * (GLF_dead16k0)) - ((GLF_dead16h0) * (GLF_dead16k1))) / ((pow((GLF_dead16h0), 2.0) * (GLF_dead16h1)) - (pow((GLF_dead16h1), 2.0) * (GLF_dead16h0)));
                                                            donor_replacementGLF_dead16B = (((GLF_dead16k0) - (grey * (pow((GLF_dead16h0), 2.0)))) / (GLF_dead16h0));
                                                            donor_replacementGLF_dead16C = GLF_dead16fx(donor_replacementGLF_dead16x2);
                                                            donor_replacementGLF_dead16x2 = donor_replacementGLF_dead16x2 - ((2.0 * donor_replacementGLF_dead16C) / (donor_replacementGLF_dead16B + sign(donor_replacementGLF_dead16B) * sqrt(pow(donor_replacementGLF_dead16B, 2.0) - (4.0 * grey * donor_replacementGLF_dead16C))));
                                                            donor_replacementGLF_dead16x0 = grey;
                                                            grey = donor_replacementGLF_dead16temp;
                                                        }
                                                    }
                                                    _GLF_color = vec4(-5.7, 2.1, 1236.8211, 1859.9476);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                {
                                                    int GLF_live20looplimiter0 = 0;
                                                    if (GLF_live20looplimiter0 >= 7) {
                                                        ;
                                                    }
                                                }
                                                GLF_live2looplimiter0++;
                                                {
                                                    ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(ivec3(91203, -21880, 59913)));
                                                    {
                                                        float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                        ;
                                                    }
                                                }
                                                {
                                                    GLF_live2res += texture(GLF_live2tex, GLF_live2coord + vec2(float(_GLF_IDENTITY(GLF_live2i, (GLF_live2i) - 0) - 1) * GLF_live2uvstep, float(GLF_live2j - 1) * GLF_live2uvstep)) * GLF_live2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2i * 3 + GLF_live2j, 9)];
                                                }
                                            }
                                        }
                                    } else {
                                        discard;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-6952.8597, 7960.9111, 99.77, 9.1);
                                    if (_GLF_DEAD(false)) {
                                        if (!((grey < 0.0 && grey < 0.0) || (grey >= 0.0 && grey >= 0.0))) {
                                            ;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    {
                                        int GLF_live20looplimiter0 = 0;
                                        if (GLF_live20looplimiter0 >= 7) {
                                            ;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                    {
                                        i += 1;
                                    }
                                }
                                {
                                    float GLF_live1c_im = _GLF_FUZZED((-vec2(-0.0, _GLF_IDENTITY(-7.8, clamp(_GLF_IDENTITY(-7.8, clamp(-7.8, _GLF_IDENTITY(-7.8, float(mat3x2(-7.8, 1.0, 0.0, 1.0, 0.0, 1.0))), -7.8)), -7.8, -7.8)))).g);
                                    float GLF_live1c_re = _GLF_FUZZED(((-71.43) + 474.341));
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead5c_im = _GLF_FUZZED(length(vec4(991.965, -417.401, -21.13, 618.273)));
                                        {
                                            {
                                                int GLF_live11looplimiter1 = 0;
                                                if (GLF_live11looplimiter1 >= 4) {
                                                    ;
                                                }
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            {
                                                {
                                                    int GLF_live17looplimiter0 = 0;
                                                    if (GLF_live17looplimiter0 >= 3) {
                                                        ;
                                                    }
                                                }
                                                vec2 GLF_live13a = _GLF_FUZZED(vec2(8.7, 432.636));
                                                float GLF_live13z = _GLF_FUZZED(((mat2(393.136, -7.1, 859.677, -6385.4980) != mat2(218.107, -5.9, -87.50, 443.944)) ? float(88736u) : 6.0));
                                                {
                                                    GLF_live13z = GLF_live13a.x / GLF_live13a.y;
                                                    {
                                                        ivec2 GLF_live17pos = _GLF_FUZZED((ivec2(-99445, -52295) + int((vec3(5.4, -91.64, -4.5) == vec3(-8.5, -18.20, 40.63)))));
                                                        {
                                                            int GLF_live17looplimiter0 = 0;
                                                            while (GLF_live17pos.y != 256) {
                                                                if (GLF_live17looplimiter0 >= 3) {
                                                                    break;
                                                                }
                                                                GLF_live17looplimiter0++;
                                                                {
                                                                    if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                                        float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                                        ;
                                                                    }
                                                                    GLF_live17pos.y++;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec3(-9.1, 0.1, 4198.0249).zxxx;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                float donor_replacementGLF_dead15pab = _GLF_FUZZED(fwidth(normalize(vec3(-65.89, 166.407, -5.7).p)));
                                                if (!((donor_replacementGLF_dead15pab < 0.0 && donor_replacementGLF_dead5c_im < 0.0) || (donor_replacementGLF_dead15pab >= 0.0 && donor_replacementGLF_dead5c_im >= 0.0))) {
                                                    ;
                                                }
                                                {
                                                    int GLF_live17looplimiter0 = 0;
                                                    if (GLF_live17looplimiter0 >= 3) {
                                                        ;
                                                    }
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        {
                                            ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(-14286, 55773));
                                            {
                                                if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                    float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                    ;
                                                }
                                                GLF_live17pos.y++;
                                            }
                                        }
                                        do {
                                            if (grey * _GLF_IDENTITY(grey, (_GLF_IDENTITY(grey, (false ? _GLF_FUZZED(GLF_live1c_im) : grey))) + 0.0) + GLF_live1c_im * GLF_live1c_im > 4.0) {
                                                break;
                                            }
                                            float GLF_dead5x_new = grey * grey - GLF_live1c_im * GLF_live1c_im + grey;
                                            GLF_live1c_im = 2.0 * grey * GLF_live1c_im + donor_replacementGLF_dead5c_im;
                                            grey = GLF_dead5x_new;
                                            i++;
                                            i++;
                                        } while (i < bitfieldInsert(i + (257.0 > GLF_dead5resolution.y ? 1 : 0), 0, 0, 0));
                                    }
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                            {
                                                {
                                                    vec2 GLF_live20coord = _GLF_FUZZED(vec2(-4.3, -9156.8079));
                                                    int GLF_live20i = _GLF_FUZZED(((-37182) & ((-26771) & (-63516))));
                                                    vec4 GLF_live20texel = _GLF_FUZZED(vec4(467.124, -982.760, 9567.9463, -95.16));
                                                    {
                                                        GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                                        GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                                        GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                                        GLF_live20i++;
                                                    }
                                                }
                                                GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                            }
                                        }
                                        float GLF_live13th = _GLF_FUZZED(((-134.785) + (-4.8)));
                                        {
                                            GLF_live13th = 0.5 - GLF_live13th;
                                        }
                                    }
                                    int GLF_live1iteration = _GLF_FUZZED((-96750));
                                    {
                                        int GLF_live11looplimiter0 = 0;
                                        if (GLF_live11looplimiter0 >= 4) {
                                            ;
                                            {
                                                ivec2 GLF_live17pos = _GLF_FUZZED((ivec2(-44278, 3206) | 55753));
                                                {
                                                    int GLF_live17looplimiter0 = 0;
                                                    while (GLF_live17pos.y != 256) {
                                                        if (GLF_live17looplimiter0 >= 3) {
                                                            break;
                                                        }
                                                        GLF_live17looplimiter0++;
                                                        {
                                                            if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                                float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                                ;
                                                            }
                                                            GLF_live17pos.y++;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    int GLF_live1k = _GLF_FUZZED(-49267);
                                    int GLF_live1looplimiter0 = 0;
                                    float GLF_live1x = _GLF_FUZZED(40.90);
                                    float GLF_live1y = _GLF_FUZZED((vec4(5736.6708, -43.49, -3.9, 19.75) * mat3x4(mat3x2(18.46, 3083.9605, -9.2, 852.488, 2.0, 52.63))).s);
                                    {
                                        if (GLF_live1looplimiter0 >= 4) {
                                            ;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            {
                                                int GLF_live20looplimiter0 = 0;
                                                if (GLF_live20looplimiter0 >= 7) {
                                                    ;
                                                }
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = _GLF_IDENTITY(vec4(-8.4, 3978.7120, -3.4, 144.824), mat4(_GLF_ONE(1.0, injectionSwitch.y)) * (vec4(-8.4, 3978.7120, -3.4, 144.824)));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        GLF_live1looplimiter0++;
                                        {
                                            if (GLF_live1x * GLF_live1x + GLF_live1y * GLF_live1y > 4.0) {
                                                {
                                                    vec2 GLF_live20coord = _GLF_FUZZED(vec2(1.8, 1873.0270));
                                                    int GLF_live20i = _GLF_FUZZED((85877 ^ (-26826)));
                                                    int GLF_live20looplimiter0 = 0;
                                                    vec4 GLF_live20texel = _GLF_FUZZED((vec4(6.4, -9.1, 342.146, 7.8).r + vec4(-6573.7146, 2607.6262, 3301.7797, -77.63)));
                                                    {
                                                        if (GLF_live20looplimiter0 >= 7) {
                                                            ;
                                                        }
                                                        GLF_live20looplimiter0++;
                                                        {
                                                            GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                                            GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                                            GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                                            GLF_live20i++;
                                                        }
                                                    }
                                                }
                                                ;
                                            }
                                            float GLF_live1x_new = GLF_live1x * GLF_live1x - GLF_live1y * GLF_live1y + _GLF_IDENTITY(GLF_live1c_re, (_GLF_IDENTITY(GLF_live1c_re, clamp(GLF_live1c_re, _GLF_IDENTITY(GLF_live1c_re, clamp(GLF_live1c_re, GLF_live1c_re, GLF_live1c_re)), GLF_live1c_re))) * 1.0);
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            GLF_live1y = 2.0 * GLF_live1x * GLF_live1y + GLF_live1c_im;
                                            GLF_live1x = GLF_live1x_new;
                                            {
                                                int GLF_live19high = _GLF_FUZZED(((-14810) | (-59490)));
                                                int GLF_live19low = _GLF_FUZZED(-75931);
                                                {
                                                    int GLF_live19looplimiter4 = 0;
                                                    for (int GLF_live19m = 1; GLF_live19m <= GLF_live19high; GLF_live19m = 2 * GLF_live19m) {
                                                        if (GLF_live19looplimiter4 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live19looplimiter4++;
                                                        {
                                                            {
                                                                int GLF_live19looplimiter3 = 0;
                                                                for (int GLF_live19i = GLF_live19low; GLF_live19i < GLF_live19high; GLF_live19i += 2 * GLF_live19m) {
                                                                    if (GLF_live19looplimiter3 >= 6) {
                                                                        break;
                                                                    }
                                                                    GLF_live19looplimiter3++;
                                                                    {
                                                                        int GLF_live19from = GLF_live19i;
                                                                        int GLF_live19mid = GLF_live19i + GLF_live19m - 1;
                                                                        int GLF_live19to = min(GLF_live19i + 2 * GLF_live19m - 1, GLF_live19high);
                                                                        GLF_live19merge(GLF_live19from, GLF_live19mid, GLF_live19to);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_live1iteration++;
                                            GLF_live1k++;
                                            if (_GLF_DEAD(false)) {
                                                if (0.0 > GLF_dead5resolution.y) {
                                                    GLF_live1iteration += 1;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        vec2 donor_replacementGLF_dead15pos = _GLF_FUZZED(vec2(674.385, 3.8));
                                                        if (GLF_dead15pointInTriangle(donor_replacementGLF_dead15pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                                                            GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                        } else {
                                                            GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    {
                                        int GLF_live17looplimiter0 = 0;
                                        ivec2 GLF_live17pos = _GLF_FUZZED(((-35068) ^ ivec2(6394, -80446)));
                                        while (GLF_live17pos.y != 256) {
                                            if (GLF_live17looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live17looplimiter0++;
                                            {
                                                if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                                    float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                                    ;
                                                }
                                                GLF_live17pos.y++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        {
                            int GLF_live18cols = _GLF_FUZZED(-43646);
                            uint GLF_live18matrix_number = _GLF_FUZZED(191624u);
                            {
                                int GLF_live18looplimiter2 = 0;
                                for (int GLF_live18rows = 2; GLF_live18rows <= 4; GLF_live18rows++) {
                                    if (GLF_live18looplimiter2 >= 7) {
                                        break;
                                    }
                                    GLF_live18looplimiter2++;
                                    {
                                        {
                                            int GLF_live18looplimiter1 = 0;
                                            for (int GLF_live18c = 0; GLF_live18c < GLF_live18cols; GLF_live18c++) {
                                                if (GLF_live18looplimiter1 >= 7) {
                                                    break;
                                                }
                                                GLF_live18looplimiter1++;
                                                {
                                                    {
                                                        int GLF_live18looplimiter0 = 0;
                                                        for (int GLF_live18r = 0; GLF_live18r < GLF_live18rows; GLF_live18r++) {
                                                            if (GLF_live18looplimiter0 >= 7) {
                                                                break;
                                                            }
                                                            GLF_live18looplimiter0++;
                                                            {
                                                                switch (GLF_live18matrix_number) {
                                                                    case 0u:
                                                                        GLF_live18m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                        break;
                                                                    case 1u:
                                                                        GLF_live18m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                        break;
                                                                    case 2u:
                                                                        GLF_live18m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                        break;
                                                                    case 3u:
                                                                        GLF_live18m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                        break;
                                                                    case 4u:
                                                                        GLF_live18m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                        break;
                                                                    case 5u:
                                                                        GLF_live18m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                        break;
                                                                    case 6u:
                                                                        GLF_live18m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 2)] = GLF_live18one;
                                                                        break;
                                                                    case 7u:
                                                                        GLF_live18m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 3)] = GLF_live18one;
                                                                        break;
                                                                    case 8u:
                                                                        GLF_live18m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live18r, 4)] = GLF_live18one;
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_live18matrix_number = GLF_live18matrix_number + 1u;
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    {
                        ;
                    }
                    {
                        vec2 GLF_live20coord = _GLF_FUZZED((-vec2(85.53, -3.1)));
                        int GLF_live20i = _GLF_FUZZED(-85241);
                        vec4 GLF_live20texel = _GLF_FUZZED(vec4(-7073.9256, -6.4, 175.781, -5.1));
                        {
                            int GLF_live20looplimiter0 = 0;
                            while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                if (GLF_live20looplimiter0 >= 7) {
                                    break;
                                }
                                GLF_live20looplimiter0++;
                                {
                                    GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                    GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                    GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                    GLF_live20i++;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    _GLF_color = vec4(vec3(grey), 1.0);
    {
        int GLF_live17looplimiter0 = 0;
        ivec2 GLF_live17pos = _GLF_FUZZED(ivec3(-73081, -58794, 64223).yy);
        while (GLF_live17pos.y != 256) {
            if (GLF_live17looplimiter0 >= 3) {
                break;
            }
            GLF_live17looplimiter0++;
            {
                if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                    float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                    ;
                }
                GLF_live17pos.y++;
            }
        }
    }
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = min(vec4(-2160.3530, 94.86, -7.3, 26.48), vec4(-7804.7376, 272.986, 6.2, 4845.0890));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    float GLF_live13th = _GLF_FUZZED((-8.6));
                    {
                        GLF_live13th = 1.0 - GLF_live13th;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = min(dFdxFine(vec4(227.911, 3.7, -7.8, -1.7)), -3.8);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            ;
            if (_GLF_DEAD(false)) {
                {
                    {
                        ;
                    }
                }
                int donor_replacementGLF_dead5iteration = _GLF_FUZZED(max(N, i));
                int donor_replacementGLF_dead5iterationCap = _GLF_FUZZED(N);
                {
                    float GLF_live13th = _GLF_FUZZED((8066.8247));
                    vec2 GLF_live13v = _GLF_FUZZED(vec2(-4.1, 4.6));
                    if (GLF_live13v.y < 0.0) {
                        GLF_live13th = -GLF_live13th;
                    }
                }
                float donor_replacementGLF_dead5xCoord = _GLF_FUZZED(9548.4887);
                float donor_replacementGLF_dead5yCoord = _GLF_FUZZED(trunc(grey));
                {
                    vec2 GLF_live13a = _GLF_FUZZED(vec2(624.884, 622.737));
                    float GLF_live13z = _GLF_FUZZED((+(-5.6)));
                    if (GLF_live13a.y > GLF_live13a.x) {
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            }
                        }
                        GLF_live13z = GLF_live13a.x / GLF_live13a.y;
                    } else {
                        GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                    }
                }
                if (donor_replacementGLF_dead5iteration < bitfieldInsert(donor_replacementGLF_dead5iterationCap, 0, 0, 0)) {
                    ;
                } else {
                    ;
                }
            }
        }
        {
            ivec2 GLF_live17pos = _GLF_FUZZED(ivec2(ivec3(6807, 12586, -2197)));
            {
                if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                    float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                    ;
                }
                GLF_live17pos.y++;
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            {
                ;
            }
        }
        _GLF_color = vec4(78.67, 9.5, 4.3, 6.6);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        {
            {
                vec2 GLF_live20coord = _GLF_FUZZED(vec2(7.2, -5.1));
                int GLF_live20i = _GLF_FUZZED(59778);
                int GLF_live20looplimiter0 = 0;
                vec4 GLF_live20texel = _GLF_FUZZED(((mat2x4(-9.6, -588.128, 9.0, -1.0, 9052.7763, 5.6, -5998.3889, -9438.9262)) * vec2(-4.9, -4.1)));
                while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                    if (GLF_live20looplimiter0 >= 7) {
                        break;
                    }
                    GLF_live20looplimiter0++;
                    {
                        GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                        GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                        GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                        GLF_live20i++;
                    }
                }
            }
            int GLF_live11looplimiter0 = 0;
            if (GLF_live11looplimiter0 >= 4) {
                if (_GLF_DEAD(false)) {
                    {
                        {
                            vec2 GLF_live20coord = _GLF_FUZZED(vec2(609.657, 7218.8391));
                            int GLF_live20i = _GLF_FUZZED(60856);
                            int GLF_live20looplimiter0 = 0;
                            vec4 GLF_live20texel = _GLF_FUZZED(vec4(52.10, -0.1, 1667.7662, -4157.3421));
                            while (GLF_live20texel.x + GLF_live20texel.y + GLF_live20texel.z > 1.0 && GLF_live20i < 16) {
                                if (GLF_live20looplimiter0 >= 7) {
                                    break;
                                }
                                GLF_live20looplimiter0++;
                                {
                                    GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                    GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                    GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                    GLF_live20i++;
                                }
                            }
                        }
                        GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    }
                }
                ;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                vec2 donor_replacementGLF_dead15pos = _GLF_FUZZED(GLF_dead6injectionSwitch);
                if (GLF_dead15pointInTriangle(donor_replacementGLF_dead15pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                    {
                        ivec2 GLF_live17pos = _GLF_FUZZED((ivec2(89659, 71358) * ivec2(26537, -16527)));
                        {
                            int GLF_live17looplimiter0 = 0;
                            while (GLF_live17pos.y != 256) {
                                if (GLF_live17looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live17looplimiter0++;
                                {
                                    if (GLF_live17pos.x < GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] + 15 && GLF_live17pos.x > GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)] - 15) {
                                        float GLF_live17p = (15.0 - abs(float(GLF_live17pos.x - GLF_live17dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                    GLF_live17pos.y++;
                                }
                            }
                        }
                    }
                    GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } else {
                    GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                    {
                        vec2 GLF_live20coord = _GLF_FUZZED(vec2(2.3, -64.57));
                        int GLF_live20i = _GLF_FUZZED(ivec3(-52062, 60623, -87434).r);
                        int GLF_live20looplimiter0 = 0;
                        vec4 GLF_live20texel = _GLF_FUZZED(vec4(-8.9, -954.241, 1758.1752, -6.9));
                        {
                            if (GLF_live20looplimiter0 >= 7) {
                                ;
                            }
                            GLF_live20looplimiter0++;
                            {
                                GLF_live20coord = GLF_live20texel.xz + GLF_live20texel.yy;
                                GLF_live20coord = floor(GLF_live20coord * 256.0) / 256.0;
                                GLF_live20texel = texture(GLF_live20tex, GLF_live20coord);
                                GLF_live20i++;
                            }
                        }
                    }
                }
            }
        }
    }
}
