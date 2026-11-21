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
int GLF_dead17MATRIX_N = 4;

layout(set = 0, binding = 1) uniform buf1 {
    vec2 GLF_dead16resolution;
};

vec4 GLF_dead18_GLF_color = _GLF_FUZZED((vec4(-1.5, -1.8, -5445.0211, -3.1) * 9979.4781));
int GLF_dead18map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
layout(set = 0, binding = 2) uniform sampler2D GLF_dead15tex;
vec4 GLF_dead12_GLF_color = _GLF_FUZZED(((-103.034) * vec4(-14.93, 1114.1149, 286.493, 352.954)));

struct GLF_dead12BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead12BST GLF_dead12tree[10] = GLF_dead12BST[10](GLF_dead12BST(0, 0, 0), GLF_dead12BST(0, 0, 0), GLF_dead12BST(0, 0, 0), GLF_dead12BST(0, 0, 0), GLF_dead12BST(0, 0, 0), GLF_dead12BST(0, 0, 0), GLF_dead12BST(0, 0, 0), GLF_dead12BST(0, 0, 0), GLF_dead12BST(0, 0, 0), GLF_dead12BST(0, 0, 0));

void GLF_dead12makeTreeNode(inout GLF_dead12BST GLF_dead12tree, int GLF_dead12data) {
    GLF_dead12tree.data = GLF_dead12data;
    GLF_dead12tree.leftIndex = -1;
    GLF_dead12tree.rightIndex = -1;
}

int GLF_dead12search(int GLF_dead12target) {
    GLF_dead12BST GLF_dead12currentNode = GLF_dead12BST(0, 0, 0);
    int GLF_dead12index = 0;
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(vec2(-61.62, -23.20));
        float donor_replacementGLF_dead15h = _GLF_FUZZED(9.2);
        float donor_replacementGLF_dead15refh = _GLF_FUZZED(log(-7294.2852));
        float donor_replacementGLF_dead15slope = _GLF_FUZZED(536.296);
        vec2 donor_replacementGLF_dead15uvstep = _GLF_FUZZED(vec2(0.5, 8.0));
        {
            donor_replacementGLF_dead15coord -= donor_replacementGLF_dead15uvstep;
            donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
            donor_replacementGLF_dead15h = texture(GLF_dead15tex, donor_replacementGLF_dead15coord).y;
            GLF_dead12index++;
        }
    }
    while (GLF_dead12index != -1) {
        GLF_dead12currentNode = GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12index, 10)];
        if (GLF_dead12currentNode.data == GLF_dead12target) {
            return GLF_dead12target;
        }
        GLF_dead12index = GLF_dead12target > GLF_dead12currentNode.data ? GLF_dead12currentNode.rightIndex : GLF_dead12currentNode.leftIndex;
    }
    return -1;
}

vec4 GLF_dead13gl_FragCoord = _GLF_FUZZED(vec4(80.60, -5.1, -7.9, -74.99));
const int GLF_dead13N = 10;
int GLF_dead13data[10] = int[10](_GLF_FUZZED((((-65562) ^ (-89101)))), _GLF_FUZZED(81492), _GLF_FUZZED((true ? (94668 * ((-39182) - 54312)) : ((-95772) * (-4151)))), _GLF_FUZZED(-40632), _GLF_FUZZED(-23410), _GLF_FUZZED(24598), _GLF_FUZZED(ivec2(76854, -25082).x), _GLF_FUZZED(77731), _GLF_FUZZED(-18685), _GLF_FUZZED(-37864)), GLF_dead13temp[10] = int[10](_GLF_FUZZED(-65869), _GLF_FUZZED((-62903)), _GLF_FUZZED(67405), _GLF_FUZZED((ivec4(79662) - ivec4(34854, 34126, -60424, 61205)).a), _GLF_FUZZED((-(-87308))), _GLF_FUZZED((~(-52531))), _GLF_FUZZED(ivec3(27654, 38995, 23111).psp.t), _GLF_FUZZED(((-3733))), _GLF_FUZZED(ivec3(-88787, 83109, -88282).s), _GLF_FUZZED(ivec4(28371, -29985, -33290, -88886).s));

void GLF_dead13merge(int GLF_dead13from, int GLF_dead13mid, int GLF_dead13to) {
    int GLF_dead13k = GLF_dead13from, GLF_dead13i = GLF_dead13from, GLF_dead13j = GLF_dead13mid + 1;
    while (GLF_dead13i <= GLF_dead13mid && GLF_dead13j <= GLF_dead13to) {
        if (GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)] < GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 10)]) {
            GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i++, 10)];
        } else {
            GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j++, 10)];
        }
    }
    while (GLF_dead13i < GLF_dead13N && GLF_dead13i <= GLF_dead13mid) {
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead17beta = _GLF_FUZZED((false ? mod(-0.5, -5249.2684) : (-1.5)));
            {
                GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)] = GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)] - (donor_replacementGLF_dead17beta * GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)]);
            }
        }
        GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i++, 10)];
    }
    if (_GLF_DEAD(false)) {
        bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED(false);
        ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(39498, 92631));
        for (GLF_dead13from = 0; GLF_dead13from < 8; GLF_dead13from++) {
            if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13from * 2 + GLF_dead13from * 2 * 16, 256)] == 0) {
                donor_replacementGLF_dead18p.x = GLF_dead13from * 2;
                donor_replacementGLF_dead18p.y = GLF_dead13from * 2;
                donor_replacementGLF_dead18canwalk = true;
            }
        }
    }
    for (int GLF_dead13i = GLF_dead13from; GLF_dead13i <= GLF_dead13to; GLF_dead13i++) {
        GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)] = GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)];
    }
}

vec4 GLF_dead14_GLF_color = _GLF_FUZZED((841.597 + (true ? vec4(6.8) : vec4(-155.213, 4.2, 3.7, -970.748))));

float GLF_dead14cross2d(vec2 GLF_dead14a, vec2 GLF_dead14b) {
    return ((GLF_dead14a.x) * (GLF_dead14b.y) - (GLF_dead14b.x) * (GLF_dead14a.y));
}

int GLF_dead14pointInTriangle(vec2 GLF_dead14p, vec2 GLF_dead14a, vec2 GLF_dead14b, vec2 GLF_dead14c) {
    float GLF_dead14pab = GLF_dead14cross2d(vec2(GLF_dead14p.x - GLF_dead14a.x, GLF_dead14p.y - GLF_dead14a.y), vec2(GLF_dead14b.x - GLF_dead14a.x, GLF_dead14b.y - GLF_dead14a.y));
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead17alpha2 = _GLF_FUZZED(dot(vec2(0.5, 7.5), GLF_dead14a));
        mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(matrixCompMult(mat4(8276.0279, -445.447, -8.5, 0.1, 27.68, 56.13, -4072.8483, 96.50, -3775.0958, 268.097, 17.39, 9235.2568, -74.90, 3.7, -3360.1142, 884.871), mat4(190.583, 282.001, 9471.0627, -6905.1380, -8.5, 6218.5937, 1.2, 1.5, 9.5, -4.8, 0.6, 10.51, -5.2, -5.7, -4.7, 7969.8686)));
        for (int GLF_dead17k = 0; GLF_dead17k < GLF_dead17MATRIX_N - 1; GLF_dead17k++) {
            for (int GLF_dead17x = GLF_dead17MATRIX_N - 1; GLF_dead17x >= GLF_dead17k; GLF_dead17x--) {
                GLF_dead14pab += donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)];
                GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)];
            }
            GLF_dead14pab = sqrt(GLF_dead14pab);
            GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)] -= (sign(GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)]) * GLF_dead14pab);
            for (int GLF_dead17u = GLF_dead17MATRIX_N - 1; GLF_dead17u >= GLF_dead17k; GLF_dead17u--) {
                GLF_dead14pab += GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)] * GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)];
            }
            donor_replacementGLF_dead17alpha2 = 2.0 / GLF_dead14pab;
            for (int GLF_dead17j = GLF_dead17k; GLF_dead17j < GLF_dead17MATRIX_N; GLF_dead17j++) {
                for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_dead17k; GLF_dead17a--) {
                    GLF_dead14pab += GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)];
                }
                GLF_dead14pab = donor_replacementGLF_dead17alpha2 * GLF_dead14pab;
                for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_dead17k; GLF_dead17a--) {
                    donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] - (GLF_dead14pab * GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                }
                GLF_dead14pab = 0.0;
                GLF_dead14pab = 0.0;
            }
            for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_dead17k; GLF_dead17b--) {
                GLF_dead14pab += GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] * GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)];
            }
            GLF_dead14pab = donor_replacementGLF_dead17alpha2 * GLF_dead14pab;
            for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_dead17k; GLF_dead17b--) {
                GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] = GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] - (GLF_dead14pab * GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)]);
            }
            GLF_dead14pab = 0.0;
            GLF_dead14pab = 0.0;
            donor_replacementGLF_dead17alpha2 = 0.0;
            GLF_dead14pab = 0.0;
            GLF_dead14pab = 0.0;
        }
    }
    float GLF_dead14pbc = GLF_dead14cross2d(vec2(GLF_dead14p.x - GLF_dead14b.x, GLF_dead14p.y - GLF_dead14b.y), vec2(GLF_dead14c.x - GLF_dead14b.x, GLF_dead14c.y - GLF_dead14b.y));
    if (!((GLF_dead14pab < 0.0 && GLF_dead14pbc < 0.0) || (GLF_dead14pab >= 0.0 && GLF_dead14pbc >= 0.0))) {
        return 0;
    }
    float GLF_dead14pca = GLF_dead14cross2d(vec2(GLF_dead14p.x - GLF_dead14c.x, GLF_dead14p.y - GLF_dead14c.y), vec2(GLF_dead14a.x - GLF_dead14c.x, GLF_dead14a.y - GLF_dead14c.y));
    if (!((GLF_dead14pab < 0.0 && GLF_dead14pca < 0.0) || (GLF_dead14pab >= 0.0 && GLF_dead14pca >= 0.0))) {
        return 0;
    }
    return 1;
}

int GLF_live8MATRIX_N = 4;

struct GLF_live7BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live7BST GLF_live7tree[10] = GLF_live7BST[10](GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0));

void GLF_live7makeTreeNode(inout GLF_live7BST GLF_live7tree, int GLF_live7data) {
    GLF_live7tree.data = GLF_live7data;
    GLF_live7tree.leftIndex = -1;
    GLF_live7tree.rightIndex = -1;
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(92.62);
        mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(6.8, -5.4, 2311.4977, -821.159, -13.05, -4.7, 7683.8022, 8.1, 4582.6403, 4.5, -207.449, -2864.2730, -4.7, -2.1, -0.0, 5853.6830));
        for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live8MATRIX_N; GLF_dead17a--) {
            donor_replacementGLF_dead17alpha3 += GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live7data, 4)];
        }
    }
}

vec4 GLF_dead6_GLF_color = _GLF_FUZZED(vec4((mat2(-8.9, 8.0, -91.15, 75.91) * vec2(5866.8146, -1.9)), float(true), -8.0));
vec4 GLF_dead5_GLF_color = _GLF_FUZZED((vec4(7.4, 486.393, 5.9, 603.105) * vec4(-3.2, 5338.8601, -6.2, 939.510)));
const vec4 GLF_dead4pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_dead4picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, 4, 4), vec4(12, 22, 4, 4));

bool GLF_dead4collision(vec2 GLF_dead4pos, vec4 GLF_dead4quad) {
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(0, clamp(0, 0, 0))); _injected_loop_counter--) {
        if (GLF_dead4pos.x < GLF_dead4quad.x) {
            return false;
        }
    }
    if (GLF_dead4pos.y < GLF_dead4quad.y) {
        return false;
    }
    if (GLF_dead4pos.x > GLF_dead4quad.x + GLF_dead4quad.z) {
        return false;
    }
    if (GLF_dead4pos.y > GLF_dead4quad.y + GLF_dead4quad.w) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead15h = _GLF_FUZZED(vec3(-54.41, 88.80, -2775.6739).g);
                float donor_replacementGLF_dead15refh = _GLF_FUZZED(-19.49);
                float donor_replacementGLF_dead15slope = _GLF_FUZZED(-1482.4677);
                while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && GLF_live8MATRIX_N < 32) {
                    GLF_dead4pos -= GLF_dead4pos;
                    donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, GLF_dead4pos).y;
                    GLF_live8MATRIX_N++;
                }
            }
            float donor_replacementGLF_dead13grey = _GLF_FUZZED(240.882);
            if (int(GLF_dead13gl_FragCoord[1]) < 180) {
                donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[5]) / 10.0;
            } else {
                if (int(GLF_dead13gl_FragCoord[1]) < 210) {
                    donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[6]) / 10.0;
                    if (_GLF_DEAD(false)) {
                        mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(mat2x3(7.9, -86.79, -6.9, 0.9, 855.556, -196.295)));
                        for (int GLF_dead17i = (GLF_dead17MATRIX_N - 1); GLF_dead17i >= 0; GLF_dead17i--) {
                            for (int GLF_dead17j = (GLF_dead17MATRIX_N - 1); GLF_dead17j >= (GLF_dead17i + 1); GLF_dead17j--) {
                                GLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)] -= (donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] * GLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)]);
                            }
                            GLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)] /= donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)];
                        }
                    }
                } else {
                    if (int(GLF_dead13gl_FragCoord[1]) < 240) {
                        donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[7]) / 10.0;
                    } else {
                        if (int(GLF_dead13gl_FragCoord[1]) < 270) {
                            donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[8]) / 10.0;
                        } else {
                            discard;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        float donor_replacementGLF_dead17alpha2 = _GLF_FUZZED(-898.359);
                        mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(-0.7, -7.0, -89.69, -7579.9010, -730.211, 0.9, -6510.6469, -1869.3294, 613.424, 79.29, 844.722, 3.3, -605.017, 3.6, 716.838, 7.0));
                        for (int GLF_dead17j = GLF_live8MATRIX_N; GLF_dead17j < GLF_dead17MATRIX_N; GLF_dead17j++) {
                            for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live8MATRIX_N; GLF_dead17a--) {
                                donor_replacementGLF_dead13grey += GLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)];
                            }
                            donor_replacementGLF_dead13grey = donor_replacementGLF_dead17alpha2 * donor_replacementGLF_dead13grey;
                            for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live8MATRIX_N; GLF_dead17a--) {
                                donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] - (donor_replacementGLF_dead13grey * GLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                            }
                            donor_replacementGLF_dead13grey = 0.0;
                            donor_replacementGLF_dead13grey = 0.0;
                        }
                    }
                }
            }
        }
        return false;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            float donor_replacementGLF_dead14pab = _GLF_FUZZED(-0.4);
            float donor_replacementGLF_dead14pbc = _GLF_FUZZED((false ? 931.937 : (-13.56)));
            if (!((donor_replacementGLF_dead14pab < 0.0 && donor_replacementGLF_dead14pbc < 0.0) || (donor_replacementGLF_dead14pab >= 0.0 && donor_replacementGLF_dead14pbc >= 0.0))) {
                ;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead17i = _GLF_FUZZED(GLF_live8MATRIX_N);
                mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(transpose(mat4(71.57, 5.1, -1.2, -27.30, 634.058, 0.8, 7.9, -6.0, -67.27, 0.7, 3194.1159, 1.2, 300.121, 594.424, 25.89, 6.5)));
                {
                    GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17i, 4)] -= (donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] * GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)]);
                }
            }
            ;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                int donor_replacementGLF_dead17k = _GLF_FUZZED(GLF_live8MATRIX_N);
                float donor_replacementGLF_dead17magnitudeX = _GLF_FUZZED(-6908.4896);
                mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED((mat4(5.2, -874.089, 6.7, -640.332, 0.6, 385.455, 81.28, 7475.7167, 455.141, -8.2, -859.802, -1.6, 28.07, -7.2, 2.6, 646.792) * dFdy(-6699.4513)));
                {
                    donor_replacementGLF_dead17magnitudeX += donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k, 4)];
                    GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k, 4)];
                }
            }
        }
    }
    return true;
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead13grey = _GLF_FUZZED(-9.4);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
            {
                GLF_dead4pos -= GLF_dead4pos;
                donor_replacementGLF_dead13grey += donor_replacementGLF_dead13grey;
                donor_replacementGLF_dead13grey = texture(GLF_dead15tex, GLF_dead4pos).y;
                GLF_live8MATRIX_N++;
            }
        }
        if (int(GLF_dead13gl_FragCoord[1]) < 120) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead15h = _GLF_FUZZED(donor_replacementGLF_dead13grey);
                int donor_replacementGLF_dead15i = _GLF_FUZZED((39350 ^ (-72403)));
                {
                    GLF_dead4pos -= GLF_dead4pos;
                    donor_replacementGLF_dead13grey += donor_replacementGLF_dead13grey;
                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, GLF_dead4pos).y;
                    donor_replacementGLF_dead15i++;
                }
            }
            donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[3]) / 10.0;
        } else {
            if (int(GLF_dead13gl_FragCoord[1]) < 150) {
                discard;
            } else {
                if (int(GLF_dead13gl_FragCoord[1]) < 180) {
                    donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[5]) / 10.0;
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead15slope = _GLF_FUZZED(fract(donor_replacementGLF_dead13grey));
                        {
                            GLF_dead4pos -= GLF_dead4pos;
                            donor_replacementGLF_dead13grey += donor_replacementGLF_dead15slope;
                            donor_replacementGLF_dead13grey = texture(GLF_dead15tex, GLF_dead4pos).y;
                            GLF_live8MATRIX_N++;
                        }
                    }
                } else {
                    if (int(GLF_dead13gl_FragCoord[1]) < 210) {
                        donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[6]) / 10.0;
                    } else {
                        if (int(GLF_dead13gl_FragCoord[1]) < 240) {
                            donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[7]) / 10.0;
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_live8MATRIX_N += 1;
                                }
                            }
                        } else {
                            if (int(GLF_dead13gl_FragCoord[1]) < 270) {
                                donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[8]) / 10.0;
                            } else {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead15i = _GLF_FUZZED(GLF_dead13N);
                                    {
                                        GLF_dead4pos -= GLF_dead4pos;
                                        donor_replacementGLF_dead13grey += donor_replacementGLF_dead13grey;
                                        donor_replacementGLF_dead13grey = texture(GLF_dead15tex, GLF_dead4pos).y;
                                        donor_replacementGLF_dead15i++;
                                    }
                                }
                                discard;
                            }
                        }
                    }
                }
            }
        }
    }
}

int GLF_live2MATRIX_N = 4;

struct _GLF_struct_1 {
    ivec3 _f0;
    mat2 _f1;
    vec4 res;
};

struct _GLF_struct_0 {
    ivec2 _f0;
    mat2x3 _f1;
    mat4 _f2;
    _GLF_struct_1 _f3;
    mat4x2 _f4;
};

layout(set = 0, binding = 3) uniform buf3 {
    vec2 injectionSwitch;
};

layout(location = 0) out vec4 _GLF_color;
layout(set = 0, binding = 0) uniform sampler2D tex;

void main() {
    {
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_dead12_GLF_color;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            vec2 donor_replacementGLF_dead14pos = _GLF_FUZZED(vec2(-4617.7938, -2.0));
            if (GLF_dead14pointInTriangle(donor_replacementGLF_dead14pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            } else {
                GLF_dead14_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead15h = _GLF_FUZZED(ldexp(222.767, GLF_live8MATRIX_N));
                    float donor_replacementGLF_dead15refh = _GLF_FUZZED(5404.0770);
                    float donor_replacementGLF_dead15slope = _GLF_FUZZED(mix(-80.10, -6.2, 80.18));
                    while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && GLF_live2MATRIX_N < 32) {
                        donor_replacementGLF_dead14pos -= donor_replacementGLF_dead14pos;
                        donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                        donor_replacementGLF_dead15h = texture(GLF_dead15tex, donor_replacementGLF_dead14pos).y;
                        GLF_live2MATRIX_N++;
                    }
                }
                _GLF_color = GLF_dead14_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(injectionSwitch);
            float donor_replacementGLF_dead15h = _GLF_FUZZED(intBitsToFloat(GLF_live2MATRIX_N));
            float donor_replacementGLF_dead15refh = _GLF_FUZZED(step(dFdy(629.801), inversesqrt(-8700.0002)));
            float donor_replacementGLF_dead15slope = _GLF_FUZZED(atanh(log(39.64)));
            vec2 donor_replacementGLF_dead15uvstep = _GLF_FUZZED(vec2(21.48, 323.622));
            {
                donor_replacementGLF_dead15coord -= donor_replacementGLF_dead15uvstep;
                donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                donor_replacementGLF_dead15h = texture(GLF_dead15tex, donor_replacementGLF_dead15coord).y;
                GLF_live8MATRIX_N++;
            }
        }
        int GLF_live7baseIndex = _GLF_FUZZED(int(true));
        {
            GLF_live7baseIndex = GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].leftIndex;
            ;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = unpackUnorm4x8(packHalf2x16(injectionSwitch));
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead6_GLF_color;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead18ipos = _GLF_FUZZED(ivec2(20185, -64808));
            if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18ipos.y * 16 + donor_replacementGLF_dead18ipos.x, 256)] == 1) {
                GLF_dead18_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                return;
            }
        }
        {
            GLF_live2MATRIX_N = (4 * GLF_live2MATRIX_N * (1000 - GLF_live2MATRIX_N)) / 1000;
            if (_GLF_DEAD(false)) {
                _GLF_color = dFdxFine(vec4(8938.4314, 3507.4786, vec2(-3.4, -3.0)));
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = normalize(vec3(-6654.6537, -3.2, 9.1).gbgr);
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    {
                        int GLF_dead12result = GLF_dead12search(GLF_live2MATRIX_N);
                        switch (GLF_live2MATRIX_N) {
                            case 9:
                            case 5:
                            case 12:
                            case 15:
                            case 7:
                            case 8:
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(95.75, vec2(-1607.3149, -9768.9428), 610.281);
                                }
                            case 2:
                            case 6:
                            case 17:
                            case 13:
                                if (GLF_dead12result == GLF_live2MATRIX_N) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = (dFdyCoarse(GLF_dead5_GLF_color) / 6445.3360);
                                    }
                                    GLF_live8MATRIX_N++;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_dead13gl_FragCoord;
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(injectionSwitch);
                                            float donor_replacementGLF_dead15h = _GLF_FUZZED(631.594);
                                            float donor_replacementGLF_dead15refh = _GLF_FUZZED(7.4);
                                            float donor_replacementGLF_dead15slope = _GLF_FUZZED(-3.7);
                                            vec2 donor_replacementGLF_dead15uvstep = _GLF_FUZZED(sign(vec2(-0.9, 2.6)));
                                            {
                                                donor_replacementGLF_dead15coord -= donor_replacementGLF_dead15uvstep;
                                                donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                                donor_replacementGLF_dead15h = texture(GLF_dead15tex, donor_replacementGLF_dead15coord).y;
                                                GLF_live2MATRIX_N++;
                                            }
                                        }
                                    }
                                }
                                break;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead6_GLF_color;
                                }
                            default:
                                if (GLF_dead12result == -1) {
                                    GLF_live8MATRIX_N++;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED((ivec2(-69490, -7717) ^ GLF_live2MATRIX_N));
                                        {
                                            GLF_dead12result--;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 1) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] = 1;
                                            donor_replacementGLF_dead18p.y -= 2;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_dead6_GLF_color;
                                    }
                                }
                                break;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    {
                        GLF_live8MATRIX_N += 1;
                    }
                }
                _GLF_color = vec4(237.682, -4188.7902, 4019.8767, 377.178);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    float donor_replacementGLF_dead17alpha1 = _GLF_FUZZED((fwidthFine(164.863) / (-9.4)));
                    float donor_replacementGLF_dead17alpha2 = _GLF_FUZZED(fma(fwidth(9.5), -739.096, mod(-40.34, 8.2)));
                    float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(fma((689.780 * 8135.5627), mix(3792.8670, (87.22 - 79.52), 860.804), 5.2));
                    float donor_replacementGLF_dead17beta = _GLF_FUZZED(-41.01);
                    int donor_replacementGLF_dead17k = _GLF_FUZZED(sign(GLF_live2MATRIX_N));
                    float donor_replacementGLF_dead17magnitudeX = _GLF_FUZZED(cosh(mix(ldexp(9.6, 77558), -3.6, false)));
                    mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(mat2x4(91.83, -74.80, -437.093, -7129.1571, 5727.5428, -462.936, 7.2, 45.07)));
                    {
                        for (int GLF_dead17x = GLF_dead17MATRIX_N - 1; GLF_dead17x >= donor_replacementGLF_dead17k; GLF_dead17x--) {
                            donor_replacementGLF_dead17magnitudeX += donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k, 4)];
                            GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k, 4)];
                        }
                        donor_replacementGLF_dead17magnitudeX = sqrt(donor_replacementGLF_dead17magnitudeX);
                        GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k, 4)] -= (sign(GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k, 4)]) * donor_replacementGLF_dead17magnitudeX);
                        for (int GLF_dead17u = GLF_dead17MATRIX_N - 1; GLF_dead17u >= donor_replacementGLF_dead17k; GLF_dead17u--) {
                            donor_replacementGLF_dead17alpha1 += GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)] * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)];
                        }
                        donor_replacementGLF_dead17alpha2 = 2.0 / donor_replacementGLF_dead17alpha1;
                        for (int GLF_dead17j = donor_replacementGLF_dead17k; GLF_dead17j < GLF_dead17MATRIX_N; GLF_dead17j++) {
                            for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= donor_replacementGLF_dead17k; GLF_dead17a--) {
                                donor_replacementGLF_dead17alpha3 += GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)];
                            }
                            donor_replacementGLF_dead17beta = donor_replacementGLF_dead17alpha2 * donor_replacementGLF_dead17alpha3;
                            for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= donor_replacementGLF_dead17k; GLF_dead17a--) {
                                donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] - (donor_replacementGLF_dead17beta * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                            }
                            donor_replacementGLF_dead17alpha3 = 0.0;
                            donor_replacementGLF_dead17beta = 0.0;
                        }
                        for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= donor_replacementGLF_dead17k; GLF_dead17b--) {
                            donor_replacementGLF_dead17alpha3 += GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)];
                        }
                        donor_replacementGLF_dead17beta = donor_replacementGLF_dead17alpha2 * donor_replacementGLF_dead17alpha3;
                        for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= donor_replacementGLF_dead17k; GLF_dead17b--) {
                            GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] = GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] - (donor_replacementGLF_dead17beta * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)]);
                        }
                        donor_replacementGLF_dead17magnitudeX = 0.0;
                        donor_replacementGLF_dead17alpha1 = 0.0;
                        donor_replacementGLF_dead17alpha2 = 0.0;
                        donor_replacementGLF_dead17alpha3 = 0.0;
                        donor_replacementGLF_dead17beta = 0.0;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = (transpose(mat4x3(-814.170, -280.805, 744.385, 9.8, 7.4, -26.38, 118.097, 0.1, -795.394, -2.6, 643.329, -2.7)) * vec3(245.753, -9120.1665, -5.7));
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        {
            GLF_live8MATRIX_N += 1;
        }
    }
    {
        int GLF_live0v = _GLF_FUZZED(-73393);
        if ((GLF_live0v & 1) == 1) {
            GLF_live0v = 3 * GLF_live0v + 1;
        } else {
            GLF_live0v /= 2;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(9.1, pow(clamp(vec2(-2795.1652, -9.6), 918.276, 42.14), injectionSwitch), -53.43);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        float donor_replacementGLF_dead17beta = _GLF_FUZZED(7.4);
        mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED((mat4(3060.7974, 0.3, -69.58, -8889.4482, 1688.6409, -30.06, -0.4, 436.607, 105.091, 429.084, 0.3, -1219.2218, 489.623, -6.2, -9.8, -8.1) / fwidthCoarse(faceforward(-1.9, 988.722, 3.7))));
        {
            donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)] - (donor_replacementGLF_dead17beta * GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)]);
        }
    }
    vec2 coord = gl_FragCoord.xy * (1.0 / 256.0);
    if (_GLF_DEAD(false)) {
        {
            discard;
        }
    }
    if (_GLF_DEAD(false)) {
        vec4 donor_replacementGLF_dead4quad = _GLF_FUZZED(_GLF_color);
        if (coord.x < donor_replacementGLF_dead4quad.x) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(clamp(ivec2(-89961, -78464), ivec2(75612, -33056), ivec2(-2038, -66897)));
                    {
                        GLF_live2MATRIX_N--;
                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                        donor_replacementGLF_dead18p.x += 2;
                    }
                }
                _GLF_color = (mat4(mat2x4(-742.625, 9508.6618, -4813.7125, 7.1, 5.7, 2.5, -6341.3185, 348.931)) * vec4(8.9, -0.6, -40.69, 9472.4423));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, true))))) {
                    float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(tan(-6506.0679));
                    {
                        donor_replacementGLF_dead17alpha3 += _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] * GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)];
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                float donor_replacementGLF_dead15h = _GLF_FUZZED(sqrt(sign(float(9741))));
                float donor_replacementGLF_dead15refh = _GLF_FUZZED(GLF_dead14_GLF_color.s);
                float donor_replacementGLF_dead15slope = _GLF_FUZZED(sqrt(exp2(-0.1)));
                while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && GLF_live2MATRIX_N < 32) {
                    coord -= coord;
                    donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                    GLF_live2MATRIX_N++;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = atan((-vec4(1.1, -37.92, -4.3, -0.9)));
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(1436.8338, -4.7, -5019.1793, 0.2);
                }
            }
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead18ipos = _GLF_FUZZED(bitCount(uvec2(49877u, 177956u)));
                if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18ipos.y * 16 + donor_replacementGLF_dead18ipos.x, 256)] == 1) {
                    GLF_dead18_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                    return;
                }
            }
            ;
        }
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED(true);
            ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED((max(ivec2(-18758, 57594), ivec3(-1813, 78924, 73978)[0]) ^ bitfieldExtract(-42993, GLF_dead13N, GLF_live2MATRIX_N)));
            {
                donor_replacementGLF_dead18p.x = GLF_live2MATRIX_N * 2;
                donor_replacementGLF_dead18p.y = GLF_live2MATRIX_N * 2;
                donor_replacementGLF_dead18canwalk = true;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(9.3, 332.145, -0.5, -762.718);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        GLF_live8MATRIX_N += 1;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    int donor_replacementGLF_dead12baseIndex = _GLF_FUZZED((+GLF_live8MATRIX_N));
                    int donor_replacementGLF_dead12treeIndex = _GLF_FUZZED(79305);
                    {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead17alpha1 = _GLF_FUZZED(vec3(-863.919, 2.6, 4.7).g);
                            for (int GLF_dead17u = GLF_dead17MATRIX_N - 1; GLF_dead17u >= GLF_live2MATRIX_N; GLF_dead17u--) {
                                donor_replacementGLF_dead17alpha1 += GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)] * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)];
                            }
                        }
                        GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12baseIndex, 10)].rightIndex = donor_replacementGLF_dead12treeIndex;
                        GLF_dead12makeTreeNode(GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12treeIndex, 10)], GLF_live8MATRIX_N);
                        return;
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead15h = _GLF_FUZZED(max(510.183, acosh(2.7)));
                            float donor_replacementGLF_dead15refh = _GLF_FUZZED(dFdyCoarse(15.89));
                            float donor_replacementGLF_dead15slope = _GLF_FUZZED(length(-62.64));
                            {
                                coord -= coord;
                                donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                                GLF_live2MATRIX_N++;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead17alpha1 = _GLF_FUZZED(vec3(-861.714, 39.48, 6750.9453)[2]);
                    float donor_replacementGLF_dead17alpha2 = _GLF_FUZZED(smoothstep(floor(5950.2802), radians(4.6), vec3(8.8, -3.3, -9.7)[2]));
                    float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(dot(-36.71, -81.57));
                    float donor_replacementGLF_dead17beta = _GLF_FUZZED(fract(acosh(880.928)));
                    float donor_replacementGLF_dead17magnitudeX = _GLF_FUZZED(float(ivec3(-14690, -1130, -3492)[0]));
                    mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(mat3x4(-115.941, 7.2, 703.914, clamp(7.3, -0.9, -7.3), -369.269, 21.21, -803.817, -6798.3325, 8.8, 9.2, 8012.6314, -8.7)));
                    for (int GLF_dead17k = 0; GLF_dead17k < GLF_dead17MATRIX_N - 1; GLF_dead17k++) {
                        for (int GLF_dead17x = GLF_dead17MATRIX_N - 1; GLF_dead17x >= GLF_dead17k; GLF_dead17x--) {
                            donor_replacementGLF_dead17magnitudeX += donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)];
                            donor_replacementGLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)];
                        }
                        donor_replacementGLF_dead17magnitudeX = sqrt(donor_replacementGLF_dead17magnitudeX);
                        donor_replacementGLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)] -= (sign(donor_replacementGLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)]) * donor_replacementGLF_dead17magnitudeX);
                        for (int GLF_dead17u = GLF_dead17MATRIX_N - 1; GLF_dead17u >= GLF_dead17k; GLF_dead17u--) {
                            donor_replacementGLF_dead17alpha1 += donor_replacementGLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)] * donor_replacementGLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)];
                        }
                        donor_replacementGLF_dead17alpha2 = 2.0 / donor_replacementGLF_dead17alpha1;
                        for (int GLF_dead17j = GLF_dead17k; GLF_dead17j < GLF_dead17MATRIX_N; GLF_dead17j++) {
                            for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_dead17k; GLF_dead17a--) {
                                donor_replacementGLF_dead17alpha3 += donor_replacementGLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)];
                            }
                            donor_replacementGLF_dead17beta = donor_replacementGLF_dead17alpha2 * donor_replacementGLF_dead17alpha3;
                            for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_dead17k; GLF_dead17a--) {
                                donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] - (donor_replacementGLF_dead17beta * donor_replacementGLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                            }
                            donor_replacementGLF_dead17alpha3 = 0.0;
                            donor_replacementGLF_dead17beta = 0.0;
                        }
                        for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_dead17k; GLF_dead17b--) {
                            donor_replacementGLF_dead17alpha3 += donor_replacementGLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] * GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)];
                        }
                        donor_replacementGLF_dead17beta = donor_replacementGLF_dead17alpha2 * donor_replacementGLF_dead17alpha3;
                        for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_dead17k; GLF_dead17b--) {
                            GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] = GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] - (donor_replacementGLF_dead17beta * donor_replacementGLF_dead4quad[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)]);
                        }
                        donor_replacementGLF_dead17magnitudeX = 0.0;
                        donor_replacementGLF_dead17alpha1 = 0.0;
                        donor_replacementGLF_dead17alpha2 = 0.0;
                        donor_replacementGLF_dead17alpha3 = 0.0;
                        donor_replacementGLF_dead17beta = 0.0;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(-32341, -43942));
                if (GLF_live2MATRIX_N >= 0 && donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                    GLF_live2MATRIX_N--;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                    donor_replacementGLF_dead18p.x += 2;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead12treeIndex = _GLF_FUZZED(GLF_live2MATRIX_N);
            if (GLF_live8MATRIX_N <= GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)].data) {
                if (GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)].leftIndex == -1) {
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead17alpha1 = _GLF_FUZZED(6.5);
                        {
                            donor_replacementGLF_dead17alpha1 += GLF_dead6_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12treeIndex, 4)] * GLF_dead6_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12treeIndex, 4)];
                        }
                    }
                    GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)].leftIndex = donor_replacementGLF_dead12treeIndex;
                    GLF_dead12makeTreeNode(GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12treeIndex, 10)], GLF_live8MATRIX_N);
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead17alpha2 = _GLF_FUZZED(dFdy(-5395.8153));
                        float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(-3070.4653);
                        float donor_replacementGLF_dead17beta = _GLF_FUZZED(acos(-96.40));
                        mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(-6058.9490, -8.4, 42.63, 3535.9033, -51.89, 80.55, 8.2, 50.91, 5.2, -4.2, 5.2, 2370.0278, -9059.9526, 1417.4594, 94.71, -40.61));
                        for (int GLF_dead17j = GLF_live2MATRIX_N; GLF_dead17j < GLF_dead17MATRIX_N; GLF_dead17j++) {
                            for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live2MATRIX_N; GLF_dead17a--) {
                                donor_replacementGLF_dead17alpha3 += GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)];
                            }
                            donor_replacementGLF_dead17beta = donor_replacementGLF_dead17alpha2 * donor_replacementGLF_dead17alpha3;
                            for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live2MATRIX_N; GLF_dead17a--) {
                                donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] - (donor_replacementGLF_dead17beta * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                            }
                            donor_replacementGLF_dead17alpha3 = 0.0;
                            donor_replacementGLF_dead17beta = 0.0;
                        }
                    }
                    return;
                } else {
                    GLF_live2MATRIX_N = GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)].leftIndex;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = (mat3x4(-5.7, -663.473, -7.2, 401.748, -69.46, -288.272, -5267.8115, 3.1, -5003.6276, 4122.7179, 6.2, -320.913) * vec3(-1.0, -67.94, -112.853));
                    }
                    ;
                }
            } else {
                if (GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)].rightIndex == -1) {
                    GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)].rightIndex = donor_replacementGLF_dead12treeIndex;
                    GLF_dead12makeTreeNode(GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12treeIndex, 10)], GLF_live8MATRIX_N);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead15h = _GLF_FUZZED(dot(vec3(-4.8, 7.1, 427.024), mat3(-8468.1589, 4101.1394, -97.65, 528.702, -4.8, 85.48, 158.731, -41.36, -317.358)[1]));
                        float donor_replacementGLF_dead15refh = _GLF_FUZZED(4.6);
                        float donor_replacementGLF_dead15slope = _GLF_FUZZED(dot(coord, (GLF_dead12_GLF_color * mat2x4(-7.7, 9.5, 7898.4001, -0.4, 4684.1193, 96.35, -278.120, -98.20))));
                        while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && GLF_live8MATRIX_N < 32) {
                            coord -= coord;
                            donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                            donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                            GLF_live8MATRIX_N++;
                        }
                    }
                    return;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = (vec2(-5.9, -3956.8163) * mat4x2(7.9, 0.3, 820.228, 8253.7659, -2673.1887, -2.8, -749.126, -8.5));
                    }
                } else {
                    GLF_live2MATRIX_N = GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)].rightIndex;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(-15319, -79464));
                        if (donor_replacementGLF_dead12treeIndex >= 0 && donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                            donor_replacementGLF_dead12treeIndex--;
                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                            donor_replacementGLF_dead18p.x += 2;
                        }
                    }
                    ;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = faceforward(exp2(GLF_dead6_GLF_color), GLF_dead13gl_FragCoord, unpackUnorm4x8(20177u));
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        int donor_replacementGLF_dead13j = _GLF_FUZZED(2279);
        while (GLF_live8MATRIX_N <= GLF_live8MATRIX_N && donor_replacementGLF_dead13j <= GLF_live8MATRIX_N) {
            if (GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 10)] < GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13j, 10)]) {
                GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N++, 10)];
            } else {
                GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13j++, 10)];
            }
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead17alpha2 = _GLF_FUZZED(-5.4);
            float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(9.1);
            float donor_replacementGLF_dead17beta = _GLF_FUZZED(-0.2);
            int donor_replacementGLF_dead17j = _GLF_FUZZED(41927);
            mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(-7.6, 29.70, 767.223, 24.99, 1.3, 4.1, -28.86, 9103.9115, 9347.5451, 6.6, 3666.1061, -5.3, 6753.7006, 92.67, 454.486, 3.9));
            {
                for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= donor_replacementGLF_dead13j; GLF_dead17a--) {
                    donor_replacementGLF_dead17alpha3 += GLF_dead6_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17j, 4)];
                }
                donor_replacementGLF_dead17beta = donor_replacementGLF_dead17alpha2 * donor_replacementGLF_dead17alpha3;
                for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= donor_replacementGLF_dead13j; GLF_dead17a--) {
                    donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17j, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17j, 4)] - (donor_replacementGLF_dead17beta * GLF_dead6_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                }
                donor_replacementGLF_dead17alpha3 = 0.0;
                donor_replacementGLF_dead17beta = 0.0;
            }
        }
    }
    _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(ivec2(1, 1), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_1(ivec3(1, 1, 1), mat2(1.0, 1.0, 1.0, 1.0), vec4(0.25)), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
    coord *= 2.0;
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, 0.0, length(vec4(0.0, 0.0, 0.0, 0.0)))))))) {
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    _GLF_color = (vec3(5901.7960, -9.3, -3342.7131) * mat4x3(-9340.9458, 0.6, -572.928, -3.2, -908.883, 236.063, -328.655, 9.8, -1.8, -3574.8682, 6.4, -56.21));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    float donor_replacementGLF_dead17alpha2 = _GLF_FUZZED(sign(9.7));
                    float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(9.3);
                    float donor_replacementGLF_dead17beta = _GLF_FUZZED(fract(fwidthFine(9511.5597)));
                    mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED((5.2 - mat4(-9.9, -9.1, -315.603, -5.5, 2678.1268, 611.686, 8.0, -3.9, -6061.1375, -8.6, -1.6, -991.802, -3182.7959, -273.388, 116.459, 2.9)));
                    for (int GLF_dead17j = GLF_live8MATRIX_N; GLF_dead17j < GLF_dead17MATRIX_N; GLF_dead17j++) {
                        for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live8MATRIX_N; GLF_dead17a--) {
                            donor_replacementGLF_dead17alpha3 += GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)];
                        }
                        donor_replacementGLF_dead17beta = donor_replacementGLF_dead17alpha2 * donor_replacementGLF_dead17alpha3;
                        for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live8MATRIX_N; GLF_dead17a--) {
                            donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] - (donor_replacementGLF_dead17beta * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                        }
                        donor_replacementGLF_dead17alpha3 = 0.0;
                        donor_replacementGLF_dead17beta = 0.0;
                    }
                }
                GLF_dead5_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead6_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead6_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(11250, 7903));
                if (donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                    GLF_live2MATRIX_N += 1;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead13grey = _GLF_FUZZED(6.9);
            {
                donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[0]) / 10.0;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(dot(vec3(3000.5387, -75.77, -516.739), vec3(-2.4, 2.0, -7.1)));
                    mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(-45.84, -9347.6104, -7.6, 99.05, 4572.8614, 6527.7696, -8876.9951, -8.0, 525.653, -94.59, -2701.9488, -2185.6846, -4.2, -1.5, -5.3, 7730.2023));
                    for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live8MATRIX_N; GLF_dead17a--) {
                        donor_replacementGLF_dead17alpha3 += GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)];
                    }
                }
                {
                    GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(-31.64, 8.1, 3.4, 843.655, 7931.9128, -55.88, 1203.6302, -8226.4905, -32.78, 36.63, -1.0, 6874.3329, -957.998, -2.9, -8878.2215, -32.68));
                    for (int GLF_dead17i = (GLF_dead17MATRIX_N - 1); GLF_dead17i >= 0; GLF_dead17i--) {
                        for (int GLF_dead17j = (GLF_dead17MATRIX_N - 1); GLF_dead17j >= (GLF_dead17i + 1); GLF_dead17j--) {
                            GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)] -= (donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)]);
                        }
                        GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)] /= donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)];
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-4280.2950, -7940.8149, 5.3, 446.622);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            float donor_replacementGLF_dead13grey = _GLF_FUZZED(-1555.9644);
                            {
                                if (int(GLF_dead13gl_FragCoord[1]) < 150) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = GLF_dead12_GLF_color;
                                    }
                                    discard;
                                } else {
                                    if (int(GLF_dead13gl_FragCoord[1]) < 180) {
                                        donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[5]) / 10.0;
                                    } else {
                                        if (int(GLF_dead13gl_FragCoord[1]) < 210) {
                                            donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[6]) / 10.0;
                                        } else {
                                            if (int(GLF_dead13gl_FragCoord[1]) < 240) {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED(mix(true, (mat3x2(981.282, -0.9, 1.0, 17.52, -86.74, -3820.8536) == mat3x2(633.780, -6.1, -0.6, 6.7, 629.420, -1744.3657)), true));
                                                        ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED((ivec2(78805, 86851)));
                                                        for (GLF_live2MATRIX_N = 0; GLF_live2MATRIX_N < 8; GLF_live2MATRIX_N++) {
                                                            if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N * 2 + GLF_live2MATRIX_N * 2 * 16, 256)] == 0) {
                                                                donor_replacementGLF_dead18p.x = GLF_live2MATRIX_N * 2;
                                                                donor_replacementGLF_dead18p.y = GLF_live2MATRIX_N * 2;
                                                                donor_replacementGLF_dead18canwalk = true;
                                                            }
                                                        }
                                                    }
                                                    _GLF_color = GLF_dead6_GLF_color;
                                                }
                                                donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[7]) / 10.0;
                                            } else {
                                                if (int(GLF_dead13gl_FragCoord[1]) < 270) {
                                                    donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[8]) / 10.0;
                                                } else {
                                                    discard;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = sqrt(vec4(6158.5816, 602.258, -458.477, -49.13));
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead17k = _GLF_FUZZED((ivec2(-67467, -34266), GLF_live2MATRIX_N));
                                        mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(mat3x2(-930.134, 5.2, 296.187, -158.034, 836.810, -5.1)));
                                        vec4 donor_replacementGLF_dead17matrix_u = _GLF_FUZZED((mat2x4(-6301.7220, -3681.2274, 181.047, -99.78, -88.45, -34.30, 545.121, 58.88) * injectionSwitch));
                                        {
                                            for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= donor_replacementGLF_dead17k; GLF_dead17a--) {
                                                donor_replacementGLF_dead13grey += donor_replacementGLF_dead17matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)];
                                            }
                                            donor_replacementGLF_dead13grey = donor_replacementGLF_dead13grey * donor_replacementGLF_dead13grey;
                                            for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= donor_replacementGLF_dead17k; GLF_dead17a--) {
                                                donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)] - (donor_replacementGLF_dead13grey * donor_replacementGLF_dead17matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                                            }
                                            donor_replacementGLF_dead13grey = 0.0;
                                            donor_replacementGLF_dead13grey = 0.0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                        float donor_replacementGLF_dead15h = _GLF_FUZZED(7.7);
                        float donor_replacementGLF_dead15refh = _GLF_FUZZED(smoothstep(-585.047, asin(-1810.6046), determinant(mat2(888.332, -9924.4135, 10.80, 7548.4689))));
                        float donor_replacementGLF_dead15slope = _GLF_FUZZED(log(7682.7486));
                        {
                            coord -= coord;
                            donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                            donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                            GLF_live8MATRIX_N++;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead15h = _GLF_FUZZED(3.4);
                            float donor_replacementGLF_dead15refh = _GLF_FUZZED(dot(7.5, -52.84));
                            float donor_replacementGLF_dead15slope = _GLF_FUZZED(4775.8563);
                            while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && GLF_live2MATRIX_N < 32) {
                                coord -= coord;
                                donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                                GLF_live2MATRIX_N++;
                            }
                        }
                        float donor_replacementGLF_dead13grey = _GLF_FUZZED(-8.3);
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(-6.2, 59.18, 2531.8915, -8.4, 899.477, -9629.6127, -2.3, 30.36, -637.031, 983.384, -7.3, 60.06, -7.5, -753.085, -1104.9703, 4820.2771));
                                for (int GLF_dead17i = (GLF_dead17MATRIX_N - 1); GLF_dead17i >= 0; GLF_dead17i--) {
                                    for (int GLF_dead17j = (GLF_dead17MATRIX_N - 1); GLF_dead17j >= (GLF_dead17i + 1); GLF_dead17j--) {
                                        GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)] -= (donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)]);
                                    }
                                    GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)] /= donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)];
                                }
                            }
                            if (int(GLF_dead13gl_FragCoord[1]) < 180) {
                                donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[5]) / 10.0;
                            } else {
                                if (int(GLF_dead13gl_FragCoord[1]) < 210) {
                                    donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[6]) / 10.0;
                                } else {
                                    if (int(GLF_dead13gl_FragCoord[1]) < 240) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_live8MATRIX_N; GLF_dead17b--) {
                                                GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] = GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] - (donor_replacementGLF_dead13grey * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)]);
                                            }
                                        }
                                        donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[7]) / 10.0;
                                    } else {
                                        if (int(GLF_dead13gl_FragCoord[1]) < 270) {
                                            donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[8]) / 10.0;
                                        } else {
                                            discard;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = dFdx(_GLF_color);
                }
                for (GLF_live2MATRIX_N = 0; GLF_live2MATRIX_N < 8; GLF_live2MATRIX_N++) {
                    if (GLF_dead4collision(coord, GLF_dead4picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 8)])) {
                        _GLF_outVarBackup_GLF_color = GLF_dead4pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead4picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 8)].x) * int(GLF_dead4picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 8)].y) + GLF_live2MATRIX_N * 9 + 11) % 16, 16)];
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead15h = _GLF_FUZZED(6.9);
                                float donor_replacementGLF_dead15refh = _GLF_FUZZED(float(-50281));
                                float donor_replacementGLF_dead15slope = _GLF_FUZZED(-750.344);
                                {
                                    coord -= coord;
                                    donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                                    GLF_live2MATRIX_N++;
                                }
                            }
                            _GLF_color = exp2(_GLF_color);
                        }
                        {
                            float GLF_live8alpha1 = _GLF_FUZZED(((+3.7) + (-1.9)));
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(14.72, -59.54, 1926.2274, 5.4, -605.039, 7958.0494, 9.6, -8.2, -520.663, 50.53, -227.817, -92.82, -1917.1933, 6.0, 6.6, 9.8));
                                {
                                    GLF_live8alpha1 += donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)];
                                    GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)];
                                }
                            }
                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead17u = _GLF_FUZZED(GLF_live2MATRIX_N);
                                    {
                                        GLF_live8alpha1 += GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17u, 4)] * GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17u, 4)];
                                    }
                                }
                                {
                                    GLF_live8MATRIX_N++;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-7.5, 8237.1151, 4.2, -5116.1772);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(vec2(0.0, 0.0)))))) {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            coord -= coord;
                                            GLF_live8alpha1 += GLF_live8alpha1;
                                            GLF_live8alpha1 = texture(GLF_dead15tex, coord).y;
                                            GLF_live8MATRIX_N++;
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            int GLF_live8k = _GLF_FUZZED(-47145);
                            int GLF_live8looplimiter1 = 0;
                            vec4 GLF_live8matrix_u = _GLF_FUZZED(vec4(vec3(-1.6, 639.487, 5.3), -1783.9278).zyyy);
                            for (int GLF_live8u = GLF_live8MATRIX_N - 1; GLF_live8u >= GLF_live8k; GLF_live8u--) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = sinh(mat4(-0.8, -226.766, -4459.7996, -7.5, -5.0, -3.5, 9.1, -2.3, -8637.7481, 3.0, 5.2, 76.98, -406.845, -8.1, 2.8, 2.4)[0]);
                                }
                                if (GLF_live8looplimiter1 >= 5) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = log2(_GLF_color);
                                    }
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(0.3, 4.6, -218.124, 2.8);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                                            {
                                                ;
                                            }
                                        }
                                    }
                                }
                                GLF_live8looplimiter1++;
                                {
                                    GLF_live8alpha1 += GLF_live8matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8u, 4)] * GLF_live8matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8u, 4)];
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead12_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead17magnitudeX = _GLF_FUZZED(log2(4178.6371));
                    mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED((uvec2(48846u, 83283u), mat4(4676.3582, 622.017, -0.7, -861.930, -724.920, -64.54, -7719.7976, 5065.3932, -310.458, -686.220, 367.193, -3996.9471, 7.9, 954.854, -2.2, 5.0)));
                    {
                        donor_replacementGLF_dead17magnitudeX += donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)];
                        GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)];
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))))) {
                vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(tan(coord));
                float donor_replacementGLF_dead15h = _GLF_FUZZED(-9447.4487);
                float donor_replacementGLF_dead15refh = _GLF_FUZZED(-0.2);
                float donor_replacementGLF_dead15slope = _GLF_FUZZED(-50.42);
                vec2 donor_replacementGLF_dead15uvstep = _GLF_FUZZED(vec2(-82.61, 1.4));
                {
                    donor_replacementGLF_dead15coord -= donor_replacementGLF_dead15uvstep;
                    donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, donor_replacementGLF_dead15coord).y;
                    GLF_live2MATRIX_N++;
                }
            }
            _GLF_color = vec4(6693.6934, -0.7, vec2(-45.57, 9.4));
            if (_GLF_DEAD(false)) {
                {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-5694.8554, -0.8, -9146.3384, 6.4);
                    }
                    int GLF_dead12result = GLF_dead12search(GLF_live2MATRIX_N);
                    switch (GLF_live2MATRIX_N) {
                        case 9:
                        case 5:
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                float donor_replacementGLF_dead15h = _GLF_FUZZED(9.3);
                                float donor_replacementGLF_dead15refh = _GLF_FUZZED(3473.3971);
                                float donor_replacementGLF_dead15slope = _GLF_FUZZED(fwidthFine(-56.37));
                                {
                                    coord -= coord;
                                    donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                                    GLF_live2MATRIX_N++;
                                }
                            }
                        case 12:
                        case 15:
                        case 7:
                        case 8:
                        case 2:
                        case 6:
                        case 17:
                        case 13:
                            if (GLF_dead12result == GLF_live2MATRIX_N) {
                                GLF_live2MATRIX_N++;
                            }
                            break;
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead15h = _GLF_FUZZED(fract(461.994));
                                float donor_replacementGLF_dead15refh = _GLF_FUZZED((+(-984.556)));
                                float donor_replacementGLF_dead15slope = _GLF_FUZZED(-859.175);
                                {
                                    coord -= coord;
                                    donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                                    GLF_live2MATRIX_N++;
                                }
                            }
                        default:
                            if (GLF_dead12result == -1) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead17beta = _GLF_FUZZED(acosh(-4.3));
                                        for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_live2MATRIX_N; GLF_dead17b--) {
                                            _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] - (donor_replacementGLF_dead17beta * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)]);
                                        }
                                    }
                                    _GLF_color = step(GLF_dead13gl_FragCoord, vec4(4385.6518, 5.5, 48.84, 9.7));
                                }
                                GLF_live2MATRIX_N++;
                            }
                            break;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                _GLF_color = _GLF_color;
            }
            {
                int GLF_live1i = _GLF_FUZZED(-57207);
                {
                    int GLF_live9looplimiter1 = 0;
                    if (GLF_live9looplimiter1 >= 3) {
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead12_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                        }
                    }
                }
                float GLF_live1limit = _GLF_FUZZED(vec2(8.7, -8.4).x);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        while (GLF_live1limit < GLF_live1limit && GLF_live8MATRIX_N < 32) {
                            coord -= coord;
                            GLF_live1limit += GLF_live1limit;
                            GLF_live1limit = texture(GLF_dead15tex, coord).y;
                            GLF_live8MATRIX_N++;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(51.57, 1.4, -2446.3212, 9.8);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (-GLF_dead12_GLF_color);
                    }
                }
                float GLF_live1result = _GLF_FUZZED(((-5553.5413) - 658.675));
                float GLF_live1thirty_two = _GLF_FUZZED(float((mat4x3(-7.1, 6.1, -3.5, 7.7, 213.437, 2400.4554, -826.996, 0.4, -3.1, -910.547, 20.70, -595.416) != mat4x3(2.3, -1.7, 1281.4439, -2.4, 5.2, -235.303, -139.319, 58.10, 56.08, -5.9, -5.8, 824.426))));
                {
                    if ((GLF_live1i % 32) == 0) {
                        GLF_live1result += 0.4;
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(injectionSwitch, GLF_live1result, GLF_live1thirty_two);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                GLF_live1i = (4 * GLF_live1i * (1000 - GLF_live1i)) / 1000;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED((mat3x2(679.000, -79.92, -0.3, -4637.2703, -78.87, 6.4) == mat3x2(mat4x3(5.2, 960.119, -810.347, 37.61, 9.7, -76.62, 51.55, 4.6, -7.5, 6.2, 368.846, -638.840))));
                            ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(-26294, 10586));
                            {
                                if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i * 2 + GLF_live1i * 2 * 16, 256)] == 0) {
                                    donor_replacementGLF_dead18p.x = GLF_live1i * 2;
                                    donor_replacementGLF_dead18p.y = GLF_live1i * 2;
                                    donor_replacementGLF_dead18canwalk = true;
                                }
                            }
                        }
                        if (mod(float(GLF_live1i), round(GLF_live1thirty_two)) <= 0.01) {
                            GLF_live1result += 100.0;
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N++, 10)];
                            }
                        }
                    }
                    if (float(GLF_live1i) >= GLF_live1limit) {
                        ;
                        {
                            vec2 GLF_live10coord = _GLF_FUZZED(vec2(559.367, -625.733));
                            if (GLF_live10coord.y > 1.0) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead12_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED((ivec2(-10491, -32238) >> (ivec2(41835, -18451))));
                                    if (donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                        GLF_live2MATRIX_N += 1;
                                    }
                                }
                                GLF_live10coord.y -= 1.0;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (+vec4(-50.73, 6.5, -9.8, -985.993));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead15h = _GLF_FUZZED(normalize((mat2(9.7, 5.9, 1757.0351, -34.54), GLF_live1limit)));
                                while (donor_replacementGLF_dead15h < GLF_live1thirty_two && GLF_live2MATRIX_N < 32) {
                                    coord -= GLF_live10coord;
                                    GLF_live1thirty_two += GLF_live1result;
                                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                                    GLF_live2MATRIX_N++;
                                }
                            }
                        }
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = vec4(GLF_live1limit, vec3(-6.2, 0.3, -6.0));
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (exp(vec4(-2958.0636, -0.1, -9.9, -7679.0728)));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = uintBitsToFloat(uvec4(66249u, 48056u, 45221u, 69828u));
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead5_GLF_color;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_live2MATRIX_N += 1;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            ;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead6_GLF_color;
                            }
                        }
                    }
                }
                {
                    vec2 GLF_live10coord = _GLF_FUZZED(vec2(-5.7, 2419.2720));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = intBitsToFloat(ivec3(60053, -15544, -18215).yzyx);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(mat2(9521.1070, -3.5, -4.9, -0.5)));
                            for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live2MATRIX_N; GLF_dead17a--) {
                                GLF_live1limit += GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)];
                            }
                        }
                    }
                    int GLF_live10i = _GLF_FUZZED(-77837);
                    if (_GLF_DEAD(false)) {
                        for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_live2MATRIX_N; GLF_dead17b--) {
                            GLF_live1result += GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] * GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)];
                        }
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (GLF_live1limit + _GLF_color);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(-99982, -69639));
                                if (donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                    GLF_live2MATRIX_N += 1;
                                }
                            }
                        }
                        if (GLF_live10coord.x > 1.0) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED((ivec2(30134, -30823) - 36269));
                                    {
                                        GLF_live2MATRIX_N--;
                                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 1) * 16, 256)] = 1;
                                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] = 1;
                                        donor_replacementGLF_dead18p.y -= 2;
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = min(vec4(-2638.7665, -216.160, 8843.5053, -7.5), vec4(9524.4302, -6.3, -34.91, -17.54));
                                if (_GLF_DEAD(false)) {
                                    for (int GLF_dead13i = GLF_live2MATRIX_N; GLF_dead13i < GLF_live2MATRIX_N; GLF_dead13i += 2 * GLF_live10i) {
                                        int GLF_dead13from = GLF_dead13i;
                                        int GLF_dead13mid = GLF_dead13i + GLF_live10i - 1;
                                        int GLF_dead13to = min(GLF_dead13i + 2 * GLF_live10i - 1, GLF_live2MATRIX_N);
                                        GLF_dead13merge(GLF_dead13from, GLF_dead13mid, GLF_dead13to);
                                    }
                                    if (_GLF_DEAD(false)) {
                                        mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(mat2x3(4.1, -441.764, -1.6, -54.15, -275.710, -199.738)));
                                        {
                                            for (int GLF_dead17j = (GLF_dead17MATRIX_N - 1); GLF_dead17j >= (GLF_live1i + 1); GLF_dead17j--) {
                                                GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)] -= (donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)]);
                                            }
                                            GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)] /= donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 4)];
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = unpackUnorm4x8(50168u);
                                    }
                                }
                            }
                            GLF_live10coord.x -= 1.0;
                        }
                        if (GLF_live10coord.y > 1.0) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = max(vec4(-141.439, -1802.5016, -9.6, 6.7), vec3(-9.3, -5.0, 61.11).rggb);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED((sinh(vec2(65.89, 7180.8703)) != vec2(4.0, -989.001)));
                                ivec2 donor_replacementGLF_dead18ipos = _GLF_FUZZED(ivec2(18366, -73292));
                                ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(49843, 74915));
                                do {
                                    GLF_live2MATRIX_N++;
                                    int GLF_dead18directions = 0;
                                    if (donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                        GLF_dead18directions += 1;
                                    }
                                    if (donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                        GLF_dead18directions += 1;
                                    }
                                    if (donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                        GLF_dead18directions += 1;
                                    }
                                    if (donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                        GLF_dead18directions += 1;
                                    }
                                    if (GLF_dead18directions == 0) {
                                        donor_replacementGLF_dead18canwalk = false;
                                        int GLF_dead18j = _GLF_FUZZED(66237);
                                        for (GLF_live1i = 0; GLF_live1i < 8; GLF_live1i++) {
                                            for (GLF_dead18j = 0; GLF_dead18j < 8; GLF_dead18j++) {
                                                if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j * 2 + GLF_live1i * 2 * 16, 256)] == 0) {
                                                    donor_replacementGLF_dead18p.x = GLF_dead18j * 2;
                                                    donor_replacementGLF_dead18p.y = GLF_live1i * 2;
                                                    donor_replacementGLF_dead18canwalk = true;
                                                }
                                            }
                                        }
                                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    } else {
                                        int GLF_dead18d = GLF_live2MATRIX_N % GLF_dead18directions;
                                        GLF_live2MATRIX_N += GLF_dead18directions;
                                        if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                            GLF_dead18d--;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead18p.x -= 2;
                                        }
                                        if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                            GLF_dead18d--;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 1) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] = 1;
                                            donor_replacementGLF_dead18p.y -= 2;
                                        }
                                        if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                            GLF_dead18d--;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead18p.x += 2;
                                        }
                                        if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                            GLF_dead18d--;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 1) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] = 1;
                                            donor_replacementGLF_dead18p.y += 2;
                                        }
                                    }
                                    if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18ipos.y * 16 + donor_replacementGLF_dead18ipos.x, 256)] == 1) {
                                        GLF_dead18_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                        return;
                                    }
                                } while (donor_replacementGLF_dead18canwalk);
                            }
                            if (_GLF_DEAD(_GLF_IDENTITY(false, false || (_GLF_IDENTITY(false, (false) && true))))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (+GLF_dead13gl_FragCoord);
                                    }
                                    if (int(GLF_dead13gl_FragCoord[1]) < 60) {
                                        GLF_live1limit = 0.5 + float(GLF_dead13data[1]) / 10.0;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                GLF_live10i += 1;
                                            }
                                        }
                                    } else {
                                        if (int(GLF_dead13gl_FragCoord[1]) < 90) {
                                            GLF_live1limit = 0.5 + float(GLF_dead13data[2]) / 10.0;
                                        } else {
                                            if (int(GLF_dead13gl_FragCoord[1]) < 120) {
                                                GLF_live1limit = 0.5 + float(GLF_dead13data[3]) / 10.0;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED((ivec2(16816, 19135)));
                                                    if (donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                                        GLF_live10i += 1;
                                                    }
                                                }
                                            } else {
                                                if (int(GLF_dead13gl_FragCoord[1]) < 150) {
                                                    discard;
                                                } else {
                                                    if (int(GLF_dead13gl_FragCoord[1]) < 180) {
                                                        GLF_live1limit = 0.5 + float(GLF_dead13data[5]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead13gl_FragCoord[1]) < 210) {
                                                            GLF_live1limit = 0.5 + float(GLF_dead13data[6]) / 10.0;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED((coord * injectionSwitch));
                                                                {
                                                                    donor_replacementGLF_dead15coord -= GLF_live10coord;
                                                                    GLF_live1limit += GLF_live1result;
                                                                    GLF_live1thirty_two = texture(GLF_dead15tex, donor_replacementGLF_dead15coord).y;
                                                                    GLF_live1i++;
                                                                }
                                                            }
                                                        } else {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                {
                                                                    GLF_live10coord -= GLF_live10coord;
                                                                    GLF_live1result += GLF_live1limit;
                                                                    GLF_live1result = texture(GLF_dead15tex, GLF_live10coord).y;
                                                                    GLF_live2MATRIX_N++;
                                                                }
                                                            }
                                                            if (int(GLF_dead13gl_FragCoord[1]) < 240) {
                                                                GLF_live1limit = 0.5 + float(GLF_dead13data[7]) / 10.0;
                                                            } else {
                                                                if (int(GLF_dead13gl_FragCoord[1]) < 270) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = abs(_GLF_outVarBackup_GLF_color);
                                                                    }
                                                                    GLF_live1limit = 0.5 + float(GLF_dead13data[8]) / 10.0;
                                                                } else {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        if (_GLF_DEAD(false)) {
                                                                            ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED((ivec2(50558, 46707) / ivec3(-95442, -55121, -24934).r));
                                                                            if (GLF_live10i >= 0 && donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                                                                GLF_live10i--;
                                                                                GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                                                GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 1) * 16, 256)] = 1;
                                                                                GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] = 1;
                                                                                donor_replacementGLF_dead18p.y += 2;
                                                                            }
                                                                        }
                                                                    }
                                                                    discard;
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        _GLF_color = GLF_dead14_GLF_color;
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    float donor_replacementGLF_dead17alpha2 = _GLF_FUZZED(GLF_live1limit);
                                                                    mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(8641.9275, 0.8, 5.5, 69.30, -9.1, 20.64, 7103.1728, 324.011, -4421.8622, -6.7, -5857.5740, 2006.8342, 55.26, -57.90, 77.03, 506.954));
                                                                    {
                                                                        for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live1i; GLF_dead17a--) {
                                                                            GLF_live1limit += GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                                                                        }
                                                                        GLF_live1limit = donor_replacementGLF_dead17alpha2 * GLF_live1limit;
                                                                        for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live1i; GLF_dead17a--) {
                                                                            donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] - (GLF_live1limit * GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                                                                        }
                                                                        GLF_live1limit = 0.0;
                                                                        GLF_live1limit = 0.0;
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = (mat3x4(-7.7, -96.34, 8.1, 189.030, 2822.9948, -473.770, 20.83, -1.4, -1.5, 4.3, 4633.4397, -805.699), vec2(-6.7, 6.8)).xyyy;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                _GLF_color = GLF_dead5_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead13m = _GLF_FUZZED(ivec3(41542, 393, -90662)[2]);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(31.05, -15.81, 4.5, 5.6, -6.8, 274.196, -35.15, -416.518, 2.9, 3624.6155, -8604.6529, -6.7, -4.3, 9.0, -7454.4416, -84.25));
                                        for (int GLF_dead17j = (GLF_dead17MATRIX_N - 1); GLF_dead17j >= (GLF_live10i + 1); GLF_dead17j--) {
                                            GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] -= (donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)]);
                                        }
                                    }
                                    {
                                        int GLF_dead13from = GLF_live10i;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_dead6_GLF_color;
                                        }
                                        int GLF_dead13mid = GLF_live10i + donor_replacementGLF_dead13m - 1;
                                        int GLF_dead13to = min(GLF_live10i + 2 * donor_replacementGLF_dead13m - 1, GLF_live2MATRIX_N);
                                        GLF_dead13merge(GLF_dead13from, GLF_dead13mid, GLF_dead13to);
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        GLF_live2MATRIX_N += 1;
                                    }
                                }
                            }
                            GLF_live10coord.y -= 1.0;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead12_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = dFdxCoarse(tanh(GLF_dead14_GLF_color));
                        }
                        GLF_live10coord *= 2.0;
                        GLF_live10i++;
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead15refh = _GLF_FUZZED(pow(GLF_live1result, GLF_live1thirty_two));
                        while (GLF_live1result < donor_replacementGLF_dead15refh && GLF_live1i < 32) {
                            coord -= coord;
                            donor_replacementGLF_dead15refh += GLF_live1limit;
                            GLF_live1result = texture(GLF_dead15tex, coord).y;
                            GLF_live1i++;
                        }
                    }
                    _GLF_color = GLF_dead5_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead18ipos = _GLF_FUZZED(ivec2(33406, -4412));
                    if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18ipos.y * 16 + donor_replacementGLF_dead18ipos.x, 256)] == 1) {
                        GLF_dead18_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                        return;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead15h = _GLF_FUZZED(3.4);
                float donor_replacementGLF_dead15refh = _GLF_FUZZED(refract(inversesqrt(54.49), -5572.5804, trunc(-943.483)));
                float donor_replacementGLF_dead15slope = _GLF_FUZZED(-7.4);
                {
                    coord -= coord;
                    donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                    GLF_live2MATRIX_N++;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            do {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead17beta = _GLF_FUZZED(689.697);
                    for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_live2MATRIX_N; GLF_dead17b--) {
                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] - (donor_replacementGLF_dead17beta * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)]);
                    }
                }
                switch (GLF_live2MATRIX_N) {
                    case 0:
                        GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)] = 4;
                        break;
                    case 1:
                        GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)] = 3;
                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, true))))) {
                            float donor_replacementGLF_dead17alpha2 = _GLF_FUZZED(-3.5);
                            float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(-55.03);
                            float donor_replacementGLF_dead17beta = _GLF_FUZZED(57.05);
                            mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(9.5, -750.479, -3.7, -475.314, -4.0, 9.0, -72.74, -9440.1699, -8.5, 0.2, -5171.2043, 3.5, 5.2, -4625.0260, 44.76, 68.24));
                            {
                                for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live2MATRIX_N; GLF_dead17a--) {
                                    donor_replacementGLF_dead17alpha3 += GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)];
                                }
                                donor_replacementGLF_dead17beta = donor_replacementGLF_dead17alpha2 * donor_replacementGLF_dead17alpha3;
                                for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live2MATRIX_N; GLF_dead17a--) {
                                    donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] - (donor_replacementGLF_dead17beta * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                                }
                                donor_replacementGLF_dead17alpha3 = 0.0;
                                donor_replacementGLF_dead17beta = 0.0;
                            }
                        }
                        break;
                    case 2:
                        GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)] = 2;
                        break;
                    case 3:
                        GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)] = 1;
                        break;
                    case 4:
                        GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)] = 0;
                        break;
                    case 5:
                        GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)] = -1;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                            _GLF_color = (vec3(-0.9, 7253.8741, -3.5) * mat4x3(2285.1939, -544.982, -4.7, -7346.2367, 0.8, -7.7, -7912.4429, -3.1, 2.6, 96.32, -82.08, -5327.9056));
                        }
                        break;
                    case 6:
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead17beta = _GLF_FUZZED(7603.3000);
                            mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(32.65, -8726.2061, 344.424, -60.07, -4.4, -7512.6597, 46.84, -2.3, 2.9, 67.34, 31.36, 291.220, -751.336, -1425.6919, -14.61, -0.9));
                            for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_live8MATRIX_N; GLF_dead17a--) {
                                donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] - (donor_replacementGLF_dead17beta * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                            }
                        }
                        GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)] = -2;
                        break;
                    case 7:
                        GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)] = -3;
                        break;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = (76.21 + GLF_dead6_GLF_color);
                        }
                    case 8:
                        GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)] = -4;
                        break;
                    case 9:
                        GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)] = -5;
                        break;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED(false);
                        int donor_replacementGLF_dead18i = _GLF_FUZZED((GLF_live8MATRIX_N >> (-58582)));
                        ivec2 donor_replacementGLF_dead18ipos = _GLF_FUZZED(ivec2(2124, -10566));
                        ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED((ivec2(74545, -54014) & GLF_live2MATRIX_N));
                        do {
                            GLF_live2MATRIX_N++;
                            int GLF_dead18directions = 0;
                            if (donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                GLF_dead18directions += 1;
                            }
                            if (donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                GLF_dead18directions += 1;
                            }
                            if (donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                GLF_dead18directions += 1;
                            }
                            if (donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                GLF_dead18directions += 1;
                            }
                            if (GLF_dead18directions == 0) {
                                donor_replacementGLF_dead18canwalk = false;
                                int GLF_dead18j = _GLF_FUZZED(66237);
                                for (donor_replacementGLF_dead18i = 0; donor_replacementGLF_dead18i < 8; donor_replacementGLF_dead18i++) {
                                    for (GLF_dead18j = 0; GLF_dead18j < 8; GLF_dead18j++) {
                                        if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j * 2 + donor_replacementGLF_dead18i * 2 * 16, 256)] == 0) {
                                            donor_replacementGLF_dead18p.x = GLF_dead18j * 2;
                                            donor_replacementGLF_dead18p.y = donor_replacementGLF_dead18i * 2;
                                            donor_replacementGLF_dead18canwalk = true;
                                        }
                                    }
                                }
                                GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                            } else {
                                int GLF_dead18d = GLF_live2MATRIX_N % GLF_dead18directions;
                                GLF_live2MATRIX_N += GLF_dead18directions;
                                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                    GLF_dead18d--;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    donor_replacementGLF_dead18p.x -= 2;
                                }
                                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                    GLF_dead18d--;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 1) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] = 1;
                                    donor_replacementGLF_dead18p.y -= 2;
                                }
                                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                    GLF_dead18d--;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    donor_replacementGLF_dead18p.x += 2;
                                }
                                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                    GLF_dead18d--;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 1) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] = 1;
                                    donor_replacementGLF_dead18p.y += 2;
                                }
                            }
                            if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18ipos.y * 16 + donor_replacementGLF_dead18ipos.x, 256)] == 1) {
                                GLF_dead18_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                return;
                            }
                        } while (donor_replacementGLF_dead18canwalk);
                    }
                    _GLF_color = fma((mat4x2(-9095.3148, -6770.9191, 3.9, 5.4, -6558.7015, -4.6, -4010.6720, 9.0), GLF_dead13gl_FragCoord), log2(_GLF_color), GLF_dead12_GLF_color);
                }
                GLF_live2MATRIX_N++;
            } while (GLF_live2MATRIX_N < 10);
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(-24123, -11730));
            if (donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                GLF_live2MATRIX_N += 1;
            }
        }
        {
            vec2 GLF_live10coord = _GLF_FUZZED((mat3x2(99.77, 7.2, 87.74, 14.13, -8.5, 8.4) * vec3(-6487.8049, -164.698, 5946.9485)));
            int GLF_live10i = _GLF_FUZZED(-51052);
            int GLF_live10looplimiter0 = 0;
            {
                if (GLF_live10looplimiter0 >= 4) {
                    ;
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead13grey = _GLF_FUZZED(radians(atan(-3.4)));
                        if (int(GLF_dead13gl_FragCoord[1]) < 60) {
                            donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[1]) / 10.0;
                        } else {
                            if (int(GLF_dead13gl_FragCoord[1]) < 90) {
                                donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[2]) / 10.0;
                            } else {
                                if (int(GLF_dead13gl_FragCoord[1]) < 120) {
                                    donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[3]) / 10.0;
                                } else {
                                    if (int(GLF_dead13gl_FragCoord[1]) < 150) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = GLF_dead14_GLF_color;
                                        }
                                        discard;
                                    } else {
                                        if (int(GLF_dead13gl_FragCoord[1]) < 180) {
                                            donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[5]) / 10.0;
                                        } else {
                                            if (int(GLF_dead13gl_FragCoord[1]) < 210) {
                                                donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[6]) / 10.0;
                                            } else {
                                                if (int(GLF_dead13gl_FragCoord[1]) < 240) {
                                                    donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[7]) / 10.0;
                                                } else {
                                                    if (int(GLF_dead13gl_FragCoord[1]) < 270) {
                                                        donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[8]) / 10.0;
                                                    } else {
                                                        discard;
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
                GLF_live10looplimiter0++;
                if (_GLF_DEAD(false)) {
                    _GLF_color = (4.8 + _GLF_outVarBackup_GLF_color);
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = vec4(vec3(0.2, 678.570, 6.0), -0.2);
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead17alpha1 = _GLF_FUZZED(-7.4);
                                vec4 donor_replacementGLF_dead17matrix_u = _GLF_FUZZED(sign(GLF_dead13gl_FragCoord));
                                {
                                    donor_replacementGLF_dead17alpha1 += donor_replacementGLF_dead17matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * donor_replacementGLF_dead17matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                                }
                            }
                            if (GLF_live8MATRIX_N <= GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10looplimiter0, 10)].data) {
                                if (GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10looplimiter0, 10)].leftIndex == -1) {
                                    GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10looplimiter0, 10)].leftIndex = GLF_live8MATRIX_N;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED(((-70152) != GLF_dead13N));
                                        ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(70563, -28195));
                                        {
                                            donor_replacementGLF_dead18p.x = GLF_live10i * 2;
                                            donor_replacementGLF_dead18p.y = GLF_live8MATRIX_N * 2;
                                            donor_replacementGLF_dead18canwalk = true;
                                        }
                                    }
                                    GLF_dead12makeTreeNode(GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 10)], GLF_live8MATRIX_N);
                                    return;
                                } else {
                                    GLF_live10looplimiter0 = GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10looplimiter0, 10)].leftIndex;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_dead6_GLF_color;
                                    }
                                    ;
                                }
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead15h = _GLF_FUZZED(vec3(-1.3, 8.1, 96.83).p);
                                    float donor_replacementGLF_dead15refh = _GLF_FUZZED(76.92);
                                    float donor_replacementGLF_dead15slope = _GLF_FUZZED(float(185468u));
                                    while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && GLF_live10looplimiter0 < 32) {
                                        GLF_live10coord -= coord;
                                        donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                        donor_replacementGLF_dead15h = texture(GLF_dead15tex, GLF_live10coord).y;
                                        GLF_live10looplimiter0++;
                                    }
                                }
                            } else {
                                if (GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10looplimiter0, 10)].rightIndex == -1) {
                                    GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10looplimiter0, 10)].rightIndex = GLF_live8MATRIX_N;
                                    GLF_dead12makeTreeNode(GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 10)], GLF_live8MATRIX_N);
                                    return;
                                } else {
                                    GLF_live10looplimiter0 = GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10looplimiter0, 10)].rightIndex;
                                    ;
                                }
                            }
                        }
                    }
                    if (GLF_live10coord.x > 1.0)
                        GLF_live10coord.x -= 1.0;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead12_GLF_color;
                    }
                    if (GLF_live10coord.y > 1.0) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                            float donor_replacementGLF_dead15h = _GLF_FUZZED(min(5.2, min(-4.9, 0.8)));
                            float donor_replacementGLF_dead15refh = _GLF_FUZZED(1702.4596);
                            float donor_replacementGLF_dead15slope = _GLF_FUZZED(9.7);
                            {
                                coord -= coord;
                                donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                                GLF_live10looplimiter0++;
                            }
                        }
                        GLF_live10coord.y -= 1.0;
                    }
                    GLF_live10coord *= 2.0;
                    GLF_live10i++;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, bool(bvec2(false, false)))) || false))) {
                        _GLF_color = GLF_dead12_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead15h = _GLF_FUZZED(-9.6);
                    float donor_replacementGLF_dead15refh = _GLF_FUZZED((atan(82.98, -1.6) - (-1097.8024)));
                    float donor_replacementGLF_dead15slope = _GLF_FUZZED(0.4);
                    while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && GLF_live10looplimiter0 < 32) {
                        coord -= GLF_live10coord;
                        donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                        donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                        GLF_live10looplimiter0++;
                    }
                }
                _GLF_color = cosh(GLF_dead12_GLF_color);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = vec4(42.46, 783.215, -8.2, 69.59);
                {
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(8854.9582, -1828.6801, -2.7, -1.6);
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead13grey = _GLF_FUZZED(((-9.3) * 0.9));
                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true && (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), bool(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))))) {
                            bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED((36570u != min(180006u, 194850u)));
                            ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(94591, 59488));
                            {
                                if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10looplimiter0 * 2 + GLF_live8MATRIX_N * 2 * 16, 256)] == 0) {
                                    donor_replacementGLF_dead18p.x = GLF_live10looplimiter0 * 2;
                                    donor_replacementGLF_dead18p.y = GLF_live8MATRIX_N * 2;
                                    donor_replacementGLF_dead18canwalk = true;
                                }
                            }
                        }
                        {
                            if (int(GLF_dead13gl_FragCoord[1]) < 240) {
                                donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[7]) / 10.0;
                            } else {
                                if (int(GLF_dead13gl_FragCoord[1]) < 270) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(-1105.1741, 45.23, -81.63, 0.7, 6.2, -13.08, -152.719, 6542.5718, -80.77, -99.03, -4.3, -50.63, 94.25, 37.43, 6.7, 528.003));
                                            for (int GLF_dead17k = 0; GLF_dead17k < GLF_dead17MATRIX_N - 1; GLF_dead17k++) {
                                                for (int GLF_dead17x = GLF_dead17MATRIX_N - 1; GLF_dead17x >= GLF_dead17k; GLF_dead17x--) {
                                                    donor_replacementGLF_dead13grey += donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)];
                                                    GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)];
                                                }
                                                donor_replacementGLF_dead13grey = sqrt(donor_replacementGLF_dead13grey);
                                                GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)] -= (sign(GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)]) * donor_replacementGLF_dead13grey);
                                                for (int GLF_dead17u = GLF_dead17MATRIX_N - 1; GLF_dead17u >= GLF_dead17k; GLF_dead17u--) {
                                                    donor_replacementGLF_dead13grey += GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)] * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)];
                                                }
                                                donor_replacementGLF_dead13grey = 2.0 / donor_replacementGLF_dead13grey;
                                                for (int GLF_dead17j = GLF_dead17k; GLF_dead17j < GLF_dead17MATRIX_N; GLF_dead17j++) {
                                                    for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_dead17k; GLF_dead17a--) {
                                                        donor_replacementGLF_dead13grey += GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)];
                                                    }
                                                    donor_replacementGLF_dead13grey = donor_replacementGLF_dead13grey * donor_replacementGLF_dead13grey;
                                                    for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_dead17k; GLF_dead17a--) {
                                                        donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] - (donor_replacementGLF_dead13grey * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                                                    }
                                                    donor_replacementGLF_dead13grey = 0.0;
                                                    donor_replacementGLF_dead13grey = 0.0;
                                                }
                                                for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_dead17k; GLF_dead17b--) {
                                                    donor_replacementGLF_dead13grey += GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] * GLF_dead6_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)];
                                                }
                                                donor_replacementGLF_dead13grey = donor_replacementGLF_dead13grey * donor_replacementGLF_dead13grey;
                                                for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_dead17k; GLF_dead17b--) {
                                                    GLF_dead6_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] = GLF_dead6_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] - (donor_replacementGLF_dead13grey * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)]);
                                                }
                                                donor_replacementGLF_dead13grey = 0.0;
                                                donor_replacementGLF_dead13grey = 0.0;
                                                donor_replacementGLF_dead13grey = 0.0;
                                                donor_replacementGLF_dead13grey = 0.0;
                                                donor_replacementGLF_dead13grey = 0.0;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[8]) / 10.0;
                                } else {
                                    discard;
                                }
                                if (_GLF_DEAD(false)) {
                                    for (GLF_live8MATRIX_N = 0; GLF_live8MATRIX_N < 16 * 16; GLF_live8MATRIX_N++) {
                                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 256)] = 0;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead17alpha1 = _GLF_FUZZED(vec2(donor_replacementGLF_dead13grey).g);
                                int donor_replacementGLF_dead17k = _GLF_FUZZED(ivec2(20826, 24978)[1]);
                                for (int GLF_dead17u = GLF_dead17MATRIX_N - 1; GLF_dead17u >= donor_replacementGLF_dead17k; GLF_dead17u--) {
                                    donor_replacementGLF_dead17alpha1 += GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)] * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)];
                                }
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED((any(bvec2(true, true)) != false));
                            ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(17189));
                            if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N * 2 + GLF_live2MATRIX_N * 2 * 16, 256)] == 0) {
                                donor_replacementGLF_dead18p.x = GLF_live2MATRIX_N * 2;
                                donor_replacementGLF_dead18p.y = GLF_live2MATRIX_N * 2;
                                donor_replacementGLF_dead18canwalk = true;
                            }
                        }
                    }
                }
            }
        }
        _GLF_color = vec4(-2572.9219, -137.327, -171.294, -1.0);
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead15h = _GLF_FUZZED(abs(1.0));
                float donor_replacementGLF_dead15refh = _GLF_FUZZED(-43.69);
                float donor_replacementGLF_dead15slope = _GLF_FUZZED(sinh(-6.2));
                {
                    coord -= coord;
                    donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                    GLF_live2MATRIX_N++;
                }
            }
            _GLF_color = GLF_dead6_GLF_color;
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            {
                vec2 GLF_live10coord = _GLF_FUZZED(((-666.588) * vec2(-5.1, -0.8)));
                int GLF_live10i = _GLF_FUZZED(int(false));
                {
                    if (GLF_live10coord.x > 1.0) {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead15h = _GLF_FUZZED(-4.7);
                            float donor_replacementGLF_dead15refh = _GLF_FUZZED(distance(injectionSwitch, injectionSwitch));
                            float donor_replacementGLF_dead15slope = _GLF_FUZZED(max(-1.2, -3.0));
                            {
                                GLF_live10coord -= coord;
                                donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                donor_replacementGLF_dead15h = texture(GLF_dead15tex, GLF_live10coord).y;
                                GLF_live8MATRIX_N++;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = fma(_GLF_outVarBackup_GLF_color, _GLF_color, _GLF_color);
                        }
                        GLF_live10coord.x -= 1.0;
                    }
                    if (GLF_live10coord.y > 1.0) {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(27.02);
                            for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_live8MATRIX_N; GLF_dead17b--) {
                                donor_replacementGLF_dead17alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] * GLF_dead6_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)];
                            }
                        }
                        GLF_live10coord.y -= 1.0;
                    }
                    GLF_live10coord *= 2.0;
                    GLF_live10i++;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (injectionSwitch * mat4x2(-756.681, 9.5, -81.66, -8480.1010, -4762.3685, -2265.5956, -5.9, -26.23));
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                vec2 donor_replacementGLF_dead14pos = _GLF_FUZZED(dFdxFine(coord));
                if (GLF_dead14pointInTriangle(donor_replacementGLF_dead14pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        float donor_replacementGLF_dead15h = _GLF_FUZZED(exp(-5.6));
                        float donor_replacementGLF_dead15refh = _GLF_FUZZED(-1.7);
                        float donor_replacementGLF_dead15slope = _GLF_FUZZED(asin(216.240));
                        while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && GLF_live2MATRIX_N < 32) {
                            donor_replacementGLF_dead14pos -= coord;
                            donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                            donor_replacementGLF_dead15h = texture(GLF_dead15tex, donor_replacementGLF_dead14pos).y;
                            GLF_live2MATRIX_N++;
                        }
                    }
                    GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        float donor_replacementGLF_dead17alpha1 = _GLF_FUZZED(43.25);
                        float donor_replacementGLF_dead17alpha2 = _GLF_FUZZED(acosh(9.1));
                        float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(-6943.6319);
                        float donor_replacementGLF_dead17beta = _GLF_FUZZED(fwidth(5.2));
                        float donor_replacementGLF_dead17magnitudeX = _GLF_FUZZED(vec3(-8.2, 108.972, -279.381)[1]);
                        mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED((mat4(-60.92, 283.013, -3.2, 6.6, -2323.6745, -139.040, -14.81, 1.3, -40.42, -8.9, 1309.8065, 8.2, -91.83, 6413.4064, -832.901, -8.8) * (-626.319)));
                        vec4 donor_replacementGLF_dead17matrix_b = _GLF_FUZZED((GLF_dead6_GLF_color / _GLF_color));
                        for (int GLF_dead17k = 0; GLF_dead17k < GLF_dead17MATRIX_N - 1; GLF_dead17k++) {
                            for (int GLF_dead17x = GLF_dead17MATRIX_N - 1; GLF_dead17x >= GLF_dead17k; GLF_dead17x--) {
                                donor_replacementGLF_dead17magnitudeX += donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)];
                                GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)];
                            }
                            donor_replacementGLF_dead17magnitudeX = sqrt(donor_replacementGLF_dead17magnitudeX);
                            GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)] -= (sign(GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)]) * donor_replacementGLF_dead17magnitudeX);
                            for (int GLF_dead17u = GLF_dead17MATRIX_N - 1; GLF_dead17u >= GLF_dead17k; GLF_dead17u--) {
                                donor_replacementGLF_dead17alpha1 += GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)] * GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)];
                            }
                            donor_replacementGLF_dead17alpha2 = 2.0 / donor_replacementGLF_dead17alpha1;
                            for (int GLF_dead17j = GLF_dead17k; GLF_dead17j < GLF_dead17MATRIX_N; GLF_dead17j++) {
                                for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_dead17k; GLF_dead17a--) {
                                    donor_replacementGLF_dead17alpha3 += GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)];
                                }
                                donor_replacementGLF_dead17beta = donor_replacementGLF_dead17alpha2 * donor_replacementGLF_dead17alpha3;
                                for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_dead17k; GLF_dead17a--) {
                                    donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] - (donor_replacementGLF_dead17beta * GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                                }
                                donor_replacementGLF_dead17alpha3 = 0.0;
                                donor_replacementGLF_dead17beta = 0.0;
                            }
                            for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_dead17k; GLF_dead17b--) {
                                donor_replacementGLF_dead17alpha3 += GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] * donor_replacementGLF_dead17matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)];
                            }
                            donor_replacementGLF_dead17beta = donor_replacementGLF_dead17alpha2 * donor_replacementGLF_dead17alpha3;
                            for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_dead17k; GLF_dead17b--) {
                                donor_replacementGLF_dead17matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] = donor_replacementGLF_dead17matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] - (donor_replacementGLF_dead17beta * GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)]);
                            }
                            donor_replacementGLF_dead17magnitudeX = 0.0;
                            donor_replacementGLF_dead17alpha1 = 0.0;
                            donor_replacementGLF_dead17alpha2 = 0.0;
                            donor_replacementGLF_dead17alpha3 = 0.0;
                            donor_replacementGLF_dead17beta = 0.0;
                        }
                    }
                    GLF_dead14_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead5_GLF_color;
            }
            {
                float GLF_live2beta = _GLF_FUZZED(-16.50);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = reflect(GLF_dead13gl_FragCoord, GLF_dead5_GLF_color);
                }
                int GLF_live2j = _GLF_FUZZED(35255);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0)))))) {
                    ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(sign(ivec2(-6536, 38810)));
                    if (donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                        GLF_live8MATRIX_N += 1;
                    }
                }
                int GLF_live2k = _GLF_FUZZED((4734 - 15900));
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead12_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                        }
                    }
                } else {
                    {
                        {
                            ;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = acosh(_GLF_outVarBackup_GLF_color);
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED(true);
                        ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(-65429, 67895));
                        for (GLF_live2k = 0; GLF_live2k < 8; GLF_live2k++) {
                            for (GLF_live2MATRIX_N = 0; GLF_live2MATRIX_N < 8; GLF_live2MATRIX_N++) {
                                if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N * 2 + GLF_live2k * 2 * 16, 256)] == 0) {
                                    donor_replacementGLF_dead18p.x = GLF_live2MATRIX_N * 2;
                                    donor_replacementGLF_dead18p.y = GLF_live2k * 2;
                                    donor_replacementGLF_dead18canwalk = true;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = GLF_dead14_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = clamp(exp2(vec4(74.98, 2.2, -1.5, -14.91)), vec4(7.3, 144.032, -605.403, -520.845), vec4(-1.6, 638.613, 28.43, 5.4));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat4(sin(0.0), 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, sqrt(0.0), 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = tan((vec3(-3.4, 8.7, -9.6) * mat4x3(-68.24, 26.27, -5.3, -5.6, -125.517, 362.871, 86.87, 13.84, -2.2, -3.8, 9.6, -2968.8046)));
                            }
                            GLF_dead5_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(91.71, -621.904, -7931.8905, -0.9, 5.9, 3.5, 3.6, -615.682, 4151.4116, -4.4, 90.62, 9229.2942, 3.8, 6.5, -4.8, 6909.5672));
                                {
                                    GLF_live2beta += donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)];
                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)];
                                }
                            }
                        }
                    }
                }
                mat4 GLF_live2matrix_a = _GLF_FUZZED(mat4(-0.9, -4419.7175, 4295.6961, -5.0, 2151.2277, -3.4, -384.445, -1.6, 3207.6592, 112.213, 1452.6661, -6665.0731, -2.3, 8.4, -7.5, 422.614));
                vec4 GLF_live2matrix_u = _GLF_FUZZED(((vec4(-342.486, 1348.4312, 670.654, -5.4) + vec4(-3.6, -7.0, 385.760, -135.139))));
                {
                    int GLF_live2looplimiter3 = 0;
                    for (int GLF_live2a = GLF_live2MATRIX_N - 1; GLF_live2a >= GLF_live2k; GLF_live2a--) {
                        if (GLF_live2looplimiter3 >= 6) {
                            break;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-499.257, 7.4, 33.35, 55.46);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (abs(GLF_live2beta) / GLF_dead6_GLF_color);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = vec4(GLF_live2beta);
                        }
                        {
                            int GLF_live9i = _GLF_FUZZED((~95117));
                            if (_GLF_DEAD(false)) {
                                {
                                    coord -= coord;
                                    GLF_live2beta += GLF_live2beta;
                                    GLF_live2beta = texture(GLF_dead15tex, coord).y;
                                    GLF_live8MATRIX_N++;
                                }
                            }
                            int GLF_live9j = _GLF_FUZZED(-5425);
                            uint GLF_live9uselessOutVariable = _GLF_FUZZED(112410u);
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        GLF_live2beta = 0.5 + float(GLF_dead13data[6]) / 10.0;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(-13874, -85058));
                                        {
                                            GLF_live2j--;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead18p.x += 2;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(80581, 23504));
                                    if (GLF_live2looplimiter3 >= 0 && donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                        GLF_live2looplimiter3--;
                                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                        donor_replacementGLF_dead18p.x += 2;
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(652.996, 55.26, 550.916, 74.99);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = GLF_dead6_GLF_color;
                            }
                            if (uint(GLF_live9j) < uaddCarry(uint(GLF_live9i), 1u, GLF_live9uselessOutVariable)) {
                                ;
                            }
                        }
                        GLF_live2looplimiter3++;
                        {
                            GLF_live2matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j, 4)] = GLF_live2matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j, 4)] - (GLF_live2beta * GLF_live2matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2a, 4)]);
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(7831, -13328));
                        if (GLF_live2j >= 0 && donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                            GLF_live2j--;
                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 1) * 16, 256)] = 1;
                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] = 1;
                            donor_replacementGLF_dead18p.y += 2;
                        }
                    }
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead15h = _GLF_FUZZED(min(-8.0, 26.07));
                float donor_replacementGLF_dead15refh = _GLF_FUZZED(floor(-4.3));
                float donor_replacementGLF_dead15slope = _GLF_FUZZED(_GLF_color.x);
                while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && GLF_live2MATRIX_N < 32) {
                    coord -= coord;
                    donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                    GLF_live2MATRIX_N++;
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    if (_GLF_DEAD(false)) {
                        mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(9328.7304, 9400.3320, -637.296, -37.46, -81.26, 34.31, -5.3, -2.0, 4.5, -4285.2527, 4.8, -2.5, 644.694, 9.4, 9.4, 3.2));
                        for (int GLF_dead17i = (GLF_dead17MATRIX_N - 1); GLF_dead17i >= 0; GLF_dead17i--) {
                            for (int GLF_dead17j = (GLF_dead17MATRIX_N - 1); GLF_dead17j >= (GLF_dead17i + 1); GLF_dead17j--) {
                                GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)] -= (donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)]);
                            }
                            GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)] /= donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 4)];
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead13grey = _GLF_FUZZED(min(8991.6056, degrees(-6.0)));
                        {
                            donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[2]) / 10.0;
                        }
                    }
                    int GLF_live7baseIndex = _GLF_FUZZED(((-91625) ^ (-36364)));
                    int GLF_live7data = _GLF_FUZZED(ivec4(97738, 46706, -59228, 71845).r);
                    int GLF_live7treeIndex = _GLF_FUZZED(-44753);
                    {
                        if (GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].rightIndex == -1) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = vec4(50.67, 5.8, -94.84, 748.815);
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(0.0, 1.0, 1.0), vec3(1.0, 0.0, 0.0)), dot(vec3(0.0, 1.0, 1.0), vec3(1.0, 0.0, 0.0))))))) {
                                        bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED((uvec3(77902u, 89410u, 78488u) != min(uvec3(46421u, 109775u, 160307u), 94668u)));
                                        ivec2 donor_replacementGLF_dead18ipos = _GLF_FUZZED((+(ivec4(89782, -46018, -53147, 36768) | ivec4(83745, 2538, 75751, -77908))).ag);
                                        ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED((ivec2(-81052, 46859) & GLF_live2MATRIX_N));
                                        {
                                            GLF_live7data++;
                                            int GLF_dead18directions = 0;
                                            if (donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                                GLF_dead18directions += 1;
                                            }
                                            if (donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                                GLF_dead18directions += 1;
                                            }
                                            if (donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                                GLF_dead18directions += 1;
                                            }
                                            if (donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                                GLF_dead18directions += 1;
                                            }
                                            if (GLF_dead18directions == 0) {
                                                donor_replacementGLF_dead18canwalk = false;
                                                int GLF_dead18j = _GLF_FUZZED(66237);
                                                for (GLF_live2MATRIX_N = 0; GLF_live2MATRIX_N < 8; GLF_live2MATRIX_N++) {
                                                    for (GLF_dead18j = 0; GLF_dead18j < 8; GLF_dead18j++) {
                                                        if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j * 2 + GLF_live2MATRIX_N * 2 * 16, 256)] == 0) {
                                                            donor_replacementGLF_dead18p.x = GLF_dead18j * 2;
                                                            donor_replacementGLF_dead18p.y = GLF_live2MATRIX_N * 2;
                                                            donor_replacementGLF_dead18canwalk = true;
                                                        }
                                                    }
                                                }
                                                GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            } else {
                                                int GLF_dead18d = GLF_live7data % GLF_dead18directions;
                                                GLF_live7data += GLF_dead18directions;
                                                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                                    GLF_dead18d--;
                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                    donor_replacementGLF_dead18p.x -= 2;
                                                }
                                                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                                    GLF_dead18d--;
                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 1) * 16, 256)] = 1;
                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] = 1;
                                                    donor_replacementGLF_dead18p.y -= 2;
                                                }
                                                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                                    GLF_dead18d--;
                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                    donor_replacementGLF_dead18p.x += 2;
                                                }
                                                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                                    GLF_dead18d--;
                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 1) * 16, 256)] = 1;
                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] = 1;
                                                    donor_replacementGLF_dead18p.y += 2;
                                                }
                                            }
                                            if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18ipos.y * 16 + donor_replacementGLF_dead18ipos.x, 256)] == 1) {
                                                GLF_dead18_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                                return;
                                            }
                                        }
                                    }
                                    {
                                        GLF_dead14_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                    }
                                }
                                _GLF_color = vec4(-842.916, 4184.9306, 8.4, -3.4);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(-55703, -8589));
                                    {
                                        GLF_live2MATRIX_N--;
                                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 1) * 16, 256)] = 1;
                                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] = 1;
                                        donor_replacementGLF_dead18p.y += 2;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    {
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(round(-18.29));
                                            {
                                                donor_replacementGLF_dead17alpha3 += _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 4)] * GLF_dead6_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 4)];
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        ;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            {
                                                discard;
                                            }
                                        }
                                    }
                                }
                            }
                            GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].rightIndex = GLF_live7treeIndex;
                            GLF_live7makeTreeNode(GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7treeIndex, 10)], GLF_live7data);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead13gl_FragCoord;
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(vec2(776.547, 82.96));
                                    float donor_replacementGLF_dead15h = _GLF_FUZZED((_GLF_outVarBackup_GLF_color.b / 84.03));
                                    float donor_replacementGLF_dead15refh = _GLF_FUZZED(-751.051);
                                    float donor_replacementGLF_dead15slope = _GLF_FUZZED(-330.410);
                                    while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && GLF_live2MATRIX_N < 32) {
                                        donor_replacementGLF_dead15coord -= coord;
                                        donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                        donor_replacementGLF_dead15h = texture(GLF_dead15tex, donor_replacementGLF_dead15coord).y;
                                        GLF_live2MATRIX_N++;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED((vec2(203.969, -5.1) / mod(8.0, -7.6)));
                                float donor_replacementGLF_dead15h = _GLF_FUZZED(766.542);
                                float donor_replacementGLF_dead15refh = _GLF_FUZZED(-6.5);
                                float donor_replacementGLF_dead15slope = _GLF_FUZZED(-467.191);
                                {
                                    donor_replacementGLF_dead15coord -= coord;
                                    donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, donor_replacementGLF_dead15coord).y;
                                    GLF_live7baseIndex++;
                                }
                            }
                            ;
                        } else {
                            GLF_live7baseIndex = GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].rightIndex;
                            ;
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(findMSB(1385u), min(ivec3(-86849, 16376, -15699).p, GLF_live8MATRIX_N)));
                                if (donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                    GLF_live8MATRIX_N += 1;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead18d = _GLF_FUZZED(bitCount(packUnorm4x8(_GLF_color)));
                                ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(48389, -72270));
                                {
                                    donor_replacementGLF_dead18d--;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 1) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] = 1;
                                    donor_replacementGLF_dead18p.y -= 2;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = sinh(vec4(8.8, -44.66, 31.91, -8.4));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED((mat2(mat3x4(-6.3, -2517.7265, 3.8, -8.8, -2.1, 1995.6798, -4611.2790, -8793.0318, 511.067, 97.65, -95.25, 7062.7006)) == mat2(753.224, -5732.6951, 2.1, -7.0)));
                                ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(bitfieldReverse(ivec2(18651, -36898)));
                                {
                                    if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N * 2 + GLF_live7treeIndex * 2 * 16, 256)] == 0) {
                                        donor_replacementGLF_dead18p.x = GLF_live2MATRIX_N * 2;
                                        donor_replacementGLF_dead18p.y = GLF_live7treeIndex * 2;
                                        donor_replacementGLF_dead18canwalk = true;
                                    }
                                }
                            }
                        }
                    }
                }
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                int donor_replacementGLF_dead17k = _GLF_FUZZED(-64912);
                float donor_replacementGLF_dead17magnitudeX = _GLF_FUZZED(70.92);
                mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(-3.0, -515.885, 3.1, 3.5, -334.000, 293.670, 4480.9923, -3812.0826, 156.156, -4433.3973, -5.8, -3.0, -7323.1363, 8419.4609, -47.70, 254.848));
                {
                    donor_replacementGLF_dead17magnitudeX += donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k, 4)];
                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k, 4)];
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED(true);
                        ivec2 donor_replacementGLF_dead18ipos = _GLF_FUZZED((true ? ivec2(-79849, 96628) : ivec2(-53047, -45079)));
                        ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(((bitfieldExtract(ivec2(11709, -82386), GLF_dead13N, GLF_dead13N) / bitCount(ivec2(-35063, 41621))) & ivec2(-10796, -11518)));
                        {
                            GLF_live2MATRIX_N++;
                            int GLF_dead18directions = 0;
                            if (donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                GLF_dead18directions += 1;
                            }
                            if (donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                GLF_dead18directions += 1;
                            }
                            if (donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                GLF_dead18directions += 1;
                            }
                            if (donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                GLF_dead18directions += 1;
                            }
                            if (GLF_dead18directions == 0) {
                                donor_replacementGLF_dead18canwalk = false;
                                int GLF_dead18j = _GLF_FUZZED(66237);
                                for (GLF_live2MATRIX_N = 0; GLF_live2MATRIX_N < 8; GLF_live2MATRIX_N++) {
                                    for (GLF_dead18j = 0; GLF_dead18j < 8; GLF_dead18j++) {
                                        if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j * 2 + GLF_live2MATRIX_N * 2 * 16, 256)] == 0) {
                                            donor_replacementGLF_dead18p.x = GLF_dead18j * 2;
                                            donor_replacementGLF_dead18p.y = GLF_live2MATRIX_N * 2;
                                            donor_replacementGLF_dead18canwalk = true;
                                        }
                                    }
                                }
                                GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                            } else {
                                int GLF_dead18d = GLF_live2MATRIX_N % GLF_dead18directions;
                                GLF_live2MATRIX_N += GLF_dead18directions;
                                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                    GLF_dead18d--;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    donor_replacementGLF_dead18p.x -= 2;
                                }
                                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                    GLF_dead18d--;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 1) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] = 1;
                                    donor_replacementGLF_dead18p.y -= 2;
                                }
                                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                    GLF_dead18d--;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    donor_replacementGLF_dead18p.x += 2;
                                }
                                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                    GLF_dead18d--;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 1) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] = 1;
                                    donor_replacementGLF_dead18p.y += 2;
                                }
                            }
                            if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18ipos.y * 16 + donor_replacementGLF_dead18ipos.x, 256)] == 1) {
                                GLF_dead18_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                return;
                            }
                        }
                    }
                    GLF_live2MATRIX_N = GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 10)].rightIndex;
                    ;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead15h = _GLF_FUZZED(mod(coord[0], -9036.3281));
                    float donor_replacementGLF_dead15refh = _GLF_FUZZED(fma(54.15, -6.7, 7.0));
                    float donor_replacementGLF_dead15slope = _GLF_FUZZED(28.65);
                    while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && GLF_live8MATRIX_N < 32) {
                        coord -= coord;
                        donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                        donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                        GLF_live8MATRIX_N++;
                    }
                }
                _GLF_color = GLF_dead14_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED((+(GLF_dead13N | ivec2(-21663, -88605))));
                {
                    GLF_live2MATRIX_N--;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 1) * 16, 256)] = 1;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] = 1;
                    donor_replacementGLF_dead18p.y += 2;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                float donor_replacementGLF_dead17magnitudeX = _GLF_FUZZED(-5.0);
                mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(mat4x3(67.13, -1.6, -73.30, 7161.4415, -262.159, dot(_GLF_color, GLF_dead5_GLF_color), -131.478, -5.1, -926.702, 855.766, 86.50, refract(7.1, 5234.4013, 2.3))));
                {
                    donor_replacementGLF_dead17magnitudeX += donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)];
                    _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 4)];
                }
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = ((-96.04) + GLF_dead14_GLF_color);
                }
                {
                    {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead17alpha1 = _GLF_FUZZED(pow(-7520.1908, float(findMSB(-31075))));
                            for (int GLF_dead17u = GLF_dead17MATRIX_N - 1; GLF_dead17u >= GLF_live8MATRIX_N; GLF_dead17u--) {
                                donor_replacementGLF_dead17alpha1 += _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)];
                            }
                        }
                        ;
                    }
                }
                GLF_dead6_GLF_color = vec4(vec3(0.0), 1.0);
                {
                    vec2 GLF_live10coord = _GLF_FUZZED(((vec2(-2.2, 839.481) * (+vec2(97.24, -8656.8758))) - vec2(73.53, -7.7)));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (mat3x4(-271.407, -3026.0866, -9.1, 700.246, -29.52, -5033.7760, 0.2, 0.8, 4.6, 1.5, 56.86, 0.1) * exp(vec3(-5.5, -81.52, -22.28)));
                    }
                    if (GLF_live10coord.x > 1.0)
                        GLF_live10coord.x -= 1.0;
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(-1807.6872);
                    mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED((mat4(0.4, 1.2, -7.9, 8.8, 9.7, -5893.8880, 2595.3582, -7051.5213, -97.80, 11.16, 8687.5653, -3687.1533, -2.0, 845.129, -7.9, -7.9) * dFdyCoarse(-3.2)));
                    {
                        donor_replacementGLF_dead17alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)];
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    float donor_replacementGLF_dead15h = _GLF_FUZZED(tanh(8.7));
                    float donor_replacementGLF_dead15refh = _GLF_FUZZED(9.1);
                    float donor_replacementGLF_dead15slope = _GLF_FUZZED(-2.0);
                    {
                        coord -= coord;
                        donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                        donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                        GLF_live8MATRIX_N++;
                    }
                }
                _GLF_color = unpackUnorm4x8(12275u);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
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
    if (_GLF_DEAD(false)) {
        _GLF_color = dFdyFine(vec4(37.38, -3.6, -744.053, 87.29));
    }
    {
        if (_GLF_DEAD(false)) {
            _GLF_color = exp(GLF_dead6_GLF_color);
        }
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED((mat4x2(9.5, 971.979, 700.580, 114.515, -20.46, 8.1, 6539.7873, 9.5) == mat4x2(-842.749, -7.6, 2.2, -2.5, -8365.5517, -7631.6647, 0.7, 328.397)));
            ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(88721, 87650));
            if (GLF_live8MATRIX_N == 0) {
                donor_replacementGLF_dead18canwalk = false;
                int GLF_dead18j = _GLF_FUZZED(66237);
                for (GLF_live8MATRIX_N = 0; GLF_live8MATRIX_N < 8; GLF_live8MATRIX_N++) {
                    for (GLF_dead18j = 0; GLF_dead18j < 8; GLF_dead18j++) {
                        if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j * 2 + GLF_live8MATRIX_N * 2 * 16, 256)] == 0) {
                            donor_replacementGLF_dead18p.x = GLF_dead18j * 2;
                            donor_replacementGLF_dead18p.y = GLF_live8MATRIX_N * 2;
                            donor_replacementGLF_dead18canwalk = true;
                        }
                    }
                }
                GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
            } else {
                int GLF_dead18d = GLF_live2MATRIX_N % GLF_live8MATRIX_N;
                GLF_live2MATRIX_N += GLF_live8MATRIX_N;
                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                    GLF_dead18d--;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                    donor_replacementGLF_dead18p.x -= 2;
                }
                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                    GLF_dead18d--;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 1) * 16, 256)] = 1;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] = 1;
                    donor_replacementGLF_dead18p.y -= 2;
                }
                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                    GLF_dead18d--;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                    donor_replacementGLF_dead18p.x += 2;
                }
                if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                    GLF_dead18d--;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 1) * 16, 256)] = 1;
                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] = 1;
                    donor_replacementGLF_dead18p.y += 2;
                }
            }
        }
        int GLF_live8looplimiter2 = 0;
        if (GLF_live8looplimiter2 >= 5) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead14pab = _GLF_FUZZED(sinh(7.3));
                float donor_replacementGLF_dead14pca = _GLF_FUZZED(fwidthCoarse(refract(9354.1944, asin(-552.768), -7.8)));
                if (!((donor_replacementGLF_dead14pab < 0.0 && donor_replacementGLF_dead14pca < 0.0) || (donor_replacementGLF_dead14pab >= 0.0 && donor_replacementGLF_dead14pca >= 0.0))) {
                    ;
                }
                if (_GLF_DEAD(false)) {
                    if (GLF_live8looplimiter2 >= int(GLF_dead16resolution.x)) {
                        ;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    GLF_live8MATRIX_N += 1;
                }
            }
            ;
        }
    }
    int i = 0;
    while (i < 1 && coord.x > 1.0 || coord.y > 1.0) {
        if (_GLF_DEAD(false)) {
            {
                i = (4 * i * (1000 - i)) / 1000;
            }
        }
        if (coord.x > 1.0) {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
                coord.x -= 1.0;
            } else {
                if (_GLF_DEAD(false)) {
                    {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(GLF_dead5_GLF_color[3]);
                                {
                                    donor_replacementGLF_dead17alpha3 += GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)];
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 10)].leftIndex = GLF_live8MATRIX_N;
                                    GLF_dead12makeTreeNode(GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 10)], GLF_live2MATRIX_N);
                                    return;
                                }
                            }
                            ;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead12baseIndex = _GLF_FUZZED(-55338);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                    _GLF_color = mat3x4(-66.63, -7455.9157, -8980.5769, 4.6, -8.3, -3.8, -60.21, 9147.0713, 8.9, -1.9, -5.3, -29.67)[2];
                                }
                                {
                                    if (GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12baseIndex, 10)].rightIndex == -1) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12baseIndex, 10)].rightIndex = GLF_live8MATRIX_N;
                                        GLF_dead12makeTreeNode(GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 10)], GLF_live2MATRIX_N);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            {
                                                break;
                                            }
                                        }
                                        return;
                                    } else {
                                        donor_replacementGLF_dead12baseIndex = GLF_dead12tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12baseIndex, 10)].rightIndex;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = (7594.0387 - fma(GLF_dead5_GLF_color, GLF_dead6_GLF_color, vec4(4658.4285, 2.3, 1.9, -13.30)));
                                        }
                                        continue;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead13grey = _GLF_FUZZED(-2.6);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = fwidth(GLF_dead5_GLF_color);
                                    }
                                    {
                                        if (int(GLF_dead13gl_FragCoord[1]) < 150) {
                                            discard;
                                        } else {
                                            if (int(GLF_dead13gl_FragCoord[1]) < 180) {
                                                donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[5]) / 10.0;
                                            } else {
                                                if (int(GLF_dead13gl_FragCoord[1]) < 210) {
                                                    donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[6]) / 10.0;
                                                } else {
                                                    if (int(GLF_dead13gl_FragCoord[1]) < 240) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = GLF_dead12_GLF_color;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(5668, 92543));
                                                                if (i >= 0 && donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                                                    i--;
                                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 1) * 16, 256)] = 1;
                                                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] = 1;
                                                                    donor_replacementGLF_dead18p.y -= 2;
                                                                }
                                                            }
                                                        }
                                                        donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[7]) / 10.0;
                                                    } else {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED(bool(bitfieldInsert(19228u, 23349u, 914, GLF_dead13N)));
                                                            ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED((ivec2(-24293, 93290) | ivec2(-74414, 75504)));
                                                            {
                                                                donor_replacementGLF_dead18canwalk = false;
                                                                int GLF_dead18j = _GLF_FUZZED(66237);
                                                                for (GLF_live8MATRIX_N = 0; GLF_live8MATRIX_N < 8; GLF_live8MATRIX_N++) {
                                                                    for (GLF_dead18j = 0; GLF_dead18j < 8; GLF_dead18j++) {
                                                                        if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j * 2 + GLF_live8MATRIX_N * 2 * 16, 256)] == 0) {
                                                                            donor_replacementGLF_dead18p.x = GLF_dead18j * 2;
                                                                            donor_replacementGLF_dead18p.y = GLF_live8MATRIX_N * 2;
                                                                            donor_replacementGLF_dead18canwalk = true;
                                                                        }
                                                                    }
                                                                }
                                                                GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                            }
                                                        }
                                                        if (int(GLF_dead13gl_FragCoord[1]) < 270) {
                                                            donor_replacementGLF_dead13grey = 0.5 + float(GLF_dead13data[8]) / 10.0;
                                                        } else {
                                                            discard;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                _GLF_color = fract(vec4(4.2, 3.8, -4.2, -520.853));
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(injectionSwitch);
                                float donor_replacementGLF_dead15h = _GLF_FUZZED(-54.84);
                                float donor_replacementGLF_dead15refh = _GLF_FUZZED(normalize(846.695));
                                float donor_replacementGLF_dead15slope = _GLF_FUZZED(0.7);
                                while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && GLF_live2MATRIX_N < 32) {
                                    donor_replacementGLF_dead15coord -= coord;
                                    donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, donor_replacementGLF_dead15coord).y;
                                    GLF_live2MATRIX_N++;
                                }
                            }
                            _GLF_color = log2(vec4(7.3, 7.7, 240.997, -9.7));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                for (int GLF_dead13i = i; GLF_dead13i <= GLF_live8MATRIX_N; GLF_dead13i++) {
                                    GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)] = GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)];
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(injectionSwitch);
                                    float donor_replacementGLF_dead15h = _GLF_FUZZED(242.265);
                                    float donor_replacementGLF_dead15refh = _GLF_FUZZED(exp(629.568));
                                    float donor_replacementGLF_dead15slope = _GLF_FUZZED(-3005.9466);
                                    while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && GLF_live2MATRIX_N < 32) {
                                        donor_replacementGLF_dead15coord -= coord;
                                        donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                        donor_replacementGLF_dead15h = texture(GLF_dead15tex, donor_replacementGLF_dead15coord).y;
                                        GLF_live2MATRIX_N++;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(determinant(mat2(-13.84, -902.538, 9.4, -191.196)));
                            {
                                donor_replacementGLF_dead17alpha3 += GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)] * GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)];
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = GLF_dead5_GLF_color;
                    }
                    if (coord.x < _GLF_color.x) {
                        ;
                        {
                            int GLF_live7baseIndex = _GLF_FUZZED(int(126969u));
                            int GLF_live7data = _GLF_FUZZED(ivec2(-66265, 57341).r);
                            int GLF_live7treeIndex = _GLF_FUZZED(int(false));
                            {
                                GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].rightIndex = GLF_live7treeIndex;
                                GLF_live7makeTreeNode(GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7treeIndex, 10)], GLF_live7data);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            if (_GLF_DEAD(false)) {
                                                bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED((true ^^ true));
                                                int donor_replacementGLF_dead18i = _GLF_FUZZED(GLF_live2MATRIX_N);
                                                ivec2 donor_replacementGLF_dead18ipos = _GLF_FUZZED(ivec2(57365, -61133));
                                                ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(9560, 71759));
                                                {
                                                    GLF_live7treeIndex++;
                                                    int GLF_dead18directions = 0;
                                                    if (donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                                        GLF_dead18directions += 1;
                                                    }
                                                    if (donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                                        GLF_dead18directions += 1;
                                                    }
                                                    if (donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                                        GLF_dead18directions += 1;
                                                    }
                                                    if (donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                                        GLF_dead18directions += 1;
                                                    }
                                                    if (GLF_dead18directions == 0) {
                                                        donor_replacementGLF_dead18canwalk = false;
                                                        int GLF_dead18j = _GLF_FUZZED(66237);
                                                        for (donor_replacementGLF_dead18i = 0; donor_replacementGLF_dead18i < 8; donor_replacementGLF_dead18i++) {
                                                            for (GLF_dead18j = 0; GLF_dead18j < 8; GLF_dead18j++) {
                                                                if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j * 2 + donor_replacementGLF_dead18i * 2 * 16, 256)] == 0) {
                                                                    donor_replacementGLF_dead18p.x = GLF_dead18j * 2;
                                                                    donor_replacementGLF_dead18p.y = donor_replacementGLF_dead18i * 2;
                                                                    donor_replacementGLF_dead18canwalk = true;
                                                                }
                                                            }
                                                        }
                                                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                    } else {
                                                        int GLF_dead18d = GLF_live7treeIndex % GLF_dead18directions;
                                                        GLF_live7treeIndex += GLF_dead18directions;
                                                        if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                                            GLF_dead18d--;
                                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                            donor_replacementGLF_dead18p.x -= 2;
                                                        }
                                                        if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                                            GLF_dead18d--;
                                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 1) * 16, 256)] = 1;
                                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] = 1;
                                                            donor_replacementGLF_dead18p.y -= 2;
                                                        }
                                                        if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                                            GLF_dead18d--;
                                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                            donor_replacementGLF_dead18p.x += 2;
                                                        }
                                                        if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                                            GLF_dead18d--;
                                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 1) * 16, 256)] = 1;
                                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] = 1;
                                                            donor_replacementGLF_dead18p.y += 2;
                                                        }
                                                    }
                                                    if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18ipos.y * 16 + donor_replacementGLF_dead18ipos.x, 256)] == 1) {
                                                        GLF_dead18_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                                        return;
                                                    }
                                                }
                                            }
                                            ;
                                        }
                                    }
                                    _GLF_color = _GLF_color;
                                }
                                ;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-6556.0914, -4.8, -4.1, 5.0);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                            {
                                i += 1;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = roundEven(GLF_dead6_GLF_color);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(-19955, -83203));
                                if (GLF_live2MATRIX_N >= 0 && donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                    GLF_live2MATRIX_N--;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 1) * 16, 256)] = 1;
                                    GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] = 1;
                                    donor_replacementGLF_dead18p.y -= 2;
                                }
                            }
                            _GLF_color = unpackSnorm4x8(6064u);
                        }
                    }
                }
            }
            {
                int GLF_live7target = _GLF_FUZZED(int(true));
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead6_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(ldexp((+(-768.518)), GLF_live8MATRIX_N));
                    mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(-8628.2163, -76.18, -181.336, -5.8, 5.4, -12.89, 60.61, -86.21, -22.97, -74.64, 2.1, 6135.1417, -8.7, 90.91, 31.66, -639.588));
                    {
                        donor_replacementGLF_dead17alpha3 += GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7target, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7target, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8MATRIX_N, 4)];
                    }
                }
                {
                    ;
                }
            }
        }
        if (coord.y > 1.0) {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                coord.y -= 1.0;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (GLF_dead14pointInTriangle(coord, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                        GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    } else {
                        GLF_dead14_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                    }
                }
                _GLF_color = dFdy(faceforward(vec4(8879.5943, -1.5, -6586.7639, -2.9), vec4(451.327, 0.9, -605.608, -82.03), vec4(-859.820, 6539.1228, -1528.5275, -6905.5459)));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            int GLF_live7looplimiter0 = 0;
            if (GLF_live7looplimiter0 >= 5) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = pow(vec4(634.245, -1.2, 45.46, 63.24), vec4(-35.07, 2.8, 5.6, 5.9));
                }
                ;
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead5_GLF_color;
                }
            }
        }
        coord *= 2.0;
        i++;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            float donor_replacementGLF_dead17alpha1 = _GLF_FUZZED(588.200);
            for (int GLF_dead17u = GLF_dead17MATRIX_N - 1; GLF_dead17u >= i; GLF_dead17u--) {
                donor_replacementGLF_dead17alpha1 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)];
            }
        }
        {
            {
                vec2 GLF_live10coord = _GLF_FUZZED(vec2(-4.4, -2.0));
                int GLF_live10i = _GLF_FUZZED((true ? ivec4(87033, 29209, 91762, -73932).w : 62920));
                if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                    _GLF_color = vec4(22.76, 6.7, -303.105, -749.747);
                }
                int GLF_live10looplimiter0 = 0;
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead17beta = _GLF_FUZZED(atan(6.8, asinh(acos(-9.4))));
                    for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_live2MATRIX_N; GLF_dead17b--) {
                        GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] = GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] - (donor_replacementGLF_dead17beta * GLF_dead14_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)]);
                    }
                }
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-5.7, 7.1, -307.390, -0.1);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                ;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead6_GLF_color;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                float donor_replacementGLF_dead17alpha1 = _GLF_FUZZED(-4481.6640);
                                for (int GLF_dead17u = GLF_dead17MATRIX_N - 1; GLF_dead17u >= GLF_live8MATRIX_N; GLF_dead17u--) {
                                    donor_replacementGLF_dead17alpha1 += GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)] * GLF_dead13gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)];
                                }
                            }
                        }
                    }
                    if (GLF_live10looplimiter0 >= 4) {
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead5_GLF_color;
                    }
                    GLF_live10looplimiter0++;
                    {
                        if (GLF_live10coord.x > 1.0)
                            GLF_live10coord.x -= 1.0;
                        if (GLF_live10coord.y > 1.0) {
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_dead14_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                }
                            }
                            GLF_live10coord.y -= 1.0;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            float donor_replacementGLF_dead17magnitudeX = _GLF_FUZZED(clamp(5115.0597, -3.8, 8853.9518));
                            mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED(mat4(-5575.0483, -59.59, 950.960, -4.8, 41.48, -4021.7000, -0.3, -8.5, 60.83, -5.5, -8623.7359, -7.3, 8.8, -9.0, 6275.4264, -0.0));
                            for (int GLF_dead17x = GLF_dead17MATRIX_N - 1; GLF_dead17x >= GLF_live10i; GLF_dead17x--) {
                                donor_replacementGLF_dead17magnitudeX += donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                                GLF_dead12_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = GLF_dead14_GLF_color;
                        }
                        GLF_live10coord *= 2.0;
                        GLF_live10i++;
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead14pab = _GLF_FUZZED(smoothstep(-6205.9745, -5351.1825, dFdx(9.1)));
                    float donor_replacementGLF_dead14pbc = _GLF_FUZZED(-6.3);
                    if (!((donor_replacementGLF_dead14pab < 0.0 && donor_replacementGLF_dead14pbc < 0.0) || (donor_replacementGLF_dead14pab >= 0.0 && donor_replacementGLF_dead14pbc >= 0.0))) {
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED((ivec2(-68737, 75611) % ivec2(-99320, 56608)));
                        if (i >= 0 && donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                            i--;
                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                            donor_replacementGLF_dead18p.x += 2;
                        }
                    }
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(coord);
                float donor_replacementGLF_dead15h = _GLF_FUZZED(7758.2867);
                float donor_replacementGLF_dead15refh = _GLF_FUZZED(-5820.7382);
                float donor_replacementGLF_dead15slope = _GLF_FUZZED(-2.9);
                {
                    donor_replacementGLF_dead15coord -= coord;
                    donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                    donor_replacementGLF_dead15h = texture(GLF_dead15tex, donor_replacementGLF_dead15coord).y;
                    GLF_live8MATRIX_N++;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-6.0, -8242.6861, 79.94, 95.34);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(_GLF_ZERO(0.0, injectionSwitch.x)))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = vec4(-5.7, 5242.9481, 8113.0271, -8.3);
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-1250.8704, -18.92, -14.19, 1.7);
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead15h = _GLF_FUZZED(8.6);
                            float donor_replacementGLF_dead15refh = _GLF_FUZZED(4.9);
                            float donor_replacementGLF_dead15slope = _GLF_FUZZED(intBitsToFloat(GLF_live8MATRIX_N));
                            while (donor_replacementGLF_dead15h < donor_replacementGLF_dead15refh && i < 32) {
                                coord -= coord;
                                donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                                i++;
                            }
                        }
                        int GLF_live7baseIndex = _GLF_FUZZED(6619);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = GLF_dead14_GLF_color;
                        }
                        int GLF_live7data = _GLF_FUZZED(88577);
                        int GLF_live7treeIndex = _GLF_FUZZED(-18990);
                        if (GLF_live7data <= GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].data) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), mix(float(_GLF_FUZZED(-3218.4370)), float(dot(vec2(0.0, 0.0), vec2(1.0, 1.0))), bool(true)))))))) {
                                bool donor_replacementGLF_dead18canwalk = _GLF_FUZZED(true);
                                ivec2 donor_replacementGLF_dead18ipos = _GLF_FUZZED((false ? ivec2(3516, 20549) : ivec2(8461, 91494)));
                                ivec2 donor_replacementGLF_dead18p = _GLF_FUZZED(ivec2(47125, -3376));
                                do {
                                    GLF_live8MATRIX_N++;
                                    int GLF_dead18directions = 0;
                                    if (donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                        GLF_dead18directions += 1;
                                    }
                                    if (donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                        GLF_dead18directions += 1;
                                    }
                                    if (donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                        GLF_dead18directions += 1;
                                    }
                                    if (donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                        GLF_dead18directions += 1;
                                    }
                                    if (GLF_dead18directions == 0) {
                                        donor_replacementGLF_dead18canwalk = false;
                                        int GLF_dead18j = _GLF_FUZZED(66237);
                                        for (GLF_live8MATRIX_N = 0; GLF_live8MATRIX_N < 8; GLF_live8MATRIX_N++) {
                                            for (GLF_dead18j = 0; GLF_dead18j < 8; GLF_dead18j++) {
                                                if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j * 2 + GLF_live8MATRIX_N * 2 * 16, 256)] == 0) {
                                                    donor_replacementGLF_dead18p.x = GLF_dead18j * 2;
                                                    donor_replacementGLF_dead18p.y = GLF_live8MATRIX_N * 2;
                                                    donor_replacementGLF_dead18canwalk = true;
                                                }
                                            }
                                        }
                                        GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                    } else {
                                        int GLF_dead18d = GLF_live8MATRIX_N % GLF_dead18directions;
                                        GLF_live8MATRIX_N += GLF_dead18directions;
                                        if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                            GLF_dead18d--;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x - 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead18p.x -= 2;
                                        }
                                        if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y > 0 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] == 0) {
                                            GLF_dead18d--;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 1) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y - 2) * 16, 256)] = 1;
                                            donor_replacementGLF_dead18p.y -= 2;
                                        }
                                        if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.x < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] == 0) {
                                            GLF_dead18d--;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 1) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x + 2) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead18p.x += 2;
                                        }
                                        if (GLF_dead18d >= 0 && donor_replacementGLF_dead18p.y < 14 && GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] == 0) {
                                            GLF_dead18d--;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 1) * 16, 256)] = 1;
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead18p.x) + (donor_replacementGLF_dead18p.y + 2) * 16, 256)] = 1;
                                            donor_replacementGLF_dead18p.y += 2;
                                        }
                                    }
                                    if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18ipos.y * 16 + donor_replacementGLF_dead18ipos.x, 256)] == 1) {
                                        GLF_dead18_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                        return;
                                    }
                                } while (donor_replacementGLF_dead18canwalk);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                {
                                    GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead17alpha1 = _GLF_FUZZED(9.5);
                                        float donor_replacementGLF_dead17alpha2 = _GLF_FUZZED(9.5);
                                        float donor_replacementGLF_dead17alpha3 = _GLF_FUZZED(atan(3.0));
                                        float donor_replacementGLF_dead17beta = _GLF_FUZZED(length(vec3(-8.6, -7366.1110, -935.725)));
                                        float donor_replacementGLF_dead17magnitudeX = _GLF_FUZZED(uintBitsToFloat(44575u));
                                        mat4 donor_replacementGLF_dead17matrix_a = _GLF_FUZZED((mat4(3028.3681, -9.8, 2.7, 934.288, 36.57, 349.937, 877.151, 47.69, -1765.2130, 6834.8225, 0.3, 134.173, -3195.1910, -8.7, -89.16, -951.778) + (-2.9)));
                                        vec4 donor_replacementGLF_dead17matrix_b = _GLF_FUZZED(_GLF_color);
                                        for (int GLF_dead17k = 0; GLF_dead17k < GLF_dead17MATRIX_N - 1; GLF_dead17k++) {
                                            for (int GLF_dead17x = GLF_dead17MATRIX_N - 1; GLF_dead17x >= GLF_dead17k; GLF_dead17x--) {
                                                donor_replacementGLF_dead17magnitudeX += donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)];
                                                GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)];
                                            }
                                            donor_replacementGLF_dead17magnitudeX = sqrt(donor_replacementGLF_dead17magnitudeX);
                                            GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)] -= (sign(GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k, 4)]) * donor_replacementGLF_dead17magnitudeX);
                                            for (int GLF_dead17u = GLF_dead17MATRIX_N - 1; GLF_dead17u >= GLF_dead17k; GLF_dead17u--) {
                                                donor_replacementGLF_dead17alpha1 += GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)] * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17u, 4)];
                                            }
                                            donor_replacementGLF_dead17alpha2 = 2.0 / donor_replacementGLF_dead17alpha1;
                                            for (int GLF_dead17j = GLF_dead17k; GLF_dead17j < GLF_dead17MATRIX_N; GLF_dead17j++) {
                                                for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_dead17k; GLF_dead17a--) {
                                                    donor_replacementGLF_dead17alpha3 += GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)] * donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)];
                                                }
                                                donor_replacementGLF_dead17beta = donor_replacementGLF_dead17alpha2 * donor_replacementGLF_dead17alpha3;
                                                for (int GLF_dead17a = GLF_dead17MATRIX_N - 1; GLF_dead17a >= GLF_dead17k; GLF_dead17a--) {
                                                    donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] = donor_replacementGLF_dead17matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 4)] - (donor_replacementGLF_dead17beta * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17a, 4)]);
                                                }
                                                donor_replacementGLF_dead17alpha3 = 0.0;
                                                donor_replacementGLF_dead17beta = 0.0;
                                            }
                                            for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_dead17k; GLF_dead17b--) {
                                                donor_replacementGLF_dead17alpha3 += GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] * donor_replacementGLF_dead17matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)];
                                            }
                                            donor_replacementGLF_dead17beta = donor_replacementGLF_dead17alpha2 * donor_replacementGLF_dead17alpha3;
                                            for (int GLF_dead17b = GLF_dead17MATRIX_N - 1; GLF_dead17b >= GLF_dead17k; GLF_dead17b--) {
                                                donor_replacementGLF_dead17matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] = donor_replacementGLF_dead17matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)] - (donor_replacementGLF_dead17beta * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17b, 4)]);
                                            }
                                            donor_replacementGLF_dead17magnitudeX = 0.0;
                                            donor_replacementGLF_dead17alpha1 = 0.0;
                                            donor_replacementGLF_dead17alpha2 = 0.0;
                                            donor_replacementGLF_dead17alpha3 = 0.0;
                                            donor_replacementGLF_dead17beta = 0.0;
                                        }
                                    }
                                }
                            }
                            if (GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].leftIndex == -1) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead14_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2MATRIX_N, 256)] = 0;
                                        }
                                    }
                                }
                                GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].leftIndex = GLF_live7treeIndex;
                                GLF_live7makeTreeNode(GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7treeIndex, 10)], GLF_live7data);
                                ;
                            } else {
                                GLF_live7baseIndex = GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].leftIndex;
                                if (_GLF_DEAD(false)) {
                                    ivec2 donor_replacementGLF_dead18ipos = _GLF_FUZZED(ivec2(82668, -94353));
                                    if (GLF_dead18map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18ipos.y * 16 + donor_replacementGLF_dead18ipos.x, 256)] == 1) {
                                        GLF_dead18_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                        return;
                                    }
                                }
                                ;
                            }
                        } else {
                            if (GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].rightIndex == -1) {
                                GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].rightIndex = GLF_live7treeIndex;
                                GLF_live7makeTreeNode(GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7treeIndex, 10)], GLF_live7data);
                                ;
                            } else {
                                GLF_live7baseIndex = GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].rightIndex;
                                ;
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    ;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead15h = _GLF_FUZZED(-3527.7427);
                            float donor_replacementGLF_dead15refh = _GLF_FUZZED(-16.70);
                            float donor_replacementGLF_dead15slope = _GLF_FUZZED(-915.908);
                            {
                                coord -= coord;
                                donor_replacementGLF_dead15refh += donor_replacementGLF_dead15slope;
                                donor_replacementGLF_dead15h = texture(GLF_dead15tex, coord).y;
                                GLF_live7data++;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = _GLF_color;
                    }
                    if (coord.y < _GLF_outVarBackup_GLF_color.y) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(vec2(-117.947, -9665.8424), (3.8 / 6.3), 2.9);
                        }
                        ;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        if (coord.x < 1.0 && coord.y < 1.0) {
            _GLF_struct_replacement_0._f3.res = texture(tex, coord);
        }
    }
    _GLF_color = vec4(_GLF_struct_replacement_0._f3.res.xyz, 1.0);
}
