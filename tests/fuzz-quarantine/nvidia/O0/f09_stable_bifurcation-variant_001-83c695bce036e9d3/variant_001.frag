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

vec4 GLF_dead16_GLF_color = _GLF_FUZZED(vec4(-8245.5724, -14.77, -4.3, -5.6));

struct GLF_dead16BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead16BST GLF_dead16tree[10] = GLF_dead16BST[10](GLF_dead16BST(0, 0, 0), GLF_dead16BST(0, 0, 0), GLF_dead16BST(0, 0, 0), GLF_dead16BST(0, 0, 0), GLF_dead16BST(0, 0, 0), GLF_dead16BST(0, 0, 0), GLF_dead16BST(0, 0, 0), GLF_dead16BST(0, 0, 0), GLF_dead16BST(0, 0, 0), GLF_dead16BST(0, 0, 0));

void GLF_dead16makeTreeNode(inout GLF_dead16BST GLF_dead16tree, int GLF_dead16data) {
    GLF_dead16tree.data = GLF_dead16data;
    GLF_dead16tree.leftIndex = -1;
    GLF_dead16tree.rightIndex = -1;
}

int GLF_dead16search(int GLF_dead16target) {
    GLF_dead16BST GLF_dead16currentNode = GLF_dead16BST(0, 0, 0);
    int GLF_dead16index = 0;
    while (GLF_dead16index != -1) {
        GLF_dead16currentNode = GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead16index, 10)];
        if (GLF_dead16currentNode.data == GLF_dead16target) {
            return GLF_dead16target;
        }
        GLF_dead16index = GLF_dead16target > GLF_dead16currentNode.data ? GLF_dead16currentNode.rightIndex : GLF_dead16currentNode.leftIndex;
    }
    return -1;
}

vec4 GLF_dead12_GLF_color = _GLF_FUZZED(vec4(vec3(-8119.2388, 69.64, 832.675), -2.9));
int GLF_dead12map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
const int GLF_dead11dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
layout(set = 0, binding = 2) uniform sampler2D GLF_dead9tex;

struct GLF_dead8BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead8BST GLF_dead8tree[10] = GLF_dead8BST[10](GLF_dead8BST(0, 0, 0), GLF_dead8BST(0, 0, 0), GLF_dead8BST(0, 0, 0), GLF_dead8BST(0, 0, 0), GLF_dead8BST(0, 0, 0), GLF_dead8BST(0, 0, 0), GLF_dead8BST(0, 0, 0), GLF_dead8BST(0, 0, 0), GLF_dead8BST(0, 0, 0), GLF_dead8BST(0, 0, 0));

void GLF_dead8makeTreeNode(inout GLF_dead8BST GLF_dead8tree, int GLF_dead8data) {
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(injectionSwitch);
        vec4 donor_replacementGLF_dead9texel = _GLF_FUZZED(vec4(-9.8, -3777.3384, -4.7, 83.06));
        {
            donor_replacementGLF_dead9coord = donor_replacementGLF_dead9texel.xz + donor_replacementGLF_dead9texel.yy;
            donor_replacementGLF_dead9coord = floor(donor_replacementGLF_dead9coord * 256.0) / 256.0;
            donor_replacementGLF_dead9texel = texture(GLF_dead9tex, donor_replacementGLF_dead9coord);
            GLF_dead8data++;
        }
    }
    GLF_dead8tree.data = GLF_dead8data;
    GLF_dead8tree.leftIndex = -1;
    GLF_dead8tree.rightIndex = -1;
}

int GLF_dead8search(int GLF_dead8target) {
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        vec3 donor_replacementGLF_dead10c = _GLF_FUZZED(log2(vec3(6040.8679, 9.8, -75.87)));
        if (donor_replacementGLF_dead10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8target, 3)] >= 1.0) {
            donor_replacementGLF_dead10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8target, 3)] = donor_replacementGLF_dead10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8target, 3)] * donor_replacementGLF_dead10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8target, 3)];
        }
    }
    GLF_dead8BST GLF_dead8currentNode = GLF_dead8BST(0, 0, 0);
    int GLF_dead8index = 0;
    while (GLF_dead8index != -1) {
        for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
            GLF_dead8currentNode = GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8index, 10)];
        }
        if (GLF_dead8currentNode.data == GLF_dead8target) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    for (int GLF_dead14i = 0; GLF_dead14i < 3; GLF_dead14i++) {
                        if (GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)] >= 1.0) {
                            GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)] = GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)] * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)];
                        }
                    }
                }
                return GLF_dead8target;
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    ivec2 donor_replacementGLF_dead11pos = _GLF_FUZZED((ivec2(-25594, -37054) / ivec2(-71321, -69414)));
                    if (donor_replacementGLF_dead11pos.x < GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)] + 15 && donor_replacementGLF_dead11pos.x > GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)] - 15) {
                        float GLF_dead11p = (15.0 - abs(float(donor_replacementGLF_dead11pos.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)]))) / 15.0;
                        ;
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            bool donor_replacementGLF_dead12canwalk = _GLF_FUZZED(true);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                if (GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8index, 4)] >= 1.0) {
                    GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8index, 4)] = GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8index, 4)] * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8index, 4)];
                }
            }
            int donor_replacementGLF_dead12i = _GLF_FUZZED(GLF_dead8target);
            int donor_replacementGLF_dead12j = _GLF_FUZZED(GLF_dead8target);
            ivec2 donor_replacementGLF_dead12p = _GLF_FUZZED((ivec2(83068, 3133) >> ivec2(32907, -6281)));
            {
                for (donor_replacementGLF_dead12j = 0; donor_replacementGLF_dead12j < 8; donor_replacementGLF_dead12j++) {
                    if (GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12j * 2 + donor_replacementGLF_dead12i * 2 * 16, 256)] == 0) {
                        donor_replacementGLF_dead12p.x = donor_replacementGLF_dead12j * 2;
                        donor_replacementGLF_dead12p.y = donor_replacementGLF_dead12i * 2;
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                            {
                                GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            }
                        }
                        donor_replacementGLF_dead12canwalk = true;
                    }
                }
            }
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            GLF_dead8index = GLF_dead8target > GLF_dead8currentNode.data ? GLF_dead8currentNode.rightIndex : GLF_dead8currentNode.leftIndex;
        }
    }
    do {
        return -1;
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x)))));
}

vec4 GLF_dead4_GLF_color = _GLF_FUZZED((((-2.1) + mat2x4(-8.0, 50.54, 7350.9754, 325.951, 5.8, 83.85, -5.9, -2.9)) * vec2(-486.376, -7.2)));

struct GLF_dead2BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead2BST GLF_dead2tree[10] = GLF_dead2BST[10](GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0));

int GLF_dead2search(int GLF_dead2target) {
    GLF_dead2BST GLF_dead2currentNode = GLF_dead2BST(0, 0, 0);
    int GLF_dead2index = 0;
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead14ref = _GLF_FUZZED(419.862);
                float donor_replacementGLF_dead14s = _GLF_FUZZED(dFdyFine(736.925));
                if (mod(float(_injected_loop_counter), donor_replacementGLF_dead14ref) <= 0.01) {
                    donor_replacementGLF_dead14s += 0.2;
                }
            }
            vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(vec2(-4.6, 39.25));
            int donor_replacementGLF_dead9i = _GLF_FUZZED((GLF_dead2target - ((-16414) % 41832)));
            {
                donor_replacementGLF_dead9coord = GLF_dead4_GLF_color.xz + GLF_dead4_GLF_color.yy;
                donor_replacementGLF_dead9coord = floor(donor_replacementGLF_dead9coord * 256.0) / 256.0;
                GLF_dead4_GLF_color = texture(GLF_dead9tex, donor_replacementGLF_dead9coord);
                donor_replacementGLF_dead9i++;
            }
        }
        while (GLF_dead2index != -1) {
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead11pos = _GLF_FUZZED(abs(ivec2(-68828, -44820)));
                if (donor_replacementGLF_dead11pos.x < GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)] + 15 && donor_replacementGLF_dead11pos.x > GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)] - 15) {
                    float GLF_dead11p = (15.0 - abs(float(donor_replacementGLF_dead11pos.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)]))) / 15.0;
                    ;
                }
            }
            GLF_dead2currentNode = GLF_dead2tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2index, 10)];
            if (GLF_dead2currentNode.data == GLF_dead2target) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                } else {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_dead2target = GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2target, 10)].rightIndex;
                                continue;
                            }
                        }
                    } else {
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            return GLF_dead2target;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                float donor_replacementGLF_dead10result = _GLF_FUZZED(dFdx(2193.1887));
                                {
                                    donor_replacementGLF_dead10result += 0.4;
                                }
                            }
                            int donor_replacementGLF_dead5v = _GLF_FUZZED(GLF_dead2target);
                            {
                                donor_replacementGLF_dead5v = (4 * donor_replacementGLF_dead5v * (1000 - donor_replacementGLF_dead5v)) / 1000;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                for (int GLF_dead14i = 0; GLF_dead14i < 3; GLF_dead14i++) {
                                    if (GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)] >= 1.0) {
                                        GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)] = GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)] * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)];
                                    }
                                }
                            }
                        }
                    } else {
                    }
                }
            }
            GLF_dead2index = GLF_dead2target > GLF_dead2currentNode.data ? GLF_dead2currentNode.rightIndex : GLF_dead2currentNode.leftIndex;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            float donor_replacementGLF_dead14ref = _GLF_FUZZED(-935.369);
            float donor_replacementGLF_dead14s = _GLF_FUZZED(37.11);
            if (mod(float(GLF_dead2index), donor_replacementGLF_dead14ref) <= 0.01) {
                donor_replacementGLF_dead14s += 0.2;
            }
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(injectionSwitch);
            int donor_replacementGLF_dead9i = _GLF_FUZZED(GLF_dead2target);
            vec4 donor_replacementGLF_dead9texel = _GLF_FUZZED((mat2x4(543.438, -891.020, 0.8, 6420.3207, 42.03, 47.16, 5.8, 89.72))[0]);
            {
                donor_replacementGLF_dead9coord = donor_replacementGLF_dead9texel.xz + donor_replacementGLF_dead9texel.yy;
                donor_replacementGLF_dead9coord = floor(donor_replacementGLF_dead9coord * 256.0) / 256.0;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead16baseIndex = _GLF_FUZZED(ivec3(27919, -90363, -23086).z);
                    int donor_replacementGLF_dead16data = _GLF_FUZZED(int((uvec3(62469u, 197792u, 94833u) == uvec3(33201u, 23946u, 163495u))));
                    int donor_replacementGLF_dead16treeIndex = _GLF_FUZZED(donor_replacementGLF_dead9i);
                    {
                        if (GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16baseIndex, 10)].rightIndex == -1) {
                            GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16baseIndex, 10)].rightIndex = donor_replacementGLF_dead16treeIndex;
                            GLF_dead16makeTreeNode(GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16treeIndex, 10)], donor_replacementGLF_dead16data);
                            ;
                        } else {
                            donor_replacementGLF_dead16baseIndex = GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16baseIndex, 10)].rightIndex;
                            continue;
                        }
                    }
                }
                donor_replacementGLF_dead9texel = texture(GLF_dead9tex, donor_replacementGLF_dead9coord);
                donor_replacementGLF_dead9i++;
            }
        }
    }
    return -1;
}

struct GLF_dead0QuicksortObject {
    int numbers[10];
};

GLF_dead0QuicksortObject GLF_dead0obj = GLF_dead0QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead0swap(int GLF_dead0i, int GLF_dead0j) {
    int GLF_dead0temp = GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 10)];
    GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 10)] = GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0j, 10)];
    GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0j, 10)] = GLF_dead0temp;
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(tanh((vec2(-6507.9253, 1.9) + 14.64)));
        int donor_replacementGLF_dead9i = _GLF_FUZZED(ivec3(-7231, 74473, -82762)[0]);
        while (GLF_dead4_GLF_color.x + GLF_dead4_GLF_color.y + GLF_dead4_GLF_color.z > 1.0 && donor_replacementGLF_dead9i < 16) {
            donor_replacementGLF_dead9coord = GLF_dead4_GLF_color.xz + GLF_dead4_GLF_color.yy;
            donor_replacementGLF_dead9coord = floor(donor_replacementGLF_dead9coord * 256.0) / 256.0;
            GLF_dead4_GLF_color = texture(GLF_dead9tex, donor_replacementGLF_dead9coord);
            donor_replacementGLF_dead9i++;
        }
    }
}

struct GLF_dead1BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead1BST GLF_dead1tree[10] = GLF_dead1BST[10](GLF_dead1BST(0, 0, 0), GLF_dead1BST(0, 0, 0), GLF_dead1BST(0, 0, 0), GLF_dead1BST(0, 0, 0), GLF_dead1BST(0, 0, 0), GLF_dead1BST(0, 0, 0), GLF_dead1BST(0, 0, 0), GLF_dead1BST(0, 0, 0), GLF_dead1BST(0, 0, 0), GLF_dead1BST(0, 0, 0));

void GLF_dead1makeTreeNode(inout GLF_dead1BST GLF_dead1tree, int GLF_dead1data) {
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead16baseIndex = _GLF_FUZZED(19795);
            {
                if (GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16baseIndex, 10)].rightIndex == -1) {
                    GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16baseIndex, 10)].rightIndex = GLF_dead1data;
                    GLF_dead16makeTreeNode(GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead1data, 10)], GLF_dead1data);
                    return;
                } else {
                    donor_replacementGLF_dead16baseIndex = GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16baseIndex, 10)].rightIndex;
                    ;
                }
            }
        }
    } else {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            GLF_dead1tree.data = GLF_dead1data;
        } else {
        }
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead16count = _GLF_FUZZED((+GLF_dead1data));
        {
            int GLF_dead16result = GLF_dead16search(GLF_dead1data);
            switch (GLF_dead1data) {
                case 9:
                case 5:
                case 12:
                case 15:
                case 7:
                case 8:
                case 2:
                case 6:
                case 17:
                case 13:
                    if (GLF_dead16result == GLF_dead1data) {
                        donor_replacementGLF_dead16count++;
                    }
                    break;
                default:
                    if (GLF_dead16result == -1) {
                        donor_replacementGLF_dead16count++;
                    }
                    break;
            }
        }
    }
    GLF_dead1tree.leftIndex = -1;
    GLF_dead1tree.rightIndex = -1;
}

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

const vec4 pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));

void main() {
    vec2 pos = gl_FragCoord.xy / resolution;
    ivec2 lin = ivec2(int(pos.x * 10.0), int(pos.y * 10.0));
    int iters = lin.x + lin.y * 10;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-5731.0649, 2.7, -9658.3346, -963.701);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead16data = _GLF_FUZZED((mat3(22.91, 3.8, 8.2, 78.32, -7.2, 5891.8984, -268.627, -818.737, -630.997), iters));
            int donor_replacementGLF_dead16treeIndex = _GLF_FUZZED(iters);
            {
                GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].rightIndex = donor_replacementGLF_dead16treeIndex;
                GLF_dead16makeTreeNode(GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16treeIndex, 10)], donor_replacementGLF_dead16data);
                return;
            }
        }
    }
    do {
        if (_GLF_DEAD(false)) {
            _GLF_color = log(vec4(4379.6995, -10.53, 3660.0073, 9.0));
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    GLF_dead16_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                }
            }
            ivec2 donor_replacementGLF_dead12p = _GLF_FUZZED(lin);
            if (iters >= 0 && donor_replacementGLF_dead12p.y > 0 && GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x) + (donor_replacementGLF_dead12p.y - 2) * 16, 256)] == 0) {
                iters--;
                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x) + (donor_replacementGLF_dead12p.y) * 16, 256)] = 1;
                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x) + (donor_replacementGLF_dead12p.y - 1) * 16, 256)] = 1;
                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x) + (donor_replacementGLF_dead12p.y - 2) * 16, 256)] = 1;
                donor_replacementGLF_dead12p.y -= 2;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-0.6, 0.9, -896.937, 0.4);
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead8data = _GLF_FUZZED(iters);
            int donor_replacementGLF_dead8treeIndex = _GLF_FUZZED(findLSB(9857));
            if (GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].leftIndex == -1) {
                GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].leftIndex = donor_replacementGLF_dead8treeIndex;
                GLF_dead8makeTreeNode(GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8treeIndex, 10)], donor_replacementGLF_dead8data);
                do {
                    return;
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(abs(0.0), 1.0, 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(abs(0.0), 1.0, 0.0)))))));
                {
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead14s = _GLF_FUZZED(fwidthCoarse(208.784));
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(586.460, -4320.1625, 812.875, -3.8);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            donor_replacementGLF_dead14s += 0.2;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = asinh(max(vec4(36.32, 6.4, 444.566, -2.1), vec4(-0.2, -6.7, -357.561, 5.6)));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        while (lin.y != 256) {
                            if (lin.x < GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)] + 15 && lin.x > GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)] - 15) {
                                float GLF_dead11p = (15.0 - abs(float(lin.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)]))) / 15.0;
                                ;
                            }
                            lin.y++;
                        }
                    }
                    _GLF_color = mix(mix(reflect(vec4(-6.4, -5.5, -7179.4745, 1696.1899), vec4(3.4, -70.11, -4869.8036, 1354.9924)), vec4(618.865, -1.8, 5.7, -81.88), vec4(46.50, 1.0, -4.1, 2734.2126)), vec4(1.0, (vec3(-5.1, 171.892, -19.64) / (-405.127))), (0.6 + mat2x4(-4.7, 8881.8448, -9.0, 0.9, -3123.5826, -54.99, 4.4, 3.1)[0]));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                iters = GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].leftIndex;
                ;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(2.5, 499.474, 8.1, 7987.3131);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(504.948, -2.5, 74.68, 1.8);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = roundEven(vec4(-5.9, 3751.3231, -9.4, 9.5));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_color = vec4(-23.93, -492.751, -187.035, 8690.9421);
    }
    int v = 100;
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(3.6, 56.74, 649.347, -4.7);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead14ref = _GLF_FUZZED(min(787.613, length(-2130.9765)));
                        float donor_replacementGLF_dead14s = _GLF_FUZZED(9834.3163);
                        if (mod(float(iters), donor_replacementGLF_dead14ref) <= 0.01) {
                            donor_replacementGLF_dead14s += 0.2;
                        }
                    }
                    _GLF_color = vec3(-5.7, 7.4, -8902.2663).ttpt;
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(22.30, 539.816, 922.227, -764.264);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-4.6, -7369.2918, 6695.1770, -2.7);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                do {
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead2count = _GLF_FUZZED(v);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(1.4, 671.206, -5277.9467, 5923.1071);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-503.841, 848.360, 9.8, 482.506);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead10result = _GLF_FUZZED(atanh(-1842.8674));
                            {
                                donor_replacementGLF_dead10result += 0.4;
                            }
                        }
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            int donor_replacementGLF_dead5v = _GLF_FUZZED(findMSB(v));
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(3.8, 219.327, 7.8, 75.27);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    donor_replacementGLF_dead5v = (4 * donor_replacementGLF_dead5v * (1000 - donor_replacementGLF_dead5v)) / 1000;
                                } else {
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-8981.1987, -8.6, -53.92, -5.6);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int GLF_dead2result = GLF_dead2search(v);
                        switch (v) {
                            case 9:
                            case 5:
                            case 12:
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        _GLF_color = refract((mat3x4(38.80, -3486.5349, -1.9, -4.7, -39.69, 51.52, -6.5, -82.56, 1.4, 584.706, 9.7, -38.46), vec4(-2.4, 281.070, 8572.9421, 6.8)), vec4(8.6, -1.6, -12.76, -7.8), smoothstep(55.26, (8.9 * 92.25), 294.023));
                                    }
                                }
                            case 15:
                            case 7:
                            case 8:
                            case 2:
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = cosh(vec4(-9017.5558, 9634.9947, -522.882, 6257.1566));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            case 6:
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        if (GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].rightIndex == -1) {
                                            GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].rightIndex = donor_replacementGLF_dead2count;
                                            GLF_dead16makeTreeNode(GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2count, 10)], iters);
                                            return;
                                        } else {
                                            iters = GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].rightIndex;
                                            ;
                                        }
                                    }
                                }
                            case 17:
                            case 13:
                                if (GLF_dead2result == v) {
                                    donor_replacementGLF_dead2count++;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-447.485, -7.6, 9.2, -408.969);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                break;
                            default:
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(4.5, 1.1, -8.2, 3905.6371);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    {
                                        if (lin.x < GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)] + 15 && lin.x > GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)] - 15) {
                                            float GLF_dead11p = (15.0 - abs(float(lin.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)]))) / 15.0;
                                            ;
                                        }
                                        lin.y++;
                                    }
                                }
                                if (GLF_dead2result == -1) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = inversesqrt(vec4(-866.826, -4.6, -79.92, -9929.8601));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    donor_replacementGLF_dead2count++;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = GLF_dead4_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    } else {
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-845.662, 2.6, 9.2, 7102.3018);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = mix(vec4(-778.559, -9.8, -8002.9475, 1.8), reflect(vec4(6.4, -7.8, -4.6, -852.586), intBitsToFloat(ivec4(-20306, 74969, -51825, -22490))), vec4(50.91, -57.55, 780.510, -126.753));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                int donor_replacementGLF_dead9i = _GLF_FUZZED(((-66277) & donor_replacementGLF_dead2count));
                                                vec4 donor_replacementGLF_dead9texel = _GLF_FUZZED(log(_GLF_outVarBackup_GLF_color));
                                                while (donor_replacementGLF_dead9texel.x + donor_replacementGLF_dead9texel.y + donor_replacementGLF_dead9texel.z > 1.0 && donor_replacementGLF_dead9i < 16) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = step(mix(-2.1, -899.420, -6.6), (-vec4(31.37, 2.5, -0.3, -9428.4342)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    pos = donor_replacementGLF_dead9texel.xz + donor_replacementGLF_dead9texel.yy;
                                                    pos = floor(pos * 256.0) / 256.0;
                                                    donor_replacementGLF_dead9texel = texture(GLF_dead9tex, pos);
                                                    donor_replacementGLF_dead9i++;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                {
                                                    GLF_dead16_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, true))))) {
                                    vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED((mat3x2(mat4(2.5, 6.0, -3.2, 821.310, -3.4, 594.875, -43.28, 443.389, -2.6, 8.3, -51.72, -5.0, -245.745, -9.9, -212.378, -6.2)) * vec3(-7.4, 10.25, -3.3)));
                                    int donor_replacementGLF_dead9i = _GLF_FUZZED(GLF_dead2result);
                                    vec4 donor_replacementGLF_dead9texel = _GLF_FUZZED(_GLF_color);
                                    while (donor_replacementGLF_dead9texel.x + donor_replacementGLF_dead9texel.y + donor_replacementGLF_dead9texel.z > 1.0 && donor_replacementGLF_dead9i < 16) {
                                        donor_replacementGLF_dead9coord = donor_replacementGLF_dead9texel.xz + donor_replacementGLF_dead9texel.yy;
                                        donor_replacementGLF_dead9coord = floor(donor_replacementGLF_dead9coord * 256.0) / 256.0;
                                        donor_replacementGLF_dead9texel = texture(GLF_dead9tex, donor_replacementGLF_dead9coord);
                                        donor_replacementGLF_dead9i++;
                                    }
                                }
                                {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = step(934.015, mix(vec4(326.523, -6631.3527, 2.2, -3542.2053), vec4(5.6, -998.411, 4383.7554, 2230.4257), vec4(55.85, -3424.0561, 9.2, -33.17)));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        vec4 donor_replacementGLF_dead14c = _GLF_FUZZED(((_GLF_outVarBackup_GLF_color * GLF_dead12_GLF_color) / 4.8));
                                        for (int GLF_dead14i = 0; GLF_dead14i < 3; GLF_dead14i++) {
                                            if (donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)] >= 1.0) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(66.82, -1.8, -84.71, -0.4);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)] = donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)] * donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)];
                                            }
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-3.1, -9.0, 3.3, 2390.8874);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        float donor_replacementGLF_dead10result = _GLF_FUZZED(fwidthCoarse(dFdyFine(tanh(-543.101))));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(4052.9809, 846.748, -557.468, -0.6);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        {
                                            ;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        while (lin.y != 256) {
                                            if (lin.x < GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)] + 15 && lin.x > GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)] - 15) {
                                                float GLF_dead11p = (15.0 - abs(float(lin.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)]))) / 15.0;
                                                ;
                                            }
                                            lin.y++;
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(43.02, 0.0, 4.6, -320.354);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                break;
                        }
                    }
                }
                _GLF_color = dFdyCoarse(vec4(76.47, -530.657, 227.643, 791.548));
                {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead5i = _GLF_FUZZED(bitfieldInsert(86948, v, iters, v));
                        int donor_replacementGLF_dead5iters = _GLF_FUZZED((iters % 55604));
                        for (donor_replacementGLF_dead5i = 0; donor_replacementGLF_dead5i < donor_replacementGLF_dead5iters; donor_replacementGLF_dead5i++) {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead10i = _GLF_FUZZED(ivec4(-46719, -40153, -98208, -61236)[1]);
                                float donor_replacementGLF_dead10result = _GLF_FUZZED(-9.0);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(0.2, -4.5, -594.564, 150.377);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0)), _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0)), 0.0 + (dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0))))))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                float donor_replacementGLF_dead10thirty_two = _GLF_FUZZED(-70.44);
                                {
                                    if (mod(float(donor_replacementGLF_dead10i), round(donor_replacementGLF_dead10thirty_two)) <= 0.01) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = exp2(vec4(1484.5463, 4.3, 8.5, 1.8));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        donor_replacementGLF_dead10result += 100.0;
                                    }
                                }
                            }
                            iters = (4 * iters * (1000 - iters)) / 1000;
                        }
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(5868.3354, -2.7, -6.2, 58.34);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(213.166, 9.9, 0.0, -8.0);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = vec4(2.9, -963.024, -564.067, -63.97);
                        do {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            vec4 donor_replacementGLF_dead14c = _GLF_FUZZED(clamp(vec4(21.34, -6.9, 1.8, -0.9), vec4(-1.7, 8844.0516, 3.9, 7.8), vec4(500.407, -10.48, 45.94, -4856.1289)));
                            int donor_replacementGLF_dead14i = _GLF_FUZZED(v);
                            {
                                donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] = donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] * donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)];
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-5.7, -318.144, -1.2, 1.4);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        _GLF_color = normalize(vec4(-7.6, -70.81, -13.58, 29.45));
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED((mat2(4.7, -491.965, 6.1, -6560.3210) * tan(vec2(8867.8681, 77.79))));
                            {
                                donor_replacementGLF_dead9coord = _GLF_outVarBackup_GLF_color.xz + _GLF_outVarBackup_GLF_color.yy;
                                donor_replacementGLF_dead9coord = floor(donor_replacementGLF_dead9coord * 256.0) / 256.0;
                                _GLF_outVarBackup_GLF_color = texture(GLF_dead9tex, donor_replacementGLF_dead9coord);
                                iters++;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = pow(vec4(56.92, 1.4, 83.29, 9.9), vec4(9732.1208, -8.5, 2416.1188, -9.7));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0))))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(6.9, -95.21, 2248.1613, 7.6);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0)))))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead16count = _GLF_FUZZED(floatBitsToInt(5.1));
                                if (v == -1) {
                                    donor_replacementGLF_dead16count++;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (2133.1463 * vec4(-405.931, 44.38, 23.48, 0.2));
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead8baseIndex = _GLF_FUZZED((ivec4(50761, 24342, 26595, 77388) / ivec4(15092, -77957, -85337, 44134)).y);
                        int donor_replacementGLF_dead8treeIndex = _GLF_FUZZED(ivec2(-94617, -99277)[0]);
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            if (v <= GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].data) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = inversesqrt(vec4(-8426.0143, 8.6, -1217.6960, 915.363));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].leftIndex == -1) {
                                        GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].leftIndex = donor_replacementGLF_dead8treeIndex;
                                        GLF_dead8makeTreeNode(GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8treeIndex, 10)], v);
                                        return;
                                    } else {
                                        donor_replacementGLF_dead8baseIndex = GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].leftIndex;
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                            ;
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, true))))) {
                                                if (GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 4)] >= 1.0) {
                                                    GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 4)] = GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 4)] * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 4)];
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (vec2(-97.61, 7.4) * (mat4x2(7664.4992, -1592.1720, -9.0, 806.400, -8398.8632, 8.8, -5.9, -239.487)));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].rightIndex == -1) {
                                    GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].rightIndex = donor_replacementGLF_dead8treeIndex;
                                    GLF_dead8makeTreeNode(GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8treeIndex, 10)], v);
                                    do {
                                        return;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead12d = _GLF_FUZZED(findMSB(2207u));
                                        ivec2 donor_replacementGLF_dead12p = _GLF_FUZZED(clamp(lin, findLSB(80564), iters));
                                        if (donor_replacementGLF_dead12d >= 0 && donor_replacementGLF_dead12p.y < 14 && GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x) + (donor_replacementGLF_dead12p.y + 2) * 16, 256)] == 0) {
                                            donor_replacementGLF_dead12d--;
                                            GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x) + (donor_replacementGLF_dead12p.y) * 16, 256)] = 1;
                                            GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x) + (donor_replacementGLF_dead12p.y + 1) * 16, 256)] = 1;
                                            GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x) + (donor_replacementGLF_dead12p.y + 2) * 16, 256)] = 1;
                                            donor_replacementGLF_dead12p.y += 2;
                                        }
                                    }
                                } else {
                                    donor_replacementGLF_dead8baseIndex = GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].rightIndex;
                                    ;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead14i = _GLF_FUZZED((mix(iters, iters, false)));
                        {
                            if (GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] >= 1.0) {
                                GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] = GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)];
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(713.716, -94.88, 7755.6794, -0.3);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(9928.6080, 7.3, -94.27, -9865.1176);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (_GLF_color / (-94.50));
                                if (_GLF_DEAD(false)) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(5.4, -7.3, -6234.7429, -3.5);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    bool donor_replacementGLF_dead12canwalk = _GLF_FUZZED(((mat4x2(-6.1, 93.04, 72.36, -722.538, 54.41, -5158.8758, 8.3, -7662.1342) * mat2x4(678.052, -3274.8521, 1883.8221, 91.27, 8138.5790, 1.9, 73.48, 12.21)) != mat2(-24.13, 95.93, -5967.9370, -1.2)));
                                    int donor_replacementGLF_dead12i = _GLF_FUZZED(sign(13396));
                                    ivec2 donor_replacementGLF_dead12p = _GLF_FUZZED(lin);
                                    {
                                        donor_replacementGLF_dead12canwalk = false;
                                        int GLF_dead12j = _GLF_FUZZED(38798);
                                        for (donor_replacementGLF_dead12i = 0; donor_replacementGLF_dead12i < 8; donor_replacementGLF_dead12i++) {
                                            for (GLF_dead12j = 0; GLF_dead12j < 8; GLF_dead12j++) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                                    int donor_replacementGLF_dead14i = _GLF_FUZZED(GLF_dead12j);
                                                    {
                                                        if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] >= 1.0) {
                                                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)];
                                                        }
                                                    }
                                                }
                                                if (GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12j * 2 + donor_replacementGLF_dead12i * 2 * 16, 256)] == 0) {
                                                    donor_replacementGLF_dead12p.x = GLF_dead12j * 2;
                                                    donor_replacementGLF_dead12p.y = donor_replacementGLF_dead12i * 2;
                                                    donor_replacementGLF_dead12canwalk = true;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        float donor_replacementGLF_dead14s = _GLF_FUZZED(332.126);
                                                        {
                                                            ;
                                                        }
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(514.465, -39.19, 1.2, -7.1);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            float donor_replacementGLF_dead14s = _GLF_FUZZED(3.2);
                                            {
                                                donor_replacementGLF_dead14s += 0.2;
                                            }
                                        }
                                        GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x) + (donor_replacementGLF_dead12p.y) * 16, 256)] = 1;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_dead4_GLF_color;
                                    }
                                    v = (4 * v * (1000 - v)) / 1000;
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(6.9, -976.491, 47.17, -2.9);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(4.2, 0.1, 1.1, 3587.3142);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            {
                                float GLF_dead11p = (15.0 - abs(float(lin.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)]))) / 15.0;
                                ;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                    if (v == -1) {
                                        iters++;
                                    }
                                }
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (v == 20) {
                                GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            } else {
                                GLF_dead16_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                            }
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        float donor_replacementGLF_dead14limit = _GLF_FUZZED(ceil(-1551.8759));
                        float donor_replacementGLF_dead14ref = _GLF_FUZZED(-385.421);
                        float donor_replacementGLF_dead14s = _GLF_FUZZED(-8375.1467);
                        {
                            if (mod(float(iters), donor_replacementGLF_dead14ref) <= 0.01) {
                                donor_replacementGLF_dead14s += 0.2;
                            }
                            if (float(iters) >= donor_replacementGLF_dead14limit) {
                                ;
                            }
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = _GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-0.4, 32.07, 7.8, -3.8);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead0i = _GLF_FUZZED(iters);
            {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead16baseIndex = _GLF_FUZZED(iters);
                        int donor_replacementGLF_dead16data = _GLF_FUZZED((donor_replacementGLF_dead0i | v));
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (mat3x4(-3649.3506, -624.859, 99.29, -2539.1256, 1.7, 6.0, -9.9, 89.75, 339.223, 27.23, -2546.9777, 7047.1316) * floor(vec3(-7.2, -6.9, 8.2)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16baseIndex, 10)].rightIndex = v;
                            GLF_dead16makeTreeNode(GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(v, 10)], donor_replacementGLF_dead16data);
                            return;
                        }
                    }
                    if (GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)] <= v) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = GLF_dead4_GLF_color;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(vec3(0.0, 0.0, 0.0)))))) {
                            do {
                                donor_replacementGLF_dead0i++;
                            } while (_GLF_WRAPPED_LOOP(false));
                        } else {
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(1.6, 9.6, -55.45, -976.956);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 10)].rightIndex = iters;
                                    }
                                    GLF_dead8makeTreeNode(GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)], donor_replacementGLF_dead0i);
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    bool donor_replacementGLF_dead12canwalk = _GLF_FUZZED(((-82700) != (-94822)));
                                    int donor_replacementGLF_dead12j = _GLF_FUZZED(donor_replacementGLF_dead0i);
                                    ivec2 donor_replacementGLF_dead12p = _GLF_FUZZED(lin);
                                    if (GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12j * 2 + v * 2 * 16, 256)] == 0) {
                                        donor_replacementGLF_dead12p.x = donor_replacementGLF_dead12j * 2;
                                        donor_replacementGLF_dead12p.y = v * 2;
                                        donor_replacementGLF_dead12canwalk = true;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = ((-0.7) / vec4(8.5, 894.754, -9.7, 6593.7954));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-5.8, 8538.8282, 8217.3419, 94.09);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead14limit = _GLF_FUZZED(smoothstep(680.181, radians(512.658), atanh(-20.38)));
                                float donor_replacementGLF_dead14s = _GLF_FUZZED(8.9);
                                if (float(donor_replacementGLF_dead0i) >= donor_replacementGLF_dead14limit) {
                                    ;
                                }
                            }
                            GLF_dead0swap(donor_replacementGLF_dead0i, iters);
                        } else {
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-4.6, -8.3, 66.04, -3.0);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                } else {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-6.2, -3221.8123, -93.65, 552.503);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-4.6, 0.5, 76.30, 520.315);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-87.88, 5353.4158, 6.9, 0.8);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-5.2, 1.7, 964.528, 1277.5507);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = tanh(unpackUnorm4x8(81202u));
                        }
                    }
                    _GLF_color = asinh(vec4(287.748, 8215.5741, -5.5, -3055.7916));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(4.4, 8.1, -17.79, -3.6);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead10limit = _GLF_FUZZED(349.215);
                            float donor_replacementGLF_dead10result = _GLF_FUZZED(ldexp(-3979.3343, (true ? v : v)));
                            float donor_replacementGLF_dead10thirty_two = _GLF_FUZZED(-956.650);
                            for (int GLF_dead10i = 1; GLF_dead10i < 800; GLF_dead10i++) {
                                if ((GLF_dead10i % 32) == 0) {
                                    donor_replacementGLF_dead10result += 0.4;
                                } else {
                                    if (mod(float(GLF_dead10i), round(donor_replacementGLF_dead10thirty_two)) <= 0.01) {
                                        donor_replacementGLF_dead10result += 100.0;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (GLF_dead10i == donor_replacementGLF_dead0i) {
                                            donor_replacementGLF_dead0i++;
                                        }
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-36.06, -1266.8490, -1.9, -9609.2526);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (float(GLF_dead10i) >= donor_replacementGLF_dead10limit) {
                                    ;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead14limit = _GLF_FUZZED(-5.2);
                            float donor_replacementGLF_dead14ref = _GLF_FUZZED((vec3(2.2, 3583.3498, -449.251), faceforward(-3005.1086, -2634.0591, dot(_GLF_color, _GLF_outVarBackup_GLF_color))));
                            float donor_replacementGLF_dead14s = _GLF_FUZZED(96.95);
                            for (int GLF_dead14i = 1; GLF_dead14i < 800; GLF_dead14i++) {
                                if (mod(float(GLF_dead14i), donor_replacementGLF_dead14ref) <= 0.01) {
                                    donor_replacementGLF_dead14s += 0.2;
                                }
                                if (float(GLF_dead14i) >= donor_replacementGLF_dead14limit) {
                                    ;
                                }
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = tanh(vec4(-2.7, 5533.1366, -86.32, 18.04));
                }
                int donor_replacementGLF_dead5v = _GLF_FUZZED(donor_replacementGLF_dead0i);
                {
                    donor_replacementGLF_dead5v = (4 * donor_replacementGLF_dead5v * (1000 - donor_replacementGLF_dead5v)) / 1000;
                }
            }
            do {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-3.0, 5.9, -2.2, -130.801);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), bool(bvec4(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), true, false, false))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    } else {
                        _GLF_color = intBitsToFloat(ivec4(-29352, -4577, 85012, -15062));
                    }
                } else {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec3(-89.59, -26.74, -7.9).tpst;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(832.952, 64.32, 493.094, 971.832);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-0.0, -398.727, 9.1, 5.1);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    {
                                        float GLF_dead11p = (15.0 - abs(float(lin.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)]))) / 15.0;
                                        ;
                                    }
                                }
                                _GLF_color = asinh(mix(sqrt(_GLF_outVarBackup_GLF_color), _GLF_outVarBackup_GLF_color, _GLF_color));
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                {
                                    iters = (4 * iters * (1000 - iters)) / 1000;
                                }
                            }
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = clamp(dFdxFine(vec4(3.3, -44.64, 4.6, 7.9)), vec4(-0.5, 2.6, -5.5, 6.7), vec4(-41.76, -0.9, 854.772, 88.31));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    } else {
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        do {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = max(vec4(-4.4, 785.617, -3717.0716, 7.0), floor(-73.07));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(95.09, 6140.7735, 6.7, 0.1);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = clamp(vec4(-9.7, -911.066, 5.3, -8281.2878), 881.715, -4.4);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-8.3, -6.5, -880.875, -309.255);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                _GLF_color = min(dFdx(vec4(980.479, -0.4, -2.2, -4.8)), vec4(6.7, -370.377, 2.6, 9048.7401));
            } else {
                if (_GLF_DEAD(false)) {
                    {
                        if (lin.x < GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)] + 15 && lin.x > GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)] - 15) {
                            float GLF_dead11p = (15.0 - abs(float(lin.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)]))) / 15.0;
                            ;
                        }
                        lin.y++;
                    }
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            do {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = GLF_dead4_GLF_color;
    }
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead14limit = _GLF_FUZZED(9.6);
        float donor_replacementGLF_dead14ref = _GLF_FUZZED(8.0);
        float donor_replacementGLF_dead14s = _GLF_FUZZED(54.87);
        for (int GLF_dead14i = 1; GLF_dead14i < 800; GLF_dead14i++) {
            if (mod(float(GLF_dead14i), donor_replacementGLF_dead14ref) <= 0.01) {
                donor_replacementGLF_dead14s += 0.2;
            }
            if (float(GLF_dead14i) >= donor_replacementGLF_dead14limit) {
                ;
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (true ? vec4(485.667, vec2(-20.74, 2.0), 4.0) : vec4(7.1, 4.7, 1.1, 455.568));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        float donor_replacementGLF_dead3th = _GLF_FUZZED(distance(_GLF_color, sin(vec4(-80.86, -9954.6142, -2.5, 1.8))));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = vec4(-2.6, -337.565, 481.895, 7123.6283);
            } else {
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = inversesqrt(_GLF_color);
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(7.2, -55.57, -2.6, 5290.1872);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            } else {
            }
        }
        vec2 donor_replacementGLF_dead3v = _GLF_FUZZED(dFdx(dFdy(resolution)));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
            {
                if (mod(float(v), donor_replacementGLF_dead3th) <= 0.01) {
                    donor_replacementGLF_dead3th += 0.2;
                }
                if (float(v) >= donor_replacementGLF_dead3th) {
                    ;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = round(_GLF_color);
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                if (donor_replacementGLF_dead3v.x < 0.0) {
                    donor_replacementGLF_dead3th = 1.0 - donor_replacementGLF_dead3th;
                }
            } else {
            }
        }
    }
    int i;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                ivec2 donor_replacementGLF_dead12p = _GLF_FUZZED(ivec2(-65276, -88639));
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead16baseIndex = _GLF_FUZZED(((i) << (-92544)));
                    int donor_replacementGLF_dead16data = _GLF_FUZZED(ivec4(-65092, 836, 78545, -31162)[3]);
                    int donor_replacementGLF_dead16treeIndex = _GLF_FUZZED(iters);
                    if (GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16baseIndex, 10)].leftIndex == -1) {
                        GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16baseIndex, 10)].leftIndex = donor_replacementGLF_dead16treeIndex;
                        GLF_dead16makeTreeNode(GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16treeIndex, 10)], donor_replacementGLF_dead16data);
                        return;
                    } else {
                        donor_replacementGLF_dead16baseIndex = GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16baseIndex, 10)].leftIndex;
                        ;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(37.41, -198.460, 9.7, -145.909);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (i >= 0 && donor_replacementGLF_dead12p.x > 0 && GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x - 2) + (donor_replacementGLF_dead12p.y) * 16, 256)] == 0) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead16count = _GLF_FUZZED(bitfieldReverse(int(34758u)));
                        if (donor_replacementGLF_dead16count == 20) {
                            GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        } else {
                            GLF_dead16_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                        }
                    }
                    i--;
                    GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x) + (donor_replacementGLF_dead12p.y) * 16, 256)] = 1;
                    GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x - 1) + (donor_replacementGLF_dead12p.y) * 16, 256)] = 1;
                    GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x - 2) + (donor_replacementGLF_dead12p.y) * 16, 256)] = 1;
                    donor_replacementGLF_dead12p.x -= 2;
                }
            }
            _GLF_color = vec4(-98.19, -1.2, -332.774, 2366.4962);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_color = vec4(68.91, -2.1, 8072.4214, 3534.9673);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = asinh(vec4(9202.6123, -1.4, 7.5, 4.8));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec3(1.0, sqrt(0.0), 1.0), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, sqrt(0.0), 1.0), vec3(0.0, 1.0, 0.0))))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                vec4 donor_replacementGLF_dead14c = _GLF_FUZZED(vec4(1442.6940, 1241.0004, 8.3, 4265.8742));
                int donor_replacementGLF_dead14i = _GLF_FUZZED(i);
                if (donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] >= 1.0) {
                    donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] = donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] * donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)];
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(66.12, -964.719, -2.5, 63.05);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        do {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                for (int _injected_loop_counter = ((-97631) & 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    }
    for (i = 0; i < iters; i++) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (vec3(-23.28, 4.6, -5.0), (vec4(2456.2012, -1.7, -77.00, 311.860) / (-1808.0275)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        v = (4 * v * (1000 - v)) / 1000;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(fwidthFine(ceil(-4388.4300)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = tan(acos(vec4(7259.6443, -4821.2017, -6.6, -2685.3416)));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-2.0, 76.75, -4081.1120, -83.90);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-8560.8559, 973.938, -20.59, -8.4);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_color = mat2x4(6917.7372, 786.620, 4.9, 209.517, 2565.2852, -7.1, 151.833, 6875.8982)[0];
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, !(!(false)))) && _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))) {
    } else {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead14s = _GLF_FUZZED(fwidthCoarse(pow(dFdx(-85.26), 9.9)));
                {
                    donor_replacementGLF_dead14s += 0.2;
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead4x2 = _GLF_FUZZED(149.060);
                            if (donor_replacementGLF_dead4x2 <= -0.9 && donor_replacementGLF_dead4x2 >= -1.1) {
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                    GLF_dead4_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                }
                            } else {
                                GLF_dead4_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead5iters = _GLF_FUZZED(v);
                                        for (v = 0; v < donor_replacementGLF_dead5iters; v++) {
                                            i = (4 * i * (1000 - i)) / 1000;
                                        }
                                    }
                                }
                            }
                        }
                        int donor_replacementGLF_dead1treeIndex = _GLF_FUZZED(58588);
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = GLF_dead4_GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_dead16_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-9369.3010, -686.545, -7152.5753, -548.623);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    ivec2 donor_replacementGLF_dead11pos = _GLF_FUZZED((ivec2(-90119, -77834) - i));
                                    {
                                        if (donor_replacementGLF_dead11pos.x < GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)] + 15 && donor_replacementGLF_dead11pos.x > GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)] - 15) {
                                            float GLF_dead11p = (15.0 - abs(float(donor_replacementGLF_dead11pos.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)]))) / 15.0;
                                            ;
                                        }
                                        donor_replacementGLF_dead11pos.y++;
                                    }
                                }
                                {
                                    donor_replacementGLF_dead1treeIndex = (4 * donor_replacementGLF_dead1treeIndex * (1000 - donor_replacementGLF_dead1treeIndex)) / 1000;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(2.0, -308.710, -7360.5844, 9.2);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(99.94, -4102.3335, 2.2, 0.9);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead16data = _GLF_FUZZED(i);
                                            int donor_replacementGLF_dead16treeIndex = _GLF_FUZZED(findMSB(-36720));
                                            {
                                                GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1treeIndex, 10)].leftIndex = donor_replacementGLF_dead16treeIndex;
                                                GLF_dead16makeTreeNode(GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16treeIndex, 10)], donor_replacementGLF_dead16data);
                                                return;
                                            }
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = clamp(vec4(2244.9486, 9.9, 7316.2732, -9.0), dot(vec4(6943.8726, -65.46, -7.9, -72.53), vec4(-79.66, 2.0, 4717.8068, -5.6)), 68.05);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    if (i <= GLF_dead1tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].data) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    int donor_replacementGLF_dead5x = _GLF_FUZZED(-86110);
                                                    if (donor_replacementGLF_dead5x * donor_replacementGLF_dead5x + donor_replacementGLF_dead1treeIndex * donor_replacementGLF_dead1treeIndex > 262144) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            if (_GLF_DEAD(false)) {
                                                                int donor_replacementGLF_dead12directions = _GLF_FUZZED(iters);
                                                                ivec2 donor_replacementGLF_dead12p = _GLF_FUZZED(lin);
                                                                if (donor_replacementGLF_dead12p.x > 0 && GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x - 2) + (donor_replacementGLF_dead12p.y) * 16, 256)] == 0) {
                                                                    donor_replacementGLF_dead12directions += 1;
                                                                }
                                                            }
                                                            _GLF_color = vec4(9.4, 3756.7644, -233.355, 1.5);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    int donor_replacementGLF_dead14i = _GLF_FUZZED(donor_replacementGLF_dead1treeIndex);
                                                                    {
                                                                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = normalize((vec4(4286.7746, 4.0, 0.5, -8.9) * vec4(-531.234, -251.332, 7.8, -505.848)));
                                                                if (_GLF_DEAD(false)) {
                                                                    vec4 donor_replacementGLF_dead14c = _GLF_FUZZED(injectionSwitch.rggr);
                                                                    int donor_replacementGLF_dead14i = _GLF_FUZZED(iters);
                                                                    {
                                                                        donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] = donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] * donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)];
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec4(0.0, 0.0, log(1.0), 0.0), vec4(sqrt(1.0), _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0))), 1.0, 1.0)), dot(vec4(0.0, 0.0, log(1.0), 0.0), vec4(sqrt(1.0), _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0))), 1.0, 1.0))))))) {
                                                                ;
                                                            } else {
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                if (_GLF_DEAD(false)) {
                                                    for (v = 0; v < v; v++) {
                                                        iters = (4 * iters * (1000 - iters)) / 1000;
                                                    }
                                                }
                                            } else {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))))) {
                                                    if (lin.x < GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)] + 15 && lin.x > GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)] - 15) {
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead16count = _GLF_FUZZED(v);
                                                            int donor_replacementGLF_dead16result = _GLF_FUZZED(5508);
                                                            if (donor_replacementGLF_dead16result == -1) {
                                                                donor_replacementGLF_dead16count++;
                                                            }
                                                        }
                                                        float GLF_dead11p = (15.0 - abs(float(lin.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)]))) / 15.0;
                                                        ;
                                                    }
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat4(_GLF_ZERO(0.0, injectionSwitch.x), 0.0, 0.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0)), dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0))), 0.0, 0.0, 1.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = (max(vec4(-3.0, -0.3, -413.814, 338.750), dFdxCoarse(-420.650)));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            if (lin.x < GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)] + 15 && lin.x > GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)] - 15) {
                                                                float GLF_dead11p = (15.0 - abs(float(lin.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(lin.y, 256)]))) / 15.0;
                                                                ;
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(9.5, 2.8, 5.9, 7.1);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            {
                                                                v = (4 * v * (1000 - v)) / 1000;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(false)) {
                                                                if (v == 20) {
                                                                    GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                                } else {
                                                                    GLF_dead16_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                                                                }
                                                            }
                                                            while (GLF_dead4_GLF_color.x + GLF_dead4_GLF_color.y + GLF_dead4_GLF_color.z > 1.0 && donor_replacementGLF_dead1treeIndex < 16) {
                                                                pos = GLF_dead4_GLF_color.xz + GLF_dead4_GLF_color.yy;
                                                                pos = floor(pos * 256.0) / 256.0;
                                                                GLF_dead4_GLF_color = texture(GLF_dead9tex, pos);
                                                                donor_replacementGLF_dead1treeIndex++;
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(4092.8994, 2.8, 53.61, 9.3);
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                int donor_replacementGLF_dead12d = _GLF_FUZZED(v);
                                                                ivec2 donor_replacementGLF_dead12p = _GLF_FUZZED(ivec2(1330, -69281));
                                                                {
                                                                    donor_replacementGLF_dead12d--;
                                                                    GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x) + (donor_replacementGLF_dead12p.y) * 16, 256)] = 1;
                                                                    GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x) + (donor_replacementGLF_dead12p.y + 1) * 16, 256)] = 1;
                                                                    if (_GLF_DEAD(false)) {
                                                                        {
                                                                            break;
                                                                        }
                                                                    }
                                                                    GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead12p.x) + (donor_replacementGLF_dead12p.y + 2) * 16, 256)] = 1;
                                                                    donor_replacementGLF_dead12p.y += 2;
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    int donor_replacementGLF_dead16count = _GLF_FUZZED((_injected_loop_counter >> (-62234)));
                                                                    if (donor_replacementGLF_dead16count == 20) {
                                                                        GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                                    } else {
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = (vec4(518.635, -62.79, 2.2, 22.87) * mat4(63.75, -9026.0217, -6394.3980, -1.5, 985.616, -928.560, -6.0, 529.373, 9.9, 207.351, 55.33, -626.852, 618.482, 13.60, 107.154, 3222.6365));
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                        GLF_dead16_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                } else {
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(6.9, -73.35, -1225.8077, -754.153);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        vec4 donor_replacementGLF_dead14c = _GLF_FUZZED(abs(trunc(vec4(6132.9322, -15.97, -3.0, 0.5))));
                                                        int donor_replacementGLF_dead14i = _GLF_FUZZED(-36996);
                                                        {
                                                            donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] = donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] * donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)];
                                                        }
                                                    }
                                                }
                                            } else {
                                            }
                                            _GLF_color = fwidthCoarse(clamp(vec4(-5.7, -4672.8518, -730.178, 78.93), max(vec4(-3.0, 2596.1051, -233.076, 1013.8025), vec4(2951.6618, -238.793, 400.991, 0.1)), vec4(-6.6, 3.1, 6.8, 4.1)));
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter++) {
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            iters = (4 * iters * (1000 - iters)) / 1000;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-2.3, -98.41, 8.6, -94.87);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(3.0, -36.99, 843.897, -35.33);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-5.6, 5257.6216, 99.36, -1.8);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = sinh(_GLF_color);
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-706.480, -953.039, 89.71, -6.8);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (GLF_dead1tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].leftIndex == -1) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-2.5, 1.9, 2.5, -6418.8476);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            GLF_dead1tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].leftIndex = donor_replacementGLF_dead1treeIndex;
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                                _GLF_color = GLF_dead4_GLF_color;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-1379.9961, -44.54, 3.6, 720.698);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                            GLF_dead1makeTreeNode(GLF_dead1tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1treeIndex, 10)], i);
                                            return;
                                        } else {
                                            iters = GLF_dead1tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].leftIndex;
                                            ;
                                        }
                                    } else {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = sign(vec4(-4.4, -6.7, -8.8, -223.143));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(determinant(mat2(0.0, 1.0, 0.0, 0.0)), 1.0, 1.0, 0.0, sqrt(0.0), _GLF_ZERO(0.0, injectionSwitch.x), 0.0, 0.0, 0.0)))))) {
                                            } else {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(2.8, -7.9, 3.2, -7985.8777);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    _GLF_color = log2(GLF_dead4_GLF_color);
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = degrees(vec4(-4.3, 764.074, -43.99, 9.0));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-5.7, 37.37, -468.219, 5243.9818);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                if (GLF_dead1tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].rightIndex == -1) {
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                        GLF_dead1tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].rightIndex = donor_replacementGLF_dead1treeIndex;
                                                    }
                                                    GLF_dead1makeTreeNode(GLF_dead1tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1treeIndex, 10)], i);
                                                    return;
                                                } else {
                                                    do {
                                                        iters = GLF_dead1tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)].rightIndex;
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0)))));
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            _GLF_color = vec4(9592.0901, -29.50, 9137.5719, -421.118);
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-7.5, -745.693, 55.44, 56.79);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter++) {
                                                        do {
                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                                ;
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead9i = _GLF_FUZZED(donor_replacementGLF_dead1treeIndex);
                                                            {
                                                                pos = GLF_dead4_GLF_color.xz + GLF_dead4_GLF_color.yy;
                                                                pos = floor(pos * 256.0) / 256.0;
                                                                GLF_dead4_GLF_color = texture(GLF_dead9tex, pos);
                                                                donor_replacementGLF_dead9i++;
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = GLF_dead4_GLF_color;
                                                        } else {
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-2.9, 2.0, -5.5, -8.9);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = (-ceil(vec4(-48.25, -9833.3562, 6.9, 298.515)));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            int donor_replacementGLF_dead8baseIndex = _GLF_FUZZED((v ^ i));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                ivec2 donor_replacementGLF_dead11pos = _GLF_FUZZED(lin);
                                                {
                                                    float GLF_dead11p = (15.0 - abs(float(donor_replacementGLF_dead11pos.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)]))) / 15.0;
                                                    if (_GLF_DEAD(false)) {
                                                        vec4 donor_replacementGLF_dead14c = _GLF_FUZZED(GLF_dead4_GLF_color);
                                                        {
                                                            if (donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                                                                donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                                            }
                                                        }
                                                    }
                                                    ;
                                                }
                                            }
                                            while (donor_replacementGLF_dead8baseIndex <= iters) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(312.423, 11.59, -8.6, -4085.9435);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    _GLF_color = vec4(168.822, -2650.8206, 7.0, -231.647);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(_GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)))))))) {
                                                            float donor_replacementGLF_dead10result = _GLF_FUZZED(determinant(mat2(-1274.0546, 1.3, -6162.1848, 5745.5919)));
                                                            float donor_replacementGLF_dead10thirty_two = _GLF_FUZZED(dFdx(vec3(7.2, -40.87, 6890.6617)[1]));
                                                            if ((donor_replacementGLF_dead1treeIndex % 32) == 0) {
                                                                donor_replacementGLF_dead10result += 0.4;
                                                            } else {
                                                                if (mod(float(donor_replacementGLF_dead1treeIndex), round(donor_replacementGLF_dead10thirty_two)) <= 0.01) {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        int donor_replacementGLF_dead14i = _GLF_FUZZED(93332);
                                                                        {
                                                                            GLF_dead4_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] = GLF_dead4_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] * GLF_dead4_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)];
                                                                        }
                                                                    }
                                                                    donor_replacementGLF_dead10result += 100.0;
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead16count = _GLF_FUZZED((donor_replacementGLF_dead1treeIndex << ivec3(-27007, -89431, 92280).b));
                                                            {
                                                                int GLF_dead16result = GLF_dead16search(donor_replacementGLF_dead1treeIndex);
                                                                switch (donor_replacementGLF_dead1treeIndex) {
                                                                    case 9:
                                                                    case 5:
                                                                    case 12:
                                                                    case 15:
                                                                    case 7:
                                                                    case 8:
                                                                    case 2:
                                                                    case 6:
                                                                    case 17:
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = fwidth(vec4(781.710, -44.21, 2.3, -175.585));
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                    case 13:
                                                                        if (GLF_dead16result == donor_replacementGLF_dead1treeIndex) {
                                                                            donor_replacementGLF_dead16count++;
                                                                        }
                                                                        break;
                                                                    default:
                                                                        if (GLF_dead16result == -1) {
                                                                            donor_replacementGLF_dead16count++;
                                                                        }
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (iters <= GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].data) {
                                                    if (GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].leftIndex == -1) {
                                                        GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].leftIndex = iters;
                                                        GLF_dead8makeTreeNode(GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)], iters);
                                                        return;
                                                    } else {
                                                        donor_replacementGLF_dead8baseIndex = GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].leftIndex;
                                                        continue;
                                                    }
                                                } else {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = clamp(dFdxCoarse(vec4(995.848, -4.4, 5.6, 90.76)), -153.954, fwidthCoarse(5.7));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-9.0, -66.92, -95.67, 58.46);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead16data = _GLF_FUZZED(59187);
                                                            if (GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].leftIndex == -1) {
                                                                GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].leftIndex = v;
                                                                GLF_dead16makeTreeNode(GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(v, 10)], donor_replacementGLF_dead16data);
                                                                return;
                                                            } else {
                                                                donor_replacementGLF_dead8baseIndex = GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].leftIndex;
                                                                continue;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(41.74, -54.46, -6.8, 9719.4140);
                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].rightIndex == -1) {
                                                        GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].rightIndex = iters;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            int donor_replacementGLF_dead9i = _GLF_FUZZED(iters);
                                                            while (GLF_dead4_GLF_color.x + GLF_dead4_GLF_color.y + GLF_dead4_GLF_color.z > 1.0 && donor_replacementGLF_dead9i < 16) {
                                                                pos = GLF_dead4_GLF_color.xz + GLF_dead4_GLF_color.yy;
                                                                pos = floor(pos * 256.0) / 256.0;
                                                                GLF_dead4_GLF_color = texture(GLF_dead9tex, pos);
                                                                donor_replacementGLF_dead9i++;
                                                            }
                                                        }
                                                        GLF_dead8makeTreeNode(GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(iters, 10)], iters);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-0.1, 3.1, 550.627, 9530.9480);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        return;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(7.6, 89.82, 8.5, -719.709);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    } else {
                                                        donor_replacementGLF_dead8baseIndex = GLF_dead8tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8baseIndex, 10)].rightIndex;
                                                        continue;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            {
                                                                GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = clamp(vec4(-1.5, -8.5, 62.92, 1134.8132), vec4(-12.86, -843.700, 0.3, 4244.0696), unpackUnorm4x8(188021u));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead10limit = _GLF_FUZZED(_GLF_color.g);
                                        float donor_replacementGLF_dead10result = _GLF_FUZZED(97.79);
                                        float donor_replacementGLF_dead10thirty_two = _GLF_FUZZED(-0.5);
                                        {
                                            if ((v % 32) == 0) {
                                                donor_replacementGLF_dead10result += 0.4;
                                            } else {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = cosh(vec4(3530.6609, 3.3, -52.36, 82.46));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                if (mod(float(v), round(donor_replacementGLF_dead10thirty_two)) <= 0.01) {
                                                    donor_replacementGLF_dead10result += 100.0;
                                                }
                                            }
                                            if (float(v) >= donor_replacementGLF_dead10limit) {
                                                ;
                                            }
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = GLF_dead4_GLF_color;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead16treeIndex = _GLF_FUZZED(v);
                        while (v <= donor_replacementGLF_dead16treeIndex) {
                            if (iters <= GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(v, 10)].data) {
                                if (GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(v, 10)].leftIndex == -1) {
                                    GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(v, 10)].leftIndex = donor_replacementGLF_dead16treeIndex;
                                    GLF_dead16makeTreeNode(GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16treeIndex, 10)], iters);
                                    return;
                                } else {
                                    v = GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(v, 10)].leftIndex;
                                    continue;
                                }
                            } else {
                                if (GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(v, 10)].rightIndex == -1) {
                                    GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(v, 10)].rightIndex = donor_replacementGLF_dead16treeIndex;
                                    GLF_dead16makeTreeNode(GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16treeIndex, 10)], iters);
                                    return;
                                } else {
                                    v = GLF_dead16tree[_GLF_MAKE_IN_BOUNDS_INT(v, 10)].rightIndex;
                                    continue;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead8count = _GLF_FUZZED(68582);
                            for (int GLF_dead8i = 0; GLF_dead8i < 20; GLF_dead8i++) {
                                int GLF_dead8result = GLF_dead8search(GLF_dead8i);
                                switch (GLF_dead8i) {
                                    case 9:
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead9i = _GLF_FUZZED(donor_replacementGLF_dead8count);
                                            vec4 donor_replacementGLF_dead9texel = _GLF_FUZZED(dFdxFine(GLF_dead4_GLF_color));
                                            {
                                                pos = donor_replacementGLF_dead9texel.xz + donor_replacementGLF_dead9texel.yy;
                                                pos = floor(pos * 256.0) / 256.0;
                                                donor_replacementGLF_dead9texel = texture(GLF_dead9tex, pos);
                                                donor_replacementGLF_dead9i++;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-246.471, 62.92, 36.04, -7.2);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                    case 5:
                                    case 12:
                                    case 15:
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-1175.2212, -563.774, 28.61, -45.03);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    case 7:
                                    case 8:
                                    case 2:
                                    case 6:
                                    case 17:
                                    case 13:
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead16count = _GLF_FUZZED(v);
                                            if (donor_replacementGLF_dead16count == 20) {
                                                GLF_dead16_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                            } else {
                                                GLF_dead16_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                                            }
                                        }
                                        if (GLF_dead8result == GLF_dead8i) {
                                            donor_replacementGLF_dead8count++;
                                        }
                                        break;
                                    default:
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((59789 & 0) | int(_GLF_ZERO(0.0, injectionSwitch.x)))); _injected_loop_counter--) {
                                            if (GLF_dead8result == -1) {
                                                donor_replacementGLF_dead8count++;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(277.006, -55.22, 6.6, -511.749);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        break;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(injectionSwitch);
                        while (_GLF_color.x + _GLF_color.y + _GLF_color.z > 1.0 && i < 16) {
                            donor_replacementGLF_dead9coord = _GLF_color.xz + _GLF_color.yy;
                            donor_replacementGLF_dead9coord = floor(donor_replacementGLF_dead9coord * 256.0) / 256.0;
                            _GLF_color = texture(GLF_dead9tex, donor_replacementGLF_dead9coord);
                            i++;
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            float donor_replacementGLF_dead10result = _GLF_FUZZED(-8.1);
                            float donor_replacementGLF_dead10thirty_two = _GLF_FUZZED(((-49.20) + 7.6));
                            {
                                if (mod(float(iters), round(donor_replacementGLF_dead10thirty_two)) <= 0.01) {
                                    if (_GLF_DEAD(false)) {
                                        vec4 donor_replacementGLF_dead14c = _GLF_FUZZED(GLF_dead4_GLF_color);
                                        for (int GLF_dead14i = 0; GLF_dead14i < 3; GLF_dead14i++) {
                                            if (donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)] >= 1.0) {
                                                donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)] = donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)] * donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 4)];
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead10result += 100.0;
                                }
                            }
                        }
                    } else {
                        _GLF_color = pal[v % 16];
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-4.4, 89.86, -504.114, 9509.1287);
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = roundEven(vec4(1.7, 3162.6072, -9.8, -813.707));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead12canwalk = _GLF_FUZZED((vec3(-7060.8132, 8.7, -290.996) != vec3(0.7, -3.2, 457.594)));
                    ivec2 donor_replacementGLF_dead12ipos = _GLF_FUZZED(ivec2(-44209, 18511));
                    do {
                        v++;
                        int GLF_dead12directions = 0;
                        if (_GLF_DEAD(false)) {
                            vec4 donor_replacementGLF_dead14c = _GLF_FUZZED(clamp(_GLF_color, _GLF_color, _GLF_color));
                            int donor_replacementGLF_dead14i = _GLF_FUZZED(iters);
                            {
                                if (donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] >= 1.0) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-541.243, 66.08, -9.7, 79.29);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] = donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] * donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)];
                                }
                            }
                        }
                        if (lin.x > 0 && GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x - 2) + (lin.y) * 16, 256)] == 0) {
                            GLF_dead12directions += 1;
                        }
                        if (lin.y > 0 && GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x) + (lin.y - 2) * 16, 256)] == 0) {
                            GLF_dead12directions += 1;
                        }
                        if (lin.x < 14 && GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x + 2) + (lin.y) * 16, 256)] == 0) {
                            GLF_dead12directions += 1;
                        }
                        if (lin.y < 14 && GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x) + (lin.y + 2) * 16, 256)] == 0) {
                            GLF_dead12directions += 1;
                        }
                        if (GLF_dead12directions == 0) {
                            donor_replacementGLF_dead12canwalk = false;
                            int GLF_dead12j = _GLF_FUZZED(38798);
                            for (v = 0; v < 8; v++) {
                                for (GLF_dead12j = 0; GLF_dead12j < 8; GLF_dead12j++) {
                                    if (GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12j * 2 + v * 2 * 16, 256)] == 0) {
                                        lin.x = GLF_dead12j * 2;
                                        lin.y = v * 2;
                                        donor_replacementGLF_dead12canwalk = true;
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(0.2, -7002.3830, 0.9, 5.6);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x) + (lin.y) * 16, 256)] = 1;
                        } else {
                            int GLF_dead12d = v % GLF_dead12directions;
                            v += GLF_dead12directions;
                            if (GLF_dead12d >= 0 && lin.x > 0 && GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x - 2) + (lin.y) * 16, 256)] == 0) {
                                GLF_dead12d--;
                                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x) + (lin.y) * 16, 256)] = 1;
                                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x - 1) + (lin.y) * 16, 256)] = 1;
                                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x - 2) + (lin.y) * 16, 256)] = 1;
                                lin.x -= 2;
                            }
                            if (GLF_dead12d >= 0 && lin.y > 0 && GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x) + (lin.y - 2) * 16, 256)] == 0) {
                                GLF_dead12d--;
                                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x) + (lin.y) * 16, 256)] = 1;
                                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x) + (lin.y - 1) * 16, 256)] = 1;
                                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x) + (lin.y - 2) * 16, 256)] = 1;
                                lin.y -= 2;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-142.573, -4.9, 11.83, 4776.6557);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            if (GLF_dead12d >= 0 && lin.x < 14 && GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x + 2) + (lin.y) * 16, 256)] == 0) {
                                GLF_dead12d--;
                                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x) + (lin.y) * 16, 256)] = 1;
                                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x + 1) + (lin.y) * 16, 256)] = 1;
                                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x + 2) + (lin.y) * 16, 256)] = 1;
                                lin.x += 2;
                            }
                            if (GLF_dead12d >= 0 && lin.y < 14 && GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x) + (lin.y + 2) * 16, 256)] == 0) {
                                GLF_dead12d--;
                                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x) + (lin.y) * 16, 256)] = 1;
                                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x) + (lin.y + 1) * 16, 256)] = 1;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(580.258, -5.8, 6.3, -9.0);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT((lin.x) + (lin.y + 2) * 16, 256)] = 1;
                                lin.y += 2;
                            }
                        }
                        if (GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12ipos.y * 16 + donor_replacementGLF_dead12ipos.x, 256)] == 1) {
                            GLF_dead12_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                            return;
                        }
                    } while (donor_replacementGLF_dead12canwalk);
                }
            }
        } else {
        }
    }
}
