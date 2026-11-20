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
    float GLF_live39one;
};

mat2 GLF_live39m22 = _GLF_FUZZED(mat2(-7.0, -2.0, -8.3, 7.7));
mat2x3 GLF_live39m23 = _GLF_FUZZED(mat2x3(7.4));
mat2x4 GLF_live39m24 = _GLF_FUZZED(mat2x4(535.674, 8770.8913, -76.22, 5.2, -801.422, 1.8, -6544.9963, -2.6));
mat3x2 GLF_live39m32 = _GLF_FUZZED(mat3x2(-3.0, -9911.6814, -9.8, 32.61, -211.621, 621.205));
mat3 GLF_live39m33 = _GLF_FUZZED((691.230 + mat3(7.6, 3180.5226, -53.82, 70.76, 2493.7197, 7.8, 991.925, -632.315, 959.866)));
mat3x4 GLF_live39m34 = _GLF_FUZZED(mat3x4(mat2x3(-4172.8954)));
mat4x2 GLF_live39m42 = _GLF_FUZZED((-mat4x2(4.1, -4377.0721, 7.7, 504.133, 762.954, 6.0, 79.72, 27.91)));
mat4x3 GLF_live39m43 = _GLF_FUZZED(mat4x3(19.80, -4.4, 3143.5799, 58.95, -128.976, 7.8, -52.89, -2349.8496, -4.5, 4.6, -9616.4055, -22.25));
mat4 GLF_live39m44 = _GLF_FUZZED(mat4(4167.0356, -8068.2104, -22.71, 7.0, -93.23, 45.09, -827.875, 8.1, 2036.6230, 4274.6995, 0.5, -16.04, -752.410, 15.06, 821.476, -4.1));
vec4 GLF_live40_GLF_color = _GLF_FUZZED(((-35.29) - ((false ? vec4(-383.901, 2.6, -73.30, 3.2) : vec4(-1.7, -94.38, -9741.3920, -296.243)) + vec4(-289.620, 911.650, -6038.8889, -7832.8776))));

layout(set = 0, binding = 2) uniform buf2 {
    vec3 GLF_live40polynomial;
};

float GLF_live40fx(float GLF_live40x) {
    return GLF_live40polynomial.x * pow(GLF_live40x, 2.0) + GLF_live40polynomial.y * GLF_live40x + GLF_live40polynomial.z;
}

ivec2 GLF_live38iter(ivec2 GLF_live38p) {
    if (GLF_live38p.x > 0) {
        GLF_live38p.y--;
    }
    if (GLF_live38p.x < 0) {
        GLF_live38p.y++;
    }
    GLF_live38p.x += GLF_live38p.y / 2;
    return GLF_live38p;
}

layout(set = 0, binding = 3) uniform sampler2D GLF_live37tex;
const float GLF_live37weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_live36injectionSwitch;
};

struct GLF_live36QuicksortObject {
    int numbers[10];
};

GLF_live36QuicksortObject GLF_live36obj = GLF_live36QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_live36swap(int GLF_live36i, int GLF_live36j) {
    int GLF_live36temp = GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live36i, 10)];
    GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live36i, 10)] = GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live36j, 10)];
    GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live36j, 10)] = GLF_live36temp;
}

vec3 GLF_live36palette(vec3 GLF_live36a, vec3 GLF_live36b, vec3 GLF_live36c, vec3 GLF_live36d) {
    return fract(mix(GLF_live36d * GLF_live36a, GLF_live36a * GLF_live36c, GLF_live36b + GLF_live36d - GLF_live36c));
}

layout(set = 0, binding = 5) uniform sampler2D GLF_live35tex;

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_live30injectionSwitch;
};

struct GLF_live29BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live29BST GLF_live29tree[10] = GLF_live29BST[10](GLF_live29BST(0, 0, 0), GLF_live29BST(0, 0, 0), GLF_live29BST(0, 0, 0), GLF_live29BST(0, 0, 0), GLF_live29BST(0, 0, 0), GLF_live29BST(0, 0, 0), GLF_live29BST(0, 0, 0), GLF_live29BST(0, 0, 0), GLF_live29BST(0, 0, 0), GLF_live29BST(0, 0, 0));

void GLF_live29makeTreeNode(inout GLF_live29BST GLF_live29tree, int GLF_live29data) {
    GLF_live29tree.data = GLF_live29data;
    GLF_live29tree.leftIndex = -1;
    GLF_live29tree.rightIndex = -1;
}

int GLF_live29search(int GLF_live29target) {
    GLF_live29BST GLF_live29currentNode = GLF_live29BST(0, 0, 0);
    int GLF_live29index = 0;
    {
        int GLF_live29looplimiter1 = 0;
        while (GLF_live29index != -1) {
            if (GLF_live29looplimiter1 >= 4) {
                break;
            }
            GLF_live29looplimiter1++;
            {
                GLF_live29currentNode = GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29index, 10)];
                if (GLF_live29currentNode.data == GLF_live29target) {
                    return GLF_live29target;
                }
                GLF_live29index = GLF_live29target > GLF_live29currentNode.data ? GLF_live29currentNode.rightIndex : GLF_live29currentNode.leftIndex;
            }
        }
    }
    return -1;
}

layout(set = 0, binding = 7) uniform buf7 {
    float GLF_live31time;
};

float GLF_live31h_r = _GLF_FUZZED(float(false));
float GLF_live31s_g = _GLF_FUZZED(5341.9575);
float GLF_live31b_b = _GLF_FUZZED(((vec2(-967.202, 351.399) == vec2(5331.8363, 57.25)) ? 8716.8824 : 192.739));

void GLF_live31doConvert() {
    vec3 GLF_live31temp = _GLF_FUZZED(vec3(4306.2424, -5.1, -92.78));
    GLF_live31temp = GLF_live31b_b * (1.0 - GLF_live31s_g) + (GLF_live31b_b - GLF_live31b_b * (1.0 - GLF_live31s_g)) * clamp(abs(abs(6.0 * (GLF_live31h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
    GLF_live31h_r = GLF_live31temp.x;
    GLF_live31s_g = GLF_live31temp.y;
    GLF_live31b_b = GLF_live31temp.z;
}

vec3 GLF_live31computeColor(float GLF_live31c, vec2 GLF_live31position) {
    GLF_live31h_r = fract(GLF_live31c);
    GLF_live31s_g = 1.0;
    GLF_live31b_b = (0.5 + (sin(GLF_live31time) * 0.5 + 0.5));
    GLF_live31doConvert();
    GLF_live31s_g *= 1.0 / GLF_live31position.y;
    GLF_live31h_r *= 1.0 / GLF_live31position.x;
    if (abs(GLF_live31position.y - GLF_live31position.x) < 0.5) {
        GLF_live31b_b = clamp(0.0, 1.0, GLF_live31b_b * 3.0);
    }
    return vec3(GLF_live31h_r, GLF_live31s_g, GLF_live31b_b);
}

vec3 GLF_live31defaultColor() {
    return vec3(0.0);
}

vec3 GLF_live31drawShape(vec2 GLF_live31pos, vec2 GLF_live31square, vec3 GLF_live31setting) {
    bool GLF_live31c1 = GLF_live31pos.x - GLF_live31setting.x < GLF_live31square.x;
    if (!GLF_live31c1) {
        return GLF_live31defaultColor();
    }
    bool GLF_live31c2 = GLF_live31pos.x + GLF_live31setting.x > GLF_live31square.x;
    if (!GLF_live31c2) {
        return GLF_live31defaultColor();
    }
    bool GLF_live31c3 = GLF_live31pos.y - GLF_live31setting.x < GLF_live31square.y;
    if (!GLF_live31c3) {
        return GLF_live31defaultColor();
    }
    bool GLF_live31c4 = GLF_live31pos.y + GLF_live31setting.x > GLF_live31square.y;
    if (!GLF_live31c4) {
        return GLF_live31defaultColor();
    }
    bool GLF_live31c5 = GLF_live31pos.x - (GLF_live31setting.x - GLF_live31setting.y) < GLF_live31square.x;
    if (!GLF_live31c5) {
        {
            int GLF_live34v = _GLF_FUZZED((false ? (-19902) : 87045));
            {
                GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
            }
        }
        return GLF_live31computeColor(GLF_live31setting.z / 40.0, GLF_live31pos);
    }
    bool GLF_live31c6 = GLF_live31pos.x + (GLF_live31setting.x - GLF_live31setting.y) > GLF_live31square.x;
    if (!GLF_live31c6) {
        return GLF_live31computeColor(GLF_live31setting.z / 40.0, GLF_live31pos);
    }
    bool GLF_live31c7 = GLF_live31pos.y - (GLF_live31setting.x - GLF_live31setting.y) < GLF_live31square.y;
    {
        {
            ;
        }
    }
    if (!GLF_live31c7) {
        return GLF_live31computeColor(GLF_live31setting.z / 40.0, GLF_live31pos);
    }
    bool GLF_live31c8 = GLF_live31pos.y + (GLF_live31setting.x - GLF_live31setting.y) > GLF_live31square.y;
    if (!GLF_live31c8) {
        return GLF_live31computeColor(GLF_live31setting.z / 40.0, GLF_live31pos);
    }
    return GLF_live31defaultColor();
}

struct GLF_live28BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live28BST GLF_live28tree[10] = GLF_live28BST[10](GLF_live28BST(0, 0, 0), GLF_live28BST(0, 0, 0), GLF_live28BST(0, 0, 0), GLF_live28BST(0, 0, 0), GLF_live28BST(0, 0, 0), GLF_live28BST(0, 0, 0), GLF_live28BST(0, 0, 0), GLF_live28BST(0, 0, 0), GLF_live28BST(0, 0, 0), GLF_live28BST(0, 0, 0));

void GLF_live28makeTreeNode(inout GLF_live28BST GLF_live28tree, int GLF_live28data) {
    GLF_live28tree.data = GLF_live28data;
    {
        int GLF_live36i = _GLF_FUZZED(59487);
        int GLF_live36looplimiter2 = 0;
        {
            if (GLF_live36looplimiter2 >= 5) {
                ;
            }
            GLF_live36looplimiter2++;
            {
                GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live36i, 10)] = (10 - GLF_live36i) * int(GLF_live36injectionSwitch.y);
            }
            {
                vec2 GLF_live37coord = _GLF_FUZZED(vec2(-305.669, -821.021));
                vec4 GLF_live37res = _GLF_FUZZED(vec4(0.0, 8.2, 3.4, 8.2));
                float GLF_live37uvstep = _GLF_FUZZED(-57.41);
                {
                    int GLF_live37looplimiter1 = 0;
                    for (int GLF_live37i = 0; GLF_live37i < 3; GLF_live37i++) {
                        if (GLF_live37looplimiter1 >= 3) {
                            break;
                        }
                        GLF_live37looplimiter1++;
                        {
                            {
                                int GLF_live37looplimiter0 = 0;
                                for (int GLF_live37j = 0; GLF_live37j < 3; GLF_live37j++) {
                                    if (GLF_live37looplimiter0 >= 3) {
                                        break;
                                    }
                                    GLF_live37looplimiter0++;
                                    {
                                        GLF_live37res += texture(GLF_live37tex, GLF_live37coord + vec2(float(GLF_live37i - 1) * GLF_live37uvstep, float(GLF_live37j - 1) * GLF_live37uvstep)) * GLF_live37weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i * 3 + GLF_live37j, 9)];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    GLF_live28tree.leftIndex = -1;
    GLF_live28tree.rightIndex = -1;
}

int GLF_live28search(int GLF_live28target) {
    GLF_live28BST GLF_live28currentNode = GLF_live28BST(0, 0, 0);
    int GLF_live28index = 0;
    {
        int GLF_live28looplimiter1 = 0;
        while (GLF_live28index != -1) {
            if (GLF_live28looplimiter1 >= 6) {
                break;
            }
            GLF_live28looplimiter1++;
            {
                GLF_live28currentNode = GLF_live28tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live28index, 10)];
                if (GLF_live28currentNode.data == GLF_live28target) {
                    return GLF_live28target;
                }
                GLF_live28index = GLF_live28target > GLF_live28currentNode.data ? GLF_live28currentNode.rightIndex : GLF_live28currentNode.leftIndex;
            }
        }
    }
    return -1;
}

layout(set = 0, binding = 8) uniform buf8 {
    float GLF_live26time;
};

layout(set = 0, binding = 9) uniform buf9 {
    vec2 GLF_live26resolution;
};

float GLF_live26h_r = _GLF_FUZZED(float(76520u));
float GLF_live26s_g = _GLF_FUZZED((-272.061));
float GLF_live26b_b = _GLF_FUZZED(-7.4);

void GLF_live26doConvert() {
    int GLF_live26msb8 = 256;
    {
        int GLF_live29target = _GLF_FUZZED(-68248);
        {
            ;
        }
    }
    vec3 GLF_live26temp = _GLF_FUZZED(vec3(-8.8, 277.527, 2501.3897));
    GLF_live26temp = GLF_live26b_b * (float(bitCount(GLF_live26msb8)) - GLF_live26s_g) + (GLF_live26b_b - GLF_live26b_b * (float(bitCount(GLF_live26msb8)) - GLF_live26s_g)) * clamp(abs(abs(6.0 * (GLF_live26h_r - vec3(bitfieldReverse(0), bitCount(GLF_live26msb8), 2) / 3.0)) - 3.0) - float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 0)), float(bitCount(int(GLF_live26resolution.x))));
    GLF_live26h_r = GLF_live26temp.x;
    GLF_live26s_g = GLF_live26temp.y;
    GLF_live26b_b = GLF_live26temp.z;
}

vec3 GLF_live26computeColor(float GLF_live26c, vec2 GLF_live26position) {
    int GLF_live26msb8 = 256;
    GLF_live26h_r = fract(GLF_live26c);
    GLF_live26s_g = float(bitCount(GLF_live26msb8));
    {
        vec3 GLF_live31d = _GLF_FUZZED(vec3(9.4, -14.45, 6.3));
        if (length(GLF_live31d) <= 0.0) {
            ;
        }
        {
            ivec2 GLF_live38p = _GLF_FUZZED(((-15093) + ivec2(35760, 70785)));
            if (GLF_live38p.x > 0) {
                GLF_live38p.y--;
            }
        }
    }
    GLF_live26b_b = (0.5 + (sin(GLF_live26time) * 0.5 + 0.5));
    GLF_live26doConvert();
    GLF_live26s_g *= float(bitCount(GLF_live26msb8)) / GLF_live26position.y;
    GLF_live26h_r *= float(bitCount(GLF_live26msb8)) / GLF_live26position.x;
    if (abs(GLF_live26position.y - GLF_live26position.x) < 0.5) {
        {
            int GLF_live29target = _GLF_FUZZED(49440);
            {
                ;
            }
        }
        GLF_live26b_b = clamp(float(bitfieldExtract(int(GLF_live26resolution.x), 0, 0)), float(bitCount(GLF_live26msb8)), GLF_live26b_b * float(bitCount(GLF_live26msb8)) * 3.0);
    }
    return vec3(GLF_live26h_r, GLF_live26s_g, GLF_live26b_b);
    {
        int GLF_live34i = _GLF_FUZZED(10500);
        int GLF_live34iters = _GLF_FUZZED(int(185659u));
        int GLF_live34looplimiter0 = 0;
        int GLF_live34v = _GLF_FUZZED((int(true) & 54668));
        for (GLF_live34i = 0; GLF_live34i < GLF_live34iters; GLF_live34i++) {
            if (GLF_live34looplimiter0 >= 6) {
                break;
            }
            GLF_live34looplimiter0++;
            {
                GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
            }
        }
    }
}

vec3 GLF_live26defaultColor() {
    return vec3(float(bitfieldExtract(int(GLF_live26resolution.y), 0, 0)));
}

vec3 GLF_live26drawShape(vec2 GLF_live26pos, vec2 GLF_live26square, vec3 GLF_live26setting) {
    {
        vec3 GLF_live36color = _GLF_FUZZED(vec3(-867.458, 677.662, -0.7));
        int GLF_live36count = _GLF_FUZZED(13500);
        int GLF_live36looplimiter4 = 0;
        {
            if (GLF_live36looplimiter4 >= 5) {
                ;
            }
            GLF_live36looplimiter4++;
            {
                GLF_live36color -= GLF_live36palette(vec3(float(GLF_live36obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live36injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live36injectionSwitch.x, float(GLF_live36obj.numbers[2]) * 0.1, float(GLF_live36obj.numbers[8]) * 0.1));
                GLF_live36count++;
            }
        }
    }
    int GLF_live26msb8 = 256;
    {
        int GLF_live39cols = _GLF_FUZZED((95124 | (-13601)));
        uint GLF_live39matrix_number = _GLF_FUZZED(((((-5.3) * mat3x4(-6.0, 1.3, 8.3, -478.039, 7.3, 9.5, -58.13, -910.380, 2.3, -0.2, -2.9, -8897.6256)) == mat3x4(7.9, 50.41, -5.6, 70.03, 8.2, 1131.9720, 4430.4685, -735.841, -957.653, -7418.7190, -39.14, 5.6)) ? 186526u : 184780u));
        int GLF_live39rows = _GLF_FUZZED(71242);
        {
            int GLF_live39looplimiter1 = 0;
            for (int GLF_live39c = 0; GLF_live39c < GLF_live39cols; GLF_live39c++) {
                if (GLF_live39looplimiter1 >= 3) {
                    break;
                }
                GLF_live39looplimiter1++;
                {
                    {
                        int GLF_live39looplimiter0 = 0;
                        for (int GLF_live39r = 0; GLF_live39r < GLF_live39rows; GLF_live39r++) {
                            if (GLF_live39looplimiter0 >= 3) {
                                break;
                            }
                            GLF_live39looplimiter0++;
                            {
                                switch (GLF_live39matrix_number) {
                                    case 0u:
                                        GLF_live39m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                        break;
                                    case 1u:
                                        GLF_live39m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                        break;
                                    case 2u:
                                        GLF_live39m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                        break;
                                    case 3u:
                                        GLF_live39m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                        break;
                                    case 4u:
                                        GLF_live39m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                        break;
                                    case 5u:
                                        GLF_live39m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                        break;
                                    case 6u:
                                        GLF_live39m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                        break;
                                    case 7u:
                                        GLF_live39m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                        break;
                                    case 8u:
                                        GLF_live39m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    bool GLF_live26c1 = GLF_live26pos.x - GLF_live26setting.x < GLF_live26square.x;
    if (!GLF_live26c1) {
        return GLF_live26defaultColor();
    }
    bool GLF_live26c2 = GLF_live26pos.x + GLF_live26setting.x > GLF_live26square.x;
    if (!GLF_live26c2) {
        return GLF_live26defaultColor();
    }
    bool GLF_live26c3 = GLF_live26pos.y - GLF_live26setting.x < GLF_live26square.y;
    if (!GLF_live26c3) {
        return GLF_live26defaultColor();
    }
    bool GLF_live26c4 = GLF_live26pos.y + GLF_live26setting.x > GLF_live26square.y;
    if (!GLF_live26c4) {
        return GLF_live26defaultColor();
    }
    bool GLF_live26c5 = GLF_live26pos.x - (GLF_live26setting.x - GLF_live26setting.y) < GLF_live26square.x;
    if (!GLF_live26c5) {
        return GLF_live26computeColor(GLF_live26setting.z / (5.0 * float(findMSB(GLF_live26msb8))), GLF_live26pos);
    }
    bool GLF_live26c6 = GLF_live26pos.x + (GLF_live26setting.x - GLF_live26setting.y) > GLF_live26square.x;
    if (!GLF_live26c6) {
        return GLF_live26computeColor(GLF_live26setting.z / (5.0 * float(findMSB(GLF_live26msb8))), GLF_live26pos);
    }
    bool GLF_live26c7 = GLF_live26pos.y - (GLF_live26setting.x - GLF_live26setting.y) < GLF_live26square.y;
    if (!GLF_live26c7) {
        return GLF_live26computeColor(GLF_live26setting.z / (5.0 * float(findMSB(GLF_live26msb8))), GLF_live26pos);
    }
    bool GLF_live26c8 = GLF_live26pos.y + (GLF_live26setting.x - GLF_live26setting.y) > GLF_live26square.y;
    if (!GLF_live26c8) {
        return GLF_live26computeColor(GLF_live26setting.z / (5.0 * float(findMSB(GLF_live26msb8))), GLF_live26pos);
    }
    {
        int GLF_live36looplimiter2 = 0;
        if (GLF_live36looplimiter2 >= 5) {
            ;
        }
    }
    return GLF_live26defaultColor();
}

layout(set = 0, binding = 10) uniform sampler2D GLF_live27tex;
const float GLF_live27weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);

layout(set = 0, binding = 11) uniform buf11 {
    vec2 GLF_live24resolution;
};

const int GLF_live23dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
layout(set = 0, binding = 12) uniform sampler2D GLF_live22tex;
vec4 GLF_live18gl_FragCoord = _GLF_FUZZED(((mat3x4(1.4, -7918.1225, -5211.8705, 2.1, -809.451, 978.347, 9691.9962, 349.604, 5.0, 4.7, 3.3, 4.4) * mat3(494.067, -514.579, 5412.3376, 59.37, 95.56, -651.271, -917.048, -1106.4950, 257.324)) * vec3(6770.3374, -1.4, -4.0)));

layout(set = 0, binding = 13) uniform buf13 {
    vec2 GLF_live18injectionSwitch;
};

const int GLF_live18N = 10;
int GLF_live18data[10] = int[10](_GLF_FUZZED(-42786), _GLF_FUZZED(16254), _GLF_FUZZED(9156), _GLF_FUZZED(98060), _GLF_FUZZED(ivec2(-32907, 19505).y), _GLF_FUZZED(int(uint(false))), _GLF_FUZZED(79490), _GLF_FUZZED(76261), _GLF_FUZZED(77096), _GLF_FUZZED(int((78767u ^ (false ? 76701u : 143418u))))), GLF_live18temp[10] = int[10](_GLF_FUZZED(98307), _GLF_FUZZED(42368), _GLF_FUZZED((99409 | 23840)), _GLF_FUZZED(-18777), _GLF_FUZZED(64958), _GLF_FUZZED((int(181930u))), _GLF_FUZZED((30114 + 83546)), _GLF_FUZZED((-46654)), _GLF_FUZZED(37456), _GLF_FUZZED(-79204));

struct GLF_live16QuicksortObject {
    int numbers[10];
};

GLF_live16QuicksortObject GLF_live16obj = GLF_live16QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_live16swap(int GLF_live16i, int GLF_live16j) {
    int GLF_live16temp = GLF_live16obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)];
    GLF_live16obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = GLF_live16obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16j, 10)];
    GLF_live16obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16j, 10)] = GLF_live16temp;
    {
        int GLF_live32looplimiter1 = 0;
        if (GLF_live32looplimiter1 >= 5) {
            ;
        }
    }
}

layout(set = 0, binding = 14) uniform sampler2D GLF_live17tex;
vec4 GLF_live13_GLF_color = _GLF_FUZZED(vec4(-695.554, -91.08, -375.807, 6.9));

layout(set = 0, binding = 15) uniform buf15 {
    vec3 GLF_live13polynomial;
};

float GLF_live13fx(float GLF_live13x) {
    {
        int GLF_live40looplimiter0 = 0;
        if (GLF_live40looplimiter0 >= 6) {
            ;
        }
    }
    return GLF_live13polynomial.x * pow(GLF_live13x, 2.0) + GLF_live13polynomial.y * GLF_live13x + GLF_live13polynomial.z;
}

int GLF_live10data[10] = int[10](_GLF_FUZZED((false ? (-50749) : (ivec2(-1917, 47973).s - ((-62805) - (-54777))))), _GLF_FUZZED(69821), _GLF_FUZZED(43282), _GLF_FUZZED((72643 ^ (-65989))), _GLF_FUZZED((83451 - (-37653))), _GLF_FUZZED((true ? ivec2(-12871, 85104) : (ivec2(91250, -97434) * ivec2(58017, 45107))).g), _GLF_FUZZED(12711), _GLF_FUZZED(((-57842) * (-90610))), _GLF_FUZZED((79398 + (-92442))), _GLF_FUZZED(int(96318u))), GLF_live10temp[10] = int[10](_GLF_FUZZED(77958), _GLF_FUZZED(-87688), _GLF_FUZZED((7288)), _GLF_FUZZED(94907), _GLF_FUZZED(87842), _GLF_FUZZED((+(-49722))), _GLF_FUZZED((~ivec4(-34160, -53800, 61031, -382).b)), _GLF_FUZZED(ivec3(-26083, -87304, 23759).y), _GLF_FUZZED((-(-81155))), _GLF_FUZZED(-47288));

layout(set = 0, binding = 16) uniform buf16 {
    vec3 GLF_live7polynomial;
};

float GLF_live7fx(float GLF_live7x) {
    {
        int GLF_live38i = _GLF_FUZZED(int(136680u));
        ivec2 GLF_live38p = _GLF_FUZZED(ivec2(-33861, -9924));
        {
            int GLF_live38looplimiter0 = 0;
            for (GLF_live38i = 0; GLF_live38i < 100; GLF_live38i++) {
                if (GLF_live38looplimiter0 >= 3) {
                    break;
                }
                GLF_live38looplimiter0++;
                {
                    GLF_live38p = GLF_live38iter(GLF_live38p);
                }
            }
        }
    }
    return GLF_live7polynomial.x * pow(GLF_live7x, 2.0) + GLF_live7polynomial.y * GLF_live7x + GLF_live7polynomial.z;
    {
        int GLF_live18i = _GLF_FUZZED(ivec2(77977, 88799).r);
        int GLF_live18looplimiter5 = 0;
        {
            if (GLF_live18looplimiter5 >= 3) {
                ;
            }
            GLF_live18looplimiter5++;
            {
                switch (GLF_live18i) {
                    case 0:
                        GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] = 4;
                        break;
                    case 1:
                        GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] = 3;
                        {
                            int GLF_live30looplimiter4 = 0;
                            if (GLF_live30looplimiter4 >= 7) {
                                ;
                            }
                        }
                        break;
                    case 2:
                        GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] = 2;
                        break;
                    case 3:
                        GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] = 1;
                        break;
                    case 4:
                        GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] = 0;
                        {
                            vec4 GLF_live25c = _GLF_FUZZED(((-986.467) - vec4(4391.2984, 729.142, -7.5, 7.2)));
                            int GLF_live25looplimiter1 = 0;
                            for (int GLF_live25i = 0; GLF_live25i < 3; GLF_live25i++) {
                                if (GLF_live25looplimiter1 >= 4) {
                                    break;
                                }
                                {
                                    ivec2 GLF_live38p = _GLF_FUZZED((ivec2(-26161, -66003) - (ivec2(83028, 11326) - ivec4(23377, 99395, -11428, 33647).x)));
                                    {
                                        int GLF_live38looplimiter1 = 0;
                                        while (GLF_live38p.x > 15) {
                                            if (GLF_live38looplimiter1 >= 3) {
                                                break;
                                            }
                                            GLF_live38looplimiter1++;
                                            {
                                                GLF_live38p.x -= 16;
                                            }
                                        }
                                    }
                                }
                                GLF_live25looplimiter1++;
                                {
                                    if (GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 4)] >= 1.0) {
                                        {
                                            int GLF_live37looplimiter0 = 0;
                                            if (GLF_live37looplimiter0 >= 3) {
                                                ;
                                            }
                                        }
                                        GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 4)] = GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 4)] * GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 4)];
                                    }
                                }
                            }
                        }
                        break;
                        {
                            int GLF_live30looplimiter1 = 0;
                            if (GLF_live30looplimiter1 >= 7) {
                                ;
                            }
                        }
                    case 5:
                        GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] = -1;
                        break;
                    case 6:
                        GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] = -2;
                        break;
                    case 7:
                        GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] = -3;
                        break;
                    case 8:
                        GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] = -4;
                        break;
                    case 9:
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED(((-6.6) + vec2(-9.5, 1.6)));
                            {
                                vec2 GLF_live26center = _GLF_FUZZED((false ? vec2(8960.7370, 958.458) : vec2(121.178, 7.5)));
                                int GLF_live26looplimiter0 = 0;
                                int GLF_live26msb8 = _GLF_FUZZED(-22390);
                                vec2 GLF_live26position = _GLF_FUZZED(vec2(-8.9, -5037.0589));
                                vec3 GLF_live26result = _GLF_FUZZED((((vec2(-133.286, 4.7) * (-45.44)) * mat3x2(-7297.2022, 439.322, 3573.0294, 8.9, 7.2, 428.678)) * 9146.2522));
                                for (int GLF_live26i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live26resolution.x), 0, 0)); GLF_live26i >= bitfieldReverse(bitfieldExtract(int(GLF_live26resolution.x), 0, 0)); GLF_live26i--) {
                                    if (GLF_live26looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live26looplimiter0++;
                                    {
                                        vec3 GLF_live26d = _GLF_FUZZED(floor(dFdx(vec3(6.8, 8952.6639, -26.54))));
                                        GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                        if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 0))) {
                                            continue;
                                        }
                                        GLF_live26result = vec3(GLF_live26d);
                                    }
                                }
                            }
                            int GLF_live22i = _GLF_FUZZED(-93708);
                            int GLF_live22looplimiter0 = 0;
                            while (GLF_live22i < 1 && GLF_live22coord.x > 1.0 || GLF_live22coord.y > 1.0) {
                                if (GLF_live22looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live22looplimiter0++;
                                {
                                    if (GLF_live22coord.x > 1.0)
                                        GLF_live22coord.x -= 1.0;
                                    if (GLF_live22coord.y > 1.0)
                                        GLF_live22coord.y -= 1.0;
                                    GLF_live22coord *= 2.0;
                                    {
                                        int GLF_live39looplimiter3 = 0;
                                        uint GLF_live39matrix_number = _GLF_FUZZED(104548u);
                                        for (int GLF_live39cols = 2; GLF_live39cols <= 4; GLF_live39cols++) {
                                            if (GLF_live39looplimiter3 >= 3) {
                                                break;
                                            }
                                            GLF_live39looplimiter3++;
                                            {
                                                {
                                                    int GLF_live39looplimiter2 = 0;
                                                    for (int GLF_live39rows = 2; GLF_live39rows <= 4; GLF_live39rows++) {
                                                        if (GLF_live39looplimiter2 >= 3) {
                                                            break;
                                                        }
                                                        GLF_live39looplimiter2++;
                                                        {
                                                            {
                                                                int GLF_live39looplimiter1 = 0;
                                                                for (int GLF_live39c = 0; GLF_live39c < GLF_live39cols; GLF_live39c++) {
                                                                    if (GLF_live39looplimiter1 >= 3) {
                                                                        break;
                                                                    }
                                                                    GLF_live39looplimiter1++;
                                                                    {
                                                                        {
                                                                            int GLF_live39looplimiter0 = 0;
                                                                            for (int GLF_live39r = 0; GLF_live39r < GLF_live39rows; GLF_live39r++) {
                                                                                if (GLF_live39looplimiter0 >= 3) {
                                                                                    break;
                                                                                }
                                                                                GLF_live39looplimiter0++;
                                                                                {
                                                                                    switch (GLF_live39matrix_number) {
                                                                                        case 0u:
                                                                                            GLF_live39m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                                            break;
                                                                                        case 1u:
                                                                                            GLF_live39m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                                            break;
                                                                                        case 2u:
                                                                                            GLF_live39m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                                            break;
                                                                                        case 3u:
                                                                                            GLF_live39m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                                            break;
                                                                                        case 4u:
                                                                                            GLF_live39m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                                            break;
                                                                                        case 5u:
                                                                                            GLF_live39m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                                            break;
                                                                                        case 6u:
                                                                                            GLF_live39m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                                            break;
                                                                                        case 7u:
                                                                                            GLF_live39m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                                            break;
                                                                                        case 8u:
                                                                                            GLF_live39m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                                            break;
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            GLF_live39matrix_number = GLF_live39matrix_number + 1u;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    GLF_live22i++;
                                }
                            }
                        }
                        GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] = -5;
                        break;
                }
                GLF_live18i++;
            }
        }
    }
}

const vec4 GLF_live6pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_live6picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, 4, 4), vec4(12, 22, 4, 4));
layout(set = 0, binding = 17) uniform sampler2D GLF_live8tex;
const float GLF_live8weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);

struct _GLF_struct_6 {
    int GLF_live3l;
    ivec2 _f0;
};

int GLF_live5msb8 = 256;

struct GLF_live3QuicksortObject {
    int numbers[10];
};

GLF_live3QuicksortObject GLF_live3obj = GLF_live3QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_live3swap(int GLF_live3i, int GLF_live3j) {
    {
        int GLF_live21i = _GLF_FUZZED(((-63506) | ivec2(59214, 34739).x));
        {
            vec3 GLF_live36color = _GLF_FUZZED(vec3(-6.0, -6769.8506, -2.6));
            int GLF_live36count = _GLF_FUZZED((97044 & 10351));
            int GLF_live36looplimiter3 = 0;
            {
                if (GLF_live36looplimiter3 >= 5) {
                    ;
                }
                GLF_live36looplimiter3++;
                {
                    GLF_live36color += GLF_live36palette(vec3(0.5, float(GLF_live36obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live36injectionSwitch.y)), vec3(float(GLF_live36obj.numbers[4]) * 0.1, GLF_live36injectionSwitch.x, 0.6));
                    GLF_live36count++;
                }
            }
        }
        float GLF_live21limit = _GLF_FUZZED(vec4(122.978, -301.934, -9.1, -8.1).a);
        float GLF_live21s = _GLF_FUZZED(1.9);
        if (float(GLF_live21i) >= GLF_live21limit) {
            ;
        }
    }
    int GLF_live3temp = GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)];
    GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3j, 10)];
    GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3j, 10)] = GLF_live3temp;
    {
        {
            vec3 GLF_live36color = _GLF_FUZZED(((mat2x3(0.1, 259.639, -7067.9556, 807.836, 91.44, 2.2)) * vec2(2.9, -6.3)));
            int GLF_live36count = _GLF_FUZZED(ivec3(14772, -58194, -87941).b);
            {
                int GLF_live36looplimiter3 = 0;
                do {
                    {
                        int GLF_live38looplimiter0 = 0;
                        ivec2 GLF_live38p = _GLF_FUZZED(ivec2(84560, -89555));
                        {
                            if (GLF_live38looplimiter0 >= 3) {
                                ;
                            }
                            GLF_live38looplimiter0++;
                            {
                                GLF_live38p = GLF_live38iter(GLF_live38p);
                            }
                        }
                    }
                    if (GLF_live36looplimiter3 >= 5) {
                        break;
                    }
                    GLF_live36looplimiter3++;
                    {
                        GLF_live36color += GLF_live36palette(vec3(0.5, float(GLF_live36obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live36injectionSwitch.y)), vec3(float(GLF_live36obj.numbers[4]) * 0.1, GLF_live36injectionSwitch.x, 0.6));
                        GLF_live36count++;
                    }
                } while (GLF_live36count != GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live36injectionSwitch.x), 10)]);
            }
        }
        vec2 GLF_live27coord = _GLF_FUZZED(vec2(9524.0685, 6.7));
        int GLF_live27i = _GLF_FUZZED((65981));
        int GLF_live27looplimiter1 = 0;
        vec4 GLF_live27res = _GLF_FUZZED(vec4(-1.8, -70.62, 5245.6995, -7.6));
        float GLF_live27uvstep = _GLF_FUZZED(-3.1);
        {
            if (GLF_live27looplimiter1 >= 7) {
                ;
            }
            GLF_live27looplimiter1++;
            {
                {
                    vec2 GLF_live35coord = _GLF_FUZZED((+vec2(9.5, 45.45)));
                    vec4 GLF_live35res = _GLF_FUZZED(vec4(-52.44, 5256.6949, -25.27, -18.60));
                    {
                        GLF_live35res = texture(GLF_live35tex, GLF_live35coord);
                    }
                }
                {
                    int GLF_live27looplimiter0 = 0;
                    for (int GLF_live27j = 0; GLF_live27j < 3; GLF_live27j++) {
                        if (GLF_live27looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live27looplimiter0++;
                        {
                            GLF_live27res += texture(GLF_live27tex, GLF_live27coord + vec2(float(GLF_live27i - 1) * GLF_live27uvstep, float(GLF_live27j - 1) * GLF_live27uvstep)) * GLF_live27weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live27i * 3 + GLF_live27j, 9)];
                        }
                        {
                            float GLF_live29v = _GLF_FUZZED(76.22);
                            if (GLF_live29v < float(GLF_live29search(6))) {
                                ;
                            }
                        }
                    }
                }
                {
                    int GLF_live29baseIndex = _GLF_FUZZED((+(-36558)));
                    int GLF_live29data = _GLF_FUZZED(-12455);
                    int GLF_live29treeIndex = _GLF_FUZZED(82012);
                    {
                        int GLF_live29looplimiter0 = 0;
                        while (GLF_live29baseIndex <= GLF_live29treeIndex) {
                            if (GLF_live29looplimiter0 >= 4) {
                                break;
                                {
                                    vec2 GLF_live35coord = _GLF_FUZZED((vec2(899.774, -4.5)));
                                    vec4 GLF_live35res = _GLF_FUZZED((vec3(5008.8235, -338.342, -1971.4551) * mat4x3(-30.14, -705.309, -5179.8365, 10.98, -828.969, 308.944, 2.3, 8.8, -0.4, -60.87, 4.1, 7.5)));
                                    {
                                        GLF_live35res = texture(GLF_live35tex, GLF_live35coord);
                                    }
                                }
                            }
                            GLF_live29looplimiter0++;
                            {
                                if (GLF_live29data <= GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].data) {
                                    if (GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].leftIndex == -1) {
                                        {
                                            float GLF_live40A = _GLF_FUZZED(83.11);
                                            float GLF_live40B = _GLF_FUZZED((vec4(8281.6040, -2.4, -8.2, 447.115).s + (-45.28)));
                                            float GLF_live40C = _GLF_FUZZED(vec3(3819.7766, -37.14, 9313.9315).y);
                                            float GLF_live40temp = _GLF_FUZZED(-329.199);
                                            float GLF_live40x0 = _GLF_FUZZED(float(-15907));
                                            float GLF_live40x1 = _GLF_FUZZED(-3.5);
                                            float GLF_live40x2 = _GLF_FUZZED(vec2(135.578, 73.42).s);
                                            {
                                                float GLF_live40h0 = GLF_live40x0 - GLF_live40x2;
                                                float GLF_live40h1 = GLF_live40x1 - GLF_live40x2;
                                                float GLF_live40k0 = GLF_live40fx(GLF_live40x0) - GLF_live40fx(GLF_live40x2);
                                                float GLF_live40k1 = GLF_live40fx(GLF_live40x1) - GLF_live40fx(GLF_live40x2);
                                                GLF_live40temp = GLF_live40x2;
                                                GLF_live40A = (((GLF_live40h1) * (GLF_live40k0)) - ((GLF_live40h0) * (GLF_live40k1))) / ((pow((GLF_live40h0), 2.0) * (GLF_live40h1)) - (pow((GLF_live40h1), 2.0) * (GLF_live40h0)));
                                                GLF_live40B = (((GLF_live40k0) - (GLF_live40A * (pow((GLF_live40h0), 2.0)))) / (GLF_live40h0));
                                                GLF_live40C = GLF_live40fx(GLF_live40x2);
                                                GLF_live40x2 = GLF_live40x2 - ((2.0 * GLF_live40C) / (GLF_live40B + sign(GLF_live40B) * sqrt(pow(GLF_live40B, 2.0) - (4.0 * GLF_live40A * GLF_live40C))));
                                                GLF_live40x0 = GLF_live40x1;
                                                GLF_live40x1 = GLF_live40temp;
                                            }
                                        }
                                        GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].leftIndex = GLF_live29treeIndex;
                                        GLF_live29makeTreeNode(GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29treeIndex, 10)], GLF_live29data);
                                        ;
                                    } else {
                                        GLF_live29baseIndex = GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].leftIndex;
                                        continue;
                                    }
                                } else {
                                    if (GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].rightIndex == -1) {
                                        GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].rightIndex = GLF_live29treeIndex;
                                        GLF_live29makeTreeNode(GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29treeIndex, 10)], GLF_live29data);
                                        ;
                                    } else {
                                        GLF_live29baseIndex = GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].rightIndex;
                                        continue;
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
        int GLF_live34v = _GLF_FUZZED(39139);
        {
            GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
        }
    }
    {
        int GLF_live37looplimiter0 = 0;
        if (GLF_live37looplimiter0 >= 3) {
            ;
        }
    }
}

layout(set = 0, binding = 18) uniform sampler2D GLF_live2tex;

struct _GLF_struct_5 {
    vec4 _f0;
    int GLF_live1looplimiter0;
    uvec2 _f1;
    uvec2 _f2;
    ivec4 _f3;
    mat4 _f4;
    mat2x4 _f5;
};

struct _GLF_struct_4 {
    vec2 _f0;
    bvec2 _f1;
    mat2 _f2;
    ivec2 _f3;
};

struct _GLF_struct_3 {
    bvec4 _f0;
    mat4 _f1;
};

struct _GLF_struct_2 {
    uvec2 _f0;
    uvec4 _f1;
    uvec3 _f2;
};

struct _GLF_struct_1 {
    _GLF_struct_2 _f0;
    bvec4 _f1;
    _GLF_struct_3 _f2;
    vec3 _f3;
    vec3 _f4;
    mat2x4 _f5;
    _GLF_struct_4 _f6;
};

struct _GLF_struct_0 {
    bvec3 _f0;
    _GLF_struct_1 _f1;
    ivec2 _f2;
    int d;
};

layout(set = 0, binding = 19) uniform buf19 {
    vec2 injectionSwitch;
};

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

int map[16 * 16];

void main() {
    vec2 pos = gl_FragCoord.xy / resolution;
    {
        int GLF_live34looplimiter0 = 0;
        if (GLF_live34looplimiter0 >= 6) {
            ;
            {
                {
                    ;
                }
            }
        }
    }
    {
        int GLF_live15result = _GLF_FUZZED(((9163) ^ 73656));
        int GLF_live15sum = _GLF_FUZZED((true ? ivec4(20653, 61377, -98914, -69019).zxy.x : 81878));
        {
            GLF_live15sum += GLF_live15result;
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
    {
        {
            {
                ;
            }
        }
        vec4 GLF_live5c = _GLF_FUZZED(vec4(6.6, 72.57, 66.04, -56.25));
        int GLF_live5i = _GLF_FUZZED(80026);
        int GLF_live5looplimiter1 = 0;
        {
            int GLF_live12looplimiter2 = 0;
            if (GLF_live12looplimiter2 >= 6) {
                ;
                {
                    int GLF_live30m = _GLF_FUZZED(-16282);
                    int GLF_live30r = _GLF_FUZZED(7850);
                    {
                        {
                            vec2 GLF_live35coord = _GLF_FUZZED(vec2(9.0, -374.787));
                            vec4 GLF_live35res = _GLF_FUZZED((true ? vec4(97.63, 2996.7563, -97.92, 5.0) : vec4(-9.7, 442.149, 4.0, 59.40)));
                            if (GLF_live35coord.x < 1.0 && GLF_live35coord.y < 1.0) {
                                GLF_live35res = texture(GLF_live35tex, GLF_live35coord);
                            }
                        }
                        GLF_live30r = GLF_live30m - 1;
                    }
                }
            }
        }
        int GLF_live5msb8 = _GLF_FUZZED(-86971);
        do {
            if (GLF_live5looplimiter1 >= 6) {
                break;
                {
                    int GLF_live29looplimiter0 = 0;
                    if (GLF_live29looplimiter0 >= 4) {
                        ;
                    }
                }
                {
                    int GLF_live9looplimiter0 = 0;
                    if (GLF_live9looplimiter0 >= 5) {
                        ;
                    }
                }
            }
            {
                int GLF_live39looplimiter1 = 0;
                if (GLF_live39looplimiter1 >= 3) {
                    ;
                }
            }
            {
                int GLF_live10i = _GLF_FUZZED(int(((-106.134) >= (5427.4209 + 781.393))));
                int GLF_live10j = _GLF_FUZZED(68206);
                int GLF_live10k = _GLF_FUZZED((43002 - 66236));
                if (GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] < GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 10)]) {
                    GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i++, 10)];
                } else {
                    GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j++, 10)];
                }
            }
            GLF_live5looplimiter1++;
            {
                if (GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 4)] >= 1.0) {
                    GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 4)] = GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 4)] * GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 4)];
                }
                GLF_live5i++;
            }
        } while (GLF_live5i < findMSB(findLSB(GLF_live5msb8)));
    }
    ivec2 ipos = ivec2(int(pos.x * 16.0), int(pos.y * 16.0));
    int i;
    for (i = 0; i < 16 * 16; i++) {
        {
            {
                int GLF_live15looplimiter1 = 0;
                if (GLF_live15looplimiter1 >= 5) {
                    {
                        ivec2 GLF_live23pos = _GLF_FUZZED((ivec2(-40604, -62488) + (ivec3(-2623, -60297, 5172) * ivec3(-13855, -99256, 89061)).s));
                        {
                            {
                                ;
                            }
                        }
                        {
                            if (GLF_live23pos.x < GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)] + 15 && GLF_live23pos.x > GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)] - 15) {
                                float GLF_live23p = (15.0 - abs(float(GLF_live23pos.x - GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)]))) / 15.0;
                                ;
                            }
                            GLF_live23pos.y++;
                        }
                    }
                    ;
                    {
                        int GLF_live29baseIndex = _GLF_FUZZED((((-16441) ^ (-60455)) & (-89082)));
                        int GLF_live29data = _GLF_FUZZED(64625);
                        int GLF_live29looplimiter0 = 0;
                        int GLF_live29treeIndex = _GLF_FUZZED(ivec3(ivec2(-69715, -16107), 31850).p);
                        while (GLF_live29baseIndex <= GLF_live29treeIndex) {
                            if (GLF_live29looplimiter0 >= 4) {
                                break;
                            }
                            GLF_live29looplimiter0++;
                            {
                                if (GLF_live29data <= GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].data) {
                                    if (GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].leftIndex == -1) {
                                        GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].leftIndex = GLF_live29treeIndex;
                                        GLF_live29makeTreeNode(GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29treeIndex, 10)], GLF_live29data);
                                        ;
                                    } else {
                                        GLF_live29baseIndex = GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].leftIndex;
                                        continue;
                                    }
                                } else {
                                    if (GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].rightIndex == -1) {
                                        GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].rightIndex = GLF_live29treeIndex;
                                        GLF_live29makeTreeNode(GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29treeIndex, 10)], GLF_live29data);
                                        ;
                                    } else {
                                        GLF_live29baseIndex = GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].rightIndex;
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            int GLF_live11looplimiter1 = 0;
            if (GLF_live11looplimiter1 >= 4) {
                {
                    {
                        {
                            ;
                        }
                    }
                    int GLF_live16i = _GLF_FUZZED(88135);
                    int GLF_live16j = _GLF_FUZZED(ivec4(-29618, -9104, -5969, 3676).r);
                    {
                        GLF_live16i++;
                        GLF_live16swap(GLF_live16i, GLF_live16j);
                    }
                }
                {
                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(-5.7, 8.4));
                    vec4 GLF_live22res = _GLF_FUZZED((+vec4(8.4, -464.976, -8.4, 8.4)));
                    if (GLF_live22coord.x < 1.0 && GLF_live22coord.y < 1.0) {
                        GLF_live22res = texture(GLF_live22tex, GLF_live22coord);
                    }
                }
                ;
            }
            {
                int GLF_live39cols = _GLF_FUZZED(94030);
                uint GLF_live39matrix_number = _GLF_FUZZED(uvec2(99077u, 160503u).y);
                {
                    {
                        int GLF_live39looplimiter2 = 0;
                        for (int GLF_live39rows = 2; GLF_live39rows <= 4; GLF_live39rows++) {
                            if (GLF_live39looplimiter2 >= 3) {
                                break;
                            }
                            GLF_live39looplimiter2++;
                            {
                                {
                                    int GLF_live39looplimiter1 = 0;
                                    for (int GLF_live39c = 0; GLF_live39c < GLF_live39cols; GLF_live39c++) {
                                        if (GLF_live39looplimiter1 >= 3) {
                                            break;
                                        }
                                        GLF_live39looplimiter1++;
                                        {
                                            {
                                                int GLF_live39looplimiter0 = 0;
                                                for (int GLF_live39r = 0; GLF_live39r < GLF_live39rows; GLF_live39r++) {
                                                    if (GLF_live39looplimiter0 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live39looplimiter0++;
                                                    {
                                                        switch (GLF_live39matrix_number) {
                                                            case 0u:
                                                                GLF_live39m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                break;
                                                            case 1u:
                                                                GLF_live39m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                break;
                                                            case 2u:
                                                                GLF_live39m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                break;
                                                            case 3u:
                                                                GLF_live39m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                break;
                                                            case 4u:
                                                                GLF_live39m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                break;
                                                            case 5u:
                                                                GLF_live39m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                break;
                                                            case 6u:
                                                                GLF_live39m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                break;
                                                            case 7u:
                                                                GLF_live39m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                break;
                                                            case 8u:
                                                                GLF_live39m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                GLF_live39matrix_number = GLF_live39matrix_number + 1u;
                            }
                        }
                    }
                }
            }
        }
        map[i] = 0;
    }
    ivec2 p = ivec2(0, 0);
    {
        {
            ;
        }
    }
    bool canwalk = true;
    int v = 0;
    {
        vec2 GLF_live17coord = _GLF_FUZZED(vec2(57.55, 6.0));
        vec4 GLF_live17res = _GLF_FUZZED(vec4(53.80, -7.7, -3.1, 9.5));
        {
            GLF_live17res = texture(GLF_live17tex, GLF_live17coord);
        }
    }
    do {
        v++;
        {
            {
                vec2 GLF_live35coord = _GLF_FUZZED((+((vec2(-1.0, -8.3) - 0.0) - (-659.939))));
                if (GLF_live35coord.x > 1.0)
                    GLF_live35coord.x -= 1.0;
            }
            vec2 GLF_live31center = _GLF_FUZZED(vec2(970.774));
            vec2 GLF_live31position = _GLF_FUZZED(vec2(vec4(vec2(-5.0, -11.19), vec2(5444.0054, -823.645))));
            vec3 GLF_live31result = _GLF_FUZZED((vec3(9662.6843, -5754.0481, 547.636) * vec3(4999.7711, -70.74, 0.3)));
            {
                int GLF_live31looplimiter0 = 0;
                for (int GLF_live31i = 35; GLF_live31i >= 0; GLF_live31i--) {
                    if (GLF_live31looplimiter0 >= 3) {
                        break;
                    }
                    GLF_live31looplimiter0++;
                    {
                        vec3 GLF_live31d = _GLF_FUZZED(sqrt(vec3(8502.4250, -1.7, -4.2)));
                        GLF_live31d = GLF_live31drawShape(GLF_live31position, GLF_live31center + vec2(sin(float(GLF_live31i) / 10.0 + GLF_live31time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live31i) / 100.0), 0.01, float(GLF_live31i)));
                        if (length(GLF_live31d) <= 0.0) {
                            continue;
                            {
                                int GLF_live39cols = _GLF_FUZZED(38238);
                                int GLF_live39looplimiter3 = 0;
                                uint GLF_live39matrix_number = _GLF_FUZZED(uint(true));
                                {
                                    if (GLF_live39looplimiter3 >= 3) {
                                        ;
                                    }
                                    GLF_live39looplimiter3++;
                                    {
                                        {
                                            int GLF_live39looplimiter2 = 0;
                                            for (int GLF_live39rows = 2; GLF_live39rows <= 4; GLF_live39rows++) {
                                                if (GLF_live39looplimiter2 >= 3) {
                                                    break;
                                                }
                                                GLF_live39looplimiter2++;
                                                {
                                                    {
                                                        int GLF_live39looplimiter1 = 0;
                                                        for (int GLF_live39c = 0; GLF_live39c < GLF_live39cols; GLF_live39c++) {
                                                            if (GLF_live39looplimiter1 >= 3) {
                                                                break;
                                                            }
                                                            GLF_live39looplimiter1++;
                                                            {
                                                                {
                                                                    int GLF_live39looplimiter0 = 0;
                                                                    for (int GLF_live39r = 0; GLF_live39r < GLF_live39rows; GLF_live39r++) {
                                                                        if (GLF_live39looplimiter0 >= 3) {
                                                                            break;
                                                                        }
                                                                        GLF_live39looplimiter0++;
                                                                        {
                                                                            switch (GLF_live39matrix_number) {
                                                                                case 0u:
                                                                                    GLF_live39m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                                    break;
                                                                                case 1u:
                                                                                    GLF_live39m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                                    break;
                                                                                case 2u:
                                                                                    GLF_live39m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                                    break;
                                                                                case 3u:
                                                                                    GLF_live39m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                                    break;
                                                                                case 4u:
                                                                                    GLF_live39m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                                    break;
                                                                                case 5u:
                                                                                    GLF_live39m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                                    break;
                                                                                case 6u:
                                                                                    GLF_live39m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                                    break;
                                                                                case 7u:
                                                                                    GLF_live39m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                                    break;
                                                                                case 8u:
                                                                                    GLF_live39m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                                    break;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    GLF_live39matrix_number = GLF_live39matrix_number + 1u;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        GLF_live31result = vec3(GLF_live31d);
                    }
                    {
                        int GLF_live34v = _GLF_FUZZED(int((121972u - 82130u)));
                        {
                            GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                            {
                                vec2 GLF_live37coord = _GLF_FUZZED((vec4(-6.2) * mat2x4(-4381.4918, 4593.2501, 2376.6953, -4.2, -5008.6216, 40.14, 8539.9147, -63.20)));
                                int GLF_live37i = _GLF_FUZZED(int(145466u));
                                int GLF_live37looplimiter1 = 0;
                                vec4 GLF_live37res = _GLF_FUZZED(vec4(-1.3, 643.800, 3074.8569, 4224.6628));
                                float GLF_live37uvstep = _GLF_FUZZED(-5.3);
                                {
                                    if (GLF_live37looplimiter1 >= 3) {
                                        ;
                                    }
                                    GLF_live37looplimiter1++;
                                    {
                                        {
                                            int GLF_live37looplimiter0 = 0;
                                            for (int GLF_live37j = 0; GLF_live37j < 3; GLF_live37j++) {
                                                if (GLF_live37looplimiter0 >= 3) {
                                                    break;
                                                }
                                                GLF_live37looplimiter0++;
                                                {
                                                    GLF_live37res += texture(GLF_live37tex, GLF_live37coord + vec2(float(GLF_live37i - 1) * GLF_live37uvstep, float(GLF_live37j - 1) * GLF_live37uvstep)) * GLF_live37weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i * 3 + GLF_live37j, 9)];
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
        }
        int directions = 0;
        {
            int GLF_live28result = _GLF_FUZZED(67816);
            int GLF_live28sum = _GLF_FUZZED(int(false));
            if (GLF_live28result > 0) {
                GLF_live28sum += GLF_live28result;
            } else {
                switch (GLF_live28result) {
                    case -1:
                        GLF_live28sum += 1;
                        break;
                    case 0:
                        ;
                }
            }
        }
        if (p.x > 0 && map[(p.x - 2) + (p.y) * 16] == 0) {
            directions += 1;
        }
        if (p.y > 0 && map[(p.x) + (p.y - 2) * 16] == 0) {
            directions += 1;
        }
        if (p.x < 14 && map[(p.x + 2) + (p.y) * 16] == 0) {
            directions += 1;
        }
        {
            vec2 GLF_live18color = _GLF_FUZZED(vec2(9.2, 9.5));
            {
                int GLF_live34i = _GLF_FUZZED((23965 * (-4388)));
                int GLF_live34iters = _GLF_FUZZED(-56607);
                int GLF_live34looplimiter0 = 0;
                int GLF_live34v = _GLF_FUZZED(83686);
                for (GLF_live34i = 0; GLF_live34i < GLF_live34iters; GLF_live34i++) {
                    if (GLF_live34looplimiter0 >= 6) {
                        break;
                        {
                            vec2 GLF_live37coord = _GLF_FUZZED((+vec2(-16.13, 7799.0769)));
                            int GLF_live37i = _GLF_FUZZED(-25271);
                            int GLF_live37looplimiter1 = 0;
                            vec4 GLF_live37res = _GLF_FUZZED(vec4(0.5, -83.44, -350.586, 945.761));
                            float GLF_live37uvstep = _GLF_FUZZED(-3.6);
                            {
                                if (GLF_live37looplimiter1 >= 3) {
                                    ;
                                }
                                GLF_live37looplimiter1++;
                                {
                                    {
                                        int GLF_live37looplimiter0 = 0;
                                        for (int GLF_live37j = 0; GLF_live37j < 3; GLF_live37j++) {
                                            if (GLF_live37looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live37looplimiter0++;
                                            {
                                                GLF_live37res += texture(GLF_live37tex, GLF_live37coord + vec2(float(GLF_live37i - 1) * GLF_live37uvstep, float(GLF_live37j - 1) * GLF_live37uvstep)) * GLF_live37weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i * 3 + GLF_live37j, 9)];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    GLF_live34looplimiter0++;
                    {
                        GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                    }
                }
            }
            {
                vec2 GLF_live31position = _GLF_FUZZED(vec2(2682.5374, -387.267));
                if (abs(GLF_live31position.y - GLF_live31position.x) < 0.5) {
                    GLF_live31b_b = clamp(0.0, 1.0, GLF_live31b_b * 3.0);
                }
            }
            vec3 GLF_live18vecCoor = _GLF_FUZZED((mat2x3(-4.2, 462.163, -41.14, 783.469, 8.0, -75.79) * vec2(-2380.1451, 65.37)));
            {
                GLF_live18color = fract(sin(GLF_live18vecCoor.yx - trunc(float(GLF_live18data[5]))));
                GLF_live18color.y -= tanh(GLF_live18color.x) / cosh(GLF_live18color.y);
                ;
                {
                    vec2 GLF_live27coord = _GLF_FUZZED(vec2(((-3.2) + 4.7), ((-71.01) - (-5.0))));
                    vec4 GLF_live27res = _GLF_FUZZED(vec4((mat3x2(83.64, -24.78, 2.2, -2.5, 5.0, -750.229) * vec3(-2162.7330, 8.7, 2.4)), float(false), float(false)));
                    float GLF_live27uvstep = _GLF_FUZZED((mat2x3(-3.6, -673.904, 0.6, -1.1, 6.9, -426.769) * vec2(-12.84, 54.89)).p);
                    {
                        int GLF_live27looplimiter1 = 0;
                        {
                            int GLF_live36i = _GLF_FUZZED((~63636));
                            int GLF_live36j = _GLF_FUZZED((53884));
                            int GLF_live36looplimiter0 = 0;
                            int GLF_live36pivot = _GLF_FUZZED((~(-52869)));
                            {
                                if (GLF_live36looplimiter0 >= 5) {
                                    ;
                                }
                                GLF_live36looplimiter0++;
                                {
                                    if (GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live36j, 10)] <= GLF_live36pivot) {
                                        GLF_live36i++;
                                        GLF_live36swap(GLF_live36i, GLF_live36j);
                                        {
                                            {
                                                ;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        for (int GLF_live27i = 0; GLF_live27i < 3; GLF_live27i++) {
                            if (GLF_live27looplimiter1 >= 7) {
                                break;
                            }
                            GLF_live27looplimiter1++;
                            {
                                {
                                    int GLF_live27looplimiter0 = 0;
                                    for (int GLF_live27j = 0; GLF_live27j < 3; GLF_live27j++) {
                                        {
                                            int GLF_live29looplimiter1 = 0;
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            if (GLF_live29looplimiter1 >= 4) {
                                                ;
                                            }
                                        }
                                        {
                                            vec2 GLF_live37coord = _GLF_FUZZED((vec3(-7436.5485, -8709.9256, 66.19) * (true ? mat2x3(-8219.5025, 6.3, 5.8, -1.9, 3.8, 1.5) : mat2x3(0.9, -5.5, 543.910, 730.866, 1.2, -410.178))));
                                            int GLF_live37i = _GLF_FUZZED(52598);
                                            vec4 GLF_live37res = _GLF_FUZZED(vec4(-6022.0067, -1.1, -55.44, -419.559));
                                            float GLF_live37uvstep = _GLF_FUZZED(((+(-615.231)) - (-427.669)));
                                            {
                                                {
                                                    int GLF_live37looplimiter0 = 0;
                                                    for (int GLF_live37j = 0; GLF_live37j < 3; GLF_live37j++) {
                                                        if (GLF_live37looplimiter0 >= 3) {
                                                            break;
                                                        }
                                                        GLF_live37looplimiter0++;
                                                        {
                                                            GLF_live37res += texture(GLF_live37tex, GLF_live37coord + vec2(float(GLF_live37i - 1) * GLF_live37uvstep, float(GLF_live37j - 1) * GLF_live37uvstep)) * GLF_live37weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i * 3 + GLF_live37j, 9)];
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (GLF_live27looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live27looplimiter0++;
                                        {
                                            GLF_live27res += texture(GLF_live27tex, GLF_live27coord + vec2(float(GLF_live27i - 1) * GLF_live27uvstep, float(GLF_live27j - 1) * GLF_live27uvstep)) * GLF_live27weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live27i * 3 + GLF_live27j, 9)];
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
                    }
                }
            }
        }
        if (p.y < 14 && map[(p.x) + (p.y + 2) * 16] == 0) {
            {
                int GLF_live36i = _GLF_FUZZED(-57150);
                {
                    GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live36i, 10)] = (10 - GLF_live36i) * int(GLF_live36injectionSwitch.y);
                }
            }
            directions += 1;
            {
                vec2 GLF_live22coord = _GLF_FUZZED(vec2(vec4(-114.195, 8139.8855, 448.626, -15.61)));
                if (GLF_live22coord.y > 1.0)
                    GLF_live22coord.y -= 1.0;
            }
        }
        {
            {
                int GLF_live39looplimiter2 = 0;
                if (GLF_live39looplimiter2 >= 3) {
                    ;
                }
            }
            int GLF_live31looplimiter0 = 0;
            if (GLF_live31looplimiter0 >= 3) {
                ;
            }
        }
        {
            int GLF_live6i = _GLF_FUZZED(ivec3(-60840, -92140, -86353).r);
            vec4 GLF_live6res = _GLF_FUZZED(vec3(-8.0, 5459.7219, -687.654).bbbb);
            {
                {
                    {
                        ;
                    }
                }
                GLF_live6res = GLF_live6pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live6picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 8)].x) * int(GLF_live6picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 8)].y) + GLF_live6i * 9 + 11) % 16, 16)];
            }
        }
        if (directions == 0) {
            canwalk = false;
            {
                int GLF_live9looplimiter0 = 0;
                {
                    int GLF_live25i = _GLF_FUZZED(-24282);
                    {
                        ivec2 GLF_live38p = _GLF_FUZZED(((-75445) + ivec2(97162, -92370)));
                        if (GLF_live38p.x < 0) {
                            GLF_live38p.x = -GLF_live38p.x;
                        }
                    }
                    float GLF_live25limit = _GLF_FUZZED((2.6 * (-129.234)));
                    int GLF_live25looplimiter0 = 0;
                    float GLF_live25ref = _GLF_FUZZED(5689.1894);
                    float GLF_live25s = _GLF_FUZZED(82.65);
                    {
                        if (GLF_live25looplimiter0 >= 4) {
                            ;
                        }
                        GLF_live25looplimiter0++;
                        {
                            int GLF_live34looplimiter0 = 0;
                            if (GLF_live34looplimiter0 >= 6) {
                                ;
                            }
                        }
                        {
                            if (mod(float(GLF_live25i), GLF_live25ref) <= 0.01) {
                                GLF_live25s += 0.2;
                            }
                            if (float(GLF_live25i) >= GLF_live25limit) {
                                ;
                            }
                        }
                    }
                }
                {
                    vec2 GLF_live17coord = _GLF_FUZZED(vec2(2.1, 63.68));
                    int GLF_live17i = _GLF_FUZZED(77004);
                    {
                        if (GLF_live17coord.x > 1.0)
                            GLF_live17coord.x -= 1.0;
                        if (GLF_live17coord.y > 1.0)
                            GLF_live17coord.y -= 1.0;
                        GLF_live17coord *= 2.0;
                        GLF_live17i++;
                    }
                }
                if (GLF_live9looplimiter0 >= 5) {
                    ;
                    {
                        vec2 GLF_live35coord = _GLF_FUZZED(((-76.67) + vec2(-20.52)));
                        int GLF_live35i = _GLF_FUZZED(95411);
                        {
                            if (GLF_live35coord.x > 1.0)
                                GLF_live35coord.x -= 1.0;
                            if (GLF_live35coord.y > 1.0)
                                GLF_live35coord.y -= 1.0;
                            GLF_live35coord *= 2.0;
                            GLF_live35i++;
                        }
                    }
                }
                {
                    int GLF_live40looplimiter0 = 0;
                    if (GLF_live40looplimiter0 >= 6) {
                        ;
                    }
                }
            }
            int j;
            for (i = 0; i < 8; i++) {
                for (j = 0; j < 8; j++) {
                    if (map[j * 2 + i * 2 * 16] == 0) {
                        {
                            int GLF_live34looplimiter0 = 0;
                            if (GLF_live34looplimiter0 >= 6) {
                                ;
                            }
                        }
                        p.x = j * 2;
                        p.y = i * 2;
                        canwalk = true;
                        {
                            {
                                bool GLF_live31c4 = _GLF_FUZZED(false);
                                if (!GLF_live31c4) {
                                    {
                                        vec3 GLF_live36color = _GLF_FUZZED((vec3(1.1, -1131.7535, 6513.2133)));
                                        vec2 GLF_live36grid = _GLF_FUZZED((mat4x2(-441.620, 521.472, 6660.6234, 487.921, 740.806, 716.139, 781.691, 7194.0003) * (vec4(0.6, -8119.7660, 2.4, 663.085) * vec4(-28.19, -7743.3626, 2.3, 3903.4214))));
                                        vec2 GLF_live36uv = _GLF_FUZZED(vec2(-483.655, -2757.6960));
                                        if (GLF_live36uv.x > (2.0 / 4.0)) {
                                            int GLF_live36count = int(GLF_live36injectionSwitch.x);
                                            {
                                                int GLF_live36looplimiter4 = 0;
                                                do {
                                                    if (GLF_live36looplimiter4 >= 5) {
                                                        break;
                                                    }
                                                    GLF_live36looplimiter4++;
                                                    {
                                                        GLF_live36color -= GLF_live36palette(vec3(float(GLF_live36obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live36injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live36injectionSwitch.x, float(GLF_live36obj.numbers[2]) * 0.1, float(GLF_live36obj.numbers[8]) * 0.1));
                                                        GLF_live36count++;
                                                    }
                                                } while (GLF_live36count != GLF_live36obj.numbers[1]);
                                            }
                                            GLF_live36grid += vec2(GLF_live36count + int(GLF_live36injectionSwitch.y), GLF_live36count + int(GLF_live36injectionSwitch.x));
                                        }
                                    }
                                    {
                                        vec2 GLF_live37coord = _GLF_FUZZED((-vec2(-2083.4425, -988.962)));
                                        int GLF_live37i = _GLF_FUZZED(19036);
                                        int GLF_live37j = _GLF_FUZZED(ivec2(-29228, -74440).t);
                                        vec4 GLF_live37res = _GLF_FUZZED(((vec4(694.784, 924.479, -6456.1571, -1.6)) - vec4(-1.5, 431.495, -1.1, 0.5)));
                                        float GLF_live37uvstep = _GLF_FUZZED(((vec4(-7.0, -9.8, -7658.6387, 4.5) == (-vec4(98.65, -2.6, -897.117, -879.764))) ? (-45.50) : (-4.1)));
                                        {
                                            GLF_live37res += texture(GLF_live37tex, GLF_live37coord + vec2(float(GLF_live37i - 1) * GLF_live37uvstep, float(GLF_live37j - 1) * GLF_live37uvstep)) * GLF_live37weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i * 3 + GLF_live37j, 9)];
                                        }
                                    }
                                    ;
                                }
                            }
                            vec2 GLF_live22coord = _GLF_FUZZED((vec3(-481.964, 15.59, -938.728) * mat2x3(333.012, 893.202, 8.9, 0.0, 23.57, 5.3)));
                            {
                                vec2 GLF_live27coord = _GLF_FUZZED(vec2(-2.4, 230.928));
                                int GLF_live27i = _GLF_FUZZED(int(false));
                                vec4 GLF_live27res = _GLF_FUZZED(vec4(774.092, 2.4, -488.968, -2.0));
                                {
                                    int GLF_live30a = _GLF_FUZZED(78700);
                                    int GLF_live30looplimiter0 = 0;
                                    vec2 GLF_live30uv = _GLF_FUZZED((mat3x2(-80.20, 1.6, 2.8, -8828.0262, -329.314, 99.65) * vec3(16.38, -0.6, 5501.2440)));
                                    {
                                        if (GLF_live30looplimiter0 >= 7) {
                                            ;
                                        }
                                        GLF_live30looplimiter0++;
                                        {
                                            GLF_live30uv.y -= step(GLF_live30injectionSwitch.y, GLF_live30uv.x);
                                            GLF_live30uv.x -= fract(tanh(GLF_live30uv.x)) / ldexp(GLF_live30injectionSwitch.y, findMSB(GLF_live30a));
                                            GLF_live30a--;
                                        }
                                    }
                                }
                                float GLF_live27uvstep = _GLF_FUZZED(-92.04);
                                {
                                    {
                                        int GLF_live27looplimiter0 = 0;
                                        for (int GLF_live27j = 0; GLF_live27j < 3; GLF_live27j++) {
                                            if (GLF_live27looplimiter0 >= 7) {
                                                break;
                                            }
                                            GLF_live27looplimiter0++;
                                            {
                                                GLF_live27res += texture(GLF_live27tex, GLF_live27coord + vec2(float(GLF_live27i - 1) * GLF_live27uvstep, float(GLF_live27j - 1) * GLF_live27uvstep)) * GLF_live27weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live27i * 3 + GLF_live27j, 9)];
                                            }
                                        }
                                    }
                                }
                            }
                            int GLF_live22i = _GLF_FUZZED((~(-80372)));
                            int GLF_live22looplimiter0 = 0;
                            {
                                {
                                    ;
                                }
                            }
                            {
                                if (GLF_live22looplimiter0 >= 3) {
                                    ;
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
                        {
                            {
                                vec2 GLF_live35coord = _GLF_FUZZED(((-1.8) + vec2(-1.5, -666.060)));
                                {
                                    {
                                        ;
                                    }
                                }
                                int GLF_live35i = _GLF_FUZZED(int(false));
                                {
                                    int GLF_live35looplimiter0 = 0;
                                    while (GLF_live35i < 1 && GLF_live35coord.x > 1.0 || GLF_live35coord.y > 1.0) {
                                        {
                                            int GLF_live38looplimiter0 = 0;
                                            if (GLF_live38looplimiter0 >= 3) {
                                                ;
                                            }
                                        }
                                        if (GLF_live35looplimiter0 >= 6) {
                                            break;
                                        }
                                        GLF_live35looplimiter0++;
                                        {
                                            if (GLF_live35coord.x > 1.0)
                                                GLF_live35coord.x -= 1.0;
                                            {
                                                vec2 GLF_live37coord = _GLF_FUZZED((+(mat3x4(2300.1875, 91.95, -7426.5598, -5046.6224, 35.12, -597.311, 159.060, 3.9, 8290.3433, 4.5, 2.0, -788.512) * vec3(-563.839, 5.0, 145.091))).xz);
                                                int GLF_live37i = _GLF_FUZZED(((75451u <= 134366u) ? 13447 : (-36236)));
                                                int GLF_live37j = _GLF_FUZZED(24880);
                                                vec4 GLF_live37res = _GLF_FUZZED(vec4(-2.3, 0.4, -6088.1554, 10.00));
                                                float GLF_live37uvstep = _GLF_FUZZED((false ? (-826.315) : (-7.2)));
                                                {
                                                    GLF_live37res += texture(GLF_live37tex, GLF_live37coord + vec2(float(GLF_live37i - 1) * GLF_live37uvstep, float(GLF_live37j - 1) * GLF_live37uvstep)) * GLF_live37weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i * 3 + GLF_live37j, 9)];
                                                }
                                            }
                                            if (GLF_live35coord.y > 1.0)
                                                GLF_live35coord.y -= 1.0;
                                            GLF_live35coord *= 2.0;
                                            GLF_live35i++;
                                        }
                                    }
                                }
                            }
                            vec2 GLF_live0a = _GLF_FUZZED(vec2(vec3(-3532.9378, 4.1, -15.20)));
                            {
                                vec3 GLF_live3color = _GLF_FUZZED(vec3(21.11, 85.24, -0.0));
                                {
                                    GLF_live3color.x += float(GLF_live3obj.numbers[1]);
                                }
                            }
                            float GLF_live0th = _GLF_FUZZED(110.619);
                            {
                                {
                                    ;
                                }
                            }
                            if (GLF_live0a.y < GLF_live0a.x) {
                                GLF_live0th = 0.5 - GLF_live0th;
                                {
                                    float GLF_live13A = _GLF_FUZZED(8.0);
                                    float GLF_live13B = _GLF_FUZZED(-1.0);
                                    {
                                        float GLF_live40A = _GLF_FUZZED(vec2(-770.825, 8.3).s);
                                        float GLF_live40B = _GLF_FUZZED(2.9);
                                        float GLF_live40C = _GLF_FUZZED(((-13.05) * (-22.83)));
                                        int GLF_live40looplimiter0 = 0;
                                        float GLF_live40temp = _GLF_FUZZED((false ? 32.51 : 706.093));
                                        float GLF_live40x0 = _GLF_FUZZED((-292.991));
                                        float GLF_live40x1 = _GLF_FUZZED(float(122021u));
                                        float GLF_live40x2 = _GLF_FUZZED(float((ivec3(27971, -40897, 21636).p ^ (-9282))));
                                        {
                                            if (GLF_live40looplimiter0 >= 6) {
                                                ;
                                            }
                                            GLF_live40looplimiter0++;
                                            {
                                                float GLF_live40h0 = GLF_live40x0 - GLF_live40x2;
                                                float GLF_live40h1 = GLF_live40x1 - GLF_live40x2;
                                                float GLF_live40k0 = GLF_live40fx(GLF_live40x0) - GLF_live40fx(GLF_live40x2);
                                                float GLF_live40k1 = GLF_live40fx(GLF_live40x1) - GLF_live40fx(GLF_live40x2);
                                                GLF_live40temp = GLF_live40x2;
                                                GLF_live40A = (((GLF_live40h1) * (GLF_live40k0)) - ((GLF_live40h0) * (GLF_live40k1))) / ((pow((GLF_live40h0), 2.0) * (GLF_live40h1)) - (pow((GLF_live40h1), 2.0) * (GLF_live40h0)));
                                                GLF_live40B = (((GLF_live40k0) - (GLF_live40A * (pow((GLF_live40h0), 2.0)))) / (GLF_live40h0));
                                                GLF_live40C = GLF_live40fx(GLF_live40x2);
                                                GLF_live40x2 = GLF_live40x2 - ((2.0 * GLF_live40C) / (GLF_live40B + sign(GLF_live40B) * sqrt(pow(GLF_live40B, 2.0) - (4.0 * GLF_live40A * GLF_live40C))));
                                                GLF_live40x0 = GLF_live40x1;
                                                GLF_live40x1 = GLF_live40temp;
                                            }
                                        }
                                    }
                                    float GLF_live13C = _GLF_FUZZED((+3.7));
                                    int GLF_live13looplimiter0 = 0;
                                    float GLF_live13temp = _GLF_FUZZED(vec3(-55.21, 49.31, -4.1).s);
                                    float GLF_live13x0 = _GLF_FUZZED(((-6.4) * (-7.2)));
                                    float GLF_live13x1 = _GLF_FUZZED(vec4(-86.46, -998.168, 1201.5266, -15.47).w);
                                    float GLF_live13x2 = _GLF_FUZZED(-9.2);
                                    while (abs(GLF_live13x2 - GLF_live13x1) >= .000000000000001) {
                                        if (GLF_live13looplimiter0 >= 7) {
                                            break;
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                        }
                                        GLF_live13looplimiter0++;
                                        {
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            float GLF_live13h0 = GLF_live13x0 - GLF_live13x2;
                                            float GLF_live13h1 = GLF_live13x1 - GLF_live13x2;
                                            float GLF_live13k0 = GLF_live13fx(GLF_live13x0) - GLF_live13fx(GLF_live13x2);
                                            float GLF_live13k1 = GLF_live13fx(GLF_live13x1) - GLF_live13fx(GLF_live13x2);
                                            GLF_live13temp = GLF_live13x2;
                                            GLF_live13A = (((GLF_live13h1) * (GLF_live13k0)) - ((GLF_live13h0) * (GLF_live13k1))) / ((pow((GLF_live13h0), 2.0) * (GLF_live13h1)) - (pow((GLF_live13h1), 2.0) * (GLF_live13h0)));
                                            GLF_live13B = (((GLF_live13k0) - (GLF_live13A * (pow((GLF_live13h0), 2.0)))) / (GLF_live13h0));
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            GLF_live13C = GLF_live13fx(GLF_live13x2);
                                            {
                                                ivec2 GLF_live38p = _GLF_FUZZED(ivec2(ivec4(752, -8565, 27884, -39850)));
                                                {
                                                    GLF_live38p.x -= 16;
                                                }
                                            }
                                            GLF_live13x2 = GLF_live13x2 - ((2.0 * GLF_live13C) / (GLF_live13B + sign(GLF_live13B) * sqrt(pow(GLF_live13B, 2.0) - (4.0 * GLF_live13A * GLF_live13C))));
                                            {
                                                int GLF_live15target = _GLF_FUZZED(14277);
                                                {
                                                    ;
                                                }
                                            }
                                            GLF_live13x0 = GLF_live13x1;
                                            GLF_live13x1 = GLF_live13temp;
                                        }
                                    }
                                }
                                {
                                    int GLF_live3h = _GLF_FUZZED(7671);
                                    {
                                        {
                                            ;
                                        }
                                        {
                                            bool GLF_live26c6 = _GLF_FUZZED(false);
                                            int GLF_live26msb8 = _GLF_FUZZED((~(-72413)));
                                            vec2 GLF_live26pos = _GLF_FUZZED((2725.6222 + vec2(80.02, 161.795)));
                                            vec3 GLF_live26setting = _GLF_FUZZED(vec3(6197.1073, -4.9, 5.1));
                                            if (!GLF_live26c6) {
                                                ;
                                            }
                                        }
                                    }
                                    int GLF_live3i = _GLF_FUZZED(60357);
                                    _GLF_struct_6 _GLF_struct_replacement_6 = _GLF_struct_6(_GLF_FUZZED(-72962), ivec2(1, 1));
                                    int GLF_live3looplimiter0 = 0;
                                    int GLF_live3pivot = _GLF_FUZZED(int(false));
                                    for (int GLF_live3j = _GLF_struct_replacement_6.GLF_live3l; GLF_live3j <= GLF_live3h - 1; GLF_live3j++) {
                                        {
                                            float GLF_live7A = _GLF_FUZZED((true ? (-((-7.8) * 35.21)) : 565.774));
                                            float GLF_live7B = _GLF_FUZZED(-8.9);
                                            float GLF_live7C = _GLF_FUZZED(((-4032.4663) - vec4(7.4, 4.1, -3.7, 91.34).y));
                                            float GLF_live7temp = _GLF_FUZZED(460.792);
                                            float GLF_live7x0 = _GLF_FUZZED(-3819.6486);
                                            float GLF_live7x1 = _GLF_FUZZED((-((-2992.3776) - 849.445)));
                                            float GLF_live7x2 = _GLF_FUZZED(vec3(-610.112, -1415.2819, -1776.8143).g);
                                            {
                                                int GLF_live7looplimiter0 = 0;
                                                {
                                                    {
                                                        int GLF_live29baseIndex = _GLF_FUZZED((ivec3(-52166, -6058, -72638)).s);
                                                        int GLF_live29data = _GLF_FUZZED(93249);
                                                        int GLF_live29looplimiter0 = 0;
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        int GLF_live29treeIndex = _GLF_FUZZED(((-14771) * (~(-13172))));
                                                        {
                                                            if (GLF_live29looplimiter0 >= 4) {
                                                                {
                                                                    vec3 GLF_live36color = _GLF_FUZZED(vec3(-218.225, -13.29, 323.491));
                                                                    vec2 GLF_live36grid = _GLF_FUZZED(vec2(-783.216, 6.3));
                                                                    {
                                                                        int GLF_live36count = int(GLF_live36injectionSwitch.x);
                                                                        {
                                                                            int GLF_live36looplimiter5 = 0;
                                                                            do {
                                                                                if (GLF_live36looplimiter5 >= 5) {
                                                                                    break;
                                                                                }
                                                                                GLF_live36looplimiter5++;
                                                                                {
                                                                                    GLF_live36color -= GLF_live36palette(vec3(float(GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live36injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live36injectionSwitch.x, 0.6, float(GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live36injectionSwitch.x), 10)]) * 0.1));
                                                                                    GLF_live36count++;
                                                                                }
                                                                            } while (GLF_live36count != GLF_live36obj.numbers[2]);
                                                                            {
                                                                                float GLF_live40A = _GLF_FUZZED(9940.5538);
                                                                                float GLF_live40B = _GLF_FUZZED((6.9));
                                                                                float GLF_live40C = _GLF_FUZZED(818.430);
                                                                                float GLF_live40temp = _GLF_FUZZED(3852.6791);
                                                                                float GLF_live40x0 = _GLF_FUZZED((-59.15));
                                                                                float GLF_live40x1 = _GLF_FUZZED(float((4966 | 40787)));
                                                                                float GLF_live40x2 = _GLF_FUZZED(((-481.687) * (-945.597)));
                                                                                {
                                                                                    float GLF_live40h0 = GLF_live40x0 - GLF_live40x2;
                                                                                    float GLF_live40h1 = GLF_live40x1 - GLF_live40x2;
                                                                                    float GLF_live40k0 = GLF_live40fx(GLF_live40x0) - GLF_live40fx(GLF_live40x2);
                                                                                    float GLF_live40k1 = GLF_live40fx(GLF_live40x1) - GLF_live40fx(GLF_live40x2);
                                                                                    GLF_live40temp = GLF_live40x2;
                                                                                    GLF_live40A = (((GLF_live40h1) * (GLF_live40k0)) - ((GLF_live40h0) * (GLF_live40k1))) / ((pow((GLF_live40h0), 2.0) * (GLF_live40h1)) - (pow((GLF_live40h1), 2.0) * (GLF_live40h0)));
                                                                                    GLF_live40B = (((GLF_live40k0) - (GLF_live40A * (pow((GLF_live40h0), 2.0)))) / (GLF_live40h0));
                                                                                    GLF_live40C = GLF_live40fx(GLF_live40x2);
                                                                                    GLF_live40x2 = GLF_live40x2 - ((2.0 * GLF_live40C) / (GLF_live40B + sign(GLF_live40B) * sqrt(pow(GLF_live40B, 2.0) - (4.0 * GLF_live40A * GLF_live40C))));
                                                                                    GLF_live40x0 = GLF_live40x1;
                                                                                    GLF_live40x1 = GLF_live40temp;
                                                                                }
                                                                            }
                                                                        }
                                                                        GLF_live36grid += vec2(GLF_live36count + GLF_live36obj.numbers[3], GLF_live36count + GLF_live36obj.numbers[3]);
                                                                    }
                                                                }
                                                                ;
                                                            }
                                                            GLF_live29looplimiter0++;
                                                            {
                                                                if (GLF_live29data <= GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].data) {
                                                                    if (GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].leftIndex == -1) {
                                                                        GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].leftIndex = GLF_live29treeIndex;
                                                                        GLF_live29makeTreeNode(GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29treeIndex, 10)], GLF_live29data);
                                                                        ;
                                                                        {
                                                                            float GLF_live40A = _GLF_FUZZED(1502.3581);
                                                                            float GLF_live40B = _GLF_FUZZED((-(68.63 - 499.234)));
                                                                            float GLF_live40C = _GLF_FUZZED(5.1);
                                                                            int GLF_live40looplimiter0 = 0;
                                                                            float GLF_live40temp = _GLF_FUZZED(62.07);
                                                                            float GLF_live40x0 = _GLF_FUZZED(-6279.8393);
                                                                            float GLF_live40x1 = _GLF_FUZZED(vec2(0.7, -3567.2246).x);
                                                                            float GLF_live40x2 = _GLF_FUZZED(-326.117);
                                                                            {
                                                                                if (GLF_live40looplimiter0 >= 6) {
                                                                                    ;
                                                                                }
                                                                                GLF_live40looplimiter0++;
                                                                                {
                                                                                    float GLF_live40h0 = GLF_live40x0 - GLF_live40x2;
                                                                                    float GLF_live40h1 = GLF_live40x1 - GLF_live40x2;
                                                                                    float GLF_live40k0 = GLF_live40fx(GLF_live40x0) - GLF_live40fx(GLF_live40x2);
                                                                                    float GLF_live40k1 = GLF_live40fx(GLF_live40x1) - GLF_live40fx(GLF_live40x2);
                                                                                    GLF_live40temp = GLF_live40x2;
                                                                                    GLF_live40A = (((GLF_live40h1) * (GLF_live40k0)) - ((GLF_live40h0) * (GLF_live40k1))) / ((pow((GLF_live40h0), 2.0) * (GLF_live40h1)) - (pow((GLF_live40h1), 2.0) * (GLF_live40h0)));
                                                                                    GLF_live40B = (((GLF_live40k0) - (GLF_live40A * (pow((GLF_live40h0), 2.0)))) / (GLF_live40h0));
                                                                                    GLF_live40C = GLF_live40fx(GLF_live40x2);
                                                                                    GLF_live40x2 = GLF_live40x2 - ((2.0 * GLF_live40C) / (GLF_live40B + sign(GLF_live40B) * sqrt(pow(GLF_live40B, 2.0) - (4.0 * GLF_live40A * GLF_live40C))));
                                                                                    GLF_live40x0 = GLF_live40x1;
                                                                                    GLF_live40x1 = GLF_live40temp;
                                                                                }
                                                                            }
                                                                        }
                                                                    } else {
                                                                        GLF_live29baseIndex = GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].leftIndex;
                                                                        ;
                                                                    }
                                                                } else {
                                                                    if (GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].rightIndex == -1) {
                                                                        GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].rightIndex = GLF_live29treeIndex;
                                                                        GLF_live29makeTreeNode(GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29treeIndex, 10)], GLF_live29data);
                                                                        ;
                                                                    } else {
                                                                        GLF_live29baseIndex = GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].rightIndex;
                                                                        ;
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
                                                    float GLF_live11result = _GLF_FUZZED(((ivec3(-5948, 44927, 70757) != ivec3(95593, 40855, -80408)) ? vec4(35.20, 0.6, -0.0, 3.4).q : 91.83));
                                                    {
                                                        GLF_live11result += 100.0;
                                                    }
                                                }
                                                while (abs(GLF_live7x2 - GLF_live7x1) >= .000000000000001) {
                                                    if (GLF_live7looplimiter0 >= 4) {
                                                        break;
                                                        {
                                                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(vec4(-94.77, -6.4, 868.704, -6.0)));
                                                            int GLF_live22i = _GLF_FUZZED(ivec2(38417, -94855).g);
                                                            int GLF_live22looplimiter0 = 0;
                                                            {
                                                                if (GLF_live22looplimiter0 >= 3) {
                                                                    {
                                                                        {
                                                                            vec2 GLF_live37coord = _GLF_FUZZED((vec4(5.4, 7383.5689, 59.86, 2015.9427) * mat2x4(-29.13, 3026.0298, 0.5, 10.89, 4329.7669, 6.3, 6.5, 52.49)));
                                                                            int GLF_live37i = _GLF_FUZZED((-(-22792)));
                                                                            vec4 GLF_live37res = _GLF_FUZZED(vec4(-9.1, -719.953, -555.673, -2.1));
                                                                            float GLF_live37uvstep = _GLF_FUZZED((-43.74));
                                                                            {
                                                                                int GLF_live37looplimiter0 = 0;
                                                                                for (int GLF_live37j = 0; GLF_live37j < 3; GLF_live37j++) {
                                                                                    if (GLF_live37looplimiter0 >= 3) {
                                                                                        break;
                                                                                    }
                                                                                    GLF_live37looplimiter0++;
                                                                                    {
                                                                                        GLF_live37res += texture(GLF_live37tex, GLF_live37coord + vec2(float(GLF_live37i - 1) * GLF_live37uvstep, float(GLF_live37j - 1) * GLF_live37uvstep)) * GLF_live37weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i * 3 + GLF_live37j, 9)];
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        int GLF_live28baseIndex = _GLF_FUZZED(60429);
                                                                        int GLF_live28data = _GLF_FUZZED(-38960);
                                                                        int GLF_live28treeIndex = _GLF_FUZZED(36869);
                                                                        {
                                                                            if (GLF_live28tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live28baseIndex, 10)].leftIndex == -1) {
                                                                                GLF_live28tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live28baseIndex, 10)].leftIndex = GLF_live28treeIndex;
                                                                                GLF_live28makeTreeNode(GLF_live28tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live28treeIndex, 10)], GLF_live28data);
                                                                                ;
                                                                            } else {
                                                                                GLF_live28baseIndex = GLF_live28tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live28baseIndex, 10)].leftIndex;
                                                                                ;
                                                                            }
                                                                        }
                                                                    }
                                                                    ;
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
                                                    }
                                                    {
                                                        int GLF_live39c = _GLF_FUZZED(-79845);
                                                        uint GLF_live39matrix_number = _GLF_FUZZED((+74604u));
                                                        int GLF_live39rows = _GLF_FUZZED(-58957);
                                                        {
                                                            int GLF_live39looplimiter0 = 0;
                                                            for (int GLF_live39r = 0; GLF_live39r < GLF_live39rows; GLF_live39r++) {
                                                                if (GLF_live39looplimiter0 >= 3) {
                                                                    break;
                                                                }
                                                                GLF_live39looplimiter0++;
                                                                {
                                                                    switch (GLF_live39matrix_number) {
                                                                        case 0u:
                                                                            GLF_live39m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                            break;
                                                                        case 1u:
                                                                            GLF_live39m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                            break;
                                                                        case 2u:
                                                                            GLF_live39m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                            break;
                                                                        case 3u:
                                                                            GLF_live39m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                            break;
                                                                        case 4u:
                                                                            GLF_live39m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                            break;
                                                                        case 5u:
                                                                            GLF_live39m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                            break;
                                                                        case 6u:
                                                                            GLF_live39m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                            break;
                                                                        case 7u:
                                                                            GLF_live39m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                            break;
                                                                        case 8u:
                                                                            GLF_live39m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                            break;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    {
                                                        int GLF_live9looplimiter0 = 0;
                                                        int GLF_live9v = _GLF_FUZZED(-24437);
                                                        {
                                                            {
                                                                int GLF_live38looplimiter1 = 0;
                                                                if (GLF_live38looplimiter1 >= 3) {
                                                                    ;
                                                                }
                                                            }
                                                            if (GLF_live9looplimiter0 >= 5) {
                                                                ;
                                                                {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                            GLF_live9looplimiter0++;
                                                            {
                                                                float GLF_live14xCoord = _GLF_FUZZED(-2728.5985);
                                                                float GLF_live14yCoord = _GLF_FUZZED(193.452);
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            {
                                                                {
                                                                    float GLF_live13A = _GLF_FUZZED((+float(true)));
                                                                    float GLF_live13B = _GLF_FUZZED(-2.0);
                                                                    {
                                                                        int GLF_live18looplimiter2 = 0;
                                                                        if (GLF_live18looplimiter2 >= 3) {
                                                                            ;
                                                                        }
                                                                    }
                                                                    float GLF_live13C = _GLF_FUZZED((false ? 4.9 : 60.20));
                                                                    float GLF_live13temp = _GLF_FUZZED(vec4(-409.505, 873.754, -634.214, -369.337).b);
                                                                    {
                                                                        {
                                                                            ;
                                                                        }
                                                                    }
                                                                    float GLF_live13x0 = _GLF_FUZZED(-7.5);
                                                                    float GLF_live13x1 = _GLF_FUZZED(73.61);
                                                                    float GLF_live13x2 = _GLF_FUZZED(float(180330u));
                                                                    {
                                                                        float GLF_live13h0 = GLF_live13x0 - GLF_live13x2;
                                                                        float GLF_live13h1 = GLF_live13x1 - GLF_live13x2;
                                                                        float GLF_live13k0 = GLF_live13fx(GLF_live13x0) - GLF_live13fx(GLF_live13x2);
                                                                        float GLF_live13k1 = GLF_live13fx(GLF_live13x1) - GLF_live13fx(GLF_live13x2);
                                                                        GLF_live13temp = GLF_live13x2;
                                                                        {
                                                                            int GLF_live34looplimiter0 = 0;
                                                                            int GLF_live34v = _GLF_FUZZED((ivec4(-81104, 60945, -20198, -79534) + 6445).z);
                                                                            {
                                                                                {
                                                                                    vec2 GLF_live37coord = _GLF_FUZZED(vec2(1.5, 8.8));
                                                                                    int GLF_live37i = _GLF_FUZZED(24123);
                                                                                    int GLF_live37looplimiter1 = 0;
                                                                                    vec4 GLF_live37res = _GLF_FUZZED(vec4(584.526, -36.38, -4.7, 5352.0590));
                                                                                    float GLF_live37uvstep = _GLF_FUZZED(23.72);
                                                                                    {
                                                                                        if (GLF_live37looplimiter1 >= 3) {
                                                                                            ;
                                                                                        }
                                                                                        GLF_live37looplimiter1++;
                                                                                        {
                                                                                            {
                                                                                                int GLF_live37looplimiter0 = 0;
                                                                                                for (int GLF_live37j = 0; GLF_live37j < 3; GLF_live37j++) {
                                                                                                    if (GLF_live37looplimiter0 >= 3) {
                                                                                                        break;
                                                                                                    }
                                                                                                    GLF_live37looplimiter0++;
                                                                                                    {
                                                                                                        GLF_live37res += texture(GLF_live37tex, GLF_live37coord + vec2(float(GLF_live37i - 1) * GLF_live37uvstep, float(GLF_live37j - 1) * GLF_live37uvstep)) * GLF_live37weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i * 3 + GLF_live37j, 9)];
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                                if (GLF_live34looplimiter0 >= 6) {
                                                                                    ;
                                                                                }
                                                                                GLF_live34looplimiter0++;
                                                                                {
                                                                                    GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                                                                                }
                                                                            }
                                                                        }
                                                                        GLF_live13A = (((GLF_live13h1) * (GLF_live13k0)) - ((GLF_live13h0) * (GLF_live13k1))) / ((pow((GLF_live13h0), 2.0) * (GLF_live13h1)) - (pow((GLF_live13h1), 2.0) * (GLF_live13h0)));
                                                                        GLF_live13B = (((GLF_live13k0) - (GLF_live13A * (pow((GLF_live13h0), 2.0)))) / (GLF_live13h0));
                                                                        GLF_live13C = GLF_live13fx(GLF_live13x2);
                                                                        {
                                                                            int GLF_live28target = _GLF_FUZZED(16567);
                                                                            {
                                                                                ;
                                                                            }
                                                                        }
                                                                        GLF_live13x2 = GLF_live13x2 - ((2.0 * GLF_live13C) / (GLF_live13B + sign(GLF_live13B) * sqrt(pow(GLF_live13B, 2.0) - (4.0 * GLF_live13A * GLF_live13C))));
                                                                        {
                                                                            int GLF_live36looplimiter4 = 0;
                                                                            if (GLF_live36looplimiter4 >= 5) {
                                                                                ;
                                                                            }
                                                                        }
                                                                        GLF_live13x0 = GLF_live13x1;
                                                                        {
                                                                            {
                                                                                ;
                                                                            }
                                                                        }
                                                                        GLF_live13x1 = GLF_live13temp;
                                                                    }
                                                                }
                                                                GLF_live9v = (4 * GLF_live9v * (1000 - GLF_live9v)) / 1000;
                                                            }
                                                            {
                                                                bool GLF_live26c3 = _GLF_FUZZED(false);
                                                                if (!GLF_live26c3) {
                                                                    ;
                                                                }
                                                            }
                                                        }
                                                        {
                                                            vec4 GLF_live21c = _GLF_FUZZED(vec4(-4.2, 779.796, -893.473, 6.7));
                                                            int GLF_live21looplimiter1 = 0;
                                                            for (int GLF_live21i = 0; GLF_live21i < 3; GLF_live21i++) {
                                                                if (GLF_live21looplimiter1 >= 7) {
                                                                    break;
                                                                }
                                                                GLF_live21looplimiter1++;
                                                                {
                                                                    if (GLF_live21c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 4)] >= 1.0) {
                                                                        GLF_live21c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 4)] = GLF_live21c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 4)] * GLF_live21c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 4)];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        {
                                                            vec2 GLF_live37coord = _GLF_FUZZED(vec2(-0.2, 0.4));
                                                            int GLF_live37i = _GLF_FUZZED((98035 ^ 10302));
                                                            int GLF_live37j = _GLF_FUZZED((6824 | (-54440)));
                                                            int GLF_live37looplimiter0 = 0;
                                                            vec4 GLF_live37res = _GLF_FUZZED(vec4(8.6, -56.08, -9.4, 4.4));
                                                            float GLF_live37uvstep = _GLF_FUZZED(-7314.4033);
                                                            {
                                                                if (GLF_live37looplimiter0 >= 3) {
                                                                    ;
                                                                }
                                                                GLF_live37looplimiter0++;
                                                                {
                                                                    GLF_live37res += texture(GLF_live37tex, GLF_live37coord + vec2(float(GLF_live37i - 1) * GLF_live37uvstep, float(GLF_live37j - 1) * GLF_live37uvstep)) * GLF_live37weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i * 3 + GLF_live37j, 9)];
                                                                }
                                                            }
                                                        }
                                                    }
                                                    GLF_live7looplimiter0++;
                                                    {
                                                        float GLF_live7h0 = GLF_live7x0 - GLF_live7x2;
                                                        float GLF_live7h1 = GLF_live7x1 - GLF_live7x2;
                                                        float GLF_live7k0 = GLF_live7fx(GLF_live7x0) - GLF_live7fx(GLF_live7x2);
                                                        float GLF_live7k1 = GLF_live7fx(GLF_live7x1) - GLF_live7fx(GLF_live7x2);
                                                        GLF_live7temp = GLF_live7x2;
                                                        GLF_live7A = (((GLF_live7h1) * (GLF_live7k0)) - ((GLF_live7h0) * (GLF_live7k1))) / ((pow((GLF_live7h0), 2.0) * (GLF_live7h1)) - (pow((GLF_live7h1), 2.0) * (GLF_live7h0)));
                                                        GLF_live7B = (((GLF_live7k0) - (GLF_live7A * (pow((GLF_live7h0), 2.0)))) / (GLF_live7h0));
                                                        GLF_live7C = GLF_live7fx(GLF_live7x2);
                                                        GLF_live7x2 = GLF_live7x2 - ((2.0 * GLF_live7C) / (GLF_live7B + sign(GLF_live7B) * sqrt(pow(GLF_live7B, 2.0) - (4.0 * GLF_live7A * GLF_live7C))));
                                                        {
                                                            int GLF_live11i = _GLF_FUZZED((ivec3(41479, -72719, -86346) ^ ivec3(43421, 37642, -58832)).p);
                                                            float GLF_live11limit = _GLF_FUZZED(-6.9);
                                                            float GLF_live11result = _GLF_FUZZED(2.0);
                                                            {
                                                                int GLF_live34v = _GLF_FUZZED((61489));
                                                                {
                                                                    GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                                                                }
                                                            }
                                                            float GLF_live11thirty_two = _GLF_FUZZED(1971.8902);
                                                            {
                                                                if ((GLF_live11i % 32) == 0) {
                                                                    GLF_live11result += 0.4;
                                                                    {
                                                                        {
                                                                            int GLF_live29result = _GLF_FUZZED((~ivec2(26198, 15372).g));
                                                                            int GLF_live29sum = _GLF_FUZZED((+(-83330)));
                                                                            if (GLF_live29result > 0) {
                                                                                GLF_live29sum += GLF_live29result;
                                                                            } else {
                                                                                {
                                                                                    ivec2 GLF_live38p = _GLF_FUZZED(ivec2(-69264, 38372));
                                                                                    {
                                                                                        GLF_live38p.y--;
                                                                                    }
                                                                                }
                                                                                {
                                                                                    int GLF_live33looplimiter1 = 0;
                                                                                    if (GLF_live33looplimiter1 >= 4) {
                                                                                        ;
                                                                                    }
                                                                                }
                                                                                switch (GLF_live29result) {
                                                                                    case -1:
                                                                                        GLF_live29sum += 1;
                                                                                        break;
                                                                                    case 0:
                                                                                        ;
                                                                                }
                                                                            }
                                                                        }
                                                                        {
                                                                            ;
                                                                        }
                                                                        {
                                                                            {
                                                                                ;
                                                                            }
                                                                        }
                                                                    }
                                                                } else {
                                                                    {
                                                                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-34.79, -128.217));
                                                                        int GLF_live22i = _GLF_FUZZED(11013);
                                                                        int GLF_live22looplimiter0 = 0;
                                                                        {
                                                                            int GLF_live34v = _GLF_FUZZED(19509);
                                                                            {
                                                                                GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                                                                            }
                                                                        }
                                                                        {
                                                                            if (GLF_live22looplimiter0 >= 3) {
                                                                                ;
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
                                                                    if (mod(float(GLF_live11i), round(GLF_live11thirty_two)) <= 0.01) {
                                                                        {
                                                                            ivec2 GLF_live38p = _GLF_FUZZED((false ? ivec2(-88369, 14994) : ivec2(40511, 84398)));
                                                                            if (GLF_live38p.x < 0) {
                                                                                GLF_live38p.y++;
                                                                            }
                                                                        }
                                                                        {
                                                                            {
                                                                                int GLF_live34i = _GLF_FUZZED(79406);
                                                                                int GLF_live34iters = _GLF_FUZZED(-32418);
                                                                                int GLF_live34looplimiter0 = 0;
                                                                                int GLF_live34v = _GLF_FUZZED(35998);
                                                                                for (GLF_live34i = 0; GLF_live34i < GLF_live34iters; GLF_live34i++) {
                                                                                    if (GLF_live34looplimiter0 >= 6) {
                                                                                        break;
                                                                                    }
                                                                                    GLF_live34looplimiter0++;
                                                                                    {
                                                                                        GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                                                                                    }
                                                                                }
                                                                            }
                                                                            int GLF_live17looplimiter0 = 0;
                                                                            {
                                                                                int GLF_live34looplimiter0 = 0;
                                                                                if (GLF_live34looplimiter0 >= 6) {
                                                                                    ;
                                                                                }
                                                                            }
                                                                            if (GLF_live17looplimiter0 >= 4) {
                                                                                ;
                                                                            }
                                                                        }
                                                                        GLF_live11result += 100.0;
                                                                    }
                                                                }
                                                                if (float(GLF_live11i) >= GLF_live11limit) {
                                                                    ;
                                                                }
                                                                {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        GLF_live7x0 = GLF_live7x1;
                                                        GLF_live7x1 = GLF_live7temp;
                                                    }
                                                    {
                                                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-7.6, 76.82));
                                                        {
                                                            int GLF_live34looplimiter0 = 0;
                                                            int GLF_live34v = _GLF_FUZZED((-16178));
                                                            {
                                                                if (GLF_live34looplimiter0 >= 6) {
                                                                    ;
                                                                }
                                                                GLF_live34looplimiter0++;
                                                                {
                                                                    GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                                                                }
                                                            }
                                                        }
                                                        int GLF_live22i = _GLF_FUZZED(((-69202) + ivec3(-70250, -95307, -71768)).y);
                                                        {
                                                            if (GLF_live22coord.x > 1.0)
                                                                GLF_live22coord.x -= 1.0;
                                                            if (GLF_live22coord.y > 1.0)
                                                                GLF_live22coord.y -= 1.0;
                                                            GLF_live22coord *= 2.0;
                                                            GLF_live22i++;
                                                        }
                                                    }
                                                    {
                                                        vec4 GLF_live21c = _GLF_FUZZED(vec4(8.3, 887.034, -68.47, 91.94));
                                                        {
                                                            vec4 GLF_live25c = _GLF_FUZZED(vec4(3842.4928, 9.2, 2661.7335, -5.4));
                                                            {
                                                                int GLF_live29baseIndex = _GLF_FUZZED(-52383);
                                                                int GLF_live29data = _GLF_FUZZED((false ? (-22119) : (-87225)));
                                                                int GLF_live29treeIndex = _GLF_FUZZED((-20915));
                                                                {
                                                                    if (GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].rightIndex == -1) {
                                                                        GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].rightIndex = GLF_live29treeIndex;
                                                                        GLF_live29makeTreeNode(GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29treeIndex, 10)], GLF_live29data);
                                                                        ;
                                                                    } else {
                                                                        GLF_live29baseIndex = GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].rightIndex;
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                            int GLF_live25looplimiter1 = 0;
                                                            for (int GLF_live25i = 0; GLF_live25i < 3; GLF_live25i++) {
                                                                if (GLF_live25looplimiter1 >= 4) {
                                                                    break;
                                                                }
                                                                GLF_live25looplimiter1++;
                                                                {
                                                                    if (GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 4)] >= 1.0) {
                                                                        GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 4)] = GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 4)] * GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 4)];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        int GLF_live21i = _GLF_FUZZED(-5554);
                                                        int GLF_live21looplimiter1 = 0;
                                                        {
                                                            if (GLF_live21looplimiter1 >= 7) {
                                                                ;
                                                            }
                                                            GLF_live21looplimiter1++;
                                                            {
                                                                {
                                                                    ivec2 GLF_live38p = _GLF_FUZZED(ivec2(-72199, -10691));
                                                                    if (GLF_live38p.x < 0) {
                                                                        GLF_live38p.y++;
                                                                    }
                                                                }
                                                                if (GLF_live21c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 4)] >= 1.0) {
                                                                    GLF_live21c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 4)] = GLF_live21c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 4)] * GLF_live21c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 4)];
                                                                    {
                                                                        vec2 GLF_live26center = _GLF_FUZZED((vec4(-61.69, -2594.8591, -1.4, -6.0) * mat2x4(-3.8, 9158.8589, 5.2, 4220.9086, 7615.0633, 4.1, -4.4, -1285.9008)));
                                                                        int GLF_live26msb8 = _GLF_FUZZED(-54568);
                                                                        vec2 GLF_live26position = _GLF_FUZZED(vec2(-70.04, -502.804));
                                                                        vec3 GLF_live26result = _GLF_FUZZED(((-9416.3983) - (false ? vec3(-170.567, -249.766, -55.39) : vec3(3606.1363, -7.0, -7.4))));
                                                                        {
                                                                            int GLF_live26looplimiter0 = 0;
                                                                            {
                                                                                int GLF_live31looplimiter0 = 0;
                                                                                if (GLF_live31looplimiter0 >= 3) {
                                                                                    ;
                                                                                }
                                                                            }
                                                                            for (int GLF_live26i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live26resolution.x), 0, 0)); GLF_live26i >= bitfieldReverse(bitfieldExtract(int(GLF_live26resolution.x), 0, 0)); GLF_live26i--) {
                                                                                if (GLF_live26looplimiter0 >= 5) {
                                                                                    {
                                                                                        int GLF_live34looplimiter0 = 0;
                                                                                        {
                                                                                            {
                                                                                                GLF_live40_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                                                            }
                                                                                        }
                                                                                        int GLF_live34v = _GLF_FUZZED(((false ? (-85717) : (-28964))));
                                                                                        {
                                                                                            if (GLF_live34looplimiter0 >= 6) {
                                                                                                ;
                                                                                            }
                                                                                            GLF_live34looplimiter0++;
                                                                                            {
                                                                                                GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    break;
                                                                                }
                                                                                GLF_live26looplimiter0++;
                                                                                {
                                                                                    vec3 GLF_live26d = _GLF_FUZZED(floor(dFdx(vec3(6.8, 8952.6639, -26.54))));
                                                                                    GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                                                                    if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 0))) {
                                                                                        continue;
                                                                                    }
                                                                                    GLF_live26result = vec3(GLF_live26d);
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    {
                                                                        int GLF_live38i = _GLF_FUZZED(ivec4(-18531, 14296, 38460, 65783).r);
                                                                        int GLF_live38looplimiter0 = 0;
                                                                        ivec2 GLF_live38p = _GLF_FUZZED(ivec2(78104, -56730));
                                                                        for (GLF_live38i = 0; GLF_live38i < 100; GLF_live38i++) {
                                                                            if (GLF_live38looplimiter0 >= 3) {
                                                                                break;
                                                                            }
                                                                            GLF_live38looplimiter0++;
                                                                            {
                                                                                GLF_live38p = GLF_live38iter(GLF_live38p);
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                {
                                                    vec2 GLF_live27coord = _GLF_FUZZED(vec2(5.7, 7575.5967));
                                                    int GLF_live27i = _GLF_FUZZED(-59434);
                                                    vec4 GLF_live27res = _GLF_FUZZED(vec4(3.6, 89.42, 569.368, -6426.4653));
                                                    float GLF_live27uvstep = _GLF_FUZZED((8048.9071 - vec4(34.78, -9.7, -23.78, 7.9).b));
                                                    {
                                                        {
                                                            int GLF_live27looplimiter0 = 0;
                                                            for (int GLF_live27j = 0; GLF_live27j < 3; GLF_live27j++) {
                                                                if (GLF_live27looplimiter0 >= 7) {
                                                                    break;
                                                                }
                                                                GLF_live27looplimiter0++;
                                                                {
                                                                    GLF_live27res += texture(GLF_live27tex, GLF_live27coord + vec2(float(GLF_live27i - 1) * GLF_live27uvstep, float(GLF_live27j - 1) * GLF_live27uvstep)) * GLF_live27weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live27i * 3 + GLF_live27j, 9)];
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
                                            }
                                        }
                                        if (GLF_live3looplimiter0 >= 4) {
                                            break;
                                        }
                                        {
                                            int GLF_live24looplimiter0 = 0;
                                            if (GLF_live24looplimiter0 >= 7) {
                                                {
                                                    {
                                                        int GLF_live33looplimiter0 = 0;
                                                        if (GLF_live33looplimiter0 >= 4) {
                                                            ;
                                                        }
                                                    }
                                                    {
                                                        ;
                                                    }
                                                }
                                                ;
                                            }
                                        }
                                        GLF_live3looplimiter0++;
                                        {
                                            if (GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3j, 10)] <= GLF_live3pivot) {
                                                GLF_live3i++;
                                                GLF_live3swap(GLF_live3i, GLF_live3j);
                                            }
                                            {
                                                vec2 GLF_live8coord = _GLF_FUZZED((vec2(94.18, -6.0)));
                                                {
                                                    float GLF_live40A = _GLF_FUZZED((-(-2.0)));
                                                    float GLF_live40B = _GLF_FUZZED(-21.85);
                                                    float GLF_live40C = _GLF_FUZZED(((-625.528) * (false ? 10.35 : (-6.5))));
                                                    int GLF_live40looplimiter0 = 0;
                                                    float GLF_live40temp = _GLF_FUZZED(-1951.7953);
                                                    float GLF_live40x0 = _GLF_FUZZED(3606.2849);
                                                    float GLF_live40x1 = _GLF_FUZZED(-942.608);
                                                    float GLF_live40x2 = _GLF_FUZZED(-81.49);
                                                    while (abs(GLF_live40x2 - GLF_live40x1) >= .000000000000001) {
                                                        if (GLF_live40looplimiter0 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live40looplimiter0++;
                                                        {
                                                            float GLF_live40h0 = GLF_live40x0 - GLF_live40x2;
                                                            float GLF_live40h1 = GLF_live40x1 - GLF_live40x2;
                                                            float GLF_live40k0 = GLF_live40fx(GLF_live40x0) - GLF_live40fx(GLF_live40x2);
                                                            float GLF_live40k1 = GLF_live40fx(GLF_live40x1) - GLF_live40fx(GLF_live40x2);
                                                            GLF_live40temp = GLF_live40x2;
                                                            GLF_live40A = (((GLF_live40h1) * (GLF_live40k0)) - ((GLF_live40h0) * (GLF_live40k1))) / ((pow((GLF_live40h0), 2.0) * (GLF_live40h1)) - (pow((GLF_live40h1), 2.0) * (GLF_live40h0)));
                                                            GLF_live40B = (((GLF_live40k0) - (GLF_live40A * (pow((GLF_live40h0), 2.0)))) / (GLF_live40h0));
                                                            GLF_live40C = GLF_live40fx(GLF_live40x2);
                                                            GLF_live40x2 = GLF_live40x2 - ((2.0 * GLF_live40C) / (GLF_live40B + sign(GLF_live40B) * sqrt(pow(GLF_live40B, 2.0) - (4.0 * GLF_live40A * GLF_live40C))));
                                                            GLF_live40x0 = GLF_live40x1;
                                                            GLF_live40x1 = GLF_live40temp;
                                                        }
                                                    }
                                                }
                                                int GLF_live8i = _GLF_FUZZED(-27579);
                                                {
                                                    int GLF_live21i = _GLF_FUZZED(ivec2(69630, -20178).x);
                                                    float GLF_live21limit = _GLF_FUZZED((vec2(558.268, 156.756)).r);
                                                    int GLF_live21looplimiter0 = 0;
                                                    float GLF_live21ref = _GLF_FUZZED(2.6);
                                                    {
                                                        int GLF_live34looplimiter0 = 0;
                                                        int GLF_live34v = _GLF_FUZZED(-88614);
                                                        {
                                                            if (GLF_live34looplimiter0 >= 6) {
                                                                ;
                                                            }
                                                            GLF_live34looplimiter0++;
                                                            {
                                                                {
                                                                    float GLF_live40A = _GLF_FUZZED(806.971);
                                                                    float GLF_live40B = _GLF_FUZZED(5.4);
                                                                    float GLF_live40C = _GLF_FUZZED(7.6);
                                                                    int GLF_live40looplimiter0 = 0;
                                                                    float GLF_live40temp = _GLF_FUZZED(5046.8806);
                                                                    float GLF_live40x0 = _GLF_FUZZED((-(-99.25)));
                                                                    float GLF_live40x1 = _GLF_FUZZED(vec3(-8283.7770, 7562.0000, -726.086).t);
                                                                    float GLF_live40x2 = _GLF_FUZZED((true ? 245.545 : float(-46657)));
                                                                    {
                                                                        if (GLF_live40looplimiter0 >= 6) {
                                                                            ;
                                                                        }
                                                                        GLF_live40looplimiter0++;
                                                                        {
                                                                            float GLF_live40h0 = GLF_live40x0 - GLF_live40x2;
                                                                            float GLF_live40h1 = GLF_live40x1 - GLF_live40x2;
                                                                            float GLF_live40k0 = GLF_live40fx(GLF_live40x0) - GLF_live40fx(GLF_live40x2);
                                                                            float GLF_live40k1 = GLF_live40fx(GLF_live40x1) - GLF_live40fx(GLF_live40x2);
                                                                            GLF_live40temp = GLF_live40x2;
                                                                            GLF_live40A = (((GLF_live40h1) * (GLF_live40k0)) - ((GLF_live40h0) * (GLF_live40k1))) / ((pow((GLF_live40h0), 2.0) * (GLF_live40h1)) - (pow((GLF_live40h1), 2.0) * (GLF_live40h0)));
                                                                            GLF_live40B = (((GLF_live40k0) - (GLF_live40A * (pow((GLF_live40h0), 2.0)))) / (GLF_live40h0));
                                                                            GLF_live40C = GLF_live40fx(GLF_live40x2);
                                                                            GLF_live40x2 = GLF_live40x2 - ((2.0 * GLF_live40C) / (GLF_live40B + sign(GLF_live40B) * sqrt(pow(GLF_live40B, 2.0) - (4.0 * GLF_live40A * GLF_live40C))));
                                                                            GLF_live40x0 = GLF_live40x1;
                                                                            GLF_live40x1 = GLF_live40temp;
                                                                        }
                                                                    }
                                                                }
                                                                GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                                                            }
                                                        }
                                                    }
                                                    float GLF_live21s = _GLF_FUZZED(-4.9);
                                                    {
                                                        if (GLF_live21looplimiter0 >= 7) {
                                                            ;
                                                            {
                                                                ivec2 GLF_live38p = _GLF_FUZZED((+ivec2(-42190, 98738)));
                                                                {
                                                                    GLF_live38p.y--;
                                                                }
                                                            }
                                                        }
                                                        GLF_live21looplimiter0++;
                                                        {
                                                            if (mod(float(GLF_live21i), GLF_live21ref) <= 0.01) {
                                                                GLF_live21s += 0.2;
                                                            }
                                                            if (float(GLF_live21i) >= GLF_live21limit) {
                                                                ;
                                                            }
                                                        }
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
                                                {
                                                    float GLF_live40A = _GLF_FUZZED(vec4(7357.8619, -2.8, 0.7, -6097.9469).s);
                                                    float GLF_live40B = _GLF_FUZZED((-699.150));
                                                    float GLF_live40C = _GLF_FUZZED((2.1));
                                                    int GLF_live40looplimiter0 = 0;
                                                    float GLF_live40temp = _GLF_FUZZED(3.5);
                                                    float GLF_live40x0 = _GLF_FUZZED(478.511);
                                                    float GLF_live40x1 = _GLF_FUZZED(((-718.623) - (-47.40)));
                                                    float GLF_live40x2 = _GLF_FUZZED(79.05);
                                                    {
                                                        if (GLF_live40looplimiter0 >= 6) {
                                                            ;
                                                        }
                                                        GLF_live40looplimiter0++;
                                                        {
                                                            float GLF_live40h0 = GLF_live40x0 - GLF_live40x2;
                                                            float GLF_live40h1 = GLF_live40x1 - GLF_live40x2;
                                                            float GLF_live40k0 = GLF_live40fx(GLF_live40x0) - GLF_live40fx(GLF_live40x2);
                                                            float GLF_live40k1 = GLF_live40fx(GLF_live40x1) - GLF_live40fx(GLF_live40x2);
                                                            GLF_live40temp = GLF_live40x2;
                                                            GLF_live40A = (((GLF_live40h1) * (GLF_live40k0)) - ((GLF_live40h0) * (GLF_live40k1))) / ((pow((GLF_live40h0), 2.0) * (GLF_live40h1)) - (pow((GLF_live40h1), 2.0) * (GLF_live40h0)));
                                                            GLF_live40B = (((GLF_live40k0) - (GLF_live40A * (pow((GLF_live40h0), 2.0)))) / (GLF_live40h0));
                                                            GLF_live40C = GLF_live40fx(GLF_live40x2);
                                                            GLF_live40x2 = GLF_live40x2 - ((2.0 * GLF_live40C) / (GLF_live40B + sign(GLF_live40B) * sqrt(pow(GLF_live40B, 2.0) - (4.0 * GLF_live40A * GLF_live40C))));
                                                            GLF_live40x0 = GLF_live40x1;
                                                            GLF_live40x1 = GLF_live40temp;
                                                        }
                                                    }
                                                }
                                                {
                                                    int GLF_live25looplimiter0 = 0;
                                                    if (GLF_live25looplimiter0 >= 4) {
                                                        ;
                                                    }
                                                }
                                                vec4 GLF_live8res = _GLF_FUZZED(vec4(-389.440, 967.682, -8040.0818, -5.3));
                                                float GLF_live8uvstep = _GLF_FUZZED(1.7);
                                                {
                                                    int GLF_live8looplimiter0 = 0;
                                                    for (int GLF_live8j = 0; GLF_live8j < 3; GLF_live8j++) {
                                                        if (GLF_live8looplimiter0 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live8looplimiter0++;
                                                        {
                                                            int GLF_live29baseIndex = _GLF_FUZZED((53452 | 29289));
                                                            {
                                                                GLF_live29baseIndex = GLF_live29tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29baseIndex, 10)].leftIndex;
                                                                ;
                                                            }
                                                        }
                                                        {
                                                            GLF_live8res += texture(GLF_live8tex, GLF_live8coord + vec2(float(GLF_live8i - 1) * GLF_live8uvstep, float(GLF_live8j - 1) * GLF_live8uvstep)) * GLF_live8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i * 3 + GLF_live8j, 9)];
                                                        }
                                                    }
                                                }
                                                {
                                                    {
                                                        ;
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
                            }
                        }
                    }
                    {
                        int GLF_live38looplimiter1 = 0;
                        ivec2 GLF_live38p = _GLF_FUZZED(ivec2(-85485, -26660));
                        {
                            if (GLF_live38looplimiter1 >= 3) {
                                ;
                            }
                            GLF_live38looplimiter1++;
                            {
                                GLF_live38p.x -= 16;
                            }
                        }
                    }
                    {
                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(1.7, -3.9));
                        int GLF_live22i = _GLF_FUZZED(int(false));
                        {
                            if (GLF_live22coord.x > 1.0)
                                GLF_live22coord.x -= 1.0;
                            if (GLF_live22coord.y > 1.0)
                                GLF_live22coord.y -= 1.0;
                            {
                                int GLF_live34v = _GLF_FUZZED(((-20766) & (ivec2(-73656, 39884).r - 84658)));
                                {
                                    GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                                }
                            }
                            GLF_live22coord *= 2.0;
                            GLF_live22i++;
                        }
                    }
                }
            }
            map[(p.x) + (p.y) * 16] = 1;
            {
                {
                    {
                        ;
                    }
                }
                vec2 GLF_live2coord = _GLF_FUZZED(vec2(-6883.0431, -1.9));
                int GLF_live2i = _GLF_FUZZED(11939);
                vec4 GLF_live2texel = _GLF_FUZZED((vec4(4.3, 79.96, -2388.9159, -7.3) + (-137.051)));
                {
                    GLF_live2coord = GLF_live2texel.xz + GLF_live2texel.yy;
                    GLF_live2coord = floor(GLF_live2coord * 256.0) / 256.0;
                    GLF_live2texel = texture(GLF_live2tex, GLF_live2coord);
                    GLF_live2i++;
                }
            }
            {
                float GLF_live13x2 = _GLF_FUZZED((-6426.5023));
                if (GLF_live13x2 <= -0.9 && GLF_live13x2 >= -1.1) {
                    GLF_live13_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } else {
                    {
                        int GLF_live27looplimiter1 = 0;
                        if (GLF_live27looplimiter1 >= 7) {
                            ;
                        }
                    }
                    GLF_live13_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                }
            }
            {
                int GLF_live17looplimiter0 = 0;
                if (GLF_live17looplimiter0 >= 4) {
                    ;
                }
            }
            {
                vec2 GLF_live22coord = _GLF_FUZZED(vec2(-829.272, -850.765));
                vec4 GLF_live22res = _GLF_FUZZED((mat2x4(-753.536, 11.45, 72.51, -6.3, -97.31, -9.7, -87.47, 85.15) * vec2(-960.254, 986.226)));
                if (GLF_live22coord.x < 1.0 && GLF_live22coord.y < 1.0) {
                    GLF_live22res = texture(GLF_live22tex, GLF_live22coord);
                }
            }
            {
                int GLF_live9v = _GLF_FUZZED((74431 + (true ? 75559 : (33146))));
                {
                    GLF_live9v = (4 * GLF_live9v * (1000 - GLF_live9v)) / 1000;
                }
                {
                    float GLF_live13x2 = _GLF_FUZZED(-0.1);
                    if (GLF_live13x2 <= -0.9 && GLF_live13x2 >= -1.1) {
                        GLF_live13_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    } else {
                        {
                            vec2 GLF_live18color = _GLF_FUZZED(vec2(343.084, 5840.5532));
                            vec3 GLF_live18vecCoor = _GLF_FUZZED(vec3(64.64, 7.1, -44.51));
                            {
                                {
                                    int GLF_live25i = _GLF_FUZZED((~(82814 - 57447)));
                                    float GLF_live25ref = _GLF_FUZZED(float(41282));
                                    float GLF_live25s = _GLF_FUZZED(72.42);
                                    if (mod(float(GLF_live25i), GLF_live25ref) <= 0.01) {
                                        GLF_live25s += 0.2;
                                    }
                                }
                                GLF_live18color = fract(sin(GLF_live18vecCoor.yx - trunc(float(GLF_live18data[1]))));
                                GLF_live18color[1] *= atan(faceforward(GLF_live18injectionSwitch, GLF_live18color.xx, GLF_live18vecCoor.yx).y);
                                ;
                            }
                        }
                        GLF_live13_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                    }
                }
            }
        } else {
            {
                int GLF_live34looplimiter0 = 0;
                int GLF_live34v = _GLF_FUZZED((+((-5386) & (-20138))));
                {
                    if (GLF_live34looplimiter0 >= 6) {
                        ;
                    }
                    GLF_live34looplimiter0++;
                    {
                        GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                    }
                }
            }
            {
                int GLF_live5looplimiter0 = 0;
                if (GLF_live5looplimiter0 >= 6) {
                    ;
                }
                {
                    float GLF_live28v = _GLF_FUZZED(6.6);
                    if (GLF_live28v < float(GLF_live28search(6))) {
                        ;
                    }
                }
            }
            _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(bvec3(true, true, true), _GLF_struct_1(_GLF_struct_2(uvec2(1u, 1u), uvec4(1u, 1u, 1u, 1u), uvec3(1u, 1u, 1u)), bvec4(true, true, true, true), _GLF_struct_3(bvec4(true, true, true, true), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_4(vec2(1.0, 1.0), bvec2(true, true), mat2(1.0, 1.0, 1.0, 1.0), ivec2(1, 1))), ivec2(1, 1), v % directions);
            v += directions;
            if (_GLF_struct_replacement_0.d >= 0 && p.x > 0 && map[(p.x - 2) + (p.y) * 16] == 0) {
                {
                    bool GLF_live26c7 = _GLF_FUZZED(true);
                    int GLF_live26msb8 = _GLF_FUZZED(int(false));
                    vec2 GLF_live26pos = _GLF_FUZZED(vec2(925.567, -8.8));
                    vec3 GLF_live26setting = _GLF_FUZZED(vec3(5546.2108, -9.6, -4.2));
                    if (!GLF_live26c7) {
                        ;
                    }
                }
                _GLF_struct_replacement_0.d--;
                map[(p.x) + (p.y) * 16] = 1;
                map[(p.x - 1) + (p.y) * 16] = 1;
                {
                    float GLF_live11result = _GLF_FUZZED(-9.1);
                    {
                        GLF_live11result += 0.4;
                    }
                    {
                        vec2 GLF_live17coord = _GLF_FUZZED(vec2(-27.88, 3.1));
                        int GLF_live17i = _GLF_FUZZED(-77182);
                        {
                            if (GLF_live17coord.x > 1.0)
                                GLF_live17coord.x -= 1.0;
                            if (GLF_live17coord.y > 1.0)
                                GLF_live17coord.y -= 1.0;
                            GLF_live17coord *= 2.0;
                            GLF_live17i++;
                        }
                    }
                }
                map[(p.x - 2) + (p.y) * 16] = 1;
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
                p.x -= 2;
            }
            if (_GLF_struct_replacement_0.d >= 0 && p.y > 0 && map[(p.x) + (p.y - 2) * 16] == 0) {
                _GLF_struct_replacement_0.d--;
                map[(p.x) + (p.y) * 16] = 1;
                map[(p.x) + (p.y - 1) * 16] = 1;
                {
                    int GLF_live24i = _GLF_FUZZED(ivec4(-99742, -61475, -88107, -44315).z);
                    if (GLF_live24i >= int(GLF_live24resolution.x)) {
                        ;
                    }
                }
                {
                    {
                        int GLF_live27looplimiter0 = 0;
                        if (GLF_live27looplimiter0 >= 7) {
                            ;
                        }
                    }
                    {
                        {
                            int GLF_live18i = _GLF_FUZZED(-33846);
                            int GLF_live18looplimiter2 = 0;
                            {
                                if (GLF_live18looplimiter2 >= 3) {
                                    ;
                                }
                                GLF_live18looplimiter2++;
                                {
                                    vec2 GLF_live37coord = _GLF_FUZZED(((1.3) * (vec4(1.1, 197.035, 6.1, -7511.8569) * mat2x4(-6746.0444, 3.3, 320.263, 5.6, 44.71, 567.464, -50.17, 301.004))));
                                    int GLF_live37looplimiter1 = 0;
                                    vec4 GLF_live37res = _GLF_FUZZED(vec4(-0.2, -6.2, 4.2, 379.365));
                                    float GLF_live37uvstep = _GLF_FUZZED(85.43);
                                    for (int GLF_live37i = 0; GLF_live37i < 3; GLF_live37i++) {
                                        if (GLF_live37looplimiter1 >= 3) {
                                            break;
                                        }
                                        GLF_live37looplimiter1++;
                                        {
                                            {
                                                int GLF_live37looplimiter0 = 0;
                                                for (int GLF_live37j = 0; GLF_live37j < 3; GLF_live37j++) {
                                                    if (GLF_live37looplimiter0 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live37looplimiter0++;
                                                    {
                                                        GLF_live37res += texture(GLF_live37tex, GLF_live37coord + vec2(float(GLF_live37i - 1) * GLF_live37uvstep, float(GLF_live37j - 1) * GLF_live37uvstep)) * GLF_live37weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i * 3 + GLF_live37j, 9)];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                {
                                    ivec2 GLF_live23pos = _GLF_FUZZED(ivec2(65871, 79217));
                                    {
                                        if (GLF_live23pos.x < GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)] + 15 && GLF_live23pos.x > GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)] - 15) {
                                            float GLF_live23p = (15.0 - abs(float(GLF_live23pos.x - GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)]))) / 15.0;
                                            ;
                                        }
                                        GLF_live23pos.y++;
                                    }
                                }
                                {
                                    {
                                        vec2 GLF_live37coord = _GLF_FUZZED((vec2(-3.2, 3311.0995) * mat2(8131.9116, -5.7, 75.43, -1.2)));
                                        int GLF_live37i = _GLF_FUZZED(84592);
                                        int GLF_live37looplimiter0 = 0;
                                        vec4 GLF_live37res = _GLF_FUZZED((81.23 * vec4(1.2, 4.0, 3.1, -709.808)));
                                        float GLF_live37uvstep = _GLF_FUZZED(-744.331);
                                        for (int GLF_live37j = 0; GLF_live37j < 3; GLF_live37j++) {
                                            if (GLF_live37looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live37looplimiter0++;
                                            {
                                                GLF_live37res += texture(GLF_live37tex, GLF_live37coord + vec2(float(GLF_live37i - 1) * GLF_live37uvstep, float(GLF_live37j - 1) * GLF_live37uvstep)) * GLF_live37weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i * 3 + GLF_live37j, 9)];
                                            }
                                        }
                                    }
                                    GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] = GLF_live18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)];
                                }
                            }
                            {
                                ivec2 GLF_live23pos = _GLF_FUZZED(ivec2(88800, -31665));
                                {
                                    if (GLF_live23pos.x < GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)] + 15 && GLF_live23pos.x > GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)] - 15) {
                                        float GLF_live23p = (15.0 - abs(float(GLF_live23pos.x - GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)]))) / 15.0;
                                        {
                                            int GLF_live28result = _GLF_FUZZED(-77267);
                                            int GLF_live28sum = _GLF_FUZZED(-49381);
                                            if (GLF_live28result > 0) {
                                                GLF_live28sum += GLF_live28result;
                                            } else {
                                                switch (GLF_live28result) {
                                                    case -1:
                                                        GLF_live28sum += 1;
                                                        break;
                                                    case 0:
                                                        ;
                                                }
                                            }
                                        }
                                        ;
                                    }
                                    GLF_live23pos.y++;
                                }
                            }
                        }
                        ;
                    }
                }
                {
                    vec3 GLF_live16color = _GLF_FUZZED((vec3(70.84, -1.9, -22.67) - (-45.91)));
                    {
                        {
                            int GLF_live38looplimiter1 = 0;
                            ivec2 GLF_live38p = _GLF_FUZZED(ivec2(43750, -21670));
                            {
                                if (GLF_live38looplimiter1 >= 3) {
                                    ;
                                }
                                GLF_live38looplimiter1++;
                                {
                                    GLF_live38p.x -= 16;
                                }
                            }
                        }
                        {
                            vec2 GLF_live35coord = _GLF_FUZZED(vec2(-14.96));
                            int GLF_live35i = _GLF_FUZZED(int(false));
                            {
                                if (GLF_live35coord.x > 1.0)
                                    GLF_live35coord.x -= 1.0;
                                if (GLF_live35coord.y > 1.0)
                                    GLF_live35coord.y -= 1.0;
                                GLF_live35coord *= 2.0;
                                GLF_live35i++;
                            }
                        }
                        {
                            int GLF_live37looplimiter1 = 0;
                            if (GLF_live37looplimiter1 >= 3) {
                                ;
                            }
                        }
                        GLF_live16color.z += float(GLF_live16obj.numbers[7]);
                    }
                    {
                        vec2 GLF_live31pos = _GLF_FUZZED(vec2(0.2, 4380.3359));
                        vec3 GLF_live31setting = _GLF_FUZZED((float(40601) + vec3(277.676, 2234.9846, 5.5)));
                        {
                            ;
                        }
                    }
                }
                map[(p.x) + (p.y - 2) * 16] = 1;
                p.y -= 2;
            }
            {
                int GLF_live9looplimiter0 = 0;
                {
                    float GLF_live25s = _GLF_FUZZED((false ? (-55.33) : vec3(-5.3, 8.7, -5.3).g));
                    {
                        GLF_live25s += 0.2;
                    }
                    {
                        {
                            ;
                        }
                    }
                }
                if (GLF_live9looplimiter0 >= 5) {
                    ;
                }
                {
                    vec2 GLF_live37coord = _GLF_FUZZED(vec2(-97.34, -6.1));
                    int GLF_live37looplimiter1 = 0;
                    vec4 GLF_live37res = _GLF_FUZZED((vec2(9914.3222, -87.96) * mat4x2(mat2x4(321.991, -4124.5664, 446.077, -6734.8757, 719.241, 565.797, -3.5, 69.89))));
                    float GLF_live37uvstep = _GLF_FUZZED((333.768 * (-798.260)));
                    for (int GLF_live37i = 0; GLF_live37i < 3; GLF_live37i++) {
                        if (GLF_live37looplimiter1 >= 3) {
                            break;
                        }
                        GLF_live37looplimiter1++;
                        {
                            {
                                int GLF_live37looplimiter0 = 0;
                                for (int GLF_live37j = 0; GLF_live37j < 3; GLF_live37j++) {
                                    if (GLF_live37looplimiter0 >= 3) {
                                        break;
                                    }
                                    GLF_live37looplimiter0++;
                                    {
                                        GLF_live37res += texture(GLF_live37tex, GLF_live37coord + vec2(float(GLF_live37i - 1) * GLF_live37uvstep, float(GLF_live37j - 1) * GLF_live37uvstep)) * GLF_live37weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i * 3 + GLF_live37j, 9)];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (_GLF_struct_replacement_0.d >= 0 && p.x < 14 && map[(p.x + 2) + (p.y) * 16] == 0) {
                {
                    {
                        GLF_live13_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    }
                }
                {
                    float GLF_live25s = _GLF_FUZZED(9.3);
                    {
                        GLF_live25s += 0.2;
                    }
                }
                _GLF_struct_replacement_0.d--;
                map[(p.x) + (p.y) * 16] = 1;
                map[(p.x + 1) + (p.y) * 16] = 1;
                map[(p.x + 2) + (p.y) * 16] = 1;
                p.x += 2;
            }
            if (_GLF_struct_replacement_0.d >= 0 && p.y < 14 && map[(p.x) + (p.y + 2) * 16] == 0) {
                _GLF_struct_replacement_0.d--;
                map[(p.x) + (p.y) * 16] = 1;
                {
                    vec3 GLF_live31d = _GLF_FUZZED(vec3(-381.441, 8873.1516, -1.0));
                    {
                        int GLF_live38looplimiter1 = 0;
                        ivec2 GLF_live38p = _GLF_FUZZED((46256 + ivec2(ivec4(-79323, 23530, 43884, 87771))).ss);
                        {
                            if (GLF_live38looplimiter1 >= 3) {
                                ;
                            }
                            GLF_live38looplimiter1++;
                            {
                                GLF_live38p.x -= 16;
                            }
                        }
                    }
                    if (length(GLF_live31d) <= 0.0) {
                        ;
                    }
                }
                map[(p.x) + (p.y + 1) * 16] = 1;
                map[(p.x) + (p.y + 2) * 16] = 1;
                p.y += 2;
            }
            {
                {
                    ivec2 GLF_live38p = _GLF_FUZZED((true ? ivec2(-83062, -36307) : ivec2(ivec3(-10931, 19518, -23412))));
                    {
                        GLF_live38p.y--;
                    }
                }
                vec2 GLF_live22coord = _GLF_FUZZED(vec2(9.5, -171.818).xx);
                if (GLF_live22coord.y > 1.0)
                    GLF_live22coord.y -= 1.0;
            }
            {
                _GLF_struct_5 _GLF_struct_replacement_5 = _GLF_struct_5(vec4(1.0, 1.0, 1.0, 1.0), 0, uvec2(1u, 1u), uvec2(1u, 1u), ivec4(1, 1, 1, 1), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                if (_GLF_struct_replacement_5.GLF_live1looplimiter0 >= 7) {
                    ;
                }
                {
                    {
                        int GLF_live9i = _GLF_FUZZED(99955);
                        int GLF_live9iters = _GLF_FUZZED(86395);
                        int GLF_live9v = _GLF_FUZZED(ivec2(-88761, -81174).s);
                        {
                            {
                                int GLF_live24looplimiter1 = 0;
                                if (GLF_live24looplimiter1 >= 7) {
                                    ;
                                }
                            }
                            {
                                int GLF_live27looplimiter1 = 0;
                                if (GLF_live27looplimiter1 >= 7) {
                                    ;
                                }
                            }
                            int GLF_live9looplimiter0 = 0;
                            for (GLF_live9i = 0; GLF_live9i < GLF_live9iters; GLF_live9i++) {
                                if (GLF_live9looplimiter0 >= 5) {
                                    break;
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
                                }
                                {
                                    vec2 GLF_live27coord = _GLF_FUZZED((vec2(-54.11, 0.0) * mat2(8.8, 5.8, -1.6, -643.841)));
                                    {
                                        int GLF_live34i = _GLF_FUZZED((ivec3(26412, -30083, -62303) & 83740).t);
                                        int GLF_live34iters = _GLF_FUZZED(-76241);
                                        int GLF_live34looplimiter0 = 0;
                                        int GLF_live34v = _GLF_FUZZED(39239);
                                        for (GLF_live34i = 0; GLF_live34i < GLF_live34iters; GLF_live34i++) {
                                            if (GLF_live34looplimiter0 >= 6) {
                                                break;
                                            }
                                            GLF_live34looplimiter0++;
                                            {
                                                GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                                            }
                                        }
                                    }
                                    int GLF_live27i = _GLF_FUZZED(34416);
                                    int GLF_live27looplimiter0 = 0;
                                    vec4 GLF_live27res = _GLF_FUZZED(vec4(4737.7361, 6.4, -824.242, -329.385));
                                    float GLF_live27uvstep = _GLF_FUZZED(float(18038u));
                                    for (int GLF_live27j = 0; GLF_live27j < 3; GLF_live27j++) {
                                        if (GLF_live27looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live27looplimiter0++;
                                        {
                                            GLF_live27res += texture(GLF_live27tex, GLF_live27coord + vec2(float(GLF_live27i - 1) * GLF_live27uvstep, float(GLF_live27j - 1) * GLF_live27uvstep)) * GLF_live27weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live27i * 3 + GLF_live27j, 9)];
                                        }
                                    }
                                }
                                {
                                    int GLF_live23looplimiter0 = 0;
                                    ivec2 GLF_live23pos = _GLF_FUZZED(ivec2(-41036, 35086));
                                    {
                                        if (GLF_live23looplimiter0 >= 5) {
                                            ;
                                        }
                                        GLF_live23looplimiter0++;
                                        {
                                            if (GLF_live23pos.x < GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)] + 15 && GLF_live23pos.x > GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)] - 15) {
                                                float GLF_live23p = (15.0 - abs(float(GLF_live23pos.x - GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)]))) / 15.0;
                                                ;
                                            }
                                            GLF_live23pos.y++;
                                        }
                                        {
                                            int GLF_live40looplimiter0 = 0;
                                            if (GLF_live40looplimiter0 >= 6) {
                                                ;
                                            }
                                        }
                                    }
                                }
                                GLF_live9looplimiter0++;
                                {
                                    GLF_live9v = (4 * GLF_live9v * (1000 - GLF_live9v)) / 1000;
                                    {
                                        int GLF_live15looplimiter0 = 0;
                                        if (GLF_live15looplimiter0 >= 5) {
                                            ;
                                        }
                                        {
                                            int GLF_live18i = _GLF_FUZZED(94080);
                                            int GLF_live18k = _GLF_FUZZED(52401);
                                            int GLF_live18mid = _GLF_FUZZED(ivec3(-90677, 53867, -9832).p);
                                            {
                                                int GLF_live18looplimiter1 = 0;
                                                while (GLF_live18i < GLF_live18N && GLF_live18i <= GLF_live18mid) {
                                                    {
                                                        vec2 GLF_live27coord = _GLF_FUZZED(vec2(88.48, -56.66));
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        vec4 GLF_live27res = _GLF_FUZZED((mat3x4(177.264, 2.6, -8474.0195, -866.279, 184.475, 4.5, -9.4, 622.594, 97.97, -145.381, 5651.6754, -989.697) * vec3(4.5, -857.072, -7.8)));
                                                        float GLF_live27uvstep = _GLF_FUZZED(4584.1601);
                                                        {
                                                            int GLF_live27looplimiter1 = 0;
                                                            for (int GLF_live27i = 0; GLF_live27i < 3; GLF_live27i++) {
                                                                if (GLF_live27looplimiter1 >= 7) {
                                                                    break;
                                                                }
                                                                GLF_live27looplimiter1++;
                                                                {
                                                                    {
                                                                        int GLF_live27looplimiter0 = 0;
                                                                        for (int GLF_live27j = 0; GLF_live27j < 3; GLF_live27j++) {
                                                                            if (GLF_live27looplimiter0 >= 7) {
                                                                                break;
                                                                                {
                                                                                    int GLF_live39looplimiter7 = 0;
                                                                                    if (GLF_live39looplimiter7 >= 3) {
                                                                                        ;
                                                                                    }
                                                                                }
                                                                            }
                                                                            GLF_live27looplimiter0++;
                                                                            {
                                                                                GLF_live27res += texture(GLF_live27tex, GLF_live27coord + vec2(float(GLF_live27i - 1) * GLF_live27uvstep, float(GLF_live27j - 1) * GLF_live27uvstep)) * GLF_live27weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live27i * 3 + GLF_live27j, 9)];
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (GLF_live18looplimiter1 >= 3) {
                                                        break;
                                                    }
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    GLF_live18looplimiter1++;
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    {
                                                        GLF_live18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18k++, 10)] = GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i++, 10)];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                {
                                    int GLF_live39cols = _GLF_FUZZED(-52396);
                                    int GLF_live39looplimiter1 = 0;
                                    uint GLF_live39matrix_number = _GLF_FUZZED(124289u);
                                    int GLF_live39rows = _GLF_FUZZED(-81424);
                                    for (int GLF_live39c = 0; GLF_live39c < GLF_live39cols; GLF_live39c++) {
                                        if (GLF_live39looplimiter1 >= 3) {
                                            break;
                                        }
                                        GLF_live39looplimiter1++;
                                        {
                                            {
                                                int GLF_live39looplimiter0 = 0;
                                                for (int GLF_live39r = 0; GLF_live39r < GLF_live39rows; GLF_live39r++) {
                                                    if (GLF_live39looplimiter0 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live39looplimiter0++;
                                                    {
                                                        switch (GLF_live39matrix_number) {
                                                            case 0u:
                                                                GLF_live39m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                break;
                                                            case 1u:
                                                                GLF_live39m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                break;
                                                            case 2u:
                                                                GLF_live39m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                break;
                                                            case 3u:
                                                                GLF_live39m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                break;
                                                            case 4u:
                                                                GLF_live39m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                break;
                                                            case 5u:
                                                                GLF_live39m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
                                                                break;
                                                            case 6u:
                                                                GLF_live39m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 2)] = GLF_live39one;
                                                                break;
                                                            case 7u:
                                                                GLF_live39m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 3)] = GLF_live39one;
                                                                break;
                                                            case 8u:
                                                                GLF_live39m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live39c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live39r, 4)] = GLF_live39one;
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
                        {
                            {
                                ;
                            }
                        }
                    }
                    int GLF_live8looplimiter0 = 0;
                    if (GLF_live8looplimiter0 >= 6) {
                        ;
                    }
                    {
                        int GLF_live38looplimiter1 = 0;
                        ivec2 GLF_live38p = _GLF_FUZZED((ivec2(-60439, 7481) ^ 10153));
                        {
                            if (GLF_live38looplimiter1 >= 3) {
                                ;
                            }
                            GLF_live38looplimiter1++;
                            {
                                GLF_live38p.x -= 16;
                            }
                        }
                    }
                }
            }
        }
        if (map[ipos.y * 16 + ipos.x] == 1) {
            _GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
            {
                int GLF_live28looplimiter0 = 0;
                if (GLF_live28looplimiter0 >= 6) {
                    ;
                }
            }
            {
                {
                    {
                        int GLF_live29sum = _GLF_FUZZED((41732 * (-38284)));
                        {
                            int GLF_live29looplimiter2 = 0;
                            for (int GLF_live29target = 0; GLF_live29target < 20; GLF_live29target++) {
                                if (GLF_live29looplimiter2 >= 4) {
                                    break;
                                }
                                GLF_live29looplimiter2++;
                                {
                                    int GLF_live29result = GLF_live29search(GLF_live29target);
                                    if (GLF_live29result > 0) {
                                        GLF_live29sum += GLF_live29result;
                                    } else {
                                        switch (GLF_live29result) {
                                            case -1:
                                                GLF_live29sum += 1;
                                                break;
                                            case 0:
                                                ;
                                        }
                                    }
                                    {
                                        vec2 GLF_live35coord = _GLF_FUZZED(vec2(52.16));
                                        vec4 GLF_live35res = _GLF_FUZZED(vec4(9752.7995, -21.79, 587.777, 5492.5163));
                                        if (GLF_live35coord.x < 1.0 && GLF_live35coord.y < 1.0) {
                                            GLF_live35res = texture(GLF_live35tex, GLF_live35coord);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    {
                        vec2 GLF_live37coord = _GLF_FUZZED(vec2(vec4(5949.8043, -1.5, -157.779, -3.6)));
                        int GLF_live37i = _GLF_FUZZED(-18902);
                        int GLF_live37looplimiter1 = 0;
                        vec4 GLF_live37res = _GLF_FUZZED(vec4(355.778, vec2(-5.3, -246.883), (+(-4.9))));
                        float GLF_live37uvstep = _GLF_FUZZED(float(77863));
                        {
                            if (GLF_live37looplimiter1 >= 3) {
                                ;
                            }
                            GLF_live37looplimiter1++;
                            {
                                {
                                    int GLF_live37looplimiter0 = 0;
                                    for (int GLF_live37j = 0; GLF_live37j < 3; GLF_live37j++) {
                                        if (GLF_live37looplimiter0 >= 3) {
                                            break;
                                        }
                                        GLF_live37looplimiter0++;
                                        {
                                            GLF_live37res += texture(GLF_live37tex, GLF_live37coord + vec2(float(GLF_live37i - 1) * GLF_live37uvstep, float(GLF_live37j - 1) * GLF_live37uvstep)) * GLF_live37weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i * 3 + GLF_live37j, 9)];
                                        }
                                    }
                                }
                            }
                        }
                    }
                    int GLF_live23looplimiter0 = 0;
                    ivec2 GLF_live23pos = _GLF_FUZZED((-ivec2(-37278, 1607)));
                    {
                        if (GLF_live23looplimiter0 >= 5) {
                            ;
                        }
                        GLF_live23looplimiter0++;
                        {
                            {
                                int GLF_live38looplimiter1 = 0;
                                ivec2 GLF_live38p = _GLF_FUZZED(ivec2(94638, -76028));
                                while (GLF_live38p.x > 15) {
                                    if (GLF_live38looplimiter1 >= 3) {
                                        break;
                                    }
                                    GLF_live38looplimiter1++;
                                    {
                                        GLF_live38p.x -= 16;
                                    }
                                }
                            }
                            if (GLF_live23pos.x < GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)] + 15 && GLF_live23pos.x > GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)] - 15) {
                                float GLF_live23p = (15.0 - abs(float(GLF_live23pos.x - GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)]))) / 15.0;
                                ;
                            }
                            GLF_live23pos.y++;
                            {
                                float GLF_live40A = _GLF_FUZZED((9849.1636 * (-9.2)));
                                float GLF_live40B = _GLF_FUZZED(-1.3);
                                float GLF_live40C = _GLF_FUZZED(751.900);
                                int GLF_live40looplimiter0 = 0;
                                float GLF_live40temp = _GLF_FUZZED(-9.2);
                                float GLF_live40x0 = _GLF_FUZZED(-76.45);
                                float GLF_live40x1 = _GLF_FUZZED(-73.46);
                                float GLF_live40x2 = _GLF_FUZZED((-9.0));
                                {
                                    if (GLF_live40looplimiter0 >= 6) {
                                        ;
                                    }
                                    GLF_live40looplimiter0++;
                                    {
                                        float GLF_live40h0 = GLF_live40x0 - GLF_live40x2;
                                        float GLF_live40h1 = GLF_live40x1 - GLF_live40x2;
                                        float GLF_live40k0 = GLF_live40fx(GLF_live40x0) - GLF_live40fx(GLF_live40x2);
                                        float GLF_live40k1 = GLF_live40fx(GLF_live40x1) - GLF_live40fx(GLF_live40x2);
                                        GLF_live40temp = GLF_live40x2;
                                        GLF_live40A = (((GLF_live40h1) * (GLF_live40k0)) - ((GLF_live40h0) * (GLF_live40k1))) / ((pow((GLF_live40h0), 2.0) * (GLF_live40h1)) - (pow((GLF_live40h1), 2.0) * (GLF_live40h0)));
                                        GLF_live40B = (((GLF_live40k0) - (GLF_live40A * (pow((GLF_live40h0), 2.0)))) / (GLF_live40h0));
                                        GLF_live40C = GLF_live40fx(GLF_live40x2);
                                        GLF_live40x2 = GLF_live40x2 - ((2.0 * GLF_live40C) / (GLF_live40B + sign(GLF_live40B) * sqrt(pow(GLF_live40B, 2.0) - (4.0 * GLF_live40A * GLF_live40C))));
                                        GLF_live40x0 = GLF_live40x1;
                                        GLF_live40x1 = GLF_live40temp;
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    {
                        vec2 GLF_live22coord = _GLF_FUZZED((vec2(668.952, 4.2).r * vec2(-3252.3897, 2281.8218)));
                        int GLF_live22i = _GLF_FUZZED((42231 | (-42510)));
                        {
                            int GLF_live22looplimiter0 = 0;
                            {
                                float GLF_live25s = _GLF_FUZZED(float(false));
                                {
                                    ;
                                }
                            }
                            while (GLF_live22i < 1 && GLF_live22coord.x > 1.0 || GLF_live22coord.y > 1.0) {
                                if (GLF_live22looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live22looplimiter0++;
                                {
                                    if (GLF_live22coord.x > 1.0)
                                        GLF_live22coord.x -= 1.0;
                                    {
                                        int GLF_live34looplimiter0 = 0;
                                        int GLF_live34v = _GLF_FUZZED((~(-91747)));
                                        {
                                            int GLF_live37looplimiter1 = 0;
                                            if (GLF_live37looplimiter1 >= 3) {
                                                ;
                                            }
                                        }
                                        {
                                            if (GLF_live34looplimiter0 >= 6) {
                                                ;
                                            }
                                            GLF_live34looplimiter0++;
                                            {
                                                GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                                            }
                                        }
                                    }
                                    if (GLF_live22coord.y > 1.0)
                                        GLF_live22coord.y -= 1.0;
                                    GLF_live22coord *= 2.0;
                                    GLF_live22i++;
                                    {
                                        bool GLF_live26c1 = _GLF_FUZZED(true);
                                        if (!GLF_live26c1) {
                                            ;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ;
                }
            }
            return;
        }
        {
            vec2 GLF_live18color = _GLF_FUZZED((3.8 + (vec2(-9.6, -1.5) * (vec2(-4.7, 3.3) - 109.400))));
            {
                int GLF_live37looplimiter0 = 0;
                if (GLF_live37looplimiter0 >= 3) {
                    ;
                }
            }
            int GLF_live18i = _GLF_FUZZED(((-60476) + (-33990)));
            {
                bool GLF_live31c6 = _GLF_FUZZED(((-mat2x4(-5.7, -6802.7678, 0.7, -53.47, 19.92, 5.9, 217.653, 58.65)) != (39.77 * mat2x4(-5388.0821, -23.51, -100.930, -83.87, -72.56, -708.449, 3.9, -2368.3097))));
                vec2 GLF_live31pos = _GLF_FUZZED((mat4x2(-6.6, 96.01, -5207.9467, -415.093, 0.4, 5.3, 7.0, 764.807) * ((6752.1390 + vec4(-2.0, -331.529, -867.249, 0.9)) + 7.3)));
                vec3 GLF_live31setting = _GLF_FUZZED((vec3(988.589, 1432.9829, 422.167) * (569.388 + vec3(-573.284, 0.6, 52.41))));
                if (!GLF_live31c6) {
                    ;
                }
            }
            vec3 GLF_live18vecCoor = _GLF_FUZZED((vec3(0.4, 638.608, -3.5) * (-4.5)));
            if (int(GLF_live18gl_FragCoord[1]) < 120) {
                GLF_live18color = fract(acosh(clamp(GLF_live18vecCoor.yx - trunc(float(GLF_live18data[3])), 1.0, 1000.0)));
                GLF_live18color.x += (isnan(GLF_live18gl_FragCoord.x) ? log2(GLF_live18gl_FragCoord.x) : log2(GLF_live18gl_FragCoord.y));
                ;
            } else {
                {
                    vec2 GLF_live31pos = _GLF_FUZZED(vec2(6.8, -676.588));
                    vec3 GLF_live31setting = _GLF_FUZZED(vec2(-3.8, 5.6).sst);
                    {
                        ;
                    }
                }
                if (int(GLF_live18gl_FragCoord[1]) < 150) {
                    ;
                } else if (int(GLF_live18gl_FragCoord[1]) < 180) {
                    {
                        ivec2 GLF_live38p = _GLF_FUZZED(((-18082) - ivec2(-7143, -10832)));
                        if (GLF_live38p.x < 0) {
                            GLF_live38p.x = -GLF_live38p.x;
                        }
                    }
                    GLF_live18color = fract(sin(GLF_live18vecCoor.yx - trunc(float(GLF_live18data[4]))));
                    GLF_live18color[1] += asinh(GLF_live18gl_FragCoord.y * ldexp(GLF_live18color.y, -GLF_live18i));
                    ;
                } else if (int(GLF_live18gl_FragCoord[1]) < 210) {
                    GLF_live18color = fract(sin(GLF_live18vecCoor.yx - trunc(float(GLF_live18data[5]))));
                    GLF_live18color.y -= tanh(GLF_live18color.x) / cosh(GLF_live18color.y);
                    ;
                } else if (int(GLF_live18gl_FragCoord[1]) < 240) {
                    {
                        int GLF_live29looplimiter0 = 0;
                        if (GLF_live29looplimiter0 >= 4) {
                            ;
                        }
                    }
                    GLF_live18color = fract(asinh(GLF_live18vecCoor.yx - trunc(float(GLF_live18data[6]))));
                    {
                        int GLF_live37looplimiter0 = 0;
                        if (GLF_live37looplimiter0 >= 3) {
                            ;
                        }
                    }
                    {
                        ivec2 GLF_live23pos = _GLF_FUZZED((ivec2(-72801, -68005) + ivec2(49150, -99642)));
                        {
                            float GLF_live23p = (15.0 - abs(float(GLF_live23pos.x - GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)]))) / 15.0;
                            {
                                int GLF_live34i = _GLF_FUZZED(-89010);
                                int GLF_live34iters = _GLF_FUZZED((~38047));
                                int GLF_live34v = _GLF_FUZZED(ivec2(80099, 78415).t);
                                {
                                    int GLF_live34looplimiter0 = 0;
                                    for (GLF_live34i = 0; GLF_live34i < GLF_live34iters; GLF_live34i++) {
                                        if (GLF_live34looplimiter0 >= 6) {
                                            break;
                                        }
                                        GLF_live34looplimiter0++;
                                        {
                                            GLF_live34v = (4 * GLF_live34v * (1000 - GLF_live34v)) / 1000;
                                        }
                                    }
                                }
                            }
                            ;
                            {
                                {
                                    {
                                        ;
                                    }
                                }
                                vec4 GLF_live25c = _GLF_FUZZED((vec4(-729.947, -9503.3285, 4.3, 2.9) - 296.747));
                                int GLF_live25looplimiter1 = 0;
                                {
                                    int GLF_live29sum = _GLF_FUZZED(78853);
                                    {
                                        {
                                            float GLF_live40A = _GLF_FUZZED(4064.2095);
                                            float GLF_live40B = _GLF_FUZZED(9.6);
                                            float GLF_live40C = _GLF_FUZZED(354.208);
                                            float GLF_live40temp = _GLF_FUZZED(-7.5);
                                            float GLF_live40x0 = _GLF_FUZZED(9261.2999);
                                            float GLF_live40x1 = _GLF_FUZZED(float(true));
                                            float GLF_live40x2 = _GLF_FUZZED((+(-5.8)));
                                            {
                                                int GLF_live40looplimiter0 = 0;
                                                while (abs(GLF_live40x2 - GLF_live40x1) >= .000000000000001) {
                                                    if (GLF_live40looplimiter0 >= 6) {
                                                        break;
                                                    }
                                                    GLF_live40looplimiter0++;
                                                    {
                                                        float GLF_live40h0 = GLF_live40x0 - GLF_live40x2;
                                                        float GLF_live40h1 = GLF_live40x1 - GLF_live40x2;
                                                        float GLF_live40k0 = GLF_live40fx(GLF_live40x0) - GLF_live40fx(GLF_live40x2);
                                                        float GLF_live40k1 = GLF_live40fx(GLF_live40x1) - GLF_live40fx(GLF_live40x2);
                                                        GLF_live40temp = GLF_live40x2;
                                                        GLF_live40A = (((GLF_live40h1) * (GLF_live40k0)) - ((GLF_live40h0) * (GLF_live40k1))) / ((pow((GLF_live40h0), 2.0) * (GLF_live40h1)) - (pow((GLF_live40h1), 2.0) * (GLF_live40h0)));
                                                        GLF_live40B = (((GLF_live40k0) - (GLF_live40A * (pow((GLF_live40h0), 2.0)))) / (GLF_live40h0));
                                                        GLF_live40C = GLF_live40fx(GLF_live40x2);
                                                        GLF_live40x2 = GLF_live40x2 - ((2.0 * GLF_live40C) / (GLF_live40B + sign(GLF_live40B) * sqrt(pow(GLF_live40B, 2.0) - (4.0 * GLF_live40A * GLF_live40C))));
                                                        GLF_live40x0 = GLF_live40x1;
                                                        GLF_live40x1 = GLF_live40temp;
                                                    }
                                                }
                                            }
                                        }
                                        int GLF_live29looplimiter2 = 0;
                                        for (int GLF_live29target = 0; GLF_live29target < 20; GLF_live29target++) {
                                            if (GLF_live29looplimiter2 >= 4) {
                                                break;
                                            }
                                            GLF_live29looplimiter2++;
                                            {
                                                int GLF_live29result = GLF_live29search(GLF_live29target);
                                                if (GLF_live29result > 0) {
                                                    GLF_live29sum += GLF_live29result;
                                                } else {
                                                    switch (GLF_live29result) {
                                                        case -1:
                                                            GLF_live29sum += 1;
                                                            break;
                                                        case 0:
                                                            ;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                {
                                    vec2 GLF_live35coord = _GLF_FUZZED((vec2(-8.9, -6.9) * vec2(-282.818, 674.716)));
                                    int GLF_live35i = _GLF_FUZZED(((-17657) + (-48618)));
                                    {
                                        int GLF_live35looplimiter0 = 0;
                                        while (GLF_live35i < 1 && GLF_live35coord.x > 1.0 || GLF_live35coord.y > 1.0) {
                                            if (GLF_live35looplimiter0 >= 6) {
                                                break;
                                            }
                                            GLF_live35looplimiter0++;
                                            {
                                                if (GLF_live35coord.x > 1.0)
                                                    GLF_live35coord.x -= 1.0;
                                                if (GLF_live35coord.y > 1.0)
                                                    GLF_live35coord.y -= 1.0;
                                                GLF_live35coord *= 2.0;
                                                GLF_live35i++;
                                            }
                                        }
                                    }
                                }
                                for (int GLF_live25i = 0; GLF_live25i < 3; GLF_live25i++) {
                                    if (GLF_live25looplimiter1 >= 4) {
                                        break;
                                    }
                                    GLF_live25looplimiter1++;
                                    {
                                        if (GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 4)] >= 1.0) {
                                            GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 4)] = GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 4)] * GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 4)];
                                            {
                                                vec3 GLF_live36color = _GLF_FUZZED(vec3(-6.5, -57.74, 48.78));
                                                vec2 GLF_live36grid = _GLF_FUZZED((((-7.9) + mat4x2(7.0, -1.8, 60.67, 3917.9778, 1.2, 722.102, 4.9, -116.188)) * vec4(-54.08, -6760.0224, 238.702, -327.479)));
                                                vec2 GLF_live36uv = _GLF_FUZZED(vec2(6.6));
                                                if (GLF_live36uv.x > (2.0 / 4.0)) {
                                                    int GLF_live36count = int(GLF_live36injectionSwitch.x);
                                                    {
                                                        int GLF_live36looplimiter4 = 0;
                                                        do {
                                                            if (GLF_live36looplimiter4 >= 5) {
                                                                break;
                                                            }
                                                            GLF_live36looplimiter4++;
                                                            {
                                                                GLF_live36color -= GLF_live36palette(vec3(float(GLF_live36obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live36injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live36injectionSwitch.x, float(GLF_live36obj.numbers[2]) * 0.1, float(GLF_live36obj.numbers[8]) * 0.1));
                                                                GLF_live36count++;
                                                            }
                                                        } while (GLF_live36count != GLF_live36obj.numbers[1]);
                                                    }
                                                    GLF_live36grid += vec2(GLF_live36count + int(GLF_live36injectionSwitch.y), GLF_live36count + int(GLF_live36injectionSwitch.x));
                                                }
                                            }
                                        }
                                    }
                                    {
                                        ivec2 GLF_live38p = _GLF_FUZZED((ivec2(63185, -94135)));
                                        {
                                            GLF_live38p = GLF_live38iter(GLF_live38p);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    GLF_live18color.y -= isnan(float(GLF_live18i)) ? tanh(GLF_live18gl_FragCoord.x) : atanh(GLF_live18gl_FragCoord.y);
                    {
                        {
                            ;
                        }
                    }
                    ;
                    {
                        int GLF_live30a = _GLF_FUZZED((ivec2(47329, 58271).x | (-8900)));
                        vec2 GLF_live30uv = _GLF_FUZZED(vec2(3838.6665, 3946.8794));
                        {
                            GLF_live30uv.y -= step(GLF_live30injectionSwitch.y, GLF_live30uv.x);
                            GLF_live30uv.x -= fract(tanh(GLF_live30uv.x)) / ldexp(GLF_live30injectionSwitch.y, findMSB(GLF_live30a));
                            GLF_live30a--;
                        }
                    }
                } else if (int(GLF_live18gl_FragCoord[1]) < 270) {
                    {
                        {
                            vec2 GLF_live31center = _GLF_FUZZED(((+(-86.67)) - vec2(5.8, -0.6)));
                            int GLF_live31i = _GLF_FUZZED(4317);
                            int GLF_live31looplimiter0 = 0;
                            vec2 GLF_live31position = _GLF_FUZZED((vec2(9.1, 0.2).ts * 35.75));
                            vec3 GLF_live31result = _GLF_FUZZED((vec3(-3.8, -96.05, 5384.9866) * vec3(4.5, 9.6, -261.430).g));
                            {
                                if (GLF_live31looplimiter0 >= 3) {
                                    ;
                                }
                                GLF_live31looplimiter0++;
                                {
                                    vec3 GLF_live31d = _GLF_FUZZED(sqrt(vec3(8502.4250, -1.7, -4.2)));
                                    {
                                        vec2 GLF_live35coord = _GLF_FUZZED(((mat4(905.452, -2.4, -2.0, -4.1, -8.1, -3.5, -88.72, -6.1, 9.6, -743.992, 1.9, 762.275, 7737.1402, 311.927, -5.1, 7131.0489) != mat4(-112.485, -6720.0463, 2.3, -7.0, 8703.6993, -1.2, -2183.2272, -9338.5838, 582.294, -7.0, -3515.7574, -2.8, 31.96, 8804.6074, 6.4, 4043.2827)) ? vec2(1646.7185, 3655.5657) : vec2(668.635, -16.52)));
                                        vec4 GLF_live35res = _GLF_FUZZED((vec4(1928.5818, 8919.4201, -9413.6947, -8.9)));
                                        {
                                            GLF_live35res = texture(GLF_live35tex, GLF_live35coord);
                                        }
                                    }
                                    GLF_live31d = GLF_live31drawShape(GLF_live31position, GLF_live31center + vec2(sin(float(GLF_live31i) / 10.0 + GLF_live31time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live31i) / 100.0), 0.01, float(GLF_live31i)));
                                    if (length(GLF_live31d) <= 0.0) {
                                        ;
                                    }
                                    GLF_live31result = vec3(GLF_live31d);
                                }
                            }
                        }
                        vec2 GLF_live22coord = _GLF_FUZZED((vec2(9.1, 0.2) * 1645.6624));
                        if (GLF_live22coord.y > 1.0)
                            GLF_live22coord.y -= 1.0;
                    }
                    GLF_live18color = fract(sin(GLF_live18vecCoor.yx - trunc(float(GLF_live18data[7]))));
                    GLF_live18color.y *= mix(normalize(GLF_live18vecCoor), normalize(vec3(GLF_live18color, degrees(GLF_live18color.x))), GLF_live18injectionSwitch.x).y;
                    ;
                } else {
                    ;
                }
            }
            {
                int GLF_live37looplimiter0 = 0;
                if (GLF_live37looplimiter0 >= 3) {
                    ;
                }
            }
        }
    } while (canwalk);
    {
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
        {
            ;
            {
                int GLF_live9i = _GLF_FUZZED(-93532);
                int GLF_live9iters = _GLF_FUZZED((+37662));
                int GLF_live9looplimiter0 = 0;
                int GLF_live9v = _GLF_FUZZED(ivec2(-97844, 64339).yy.gg.t);
                for (GLF_live9i = 0; GLF_live9i < GLF_live9iters; GLF_live9i++) {
                    if (GLF_live9looplimiter0 >= 5) {
                        break;
                    }
                    GLF_live9looplimiter0++;
                    {
                        {
                            vec4 GLF_live21c = _GLF_FUZZED(vec3(48.46, -2.5, -2942.6297).xxyy);
                            {
                                float GLF_live40A = _GLF_FUZZED(-7.9);
                                float GLF_live40B = _GLF_FUZZED(-1.1);
                                float GLF_live40C = _GLF_FUZZED(50.08);
                                float GLF_live40temp = _GLF_FUZZED(-408.317);
                                float GLF_live40x0 = _GLF_FUZZED((false ? (-7.1) : 969.477));
                                float GLF_live40x1 = _GLF_FUZZED((1902.9599));
                                float GLF_live40x2 = _GLF_FUZZED(7775.8438);
                                {
                                    int GLF_live40looplimiter0 = 0;
                                    while (abs(GLF_live40x2 - GLF_live40x1) >= .000000000000001) {
                                        if (GLF_live40looplimiter0 >= 6) {
                                            break;
                                        }
                                        GLF_live40looplimiter0++;
                                        {
                                            float GLF_live40h0 = GLF_live40x0 - GLF_live40x2;
                                            float GLF_live40h1 = GLF_live40x1 - GLF_live40x2;
                                            float GLF_live40k0 = GLF_live40fx(GLF_live40x0) - GLF_live40fx(GLF_live40x2);
                                            float GLF_live40k1 = GLF_live40fx(GLF_live40x1) - GLF_live40fx(GLF_live40x2);
                                            GLF_live40temp = GLF_live40x2;
                                            GLF_live40A = (((GLF_live40h1) * (GLF_live40k0)) - ((GLF_live40h0) * (GLF_live40k1))) / ((pow((GLF_live40h0), 2.0) * (GLF_live40h1)) - (pow((GLF_live40h1), 2.0) * (GLF_live40h0)));
                                            GLF_live40B = (((GLF_live40k0) - (GLF_live40A * (pow((GLF_live40h0), 2.0)))) / (GLF_live40h0));
                                            GLF_live40C = GLF_live40fx(GLF_live40x2);
                                            GLF_live40x2 = GLF_live40x2 - ((2.0 * GLF_live40C) / (GLF_live40B + sign(GLF_live40B) * sqrt(pow(GLF_live40B, 2.0) - (4.0 * GLF_live40A * GLF_live40C))));
                                            GLF_live40x0 = GLF_live40x1;
                                            GLF_live40x1 = GLF_live40temp;
                                        }
                                    }
                                }
                            }
                            int GLF_live21i = _GLF_FUZZED((false ? 36843 : (true ? 70499 : 77405)));
                            {
                                if (GLF_live21c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 4)] >= 1.0) {
                                    GLF_live21c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 4)] = GLF_live21c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 4)] * GLF_live21c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 4)];
                                }
                            }
                        }
                        GLF_live9v = (4 * GLF_live9v * (1000 - GLF_live9v)) / 1000;
                    }
                }
            }
            {
                int GLF_live12looplimiter0 = 0;
                {
                    float GLF_live40A = _GLF_FUZZED(58.91);
                    float GLF_live40B = _GLF_FUZZED(-8.7);
                    float GLF_live40C = _GLF_FUZZED(vec3(4.6, 7118.7653, -7293.7475).b);
                    float GLF_live40temp = _GLF_FUZZED((0.7));
                    float GLF_live40x0 = _GLF_FUZZED(7998.8000);
                    float GLF_live40x1 = _GLF_FUZZED(float((-99795)));
                    float GLF_live40x2 = _GLF_FUZZED(((-6.4) * (-7.2)));
                    {
                        int GLF_live40looplimiter0 = 0;
                        while (abs(GLF_live40x2 - GLF_live40x1) >= .000000000000001) {
                            if (GLF_live40looplimiter0 >= 6) {
                                break;
                            }
                            GLF_live40looplimiter0++;
                            {
                                float GLF_live40h0 = GLF_live40x0 - GLF_live40x2;
                                float GLF_live40h1 = GLF_live40x1 - GLF_live40x2;
                                float GLF_live40k0 = GLF_live40fx(GLF_live40x0) - GLF_live40fx(GLF_live40x2);
                                float GLF_live40k1 = GLF_live40fx(GLF_live40x1) - GLF_live40fx(GLF_live40x2);
                                GLF_live40temp = GLF_live40x2;
                                GLF_live40A = (((GLF_live40h1) * (GLF_live40k0)) - ((GLF_live40h0) * (GLF_live40k1))) / ((pow((GLF_live40h0), 2.0) * (GLF_live40h1)) - (pow((GLF_live40h1), 2.0) * (GLF_live40h0)));
                                GLF_live40B = (((GLF_live40k0) - (GLF_live40A * (pow((GLF_live40h0), 2.0)))) / (GLF_live40h0));
                                GLF_live40C = GLF_live40fx(GLF_live40x2);
                                GLF_live40x2 = GLF_live40x2 - ((2.0 * GLF_live40C) / (GLF_live40B + sign(GLF_live40B) * sqrt(pow(GLF_live40B, 2.0) - (4.0 * GLF_live40A * GLF_live40C))));
                                GLF_live40x0 = GLF_live40x1;
                                GLF_live40x1 = GLF_live40temp;
                            }
                        }
                    }
                }
                if (GLF_live12looplimiter0 >= 6) {
                    ;
                    {
                        ivec2 GLF_live23pos = _GLF_FUZZED((-ivec2(-60513, 92055)));
                        {
                            int GLF_live23looplimiter0 = 0;
                            while (GLF_live23pos.y != 256) {
                                {
                                    {
                                        {
                                            vec2 GLF_live35coord = _GLF_FUZZED(vec2(-3056.0027, -172.817));
                                            if (GLF_live35coord.y > 1.0)
                                                GLF_live35coord.y -= 1.0;
                                        }
                                        ;
                                    }
                                }
                                {
                                    int GLF_live38looplimiter1 = 0;
                                    ivec2 GLF_live38p = _GLF_FUZZED(ivec2(ivec4(-55841, -80930, -38017, -76373)));
                                    {
                                        if (GLF_live38looplimiter1 >= 3) {
                                            ;
                                        }
                                        GLF_live38looplimiter1++;
                                        {
                                            GLF_live38p.x -= 16;
                                        }
                                    }
                                }
                                if (GLF_live23looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live23looplimiter0++;
                                {
                                    int GLF_live36looplimiter4 = 0;
                                    if (GLF_live36looplimiter4 >= 5) {
                                        ;
                                    }
                                }
                                {
                                    if (GLF_live23pos.x < GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)] + 15 && GLF_live23pos.x > GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)] - 15) {
                                        float GLF_live23p = (15.0 - abs(float(GLF_live23pos.x - GLF_live23dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                    GLF_live23pos.y++;
                                }
                                {
                                    int GLF_live36i = _GLF_FUZZED(91189);
                                    int GLF_live36j = _GLF_FUZZED(-61056);
                                    int GLF_live36pivot = _GLF_FUZZED(29037);
                                    if (GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live36j, 10)] <= GLF_live36pivot) {
                                        GLF_live36i++;
                                        GLF_live36swap(GLF_live36i, GLF_live36j);
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
        {
            ;
        }
        {
            vec3 GLF_live36color = _GLF_FUZZED(((vec3(3.8, 7.1, -2957.1689) * vec3(987.133, 6845.0948, 230.943)) * vec3(2.0, 984.716, -67.21)));
            int GLF_live36count = _GLF_FUZZED((-95294));
            int GLF_live36looplimiter3 = 0;
            do {
                if (GLF_live36looplimiter3 >= 5) {
                    break;
                }
                GLF_live36looplimiter3++;
                {
                    GLF_live36color += GLF_live36palette(vec3(0.5, float(GLF_live36obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live36injectionSwitch.y)), vec3(float(GLF_live36obj.numbers[4]) * 0.1, GLF_live36injectionSwitch.x, 0.6));
                    GLF_live36count++;
                }
            } while (GLF_live36count != GLF_live36obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live36injectionSwitch.x), 10)]);
        }
    }
    _GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
}
