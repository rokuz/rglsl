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
int GLF_live14msb8 = 256;
vec4 GLF_live15_GLF_color = _GLF_FUZZED(vec4(9.0, 261.833, 4.5, 99.68));

struct GLF_live15BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live15BST GLF_live15tree[10] = GLF_live15BST[10](GLF_live15BST(0, 0, 0), GLF_live15BST(0, 0, 0), GLF_live15BST(0, 0, 0), GLF_live15BST(0, 0, 0), GLF_live15BST(0, 0, 0), GLF_live15BST(0, 0, 0), GLF_live15BST(0, 0, 0), GLF_live15BST(0, 0, 0), GLF_live15BST(0, 0, 0), GLF_live15BST(0, 0, 0));

void GLF_live15makeTreeNode(inout GLF_live15BST GLF_live15tree, int GLF_live15data) {
    GLF_live15tree.data = GLF_live15data;
    GLF_live15tree.leftIndex = -1;
    GLF_live15tree.rightIndex = -1;
}

int GLF_live15search(int GLF_live15target) {
    GLF_live15BST GLF_live15currentNode = GLF_live15BST(0, 0, 0);
    int GLF_live15index = 0;
    {
        int GLF_live15looplimiter1 = 0;
        while (GLF_live15index != -1) {
            if (GLF_live15looplimiter1 >= 7) {
                break;
            }
            GLF_live15looplimiter1++;
            {
                GLF_live15currentNode = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15index, 10)];
                if (GLF_live15currentNode.data == GLF_live15target) {
                    return GLF_live15target;
                }
                GLF_live15index = GLF_live15target > GLF_live15currentNode.data ? GLF_live15currentNode.rightIndex : GLF_live15currentNode.leftIndex;
            }
        }
    }
    return -1;
}

vec4 GLF_live16gl_FragCoord = _GLF_FUZZED(vec2(31.10, -0.9).yyyx);
const int GLF_live16N = 10;
int GLF_live16data[10] = int[10](_GLF_FUZZED(-88997), _GLF_FUZZED(17417), _GLF_FUZZED(-76329), _GLF_FUZZED(-11516), _GLF_FUZZED((true ? ivec4(-37949, 79250, -67951, 29063).w : (-22556))), _GLF_FUZZED((+(~71773))), _GLF_FUZZED((false ? ivec4(66797, -76647, -5196, -60342).g : (-(-10501)))), _GLF_FUZZED(92130), _GLF_FUZZED(-35935), _GLF_FUZZED(int(83189u))), GLF_live16temp[10] = int[10](_GLF_FUZZED((-28417)), _GLF_FUZZED((27625 - 59830)), _GLF_FUZZED((false ? (-65948) : 1994)), _GLF_FUZZED(((-11303) - 54288)), _GLF_FUZZED(68694), _GLF_FUZZED((+(-79281))), _GLF_FUZZED((~ivec3(-75916, -29096, -13686).b)), _GLF_FUZZED(79901), _GLF_FUZZED((~(-95666))), _GLF_FUZZED(((78121u < 175782u) ? 29802 : (-61648))));

void GLF_live16merge(int GLF_live16from, int GLF_live16mid, int GLF_live16to) {
    int GLF_live16k = GLF_live16from, GLF_live16i = GLF_live16from, GLF_live16j = GLF_live16mid + 1;
    {
        int GLF_live16looplimiter0 = 0;
        while (GLF_live16i <= GLF_live16mid && GLF_live16j <= GLF_live16to) {
            if (GLF_live16looplimiter0 >= 5) {
                break;
            }
            GLF_live16looplimiter0++;
            {
                if (GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] < GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16j, 10)]) {
                    GLF_live16temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16k++, 10)] = GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i++, 10)];
                } else {
                    GLF_live16temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16k++, 10)] = GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live16looplimiter1 = 0;
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            while (GLF_live16i < GLF_live16N && GLF_live16i <= GLF_live16mid) {
                if (GLF_live16looplimiter1 >= 5) {
                    break;
                }
                GLF_live16looplimiter1++;
                {
                    GLF_live16temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16k++, 10)] = GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i++, 10)];
                }
            }
        } else {
        }
    }
    {
        int GLF_live16looplimiter2 = 0;
        for (int GLF_live16i = GLF_live16from; GLF_live16i <= GLF_live16to; GLF_live16i++) {
            if (GLF_live16looplimiter2 >= 5) {
                break;
            }
            GLF_live16looplimiter2++;
            {
                GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = GLF_live16temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)];
            }
        }
    }
}

struct GLF_live13BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live13BST GLF_live13tree[10] = GLF_live13BST[10](GLF_live13BST(0, 0, 0), GLF_live13BST(0, 0, 0), GLF_live13BST(0, 0, 0), GLF_live13BST(0, 0, 0), GLF_live13BST(0, 0, 0), GLF_live13BST(0, 0, 0), GLF_live13BST(0, 0, 0), GLF_live13BST(0, 0, 0), GLF_live13BST(0, 0, 0), GLF_live13BST(0, 0, 0));

void GLF_live13makeTreeNode(inout GLF_live13BST GLF_live13tree, int GLF_live13data) {
    {
        vec4 GLF_live14c = _GLF_FUZZED(vec4(-43.42, -7617.2068, 2.1, -367.552));
        int GLF_live14i = _GLF_FUZZED(ivec3(-77226, -26173, 20548).s);
        int GLF_live14looplimiter1 = 0;
        int GLF_live14msb8 = _GLF_FUZZED(ivec4(-14805, 70242, -69770, -10806).r);
        do {
            if (GLF_live14looplimiter1 >= 5) {
                break;
            }
            GLF_live14looplimiter1++;
            {
                if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] >= 1.0) {
                    GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                }
                do {
                    GLF_live14i++;
                } while (_GLF_WRAPPED_LOOP(false));
            }
        } while (GLF_live14i < findMSB(findLSB(GLF_live14msb8)));
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & 1)); _injected_loop_counter++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
        {
            int GLF_live15count = _GLF_FUZZED(((-1787) ^ 61933));
            int GLF_live15i = _GLF_FUZZED(int(false));
            int GLF_live15looplimiter2 = 0;
            {
                if (GLF_live15looplimiter2 >= 7) {
                    ;
                }
                do {
                    GLF_live15looplimiter2++;
                } while (_GLF_WRAPPED_LOOP(false));
                {
                    int GLF_live15result = GLF_live15search(GLF_live15i);
                    switch (GLF_live15i) {
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
                            if (GLF_live15result == GLF_live15i) {
                                GLF_live15count++;
                            }
                            break;
                        default:
                            if (GLF_live15result == -1) {
                                GLF_live15count++;
                            }
                            break;
                    }
                }
            }
        }
    }
    GLF_live13tree.data = GLF_live13data;
    GLF_live13tree.leftIndex = -1;
    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
        return;
    }
    GLF_live13tree.rightIndex = -1;
}

int GLF_live13search(int GLF_live13target) {
    GLF_live13BST GLF_live13currentNode = GLF_live13BST(0, 0, 0);
    int GLF_live13index = 0;
    for (int _injected_loop_counter = (1 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        int GLF_live13looplimiter1 = 0;
        while (GLF_live13index != -1) {
            if (GLF_live13looplimiter1 >= 7) {
                break;
            }
            GLF_live13looplimiter1++;
            if (_GLF_DEAD(false)) {
                break;
            }
            {
                float GLF_live16grey = _GLF_FUZZED(-6065.5148);
                {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        if (int(GLF_live16gl_FragCoord[1]) < 240) {
                            GLF_live16grey = 0.5 + float(GLF_live16data[7]) / 10.0;
                        } else {
                            if (int(GLF_live16gl_FragCoord[1]) < 270) {
                                GLF_live16grey = 0.5 + float(GLF_live16data[8]) / 10.0;
                            } else {
                                ;
                            }
                        }
                    } else {
                    }
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    return 1;
                }
                GLF_live13currentNode = GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13index, 10)];
                if (GLF_live13currentNode.data == GLF_live13target) {
                    return GLF_live13target;
                }
                if (_GLF_DEAD(false)) {
                    continue;
                    if (_GLF_DEAD(false)) {
                        return 1;
                        {
                            int GLF_live17looplimiter0 = 0;
                            if (GLF_live17looplimiter0 >= 4) {
                                ;
                            }
                        }
                    }
                }
                GLF_live13index = GLF_live13target > GLF_live13currentNode.data ? GLF_live13currentNode.rightIndex : GLF_live13currentNode.leftIndex;
                if (_GLF_DEAD(false)) {
                    break;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
            return 1;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(1.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)), _GLF_IDENTITY(dot(vec4(1.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)), min(dot(vec4(1.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)), dot(vec4(1.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0))))))))) {
            continue;
        }
    }
    return -1;
    if (_GLF_DEAD(false)) {
        return 1;
    }
}

const vec4 GLF_live12pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_live12picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, 4, 4), vec4(12, 22, 4, 4));

bool GLF_live12collision(vec2 GLF_live12pos, vec4 GLF_live12quad) {
    if (GLF_live12pos.x < GLF_live12quad.x) {
        if (_GLF_DEAD(false)) {
            return true;
        }
        {
            {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            do {
                return true;
            } while (_GLF_WRAPPED_LOOP(false));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return true;
        }
        return false;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
        return true;
    }
    if (GLF_live12pos.y < GLF_live12quad.y) {
        return false;
    }
    if (GLF_live12pos.x > GLF_live12quad.x + GLF_live12quad.z) {
        return false;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
        return true;
    }
    if (GLF_live12pos.y > GLF_live12quad.y + GLF_live12quad.w) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return true;
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            return false;
        }
    }
    return true;
}

layout(set = 0, binding = 2) uniform sampler2D GLF_live10tex;
vec4 GLF_live7_GLF_color = _GLF_FUZZED(((vec2(8.2, 0.1) * mat4x2(656.609, -60.31, -7.0, 3.0, 209.889, 810.506, 7.6, -4800.2664)) * vec4(-99.64, 121.218, -87.65, -9231.8675)));
vec4 GLF_live8gl_FragCoord = _GLF_FUZZED((-vec4(5.4, 5.3, 83.26, 9.6)));
const int GLF_live8N = 10;
int GLF_live8data[10] = int[10](_GLF_FUZZED((~(-23700))), _GLF_FUZZED(-38099), _GLF_FUZZED(((-91389) ^ 94700)), _GLF_FUZZED(-1919), _GLF_FUZZED(int(153968u)), _GLF_FUZZED(47666), _GLF_FUZZED(-82217), _GLF_FUZZED(-68100), _GLF_FUZZED(-89263), _GLF_FUZZED(((+(-36050)) - (+85191)))), GLF_live8temp[10] = int[10](_GLF_FUZZED(31284), _GLF_FUZZED(89192), _GLF_FUZZED(-6136), _GLF_FUZZED(-28840), _GLF_FUZZED(((~37659) & (-12328))), _GLF_FUZZED(47822), _GLF_FUZZED(27262), _GLF_FUZZED(-36599), _GLF_FUZZED(-51693), _GLF_FUZZED(((-(-27647)))));

void GLF_live8merge(int GLF_live8from, int GLF_live8mid, int GLF_live8to) {
    int GLF_live8k = GLF_live8from, GLF_live8i = GLF_live8from, GLF_live8j = GLF_live8mid + 1;
    for (int _injected_loop_counter = _GLF_IDENTITY(0, max(0, 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7))) << _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), int(ivec4(int(4), 0, 0, 1))))) >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter++) {
        int GLF_live8looplimiter0 = 0;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            continue;
        }
        while (GLF_live8i <= GLF_live8mid && GLF_live8j <= GLF_live8to) {
            if (_GLF_DEAD(false)) {
                {
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            break;
                        }
                        ;
                    }
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
                discard;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    continue;
                }
            }
            if (GLF_live8looplimiter0 >= 4) {
                break;
            }
            GLF_live8looplimiter0++;
            {
                int GLF_live15baseIndex = _GLF_FUZZED((~97098));
                {
                    GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex;
                    ;
                }
            }
            do {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        discard;
                    }
                } else {
                }
                float GLF_live11th = _GLF_FUZZED(vec2(30.39, -359.092).t);
                {
                    GLF_live11th = -GLF_live11th;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, exp(0.0), 0.0), vec3(1.0, 0.0, 1.0)), _GLF_IDENTITY(dot(vec3(0.0, exp(0.0), 0.0), vec3(1.0, 0.0, 1.0)), (false ? _GLF_FUZZED(GLF_live11th) : dot(vec3(0.0, exp(0.0), 0.0), vec3(1.0, 0.0, 1.0))))))))) {
                            continue;
                        }
                        break;
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(false)) {
                continue;
            }
            {
                if (GLF_live8data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 10)] < GLF_live8data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 10)]) {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        GLF_live8temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8k++, 10)] = GLF_live8data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i++, 10)];
                    }
                } else {
                    GLF_live8temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8k++, 10)] = GLF_live8data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j++, 10)];
                }
            }
        }
    }
    {
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))))) {
            return;
        }
        int GLF_live8looplimiter1 = 0;
        {
            int GLF_live14i = _GLF_FUZZED(-49903);
            float GLF_live14limit = _GLF_FUZZED(-3.5);
            int GLF_live14looplimiter0 = 0;
            float GLF_live14ref = _GLF_FUZZED(9173.7609);
            float GLF_live14s = _GLF_FUZZED(5.3);
            while (GLF_live14i < bitfieldInsert(800, GLF_live14i, 0, 0)) {
                if (GLF_live14looplimiter0 >= 5) {
                    break;
                }
                GLF_live14looplimiter0++;
                {
                    if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                        GLF_live14s += 0.2;
                    }
                    if (float(GLF_live14i) >= GLF_live14limit) {
                        ;
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                        GLF_live14i++;
                    }
                }
            }
        }
        while (GLF_live8i < GLF_live8N && GLF_live8i <= GLF_live8mid) {
            if (_GLF_DEAD(false)) {
                return;
            }
            if (GLF_live8looplimiter1 >= 4) {
                if (_GLF_DEAD(false)) {
                    break;
                }
                if (_GLF_DEAD(false)) {
                    discard;
                }
                break;
            }
            GLF_live8looplimiter1++;
            if (_GLF_DEAD(false)) {
                discard;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                break;
            }
            {
                GLF_live8temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8k++, 10)] = GLF_live8data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i++, 10)];
                if (_GLF_DEAD(false)) {
                    {
                        {
                            do {
                                ;
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                        }
                    }
                    break;
                    {
                        int GLF_live16looplimiter4 = 0;
                        if (GLF_live16looplimiter4 >= 5) {
                            ;
                        }
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    {
        int GLF_live8looplimiter2 = 0;
        for (int GLF_live8i = GLF_live8from; GLF_live8i <= GLF_live8to; GLF_live8i++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                return;
            }
            {
                float GLF_live16grey = _GLF_FUZZED(8.9);
                {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        GLF_live16grey = 0.5 + float(GLF_live16data[3]) / 10.0;
                    } else {
                    }
                }
            }
            if (GLF_live8looplimiter2 >= 4) {
                break;
            }
            GLF_live8looplimiter2++;
            {
                GLF_live8data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 10)] = GLF_live8temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 10)];
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
            }
        }
    }
}

layout(set = 0, binding = 3) uniform sampler2D GLF_live6tex;

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_live5injectionSwitch;
};

struct GLF_live5QuicksortObject {
    int numbers[10];
};

GLF_live5QuicksortObject GLF_live5obj = GLF_live5QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

vec3 GLF_live5palette(vec3 GLF_live5a, vec3 GLF_live5b, vec3 GLF_live5c, vec3 GLF_live5d) {
    for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3)))); _injected_loop_counter++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            discard;
        }
        return fract(mix(GLF_live5d * GLF_live5a, GLF_live5a * GLF_live5c, GLF_live5b + GLF_live5d - GLF_live5c));
    }
}

const int GLF_live2dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
vec4 GLF_live1_GLF_color = _GLF_FUZZED(vec4(-0.0, -7633.7440, 1.4, 9.2));

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_live1injectionSwitch;
};

float GLF_live1compute_derivative_x(float GLF_live1v) {
    do {
        return dFdx(GLF_live1v) * GLF_live1injectionSwitch.y;
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
}

float GLF_live1compute_derivative_y(float GLF_live1v) {
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(3), int(3)))); _injected_loop_counter--) {
        if (_GLF_DEAD(false)) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                        discard;
                    }
                    return 1.0;
                }
            }
            return 1.0;
            if (_GLF_DEAD(false)) {
                break;
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                continue;
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
            vec2 GLF_live6coord = _GLF_FUZZED((true ? vec2(45.95, -698.630) : vec2(3703.0871, -900.946)));
            float GLF_live6h = _GLF_FUZZED(-52.94);
            if (_GLF_DEAD(false)) {
                break;
            }
            int GLF_live6i = _GLF_FUZZED(int(19500u));
            float GLF_live6refh = _GLF_FUZZED(float(91866));
            float GLF_live6slope = _GLF_FUZZED(49.60);
            {
                int GLF_live16i = _GLF_FUZZED(8898);
                int GLF_live16k = _GLF_FUZZED(((ivec4(-15385, 20508, 79238, 77530).z ^ (-23867)) + (-224)));
                int GLF_live16looplimiter1 = 0;
                {
                    if (GLF_live16looplimiter1 >= 5) {
                        ;
                    }
                    GLF_live16looplimiter1++;
                    {
                        GLF_live16temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16k++, 10)] = GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i++, 10)];
                    }
                }
            }
            vec2 GLF_live6uvstep = _GLF_FUZZED((vec2(528.907, 7860.5001) + 2412.6489));
            {
                int GLF_live6looplimiter0 = 0;
                while (GLF_live6h < GLF_live6refh && GLF_live6i < 32) {
                    if (GLF_live6looplimiter0 >= 7) {
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            break;
                            {
                                int GLF_live17looplimiter1 = 0;
                                if (GLF_live17looplimiter1 >= 4) {
                                    ;
                                }
                            }
                        }
                        break;
                    }
                    GLF_live6looplimiter0++;
                    {
                        do {
                            GLF_live6coord -= GLF_live6uvstep;
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            GLF_live6refh += GLF_live6slope;
                        }
                        GLF_live6h = texture(GLF_live6tex, GLF_live6coord).y;
                        GLF_live6i++;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                }
            }
        }
    }
    return dFdy(GLF_live1v) * GLF_live1injectionSwitch.y;
}

float GLF_live1compute_stripe(float GLF_live1v) {
    if (_GLF_DEAD(false)) {
        return 1.0;
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
        do {
            return 1.0;
            if (_GLF_DEAD(false)) {
                continue;
            }
        } while (_GLF_WRAPPED_LOOP(false));
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
    }
    if (_GLF_DEAD(false)) {
        return 1.0;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
            return 1.0;
        }
    }
    return smoothstep(-.9, 1., (GLF_live1v) / ((GLF_live1injectionSwitch.y > GLF_live1injectionSwitch.x) ? GLF_live1compute_derivative_x(GLF_live1v) : GLF_live1compute_derivative_y(GLF_live1v)));
}

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
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec2(1.0, 1.0);
        }
        int GLF_live13baseIndex = _GLF_FUZZED(ivec3(-86617, 32376, -7747).y);
        int GLF_live13data = _GLF_FUZZED(-33140);
        int GLF_live13treeIndex = _GLF_FUZZED(int(false));
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    return vec2(1.0, 1.0);
                }
                return vec2(1.0, 1.0);
            }
            int GLF_live13looplimiter0 = 0;
            while (GLF_live13baseIndex <= GLF_live13treeIndex) {
                if (GLF_live13looplimiter0 >= 7) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    break;
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    break;
                }
                GLF_live13looplimiter0++;
                {
                    if (GLF_live13data <= GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].data) {
                        if (GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].leftIndex == -1) {
                            GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].leftIndex = GLF_live13treeIndex;
                            GLF_live13makeTreeNode(GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13treeIndex, 10)], GLF_live13data);
                            ;
                        } else {
                            GLF_live13baseIndex = GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].leftIndex;
                            continue;
                        }
                    } else {
                        if (GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].rightIndex == -1) {
                            GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].rightIndex = GLF_live13treeIndex;
                            GLF_live13makeTreeNode(GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13treeIndex, 10)], GLF_live13data);
                            ;
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                GLF_live13baseIndex = GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].rightIndex;
                            } else {
                            }
                            continue;
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
            return vec2(1.0, 1.0);
        }
    }
    if (_GLF_DEAD(false)) {
        return vec2(1.0, 1.0);
    }
    {
        vec2 GLF_live7coord = _GLF_FUZZED(vec2(551.724, -624.025));
        if (_GLF_DEAD(false)) {
            return vec2(1.0, 1.0);
        }
        {
            int GLF_live17looplimiter2 = 0;
            if (GLF_live17looplimiter2 >= 4) {
                ;
            }
        }
        {
            uvec2 GLF_live7icoord = uvec2(((GLF_live7coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
            uint GLF_live7res1 = uint(((GLF_live7icoord.x * GLF_live7icoord.y) >> (GLF_live7icoord.x & 31u)) & 0xffffffffu);
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
                {
                    int GLF_live16high = _GLF_FUZZED(46655);
                    int GLF_live16low = _GLF_FUZZED(-81648);
                    int GLF_live16m = _GLF_FUZZED(90771);
                    {
                        {
                            int GLF_live16looplimiter3 = 0;
                            for (int GLF_live16i = GLF_live16low; GLF_live16i < GLF_live16high; GLF_live16i += 2 * GLF_live16m) {
                                if (GLF_live16looplimiter3 >= 5) {
                                    break;
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                                    GLF_live16looplimiter3++;
                                } else {
                                }
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                } else {
                                    int GLF_live16from = GLF_live16i;
                                    int GLF_live16mid = GLF_live16i + GLF_live16m - 1;
                                    int GLF_live16to = min(GLF_live16i + 2 * GLF_live16m - 1, GLF_live16high);
                                    GLF_live16merge(GLF_live16from, GLF_live16mid, GLF_live16to);
                                }
                            }
                        }
                    }
                }
                {
                    int GLF_live12i = _GLF_FUZZED(-45608);
                    vec2 GLF_live12pos = _GLF_FUZZED((vec4(803.276, 2.2, 75.24, -564.546) * mat2x4(51.02, -2957.1083, 4025.9910, 582.402, -0.5, -7187.7613, -1.6, -3508.6070)));
                    vec4 GLF_live12res = _GLF_FUZZED(vec4(-2.0, (false ? (-4.3) : (-0.5)), 2.2, 2.1));
                    if (_GLF_DEAD(false)) {
                        return vec2(1.0, 1.0);
                    }
                    {
                        int GLF_live12looplimiter0 = 0;
                        for (GLF_live12i = 0; GLF_live12i < 8; GLF_live12i++) {
                            if (GLF_live12looplimiter0 >= 6) {
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    discard;
                                }
                            }
                            GLF_live12looplimiter0++;
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return vec2(1.0, 1.0);
                                }
                                if (GLF_live12collision(GLF_live12pos, GLF_live12picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 8)])) {
                                    GLF_live12res = GLF_live12pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live12picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 8)].x) * int(GLF_live12picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 8)].y) + GLF_live12i * 9 + 11) % 16, 16)];
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                return vec2(1.0, 1.0);
                            }
                            do {
                                int GLF_live14i = _GLF_FUZZED(-85440);
                                float GLF_live14limit = _GLF_FUZZED(-5.9);
                                float GLF_live14s = _GLF_FUZZED(0.2);
                                if (float(GLF_live14i) >= GLF_live14limit) {
                                    do {
                                        ;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return vec2(1.0, 1.0);
                }
            }
            uint GLF_live7res2 = uint(((GLF_live7icoord.x * GLF_live7icoord.y) << (GLF_live7icoord.x & 31u)) & 0xffffffffu);
            float GLF_live7res = float(((GLF_live7res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live7res1 & 1u) != 0u ? 1u : 0u));
            GLF_live7_GLF_color = vec4(GLF_live7res, GLF_live7res, GLF_live7res, 1.0);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return vec2(1.0, 1.0);
    }
    vec3 m = vec3(1.0);
    {
        ivec2 GLF_live2pos = _GLF_FUZZED(ivec2(-29356, -13561));
        {
            {
                {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            return vec2(1.0, 1.0);
                        } else {
                        }
                    }
                    ;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return vec2(1.0, 1.0);
                    }
                }
            }
            int GLF_live8high = _GLF_FUZZED(-99444);
            int GLF_live8looplimiter4 = 0;
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
                {
                    if (_GLF_DEAD(false)) {
                        return vec2(1.0, 1.0);
                    }
                    {
                        ;
                    }
                }
            }
            int GLF_live8low = _GLF_FUZZED(16253);
            for (int GLF_live8m = 1; GLF_live8m <= GLF_live8high; GLF_live8m = 2 * GLF_live8m) {
                if (GLF_live8looplimiter4 >= 4) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    break;
                }
                do {
                    GLF_live8looplimiter4++;
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                {
                    {
                        int GLF_live8looplimiter3 = 0;
                        for (int GLF_live8i = GLF_live8low; GLF_live8i < GLF_live8high; GLF_live8i += 2 * GLF_live8m) {
                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(_GLF_IDENTITY(false, (false) && true), false))))) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    continue;
                                }
                            }
                            if (GLF_live8looplimiter3 >= 4) {
                                if (_GLF_DEAD(false)) {
                                    return vec2(1.0, 1.0);
                                }
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                discard;
                            }
                            GLF_live8looplimiter3++;
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            {
                                int GLF_live8from = GLF_live8i;
                                int GLF_live8mid = GLF_live8i + GLF_live8m - 1;
                                if (_GLF_DEAD(false)) {
                                    return vec2(1.0, 1.0);
                                }
                                int GLF_live8to = min(GLF_live8i + 2 * GLF_live8m - 1, GLF_live8high);
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                    GLF_live8merge(GLF_live8from, GLF_live8mid, GLF_live8to);
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                {
                                    float GLF_live16grey = _GLF_FUZZED((-44.37));
                                    if (int(GLF_live16gl_FragCoord[1]) < 210) {
                                        GLF_live16grey = 0.5 + float(GLF_live16data[6]) / 10.0;
                                    } else {
                                        if (int(GLF_live16gl_FragCoord[1]) < 240) {
                                            GLF_live16grey = 0.5 + float(GLF_live16data[7]) / 10.0;
                                        } else {
                                            if (int(GLF_live16gl_FragCoord[1]) < 270) {
                                                GLF_live16grey = 0.5 + float(GLF_live16data[8]) / 10.0;
                                            } else {
                                                ;
                                            }
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    return vec2(1.0, 1.0);
                                    {
                                        {
                                            ;
                                        }
                                    }
                                } else {
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)))))) {
                                    break;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        continue;
                    }
                    {
                        int GLF_live16i = _GLF_FUZZED(-17836);
                        int GLF_live16looplimiter5 = 0;
                        {
                            if (GLF_live16looplimiter5 >= 5) {
                                ;
                            }
                            GLF_live16looplimiter5++;
                            {
                                switch (GLF_live16i) {
                                    case 0:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 4;
                                        break;
                                    case 1:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 3;
                                        break;
                                    case 2:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 2;
                                        break;
                                    case 3:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 1;
                                        break;
                                    case 4:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 0;
                                        break;
                                    case 5:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -1;
                                        break;
                                    case 6:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -2;
                                        break;
                                    case 7:
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -3;
                                        }
                                        break;
                                    case 8:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -4;
                                        break;
                                    case 9:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -5;
                                        break;
                                }
                                GLF_live16i++;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    discard;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        continue;
                    }
                    continue;
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                }
            }
        }
        if (GLF_live2pos.x < GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15 && GLF_live2pos.x > GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] - 15) {
            {
                vec2 GLF_live10coord = _GLF_FUZZED(vec2(-3980.8723, -514.849));
                float GLF_live10h = _GLF_FUZZED(201.229);
                int GLF_live10i = _GLF_FUZZED(-60611);
                float GLF_live10refh = _GLF_FUZZED(float(133562u));
                float GLF_live10slope = _GLF_FUZZED((true ? 75.20 : (+(-293.053))));
                vec2 GLF_live10uvstep = _GLF_FUZZED(vec2(179.298, -80.04));
                {
                    int GLF_live14i = _GLF_FUZZED(-39163);
                    float GLF_live14limit = _GLF_FUZZED(78.79);
                    int GLF_live14looplimiter0 = 0;
                    float GLF_live14ref = _GLF_FUZZED((64.26 - (-79.87)));
                    float GLF_live14s = _GLF_FUZZED(-21.97);
                    {
                        if (GLF_live14looplimiter0 >= 5) {
                            ;
                        }
                        GLF_live14looplimiter0++;
                        {
                            if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                                GLF_live14s += 0.2;
                            }
                            if (float(GLF_live14i) >= GLF_live14limit) {
                                ;
                            }
                            GLF_live14i++;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    } else {
                        return vec2(1.0, 1.0);
                    }
                }
                {
                    GLF_live10coord -= GLF_live10uvstep;
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                        GLF_live10refh += GLF_live10slope;
                    }
                    GLF_live10h = texture(GLF_live10tex, GLF_live10coord).y;
                    GLF_live10i++;
                }
            }
            float GLF_live2p = (15.0 - abs(float(GLF_live2pos.x - GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)]))) / 15.0;
            {
                int GLF_live9looplimiter3 = 0;
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        {
                            int GLF_live16i = _GLF_FUZZED((((-474) * 32523) + 58932));
                            int GLF_live16looplimiter5 = 0;
                            do {
                                if (GLF_live16looplimiter5 >= 5) {
                                    break;
                                }
                                GLF_live16looplimiter5++;
                                {
                                    switch (GLF_live16i) {
                                        case 0:
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 4;
                                            break;
                                        case 1:
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 3;
                                            break;
                                        case 2:
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 2;
                                            break;
                                        case 3:
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 1;
                                            break;
                                        case 4:
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 0;
                                            break;
                                        case 5:
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -1;
                                            break;
                                        case 6:
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -2;
                                            break;
                                        case 7:
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -3;
                                            break;
                                        case 8:
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -4;
                                            break;
                                        case 9:
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -5;
                                            break;
                                    }
                                    GLF_live16i++;
                                }
                            } while (GLF_live16i < 10);
                        }
                        return vec2(1.0, 1.0);
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        if (_GLF_DEAD(false)) {
                            return vec2(1.0, 1.0);
                        }
                    }
                }
                if (GLF_live9looplimiter3 >= 6) {
                    ;
                    {
                        vec2 GLF_live11a = _GLF_FUZZED((vec3(-4.5, -2680.3542, -7098.0493) * mat2x3(-486.343, -2476.3576, -3.1, -6.9, 99.68, -1986.7493)));
                        do {
                            if (_GLF_DEAD(false)) {
                                return vec2(1.0, 1.0);
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        float GLF_live11z = _GLF_FUZZED((17.82 * (-0.9)));
                        if (GLF_live11a.y > GLF_live11a.x) {
                            GLF_live11z = GLF_live11a.x / GLF_live11a.y;
                        } else {
                            GLF_live11z = GLF_live11a.y / GLF_live11a.x;
                        }
                    }
                }
            }
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                if (_GLF_DEAD(false)) {
                    return vec2(1.0, 1.0);
                }
            }
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            vec4 GLF_live14c = _GLF_FUZZED(vec4(760.600, 3.9, 634.998, 97.81));
            int GLF_live14i = _GLF_FUZZED(int(uvec3(115048u, 37189u, 105174u).g));
            {
                if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] >= 1.0) {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    } else {
                        GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                    }
                }
                GLF_live14i++;
            }
        }
        return vec2(1.0, 1.0);
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        for (int j = -1; j <= int(injectionSwitch.y); j++) {
            {
                {
                    ;
                }
            }
            {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    ;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    discard;
                }
            }
            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        return vec2(1.0, 1.0);
                    }
                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > ((int(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(int(8), _GLF_IDENTITY(int(8), int(int(int(8)))))) ^ 0)); _injected_loop_counter--) {
                        for (int i = -1; i <= int(injectionSwitch.y); i++) {
                            vec2 g = vec2(float(j), float(i));
                            vec2 o = mix(n, g, 0.2);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return vec2(1.0, 1.0);
                            }
                            {
                                float GLF_live11th = _GLF_FUZZED((+889.514));
                                for (int _injected_loop_counter = ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                    GLF_live11th = 1.0 - GLF_live11th;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    break;
                                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), min(int(1), int(1)))))); _injected_loop_counter++) {
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                            return vec2(1.0, 1.0);
                                        }
                                    }
                                }
                            } else {
                                if (injectionSwitch.x < (m.x)) {
                                    int k = 1;
                                    while (k >= 0) {
                                        {
                                            vec2 GLF_live12pos = _GLF_FUZZED(vec2(27.45, -2467.4965));
                                            vec4 GLF_live12quad = _GLF_FUZZED(vec4(vec3(-2.2, -67.82, 339.209), 598.964));
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 ^ 1)); _injected_loop_counter++) {
                                                if (GLF_live12pos.y < GLF_live12quad.y) {
                                                    ;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            }
                                        }
                                        o = o + o;
                                        k--;
                                        {
                                            int GLF_live15baseIndex = _GLF_FUZZED(5954);
                                            int GLF_live15data = _GLF_FUZZED(-95520);
                                            int GLF_live15looplimiter0 = 0;
                                            int GLF_live15treeIndex = _GLF_FUZZED(-15581);
                                            while (GLF_live15baseIndex <= GLF_live15treeIndex) {
                                                if (GLF_live15looplimiter0 >= 7) {
                                                    break;
                                                }
                                                GLF_live15looplimiter0++;
                                                {
                                                    if (GLF_live15data <= GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].data) {
                                                        if (GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex == -1) {
                                                            GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex = GLF_live15treeIndex;
                                                            GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                                                            ;
                                                        } else {
                                                            GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex;
                                                            continue;
                                                        }
                                                    } else {
                                                        if (GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex == -1) {
                                                            GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex = GLF_live15treeIndex;
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            } else {
                                                                GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                                                            }
                                                            ;
                                                        } else {
                                                            GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex;
                                                            continue;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                    {
                                        int GLF_live13baseIndex = _GLF_FUZZED((-(ivec4(41414, -70004, -69329, -98958) ^ ivec4(-93118, 45623, 15062, -99605))).q);
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                GLF_live13baseIndex = GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].leftIndex;
                                            }
                                            do {
                                                ;
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        discard;
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                    m = vec3(injectionSwitch.x, cos(o));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return vec2(1.0, 1.0);
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            do {
                                                return vec2(1.0, 1.0);
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        float GLF_live13v = _GLF_FUZZED(float(-18925));
                                        if (GLF_live13v < float(GLF_live13search(6))) {
                                            ;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    } else {
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    discard;
                                }
                                {
                                    {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        ;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return vec2(1.0, 1.0);
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    return vec2(1.0, 1.0);
                                }
                            } else {
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                        discard;
                    }
                    {
                        int GLF_live16i = _GLF_FUZZED(((bvec3(true, false, true) != bvec3(false, false, true)) ? (-31616) : int(37278u)));
                        int GLF_live16looplimiter5 = 0;
                        {
                            if (GLF_live16looplimiter5 >= 5) {
                                ;
                            }
                            GLF_live16looplimiter5++;
                            {
                                switch (GLF_live16i) {
                                    case 0:
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 4;
                                        } else {
                                        }
                                        break;
                                    case 1:
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 3;
                                        } else {
                                        }
                                        break;
                                    case 2:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 2;
                                        break;
                                    case 3:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 1;
                                        break;
                                    case 4:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 0;
                                        break;
                                    case 5:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -1;
                                        break;
                                    case 6:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -2;
                                        break;
                                    case 7:
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -3;
                                        } else {
                                        }
                                        break;
                                    case 8:
                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -4;
                                        break;
                                    case 9:
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -5;
                                        }
                                        break;
                                }
                                GLF_live16i++;
                            }
                        }
                    }
                } else {
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec2(1.0, 1.0);
        }
    } else {
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            vec2 GLF_live11v = _GLF_FUZZED(vec2(-782.100, -6622.3279));
            if (length(GLF_live11v) < 0.001) {
                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    ;
                }
            }
        } else {
        }
        return vec2(1.0, 1.0);
    }
    if (_GLF_DEAD(false)) {
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec2(1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    continue;
                }
                return vec2(1.0, 1.0);
            }
            int GLF_live4looplimiter0 = 0;
            if (GLF_live4looplimiter0 >= 7) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                break;
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    float GLF_live16grey = _GLF_FUZZED(-414.763);
                    {
                        GLF_live16grey = 0.5 + float(GLF_live16data[5]) / 10.0;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                continue;
            }
        } while (_GLF_WRAPPED_LOOP(false));
        do {
            if (_GLF_DEAD(false)) {
                discard;
            }
            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 & GLF_live8N)); _injected_loop_counter--) {
                return vec2(1.0, 1.0);
                if (_GLF_DEAD(false)) {
                    continue;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                continue;
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    return vec2(m.x, m.y - m.z);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return vec2(1.0, 1.0);
        if (_GLF_DEAD(false)) {
            return vec2(1.0, 1.0);
        }
    }
}

void main() {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return;
    }
    vec2 uv = gl_FragCoord.xy / resolution.y;
    float A[50];
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
    } else {
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    for (int i = 0; i < 200; i++) {
        if (i >= int(resolution.x)) {
            {
                do {
                    do {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        ;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            do {
                                discard;
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                    continue;
                }
            }
            {
                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
                do {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        return;
                        if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                            continue;
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                int GLF_live2looplimiter0 = 0;
                ivec2 GLF_live2pos = _GLF_FUZZED(ivec2(ivec4(-68619, -87651, -9714, -1981)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    while (GLF_live2pos.y != 256) {
                        if (GLF_live2looplimiter0 >= 4) {
                            {
                                vec4 GLF_live14c = _GLF_FUZZED(((-0.1) * vec4(9.8, 6.4, -1.0, -15.09)));
                                int GLF_live14i = _GLF_FUZZED(84127);
                                {
                                    if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] >= 1.0) {
                                        GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                                    }
                                    GLF_live14i++;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                {
                                    float GLF_live14s = _GLF_FUZZED(49.24);
                                    {
                                        GLF_live14s += 0.2;
                                    }
                                }
                            }
                            break;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            GLF_live2looplimiter0++;
                        } else {
                        }
                        {
                            {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                } else {
                                    ;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                        }
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            if (GLF_live2pos.x < GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15 && GLF_live2pos.x > GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] - 15) {
                                float GLF_live2p = (15.0 - abs(float(GLF_live2pos.x - GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)]))) / 15.0;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    {
                                        int GLF_live13baseIndex = _GLF_FUZZED(ivec2(-46915, 39805).s);
                                        int GLF_live13data = _GLF_FUZZED((false ? (~(-28927)) : 74673));
                                        if (_GLF_DEAD(false)) {
                                            break;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                break;
                                            }
                                        }
                                        int GLF_live13looplimiter0 = 0;
                                        int GLF_live13treeIndex = _GLF_FUZZED(11404);
                                        {
                                            if (GLF_live13looplimiter0 >= 7) {
                                                ;
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            } else {
                                                int GLF_live16i = _GLF_FUZZED(-72810);
                                                {
                                                    int GLF_live16looplimiter5 = 0;
                                                    do {
                                                        if (GLF_live16looplimiter5 >= 5) {
                                                            break;
                                                        }
                                                        GLF_live16looplimiter5++;
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            switch (GLF_live16i) {
                                                                case 0:
                                                                    GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 4;
                                                                    break;
                                                                case 1:
                                                                    GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 3;
                                                                    break;
                                                                case 2:
                                                                    GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 2;
                                                                    break;
                                                                case 3:
                                                                    GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 1;
                                                                    break;
                                                                case 4:
                                                                    GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 0;
                                                                    break;
                                                                case 5:
                                                                    GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -1;
                                                                    break;
                                                                case 6:
                                                                    GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -2;
                                                                    break;
                                                                case 7:
                                                                    GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -3;
                                                                    break;
                                                                case 8:
                                                                    do {
                                                                        GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -4;
                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                    break;
                                                                case 9:
                                                                    GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -5;
                                                                    break;
                                                            }
                                                            GLF_live16i++;
                                                        }
                                                    } while (GLF_live16i < 10);
                                                }
                                            }
                                            GLF_live13looplimiter0++;
                                            {
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(_GLF_IDENTITY(false, bool(bvec3(false, false, false))), false, true))))) {
                                                    return;
                                                }
                                                if (GLF_live13data <= GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].data) {
                                                    if (GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].leftIndex == -1) {
                                                        GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].leftIndex = GLF_live13treeIndex;
                                                        GLF_live13makeTreeNode(GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13treeIndex, 10)], GLF_live13data);
                                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 << _GLF_IDENTITY(int(0), int(0)))); _injected_loop_counter--) {
                                                            ;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            return;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                    } else {
                                                        GLF_live13baseIndex = GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].leftIndex;
                                                        ;
                                                    }
                                                } else {
                                                    if (GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].rightIndex == -1) {
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].rightIndex = GLF_live13treeIndex;
                                                        GLF_live13makeTreeNode(GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13treeIndex, 10)], GLF_live13data);
                                                        ;
                                                    } else {
                                                        GLF_live13baseIndex = GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].rightIndex;
                                                        ;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                            }
                                        }
                                        {
                                            int GLF_live16from = _GLF_FUZZED(44567);
                                            int GLF_live16looplimiter2 = 0;
                                            int GLF_live16to = _GLF_FUZZED(ivec2(77484, -76307).s);
                                            for (int GLF_live16i = GLF_live16from; GLF_live16i <= GLF_live16to; GLF_live16i++) {
                                                if (GLF_live16looplimiter2 >= 5) {
                                                    break;
                                                }
                                                GLF_live16looplimiter2++;
                                                {
                                                    GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = GLF_live16temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)];
                                                }
                                            }
                                        }
                                    }
                                    do {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            return;
                                        } else {
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                discard;
                                            } else {
                                            }
                                        }
                                        ;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                        }
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                }
                            }
                            {
                                float GLF_live16grey = _GLF_FUZZED(56.37);
                                if (int(GLF_live16gl_FragCoord[1]) < 270) {
                                    GLF_live16grey = 0.5 + float(GLF_live16data[8]) / 10.0;
                                } else {
                                    ;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                {
                                    float GLF_live14s = _GLF_FUZZED(8064.2626);
                                    {
                                        ;
                                    }
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                GLF_live2pos.y++;
                            }
                        }
                    }
                } else {
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(false)) {
                    do {
                        vec3 GLF_live5color = _GLF_FUZZED((93.07 - vec3(-8055.5613, -5.3, 0.6)));
                        int GLF_live5count = _GLF_FUZZED(93119);
                        {
                            int GLF_live5looplimiter3 = 0;
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            } else {
                                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                    do {
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        {
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            int GLF_live8high = _GLF_FUZZED(65246);
                                            int GLF_live8looplimiter3 = 0;
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            int GLF_live8low = _GLF_FUZZED(-21715);
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            {
                                                vec2 GLF_live10coord = _GLF_FUZZED(vec2(-8.8, 3.6));
                                                float GLF_live10h = _GLF_FUZZED((true ? (-4802.5433) : 800.498));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    break;
                                                }
                                                int GLF_live10i = _GLF_FUZZED(int(false));
                                                int GLF_live10looplimiter0 = 0;
                                                float GLF_live10refh = _GLF_FUZZED(7.5);
                                                float GLF_live10slope = _GLF_FUZZED(8343.5393);
                                                vec2 GLF_live10uvstep = _GLF_FUZZED(vec2(-0.9, 5.9));
                                                for (int _injected_loop_counter = _GLF_IDENTITY((0 ^ 1), int(_GLF_IDENTITY(ivec3((0 ^ 1), 0, 1), min(ivec3((0 ^ 1), 0, 1), ivec3((0 ^ 1), 0, 1))))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                    while (GLF_live10h < GLF_live10refh && GLF_live10i < 32) {
                                                        if (GLF_live10looplimiter0 >= 3) {
                                                            break;
                                                        }
                                                        GLF_live10looplimiter0++;
                                                        {
                                                            GLF_live10coord -= GLF_live10uvstep;
                                                            if (_GLF_DEAD(false)) {
                                                                break;
                                                            }
                                                            GLF_live10refh += GLF_live10slope;
                                                            do {
                                                                GLF_live10h = texture(GLF_live10tex, GLF_live10coord).y;
                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                            GLF_live10i++;
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        break;
                                                    }
                                                    break;
                                                }
                                            }
                                            int GLF_live8m = _GLF_FUZZED((2666 ^ 14048));
                                            if (_GLF_DEAD(false)) {
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                    discard;
                                                }
                                            }
                                            {
                                                float GLF_live16grey = _GLF_FUZZED(-1733.7187);
                                                {
                                                    if (int(GLF_live16gl_FragCoord[1]) < 60) {
                                                        GLF_live16grey = 0.5 + float(GLF_live16data[1]) / 10.0;
                                                    } else {
                                                        if (int(GLF_live16gl_FragCoord[1]) < 90) {
                                                            GLF_live16grey = 0.5 + float(GLF_live16data[2]) / 10.0;
                                                        } else {
                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                if (int(GLF_live16gl_FragCoord[1]) < 120) {
                                                                    GLF_live16grey = 0.5 + float(GLF_live16data[3]) / 10.0;
                                                                } else {
                                                                    if (int(GLF_live16gl_FragCoord[1]) < 150) {
                                                                        ;
                                                                    } else {
                                                                        if (int(GLF_live16gl_FragCoord[1]) < 180) {
                                                                            GLF_live16grey = 0.5 + float(GLF_live16data[5]) / 10.0;
                                                                        } else {
                                                                            if (int(GLF_live16gl_FragCoord[1]) < 210) {
                                                                                GLF_live16grey = 0.5 + float(GLF_live16data[6]) / 10.0;
                                                                            } else {
                                                                                if (int(GLF_live16gl_FragCoord[1]) < 240) {
                                                                                    GLF_live16grey = 0.5 + float(GLF_live16data[7]) / 10.0;
                                                                                } else {
                                                                                    if (int(GLF_live16gl_FragCoord[1]) < 270) {
                                                                                        GLF_live16grey = 0.5 + float(GLF_live16data[8]) / 10.0;
                                                                                    } else {
                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                            ;
                                                                                        } else {
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
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    break;
                                                }
                                                discard;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                discard;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                break;
                                                {
                                                    vec4 GLF_live14c = _GLF_FUZZED(vec4(275.785, -76.99, -679.444, 7201.3173));
                                                    int GLF_live14i = _GLF_FUZZED(((-95856) + 24252));
                                                    int GLF_live14looplimiter1 = 0;
                                                    int GLF_live14msb8 = _GLF_FUZZED(ivec2(-9999, -38646).x);
                                                    do {
                                                        if (GLF_live14looplimiter1 >= 5) {
                                                            break;
                                                        }
                                                        GLF_live14looplimiter1++;
                                                        {
                                                            if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] >= 1.0) {
                                                                GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                                                            }
                                                            GLF_live14i++;
                                                        }
                                                    } while (GLF_live14i < findMSB(findLSB(GLF_live14msb8)));
                                                }
                                            }
                                            do {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    break;
                                                }
                                                {
                                                    int GLF_live14i = _GLF_FUZZED(-53803);
                                                    float GLF_live14limit = _GLF_FUZZED(-9.6);
                                                    float GLF_live14s = _GLF_FUZZED((false ? 82.06 : (9.0 - (-8.7))));
                                                    if (float(GLF_live14i) >= GLF_live14limit) {
                                                        do {
                                                            ;
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    for (int GLF_live8i = GLF_live8low; GLF_live8i < GLF_live8high; GLF_live8i += 2 * GLF_live8m) {
                                                        if (GLF_live8looplimiter3 >= 4) {
                                                            {
                                                                int GLF_live15baseIndex = _GLF_FUZZED((78758));
                                                                int GLF_live15data = _GLF_FUZZED(-83459);
                                                                int GLF_live15treeIndex = _GLF_FUZZED((((-74135) + ivec2(10, -79400)) ^ 65082).r);
                                                                {
                                                                    if (GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex == -1) {
                                                                        do {
                                                                            GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex = GLF_live15treeIndex;
                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                                        GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                                                                        ;
                                                                    } else {
                                                                        GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex;
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                            break;
                                                        }
                                                        do {
                                                            if (_GLF_DEAD(false)) {
                                                                discard;
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                        GLF_live8looplimiter3++;
                                                        {
                                                            int GLF_live8from = GLF_live8i;
                                                            {
                                                                int GLF_live16j = _GLF_FUZZED(((30204u > 71157u) ? (-21235) : (-91764)));
                                                                int GLF_live16k = _GLF_FUZZED(-28778);
                                                                {
                                                                    GLF_live16temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16k++, 10)] = GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16j++, 10)];
                                                                }
                                                            }
                                                            int GLF_live8mid = GLF_live8i + GLF_live8m - 1;
                                                            {
                                                                vec4 GLF_live14c = _GLF_FUZZED((vec4(1.1, -9339.6026, -4.1, 444.611) * mat4(mat3x4(-46.00, 783.052, 5950.7532, 2299.4677, -8.5, -1579.8550, 16.62, -7.9, 42.83, 801.572, 595.224, 58.05))));
                                                                int GLF_live14i = _GLF_FUZZED(((-62718) ^ (-56078)));
                                                                {
                                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                        GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                                                                    }
                                                                }
                                                            }
                                                            {
                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                } else {
                                                                    ;
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    break;
                                                                }
                                                            }
                                                            int GLF_live8to = min(GLF_live8i + 2 * GLF_live8m - 1, GLF_live8high);
                                                            if (_GLF_DEAD(false)) {
                                                                continue;
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                break;
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                break;
                                                            }
                                                            GLF_live8merge(GLF_live8from, GLF_live8mid, GLF_live8to);
                                                        }
                                                    }
                                                } else {
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                        }
                                        if (GLF_live5looplimiter3 >= 3) {
                                            break;
                                        }
                                        do {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                GLF_live5looplimiter3++;
                                            } else {
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))), 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, sin(0.0), sin(0.0), 0.0, 0.0)))))) {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                return;
                                            } else {
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        } else {
                                            do {
                                                GLF_live5color += GLF_live5palette(vec3(0.5, float(GLF_live5obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live5injectionSwitch.y)), vec3(float(GLF_live5obj.numbers[4]) * 0.1, GLF_live5injectionSwitch.x, 0.6));
                                                GLF_live5count++;
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                        }
                                        if (_GLF_DEAD(false)) {
                                            break;
                                            {
                                                vec4 GLF_live14c = _GLF_FUZZED(vec4(1054.0861, 68.40, -736.403, 0.8));
                                                int GLF_live14i = _GLF_FUZZED(int((142038u)));
                                                int GLF_live14looplimiter1 = 0;
                                                int GLF_live14msb8 = _GLF_FUZZED(ivec4(22910, 85701, -66164, 11402).r);
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                    do {
                                                        if (GLF_live14looplimiter1 >= 5) {
                                                            break;
                                                        }
                                                        GLF_live14looplimiter1++;
                                                        {
                                                            if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] >= 1.0) {
                                                                GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                                                            }
                                                            GLF_live14i++;
                                                        }
                                                    } while (GLF_live14i < findMSB(findLSB(GLF_live14msb8)));
                                                }
                                            }
                                        }
                                    } while (GLF_live5count != GLF_live5obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live5injectionSwitch.x), 10)]);
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            {
                                vec2 GLF_live10coord = _GLF_FUZZED(vec2(4.8, 1339.0623));
                                float GLF_live10h = _GLF_FUZZED(54.20);
                                int GLF_live10i = _GLF_FUZZED(65623);
                                float GLF_live10refh = _GLF_FUZZED(0.0);
                                float GLF_live10slope = _GLF_FUZZED((798.857 - (+(-9.6))));
                                vec2 GLF_live10uvstep = _GLF_FUZZED(vec2(313.025, -2949.4198));
                                {
                                    int GLF_live10looplimiter0 = 0;
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                        while (GLF_live10h < GLF_live10refh && GLF_live10i < 32) {
                                            if (GLF_live10looplimiter0 >= 3) {
                                                break;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            GLF_live10looplimiter0++;
                                            {
                                                GLF_live10coord -= GLF_live10uvstep;
                                                GLF_live10refh += GLF_live10slope;
                                                GLF_live10h = texture(GLF_live10tex, GLF_live10coord).y;
                                                GLF_live10i++;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                int GLF_live15count = _GLF_FUZZED(95531);
                                                int GLF_live15looplimiter2 = 0;
                                                for (int GLF_live15i = 0; GLF_live15i < 20; GLF_live15i++) {
                                                    if (GLF_live15looplimiter2 >= 7) {
                                                        break;
                                                    }
                                                    GLF_live15looplimiter2++;
                                                    {
                                                        int GLF_live15result = GLF_live15search(GLF_live15i);
                                                        switch (GLF_live15i) {
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
                                                                if (GLF_live15result == GLF_live15i) {
                                                                    GLF_live15count++;
                                                                }
                                                                break;
                                                            default:
                                                                if (GLF_live15result == -1) {
                                                                    GLF_live15count++;
                                                                }
                                                                break;
                                                        }
                                                    }
                                                }
                                            }
                                            return;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    break;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    {
                        int GLF_live10looplimiter0 = 0;
                        do {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                continue;
                            }
                            if (GLF_live10looplimiter0 >= 3) {
                                ;
                            }
                            {
                                {
                                    ;
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    return;
                }
            }
            break;
            if (_GLF_DEAD(false)) {
                return;
            }
            {
                bool GLF_live1c1 = _GLF_FUZZED(false);
                bool GLF_live1c2 = _GLF_FUZZED(false);
                if (_GLF_DEAD(false)) {
                    {
                        float GLF_live13v = _GLF_FUZZED(3854.3514);
                        if (GLF_live13v < 1.5) {
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                        {
                            int GLF_live16i = _GLF_FUZZED(-92750);
                            int GLF_live16k = _GLF_FUZZED((-int(173729u)));
                            int GLF_live16looplimiter1 = 0;
                            int GLF_live16mid = _GLF_FUZZED((~((-55494) - (-86053))));
                            while (GLF_live16i < GLF_live16N && GLF_live16i <= GLF_live16mid) {
                                if (GLF_live16looplimiter1 >= 5) {
                                    break;
                                }
                                GLF_live16looplimiter1++;
                                {
                                    GLF_live16temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16k++, 10)] = GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i++, 10)];
                                }
                            }
                        }
                    }
                    discard;
                }
                {
                    vec2 GLF_live10coord = _GLF_FUZZED(vec2(-3280.5466, -9396.0237));
                    float GLF_live10h = _GLF_FUZZED((49.77));
                    int GLF_live10i = _GLF_FUZZED(26736);
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            discard;
                        }
                    }
                    int GLF_live10looplimiter0 = 0;
                    {
                        {
                            ;
                        }
                    }
                    float GLF_live10refh = _GLF_FUZZED(float(false));
                    float GLF_live10slope = _GLF_FUZZED(vec2(0.3, -92.09).x);
                    vec2 GLF_live10uvstep = _GLF_FUZZED(vec2(-8443.4665, 6.0));
                    while (GLF_live10h < GLF_live10refh && GLF_live10i < 32) {
                        if (GLF_live10looplimiter0 >= 3) {
                            break;
                        }
                        {
                            int GLF_live16i = _GLF_FUZZED(ivec2(-83105, 48488).g);
                            {
                                int GLF_live16looplimiter5 = 0;
                                do {
                                    if (GLF_live16looplimiter5 >= 5) {
                                        break;
                                    }
                                    GLF_live16looplimiter5++;
                                    do {
                                        switch (GLF_live16i) {
                                            case 0:
                                                GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 4;
                                                break;
                                            case 1:
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 3;
                                                } else {
                                                }
                                                break;
                                            case 2:
                                                GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 2;
                                                break;
                                            case 3:
                                                GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 1;
                                                break;
                                            case 4:
                                                do {
                                                    GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 0;
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                break;
                                            case 5:
                                                GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -1;
                                                break;
                                            case 6:
                                                GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -2;
                                                break;
                                            case 7:
                                                GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -3;
                                                break;
                                            case 8:
                                                do {
                                                    GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -4;
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                break;
                                            case 9:
                                                GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -5;
                                                break;
                                        }
                                        GLF_live16i++;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                } while (GLF_live16i < 10);
                            }
                        }
                        GLF_live10looplimiter0++;
                        {
                            GLF_live10coord -= GLF_live10uvstep;
                            GLF_live10refh += GLF_live10slope;
                            GLF_live10h = texture(GLF_live10tex, GLF_live10coord).y;
                            GLF_live10i++;
                            if (_GLF_DEAD(false)) {
                                continue;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    discard;
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                {
                    ivec2 GLF_live2pos = _GLF_FUZZED(ivec2(53706, 21178));
                    if (GLF_live2pos.x < GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15 && GLF_live2pos.x > GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] - 15) {
                        float GLF_live2p = (15.0 - abs(float(GLF_live2pos.x - GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)]))) / 15.0;
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < length(vec3(0.0, 0.0, 0.0)))))) {
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    ;
                                } else {
                                }
                            }
                        } else {
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    discard;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                vec3 GLF_live1col = _GLF_FUZZED(vec3(1.7, -156.825, 5.7));
                vec2 GLF_live1uv = _GLF_FUZZED(vec2(6411.4197, -0.3));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                        return;
                    }
                    {
                        float GLF_live16grey = _GLF_FUZZED((vec2(215.406, -0.5).y * vec4(-1.7, 309.112, 1.1, 3597.6182).w));
                        if (int(GLF_live16gl_FragCoord[1]) < 210) {
                            GLF_live16grey = 0.5 + float(GLF_live16data[6]) / 10.0;
                        } else {
                            if (int(GLF_live16gl_FragCoord[1]) < 240) {
                                GLF_live16grey = 0.5 + float(GLF_live16data[7]) / 10.0;
                            } else {
                                if (int(GLF_live16gl_FragCoord[1]) < 270) {
                                    GLF_live16grey = 0.5 + float(GLF_live16data[8]) / 10.0;
                                } else {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                    do {
                        for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), 0 | (int(2))))) >> _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            if (!GLF_live1c1 && GLF_live1c2) {
                                float GLF_live1stripe = GLF_live1compute_stripe(tan((GLF_live1uv.x + GLF_live1uv.y) * 20.0));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                    discard;
                                    {
                                        {
                                            ;
                                        }
                                    }
                                }
                                GLF_live1col = mix(vec3(0.5, GLF_live1uv.x, 0.1), vec3(.4, 0, .5), GLF_live1stripe);
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                GLF_live1_GLF_color = vec4(GLF_live1col, 1.0);
                                ;
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                } else {
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        int GLF_live5looplimiter2 = 0;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        }
                        for (int GLF_live5i = int(GLF_live5injectionSwitch.x); GLF_live5i < 10; GLF_live5i++) {
                            if (_GLF_DEAD(false)) {
                                {
                                    int GLF_live15count = _GLF_FUZZED(-15242);
                                    int GLF_live15result = _GLF_FUZZED((31898 - 92656));
                                    if (GLF_live15result == -1) {
                                        GLF_live15count++;
                                    }
                                }
                                break;
                            }
                            if (GLF_live5looplimiter2 >= 3) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                break;
                            }
                            GLF_live5looplimiter2++;
                            {
                                GLF_live5obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = (10 - GLF_live5i) * int(GLF_live5injectionSwitch.y);
                                {
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    vec2 GLF_live11a = _GLF_FUZZED(vec2(1815.2201, 4.2));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return;
                                    }
                                    float GLF_live11z = _GLF_FUZZED(1100.6683);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        GLF_live11z = GLF_live11a.x / GLF_live11a.y;
                                    } else {
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, log(1.0), 0.0)))))) {
                        break;
                    }
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                } else {
                }
            }
        }
        do {
            if ((4 * (i / 4)) == i) {
                if (_GLF_DEAD(false)) {
                    {
                        int GLF_live14i = _GLF_FUZZED(26075);
                        float GLF_live14limit = _GLF_FUZZED((-64.14));
                        float GLF_live14ref = _GLF_FUZZED(-3437.6371);
                        float GLF_live14s = _GLF_FUZZED((6.6 - vec2(-55.65, -66.32)).y);
                        {
                            if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                                GLF_live14s += 0.2;
                            }
                            if (float(GLF_live14i) >= GLF_live14limit) {
                                ;
                            }
                            GLF_live14i++;
                        }
                    }
                    do {
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        return;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    A[i / 4] = float(i);
                } else {
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
        {
            int GLF_live16i = _GLF_FUZZED(33763);
            int GLF_live16j = _GLF_FUZZED(-34883);
            int GLF_live16k = _GLF_FUZZED(((-9441) & ((93557 * 37326) - (-24328))));
            int GLF_live16looplimiter0 = 0;
            {
                if (GLF_live16looplimiter0 >= 5) {
                    ;
                }
                GLF_live16looplimiter0++;
                {
                    if (GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] < GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16j, 10)]) {
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                            GLF_live16temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16k++, 10)] = GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i++, 10)];
                        }
                    } else {
                        GLF_live16temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16k++, 10)] = GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16j++, 10)];
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                continue;
            }
            discard;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
                {
                    int GLF_live15count = _GLF_FUZZED((~(-54469)));
                    int GLF_live15i = _GLF_FUZZED((89372 - 94758));
                    int GLF_live15result = _GLF_FUZZED(2167);
                    if (GLF_live15result == GLF_live15i) {
                        GLF_live15count++;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    for (int i = 0; i < 50; i++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(false)) {
                return;
            }
            break;
        }
        if (i < int(gl_FragCoord.x)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                continue;
                {
                    int GLF_live17looplimiter0 = 0;
                    if (GLF_live17looplimiter0 >= 4) {
                        ;
                    }
                }
                {
                    {
                        do {
                            ;
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    }
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    int GLF_live17i = _GLF_FUZZED(-20895);
                    int GLF_live17j = _GLF_FUZZED(-51805);
                    if (GLF_live17j < GLF_live17i + 1) {
                        ;
                    }
                }
                break;
            }
            break;
        }
        if (i > 0) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                break;
            }
            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 | 0)); _injected_loop_counter--) {
                A[i] += A[i - 1];
            }
            if (_GLF_DEAD(false)) {
                {
                    {
                        do {
                            ;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    discard;
                } else {
                }
                {
                    float GLF_live16grey = _GLF_FUZZED((6.2 - (-6.3)));
                    if (int(GLF_live16gl_FragCoord[1]) < 270) {
                        GLF_live16grey = 0.5 + float(GLF_live16data[8]) / 10.0;
                    } else {
                        ;
                    }
                }
            }
        }
    }
    vec2 c = pattern((15.0 + tan(0.2)) * uv);
    vec3 col;
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (int(gl_FragCoord.y) < 20) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                if (_GLF_DEAD(false)) {
                    return;
                }
            } else {
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            do {
                col = .5 + cos(c.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0));
                {
                    int GLF_live6looplimiter0 = 0;
                    if (GLF_live6looplimiter0 >= 7) {
                        ;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return;
                        }
                    }
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
        } else {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                return;
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            do {
                if (int(gl_FragCoord.y) < 40) {
                    col = .5 + cos(c.y + vec3(resolution.x, A[9] / resolution.x + 50.0, 22.0));
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        return;
                        {
                            {
                                ;
                            }
                        }
                    }
                    {
                        int GLF_live16looplimiter0 = 0;
                        if (GLF_live16looplimiter0 >= 5) {
                            ;
                        }
                    }
                    if (int(gl_FragCoord.y) < 60) {
                        if (_GLF_DEAD(false)) {
                            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                return;
                                if (_GLF_DEAD(false)) {
                                    discard;
                                    {
                                        {
                                            GLF_live15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            break;
                        }
                        for (int _injected_loop_counter = (((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7))) | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                            }
                        }
                        col = .5 + cos(c.y + vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0));
                        {
                            vec2 GLF_live7coord = _GLF_FUZZED((vec2(38.09, 4.2) - vec2(-23.69, -3.8)));
                            do {
                                if (GLF_live7coord.y < 0.6) {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    uvec2 GLF_live7icoord = uvec2(((GLF_live7coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_live7res1 = uint(((GLF_live7icoord.x * GLF_live7icoord.y) >> (GLF_live7icoord.x & 31u)) & 0xffffffffu);
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    uint GLF_live7res2 = uint(((GLF_live7icoord.x * GLF_live7icoord.y) << (GLF_live7icoord.x & 31u)) & 0xffffffffu);
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                discard;
                                            } else {
                                            }
                                        }
                                    }
                                    float GLF_live7res = float(((GLF_live7res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live7res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_live7_GLF_color = vec4(GLF_live7res, GLF_live7res, GLF_live7res, 1.0);
                                    if (_GLF_DEAD(false)) {
                                        for (int _injected_loop_counter = _GLF_IDENTITY(1, min(1, 1)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            return;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    }
                                } else {
                                    ivec2 GLF_live7icoord = ivec2(((GLF_live7coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    {
                                        vec4 GLF_live14c = _GLF_FUZZED(((vec4(8642.2442, 3.1, -7285.0176, -1093.7175) - vec4(1747.5405, -1.2, 73.04, 745.192)) * (-8716.6281)));
                                        int GLF_live14i = _GLF_FUZZED((+91797));
                                        if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] >= 1.0) {
                                            GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                                        }
                                    }
                                    int GLF_live7res3 = ((GLF_live7icoord.x >> 5) & 1) ^ ((GLF_live7icoord.y & 32) >> 5);
                                    int GLF_live7res2 = (GLF_live7icoord.y * GLF_live7icoord.y >> 10) & 1;
                                    {
                                        int GLF_live14looplimiter1 = 0;
                                        if (GLF_live14looplimiter1 >= 5) {
                                            ;
                                        }
                                    }
                                    int GLF_live7res1 = (GLF_live7icoord.x * GLF_live7icoord.y >> 9) & 1;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    GLF_live7_GLF_color = vec4(float(GLF_live7res1 ^ GLF_live7res2), float(GLF_live7res2 & GLF_live7res3), float(GLF_live7res1 | GLF_live7res3), 1.0);
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            continue;
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    vec2 GLF_live7coord = _GLF_FUZZED(vec2(-462.339, -63.77));
                                    if (GLF_live7coord.x > 0.4) {
                                        if (GLF_live7coord.y < 0.6) {
                                            uvec2 GLF_live7icoord = uvec2(((GLF_live7coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_live7res1 = uint(((GLF_live7icoord.x * GLF_live7icoord.y) >> (GLF_live7icoord.x & 31u)) & 0xffffffffu);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                for (int _injected_loop_counter = (1 ^ _GLF_IDENTITY(1, (1) | 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ONE(1.0, injectionSwitch.y)) & 1)); _injected_loop_counter++) {
                                                    ;
                                                }
                                            } else {
                                            }
                                            uint GLF_live7res2 = uint(((GLF_live7icoord.x * GLF_live7icoord.y) << (GLF_live7icoord.x & 31u)) & 0xffffffffu);
                                            {
                                                int GLF_live12i = _GLF_FUZZED(43186);
                                                int GLF_live12looplimiter0 = 0;
                                                vec2 GLF_live12pos = _GLF_FUZZED((vec4(193.596, -6699.1185, vec2(7.2, 74.63)) * mat2x4(-3355.7097, -8.2, 0.9, -7698.9441, -0.6, 709.838, 55.61, 9.7)));
                                                vec4 GLF_live12res = _GLF_FUZZED(vec4(125.233, 8.9, 5096.9498, -9.5));
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                {
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    } else {
                                                        if (GLF_live12looplimiter0 >= 6) {
                                                            ;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                    GLF_live12looplimiter0++;
                                                    {
                                                        if (GLF_live12collision(GLF_live12pos, GLF_live12picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 8)])) {
                                                            GLF_live12res = GLF_live12pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live12picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 8)].x) * int(GLF_live12picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 8)].y) + GLF_live12i * 9 + 11) % 16, 16)];
                                                        }
                                                    }
                                                }
                                            }
                                            float GLF_live7res = float(((GLF_live7res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live7res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_live7_GLF_color = vec4(GLF_live7res, GLF_live7res, GLF_live7res, 1.0);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                return;
                                            }
                                        } else {
                                            ivec2 GLF_live7icoord = ivec2(((GLF_live7coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_live7res3 = ((GLF_live7icoord.x >> 5) & 1) ^ ((GLF_live7icoord.y & 32) >> 5);
                                            int GLF_live7res2 = (GLF_live7icoord.y * GLF_live7icoord.y >> 10) & 1;
                                            int GLF_live7res1 = (GLF_live7icoord.x * GLF_live7icoord.y >> 9) & 1;
                                            GLF_live7_GLF_color = vec4(float(GLF_live7res1 ^ GLF_live7res2), float(GLF_live7res2 & GLF_live7res3), float(GLF_live7res1 | GLF_live7res3), 1.0);
                                        }
                                    } else {
                                        ivec2 GLF_live7icoord = ivec2(((GLF_live7coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                        int GLF_live7v = (GLF_live7icoord.x ^ GLF_live7icoord.y) * GLF_live7icoord.y;
                                        bool GLF_live7res1 = ((GLF_live7v >> 10) & 1) != 0;
                                        bool GLF_live7res2 = ((GLF_live7v >> 11) & 4) != 0;
                                        bool GLF_live7res3 = ((GLF_live7v >> 12) & 8) != 0;
                                        GLF_live7_GLF_color = vec4(GLF_live7res1 ? 1.0 : 0.0, GLF_live7res2 ? 1.0 : 0.0, GLF_live7res3 ? 1.0 : 0.0, 1);
                                    }
                                }
                                return;
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                return;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                discard;
                            }
                        }
                    } else {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            {
                                vec2 GLF_live11a = _GLF_FUZZED(vec2(431.977, -5.0));
                                float GLF_live11z = _GLF_FUZZED(-829.945);
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    return;
                                }
                                {
                                    GLF_live11z = GLF_live11a.y / GLF_live11a.x;
                                }
                            }
                            float GLF_live8grey = _GLF_FUZZED(-310.776);
                            if (int(GLF_live8gl_FragCoord[1]) < 120) {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                GLF_live8grey = 0.5 + float(GLF_live8data[3]) / 10.0;
                            } else {
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        break;
                                    }
                                    if (int(GLF_live8gl_FragCoord[1]) < 150) {
                                        ;
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(_GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0)), dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0))), 1.0, sin(0.0), 0.0), vec4(0.0, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), determinant(mat2(1.0, 0.0, 1.0, 1.0)))), _GLF_IDENTITY(dot(vec4(_GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0)), dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0))), 1.0, sin(0.0), 0.0), vec4(0.0, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), determinant(mat2(1.0, 0.0, 1.0, 1.0)))), (dot(vec4(_GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0)), dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0))), 1.0, sin(0.0), 0.0), vec4(0.0, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), determinant(mat2(1.0, 0.0, 1.0, 1.0))))) - 0.0)))))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                continue;
                                            }
                                            return;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    } else {
                                        if (int(GLF_live8gl_FragCoord[1]) < 180) {
                                            GLF_live8grey = 0.5 + float(GLF_live8data[5]) / 10.0;
                                        } else {
                                            if (int(GLF_live8gl_FragCoord[1]) < 210) {
                                                GLF_live8grey = 0.5 + float(GLF_live8data[6]) / 10.0;
                                            } else {
                                                if (int(GLF_live8gl_FragCoord[1]) < 240) {
                                                    GLF_live8grey = 0.5 + float(GLF_live8data[7]) / 10.0;
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            } else {
                                                                discard;
                                                            }
                                                        }
                                                    } else {
                                                    }
                                                } else {
                                                    if (int(GLF_live8gl_FragCoord[1]) < 270) {
                                                        GLF_live8grey = 0.5 + float(GLF_live8data[8]) / 10.0;
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                    } else {
                                                        {
                                                            int GLF_live13baseIndex = _GLF_FUZZED(int(5408u));
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                                                break;
                                                            }
                                                            int GLF_live13data = _GLF_FUZZED((42115 | (-37750)));
                                                            int GLF_live13treeIndex = _GLF_FUZZED(36156);
                                                            {
                                                                GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].leftIndex = GLF_live13treeIndex;
                                                                GLF_live13makeTreeNode(GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13treeIndex, 10)], GLF_live13data);
                                                                ;
                                                            }
                                                        }
                                                        ;
                                                        do {
                                                            int GLF_live15baseIndex = _GLF_FUZZED((-45156));
                                                            int GLF_live15data = _GLF_FUZZED((+ivec3(-44930, 14098, -93066).z));
                                                            int GLF_live15treeIndex = _GLF_FUZZED(ivec3(42744, -67901, 19709).s);
                                                            {
                                                                if (GLF_live15data <= GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].data) {
                                                                    if (GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex == -1) {
                                                                        GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex = GLF_live15treeIndex;
                                                                        GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                                                                        ;
                                                                    } else {
                                                                        GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex;
                                                                        ;
                                                                    }
                                                                } else {
                                                                    if (GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex == -1) {
                                                                        for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter--) {
                                                                            GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex = GLF_live15treeIndex;
                                                                        }
                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                        } else {
                                                                            GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                                                                        }
                                                                        ;
                                                                    } else {
                                                                        GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex;
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        }
                        if (int(gl_FragCoord.y) < 80) {
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 ^ 0)); _injected_loop_counter++) {
                                col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                        for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                            {
                                                ;
                                            }
                                        }
                                        continue;
                                    }
                                    int GLF_live9looplimiter0 = 0;
                                    if (GLF_live9looplimiter0 >= 6) {
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        ;
                                    }
                                }
                            }
                        } else if (int(gl_FragCoord.y) < 100) {
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                }
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                    col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                break;
                            }
                        } else if (int(gl_FragCoord.y) < 120) {
                            {
                                vec2 GLF_live11a = _GLF_FUZZED((vec2(-4.6, -283.455) * (mat2(5.0, 4.1, -8649.2435, -329.355) + mat2(0.1, 6316.9118, -1.8, 377.426))));
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                float GLF_live11th = _GLF_FUZZED((+(-9833.2002)));
                                {
                                    int GLF_live14i = _GLF_FUZZED(((-8370) | 47779));
                                    float GLF_live14limit = _GLF_FUZZED((true ? 7588.7072 : 10.66));
                                    float GLF_live14s = _GLF_FUZZED(4881.9109);
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (float(GLF_live14i) >= GLF_live14limit) {
                                            ;
                                        }
                                    }
                                }
                                if (GLF_live11a.y < GLF_live11a.x) {
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        GLF_live11th = 0.5 - GLF_live11th;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                }
                            }
                            col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                                if (_GLF_DEAD(false)) {
                                    discard;
                                    {
                                        int GLF_live15baseIndex = _GLF_FUZZED((-72633));
                                        int GLF_live15data = _GLF_FUZZED((~59643));
                                        int GLF_live15treeIndex = _GLF_FUZZED(50500);
                                        {
                                            int GLF_live15looplimiter0 = 0;
                                            while (GLF_live15baseIndex <= GLF_live15treeIndex) {
                                                if (GLF_live15looplimiter0 >= 7) {
                                                    break;
                                                }
                                                GLF_live15looplimiter0++;
                                                {
                                                    if (GLF_live15data <= GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].data) {
                                                        if (GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex == -1) {
                                                            GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex = GLF_live15treeIndex;
                                                            GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                                                            ;
                                                        } else {
                                                            GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex;
                                                            continue;
                                                        }
                                                    } else {
                                                        if (GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex == -1) {
                                                            GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex = GLF_live15treeIndex;
                                                            GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                                                            ;
                                                        } else {
                                                            GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex;
                                                            continue;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                return;
                            }
                        } else if (int(gl_FragCoord.y) < 140) {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    int GLF_live16high = _GLF_FUZZED((55610));
                                    int GLF_live16low = _GLF_FUZZED(ivec3(87717, -49851, -40499).p);
                                    int GLF_live16m = _GLF_FUZZED((~2997));
                                    {
                                        int GLF_live16looplimiter3 = 0;
                                        for (int GLF_live16i = GLF_live16low; GLF_live16i < GLF_live16high; GLF_live16i += 2 * GLF_live16m) {
                                            if (GLF_live16looplimiter3 >= 5) {
                                                break;
                                            }
                                            GLF_live16looplimiter3++;
                                            {
                                                int GLF_live16from = GLF_live16i;
                                                int GLF_live16mid = GLF_live16i + GLF_live16m - 1;
                                                int GLF_live16to = min(GLF_live16i + 2 * GLF_live16m - 1, GLF_live16high);
                                                GLF_live16merge(GLF_live16from, GLF_live16mid, GLF_live16to);
                                            }
                                        }
                                    }
                                }
                                return;
                            }
                            {
                                int GLF_live2looplimiter0 = 0;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    continue;
                                }
                                ivec2 GLF_live2pos = _GLF_FUZZED(ivec2(68574, 47039));
                                while (GLF_live2pos.y != 256) {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        continue;
                                    }
                                    if (GLF_live2looplimiter0 >= 4) {
                                        break;
                                    }
                                    GLF_live2looplimiter0++;
                                    {
                                        float GLF_live11th = _GLF_FUZZED(-5.2);
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        vec2 GLF_live11v = _GLF_FUZZED(((3.6 - vec2(22.78, -96.81)) - vec2(-1.9, -11.21)));
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        if (GLF_live11v.x < 0.0) {
                                            GLF_live11th = 1.0 - GLF_live11th;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                    {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                return;
                                            }
                                            if (GLF_live2pos.x < GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15 && GLF_live2pos.x > GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] - 15) {
                                                float GLF_live2p = (15.0 - abs(float(GLF_live2pos.x - GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)]))) / 15.0;
                                                ;
                                            }
                                        } else {
                                            {
                                                vec4 GLF_live14c = _GLF_FUZZED(vec4(7.1, 3233.5997, 3938.3514, 258.401));
                                                int GLF_live14i = _GLF_FUZZED((~78543));
                                                if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] >= 1.0) {
                                                    GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                                                }
                                            }
                                        }
                                        GLF_live2pos.y++;
                                        {
                                            float GLF_live8grey = _GLF_FUZZED(-51.96);
                                            if (int(GLF_live8gl_FragCoord[1]) < 30) {
                                                GLF_live8grey = 0.5 + float(GLF_live8data[0]) / 10.0;
                                            } else {
                                                if (int(GLF_live8gl_FragCoord[1]) < 60) {
                                                    GLF_live8grey = 0.5 + float(GLF_live8data[1]) / 10.0;
                                                    {
                                                        vec2 GLF_live10coord = _GLF_FUZZED((-vec2(0.7, -133.252)));
                                                        float GLF_live10h = _GLF_FUZZED((1.8 - 7275.8345));
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        int GLF_live10i = _GLF_FUZZED((true ? (-74986) : ((-540) - (-86894))));
                                                        float GLF_live10refh = _GLF_FUZZED((false ? 1.2 : vec2(8.3, -6.3).x));
                                                        float GLF_live10slope = _GLF_FUZZED(-6.0);
                                                        vec2 GLF_live10uvstep = _GLF_FUZZED(((vec2(2.2, -98.21) * vec2(-8.7, 573.495)) + vec2(223.697, 5989.2528)).rr);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            int GLF_live10looplimiter0 = 0;
                                                            while (GLF_live10h < GLF_live10refh && GLF_live10i < 32) {
                                                                if (GLF_live10looplimiter0 >= 3) {
                                                                    break;
                                                                }
                                                                GLF_live10looplimiter0++;
                                                                {
                                                                    if (_GLF_DEAD(false)) {
                                                                        {
                                                                            vec4 GLF_live14c = _GLF_FUZZED((vec4(-242.025, 7.6, -65.01, 470.054) * mat4(-51.83, 6.9, 999.060, -818.114, -7306.3594, 7.1, 425.023, -3.7, -8941.0699, 63.39, -1.0, -8980.1126, 2.7, 243.660, -5941.8796, -8934.8361)));
                                                                            int GLF_live14i = _GLF_FUZZED(-51975);
                                                                            int GLF_live14looplimiter1 = 0;
                                                                            {
                                                                                if (GLF_live14looplimiter1 >= 5) {
                                                                                    ;
                                                                                }
                                                                                GLF_live14looplimiter1++;
                                                                                {
                                                                                    if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] >= 1.0) {
                                                                                        GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                                                                                    }
                                                                                    GLF_live14i++;
                                                                                }
                                                                            }
                                                                        }
                                                                        continue;
                                                                    }
                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                        GLF_live10coord -= GLF_live10uvstep;
                                                                    } else {
                                                                        if (_GLF_DEAD(false)) {
                                                                            return;
                                                                        }
                                                                    }
                                                                    GLF_live10refh += GLF_live10slope;
                                                                    if (_GLF_DEAD(false)) {
                                                                        continue;
                                                                    }
                                                                    GLF_live10h = texture(GLF_live10tex, GLF_live10coord).y;
                                                                    GLF_live10i++;
                                                                }
                                                            }
                                                        } else {
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            continue;
                                                        }
                                                    }
                                                } else {
                                                    if (int(GLF_live8gl_FragCoord[1]) < 90) {
                                                        for (int _injected_loop_counter = _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), (_GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), (false ? _GLF_FUZZED(GLF_live2looplimiter0) : int(_GLF_ZERO(0.0, injectionSwitch.x))))) - 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY(1, clamp(1, 1, 1))); _injected_loop_counter++) {
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                float GLF_live16grey = _GLF_FUZZED(((-72.56) + (-1.2)));
                                                                {
                                                                    if (int(GLF_live16gl_FragCoord[1]) < 60) {
                                                                        GLF_live16grey = 0.5 + float(GLF_live16data[1]) / 10.0;
                                                                    } else {
                                                                        if (int(GLF_live16gl_FragCoord[1]) < 90) {
                                                                            GLF_live16grey = 0.5 + float(GLF_live16data[2]) / 10.0;
                                                                        } else {
                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                            } else {
                                                                                if (int(GLF_live16gl_FragCoord[1]) < 120) {
                                                                                    GLF_live16grey = 0.5 + float(GLF_live16data[3]) / 10.0;
                                                                                } else {
                                                                                    if (int(GLF_live16gl_FragCoord[1]) < 150) {
                                                                                        ;
                                                                                    } else {
                                                                                        if (int(GLF_live16gl_FragCoord[1]) < 180) {
                                                                                            GLF_live16grey = 0.5 + float(GLF_live16data[5]) / 10.0;
                                                                                        } else {
                                                                                            do {
                                                                                                if (int(GLF_live16gl_FragCoord[1]) < 210) {
                                                                                                    GLF_live16grey = 0.5 + float(GLF_live16data[6]) / 10.0;
                                                                                                } else {
                                                                                                    if (int(GLF_live16gl_FragCoord[1]) < 240) {
                                                                                                        GLF_live16grey = 0.5 + float(GLF_live16data[7]) / 10.0;
                                                                                                    } else {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat4(0.0, determinant(mat3(1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0)), _GLF_ZERO(0.0, injectionSwitch.x), 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, 0.0))), determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0)))))))) {
                                                                                                            if (int(GLF_live16gl_FragCoord[1]) < 270) {
                                                                                                                GLF_live16grey = 0.5 + float(GLF_live16data[8]) / 10.0;
                                                                                                            } else {
                                                                                                                ;
                                                                                                            }
                                                                                                        } else {
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            return;
                                                        }
                                                        GLF_live8grey = 0.5 + float(GLF_live8data[2]) / 10.0;
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                    } else {
                                                        if (int(GLF_live8gl_FragCoord[1]) < 120) {
                                                            GLF_live8grey = 0.5 + float(GLF_live8data[3]) / 10.0;
                                                        } else {
                                                            if (int(GLF_live8gl_FragCoord[1]) < 150) {
                                                                ;
                                                            } else {
                                                                if (int(GLF_live8gl_FragCoord[1]) < 180) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        break;
                                                                    }
                                                                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3)))); _injected_loop_counter++) {
                                                                        GLF_live8grey = 0.5 + float(GLF_live8data[5]) / 10.0;
                                                                    }
                                                                } else {
                                                                    if (int(GLF_live8gl_FragCoord[1]) < 210) {
                                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                                                            continue;
                                                                        }
                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                        } else {
                                                                            GLF_live8grey = 0.5 + float(GLF_live8data[6]) / 10.0;
                                                                        }
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            break;
                                                                        }
                                                                    } else {
                                                                        if (int(GLF_live8gl_FragCoord[1]) < 240) {
                                                                            GLF_live8grey = 0.5 + float(GLF_live8data[7]) / 10.0;
                                                                        } else {
                                                                            if (int(GLF_live8gl_FragCoord[1]) < 270) {
                                                                                GLF_live8grey = 0.5 + float(GLF_live8data[8]) / 10.0;
                                                                            } else {
                                                                                ;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                continue;
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                break;
                                                                if (_GLF_DEAD(false)) {
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                for (int _injected_loop_counter = (int(_GLF_ONE(1.0, injectionSwitch.y)) & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                    discard;
                                                }
                                            }
                                        }
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                do {
                                                    return;
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                {
                                                    int GLF_live15count = _GLF_FUZZED(64780);
                                                    int GLF_live15result = _GLF_FUZZED(-60234);
                                                    if (GLF_live15result == -1) {
                                                        GLF_live15count++;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                {
                                    int GLF_live13looplimiter2 = 0;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        continue;
                                    }
                                    if (GLF_live13looplimiter2 >= 7) {
                                        ;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        break;
                                    }
                                }
                            }
                        } else if (int(gl_FragCoord.y) < 160) {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (int(gl_FragCoord.y) < 180) {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    col = .5 + cos(c.y + vec3(resolution.x, A[44] / resolution.x + 50.0, 22.0));
                                } else if (int(gl_FragCoord.y) < 200) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    } else {
                                    }
                                    do {
                                        col = .5 + cos(c.y + vec3(resolution.x, A[49] / resolution.x + 50.0, 22.0));
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                } else {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        discard;
                                    }
                                    {
                                        do {
                                            ;
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    }
                                }
                            } else {
                                {
                                    if (_GLF_DEAD(false)) {
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                            discard;
                                        }
                                    }
                                    {
                                        ;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                                {
                                    vec2 GLF_live7coord = _GLF_FUZZED(vec2(-986.881, -99.32));
                                    {
                                        {
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            vec2 GLF_live11a = _GLF_FUZZED((vec2(3.3, -87.60)));
                                            float GLF_live11th = _GLF_FUZZED(-466.648);
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (GLF_live11a.y < GLF_live11a.x) {
                                                    GLF_live11th = 0.5 - GLF_live11th;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                                break;
                                            }
                                            return;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                continue;
                                            }
                                        }
                                        ivec2 GLF_live7icoord = ivec2(((GLF_live7coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            return;
                                        }
                                        int GLF_live7res3 = ((GLF_live7icoord.x >> 5) & 1) ^ ((GLF_live7icoord.y & 32) >> 5);
                                        int GLF_live7res2 = (GLF_live7icoord.y * GLF_live7icoord.y >> 10) & 1;
                                        int GLF_live7res1 = (GLF_live7icoord.x * GLF_live7icoord.y >> 9) & 1;
                                        GLF_live7_GLF_color = vec4(float(GLF_live7res1 ^ GLF_live7res2), float(GLF_live7res2 & GLF_live7res3), float(GLF_live7res1 | GLF_live7res3), 1.0);
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
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                        break;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                    continue;
                                }
                            }
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                }
                                int GLF_live13baseIndex = _GLF_FUZZED(-43665);
                                int GLF_live13data = _GLF_FUZZED(-92369);
                                int GLF_live13treeIndex = _GLF_FUZZED(75682);
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].rightIndex == -1) {
                                        do {
                                            GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].rightIndex = GLF_live13treeIndex;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        GLF_live13makeTreeNode(GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13treeIndex, 10)], GLF_live13data);
                                        ;
                                    } else {
                                        do {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (true)))) {
                                                    return;
                                                } else {
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        GLF_live13baseIndex = GLF_live13tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13baseIndex, 10)].rightIndex;
                                        ;
                                        {
                                            int GLF_live16i = _GLF_FUZZED(49041);
                                            int GLF_live16looplimiter5 = 0;
                                            do {
                                                if (GLF_live16looplimiter5 >= 5) {
                                                    break;
                                                }
                                                GLF_live16looplimiter5++;
                                                {
                                                    switch (GLF_live16i) {
                                                        case 0:
                                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 4;
                                                            break;
                                                        case 1:
                                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 3;
                                                            break;
                                                        case 2:
                                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 2;
                                                            break;
                                                        case 3:
                                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 1;
                                                            break;
                                                        case 4:
                                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = 0;
                                                            break;
                                                        case 5:
                                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -1;
                                                            break;
                                                        case 6:
                                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -2;
                                                            break;
                                                        case 7:
                                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -3;
                                                            break;
                                                        case 8:
                                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -4;
                                                            break;
                                                        case 9:
                                                            GLF_live16data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 10)] = -5;
                                                            break;
                                                    }
                                                    GLF_live16i++;
                                                }
                                            } while (GLF_live16i < 10);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0)))));
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                return;
            }
        }
    } else {
    }
    _GLF_color = vec4(col, 1.0);
    {
        {
            vec4 GLF_live14c = _GLF_FUZZED(vec4(-7999.3783, 2.0, 99.81, -410.332));
            int GLF_live14i = _GLF_FUZZED(50685);
            int GLF_live14looplimiter1 = 0;
            int GLF_live14msb8 = _GLF_FUZZED((16560));
            do {
                do {
                    if (GLF_live14looplimiter1 >= 5) {
                        break;
                    }
                    GLF_live14looplimiter1++;
                    do {
                        if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] >= 1.0) {
                            GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                        }
                        GLF_live14i++;
                    } while (_GLF_WRAPPED_LOOP(false));
                } while (GLF_live14i < findMSB(findLSB(GLF_live14msb8)));
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x)))));
        }
        int GLF_live6looplimiter0 = 0;
        if (GLF_live6looplimiter0 >= 7) {
            ;
        }
    }
}
