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

struct GLF_live38BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live38BST GLF_live38tree[10];

void GLF_live38makeTreeNode(inout GLF_live38BST GLF_live38tree, int GLF_live38data) {
    GLF_live38tree.data = GLF_live38data;
    GLF_live38tree.leftIndex = -1;
    GLF_live38tree.rightIndex = -1;
}

int GLF_live38search(int GLF_live38target) {
    GLF_live38BST GLF_live38currentNode;
    int GLF_live38index = 0;
    {
        int GLF_live38looplimiter1 = 0;
        while (GLF_live38index != -1) {
            if (GLF_live38looplimiter1 >= 3) {
                break;
            }
            GLF_live38looplimiter1++;
            {
                GLF_live38currentNode = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38index, 10)];
                if (GLF_live38currentNode.data == GLF_live38target) {
                    return GLF_live38target;
                }
                GLF_live38index = GLF_live38target > GLF_live38currentNode.data ? GLF_live38currentNode.rightIndex : GLF_live38currentNode.leftIndex;
            }
        }
    }
    return -1;
}

const vec4 GLF_live37pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_live37picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, 4, 4), vec4(12, 22, 4, 4));

bool GLF_live37collision(vec2 GLF_live37pos, vec4 GLF_live37quad) {
    if (GLF_live37pos.x < GLF_live37quad.x) {
        return false;
    }
    if (GLF_live37pos.y < GLF_live37quad.y) {
        return false;
    }
    if (GLF_live37pos.x > GLF_live37quad.x + GLF_live37quad.z) {
        return false;
    }
    if (GLF_live37pos.y > GLF_live37quad.y + GLF_live37quad.w) {
        return false;
    }
    return true;
}

layout(set = 0, binding = 2) uniform sampler2D GLF_live36tex;
vec4 GLF_dead35gl_FragCoord = _GLF_FUZZED(vec4(-3928.1231, 39.24, -4.8, 2.8));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead35injectionSwitch;
};

const int GLF_dead35N = 10;
int GLF_dead35data[10] = int[10](_GLF_FUZZED(ivec2(12856, 11679).x), _GLF_FUZZED(78087), _GLF_FUZZED(36712), _GLF_FUZZED(ivec2(-54906, 28834).g), _GLF_FUZZED(40661), _GLF_FUZZED(30730), _GLF_FUZZED((~int(127716u))), _GLF_FUZZED(-19017), _GLF_FUZZED(-5767), _GLF_FUZZED(ivec3(86479, 28920, -51223).x)), GLF_dead35temp[10] = int[10](_GLF_FUZZED(-78420), _GLF_FUZZED(69442), _GLF_FUZZED(-82786), _GLF_FUZZED(((-16330) - ((false ? (-55155) : 62864) & (-68682)))), _GLF_FUZZED(13601), _GLF_FUZZED((-98349)), _GLF_FUZZED(int(true)), _GLF_FUZZED(-67523), _GLF_FUZZED(56502), _GLF_FUZZED(18874));

void GLF_dead35merge(int GLF_dead35from, int GLF_dead35mid, int GLF_dead35to) {
    int GLF_dead35k = GLF_dead35from, GLF_dead35i = GLF_dead35from, GLF_dead35j = GLF_dead35mid + 1;
    while (GLF_dead35i <= GLF_dead35mid && GLF_dead35j <= GLF_dead35to) {
        if (GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead35i, 10)] < GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead35j, 10)]) {
            GLF_dead35temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead35k++, 10)] = GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead35i++, 10)];
        } else {
            GLF_dead35temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead35k++, 10)] = GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead35j++, 10)];
        }
    }
    while (GLF_dead35i < GLF_dead35N && GLF_dead35i <= GLF_dead35mid) {
        GLF_dead35temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead35k++, 10)] = GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead35i++, 10)];
    }
    for (int GLF_dead35i = GLF_dead35from; GLF_dead35i <= GLF_dead35to; GLF_dead35i++) {
        GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead35i, 10)] = GLF_dead35temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead35i, 10)];
    }
}

layout(set = 0, binding = 4) uniform sampler2D GLF_dead32tex;

layout(set = 0, binding = 5) uniform buf5 {
    float GLF_live29one;
};

mat2 GLF_live29m22 = _GLF_FUZZED((mat4x2(-1.0, 2.9, 42.77, -3374.5844, 1598.0998, 5062.5473, -2.0, -6203.0904) * mat2x4(6731.2478, 698.478, 294.630, 9.5, 274.735, 85.40, -44.51, 4.4)));
mat2x3 GLF_live29m23 = _GLF_FUZZED(mat2x3(-22.75, 496.530, 1.4, 6.8, 2.8, 17.83));
mat2x4 GLF_live29m24 = _GLF_FUZZED(mat2x4(4.1, -3.9, 73.80, 0.0, -8.3, 591.217, -112.390, -7.0));
mat3x2 GLF_live29m32 = _GLF_FUZZED(mat3x2(778.564, 28.48, -40.58, -714.305, 313.444, -597.068));
mat3 GLF_live29m33 = _GLF_FUZZED(mat3(-8.7, 810.401, -47.79, -6.4, -8.2, 8.1, -416.760, -2.6, 7.8));
mat3x4 GLF_live29m34 = _GLF_FUZZED((+mat3x4(4690.7116, 2007.4261, -7780.8543, 237.014, 0.9, 119.738, -114.236, -4650.2731, -4.4, 7005.5235, 6.1, -998.692)));
mat4x2 GLF_live29m42 = _GLF_FUZZED(((mat2x3(-2.4, 8021.6193, 69.83, -8533.7259, 62.96, -81.20) == mat2x3(-745.619, 9469.0203, -5371.9303, -6.3, -991.691, -8.7)) ? mat4x2(7407.0513, -5722.9234, -688.277, -367.015, -401.560, -173.215, 2.4, 5663.3353) : (mat4x2(-1.7, -4030.1385, 3.4, -92.22, -872.125, 7.6, -9.3, -4.0) + (-9.8))));
mat4x3 GLF_live29m43 = _GLF_FUZZED(mat4x3(6.6, 4.6, -5.6, -5.8, -4.4, -13.49, -14.52, -9.5, 5.4, 9.0, 2.1, -8.9));
mat4 GLF_live29m44 = _GLF_FUZZED(mat4(-3252.8952, -1.5, 2.5, -6597.1685, 1445.0478, -742.783, 75.16, 6.3, -8.2, -5.9, 840.889, 5.1, -67.91, 88.62, -88.55, -65.60));
vec4 GLF_live30_GLF_color = _GLF_FUZZED((vec4(-38.98, 0.3, -2858.8255, 9.0).wxzw * mat4(-7.3, 6796.9114, 1.0, -27.88, 67.24, 2512.7525, 6423.7909, 9.5, 97.89, 5840.1043, -99.50, -337.033, 7.7, 1.6, -6.2, 6587.4837)));
int GLF_live30map[16 * 16];
layout(set = 0, binding = 6) uniform sampler2D GLF_live31tex;
int GLF_live24msb8 = 256;
vec4 GLF_live26_GLF_color = _GLF_FUZZED(vec2(3519.6759, 42.74).xxxy);

struct GLF_live26BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live26BST GLF_live26tree[10];

void GLF_live26makeTreeNode(inout GLF_live26BST GLF_live26tree, int GLF_live26data) {
    GLF_live26tree.data = GLF_live26data;
    {
        vec2 GLF_live36coord = _GLF_FUZZED(vec2(7435.7552, -61.53));
        int GLF_live36i = _GLF_FUZZED(-48555);
        vec4 GLF_live36texel = _GLF_FUZZED(vec4(77.32, 60.15, -6012.9899, 2979.9521));
        {
            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
            GLF_live36i++;
        }
    }
    GLF_live26tree.leftIndex = -1;
    GLF_live26tree.rightIndex = -1;
}

int GLF_live26search(int GLF_live26target) {
    GLF_live26BST GLF_live26currentNode;
    int GLF_live26index = 0;
    {
        int GLF_live26looplimiter1 = 0;
        while (GLF_live26index != -1) {
            {
                bool GLF_live30canwalk = _GLF_FUZZED(true);
                {
                    int GLF_live37i = _GLF_FUZZED(-24745);
                    vec4 GLF_live37res = _GLF_FUZZED((vec4(-587.336, 4.9, 284.452, -5382.4292) * (-1316.6969)));
                    {
                        GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                    }
                }
                int GLF_live30i = _GLF_FUZZED((true ? (-57609) : 70919));
                {
                    int GLF_live38baseIndex = _GLF_FUZZED((38331 | (true ? ivec3(6653, -36408, 49705) : ivec3(-57837, 772, -54263))).p);
                    int GLF_live38data = _GLF_FUZZED((40070 ^ 55312));
                    int GLF_live38treeIndex = _GLF_FUZZED(73564);
                    {
                        if (GLF_live38data <= GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].data) {
                            if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex == -1) {
                                GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex = GLF_live38treeIndex;
                                GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                ;
                            } else {
                                GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex;
                                ;
                            }
                        } else {
                            if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex == -1) {
                                GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex = GLF_live38treeIndex;
                                GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                ;
                            } else {
                                GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex;
                                ;
                            }
                        }
                    }
                }
                int GLF_live30j = _GLF_FUZZED((ivec2(-56135, -76226) * (-51595)).x);
                int GLF_live30looplimiter1 = 0;
                ivec2 GLF_live30p = _GLF_FUZZED(ivec2(-63590, 41077));
                for (GLF_live30j = 0; GLF_live30j < 8; GLF_live30j++) {
                    if (GLF_live30looplimiter1 >= 7) {
                        break;
                    }
                    GLF_live30looplimiter1++;
                    {
                        if (GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30j * 2 + GLF_live30i * 2 * 16, 256)] == 0) {
                            GLF_live30p.x = GLF_live30j * 2;
                            GLF_live30p.y = GLF_live30i * 2;
                            GLF_live30canwalk = true;
                        }
                        {
                            {
                                ;
                            }
                        }
                    }
                }
            }
            if (GLF_live26looplimiter1 >= 5) {
                {
                    int GLF_live38sum = _GLF_FUZZED(81999);
                    int GLF_live38target = _GLF_FUZZED(-23675);
                    {
                        int GLF_live38result = GLF_live38search(GLF_live38target);
                        if (GLF_live38result > 0) {
                            GLF_live38sum += GLF_live38result;
                        } else {
                            switch (GLF_live38result) {
                                case -1:
                                    GLF_live38sum += 1;
                                    break;
                                case 0:
                                    ;
                            }
                        }
                    }
                }
                break;
            }
            {
                vec2 GLF_live37pos = _GLF_FUZZED(((vec2(30.75, -3592.5574) * vec2(-356.119, 790.361)) * vec2(2.6, -9.1).x));
                vec4 GLF_live37quad = _GLF_FUZZED(vec4(-85.55, -55.94, 59.59, -86.50));
                if (GLF_live37pos.x > GLF_live37quad.x + GLF_live37quad.z) {
                    ;
                }
            }
            GLF_live26looplimiter1++;
            {
                {
                    int GLF_live37looplimiter0 = 0;
                    if (GLF_live37looplimiter0 >= 3) {
                        ;
                    }
                }
                GLF_live26currentNode = GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26index, 10)];
                if (GLF_live26currentNode.data == GLF_live26target) {
                    return GLF_live26target;
                }
                GLF_live26index = GLF_live26target > GLF_live26currentNode.data ? GLF_live26currentNode.rightIndex : GLF_live26currentNode.leftIndex;
            }
        }
    }
    return -1;
}

layout(set = 0, binding = 7) uniform sampler2D GLF_live27tex;

layout(set = 0, binding = 8) uniform buf8 {
    vec2 GLF_dead22injectionSwitch;
};

struct GLF_dead22QuicksortObject {
    int numbers[10];
};

GLF_dead22QuicksortObject GLF_dead22obj;

vec3 GLF_dead22palette(vec3 GLF_dead22a, vec3 GLF_dead22b, vec3 GLF_dead22c, vec3 GLF_dead22d) {
    return fract(mix(GLF_dead22d * GLF_dead22a, GLF_dead22a * GLF_dead22c, GLF_dead22b + GLF_dead22d - GLF_dead22c));
}

layout(set = 0, binding = 9) uniform buf9 {
    vec2 GLF_dead17resolution;
};

layout(set = 0, binding = 10) uniform buf10 {
    vec2 GLF_dead19resolution;
};

vec4 GLF_live15gl_FragCoord = _GLF_FUZZED((mat3x4(0.7, -9693.6817, 7.9, -7.6, 213.548, -9098.5977, 17.85, -2.5, -9.4, 5067.3640, 7.1, -2.1) * vec3(-44.16, 7.6, 116.643)));

layout(set = 0, binding = 11) uniform buf11 {
    vec2 GLF_live15injectionSwitch;
};

vec4 GLF_live12_GLF_color = _GLF_FUZZED((vec4(2.7, -6.7, 64.49, -6.6) - (-743.589)));

struct GLF_live12BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live12BST GLF_live12tree[10];

void GLF_live12makeTreeNode(inout GLF_live12BST GLF_live12tree, int GLF_live12data) {
    GLF_live12tree.data = GLF_live12data;
    {
        {
            ;
        }
    }
    GLF_live12tree.leftIndex = -1;
    GLF_live12tree.rightIndex = -1;
}

int GLF_live12search(int GLF_live12target) {
    GLF_live12BST GLF_live12currentNode;
    int GLF_live12index = 0;
    {
        int GLF_live12looplimiter1 = 0;
        while (GLF_live12index != -1) {
            if (GLF_live12looplimiter1 >= 6) {
                {
                    int GLF_live38result = _GLF_FUZZED(-82796);
                    int GLF_live38sum = _GLF_FUZZED(((-78144) + ivec3(-4159, -40589, -24822)).s);
                    if (GLF_live38result > 0) {
                        GLF_live38sum += GLF_live38result;
                    } else {
                        switch (GLF_live38result) {
                            case -1:
                                GLF_live38sum += 1;
                                break;
                            case 0:
                                ;
                        }
                    }
                }
                break;
            }
            {
                int GLF_live29cols = _GLF_FUZZED(18242);
                int GLF_live29looplimiter3 = 0;
                uint GLF_live29matrix_number = _GLF_FUZZED(uvec4(13380u, 94619u, 136534u, 140808u).g);
                {
                    if (GLF_live29looplimiter3 >= 4) {
                        ;
                    }
                    GLF_live29looplimiter3++;
                    {
                        {
                            int GLF_live29looplimiter2 = 0;
                            for (int GLF_live29rows = 2; GLF_live29rows <= 4; GLF_live29rows++) {
                                if (GLF_live29looplimiter2 >= 4) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(sqrt(0.0)))))) {
                                        vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(cos(GLF_dead17resolution));
                                        while (GLF_live29cols < 1 && donor_replacementGLF_dead32coord.x > 1.0 || donor_replacementGLF_dead32coord.y > 1.0) {
                                            if (donor_replacementGLF_dead32coord.x > 1.0)
                                                donor_replacementGLF_dead32coord.x -= 1.0;
                                            if (donor_replacementGLF_dead32coord.y > 1.0)
                                                donor_replacementGLF_dead32coord.y -= 1.0;
                                            donor_replacementGLF_dead32coord *= 2.0;
                                            GLF_live29cols++;
                                        }
                                    }
                                    break;
                                }
                                GLF_live29looplimiter2++;
                                {
                                    {
                                        int GLF_live29looplimiter1 = 0;
                                        for (int GLF_live29c = 0; GLF_live29c < GLF_live29cols; GLF_live29c++) {
                                            if (GLF_live29looplimiter1 >= 4) {
                                                break;
                                            }
                                            GLF_live29looplimiter1++;
                                            {
                                                {
                                                    int GLF_live29looplimiter0 = 0;
                                                    for (int GLF_live29r = 0; GLF_live29r < GLF_live29rows; GLF_live29r++) {
                                                        if (GLF_live29looplimiter0 >= 4) {
                                                            break;
                                                        }
                                                        GLF_live29looplimiter0++;
                                                        {
                                                            switch (GLF_live29matrix_number) {
                                                                case 0u:
                                                                    GLF_live29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                                                    break;
                                                                case 1u:
                                                                    GLF_live29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                                                    break;
                                                                case 2u:
                                                                    GLF_live29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_live29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_live29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                                                    break;
                                                                case 5u:
                                                                    GLF_live29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_live29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                                                    break;
                                                                case 7u:
                                                                    GLF_live29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                                                    break;
                                                                    {
                                                                        {
                                                                            ;
                                                                        }
                                                                    }
                                                                case 8u:
                                                                    GLF_live29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                                                    break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    GLF_live29matrix_number = GLF_live29matrix_number + 1u;
                                    {
                                        vec2 GLF_live37pos = _GLF_FUZZED(((1110.7376 * mat3x2(496.292, -66.67, 6763.1398, -2376.9581, 1.3, -4879.5814)) * vec3(0.3, 3.7, -8906.7929)));
                                        vec4 GLF_live37quad = _GLF_FUZZED(vec4(351.670, 2718.2957, -63.48, -8.5));
                                        if (GLF_live37pos.x < GLF_live37quad.x) {
                                            ;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            GLF_live12looplimiter1++;
            {
                GLF_live12currentNode = GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12index, 10)];
                if (GLF_live12currentNode.data == GLF_live12target) {
                    return GLF_live12target;
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                            {
                                int GLF_live38baseIndex = _GLF_FUZZED((+(-63839)));
                                int GLF_live38data = _GLF_FUZZED(((50199 + 33912) * (-76960)));
                                int GLF_live38treeIndex = _GLF_FUZZED((true ? (-64845) : (-24649)));
                                {
                                    if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex == -1) {
                                        GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex = GLF_live38treeIndex;
                                        GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                        ;
                                    } else {
                                        GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex;
                                        ;
                                    }
                                }
                            }
                            {
                                vec2 GLF_live31coord = _GLF_FUZZED((+(-vec2(4.8, 82.88))));
                                int GLF_live31i = _GLF_FUZZED(2592);
                                int GLF_live31looplimiter0 = 0;
                                {
                                    if (GLF_live31looplimiter0 >= 5) {
                                        ;
                                    }
                                    GLF_live31looplimiter0++;
                                    {
                                        if (GLF_live31coord.x > 1.0)
                                            GLF_live31coord.x -= 1.0;
                                        if (GLF_live31coord.y > 1.0)
                                            GLF_live31coord.y -= 1.0;
                                        GLF_live31coord *= 2.0;
                                        GLF_live31i++;
                                    }
                                }
                            }
                        }
                    }
                }
                GLF_live12index = GLF_live12target > GLF_live12currentNode.data ? GLF_live12currentNode.rightIndex : GLF_live12currentNode.leftIndex;
            }
        }
    }
    return -1;
}

vec4 GLF_dead11gl_FragCoord = _GLF_FUZZED(vec4(5.9, -5.3, 4.1, 43.89));

struct GLF_live9BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live9BST GLF_live9tree[10];

void GLF_live9makeTreeNode(inout GLF_live9BST GLF_live9tree, int GLF_live9data) {
    GLF_live9tree.data = GLF_live9data;
    {
        {
            int GLF_live36looplimiter0 = 0;
            if (GLF_live36looplimiter0 >= 7) {
                ;
            }
        }
        vec2 GLF_live31coord = _GLF_FUZZED(vec2(29.35, -4.5));
        vec4 GLF_live31res = _GLF_FUZZED(vec4(vec2(790.384, 9.7), vec2(-399.529, -209.038)));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            float donor_replacementGLF_dead33s = _GLF_FUZZED(length(intBitsToFloat(GLF_live9data)));
            {
                donor_replacementGLF_dead33s += 0.2;
            }
        }
        if (GLF_live31coord.x < 1.0 && GLF_live31coord.y < 1.0) {
            GLF_live31res = texture(GLF_live31tex, GLF_live31coord);
        }
    }
    GLF_live9tree.leftIndex = -1;
    GLF_live9tree.rightIndex = -1;
}

int GLF_live9search(int GLF_live9target) {
    {
        vec2 GLF_live36coord = _GLF_FUZZED(((-(-7902.2855)) + vec2(-6.7, -1.2)));
        int GLF_live36i = _GLF_FUZZED(10622);
        int GLF_live36looplimiter0 = 0;
        vec4 GLF_live36texel = _GLF_FUZZED(vec4(3472.3025, 1.7, 3.6, 5.3));
        {
            if (GLF_live36looplimiter0 >= 7) {
                ;
            }
            GLF_live36looplimiter0++;
            {
                GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                GLF_live36i++;
            }
        }
    }
    GLF_live9BST GLF_live9currentNode;
    int GLF_live9index = 0;
    {
        int GLF_live9looplimiter1 = 0;
        while (GLF_live9index != -1) {
            if (GLF_live9looplimiter1 >= 6) {
                {
                    {
                        vec2 GLF_live36coord = _GLF_FUZZED(vec2(-3620.1926, 37.17));
                        int GLF_live36i = _GLF_FUZZED(ivec4(-69750, -63378, 52855, -16730).w);
                        int GLF_live36looplimiter0 = 0;
                        vec4 GLF_live36texel = _GLF_FUZZED((vec4(7.6, 1198.5974, -82.62, 15.09)));
                        while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                            if (GLF_live36looplimiter0 >= 7) {
                                break;
                            }
                            GLF_live36looplimiter0++;
                            {
                                GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                GLF_live36i++;
                            }
                        }
                    }
                    int GLF_live12count = _GLF_FUZZED(-20835);
                    {
                        int GLF_live24i = _GLF_FUZZED(45696);
                        float GLF_live24ref = _GLF_FUZZED(-0.5);
                        float GLF_live24s = _GLF_FUZZED(-574.501);
                        if (mod(float(GLF_live24i), GLF_live24ref) <= 0.01) {
                            GLF_live24s += 0.2;
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        vec2 donor_replacementGLF_dead34a = _GLF_FUZZED(round((false ? injectionSwitch : injectionSwitch)));
                        {
                            {
                                ;
                            }
                        }
                        float donor_replacementGLF_dead34z = _GLF_FUZZED(-1.5);
                        {
                            donor_replacementGLF_dead34z = donor_replacementGLF_dead34a.x / donor_replacementGLF_dead34a.y;
                        }
                    }
                    int GLF_live12i = _GLF_FUZZED(78615);
                    {
                        int GLF_live12result = GLF_live12search(GLF_live12i);
                        switch (GLF_live12i) {
                            case 9:
                                {
                                    int GLF_live30directions = _GLF_FUZZED(-7371);
                                    ivec2 GLF_live30p = _GLF_FUZZED(ivec4(-7487, -95437, -8162, 64796).xw);
                                    {
                                        int GLF_live36looplimiter0 = 0;
                                        if (GLF_live36looplimiter0 >= 7) {
                                            ;
                                        }
                                    }
                                    int GLF_live30v = _GLF_FUZZED(62029);
                                    {
                                        int GLF_live30d = GLF_live30v % GLF_live30directions;
                                        GLF_live30v += GLF_live30directions;
                                        if (GLF_live30d >= 0 && GLF_live30p.x > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                            GLF_live30d--;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 1) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 2) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30p.x -= 2;
                                        }
                                        if (GLF_live30d >= 0 && GLF_live30p.y > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] == 0) {
                                            GLF_live30d--;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 1) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] = 1;
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            GLF_live30p.y -= 2;
                                        }
                                        {
                                            int GLF_live38looplimiter0 = 0;
                                            if (GLF_live38looplimiter0 >= 3) {
                                                ;
                                            }
                                        }
                                        if (GLF_live30d >= 0 && GLF_live30p.x < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                            GLF_live30d--;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 1) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30p.x += 2;
                                        }
                                        if (GLF_live30d >= 0 && GLF_live30p.y < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 2) * 16, 256)] == 0) {
                                            GLF_live30d--;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 1) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 2) * 16, 256)] = 1;
                                            GLF_live30p.y += 2;
                                        }
                                    }
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                            case 5:
                            case 12:
                            case 15:
                                {
                                    vec2 GLF_live31coord = _GLF_FUZZED(vec2(-87.75, 5.4));
                                    vec4 GLF_live31res = _GLF_FUZZED((54.24 + vec4(1.7, -8601.8361, -3.4, 2.1)));
                                    {
                                        GLF_live31res = texture(GLF_live31tex, GLF_live31coord);
                                    }
                                }
                            case 7:
                            case 8:
                            case 2:
                            case 6:
                            case 17:
                            case 13:
                                if (GLF_live12result == GLF_live12i) {
                                    GLF_live12count++;
                                }
                                break;
                            default:
                                if (GLF_live12result == -1) {
                                    GLF_live12count++;
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead21th = _GLF_FUZZED(-68.75);
                                        vec2 donor_replacementGLF_dead21v = _GLF_FUZZED(exp(GLF_dead19resolution));
                                        if (donor_replacementGLF_dead21v.x < 0.0) {
                                            {
                                                int GLF_live37i = _GLF_FUZZED((+95792));
                                                int GLF_live37looplimiter0 = 0;
                                                vec2 GLF_live37pos = _GLF_FUZZED(vec2(2125.6078));
                                                vec4 GLF_live37res = _GLF_FUZZED(vec4(30.83, -7503.1839, 2.4, 5.4));
                                                for (GLF_live37i = 0; GLF_live37i < 8; GLF_live37i++) {
                                                    if (GLF_live37looplimiter0 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live37looplimiter0++;
                                                    {
                                                        if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
                                                            GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                                        }
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead21th = 1.0 - donor_replacementGLF_dead21th;
                                        }
                                    }
                                }
                                break;
                        }
                    }
                }
                break;
            }
            GLF_live9looplimiter1++;
            {
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead35color = _GLF_FUZZED(asinh(vec2(7449.4118, 9.8)));
                    vec3 donor_replacementGLF_dead35vecCoor = _GLF_FUZZED(vec3(3408.7258, -1230.7498, -6.5));
                    {
                        donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[4]))));
                        donor_replacementGLF_dead35color[1] += asinh(GLF_dead35gl_FragCoord.y * ldexp(donor_replacementGLF_dead35color.y, -GLF_live24msb8));
                        break;
                    }
                }
                {
                    {
                        vec2 GLF_live31coord = _GLF_FUZZED(vec2(-531.949, 340.574));
                        vec4 GLF_live31res = _GLF_FUZZED(vec4(6.8, -632.136, 7910.2229, -3678.2007));
                        {
                            GLF_live31res = texture(GLF_live31tex, GLF_live31coord);
                        }
                    }
                    int GLF_live26baseIndex = _GLF_FUZZED((70181));
                    {
                        GLF_live26baseIndex = GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].rightIndex;
                        ;
                    }
                }
                GLF_live9currentNode = GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9index, 10)];
                {
                    if (_GLF_DEAD(false)) {
                        {
                            bool GLF_live30canwalk = _GLF_FUZZED((uvec4(111924u, 104893u, 195791u, 166036u) != uvec4(55277u, 114028u, 24285u, 169813u)));
                            int GLF_live30i = _GLF_FUZZED(65309);
                            ivec2 GLF_live30ipos = _GLF_FUZZED((ivec3(-61641, 31063, 24802).rb ^ (-71847)));
                            int GLF_live30looplimiter3 = 0;
                            ivec2 GLF_live30p = _GLF_FUZZED(ivec2(-48329, -92058));
                            int GLF_live30v = _GLF_FUZZED(44614);
                            {
                                if (GLF_live30looplimiter3 >= 7) {
                                    ;
                                }
                                GLF_live30looplimiter3++;
                                {
                                    GLF_live30v++;
                                    int GLF_live30directions = 0;
                                    if (GLF_live30p.x > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                        GLF_live30directions += 1;
                                    }
                                    if (GLF_live30p.y > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] == 0) {
                                        GLF_live30directions += 1;
                                    }
                                    if (GLF_live30p.x < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                        GLF_live30directions += 1;
                                    }
                                    if (GLF_live30p.y < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 2) * 16, 256)] == 0) {
                                        GLF_live30directions += 1;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead35color = _GLF_FUZZED(vec2(-78.15, 8.1));
                                        int donor_replacementGLF_dead35i = _GLF_FUZZED((ivec3(-56881, -53077, 84820)[2] - GLF_live9index));
                                        vec3 donor_replacementGLF_dead35vecCoor = _GLF_FUZZED(((2.9) + vec3(-1246.4415, 4825.4269, -5.7)));
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        if (int(GLF_dead35gl_FragCoord[1]) < 150) {
                                            discard;
                                        } else if (int(GLF_dead35gl_FragCoord[1]) < 180) {
                                            donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[4]))));
                                            donor_replacementGLF_dead35color[1] += asinh(GLF_dead35gl_FragCoord.y * ldexp(donor_replacementGLF_dead35color.y, -donor_replacementGLF_dead35i));
                                            break;
                                        } else if (int(GLF_dead35gl_FragCoord[1]) < 210) {
                                            donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[5]))));
                                            {
                                                vec2 GLF_live36coord = _GLF_FUZZED(vec2(-686.855, -8.2).gr);
                                                int GLF_live36i = _GLF_FUZZED(((47446 & 94084) | (-35787)));
                                                vec4 GLF_live36texel = _GLF_FUZZED(((mat2x4(-330.351, -3323.9900, -9.0, -9834.3447, -2.6, 3.8, -70.61, -2.6) + (true ? 7.1 : (-17.15))) * vec2(-2087.3065, 0.0)));
                                                {
                                                    int GLF_live36looplimiter0 = 0;
                                                    while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                                        if (GLF_live36looplimiter0 >= 7) {
                                                            break;
                                                        }
                                                        GLF_live36looplimiter0++;
                                                        {
                                                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                            GLF_live36i++;
                                                        }
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead35color.y -= tanh(donor_replacementGLF_dead35color.x) / cosh(donor_replacementGLF_dead35color.y);
                                            break;
                                        } else if (int(GLF_dead35gl_FragCoord[1]) < 240) {
                                            donor_replacementGLF_dead35color = fract(asinh(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[6]))));
                                            donor_replacementGLF_dead35color.y -= isnan(float(donor_replacementGLF_dead35i)) ? tanh(GLF_dead35gl_FragCoord.x) : atanh(GLF_dead35gl_FragCoord.y);
                                            break;
                                        } else if (int(GLF_dead35gl_FragCoord[1]) < 270) {
                                            {
                                                int GLF_live38baseIndex = _GLF_FUZZED(58619);
                                                int GLF_live38data = _GLF_FUZZED(-48066);
                                                int GLF_live38treeIndex = _GLF_FUZZED(((-27529) | (-28022)));
                                                {
                                                    if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex == -1) {
                                                        GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex = GLF_live38treeIndex;
                                                        GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                                        ;
                                                    } else {
                                                        GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex;
                                                        ;
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[7]))));
                                            donor_replacementGLF_dead35color.y *= mix(normalize(donor_replacementGLF_dead35vecCoor), normalize(vec3(donor_replacementGLF_dead35color, degrees(donor_replacementGLF_dead35color.x))), GLF_dead35injectionSwitch.x).y;
                                            break;
                                            {
                                                int GLF_live37i = _GLF_FUZZED((((-65673) * 46403)));
                                                vec2 GLF_live37pos = _GLF_FUZZED(vec2(3364.6475, 613.043));
                                                vec4 GLF_live37res = _GLF_FUZZED(vec4(-8.4, 3586.1585, 3873.6155, -31.59));
                                                {
                                                    if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
                                                        GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                                    }
                                                }
                                            }
                                        } else {
                                            discard;
                                        }
                                    }
                                    if (GLF_live30directions == 0) {
                                        GLF_live30canwalk = false;
                                        int GLF_live30j = _GLF_FUZZED(-39873);
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                int donor_replacementGLF_dead35high = _GLF_FUZZED(GLF_live30v);
                                                for (int GLF_dead35i = GLF_live30looplimiter3; GLF_dead35i < donor_replacementGLF_dead35high; GLF_dead35i += 2 * GLF_live30directions) {
                                                    int GLF_dead35from = GLF_dead35i;
                                                    int GLF_dead35mid = GLF_dead35i + GLF_live30directions - 1;
                                                    int GLF_dead35to = min(GLF_dead35i + 2 * GLF_live30directions - 1, donor_replacementGLF_dead35high);
                                                    {
                                                        int GLF_live38looplimiter2 = 0;
                                                        if (GLF_live38looplimiter2 >= 3) {
                                                            ;
                                                        }
                                                    }
                                                    GLF_dead35merge(GLF_dead35from, GLF_dead35mid, GLF_dead35to);
                                                }
                                            }
                                            int GLF_live30looplimiter2 = 0;
                                            for (GLF_live30i = 0; GLF_live30i < 8; GLF_live30i++) {
                                                if (GLF_live30looplimiter2 >= 7) {
                                                    break;
                                                }
                                                GLF_live30looplimiter2++;
                                                {
                                                    {
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        int GLF_live30looplimiter1 = 0;
                                                        for (GLF_live30j = 0; GLF_live30j < 8; GLF_live30j++) {
                                                            if (GLF_live30looplimiter1 >= 7) {
                                                                break;
                                                            }
                                                            GLF_live30looplimiter1++;
                                                            {
                                                                if (GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30j * 2 + GLF_live30i * 2 * 16, 256)] == 0) {
                                                                    GLF_live30p.x = GLF_live30j * 2;
                                                                    GLF_live30p.y = GLF_live30i * 2;
                                                                    GLF_live30canwalk = true;
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
                                        GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                    } else {
                                        int GLF_live30d = GLF_live30v % GLF_live30directions;
                                        GLF_live30v += GLF_live30directions;
                                        if (GLF_live30d >= 0 && GLF_live30p.x > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                            {
                                                int GLF_live36looplimiter0 = 0;
                                                if (GLF_live36looplimiter0 >= 7) {
                                                    ;
                                                }
                                            }
                                            GLF_live30d--;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 1) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 2) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30p.x -= 2;
                                        }
                                        if (GLF_live30d >= 0 && GLF_live30p.y > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] == 0) {
                                            GLF_live30d--;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 1) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] = 1;
                                            GLF_live30p.y -= 2;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                                vec2 donor_replacementGLF_dead35color = _GLF_FUZZED(acos(injectionSwitch));
                                                vec3 donor_replacementGLF_dead35vecCoor = _GLF_FUZZED((sign(GLF_live29one) * vec3(-805.795, -2.8, -9.7)));
                                                {
                                                    donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[5]))));
                                                    donor_replacementGLF_dead35color.y -= tanh(donor_replacementGLF_dead35color.x) / cosh(donor_replacementGLF_dead35color.y);
                                                    break;
                                                }
                                            }
                                        }
                                        if (GLF_live30d >= 0 && GLF_live30p.x < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                            GLF_live30d--;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 1) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30p.x += 2;
                                        }
                                        if (GLF_live30d >= 0 && GLF_live30p.y < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 2) * 16, 256)] == 0) {
                                            GLF_live30d--;
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 1) * 16, 256)] = 1;
                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 2) * 16, 256)] = 1;
                                            GLF_live30p.y += 2;
                                        }
                                    }
                                    if (GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30ipos.y * 16 + GLF_live30ipos.x, 256)] == 1) {
                                        GLF_live30_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                        ;
                                    }
                                }
                            }
                        }
                        vec3 donor_replacementGLF_dead23c = _GLF_FUZZED(vec3(-5.0, 805.855, -98.65));
                        for (int GLF_dead23i = 0; GLF_dead23i < 3; GLF_dead23i++) {
                            if (donor_replacementGLF_dead23c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead23i, 3)] >= 1.0) {
                                donor_replacementGLF_dead23c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead23i, 3)] = donor_replacementGLF_dead23c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead23i, 3)] * donor_replacementGLF_dead23c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead23i, 3)];
                            }
                        }
                    }
                    int GLF_live13looplimiter0 = 0;
                    {
                        {
                            {
                                {
                                    ;
                                }
                            }
                            ;
                        }
                    }
                    int GLF_live13v = _GLF_FUZZED(((-68016) | ((-42674) & (-89283))));
                    {
                        vec2 GLF_live36coord = _GLF_FUZZED((vec2(8.5, 4.4) * (-4882.7680)));
                        int GLF_live36i = _GLF_FUZZED(int(28762u));
                        vec4 GLF_live36texel = _GLF_FUZZED((-vec4(1.3, -588.377, -194.373, 6.2)));
                        {
                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                            GLF_live36i++;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        int donor_replacementGLF_dead19i = _GLF_FUZZED(ivec3(46107, -26698, 56198)[0]);
                        if (donor_replacementGLF_dead19i >= int(GLF_dead19resolution.x)) {
                            {
                                float GLF_live24s = _GLF_FUZZED(2030.0577);
                                {
                                    ;
                                }
                            }
                            break;
                            if (_GLF_DEAD(false)) {
                                {
                                    int GLF_live38baseIndex = _GLF_FUZZED(int(true));
                                    int GLF_live38data = _GLF_FUZZED(94142);
                                    int GLF_live38treeIndex = _GLF_FUZZED(((-13440) + 39144));
                                    {
                                        GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex = GLF_live38treeIndex;
                                        GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                        ;
                                    }
                                }
                                float donor_replacementGLF_dead34th = _GLF_FUZZED(fwidthFine(GLF_live29one));
                                {
                                    donor_replacementGLF_dead34th = 1.0 - donor_replacementGLF_dead34th;
                                }
                            }
                        }
                    }
                    {
                        if (GLF_live13looplimiter0 >= 7) {
                            ;
                        }
                        GLF_live13looplimiter0++;
                        {
                            GLF_live13v = (4 * GLF_live13v * (1000 - GLF_live13v)) / 1000;
                        }
                    }
                }
                if (GLF_live9currentNode.data == GLF_live9target) {
                    if (_GLF_DEAD(false)) {
                        {
                            int GLF_live39looplimiter0 = 0;
                            if (GLF_live39looplimiter0 >= 3) {
                                ;
                            }
                        }
                        {
                            break;
                        }
                    }
                    return GLF_live9target;
                }
                GLF_live9index = GLF_live9target > GLF_live9currentNode.data ? GLF_live9currentNode.rightIndex : GLF_live9currentNode.leftIndex;
            }
        }
    }
    return -1;
}

vec4 GLF_live10gl_FragCoord = _GLF_FUZZED(vec4(-9.5, 74.92, 2891.5210, 352.522));
int GLF_live10data[10] = int[10](_GLF_FUZZED(81890), _GLF_FUZZED(-63070), _GLF_FUZZED(83403), _GLF_FUZZED(((96142 - (-9327)) ^ 68190)), _GLF_FUZZED(3426), _GLF_FUZZED(18074), _GLF_FUZZED((~(-48651))), _GLF_FUZZED(35677), _GLF_FUZZED(16605), _GLF_FUZZED(-69196)), GLF_live10temp[10] = int[10](_GLF_FUZZED((82892 * 28654)), _GLF_FUZZED(11106), _GLF_FUZZED(ivec2(77408, 36748).y), _GLF_FUZZED((int(true) - (-46182))), _GLF_FUZZED(20730), _GLF_FUZZED((~67247)), _GLF_FUZZED((ivec3(-94821, -41087, -50497) * ((-82989) | (-64826))).b), _GLF_FUZZED(1192), _GLF_FUZZED((-ivec3(16940, -44196, 19048).b)), _GLF_FUZZED(57113));
int GLF_live7map[16 * 16];
int GLF_dead4map[16 * 16];
layout(set = 0, binding = 12) uniform sampler2D GLF_dead3tex;
const float GLF_dead3weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);

layout(set = 0, binding = 13) uniform buf13 {
    vec3 GLF_dead1polynomial;
};

float GLF_dead1fx(float GLF_dead1x) {
    return GLF_dead1polynomial.x * pow(GLF_dead1x, 2.0) + GLF_dead1polynomial.y * GLF_dead1x + GLF_dead1polynomial.z;
}

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

const int dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);

float _GLF_outlined_0(float donor_replacementGLF_dead1x2, float donor_replacementGLF_dead1C, float donor_replacementGLF_dead1B, float donor_replacementGLF_dead1A) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        vec2 donor_replacementGLF_dead12a = _GLF_FUZZED(vec2(1.0, -7046.8292));
        float donor_replacementGLF_dead12z = _GLF_FUZZED(donor_replacementGLF_dead1x2);
        {
            int GLF_live30directions = _GLF_FUZZED((32673 & (-14255)));
            ivec2 GLF_live30p = _GLF_FUZZED(ivec2(46597, 29445));
            if (GLF_live30p.x < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                GLF_live30directions += 1;
            }
        }
        {
            {
                vec2 GLF_live37pos = _GLF_FUZZED(vec2((vec4(8008.5743, 9.4, 8.5, -5484.2989) * mat3x4(-60.79, 970.019, -6.4, 4.4, 2.1, 9231.0160, 5726.0733, 120.819, -5291.6735, -3.0, 2.8, -934.375))));
                vec4 GLF_live37quad = _GLF_FUZZED((-vec4((vec3(5.9, 69.77, 1.2) * mat3(5.5, -561.795, 7500.9056, 211.846, 8.7, 308.547, -51.15, 3915.6630, -3.9)), -9.9)));
                if (GLF_live37pos.x > GLF_live37quad.x + GLF_live37quad.z) {
                    ;
                }
            }
            donor_replacementGLF_dead12z = donor_replacementGLF_dead12a.x / donor_replacementGLF_dead12a.y;
            {
                int GLF_live38baseIndex = _GLF_FUZZED(16118);
                int GLF_live38data = _GLF_FUZZED((-(-93242)));
                int GLF_live38treeIndex = _GLF_FUZZED(ivec2(2482, -93804).x);
                if (GLF_live38data <= GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].data) {
                    if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex == -1) {
                        GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex = GLF_live38treeIndex;
                        GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                        ;
                    } else {
                        GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex;
                        ;
                    }
                } else {
                    if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex == -1) {
                        GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex = GLF_live38treeIndex;
                        GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                        ;
                    } else {
                        GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex;
                        ;
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
    return donor_replacementGLF_dead1x2 - ((2.0 * donor_replacementGLF_dead1C) / (donor_replacementGLF_dead1B + sign(donor_replacementGLF_dead1B) * sqrt(pow(donor_replacementGLF_dead1B, 2.0) - (4.0 * donor_replacementGLF_dead1A * donor_replacementGLF_dead1C))));
    {
        int GLF_live12target = _GLF_FUZZED(((-16008) & ivec3(-7621, 32251, -59312).p));
        {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            {
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec2 donor_replacementGLF_dead35color = _GLF_FUZZED((GLF_dead22injectionSwitch + donor_replacementGLF_dead1x2));
                    vec3 donor_replacementGLF_dead35vecCoor = _GLF_FUZZED(vec3(16.51, -653.265, 4.9));
                    if (int(GLF_dead35gl_FragCoord[1]) < 270) {
                        donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[7]))));
                        donor_replacementGLF_dead35color.y *= mix(normalize(donor_replacementGLF_dead35vecCoor), normalize(vec3(donor_replacementGLF_dead35color, degrees(donor_replacementGLF_dead35color.x))), GLF_dead35injectionSwitch.x).y;
                        ;
                    } else {
                        discard;
                    }
                }
            }
        }
        int donor_replacementGLF_dead18i = _GLF_FUZZED(bitfieldInsert(-67562, 92805, (~72104), findMSB(-87727)));
        int donor_replacementGLF_dead18j = _GLF_FUZZED(ivec3(-23985, -35348, 29435)[2]);
        uint donor_replacementGLF_dead18uselessOutVariable = _GLF_FUZZED(137926u);
        if (uint(donor_replacementGLF_dead18j) < uaddCarry(uint(donor_replacementGLF_dead18i), 1u, donor_replacementGLF_dead18uselessOutVariable)) {
            ;
        }
    }
}

float _GLF_outlined_1(float donor_replacementGLF_dead1temp) {
    {
        int GLF_live37i = _GLF_FUZZED((~55697));
        vec2 GLF_live37pos = _GLF_FUZZED(vec2(3814.0584, 13.61));
        vec4 GLF_live37res = _GLF_FUZZED((+vec4(-7263.6977, -6.8, -372.104, 8077.6937)));
        if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
            GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
        }
    }
    return donor_replacementGLF_dead1temp;
    {
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead34a = _GLF_FUZZED(injectionSwitch);
            {
                donor_replacementGLF_dead1temp = donor_replacementGLF_dead34a.y / donor_replacementGLF_dead34a.x;
            }
        }
        int GLF_live15a = _GLF_FUZZED(ivec3(73520, -77446, -36141).g);
        int GLF_live15b = _GLF_FUZZED((-99987));
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead17x = _GLF_FUZZED((ldexp(donor_replacementGLF_dead1temp, 41553) / 4.5));
            float donor_replacementGLF_dead17y = _GLF_FUZZED(-69.89);
            if (0.0 > GLF_dead17resolution.x) {
                donor_replacementGLF_dead17x = 1.0;
                donor_replacementGLF_dead17y = 1.0;
            }
        }
        int GLF_live15looplimiter1 = 0;
        vec2 GLF_live15uv = _GLF_FUZZED(vec2(vec3(-4086.2293, 58.01, 508.145)));
        {
            if (GLF_live15looplimiter1 >= 7) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead17iterationCap = _GLF_FUZZED(GLF_live15a);
                    if (0.0 > GLF_dead17resolution.y) {
                        {
                            vec2 GLF_live37pos = _GLF_FUZZED(vec2(7640.3879, 57.70));
                            vec4 GLF_live37quad = _GLF_FUZZED(vec4(vec2(7.3, 875.212), vec2(2514.1422, 8509.1499)));
                            if (GLF_live37pos.y < GLF_live37quad.y) {
                                ;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            vec4 donor_replacementGLF_dead32res = _GLF_FUZZED(GLF_live26_GLF_color);
                            {
                                donor_replacementGLF_dead32res = texture(GLF_dead32tex, GLF_live15uv);
                            }
                        }
                        donor_replacementGLF_dead17iterationCap += 1;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(GLF_live15injectionSwitch);
                            vec4 donor_replacementGLF_dead32res = _GLF_FUZZED(GLF_live15gl_FragCoord);
                            if (donor_replacementGLF_dead32coord.x < 1.0 && donor_replacementGLF_dead32coord.y < 1.0) {
                                donor_replacementGLF_dead32res = texture(GLF_dead32tex, donor_replacementGLF_dead32coord);
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (length(GLF_live15uv) < 0.001) {
                            return 0.0;
                        }
                    }
                }
                {
                    bool GLF_live30canwalk = _GLF_FUZZED(((-69348) != ((-81762) ^ (-92160))));
                    int GLF_live30i = _GLF_FUZZED((20959 + (-23936)));
                    int GLF_live30j = _GLF_FUZZED((99474 & 15263));
                    ivec2 GLF_live30p = _GLF_FUZZED((true ? ivec2(ivec3(-87885, -89938, 66590)) : ivec2(67481, -90771)));
                    {
                        {
                            int GLF_live30looplimiter1 = 0;
                            for (GLF_live30j = 0; GLF_live30j < 8; GLF_live30j++) {
                                if (GLF_live30looplimiter1 >= 7) {
                                    break;
                                }
                                GLF_live30looplimiter1++;
                                {
                                    if (GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30j * 2 + GLF_live30i * 2 * 16, 256)] == 0) {
                                        GLF_live30p.x = GLF_live30j * 2;
                                        GLF_live30p.y = GLF_live30i * 2;
                                        GLF_live30canwalk = true;
                                    }
                                }
                            }
                        }
                    }
                }
                ;
            }
            GLF_live15looplimiter1++;
            {
                int GLF_live29c = _GLF_FUZZED(86347);
                int GLF_live29looplimiter0 = 0;
                uint GLF_live29matrix_number = _GLF_FUZZED((192043u ^ 125940u));
                int GLF_live29r = _GLF_FUZZED(-50629);
                {
                    if (GLF_live29looplimiter0 >= 4) {
                        ;
                    }
                    GLF_live29looplimiter0++;
                    {
                        switch (GLF_live29matrix_number) {
                            case 0u:
                                GLF_live29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                break;
                            case 1u:
                                GLF_live29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                break;
                                {
                                    vec2 GLF_live36coord = _GLF_FUZZED(vec2(-1470.8325, 7214.1805));
                                    int GLF_live36i = _GLF_FUZZED((65845 + (-52716)));
                                    int GLF_live36looplimiter0 = 0;
                                    vec4 GLF_live36texel = _GLF_FUZZED((((-0.1) + vec2(-8.4, -435.084)) * mat4x2(-62.08, -95.81, -71.10, 8.5, 6236.7853, -257.143, 8.8, -303.659)));
                                    {
                                        if (GLF_live36looplimiter0 >= 7) {
                                            ;
                                        }
                                        GLF_live36looplimiter0++;
                                        {
                                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                            GLF_live36i++;
                                        }
                                    }
                                }
                            case 2u:
                                GLF_live29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                break;
                            case 3u:
                                GLF_live29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                break;
                            case 4u:
                                GLF_live29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                break;
                            case 5u:
                                {
                                    {
                                        ;
                                    }
                                }
                                GLF_live29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                break;
                            case 6u:
                                GLF_live29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                break;
                            case 7u:
                                GLF_live29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                break;
                                {
                                    vec2 GLF_live36coord = _GLF_FUZZED(vec2(8.9, 5.4));
                                    int GLF_live36i = _GLF_FUZZED(-93156);
                                    vec4 GLF_live36texel = _GLF_FUZZED(vec4(-35.66, -7.1, 790.931, -5103.3758));
                                    {
                                        GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                        GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                        GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                        GLF_live36i++;
                                    }
                                }
                            case 8u:
                                GLF_live29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                {
                                    {
                                        ;
                                    }
                                }
                                break;
                        }
                    }
                }
            }
            {
                {
                    int GLF_live29looplimiter2 = 0;
                    if (GLF_live29looplimiter2 >= 4) {
                        ;
                    }
                }
                GLF_live15uv.y -= step(GLF_live15injectionSwitch.y, GLF_live15uv.x) + float(GLF_live15a);
                GLF_live15uv.x *= (isnan(GLF_live15uv.y) ? cosh(GLF_live15gl_FragCoord.y) : tanh(GLF_live15gl_FragCoord.x));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                    if (GLF_live15uv.x < 0.0) {
                        {
                            vec2 GLF_live36coord = _GLF_FUZZED((vec2(-1928.4331, -5.3) * mat2(477.998, -83.94, 1984.3594, 0.3)));
                            int GLF_live36i = _GLF_FUZZED(ivec3(93735, 15495, -44941).g);
                            vec4 GLF_live36texel = _GLF_FUZZED((mat3x4(3.0, 327.136, 5.6, -9.9, 5.6, -3.1, -85.47, -420.015, 784.642, 0.4, 616.646, -63.04) * (vec4(-69.46, -7.8, -916.843, -2344.4619) * mat3x4(-8.6, 829.096, -732.526, -5098.7345, -7320.3258, -9891.6200, 317.717, 30.50, -6.2, 31.96, 9.8, -85.22))));
                            {
                                int GLF_live36looplimiter0 = 0;
                                while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                    if (GLF_live36looplimiter0 >= 7) {
                                        break;
                                    }
                                    GLF_live36looplimiter0++;
                                    {
                                        GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                        GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                        GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                        GLF_live36i++;
                                    }
                                }
                            }
                        }
                        donor_replacementGLF_dead1temp = 1.0 - donor_replacementGLF_dead1temp;
                    }
                }
                {
                    vec2 GLF_live27coord = _GLF_FUZZED(vec2(74.39, -334.950));
                    int GLF_live27i = _GLF_FUZZED(86313);
                    {
                        int GLF_live38target = _GLF_FUZZED(-73233);
                        {
                            ;
                        }
                    }
                    vec4 GLF_live27texel = _GLF_FUZZED(vec4(-65.90, -3.1, -1280.1949, 5.0));
                    {
                        int GLF_live27looplimiter0 = 0;
                        while (GLF_live27texel.x + GLF_live27texel.y + GLF_live27texel.z > 1.0 && GLF_live27i < 16) {
                            if (GLF_live27looplimiter0 >= 3) {
                                break;
                            }
                            GLF_live27looplimiter0++;
                            {
                                GLF_live27coord = GLF_live27texel.xz + GLF_live27texel.yy;
                                GLF_live27coord = floor(GLF_live27coord * 256.0) / 256.0;
                                GLF_live27texel = texture(GLF_live27tex, GLF_live27coord);
                                GLF_live27i++;
                            }
                        }
                    }
                    {
                        int GLF_live39looplimiter2 = 0;
                        if (GLF_live39looplimiter2 >= 3) {
                            ;
                        }
                    }
                }
                GLF_live15b--;
            }
            {
                vec2 GLF_live36coord = _GLF_FUZZED(vec2(-5960.7406, 0.0));
                int GLF_live36i = _GLF_FUZZED((-33882));
                int GLF_live36looplimiter0 = 0;
                vec4 GLF_live36texel = _GLF_FUZZED(vec4(vec2(-64.50, 908.315), vec2(-3.4, -8.1)));
                {
                    if (GLF_live36looplimiter0 >= 7) {
                        ;
                    }
                    GLF_live36looplimiter0++;
                    {
                        GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                        GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                        GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                        GLF_live36i++;
                    }
                }
            }
        }
        {
            vec2 GLF_live36coord = _GLF_FUZZED(vec2(-317.184, 6256.7795));
            int GLF_live36i = _GLF_FUZZED(-49328);
            vec4 GLF_live36texel = _GLF_FUZZED(vec2(3.6, -3.4).sttt);
            {
                GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                GLF_live36i++;
            }
        }
        {
            vec2 GLF_live31coord = _GLF_FUZZED((2.5 - vec2(-97.95, 2960.5840)));
            int GLF_live31i = _GLF_FUZZED(-61982);
            int GLF_live31looplimiter0 = 0;
            {
                if (GLF_live31looplimiter0 >= 5) {
                    ;
                }
                GLF_live31looplimiter0++;
                {
                    if (GLF_live31coord.x > 1.0) {
                        {
                            vec2 GLF_live36coord = _GLF_FUZZED((vec2(78.76, -193.913) * vec2(-1.2, 4195.0714)));
                            int GLF_live36i = _GLF_FUZZED(68263);
                            vec4 GLF_live36texel = _GLF_FUZZED(vec4(-36.11, -48.68, -8.9, -1671.6412));
                            {
                                int GLF_live36looplimiter0 = 0;
                                while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                    if (GLF_live36looplimiter0 >= 7) {
                                        break;
                                    }
                                    GLF_live36looplimiter0++;
                                    {
                                        GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                        GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                        GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                        GLF_live36i++;
                                    }
                                }
                            }
                        }
                        GLF_live31coord.x -= 1.0;
                    }
                    if (GLF_live31coord.y > 1.0)
                        GLF_live31coord.y -= 1.0;
                    GLF_live31coord *= 2.0;
                    GLF_live31i++;
                }
            }
        }
    }
}

float _GLF_outlined_2(float GLF_dead1k0, float donor_replacementGLF_dead1A, float GLF_dead1h0) {
    return (((GLF_dead1k0) - (donor_replacementGLF_dead1A * (pow((GLF_dead1h0), 2.0)))) / (GLF_dead1h0));
    {
        int GLF_live38baseIndex = _GLF_FUZZED(ivec2(-9455, 22365).x);
        int GLF_live38data = _GLF_FUZZED((-86820));
        int GLF_live38treeIndex = _GLF_FUZZED(84353);
        {
            GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex = GLF_live38treeIndex;
            GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
            ;
        }
    }
}

vec4 trace(ivec2 pos) {
    while (pos.y != 256) {
        if (pos.x < dp[pos.y] + 15 && pos.x > dp[pos.y] - 15) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                float donor_replacementGLF_dead1A = _GLF_FUZZED(-5247.7056);
                {
                    int GLF_live25looplimiter1 = 0;
                    if (GLF_live25looplimiter1 >= 4) {
                        ;
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                        vec4 donor_replacementGLF_dead33c = _GLF_FUZZED(mix(GLF_live30_GLF_color, GLF_live30_GLF_color, notEqual(fwidthCoarse(GLF_dead11gl_FragCoord), GLF_dead11gl_FragCoord)));
                        int donor_replacementGLF_dead33i = _GLF_FUZZED(GLF_live25looplimiter1);
                        {
                            donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)] = donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)] * donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)];
                        }
                    }
                    {
                        vec2 GLF_live36coord = _GLF_FUZZED(vec2(-521.963, 47.57));
                        int GLF_live36i = _GLF_FUZZED(66320);
                        int GLF_live36looplimiter0 = 0;
                        vec4 GLF_live36texel = _GLF_FUZZED(vec4(vec3(4.1, 287.946, -4.6), -6.9));
                        while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                            if (GLF_live36looplimiter0 >= 7) {
                                break;
                            }
                            GLF_live36looplimiter0++;
                            {
                                GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                GLF_live36i++;
                            }
                        }
                    }
                    {
                        int GLF_live30directions = _GLF_FUZZED(-9793);
                        ivec2 GLF_live30p = _GLF_FUZZED(ivec2(-53923, 25510));
                        int GLF_live30v = _GLF_FUZZED(52833);
                        {
                            int GLF_live37looplimiter0 = 0;
                            if (GLF_live37looplimiter0 >= 3) {
                                ;
                            }
                        }
                        {
                            int GLF_live30d = GLF_live30v % GLF_live30directions;
                            GLF_live30v += GLF_live30directions;
                            if (_GLF_DEAD(false)) {
                                vec4 donor_replacementGLF_dead33c = _GLF_FUZZED(GLF_live26_GLF_color);
                                int donor_replacementGLF_dead33i = _GLF_FUZZED((mat2x4(mat3x4(-2.5, -79.25, -4768.5639, 196.609, 635.522, -4599.2581, 3518.6989, 3.0, -622.036, -1068.8999, 9357.3162, -5191.7179)), GLF_live24msb8));
                                do {
                                    if (donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)] >= 1.0) {
                                        donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)] = donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)] * donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)];
                                    }
                                    donor_replacementGLF_dead33i++;
                                } while (donor_replacementGLF_dead33i < findMSB(findLSB(GLF_live24msb8)));
                            }
                            if (GLF_live30d >= 0 && GLF_live30p.x > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                GLF_live30d--;
                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 1) + (GLF_live30p.y) * 16, 256)] = 1;
                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 2) + (GLF_live30p.y) * 16, 256)] = 1;
                                GLF_live30p.x -= 2;
                            }
                            if (GLF_live30d >= 0 && GLF_live30p.y > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] == 0) {
                                GLF_live30d--;
                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 1) * 16, 256)] = 1;
                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] = 1;
                                GLF_live30p.y -= 2;
                            }
                            if (GLF_live30d >= 0 && GLF_live30p.x < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                GLF_live30d--;
                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 1) + (GLF_live30p.y) * 16, 256)] = 1;
                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] = 1;
                                GLF_live30p.x += 2;
                            }
                            if (GLF_live30d >= 0 && GLF_live30p.y < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 2) * 16, 256)] == 0) {
                                GLF_live30d--;
                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 1) * 16, 256)] = 1;
                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 2) * 16, 256)] = 1;
                                GLF_live30p.y += 2;
                            }
                        }
                    }
                }
                {
                    int GLF_live5looplimiter1 = 0;
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead12a = _GLF_FUZZED(injectionSwitch);
                        if (donor_replacementGLF_dead12a.y < donor_replacementGLF_dead12a.x) {
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead17x = _GLF_FUZZED(donor_replacementGLF_dead1A);
                                {
                                    vec2 GLF_live36coord = _GLF_FUZZED(vec2(-3.2, 6.7));
                                    int GLF_live36i = _GLF_FUZZED(int(90552u));
                                    int GLF_live36looplimiter0 = 0;
                                    vec4 GLF_live36texel = _GLF_FUZZED((625.886 + vec4(-55.03, -5.8, 92.74, 9844.3633)));
                                    while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                        if (GLF_live36looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live36looplimiter0++;
                                        {
                                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                            GLF_live36i++;
                                        }
                                    }
                                }
                                float donor_replacementGLF_dead17y = _GLF_FUZZED(donor_replacementGLF_dead1A);
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(fwidthFine(GLF_live15injectionSwitch));
                                    vec4 donor_replacementGLF_dead32res = _GLF_FUZZED((-GLF_live26_GLF_color));
                                    {
                                        donor_replacementGLF_dead32res = texture(GLF_dead32tex, donor_replacementGLF_dead32coord);
                                    }
                                }
                                if (donor_replacementGLF_dead17x * donor_replacementGLF_dead17x + donor_replacementGLF_dead17y * donor_replacementGLF_dead17y > 4.0) {
                                    break;
                                }
                            }
                            donor_replacementGLF_dead1A = 0.5 - donor_replacementGLF_dead1A;
                        }
                        {
                            {
                                ;
                            }
                        }
                    }
                    if (GLF_live5looplimiter1 >= 7) {
                        ;
                    }
                }
                {
                    int GLF_live13looplimiter0 = 0;
                    {
                        vec2 GLF_live36coord = _GLF_FUZZED(vec2(-67.98, -52.66));
                        int GLF_live36i = _GLF_FUZZED(-95049);
                        int GLF_live36looplimiter0 = 0;
                        vec4 GLF_live36texel = _GLF_FUZZED(vec4(8.1, 53.09, 3539.3191, -621.440));
                        {
                            if (GLF_live36looplimiter0 >= 7) {
                                ;
                            }
                            GLF_live36looplimiter0++;
                            {
                                GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                GLF_live36i++;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        vec4 donor_replacementGLF_dead33c = _GLF_FUZZED((GLF_dead1polynomial * GLF_live29m43));
                        {
                            if (donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13looplimiter0, 4)] >= 1.0) {
                                donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13looplimiter0, 4)] = donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13looplimiter0, 4)] * donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13looplimiter0, 4)];
                            }
                            GLF_live13looplimiter0++;
                        }
                    }
                    if (GLF_live13looplimiter0 >= 7) {
                        {
                            {
                                ;
                            }
                        }
                        ;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead21th = _GLF_FUZZED(donor_replacementGLF_dead1A);
                            {
                                donor_replacementGLF_dead21th = -donor_replacementGLF_dead21th;
                                {
                                    int GLF_live37i = _GLF_FUZZED(((-89141) & (-(-42329))));
                                    vec2 GLF_live37pos = _GLF_FUZZED(vec2(348.343, 3098.6764));
                                    vec4 GLF_live37res = _GLF_FUZZED(vec4(vec2(-3.8, -661.880).g));
                                    if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
                                        GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead34th = _GLF_FUZZED(exp(-8.6));
                                {
                                    donor_replacementGLF_dead34th = -donor_replacementGLF_dead34th;
                                }
                            }
                        }
                    }
                }
                float donor_replacementGLF_dead1B = _GLF_FUZZED(7253.2805);
                float donor_replacementGLF_dead1C = _GLF_FUZZED(-72.13);
                {
                    vec2 GLF_live36coord = _GLF_FUZZED((vec2(-1.2, -6.6) * 7828.6517));
                    int GLF_live36i = _GLF_FUZZED((-(-(-27208))));
                    vec4 GLF_live36texel = _GLF_FUZZED(vec4(13.99, -996.174, 954.778, -89.00));
                    {
                        GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                        GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                        GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                        GLF_live36i++;
                    }
                }
                float donor_replacementGLF_dead1temp = _GLF_FUZZED((5.5 - 0.3));
                float donor_replacementGLF_dead1x0 = _GLF_FUZZED(-31.07);
                float donor_replacementGLF_dead1x1 = _GLF_FUZZED(normalize(1.3));
                float donor_replacementGLF_dead1x2 = _GLF_FUZZED(908.541);
                {
                    float GLF_dead1h0 = donor_replacementGLF_dead1x0 - donor_replacementGLF_dead1x2;
                    {
                        {
                            ;
                        }
                    }
                    float GLF_dead1h1 = donor_replacementGLF_dead1x1 - donor_replacementGLF_dead1x2;
                    {
                        {
                            vec2 GLF_live36coord = _GLF_FUZZED(vec2(-9.3, -7493.8960));
                            int GLF_live36i = _GLF_FUZZED((true ? 96153 : 85758));
                            vec4 GLF_live36texel = _GLF_FUZZED(vec4(46.45, -5.2, 406.696, 648.081));
                            {
                                GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                GLF_live36i++;
                            }
                        }
                        int GLF_live29c = _GLF_FUZZED(((-59776) ^ (27619 + (-97643))));
                        int GLF_live29looplimiter0 = 0;
                        uint GLF_live29matrix_number = _GLF_FUZZED((55812u + 29101u));
                        int GLF_live29rows = _GLF_FUZZED(((-94456) + ivec4(-48360, -18879, 95916, 45971)).b);
                        for (int GLF_live29r = 0; GLF_live29r < GLF_live29rows; GLF_live29r++) {
                            if (GLF_live29looplimiter0 >= 4) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead34a = _GLF_FUZZED(GLF_dead17resolution);
                                float donor_replacementGLF_dead34z = _GLF_FUZZED(float(GLF_live24msb8));
                                {
                                    donor_replacementGLF_dead34z = donor_replacementGLF_dead34a.y / donor_replacementGLF_dead34a.x;
                                }
                            }
                            GLF_live29looplimiter0++;
                            {
                                switch (GLF_live29matrix_number) {
                                    case 0u:
                                        GLF_live29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                        break;
                                    case 1u:
                                        GLF_live29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                        break;
                                    case 2u:
                                        GLF_live29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                        break;
                                    case 3u:
                                        GLF_live29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                        break;
                                    case 4u:
                                        GLF_live29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                        break;
                                        {
                                            vec2 GLF_live36coord = _GLF_FUZZED(vec2(-844.272, -5991.4374));
                                            int GLF_live36i = _GLF_FUZZED(57116);
                                            vec4 GLF_live36texel = _GLF_FUZZED(vec4(0.9, -1690.2137, 3.4, 99.05));
                                            {
                                                int GLF_live36looplimiter0 = 0;
                                                while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                                    if (GLF_live36looplimiter0 >= 7) {
                                                        break;
                                                    }
                                                    GLF_live36looplimiter0++;
                                                    {
                                                        GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                        GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                        GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                        GLF_live36i++;
                                                    }
                                                }
                                            }
                                        }
                                    case 5u:
                                        GLF_live29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                        break;
                                    case 6u:
                                        GLF_live29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                        {
                                            int GLF_live36looplimiter0 = 0;
                                            if (GLF_live36looplimiter0 >= 7) {
                                                ;
                                            }
                                        }
                                        break;
                                    case 7u:
                                        GLF_live29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                        break;
                                    case 8u:
                                        GLF_live29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead33s = _GLF_FUZZED(float(floatBitsToInt(donor_replacementGLF_dead1C)));
                                            while (GLF_live29rows < bitfieldInsert(800, GLF_live29rows, 0, 0)) {
                                                if (mod(float(GLF_live29rows), donor_replacementGLF_dead1A) <= 0.01) {
                                                    donor_replacementGLF_dead33s += 0.2;
                                                }
                                                if (float(GLF_live29rows) >= donor_replacementGLF_dead1temp) {
                                                    ;
                                                }
                                                GLF_live29rows++;
                                            }
                                        }
                                        break;
                                }
                            }
                        }
                    }
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
                    float GLF_dead1k0 = GLF_dead1fx(donor_replacementGLF_dead1x0) - GLF_dead1fx(donor_replacementGLF_dead1x2);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead35color = _GLF_FUZZED((vec2(4.6, -762.381) * donor_replacementGLF_dead1B));
                            int donor_replacementGLF_dead35i = _GLF_FUZZED(GLF_live24msb8);
                            vec3 donor_replacementGLF_dead35vecCoor = _GLF_FUZZED(cosh(GLF_dead1polynomial));
                            {
                                donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[4]))));
                                donor_replacementGLF_dead35color[1] += asinh(GLF_dead35gl_FragCoord.y * ldexp(donor_replacementGLF_dead35color.y, -donor_replacementGLF_dead35i));
                                break;
                            }
                        }
                        vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED(vec2(-9.4, 6.7));
                        {
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead12a = _GLF_FUZZED((-vec2(0.8, -6.0)));
                                if (donor_replacementGLF_dead12a.y > donor_replacementGLF_dead12a.x) {
                                    donor_replacementGLF_dead1x1 = donor_replacementGLF_dead12a.x / donor_replacementGLF_dead12a.y;
                                } else {
                                    donor_replacementGLF_dead1x1 = donor_replacementGLF_dead12a.y / donor_replacementGLF_dead12a.x;
                                    {
                                        int GLF_live38looplimiter1 = 0;
                                        if (GLF_live38looplimiter1 >= 3) {
                                            ;
                                        }
                                    }
                                }
                                {
                                    {
                                        ;
                                    }
                                    {
                                        int GLF_live26baseIndex = _GLF_FUZZED(6575);
                                        {
                                            bool GLF_live30canwalk = _GLF_FUZZED((mat4x3(-385.133, -472.729, -39.36, 107.515, 9063.0856, 7.1, -35.15, 6333.3005, -119.579, 469.484, 0.4, 701.732) != (mat2x3(-4.2, -682.208, 6.3, -1.0, 60.10, -1.2) * mat4x2(2170.4904, 3.0, -9.9, 518.020, -6801.6594, -7.2, -9257.0541, 2735.2879))));
                                            int GLF_live30directions = _GLF_FUZZED((-17476));
                                            int GLF_live30i = _GLF_FUZZED(17245);
                                            ivec2 GLF_live30p = _GLF_FUZZED(ivec2(50948, -6933));
                                            int GLF_live30v = _GLF_FUZZED(-35432);
                                            if (GLF_live30directions == 0) {
                                                GLF_live30canwalk = false;
                                                int GLF_live30j = _GLF_FUZZED(-39873);
                                                {
                                                    int GLF_live30looplimiter2 = 0;
                                                    {
                                                        int GLF_live38looplimiter0 = 0;
                                                        if (GLF_live38looplimiter0 >= 3) {
                                                            ;
                                                        }
                                                    }
                                                    for (GLF_live30i = 0; GLF_live30i < 8; GLF_live30i++) {
                                                        if (GLF_live30looplimiter2 >= 7) {
                                                            break;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            int donor_replacementGLF_dead35k = _GLF_FUZZED(25968);
                                                            {
                                                                GLF_dead35temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35k++, 10)] = GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30v++, 10)];
                                                            }
                                                        }
                                                        GLF_live30looplimiter2++;
                                                        {
                                                            {
                                                                int GLF_live30looplimiter1 = 0;
                                                                for (GLF_live30j = 0; GLF_live30j < 8; GLF_live30j++) {
                                                                    if (GLF_live30looplimiter1 >= 7) {
                                                                        break;
                                                                        if (_GLF_DEAD(false)) {
                                                                            int donor_replacementGLF_dead33i = _GLF_FUZZED(GLF_live26baseIndex);
                                                                            {
                                                                                GLF_dead11gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)] = GLF_dead11gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)] * GLF_dead11gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)];
                                                                            }
                                                                        }
                                                                    }
                                                                    GLF_live30looplimiter1++;
                                                                    {
                                                                        if (GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30j * 2 + GLF_live30i * 2 * 16, 256)] == 0) {
                                                                            GLF_live30p.x = GLF_live30j * 2;
                                                                            GLF_live30p.y = GLF_live30i * 2;
                                                                            if (_GLF_DEAD(false)) {
                                                                                {
                                                                                    vec2 GLF_live37pos = _GLF_FUZZED(((8370.9418 * (-231.464)) * vec3(-55.35, -66.35, -2.2).rr));
                                                                                    vec4 GLF_live37quad = _GLF_FUZZED(vec4(vec3(2.5, -6.8, 7213.8828), float(42220)));
                                                                                    if (GLF_live37pos.y > GLF_live37quad.y + GLF_live37quad.w) {
                                                                                        ;
                                                                                    }
                                                                                }
                                                                                vec4 donor_replacementGLF_dead33c = _GLF_FUZZED(GLF_live30_GLF_color);
                                                                                int donor_replacementGLF_dead33i = _GLF_FUZZED(GLF_live30looplimiter1);
                                                                                {
                                                                                    if (donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)] >= 1.0) {
                                                                                        donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)] = donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)] * donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)];
                                                                                    }
                                                                                    donor_replacementGLF_dead33i++;
                                                                                }
                                                                            }
                                                                            GLF_live30canwalk = true;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                            } else {
                                                int GLF_live30d = GLF_live30v % GLF_live30directions;
                                                GLF_live30v += GLF_live30directions;
                                                if (GLF_live30d >= 0 && GLF_live30p.x > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                                    GLF_live30d--;
                                                    if (_GLF_DEAD(false)) {
                                                        vec2 donor_replacementGLF_dead35color = _GLF_FUZZED(dFdx(GLF_dead19resolution));
                                                        int donor_replacementGLF_dead35i = _GLF_FUZZED(GLF_live30directions);
                                                        vec3 donor_replacementGLF_dead35vecCoor = _GLF_FUZZED(GLF_dead1polynomial);
                                                        if (int(GLF_dead35gl_FragCoord[1]) < 90) {
                                                            donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[2]))));
                                                            donor_replacementGLF_dead35color.x += atanh(donor_replacementGLF_dead35color.x) * cosh(GLF_dead35injectionSwitch.y) * smoothstep(donor_replacementGLF_dead35color, GLF_dead35injectionSwitch, GLF_dead35gl_FragCoord.yy).x;
                                                            break;
                                                        } else if (int(GLF_dead35gl_FragCoord[1]) < 120) {
                                                            donor_replacementGLF_dead35color = fract(acosh(clamp(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[3])), 1.0, 1000.0)));
                                                            donor_replacementGLF_dead35color.x += (isnan(GLF_dead35gl_FragCoord.x) ? log2(GLF_dead35gl_FragCoord.x) : log2(GLF_dead35gl_FragCoord.y));
                                                            break;
                                                        } else {
                                                            {
                                                                int GLF_live37i = _GLF_FUZZED(-44227);
                                                                vec4 GLF_live37res = _GLF_FUZZED(vec4(2.4, 6.0, -878.952, -4562.0906));
                                                                {
                                                                    GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                                                }
                                                            }
                                                            if (int(GLF_dead35gl_FragCoord[1]) < 150) {
                                                                discard;
                                                            } else if (int(GLF_dead35gl_FragCoord[1]) < 180) {
                                                                donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[4]))));
                                                                donor_replacementGLF_dead35color[1] += asinh(GLF_dead35gl_FragCoord.y * ldexp(donor_replacementGLF_dead35color.y, -donor_replacementGLF_dead35i));
                                                                break;
                                                            } else if (int(GLF_dead35gl_FragCoord[1]) < 210) {
                                                                donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[5]))));
                                                                donor_replacementGLF_dead35color.y -= tanh(donor_replacementGLF_dead35color.x) / cosh(donor_replacementGLF_dead35color.y);
                                                                break;
                                                            } else if (int(GLF_dead35gl_FragCoord[1]) < 240) {
                                                                donor_replacementGLF_dead35color = fract(asinh(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[6]))));
                                                                donor_replacementGLF_dead35color.y -= isnan(float(donor_replacementGLF_dead35i)) ? tanh(GLF_dead35gl_FragCoord.x) : atanh(GLF_dead35gl_FragCoord.y);
                                                                break;
                                                            } else if (int(GLF_dead35gl_FragCoord[1]) < 270) {
                                                                donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[7]))));
                                                                donor_replacementGLF_dead35color.y *= mix(normalize(donor_replacementGLF_dead35vecCoor), normalize(vec3(donor_replacementGLF_dead35color, degrees(donor_replacementGLF_dead35color.x))), GLF_dead35injectionSwitch.x).y;
                                                                break;
                                                            } else {
                                                                discard;
                                                            }
                                                        }
                                                    }
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 1) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 2) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30p.x -= 2;
                                                }
                                                if (GLF_live30d >= 0 && GLF_live30p.y > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] == 0) {
                                                    GLF_live30d--;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 1) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] = 1;
                                                    GLF_live30p.y -= 2;
                                                }
                                                if (GLF_live30d >= 0 && GLF_live30p.x < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                                    GLF_live30d--;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 1) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30p.x += 2;
                                                }
                                                if (GLF_live30d >= 0 && GLF_live30p.y < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 2) * 16, 256)] == 0) {
                                                    GLF_live30d--;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 1) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 2) * 16, 256)] = 1;
                                                    GLF_live30p.y += 2;
                                                }
                                            }
                                            {
                                                int GLF_live37i = _GLF_FUZZED(20219);
                                                int GLF_live37looplimiter0 = 0;
                                                vec2 GLF_live37pos = _GLF_FUZZED((mat3x2(-5.9, -90.59, 3.9, 4.9, 0.8, 9.2) * vec3(609.631, 9.8, -64.19)));
                                                vec4 GLF_live37res = _GLF_FUZZED((mat3x4(333.085, 7.8, -9.9, -453.517, -8.1, 494.703, 8854.9572, -5784.7412, -8.8, -49.44, 40.75, 933.332) * vec3(-45.31, -71.25, -2.0)));
                                                {
                                                    if (GLF_live37looplimiter0 >= 3) {
                                                        ;
                                                    }
                                                    GLF_live37looplimiter0++;
                                                    {
                                                        if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
                                                            GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        int GLF_live26data = _GLF_FUZZED(61128);
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        int GLF_live26treeIndex = _GLF_FUZZED(31375);
                                        {
                                            if (GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].rightIndex == -1) {
                                                GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].rightIndex = GLF_live26treeIndex;
                                                GLF_live26makeTreeNode(GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26treeIndex, 10)], GLF_live26data);
                                                ;
                                            } else {
                                                GLF_live26baseIndex = GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].rightIndex;
                                                ;
                                            }
                                        }
                                    }
                                }
                            }
                            {
                                vec2 GLF_live27coord = _GLF_FUZZED(vec2(-88.01, 6.4));
                                int GLF_live27i = _GLF_FUZZED((~(-14785)));
                                vec4 GLF_live27texel = _GLF_FUZZED(vec4(4276.6393, 80.50, 993.338, 0.8));
                                {
                                    GLF_live27coord = GLF_live27texel.xz + GLF_live27texel.yy;
                                    GLF_live27coord = floor(GLF_live27coord * 256.0) / 256.0;
                                    GLF_live27texel = texture(GLF_live27tex, GLF_live27coord);
                                    GLF_live27i++;
                                }
                            }
                            float GLF_live6th = _GLF_FUZZED(float(25386));
                            {
                                int GLF_live9result = _GLF_FUZZED(-31831);
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead35i = _GLF_FUZZED(81227);
                                    int donor_replacementGLF_dead35k = _GLF_FUZZED(GLF_live9result);
                                    if (GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i, 10)] < GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24msb8, 10)]) {
                                        GLF_dead35temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35k++, 10)] = GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i++, 10)];
                                    } else {
                                        GLF_dead35temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35k++, 10)] = GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24msb8++, 10)];
                                    }
                                }
                                {
                                    vec2 GLF_live36coord = _GLF_FUZZED(vec2(-44.75, 654.149));
                                    int GLF_live36i = _GLF_FUZZED(8418);
                                    vec4 GLF_live36texel = _GLF_FUZZED(vec4((vec2(876.026, -6.3) - 67.13), vec2(-64.27, -6551.7182)));
                                    {
                                        GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                        GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                        GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                        GLF_live36i++;
                                    }
                                }
                                int GLF_live9sum = _GLF_FUZZED(int(173953u));
                                {
                                    GLF_live9sum += GLF_live9result;
                                    {
                                        bool GLF_live30canwalk = _GLF_FUZZED((46647 < (((-71175) + (-65831)) + (-69921))));
                                        int GLF_live30i = _GLF_FUZZED(89890);
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        int GLF_live30j = _GLF_FUZZED(((-69149) - (-33448)));
                                        ivec2 GLF_live30p = _GLF_FUZZED(ivec2(48621, -34069));
                                        {
                                            vec2 GLF_live36coord = _GLF_FUZZED((false ? vec2(58.47, 2.6) : vec2(-8.6, 66.31)));
                                            int GLF_live36i = _GLF_FUZZED((21040 & (-20401)));
                                            int GLF_live36looplimiter0 = 0;
                                            vec4 GLF_live36texel = _GLF_FUZZED(vec2(-5.6, 4758.8571).stst);
                                            {
                                                if (GLF_live36looplimiter0 >= 7) {
                                                    ;
                                                }
                                                GLF_live36looplimiter0++;
                                                {
                                                    GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                    GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                    GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                    GLF_live36i++;
                                                }
                                            }
                                        }
                                        {
                                            {
                                                int GLF_live30looplimiter1 = 0;
                                                for (GLF_live30j = 0; GLF_live30j < 8; GLF_live30j++) {
                                                    if (GLF_live30looplimiter1 >= 7) {
                                                        break;
                                                    }
                                                    {
                                                        int GLF_live38baseIndex = _GLF_FUZZED(-13243);
                                                        int GLF_live38data = _GLF_FUZZED((~(-23420)));
                                                        int GLF_live38treeIndex = _GLF_FUZZED(((-7269) & 67893));
                                                        if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex == -1) {
                                                            GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex = GLF_live38treeIndex;
                                                            GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                                            ;
                                                        } else {
                                                            GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex;
                                                            ;
                                                        }
                                                    }
                                                    GLF_live30looplimiter1++;
                                                    {
                                                        if (GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30j * 2 + GLF_live30i * 2 * 16, 256)] == 0) {
                                                            GLF_live30p.x = GLF_live30j * 2;
                                                            GLF_live30p.y = GLF_live30i * 2;
                                                            GLF_live30canwalk = true;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            vec3 donor_replacementGLF_dead35vecCoor = _GLF_FUZZED((donor_replacementGLF_dead1temp - mat2x3(826.237, 3.7, 534.334, 23.84, 282.246, -338.336))[1]);
                                            do {
                                                if (int(GLF_dead35gl_FragCoord[1]) < 30) {
                                                    donor_replacementGLF_dead3coord = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[0]))));
                                                    donor_replacementGLF_dead3coord[0] = dFdy(GLF_dead35gl_FragCoord.y);
                                                    break;
                                                } else if (int(GLF_dead35gl_FragCoord[1]) < 60) {
                                                    donor_replacementGLF_dead3coord = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[1]))));
                                                    donor_replacementGLF_dead3coord[1] *= atan(faceforward(GLF_dead35injectionSwitch, donor_replacementGLF_dead3coord.xx, donor_replacementGLF_dead35vecCoor.yx).y);
                                                    break;
                                                } else if (int(GLF_dead35gl_FragCoord[1]) < 90) {
                                                    donor_replacementGLF_dead3coord = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[2]))));
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    donor_replacementGLF_dead3coord.x += atanh(donor_replacementGLF_dead3coord.x) * cosh(GLF_dead35injectionSwitch.y) * smoothstep(donor_replacementGLF_dead3coord, GLF_dead35injectionSwitch, GLF_dead35gl_FragCoord.yy).x;
                                                    break;
                                                } else if (int(GLF_dead35gl_FragCoord[1]) < 120) {
                                                    donor_replacementGLF_dead3coord = fract(acosh(clamp(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[3])), 1.0, 1000.0)));
                                                    donor_replacementGLF_dead3coord.x += (isnan(GLF_dead35gl_FragCoord.x) ? log2(GLF_dead35gl_FragCoord.x) : log2(GLF_dead35gl_FragCoord.y));
                                                    break;
                                                } else if (int(GLF_dead35gl_FragCoord[1]) < 150) {
                                                    discard;
                                                } else if (int(GLF_dead35gl_FragCoord[1]) < 180) {
                                                    donor_replacementGLF_dead3coord = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[4]))));
                                                    donor_replacementGLF_dead3coord[1] += asinh(GLF_dead35gl_FragCoord.y * ldexp(donor_replacementGLF_dead3coord.y, -GLF_live24msb8));
                                                    break;
                                                } else if (int(GLF_dead35gl_FragCoord[1]) < 210) {
                                                    donor_replacementGLF_dead3coord = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[5]))));
                                                    donor_replacementGLF_dead3coord.y -= tanh(donor_replacementGLF_dead3coord.x) / cosh(donor_replacementGLF_dead3coord.y);
                                                    break;
                                                } else if (int(GLF_dead35gl_FragCoord[1]) < 240) {
                                                    donor_replacementGLF_dead3coord = fract(asinh(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[6]))));
                                                    donor_replacementGLF_dead3coord.y -= isnan(float(GLF_live24msb8)) ? tanh(GLF_dead35gl_FragCoord.x) : atanh(GLF_dead35gl_FragCoord.y);
                                                    break;
                                                } else if (int(GLF_dead35gl_FragCoord[1]) < 270) {
                                                    donor_replacementGLF_dead3coord = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[7]))));
                                                    donor_replacementGLF_dead3coord.y *= mix(normalize(donor_replacementGLF_dead35vecCoor), normalize(vec3(donor_replacementGLF_dead3coord, degrees(donor_replacementGLF_dead3coord.x))), GLF_dead35injectionSwitch.x).y;
                                                    break;
                                                } else {
                                                    discard;
                                                }
                                            } while (0 == int(GLF_dead35injectionSwitch.x));
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                vec2 donor_replacementGLF_dead35color = _GLF_FUZZED(injectionSwitch);
                                vec3 donor_replacementGLF_dead35vecCoor = _GLF_FUZZED(vec3(intBitsToFloat(ivec2(37313, 82536)), -66.10));
                                {
                                    {
                                        vec2 GLF_live36coord = _GLF_FUZZED(vec2(vec3(97.97, 2.8, 7.9)));
                                        int GLF_live36i = _GLF_FUZZED(84971);
                                        int GLF_live36looplimiter0 = 0;
                                        vec4 GLF_live36texel = _GLF_FUZZED(vec4(0.9, vec2(550.352, -1.9), -108.234));
                                        while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                            if (GLF_live36looplimiter0 >= 7) {
                                                break;
                                            }
                                            GLF_live36looplimiter0++;
                                            {
                                                GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                GLF_live36i++;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead35color = fract(acosh(clamp(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[3])), 1.0, 1000.0)));
                                    donor_replacementGLF_dead35color.x += (isnan(GLF_dead35gl_FragCoord.x) ? log2(GLF_dead35gl_FragCoord.x) : log2(GLF_dead35gl_FragCoord.y));
                                    break;
                                }
                            }
                            {
                                GLF_live6th = 0.5 - GLF_live6th;
                                {
                                    float GLF_live10grey = _GLF_FUZZED(-53.67);
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    {
                                        if (_GLF_DEAD(false)) {
                                            vec3 donor_replacementGLF_dead23c = _GLF_FUZZED(clamp((false ? vec3(-33.69, -73.13, -422.318) : dFdyCoarse(GLF_dead1polynomial)), donor_replacementGLF_dead1x2, donor_replacementGLF_dead1A));
                                            int donor_replacementGLF_dead23i = _GLF_FUZZED(-23788);
                                            if (donor_replacementGLF_dead23c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead23i, 3)] >= 1.0) {
                                                donor_replacementGLF_dead23c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead23i, 3)] = donor_replacementGLF_dead23c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead23i, 3)] * donor_replacementGLF_dead23c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead23i, 3)];
                                            }
                                            {
                                                bool GLF_live30canwalk = _GLF_FUZZED((mat3(-93.60, -42.94, -4.6, 4.2, -108.257, -251.214, 431.026, 869.457, -6.4) != mat3(-4.1, 965.983, -68.19, 91.75, -308.278, 7.1, 6.3, 762.862, -8227.0569)));
                                                int GLF_live30i = _GLF_FUZZED(53737);
                                                int GLF_live30j = _GLF_FUZZED(1037);
                                                int GLF_live30looplimiter2 = 0;
                                                ivec2 GLF_live30p = _GLF_FUZZED(ivec2(-87646, -82765));
                                                for (GLF_live30i = 0; GLF_live30i < 8; GLF_live30i++) {
                                                    if (GLF_live30looplimiter2 >= 7) {
                                                        break;
                                                    }
                                                    GLF_live30looplimiter2++;
                                                    {
                                                        {
                                                            int GLF_live30looplimiter1 = 0;
                                                            for (GLF_live30j = 0; GLF_live30j < 8; GLF_live30j++) {
                                                                if (GLF_live30looplimiter1 >= 7) {
                                                                    break;
                                                                }
                                                                GLF_live30looplimiter1++;
                                                                {
                                                                    if (GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30j * 2 + GLF_live30i * 2 * 16, 256)] == 0) {
                                                                        GLF_live30p.x = GLF_live30j * 2;
                                                                        GLF_live30p.y = GLF_live30i * 2;
                                                                        GLF_live30canwalk = true;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (int(GLF_live10gl_FragCoord[1]) < 150) {
                                            ;
                                        } else {
                                            if (int(GLF_live10gl_FragCoord[1]) < 180) {
                                                GLF_live10grey = 0.5 + float(GLF_live10data[5]) / 10.0;
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead16xCoord = _GLF_FUZZED(atan(GLF_dead1h0, GLF_live6th));
                                                    {
                                                        ;
                                                    }
                                                }
                                            } else {
                                                {
                                                    vec2 GLF_live36coord = _GLF_FUZZED((vec2(-3833.0462, -3.4) + (+vec2(3378.6432, -0.7))));
                                                    int GLF_live36i = _GLF_FUZZED(ivec4(-55206, 30654, -95485, -4396).r);
                                                    int GLF_live36looplimiter0 = 0;
                                                    vec4 GLF_live36texel = _GLF_FUZZED(vec4(64.83, -1.3, -4.1, 1.7));
                                                    {
                                                        if (GLF_live36looplimiter0 >= 7) {
                                                            ;
                                                        }
                                                        GLF_live36looplimiter0++;
                                                        {
                                                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                            GLF_live36i++;
                                                        }
                                                    }
                                                }
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                {
                                                    int GLF_live15a = _GLF_FUZZED(-63869);
                                                    vec2 GLF_live15uv = _GLF_FUZZED(vec2(vec4(8921.8601, 193.503, -448.319, -3053.2432)));
                                                    {
                                                        GLF_live15uv.y -= step(GLF_live15injectionSwitch.y, GLF_live15uv.x);
                                                        GLF_live15uv.x -= fract(tanh(GLF_live15uv.x)) / ldexp(GLF_live15injectionSwitch.y, findMSB(GLF_live15a));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            if (length(donor_replacementGLF_dead3coord) < 0.001) {
                                                                ;
                                                            }
                                                        }
                                                        GLF_live15a--;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, sqrt(0.0))), dot(vec2(1.0, 1.0), vec2(0.0, sqrt(0.0)))))))) {
                                                            if (GLF_live15uv.y < 0.0) {
                                                                GLF_dead1h0 = -GLF_dead1h0;
                                                            }
                                                        }
                                                        {
                                                            int GLF_live26count = _GLF_FUZZED(-15861);
                                                            int GLF_live26i = _GLF_FUZZED(14562);
                                                            int GLF_live26looplimiter2 = 0;
                                                            {
                                                                if (GLF_live26looplimiter2 >= 5) {
                                                                    {
                                                                        {
                                                                            ;
                                                                        }
                                                                    }
                                                                    ;
                                                                }
                                                                {
                                                                    int GLF_live38result = _GLF_FUZZED(ivec2(-13006, -33334).y);
                                                                    int GLF_live38sum = _GLF_FUZZED((9927 - (-84004)));
                                                                    {
                                                                        switch (GLF_live38result) {
                                                                            case -1:
                                                                                GLF_live38sum += 1;
                                                                                break;
                                                                            case 0:
                                                                                ;
                                                                        }
                                                                    }
                                                                }
                                                                {
                                                                    vec2 GLF_live31coord = _GLF_FUZZED((vec2(-3.2, 79.00)));
                                                                    if (GLF_live31coord.x > 1.0)
                                                                        GLF_live31coord.x -= 1.0;
                                                                }
                                                                GLF_live26looplimiter2++;
                                                                {
                                                                    int GLF_live26result = GLF_live26search(GLF_live26i);
                                                                    switch (GLF_live26i) {
                                                                        case 9:
                                                                        case 5:
                                                                        case 12:
                                                                            {
                                                                                vec2 GLF_live31coord = _GLF_FUZZED(vec3(7575.9747, -6.8, 6.4).bb);
                                                                                int GLF_live31i = _GLF_FUZZED(74727);
                                                                                int GLF_live31looplimiter0 = 0;
                                                                                {
                                                                                    if (GLF_live31looplimiter0 >= 5) {
                                                                                        ;
                                                                                    }
                                                                                    GLF_live31looplimiter0++;
                                                                                    {
                                                                                        if (GLF_live31coord.x > 1.0)
                                                                                            GLF_live31coord.x -= 1.0;
                                                                                        if (GLF_live31coord.y > 1.0)
                                                                                            GLF_live31coord.y -= 1.0;
                                                                                        GLF_live31coord *= 2.0;
                                                                                        GLF_live31i++;
                                                                                    }
                                                                                }
                                                                            }
                                                                        case 15:
                                                                        case 7:
                                                                        case 8:
                                                                        case 2:
                                                                        case 6:
                                                                        case 17:
                                                                        case 13:
                                                                            {
                                                                                {
                                                                                    ;
                                                                                }
                                                                            }
                                                                            if (GLF_live26result == GLF_live26i) {
                                                                                GLF_live26count++;
                                                                            }
                                                                            break;
                                                                        default:
                                                                            {
                                                                                int GLF_live38baseIndex = _GLF_FUZZED(int(117052u));
                                                                                int GLF_live38data = _GLF_FUZZED((~(-65771)));
                                                                                int GLF_live38looplimiter0 = 0;
                                                                                int GLF_live38treeIndex = _GLF_FUZZED(-74322);
                                                                                {
                                                                                    if (GLF_live38looplimiter0 >= 3) {
                                                                                        ;
                                                                                    }
                                                                                    GLF_live38looplimiter0++;
                                                                                    {
                                                                                        if (GLF_live38data <= GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].data) {
                                                                                            if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex == -1) {
                                                                                                GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex = GLF_live38treeIndex;
                                                                                                GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                                                                                ;
                                                                                            } else {
                                                                                                GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex;
                                                                                                ;
                                                                                            }
                                                                                        } else {
                                                                                            if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex == -1) {
                                                                                                GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex = GLF_live38treeIndex;
                                                                                                GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                                                                                ;
                                                                                            } else {
                                                                                                GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex;
                                                                                                ;
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                            if (GLF_live26result == -1) {
                                                                                GLF_live26count++;
                                                                            }
                                                                            break;
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
                                                }
                                                if (int(GLF_live10gl_FragCoord[1]) < 210) {
                                                    {
                                                        {
                                                            int GLF_live38result = _GLF_FUZZED((+(-93807)));
                                                            int GLF_live38sum = _GLF_FUZZED(-9968);
                                                            if (GLF_live38result > 0) {
                                                                GLF_live38sum += GLF_live38result;
                                                            } else {
                                                                switch (GLF_live38result) {
                                                                    case -1:
                                                                        GLF_live38sum += 1;
                                                                        break;
                                                                    case 0:
                                                                        ;
                                                                }
                                                            }
                                                        }
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    GLF_live10grey = 0.5 + float(GLF_live10data[6]) / 10.0;
                                                    {
                                                        int GLF_live30d = _GLF_FUZZED(91748);
                                                        ivec2 GLF_live30p = _GLF_FUZZED(ivec2(-82802, -70444));
                                                        {
                                                            GLF_live30d--;
                                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 1) * 16, 256)] = 1;
                                                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 2) * 16, 256)] = 1;
                                                            GLF_live30p.y += 2;
                                                        }
                                                    }
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                } else {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        int donor_replacementGLF_dead11i = _GLF_FUZZED(ivec3(-4579, 96998, -76928)[0]);
                                                        if (donor_replacementGLF_dead11i < int(GLF_dead11gl_FragCoord.x)) {
                                                            break;
                                                        }
                                                    }
                                                    {
                                                        int GLF_live12baseIndex = _GLF_FUZZED(-1811);
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            {
                                                                int GLF_live31looplimiter0 = 0;
                                                                if (GLF_live31looplimiter0 >= 5) {
                                                                    ;
                                                                }
                                                            }
                                                            {
                                                                vec2 GLF_live36coord = _GLF_FUZZED((mat2(8294.5354, -6337.7763, 3255.3609, -2.9) * vec2(4.0, 64.55)));
                                                                int GLF_live36i = _GLF_FUZZED(-65374);
                                                                int GLF_live36looplimiter0 = 0;
                                                                vec4 GLF_live36texel = _GLF_FUZZED((mat3x4(4262.3663, -2.0, -3.0, 18.89, 573.270, -74.84, 23.39, -0.0, -1.0, 1251.7993, 0.8, 132.649) * (true ? vec3(0.2, -10.20, -43.07) : vec3(-3.2, 56.24, -6.9))));
                                                                while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                                                    if (GLF_live36looplimiter0 >= 7) {
                                                                        break;
                                                                    }
                                                                    GLF_live36looplimiter0++;
                                                                    {
                                                                        GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                                        GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                                        GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                                        GLF_live36i++;
                                                                    }
                                                                }
                                                            }
                                                            {
                                                                donor_replacementGLF_dead1temp += 0.4;
                                                            }
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                        }
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        {
                                                            GLF_live12baseIndex = GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].leftIndex;
                                                            ;
                                                        }
                                                    }
                                                    {
                                                        vec2 GLF_live31coord = _GLF_FUZZED(((-724.729) - vec2(8.7, 24.65)));
                                                        if (GLF_live31coord.y > 1.0)
                                                            GLF_live31coord.y -= 1.0;
                                                    }
                                                    if (int(GLF_live10gl_FragCoord[1]) < 240) {
                                                        GLF_live10grey = 0.5 + float(GLF_live10data[7]) / 10.0;
                                                    } else {
                                                        if (int(GLF_live10gl_FragCoord[1]) < 270) {
                                                            GLF_live10grey = 0.5 + float(GLF_live10data[8]) / 10.0;
                                                        } else {
                                                            ;
                                                            if (_GLF_DEAD(false)) {
                                                                int donor_replacementGLF_dead35i = _GLF_FUZZED(findMSB(154679u));
                                                                {
                                                                    GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i, 10)] = GLF_dead35temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i, 10)];
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            float donor_replacementGLF_dead23result = _GLF_FUZZED(-3400.1181);
                                                            {
                                                                donor_replacementGLF_dead23result += 100.0;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                while (GLF_live24msb8 < 1 && donor_replacementGLF_dead3coord.x > 1.0 || donor_replacementGLF_dead3coord.y > 1.0) {
                                                    if (donor_replacementGLF_dead3coord.x > 1.0) {
                                                        {
                                                            int GLF_live37i = _GLF_FUZZED((92818));
                                                            vec2 GLF_live37pos = _GLF_FUZZED(vec2(-8.4));
                                                            vec4 GLF_live37res = _GLF_FUZZED(vec4(vec2(-85.12, -8.4), 327.615, -6.0));
                                                            {
                                                                if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
                                                                    GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                                                }
                                                            }
                                                        }
                                                        donor_replacementGLF_dead3coord.x -= 1.0;
                                                    }
                                                    if (donor_replacementGLF_dead3coord.y > 1.0)
                                                        donor_replacementGLF_dead3coord.y -= 1.0;
                                                    donor_replacementGLF_dead3coord *= 2.0;
                                                    GLF_live24msb8++;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        {
                            int GLF_live9looplimiter2 = 0;
                            if (GLF_live9looplimiter2 >= 6) {
                                ;
                            }
                        }
                        vec4 donor_replacementGLF_dead3res = _GLF_FUZZED(vec4(-89.60, -18.08, 880.409, 11.19));
                        for (int GLF_dead3i = 0; GLF_dead3i < 3; GLF_dead3i++) {
                            for (int GLF_dead3j = 0; GLF_dead3j < 3; GLF_dead3j++) {
                                donor_replacementGLF_dead3res += texture(GLF_dead3tex, donor_replacementGLF_dead3coord + vec2(float(GLF_dead3i - 1) * donor_replacementGLF_dead1x1, float(GLF_dead3j - 1) * donor_replacementGLF_dead1x1)) * GLF_dead3weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3i * 3 + GLF_dead3j, 9)];
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead17xCoord = _GLF_FUZZED(donor_replacementGLF_dead1x1);
                                    float donor_replacementGLF_dead17yCoord = _GLF_FUZZED(mix(donor_replacementGLF_dead1A, sign(donor_replacementGLF_dead1temp), true));
                                    {
                                        ;
                                    }
                                }
                            }
                        }
                        {
                            float GLF_live9v = _GLF_FUZZED((1.3));
                            {
                                int GLF_live12looplimiter0 = 0;
                                if (GLF_live12looplimiter0 >= 6) {
                                    {
                                        int GLF_live30i = _GLF_FUZZED(ivec3(-18790, 39338, -25286).r);
                                        int GLF_live30looplimiter0 = 0;
                                        {
                                            if (GLF_live30looplimiter0 >= 7) {
                                                ;
                                            }
                                            GLF_live30looplimiter0++;
                                            {
                                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30i, 256)] = 0;
                                            }
                                        }
                                    }
                                    ;
                                }
                            }
                            if (GLF_live9v < 1.5) {
                                ;
                            }
                        }
                    }
                    float GLF_dead1k1 = GLF_dead1fx(donor_replacementGLF_dead1x1) - GLF_dead1fx(donor_replacementGLF_dead1x2);
                    {
                        {
                            {
                                ;
                            }
                        }
                        vec2 GLF_live31coord = _GLF_FUZZED(vec2(-9633.9974, -583.236));
                        int GLF_live31i = _GLF_FUZZED((false ? (88470 + 91079) : (-22707)));
                        {
                            {
                                int GLF_live37i = _GLF_FUZZED((+ivec2(-61160, -87179)).s);
                                int GLF_live37looplimiter0 = 0;
                                vec2 GLF_live37pos = _GLF_FUZZED(vec3(27.02, 1.2, -56.34).gb);
                                vec4 GLF_live37res = _GLF_FUZZED((float(-60208) - vec4(9.8, -11.96, -211.659, -5.8)));
                                for (GLF_live37i = 0; GLF_live37i < 8; GLF_live37i++) {
                                    if (GLF_live37looplimiter0 >= 3) {
                                        break;
                                    }
                                    GLF_live37looplimiter0++;
                                    {
                                        if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
                                            GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                        }
                                    }
                                }
                            }
                            int GLF_live31looplimiter0 = 0;
                            while (GLF_live31i < 1 && GLF_live31coord.x > 1.0 || GLF_live31coord.y > 1.0) {
                                if (GLF_live31looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live31looplimiter0++;
                                {
                                    if (GLF_live31coord.x > 1.0)
                                        GLF_live31coord.x -= 1.0;
                                    if (GLF_live31coord.y > 1.0)
                                        GLF_live31coord.y -= 1.0;
                                    GLF_live31coord *= 2.0;
                                    GLF_live31i++;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead16iteration = _GLF_FUZZED(floatBitsToInt(GLF_dead1k0));
                        {
                            ;
                        }
                    }
                    donor_replacementGLF_dead1temp = donor_replacementGLF_dead1x2;
                    {
                        int GLF_live30directions = _GLF_FUZZED(4397);
                        {
                            GLF_live30directions += 1;
                        }
                    }
                    donor_replacementGLF_dead1A = (((GLF_dead1h1) * (GLF_dead1k0)) - ((GLF_dead1h0) * (GLF_dead1k1))) / ((pow((GLF_dead1h0), 2.0) * (GLF_dead1h1)) - (pow((GLF_dead1h1), 2.0) * (GLF_dead1h0)));
                    donor_replacementGLF_dead1B = _GLF_outlined_2(GLF_dead1k0, donor_replacementGLF_dead1A, GLF_dead1h0);
                    donor_replacementGLF_dead1C = GLF_dead1fx(donor_replacementGLF_dead1x2);
                    donor_replacementGLF_dead1x2 = _GLF_outlined_0(donor_replacementGLF_dead1x2, donor_replacementGLF_dead1C, donor_replacementGLF_dead1B, donor_replacementGLF_dead1A);
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                float GLF_live25result = _GLF_FUZZED((-5729.8546));
                                {
                                    GLF_live25result += 0.4;
                                }
                            }
                            {
                                ;
                            }
                        }
                        {
                            break;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead12a = _GLF_FUZZED(mod(resolution, resolution));
                        float donor_replacementGLF_dead12z = _GLF_FUZZED(donor_replacementGLF_dead1x0);
                        {
                            donor_replacementGLF_dead12z = donor_replacementGLF_dead12a.y / donor_replacementGLF_dead12a.x;
                        }
                    }
                    donor_replacementGLF_dead1x0 = donor_replacementGLF_dead1x1;
                    donor_replacementGLF_dead1x1 = _GLF_outlined_1(donor_replacementGLF_dead1temp);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                    {
                        {
                            int GLF_live29looplimiter5 = 0;
                            if (GLF_live29looplimiter5 >= 4) {
                                ;
                            }
                        }
                        vec2 GLF_live27coord = _GLF_FUZZED((vec2(495.263, -57.98)));
                        int GLF_live27i = _GLF_FUZZED(-99229);
                        vec4 GLF_live27texel = _GLF_FUZZED(vec4(-361.054, -0.4, -8154.2247, -7976.6013));
                        {
                            int GLF_live27looplimiter0 = 0;
                            while (GLF_live27texel.x + GLF_live27texel.y + GLF_live27texel.z > 1.0 && GLF_live27i < 16) {
                                if (GLF_live27looplimiter0 >= 3) {
                                    {
                                        vec2 GLF_live36coord = _GLF_FUZZED((vec3(-9059.8900, -59.13, -9235.4233) * mat2x3(2.8, 124.811, -2.3, -1.9, -58.69, -98.33)));
                                        int GLF_live36i = _GLF_FUZZED(-62724);
                                        vec4 GLF_live36texel = _GLF_FUZZED(vec4(-7.5, 0.8, -9.6, 982.325));
                                        {
                                            int GLF_live36looplimiter0 = 0;
                                            while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                                if (GLF_live36looplimiter0 >= 7) {
                                                    break;
                                                }
                                                GLF_live36looplimiter0++;
                                                {
                                                    GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                    GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                    GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                    GLF_live36i++;
                                                }
                                            }
                                        }
                                    }
                                    break;
                                }
                                GLF_live27looplimiter0++;
                                {
                                    GLF_live27coord = GLF_live27texel.xz + GLF_live27texel.yy;
                                    {
                                        int GLF_live37i = _GLF_FUZZED(((-32305) - 69133));
                                        int GLF_live37looplimiter0 = 0;
                                        vec2 GLF_live37pos = _GLF_FUZZED(vec2(-9.3, 5.8));
                                        vec4 GLF_live37res = _GLF_FUZZED(vec4(-5.5, 1089.6678, 0.3, 3.7));
                                        {
                                            if (GLF_live37looplimiter0 >= 3) {
                                                ;
                                            }
                                            GLF_live37looplimiter0++;
                                            {
                                                if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
                                                    GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                                }
                                            }
                                        }
                                    }
                                    GLF_live27coord = floor(GLF_live27coord * 256.0) / 256.0;
                                    GLF_live27texel = texture(GLF_live27tex, GLF_live27coord);
                                    GLF_live27i++;
                                }
                            }
                        }
                    }
                    bool donor_replacementGLF_dead4canwalk = _GLF_FUZZED(((ivec3(94688, 83603, -84879) * (-4114)).brgb != ivec4(93375, 16156, 33599, 69364)));
                    {
                        int GLF_live13looplimiter0 = 0;
                        if (GLF_live13looplimiter0 >= 7) {
                            ;
                        }
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead34a = _GLF_FUZZED(GLF_dead22injectionSwitch);
                            float donor_replacementGLF_dead34z = _GLF_FUZZED(donor_replacementGLF_dead1A);
                            if (donor_replacementGLF_dead34a.y > donor_replacementGLF_dead34a.x) {
                                donor_replacementGLF_dead34z = donor_replacementGLF_dead34a.x / donor_replacementGLF_dead34a.y;
                            } else {
                                donor_replacementGLF_dead34z = donor_replacementGLF_dead34a.y / donor_replacementGLF_dead34a.x;
                            }
                        }
                    }
                    {
                        vec2 GLF_live31coord = _GLF_FUZZED((mat2(-35.46, -9.1, 6.5, -6.9) * vec2(4.4, 35.37)));
                        int GLF_live31i = _GLF_FUZZED((false ? ivec2(6677, 60442).r : ((-39400) + 5704)));
                        {
                            int GLF_live31looplimiter0 = 0;
                            while (GLF_live31i < 1 && GLF_live31coord.x > 1.0 || GLF_live31coord.y > 1.0) {
                                if (GLF_live31looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live31looplimiter0++;
                                {
                                    if (GLF_live31coord.x > 1.0)
                                        GLF_live31coord.x -= 1.0;
                                    if (GLF_live31coord.y > 1.0)
                                        GLF_live31coord.y -= 1.0;
                                    GLF_live31coord *= 2.0;
                                    GLF_live31i++;
                                }
                            }
                        }
                    }
                    int donor_replacementGLF_dead4i = _GLF_FUZZED(-41008);
                    {
                        vec3 GLF_live25c = _GLF_FUZZED((vec3(-444.344, 298.620, -82.46) - (+97.56)));
                        int GLF_live25i = _GLF_FUZZED((ivec4(17556, -3788, -84182, 35248) - (-96110)).a);
                        {
                            GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 3)] = GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 3)] * GLF_live25c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live25i, 3)];
                        }
                    }
                    int donor_replacementGLF_dead4j = _GLF_FUZZED(-30309);
                    {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead34th = _GLF_FUZZED((donor_replacementGLF_dead1x2 * donor_replacementGLF_dead1x0));
                            {
                                {
                                    vec2 GLF_live36coord = _GLF_FUZZED((vec2(-4.8, -330.567) * vec2(-2011.8741, -5.3)));
                                    int GLF_live36i = _GLF_FUZZED(int(false));
                                    int GLF_live36looplimiter0 = 0;
                                    vec4 GLF_live36texel = _GLF_FUZZED((vec4(-6.1, -8219.4777, 2.5, -84.19) * mat4(-99.45, 94.09, 382.723, -1057.1362, -5337.6856, -1.3, -9148.8748, -83.97, -9.1, -7.3, 0.3, 5.3, 2440.5054, 3241.1927, 16.88, 658.554)));
                                    {
                                        if (GLF_live36looplimiter0 >= 7) {
                                            ;
                                        }
                                        GLF_live36looplimiter0++;
                                        {
                                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                            GLF_live36i++;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead34th = 0.5 - donor_replacementGLF_dead34th;
                            }
                        }
                        if (GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j * 2 + donor_replacementGLF_dead4i * 2 * 16, 256)] == 0) {
                            pos.x = donor_replacementGLF_dead4j * 2;
                            pos.y = donor_replacementGLF_dead4i * 2;
                            if (_GLF_DEAD(false)) {
                                {
                                    donor_replacementGLF_dead1B = 1.0 - donor_replacementGLF_dead1B;
                                }
                            }
                            donor_replacementGLF_dead4canwalk = true;
                            {
                                float GLF_live25limit = _GLF_FUZZED(-8.9);
                                int GLF_live25looplimiter0 = 0;
                                float GLF_live25result = _GLF_FUZZED((true ? 291.082 : 886.544));
                                float GLF_live25thirty_two = _GLF_FUZZED((-(-8.1)));
                                for (int GLF_live25i = 1; GLF_live25i < 800; GLF_live25i++) {
                                    if (GLF_live25looplimiter0 >= 4) {
                                        break;
                                    }
                                    GLF_live25looplimiter0++;
                                    {
                                        if ((GLF_live25i % 32) == 0) {
                                            GLF_live25result += 0.4;
                                        } else {
                                            if (mod(float(GLF_live25i), round(GLF_live25thirty_two)) <= 0.01) {
                                                GLF_live25result += 100.0;
                                            }
                                        }
                                        if (float(GLF_live25i) >= GLF_live25limit) {
                                            ;
                                            {
                                                int GLF_live31looplimiter0 = 0;
                                                if (GLF_live31looplimiter0 >= 5) {
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            {
                                int GLF_live12baseIndex = _GLF_FUZZED(((-91229) * (78891 * 48040)));
                                {
                                    bool GLF_live30canwalk = _GLF_FUZZED(false);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec2 donor_replacementGLF_dead34v = _GLF_FUZZED(GLF_dead22injectionSwitch);
                                        if (donor_replacementGLF_dead34v.x < 0.0) {
                                            donor_replacementGLF_dead1x1 = 1.0 - donor_replacementGLF_dead1x1;
                                        }
                                    }
                                    int GLF_live30i = _GLF_FUZZED(92308);
                                    ivec2 GLF_live30ipos = _GLF_FUZZED(((ivec2(26783, -79071) + ivec2(-80487, 7323)) & ivec2(80717, 87513)));
                                    {
                                        vec2 GLF_live36coord = _GLF_FUZZED(vec2(2.1, -6737.7993));
                                        int GLF_live36i = _GLF_FUZZED(int(false));
                                        vec4 GLF_live36texel = _GLF_FUZZED(vec4(578.478, vec3(-1.8, -6.9, 796.331)));
                                        {
                                            int GLF_live36looplimiter0 = 0;
                                            while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                                if (GLF_live36looplimiter0 >= 7) {
                                                    break;
                                                }
                                                GLF_live36looplimiter0++;
                                                {
                                                    GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                    GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                    GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                    GLF_live36i++;
                                                }
                                            }
                                        }
                                    }
                                    int GLF_live30looplimiter3 = 0;
                                    ivec2 GLF_live30p = _GLF_FUZZED(ivec2(-4331, -98239));
                                    int GLF_live30v = _GLF_FUZZED(83429);
                                    do {
                                        if (GLF_live30looplimiter3 >= 7) {
                                            break;
                                        }
                                        GLF_live30looplimiter3++;
                                        {
                                            GLF_live30v++;
                                            int GLF_live30directions = 0;
                                            if (GLF_live30p.x > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                                GLF_live30directions += 1;
                                            }
                                            if (GLF_live30p.y > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] == 0) {
                                                GLF_live30directions += 1;
                                            }
                                            if (GLF_live30p.x < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                                GLF_live30directions += 1;
                                            }
                                            if (GLF_live30p.y < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 2) * 16, 256)] == 0) {
                                                GLF_live30directions += 1;
                                            }
                                            if (GLF_live30directions == 0) {
                                                GLF_live30canwalk = false;
                                                int GLF_live30j = _GLF_FUZZED(-39873);
                                                {
                                                    int GLF_live30looplimiter2 = 0;
                                                    for (GLF_live30i = 0; GLF_live30i < 8; GLF_live30i++) {
                                                        if (GLF_live30looplimiter2 >= 7) {
                                                            break;
                                                        }
                                                        GLF_live30looplimiter2++;
                                                        {
                                                            {
                                                                int GLF_live30looplimiter1 = 0;
                                                                for (GLF_live30j = 0; GLF_live30j < 8; GLF_live30j++) {
                                                                    if (GLF_live30looplimiter1 >= 7) {
                                                                        break;
                                                                    }
                                                                    GLF_live30looplimiter1++;
                                                                    {
                                                                        if (GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30j * 2 + GLF_live30i * 2 * 16, 256)] == 0) {
                                                                            GLF_live30p.x = GLF_live30j * 2;
                                                                            if (_GLF_DEAD(false)) {
                                                                                vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(GLF_live15injectionSwitch);
                                                                                int donor_replacementGLF_dead32i = _GLF_FUZZED(GLF_live30j);
                                                                                {
                                                                                    if (donor_replacementGLF_dead32coord.x > 1.0) {
                                                                                        {
                                                                                            vec2 GLF_live37pos = _GLF_FUZZED((vec2(-0.2, 5.2) - (-vec2(7717.2476, 2986.4605))));
                                                                                            vec4 GLF_live37quad = _GLF_FUZZED(vec4(-330.070, -131.872, -707.256, 341.047));
                                                                                            if (GLF_live37pos.y > GLF_live37quad.y + GLF_live37quad.w) {
                                                                                                ;
                                                                                            }
                                                                                        }
                                                                                        donor_replacementGLF_dead32coord.x -= 1.0;
                                                                                    }
                                                                                    if (donor_replacementGLF_dead32coord.y > 1.0)
                                                                                        donor_replacementGLF_dead32coord.y -= 1.0;
                                                                                    donor_replacementGLF_dead32coord *= 2.0;
                                                                                    donor_replacementGLF_dead32i++;
                                                                                }
                                                                            }
                                                                            GLF_live30p.y = GLF_live30i * 2;
                                                                            GLF_live30canwalk = true;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                int donor_replacementGLF_dead33i = _GLF_FUZZED(findLSB((53939u * 79621u)));
                                                                float donor_replacementGLF_dead33limit = _GLF_FUZZED(donor_replacementGLF_dead1x0);
                                                                float donor_replacementGLF_dead33s = _GLF_FUZZED(donor_replacementGLF_dead1temp);
                                                                {
                                                                    if (mod(float(donor_replacementGLF_dead33i), donor_replacementGLF_dead1x1) <= 0.01) {
                                                                        donor_replacementGLF_dead33s += 0.2;
                                                                    }
                                                                    if (float(donor_replacementGLF_dead33i) >= donor_replacementGLF_dead33limit) {
                                                                        ;
                                                                    }
                                                                    donor_replacementGLF_dead33i++;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                            } else {
                                                int GLF_live30d = GLF_live30v % GLF_live30directions;
                                                GLF_live30v += GLF_live30directions;
                                                if (GLF_live30d >= 0 && GLF_live30p.x > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                                    GLF_live30d--;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 1) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 2) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (_GLF_IDENTITY(false, false || (false)))))) {
                                                        {
                                                            int GLF_live37i = _GLF_FUZZED(ivec3((~ivec4(44639, -42312, -3943, -99340))).s);
                                                            int GLF_live37looplimiter0 = 0;
                                                            vec2 GLF_live37pos = _GLF_FUZZED(vec2(-1.1, -82.64).gg);
                                                            vec4 GLF_live37res = _GLF_FUZZED((-vec4(241.896, 91.23, 99.77, 51.34)));
                                                            for (GLF_live37i = 0; GLF_live37i < 8; GLF_live37i++) {
                                                                if (GLF_live37looplimiter0 >= 3) {
                                                                    break;
                                                                }
                                                                GLF_live37looplimiter0++;
                                                                {
                                                                    if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
                                                                        GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        vec2 donor_replacementGLF_dead35color = _GLF_FUZZED(vec2(-7050.2367, 4367.1163));
                                                        vec3 donor_replacementGLF_dead35vecCoor = _GLF_FUZZED(GLF_dead1polynomial);
                                                        do {
                                                            if (int(GLF_dead35gl_FragCoord[1]) < 30) {
                                                                donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[0]))));
                                                                donor_replacementGLF_dead35color[0] = dFdy(GLF_dead35gl_FragCoord.y);
                                                                break;
                                                            } else if (int(GLF_dead35gl_FragCoord[1]) < 60) {
                                                                donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[1]))));
                                                                donor_replacementGLF_dead35color[1] *= atan(faceforward(GLF_dead35injectionSwitch, donor_replacementGLF_dead35color.xx, donor_replacementGLF_dead35vecCoor.yx).y);
                                                                break;
                                                            } else if (int(GLF_dead35gl_FragCoord[1]) < 90) {
                                                                donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[2]))));
                                                                donor_replacementGLF_dead35color.x += atanh(donor_replacementGLF_dead35color.x) * cosh(GLF_dead35injectionSwitch.y) * smoothstep(donor_replacementGLF_dead35color, GLF_dead35injectionSwitch, GLF_dead35gl_FragCoord.yy).x;
                                                                break;
                                                            } else if (int(GLF_dead35gl_FragCoord[1]) < 120) {
                                                                donor_replacementGLF_dead35color = fract(acosh(clamp(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[3])), 1.0, 1000.0)));
                                                                donor_replacementGLF_dead35color.x += (isnan(GLF_dead35gl_FragCoord.x) ? log2(GLF_dead35gl_FragCoord.x) : log2(GLF_dead35gl_FragCoord.y));
                                                                break;
                                                            } else if (int(GLF_dead35gl_FragCoord[1]) < 150) {
                                                                discard;
                                                            } else if (int(GLF_dead35gl_FragCoord[1]) < 180) {
                                                                donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[4]))));
                                                                donor_replacementGLF_dead35color[1] += asinh(GLF_dead35gl_FragCoord.y * ldexp(donor_replacementGLF_dead35color.y, -GLF_live30directions));
                                                                break;
                                                            } else if (int(GLF_dead35gl_FragCoord[1]) < 210) {
                                                                donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[5]))));
                                                                donor_replacementGLF_dead35color.y -= tanh(donor_replacementGLF_dead35color.x) / cosh(donor_replacementGLF_dead35color.y);
                                                                break;
                                                            } else if (int(GLF_dead35gl_FragCoord[1]) < 240) {
                                                                donor_replacementGLF_dead35color = fract(asinh(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[6]))));
                                                                donor_replacementGLF_dead35color.y -= isnan(float(GLF_live30directions)) ? tanh(GLF_dead35gl_FragCoord.x) : atanh(GLF_dead35gl_FragCoord.y);
                                                                {
                                                                    vec2 GLF_live36coord = _GLF_FUZZED(vec2(-927.358, -18.25));
                                                                    int GLF_live36i = _GLF_FUZZED(87950);
                                                                    int GLF_live36looplimiter0 = 0;
                                                                    vec4 GLF_live36texel = _GLF_FUZZED(((vec4(7.5, 4.2, 90.90, 200.939) * mat2x4(-1210.0410, -8.0, 9.5, 7830.0096, 133.566, 45.20, 0.7, 666.997)) * mat4x2(7.2, -15.08, 24.15, -305.371, 8.5, -3402.3763, 85.68, 3.6)));
                                                                    {
                                                                        if (GLF_live36looplimiter0 >= 7) {
                                                                            ;
                                                                        }
                                                                        GLF_live36looplimiter0++;
                                                                        {
                                                                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                                            GLF_live36i++;
                                                                        }
                                                                    }
                                                                }
                                                                break;
                                                            } else if (int(GLF_dead35gl_FragCoord[1]) < 270) {
                                                                donor_replacementGLF_dead35color = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[7]))));
                                                                donor_replacementGLF_dead35color.y *= mix(normalize(donor_replacementGLF_dead35vecCoor), normalize(vec3(donor_replacementGLF_dead35color, degrees(donor_replacementGLF_dead35color.x))), GLF_dead35injectionSwitch.x).y;
                                                                break;
                                                            } else {
                                                                discard;
                                                            }
                                                        } while (0 == int(GLF_dead35injectionSwitch.x));
                                                    }
                                                    GLF_live30p.x -= 2;
                                                }
                                                if (GLF_live30d >= 0 && GLF_live30p.y > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] == 0) {
                                                    GLF_live30d--;
                                                    {
                                                        int GLF_live38baseIndex = _GLF_FUZZED(-29976);
                                                        int GLF_live38data = _GLF_FUZZED((79363));
                                                        int GLF_live38treeIndex = _GLF_FUZZED(-18737);
                                                        {
                                                            GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex = GLF_live38treeIndex;
                                                            GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                                            ;
                                                        }
                                                    }
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 1) * 16, 256)] = 1;
                                                    {
                                                        vec2 GLF_live36coord = _GLF_FUZZED((true ? vec2(-20.49, -3.9) : vec2(-9.1)));
                                                        int GLF_live36i = _GLF_FUZZED(83737);
                                                        int GLF_live36looplimiter0 = 0;
                                                        vec4 GLF_live36texel = _GLF_FUZZED(vec4(76.18, -57.97, 5.2, 936.364));
                                                        while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                                            if (GLF_live36looplimiter0 >= 7) {
                                                                break;
                                                            }
                                                            GLF_live36looplimiter0++;
                                                            {
                                                                GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                                GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                                GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                                GLF_live36i++;
                                                            }
                                                        }
                                                    }
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] = 1;
                                                    GLF_live30p.y -= 2;
                                                }
                                                if (GLF_live30d >= 0 && GLF_live30p.x < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] == 0) {
                                                    GLF_live30d--;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 1) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30p.x += 2;
                                                }
                                                if (GLF_live30d >= 0 && GLF_live30p.y < 14 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 2) * 16, 256)] == 0) {
                                                    GLF_live30d--;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 1) * 16, 256)] = 1;
                                                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y + 2) * 16, 256)] = 1;
                                                    GLF_live30p.y += 2;
                                                }
                                            }
                                            if (GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30ipos.y * 16 + GLF_live30ipos.x, 256)] == 1) {
                                                GLF_live30_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                                ;
                                            }
                                        }
                                    } while (GLF_live30canwalk);
                                }
                                int GLF_live12data = _GLF_FUZZED((23224 * 35047));
                                int GLF_live12treeIndex = _GLF_FUZZED(int(true));
                                if (GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].leftIndex == -1) {
                                    GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].leftIndex = GLF_live12treeIndex;
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead21a = _GLF_FUZZED(resolution);
                                        if (donor_replacementGLF_dead21a.y > donor_replacementGLF_dead21a.x) {
                                            donor_replacementGLF_dead1B = donor_replacementGLF_dead21a.x / donor_replacementGLF_dead21a.y;
                                            {
                                                int GLF_live24looplimiter1 = 0;
                                                if (GLF_live24looplimiter1 >= 5) {
                                                    ;
                                                }
                                            }
                                        } else {
                                            donor_replacementGLF_dead1B = donor_replacementGLF_dead21a.y / donor_replacementGLF_dead21a.x;
                                        }
                                    }
                                    {
                                        float GLF_live25limit = _GLF_FUZZED(((-85.47) * (-1.8)));
                                        float GLF_live25result = _GLF_FUZZED(vec4(33.58, -720.304, -583.137, -7.8).b);
                                        float GLF_live25thirty_two = _GLF_FUZZED(-3.7);
                                        {
                                            int GLF_live25looplimiter0 = 0;
                                            for (int GLF_live25i = 1; GLF_live25i < 800; GLF_live25i++) {
                                                {
                                                    bool GLF_live30canwalk = _GLF_FUZZED(true);
                                                    int GLF_live30i = _GLF_FUZZED(86328);
                                                    int GLF_live30j = _GLF_FUZZED(((-9166) * ((-32098) - (-3984))));
                                                    int GLF_live30looplimiter2 = 0;
                                                    ivec2 GLF_live30p = _GLF_FUZZED(ivec2(74071, 35878));
                                                    for (GLF_live30i = 0; GLF_live30i < 8; GLF_live30i++) {
                                                        if (GLF_live30looplimiter2 >= 7) {
                                                            break;
                                                        }
                                                        GLF_live30looplimiter2++;
                                                        {
                                                            {
                                                                int GLF_live30looplimiter1 = 0;
                                                                for (GLF_live30j = 0; GLF_live30j < 8; GLF_live30j++) {
                                                                    if (GLF_live30looplimiter1 >= 7) {
                                                                        break;
                                                                    }
                                                                    GLF_live30looplimiter1++;
                                                                    {
                                                                        vec2 GLF_live36coord = _GLF_FUZZED(vec2(6041.2525, 5.8));
                                                                        int GLF_live36i = _GLF_FUZZED(((-36718) ^ (+(-45282))));
                                                                        vec4 GLF_live36texel = _GLF_FUZZED((mat2x4(mat4x2(mat3x2(-37.78, 6.6, -8.5, -6992.1801, 131.821, -1.4))) * vec2(-920.664, -1.2)));
                                                                        {
                                                                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                                            GLF_live36i++;
                                                                        }
                                                                    }
                                                                    {
                                                                        if (GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30j * 2 + GLF_live30i * 2 * 16, 256)] == 0) {
                                                                            GLF_live30p.x = GLF_live30j * 2;
                                                                            GLF_live30p.y = GLF_live30i * 2;
                                                                            GLF_live30canwalk = true;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (GLF_live25looplimiter0 >= 4) {
                                                    break;
                                                }
                                                GLF_live25looplimiter0++;
                                                {
                                                    if ((GLF_live25i % 32) == 0) {
                                                        GLF_live25result += 0.4;
                                                        {
                                                            vec2 GLF_live31coord = _GLF_FUZZED((vec2(-2.2, -30.25) + vec2(24.48, 1.3)));
                                                            int GLF_live31i = _GLF_FUZZED(int(false));
                                                            if (_GLF_DEAD(false)) {
                                                                float donor_replacementGLF_dead33s = _GLF_FUZZED(floor(383.354));
                                                                {
                                                                    donor_replacementGLF_dead33s += 0.2;
                                                                    {
                                                                        int GLF_live38baseIndex = _GLF_FUZZED((int(168715u) - 34017));
                                                                        int GLF_live38data = _GLF_FUZZED(int(134019u));
                                                                        int GLF_live38treeIndex = _GLF_FUZZED(60902);
                                                                        {
                                                                            GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex = GLF_live38treeIndex;
                                                                            GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                                                            ;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            {
                                                                if (GLF_live31coord.x > 1.0)
                                                                    GLF_live31coord.x -= 1.0;
                                                                if (GLF_live31coord.y > 1.0)
                                                                    GLF_live31coord.y -= 1.0;
                                                                GLF_live31coord *= 2.0;
                                                                GLF_live31i++;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            {
                                                                GLF_live25thirty_two = -GLF_live25thirty_two;
                                                            }
                                                        }
                                                    } else {
                                                        if (mod(float(GLF_live25i), round(GLF_live25thirty_two)) <= 0.01) {
                                                            GLF_live25result += 100.0;
                                                        }
                                                    }
                                                    if (float(GLF_live25i) >= GLF_live25limit) {
                                                        ;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(vec2(22.69, 113.946));
                                                            int donor_replacementGLF_dead32i = _GLF_FUZZED((GLF_live12baseIndex << GLF_live12data));
                                                            {
                                                                if (donor_replacementGLF_dead32coord.x > 1.0)
                                                                    donor_replacementGLF_dead32coord.x -= 1.0;
                                                                if (donor_replacementGLF_dead32coord.y > 1.0)
                                                                    donor_replacementGLF_dead32coord.y -= 1.0;
                                                                donor_replacementGLF_dead32coord *= 2.0;
                                                                donor_replacementGLF_dead32i++;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    {
                                        {
                                            vec2 GLF_live37pos = _GLF_FUZZED(vec3(7055.4512, 9293.0228, -8.9).rg);
                                            vec4 GLF_live37quad = _GLF_FUZZED(((-6.9) * vec4(-5.0, -97.76, 8.8, -316.192)));
                                            if (GLF_live37pos.x > GLF_live37quad.x + GLF_live37quad.z) {
                                                ;
                                            }
                                        }
                                        int GLF_live29cols = _GLF_FUZZED(40908);
                                        int GLF_live29looplimiter1 = 0;
                                        uint GLF_live29matrix_number = _GLF_FUZZED(14773u);
                                        int GLF_live29rows = _GLF_FUZZED((99416 ^ 18707));
                                        for (int GLF_live29c = 0; GLF_live29c < GLF_live29cols; GLF_live29c++) {
                                            if (GLF_live29looplimiter1 >= 4) {
                                                break;
                                            }
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(unpackSnorm2x16((GLF_live29matrix_number + GLF_live29matrix_number)));
                                                int donor_replacementGLF_dead32i = _GLF_FUZZED(donor_replacementGLF_dead4i);
                                                while (donor_replacementGLF_dead32i < 1 && donor_replacementGLF_dead32coord.x > 1.0 || donor_replacementGLF_dead32coord.y > 1.0) {
                                                    if (donor_replacementGLF_dead32coord.x > 1.0)
                                                        donor_replacementGLF_dead32coord.x -= 1.0;
                                                    if (donor_replacementGLF_dead32coord.y > 1.0)
                                                        donor_replacementGLF_dead32coord.y -= 1.0;
                                                    donor_replacementGLF_dead32coord *= 2.0;
                                                    donor_replacementGLF_dead32i++;
                                                }
                                            }
                                            GLF_live29looplimiter1++;
                                            {
                                                {
                                                    int GLF_live29looplimiter0 = 0;
                                                    for (int GLF_live29r = 0; GLF_live29r < GLF_live29rows; GLF_live29r++) {
                                                        if (GLF_live29looplimiter0 >= 4) {
                                                            break;
                                                        }
                                                        GLF_live29looplimiter0++;
                                                        {
                                                            switch (GLF_live29matrix_number) {
                                                                case 0u:
                                                                    GLF_live29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                                                    break;
                                                                case 1u:
                                                                    GLF_live29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                                                    break;
                                                                case 2u:
                                                                    GLF_live29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_live29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_live29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                                                    break;
                                                                    {
                                                                        int GLF_live36looplimiter0 = 0;
                                                                        if (GLF_live36looplimiter0 >= 7) {
                                                                            ;
                                                                        }
                                                                    }
                                                                case 5u:
                                                                    GLF_live29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(tan(0.0)))))) {
                                                                        vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(sin(resolution));
                                                                        int donor_replacementGLF_dead32i = _GLF_FUZZED(-56046);
                                                                        while (donor_replacementGLF_dead32i < 1 && donor_replacementGLF_dead32coord.x > 1.0 || donor_replacementGLF_dead32coord.y > 1.0) {
                                                                            if (donor_replacementGLF_dead32coord.x > 1.0)
                                                                                donor_replacementGLF_dead32coord.x -= 1.0;
                                                                            if (donor_replacementGLF_dead32coord.y > 1.0)
                                                                                donor_replacementGLF_dead32coord.y -= 1.0;
                                                                            donor_replacementGLF_dead32coord *= 2.0;
                                                                            donor_replacementGLF_dead32i++;
                                                                        }
                                                                    }
                                                                    break;
                                                                case 6u:
                                                                    GLF_live29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                                                    break;
                                                                case 7u:
                                                                    GLF_live29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                                                    break;
                                                                case 8u:
                                                                    GLF_live29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                                                    break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    GLF_live12makeTreeNode(GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12treeIndex, 10)], GLF_live12data);
                                    ;
                                } else {
                                    GLF_live12baseIndex = GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].leftIndex;
                                    ;
                                }
                            }
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                {
                                    donor_replacementGLF_dead1temp += 100.0;
                                }
                            }
                            int GLF_live10j = _GLF_FUZZED(ivec2(-12917, -95211).r);
                            {
                                GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 10)];
                            }
                            {
                                {
                                    float GLF_live38v = _GLF_FUZZED(-263.281);
                                    if (GLF_live38v < 1.5) {
                                        ;
                                    }
                                }
                                int GLF_live25i = _GLF_FUZZED((false ? ((-91237) ^ (-37900)) : (-56282)));
                                float GLF_live25limit = _GLF_FUZZED(((-8041.3011) + (2.7 + 5.3)));
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(reflect(resolution, GLF_dead19resolution));
                                    vec4 donor_replacementGLF_dead32res = _GLF_FUZZED((GLF_dead11gl_FragCoord / donor_replacementGLF_dead1B));
                                    if (donor_replacementGLF_dead32coord.x < 1.0 && donor_replacementGLF_dead32coord.y < 1.0) {
                                        donor_replacementGLF_dead32res = texture(GLF_dead32tex, donor_replacementGLF_dead32coord);
                                    }
                                }
                                float GLF_live25result = _GLF_FUZZED(0.9);
                                if (float(GLF_live25i) >= GLF_live25limit) {
                                    ;
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                            }
                            {
                                vec2 GLF_live31coord = _GLF_FUZZED(vec2(vec4(-3.4, 3.7, 96.63, -9.5)));
                                int GLF_live31i = _GLF_FUZZED(int(80456u));
                                {
                                    int GLF_live31looplimiter0 = 0;
                                    while (GLF_live31i < 1 && GLF_live31coord.x > 1.0 || GLF_live31coord.y > 1.0) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                                            {
                                                GLF_live12_GLF_color = texture(GLF_dead32tex, GLF_live31coord);
                                            }
                                        }
                                        if (GLF_live31looplimiter0 >= 5) {
                                            break;
                                        }
                                        {
                                            int GLF_live39looplimiter1 = 0;
                                            if (GLF_live39looplimiter1 >= 3) {
                                                ;
                                            }
                                        }
                                        GLF_live31looplimiter0++;
                                        {
                                            if (GLF_live31coord.x > 1.0)
                                                GLF_live31coord.x -= 1.0;
                                            {
                                                vec2 GLF_live36coord = _GLF_FUZZED(vec2(9745.6311, -411.053));
                                                int GLF_live36i = _GLF_FUZZED(38198);
                                                int GLF_live36looplimiter0 = 0;
                                                vec4 GLF_live36texel = _GLF_FUZZED(vec4(249.479, -348.100, -7752.6280, -2.9));
                                                {
                                                    if (GLF_live36looplimiter0 >= 7) {
                                                        ;
                                                    }
                                                    GLF_live36looplimiter0++;
                                                    {
                                                        GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                        GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                        GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                        GLF_live36i++;
                                                    }
                                                }
                                            }
                                            if (GLF_live31coord.y > 1.0)
                                                GLF_live31coord.y -= 1.0;
                                            GLF_live31coord *= 2.0;
                                            GLF_live31i++;
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead21a = _GLF_FUZZED((-vec2(-7448.0290, 766.379)));
                                float donor_replacementGLF_dead21z = _GLF_FUZZED(donor_replacementGLF_dead1A);
                                if (donor_replacementGLF_dead21a.y > donor_replacementGLF_dead21a.x) {
                                    donor_replacementGLF_dead21z = donor_replacementGLF_dead21a.x / donor_replacementGLF_dead21a.y;
                                } else {
                                    donor_replacementGLF_dead21z = donor_replacementGLF_dead21a.y / donor_replacementGLF_dead21a.x;
                                    {
                                        {
                                            GLF_live26_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                                        }
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
                            vec2 GLF_live27coord = _GLF_FUZZED((vec2(-7.2, -2877.7465) * 22.63));
                            int GLF_live27i = _GLF_FUZZED(-26118);
                            vec4 GLF_live27texel = _GLF_FUZZED(vec4(10.74, 1.2, -4448.3474, 8353.1155));
                            {
                                GLF_live27coord = GLF_live27texel.xz + GLF_live27texel.yy;
                                GLF_live27coord = floor(GLF_live27coord * 256.0) / 256.0;
                                GLF_live27texel = texture(GLF_live27tex, GLF_live27coord);
                                GLF_live27i++;
                            }
                            {
                                vec2 GLF_live31coord = _GLF_FUZZED(vec2(-4.3, -290.264));
                                if (GLF_live31coord.y > 1.0)
                                    GLF_live31coord.y -= 1.0;
                            }
                        }
                    }
                    {
                        int GLF_live9sum = _GLF_FUZZED(ivec2(69677, 15809).g);
                        int GLF_live9target = _GLF_FUZZED(-54985);
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    int GLF_live25i = _GLF_FUZZED((~ivec4(6174, -64806, 56047, -27277).z));
                                    {
                                        int GLF_live37i = _GLF_FUZZED(-4972);
                                        vec4 GLF_live37res = _GLF_FUZZED((vec3(-708.404, 0.3, 6.3) * mat4x3(2.6, -6.7, -5.3, 3.2, -361.458, 4.1, 83.52, 1029.5353, 972.240, -926.763, 9.9, -1.3)));
                                        {
                                            GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                        }
                                    }
                                    float GLF_live25result = _GLF_FUZZED(229.861);
                                    float GLF_live25thirty_two = _GLF_FUZZED((+(+(+(-19.77)))));
                                    if (mod(float(GLF_live25i), round(GLF_live25thirty_two)) <= 0.01) {
                                        {
                                            int GLF_live38sum = _GLF_FUZZED(18199);
                                            {
                                                int GLF_live38looplimiter2 = 0;
                                                for (int GLF_live38target = 0; GLF_live38target < 20; GLF_live38target++) {
                                                    if (GLF_live38looplimiter2 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live38looplimiter2++;
                                                    {
                                                        int GLF_live38result = GLF_live38search(GLF_live38target);
                                                        if (GLF_live38result > 0) {
                                                            GLF_live38sum += GLF_live38result;
                                                        } else {
                                                            switch (GLF_live38result) {
                                                                case -1:
                                                                    GLF_live38sum += 1;
                                                                    break;
                                                                case 0:
                                                                    ;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_live25result += 100.0;
                                    }
                                }
                                {
                                    int GLF_live30directions = _GLF_FUZZED(36353);
                                    {
                                        GLF_live30directions += 1;
                                    }
                                }
                                vec3 donor_replacementGLF_dead22color = _GLF_FUZZED(mix(mod(vec3(-858.365, 4.6, -994.179), vec3(-0.6, 6.2, 748.525)), GLF_dead1polynomial, vec3(injectionSwitch, donor_replacementGLF_dead1A)));
                                vec2 donor_replacementGLF_dead22grid = _GLF_FUZZED(GLF_dead19resolution);
                                {
                                    int GLF_dead22count = int(GLF_dead22injectionSwitch.x);
                                    do {
                                        donor_replacementGLF_dead22color -= GLF_dead22palette(vec3(float(GLF_dead22obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead22injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead22injectionSwitch.x, 0.6, float(GLF_dead22obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead22injectionSwitch.x), 10)]) * 0.1));
                                        GLF_dead22count++;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(donor_replacementGLF_dead22grid);
                                            if (donor_replacementGLF_dead32coord.x > 1.0)
                                                donor_replacementGLF_dead32coord.x -= 1.0;
                                        }
                                    } while (GLF_dead22count != GLF_dead22obj.numbers[2]);
                                    donor_replacementGLF_dead22grid += vec2(GLF_dead22count + GLF_dead22obj.numbers[3], GLF_dead22count + GLF_dead22obj.numbers[3]);
                                }
                                {
                                    vec2 GLF_live31coord = _GLF_FUZZED(vec2(71.41, 6.7));
                                    vec4 GLF_live31res = _GLF_FUZZED(vec4(5121.7829, 769.860, 74.33, 745.152));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            ;
                                        }
                                    }
                                    {
                                        GLF_live31res = texture(GLF_live31tex, GLF_live31coord);
                                        {
                                            vec2 GLF_live36coord = _GLF_FUZZED((mat3x2(-7918.4901, 1.0, -5353.9112, -6.0, -820.980, -888.362) * vec3(-4861.9579, -47.16, -86.04)));
                                            int GLF_live36i = _GLF_FUZZED(-25087);
                                            vec4 GLF_live36texel = _GLF_FUZZED(vec4(-79.91, -1.6, -1.1, 4.7));
                                            {
                                                GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                GLF_live36i++;
                                            }
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
                                float GLF_live24s = _GLF_FUZZED(float(false));
                                {
                                    vec2 GLF_live31coord = _GLF_FUZZED((+vec2(0.3, -9.2)));
                                    int GLF_live31i = _GLF_FUZZED(-64993);
                                    {
                                        int GLF_live31looplimiter0 = 0;
                                        while (GLF_live31i < 1 && GLF_live31coord.x > 1.0 || GLF_live31coord.y > 1.0) {
                                            if (GLF_live31looplimiter0 >= 5) {
                                                {
                                                    vec2 GLF_live37pos = _GLF_FUZZED(vec2(9216.0621, -9184.0596));
                                                    vec4 GLF_live37quad = _GLF_FUZZED((vec4(367.854, 6576.9133, float(-83357), 4698.1667) * mat4(53.58, -8.0, -883.836, 22.52, -5.1, 2.3, -88.33, 1.0, 282.427, 44.32, -93.53, 3.3, 669.286, -1.1, -2500.5310, 633.000)));
                                                    if (GLF_live37pos.x > GLF_live37quad.x + GLF_live37quad.z) {
                                                        ;
                                                    }
                                                }
                                                break;
                                            }
                                            GLF_live31looplimiter0++;
                                            {
                                                if (GLF_live31coord.x > 1.0)
                                                    GLF_live31coord.x -= 1.0;
                                                if (GLF_live31coord.y > 1.0) {
                                                    {
                                                        int GLF_live39i = _GLF_FUZZED(-33894);
                                                        int GLF_live39j = _GLF_FUZZED((+(-94076)));
                                                        uint GLF_live39uselessOutVariable = _GLF_FUZZED((145960u * 184095u));
                                                        if (uint(GLF_live39j) < uaddCarry(uint(GLF_live39i), 1u, GLF_live39uselessOutVariable)) {
                                                            ;
                                                        }
                                                    }
                                                    GLF_live31coord.y -= 1.0;
                                                }
                                                GLF_live31coord *= 2.0;
                                                GLF_live31i++;
                                            }
                                        }
                                    }
                                }
                                {
                                    GLF_live24s += 0.2;
                                    if (_GLF_DEAD(false)) {
                                        {
                                            donor_replacementGLF_dead1temp = 1.0 - donor_replacementGLF_dead1temp;
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
                                int GLF_live26baseIndex = _GLF_FUZZED(-32380);
                                int GLF_live26data = _GLF_FUZZED(51635);
                                int GLF_live26treeIndex = _GLF_FUZZED(72202);
                                {
                                    if (GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].leftIndex == -1) {
                                        if (_GLF_DEAD(false)) {
                                            vec4 donor_replacementGLF_dead33c = _GLF_FUZZED(GLF_dead11gl_FragCoord);
                                            int donor_replacementGLF_dead33i = _GLF_FUZZED(findLSB(GLF_live26treeIndex));
                                            {
                                                {
                                                    vec2 GLF_live36coord = _GLF_FUZZED(vec2(-8.5, -6989.1290));
                                                    int GLF_live36i = _GLF_FUZZED(-67700);
                                                    int GLF_live36looplimiter0 = 0;
                                                    vec4 GLF_live36texel = _GLF_FUZZED(vec4(2728.3848, 2626.7066, -6.5, -1019.1874).rrga);
                                                    while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                                        if (GLF_live36looplimiter0 >= 7) {
                                                            break;
                                                        }
                                                        GLF_live36looplimiter0++;
                                                        {
                                                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                            GLF_live36i++;
                                                        }
                                                    }
                                                }
                                                if (donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)] >= 1.0) {
                                                    donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)] = donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)] * donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead33i, 4)];
                                                }
                                                donor_replacementGLF_dead33i++;
                                            }
                                        }
                                        GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].leftIndex = GLF_live26treeIndex;
                                        GLF_live26makeTreeNode(GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26treeIndex, 10)], GLF_live26data);
                                        {
                                            int GLF_live38baseIndex = _GLF_FUZZED(((127906u != 15113u) ? (-76730) : 65397));
                                            int GLF_live38data = _GLF_FUZZED(-48018);
                                            int GLF_live38treeIndex = _GLF_FUZZED(55302);
                                            if (GLF_live38data <= GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].data) {
                                                if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex == -1) {
                                                    GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex = GLF_live38treeIndex;
                                                    GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                                    ;
                                                } else {
                                                    GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex;
                                                    ;
                                                }
                                            } else {
                                                if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex == -1) {
                                                    GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex = GLF_live38treeIndex;
                                                    GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                                    ;
                                                } else {
                                                    GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex;
                                                    ;
                                                }
                                            }
                                        }
                                        ;
                                    } else {
                                        GLF_live26baseIndex = GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].leftIndex;
                                        ;
                                        {
                                            int GLF_live37i = _GLF_FUZZED((-54275));
                                            int GLF_live37looplimiter0 = 0;
                                            vec2 GLF_live37pos = _GLF_FUZZED(((-4.2) * (+vec2(-16.76, 82.40))));
                                            vec4 GLF_live37res = _GLF_FUZZED(vec4(-56.78, 4.1, 115.009, -6807.6968));
                                            for (GLF_live37i = 0; GLF_live37i < 8; GLF_live37i++) {
                                                if (GLF_live37looplimiter0 >= 3) {
                                                    break;
                                                }
                                                GLF_live37looplimiter0++;
                                                {
                                                    if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
                                                        GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    {
                                        int GLF_live29c = _GLF_FUZZED(int(132101u));
                                        int GLF_live29looplimiter0 = 0;
                                        uint GLF_live29matrix_number = _GLF_FUZZED(94936u);
                                        int GLF_live29rows = _GLF_FUZZED(-4718);
                                        for (int GLF_live29r = 0; GLF_live29r < GLF_live29rows; GLF_live29r++) {
                                            if (GLF_live29looplimiter0 >= 4) {
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                break;
                                            }
                                            GLF_live29looplimiter0++;
                                            {
                                                switch (GLF_live29matrix_number) {
                                                    case 0u:
                                                        GLF_live29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                                        break;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            vec4 donor_replacementGLF_dead33c = _GLF_FUZZED(GLF_live26_GLF_color);
                                                            {
                                                                vec2 GLF_live36coord = _GLF_FUZZED(vec2(859.053, 563.371));
                                                                int GLF_live36i = _GLF_FUZZED((+((-17124) ^ (-99789))));
                                                                int GLF_live36looplimiter0 = 0;
                                                                vec4 GLF_live36texel = _GLF_FUZZED(vec4(219.165, 9.6, 486.374, -9.8));
                                                                while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                                                    if (GLF_live36looplimiter0 >= 7) {
                                                                        break;
                                                                    }
                                                                    GLF_live36looplimiter0++;
                                                                    {
                                                                        GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                                        GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                                        GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                                        GLF_live36i++;
                                                                    }
                                                                }
                                                            }
                                                            {
                                                                donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29looplimiter0, 4)] = donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29looplimiter0, 4)] * donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29looplimiter0, 4)];
                                                            }
                                                        }
                                                    case 1u:
                                                        GLF_live29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                                            int donor_replacementGLF_dead35high = _GLF_FUZZED(GLF_live26data);
                                                            {
                                                                for (int GLF_dead35i = GLF_live26treeIndex; GLF_dead35i < donor_replacementGLF_dead35high; GLF_dead35i += 2 * GLF_live29looplimiter0) {
                                                                    int GLF_dead35from = GLF_dead35i;
                                                                    int GLF_dead35mid = GLF_dead35i + GLF_live29looplimiter0 - 1;
                                                                    int GLF_dead35to = min(GLF_dead35i + 2 * GLF_live29looplimiter0 - 1, donor_replacementGLF_dead35high);
                                                                    GLF_dead35merge(GLF_dead35from, GLF_dead35mid, GLF_dead35to);
                                                                }
                                                            }
                                                        }
                                                        break;
                                                        {
                                                            int GLF_live37looplimiter0 = 0;
                                                            if (GLF_live37looplimiter0 >= 3) {
                                                                ;
                                                            }
                                                        }
                                                    case 2u:
                                                        GLF_live29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                                        break;
                                                    case 3u:
                                                        if (_GLF_DEAD(false)) {
                                                            if (GLF_live30_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9target, 4)] >= 1.0) {
                                                                GLF_live30_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9target, 4)] = GLF_live30_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9target, 4)] * GLF_live30_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9target, 4)];
                                                            }
                                                        }
                                                        GLF_live29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                                        break;
                                                    case 4u:
                                                        GLF_live29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                                        break;
                                                    case 5u:
                                                        GLF_live29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                                        {
                                                            vec2 GLF_live36coord = _GLF_FUZZED(vec2(-9.8, 0.6).rg);
                                                            int GLF_live36i = _GLF_FUZZED((-62984));
                                                            int GLF_live36looplimiter0 = 0;
                                                            vec4 GLF_live36texel = _GLF_FUZZED(((vec4(7068.2093, 0.8, -1149.3013, 9467.1682) * vec4(-9.7, -640.896, 895.867, 0.5)) * vec4(-554.490, 94.68, -2845.0258, 10.02)));
                                                            while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                                                if (GLF_live36looplimiter0 >= 7) {
                                                                    break;
                                                                }
                                                                GLF_live36looplimiter0++;
                                                                {
                                                                    GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                                    GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                                    GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                                    GLF_live36i++;
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 6u:
                                                        GLF_live29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                                        break;
                                                    case 7u:
                                                        {
                                                            int GLF_live38baseIndex = _GLF_FUZZED(83446);
                                                            int GLF_live38data = _GLF_FUZZED((((-1306.9489) != 5000.2075) ? 58090 : (-40663)));
                                                            int GLF_live38treeIndex = _GLF_FUZZED((+98492));
                                                            {
                                                                GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex = GLF_live38treeIndex;
                                                                GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                                                ;
                                                            }
                                                        }
                                                        GLF_live29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                                        break;
                                                    case 8u:
                                                        GLF_live29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                                        break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            int GLF_live9result = GLF_live9search(GLF_live9target);
                            {
                                {
                                    ;
                                }
                            }
                            if (GLF_live9result > 0) {
                                GLF_live9sum += GLF_live9result;
                            } else {
                                switch (GLF_live9result) {
                                    case -1:
                                        GLF_live9sum += 1;
                                        break;
                                    case 0:
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                {
                                                    donor_replacementGLF_dead1x1 = -donor_replacementGLF_dead1x1;
                                                }
                                            }
                                            int GLF_live27looplimiter0 = 0;
                                            if (GLF_live27looplimiter0 >= 3) {
                                                ;
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                        {
                                            int GLF_live13i = _GLF_FUZZED(87143);
                                            {
                                                int GLF_live26baseIndex = _GLF_FUZZED(ivec2(80602, -42874).x);
                                                int GLF_live26data = _GLF_FUZZED(((-14489) & (-97677)));
                                                int GLF_live26looplimiter0 = 0;
                                                int GLF_live26treeIndex = _GLF_FUZZED((((-1247) - 3628) - ((-80417) & (-18628))));
                                                {
                                                    if (GLF_live26looplimiter0 >= 5) {
                                                        ;
                                                    }
                                                    GLF_live26looplimiter0++;
                                                    {
                                                        if (GLF_live26data <= GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].data) {
                                                            if (GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].leftIndex == -1) {
                                                                GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].leftIndex = GLF_live26treeIndex;
                                                                {
                                                                    vec2 GLF_live31coord = _GLF_FUZZED(((mat2(-10.95, -0.8, -141.104, 8100.3762) * mat2(20.76, 3903.9288, -5.7, 656.079)) * vec2(3.7, -41.01)));
                                                                    {
                                                                        {
                                                                            ;
                                                                        }
                                                                    }
                                                                    int GLF_live31i = _GLF_FUZZED(-32920);
                                                                    {
                                                                        int GLF_live31looplimiter0 = 0;
                                                                        while (GLF_live31i < 1 && GLF_live31coord.x > 1.0 || GLF_live31coord.y > 1.0) {
                                                                            if (GLF_live31looplimiter0 >= 5) {
                                                                                break;
                                                                            }
                                                                            if (_GLF_DEAD(false)) {
                                                                                float donor_replacementGLF_dead34th = _GLF_FUZZED(donor_replacementGLF_dead1B);
                                                                                {
                                                                                    donor_replacementGLF_dead34th = 0.5 - donor_replacementGLF_dead34th;
                                                                                }
                                                                            }
                                                                            GLF_live31looplimiter0++;
                                                                            {
                                                                                if (GLF_live31coord.x > 1.0)
                                                                                    GLF_live31coord.x -= 1.0;
                                                                                if (GLF_live31coord.y > 1.0)
                                                                                    GLF_live31coord.y -= 1.0;
                                                                                GLF_live31coord *= 2.0;
                                                                                GLF_live31i++;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                GLF_live26makeTreeNode(GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26treeIndex, 10)], GLF_live26data);
                                                                {
                                                                    vec2 GLF_live37pos = _GLF_FUZZED(vec2(-8876.5558, 33.74));
                                                                    vec4 GLF_live37quad = _GLF_FUZZED(vec4(-5468.2977, -953.119, 1944.6021, 469.673));
                                                                    if (GLF_live37pos.x < GLF_live37quad.x) {
                                                                        ;
                                                                    }
                                                                }
                                                                ;
                                                            } else {
                                                                GLF_live26baseIndex = GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].leftIndex;
                                                                if (_GLF_DEAD(false)) {
                                                                    vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(GLF_dead19resolution);
                                                                    if (donor_replacementGLF_dead32coord.x > 1.0)
                                                                        donor_replacementGLF_dead32coord.x -= 1.0;
                                                                }
                                                                ;
                                                            }
                                                        } else {
                                                            if (GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].rightIndex == -1) {
                                                                GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].rightIndex = GLF_live26treeIndex;
                                                                GLF_live26makeTreeNode(GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26treeIndex, 10)], GLF_live26data);
                                                                ;
                                                            } else {
                                                                GLF_live26baseIndex = GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].rightIndex;
                                                                {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                                ;
                                                            }
                                                        }
                                                    }
                                                    {
                                                        vec2 GLF_live36coord = _GLF_FUZZED(((-9.9) * vec2(0.5, -4546.0410)));
                                                        int GLF_live36i = _GLF_FUZZED(int((ivec4(-88019, -45883, 83556, -8408) != ivec4(42596, -49792, -95696, -91286))));
                                                        int GLF_live36looplimiter0 = 0;
                                                        vec4 GLF_live36texel = _GLF_FUZZED(vec4(9.2, 5.2, -8.8, -3.7));
                                                        {
                                                            if (GLF_live36looplimiter0 >= 7) {
                                                                ;
                                                            }
                                                            GLF_live36looplimiter0++;
                                                            {
                                                                GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                                GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                                GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                                GLF_live36i++;
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    vec4 donor_replacementGLF_dead33c = _GLF_FUZZED(fwidthFine(_GLF_color));
                                                    {
                                                        if (donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9sum, 4)] >= 1.0) {
                                                            donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9sum, 4)] = donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9sum, 4)] * donor_replacementGLF_dead33c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9sum, 4)];
                                                        }
                                                        GLF_live9sum++;
                                                    }
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                }
                                            }
                                            int GLF_live13iters = _GLF_FUZZED((~((-24146) * 8873)));
                                            {
                                                vec2 GLF_live27coord = _GLF_FUZZED(((934.486 - (-0.0)) + vec2(-10.51, 2.2)));
                                                int GLF_live27i = _GLF_FUZZED(26480);
                                                int GLF_live27looplimiter0 = 0;
                                                vec4 GLF_live27texel = _GLF_FUZZED(vec4(-5319.1516, -3.0, 68.69, -16.20));
                                                while (GLF_live27texel.x + GLF_live27texel.y + GLF_live27texel.z > 1.0 && GLF_live27i < 16) {
                                                    if (GLF_live27looplimiter0 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live27looplimiter0++;
                                                    {
                                                        GLF_live27coord = GLF_live27texel.xz + GLF_live27texel.yy;
                                                        GLF_live27coord = floor(GLF_live27coord * 256.0) / 256.0;
                                                        GLF_live27texel = texture(GLF_live27tex, GLF_live27coord);
                                                        GLF_live27i++;
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                                {
                                                    discard;
                                                }
                                            }
                                            int GLF_live13looplimiter0 = 0;
                                            {
                                                vec2 GLF_live31coord = _GLF_FUZZED(vec2(-1831.4412, 46.63));
                                                if (GLF_live31coord.x > 1.0) {
                                                    {
                                                        int GLF_live38looplimiter2 = 0;
                                                        int GLF_live38sum = _GLF_FUZZED((true ? ((-20890) ^ 78448) : (-18290)));
                                                        for (int GLF_live38target = 0; GLF_live38target < 20; GLF_live38target++) {
                                                            if (GLF_live38looplimiter2 >= 3) {
                                                                break;
                                                            }
                                                            GLF_live38looplimiter2++;
                                                            {
                                                                int GLF_live38result = GLF_live38search(GLF_live38target);
                                                                if (GLF_live38result > 0) {
                                                                    GLF_live38sum += GLF_live38result;
                                                                } else {
                                                                    switch (GLF_live38result) {
                                                                        case -1:
                                                                            GLF_live38sum += 1;
                                                                            break;
                                                                        case 0:
                                                                            ;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    GLF_live31coord.x -= 1.0;
                                                }
                                            }
                                            int GLF_live13v = _GLF_FUZZED(-56731);
                                            {
                                                ivec2 GLF_live30ipos = _GLF_FUZZED(ivec2(-24231, 74699));
                                                {
                                                    int GLF_live39looplimiter0 = 0;
                                                    if (GLF_live39looplimiter0 >= 3) {
                                                        ;
                                                    }
                                                }
                                                if (GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30ipos.y * 16 + GLF_live30ipos.x, 256)] == 1) {
                                                    GLF_live30_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    ;
                                                }
                                            }
                                            for (GLF_live13i = 0; GLF_live13i < GLF_live13iters; GLF_live13i++) {
                                                if (GLF_live13looplimiter0 >= 7) {
                                                    break;
                                                }
                                                GLF_live13looplimiter0++;
                                                {
                                                    GLF_live13v = (4 * GLF_live13v * (1000 - GLF_live13v)) / 1000;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(GLF_live15injectionSwitch);
                                            {
                                                GLF_live26_GLF_color = texture(GLF_dead32tex, donor_replacementGLF_dead32coord);
                                            }
                                            {
                                                vec2 GLF_live36coord = _GLF_FUZZED(vec2(-8.3, -2046.6666));
                                                int GLF_live36i = _GLF_FUZZED((~(-38507)));
                                                int GLF_live36looplimiter0 = 0;
                                                vec4 GLF_live36texel = _GLF_FUZZED(vec4(109.760, 930.292, 4157.2635, 5.6));
                                                while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                                    if (GLF_live36looplimiter0 >= 7) {
                                                        break;
                                                    }
                                                    GLF_live36looplimiter0++;
                                                    {
                                                        GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                        GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                        GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                        GLF_live36i++;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                int GLF_live13v = _GLF_FUZZED((+((-55092) ^ 13993)));
                                                {
                                                    GLF_live13v = (4 * GLF_live13v * (1000 - GLF_live13v)) / 1000;
                                                    {
                                                        vec2 GLF_live36coord = _GLF_FUZZED((vec4(116.606, -141.293, 55.72, 4.5) * mat2x4(15.87, 3.4, -1.8, -4540.9074, -7.9, 36.23, -5693.0034, 6.4)));
                                                        int GLF_live36i = _GLF_FUZZED(((~ivec4(99083, -36152, 9366, -45165)).w));
                                                        vec4 GLF_live36texel = _GLF_FUZZED(vec4(-9.4, 270.688, 99.81, -3754.0880));
                                                        {
                                                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                                            GLF_live36i++;
                                                        }
                                                    }
                                                }
                                            }
                                            {
                                                donor_replacementGLF_dead1A = 1.0 - donor_replacementGLF_dead1A;
                                            }
                                        }
                                        ;
                                }
                            }
                        }
                    }
                    {
                        vec2 GLF_live31coord = _GLF_FUZZED((vec2(6.3, -4217.4146) + (+vec2(-9.2, -7461.2140))));
                        vec4 GLF_live31res = _GLF_FUZZED(vec4(5.4, -6.7, 6.4, -7485.7580));
                        {
                            GLF_live31res = texture(GLF_live31tex, GLF_live31coord);
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead12a = _GLF_FUZZED(resolution);
                    if (donor_replacementGLF_dead12a.y > donor_replacementGLF_dead12a.x) {
                        donor_replacementGLF_dead1x0 = donor_replacementGLF_dead12a.x / donor_replacementGLF_dead12a.y;
                        {
                            int GLF_live38baseIndex = _GLF_FUZZED(75835);
                            int GLF_live38data = _GLF_FUZZED(int(true));
                            int GLF_live38treeIndex = _GLF_FUZZED(88726);
                            {
                                if (GLF_live38data <= GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].data) {
                                    if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex == -1) {
                                        GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex = GLF_live38treeIndex;
                                        GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                        ;
                                    } else {
                                        GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex;
                                        ;
                                    }
                                } else {
                                    if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex == -1) {
                                        GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex = GLF_live38treeIndex;
                                        GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                        ;
                                    } else {
                                        GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex;
                                        ;
                                    }
                                }
                            }
                        }
                    } else {
                        donor_replacementGLF_dead1x0 = donor_replacementGLF_dead12a.y / donor_replacementGLF_dead12a.x;
                        if (_GLF_DEAD(false)) {
                            {
                                discard;
                            }
                        }
                    }
                }
            }
            float p = (15.0 - abs(float(pos.x - dp[pos.y]))) / 15.0;
            {
                {
                    {
                        {
                            ;
                        }
                    }
                    GLF_live12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                }
            }
            return vec4(p, p, p, 1.0);
        }
        pos.y++;
    }
    return vec4(0.0, 0.0, 0.0, 1.0);
    {
        int GLF_live12baseIndex = _GLF_FUZZED(72459);
        int GLF_live12data = _GLF_FUZZED((+ivec2(29939, -9078)).s);
        int GLF_live12treeIndex = _GLF_FUZZED((49524));
        {
            {
                int GLF_live38looplimiter2 = 0;
                int GLF_live38sum = _GLF_FUZZED(52741);
                int GLF_live38target = _GLF_FUZZED(((-74045) - (86961 - 25216)));
                {
                    if (GLF_live38looplimiter2 >= 3) {
                        ;
                    }
                    GLF_live38looplimiter2++;
                    {
                        int GLF_live38result = GLF_live38search(GLF_live38target);
                        if (GLF_live38result > 0) {
                            GLF_live38sum += GLF_live38result;
                        } else {
                            switch (GLF_live38result) {
                                case -1:
                                    GLF_live38sum += 1;
                                    break;
                                case 0:
                                    ;
                            }
                        }
                    }
                }
            }
            if (GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].leftIndex == -1) {
                {
                    int GLF_live38baseIndex = _GLF_FUZZED(((-73946) & 42261));
                    {
                        GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex;
                        ;
                    }
                }
                GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].leftIndex = GLF_live12treeIndex;
                GLF_live12makeTreeNode(GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12treeIndex, 10)], GLF_live12data);
                ;
            } else {
                GLF_live12baseIndex = GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].leftIndex;
                ;
            }
        }
    }
}

void main() {
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(vec2(GLF_live29one, -5166.9573));
            if (donor_replacementGLF_dead32coord.y > 1.0)
                donor_replacementGLF_dead32coord.y -= 1.0;
        }
        int donor_replacementGLF_dead18i = _GLF_FUZZED(74797);
        int donor_replacementGLF_dead18j = _GLF_FUZZED((48606 * (-88358)));
        uint donor_replacementGLF_dead18uselessOutVariable = _GLF_FUZZED(35200u);
        if (uint(donor_replacementGLF_dead18j) < uaddCarry(uint(donor_replacementGLF_dead18i), 1u, donor_replacementGLF_dead18uselessOutVariable)) {
            ;
        }
        {
            {
                bool GLF_live30canwalk = _GLF_FUZZED(false);
                int GLF_live30i = _GLF_FUZZED(-47518);
                int GLF_live30j = _GLF_FUZZED(25332);
                ivec2 GLF_live30p = _GLF_FUZZED(ivec2(94475, -74340));
                {
                    {
                        int GLF_live30looplimiter1 = 0;
                        for (GLF_live30j = 0; GLF_live30j < 8; GLF_live30j++) {
                            if (GLF_live30looplimiter1 >= 7) {
                                break;
                            }
                            GLF_live30looplimiter1++;
                            {
                                if (GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30j * 2 + GLF_live30i * 2 * 16, 256)] == 0) {
                                    GLF_live30p.x = GLF_live30j * 2;
                                    GLF_live30p.y = GLF_live30i * 2;
                                    GLF_live30canwalk = true;
                                }
                                {
                                    vec2 GLF_live36coord = _GLF_FUZZED(vec2(-3.3, 6.1));
                                    int GLF_live36i = _GLF_FUZZED(int(bool(62342u)));
                                    int GLF_live36looplimiter0 = 0;
                                    vec4 GLF_live36texel = _GLF_FUZZED(vec4(-956.667, 1.9, -1.3, -5485.5382));
                                    while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                        if (GLF_live36looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live36looplimiter0++;
                                        {
                                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                            GLF_live36i++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            {
                ;
            }
        }
    }
    vec2 pos = gl_FragCoord.xy / resolution;
    {
        vec2 GLF_live31coord = _GLF_FUZZED(((-mat2(-966.750, 5719.7271, -6.8, 8.7)) * vec2(3011.2517, -1.3)));
        if (GLF_live31coord.y > 1.0)
            GLF_live31coord.y -= 1.0;
    }
    {
        float GLF_live0pab = _GLF_FUZZED(18.86);
        float GLF_live0pbc = _GLF_FUZZED(-9.6);
        if (!((GLF_live0pab < 0.0 && GLF_live0pbc < 0.0) || (GLF_live0pab >= 0.0 && GLF_live0pbc >= 0.0))) {
            ;
            {
                int GLF_live31looplimiter0 = 0;
                if (GLF_live31looplimiter0 >= 5) {
                    ;
                }
                {
                    int GLF_live38looplimiter1 = 0;
                    if (GLF_live38looplimiter1 >= 3) {
                        ;
                    }
                }
            }
        }
    }
    {
        int GLF_live7d = _GLF_FUZZED((+27914));
        ivec2 GLF_live7p = _GLF_FUZZED(ivec2(ivec4(14427, -86895, 24212, 20242)));
        {
            int GLF_live10looplimiter6 = 0;
            {
                int GLF_live30d = _GLF_FUZZED((7729));
                ivec2 GLF_live30p = _GLF_FUZZED(ivec2(-36493, -52286));
                {
                    GLF_live30d--;
                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 1) * 16, 256)] = 1;
                    {
                        vec2 GLF_live36coord = _GLF_FUZZED((vec4(9.9, -8.7, -4028.8004, -474.739) * mat2x4(-6.1, -6.9, 5182.4928, 222.433, -2.0, 3.3, -301.391, 14.58)));
                        int GLF_live36i = _GLF_FUZZED(-95260);
                        vec4 GLF_live36texel = _GLF_FUZZED(vec4(603.171, 7.4, 10.69, 352.486));
                        {
                            int GLF_live36looplimiter0 = 0;
                            while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                if (GLF_live36looplimiter0 >= 7) {
                                    break;
                                }
                                GLF_live36looplimiter0++;
                                {
                                    GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                    GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                    GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                    GLF_live36i++;
                                }
                            }
                        }
                    }
                    GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] = 1;
                    GLF_live30p.y -= 2;
                }
            }
            for (int GLF_live10j = 0; GLF_live10j < 10; GLF_live10j++) {
                if (GLF_live10looplimiter6 >= 4) {
                    break;
                }
                GLF_live10looplimiter6++;
                {
                    int GLF_live38sum = _GLF_FUZZED(-77322);
                    {
                        int GLF_live38looplimiter2 = 0;
                        for (int GLF_live38target = 0; GLF_live38target < 20; GLF_live38target++) {
                            if (GLF_live38looplimiter2 >= 3) {
                                break;
                            }
                            GLF_live38looplimiter2++;
                            {
                                int GLF_live38result = GLF_live38search(GLF_live38target);
                                if (GLF_live38result > 0) {
                                    GLF_live38sum += GLF_live38result;
                                } else {
                                    switch (GLF_live38result) {
                                        case -1:
                                            GLF_live38sum += 1;
                                            break;
                                        case 0:
                                            ;
                                    }
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead12z = _GLF_FUZZED(acos(7.7));
                    if (pos.y > pos.x) {
                        donor_replacementGLF_dead12z = pos.x / pos.y;
                    } else {
                        donor_replacementGLF_dead12z = pos.y / pos.x;
                    }
                }
                {
                    GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 10)];
                    {
                        {
                            int GLF_live25looplimiter1 = 0;
                            if (GLF_live25looplimiter1 >= 4) {
                                ;
                            }
                        }
                        int GLF_live13i = _GLF_FUZZED(-61528);
                        int GLF_live13iters = _GLF_FUZZED(-49715);
                        int GLF_live13looplimiter0 = 0;
                        int GLF_live13v = _GLF_FUZZED((3120 ^ (46616)));
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead32i = _GLF_FUZZED(GLF_live7d);
                            {
                                if (pos.x > 1.0)
                                    pos.x -= 1.0;
                                if (pos.y > 1.0)
                                    pos.y -= 1.0;
                                pos *= 2.0;
                                donor_replacementGLF_dead32i++;
                            }
                        }
                        {
                            int GLF_live29looplimiter0 = 0;
                            if (GLF_live29looplimiter0 >= 4) {
                                ;
                            }
                        }
                        for (GLF_live13i = 0; GLF_live13i < GLF_live13iters; GLF_live13i++) {
                            if (GLF_live13looplimiter0 >= 7) {
                                break;
                            }
                            GLF_live13looplimiter0++;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                float donor_replacementGLF_dead17x = _GLF_FUZZED(901.435);
                                float donor_replacementGLF_dead17y = _GLF_FUZZED(radians(-5.7));
                                if (0.0 > GLF_dead17resolution.x) {
                                    donor_replacementGLF_dead17x = 1.0;
                                    donor_replacementGLF_dead17y = 1.0;
                                }
                                {
                                    {
                                        GLF_live26_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                    }
                                }
                            }
                            {
                                GLF_live13v = (4 * GLF_live13v * (1000 - GLF_live13v)) / 1000;
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    int GLF_live26baseIndex = _GLF_FUZZED(52423);
                                    int GLF_live26data = _GLF_FUZZED(17342);
                                    int GLF_live26treeIndex = _GLF_FUZZED(((-37331) ^ 28530));
                                    if (GLF_live26data <= GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].data) {
                                        if (GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].leftIndex == -1) {
                                            GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].leftIndex = GLF_live26treeIndex;
                                            GLF_live26makeTreeNode(GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26treeIndex, 10)], GLF_live26data);
                                            ;
                                        } else {
                                            GLF_live26baseIndex = GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].leftIndex;
                                            ;
                                        }
                                    } else {
                                        if (GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].rightIndex == -1) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                float donor_replacementGLF_dead34th = _GLF_FUZZED(-2.4);
                                                vec2 donor_replacementGLF_dead34v = _GLF_FUZZED(asin(injectionSwitch));
                                                if (donor_replacementGLF_dead34v.x < 0.0) {
                                                    donor_replacementGLF_dead34th = 1.0 - donor_replacementGLF_dead34th;
                                                }
                                            }
                                            GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].rightIndex = GLF_live26treeIndex;
                                            {
                                                int GLF_live37i = _GLF_FUZZED((int(false) * (-36682)));
                                                vec4 GLF_live37res = _GLF_FUZZED(vec4(vec3(1.2, 8302.5083, 166.356).sp, vec2(19.25, -399.725)));
                                                {
                                                    GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                                }
                                            }
                                            GLF_live26makeTreeNode(GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26treeIndex, 10)], GLF_live26data);
                                            ;
                                        } else {
                                            GLF_live26baseIndex = GLF_live26tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26baseIndex, 10)].rightIndex;
                                            ;
                                        }
                                    }
                                }
                                float donor_replacementGLF_dead21th = _GLF_FUZZED(cosh(30.27));
                                {
                                    donor_replacementGLF_dead21th = -donor_replacementGLF_dead21th;
                                    {
                                        vec2 GLF_live31coord = _GLF_FUZZED(vec2(2.8, 8.4));
                                        int GLF_live31i = _GLF_FUZZED(66286);
                                        {
                                            if (GLF_live31coord.x > 1.0)
                                                GLF_live31coord.x -= 1.0;
                                            if (GLF_live31coord.y > 1.0) {
                                                {
                                                    int GLF_live37i = _GLF_FUZZED(62336);
                                                    int GLF_live37looplimiter0 = 0;
                                                    vec2 GLF_live37pos = _GLF_FUZZED(vec2(-73.26, -2.2));
                                                    vec4 GLF_live37res = _GLF_FUZZED(vec4(-61.20, -6.5, 49.68, 9.8));
                                                    {
                                                        if (GLF_live37looplimiter0 >= 3) {
                                                            ;
                                                        }
                                                        GLF_live37looplimiter0++;
                                                        {
                                                            if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
                                                                GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_live31coord.y -= 1.0;
                                            }
                                            GLF_live31coord *= 2.0;
                                            GLF_live31i++;
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
            vec2 GLF_live31coord = _GLF_FUZZED(((mat4x2(-5454.2866, -5605.5547, -0.9, 75.72, 150.233, 6516.7880, -789.644, 962.608) * vec4(-9.0, -684.982, 43.84, 8.4)) + ((3670.1228 - (-82.23)) * 2.6)));
            if (GLF_live31coord.y > 1.0)
                GLF_live31coord.y -= 1.0;
        }
        {
            int GLF_live12count = _GLF_FUZZED(int((uvec4(193504u, 98181u, 136361u, 149313u) != uvec4(4977u, 33142u, 164691u, 6789u))));
            int GLF_live12result = _GLF_FUZZED(67006);
            if (GLF_live12result == -1) {
                {
                    {
                        ;
                    }
                }
                GLF_live12count++;
            }
        }
        {
            int GLF_live27looplimiter0 = 0;
            if (GLF_live27looplimiter0 >= 3) {
                ;
            }
        }
        {
            GLF_live7d--;
            GLF_live7map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live7p.x) + (GLF_live7p.y) * 16, 256)] = 1;
            GLF_live7map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live7p.x) + (GLF_live7p.y - 1) * 16, 256)] = 1;
            GLF_live7map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live7p.x) + (GLF_live7p.y - 2) * 16, 256)] = 1;
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead17iterationCap = _GLF_FUZZED(GLF_live7d);
                {
                    vec2 GLF_live27coord = _GLF_FUZZED(vec2(262.267, -8.1));
                    int GLF_live27i = _GLF_FUZZED(64180);
                    vec4 GLF_live27texel = _GLF_FUZZED(vec4(-7612.2398, 0.3, -5.2, -1.0));
                    {
                        {
                            {
                                ;
                            }
                        }
                        {
                            ;
                        }
                    }
                    {
                        int GLF_live27looplimiter0 = 0;
                        while (GLF_live27texel.x + GLF_live27texel.y + GLF_live27texel.z > 1.0 && GLF_live27i < 16) {
                            {
                                vec2 GLF_live36coord = _GLF_FUZZED((vec3(8.9, -28.79, 75.75) * mat2x3(467.055, -6.9, 11.18, -77.64, -6469.8961, 54.24)));
                                int GLF_live36i = _GLF_FUZZED(((vec3(-70.68, -7.0, 6.6) == vec3(-50.18, -1.6, -39.35)) ? int(15010u) : int(true)));
                                vec4 GLF_live36texel = _GLF_FUZZED(vec4(395.735, -80.10, 9.8, -0.6));
                                {
                                    int GLF_live36looplimiter0 = 0;
                                    while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                                        if (GLF_live36looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live36looplimiter0++;
                                        {
                                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                            GLF_live36i++;
                                        }
                                    }
                                }
                            }
                            if (GLF_live27looplimiter0 >= 3) {
                                break;
                            }
                            GLF_live27looplimiter0++;
                            {
                                GLF_live27coord = GLF_live27texel.xz + GLF_live27texel.yy;
                                GLF_live27coord = floor(GLF_live27coord * 256.0) / 256.0;
                                GLF_live27texel = texture(GLF_live27tex, GLF_live27coord);
                                GLF_live27i++;
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead33s = _GLF_FUZZED(dot(vec3(-632.949, 3.2, -4.6), GLF_dead1polynomial));
                                    {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                }
                if (0.0 > GLF_dead17resolution.y) {
                    donor_replacementGLF_dead17iterationCap += 1;
                }
            }
            GLF_live7p.y -= 2;
        }
    }
    {
        int GLF_live9baseIndex = _GLF_FUZZED(((-25175) + (-24311)));
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead16x = _GLF_FUZZED(distance(-307.942, sin(-1.2)));
            float donor_replacementGLF_dead16y = _GLF_FUZZED(abs(tanh(-714.053)));
            {
                int GLF_live38baseIndex = _GLF_FUZZED((true ? 63905 : 40824));
                int GLF_live38data = _GLF_FUZZED(33949);
                int GLF_live38treeIndex = _GLF_FUZZED(-87116);
                if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex == -1) {
                    GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex = GLF_live38treeIndex;
                    GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                    ;
                } else {
                    GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex;
                    ;
                }
            }
            if (donor_replacementGLF_dead16x * donor_replacementGLF_dead16x + donor_replacementGLF_dead16y * donor_replacementGLF_dead16y > 4.0) {
                {
                    float GLF_live25limit = _GLF_FUZZED((+(true ? (-953.368) : (-1.1))));
                    int GLF_live25looplimiter0 = 0;
                    float GLF_live25result = _GLF_FUZZED((((-61.96) * (-51.08)) * (-5.9)));
                    float GLF_live25thirty_two = _GLF_FUZZED((((-50.29) - 213.983)));
                    for (int GLF_live25i = 1; GLF_live25i < 800; GLF_live25i++) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                            {
                                ;
                            }
                        }
                        if (GLF_live25looplimiter0 >= 4) {
                            break;
                        }
                        GLF_live25looplimiter0++;
                        {
                            if ((GLF_live25i % 32) == 0) {
                                GLF_live25result += 0.4;
                            } else {
                                if (mod(float(GLF_live25i), round(GLF_live25thirty_two)) <= 0.01) {
                                    {
                                        int GLF_live38looplimiter2 = 0;
                                        int GLF_live38sum = _GLF_FUZZED(-80966);
                                        for (int GLF_live38target = 0; GLF_live38target < 20; GLF_live38target++) {
                                            if (GLF_live38looplimiter2 >= 3) {
                                                break;
                                            }
                                            GLF_live38looplimiter2++;
                                            {
                                                int GLF_live38result = GLF_live38search(GLF_live38target);
                                                if (GLF_live38result > 0) {
                                                    GLF_live38sum += GLF_live38result;
                                                } else {
                                                    switch (GLF_live38result) {
                                                        case -1:
                                                            GLF_live38sum += 1;
                                                            break;
                                                        case 0:
                                                            ;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    GLF_live25result += 100.0;
                                }
                            }
                            if (float(GLF_live25i) >= GLF_live25limit) {
                                ;
                                {
                                    int GLF_live30d = _GLF_FUZZED(-60703);
                                    ivec2 GLF_live30p = _GLF_FUZZED(ivec2(-64395, 13438));
                                    if (GLF_live30d >= 0 && GLF_live30p.y > 0 && GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] == 0) {
                                        GLF_live30d--;
                                        {
                                            int GLF_live39i = _GLF_FUZZED(42131);
                                            int GLF_live39j = _GLF_FUZZED(12315);
                                            uint GLF_live39uselessOutVariable = _GLF_FUZZED(109391u);
                                            if (uint(GLF_live39j) < uaddCarry(uint(GLF_live39i), 1u, GLF_live39uselessOutVariable)) {
                                                ;
                                            }
                                        }
                                        GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                                        GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 1) * 16, 256)] = 1;
                                        GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y - 2) * 16, 256)] = 1;
                                        GLF_live30p.y -= 2;
                                    }
                                }
                            }
                        }
                    }
                }
                ;
                {
                    {
                        ;
                    }
                }
            }
        }
        {
            int GLF_live38looplimiter0 = 0;
            if (GLF_live38looplimiter0 >= 3) {
                ;
            }
        }
        int GLF_live9data = _GLF_FUZZED((~87110));
        int GLF_live9looplimiter0 = 0;
        int GLF_live9treeIndex = _GLF_FUZZED(5931);
        while (GLF_live9baseIndex <= GLF_live9treeIndex) {
            if (GLF_live9looplimiter0 >= 6) {
                {
                    int GLF_live39looplimiter2 = 0;
                    if (GLF_live39looplimiter2 >= 3) {
                        ;
                    }
                }
                break;
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                float donor_replacementGLF_dead23result = _GLF_FUZZED(381.241);
                float donor_replacementGLF_dead23thirty_two = _GLF_FUZZED(96.75);
                if (mod(float(GLF_live9baseIndex), round(donor_replacementGLF_dead23thirty_two)) <= 0.01) {
                    donor_replacementGLF_dead23result += 100.0;
                }
            }
            GLF_live9looplimiter0++;
            {
                if (GLF_live9data <= GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].data) {
                    if (GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].leftIndex == -1) {
                        {
                            int GLF_live27looplimiter0 = 0;
                            if (GLF_live27looplimiter0 >= 3) {
                                ;
                            }
                        }
                        GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].leftIndex = GLF_live9treeIndex;
                        {
                            int GLF_live37looplimiter0 = 0;
                            if (GLF_live37looplimiter0 >= 3) {
                                ;
                            }
                        }
                        GLF_live9makeTreeNode(GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 10)], GLF_live9data);
                        ;
                    } else {
                        GLF_live9baseIndex = GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].leftIndex;
                        continue;
                    }
                } else {
                    if (GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex == -1) {
                        {
                            {
                                ;
                            }
                        }
                        GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex = GLF_live9treeIndex;
                        GLF_live9makeTreeNode(GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 10)], GLF_live9data);
                        {
                            int GLF_live13looplimiter0 = 0;
                            int GLF_live13v = _GLF_FUZZED(91377);
                            {
                                if (GLF_live13looplimiter0 >= 7) {
                                    ;
                                }
                                GLF_live13looplimiter0++;
                                {
                                    GLF_live13v = (4 * GLF_live13v * (1000 - GLF_live13v)) / 1000;
                                    {
                                        {
                                            ;
                                        }
                                    }
                                }
                            }
                        }
                        {
                            vec2 GLF_live27coord = _GLF_FUZZED(vec2(67.70, 3.8));
                            int GLF_live27i = _GLF_FUZZED(33570);
                            int GLF_live27looplimiter0 = 0;
                            vec4 GLF_live27texel = _GLF_FUZZED(vec4(-7.3, 2737.2058, 4580.2957, 7972.7997));
                            {
                                if (GLF_live27looplimiter0 >= 3) {
                                    ;
                                }
                                GLF_live27looplimiter0++;
                                {
                                    GLF_live27coord = GLF_live27texel.xz + GLF_live27texel.yy;
                                    GLF_live27coord = floor(GLF_live27coord * 256.0) / 256.0;
                                    GLF_live27texel = texture(GLF_live27tex, GLF_live27coord);
                                    GLF_live27i++;
                                }
                            }
                        }
                        ;
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead23c = _GLF_FUZZED(GLF_dead1polynomial);
                            if (donor_replacementGLF_dead23c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 3)] >= 1.0) {
                                donor_replacementGLF_dead23c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 3)] = donor_replacementGLF_dead23c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 3)] * donor_replacementGLF_dead23c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 3)];
                            }
                        }
                    } else {
                        {
                            vec2 GLF_live37pos = _GLF_FUZZED((vec2(-6745.0204, 3.8)));
                            vec4 GLF_live37quad = _GLF_FUZZED(((8.2 + (-3.8)) * vec4(2.0, 3824.2258, -7.8, 6.9)));
                            if (GLF_live37pos.y > GLF_live37quad.y + GLF_live37quad.w) {
                                ;
                            }
                        }
                        GLF_live9baseIndex = GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex;
                        continue;
                        {
                            int GLF_live29looplimiter2 = 0;
                            if (GLF_live29looplimiter2 >= 4) {
                                ;
                            }
                        }
                    }
                }
                {
                    int GLF_live13looplimiter0 = 0;
                    int GLF_live13v = _GLF_FUZZED(35741);
                    {
                        {
                            int GLF_live30directions = _GLF_FUZZED(97440);
                            {
                                GLF_live30directions += 1;
                                {
                                    int GLF_live36looplimiter0 = 0;
                                    if (GLF_live36looplimiter0 >= 7) {
                                        ;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                discard;
                            }
                        }
                        if (GLF_live13looplimiter0 >= 7) {
                            ;
                            {
                                vec2 GLF_live31coord = _GLF_FUZZED((vec2(-8.0, 9.4) * vec2(6.4, -74.31)));
                                int GLF_live31i = _GLF_FUZZED(((-65153) - ((-38998) * (-12383))));
                                {
                                    int GLF_live31looplimiter0 = 0;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        {
                                            ;
                                        }
                                    }
                                    while (GLF_live31i < 1 && GLF_live31coord.x > 1.0 || GLF_live31coord.y > 1.0) {
                                        if (GLF_live31looplimiter0 >= 5) {
                                            break;
                                        }
                                        GLF_live31looplimiter0++;
                                        {
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            if (GLF_live31coord.x > 1.0)
                                                GLF_live31coord.x -= 1.0;
                                            if (GLF_live31coord.y > 1.0)
                                                GLF_live31coord.y -= 1.0;
                                            GLF_live31coord *= 2.0;
                                            GLF_live31i++;
                                        }
                                    }
                                }
                            }
                        }
                        {
                            int GLF_live37looplimiter0 = 0;
                            if (GLF_live37looplimiter0 >= 3) {
                                ;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead17x = _GLF_FUZZED(-82.17);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(_GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 0.0, 0.0)), dot(vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 0.0, 0.0)))))))) {
                                {
                                    donor_replacementGLF_dead17x += 0.4;
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                            }
                            float donor_replacementGLF_dead17y = _GLF_FUZZED(intBitsToFloat(GLF_live13looplimiter0));
                            if (donor_replacementGLF_dead17x * donor_replacementGLF_dead17x + donor_replacementGLF_dead17y * donor_replacementGLF_dead17y > 4.0) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), bool(bool(!(false)))))))) {
                                        vec2 donor_replacementGLF_dead34v = _GLF_FUZZED(resolution);
                                        if (length(donor_replacementGLF_dead34v) < 0.001) {
                                            ;
                                        }
                                    }
                                    float donor_replacementGLF_dead21th = _GLF_FUZZED(donor_replacementGLF_dead17y);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        vec2 donor_replacementGLF_dead34a = _GLF_FUZZED(tanh(GLF_dead19resolution));
                                        if (donor_replacementGLF_dead34a.y > donor_replacementGLF_dead34a.x) {
                                            donor_replacementGLF_dead17y = donor_replacementGLF_dead34a.x / donor_replacementGLF_dead34a.y;
                                        } else {
                                            donor_replacementGLF_dead17y = donor_replacementGLF_dead34a.y / donor_replacementGLF_dead34a.x;
                                        }
                                    }
                                    vec2 donor_replacementGLF_dead21v = _GLF_FUZZED(pos);
                                    if (donor_replacementGLF_dead21v.y < 0.0) {
                                        donor_replacementGLF_dead21th = -donor_replacementGLF_dead21th;
                                    }
                                }
                            }
                        }
                        GLF_live13looplimiter0++;
                        {
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead16c_im = _GLF_FUZZED(4.1);
                                float donor_replacementGLF_dead16c_re = _GLF_FUZZED(distance(-867.635, 102.131));
                                float donor_replacementGLF_dead16x = _GLF_FUZZED(vec3(-4.5, 8018.8562, 934.278)[2]);
                                float donor_replacementGLF_dead16y = _GLF_FUZZED(5533.5067);
                                {
                                    if (donor_replacementGLF_dead16x * donor_replacementGLF_dead16x + donor_replacementGLF_dead16y * donor_replacementGLF_dead16y > 4.0) {
                                        break;
                                    }
                                    float GLF_dead16x_new = donor_replacementGLF_dead16x * donor_replacementGLF_dead16x - donor_replacementGLF_dead16y * donor_replacementGLF_dead16y + donor_replacementGLF_dead16c_re;
                                    donor_replacementGLF_dead16y = 2.0 * donor_replacementGLF_dead16x * donor_replacementGLF_dead16y + donor_replacementGLF_dead16c_im;
                                    donor_replacementGLF_dead16x = GLF_dead16x_new;
                                    GLF_live9looplimiter0++;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    bool GLF_live30canwalk = _GLF_FUZZED(true);
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead33s = _GLF_FUZZED(inversesqrt(-9596.6243));
                                        {
                                            ;
                                        }
                                    }
                                    int GLF_live30i = _GLF_FUZZED(((~(-60345))));
                                    int GLF_live30j = _GLF_FUZZED(-77502);
                                    ivec2 GLF_live30p = _GLF_FUZZED(ivec2(-86319, 54781));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        float donor_replacementGLF_dead34th = _GLF_FUZZED(GLF_live29one);
                                        if (pos.y < pos.x) {
                                            donor_replacementGLF_dead34th = 0.5 - donor_replacementGLF_dead34th;
                                        }
                                    }
                                    {
                                        int GLF_live30looplimiter2 = 0;
                                        for (GLF_live30i = 0; GLF_live30i < 8; GLF_live30i++) {
                                            if (GLF_live30looplimiter2 >= 7) {
                                                break;
                                            }
                                            GLF_live30looplimiter2++;
                                            {
                                                {
                                                    int GLF_live30looplimiter1 = 0;
                                                    for (GLF_live30j = 0; GLF_live30j < 8; GLF_live30j++) {
                                                        {
                                                            int GLF_live37i = _GLF_FUZZED(8265);
                                                            vec2 GLF_live37pos = _GLF_FUZZED(vec2(-27.39, -987.323));
                                                            vec4 GLF_live37res = _GLF_FUZZED(vec4(-894.652, -899.919, -4.0, -586.847));
                                                            {
                                                                int GLF_live37looplimiter0 = 0;
                                                                for (GLF_live37i = 0; GLF_live37i < 8; GLF_live37i++) {
                                                                    if (GLF_live37looplimiter0 >= 3) {
                                                                        break;
                                                                    }
                                                                    GLF_live37looplimiter0++;
                                                                    {
                                                                        if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
                                                                            GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (GLF_live30looplimiter1 >= 7) {
                                                            break;
                                                        }
                                                        GLF_live30looplimiter1++;
                                                        {
                                                            if (GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live30j * 2 + GLF_live30i * 2 * 16, 256)] == 0) {
                                                                GLF_live30p.x = GLF_live30j * 2;
                                                                GLF_live30p.y = GLF_live30i * 2;
                                                                GLF_live30canwalk = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                {
                                    ;
                                }
                            }
                            GLF_live13v = (4 * GLF_live13v * (1000 - GLF_live13v)) / 1000;
                        }
                    }
                }
                {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead35i = _GLF_FUZZED(ivec2(-15609, -52325)[1]);
                        do {
                            switch (donor_replacementGLF_dead35i) {
                                case 0:
                                    GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i, 10)] = 4;
                                    break;
                                case 1:
                                    GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i, 10)] = 3;
                                    break;
                                case 2:
                                    GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i, 10)] = 2;
                                    break;
                                    {
                                        vec2 GLF_live36coord = _GLF_FUZZED((vec2(-7.3, -2.8) - (-678.683)));
                                        int GLF_live36i = _GLF_FUZZED(98922);
                                        vec4 GLF_live36texel = _GLF_FUZZED(vec4(8124.4987, -133.604, -7.7, -78.48));
                                        {
                                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                            GLF_live36i++;
                                        }
                                    }
                                case 3:
                                    GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i, 10)] = 1;
                                    break;
                                case 4:
                                    GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i, 10)] = 0;
                                    break;
                                case 5:
                                    GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i, 10)] = -1;
                                    break;
                                case 6:
                                    GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i, 10)] = -2;
                                    break;
                                case 7:
                                    GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i, 10)] = -3;
                                    break;
                                case 8:
                                    GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i, 10)] = -4;
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    break;
                                case 9:
                                    GLF_dead35data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead35i, 10)] = -5;
                                    break;
                            }
                            donor_replacementGLF_dead35i++;
                        } while (donor_replacementGLF_dead35i < 10);
                        {
                            int GLF_live37i = _GLF_FUZZED(15903);
                            vec2 GLF_live37pos = _GLF_FUZZED((vec2(((-8192.7609) - vec3(3.3, -6166.8909, -8.1))) + 5262.7084));
                            vec4 GLF_live37res = _GLF_FUZZED(vec4(32.91, 0.6, -38.13, 3232.7702));
                            {
                                int GLF_live37looplimiter0 = 0;
                                for (GLF_live37i = 0; GLF_live37i < 8; GLF_live37i++) {
                                    if (GLF_live37looplimiter0 >= 3) {
                                        break;
                                    }
                                    GLF_live37looplimiter0++;
                                    {
                                        if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
                                            GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                        }
                                    }
                                }
                            }
                        }
                    }
                    int GLF_live29cols = _GLF_FUZZED(-83282);
                    uint GLF_live29matrix_number = _GLF_FUZZED(125576u);
                    int GLF_live29rows = _GLF_FUZZED(4149);
                    {
                        int GLF_live29looplimiter1 = 0;
                        {
                            int GLF_live36looplimiter0 = 0;
                            if (GLF_live36looplimiter0 >= 7) {
                                ;
                            }
                        }
                        for (int GLF_live29c = 0; GLF_live29c < GLF_live29cols; GLF_live29c++) {
                            if (GLF_live29looplimiter1 >= 4) {
                                break;
                            }
                            GLF_live29looplimiter1++;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                do {
                                    if (GLF_dead11gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 4)] >= 1.0) {
                                        GLF_dead11gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 4)] = GLF_dead11gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 4)] * GLF_dead11gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 4)];
                                    }
                                    GLF_live9treeIndex++;
                                } while (GLF_live9treeIndex < findMSB(findLSB(GLF_live29cols)));
                                {
                                    int GLF_live37i = _GLF_FUZZED((+(-89789)));
                                    vec2 GLF_live37pos = _GLF_FUZZED(vec2(-5.3, 7429.2675));
                                    vec4 GLF_live37res = _GLF_FUZZED((true ? vec4(-531.952, 57.66, -54.39, 6916.8194) : vec4(306.324, -6.0, -62.50, 60.43)));
                                    if (GLF_live37collision(GLF_live37pos, GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)])) {
                                        GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
                                    }
                                }
                            }
                            {
                                {
                                    int GLF_live29looplimiter0 = 0;
                                    for (int GLF_live29r = 0; GLF_live29r < GLF_live29rows; GLF_live29r++) {
                                        if (GLF_live29looplimiter0 >= 4) {
                                            break;
                                        }
                                        GLF_live29looplimiter0++;
                                        {
                                            switch (GLF_live29matrix_number) {
                                                case 0u:
                                                    GLF_live29m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                                    break;
                                                case 1u:
                                                    GLF_live29m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                                    break;
                                                case 2u:
                                                    GLF_live29m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                                    break;
                                                case 3u:
                                                    GLF_live29m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                                    break;
                                                case 4u:
                                                    GLF_live29m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                                    break;
                                                case 5u:
                                                    GLF_live29m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                                    break;
                                                case 6u:
                                                    GLF_live29m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 2)] = GLF_live29one;
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(GLF_dead22injectionSwitch);
                                                        if (donor_replacementGLF_dead32coord.x < 1.0 && donor_replacementGLF_dead32coord.y < 1.0) {
                                                            GLF_live10gl_FragCoord = texture(GLF_dead32tex, donor_replacementGLF_dead32coord);
                                                        }
                                                    }
                                                case 7u:
                                                    GLF_live29m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 3)] = GLF_live29one;
                                                    break;
                                                case 8u:
                                                    GLF_live29m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live29c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live29r, 4)] = GLF_live29one;
                                                    break;
                                                    {
                                                        int GLF_live39i = _GLF_FUZZED(15642);
                                                        int GLF_live39j = _GLF_FUZZED(59538);
                                                        uint GLF_live39uselessOutVariable = _GLF_FUZZED((uint(false) | uvec3(96745u, 13238u, 162192u)).y);
                                                        if (uint(GLF_live39j) < uaddCarry(uint(GLF_live39i), 1u, GLF_live39uselessOutVariable)) {
                                                            ;
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
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead22color = _GLF_FUZZED(GLF_dead1polynomial);
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec3 donor_replacementGLF_dead35vecCoor = _GLF_FUZZED(tanh(refract(GLF_dead1polynomial, GLF_dead1polynomial, -6.4)));
                        if (int(GLF_dead35gl_FragCoord[1]) < 270) {
                            pos = fract(sin(donor_replacementGLF_dead35vecCoor.yx - trunc(float(GLF_dead35data[7]))));
                            {
                                int GLF_live39i = _GLF_FUZZED(-33653);
                                int GLF_live39j = _GLF_FUZZED(ivec2(54194, -35454).r);
                                uint GLF_live39uselessOutVariable = _GLF_FUZZED(176368u);
                                if (uint(GLF_live39j) < uaddCarry(uint(GLF_live39i), 1u, GLF_live39uselessOutVariable)) {
                                    ;
                                }
                            }
                            pos.y *= mix(normalize(donor_replacementGLF_dead35vecCoor), normalize(vec3(pos, degrees(pos.x))), GLF_dead35injectionSwitch.x).y;
                            break;
                        } else {
                            discard;
                        }
                    }
                    vec2 GLF_live31coord = _GLF_FUZZED((vec2(3956.8230, -0.7) * (-5.1)));
                    vec4 GLF_live31res = _GLF_FUZZED(vec4(-2.5, -1.3, -6077.2857, 9521.0078));
                    {
                        GLF_live31res = texture(GLF_live31tex, GLF_live31coord);
                    }
                }
                do {
                    donor_replacementGLF_dead22color -= GLF_dead22palette(vec3(float(GLF_dead22obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead22injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead22injectionSwitch.x, 0.6, float(GLF_dead22obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead22injectionSwitch.x), 10)]) * 0.1));
                    GLF_live9baseIndex++;
                } while (GLF_live9baseIndex != GLF_dead22obj.numbers[2]);
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead16c_im = _GLF_FUZZED(inversesqrt(3.8));
                float donor_replacementGLF_dead16c_re = _GLF_FUZZED(73.50);
                int donor_replacementGLF_dead16iteration = _GLF_FUZZED((-GLF_live9treeIndex));
                float donor_replacementGLF_dead16x = _GLF_FUZZED(-720.270);
                float donor_replacementGLF_dead16y = _GLF_FUZZED(pow(length(faceforward(vec3(1.1, -0.2, 6594.3021), vec3(-692.502, 7985.9668, 4.2), GLF_dead1polynomial)), 6852.8808));
                {
                    int GLF_live24i = _GLF_FUZZED(-16122);
                    float GLF_live24ref = _GLF_FUZZED(-5.1);
                    {
                        vec2 GLF_live36coord = _GLF_FUZZED(vec2(9396.5681));
                        int GLF_live36i = _GLF_FUZZED(((-62022) | 11883));
                        int GLF_live36looplimiter0 = 0;
                        vec4 GLF_live36texel = _GLF_FUZZED(vec4(-7.6, 1.3, 327.800, 6756.8268));
                        {
                            if (GLF_live36looplimiter0 >= 7) {
                                ;
                            }
                            GLF_live36looplimiter0++;
                            {
                                GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                GLF_live36i++;
                            }
                        }
                    }
                    float GLF_live24s = _GLF_FUZZED(vec2(-4281.4297, 35.88).g);
                    if (mod(float(GLF_live24i), GLF_live24ref) <= 0.01) {
                        GLF_live24s += 0.2;
                    }
                }
                for (int GLF_dead16k = 0; GLF_dead16k < 1000; GLF_dead16k++) {
                    if (donor_replacementGLF_dead16x * donor_replacementGLF_dead16x + donor_replacementGLF_dead16y * donor_replacementGLF_dead16y > 4.0) {
                        break;
                    }
                    float GLF_dead16x_new = donor_replacementGLF_dead16x * donor_replacementGLF_dead16x - donor_replacementGLF_dead16y * donor_replacementGLF_dead16y + donor_replacementGLF_dead16c_re;
                    {
                        {
                            ;
                        }
                    }
                    donor_replacementGLF_dead16y = 2.0 * donor_replacementGLF_dead16x * donor_replacementGLF_dead16y + donor_replacementGLF_dead16c_im;
                    donor_replacementGLF_dead16x = GLF_dead16x_new;
                    donor_replacementGLF_dead16iteration++;
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
        vec4 GLF_live24c = _GLF_FUZZED((mat4(9194.1203, 678.990, -614.383, 0.1, 4.2, 85.17, 67.64, -5.3, 9.3, 12.88, 772.206, -676.819, -6.7, -0.5, -143.982, 2186.3247) * vec4(50.15, -2.4, vec2(-6.6, -1.1))));
        int GLF_live24i = _GLF_FUZZED(-55531);
        if (GLF_live24c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 4)] >= 1.0) {
            GLF_live24c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 4)] = GLF_live24c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 4)] * GLF_live24c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 4)];
        }
    }
    {
        int GLF_live13i = _GLF_FUZZED(-28960);
        int GLF_live13iters = _GLF_FUZZED(-63099);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
            {
                vec2 GLF_live36coord = _GLF_FUZZED(vec2(-2.4, -1.6));
                int GLF_live36i = _GLF_FUZZED((70715 ^ (-76413)));
                vec4 GLF_live36texel = _GLF_FUZZED(vec4(527.649, 13.93, 9.0, -524.562));
                {
                    int GLF_live36looplimiter0 = 0;
                    while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                        if (GLF_live36looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live36looplimiter0++;
                        {
                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                            GLF_live36i++;
                        }
                    }
                }
            }
            vec4 donor_replacementGLF_dead32res = _GLF_FUZZED((GLF_live29m24 * GLF_dead17resolution));
            if (pos.x < 1.0 && pos.y < 1.0) {
                donor_replacementGLF_dead32res = texture(GLF_dead32tex, pos);
            }
        }
        {
            int GLF_live30d = _GLF_FUZZED(24097);
            ivec2 GLF_live30p = _GLF_FUZZED(ivec2(ivec4(87669, 86377, 94199, 93521)));
            {
                GLF_live30d--;
                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 1) + (GLF_live30p.y) * 16, 256)] = 1;
                GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x - 2) + (GLF_live30p.y) * 16, 256)] = 1;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    int donor_replacementGLF_dead33i = _GLF_FUZZED(GLF_live13iters);
                    {
                        int GLF_live38baseIndex = _GLF_FUZZED((5022));
                        {
                            GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex;
                            ;
                        }
                    }
                    float donor_replacementGLF_dead33ref = _GLF_FUZZED(dFdyFine(dot(resolution, GLF_dead17resolution)));
                    float donor_replacementGLF_dead33s = _GLF_FUZZED(GLF_dead1polynomial[0]);
                    if (mod(float(donor_replacementGLF_dead33i), donor_replacementGLF_dead33ref) <= 0.01) {
                        donor_replacementGLF_dead33s += 0.2;
                    }
                }
                GLF_live30p.x -= 2;
            }
        }
        int GLF_live13looplimiter0 = 0;
        {
            int GLF_live37i = _GLF_FUZZED(-16324);
            vec4 GLF_live37res = _GLF_FUZZED(((((-30.29) + (-2.9))) + vec4(-4.3, 3.0, -7.1, -19.03)));
            {
                GLF_live37res = GLF_live37pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].x) * int(GLF_live37picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live37i, 8)].y) + GLF_live37i * 9 + 11) % 16, 16)];
            }
        }
        int GLF_live13v = _GLF_FUZZED(((30949 ^ (-29623)) + 41044));
        for (GLF_live13i = 0; GLF_live13i < GLF_live13iters; GLF_live13i++) {
            {
                vec2 GLF_live36coord = _GLF_FUZZED((vec2(-58.31, 5.4) - vec2(-96.72, 3508.5080)));
                int GLF_live36i = _GLF_FUZZED(((-34606) ^ (~(-95731))));
                vec4 GLF_live36texel = _GLF_FUZZED(((vec2(946.539, -714.913) * mat4x2(7549.1718, -34.15, -7837.7409, 9.0, 5.9, -3957.0636, -6.7, 9.1))));
                {
                    int GLF_live36looplimiter0 = 0;
                    while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                        if (GLF_live36looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live36looplimiter0++;
                        {
                            GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                            GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                            GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                            GLF_live36i++;
                        }
                    }
                }
            }
            if (GLF_live13looplimiter0 >= 7) {
                {
                    vec2 GLF_live36coord = _GLF_FUZZED(vec2(-8.5, -59.03));
                    int GLF_live36i = _GLF_FUZZED(72697);
                    vec4 GLF_live36texel = _GLF_FUZZED(vec4(-34.52));
                    {
                        int GLF_live36looplimiter0 = 0;
                        while (GLF_live36texel.x + GLF_live36texel.y + GLF_live36texel.z > 1.0 && GLF_live36i < 16) {
                            if (GLF_live36looplimiter0 >= 7) {
                                break;
                            }
                            GLF_live36looplimiter0++;
                            {
                                GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                                GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                                GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                                GLF_live36i++;
                            }
                        }
                    }
                }
                break;
            }
            GLF_live13looplimiter0++;
            {
                GLF_live13v = (4 * GLF_live13v * (1000 - GLF_live13v)) / 1000;
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead21th = _GLF_FUZZED(smoothstep(-6.8, 8.0, tan(-7.8)));
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead33i = _GLF_FUZZED(GLF_live13i);
                        float donor_replacementGLF_dead33limit = _GLF_FUZZED(3.5);
                        float donor_replacementGLF_dead33ref = _GLF_FUZZED(pow(GLF_live29one, GLF_live29one));
                        {
                            if (mod(float(donor_replacementGLF_dead33i), donor_replacementGLF_dead33ref) <= 0.01) {
                                donor_replacementGLF_dead21th += 0.2;
                            }
                            if (float(donor_replacementGLF_dead33i) >= donor_replacementGLF_dead33limit) {
                                ;
                            }
                            {
                                int GLF_live38baseIndex = _GLF_FUZZED((~(-27419)));
                                int GLF_live38data = _GLF_FUZZED((+96517));
                                int GLF_live38looplimiter0 = 0;
                                int GLF_live38treeIndex = _GLF_FUZZED(28357);
                                {
                                    if (GLF_live38looplimiter0 >= 3) {
                                        ;
                                    }
                                    GLF_live38looplimiter0++;
                                    {
                                        if (GLF_live38data <= GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].data) {
                                            if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex == -1) {
                                                GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex = GLF_live38treeIndex;
                                                GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                                ;
                                            } else {
                                                GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex;
                                                ;
                                            }
                                        } else {
                                            if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex == -1) {
                                                GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex = GLF_live38treeIndex;
                                                GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                                ;
                                            } else {
                                                GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex;
                                                ;
                                            }
                                        }
                                    }
                                }
                            }
                            donor_replacementGLF_dead33i++;
                        }
                    }
                    vec2 donor_replacementGLF_dead21v = _GLF_FUZZED(fwidth(fwidthCoarse(pos)));
                    if (donor_replacementGLF_dead21v.x < 0.0) {
                        donor_replacementGLF_dead21th = 1.0 - donor_replacementGLF_dead21th;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(normalize(smoothstep(-5.4, GLF_live29one, resolution)));
                {
                    if (donor_replacementGLF_dead32coord.x > 1.0)
                        donor_replacementGLF_dead32coord.x -= 1.0;
                    if (donor_replacementGLF_dead32coord.y > 1.0)
                        donor_replacementGLF_dead32coord.y -= 1.0;
                    donor_replacementGLF_dead32coord *= 2.0;
                    GLF_live13v++;
                }
            }
            {
                {
                    vec2 GLF_live36coord = _GLF_FUZZED(vec2(8.8, -2.2));
                    int GLF_live36i = _GLF_FUZZED(-6979);
                    vec4 GLF_live36texel = _GLF_FUZZED(vec4(-226.479, 2.6, -1330.2320, -537.820));
                    {
                        GLF_live36coord = GLF_live36texel.xz + GLF_live36texel.yy;
                        GLF_live36coord = floor(GLF_live36coord * 256.0) / 256.0;
                        GLF_live36texel = texture(GLF_live36tex, GLF_live36coord);
                        GLF_live36i++;
                    }
                }
                vec4 GLF_live24c = _GLF_FUZZED(vec4(3341.4987, 1.5, -35.14, 3723.1747));
                int GLF_live24i = _GLF_FUZZED((true ? 82941 : (-7217)));
                int GLF_live24msb8 = _GLF_FUZZED((+(-37491)));
                {
                    {
                        vec2 GLF_live31coord = _GLF_FUZZED(vec2(3544.5236, 7.7));
                        if (GLF_live31coord.x > 1.0)
                            GLF_live31coord.x -= 1.0;
                    }
                    int GLF_live24looplimiter1 = 0;
                    {
                        int GLF_live30d = _GLF_FUZZED(68824);
                        ivec2 GLF_live30p = _GLF_FUZZED(ivec2(15908, 71427));
                        {
                            GLF_live30d--;
                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x) + (GLF_live30p.y) * 16, 256)] = 1;
                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 1) + (GLF_live30p.y) * 16, 256)] = 1;
                            GLF_live30map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live30p.x + 2) + (GLF_live30p.y) * 16, 256)] = 1;
                            GLF_live30p.x += 2;
                        }
                    }
                    do {
                        if (GLF_live24looplimiter1 >= 5) {
                            {
                                int GLF_live36looplimiter0 = 0;
                                if (GLF_live36looplimiter0 >= 7) {
                                    ;
                                }
                            }
                            break;
                        }
                        GLF_live24looplimiter1++;
                        {
                            {
                                {
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    ;
                                    {
                                        int GLF_live38baseIndex = _GLF_FUZZED(-79669);
                                        int GLF_live38data = _GLF_FUZZED(((((-74942) - (-46535)) & int(true)) * ((-46484) + (78782 * (-97614)))));
                                        int GLF_live38treeIndex = _GLF_FUZZED(((-30515) * (-77319)));
                                        {
                                            if (GLF_live38data <= GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].data) {
                                                if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex == -1) {
                                                    GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex = GLF_live38treeIndex;
                                                    GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                                    ;
                                                } else {
                                                    GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].leftIndex;
                                                    ;
                                                }
                                            } else {
                                                if (GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex == -1) {
                                                    GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex = GLF_live38treeIndex;
                                                    GLF_live38makeTreeNode(GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38treeIndex, 10)], GLF_live38data);
                                                    ;
                                                } else {
                                                    GLF_live38baseIndex = GLF_live38tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live38baseIndex, 10)].rightIndex;
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                }
                                {
                                    int GLF_live36looplimiter0 = 0;
                                    if (GLF_live36looplimiter0 >= 7) {
                                        ;
                                    }
                                }
                            }
                            if (GLF_live24c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 4)] >= 1.0) {
                                GLF_live24c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 4)] = GLF_live24c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 4)] * GLF_live24c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 4)];
                            }
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead32coord = _GLF_FUZZED(GLF_live15injectionSwitch.ss);
                                {
                                    GLF_live26_GLF_color = texture(GLF_dead32tex, donor_replacementGLF_dead32coord);
                                }
                            }
                            GLF_live24i++;
                        }
                    } while (GLF_live24i < findMSB(findLSB(GLF_live24msb8)));
                }
            }
        }
    }
    {
        int GLF_live38sum = _GLF_FUZZED(4486);
        {
            int GLF_live38looplimiter2 = 0;
            for (int GLF_live38target = 0; GLF_live38target < 20; GLF_live38target++) {
                if (GLF_live38looplimiter2 >= 3) {
                    break;
                }
                GLF_live38looplimiter2++;
                {
                    int GLF_live38result = GLF_live38search(GLF_live38target);
                    if (GLF_live38result > 0) {
                        GLF_live38sum += GLF_live38result;
                    } else {
                        switch (GLF_live38result) {
                            case -1:
                                GLF_live38sum += 1;
                                break;
                            case 0:
                                ;
                        }
                    }
                }
            }
        }
    }
    ivec2 ipos = ivec2(int(pos.x * 256.0), int(pos.y * 256.0));
    _GLF_color = trace(ipos);
}
