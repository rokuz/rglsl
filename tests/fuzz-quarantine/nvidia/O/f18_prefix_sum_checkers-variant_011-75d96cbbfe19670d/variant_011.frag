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
            if (GLF_live23looplimiter1 >= 4) {
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

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live21resolution;
};

layout(set = 0, binding = 3) uniform sampler2D GLF_live22tex;
vec4 GLF_live19gl_FragCoord = _GLF_FUZZED(((mat4(9831.9244, 6.7, -3.8, -7.0, 871.195, -7274.7491, 79.37, 7309.0210, 670.744, -9.7, -91.19, -5.4, -9813.1851, -0.6, 982.243, -5.5) * vec4(-86.58, -575.999, -194.311, -4.9)) - vec4(4.2, 50.91, 49.95, -7649.3026)));
const int GLF_live19N = 10;
int GLF_live19data[10] = int[10](_GLF_FUZZED(ivec3(-25477, -56291, 15160).y), _GLF_FUZZED(10079), _GLF_FUZZED(65284), _GLF_FUZZED(-30640), _GLF_FUZZED(ivec2(38595, -64249).t), _GLF_FUZZED(4087), _GLF_FUZZED((16159)), _GLF_FUZZED((~53032)), _GLF_FUZZED((-89713)), _GLF_FUZZED(((-63401) & 55011))), GLF_live19temp[10] = int[10](_GLF_FUZZED(((-17273) - (4941 * 30043))), _GLF_FUZZED((+(85206 - (-31576)))), _GLF_FUZZED(13073), _GLF_FUZZED((35988 + (-37215))), _GLF_FUZZED(3560), _GLF_FUZZED(60043), _GLF_FUZZED(78046), _GLF_FUZZED(12816), _GLF_FUZZED(81779), _GLF_FUZZED((-int(160908u))));

void GLF_live19merge(int GLF_live19from, int GLF_live19mid, int GLF_live19to) {
    int GLF_live19k = GLF_live19from, GLF_live19i = GLF_live19from, GLF_live19j = GLF_live19mid + 1;
    {
        int GLF_live19looplimiter0 = 0;
        {
            int GLF_live21iterationCap = _GLF_FUZZED(33926);
            {
                GLF_live21iterationCap += 1;
            }
        }
        do {
            for (int _injected_loop_counter = (0 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    while (GLF_live19i <= GLF_live19mid && GLF_live19j <= GLF_live19to) {
                        if (GLF_live19looplimiter0 >= 3) {
                            break;
                        }
                        do {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            } else {
                                GLF_live19looplimiter0++;
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0)))));
                        {
                            {
                                {
                                    ;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            } else {
                                if (GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] < GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)]) {
                                    GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i++, 10)];
                                } else {
                                    GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j++, 10)];
                                }
                            }
                        }
                    }
                } else {
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    {
        int GLF_live19looplimiter1 = 0;
        while (GLF_live19i < GLF_live19N && GLF_live19i <= GLF_live19mid) {
            if (GLF_live19looplimiter1 >= 3) {
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
            if (GLF_live19looplimiter2 >= 3) {
                break;
            }
            GLF_live19looplimiter2++;
            {
                GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)];
            }
        }
    }
}

layout(set = 0, binding = 4) uniform sampler2D GLF_live18tex;
vec4 GLF_live16_GLF_color = _GLF_FUZZED(vec4(-8.8, vec3(-9.3, 3.3, 3.1)));

float GLF_live16cross2d(vec2 GLF_live16a, vec2 GLF_live16b) {
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        return ((GLF_live16a.x) * (GLF_live16b.y) - (GLF_live16b.x) * (GLF_live16a.y));
    }
}

int GLF_live16pointInTriangle(vec2 GLF_live16p, vec2 GLF_live16a, vec2 GLF_live16b, vec2 GLF_live16c) {
    float GLF_live16pab = GLF_live16cross2d(vec2(GLF_live16p.x - GLF_live16a.x, GLF_live16p.y - GLF_live16a.y), vec2(GLF_live16b.x - GLF_live16a.x, GLF_live16b.y - GLF_live16a.y));
    float GLF_live16pbc = GLF_live16cross2d(vec2(GLF_live16p.x - GLF_live16b.x, GLF_live16p.y - GLF_live16b.y), vec2(GLF_live16c.x - GLF_live16b.x, GLF_live16c.y - GLF_live16b.y));
    if (!((GLF_live16pab < 0.0 && GLF_live16pbc < 0.0) || (GLF_live16pab >= 0.0 && GLF_live16pbc >= 0.0))) {
        return 0;
    }
    float GLF_live16pca = GLF_live16cross2d(vec2(GLF_live16p.x - GLF_live16c.x, GLF_live16p.y - GLF_live16c.y), vec2(GLF_live16a.x - GLF_live16c.x, GLF_live16a.y - GLF_live16c.y));
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (!((GLF_live16pab < 0.0 && GLF_live16pca < 0.0) || (GLF_live16pab >= 0.0 && GLF_live16pca >= 0.0))) {
            return 0;
        }
    }
    return 1;
}

vec4 GLF_live12_GLF_color = _GLF_FUZZED(vec4(-2.3, -9627.8378, (vec2(2.0, -8.1) * mat2(82.29, -6583.0326, 532.125, -4386.5116))));

struct GLF_live12BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live12BST GLF_live12tree[10] = GLF_live12BST[10](GLF_live12BST(0, 0, 0), GLF_live12BST(0, 0, 0), GLF_live12BST(0, 0, 0), GLF_live12BST(0, 0, 0), GLF_live12BST(0, 0, 0), GLF_live12BST(0, 0, 0), GLF_live12BST(0, 0, 0), GLF_live12BST(0, 0, 0), GLF_live12BST(0, 0, 0), GLF_live12BST(0, 0, 0));

void GLF_live12makeTreeNode(inout GLF_live12BST GLF_live12tree, int GLF_live12data) {
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            GLF_live12tree.data = GLF_live12data;
        }
    }
    GLF_live12tree.leftIndex = -1;
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            GLF_live12tree.rightIndex = -1;
        }
    } else {
    }
}

int GLF_live12search(int GLF_live12target) {
    GLF_live12BST GLF_live12currentNode = GLF_live12BST(0, 0, 0);
    int GLF_live12index = 0;
    {
        int GLF_live12looplimiter1 = 0;
        while (GLF_live12index != -1) {
            if (GLF_live12looplimiter1 >= 5) {
                break;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                GLF_live12looplimiter1++;
            } else {
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    {
                        GLF_live16_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                    }
                    {
                        {
                            ;
                        }
                    }
                }
                GLF_live12currentNode = GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12index, 10)];
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (GLF_live12currentNode.data == GLF_live12target) {
                            return GLF_live12target;
                            {
                                vec2 GLF_live18coord = _GLF_FUZZED(vec2(-1.4, -5280.7107));
                                float GLF_live18h = _GLF_FUZZED(44.38);
                                int GLF_live18i = _GLF_FUZZED(-3533);
                                float GLF_live18refh = _GLF_FUZZED(-9.6);
                                {
                                    float GLF_live21x = _GLF_FUZZED(5.0);
                                    float GLF_live21y = _GLF_FUZZED((4.4 - 4.9));
                                    if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 4.0) {
                                        ;
                                    }
                                }
                                float GLF_live18slope = _GLF_FUZZED(vec4(-376.540, 8989.5978, -7200.8873, 340.546).a);
                                vec2 GLF_live18uvstep = _GLF_FUZZED(vec2(73.30, -9947.9236));
                                {
                                    GLF_live18coord -= GLF_live18uvstep;
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                        GLF_live18refh += GLF_live18slope;
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        GLF_live18h = texture(GLF_live18tex, GLF_live18coord).y;
                                    }
                                    GLF_live18i++;
                                }
                            }
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    GLF_live12index = GLF_live12target > GLF_live12currentNode.data ? GLF_live12currentNode.rightIndex : GLF_live12currentNode.leftIndex;
                }
            } else {
            }
        }
    }
    return -1;
}

struct GLF_live9BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live9BST GLF_live9tree[10] = GLF_live9BST[10](GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0));

void GLF_live9makeTreeNode(inout GLF_live9BST GLF_live9tree, int GLF_live9data) {
    do {
        GLF_live9tree.data = GLF_live9data;
    } while (_GLF_WRAPPED_LOOP(false));
    GLF_live9tree.leftIndex = -1;
    GLF_live9tree.rightIndex = -1;
}

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_live11injectionSwitch;
};

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_live10resolution;
};

float GLF_live10b_b = _GLF_FUZZED(((vec2(0.2, 3.5) == vec2(-5.3, 4648.2050)) ? 9958.8257 : (-430.306)));
int GLF_live7data[10] = int[10](_GLF_FUZZED(int(133033u)), _GLF_FUZZED(((-76168) ^ (83629 | (-95161)))), _GLF_FUZZED(((-58078) * 1967)), _GLF_FUZZED(54243), _GLF_FUZZED((39481)), _GLF_FUZZED(-45263), _GLF_FUZZED(((-15427) + (ivec2(84929, -26177) * ivec2(52519, -39178))).x), _GLF_FUZZED((-2519)), _GLF_FUZZED(int((99945u * 21249u))), _GLF_FUZZED((+(-68540)))), GLF_live7temp[10] = int[10](_GLF_FUZZED(-33006), _GLF_FUZZED(((-52947) - 88234)), _GLF_FUZZED(((ivec4(18792, -19250, 63688, -80194) & (-29819)) - (-59760)).q), _GLF_FUZZED(((-27280) ^ (-50009))), _GLF_FUZZED((~(-58451))), _GLF_FUZZED(ivec4(43029, 14292, 63220, 8547).s), _GLF_FUZZED(ivec3(-7655, -48172, -62116).p), _GLF_FUZZED((86603 ^ 82212)), _GLF_FUZZED((+37950)), _GLF_FUZZED(64288));
vec4 GLF_live6_GLF_color = _GLF_FUZZED(vec4(5.0, 7.5, 6.3, 5.9));
int GLF_live6map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

vec2 pattern(in vec2 x) {
    vec2 n = floor(x);
    {
        int GLF_live6i = _GLF_FUZZED(-30538);
        int GLF_live6looplimiter0 = 0;
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        } else {
            {
                int GLF_live21iterationCap = _GLF_FUZZED(60494);
                if (0.0 > GLF_live21resolution.y) {
                    GLF_live21iterationCap += 1;
                }
            }
            if (GLF_live6looplimiter0 >= 4) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        ;
                    }
                    {
                        float GLF_live19grey = _GLF_FUZZED(vec4(-69.78, -42.56, -59.48, -6.1).p);
                        {
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                GLF_live19grey = 0.5 + float(GLF_live19data[2]) / 10.0;
                            }
                        }
                    }
                } else {
                }
            }
            GLF_live6looplimiter0++;
            {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 256)] = 0;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (mat2x4(mat3x2(-4352.1220, 986.997, -5237.6379, 1034.2012, 5.9, 6.9)), (GLF_live16_GLF_color * mat4(-44.67, 4.2, -9.9, -5.0, 0.8, 0.5, -354.805, 19.91, -9782.0942, -3.6, 4.6, -7.8, -6603.1911, -87.68, -28.88, -92.46)));
                    }
                }
            }
        }
    }
    vec3 m = vec3(1.0);
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        int GLF_live2looplimiter0 = 0;
        {
            int GLF_live7i = _GLF_FUZZED(ivec4(98530, 42971, -78560, -75812).xy.s);
            {
                vec2 GLF_live22coord = _GLF_FUZZED((-vec2(-7.6, 8694.2810)));
                if (GLF_live22coord.x > 1.0)
                    GLF_live22coord.x -= 1.0;
            }
            {
                {
                    {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = max(GLF_live12_GLF_color, tan(-8.5));
                            }
                            _GLF_color = fwidthFine(intBitsToFloat(ivec4(-11484, -45323, 98295, 61921)));
                        }
                        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            {
                                int GLF_live23baseIndex = _GLF_FUZZED(16884);
                                int GLF_live23data = _GLF_FUZZED((+(-45439)));
                                int GLF_live23treeIndex = _GLF_FUZZED(((false ? 24833 : (-19167)) - (-57150)));
                                {
                                    if (GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex == -1) {
                                        GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex = GLF_live23treeIndex;
                                        GLF_live23makeTreeNode(GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23treeIndex, 10)], GLF_live23data);
                                        ;
                                    } else {
                                        GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex;
                                        ;
                                    }
                                }
                            }
                            ;
                        }
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED((mat3x2(47.27, -3.1, 96.82, -45.70, 6.5, -6.6) * vec3(-29.43, 3.0, 703.313)));
                            vec4 GLF_live22res = _GLF_FUZZED(vec4(3608.2377, (-vec3(-929.131, -830.009, 4800.3784))));
                            {
                                GLF_live22res = texture(GLF_live22tex, GLF_live22coord);
                            }
                        }
                    }
                }
                int GLF_live7looplimiter5 = 0;
                do {
                    if (GLF_live7looplimiter5 >= 3) {
                        break;
                    }
                    {
                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(5324.7796, -47.17));
                        vec4 GLF_live22res = _GLF_FUZZED((mat2x4(-3.9, -61.09, -89.13, -8923.9232, -958.517, -8.9, 122.077, 41.34) * vec2(-0.7, 217.542)));
                        {
                            GLF_live22res = texture(GLF_live22tex, GLF_live22coord);
                        }
                    }
                    do {
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(false)) {
                                    {
                                        int GLF_live23looplimiter0 = 0;
                                        if (GLF_live23looplimiter0 >= 4) {
                                            ;
                                        }
                                    }
                                    _GLF_color = vec4(-98.21, 57.98, 3936.7451, 1.3);
                                }
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    {
                        {
                            ;
                        }
                    }
                    GLF_live7looplimiter5++;
                    {
                        int GLF_live19i = _GLF_FUZZED((89214 & 15700));
                        int GLF_live19j = _GLF_FUZZED(-83724);
                        int GLF_live19k = _GLF_FUZZED((+(-30606)));
                        int GLF_live19looplimiter0 = 0;
                        int GLF_live19mid = _GLF_FUZZED((-(-66141)));
                        int GLF_live19to = _GLF_FUZZED(28998);
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = uintBitsToFloat((186536u * uvec4(67058u, 106230u, 66306u, 32716u)));
                            }
                            while (GLF_live19i <= GLF_live19mid && GLF_live19j <= GLF_live19to) {
                                if (GLF_live19looplimiter0 >= 3) {
                                    break;
                                    {
                                        int GLF_live21iteration = _GLF_FUZZED(-74874);
                                        {
                                            ;
                                        }
                                    }
                                }
                                GLF_live19looplimiter0++;
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    if (GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] < GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)]) {
                                        GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i++, 10)];
                                    } else {
                                        do {
                                            GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j++, 10)];
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                    }
                                } else {
                                }
                            }
                        }
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), 0 | (int(1)))))); _injected_loop_counter++) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            int GLF_live10msb8 = _GLF_FUZZED(ivec4(53308, 77454, 21737, -42247).q);
                            vec2 GLF_live10position = _GLF_FUZZED(vec3(0.9, -32.90, 936.356).ps);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (vec3(-170.211, -8.6, 2560.4233) * mat4x3(692.679, 368.735, -829.383, 0.6, 8.8, -4840.3028, 64.84, 1987.3267, 3.8, 50.55, 8.8, 1.3));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = dFdxCoarse(resolution.yxxy);
                                }
                                if (abs(GLF_live10position.y - GLF_live10position.x) < 0.5) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_live6_GLF_color;
                                        {
                                            vec2 GLF_live22coord = _GLF_FUZZED((vec2(-1.4, 838.659) + (vec2(2297.1606, 955.211) * vec2(-0.0, 2.5))));
                                            int GLF_live22i = _GLF_FUZZED(79878);
                                            int GLF_live22looplimiter0 = 0;
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
                                    }
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (_GLF_IDENTITY(false, !(!(false))))))) {
                                        _GLF_color = GLF_live12_GLF_color;
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        {
                                            int GLF_live22looplimiter0 = 0;
                                            if (GLF_live22looplimiter0 >= 3) {
                                                ;
                                            }
                                        }
                                        int GLF_live12count = _GLF_FUZZED((+(-42698)));
                                        int GLF_live12looplimiter2 = 0;
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), (int(5)) | (0 << _GLF_IDENTITY(int(6), int(6)))))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 | 0)); _injected_loop_counter++) {
                                                for (int GLF_live12i = 0; GLF_live12i < 20; GLF_live12i++) {
                                                    if (GLF_live12looplimiter2 >= 5) {
                                                        break;
                                                        {
                                                            int GLF_live23target = _GLF_FUZZED(42637);
                                                            {
                                                                ;
                                                            }
                                                        }
                                                    }
                                                    GLF_live12looplimiter2++;
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                        int GLF_live12result = GLF_live12search(GLF_live12i);
                                                        switch (GLF_live12i) {
                                                            case 9:
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    {
                                                                        ;
                                                                    }
                                                                } else {
                                                                }
                                                            case 5:
                                                            case 12:
                                                                do {
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = dFdxFine(GLF_live16_GLF_color);
                                                                        {
                                                                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(5.7, 0.3));
                                                                            int GLF_live22i = _GLF_FUZZED(-58736);
                                                                            int GLF_live22looplimiter0 = 0;
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
                                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                        _GLF_color = sign(GLF_live6_GLF_color);
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                            case 15:
                                                            case 7:
                                                            case 8:
                                                            case 2:
                                                            case 6:
                                                            case 17:
                                                            case 13:
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                    if (GLF_live12result == GLF_live12i) {
                                                                        GLF_live12count++;
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            _GLF_color = atan(GLF_live16_GLF_color);
                                                                        }
                                                                    }
                                                                } else {
                                                                }
                                                                break;
                                                            default:
                                                                if (GLF_live12result == -1) {
                                                                    GLF_live12count++;
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    _GLF_color = (GLF_live10b_b * GLF_live6_GLF_color);
                                                                }
                                                                break;
                                                        }
                                                        {
                                                            int GLF_live17looplimiter1 = 0;
                                                            if (GLF_live17looplimiter1 >= 6) {
                                                                ;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                        }
                                    }
                                    GLF_live10b_b = clamp(float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0)), float(bitCount(GLF_live10msb8)), GLF_live10b_b * float(bitCount(GLF_live10msb8)) * 3.0);
                                }
                            } else {
                            }
                        } else {
                        }
                        {
                            int GLF_live12baseIndex = _GLF_FUZZED(51241);
                            int GLF_live12data = _GLF_FUZZED(-14013);
                            int GLF_live12treeIndex = _GLF_FUZZED(38890);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = ldexp(GLF_live12_GLF_color, ivec4(-4769, 94333, -994, 54193));
                            }
                            do {
                                GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].rightIndex = GLF_live12treeIndex;
                                GLF_live12makeTreeNode(GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12treeIndex, 10)], GLF_live12data);
                                ;
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                        }
                        switch (GLF_live7i) {
                            case 0:
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    do {
                                        {
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > ((GLF_live19N) & 0)); _injected_loop_counter--) {
                                                ;
                                            }
                                        }
                                        do {
                                            {
                                                float GLF_live21x = _GLF_FUZZED(2.0);
                                                float GLF_live21y = _GLF_FUZZED(float(false));
                                                {
                                                    GLF_live21x = 1.0;
                                                    GLF_live21y = 1.0;
                                                }
                                            }
                                            GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = 4;
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                                break;
                            case 1:
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                } else {
                                    GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = 3;
                                }
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            ;
                                        }
                                    }
                                }
                                break;
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    int GLF_live11looplimiter2 = 0;
                                    vec3 GLF_live11m = _GLF_FUZZED((vec3(-9081.8974, -3114.5919, -28.86) * (-1.0)));
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                            _GLF_color = dFdyCoarse(GLF_live6_GLF_color);
                                        } else {
                                        }
                                    }
                                    vec2 GLF_live11n = _GLF_FUZZED(vec4(-117.422, -6.8, -2401.1547, 413.826).qs);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        {
                                            GLF_live16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        }
                                    } else {
                                    }
                                    for (int GLF_live11j = -1; GLF_live11j <= int(GLF_live11injectionSwitch.y); GLF_live11j++) {
                                        if (GLF_live11looplimiter2 >= 6) {
                                            break;
                                        }
                                        GLF_live11looplimiter2++;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(6.0, 5.6, 2.7, 2.4);
                                        }
                                        {
                                            {
                                                int GLF_live15i = _GLF_FUZZED(-19229);
                                                float GLF_live15result = _GLF_FUZZED((9251.7223 * (-0.7)));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    {
                                                        GLF_live16_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                                    }
                                                } else {
                                                }
                                                float GLF_live15thirty_two = _GLF_FUZZED(-4.8);
                                                if ((GLF_live15i % 32) == 0) {
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                        GLF_live15result += 0.4;
                                                        {
                                                            {
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_color;
                                                                    } else {
                                                                    }
                                                                }
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                    ;
                                                                } else {
                                                                }
                                                                {
                                                                    int GLF_live23baseIndex = _GLF_FUZZED((true ? 93794 : ivec4(23945, -30923, 22819, 36551).w));
                                                                    {
                                                                        GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex;
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                    }
                                                } else {
                                                    if (mod(float(GLF_live15i), round(GLF_live15thirty_two)) <= 0.01) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        GLF_live15result += 100.0;
                                                    }
                                                    {
                                                        int GLF_live20looplimiter0 = 0;
                                                        if (GLF_live20looplimiter0 >= 3) {
                                                            ;
                                                        }
                                                    }
                                                    {
                                                        float GLF_live19grey = _GLF_FUZZED(-49.37);
                                                        {
                                                            if (int(GLF_live19gl_FragCoord[1]) < 180) {
                                                                GLF_live19grey = 0.5 + float(GLF_live19data[5]) / 10.0;
                                                            } else {
                                                                if (int(GLF_live19gl_FragCoord[1]) < 210) {
                                                                    GLF_live19grey = 0.5 + float(GLF_live19data[6]) / 10.0;
                                                                } else {
                                                                    {
                                                                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-591.322, -3058.1362));
                                                                        vec4 GLF_live22res = _GLF_FUZZED((vec4(0.8, -50.50, -8236.6370, -998.735) + 1.1));
                                                                        {
                                                                            GLF_live22res = texture(GLF_live22tex, GLF_live22coord);
                                                                            if (_GLF_DEAD(false)) {
                                                                                _GLF_color = GLF_live16_GLF_color;
                                                                            }
                                                                        }
                                                                    }
                                                                    if (int(GLF_live19gl_FragCoord[1]) < 240) {
                                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 ^ 0)); _injected_loop_counter++) {
                                                                            GLF_live19grey = 0.5 + float(GLF_live19data[7]) / 10.0;
                                                                        }
                                                                    } else {
                                                                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 ^ 0) | 1)); _injected_loop_counter++) {
                                                                            if (int(GLF_live19gl_FragCoord[1]) < 270) {
                                                                                GLF_live19grey = 0.5 + float(GLF_live19data[8]) / 10.0;
                                                                            } else {
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
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                {
                                                    int GLF_live18looplimiter0 = 0;
                                                    {
                                                        float GLF_live23v = _GLF_FUZZED(-857.527);
                                                        if (GLF_live23v < 1.5) {
                                                            ;
                                                        }
                                                    }
                                                    if (GLF_live18looplimiter0 >= 4) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = GLF_live6_GLF_color;
                                                        }
                                                        ;
                                                    }
                                                }
                                            } else {
                                                int GLF_live11looplimiter1 = 0;
                                                for (int GLF_live11i = -1; GLF_live11i <= int(GLF_live11injectionSwitch.y); GLF_live11i++) {
                                                    if (GLF_live11looplimiter1 >= 6) {
                                                        break;
                                                    }
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                        GLF_live11looplimiter1++;
                                                        {
                                                            int GLF_live21looplimiter3 = 0;
                                                            if (GLF_live21looplimiter3 >= 4) {
                                                                ;
                                                            }
                                                        }
                                                    }
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                        vec2 GLF_live11g = vec2(float(GLF_live11j), float(GLF_live11i));
                                                        vec2 GLF_live11o = mix(GLF_live11n, GLF_live11g, 0.2);
                                                        if (GLF_live11injectionSwitch.x < (GLF_live11m.x)) {
                                                            {
                                                                vec2 GLF_live22coord = _GLF_FUZZED((vec2(vec3(-5.0, 6.1, -177.290)) * (-548.765)));
                                                                if (GLF_live22coord.y > 1.0)
                                                                    GLF_live22coord.y -= 1.0;
                                                            }
                                                            int GLF_live11k = 1;
                                                            do {
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    int GLF_live11looplimiter0 = 0;
                                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                            while (GLF_live11k >= 0) {
                                                                                if (GLF_live11looplimiter0 >= 6) {
                                                                                    break;
                                                                                }
                                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                    {
                                                                                        ;
                                                                                    }
                                                                                }
                                                                                GLF_live11looplimiter0++;
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                    } else {
                                                                                        do {
                                                                                            int GLF_live15i = _GLF_FUZZED((((-74751) * (-16712)) - (90199 - 58600)));
                                                                                            float GLF_live15limit = _GLF_FUZZED(2.8);
                                                                                            float GLF_live15result = _GLF_FUZZED(float(true));
                                                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                                                                            } else {
                                                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                                                                                } else {
                                                                                                    if (float(GLF_live15i) >= GLF_live15limit) {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                                            ;
                                                                                                        } else {
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(1.0))))) {
                                                                                            GLF_live11o = GLF_live11o + GLF_live11o;
                                                                                        } else {
                                                                                        }
                                                                                        GLF_live11k--;
                                                                                    }
                                                                                } else {
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                } else {
                                                                }
                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                GLF_live11m = vec3(GLF_live11injectionSwitch.x, cos(GLF_live11o));
                                                            } else {
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            case 2:
                                do {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(0.0))))) {
                                        GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = 2;
                                    } else {
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                break;
                            case 3:
                                GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = 1;
                                break;
                            case 4:
                                GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = 0;
                                break;
                                {
                                    int GLF_live12baseIndex = _GLF_FUZZED(5634);
                                    int GLF_live12data = _GLF_FUZZED(-16405);
                                    int GLF_live12treeIndex = _GLF_FUZZED(-96217);
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            if (GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].rightIndex == -1) {
                                                GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].rightIndex = GLF_live12treeIndex;
                                                GLF_live12makeTreeNode(GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12treeIndex, 10)], GLF_live12data);
                                                ;
                                            } else {
                                                for (int _injected_loop_counter = _GLF_IDENTITY(0, (0) | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                    GLF_live12baseIndex = GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].rightIndex;
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(!(false))))) {
                                                } else {
                                                    ;
                                                }
                                            }
                                        } else {
                                        }
                                    }
                                }
                            case 5:
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    {
                                        float GLF_live21c_im = _GLF_FUZZED(((-6273.9376) * 573.226));
                                        float GLF_live21c_re = _GLF_FUZZED(-7.4);
                                        int GLF_live21iteration = _GLF_FUZZED(((~39825)));
                                        int GLF_live21k = _GLF_FUZZED(-388);
                                        int GLF_live21looplimiter0 = 0;
                                        float GLF_live21x = _GLF_FUZZED(8.1);
                                        float GLF_live21y = _GLF_FUZZED(70.07);
                                        {
                                            if (GLF_live21looplimiter0 >= 4) {
                                                ;
                                            }
                                            GLF_live21looplimiter0++;
                                            {
                                                if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 4.0) {
                                                    ;
                                                }
                                                float GLF_live21x_new = GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y + GLF_live21c_re;
                                                GLF_live21y = 2.0 * GLF_live21x * GLF_live21y + GLF_live21c_im;
                                                GLF_live21x = GLF_live21x_new;
                                                GLF_live21iteration++;
                                                GLF_live21k++;
                                            }
                                        }
                                    }
                                } else {
                                    {
                                        do {
                                            ;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    }
                                    GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = -1;
                                }
                                break;
                            case 6:
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (((-93056) - 26629) & 0)); _injected_loop_counter--) {
                                    for (int _injected_loop_counter = _GLF_IDENTITY(1, (1) ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY((0 >> _GLF_IDENTITY(int(3), int(3))), (true ? _GLF_IDENTITY((0 >> _GLF_IDENTITY(int(3), int(3))), ((0 >> _GLF_IDENTITY(int(3), int(3)))) | ((0 >> _GLF_IDENTITY(int(3), int(3))))) : _GLF_FUZZED(GLF_live7looplimiter5)))); _injected_loop_counter--) {
                                        do {
                                            GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = -2;
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = fwidthCoarse(GLF_live6_GLF_color);
                                    }
                                }
                                break;
                            case 7:
                                GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = -3;
                                break;
                            case 8:
                                do {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        do {
                                            GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = -4;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    ;
                                                } else {
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = uintBitsToFloat(uvec4(162191u, 69996u, 62843u, 67851u));
                                        }
                                    } else {
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                break;
                            case 9:
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                } else {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        {
                                            float GLF_live15result = _GLF_FUZZED(-98.61);
                                            {
                                                {
                                                    int GLF_live18looplimiter0 = 0;
                                                    if (GLF_live18looplimiter0 >= 4) {
                                                        ;
                                                    }
                                                }
                                                {
                                                    int GLF_live21iteration = _GLF_FUZZED(-98963);
                                                    int GLF_live21iterationCap = _GLF_FUZZED(-58455);
                                                    float GLF_live21xCoord = _GLF_FUZZED(vec2(-449.130, 1787.6310).y);
                                                    float GLF_live21yCoord = _GLF_FUZZED(-837.966);
                                                    if (GLF_live21iteration < bitfieldInsert(GLF_live21iterationCap, 0, 0, 0)) {
                                                        ;
                                                    } else {
                                                        ;
                                                    }
                                                }
                                                GLF_live15result += 100.0;
                                            }
                                        }
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                    }
                                }
                                GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = -5;
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    {
                                        vec2 GLF_live22coord = _GLF_FUZZED((7546.7773 + vec2(-4.3, -1.2)));
                                        int GLF_live22i = _GLF_FUZZED(66005);
                                        {
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
                                                    GLF_live22i++;
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(26.60, -2.9, 95.71, -49.67);
                                    }
                                    int GLF_live19looplimiter6 = 0;
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        for (int GLF_live19j = 0; GLF_live19j < 10; GLF_live19j++) {
                                            {
                                                vec2 GLF_live22coord = _GLF_FUZZED(vec2(-0.4, -5.5));
                                                if (GLF_live22coord.y > 1.0)
                                                    GLF_live22coord.y -= 1.0;
                                            }
                                            if (GLF_live19looplimiter6 >= 3) {
                                                break;
                                            }
                                            GLF_live19looplimiter6++;
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)];
                                            } else {
                                            }
                                        }
                                    } else {
                                    }
                                } else {
                                }
                                break;
                        }
                        GLF_live7i++;
                        {
                            int GLF_live12baseIndex = _GLF_FUZZED((27987 * (-41285)));
                            if (_GLF_DEAD(false)) {
                                _GLF_color = tan(vec4(GLF_live10b_b));
                            }
                            {
                                vec2 GLF_live18coord = _GLF_FUZZED((float(-13019) - vec2(453.305, -893.539)));
                                float GLF_live18h = _GLF_FUZZED(float(137500u));
                                int GLF_live18i = _GLF_FUZZED(44680);
                                int GLF_live18looplimiter0 = 0;
                                float GLF_live18refh = _GLF_FUZZED(((-2504.3468) * 2.0));
                                float GLF_live18slope = _GLF_FUZZED(402.694);
                                vec2 GLF_live18uvstep = _GLF_FUZZED((+vec2(-236.947, 10.42)));
                                {
                                    if (GLF_live18looplimiter0 >= 4) {
                                        ;
                                    }
                                    GLF_live18looplimiter0++;
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    {
                                        GLF_live18coord -= GLF_live18uvstep;
                                        {
                                            float GLF_live21x = _GLF_FUZZED(-9.4);
                                            float GLF_live21y = _GLF_FUZZED((-14.75));
                                            if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 4.0) {
                                                ;
                                            }
                                        }
                                        GLF_live18refh += GLF_live18slope;
                                        GLF_live18h = texture(GLF_live18tex, GLF_live18coord).y;
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        } else {
                                            GLF_live18i++;
                                        }
                                    }
                                }
                            }
                            int GLF_live12data = _GLF_FUZZED(53753);
                            int GLF_live12looplimiter0 = 0;
                            int GLF_live12treeIndex = _GLF_FUZZED(76397);
                            while (GLF_live12baseIndex <= GLF_live12treeIndex) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = GLF_live19gl_FragCoord;
                                }
                                if (GLF_live12looplimiter0 >= 5) {
                                    break;
                                }
                                do {
                                    GLF_live12looplimiter0++;
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                {
                                    if (GLF_live12data <= GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].data) {
                                        if (GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].leftIndex == -1) {
                                            do {
                                                for (int _injected_loop_counter = (0 ^ int(_GLF_ONE(1.0, injectionSwitch.y))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ int(_GLF_ZERO(0.0, injectionSwitch.x)))); _injected_loop_counter--) {
                                                    GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].leftIndex = GLF_live12treeIndex;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                            GLF_live12makeTreeNode(GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12treeIndex, 10)], GLF_live12data);
                                            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                ;
                                            }
                                        } else {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                GLF_live12baseIndex = GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].leftIndex;
                                            }
                                            continue;
                                        }
                                    } else {
                                        if (GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].rightIndex == -1) {
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].rightIndex = GLF_live12treeIndex;
                                            }
                                            GLF_live12makeTreeNode(GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12treeIndex, 10)], GLF_live12data);
                                            ;
                                        } else {
                                            GLF_live12baseIndex = GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].rightIndex;
                                            continue;
                                        }
                                    }
                                }
                            }
                            {
                                int GLF_live20looplimiter1 = 0;
                                if (GLF_live20looplimiter1 >= 3) {
                                    ;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live6_GLF_color;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = mix(_GLF_color, _GLF_color, bvec4(true, true, false, true));
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(vec2(-8.3, -855.062), 0.2, ldexp(2179.1252, 6021));
                        }
                        float GLF_live19grey = _GLF_FUZZED((641.711));
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(9975.7843, 2.6));
                            if (GLF_live22coord.y > 1.0)
                                GLF_live22coord.y -= 1.0;
                        }
                        {
                            GLF_live19grey = 0.5 + float(GLF_live19data[2]) / 10.0;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live16_GLF_color;
                    }
                } while (GLF_live7i < 10);
                if (_GLF_DEAD(false)) {
                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                        _GLF_color = tan(GLF_live12_GLF_color);
                    }
                }
                {
                    int GLF_live23baseIndex = _GLF_FUZZED((67035 ^ 30340));
                    int GLF_live23data = _GLF_FUZZED((38251 * ivec4(-25471, -53834, -78286, 99065).q));
                    int GLF_live23treeIndex = _GLF_FUZZED(((-5288) & (-19131)));
                    {
                        if (GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex == -1) {
                            GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex = GLF_live23treeIndex;
                            GLF_live23makeTreeNode(GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23treeIndex, 10)], GLF_live23data);
                            ;
                        } else {
                            GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex;
                            ;
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (_GLF_IDENTITY(true, bool(bool(true)))) && true))) {
                                _GLF_color = max(exp(vec4(8.9, 2285.6006, -9984.6181, 7.7)), vec4(-8.9, -81.20, -3624.3525, 25.71));
                            } else {
                            }
                        }
                    } else {
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                vec2 GLF_live18coord = _GLF_FUZZED(vec2(3.1, 64.82));
                float GLF_live18h = _GLF_FUZZED(8833.9420);
                int GLF_live18i = _GLF_FUZZED(((mat4(908.353, 8.6, 7732.6749, -2317.0066, 520.408, -114.171, 994.568, 1.3, -929.811, 124.535, -907.071, 565.532, 2.0, -552.643, 6234.3743, -152.573) == (+mat4(-2521.1136, -656.404, -64.56, -1.8, -1995.8817, 394.322, -5.1, 77.79, 2.4, -3.2, -77.83, 18.61, -957.874, 427.670, 8.1, 170.875))) ? (64718 & 24333) : 28034));
                {
                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(-97.12, 610.571));
                    vec4 GLF_live22res = _GLF_FUZZED(vec4(1.7, 5068.7900, 4.6, -9967.1848));
                    if (GLF_live22coord.x < 1.0 && GLF_live22coord.y < 1.0) {
                        GLF_live22res = texture(GLF_live22tex, GLF_live22coord);
                    }
                }
                float GLF_live18refh = _GLF_FUZZED(((-5.8) + vec4(-7.2, 2.3, -3057.2926, 6.5).a));
                float GLF_live18slope = _GLF_FUZZED(-7.4);
                vec2 GLF_live18uvstep = _GLF_FUZZED(vec2(98.26, -9501.4515).rg);
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    int GLF_live18looplimiter0 = 0;
                    {
                        {
                            ;
                        }
                    }
                    while (GLF_live18h < GLF_live18refh && GLF_live18i < 32) {
                        if (GLF_live18looplimiter0 >= 4) {
                            break;
                        }
                        GLF_live18looplimiter0++;
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                            {
                                int GLF_live23baseIndex = _GLF_FUZZED(-54984);
                                {
                                    GLF_live23baseIndex = GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].leftIndex;
                                    ;
                                }
                            }
                            GLF_live18coord -= GLF_live18uvstep;
                            GLF_live18refh += GLF_live18slope;
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                GLF_live18h = texture(GLF_live18tex, GLF_live18coord).y;
                            } else {
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            } else {
                                GLF_live18i++;
                            }
                        }
                    }
                }
            } else {
            }
            {
                {
                    ;
                }
            }
            {
                vec3 GLF_live15c = _GLF_FUZZED((vec3(2114.9777, 69.36, -2724.6962) - (+(-2637.2192))));
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(6.8, 67.05, 9.4, 3083.0750);
                }
                int GLF_live15looplimiter1 = 0;
                for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                    if (GLF_live15looplimiter1 >= 3) {
                        break;
                        {
                            vec2 GLF_live18coord = _GLF_FUZZED(((9648.8678 + 13.38) + vec2(-483.797, 168.776)));
                            float GLF_live18h = _GLF_FUZZED(float(true));
                            int GLF_live18i = _GLF_FUZZED(-87564);
                            int GLF_live18looplimiter0 = 0;
                            float GLF_live18refh = _GLF_FUZZED(1.8);
                            float GLF_live18slope = _GLF_FUZZED((-1838.2075));
                            {
                                int GLF_live23baseIndex = _GLF_FUZZED(-53067);
                                int GLF_live23data = _GLF_FUZZED(int(true));
                                int GLF_live23treeIndex = _GLF_FUZZED(-5703);
                                {
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
                            vec2 GLF_live18uvstep = _GLF_FUZZED((mat4x2(mat2x3(-6.5, -5.6, -0.1, -5.2, -53.26, -73.54)) * vec4(-9.1, -230.487, -61.26, -14.56)));
                            {
                                if (GLF_live18looplimiter0 >= 4) {
                                    ;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (GLF_live12_GLF_color * GLF_live10b_b);
                                }
                                GLF_live18looplimiter0++;
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                    GLF_live18coord -= GLF_live18uvstep;
                                    GLF_live18refh += GLF_live18slope;
                                    GLF_live18h = texture(GLF_live18tex, GLF_live18coord).y;
                                    GLF_live18i++;
                                }
                            }
                        }
                    }
                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 ^ 1)); _injected_loop_counter--) {
                        GLF_live15looplimiter1++;
                    }
                    {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < tan(_GLF_ZERO(0.0, injectionSwitch.x)))))) {
                                } else {
                                    if (GLF_live15c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i, 3)] >= 1.0) {
                                        GLF_live15c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i, 3)] = GLF_live15c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i, 3)] * GLF_live15c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i, 3)];
                                    }
                                }
                            }
                        } else {
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = GLF_live6_GLF_color;
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (GLF_live2looplimiter0 >= 7) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    vec3 GLF_live10d = _GLF_FUZZED(vec3(-5.0, 6.3, 372.115));
                    do {
                        if (length(GLF_live10d) <= float(bitfieldExtract(int(GLF_live10resolution.x), 0, 0))) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    ;
                                } else {
                                }
                            } else {
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        {
                            vec2 GLF_live18coord = _GLF_FUZZED((mat2(-7.0, -884.422, 727.185, 3.2) * vec2(4648.4763, -2794.7942)));
                            float GLF_live18h = _GLF_FUZZED(-150.197);
                            int GLF_live18i = _GLF_FUZZED((78576 & 51384));
                            int GLF_live18looplimiter0 = 0;
                            float GLF_live18refh = _GLF_FUZZED(88.82);
                            float GLF_live18slope = _GLF_FUZZED(9440.6695);
                            vec2 GLF_live18uvstep = _GLF_FUZZED(vec2(-9791.0957, -510.601));
                            {
                                if (GLF_live18looplimiter0 >= 4) {
                                    do {
                                        ;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    GLF_live18looplimiter0++;
                                }
                                {
                                    GLF_live18coord -= GLF_live18uvstep;
                                    GLF_live18refh += GLF_live18slope;
                                    GLF_live18h = texture(GLF_live18tex, GLF_live18coord).y;
                                    GLF_live18i++;
                                }
                            }
                        }
                        ;
                    } else {
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live16_GLF_color;
                    }
                }
            }
        }
        {
            float GLF_live23v = _GLF_FUZZED(95.97);
            if (GLF_live23v < 1.5) {
                ;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = asin(GLF_live12_GLF_color);
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, min(1, 1))); _injected_loop_counter++) {
            for (int j = -1; j <= int(injectionSwitch.y); j++) {
                for (int i = -1; i <= int(injectionSwitch.y); i++) {
                    vec2 g = vec2(float(j), float(i));
                    vec2 o = mix(n, g, 0.2);
                    if (injectionSwitch.x < (m.x)) {
                        {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    ;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = cos(vec4(-2744.5939, 3.1, 0.1, -29.51));
                                    }
                                } else {
                                }
                                {
                                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(vec3(-6697.7849, -7.1, 99.54)).yy);
                                    vec4 GLF_live22res = _GLF_FUZZED((vec4(2.8, 1.2, -5791.0671, 3965.7957) - vec4(-389.352, -426.729, 3.6, -314.896)));
                                    {
                                        GLF_live22res = texture(GLF_live22tex, GLF_live22coord);
                                    }
                                }
                            } else {
                            }
                        }
                        {
                            int GLF_live3looplimiter0 = 0;
                            int GLF_live3v = _GLF_FUZZED((+(-82480)));
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 1.0, 1.0, determinant(mat2(0.0, 0.0, 1.0, 0.0))), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(1.0, 1.0, 1.0, determinant(mat2(0.0, 0.0, 1.0, 0.0))), vec4(0.0, 0.0, 0.0, 1.0))))))) {
                                    _GLF_color = GLF_live12_GLF_color;
                                }
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), 0 | (int(5))))) >> _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter++) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            do {
                                                do {
                                                    if (GLF_live3looplimiter0 >= 7) {
                                                        ;
                                                        {
                                                            vec2 GLF_live22coord = _GLF_FUZZED(((-6.0) * vec2(55.99, 3.6)));
                                                            int GLF_live22i = _GLF_FUZZED((false ? 51495 : ivec2(59680, -20149).t));
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
                                                            {
                                                                ;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                        }
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, true && (false))));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    int GLF_live6d = _GLF_FUZZED(-70322);
                                                    ivec2 GLF_live6p = _GLF_FUZZED(ivec2(73382, -13411));
                                                    {
                                                        int GLF_live13looplimiter1 = 0;
                                                        if (GLF_live13looplimiter1 >= 6) {
                                                            do {
                                                                do {
                                                                    ;
                                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                        }
                                                    }
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter++) {
                                                        if (GLF_live6d >= 0 && GLF_live6p.x > 0 && GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x - 2) + (GLF_live6p.y) * 16, 256)] == 0) {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                                    GLF_live6d--;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                            } else {
                                                            }
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            } else {
                                                                do {
                                                                    do {
                                                                        GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y) * 16, 256)] = 1;
                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                            }
                                                            GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x - 1) + (GLF_live6p.y) * 16, 256)] = 1;
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = (_GLF_color / vec4(24.55, 7274.2542, -3.8, 6825.6573));
                                                            }
                                                            {
                                                                int GLF_live10msb8 = _GLF_FUZZED((24902 | (-30249)));
                                                                vec2 GLF_live10pos = _GLF_FUZZED((vec4(vec3(-305.675, -27.30, -4.8), 713.028) * mat2x4(-6.6, -569.939, 49.32, 8286.1151, 988.913, 9320.5265, -3699.5024, -7.6)));
                                                                {
                                                                    int GLF_live23looplimiter1 = 0;
                                                                    if (GLF_live23looplimiter1 >= 4) {
                                                                        ;
                                                                    }
                                                                }
                                                                vec3 GLF_live10setting = _GLF_FUZZED((mat3x4(45.55, -902.225, 9.6, -0.7, 273.703, -9545.7052, -3.7, -4.7, -4899.2451, 72.24, -2.8, -8.5) * vec3(2.6, -711.727, 84.36)).rgg);
                                                                {
                                                                    ;
                                                                }
                                                                {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                            {
                                                                int GLF_live23looplimiter0 = 0;
                                                                if (GLF_live23looplimiter0 >= 4) {
                                                                    ;
                                                                }
                                                            }
                                                            do {
                                                                GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x - 2) + (GLF_live6p.y) * 16, 256)] = 1;
                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            } else {
                                                                GLF_live6p.x -= 2;
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    {
                                                        float GLF_live15limit = _GLF_FUZZED((vec4(9.0, 9.6, 7677.6179, 312.529) + (-6.1)).w);
                                                        float GLF_live15result = _GLF_FUZZED(700.775);
                                                        {
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = vec4(-3.2, 6.8, -9.2, 5427.1648);
                                                                } else {
                                                                }
                                                            }
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        float GLF_live15thirty_two = _GLF_FUZZED((-(-711.907)));
                                                        {
                                                            int GLF_live15looplimiter0 = 0;
                                                            for (int GLF_live15i = 1; GLF_live15i < 800; GLF_live15i++) {
                                                                if (GLF_live15looplimiter0 >= 3) {
                                                                    break;
                                                                }
                                                                GLF_live15looplimiter0++;
                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                } else {
                                                                    {
                                                                        int GLF_live20index = _GLF_FUZZED((82864 & 47409));
                                                                        int GLF_live20j = _GLF_FUZZED((+87629));
                                                                        {
                                                                            GLF_live20index = GLF_live20j;
                                                                            if (_GLF_DEAD(false)) {
                                                                                _GLF_color = unpackSnorm4x8(min(min(67716u, 88908u), mix(133113u, 101556u, false)));
                                                                            }
                                                                        }
                                                                    }
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                if ((GLF_live15i % 32) == 0) {
                                                                                    GLF_live15result += 0.4;
                                                                                } else {
                                                                                    if (mod(float(GLF_live15i), round(GLF_live15thirty_two)) <= 0.01) {
                                                                                        {
                                                                                            int GLF_live18looplimiter0 = 0;
                                                                                            if (GLF_live18looplimiter0 >= 4) {
                                                                                                ;
                                                                                            }
                                                                                            if (_GLF_DEAD(false)) {
                                                                                                _GLF_color = _GLF_color;
                                                                                            }
                                                                                        }
                                                                                        for (int _injected_loop_counter = (0 & (-50345)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                                            GLF_live15result += 100.0;
                                                                                        }
                                                                                    }
                                                                                }
                                                                            } else {
                                                                            }
                                                                        } else {
                                                                        }
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = GLF_live19gl_FragCoord;
                                                                        }
                                                                        if (float(GLF_live15i) >= GLF_live15limit) {
                                                                            ;
                                                                            if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, (false) && true)) || false))) {
                                                                                _GLF_color = _GLF_color;
                                                                            }
                                                                            {
                                                                                int GLF_live19i = _GLF_FUZZED((40405));
                                                                                int GLF_live19j = _GLF_FUZZED(int(true));
                                                                                int GLF_live19k = _GLF_FUZZED((((-81336) - 22173) * 14668));
                                                                                int GLF_live19mid = _GLF_FUZZED(-6989);
                                                                                int GLF_live19to = _GLF_FUZZED(-49260);
                                                                                {
                                                                                    int GLF_live19looplimiter0 = 0;
                                                                                    while (GLF_live19i <= GLF_live19mid && GLF_live19j <= GLF_live19to) {
                                                                                        if (GLF_live19looplimiter0 >= 3) {
                                                                                            break;
                                                                                        }
                                                                                        GLF_live19looplimiter0++;
                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                            if (GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] < GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j, 10)]) {
                                                                                                GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i++, 10)];
                                                                                            } else {
                                                                                                GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19k++, 10)] = GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19j++, 10)];
                                                                                            }
                                                                                        } else {
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    } else {
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                                    _GLF_color = vec4(x, -6.7, 6.0);
                                                }
                                                {
                                                    int GLF_live17looplimiter1 = 0;
                                                    if (GLF_live17looplimiter1 >= 6) {
                                                        ;
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        } else {
                                        }
                                        {
                                            int GLF_live20index = _GLF_FUZZED(((-28244) + 25191));
                                            int GLF_live20j = _GLF_FUZZED(-19534);
                                            {
                                                GLF_live20index = GLF_live20j;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = dFdxCoarse(GLF_live6_GLF_color);
                                    }
                                }
                                {
                                    float GLF_live14th = _GLF_FUZZED(vec4(-7.1, -9.4, 0.5, -60.95).g);
                                    {
                                        GLF_live14th = 1.0 - GLF_live14th;
                                    }
                                    {
                                        int GLF_live23baseIndex = _GLF_FUZZED((54091 | 47784));
                                        int GLF_live23data = _GLF_FUZZED(78013);
                                        int GLF_live23treeIndex = _GLF_FUZZED(((-53964) * 25760));
                                        {
                                            if (GLF_live23tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23baseIndex, 10)].rightIndex == -1) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = fwidthCoarse(GLF_live6_GLF_color);
                                                }
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
                                GLF_live3looplimiter0++;
                                do {
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), (int(2)) | 0)))); _injected_loop_counter++) {
                                        GLF_live3v = (4 * GLF_live3v * (1000 - GLF_live3v)) / 1000;
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                {
                                    int GLF_live17looplimiter1 = 0;
                                    if (GLF_live17looplimiter1 >= 6) {
                                        ;
                                    }
                                }
                            }
                        }
                        int k = 1;
                        while (k >= 0) {
                            do {
                                o = o + o;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = mod(GLF_live12_GLF_color, 7359.1910);
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(log(1.0), 1.0), vec2(1.0, 0.0)), dot(vec2(log(1.0), 1.0), vec2(1.0, 0.0))))))) {
                                _GLF_color = GLF_live19gl_FragCoord;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = acosh(vec4(-274.619, -5.6, -5.8, -243.653));
                            }
                            {
                                int GLF_live3looplimiter0 = 0;
                                {
                                    int GLF_live23looplimiter1 = 0;
                                    if (GLF_live23looplimiter1 >= 4) {
                                        ;
                                    }
                                }
                                if (GLF_live3looplimiter0 >= 7) {
                                    ;
                                }
                            }
                            do {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    do {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            k--;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0)))));
                                } else {
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                            if (_GLF_DEAD(false)) {
                                do {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (false) || false))) {
                                    } else {
                                        _GLF_color = (vec4(-0.0, 8.1, 81.98, 1483.9531));
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                            {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) || false))) {
                                    ;
                                } else {
                                    {
                                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-0.5, -916.127));
                                        if (GLF_live22coord.y > 1.0)
                                            GLF_live22coord.y -= 1.0;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = step(GLF_live6_GLF_color, (GLF_live12_GLF_color * mat4(-125.652, 77.90, 3.2, -3113.9535, -243.872, 74.72, -7.2, -1.1, 9922.1252, -35.97, 906.539, -2.9, -4.6, -6179.7269, -11.41, -72.19)));
                        }
                        {
                            float GLF_live23v = _GLF_FUZZED(771.044);
                            if (GLF_live23v < 4.0) {
                                ;
                            }
                        }
                        m = vec3(injectionSwitch.x, cos(o));
                    }
                }
            }
            {
                int GLF_live21iterationCap = _GLF_FUZZED(-44012);
                {
                    GLF_live21iterationCap += 1;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_live6_GLF_color;
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        return vec2(m.x, m.y - m.z);
    }
}

void main() {
    vec4 GLF_merged2_0_2_1_2_2_2cuv;
    vec2 uv = gl_FragCoord.xy / resolution.y;
    GLF_merged2_0_2_1_2_2_2cuv.zw = uv;
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_live16_GLF_color;
    }
    {
        int GLF_live23sum = _GLF_FUZZED(ivec4(34179, -2045, -79322, 84331).b);
        {
            int GLF_live23looplimiter2 = 0;
            for (int GLF_live23target = 0; GLF_live23target < 20; GLF_live23target++) {
                if (GLF_live23looplimiter2 >= 4) {
                    break;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = acosh(GLF_live16_GLF_color);
                    }
                }
                GLF_live23looplimiter2++;
                {
                    int GLF_live23result = GLF_live23search(GLF_live23target);
                    if (GLF_live23result > 0) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live12_GLF_color;
                        }
                        GLF_live23sum += GLF_live23result;
                    } else {
                        switch (GLF_live23result) {
                            case -1:
                                GLF_live23sum += 1;
                                break;
                            case 0:
                                ;
                        }
                    }
                }
            }
        }
    }
    float A[50];
    for (int i = 0; i < 200; i++) {
        if (i >= int(resolution.x)) {
            break;
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if ((4 * (i / 4)) == i) {
                    A[i / 4] = float(i);
                }
            } else {
            }
        }
    }
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        for (int i = 0; i < 50; i++) {
            if (i < int(gl_FragCoord.x)) {
                break;
            }
            {
                vec2 GLF_live16pos = _GLF_FUZZED((-vec2(-2.3, 10.42)));
                if (GLF_live16pointInTriangle(GLF_live16pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                    for (int _injected_loop_counter = (1 ^ (0 & GLF_live19N)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        GLF_live16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    }
                } else {
                    do {
                        GLF_live16_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), bool(bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))))) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = pow(GLF_merged2_0_2_1_2_2_2cuv, GLF_live6_GLF_color);
                    }
                    if (i > 0) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live19gl_FragCoord;
                        }
                        A[i] += A[i - 1];
                    }
                    {
                        float GLF_live16pab = _GLF_FUZZED(6.6);
                        float GLF_live16pbc = _GLF_FUZZED((false ? (-9130.6897) : 965.510));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (!((GLF_live16pab < 0.0 && GLF_live16pbc < 0.0) || (GLF_live16pab >= 0.0 && GLF_live16pbc >= 0.0))) {
                                ;
                            }
                        } else {
                        }
                    }
                } else {
                }
            } else {
            }
        }
    }
    vec2 c = pattern((15.0 + tan(0.2)) * GLF_merged2_0_2_1_2_2_2cuv.zw);
    GLF_merged2_0_2_1_2_2_2cuv.xy = c;
    vec3 col;
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (int(gl_FragCoord.y) < 20) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                    {
                        {
                            ;
                            {
                                {
                                    int GLF_live21looplimiter3 = 0;
                                    if (GLF_live21looplimiter3 >= 4) {
                                        ;
                                    }
                                }
                                int GLF_live19i = _GLF_FUZZED((44825 ^ 40918));
                                for (int _injected_loop_counter = ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(5), int(5))) >> _GLF_IDENTITY(int(5), int(5))); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = GLF_live19temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)];
                                }
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 ^ (1 ^ 1))); _injected_loop_counter++) {
                            col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0));
                        }
                    }
                } else {
                }
            } else {
                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                    for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != (((1 ^ 0) << _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), (int(4)) * int(_GLF_ONE(1.0, injectionSwitch.y))))) >> _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), (int(4)) | (int(4)))))); _injected_loop_counter++) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            if (int(gl_FragCoord.y) < 40) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[9] / resolution.x + 50.0, 22.0));
                                    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))); _GLF_WRAPPED_LOOP(_injected_loop_counter > (GLF_live19N & (0 ^ 0))); _injected_loop_counter--) {
                                        {
                                            int GLF_live23baseIndex = _GLF_FUZZED(-98449);
                                            int GLF_live23data = _GLF_FUZZED((-(54527 | (-41542))));
                                            int GLF_live23looplimiter0 = 0;
                                            int GLF_live23treeIndex = _GLF_FUZZED(-63984);
                                            while (GLF_live23baseIndex <= GLF_live23treeIndex) {
                                                if (GLF_live23looplimiter0 >= 4) {
                                                    break;
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
                                                            continue;
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
                                            }
                                        }
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                            {
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                } else {
                                                    for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (int(7)) - int(_GLF_ZERO(0.0, injectionSwitch.x))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                        ;
                                                    }
                                                }
                                            }
                                            {
                                                {
                                                    ;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(log(1.0)))))) {
                                                    _GLF_color = vec4(0.3, -41.23, -661.915, -8.4);
                                                }
                                            }
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, 0.0, 1.0, 0.0)))))) {
                                                    } else {
                                                        do {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                ;
                                                            } else {
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                        for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 << _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter--) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else {
                                                }
                                            }
                                        }
                                    }
                                } else {
                                }
                                {
                                    int GLF_live7looplimiter2 = 0;
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            } else {
                                                do {
                                                    for (int _injected_loop_counter = (((1 | 1) << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), 0 | (_GLF_IDENTITY(int(6), 0 ^ (int(6))))))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                        do {
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            } else {
                                                                if (GLF_live7looplimiter2 >= 3) {
                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                                                    } else {
                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                        } else {
                                                                            ;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            {
                                                                int GLF_live21looplimiter0 = 0;
                                                                if (GLF_live21looplimiter0 >= 4) {
                                                                    ;
                                                                }
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) && true)));
                                            }
                                        }
                                    }
                                    do {
                                        vec3 GLF_live15c = _GLF_FUZZED(vec3(-8591.0036, 0.0, 55.08));
                                        int GLF_live15i = _GLF_FUZZED((22128 | (-16348)));
                                        {
                                            {
                                                {
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                        GLF_live16_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                                    }
                                                }
                                            }
                                            GLF_live15c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i, 3)] = GLF_live15c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i, 3)] * GLF_live15c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i, 3)];
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                            } else {
                                {
                                    {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                        } else {
                                            ;
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            if (int(gl_FragCoord.y) < 60) {
                                                do {
                                                    col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0));
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            } else if (int(gl_FragCoord.y) < 80) {
                                                col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                            } else if (int(gl_FragCoord.y) < 100) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                                } else {
                                                }
                                            } else {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    do {
                                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                            if (int(gl_FragCoord.y) < 120) {
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = vec4(1.5, -2.5, -52.21, 9.7);
                                                                    }
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = (mat4(5992.1143, -63.51, 3.2, 169.844, 1.3, 7.1, 902.106, 4092.1844, -2.3, -892.001, 7.7, 0.2, -7.1, 2.4, 5.4, -3.9)[2]);
                                                                    }
                                                                    _GLF_color = max((mat3x4(9.2, 20.54, -5.0, 841.701, -3655.8448, 153.070, 3.9, -3711.5048, 6.3, 75.65, 7313.6127, 6.8) * col), GLF_live10b_b);
                                                                }
                                                                for (int _injected_loop_counter = ((0 << _GLF_IDENTITY(int(7), int(7))) << _GLF_IDENTITY(int(4), int(4))); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))) << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0)))); _injected_loop_counter++) {
                                                                    col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                                                }
                                                                {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                            } else {
                                                                {
                                                                    bool GLF_live6canwalk = _GLF_FUZZED((mat3x4(6.0, -49.00, 5046.2041, -7.8, -8.3, -72.67, -9.7, 0.7, -3.1, 377.732, -1575.9835, 1.5) == mat3x4(-18.88, 947.807, -79.96, 8.2, 21.45, 213.941, 7215.9423, 59.97, 5.9, 6125.0968, -6.7, -9.9)));
                                                                    int GLF_live6i = _GLF_FUZZED(-15097);
                                                                    ivec2 GLF_live6ipos = _GLF_FUZZED(ivec2(9419, -94741));
                                                                    ivec2 GLF_live6p = _GLF_FUZZED(ivec2(41497, -52084));
                                                                    int GLF_live6v = _GLF_FUZZED(((-78651) | 59361));
                                                                    {
                                                                        {
                                                                            int GLF_live23looplimiter2 = 0;
                                                                            int GLF_live23sum = _GLF_FUZZED(82624);
                                                                            int GLF_live23target = _GLF_FUZZED(77847);
                                                                            {
                                                                                if (GLF_live23looplimiter2 >= 4) {
                                                                                    ;
                                                                                }
                                                                                GLF_live23looplimiter2++;
                                                                                {
                                                                                    int GLF_live23result = GLF_live23search(GLF_live23target);
                                                                                    if (GLF_live23result > 0) {
                                                                                        GLF_live23sum += GLF_live23result;
                                                                                    } else {
                                                                                        switch (GLF_live23result) {
                                                                                            case -1:
                                                                                                GLF_live23sum += 1;
                                                                                                break;
                                                                                            case 0:
                                                                                                ;
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            GLF_live6v++;
                                                                        } else {
                                                                        }
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = GLF_live16_GLF_color;
                                                                        }
                                                                        int GLF_live6directions = 0;
                                                                        if (GLF_live6p.x > 0 && GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x - 2) + (GLF_live6p.y) * 16, 256)] == 0) {
                                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            } else {
                                                                                GLF_live6directions += 1;
                                                                            }
                                                                            if (_GLF_DEAD(false)) {
                                                                                _GLF_color = GLF_live19gl_FragCoord;
                                                                            }
                                                                        }
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            if (GLF_live6p.y > 0 && GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y - 2) * 16, 256)] == 0) {
                                                                                do {
                                                                                    GLF_live6directions += 1;
                                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                            }
                                                                        } else {
                                                                        }
                                                                        for (int _injected_loop_counter = _GLF_IDENTITY(0, min(0, _GLF_IDENTITY(0, ~(~(0))))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 | (1 ^ 0))); _injected_loop_counter++) {
                                                                            do {
                                                                                if (GLF_live6p.x < 14 && GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x + 2) + (GLF_live6p.y) * 16, 256)] == 0) {
                                                                                    {
                                                                                        {
                                                                                            ;
                                                                                        }
                                                                                    }
                                                                                    GLF_live6directions += 1;
                                                                                }
                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                        }
                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        } else {
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                do {
                                                                                    if (GLF_live6p.y < 14 && GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y + 2) * 16, 256)] == 0) {
                                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                        } else {
                                                                                            do {
                                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                                    GLF_live6directions += 1;
                                                                                                } else {
                                                                                                }
                                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                                            if (_GLF_DEAD(false)) {
                                                                                                do {
                                                                                                    _GLF_color = vec4((2.1 / 6.2), -1.5, ldexp(-678.466, GLF_live6i), trunc(6145.2380));
                                                                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                                                                {
                                                                                                    vec2 GLF_live18coord = _GLF_FUZZED(vec2(-3.1, -533.210));
                                                                                                    float GLF_live18h = _GLF_FUZZED(-2.7);
                                                                                                    int GLF_live18i = _GLF_FUZZED((ivec3(21958, -91728, -70552).g ^ 94566));
                                                                                                    float GLF_live18refh = _GLF_FUZZED(2.9);
                                                                                                    float GLF_live18slope = _GLF_FUZZED((1.9));
                                                                                                    vec2 GLF_live18uvstep = _GLF_FUZZED(vec2(-73.51, 928.801));
                                                                                                    {
                                                                                                        int GLF_live18looplimiter0 = 0;
                                                                                                        while (GLF_live18h < GLF_live18refh && GLF_live18i < 32) {
                                                                                                            if (GLF_live18looplimiter0 >= 4) {
                                                                                                                break;
                                                                                                            }
                                                                                                            do {
                                                                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                                                } else {
                                                                                                                    {
                                                                                                                        int GLF_live21iterationCap = _GLF_FUZZED(int(178061u));
                                                                                                                        if (0.0 > GLF_live21resolution.y) {
                                                                                                                            GLF_live21iterationCap += 1;
                                                                                                                        }
                                                                                                                    }
                                                                                                                    GLF_live18looplimiter0++;
                                                                                                                }
                                                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                                                            {
                                                                                                                GLF_live18coord -= GLF_live18uvstep;
                                                                                                                GLF_live18refh += GLF_live18slope;
                                                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                                    GLF_live18h = texture(GLF_live18tex, GLF_live18coord).y;
                                                                                                                } else {
                                                                                                                }
                                                                                                                GLF_live18i++;
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                            if (_GLF_DEAD(false)) {
                                                                                                {
                                                                                                    {
                                                                                                        ;
                                                                                                    }
                                                                                                }
                                                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                } else {
                                                                                                    _GLF_color = vec4(-36.07, 2.7, 6.1, 926.916);
                                                                                                }
                                                                                            }
                                                                                            for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), 0 ^ (int(0))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                                                                float GLF_live14th = _GLF_FUZZED(105.290);
                                                                                                {
                                                                                                    GLF_live14th = 0.5 - GLF_live14th;
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    {
                                                                                        int GLF_live19high = _GLF_FUZZED((14942));
                                                                                        int GLF_live19looplimiter3 = 0;
                                                                                        int GLF_live19low = _GLF_FUZZED(53321);
                                                                                        int GLF_live19m = _GLF_FUZZED((+4181));
                                                                                        for (int GLF_live19i = GLF_live19low; GLF_live19i < GLF_live19high; GLF_live19i += 2 * GLF_live19m) {
                                                                                            if (GLF_live19looplimiter3 >= 3) {
                                                                                                break;
                                                                                            }
                                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), _GLF_IDENTITY(bool(bvec3(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), true, false)), (bool(bvec3(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), true, false))) || false)))) {
                                                                                                GLF_live19looplimiter3++;
                                                                                            } else {
                                                                                            }
                                                                                            {
                                                                                                int GLF_live19from = GLF_live19i;
                                                                                                int GLF_live19mid = GLF_live19i + GLF_live19m - 1;
                                                                                                int GLF_live19to = min(GLF_live19i + 2 * GLF_live19m - 1, GLF_live19high);
                                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                                        GLF_live19merge(GLF_live19from, GLF_live19mid, GLF_live19to);
                                                                                                    } else {
                                                                                                    }
                                                                                                } else {
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, true && (false))));
                                                                            } else {
                                                                            }
                                                                        }
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                            if (GLF_live6directions == 0) {
                                                                                do {
                                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                        {
                                                                                            int GLF_live23result = _GLF_FUZZED(int(93786u));
                                                                                            int GLF_live23sum = _GLF_FUZZED(((ivec2(99266, -73151) - 23389) ^ 54409).r);
                                                                                            {
                                                                                                GLF_live23sum += GLF_live23result;
                                                                                            }
                                                                                        }
                                                                                    } else {
                                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                        } else {
                                                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                                    int GLF_live9baseIndex = _GLF_FUZZED(21397);
                                                                                                    int GLF_live9data = _GLF_FUZZED(66026);
                                                                                                    int GLF_live9treeIndex = _GLF_FUZZED(int(true));
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                        GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex = GLF_live9treeIndex;
                                                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                        } else {
                                                                                                            GLF_live9makeTreeNode(GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 10)], GLF_live9data);
                                                                                                        }
                                                                                                        ;
                                                                                                    } else {
                                                                                                    }
                                                                                                    do {
                                                                                                        int GLF_live15i = _GLF_FUZZED(44746);
                                                                                                        float GLF_live15result = _GLF_FUZZED((4819.7560 + (-9.5)));
                                                                                                        float GLF_live15thirty_two = _GLF_FUZZED(-908.091);
                                                                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((0 ^ 0) ^ 1)); _injected_loop_counter++) {
                                                                                                            do {
                                                                                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                                                                    if (mod(float(GLF_live15i), round(GLF_live15thirty_two)) <= 0.01) {
                                                                                                                        if (_GLF_DEAD(false)) {
                                                                                                                            _GLF_color = (asin(GLF_live12_GLF_color) + (-622.822));
                                                                                                                        }
                                                                                                                        GLF_live15result += 100.0;
                                                                                                                    }
                                                                                                                }
                                                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                                                        }
                                                                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                                                                }
                                                                                            }
                                                                                            {
                                                                                                int GLF_live23baseIndex = _GLF_FUZZED(27804);
                                                                                                int GLF_live23data = _GLF_FUZZED(59474);
                                                                                                int GLF_live23treeIndex = _GLF_FUZZED((ivec2(70968, 5413) + (-16132)).s);
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
                                                                                            GLF_live6canwalk = false;
                                                                                        }
                                                                                        {
                                                                                            int GLF_live18looplimiter0 = 0;
                                                                                            if (GLF_live18looplimiter0 >= 4) {
                                                                                                ;
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                                int GLF_live6j = _GLF_FUZZED(abs(76580));
                                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                } else {
                                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                    } else {
                                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                            if (_GLF_DEAD(false)) {
                                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                                        _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                                                                                    } else {
                                                                                                    }
                                                                                                } else {
                                                                                                }
                                                                                            }
                                                                                            for (int _injected_loop_counter = (0 ^ int(_GLF_ZERO(0.0, injectionSwitch.x))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (int(_GLF_ONE(1.0, injectionSwitch.y)) ^ 0)); _injected_loop_counter++) {
                                                                                                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                                                                            }
                                                                                        }
                                                                                        int GLF_live6looplimiter2 = 0;
                                                                                        for (GLF_live6i = 0; GLF_live6i < 8; GLF_live6i++) {
                                                                                            if (GLF_live6looplimiter2 >= 4) {
                                                                                                break;
                                                                                            }
                                                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 ^ 1)); _injected_loop_counter++) {
                                                                                                GLF_live6looplimiter2++;
                                                                                            }
                                                                                            for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), int(ivec3(int(3), 0, 1))))) >> _GLF_IDENTITY(int(3), int(3))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                                                do {
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter++) {
                                                                                                            do {
                                                                                                                {
                                                                                                                    float GLF_live21xCoord = _GLF_FUZZED(807.131);
                                                                                                                    float GLF_live21yCoord = _GLF_FUZZED((+(-7.4)));
                                                                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                                                        _GLF_color = GLF_live6_GLF_color;
                                                                                                                    }
                                                                                                                    {
                                                                                                                        ;
                                                                                                                    }
                                                                                                                }
                                                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                    } else {
                                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                                            int GLF_live6looplimiter1 = 0;
                                                                                                                            for (GLF_live6j = 0; GLF_live6j < 8; GLF_live6j++) {
                                                                                                                                {
                                                                                                                                    {
                                                                                                                                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-7.4, -387.408));
                                                                                                                                        vec4 GLF_live22res = _GLF_FUZZED(vec4(vec2(-4.3, -2134.4136), (vec2(-99.58, -2451.3812)).tt));
                                                                                                                                        if (GLF_live22coord.x < 1.0 && GLF_live22coord.y < 1.0) {
                                                                                                                                            GLF_live22res = texture(GLF_live22tex, GLF_live22coord);
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                    float GLF_live16pab = _GLF_FUZZED(float(8917));
                                                                                                                                    float GLF_live16pca = _GLF_FUZZED(-6804.4210);
                                                                                                                                    {
                                                                                                                                        {
                                                                                                                                            ;
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                    if (!((GLF_live16pab < 0.0 && GLF_live16pca < 0.0) || (GLF_live16pab >= 0.0 && GLF_live16pca >= 0.0))) {
                                                                                                                                        ;
                                                                                                                                    }
                                                                                                                                }
                                                                                                                                if (GLF_live6looplimiter1 >= 4) {
                                                                                                                                    break;
                                                                                                                                }
                                                                                                                                do {
                                                                                                                                    GLF_live6looplimiter1++;
                                                                                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                                                                                {
                                                                                                                                    if (GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6j * 2 + GLF_live6i * 2 * 16, 256)] == 0) {
                                                                                                                                        do {
                                                                                                                                            GLF_live6p.x = GLF_live6j * 2;
                                                                                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                                                                                                        GLF_live6p.y = GLF_live6i * 2;
                                                                                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                                        } else {
                                                                                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                                                                                                                                if (_GLF_DEAD(false)) {
                                                                                                                                                    _GLF_color = round((+GLF_live16_GLF_color));
                                                                                                                                                }
                                                                                                                                                _GLF_color = _GLF_color;
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                        do {
                                                                                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                                            } else {
                                                                                                                                                {
                                                                                                                                                    {
                                                                                                                                                        ;
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                                GLF_live6canwalk = true;
                                                                                                                                            }
                                                                                                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                                                                                                    }
                                                                                                                                    if (_GLF_DEAD(false)) {
                                                                                                                                        _GLF_color = mat2x4(-4347.3623, -264.844, -1.8, 3.8, -5.1, 2.3, -96.98, -4452.5073)[0];
                                                                                                                                    }
                                                                                                                                }
                                                                                                                                {
                                                                                                                                    int GLF_live15looplimiter0 = 0;
                                                                                                                                    if (GLF_live15looplimiter0 >= 3) {
                                                                                                                                        ;
                                                                                                                                    }
                                                                                                                                }
                                                                                                                                if (_GLF_DEAD(false)) {
                                                                                                                                    _GLF_color = cos(vec4(-5.1, 475.318, 785.327, 8675.4383));
                                                                                                                                }
                                                                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                                                                    _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                                                                                                                }
                                                                                                                            }
                                                                                                                        } else {
                                                                                                                            {
                                                                                                                                int GLF_live22looplimiter0 = 0;
                                                                                                                                if (GLF_live22looplimiter0 >= 3) {
                                                                                                                                    ;
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                } else {
                                                                                                                }
                                                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                                                        }
                                                                                                    } else {
                                                                                                    }
                                                                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                                            }
                                                                                            {
                                                                                                int GLF_live20looplimiter0 = 0;
                                                                                                if (GLF_live20looplimiter0 >= 3) {
                                                                                                    ;
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                                GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y) * 16, 256)] = 1;
                                                                            } else {
                                                                                int GLF_live6d = GLF_live6v % GLF_live6directions;
                                                                                if (_GLF_DEAD(false)) {
                                                                                    _GLF_color = abs(GLF_live19gl_FragCoord);
                                                                                }
                                                                                GLF_live6v += GLF_live6directions;
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    {
                                                                                        vec2 GLF_live18coord = _GLF_FUZZED(vec2(-6072.3483, ((+(-586.983)) * (-887.412))));
                                                                                        float GLF_live18h = _GLF_FUZZED(-686.621);
                                                                                        int GLF_live18i = _GLF_FUZZED(-91295);
                                                                                        float GLF_live18refh = _GLF_FUZZED(9.9);
                                                                                        float GLF_live18slope = _GLF_FUZZED(((-2625.1651) - 6.5));
                                                                                        vec2 GLF_live18uvstep = _GLF_FUZZED(vec2(-0.2, -8.7));
                                                                                        {
                                                                                            int GLF_live20index = _GLF_FUZZED((-(-42552)));
                                                                                            int GLF_live20j = _GLF_FUZZED((((86852 - (-74953)) + 33710) | 3440));
                                                                                            {
                                                                                                GLF_live20index = GLF_live20j;
                                                                                            }
                                                                                        }
                                                                                        {
                                                                                            int GLF_live18looplimiter0 = 0;
                                                                                            while (GLF_live18h < GLF_live18refh && GLF_live18i < 32) {
                                                                                                if (GLF_live18looplimiter0 >= 4) {
                                                                                                    break;
                                                                                                }
                                                                                                GLF_live18looplimiter0++;
                                                                                                {
                                                                                                    if (_GLF_DEAD(false)) {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                            _GLF_color = (GLF_merged2_0_2_1_2_2_2cuv - GLF_live18h);
                                                                                                        } else {
                                                                                                        }
                                                                                                    }
                                                                                                    GLF_live18coord -= GLF_live18uvstep;
                                                                                                    GLF_live18refh += GLF_live18slope;
                                                                                                    GLF_live18h = texture(GLF_live18tex, GLF_live18coord).y;
                                                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
                                                                                                    } else {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                                                GLF_live18i++;
                                                                                                            } else {
                                                                                                            }
                                                                                                        } else {
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                                {
                                                                                                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(-9.7, 3.3));
                                                                                                    if (GLF_live22coord.y > 1.0)
                                                                                                        GLF_live22coord.y -= 1.0;
                                                                                                }
                                                                                            }
                                                                                            {
                                                                                                int GLF_live23target = _GLF_FUZZED(25582);
                                                                                                {
                                                                                                    ;
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                        if (GLF_live6d >= 0 && GLF_live6p.x > 0 && GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x - 2) + (GLF_live6p.y) * 16, 256)] == 0) {
                                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                {
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                                            ;
                                                                                                        } else {
                                                                                                            {
                                                                                                                vec2 GLF_live22coord = _GLF_FUZZED(vec2(35.95, 51.86));
                                                                                                                if (_GLF_DEAD(false)) {
                                                                                                                    _GLF_color = vec4(-93.97, 3967.2636, -7.7, -9.0);
                                                                                                                }
                                                                                                                int GLF_live22i = _GLF_FUZZED(-15568);
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
                                                                                                    } else {
                                                                                                        {
                                                                                                            int GLF_live20looplimiter1 = 0;
                                                                                                            if (GLF_live20looplimiter1 >= 3) {
                                                                                                                ;
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            } else {
                                                                                                {
                                                                                                    {
                                                                                                        ;
                                                                                                    }
                                                                                                }
                                                                                                GLF_live6d--;
                                                                                            }
                                                                                            GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y) * 16, 256)] = 1;
                                                                                            GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x - 1) + (GLF_live6p.y) * 16, 256)] = 1;
                                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                            } else {
                                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                        } else {
                                                                                                            GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x - 2) + (GLF_live6p.y) * 16, 256)] = 1;
                                                                                                        }
                                                                                                    } else {
                                                                                                    }
                                                                                                } else {
                                                                                                }
                                                                                            }
                                                                                            GLF_live6p.x -= 2;
                                                                                        }
                                                                                    }
                                                                                    {
                                                                                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(9.7, -3776.0937));
                                                                                        int GLF_live22i = _GLF_FUZZED(ivec3(60578, -7867, -90779).p);
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
                                                                                                GLF_live22i++;
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                } else {
                                                                                }
                                                                                do {
                                                                                    {
                                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                        } else {
                                                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                            } else {
                                                                                                ;
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    if (GLF_live6d >= 0 && GLF_live6p.y > 0 && GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y - 2) * 16, 256)] == 0) {
                                                                                        GLF_live6d--;
                                                                                        if (_GLF_DEAD(false)) {
                                                                                            do {
                                                                                                _GLF_color = _GLF_color;
                                                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                                                        }
                                                                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 << _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter--) {
                                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                                } else {
                                                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                    } else {
                                                                                                        {
                                                                                                            float GLF_live21c_im = _GLF_FUZZED(3209.3191);
                                                                                                            float GLF_live21c_re = _GLF_FUZZED(vec2(-6.8, -316.621).t);
                                                                                                            int GLF_live21iteration = _GLF_FUZZED(12640);
                                                                                                            int GLF_live21k = _GLF_FUZZED(-51767);
                                                                                                            int GLF_live21looplimiter0 = 0;
                                                                                                            float GLF_live21x = _GLF_FUZZED(((-449.756) * (-4.8)));
                                                                                                            float GLF_live21y = _GLF_FUZZED((7.9));
                                                                                                            {
                                                                                                                if (GLF_live21looplimiter0 >= 4) {
                                                                                                                    ;
                                                                                                                }
                                                                                                                GLF_live21looplimiter0++;
                                                                                                                {
                                                                                                                    if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 4.0) {
                                                                                                                        ;
                                                                                                                    }
                                                                                                                    float GLF_live21x_new = GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y + GLF_live21c_re;
                                                                                                                    GLF_live21y = 2.0 * GLF_live21x * GLF_live21y + GLF_live21c_im;
                                                                                                                    GLF_live21x = GLF_live21x_new;
                                                                                                                    GLF_live21iteration++;
                                                                                                                    GLF_live21k++;
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                        GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y) * 16, 256)] = 1;
                                                                                                    }
                                                                                                }
                                                                                            } else {
                                                                                            }
                                                                                        }
                                                                                        GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y - 1) * 16, 256)] = 1;
                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                            GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y - 2) * 16, 256)] = 1;
                                                                                        } else {
                                                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                                                if (_GLF_DEAD(false)) {
                                                                                                    _GLF_color = vec4(817.806, 321.318, -4030.6992, 6.3);
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                            GLF_live6p.y -= 2;
                                                                                        } else {
                                                                                        }
                                                                                    }
                                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                } else {
                                                                                    if (GLF_live6d >= 0 && GLF_live6p.x < 14 && GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x + 2) + (GLF_live6p.y) * 16, 256)] == 0) {
                                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                            _GLF_color = intBitsToFloat(ivec4(-63115, 38461, -75840, -42794));
                                                                                            {
                                                                                                int GLF_live21iterationCap = _GLF_FUZZED(-77533);
                                                                                                {
                                                                                                    GLF_live21iterationCap += 1;
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                        } else {
                                                                                            GLF_live6d--;
                                                                                        }
                                                                                        {
                                                                                            float GLF_live16pab = _GLF_FUZZED((1.4 * 9.2));
                                                                                            float GLF_live16pbc = _GLF_FUZZED(144.024);
                                                                                            if (!((GLF_live16pab < 0.0 && GLF_live16pbc < 0.0) || (GLF_live16pab >= 0.0 && GLF_live16pbc >= 0.0))) {
                                                                                                ;
                                                                                            }
                                                                                        }
                                                                                        do {
                                                                                            GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y) * 16, 256)] = 1;
                                                                                            {
                                                                                                {
                                                                                                    ;
                                                                                                }
                                                                                            }
                                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                                                        GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x + 1) + (GLF_live6p.y) * 16, 256)] = 1;
                                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                        } else {
                                                                                            GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x + 2) + (GLF_live6p.y) * 16, 256)] = 1;
                                                                                        }
                                                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                                                            do {
                                                                                                if (_GLF_DEAD(false)) {
                                                                                                    _GLF_color = sqrt(vec4(uv, 5626.9694, 8293.9916));
                                                                                                }
                                                                                                {
                                                                                                    int GLF_live23looplimiter0 = 0;
                                                                                                    if (GLF_live23looplimiter0 >= 4) {
                                                                                                        ;
                                                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                                                                            _GLF_color = (GLF_live6_GLF_color / _GLF_color);
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                                GLF_live6p.x += 2;
                                                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0)))));
                                                                                        }
                                                                                    }
                                                                                    {
                                                                                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(474.871, -93.21));
                                                                                        vec4 GLF_live22res = _GLF_FUZZED(((vec4(7509.3236, -857.946, 80.68, 7.1) * (-109.461)) - 100.028));
                                                                                        {
                                                                                            GLF_live22res = texture(GLF_live22tex, GLF_live22coord);
                                                                                        }
                                                                                    }
                                                                                }
                                                                                do {
                                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                    } else {
                                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, true && (false)))) {
                                                                                        } else {
                                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                                _GLF_color = vec4(3.0, 542.027, 127.338, 5.2);
                                                                                            }
                                                                                            if (GLF_live6d >= 0 && GLF_live6p.y < 14 && GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y + 2) * 16, 256)] == 0) {
                                                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                } else {
                                                                                                    do {
                                                                                                        GLF_live6d--;
                                                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                                                }
                                                                                                {
                                                                                                    float GLF_live16pab = _GLF_FUZZED(-37.84);
                                                                                                    float GLF_live16pbc = _GLF_FUZZED(vec4(-7.0, -1441.2157, -859.342, -7.9).r);
                                                                                                    if (!((GLF_live16pab < 0.0 && GLF_live16pbc < 0.0) || (GLF_live16pab >= 0.0 && GLF_live16pbc >= 0.0))) {
                                                                                                        ;
                                                                                                    }
                                                                                                }
                                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                    GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y) * 16, 256)] = 1;
                                                                                                } else {
                                                                                                }
                                                                                                GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y + 1) * 16, 256)] = 1;
                                                                                                GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y + 2) * 16, 256)] = 1;
                                                                                                {
                                                                                                    int GLF_live9baseIndex = _GLF_FUZZED(((-13796) * 17298));
                                                                                                    do {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                            do {
                                                                                                                GLF_live9baseIndex = GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex;
                                                                                                                do {
                                                                                                                    vec2 GLF_live18coord = _GLF_FUZZED(vec4(-9772.5590, -163.498, -6.6, 1.4).pq);
                                                                                                                    float GLF_live18h = _GLF_FUZZED(8.8);
                                                                                                                    if (_GLF_DEAD(false)) {
                                                                                                                        _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                                                                                                    }
                                                                                                                    int GLF_live18i = _GLF_FUZZED(((-28443) - 53752));
                                                                                                                    int GLF_live18looplimiter0 = 0;
                                                                                                                    float GLF_live18refh = _GLF_FUZZED(float(ivec2(-81094, -43309).r));
                                                                                                                    float GLF_live18slope = _GLF_FUZZED(2.0);
                                                                                                                    vec2 GLF_live18uvstep = _GLF_FUZZED(vec2(-4.4, 7007.5098));
                                                                                                                    {
                                                                                                                        {
                                                                                                                            {
                                                                                                                                ;
                                                                                                                            }
                                                                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                                                                _GLF_color = unpackSnorm4x8(141393u);
                                                                                                                            }
                                                                                                                        }
                                                                                                                        if (GLF_live18looplimiter0 >= 4) {
                                                                                                                            ;
                                                                                                                        }
                                                                                                                        GLF_live18looplimiter0++;
                                                                                                                        {
                                                                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                            } else {
                                                                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                                                    GLF_live18coord -= GLF_live18uvstep;
                                                                                                                                } else {
                                                                                                                                }
                                                                                                                            }
                                                                                                                            GLF_live18refh += GLF_live18slope;
                                                                                                                            GLF_live18h = texture(GLF_live18tex, GLF_live18coord).y;
                                                                                                                            GLF_live18i++;
                                                                                                                        }
                                                                                                                    }
                                                                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                                                        } else {
                                                                                                        }
                                                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                        } else {
                                                                                                            ;
                                                                                                        }
                                                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                                                }
                                                                                                if (_GLF_DEAD(false)) {
                                                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                                    } else {
                                                                                                        _GLF_color = min(fract(GLF_live6_GLF_color), (GLF_live10b_b / (-3.7)));
                                                                                                    }
                                                                                                }
                                                                                                for (int _injected_loop_counter = ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), clamp(int(6), _GLF_IDENTITY(int(6), int(ivec2(int(6), 1))), int(6))))) >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), int(int(_GLF_IDENTITY(int(6), clamp(int(6), int(6), int(6)))))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                                    if (_GLF_DEAD(false)) {
                                                                                                        _GLF_color = GLF_live19gl_FragCoord;
                                                                                                    }
                                                                                                }
                                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                    GLF_live6p.y += 2;
                                                                                                } else {
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                                if (_GLF_DEAD(false)) {
                                                                                    _GLF_color = mix(vec4(GLF_live10resolution, GLF_live10resolution), _GLF_color, GLF_live6_GLF_color);
                                                                                }
                                                                            }
                                                                        } else {
                                                                        }
                                                                        do {
                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                {
                                                                                    {
                                                                                        ;
                                                                                    }
                                                                                }
                                                                            } else {
                                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                } else {
                                                                                    if (GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6ipos.y * 16 + GLF_live6ipos.x, 256)] == 1) {
                                                                                        GLF_live6_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                            _GLF_color = GLF_live19gl_FragCoord;
                                                                                        }
                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                            } else {
                                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                        ;
                                                                                                    } else {
                                                                                                    }
                                                                                                } else {
                                                                                                }
                                                                                            }
                                                                                        } else {
                                                                                        }
                                                                                        {
                                                                                            int GLF_live23looplimiter2 = 0;
                                                                                            int GLF_live23sum = _GLF_FUZZED(-45145);
                                                                                            for (int GLF_live23target = 0; GLF_live23target < 20; GLF_live23target++) {
                                                                                                if (GLF_live23looplimiter2 >= 4) {
                                                                                                    break;
                                                                                                }
                                                                                                GLF_live23looplimiter2++;
                                                                                                {
                                                                                                    int GLF_live23result = GLF_live23search(GLF_live23target);
                                                                                                    if (GLF_live23result > 0) {
                                                                                                        GLF_live23sum += GLF_live23result;
                                                                                                    } else {
                                                                                                        switch (GLF_live23result) {
                                                                                                            case -1:
                                                                                                                GLF_live23sum += 1;
                                                                                                                break;
                                                                                                            case 0:
                                                                                                                ;
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                                if (_GLF_DEAD(false)) {
                                                                                                    _GLF_color = GLF_live12_GLF_color;
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                                {
                                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                    } else {
                                                                                        ;
                                                                                    }
                                                                                }
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                {
                                                                    float GLF_live21c_im = _GLF_FUZZED(0.3);
                                                                    float GLF_live21c_re = _GLF_FUZZED(-2425.6018);
                                                                    int GLF_live21iteration = _GLF_FUZZED(14482);
                                                                    int GLF_live21k = _GLF_FUZZED(ivec4(25120, 24253, 19350, -6251).y);
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = (vec4(-385.908, -30.60, -4140.6197, -1.1));
                                                                    }
                                                                    float GLF_live21x = _GLF_FUZZED(float(-21926));
                                                                    float GLF_live21y = _GLF_FUZZED((+10.82));
                                                                    {
                                                                        if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 4.0) {
                                                                            ;
                                                                        }
                                                                        float GLF_live21x_new = GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y + GLF_live21c_re;
                                                                        GLF_live21y = 2.0 * GLF_live21x * GLF_live21y + GLF_live21c_im;
                                                                        GLF_live21x = GLF_live21x_new;
                                                                        GLF_live21iteration++;
                                                                        GLF_live21k++;
                                                                    }
                                                                }
                                                                {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = step(_GLF_color, vec4(542.735, 72.32, 8550.1562, -7.8));
                                                                }
                                                                if (int(gl_FragCoord.y) < 140) {
                                                                    col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                                                } else if (int(gl_FragCoord.y) < 160) {
                                                                    col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            _GLF_color = vec4(-6.9, -48.92, -2.9, -0.2);
                                                                        }
                                                                    }
                                                                } else {
                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    } else {
                                                                        {
                                                                            float GLF_live15result = _GLF_FUZZED(7.2);
                                                                            {
                                                                                GLF_live15result += 100.0;
                                                                            }
                                                                        }
                                                                        {
                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                            } else {
                                                                                ;
                                                                            }
                                                                        }
                                                                    }
                                                                    if (int(gl_FragCoord.y) < 180) {
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = _GLF_color;
                                                                        }
                                                                        {
                                                                            int GLF_live12count = _GLF_FUZZED(((+53884) + 44654));
                                                                            if (GLF_live12count == 20) {
                                                                                {
                                                                                    int GLF_live20looplimiter3 = 0;
                                                                                    if (GLF_live20looplimiter3 >= 3) {
                                                                                        ;
                                                                                    }
                                                                                }
                                                                                GLF_live12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                                            } else {
                                                                                GLF_live12_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                                                                            }
                                                                        }
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            for (int _injected_loop_counter = (0 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & (int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ 1))); _injected_loop_counter++) {
                                                                                int GLF_live15i = _GLF_FUZZED(23191);
                                                                                float GLF_live15result = _GLF_FUZZED(-2.3);
                                                                                float GLF_live15thirty_two = _GLF_FUZZED((+46.35));
                                                                                if ((GLF_live15i % 32) == 0) {
                                                                                    GLF_live15result += 0.4;
                                                                                } else {
                                                                                    if (mod(float(GLF_live15i), round(GLF_live15thirty_two)) <= 0.01) {
                                                                                        do {
                                                                                            GLF_live15result += 100.0;
                                                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                                                    }
                                                                                }
                                                                                {
                                                                                    {
                                                                                        ;
                                                                                    }
                                                                                }
                                                                            }
                                                                            for (int _injected_loop_counter = (1 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[44] / resolution.x + 50.0, 22.0));
                                                                            }
                                                                            {
                                                                                {
                                                                                    int GLF_live19i = _GLF_FUZZED(66683);
                                                                                    int GLF_live19looplimiter5 = 0;
                                                                                    do {
                                                                                        if (GLF_live19looplimiter5 >= 3) {
                                                                                            break;
                                                                                        }
                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                            GLF_live19looplimiter5++;
                                                                                        } else {
                                                                                        }
                                                                                        {
                                                                                            switch (GLF_live19i) {
                                                                                                case 0:
                                                                                                    {
                                                                                                        {
                                                                                                            ;
                                                                                                        }
                                                                                                    }
                                                                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 4;
                                                                                                    break;
                                                                                                case 1:
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                                        GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 3;
                                                                                                    } else {
                                                                                                    }
                                                                                                    break;
                                                                                                case 2:
                                                                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 2;
                                                                                                    break;
                                                                                                case 3:
                                                                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 1;
                                                                                                    break;
                                                                                                case 4:
                                                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                        {
                                                                                                            int GLF_live22looplimiter0 = 0;
                                                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                                                _GLF_color = GLF_live19gl_FragCoord;
                                                                                                            }
                                                                                                            if (GLF_live22looplimiter0 >= 3) {
                                                                                                                ;
                                                                                                            }
                                                                                                        }
                                                                                                    } else {
                                                                                                        GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 0;
                                                                                                    }
                                                                                                    break;
                                                                                                case 5:
                                                                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -1;
                                                                                                    break;
                                                                                                case 6:
                                                                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -2;
                                                                                                    break;
                                                                                                case 7:
                                                                                                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                                                        GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -3;
                                                                                                    }
                                                                                                    break;
                                                                                                case 8:
                                                                                                    if (_GLF_DEAD(false)) {
                                                                                                        _GLF_color = sign(_GLF_color);
                                                                                                    }
                                                                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -4;
                                                                                                    break;
                                                                                                case 9:
                                                                                                    GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -5;
                                                                                                    break;
                                                                                            }
                                                                                            GLF_live19i++;
                                                                                        }
                                                                                    } while (GLF_live19i < 10);
                                                                                }
                                                                                {
                                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                                        ;
                                                                                    }
                                                                                }
                                                                            }
                                                                        } else {
                                                                        }
                                                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                            int GLF_live11i = _GLF_FUZZED(int(false));
                                                                            int GLF_live11j = _GLF_FUZZED(-16220);
                                                                            vec3 GLF_live11m = _GLF_FUZZED(vec3(-4.7, -7.2, -4.3));
                                                                            vec2 GLF_live11n = _GLF_FUZZED(vec3(0.9, 7429.9482, -6.6).xy);
                                                                            do {
                                                                                vec2 GLF_live11g = vec2(float(GLF_live11j), float(GLF_live11i));
                                                                                vec2 GLF_live11o = mix(GLF_live11n, GLF_live11g, 0.2);
                                                                                if (GLF_live11injectionSwitch.x < (GLF_live11m.x)) {
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        int GLF_live13looplimiter1 = 0;
                                                                                        {
                                                                                            vec2 GLF_live18coord = _GLF_FUZZED(vec2(-0.7));
                                                                                            float GLF_live18h = _GLF_FUZZED(-909.917);
                                                                                            int GLF_live18i = _GLF_FUZZED((true ? ivec3(-96348, 70163, 29684).g : (-41422)));
                                                                                            int GLF_live18looplimiter0 = 0;
                                                                                            float GLF_live18refh = _GLF_FUZZED(-0.0);
                                                                                            float GLF_live18slope = _GLF_FUZZED(float(43394u));
                                                                                            vec2 GLF_live18uvstep = _GLF_FUZZED(vec2(671.159, 8428.5107));
                                                                                            while (GLF_live18h < GLF_live18refh && GLF_live18i < 32) {
                                                                                                if (GLF_live18looplimiter0 >= 4) {
                                                                                                    break;
                                                                                                }
                                                                                                GLF_live18looplimiter0++;
                                                                                                {
                                                                                                    GLF_live18coord -= GLF_live18uvstep;
                                                                                                    GLF_live18refh += GLF_live18slope;
                                                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                                    } else {
                                                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                        } else {
                                                                                                            GLF_live18h = texture(GLF_live18tex, GLF_live18coord).y;
                                                                                                        }
                                                                                                    }
                                                                                                    GLF_live18i++;
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        if (GLF_live13looplimiter1 >= 6) {
                                                                                            ;
                                                                                        }
                                                                                    } else {
                                                                                    }
                                                                                    int GLF_live11k = 1;
                                                                                    {
                                                                                        int GLF_live11looplimiter0 = 0;
                                                                                        {
                                                                                            vec2 GLF_live14a = _GLF_FUZZED((((-4.9) * vec2(-0.5, 391.110)) * (-7.3)));
                                                                                            float GLF_live14z = _GLF_FUZZED(7892.0079);
                                                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 | 0)); _injected_loop_counter--) {
                                                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                                                                } else {
                                                                                                    GLF_live14z = GLF_live14a.y / GLF_live14a.x;
                                                                                                }
                                                                                            }
                                                                                            {
                                                                                                int GLF_live18looplimiter0 = 0;
                                                                                                if (GLF_live18looplimiter0 >= 4) {
                                                                                                    ;
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        {
                                                                                            int GLF_live21looplimiter2 = 0;
                                                                                            if (GLF_live21looplimiter2 >= 4) {
                                                                                                ;
                                                                                            }
                                                                                        }
                                                                                        while (GLF_live11k >= 0) {
                                                                                            if (GLF_live11looplimiter0 >= 6) {
                                                                                                break;
                                                                                            }
                                                                                            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, true && (false))))))) {
                                                                                                _GLF_color = GLF_live19gl_FragCoord;
                                                                                            }
                                                                                            GLF_live11looplimiter0++;
                                                                                            do {
                                                                                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                                                    GLF_live11o = GLF_live11o + GLF_live11o;
                                                                                                }
                                                                                                GLF_live11k--;
                                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                                        }
                                                                                    }
                                                                                    GLF_live11m = vec3(GLF_live11injectionSwitch.x, cos(GLF_live11o));
                                                                                }
                                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                                        }
                                                                        {
                                                                            vec2 GLF_live18coord = _GLF_FUZZED((false ? (vec2(-2.0, 9.6) * 96.33) : (vec2(1238.2803, -9168.8117) + vec2(5.3, -5.2))));
                                                                            {
                                                                                {
                                                                                    ;
                                                                                }
                                                                            }
                                                                            float GLF_live18h = _GLF_FUZZED(float(-3807));
                                                                            int GLF_live18i = _GLF_FUZZED(90854);
                                                                            float GLF_live18refh = _GLF_FUZZED(508.467);
                                                                            float GLF_live18slope = _GLF_FUZZED(vec3(-89.92, 2.6, -336.991).r);
                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                            } else {
                                                                                if (_GLF_DEAD(false)) {
                                                                                    _GLF_color = mat2x4(-1.7, 8.4, -1.6, 5.7, -0.0, -29.60, -416.637, -8959.3289)[1];
                                                                                }
                                                                            }
                                                                            vec2 GLF_live18uvstep = _GLF_FUZZED(vec2(-692.468, -4.5));
                                                                            if (_GLF_DEAD(false)) {
                                                                                _GLF_color = (GLF_merged2_0_2_1_2_2_2cuv - GLF_live10b_b);
                                                                            }
                                                                            {
                                                                                GLF_live18coord -= GLF_live18uvstep;
                                                                                GLF_live18refh += GLF_live18slope;
                                                                                GLF_live18h = texture(GLF_live18tex, GLF_live18coord).y;
                                                                                GLF_live18i++;
                                                                            }
                                                                        }
                                                                    } else {
                                                                        do {
                                                                            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                } else {
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                                                                    }
                                                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 ^ 1)); _injected_loop_counter--) {
                                                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                                                        {
                                                                                                            {
                                                                                                                float GLF_live23v = _GLF_FUZZED(8321.8641);
                                                                                                                if (GLF_live23v < 4.0) {
                                                                                                                    ;
                                                                                                                }
                                                                                                            }
                                                                                                            GLF_live16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                                                                        }
                                                                                                    }
                                                                                                } else {
                                                                                                    if (int(gl_FragCoord.y) < 200) {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                                            do {
                                                                                                                col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[49] / resolution.x + 50.0, 22.0));
                                                                                                            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, true && (false))));
                                                                                                        } else {
                                                                                                        }
                                                                                                        {
                                                                                                            int GLF_live6i = _GLF_FUZZED(int((3818u)));
                                                                                                            {
                                                                                                                {
                                                                                                                    ;
                                                                                                                }
                                                                                                            }
                                                                                                            {
                                                                                                                int GLF_live19i = _GLF_FUZZED(-44703);
                                                                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                                                } else {
                                                                                                                    int GLF_live19looplimiter5 = 0;
                                                                                                                    do {
                                                                                                                        if (GLF_live19looplimiter5 >= 3) {
                                                                                                                            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                                                                                                                do {
                                                                                                                                    _GLF_color = GLF_live6_GLF_color;
                                                                                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                                                                            }
                                                                                                                            break;
                                                                                                                        }
                                                                                                                        GLF_live19looplimiter5++;
                                                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                                                                                switch (GLF_live19i) {
                                                                                                                                    case 0:
                                                                                                                                        GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 4;
                                                                                                                                        break;
                                                                                                                                    case 1:
                                                                                                                                        GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 3;
                                                                                                                                        break;
                                                                                                                                    case 2:
                                                                                                                                        {
                                                                                                                                            int GLF_live21iteration = _GLF_FUZZED(35249);
                                                                                                                                            int GLF_live21iterationCap = _GLF_FUZZED((37728 * (-56416)));
                                                                                                                                            float GLF_live21xCoord = _GLF_FUZZED((-8.0));
                                                                                                                                            float GLF_live21yCoord = _GLF_FUZZED((vec3(-509.292, -97.17, -9.2) * mat2x3(-224.765, -682.744, -1.6, -4.0, -0.6, 462.920)).s);
                                                                                                                                            if (GLF_live21iteration < bitfieldInsert(GLF_live21iterationCap, 0, 0, 0)) {
                                                                                                                                                ;
                                                                                                                                            } else {
                                                                                                                                                ;
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                        GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 2;
                                                                                                                                        break;
                                                                                                                                    case 3:
                                                                                                                                        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                                                                            GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 1;
                                                                                                                                        }
                                                                                                                                        break;
                                                                                                                                    case 4:
                                                                                                                                        GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = 0;
                                                                                                                                        break;
                                                                                                                                    case 5:
                                                                                                                                        GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -1;
                                                                                                                                        break;
                                                                                                                                    case 6:
                                                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                                                            do {
                                                                                                                                                GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -2;
                                                                                                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                                                                                                        } else {
                                                                                                                                        }
                                                                                                                                        break;
                                                                                                                                    case 7:
                                                                                                                                        GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -3;
                                                                                                                                        break;
                                                                                                                                    case 8:
                                                                                                                                        GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -4;
                                                                                                                                        break;
                                                                                                                                    case 9:
                                                                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                                                                            GLF_live19data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 10)] = -5;
                                                                                                                                        } else {
                                                                                                                                        }
                                                                                                                                        break;
                                                                                                                                }
                                                                                                                            }
                                                                                                                            GLF_live19i++;
                                                                                                                        } else {
                                                                                                                        }
                                                                                                                    } while (GLF_live19i < 10);
                                                                                                                }
                                                                                                            }
                                                                                                            {
                                                                                                                int GLF_live23looplimiter0 = 0;
                                                                                                                if (GLF_live23looplimiter0 >= 4) {
                                                                                                                    ;
                                                                                                                }
                                                                                                            }
                                                                                                            {
                                                                                                                int GLF_live6looplimiter0 = 0;
                                                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                                                                _GLF_color = fract(_GLF_color);
                                                                                                                            } else {
                                                                                                                            }
                                                                                                                        } else {
                                                                                                                        }
                                                                                                                    }
                                                                                                                    {
                                                                                                                        int GLF_live23looplimiter1 = 0;
                                                                                                                        if (GLF_live23looplimiter1 >= 4) {
                                                                                                                            ;
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                } else {
                                                                                                                    for (GLF_live6i = 0; GLF_live6i < 16 * 16; GLF_live6i++) {
                                                                                                                        if (GLF_live6looplimiter0 >= 4) {
                                                                                                                            break;
                                                                                                                        }
                                                                                                                        {
                                                                                                                            float GLF_live14th = _GLF_FUZZED(8766.8017);
                                                                                                                            if (_GLF_DEAD(false)) {
                                                                                                                                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                                                                                                            }
                                                                                                                            {
                                                                                                                                int GLF_live21iteration = _GLF_FUZZED((true ? (-63780) : (ivec3(-23603, -43651, 19950).y + 14747)));
                                                                                                                                {
                                                                                                                                    ;
                                                                                                                                }
                                                                                                                            }
                                                                                                                            vec2 GLF_live14v = _GLF_FUZZED(vec2(-0.5, 791.645));
                                                                                                                            if (GLF_live14v.y < 0.0) {
                                                                                                                                GLF_live14th = -GLF_live14th;
                                                                                                                            }
                                                                                                                        }
                                                                                                                        do {
                                                                                                                            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                                                                                GLF_live6looplimiter0++;
                                                                                                                            }
                                                                                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                            } else {
                                                                                                                                _GLF_color = atanh(_GLF_color);
                                                                                                                                {
                                                                                                                                    int GLF_live23baseIndex = _GLF_FUZZED(ivec4(-23386, 80373, 5145, -46433).w);
                                                                                                                                    int GLF_live23data = _GLF_FUZZED(-97380);
                                                                                                                                    int GLF_live23treeIndex = _GLF_FUZZED(int(true));
                                                                                                                                    {
                                                                                                                                        int GLF_live23looplimiter0 = 0;
                                                                                                                                        while (GLF_live23baseIndex <= GLF_live23treeIndex) {
                                                                                                                                            if (GLF_live23looplimiter0 >= 4) {
                                                                                                                                                break;
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
                                                                                                                                                        continue;
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
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                            {
                                                                                                                                vec2 GLF_live22coord = _GLF_FUZZED((-vec2(857.692, 2.7)));
                                                                                                                                int GLF_live22i = _GLF_FUZZED(41508);
                                                                                                                                {
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
                                                                                                                                            GLF_live22i++;
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                        {
                                                                                                                            GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 256)] = 0;
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    } else {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                                                {
                                                                                                                    float GLF_live19grey = _GLF_FUZZED(7542.9561);
                                                                                                                    {
                                                                                                                        GLF_live19grey = 0.5 + float(GLF_live19data[1]) / 10.0;
                                                                                                                    }
                                                                                                                }
                                                                                                                discard;
                                                                                                            }
                                                                                                        } else {
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                            do {
                                                                                                int GLF_live12baseIndex = _GLF_FUZZED(-13334);
                                                                                                int GLF_live12data = _GLF_FUZZED((97085 ^ 84574));
                                                                                                int GLF_live12looplimiter0 = 0;
                                                                                                int GLF_live12treeIndex = _GLF_FUZZED(68988);
                                                                                                {
                                                                                                    do {
                                                                                                        if (GLF_live12looplimiter0 >= 5) {
                                                                                                            ;
                                                                                                        }
                                                                                                    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, false || (false))));
                                                                                                    {
                                                                                                        int GLF_live18looplimiter0 = 0;
                                                                                                        if (GLF_live18looplimiter0 >= 4) {
                                                                                                            ;
                                                                                                        }
                                                                                                    }
                                                                                                    do {
                                                                                                        GLF_live12looplimiter0++;
                                                                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                                        {
                                                                                                            vec2 GLF_live22coord = _GLF_FUZZED(((vec3(660.058, 329.422, 5106.6371) * 9.3).rr + vec2(783.798, 4.6)));
                                                                                                            int GLF_live22i = _GLF_FUZZED(((~(-55143))));
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
                                                                                                                    GLF_live22i++;
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                            if (GLF_live12data <= GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].data) {
                                                                                                                if (GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].leftIndex == -1) {
                                                                                                                    GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].leftIndex = GLF_live12treeIndex;
                                                                                                                    GLF_live12makeTreeNode(GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12treeIndex, 10)], GLF_live12data);
                                                                                                                    do {
                                                                                                                        ;
                                                                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                                                                } else {
                                                                                                                    GLF_live12baseIndex = GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].leftIndex;
                                                                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                                                            _GLF_color = GLF_live16_GLF_color;
                                                                                                                        }
                                                                                                                        ;
                                                                                                                    }
                                                                                                                }
                                                                                                            } else {
                                                                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                                                    if (GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].rightIndex == -1) {
                                                                                                                        {
                                                                                                                            vec2 GLF_live22coord = _GLF_FUZZED(((mat4x2(7.5, 0.9, -5.1, 2.7, -0.9, 8.1, 6.6, 239.925) * vec4(4.1, -3640.6201, -26.61, -3.7)) * vec2(-6.1, 441.625)));
                                                                                                                            vec4 GLF_live22res = _GLF_FUZZED((mat3x4(1.1, 872.222, 3119.4807, -386.294, 4.4, 458.527, 493.698, -3.1, -5.7, 6908.0169, 27.07, 5.0) * vec3(-9.5, -23.12, -7200.2938)));
                                                                                                                            {
                                                                                                                                GLF_live22res = texture(GLF_live22tex, GLF_live22coord);
                                                                                                                            }
                                                                                                                        }
                                                                                                                        GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].rightIndex = GLF_live12treeIndex;
                                                                                                                        {
                                                                                                                            int GLF_live23baseIndex = _GLF_FUZZED((7771 + 85017));
                                                                                                                            int GLF_live23data = _GLF_FUZZED(((+ivec3(-4192, -39713, -36411)).r ^ 18314));
                                                                                                                            int GLF_live23treeIndex = _GLF_FUZZED((-54725));
                                                                                                                            {
                                                                                                                                int GLF_live23looplimiter0 = 0;
                                                                                                                                while (GLF_live23baseIndex <= GLF_live23treeIndex) {
                                                                                                                                    if (GLF_live23looplimiter0 >= 4) {
                                                                                                                                        break;
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
                                                                                                                                                continue;
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
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                        GLF_live12makeTreeNode(GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12treeIndex, 10)], GLF_live12data);
                                                                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                        } else {
                                                                                                                            ;
                                                                                                                        }
                                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                                            for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(8), int(8))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                                                                                if (_GLF_DEAD(false)) {
                                                                                                                                    _GLF_color = fract(GLF_live12_GLF_color);
                                                                                                                                }
                                                                                                                            }
                                                                                                                        } else {
                                                                                                                        }
                                                                                                                    } else {
                                                                                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter++) {
                                                                                                                            GLF_live12baseIndex = GLF_live12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12baseIndex, 10)].rightIndex;
                                                                                                                        }
                                                                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                        } else {
                                                                                                                            ;
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        } else {
                                                                                                        }
                                                                                                    } else {
                                                                                                    }
                                                                                                    {
                                                                                                        float GLF_live21c_im = _GLF_FUZZED(float(true));
                                                                                                        float GLF_live21c_re = _GLF_FUZZED(54.40);
                                                                                                        int GLF_live21iteration = _GLF_FUZZED(-30017);
                                                                                                        int GLF_live21k = _GLF_FUZZED(((-5706) & 71744));
                                                                                                        int GLF_live21looplimiter0 = 0;
                                                                                                        float GLF_live21x = _GLF_FUZZED(float(67251u));
                                                                                                        float GLF_live21y = _GLF_FUZZED(8.2);
                                                                                                        {
                                                                                                            if (GLF_live21looplimiter0 >= 4) {
                                                                                                                ;
                                                                                                            }
                                                                                                            GLF_live21looplimiter0++;
                                                                                                            {
                                                                                                                if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 4.0) {
                                                                                                                    ;
                                                                                                                    if (_GLF_DEAD(false)) {
                                                                                                                        _GLF_color = GLF_live6_GLF_color;
                                                                                                                    }
                                                                                                                }
                                                                                                                float GLF_live21x_new = GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y + GLF_live21c_re;
                                                                                                                GLF_live21y = 2.0 * GLF_live21x * GLF_live21y + GLF_live21c_im;
                                                                                                                GLF_live21x = GLF_live21x_new;
                                                                                                                GLF_live21iteration++;
                                                                                                                GLF_live21k++;
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                                        } else {
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                                    }
                                                                }
                                                                {
                                                                    int GLF_live22looplimiter0 = 0;
                                                                    if (GLF_live22looplimiter0 >= 3) {
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                                                            } else {
                                                            }
                                                            {
                                                                vec2 GLF_live16pos = _GLF_FUZZED((-(306.030 - vec2(-1723.8323, -6715.4049))));
                                                                if (GLF_live16pointInTriangle(GLF_live16pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                    } else {
                                                                        GLF_live16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                                    }
                                                                } else {
                                                                    GLF_live16_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                                                }
                                                            }
                                                        }
                                                        for (int _injected_loop_counter = _GLF_IDENTITY(0, 0 | (0)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                            do {
                                                                int GLF_live13looplimiter1 = 0;
                                                                if (GLF_live13looplimiter1 >= 6) {
                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                    } else {
                                                                        ;
                                                                    }
                                                                }
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                        }
                                                        {
                                                            int GLF_live23result = _GLF_FUZZED((+(73880 - ((-36836) ^ 52459))));
                                                            int GLF_live23sum = _GLF_FUZZED(-1675);
                                                            if (GLF_live23result > 0) {
                                                                GLF_live23sum += GLF_live23result;
                                                            } else {
                                                                switch (GLF_live23result) {
                                                                    case -1:
                                                                        GLF_live23sum += 1;
                                                                        break;
                                                                    case 0:
                                                                        ;
                                                                }
                                                            }
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                } else {
                                                }
                                            }
                                        } else {
                                        }
                                    }
                                } else {
                                }
                            }
                        } else {
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                    {
                        float GLF_live23v = _GLF_FUZZED(956.409);
                        if (GLF_live23v < 4.0) {
                            ;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        {
                            {
                                ;
                            }
                        }
                        _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                    } else {
                    }
                }
            }
        } else {
        }
    }
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        } else {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bool(true))))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = abs(_GLF_color);
                    }
                    {
                        ;
                        if (_GLF_DEAD(false)) {
                            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                _GLF_color = GLF_live12_GLF_color;
                            }
                        }
                    }
                } else {
                }
            } else {
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                do {
                    _GLF_color = vec4(col, 1.0);
                } while (_GLF_WRAPPED_LOOP(false));
            } else {
            }
            do {
                float GLF_live19grey = _GLF_FUZZED(-2.3);
                {
                    if (int(GLF_live19gl_FragCoord[1]) < 210) {
                        GLF_live19grey = 0.5 + float(GLF_live19data[6]) / 10.0;
                    } else {
                        if (int(GLF_live19gl_FragCoord[1]) < 240) {
                            for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), clamp(int(2), int(2), int(2))))) >> _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                GLF_live19grey = 0.5 + float(GLF_live19data[7]) / 10.0;
                                {
                                    int GLF_live23looplimiter2 = 0;
                                    int GLF_live23sum = _GLF_FUZZED(47735);
                                    for (int GLF_live23target = 0; GLF_live23target < 20; GLF_live23target++) {
                                        if (GLF_live23looplimiter2 >= 4) {
                                            break;
                                        }
                                        GLF_live23looplimiter2++;
                                        {
                                            int GLF_live23result = GLF_live23search(GLF_live23target);
                                            if (GLF_live23result > 0) {
                                                GLF_live23sum += GLF_live23result;
                                            } else {
                                                switch (GLF_live23result) {
                                                    case -1:
                                                        GLF_live23sum += 1;
                                                        break;
                                                    case 0:
                                                        ;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (_GLF_IDENTITY(1, (1) | 0) | 1)); _injected_loop_counter++) {
                                if (int(GLF_live19gl_FragCoord[1]) < 270) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            GLF_live19grey = 0.5 + float(GLF_live19data[8]) / 10.0;
                                        } else {
                                        }
                                    } else {
                                    }
                                } else {
                                    ;
                                }
                            }
                        }
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
}
