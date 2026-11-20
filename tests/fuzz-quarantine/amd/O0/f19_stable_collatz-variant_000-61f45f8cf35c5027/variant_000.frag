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

vec4 GLF_dead29_GLF_color = _GLF_FUZZED(vec4(-7.4, -88.67, (66.11 * 303.160), -76.03));

layout(set = 0, binding = 2) uniform buf2 {
    float GLF_dead29one;
};

mat2 GLF_dead29m22 = _GLF_FUZZED((((-8.2) + mat4x2(-6354.3328, 633.882, -80.85, 81.59, 91.43, -3.9, 70.69, 7.0)) * mat2x4(-918.354, -3.3, -957.732, -6.1, 1195.6421, 4094.2704, -0.3, 558.337)));
mat2x3 GLF_dead29m23 = _GLF_FUZZED(mat2x3(2.3, -9.9, 85.29, -9.0, 4.4, 586.800));
mat2x4 GLF_dead29m24 = _GLF_FUZZED(mat2x4(-1.1, 99.31, -8.6, 17.50, -11.30, 1.3, 3355.1808, 5.2));
mat3x2 GLF_dead29m32 = _GLF_FUZZED((true ? mat3x2(617.618, 4147.2539, -5.0, 363.728, -96.34, -840.691) : mat3x2(-179.513, -77.13, -8.8, -8.8, -8.6, -15.86)));
mat3 GLF_dead29m33 = _GLF_FUZZED((((-561.965) - mat4x3(-3.3, 556.327, -4662.2133, 5.6, 6485.5119, -973.660, 4.4, 4.4, -198.969, -39.01, 178.019, 1709.3064)) * (mat4(-9.4, -7.6, 3.4, -66.49, 4154.5434, 55.11, 4.3, 8622.3857, -4.1, 756.038, -7.9, -59.93, 97.59, -5978.2409, 3.5, -4.1) * mat3x4(2.0, 1.7, -7.9, -460.483, 309.030, -5.6, 0.8, 1.4, -2969.4082, -23.65, 58.59, 2.8))));
mat3x4 GLF_dead29m34 = _GLF_FUZZED(mat3x4(2.2, 9904.4833, -3.5, -47.52, -502.784, 2.7, -89.94, 1.0, 1957.8562, -8.6, -67.04, -924.230));
mat4x2 GLF_dead29m42 = _GLF_FUZZED((-mat4x2(814.819, -4.2, 1080.3514, -0.3, 7.1, -423.270, -7.0, -9.7)));
mat4x3 GLF_dead29m43 = _GLF_FUZZED(mat4x3(3.3, 84.46, 8.6, 477.754, 9064.0903, -96.66, 4661.0479, 9.6, -23.93, -95.20, -13.87, -3.5));
mat4 GLF_dead29m44 = _GLF_FUZZED(mat4(1.7, 6298.7523, -6.1, -3638.6418, -176.585, -86.93, -23.25, 36.73, 705.752, 124.598, -5.3, 61.88, -0.9, -31.45, 5.3, -8.2));
int GLF_dead27MATRIX_N = 4;

ivec2 GLF_dead24iter(ivec2 GLF_dead24p) {
    if (GLF_dead24p.x > 0) {
        GLF_dead24p.y--;
    }
    if (GLF_dead24p.x < 0) {
        GLF_dead24p.y++;
    }
    GLF_dead24p.x += GLF_dead24p.y / 2;
    return GLF_dead24p;
}

layout(set = 0, binding = 3) uniform sampler2D GLF_dead26tex;
layout(set = 0, binding = 4) uniform sampler2D GLF_dead25tex;
vec4 GLF_live23_GLF_color = _GLF_FUZZED(vec4(-4.0, 82.96, 1826.9353, 6568.9268));

struct GLF_live23BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live23BST GLF_live23tree[10] = GLF_live23BST[10](GLF_live23BST(0, 0, 0), GLF_live23BST(0, 0, 0), GLF_live23BST(0, 0, 0), GLF_live23BST(0, 0, 0), GLF_live23BST(0, 0, 0), GLF_live23BST(0, 0, 0), GLF_live23BST(0, 0, 0), GLF_live23BST(0, 0, 0), GLF_live23BST(0, 0, 0), GLF_live23BST(0, 0, 0));

void GLF_live23makeTreeNode(inout GLF_live23BST GLF_live23tree, int GLF_live23data) {
    GLF_live23tree.data = GLF_live23data;
    GLF_live23tree.leftIndex = -1;
    GLF_live23tree.rightIndex = -1;
}

int GLF_live23search(int GLF_live23target) {
    GLF_live23BST GLF_live23currentNode = GLF_live23BST(0, 0, 0);
    int GLF_live23index = 0;
    {
        int GLF_live23looplimiter1 = 0;
        while (GLF_live23index != -1) {
            if (GLF_live23looplimiter1 >= 7) {
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(abs(ivec4(17764, -44635, 17741, -47042).xx));
                    {
                        donor_replacementGLF_dead24p = GLF_dead24iter(donor_replacementGLF_dead24p);
                    }
                }
                break;
            }
            GLF_live23looplimiter1++;
            {
                GLF_live23currentNode = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23index, 10)];
                if (GLF_live23currentNode.data == GLF_live23target) {
                    return GLF_live23target;
                }
                GLF_live23index = GLF_live23target > GLF_live23currentNode.data ? GLF_live23currentNode.rightIndex : GLF_live23currentNode.leftIndex;
            }
        }
    }
    return -1;
}

const int GLF_live21dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
layout(set = 0, binding = 5) uniform sampler2D GLF_live22tex;

struct GLF_live18BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live18BST GLF_live18tree[10] = GLF_live18BST[10](GLF_live18BST(0, 0, 0), GLF_live18BST(0, 0, 0), GLF_live18BST(0, 0, 0), GLF_live18BST(0, 0, 0), GLF_live18BST(0, 0, 0), GLF_live18BST(0, 0, 0), GLF_live18BST(0, 0, 0), GLF_live18BST(0, 0, 0), GLF_live18BST(0, 0, 0), GLF_live18BST(0, 0, 0));

void GLF_live18makeTreeNode(inout GLF_live18BST GLF_live18tree, int GLF_live18data) {
    GLF_live18tree.data = GLF_live18data;
    GLF_live18tree.leftIndex = -1;
    GLF_live18tree.rightIndex = -1;
}

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_live17injectionSwitch;
};

struct GLF_live19QuicksortObject {
    int numbers[10];
};

GLF_live19QuicksortObject GLF_live19obj = GLF_live19QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_live19swap(int GLF_live19i, int GLF_live19j) {
    int GLF_live19temp = GLF_live19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)];
    GLF_live19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = GLF_live19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)];
    GLF_live19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)] = GLF_live19temp;
}

layout(set = 0, binding = 7) uniform sampler2D GLF_dead15tex;
const float GLF_dead15weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);

struct GLF_live10BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live10BST GLF_live10tree[10] = GLF_live10BST[10](GLF_live10BST(0, 0, 0), GLF_live10BST(0, 0, 0), GLF_live10BST(0, 0, 0), GLF_live10BST(0, 0, 0), GLF_live10BST(0, 0, 0), GLF_live10BST(0, 0, 0), GLF_live10BST(0, 0, 0), GLF_live10BST(0, 0, 0), GLF_live10BST(0, 0, 0), GLF_live10BST(0, 0, 0));

void GLF_live10makeTreeNode(inout GLF_live10BST GLF_live10tree, int GLF_live10data) {
    GLF_live10tree.data = GLF_live10data;
    GLF_live10tree.leftIndex = -1;
    GLF_live10tree.rightIndex = -1;
}

layout(set = 0, binding = 8) uniform sampler2D GLF_live8tex;
layout(set = 0, binding = 9) uniform sampler2D GLF_live11tex;
int GLF_dead6data[10] = int[10](_GLF_FUZZED(-49539), _GLF_FUZZED(27915), _GLF_FUZZED((-(22262 ^ 52584))), _GLF_FUZZED(29575), _GLF_FUZZED((~((-53538) ^ 61310))), _GLF_FUZZED(-50369), _GLF_FUZZED((35681 - (-15418))), _GLF_FUZZED(63525), _GLF_FUZZED(54637), _GLF_FUZZED(ivec2(92914, -83046).s)), GLF_dead6temp[10] = int[10](_GLF_FUZZED((~26525)), _GLF_FUZZED(((47066 - 91195))), _GLF_FUZZED(-58772), _GLF_FUZZED(int(43496u)), _GLF_FUZZED(-95492), _GLF_FUZZED(-67099), _GLF_FUZZED(int(186662u)), _GLF_FUZZED((-55264)), _GLF_FUZZED(54960), _GLF_FUZZED((-68818)));
layout(set = 0, binding = 10) uniform sampler2D GLF_dead7tex;
int GLF_live2map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
layout(set = 0, binding = 11) uniform sampler2D GLF_dead1tex;
const float GLF_dead1weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

const vec4 pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));

int collatz(int v) {
    {
        int GLF_live2directions = _GLF_FUZZED(-97888);
        {
            int GLF_live8looplimiter0 = 0;
            if (GLF_live8looplimiter0 >= 6) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(clamp(atan(vec2(-9.8, 4.4), vec2(-71.11, 7.6)), 0.4, 4788.6920));
                    float donor_replacementGLF_dead25h = _GLF_FUZZED(refract(6888.3661, -564.556, -677.184));
                    float donor_replacementGLF_dead25refh = _GLF_FUZZED(atanh(-295.199));
                    float donor_replacementGLF_dead25slope = _GLF_FUZZED(3644.6458);
                    vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(resolution);
                    while (donor_replacementGLF_dead25h < donor_replacementGLF_dead25refh && GLF_live8looplimiter0 < 32) {
                        donor_replacementGLF_dead25coord -= donor_replacementGLF_dead25uvstep;
                        donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                        donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                        GLF_live8looplimiter0++;
                    }
                }
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    float donor_replacementGLF_dead13th = _GLF_FUZZED((length(mat3(634.122, 375.580, 380.674, 10.05, -249.160, 1240.0957, 38.98, 6575.3402, -55.02)[1]) + (-36.38)));
                    vec2 donor_replacementGLF_dead13v = _GLF_FUZZED(radians(mod(resolution, mix(vec2(-9232.1919, -2.8), resolution, 3.7))));
                    {
                        {
                            ;
                            if (_GLF_DEAD(false)) {
                                if (donor_replacementGLF_dead13v.y > 1.0) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        while (GLF_live8looplimiter0 > 1) {
                                            if ((GLF_live8looplimiter0 & 1) == 1) {
                                                GLF_live8looplimiter0 = 3 * GLF_live8looplimiter0 + 1;
                                            } else {
                                                GLF_live8looplimiter0 /= 2;
                                            }
                                            GLF_dead27MATRIX_N++;
                                        }
                                    }
                                    donor_replacementGLF_dead13v.y -= 1.0;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead27u = _GLF_FUZZED(GLF_live2directions);
                        {
                            donor_replacementGLF_dead13th += pow(GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27u, 4)], 2.0);
                        }
                    }
                    if (donor_replacementGLF_dead13v.x < 0.0) {
                        donor_replacementGLF_dead13th = 1.0 - donor_replacementGLF_dead13th;
                    }
                    {
                        int GLF_live18looplimiter0 = 0;
                        if (GLF_live18looplimiter0 >= 6) {
                            ;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        GLF_dead27MATRIX_N = (4 * GLF_dead27MATRIX_N * (1000 - GLF_dead27MATRIX_N)) / 1000;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(resolution);
                int donor_replacementGLF_dead26i = _GLF_FUZZED(abs(GLF_live8looplimiter0));
                while (donor_replacementGLF_dead26i < 1 && donor_replacementGLF_dead26coord.x > 1.0 || donor_replacementGLF_dead26coord.y > 1.0) {
                    if (donor_replacementGLF_dead26coord.x > 1.0) {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                            float donor_replacementGLF_dead31c_im = _GLF_FUZZED(-1.7);
                            float donor_replacementGLF_dead31c_re = _GLF_FUZZED(determinant(mat2(-9.8, -6.9, -6.9, -280.796)));
                            int donor_replacementGLF_dead31iteration = _GLF_FUZZED(GLF_live8looplimiter0);
                            float donor_replacementGLF_dead31x = _GLF_FUZZED(-974.651);
                            float donor_replacementGLF_dead31y = _GLF_FUZZED(7.9);
                            for (int GLF_dead31k = 0; GLF_dead31k < 1000; GLF_dead31k++) {
                                if (donor_replacementGLF_dead31x * donor_replacementGLF_dead31x + donor_replacementGLF_dead31y * donor_replacementGLF_dead31y > 4.0) {
                                    break;
                                }
                                float GLF_dead31x_new = donor_replacementGLF_dead31x * donor_replacementGLF_dead31x - donor_replacementGLF_dead31y * donor_replacementGLF_dead31y + donor_replacementGLF_dead31c_re;
                                donor_replacementGLF_dead31y = 2.0 * donor_replacementGLF_dead31x * donor_replacementGLF_dead31y + donor_replacementGLF_dead31c_im;
                                donor_replacementGLF_dead31x = GLF_dead31x_new;
                                donor_replacementGLF_dead31iteration++;
                            }
                        }
                        donor_replacementGLF_dead26coord.x -= 1.0;
                    }
                    if (donor_replacementGLF_dead26coord.y > 1.0)
                        donor_replacementGLF_dead26coord.y -= 1.0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            v = (4 * v * (1000 - v)) / 1000;
                        }
                    }
                    donor_replacementGLF_dead26coord *= 2.0;
                    donor_replacementGLF_dead26i++;
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead28count = _GLF_FUZZED(14914);
                        {
                            if ((GLF_live2directions & 1) == 1) {
                                GLF_live2directions = 3 * GLF_live2directions + 1;
                            } else {
                                GLF_live2directions /= 2;
                            }
                            donor_replacementGLF_dead28count++;
                        }
                    }
                }
            }
        }
        {
            {
                int GLF_live19h = _GLF_FUZZED((((-76631) * 93321) + (-11479)));
                int GLF_live19i = _GLF_FUZZED((~(-74879)));
                int GLF_live19l = _GLF_FUZZED(-62470);
                int GLF_live19pivot = _GLF_FUZZED(-23425);
                {
                    int GLF_live19looplimiter0 = 0;
                    for (int GLF_live19j = GLF_live19l; GLF_live19j <= GLF_live19h - 1; GLF_live19j++) {
                        if (GLF_live19looplimiter0 >= 5) {
                            break;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead30v = _GLF_FUZZED(ivec4(-10737, 80380, 26850, -31486)[2]);
                                {
                                    donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                                }
                            }
                        }
                        {
                            int GLF_live21looplimiter0 = 0;
                            ivec2 GLF_live21pos = _GLF_FUZZED((ivec2(-69237, 47851).rr - (-20455)));
                            {
                                if (GLF_live21looplimiter0 >= 7) {
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(GLF_live17injectionSwitch);
                                        float donor_replacementGLF_dead25h = _GLF_FUZZED(-7903.4660);
                                        int donor_replacementGLF_dead25i = _GLF_FUZZED(GLF_live19looplimiter0);
                                        float donor_replacementGLF_dead25refh = _GLF_FUZZED(-4686.1796);
                                        float donor_replacementGLF_dead25slope = _GLF_FUZZED(length(vec3(-35.55, -228.980, 512.242)));
                                        vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(min(injectionSwitch, vec2(-4104.0589, 0.6)));
                                        while (donor_replacementGLF_dead25h < donor_replacementGLF_dead25refh && donor_replacementGLF_dead25i < 32) {
                                            donor_replacementGLF_dead25coord -= donor_replacementGLF_dead25uvstep;
                                            donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                                            donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                            donor_replacementGLF_dead25i++;
                                        }
                                    }
                                    ;
                                }
                                GLF_live21looplimiter0++;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead30v = _GLF_FUZZED((~ivec3(39556, 61774, 52789).p));
                                            for (GLF_dead27MATRIX_N = 0; GLF_dead27MATRIX_N < GLF_live19l; GLF_dead27MATRIX_N++) {
                                                donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                                            }
                                        }
                                        GLF_live21pos.x = -GLF_live21pos.x;
                                    }
                                }
                                {
                                    if (GLF_live21pos.x < GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] + 15 && GLF_live21pos.x > GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] - 15) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            float donor_replacementGLF_dead27alpha2 = _GLF_FUZZED(fma(8.0, -5.2, 7.5));
                                            float donor_replacementGLF_dead27alpha3 = _GLF_FUZZED(966.631);
                                            float donor_replacementGLF_dead27beta = _GLF_FUZZED(-8602.5388);
                                            mat4 donor_replacementGLF_dead27matrix_a = _GLF_FUZZED((-mat4(-1.6, -5.0, 9.2, 651.353, -371.791, -7.3, 39.09, -1.7, 68.32, -20.70, -9955.6056, 17.32, -8566.4298, -9094.8282, -29.82, 4.5)));
                                            for (int GLF_dead27j = GLF_live19l; GLF_dead27j < GLF_dead27MATRIX_N; GLF_dead27j++) {
                                                for (int GLF_dead27a = GLF_dead27MATRIX_N - 1; GLF_dead27a >= GLF_live19l; GLF_dead27a--) {
                                                    donor_replacementGLF_dead27alpha3 += GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)] * donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)];
                                                }
                                                donor_replacementGLF_dead27beta = donor_replacementGLF_dead27alpha2 * donor_replacementGLF_dead27alpha3;
                                                for (int GLF_dead27a = GLF_dead27MATRIX_N - 1; GLF_dead27a >= GLF_live19l; GLF_dead27a--) {
                                                    donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)] = donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)] - (donor_replacementGLF_dead27beta * GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)]);
                                                }
                                                donor_replacementGLF_dead27alpha3 = 0.0;
                                                donor_replacementGLF_dead27beta = 0.0;
                                            }
                                        }
                                        float GLF_live21p = (15.0 - abs(float(GLF_live21pos.x - GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                        float donor_replacementGLF_dead31c_im = _GLF_FUZZED(545.393);
                                        float donor_replacementGLF_dead31c_re = _GLF_FUZZED(-131.197);
                                        int donor_replacementGLF_dead31iteration = _GLF_FUZZED(GLF_live21looplimiter0);
                                        float donor_replacementGLF_dead31x = _GLF_FUZZED(370.784);
                                        float donor_replacementGLF_dead31y = _GLF_FUZZED(3.8);
                                        for (int GLF_dead31k = 0; GLF_dead31k < 1000; GLF_dead31k++) {
                                            if (donor_replacementGLF_dead31x * donor_replacementGLF_dead31x + donor_replacementGLF_dead31y * donor_replacementGLF_dead31y > 4.0) {
                                                break;
                                            }
                                            float GLF_dead31x_new = donor_replacementGLF_dead31x * donor_replacementGLF_dead31x - donor_replacementGLF_dead31y * donor_replacementGLF_dead31y + donor_replacementGLF_dead31c_re;
                                            donor_replacementGLF_dead31y = 2.0 * donor_replacementGLF_dead31x * donor_replacementGLF_dead31y + donor_replacementGLF_dead31c_im;
                                            donor_replacementGLF_dead31x = GLF_dead31x_new;
                                            donor_replacementGLF_dead31iteration++;
                                        }
                                    }
                                    GLF_live21pos.y++;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    ;
                                }
                            }
                        }
                        GLF_live19looplimiter0++;
                        {
                            if (GLF_live19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)] <= GLF_live19pivot) {
                                GLF_live19i++;
                                GLF_live19swap(GLF_live19i, GLF_live19j);
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead27beta = _GLF_FUZZED(GLF_live17injectionSwitch[0]);
                        for (int GLF_dead27b = GLF_dead27MATRIX_N - 1; GLF_dead27b >= GLF_live2directions; GLF_dead27b--) {
                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)] - (donor_replacementGLF_dead27beta * GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)]);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead27MATRIX_N = (4 * GLF_dead27MATRIX_N * (1000 - GLF_dead27MATRIX_N)) / 1000;
                        }
                    }
                }
            }
            GLF_live2directions += 1;
        }
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead28count = _GLF_FUZZED(-94324);
            {
                if ((v & 1) == 1) {
                    v = 3 * v + 1;
                } else {
                    v /= 2;
                }
                donor_replacementGLF_dead28count++;
            }
        }
        vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(max(dFdxCoarse(resolution), GLF_live17injectionSwitch));
        if (donor_replacementGLF_dead26coord.x > 1.0)
            donor_replacementGLF_dead26coord.x -= 1.0;
    }
    int count = 0;
    while (v > 1) {
        {
            vec3 GLF_live19color = _GLF_FUZZED((vec2(-5.3, 265.280) * mat3x2(-4.7, -0.0, 749.150, -6281.4685, 2152.4540, -9781.8235)));
            {
                vec2 GLF_live22coord = _GLF_FUZZED(vec2(-58.15, vec4(-44.44, -7616.3826, 9526.7276, 402.136).w));
                int GLF_live22i = _GLF_FUZZED(21899);
                {
                    int GLF_live22looplimiter0 = 0;
                    while (GLF_live22i < 1 && GLF_live22coord.x > 1.0 || GLF_live22coord.y > 1.0) {
                        if (GLF_live22looplimiter0 >= 4) {
                            break;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead30v = _GLF_FUZZED((count ^ 40324));
                                {
                                    donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                                }
                            }
                        }
                        GLF_live22looplimiter0++;
                        {
                            if (GLF_live22coord.x > 1.0)
                                GLF_live22coord.x -= 1.0;
                            if (GLF_live22coord.y > 1.0)
                                GLF_live22coord.y -= 1.0;
                            GLF_live22coord *= 2.0;
                            if (_GLF_DEAD(false)) {
                                if (GLF_live22coord.x > 1.0)
                                    GLF_live22coord.x -= 1.0;
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_live22i /= 2;
                                }
                            }
                            GLF_live22i++;
                        }
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(resolution);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead29c = _GLF_FUZZED(v);
                                uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED((143428u & 94540u));
                                {
                                    for (int GLF_dead29r = 0; GLF_dead29r < v; GLF_dead29r++) {
                                        switch (donor_replacementGLF_dead29matrix_number) {
                                            case 0u:
                                                GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                break;
                                            case 1u:
                                                GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                break;
                                            case 2u:
                                                GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                break;
                                            case 3u:
                                                GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                break;
                                            case 4u:
                                                GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                break;
                                            case 5u:
                                                GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                break;
                                            case 6u:
                                                GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                break;
                                            case 7u:
                                                GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                break;
                                            case 8u:
                                                GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                break;
                                        }
                                    }
                                }
                            }
                            if (donor_replacementGLF_dead26coord.x > 1.0)
                                donor_replacementGLF_dead26coord.x -= 1.0;
                        }
                    }
                }
            }
            {
                GLF_live19color.x += float(GLF_live19obj.numbers[5]);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
            ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(ivec2(50232, -669));
            {
                donor_replacementGLF_dead24p.y--;
            }
        }
        if ((v & 1) == 1) {
            v = 3 * v + 1;
            {
                int GLF_live23baseIndex = _GLF_FUZZED(41731);
                int GLF_live23data = _GLF_FUZZED(-81870);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    float donor_replacementGLF_dead31x = _GLF_FUZZED((4976.1117 + (-3998.9111)));
                    float donor_replacementGLF_dead31y = _GLF_FUZZED(max(-0.7, 2.2));
                    if (donor_replacementGLF_dead31x * donor_replacementGLF_dead31x + donor_replacementGLF_dead31y * donor_replacementGLF_dead31y > 4.0) {
                        break;
                    }
                }
                int GLF_live23treeIndex = _GLF_FUZZED((+12023));
                {
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(fma(vec2(-832.891, 3462.7632), GLF_live17injectionSwitch, injectionSwitch));
                        float donor_replacementGLF_dead25h = _GLF_FUZZED(injectionSwitch[1]);
                        int donor_replacementGLF_dead25i = _GLF_FUZZED(GLF_live23data);
                        float donor_replacementGLF_dead25refh = _GLF_FUZZED(((-115.575) * (-47.63)));
                        float donor_replacementGLF_dead25slope = _GLF_FUZZED(66.78);
                        vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(sqrt(injectionSwitch));
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    GLF_dead27MATRIX_N /= 2;
                                }
                            }
                            donor_replacementGLF_dead25coord -= donor_replacementGLF_dead25uvstep;
                            donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                            donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                            donor_replacementGLF_dead25i++;
                        }
                    }
                    if (GLF_live23data <= GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].data) {
                        if (GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex == -1) {
                            GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex = GLF_live23treeIndex;
                            GLF_live23makeTreeNode(GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23treeIndex, 10)], GLF_live23data);
                            ;
                        } else {
                            GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    count = (4 * count * (1000 - count)) / 1000;
                                }
                            }
                            ;
                        }
                    } else {
                        if (GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex == -1) {
                            GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex = GLF_live23treeIndex;
                            GLF_live23makeTreeNode(GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23treeIndex, 10)], GLF_live23data);
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(resolution);
                                float donor_replacementGLF_dead25h = _GLF_FUZZED((roundEven(-543.591) + (-7.0)));
                                float donor_replacementGLF_dead25refh = _GLF_FUZZED(atan(distance(vec2(-4.9, -1.0), GLF_live17injectionSwitch), 55.00));
                                float donor_replacementGLF_dead25slope = _GLF_FUZZED(floor(acos(-662.987)));
                                vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(injectionSwitch);
                                while (donor_replacementGLF_dead25h < donor_replacementGLF_dead25refh && GLF_live23baseIndex < 32) {
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead30i = _GLF_FUZZED(max(GLF_live23treeIndex, GLF_live23treeIndex));
                                        for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < GLF_live23treeIndex; donor_replacementGLF_dead30i++) {
                                            GLF_dead27MATRIX_N = (4 * GLF_dead27MATRIX_N * (1000 - GLF_dead27MATRIX_N)) / 1000;
                                        }
                                    }
                                    donor_replacementGLF_dead25coord -= donor_replacementGLF_dead25uvstep;
                                    donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                                    donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                    GLF_live23baseIndex++;
                                }
                            }
                            ;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(asinh(vec2(-56.86, 8.3)));
                                float donor_replacementGLF_dead25h = _GLF_FUZZED(asinh(log(-91.60)));
                                int donor_replacementGLF_dead25i = _GLF_FUZZED(GLF_live23baseIndex);
                                float donor_replacementGLF_dead25refh = _GLF_FUZZED(8.8);
                                float donor_replacementGLF_dead25slope = _GLF_FUZZED(exp(46.06));
                                vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(GLF_live17injectionSwitch);
                                if (_GLF_DEAD(false)) {
                                    {
                                        GLF_live23treeIndex = (4 * GLF_live23treeIndex * (1000 - GLF_live23treeIndex)) / 1000;
                                    }
                                }
                                {
                                    donor_replacementGLF_dead25coord -= donor_replacementGLF_dead25uvstep;
                                    donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                                    donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                    donor_replacementGLF_dead25i++;
                                }
                            }
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    v /= 2;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(((-1316.2604) / injectionSwitch));
                                if (_GLF_DEAD(false)) {
                                    {
                                        GLF_dead27MATRIX_N = (4 * GLF_dead27MATRIX_N * (1000 - GLF_dead27MATRIX_N)) / 1000;
                                    }
                                }
                                float donor_replacementGLF_dead25h = _GLF_FUZZED(asinh(-520.887));
                                int donor_replacementGLF_dead25i = _GLF_FUZZED(v);
                                float donor_replacementGLF_dead25refh = _GLF_FUZZED(-69.40);
                                float donor_replacementGLF_dead25slope = _GLF_FUZZED(5448.8188);
                                vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(acos(GLF_live17injectionSwitch));
                                {
                                    donor_replacementGLF_dead25coord -= donor_replacementGLF_dead25uvstep;
                                    donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                                    donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                    donor_replacementGLF_dead25i++;
                                }
                            }
                            GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex;
                            ;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                GLF_dead29_GLF_color = vec4(vec3(0.0), 1.0);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead27alpha2 = _GLF_FUZZED(GLF_live23_GLF_color.x);
                            float donor_replacementGLF_dead27alpha3 = _GLF_FUZZED(579.660);
                            float donor_replacementGLF_dead27beta = _GLF_FUZZED(fma(-2.6, -511.051, 5203.1368));
                            int donor_replacementGLF_dead27j = _GLF_FUZZED(14813);
                            int donor_replacementGLF_dead27k = _GLF_FUZZED((count * v));
                            mat4 donor_replacementGLF_dead27matrix_a = _GLF_FUZZED(mat4(fwidth(4.0)));
                            vec4 donor_replacementGLF_dead27matrix_u = _GLF_FUZZED((+vec4(-196.008, 4.9, -75.78, 406.442)));
                            {
                                for (int GLF_dead27a = GLF_dead27MATRIX_N - 1; GLF_dead27a >= donor_replacementGLF_dead27k; GLF_dead27a--) {
                                    donor_replacementGLF_dead27alpha3 += donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)] * donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27j, 4)];
                                }
                                donor_replacementGLF_dead27beta = donor_replacementGLF_dead27alpha2 * donor_replacementGLF_dead27alpha3;
                                for (int GLF_dead27a = GLF_dead27MATRIX_N - 1; GLF_dead27a >= donor_replacementGLF_dead27k; GLF_dead27a--) {
                                    donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27j, 4)] = donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27j, 4)] - (donor_replacementGLF_dead27beta * donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)]);
                                }
                                donor_replacementGLF_dead27alpha3 = 0.0;
                                donor_replacementGLF_dead27beta = 0.0;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead28count = _GLF_FUZZED((+v));
                        int donor_replacementGLF_dead28v = _GLF_FUZZED(int(-555.880));
                        {
                            if ((donor_replacementGLF_dead28v & 1) == 1) {
                                donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                            } else {
                                donor_replacementGLF_dead28v /= 2;
                            }
                            donor_replacementGLF_dead28count++;
                        }
                    }
                }
            }
        } else {
            v /= 2;
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead30i = _GLF_FUZZED(bitfieldExtract(v, -66592, (GLF_dead27MATRIX_N >> v)));
                    int donor_replacementGLF_dead30iters = _GLF_FUZZED(int(-0.0));
                    int donor_replacementGLF_dead30v = _GLF_FUZZED(((v * v) << v));
                    for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < donor_replacementGLF_dead30iters; donor_replacementGLF_dead30i++) {
                        donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                    }
                }
                bool donor_replacementGLF_dead0c3 = _GLF_FUZZED(true);
                if (!donor_replacementGLF_dead0c3) {
                    {
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                float donor_replacementGLF_dead31c_im = _GLF_FUZZED((9402.4449));
                                float donor_replacementGLF_dead31c_re = _GLF_FUZZED(dot(degrees(2.9), -0.3));
                                float donor_replacementGLF_dead31x = _GLF_FUZZED(-7765.3186);
                                float donor_replacementGLF_dead31y = _GLF_FUZZED(22.01);
                                {
                                    if (donor_replacementGLF_dead31x * donor_replacementGLF_dead31x + donor_replacementGLF_dead31y * donor_replacementGLF_dead31y > 4.0) {
                                        break;
                                    }
                                    float GLF_dead31x_new = donor_replacementGLF_dead31x * donor_replacementGLF_dead31x - donor_replacementGLF_dead31y * donor_replacementGLF_dead31y + donor_replacementGLF_dead31c_re;
                                    donor_replacementGLF_dead31y = 2.0 * donor_replacementGLF_dead31x * donor_replacementGLF_dead31y + donor_replacementGLF_dead31c_im;
                                    donor_replacementGLF_dead31x = GLF_dead31x_new;
                                    count++;
                                }
                            }
                            vec2 GLF_live22coord = _GLF_FUZZED((vec3(1.8, 0.5, -86.32) * (mat3(3867.6458, 934.111, -13.97, 7.7, 7.5, 774.217, 63.01, -248.719, 8762.5067) * mat2x3(-5.0, 623.183, -9.9, -4.8, -4.6, 1.9))));
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED((((-129.501) + mat4x2(98.36, -242.401, 907.349, -7.6, -2525.2940, -6214.5433, -61.34, 799.523)) * GLF_live23_GLF_color));
                                while (v < 1 && donor_replacementGLF_dead26coord.x > 1.0 || donor_replacementGLF_dead26coord.y > 1.0) {
                                    if (donor_replacementGLF_dead26coord.x > 1.0)
                                        donor_replacementGLF_dead26coord.x -= 1.0;
                                    if (donor_replacementGLF_dead26coord.y > 1.0)
                                        donor_replacementGLF_dead26coord.y -= 1.0;
                                    donor_replacementGLF_dead26coord *= 2.0;
                                    v++;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    v /= 2;
                                }
                            }
                            int GLF_live22i = _GLF_FUZZED(6398);
                            int GLF_live22looplimiter0 = 0;
                            while (GLF_live22i < 1 && GLF_live22coord.x > 1.0 || GLF_live22coord.y > 1.0) {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead31iteration = _GLF_FUZZED(findMSB((87161u / 157972u)));
                                    float donor_replacementGLF_dead31xCoord = _GLF_FUZZED((mat4x2(-5.5, 661.314, -718.836, -5.9, 6021.3531, 2028.4166, -106.442, 292.348), 190.559));
                                    float donor_replacementGLF_dead31yCoord = _GLF_FUZZED(-321.927);
                                    if (donor_replacementGLF_dead31iteration < 1000) {
                                        ;
                                    } else {
                                        ;
                                    }
                                }
                                if (GLF_live22looplimiter0 >= 4) {
                                    break;
                                }
                                GLF_live22looplimiter0++;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    float donor_replacementGLF_dead25h = _GLF_FUZZED(determinant((mat3(87.21, -59.22, -4.8, -8.6, -31.72, 981.466, -18.34, -3.2, 73.11) + mat3(644.361, -961.090, -4.4, 3.2, -107.016, -175.599, -2.2, 8.3, -2.7))));
                                    int donor_replacementGLF_dead25i = _GLF_FUZZED(bitCount(ivec2(-72173, -69274)).y);
                                    float donor_replacementGLF_dead25refh = _GLF_FUZZED(distance(injectionSwitch, injectionSwitch.ts));
                                    float donor_replacementGLF_dead25slope = _GLF_FUZZED(-13.82);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        float donor_replacementGLF_dead31x = _GLF_FUZZED(sign(radians(donor_replacementGLF_dead25h)));
                                        if (donor_replacementGLF_dead31x * donor_replacementGLF_dead31x + donor_replacementGLF_dead25refh * donor_replacementGLF_dead25refh > 4.0) {
                                            break;
                                        }
                                    }
                                    vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(GLF_live22coord);
                                    {
                                        GLF_live22coord -= donor_replacementGLF_dead25uvstep;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                break;
                                            }
                                        }
                                        donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                                        donor_replacementGLF_dead25h = texture(GLF_dead25tex, GLF_live22coord).y;
                                        donor_replacementGLF_dead25i++;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if ((GLF_live22i & 1) == 1) {
                                            GLF_live22i = 3 * GLF_live22i + 1;
                                        } else {
                                            GLF_live22i /= 2;
                                        }
                                    }
                                }
                                {
                                    if (GLF_live22coord.x > 1.0) {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead28count = _GLF_FUZZED((v | v));
                                            {
                                                if ((count & 1) == 1) {
                                                    count = 3 * count + 1;
                                                } else {
                                                    count /= 2;
                                                }
                                                donor_replacementGLF_dead28count++;
                                            }
                                        }
                                        GLF_live22coord.x -= 1.0;
                                    }
                                    if (GLF_live22coord.y > 1.0)
                                        GLF_live22coord.y -= 1.0;
                                    GLF_live22coord *= 2.0;
                                    GLF_live22i++;
                                }
                            }
                        }
                        vec3 GLF_live17m = _GLF_FUZZED((vec4(-7.7, -74.12, 7.3, 9956.4911) * mat3x4(-608.670, 2893.3358, 9474.9534, 36.46, -602.793, 41.08, 89.47, -67.01, 8.9, -88.51, 9121.4570, -66.90)));
                        vec2 GLF_live17o = _GLF_FUZZED(vec2(-7.5, 34.83));
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(-3.1, 31.86));
                            if (GLF_live22coord.x > 1.0)
                                GLF_live22coord.x -= 1.0;
                        }
                        {
                            int GLF_live17k = 1;
                            {
                                int GLF_live23count = _GLF_FUZZED(43907);
                                if (GLF_live23count == 20) {
                                    GLF_live23_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                } else {
                                    GLF_live23_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                                }
                            }
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    int donor_replacementGLF_dead28count = _GLF_FUZZED(GLF_live17k);
                                    {
                                        if ((GLF_dead27MATRIX_N & 1) == 1) {
                                            GLF_dead27MATRIX_N = 3 * GLF_dead27MATRIX_N + 1;
                                        } else {
                                            GLF_dead27MATRIX_N /= 2;
                                        }
                                        donor_replacementGLF_dead28count++;
                                    }
                                }
                                int GLF_live17looplimiter0 = 0;
                                while (GLF_live17k >= 0) {
                                    if (GLF_live17looplimiter0 >= 6) {
                                        break;
                                    }
                                    GLF_live17looplimiter0++;
                                    {
                                        GLF_live17o = GLF_live17o + GLF_live17o;
                                        GLF_live17k--;
                                    }
                                }
                            }
                            GLF_live17m = vec3(GLF_live17injectionSwitch.x, cos(GLF_live17o));
                        }
                    }
                    ;
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(GLF_live17injectionSwitch);
                    float donor_replacementGLF_dead25h = _GLF_FUZZED(72.06);
                    float donor_replacementGLF_dead25refh = _GLF_FUZZED(3252.7599);
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead29cols = _GLF_FUZZED(-73112);
                        uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(78849u);
                        {
                            for (int GLF_dead29c = 0; GLF_dead29c < donor_replacementGLF_dead29cols; GLF_dead29c++) {
                                for (int GLF_dead29r = 0; GLF_dead29r < count; GLF_dead29r++) {
                                    switch (donor_replacementGLF_dead29matrix_number) {
                                        case 0u:
                                            GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                            break;
                                        case 1u:
                                            GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                            break;
                                        case 2u:
                                            GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                            break;
                                        case 3u:
                                            GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                            break;
                                        case 4u:
                                            GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                            break;
                                        case 5u:
                                            GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                            break;
                                        case 6u:
                                            GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                            break;
                                        case 7u:
                                            GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                            break;
                                        case 8u:
                                            GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                            break;
                                    }
                                }
                            }
                            donor_replacementGLF_dead29matrix_number = donor_replacementGLF_dead29matrix_number + 1u;
                        }
                    }
                    float donor_replacementGLF_dead25slope = _GLF_FUZZED(-169.077);
                    vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(GLF_live17injectionSwitch);
                    while (donor_replacementGLF_dead25h < donor_replacementGLF_dead25refh && count < 32) {
                        donor_replacementGLF_dead25coord -= donor_replacementGLF_dead25uvstep;
                        donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                        donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead28count = _GLF_FUZZED(findLSB((69884u | 43572u)));
                            {
                                if ((v & 1) == 1) {
                                    v = 3 * v + 1;
                                } else {
                                    v /= 2;
                                }
                                donor_replacementGLF_dead28count++;
                            }
                        }
                        count++;
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec4 donor_replacementGLF_dead14c = _GLF_FUZZED((vec4(7.2, -6190.6182, -28.04, 5.3)));
                    int donor_replacementGLF_dead14i = _GLF_FUZZED(bitfieldReverse((mat2(4.6, 1.1, 4561.9504, -7088.7816), 32927)));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(13256u);
                        int donor_replacementGLF_dead29r = _GLF_FUZZED(-74730);
                        {
                            switch (donor_replacementGLF_dead29matrix_number) {
                                case 0u:
                                    GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(count, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 2)] = GLF_dead29one;
                                    break;
                                case 1u:
                                    GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(count, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 3)] = GLF_dead29one;
                                    break;
                                case 2u:
                                    GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(count, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 4)] = GLF_dead29one;
                                    break;
                                case 3u:
                                    GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(count, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 2)] = GLF_dead29one;
                                    break;
                                case 4u:
                                    GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(count, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 3)] = GLF_dead29one;
                                    break;
                                case 5u:
                                    GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(count, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 4)] = GLF_dead29one;
                                    break;
                                case 6u:
                                    GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(count, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 2)] = GLF_dead29one;
                                    break;
                                case 7u:
                                    GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(count, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 3)] = GLF_dead29one;
                                    break;
                                case 8u:
                                    GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(count, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 4)] = GLF_dead29one;
                                    break;
                            }
                        }
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead28v = _GLF_FUZZED(GLF_dead27MATRIX_N);
                            {
                                if ((donor_replacementGLF_dead28v & 1) == 1) {
                                    donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                                } else {
                                    donor_replacementGLF_dead28v /= 2;
                                }
                                v++;
                            }
                        }
                        int GLF_live17j = _GLF_FUZZED(15501);
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(injectionSwitch);
                                float donor_replacementGLF_dead25h = _GLF_FUZZED(25.16);
                                int donor_replacementGLF_dead25i = _GLF_FUZZED(v);
                                float donor_replacementGLF_dead25refh = _GLF_FUZZED(-774.294);
                                float donor_replacementGLF_dead25slope = _GLF_FUZZED(-2.7);
                                vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(resolution);
                                {
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead30i = _GLF_FUZZED(GLF_live17j);
                                        for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < GLF_dead27MATRIX_N; donor_replacementGLF_dead30i++) {
                                            donor_replacementGLF_dead25i = (4 * donor_replacementGLF_dead25i * (1000 - donor_replacementGLF_dead25i)) / 1000;
                                        }
                                    }
                                    donor_replacementGLF_dead25coord -= donor_replacementGLF_dead25uvstep;
                                    donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                                    donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                    donor_replacementGLF_dead25i++;
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead28v = _GLF_FUZZED(donor_replacementGLF_dead14i);
                                        if ((donor_replacementGLF_dead28v & 1) == 1) {
                                            donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                                        } else {
                                            donor_replacementGLF_dead28v /= 2;
                                        }
                                    }
                                }
                            }
                            int GLF_live23baseIndex = _GLF_FUZZED(30669);
                            {
                                GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex;
                                ;
                            }
                        }
                        vec3 GLF_live17m = _GLF_FUZZED((true ? vec3(-1.5, -2.6, 2.7) : vec3(-56.17, -3.5, 2.4)));
                        vec2 GLF_live17n = _GLF_FUZZED(vec2(-466.947, 6.0));
                        {
                            int GLF_live17looplimiter1 = 0;
                            for (int GLF_live17i = -1; GLF_live17i <= int(GLF_live17injectionSwitch.y); GLF_live17i++) {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead31x = _GLF_FUZZED(-972.656);
                                    float donor_replacementGLF_dead31y = _GLF_FUZZED((mat4(mat3x4(7735.3761, -58.92, 58.98, -83.95, -356.308, 365.646, 2410.8457, 8941.3749, -5.8, 887.598, 4671.8394, -52.01)), -52.70));
                                    if (donor_replacementGLF_dead31x * donor_replacementGLF_dead31x + donor_replacementGLF_dead31y * donor_replacementGLF_dead31y > 4.0) {
                                        break;
                                    }
                                }
                                if (GLF_live17looplimiter1 >= 6) {
                                    break;
                                }
                                GLF_live17looplimiter1++;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    {
                                        GLF_dead27MATRIX_N = (4 * GLF_dead27MATRIX_N * (1000 - GLF_dead27MATRIX_N)) / 1000;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    int donor_replacementGLF_dead26i = _GLF_FUZZED((~(v | GLF_live17looplimiter1)));
                                    {
                                        if (GLF_live17n.x > 1.0)
                                            GLF_live17n.x -= 1.0;
                                        if (GLF_live17n.y > 1.0)
                                            GLF_live17n.y -= 1.0;
                                        GLF_live17n *= 2.0;
                                        donor_replacementGLF_dead26i++;
                                    }
                                }
                                {
                                    vec2 GLF_live17g = vec2(float(GLF_live17j), float(GLF_live17i));
                                    vec2 GLF_live17o = mix(GLF_live17n, GLF_live17g, 0.2);
                                    {
                                        int GLF_live23baseIndex = _GLF_FUZZED(-62130);
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead28count = _GLF_FUZZED(GLF_live23baseIndex);
                                            int donor_replacementGLF_dead28v = _GLF_FUZZED(GLF_live23baseIndex);
                                            while (donor_replacementGLF_dead28v > 1) {
                                                if ((donor_replacementGLF_dead28v & 1) == 1) {
                                                    donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                                                } else {
                                                    donor_replacementGLF_dead28v /= 2;
                                                }
                                                donor_replacementGLF_dead28count++;
                                            }
                                        }
                                        int GLF_live23data = _GLF_FUZZED(18026);
                                        int GLF_live23looplimiter0 = 0;
                                        int GLF_live23treeIndex = _GLF_FUZZED((3056));
                                        {
                                            if (GLF_live23looplimiter0 >= 7) {
                                                ;
                                            }
                                            GLF_live23looplimiter0++;
                                            {
                                                if (GLF_live23data <= GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].data) {
                                                    if (GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex == -1) {
                                                        GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex = GLF_live23treeIndex;
                                                        GLF_live23makeTreeNode(GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23treeIndex, 10)], GLF_live23data);
                                                        ;
                                                    } else {
                                                        GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex;
                                                        ;
                                                    }
                                                } else {
                                                    if (GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex == -1) {
                                                        GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex = GLF_live23treeIndex;
                                                        GLF_live23makeTreeNode(GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23treeIndex, 10)], GLF_live23data);
                                                        ;
                                                    } else {
                                                        GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex;
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED((ivec2(50787, -44031) + donor_replacementGLF_dead14i));
                                            if (donor_replacementGLF_dead24p.x < 0) {
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead31xCoord = _GLF_FUZZED(-7.8);
                                                    float donor_replacementGLF_dead31yCoord = _GLF_FUZZED(-7.6);
                                                    {
                                                        ;
                                                    }
                                                }
                                                donor_replacementGLF_dead24p.y++;
                                            }
                                        }
                                    }
                                    if (GLF_live17injectionSwitch.x < (GLF_live17m.x)) {
                                        int GLF_live17k = 1;
                                        {
                                            int GLF_live17looplimiter0 = 0;
                                            while (GLF_live17k >= 0) {
                                                if (GLF_live17looplimiter0 >= 6) {
                                                    break;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED((mat2(467.500, 1.4, -319.437, -9612.8484) * GLF_live17g));
                                                    float donor_replacementGLF_dead25h = _GLF_FUZZED(mod(-2110.3726, 43.56));
                                                    float donor_replacementGLF_dead25refh = _GLF_FUZZED(1.6);
                                                    float donor_replacementGLF_dead25slope = _GLF_FUZZED(-9.3);
                                                    while (donor_replacementGLF_dead25h < donor_replacementGLF_dead25refh && GLF_live17looplimiter1 < 32) {
                                                        donor_replacementGLF_dead25coord -= GLF_live17g;
                                                        donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                                                        donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead28v = _GLF_FUZZED(GLF_live17i);
                                                            if ((donor_replacementGLF_dead28v & 1) == 1) {
                                                                donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                                                            } else {
                                                                donor_replacementGLF_dead28v /= 2;
                                                            }
                                                        }
                                                        GLF_live17looplimiter1++;
                                                    }
                                                }
                                                GLF_live17looplimiter0++;
                                                {
                                                    GLF_live17o = GLF_live17o + GLF_live17o;
                                                    GLF_live17k--;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(ivec2(4381, -35960));
                                            {
                                                donor_replacementGLF_dead24p = GLF_dead24iter(donor_replacementGLF_dead24p);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead29c = _GLF_FUZZED(findLSB(GLF_live17i));
                                                uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED((50067u | 190364u));
                                                {
                                                    switch (donor_replacementGLF_dead29matrix_number) {
                                                        case 0u:
                                                            GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(count, 2)] = GLF_dead29one;
                                                            break;
                                                        case 1u:
                                                            GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(count, 3)] = GLF_dead29one;
                                                            break;
                                                        case 2u:
                                                            GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(count, 4)] = GLF_dead29one;
                                                            break;
                                                        case 3u:
                                                            GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(count, 2)] = GLF_dead29one;
                                                            break;
                                                        case 4u:
                                                            GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(count, 3)] = GLF_dead29one;
                                                            break;
                                                        case 5u:
                                                            GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(count, 4)] = GLF_dead29one;
                                                            break;
                                                        case 6u:
                                                            GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(count, 2)] = GLF_dead29one;
                                                            break;
                                                        case 7u:
                                                            GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(count, 3)] = GLF_dead29one;
                                                            break;
                                                        case 8u:
                                                            GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(count, 4)] = GLF_dead29one;
                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                        GLF_live17m = vec3(GLF_live17injectionSwitch.x, cos(GLF_live17o));
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    {
                                        GLF_dead27MATRIX_N = 3 * GLF_dead27MATRIX_N + 1;
                                    }
                                }
                            }
                        }
                    }
                    if (donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] >= 1.0) {
                        donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] = donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] * donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)];
                    }
                }
            }
            {
                {
                    int GLF_live22looplimiter0 = 0;
                    if (GLF_live22looplimiter0 >= 4) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            int donor_replacementGLF_dead29cols = _GLF_FUZZED(GLF_live22looplimiter0);
                            uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(floatBitsToUint(20.36));
                            for (int GLF_dead29c = 0; GLF_dead29c < donor_replacementGLF_dead29cols; GLF_dead29c++) {
                                for (int GLF_dead29r = 0; GLF_dead29r < GLF_dead27MATRIX_N; GLF_dead29r++) {
                                    switch (donor_replacementGLF_dead29matrix_number) {
                                        case 0u:
                                            GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                            break;
                                        case 1u:
                                            GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                            break;
                                        case 2u:
                                            GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                            break;
                                        case 3u:
                                            GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                            break;
                                        case 4u:
                                            GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                            break;
                                        case 5u:
                                            GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                            break;
                                        case 6u:
                                            GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                            break;
                                        case 7u:
                                            GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                            break;
                                        case 8u:
                                            GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                            break;
                                    }
                                }
                            }
                        }
                        ;
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead30i = _GLF_FUZZED(count);
                            int donor_replacementGLF_dead30v = _GLF_FUZZED(count);
                            for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < count; donor_replacementGLF_dead30i++) {
                                donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead27alpha1 = _GLF_FUZZED(-7557.4312);
                        float donor_replacementGLF_dead27alpha2 = _GLF_FUZZED(4104.5263);
                        float donor_replacementGLF_dead27alpha3 = _GLF_FUZZED(16.74);
                        float donor_replacementGLF_dead27beta = _GLF_FUZZED(-4.3);
                        float donor_replacementGLF_dead27magnitudeX = _GLF_FUZZED(66.26);
                        mat4 donor_replacementGLF_dead27matrix_a = _GLF_FUZZED(mat4(109.408, -7.9, -26.34, 9.7, -9.6, 8.3, 2.1, 2032.3862, 6126.4658, -13.02, -5.8, -8.3, -9.4, -322.473, -993.217, -3979.8457));
                        for (int GLF_dead27k = 0; GLF_dead27k < GLF_dead27MATRIX_N - 1; GLF_dead27k++) {
                            for (int GLF_dead27x = GLF_dead27MATRIX_N - 1; GLF_dead27x >= GLF_dead27k; GLF_dead27x--) {
                                donor_replacementGLF_dead27magnitudeX += pow(donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27k, 4)], 2.0);
                                GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27x, 4)] = donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27k, 4)];
                            }
                            donor_replacementGLF_dead27magnitudeX = sqrt(donor_replacementGLF_dead27magnitudeX);
                            GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27k, 4)] -= (sign(GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27k, 4)]) * donor_replacementGLF_dead27magnitudeX);
                            for (int GLF_dead27u = GLF_dead27MATRIX_N - 1; GLF_dead27u >= GLF_dead27k; GLF_dead27u--) {
                                donor_replacementGLF_dead27alpha1 += pow(GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27u, 4)], 2.0);
                            }
                            donor_replacementGLF_dead27alpha2 = 2.0 / donor_replacementGLF_dead27alpha1;
                            for (int GLF_dead27j = GLF_dead27k; GLF_dead27j < GLF_dead27MATRIX_N; GLF_dead27j++) {
                                for (int GLF_dead27a = GLF_dead27MATRIX_N - 1; GLF_dead27a >= GLF_dead27k; GLF_dead27a--) {
                                    donor_replacementGLF_dead27alpha3 += GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)] * donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)];
                                }
                                donor_replacementGLF_dead27beta = donor_replacementGLF_dead27alpha2 * donor_replacementGLF_dead27alpha3;
                                for (int GLF_dead27a = GLF_dead27MATRIX_N - 1; GLF_dead27a >= GLF_dead27k; GLF_dead27a--) {
                                    donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)] = donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)] - (donor_replacementGLF_dead27beta * GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)]);
                                }
                                donor_replacementGLF_dead27alpha3 = 0.0;
                                donor_replacementGLF_dead27beta = 0.0;
                            }
                            for (int GLF_dead27b = GLF_dead27MATRIX_N - 1; GLF_dead27b >= GLF_dead27k; GLF_dead27b--) {
                                donor_replacementGLF_dead27alpha3 += GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)];
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                int donor_replacementGLF_dead30v = _GLF_FUZZED(count);
                                {
                                    donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                                }
                            }
                            donor_replacementGLF_dead27beta = donor_replacementGLF_dead27alpha2 * donor_replacementGLF_dead27alpha3;
                            for (int GLF_dead27b = GLF_dead27MATRIX_N - 1; GLF_dead27b >= GLF_dead27k; GLF_dead27b--) {
                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)] - (donor_replacementGLF_dead27beta * GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)]);
                            }
                            donor_replacementGLF_dead27magnitudeX = 0.0;
                            donor_replacementGLF_dead27alpha1 = 0.0;
                            donor_replacementGLF_dead27alpha2 = 0.0;
                            donor_replacementGLF_dead27alpha3 = 0.0;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    break;
                                }
                            }
                            donor_replacementGLF_dead27beta = 0.0;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead28count = _GLF_FUZZED(44891);
                        {
                            if ((GLF_dead27MATRIX_N & 1) == 1) {
                                GLF_dead27MATRIX_N = 3 * GLF_dead27MATRIX_N + 1;
                            } else {
                                GLF_dead27MATRIX_N /= 2;
                            }
                            donor_replacementGLF_dead28count++;
                        }
                    }
                    float donor_replacementGLF_dead5th = _GLF_FUZZED((-(-5735.1198)));
                    {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(resolution);
                            float donor_replacementGLF_dead25h = _GLF_FUZZED(2283.6934);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead28v = _GLF_FUZZED(GLF_dead27MATRIX_N);
                                if ((donor_replacementGLF_dead28v & 1) == 1) {
                                    donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                                } else {
                                    donor_replacementGLF_dead28v /= 2;
                                }
                            }
                            vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(GLF_live17injectionSwitch);
                            while (donor_replacementGLF_dead25h < donor_replacementGLF_dead5th && v < 32) {
                                donor_replacementGLF_dead25coord -= donor_replacementGLF_dead25uvstep;
                                donor_replacementGLF_dead5th += donor_replacementGLF_dead5th;
                                donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                v++;
                            }
                        }
                        donor_replacementGLF_dead5th = -donor_replacementGLF_dead5th;
                    }
                }
                int GLF_live3v = _GLF_FUZZED(ivec4(32250, 38556, -19574, -66805).w);
                {
                    GLF_live3v = (4 * GLF_live3v * (1000 - GLF_live3v)) / 1000;
                }
            }
        }
        count++;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(resolution);
            float donor_replacementGLF_dead15uvstep = _GLF_FUZZED(log(5.1));
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead25i = _GLF_FUZZED(count);
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead30v = _GLF_FUZZED(ivec2(58879, -64315).s);
                        {
                            donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                        }
                    }
                    vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(resolution);
                    {
                        donor_replacementGLF_dead15coord -= donor_replacementGLF_dead25uvstep;
                        donor_replacementGLF_dead15uvstep += donor_replacementGLF_dead15uvstep;
                        donor_replacementGLF_dead15uvstep = texture(GLF_dead25tex, donor_replacementGLF_dead15coord).y;
                        donor_replacementGLF_dead25i++;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED((167239u % 85215u));
                            for (int GLF_dead29cols = 2; GLF_dead29cols <= 4; GLF_dead29cols++) {
                                for (int GLF_dead29rows = 2; GLF_dead29rows <= 4; GLF_dead29rows++) {
                                    for (int GLF_dead29c = 0; GLF_dead29c < GLF_dead29cols; GLF_dead29c++) {
                                        for (int GLF_dead29r = 0; GLF_dead29r < GLF_dead29rows; GLF_dead29r++) {
                                            switch (donor_replacementGLF_dead29matrix_number) {
                                                case 0u:
                                                    GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                    break;
                                                case 1u:
                                                    GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                    break;
                                                case 2u:
                                                    GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                    break;
                                                case 3u:
                                                    GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                    break;
                                                case 4u:
                                                    GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                    break;
                                                case 5u:
                                                    GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                    break;
                                                case 6u:
                                                    GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                    break;
                                                case 7u:
                                                    GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                    break;
                                                case 8u:
                                                    GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                    break;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead29matrix_number = donor_replacementGLF_dead29matrix_number + 1u;
                                }
                            }
                        }
                    }
                }
                _GLF_color += texture(GLF_dead15tex, donor_replacementGLF_dead15coord + vec2(float(v - 1) * donor_replacementGLF_dead15uvstep, float(v - 1) * donor_replacementGLF_dead15uvstep)) * GLF_dead15weights[_GLF_MAKE_IN_BOUNDS_INT(v * 3 + v, 9)];
            }
        }
    }
    return count;
    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
        {
            v = (4 * v * (1000 - v)) / 1000;
        }
    }
    {
        int GLF_live21looplimiter0 = 0;
        ivec2 GLF_live21pos = _GLF_FUZZED(((ivec2(96243, 991) & (42106 & (-70526))) & ivec3(-54203, -51352, -64289).s));
        while (GLF_live21pos.y != 256) {
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(reflect(resolution, injectionSwitch));
                while (GLF_live21looplimiter0 < 1 && donor_replacementGLF_dead26coord.x > 1.0 || donor_replacementGLF_dead26coord.y > 1.0) {
                    if (donor_replacementGLF_dead26coord.x > 1.0)
                        donor_replacementGLF_dead26coord.x -= 1.0;
                    if (donor_replacementGLF_dead26coord.y > 1.0)
                        donor_replacementGLF_dead26coord.y -= 1.0;
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead28v = _GLF_FUZZED(((~count)));
                        {
                            if ((donor_replacementGLF_dead28v & 1) == 1) {
                                donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                            } else {
                                donor_replacementGLF_dead28v /= 2;
                            }
                            GLF_dead27MATRIX_N++;
                        }
                    }
                    donor_replacementGLF_dead26coord *= 2.0;
                    GLF_live21looplimiter0++;
                }
            }
            if (GLF_live21looplimiter0 >= 7) {
                break;
            }
            GLF_live21looplimiter0++;
            {
                if (GLF_live21pos.x < GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] + 15 && GLF_live21pos.x > GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] - 15) {
                    float GLF_live21p = (15.0 - abs(float(GLF_live21pos.x - GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)]))) / 15.0;
                    ;
                }
                GLF_live21pos.y++;
            }
        }
    }
}

void main() {
    {
        int GLF_live21looplimiter0 = 0;
        ivec2 GLF_live21pos = _GLF_FUZZED((ivec2(28843, 25154) & 11519));
        while (GLF_live21pos.y != 256) {
            if (GLF_live21looplimiter0 >= 7) {
                break;
            }
            GLF_live21looplimiter0++;
            {
                if (GLF_live21pos.x < GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] + 15 && GLF_live21pos.x > GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] - 15) {
                    float GLF_live21p = (15.0 - abs(float(GLF_live21pos.x - GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)]))) / 15.0;
                    ;
                }
                GLF_live21pos.y++;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(abs(resolution));
        int donor_replacementGLF_dead15i = _GLF_FUZZED(((-67258) ^ (-55202)));
        int donor_replacementGLF_dead15j = _GLF_FUZZED((4909 - 96934));
        vec4 donor_replacementGLF_dead15res = _GLF_FUZZED(vec4(5873.3770, -587.257, -2897.6079, -82.14));
        float donor_replacementGLF_dead15uvstep = _GLF_FUZZED(log2(-1.9));
        {
            int GLF_live20looplimiter0 = 0;
            if (GLF_live20looplimiter0 >= 5) {
                ;
            }
        }
        {
            donor_replacementGLF_dead15res += texture(GLF_dead15tex, donor_replacementGLF_dead15coord + vec2(float(donor_replacementGLF_dead15i - 1) * donor_replacementGLF_dead15uvstep, float(donor_replacementGLF_dead15j - 1) * donor_replacementGLF_dead15uvstep)) * GLF_dead15weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15i * 3 + donor_replacementGLF_dead15j, 9)];
            {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead30iters = _GLF_FUZZED(64230);
                    for (donor_replacementGLF_dead15i = 0; donor_replacementGLF_dead15i < donor_replacementGLF_dead30iters; donor_replacementGLF_dead15i++) {
                        GLF_dead27MATRIX_N = (4 * GLF_dead27MATRIX_N * (1000 - GLF_dead27MATRIX_N)) / 1000;
                    }
                }
                vec3 GLF_live19color = _GLF_FUZZED(vec3(-4.2, 6.1, -6.8));
                vec2 GLF_live19uv = _GLF_FUZZED(vec2(734.687, 716.980));
                {
                    {
                        ;
                        if (_GLF_DEAD(false)) {
                            vec4 donor_replacementGLF_dead27matrix_b = _GLF_FUZZED(vec4(569.941, 50.75, -9.2, 74.30));
                            vec4 donor_replacementGLF_dead27matrix_u = _GLF_FUZZED(smoothstep(donor_replacementGLF_dead15res, vec4(vec3(732.543, -0.0, -894.638), donor_replacementGLF_dead15uvstep), GLF_live23_GLF_color));
                            for (int GLF_dead27b = GLF_dead27MATRIX_N - 1; GLF_dead27b >= donor_replacementGLF_dead15j; GLF_dead27b--) {
                                donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)] = donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)] - (donor_replacementGLF_dead15uvstep * donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)]);
                            }
                        }
                    }
                }
                if (abs(GLF_live19uv.x - GLF_live19uv.y) < 0.25) {
                    GLF_live19color.x += float(GLF_live19obj.numbers[9]);
                }
            }
            {
                int GLF_live21looplimiter0 = 0;
                ivec2 GLF_live21pos = _GLF_FUZZED(ivec2(54093, -43545));
                {
                    if (GLF_live21looplimiter0 >= 7) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (GLF_live21pos.x > 0) {
                                GLF_live21pos.y--;
                            }
                        }
                        ;
                    }
                    GLF_live21looplimiter0++;
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead27k = _GLF_FUZZED(donor_replacementGLF_dead15j);
                        float donor_replacementGLF_dead27magnitudeX = _GLF_FUZZED(donor_replacementGLF_dead15uvstep);
                        mat4 donor_replacementGLF_dead27matrix_a = _GLF_FUZZED(mat4(-2.1, 4170.8124, -0.0, 721.987, 77.83, -4012.2278, -334.406, -452.486, 7957.0786, -5609.9380, -8.0, -1086.3822, 1.4, -8.9, 4.3, -715.361));
                        int donor_replacementGLF_dead27x = _GLF_FUZZED(donor_replacementGLF_dead15i);
                        {
                            donor_replacementGLF_dead27magnitudeX += pow(donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27k, 4)], 2.0);
                            donor_replacementGLF_dead15res[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27x, 4)] = donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27k, 4)];
                        }
                    }
                    {
                        if (GLF_live21pos.x < GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] + 15 && GLF_live21pos.x > GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] - 15) {
                            float GLF_live21p = (15.0 - abs(float(GLF_live21pos.x - GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)]))) / 15.0;
                            ;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead30i = _GLF_FUZZED(donor_replacementGLF_dead15j);
                            for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < donor_replacementGLF_dead15i; donor_replacementGLF_dead30i++) {
                                donor_replacementGLF_dead15i = (4 * donor_replacementGLF_dead15i * (1000 - donor_replacementGLF_dead15i)) / 1000;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            mat4 donor_replacementGLF_dead27matrix_a = _GLF_FUZZED((mat4(-7724.8828, -14.51, 68.64, -7.2, 9.8, 5.3, 1558.7391, -19.70, -6756.1507, -1.0, 8833.6971, 4.7, 2761.6425, 4.8, 7943.6414, -9.1) / (-91.97)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                float donor_replacementGLF_dead31y = _GLF_FUZZED(donor_replacementGLF_dead15uvstep);
                                if (donor_replacementGLF_dead15uvstep * donor_replacementGLF_dead15uvstep + donor_replacementGLF_dead31y * donor_replacementGLF_dead31y > 4.0) {
                                    ;
                                }
                            }
                            vec4 donor_replacementGLF_dead27matrix_b = _GLF_FUZZED(vec4(0.4, -14.22, 17.45, 0.0));
                            for (int GLF_dead27j = (GLF_dead27MATRIX_N - 1); GLF_dead27j >= (donor_replacementGLF_dead15i + 1); GLF_dead27j--) {
                                donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15i, 4)] -= (donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)] * donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)]);
                            }
                        }
                        GLF_live21pos.y++;
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(GLF_live17injectionSwitch);
                    float donor_replacementGLF_dead25h = _GLF_FUZZED(sign(-6.8));
                    int donor_replacementGLF_dead25i = _GLF_FUZZED(mix(findLSB((9760u ^ 6948u)), GLF_live21looplimiter0, false));
                    float donor_replacementGLF_dead25refh = _GLF_FUZZED(floor(donor_replacementGLF_dead15uvstep));
                    float donor_replacementGLF_dead25slope = _GLF_FUZZED(min(dFdxCoarse(7.1), 2.3));
                    {
                        donor_replacementGLF_dead25coord -= donor_replacementGLF_dead15coord;
                        donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                        donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                        donor_replacementGLF_dead25i++;
                    }
                }
            }
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                int donor_replacementGLF_dead25i = _GLF_FUZZED(bitfieldExtract(-14567, (uvec4(154539u, 156371u, 160153u, 119966u), donor_replacementGLF_dead15j), (donor_replacementGLF_dead15i % 30920)));
                vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(resolution);
                while (donor_replacementGLF_dead15uvstep < donor_replacementGLF_dead15uvstep && donor_replacementGLF_dead25i < 32) {
                    donor_replacementGLF_dead15coord -= donor_replacementGLF_dead25uvstep;
                    donor_replacementGLF_dead15uvstep += donor_replacementGLF_dead15uvstep;
                    donor_replacementGLF_dead15uvstep = texture(GLF_dead25tex, donor_replacementGLF_dead15coord).y;
                    donor_replacementGLF_dead25i++;
                }
            }
            {
                ;
            }
        }
    }
    vec2 lin = gl_FragCoord.xy / resolution;
    {
        int GLF_live18baseIndex = _GLF_FUZZED(-13790);
        int GLF_live18data = _GLF_FUZZED(int(true));
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), bool(bool(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))) {
            float donor_replacementGLF_dead25h = _GLF_FUZZED(dFdyCoarse(-0.6));
            float donor_replacementGLF_dead25refh = _GLF_FUZZED(90.91);
            float donor_replacementGLF_dead25slope = _GLF_FUZZED(0.8);
            if (_GLF_DEAD(false)) {
                uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(((vec4(1.5, 17.28, 3.2, -98.99) != _GLF_color) ? clamp(41114u, 133438u, 191461u) : 157911u));
                {
                    for (int GLF_dead29c = 0; GLF_dead29c < GLF_dead27MATRIX_N; GLF_dead29c++) {
                        for (int GLF_dead29r = 0; GLF_dead29r < GLF_live18baseIndex; GLF_dead29r++) {
                            switch (donor_replacementGLF_dead29matrix_number) {
                                case 0u:
                                    GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                    break;
                                case 1u:
                                    GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                    break;
                                case 2u:
                                    GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                    break;
                                case 3u:
                                    GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                    break;
                                case 4u:
                                    GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                    break;
                                case 5u:
                                    GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                    break;
                                case 6u:
                                    GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                    break;
                                case 7u:
                                    GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                    break;
                                case 8u:
                                    GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                    break;
                            }
                        }
                    }
                    donor_replacementGLF_dead29matrix_number = donor_replacementGLF_dead29matrix_number + 1u;
                }
            }
            vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED((-clamp(sinh(lin), resolution, injectionSwitch)));
            {
                lin -= donor_replacementGLF_dead25uvstep;
                donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                donor_replacementGLF_dead25h = texture(GLF_dead25tex, lin).y;
                GLF_live18data++;
            }
        }
        int GLF_live18looplimiter0 = 0;
        int GLF_live18treeIndex = _GLF_FUZZED(-17651);
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(findLSB(uvec2(90349u, 134687u)));
                {
                    donor_replacementGLF_dead24p = GLF_dead24iter(donor_replacementGLF_dead24p);
                }
            }
            if (GLF_live18looplimiter0 >= 6) {
                ;
            }
            GLF_live18looplimiter0++;
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(ivec2(ivec4(93749, 51052, 18459, 16007)));
                for (GLF_live18looplimiter0 = 0; GLF_live18looplimiter0 < 100; GLF_live18looplimiter0++) {
                    donor_replacementGLF_dead24p = GLF_dead24iter(donor_replacementGLF_dead24p);
                }
            }
            {
                {
                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(-8.8, -8.8));
                    int GLF_live22i = _GLF_FUZZED((+8579));
                    int GLF_live22looplimiter0 = 0;
                    while (GLF_live22i < 1 && GLF_live22coord.x > 1.0 || GLF_live22coord.y > 1.0) {
                        if (GLF_live22looplimiter0 >= 4) {
                            break;
                        }
                        GLF_live22looplimiter0++;
                        {
                            if (GLF_live22coord.x > 1.0)
                                GLF_live22coord.x -= 1.0;
                            if (GLF_live22coord.y > 1.0)
                                GLF_live22coord.y -= 1.0;
                            GLF_live22coord *= 2.0;
                            GLF_live22i++;
                        }
                    }
                }
                if (GLF_live18data <= GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18baseIndex, 10)].data) {
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead27alpha2 = _GLF_FUZZED(exp(length(vec4(66.68, -7990.6346, -53.30, 1.2))));
                        float donor_replacementGLF_dead27alpha3 = _GLF_FUZZED(31.41);
                        float donor_replacementGLF_dead27beta = _GLF_FUZZED(normalize(distance(injectionSwitch, vec3(-4.2, -400.473, 0.3).zy)));
                        mat4 donor_replacementGLF_dead27matrix_a = _GLF_FUZZED(mat4(mat3(mat3x4(-5.6, 951.135, -3.3, -3.9, 8533.0702, 2.9, -895.668, -51.51, -99.11, -1.7, -63.74, -8.4))));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead30i = _GLF_FUZZED(floatBitsToInt(floor(donor_replacementGLF_dead27beta)));
                            for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < GLF_live18treeIndex; donor_replacementGLF_dead30i++) {
                                GLF_live18baseIndex = (4 * GLF_live18baseIndex * (1000 - GLF_live18baseIndex)) / 1000;
                            }
                        }
                        for (int GLF_dead27j = GLF_live18treeIndex; GLF_dead27j < GLF_dead27MATRIX_N; GLF_dead27j++) {
                            for (int GLF_dead27a = GLF_dead27MATRIX_N - 1; GLF_dead27a >= GLF_live18treeIndex; GLF_dead27a--) {
                                donor_replacementGLF_dead27alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)] * donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)];
                            }
                            donor_replacementGLF_dead27beta = donor_replacementGLF_dead27alpha2 * donor_replacementGLF_dead27alpha3;
                            for (int GLF_dead27a = GLF_dead27MATRIX_N - 1; GLF_dead27a >= GLF_live18treeIndex; GLF_dead27a--) {
                                donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)] = donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)] - (donor_replacementGLF_dead27beta * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)]);
                            }
                            donor_replacementGLF_dead27alpha3 = 0.0;
                            donor_replacementGLF_dead27beta = 0.0;
                        }
                    }
                    if (GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18baseIndex, 10)].leftIndex == -1) {
                        GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18baseIndex, 10)].leftIndex = GLF_live18treeIndex;
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(unpackHalf2x16(85954u));
                            float donor_replacementGLF_dead25h = _GLF_FUZZED(radians(41.62));
                            int donor_replacementGLF_dead25i = _GLF_FUZZED(GLF_live18treeIndex);
                            float donor_replacementGLF_dead25refh = _GLF_FUZZED(faceforward(((-7.4) - (-8262.0258)), -8.2, -4556.9706));
                            float donor_replacementGLF_dead25slope = _GLF_FUZZED(distance(789.435, 1.2));
                            while (donor_replacementGLF_dead25h < donor_replacementGLF_dead25refh && donor_replacementGLF_dead25i < 32) {
                                donor_replacementGLF_dead25coord -= lin;
                                donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                                if (_GLF_DEAD(false)) {
                                    uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED((68694u | 94747u));
                                    for (int GLF_dead29c = 0; GLF_dead29c < GLF_live18data; GLF_dead29c++) {
                                        for (int GLF_dead29r = 0; GLF_dead29r < GLF_dead27MATRIX_N; GLF_dead29r++) {
                                            switch (donor_replacementGLF_dead29matrix_number) {
                                                case 0u:
                                                    GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                    break;
                                                case 1u:
                                                    GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                    break;
                                                case 2u:
                                                    GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                    break;
                                                case 3u:
                                                    GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                    break;
                                                case 4u:
                                                    GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                    break;
                                                case 5u:
                                                    GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                    break;
                                                case 6u:
                                                    GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                    break;
                                                case 7u:
                                                    GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                    break;
                                                case 8u:
                                                    GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                    break;
                                            }
                                        }
                                    }
                                }
                                donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                donor_replacementGLF_dead25i++;
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead28v = _GLF_FUZZED(GLF_live18data);
                                {
                                    donor_replacementGLF_dead28v /= 2;
                                }
                            }
                        }
                        GLF_live18makeTreeNode(GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18treeIndex, 10)], GLF_live18data);
                        ;
                    } else {
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead30i = _GLF_FUZZED(98107);
                                int donor_replacementGLF_dead30iters = _GLF_FUZZED(ivec2(91357, 61691).g);
                                int donor_replacementGLF_dead30v = _GLF_FUZZED((GLF_live18baseIndex << GLF_live18treeIndex));
                                for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < donor_replacementGLF_dead30iters; donor_replacementGLF_dead30i++) {
                                    donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                                }
                            }
                            int GLF_live23baseIndex = _GLF_FUZZED((86690 + (76721 ^ (-67821))));
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(refract(vec2(46.03, -20.26), GLF_live17injectionSwitch, 9.3));
                                int donor_replacementGLF_dead26i = _GLF_FUZZED((GLF_live23baseIndex + GLF_live18data));
                                while (donor_replacementGLF_dead26i < 1 && donor_replacementGLF_dead26coord.x > 1.0 || donor_replacementGLF_dead26coord.y > 1.0) {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_live18data = (4 * GLF_live18data * (1000 - GLF_live18data)) / 1000;
                                        }
                                    }
                                    if (donor_replacementGLF_dead26coord.x > 1.0)
                                        donor_replacementGLF_dead26coord.x -= 1.0;
                                    if (donor_replacementGLF_dead26coord.y > 1.0)
                                        donor_replacementGLF_dead26coord.y -= 1.0;
                                    donor_replacementGLF_dead26coord *= 2.0;
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead28v = _GLF_FUZZED(GLF_live23baseIndex);
                                        if ((donor_replacementGLF_dead28v & 1) == 1) {
                                            donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                                        } else {
                                            donor_replacementGLF_dead28v /= 2;
                                        }
                                    }
                                    donor_replacementGLF_dead26i++;
                                }
                            }
                            int GLF_live23data = _GLF_FUZZED((((-36209) * 28133) + 9301));
                            int GLF_live23treeIndex = _GLF_FUZZED(96694);
                            if (GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex == -1) {
                                GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex = GLF_live23treeIndex;
                                GLF_live23makeTreeNode(GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23treeIndex, 10)], GLF_live23data);
                                ;
                            } else {
                                GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex;
                                ;
                            }
                        }
                        GLF_live18baseIndex = GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18baseIndex, 10)].leftIndex;
                        ;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                float donor_replacementGLF_dead31xCoord = _GLF_FUZZED(-5874.2489);
                                float donor_replacementGLF_dead31yCoord = _GLF_FUZZED(81.99);
                                {
                                    ;
                                }
                            }
                            float donor_replacementGLF_dead25h = _GLF_FUZZED(-73.63);
                            float donor_replacementGLF_dead25refh = _GLF_FUZZED(-1929.5796);
                            float donor_replacementGLF_dead25slope = _GLF_FUZZED((vec3(77.21, -790.041, -4666.3468), 3.3));
                            {
                                lin -= lin;
                                donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                                donor_replacementGLF_dead25h = texture(GLF_dead25tex, lin).y;
                                GLF_live18baseIndex++;
                            }
                        }
                    }
                } else {
                    if (GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18baseIndex, 10)].rightIndex == -1) {
                        GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18baseIndex, 10)].rightIndex = GLF_live18treeIndex;
                        GLF_live18makeTreeNode(GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18treeIndex, 10)], GLF_live18data);
                        ;
                        {
                            ivec2 GLF_live21pos = _GLF_FUZZED(ivec2(-37848, 92679));
                            {
                                float GLF_live21p = (15.0 - abs(float(GLF_live21pos.x - GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)]))) / 15.0;
                                ;
                            }
                            if (_GLF_DEAD(false)) {
                                for (GLF_live18treeIndex = 0; GLF_live18treeIndex < 100; GLF_live18treeIndex++) {
                                    GLF_live21pos = GLF_dead24iter(GLF_live21pos);
                                }
                            }
                        }
                    } else {
                        GLF_live18baseIndex = GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18baseIndex, 10)].rightIndex;
                        ;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            GLF_live23_GLF_color = texture(GLF_dead26tex, lin);
                        }
                    }
                }
            }
        }
    }
    lin = floor(lin * 8.0);
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(uint(97.73));
                int donor_replacementGLF_dead29rows = _GLF_FUZZED(floatBitsToInt(dot(-58.49, 94.59)));
                {
                    for (int GLF_dead29r = 0; GLF_dead29r < donor_replacementGLF_dead29rows; GLF_dead29r++) {
                        switch (donor_replacementGLF_dead29matrix_number) {
                            case 0u:
                                GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                break;
                            case 1u:
                                GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                break;
                            case 2u:
                                GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                break;
                            case 3u:
                                GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                break;
                            case 4u:
                                GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                break;
                            case 5u:
                                GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                break;
                            case 6u:
                                GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                break;
                            case 7u:
                                GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                break;
                            case 8u:
                                GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                break;
                        }
                    }
                }
            }
            float donor_replacementGLF_dead13th = _GLF_FUZZED(-1293.8589);
            {
                donor_replacementGLF_dead13th = 1.0 - donor_replacementGLF_dead13th;
            }
        }
        int GLF_live10baseIndex = _GLF_FUZZED(75870);
        int GLF_live10data = _GLF_FUZZED(73758);
        int GLF_live10treeIndex = _GLF_FUZZED((55719 - (-9132)));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead30i = _GLF_FUZZED(-80181);
            for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < GLF_live10treeIndex; donor_replacementGLF_dead30i++) {
                GLF_dead27MATRIX_N = (4 * GLF_dead27MATRIX_N * (1000 - GLF_dead27MATRIX_N)) / 1000;
            }
        }
        if (GLF_live10tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10baseIndex, 10)].rightIndex == -1) {
            GLF_live10tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10baseIndex, 10)].rightIndex = GLF_live10treeIndex;
            {
                vec2 GLF_live22coord = _GLF_FUZZED((vec2(-22.43, 6.1) + 50.84));
                int GLF_live22i = _GLF_FUZZED((28321 ^ (-33074)));
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead31x = _GLF_FUZZED((false, 665.392));
                    float donor_replacementGLF_dead31y = _GLF_FUZZED(5427.2278);
                    if (donor_replacementGLF_dead31x * donor_replacementGLF_dead31x + donor_replacementGLF_dead31y * donor_replacementGLF_dead31y > 4.0) {
                        ;
                    }
                }
                int GLF_live22looplimiter0 = 0;
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        float donor_replacementGLF_dead31c_im = _GLF_FUZZED(-0.9);
                        float donor_replacementGLF_dead31c_re = _GLF_FUZZED(fract(796.934));
                        float donor_replacementGLF_dead31x = _GLF_FUZZED(clamp(-3.3, -4.1, 8.5));
                        float donor_replacementGLF_dead31y = _GLF_FUZZED(2.3);
                        for (int GLF_dead31k = 0; GLF_dead31k < 1000; GLF_dead31k++) {
                            if (donor_replacementGLF_dead31x * donor_replacementGLF_dead31x + donor_replacementGLF_dead31y * donor_replacementGLF_dead31y > 4.0) {
                                break;
                            }
                            float GLF_dead31x_new = donor_replacementGLF_dead31x * donor_replacementGLF_dead31x - donor_replacementGLF_dead31y * donor_replacementGLF_dead31y + donor_replacementGLF_dead31c_re;
                            donor_replacementGLF_dead31y = 2.0 * donor_replacementGLF_dead31x * donor_replacementGLF_dead31y + donor_replacementGLF_dead31c_im;
                            donor_replacementGLF_dead31x = GLF_dead31x_new;
                            GLF_dead27MATRIX_N++;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(abs(1.0), 1.0, cos(0.0), 0.0), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(abs(1.0), 1.0, cos(0.0), 0.0), vec4(0.0, 0.0, 0.0, 1.0))))))) {
                        float donor_replacementGLF_dead25h = _GLF_FUZZED(634.501);
                        float donor_replacementGLF_dead25refh = _GLF_FUZZED(2956.4918);
                        float donor_replacementGLF_dead25slope = _GLF_FUZZED(fract(-407.240));
                        vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(GLF_live17injectionSwitch);
                        {
                            GLF_live22coord -= donor_replacementGLF_dead25uvstep;
                            donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                            donor_replacementGLF_dead25h = texture(GLF_dead25tex, GLF_live22coord).y;
                            GLF_live10baseIndex++;
                        }
                    }
                    if (GLF_live22looplimiter0 >= 4) {
                        ;
                    }
                    GLF_live22looplimiter0++;
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead27alpha3 = _GLF_FUZZED(tan(-4.8));
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_live10data = (4 * GLF_live10data * (1000 - GLF_live10data)) / 1000;
                            }
                        }
                        mat4 donor_replacementGLF_dead27matrix_a = _GLF_FUZZED(mat4(mat3(20.39, 4889.6508, -2.3, -3.7, 2141.2841, 1.4, -80.59, 7.1, 1736.6964)));
                        vec4 donor_replacementGLF_dead27matrix_u = _GLF_FUZZED(degrees(GLF_live23_GLF_color));
                        {
                            donor_replacementGLF_dead27alpha3 += donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22looplimiter0, 4)] * donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live22looplimiter0, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10baseIndex, 4)];
                        }
                    }
                    {
                        if (GLF_live22coord.x > 1.0)
                            GLF_live22coord.x -= 1.0;
                        if (GLF_live22coord.y > 1.0)
                            GLF_live22coord.y -= 1.0;
                        GLF_live22coord *= 2.0;
                        GLF_live22i++;
                    }
                }
            }
            GLF_live10makeTreeNode(GLF_live10tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10treeIndex, 10)], GLF_live10data);
            ;
        } else {
            GLF_live10baseIndex = GLF_live10tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10baseIndex, 10)].rightIndex;
            ;
        }
    }
    int v = int(lin.x) * 8 + int(lin.y);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
        int donor_replacementGLF_dead28v = _GLF_FUZZED(v);
        {
            if ((donor_replacementGLF_dead28v & 1) == 1) {
                donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
            } else {
                donor_replacementGLF_dead28v /= 2;
            }
            v++;
        }
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead1coord = _GLF_FUZZED(resolution);
        if (_GLF_DEAD(false)) {
            uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(179314u);
            for (int GLF_dead29r = 0; GLF_dead29r < v; GLF_dead29r++) {
                switch (donor_replacementGLF_dead29matrix_number) {
                    case 0u:
                        GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                        break;
                    case 1u:
                        GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                        break;
                    case 2u:
                        GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                        break;
                    case 3u:
                        GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                        break;
                    case 4u:
                        GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                        break;
                    case 5u:
                        GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                        break;
                    case 6u:
                        GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                        break;
                    case 7u:
                        GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                        break;
                    case 8u:
                        GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                        break;
                }
            }
        }
        int donor_replacementGLF_dead1i = _GLF_FUZZED((-v));
        float donor_replacementGLF_dead1uvstep = _GLF_FUZZED((328.523));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead27alpha2 = _GLF_FUZZED(fwidthCoarse(-838.202));
                    float donor_replacementGLF_dead27alpha3 = _GLF_FUZZED(dot(GLF_live23_GLF_color, log(_GLF_color)));
                    float donor_replacementGLF_dead27magnitudeX = _GLF_FUZZED(vec3(-50.35, 3.4, 75.45).r);
                    mat4 donor_replacementGLF_dead27matrix_a = _GLF_FUZZED(mat4(-6.9, -7.4, 9.6, 77.25, -3614.7098, -2.3, -43.87, 3.1, 2.8, -19.15, 1949.4467, -6089.9868, 45.94, 970.481, -208.003, -973.213));
                    vec4 donor_replacementGLF_dead27matrix_b = _GLF_FUZZED((vec2(46.29, 4.5) * mat4x2(67.89, 32.53, 0.5, -3594.9079, 731.296, -8.1, 9.9, 16.21)));
                    for (int GLF_dead27k = 0; GLF_dead27k < GLF_dead27MATRIX_N - 1; GLF_dead27k++) {
                        for (int GLF_dead27x = GLF_dead27MATRIX_N - 1; GLF_dead27x >= GLF_dead27k; GLF_dead27x--) {
                            donor_replacementGLF_dead27magnitudeX += pow(donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27k, 4)], 2.0);
                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27x, 4)] = donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27k, 4)];
                        }
                        donor_replacementGLF_dead27magnitudeX = sqrt(donor_replacementGLF_dead27magnitudeX);
                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27k, 4)] -= (sign(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27k, 4)]) * donor_replacementGLF_dead27magnitudeX);
                        for (int GLF_dead27u = GLF_dead27MATRIX_N - 1; GLF_dead27u >= GLF_dead27k; GLF_dead27u--) {
                            donor_replacementGLF_dead1uvstep += pow(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27u, 4)], 2.0);
                        }
                        donor_replacementGLF_dead27alpha2 = 2.0 / donor_replacementGLF_dead1uvstep;
                        for (int GLF_dead27j = GLF_dead27k; GLF_dead27j < GLF_dead27MATRIX_N; GLF_dead27j++) {
                            for (int GLF_dead27a = GLF_dead27MATRIX_N - 1; GLF_dead27a >= GLF_dead27k; GLF_dead27a--) {
                                donor_replacementGLF_dead27alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)] * donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)];
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    int donor_replacementGLF_dead28count = _GLF_FUZZED(max(findMSB(26983u), donor_replacementGLF_dead1i));
                                    while (donor_replacementGLF_dead1i > 1) {
                                        if ((donor_replacementGLF_dead1i & 1) == 1) {
                                            donor_replacementGLF_dead1i = 3 * donor_replacementGLF_dead1i + 1;
                                        } else {
                                            donor_replacementGLF_dead1i /= 2;
                                        }
                                        donor_replacementGLF_dead28count++;
                                    }
                                }
                            }
                            donor_replacementGLF_dead1uvstep = donor_replacementGLF_dead27alpha2 * donor_replacementGLF_dead27alpha3;
                            for (int GLF_dead27a = GLF_dead27MATRIX_N - 1; GLF_dead27a >= GLF_dead27k; GLF_dead27a--) {
                                donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)] = donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)] - (donor_replacementGLF_dead1uvstep * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)]);
                            }
                            donor_replacementGLF_dead27alpha3 = 0.0;
                            donor_replacementGLF_dead1uvstep = 0.0;
                        }
                        for (int GLF_dead27b = GLF_dead27MATRIX_N - 1; GLF_dead27b >= GLF_dead27k; GLF_dead27b--) {
                            donor_replacementGLF_dead27alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)] * donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)];
                        }
                        donor_replacementGLF_dead1uvstep = donor_replacementGLF_dead27alpha2 * donor_replacementGLF_dead27alpha3;
                        for (int GLF_dead27b = GLF_dead27MATRIX_N - 1; GLF_dead27b >= GLF_dead27k; GLF_dead27b--) {
                            donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)] = donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)] - (donor_replacementGLF_dead1uvstep * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)]);
                        }
                        donor_replacementGLF_dead27magnitudeX = 0.0;
                        donor_replacementGLF_dead1uvstep = 0.0;
                        donor_replacementGLF_dead27alpha2 = 0.0;
                        donor_replacementGLF_dead27alpha3 = 0.0;
                        donor_replacementGLF_dead1uvstep = 0.0;
                    }
                }
                int donor_replacementGLF_dead6j = _GLF_FUZZED(donor_replacementGLF_dead1i);
                {
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(reflect(injectionSwitch, vec2(70.27, -9.7)));
                        vec4 donor_replacementGLF_dead15res = _GLF_FUZZED((vec4(5.4, 8.9, -893.103, 32.55) + dFdy(_GLF_color)));
                        float donor_replacementGLF_dead15uvstep = _GLF_FUZZED(9.1);
                        for (int GLF_dead15j = 0; GLF_dead15j < 3; GLF_dead15j++) {
                            donor_replacementGLF_dead15res += texture(GLF_dead15tex, donor_replacementGLF_dead15coord + vec2(float(donor_replacementGLF_dead6j - 1) * donor_replacementGLF_dead15uvstep, float(GLF_dead15j - 1) * donor_replacementGLF_dead15uvstep)) * GLF_dead15weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6j * 3 + GLF_dead15j, 9)];
                        }
                    }
                    GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6j, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6j, 10)];
                }
            }
            {
                {
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(ivec2(-83188, 60707));
                        if (donor_replacementGLF_dead24p.x > 0) {
                            donor_replacementGLF_dead24p.y--;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead30v = _GLF_FUZZED(abs(63344));
                        {
                            donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                        }
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead30v = _GLF_FUZZED(donor_replacementGLF_dead1i);
                            for (GLF_dead27MATRIX_N = 0; GLF_dead27MATRIX_N < GLF_dead27MATRIX_N; GLF_dead27MATRIX_N++) {
                                donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                            }
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(ivec2(68909, -85744));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(23539u);
                                    {
                                        for (int GLF_dead29r = 0; GLF_dead29r < GLF_dead27MATRIX_N; GLF_dead29r++) {
                                            switch (donor_replacementGLF_dead29matrix_number) {
                                                case 0u:
                                                    GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                    break;
                                                case 1u:
                                                    GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                    break;
                                                case 2u:
                                                    GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                    break;
                                                case 3u:
                                                    GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                    break;
                                                case 4u:
                                                    GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                    break;
                                                case 5u:
                                                    GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                    break;
                                                case 6u:
                                                    GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                    break;
                                                case 7u:
                                                    GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                    break;
                                                case 8u:
                                                    GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                    break;
                                            }
                                        }
                                    }
                                }
                                while (donor_replacementGLF_dead24p.x > 15) {
                                    donor_replacementGLF_dead24p.x -= 16;
                                }
                            }
                            int GLF_live20looplimiter2 = 0;
                            if (GLF_live20looplimiter2 >= 5) {
                                ;
                            }
                        }
                        int GLF_live19looplimiter2 = 0;
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_live19looplimiter2 = (4 * GLF_live19looplimiter2 * (1000 - GLF_live19looplimiter2)) / 1000;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED((ivec2(-7962, 8580) << ivec2(-27248, 82209)));
                            if (donor_replacementGLF_dead24p.x < 0) {
                                donor_replacementGLF_dead24p.x = -donor_replacementGLF_dead24p.x;
                            }
                        }
                        for (int GLF_live19i = 0; GLF_live19i < 10; GLF_live19i++) {
                            if (GLF_live19looplimiter2 >= 5) {
                                break;
                            }
                            GLF_live19looplimiter2++;
                            {
                                GLF_live19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = (10 - GLF_live19i);
                                {
                                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(-92.37, 434.208));
                                    vec4 GLF_live22res = _GLF_FUZZED(((vec4(1.5, -795.888, -3369.7954, 37.80)) - (mat3x4(-9.0, -3.7, -7979.0901, -6.1, -0.1, 7.8, -7.4, 4.4, -22.92, 4439.7733, -9163.4216, -6.0) * vec3(761.761, 96.54, -79.06))));
                                    {
                                        GLF_live22res = texture(GLF_live22tex, GLF_live22coord);
                                    }
                                }
                                GLF_live19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = GLF_live19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] * GLF_live19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)];
                                if (_GLF_DEAD(_GLF_IDENTITY(false, false || (_GLF_IDENTITY(false, bool(bvec3(false, true, true))))))) {
                                    vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(vec2(-732.262, -8.5));
                                    while (GLF_live19looplimiter2 < 1 && donor_replacementGLF_dead26coord.x > 1.0 || donor_replacementGLF_dead26coord.y > 1.0) {
                                        if (donor_replacementGLF_dead26coord.x > 1.0)
                                            donor_replacementGLF_dead26coord.x -= 1.0;
                                        if (donor_replacementGLF_dead26coord.y > 1.0)
                                            donor_replacementGLF_dead26coord.y -= 1.0;
                                        donor_replacementGLF_dead26coord *= 2.0;
                                        GLF_live19looplimiter2++;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead30v = _GLF_FUZZED(v);
                                        {
                                            donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    vec2 GLF_live11coord = _GLF_FUZZED(((vec3(-3.6, 4.6, -34.41) * mat2x3(-6178.0720, -110.721, 159.048, -55.14, -2.6, -88.51)) * mat2(-49.02, 323.893, 7.0, 97.83)));
                    float GLF_live11h = _GLF_FUZZED(float(int((mat3x2(95.79, 4.6, 8222.3897, 8.2, -46.03, -928.176) != mat3x2(-191.755, 9.4, 80.39, -741.686, 5.3, 4.7)))));
                    int GLF_live11i = _GLF_FUZZED((~95846));
                    float GLF_live11refh = _GLF_FUZZED(7.8);
                    float GLF_live11slope = _GLF_FUZZED((+9.8));
                    vec2 GLF_live11uvstep = _GLF_FUZZED(vec2(-0.2, 5615.7996));
                    {
                        int GLF_live11looplimiter0 = 0;
                        while (GLF_live11h < GLF_live11refh && GLF_live11i < 32) {
                            if (GLF_live11looplimiter0 >= 5) {
                                {
                                    vec3 GLF_live19color = _GLF_FUZZED((485.914 - vec3(728.672, -66.14, 4.5)));
                                    {
                                        GLF_live19color.x += float(GLF_live19obj.numbers[1]);
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead27alpha1 = _GLF_FUZZED(fwidth(GLF_live11refh));
                                    int donor_replacementGLF_dead27k = _GLF_FUZZED(GLF_live11i);
                                    vec4 donor_replacementGLF_dead27matrix_u = _GLF_FUZZED((vec4(8.6, -9.8, -37.88, 0.6) * mat4(3245.0420, -2.7, -74.90, 5.8, -907.145, 1975.9525, 80.49, -1.0, -6.6, 3.5, -3.8, 318.091, 67.68, -959.383, -5.3, -1.7)));
                                    for (int GLF_dead27u = GLF_dead27MATRIX_N - 1; GLF_dead27u >= donor_replacementGLF_dead27k; GLF_dead27u--) {
                                        donor_replacementGLF_dead27alpha1 += pow(donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27u, 4)], 2.0);
                                    }
                                }
                                break;
                            }
                            GLF_live11looplimiter0++;
                            {
                                GLF_live11coord -= GLF_live11uvstep;
                                GLF_live11refh += GLF_live11slope;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        GLF_live11i = (4 * GLF_live11i * (1000 - GLF_live11i)) / 1000;
                                    }
                                }
                                GLF_live11h = texture(GLF_live11tex, GLF_live11coord).y;
                                GLF_live11i++;
                            }
                        }
                        {
                            int GLF_live21looplimiter0 = 0;
                            ivec2 GLF_live21pos = _GLF_FUZZED(((-83994) ^ ivec2(-24231, -264)));
                            {
                                if (_GLF_DEAD(false)) {
                                    {
                                        donor_replacementGLF_dead1i = (4 * donor_replacementGLF_dead1i * (1000 - donor_replacementGLF_dead1i)) / 1000;
                                    }
                                }
                                if (GLF_live21looplimiter0 >= 7) {
                                    ;
                                }
                                GLF_live21looplimiter0++;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead29cols = _GLF_FUZZED(((-81754) << min(v, GLF_live11looplimiter0)));
                                    uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(uint(-33466));
                                    {
                                        for (int GLF_dead29rows = 2; GLF_dead29rows <= 4; GLF_dead29rows++) {
                                            for (int GLF_dead29c = 0; GLF_dead29c < donor_replacementGLF_dead29cols; GLF_dead29c++) {
                                                for (int GLF_dead29r = 0; GLF_dead29r < GLF_dead29rows; GLF_dead29r++) {
                                                    switch (donor_replacementGLF_dead29matrix_number) {
                                                        case 0u:
                                                            GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                            break;
                                                        case 1u:
                                                            GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                            break;
                                                        case 2u:
                                                            GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                            break;
                                                        case 3u:
                                                            GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                            break;
                                                        case 4u:
                                                            GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                            break;
                                                        case 5u:
                                                            GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                            break;
                                                        case 6u:
                                                            GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                            break;
                                                        case 7u:
                                                            GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                            break;
                                                        case 8u:
                                                            GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                            break;
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead29matrix_number = donor_replacementGLF_dead29matrix_number + 1u;
                                        }
                                    }
                                }
                                {
                                    if (GLF_live21pos.x < GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] + 15 && GLF_live21pos.x > GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] - 15) {
                                        float GLF_live21p = (15.0 - abs(float(GLF_live21pos.x - GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                    GLF_live21pos.y++;
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead29cols = _GLF_FUZZED(findLSB(165606u));
                                    uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(196786u);
                                    for (int GLF_dead29rows = 2; GLF_dead29rows <= 4; GLF_dead29rows++) {
                                        for (int GLF_dead29c = 0; GLF_dead29c < donor_replacementGLF_dead29cols; GLF_dead29c++) {
                                            for (int GLF_dead29r = 0; GLF_dead29r < GLF_dead29rows; GLF_dead29r++) {
                                                switch (donor_replacementGLF_dead29matrix_number) {
                                                    case 0u:
                                                        GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                        break;
                                                    case 1u:
                                                        GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                        break;
                                                    case 2u:
                                                        GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                        break;
                                                    case 3u:
                                                        GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                        break;
                                                    case 4u:
                                                        GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                        break;
                                                    case 5u:
                                                        GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                        break;
                                                    case 6u:
                                                        GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                        break;
                                                    case 7u:
                                                        GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                        break;
                                                    case 8u:
                                                        GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                        break;
                                                }
                                            }
                                        }
                                        donor_replacementGLF_dead29matrix_number = donor_replacementGLF_dead29matrix_number + 1u;
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
                }
                int GLF_live2d = _GLF_FUZZED(19236);
                {
                    if (_GLF_DEAD(false)) {
                        {
                            if (donor_replacementGLF_dead1coord.x > 1.0)
                                donor_replacementGLF_dead1coord.x -= 1.0;
                            if (donor_replacementGLF_dead1coord.y > 1.0)
                                donor_replacementGLF_dead1coord.y -= 1.0;
                            donor_replacementGLF_dead1coord *= 2.0;
                            GLF_live2d++;
                        }
                    }
                    {
                        ;
                    }
                }
                {
                    vec2 GLF_live8coord = _GLF_FUZZED(vec2(833.902, -1.3));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(floatBitsToInt(lin));
                        while (donor_replacementGLF_dead24p.x > 15) {
                            donor_replacementGLF_dead24p.x -= 16;
                        }
                    }
                    int GLF_live8i = _GLF_FUZZED(-47760);
                    vec4 GLF_live8texel = _GLF_FUZZED((mat2x4(834.852, -7159.0229, 344.650, 9758.3647, -5.3, 4.4, -2.5, 3.7) * vec2(-436.889, 2781.9378)));
                    {
                        int GLF_live8looplimiter0 = 0;
                        while (GLF_live8texel.x + GLF_live8texel.y + GLF_live8texel.z > 1.0 && GLF_live8i < 16) {
                            if (GLF_live8looplimiter0 >= 6) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                    int donor_replacementGLF_dead28v = _GLF_FUZZED(GLF_dead27MATRIX_N);
                                    if ((donor_replacementGLF_dead28v & 1) == 1) {
                                        donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                                    } else {
                                        donor_replacementGLF_dead28v /= 2;
                                    }
                                }
                                {
                                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(6193.2208, 8774.9066));
                                    int GLF_live22i = _GLF_FUZZED(-88150);
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED((injectionSwitch - (-555.064)));
                                        float donor_replacementGLF_dead25h = _GLF_FUZZED(fma(-2.8, donor_replacementGLF_dead1uvstep, donor_replacementGLF_dead1uvstep));
                                        float donor_replacementGLF_dead25refh = _GLF_FUZZED(7.3);
                                        {
                                            donor_replacementGLF_dead25coord -= donor_replacementGLF_dead1coord;
                                            donor_replacementGLF_dead25refh += donor_replacementGLF_dead1uvstep;
                                            donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                            v++;
                                        }
                                    }
                                    {
                                        int GLF_live22looplimiter0 = 0;
                                        while (GLF_live22i < 1 && GLF_live22coord.x > 1.0 || GLF_live22coord.y > 1.0) {
                                            if (GLF_live22looplimiter0 >= 4) {
                                                break;
                                            }
                                            GLF_live22looplimiter0++;
                                            {
                                                if (GLF_live22coord.x > 1.0)
                                                    GLF_live22coord.x -= 1.0;
                                                if (GLF_live22coord.y > 1.0)
                                                    GLF_live22coord.y -= 1.0;
                                                GLF_live22coord *= 2.0;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead28v = _GLF_FUZZED(ivec2(-32322, 96033).r);
                                                        if ((donor_replacementGLF_dead28v & 1) == 1) {
                                                            donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                                                        } else {
                                                            donor_replacementGLF_dead28v /= 2;
                                                        }
                                                    }
                                                    vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(unpackUnorm2x16(14779u));
                                                    float donor_replacementGLF_dead25h = _GLF_FUZZED(-3513.5300);
                                                    float donor_replacementGLF_dead25refh = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                                                    vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(clamp(sin(donor_replacementGLF_dead1coord), vec2(-968.321, 3.5), vec2(-9.1, 6606.8106)));
                                                    while (donor_replacementGLF_dead25h < donor_replacementGLF_dead25refh && GLF_live8looplimiter0 < 32) {
                                                        donor_replacementGLF_dead25coord -= donor_replacementGLF_dead25uvstep;
                                                        donor_replacementGLF_dead25refh += donor_replacementGLF_dead1uvstep;
                                                        donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                                        GLF_live8looplimiter0++;
                                                    }
                                                }
                                                GLF_live22i++;
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_IDENTITY(false, false || (false)), true && (_GLF_IDENTITY(false, false || (false)))))) {
                                    ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED((ivec2(68645, 36184) - ivec2(-72180, 30270)));
                                    for (donor_replacementGLF_dead1i = 0; donor_replacementGLF_dead1i < 100; donor_replacementGLF_dead1i++) {
                                        donor_replacementGLF_dead24p = GLF_dead24iter(donor_replacementGLF_dead24p);
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    {
                                        {
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead28v = _GLF_FUZZED(-70953);
                                                {
                                                    donor_replacementGLF_dead28v /= 2;
                                                }
                                            }
                                            ;
                                        }
                                    }
                                    int donor_replacementGLF_dead15i = _GLF_FUZZED(GLF_live8looplimiter0);
                                    vec4 donor_replacementGLF_dead15res = _GLF_FUZZED(trunc(_GLF_color));
                                    {
                                        int GLF_live18baseIndex = _GLF_FUZZED((((-66549) ^ (-27023)) ^ (-69492)));
                                        int GLF_live18data = _GLF_FUZZED((~(-67817)));
                                        if (_GLF_DEAD(false)) {
                                            if (donor_replacementGLF_dead1coord.x < 1.0 && donor_replacementGLF_dead1coord.y < 1.0) {
                                                donor_replacementGLF_dead15res = texture(GLF_dead26tex, donor_replacementGLF_dead1coord);
                                            }
                                        }
                                        int GLF_live18treeIndex = _GLF_FUZZED((ivec4(18923, 63317, 39169, 71910).t - 97417));
                                        {
                                            if (GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18baseIndex, 10)].leftIndex == -1) {
                                                GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18baseIndex, 10)].leftIndex = GLF_live18treeIndex;
                                                GLF_live18makeTreeNode(GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18treeIndex, 10)], GLF_live18data);
                                                ;
                                            } else {
                                                GLF_live18baseIndex = GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18baseIndex, 10)].leftIndex;
                                                ;
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead28count = _GLF_FUZZED((GLF_live8looplimiter0 & GLF_live18treeIndex));
                                                        {
                                                            if ((GLF_dead27MATRIX_N & 1) == 1) {
                                                                GLF_dead27MATRIX_N = 3 * GLF_dead27MATRIX_N + 1;
                                                            } else {
                                                                GLF_dead27MATRIX_N /= 2;
                                                            }
                                                            donor_replacementGLF_dead28count++;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0))))))) {
                                                        if (donor_replacementGLF_dead1coord.x < 1.0 && donor_replacementGLF_dead1coord.y < 1.0) {
                                                            donor_replacementGLF_dead15res = texture(GLF_dead26tex, donor_replacementGLF_dead1coord);
                                                        }
                                                    }
                                                    int GLF_live22looplimiter0 = 0;
                                                    if (GLF_live22looplimiter0 >= 4) {
                                                        ;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        if (lin.y > 1.0)
                                                            lin.y -= 1.0;
                                                    }
                                                }
                                            }
                                        }
                                        {
                                            int GLF_live22looplimiter0 = 0;
                                            if (GLF_live22looplimiter0 >= 4) {
                                                ;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            {
                                                GLF_live2d /= 2;
                                            }
                                        }
                                    }
                                    float donor_replacementGLF_dead15uvstep = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                                    {
                                        for (int GLF_dead15j = 0; GLF_dead15j < 3; GLF_dead15j++) {
                                            donor_replacementGLF_dead15res += texture(GLF_dead15tex, lin + vec2(float(donor_replacementGLF_dead15i - 1) * donor_replacementGLF_dead15uvstep, float(GLF_dead15j - 1) * donor_replacementGLF_dead15uvstep)) * GLF_dead15weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15i * 3 + GLF_dead15j, 9)];
                                        }
                                    }
                                }
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(GLF_live8coord);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(86218u);
                                    {
                                        for (int GLF_dead29rows = 2; GLF_dead29rows <= 4; GLF_dead29rows++) {
                                            for (int GLF_dead29c = 0; GLF_dead29c < v; GLF_dead29c++) {
                                                for (int GLF_dead29r = 0; GLF_dead29r < GLF_dead29rows; GLF_dead29r++) {
                                                    switch (donor_replacementGLF_dead29matrix_number) {
                                                        case 0u:
                                                            GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                            break;
                                                        case 1u:
                                                            GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                            break;
                                                        case 2u:
                                                            GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                            break;
                                                        case 3u:
                                                            GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                            break;
                                                        case 4u:
                                                            GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                            break;
                                                        case 5u:
                                                            GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                            break;
                                                        case 6u:
                                                            GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                            break;
                                                        case 7u:
                                                            GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                            break;
                                                        case 8u:
                                                            GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                            break;
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead29matrix_number = donor_replacementGLF_dead29matrix_number + 1u;
                                        }
                                    }
                                }
                                float donor_replacementGLF_dead15uvstep = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead31c_re = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                                        for (int GLF_dead31k = 0; GLF_dead31k < 1000; GLF_dead31k++) {
                                            if (donor_replacementGLF_dead1uvstep * donor_replacementGLF_dead1uvstep + donor_replacementGLF_dead15uvstep * donor_replacementGLF_dead15uvstep > 4.0) {
                                                break;
                                            }
                                            float GLF_dead31x_new = donor_replacementGLF_dead1uvstep * donor_replacementGLF_dead1uvstep - donor_replacementGLF_dead15uvstep * donor_replacementGLF_dead15uvstep + donor_replacementGLF_dead31c_re;
                                            donor_replacementGLF_dead15uvstep = 2.0 * donor_replacementGLF_dead1uvstep * donor_replacementGLF_dead15uvstep + donor_replacementGLF_dead15uvstep;
                                            donor_replacementGLF_dead1uvstep = GLF_dead31x_new;
                                            GLF_live8looplimiter0++;
                                        }
                                    }
                                    int donor_replacementGLF_dead27b = _GLF_FUZZED(v);
                                    float donor_replacementGLF_dead27beta = _GLF_FUZZED(donor_replacementGLF_dead15uvstep);
                                    {
                                        GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27b, 4)] = GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27b, 4)] - (donor_replacementGLF_dead27beta * GLF_live23_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27b, 4)]);
                                    }
                                }
                                {
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead31c_im = _GLF_FUZZED(donor_replacementGLF_dead15uvstep);
                                        float donor_replacementGLF_dead31c_re = _GLF_FUZZED((donor_replacementGLF_dead1uvstep * max(donor_replacementGLF_dead15uvstep, donor_replacementGLF_dead15uvstep)));
                                        float donor_replacementGLF_dead31y = _GLF_FUZZED(donor_replacementGLF_dead15uvstep);
                                        for (int GLF_dead31k = 0; GLF_dead31k < 1000; GLF_dead31k++) {
                                            if (donor_replacementGLF_dead1uvstep * donor_replacementGLF_dead1uvstep + donor_replacementGLF_dead31y * donor_replacementGLF_dead31y > 4.0) {
                                                break;
                                            }
                                            float GLF_dead31x_new = donor_replacementGLF_dead1uvstep * donor_replacementGLF_dead1uvstep - donor_replacementGLF_dead31y * donor_replacementGLF_dead31y + donor_replacementGLF_dead31c_re;
                                            donor_replacementGLF_dead31y = 2.0 * donor_replacementGLF_dead1uvstep * donor_replacementGLF_dead31y + donor_replacementGLF_dead31c_im;
                                            donor_replacementGLF_dead1uvstep = GLF_dead31x_new;
                                            GLF_live8looplimiter0++;
                                        }
                                    }
                                    GLF_live8texel += texture(GLF_dead15tex, donor_replacementGLF_dead15coord + vec2(float(donor_replacementGLF_dead1i - 1) * donor_replacementGLF_dead15uvstep, float(GLF_live2d - 1) * donor_replacementGLF_dead15uvstep)) * GLF_dead15weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i * 3 + GLF_live2d, 9)];
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(ivec2(-42571, -46267));
                                if (donor_replacementGLF_dead24p.x < 0) {
                                    donor_replacementGLF_dead24p.x = -donor_replacementGLF_dead24p.x;
                                }
                            }
                            GLF_live8looplimiter0++;
                            {
                                GLF_live8coord = GLF_live8texel.xz + GLF_live8texel.yy;
                                GLF_live8coord = floor(GLF_live8coord * 256.0) / 256.0;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    int donor_replacementGLF_dead30v = _GLF_FUZZED(abs(donor_replacementGLF_dead1i));
                                    {
                                        donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                                    }
                                }
                                GLF_live8texel = texture(GLF_live8tex, GLF_live8coord);
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead25h = _GLF_FUZZED(6.2);
                                    float donor_replacementGLF_dead25refh = _GLF_FUZZED(trunc(donor_replacementGLF_dead1uvstep));
                                    while (donor_replacementGLF_dead25h < donor_replacementGLF_dead25refh && donor_replacementGLF_dead1i < 32) {
                                        donor_replacementGLF_dead1coord -= donor_replacementGLF_dead1coord;
                                        donor_replacementGLF_dead25refh += donor_replacementGLF_dead1uvstep;
                                        donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead1coord).y;
                                        donor_replacementGLF_dead1i++;
                                    }
                                }
                                GLF_live8i++;
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(vec2(-752.185, 428.797));
                                    float donor_replacementGLF_dead25refh = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                                    while (donor_replacementGLF_dead1uvstep < donor_replacementGLF_dead25refh && donor_replacementGLF_dead1i < 32) {
                                        donor_replacementGLF_dead25coord -= donor_replacementGLF_dead1coord;
                                        donor_replacementGLF_dead25refh += donor_replacementGLF_dead1uvstep;
                                        donor_replacementGLF_dead1uvstep = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                        donor_replacementGLF_dead1i++;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 1.0, 0.0, 0.0, 0.0, 1.0, 0.0)))))) {
                                            int donor_replacementGLF_dead30i = _GLF_FUZZED(GLF_dead27MATRIX_N);
                                            int donor_replacementGLF_dead30iters = _GLF_FUZZED(GLF_live2d);
                                            int donor_replacementGLF_dead30v = _GLF_FUZZED(GLF_live8i);
                                            for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < donor_replacementGLF_dead30iters; donor_replacementGLF_dead30i++) {
                                                donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                            ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(ivec2(-67705, -40760));
                            if (donor_replacementGLF_dead24p.x > 0) {
                                donor_replacementGLF_dead24p.y--;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead25h = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            while (GLF_live8i > 1) {
                                if ((GLF_live8i & 1) == 1) {
                                    GLF_live8i = 3 * GLF_live8i + 1;
                                } else {
                                    GLF_live8i /= 2;
                                }
                                v++;
                            }
                        }
                        {
                            donor_replacementGLF_dead1coord -= lin;
                            donor_replacementGLF_dead1uvstep += donor_replacementGLF_dead1uvstep;
                            donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead1coord).y;
                            GLF_live8i++;
                        }
                    }
                }
                ivec2 GLF_live2p = _GLF_FUZZED((ivec2(63688, 50173) * 7316));
                if (GLF_live2d >= 0 && GLF_live2p.y > 0 && GLF_live2map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live2p.x) + (GLF_live2p.y - 2) * 16, 256)] == 0) {
                    {
                        int GLF_live19h = _GLF_FUZZED(((-31574) ^ 71950));
                        int GLF_live19i = _GLF_FUZZED((53702 * ivec2(18028, 80954).x));
                        int GLF_live19l = _GLF_FUZZED(ivec3(-24932, -86121, -92380).t);
                        int GLF_live19looplimiter0 = 0;
                        int GLF_live19pivot = _GLF_FUZZED(-58155);
                        {
                            {
                                ;
                            }
                        }
                        for (int GLF_live19j = GLF_live19l; GLF_live19j <= GLF_live19h - 1; GLF_live19j++) {
                            if (GLF_live19looplimiter0 >= 5) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead29c = _GLF_FUZZED(GLF_live19h);
                                    uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(bitfieldInsert(85707u, 123786u, 62040, mix(donor_replacementGLF_dead1i, GLF_dead27MATRIX_N, true)));
                                    {
                                        switch (donor_replacementGLF_dead29matrix_number) {
                                            case 0u:
                                                GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 2)] = GLF_dead29one;
                                                break;
                                            case 1u:
                                                GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 3)] = GLF_dead29one;
                                                break;
                                            case 2u:
                                                GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 4)] = GLF_dead29one;
                                                break;
                                            case 3u:
                                                GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 2)] = GLF_dead29one;
                                                break;
                                            case 4u:
                                                GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 3)] = GLF_dead29one;
                                                break;
                                            case 5u:
                                                GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 4)] = GLF_dead29one;
                                                break;
                                            case 6u:
                                                GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 2)] = GLF_dead29one;
                                                break;
                                            case 7u:
                                                GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 3)] = GLF_dead29one;
                                                break;
                                            case 8u:
                                                GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 4)] = GLF_dead29one;
                                                break;
                                        }
                                    }
                                }
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead25h = _GLF_FUZZED(sin(pow(donor_replacementGLF_dead1uvstep, -8.8)));
                                {
                                    lin -= donor_replacementGLF_dead1coord;
                                    donor_replacementGLF_dead1uvstep += donor_replacementGLF_dead1uvstep;
                                    donor_replacementGLF_dead25h = texture(GLF_dead25tex, lin).y;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        int donor_replacementGLF_dead29cols = _GLF_FUZZED((v + (GLF_live19l >> GLF_live19i)));
                                        uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(60402u);
                                        {
                                            for (int GLF_dead29rows = 2; GLF_dead29rows <= 4; GLF_dead29rows++) {
                                                for (int GLF_dead29c = 0; GLF_dead29c < donor_replacementGLF_dead29cols; GLF_dead29c++) {
                                                    for (int GLF_dead29r = 0; GLF_dead29r < GLF_dead29rows; GLF_dead29r++) {
                                                        switch (donor_replacementGLF_dead29matrix_number) {
                                                            case 0u:
                                                                GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                                break;
                                                            case 1u:
                                                                GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                                break;
                                                            case 2u:
                                                                GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                                break;
                                                            case 3u:
                                                                GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                                break;
                                                            case 4u:
                                                                GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                                break;
                                                            case 5u:
                                                                GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                                break;
                                                            case 6u:
                                                                GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                                break;
                                                            case 7u:
                                                                GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                                break;
                                                            case 8u:
                                                                GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                                break;
                                                        }
                                                    }
                                                }
                                                donor_replacementGLF_dead29matrix_number = donor_replacementGLF_dead29matrix_number + 1u;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead1i++;
                                }
                            }
                            GLF_live19looplimiter0++;
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    float donor_replacementGLF_dead25h = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                                    int donor_replacementGLF_dead25i = _GLF_FUZZED(GLF_live19looplimiter0);
                                    float donor_replacementGLF_dead25refh = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                                    float donor_replacementGLF_dead25slope = _GLF_FUZZED(4.8);
                                    vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(lin);
                                    while (donor_replacementGLF_dead25h < donor_replacementGLF_dead25refh && donor_replacementGLF_dead25i < 32) {
                                        lin -= donor_replacementGLF_dead25uvstep;
                                        donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                                        donor_replacementGLF_dead25h = texture(GLF_dead25tex, lin).y;
                                        donor_replacementGLF_dead25i++;
                                    }
                                }
                                if (GLF_live19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)] <= GLF_live19pivot) {
                                    GLF_live19i++;
                                    GLF_live19swap(GLF_live19i, GLF_live19j);
                                }
                            }
                        }
                    }
                    GLF_live2d--;
                    GLF_live2map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live2p.x) + (GLF_live2p.y) * 16, 256)] = 1;
                    GLF_live2map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live2p.x) + (GLF_live2p.y - 1) * 16, 256)] = 1;
                    GLF_live2map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live2p.x) + (GLF_live2p.y - 2) * 16, 256)] = 1;
                    GLF_live2p.y -= 2;
                }
                {
                    vec3 GLF_live17m = _GLF_FUZZED(vec3(3598.2418, 4.6, -76.39));
                    vec2 GLF_live17o = _GLF_FUZZED(vec2(-9846.0242, -18.44));
                    {
                        int GLF_live21looplimiter0 = 0;
                        if (GLF_live21looplimiter0 >= 7) {
                            ;
                        }
                    }
                    if (GLF_live17injectionSwitch.x < (GLF_live17m.x)) {
                        {
                            int GLF_live23baseIndex = _GLF_FUZZED(ivec4(13618, -33209, 41222, 20022).y);
                            int GLF_live23data = _GLF_FUZZED((~((-71635) & ivec3(-96441, -63194, 73939).p)));
                            int GLF_live23treeIndex = _GLF_FUZZED(((-39141) + 20285));
                            if (GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex == -1) {
                                GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex = GLF_live23treeIndex;
                                GLF_live23makeTreeNode(GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23treeIndex, 10)], GLF_live23data);
                                ;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(donor_replacementGLF_dead1coord);
                                    vec4 donor_replacementGLF_dead26res = _GLF_FUZZED(mod(GLF_live23_GLF_color, -953.523));
                                    {
                                        donor_replacementGLF_dead26res = texture(GLF_dead26tex, donor_replacementGLF_dead26coord);
                                    }
                                }
                            } else {
                                GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex;
                                ;
                            }
                        }
                        int GLF_live17k = 1;
                        {
                            int GLF_live17looplimiter0 = 0;
                            while (GLF_live17k >= 0) {
                                if (GLF_live17looplimiter0 >= 6) {
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_live17looplimiter0 = (4 * GLF_live17looplimiter0 * (1000 - GLF_live17looplimiter0)) / 1000;
                                        }
                                    }
                                }
                                GLF_live17looplimiter0++;
                                {
                                    {
                                        vec2 GLF_live22coord = _GLF_FUZZED(((mat2(-9611.5922, -4.7, 1738.9582, 3.4) * vec2(536.280, -8427.7669)) + (+(-5.1))));
                                        if (GLF_live22coord.x > 1.0)
                                            GLF_live22coord.x -= 1.0;
                                    }
                                    GLF_live17o = GLF_live17o + GLF_live17o;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        {
                                            _GLF_color = texture(GLF_dead26tex, GLF_live17o);
                                        }
                                    }
                                    GLF_live17k--;
                                    {
                                        int GLF_live23baseIndex = _GLF_FUZZED(((-61096) - 76791));
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                            int donor_replacementGLF_dead28v = _GLF_FUZZED((vec4(-2.8, 446.581, -8185.0322, 18.19), -37124));
                                            {
                                                donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                                            }
                                        }
                                        int GLF_live23data = _GLF_FUZZED(-85644);
                                        int GLF_live23treeIndex = _GLF_FUZZED(-45523);
                                        if (GLF_live23data <= GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].data) {
                                            if (GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex == -1) {
                                                GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex = GLF_live23treeIndex;
                                                GLF_live23makeTreeNode(GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23treeIndex, 10)], GLF_live23data);
                                                ;
                                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false || (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), bool(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))))) {
                                                    while (GLF_live23baseIndex < 1 && lin.x > 1.0 || lin.y > 1.0) {
                                                        if (lin.x > 1.0)
                                                            lin.x -= 1.0;
                                                        if (lin.y > 1.0)
                                                            lin.y -= 1.0;
                                                        lin *= 2.0;
                                                        GLF_live23baseIndex++;
                                                    }
                                                }
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead27alpha1 = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                                                    int donor_replacementGLF_dead27k = _GLF_FUZZED(GLF_live2d);
                                                    vec4 donor_replacementGLF_dead27matrix_u = _GLF_FUZZED(_GLF_color);
                                                    for (int GLF_dead27u = GLF_dead27MATRIX_N - 1; GLF_dead27u >= donor_replacementGLF_dead27k; GLF_dead27u--) {
                                                        donor_replacementGLF_dead27alpha1 += pow(donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27u, 4)], 2.0);
                                                    }
                                                }
                                                GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex;
                                                ;
                                            }
                                        } else {
                                            if (GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex == -1) {
                                                GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex = GLF_live23treeIndex;
                                                GLF_live23makeTreeNode(GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23treeIndex, 10)], GLF_live23data);
                                                ;
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        v = (4 * v * (1000 - v)) / 1000;
                                                    }
                                                }
                                            } else {
                                                GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex;
                                                ;
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    if ((GLF_live17looplimiter0 & 1) == 1) {
                                        GLF_live17looplimiter0 = 3 * GLF_live17looplimiter0 + 1;
                                    } else {
                                        GLF_live17looplimiter0 /= 2;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead27k = _GLF_FUZZED(donor_replacementGLF_dead1i);
                                    for (int GLF_dead27u = GLF_dead27MATRIX_N - 1; GLF_dead27u >= donor_replacementGLF_dead27k; GLF_dead27u--) {
                                        donor_replacementGLF_dead1uvstep += pow(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27u, 4)], 2.0);
                                    }
                                }
                            }
                        }
                        GLF_live17m = vec3(GLF_live17injectionSwitch.x, cos(GLF_live17o));
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(((false ? vec4(6.9, -5786.7121, 8.3, 751.369) : _GLF_color)[3] * injectionSwitch));
                vec4 donor_replacementGLF_dead7texel = _GLF_FUZZED(_GLF_color);
                while (donor_replacementGLF_dead7texel.x + donor_replacementGLF_dead7texel.y + donor_replacementGLF_dead7texel.z > 1.0 && v < 16) {
                    donor_replacementGLF_dead7coord = donor_replacementGLF_dead7texel.xz + donor_replacementGLF_dead7texel.yy;
                    donor_replacementGLF_dead7coord = floor(donor_replacementGLF_dead7coord * 256.0) / 256.0;
                    donor_replacementGLF_dead7texel = texture(GLF_dead7tex, donor_replacementGLF_dead7coord);
                    v++;
                }
            }
            {
                vec2 GLF_live8coord = _GLF_FUZZED((+vec2(3173.6739, -5.9)));
                int GLF_live8i = _GLF_FUZZED(-48541);
                int GLF_live8looplimiter0 = 0;
                vec4 GLF_live8texel = _GLF_FUZZED(vec4((true ? vec3(-1.2, 3.7, -3341.0149) : vec3(7.8, 677.663, -203.040)), 51.38));
                while (GLF_live8texel.x + GLF_live8texel.y + GLF_live8texel.z > 1.0 && GLF_live8i < 16) {
                    if (GLF_live8looplimiter0 >= 6) {
                        if (_GLF_DEAD(false)) {
                            {
                                donor_replacementGLF_dead1i = (4 * donor_replacementGLF_dead1i * (1000 - donor_replacementGLF_dead1i)) / 1000;
                            }
                        }
                        break;
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(355.198, -252.242));
                            int GLF_live22i = _GLF_FUZZED(-32304);
                            int GLF_live22looplimiter0 = 0;
                            while (GLF_live22i < 1 && GLF_live22coord.x > 1.0 || GLF_live22coord.y > 1.0) {
                                if (GLF_live22looplimiter0 >= 4) {
                                    break;
                                }
                                GLF_live22looplimiter0++;
                                {
                                    if (GLF_live22coord.x > 1.0)
                                        GLF_live22coord.x -= 1.0;
                                    if (GLF_live22coord.y > 1.0) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            int donor_replacementGLF_dead28v = _GLF_FUZZED((ivec3(-51731, 71340, 46536) * GLF_live8i).r);
                                            if ((donor_replacementGLF_dead28v & 1) == 1) {
                                                donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                                            } else {
                                                donor_replacementGLF_dead28v /= 2;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(injectionSwitch);
                                            if (_GLF_DEAD(false)) {
                                                if (donor_replacementGLF_dead1uvstep * donor_replacementGLF_dead1uvstep + donor_replacementGLF_dead1uvstep * donor_replacementGLF_dead1uvstep > 4.0) {
                                                    break;
                                                }
                                            }
                                            float donor_replacementGLF_dead25refh = _GLF_FUZZED(uintBitsToFloat(19524u));
                                            float donor_replacementGLF_dead25slope = _GLF_FUZZED(dFdyFine(donor_replacementGLF_dead1uvstep));
                                            vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(unpackUnorm2x16(bitfieldInsert(145593u, 11349u, GLF_live8looplimiter0, GLF_live22looplimiter0)));
                                            {
                                                donor_replacementGLF_dead25coord -= donor_replacementGLF_dead25uvstep;
                                                donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                                                donor_replacementGLF_dead1uvstep = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                                GLF_live8looplimiter0++;
                                            }
                                        }
                                        GLF_live22coord.y -= 1.0;
                                    }
                                    GLF_live22coord *= 2.0;
                                    if (_GLF_DEAD(false)) {
                                        mat4 donor_replacementGLF_dead27matrix_a = _GLF_FUZZED((uvec3(158652u, 193560u, 76270u), ((donor_replacementGLF_dead1uvstep - mat4(-0.2, -2.9, 1.3, 2018.6082, -0.4, -788.391, 89.47, 4.2, -70.83, 291.820, -3.0, 16.64, 75.18, 7628.9548, 5.4, 623.873)) + donor_replacementGLF_dead1uvstep)));
                                        vec4 donor_replacementGLF_dead27matrix_b = _GLF_FUZZED(vec4(-9.0, -6717.5825, -8.1, -41.74));
                                        for (int GLF_dead27i = (GLF_dead27MATRIX_N - 1); GLF_dead27i >= 0; GLF_dead27i--) {
                                            for (int GLF_dead27j = (GLF_dead27MATRIX_N - 1); GLF_dead27j >= (GLF_dead27i + 1); GLF_dead27j--) {
                                                donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 4)] -= (donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)] * donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)]);
                                            }
                                            donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 4)] /= donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 4)];
                                        }
                                    }
                                    GLF_live22i++;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead14limit = _GLF_FUZZED(trunc(dFdyFine(771.961)));
                            {
                                int GLF_live19h = _GLF_FUZZED(-69865);
                                int GLF_live19i = _GLF_FUZZED(((-81808) + (-27101)));
                                int GLF_live19l = _GLF_FUZZED(60338);
                                int GLF_live19pivot = _GLF_FUZZED(97412);
                                {
                                    int GLF_live19looplimiter0 = 0;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, float(mat3x4(0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0))))))) {
                                        vec4 donor_replacementGLF_dead26res = _GLF_FUZZED(pow(_GLF_color, GLF_live23_GLF_color));
                                        {
                                            donor_replacementGLF_dead26res = texture(GLF_dead26tex, lin);
                                        }
                                    }
                                    for (int GLF_live19j = GLF_live19l; GLF_live19j <= GLF_live19h - 1; GLF_live19j++) {
                                        if (GLF_live19looplimiter0 >= 5) {
                                            break;
                                            if (_GLF_DEAD(false)) {
                                                while (donor_replacementGLF_dead1uvstep < donor_replacementGLF_dead14limit && GLF_live19l < 32) {
                                                    lin -= GLF_live8coord;
                                                    donor_replacementGLF_dead14limit += donor_replacementGLF_dead14limit;
                                                    donor_replacementGLF_dead1uvstep = texture(GLF_dead25tex, lin).y;
                                                    GLF_live19l++;
                                                }
                                            }
                                        }
                                        GLF_live19looplimiter0++;
                                        {
                                            if (GLF_live19obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)] <= GLF_live19pivot) {
                                                GLF_live19i++;
                                                GLF_live19swap(GLF_live19i, GLF_live19j);
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                                    float donor_replacementGLF_dead31yCoord = _GLF_FUZZED(-939.635);
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        {
                                            ;
                                        }
                                    }
                                }
                            }
                            float donor_replacementGLF_dead14ref = _GLF_FUZZED(ceil(344.933));
                            float donor_replacementGLF_dead14s = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                            for (int GLF_dead14i = 1; GLF_dead14i < 800; GLF_dead14i++) {
                                if (mod(float(GLF_dead14i), donor_replacementGLF_dead14ref) <= 0.01) {
                                    donor_replacementGLF_dead14s += 0.2;
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            int donor_replacementGLF_dead31iteration = _GLF_FUZZED(((-40627) * int(16575u)));
                                            {
                                                ;
                                            }
                                        }
                                        int GLF_live23count = _GLF_FUZZED((-24605));
                                        if (GLF_live23count == 20) {
                                            GLF_live23_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead28v = _GLF_FUZZED(GLF_live23count);
                                                {
                                                    donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                                                }
                                            }
                                            GLF_live23_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(GLF_live8coord);
                                    if (donor_replacementGLF_dead26coord.x > 1.0)
                                        donor_replacementGLF_dead26coord.x -= 1.0;
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_dead14i = (4 * GLF_dead14i * (1000 - GLF_dead14i)) / 1000;
                                        }
                                    }
                                }
                                if (float(GLF_dead14i) >= donor_replacementGLF_dead14limit) {
                                    {
                                        {
                                            if (_GLF_DEAD(false)) {
                                                vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(dFdyCoarse(GLF_live8coord));
                                                float donor_replacementGLF_dead25refh = _GLF_FUZZED(distance(donor_replacementGLF_dead14ref, donor_replacementGLF_dead14limit));
                                                float donor_replacementGLF_dead25slope = _GLF_FUZZED(donor_replacementGLF_dead14ref);
                                                {
                                                    donor_replacementGLF_dead25coord -= GLF_live8coord;
                                                    donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                                                    donor_replacementGLF_dead14s = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                                    GLF_dead14i++;
                                                }
                                            }
                                            int GLF_live23count = _GLF_FUZZED(9704);
                                            int GLF_live23i = _GLF_FUZZED(ivec3(-38555, 63479, 52765).xz.s);
                                            {
                                                int GLF_live23result = GLF_live23search(GLF_live23i);
                                                switch (GLF_live23i) {
                                                    case 9:
                                                    case 5:
                                                    case 12:
                                                    case 15:
                                                    case 7:
                                                    case 8:
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            int donor_replacementGLF_dead30iters = _GLF_FUZZED((+GLF_live23count));
                                                            for (v = 0; v < donor_replacementGLF_dead30iters; v++) {
                                                                GLF_live23count = (4 * GLF_live23count * (1000 - GLF_live23count)) / 1000;
                                                            }
                                                        }
                                                    case 2:
                                                    case 6:
                                                    case 17:
                                                    case 13:
                                                        if (GLF_live23result == GLF_live23i) {
                                                            GLF_live23count++;
                                                        }
                                                        break;
                                                        if (_GLF_DEAD(false)) {
                                                            vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(mix(lin, atan(donor_replacementGLF_dead1coord), donor_replacementGLF_dead1coord));
                                                            if (donor_replacementGLF_dead26coord.y > 1.0)
                                                                donor_replacementGLF_dead26coord.y -= 1.0;
                                                        }
                                                    default:
                                                        if (GLF_live23result == -1) {
                                                            GLF_live23count++;
                                                        }
                                                        break;
                                                }
                                            }
                                        }
                                        int GLF_live19looplimiter1 = 0;
                                        if (GLF_live19looplimiter1 >= 5) {
                                            if (_GLF_DEAD(false)) {
                                                float donor_replacementGLF_dead25slope = _GLF_FUZZED(fwidthCoarse(donor_replacementGLF_dead14s));
                                                while (donor_replacementGLF_dead14s < donor_replacementGLF_dead14ref && GLF_live8i < 32) {
                                                    GLF_live8coord -= GLF_live8coord;
                                                    donor_replacementGLF_dead14ref += donor_replacementGLF_dead25slope;
                                                    donor_replacementGLF_dead14s = texture(GLF_dead25tex, GLF_live8coord).y;
                                                    GLF_live8i++;
                                                }
                                            }
                                            ;
                                        }
                                    }
                                    ;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(163974u);
                                    for (int GLF_dead29rows = 2; GLF_dead29rows <= 4; GLF_dead29rows++) {
                                        for (int GLF_dead29c = 0; GLF_dead29c < donor_replacementGLF_dead1i; GLF_dead29c++) {
                                            for (int GLF_dead29r = 0; GLF_dead29r < GLF_dead29rows; GLF_dead29r++) {
                                                switch (donor_replacementGLF_dead29matrix_number) {
                                                    case 0u:
                                                        GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                        break;
                                                    case 1u:
                                                        GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                        break;
                                                    case 2u:
                                                        GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                        break;
                                                    case 3u:
                                                        GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                        break;
                                                    case 4u:
                                                        GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                        break;
                                                    case 5u:
                                                        GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                        break;
                                                    case 6u:
                                                        GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                        break;
                                                    case 7u:
                                                        GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                        break;
                                                    case 8u:
                                                        GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                        break;
                                                }
                                            }
                                        }
                                        donor_replacementGLF_dead29matrix_number = donor_replacementGLF_dead29matrix_number + 1u;
                                    }
                                }
                            }
                        }
                    }
                    GLF_live8looplimiter0++;
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(ivec2(-46803, -73432));
                        if (donor_replacementGLF_dead24p.x < 0) {
                            donor_replacementGLF_dead24p.y++;
                        }
                    }
                    {
                        GLF_live8coord = GLF_live8texel.xz + GLF_live8texel.yy;
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead30v = _GLF_FUZZED(int(false));
                            {
                                donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                            }
                        }
                        GLF_live8coord = floor(GLF_live8coord * 256.0) / 256.0;
                        GLF_live8texel = texture(GLF_live8tex, GLF_live8coord);
                        GLF_live8i++;
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(lin);
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead30i = _GLF_FUZZED(-7683);
                        for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < GLF_live8i; donor_replacementGLF_dead30i++) {
                            GLF_dead27MATRIX_N = (4 * GLF_dead27MATRIX_N * (1000 - GLF_dead27MATRIX_N)) / 1000;
                        }
                    }
                    {
                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-954.121, 9312.0375));
                        int GLF_live22i = _GLF_FUZZED((~(-10266)));
                        {
                            if (GLF_live22coord.x > 1.0)
                                GLF_live22coord.x -= 1.0;
                            if (GLF_live22coord.y > 1.0) {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead27b = _GLF_FUZZED(GLF_live8looplimiter0);
                                    vec4 donor_replacementGLF_dead27matrix_b = _GLF_FUZZED(GLF_live23_GLF_color);
                                    {
                                        donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27b, 4)] = donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27b, 4)] - (donor_replacementGLF_dead1uvstep * GLF_live8texel[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27b, 4)]);
                                    }
                                }
                                GLF_live22coord.y -= 1.0;
                            }
                            GLF_live22coord *= 2.0;
                            GLF_live22i++;
                        }
                    }
                    {
                        GLF_live8texel += texture(GLF_dead15tex, donor_replacementGLF_dead15coord + vec2(float(v - 1) * donor_replacementGLF_dead1uvstep, float(v - 1) * donor_replacementGLF_dead1uvstep)) * GLF_dead15weights[_GLF_MAKE_IN_BOUNDS_INT(v * 3 + v, 9)];
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                int donor_replacementGLF_dead14i = _GLF_FUZZED(clamp(v, v, donor_replacementGLF_dead1i));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(ivec2(83173, 1373));
                    while (donor_replacementGLF_dead24p.x > 15) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            int donor_replacementGLF_dead30v = _GLF_FUZZED(bitCount((129735u | 7930u)));
                            for (donor_replacementGLF_dead14i = 0; donor_replacementGLF_dead14i < GLF_dead27MATRIX_N; donor_replacementGLF_dead14i++) {
                                donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                            }
                        }
                        donor_replacementGLF_dead24p.x -= 16;
                    }
                }
                float donor_replacementGLF_dead14s = _GLF_FUZZED(length(vec3(146.489, -5.5, -0.4)));
                {
                    int GLF_live20looplimiter0 = 0;
                    if (GLF_live20looplimiter0 >= 5) {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead29cols = _GLF_FUZZED(ivec2(-31887, -13119).r);
                            uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(41330u);
                            for (int GLF_dead29rows = 2; GLF_dead29rows <= 4; GLF_dead29rows++) {
                                for (int GLF_dead29c = 0; GLF_dead29c < donor_replacementGLF_dead29cols; GLF_dead29c++) {
                                    for (int GLF_dead29r = 0; GLF_dead29r < GLF_dead29rows; GLF_dead29r++) {
                                        switch (donor_replacementGLF_dead29matrix_number) {
                                            case 0u:
                                                GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                break;
                                            case 1u:
                                                GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                break;
                                            case 2u:
                                                GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                break;
                                            case 3u:
                                                GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                break;
                                            case 4u:
                                                GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                break;
                                            case 5u:
                                                GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                break;
                                            case 6u:
                                                GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                break;
                                            case 7u:
                                                GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                break;
                                            case 8u:
                                                GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                break;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead29matrix_number = donor_replacementGLF_dead29matrix_number + 1u;
                            }
                        }
                        ;
                    }
                }
                if (mod(float(donor_replacementGLF_dead14i), donor_replacementGLF_dead1uvstep) <= 0.01) {
                    donor_replacementGLF_dead14s += 0.2;
                }
            }
            for (int GLF_dead1j = 0; GLF_dead1j < 3; GLF_dead1j++) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    float donor_replacementGLF_dead14limit = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                    float donor_replacementGLF_dead14ref = _GLF_FUZZED(-0.7);
                    {
                        ivec2 GLF_live21pos = _GLF_FUZZED(ivec2(38740, -78373));
                        {
                            if (GLF_live21pos.x < GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] + 15 && GLF_live21pos.x > GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] - 15) {
                                float GLF_live21p = (15.0 - abs(float(GLF_live21pos.x - GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)]))) / 15.0;
                                ;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead30iters = _GLF_FUZZED(v);
                                for (donor_replacementGLF_dead1i = 0; donor_replacementGLF_dead1i < donor_replacementGLF_dead30iters; donor_replacementGLF_dead1i++) {
                                    GLF_dead1j = (4 * GLF_dead1j * (1000 - GLF_dead1j)) / 1000;
                                }
                            }
                            GLF_live21pos.y++;
                        }
                    }
                    float donor_replacementGLF_dead14s = _GLF_FUZZED((-mix(66.43, donor_replacementGLF_dead1uvstep, -8742.1545)));
                    for (int GLF_dead14i = 1; GLF_dead14i < 800; GLF_dead14i++) {
                        {
                            {
                                ;
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead30iters = _GLF_FUZZED(v);
                                for (GLF_dead14i = 0; GLF_dead14i < donor_replacementGLF_dead30iters; GLF_dead14i++) {
                                    v = (4 * v * (1000 - v)) / 1000;
                                }
                            }
                        }
                        if (mod(float(GLF_dead14i), donor_replacementGLF_dead14ref) <= 0.01) {
                            donor_replacementGLF_dead14s += 0.2;
                        }
                        if (float(GLF_dead14i) >= donor_replacementGLF_dead14limit) {
                            ;
                        }
                        {
                            {
                                ;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(lin);
                        vec4 donor_replacementGLF_dead26res = _GLF_FUZZED(sin(vec4(49.93, -25.51, -5.9, 609.632)));
                        if (donor_replacementGLF_dead26coord.x < 1.0 && donor_replacementGLF_dead26coord.y < 1.0) {
                            donor_replacementGLF_dead26res = texture(GLF_dead26tex, donor_replacementGLF_dead26coord);
                        }
                    }
                }
                _GLF_color += texture(GLF_dead1tex, donor_replacementGLF_dead1coord + vec2(float(donor_replacementGLF_dead1i - 1) * donor_replacementGLF_dead1uvstep, float(GLF_dead1j - 1) * donor_replacementGLF_dead1uvstep)) * GLF_dead1weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i * 3 + GLF_dead1j, 9)];
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                int donor_replacementGLF_dead28count = _GLF_FUZZED(GLF_dead27MATRIX_N);
                int donor_replacementGLF_dead28v = _GLF_FUZZED(v);
                while (donor_replacementGLF_dead28v > 1) {
                    if ((donor_replacementGLF_dead28v & 1) == 1) {
                        donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                    } else {
                        donor_replacementGLF_dead28v /= 2;
                    }
                    donor_replacementGLF_dead28count++;
                }
            }
        }
        {
            if (_GLF_DEAD(false)) {
                {
                    ;
                }
            }
            vec2 GLF_live11coord = _GLF_FUZZED(vec2(vec3(10.58, -6.0, -6.3)));
            if (_GLF_DEAD(false)) {
                while (GLF_dead27MATRIX_N > 1) {
                    if ((GLF_dead27MATRIX_N & 1) == 1) {
                        GLF_dead27MATRIX_N = 3 * GLF_dead27MATRIX_N + 1;
                    } else {
                        GLF_dead27MATRIX_N /= 2;
                    }
                    GLF_dead27MATRIX_N++;
                }
            }
            float GLF_live11h = _GLF_FUZZED(1.0);
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead14s = _GLF_FUZZED(dFdx(GLF_live11h));
                {
                    ;
                }
            }
            {
                int GLF_live18baseIndex = _GLF_FUZZED(int(38654u));
                {
                    GLF_live18baseIndex = GLF_live18tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18baseIndex, 10)].rightIndex;
                    ;
                }
            }
            int GLF_live11i = _GLF_FUZZED((ivec2(-73453, -46384) * ivec2(81947, -130)).y);
            int GLF_live11looplimiter0 = 0;
            float GLF_live11refh = _GLF_FUZZED((5570.6059 - (-245.258)));
            float GLF_live11slope = _GLF_FUZZED(-89.97);
            {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead29c = _GLF_FUZZED((21640 + GLF_dead27MATRIX_N));
                    uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(30920u);
                    int donor_replacementGLF_dead29r = _GLF_FUZZED(donor_replacementGLF_dead1i);
                    {
                        switch (donor_replacementGLF_dead29matrix_number) {
                            case 0u:
                                GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 2)] = GLF_dead29one;
                                break;
                            case 1u:
                                GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 3)] = GLF_dead29one;
                                break;
                            case 2u:
                                GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 4)] = GLF_dead29one;
                                break;
                            case 3u:
                                GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 2)] = GLF_dead29one;
                                break;
                            case 4u:
                                GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 3)] = GLF_dead29one;
                                break;
                            case 5u:
                                GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 4)] = GLF_dead29one;
                                break;
                            case 6u:
                                GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 2)] = GLF_dead29one;
                                break;
                            case 7u:
                                GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 3)] = GLF_dead29one;
                                break;
                            case 8u:
                                GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead29r, 4)] = GLF_dead29one;
                                break;
                        }
                    }
                }
                int GLF_live21looplimiter0 = 0;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead30i = _GLF_FUZZED(((-6564) / donor_replacementGLF_dead1i));
                    int donor_replacementGLF_dead30v = _GLF_FUZZED(((-84519) * GLF_dead27MATRIX_N));
                    for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < v; donor_replacementGLF_dead30i++) {
                        donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                    }
                }
                ivec2 GLF_live21pos = _GLF_FUZZED((ivec2(-78850, -13472) + 72339));
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        while (v > 1) {
                            if ((v & 1) == 1) {
                                v = 3 * v + 1;
                            } else {
                                v /= 2;
                            }
                            donor_replacementGLF_dead1i++;
                        }
                    }
                    ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(ivec2(97990, 26264));
                    if (donor_replacementGLF_dead24p.x > 0) {
                        donor_replacementGLF_dead24p.y--;
                    }
                }
                {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead30i = _GLF_FUZZED(v);
                        int donor_replacementGLF_dead30iters = _GLF_FUZZED(GLF_live11looplimiter0);
                        for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < donor_replacementGLF_dead30iters; donor_replacementGLF_dead30i++) {
                            GLF_dead27MATRIX_N = (4 * GLF_dead27MATRIX_N * (1000 - GLF_dead27MATRIX_N)) / 1000;
                        }
                    }
                    if (GLF_live21looplimiter0 >= 7) {
                        ;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(GLF_live21pos);
                            {
                                donor_replacementGLF_dead24p = GLF_dead24iter(donor_replacementGLF_dead24p);
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead30i = _GLF_FUZZED(GLF_live21looplimiter0);
                        int donor_replacementGLF_dead30iters = _GLF_FUZZED(GLF_live11looplimiter0);
                        for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < donor_replacementGLF_dead30iters; donor_replacementGLF_dead30i++) {
                            v = (4 * v * (1000 - v)) / 1000;
                        }
                    }
                    GLF_live21looplimiter0++;
                    {
                        if (GLF_live21pos.x < GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] + 15 && GLF_live21pos.x > GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)] - 15) {
                            float GLF_live21p = (15.0 - abs(float(GLF_live21pos.x - GLF_live21dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21pos.y, 256)]))) / 15.0;
                            ;
                        }
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED((ivec2(-70825, -93139) % ivec2(10174)));
                            {
                                donor_replacementGLF_dead24p.x -= 16;
                            }
                        }
                        GLF_live21pos.y++;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        int donor_replacementGLF_dead28v = _GLF_FUZZED(int(120113u));
                        while (donor_replacementGLF_dead28v > 1) {
                            if ((donor_replacementGLF_dead28v & 1) == 1) {
                                donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                            } else {
                                donor_replacementGLF_dead28v /= 2;
                            }
                            donor_replacementGLF_dead1i++;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED(((uvec2(128984u, 71518u)[1] ^ 115087u) & 193320u));
                        for (int GLF_dead29cols = 2; GLF_dead29cols <= 4; GLF_dead29cols++) {
                            for (int GLF_dead29rows = 2; GLF_dead29rows <= 4; GLF_dead29rows++) {
                                for (int GLF_dead29c = 0; GLF_dead29c < GLF_dead29cols; GLF_dead29c++) {
                                    for (int GLF_dead29r = 0; GLF_dead29r < GLF_dead29rows; GLF_dead29r++) {
                                        switch (donor_replacementGLF_dead29matrix_number) {
                                            case 0u:
                                                GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                break;
                                            case 1u:
                                                GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                break;
                                            case 2u:
                                                GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                break;
                                            case 3u:
                                                GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                break;
                                            case 4u:
                                                GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                break;
                                            case 5u:
                                                GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                break;
                                            case 6u:
                                                GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                break;
                                            case 7u:
                                                GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                break;
                                            case 8u:
                                                GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                break;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead29matrix_number = donor_replacementGLF_dead29matrix_number + 1u;
                            }
                        }
                    }
                    {
                        vec2 GLF_live22coord = _GLF_FUZZED((vec2(5.6, 235.254) + (vec2(6.4, -7.5) + vec2(1.9, -437.718))));
                        vec4 GLF_live22res = _GLF_FUZZED(vec4(19.42, 917.992, -397.238, -0.7));
                        {
                            GLF_live22res = texture(GLF_live22tex, GLF_live22coord);
                        }
                    }
                    donor_replacementGLF_dead1uvstep = -donor_replacementGLF_dead1uvstep;
                }
            }
            vec2 GLF_live11uvstep = _GLF_FUZZED((vec2(7.2, -855.707) * (-83.23)));
            while (GLF_live11h < GLF_live11refh && GLF_live11i < 32) {
                if (GLF_live11looplimiter0 >= 5) {
                    break;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(dFdyCoarse(resolution));
                        int donor_replacementGLF_dead25i = _GLF_FUZZED(donor_replacementGLF_dead1i);
                        {
                            donor_replacementGLF_dead25coord -= lin;
                            GLF_live11slope += GLF_live11slope;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead30i = _GLF_FUZZED(v);
                                int donor_replacementGLF_dead30iters = _GLF_FUZZED(bitfieldExtract((GLF_live11i), sign(((-306) & GLF_dead27MATRIX_N)), floatBitsToInt(GLF_live11slope)));
                                int donor_replacementGLF_dead30v = _GLF_FUZZED(donor_replacementGLF_dead1i);
                                for (donor_replacementGLF_dead30i = 0; donor_replacementGLF_dead30i < donor_replacementGLF_dead30iters; donor_replacementGLF_dead30i++) {
                                    donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                                }
                            }
                            GLF_live11refh = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                            donor_replacementGLF_dead25i++;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead30v = _GLF_FUZZED(23997);
                    {
                        donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                    }
                }
                {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead28count = _GLF_FUZZED(mix((-(-13441)), v, true));
                        {
                            if ((donor_replacementGLF_dead1i & 1) == 1) {
                                donor_replacementGLF_dead1i = 3 * donor_replacementGLF_dead1i + 1;
                            } else {
                                donor_replacementGLF_dead1i /= 2;
                            }
                            donor_replacementGLF_dead28count++;
                        }
                    }
                    {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    float donor_replacementGLF_dead25h = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                    float donor_replacementGLF_dead25refh = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                    float donor_replacementGLF_dead25slope = _GLF_FUZZED(GLF_live11h);
                    vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(intBitsToFloat(ivec2(42604, -75844)));
                    {
                        lin -= donor_replacementGLF_dead25uvstep;
                        donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                        donor_replacementGLF_dead25h = texture(GLF_dead25tex, lin).y;
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead28count = _GLF_FUZZED(donor_replacementGLF_dead1i);
                            while (donor_replacementGLF_dead1i > 1) {
                                if ((donor_replacementGLF_dead1i & 1) == 1) {
                                    donor_replacementGLF_dead1i = 3 * donor_replacementGLF_dead1i + 1;
                                } else {
                                    donor_replacementGLF_dead1i /= 2;
                                }
                                donor_replacementGLF_dead28count++;
                            }
                        }
                        donor_replacementGLF_dead1i++;
                    }
                }
                GLF_live11looplimiter0++;
                {
                    GLF_live11coord -= GLF_live11uvstep;
                    {
                        int GLF_live23baseIndex = _GLF_FUZZED(ivec4(-71815, 7128, -73151, -25307).r);
                        int GLF_live23data = _GLF_FUZZED(55789);
                        int GLF_live23treeIndex = _GLF_FUZZED(58047);
                        {
                            int GLF_live23looplimiter0 = 0;
                            while (GLF_live23baseIndex <= GLF_live23treeIndex) {
                                if (GLF_live23looplimiter0 >= 7) {
                                    break;
                                }
                                GLF_live23looplimiter0++;
                                {
                                    if (GLF_live23data <= GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].data) {
                                        if (GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex == -1) {
                                            if (_GLF_DEAD(false)) {
                                                float donor_replacementGLF_dead25h = _GLF_FUZZED((-trunc(GLF_live11h)));
                                                float donor_replacementGLF_dead25refh = _GLF_FUZZED(float(mix(packSnorm4x8(_GLF_color), 29502u, true)));
                                                vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(log(donor_replacementGLF_dead1coord));
                                                while (donor_replacementGLF_dead25h < donor_replacementGLF_dead25refh && v < 32) {
                                                    donor_replacementGLF_dead1coord -= donor_replacementGLF_dead25uvstep;
                                                    donor_replacementGLF_dead25refh += GLF_live11slope;
                                                    donor_replacementGLF_dead25h = texture(GLF_dead25tex, donor_replacementGLF_dead1coord).y;
                                                    v++;
                                                }
                                            }
                                            GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex = GLF_live23treeIndex;
                                            GLF_live23makeTreeNode(GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23treeIndex, 10)], GLF_live23data);
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, 0.0)))))) {
                                                    if ((GLF_live11i & 1) == 1) {
                                                        GLF_live11i = 3 * GLF_live11i + 1;
                                                    } else {
                                                        GLF_live11i /= 2;
                                                    }
                                                }
                                                {
                                                    if (donor_replacementGLF_dead1coord.x > 1.0)
                                                        donor_replacementGLF_dead1coord.x -= 1.0;
                                                    if (donor_replacementGLF_dead1coord.y > 1.0)
                                                        donor_replacementGLF_dead1coord.y -= 1.0;
                                                    donor_replacementGLF_dead1coord *= 2.0;
                                                    donor_replacementGLF_dead1i++;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                            ;
                                        } else {
                                            GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex;
                                            continue;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead28v = _GLF_FUZZED(GLF_live11i);
                                            while (donor_replacementGLF_dead28v > 1) {
                                                if ((donor_replacementGLF_dead28v & 1) == 1) {
                                                    donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                                                } else {
                                                    donor_replacementGLF_dead28v /= 2;
                                                }
                                                GLF_live11looplimiter0++;
                                            }
                                        }
                                    } else {
                                        if (GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex == -1) {
                                            GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex = GLF_live23treeIndex;
                                            GLF_live23makeTreeNode(GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23treeIndex, 10)], GLF_live23data);
                                            ;
                                        } else {
                                            GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex;
                                            continue;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        float donor_replacementGLF_dead31yCoord = _GLF_FUZZED(degrees(max(sin(donor_replacementGLF_dead1uvstep), GLF_live11refh)));
                                        {
                                            ;
                                        }
                                    }
                                    vec2 donor_replacementGLF_dead25coord = _GLF_FUZZED(GLF_live11uvstep);
                                    float donor_replacementGLF_dead25refh = _GLF_FUZZED(dFdyCoarse(GLF_live11refh));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        int donor_replacementGLF_dead30v = _GLF_FUZZED(GLF_live23treeIndex);
                                        {
                                            donor_replacementGLF_dead30v = (4 * donor_replacementGLF_dead30v * (1000 - donor_replacementGLF_dead30v)) / 1000;
                                        }
                                    }
                                    float donor_replacementGLF_dead25slope = _GLF_FUZZED(dFdy(GLF_live11refh));
                                    vec2 donor_replacementGLF_dead25uvstep = _GLF_FUZZED(tan(lin));
                                    while (GLF_live11slope < donor_replacementGLF_dead25refh && v < 32) {
                                        donor_replacementGLF_dead25coord -= donor_replacementGLF_dead25uvstep;
                                        donor_replacementGLF_dead25refh += donor_replacementGLF_dead25slope;
                                        GLF_live11slope = texture(GLF_dead25tex, donor_replacementGLF_dead25coord).y;
                                        v++;
                                    }
                                }
                            }
                        }
                    }
                    GLF_live11refh += GLF_live11slope;
                    GLF_live11h = texture(GLF_live11tex, GLF_live11coord).y;
                    {
                        int GLF_live18looplimiter1 = 0;
                        if (GLF_live18looplimiter1 >= 6) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                float donor_replacementGLF_dead31x = _GLF_FUZZED(donor_replacementGLF_dead1uvstep);
                                float donor_replacementGLF_dead31y = _GLF_FUZZED(GLF_live11refh);
                                if (donor_replacementGLF_dead31x * donor_replacementGLF_dead31x + donor_replacementGLF_dead31y * donor_replacementGLF_dead31y > 4.0) {
                                    break;
                                }
                            }
                            ;
                        }
                    }
                    GLF_live11i++;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(donor_replacementGLF_dead1coord);
                        vec4 donor_replacementGLF_dead15res = _GLF_FUZZED(vec4(-555.150, -3.5, 729.512, -411.752));
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead24p = _GLF_FUZZED(ivec2(65624, -45161));
                            if (donor_replacementGLF_dead24p.x > 0) {
                                if (_GLF_DEAD(false)) {
                                    uint donor_replacementGLF_dead29matrix_number = _GLF_FUZZED((156989u / 107981u));
                                    for (int GLF_dead29cols = 2; GLF_dead29cols <= 4; GLF_dead29cols++) {
                                        for (int GLF_dead29rows = 2; GLF_dead29rows <= 4; GLF_dead29rows++) {
                                            for (int GLF_dead29c = 0; GLF_dead29c < GLF_dead29cols; GLF_dead29c++) {
                                                for (int GLF_dead29r = 0; GLF_dead29r < GLF_dead29rows; GLF_dead29r++) {
                                                    switch (donor_replacementGLF_dead29matrix_number) {
                                                        case 0u:
                                                            GLF_dead29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                            break;
                                                        case 1u:
                                                            GLF_dead29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                            break;
                                                        case 2u:
                                                            GLF_dead29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                            break;
                                                        case 3u:
                                                            GLF_dead29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                            break;
                                                        case 4u:
                                                            GLF_dead29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                            break;
                                                        case 5u:
                                                            GLF_dead29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                            break;
                                                        case 6u:
                                                            GLF_dead29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 2)] = GLF_dead29one;
                                                            break;
                                                        case 7u:
                                                            GLF_dead29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 3)] = GLF_dead29one;
                                                            break;
                                                        case 8u:
                                                            GLF_dead29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead29r, 4)] = GLF_dead29one;
                                                            break;
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead29matrix_number = donor_replacementGLF_dead29matrix_number + 1u;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead24p.y--;
                            }
                        }
                        for (int GLF_dead15j = 0; GLF_dead15j < 3; GLF_dead15j++) {
                            donor_replacementGLF_dead15res += texture(GLF_dead15tex, donor_replacementGLF_dead15coord + vec2(float(v - 1) * GLF_live11h, float(GLF_dead15j - 1) * GLF_live11h)) * GLF_dead15weights[_GLF_MAKE_IN_BOUNDS_INT(v * 3 + GLF_dead15j, 9)];
                        }
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead27alpha1 = _GLF_FUZZED(-275.914);
        float donor_replacementGLF_dead27alpha2 = _GLF_FUZZED(dFdx(745.961));
        float donor_replacementGLF_dead27alpha3 = _GLF_FUZZED(float(77269u));
        float donor_replacementGLF_dead27beta = _GLF_FUZZED(abs(-3.4));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead28count = _GLF_FUZZED((mat4(-733.717, 943.236, -5272.3257, 6.7, 1.7, 750.275, -4.4, -3.1, -6.6, -9.3, -624.177, 792.786, -71.67, -53.23, 762.139, 0.2), GLF_dead27MATRIX_N));
            int donor_replacementGLF_dead28v = _GLF_FUZZED(v);
            {
                if ((donor_replacementGLF_dead28v & 1) == 1) {
                    donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                } else {
                    donor_replacementGLF_dead28v /= 2;
                }
                donor_replacementGLF_dead28count++;
            }
        }
        int donor_replacementGLF_dead27k = _GLF_FUZZED(int(false));
        float donor_replacementGLF_dead27magnitudeX = _GLF_FUZZED(cosh(-3.5));
        mat4 donor_replacementGLF_dead27matrix_a = _GLF_FUZZED(mat4(716.596, -28.69, -6.0, 4.1, 7.3, 91.91, -68.02, -4654.1093, 4.7, -16.30, -478.742, -6.5, -915.830, -4.4, -96.40, 59.07));
        vec4 donor_replacementGLF_dead27matrix_b = _GLF_FUZZED(atan(GLF_live23_GLF_color, (false ? GLF_live23_GLF_color : _GLF_color)));
        vec4 donor_replacementGLF_dead27matrix_u = _GLF_FUZZED(vec4(71.31, -3184.0594, 8152.6461, -333.797));
        {
            for (int GLF_dead27x = GLF_dead27MATRIX_N - 1; GLF_dead27x >= donor_replacementGLF_dead27k; GLF_dead27x--) {
                donor_replacementGLF_dead27magnitudeX += pow(donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27k, 4)], 2.0);
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead28v = _GLF_FUZZED(donor_replacementGLF_dead27k);
                    {
                        if ((donor_replacementGLF_dead28v & 1) == 1) {
                            donor_replacementGLF_dead28v = 3 * donor_replacementGLF_dead28v + 1;
                        } else {
                            donor_replacementGLF_dead28v /= 2;
                        }
                        v++;
                    }
                }
                donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27x, 4)] = donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27k, 4)];
            }
            donor_replacementGLF_dead27magnitudeX = sqrt(donor_replacementGLF_dead27magnitudeX);
            donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27k, 4)] -= (sign(donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27k, 4)]) * donor_replacementGLF_dead27magnitudeX);
            for (int GLF_dead27u = GLF_dead27MATRIX_N - 1; GLF_dead27u >= donor_replacementGLF_dead27k; GLF_dead27u--) {
                donor_replacementGLF_dead27alpha1 += pow(donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27u, 4)], 2.0);
            }
            donor_replacementGLF_dead27alpha2 = 2.0 / donor_replacementGLF_dead27alpha1;
            for (int GLF_dead27j = donor_replacementGLF_dead27k; GLF_dead27j < GLF_dead27MATRIX_N; GLF_dead27j++) {
                for (int GLF_dead27a = GLF_dead27MATRIX_N - 1; GLF_dead27a >= donor_replacementGLF_dead27k; GLF_dead27a--) {
                    donor_replacementGLF_dead27alpha3 += donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)] * donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)];
                }
                donor_replacementGLF_dead27beta = donor_replacementGLF_dead27alpha2 * donor_replacementGLF_dead27alpha3;
                for (int GLF_dead27a = GLF_dead27MATRIX_N - 1; GLF_dead27a >= donor_replacementGLF_dead27k; GLF_dead27a--) {
                    donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)] = donor_replacementGLF_dead27matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 4)] - (donor_replacementGLF_dead27beta * donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27a, 4)]);
                }
                donor_replacementGLF_dead27alpha3 = 0.0;
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead31x = _GLF_FUZZED(dFdyCoarse(7912.9825));
                    if (donor_replacementGLF_dead31x * donor_replacementGLF_dead31x + donor_replacementGLF_dead27alpha2 * donor_replacementGLF_dead27alpha2 > 4.0) {
                        break;
                    }
                }
                donor_replacementGLF_dead27beta = 0.0;
            }
            for (int GLF_dead27b = GLF_dead27MATRIX_N - 1; GLF_dead27b >= donor_replacementGLF_dead27k; GLF_dead27b--) {
                donor_replacementGLF_dead27alpha3 += donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)] * donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)];
            }
            donor_replacementGLF_dead27beta = donor_replacementGLF_dead27alpha2 * donor_replacementGLF_dead27alpha3;
            for (int GLF_dead27b = GLF_dead27MATRIX_N - 1; GLF_dead27b >= donor_replacementGLF_dead27k; GLF_dead27b--) {
                donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)] = donor_replacementGLF_dead27matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)] - (donor_replacementGLF_dead27beta * donor_replacementGLF_dead27matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27b, 4)]);
            }
            donor_replacementGLF_dead27magnitudeX = 0.0;
            donor_replacementGLF_dead27alpha1 = 0.0;
            donor_replacementGLF_dead27alpha2 = 0.0;
            donor_replacementGLF_dead27alpha3 = 0.0;
            donor_replacementGLF_dead27beta = 0.0;
        }
    }
    _GLF_color = pal[collatz(v) % 16];
}
